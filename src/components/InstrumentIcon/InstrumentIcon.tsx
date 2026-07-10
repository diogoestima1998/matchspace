import type { ReactNode } from "react";

import { classNames } from "@/lib/class-names";

import type { InstrumentIconProps } from "./types";

const ICON_PATHS: Record<string, ReactNode> = {
  piano: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M7.5 5v7M12 5v7M16.5 5v7" />
    </>
  ),
  guitar: (
    <>
      <path d="M19 3l-6 6" />
      <circle cx="9.5" cy="14.5" r="5.5" />
      <circle cx="9.5" cy="14.5" r="1.5" />
    </>
  ),
  violin: (
    <>
      <path d="M12 3v5" />
      <path d="M12 8c3 0 4.5 2.5 4.5 5.5S14.5 21 12 21s-4.5-4.5-4.5-7.5S9 8 12 8z" />
      <path d="M10 14h4" />
    </>
  ),
  voice: (
    <>
      <rect x="9" y="3" width="6" height="10" rx="3" />
      <path d="M6 11a6 6 0 0 0 12 0" />
      <path d="M12 17v4" />
    </>
  ),
  cello: (
    <>
      <path d="M12 2v4" />
      <path d="M12 6c3.2 0 5 2.6 5 6s-2 8-5 8-5-4.6-5-8 1.8-6 5-6z" />
      <path d="M12 20v2.5" />
    </>
  ),
  drums: (
    <>
      <path d="M5 5l7 4M19 5l-7 4" />
      <ellipse cx="12" cy="10" rx="7" ry="2.5" />
      <path d="M5 10v6c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-6" />
    </>
  ),
  flute: (
    <>
      <path d="M3.5 18.5L20.5 5.5" />
      <path d="M9 15.5l.5.5M13 12.5l.5.5M17 9.5l.5.5" />
    </>
  ),
  saxophone: (
    <>
      <path d="M9 3v9a6 6 0 0 0 6 6h1" />
      <circle cx="17.5" cy="17" r="2.5" />
      <path d="M9 5.5h2.5" />
    </>
  ),
  clarinet: (
    <>
      <path d="M12 2.5V16" />
      <path d="M9.5 21h5l-1.5-5h-2z" />
      <path d="M12 6h1.5M12 9h1.5M12 12h1.5" />
    </>
  ),
  trumpet: (
    <>
      <path d="M3 12h11" />
      <path d="M14 8.5c2.5 0 5-1 7-2.5v12c-2-1.5-4.5-2.5-7-2.5z" />
      <path d="M7 12v3M9.5 12v3M12 12v3" />
    </>
  ),
  ukulele: (
    <>
      <path d="M20 4l-5.5 5.5" />
      <circle cx="10" cy="15" r="4.5" />
      <circle cx="10" cy="15" r="1.2" />
    </>
  ),
  bass: (
    <>
      <path d="M20.5 2.5L12 11" />
      <circle cx="8.5" cy="15.5" r="5" />
      <path d="M7 14l3 3" />
    </>
  ),
  viola: (
    <>
      <path d="M12 3v5" />
      <path d="M12 8c3.2 0 5 2.4 5 5.4S14.7 21 12 21s-5-4.6-5-7.6S8.8 8 12 8z" />
      <path d="M9.5 14h5" />
    </>
  ),
  accordion: (
    <>
      <rect x="4" y="5" width="4" height="14" rx="1" />
      <rect x="16" y="5" width="4" height="14" rx="1" />
      <path d="M8 7.5h8M8 12h8M8 16.5h8" />
    </>
  ),
};

const FALLBACK_ICON: ReactNode = (
  <>
    <path d="M9 18V6l10-2v11" />
    <circle cx="6.5" cy="18" r="2.5" />
    <circle cx="16.5" cy="15" r="2.5" />
  </>
);

export function InstrumentIcon({ name, className }: InstrumentIconProps) {
  const icon = ICON_PATHS[name.toLowerCase()] || FALLBACK_ICON;

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={classNames({ classes: ["h-3.5 w-3.5 shrink-0", className] })}
    >
      {icon}
    </svg>
  );
}
