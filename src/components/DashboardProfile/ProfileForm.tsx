"use client";

import { useCallback, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/FormControls/Input";
import { Textarea } from "@/components/ui/FormControls/Textarea";
import { TEACHING_MODES, TEACHING_MODE_LABELS } from "@/lib/constants";
import { classNames } from "@/lib/class-names";
import { teacherProfileSchema } from "@/lib/validation/teacher";
import { saveTeacherProfile } from "@/services/teacher-profile";

import { InstrumentPicker } from "./InstrumentPicker";

import type { FieldChangeParams } from "@/components/ui/FormControls/types";
import type { ProfileFormProps } from "./types";

export function ProfileForm({
  teacherId,
  initialTeacher,
  instruments,
  initialInstrumentIds,
}: ProfileFormProps) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    full_name: initialTeacher?.full_name || "",
    bio: initialTeacher?.bio || "",
    credentials: initialTeacher?.credentials || "",
    teaching_mode: initialTeacher?.teaching_mode || "both",
    location: initialTeacher?.location || "",
    hourly_price_chf: initialTeacher
      ? String(initialTeacher.hourly_price_chf)
      : "80",
    availability_note: initialTeacher?.availability_note || "",
  });
  const [instrumentIds, setInstrumentIds] = useState(initialInstrumentIds);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const mutation = useMutation({
    mutationFn: saveTeacherProfile,
    onSuccess: function handleSuccess(result) {
      if (!result.success) {
        setServerError(result.error);
        return;
      }
      setIsSaved(true);
      queryClient.invalidateQueries({ queryKey: ["published-teachers"] });
      router.refresh();
    },
  });

  const handleFieldChange = useCallback(function handleFieldChange({
    name,
    value,
  }: FieldChangeParams) {
    setIsSaved(false);
    setForm(function updateForm(previous) {
      return { ...previous, [name]: value };
    });
  }, []);

  const handleInstrumentToggle = useCallback(function handleInstrumentToggle({
    instrumentId,
  }: {
    instrumentId: number;
  }) {
    setIsSaved(false);
    setInstrumentIds(function updateIds(previous) {
      if (previous.includes(instrumentId)) {
        return previous.filter(function keepOthers(id) {
          return id !== instrumentId;
        });
      }
      return [...previous, instrumentId];
    });
  }, []);

  const handleModeChange = useCallback(
    function handleModeChange(event: React.ChangeEvent<HTMLInputElement>) {
      handleFieldChange({ name: "teaching_mode", value: event.target.value });
    },
    [handleFieldChange],
  );

  const handleSubmit = useCallback(
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      setServerError("");
      const parsed = teacherProfileSchema.safeParse({
        ...form,
        hourly_price_chf: Number(form.hourly_price_chf),
        instrument_ids: instrumentIds,
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
      mutation.mutate({
        teacherId,
        existingSlug: initialTeacher?.slug || null,
        input: parsed.data,
      });
    },
    [form, instrumentIds, mutation, teacherId, initialTeacher?.slug],
  );

  const showLocation = form.teaching_mode !== "online";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <Input
        label="Full name"
        name="full_name"
        value={form.full_name}
        onChange={handleFieldChange}
        error={errors.full_name}
        required
      />
      <Textarea
        label="Bio"
        name="bio"
        value={form.bio}
        onChange={handleFieldChange}
        error={errors.bio}
        hint="What should students know about you and your teaching?"
        rows={5}
        maxLength={1200}
      />
      <Textarea
        label="Credentials & education"
        name="credentials"
        value={form.credentials}
        onChange={handleFieldChange}
        error={errors.credentials}
        hint="Diplomas, conservatoires, orchestras, notable experience"
        rows={3}
        maxLength={600}
      />
      <InstrumentPicker
        instruments={instruments}
        selectedIds={instrumentIds}
        onToggle={handleInstrumentToggle}
        error={errors.instrument_ids}
      />
      <fieldset>
        <legend className="text-sm font-medium text-ink">
          Lesson format <span className="text-ink">*</span>
        </legend>
        <div className="mt-2 flex flex-wrap gap-2">
          {TEACHING_MODES.map(function renderMode(mode) {
            const isActive = form.teaching_mode === mode;
            return (
              <label
                key={mode}
                className={classNames({
                  classes: [
                    "cursor-pointer rounded-full border px-4 py-1.5 text-sm transition-colors",
                    isActive
                      ? "border-ink bg-mist font-medium text-ink"
                      : "border-line bg-white text-ink/60 hover:border-ink/30 hover:text-ink",
                  ],
                })}
              >
                <input
                  type="radio"
                  name="teaching_mode"
                  value={mode}
                  checked={isActive}
                  onChange={handleModeChange}
                  className="sr-only"
                />
                {TEACHING_MODE_LABELS[mode]}
              </label>
            );
          })}
        </div>
      </fieldset>
      {showLocation ? (
        <Input
          label="Location"
          name="location"
          value={form.location}
          onChange={handleFieldChange}
          error={errors.location}
          placeholder="Zürich"
          required
        />
      ) : null}
      <Input
        label="Hourly price"
        name="hourly_price_chf"
        type="number"
        value={form.hourly_price_chf}
        onChange={handleFieldChange}
        error={errors.hourly_price_chf}
        suffix="CHF / hour"
        min="10"
        max="1000"
        required
      />
      <Textarea
        label="Availability"
        name="availability_note"
        value={form.availability_note}
        onChange={handleFieldChange}
        error={errors.availability_note}
        placeholder="Weekdays after 17:00, Saturday mornings"
        rows={2}
        maxLength={300}
      />
      {serverError ? (
        <p role="alert" className="rounded-lg bg-error/10 px-4 py-3 text-sm text-error">
          {serverError}
        </p>
      ) : null}
      <div className="flex items-center gap-4">
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Saving…" : "Save profile"}
        </Button>
        {isSaved ? (
          <p role="status" className="text-sm font-medium text-emerald-600">
            Profile saved
          </p>
        ) : null}
      </div>
    </form>
  );
}
