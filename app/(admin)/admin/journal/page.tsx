import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import JournalViewerClient from '@/components/admin/journal-viewer-client';

export const metadata = {
  title: 'Journal d\'Audit — Admin Al Muxtaar',
};

export const dynamic = 'force-dynamic';

export default async function AdminJournalPage() {
  const supabase = createClient();
  const admin = createAdminClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/connexion');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') redirect('/dashboard');

  const { data: rawLogs } = await admin
    .from('audit_logs')
    .select(`
      id, action, target_type, target_id, meta, created_at,
      profiles!audit_logs_actor_id_fkey(first_name, last_name, phone)
    `)
    .order('created_at', { ascending: false })
    .limit(1000);

  const logs = (rawLogs ?? []).map((l: any) => {
    const p = Array.isArray(l.profiles) ? l.profiles[0] : l.profiles;
    return {
      ...l,
      profiles: p
        ? {
            full_name: p.first_name && p.last_name
              ? `${p.first_name} ${p.last_name}`
              : p.first_name || p.last_name || 'Admin',
            phone: p.phone ?? '',
          }
        : null,
    };
  });

  return (
    <main className="min-h-screen bg-surface py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div>
          <span className="text-xs font-bold text-turquoise uppercase tracking-wider">
            Traçabilité, Sécurité &amp; Diagnostic
          </span>
          <h1 className="text-2xl font-bold text-navy mt-0.5">Journal d&apos;Audit &amp; Exceptions Système</h1>
          <p className="text-text/70 text-sm mt-0.5">
            Historique complet des actions administratives et surveillance en direct des erreurs techniques pour diagnostic et correction immédiats.
          </p>
        </div>

        <JournalViewerClient
          initialLogs={logs as unknown as Parameters<typeof JournalViewerClient>[0]['initialLogs']}
        />
      </div>
    </main>
  );
}

