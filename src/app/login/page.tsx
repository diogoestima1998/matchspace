import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { AuthShell } from "@/components/AuthShell/AuthShell";
import { LoginForm } from "@/components/LoginForm/LoginForm";
import { SiteFooter } from "@/components/SiteFooter/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader/SiteHeader";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Log in",
};

export default async function LoginPage() {
  const supabase = await createSupabaseServerClient();
  const userResult = await supabase.auth.getUser();

  if (userResult.data.user) {
    redirect("/dashboard/profile");
  }

  return (
    <>
      <SiteHeader />
      <AuthShell
        imageSrc="/images/auth-class-teens.jpg"
        imageAlt="A smiling music teacher laughing with her teenage string students"
        title="Welcome back"
        subtitle="Log in to manage your teacher profile and bookings."
        footer={
          <>
            New to Matchspace?{" "}
            <Link href="/signup" className="font-medium text-rausch hover:underline">
              Create a teacher account
            </Link>
          </>
        }
      >
        <LoginForm />
      </AuthShell>
      <SiteFooter />
    </>
  );
}
