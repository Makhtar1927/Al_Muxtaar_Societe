import { createClient as createServerClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AbonnementForm from '@/components/student/abonnement-form';

export const metadata = {
  title: 'Mon Abonnement — Al Muxtaar',
  description: 'Choisissez votre plan et soumettez votre paiement Wave / Orange Money.',
};

export default async function AbonnementPage() {
  const supabase = createServerClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/connexion');

  // Fetch plans
  const { data: plans } = await supabase
    .from('plans')
    .select('id, name, price, duration_months, description')
    .eq('is_active', true)
    .order('price');

  // Fetch current subscription
  const { data: currentSub } = await supabase
    .from('subscriptions')
    .select('id, status, starts_at, ends_at, plans(name, price, duration_months)')
    .eq('student_id', user.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  return (
    <main className="min-h-screen bg-surface py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-navy mb-2">Mon Abonnement</h1>
        <p className="text-text/70 mb-8">
          Accède à tout le contenu pédagogique en souscrivant à un plan.
        </p>

        <AbonnementForm
          plans={plans ?? []}
          currentSub={currentSub as Parameters<typeof AbonnementForm>[0]['currentSub']}
        />
      </div>
    </main>
  );
}

