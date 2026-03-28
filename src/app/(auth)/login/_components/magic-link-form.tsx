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
        <h1 role="alert" className="text-lg text-yellow-200 p-1" style={{ fontFamily: '"DM Sans", sans-serif' }}>
           Click below for a magic link.
        </h1>
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
        className="w-full px-4 py-2 my-4 text-4xl rounded-md font-semibold border-2 border-pink-500 transition-colors  hover:text-zinc-950 hover:bg-yellow-100 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Sending magic link…" : "Email the Link"}
      </button>
    </form>
  );
}
