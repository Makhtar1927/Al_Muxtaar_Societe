'use client';

import React, { useState, useTransition, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Modal } from '@/components/ui/modal';
import { useToast } from '@/components/ui/toast';
import { Icon } from '@/components/ui/icon';
import { Pagination } from '@/components/ui/pagination';
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
  Search,
  ChevronRight,
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

const STATUS_FILTERS = [
  { key: 'tous', label: 'Tous' },
  { key: 'pending', label: 'En attente Wave' },
  { key: 'active', label: 'Actifs' },
  { key: 'expired', label: 'Expirés' },
  { key: 'rejected', label: 'Rejetés' },
  { key: 'suspended', label: 'Suspendus' },
];

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
  const [filter, setFilter] = useState('tous');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const [selected, setSelected] = useState<Subscription | null>(null);
  const [notes, setNotes] = useState('');
  const [extendDays, setExtendDays] = useState(30);

  // Summary counts
  const counts = useMemo(
    () => ({
      all: subscriptions.length,
      pending: subscriptions.filter((s) => s.status === 'pending').length,
      active: subscriptions.filter((s) => s.status === 'active').length,
      expired: subscriptions.filter((s) => s.status === 'expired').length,
      rejected: subscriptions.filter((s) => s.status === 'rejected').length,
      suspended: subscriptions.filter((s) => s.status === 'suspended').length,
    }),
    [subscriptions]
  );

  // Filtered subscriptions
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return subscriptions.filter((s) => {
      const matchesFilter = filter === 'tous' || s.status === filter;
      if (!matchesFilter) return false;
      if (!q) return true;

      const name = fullName(s.profiles).toLowerCase();
      const phone = (s.profiles?.phone ?? '').toLowerCase();
      const planName = (s.plans?.name ?? '').toLowerCase();
      const txCode = (s.payments?.[0]?.transaction_code ?? '').toLowerCase();

      return name.includes(q) || phone.includes(q) || planName.includes(q) || txCode.includes(q);
    });
  }, [subscriptions, filter, search]);

  // Paginated slice
  const paginatedSubs = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

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

  return (
    <div className="space-y-6">
      {/* Summary KPI cards — fully responsive */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
        {[
          {
            key: 'pending',
            label: 'En attente Wave',
            count: counts.pending,
            color: 'text-amber-600',
            bg: 'bg-amber-50/80 border-amber-200',
          },
          {
            key: 'active',
            label: 'Actifs',
            count: counts.active,
            color: 'text-emerald-700',
            bg: 'bg-emerald-50/80 border-emerald-200',
          },
          {
            key: 'expired',
            label: 'Expirés',
            count: counts.expired,
            color: 'text-text/60',
            bg: 'bg-white border-navy/10',
          },
          {
            key: 'rejected',
            label: 'Rejetés',
            count: counts.rejected,
            color: 'text-coral',
            bg: 'bg-rose-50/70 border-rose-200',
          },
        ].map((c) => {
          const isCurrent = filter === c.key;
          return (
            <button
              key={c.key}
              type="button"
              onClick={() => {
                setFilter(c.key);
                setCurrentPage(1);
              }}
              className={`text-center py-3 sm:py-4 px-2 rounded-2xl border transition-all text-left ${c.bg} ${
                isCurrent ? 'ring-2 ring-navy/30 shadow-md' : 'hover:border-navy/30'
              }`}
            >
              <p className={`text-2xl sm:text-3xl font-black ${c.color}`}>{c.count}</p>
              <p className="text-xs text-text/70 mt-1 font-semibold truncate">{c.label}</p>
            </button>
          );
        })}
      </div>

      {/* Search Bar */}
      <div className="bg-white rounded-2xl border border-navy/10 p-3 sm:p-4 shadow-sm flex items-center gap-2">
        <Search className="w-4 h-4 text-text/40 shrink-0 ml-1" />
        <input
          type="text"
          placeholder="Rechercher par élève, téléphone (+221...), formule ou réf. Wave..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full border-0 bg-transparent text-xs sm:text-sm text-navy placeholder:text-text/40 focus:outline-none focus:ring-0 p-0"
        />
        {search && (
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setCurrentPage(1);
            }}
            className="text-xs text-text/40 hover:text-navy px-2 py-1 font-semibold"
          >
            Effacer
          </button>
        )}
      </div>

      {/* Filter tabs with count badges */}
      <div className="flex gap-1.5 sm:gap-2 overflow-x-auto pb-1 no-scrollbar">
        {STATUS_FILTERS.map((f) => {
          const tabCount =
            f.key === 'tous'
              ? counts.all
              : counts[f.key as keyof typeof counts] ?? 0;
          const isActive = filter === f.key;

          return (
            <button
              key={f.key}
              type="button"
              onClick={() => {
                setFilter(f.key);
                setCurrentPage(1);
              }}
              className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 shrink-0 ${
                isActive
                  ? 'bg-navy text-white shadow-sm'
                  : 'bg-white border border-navy/10 text-text/70 hover:border-navy/30'
              }`}
            >
              <span>{f.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-surface text-text/60'
                }`}
              >
                {tabCount}
              </span>
            </button>
          );
        })}
      </div>

      {/* Subscriptions List */}
      {filtered.length === 0 ? (
        <Card className="py-12 text-center border-navy/10">
          <p className="text-text/50 text-sm font-semibold">Aucun abonnement trouvé.</p>
          <p className="text-xs text-text/40 mt-1">
            {search
              ? 'Aucun résultat ne correspond à votre recherche.'
              : 'Aucun abonnement dans cette catégorie.'}
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {paginatedSubs.map((sub) => {
            const rawPhone = sub.profiles?.phone ? sub.profiles.phone.replace(/[^0-9]/g, '') : '';

            return (
              <Card
                key={sub.id}
                className="cursor-pointer hover:border-turquoise/50 hover:shadow-sm transition-all border-navy/10"
                onClick={() => openDetail(sub)}
              >
                <CardContent className="p-3.5 sm:p-4">
                  {/* Responsive Card Layout */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    {/* Left: Student Name & Phone */}
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-navy/5 text-navy flex items-center justify-center shrink-0 border border-navy/10">
                        <Icon name="profil" size={26} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-navy text-sm truncate">
                            {fullName(sub.profiles)}
                          </p>
                          {rawPhone && (
                            <a
                              href={`https://wa.me/${rawPhone}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="p-1 rounded-md bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-emerald-800 transition-colors shrink-0"
                              title="Contacter sur WhatsApp"
                            >
                              <WhatsAppLogo size={13} />
                            </a>
                          )}
                        </div>
                        <p className="text-xs text-text/50 flex items-center gap-1 mt-0.5 font-mono">
                          <Phone className="w-3 h-3 text-text/40" />
                          <span>{sub.profiles?.phone ?? '—'}</span>
                        </p>
                      </div>
                    </div>

                    {/* Right: Plan, Status, Date and Arrow */}
                    <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2 sm:gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-navy/5">
                      <span className="inline-flex items-center gap-1.5 text-xs text-navy/80 bg-surface px-2.5 py-1 rounded-xl border border-navy/10 font-medium">
                        <WaveLogo size={14} />
                        <span className="font-bold">{sub.plans?.name ?? '1 Mois'}</span>
                        <span className="text-emerald-700 font-black">
                          {sub.plans ? formatFCFA(sub.plans.price_fcfa) : '—'}
                        </span>
                      </span>

                      <div className="flex items-center gap-2">
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
                        <span className="text-[11px] text-text/40 whitespace-nowrap">
                          {formatDate(sub.created_at)}
                        </span>
                        <ChevronRight className="w-4 h-4 text-text/30 hidden sm:block" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      {filtered.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalItems={filtered.length}
          pageSize={pageSize}
          onPageChange={setCurrentPage}
          onPageSizeChange={setPageSize}
          itemLabel="abonnements"
        />
      )}

      {/* Detail Modal */}
      {selected && (
        <Modal isOpen={true} onClose={() => setSelected(null)} title="Détail de l'abonnement">
          <div className="space-y-4 text-sm">
            {/* Student info */}
            <div className="rounded-xl bg-surface p-4 space-y-2 border border-navy/10">
              <p className="font-bold text-navy mb-1 flex items-center gap-2">
                <Icon name="profil" size={20} />
                <span>Informations Élève</span>
              </p>
              <p>
                <span className="text-text/50">Nom :</span>{' '}
                <strong className="text-navy">{fullName(selected.profiles)}</strong>
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-text/40" strokeWidth={2} />
                  <span className="text-text/50">Téléphone :</span>{' '}
                  <strong className="text-navy font-mono">{selected.profiles?.phone ?? '—'}</strong>
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
            <div className="rounded-xl bg-surface p-4 space-y-2 border border-navy/10">
              <p className="font-bold text-navy mb-1 flex items-center gap-2">
                <Icon name="abonnement" size={20} />
                <span>Formule &amp; Validité</span>
              </p>
              <p>
                <span className="text-text/50">Plan :</span>{' '}
                <strong className="text-navy">{selected.plans?.name ?? '—'}</strong> —{' '}
                <span className="text-emerald-700 font-black">
                  {selected.plans ? formatFCFA(selected.plans.price_fcfa) : '—'}
                </span>
                {selected.plans ? ` / ${formatDuration(selected.plans.duration_days)}` : ''}
              </p>
              <div className="flex items-center gap-2">
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
              </div>
              <p className="flex items-center gap-1 text-xs">
                <CalendarDays className="w-3.5 h-3.5 text-text/40" strokeWidth={2} />
                <span className="text-text/50">Période :</span>{' '}
                <strong className="text-navy">
                  {formatDate(selected.start_date)} → {formatDate(selected.end_date)}
                </strong>
              </p>
            </div>

            {/* Payment info */}
            {selected.payments?.length > 0 && (
              <div className="rounded-xl bg-surface p-4 space-y-1.5 border border-navy/10">
                <p className="font-bold text-navy mb-1 flex items-center gap-2">
                  <Icon name="paiement" size={20} />
                  <span>Paiement &amp; Réf. Wave</span>
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
                  <code className="bg-white border border-navy/10 rounded px-1.5 py-0.5 text-navy text-xs font-bold font-mono">
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
              <label className="block text-xs font-bold text-navy uppercase tracking-wider mb-1.5">
                Note administrative (optionnel) :
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="Motif de validation ou rejet, remarque…"
                className="w-full rounded-xl border border-navy/20 bg-white px-3 py-2 text-xs text-text placeholder:text-text/40 focus:outline-none focus:ring-2 focus:ring-turquoise/40 resize-none"
              />
            </div>

            {/* Actions */}
            {(selected.status === 'pending' || selected.status === 'suspended') && (
              <div className="flex gap-2 flex-wrap pt-2">
                <Button
                  variant="primary"
                  onClick={() => handleReview('activate')}
                  disabled={isPending}
                  className="flex-1 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
                >
                  <CheckCircle2 className="w-4 h-4" strokeWidth={2} />
                  <span>Valider &amp; Activer l&apos;accès</span>
                </Button>
                <Button
                  variant="coral"
                  onClick={() => handleReview('reject')}
                  disabled={isPending}
                  className="flex-1 flex items-center justify-center gap-2"
                >
                  <XCircle className="w-4 h-4" strokeWidth={2} />
                  <span>Rejeter</span>
                </Button>
              </div>
            )}
            {selected.status === 'active' && (
              <Button
                variant="outline"
                onClick={() => handleReview('suspend')}
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2 text-rose-700 border-rose-200 hover:bg-rose-50"
              >
                <PauseCircle className="w-4 h-4" strokeWidth={2} />
                <span>Suspendre temporairement</span>
              </Button>
            )}

            {/* Extend */}
            <div className="border-t border-navy/10 pt-4">
              <p className="text-xs font-bold text-navy uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-turquoise" strokeWidth={2} />
                <span>Prolonger la durée d&apos;abonnement</span>
              </p>
              <div className="flex gap-2">
                <select
                  value={extendDays}
                  onChange={(e) => setExtendDays(Number(e.target.value))}
                  className="flex-1 rounded-xl border border-navy/20 bg-white px-3 py-2 text-xs font-semibold text-navy focus:outline-none focus:ring-2 focus:ring-turquoise/40"
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
                  className="text-xs font-bold"
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
