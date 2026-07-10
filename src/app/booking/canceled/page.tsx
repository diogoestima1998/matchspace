import type { Metadata } from "next";

import { SiteFooter } from "@/components/SiteFooter/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader/SiteHeader";
import { Button } from "@/components/ui/Button/Button";

export const metadata: Metadata = {
  title: "Payment canceled",
};

type CanceledPageProps = {
  searchParams: Promise<{ teacher?: string }>;
};

export default async function BookingCanceledPage({
  searchParams,
}: CanceledPageProps) {
  const { teacher } = await searchParams;
  const backHref = teacher ? `/teachers/${teacher}` : "/teachers";

  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-6 py-16">
        <div className="w-full max-w-lg rounded-2xl border border-line bg-white p-10 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-rausch">
            Payment canceled
          </p>
          <h1 className="mt-4 font-display text-4xl text-ink">
            No charge was made.
          </h1>
          <p className="mt-4 leading-relaxed text-ink/60">
            Your lesson request wasn&apos;t completed - that&apos;s completely
            fine. The teacher hasn&apos;t been notified, and you can pick up
            right where you left off whenever you&apos;re ready.
          </p>
          <div className="mt-8">
            <Button href={backHref}>Back to the teacher</Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
