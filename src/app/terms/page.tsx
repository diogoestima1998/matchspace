import type { Metadata } from "next";

import { SiteFooter } from "@/components/SiteFooter/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader/SiteHeader";

export const metadata: Metadata = {
  title: "Terms & Conditions",
};

const SECTIONS = [
  {
    title: "1. The platform",
    body: "Matchspace Music connects independent music teachers with students. Teachers publish their own profiles, set their own prices and deliver lessons under their own responsibility. Matchspace Music is not a party to the lesson agreement between teacher and student.",
  },
  {
    title: "2. Bookings & payments",
    body: "Lesson requests are confirmed once payment is completed through our payment provider, Stripe. Prices are shown in Swiss francs (CHF) and include the full lesson fee. The exact lesson address is shared between teacher and student after a confirmed booking.",
  },
  {
    title: "3. Cancellations",
    body: "Cancellation and rescheduling arrangements are agreed directly between the student and the teacher. Contact your teacher via the email exchanged at booking as early as possible if you cannot attend.",
  },
  {
    title: "4. Teacher accounts",
    body: "Teachers are responsible for the accuracy of their profile, credentials and availability. Profiles that misrepresent qualifications may be unpublished.",
  },
  {
    title: "5. Demo notice",
    body: "This site is a technical demonstration built as a take-home assignment. Bookings use Stripe test mode only - no real payments are processed and no real lessons are provided.",
  },
] as const;

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-2xl px-6 py-14 md:py-20">
          <h1 className="font-display text-3xl tracking-tight text-ink md:text-4xl">
            Terms &amp; Conditions
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
