import type {
  InstrumentRow,
  TeacherWithInstruments,
} from "@/lib/database.types";

export type TeacherDirectoryProps = {
  initialTeachers: TeacherWithInstruments[];
  instruments: InstrumentRow[];
};

export type DirectoryFilters = {
  instrument: string;
  mode: string;
  maxPrice: number;
};

export type FilterBarProps = {
  instruments: InstrumentRow[];
  filters: DirectoryFilters;
  onFilterChange: (params: { name: string; value: string }) => void;
};
