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
import {
  PHYSIQUE_CHIMIE_CHAPTERS,
  ensurePhysiqueChimieInDatabase,
} from '@/lib/curriculum/physique-chimie-data';
import {
  MATHEMATIQUES_CHAPTERS,
  MATHEMATIQUES_DOMAINS,
  ensureMathematiquesInDatabase,
} from '@/lib/curriculum/mathematiques-data';
import {
  SVT_CHAPTERS,
  SVT_DOMAINS,
  ensureSvtInDatabase,
} from '@/lib/curriculum/svt-data';
import MathsRecueilEpreuves from '@/components/course/maths-recueil-epreuves';

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

  const isPhysiqueChimie = params.subject === 'physique-chimie';
  const isMaths = params.subject.includes('math');
  const isSvt = params.subject === 'svt';

  // 3. Sujet Actif (ex: Terminale S2 Mathématiques ou Sciences Physiques ou SVT)
  let subjectId: string | undefined;
  let subjectName = curriculumData?.subject.name ?? 'Sciences de la Vie et de la Terre (SVT)';

  if (isPhysiqueChimie) {
    subjectName = 'Sciences Physiques (PC)';
    ensurePhysiqueChimieInDatabase(admin).catch((e) =>
      console.error('Erreur sync PC:', e)
    );
  } else if (isMaths) {
    subjectName = 'Mathématiques';
    ensureMathematiquesInDatabase(admin).catch((e) =>
      console.error('Erreur sync Maths:', e)
    );
  } else if (isSvt) {
    subjectName = 'Sciences de la Vie et de la Terre (SVT)';
    ensureSvtInDatabase(admin).catch((e) =>
      console.error('Erreur sync SVT:', e)
    );
  } else {
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

    subjectId = subjectRow?.id;
    if (subjectRow?.name) subjectName = subjectRow.name;

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
  }

  // ── Fetch chapters + progression EN PARALLÈLE ──
  const chaptersBaseQuery = admin
    .from('chapters')
    .select(`id, title, order_index, status, lessons(id, title, order_index, is_free, status)`)
    .eq('status', 'published')
    .order('order_index');

  const [chaptersResult, progressResult] = await Promise.all([
    isPhysiqueChimie
      ? Promise.resolve({ data: PHYSIQUE_CHIMIE_CHAPTERS as any[] })
      : isMaths
      ? Promise.resolve({ data: MATHEMATIQUES_CHAPTERS as any[] })
      : isSvt
      ? Promise.resolve({ data: SVT_CHAPTERS as any[] })
      : subjectId
      ? chaptersBaseQuery.eq('subject_id', subjectId)
      : chaptersBaseQuery,
    supabase
      .from('progress')
      .select('lesson_id')
      .eq('user_id', user.id)
      .eq('is_completed', true),
  ]);

  let chapters = isPhysiqueChimie
    ? (PHYSIQUE_CHIMIE_CHAPTERS as any[])
    : isMaths
    ? (MATHEMATIQUES_CHAPTERS as any[])
    : isSvt
    ? (SVT_CHAPTERS as any[])
    : chaptersResult.data;

  // Fallback sécurisé : UNIQUEMENT pour les mathématiques si la BDD est vierge
  if (!isPhysiqueChimie && !isMaths && !isSvt && (!chapters || chapters.length === 0) && params.subject.includes('math')) {
    chapters = MATHEMATIQUES_CHAPTERS as any[];
  }

  // Filtrage strict : Les Mathématiques ne doivent JAMAIS contenir de chapitres de Physique-Chimie
  if (!isPhysiqueChimie && !isSvt) {
    chapters = (chapters ?? []).filter((ch: any) => {
      const t = (ch.title || '').toLowerCase().trim();
      const isPC =
        t.startsWith('c1') ||
        t.startsWith('c2') ||
        t.startsWith('c3') ||
        t.startsWith('c4') ||
        t.startsWith('c5') ||
        t.startsWith('c6') ||
        t.startsWith('c7') ||
        t.startsWith('c8') ||
        t.startsWith('c9') ||
        t.startsWith('p1') ||
        t.startsWith('p2') ||
        t.startsWith('p3') ||
        t.startsWith('p4') ||
        t.startsWith('p5') ||
        t.startsWith('p6') ||
        t.startsWith('p7') ||
        t.startsWith('p8') ||
        t.startsWith('p9') ||
        t.startsWith('p10') ||
        t.includes('alcool') ||
        t.includes('amine') ||
        t.includes('acide') ||
        t.includes('cinétique') ||
        t.includes('cinetique') ||
        t.includes('chimie') ||
        t.includes('newton') ||
        t.includes('mouvement') ||
        t.includes('projectile') ||
        t.includes('oscillation') ||
        t.includes('induction') ||
        t.includes('nucléaire') ||
        t.includes('nucleaire');
      return !isPC;
    });
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

        {/* Chapters / Lessons list */}
        {isPhysiqueChimie ? (
          /* En Physique-Chimie : Chaque C1-C9 et P1-P10 est directement une leçon sans sous-leçons */
          <div className="space-y-3">
            {(chapters ?? []).map((ch: any, chIdx) => {
              const firstLesson = ch.lessons?.[0];
              const isFirstLessonOfSubject = chIdx === 0;
              const isFree = isFirstLessonOfSubject;
              const canAccess = isSubscribed || isFree;
              const isCompleted = firstLesson ? completedLessonIds.has(firstLesson.id) : false;
              const isChimie = ch.part === 'Chimie' || (ch.code && ch.code.startsWith('C'));

              return (
                <div
                  key={ch.id}
                  className="bg-white rounded-2xl border border-navy/10 p-4 sm:p-5 shadow-sm hover:border-turquoise/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start sm:items-center gap-3.5">
                    {/* Badge C1, C2, P1... */}
                    <div
                      className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center font-black shrink-0 ${
                        isCompleted
                          ? 'bg-emerald-500 text-white shadow-sm'
                          : isChimie
                          ? 'bg-turquoise-light/40 text-turquoise border border-turquoise/20'
                          : 'bg-navy text-white shadow-sm'
                      }`}
                    >
                      <span className="text-sm leading-none font-mono font-black">{ch.code || `L${chIdx + 1}`}</span>
                      <span className="text-[9px] uppercase opacity-75 font-sans mt-0.5 font-bold">
                        {isChimie ? 'Chimie' : 'Physique'}
                      </span>
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        {ch.subDomain && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-navy/40">
                            {ch.subDomain}
                          </span>
                        )}
                        {isFree && (
                          <span className="text-[10px] bg-turquoise-light text-turquoise font-bold rounded-full px-2 py-0.5">
                            Aperçu gratuit
                          </span>
                        )}
                      </div>
                      <h2 className="font-bold text-navy text-base sm:text-lg mt-0.5">
                        {ch.title}
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 sm:self-center self-end shrink-0">
                    {!canAccess ? (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-text/50 flex items-center gap-1 font-medium bg-surface px-3 py-1.5 rounded-xl border border-navy/10">
                          <Icon name="cadenas" size={13} className="text-navy/40" />
                          <span>Réservé Abonnés</span>
                        </span>
                        <Link
                          href="/abonnement"
                          className="text-xs font-bold text-turquoise hover:underline"
                        >
                          Débloquer →
                        </Link>
                      </div>
                    ) : firstLesson ? (
                      <Link
                        href={`/cours/${params.level}/${params.track}/${params.subject}/${ch.id}/${firstLesson.id}`}
                        className="inline-flex items-center gap-2 bg-navy text-white hover:bg-turquoise font-semibold text-xs px-4 py-2.5 rounded-xl transition-all shadow-sm"
                      >
                        <span>{isCompleted ? 'Revoir la leçon' : 'Accéder au cours & Labo'}</span>
                        <span>→</span>
                      </Link>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        ) : isSvt ? (
          /* Affichage officiel de la SVT articulé selon les 5 grands axes thématiques du Bac S2 */
          <div className="space-y-8">
            {SVT_DOMAINS.map((domain) => {
              const domainChapters = (chapters ?? []).filter(
                (ch: any) =>
                  domain.chapterCodes.includes(ch.code) ||
                  ch.domain?.toLowerCase().includes(domain.title.toLowerCase())
              );

              if (domainChapters.length === 0) return null;

              return (
                <div key={domain.number} className="space-y-4">
                  {/* Bannière officielle de l'Axe Thématique SVT */}
                  <div className="bg-white rounded-2xl border border-navy/10 p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start sm:items-center gap-3">
                      <span className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-300 text-xs font-black flex items-center justify-center shrink-0">
                        {domain.number}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-600">
                            {domain.badge}
                          </span>
                        </div>
                        <h2 className="text-lg sm:text-xl font-black text-navy mt-0.5">
                          {domain.title}
                        </h2>
                        <p className="text-xs text-navy/60 mt-0.5 max-w-2xl leading-relaxed">
                          {domain.description}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-navy/50 bg-surface px-3 py-1.5 rounded-xl border border-navy/5 shrink-0 self-start sm:self-auto">
                      {domainChapters.length} chapitre{domainChapters.length > 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Liste des chapitres de l'axe SVT */}
                  <div className="space-y-4">
                    {domainChapters.map((ch: any) => {
                      const publishedLessons = (ch.lessons ?? [])
                        .filter((l: any) => l.status === 'published')
                        .sort((a: any, b: any) => (a.order_index ?? 0) - (b.order_index ?? 0));

                      const chCompleted = publishedLessons.filter((l: any) => completedLessonIds.has(l.id)).length;
                      const chProgress = publishedLessons.length > 0 ? Math.round((chCompleted / publishedLessons.length) * 100) : 0;
                      const isFreeChapter = ch.order_index === 1;

                      return (
                        <div
                          key={ch.id}
                          className="bg-white rounded-2xl border border-navy/10 overflow-hidden shadow-sm hover:border-emerald-500/30 transition-all"
                        >
                          {/* Chapter header */}
                          <div className="bg-surface/50 px-5 py-4 border-b border-navy/10 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <span className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-black flex items-center justify-center shrink-0">
                                {ch.code || ch.order_index}
                              </span>
                              <div className="min-w-0">
                                <h3 className="font-bold text-navy text-base truncate">{ch.title}</h3>
                                <p className="text-xs text-navy/50 truncate">
                                  {ch.desc || `${publishedLessons.length} leçon(s) • ${chCompleted} terminée(s)`}
                                </p>
                              </div>
                            </div>
                            <div className="w-24 hidden sm:block shrink-0">
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
                                const isFirstLessonOfSubject = isFreeChapter && lIdx === 0;
                                const isFree = isFirstLessonOfSubject;
                                const canAccess = isSubscribed || isFree;

                                return (
                                  <div
                                    key={lesson.id}
                                    className="px-5 py-3.5 flex items-center justify-between gap-4 hover:bg-surface/40 transition-colors"
                                  >
                                    <div className="flex items-center gap-3 min-w-0">
                                      <span
                                        className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                                          isCompleted
                                            ? 'bg-emerald-500 text-white'
                                            : 'bg-surface text-navy/40 border border-navy/10'
                                        }`}
                                      >
                                        {isCompleted ? '✓' : lIdx + 1}
                                      </span>
                                      <div className="min-w-0">
                                        <p className="text-sm font-semibold text-navy truncate">
                                          {lesson.title}
                                        </p>
                                        <div className="flex items-center gap-2 mt-0.5">
                                          {isFree && (
                                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                              Aperçu gratuit
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-3 shrink-0">
                                      {canAccess ? (
                                        <Link
                                          href={`/cours/${params.level}/${params.track}/${params.subject}/${ch.id}/${lesson.id}`}
                                          className="text-xs font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-1.5 rounded-xl border border-emerald-200/60 transition-all flex items-center gap-1.5 shadow-sm"
                                        >
                                          <span>{isCompleted ? 'Revoir' : 'Commencer'}</span>
                                          <span>→</span>
                                        </Link>
                                      ) : (
                                        <div className="flex items-center gap-1 text-xs text-text/40">
                                          <Icon name="cadenas" size={13} />
                                          <span className="hidden sm:inline">Abonnés</span>
                                        </div>
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
              );
            })}
          </div>
        ) : (
          /* Affichage officiel des Mathématiques articulé selon les 3 grands domaines du Bac S2 */
          <div className="space-y-8">
            {MATHEMATIQUES_DOMAINS.map((domain) => {
              const domainChapters = (chapters ?? []).filter(
                (ch: any) =>
                  ch.domain === domain.title ||
                  ch.partNumber === domain.number ||
                  domain.chapterCodes.includes(ch.code)
              );

              if (domainChapters.length === 0) return null;

              return (
                <div key={domain.number} className="space-y-4">
                  {/* Bannière officielle de Domaine */}
                  <div className="bg-white rounded-2xl border border-navy/10 p-4 sm:p-5 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-start sm:items-center gap-3">
                      <span className="w-10 h-10 rounded-xl bg-navy text-white text-xs font-black flex items-center justify-center shrink-0">
                        {domain.number}
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-black uppercase tracking-wider text-turquoise">
                            {domain.badge}
                          </span>
                        </div>
                        <h2 className="text-lg sm:text-xl font-black text-navy mt-0.5">
                          {domain.title}
                        </h2>
                        <p className="text-xs text-navy/60 mt-0.5 max-w-2xl leading-relaxed">
                          {domain.description}
                        </p>
                      </div>
                    </div>

                    <span className="text-xs font-bold text-navy/50 bg-surface px-3 py-1.5 rounded-xl border border-navy/5 shrink-0 self-start sm:self-auto">
                      {domainChapters.length} chapitres
                    </span>
                  </div>

                  {/* Liste des chapitres du domaine */}
                  <div className="space-y-4">
                    {domainChapters.map((ch: any) => {
                      const publishedLessons = (ch.lessons ?? [])
                        .filter((l: any) => l.status === 'published')
                        .sort((a: any, b: any) => (a.order_index ?? 0) - (b.order_index ?? 0));

                      const chCompleted = publishedLessons.filter((l: any) => completedLessonIds.has(l.id)).length;
                      const chProgress = publishedLessons.length > 0 ? Math.round((chCompleted / publishedLessons.length) * 100) : 0;
                      const isFreeChapter = ch.order_index === 1;

                      return (
                        <div
                          key={ch.id}
                          className="bg-white rounded-2xl border border-navy/10 overflow-hidden shadow-sm hover:border-turquoise/30 transition-all"
                        >
                          {/* Chapter header */}
                          <div className="bg-surface/50 px-5 py-4 border-b border-navy/10 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-3 min-w-0">
                              <span className="w-8 h-8 rounded-xl bg-navy/10 text-navy text-xs font-black flex items-center justify-center shrink-0">
                                {ch.code || ch.order_index}
                              </span>
                              <div className="min-w-0">
                                <h3 className="font-bold text-navy text-base truncate">{ch.title}</h3>
                                <p className="text-xs text-navy/50 truncate">
                                  {ch.desc || `${publishedLessons.length} leçon(s) • ${chCompleted} terminée(s)`}
                                </p>
                              </div>
                            </div>
                            <div className="w-24 hidden sm:block shrink-0">
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
                                const isFirstLessonOfSubject = isFreeChapter && lIdx === 0;
                                const isFree = isFirstLessonOfSubject;
                                const canAccess = isSubscribed || isFree;

                                return (
                                  <div
                                    key={lesson.id}
                                    className="px-5 py-3.5 flex items-center justify-between gap-4 hover:bg-surface/40 transition-colors"
                                  >
                                    <div className="flex items-center gap-3 min-w-0">
                                      <span
                                        className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 ${
                                          isCompleted
                                            ? 'bg-emerald-500 text-white'
                                            : 'bg-surface text-navy/40 border border-navy/10'
                                        }`}
                                      >
                                        {isCompleted ? '✓' : lIdx + 1}
                                      </span>
                                      <div className="min-w-0">
                                        <p className="text-sm font-semibold text-navy truncate">
                                          {lesson.title}
                                        </p>
                                        <div className="flex flex-wrap items-center gap-2 mt-0.5">
                                          {isFree && (
                                            <span className="text-[10px] font-bold text-turquoise bg-turquoise-light px-2 py-0.5 rounded-full inline-block">
                                              Aperçu gratuit
                                            </span>
                                          )}
                                          {ch.code === 'B1' && lIdx === 0 && (
                                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                              Labo Anatomique & Schémas Bac
                                            </span>
                                          )}
                                          {ch.code === 'B1' && lIdx === 1 && (
                                            <span className="text-[10px] font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                                              Labo Électrophysiologie & Oscilloscope
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-3 shrink-0">
                                      {canAccess ? (
                                        <Link
                                          href={`/cours/${params.level}/${params.track}/${params.subject}/${ch.id}/${lesson.id}`}
                                          className="text-xs font-semibold text-turquoise hover:underline"
                                        >
                                          {isCompleted ? 'Revoir' : 'Commencer'} →
                                        </Link>
                                      ) : (
                                        <div className="flex items-center gap-1 text-xs text-text/40">
                                          <Icon name="cadenas" size={13} />
                                          <span className="hidden sm:inline">Abonnés</span>
                                        </div>
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
              );
            })}
          </div>
        )}

        {/* Méga Recueil de 30 Épreuves et Corrigés — Terminale S2 Sénégal */}
        {isMaths && (
          <div className="pt-4">
            <MathsRecueilEpreuves />
          </div>
        )}
      </div>
    </main>
  );
}
