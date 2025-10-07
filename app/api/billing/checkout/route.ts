// app/api/billing/checkout/route.ts
import { NextResponse } from "next/server";

const priceMap: Record<string, string> = {
  pro: process.env.STRIPE_PRICE_PRO || "",
  enterprise: process.env.STRIPE_PRICE_ENTERPRISE || "",
};

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const plan = searchParams.get("plan") || "pro";
    const priceId = priceMap[plan];

    if (!process.env.STRIPE_SECRET_KEY || !priceId) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
    }

    const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const Stripe = (await import("stripe")).default;
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2024-06-20" });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      line_items: [{ price: priceId, quantity: 1 }],
      allow_promotion_codes: true,
      subscription_data: { trial_period_days: 14 },
      success_url: `${base}/dashboard?checkout=success`,
      cancel_url: `${base}/pricing?checkout=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Checkout error" }, { status: 500 });
  }
}
