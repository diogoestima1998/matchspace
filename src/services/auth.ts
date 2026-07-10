import { buildTeacherSlug } from "@/lib/slug";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type AuthResult = { success: true } | { success: false; error: string };

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
}): Promise<AuthResult> {
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
      success: false,
      error: mapAuthError({ message: signUpResult.error.message }),
    };
  }

  const user = signUpResult.data.user;

  const isExistingAccount = Boolean(user) && user?.identities?.length === 0;

  if (isExistingAccount) {
    return {
      success: false,
      error:
        "An account with this email already exists - try logging in instead.",
    };
  }

  if (!user || !signUpResult.data.session) {
    return {
      success: false,
      error:
        "Almost there - please confirm your email from your inbox, then log in.",
    };
  }

  const insertResult = await supabase.from("teachers").insert({
    id: user.id,
    slug: buildTeacherSlug({ fullName, userId: user.id }),
    full_name: fullName,
    hourly_price_chf: 80,
  });

  if (insertResult.error) {
    return {
      success: false,
      error:
        "Your account was created but the profile draft failed - log in to continue.",
    };
  }

  return { success: true };
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
