'use client';

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/toast';
import { WaveLogo } from '@/components/ui/icons/wave-logo';
import { WhatsAppLogo } from '@/components/ui/icons/whatsapp-logo';
import {
  Copy,
  CheckCircle2,
  Share2,
  Calendar,
  Download,
  Printer,
  Sparkles,
  TrendingUp,
  Clock,
  ShieldCheck,
  Tag,
  FileText,
  DollarSign,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import type { Influencer, InfluencerPayout, AffiliationRecord } from '@/lib/influencers/service';

interface Props {
  influencer: Influencer;
  currentMonthPayout: InfluencerPayout;
  historyPayouts: InfluencerPayout[];
  totalAllTimeFCFA: number;
  totalAllTimeSubs: number;
  recentAffiliations: AffiliationRecord[];
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

export default function InfluencerDashboardClient({
  influencer,
  currentMonthPayout,
  historyPayouts,
  totalAllTimeFCFA,
  totalAllTimeSubs,
  recentAffiliations,
}: Props) {
  const { showToast } = useToast();
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'promo-card'>('overview');
  const [selectedStatement, setSelectedStatement] = useState<InfluencerPayout | null>(null);

  // Link for students
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://al-muxtaar.sn';
  const shareLink = `${origin}/abonnement?code=${influencer.promo_code}`;

  function copyToClipboard(text: string, type: 'code' | 'link') {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text);
      if (type === 'code') {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
      } else {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
      showToast('Copié dans le presse-papiers !', 'success');
    }
  }

  function shareWhatsApp() {
    const text = `🇸🇳 Révisez le Baccalauréat avec Al Muxtaar Doc !\n\nProfitez de l'accès complet à tous les chapitres de Maths et Physique-Chimie Tle S2 dès 700 FCFA.\nUtilisez mon code promo officiel : *${influencer.promo_code}*\n\n👉 Cliquez ici pour vous abonner : ${shareLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  }

  function printStatement(payout: InfluencerPayout) {
    setSelectedStatement(payout);
    setTimeout(() => {
      window.print();
    }, 200);
  }

  return (
    <div className="space-y-6">
      {/* Printable Statement (Invisible on screen, visible only when printing) */}
      {selectedStatement && (
        <div className="hidden print:block fixed inset-0 bg-white p-8 text-black z-50">
          <div className="border-b-2 border-navy pb-4 mb-6 flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-black text-navy uppercase">Al Muxtaar Société</h1>
              <p className="text-xs text-gray-600">Plateforme Éducative d&apos;Excellence du Sénégal</p>
              <p className="text-xs text-gray-500 mt-1">Dakar, Sénégal • Support : +221 77 247 69 26</p>
            </div>
            <div className="text-right">
              <span className="text-sm font-bold bg-gray-100 px-3 py-1 rounded border border-gray-300">
                RELEVÉ OFFICIEL MENSUEL
              </span>
              <p className="text-xs text-gray-500 mt-1">Période : {formatMonthLabel(selectedStatement.period_month)}</p>
            </div>
          </div>

          <div className="my-6 grid grid-cols-2 gap-4 text-xs p-4 bg-gray-50 rounded border">
            <div>
              <p className="text-gray-500">Bénéficiaire :</p>
              <p className="font-bold text-sm">{influencer.full_name}</p>
              <p>Téléphone Wave : {influencer.phone}</p>
              <p>Code Promo : <strong>{influencer.promo_code}</strong></p>
            </div>
            <div className="text-right">
              <p className="text-gray-500">Statut du versement :</p>
              <p className="font-bold text-sm uppercase">
                {selectedStatement.status === 'paid' ? 'Versé par Wave ✓' : 'En cours / En attente'}
              </p>
              {selectedStatement.paid_at && <p>Date de règlement : {formatDate(selectedStatement.paid_at)}</p>}
              {selectedStatement.payment_reference && <p>Réf. Transaction : {selectedStatement.payment_reference}</p>}
            </div>
          </div>

          <table className="w-full text-xs border-collapse border border-gray-300 my-6">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Désignation</th>
                <th className="border p-2 text-center">Quantité (Élèves validés)</th>
                <th className="border p-2 text-right">Commission Unitaire</th>
                <th className="border p-2 text-right">Total Net</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2 font-medium">Abonnements élèves validés (Formule 700 FCFA)</td>
                <td className="border p-2 text-center font-bold">{selectedStatement.validated_subscriptions_count}</td>
                <td className="border p-2 text-right">150 FCFA</td>
                <td className="border p-2 text-right font-black text-sm">
                  {formatFCFA(selectedStatement.total_commission_fcfa)}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-8 pt-4 border-t border-gray-200 text-xs text-gray-500 flex justify-between items-center">
            <p>Document officiel généré électroniquement par Al Muxtaar Société.</p>
            <p className="font-bold text-black">Total certifié : {formatFCFA(selectedStatement.total_commission_fcfa)}</p>
          </div>
        </div>
      )}

      {/* Header Banner */}
      <div className="rounded-3xl bg-gradient-to-r from-navy via-navy to-[#0F2844] p-6 sm:p-8 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-turquoise/20 px-3.5 py-1 text-xs font-bold text-turquoise mb-3 border border-turquoise/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Programme Ambassadeurs &amp; Influenceurs Officiel</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              Espace Partenaire • {influencer.full_name}
            </h1>
            <p className="text-xs sm:text-sm text-surface-muted mt-1.5 max-w-xl leading-relaxed">
              Vous percevez <strong className="text-turquoise font-black">150 FCFA</strong> sur chaque abonnement élève validé par l&apos;administration avec votre code promo.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-right shrink-0">
            <span className="text-[11px] uppercase tracking-wider text-surface-muted block font-semibold">
              Règlement Wave direct au :
            </span>
            <span className="text-sm sm:text-base font-black text-turquoise font-mono mt-0.5 block">
              {influencer.phone}
            </span>
            <span className="text-[10px] text-white/70 block mt-1">
              Comptabilisé mensuellement • Historique conservé
            </span>
          </div>
        </div>
      </div>

      {/* Promo Code & Sharing Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Code Box */}
        <div className="rounded-2xl bg-white border border-navy/10 p-5 shadow-sm space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-navy/60 block">
            Votre Code Promo Unique
          </span>
          <div className="flex items-center justify-between bg-surface p-3 rounded-xl border border-navy/15">
            <span className="text-xl font-black text-navy tracking-widest font-mono">
              {influencer.promo_code}
            </span>
            <Button
              size="sm"
              variant="outline"
              className="text-xs flex items-center gap-1.5"
              onClick={() => copyToClipboard(influencer.promo_code, 'code')}
            >
              {copiedCode ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedCode ? 'Copié' : 'Copier'}</span>
            </Button>
          </div>
          <p className="text-[11px] text-text/60">
            Les élèves l&apos;entrent lors de l&apos;abonnement pour valider votre commission.
          </p>
        </div>

        {/* Direct Link */}
        <div className="rounded-2xl bg-white border border-navy/10 p-5 shadow-sm space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-navy/60 block">
            Votre Lien Direct de Parrainage
          </span>
          <div className="flex items-center justify-between bg-surface p-3 rounded-xl border border-navy/15 text-xs text-navy font-mono truncate">
            <span className="truncate pr-2">{shareLink}</span>
            <Button
              size="sm"
              variant="outline"
              className="text-xs flex items-center gap-1.5 shrink-0"
              onClick={() => copyToClipboard(shareLink, 'link')}
            >
              {copiedLink ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copié' : 'Copier'}</span>
            </Button>
          </div>
          <p className="text-[11px] text-text/60">
            Pré-remplit automatiquement votre code promo dès que l&apos;élève clique dessus.
          </p>
        </div>

        {/* WhatsApp Sharing */}
        <div className="rounded-2xl bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border border-emerald-500/30 p-5 shadow-sm flex flex-col justify-between space-y-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
              <WhatsAppLogo size={16} />
              <span>Partager sur WhatsApp</span>
            </span>
            <p className="text-xs text-emerald-950/80 mt-1">
              Diffusez votre lien et votre code promo en 1 clic dans vos groupes et statuts WhatsApp.
            </p>
          </div>
          <Button
            size="sm"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 rounded-xl"
            onClick={shareWhatsApp}
          >
            <WhatsAppLogo size={16} />
            <span>Envoyer à mes contacts</span>
          </Button>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Current Month Subs */}
        <div className="rounded-2xl bg-white border border-navy/10 p-4 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-navy/60 block">
            Élèves Validés ce mois
          </span>
          <p className="text-2xl sm:text-3xl font-black text-navy mt-1">
            {currentMonthPayout.validated_subscriptions_count}
          </p>
          <span className="text-[10px] text-amber-700 font-semibold bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full inline-block mt-1">
            {formatMonthLabel(currentMonthPayout.period_month)}
          </span>
        </div>

        {/* Current Month Earnings */}
        <div className="rounded-2xl bg-white border border-emerald-500/30 bg-emerald-50/30 p-4 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
            Gains ce mois (150 F / élève)
          </span>
          <p className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1">
            {formatFCFA(currentMonthPayout.total_commission_fcfa)}
          </p>
          <span className="text-[10px] text-emerald-800 font-semibold inline-block mt-1">
            ⏳ Versement fin de mois par Wave
          </span>
        </div>

        {/* Total All Time Subs */}
        <div className="rounded-2xl bg-white border border-navy/10 p-4 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-navy/60 block">
            Total Élèves Parrainés
          </span>
          <p className="text-2xl sm:text-3xl font-black text-navy mt-1">
            {totalAllTimeSubs}
          </p>
          <span className="text-[11px] text-text/60 block mt-1">Depuis votre inscription</span>
        </div>

        {/* Total All Time Earnings */}
        <div className="rounded-2xl bg-white border border-navy/10 p-4 shadow-sm">
          <span className="text-xs font-bold uppercase tracking-wider text-navy/60 block">
            Total Cumulé Récolté
          </span>
          <p className="text-2xl sm:text-3xl font-black text-navy mt-1">
            {formatFCFA(totalAllTimeFCFA)}
          </p>
          <span className="text-[11px] text-emerald-700 font-semibold block mt-1">
            Toutes périodes confondues
          </span>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex border-b border-navy/10 gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`pb-3 px-3 text-sm font-bold border-b-2 transition-all ${
            activeTab === 'overview'
              ? 'border-turquoise text-navy'
              : 'border-transparent text-text/50 hover:text-navy'
          }`}
        >
          Mois en cours &amp; Activité
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('history')}
          className={`pb-3 px-3 text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'history'
              ? 'border-turquoise text-navy'
              : 'border-transparent text-text/50 hover:text-navy'
          }`}
        >
          <span>Historique Inviolable des Mois</span>
          <span className="text-xs bg-navy/5 px-2 py-0.5 rounded-full font-mono">
            {historyPayouts.length}
          </span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('promo-card')}
          className={`pb-3 px-3 text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
            activeTab === 'promo-card'
              ? 'border-turquoise text-navy'
              : 'border-transparent text-text/50 hover:text-navy'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Visuel Story Partageable</span>
        </button>
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Current Month In Progress Banner */}
          <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/5 pb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                  Période active : {formatMonthLabel(currentMonthPayout.period_month)}
                </span>
                <h3 className="text-lg font-bold text-navy mt-2">
                  Synthèse du mois en cours
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs text-text/50 block">Commission estimée :</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-700">
                  {formatFCFA(currentMonthPayout.total_commission_fcfa)}
                </span>
              </div>
            </div>

            <div className="text-xs text-text/70 leading-relaxed bg-surface p-4 rounded-xl space-y-1.5">
              <p className="font-semibold text-navy">
                📌 Règle de comptabilisation stricte :
              </p>
              <p>
                Chaque élève qui s&apos;abonne avec votre code promo <strong className="text-navy">{influencer.promo_code}</strong> est pris en compte <strong>dès que l&apos;administrateur valide formellement son paiement</strong>.
              </p>
              <p>
                Le total cumulé de ce mois vous sera versé directement par transfert Wave sur votre numéro <strong className="text-navy">{influencer.phone}</strong> à la fin du mois.
              </p>
            </div>
          </div>

          {/* Recent Validated Affiliations */}
          <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm space-y-3">
            <h3 className="text-sm font-bold text-navy uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Dernières Inscriptions Validées avec votre code</span>
            </h3>

            {recentAffiliations.length === 0 ? (
              <p className="text-xs text-text/50 italic py-6 text-center">
                Aucune inscription validée enregistrée pour le moment. Partagez votre lien pour commencer à cumuler vos 150 FCFA par élève !
              </p>
            ) : (
              <div className="divide-y divide-navy/5">
                {recentAffiliations.map((item) => (
                  <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-navy">
                        {item.student_name || 'Élève anonymisé (Bac S2)'}
                      </p>
                      <p className="text-text/50 text-[11px]">
                        Validé le {formatDate(item.validated_at)} • Période {item.period_month}
                      </p>
                    </div>
                    <span className="font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      +{item.commission_fcfa} FCFA
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: HISTORY (Inviolable past months) */}
      {activeTab === 'history' && (
        <div className="rounded-2xl border border-navy/10 bg-white shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-navy/10 flex items-center justify-between">
            <div>
              <h3 className="font-bold text-navy text-base">Historique Mensuel Inviolable</h3>
              <p className="text-xs text-text/60 mt-0.5">
                Consultez l&apos;intégralité de vos commissions des mois passés avec leurs preuves de versement Wave.
              </p>
            </div>
          </div>

          {historyPayouts.length === 0 ? (
            <div className="py-12 text-center text-xs text-text/50">
              Aucun mois antérieur clôturé pour le moment. Votre premier historique s&apos;affichera à la fin du mois en cours.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-surface border-b border-navy/10 text-xs text-text/60 uppercase">
                  <tr>
                    <th className="px-5 py-3.5">Mois</th>
                    <th className="px-5 py-3.5">Élèves Validés</th>
                    <th className="px-5 py-3.5">Total Commission</th>
                    <th className="px-5 py-3.5">Statut Règlement</th>
                    <th className="px-5 py-3.5">Référence Wave</th>
                    <th className="px-5 py-3.5 text-right">Relevé Officiel</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy/5">
                  {historyPayouts.map((payout) => (
                    <tr key={payout.id} className="hover:bg-surface/50 transition-colors">
                      <td className="px-5 py-3.5 font-bold text-navy">
                        {formatMonthLabel(payout.period_month)}
                      </td>
                      <td className="px-5 py-3.5 font-semibold">
                        {payout.validated_subscriptions_count} élève{payout.validated_subscriptions_count > 1 ? 's' : ''}
                      </td>
                      <td className="px-5 py-3.5 font-black text-emerald-700">
                        {formatFCFA(payout.total_commission_fcfa)}
                      </td>
                      <td className="px-5 py-3.5">
                        {payout.status === 'paid' ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full border border-emerald-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            Versé par Wave
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                            <Clock className="w-3.5 h-3.5 text-amber-600" />
                            En attente de versement
                          </span>
                        )}
                      </td>
                      <td className="px-5 py-3.5 font-mono text-xs text-text/60">
                        {payout.payment_reference || '—'}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs flex items-center gap-1.5 ml-auto"
                          onClick={() => printStatement(payout)}
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Relevé PDF</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: PROMO VISUAL STORY CARD (Prête à être partagée/capturée) */}
      {activeTab === 'promo-card' && (
        <div className="space-y-4">
          <div className="text-xs text-text/70 bg-white border border-navy/10 rounded-2xl p-4">
            <p className="font-bold text-navy mb-1">📸 Carte Visuelle pour vos Réseaux Sociaux :</p>
            <p>
              Prenez une capture d&apos;écran ou partagez directement ce visuel sur vos stories <strong>WhatsApp, Instagram, TikTok et Facebook</strong> pour inviter vos abonnés à réviser avec votre code.
            </p>
          </div>

          {/* Social Story Card Design */}
          <div className="max-w-md mx-auto rounded-3xl bg-gradient-to-b from-navy via-[#0C233C] to-navy p-7 text-white shadow-2xl border-4 border-turquoise/40 text-center space-y-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-turquoise/20 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-2">
              <span className="inline-block px-3 py-1 bg-turquoise/20 text-turquoise text-[11px] font-black uppercase tracking-wider rounded-full border border-turquoise/40">
                🇸🇳 Programme Officiel Bac S2 Sénégal
              </span>
              <h2 className="text-2xl font-black text-white mt-2">
                Al Muxtaar Doc
              </h2>
              <p className="text-xs text-surface-muted">
                Mathématiques &amp; Physique-Chimie Terminale S2
              </p>
            </div>

            <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 space-y-2">
              <span className="text-[11px] uppercase tracking-wider text-surface-muted block font-semibold">
                Recommandé par {influencer.full_name}
              </span>
              <p className="text-xs text-white/90 leading-relaxed">
                Révisez avec les cours complets, fiches réflexes, simulateurs interactifs et annales corrigées pas à pas !
              </p>
            </div>

            <div className="relative z-10 bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-amber-500/20 border-2 border-dashed border-amber-400/60 rounded-2xl p-4">
              <span className="text-[10px] text-amber-300 font-bold uppercase tracking-widest block">
                Mon Code Promo Exclusif
              </span>
              <span className="text-3xl font-black text-white tracking-widest font-mono mt-1 block">
                {influencer.promo_code}
              </span>
              <span className="text-[11px] text-amber-200/90 block mt-1 font-semibold">
                Dès 700 FCFA / mois seulement
              </span>
            </div>

            <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-surface-muted">
              <span>al-muxtaar.sn</span>
              <span>Paiement Wave Direct</span>
            </div>
          </div>

          <div className="text-center pt-2">
            <Button
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
              onClick={shareWhatsApp}
            >
              <WhatsAppLogo size={16} />
              <span className="ml-2">Partager cette offre sur WhatsApp</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

