import { describe, expect, it } from "vitest";

import { buildTeacherSlug, slugify } from "@/lib/slug";

describe("slugify", function slugSuite() {
  it("lowercases and hyphenates", function basic() {
    expect(slugify({ value: "Anna Keller" })).toBe("anna-keller");
  });

  it("strips accents", function accents() {
    expect(slugify({ value: "Élodie Favre" })).toBe("elodie-favre");
  });

  it("collapses punctuation and trims hyphens", function punctuation() {
    expect(slugify({ value: "  Jean-Luc  O'Brien! " })).toBe("jean-luc-o-brien");
  });
});

describe("buildTeacherSlug", function teacherSlugSuite() {
  it("appends a stable id fragment for uniqueness", function idFragment() {
    const slug = buildTeacherSlug({
      fullName: "Anna Keller",
      userId: "a1b2c3d4-0000-4000-8000-000000000000",
    });
    expect(slug).toBe("anna-keller-a1b2");
  });
});
