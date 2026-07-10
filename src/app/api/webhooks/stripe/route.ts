import { NextResponse } from "next/server";

import { confirmBooking } from "@/lib/bookings";
import { getStripeClient } from "@/lib/stripe";

export async function POST(request: Request) {
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { success: false, error: "Missing signature" },
      { status: 400 },
    );
  }

  const rawBody = await request.text();
  const stripe = getStripeClient();

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (error) {
    console.error("stripe webhook signature verification failed", error);
    return NextResponse.json(
      { success: false, error: "Invalid signature" },
      { status: 400 },
    );
  }

  if (event.type === "checkout.session.completed") {
    await confirmBooking({ sessionId: event.data.object.id });
  }

  return NextResponse.json({ success: true, data: { received: true } });
}
