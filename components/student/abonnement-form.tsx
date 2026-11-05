'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/toast';
import { requestSubscriptionAction } from '@/lib/subscription/actions';
import { verifyPromoCodeAction } from '@/lib/influencers/actions';
import { Icon } from '@/components/ui/icon';
import { WaveLogo } from '@/components/ui/icons/wave-logo';
import { WhatsAppLogo } from '@/components/ui/icons/whatsapp-logo';
import { CheckCircle2, Clock, AlertCircle, ArrowRight, Smartphone, Sparkles, Tag } from 'lucide-react';

interface Plan {
  id: string;
  name: string;
  price_fcfa: number;
  duration_days: number;
}

type PlanInfo = { name: string; price_fcfa: number; duration_days: number };

type CurrentSub = {
  id: string;
  status: string;
  start_date: string;
  end_date: string;
  plans: PlanInfo | PlanInfo[] | null;
} | null;

interface AbonnementFormProps {
  plans: Plan[];
  currentSub: CurrentSub;
  userPhone: string;
  userName: string;
}

const WAVE_BASE_URL =
  process.env.NEXT_PUBLIC_WAVE_LINK ?? 'https://pay.wave.com/m/M_sn_2MOwdjUaQWQJ/c/sn/';
const WAVE_NUMBER = process.env.NEXT_PUBLIC_WAVE_NUMBER ?? '+221 77 247 69 26';

function formatFCFA(amount: number) {
  return amount.toLocaleString('fr-FR') + ' FCFA';
}

function formatDuration(days: number) {
  if (days >= 365) return `${Math.round(days / 365)} an${days >= 730 ? 's' : ''}`;
  if (days >= 30) return `${Math.round(days / 30)} mois`;
  return `${days} jours`;
}

function daysLeft(endDate: string) {
  const diff = new Date(endDate).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / 86_400_000));
}

// ─── Statut abonnement actuel ─────────────────────────────────────────────────
function CurrentSubCard({ currentSub }: { currentSub: NonNullable<CurrentSub> }) {
  const isActive = currentSub.status === 'active';
  const isPending = currentSub.status === 'pending';
  const days = isActive ? daysLeft(currentSub.end_date) : 0;
  const planInfo = Array.isArray(currentSub.plans) ? currentSub.plans[0] : currentSub.plans;

  return (
    <Card className={isActive ? 'border-turquoise/30 bg-turquoise/5' : 'border-gold/30 bg-gold/5'}>
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-base">
          {isActive ? (
            <CheckCircle2 className="w-5 h-5 text-turquoise shrink-0" strokeWidth={2} />
          ) : (
            <Clock className="w-5 h-5 text-gold shrink-0" strokeWidth={2} />
          )}
          <span>Statut de l&apos;abonnement</span>
          <Badge
            status={
              isActive ? 'active' : isPending ? 'pending' : 'expired'
            }
          />
        </CardTitle>
        {planInfo && (
          <CardDescription>
            Formule : <strong>{planInfo.name}</strong> —{' '}
            {formatFCFA(planInfo.price_fcfa)} / {formatDuration(planInfo.duration_days)}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="space-y-3">
        {isActive && (
          <>
            <p className="text-sm text-text/70">
              Expire le{' '}
              <strong>
                {new Date(currentSub.end_date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </strong>
            </p>
            {days <= 7 && days > 0 && (
              <div className="rounded-2xl bg-coral/10 border border-coral/30 p-3 flex items-start gap-2 text-coral text-sm font-medium">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={2} />
                <span>Il te reste seulement {days} jour{days > 1 ? 's' : ''} — pense à renouveler pour ne pas perdre l&apos;accès à tes cours !</span>
              </div>
            )}
            {days === 0 && (
              <div className="rounded-2xl bg-coral/10 border border-coral/30 p-3 flex items-start gap-2 text-coral text-sm font-medium">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={2} />
                <span>Votre abonnement a expiré. Renouvelez pour retrouver l&apos;accès complet.</span>
              </div>
            )}
          </>
        )}
        {isPending && (
          <div className="rounded-2xl bg-gold/10 border border-gold/30 p-3 flex items-start gap-2 text-amber-700 text-sm font-medium">
            <Clock className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={2} />
            <span>Votre paiement est en cours de vérification par l&apos;admin. Vous recevrez une notification dès l&apos;activation.</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ─── Formulaire principal ─────────────────────────────────────────────────────
export default function AbonnementForm({
  plans,
  currentSub,
  userPhone,
  userName,
}: AbonnementFormProps) {
  const { showToast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string>(plans[0]?.id ?? '');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Promo code states
  const [promoCode, setPromoCode] = useState('');
  const [verifyingPromo, setVerifyingPromo] = useState(false);
  const [promoSuccess, setPromoSuccess] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);

  // Auto detect promo code from URL (?code=XYZ or ?promo=XYZ)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const codeFromUrl = params.get('code') || params.get('promo');
      if (codeFromUrl) {
        const clean = codeFromUrl.toUpperCase();
        setPromoCode(clean);
        verifyCode(clean);
      }
    }
  }, []);

  async function verifyCode(codeToVerify: string) {
    const clean = codeToVerify.trim().toUpperCase();
    if (!clean) {
      setPromoSuccess(null);
      setPromoError(null);
      return;
    }
    setVerifyingPromo(true);
    setPromoError(null);
    const res = await verifyPromoCodeAction(clean);
    setVerifyingPromo(false);
    if (res.success) {
      setPromoSuccess(res.data.discountText);
      setPromoError(null);
      showToast(res.data.discountText, 'success');
    } else {
      setPromoSuccess(null);
      setPromoError(res.error || 'Code promo invalide ou inactif.');
    }
  }

  const currentPlan = plans.find((p) => p.id === selectedPlan) ?? plans[0];
  const waveAmount = currentPlan?.price_fcfa ?? 700;
  const cleanBase = WAVE_BASE_URL.endsWith('/') ? WAVE_BASE_URL : `${WAVE_BASE_URL}/`;
  const wavePaymentUrl = `${cleanBase}?amount=${waveAmount}`;

  // Si déjà actif ou en attente → afficher le statut uniquement
  if (currentSub && (currentSub.status === 'active' || currentSub.status === 'pending')) {
    return <CurrentSubCard currentSub={currentSub} />;
  }

  async function handleConfirmPayment() {
    if (!selectedPlan) {
      showToast('Veuillez sélectionner une formule.', 'error');
      return;
    }
    setLoading(true);
    const fd = new FormData();
    fd.append('plan_id', selectedPlan);
    if (userPhone) fd.append('phone_sender', userPhone);
    if (promoCode && promoSuccess) {
      fd.append('promo_code', promoCode.trim().toUpperCase());
    }

    const result = await requestSubscriptionAction(fd);
    setLoading(false);
    if (result.success) {
      setSubmitted(true);
      showToast(result.message ?? 'Demande envoyée avec succès !', 'success');
    } else {
      showToast(result.error, 'error');
    }
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto text-center py-8 px-6 bg-white rounded-3xl border border-navy/10 shadow-sm space-y-5">
        <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" strokeWidth={2} />
        </div>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Demande en attente
          </span>
          <h2 className="text-xl font-black text-navy mt-3">Demande bien reçue !</h2>
          <p className="text-sm text-text/70 mt-2">
            L&apos;administrateur a été notifié de votre paiement Wave et activera votre accès sous peu.
          </p>
        </div>
        <div className="pt-2">
          <a
            href="/dashboard"
            className="inline-flex w-full items-center justify-center rounded-2xl bg-navy text-white text-sm font-bold py-3.5 hover:bg-navy/90 transition-colors shadow-sm"
          >
            Aller sur mon tableau de bord
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      {/* Statut expiré si applicable */}
      {currentSub && currentSub.status === 'expired' && (
        <div className="rounded-2xl bg-coral/10 border border-coral/30 p-4 flex items-start gap-2 text-coral text-sm">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={2} />
          <span className="font-medium">Votre abonnement précédent a expiré. Choisissez une formule pour renouveler.</span>
        </div>
      )}

      {/* Choix des formules (700 FCFA et 2000 FCFA) */}
      <div className="space-y-3">
        <label className="text-xs font-bold uppercase tracking-wider text-navy/60 block">
          Sélectionnez votre formule d&apos;abonnement
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative rounded-2xl border-2 p-5 text-left transition-all flex flex-col justify-between gap-4 ${
                  isSelected
                    ? 'border-turquoise bg-turquoise/5 shadow-sm ring-1 ring-turquoise'
                    : 'border-navy/10 bg-white hover:border-navy/20'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-navy text-base">{plan.name}</h3>
                    <p className="text-xs text-text/60 mt-0.5">{formatDuration(plan.duration_days)} d&apos;accès illimité</p>
                  </div>
                  {isSelected && (
                    <CheckCircle2 className="w-5 h-5 text-turquoise shrink-0" strokeWidth={2} />
                  )}
                </div>
                <div className="pt-2 border-t border-navy/5 flex items-baseline justify-between">
                  <span className="text-xs text-navy/50 font-medium">Tarif officiel</span>
                  <span className="text-xl font-black text-navy">{formatFCFA(plan.price_fcfa)}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Code Promo / Code Parrainage Influenceur */}
      <div className="rounded-2xl border border-navy/10 bg-white p-4 shadow-xs space-y-2.5">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-navy flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5 text-turquoise" />
            <span>Code promo / Parrainage Influenceur</span>
          </label>
          <span className="text-[10px] text-text/50 font-medium">Optionnel</span>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Ex : MAJOR_S2, EXCELLENCE..."
            value={promoCode}
            onChange={(e) => {
              setPromoCode(e.target.value.toUpperCase());
              setPromoSuccess(null);
              setPromoError(null);
            }}
            className="flex-1 rounded-xl border border-navy/20 bg-surface px-3 py-2 text-xs font-bold tracking-wider text-navy uppercase placeholder:normal-case placeholder:font-normal placeholder:tracking-normal focus:outline-none focus:ring-2 focus:ring-turquoise/40"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => verifyCode(promoCode)}
            disabled={verifyingPromo || !promoCode.trim()}
            className="text-xs whitespace-nowrap"
          >
            {verifyingPromo ? 'Vérification…' : 'Appliquer'}
          </Button>
        </div>

        {promoSuccess && (
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xl p-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{promoSuccess}</span>
          </div>
        )}

        {promoError && (
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-800 bg-rose-50 border border-rose-200 rounded-xl p-2.5">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{promoError}</span>
          </div>
        )}
      </div>

      {/* Bloc d'action Wave officiel */}
      <div className="rounded-3xl border border-[#1DC3EC]/30 bg-gradient-to-b from-white to-[#1DC3EC]/5 p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <WaveLogo size={38} />
            <div>
              <p className="font-extrabold text-navy text-sm sm:text-base">Paiement Mobile Wave</p>
              <p className="text-xs text-navy/60">Transfert direct et sécurisé au Sénégal</p>
            </div>
          </div>
          <span className="text-[11px] font-black text-[#0284C7] bg-[#1DC3EC]/20 border border-[#1DC3EC]/30 px-3 py-1 rounded-full uppercase tracking-wider">
            Partenaire Officiel
          </span>
        </div>

        {/* Bouton de paiement et confirmation automatique */}
        <div className="space-y-3 pt-2">
          <Button
            type="button"
            className="w-full h-14 rounded-2xl bg-[#1DC3EC] hover:bg-[#00B5E2] active:scale-[0.99] text-navy font-black text-base shadow-md flex items-center justify-center gap-3 transition-all"
            onClick={async () => {
              // Ouvrir Wave dans un nouvel onglet
              window.open(wavePaymentUrl, '_blank');
              // Déclencher automatiquement la confirmation
              await handleConfirmPayment();
            }}
            disabled={loading}
          >
            {loading ? (
              'Enregistrement de votre demande…'
            ) : (
              <>
                <WaveLogo size={28} />
                <span className="text-white drop-shadow-xs">Payer {formatFCFA(waveAmount)} avec Wave</span>
                <ArrowRight className="w-5 h-5 text-white shrink-0" strokeWidth={2.5} />
              </>
            )}
          </Button>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-navy/60">
            <p>
              Traitement officiel par <strong className="text-navy">Al Muxtaar Société</strong>
            </p>
            <a
              href={`https://wa.me/221772476926?text=${encodeURIComponent(
                `Bonjour Al Muxtaar, je souhaite activer ma formule ${currentPlan?.name ?? ''} via Wave.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-bold text-emerald-700 hover:text-emerald-800 hover:underline"
            >
              <WhatsAppLogo size={16} />
              <span>Assistance Wave WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
