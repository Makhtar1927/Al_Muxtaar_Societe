'use client';

import React, { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Modal } from '@/components/ui/modal';
import { useToast } from '@/components/ui/toast';
import { Icon } from '@/components/ui/icon';
import {
  activateSubscriptionAction,
  extendSubscriptionAction,
} from '@/lib/subscription/actions';
import { WaveLogo } from '@/components/ui/icons/wave-logo';
import { WhatsAppLogo } from '@/components/ui/icons/whatsapp-logo';
import {
  CheckCircle2,
  XCircle,
  PauseCircle,
  Clock,
  User,
  Phone,
  CalendarDays,
  CreditCard,
  FileText,
} from 'lucide-react';

interface Payment {
  id: string;
  provider: string;
  transaction_code: string;
  proof_image_url: string | null;
  status: string;
  notes: string | null;
  reviewed_at: string | null;
}

interface Subscription {
  id: string;
  status: string;
  start_date: string | null;
  end_date: string | null;
  created_at: string;
  user_id: string;
  profiles: { first_name: string | null; last_name: string | null; phone: string; avatar: string | null } | null;
  plans: { name: string; price_fcfa: number; duration_days: number } | null;
  payments: Payment[];
}

interface Props {
  subscriptions: Subscription[];
}

const STATUS_FILTERS = ['tous', 'pending', 'active', 'expired', 'rejected', 'suspended'];

function formatFCFA(n: number) {
  return n.toLocaleString('fr-FR') + ' FCFA';
}

function formatDate(iso: string | null) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatDuration(days: number) {
  if (days >= 365) return `${Math.round(days / 365)} an${days >= 730 ? 's' : ''}`;
  if (days >= 30) return `${Math.round(days / 30)} mois`;
  return `${days} jours`;
}

function fullName(profiles: Subscription['profiles']) {
  if (!profiles) return 'Inconnu';
  return `${profiles.first_name ?? ''} ${profiles.last_name ?? ''}`.trim() || 'Inconnu';
}

const PROVIDER_LABELS: Record<string, string> = {
  wave: 'Wave',
  orange_money: 'Orange Money',
  free_money: 'Free Money',
  other: 'Autre',
};

export default function AdminAbonnementsClient({ subscriptions }: Props) {
  const { showToast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [filter, setFilter] = useState('pending');
  const [selected, setSelected] = useState<Subscription | null>(null);
  const [notes, setNotes] = useState('');
  const [extendDays, setExtendDays] = useState(30);

  const filtered =
    filter === 'tous'
      ? subscriptions
      : subscriptions.filter((s) => s.status === filter);

  function openDetail(sub: Subscription) {
    setSelected(sub);
    setNotes('');
    setExtendDays(30);
  }

  function handleReview(action: 'activate' | 'reject' | 'suspend') {
    if (!selected) return;
    const fd = new FormData();
    fd.append('subscription_id', selected.id);
    fd.append('action', action);
    fd.append('notes', notes);

    startTransition(async () => {
      const res = await activateSubscriptionAction(fd);
      if (res.success) {
        showToast(res.message ?? 'Action effectuée', 'success');
        setSelected(null);
      } else {
        showToast(res.error, 'error');
      }
    });
  }

  function handleExtend() {
    if (!selected) return;
    const fd = new FormData();
    fd.append('subscription_id', selected.id);
    fd.append('days', String(extendDays));

    startTransition(async () => {
      const res = await extendSubscriptionAction(fd);
      if (res.success) {
        showToast(res.message ?? 'Prolongé', 'success');
        setSelected(null);
      } else {
        showToast(res.error, 'error');
      }
    });
  }

  // Summary counts
  const counts = {
    pending: subscriptions.filter((s) => s.status === 'pending').length,
    active: subscriptions.filter((s) => s.status === 'active').length,
    expired: subscriptions.filter((s) => s.status === 'expired').length,
    rejected: subscriptions.filter((s) => s.status === 'rejected').length,
  };

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'En attente', count: counts.pending, color: 'text-gold' },
          { label: 'Actifs', count: counts.active, color: 'text-turquoise' },
          { label: 'Expirés', count: counts.expired, color: 'text-text/50' },
          { label: 'Rejetés', count: counts.rejected, color: 'text-coral' },
        ].map((c) => (
          <Card key={c.label} className="text-center py-4">
            <p className={`text-3xl font-bold ${c.color}`}>{c.count}</p>
            <p className="text-sm text-text/60 mt-1">{c.label}</p>
          </Card>
        ))}
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {STATUS_FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors capitalize ${
              filter === f
                ? 'bg-navy text-white'
                : 'bg-white border border-navy/10 text-text/70 hover:border-navy/30'
            }`}
          >
            {f === 'tous' ? 'Tous' : f}
          </button>
        ))}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <Card className="py-12 text-center">
          <p className="text-text/40 text-sm">Aucun abonnement dans cette catégorie.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {filtered.map((sub) => (
            <Card
              key={sub.id}
              className="cursor-pointer hover:border-turquoise/40 transition-colors"
              onClick={() => openDetail(sub)}
            >
              <CardContent className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <Icon name="profil" size={36} />
                  <div>
                    <p className="font-semibold text-navy text-sm">{fullName(sub.profiles)}</p>
                    <p className="text-xs text-text/50 flex items-center gap-1 mt-0.5">
                      <Phone className="w-3 h-3" strokeWidth={2} />
                      {sub.profiles?.phone ?? '—'}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="inline-flex items-center gap-1.5 text-xs text-text/60 bg-surface px-2.5 py-1 rounded-xl border border-navy/5">
                    <WaveLogo size={14} />
                    <span>{sub.plans?.name ?? '—'} — {sub.plans ? formatFCFA(sub.plans.price_fcfa) : '—'}</span>
                  </span>
                  <Badge
                    status={
                      sub.status === 'active'
                        ? 'active'
                        : sub.status === 'pending'
                        ? 'pending'
                        : sub.status === 'expired'
                        ? 'expired'
                        : 'rejected'
                    }
                  />
                  <span className="text-xs text-text/40">{formatDate(sub.created_at)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <Modal isOpen={true} onClose={() => setSelected(null)} title="Détail de l'abonnement">
          <div className="space-y-4 text-sm">
            {/* Student info */}
            <div className="rounded-xl bg-surface p-4 space-y-2">
              <p className="font-semibold text-navy mb-1 flex items-center gap-2">
                <Icon name="profil" size={20} />
                <span>Élève</span>
              </p>
              <p>
                <span className="text-text/50">Nom :</span>{' '}
                <strong>{fullName(selected.profiles)}</strong>
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-text/40" strokeWidth={2} />
                  <span className="text-text/50">Téléphone :</span>{' '}
                  <strong className="text-navy">{selected.profiles?.phone ?? '—'}</strong>
                </p>
                {selected.profiles?.phone && (
                  <a
                    href={`https://wa.me/${selected.profiles.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-emerald-900 text-xs font-bold transition-colors"
                  >
                    <WhatsAppLogo size={14} />
                    <span>WhatsApp</span>
                  </a>
                )}
              </div>
            </div>

            {/* Subscription info */}
            <div className="rounded-xl bg-surface p-4 space-y-2">
              <p className="font-semibold text-navy mb-1 flex items-center gap-2">
                <Icon name="abonnement" size={20} />
                <span>Abonnement</span>
              </p>
              <p>
                <span className="text-text/50">Plan :</span>{' '}
                {selected.plans?.name ?? '—'} —{' '}
                {selected.plans ? formatFCFA(selected.plans.price_fcfa) : '—'}
                {selected.plans ? ` / ${formatDuration(selected.plans.duration_days)}` : ''}
              </p>
              <p>
                <span className="text-text/50">Statut :</span>{' '}
                <Badge
                  status={
                    selected.status === 'active'
                      ? 'active'
                      : selected.status === 'pending'
                      ? 'pending'
                      : selected.status === 'expired'
                      ? 'expired'
                      : 'rejected'
                  }
                />
              </p>
              <p className="flex items-center gap-1">
                <CalendarDays className="w-3 h-3 text-text/40" strokeWidth={2} />
                <span className="text-text/50">Période :</span>{' '}
                {formatDate(selected.start_date)} → {formatDate(selected.end_date)}
              </p>
            </div>

            {/* Payment info */}
            {selected.payments?.length > 0 && (
              <div className="rounded-xl bg-surface p-4 space-y-1.5">
                <p className="font-semibold text-navy mb-1 flex items-center gap-2">
                  <Icon name="paiement" size={20} />
                  <span>Paiement</span>
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-text/50">Opérateur :</span>
                  {selected.payments[0].provider === 'wave' ? (
                    <span className="inline-flex items-center gap-1.5 font-bold text-navy bg-white px-2 py-0.5 rounded-lg border border-navy/10 text-xs">
                      <WaveLogo size={16} />
                      <span>Wave Mobile Money</span>
                    </span>
                  ) : (
                    <span>{PROVIDER_LABELS[selected.payments[0].provider] ?? selected.payments[0].provider}</span>
                  )}
                </div>
                <p>
                  <span className="text-text/50">Référence :</span>{' '}
                  <code className="bg-white border border-navy/10 rounded px-1.5 py-0.5 text-navy text-xs">
                    {selected.payments[0].transaction_code}
                  </code>
                </p>
                {selected.payments[0].notes && (
                  <p className="text-xs text-text/60 italic">{selected.payments[0].notes}</p>
                )}
              </div>
            )}

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">
                Note (optionnel)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="Motif de rejet, remarque…"
                className="w-full rounded-xl border border-navy/20 bg-white px-3 py-2 text-sm text-text placeholder:text-text/40 focus:outline-none focus:ring-2 focus:ring-turquoise/40 resize-none"
              />
            </div>

            {/* Actions */}
            {(selected.status === 'pending' || selected.status === 'suspended') && (
              <div className="flex gap-2 flex-wrap">
                <Button
                  variant="primary"
                  onClick={() => handleReview('activate')}
                  disabled={isPending}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <CheckCircle2 className="w-4 h-4" strokeWidth={2} />
                  Activer
                </Button>
                <Button
                  variant="coral"
                  onClick={() => handleReview('reject')}
                  disabled={isPending}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <XCircle className="w-4 h-4" strokeWidth={2} />
                  Rejeter
                </Button>
              </div>
            )}
            {selected.status === 'active' && (
              <Button
                variant="outline"
                onClick={() => handleReview('suspend')}
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2"
              >
                <PauseCircle className="w-4 h-4" strokeWidth={2} />
                Suspendre
              </Button>
            )}

            {/* Extend */}
            <div className="border-t border-navy/10 pt-4">
              <p className="text-sm font-medium text-text mb-2 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-text/50" strokeWidth={2} />
                Prolonger l&apos;abonnement
              </p>
              <div className="flex gap-2">
                <select
                  value={extendDays}
                  onChange={(e) => setExtendDays(Number(e.target.value))}
                  className="flex-1 rounded-xl border border-navy/20 bg-white px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-turquoise/40"
                >
                  {[
                    { label: '30 jours (1 mois)', value: 30 },
                    { label: '60 jours (2 mois)', value: 60 },
                    { label: '90 jours (3 mois)', value: 90 },
                    { label: '180 jours (6 mois)', value: 180 },
                    { label: '365 jours (1 an)', value: 365 },
                  ].map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
                <Button
                  variant="secondary"
                  onClick={handleExtend}
                  disabled={isPending}
                >
                  Prolonger
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
