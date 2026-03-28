import Link from "next/link";

import { logout } from "@/app/actions/auth";
import { createClient } from "@/lib/supabase/server";

export default async function GlobalHeader() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky flex top-0 z-50 border-teal-500/60 bg-(--background)/95 backdrop-blur m-7">

      <div className="w-2 h-2"></div>
      <div className="flex-col-reverse flex-6 ">
        <Link
          href="/"
          className="text-7xl"
          style={{ fontFamily: '"Monofett", "Amatic SC", "Mynerve", cursive' }}
        > c0mmunity.dog <span className="text-5xl">🌭</span></Link>
      </div>

      <nav aria-label="Global" className="flex flex-8 flex-row flex-wrap justify-end items-center gap-5 mr-15 ">
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
                className="rounded-md border border-pink-600 px-3 py-2 text-sm font-semibold text-pink-700 transition-colors hover:bg-pink-50"
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
