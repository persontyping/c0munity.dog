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
        zIndex: 50
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
        <Link href="/" >
          c0mmunity.dog 🌭
        </Link>

        <nav
          aria-label="Global"
          style={{ display: "flex", alignItems: "left", gap: "0.75rem", border: "solid 1px blue" }}
        >
          <Link href="/">Home</Link>

          {user ? (
            <>
              <p>Signed in as <strong>{user?.email}</strong></p>
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
