import type { ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";

export type ButtonSize = "md" | "lg";

export type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};
