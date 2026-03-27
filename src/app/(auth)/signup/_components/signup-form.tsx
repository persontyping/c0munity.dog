"use client";

import { useActionState } from "react";

import { signup } from "@/app/actions/auth";

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);

  if (state?.message) {
    return (
      <p role="status" style={{ color: "green" }}>
        {state.message}
      </p>
    );
  }

  return (
    <form action={action} noValidate>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="email" style={{ display: "block", marginBottom: "0.25rem" }}>
          Email
        </label>
        <input
          id="email"
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

      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="password" style={{ display: "block", marginBottom: "0.25rem" }}>
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          style={{ width: "100%" }}
        />
        {state?.errors?.password && (
          <p role="alert" style={{ color: "red", fontSize: "0.8rem" }}>
            {state.errors.password}
          </p>
        )}
      </div>

      {state?.error && (
        <p role="alert" style={{ color: "red", marginBottom: "1rem" }}>
          {state.error}
        </p>
      )}

      <button type="submit" disabled={pending} style={{ width: "100%" }}>
        {pending ? "Creating account…" : "Create account"}
      </button>
    </form>
  );
}
