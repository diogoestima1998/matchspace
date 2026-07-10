import type { EmptyStateProps } from "./types";

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-white px-8 py-14 text-center">
      <svg
        aria-hidden="true"
        viewBox="0 0 120 32"
        fill="none"
        className="mx-auto h-8 w-30 text-line"
      >
        <line x1="0" y1="4" x2="120" y2="4" stroke="currentColor" />
        <line x1="0" y1="11" x2="120" y2="11" stroke="currentColor" />
        <line x1="0" y1="18" x2="120" y2="18" stroke="currentColor" />
        <line x1="0" y1="25" x2="120" y2="25" stroke="currentColor" />
        <g className="text-rausch">
          <ellipse cx="60" cy="18" rx="5" ry="3.5" fill="currentColor" />
          <rect x="64" y="2" width="1.5" height="16" fill="currentColor" />
        </g>
      </svg>
      <h3 className="mt-5 font-display text-2xl text-ink">{title}</h3>
      <p className="mx-auto mt-2 max-w-sm text-ink/60">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}
