import { createClient } from "@/lib/supabase/server";
import { logout } from "@/app/actions/auth";

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      <p>
        Signed in as <strong>{user?.email}</strong>
      </p>
      <form action={logout} style={{ marginTop: "1rem" }}>
        <button type="submit">Log out</button>
      </form>
    </main>
  );
}
