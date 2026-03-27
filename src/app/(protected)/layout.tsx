import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

/**
 * Server-side auth guard for all protected routes.
 *
 * The proxy (src/proxy.ts) provides a fast optimistic check, but this layout
 * is the definitive security barrier — it validates the session on the server
 * before rendering any protected content.
 */
export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <>{children}</>;
}
