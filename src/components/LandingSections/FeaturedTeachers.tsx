import Link from "next/link";

import { TeacherAvatar } from "@/components/TeacherAvatar/TeacherAvatar";
import { StarRating } from "@/components/ui/StarRating/StarRating";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { fetchPublishedTeachers } from "@/services/teachers";

export async function FeaturedTeachers() {
  const supabase = await createSupabaseServerClient();
  const teachers = await fetchPublishedTeachers({ client: supabase });
  const featured = teachers.slice(0, 8);

  if (featured.length === 0) {
    return null;
  }

  return (
    <section aria-labelledby="featured-heading">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="flex items-end justify-between gap-6">
          <h2
            id="featured-heading"
            className="font-display text-2xl tracking-tight text-ink md:text-3xl"
          >
            Popular teachers
          </h2>
          <Link
            href="/teachers"
            className="text-sm font-semibold text-ink underline underline-offset-4 hover:text-rausch"
          >
            Show all
          </Link>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-4">
          {featured.map(function renderTeacher(teacher, index) {
            return (
              <li key={teacher.id}>
                <Link href={`/teachers/${teacher.slug}`} className="group block">
                  <TeacherAvatar
                    fullName={teacher.full_name}
                    avatarUrl={teacher.avatar_url}
                    gradientIndex={index}
                    className="aspect-square rounded-xl transition-shadow group-hover:shadow-lg group-hover:shadow-ink/10"
                  />
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <p className="truncate font-semibold text-ink">
                      {teacher.full_name}
                    </p>
                    <StarRating
                      rating={teacher.rating}
                      reviewCount={teacher.review_count}
                      showCount={false}
                    />
                  </div>
                  <p className="truncate text-sm text-ink/60">
                    {teacher.instruments
                      .map(function pickName(instrument) {
                        return instrument.name;
                      })
                      .join(", ")}
                    {teacher.location ? ` · ${teacher.location}` : " · Online"}
                  </p>
                  <p className="mt-1 text-sm text-ink">
                    <span className="tabular-nums font-semibold">
                      CHF {teacher.hourly_price_chf}
                    </span>{" "}
                    <span className="text-ink/60">/ hour</span>
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
