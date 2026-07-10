export function slugify({ value }: { value: string }) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function buildTeacherSlug({
  fullName,
  userId,
}: {
  fullName: string;
  userId: string;
}) {
  return `${slugify({ value: fullName })}-${userId.slice(0, 4)}`;
}
