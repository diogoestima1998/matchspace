import { classNames } from "@/lib/class-names";

import type { MarqueeProps } from "./types";

export function Marquee({ children, className }: MarqueeProps) {
  return (
    <div className="overflow-hidden">
      <div
        className={classNames({
          classes: ["marquee-vertical flex flex-col", className],
        })}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
