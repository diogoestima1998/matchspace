import { NextResponse } from "next/server";

import { CHECKOUT_EXPIRY_SECONDS } from "@/lib/constants";
import { computeAmountChf } from "@/lib/pricing";
import { getStripeClient } from "@/lib/stripe";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { bookingRequestSchema } from "@/lib/validation/booking";

export async function POST(request: Request) {
  const body = await request.json().catch(function invalidJson() {
    return null;
  });

  const parsed = bookingRequestSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Please check the booking details and try again.",
      },
      { status: 422 }
    );
  }

  const admin = createSupabaseAdminClient();

  const teacherResult = await admin
    .from("teachers")
    .select("*")
    .eq("id", parsed.data.teacher_id)
    .eq("is_published", true)
    .maybeSingle();

  const teacher = teacherResult.data;

  if (!teacher) {
    return NextResponse.json(
      { success: false, error: "This teacher is not accepting bookings." },
      { status: 404 }
    );
  }

  const amountChf = computeAmountChf({
    hourlyPriceChf: teacher.hourly_price_chf,
    durationMinutes: parsed.data.duration_minutes,
  });

  const bookingResult = await admin
    .from("bookings")
    .insert({
      teacher_id: teacher.id,
      student_name: parsed.data.student_name,
      student_email: parsed.data.student_email,
      requested_start: new Date(parsed.data.requested_start).toISOString(),
      duration_minutes: parsed.data.duration_minutes,
      message: parsed.data.message || null,
      amount_chf: amountChf,
    })
    .select("id")
    .single();

  if (bookingResult.error || !bookingResult.data) {
    console.error("booking insert failed", bookingResult.error);
    return NextResponse.json(
      {
        success: false,
        error: "Could not create the booking. Please try again.",
      },
      { status: 500 }
    );
  }

  const bookingId = bookingResult.data.id;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL!.replace(/\/+$/, "");
  const stripe = getStripeClient();

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: parsed.data.student_email,
      client_reference_id: bookingId,
      metadata: { booking_id: bookingId },
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "chf",
            unit_amount: amountChf * 100,
            product_data: {
              name: `Music lesson with ${teacher.full_name} - ${parsed.data.duration_minutes} min`,
            },
          },
        },
      ],
      success_url: `${appUrl}/booking/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/booking/canceled?teacher=${teacher.slug}`,
      expires_at: Math.floor(Date.now() / 1000) + CHECKOUT_EXPIRY_SECONDS,
    });

    await admin
      .from("bookings")
      .update({ stripe_session_id: session.id })
      .eq("id", bookingId);

    return NextResponse.json({ success: true, data: { url: session.url } });
  } catch (error) {
    console.error("stripe session creation failed", error);
    await admin
      .from("bookings")
      .update({ status: "canceled" })
      .eq("id", bookingId);
    return NextResponse.json(
      {
        success: false,
        error: "Payment could not be initialised. Please try again.",
      },
      { status: 502 }
    );
  }
}
