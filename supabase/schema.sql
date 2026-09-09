-- ============================================================
-- Prompt Vault — Complete Auth & Roles Schema
-- ============================================================
-- Run once in Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- Execute top-to-bottom in a single run. Safe to re-run.
-- ============================================================


-- ────────────────────────────────────────────────────────────
-- 1. PROFILES TABLE
-- ────────────────────────────────────────────────────────────
-- Mirrors auth.users 1:1. All app-level user data lives here,
-- never directly on auth.users.

create table if not exists public.profiles (
  id           uuid        references auth.users on delete cascade primary key,
  email        text,
  display_name text,
  role         text        not null default 'user' check (role in ('user', 'admin')),
  created_at   timestamptz default now()
);

-- If the table already existed without display_name, add it now
alter table public.profiles add column if not exists display_name text;


-- ────────────────────────────────────────────────────────────
-- 2. AUTO-CREATE PROFILE ON SIGNUP (Trigger Function)
-- ────────────────────────────────────────────────────────────
-- Fires after every new auth.users insert.
-- • Role is HARDCODED to 'user' — ignores anything from the
--   client signup payload, so no one can self-assign 'admin'.
-- • display_name is safely pulled from signup metadata
--   (options.data.display_name or options.data.full_name).
-- • ON CONFLICT handles edge cases (e.g. re-confirmation).

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, role, display_name)
  values (
    new.id,
    new.email,
    'user',
    coalesce(
      new.raw_user_meta_data ->> 'display_name',
      new.raw_user_meta_data ->> 'full_name',
      ''
    )
  )
  on conflict (id) do update
    set display_name = excluded.display_name,
        email       = excluded.email;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- ────────────────────────────────────────────────────────────
-- 3. HELPER: Admin Check (Security Definer)
-- ────────────────────────────────────────────────────────────
-- Used by RLS policies below. SECURITY DEFINER lets it read
-- public.profiles without triggering RLS infinite recursion.

create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;


-- ────────────────────────────────────────────────────────────
-- 4. ROW LEVEL SECURITY (RLS)
-- ────────────────────────────────────────────────────────────

alter table public.profiles enable row level security;

-- Drop existing policies first (safe re-run)
drop policy if exists "read own profile"      on public.profiles;
drop policy if exists "update own profile"     on public.profiles;
drop policy if exists "admin read all profiles" on public.profiles;

-- Users can read their own profile
create policy "read own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Users can update their own profile (role changes blocked by trigger below)
create policy "update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Admins can read all profiles
create policy "admin read all profiles"
  on public.profiles for select
  using (public.is_admin());


-- ────────────────────────────────────────────────────────────
-- 5. ROLE ESCALATION PREVENTION (Trigger)
-- ────────────────────────────────────────────────────────────
-- Even if a client sends a raw UPDATE with role = 'admin',
-- this trigger silently reverts the role unless the CALLER
-- already has role = 'admin'.
-- When auth.uid() is NULL (e.g. Supabase SQL Editor / Table
-- Editor running as postgres), the change is allowed.

create or replace function public.prevent_role_escalation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is not null and new.role is distinct from old.role then
    if not public.is_admin() then
      new.role := old.role;
    end if;
  end if;

  return new;
end;
$$;

drop trigger if exists enforce_role_lock on public.profiles;

create trigger enforce_role_lock
  before update on public.profiles
  for each row execute function public.prevent_role_escalation();
