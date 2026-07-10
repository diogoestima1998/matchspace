"use client";

import { useCallback, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { Dropdown } from "@/components/ui/Dropdown/Dropdown";

import type { InstrumentRow } from "@/lib/database.types";

const MODE_OPTIONS = [
  { value: "all", label: "In person & online" },
  { value: "in_person", label: "In person" },
  { value: "online", label: "Online" },
];

export function SearchPill({ instruments }: { instruments: InstrumentRow[] }) {
  const router = useRouter();
  const [instrument, setInstrument] = useState("all");
  const [mode, setMode] = useState("all");

  const instrumentOptions = [
    { value: "all", label: "Any instrument" },
    ...instruments.map(function toOption(item) {
      return { value: item.slug, label: item.name };
    }),
  ];

  const handleFieldChange = useCallback(function handleFieldChange({
    name,
    value,
  }: {
    name: string;
    value: string;
  }) {
    if (name === "instrument") {
      setInstrument(value);
      return;
    }
    setMode(value);
  }, []);

  const handleSubmit = useCallback(
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
      event.preventDefault();
      const params = new URLSearchParams();
      if (instrument !== "all") {
        params.set("instrument", instrument);
      }
      if (mode !== "all") {
        params.set("mode", mode);
      }
      const queryString = params.toString();
      router.push(queryString ? `/teachers?${queryString}` : "/teachers");
    },
    [router, instrument, mode],
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-2xl flex-col gap-3 rounded-2xl border border-line bg-white p-3 shadow-lg shadow-ink/5 sm:flex-row sm:items-center sm:gap-2 sm:rounded-full sm:p-2"
    >
      <div className="flex-1 border-b border-line px-2 pb-3 sm:border-b-0 sm:border-r sm:px-4 sm:pb-0">
        <span className="block text-left text-xs font-semibold text-ink">
          Instrument
        </span>
        <Dropdown
          name="instrument"
          value={instrument}
          options={instrumentOptions}
          onChange={handleFieldChange}
          variant="bare"
          ariaLabel="Instrument"
        />
      </div>
      <div className="flex-1 px-2 sm:px-4">
        <span className="block text-left text-xs font-semibold text-ink">
          Lesson format
        </span>
        <Dropdown
          name="mode"
          value={mode}
          options={MODE_OPTIONS}
          onChange={handleFieldChange}
          variant="bare"
          ariaLabel="Lesson format"
        />
      </div>
      <button
        type="submit"
        aria-label="Search teachers"
        className="flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-rausch text-white transition-colors hover:bg-rausch-deep sm:h-12 sm:w-12 sm:rounded-full"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
          <path
            d="M16.5 16.5 21 21"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span className="text-sm font-semibold sm:hidden">Search</span>
      </button>
    </form>
  );
}
