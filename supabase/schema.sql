-- ============================================================
-- Prompt Vault — Auth & Roles Setup (Production Hardened)
-- Run this once in Supabase SQL Editor (Dashboard → SQL Editor → New query)
-- Order matters — run top to bottom in a single execution.
-- ============================================================

-- 1. PROFILES TABLE
-- Mirrors auth.users 1:1. Never store role/app data directly on auth.users.
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz default now()
);


-- 2. AUTO-CREATE PROFILE ON SIGNUP
-- Fires on every new auth.users row. Role is HARDCODED to 'user' here —
-- it deliberately ignores anything sent from the client signup payload,
-- so no one can self-assign 'admin' via options.data.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'user')
  on conflict (id) do nothing;
  return new;
end;
$$;

-- Drop trigger first to make it safely re-runnable
drop trigger if exists on_auth_user_created on auth.users;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- 3. ROW LEVEL SECURITY (RLS)
alter table public.profiles enable row level security;

-- Drop existing policies if re-running
drop policy if exists "read own profile" on public.profiles;
drop policy if exists "update own profile" on public.profiles;
drop policy if exists "admin read all profiles" on public.profiles;

-- Users can read their own profile row
create policy "read own profile" on public.profiles
  for select using (auth.uid() = id);

-- Users can update their own profile row (see trigger below for role lockdown)
create policy "update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Admins can read all profiles (needed for Admin Dashboard / User Directory)
create policy "admin read all profiles" on public.profiles
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );


-- 4. HARD LOCK ON ROLE ESCALATION
-- Extra safety net: even if the client sends a raw update with role: 'admin',
-- this trigger silently forces role back to its previous value unless the
-- CALLER (not the target row) already has role = 'admin'.
create or replace function public.prevent_role_escalation()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role is distinct from old.role then
    if not exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    ) then
      new.role := old.role;
    end if;
  end if;
  return new;
end;
$$;

-- Drop trigger first to make it safely re-runnable
drop trigger if exists enforce_role_lock on public.profiles;

create trigger enforce_role_lock
  before update on public.profiles
  for each row execute function public.prevent_role_escalation();
