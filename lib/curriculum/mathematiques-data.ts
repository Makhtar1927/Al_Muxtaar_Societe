export interface MathLessonItem {
  id: string;
  title: string;
  order_index: number;
  is_free: boolean;
  status: 'published';
}

export interface MathChapterItem {
  id: string;
  order_index: number;
  code: string; // Ex: 'M1', 'M2', ..., 'M12'
  domain: 'Analyse' | 'Algèbre et Géométrie' | 'Probabilités et Dénombrement';
  partNumber: 1 | 2 | 3;
  title: string;
  desc: string;
  competences: string[];
  keyFormula: string;
  wolofInsight: string;
  status: 'published';
  lessons: MathLessonItem[];
}

export const MATHEMATIQUES_SUBJECT_ID = '40000000-0000-0000-0000-000000000001';

export const MATHEMATIQUES_DOMAINS = [
  {
    number: 1,
    title: 'Analyse',
    badge: 'Domaine 1',
    description: 'Limites, continuité, dérivation, fonctions ln et exp, intégrales, équations différentielles et suites.',
    chapterCodes: ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7'],
  },
  {
    number: 2,
    title: 'Algèbre et Géométrie',
    badge: 'Domaine 2',
    description: 'Nombres complexes, similitudes directes, isométries et transformations du plan.',
    chapterCodes: ['M8', 'M9', 'M10'],
  },
  {
    number: 3,
    title: 'Probabilités et Dénombrement',
    badge: 'Domaine 3',
    description: 'Arrangements, permutations, combinaisons, probabilités conditionnelles et loi binomiale.',
    chapterCodes: ['M11', 'M12'],
  },
];

export const MATHEMATIQUES_CHAPTERS: MathChapterItem[] = [
  // ==========================================
  // DOMAINE 1 : ANALYSE (Chapitres 1 à 7)
  // ==========================================
  {
    id: '50000000-0000-0000-0000-000000000001',
    order_index: 1,
    code: 'M1',
    domain: 'Analyse',
    partNumber: 1,
    title: 'Limites et Continuité',
    desc: 'Opérations sur les limites, asymptotes, continuité sur un intervalle et théorème des valeurs intermédiaires (TVI).',
    competences: [
      'Lever les 4 formes indéterminées',
      'Identifier les asymptotes horizontales et verticales',
      'Appliquer le TVI et le théorème de la bijection au Bac',
    ],
    keyFormula: '\\lim_{x \\to x_0} f(x) = L \\qquad f(a) \\times f(b) < 0 \\implies \\exists! \\alpha, f(\\alpha) = 0',
    wolofInsight: 'Limite dafa melni car rapide buy jegeñsi péage : xool bérab bi mu jëm bala mu fa agsi. TVI mooy yoonu Ndar : boo jogee Dakar ba Saint-Louis faw nga romb Thiès.',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0000-0000-000000000001',
        title: 'Notion de limite, calculs usuels et formes indéterminées',
        order_index: 1,
        is_free: true,
        status: 'published',
      },
      {
        id: '60000000-0000-0000-0000-000000000002',
        title: 'Continuité sur un intervalle, TVI et méthode de la bijection',
        order_index: 2,
        is_free: false,
        status: 'published',
      },
    ],
  },
  {
    id: '50000000-0000-0000-0000-000000000002',
    order_index: 2,
    code: 'M2',
    domain: 'Analyse',
    partNumber: 1,
    title: 'Dérivabilité et Étude de Fonctions',
    desc: 'Nombre dérivé, sens de variation, branches infinies (asymptotes obliques, branches paraboliques) et tracé de courbes.',
    competences: [
      'Calculer la dérivée f\'(x) et équation de tangente',
      'Déterminer les branches infinies (asymptotes obliques et paraboliques)',
      'Dresser le tableau de variations complet et tracer la courbe C_f',
    ],
    keyFormula: 'y = f\'(x_0)(x - x_0) + f(x_0) \\qquad \\lim_{x \\to \\pm\\infty} [f(x) - (ax + b)] = 0',
    wolofInsight: 'Dérivée mooy pente u toundu Mamelles : day yéeg (+), taxaw ci kocc bi (0), wàcc (-). Asymptote dafa melni rails u TER : dungeen laal mukk.',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0000-0000-000000000003',
        title: 'Dérivation, tangentes et variations de fonctions',
        order_index: 1,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0000-0000-000000000004',
        title: 'Branches infinies, asymptotes et positions relatives',
        order_index: 2,
        is_free: false,
        status: 'published',
      },
    ],
  },
  {
    id: '50000000-0000-0000-0000-000000000004',
    order_index: 3,
    code: 'M3',
    domain: 'Analyse',
    partNumber: 1,
    title: 'Fonction Logarithme Népérien (ln)',
    desc: 'Définition, propriétés algébriques, limites fondamentales, croissances comparées et étude de fonctions avec ln.',
    competences: [
      'Propriétés algébriques fondamentales de ln',
      'Lever les formes indéterminées avec ln x / x et x ln x',
      'Résoudre équations et inéquations avec ln',
    ],
    keyFormula: '\\ln(ab) = \\ln a + \\ln b \\qquad \\lim_{x \\to +\\infty} \\frac{\\ln x}{x} = 0',
    wolofInsight: 'Logarithme dafa melni mbonat (tortue) : dafay yéeg ndànk lool waaye du taxaw mukk.',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0000-0000-000000000006',
        title: 'Propriétés, limites et dérivation de la fonction logarithme népérien',
        order_index: 1,
        is_free: false,
        status: 'published',
      },
    ],
  },
  {
    id: '50000000-0000-0000-0000-000000000005',
    order_index: 4,
    code: 'M4',
    domain: 'Analyse',
    partNumber: 1,
    title: 'Fonctions Exponentielles',
    desc: 'Exponentielle de base e, exponentielles de base a, dérivées, limites et croissances comparées.',
    competences: [
      'Réciproque du logarithme et dérivée (e^u)\' = u\' e^u',
      'Limites et croissances comparées e^x / x^n',
      'Étude complète de fonctions composées avec exp',
    ],
    keyFormula: '(e^u)\' = u\' \\cdot e^u \\qquad \\lim_{x \\to +\\infty} \\frac{e^x}{x^n} = +\\infty',
    wolofInsight: 'Exponentielle dafa melni fusée buy yéeg ci kaw asamaan ci anam bu gaaw lool.',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0000-0000-000000000007',
        title: 'Propriétés, limites et dérivation de la fonction exponentielle',
        order_index: 1,
        is_free: false,
        status: 'published',
      },
    ],
  },
  {
    id: '50000000-0000-0000-0000-000000000006',
    order_index: 5,
    code: 'M5',
    domain: 'Analyse',
    partNumber: 1,
    title: 'Primitives et Calcul Intégral',
    desc: 'Calcul de primitives, propriétés de l\'intégrale, intégration par parties et calcul d\'aires.',
    competences: [
      'Tableau des primitives usuelles et composées',
      'Formule d\'intégration par parties u\'v',
      'Calcul d\'aires en unités d\'aire sous et entre deux courbes',
    ],
    keyFormula: '\\int_a^b u\'(t) v(t) dt = [u(t)v(t)]_a^b - \\int_a^b u(t) v\'(t) dt',
    wolofInsight: 'Intégrale mooy natt champ u gerte bu amul forme bu jub : da ngay daggate di boole aire yi.',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0000-0000-000000000008',
        title: 'Primitives, intégration par parties et calcul d\'aires',
        order_index: 1,
        is_free: false,
        status: 'published',
      },
    ],
  },
  {
    id: '50000000-0000-0000-0000-000000000007',
    order_index: 6,
    code: 'M6',
    domain: 'Analyse',
    partNumber: 1,
    title: 'Équations Différentielles',
    desc: 'Équations différentielles linéaires du premier ordre et du second ordre à coefficients constants.',
    competences: [
      'Résolution de y\' + ay = b',
      'Équation caractéristique du second ordre ay\'\' + by\' + cy = 0',
      'Détermination de la solution unique avec conditions initiales',
    ],
    keyFormula: 'y\' + ay = b \\implies y(x) = C e^{-ax} + \\frac{b}{a} \\qquad ay\'\' + by\' + cy = 0',
    wolofInsight: 'Équation différentielle dafa melni yéngu-yéngu pirogue ci géej : doole yi ñoo ciy wax trajectoire bi.',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0000-0000-000000000009',
        title: 'Équations différentielles linéaires du 1er et 2nd ordre',
        order_index: 1,
        is_free: false,
        status: 'published',
      },
    ],
  },
  {
    id: '50000000-0000-0000-0000-000000000003',
    order_index: 7,
    code: 'M7',
    domain: 'Analyse',
    partNumber: 1,
    title: 'Suites Numériques',
    desc: 'Suites arithmétiques, géométriques, raisonnement par récurrence, convergence et théorèmes de convergence (suites monotones, suites adjacentes).',
    competences: [
      'Raisonnement par récurrence (initialisation, hérédité, conclusion)',
      'Suites arithmético-géométriques et suite auxiliaire v_n',
      'Théorème de convergence monotone et point fixe L = f(L)',
    ],
    keyFormula: 'P(0) \\text{ vrai et } P(k) \\implies P(k+1) \\implies \\forall n, P(n) \\qquad u_{n+1} = f(u_n)',
    wolofInsight: 'Récurrence dafa melni dominos : boo daanee bu jëkk bi te koo daan mu daaneel sa kanam, yépp dañuy daanu.',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0000-0000-000000000005',
        title: 'Suites numériques, récurrence et convergence monotone',
        order_index: 1,
        is_free: false,
        status: 'published',
      },
    ],
  },

  // ==========================================
  // DOMAINE 2 : ALGÈBRE ET GÉOMÉTRIE (Chapitres 8 à 10)
  // ==========================================
  {
    id: '50000000-0000-0000-0000-000000000008',
    order_index: 8,
    code: 'M8',
    domain: 'Algèbre et Géométrie',
    partNumber: 2,
    title: 'Nombres Complexes',
    desc: 'Forme algébrique, forme trigonométrique et exponentielle, affixes, résolutions d\'équations du second degré dans C, applications géométriques.',
    competences: [
      'Calcul du module, argument et formule de Moivre',
      'Résolution d\'équations dans C (racines carrées, discriminant delta)',
      'Interprétation géométrique : quotient d\'affixes, alignement, orthogonalité',
    ],
    keyFormula: 'z = r(\\cos\\theta + i\\sin\\theta) = r e^{i\\theta} \\qquad \\arg\\left(\\frac{z_C - z_A}{z_B - z_A}\\right) = (\\vec{AB}, \\vec{AC})',
    wolofInsight: 'Complexe mooy boussole gaal ci géej Dakar : module bi mooy distance bi, argument bi di cap bi.',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0000-0000-000000000010',
        title: 'Forme algébrique, trigonométrique et géométrie dans le plan complexe',
        order_index: 1,
        is_free: false,
        status: 'published',
      },
    ],
  },
  {
    id: '50000000-0000-0000-0000-000000000012',
    order_index: 9,
    code: 'M9',
    domain: 'Algèbre et Géométrie',
    partNumber: 2,
    title: 'Similitudes Planes Directes',
    desc: 'Définition, écriture complexe, caractérisation et propriétés géométriques.',
    competences: [
      'Écriture complexe z\' = az + b',
      'Caractérisation : rapport k = |a|, angle theta = arg(a) et centre omega',
      'Images de droites, cercles et configurations géométriques',
    ],
    keyFormula: 'z\' = a z + b \\qquad k = |a|, \\; \\theta = \\arg(a), \\; \\omega = \\frac{b}{1 - a}',
    wolofInsight: 'Similitude dafa melni foto ci portable : day agrandir (rapport), tourner ko (angle) te am point fixe bu bougul (centre).',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0000-0000-000000000014',
        title: 'Similitudes directes : écriture complexe, éléments caractéristiques et constructions',
        order_index: 1,
        is_free: false,
        status: 'published',
      },
    ],
  },
  {
    id: '50000000-0000-0000-0000-000000000013',
    order_index: 10,
    code: 'M10',
    domain: 'Algèbre et Géométrie',
    partNumber: 2,
    title: 'Isométries et Transformations du Plan',
    desc: 'Translations, rotations, réflexions (symétries axiales), composées de transformations (selon rappels et approfondissements).',
    competences: [
      'Caractériser les translations (z\' = z + b) et rotations (z\' - omega = e^{itheta}(z - omega))',
      'Propriétés des réflexions et conservation des distances',
      'Composée de deux isométries et réduction de transformations',
    ],
    keyFormula: 't_{\\vec{u}} : z\' = z + z_u \\qquad r(\\Omega, \\theta) : z\' - z_\\Omega = e^{i\\theta}(z - z_\\Omega)',
    wolofInsight: 'Isométrie mooy transformation bu dul soppi distance yi mukk : da ngay déplacer walla mirrorer sans yàq.',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0000-0000-000000000015',
        title: 'Isométries du plan : translations, rotations, réflexions et composées',
        order_index: 1,
        is_free: false,
        status: 'published',
      },
    ],
  },

  // ==========================================
  // DOMAINE 3 : PROBABILITÉS ET DÉNOMBREMENT (Chapitres 11 à 12)
  // ==========================================
  {
    id: '50000000-0000-0000-0000-000000000014',
    order_index: 11,
    code: 'M11',
    domain: 'Probabilités et Dénombrement',
    partNumber: 3,
    title: 'Dénombrement',
    desc: 'Arrangements, permutations, combinaisons (listes, p-listes), triangle de Pascal et formule du binôme.',
    competences: [
      'Identifier le bon modèle de tirage (avec/sans remise, simultané)',
      'Calculer les arrangements A_n^p et les combinaisons C_n^p',
      'Appliquer les principes d\'addition et de multiplication',
    ],
    keyFormula: 'A_n^p = \\frac{n!}{(n - p)!} \\qquad C_n^p = \\frac{n!}{p!(n - p)!} \\qquad n^p \\text{ (p-listes)}',
    wolofInsight: 'Dénombrement mooy waññ : ndax ordre am na solo (arrangements) walla amul solo (combinaisons) ?',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0000-0000-000000000016',
        title: 'Arrangements, permutations, combinaisons et p-listes',
        order_index: 1,
        is_free: false,
        status: 'published',
      },
    ],
  },
  {
    id: '50000000-0000-0000-0000-000000000009',
    order_index: 12,
    code: 'M12',
    domain: 'Probabilités et Dénombrement',
    partNumber: 3,
    title: 'Probabilités',
    desc: 'Probabilités conditionnelles, formule des probabilités totales, variables aléatoires, loi binomiale, loi de probabilité, espérance, variance et écart-type.',
    competences: [
      'Construire et exploiter un arbre pondéré',
      'Appliquer la formule des probabilités totales',
      'Déterminer la loi d\'une variable aléatoire X, E(X), V(X) et loi binomiale B(n, p)',
    ],
    keyFormula: 'P(B) = \\sum P(A_i) P(B|A_i) \\qquad P(X = k) = C_n^k p^k (1 - p)^{n-k} \\qquad E(X) = n p',
    wolofInsight: 'Probabilités dafa melni tànn bourses ci concours walla pénaltys ci finale football.',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0000-0000-000000000011',
        title: 'Probabilités conditionnelles, formule des probabilités totales et loi binomiale',
        order_index: 1,
        is_free: false,
        status: 'published',
      },
    ],
  },
];

/**
 * Synchronisation automatique en arrière-plan avec Supabase pour les Mathématiques
 */
export async function ensureMathematiquesInDatabase(admin: any) {
  try {
    // 1. Obtenir l'ID de la matière "mathematiques"
    let targetSubjectId = MATHEMATIQUES_SUBJECT_ID;
    const { data: subRow } = await admin
      .from('subjects')
      .select('id')
      .ilike('code', '%math%')
      .limit(1)
      .maybeSingle();

    if (subRow?.id) {
      targetSubjectId = subRow.id;
    }

    // 2. Insérer/vérifier tous les Chapitres et leçons du programme officiel de Mathématiques
    for (const chap of MATHEMATIQUES_CHAPTERS) {
      await admin.from('chapters').upsert(
        {
          id: chap.id,
          subject_id: targetSubjectId,
          title: chap.title,
          order_index: chap.order_index,
          status: 'published',
        },
        { onConflict: 'id' }
      );

      for (const l of chap.lessons) {
        await admin.from('lessons').upsert(
          {
            id: l.id,
            chapter_id: chap.id,
            title: l.title,
            order_index: l.order_index,
            is_free: l.is_free,
            status: 'published',
            content_markdown: `# ${chap.title}\n\n## ${l.title}`,
          },
          { onConflict: 'id' }
        );
      }
    }

    return targetSubjectId;
  } catch (err) {
    console.error('Erreur ensureMathematiquesInDatabase:', err);
    return MATHEMATIQUES_SUBJECT_ID;
  }
}

