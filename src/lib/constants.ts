export const LESSON_DURATIONS = [30, 45, 60, 90] as const;

export type LessonDuration = (typeof LESSON_DURATIONS)[number];

export const PRICE_MIN_CHF = 10;

export const PRICE_MAX_CHF = 1000;

export const TEACHING_MODES = ["in_person", "online", "both"] as const;

export type TeachingMode = (typeof TEACHING_MODES)[number];

export const TEACHING_MODE_LABELS: Record<TeachingMode, string> = {
  in_person: "In person",
  online: "Online",
  both: "In person & online",
};

export const CHECKOUT_EXPIRY_SECONDS = 3600;

export const BOOKING_STATUSES = [
  "pending_payment",
  "confirmed",
  "expired",
  "canceled",
] as const;

export type BookingStatus = (typeof BOOKING_STATUSES)[number];

export const BOOKING_STATUS_LABELS: Record<BookingStatus, string> = {
  pending_payment: "Awaiting payment",
  confirmed: "Confirmed",
  expired: "Expired",
  canceled: "Canceled",
};
