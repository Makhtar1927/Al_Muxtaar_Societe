import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Administration | Al Muxtaar Société',
  description: 'Tableau de bord d\'administration complet Al Muxtaar.',
};

export const dynamic = 'force-dynamic';

function formatFCFA(amount: number) {
  return amount.toLocaleString('fr-FR') + ' FCFA';
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default async function AdminPage() {
  const supabase = createClient();
  const admin = createAdminClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/connexion?redirect=/admin');
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'admin') {
    redirect('/dashboard');
  }

  // 1. Fetch metrics from DB
  const { count: pendingPaymentsCount } = await admin
    .from('payments')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending');

  const { count: activeSubsCount } = await admin
    .from('subscriptions')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active');

  const { count: totalStudentsCount } = await admin
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'student');

  // Revenue calculation
  const { data: confirmedPayments } = await admin
    .from('payments')
    .select('amount, created_at')
    .eq('status', 'confirmed');

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  let totalRevenueAllTime = 0;
  let revenueThisMonth = 0;

  (confirmedPayments ?? []).forEach((p) => {
    totalRevenueAllTime += p.amount;
    const d = new Date(p.created_at);
    if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
      revenueThisMonth += p.amount;
    }
  });

  // Expiring soon (< 7 days)
  const inSevenDays = new Date();
  inSevenDays.setDate(inSevenDays.getDate() + 7);

  const { count: expiringSoonCount } = await admin
    .from('subscriptions')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active')
    .lte('ends_at', inSevenDays.toISOString());

  // 2. Fetch recent 5 payments for quick preview
  const { data: recentPayments } = await admin
    .from('payments')
    .select(`
      id, amount, provider, transaction_code, status, created_at,
      profiles!payments_student_id_fkey(full_name, phone)
    `)
    .order('created_at', { ascending: false })
    .limit(5);

  // 3. Fetch recent 5 audit logs
  const { data: recentLogs } = await admin
    .from('audit_logs')
    .select('id, action, target_type, created_at, meta')
    .order('created_at', { ascending: false })
    .limit(5);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-navy/10 pb-5">
        <div>
          <span className="text-xs font-bold text-turquoise uppercase tracking-wider">
            Back-office Sécurisé
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy mt-1">
            Tableau de Bord Administrateur
          </h1>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Badge status="active">Mode Admin</Badge>
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              Vue Espace Élève
            </Button>
          </Link>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link href="/admin/abonnements" className="block">
          <Card className="hover:border-turquoise transition-all cursor-pointer h-full p-4 flex flex-col justify-between">
            <span className="text-2xl">💳</span>
            <div>
              <p className="font-bold text-navy text-sm mt-2">Abonnements</p>
              <p className="text-xs text-text/50">Valider les paiements Wave & OM</p>
            </div>
          </Card>
        </Link>

        <Link href="/admin/contenu" className="block">
          <Card className="hover:border-turquoise transition-all cursor-pointer h-full p-4 flex flex-col justify-between">
            <span className="text-2xl">📖</span>
            <div>
              <p className="font-bold text-navy text-sm mt-2">Contenu & Cours</p>
              <p className="text-xs text-text/50">Chapitres, leçons, exercices</p>
            </div>
          </Card>
        </Link>

        <Link href="/admin/eleves" className="block">
          <Card className="hover:border-turquoise transition-all cursor-pointer h-full p-4 flex flex-col justify-between">
            <span className="text-2xl">🎓</span>
            <div>
              <p className="font-bold text-navy text-sm mt-2">Élèves</p>
              <p className="text-xs text-text/50">Gestion des profils et rôles</p>
            </div>
          </Card>
        </Link>

        <Link href="/admin/tarifs" className="block">
          <Card className="hover:border-turquoise transition-all cursor-pointer h-full p-4 flex flex-col justify-between">
            <span className="text-2xl">🏷️</span>
            <div>
              <p className="font-bold text-navy text-sm mt-2">Tarifs des Plans</p>
              <p className="text-xs text-text/50">Modifier les prix sans coder</p>
            </div>
          </Card>
        </Link>
      </div>

      {/* KPI Summary Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-gold">
          <CardHeader className="pb-2">
            <span className="text-xs font-bold text-navy/60 uppercase">En attente de validation</span>
            <CardTitle className="text-3xl font-extrabold text-gold">
              {pendingPaymentsCount ?? 0}
            </CardTitle>
            <CardDescription>Paiements Wave / OM à traiter</CardDescription>
          </CardHeader>
        </Card>

        <Card className="border-l-4 border-l-turquoise">
          <CardHeader className="pb-2">
            <span className="text-xs font-bold text-navy/60 uppercase">Abonnés Actifs</span>
            <CardTitle className="text-3xl font-extrabold text-turquoise">
              {activeSubsCount ?? 0}
            </CardTitle>
            <CardDescription>
              {expiringSoonCount ?? 0} expirent sous 7 jours
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="border-l-4 border-l-navy">
          <CardHeader className="pb-2">
            <span className="text-xs font-bold text-navy/60 uppercase">Élèves Inscrits</span>
            <CardTitle className="text-3xl font-extrabold text-navy">
              {totalStudentsCount ?? 0}
            </CardTitle>
            <CardDescription>Comptes élèves sur la plateforme</CardDescription>
          </CardHeader>
        </Card>

        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader className="pb-2">
            <span className="text-xs font-bold text-navy/60 uppercase">Revenus ce mois</span>
            <CardTitle className="text-3xl font-extrabold text-emerald-600">
              {formatFCFA(revenueThisMonth)}
            </CardTitle>
            <CardDescription>Total cumulé : {formatFCFA(totalRevenueAllTime)}</CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Recent Activity Sections */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent payments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base font-bold text-navy">Derniers paiements</CardTitle>
              <CardDescription>Transactions récentes des élèves</CardDescription>
            </div>
            <Link href="/admin/abonnements">
              <span className="text-xs text-turquoise font-semibold hover:underline">
                Voir tout →
              </span>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {(!recentPayments || recentPayments.length === 0) ? (
              <p className="text-sm text-text/50 italic py-4">Aucune transaction enregistrée.</p>
            ) : (
              recentPayments.map((p) => {
                const student = (p.profiles as unknown as { full_name: string | null; phone: string }) ?? { full_name: 'Élève', phone: '' };
                return (
                  <div
                    key={p.id}
                    className="p-3 rounded-xl bg-surface border border-navy/10 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <p className="font-semibold text-navy">{student.full_name ?? 'Élève'}</p>
                      <p className="text-text/50">{student.phone} • {p.provider.toUpperCase()} ({p.transaction_code})</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-navy">{formatFCFA(p.amount)}</p>
                      <Badge status={p.status === 'confirmed' ? 'active' : p.status === 'pending' ? 'pending' : 'rejected'} />
                    </div>
                  </div>
                );
              })
            )}
          </CardContent>
        </Card>

        {/* Recent audit logs */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base font-bold text-navy">Journal d&apos;activité</CardTitle>
              <CardDescription>Actions administrateur récentes</CardDescription>
            </div>
            <Link href="/admin/journal">
              <span className="text-xs text-turquoise font-semibold hover:underline">
                Historique complet →
              </span>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {(!recentLogs || recentLogs.length === 0) ? (
              <p className="text-sm text-text/50 italic py-4">Aucune action enregistrée dans le journal.</p>
            ) : (
              recentLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-3 rounded-xl bg-surface border border-navy/10 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <code className="font-mono text-navy font-bold text-[11px] bg-white px-1.5 py-0.5 rounded border border-navy/10">
                      {log.action}
                    </code>
                    <p className="text-text/50 mt-1 capitalize">Cible : {log.target_type}</p>
                  </div>
                  <span className="text-text/40 text-[11px]">
                    {formatDate(log.created_at)}
                  </span>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
