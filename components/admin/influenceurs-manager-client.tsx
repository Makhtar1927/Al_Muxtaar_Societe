'use client';

import React, { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { useToast } from '@/components/ui/toast';
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
  Send,
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

export default function InfluenceursManagerClient({ initialInfluencers, initialPayouts }: Props) {
  const { showToast } = useToast();
  const [influencers, setInfluencers] = useState<Influencer[]>(initialInfluencers);
  const [payouts, setPayouts] = useState<InfluencerPayout[]>(initialPayouts);

  const [isPending, startTransition] = useTransition();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [payingPayout, setPayingPayout] = useState<InfluencerPayout | null>(null);
  const [paymentRef, setPaymentRef] = useState('');
  const [paymentNote, setPaymentNote] = useState('');

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

  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://al-muxtaar.sn';

  function copyText(text: string, label: string) {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text);
      showToast(`${label} copié dans le presse-papiers !`, 'success');
    }
  }

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
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="rounded-2xl border border-navy/10 bg-white p-4 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-navy/60 block">
            Influenceurs Actifs
          </span>
          <p className="text-2xl sm:text-3xl font-black text-navy mt-1">
            {influencers.length}
          </p>
          <p className="text-[11px] text-text/60 mt-0.5">Codes promo en circulation</p>
        </div>

        <div className="rounded-2xl border border-amber-300 bg-amber-50/80 p-4 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-900 block">
            Souscriptions ce mois
          </span>
          <p className="text-2xl sm:text-3xl font-black text-amber-950 mt-1">
            {totalSubsThisMonth}
          </p>
          <span className="text-[10px] text-amber-800 font-semibold inline-block mt-0.5">
            Validées par l&apos;admin
          </span>
        </div>

        <div className="rounded-2xl border border-emerald-300 bg-emerald-50/80 p-4 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 block">
            Commissions dues ce mois
          </span>
          <p className="text-2xl sm:text-3xl font-black text-emerald-800 mt-1">
            {formatFCFA(totalCommissionsThisMonth)}
          </p>
          <p className="text-[10px] text-emerald-700 mt-0.5">150 FCFA / élève validé</p>
        </div>

        <div className="rounded-2xl border border-navy/10 bg-white p-4 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-navy/60 block">
            Total Cumulé Réglé
          </span>
          <p className="text-2xl sm:text-3xl font-black text-navy mt-1">
            {formatFCFA(totalCommissionsAllTime)}
          </p>
          <p className="text-[11px] text-text/60 mt-0.5">Historique inviolable conservé</p>
        </div>
      </div>

      {/* Header bar with New Influencer button */}
      <div className="bg-white rounded-2xl border border-navy/10 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-navy">Gestion des Partenaires &amp; Codes Promo</h2>
          <p className="text-xs text-text/60 mt-0.5">
            Attribuez des codes promo uniques et suivez les règlements mensuels de 150 FCFA par abonnement validé.
          </p>
        </div>

        <Button
          size="sm"
          className="bg-navy hover:bg-navy/90 text-white font-bold text-xs flex items-center gap-1.5 shrink-0"
          onClick={() => setIsCreateModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          <span>Nouveau Partenaire</span>
        </Button>
      </div>

      {/* Influencers Table */}
      <div className="bg-white rounded-2xl border border-navy/10 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-navy/10">
          <h3 className="font-bold text-navy text-sm uppercase tracking-wider">
            Liste des Influenceurs Enregistrés
          </h3>
        </div>

        <div className="overflow-x-auto">
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
              {influencers.map((inf) => {
                const dashboardUrl = `${origin}/influenceur/${inf.promo_code}`;

                return (
                  <tr key={inf.id} className="hover:bg-surface/40 transition-colors">
                    <td className="px-5 py-3.5 font-bold text-navy">
                      <div>
                        <span>{inf.full_name}</span>
                        {inf.notes && (
                          <span className="block text-[11px] text-text/50 font-normal">
                            {inf.notes}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-5 py-3.5 font-mono font-black text-navy text-sm">
                      <span className="bg-navy/5 border border-navy/10 px-2 py-0.5 rounded-lg">
                        {inf.promo_code}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 font-mono text-xs">{inf.phone}</td>
                    <td className="px-5 py-3.5 font-bold text-emerald-700">
                      {inf.commission_per_subscription || 150} FCFA / sub
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
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monthly Payouts Table */}
      <div className="bg-white rounded-2xl border border-navy/10 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-navy/10 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-navy text-sm uppercase tracking-wider">
              Historique des Synthèses Mensuelles &amp; Versements Wave
            </h3>
            <p className="text-xs text-text/60 mt-0.5">
              Toutes les périodes sont conservées intactes et consultables à tout moment.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-surface border-b border-navy/10 text-xs text-text/60 uppercase">
              <tr>
                <th className="px-5 py-3.5">Mois</th>
                <th className="px-5 py-3.5">Influenceur</th>
                <th className="px-5 py-3.5">Élèves Validés</th>
                <th className="px-5 py-3.5">Montant Dû (150 F/sub)</th>
                <th className="px-5 py-3.5">Statut</th>
                <th className="px-5 py-3.5">Réf. Wave</th>
                <th className="px-5 py-3.5 text-right">Action Règlement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5">
              {payouts.map((p) => {
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
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE INFLUENCER MODAL */}
      {isCreateModalOpen && (
        <Modal
          isOpen
          onClose={() => setIsCreateModalOpen(false)}
          title="Ajouter un Partenaire Influenceur"
          description="Créez un code promo unique. L'influenceur recevra 150 FCFA par élève dont le paiement est validé par l'admin."
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
                L&apos;élève entrera ce code pour bénéficier de l&apos;abonnement et créditer l&apos;influenceur de 150 FCFA.
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

