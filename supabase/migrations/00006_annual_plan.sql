-- Migration 00006 — Ajout formule d'abonnement annuelle 5 000 FCFA (Commission influenceur 500 FCFA)
INSERT INTO public.plans (id, name, duration_days, price_fcfa, is_active)
VALUES ('10000000-0000-0000-0000-000000000003', 'Formule Annuelle (1 An)', 365, 5000, true)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  duration_days = EXCLUDED.duration_days,
  price_fcfa = EXCLUDED.price_fcfa,
  is_active = EXCLUDED.is_active;
