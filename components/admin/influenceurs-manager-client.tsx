'use client';

import React, { useState, useTransition, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { useToast } from '@/components/ui/toast';
import { Pagination } from '@/components/ui/pagination';
import { createInfluencerAction, markPayoutPaidAction } from '@/lib/influencers/actions';
import {
  Copy,
  CheckCircle2,
  Plus,
  Clock,
  Sparkles,
  ExternalLink,
  DollarSign,
  TrendingUp,
  UserCheck,
  Search,
  Phone,
  Calendar,
  Share2,
} from 'lucide-react';
import { WaveLogo } from '@/components/ui/icons/wave-logo';
import type { Influencer, InfluencerPayout } from '@/lib/influencers/service';

interface Props {
  initialInfluencers: Influencer[];
  initialPayouts: InfluencerPayout[];
}

function formatFCFA(n: number) {
  return n.toLocaleString('fr-FR') + ' FCFA';
}

function formatMonthLabel(monthStr: string) {
  const [year, month] = monthStr.split('-');
  const date = new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1);
  return date.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
}

function formatDate(iso: string | null | undefined) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Nettoie les notes pour ne pas afficher le payload technique JSON __STATS__{...}
 */
function getCleanNotes(notes?: string | null): string {
  if (!notes) return '';
  const clean = notes.replace(/__STATS__\{[\s\S]*\}$/, '').trim();
  return clean;
}

export default function InfluenceursManagerClient({ initialInfluencers, initialPayouts }: Props) {
  const { showToast } = useToast();
  const [influencers, setInfluencers] = useState<Influencer[]>(initialInfluencers);
  const [payouts, setPayouts] = useState<InfluencerPayout[]>(initialPayouts);

  const [isPending, startTransition] = useTransition();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [payingPayout, setPayingPayout] = useState<InfluencerPayout | null>(null);
  const [paymentRef, setPaymentRef] = useState('');
  const [paymentNote, setPaymentNote] = useState('');

  // Search & Pagination for Influencers
  const [searchInfluencer, setSearchInfluencer] = useState('');
  const [infPage, setInfPage] = useState(1);
  const [infPageSize, setInfPageSize] = useState(10);

  // Search & Pagination for Payouts
  const [searchPayout, setSearchPayout] = useState('');
  const [payoutPage, setPayoutPage] = useState(1);
  const [payoutPageSize, setPayoutPageSize] = useState(10);

  // Form states for new influencer
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [notes, setNotes] = useState('');

  // Metrics
  const currentMonth = new Date().toISOString().slice(0, 7);
  let totalCommissionsAllTime = 0;
  let totalCommissionsThisMonth = 0;
  let totalSubsThisMonth = 0;

  payouts.forEach((p) => {
    totalCommissionsAllTime += p.total_commission_fcfa;
    if (p.period_month === currentMonth) {
      totalCommissionsThisMonth += p.total_commission_fcfa;
      totalSubsThisMonth += p.validated_subscriptions_count;
    }
  });

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://almuxtaar.vercel.app';

  function copyText(text: string, label: string) {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text);
      showToast(`${label} copié dans le presse-papiers !`, 'success');
    }
  }

  // Filtered & Paginated Influencers
  const filteredInfluencers = useMemo(() => {
    const q = searchInfluencer.trim().toLowerCase();
    if (!q) return influencers;
    return influencers.filter(
      (inf) =>
        inf.full_name?.toLowerCase().includes(q) ||
        inf.promo_code?.toLowerCase().includes(q) ||
        inf.phone?.toLowerCase().includes(q) ||
        getCleanNotes(inf.notes).toLowerCase().includes(q)
    );
  }, [influencers, searchInfluencer]);

  const paginatedInfluencers = useMemo(() => {
    const start = (infPage - 1) * infPageSize;
    return filteredInfluencers.slice(start, start + infPageSize);
  }, [filteredInfluencers, infPage, infPageSize]);

  // Filtered & Paginated Payouts
  const filteredPayouts = useMemo(() => {
    const q = searchPayout.trim().toLowerCase();
    if (!q) return payouts;
    return payouts.filter((p) => {
      const inf = influencers.find((i) => i.id === p.influencer_id);
      return (
        p.period_month?.toLowerCase().includes(q) ||
        formatMonthLabel(p.period_month).toLowerCase().includes(q) ||
        p.payment_reference?.toLowerCase().includes(q) ||
        inf?.full_name?.toLowerCase().includes(q) ||
        inf?.phone?.toLowerCase().includes(q)
      );
    });
  }, [payouts, searchPayout, influencers]);

  const paginatedPayouts = useMemo(() => {
    const start = (payoutPage - 1) * payoutPageSize;
    return filteredPayouts.slice(start, start + payoutPageSize);
  }, [filteredPayouts, payoutPage, payoutPageSize]);

  function handleCreateInfluencer(e: React.FormEvent) {
    e.preventDefault();
    startTransition(async () => {
      const fd = new FormData();
      fd.append('fullName', fullName);
      fd.append('phone', phone);
      fd.append('promoCode', promoCode);
      fd.append('notes', notes);

      const res = await createInfluencerAction(fd);
      if (res.success) {
        if (res.data) {
          setInfluencers((prev) => [res.data, ...prev]);
        }
        setIsCreateModalOpen(false);
        setFullName('');
        setPhone('');
        setPromoCode('');
        setNotes('');
        showToast(res.message || 'Influenceur créé avec succès !', 'success');
      } else {
        showToast(res.error, 'error');
      }
    });
  }

  function handleMarkPaid(e: React.FormEvent) {
    e.preventDefault();
    if (!payingPayout) return;

    startTransition(async () => {
      const fd = new FormData();
      fd.append('payoutId', payingPayout.id);
      fd.append('paymentReference', paymentRef);
      fd.append('notes', paymentNote);

      const res = await markPayoutPaidAction(fd);
      if (res.success) {
        setPayouts((prev) =>
          prev.map((p) =>
            p.id === payingPayout.id
              ? {
                  ...p,
                  status: 'paid',
                  paid_at: new Date().toISOString(),
                  payment_reference: paymentRef || `WAVE-${Date.now()}`,
                  notes: paymentNote,
                }
              : p
          )
        );
        setPayingPayout(null);
        setPaymentRef('');
        setPaymentNote('');
        showToast(res.message || 'Versement enregistré avec succès !', 'success');
      } else {
        showToast(res.error, 'error');
      }
    });
  }

  return (
    <div className="space-y-6">
      {/* KPI Cards — Fully Responsive Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="rounded-2xl border border-navy/10 bg-white p-3.5 sm:p-4 shadow-sm min-w-0">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-navy/60 block truncate">
            Influenceurs Actifs
          </span>
          <p className="text-xl sm:text-3xl font-black text-navy mt-1">
            {influencers.length}
          </p>
          <p className="text-[11px] text-text/60 mt-0.5 truncate">Codes promo en circulation</p>
        </div>

        <div className="rounded-2xl border border-amber-300 bg-amber-50/80 p-3.5 sm:p-4 shadow-sm min-w-0">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-amber-900 block truncate">
            Souscriptions ce mois
          </span>
          <p className="text-xl sm:text-3xl font-black text-amber-950 mt-1">
            {totalSubsThisMonth}
          </p>
          <span className="text-[10px] text-amber-800 font-semibold inline-block mt-0.5 truncate">
            Validées par l&apos;admin
          </span>
        </div>

        <div className="rounded-2xl border border-emerald-300 bg-emerald-50/80 p-3.5 sm:p-4 shadow-sm min-w-0">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-emerald-900 block truncate">
            Commissions du mois
          </span>
          <p className="text-lg sm:text-2xl font-black text-emerald-800 mt-1 truncate">
            {formatFCFA(totalCommissionsThisMonth)}
          </p>
          <p className="text-[10px] text-emerald-700 mt-0.5 truncate">150 F (700) • 400 F (2000) • 500 F (5000)</p>
        </div>

        <div className="rounded-2xl border border-navy/10 bg-white p-3.5 sm:p-4 shadow-sm min-w-0">
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-navy/60 block truncate">
            Total Cumulé Réglé
          </span>
          <p className="text-lg sm:text-2xl font-black text-navy mt-1 truncate">
            {formatFCFA(totalCommissionsAllTime)}
          </p>
          <p className="text-[11px] text-text/60 mt-0.5 truncate">Historique garanti</p>
        </div>
      </div>

      {/* Header bar with New Influencer button */}
      <div className="bg-white rounded-2xl border border-navy/10 p-4 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-navy">Gestion des Partenaires &amp; Codes Promo</h2>
          <p className="text-xs text-text/60 mt-0.5">
            Attribuez des codes promo uniques et suivez les règlements mensuels Wave.
          </p>
        </div>

        <Button
          size="sm"
          className="bg-navy hover:bg-navy/90 text-white font-bold text-xs flex items-center justify-center gap-1.5 shrink-0 py-2.5 sm:py-2"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau Partenaire</span>
        </Button>
      </div>

      {/* Search Bar for Influencers */}
      <div className="bg-white rounded-2xl border border-navy/10 p-3 sm:p-4 shadow-sm flex items-center gap-2">
        <Search className="w-4 h-4 text-text/40 shrink-0 ml-1" />
        <Input
          placeholder="Rechercher par nom, code promo, téléphone (+221)..."
          value={searchInfluencer}
          onChange={(e) => {
            setSearchInfluencer(e.target.value);
            setInfPage(1);
          }}
          className="border-0 shadow-none focus-visible:ring-0 p-0 text-xs sm:text-sm h-auto placeholder:text-text/40"
        />
        {searchInfluencer && (
          <button
            type="button"
            onClick={() => {
              setSearchInfluencer('');
              setInfPage(1);
            }}
            className="text-xs text-text/40 hover:text-navy px-2 py-1 font-semibold"
          >
            Effacer
          </button>
        )}
      </div>

      {/* Influencers Section: Table on Desktop, Cards on Mobile */}
      <div className="bg-white rounded-2xl border border-navy/10 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-navy/10 flex items-center justify-between">
          <h3 className="font-bold text-navy text-sm uppercase tracking-wider">
            Liste des Influenceurs Enregistrés ({filteredInfluencers.length})
          </h3>
        </div>

        {/* 1. Mobile Cards (< md) */}
        <div className="block md:hidden divide-y divide-navy/5">
          {paginatedInfluencers.length === 0 ? (
            <div className="p-8 text-center text-text/50 text-xs">
              Aucun influenceur ne correspond à votre recherche.
            </div>
          ) : (
            paginatedInfluencers.map((inf) => {
              const dashboardUrl = `${origin}/influenceur/${inf.promo_code}`;
              const cleanNotes = getCleanNotes(inf.notes);

              return (
                <div key={inf.id} className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-bold text-navy text-sm">{inf.full_name}</h4>
                      {cleanNotes ? (
                        <p className="text-[11px] text-text/60 mt-0.5">{cleanNotes}</p>
                      ) : null}
                    </div>
                    <span className="bg-navy/5 border border-navy/10 px-2 py-1 rounded-lg font-mono font-black text-xs text-navy shrink-0">
                      {inf.promo_code}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="flex items-center gap-1 font-mono text-text/70 bg-surface px-2 py-0.5 rounded-md border border-navy/5">
                      <Phone className="w-3 h-3 text-text/40" />
                      {inf.phone}
                    </span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-md">
                      150 F (700 F) • 400 F (2000 F) • 500 F (5000 F)
                    </span>
                  </div>

                  {/* Mobile Action Buttons */}
                  <div className="pt-1 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => copyText(dashboardUrl, "Lien dashboard")}
                      className="flex-1 py-1.5 px-2.5 rounded-lg border border-turquoise/30 bg-turquoise/5 hover:bg-turquoise/15 text-turquoise font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copier Dashboard</span>
                    </button>

                    <a
                      href={dashboardUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg border border-navy/10 text-text/60 hover:text-navy flex items-center justify-center transition-colors"
                      title="Ouvrir le dashboard de cet influenceur"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>

                    <button
                      type="button"
                      onClick={() =>
                        copyText(`${origin}/abonnement?code=${inf.promo_code}`, "Lien parrainage élève")
                      }
                      className="w-full py-1.5 px-2.5 rounded-lg border border-navy/15 hover:bg-navy/5 text-navy font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Copier Lien Parrainage Élève</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* 2. Desktop Table (>= md) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-surface border-b border-navy/10 text-xs text-text/60 uppercase">
              <tr>
                <th className="px-5 py-3.5">Influenceur / Nom</th>
                <th className="px-5 py-3.5">Code Promo</th>
                <th className="px-5 py-3.5">Téléphone Wave</th>
                <th className="px-5 py-3.5">Commission</th>
                <th className="px-5 py-3.5">Lien d&apos;Accès Dashboard</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5">
              {paginatedInfluencers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-text/50">
                    Aucun influenceur trouvé pour cette recherche.
                  </td>
                </tr>
              ) : (
                paginatedInfluencers.map((inf) => {
                  const dashboardUrl = `${origin}/influenceur/${inf.promo_code}`;
                  const cleanNotes = getCleanNotes(inf.notes);

                  return (
                    <tr key={inf.id} className="hover:bg-surface/40 transition-colors">
                      <td className="px-5 py-3.5 font-bold text-navy">
                        <div>
                          <span>{inf.full_name}</span>
                          {cleanNotes ? (
                            <span className="block text-[11px] text-text/50 font-normal">
                              {cleanNotes}
                            </span>
                          ) : null}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 font-mono font-black text-navy text-sm">
                        <span className="bg-navy/5 border border-navy/10 px-2 py-0.5 rounded-lg">
                          {inf.promo_code}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 font-mono text-xs">{inf.phone}</td>
                      <td className="px-5 py-3.5 font-bold text-emerald-700">
                        150 F (700 F) • 400 F (2000 F) • 500 F (5000 F)
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => copyText(dashboardUrl, "Lien dashboard")}
                            className="inline-flex items-center gap-1 text-[11px] font-semibold text-turquoise hover:underline"
                          >
                            <Copy className="w-3 h-3" />
                            <span>Copier le lien</span>
                          </button>
                          <a
                            href={dashboardUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text/40 hover:text-navy"
                            title="Ouvrir le dashboard de cet influenceur"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs"
                          onClick={() => copyText(`${origin}/abonnement?code=${inf.promo_code}`, "Lien parrainage élève")}
                        >
                          Lien Parrainage Élève
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Influencers */}
        {filteredInfluencers.length > 0 && (
          <div className="p-3 border-t border-navy/10">
            <Pagination
              currentPage={infPage}
              totalItems={filteredInfluencers.length}
              pageSize={infPageSize}
              onPageChange={setInfPage}
              onPageSizeChange={setInfPageSize}
              itemLabel="partenaires"
            />
          </div>
        )}
      </div>

      {/* Monthly Payouts Section: Table on Desktop, Cards on Mobile */}
      <div className="bg-white rounded-2xl border border-navy/10 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-navy/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-navy text-sm uppercase tracking-wider">
              Historique des Synthèses Mensuelles &amp; Versements Wave ({filteredPayouts.length})
            </h3>
            <p className="text-xs text-text/60 mt-0.5">
              Toutes les périodes sont conservées intactes et consultables à tout moment.
            </p>
          </div>

          <div className="w-full sm:w-64">
            <Input
              placeholder="Filtrer par mois, réf. Wave..."
              value={searchPayout}
              onChange={(e) => {
                setSearchPayout(e.target.value);
                setPayoutPage(1);
              }}
              className="text-xs py-1.5 h-8"
            />
          </div>
        </div>

        {/* Mobile Payouts (< md) */}
        <div className="block md:hidden divide-y divide-navy/5">
          {paginatedPayouts.length === 0 ? (
            <div className="p-8 text-center text-text/50 text-xs">
              Aucun versement trouvé.
            </div>
          ) : (
            paginatedPayouts.map((p) => {
              const inf = influencers.find((i) => i.id === p.influencer_id);

              return (
                <div key={p.id} className="p-4 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-navy text-sm capitalize">
                      {formatMonthLabel(p.period_month)}
                    </span>
                    <span className="font-black text-emerald-700 text-sm">
                      {formatFCFA(p.total_commission_fcfa)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-text/70">
                    <span>
                      {inf?.full_name || 'Partenaire'} ({inf?.phone || '—'})
                    </span>
                    <span className="font-semibold text-navy">
                      {p.validated_subscriptions_count} abonnement{p.validated_subscriptions_count > 1 ? 's' : ''}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div>
                      {p.status === 'paid' ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          Versé par Wave
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300 animate-pulse">
                          <Clock className="w-3.5 h-3.5 text-amber-600" />
                          En cours / À verser
                        </span>
                      )}
                    </div>

                    <div>
                      {p.status !== 'paid' ? (
                        <Button
                          size="sm"
                          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                          onClick={() => {
                            setPayingPayout(p);
                            setPaymentRef(`WAVE-${Date.now().toString(36).toUpperCase()}`);
                          }}
                        >
                          Marquer Versé (Wave)
                        </Button>
                      ) : (
                        <span className="text-[11px] text-text/50 font-medium">
                          Réf: {p.payment_reference || '—'}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Desktop Payouts Table (>= md) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-surface border-b border-navy/10 text-xs text-text/60 uppercase">
              <tr>
                <th className="px-5 py-3.5">Mois</th>
                <th className="px-5 py-3.5">Influenceur</th>
                <th className="px-5 py-3.5">Élèves Validés</th>
                <th className="px-5 py-3.5">Montant Dû</th>
                <th className="px-5 py-3.5">Statut</th>
                <th className="px-5 py-3.5">Réf. Wave</th>
                <th className="px-5 py-3.5 text-right">Action Règlement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5">
              {paginatedPayouts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-text/50">
                    Aucun versement enregistré.
                  </td>
                </tr>
              ) : (
                paginatedPayouts.map((p) => {
                  const inf = influencers.find((i) => i.id === p.influencer_id);

                  return (
                    <tr key={p.id} className="hover:bg-surface/40 transition-colors">
                      <td className="px-5 py-3.5 font-bold text-navy">
                        {formatMonthLabel(p.period_month)}
                      </td>
                      <td className="px-5 py-3.5 font-medium">
                        {inf?.full_name || 'Partenaire'} ({inf?.phone || '—'})
                      </td>
                      <td className="px-5 py-3.5 font-bold">
                        {p.validated_subscriptions_count}
                      </td>
                      <td className="px-5 py-3.5 font-black text-emerald-700">
                        {formatFCFA(p.total_commission_fcfa)}
                      </td>
                      <td className="px-5 py-3.5">
                        {p.status === 'paid' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Versé par Wave
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300 animate-pulse">
                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                            En cours / À verser
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 font-mono text-xs text-text/60">
                        {p.payment_reference || '—'}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        {p.status !== 'paid' ? (
                          <Button
                            size="sm"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                            onClick={() => {
                              setPayingPayout(p);
                              setPaymentRef(`WAVE-${Date.now().toString(36).toUpperCase()}`);
                            }}
                          >
                            Marquer Versé (Wave)
                          </Button>
                        ) : (
                          <span className="text-xs text-text/50 font-medium">
                            Réglé le {formatDate(p.paid_at)}
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Payouts */}
        {filteredPayouts.length > 0 && (
          <div className="p-3 border-t border-navy/10">
            <Pagination
              currentPage={payoutPage}
              totalItems={filteredPayouts.length}
              pageSize={payoutPageSize}
              onPageChange={setPayoutPage}
              onPageSizeChange={setPayoutPageSize}
              itemLabel="règlements"
            />
          </div>
        )}
      </div>

      {/* CREATE INFLUENCER MODAL */}
      {isCreateModalOpen && (
        <Modal
          isOpen
          onClose={() => setIsCreateModalOpen(false)}
          title="Ajouter un Partenaire Influenceur"
          description="Créez un code promo unique. L'influenceur recevra 150 FCFA (plan 700 F), 400 FCFA (plan 2000 F) ou 500 FCFA (plan 5000 F) par élève dont le paiement est validé par l'admin."
        >
          <form onSubmit={handleCreateInfluencer} className="space-y-4 pt-1 text-sm">
            <div>
              <label className="block text-xs font-bold text-navy uppercase mb-1">
                Nom complet de l&apos;influenceur :
              </label>
              <Input
                placeholder="Ex : Cheikh Tidiane Sy (Major S2)"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-navy uppercase mb-1">
                Numéro de Téléphone Wave (pour les virements mensuels) :
              </label>
              <Input
                placeholder="+221 77 123 45 67"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-navy uppercase mb-1">
                Code Promo Unique :
              </label>
              <Input
                placeholder="Ex : MAJOR_S2, EXCELLENCE..."
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value.toUpperCase().replace(/[^A-Z0-9_-]/g, ''))}
                className="font-mono font-bold tracking-wider uppercase text-navy"
                required
              />
              <p className="text-[11px] text-text/50 mt-1">
                L&apos;élève entrera ce code pour bénéficier de l&apos;abonnement. L&apos;influenceur sera crédité de 150 FCFA (plan 700 F), 400 FCFA (plan 2000 F) ou 500 FCFA (plan 5000 F).
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-navy uppercase mb-1">
                Notes ou Canaux de communication (Optionnel) :
              </label>
              <Input
                placeholder="Ex : Groupe WhatsApp 2 000 élèves, TikTok éducatif..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-navy/10">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsCreateModalOpen(false)}
                disabled={isPending}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                size="sm"
                className="bg-navy hover:bg-navy/90 text-white font-bold"
                disabled={isPending}
              >
                {isPending ? 'Création en cours…' : 'Créer le Partenaire'}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* MARK AS PAID MODAL */}
      {payingPayout && (
        <Modal
          isOpen
          onClose={() => setPayingPayout(null)}
          title={`Enregistrer le versement Wave — ${formatMonthLabel(payingPayout.period_month)}`}
          description={`Montant total à verser : ${formatFCFA(payingPayout.total_commission_fcfa)} pour ${payingPayout.validated_subscriptions_count} abonnement(s) validé(s).`}
        >
          <form onSubmit={handleMarkPaid} className="space-y-4 pt-1 text-sm">
            <div>
              <label className="block text-xs font-bold text-navy uppercase mb-1">
                Référence de transaction Wave :
              </label>
              <Input
                placeholder="Ex : TR-WAVE-2026-99214"
                value={paymentRef}
                onChange={(e) => setPaymentRef(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-navy uppercase mb-1">
                Note de virement (Optionnel) :
              </label>
              <Input
                placeholder="Ex : Virement Wave effectué le 05 du mois"
                value={paymentNote}
                onChange={(e) => setPaymentNote(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t border-navy/10">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setPayingPayout(null)}
                disabled={isPending}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                disabled={isPending}
              >
                {isPending ? 'Enregistrement…' : 'Confirmer le Versement Wave'}
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
