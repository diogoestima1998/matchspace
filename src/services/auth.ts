import { buildTeacherSlug } from "@/lib/slug";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type AuthResult = { success: true } | { success: false; error: string };

type SignUpResult =
  | { status: "complete" }
  | { status: "confirm_email" }
  | { status: "error"; error: string };

function mapAuthError({ message }: { message: string }) {
  if (message.includes("Invalid login credentials")) {
    return "That email and password combination doesn't match our records.";
  }
  if (message.includes("already registered")) {
    return "An account with this email already exists - try logging in instead.";
  }
  if (message.includes("Password should be")) {
    return "Please choose a stronger password (at least 8 characters).";
  }
  if (message.includes("Email not confirmed")) {
    return "Please confirm your email first - check your inbox for the confirmation link.";
  }
  if (message.toLowerCase().includes("rate limit")) {
    return "Too many attempts - please wait a minute and try again.";
  }
  return "Something went wrong. Please try again.";
}

export async function signUpTeacher({
  fullName,
  email,
  password,
}: {
  fullName: string;
  email: string;
  password: string;
}): Promise<SignUpResult> {
  const supabase = createSupabaseBrowserClient();

  const signUpResult = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/login`,
    },
  });

  if (signUpResult.error) {
    return {
      status: "error",
      error: mapAuthError({ message: signUpResult.error.message }),
    };
  }

  const user = signUpResult.data.user;

  const isExistingAccount = Boolean(user) && user?.identities?.length === 0;

  if (isExistingAccount) {
    return {
      status: "error",
      error:
        "An account with this email already exists - try logging in instead.",
    };
  }

  if (!user) {
    return { status: "error", error: "Something went wrong. Please try again." };
  }

  if (!signUpResult.data.session) {
    return { status: "confirm_email" };
  }

  const insertResult = await supabase.from("teachers").insert({
    id: user.id,
    slug: buildTeacherSlug({ fullName, userId: user.id }),
    full_name: fullName,
    hourly_price_chf: 80,
  });

  if (insertResult.error) {
    return {
      status: "error",
      error:
        "Your account was created but the profile draft failed - log in to continue.",
    };
  }

  return { status: "complete" };
}

export async function logInTeacher({
  email,
  password,
}: {
  email: string;
  password: string;
}): Promise<AuthResult> {
  const supabase = createSupabaseBrowserClient();

  const signInResult = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (signInResult.error) {
    return {
      success: false,
      error: mapAuthError({ message: signInResult.error.message }),
    };
  }

  return { success: true };
}
