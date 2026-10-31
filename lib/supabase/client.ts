import { createBrowserClient } from "@supabase/ssr";

/**
 * Crée un client Supabase pour une utilisation côté navigateur (Client Components).
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://rxjiewfsmrcsrkjfqsgq.supabase.co";
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}

