"use client";
import Link from "next/link";


import { useActionState } from "react";

import { signup } from "@/app/actions/auth";

export default function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);

  if (state?.message) {
    return (
      <p role="status" className=" text-green-400">
        {state.message}
      </p>
    );
  }
  return (
    <section >
       <h1 className="text-lg text-amber-100 p-1">Create an account</h1>
      <section className="signup-form-container flex flex-col h-full w-full">
       
        <div className="px-4 py-4 border-2 border-b-blue-700 rounded flex flex-col flex-1 min-h-0">
          <form action={action} noValidate className="space-y-4">
            <div className="w-full shrink-0">
              <label className="signup-label text-3xl leading-7">
                Email*
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border border-orange-700 bg-white/90 px-3 py-2 text-sm text-(--color-text-dark) shadow-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-300/60"
              />
              {state?.errors?.email && (
                <p role="alert" className="text-3xl text-rose-400">
                  {state.errors.email}
                </p>
              )}
            </div>

            <div className="w-full flex flex-col flex-1 min-h-0 gap-6">
              <label
                htmlFor="password">
                <span className="justify-start text-3xl font-normal">
                  Password
                </span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                className="block w-full rounded-md border border-purple-700/40 bg-white/90 px-3 py-2 text-sm text-(--color-text-dark) shadow-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-300/60"
              />
              {state?.errors?.password && (
                <p role="alert" className="text-3xl text-rose-400">
                  {state.errors.password}
                </p>
              )}
            </div>

            {state?.error && (
              <p role="alert" className="text-3xl text-rose-400">
                {state.error}
              </p>
            )}
            <div className="w-full flex flex-row flex-1 min-h-0 gap-6">

              <button
                type="submit"
                disabled={pending}
                className="w-full px-4 py-4 my-9 text-5xl rounded-md font-semibold border-2 border-b-cyan-500 transition-colors hover:text-zinc-950 hover:bg-yellow-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {pending ? "Creating account…" : "Create account"}
              </button>
            </div>
          </form>
        </div>
      </section>
        <h1 className="text-lg text-amber-100 p-1">
        Already have an account?{" "}
        <Link href="/login">Log in</Link>
      </h1>
    </section>
  );

}
