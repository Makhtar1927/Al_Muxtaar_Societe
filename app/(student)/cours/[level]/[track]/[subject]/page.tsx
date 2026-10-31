import React from 'react';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { Badge } from '@/components/ui/badge';
import { ProgressBar } from '@/components/ui/progress-bar';

interface PageProps {
  params: {
    level: string;
    track: string;
    subject: string;
  };
}

export const dynamic = 'force-dynamic';

export default async function SubjectChaptersPage({ params }: PageProps) {
  const supabase = createClient();
  const admin = createAdminClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/connexion?redirect=/cours/${params.level}/${params.track}/${params.subject}`);
  }

  // 1. Fetch user profile and subscription status
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, full_name, role')
    .eq('id', user.id)
    .single();

  const { data: hasActiveSub } = await supabase.rpc('has_active_subscription', {
    user_uuid: user.id,
  });

  const isSubscribed = Boolean(hasActiveSub) || profile?.role === 'admin';

  // 2. Resolve subject
  const { data: subjectRow } = await admin
    .from('subjects')
    .select(`
      id, name, code,
      levels!inner(code, name),
      tracks!inner(code, name)
    `)
    .eq('code', params.subject)
    .single();

  if (!subjectRow) {
    // Fallback: fetch first subject if matching code not found
    const { data: firstSub } = await admin.from('subjects').select('id, name, code').limit(1).single();
    if (!firstSub) notFound();
  }

  const subjectId = subjectRow?.id;
  const subjectName = subjectRow?.name ?? 'Mathématiques';

  // 3. Fetch published chapters and their lessons
  const { data: chapters } = await admin
    .from('chapters')
    .select(`
      id, title, sort_order, status,
      lessons (
        id, title, sort_order, is_free_preview, status
      )
    `)
    .eq('subject_id', subjectId)
    .eq('status', 'published')
    .order('sort_order');

  // 4. Fetch user's progress for completed lessons
  const { data: completedProgress } = await supabase
    .from('progress')
    .select('lesson_id')
    .eq('student_id', user.id)
    .eq('is_completed', true);

  const completedLessonIds = new Set((completedProgress ?? []).map((p) => p.lesson_id));

  // Compute stats
  let totalLessons = 0;
  let totalCompleted = 0;

  (chapters ?? []).forEach((ch) => {
    (ch.lessons ?? []).forEach((l) => {
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
    <main className="min-h-screen bg-surface py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Breadcrumb */}
        <nav className="text-xs text-text/50 flex items-center gap-2">
          <Link href="/dashboard" className="hover:text-turquoise transition-colors">
            Tableau de bord
          </Link>
          <span>/</span>
          <span className="capitalize">{params.level} {params.track.toUpperCase()}</span>
          <span>/</span>
          <span className="text-navy font-semibold">{subjectName}</span>
        </nav>

        {/* Header & global progress card */}
        <div className="bg-white rounded-2xl border border-navy/10 p-6 shadow-sm space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-turquoise uppercase tracking-wider">
                Programme Officiel — {params.level.toUpperCase()} {params.track.toUpperCase()}
              </span>
              <h1 className="text-2xl font-bold text-navy mt-1">{subjectName}</h1>
            </div>
            {!isSubscribed && (
              <Link
                href="/abonnement"
                className="inline-flex items-center gap-2 bg-gold/15 text-navy font-semibold text-xs px-3.5 py-2 rounded-xl border border-gold/30 hover:bg-gold/25 transition-colors"
              >
                <span>⭐ Accéder à tous les chapitres</span>
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
          {(chapters ?? []).map((ch, chIdx) => {
            const publishedLessons = (ch.lessons ?? [])
              .filter((l) => l.status === 'published')
              .sort((a, b) => a.sort_order - b.sort_order);

            const chCompleted = publishedLessons.filter((l) => completedLessonIds.has(l.id)).length;
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
                  {publishedLessons.map((lesson, lIdx) => {
                    const isCompleted = completedLessonIds.has(lesson.id);
                    const canAccess = isSubscribed || lesson.is_free_preview;

                    return (
                      <div
                        key={lesson.id}
                        className="px-5 py-3.5 flex items-center justify-between gap-4 hover:bg-surface/40 transition-colors"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0 ${isCompleted ? 'bg-emerald-500 text-white font-bold' : 'border border-navy/20 text-text/40'}`}>
                            {isCompleted ? '✓' : lIdx + 1}
                          </span>
                          <Link
                            href={`/cours/${params.level}/${params.track}/${params.subject}/${ch.id}/${lesson.id}`}
                            className="font-medium text-sm text-navy hover:text-turquoise transition-colors truncate"
                          >
                            {lesson.title}
                          </Link>
                          {lesson.is_free_preview && (
                            <span className="text-[10px] bg-gold/15 text-navy font-bold rounded-full px-2 py-0.5 whitespace-nowrap">
                              Aperçu gratuit
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          {!canAccess ? (
                            <span className="text-xs text-text/40 flex items-center gap-1 font-medium">
                              🔒 <span className="hidden sm:inline">Abonnés</span>
                            </span>
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
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

