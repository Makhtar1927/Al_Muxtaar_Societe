-- Migration 00002 : Structure Pédagogique, Abonnements & RLS (P5)

-- 1. Tables du modèle économique préliminaire (pour la fonction has_active_subscription)
CREATE TABLE IF NOT EXISTS public.plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  duration_days INT NOT NULL,
  price_fcfa INT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  plan_id UUID NOT NULL REFERENCES public.plans(id),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'rejected', 'expired', 'suspended', 'cancelled')),
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  activated_by UUID REFERENCES public.profiles(id),
  rejection_reason TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subs_user_status ON public.subscriptions(user_id, status, end_date);

-- 2. Fonction de vérification d'abonnement actif (utilisée par RLS)
CREATE OR REPLACE FUNCTION public.has_active_subscription(check_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  IF check_user_id IS NULL THEN
    RETURN FALSE;
  END IF;

  RETURN EXISTS (
    SELECT 1 FROM public.subscriptions
    WHERE user_id = check_user_id
      AND status = 'active'
      AND end_date > NOW()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. Structure Pédagogique

-- Niveaux (Seconde, Première, Terminale)
CREATE TABLE IF NOT EXISTS public.levels (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  code TEXT UNIQUE NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Séries (S1, S2, L2...)
CREATE TABLE IF NOT EXISTS public.tracks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  level_id UUID NOT NULL REFERENCES public.levels(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(level_id, code)
);

-- Matières (Mathématiques, Physique-Chimie...)
CREATE TABLE IF NOT EXISTS public.subjects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id UUID NOT NULL REFERENCES public.tracks(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  icon_name TEXT DEFAULT 'cours',
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(track_id, code)
);

-- Chapitres (Limites et continuité, Dérivation...)
CREATE TABLE IF NOT EXISTS public.chapters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_id UUID NOT NULL REFERENCES public.subjects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Leçons
CREATE TABLE IF NOT EXISTS public.lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chapter_id UUID NOT NULL REFERENCES public.chapters(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  order_index INT NOT NULL DEFAULT 0,
  content_markdown TEXT NOT NULL DEFAULT '',
  is_free BOOLEAN NOT NULL DEFAULT FALSE,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_lessons_chapter_order ON public.lessons(chapter_id, order_index);
CREATE INDEX IF NOT EXISTS idx_lessons_access ON public.lessons(status, is_free);

-- Exercices
CREATE TABLE IF NOT EXISTS public.exercises (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  statement TEXT NOT NULL,
  solution TEXT NOT NULL,
  difficulty INT NOT NULL DEFAULT 1 CHECK (difficulty BETWEEN 1 AND 3),
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Quiz
CREATE TABLE IF NOT EXISTS public.quizzes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id UUID REFERENCES public.lessons(id) ON DELETE CASCADE,
  chapter_id UUID REFERENCES public.chapters(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  passing_score INT NOT NULL DEFAULT 70,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Questions de quiz
CREATE TABLE IF NOT EXISTS public.quiz_questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id UUID NOT NULL REFERENCES public.quizzes(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  explanation TEXT,
  order_index INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Réponses de quiz
CREATE TABLE IF NOT EXISTS public.quiz_answers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question_id UUID NOT NULL REFERENCES public.quiz_questions(id) ON DELETE CASCADE,
  answer_text TEXT NOT NULL,
  is_correct BOOLEAN NOT NULL DEFAULT FALSE,
  order_index INT NOT NULL DEFAULT 0
);

-- Progression de l'élève
CREATE TABLE IF NOT EXISTS public.progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  is_completed BOOLEAN NOT NULL DEFAULT FALSE,
  last_quiz_score INT,
  last_read_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, lesson_id)
);

CREATE INDEX IF NOT EXISTS idx_progress_user ON public.progress(user_id);

-- 4. Politiques de Sécurité Row Level Security (RLS)

ALTER TABLE public.plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chapters ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;

-- Plans : lecture pour tous, écriture pour admin
DROP POLICY IF EXISTS "plans_select_all" ON public.plans;
CREATE POLICY "plans_select_all" ON public.plans FOR SELECT USING (true);
DROP POLICY IF EXISTS "plans_admin_all" ON public.plans;
CREATE POLICY "plans_admin_all" ON public.plans FOR ALL USING (public.is_admin(auth.uid()));

-- Subscriptions : un élève voit ses propres abonnements, admin voit tout
DROP POLICY IF EXISTS "subs_select_own" ON public.subscriptions;
CREATE POLICY "subs_select_own" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id OR public.is_admin(auth.uid()));
DROP POLICY IF EXISTS "subs_insert_own" ON public.subscriptions;
CREATE POLICY "subs_insert_own" ON public.subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "subs_admin_all" ON public.subscriptions;
CREATE POLICY "subs_admin_all" ON public.subscriptions FOR ALL USING (public.is_admin(auth.uid()));

-- Catalogue (levels, tracks, subjects) : lecture publique, écriture admin
DROP POLICY IF EXISTS "levels_read" ON public.levels;
CREATE POLICY "levels_read" ON public.levels FOR SELECT USING (true);
DROP POLICY IF EXISTS "levels_admin" ON public.levels;
CREATE POLICY "levels_admin" ON public.levels FOR ALL USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "tracks_read" ON public.tracks;
CREATE POLICY "tracks_read" ON public.tracks FOR SELECT USING (true);
DROP POLICY IF EXISTS "tracks_admin" ON public.tracks;
CREATE POLICY "tracks_admin" ON public.tracks FOR ALL USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "subjects_read" ON public.subjects;
CREATE POLICY "subjects_read" ON public.subjects FOR SELECT USING (true);
DROP POLICY IF EXISTS "subjects_admin" ON public.subjects;
CREATE POLICY "subjects_admin" ON public.subjects FOR ALL USING (public.is_admin(auth.uid()));

-- Chapitres : publiés lisibles par tous ; brouillons lisibles uniquement par admin
DROP POLICY IF EXISTS "chapters_read" ON public.chapters;
CREATE POLICY "chapters_read" ON public.chapters FOR SELECT
  USING (status = 'published' OR public.is_admin(auth.uid()));
DROP POLICY IF EXISTS "chapters_admin" ON public.chapters;
CREATE POLICY "chapters_admin" ON public.chapters FOR ALL
  USING (public.is_admin(auth.uid()));

-- Leçons :
-- 1. Les leçons gratuites publiées sont accessibles à tous (visiteurs + élèves)
-- 2. Les leçons payantes publiées exigent un abonnement actif OU le rôle admin
-- 3. Les leçons brouillon ne sont visibles que par l'admin
DROP POLICY IF EXISTS "lessons_read_policy" ON public.lessons;
CREATE POLICY "lessons_read_policy" ON public.lessons FOR SELECT
  USING (
    (status = 'published' AND is_free = TRUE)
    OR (status = 'published' AND is_free = FALSE AND (public.has_active_subscription(auth.uid()) OR public.is_admin(auth.uid())))
    OR (status = 'draft' AND public.is_admin(auth.uid()))
  );

DROP POLICY IF EXISTS "lessons_admin_all" ON public.lessons;
CREATE POLICY "lessons_admin_all" ON public.lessons FOR ALL
  USING (public.is_admin(auth.uid()));

-- Exercices : lisibles si la leçon associée est accessible
DROP POLICY IF EXISTS "exercises_read_policy" ON public.exercises;
CREATE POLICY "exercises_read_policy" ON public.exercises FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.lessons l
      WHERE l.id = lesson_id
        AND (
          (l.status = 'published' AND l.is_free = TRUE)
          OR (l.status = 'published' AND l.is_free = FALSE AND (public.has_active_subscription(auth.uid()) OR public.is_admin(auth.uid())))
          OR (l.status = 'draft' AND public.is_admin(auth.uid()))
        )
    )
  );

DROP POLICY IF EXISTS "exercises_admin_all" ON public.exercises;
CREATE POLICY "exercises_admin_all" ON public.exercises FOR ALL
  USING (public.is_admin(auth.uid()));

-- Quizzes, Questions et Réponses
DROP POLICY IF EXISTS "quizzes_read" ON public.quizzes;
CREATE POLICY "quizzes_read" ON public.quizzes FOR SELECT USING (true);
DROP POLICY IF EXISTS "quizzes_admin" ON public.quizzes;
CREATE POLICY "quizzes_admin" ON public.quizzes FOR ALL USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "questions_read" ON public.quiz_questions;
CREATE POLICY "questions_read" ON public.quiz_questions FOR SELECT USING (true);
DROP POLICY IF EXISTS "questions_admin" ON public.quiz_questions;
CREATE POLICY "questions_admin" ON public.quiz_questions FOR ALL USING (public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "answers_read" ON public.quiz_answers;
CREATE POLICY "answers_read" ON public.quiz_answers FOR SELECT USING (true);
DROP POLICY IF EXISTS "answers_admin" ON public.quiz_answers;
CREATE POLICY "answers_admin" ON public.quiz_answers FOR ALL USING (public.is_admin(auth.uid()));

-- Progression : un élève ne lit et n'écrit que sa propre progression ; l'admin lit tout
DROP POLICY IF EXISTS "progress_select_own" ON public.progress;
CREATE POLICY "progress_select_own" ON public.progress FOR SELECT
  USING (auth.uid() = user_id OR public.is_admin(auth.uid()));

DROP POLICY IF EXISTS "progress_upsert_own" ON public.progress;
CREATE POLICY "progress_upsert_own" ON public.progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "progress_update_own" ON public.progress;
CREATE POLICY "progress_update_own" ON public.progress FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

