import Image from "next/image";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { fetchInstruments } from "@/services/teachers";

import { SearchPill } from "./SearchPill";

export async function Hero() {
  const supabase = await createSupabaseServerClient();
  const instruments = await fetchInstruments({ client: supabase });

  return (
    <section className="relative border-b border-line">
      <Image
        src="/images/hero-energy.jpg"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-top"
      />
      <div className="absolute inset-0 bg-white/15" />
      <div className="relative mx-auto max-w-6xl px-6 pb-20 pt-20 text-center md:pb-28 md:pt-32">
        <h1 className="stagger-item mx-auto max-w-2xl font-display text-4xl tracking-tight text-ink md:text-6xl">
          Find your music teacher.
        </h1>
        <p className="stagger-item mx-auto mt-4 max-w-xl text-lg text-ink/70 [--stagger-index:1]">
          Qualified teachers across Switzerland - compare instruments and
          prices, then book your first lesson in minutes.
        </p>
        <div className="stagger-item relative z-10 mt-8 [--stagger-index:2]">
          <SearchPill instruments={instruments} />
        </div>
        <p className="stagger-item mt-6 text-sm text-ink/60 [--stagger-index:3]">
          No student account needed · Secure payment with Stripe · From CHF 45 /
          hour
        </p>
      </div>
    </section>
  );
}
