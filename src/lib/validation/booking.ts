import { z } from "zod";

import { LESSON_DURATIONS } from "@/lib/constants";

export const bookingRequestSchema = z.object({
  teacher_id: z.uuid("Invalid teacher reference"),
  student_name: z
    .string()
    .trim()
    .min(2, "Please enter your name")
    .max(80, "Name is too long"),
  student_email: z.email("Please enter a valid email address").max(120),
  requested_start: z
    .string()
    .refine(
      function isParseableDate(value) {
        return !Number.isNaN(Date.parse(value));
      },
      { message: "Please pick a valid date and time" },
    )
    .refine(
      function isInFuture(value) {
        return Date.parse(value) > Date.now();
      },
      { message: "The lesson must be in the future" },
    ),
  duration_minutes: z
    .number()
    .int()
    .refine(
      function isAllowedDuration(value) {
        return LESSON_DURATIONS.some(function matches(duration) {
          return duration === value;
        });
      },
      { message: "Choose a lesson duration of 30, 45, 60 or 90 minutes" },
    ),
  message: z
    .string()
    .trim()
    .max(500, "Message must be under 500 characters")
    .optional(),
});

export type BookingRequestInput = z.infer<typeof bookingRequestSchema>;
