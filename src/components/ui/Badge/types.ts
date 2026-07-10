import type { ReactNode } from "react";

export type BadgeTone = "gold" | "neutral" | "red" | "green";

export type BadgeProps = {
  children: ReactNode;
  tone?: BadgeTone;
};
