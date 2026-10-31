import { createClient as createSupabaseClient } from "@supabase/supabase-js";

/**
 * Crée un client avec les privilèges Service Role (Bypass RLS).
 * À utiliser EXCLUSIVEMENT côté serveur pour des opérations d'administration.
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

  if (!serviceRoleKey) {
    throw new Error("SUPABASE_SERVICE_ROLE_KEY is not defined in environment variables.");
  }

  return createSupabaseClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

