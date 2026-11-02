const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

const env = fs.readFileSync('.env.local', 'utf8');
const envVars = {};
env.split('\n').forEach(l => {
  const parts = l.trim().split('=');
  if (parts.length >= 2) {
    const k = parts[0].trim();
    const v = parts.slice(1).join('=').trim().replace(/^["']|["']$/g, '');
    envVars[k] = v;
  }
});

const admin = createClient(
  envVars.NEXT_PUBLIC_SUPABASE_URL,
  envVars.SUPABASE_SERVICE_ROLE_KEY
);

const RICH_LESSON_CONTENT = `# Chapitre 1 : Limites et Continuité (Terminale S2)

Bienvenue dans ce cours interactif conçu pour vous faire maîtriser l'ensemble des notions de limites et de continuité exigées au **Baccalauréat Scientifique (Série S2)**.

---

## 1. Notion Intuitive et Définition de la Limite

Lorsque la variable $x$ se rapproche infiniment d'une valeur réelle $x_0$, les images $f(x)$ peuvent se rapprocher d'un nombre réel $L$. On écrit alors :

$$\\lim_{x \\to x_0} f(x) = L$$

Observez l'animation ci-dessous montrant la convergence dynamique du point $x$ vers $x_0$ et la projection correspondante sur la courbe :

![Figure 1 : Animation interactive de la convergence vers une limite finie](/assets/pedagogie/limite_convergence.svg)

> [!METHODE] Le premier réflexe devant tout calcul de limite est de **remplacer directement $x$ par la valeur $x_0$**. Si le résultat est un nombre réel déterminé, le calcul est déjà terminé !

---

## 2. Les Formes Indéterminées & Comment les Lever

Au Baccalauréat, les examinateurs testent votre capacité à lever les indéterminations. Il n'existe que **4 formes indéterminées** à connaître par cœur :

![Figure 2 : Schéma récapitulatif des 4 Formes Indéterminées et des 3 Réflexes Bac](/assets/pedagogie/formes_indeterminees.svg)

### Les 3 réflexes fondamentaux :
1. **La factorisation par le terme prépondérant en $\\pm\\infty$** : on met en facteur la plus grande puissance de $x$ au numérateur et au dénominateur.
2. **L'expression conjuguée** : indispensable dès la présence d'un radical $\\sqrt{\\dots}$ suivi d'une soustraction menant à une forme "$\\infty - \\infty$".
3. **Le taux de variation (Nombre dérivé)** : indispensable pour les limites trigonométriques en $0$.

> [!ASTUCE] Au Bac S2, si vous rencontrez $\\lim_{x \\to 0} \\frac{\\sin(ax)}{x}$, le résultat immédiat est $a$, car $\\lim_{X \\to 0} \\frac{\\sin X}{X} = 1$.

> [!PIEGE] Ne confondez jamais $\\frac{0}{\\infty}$ (qui vaut simplement $0$) ou $\\frac{\\infty}{0}$ (qui tend vers $\\infty$) avec des formes indéterminées. Seules les 4 formes mentionnées ci-dessus nécessitent une transformation d'écriture.

---

## 3. Le Théorème d'Encadrement (Théorème des Gendarmes)

Lorsque vous étudiez des fonctions contenant des oscillations trigonométriques comme $\\sin(x)$ ou $\\cos(x)$ en $\\pm\\infty$, vous ne pouvez pas calculer directement la limite car ces fonctions n'ont pas de limite à l'infini. 

La méthode consiste à les **enserrer** entre deux fonctions qui convergent vers la même valeur :

![Figure 3 : Animation de l'effet d'étau du Théorème des Gendarmes](/assets/pedagogie/theoreme_gendarmes.svg)

$$\\forall x \\in I, \\quad g(x) \\le f(x) \\le h(x)$$
$$\\text{Si } \\lim_{x \\to x_0} g(x) = \\lim_{x \\to x_0} h(x) = L, \\quad \\text{alors } \\lim_{x \\to x_0} f(x) = L$$

> [!EXEMPLE] Calculons $\\lim_{x \\to +\\infty} \\frac{\\cos x}{x}$.  
> Pour tout $x > 0$, on sait que $-1 \\le \\cos x \\le 1$.  
> En divisant par $x > 0$ : $-\\frac{1}{x} \\le \\frac{\\cos x}{x} \\le \\frac{1}{x}$.  
> Or $\\lim_{x \\to +\\infty} -\\frac{1}{x} = \\lim_{x \\to +\\infty} \\frac{1}{x} = 0$.  
> D'après le théorème des gendarmes, $\\lim_{x \\to +\\infty} \\frac{\\cos x}{x} = 0$.

---

## 4. Continuité et Théorème des Valeurs Intermédiaires (TVI)

La continuité garantit que la courbe d'une fonction se trace sans lever le crayon. Le TVI est l'outil indispensable pour démontrer l'existence et l'unicité de solutions d'équations non résolubles algébriquement :

![Figure 4 : Illustration dynamique du TVI et de l'unique solution alpha](/assets/pedagogie/theoreme_valeurs_intermediaires.svg)

### Rédaction type exigée au Bac S2 :
Pour prouver que l'équation $f(x) = 0$ admet une unique solution $\\alpha$ sur $[a, b]$ :
1. **Continuité** : Justifier que $f$ est continue sur $[a, b]$ (comme somme, produit ou quotient de fonctions usuelles).
2. **Monotonie stricte** : Calculer $f'(x)$ et montrer que $f$ est strictement croissante (ou strictement décroissante).
3. **Changement de signe** : Vérifier que $f(a) \\times f(b) < 0$ (c'est-à-dire que $0$ est compris entre $f(a)$ et $f(b)$).

> [!METHODE] Ces 3 conditions réunies permettent d'affirmer avec rigueur :  
> *« $f$ est continue et strictement monotone sur $[a, b]$, et $0 \\in f([a, b])$. D'après le corollaire du Théorème des Valeurs Intermédiaires, l'équation $f(x) = 0$ admet une unique solution $\\alpha \\in [a, b]$. »*
`;

async function updateLesson() {
  console.log('--- RECHERCHE DU CHAPITRE LIMITES & CONTINUITE ---');
  const { data: chapters } = await admin
    .from('chapters')
    .select('id, title')
    .ilike('title', '%limite%')
    .limit(1);

  if (!chapters || chapters.length === 0) {
    console.error('Chapitre Limites non trouvé.');
    return;
  }

  const chapterId = chapters[0].id;
  console.log(`Chapitre trouvé : [${chapterId}] ${chapters[0].title}`);

  // Chercher ou créer la leçon
  const { data: lessons } = await admin
    .from('lessons')
    .select('id, title')
    .eq('chapter_id', chapterId)
    .order('order_index')
    .limit(1);

  if (lessons && lessons.length > 0) {
    const lessonId = lessons[0].id;
    console.log(`Mise à jour de la leçon : [${lessonId}] ${lessons[0].title}`);
    const { error: updErr } = await admin
      .from('lessons')
      .update({
        title: 'Notion de Limite, Théorèmes de Comparaison & TVI',
        status: 'published',
        content_markdown: RICH_LESSON_CONTENT
      })
      .eq('id', lessonId);

    if (updErr) console.error('Erreur mise à jour:', updErr.message);
    else console.log('Succès : Leçon enrichie avec images animées et pédagogie !');
  } else {
    console.log('Création de la leçon avec le nouveau contenu...');
    const { error: insErr } = await admin.from('lessons').insert({
      chapter_id: chapterId,
      title: 'Notion de Limite, Théorèmes de Comparaison & TVI',
      order_index: 1,
      is_free: true,
      status: 'published',
      content_markdown: RICH_LESSON_CONTENT
    });
    if (insErr) console.error('Erreur insertion:', insErr.message);
    else console.log('Succès : Leçon insérée avec succès !');
  }
}

updateLesson();
