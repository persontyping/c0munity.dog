"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

import { getSupabaseEnv } from "./env";

let browserClient: SupabaseClient | undefined;

export function createClient() {
  if (!browserClient) {
    const { supabaseUrl, supabasePublishableKey } = getSupabaseEnv();

    browserClient = createBrowserClient(supabaseUrl, supabasePublishableKey);
  }

  return browserClient;
}
