import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";

/**
 * Handles the OAuth / magic-link / email-confirmation redirect from Supabase.
 * Supabase appends `?code=...` to the callback URL; we exchange it for a
 * session here and then redirect the user to their destination.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // Allow Supabase to pass a custom post-auth destination.
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // On failure, send back to login with a query param so the UI can show a
  // friendly message if desired.
  return NextResponse.redirect(`${origin}/login?error=auth_callback_failed`);
}
