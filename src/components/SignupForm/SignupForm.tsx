"use client";

import { useCallback, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/FormControls/Input";
import { signupSchema } from "@/lib/validation/auth";
import { signUpTeacher } from "@/services/auth";

import type { FieldChangeParams } from "@/components/ui/FormControls/types";

export function SignupForm() {
  const router = useRouter();
  const [form, setForm] = useState({ full_name: "", email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");

  const mutation = useMutation({
    mutationFn: signUpTeacher,
    onSuccess: function handleSuccess(result) {
      if (!result.success) {
        setServerError(result.error);
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
        <p role="alert" className="rounded-lg bg-error/10 px-4 py-3 text-sm text-error">
          {serverError}
        </p>
      ) : null}
      <Button type="submit" disabled={mutation.isPending} className="w-full">
        {mutation.isPending ? "Creating your studio…" : "Create account"}
      </Button>
    </form>
  );
}
