-- Données initiales (seed) pour le développement d'Al_Muxtaar_Société

-- 1. Création d'un administrateur initial de test
-- Téléphone : +221 77 000 00 00
-- Email technique : 221770000000@gmail.com
-- Mot de passe par défaut : AdminMuxtaar2026!

DO $$
DECLARE
  v_admin_id UUID := '00000000-0000-0000-0000-000000000001';
  v_encrypted_pw TEXT;
BEGIN
  -- Calcul du hash cryptographique standard de mot de passe
  v_encrypted_pw := crypt('AdminMuxtaar2026!', gen_salt('bf'));

  -- Insertion dans auth.users si non existant
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
      '221770000000@gmail.com',
      v_encrypted_pw,
      NOW(),
      '{"provider":"email","providers":["email"]}',
      '{"first_name":"Makhtar","last_name":"Administrateur","phone":"+221770000000","role":"admin","avatar":"avatar_09_admin_homme.svg"}',
      NOW(),
      NOW()
    );
  END IF;

  -- Insertion ou mise à jour forcée dans public.profiles
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
    'Makhtar',
    'Administrateur',
    '+221770000000',
    'admin@almuxtaar.sn',
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
