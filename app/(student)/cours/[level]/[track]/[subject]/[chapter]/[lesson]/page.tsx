import React from 'react';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import MathRenderer from '@/components/course/math-renderer';
import ExerciseCard from '@/components/course/exercise-card';
import QuizView from '@/components/course/quiz-view';
import Watermark from '@/components/course/watermark';
import Paywall from '@/components/course/paywall';
import LessonCompleteButton from '@/components/course/lesson-complete-button';
import { Button } from '@/components/ui/button';

interface PageProps {
  params: {
    level: string;
    track: string;
    subject: string;
    chapter: string;
    lesson: string;
  };
}

export const dynamic = 'force-dynamic';

export default async function LessonReaderPage({ params }: PageProps) {
  const supabase = createClient();
  const admin = createAdminClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(
      `/connexion?redirect=/cours/${params.level}/${params.track}/${params.subject}/${params.chapter}/${params.lesson}`
    );
  }

  // 1. Fetch user profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('id, full_name, phone, role')
    .eq('id', user.id)
    .single();

  const { data: hasActiveSub } = await supabase.rpc('has_active_subscription', {
    user_uuid: user.id,
  });

  const isSubscribed = Boolean(hasActiveSub) || profile?.role === 'admin';

  // 2. Fetch lesson meta first
  const { data: lessonMeta } = await admin
    .from('lessons')
    .select('id, title, chapter_id, is_free_preview, sort_order, status')
    .eq('id', params.lesson)
    .single();

  if (!lessonMeta || lessonMeta.status !== 'published') {
    notFound();
  }

  const canAccessContent = isSubscribed || lessonMeta.is_free_preview;

  // 3. Fetch chapter & subject details
  const { data: chapter } = await admin
    .from('chapters')
    .select(`
      id, title, sort_order,
      subjects!inner(id, name, code)
    `)
    .eq('id', params.chapter)
    .single();

  // 4. Fetch all lessons in this chapter for navigation
  const { data: siblingLessons } = await admin
    .from('lessons')
    .select('id, title, sort_order, is_free_preview')
    .eq('chapter_id', params.chapter)
    .eq('status', 'published')
    .order('sort_order');

  const siblings = siblingLessons ?? [];
  const currentIndex = siblings.findIndex((l) => l.id === params.lesson);
  const prevLesson = currentIndex > 0 ? siblings[currentIndex - 1] : null;
  const nextLesson = currentIndex < siblings.length - 1 ? siblings[currentIndex + 1] : null;

  // 5. Fetch user progress
  const { data: progressRow } = await supabase
    .from('progress')
    .select('is_completed')
    .eq('student_id', user.id)
    .eq('lesson_id', params.lesson)
    .maybeSingle();

  const isCompleted = progressRow?.is_completed ?? false;

  // 6. Security gate: only fetch full content if authorized!
  let lessonContent: string | null = null;
  let exercises: { id: string; statement_md: string; solution_md: string; difficulty: number; sort_order: number }[] = [];
  let quizData: { id: string; title: string; questions: Parameters<typeof QuizView>[0]['questions'] } | null = null;

  if (canAccessContent) {
    const { data: fullLesson } = await admin
      .from('lessons')
      .select('content_md')
      .eq('id', params.lesson)
      .single();
    lessonContent = fullLesson?.content_md ?? '';

    // Fetch exercises
    const { data: exList } = await admin
      .from('exercises')
      .select('id, statement_md, solution_md, difficulty, sort_order')
      .eq('lesson_id', params.lesson)
      .order('sort_order');
    exercises = exList ?? [];

    // Fetch quiz
    const { data: quizRow } = await admin
      .from('quizzes')
      .select(`
        id, title,
        quiz_questions(
          id, question_md, sort_order,
          quiz_answers(id, answer_text, is_correct, explanation_md)
        )
      `)
      .eq('lesson_id', params.lesson)
      .maybeSingle();

    if (quizRow && quizRow.quiz_questions) {
      quizData = {
        id: quizRow.id,
        title: quizRow.title,
        questions: (quizRow.quiz_questions as unknown as {
          id: string;
          question_md: string;
          sort_order: number;
          quiz_answers: { id: string; answer_text: string; is_correct: boolean; explanation_md: string | null }[];
        }[])
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((q) => ({
            id: q.id,
            question_md: q.question_md,
            answers: q.quiz_answers ?? [],
          })),
      };
    }
  }

  const subjectName = (chapter?.subjects as unknown as { name: string })?.name ?? 'Mathématiques';

  return (
    <div className="min-h-screen bg-surface">
      {/* Watermark for authenticated student protection */}
      {canAccessContent && (
        <Watermark
          studentName={profile?.full_name ?? 'Élève Al Muxtaar'}
          studentPhone={profile?.phone ?? '+221'}
        />
      )}

      {/* Reader Layout */}
      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-1 order-2 lg:order-1">
          <div className="sticky top-20 bg-white rounded-2xl border border-navy/10 p-5 shadow-sm space-y-4">
            <Link
              href={`/cours/${params.level}/${params.track}/${params.subject}`}
              className="text-xs font-semibold text-turquoise hover:underline flex items-center gap-1"
            >
              ← Retour au sommaire
            </Link>

            <div>
              <p className="text-[11px] font-bold text-text/50 uppercase tracking-wider">
                Chapitre en cours
              </p>
              <h3 className="font-bold text-navy text-sm mt-0.5 leading-snug">
                {chapter?.title}
              </h3>
            </div>

            <div className="border-t border-navy/10 pt-3">
              <p className="text-xs font-semibold text-text/60 mb-2">Leçons du chapitre</p>
              <div className="space-y-1.5">
                {siblings.map((sib, sIdx) => {
                  const isCurrent = sib.id === params.lesson;
                  return (
                    <Link
                      key={sib.id}
                      href={`/cours/${params.level}/${params.track}/${params.subject}/${params.chapter}/${sib.id}`}
                      className={`block p-2 rounded-xl text-xs font-medium transition-colors ${
                        isCurrent
                          ? 'bg-turquoise text-white font-bold'
                          : 'text-text/75 hover:bg-surface'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="truncate">{sIdx + 1}. {sib.title}</span>
                        {sib.is_free_preview && !isCurrent && (
                          <span className="text-[9px] bg-gold/20 text-navy px-1.5 py-0.2 rounded font-bold">
                            Gratuit
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-3 order-1 lg:order-2 space-y-8">
          {/* Top Breadcrumb & Actions Bar */}
          <div className="bg-white rounded-2xl border border-navy/10 p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-turquoise uppercase tracking-wider">
                {subjectName} • {chapter?.title}
              </span>
              <h1 className="text-2xl font-bold text-navy">{lessonMeta.title}</h1>
            </div>

            {canAccessContent && (
              <LessonCompleteButton
                lessonId={params.lesson}
                chapterId={params.chapter}
                initialCompleted={isCompleted}
              />
            )}
          </div>

          {/* Paywall screen or Course content */}
          {!canAccessContent ? (
            <Paywall />
          ) : (
            <>
              {/* Course Text Section */}
              <article className="bg-white rounded-2xl border border-navy/10 p-6 md:p-8 shadow-sm">
                <div className="border-b border-navy/10 pb-4 mb-6">
                  <span className="text-xs font-bold text-navy/40 uppercase tracking-widest">
                    Cours & Théorèmes
                  </span>
                </div>
                {lessonContent ? (
                  <MathRenderer content={lessonContent} />
                ) : (
                  <p className="text-text/50 italic py-8 text-center">
                    Le contenu de cette leçon est en cours de rédaction par nos professeurs.
                  </p>
                )}
              </article>

              {/* Exercises Section */}
              {exercises.length > 0 && (
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                      <span>✏️</span> Exercices d&apos;application ({exercises.length})
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {exercises.map((ex, exIdx) => (
                      <ExerciseCard
                        key={ex.id}
                        index={exIdx + 1}
                        statementMd={ex.statement_md}
                        solutionMd={ex.solution_md}
                        difficulty={ex.difficulty}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Quiz Section */}
              {quizData && quizData.questions.length > 0 && (
                <section>
                  <QuizView
                    quizTitle={quizData.title}
                    questions={quizData.questions}
                  />
                </section>
              )}

              {/* Next / Prev Navigation Controls */}
              <div className="bg-white rounded-2xl border border-navy/10 p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
                {prevLesson ? (
                  <Link
                    href={`/cours/${params.level}/${params.track}/${params.subject}/${params.chapter}/${prevLesson.id}`}
                  >
                    <Button variant="outline" size="sm">
                      ← {prevLesson.title}
                    </Button>
                  </Link>
                ) : (
                  <div />
                )}

                {nextLesson ? (
                  <Link
                    href={`/cours/${params.level}/${params.track}/${params.subject}/${params.chapter}/${nextLesson.id}`}
                  >
                    <Button variant="primary" size="sm">
                      Leçon suivante : {nextLesson.title} →
                    </Button>
                  </Link>
                ) : (
                  <Link
                    href={`/cours/${params.level}/${params.track}/${params.subject}`}
                  >
                    <Button variant="secondary" size="sm">
                      Fin du chapitre ! Revoir le sommaire
                    </Button>
                  </Link>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}

