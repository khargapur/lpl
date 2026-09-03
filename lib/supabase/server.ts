import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/types";

/**
 * Server-side Supabase client for use in Server Components,
 * Route Handlers, generateStaticParams, and sitemap.
 * Uses the anon key — RLS policies govern access.
 */
export function createSupabaseServerClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
