import Image from "next/image";

import { Marquee } from "@/components/ui/Marquee/Marquee";

import { TESTIMONIALS, type Testimonial } from "./testimonials-data";

const COLUMN_DURATIONS = [
  "[--duration:45s]",
  "[--duration:60s]",
  "[--duration:38s]",
];

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article
      aria-label={`Review from ${testimonial.name}`}
      className="mb-4 flex w-full flex-col justify-between rounded-2xl border border-line bg-white p-5 shadow-sm"
    >
      <div className="text-sm leading-relaxed text-ink/70">
        {testimonial.description}
        <p className="sr-only">Rated 5 out of 5 stars</p>
        <div aria-hidden="true" className="mt-2 flex gap-0.5 py-1">
          {[0, 1, 2, 3, 4].map(function renderStar(star) {
            return (
              <svg
                key={star}
                viewBox="0 0 20 20"
                className="h-4 w-4 fill-rausch"
              >
                <path d="M10 1.5l2.47 5.33 5.83.66-4.32 3.98 1.16 5.75L10 14.35l-5.14 2.87 1.16-5.75L1.7 7.49l5.83-.66L10 1.5z" />
              </svg>
            );
          })}
        </div>
      </div>
      <div className="mt-3 flex w-full items-center gap-3">
        <Image
          src={testimonial.img}
          alt={`${testimonial.name} portrait`}
          width={40}
          height={40}
          className="h-10 w-10 rounded-full border border-line object-cover"
        />
        <div>
          <p className="text-sm font-semibold text-ink">{testimonial.name}</p>
          <p className="text-sm text-ink/60">{testimonial.role}</p>
        </div>
      </div>
    </article>
  );
}

export function Testimonials() {
  const columns = [
    TESTIMONIALS.slice(0, 4),
    TESTIMONIALS.slice(4, 8),
    TESTIMONIALS.slice(8, 12),
  ];

  return (
    <section aria-labelledby="testimonials-heading" className="border-t border-line">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <h2
          id="testimonials-heading"
          className="font-display text-2xl tracking-tight text-ink md:text-3xl"
        >
          Loved by students across Switzerland
        </h2>
        <div className="relative mt-8 max-h-[560px] overflow-hidden">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {columns.map(function renderColumn(columnTestimonials, columnIndex) {
              return (
                <Marquee
                  key={columnIndex}
                  className={COLUMN_DURATIONS[columnIndex % COLUMN_DURATIONS.length]}
                >
                  {columnTestimonials.map(function renderCard(testimonial) {
                    return (
                      <TestimonialCard
                        key={testimonial.name}
                        testimonial={testimonial}
                      />
                    );
                  })}
                </Marquee>
              );
            })}
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-white to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent" />
        </div>
      </div>
    </section>
  );
}
