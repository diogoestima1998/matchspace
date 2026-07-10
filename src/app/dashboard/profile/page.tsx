import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { BookingsList } from "@/components/DashboardProfile/BookingsList";
import { ProfileForm } from "@/components/DashboardProfile/ProfileForm";
import { PublishPanel } from "@/components/DashboardProfile/PublishPanel";
import { SiteFooter } from "@/components/SiteFooter/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader/SiteHeader";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { fetchInstruments } from "@/services/teachers";

export const metadata: Metadata = {
  title: "Your studio",
};

export default async function DashboardProfilePage() {
  const supabase = await createSupabaseServerClient();
  const userResult = await supabase.auth.getUser();
  const user = userResult.data.user;

  if (!user) {
    redirect("/login");
  }

  const [teacherResult, instruments, junctionResult, bookingsResult] =
    await Promise.all([
      supabase.from("teachers").select("*").eq("id", user.id).maybeSingle(),
      fetchInstruments({ client: supabase }),
      supabase
        .from("teacher_instruments")
        .select("*")
        .eq("teacher_id", user.id),
      supabase
        .from("bookings")
        .select("*")
        .eq("teacher_id", user.id)
        .order("created_at", { ascending: false }),
    ]);

  const teacher = teacherResult.data;
  const instrumentIds = (junctionResult.data || []).map(
    function pickInstrumentId(junction) {
      return junction.instrument_id;
    },
  );
  const bookings = bookingsResult.data || [];

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-6 py-12 md:py-16">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-rausch">
            Your studio
          </p>
          <h1 className="mt-3 font-display text-4xl tracking-tight text-ink md:text-5xl">
            {teacher ? `Welcome back, ${teacher.full_name.split(" ")[0]}.` : "Set up your profile."}
          </h1>
          <div className="mt-10 space-y-10">
            <PublishPanel
              teacherId={user.id}
              isPublished={teacher?.is_published || false}
              slug={teacher?.slug || null}
              hasProfile={Boolean(teacher)}
            />
            <section aria-labelledby="profile-heading">
              <h2
                id="profile-heading"
                className="font-display text-2xl text-ink"
              >
                Profile
              </h2>
              <p className="mt-1 text-sm text-ink/60">
                This is exactly what students see on your public page.
              </p>
              <div className="mt-6 rounded-2xl border border-line bg-white p-6 md:p-8">
                <ProfileForm
                  teacherId={user.id}
                  initialTeacher={teacher}
                  instruments={instruments}
                  initialInstrumentIds={instrumentIds}
                />
              </div>
            </section>
            <section aria-labelledby="bookings-heading">
              <h2
                id="bookings-heading"
                className="font-display text-2xl text-ink"
              >
                Booking requests
              </h2>
              <p className="mt-1 text-sm text-ink/60">
                Paid lessons appear as confirmed. Contact your students to
                arrange the details.
              </p>
              <div className="mt-6">
                <BookingsList bookings={bookings} />
              </div>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
