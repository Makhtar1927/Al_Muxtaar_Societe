import { createClient as createServerClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { redirect } from 'next/navigation';
import AdminAbonnementsClient from '@/components/admin/abonnements-client';

export const metadata = {
  title: 'Abonnements — Admin Al Muxtaar',
};

export const dynamic = 'force-dynamic';

export default async function AdminAbonnementsPage() {
  const supabase = createServerClient();
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

  // Fetch all subscriptions with related data
  const { data: subscriptions } = await admin
    .from('subscriptions')
    .select(
      `id, status, start_date, end_date, created_at,
       user_id,
       profiles!user_id(first_name, last_name, phone, avatar),
       plans(name, price_fcfa, duration_days),
       payments(id, provider, transaction_code, proof_image_url, status, notes, reviewed_at)`
    )
    .order('created_at', { ascending: false })
    .limit(200);

  return (
    <main className="min-h-screen bg-surface py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-navy mb-2">Gestion des abonnements</h1>
        <p className="text-text/70 mb-8">
          Activez, rejetez ou prolongez les abonnements des élèves.
        </p>
        <AdminAbonnementsClient subscriptions={(subscriptions ?? []) as unknown as Parameters<typeof AdminAbonnementsClient>[0]['subscriptions']} />
      </div>
    </main>
  );
}
