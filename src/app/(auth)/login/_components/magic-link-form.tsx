"use client";

import { useActionState } from "react";

import { loginWithMagicLink } from "@/app/actions/auth";

type MagicLinkFormProps = {
  email: string;
};

export default function MagicLinkForm({ email }: MagicLinkFormProps) {
  const [state, action, pending] = useActionState(loginWithMagicLink, undefined);

  return (
    <form action={action} noValidate className="space-y-4">
      <input name="email" type="hidden" value={email} readOnly />

      <div className="space-y-1">
        <p className="text-sm text-(--color-text-secondary)">
          We will send a magic link to the email address entered above.
        </p>
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
