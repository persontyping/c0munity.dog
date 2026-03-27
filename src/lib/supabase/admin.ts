import "server-only";

import { createClient } from "@supabase/supabase-js";

import { getSupabaseSecretApiKey } from "./env";

function requireEnv(name: string, value: string | undefined): string {
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export function createAdminClient() {
  const supabaseUrl = requireEnv(
    "NEXT_PUBLIC_SUPABASE_URL",
    process.env.NEXT_PUBLIC_SUPABASE_URL,
  );
  const secretApiKey = getSupabaseSecretApiKey();

  return createClient(supabaseUrl, secretApiKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
