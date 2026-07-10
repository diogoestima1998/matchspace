import type { Metadata } from "next";

import { SiteFooter } from "@/components/SiteFooter/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader/SiteHeader";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

const SECTIONS = [
  {
    title: "1. What we collect",
    body: "When you request a lesson we collect your name, email address and the booking details you provide. Teachers additionally provide profile information (name, bio, credentials, location, prices) that is published at their request.",
  },
  {
    title: "2. Payments",
    body: "Payments are processed by Stripe. Your card details never touch our servers - we only receive a confirmation that payment succeeded, together with the booking reference.",
  },
  {
    title: "3. How we use your data",
    body: "Booking details are shared with the teacher you booked so they can contact you and deliver the lesson. We do not sell your data or use it for advertising.",
  },
  {
    title: "4. Where it lives",
    body: "Data is stored with Supabase (Postgres) with row-level security controlling access. Teachers can only see bookings addressed to them.",
  },
  {
    title: "5. Demo notice",
    body: "This site is a technical demonstration built as a take-home assignment. Data entered here is seed or test data and may be deleted at any time. Please do not enter real personal information.",
  },
] as const;

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-6 py-14 md:py-20">
          <h1 className="font-display text-3xl tracking-tight text-ink md:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-ink/50">Last updated: July 2026</p>
          <div className="mt-10 space-y-8">
            {SECTIONS.map(function renderSection(section) {
              return (
                <section key={section.title}>
                  <h2 className="font-semibold text-ink">{section.title}</h2>
                  <p className="mt-2 leading-relaxed text-ink/70">
                    {section.body}
                  </p>
                </section>
              );
            })}
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
