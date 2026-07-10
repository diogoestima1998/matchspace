import type { BookingRequestInput } from "@/lib/validation/booking";

type BookingResponse =
  | { success: true; data: { url: string } }
  | { success: false; error: string };

export async function requestBooking(
  input: BookingRequestInput,
): Promise<BookingResponse> {
  const response = await fetch("/api/bookings", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  const payload = (await response.json().catch(function fallback() {
    return null;
  })) as BookingResponse | null;

  if (!payload) {
    return {
      success: false,
      error: "Unexpected response from the booking service.",
    };
  }

  return payload;
}
