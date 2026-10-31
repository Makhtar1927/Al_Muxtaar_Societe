-- Test SQL de validation des Politiques RLS (P5)
-- Ce script simule les 4 profils utilisateurs et valide les règles d'accès au contenu

BEGIN;

-- 1. Simulation : Visiteur anonyme (aucun auth.uid)
SET LOCAL ROLE anon;
SET LOCAL "request.jwt.claim.sub" = '';

-- Test 1.1 : Le visiteur peut lire le catalogue des niveaux
SELECT count(*) AS visitor_can_read_levels FROM public.levels;
-- Attendu : >= 1

-- Test 1.2 : Le visiteur lit les chapitres publiés
SELECT count(*) AS visitor_can_read_published_chapters FROM public.chapters WHERE status = 'published';
-- Attendu : >= 1

-- Test 1.3 : Le visiteur lit UNIQUEMENT les leçons gratuites publiées
SELECT count(*) AS visitor_read_free_published_lessons
FROM public.lessons
WHERE status = 'published' AND is_free = true;
-- Attendu : 1 (la leçon 1)

-- Test 1.4 : Le visiteur tente de lire les leçons payantes ou brouillons (DOIT RENVOYER 0 LIGNES)
SELECT count(*) AS visitor_forbidden_lessons
FROM public.lessons
WHERE is_free = false;
-- Attendu : 0 ligne renvoyée par RLS

-- 2. Simulation : Élève connecté SANS abonnement actif
SET LOCAL ROLE authenticated;
SET LOCAL "request.jwt.claim.sub" = '99999999-0000-0000-0000-000000000001';

-- Test 2.1 : L'élève non abonné ne lit que les leçons gratuites
SELECT count(*) AS free_student_read_lessons FROM public.lessons;
-- Attendu : 1 (uniquement la leçon gratuite)

-- Test 2.2 : Tentative d'écriture par l'élève (DOIT ÉCHOUER / REFUSER)
-- INSERT INTO public.lessons (chapter_id, title) VALUES ('50000000-0000-0000-0000-000000000001', 'Test hack');
-- Attendu : Permission denied by RLS

-- 3. Simulation : Élève connecté AVEC abonnement actif
-- On insère un abonnement actif pour cet élève
SET LOCAL ROLE postgres;
INSERT INTO public.subscriptions (user_id, plan_id, status, start_date, end_date)
VALUES (
  '99999999-0000-0000-0000-000000000001',
  '10000000-0000-0000-0000-000000000001',
  'active',
  NOW() - INTERVAL '1 day',
  NOW() + INTERVAL '29 days'
) ON CONFLICT DO NOTHING;

SET LOCAL ROLE authenticated;
SET LOCAL "request.jwt.claim.sub" = '99999999-0000-0000-0000-000000000001';

-- Test 3.1 : L'élève abonné lit maintenant toutes les leçons publiées (gratuites ET payantes)
SELECT count(*) AS sub_student_read_published_lessons
FROM public.lessons
WHERE status = 'published';
-- Attendu : Toutes les leçons publiées

-- Test 3.2 : L'élève abonné ne voit toujours PAS les brouillons (draft)
SELECT count(*) AS sub_student_read_draft_lessons
FROM public.lessons
WHERE status = 'draft';
-- Attendu : 0

-- 4. Simulation : Administrateur
SET LOCAL "request.jwt.claim.sub" = '00000000-0000-0000-0000-000000000001';

-- Test 4.1 : L'administrateur voit tout, y compris les brouillons
SELECT count(*) AS admin_read_all_lessons FROM public.lessons;
-- Attendu : >= 2 (publiées + brouillons)

-- Test 4.2 : L'administrateur peut insérer, modifier ou supprimer
-- INSERT INTO public.lessons ... -> SUCCÈS

ROLLBACK;

