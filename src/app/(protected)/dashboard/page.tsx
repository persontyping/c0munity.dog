import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/actions/auth";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-lvh flex flex-row flex-wrap justify-center items-center border-amber-100 border-2 rounded gap-4  ">
      <div className="h-60 w-60 border-amber-400 rounded">
        <h1>Dashboard</h1>
        <p>
          Signed in as <span className="high-1">{user?.email}</span>
        </p>
        <form action={logout} className="mt-4">
          <button
            type="submit"

          >
            Log out
          </button>
        </form>
      </div>

    </div>

  );
}
