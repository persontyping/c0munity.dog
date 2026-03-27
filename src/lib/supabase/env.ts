type RequireEnvOptions = {
  deprecatedName?: string;
};

function requireEnv(
  name: string,
  value: string | undefined,
  options?: RequireEnvOptions,
): string {
  if (!value) {
    if (options?.deprecatedName && process.env[options.deprecatedName]) {
      throw new Error(
        `Environment variable ${options.deprecatedName} is deprecated. ` +
          `Rename it to ${name}.`,
      );
    }

    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export function getSupabaseEnv() {
  return {
    supabaseUrl: requireEnv(
      "NEXT_PUBLIC_SUPABASE_URL",
      process.env.NEXT_PUBLIC_SUPABASE_URL,
    ),
    supabasePublishableKey: requireEnv(
      "NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY",
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
      {
        deprecatedName: "NEXT_PUBLIC_SUPABASE_ANON_KEY",
      },
    ),
  };
}

export function getSupabaseSecretApiKey() {
  return requireEnv(
    "SUPABASE_SECRET_API_KEY",
    process.env.SUPABASE_SECRET_API_KEY,
    {
      deprecatedName: "SUPABASE_SERVICE_ROLE_KEY",
    },
  );
}
