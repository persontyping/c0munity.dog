"use client";

import { useActionState } from "react";

import { loginWithMagicLink } from "@/app/actions/auth";

export default function MagicLinkForm() {
  const [state, action, pending] = useActionState(loginWithMagicLink, undefined);

  return (
    <form action={action} noValidate className="space-y-4">
      <div className="space-y-1">
        <label
          htmlFor="magic-email"
          className="block text-sm font-semibold text-(--color-text-dark)"
        >
          Email
        </label>
        <input
          id="magic-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="block w-full rounded-md border border-teal-700/40 bg-white/90 px-3 py-2 text-sm text-(--color-text-dark) shadow-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-300/60"
        />
        {state?.errors?.email && (
          <p role="alert" className="text-sm text-rose-700">
            {state.errors.email}
          </p>
        )}
      </div>

      {state?.error && (
        <p role="alert" className="text-sm text-rose-700">
          {state.error}
        </p>
      )}

      {state?.message && (
        <p role="status" className="text-sm text-emerald-700">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-md bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-teal-600 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Sending magic link…" : "Email me a magic link"}
      </button>
    </form>
  );
}
