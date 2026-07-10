"use client";

import { useCallback, type ChangeEvent } from "react";

import { InstrumentIcon } from "@/components/InstrumentIcon/InstrumentIcon";
import { classNames } from "@/lib/class-names";

import { FieldError } from "@/components/ui/FormControls/FieldError";

import type { InstrumentPickerProps } from "./types";

export function InstrumentPicker({
  instruments,
  selectedIds,
  onToggle,
  error,
}: InstrumentPickerProps) {
  const handleChange = useCallback(
    function handleChange(event: ChangeEvent<HTMLInputElement>) {
      onToggle({ instrumentId: Number(event.target.value) });
    },
    [onToggle],
  );

  return (
    <fieldset>
      <legend className="text-sm font-medium text-ink">
        Instruments you teach <span className="text-ink">*</span>
      </legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {instruments.map(function renderInstrument(instrument) {
          const isSelected = selectedIds.includes(instrument.id);
          return (
            <label
              key={instrument.id}
              className={classNames({
                classes: [
                  "inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-4 py-1.5 text-sm transition-colors",
                  isSelected
                    ? "border-ink bg-mist font-medium text-ink"
                    : "border-line bg-white text-ink/60 hover:border-ink/30 hover:text-ink",
                ],
              })}
            >
              <input
                type="checkbox"
                value={instrument.id}
                checked={isSelected}
                onChange={handleChange}
                className="sr-only"
              />
              <InstrumentIcon name={instrument.slug} />
              {instrument.name}
            </label>
          );
        })}
      </div>
      <FieldError id="instrument-error" message={error} />
    </fieldset>
  );
}
