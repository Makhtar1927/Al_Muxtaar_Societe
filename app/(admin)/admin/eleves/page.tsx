import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import ElevesManagerClient from '@/components/admin/eleves-manager-client';

export const metadata = {
  title: 'Gestion des élèves — Admin Al Muxtaar',
};

export const dynamic = 'force-dynamic';

export default async function AdminElevesPage() {
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

  // 1. Récupération robuste des profils sans join relationnel risqué
  const { data: rawProfiles, error: profilesError } = await admin
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  if (profilesError) {
    console.warn('Erreur lecture profiles:', profilesError);
  }

  // 2. Récupération des abonnements séparément
  const { data: rawSubs } = await admin
    .from('subscriptions')
    .select('id, user_id, status, end_date');

  // 2b. Récupération des plans actifs pour l'attribution manuelle
  const { data: rawPlans } = await admin
    .from('plans')
    .select('id, name, duration_days, price_fcfa, is_active')
    .eq('is_active', true)
    .order('price_fcfa', { ascending: true });

  const availablePlans = (rawPlans ?? []).map((p: any) => ({
    id: p.id,
    name: p.name,
    duration_days: p.duration_days ?? 30,
    price_fcfa: p.price_fcfa ?? p.price ?? 700,
  }));

  const subsByUserId = new Map<string, any[]>();
  for (const s of rawSubs ?? []) {
    if (!subsByUserId.has(s.user_id)) subsByUserId.set(s.user_id, []);
    subsByUserId.get(s.user_id)!.push({
      id: s.id,
      status: s.status,
      ends_at: s.end_date ?? null,
    });
  }

  // 3. Récupération de secours de tous les utilisateurs Auth pour garantir zéro omission
  const { data: authData } = await admin.auth.admin.listUsers({ perPage: 1000 });
  const authUsers = authData?.users ?? [];

  const normalised: any[] = [];
  const processedUserIds = new Set<string>();

  // A. Traitement des profils en BDD
  for (const p of rawProfiles ?? []) {
    processedUserIds.add(p.id);
    const fullName =
      p.full_name ||
      (p.first_name && p.last_name
        ? `${p.first_name} ${p.last_name}`
        : p.first_name || p.last_name || null);

    normalised.push({
      id: p.id,
      full_name: fullName,
      phone: p.phone ?? '',
      role: p.role ?? 'student',
      level: p.level ?? 'Terminale',
      track: p.track ?? 'S2',
      avatar_url: p.avatar ?? null,
      is_banned: p.is_banned ?? false,
      created_at: p.created_at,
      subscriptions: subsByUserId.get(p.id) ?? [],
    });
  }

  // B. Fusion des utilisateurs Auth qui n'auraient pas encore de ligne profiles
  for (const au of authUsers) {
    if (!processedUserIds.has(au.id)) {
      processedUserIds.add(au.id);
      const meta = au.user_metadata ?? {};
      const fullName =
        meta.full_name ||
        (meta.first_name && meta.last_name
          ? `${meta.first_name} ${meta.last_name}`
          : meta.first_name || au.email || 'Élève');

      normalised.push({
        id: au.id,
        full_name: fullName,
        phone: meta.phone || au.phone || au.email || '',
        role: meta.role || 'student',
        level: meta.level || 'Terminale',
        track: meta.track || 'S2',
        avatar_url: meta.avatar || null,
        is_banned: false,
        created_at: au.created_at,
        subscriptions: subsByUserId.get(au.id) ?? [],
      });
    }
  }

  return (
    <main className="min-h-screen bg-surface py-8 px-4">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-turquoise uppercase tracking-wider">
              Back-office Admin
            </span>
            <h1 className="text-2xl font-bold text-navy mt-0.5">Annuaire des Élèves &amp; Utilisateurs</h1>
            <p className="text-text/70 text-sm mt-0.5">
              Consultez les fiches des élèves, gérez les rôles d&apos;accès et suspendez les comptes en cas d&apos;abus.
            </p>
          </div>
          <div className="text-xs text-text/70 bg-white border border-navy/10 rounded-2xl px-4 py-2.5 shadow-sm">
            Total inscrits : <strong className="text-navy font-black text-sm">{normalised.length}</strong>
          </div>
        </div>

        <ElevesManagerClient
          initialProfiles={normalised as Parameters<typeof ElevesManagerClient>[0]['initialProfiles']}
          availablePlans={availablePlans}
        />
      </div>
    </main>
  );
}
