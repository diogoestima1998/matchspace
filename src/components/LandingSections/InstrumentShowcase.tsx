import Link from "next/link";

import { Reveal } from "@/components/ui/Reveal/Reveal";

import { InstrumentIcon } from "@/components/InstrumentIcon/InstrumentIcon";

const SHOWCASE_INSTRUMENTS = [
  { name: "Piano", slug: "piano" },
  { name: "Guitar", slug: "guitar" },
  { name: "Violin", slug: "violin" },
  { name: "Voice", slug: "voice" },
  { name: "Cello", slug: "cello" },
  { name: "Drums", slug: "drums" },
  { name: "Flute", slug: "flute" },
  { name: "Saxophone", slug: "saxophone" },
  { name: "Clarinet", slug: "clarinet" },
  { name: "Trumpet", slug: "trumpet" },
  { name: "Ukulele", slug: "ukulele" },
  { name: "Bass", slug: "bass" },
  { name: "Viola", slug: "viola" },
  { name: "Accordion", slug: "accordion" },
] as const;

export function InstrumentShowcase() {
  return (
    <section
      aria-labelledby="instruments-heading"
      className="border-t border-line"
    >
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Reveal>
          <h2
            id="instruments-heading"
            className="font-display text-2xl tracking-tight text-ink md:text-3xl"
          >
            Browse by instrument
          </h2>
          <ul className="mt-6 flex flex-wrap gap-3">
            {SHOWCASE_INSTRUMENTS.map(function renderInstrument(instrument) {
              return (
                <li key={instrument.slug}>
                  <Link
                    href={`/teachers?instrument=${instrument.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-5 py-2.5 text-sm font-medium text-ink transition-all hover:border-ink hover:shadow-md hover:shadow-ink/5"
                  >
                    <InstrumentIcon
                      name={instrument.slug}
                      className="h-4 w-4 text-ink/70"
                    />
                    {instrument.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
