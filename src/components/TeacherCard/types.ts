import type { TeacherWithInstruments } from "@/lib/database.types";

export type TeacherCardProps = {
  teacher: TeacherWithInstruments;
  staggerIndex?: number;
};
