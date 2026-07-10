import Link from "next/link";

import { InstrumentIcon } from "@/components/InstrumentIcon/InstrumentIcon";
import { TeacherAvatar } from "@/components/TeacherAvatar/TeacherAvatar";
import { Badge } from "@/components/ui/Badge/Badge";
import { StarRating } from "@/components/ui/StarRating/StarRating";
import { classNames } from "@/lib/class-names";
import { TEACHING_MODE_LABELS } from "@/lib/constants";

import type { TeacherCardProps } from "./types";

const STAGGER_CLASSES = [
  "[--stagger-index:0]",
  "[--stagger-index:1]",
  "[--stagger-index:2]",
  "[--stagger-index:3]",
  "[--stagger-index:4]",
  "[--stagger-index:5]",
  "[--stagger-index:6]",
  "[--stagger-index:7]",
];

export function TeacherCard({ teacher, staggerIndex = 0 }: TeacherCardProps) {
  const modeLine = teacher.location
    ? `${TEACHING_MODE_LABELS[teacher.teaching_mode]} · ${teacher.location}`
    : TEACHING_MODE_LABELS[teacher.teaching_mode];

  return (
    <Link
      href={`/teachers/${teacher.slug}`}
      className={classNames({
        classes: [
          "group stagger-item flex w-full flex-col rounded-2xl border border-line bg-white p-4 transition-shadow hover:shadow-lg hover:shadow-ink/10",
          STAGGER_CLASSES[staggerIndex % STAGGER_CLASSES.length],
        ],
      })}
    >
      <TeacherAvatar
        fullName={teacher.full_name}
        avatarUrl={teacher.avatar_url}
        gradientIndex={staggerIndex}
        className="aspect-square rounded-xl"
      />
      <div className="flex flex-1 flex-col p-2 pt-4">
        <div className="flex flex-wrap gap-1.5">
          {teacher.instruments.map(function renderInstrument(instrument) {
            return (
              <Badge key={instrument.id}>
                <InstrumentIcon name={instrument.slug} />
                {instrument.name}
              </Badge>
            );
          })}
        </div>
        <div className="mt-3 flex items-start justify-between gap-3">
          <h3 className="font-display text-xl text-ink">
            {teacher.full_name}
          </h3>
          <StarRating
            rating={teacher.rating}
            reviewCount={teacher.review_count}
            showCount={false}
          />
        </div>
        <p className="mt-0.5 text-sm text-ink/60">{modeLine}</p>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/60">
          {teacher.bio}
        </p>
        <p className="mt-auto pt-4 text-ink">
          <span className="tabular-nums font-semibold">
            CHF {teacher.hourly_price_chf}
          </span>{" "}
          <span className="text-sm text-ink/60">/ hour</span>
        </p>
      </div>
    </Link>
  );
}
