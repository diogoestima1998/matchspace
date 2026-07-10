"use client";

import { useCallback, type ChangeEvent } from "react";

import { classNames } from "@/lib/class-names";

import { FieldError } from "./FieldError";
import type { InputProps } from "./types";

export function Input({
  label,
  name,
  value,
  onChange,
  error,
  required,
  placeholder,
  hint,
  type = "text",
  min,
  max,
  suffix,
  autoComplete,
}: InputProps) {
  const handleChange = useCallback(
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      onChange({ name, value: event.target.value });
    },
    [name, onChange],
  );

  const errorId = `${name}-error`;

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-ink">
        {label}
        {required ? <span className="text-ink"> *</span> : null}
      </label>
      {hint ? <p className="mt-0.5 text-xs text-ink/50">{hint}</p> : null}
      <div className="relative mt-1.5">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          min={min}
          max={max}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={classNames({
            classes: [
              "w-full rounded-lg border bg-white px-3.5 py-2.5 text-ink placeholder:text-ink/35",
              suffix ? "pr-16" : null,
              error ? "border-error" : "border-line",
            ],
          })}
        />
        {suffix ? (
          <span className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-sm text-ink/50">
            {suffix}
          </span>
        ) : null}
      </div>
      <FieldError id={errorId} message={error} />
    </div>
  );
}
