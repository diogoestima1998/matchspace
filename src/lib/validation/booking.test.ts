import { describe, expect, it } from "vitest";

import { bookingRequestSchema } from "@/lib/validation/booking";

const VALID_REQUEST = {
  teacher_id: "a1000000-0000-4000-8000-000000000001",
  student_name: "Mia Example",
  student_email: "mia@example.com",
  requested_start: new Date(Date.now() + 86_400_000).toISOString(),
  duration_minutes: 60,
  message: "Beginner, looking for weekly lessons.",
};

describe("bookingRequestSchema", function bookingSuite() {
  it("accepts a valid booking request", function acceptsValid() {
    const result = bookingRequestSchema.safeParse(VALID_REQUEST);
    expect(result.success).toBe(true);
  });

  it("rejects a lesson in the past", function rejectsPast() {
    const result = bookingRequestSchema.safeParse({
      ...VALID_REQUEST,
      requested_start: "2020-01-01T10:00",
    });
    expect(result.success).toBe(false);
  });

  it("rejects durations outside the allowed set", function rejectsDuration() {
    const result = bookingRequestSchema.safeParse({
      ...VALID_REQUEST,
      duration_minutes: 75,
    });
    expect(result.success).toBe(false);
  });

  it("rejects an invalid email", function rejectsEmail() {
    const result = bookingRequestSchema.safeParse({
      ...VALID_REQUEST,
      student_email: "not-an-email",
    });
    expect(result.success).toBe(false);
  });

  it("never accepts a client-supplied amount", function ignoresAmount() {
    const result = bookingRequestSchema.safeParse({
      ...VALID_REQUEST,
      amount_chf: 1,
    });
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data).not.toHaveProperty("amount_chf");
    }
  });
});
