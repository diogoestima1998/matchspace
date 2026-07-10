import { Badge } from "@/components/ui/Badge/Badge";
import { EmptyState } from "@/components/ui/EmptyState/EmptyState";
import {
  BOOKING_STATUS_LABELS,
  type BookingStatus,
} from "@/lib/constants";

import type { BadgeTone } from "@/components/ui/Badge/types";
import type { BookingsListProps } from "./types";

const STATUS_TONES: Record<BookingStatus, BadgeTone> = {
  pending_payment: "neutral",
  confirmed: "green",
  expired: "red",
  canceled: "red",
};

function formatBookingDate({ isoDate }: { isoDate: string }) {
  return new Intl.DateTimeFormat("en-CH", {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(isoDate));
}

export function BookingsList({ bookings }: BookingsListProps) {
  if (bookings.length === 0) {
    return (
      <EmptyState
        title="No booking requests yet"
        description="Once your profile is published, lesson requests from students will appear here."
      />
    );
  }

  return (
    <ul className="divide-y divide-line rounded-2xl border border-line bg-white">
      {bookings.map(function renderBooking(booking) {
        return (
          <li
            key={booking.id}
            className="flex flex-col gap-2 p-5 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <p className="font-medium text-ink">
                {booking.student_name}
                <span className="font-normal text-ink/50">
                  {" "}
                  · {booking.student_email}
                </span>
              </p>
              <p className="mt-0.5 text-sm text-ink/60">
                {formatBookingDate({ isoDate: booking.requested_start })} ·{" "}
                {booking.duration_minutes} min
              </p>
              {booking.message ? (
                <p className="mt-1.5 max-w-md text-sm italic leading-relaxed text-ink/50">
                  “{booking.message}”
                </p>
              ) : null}
            </div>
            <div className="flex items-center gap-4 sm:flex-col sm:items-end sm:gap-1.5">
              <span className="tabular-nums font-medium text-ink">
                CHF {booking.amount_chf}
              </span>
              <Badge tone={STATUS_TONES[booking.status]}>
                {BOOKING_STATUS_LABELS[booking.status]}
              </Badge>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
