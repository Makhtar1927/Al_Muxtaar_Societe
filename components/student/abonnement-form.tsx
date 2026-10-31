'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast';
import { requestSubscriptionAction } from '@/lib/subscription/actions';

interface Plan {
  id: string;
  name: string;
  price: number;
  duration_months: number;
  description: string | null;
}

type CurrentSub = {
  id: string;
  status: string;
  starts_at: string;
  ends_at: string;
  plans: { name: string; price: number; duration_months: number } | null;
} | null;

interface AbonnementFormProps {
  plans: Plan[];
  currentSub: CurrentSub;
}

const WAVE_BASE_URL =
  process.env.NEXT_PUBLIC_WAVE_LINK ?? 'https://pay.wave.com/m/M_sn_2MOwdjUaQWQJ/c/sn/';
const WAVE_NUMBER = process.env.NEXT_PUBLIC_WAVE_NUMBER ?? '+221 77 247 69 26';
const BENEFICIARY_NAME =
  process.env.NEXT_PUBLIC_PAYMENT_BENEFICIARY_NAME ?? 'Al Muxtaar Société';

function formatFCFA(amount: number) {
  return amount.toLocaleString('fr-FR') + ' FCFA';
}

function daysLeft(ends_at: string) {
  const diff = new Date(ends_at).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / 86_400_000));
}

export default function AbonnementForm({ plans, currentSub }: AbonnementFormProps) {
  const { showToast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<string>(plans[0]?.id ?? '');
  const [txCode, setTxCode] = useState('');
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const days = currentSub ? daysLeft(currentSub.ends_at) : 0;

  // Calcul du montant et du lien Wave dynamique préinscrit
  const currentPlan = plans.find((p) => p.id === selectedPlan) || plans[0];
  const waveAmount = currentPlan?.price ?? 700;
  const cleanBase = WAVE_BASE_URL.endsWith('/') ? WAVE_BASE_URL : `${WAVE_BASE_URL}/`;
  const wavePaymentUrl = `${cleanBase}?amount=${waveAmount}`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!txCode.trim()) {
      showToast('Saisis le code de transaction Wave (reçu par SMS)', 'error');
      return;
    }
    setLoading(true);
    const fd = new FormData();
    fd.append('plan_id', selectedPlan);
    fd.append('provider', 'wave'); // Wave exclusif
    fd.append('transaction_code', txCode.trim());
    if (proofFile) fd.append('proof_image', proofFile);

    const result = await requestSubscriptionAction(fd);
    setLoading(false);
    if (result.success) {
      showToast(result.message ?? 'Demande envoyée avec succès !', 'success');
      setTxCode('');
      setProofFile(null);
    } else {
      showToast(result.error, 'error');
    }
  }

  // ── Statut d'abonnement actuel ──────────────────────────────
  if (currentSub && (currentSub.status === 'active' || currentSub.status === 'pending')) {
    return (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              Statut de l&apos;abonnement
              <Badge
                status={
                  currentSub.status === 'active'
                    ? 'active'
                    : currentSub.status === 'pending'
                    ? 'pending'
                    : 'expired'
                }
              />
            </CardTitle>
            {currentSub.plans && (
              <CardDescription>
                Formule : <strong>{currentSub.plans.name}</strong> —{' '}
                {formatFCFA(currentSub.plans.price)}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-3">
            {currentSub.status === 'active' && (
              <>
                <p className="text-sm text-text/70">
                  Expire le{' '}
                  <strong>
                    {new Date(currentSub.ends_at).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })}
                  </strong>
                </p>
                {days <= 7 && days > 0 && (
                  <div className="rounded-2xl bg-coral/10 border border-coral/30 p-3 text-coral text-sm font-medium">
                    ⚠️ Il te reste seulement {days} jour{days > 1 ? 's' : ''} — pense à renouveler pour ne pas perdre l&apos;accès à tes cours !
                  </div>
                )}
                {days === 0 && (
                  <div className="rounded-2xl bg-coral/10 border border-coral/30 p-3 text-coral text-sm font-medium">
                    ⚠️ Ton abonnement expire aujourd&apos;hui.
                  </div>
                )}
              </>
            )}
            {currentSub.status === 'pending' && (
              <div className="rounded-2xl bg-gold/10 border border-gold/30 p-4 text-navy text-sm font-medium">
                ⏳ Ta demande Wave est en cours de vérification par l&apos;administration. L&apos;accès sera débloqué sous peu.
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // ── Formulaire d'abonnement ────────────────────────────────
  return (
    <div className="space-y-6">
      {/* 1. Choix du plan */}
      <div>
        <h2 className="text-lg font-bold text-navy mb-3">1. Choisis ta formule</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {plans.map((plan) => {
            const isSelected = selectedPlan === plan.id;
            return (
              <button
                key={plan.id}
                type="button"
                onClick={() => setSelectedPlan(plan.id)}
                className={`text-left rounded-2xl border-2 p-5 transition-all ${
                  isSelected
                    ? 'border-turquoise bg-turquoise/5 shadow-card'
                    : 'border-navy/10 bg-white hover:border-turquoise/40'
                }`}
              >
                <div className="flex items-center justify-between">
                  <p className="font-black text-navy text-xl">{formatFCFA(plan.price)}</p>
                  {isSelected && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-turquoise text-white text-[10px] font-bold px-2 py-0.5">
                      ✓ Choisi
                    </span>
                  )}
                </div>
                <p className="text-sm font-bold text-navy mt-1">{plan.name}</p>
                {plan.description && (
                  <p className="text-xs text-navy-light mt-1.5 leading-relaxed">{plan.description}</p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Paiement via Wave avec montant préinscrit */}
      <Card className="border-2 border-[#1BAAF7]/30 bg-gradient-to-br from-white to-[#1BAAF7]/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1BAAF7] text-white text-lg font-bold shadow-soft">
                🌊
              </span>
              <div>
                <CardTitle className="text-base text-navy font-bold">2. Paiement direct par Wave</CardTitle>
                <CardDescription>
                  Paiement 100% sécurisé sans frais supplémentaires
                </CardDescription>
              </div>
            </div>
            <span className="rounded-full bg-[#1BAAF7]/10 px-3 py-1 text-xs font-bold text-[#0084cc]">
              Paiement officiel
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Bouton d'action directe vers Wave avec amount prérempli */}
          <div>
            <a
              href={wavePaymentUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-[#1BAAF7] hover:bg-[#0e96e0] active:scale-[0.99] text-white font-extrabold py-4 px-6 text-base sm:text-lg shadow-md transition-all text-center"
            >
              <span className="text-xl">🌊</span>
              <span>Payer {formatFCFA(waveAmount)} sur Wave</span>
              <span className="rounded-lg bg-white/20 px-2 py-0.5 text-xs font-semibold text-white">
                Montant pré-rempli
              </span>
            </a>
          </div>

          {/* Informations de compatibilité tous navigateurs */}
          <div className="rounded-2xl bg-white border border-surface-muted p-4 space-y-2 text-xs text-navy-light shadow-sm">
            <p className="font-bold text-navy flex items-center gap-1.5">
              <span>✅</span>
              <span>Compatible avec tous les navigateurs (Safari iOS, Chrome, Edge, Firefox)</span>
            </p>
            <ul className="space-y-1.5 pl-5 list-disc text-navy-light/90">
              <li>
                <strong>Sur votre téléphone (iPhone & Android)</strong> : Ouvre directement votre application Wave avec le montant exact de <strong>{formatFCFA(waveAmount)}</strong> déjà inscrit.
              </li>
              <li>
                <strong>Sur ordinateur</strong> : Affiche le QR code et l&apos;écran sécurisé Wave officiel.
              </li>
              <li>
                <strong>Paiement manuel direct</strong> : Si vous préférez envoyer directement depuis l&apos;application Wave, le numéro officiel est le <strong className="text-navy">{WAVE_NUMBER}</strong> ({BENEFICIARY_NAME}).
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* 3. Confirmation du paiement */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base text-navy font-bold">3. Confirmer votre transaction</CardTitle>
          <CardDescription>
            Une fois le paiement effectué, collez le code de transaction reçu par SMS pour que l&apos;admin active votre compte.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Code de transaction Wave (reçu par SMS)"
              placeholder="Ex : W-123456789 ou TXN-XXXXXX"
              value={txCode}
              onChange={(e) => setTxCode(e.target.value)}
              helperText="Retrouvez ce code dans le SMS de confirmation envoyé par Wave ou sur votre reçu."
              required
            />

            <div>
              <label className="block text-sm font-medium text-navy mb-1.5">
                Capture d&apos;écran du reçu Wave (optionnel mais accélère la validation)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProofFile(e.target.files?.[0] ?? null)}
                className="block w-full text-sm text-navy-light file:mr-3 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#1BAAF7]/10 file:text-[#0084cc] hover:file:bg-[#1BAAF7]/20 cursor-pointer"
              />
              {proofFile && (
                <p className="text-xs text-turquoise font-medium mt-1.5">✓ Fichier joint : {proofFile.name}</p>
              )}
            </div>

            <Button type="submit" variant="primary" className="w-full text-base py-3" disabled={loading}>
              {loading ? 'Validation en cours…' : 'Envoyer ma preuve de paiement'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
