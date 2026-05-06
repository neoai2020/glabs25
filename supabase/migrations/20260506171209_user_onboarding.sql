-- Adds the column the onboarding completion handler best-effort writes to.
-- The app must function whether or not this migration has been applied; the
-- gate helper and completion path swallow any DB errors caused by a missing
-- table or column.

create table if not exists public.users (
  id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.users
  add column if not exists onboarding_completed_at timestamptz;
