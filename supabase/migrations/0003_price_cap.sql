-- Raises the maximum hourly price from CHF 500 to CHF 1000.

alter table public.teachers drop constraint teachers_hourly_price_chf_check;
alter table public.teachers add constraint teachers_hourly_price_chf_check
  check (hourly_price_chf between 10 and 1000);
