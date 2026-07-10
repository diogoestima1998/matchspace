import Link from "next/link";

import { classNames } from "@/lib/class-names";

import type { ButtonProps, ButtonSize, ButtonVariant } from "./types";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-rausch font-semibold text-white hover:bg-rausch-deep",
  secondary:
    "border border-ink/30 bg-white text-ink hover:border-ink hover:bg-mist",
  ghost: "text-ink hover:bg-mist",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
};

const BASE_CLASSES =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-medium tracking-tight transition-colors disabled:pointer-events-none disabled:opacity-50";

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  type = "button",
  disabled,
  onClick,
  className,
}: ButtonProps) {
  const combinedClassName = classNames({
    classes: [BASE_CLASSES, VARIANT_CLASSES[variant], SIZE_CLASSES[size], className],
  });

  if (href) {
    return (
      <Link href={href} className={combinedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={combinedClassName}
    >
      {children}
    </button>
  );
}
