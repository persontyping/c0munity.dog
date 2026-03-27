"use client";

import { useActionState } from "react";

import { loginWithMagicLink } from "@/app/actions/auth";

export default function MagicLinkForm() {
  const [state, action, pending] = useActionState(loginWithMagicLink, undefined);

  return (
    <form action={action} noValidate>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="magic-email" style={{ display: "block", marginBottom: "0.25rem" }}>
          Email
        </label>
        <input
          id="magic-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          style={{ width: "100%" }}
        />
        {state?.errors?.email && (
          <p role="alert" style={{ color: "red", fontSize: "0.8rem" }}>
            {state.errors.email}
          </p>
        )}
      </div>

      {state?.error && (
        <p role="alert" style={{ color: "red", marginBottom: "1rem" }}>
          {state.error}
        </p>
      )}

      {state?.message && (
        <p role="status" style={{ color: "green", marginBottom: "1rem" }}>
          {state.message}
        </p>
      )}

      <button type="submit" disabled={pending} style={{ width: "100%" }}>
        {pending ? "Sending magic link…" : "Email me a magic link"}
      </button>
    </form>
  );
}
