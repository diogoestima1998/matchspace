"use client";

import { useCallback, useState, type MouseEvent } from "react";

import { FieldError } from "@/components/ui/FormControls/FieldError";
import { classNames } from "@/lib/class-names";

import {
  buildCalendarDays,
  buildTimeSlots,
  formatMonthTitle,
  formatSelection,
} from "./calendar";
import type { DateTimePickerProps } from "./types";

const WEEKDAYS = ["M", "T", "W", "T", "F", "S", "S"];

const TIME_SLOTS = buildTimeSlots();

export function DateTimePicker({
  label,
  name,
  value,
  onChange,
  minIso,
  error,
  required,
}: DateTimePickerProps) {
  const minIsoDate = minIso.slice(0, 10);
  const valueDate = value ? value.slice(0, 10) : "";
  const valueTime = value ? value.slice(11, 16) : "";

  const [isOpen, setIsOpen] = useState(false);
  const [draftDate, setDraftDate] = useState(valueDate);
  const [draftTime, setDraftTime] = useState(valueTime);
  const [viewYear, setViewYear] = useState(
    Number((valueDate || minIsoDate).slice(0, 4))
  );
  const [viewMonth, setViewMonth] = useState(
    Number((valueDate || minIsoDate).slice(5, 7)) - 1
  );

  const errorId = `${name}-error`;
  const days = buildCalendarDays({ viewYear, viewMonth, minIsoDate });

  const handleToggle = useCallback(function handleToggle() {
    setIsOpen(function invert(previous) {
      return !previous;
    });
  }, []);

  const handleMonthShift = useCallback(function handleMonthShift(
    event: MouseEvent<HTMLButtonElement>
  ) {
    const shift = Number(event.currentTarget.dataset.shift);
    setViewMonth(function move(previous) {
      const next = previous + shift;
      if (next < 0) {
        setViewYear(function back(year) {
          return year - 1;
        });
        return 11;
      }
      if (next > 11) {
        setViewYear(function forward(year) {
          return year + 1;
        });
        return 0;
      }
      return next;
    });
  }, []);

  const handleDaySelect = useCallback(
    function handleDaySelect(event: MouseEvent<HTMLButtonElement>) {
      const iso = event.currentTarget.dataset.iso || "";
      setDraftDate(iso);
      if (draftTime) {
        onChange({ name, value: `${iso}T${draftTime}` });
      }
    },
    [draftTime, name, onChange]
  );

  const handleTimeSelect = useCallback(
    function handleTimeSelect(event: MouseEvent<HTMLButtonElement>) {
      const time = event.currentTarget.dataset.time || "";
      setDraftTime(time);
      if (draftDate) {
        onChange({ name, value: `${draftDate}T${time}` });
        setIsOpen(false);
      }
    },
    [draftDate, name, onChange]
  );

  return (
    <div className="relative">
      <span className="block text-sm font-medium text-ink">
        {label}
        {required ? <span className="text-error"> *</span> : null}
      </span>
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={isOpen}
        aria-describedby={error ? errorId : undefined}
        className={classNames({
          classes: [
            "mt-1.5 flex w-full items-center justify-between gap-2 rounded-lg border bg-white px-3.5 py-2.5 text-left",
            error ? "border-error" : "border-line",
            value ? "text-ink" : "text-ink/40",
          ],
        })}
      >
        {value ? formatSelection({ value }) : "Pick a date & time"}
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          className="h-4 w-4 shrink-0 text-ink/50"
        >
          <rect
            x="3.5"
            y="5"
            width="17"
            height="15"
            rx="2"
            stroke="currentColor"
            strokeWidth="1.6"
          />
          <path
            d="M3.5 9.5h17M8 3v3.5M16 3v3.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </button>
      {isOpen ? (
        <div className="absolute left-0 top-full z-30 mt-2 flex w-[20rem] gap-4 rounded-xl border border-line bg-white p-4 shadow-xl shadow-ink/10">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-ink">
                {formatMonthTitle({ viewYear, viewMonth })}
              </p>
              <div className="flex gap-1">
                <button
                  type="button"
                  aria-label="Previous month"
                  data-shift="-1"
                  onClick={handleMonthShift}
                  className="rounded-full p-1.5 text-ink/60 hover:bg-mist hover:text-ink"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="h-4 w-4"
                  >
                    <path
                      d="M12.5 5l-5 5 5 5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  aria-label="Next month"
                  data-shift="1"
                  onClick={handleMonthShift}
                  className="rounded-full p-1.5 text-ink/60 hover:bg-mist hover:text-ink"
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 20 20"
                    fill="none"
                    className="h-4 w-4"
                  >
                    <path
                      d="M7.5 5l5 5-5 5"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-7 gap-0.5 text-center text-xs font-medium text-ink/50">
              {WEEKDAYS.map(function renderWeekday(weekday, index) {
                return (
                  <span key={`${weekday}-${index}`} className="py-1">
                    {weekday}
                  </span>
                );
              })}
            </div>
            <div className="grid grid-cols-7 gap-0.5">
              {days.map(function renderDay(day) {
                const isSelected = day.iso === draftDate;
                return (
                  <button
                    key={day.iso}
                    type="button"
                    data-iso={day.iso}
                    onClick={handleDaySelect}
                    disabled={day.disabled}
                    aria-pressed={isSelected}
                    className={classNames({
                      classes: [
                        "flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors",
                        isSelected
                          ? "bg-rausch font-semibold text-white"
                          : day.disabled
                            ? "text-ink/25"
                            : day.inMonth
                              ? "text-ink hover:bg-mist"
                              : "text-ink/40 hover:bg-mist",
                      ],
                    })}
                  >
                    {day.dayNumber}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="w-24 border-l border-line pl-4">
            <p className="text-xs font-medium uppercase tracking-wide text-ink/50">
              Time
            </p>
            <div className="mt-2 flex max-h-64 flex-col gap-1 overflow-y-auto pr-1">
              {TIME_SLOTS.map(function renderSlot(slot) {
                const isSelected = slot === draftTime;
                return (
                  <button
                    key={slot}
                    type="button"
                    data-time={slot}
                    onClick={handleTimeSelect}
                    aria-pressed={isSelected}
                    className={classNames({
                      classes: [
                        "tabular-nums rounded-lg border px-2 py-1.5 text-sm transition-colors",
                        isSelected
                          ? "border-rausch bg-rausch font-semibold text-white"
                          : "border-line text-ink/80 hover:border-ink/40 hover:bg-mist",
                      ],
                    })}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
      <FieldError id={errorId} message={error} />
    </div>
  );
}
