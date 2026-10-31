'use client';

import React, { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { useToast } from '@/components/ui/toast';
import { toggleBanStudentAction, updateUserRoleAction } from '@/lib/admin/actions';
import { Download, CheckCircle2, AlertTriangle } from 'lucide-react';

interface ProfileItem {
  id: string;
  full_name: string | null;
  phone: string;
  role: 'student' | 'editor' | 'admin';
  avatar_url: string | null;
  is_banned: boolean;
  created_at: string;
  subscriptions: { id: string; status: string; ends_at: string }[];
}

interface Props {
  initialProfiles: ProfileItem[];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function ElevesManagerClient({ initialProfiles }: Props) {
  const { showToast } = useToast();
  const [profiles, setProfiles] = useState(initialProfiles);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | 'student' | 'editor' | 'admin'>('all');
  const [selectedUser, setSelectedUser] = useState<ProfileItem | null>(null);
  const [banReason, setBanReason] = useState('');
  const [isPending, startTransition] = useTransition();

  // Filter profiles
  const filtered = profiles.filter((p) => {
    const matchesSearch =
      (p.full_name?.toLowerCase().includes(search.toLowerCase()) ?? false) ||
      p.phone.includes(search);
    const matchesRole = roleFilter === 'all' || p.role === roleFilter;
    return matchesSearch && matchesRole;
  });

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

  // Export to CSV
  function exportCSV() {
    const headers = ['Nom', 'Téléphone', 'Rôle', 'Banni', 'Statut Abonnement', 'Date Inscription'];
    const rows = filtered.map((p) => {
      const activeSub = p.subscriptions?.find((s) => s.status === 'active');
      const subStatus = activeSub ? 'Actif' : 'Inactif';
      return [
        `"${p.full_name ?? ''}"`,
        `"${p.phone}"`,
        p.role,
        p.is_banned ? 'Oui' : 'Non',
        subStatus,
        `"${p.created_at}"`,
      ];
    });

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
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
    <div className="space-y-4">
      {/* Search and filters bar */}
      <div className="bg-white rounded-2xl border border-navy/10 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1 w-full sm:w-auto">
          <Input
            placeholder="Rechercher par nom ou numéro (+221...)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
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

          <Button variant="outline" size="sm" onClick={exportCSV} className="flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" strokeWidth={2} />
            <span>Exporter CSV</span>
          </Button>
        </div>
      </div>

      {/* Students list table */}
      <div className="bg-white rounded-2xl border border-navy/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface border-b border-navy/10 text-xs text-text/60 uppercase">
              <tr>
                <th className="px-5 py-3.5">Utilisateur</th>
                <th className="px-5 py-3.5">Téléphone</th>
                <th className="px-5 py-3.5">Rôle</th>
                <th className="px-5 py-3.5">Abonnement</th>
                <th className="px-5 py-3.5">Inscription</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-10 text-text/50">
                    Aucun élève trouvé.
                  </td>
                </tr>
              ) : (
                filtered.map((u) => {
                  const activeSub = u.subscriptions?.find((s) => s.status === 'active');

                  return (
                    <tr key={u.id} className="hover:bg-surface/30 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2.5">
                          <span className="font-semibold text-navy">
                            {u.full_name ?? 'Sans nom'}
                          </span>
                          {u.is_banned && (
                            <span className="text-[10px] bg-coral/15 text-coral font-bold px-1.5 py-0.5 rounded">
                              Suspendu
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-text/80 font-mono text-xs">{u.phone}</td>
                      <td className="px-5 py-3.5">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          u.role === 'admin'
                            ? 'bg-navy text-white'
                            : u.role === 'editor'
                            ? 'bg-turquoise/15 text-turquoise'
                            : 'bg-surface text-text/70'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <Badge status={activeSub ? 'active' : 'expired'} />
                      </td>
                      <td className="px-5 py-3.5 text-text/50 text-xs">
                        {formatDate(u.created_at)}
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs"
                          onClick={() => setSelectedUser(u)}
                        >
                          Fiche élève
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User details & moderation Modal */}
      {selectedUser && (
        <Modal
          isOpen
          onClose={() => setSelectedUser(null)}
          title={`Fiche élève — ${selectedUser.full_name ?? selectedUser.phone}`}
        >
          <div className="space-y-4 text-sm">
            <div className="rounded-xl bg-surface p-4 space-y-2">
              <p>
                <span className="text-text/50">Nom complet :</span>{' '}
                <strong>{selectedUser.full_name ?? 'Non renseigné'}</strong>
              </p>
              <p>
                <span className="text-text/50">Numéro de téléphone :</span>{' '}
                <code className="bg-white border border-navy/10 px-1.5 py-0.5 rounded text-navy">
                  {selectedUser.phone}
                </code>
              </p>
              <p>
                <span className="text-text/50">Inscrit le :</span>{' '}
                {formatDate(selectedUser.created_at)}
              </p>
              <p>
                <span className="text-text/50">Statut du compte :</span>{' '}
                <strong className={selectedUser.is_banned ? 'text-coral' : 'text-emerald-600'}>
                  {selectedUser.is_banned ? 'Compte Suspendu' : 'Compte Actif'}
                </strong>
              </p>
            </div>

            {/* Role switch */}
            <div>
              <label className="block text-xs font-semibold text-text/60 uppercase tracking-wider mb-1.5">
                Modifier le rôle
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
                        ? 'bg-navy text-white border-navy'
                        : 'bg-white border-navy/20 hover:border-turquoise'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Ban / Unban section */}
            <div className="border-t border-navy/10 pt-4 space-y-2">
              <label className="block text-xs font-semibold text-text/60 uppercase tracking-wider">
                {selectedUser.is_banned ? 'Lever la suspension' : 'Suspendre le compte'}
              </label>
              {!selectedUser.is_banned && (
                <textarea
                  value={banReason}
                  onChange={(e) => setBanReason(e.target.value)}
                  rows={2}
                  placeholder="Motif de suspension (ex : partage frauduleux de compte)…"
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

