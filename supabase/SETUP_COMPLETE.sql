-- ========================================================
-- AL MUXTAAR SOCIETE - SCHEMA COMPLET ET INITIALISATION
-- ========================================================

-- --------------------------------------------------------
-- Fichier : migrations/00000_initial.sql
-- --------------------------------------------------------

-- Migration initiale du projet Al_Muxtaar_Société
-- Ce fichier servira de point d'ancrage pour les futures migrations du schéma complet en P5.

-- Extension uuid-ossp pour la génération d'identifiants uniques
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Extension pgcrypto pour les fonctionnalités cryptographiques
CREATE EXTENSION IF NOT EXISTS "pgcrypto";



-- --------------------------------------------------------
-- Fichier : migrations/00001_profiles_and_auth.sql
-- --------------------------------------------------------

-- Migration 00001 : Profils, Trigger d'inscription et Rôles (P4)

-- 1. Table des profils utilisateurs
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  email TEXT,
  level TEXT NOT NULL DEFAULT 'Terminale',
  track TEXT NOT NULL DEFAULT 'S2',
  avatar TEXT NOT NULL DEFAULT 'avatar_00_defaut_neutre.svg',
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'editor', 'admin')),
  is_banned BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index pour accélérer la recherche par téléphone et par rôle
CREATE INDEX IF NOT EXISTS idx_profiles_phone ON public.profiles(phone);
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);

-- 2. Fonction et Trigger pour mettre à jour automatiquement updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trigger_profiles_updated_at ON public.profiles;
CREATE TRIGGER trigger_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- 3. Fonction pour vérifier si un utilisateur est administrateur (sans récursion RLS)
CREATE OR REPLACE FUNCTION public.is_admin(check_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = check_user_id AND role = 'admin' AND is_banned = FALSE
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Trigger automatique à la création d'un utilisateur dans auth.users
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  v_first_name TEXT;
  v_last_name TEXT;
  v_phone TEXT;
  v_email TEXT;
  v_level TEXT;
  v_track TEXT;
  v_avatar TEXT;
  v_role TEXT;
BEGIN
  v_first_name := COALESCE(NEW.raw_user_meta_data->>'first_name', 'Élève');
  v_last_name  := COALESCE(NEW.raw_user_meta_data->>'last_name', 'Al Muxtaar');
  v_phone      := COALESCE(NEW.raw_user_meta_data->>'phone', NEW.email);
  v_email      := NEW.raw_user_meta_data->>'real_email';
  v_level      := COALESCE(NEW.raw_user_meta_data->>'level', 'Terminale');
  v_track      := COALESCE(NEW.raw_user_meta_data->>'track', 'S2');
  v_avatar     := COALESCE(NEW.raw_user_meta_data->>'avatar', 'avatar_00_defaut_neutre.svg');
  v_role       := COALESCE(NEW.raw_user_meta_data->>'role', 'student');

  INSERT INTO public.profiles (
    id,
    first_name,
    last_name,
    phone,
    email,
    level,
    track,
    avatar,
    role
  ) VALUES (
    NEW.id,
    v_first_name,
    v_last_name,
    v_phone,
    v_email,
    v_level,
    v_track,
    v_avatar,
    v_role
  )
  ON CONFLICT (id) DO UPDATE SET
    first_name = EXCLUDED.first_name,
    last_name = EXCLUDED.last_name,
    phone = EXCLUDED.phone,
    email = EXCLUDED.email,
    level = EXCLUDED.level,
    track = EXCLUDED.track,
    avatar = EXCLUDED.avatar;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 5. Activation des politiques de sécurité Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Les utilisateurs peuvent lire leur propre profil ; les administrateurs peuvent lire tous les profils
CREATE POLICY "profiles_select_policy"
  ON public.profiles
  FOR SELECT
  USING (
    auth.uid() = id
    OR public.is_admin(auth.uid())
  );

-- Un utilisateur peut modifier ses données personnelles mais ne peut PAS changer son rôle ni se débannir
CREATE POLICY "profiles_update_own_policy"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    auth.uid() = id
    AND role = (SELECT role FROM public.profiles WHERE id = auth.uid())
    AND is_banned = (SELECT is_banned FROM public.profiles WHERE id = auth.uid())
  );

-- Les administrateurs ont les pleins pouvoirs de mise à jour sur tous les profils
CREATE POLICY "profiles_admin_update_policy"
  ON public.profiles
  FOR UPDATE
  USING (public.is_admin(auth.uid()));

-- Les administrateurs peuvent supprimer des profils
CREATE POLICY "profiles_admin_delete_policy"
  ON public.profiles
  FOR DELETE
  USING (public.is_admin(auth.uid()));



-- --------------------------------------------------------
-- Fichier : migrations/00002_courses_and_content.sql
-- --------------------------------------------------------

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
CREATE POLICY "plans_select_all" ON public.plans FOR SELECT USING (true);
CREATE POLICY "plans_admin_all" ON public.plans FOR ALL USING (public.is_admin(auth.uid()));

-- Subscriptions : un élève voit ses propres abonnements, admin voit tout
CREATE POLICY "subs_select_own" ON public.subscriptions FOR SELECT USING (auth.uid() = user_id OR public.is_admin(auth.uid()));
CREATE POLICY "subs_insert_own" ON public.subscriptions FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "subs_admin_all" ON public.subscriptions FOR ALL USING (public.is_admin(auth.uid()));

-- Catalogue (levels, tracks, subjects) : lecture publique, écriture admin
CREATE POLICY "levels_read" ON public.levels FOR SELECT USING (true);
CREATE POLICY "levels_admin" ON public.levels FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "tracks_read" ON public.tracks FOR SELECT USING (true);
CREATE POLICY "tracks_admin" ON public.tracks FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "subjects_read" ON public.subjects FOR SELECT USING (true);
CREATE POLICY "subjects_admin" ON public.subjects FOR ALL USING (public.is_admin(auth.uid()));

-- Chapitres : publiés lisibles par tous ; brouillons lisibles uniquement par admin
CREATE POLICY "chapters_read" ON public.chapters FOR SELECT
  USING (status = 'published' OR public.is_admin(auth.uid()));
CREATE POLICY "chapters_admin" ON public.chapters FOR ALL
  USING (public.is_admin(auth.uid()));

-- Leçons :
-- 1. Les leçons gratuites publiées sont accessibles à tous (visiteurs + élèves)
-- 2. Les leçons payantes publiées exigent un abonnement actif OU le rôle admin
-- 3. Les leçons brouillon ne sont visibles que par l'admin
CREATE POLICY "lessons_read_policy" ON public.lessons FOR SELECT
  USING (
    (status = 'published' AND is_free = TRUE)
    OR (status = 'published' AND is_free = FALSE AND (public.has_active_subscription(auth.uid()) OR public.is_admin(auth.uid())))
    OR (status = 'draft' AND public.is_admin(auth.uid()))
  );

CREATE POLICY "lessons_admin_all" ON public.lessons FOR ALL
  USING (public.is_admin(auth.uid()));

-- Exercices : lisibles si la leçon associée est accessible
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

CREATE POLICY "exercises_admin_all" ON public.exercises FOR ALL
  USING (public.is_admin(auth.uid()));

-- Quizzes, Questions et Réponses
CREATE POLICY "quizzes_read" ON public.quizzes FOR SELECT USING (true);
CREATE POLICY "quizzes_admin" ON public.quizzes FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "questions_read" ON public.quiz_questions FOR SELECT USING (true);
CREATE POLICY "questions_admin" ON public.quiz_questions FOR ALL USING (public.is_admin(auth.uid()));

CREATE POLICY "answers_read" ON public.quiz_answers FOR SELECT USING (true);
CREATE POLICY "answers_admin" ON public.quiz_answers FOR ALL USING (public.is_admin(auth.uid()));

-- Progression : un élève ne lit et n'écrit que sa propre progression ; l'admin lit tout
CREATE POLICY "progress_select_own" ON public.progress FOR SELECT
  USING (auth.uid() = user_id OR public.is_admin(auth.uid()));

CREATE POLICY "progress_upsert_own" ON public.progress FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "progress_update_own" ON public.progress FOR UPDATE
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);



-- --------------------------------------------------------
-- Fichier : migrations/00003_payments.sql
-- --------------------------------------------------------

-- ============================================================
-- Migration 00003 — Payments & Audit Logs
-- ============================================================

-- ─── payments ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS payments (
  id                uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  subscription_id   uuid        NOT NULL REFERENCES subscriptions(id) ON DELETE CASCADE,
  student_id        uuid        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  plan_id           uuid        NOT NULL REFERENCES plans(id),
  amount            integer     NOT NULL CHECK (amount > 0),            -- FCFA
  provider          text        NOT NULL CHECK (provider IN ('wave','orange_money','free_money','other')),
  transaction_code  text        NOT NULL,
  proof_image_url   text,                                               -- Supabase Storage path
  status            text        NOT NULL DEFAULT 'pending'
                                CHECK (status IN ('pending','confirmed','rejected')),
  notes             text,
  reviewed_by       uuid        REFERENCES profiles(id),
  reviewed_at       timestamptz,
  created_at        timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_payments_student    ON payments(student_id);
CREATE INDEX IF NOT EXISTS idx_payments_status     ON payments(status);
CREATE INDEX IF NOT EXISTS idx_payments_created_at ON payments(created_at DESC);

-- ─── audit_logs ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS audit_logs (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id    uuid        REFERENCES profiles(id),
  action      text        NOT NULL,   -- e.g. 'subscription.activated', 'subscription.rejected'
  target_type text        NOT NULL,   -- e.g. 'subscription', 'payment', 'profile'
  target_id   uuid,
  meta        jsonb,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_actor     ON audit_logs(actor_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action    ON audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created   ON audit_logs(created_at DESC);

-- ─── notifications ────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
  id          uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid        NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  type        text        NOT NULL,   -- 'subscription_requested','subscription_activated','subscription_rejected','subscription_expiring','subscription_expired'
  title       text        NOT NULL,
  body        text        NOT NULL,
  read        boolean     NOT NULL DEFAULT false,
  meta        jsonb,
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_notif_user_unread ON notifications(user_id, read) WHERE read = false;
CREATE INDEX IF NOT EXISTS idx_notif_created    ON notifications(created_at DESC);

-- ─── RLS ──────────────────────────────────────────────────────
ALTER TABLE payments       ENABLE ROW LEVEL SECURITY;
ALTER TABLE audit_logs     ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications  ENABLE ROW LEVEL SECURITY;

-- payments: student sees own, admin sees all
CREATE POLICY "student own payments"
  ON payments FOR SELECT
  USING (student_id = auth.uid());

CREATE POLICY "student insert own payment"
  ON payments FOR INSERT
  WITH CHECK (student_id = auth.uid());

CREATE POLICY "admin all payments"
  ON payments FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- audit_logs: admin only
CREATE POLICY "admin all audit_logs"
  ON audit_logs FOR ALL
  USING (is_admin())
  WITH CHECK (is_admin());

-- notifications: user sees own
CREATE POLICY "user own notifications select"
  ON notifications FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "user own notifications update"
  ON notifications FOR UPDATE
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "service insert notifications"
  ON notifications FOR INSERT
  WITH CHECK (true);  -- service_role bypasses RLS; this allows admin actions via service_role

-- ─── helper: expire overdue subscriptions ─────────────────────
CREATE OR REPLACE FUNCTION expire_overdue_subscriptions()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  expired_count integer;
BEGIN
  UPDATE subscriptions
  SET    status = 'expired'
  WHERE  status = 'active'
    AND  ends_at < now();
  GET DIAGNOSTICS expired_count = ROW_COUNT;
  RETURN expired_count;
END;
$$;



-- --------------------------------------------------------
-- Fichier : migrations/00004_content_management.sql
-- --------------------------------------------------------

-- ============================================================
-- Migration 00004 — Content management helpers
-- ============================================================

-- ─── images stored in Supabase Storage ───────────────────────
-- Bucket "content" is created manually in Supabase dashboard.
-- This migration only adds the media_files tracking table.

CREATE TABLE IF NOT EXISTS media_files (
  id           uuid        PRIMARY KEY DEFAULT gen_random_uuid(),
  uploader_id  uuid        NOT NULL REFERENCES profiles(id),
  bucket       text        NOT NULL DEFAULT 'content',
  path         text        NOT NULL,                -- storage object path
  mime_type    text,
  size_bytes   integer,
  alt_text     text,
  created_at   timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_media_uploader ON media_files(uploader_id);

ALTER TABLE media_files ENABLE ROW LEVEL SECURITY;

-- editors and admins can manage media
CREATE POLICY "editor manage media"
  ON media_files FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'editor')
    )
  )
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
        AND role IN ('admin', 'editor')
    )
  );

-- ─── chapter ordering helper ──────────────────────────────────
-- Add sort_order column if not already present (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'chapters' AND column_name = 'sort_order'
  ) THEN
    ALTER TABLE chapters ADD COLUMN sort_order integer NOT NULL DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'lessons' AND column_name = 'sort_order'
  ) THEN
    ALTER TABLE lessons ADD COLUMN sort_order integer NOT NULL DEFAULT 0;
  END IF;
END;
$$;



-- --------------------------------------------------------
-- Configuration des Buckets Supabase Storage
-- --------------------------------------------------------


INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('payments', 'payments', false),
  ('content', 'content', true)
ON CONFLICT (id) DO UPDATE SET public = EXCLUDED.public;

DROP POLICY IF EXISTS "Lecture publique contenu" ON storage.objects;
CREATE POLICY "Lecture publique contenu"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'content');

DROP POLICY IF EXISTS "Upload preuve de paiement" ON storage.objects;
CREATE POLICY "Upload preuve de paiement"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'payments');

DROP POLICY IF EXISTS "Lecture preuve de paiement" ON storage.objects;
CREATE POLICY "Lecture preuve de paiement"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (bucket_id = 'payments' AND (auth.uid() = owner OR public.is_admin(auth.uid())));

DROP POLICY IF EXISTS "Gestion admin contenu" ON storage.objects;
CREATE POLICY "Gestion admin contenu"
  ON storage.objects FOR ALL
  TO authenticated
  USING (bucket_id = 'content' AND (EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'editor'))));


-- --------------------------------------------------------
-- Données initiales (seed.sql)
-- --------------------------------------------------------

-- Données initiales (seed) pour le développement d'Al_Muxtaar_Société

-- 1. Création d'un administrateur initial de test
DO $$
DECLARE
  v_admin_id UUID := '00000000-0000-0000-0000-000000000001';
  v_encrypted_pw TEXT;
BEGIN
  v_encrypted_pw := crypt('AdminMuxtaar2026!', gen_salt('bf'));

  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE id = v_admin_id) THEN
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      v_admin_id,
      'authenticated',
      'authenticated',
      '221772476926@gmail.com',
      v_encrypted_pw,
      NOW(),
      '{"provider":"email","providers":["email"]}',
      '{"first_name":"Pape Makhtar","last_name":"Aidara","phone":"+221772476926","role":"admin","avatar":"avatar_09_admin_homme.svg"}',
      NOW(),
      NOW()
    );
  END IF;

  INSERT INTO public.profiles (
    id,
    first_name,
    last_name,
    phone,
    email,
    level,
    track,
    avatar,
    role,
    is_banned
  ) VALUES (
    v_admin_id,
    'Pape Makhtar',
    'Aidara',
    '+221772476926',
    'papemakhtaraidara@gmail.com',
    'Terminale',
    'S2',
    'avatar_09_admin_homme.svg',
    'admin',
    FALSE
  )
  ON CONFLICT (id) DO UPDATE SET
    role = 'admin',
    avatar = 'avatar_09_admin_homme.svg';
END $$;

-- 2. Formules d'abonnement (plans)
INSERT INTO public.plans (id, name, duration_days, price_fcfa, is_active)
VALUES
  ('10000000-0000-0000-0000-000000000001', 'Formule 1 Mois', 30, 700, true),
  ('10000000-0000-0000-0000-000000000002', 'Formule Trimestrielle (3 Mois)', 90, 2000, true)
ON CONFLICT (id) DO UPDATE SET
  price_fcfa = EXCLUDED.price_fcfa;

-- 3. Niveaux scolaires
INSERT INTO public.levels (id, name, code, order_index)
VALUES
  ('20000000-0000-0000-0000-000000000001', 'Terminale', 'tle', 1),
  ('20000000-0000-0000-0000-000000000002', 'Première', '1ere', 2),
  ('20000000-0000-0000-0000-000000000003', 'Seconde', '2nde', 3)
ON CONFLICT (code) DO NOTHING;

-- 4. Séries
INSERT INTO public.tracks (id, level_id, name, code, order_index)
VALUES
  ('30000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'S2 — Sciences Expérimentales', 's2', 1),
  ('30000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000001', 'S1 — Sciences Exactes', 's1', 2),
  ('30000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000001', 'L2 — Littéraire', 'l2', 3)
ON CONFLICT (level_id, code) DO NOTHING;

-- 5. Matières (Terminale S2)
INSERT INTO public.subjects (id, track_id, name, code, icon_name, order_index)
VALUES
  ('40000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001', 'Mathématiques', 'maths', '05_maths', 1),
  ('40000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000001', 'Physique-Chimie', 'pc', '07_physique_chimie', 2),
  ('40000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000001', 'Sciences de la Vie et de la Terre', 'svt', '06_svt', 3)
ON CONFLICT (track_id, code) DO NOTHING;

-- 6. Chapitres de Terminale S2 Mathématiques (section 4.3 du cahier des charges)
INSERT INTO public.chapters (id, subject_id, title, order_index, status)
VALUES
  ('50000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000001', 'Limites et continuité', 1, 'published'),
  ('50000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000001', 'Dérivation et étude de fonctions', 2, 'published'),
  ('50000000-0000-0000-0000-000000000003', '40000000-0000-0000-0000-000000000001', 'Suites numériques', 3, 'published'),
  ('50000000-0000-0000-0000-000000000004', '40000000-0000-0000-0000-000000000001', 'Fonction logarithme népérien', 4, 'published'),
  ('50000000-0000-0000-0000-000000000005', '40000000-0000-0000-0000-000000000001', 'Fonction exponentielle et fonctions puissances', 5, 'published'),
  ('50000000-0000-0000-0000-000000000006', '40000000-0000-0000-0000-000000000001', 'Primitives et calcul intégral', 6, 'published'),
  ('50000000-0000-0000-0000-000000000007', '40000000-0000-0000-0000-000000000001', 'Équations différentielles', 7, 'draft'),
  ('50000000-0000-0000-0000-000000000008', '40000000-0000-0000-0000-000000000001', 'Nombres complexes', 8, 'draft'),
  ('50000000-0000-0000-0000-000000000009', '40000000-0000-0000-0000-000000000001', 'Dénombrement et probabilités', 9, 'draft'),
  ('50000000-0000-0000-0000-000000000010', '40000000-0000-0000-0000-000000000001', 'Statistiques', 10, 'draft'),
  ('50000000-0000-0000-0000-000000000011', '40000000-0000-0000-0000-000000000001', 'Géométrie dans l''espace', 11, 'draft')
ON CONFLICT (id) DO NOTHING;

-- 7. Leçons d'exemples dans le Chapitre 1 (Limites et continuité)

-- Leçon 1 (PUBLIÉE et GRATUITE)
INSERT INTO public.lessons (
  id,
  chapter_id,
  title,
  order_index,
  content_markdown,
  is_free,
  status
) VALUES (
  '60000000-0000-0000-0000-000000000001',
  '50000000-0000-0000-0000-000000000001',
  'Notion de limite en un point et formes indéterminées',
  1,
  '# Leçon 1 : Notion de limite en un point et formes indéterminées

## 1. Objectifs de la leçon
- Maîtriser le calcul des limites usuelles de fonctions polynômes et rationnelles.
- Identifier et lever les 4 formes indéterminées : $\frac{0}{0}$, $\frac{\infty}{\infty}$, $0 \times \infty$, et $+\infty - \infty$.
- Utiliser la factorisation par le terme de plus haut degré et l''expression conjuguée.

## 2. Définitions et Théorèmes essentiels
Soit $f$ une fonction numérique définie sur un intervalle $I$ et $x_0 \in \mathbb{R}$.

On dit que $f(x)$ a pour limite $l \in \mathbb{R}$ en $x_0$ si :
$$\lim_{x \to x_0} f(x) = l$$

### Limites des fonctions usuelles à l''infini
Pour tout polynôme $P(x) = a_n x^n + \dots + a_1 x + a_0$ avec $a_n \neq 0$ :
$$\lim_{x \to \pm\infty} P(x) = \lim_{x \to \pm\infty} a_n x^n$$

Pour une fonction rationnelle $R(x) = \frac{P(x)}{Q(x)}$ :
$$\lim_{x \to \pm\infty} \frac{P(x)}{Q(x)} = \lim_{x \to \pm\infty} \frac{a_n x^n}{b_m x^m}$$

## 3. Méthode : Comment lever une indétermination $\frac{0}{0}$ ?
Lorsque l''on calcule $\lim_{x \to a} \frac{P(x)}{Q(x)}$ et que $P(a) = Q(a) = 0$, $a$ est une racine de $P$ et de $Q$.
1. Factoriser $P(x)$ et $Q(x)$ par $(x - a)$.
2. Simplifier la fraction par $(x - a)$.
3. Calculer la limite de l''expression simplifiée.
',
  true,
  'published'
) ON CONFLICT (id) DO NOTHING;

-- Exercice d'application pour la Leçon 1
INSERT INTO public.exercises (
  id,
  lesson_id,
  title,
  statement,
  solution,
  difficulty,
  order_index
) VALUES (
  '70000000-0000-0000-0000-000000000001',
  '60000000-0000-0000-0000-000000000001',
  'Exercice 1 : Calcul de limite d''une fraction rationnelle',
  'Calculer la limite suivante :
$$\lim_{x \to 2} \frac{x^2 - 4}{x^2 - 3x + 2}$$',
  '**Solution étape par étape :**

1. Vérifions d''abord la forme indéterminée en remplaçant $x$ par 2 :
- Numérateur : $2^2 - 4 = 0$
- Dénominateur : $2^2 - 3(2) + 2 = 4 - 6 + 2 = 0$
Il s''agit bien de la forme indéterminée $\frac{0}{0}$.

2. Factorisons le numérateur et le dénominateur par $(x - 2)$ :
- $x^2 - 4 = (x - 2)(x + 2)$
- Pour $x^2 - 3x + 2$, la racine évidente est 2, l''autre est 1 : $(x - 2)(x - 1)$.

3. Pour tout $x \neq 2$ :
$$\frac{x^2 - 4}{x^2 - 3x + 2} = \frac{(x - 2)(x + 2)}{(x - 2)(x - 1)} = \frac{x + 2}{x - 1}$$

4. Calcul de la limite :
$$\lim_{x \to 2} \frac{x + 2}{x - 1} = \frac{2 + 2}{2 - 1} = \frac{4}{1} = 4$$

**Conclusion :** La limite recherchée est égale à 4.',
  1,
  1
) ON CONFLICT (id) DO NOTHING;

-- Quiz pour la Leçon 1
INSERT INTO public.quizzes (id, lesson_id, title, passing_score)
VALUES (
  '80000000-0000-0000-0000-000000000001',
  '60000000-0000-0000-0000-000000000001',
  'Quiz d''auto-évaluation : Formes Indéterminées',
  70
) ON CONFLICT (id) DO NOTHING;

INSERT INTO public.quiz_questions (id, quiz_id, question_text, explanation, order_index)
VALUES
  (
    '90000000-0000-0000-0000-000000000001',
    '80000000-0000-0000-0000-000000000001',
    'Laquelle des expressions suivantes N''EST PAS une forme indéterminée ?',
    'L''expression 1 / 0 donne l''infini (+∞ ou -∞ selon le signe de 0), ce n''est pas une indétermination.',
    1
  ),
  (
    '90000000-0000-0000-0000-000000000002',
    '80000000-0000-0000-0000-000000000001',
    'Quelle est la limite en +∞ de f(x) = (3x^2 - 5x + 1) / (x^2 + 4) ?',
    'En +∞, une fraction rationnelle a la même limite que le quotient de ses termes de plus haut degré : 3x^2 / x^2 = 3.',
    2
  )
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.quiz_answers (quiz_id, question_id, answer_text, is_correct, order_index)
VALUES
  ('80000000-0000-0000-0000-000000000001', '90000000-0000-0000-0000-000000000001', '0 / 0', false, 1),
  ('80000000-0000-0000-0000-000000000001', '90000000-0000-0000-0000-000000000001', '+∞ - ∞', false, 2),
  ('80000000-0000-0000-0000-000000000001', '90000000-0000-0000-0000-000000000001', '1 / 0', true, 3),
  ('80000000-0000-0000-0000-000000000001', '90000000-0000-0000-0000-000000000001', '∞ / ∞', false, 4),

  ('80000000-0000-0000-0000-000000000001', '90000000-0000-0000-0000-000000000002', '3', true, 1),
  ('80000000-0000-0000-0000-000000000001', '90000000-0000-0000-0000-000000000002', '+∞', false, 2),
  ('80000000-0000-0000-0000-000000000001', '90000000-0000-0000-0000-000000000002', '0', false, 3),
  ('80000000-0000-0000-0000-000000000001', '90000000-0000-0000-0000-000000000002', '-5', false, 4)
ON CONFLICT DO NOTHING;

-- Leçon 2 (BROUILLON et PAYANTE : is_free = false, status = 'draft')
INSERT INTO public.lessons (
  id,
  chapter_id,
  title,
  order_index,
  content_markdown,
  is_free,
  status
) VALUES (
  '60000000-0000-0000-0000-000000000002',
  '50000000-0000-0000-0000-000000000001',
  'Théorème des valeurs intermédiaires et bijection',
  2,
  '# Leçon 2 : Théorème des valeurs intermédiaires (TVI) et bijection

## 1. Théorème des valeurs intermédiaires
Soit $f$ une fonction continue sur un intervalle $[a, b]$.
Pour tout réel $k$ compris entre $f(a)$ et $f(b)$, il existe au moins un réel $c \in [a, b]$ tel que :
$$f(c) = k$$

## 2. Corollaire (Théorème de la bijection)
Si de plus la fonction $f$ est **strictement monotone** sur $[a, b]$, alors pour tout réel $k$ compris entre $f(a)$ et $f(b)$, l''équation $f(x) = k$ admet **une unique solution** dans $[a, b]$.
',
  false,
  'draft'
) ON CONFLICT (id) DO NOTHING;

