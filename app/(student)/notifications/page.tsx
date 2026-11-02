import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import NotificationsPageClient from '@/components/notifications/notifications-page-client';
import { Bell } from 'lucide-react';
import Link from 'next/link';

export const metadata = {
  title: 'Mes Notifications — Al Muxtaar',
  description: 'Historique des notifications de compte, paiements et alertes de révision.',
};

export const dynamic = 'force-dynamic';

export default async function NotificationsPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/connexion?redirect=/notifications');
  }

  const { data: notifications } = await supabase
    .from('notifications')
    .select('id, type, title, body, read, meta, created_at')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  const unreadCount = (notifications ?? []).filter((n) => !n.read).length;

  return (
    <main className="min-h-screen bg-surface py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* ── En-tête de page ── */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold text-turquoise uppercase tracking-wider mb-2">
              <Bell className="w-4 h-4" />
              <span>Centre de notifications</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-navy">
              Mes Notifications
            </h1>
            <p className="text-sm text-text/60 mt-1">
              Confirmations d&apos;abonnement, alertes pédagogiques et annonces de votre compte.
            </p>
          </div>

          {unreadCount > 0 && (
            <div className="flex items-center gap-2 bg-coral/10 border border-coral/20 px-3.5 py-2 rounded-2xl">
              <span className="w-2 h-2 rounded-full bg-coral animate-pulse" />
              <span className="text-xs font-black text-coral">
                {unreadCount} non lue{unreadCount > 1 ? 's' : ''}
              </span>
            </div>
          )}
        </div>

        {/* Breadcrumb */}
        <nav className="text-xs text-text/50 flex items-center gap-2">
          <Link href="/dashboard" className="hover:text-turquoise transition-colors">
            Tableau de bord
          </Link>
          <span>/</span>
          <span className="text-navy font-semibold">Notifications</span>
        </nav>

        {/* Contenu client */}
        <NotificationsPageClient
          initialNotifications={(notifications ?? []) as unknown as Parameters<typeof NotificationsPageClient>[0]['initialNotifications']}
        />
      </div>
    </main>
  );
}
