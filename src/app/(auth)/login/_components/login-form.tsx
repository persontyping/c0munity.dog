"use client";

import { useActionState } from "react";

import { login } from "@/app/actions/auth";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

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
          autoComplete="current-password"
          required
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
        {pending ? "Logging in…" : "Log in"}
      </button>
    </form>
  );
}
