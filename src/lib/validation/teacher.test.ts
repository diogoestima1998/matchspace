import { describe, expect, it } from "vitest";

import { teacherProfileSchema } from "@/lib/validation/teacher";

const VALID_PROFILE = {
  full_name: "Anna Keller",
  bio: "Piano teacher in Zürich.",
  credentials: "MA Music Pedagogy, ZHdK",
  teaching_mode: "both",
  location: "Zürich",
  hourly_price_chf: 95,
  availability_note: "Weekdays after 17:00",
  instrument_ids: [1],
};

describe("teacherProfileSchema", function teacherSuite() {
  it("accepts a valid profile", function acceptsValid() {
    const result = teacherProfileSchema.safeParse(VALID_PROFILE);
    expect(result.success).toBe(true);
  });

  it("requires a location for in-person teaching", function requiresLocation() {
    const result = teacherProfileSchema.safeParse({
      ...VALID_PROFILE,
      teaching_mode: "in_person",
      location: "",
    });
    expect(result.success).toBe(false);
  });

  it("allows a missing location for online-only teachers", function onlineOnly() {
    const result = teacherProfileSchema.safeParse({
      ...VALID_PROFILE,
      teaching_mode: "online",
      location: "",
    });
    expect(result.success).toBe(true);
  });

  it("rejects prices outside 10-1000 CHF", function priceBounds() {
    expect(
      teacherProfileSchema.safeParse({ ...VALID_PROFILE, hourly_price_chf: 5 })
        .success,
    ).toBe(false);
    expect(
      teacherProfileSchema.safeParse({
        ...VALID_PROFILE,
        hourly_price_chf: 1200,
      }).success,
    ).toBe(false);
  });

  it("requires at least one instrument", function requiresInstrument() {
    const result = teacherProfileSchema.safeParse({
      ...VALID_PROFILE,
      instrument_ids: [],
    });
    expect(result.success).toBe(false);
  });
});
