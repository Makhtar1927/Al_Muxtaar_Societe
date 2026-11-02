import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AbonnementForm from '@/components/student/abonnement-form';

export const metadata = {
  title: 'Mon Abonnement — Al Muxtaar Société',
  description: 'Choisissez votre formule et activez votre accès via paiement Wave officiel.',
};

export default async function AbonnementPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/connexion');

  // Chargement en parallèle des 3 requêtes (profil, plans, abonnement)
  const [profileResult, plansResult, currentSubResult] = await Promise.all([
    supabase
      .from('profiles')
      .select('first_name, last_name, phone')
      .eq('id', user.id)
      .single(),
    supabase
      .from('plans')
      .select('id, name, price_fcfa, duration_days')
      .eq('is_active', true)
      .order('price_fcfa'),
    supabase
      .from('subscriptions')
      .select('id, status, start_date, end_date, plans(name, price_fcfa, duration_days)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  const profile = profileResult.data;
  const plans = plansResult.data;
  const currentSub = currentSubResult.data;

  return (
    <main className="min-h-screen bg-surface py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-black text-navy">Formules d&apos;Abonnement</h1>
          <p className="text-sm text-navy-light mt-1">
            Débloquez l&apos;accès complet aux leçons, exercices résolus et quiz du Baccalauréat.
          </p>
        </div>

        <AbonnementForm
          plans={plans ?? []}
          currentSub={currentSub}
          userPhone={profile?.phone ?? ''}
          userName={profile ? `${profile.first_name} ${profile.last_name}` : ''}
        />
      </div>
    </main>
  );
}
