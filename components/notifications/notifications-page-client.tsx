'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/toast';
import {
  markNotificationAsReadAction,
  markAllNotificationsAsReadAction,
  NotificationItem,
} from '@/lib/notifications/actions';

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

export default function NotificationsPageClient({ initialNotifications }: Props) {
  const { showToast } = useToast();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filtered = notifications.filter((n) => (filter === 'unread' ? !n.read : true));
  const unreadCount = notifications.filter((n) => !n.read).length;

  async function handleMarkRead(id: string) {
    const res = await markNotificationAsReadAction(id);
    if (res.success) {
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    }
  }

  async function handleMarkAllRead() {
    const res = await markAllNotificationsAsReadAction();
    if (res.success) {
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      showToast('Toutes les notifications sont marquées comme lues', 'success');
    }
  }

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white rounded-2xl border border-navy/10 p-4 shadow-sm">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              filter === 'all'
                ? 'bg-navy text-white'
                : 'bg-surface text-text/70 hover:bg-navy/5'
            }`}
          >
            Toutes ({notifications.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('unread')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              filter === 'unread'
                ? 'bg-navy text-white'
                : 'bg-surface text-text/70 hover:bg-navy/5'
            }`}
          >
            Non lues ({unreadCount})
          </button>
        </div>

        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={handleMarkAllRead}>
            ✓ Tout marquer comme lu
          </Button>
        )}
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-navy/10 p-12 text-center text-text/50 space-y-2">
            <span className="text-3xl block">📭</span>
            <p className="font-medium text-sm text-navy">Aucune notification à afficher.</p>
            <p className="text-xs">Toutes vos notifications apparaîtront ici.</p>
          </div>
        ) : (
          filtered.map((n) => (
            <div
              key={n.id}
              className={`p-5 rounded-2xl border transition-all ${
                !n.read
                  ? 'bg-white border-turquoise/40 shadow-sm'
                  : 'bg-white/80 border-navy/10'
              }`}
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  {!n.read && (
                    <span className="w-2 h-2 rounded-full bg-coral shrink-0" />
                  )}
                  <h3 className="font-bold text-navy text-sm sm:text-base">
                    {n.title}
                  </h3>
                </div>
                <span className="text-xs text-text/40">{formatDate(n.created_at)}</span>
              </div>

              <p className="text-xs sm:text-sm text-text/80 mt-2 leading-relaxed">
                {n.body}
              </p>

              <div className="mt-3 pt-3 border-t border-navy/5 flex flex-wrap items-center justify-between gap-3">
                {n.type.startsWith('subscription') ? (
                  <Link
                    href="/abonnement"
                    className="text-xs font-semibold text-turquoise hover:underline"
                  >
                    Voir mon abonnement →
                  </Link>
                ) : (
                  <div />
                )}

                {!n.read && (
                  <button
                    type="button"
                    onClick={() => handleMarkRead(n.id)}
                    className="text-xs text-text/50 hover:text-navy hover:underline"
                  >
                    Marquer comme lu
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

