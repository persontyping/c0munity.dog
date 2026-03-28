"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useActionState } from "react";
import { login } from "@/app/actions/auth";
import MagicLinkForm from "./magic-link-form";

export default function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);
  const [email, setEmail] = useState("");
  const magicLinkContainerRef = useRef<HTMLDivElement>(null);
  const shouldShowMagicLinkForm =
    Boolean(state?.errors?.email) ||
    Boolean(state?.errors?.password) ||
    Boolean(state?.error);

  const openMagicLinkForm = () => {
    requestAnimationFrame(() => {
      magicLinkContainerRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    });
  };

  useEffect(() => {
    if (shouldShowMagicLinkForm) {
      openMagicLinkForm();
    }
  }, [shouldShowMagicLinkForm]);

  return (
    <section>
      <section className="login-form-container flex h-full w-full">
        <div className="px-4 py-4 border-2 border-blue-600 rounded-md flex flex-1 min-h-0">
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
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                style={{ fontFamily: '"DM Sans", sans-serif' }} className="block w-full text-1xl rounded-md border bg-white/90 px-3 py-2 text-(--color-text-dark) shadow-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-300/60"
                />
                {state?.errors?.email && (
                  <h1 className="text-lg text-amber-100 p-1">
                    {state.errors.email}
                  </h1>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col flex-1 min-h-0 gap-6">
              <label
                htmlFor="password">
                <span className="justify-start text-3xl font-normal">
                  <h3 className="text-xl " style={{ fontFamily: '"DM Sans", sans-serif' }}>Password</h3>
                </span>
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                style={{ fontFamily: '"DM Sans", sans-serif' }} className="block w-full text-2xl rounded-md border bg-white/90 px-3 py-2 text-(--color-text-dark) shadow-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-300/60"
              />
            </div>
            {state?.errors?.password && (
              <h1 className="text-3xl text-amber-100 p-1">
                {state.errors.password}
              </h1>
            )}
            {shouldShowMagicLinkForm && (
              <div ref={magicLinkContainerRef} className="flex flex-col gap-4 justify-center items-center">
                {state?.error && (
                  <h1 role="alert" className="text-2xl text-pink-300 p-1" style={{ fontFamily: '"DM Sans", sans-serif' }}>
                    {state.error}
                  </h1>
                )}
                <MagicLinkForm email={email} />
              </div>
            )}
            <div className="w-full flex flex-row flex-1 min-h-0 gap-6">
              <button
                type="submit"
                disabled={pending}
                className="w-full px-4 py-2 my-4 text-5xl rounded-md font-semibold border-2 border-cyan-500 transition-colors  hover:text-zinc-950 hover:bg-yellow-100 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {pending ? "Logging in…" : "Log in"}
              </button>
            </div>
          </form>
        </div>

      </section>
      <h1 className="text-lg text-amber-100 p-1">
        Don&apos;t have an account?{" "}
        <Link href="/signup">Create one</Link>
      </h1>
    </section>

  );
}
