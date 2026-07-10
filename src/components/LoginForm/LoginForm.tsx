"use client";

import { useCallback, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/FormControls/Input";
import { loginSchema } from "@/lib/validation/auth";
import { logInTeacher } from "@/services/auth";

import type { FieldChangeParams } from "@/components/ui/FormControls/types";

export function LoginForm() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");

  const mutation = useMutation({
    mutationFn: logInTeacher,
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
      const parsed = loginSchema.safeParse(form);
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
      mutation.mutate(parsed.data);
    },
    [form, mutation],
  );

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <Input
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleFieldChange}
        error={errors.email}
        autoComplete="username"
        required
      />
      <Input
        label="Password"
        name="password"
        type="password"
        value={form.password}
        onChange={handleFieldChange}
        error={errors.password}
        autoComplete="current-password"
        required
      />
      {serverError ? (
        <p role="alert" className="rounded-lg bg-error/10 px-4 py-3 text-sm text-error">
          {serverError}
        </p>
      ) : null}
      <Button type="submit" disabled={mutation.isPending} className="w-full">
        {mutation.isPending ? "Logging in…" : "Log in"}
      </Button>
    </form>
  );
}
