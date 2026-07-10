import { z } from "zod";

import {
  PRICE_MAX_CHF,
  PRICE_MIN_CHF,
  TEACHING_MODES,
} from "@/lib/constants";

export const teacherProfileSchema = z
  .object({
    full_name: z
      .string()
      .trim()
      .min(2, "Please enter your full name")
      .max(80, "Name is too long"),
    bio: z.string().trim().max(1200, "Bio must be under 1,200 characters"),
    credentials: z
      .string()
      .trim()
      .max(600, "Credentials must be under 600 characters"),
    teaching_mode: z.enum(TEACHING_MODES),
    location: z.string().trim().max(80, "Location is too long"),
    hourly_price_chf: z
      .number()
      .int("Price must be a whole number of francs")
      .min(PRICE_MIN_CHF, `Minimum price is CHF ${PRICE_MIN_CHF}`)
      .max(PRICE_MAX_CHF, `Maximum price is CHF ${PRICE_MAX_CHF}`),
    availability_note: z
      .string()
      .trim()
      .max(300, "Availability note must be under 300 characters"),
    instrument_ids: z
      .array(z.number().int())
      .min(1, "Select at least one instrument")
      .max(5, "Select at most five instruments"),
  })
  .check(function requireLocationForInPerson(ctx) {
    const teachesInPerson = ctx.value.teaching_mode !== "online";
    if (teachesInPerson && ctx.value.location.length === 0) {
      ctx.issues.push({
        code: "custom",
        message: "Location is required for in-person lessons",
        path: ["location"],
        input: ctx.value.location,
      });
    }
  });

export type TeacherProfileInput = z.infer<typeof teacherProfileSchema>;
