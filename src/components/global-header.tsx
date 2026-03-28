import Link from "next/link";

import { logout } from "@/app/actions/auth";
import { createClient } from "@/lib/supabase/server";

export default async function GlobalHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const navLinkClass =
    "rounded-full px-3 py-2 text-base font-medium transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-teal)]";
  const actionButtonClass =
    "rounded-full px-3 py-2 text-base font-medium transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-teal)]";

  return (
    <header className="sticky top-0 z-50 border-b border-(--color-border-pb) bg-(--color-bg-dark)/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <Link
          href="/"
          className="w-fit text-4xl leading-none sm:text-5xl lg:text-6xl"
          style={{ fontFamily: '"Monofett", "Amatic SC", "Mynerve", cursive' }}
        >
          c0mmunity.dog <span className="text-3xl sm:text-4xl lg:text-5xl">🌭</span>
        </Link>

        <nav
          aria-label="Global"
          className="flex w-full flex-wrap items-center justify-start gap-1 sm:gap-2 lg:w-auto lg:justify-end"
        >
          <Link href="/contact" className={navLinkClass}>
          Contact
          </Link>

          {user ? (
            <>
              <Link href="/dashboard" className={navLinkClass}>
              Dashboard
              </Link>
              <form action={logout} className="m-0">
                <button type="submit" className={actionButtonClass}>
                  Log out
                </button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login" className={navLinkClass}>
                Log in
              </Link>
              <Link href="/signup" className={navLinkClass}>
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
