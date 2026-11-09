import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AbonnementForm from '@/components/student/abonnement-form';

export const metadata = {
  title: "Formules d'Abonnement — Al Muxtaar Doc | Bac S2 Sénégal",
  description: "Débloquez l'accès complet aux cours de Maths et Physique-Chimie Terminale S2, exercices corrigés et simulateurs dès 700 FCFA. Paiement Wave direct.",
  openGraph: {
    title: 'Abonnement Al Muxtaar Doc — Bac S2 Sénégal',
    description: 'Accès complet dès 700 FCFA / mois. Cours conformes au programme officiel sénégalais et paiement Wave direct.',
    type: 'website',
    locale: 'fr_SN',
    images: [
      {
        url: 'https://almuxtaar.vercel.app/assets/apercu-lien-1200x630.jpg',
        secureUrl: 'https://almuxtaar.vercel.app/assets/apercu-lien-1200x630.jpg',
        width: 1200,
        height: 630,
        type: 'image/jpeg',
        alt: 'Formules d Abonnement Al Muxtaar Doc Bac S2',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abonnement Al Muxtaar Doc — Réussir le Bac S2',
    description: 'Accès complet dès 700 FCFA / mois avec paiement Wave direct.',
    images: ['https://almuxtaar.vercel.app/assets/apercu-lien-1200x630.jpg'],
  },
};

export default async function AbonnementPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/connexion');

  // Chargement en parallèle des 3 requêtes (profil, plans, abonnements)
  const [profileResult, plansResult, subsResult] = await Promise.all([
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
      .order('created_at', { ascending: false }),
  ]);

  const profile = profileResult.data;
  const plans = plansResult.data;
  const subs = subsResult.data ?? [];

  const activeSub = subs.find((s) => s.status === 'active') ?? null;
  const pendingSub = subs.find((s) => s.status === 'pending') ?? null;
  const currentSub = activeSub || subs[0] || null;

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
          pendingSub={pendingSub}
          userPhone={profile?.phone ?? ''}
          userName={profile ? `${profile.first_name} ${profile.last_name}` : ''}
        />
      </div>
    </main>
  );
}
