export type DateTimePickerProps = {
  label: string;
  name: string;
  value: string;
  onChange: (params: { name: string; value: string }) => void;
  minIso: string;
  error?: string;
  required?: boolean;
};

export type CalendarDay = {
  iso: string;
  dayNumber: number;
  inMonth: boolean;
  disabled: boolean;
};
