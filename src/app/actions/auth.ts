"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export type AuthFormState =
  | {
      error?: string;
      errors?: {
        email?: string;
        password?: string;
      };
      message?: string;
    }
  | undefined;

// ---------------------------------------------------------------------------
// Login
// ---------------------------------------------------------------------------
export async function login(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const fieldErrors: NonNullable<AuthFormState>["errors"] = {};

  if (!email || !email.includes("@")) {
    fieldErrors.email = "Please enter a valid email address.";
  }
  if (!password) {
    fieldErrors.password = "Password is required.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { errors: fieldErrors };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: "Invalid email or password." };
  }

  redirect("/dashboard");
}

// ---------------------------------------------------------------------------
// Signup
// ---------------------------------------------------------------------------
export async function signup(
  _prevState: AuthFormState,
  formData: FormData,
): Promise<AuthFormState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  const fieldErrors: NonNullable<AuthFormState>["errors"] = {};

  if (!email || !email.includes("@")) {
    fieldErrors.email = "Please enter a valid email address.";
  }
  if (password.length < 8) {
    fieldErrors.password = "Password must be at least 8 characters.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return { errors: fieldErrors };
  }

  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";
  const baseUrl = host ? `${protocol}://${host}` : process.env.NEXT_PUBLIC_SITE_URL;

  if (!baseUrl) {
    return {
      error:
        "Missing host information. Set NEXT_PUBLIC_SITE_URL for email confirmation redirects.",
    };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${baseUrl}/auth/confirm?next=/dashboard`,
    },
  });

  if (error) {
    // Supabase returns this message for already-registered users when
    // email confirmation is enabled.
    if (error.message.toLowerCase().includes("already registered")) {
      return { error: "An account with this email already exists." };
    }
    return { error: error.message };
  }

  return {
    message:
      "Account created. Check your email for a confirmation link before logging in.",
  };
}

// ---------------------------------------------------------------------------
// Logout
// ---------------------------------------------------------------------------
export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
