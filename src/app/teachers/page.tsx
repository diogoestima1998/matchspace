import { Suspense } from "react";
import type { Metadata } from "next";

import { SiteFooter } from "@/components/SiteFooter/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader/SiteHeader";
import { TeacherDirectory } from "@/components/TeacherDirectory/TeacherDirectory";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { fetchInstruments, fetchPublishedTeachers } from "@/services/teachers";

export const metadata: Metadata = {
  title: "Find a teacher",
  description:
    "Browse published music teachers across Switzerland. Filter by instrument, lesson format and price.",
};

export default async function TeachersPage() {
  const supabase = await createSupabaseServerClient();

  const [teachers, instruments] = await Promise.all([
    fetchPublishedTeachers({ client: supabase }),
    fetchInstruments({ client: supabase }),
  ]);

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-rausch">
            The directory
          </p>
          <h1 className="mt-3 font-display text-4xl tracking-tight text-ink md:text-5xl">
            Find your teacher.
          </h1>
          <p className="mt-3 max-w-xl text-ink/70">
            {teachers.length} teachers currently taking new students. Every
            profile is published by the teacher, with real prices.
          </p>
          <div className="mt-10">
            <Suspense>
              <TeacherDirectory
                initialTeachers={teachers}
                instruments={instruments}
              />
            </Suspense>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
