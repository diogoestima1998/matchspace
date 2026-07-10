import type { BookingStatus, TeachingMode } from "@/lib/constants";

export type InstrumentRow = {
  id: number;
  name: string;
  slug: string;
};

export type TeacherRow = {
  id: string;
  slug: string;
  full_name: string;
  bio: string;
  credentials: string;
  teaching_mode: TeachingMode;
  location: string | null;
  hourly_price_chf: number;
  availability_note: string;
  avatar_url: string | null;
  rating: number | null;
  review_count: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
};

export type TeacherInstrumentRow = {
  teacher_id: string;
  instrument_id: number;
};

export type BookingRow = {
  id: string;
  teacher_id: string;
  student_name: string;
  student_email: string;
  requested_start: string;
  duration_minutes: number;
  message: string | null;
  amount_chf: number;
  status: BookingStatus;
  stripe_session_id: string | null;
  created_at: string;
  confirmed_at: string | null;
};

export type TeacherWithInstruments = TeacherRow & {
  instruments: InstrumentRow[];
};

type TableDefinition<Row, Insert, Update> = {
  Row: Row;
  Insert: Insert;
  Update: Update;
  Relationships: [];
};

export type Database = {
  public: {
    Tables: {
      instruments: TableDefinition<
        InstrumentRow,
        Omit<InstrumentRow, "id"> & { id?: number },
        Partial<InstrumentRow>
      >;
      teachers: TableDefinition<
        TeacherRow,
        Pick<TeacherRow, "id" | "slug" | "full_name" | "hourly_price_chf"> &
          Partial<
            Omit<TeacherRow, "id" | "slug" | "full_name" | "hourly_price_chf">
          >,
        Partial<Omit<TeacherRow, "id">>
      >;
      teacher_instruments: TableDefinition<
        TeacherInstrumentRow,
        TeacherInstrumentRow,
        Partial<TeacherInstrumentRow>
      >;
      bookings: TableDefinition<
        BookingRow,
        Pick<
          BookingRow,
          | "teacher_id"
          | "student_name"
          | "student_email"
          | "requested_start"
          | "duration_minutes"
          | "amount_chf"
        > &
          Partial<
            Pick<BookingRow, "id" | "message" | "status" | "stripe_session_id">
          >,
        Partial<Omit<BookingRow, "id">>
      >;
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      booking_status: BookingStatus;
    };
    CompositeTypes: Record<string, never>;
  };
};
