import type { TeacherWithInstruments } from "@/lib/database.types";

export type BookingCardProps = {
  teacher: TeacherWithInstruments;
};

export type BookingDrawerProps = {
  teacher: TeacherWithInstruments;
  isOpen: boolean;
  onClose: () => void;
};

export type BookingFormProps = {
  teacher: TeacherWithInstruments;
};
