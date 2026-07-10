"use client";

import { useCallback, useMemo, useState, type FormEvent } from "react";
import { useMutation } from "@tanstack/react-query";

import { Button } from "@/components/ui/Button/Button";
import { DateTimePicker } from "@/components/ui/DateTimePicker/DateTimePicker";
import { Input } from "@/components/ui/FormControls/Input";
import { Select } from "@/components/ui/FormControls/Select";
import { Textarea } from "@/components/ui/FormControls/Textarea";
import { LESSON_DURATIONS } from "@/lib/constants";
import { computeAmountChf } from "@/lib/pricing";
import { bookingRequestSchema } from "@/lib/validation/booking";
import { requestBooking } from "@/services/bookings";

import type { FieldChangeParams } from "@/components/ui/FormControls/types";
import type { BookingFormProps } from "./types";

function toDatetimeLocalValue({ date }: { date: Date }) {
  const pad = function pad(value: number) {
    return String(value).padStart(2, "0");
  };
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function BookingForm({ teacher }: BookingFormProps) {
  const [form, setForm] = useState({
    student_name: "",
    student_email: "",
    requested_start: "",
    duration_minutes: "60",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");

  const minStart = useMemo(function computeMinStart() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(9, 0, 0, 0);
    return toDatetimeLocalValue({ date: tomorrow });
  }, []);

  const amountChf = computeAmountChf({
    hourlyPriceChf: teacher.hourly_price_chf,
    durationMinutes: Number(form.duration_minutes),
  });

  const mutation = useMutation({
    mutationFn: requestBooking,
    onSuccess: function handleSuccess(result) {
      if (!result.success) {
        setServerError(result.error);
        return;
      }
      window.location.assign(result.data.url);
    },
    onError: function handleError() {
      setServerError("Could not reach the booking service. Please try again.");
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
      const parsed = bookingRequestSchema.safeParse({
        teacher_id: teacher.id,
        student_name: form.student_name,
        student_email: form.student_email,
        requested_start: form.requested_start,
        duration_minutes: Number(form.duration_minutes),
        message: form.message || undefined,
      });
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
    [form, mutation, teacher.id]
  );

  const durationOptions = LESSON_DURATIONS.map(function toOption(duration) {
    return { value: String(duration), label: `${duration} minutes` };
  });

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid items-start gap-5 sm:grid-cols-2">
        <Input
          label="Your name"
          name="student_name"
          value={form.student_name}
          onChange={handleFieldChange}
          error={errors.student_name}
          required
        />
        <Input
          label="Email"
          name="student_email"
          type="email"
          value={form.student_email}
          onChange={handleFieldChange}
          error={errors.student_email}
          required
        />
      </div>
      <div className="grid items-start gap-5 sm:grid-cols-2">
        <DateTimePicker
          label="Preferred date & time"
          name="requested_start"
          value={form.requested_start}
          onChange={handleFieldChange}
          error={errors.requested_start}
          minIso={minStart}
          required
        />
        <Select
          label="Duration"
          name="duration_minutes"
          value={form.duration_minutes}
          onChange={handleFieldChange}
          error={errors.duration_minutes}
          options={durationOptions}
          required
        />
      </div>
      <Textarea
        label="Message (optional)"
        name="message"
        value={form.message}
        onChange={handleFieldChange}
        error={errors.message}
        placeholder="Tell your teacher about your level and goals…"
        rows={3}
        maxLength={500}
      />
      <div className="flex items-baseline justify-between border-t border-line pt-4">
        <span className="text-sm text-ink/60">Total</span>
        <span className="tabular-nums font-display text-2xl text-ink">
          CHF {amountChf}
        </span>
      </div>
      {serverError ? (
        <p
          role="alert"
          className="rounded-lg bg-error/10 px-4 py-3 text-sm text-error"
        >
          {serverError}
        </p>
      ) : null}
      <Button type="submit" disabled={mutation.isPending} className="w-full">
        {mutation.isPending
          ? "Preparing secure payment…"
          : "Continue to payment"}
      </Button>
      <p className="text-center text-xs text-ink/50">
        Secure payment via Stripe. You&apos;ll be redirected to complete the
        booking.
      </p>
    </form>
  );
}
