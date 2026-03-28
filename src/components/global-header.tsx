import Link from "next/link";

import { logout } from "@/app/actions/auth";
import { createClient } from "@/lib/supabase/server";

export default async function GlobalHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky flex top-0 z-50 border-teal-500/60 bg-(--background)/95 backdrop-blur">

      <div className="w-2 h-2"></div>
      <div className="flex-col-reverse flex-9">
        <Link
          href="/"
          className="text-6xl"
          style={{ fontFamily: '"Monofett", "Amatic SC", "Mynerve", cursive' }}
        > c0mmunity.dog <span className="text-5xl">🌭</span></Link>
      </div>

      <nav aria-label="Global" className="flex flex-3 flex-row flex-wrap justify-end items-center gap-5 mr-15 ">
        <Link href="/contact">
          Contact
        </Link>
        {/* If a user is logged in, show their email and dashboard link */}
        {user ? (
          <>
  
              {/* <p className=" font-medium">
                Signed in as <span className="high-1">{user?.email}</span>
              </p> */}


            <Link
              href="/dashboard"

            >
              Dashboard
            </Link>
            <form action={logout} className="m-0">
              <button
                type="submit"
              >
                Log out
              </button>
            </form>

          </>
        ) : (
          <>
            <Link href="/login" >
              Log in
            </Link>
            <Link href="/signup" >
              Sign up
            </Link>
          </>
        )}
        <div className="w-3 h-3"></div>
      </nav>
      {/* </div> */}
    </header>
  );
}
