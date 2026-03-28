import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      name?: string;
      email?: string;
      message?: string;
    };

    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Placeholder handler. Replace with email provider or DB write.
    console.log("Contact form submission", {
      name,
      email,
      message,
      receivedAt: new Date().toISOString(),
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }
}
