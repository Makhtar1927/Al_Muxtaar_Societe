-- Migration 00007 : Ajout du champ temp_password dans profiles
-- Permet à l'admin de stocker un mot de passe temporaire visible dans le back-office

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS temp_password TEXT DEFAULT NULL;

-- Commentaire documentaire
COMMENT ON COLUMN public.profiles.temp_password IS
  'Mot de passe temporaire généré par l''admin. Stocké en clair pour affichage back-office uniquement. Doit être changé par l''élève à sa première connexion.';
