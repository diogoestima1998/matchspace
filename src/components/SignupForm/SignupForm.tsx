"use client";

import { useCallback, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/FormControls/Input";
import { signupSchema } from "@/lib/validation/auth";
import { signUpTeacher } from "@/services/auth";

import type { FieldChangeParams } from "@/components/ui/FormControls/types";

function ConfirmEmailPanel({ email }: { email: string }) {
  return (
    <div className="text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="h-7 w-7"
        >
          <rect
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.8"
          />
          <path
            d="M3.5 7l8.5 6 8.5-6"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <h2 className="mt-4 font-display text-2xl text-ink">Check your inbox</h2>
      <p className="mt-2 text-sm leading-relaxed text-ink/60">
        We&apos;ve sent a confirmation link to{" "}
        <span className="font-semibold text-ink">{email}</span>. Click it to
        activate your teacher account, then log in.
      </p>
      <div className="mt-6">
        <Button href="/login" variant="secondary" className="w-full">
          Go to log in
        </Button>
      </div>
      <p className="mt-4 text-xs text-ink/50">
        Nothing there? Check your spam folder.
      </p>
    </div>
  );
}

export function SignupForm() {
  const router = useRouter();
  const [form, setForm] = useState({ full_name: "", email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [confirmationEmail, setConfirmationEmail] = useState("");

  const mutation = useMutation({
    mutationFn: signUpTeacher,
    onSuccess: function handleSuccess(result) {
      if (result.status === "error") {
        setServerError(result.error);
        return;
      }
      if (result.status === "confirm_email") {
        setConfirmationEmail(form.email);
        return;
      }
      router.push("/dashboard/profile");
      router.refresh();
    },
  });

  const handleFieldChange = useCallback(function handleFieldChange({
    name,
    value,
  }: FieldChangeParams) {
    setForm(function updateForm(previous) {
      return { ...previous, [name]: value };
    });
  }, []);

  const handleSubmit = useCallback(
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      setServerError("");
      const parsed = signupSchema.safeParse(form);
      if (!parsed.success) {
        const fieldErrors: Record<string, string> = {};
        parsed.error.issues.forEach(function collectIssue(issue) {
          const field = String(issue.path[0] || "");
          if (field && !fieldErrors[field]) {
            fieldErrors[field] = issue.message;
          }
        });
        setErrors(fieldErrors);
        return;
      }
      setErrors({});
      mutation.mutate({
        fullName: parsed.data.full_name,
        email: parsed.data.email,
        password: parsed.data.password,
      });
    },
    [form, mutation],
  );

  if (confirmationEmail) {
    return <ConfirmEmailPanel email={confirmationEmail} />;
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <Input
        label="Full name"
        name="full_name"
        value={form.full_name}
        onChange={handleFieldChange}
        error={errors.full_name}
        placeholder="Anna Keller"
        autoComplete="name"
        required
      />
      <Input
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleFieldChange}
        error={errors.email}
        autoComplete="email"
        required
      />
      <Input
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleFieldChange}
        error={errors.password}
        hint="At least 8 characters"
        autoComplete="new-password"
        required
      />
      {serverError ? (
        <p
          role="alert"
          className="rounded-lg bg-error/10 px-4 py-3 text-sm text-error"
        >
          {serverError}
        </p>
      ) : null}
      <Button type="submit" disabled={mutation.isPending} className="w-full">
        {mutation.isPending ? "Creating your studio…" : "Create account"}
      </Button>
    </form>
  );
}
