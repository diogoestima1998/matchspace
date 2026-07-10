"use client";

import { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { BookingForm } from "./BookingForm";
import type { BookingDrawerProps } from "./types";

export function BookingDrawer({
  teacher,
  isOpen,
  onClose,
}: BookingDrawerProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(
    function manageDrawerEffects() {
      if (!isOpen) {
        return;
      }
      document.addEventListener("keydown", handleKeyDown);
      document.body.classList.add("overflow-hidden");
      return function cleanup() {
        document.removeEventListener("keydown", handleKeyDown);
        document.body.classList.remove("overflow-hidden");
      };
    },
    [isOpen, handleKeyDown]
  );

  if (!isOpen || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <button
        type="button"
        aria-label="Close booking form"
        onClick={onClose}
        className="absolute inset-0 h-full w-full cursor-default bg-ink/40"
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-drawer-title"
        className="relative max-h-[92dvh] w-full overflow-y-auto rounded-t-2xl bg-white p-6 shadow-2xl sm:max-h-[88dvh] sm:max-w-xl sm:rounded-2xl sm:p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2
              id="booking-drawer-title"
              className="font-display text-2xl text-ink"
            >
              Request a lesson
            </h2>
            <p className="mt-1 text-sm text-ink/60">with {teacher.full_name}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="rounded-full p-2 text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 20 20"
              fill="none"
              className="h-5 w-5"
            >
              <path
                d="M5 5l10 10M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        <div className="mt-6">
          <BookingForm teacher={teacher} />
        </div>
      </div>
    </div>,
    document.body
  );
}
