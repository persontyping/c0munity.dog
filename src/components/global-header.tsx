import Link from "next/link";

import { logout } from "@/app/actions/auth";
import { createClient } from "@/lib/supabase/server";

export default async function GlobalHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 header-1 ">
      <div className="mx-auto flex w-full max-w-300 items-center justify-between ">

        <Link
          href="/"
          className="logo text-2xl font-bold">
          c0mmunity.dog<span className="logo-box text-5xl">
            🌭
          </span>
        </Link>

        <nav
          aria-label="Global"
          className="flex items-center gap-2"
        >
          <Link
            href="/"
            className=""
          >
            Home
          </Link>

          {user ? (
            <>
              <p className="hidden ">
                Signed in as <span className="high-1">{user?.email}</span>
              </p>
              <Link
                href="/dashboard">
                Dashboard
              </Link>
              <form action={logout}>
                <button
                  type="submit"
                  className=""
                >
                  Log out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className=""
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className=""
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
