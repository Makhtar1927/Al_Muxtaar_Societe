import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  getInfluencerByCode,
  getInfluencerByAccessKey,
  getInfluencerMonthlyStats,
} from '@/lib/influencers/service';
import InfluencerDashboardClient from '@/components/influencer/influencer-dashboard-client';

export const dynamic = 'force-dynamic';

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

  return {
    title: influencer
      ? `Espace Influenceur • ${influencer.full_name} | Al Muxtaar Société`
      : 'Espace Influenceur | Al Muxtaar Société',
    description: 'Suivi des commissions de parrainage et relevés mensuels Al Muxtaar.',
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
    <main className="min-h-screen bg-surface py-8 px-4 sm:px-6">
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

