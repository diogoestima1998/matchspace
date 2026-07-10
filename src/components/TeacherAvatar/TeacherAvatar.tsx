import Image from "next/image";

import { classNames } from "@/lib/class-names";

import type { TeacherAvatarProps } from "./types";

const AVATAR_GRADIENTS = [
  "from-rose-100 to-orange-100 text-rose-500",
  "from-sky-100 to-indigo-100 text-sky-600",
  "from-amber-100 to-yellow-100 text-amber-600",
  "from-emerald-100 to-teal-100 text-emerald-600",
];

function getInitials({ fullName }: { fullName: string }) {
  return fullName
    .split(" ")
    .slice(0, 2)
    .map(function firstLetter(part) {
      return part.charAt(0).toUpperCase();
    })
    .join("");
}

export function TeacherAvatar({
  fullName,
  avatarUrl,
  gradientIndex = 0,
  className,
  sizes = "(max-width: 768px) 50vw, 300px",
}: TeacherAvatarProps) {
  if (avatarUrl) {
    return (
      <div
        className={classNames({
          classes: ["relative overflow-hidden", className],
        })}
      >
        <Image
          src={avatarUrl}
          alt={`Portrait of ${fullName}`}
          fill
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }

  const gradient = AVATAR_GRADIENTS[gradientIndex % AVATAR_GRADIENTS.length];

  return (
    <div
      className={classNames({
        classes: [
          "flex items-center justify-center bg-gradient-to-br",
          gradient,
          className,
        ],
      })}
    >
      <span aria-hidden="true" className="font-display text-4xl">
        {getInitials({ fullName })}
      </span>
    </div>
  );
}
