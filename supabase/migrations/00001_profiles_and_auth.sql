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

-- Surcharge sans argument qui vérifie automatiquement l'utilisateur connecté (auth.uid())
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN public.is_admin(auth.uid());
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
DROP POLICY IF EXISTS "profiles_select_policy" ON public.profiles;
CREATE POLICY "profiles_select_policy"
  ON public.profiles
  FOR SELECT
  USING (
    auth.uid() = id
    OR public.is_admin(auth.uid())
  );

-- Un utilisateur peut modifier ses données personnelles mais ne peut PAS changer son rôle ni se débannir
DROP POLICY IF EXISTS "profiles_update_own_policy" ON public.profiles;
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
DROP POLICY IF EXISTS "profiles_admin_update_policy" ON public.profiles;
CREATE POLICY "profiles_admin_update_policy"
  ON public.profiles
  FOR UPDATE
  USING (public.is_admin(auth.uid()));

-- Les administrateurs peuvent supprimer des profils
DROP POLICY IF EXISTS "profiles_admin_delete_policy" ON public.profiles;
CREATE POLICY "profiles_admin_delete_policy"
  ON public.profiles
  FOR DELETE
  USING (public.is_admin(auth.uid()));

