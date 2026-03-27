import Link from "next/link";

import { logout } from "@/app/actions/auth";
import { createClient } from "@/lib/supabase/server";

export default async function GlobalHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        borderBottom: "1px solid color-mix(in oklab, currentColor 18%, transparent)",
        backdropFilter: "blur(8px)",
        background: "color-mix(in oklab, var(--background) 92%, transparent)",
      }}
    >
      <div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          padding: "0.9rem 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "1rem",
        }}
      >
        <Link href="/" style={{ fontWeight: 700, letterSpacing: "0.02em" }}>
          community.dog
        </Link>

        <nav
          aria-label="Global"
          style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
        >
          <Link href="/">Home</Link>

          {user ? (
            <>
              <Link href="/dashboard">Dashboard</Link>
              <form action={logout}>
                <button type="submit">Log out</button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login">Log in</Link>
              <Link href="/signup">Sign up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
