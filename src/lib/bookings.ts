import "server-only";

import { getStripeClient } from "@/lib/stripe";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

import type { BookingRow, TeacherRow } from "@/lib/database.types";

type ConfirmBookingResult =
  | { confirmed: true; booking: BookingRow; teacher: TeacherRow }
  | { confirmed: false };

export async function confirmBooking({
  sessionId,
}: {
  sessionId: string;
}): Promise<ConfirmBookingResult> {
  const stripe = getStripeClient();

  const session = await stripe.checkout.sessions
    .retrieve(sessionId)
    .catch(function invalidSession() {
      return null;
    });

  if (!session || session.payment_status !== "paid") {
    return { confirmed: false };
  }

  const admin = createSupabaseAdminClient();

  await admin
    .from("bookings")
    .update({ status: "confirmed", confirmed_at: new Date().toISOString() })
    .eq("stripe_session_id", sessionId)
    .eq("status", "pending_payment");

  const bookingResult = await admin
    .from("bookings")
    .select("*")
    .eq("stripe_session_id", sessionId)
    .eq("status", "confirmed")
    .maybeSingle();

  if (!bookingResult.data) {
    return { confirmed: false };
  }

  const teacherResult = await admin
    .from("teachers")
    .select("*")
    .eq("id", bookingResult.data.teacher_id)
    .single();

  if (!teacherResult.data) {
    return { confirmed: false };
  }

  return {
    confirmed: true,
    booking: bookingResult.data,
    teacher: teacherResult.data,
  };
}
