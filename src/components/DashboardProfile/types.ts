import type {
  BookingRow,
  InstrumentRow,
  TeacherRow,
} from "@/lib/database.types";

export type ProfileFormProps = {
  teacherId: string;
  initialTeacher: TeacherRow | null;
  instruments: InstrumentRow[];
  initialInstrumentIds: number[];
};

export type InstrumentPickerProps = {
  instruments: InstrumentRow[];
  selectedIds: number[];
  onToggle: (params: { instrumentId: number }) => void;
  error?: string;
};

export type PublishPanelProps = {
  teacherId: string;
  isPublished: boolean;
  slug: string | null;
  hasProfile: boolean;
};

export type BookingsListProps = {
  bookings: BookingRow[];
};
