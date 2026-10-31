'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
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

const PROVIDERS = [
  { value: 'wave', label: 'Wave' },
  { value: 'orange_money', label: 'Orange Money' },
  { value: 'free_money', label: 'Free Money' },
  { value: 'other', label: 'Autre' },
];

const WAVE_NUMBER = process.env.NEXT_PUBLIC_WAVE_NUMBER ?? '77 000 00 00';
const OM_NUMBER   = process.env.NEXT_PUBLIC_OM_NUMBER   ?? '76 000 00 00';

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
  const [provider, setProvider] = useState('wave');
  const [txCode, setTxCode] = useState('');
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const days = currentSub ? daysLeft(currentSub.ends_at) : 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!txCode.trim()) {
      showToast('Saisis le code de transaction', 'error');
      return;
    }
    setLoading(true);
    const fd = new FormData();
    fd.append('plan_id', selectedPlan);
    fd.append('provider', provider);
    fd.append('transaction_code', txCode.trim());
    if (proofFile) fd.append('proof_image', proofFile);

    const result = await requestSubscriptionAction(fd);
    setLoading(false);
    if (result.success) {
      showToast(result.message ?? 'Demande envoyée !', 'success');
      setTxCode('');
      setProofFile(null);
    } else {
      showToast(result.error, 'error');
    }
  }

  // ── Current subscription banner ──────────────────────────────
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
                Plan : <strong>{currentSub.plans.name}</strong> —{' '}
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
                    ⚠️ Il te reste seulement {days} jour{days > 1 ? 's' : ''} — pense à renouveler !
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
              <p className="text-sm text-gold font-medium">
                ⏳ Ta demande est en cours de traitement. L&apos;admin va l&apos;activer sous 24h.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  // ── Subscription form ────────────────────────────────────────
  return (
    <div className="space-y-6">
      {/* Plans */}
      <div>
        <h2 className="text-lg font-semibold text-navy mb-3">Choisir un plan</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {plans.map((plan) => (
            <button
              key={plan.id}
              type="button"
              onClick={() => setSelectedPlan(plan.id)}
              className={`text-left rounded-2xl border-2 p-4 transition-all ${
                selectedPlan === plan.id
                  ? 'border-turquoise bg-turquoise/5'
                  : 'border-navy/10 bg-white hover:border-turquoise/40'
              }`}
            >
              <p className="font-bold text-navy text-lg">{formatFCFA(plan.price)}</p>
              <p className="text-sm text-text/70 font-medium">{plan.name}</p>
              {plan.description && (
                <p className="text-xs text-text/50 mt-1">{plan.description}</p>
              )}
              {selectedPlan === plan.id && (
                <span className="inline-block mt-2 text-xs font-semibold text-turquoise">
                  ✓ Sélectionné
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Payment instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Instructions de paiement</CardTitle>
          <CardDescription>
            Envoie le montant correspondant à ton plan sur l&apos;un de ces numéros
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-surface border border-navy/10 p-3">
              <p className="text-xs font-semibold text-text/50 uppercase tracking-wide mb-1">
                Wave
              </p>
              <p className="text-navy font-bold text-lg">{WAVE_NUMBER}</p>
              <p className="text-xs text-text/50">Al Muxtaar</p>
            </div>
            <div className="rounded-xl bg-surface border border-navy/10 p-3">
              <p className="text-xs font-semibold text-text/50 uppercase tracking-wide mb-1">
                Orange Money
              </p>
              <p className="text-navy font-bold text-lg">{OM_NUMBER}</p>
              <p className="text-xs text-text/50">Al Muxtaar</p>
            </div>
          </div>
          <ol className="mt-4 space-y-1 text-sm text-text/70 list-decimal list-inside">
            <li>Envoie le montant sur le numéro correspondant</li>
            <li>Note le code de transaction (ex : TXN-XXXXXXXX)</li>
            <li>Remplis le formulaire ci-dessous et soumets</li>
            <li>L&apos;admin active ton compte sous 24h</li>
          </ol>
        </CardContent>
      </Card>

      {/* Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Confirmer le paiement</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Select
              label="Opérateur utilisé"
              value={provider}
              onChange={(e) => setProvider(e.target.value)}
              options={PROVIDERS}
              required
            />

            <Input
              label="Code de transaction"
              placeholder="Ex : TXN-XXXXXXXX"
              value={txCode}
              onChange={(e) => setTxCode(e.target.value)}
              required
            />

            <div>
              <label className="block text-sm font-medium text-text mb-1.5">
                Capture d&apos;écran (optionnel)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setProofFile(e.target.files?.[0] ?? null)}
                className="block w-full text-sm text-text/70 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-turquoise/10 file:text-turquoise hover:file:bg-turquoise/20 cursor-pointer"
              />
              {proofFile && (
                <p className="text-xs text-text/50 mt-1">{proofFile.name}</p>
              )}
            </div>

            <Button type="submit" variant="primary" className="w-full" disabled={loading}>
              {loading ? 'Envoi en cours…' : 'Envoyer ma demande'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
