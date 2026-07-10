import type { SupabaseClient } from "@supabase/supabase-js";

import type {
  Database,
  InstrumentRow,
  TeacherRow,
  TeacherWithInstruments,
} from "@/lib/database.types";

type Client = SupabaseClient<Database>;

async function attachInstruments({
  client,
  teachers,
}: {
  client: Client;
  teachers: TeacherRow[];
}): Promise<TeacherWithInstruments[]> {
  if (teachers.length === 0) {
    return [];
  }

  const teacherIds = teachers.map(function pickId(teacher) {
    return teacher.id;
  });

  const [junctionResult, instrumentsResult] = await Promise.all([
    client.from("teacher_instruments").select("*").in("teacher_id", teacherIds),
    client.from("instruments").select("*").order("name"),
  ]);

  const junctions = junctionResult.data || [];
  const instruments = instrumentsResult.data || [];

  const instrumentsById = new Map<number, InstrumentRow>(
    instruments.map(function toEntry(instrument) {
      return [instrument.id, instrument];
    }),
  );

  return teachers.map(function withInstruments(teacher) {
    const ownInstruments = junctions
      .filter(function belongsToTeacher(junction) {
        return junction.teacher_id === teacher.id;
      })
      .map(function resolveInstrument(junction) {
        return instrumentsById.get(junction.instrument_id);
      })
      .filter(function isDefined(
        instrument: InstrumentRow | undefined,
      ): instrument is InstrumentRow {
        return Boolean(instrument);
      });

    return { ...teacher, instruments: ownInstruments };
  });
}

export async function fetchPublishedTeachers({
  client,
}: {
  client: Client;
}): Promise<TeacherWithInstruments[]> {
  const teachersResult = await client
    .from("teachers")
    .select("*")
    .eq("is_published", true)
    .order("created_at", { ascending: true });

  if (teachersResult.error || !teachersResult.data) {
    return [];
  }

  return attachInstruments({ client, teachers: teachersResult.data });
}

export async function fetchTeacherBySlug({
  client,
  slug,
}: {
  client: Client;
  slug: string;
}): Promise<TeacherWithInstruments | null> {
  const teacherResult = await client
    .from("teachers")
    .select("*")
    .eq("slug", slug)
    .eq("is_published", true)
    .maybeSingle();

  if (teacherResult.error || !teacherResult.data) {
    return null;
  }

  const enriched = await attachInstruments({
    client,
    teachers: [teacherResult.data],
  });

  return enriched[0] || null;
}

export async function fetchInstruments({
  client,
}: {
  client: Client;
}): Promise<InstrumentRow[]> {
  const instrumentsResult = await client
    .from("instruments")
    .select("*")
    .order("name");

  return instrumentsResult.data || [];
}
