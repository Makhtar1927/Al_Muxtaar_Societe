import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import NotificationsPageClient from '@/components/notifications/notifications-page-client';

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

  return (
    <main className="min-h-screen bg-surface py-8 px-4">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-navy">Mes Notifications</h1>
          <p className="text-text/70 text-sm mt-0.5">
            Retrouvez tous les messages d&apos;activation, alertes d&apos;abonnement et annonces de cours.
          </p>
        </div>

        <NotificationsPageClient
          initialNotifications={(notifications ?? []) as unknown as Parameters<typeof NotificationsPageClient>[0]['initialNotifications']}
        />
      </div>
    </main>
  );
}

