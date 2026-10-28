-- SciOArt — Supabase schema for "Ask an Expert"
-- Run this once in Supabase: Dashboard → SQL Editor → New query → paste → Run.

-- 1. Questions table ---------------------------------------------------------
create table if not exists public.expert_questions (
  id           uuid primary key default gen_random_uuid(),
  created_at   timestamptz not null default now(),
  name         text,
  contact      text not null check (char_length(contact) between 3 and 120),
  district     text not null,
  crop         text not null,
  operation    text,
  question     text not null check (char_length(question) between 15 and 2000),
  photo_path   text,
  locale       text not null default 'pa' check (locale in ('pa', 'en')),
  status       text not null default 'new' check (status in ('new', 'assigned', 'answered', 'closed')),
  answer       text,
  answered_at  timestamptz
);

create index if not exists expert_questions_created_idx on public.expert_questions (created_at desc);
create index if not exists expert_questions_status_idx on public.expert_questions (status);

-- 2. Row Level Security: the public website may only ADD questions -----------
alter table public.expert_questions enable row level security;

drop policy if exists "Anyone can submit a question" on public.expert_questions;
create policy "Anyone can submit a question"
  on public.expert_questions
  for insert
  to anon
  with check (status = 'new' and answer is null and answered_at is null);

-- No select/update/delete policies for anon: questions are read and answered
-- by the PAU team in the Supabase dashboard (or a future admin page).

-- 3. Storage bucket for photos ------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('question-photos', 'question-photos', false, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

drop policy if exists "Anyone can upload a question photo" on storage.objects;
create policy "Anyone can upload a question photo"
  on storage.objects
  for insert
  to anon
  with check (bucket_id = 'question-photos');
