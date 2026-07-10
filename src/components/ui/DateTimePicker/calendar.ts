import type { CalendarDay } from "./types";

const SLOT_START_HOUR = 8;

const SLOT_END_HOUR = 20;

function pad({ value }: { value: number }) {
  return String(value).padStart(2, "0");
}

export function buildTimeSlots() {
  const slots: string[] = [];
  for (let hour = SLOT_START_HOUR; hour <= SLOT_END_HOUR; hour += 1) {
    slots.push(`${pad({ value: hour })}:00`);
    if (hour < SLOT_END_HOUR) {
      slots.push(`${pad({ value: hour })}:30`);
    }
  }
  return slots;
}

export function toIsoDate({ date }: { date: Date }) {
  return `${date.getFullYear()}-${pad({ value: date.getMonth() + 1 })}-${pad({ value: date.getDate() })}`;
}

export function buildCalendarDays({
  viewYear,
  viewMonth,
  minIsoDate,
}: {
  viewYear: number;
  viewMonth: number;
  minIsoDate: string;
}): CalendarDay[] {
  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const mondayOffset = (firstOfMonth.getDay() + 6) % 7;
  const days: CalendarDay[] = [];

  for (let index = 0; index < 42; index += 1) {
    const date = new Date(viewYear, viewMonth, 1 - mondayOffset + index);
    const iso = toIsoDate({ date });
    days.push({
      iso,
      dayNumber: date.getDate(),
      inMonth: date.getMonth() === viewMonth,
      disabled: iso < minIsoDate,
    });
  }

  return days;
}

export function formatMonthTitle({
  viewYear,
  viewMonth,
}: {
  viewYear: number;
  viewMonth: number;
}) {
  return new Intl.DateTimeFormat("en-CH", {
    month: "long",
    year: "numeric",
  }).format(new Date(viewYear, viewMonth, 1));
}

export function formatSelection({ value }: { value: string }) {
  return new Intl.DateTimeFormat("en-CH", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}
