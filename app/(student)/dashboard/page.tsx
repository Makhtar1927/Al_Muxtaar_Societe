import type { Metadata } from 'next';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Avatar } from '@/components/ui/avatar';
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  BookOpen,
  Play,
  ArrowRight,
  Megaphone,
  MessageCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Tableau de bord — Al Muxtaar',
  description: 'Suivi de révision et progression du programme Terminale S2.',
};

export const dynamic = 'force-dynamic';

function daysLeft(endDate: string) {
  const diff = new Date(endDate).getTime() - Date.now();
  return Math.max(0, Math.ceil(diff / 86_400_000));
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

  // 1. Fetch student profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  const fullName =
    profile?.first_name && profile?.last_name
      ? `${profile.first_name} ${profile.last_name}`
      : profile?.first_name || 'Élève';
  const avatarName = profile?.avatar || 'avatar_01_eleve_garcon.svg';

  // 2. Fetch active/pending subscription
  const { data: currentSub } = await supabase
    .from('subscriptions')
    .select('id, status, start_date, end_date, plans(name, price_fcfa, duration_days)')
    .eq('user_id', user.id)
    .in('status', ['active', 'pending', 'expired'])
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  const isActiveSub = currentSub?.status === 'active';
  const isPendingSub = currentSub?.status === 'pending';
  const remainingDays = currentSub && isActiveSub && currentSub.end_date ? daysLeft(currentSub.end_date) : 0;

  // 3. Fetch chapters and lessons for Terminale S2 Maths
  const { data: chapters } = await admin
    .from('chapters')
    .select(`
      id, title, sort_order, status,
      lessons(id, title, sort_order, is_free_preview, status)
    `)
    .eq('status', 'published')
    .order('sort_order');

  // 4. Fetch user progress
  const { data: progressRows } = await supabase
    .from('progress')
    .select('lesson_id, chapter_id, is_completed, updated_at')
    .eq('student_id', user.id);

  const completedLessonIds = new Set(
    (progressRows ?? []).filter((p) => p.is_completed).map((p) => p.lesson_id)
  );

  // Compute overall statistics
  let totalLessons = 0;
  let completedCount = 0;
  let resumeLesson: { chapterId: string; lessonId: string; title: string } | null = null;

  for (const ch of chapters ?? []) {
    const pubLessons = (ch.lessons ?? [])
      .filter((l) => l.status === 'published')
      .sort((a, b) => a.sort_order - b.sort_order);

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
              Terminale S2 · Mathématiques
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold mt-1.5">
              Bonjour, {fullName} !
            </h1>
            <p className="text-xs sm:text-sm text-surface-muted mt-0.5">
              Suis ta progression et prépare le Baccalauréat avec succès.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {resumeLesson ? (
            <Link
              href={`/cours/terminale/s2/mathematiques/${resumeLesson.chapterId}/${resumeLesson.lessonId}`}
            >
              <Button variant="primary" size="md" className="flex items-center gap-2">
                <Play className="w-4 h-4 fill-current" />
                Reprendre : {resumeLesson.title.slice(0, 20)}…
              </Button>
            </Link>
          ) : (
            <Link href="/cours/terminale/s2/mathematiques">
              <Button variant="primary" size="md" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Accéder aux cours
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* ── 2. Subscription Status Banner ── */}
      {isActiveSub ? (
        <div
          className={`rounded-2xl p-5 border flex flex-col sm:flex-row items-center justify-between gap-4 ${
            remainingDays <= 7
              ? 'bg-coral/10 border-coral/30 text-coral'
              : 'bg-white border-navy/10 text-navy'
          }`}
        >
          <div className="flex items-center gap-3 text-center sm:text-left">
            {remainingDays <= 7 ? (
              <AlertCircle className="w-6 h-6 text-coral shrink-0" strokeWidth={2} />
            ) : (
              <CheckCircle2 className="w-6 h-6 text-turquoise shrink-0" strokeWidth={2} />
            )}
            <div>
              <p className="font-bold text-sm sm:text-base">
                {remainingDays <= 7
                  ? `Attention : il te reste seulement ${remainingDays} jour${remainingDays > 1 ? 's' : ''} d'abonnement !`
                  : 'Abonnement actif — Accès complet à tous les cours'}
              </p>
              {currentSub.end_date && (
                <p className="text-xs text-text/70 mt-0.5">
                  Valide jusqu&apos;au {formatDate(currentSub.end_date)}
                </p>
              )}
            </div>
          </div>
          <Link href="/abonnement">
            <Button
              variant={remainingDays <= 7 ? 'coral' : 'outline'}
              size="sm"
            >
              Renouveler mon abonnement
            </Button>
          </Link>
        </div>
      ) : isPendingSub ? (
        <div className="rounded-2xl p-5 border border-gold/40 bg-gold/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <Clock className="w-6 h-6 text-gold shrink-0" strokeWidth={2} />
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
        <div className="rounded-2xl p-5 border border-turquoise/30 bg-turquoise/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <Sparkles className="w-6 h-6 text-turquoise shrink-0" strokeWidth={2} />
            <div>
              <p className="font-bold text-sm text-navy">
                Débloque tous les cours, corrigés détaillés et quiz
              </p>
              <p className="text-xs text-text/70 mt-0.5">
                Formule solidaire dès 700 FCFA via Wave officiel.
              </p>
            </div>
          </div>
          <Link href="/abonnement">
            <Button variant="primary" size="sm">
              S&apos;abonner (Dès 700 FCFA)
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
          <p className="text-3xl font-extrabold text-navy">Tle S2</p>
          <p className="text-xs text-text/60 mt-1 font-medium">Série &amp; Niveau</p>
        </Card>
      </div>

      {/* ── 4. Main Chapters Progression Section ── */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-navy">
            Progression par chapitre — Mathématiques
          </h2>
          <Link
            href="/cours/terminale/s2/mathematiques"
            className="text-xs font-semibold text-turquoise hover:underline flex items-center gap-1"
          >
            <span>Voir tout le programme</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-3">
          {(chapters ?? []).map((ch, idx) => {
            const pubLessons = (ch.lessons ?? [])
              .filter((l) => l.status === 'published')
              .sort((a, b) => a.sort_order - b.sort_order);

            const chDone = pubLessons.filter((l) => completedLessonIds.has(l.id)).length;
            const chPercent = pubLessons.length > 0 ? Math.round((chDone / pubLessons.length) * 100) : 0;
            const firstLesson = pubLessons[0];

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
                      <Link
                        href={`/cours/terminale/s2/mathematiques/${ch.id}/${firstLesson.id}`}
                        className="text-xs text-turquoise font-semibold hover:underline flex items-center gap-0.5"
                      >
                        <span>{chPercent === 100 ? 'Revoir' : 'Continuer'}</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
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
            <CardTitle className="text-base flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-turquoise" strokeWidth={2} />
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
              <p className="font-semibold text-navy text-xs">Séances de questions-réponses</p>
              <p className="text-xs text-text/70 mt-0.5">
                Des difficultés sur un exercice ? Contacte directement notre équipe d&apos;enseignants via WhatsApp.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Help & Support */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-turquoise" strokeWidth={2} />
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
                <Button variant="secondary" size="sm" className="w-full">
                  WhatsApp Support
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
    </div>
  );
}
