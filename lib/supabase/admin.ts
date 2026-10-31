import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Crée un client avec les privilèges Service Role (Bypass RLS).
 * À utiliser EXCLUSIVEMENT côté serveur pour des opérations d'administration.
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://rxjiewfsmrcsrkjfqsgq.supabase.co";
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "placeholder-key";

  return createSupabaseClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

