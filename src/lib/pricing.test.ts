import { describe, expect, it } from "vitest";

import { computeAmountChf } from "@/lib/pricing";

describe("computeAmountChf", function pricingSuite() {
  it("charges the full hourly price for 60 minutes", function fullHour() {
    expect(
      computeAmountChf({ hourlyPriceChf: 95, durationMinutes: 60 }),
    ).toBe(95);
  });

  it("halves the price for 30 minutes", function halfHour() {
    expect(
      computeAmountChf({ hourlyPriceChf: 80, durationMinutes: 30 }),
    ).toBe(40);
  });

  it("scales up for 90 minutes", function ninetyMinutes() {
    expect(
      computeAmountChf({ hourlyPriceChf: 80, durationMinutes: 90 }),
    ).toBe(120);
  });

  it("rounds to whole francs for 45-minute lessons", function rounding() {
    expect(
      computeAmountChf({ hourlyPriceChf: 95, durationMinutes: 45 }),
    ).toBe(71);
    expect(
      computeAmountChf({ hourlyPriceChf: 90, durationMinutes: 45 }),
    ).toBe(68);
  });
});
