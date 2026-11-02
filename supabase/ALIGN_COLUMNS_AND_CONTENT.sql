-- ==============================================================================
-- AL MUXTAAR SOCIETE - ALIGNEMENT DES COLONNES & DEBLOCAGE DES COURS
-- A executer dans l'editeur SQL de Supabase (SQL Editor)
-- ==============================================================================

-- 1. Alignement des colonnes dans 'chapters'
ALTER TABLE public.chapters ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0;
UPDATE public.chapters SET sort_order = order_index WHERE (sort_order = 0 OR sort_order IS NULL) AND order_index IS NOT NULL;

-- 2. Alignement des colonnes dans 'lessons'
ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0;
UPDATE public.lessons SET sort_order = order_index WHERE (sort_order = 0 OR sort_order IS NULL) AND order_index IS NOT NULL;

ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS is_free_preview BOOLEAN DEFAULT FALSE;
UPDATE public.lessons SET is_free_preview = is_free WHERE is_free_preview IS NULL OR is_free_preview = FALSE;

ALTER TABLE public.lessons ADD COLUMN IF NOT EXISTS content_md TEXT DEFAULT '';
UPDATE public.lessons SET content_md = content_markdown WHERE (content_md = '' OR content_md IS NULL) AND content_markdown IS NOT NULL;

-- 3. Publication des lecons pour les eleves
UPDATE public.lessons SET status = 'published' WHERE status = 'draft';

-- 4. Alignement des colonnes dans 'exercises'
ALTER TABLE public.exercises ADD COLUMN IF NOT EXISTS sort_order INT DEFAULT 0;
ALTER TABLE public.exercises ADD COLUMN IF NOT EXISTS statement_md TEXT DEFAULT '';
ALTER TABLE public.exercises ADD COLUMN IF NOT EXISTS solution_md TEXT DEFAULT '';
ALTER TABLE public.exercises ADD COLUMN IF NOT EXISTS difficulty INT DEFAULT 1;

UPDATE public.exercises SET sort_order = order_index WHERE (sort_order = 0 OR sort_order IS NULL) AND order_index IS NOT NULL;
UPDATE public.exercises SET statement_md = statement WHERE (statement_md = '' OR statement_md IS NULL) AND statement IS NOT NULL;
UPDATE public.exercises SET solution_md = solution WHERE (solution_md = '' OR solution_md IS NULL) AND solution IS NOT NULL;

-- 5. Fonctions RPC has_active_subscription compatibles avec 'user_uuid' ET 'check_user_id'
CREATE OR REPLACE FUNCTION public.has_active_subscription(user_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
  IF user_uuid IS NULL THEN
    RETURN FALSE;
  END IF;
  RETURN EXISTS (
    SELECT 1 FROM public.subscriptions
    WHERE user_id = user_uuid
      AND status = 'active'
      AND (end_date IS NULL OR end_date > NOW())
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

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
      AND (end_date IS NULL OR end_date > NOW())
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Insertion d'exemples de lecons completes pour les 6 chapitres publies
-- Chapitre 1 : Limites et continuite (existant)
-- Chapitre 2 : Derivation et etudes de fonctions
INSERT INTO public.lessons (chapter_id, title, sort_order, order_index, is_free, is_free_preview, status, content_md, content_markdown)
SELECT 
  id, 
  'Nombre dérivé et tangentes', 
  1, 
  1, 
  false, 
  false, 
  'published',
  '# Nombre dérivé et équation de la tangente\n\n## 1. Définition\nSoit $f$ une fonction définie sur un intervalle $I$ et $x_0 \in I$.\nOn dit que $f$ est dérivable en $x_0$ si le taux d''accroissement admet une limite finie quand $x \to x_0$ :\n\n$$\lim_{x \to x_0} \frac{f(x) - f(x_0)}{x - x_0} = f''(x_0)$$\n\n## 2. Équation de la tangente\nLa droite tangente à la courbe $(\mathcal{C}_f)$ au point d''abscisse $x_0$ a pour équation cartésienne :\n\n$$y = f''(x_0)(x - x_0) + f(x_0)$$\n\n## 3. Exemple type Bac\nSoit $f(x) = x^3 - 3x + 2$. Calculons $f''(1)$ et déterminons l''équation de la tangente en $x_0 = 1$ :\n$f''(x) = 3x^2 - 3 \implies f''(1) = 0$.\nLa tangente en $x_0=1$ est horizontale d''équation $y = f(1) = 0$.',
  '# Nombre dérivé et équation de la tangente\n\n## 1. Définition\nSoit $f$ une fonction définie sur un intervalle $I$ et $x_0 \in I$.\nOn dit que $f$ est dérivable en $x_0$ si le taux d''accroissement admet une limite finie quand $x \to x_0$ :\n\n$$\lim_{x \to x_0} \frac{f(x) - f(x_0)}{x - x_0} = f''(x_0)$$\n\n## 2. Équation de la tangente\nLa droite tangente à la courbe $(\mathcal{C}_f)$ au point d''abscisse $x_0$ a pour équation cartésienne :\n\n$$y = f''(x_0)(x - x_0) + f(x_0)$$\n\n## 3. Exemple type Bac\nSoit $f(x) = x^3 - 3x + 2$. Calculons $f''(1)$ et déterminons l''équation de la tangente en $x_0 = 1$ :\n$f''(x) = 3x^2 - 3 \implies f''(1) = 0$.\nLa tangente en $x_0=1$ est horizontale d''équation $y = f(1) = 0$.'
FROM public.chapters WHERE title ILIKE '%dérivation%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Chapitre 3 : Suites numeriques
INSERT INTO public.lessons (chapter_id, title, sort_order, order_index, is_free, is_free_preview, status, content_md, content_markdown)
SELECT 
  id, 
  'Raisonnement par récurrence et convergence', 
  1, 
  1, 
  false, 
  false, 
  'published',
  '# Raisonnement par récurrence\n\n## 1. Principe fondamental\nPour démontrer qu''une propriété $P(n)$ est vraie pour tout $n \ge n_0$ :\n1. **Initialisation** : Vérifier que $P(n_0)$ est vraie.\n2. **Hérédité** : Supposer $P(k)$ vraie pour un entier $k \ge n_0$, et démontrer que $P(k+1)$ est vraie.\n3. **Conclusion** : Pour tout $n \ge n_0$, $P(n)$ est vraie.\n\n## 2. Théorème de la convergence monotone\n- Toute suite croissante et majorée est **convergente**.\n- Toute suite décroissante et minorée est **convergente**.',
  '# Raisonnement par récurrence\n\n## 1. Principe fondamental\nPour démontrer qu''une propriété $P(n)$ est vraie pour tout $n \ge n_0$ :\n1. **Initialisation** : Vérifier que $P(n_0)$ est vraie.\n2. **Hérédité** : Supposer $P(k)$ vraie pour un entier $k \ge n_0$, et démontrer que $P(k+1)$ est vraie.\n3. **Conclusion** : Pour tout $n \ge n_0$, $P(n)$ est vraie.\n\n## 2. Théorème de la convergence monotone\n- Toute suite croissante et majorée est **convergente**.\n- Toute suite décroissante et minorée est **convergente**.'
FROM public.chapters WHERE title ILIKE '%suites%' LIMIT 1
ON CONFLICT DO NOTHING;

-- Chapitre 4 : Fonction logarithme népérien
INSERT INTO public.lessons (chapter_id, title, sort_order, order_index, is_free, is_free_preview, status, content_md, content_markdown)
SELECT 
  id, 
  'Propriétés algébriques et limites de la fonction ln', 
  1, 
  1, 
  false, 
  false, 
  'published',
  '# La fonction Logarithme Népérien $\ln$\n\n## 1. Définition\nLa fonction logarithme népérien, notée $\ln$, est l''unique primitive sur $]0, +\infty[$ de la fonction $x \mapsto \frac{1}{x}$ qui s''annule en 1.\n\n$$\ln(1) = 0 \quad \text{et} \quad \forall x > 0, \; (\ln x)'' = \frac{1}{x} > 0$$\n\n## 2. Propriétés fondamentales\nPour tous réels $a > 0$ et $b > 0$ :\n- $\ln(a \cdot b) = \ln(a) + \ln(b)$\n- $\ln\left(\frac{a}{b}\right) = \ln(a) - \ln(b)$\n- $\ln(a^n) = n \ln(a)$ pour tout $n \in \mathbb{Z}$\n\n## 3. Limites usuelles au Bac\n$$\lim_{x \to +\infty} \ln(x) = +\infty, \quad \lim_{x \to 0^+} \ln(x) = -\infty$$\n$$\lim_{x \to +\infty} \frac{\ln x}{x} = 0, \quad \lim_{x \to 0^+} x \ln x = 0, \quad \lim_{x \to 1} \frac{\ln x}{x - 1} = 1$$',
  '# La fonction Logarithme Népérien $\ln$\n\n## 1. Définition\nLa fonction logarithme népérien, notée $\ln$, est l''unique primitive sur $]0, +\infty[$ de la fonction $x \mapsto \frac{1}{x}$ qui s''annule en 1.\n\n$$\ln(1) = 0 \quad \text{et} \quad \forall x > 0, \; (\ln x)'' = \frac{1}{x} > 0$$\n\n## 2. Propriétés fondamentales\nPour tous réels $a > 0$ et $b > 0$ :\n- $\ln(a \cdot b) = \ln(a) + \ln(b)$\n- $\ln\left(\frac{a}{b}\right) = \ln(a) - \ln(b)$\n- $\ln(a^n) = n \ln(a)$ pour tout $n \in \mathbb{Z}$\n\n## 3. Limites usuelles au Bac\n$$\lim_{x \to +\infty} \ln(x) = +\infty, \quad \lim_{x \to 0^+} \ln(x) = -\infty$$\n$$\lim_{x \to +\infty} \frac{\ln x}{x} = 0, \quad \lim_{x \to 0^+} x \ln x = 0, \quad \lim_{x \to 1} \frac{\ln x}{x - 1} = 1$$'
FROM public.chapters WHERE title ILIKE '%logarithme%' LIMIT 1
ON CONFLICT DO NOTHING;

