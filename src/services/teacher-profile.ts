import { buildTeacherSlug } from "@/lib/slug";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

import type { TeacherProfileInput } from "@/lib/validation/teacher";

type MutationResult =
  | { success: true; slug: string }
  | { success: false; error: string };

export async function saveTeacherProfile({
  teacherId,
  existingSlug,
  input,
}: {
  teacherId: string;
  existingSlug: string | null;
  input: TeacherProfileInput;
}): Promise<MutationResult> {
  const supabase = createSupabaseBrowserClient();

  const slug =
    existingSlug ||
    buildTeacherSlug({ fullName: input.full_name, userId: teacherId });

  const upsertResult = await supabase.from("teachers").upsert({
    id: teacherId,
    slug,
    full_name: input.full_name,
    bio: input.bio,
    credentials: input.credentials,
    teaching_mode: input.teaching_mode,
    location: input.teaching_mode === "online" ? null : input.location || null,
    hourly_price_chf: input.hourly_price_chf,
    availability_note: input.availability_note,
  });

  if (upsertResult.error) {
    return {
      success: false,
      error: "Could not save your profile. Please try again.",
    };
  }

  const deleteResult = await supabase
    .from("teacher_instruments")
    .delete()
    .eq("teacher_id", teacherId);

  if (deleteResult.error) {
    return {
      success: false,
      error: "Could not update your instruments. Please try again.",
    };
  }

  const insertResult = await supabase.from("teacher_instruments").insert(
    input.instrument_ids.map(function toRow(instrumentId) {
      return { teacher_id: teacherId, instrument_id: instrumentId };
    }),
  );

  if (insertResult.error) {
    return {
      success: false,
      error: "Could not update your instruments. Please try again.",
    };
  }

  return { success: true, slug };
}

export async function setProfilePublished({
  teacherId,
  isPublished,
}: {
  teacherId: string;
  isPublished: boolean;
}): Promise<MutationResult> {
  const supabase = createSupabaseBrowserClient();

  const updateResult = await supabase
    .from("teachers")
    .update({ is_published: isPublished })
    .eq("id", teacherId)
    .select("slug")
    .single();

  if (updateResult.error || !updateResult.data) {
    return {
      success: false,
      error: "Could not change the publish state. Please try again.",
    };
  }

  return { success: true, slug: updateResult.data.slug };
}
