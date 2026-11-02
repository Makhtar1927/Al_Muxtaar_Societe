'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  fetchMyNotificationsAction,
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
  AlertCircle,
  CreditCard,
  CheckCheck,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';

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
    lowerTitle.includes('validé')
  ) {
    return {
      icon: CheckCircle2,
      badgeBg: 'bg-emerald-50 text-emerald-600 border-emerald-200',
      category: 'Abonnement',
      actionUrl: '/abonnement',
      actionLabel: 'Gérer mon abonnement',
    };
  }

  if (
    lowerType.includes('pending') ||
    lowerTitle.includes('en attente') ||
    lowerTitle.includes('wave') ||
    lowerTitle.includes('paiement')
  ) {
    return {
      icon: Clock,
      badgeBg: 'bg-amber-50 text-amber-700 border-amber-200',
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
    lowerTitle.includes('fiche')
  ) {
    return {
      icon: BookOpen,
      badgeBg: 'bg-turquoise-light/30 text-turquoise border-turquoise/30',
      category: 'Cours & Programme',
      actionUrl: '/cours',
      actionLabel: 'Accéder aux cours',
    };
  }

  if (
    lowerType.includes('security') ||
    lowerType.includes('admin') ||
    lowerTitle.includes('sécurité') ||
    lowerTitle.includes('connexion')
  ) {
    return {
      icon: ShieldCheck,
      badgeBg: 'bg-navy/5 text-navy border-navy/20',
      category: 'Sécurité & Compte',
      actionUrl: '/compte',
      actionLabel: 'Mon compte',
    };
  }

  return {
    icon: Sparkles,
    badgeBg: 'bg-sky-50 text-sky-600 border-sky-200',
    category: 'Information',
    actionUrl: null,
    actionLabel: null,
  };
}

export default function NotificationBell() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [tabFilter, setTabFilter] = useState<'all' | 'unread'>('all');
  const dropdownRef = useRef<HTMLDivElement>(null);

  async function loadNotifications() {
    setLoading(true);
    const res = await fetchMyNotificationsAction();
    if (res.success && res.data) {
      setNotifications(res.data.notifications);
      setUnreadCount(res.data.unreadCount);
    }
    setLoading(false);
  }

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 60000);
    return () => clearInterval(interval);
  }, []);

  // Fermer le popover au clic en dehors
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  async function handleMarkRead(id: string, e?: React.MouseEvent) {
    if (e) e.stopPropagation();
    await markNotificationAsReadAction(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
    setUnreadCount((prev) => Math.max(0, prev - 1));
  }

  async function handleMarkAllRead() {
    await markAllNotificationsAsReadAction();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    setUnreadCount(0);
  }

  const displayedNotifications = notifications.filter((n) =>
    tabFilter === 'unread' ? !n.read : true
  );

  return (
    <div className="relative" ref={dropdownRef}>
      {/* ── Bouton Cloche ── */}
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'relative p-2.5 rounded-2xl transition-all focus:outline-none flex items-center justify-center border',
          open
            ? 'bg-turquoise/10 text-turquoise border-turquoise/30 shadow-sm'
            : 'text-navy/70 hover:text-navy hover:bg-surface border-transparent hover:border-navy/10'
        )}
        aria-label="Notifications"
        aria-expanded={open}
      >
        <Bell className="w-5 h-5 transition-transform duration-200" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 min-w-[18px] h-[18px] px-1 bg-coral text-white text-[10px] font-black rounded-full flex items-center justify-center shadow-sm animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* ── Popover Dropdown Ultra Pro ── */}
      {open && (
        <div className="absolute right-[-40px] sm:right-0 mt-2.5 w-[calc(100vw-2rem)] max-w-[390px] sm:w-[400px] rounded-3xl bg-white border border-navy/10 shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="px-5 py-3.5 bg-surface/80 border-b border-navy/10 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span className="font-extrabold text-navy text-sm">Notifications</span>
              {unreadCount > 0 ? (
                <span className="text-[11px] bg-turquoise-light text-turquoise font-black px-2.5 py-0.5 rounded-full">
                  {unreadCount} non lue{unreadCount > 1 ? 's' : ''}
                </span>
              ) : (
                <span className="text-[10px] bg-navy/5 text-navy/60 font-bold px-2 py-0.5 rounded-full">
                  À jour
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={handleMarkAllRead}
                className="inline-flex items-center gap-1 text-[11px] text-turquoise font-bold hover:underline"
                title="Tout marquer comme lu"
              >
                <CheckCheck className="w-3.5 h-3.5" />
                <span>Tout marquer lu</span>
              </button>
            )}
          </div>

          {/* Filtres internes rapides */}
          <div className="px-4 py-2 bg-white border-b border-navy/5 flex items-center gap-1.5 text-xs">
            <button
              type="button"
              onClick={() => setTabFilter('all')}
              className={cn(
                'px-3 py-1 rounded-full font-bold transition-all text-xs',
                tabFilter === 'all'
                  ? 'bg-navy text-white shadow-xs'
                  : 'text-text/60 hover:text-navy hover:bg-surface'
              )}
            >
              Toutes ({notifications.length})
            </button>
            <button
              type="button"
              onClick={() => setTabFilter('unread')}
              className={cn(
                'px-3 py-1 rounded-full font-bold transition-all text-xs flex items-center gap-1.5',
                tabFilter === 'unread'
                  ? 'bg-navy text-white shadow-xs'
                  : 'text-text/60 hover:text-navy hover:bg-surface'
              )}
            >
              <span>Non lues</span>
              {unreadCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-coral text-white text-[9px] font-black flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* Liste des Notifications */}
          <div className="max-h-[350px] overflow-y-auto divide-y divide-navy/5 scrollbar-thin">
            {loading && notifications.length === 0 ? (
              <div className="py-12 text-center text-xs text-text/50 space-y-2">
                <div className="w-5 h-5 border-2 border-turquoise border-t-transparent rounded-full animate-spin mx-auto" />
                <p>Chargement de vos notifications…</p>
              </div>
            ) : displayedNotifications.length === 0 ? (
              <div className="py-12 px-6 text-center space-y-2.5">
                <div className="w-12 h-12 rounded-2xl bg-surface mx-auto flex items-center justify-center text-navy/30">
                  <Bell className="w-6 h-6" />
                </div>
                <p className="text-xs font-bold text-navy">
                  {tabFilter === 'unread'
                    ? 'Aucune notification non lue'
                    : 'Aucune notification pour le moment'}
                </p>
                <p className="text-[11px] text-text/50 max-w-[220px] mx-auto">
                  Vos confirmations d&apos;abonnement et alertes pédagogiques s&apos;afficheront ici.
                </p>
              </div>
            ) : (
              displayedNotifications.map((n) => {
                const config = getNotificationConfig(n.type, n.title);
                const IconComponent = config.icon;

                return (
                  <div
                    key={n.id}
                    onClick={() => !n.read && handleMarkRead(n.id)}
                    className={cn(
                      'p-4 transition-all cursor-pointer relative group flex items-start gap-3.5',
                      !n.read
                        ? 'bg-turquoise-light/10 hover:bg-turquoise-light/20'
                        : 'bg-white hover:bg-surface/60'
                    )}
                  >
                    {/* Badge Icône de Catégorie */}
                    <div
                      className={cn(
                        'w-9 h-9 rounded-2xl border flex items-center justify-center shrink-0 mt-0.5 shadow-2xs',
                        config.badgeBg
                      )}
                    >
                      <IconComponent className="w-4 h-4" />
                    </div>

                    {/* Contenu textuel */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-navy/50">
                            {config.category}
                          </span>
                          {!n.read && (
                            <span className="w-2 h-2 rounded-full bg-coral shrink-0" />
                          )}
                        </div>
                        <span className="text-[10px] font-medium text-text/40 shrink-0">
                          {timeAgo(n.created_at)}
                        </span>
                      </div>

                      <h4
                        className={cn(
                          'text-xs mt-0.5 line-clamp-1',
                          !n.read ? 'font-extrabold text-navy' : 'font-semibold text-navy/80'
                        )}
                      >
                        {n.title}
                      </h4>

                      <p className="text-[11px] text-text/70 mt-1 leading-relaxed line-clamp-2">
                        {n.body}
                      </p>

                      {/* Raccourci d'action contextuel */}
                      <div className="mt-2.5 flex items-center justify-between pt-1 border-t border-navy/5">
                        {config.actionUrl ? (
                          <Link
                            href={config.actionUrl}
                            onClick={() => setOpen(false)}
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-turquoise hover:underline"
                          >
                            <span>{config.actionLabel}</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        ) : (
                          <span />
                        )}

                        {!n.read && (
                          <button
                            type="button"
                            onClick={(e) => handleMarkRead(n.id, e)}
                            className="text-[10px] font-bold text-navy/50 hover:text-navy hover:underline ml-auto"
                          >
                            Marquer comme lu
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer Popover */}
          <div className="px-4 py-3 bg-surface/70 border-t border-navy/10 flex items-center justify-between">
            <span className="text-[11px] text-text/50 font-medium">
              {notifications.length} message{notifications.length > 1 ? 's' : ''} au total
            </span>
            <Link
              href="/notifications"
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-1 text-xs font-bold text-turquoise hover:underline"
            >
              <span>Historique complet</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
