import type { ReactNode } from "react";

export type AuthShellProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
  imageSrc?: string;
  imageAlt?: string;
};
