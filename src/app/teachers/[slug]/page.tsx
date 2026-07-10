import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { BookingCard } from "@/components/BookingCard/BookingCard";
import { InstrumentIcon } from "@/components/InstrumentIcon/InstrumentIcon";
import { TeacherLocationMap } from "@/components/TeacherLocationMap/TeacherLocationMap";
import { TeacherAvatar } from "@/components/TeacherAvatar/TeacherAvatar";
import { StarRating } from "@/components/ui/StarRating/StarRating";
import { SiteFooter } from "@/components/SiteFooter/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader/SiteHeader";
import { Badge } from "@/components/ui/Badge/Badge";
import { TEACHING_MODE_LABELS } from "@/lib/constants";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { fetchTeacherBySlug } from "@/services/teachers";

type TeacherPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: TeacherPageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();
  const teacher = await fetchTeacherBySlug({ client: supabase, slug });

  if (!teacher) {
    return { title: "Teacher not found" };
  }

  const instrumentNames = teacher.instruments
    .map(function pickName(instrument) {
      return instrument.name;
    })
    .join(", ");
  const place = teacher.location || "online";

  return {
    title: `${teacher.full_name} - ${instrumentNames} lessons in ${place}`,
    description: teacher.bio.slice(0, 155),
  };
}

export default async function TeacherPage({ params }: TeacherPageProps) {
  const { slug } = await params;
  const supabase = await createSupabaseServerClient();
  const teacher = await fetchTeacherBySlug({ client: supabase, slug });

  if (!teacher) {
    notFound();
  }

  const modeLine = teacher.location
    ? `${TEACHING_MODE_LABELS[teacher.teaching_mode]} · ${teacher.location}`
    : TEACHING_MODE_LABELS[teacher.teaching_mode];

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-6xl px-6 py-10 md:py-14">
          <nav aria-label="Breadcrumb" className="text-sm text-ink/50">
            <Link href="/teachers" className="transition-colors hover:text-ink">
              ← All teachers
            </Link>
          </nav>
          <div className="mt-8 grid gap-10 lg:grid-cols-12">
            <article className="lg:col-span-7">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="flex flex-wrap gap-1.5">
                    {teacher.instruments.map(
                      function renderInstrument(instrument) {
                        return (
                          <Badge key={instrument.id}>
                            <InstrumentIcon name={instrument.slug} />
                            {instrument.name}
                          </Badge>
                        );
                      }
                    )}
                  </div>
                  <h1 className="mt-4 font-display text-4xl tracking-tight text-ink md:text-5xl">
                    {teacher.full_name}
                  </h1>
                  <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <StarRating
                      rating={teacher.rating}
                      reviewCount={teacher.review_count}
                    />
                    <span className="text-ink/30">·</span>
                    <p className="text-ink/60">{modeLine}</p>
                  </div>
                </div>
                <TeacherAvatar
                  fullName={teacher.full_name}
                  avatarUrl={teacher.avatar_url}
                  className="h-24 w-24 shrink-0 rounded-full md:h-32 md:w-32"
                  sizes="128px"
                />
              </div>
              <div className="mt-8 space-y-8">
                <section aria-labelledby="about-heading">
                  <h2
                    id="about-heading"
                    className="text-xs font-medium uppercase tracking-[0.25em] text-rausch"
                  >
                    About
                  </h2>
                  <p className="mt-3 max-w-prose text-lg leading-[1.7] text-ink/80">
                    {teacher.bio}
                  </p>
                </section>

                {teacher.availability_note ? (
                  <section aria-labelledby="availability-heading">
                    <h2
                      id="availability-heading"
                      className="text-xs font-medium uppercase tracking-[0.25em] text-rausch"
                    >
                      Availability
                    </h2>
                    <p className="mt-3 text-ink/80">
                      {teacher.availability_note}
                    </p>
                  </section>
                ) : null}
                {teacher.credentials ? (
                  <section
                    aria-labelledby="credentials-heading"
                    className="rounded-2xl bg-mist p-6"
                  >
                    <h2
                      id="credentials-heading"
                      className="text-xs font-medium uppercase tracking-[0.25em] text-rausch"
                    >
                      Credentials & education
                    </h2>
                    <p className="mt-3 leading-relaxed text-ink/80">
                      {teacher.credentials}
                    </p>
                  </section>
                ) : null}
                {teacher.location ? (
                  <TeacherLocationMap
                    location={teacher.location}
                    teacherName={teacher.full_name}
                  />
                ) : null}
              </div>
            </article>
            <aside className="lg:col-span-5">
              <div className="lg:sticky lg:top-24">
                <BookingCard teacher={teacher} />
              </div>
            </aside>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
