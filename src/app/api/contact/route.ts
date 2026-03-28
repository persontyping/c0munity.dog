import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/admin";

const ALLOWED_INTENTS = new Set(["say-hi", "spill-the-tea"]);

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      intent?: string;
      name?: string;
      email?: string;
      message?: string;
    };

    const intent = body.intent?.trim() ?? "say-hi";
    const name = body.name?.trim();
    const email = body.email?.trim().toLowerCase();
    const message = body.message?.trim();

    if (!ALLOWED_INTENTS.has(intent)) {
      return NextResponse.json(
        { error: "Invalid intent." },
        { status: 400 }
      );
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    const userAgent = req.headers.get("user-agent");
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ipAddress = forwardedFor?.split(",")[0]?.trim() ?? null;

    const { error } = await supabase.from("contact_submissions").insert({
      intent,
      name,
      email,
      message,
      ip_address: ipAddress,
      user_agent: userAgent,
    });

    if (error) {
      console.error("Failed to create contact submission", error);
      return NextResponse.json(
        { error: "Unable to save your message right now." },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Invalid contact request", error);
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }
}
