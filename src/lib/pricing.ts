export function computeAmountChf({
  hourlyPriceChf,
  durationMinutes,
}: {
  hourlyPriceChf: number;
  durationMinutes: number;
}) {
  return Math.round((hourlyPriceChf * durationMinutes) / 60);
}

export function formatChf({ amount }: { amount: number }) {
  return `CHF ${amount}`;
}
