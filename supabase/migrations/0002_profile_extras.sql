-- Adds portraits and display ratings to teacher profiles.
-- Seeded teachers get portraits shipped in the app's /public folder and
-- believable seed ratings; real review collection is out of scope for the slice.

alter table public.teachers add column if not exists avatar_url text;
alter table public.teachers add column if not exists rating numeric(2, 1)
  check (rating is null or (rating between 1.0 and 5.0));
alter table public.teachers add column if not exists review_count integer not null default 0
  check (review_count >= 0);

update public.teachers set avatar_url = '/teachers/' || slug || '-2.jpg'
where slug in ('luca-bernasconi', 'matteo-rossi', 'david-brunner');

update public.teachers set avatar_url = '/teachers/' || slug || '-3.jpg'
where slug in ('anna-keller', 'jonas-widmer', 'sofia-meier', 'elodie-favre', 'celine-dubois');

update public.teachers set rating = 4.9, review_count = 127 where slug = 'anna-keller';
update public.teachers set rating = 4.8, review_count = 89  where slug = 'luca-bernasconi';
update public.teachers set rating = 5.0, review_count = 64  where slug = 'elodie-favre';
update public.teachers set rating = 4.7, review_count = 41  where slug = 'jonas-widmer';
update public.teachers set rating = 4.9, review_count = 103 where slug = 'sofia-meier';
update public.teachers set rating = 4.8, review_count = 57  where slug = 'matteo-rossi';
update public.teachers set rating = 4.9, review_count = 72  where slug = 'celine-dubois';
update public.teachers set rating = 4.6, review_count = 38  where slug = 'david-brunner';
