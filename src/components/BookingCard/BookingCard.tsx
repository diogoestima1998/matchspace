"use client";

import { useCallback, useState } from "react";

import { Button } from "@/components/ui/Button/Button";
import { TEACHING_MODE_LABELS } from "@/lib/constants";

import { BookingDrawer } from "./BookingDrawer";
import type { BookingCardProps } from "./types";

export function BookingCard({ teacher }: BookingCardProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpen = useCallback(function handleOpen() {
    setIsDrawerOpen(true);
  }, []);

  const handleClose = useCallback(function handleClose() {
    setIsDrawerOpen(false);
  }, []);

  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
      <p className="tabular-nums font-display text-4xl text-ink">
        CHF {teacher.hourly_price_chf}
        <span className="font-sans text-base font-normal text-ink/50">
          {" "}
          / hour
        </span>
      </p>
      <dl className="mt-5 space-y-3 border-t border-line pt-5 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-ink/60">Format</dt>
          <dd className="text-right text-ink">
            {TEACHING_MODE_LABELS[teacher.teaching_mode]}
          </dd>
        </div>
        {teacher.location ? (
          <div className="flex justify-between gap-4">
            <dt className="text-ink/60">Location</dt>
            <dd className="text-right text-ink">{teacher.location}</dd>
          </div>
        ) : null}
        <div className="flex justify-between gap-4">
          <dt className="text-ink/60">Durations</dt>
          <dd className="text-right text-ink">30–90 minutes</dd>
        </div>
      </dl>
      <div className="mt-6">
        <Button size="lg" onClick={handleOpen} className="w-full">
          Request a lesson
        </Button>
      </div>
      <p className="mt-3 text-center text-xs text-ink/50">
        No account needed - pay securely with Stripe.
      </p>
      <BookingDrawer
        teacher={teacher}
        isOpen={isDrawerOpen}
        onClose={handleClose}
      />
    </div>
  );
}
