import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getInfluencerByCode,
  getInfluencerByAccessKey,
  getInfluencerMonthlyStats,
} from '@/lib/influencers/service';
import InfluencerDashboardClient from '@/components/influencer/influencer-dashboard-client';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface Props {
  params: {
    code: string;
  };
}

async function resolveParamCode(params: any): Promise<string> {
  const p = await Promise.resolve(params);
  if (!p?.code) return '';
  try {
    return decodeURIComponent(p.code).trim();
  } catch {
    return String(p.code).trim();
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const code = await resolveParamCode(params);
  const influencer = code
    ? (await getInfluencerByCode(code)) || (await getInfluencerByAccessKey(code))
    : null;

  const partnerName = influencer?.full_name || 'Partenaire Officiel';
  const promoCode = influencer?.promo_code || code;

  return {
    title: influencer
      ? `Espace Partenaire • ${partnerName} (Code : ${promoCode}) | Al Muxtaar Doc`
      : 'Espace Partenaire & Ambassadeur | Al Muxtaar Doc',
    description: `Recommandé par ${partnerName} : Révisez et réussissez le Bac S2 avec Al Muxtaar Doc. Utilisez le code promo exclusif ${promoCode} dès 700 FCFA.`,
    openGraph: {
      title: `Espace Partenaire • ${partnerName} | Al Muxtaar Doc`,
      description: `Recommandé par ${partnerName} : Révisez et réussissez avec Al Muxtaar Doc (Code Promo : ${promoCode}). Formules dès 700 FCFA.`,
      type: 'website',
      locale: 'fr_SN',
      images: [
        {
          url: 'https://almuxtaar.vercel.app/assets/apercu-lien-1200x630.jpg',
          secureUrl: 'https://almuxtaar.vercel.app/assets/apercu-lien-1200x630.jpg',
          width: 1200,
          height: 630,
          type: 'image/jpeg',
          alt: `Espace Partenaire ${partnerName} — Al Muxtaar`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Espace Partenaire • ${partnerName} | Al Muxtaar Doc`,
      description: `Code promo exclusif ${promoCode} pour réviser avec Al Muxtaar Doc au Sénégal.`,
      images: ['https://almuxtaar.vercel.app/assets/apercu-lien-1200x630.jpg'],
    },
  };
}

export default async function InfluencerCodePage({ params }: Props) {
  const code = await resolveParamCode(params);
  if (!code) {
    notFound();
  }

  const influencer = (await getInfluencerByCode(code)) || (await getInfluencerByAccessKey(code));

  if (!influencer) {
    notFound();
  }

  const stats = await getInfluencerMonthlyStats(influencer);

  return (
    <main className="min-h-screen bg-surface py-5 sm:py-8 md:py-10 px-3 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <InfluencerDashboardClient
          influencer={stats.influencer}
          currentMonthPayout={stats.currentMonthPayout}
          historyPayouts={stats.historyPayouts}
          totalAllTimeFCFA={stats.totalAllTimeFCFA}
          totalAllTimeSubs={stats.totalAllTimeSubs}
          recentAffiliations={stats.recentAffiliations}
        />
      </div>
    </main>
  );
}

