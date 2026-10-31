'use client';

import React, { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Modal } from '@/components/ui/modal';
import { useToast } from '@/components/ui/toast';
import {
  activateSubscriptionAction,
  extendSubscriptionAction,
} from '@/lib/subscription/actions';

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
  starts_at: string;
  ends_at: string;
  created_at: string;
  student_id: string;
  profiles: { full_name: string | null; phone: string; avatar_url: string | null } | null;
  plans: { name: string; price: number; duration_months: number } | null;
  payments: Payment[];
}

interface Props {
  subscriptions: Subscription[];
}

const STATUS_FILTERS = ['tous', 'pending', 'active', 'expired', 'rejected', 'suspended'];

function formatFCFA(n: number) {
  return n.toLocaleString('fr-FR') + ' FCFA';
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
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
  const [extendMonths, setExtendMonths] = useState(1);

  const filtered =
    filter === 'tous'
      ? subscriptions
      : subscriptions.filter((s) => s.status === filter);

  function openDetail(sub: Subscription) {
    setSelected(sub);
    setNotes('');
    setExtendMonths(1);
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
    fd.append('months', String(extendMonths));

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
        <p className="text-center text-text/50 py-12">Aucun abonnement dans cette catégorie</p>
      ) : (
        <div className="space-y-2">
          {filtered.map((sub) => {
            const payment = sub.payments?.[0];
            return (
              <button
                key={sub.id}
                onClick={() => openDetail(sub)}
                className="w-full text-left rounded-2xl border border-navy/10 bg-white p-4 hover:border-turquoise/40 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div>
                    <p className="font-semibold text-navy">
                      {sub.profiles?.full_name ?? 'Élève'}
                    </p>
                    <p className="text-sm text-text/60">{sub.profiles?.phone}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right hidden sm:block">
                      <p className="text-sm font-medium text-navy">
                        {sub.plans?.name ?? '—'}
                      </p>
                      <p className="text-xs text-text/50">
                        {sub.plans ? formatFCFA(sub.plans.price) : '—'}
                      </p>
                    </div>
                    {payment && (
                      <span className="text-xs bg-surface border border-navy/10 rounded-lg px-2 py-1 text-text/60">
                        {PROVIDER_LABELS[payment.provider] ?? payment.provider}
                      </span>
                    )}
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
                  </div>
                </div>
                <p className="text-xs text-text/40 mt-2">
                  Demandé le {formatDate(sub.created_at)} · Expire le {formatDate(sub.ends_at)}
                </p>
              </button>
            );
          })}
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <Modal
          isOpen
          onClose={() => setSelected(null)}
          title={`Abonnement — ${selected.profiles?.full_name ?? 'Élève'}`}
        >
          <div className="space-y-4">
            {/* Student info */}
            <div className="rounded-xl bg-surface p-4 space-y-1.5 text-sm">
              <p>
                <span className="text-text/50">Élève :</span>{' '}
                <strong>{selected.profiles?.full_name ?? '—'}</strong>
              </p>
              <p>
                <span className="text-text/50">Téléphone :</span>{' '}
                {selected.profiles?.phone}
              </p>
              <p>
                <span className="text-text/50">Plan :</span>{' '}
                {selected.plans?.name} — {selected.plans ? formatFCFA(selected.plans.price) : '—'}
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
              <p>
                <span className="text-text/50">Période :</span>{' '}
                {formatDate(selected.starts_at)} → {formatDate(selected.ends_at)}
              </p>
            </div>

            {/* Payment info */}
            {selected.payments?.length > 0 && (
              <div className="rounded-xl bg-surface p-4 space-y-1.5 text-sm">
                <p className="font-semibold text-navy mb-2">Paiement</p>
                <p>
                  <span className="text-text/50">Opérateur :</span>{' '}
                  {PROVIDER_LABELS[selected.payments[0].provider] ?? selected.payments[0].provider}
                </p>
                <p>
                  <span className="text-text/50">Code TX :</span>{' '}
                  <code className="bg-white border border-navy/10 rounded px-1.5 py-0.5 text-navy">
                    {selected.payments[0].transaction_code}
                  </code>
                </p>
                {selected.payments[0].proof_image_url && (
                  <p>
                    <span className="text-text/50">Capture :</span>{' '}
                    <span className="text-turquoise text-xs">Image fournie ✓</span>
                  </p>
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
                  className="flex-1"
                >
                  ✅ Activer
                </Button>
                <Button
                  variant="coral"
                  onClick={() => handleReview('reject')}
                  disabled={isPending}
                  className="flex-1"
                >
                  ❌ Rejeter
                </Button>
              </div>
            )}
            {selected.status === 'active' && (
              <Button
                variant="outline"
                onClick={() => handleReview('suspend')}
                disabled={isPending}
                className="w-full"
              >
                ⏸ Suspendre
              </Button>
            )}

            {/* Extend */}
            <div className="border-t border-navy/10 pt-4">
              <p className="text-sm font-medium text-text mb-2">Prolonger l&apos;abonnement</p>
              <div className="flex gap-2">
                <select
                  value={extendMonths}
                  onChange={(e) => setExtendMonths(Number(e.target.value))}
                  className="flex-1 rounded-xl border border-navy/20 bg-white px-3 py-2 text-sm text-text focus:outline-none focus:ring-2 focus:ring-turquoise/40"
                >
                  {[1, 2, 3, 6, 12].map((m) => (
                    <option key={m} value={m}>
                      {m} mois
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

