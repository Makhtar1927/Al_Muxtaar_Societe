'use client';

import React, { useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';
import { useToast } from '@/components/ui/toast';
import { Icon } from '@/components/ui/icon';
import { createTestErrorAction } from '@/lib/admin/actions';
import {
  Download,
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Copy,
  Bug,
  ShieldAlert,
  Search,
  Filter,
} from 'lucide-react';

export interface AuditLogItem {
  id: string;
  action: string;
  target_type: string;
  target_id: string | null;
  meta: Record<string, any> | null;
  created_at: string;
  profiles: { full_name: string | null; phone: string } | null;
}

interface Props {
  initialLogs: AuditLogItem[];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

function isErrorLog(log: AuditLogItem) {
  return (
    log.action.startsWith('error.') ||
    log.target_type === 'exception' ||
    log.meta?.severity !== undefined ||
    log.meta?.error !== undefined ||
    log.meta?.stack !== undefined
  );
}

export default function JournalViewerClient({ initialLogs }: Props) {
  const { showToast } = useToast();
  const [logs, setLogs] = useState(initialLogs);
  const [activeTab, setActiveTab] = useState<'audit' | 'errors'>('audit');
  const [search, setSearch] = useState('');
  const [actionFilter, setActionFilter] = useState('all');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [pageSize, setPageSize] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLog, setSelectedLog] = useState<AuditLogItem | null>(null);
  const [isPending, startTransition] = useTransition();

  React.useEffect(() => {
    setLogs(initialLogs);
  }, [initialLogs]);

  // Réinitialiser la page quand on change d'onglet ou de filtre
  React.useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, search, actionFilter, severityFilter, pageSize]);

  // 1. Séparation des logs d'audit et des logs d'erreurs
  const auditLogsList = logs.filter((l) => !isErrorLog(l));
  const errorLogsList = logs.filter((l) => isErrorLog(l));

  // 2. Filtrage selon l'onglet actif
  const currentList = activeTab === 'audit' ? auditLogsList : errorLogsList;

  const filtered = currentList.filter((log) => {
    const actorName = log.profiles?.full_name?.toLowerCase() ?? '';
    const phone = log.profiles?.phone ?? '';
    const action = log.action.toLowerCase();
    const target = (log.target_type ?? '').toLowerCase();
    const message = (log.meta?.message ?? '').toLowerCase();
    const path = (log.meta?.path ?? '').toLowerCase();
    const query = search.trim().toLowerCase();

    const matchesSearch =
      query === '' ||
      actorName.includes(query) ||
      phone.includes(query) ||
      action.includes(query) ||
      target.includes(query) ||
      message.includes(query) ||
      path.includes(query);

    if (activeTab === 'audit') {
      const matchesAction =
        actionFilter === 'all' ||
        (actionFilter === 'subscription' && action.startsWith('subscription')) ||
        (actionFilter === 'student' && action.startsWith('student')) ||
        (actionFilter === 'plan' && action.startsWith('plan')) ||
        (actionFilter === 'content' && (action.startsWith('chapter') || action.startsWith('lesson')));
      return matchesSearch && matchesAction;
    } else {
      const logSeverity = (log.meta?.severity || 'error').toLowerCase();
      const matchesSeverity =
        severityFilter === 'all' || logSeverity === severityFilter;
      return matchesSearch && matchesSeverity;
    }
  });

  // 3. Pagination
  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedLogs = filtered.slice(startIndex, startIndex + pageSize);

  // 4. Copier les détails d'une erreur
  function copyDetails(log: AuditLogItem) {
    const text = JSON.stringify(
      {
        id: log.id,
        action: log.action,
        date: log.created_at,
        actor: log.profiles?.full_name ?? log.profiles?.phone ?? 'Système',
        target_type: log.target_type,
        target_id: log.target_id,
        meta: log.meta,
      },
      null,
      2
    );
    navigator.clipboard.writeText(text);
    showToast('Détails copiés dans le presse-papier !', 'success');
  }

  // 5. Simuler une erreur de test
  function handleTriggerTestError() {
    startTransition(async () => {
      const res = await createTestErrorAction(
        "Exception simulée : Délai d'attente dépassé sur l'API Wave (Code 504 Gateway Timeout)",
        'critical'
      );
      if (res.success) {
        showToast("Erreur de test générée ! Consultez l'onglet Erreurs.", 'success');
        setActiveTab('errors');
      } else {
        showToast(res.error, 'error');
      }
    });
  }

  // 6. Export CSV
  function exportCSV() {
    const headers = ['Date', 'Acteur', 'Type', 'Action', 'Cible', 'Message / Détails'];
    const rows = filtered.map((l) => [
      `"${l.created_at}"`,
      `"${l.profiles?.full_name ?? l.profiles?.phone ?? 'Système'}"`,
      `"${isErrorLog(l) ? 'ERREUR' : 'AUDIT'}"`,
      `"${l.action}"`,
      `"${l.target_type}"`,
      `"${(l.meta?.message || JSON.stringify(l.meta ?? {})).replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,\uFEFF' +
      [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute(
      'download',
      `${activeTab === 'audit' ? 'journal_audit' : 'journal_erreurs'}_almuxtaar_${new Date().toISOString().slice(0, 10)}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Journal exporté en CSV', 'success');
  }

  return (
    <div className="space-y-6">
      {/* ── 1. SELECTEUR D'ONGLET PRINCIPAL (AUDIT VS ERREURS) ── */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-2 rounded-2xl border border-navy/10 shadow-sm">
        <div className="flex items-center gap-1.5 p-1 bg-surface rounded-xl border border-navy/5">
          <button
            type="button"
            onClick={() => setActiveTab('audit')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'audit'
                ? 'bg-white text-navy shadow-sm'
                : 'text-navy/60 hover:text-navy hover:bg-white/50'
            }`}
          >
            <Icon name="doc" size={15} />
            <span>Journal d&apos;Audit &amp; Sécurité</span>
            <span className="ml-1 rounded-full bg-navy/10 text-navy text-[10px] px-1.5 py-0.2">
              {auditLogsList.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('errors')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'errors'
                ? 'bg-rose-600 text-white shadow-sm'
                : 'text-rose-600 hover:bg-rose-50'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Erreurs &amp; Exceptions Techniques</span>
            {errorLogsList.length > 0 && (
              <span
                className={`ml-1 rounded-full text-[10px] font-black px-1.5 py-0.2 ${
                  activeTab === 'errors' ? 'bg-white text-rose-600' : 'bg-rose-100 text-rose-700'
                }`}
              >
                {errorLogsList.length}
              </span>
            )}
          </button>
        </div>

        {/* Actions rapides à droite */}
        <div className="flex items-center gap-2 justify-end px-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleTriggerTestError}
            disabled={isPending}
            className="text-xs text-rose-700 border-rose-200 hover:bg-rose-50 flex items-center gap-1.5"
            title="Génère une erreur de test pour vérifier l'affichage en direct"
          >
            <Bug className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Simuler exception</span>
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={exportCSV}
            className="text-xs font-semibold flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Exporter CSV</span>
          </Button>
        </div>
      </div>

      {/* ── 2. BARRE DE RECHERCHE ET FILTRES ── */}
      <div className="bg-white rounded-2xl border border-navy/10 p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full sm:w-auto">
          <Search className="w-4 h-4 text-navy/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            placeholder={
              activeTab === 'audit'
                ? 'Rechercher par action, acteur ou cible…'
                : 'Rechercher par message d’erreur, route, fichier…'
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 text-xs"
          />
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-start">
          {activeTab === 'audit' ? (
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="rounded-xl border border-navy/20 bg-surface px-3 py-2 text-xs font-semibold text-text focus:outline-none focus:ring-2 focus:ring-turquoise/40"
            >
              <option value="all">Toutes les actions</option>
              <option value="subscription">Abonnements (activations, rejets)</option>
              <option value="student">Comptes élèves (suspensions, rôles)</option>
              <option value="plan">Tarifs des plans</option>
              <option value="content">Contenu &amp; Cours</option>
            </select>
          ) : (
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="rounded-xl border border-navy/20 bg-surface px-3 py-2 text-xs font-semibold text-text focus:outline-none focus:ring-2 focus:ring-rose-400"
            >
              <option value="all">Toutes les gravités</option>
              <option value="critical">CRITIQUE — Erreurs bloquantes</option>
              <option value="error">ERREUR — Dysfonctionnements système</option>
              <option value="warning">AVERTISSEMENT — Anomalies mineures</option>
            </select>
          )}

          {/* Sélecteur de taille de page */}
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="rounded-xl border border-navy/20 bg-surface px-2.5 py-2 text-xs font-semibold text-text"
          >
            <option value={15}>15 / page</option>
            <option value={30}>30 / page</option>
            <option value={50}>50 / page</option>
          </select>
        </div>
      </div>

      {/* ── 3. TABLEAU DES ÉVÉNEMENTS ── */}
      <div className="bg-white rounded-2xl border border-navy/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-surface border-b border-navy/10 text-xs text-text/60 uppercase">
              <tr>
                <th className="px-5 py-3.5">Date &amp; Heure</th>
                {activeTab === 'audit' ? (
                  <>
                    <th className="px-5 py-3.5">Administrateur</th>
                    <th className="px-5 py-3.5">Action</th>
                    <th className="px-5 py-3.5">Cible</th>
                    <th className="px-5 py-3.5">Détails</th>
                  </>
                ) : (
                  <>
                    <th className="px-5 py-3.5">Gravité</th>
                    <th className="px-5 py-3.5">Message de l&apos;erreur</th>
                    <th className="px-5 py-3.5">Contexte / Route</th>
                    <th className="px-5 py-3.5">Diagnostic</th>
                  </>
                )}
                <th className="px-5 py-3.5 text-right">Inspecter</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5">
              {paginatedLogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-text/50">
                    {activeTab === 'audit'
                      ? 'Aucun événement d’audit ne correspond aux filtres.'
                      : 'Aucune erreur technique enregistrée. Tout fonctionne normalement !'}
                  </td>
                </tr>
              ) : (
                paginatedLogs.map((log) => {
                  const isErr = isErrorLog(log);
                  const severity = log.meta?.severity || 'error';
                  const errMsg = log.meta?.message || log.action;
                  const errPath = log.meta?.path || log.target_type || '—';

                  return (
                    <tr
                      key={log.id}
                      className="hover:bg-surface/40 transition-colors cursor-pointer"
                      onClick={() => setSelectedLog(log)}
                    >
                      <td className="px-5 py-3.5 text-text/60 text-xs whitespace-nowrap font-mono">
                        {formatDate(log.created_at)}
                      </td>

                      {activeTab === 'audit' ? (
                        <>
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
                        </>
                      ) : (
                        <>
                          <td className="px-5 py-3.5">
                            <span
                              className={`inline-flex items-center gap-1 text-[11px] font-black uppercase px-2 py-0.5 rounded-full ${
                                severity === 'critical'
                                  ? 'bg-rose-100 text-rose-700 border border-rose-300'
                                  : severity === 'warning'
                                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                  : 'bg-orange-100 text-orange-800 border border-orange-300'
                              }`}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-current animate-ping" />
                              {severity}
                            </span>
                          </td>
                          <td className="px-5 py-3.5 font-semibold text-rose-900 text-xs max-w-md truncate">
                            {errMsg}
                          </td>
                          <td className="px-5 py-3.5 text-xs text-text/60 font-mono">
                            {errPath}
                          </td>
                          <td className="px-5 py-3.5 text-xs">
                            <span className="text-rose-600 font-semibold hover:underline">
                              Voir la stack →
                            </span>
                          </td>
                        </>
                      )}

                      <td className="px-5 py-3.5 text-right">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="text-xs text-navy/70 hover:text-turquoise"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLog(log);
                          }}
                        >
                          Détails
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* ── 4. BARRE DE PAGINATION ── */}
        <div className="bg-surface/60 border-t border-navy/10 px-5 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-text/60">
            Affichage de{' '}
            <strong className="text-navy">{totalItems === 0 ? 0 : startIndex + 1}</strong> à{' '}
            <strong className="text-navy">
              {Math.min(startIndex + pageSize, totalItems)}
            </strong>{' '}
            sur <strong className="text-navy">{totalItems}</strong> événements
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage(1)}
              className="p-1.5 h-8 w-8"
              title="Première page"
            >
              <ChevronsLeft className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-1.5 h-8 w-8"
              title="Page précédente"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            <span className="px-3 py-1 font-bold text-navy bg-white rounded-lg border border-navy/10">
              Page {currentPage} / {totalPages}
            </span>

            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 h-8 w-8"
              title="Page suivante"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage(totalPages)}
              className="p-1.5 h-8 w-8"
              title="Dernière page"
            >
              <ChevronsRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* ── 5. MODAL D'INSPECTION DÉTAILLÉE DU LOG / ERREUR ── */}
      {selectedLog && (
        <Modal
          isOpen
          onClose={() => setSelectedLog(null)}
          title={
            isErrorLog(selectedLog)
              ? 'Rapport d’Incident & Exception Système'
              : `Détail d’Audit — ${selectedLog.action}`
          }
        >
          <div className="space-y-4 text-xs">
            {/* Résumé de l'événement */}
            <div className="rounded-xl bg-surface p-4 space-y-2 border border-navy/10">
              <div className="flex items-center justify-between">
                <span className="font-bold text-navy text-sm font-mono">
                  {selectedLog.action}
                </span>
                <span className="text-text/50">{formatDate(selectedLog.created_at)}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-navy/5 text-text/70">
                <div>
                  <span className="text-text/40 block">Acteur :</span>
                  <strong className="text-navy">
                    {selectedLog.profiles?.full_name ?? selectedLog.profiles?.phone ?? 'Système'}
                  </strong>
                </div>
                <div>
                  <span className="text-text/40 block">Cible :</span>
                  <strong className="text-navy capitalize">{selectedLog.target_type}</strong>
                </div>
              </div>
            </div>

            {/* Si c'est une erreur : affichage du message et stack trace */}
            {isErrorLog(selectedLog) && selectedLog.meta?.message && (
              <div className="rounded-xl bg-rose-50 border border-rose-200 p-4 space-y-2">
                <span className="text-[10px] font-black uppercase text-rose-700 tracking-wider block">
                  Message d&apos;erreur :
                </span>
                <p className="font-bold text-rose-950 text-sm">
                  {selectedLog.meta.message}
                </p>
                {selectedLog.meta.path && (
                  <p className="text-rose-700 font-mono text-[11px]">
                    Route concernée : <strong>{selectedLog.meta.path}</strong>
                  </p>
                )}
              </div>
            )}

            {isErrorLog(selectedLog) && selectedLog.meta?.stack && (
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase text-navy/60 block">
                  Trace d&apos;exécution (Stack Trace) :
                </span>
                <pre className="p-3 bg-navy text-emerald-400 rounded-xl font-mono text-[11px] overflow-x-auto max-h-48 whitespace-pre-wrap">
                  {selectedLog.meta.stack}
                </pre>
              </div>
            )}

            {/* Inspecteur JSON complet */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase text-navy/60">
                  Métadonnées JSON complètes :
                </span>
                <button
                  type="button"
                  onClick={() => copyDetails(selectedLog)}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-turquoise hover:underline"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copier le rapport</span>
                </button>
              </div>
              <pre className="p-3 bg-slate-900 text-slate-100 rounded-xl font-mono text-[11px] overflow-x-auto max-h-48">
                {JSON.stringify(selectedLog.meta ?? {}, null, 2)}
              </pre>
            </div>

            <div className="pt-2 flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => copyDetails(selectedLog)}
                className="flex items-center gap-1.5"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>Copier le rapport complet</span>
              </Button>
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => setSelectedLog(null)}
              >
                Fermer
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
