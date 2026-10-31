import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import ElevesManagerClient from '@/components/admin/eleves-manager-client';

export const metadata = {
  title: 'Gestion des élèves — Admin Al Muxtaar',
};

export const dynamic = 'force-dynamic';

export default async function AdminElevesPage() {
  const supabase = createClient();
  const admin = createAdminClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/connexion');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') redirect('/dashboard');

  // Fetch all profiles with their active subscriptions
  const { data: profiles } = await admin
    .from('profiles')
    .select(`
      id, full_name, phone, role, avatar_url, is_banned, created_at,
      subscriptions(id, status, ends_at)
    `)
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen bg-surface py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-navy">Annuaire des Élèves & Utilisateurs</h1>
          <p className="text-text/70 text-sm mt-0.5">
            Consultez les fiches des élèves, gérez les rôles d&apos;accès et suspendez les comptes en cas d&apos;abus.
          </p>
        </div>

        <ElevesManagerClient
          initialProfiles={(profiles ?? []) as unknown as Parameters<typeof ElevesManagerClient>[0]['initialProfiles']}
        />
      </div>
    </main>
  );
}

