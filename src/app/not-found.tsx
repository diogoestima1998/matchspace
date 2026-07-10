import { SiteFooter } from "@/components/SiteFooter/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader/SiteHeader";
import { Button } from "@/components/ui/Button/Button";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-6 py-24">
        <div className="text-center">
          <p className="font-display text-7xl italic text-rausch">Rest.</p>
          <h1 className="mt-4 font-display text-4xl text-ink">
            This page doesn&apos;t exist.
          </h1>
          <p className="mx-auto mt-3 max-w-sm text-ink/60">
            The profile may have been unpublished, or the address was
            mistyped. Let&apos;s get you back to the music.
          </p>
          <div className="mt-8">
            <Button href="/teachers">Browse teachers</Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
