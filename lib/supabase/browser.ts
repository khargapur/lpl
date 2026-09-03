import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/lib/types";

export function createSupabaseBrowserClient() {
  return createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
