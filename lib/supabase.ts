import type { SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/** True when Supabase is configured (in Vercel environment variables). */
export const supabaseEnabled = Boolean(url && key);

let client: SupabaseClient | null = null;

/** Loads the Supabase client only when it is configured and actually needed. */
export async function getSupabase(): Promise<SupabaseClient | null> {
  if (!supabaseEnabled) return null;
  if (client) return client;
  const { createClient } = await import("@supabase/supabase-js");
  client = createClient(url!, key!, { auth: { persistSession: false } });
  return client;
}
