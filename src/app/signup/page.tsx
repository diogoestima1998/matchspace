import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";

import { AuthShell } from "@/components/AuthShell/AuthShell";
import { SignupForm } from "@/components/SignupForm/SignupForm";
import { SiteFooter } from "@/components/SiteFooter/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader/SiteHeader";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Become a teacher",
};

export default async function SignupPage() {
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
        title="Open your studio"
        subtitle="Create a free account, publish your profile and start receiving booking requests."
        footer={
          <>
            Already teaching with us?{" "}
            <Link href="/login" className="font-medium text-rausch hover:underline">
              Log in
            </Link>
          </>
        }
      >
        <SignupForm />
      </AuthShell>
      <SiteFooter />
    </>
  );
}
