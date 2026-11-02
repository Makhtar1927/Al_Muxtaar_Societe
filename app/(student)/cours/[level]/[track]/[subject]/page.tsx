import React from 'react';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Icon } from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { getSubjectByCode, getTrackByCode } from '@/lib/curriculum/senegal-curriculum';

interface PageProps {
  params: {
    level: string;
    track: string;
    subject: string;
  };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function SubjectChaptersPage({ params }: PageProps) {
  const supabase = createClient();
  const admin = createAdminClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/connexion?redirect=/cours/${params.level}/${params.track}/${params.subject}`);
  }

  // 1. Fetch profile + abonnement EN PARALLÈLE (check subscription via admin pour bypass RLS)
  const [profileResult, activeSubResult] = await Promise.all([
    supabase.from('profiles').select('id, first_name, last_name, role').eq('id', user.id).single(),
    admin
      .from('subscriptions')
      .select('id')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .gte('end_date', new Date().toISOString())
      .limit(1),
  ]);

  const profile = profileResult.data;
  const isSubscribed = profile?.role === 'admin' || (activeSubResult.data?.length ?? 0) > 0;

  // 2. Vérifier le référentiel national sénégalais
  const curriculumData = getSubjectByCode(params.level, params.track, params.subject);
  const trackData = getTrackByCode(params.level, params.track);

  // Si la matière est en production ou programmée (non active)
  if (curriculumData && curriculumData.subject.status !== 'active') {
    const { subject, track, level } = curriculumData;

    return (
      <main className="min-h-screen bg-surface py-8 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Breadcrumb */}
          <nav className="text-xs text-text/50 flex flex-wrap items-center gap-2">
            <Link href="/dashboard" className="hover:text-turquoise transition-colors">
              Tableau de bord
            </Link>
            <span>/</span>
            <Link href="/cours" className="hover:text-turquoise transition-colors">
              Cours
            </Link>
            <span>/</span>
            <span className="capitalize">{level.name} {track.shortName}</span>
            <span>/</span>
            <span className="text-navy font-semibold">{subject.name}</span>
          </nav>

          {/* Sélecteur rapide des matières de la série */}
          {trackData && (
            <div className="flex flex-wrap items-center gap-2 p-2 bg-white rounded-2xl border border-navy/10 shadow-sm">
              <span className="text-[11px] font-bold text-navy/60 px-2 uppercase tracking-wider">
                Matières {track.shortName} :
              </span>
              {trackData.subjects.map((sub) => {
                const isCurrent = sub.code.toLowerCase() === subject.code.toLowerCase();
                return (
                  <Link
                    key={sub.code}
                    href={`/cours/${params.level}/${params.track}/${sub.code}`}
                    className={`rounded-xl px-3 py-1 text-xs font-bold transition-all ${
                      isCurrent
                        ? 'bg-navy text-white shadow-sm'
                        : sub.status === 'active'
                        ? 'bg-turquoise-light text-turquoise hover:bg-turquoise hover:text-white'
                        : 'bg-surface text-navy/70 hover:bg-surface-muted'
                    }`}
                  >
                    <span>{sub.shortName}</span>
                    {sub.status === 'active' && (
                      <span className="ml-1.5 rounded bg-emerald-100 text-emerald-800 px-1 py-0.2 text-[9px] font-black uppercase">
                        Actif
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          )}

          {/* Bannière Officielle du Programme Sénégalais */}
          <div className="bg-white rounded-3xl border border-navy/10 p-6 sm:p-8 shadow-sm space-y-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-[11px] font-bold px-3 py-1">
                    {subject.statusLabel}
                  </span>
                  <span className="text-xs font-bold text-navy/60">
                    Coefficient Bac : <strong>{subject.coeffBac}</strong>
                  </span>
                  <span className="text-xs font-medium text-turquoise">
                    {level.cycle}
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black text-navy mt-3">
                  {subject.name} — {level.name} {track.name}
                </h1>
                <p className="text-xs sm:text-sm text-navy-light mt-2 max-w-2xl leading-relaxed">
                  {subject.description}
                </p>
              </div>

              {/* Responsable pédagogique */}
              <div className="rounded-2xl bg-surface p-4 border border-navy/5 text-right sm:text-left">
                <span className="text-[10px] font-bold uppercase tracking-wider text-navy/50 block">
                  Équipe Pédagogique
                </span>
                <span className="text-xs font-bold text-navy mt-1 block">
                  {subject.teacherLead}
                </span>
                <span className="text-[11px] text-text/60 block mt-0.5">
                  Conforme MEN / IGEF Sénégal
                </span>
              </div>
            </div>

            {/* Barre de progression de numérisation */}
            <div className="rounded-2xl bg-surface/70 p-4 border border-navy/5">
              <div className="flex items-center justify-between text-xs font-semibold text-navy mb-2">
                <span>Avancement de la numérisation des fiches et quiz</span>
                <span className="font-mono text-turquoise font-bold">{subject.progressPercent}%</span>
              </div>
              <ProgressBar value={subject.progressPercent} />
              <p className="text-[11px] text-navy-light mt-2">
                Les cours rédigés sont actuellement en phase de relecture pédagogique et de validation par l&apos;inspection.
              </p>
            </div>
          </div>

          {/* Formulaire de pré-inscription pour être alerté */}
          <div className="rounded-3xl border-2 border-dashed border-turquoise/40 bg-turquoise-light/10 p-6 sm:p-8 text-center space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-turquoise text-white shadow-sm">
              <Icon name="notification" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-black text-navy">
                Soyez alerté(e) dès la sortie des premières fiches de {subject.name}
              </h3>
              <p className="text-xs text-navy-light max-w-md mx-auto mt-1">
                Recevez un SMS et un message WhatsApp dès la publication officielle des chapitres de {track.shortName}.
              </p>
            </div>
            <div className="max-w-md mx-auto flex gap-2">
              <input
                type="tel"
                placeholder="Ex : 77 123 45 67 (Orange ou Wave)"
                className="w-full rounded-xl border border-navy/20 bg-white px-3.5 py-2.5 text-xs text-navy placeholder:text-navy/40 focus:border-turquoise focus:outline-none"
              />
              <Button variant="primary" size="md" className="shrink-0 font-bold">
                M&apos;alerter
              </Button>
            </div>
          </div>

          {/* Liste Officielle des Chapitres et Compétences du Programme */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-black text-navy">
                Programme Officiel ({subject.chapters.length} Chapitres)
              </h2>
              <span className="text-xs text-navy-light">
                Référentiel National MEN
              </span>
            </div>

            <div className="space-y-4">
              {subject.chapters.map((ch, idx) => (
                <div
                  key={ch.id}
                  className="bg-white rounded-2xl border border-navy/10 p-5 shadow-sm space-y-3"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="h-8 w-8 rounded-full bg-navy/10 text-navy font-black text-xs flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <h3 className="font-bold text-navy text-sm sm:text-base">
                          {ch.title}
                        </h3>
                        <p className="text-xs text-navy-light mt-0.5">{ch.desc}</p>
                      </div>
                    </div>
                    <span className="rounded-full bg-surface px-2.5 py-1 text-[10px] font-bold text-navy shrink-0">
                      {ch.lessonsCount} fiches
                    </span>
                  </div>

                  {/* Compétences requises */}
                  {ch.competences && ch.competences.length > 0 && (
                    <div className="rounded-xl bg-surface/60 p-3 border border-navy/5">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-navy/60 block mb-1.5">
                        Compétences exigibles à l&apos;examen :
                      </span>
                      <ul className="grid gap-1 sm:grid-cols-2 text-xs text-navy-light">
                        {ch.competences.map((comp, cIdx) => (
                          <li key={cIdx} className="flex items-start gap-1.5">
                            <Icon name="check" size={12} className="text-turquoise shrink-0 mt-0.5" />
                            <span>{comp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Repère Wolof */}
                  {ch.wolofInsight && (
                    <div className="rounded-xl border border-gold/20 bg-gold-light/20 p-3 text-xs text-[#8A5A00] flex items-center gap-2">
                      <span className="font-bold shrink-0 inline-flex items-center gap-1.5">
                        <Icon name="wolof" size={18} />
                        Xam-xam :
                      </span>
                      <span>{ch.wolofInsight}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  // 3. Sujet Actif (ex: Terminale S2 Mathématiques) : Résolution et chargement BDD
  const { data: subjectRow } = await admin
    .from('subjects')
    .select(`
      id, name, code,
      tracks!inner(
        code, name,
        levels!inner(code, name)
      )
    `)
    .eq('code', params.subject)
    .maybeSingle();

  let subjectId = subjectRow?.id;
  let subjectName = subjectRow?.name ?? curriculumData?.subject.name ?? 'Mathématiques';

  if (!subjectId) {
    const { data: anySub } = await admin
      .from('subjects')
      .select('id, name')
      .ilike('code', `%${params.subject}%`)
      .limit(1)
      .maybeSingle();
    subjectId = anySub?.id;
    if (anySub?.name) subjectName = anySub.name;
  }

  // ── Fetch chapters + progression EN PARALLÈLE (auto-sync supprimé) ──
  const chaptersBaseQuery = admin
    .from('chapters')
    .select(`id, title, order_index, status, lessons(id, title, order_index, is_free, status)`)
    .eq('status', 'published')
    .order('order_index');

  const [chaptersResult, progressResult] = await Promise.all([
    subjectId
      ? chaptersBaseQuery.eq('subject_id', subjectId)
      : chaptersBaseQuery,
    supabase
      .from('progress')
      .select('lesson_id')
      .eq('user_id', user.id)
      .eq('is_completed', true),
  ]);

  let chapters = chaptersResult.data;

  // Fallback : si aucun chapitre trouvé avec subject_id, charger tous les publiés
  if ((!chapters || chapters.length === 0) && subjectId) {
    const { data: allPub } = await admin
      .from('chapters')
      .select(`id, title, order_index, status, lessons(id, title, order_index, is_free, status)`)
      .eq('status', 'published')
      .order('order_index');
    chapters = allPub;
  }

  const completedProgress = progressResult.data;
  const completedLessonIds = new Set((completedProgress ?? []).map((p) => p.lesson_id));

  let totalLessons = 0;
  let totalCompleted = 0;

  (chapters ?? []).forEach((ch) => {
    (ch.lessons ?? []).forEach((l: any) => {
      if (l.status === 'published') {
        totalLessons += 1;
        if (completedLessonIds.has(l.id)) {
          totalCompleted += 1;
        }
      }
    });
  });

  const overallProgress = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  return (
    <main className="min-h-screen bg-surface py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-text/50 flex flex-wrap items-center gap-2">
          <Link href="/dashboard" className="hover:text-turquoise transition-colors">
            Tableau de bord
          </Link>
          <span>/</span>
          <Link href="/cours" className="hover:text-turquoise transition-colors">
            Cours
          </Link>
          <span>/</span>
          <span className="capitalize">{params.level} {params.track.toUpperCase()}</span>
          <span>/</span>
          <span className="text-navy font-semibold">{subjectName}</span>
        </nav>

        {/* Sélecteur rapide des matières de la série */}
        {trackData && (
          <div className="flex flex-wrap items-center gap-2 p-2 bg-white rounded-2xl border border-navy/10 shadow-sm">
            <span className="text-[11px] font-bold text-navy/60 px-2 uppercase tracking-wider">
              Matières {trackData.shortName} :
            </span>
            {trackData.subjects.map((sub) => {
              const isCurrent = sub.code.toLowerCase() === params.subject.toLowerCase();
              return (
                <Link
                  key={sub.code}
                  href={`/cours/${params.level}/${params.track}/${sub.code}`}
                  className={`rounded-xl px-3 py-1 text-xs font-bold transition-all ${
                    isCurrent
                      ? 'bg-navy text-white shadow-sm'
                      : sub.status === 'active'
                      ? 'bg-turquoise-light text-turquoise hover:bg-turquoise hover:text-white'
                      : 'bg-surface text-navy/70 hover:bg-surface-muted'
                  }`}
                >
                  <span>{sub.shortName}</span>
                  {sub.status === 'active' && (
                    <span className="ml-1.5 rounded bg-emerald-100 text-emerald-800 px-1 py-0.2 text-[9px] font-black uppercase">
                      Actif
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        )}

        {/* Header & global progress card */}
        <div className="bg-white rounded-3xl border border-navy/10 p-6 sm:p-8 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-turquoise uppercase tracking-wider">
                  Programme Officiel — {params.level.toUpperCase()} {params.track.toUpperCase()}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-navy mt-1">{subjectName}</h1>
            </div>
            {!isSubscribed && (
              <Link
                href="/abonnement"
                className="inline-flex items-center gap-2 bg-turquoise text-white font-semibold text-xs px-3.5 py-2 rounded-xl hover:bg-turquoise/90 transition-colors shadow-sm"
              >
                <span>Débloquer tous les chapitres</span>
              </Link>
            )}
          </div>

          <div className="pt-2">
            <div className="flex justify-between text-xs text-text/70 mb-1.5 font-medium">
              <span>Progression globale</span>
              <span>{totalCompleted} sur {totalLessons} leçons terminées ({overallProgress}%)</span>
            </div>
            <ProgressBar value={overallProgress} />
          </div>
        </div>

        {/* Chapters list */}
        <div className="space-y-4">
          {(chapters ?? []).map((ch: any, chIdx) => {
            const publishedLessons = (ch.lessons ?? [])
              .filter((l: any) => l.status === 'published')
              .sort((a: any, b: any) => (a.order_index ?? 0) - (b.order_index ?? 0));

            const chCompleted = publishedLessons.filter((l: any) => completedLessonIds.has(l.id)).length;
            const chProgress = publishedLessons.length > 0 ? Math.round((chCompleted / publishedLessons.length) * 100) : 0;

            return (
              <div
                key={ch.id}
                className="bg-white rounded-2xl border border-navy/10 overflow-hidden shadow-sm"
              >
                {/* Chapter header */}
                <div className="bg-surface/60 px-5 py-4 border-b border-navy/10 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center shrink-0">
                      {chIdx + 1}
                    </span>
                    <div>
                      <h2 className="font-bold text-navy text-base">{ch.title}</h2>
                      <p className="text-xs text-text/50">
                        {publishedLessons.length} leçon{publishedLessons.length > 1 ? 's' : ''} • {chCompleted} terminée{chCompleted > 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <div className="w-24 hidden sm:block">
                    <ProgressBar value={chProgress} />
                  </div>
                </div>

                {/* Lesson rows */}
                <div className="divide-y divide-navy/5">
                  {publishedLessons.length === 0 ? (
                    <div className="px-5 py-4 text-xs text-text/50 text-center">
                      Leçons en cours de rédaction par l&apos;équipe pédagogique.
                    </div>
                  ) : (
                    publishedLessons.map((lesson: any, lIdx: number) => {
                      const isCompleted = completedLessonIds.has(lesson.id);
                      // Seule la toute première leçon de la matière est gratuite
                      const isFirstLessonOfSubject = chIdx === 0 && lIdx === 0;
                      const isFree = isFirstLessonOfSubject;
                      const canAccess = isSubscribed || isFree;

                      return (
                        <div
                          key={lesson.id}
                          className="px-5 py-3.5 flex items-center justify-between gap-4 hover:bg-surface/40 transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 ${isCompleted ? 'bg-emerald-500 text-white font-bold' : !canAccess ? 'bg-surface text-navy/40' : 'border border-navy/20 text-text/40'}`}>
                              {isCompleted ? (
                                <Icon name="check" size={12} className="text-white" />
                              ) : !canAccess ? (
                                <Icon name="cadenas" size={12} />
                              ) : (
                                lIdx + 1
                              )}
                            </span>
                            <Link
                              href={`/cours/${params.level}/${params.track}/${params.subject}/${ch.id}/${lesson.id}`}
                              className={`font-medium text-sm transition-colors truncate ${
                                canAccess
                                  ? 'text-navy hover:text-turquoise'
                                  : 'text-navy/60 hover:text-navy'
                              }`}
                            >
                              {lesson.title}
                            </Link>
                            {isFree && (
                              <span className="text-[10px] bg-turquoise-light text-turquoise font-bold rounded-full px-2 py-0.5 whitespace-nowrap">
                                Aperçu gratuit
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            {!canAccess ? (
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-text/50 flex items-center gap-1 font-medium bg-surface px-2.5 py-1 rounded-full border border-navy/10">
                                  <Icon name="cadenas" size={13} className="text-navy/40" />
                                  <span>Réservé Abonnés</span>
                                </span>
                                <Link
                                  href="/abonnement"
                                  className="text-xs font-bold text-turquoise hover:underline hidden sm:inline"
                                >
                                  Débloquer →
                                </Link>
                              </div>
                            ) : (
                              <Link
                                href={`/cours/${params.level}/${params.track}/${params.subject}/${ch.id}/${lesson.id}`}
                                className="text-xs font-semibold text-turquoise hover:underline"
                              >
                                {isCompleted ? 'Revoir' : 'Commencer'} →
                              </Link>
                            )}
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
