import type { FieldErrorProps } from "./types";

export function FieldError({ message, id }: FieldErrorProps) {
  if (!message) {
    return null;
  }

  return (
    <p id={id} role="alert" className="mt-1.5 text-sm text-error">
      {message}
    </p>
  );
}
