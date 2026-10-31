'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/toast';

interface AuditLog {
  id: string;
  action: string;
  target_type: string;
  target_id: string | null;
  meta: Record<string, unknown> | null;
  created_at: string;
  profiles: { full_name: string | null; phone: string } | null;
}

interface Props {
  initialLogs: AuditLog[];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function JournalViewerClient({ initialLogs }: Props) {
  const { showToast } = useToast();
  const [logs] = useState(initialLogs);
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('all');

  const filtered = logs.filter((log) => {
    const actorName = log.profiles?.full_name?.toLowerCase() ?? '';
    const action = log.action.toLowerCase();
    const target = log.target_type.toLowerCase();
    const query = search.toLowerCase();

    const matchesSearch =
      actorName.includes(query) ||
      action.includes(query) ||
      target.includes(query);

    const matchesAction =
      actionFilter === 'all' ||
      (actionFilter === 'subscription' && action.startsWith('subscription')) ||
      (actionFilter === 'student' && action.startsWith('student')) ||
      (actionFilter === 'plan' && action.startsWith('plan'));

    return matchesSearch && matchesAction;
  });

  function exportCSV() {
    const headers = ['Date', 'Acteur', 'Action', 'Type Cible', 'ID Cible', 'Détails'];
    const rows = filtered.map((l) => [
      `"${l.created_at}"`,
      `"${l.profiles?.full_name ?? l.profiles?.phone ?? 'Admin'}"`,
      `"${l.action}"`,
      `"${l.target_type}"`,
      `"${l.target_id ?? ''}"`,
      `"${JSON.stringify(l.meta ?? {}).replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `journal_audit_almuxtaar_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Journal exporté en CSV', 'success');
  }

  return (
    <div className="space-y-4">
      {/* Filters bar */}
      <div className="bg-white rounded-2xl border border-navy/10 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex-1 w-full sm:w-auto">
          <Input
            placeholder="Filtrer par action, acteur ou cible…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
          <select
            value={actionFilter}
            onChange={(e) => setActionFilter(e.target.value)}
            className="rounded-xl border border-navy/20 bg-surface px-3 py-2 text-xs text-text focus:outline-none focus:ring-2 focus:ring-turquoise/40"
          >
            <option value="all">Toutes les actions</option>
            <option value="subscription">Abonnements</option>
            <option value="student">Comptes élèves</option>
            <option value="plan">Tarifs & Plans</option>
          </select>

          <Button variant="outline" size="sm" onClick={exportCSV}>
            📥 Exporter CSV
          </Button>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-2xl border border-navy/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface border-b border-navy/10 text-xs text-text/60 uppercase">
              <tr>
                <th className="px-5 py-3.5">Date & Heure</th>
                <th className="px-5 py-3.5">Administrateur</th>
                <th className="px-5 py-3.5">Action</th>
                <th className="px-5 py-3.5">Cible</th>
                <th className="px-5 py-3.5">Détails</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-text/50">
                    Aucun événement d&apos;audit trouvé.
                  </td>
                </tr>
              ) : (
                filtered.map((log) => (
                  <tr key={log.id} className="hover:bg-surface/30 transition-colors">
                    <td className="px-5 py-3.5 text-text/60 text-xs whitespace-nowrap">
                      {formatDate(log.created_at)}
                    </td>
                    <td className="px-5 py-3.5 font-medium text-navy text-xs">
                      {log.profiles?.full_name ?? log.profiles?.phone ?? 'Système'}
                    </td>
                    <td className="px-5 py-3.5">
                      <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-surface border border-navy/10 text-navy">
                        {log.action}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-text/70 capitalize">
                      {log.target_type}
                    </td>
                    <td className="px-5 py-3.5 text-xs text-text/60 font-mono max-w-xs truncate">
                      {log.meta ? JSON.stringify(log.meta) : '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

