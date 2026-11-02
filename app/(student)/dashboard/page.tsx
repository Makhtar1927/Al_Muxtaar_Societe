import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Avatar } from '@/components/ui/avatar';
import { Icon } from '@/components/ui/icon';
import {
  SENEGAL_CURRICULUM,
  getLevelByCode,
  getTrackByCode,
  normalizeStudentCurriculum,
} from '@/lib/curriculum/senegal-curriculum';
import {
  BookOpen,
  Play,
  ArrowRight,
} from 'lucide-react';
import { WhatsAppLogo } from '@/components/ui/icons/whatsapp-logo';

export const metadata: Metadata = {
  title: 'Tableau de bord — Al Muxtaar',
  description: 'Suivi de révision et progression du programme Terminale S2.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

function getCountdown(endDate: string | null) {
  if (!endDate) return { days: 30, hours: 0, isExpired: false };
  const diff = new Date(endDate).getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, isExpired: true };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  return { days, hours, isExpired: false };
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default async function DashboardPage() {
  const supabase = createClient();
  const admin = createAdminClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/connexion?redirect=/dashboard');
  }

  // ── 1. Fetch profile + abonnement actif EN PARALLÈLE ──
  const [profileResult, activeSubResult] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).single(),
    admin
      .from('subscriptions')
      .select('id, status, start_date, end_date')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .order('end_date', { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  const profile = profileResult.data;
  const activeSub = activeSubResult.data;

  const fullName =
    profile?.first_name && profile?.last_name
      ? `${profile.first_name} ${profile.last_name}`
      : profile?.first_name || 'Élève';
  const avatarName = profile?.avatar || 'avatar_01_eleve_garcon.svg';
  const isUserAdmin = profile?.role === 'admin';

  // Résoudre la classe et filière personnalisée de l'élève
  const { levelCode, trackCode } = normalizeStudentCurriculum(
    profile?.level,
    profile?.track
  );
  const studentLevel = getLevelByCode(levelCode) || SENEGAL_CURRICULUM[0];
  const studentTrack =
    getTrackByCode(levelCode, trackCode) || studentLevel.tracks[0];

  // ── 2. Abonnement pending seulement si pas d'actif (requête conditionnelle) ──
  const { data: pendingSub } = !activeSub
    ? await admin
        .from('subscriptions')
        .select('id, status, start_date, end_date')
        .eq('user_id', user.id)
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle()
    : { data: null };

  const isActiveSub = Boolean(activeSub) || isUserAdmin;
  const isPendingSub = !activeSub && Boolean(pendingSub);
  const countdown = getCountdown(activeSub?.end_date ?? null);

  // ── 3. Fetch chapters + progress EN PARALLÈLE (auto-sync supprimé) ──
  const [chaptersResult, progressResult] = await Promise.all([
    admin
      .from('chapters')
      .select(`id, title, order_index, status, lessons(id, title, order_index, is_free, status)`)
      .eq('status', 'published')
      .order('order_index'),
    supabase
      .from('progress')
      .select('lesson_id, is_completed, last_read_at')
      .eq('user_id', user.id),
  ]);

  const chapters = chaptersResult.data;
  const progressRows = progressResult.data;

  const completedLessonIds = new Set(
    (progressRows ?? []).filter((p) => p.is_completed).map((p) => p.lesson_id)
  );

  // Compute overall statistics
  let totalLessons = 0;
  let completedCount = 0;
  let resumeLesson: { chapterId: string; lessonId: string; title: string } | null = null;

  for (const ch of (chapters as any[]) ?? []) {
    const pubLessons = (ch.lessons ?? [])
      .filter((l: any) => l.status === 'published')
      .sort((a: any, b: any) => (a.order_index ?? 0) - (b.order_index ?? 0));

    for (const l of pubLessons) {
      totalLessons += 1;
      if (completedLessonIds.has(l.id)) {
        completedCount += 1;
      } else if (!resumeLesson) {
        resumeLesson = {
          chapterId: ch.id,
          lessonId: l.id,
          title: l.title,
        };
      }
    }
  }

  const overallPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;

  // WhatsApp support link
  const waSupport = process.env.NEXT_PUBLIC_WHATSAPP_SUPPORT ?? '221770000000';

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10 space-y-8">
      {/* ── 1. Welcome Card ── */}
      <div className="rounded-3xl bg-navy p-6 sm:p-8 text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <Avatar name={avatarName} size="xl" isBordered />
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-turquoise">
              <Icon name="doc" size={14} />
              {studentTrack.name} ({studentLevel.name})
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mt-1.5">
              Bonjour, {fullName} !
            </h1>
            <p className="text-xs sm:text-sm text-surface-muted mt-0.5">
              Suis ta progression et prépare le {studentLevel.examName} avec succès.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {resumeLesson ? (
            <Link
              href={
                isActiveSub || resumeLesson.lessonId === '60000000-0000-0000-0000-000000000001'
                  ? `/cours/${studentLevel.code}/${studentTrack.code}/mathematiques/${resumeLesson.chapterId}/${resumeLesson.lessonId}`
                  : '/abonnement'
              }
            >
              <Button variant="primary" size="md" className="flex items-center gap-2">
                <Play className="w-4 h-4 fill-current" />
                Reprendre : {resumeLesson.title.slice(0, 20)}…
              </Button>
            </Link>
          ) : (
            <Link href={`/cours/${studentLevel.code}/${studentTrack.code}/mathematiques`}>
              <Button variant="primary" size="md" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Accéder aux cours
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* ── 2. Subscription Status Banner avec Compte à Rebours ── */}
      {isActiveSub ? (
        <div className="rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-50/90 to-teal-50/70 p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            {/* Infos abonnement */}
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600/10 border border-emerald-600/20 flex items-center justify-center shrink-0">
                <Icon name="calendrier" size={28} />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                    {isUserAdmin ? "Compte Administrateur — Accès Illimité" : `Abonnement Actif · ${studentTrack.shortName}`}
                  </span>
                </div>
                <h3 className="text-lg font-extrabold text-navy">
                  Tous les cours, méthodes et corrigés sont débloqués
                </h3>
                {activeSub?.end_date ? (
                  <p className="text-xs text-navy/70 mt-0.5">
                    Valable jusqu&apos;au <span className="font-semibold text-navy">{formatDate(activeSub.end_date)}</span>
                  </p>
                ) : (
                  <p className="text-xs text-navy/70 mt-0.5">
                    Accès permanent actif
                  </p>
                )}
              </div>
            </div>

            {/* Compte à rebours visuel */}
            {!isUserAdmin && activeSub?.end_date && (
              <div className="flex items-center gap-3 bg-white/80 backdrop-blur-sm px-4 py-2.5 rounded-2xl border border-emerald-200/80 shadow-sm self-stretch sm:self-auto justify-around">
                <div className="text-center">
                  <span className="block text-xl sm:text-2xl font-black text-emerald-700 leading-none">
                    {countdown.days}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-navy/60 tracking-wider">
                    Jours
                  </span>
                </div>
                <span className="text-emerald-400 font-bold text-lg leading-none">:</span>
                <div className="text-center">
                  <span className="block text-xl sm:text-2xl font-black text-emerald-700 leading-none">
                    {countdown.hours}
                  </span>
                  <span className="text-[10px] uppercase font-bold text-navy/60 tracking-wider">
                    Heures
                  </span>
                </div>
                <div className="border-l border-emerald-200 pl-3 ml-1 text-left hidden sm:block">
                  <p className="text-[11px] font-bold text-emerald-900 leading-tight">Temps</p>
                  <p className="text-[10px] text-navy/60 leading-tight">restant</p>
                </div>
              </div>
            )}

            {/* Bouton pour prolonger si besoin */}
            <div>
              <Link href="/abonnement">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-white hover:bg-emerald-50 text-emerald-900 border-emerald-300 font-semibold text-xs whitespace-nowrap shadow-sm"
                >
                  Prolonger mon abonnement
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ) : isPendingSub ? (
        <div className="rounded-2xl p-5 border border-gold/40 bg-gold/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <Icon name="paiement" size={36} />
            <div>
              <p className="font-bold text-sm text-navy">
                Demande d&apos;abonnement en cours de validation
              </p>
              <p className="text-xs text-text/70 mt-0.5">
                L&apos;administrateur vérifie votre paiement Wave sous peu.
              </p>
            </div>
          </div>
          <Link href="/abonnement">
            <Button variant="outline" size="sm">
              Voir ma demande
            </Button>
          </Link>
        </div>
      ) : (
        <div className="rounded-2xl p-5 border border-amber-300 bg-amber-50/90 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <Icon name="cadenas" size={36} />
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 bg-amber-200/70 px-2.5 py-0.5 rounded-full mb-1">
                Compte Découverte (1ère leçon gratuite)
              </div>
              <p className="font-bold text-sm text-navy">
                Seule la 1ère leçon de chaque matière est accessible gratuitement
              </p>
              <p className="text-xs text-navy/70 mt-0.5">
                Abonnez-vous dès 700 FCFA pour débloquer l&apos;intégralité des 13 chapitres, exercices et quiz.
              </p>
            </div>
          </div>
          <Link href="/abonnement">
            <Button variant="primary" size="sm" className="whitespace-nowrap">
              Débloquer l&apos;accès complet (Dès 700 FCFA)
            </Button>
          </Link>
        </div>
      )}

      {/* ── 3. Overview Metrics ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="text-center py-4">
          <p className="text-3xl font-extrabold text-navy">{completedCount}</p>
          <p className="text-xs text-text/60 mt-1 font-medium">Leçons terminées</p>
        </Card>
        <Card className="text-center py-4">
          <p className="text-3xl font-extrabold text-turquoise">{overallPercent}%</p>
          <p className="text-xs text-text/60 mt-1 font-medium">Progression globale</p>
        </Card>
        <Card className="text-center py-4">
          <p className="text-3xl font-extrabold text-gold">{chapters?.length ?? 0}</p>
          <p className="text-xs text-text/60 mt-1 font-medium">Chapitres disponibles</p>
        </Card>
        <Card className="text-center py-4">
          <p className="text-3xl font-extrabold text-navy">{studentTrack.code.toUpperCase()}</p>
          <p className="text-xs text-text/60 mt-1 font-medium">{studentLevel.name}</p>
        </Card>
      </div>

      {/* ── 4. Main Chapters Progression Section ── */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-bold text-navy">
            Progression — Mathématiques ({studentTrack.shortName})
          </h2>
          <div className="flex items-center gap-3">
            <Link
              href="/cours"
              className="text-xs font-bold text-navy hover:text-turquoise transition-colors flex items-center gap-1"
            >
              <Icon name="cours" size={14} />
              <span>Mes matières ({studentTrack.subjects.length})</span>
            </Link>
            <span className="text-navy/20">|</span>
            <Link
              href={`/cours/${studentLevel.code}/${studentTrack.code}/mathematiques`}
              className="text-xs font-semibold text-turquoise hover:underline flex items-center gap-1"
            >
              <span>Voir tout le programme</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        <div className="space-y-3">
          {(chapters as any[] ?? []).map((ch, idx) => {
            const pubLessons = (ch.lessons ?? [])
              .filter((l: any) => l.status === 'published')
              .sort((a: any, b: any) => (a.order_index ?? 0) - (b.order_index ?? 0));

            const chDone = pubLessons.filter((l: any) => completedLessonIds.has(l.id)).length;
            const chPercent = pubLessons.length > 0 ? Math.round((chDone / pubLessons.length) * 100) : 0;
            const firstLesson = pubLessons[0];
            const isFirstLessonAccessible = isActiveSub || idx === 0;

            return (
              <div
                key={ch.id}
                className="bg-white rounded-2xl border border-navy/10 p-5 shadow-sm hover:border-turquoise/40 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-7 h-7 rounded-full bg-navy/10 text-navy text-xs font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <h3 className="font-semibold text-navy text-sm sm:text-base">
                        {ch.title}
                      </h3>
                      <p className="text-xs text-text/50">
                        {chDone} sur {pubLessons.length} leçons terminées
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-navy shrink-0">
                      {chPercent}%
                    </span>
                    {firstLesson && (
                      isFirstLessonAccessible ? (
                        <Link
                          href={`/cours/${studentLevel.code}/${studentTrack.code}/mathematiques/${ch.id}/${firstLesson.id}`}
                          className="text-xs text-turquoise font-semibold hover:underline flex items-center gap-0.5"
                        >
                          <span>{idx === 0 && !isActiveSub ? '1ère Leçon Gratuite' : chPercent === 100 ? 'Revoir' : 'Continuer'}</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      ) : (
                        <Link
                          href="/abonnement"
                          className="text-xs text-amber-700 font-semibold hover:underline flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200"
                        >
                          <Icon name="cadenas" size={12} />
                          <span>Débloquer</span>
                        </Link>
                      )
                    )}
                  </div>
                </div>

                <ProgressBar value={chPercent} />
              </div>
            );
          })}
        </div>
      </div>

      {/* ── 5. Announcements & Quick Links ── */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Pedagogical announcements */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2.5">
              <Icon name="notification" size={24} />
              <span>Annonces pédagogiques</span>
            </CardTitle>
            <CardDescription>Nouvelles de l&apos;équipe Al Muxtaar</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-text/80">
            <div className="border-l-2 border-turquoise pl-3 py-1">
              <p className="font-semibold text-navy text-xs">Préparation Bac Sénégal 2026</p>
              <p className="text-xs text-text/70 mt-0.5">
                Tous les chapitres d&apos;analyse (limites, dérivées, intégrales) sont optimisés avec les corrections pas à pas conformes au barème officiel de l&apos;Office du Bac.
              </p>
            </div>
            <div className="border-l-2 border-gold pl-3 py-1">
              <p className="font-semibold text-navy text-xs">Bientôt : S1, L2, PC, SVT & BFEM</p>
              <p className="text-xs text-text/70 mt-0.5">
                La numérisation du référentiel national se poursuit. Tle S1, L2, Physique-Chimie, SVT et 3e BFEM seront publiés progressivement. Vos abonnés y auront accès automatiquement.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Help & Support */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2.5">
              <Icon name="service" size={24} />
              <span>Support &amp; Assistance</span>
            </CardTitle>
            <CardDescription>Une question sur la plateforme ?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-xs text-text/70 leading-relaxed">
              Notre équipe d&apos;assistance est à votre écoute pour toute question concernant les cours, les abonnements Wave ou les identifiants de connexion.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href={`https://wa.me/${waSupport.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="flex-1"
              >
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full bg-[#25D366]/15 hover:bg-[#25D366]/25 border border-[#25D366]/30 text-emerald-950 font-bold gap-2"
                >
                  <WhatsAppLogo size={18} />
                  <span>Support WhatsApp</span>
                </Button>
              </a>
              <Link href="/compte" className="flex-1">
                <Button variant="outline" size="sm" className="w-full">
                  Mon Compte
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── 6. Découvrir toutes les séries ── */}
      <div className="rounded-3xl border border-navy/10 bg-white p-6 shadow-sm space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-turquoise">
              Référentiel National Sénégalais
            </span>
            <h2 className="text-lg font-black text-navy mt-0.5">
              Explorer toutes les séries & matières disponibles
            </h2>
          </div>
          <Link
            href="/cours"
            className="inline-flex items-center gap-1.5 rounded-xl bg-turquoise-light text-turquoise font-bold text-xs px-3.5 py-2 hover:bg-turquoise hover:text-white transition-colors"
          >
            <span>Voir le hub complet</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Tle S2 Maths', href: '/cours/terminale/s2/mathematiques', active: true },
            { label: 'Tle S1 Maths', href: '/cours/terminale/s1/mathematiques', active: false },
            { label: 'Tle L2 Philo', href: '/cours/terminale/l2/philosophie', active: false },
            { label: '3e BFEM Maths', href: '/cours/troisieme/bfem/mathematiques', active: false },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-2xl border p-3 text-center text-xs font-bold transition-all ${
                item.active
                  ? 'border-turquoise bg-turquoise text-white shadow-sm hover:bg-turquoise/90'
                  : 'border-navy/10 bg-surface text-navy hover:border-turquoise/40 hover:text-turquoise'
              }`}
            >
              {item.label}
              {!item.active && (
                <span className="block text-[10px] font-medium mt-0.5 opacity-60">
                  Bientôt disponible
                </span>
              )}
              {item.active && (
                <span className="inline-flex items-center justify-center gap-1 text-[10px] font-bold mt-0.5 opacity-90">
                  <Icon name="reflexes" size={12} />
                  <span>Module Actif</span>
                </span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
