import type { StarRatingProps } from "./types";

export function StarRating({
  rating,
  reviewCount,
  showCount = true,
}: StarRatingProps) {
  if (!rating) {
    return (
      <span className="inline-flex items-center rounded-full bg-mist px-2 py-0.5 text-xs font-medium text-ink/70">
        New teacher
      </span>
    );
  }

  const ratingValue = Number(rating);
  const countValue = reviewCount || 0;

  return (
    <span
      className="inline-flex items-center gap-1 text-sm text-ink"
      aria-label={`Rated ${ratingValue.toFixed(1)} out of 5 from ${countValue} reviews`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 20 20"
        className="h-3.5 w-3.5 fill-current"
      >
        <path d="M10 1.5l2.47 5.33 5.83.66-4.32 3.98 1.16 5.75L10 14.35l-5.14 2.87 1.16-5.75L1.7 7.49l5.83-.66L10 1.5z" />
      </svg>
      <span className="tabular-nums font-medium">{ratingValue.toFixed(1)}</span>
      {showCount ? (
        <span className="tabular-nums text-ink/50">({countValue})</span>
      ) : null}
    </span>
  );
}
