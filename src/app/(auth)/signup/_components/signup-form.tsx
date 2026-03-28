"use client";

import { useActionState } from "react";

import { signup } from "@/app/actions/auth";

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);

  if (state?.message) {
    return (
      <p role="status" className="text-sm font-medium text-emerald-700">
        {state.message}
      </p>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen w-screen border-b-pink-700 rounded-2xl p-4">
       <form action={action} noValidate className="space-y-4">
      <div className="space-y-1">
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-(--color-text-dark)"
        >
          Email
        </label>
        <input
          id="email"
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

      <div className="space-y-1">
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-(--color-text-dark)"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
          className="block w-full rounded-md border border-teal-700/40 bg-white/90 px-3 py-2 text-sm text-(--color-text-dark) shadow-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-300/60"
        />
        {state?.errors?.password && (
          <p role="alert" className="text-sm text-rose-700">
            {state.errors.password}
          </p>
        )}
      </div>

      {state?.error && (
        <p role="alert" className="text-sm text-rose-700">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg outline-orange-600 px-4 py-2   text-white "
      >
        {pending ? "Creating account…" : "Create account"}
      </button>
    </form>
    </div>
   
  );
}
