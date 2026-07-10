export function classNames({
  classes,
}: {
  classes: Array<string | false | null | undefined>;
}) {
  return classes.filter(Boolean).join(" ");
}
