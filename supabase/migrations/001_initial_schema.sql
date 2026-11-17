-- Shiv AI — initial database schema
-- Run this in your Supabase project's SQL Editor (supabase.com → SQL Editor)

create table if not exists profiles (
  id        uuid references auth.users primary key,
  name      text,
  avatar    text default '🙏',
  join_date text,
  created_at timestamptz default now()
);

create table if not exists chats (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references auth.users not null,
  role       text not null,
  content    text not null,
  created_at timestamptz default now()
);

alter table profiles enable row level security;
alter table chats    enable row level security;

create policy "Users own their profile"
  on profiles for all using (auth.uid() = id);

create policy "Users own their chats"
  on chats for all using (auth.uid() = user_id);
