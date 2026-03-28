"use client";

import { useActionState } from "react";

import { login } from "@/app/actions/auth";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <section className="login-form-container flex h-full w-full">

      <div className="px-4 py-4 border-2 border-yellow-300 rounded-md flex flex-1 min-h-0">
        <form action={action} noValidate className="w-full flex flex-col flex-1 gap-5 text-3xl min-h-0">
          <div className="flex flex-row gap-9">
            <div className="w-full flex flex-col flex-1 min-h-0 gap-6">
              <label
                htmlFor="email"
                className="flex items-center gap-4"
              >
                <span className=" text-3xl font-normal">
                  Email
                </span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border px-3 py-2 text-sm text-(--color-text-dark) shadow-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-300/60"
              />
              {state?.errors?.email && (
                <p role="alert" className="text-sm text-rose-700">
                  {state.errors.email}
                </p>
              )}
            </div>
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
                autoComplete="current-password"
                required
                className="block w-full rounded-md border bg-white/90 px-3 py-2 text-sm text-(--color-text-dark) shadow-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-300/60"
              />
            </div>
            {state?.errors?.password && (
              <p role="alert" className="text-3xl text-rose-700">
                {state.errors.password}
              </p>
            )}
         

          {state?.error && (
            <p role="alert" className="text-3xl text-rose-700">
              {state.error}
            </p>
          )}
 <div className="w-full flex flex-row flex-1 min-h-0 gap-6">
          <button
            type="submit"
            disabled={pending}
            className="w-full px-4 py-3 my-6 text-5xl rounded-md font-semibold border-2 border-b-cyan-500 transition-colors  hover:text-zinc-950 hover:bg-yellow-100 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {pending ? "Logging in…" : "Log in"}
          </button>
          </div>
        </form>
      </div>

    </section>


  );
}
