'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/toast';
import { requestSubscriptionAction } from '@/lib/subscription/actions';
import { CheckCircle2, Clock, AlertCircle, Wallet, ArrowRight, Smartphone } from 'lucide-react';

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
      <Card className="border-turquoise/30 bg-turquoise/5 text-center py-8">
        <CardContent className="space-y-4">
          <CheckCircle2 className="w-14 h-14 text-turquoise mx-auto" strokeWidth={1.5} />
          <h2 className="text-lg font-bold text-navy">Demande envoyée !</h2>
          <p className="text-sm text-text/70 max-w-sm mx-auto">
            Votre demande d&apos;abonnement est en cours de validation. L&apos;admin activera votre compte dans les plus brefs délais.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Statut expiré si applicable */}
      {currentSub && currentSub.status === 'expired' && (
        <div className="rounded-2xl bg-coral/10 border border-coral/30 p-4 flex items-start gap-2 text-coral text-sm">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={2} />
          <span className="font-medium">Votre abonnement précédent a expiré. Choisissez une formule pour renouveler.</span>
        </div>
      )}

      {/* 1. Choix de la formule */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base text-navy font-bold">1. Choisissez votre formule</CardTitle>
          <CardDescription>Accès illimité à tous les cours, exercices et quiz du Bac.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {plans.map((plan) => (
            <button
              key={plan.id}
              type="button"
              onClick={() => setSelectedPlan(plan.id)}
              className={`w-full rounded-2xl border-2 p-4 text-left transition-all ${
                selectedPlan === plan.id
                  ? 'border-turquoise bg-turquoise/5'
                  : 'border-navy/10 bg-white hover:border-navy/30'
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-bold text-navy">{plan.name}</p>
                  <p className="text-sm text-text/60 mt-0.5">{formatDuration(plan.duration_days)} d&apos;accès complet</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-extrabold text-turquoise">{formatFCFA(plan.price_fcfa)}</p>
                  {selectedPlan === plan.id && (
                    <CheckCircle2 className="w-4 h-4 text-turquoise ml-auto mt-1" strokeWidth={2} />
                  )}
                </div>
              </div>
            </button>
          ))}
        </CardContent>
      </Card>

      {/* 2. Paiement Wave */}
      <Card className="border-[#1BAAF7]/20 bg-gradient-to-br from-[#1BAAF7]/5 to-[#1BAAF7]/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1BAAF7] text-white shadow-soft">
                <Wallet className="w-5 h-5" strokeWidth={2} />
              </div>
              <div>
                <CardTitle className="text-base text-navy font-bold">2. Paiement via Wave</CardTitle>
                <CardDescription>Paiement 100 % sécurisé, sans frais supplémentaires</CardDescription>
              </div>
            </div>
            <span className="rounded-full bg-[#1BAAF7]/10 px-3 py-1 text-xs font-bold text-[#0084cc]">
              Officiel
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Bouton Wave */}
          <a
            href={wavePaymentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-[#1BAAF7] hover:bg-[#0e96e0] active:scale-[0.99] text-white font-extrabold py-4 px-6 text-base shadow-md transition-all text-center"
          >
            <Wallet className="w-5 h-5 shrink-0" strokeWidth={2} />
            <span>Payer {formatFCFA(waveAmount)} sur Wave</span>
            <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
          </a>

          {/* Infos compatibilité */}
          <div className="rounded-2xl bg-white border border-surface-muted p-4 space-y-2 text-xs text-navy-light shadow-sm">
            <p className="font-bold text-navy flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-navy/60" strokeWidth={2} />
              <span>Compatible avec tous les navigateurs (Safari iOS, Chrome, Firefox)</span>
            </p>
            <ul className="space-y-1.5 pl-5 list-disc text-navy-light/90">
              <li>
                <strong>Sur votre téléphone (iPhone &amp; Android)</strong> : Ouvre directement l&apos;application Wave avec le montant exact de <strong>{formatFCFA(waveAmount)}</strong> déjà inscrit.
              </li>
              <li>
                <strong>Sur ordinateur</strong> : Affiche le QR code et l&apos;écran sécurisé Wave officiel.
              </li>
              <li>
                <strong>Paiement manuel</strong> : Si vous préférez envoyer directement depuis l&apos;app Wave, le numéro officiel est le <strong className="text-navy">{WAVE_NUMBER}</strong>.
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* 3. Confirmation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base text-navy font-bold">3. Confirmer votre paiement</CardTitle>
          <CardDescription>
            Après avoir effectué le paiement Wave, cliquez sur le bouton ci-dessous. L&apos;admin activera votre compte.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            type="button"
            variant="primary"
            className="w-full text-base py-3"
            onClick={handleConfirmPayment}
            disabled={loading}
          >
            {loading ? (
              'Envoi en cours…'
            ) : (
              <span className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" strokeWidth={2} />
                J&apos;ai effectué mon paiement Wave
              </span>
            )}
          </Button>
          {userName && (
            <p className="text-xs text-text/50 text-center mt-3">
              Demande au nom de : <strong className="text-navy">{userName}</strong>
              {userPhone ? ` — ${userPhone}` : ''}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
