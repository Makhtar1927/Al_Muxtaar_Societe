'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useToast } from '@/components/ui/toast';
import {
  markNotificationAsReadAction,
  markAllNotificationsAsReadAction,
  NotificationItem,
} from '@/lib/notifications/actions';
import {
  Bell,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  ShieldCheck,
  CheckCheck,
  ArrowRight,
  Filter,
  Search,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  initialNotifications: NotificationItem[];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function timeAgo(dateString: string) {
  const diff = Date.now() - new Date(dateString).getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "À l'instant";
  if (minutes < 60) return `Il y a ${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `Il y a ${hours} h`;
  const days = Math.floor(hours / 24);
  return `Il y a ${days} j`;
}

function getNotificationConfig(type: string, title: string) {
  const lowerTitle = (title || '').toLowerCase();
  const lowerType = (type || '').toLowerCase();

  if (
    lowerType.includes('subscription_active') ||
    lowerType.includes('activated') ||
    lowerTitle.includes('abonnement activé') ||
    lowerTitle.includes('validé') ||
    lowerTitle.includes('confirmé')
  ) {
    return {
      icon: CheckCircle2,
      iconBg: 'bg-emerald-50 text-emerald-600',
      iconBorder: 'border-emerald-200',
      accent: 'border-l-emerald-500',
      categoryBadge: 'bg-emerald-100 text-emerald-800',
      category: 'Abonnement Actif',
      actionUrl: '/abonnement',
      actionLabel: 'Gérer mon abonnement',
    };
  }

  if (
    lowerType.includes('pending') ||
    lowerTitle.includes('en attente') ||
    lowerTitle.includes('wave') ||
    lowerTitle.includes('paiement en cours')
  ) {
    return {
      icon: Clock,
      iconBg: 'bg-amber-50 text-amber-600',
      iconBorder: 'border-amber-200',
      accent: 'border-l-amber-500',
      categoryBadge: 'bg-amber-100 text-amber-800',
      category: 'Paiement Wave',
      actionUrl: '/abonnement',
      actionLabel: 'Suivre ma demande',
    };
  }

  if (
    lowerType.includes('lesson') ||
    lowerType.includes('course') ||
    lowerTitle.includes('cours') ||
    lowerTitle.includes('chapitre') ||
    lowerTitle.includes('fiche') ||
    lowerTitle.includes('programme')
  ) {
    return {
      icon: BookOpen,
      iconBg: 'bg-sky-50 text-sky-600',
      iconBorder: 'border-sky-200',
      accent: 'border-l-sky-500',
      categoryBadge: 'bg-sky-100 text-sky-800',
      category: 'Cours & Programme',
      actionUrl: '/cours',
      actionLabel: 'Accéder aux cours',
    };
  }

  if (
    lowerType.includes('security') ||
    lowerType.includes('admin') ||
    lowerTitle.includes('sécurité') ||
    lowerTitle.includes('connexion') ||
    lowerTitle.includes('compte')
  ) {
    return {
      icon: ShieldCheck,
      iconBg: 'bg-navy/8 text-navy',
      iconBorder: 'border-navy/15',
      accent: 'border-l-navy',
      categoryBadge: 'bg-navy/10 text-navy',
      category: 'Sécurité & Compte',
      actionUrl: '/compte',
      actionLabel: 'Mon profil',
    };
  }

  return {
    icon: Sparkles,
    iconBg: 'bg-purple-50 text-purple-600',
    iconBorder: 'border-purple-200',
    accent: 'border-l-purple-400',
    categoryBadge: 'bg-purple-100 text-purple-800',
    category: 'Annonce',
    actionUrl: null,
    actionLabel: null,
  };
}

export default function NotificationsPageClient({ initialNotifications }: Props) {
  const { showToast } = useToast();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [search, setSearch] = useState('');

  const filtered = notifications
    .filter((n) => (filter === 'unread' ? !n.read : true))
    .filter((n) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return n.title.toLowerCase().includes(q) || n.body.toLowerCase().includes(q);
    });

  const unreadCount = notifications.filter((n) => !n.read).length;

  async function handleMarkRead(id: string) {
    const res = await markNotificationAsReadAction(id);
    if (res.success) {
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    }
  }

  async function handleMarkAllRead() {
    const res = await markAllNotificationsAsReadAction();
    if (res.success) {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      showToast('Toutes les notifications ont été marquées comme lues', 'success');
    }
  }

  return (
    <div className="space-y-5">
      {/* ── Barre de contrôles ── */}
      <div className="bg-white rounded-3xl border border-navy/10 p-4 shadow-sm space-y-3">
        {/* Ligne 1: Filtres + Action Globale */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={cn(
                'px-3.5 py-1.5 rounded-full text-xs font-bold transition-all',
                filter === 'all'
                  ? 'bg-navy text-white shadow-sm'
                  : 'bg-surface text-text/70 hover:text-navy hover:bg-navy/5'
              )}
            >
              Toutes
              <span className={cn(
                'ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full font-black',
                filter === 'all' ? 'bg-white/20 text-white' : 'bg-navy/10 text-navy'
              )}>
                {notifications.length}
              </span>
            </button>
            <button
              type="button"
              onClick={() => setFilter('unread')}
              className={cn(
                'px-3.5 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5',
                filter === 'unread'
                  ? 'bg-navy text-white shadow-sm'
                  : 'bg-surface text-text/70 hover:text-navy hover:bg-navy/5'
              )}
            >
              Non lues
              {unreadCount > 0 && (
                <span className={cn(
                  'text-[10px] px-1.5 py-0.5 rounded-full font-black',
                  filter === 'unread'
                    ? 'bg-coral text-white'
                    : 'bg-coral/15 text-coral'
                )}>
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          {unreadCount > 0 && (
            <button
              type="button"
              onClick={handleMarkAllRead}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-turquoise border border-turquoise/30 bg-turquoise-light/30 px-3 py-1.5 rounded-full hover:bg-turquoise hover:text-white transition-all"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              Tout marquer comme lu
            </button>
          )}
        </div>

        {/* Ligne 2: Barre de recherche */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-navy/30" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Rechercher une notification…"
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-surface border border-navy/8 text-xs text-navy placeholder:text-navy/40 focus:outline-none focus:border-turquoise/50 transition-colors"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/40 hover:text-navy text-[10px] font-bold"
            >
              Effacer
            </button>
          )}
        </div>
      </div>

      {/* ── Résumé contextuel ── */}
      {filtered.length > 0 && (
        <p className="text-xs text-text/50 font-medium px-1">
          {filtered.length} notification{filtered.length > 1 ? 's' : ''}{' '}
          {filter === 'unread' ? 'non lue' : 'au total'}
          {search ? ` pour « ${search} »` : ''}
        </p>
      )}

      {/* ── Liste des notifications ── */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-3xl border border-navy/10 p-12 text-center space-y-4">
            <div className="w-14 h-14 rounded-3xl bg-surface mx-auto flex items-center justify-center">
              <Bell className="w-7 h-7 text-navy/20" />
            </div>
            <div>
              <p className="font-bold text-sm text-navy">
                {search
                  ? 'Aucune notification trouvée'
                  : filter === 'unread'
                  ? 'Vous êtes à jour'
                  : 'Aucune notification pour le moment'}
              </p>
              <p className="text-xs text-text/50 mt-1 max-w-xs mx-auto">
                {search
                  ? `Aucun résultat pour « ${search} »`
                  : 'Vos confirmations d\'abonnement et alertes pédagogiques s\'afficheront ici.'}
              </p>
            </div>
            {filter === 'unread' && (
              <button
                type="button"
                onClick={() => setFilter('all')}
                className="text-xs font-bold text-turquoise hover:underline"
              >
                Voir toutes les notifications
              </button>
            )}
          </div>
        ) : (
          filtered.map((n) => {
            const config = getNotificationConfig(n.type, n.title);
            const IconComponent = config.icon;

            return (
              <div
                key={n.id}
                className={cn(
                  'bg-white rounded-3xl border border-l-4 transition-all shadow-sm',
                  !n.read
                    ? `border-navy/10 ${config.accent} shadow-sm`
                    : 'border-navy/8 border-l-transparent opacity-80 hover:opacity-100'
                )}
              >
                <div className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Icône de catégorie */}
                    <div
                      className={cn(
                        'w-10 h-10 rounded-2xl border flex items-center justify-center shrink-0 shadow-xs',
                        config.iconBg,
                        config.iconBorder
                      )}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>

                    {/* Contenu */}
                    <div className="flex-1 min-w-0">
                      {/* En-tête: catégorie, date, badge non-lu */}
                      <div className="flex flex-wrap items-center gap-2 mb-1.5">
                        <span className={cn(
                          'text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full border',
                          config.categoryBadge,
                          // derive border color from badge bg
                          config.iconBorder
                        )}>
                          {config.category}
                        </span>
                        {!n.read && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-black text-coral bg-coral/10 border border-coral/20 px-2 py-0.5 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-coral animate-pulse" />
                            Non lue
                          </span>
                        )}
                        <span className="text-[11px] text-text/40 font-medium ml-auto">
                          {timeAgo(n.created_at)}
                        </span>
                      </div>

                      {/* Titre */}
                      <h3 className={cn(
                        'text-sm sm:text-base leading-snug',
                        !n.read ? 'font-extrabold text-navy' : 'font-bold text-navy/70'
                      )}>
                        {n.title}
                      </h3>

                      {/* Corps */}
                      <p className="text-xs sm:text-sm text-text/70 mt-1.5 leading-relaxed">
                        {n.body}
                      </p>

                      {/* Date complète */}
                      <p className="text-[11px] text-text/30 font-medium mt-2">
                        {formatDate(n.created_at)}
                      </p>

                      {/* Actions */}
                      <div className="mt-3 pt-3 border-t border-navy/5 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          {config.actionUrl && (
                            <Link
                              href={config.actionUrl}
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-turquoise hover:underline"
                            >
                              <span>{config.actionLabel}</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </Link>
                          )}
                        </div>

                        {!n.read && (
                          <button
                            type="button"
                            onClick={() => handleMarkRead(n.id)}
                            className="inline-flex items-center gap-1 text-xs font-bold text-navy/50 hover:text-navy border border-navy/10 bg-surface px-3 py-1 rounded-full hover:border-navy/20 transition-all"
                          >
                            <CheckCheck className="w-3 h-3" />
                            Marquer comme lu
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
