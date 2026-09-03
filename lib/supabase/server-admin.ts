import { createClient } from "@supabase/supabase-js";

/**
 * Service-role client — bypasses RLS.
 * ONLY for server-side admin checks. Never import in client components.
 */
export function createSupabaseServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } }
  );
}
