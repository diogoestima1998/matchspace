-- Matchspace Music — initial schema
-- Tables: instruments, teachers, teacher_instruments, bookings
-- Multi-tenancy: RLS on every table; bookings are written by the service role only.

create table public.instruments (
  id   serial primary key,
  name text not null unique,
  slug text not null unique
);

create table public.teachers (
  id                uuid primary key references auth.users (id) on delete cascade,
  slug              text not null unique,
  full_name         text not null,
  bio               text not null default '',
  credentials       text not null default '',
  teaching_mode     text not null default 'both'
                    check (teaching_mode in ('in_person', 'online', 'both')),
  location          text,
  hourly_price_chf  integer not null check (hourly_price_chf between 10 and 500),
  availability_note text not null default '',
  is_published      boolean not null default false,
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

create table public.teacher_instruments (
  teacher_id    uuid not null references public.teachers (id) on delete cascade,
  instrument_id integer not null references public.instruments (id) on delete cascade,
  primary key (teacher_id, instrument_id)
);

create type public.booking_status as enum
  ('pending_payment', 'confirmed', 'expired', 'canceled');

create table public.bookings (
  id                uuid primary key default gen_random_uuid(),
  teacher_id        uuid not null references public.teachers (id) on delete cascade,
  student_name      text not null,
  student_email     text not null,
  requested_start   timestamptz not null,
  duration_minutes  integer not null default 60
                    check (duration_minutes in (30, 45, 60, 90)),
  message           text,
  amount_chf        integer not null check (amount_chf > 0),
  status            public.booking_status not null default 'pending_payment',
  stripe_session_id text unique,
  created_at        timestamptz not null default now(),
  confirmed_at      timestamptz
);

create index bookings_teacher_id_idx on public.bookings (teacher_id);
create index teachers_is_published_idx on public.teachers (is_published);

-- keep updated_at fresh on teacher edits
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger teachers_set_updated_at
  before update on public.teachers
  for each row execute function public.set_updated_at();

-- Row Level Security ---------------------------------------------------------

alter table public.instruments enable row level security;
alter table public.teachers enable row level security;
alter table public.teacher_instruments enable row level security;
alter table public.bookings enable row level security;

-- instruments: public read-only lookup
create policy "instruments are readable by everyone"
  on public.instruments for select
  to anon, authenticated
  using (true);

-- teachers: the public sees published profiles; a teacher manages own row
create policy "published teachers are readable by everyone"
  on public.teachers for select
  to anon, authenticated
  using (is_published or (select auth.uid()) = id);

create policy "teachers can insert their own row"
  on public.teachers for insert
  to authenticated
  with check ((select auth.uid()) = id);

create policy "teachers can update their own row"
  on public.teachers for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- teacher_instruments: readable when the teacher profile is readable;
-- writable only by the owning teacher
create policy "teacher instruments are readable with the profile"
  on public.teacher_instruments for select
  to anon, authenticated
  using (
    exists (
      select 1 from public.teachers t
      where t.id = teacher_id
        and (t.is_published or (select auth.uid()) = t.id)
    )
  );

create policy "teachers can add their own instruments"
  on public.teacher_instruments for insert
  to authenticated
  with check ((select auth.uid()) = teacher_id);

create policy "teachers can remove their own instruments"
  on public.teacher_instruments for delete
  to authenticated
  using ((select auth.uid()) = teacher_id);

-- bookings: no anon access; teachers read bookings addressed to them.
-- Inserts/updates happen exclusively through the service role in API routes,
-- so no insert/update policies exist for anon or authenticated.
create policy "teachers can read their own bookings"
  on public.bookings for select
  to authenticated
  using ((select auth.uid()) = teacher_id);
