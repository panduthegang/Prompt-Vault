-- ============================================================
-- Prompt Vault — Complete Auth & Roles Schema
-- ============================================================
-- CLEAN SINGLE-PASS VERSION — no ALTER TABLE chains.
-- Run top-to-bottom in a single Supabase SQL Editor run.
--
-- vs old schema:
--   + username    text (nullable, partial unique index)
--   + bio         text (nullable)
--   + avatar_url  text (nullable)
--   + Trigger seeds username from signup metadata
--   + NULLIF(..., '') so empty strings become NULL
--   + email is NOT NULL
--   + created_at is NOT NULL DEFAULT now()
--   - Removed stale ALTER TABLE ADD COLUMN chains
-- ============================================================


-- ────────────────────────────────────────────────────────────
-- TEARDOWN  (safe to run from any state)
-- ────────────────────────────────────────────────────────────
-- DROP POLICY / DROP TRIGGER require the table to exist even with IF EXISTS.
-- Wrap them in a DO block that skips gracefully when the table is already gone.

do $$ begin
  if exists (select from pg_tables where schemaname = 'public' and tablename = 'profiles') then
    drop policy if exists "read own profile"        on public.profiles;
    drop policy if exists "update own profile"      on public.profiles;
    drop policy if exists "admin read all profiles" on public.profiles;
    drop trigger if exists enforce_role_lock        on public.profiles;
  end if;
end $$;

drop trigger  if exists on_auth_user_created on auth.users;

drop function if exists public.prevent_role_escalation();
drop function if exists public.handle_new_user();
drop function if exists public.is_admin();

drop table if exists public.profiles;


-- ────────────────────────────────────────────────────────────
-- 1. PROFILES TABLE
-- ────────────────────────────────────────────────────────────
-- Mirrors auth.users 1:1. Column set matches src/types/auth.ts exactly.

create table if not exists public.profiles (
  -- Identity
  id           uuid        not null primary key
                           references auth.users (id) on delete cascade,
  email        text        not null,

  -- Access control (trigger-only; client never sets role)
  role         text        not null default 'user'
                           check (role in ('user', 'admin')),

  -- User-editable fields (nullable — fresh signup will not have these yet)
  display_name text,
  username     text,
  bio          text,
  avatar_url   text,

  -- Timestamps
  created_at   timestamptz not null default now()
);

-- Unique usernames, but allow multiple NULL rows (fresh signups)
create unique index if not exists profiles_username_key
  on public.profiles (username)
  where username is not null;


-- ────────────────────────────────────────────────────────────
-- 2. AUTO-CREATE PROFILE ON SIGNUP (Trigger)
-- ────────────────────────────────────────────────────────────
-- Fires after every new auth.users INSERT.
-- role is HARDCODED 'user' — no client can self-assign 'admin'.
-- AuthContext.signUp() sends: display_name, full_name, username, user_name.
-- NULLIF converts empty strings to NULL (no empty @handles stored).

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, role, display_name, username)
  values (
    new.id,
    new.email,
    'user',
    nullif(trim(coalesce(
      new.raw_user_meta_data ->> 'display_name',
      new.raw_user_meta_data ->> 'full_name',
      ''
    )), ''),
    nullif(trim(coalesce(
      new.raw_user_meta_data ->> 'username',
      new.raw_user_meta_data ->> 'user_name',
      ''
    )), '')
  )
  on conflict (id) do update
    set email        = excluded.email,
        display_name = excluded.display_name,
        username     = excluded.username;

  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- ────────────────────────────────────────────────────────────
-- 3. HELPER: is_admin() (Security Definer)
-- ────────────────────────────────────────────────────────────
-- Called by RLS policies. SECURITY DEFINER avoids RLS recursion.

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

-- Each user can read their own row
create policy "read own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Each user can update their own row
-- (role column is protected by the trigger below)
create policy "update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Admins can read all rows (AdminUsers page)
create policy "admin read all profiles"
  on public.profiles for select
  using (public.is_admin());


-- ────────────────────────────────────────────────────────────
-- 5. ROLE ESCALATION PREVENTION (Trigger)
-- ────────────────────────────────────────────────────────────
-- Silently reverts role changes from non-admin clients.
-- SQL Editor / postgres (auth.uid() IS NULL) is exempt —
-- that is how manual admin promotion works.

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

create trigger enforce_role_lock
  before update on public.profiles
  for each row execute function public.prevent_role_escalation();


-- ────────────────────────────────────────────────────────────
-- ADMIN PROMOTION (SQL Editor only — never expose client-side)
-- ────────────────────────────────────────────────────────────
--   update public.profiles set role = 'admin' where email = 'you@example.com';
