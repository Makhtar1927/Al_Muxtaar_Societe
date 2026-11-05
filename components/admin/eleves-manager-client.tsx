'use client';

import React, { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { useToast } from '@/components/ui/toast';
import {
  toggleBanStudentAction,
  updateUserRoleAction,
  validateStudentRegistrationAction,
  extendStudentAccessFromElevesAction,
  suspendStudentAccessAction,
} from '@/lib/admin/actions';
import {
  Download,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  ShieldCheck,
  UserCheck,
  Calendar,
  Lock,
} from 'lucide-react';

export interface PlanOption {
  id: string;
  name: string;
  duration_days: number;
  price_fcfa: number;
}

export interface ProfileItem {
  id: string;
  full_name: string | null;
  phone: string;
  role: 'student' | 'editor' | 'admin';
  level?: string;
  track?: string;
  avatar_url: string | null;
  is_banned: boolean;
  created_at: string;
  subscriptions: { id: string; status: string; ends_at: string }[];
}

interface Props {
  initialProfiles: ProfileItem[];
  availablePlans?: PlanOption[];
}

function formatDate(iso: string | null | undefined) {
  if (!iso) return '—';
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatFCFA(n: number) {
  return n.toLocaleString('fr-FR') + ' FCFA';
}

type StatusFilter = 'all' | 'decouverte' | 'pending' | 'active' | 'banned';

export default function ElevesManagerClient({ initialProfiles, availablePlans = [] }: Props) {
  const { showToast } = useToast();
  const [profiles, setProfiles] = useState<ProfileItem[]>(initialProfiles);

  React.useEffect(() => {
    setProfiles(initialProfiles);
  }, [initialProfiles]);

  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'student' | 'editor' | 'admin'>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  // Selected student for full details modal
  const [selectedUser, setSelectedUser] = useState<ProfileItem | null>(null);

  // Quick validation modal state
  const [validatingUser, setValidatingUser] = useState<ProfileItem | null>(null);
  const [selectedPlanId, setSelectedPlanId] = useState<string>(availablePlans[0]?.id || '');
  const [customDays, setCustomDays] = useState<number>(availablePlans[0]?.duration_days || 30);
  const [validationNotes, setValidationNotes] = useState<string>('');

  const [banReason, setBanReason] = useState('');
  const [isPending, startTransition] = useTransition();

  // Metrics
  const totalCount = profiles.length;
  const decouverteCount = profiles.filter(
    (p) => !p.subscriptions?.some((s) => s.status === 'active' || s.status === 'pending')
  ).length;
  const pendingWaveCount = profiles.filter((p) =>
    p.subscriptions?.some((s) => s.status === 'pending')
  ).length;
  const activeCount = profiles.filter((p) =>
    p.subscriptions?.some((s) => s.status === 'active')
  ).length;

  // Filter profiles
  const filtered = profiles.filter((p) => {
    const fullName = p.full_name?.toLowerCase() ?? '';
    const phone = p.phone ?? '';
    const query = search.trim().toLowerCase();
    const matchesSearch =
      query === '' || fullName.includes(query) || phone.includes(query);

    const matchesRole = roleFilter === 'all' || p.role === roleFilter;

    const hasActive = p.subscriptions?.some((s) => s.status === 'active');
    const hasPending = p.subscriptions?.some((s) => s.status === 'pending');

    let matchesStatus = true;
    if (statusFilter === 'decouverte') {
      matchesStatus = !hasActive && !hasPending && !p.is_banned;
    } else if (statusFilter === 'pending') {
      matchesStatus = !hasActive && hasPending;
    } else if (statusFilter === 'active') {
      matchesStatus = hasActive;
    } else if (statusFilter === 'banned') {
      matchesStatus = p.is_banned;
    }

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Action: Validate student registration & activate subscription
  function handleValidateRegistration(user: ProfileItem, planId?: string, days?: number, notes?: string) {
    const chosenPlan = availablePlans.find((p) => p.id === planId) || availablePlans[0];
    const duration = days || chosenPlan?.duration_days || 30;

    startTransition(async () => {
      const res = await validateStudentRegistrationAction(
        user.id,
        planId || chosenPlan?.id,
        duration,
        notes || 'Validation manuelle effectuée par l’administrateur'
      );

      if (res.success) {
        const newEndDate = new Date(Date.now() + duration * 24 * 60 * 60 * 1000).toISOString();

        // Update local state instantly
        setProfiles((prev) =>
          prev.map((item) => {
            if (item.id === user.id) {
              const updatedSubs = [
                { id: `sub_${Date.now()}`, status: 'active', ends_at: newEndDate },
                ...(item.subscriptions || []).filter((s) => s.status !== 'pending' && s.status !== 'active'),
              ];
              return { ...item, subscriptions: updatedSubs };
            }
            return item;
          })
        );

        if (selectedUser?.id === user.id) {
          setSelectedUser((prev) =>
            prev
              ? {
                  ...prev,
                  subscriptions: [
                    { id: `sub_${Date.now()}`, status: 'active', ends_at: newEndDate },
                    ...(prev.subscriptions || []).filter((s) => s.status !== 'pending' && s.status !== 'active'),
                  ],
                }
              : null
          );
        }

        setValidatingUser(null);
        setValidationNotes('');
        showToast(res.message || 'Inscription validée avec succès !', 'success');
      } else {
        showToast(res.error, 'error');
      }
    });
  }

  // Action: Extend subscription
  function handleExtendStudent(user: ProfileItem, days: number = 30) {
    startTransition(async () => {
      const res = await extendStudentAccessFromElevesAction(user.id, days);
      if (res.success) {
        const newEndDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
        setProfiles((prev) =>
          prev.map((item) => {
            if (item.id === user.id) {
              return {
                ...item,
                subscriptions: [
                  { id: `sub_${Date.now()}`, status: 'active', ends_at: newEndDate },
                  ...(item.subscriptions || []).filter((s) => s.status !== 'active'),
                ],
              };
            }
            return item;
          })
        );
        if (selectedUser?.id === user.id) {
          setSelectedUser((prev) =>
            prev
              ? {
                  ...prev,
                  subscriptions: [
                    { id: `sub_${Date.now()}`, status: 'active', ends_at: newEndDate },
                    ...(prev.subscriptions || []).filter((s) => s.status !== 'active'),
                  ],
                }
              : null
          );
        }
        showToast(res.message || 'Abonnement prolongé avec succès', 'success');
      } else {
        showToast(res.error, 'error');
      }
    });
  }

  // Action: Suspend access
  function handleSuspendAccess(user: ProfileItem) {
    startTransition(async () => {
      const res = await suspendStudentAccessAction(user.id, 'Suspension par admin');
      if (res.success) {
        setProfiles((prev) =>
          prev.map((item) => {
            if (item.id === user.id) {
              return {
                ...item,
                subscriptions: (item.subscriptions || []).map((s) =>
                  s.status === 'active' ? { ...s, status: 'suspended' } : s
                ),
              };
            }
            return item;
          })
        );
        if (selectedUser?.id === user.id) {
          setSelectedUser((prev) =>
            prev
              ? {
                  ...prev,
                  subscriptions: (prev.subscriptions || []).map((s) =>
                    s.status === 'active' ? { ...s, status: 'suspended' } : s
                  ),
                }
              : null
          );
        }
        showToast(res.message || 'Accès suspendu', 'success');
      } else {
        showToast(res.error, 'error');
      }
    });
  }

  // Action: Toggle ban
  function handleToggleBan(user: ProfileItem) {
    const nextBanned = !user.is_banned;
    startTransition(async () => {
      const res = await toggleBanStudentAction(user.id, nextBanned, banReason);
      if (res.success) {
        setProfiles((prev) =>
          prev.map((item) => (item.id === user.id ? { ...item, is_banned: nextBanned } : item))
        );
        setSelectedUser(null);
        setBanReason('');
        showToast(res.message ?? 'Statut mis à jour', 'success');
      } else {
        showToast(res.error, 'error');
      }
    });
  }

  // Action: Change role
  function handleRoleChange(user: ProfileItem, newRole: 'student' | 'editor' | 'admin') {
    startTransition(async () => {
      const res = await updateUserRoleAction(user.id, newRole);
      if (res.success) {
        setProfiles((prev) =>
          prev.map((item) => (item.id === user.id ? { ...item, role: newRole } : item))
        );
        if (selectedUser?.id === user.id) {
          setSelectedUser({ ...selectedUser, role: newRole });
        }
        showToast(res.message ?? 'Rôle mis à jour', 'success');
      } else {
        showToast(res.error, 'error');
      }
    });
  }

  // Export CSV
  function exportCSV() {
    const headers = ['Nom', 'Téléphone', 'Classe/Série', 'Rôle', 'Banni', 'Statut Inscription', 'Date Inscription'];
    const rows = filtered.map((p) => {
      const activeSub = p.subscriptions?.find((s) => s.status === 'active');
      const pendingSub = p.subscriptions?.find((s) => s.status === 'pending');
      const statusText = activeSub ? 'Abonné (Validé)' : pendingSub ? 'En attente Wave' : 'Découverte (1ère leçon)';
      return [
        `"${p.full_name ?? ''}"`,
        `"${p.phone}"`,
        `"${p.level ?? 'Terminale'} ${p.track ? `(${p.track})` : ''}"`,
        p.role,
        p.is_banned ? 'Oui' : 'Non',
        statusText,
        `"${p.created_at}"`,
      ];
    });

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `eleves_almuxtaar_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Export CSV téléchargé', 'success');
  }

  return (
    <div className="space-y-6">
      {/* KPI Cards — Quick access and filters */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <button
          type="button"
          onClick={() => setStatusFilter('all')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            statusFilter === 'all'
              ? 'border-navy bg-navy text-white shadow-md'
              : 'border-navy/10 bg-white hover:border-navy/30'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase tracking-wider ${statusFilter === 'all' ? 'text-white/70' : 'text-navy/60'}`}>
              Total Inscrits
            </span>
            <UserCheck className={`w-4 h-4 ${statusFilter === 'all' ? 'text-white' : 'text-navy'}`} />
          </div>
          <p className={`text-2xl sm:text-3xl font-black mt-2 ${statusFilter === 'all' ? 'text-white' : 'text-navy'}`}>
            {totalCount}
          </p>
          <p className={`text-[11px] mt-0.5 ${statusFilter === 'all' ? 'text-white/70' : 'text-text/60'}`}>
            Tous comptes confondus
          </p>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter('decouverte')}
          className={`p-4 rounded-2xl border text-left transition-all relative overflow-hidden ${
            statusFilter === 'decouverte'
              ? 'border-amber-500 bg-amber-500 text-white shadow-md'
              : 'border-amber-200 bg-amber-50/80 hover:border-amber-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase tracking-wider ${statusFilter === 'decouverte' ? 'text-white/90' : 'text-amber-900'}`}>
              À Valider (Découverte)
            </span>
            <Clock className={`w-4 h-4 ${statusFilter === 'decouverte' ? 'text-white' : 'text-amber-600'}`} />
          </div>
          <p className={`text-2xl sm:text-3xl font-black mt-2 ${statusFilter === 'decouverte' ? 'text-white' : 'text-amber-950'}`}>
            {decouverteCount}
          </p>
          <div className="flex items-center gap-1 mt-0.5">
            {decouverteCount > 0 ? (
              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded-full ${statusFilter === 'decouverte' ? 'bg-white/20 text-white' : 'bg-amber-200/90 text-amber-900 animate-pulse'}`}>
                1ère leçon seule • Bouton valider actif
              </span>
            ) : (
              <span className={`text-[11px] ${statusFilter === 'decouverte' ? 'text-white/70' : 'text-amber-800/70'}`}>
                Aucun en attente
              </span>
            )}
          </div>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter('pending')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            statusFilter === 'pending'
              ? 'border-gold bg-gold text-navy shadow-md'
              : 'border-gold/30 bg-gold/10 hover:border-gold/50'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase tracking-wider ${statusFilter === 'pending' ? 'text-navy' : 'text-amber-900'}`}>
              En attente Wave
            </span>
            <Clock className="w-4 h-4 text-amber-700" />
          </div>
          <p className="text-2xl sm:text-3xl font-black mt-2 text-navy">
            {pendingWaveCount}
          </p>
          <p className={`text-[11px] mt-0.5 ${statusFilter === 'pending' ? 'text-navy/80' : 'text-text/60'}`}>
            Preuve de paiement reçue
          </p>
        </button>

        <button
          type="button"
          onClick={() => setStatusFilter('active')}
          className={`p-4 rounded-2xl border text-left transition-all ${
            statusFilter === 'active'
              ? 'border-emerald-600 bg-emerald-600 text-white shadow-md'
              : 'border-emerald-200 bg-emerald-50/80 hover:border-emerald-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase tracking-wider ${statusFilter === 'active' ? 'text-white/90' : 'text-emerald-900'}`}>
              Abonnés Actifs
            </span>
            <ShieldCheck className={`w-4 h-4 ${statusFilter === 'active' ? 'text-white' : 'text-emerald-600'}`} />
          </div>
          <p className={`text-2xl sm:text-3xl font-black mt-2 ${statusFilter === 'active' ? 'text-white' : 'text-emerald-950'}`}>
            {activeCount}
          </p>
          <p className={`text-[11px] mt-0.5 ${statusFilter === 'active' ? 'text-white/70' : 'text-emerald-800/70'}`}>
            Accès complet illimité
          </p>
        </button>
      </div>

      {/* Search and filters bar */}
      <div className="bg-white rounded-2xl border border-navy/10 p-4 shadow-sm flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="flex-1">
          <Input
            placeholder="Rechercher par nom, prénom ou téléphone (+221...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}
            className="rounded-xl border border-navy/20 bg-surface px-3 py-2 text-xs font-semibold text-navy focus:outline-none focus:ring-2 focus:ring-turquoise/40"
          >
            <option value="all">Tous les statuts ({profiles.length})</option>
            <option value="decouverte">⏳ Découverte (1ère leçon) — À valider ({decouverteCount})</option>
            <option value="pending">🟡 En attente Wave ({pendingWaveCount})</option>
            <option value="active">✅ Abonnés actifs ({activeCount})</option>
            <option value="banned">🚫 Suspendus</option>
          </select>

          {/* Role filter */}
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as typeof roleFilter)}
            className="rounded-xl border border-navy/20 bg-surface px-3 py-2 text-xs text-text focus:outline-none focus:ring-2 focus:ring-turquoise/40"
          >
            <option value="all">Tous les rôles</option>
            <option value="student">Élèves</option>
            <option value="editor">Éditeurs</option>
            <option value="admin">Administrateurs</option>
          </select>

          <Button variant="outline" size="sm" onClick={exportCSV} className="flex items-center gap-1.5 whitespace-nowrap">
            <Download className="w-3.5 h-3.5" strokeWidth={2} />
            <span>Exporter</span>
          </Button>
        </div>
      </div>

      {/* Active filter reminder bar */}
      {statusFilter !== 'all' && (
        <div className="flex items-center justify-between bg-navy/5 border border-navy/10 rounded-xl px-4 py-2 text-xs text-navy">
          <div className="flex items-center gap-2">
            <span className="font-semibold">Filtre appliqué :</span>
            <span className="font-bold underline">
              {statusFilter === 'decouverte'
                ? 'Élèves en Découverte (1ère leçon uniquement) — En attente de validation'
                : statusFilter === 'pending'
                ? 'Paiements Wave en attente de vérification'
                : statusFilter === 'active'
                ? 'Abonnés avec accès complet actif'
                : 'Comptes suspendus'}
            </span>
            <span className="text-text/60">({filtered.length} élève{filtered.length > 1 ? 's' : ''})</span>
          </div>
          <button
            type="button"
            onClick={() => setStatusFilter('all')}
            className="text-turquoise font-bold hover:underline ml-2"
          >
            Réinitialiser
          </button>
        </div>
      )}

      {/* Students list table */}
      <div className="bg-white rounded-2xl border border-navy/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface border-b border-navy/10 text-xs text-text/60 uppercase">
              <tr>
                <th className="px-5 py-3.5">Élève</th>
                <th className="px-5 py-3.5">Classe &amp; Filière</th>
                <th className="px-5 py-3.5">Téléphone</th>
                <th className="px-5 py-3.5">Statut Inscription / Accès</th>
                <th className="px-5 py-3.5">Date Inscription</th>
                <th className="px-5 py-3.5 text-right">Actions Directes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-text/50">
                    <div className="max-w-sm mx-auto space-y-2">
                      <p className="font-semibold text-navy text-base">Aucun élève trouvé</p>
                      <p className="text-xs text-text/60">
                        {statusFilter !== 'all'
                          ? 'Aucun élève ne correspond au filtre sélectionné.'
                          : 'Aucun compte ne correspond à votre recherche.'}
                      </p>
                      {statusFilter !== 'all' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setStatusFilter('all')}
                          className="mt-2 text-xs"
                        >
                          Afficher tous les inscrits
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((u) => {
                  const activeSub = u.subscriptions?.find((s) => s.status === 'active');
                  const pendingSub = u.subscriptions?.find((s) => s.status === 'pending');

                  return (
                    <tr key={u.id} className="hover:bg-surface/40 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <div>
                            <span className="font-semibold text-navy block">
                              {u.full_name ?? 'Sans nom'}
                            </span>
                            <div className="flex items-center gap-1 mt-0.5">
                              <span
                                className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                                  u.role === 'admin'
                                    ? 'bg-navy text-white'
                                    : u.role === 'editor'
                                    ? 'bg-turquoise/15 text-turquoise'
                                    : 'text-text/50'
                                }`}
                              >
                                {u.role === 'student' ? 'Élève' : u.role}
                              </span>
                              {u.is_banned && (
                                <span className="text-[10px] bg-coral/15 text-coral font-bold px-1.5 py-0.2 rounded">
                                  Suspendu
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="text-xs font-semibold text-navy/80 bg-surface px-2.5 py-1 rounded-lg border border-navy/10 whitespace-nowrap">
                          {u.level ?? 'Terminale'} {u.track ? `(${u.track})` : ''}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-text/80 font-mono text-xs">{u.phone}</td>
                      <td className="px-5 py-3.5">
                        {activeSub ? (
                          <div className="space-y-0.5">
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              Abonné (Accès actif)
                            </span>
                            {activeSub.ends_at && (
                              <p className="text-[10px] text-text/60">
                                Jusqu&apos;au {formatDate(activeSub.ends_at)}
                              </p>
                            )}
                          </div>
                        ) : pendingSub ? (
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300 animate-pulse">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                            En attente Wave
                          </span>
                        ) : (
                          <div className="space-y-0.5">
                            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-100/90 px-2 py-0.5 rounded-full border border-amber-300">
                              <Clock className="w-3 h-3 text-amber-700" />
                              Découverte (1ère leçon)
                            </span>
                            <p className="text-[10px] text-amber-700 font-medium">
                              En attente de validation
                            </p>
                          </div>
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-text/50 text-xs whitespace-nowrap">
                        {formatDate(u.created_at)}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {/* PRIMARY ACTION: Validate registration button if not active */}
                          {!activeSub ? (
                            <Button
                              size="sm"
                              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm px-3 py-1.5 rounded-xl border border-emerald-500/30 transition-all hover:scale-102"
                              disabled={isPending}
                              onClick={() => {
                                setValidatingUser(u);
                                setSelectedPlanId(availablePlans[0]?.id || '');
                                setCustomDays(availablePlans[0]?.duration_days || 30);
                              }}
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Valider l&apos;inscription</span>
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-xs text-emerald-800 border-emerald-200 hover:bg-emerald-50 font-semibold"
                              disabled={isPending}
                              onClick={() => handleExtendStudent(u, 30)}
                            >
                              +30 j
                            </Button>
                          )}

                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs text-navy/80 hover:text-navy"
                            onClick={() => setSelectedUser(u)}
                          >
                            Fiche élève
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* QUICK VALIDATION MODAL (Bouton Valider l'inscription) */}
      {validatingUser && (
        <Modal
          isOpen
          onClose={() => setValidatingUser(null)}
          title={`Valider l'inscription — ${validatingUser.full_name || validatingUser.phone}`}
          description="Attribuez un abonnement actif à cet élève pour lui débloquer immédiatement l'accès complet à tous les cours et exercices."
        >
          <div className="space-y-5 text-sm pt-1">
            <div className="rounded-2xl bg-amber-50/90 border border-amber-200 p-4 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
                <Clock className="w-4 h-4 text-amber-700" />
                <span>Statut actuel : Découverte (1ère leçon gratuite uniquement)</span>
              </div>
              <p className="text-xs text-amber-800 leading-relaxed">
                Cet élève vient de s&apos;inscrire. Valider son inscription créera un abonnement actif et lui ouvrira les 13 chapitres, vidéos, simulateurs et quiz sans restriction.
              </p>
            </div>

            <div className="space-y-3">
              <label className="block text-xs font-bold text-navy uppercase tracking-wider">
                Choisir la formule d&apos;abonnement à activer :
              </label>

              {availablePlans.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {availablePlans.map((plan) => {
                    const isSelected = selectedPlanId === plan.id;
                    return (
                      <button
                        key={plan.id}
                        type="button"
                        onClick={() => {
                          setSelectedPlanId(plan.id);
                          setCustomDays(plan.duration_days);
                        }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-2 ring-emerald-500/30'
                            : 'border-navy/10 bg-white hover:border-turquoise'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs">{plan.name}</span>
                          <span className="text-xs font-black text-emerald-700">
                            {formatFCFA(plan.price_fcfa)}
                          </span>
                        </div>
                        <p className="text-[11px] text-text/60 mt-1">
                          Durée : <strong>{plan.duration_days} jours</strong>
                        </p>
                      </button>
                    );
                  })}
                </div>
              ) : null}

              <div>
                <label className="block text-xs font-medium text-text/70 mb-1">
                  Durée personnalisée (en jours) :
                </label>
                <input
                  type="number"
                  min={1}
                  max={365}
                  value={customDays}
                  onChange={(e) => setCustomDays(parseInt(e.target.value, 10) || 30)}
                  className="w-full rounded-xl border border-navy/20 bg-white px-3 py-2 text-xs font-bold text-navy focus:outline-none focus:ring-2 focus:ring-turquoise/40"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-text/70 mb-1">
                  Note administrative (Optionnel) :
                </label>
                <input
                  type="text"
                  placeholder="Ex : Paiement en espèces reçu, transfert direct Wave, élève boursier…"
                  value={validationNotes}
                  onChange={(e) => setValidationNotes(e.target.value)}
                  className="w-full rounded-xl border border-navy/20 bg-white px-3 py-2 text-xs text-navy focus:outline-none focus:ring-2 focus:ring-turquoise/40"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-navy/10">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setValidatingUser(null)}
                disabled={isPending}
              >
                Annuler
              </Button>

              <Button
                size="sm"
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 px-4 shadow-sm"
                disabled={isPending}
                onClick={() =>
                  handleValidateRegistration(
                    validatingUser,
                    selectedPlanId,
                    customDays,
                    validationNotes
                  )
                }
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>
                  {isPending ? 'Validation en cours…' : `Confirmer & Activer (${customDays} jours)`}
                </span>
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* FULL STUDENT PROFILE MODAL */}
      {selectedUser && (
        <Modal
          isOpen
          onClose={() => setSelectedUser(null)}
          title={`Fiche élève — ${selectedUser.full_name ?? selectedUser.phone}`}
        >
          <div className="space-y-5 text-sm">
            {/* Student metadata */}
            <div className="rounded-2xl bg-surface p-4 space-y-2 border border-navy/10">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-text/50 text-xs">Nom complet :</span>
                  <p className="font-bold text-navy text-base">
                    {selectedUser.full_name ?? 'Non renseigné'}
                  </p>
                </div>
                <span
                  className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    selectedUser.role === 'admin'
                      ? 'bg-navy text-white'
                      : selectedUser.role === 'editor'
                      ? 'bg-turquoise/20 text-turquoise'
                      : 'bg-white border border-navy/10 text-navy'
                  }`}
                >
                  {selectedUser.role}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 text-xs">
                <div>
                  <span className="text-text/50 block">Téléphone :</span>
                  <code className="bg-white border border-navy/10 px-1.5 py-0.5 rounded text-navy font-bold">
                    {selectedUser.phone}
                  </code>
                </div>
                <div>
                  <span className="text-text/50 block">Classe &amp; Filière :</span>
                  <strong className="text-navy">
                    {selectedUser.level ?? 'Terminale'} {selectedUser.track ? `(${selectedUser.track})` : ''}
                  </strong>
                </div>
                <div>
                  <span className="text-text/50 block">Inscrit le :</span>
                  <strong>{formatDate(selectedUser.created_at)}</strong>
                </div>
                <div>
                  <span className="text-text/50 block">Statut du compte :</span>
                  <strong className={selectedUser.is_banned ? 'text-coral' : 'text-emerald-600'}>
                    {selectedUser.is_banned ? 'Suspendu' : 'Actif'}
                  </strong>
                </div>
              </div>
            </div>

            {/* SUBSCRIPTION & ACCESS MANAGEMENT SECTION */}
            <div className="rounded-2xl border border-navy/15 bg-white p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-navy uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-turquoise" />
                  <span>Droit d&apos;accès &amp; Abonnement</span>
                </span>
                {selectedUser.subscriptions?.some((s) => s.status === 'active') ? (
                  <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                    Abonné Actif
                  </span>
                ) : (
                  <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">
                    Découverte (Non validé)
                  </span>
                )}
              </div>

              {selectedUser.subscriptions?.some((s) => s.status === 'active') ? (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-950 space-y-1">
                    <p className="font-bold flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Accès complet illimité actif</span>
                    </p>
                    <p className="text-emerald-800">
                      Expire le :{' '}
                      <strong>
                        {formatDate(
                          selectedUser.subscriptions.find((s) => s.status === 'active')?.ends_at
                        )}
                      </strong>
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs text-emerald-800 border-emerald-300 hover:bg-emerald-50"
                      disabled={isPending}
                      onClick={() => handleExtendStudent(selectedUser, 30)}
                    >
                      +30 jours
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 text-xs text-emerald-800 border-emerald-300 hover:bg-emerald-50"
                      disabled={isPending}
                      onClick={() => handleExtendStudent(selectedUser, 90)}
                    >
                      +90 jours
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs text-rose-700 border-rose-200 hover:bg-rose-50"
                      disabled={isPending}
                      onClick={() => handleSuspendAccess(selectedUser)}
                    >
                      Suspendre
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
                    <p className="font-bold flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-600" />
                      <span>Compte non validé — Accès restreint à la 1ère leçon</span>
                    </p>
                    <p className="text-amber-800">
                      Validez l&apos;inscription de cet élève pour débloquer l&apos;accès complet à tous les chapitres de Terminale S2.
                    </p>
                  </div>

                  <Button
                    size="sm"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 py-2.5 rounded-xl shadow-sm"
                    disabled={isPending}
                    onClick={() => {
                      setSelectedUser(null);
                      setValidatingUser(selectedUser);
                      setSelectedPlanId(availablePlans[0]?.id || '');
                      setCustomDays(availablePlans[0]?.duration_days || 30);
                    }}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Valider l&apos;inscription &amp; Activer l&apos;accès</span>
                  </Button>
                </div>
              )}
            </div>

            {/* Role switch */}
            <div>
              <label className="block text-xs font-semibold text-text/60 uppercase tracking-wider mb-1.5">
                Modifier le rôle système
              </label>
              <div className="flex gap-2">
                {(['student', 'editor', 'admin'] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => handleRoleChange(selectedUser, r)}
                    disabled={isPending || selectedUser.role === r}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                      selectedUser.role === r
                        ? 'bg-navy text-white border-navy font-bold'
                        : 'bg-white border-navy/20 hover:border-turquoise'
                    }`}
                  >
                    {r === 'student' ? 'Élève' : r === 'editor' ? 'Éditeur' : 'Admin'}
                  </button>
                ))}
              </div>
            </div>

            {/* Ban / Unban section */}
            <div className="border-t border-navy/10 pt-4 space-y-2">
              <label className="block text-xs font-semibold text-text/60 uppercase tracking-wider">
                {selectedUser.is_banned ? 'Lever la suspension du compte' : 'Suspendre le compte élève'}
              </label>
              {!selectedUser.is_banned && (
                <textarea
                  value={banReason}
                  onChange={(e) => setBanReason(e.target.value)}
                  rows={2}
                  placeholder="Motif de suspension (ex : partage non autorisé de compte)…"
                  className="w-full rounded-xl border border-navy/20 bg-white p-2.5 text-xs text-text focus:outline-none focus:ring-2 focus:ring-turquoise/40 resize-none"
                />
              )}
              <Button
                variant={selectedUser.is_banned ? 'secondary' : 'coral'}
                size="sm"
                onClick={() => handleToggleBan(selectedUser)}
                disabled={isPending}
                className="w-full flex items-center justify-center gap-2"
              >
                {selectedUser.is_banned ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" strokeWidth={2} />
                    <span>Réactiver le compte</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="w-4 h-4" strokeWidth={2} />
                    <span>Suspendre le compte</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
