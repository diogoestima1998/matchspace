import Image from "next/image";

import { Reveal } from "@/components/ui/Reveal/Reveal";

function CheckItem({ children }: { children: string }) {
  return (
    <li className="flex items-start gap-2.5 text-ink/70">
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        fill="none"
        className="mt-1 h-4 w-4 shrink-0 text-rausch"
      >
        <path
          d="M4.5 10.5l3.5 3.5 7.5-8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {children}
    </li>
  );
}

function ProfileFloatingCard() {
  return (
    <div className="absolute -bottom-6 left-6 w-64 rounded-2xl border border-line bg-white p-4 shadow-xl shadow-ink/10">
      <div className="flex items-center gap-3">
        <Image
          src="/teachers/anna-keller-3.jpg"
          alt="Anna Keller"
          width={44}
          height={44}
          className="h-11 w-11 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="truncate font-semibold text-ink">Anna Keller</p>
          <p className="truncate text-xs text-ink/60">Piano · Zürich</p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-sm">
        <span className="inline-flex items-center gap-1 text-ink">
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            className="h-3.5 w-3.5 fill-current"
          >
            <path d="M10 1.5l2.47 5.33 5.83.66-4.32 3.98 1.16 5.75L10 14.35l-5.14 2.87 1.16-5.75L1.7 7.49l5.83-.66L10 1.5z" />
          </svg>
          <span className="tabular-nums font-medium">4.9</span>
          <span className="tabular-nums text-ink/50">(127)</span>
        </span>
        <span className="tabular-nums font-semibold text-ink">CHF 95 / h</span>
      </div>
      <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        Taking new students
      </span>
    </div>
  );
}

function BookingFloatingCard() {
  return (
    <div className="absolute -bottom-6 left-6 w-64 rounded-2xl border border-line bg-white p-4 shadow-xl shadow-ink/10">
      <div className="flex items-center gap-2.5">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
          <svg
            aria-hidden="true"
            viewBox="0 0 20 20"
            fill="none"
            className="h-4 w-4"
          >
            <path
              d="M4.5 10.5l3.5 3.5 7.5-8"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <p className="font-semibold text-ink">Booking confirmed</p>
      </div>
      <dl className="mt-3 space-y-1.5 border-t border-line pt-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-ink/60">Guitar lesson</dt>
          <dd className="text-ink">60 min</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink/60">Thu 16 Jul</dt>
          <dd className="tabular-nums text-ink">17:00</dd>
        </div>
        <div className="flex justify-between font-medium">
          <dt className="text-ink/60">Paid via Stripe</dt>
          <dd className="tabular-nums text-ink">CHF 70.00</dd>
        </div>
      </dl>
    </div>
  );
}

export function FeatureShowcase() {
  return (
    <section
      aria-labelledby="features-heading"
      className="border-t border-line bg-mist/60"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <h2 id="features-heading" className="sr-only">
          Why learn with Matchspace
        </h2>
        <Reveal>
          <div className="grid items-center gap-14 md:grid-cols-2 md:gap-16">
            <div className="relative">
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                <Image
                  src="/images/feature-teacher.jpg"
                  alt="A piano teacher playing a grand piano in a bright studio"
                  fill
                  sizes="(max-width: 768px) 100vw, 550px"
                  className="object-cover"
                />
              </div>
              <ProfileFloatingCard />
            </div>
            <div>
              <h3 className="font-display text-2xl tracking-tight text-ink md:text-4xl">
                Know your teacher before the first note.
              </h3>
              <p className="mt-4 max-w-md leading-relaxed text-ink/60">
                Every profile shows who you&apos;ll actually be learning from -
                so you can choose with confidence.
              </p>
              <ul className="mt-6 space-y-3">
                <CheckItem>
                  Real credentials - conservatoires, orchestras, diplomas
                </CheckItem>
                <CheckItem>
                  Transparent hourly prices in francs, no surprises
                </CheckItem>
                <CheckItem>Ratings and reviews from real students</CheckItem>
              </ul>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <div className="mt-24 grid items-center gap-14 md:grid-cols-2 md:gap-16">
            <div className="md:order-2">
              <div className="relative">
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
                  <Image
                    src="/images/feature-booking.jpg"
                    alt="A student with his guitar booking a lesson on his phone"
                    fill
                    sizes="(max-width: 768px) 100vw, 550px"
                    className="object-cover"
                  />
                </div>
                <BookingFloatingCard />
              </div>
            </div>
            <div className="md:order-1">
              <h3 className="font-display text-2xl tracking-tight text-ink md:text-4xl">
                From &ldquo;some day&rdquo; to booked in minutes.
              </h3>
              <p className="mt-4 max-w-md leading-relaxed text-ink/60">
                No account, no phone calls, no awkward price talk - pick a time,
                pay securely, and start playing.
              </p>
              <ul className="mt-6 space-y-3">
                <CheckItem>
                  Choose the date, time and duration that fit your week
                </CheckItem>
                <CheckItem>
                  No account needed - just your name and email
                </CheckItem>
                <CheckItem>
                  Pay securely with Stripe, confirmed instantly
                </CheckItem>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
