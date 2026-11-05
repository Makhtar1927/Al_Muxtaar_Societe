import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';

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

  const inSevenDays = new Date();
  inSevenDays.setDate(inSevenDays.getDate() + 7);

  // ── Fetch toutes les métriques admin EN PARALLÈLE ──
  const [
    pendingPaymentsResult,
    activeSubsResult,
    totalProfilesResult,
    confirmedPaymentsResult,
    expiringSoonResult,
    recentPaymentsResult,
    recentLogsResult,
  ] = await Promise.all([
    admin.from('payments').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
    admin.from('subscriptions').select('*', { count: 'exact', head: true }).eq('status', 'active'),
    admin.from('profiles').select('*', { count: 'exact', head: true }),
    admin.from('payments').select('amount, created_at').eq('status', 'confirmed'),
    admin.from('subscriptions').select('*', { count: 'exact', head: true }).eq('status', 'active').lte('end_date', inSevenDays.toISOString()),
    admin.from('subscriptions').select(`id, status, created_at, plans(name, price_fcfa), profiles!user_id(first_name, last_name, phone)`).order('created_at', { ascending: false }).limit(8),
    admin.from('audit_logs').select('id, action, target_type, created_at, meta').order('created_at', { ascending: false }).limit(5),
  ]);

  const pendingPaymentsCount = pendingPaymentsResult.count;
  const activeSubsCount = activeSubsResult.count;
  const totalStudentsCount = totalProfilesResult.count ?? 0;
  const confirmedPayments = confirmedPaymentsResult.data;
  const expiringSoonCount = expiringSoonResult.count;
  const recentPayments = recentPaymentsResult.data;
  const recentLogs = recentLogsResult.data;

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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Link href="/admin/abonnements" className="block group">
          <Card className="hover:border-turquoise transition-all cursor-pointer h-full p-4 sm:p-5 flex flex-col justify-between bg-white shadow-sm hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-600">
                <Icon name="abonnement" size={24} />
              </div>
              {pendingPaymentsCount && pendingPaymentsCount > 0 ? (
                <span className="text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full animate-pulse">
                  {pendingPaymentsCount} à valider
                </span>
              ) : null}
            </div>
            <div className="mt-4">
              <p className="font-extrabold text-navy text-sm group-hover:text-turquoise transition-colors">Abonnements</p>
              <p className="text-xs text-text/60 mt-0.5">Validation Wave &amp; prolongations</p>
            </div>
          </Card>
        </Link>

        <Link href="/admin/eleves" className="block group">
          <Card className="hover:border-turquoise transition-all cursor-pointer h-full p-4 sm:p-5 flex flex-col justify-between bg-white shadow-sm hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600">
                <Icon name="profil" size={24} />
              </div>
              <div className="flex items-center gap-1.5">
                {Math.max(0, totalStudentsCount - (activeSubsCount ?? 0)) > 0 ? (
                  <span className="text-[10px] font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300 px-2 py-0.5 rounded-full animate-pulse">
                    {Math.max(0, totalStudentsCount - (activeSubsCount ?? 0))} à valider
                  </span>
                ) : (
                  <span className="text-[10px] font-black uppercase tracking-wider bg-surface text-navy/70 border border-navy/10 px-2 py-0.5 rounded-full">
                    {totalStudentsCount} inscrits
                  </span>
                )}
              </div>
            </div>
            <div className="mt-4">
              <p className="font-extrabold text-navy text-sm group-hover:text-turquoise transition-colors">Annuaire Élèves</p>
              <p className="text-xs text-text/60 mt-0.5">Validation d&apos;inscription &amp; accès</p>
            </div>
          </Card>
        </Link>

        <Link href="/admin/contenu" className="block group">
          <Card className="hover:border-turquoise transition-all cursor-pointer h-full p-4 sm:p-5 flex flex-col justify-between bg-white shadow-sm hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-turquoise/10 flex items-center justify-center text-turquoise">
                <Icon name="cours" size={24} />
              </div>
            </div>
            <div className="mt-4">
              <p className="font-extrabold text-navy text-sm group-hover:text-turquoise transition-colors">Contenu &amp; Cours</p>
              <p className="text-xs text-text/60 mt-0.5">Chapitres, leçons, exercices</p>
            </div>
          </Card>
        </Link>

        <Link href="/admin/tarifs" className="block group">
          <Card className="hover:border-turquoise transition-all cursor-pointer h-full p-4 sm:p-5 flex flex-col justify-between bg-white shadow-sm hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                <Icon name="paiement" size={24} />
              </div>
            </div>
            <div className="mt-4">
              <p className="font-extrabold text-navy text-sm group-hover:text-turquoise transition-colors">Tarifs des Plans</p>
              <p className="text-xs text-text/60 mt-0.5">Modifier les prix sans coder</p>
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
            <CardDescription>Paiements Wave à traiter</CardDescription>
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
        {/* Recent subscriptions / payments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-3">
            <div>
              <CardTitle className="text-base font-bold text-navy">Dernières demandes d&apos;abonnement</CardTitle>
              <CardDescription>Paiements Wave à valider en priorité</CardDescription>
            </div>
            <Link href="/admin/abonnements">
              <span className="text-xs text-turquoise font-semibold hover:underline">
                Voir tout →
              </span>
            </Link>
          </CardHeader>
          <CardContent className="space-y-3">
            {(!recentPayments || recentPayments.length === 0) ? (
              <p className="text-sm text-text/50 italic py-4">Aucune demande enregistrée.</p>
            ) : (
              (recentPayments as any[]).map((sub: any) => {
                const studentProfile = Array.isArray(sub.profiles) ? sub.profiles[0] : sub.profiles;
                const fullName = studentProfile?.first_name && studentProfile?.last_name
                  ? `${studentProfile.first_name} ${studentProfile.last_name}`
                  : studentProfile?.full_name || 'Élève';
                return (
                  <div
                    key={sub.id}
                    className="p-3 rounded-xl bg-surface border border-navy/10 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <p className="font-semibold text-navy">{fullName}</p>
                      <p className="text-text/50">{studentProfile?.phone ?? '—'} • {sub.plans?.name ?? sub.provider ?? 'Wave'}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-navy">{sub.plans?.price_fcfa ? sub.plans.price_fcfa.toLocaleString('fr-FR') + ' FCFA' : sub.amount ? sub.amount.toLocaleString('fr-FR') + ' FCFA' : '—'}</p>
                      <Badge status={sub.status === 'active' ? 'active' : sub.status === 'pending' ? 'pending' : 'rejected'} />
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
