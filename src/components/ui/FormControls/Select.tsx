"use client";

import { Dropdown } from "@/components/ui/Dropdown/Dropdown";

import { FieldError } from "./FieldError";
import type { SelectProps } from "./types";

export function Select({
  label,
  name,
  value,
  onChange,
  error,
  required,
  hint,
  options,
}: SelectProps) {
  const errorId = `${name}-error`;

  return (
    <div>
      <span className="block text-sm font-medium text-ink">
        {label}
        {required ? <span className="text-error"> *</span> : null}
      </span>
      {hint ? <p className="mt-0.5 text-xs text-ink/50">{hint}</p> : null}
      <div className="mt-1.5">
        <Dropdown
          name={name}
          value={value}
          options={options}
          onChange={onChange}
          hasError={Boolean(error)}
          ariaLabel={label}
        />
      </div>
      <FieldError id={errorId} message={error} />
    </div>
  );
}
