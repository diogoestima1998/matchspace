# Matchspace Music — Teacher Booking Platform (Vertical Slice)

A take-home vertical slice of a music-teacher marketplace: teachers publish profiles with credentials and prices, students browse a public directory and book a lesson with Stripe Checkout — no student account required.

**Live demo:** https://matchspace-xi.vercel.app
**Demo teacher login:** `anna.keller@example.com` / `MatchspaceDemo1!` (all 29 seeded teachers share this password)
**Stripe test card:** `4242 4242 4242 4242`, any future expiry, any CVC

## Quick start

```bash
npm install
cp .env.example .env.local   # fill in the values below
npm run dev
```

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser client (RLS-enforced) |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only admin client (bookings) — never shipped to the browser (`server-only` guard) |
| `STRIPE_SECRET_KEY` | Stripe test mode |
| `STRIPE_WEBHOOK_SECRET` | Only needed for the bonus webhook (`stripe listen --forward-to localhost:3000/api/webhooks/stripe`) |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Publishable token for the teacher-location maps |
| `NEXT_PUBLIC_APP_URL` | Base URL for Stripe redirects |

Database setup: run `supabase/migrations/*.sql` in order, then `supabase/seed.sql`, in the Supabase SQL editor. The seed creates 14 instruments and 29 published teachers with login-able auth accounts.

Tests: `npm test` (Vitest — pricing incl. rounding, booking/profile validation, slug generation).

## Architecture

- **Next.js 16 App Router + strict TypeScript.** Server Components fetch all public pages (SEO, fast first paint); React Query owns client-side interactivity (directory filters with URL state, form mutations). No data fetching in `useEffect`.
- **Two Supabase clients.** The anon client (browser) is fully RLS-enforced — teachers edit their own profile through it, so authorization lives in the database, not in route code. The service-role client exists only in API routes behind `server-only`.
- **Price integrity — the key security decision.** The client never sends a price. `POST /api/bookings` receives `teacher_id` + slot, re-fetches the teacher server-side, rejects unpublished teachers, computes `amount_chf` itself, and only then creates the Stripe Checkout Session. The Zod schema strips any injected `amount_chf` (unit-tested). Direct inserts into `bookings` are impossible for anon/authenticated roles — verified by live test.
- **Booking lifecycle is a small state machine:** `pending_payment → confirmed | expired | canceled`. The row is created *before* redirecting to Stripe with the booking id in `client_reference_id` + `metadata`.
- **Dual confirmation, one idempotent function.** The success page verifies against Stripe's API (never trusts the query string); the bonus webhook (`checkout.session.completed`, signature-verified) calls the same `confirmBooking` — the `stripe_session_id` unique constraint plus a status-guarded update make both paths safe to race.
- **Auth:** Supabase email+password; `proxy.ts` (Next 16's middleware) refreshes sessions and guards `/dashboard/*`; pages re-check `getUser()` server-side.

## Data model

`instruments` ←M:N via `teacher_instruments`→ `teachers` (1:1 with `auth.users`) ←1:N— `bookings`

- `teacher_instruments` is a junction table with a composite PK rather than an `int[]` column: referential integrity both ways, no duplicates, indexed filtering in both directions. An array would be a workable shortcut but loses FK enforcement.
- `bookings.amount_chf` snapshots the price at booking time — later price changes don't rewrite history.
- `bookings.stripe_session_id` is `unique` — the idempotency anchor for confirmation.

### RLS matrix

| Table | anon | authenticated teacher | service role |
|---|---|---|---|
| `instruments` | select | select | all |
| `teachers` | select where published | select/insert/update own row | all |
| `teacher_instruments` | select via published teacher | modify own rows | all |
| `bookings` | none | select own (read-only) | all — written only server-side |

Verified live, not just by reading policies: anon inserts to `teachers`/`bookings` are rejected (42501), anon reads of `bookings` return nothing, a logged-in teacher's cross-tenant `UPDATE` affects 0 rows while their own row updates fine.

## Assumptions

- Prices in whole CHF (no cents needed at lesson-price granularity); Stripe amount = `amount_chf * 100`.
- One platform Stripe account; teacher payouts (Stripe Connect) out of scope.
- Availability is informational free text — no calendar engine or conflict detection on requested slots.
- `pending_payment` bookings older than the 1h Checkout expiry are considered stale; a cron would sweep them to `expired` in production.
- Location maps are city-level only (privacy: exact address is exchanged after booking).
- Teacher ratings/review counts are seeded display data; a real review system is out of scope. New teachers show a "New teacher" badge instead.

## Known limitations & cut list

- **No student accounts** — deliberate: booking friction kills marketplaces; Stripe guarantees payment identity. Trade-off: no student booking history.
- **No teacher payouts / Stripe Connect**, **no email notifications** (Resend would be the next step), **no password reset flow**, **no reviews system** (display-only ratings), **no rate limiting** on the booking endpoint.
- Signup reveals whether an email is registered (standard consumer UX; Supabase's API layer itself stays enumeration-safe).
- Supabase SSR session cookies are JS-readable — inherent to the `@supabase/ssr` pattern; mitigated by React's escaping and no `dangerouslySetInnerHTML`.
- DB types are hand-written (`src/lib/database.types.ts`) rather than generated — fine at 4 tables, would switch to `supabase gen types` as the schema grows.
- `mapbox-gl` is the one dependency beyond the core stack — an interactive map was worth ~70kb for demo polish.
- All photography is AI-generated (Higgsfield) — a real marketplace would use verified teacher photos.

## What I'd do next

Stripe Connect payouts → availability/calendar engine with conflict detection → transactional emails (Resend) → Playwright e2e suite → rate limiting + CAPTCHA on booking → generated DB types + CI pipeline → review system to replace seeded ratings.
