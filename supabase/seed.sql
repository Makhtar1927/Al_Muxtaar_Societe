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
  ('50000000-0000-0000-0000-000000000007', '40000000-0000-0000-0000-000000000001', 'Équations différentielles', 7, 'published'),
  ('50000000-0000-0000-0000-000000000008', '40000000-0000-0000-0000-000000000001', 'Nombres complexes', 8, 'published'),
  ('50000000-0000-0000-0000-000000000009', '40000000-0000-0000-0000-000000000001', 'Dénombrement et probabilités', 9, 'published'),
  ('50000000-0000-0000-0000-000000000010', '40000000-0000-0000-0000-000000000001', 'Statistiques', 10, 'published'),
  ('50000000-0000-0000-0000-000000000011', '40000000-0000-0000-0000-000000000001', 'Géométrie dans l''espace', 11, 'published')
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

INSERT INTO public.quiz_answers (id, question_id, answer_text, is_correct, order_index)
VALUES
  ('a0000000-0000-0000-0000-000000000001', '90000000-0000-0000-0000-000000000001', '0 / 0', false, 1),
  ('a0000000-0000-0000-0000-000000000002', '90000000-0000-0000-0000-000000000001', '+∞ - ∞', false, 2),
  ('a0000000-0000-0000-0000-000000000003', '90000000-0000-0000-0000-000000000001', '1 / 0', true, 3),
  ('a0000000-0000-0000-0000-000000000004', '90000000-0000-0000-0000-000000000001', '∞ / ∞', false, 4),

  ('a0000000-0000-0000-0000-000000000005', '90000000-0000-0000-0000-000000000002', '3', true, 1),
  ('a0000000-0000-0000-0000-000000000006', '90000000-0000-0000-0000-000000000002', '+∞', false, 2),
  ('a0000000-0000-0000-0000-000000000007', '90000000-0000-0000-0000-000000000002', '0', false, 3),
  ('a0000000-0000-0000-0000-000000000008', '90000000-0000-0000-0000-000000000002', '-5', false, 4)
ON CONFLICT (id) DO NOTHING;

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
