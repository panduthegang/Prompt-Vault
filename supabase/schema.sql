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
-- NON-DESTRUCTIVE RE-RUN PREPARATION
-- ────────────────────────────────────────────────────────────
-- Drops and refreshes functions, policies, and triggers WITHOUT
-- touching or deleting existing table rows or dropping tables.

do $$ begin
  if exists (select from pg_tables where schemaname = 'public' and tablename = 'master_categories') then
    drop policy if exists "read active master categories"  on public.master_categories;
    drop policy if exists "admin insert master categories" on public.master_categories;
    drop policy if exists "admin update master categories" on public.master_categories;
    drop policy if exists "admin delete master categories" on public.master_categories;
    drop trigger if exists set_master_categories_updated_at on public.master_categories;
  end if;

  if exists (select from pg_tables where schemaname = 'public' and tablename = 'profiles') then
    drop policy if exists "read own profile"        on public.profiles;
    drop policy if exists "update own profile"      on public.profiles;
    drop policy if exists "admin read all profiles" on public.profiles;
    drop trigger if exists enforce_role_lock        on public.profiles;
  end if;
end $$;

drop trigger if exists on_auth_user_created on auth.users;

-- Note: Tables are preserved with IF NOT EXISTS. Existing data is NEVER dropped.


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

-- Auto-backfill profiles for any existing auth.users accounts
insert into public.profiles (id, email, role, display_name, username, created_at)
select
  id,
  email,
  'user' as role,
  nullif(trim(coalesce(raw_user_meta_data ->> 'display_name', raw_user_meta_data ->> 'full_name', '')), '') as display_name,
  nullif(trim(coalesce(raw_user_meta_data ->> 'username', raw_user_meta_data ->> 'user_name', '')), '') as username,
  created_at
from auth.users
on conflict (id) do nothing;


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
-- 6. MASTER CATEGORIES TABLE (Taxonomy Governance & Soft-Delete)
-- ────────────────────────────────────────────────────────────

create table if not exists public.master_categories (
  id            uuid        not null primary key default gen_random_uuid(),
  name          text        not null,
  description   text,
  category_type text        not null check (category_type in ('prompt', 'skill', 'website')),
  is_active     boolean     not null default true,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz,
  created_by    uuid        references auth.users (id) on delete set null,
  updated_by    uuid        references auth.users (id) on delete set null
);

create index if not exists idx_master_categories_is_active
  on public.master_categories (is_active);

create index if not exists idx_master_categories_type
  on public.master_categories (category_type);

-- Ensure active category names are unique per scope (prompt, skill, website)
create unique index if not exists idx_master_categories_unique_active
  on public.master_categories (lower(name), category_type)
  where is_active = true;

-- Trigger to maintain updated_at automatically
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger set_master_categories_updated_at
  before update on public.master_categories
  for each row execute function public.handle_updated_at();


-- ────────────────────────────────────────────────────────────
-- 7. MASTER CATEGORIES RLS POLICIES
-- ────────────────────────────────────────────────────────────

alter table public.master_categories enable row level security;

-- Active categories can be read by all authenticated users; admins can read all
create policy "read active master categories"
  on public.master_categories for select
  using (is_active = true or public.is_admin());

-- Only admins can create categories
create policy "admin insert master categories"
  on public.master_categories for insert
  with check (public.is_admin());

-- Only admins can update categories (including soft deletion: is_active = false)
create policy "admin update master categories"
  on public.master_categories for update
  using (public.is_admin())
  with check (public.is_admin());

-- Admins can hard delete via SQL if necessary
create policy "admin delete master categories"
  on public.master_categories for delete
  using (public.is_admin());


-- ────────────────────────────────────────────────────────────
-- ADMIN PROMOTION (SQL Editor only — never expose client-side)
-- ────────────────────────────────────────────────────────────
--   update public.profiles set role = 'admin' where email = 'you@example.com';



