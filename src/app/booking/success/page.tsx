import Link from "next/link";
import type { Metadata } from "next";

import { SiteFooter } from "@/components/SiteFooter/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader/SiteHeader";
import { Button } from "@/components/ui/Button/Button";
import { confirmBooking } from "@/lib/bookings";

export const metadata: Metadata = {
  title: "Booking confirmed",
};

type SuccessPageProps = {
  searchParams: Promise<{ session_id?: string }>;
};

function formatLessonDate({ isoDate }: { isoDate: string }) {
  return new Intl.DateTimeFormat("en-CH", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(isoDate));
}

export default async function BookingSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const { session_id: sessionId } = await searchParams;

  const result = sessionId
    ? await confirmBooking({ sessionId })
    : ({ confirmed: false } as const);

  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg text-center">
          {result.confirmed ? (
            <div className="rounded-2xl border border-line bg-white p-10">
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-rausch">
                Booking confirmed
              </p>
              <h1 className="mt-4 font-display text-4xl text-ink">
                You&apos;re booked in. <em className="text-ink">Bravo.</em>
              </h1>
              <dl className="mt-8 space-y-3 border-t border-line pt-6 text-left text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-ink/60">Teacher</dt>
                  <dd className="font-medium text-ink">
                    {result.teacher.full_name}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-ink/60">Date & time</dt>
                  <dd className="text-right font-medium text-ink">
                    {formatLessonDate({
                      isoDate: result.booking.requested_start,
                    })}
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-ink/60">Duration</dt>
                  <dd className="font-medium text-ink">
                    {result.booking.duration_minutes} minutes
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-ink/60">Paid</dt>
                  <dd className="tabular-nums font-medium text-ink">
                    CHF {result.booking.amount_chf}
                  </dd>
                </div>
              </dl>
              <p className="mt-6 text-sm leading-relaxed text-ink/60">
                {result.teacher.full_name} will contact you at{" "}
                <span className="font-medium text-ink">
                  {result.booking.student_email}
                </span>{" "}
                to confirm the details of your first lesson.
              </p>
              <div className="mt-8">
                <Button href="/teachers">Browse more teachers</Button>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-line bg-white p-10">
              <h1 className="font-display text-4xl text-ink">
                We couldn&apos;t verify this payment.
              </h1>
              <p className="mt-4 text-ink/60">
                If you completed the payment, your booking is safe - the
                confirmation may simply take a moment. Otherwise, please try
                booking again.
              </p>
              <div className="mt-8">
                <Button href="/teachers">Back to teachers</Button>
              </div>
            </div>
          )}
          <p className="mt-6 text-sm text-ink/50">
            Questions?{" "}
            <Link href="/" className="text-rausch hover:underline">
              Matchspace Music
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
