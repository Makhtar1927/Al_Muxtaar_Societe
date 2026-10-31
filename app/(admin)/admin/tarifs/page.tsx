import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import TarifsManagerClient from '@/components/admin/tarifs-manager-client';

export const metadata = {
  title: 'Gestion des Tarifs — Admin Al Muxtaar',
};

export const dynamic = 'force-dynamic';

export default async function AdminTarifsPage() {
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

  const { data: plans } = await admin
    .from('plans')
    .select('*')
    .order('price');

  return (
    <main className="min-h-screen bg-surface py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-navy">Gestion des Tarifs & Formules</h1>
          <p className="text-text/70 text-sm mt-0.5">
            Modifiez les prix en FCFA et les descriptions des formules d&apos;abonnement Al Muxtaar Doc en temps réel.
          </p>
        </div>

        <TarifsManagerClient initialPlans={plans ?? []} />
      </div>
    </main>
  );
}

