import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getAllInfluencers, getInfluencerMonthlyStats } from '@/lib/influencers/service';
import InfluenceursManagerClient from '@/components/admin/influenceurs-manager-client';
import fs from 'fs';
import path from 'path';

export const metadata = {
  title: 'Gestion des Influenceurs & Affiliations — Admin Al Muxtaar',
};

export const dynamic = 'force-dynamic';

export default async function AdminInfluenceursPage() {
  const supabase = createClient();

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

  const influencers = await getAllInfluencers();

  // Charger les règlements mensuels : Supabase en priorité pour persistance Vercel
  let payouts: any[] = [];
  try {
    const admin = createAdminClient();
    const { data: dbPayouts, error: pErr } = await admin
      .from('influencer_payouts')
      .select('*')
      .order('period_month', { ascending: false });

    if (!pErr && dbPayouts && dbPayouts.length > 0) {
      payouts = dbPayouts;
    }
  } catch (e) {
    console.warn('Erreur chargement Supabase influencer_payouts:', e);
  }

  // Fallback store local si base vide
  if (payouts.length === 0) {
    try {
      const storePath = path.join(process.cwd(), 'data', 'influencers-store.json');
      if (fs.existsSync(storePath)) {
        const parsed = JSON.parse(fs.readFileSync(storePath, 'utf8'));
        payouts = parsed.payouts || [];
      }
    } catch (e) {
      payouts = [];
    }
  }

  return (
    <main className="min-h-screen bg-surface py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <span className="text-xs font-bold text-turquoise uppercase tracking-wider">
            Programme Partenaires Officiels
          </span>
          <h1 className="text-2xl font-bold text-navy mt-0.5">
            Influenceurs, Ambassadeurs &amp; Codes Promo
          </h1>
          <p className="text-text/70 text-sm mt-0.5">
            Suivi des parrainages d&apos;élèves, attribution des commissions (150 FCFA / abonnement validé) et validation des versements mensuels Wave.
          </p>
        </div>

        <InfluenceursManagerClient
          initialInfluencers={influencers}
          initialPayouts={payouts}
        />
      </div>
    </main>
  );
}

