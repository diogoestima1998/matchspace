import Link from "next/link";

import { Logo } from "@/components/Logo/Logo";
import { LogoMark } from "@/components/Logo/LogoMark";
import { LogoutButton } from "@/components/LogoutButton/LogoutButton";
import { Button } from "@/components/ui/Button/Button";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function Wordmark() {
  return (
    <Link href="/" aria-label="Matchspace Music home">
      <LogoMark className="sm:hidden" />
      <Logo className="hidden sm:block" />
    </Link>
  );
}

export async function SiteHeader() {
  const supabase = await createSupabaseServerClient();
  const userResult = await supabase.auth.getUser();
  const user = userResult.data.user;

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-6">
        <Wordmark />
        <div className="flex items-center gap-2">
          {user ? (
            <>
              <Button variant="ghost" href="/dashboard/profile">
                Dashboard
              </Button>
              <LogoutButton />
            </>
          ) : (
            <>
              <Button variant="ghost" href="/login">
                Log in
              </Button>
              <Button href="/signup" className="hidden sm:inline-flex">
                Start teaching
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
