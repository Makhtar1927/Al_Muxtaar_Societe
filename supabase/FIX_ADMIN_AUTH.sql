-- ==============================================================================
-- Al_Muxtaar_Société - Nettoyage et Réinitialisation du Compte Admin
-- ==============================================================================
-- Ce script supprime l'enregistrement brut d'auth.users pour permettre
-- à l'API Supabase de recréer le compte admin avec toutes ses identités valides.

DELETE FROM auth.users WHERE email = '221772476926@gmail.com';
DELETE FROM public.profiles WHERE phone = '+221772476926' OR email = 'papemakhtaraidara@gmail.com';

