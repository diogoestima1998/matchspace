import Image from "next/image";

import type { AuthShellProps } from "./types";

export function AuthShell({
  title,
  subtitle,
  children,
  footer,
  imageSrc,
  imageAlt,
}: AuthShellProps) {
  const formContent = (
    <div className="w-full max-w-md">
      <div className="rounded-2xl border border-line bg-white p-8 shadow-sm">
        <h1 className="font-display text-3xl text-ink">{title}</h1>
        <p className="mt-2 text-sm text-ink/60">{subtitle}</p>
        <div className="mt-8">{children}</div>
      </div>
      <p className="mt-6 text-center text-sm text-ink/60">{footer}</p>
    </div>
  );

  if (!imageSrc) {
    return (
      <main className="flex flex-1 items-center justify-center px-6 py-16">
        {formContent}
      </main>
    );
  }

  return (
    <main className="grid flex-1 lg:grid-cols-2">
      <div className="relative hidden lg:block">
        <Image
          src={imageSrc}
          alt={imageAlt || ""}
          fill
          sizes="50vw"
          className="object-cover"
        />
      </div>
      <div className="flex items-center justify-center px-6 py-16">
        {formContent}
      </div>
    </main>
  );
}
