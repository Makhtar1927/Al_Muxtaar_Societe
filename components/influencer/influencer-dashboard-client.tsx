'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
  Users,
  Wallet,
  GraduationCap,
  Trophy,
  Calculator,
  ArrowUpRight,
  Info,
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

function getInitials(name: string) {
  if (!name) return 'AM';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
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
  const [copiedCaption, setCopiedCaption] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'history' | 'simulator' | 'promo-card'>('overview');
  const [selectedStatement, setSelectedStatement] = useState<InfluencerPayout | null>(null);

  // Simulator state
  const [simSubsCount, setSimSubsCount] = useState<number>(30);

  // Link for students
  const origin = typeof window !== 'undefined' ? window.location.origin : 'https://al-muxtaar.sn';
  const shareLink = `${origin}/abonnement?code=${influencer.promo_code}`;

  const shareText = `🇸🇳 Révisez le Baccalauréat avec Al Muxtaar Doc !\n\nProfitez de l'accès complet à tous les chapitres de Maths et Physique-Chimie Terminale S2 dès 700 FCFA (formule mensuelle) ou 2 000 FCFA (formule trimestrielle).\n\nUtilisez mon code promo officiel : *${influencer.promo_code}*\n\n👉 Cliquez ici pour vous abonner : ${shareLink}`;

  function copyToClipboard(text: string, type: 'code' | 'link' | 'caption') {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(text);
      if (type === 'code') {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
      } else if (type === 'link') {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      } else {
        setCopiedCaption(true);
        setTimeout(() => setCopiedCaption(false), 2000);
      }
      showToast('Copié dans le presse-papiers !', 'success');
    }
  }

  function shareWhatsApp() {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, '_blank');
  }

  function printStatement(payout: InfluencerPayout) {
    setSelectedStatement(payout);
    setTimeout(() => {
      window.print();
    }, 200);
  }

  // Simulation calculations (avg 70% mensuel à 150 F, 30% trimestriel à 400 F -> avg 225 F / sub)
  const simMinEarnings = simSubsCount * 150;
  const simMaxEarnings = simSubsCount * 400;
  const simEstimatedEarnings = Math.round(simSubsCount * 0.7 * 150 + simSubsCount * 0.3 * 400);

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-300">
      {/* ─── PRINTABLE STATEMENT (Uniquement visible à l'impression PDF) ─── */}
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
                RELEVÉ OFFICIEL DE COMMISSIONS
              </span>
              <p className="text-xs text-gray-500 mt-1">
                Période : {formatMonthLabel(selectedStatement.period_month)}
              </p>
            </div>
          </div>

          <div className="my-6 grid grid-cols-2 gap-4 text-xs p-4 bg-gray-50 rounded border">
            <div>
              <p className="text-gray-500 uppercase font-semibold text-[10px]">Bénéficiaire</p>
              <p className="font-bold text-base mt-0.5">{influencer.full_name}</p>
              <p className="text-gray-600">Téléphone Wave : {influencer.phone}</p>
              <p className="text-gray-600">
                Code Promo Partenaire : <strong className="font-mono">{influencer.promo_code}</strong>
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-500 uppercase font-semibold text-[10px]">Statut du versement</p>
              <p className="font-bold text-sm uppercase mt-0.5 text-emerald-700">
                {selectedStatement.status === 'paid' ? 'Versé par Wave ✓' : 'En cours / En attente'}
              </p>
              {selectedStatement.paid_at && (
                <p className="text-gray-600">Date de règlement : {formatDate(selectedStatement.paid_at)}</p>
              )}
              {selectedStatement.payment_reference && (
                <p className="text-gray-600 font-mono text-[11px]">
                  Réf. Transaction : {selectedStatement.payment_reference}
                </p>
              )}
            </div>
          </div>

          <table className="w-full text-xs border-collapse border border-gray-300 my-6">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2.5 text-left">Désignation</th>
                <th className="border p-2.5 text-center">Abonnements Validés</th>
                <th className="border p-2.5 text-right">Barème Unitaire</th>
                <th className="border p-2.5 text-right">Total Net à Verser</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-2.5 font-medium">
                  Commissions d&apos;affiliation Terminale S2 (Formules 700 F &amp; 2 000 F)
                </td>
                <td className="border p-2.5 text-center font-bold">
                  {selectedStatement.validated_subscriptions_count}
                </td>
                <td className="border p-2.5 text-right font-medium text-gray-700">
                  150 F (700 F) • 400 F (2 000 F)
                </td>
                <td className="border p-2.5 text-right font-black text-sm text-emerald-800">
                  {formatFCFA(selectedStatement.total_commission_fcfa)}
                </td>
              </tr>
            </tbody>
          </table>

          <div className="mt-8 pt-4 border-t border-gray-200 text-xs text-gray-500 flex justify-between items-center">
            <p>Document officiel certifié généré électroniquement par Al Muxtaar Société.</p>
            <p className="font-bold text-black text-sm">
              Total certifié : {formatFCFA(selectedStatement.total_commission_fcfa)}
            </p>
          </div>
        </div>
      )}

      {/* ─── 1. HERO HEADER BANNER (Luxe, Responsive & Dynamique) ─── */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0A1A2E] via-[#0E2644] to-[#0A1828] p-5 sm:p-7 md:p-9 text-white shadow-xl border border-turquoise/25">
        {/* Glow ambient background effects */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-turquoise/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Left: Partner identity & badges */}
          <div className="space-y-3.5 max-w-2xl">
            {/* Badges strip */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-turquoise/20 px-3 py-1 text-[11px] sm:text-xs font-bold text-turquoise border border-turquoise/35 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Programme Ambassadeurs Bac S2</span>
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-semibold text-emerald-400 border border-emerald-500/25">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                <span>Partenaire Certifié</span>
              </span>
            </div>

            {/* Partner name & Avatar */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-turquoise to-[#009E91] text-navy font-black text-lg sm:text-xl flex items-center justify-center shadow-md ring-2 ring-white/20 shrink-0">
                {getInitials(influencer.full_name)}
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-white tracking-tight">
                  Espace Partenaire • {influencer.full_name}
                </h1>
                <p className="text-xs sm:text-sm text-surface-muted/90 mt-0.5">
                  Plateforme Officielle Al Muxtaar Doc • Baccalauréat Sénégal
                </p>
              </div>
            </div>

            {/* Official commission rate pill */}
            <div className="inline-flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="text-white/70">Barème officiel garanti :</span>
              <span className="inline-flex items-center gap-1 bg-turquoise/20 text-turquoise font-black px-2.5 py-1 rounded-lg border border-turquoise/30">
                +150 FCFA <span className="font-normal text-[11px] text-white/80">/ plan 700 F</span>
              </span>
              <span className="inline-flex items-center gap-1 bg-amber-500/20 text-amber-300 font-black px-2.5 py-1 rounded-lg border border-amber-400/30">
                +400 FCFA <span className="font-normal text-[11px] text-white/80">/ plan 2 000 F</span>
              </span>
            </div>
          </div>

          {/* Right: Wave Payout Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15 text-left lg:text-right shrink-0 shadow-lg hover:border-turquoise/40 transition-colors w-full lg:w-auto">
            <div className="flex items-center lg:justify-end gap-2 text-white/80">
              <WaveLogo size={18} />
              <span className="text-xs font-bold uppercase tracking-wider text-surface-muted">
                Règlement Wave Direct
              </span>
            </div>
            <div className="text-lg sm:text-xl font-black text-turquoise font-mono tracking-wider mt-1">
              {influencer.phone}
            </div>
            <div className="flex items-center lg:justify-end gap-1.5 text-[11px] text-emerald-300 font-semibold mt-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Virements fin de mois automatiques</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 2. TOP ACTION CARDS (Code, Lien Direct, Partage WhatsApp) ─── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 sm:gap-4.5">
        {/* Card 1: Code Promo VIP */}
        <div className="group rounded-2xl bg-white border-2 border-navy/10 hover:border-turquoise/50 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-navy/70 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-turquoise" />
                <span>Votre Code Promo Unique</span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider bg-turquoise/10 text-turquoise px-2 py-0.5 rounded-full border border-turquoise/20">
                Actif
              </span>
            </div>

            <div className="bg-surface rounded-xl p-3 border border-navy/10 flex items-center justify-between gap-2 mt-2">
              <span className="text-xl sm:text-2xl font-black text-navy font-mono tracking-widest truncate">
                {influencer.promo_code}
              </span>
              <Button
                size="sm"
                variant="outline"
                className="text-xs font-bold shrink-0 flex items-center gap-1.5 hover:bg-turquoise hover:text-white hover:border-turquoise transition-all"
                onClick={() => copyToClipboard(influencer.promo_code, 'code')}
              >
                {copiedCode ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copié !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copier</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          <p className="text-[11px] text-text/60 mt-3 leading-relaxed">
            Les élèves saisissent ce code lors de leur abonnement pour activer votre commission.
          </p>
        </div>

        {/* Card 2: Lien Direct Personnalisé */}
        <div className="group rounded-2xl bg-white border-2 border-navy/10 hover:border-turquoise/50 p-4 sm:p-5 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-navy/70 flex items-center gap-1.5">
                <Share2 className="w-3.5 h-3.5 text-turquoise" />
                <span>Lien Direct de Parrainage</span>
              </span>
              <a
                href={shareLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-bold text-turquoise hover:underline inline-flex items-center gap-0.5"
                title="Tester mon lien"
              >
                <span>Tester</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>

            <div className="bg-surface rounded-xl p-3 border border-navy/10 flex items-center justify-between gap-2 text-xs font-mono text-navy mt-2">
              <span className="truncate text-[11px] sm:text-xs text-navy/80">{shareLink}</span>
              <Button
                size="sm"
                variant="outline"
                className="text-xs font-bold shrink-0 flex items-center gap-1.5 hover:bg-turquoise hover:text-white hover:border-turquoise transition-all"
                onClick={() => copyToClipboard(shareLink, 'link')}
              >
                {copiedLink ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copié !</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copier</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          <p className="text-[11px] text-text/60 mt-3 leading-relaxed">
            Pré-remplit automatiquement votre code promo dès le clic de l&apos;élève.
          </p>
        </div>

        {/* Card 3: Partage WhatsApp Turbo */}
        <div className="rounded-2xl bg-gradient-to-br from-[#128C7E] to-[#25D366] text-white p-4 sm:p-5 shadow-md flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-1.5">
            <span className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-white/90">
              <WhatsAppLogo size={16} />
              <span>Diffusion WhatsApp 1-Clic</span>
            </span>
            <p className="text-xs text-white/95 leading-relaxed pt-0.5">
              Partagez votre lien et code promo directement dans vos groupes de classe et statuts WhatsApp.
            </p>
          </div>

          <Button
            size="sm"
            className="w-full bg-white hover:bg-white/95 text-[#128C7E] hover:text-[#0e6f63] font-black text-xs flex items-center justify-center gap-2 rounded-xl mt-4 shadow-sm hover:shadow-md transition-all py-2.5"
            onClick={shareWhatsApp}
          >
            <WhatsAppLogo size={17} />
            <span>Envoyer sur WhatsApp</span>
          </Button>
        </div>
      </div>

      {/* ─── 3. KPI METRICS CARDS (Totalement Responsive 2x2 ou 4x1) ─── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1 */}
        <div className="rounded-2xl bg-white border border-navy/10 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-navy/60">
              Validés ce mois
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-navy mt-1">
            {currentMonthPayout.validated_subscriptions_count}
          </p>
          <span className="text-[10px] text-amber-800 font-semibold bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full inline-block mt-2">
            {formatMonthLabel(currentMonthPayout.period_month)}
          </span>
        </div>

        {/* Metric 2 */}
        <div className="rounded-2xl bg-gradient-to-br from-emerald-500/10 via-white to-emerald-500/5 border-2 border-emerald-500/30 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
              Gains ce mois
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-700 flex items-center justify-center">
              <Wallet className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-emerald-700 mt-1">
            {formatFCFA(currentMonthPayout.total_commission_fcfa)}
          </p>
          <span className="text-[10px] text-emerald-800 font-semibold inline-block mt-2">
            ⏳ Versement fin de mois
          </span>
        </div>

        {/* Metric 3 */}
        <div className="rounded-2xl bg-white border border-navy/10 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-navy/60">
              Total Élèves
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-navy mt-1">
            {totalAllTimeSubs}
          </p>
          <span className="text-[11px] text-text/60 block mt-2">
            Depuis votre inscription
          </span>
        </div>

        {/* Metric 4 */}
        <div className="rounded-2xl bg-white border border-navy/10 p-4 sm:p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-navy/60">
              Total Cumulé
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-600 flex items-center justify-center">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl sm:text-3xl font-black text-navy mt-1">
            {formatFCFA(totalAllTimeFCFA)}
          </p>
          <span className="text-[11px] text-emerald-700 font-semibold block mt-2">
            Historique garanti
          </span>
        </div>
      </div>

      {/* ─── 4. TABS NAVIGATION (Scroll horizontal fluide sur mobile) ─── */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar border-b border-navy/10 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'overview'
              ? 'bg-navy text-white shadow-sm'
              : 'bg-white text-navy/70 hover:bg-navy/5 border border-navy/10'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Activité &amp; Validations</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'history'
              ? 'bg-navy text-white shadow-sm'
              : 'bg-white text-navy/70 hover:bg-navy/5 border border-navy/10'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Historique &amp; Relevés PDF</span>
          <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded-full font-mono">
            {historyPayouts.length}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('simulator')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'simulator'
              ? 'bg-navy text-white shadow-sm'
              : 'bg-white text-navy/70 hover:bg-navy/5 border border-navy/10'
          }`}
        >
          <Calculator className="w-4 h-4 text-emerald-600" />
          <span>Simulateur de Gains</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('promo-card')}
          className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
            activeTab === 'promo-card'
              ? 'bg-navy text-white shadow-sm'
              : 'bg-white text-navy/70 hover:bg-navy/5 border border-navy/10'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Visuel Story Réseaux</span>
        </button>
      </div>

      {/* ─── TAB 1: OVERVIEW & ACTIVITÉ RÉCENTE ─── */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Detailed rule reminder box */}
          <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-navy/5 pb-3">
              <h3 className="text-sm font-bold text-navy uppercase tracking-wider flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-turquoise" />
                <span>Règles de Comptabilisation Officielle</span>
              </h3>
              <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                100% Transparent
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="bg-surface p-3.5 rounded-xl border border-navy/5 space-y-1">
                <span className="font-bold text-navy text-[13px] block">
                  💳 Barème par abonnement validé :
                </span>
                <p className="text-text/75 leading-relaxed">
                  • <strong>150 FCFA</strong> sur formule mensuelle (700 FCFA)<br />
                  • <strong>400 FCFA</strong> sur formule trimestrielle (2 000 FCFA)
                </p>
              </div>

              <div className="bg-surface p-3.5 rounded-xl border border-navy/5 space-y-1">
                <span className="font-bold text-navy text-[13px] block">
                  🛡️ Déclencheur du crédit :
                </span>
                <p className="text-text/75 leading-relaxed">
                  Votre solde est crédité dès que l&apos;administrateur confirme le paiement de l&apos;élève.
                  Versement intégral à la fin du mois via Wave au <strong className="text-navy">{influencer.phone}</strong>.
                </p>
              </div>
            </div>
          </div>

          {/* Recent Validated Affiliations List */}
          <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-navy uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Dernières Inscriptions Validées avec votre code</span>
              </h3>
              <span className="text-xs text-text/50">
                {recentAffiliations.length} inscription{recentAffiliations.length > 1 ? 's' : ''}
              </span>
            </div>

            {recentAffiliations.length === 0 ? (
              <div className="py-10 text-center space-y-3 bg-surface/50 rounded-2xl border border-dashed border-navy/15 p-6">
                <div className="w-12 h-12 rounded-2xl bg-turquoise/10 text-turquoise flex items-center justify-center mx-auto">
                  <Share2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-navy text-sm">
                    Aucune inscription validée pour le moment
                  </p>
                  <p className="text-xs text-text/60 max-w-sm mx-auto mt-1">
                    Diffusez votre lien ou code promo <strong className="text-navy font-mono">{influencer.promo_code}</strong> dans vos groupes WhatsApp et statuts pour enregistrer vos premiers élèves !
                  </p>
                </div>
                <Button
                  size="sm"
                  onClick={shareWhatsApp}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                >
                  <WhatsAppLogo size={15} />
                  <span className="ml-1.5">Partager maintenant</span>
                </Button>
              </div>
            ) : (
              <div className="divide-y divide-navy/5">
                {recentAffiliations.map((item) => (
                  <div
                    key={item.id}
                    className="py-3 flex items-center justify-between gap-3 text-xs hover:bg-surface/40 px-2 rounded-xl transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-8 h-8 rounded-full bg-navy/5 text-navy font-bold flex items-center justify-center text-[11px] shrink-0">
                        {item.student_name ? getInitials(item.student_name) : 'EL'}
                      </div>
                      <div className="truncate">
                        <p className="font-bold text-navy truncate">
                          {item.student_name || 'Élève anonymisé (Bac S2)'}
                        </p>
                        <p className="text-text/50 text-[11px] truncate">
                          {item.plan_name || (item.commission_fcfa === 400 ? 'Trimestriel (2 000 FCFA)' : 'Mensuel (700 FCFA)')} • Validé le {formatDate(item.validated_at)}
                        </p>
                      </div>
                    </div>
                    <span className="font-black text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 shrink-0 text-xs">
                      +{item.commission_fcfa} FCFA
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ─── TAB 2: HISTORIQUE MENSUEL INVIOLABLE (Responsive Table + Mobile Cards) ─── */}
      {activeTab === 'history' && (
        <div className="rounded-2xl border border-navy/10 bg-white shadow-sm overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-navy/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-bold text-navy text-base">Historique Mensuel Inviolable</h3>
              <p className="text-xs text-text/60 mt-0.5">
                Chaque mois de commission reste archivé et consultable avec preuve de versement Wave.
              </p>
            </div>
            <span className="text-xs font-bold text-navy/70 bg-surface px-3 py-1 rounded-full border border-navy/10 shrink-0">
              Inviolable &amp; Définitif
            </span>
          </div>

          {historyPayouts.length === 0 ? (
            <div className="py-12 text-center text-xs text-text/50 p-6">
              <Calendar className="w-8 h-8 mx-auto text-text/30 mb-2" />
              <p className="font-semibold text-navy">Aucun mois antérieur clôturé</p>
              <p className="mt-1">Votre premier relevé mensuel définitif s&apos;archivera automatiquement à la fin de ce mois.</p>
            </div>
          ) : (
            <>
              {/* Desktop View: Table */}
              <div className="hidden md:block overflow-x-auto">
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
                              En attente
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
                            className="text-xs flex items-center gap-1.5 ml-auto font-bold"
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

              {/* Mobile View: Cards (Evite tout découpage ou bug de scroll) */}
              <div className="md:hidden divide-y divide-navy/10 p-3 space-y-3">
                {historyPayouts.map((payout) => (
                  <div key={payout.id} className="bg-surface p-4 rounded-xl space-y-2.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-navy text-sm">
                        {formatMonthLabel(payout.period_month)}
                      </span>
                      <span className="font-black text-emerald-700 text-sm">
                        {formatFCFA(payout.total_commission_fcfa)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-text/70">
                      <span>{payout.validated_subscriptions_count} abonnement(s)</span>
                      <span>
                        {payout.status === 'paid' ? (
                          <span className="text-emerald-700 font-bold">Versé ✓</span>
                        ) : (
                          <span className="text-amber-700 font-bold">En attente</span>
                        )}
                      </span>
                    </div>

                    {payout.payment_reference && (
                      <p className="text-[11px] font-mono text-text/50">
                        Réf Wave: {payout.payment_reference}
                      </p>
                    )}

                    <Button
                      size="sm"
                      variant="outline"
                      className="w-full text-xs font-bold flex items-center justify-center gap-1.5 mt-2 bg-white"
                      onClick={() => printStatement(payout)}
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Imprimer le Relevé PDF</span>
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* ─── TAB 3: SIMULATEUR DE GAINS (Engageant & Motivateur) ─── */}
      {activeTab === 'simulator' && (
        <div className="rounded-2xl border border-navy/10 bg-white p-5 sm:p-7 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-turquoise flex items-center gap-1.5">
              <Calculator className="w-4 h-4" />
              <span>Calculateur de Commissions</span>
            </span>
            <h3 className="text-lg sm:text-xl font-black text-navy">
              Combien pouvez-vous gagner chaque mois ?
            </h3>
            <p className="text-xs sm:text-sm text-text/70">
              Ajustez le nombre d&apos;élèves parrainés pour estimer votre virement Wave mensuel.
            </p>
          </div>

          {/* Quick preset buttons */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-navy uppercase block">
              Nombre d&apos;élèves abonnés par mois :
            </label>
            <div className="flex flex-wrap gap-2">
              {[10, 25, 50, 100, 200].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setSimSubsCount(count)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    simSubsCount === count
                      ? 'bg-turquoise text-white shadow-xs'
                      : 'bg-surface text-navy hover:bg-navy/10 border border-navy/10'
                  }`}
                >
                  {count} élèves
                </button>
              ))}
            </div>
          </div>

          {/* Slider input */}
          <div className="space-y-2 bg-surface p-4 rounded-2xl border border-navy/5">
            <div className="flex justify-between items-center text-xs font-bold text-navy">
              <span>Curseur personnalisé :</span>
              <span className="text-sm font-black text-turquoise">{simSubsCount} élèves</span>
            </div>
            <input
              type="range"
              min="1"
              max="250"
              value={simSubsCount}
              onChange={(e) => setSimSubsCount(parseInt(e.target.value, 10))}
              className="w-full h-2 bg-navy/20 rounded-lg appearance-none cursor-pointer accent-turquoise"
            />
          </div>

          {/* Earnings result card */}
          <div className="rounded-2xl bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent border-2 border-emerald-500/30 p-5 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 block">
              Revenu Mensuel Estimé (Virement Wave)
            </span>
            <div className="text-2xl sm:text-4xl font-black text-emerald-700">
              ~ {formatFCFA(simEstimatedEarnings)}
            </div>
            <div className="text-xs text-text/70 space-y-1 pt-1">
              <p>• Minimum garanti (100% formules 700 F) : <strong>{formatFCFA(simMinEarnings)}</strong></p>
              <p>• Maximum potentiel (100% formules 2 000 F) : <strong>{formatFCFA(simMaxEarnings)}</strong></p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <Button
              onClick={shareWhatsApp}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 rounded-xl"
            >
              <WhatsAppLogo size={16} />
              <span>Partager mon code et commencer</span>
            </Button>
            <span className="text-[11px] text-text/60 italic">
              Conseil : Publiez votre code le dimanche soir pour maximiser les souscriptions de révision de la semaine !
            </span>
          </div>
        </div>
      )}

      {/* ─── TAB 4: VISUEL STORY RÉSEAUX SOCIAUX (Format 9:16 mobile) ─── */}
      {activeTab === 'promo-card' && (
        <div className="space-y-5">
          <div className="text-xs text-text/70 bg-white border border-navy/10 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs">
            <div>
              <p className="font-bold text-navy text-sm">📸 Format Story Réseaux Sociaux :</p>
              <p className="mt-0.5">
                Prenez une capture d&apos;écran ou enregistrez cette carte pour vos statuts <strong>WhatsApp, Instagram, TikTok et Facebook</strong>.
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              className="text-xs font-bold shrink-0 flex items-center gap-1.5"
              onClick={() => copyToClipboard(shareText, 'caption')}
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedCaption ? 'Texte copié !' : 'Copier le texte prêt à poster'}</span>
            </Button>
          </div>

          {/* Social Story Card Design (Aspect ratio smartphone 9:16) */}
          <div className="max-w-sm mx-auto rounded-3xl bg-gradient-to-b from-[#0A1A2E] via-[#0E2644] to-[#0A1828] p-6 sm:p-7 text-white shadow-2xl border-4 border-turquoise/50 text-center space-y-5 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute -top-12 -right-12 w-36 h-36 bg-turquoise/25 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-amber-500/20 rounded-full blur-2xl pointer-events-none" />

            <div className="relative z-10 space-y-1.5">
              <span className="inline-block px-3 py-1 bg-turquoise/20 text-turquoise text-[11px] font-black uppercase tracking-wider rounded-full border border-turquoise/40">
                🇸🇳 Programme Bac S2 Sénégal
              </span>
              <h2 className="text-2xl font-black text-white tracking-tight mt-1">
                Al Muxtaar Doc
              </h2>
              <p className="text-xs text-surface-muted">
                Mathématiques &amp; Physique-Chimie Terminale S2
              </p>
            </div>

            <div className="relative z-10 bg-white/10 backdrop-blur-md rounded-2xl p-3.5 border border-white/20 space-y-1.5 text-xs text-white/90">
              <span className="text-[11px] uppercase tracking-wider text-turquoise block font-black">
                Recommandé par {influencer.full_name}
              </span>
              <p className="text-[11px] leading-relaxed text-white/80">
                Leçons complètes, fiches réflexes, quiz interactifs et annales résolues pas à pas !
              </p>
            </div>

            {/* Voucher Box */}
            <div className="relative z-10 bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-amber-500/20 border-2 border-dashed border-amber-400/80 rounded-2xl p-4 space-y-1">
              <span className="text-[10px] text-amber-300 font-bold uppercase tracking-widest block">
                Code Promo Exclusif
              </span>
              <span className="text-3xl font-black text-white tracking-widest font-mono block">
                {influencer.promo_code}
              </span>
              <span className="text-[11px] text-amber-200 block font-semibold pt-1">
                Dès 700 F (mois) • 2 000 F (trimestre)
              </span>
            </div>

            <div className="relative z-10 pt-2 border-t border-white/15 flex items-center justify-between text-[11px] text-surface-muted">
              <span className="font-semibold">al-muxtaar.sn</span>
              <span className="font-semibold text-turquoise">Paiement Wave Direct</span>
            </div>
          </div>

          <div className="text-center pt-2">
            <Button
              size="sm"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md"
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
