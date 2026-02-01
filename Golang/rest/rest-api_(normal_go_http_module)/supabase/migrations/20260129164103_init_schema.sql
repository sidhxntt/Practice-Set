-- Enable UUID extension (recommended)
create extension if not exists "pgcrypto";

-- USERS table
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  username text not null,
  email text not null unique,
  age int not null,
  created_at timestamptz default now()
);

-- POSTS table
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users(id) on delete cascade,
  title text not null,
  content text,
  created_at timestamptz default now()
);
