"use client";

import { useCallback, type ChangeEvent } from "react";

import { Dropdown } from "@/components/ui/Dropdown/Dropdown";
import { classNames } from "@/lib/class-names";
import { PRICE_MAX_CHF } from "@/lib/constants";

import type { FilterBarProps } from "./types";

const MODE_OPTIONS = [
  { value: "all", label: "All formats" },
  { value: "in_person", label: "In person" },
  { value: "online", label: "Online" },
] as const;

const PRICE_OPTIONS = [
  { value: String(PRICE_MAX_CHF), label: "Any price" },
  { value: "60", label: "Up to CHF 60 / hour" },
  { value: "80", label: "Up to CHF 80 / hour" },
  { value: "100", label: "Up to CHF 100 / hour" },
  { value: "120", label: "Up to CHF 120 / hour" },
  { value: "150", label: "Up to CHF 150 / hour" },
  { value: "200", label: "Up to CHF 200 / hour" },
  { value: "300", label: "Up to CHF 300 / hour" },
  { value: "500", label: "Up to CHF 500 / hour" },
];

export function FilterBar({ instruments, filters, onFilterChange }: FilterBarProps) {
  const handleModeClick = useCallback(
    function handleModeClick(event: ChangeEvent<HTMLInputElement>) {
      onFilterChange({ name: "mode", value: event.target.value });
    },
    [onFilterChange],
  );

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-line bg-white p-5 md:flex-row md:items-end md:gap-8">
      <div className="md:w-56">
        <span className="block text-sm font-medium text-ink">Instrument</span>
        <div className="mt-1.5">
          <Dropdown
            name="instrument"
            value={filters.instrument}
            options={[
              { value: "all", label: "All instruments" },
              ...instruments.map(function toOption(instrument) {
                return { value: instrument.slug, label: instrument.name };
              }),
            ]}
            onChange={onFilterChange}
            ariaLabel="Instrument"
          />
        </div>
      </div>
      <fieldset>
        <legend className="text-sm font-medium text-ink">Lesson format</legend>
        <div className="mt-1.5 flex rounded-lg bg-mist p-1">
          {MODE_OPTIONS.map(function renderMode(option) {
            const isActive = filters.mode === option.value;
            return (
              <label
                key={option.value}
                className={classNames({
                  classes: [
                    "cursor-pointer rounded-md px-4 py-1.5 text-sm transition-colors",
                    isActive
                      ? "bg-white font-medium text-ink shadow-sm"
                      : "text-ink/60 hover:text-ink",
                  ],
                })}
              >
                <input
                  type="radio"
                  name="mode"
                  value={option.value}
                  checked={isActive}
                  onChange={handleModeClick}
                  className="sr-only"
                />
                {option.label}
              </label>
            );
          })}
        </div>
      </fieldset>
      <div className="md:w-56">
        <span className="block text-sm font-medium text-ink">Max price</span>
        <div className="mt-1.5">
          <Dropdown
            name="maxPrice"
            value={String(filters.maxPrice)}
            options={PRICE_OPTIONS}
            onChange={onFilterChange}
            ariaLabel="Max price"
          />
        </div>
      </div>
    </div>
  );
}
