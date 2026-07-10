"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";

import { classNames } from "@/lib/class-names";

import type { DropdownProps, DropdownVariant } from "./types";

const TRIGGER_CLASSES: Record<DropdownVariant, string> = {
  input:
    "w-full rounded-lg border bg-white px-3.5 py-2.5 text-ink justify-between",
  bare: "w-full bg-transparent text-sm text-ink/70 justify-between",
};

export function Dropdown({
  name,
  value,
  options,
  onChange,
  variant = "input",
  hasError,
  ariaLabel,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(function matchesValue(option) {
    return option.value === value;
  });

  const handleToggle = useCallback(function handleToggle() {
    setIsOpen(function invert(previous) {
      return !previous;
    });
  }, []);

  const handleSelect = useCallback(
    function handleSelect(event: MouseEvent<HTMLButtonElement>) {
      const nextValue = event.currentTarget.dataset.value || "";
      onChange({ name, value: nextValue });
      setIsOpen(false);
    },
    [name, onChange],
  );

  useEffect(
    function manageOutsideInteractions() {
      if (!isOpen) {
        return;
      }

      function handleOutsideClick(event: globalThis.MouseEvent) {
        if (!containerRef.current?.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }

      function handleEscape(event: KeyboardEvent) {
        if (event.key === "Escape") {
          setIsOpen(false);
        }
      }

      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleEscape);
      return function cleanup() {
        document.removeEventListener("mousedown", handleOutsideClick);
        document.removeEventListener("keydown", handleEscape);
      };
    },
    [isOpen],
  );

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={handleToggle}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        className={classNames({
          classes: [
            "inline-flex items-center gap-2 text-left",
            TRIGGER_CLASSES[variant],
            variant === "input" ? (hasError ? "border-error" : "border-line") : null,
          ],
        })}
      >
        <span className="truncate">{selectedOption?.label || "Select"}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="none"
          className={classNames({
            classes: [
              "h-4 w-4 shrink-0 text-ink/50 transition-transform",
              isOpen ? "rotate-180" : null,
            ],
          })}
        >
          <path
            d="M5 7.5l5 5 5-5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      {isOpen ? (
        <ul
          role="listbox"
          aria-label={ariaLabel}
          className="absolute left-0 top-full z-30 mt-2 max-h-64 w-full min-w-48 overflow-auto rounded-xl border border-line bg-white py-1.5 shadow-xl shadow-ink/10"
        >
          {options.map(function renderOption(option) {
            const isSelected = option.value === value;
            return (
              <li key={option.value}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  data-value={option.value}
                  onClick={handleSelect}
                  className={classNames({
                    classes: [
                      "flex w-full items-center justify-between gap-3 px-4 py-2 text-left text-sm transition-colors hover:bg-mist",
                      isSelected ? "font-semibold text-ink" : "text-ink/80",
                    ],
                  })}
                >
                  {option.label}
                  {isSelected ? (
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 20 20"
                      fill="none"
                      className="h-4 w-4 shrink-0 text-rausch"
                    >
                      <path
                        d="M4.5 10.5l3.5 3.5 7.5-8"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
