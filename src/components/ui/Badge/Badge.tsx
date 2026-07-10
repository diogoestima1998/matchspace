import { classNames } from "@/lib/class-names";

import type { BadgeProps, BadgeTone } from "./types";

const TONE_CLASSES: Record<BadgeTone, string> = {
  gold: "bg-mist text-ink",
  neutral: "bg-ink/5 text-ink/70",
  red: "bg-error/10 text-error",
  green: "bg-emerald-50 text-emerald-700",
};

export function Badge({ children, tone = "gold" }: BadgeProps) {
  return (
    <span
      className={classNames({
        classes: [
          "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
          TONE_CLASSES[tone],
        ],
      })}
    >
      {children}
    </span>
  );
}
