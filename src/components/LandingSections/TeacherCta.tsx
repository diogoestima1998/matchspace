import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/ui/Reveal/Reveal";

export function TeacherCta() {
  return (
    <section
      aria-labelledby="teacher-cta-heading"
      className="border-t border-line"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl px-8 py-16 text-center md:px-16 md:py-24">
            <Image
              src="/images/cta-class.jpg"
              alt=""
              fill
              sizes="(max-width: 1152px) 100vw, 1104px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-ink/35" />
            <div className="relative">
              <p className="text-sm font-semibold uppercase tracking-wide text-white/80">
                For teachers
              </p>
              <h2
                id="teacher-cta-heading"
                className="mx-auto mt-3 max-w-2xl font-display text-3xl tracking-tight text-white md:text-5xl"
              >
                Your studio, fully booked.
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/85">
                Publish a profile with your credentials, instruments and rates.
                Students find you, request lessons and pay online - you simply
                teach.
              </p>
              <div className="mt-8">
                <Link
                  href="/signup"
                  className="inline-flex items-center justify-center rounded-lg bg-white px-7 py-3.5 font-semibold text-ink transition-transform hover:scale-[1.02]"
                >
                  Start teaching
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
