"use client";

import { useCallback, type ChangeEvent } from "react";

import { classNames } from "@/lib/class-names";

import { FieldError } from "./FieldError";
import type { TextareaProps } from "./types";

export function Textarea({
  label,
  name,
  value,
  onChange,
  error,
  required,
  placeholder,
  hint,
  rows = 4,
  maxLength,
}: TextareaProps) {
  const handleChange = useCallback(
    function handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
      onChange({ name, value: event.target.value });
    },
    [name, onChange],
  );

  const errorId = `${name}-error`;

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label htmlFor={name} className="block text-sm font-medium text-ink">
          {label}
          {required ? <span className="text-ink"> *</span> : null}
        </label>
        {maxLength ? (
          <span className="text-xs tabular-nums text-ink/40">
            {value.length}/{maxLength}
          </span>
        ) : null}
      </div>
      {hint ? <p className="mt-0.5 text-xs text-ink/50">{hint}</p> : null}
      <textarea
        id={name}
        name={name}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
        maxLength={maxLength}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        className={classNames({
          classes: [
            "mt-1.5 w-full rounded-lg border bg-white px-3.5 py-2.5 leading-relaxed text-ink placeholder:text-ink/35",
            error ? "border-error" : "border-line",
          ],
        })}
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}
