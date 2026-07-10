# AI Workflow

How this slice was built with agentic AI tooling, and where human judgment shaped or overrode the output.

## Tools

- **Claude Code** (Anthropic CLI, Claude Code) — the primary agent for architecture, implementation, live browser verification, and database operations.
- **Higgsfield** (CLI + agent skills) — AI image generation for all photography: teacher portraits (Soul V2), hero/marketing imagery (GPT Image 2 for composition-constrained shots, Nano Banana Pro for 4K and reference-based edits).
- **Supabase dashboard / SQL editor** — schema, RLS, and seeds executed against a live project.

## Process

1. **PRD first.** Before any code, I wrote a module-by-module PRD (scope, non-goals, data model, RLS matrix, security decisions, time budget) and fed it to Claude Code one module at a time: scaffold → schema/RLS/seed → design system → auth → profile dashboard → directory → detail → booking + Stripe → webhook → tests → docs.
2. **Version-matched docs over training data.** Next.js 16 shipped breaking changes (async `params`/`cookies()`, `middleware.ts` renamed to `proxy.ts`); the agent read the bundled `node_modules/next/dist/docs` before writing framework code instead of trusting stale knowledge.
3. **Verify in the real app, not just the compiler.** Every feature was checked in a live browser session (navigating, clicking through the booking drawer, screenshotting) plus `tsc`, ESLint, and the Vitest suite on every change.
4. **The database was treated as production.** Schema changes went through SQL the agent wrote and I reviewed; RLS was attacked with real requests, not assumed correct.

## Accepted, changed, rejected — concrete examples

- **Rejected (security):** the booking API was specified from the start so the client can never send a price — the server re-fetches the teacher and computes the amount. A unit test pins that the Zod schema strips an injected `amount_chf`.
- **AI-introduced bug, caught by manual testing:** the booking drawer was rendered inside the sticky booking-card container; `position: sticky` creates a stacking context, so the drawer's z-index was trapped and the page header painted over it. Diagnosed from a screenshot, fixed by rendering the drawer through a React portal to `document.body`.
- **Auth edge case found by deliberately testing wrong input:** signing up with an already-registered email showed "confirm your email" — Supabase returns an obfuscated fake user (anti-enumeration) that the first implementation misread. Fixed by detecting the `identities: []` fingerprint; verified against the live API.
- **Tooling interference diagnosed, not guessed:** a CSS animation "didn't work" because running `next build` while `next dev` was live corrupted the shared `.next` cache — the fix was understanding the toolchain, not rewriting the CSS.
- **Cross-platform consistency pass:** native `<select>`, date picker, and range inputs looked different per OS; replaced with custom listbox/calendar/bracket components. The same reasoning killed the price _slider_ in favor of discrete brackets — false precision at 29 teachers.
- **Image generation needed constant human QA:** models hallucinated gibberish text onto pianos, t-shirts, and film borders, and produced a six-fingered hand — each caught by inspection and regenerated, often switching models (Soul → GPT Image 2 for "no text" compliance, Nano Banana Pro for anatomy at 4K).
- **Cache-busting discipline:** replacing images in place silently served stale files through the Next image optimizer; the convention became new filename + database path update.

## Where manual review was applied

Every migration and RLS policy (then verified with live attack requests: anon insert, cross-tenant update, bookings read), the Stripe route and confirmation logic, the proxy/auth flow, and all generated imagery.

## Verification before committing

`npm run build` + `tsc --noEmit` + ESLint + 18 Vitest tests green; live RLS test battery against the real database; full happy path exercised in the browser (signup → publish → appear in directory → book → pay with the test card → booking confirmed in the teacher dashboard).

## What I'd improve with more time

Playwright e2e tests as an executable spec the agent can run itself; generated DB types from the live schema instead of hand-written ones; smaller, per-module commits pushed as the work happens rather than staged at the end; a CI pipeline so the verification battery runs on every push.
