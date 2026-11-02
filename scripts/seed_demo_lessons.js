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

async function seedLessons() {
  console.log('--- SYNCHRONISATION DES LEÇONS AL MUXTAAR ---');

  // 1. Publier toutes les leçons existantes
  const { data: updatedLessons, error: upErr } = await admin
    .from('lessons')
    .update({ status: 'published' })
    .neq('status', 'published')
    .select('id, title');
  if (upErr) console.error('Erreur mise à jour leçons:', upErr.message);
  else console.log('Leçons publiées:', updatedLessons?.length ?? 0);

  // 2. Trouver les chapitres publiés
  const { data: chapters } = await admin
    .from('chapters')
    .select('id, title, order_index')
    .order('order_index');

  if (!chapters || chapters.length === 0) {
    console.log('Aucun chapitre trouvé.');
    return;
  }

  console.log(`Chapitres disponibles (${chapters.length}) :`);
  chapters.forEach(c => console.log(`  - [${c.id}] ${c.title}`));

  // Leçons types avec programme officiel S2
  const sampleLessons = [
    {
      match: /limite/i,
      title: 'Limites et Théorèmes de Comparaison',
      order_index: 1,
      is_free: true,
      content: `# Limites de Fonctions et Théorèmes de Comparaison

## 1. Définition et Limites Usuelles
Soit $f$ une fonction définie sur un voisinage de $x_0 \\in \\mathbb{R}$.

$$\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1 \\quad \\text{et} \\quad \\lim_{x \\to 0} \\frac{1 - \\cos x}{x^2} = \\frac{1}{2}$$

## 2. Théorèmes de Comparaison (Théorème des Gendarmes)
Soient $f, g$ et $h$ trois fonctions définies sur un intervalle $I$ telles que pour tout $x \\in I$ :
$$g(x) \\le f(x) \\le h(x)$$
Si $\\lim_{x \\to x_0} g(x) = \\lim_{x \\to x_0} h(x) = L$, alors :
$$\\lim_{x \\to x_0} f(x) = L$$

## 3. Continuité et Théorème des Valeurs Intermédiaires (TVI)
Si $f$ est continue et strictement monotone sur $[a, b]$, alors pour tout réel $k$ compris entre $f(a)$ et $f(b)$, l'équation $f(x) = k$ admet une **unique solution** $\\alpha \\in [a, b]$.`
    },
    {
      match: /d[ée]rivation/i,
      title: 'Nombre Dérivé et Équation de la Tangente',
      order_index: 1,
      is_free: false,
      content: `# Dérivation et Études de Fonctions

## 1. Définition du Nombre Dérivé
Soit $f$ définie sur un intervalle ouvert contenant $x_0$.
$$f'(x_0) = \\lim_{x \\to x_0} \\frac{f(x) - f(x_0)}{x - x_0}$$

## 2. Équation Cartésienne de la Tangente
La tangente $(T)$ à la courbe $(\\mathcal{C}_f)$ au point $A(x_0, f(x_0))$ a pour équation :
$$y = f'(x_0)(x - x_0) + f(x_0)$$

## 3. Formules de Dérivation Indispensables
- $(u \\cdot v)' = u'v + uv'$
- $\\left(\\frac{u}{v}\\right)' = \\frac{u'v - uv'}{v^2}$
- $(u^n)' = n \\cdot u' \\cdot u^{n-1}$
- $(\\sqrt{u})' = \\frac{u'}{2\\sqrt{u}}$`
    },
    {
      match: /logarithme|ln/i,
      title: 'Fonction Logarithme Népérien (Propriétés et Limites)',
      order_index: 1,
      is_free: false,
      content: `# La Fonction Logarithme Népérien ($\\ln$)

## 1. Définition Fondamentale
La fonction $\\ln$ est la primitive sur $]0, +\\infty[$ de la fonction $x \\mapsto \\frac{1}{x}$ qui s'annule en $1$.
$$\\ln(1) = 0 \\quad \\text{et} \\quad \\forall x > 0, \\; (\\ln x)' = \\frac{1}{x} > 0$$

## 2. Propriétés Algébriques
Pour tous réels $a > 0$ et $b > 0$ :
- $\\ln(ab) = \\ln(a) + \\ln(b)$
- $\\ln\\left(\\frac{a}{b}\\right) = \\ln(a) - \\ln(b)$
- $\\ln(a^n) = n\\ln(a)$ pour tout $n \\in \\mathbb{Z}$

## 3. Limites Remarquables au Bac
$$\\lim_{x \\to +\\infty} \\ln x = +\\infty, \\quad \\lim_{x \\to 0^+} \\ln x = -\\infty$$
$$\\lim_{x \\to +\\infty} \\frac{\\ln x}{x} = 0, \\quad \\lim_{x \\to 0^+} x\\ln x = 0$$`
    },
    {
      match: /exponentielle|exp/i,
      title: 'Fonction Exponentielle et Équations Différentielles',
      order_index: 1,
      is_free: false,
      content: `# La Fonction Exponentielle ($\\exp$)

## 1. Définition
La fonction exponentielle est la fonction réciproque de la fonction $\\ln$. Notée $\\exp$ ou $e^x$, elle est définie et strictement positive sur $\\mathbb{R}$.
$$e^{\\ln x} = x \\quad (\\forall x > 0) \\quad \\text{et} \\quad \\ln(e^x) = x \\quad (\\forall x \\in \\mathbb{R})$$

## 2. Propriétés et Dérivée
- $(e^x)' = e^x$
- $(e^{u(x)})' = u'(x) \\cdot e^{u(x)}$
- $e^{a+b} = e^a \\cdot e^b$

## 3. Croissances Comparées
$$\\lim_{x \\to +\\infty} \\frac{e^x}{x^n} = +\\infty, \\quad \\lim_{x \\to -\\infty} x^n e^x = 0 \\quad (n \\in \\mathbb{N}^*)$$`
    },
    {
      match: /suites/i,
      title: 'Suites Numériques et Raisonnement par Récurrence',
      order_index: 1,
      is_free: false,
      content: `# Suites Numériques et Convergence

## 1. Principe de Récurrence
Pour démontrer qu'une propriété $P(n)$ est vraie pour tout $n \\ge n_0$ :
1. **Initialisation** : Vérifier que $P(n_0)$ est vraie.
2. **Hérédité** : Supposer $P(k)$ vraie ($k \\ge n_0$), et montrer que $P(k+1)$ est vraie.
3. **Conclusion** : $P(n)$ est vraie pour tout $n \\ge n_0$.

## 2. Théorème de Convergence Monotone
- Toute suite croissante et majorée est **convergente**.
- Toute suite décroissante et minorée est **convergente**.`
    },
    {
      match: /primitive|int[ée]gral/i,
      title: 'Primitives et Calcul d\'Aires',
      order_index: 1,
      is_free: false,
      content: `# Primitives et Calcul Intégral

## 1. Intégrale d'une Fonction Continue
Soit $f$ une fonction continue sur $[a, b]$ et $F$ une primitive de $f$ sur $[a, b]$ :
$$\\int_a^b f(t)\\,dt = [F(t)]_a^b = F(b) - F(a)$$

## 2. Intégration par Parties (IPP)
Si $u$ et $v$ sont deux fonctions dérivables à dérivées continues sur $[a, b]$ :
$$\\int_a^b u'(t)v(t)\\,dt = [u(t)v(t)]_a^b - \\int_a^b u(t)v'(t)\\,dt$$`
    }
  ];

  for (const item of sampleLessons) {
    const targetChapter = chapters.find(c => item.match.test(c.title));
    if (targetChapter) {
      // Vérifier si une leçon existe déjà pour ce chapitre
      const { data: existing } = await admin
        .from('lessons')
        .select('id, title')
        .eq('chapter_id', targetChapter.id)
        .limit(1);

      if (!existing || existing.length === 0) {
        console.log(`Insertion leçon pour "${targetChapter.title}"...`);
        const { error: insErr } = await admin.from('lessons').insert({
          chapter_id: targetChapter.id,
          title: item.title,
          order_index: item.order_index,
          is_free: item.is_free,
          status: 'published',
          content_markdown: item.content
        });
        if (insErr) console.error(`  Erreur insertion:`, insErr.message);
        else console.log(`  -> Leçon créée avec succès !`);
      } else {
        console.log(`Mise à jour leçon existante pour "${targetChapter.title}"...`);
        await admin
          .from('lessons')
          .update({
            status: 'published',
            content_markdown: item.content
          })
          .eq('id', existing[0].id);
      }
    }
  }

  console.log('--- SYNCHRONISATION TERMINÉE ---');
}

seedLessons();
