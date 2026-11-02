/**
 * Référentiel Pédagogique National du Sénégal (Al Muxtaar Société)
 * Conforme aux programmes officiels du Ministère de l'Éducation Nationale (MEN / IGEF / Office du Baccalauréat).
 * 
 * Niveaux : Terminale (Bac), Première, Seconde, Troisième (BFEM)
 * Séries : S2, S1, L2, L', G (STEG), Seconde S, Seconde L, 3e BFEM
 */

export type LevelCode = 'terminale' | 'premiere' | 'seconde' | 'troisieme';

export type TrackCode =
  // Terminale
  | 's2'
  | 's1'
  | 'l2'
  | 'l_prime'
  | 'g'
  // Première
  | '1s'
  | '1l'
  // Seconde
  | '2s'
  | '2l'
  // Collège
  | 'bfem';

export type SubjectStatus = 'active' | 'in_production' | 'scheduled';

export interface CurriculumChapter {
  id: number;
  slug: string;
  title: string;
  lessonsCount: number;
  isFree?: boolean;
  desc: string;
  competences: string[];
  keyFormula?: string;
  wolofInsight?: string;
}

export interface CurriculumSubject {
  code: string;
  name: string;
  shortName: string;
  iconName: string;
  coeffBac: number;
  status: SubjectStatus;
  statusLabel: string;
  progressPercent: number;
  teacherLead: string;
  description: string;
  chapters: CurriculumChapter[];
}

export interface CurriculumTrack {
  code: TrackCode;
  name: string;
  shortName: string;
  category: 'scientifique' | 'litteraire' | 'technique' | 'college';
  description: string;
  badge: string;
  subjects: CurriculumSubject[];
}

export interface CurriculumLevel {
  code: LevelCode;
  name: string;
  cycle: 'Secondaire (Lycée)' | 'Moyen (Collège)';
  examName: string;
  description: string;
  tracks: CurriculumTrack[];
}

// ─────────────────────────────────────────────────────────────────────────────
// BASE DE DONNÉES DU RÉFÉRENTIEL SÉNÉGALAIS
// ─────────────────────────────────────────────────────────────────────────────

export const SENEGAL_CURRICULUM: CurriculumLevel[] = [
  // =========================================================================
  // 1. TERMINALE (BACCALAURÉAT SÉNÉGALAIS)
  // =========================================================================
  {
    code: 'terminale',
    name: 'Terminale',
    cycle: 'Secondaire (Lycée)',
    examName: 'Baccalauréat National Sénégalais',
    description: "Préparation intensive à l'examen d'État du Baccalauréat. Cours avec rigueur, méthodes et annales.",
    tracks: [
      // ── TLE S2 (Sciences Expérimentales) ──
      {
        code: 's2',
        name: 'Série S2 — Sciences Expérimentales',
        shortName: 'Terminale S2',
        category: 'scientifique',
        badge: 'Filière Phare',
        description: 'La grande filière scientifique du Sénégal menant aux facultés de Médecine, FST, ESP, écoles d\'ingénieurs et prépas.',
        subjects: [
          {
            code: 'mathematiques',
            name: 'Mathématiques',
            shortName: 'Maths S2',
            iconName: 'maths',
            coeffBac: 6,
            status: 'active',
            statusLabel: '100% Débloqué & Interactif',
            progressPercent: 100,
            teacherLead: 'M. Makhtar Ndiaye & Équipe IGEF',
            description: '12 chapitres complets avec infographies SVG pédagogiques, simulateurs dynamiques et décryptage bilingue Français-Wolof.',
            chapters: [
              {
                id: 1,
                slug: 'limites',
                title: 'Limites et Continuité',
                lessonsCount: 4,
                isFree: true,
                desc: 'Notion de limite, théorèmes d\'encadrement (Sandarmi), continuité et formes indéterminées.',
                competences: ['Lever les 4 formes indéterminées', 'Appliquer le théorème des gendarmes', 'Démontrer la continuité'],
                keyFormula: '\\lim_{x \\to x_0} f(x) = L',
                wolofInsight: 'Limite dafa melni car rapide buy jegeñsi péage : xool bérab bi mu jëm bala mu fa agsi.',
              },
              {
                id: 2,
                slug: 'tvi',
                title: 'Théorème des Valeurs Intermédiaires (TVI) & Bijection',
                lessonsCount: 3,
                isFree: true,
                desc: 'Continuité, stricte monotonie, existence et unicité de la racine alpha, tableau de signe.',
                competences: ['Rédiger le théorème de la bijection au Bac', 'Encadrer alpha par balayage', 'Déduire le signe de f(x)'],
                keyFormula: 'f(a) \\times f(b) < 0 \\implies \\exists! \\alpha \\in ]a, b[, \\; f(\\alpha) = 0',
                wolofInsight: 'TVI dafa melni yoonu Ndar : boo jogee Dakar ba Saint-Louis, faw nga romb Thiès.',
              },
              {
                id: 3,
                slug: 'derivation',
                title: 'Dérivation et Études de Fonctions',
                lessonsCount: 5,
                isFree: true,
                desc: 'Nombre dérivé, équation de tangente, extremums, dérivabilité et branches infinies.',
                competences: ['Calculer la dérivée f\'(x)', 'Équation de tangente', 'Dresser le tableau de variations'],
                keyFormula: 'y = f\'(x_0)(x - x_0) + f(x_0)',
                wolofInsight: 'Dérivée mooy pente u toundu Mamelles : day yéeg (+), taxaw ci kocc bi (0), wàcc (-).',
              },
              {
                id: 4,
                slug: 'asymptotes',
                title: 'Branches Infinies, Asymptotes & Positions Relatives',
                lessonsCount: 4,
                isFree: true,
                desc: 'Asymptotes horizontales, verticales, obliques et branches paraboliques de directions (Ox) et (Oy).',
                competences: ['Déterminer une asymptote oblique', 'Calculer la position relative f(x) - y', 'Identifier les branches paraboliques'],
                keyFormula: '\\lim_{x \\to \\pm\\infty} [f(x) - (ax + b)] = 0',
                wolofInsight: 'Asymptote dafa melni rails u TER : da ngay wéy di jegeñoo waaye dungeen laal mukk.',
              },
              {
                id: 5,
                slug: 'suites',
                title: 'Suites Numériques & Récurrence',
                lessonsCount: 4,
                isFree: true,
                desc: 'Raisonnement par récurrence, suites arithmétiques, géométriques, convergence et théorème de la convergence monotone.',
                competences: ['Rédiger une récurrence en 3 étapes', 'Prouver la convergence d\'une suite bornée', 'Calculer la limite d\'une suite récurrente'],
                keyFormula: 'P(0) \\text{ vrai et } P(n) \\implies P(n+1) \\implies \\forall n, P(n)',
                wolofInsight: 'Récurrence dafa melni dominos : boo daanee bu jëkk bi te koo daan mu daaneel sa kanam, yépp dañuy daanu.',
              },
              {
                id: 6,
                slug: 'logarithme',
                title: 'Fonction Logarithme Népérien (ln)',
                lessonsCount: 4,
                isFree: true,
                desc: 'Définition, propriétés algébriques, limites usuelles, croissances comparées et dérivée logarithmique.',
                competences: ['Manipuler les propriétés de ln', 'Lever les formes indéterminées avec ln x / x', 'Résoudre équations et inéquations avec ln'],
                keyFormula: '\\ln(a \\times b) = \\ln a + \\ln b \\qquad \\lim_{x \\to +\\infty} \\frac{\\ln x}{x} = 0',
                wolofInsight: 'Logarithme dafa melni mbonat (tortue) : dafay yéeg ndànk lool waaye du taxaw mukk.',
              },
              {
                id: 7,
                slug: 'exponentielle',
                title: 'Fonction Exponentielle (exp)',
                lessonsCount: 4,
                isFree: true,
                desc: 'Réciproque du logarithme, dérivée (e^u)\' = u\'e^u, limites remarquables et croissances comparées.',
                competences: ['Résoudre e^x = k', 'Étudier les variations de fonctions avec exp', 'Appliquer les croissances comparées'],
                keyFormula: '(e^u)\' = u\' \\cdot e^u \\qquad \\lim_{x \\to +\\infty} \\frac{e^x}{x^n} = +\\infty',
                wolofInsight: 'Exponentielle dafa melni fusée buy yéeg ci kaw asamaan ci anam bu gaaw lool.',
              },
              {
                id: 8,
                slug: 'integration',
                title: 'Primitives et Calcul Intégral',
                lessonsCount: 5,
                isFree: true,
                desc: 'Tableau des primitives usuelles, intégration par parties, relation de Chasles et calcul d\'aires sous la courbe.',
                competences: ['Trouver une primitive F(x)', 'Intégration par parties u\'v', 'Calculer une aire en unités d\'aire'],
                keyFormula: '\\int_a^b u\'(t) v(t) dt = [u(t)v(t)]_a^b - \\int_a^b u(t) v\'(t) dt',
                wolofInsight: 'Intégrale mooy natt champ u gerte bu amul forme bu jub : da ngay daggate di boole aire yi.',
              },
              {
                id: 9,
                slug: 'equadiff',
                title: 'Équations Différentielles',
                lessonsCount: 3,
                isFree: true,
                desc: 'Équations linéaires du 1er ordre y\' + ay = b et du 2nd ordre y\'\' + w²y = 0 et ay\'\' + by\' + cy = 0.',
                competences: ['Résoudre y\' + ay = b', 'Équation caractéristique du second ordre', 'Injecter les conditions initiales'],
                keyFormula: 'y\' + ay = b \\implies y(x) = C e^{-ax} + \\frac{b}{a}',
                wolofInsight: 'Équation différentielle dafa melni yéngu-yéngu pirogue ci géej : doole yi ñoo ciy wax trajectoire bi.',
              },
              {
                id: 10,
                slug: 'complexes',
                title: 'Nombres Complexes & Géométrie',
                lessonsCount: 6,
                isFree: true,
                desc: 'Forme algébrique, trigonométrique, formule de Moivre, équations dans C, quotient d\'affixes et similitudes directes.',
                competences: ['Calculer module et argument', 'Résoudre az² + bz + c = 0 dans C', 'Déterminer la nature d\'un triangle'],
                keyFormula: 'z = r(\\cos\\theta + i\\sin\\theta) = r e^{i\\theta} \\qquad (z\') = a z + b',
                wolofInsight: 'Complexe mooy boussole gaal ci géej Dakar : module bi mooy distance bi, argument bi di cap bi.',
              },
              {
                id: 11,
                slug: 'probabilites',
                title: 'Dénombrement & Probabilités',
                lessonsCount: 4,
                isFree: true,
                desc: 'Modèles de tirages (C_n^p, A_n^p, n^p), probabilités conditionnelles, formule des probabilités totales et loi binomiale.',
                competences: ['Identifier le type de tirage', 'Appliquer le réflexe « au moins un »', 'Calculer les paramètres de la loi binomiale'],
                keyFormula: 'P(X = k) = C_n^k \\cdot p^k \\cdot (1 - p)^{n - k} \\qquad E(X) = n \\cdot p',
                wolofInsight: 'Probabilités dafa melni tànn bourses ci concours walla pénaltys ci finale football.',
              },
              {
                id: 12,
                slug: 'statistiques',
                title: 'Séries Statistiques Doubles',
                lessonsCount: 3,
                isFree: true,
                desc: 'Nuage de points, point moyen G, covariance de Koenig, droites de régression (D) et (D\'), coefficient de corrélation r.',
                competences: ['Calculer Cov(X, Y) et V(X)', 'Équation de régression y = ax + b', 'Interpréter la corrélation |r| ≥ 0,87'],
                keyFormula: 'a = \\frac{Cov(X, Y)}{V(X)}, \\; b = \\bar{y} - a\\bar{x} \\qquad r = \\frac{Cov(X, Y)}{\\sigma_X \\sigma_Y}',
                wolofInsight: 'Statistiques doubles mooy xool li ngay jaay ci marcha Sandaga ak jur gi ngay am.',
              },
              {
                id: 13,
                slug: 'geometrie',
                title: 'Géométrie dans l\'Espace',
                lessonsCount: 4,
                isFree: true,
                desc: 'Produit scalaire, vecteur normal, équation cartésienne de plan, distance d(M, P), sphère et produit vectoriel.',
                competences: ['Trouver l\'équation d\'un plan', 'Calculer la distance point-plan', 'Étudier la section plan-sphère'],
                keyFormula: 'd(A, P) = \\frac{|ax_A + by_A + cz_A + d|}{\\sqrt{a^2 + b^2 + c^2}} \\qquad r = \\sqrt{R^2 - d^2}',
                wolofInsight: 'Géométrie 3D dafa melni tabaxu minaret Lamp Fall ci kaw esplanade Jumaa Touba.',
              },
            ],
          },
          {
            code: 'physique-chimie',
            name: 'Sciences Physiques (PC)',
            shortName: 'Physique-Chimie S2',
            iconName: 'physique',
            coeffBac: 6,
            status: 'in_production',
            statusLabel: 'En Rédaction Avancée (85%)',
            progressPercent: 85,
            teacherLead: 'M. Ibrahima Sall (Lycée Lamine Guèye)',
            description: 'Mécanique newtonienne, oscillations, optique, chimie organique, acides-bases et cinétique chimique.',
            chapters: [
              { id: 1, slug: 'cinetique', title: 'Cinétique Chimique & Vitesse de Réaction', lessonsCount: 3, desc: 'Facteurs cinétiques, catalyse et dosage spectrophotométrique.', competences: ['Calculer la vitesse volumique de réaction', 'Déterminer le temps de demi-réaction t1/2'] },
              { id: 2, slug: 'acides-bases', title: 'Solutions Aqueuses : Acides, Bases & pH-métrie', lessonsCount: 4, desc: 'Constante d\'acidité Ka, produit ionique de l\'eau, dosage pH-métrique et solutions tampons.', competences: ['Calculer le pH d\'une solution', 'Déterminer le point d\'équivalence'] },
              { id: 3, slug: 'chimie-organique', title: 'Chimie Organique : Estérification & Dérivés', lessonsCount: 4, desc: 'Alcools, acides carboxyliques, esters, saponification et polymérisation.', competences: ['Nommer les molécules organiques', 'Calculer le rendement d\'estérification'] },
              { id: 4, slug: 'cinematique-newton', title: 'Cinématique & Lois de Newton', lessonsCount: 4, desc: 'Vecteurs vitesse et accélération, repère de Frenet, principe fondamental de la dynamique.', competences: ['Appliquer la 2e loi de Newton', 'Établir les équations horaires'] },
              { id: 5, slug: 'projectiles-champs', title: 'Mouvement dans les Champs de Pesanteur et Électrostatique', lessonsCount: 4, desc: 'Trajectoire parabolique d\'un projectile, déviation électrostatique et énergie mécanique.', competences: ['Calculer la portée et la flèche', 'Déflexion dans un condensateur'] },
              { id: 6, slug: 'circuits-rlc', title: 'Oscillations Électriques Libres et Forcées (RLC)', lessonsCount: 5, desc: 'Bobine d\'inductance, condensateur, équation différentielle d\'un circuit RLC et résonance.', competences: ['Établir l\'équation différentielle RLC', 'Calculer la pulsation propre'] },
              { id: 7, slug: 'ondes-lumieres', title: 'Interférences Lumineuses & Dualité Onde-Corpuscule', lessonsCount: 4, desc: 'Fentes d\'Young, interfrange, effet photoélectrique et photons d\'Einstein.', competences: ['Calculer l\'interfrange i = lambda D / a', 'Énergie du photon E = h nu'] },
              { id: 8, slug: 'nucleaire', title: 'Physique Nucléaire & Réactions d\'Énergie', lessonsCount: 3, desc: 'Radioactivité alpha, bêta, gamma, loi de décroissance radioactive et défaut de masse.', competences: ['Écrire une équation nucléaire', 'Calculer l\'énergie libérée delta E = delta m c²'] },
            ],
          },
          {
            code: 'svt',
            name: 'Sciences de la Vie et de la Terre (SVT)',
            shortName: 'SVT S2',
            iconName: 'svt',
            coeffBac: 6,
            status: 'in_production',
            statusLabel: 'En Rédaction Avancée (80%)',
            progressPercent: 80,
            teacherLead: 'Dr. Aminata Touré (FASTEF / UCAD)',
            description: 'Génétique formelle et humaine, immunologie, régulation de la glycémie, physiologie nerveuse et géologie.',
            chapters: [
              { id: 1, slug: 'genetique-diploide', title: 'Brassages Génétiques & Diversité des Génomes', lessonsCount: 4, desc: 'Méiose, crossing-over, brassage inter et intra-chromosomique, mono et dihybridisme.', competences: ['Interpréter des croisements F1 et F2', 'Établir une carte factorielle'] },
              { id: 2, slug: 'immunologie', title: 'Immunologie : Le Système Immunitaire et ses Réponses', lessonsCount: 5, desc: 'Immunité innée et adaptative, anticorps, lymphocytes B et T, vaccins et VIH/SIDA.', competences: ['Expliquer la réaction immunitaire humorale et cellulaire', 'Mécanisme d\'action du VIH'] },
              { id: 3, slug: 'systeme-nerveux', title: 'Communication Nerveuse & Réflexe Myotatique', lessonsCount: 4, desc: 'Potentiel de repos, potentiel d\'action, transmission synaptique et codage de l\'influx.', competences: ['Analyser un tracé d\'oscilloscope', 'Schématiser l\'arc réflexe'] },
              { id: 4, slug: 'glycemie', title: 'Régulation de la Glycémie & Diabète', lessonsCount: 3, desc: 'Homéostasie glycémique, îlots de Langerhans, insuline et glucagon.', competences: ['Schématiser la boucle de rétroaction', 'Distinguer diabète de type 1 et 2'] },
              { id: 5, slug: 'reproduction-humaine', title: 'Physiologie de la Reproduction chez l\'Être Humain', lessonsCount: 4, desc: 'Gametogenèse, cycles ovarien et utérin, régulation neurohormonale (LH, FSH).', competences: ['Analyser les courbes hormonales', 'Mécanisme du rétrocontrôle'] },
            ],
          },
          {
            code: 'philosophie',
            name: 'Philosophie',
            shortName: 'Philo',
            iconName: 'orientation',
            coeffBac: 2,
            status: 'in_production',
            statusLabel: 'Syllabus Prêt (75%)',
            progressPercent: 75,
            teacherLead: 'Pr. Ousmane Diop (Lycée Delafosse)',
            description: 'Dissertation philosophique, commentaire de texte, grands courants de la pensée africaine et universelle.',
            chapters: [
              { id: 1, slug: 'methode-dissertation', title: 'Méthodologie Complète de la Dissertation Philosophique', lessonsCount: 3, desc: 'Problématisation, plan dialectique, analyse conceptuelle et argumentation.', competences: ['Dégager le problème philosophique', 'Construire une antithèse solide'] },
              { id: 2, slug: 'epistemologie-science', title: 'La Science, la Vérité & le Déterminisme', lessonsCount: 4, desc: 'Méthode expérimentale, limites de la science, induction et déduction.', competences: ['Distinguer certitude et vérité', 'Critique du scientisme'] },
              { id: 3, slug: 'art-societe', title: 'L\'Art, la Liberté & la Pensée Africaine', lessonsCount: 3, desc: 'Esthétique, engagement littéraire, pensée critique et valeurs de civilisation.', competences: ['Comprendre la portée philosophique de l\'art'] },
            ],
          },
          {
            code: 'francais',
            name: 'Français & Littérature',
            shortName: 'Français',
            iconName: 'cours',
            coeffBac: 3,
            status: 'scheduled',
            statusLabel: 'Planifié T3 2026',
            progressPercent: 40,
            teacherLead: 'Mme Fatou Bintou Sow',
            description: 'Dissertation littéraire, commentaire composé et résumé de texte sur le corpus sénégalais et francophone.',
            chapters: [
              { id: 1, slug: 'roman-africain', title: 'Le Roman Négro-Africain et les Réalités Sociales', lessonsCount: 4, desc: 'Étude d\'œuvres au programme (Sembène Ousmane, Cheikh Hamidou Kane, Mariama Bâ).', competences: ['Commentaire composé', 'Dissertation littéraire'] },
              { id: 2, slug: 'poesie-engagement', title: 'La Poésie et le Chant de l\'Identité', lessonsCount: 3, desc: 'Léopold Sédar Senghor, David Diop et le mouvement de la Négritude.', competences: ['Analyser les figures de style', 'Commenter un poème engagé'] },
            ],
          },
          {
            code: 'histoire-geo',
            name: 'Histoire & Géographie',
            shortName: 'Histoire-Géo',
            iconName: 'orientation',
            coeffBac: 2,
            status: 'scheduled',
            statusLabel: 'Planifié T3 2026',
            progressPercent: 35,
            teacherLead: 'M. Babacar Seck',
            description: 'Décolonisation, relations internationales, dynamique démographique et développement du Sénégal.',
            chapters: [
              { id: 1, slug: 'guerre-froide', title: 'Les Relations Internationales de 1945 à nos jours', lessonsCount: 4, desc: 'Guerre froide, multipolarité, ONU et crises géopolitiques majeures.', competences: ['Commentaire de document historique', 'Dissertation historique'] },
              { id: 2, slug: 'senegal-emergence', title: 'L\'Économie et la Géographie du Sénégal', lessonsCount: 4, desc: 'Démographie, urbanisation, agriculture, ressources pétro-gazières et intégration CEDEAO.', competences: ['Analyser une carte thématique', 'Maîtriser les enjeux de l\'émergence'] },
            ],
          },
        ],
      },

      // ── TLE S1 (Sciences Exactes) ──
      {
        code: 's1',
        name: 'Série S1 — Sciences Exactes & Mathématiques',
        shortName: 'Terminale S1',
        category: 'scientifique',
        badge: 'Excellence & Concours',
        description: 'Pour les futurs lauréats du Concours Général, polytechniciens et ingénieurs de pointe.',
        subjects: [
          {
            code: 'mathematiques',
            name: 'Mathématiques Approfondies (S1)',
            shortName: 'Maths S1',
            iconName: 'maths',
            coeffBac: 8,
            status: 'in_production',
            statusLabel: 'En Rédaction (70%)',
            progressPercent: 70,
            teacherLead: 'Équipe Concours Général Sénégal',
            description: 'Arithmétique (Bézout, Gauss, congruences), structures algébriques, coniques, équations différentielles avancées.',
            chapters: [
              { id: 1, slug: 'arithmetique', title: 'Arithmétique dans Z : Division Euclidienne, Bézout & Nombres Premiers', lessonsCount: 5, desc: 'Congruences, algorithme d\'Euclide étendu, petit théorème de Fermat.', competences: ['Résoudre ax + by = c dans Z²', 'Manipuler les congruences modulo n'] },
              { id: 2, slug: 'structures-algebriques', title: 'Structures Algébriques & Espaces Vectoriels', lessonsCount: 4, desc: 'Groupes, anneaux, corps et espaces vectoriels de dimension finie.', competences: ['Démontrer qu\'une famille est libre/génératrice'] },
              { id: 3, slug: 'coniques', title: 'Étude Géométrique et Analytique des Coniques', lessonsCount: 4, desc: 'Ellipse, parabole, hyperbole, foyer, directrice et excentricité.', competences: ['Reconnaître une conique par son équation cartésienne'] },
            ],
          },
          {
            code: 'physique-chimie',
            name: 'Sciences Physiques S1',
            shortName: 'PC S1',
            iconName: 'physique',
            coeffBac: 7,
            status: 'in_production',
            statusLabel: 'En Rédaction (65%)',
            progressPercent: 65,
            teacherLead: 'M. Ibrahima Sall',
            description: 'Électromagnétisme, induction de Faraday, thermodynamique et mécanique du solide.',
            chapters: [
              { id: 1, slug: 'induction', title: 'Induction Électromagnétique & Auto-induction', lessonsCount: 4, desc: 'Loi de Lenz, flux magnétique et fem induite.', competences: ['Calculer la force électromotrice induite e = -dPhi/dt'] },
            ],
          },
        ],
      },

      // ── TLE L2 (Littéraire & Sciences Humaines) ──
      {
        code: 'l2',
        name: 'Série L2 — Langues & Sciences Humaines',
        shortName: 'Terminale L2',
        category: 'litteraire',
        badge: 'Filière Littéraire',
        description: 'La référence des juristes, diplomates, journalistes, enseignants et cadres des sciences humaines.',
        subjects: [
          {
            code: 'philosophie',
            name: 'Philosophie Littéraire',
            shortName: 'Philo L2',
            iconName: 'orientation',
            coeffBac: 5,
            status: 'in_production',
            statusLabel: 'En Rédaction (75%)',
            progressPercent: 75,
            teacherLead: 'Pr. Ousmane Diop',
            description: 'Les notions majeures : la conscience, l\'inconscient, l\'État, le droit, la religion, l\'art et le travail.',
            chapters: [
              { id: 1, slug: 'etat-pouvoir', title: 'L\'État, le Pouvoir & la Justice', lessonsCount: 4, desc: 'Machiavel, Rousseau, Hobbes et les traditions politiques africaines.', competences: ['Dissertation sur la légitimité du pouvoir'] },
              { id: 2, slug: 'inconscient', title: 'La Conscience, l\'Inconscient & la Personnalité', lessonsCount: 4, desc: 'Freud, la psychanalyse et la critique sartrienne de la mauvaise foi.', competences: ['Commentaire philosophique de texte'] },
            ],
          },
          {
            code: 'francais',
            name: 'Littérature & Français L2',
            shortName: 'Français L2',
            iconName: 'cours',
            coeffBac: 5,
            status: 'in_production',
            statusLabel: 'En Rédaction (60%)',
            progressPercent: 60,
            teacherLead: 'Mme Fatou Bintou Sow',
            description: 'Grands mouvements littéraires français et africains, analyse de style et critique littéraire.',
            chapters: [
              { id: 1, slug: 'classicisme-lumieres', title: 'Le Classicisme et les Siècles des Lumières', lessonsCount: 4, desc: 'Molière, Voltaire, Rousseau et l\'émancipation de l\'esprit critique.', competences: ['Commentaire composé littéraire'] },
            ],
          },
          {
            code: 'histoire-geo',
            name: 'Histoire & Géographie L2',
            shortName: 'HG L2',
            iconName: 'orientation',
            coeffBac: 4,
            status: 'scheduled',
            statusLabel: 'Planifié',
            progressPercent: 30,
            teacherLead: 'M. Babacar Seck',
            description: 'Histoire africaine, panafricanisme, géopolitique du Sahel et puissances émergentes.',
            chapters: [
              { id: 1, slug: 'panafricanisme', title: 'Le Panafricanisme & les Indépendances Africaines', lessonsCount: 4, desc: 'Cheikh Anta Diop, Kwamé Nkrumah et les défis de l\'unité africaine.', competences: ['Dissertation historique'] },
            ],
          },
          {
            code: 'mathematiques',
            name: 'Mathématiques Littéraires',
            shortName: 'Maths L',
            iconName: 'maths',
            coeffBac: 2,
            status: 'in_production',
            statusLabel: 'En Rédaction (65%)',
            progressPercent: 65,
            teacherLead: 'M. Makhtar Ndiaye',
            description: 'Statistiques descriptives, pourcentages, suites numériques et probabilités simples adaptées à la série L.',
            chapters: [
              { id: 1, slug: 'statistiques-l', title: 'Statistiques à une Variable & Indices', lessonsCount: 3, desc: 'Moyenne, médiane, quartiles, diagramme en boîte et indices de prix.', competences: ['Calculer la médiane et l\'écart interquartile'] },
              { id: 2, slug: 'suites-l', title: 'Suites Arithmétiques & Évolutions Financières', lessonsCount: 3, desc: 'Modélisation des taux d\'intérêt et progressions régulières.', competences: ['Formule de terme général Un'] },
            ],
          },
        ],
      },

      // ── TLE G (STEG — Économie & Gestion) ──
      {
        code: 'g',
        name: 'Série G (STEG) — Économie & Gestion',
        shortName: 'Terminale G',
        category: 'technique',
        badge: 'Filière Éco & Gestion',
        description: 'Préparation aux carrières bancaires, comptables, financières et aux écoles de commerce.',
        subjects: [
          {
            code: 'comptabilite',
            name: 'Comptabilité Générale & Gestion',
            shortName: 'Compta G',
            iconName: 'certificat',
            coeffBac: 6,
            status: 'scheduled',
            statusLabel: 'Planifié T4 2026',
            progressPercent: 25,
            teacherLead: 'M. Alioune Badara Diouf (Expert-Comptable)',
            description: 'Plan comptable OHADA révisé, bilan, compte de résultat et écritures d\'inventaire.',
            chapters: [
              { id: 1, slug: 'systeme-ohada', title: 'Le Système Comptable OHADA & le Bilan', lessonsCount: 4, desc: 'Principes comptables, journalisation et grand livre.', competences: ['Établir un bilan comptable'] },
            ],
          },
          {
            code: 'mathematiques-financieres',
            name: 'Mathématiques Financières & Statistiques',
            shortName: 'Maths G',
            iconName: 'maths',
            coeffBac: 4,
            status: 'scheduled',
            statusLabel: 'Planifié T4 2026',
            progressPercent: 30,
            teacherLead: 'M. Makhtar Ndiaye',
            description: 'Intérêts simples et composés, amortissement des emprunts, annuités et rentabilité des investissements.',
            chapters: [
              { id: 1, slug: 'interets-composes', title: 'Intérêts Composés & Actualisation', lessonsCount: 3, desc: 'Formule de capitalisation et valeur actuelle d\'un capital.', competences: ['Calculer la valeur acquise Cn = C0 (1+i)^n'] },
            ],
          },
        ],
      },
    ],
  },

  // =========================================================================
  // 2. PREMIÈRE (ANTICIPATION DU BACCALAURÉAT)
  // =========================================================================
  {
    code: 'premiere',
    name: 'Première',
    cycle: 'Secondaire (Lycée)',
    examName: 'Épreuves Anticipées du Baccalauréat',
    description: 'Année charnière où s\'acquièrent les bases fondamentales des fonctions, de la mécanique et de la littérature.',
    tracks: [
      {
        code: '1s',
        name: 'Première S — Scientifique',
        shortName: '1ère S',
        category: 'scientifique',
        badge: 'Socle Scientifique',
        description: 'Tronc commun S1/S2 : polynômes, trigonométrie, barycentre, produit scalaire et dérivation.',
        subjects: [
          {
            code: 'mathematiques',
            name: 'Mathématiques 1ère S',
            shortName: 'Maths 1ère S',
            iconName: 'maths',
            coeffBac: 6,
            status: 'in_production',
            statusLabel: 'En Rédaction (70%)',
            progressPercent: 70,
            teacherLead: 'M. Makhtar Ndiaye',
            description: 'Polynômes du second degré, dérivation, barycentre, trigonométrie et produit scalaire.',
            chapters: [
              { id: 1, slug: 'polynomes-second-degre', title: 'Polynômes & Trinôme du Second Degré', lessonsCount: 4, desc: 'Discriminant delta, forme canonique, factorisation et signe du trinôme.', competences: ['Résoudre ax² + bx + c = 0', 'Tableau de signe d\'un trinôme'] },
              { id: 2, slug: 'barycentre', title: 'Barycentre dans le Plan & dans l\'Espace', lessonsCount: 4, desc: 'Barycentre de 2, 3 et n points pondérés, associativité et lignes de niveau.', competences: ['Construire un barycentre', 'Trouver des ensembles de points'] },
              { id: 3, slug: 'trigonometrie-1ere', title: 'Trigonométrie & Formules d\'Addition', lessonsCount: 4, desc: 'Cercle trigonométrique, formules de duplication et équations sin x = a, cos x = b.', competences: ['Appliquer cos(a+b) et sin(a+b)', 'Résoudre sur ]-pi, pi]'] },
              { id: 4, slug: 'initiation-derivation', title: 'Nombre Dérivé & Première Approche des Variations', lessonsCount: 4, desc: 'Taux d\'accroissement, tangente et formules usuelles de dérivation.', competences: ['Calculer un nombre dérivé', 'Déterminer l\'équation de tangente'] },
            ],
          },
          {
            code: 'physique-chimie',
            name: 'Sciences Physiques 1ère S',
            shortName: 'PC 1ère S',
            iconName: 'physique',
            coeffBac: 6,
            status: 'in_production',
            statusLabel: 'En Rédaction (60%)',
            progressPercent: 60,
            teacherLead: 'M. Ibrahima Sall',
            description: 'Travail et puissance d\'une force, énergie cinétique, calorimétrie et oxydoréduction.',
            chapters: [
              { id: 1, slug: 'travail-energie', title: 'Travail Mécanique & Théorème de l\'Énergie Cinétique', lessonsCount: 4, desc: 'Forces conservatives, poids, frottements et théorème TEC.', competences: ['Appliquer Delta Ec = Somme des travaux W(F)'] },
              { id: 2, slug: 'oxydoreduction', title: 'Réactions d\'Oxydoréduction & Électrochimie', lessonsCount: 3, desc: 'Couples redox, nombre d\'oxydation et équilibrage en milieu acide.', competences: ['Écrire les demi-équations électroniques'] },
            ],
          },
          {
            code: 'francais',
            name: 'Français (Épreuve Anticipée du Bac)',
            shortName: 'Français Anticipé',
            iconName: 'cours',
            coeffBac: 3,
            status: 'in_production',
            statusLabel: 'En Rédaction (70%)',
            progressPercent: 70,
            teacherLead: 'Mme Fatou Bintou Sow',
            description: 'Préparation spécifique à l\'épreuve anticipée de Français de fin de Première S.',
            chapters: [
              { id: 1, slug: 'resume-texte', title: 'Technique du Résumé de Texte', lessonsCount: 3, desc: 'Sélection des idées maîtresses, respect du quota de mots et reformulation sans copier.', competences: ['Rédiger un résumé conforme au barème'] },
              { id: 2, slug: 'dissertation-1ere', title: 'La Dissertation sur Corpus Littéraire', lessonsCount: 4, desc: 'Thèmes de la poésie, du théâtre et du roman dans le contexte africain.', competences: ['Bâtir une introduction en 3 temps', 'Illustrer avec des citations'] },
            ],
          },
        ],
      },
      {
        code: '1l',
        name: 'Première L — Littéraire',
        shortName: '1ère L',
        category: 'litteraire',
        badge: 'Filière Lettres',
        description: 'Préparation intensive à l\'épreuve anticipée de Français (coeff 5 pour les L) et histoire culturelle.',
        subjects: [
          {
            code: 'francais',
            name: 'Français Littéraire Approfondi',
            shortName: 'Français 1ère L',
            iconName: 'cours',
            coeffBac: 5,
            status: 'in_production',
            statusLabel: 'En Rédaction (65%)',
            progressPercent: 65,
            teacherLead: 'Mme Fatou Bintou Sow',
            description: 'Analyse stylistique poussée, mouvements littéraires, roman et dramaturgie.',
            chapters: [
              { id: 1, slug: 'theatre-tragique', title: 'Le Théâtre : Tragédie Classique & Théâtre Négro-Africain', lessonsCount: 4, desc: 'Racine, Corneille, Aimé Césaire (La Tragédie du Roi Christophe).', competences: ['Commentaire composé d\'une scène de théâtre'] },
            ],
          },
        ],
      },
    ],
  },

  // =========================================================================
  // 3. SECONDE (ENTRÉE AU LYCÉE & ORIENTATION)
  // =========================================================================
  {
    code: 'seconde',
    name: 'Seconde',
    cycle: 'Secondaire (Lycée)',
    examName: 'Orientation de fin de Seconde (S ou L)',
    description: 'Transition décisive du collège vers le lycée pour réussir son orientation en filière S ou L.',
    tracks: [
      {
        code: '2s',
        name: 'Seconde S — Scientifique',
        shortName: '2nde S',
        category: 'scientifique',
        badge: 'Tronc Scientifique',
        description: 'Acquisition des automatismes rigoureux : calcul algébrique, vecteurs, géométrie plane, chimie minérale.',
        subjects: [
          {
            code: 'mathematiques',
            name: 'Mathématiques 2nde S',
            shortName: 'Maths 2nde S',
            iconName: 'maths',
            coeffBac: 5,
            status: 'in_production',
            statusLabel: 'En Rédaction (65%)',
            progressPercent: 65,
            teacherLead: 'M. Makhtar Ndiaye',
            description: 'Ensembles de nombres, calcul vectoriel, droites dans le plan, fonctions de référence et trigonométrie de base.',
            chapters: [
              { id: 1, slug: 'ensembles-calculs', title: 'Ensembles de Nombres, Intervalles & Valeur Absolue', lessonsCount: 4, desc: 'N, Z, D, Q, R, résolution d\'équations avec valeur absolue |x - a| < r.', competences: ['Traduire une distance en valeur absolue', 'Intersections et réunions d\'intervalles'] },
              { id: 2, slug: 'vecteurs-geometrie', title: 'Calcul Vectoriel & Repérage Cartésien', lessonsCount: 4, desc: 'Colinérarité, décomposition sur une base, coordonnées de vecteurs et déterminant.', competences: ['Prouver le parallélisme et l\'alignement', 'Calculer le déterminant dét(u, v) = 0'] },
              { id: 3, slug: 'fonctions-reference', title: 'Généralités sur les Fonctions & Fonctions Usuelles', lessonsCount: 4, desc: 'Parité, monotonie, fonction carré, inverse et valeur absolue.', competences: ['Déterminer l\'ensemble de définition', 'Dresser le tableau de variations'] },
            ],
          },
          {
            code: 'physique-chimie',
            name: 'Sciences Physiques 2nde S',
            shortName: 'PC 2nde S',
            iconName: 'physique',
            coeffBac: 4,
            status: 'scheduled',
            statusLabel: 'Planifié',
            progressPercent: 35,
            teacherLead: 'M. Ibrahima Sall',
            description: 'Atome, classification périodique, mole, concentrations, optique géométrique et forces usuelles.',
            chapters: [
              { id: 1, slug: 'atome-mole', title: 'Structure de l\'Atome & Quantité de Matière (La Mole)', lessonsCount: 3, desc: 'Nombre d\'Avogadro, masse molaire, concentration molaire C = n / V.', competences: ['Calculer une quantité de matière n = m / M'] },
            ],
          },
        ],
      },
      {
        code: '2l',
        name: 'Seconde L — Littéraire',
        shortName: '2nde L',
        category: 'litteraire',
        badge: 'Tronc Littéraire',
        description: 'Renforcement du vocabulaire, des méthodes d\'analyse de texte et des langues vivantes.',
        subjects: [
          {
            code: 'francais',
            name: 'Français 2nde L',
            shortName: 'Français 2nde',
            iconName: 'cours',
            coeffBac: 4,
            status: 'scheduled',
            statusLabel: 'Planifié',
            progressPercent: 30,
            teacherLead: 'Mme Fatou Bintou Sow',
            description: 'Genres littéraires, versification, rhétorique et rédaction de textes argumentatifs.',
            chapters: [
              { id: 1, slug: 'genres-litteraires', title: 'Les Grands Genres Littéraires et Registres de Langue', lessonsCount: 3, desc: 'Roman, théâtre, poésie, registres comique, tragique, lyrique et pathétique.', competences: ['Identifier la visée d\'un texte'] },
            ],
          },
        ],
      },
    ],
  },

  // =========================================================================
  // 4. TROISIÈME (PRÉPARATION AU BFEM)
  // =========================================================================
  {
    code: 'troisieme',
    name: 'Troisième (BFEM)',
    cycle: 'Moyen (Collège)',
    examName: 'Brevet de Fin d\'Études Moyennes (BFEM)',
    description: 'Le premier grand diplôme de l\'élève sénégalais. Clé de passage officielle vers le Lycée.',
    tracks: [
      {
        code: 'bfem',
        name: 'Cycle Moyen Général (Classe de 3e)',
        shortName: '3e BFEM',
        category: 'college',
        badge: 'Examen BFEM',
        description: 'Programme officiel de 3e du Sénégal : théorème de Thalès, Pythagore, factorisation, géométrie et physique.',
        subjects: [
          {
            code: 'mathematiques',
            name: 'Mathématiques BFEM',
            shortName: 'Maths 3e',
            iconName: 'maths',
            coeffBac: 4,
            status: 'in_production',
            statusLabel: 'En Rédaction (70%)',
            progressPercent: 70,
            teacherLead: 'M. Babacar Diagne (CEM Dakar)',
            description: 'Thalès, Pythagore, trigonométrie dans le triangle rectangle, systèmes de 2 équations et statistiques BFEM.',
            chapters: [
              { id: 1, slug: 'thales-pythagore', title: 'Théorèmes de Pythagore & Thalès (Directs et Réciproques)', lessonsCount: 4, desc: 'Calcul de longueurs, preuve de parallélisme et d\'orthogonalité.', competences: ['Rédiger le théorème de Thalès au BFEM', 'Réciproque de Pythagore'] },
              { id: 2, slug: 'calcul-litteral-racines', title: 'Calcul Littéral, Identités Remarquables & Racines Carrées', lessonsCount: 4, desc: 'Développement, factorisation poussée et simplification des radicaux.', competences: ['Factoriser par le facteur commun', 'Simplifier les racines carrées'] },
              { id: 3, slug: 'systemes-equations', title: 'Systèmes de 2 Équations à 2 Inconnues & Problèmes', lessonsCount: 3, desc: 'Méthodes de combinaison, substitution et mise en équation de problèmes du quotidien.', competences: ['Résoudre un système 2x2', 'Choisir les inconnues dans un énoncé'] },
              { id: 4, slug: 'trigonometrie-3e', title: 'Trigonométrie dans le Triangle Rectangle', lessonsCount: 3, desc: 'Cos, Sin, Tan, relations cos² + sin² = 1 et calcul d\'angles.', competences: ['Calculer une longueur avec la trigonométrie'] },
            ],
          },
          {
            code: 'sciences-physiques',
            name: 'Sciences Physiques BFEM',
            shortName: 'PC 3e',
            iconName: 'physique',
            coeffBac: 3,
            status: 'scheduled',
            statusLabel: 'Planifié T4 2026',
            progressPercent: 30,
            teacherLead: 'Mme Aïda Ndao',
            description: 'Poids et masse, masse volumique, courant électrique, combustion et chimie des solutions.',
            chapters: [
              { id: 1, slug: 'poids-masse', title: 'Poids, Masse & Équilibre d\'un Solide', lessonsCount: 3, desc: 'P = m x g, dynamomètre et balance.', competences: ['Distinguer le poids (N) et la masse (kg)'] },
            ],
          },
        ],
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// FONCTIONS UTILITAIRES DE RECHERCHE DANS LE RÉFÉRENTIEL
// ─────────────────────────────────────────────────────────────────────────────

export function getLevelByCode(code: string): CurriculumLevel | undefined {
  return SENEGAL_CURRICULUM.find((lvl) => lvl.code.toLowerCase() === code.toLowerCase());
}

export function getTrackByCode(levelCode: string, trackCode: string): CurriculumTrack | undefined {
  const level = getLevelByCode(levelCode);
  if (!level) return undefined;
  return level.tracks.find(
    (trk) => trk.code.toLowerCase() === trackCode.toLowerCase()
  );
}

export function getSubjectByCode(
  levelCode: string,
  trackCode: string,
  subjectCode: string
): { level: CurriculumLevel; track: CurriculumTrack; subject: CurriculumSubject } | undefined {
  const level = getLevelByCode(levelCode);
  if (!level) return undefined;
  const track = level.tracks.find(
    (trk) => trk.code.toLowerCase() === trackCode.toLowerCase()
  );
  if (!track) return undefined;
  const subject = track.subjects.find(
    (sub) => sub.code.toLowerCase() === subjectCode.toLowerCase()
  );
  if (!subject) return undefined;
  return { level, track, subject };
}

/**
 * Statistiques globales du référentiel pédagogique
 */
export function getCurriculumStats() {
  let totalLevels = SENEGAL_CURRICULUM.length;
  let totalTracks = 0;
  let totalSubjects = 0;
  let totalChapters = 0;
  let activeChapters = 0;

  for (const lvl of SENEGAL_CURRICULUM) {
    totalTracks += lvl.tracks.length;
    for (const trk of lvl.tracks) {
      totalSubjects += trk.subjects.length;
      for (const sub of trk.subjects) {
        totalChapters += sub.chapters.length;
        if (sub.status === 'active') {
          activeChapters += sub.chapters.length;
        }
      }
    }
  }

  return {
    totalLevels,
    totalTracks,
    totalSubjects,
    totalChapters,
    activeChapters,
  };
}

/**
 * Normalise les champs niveau et filière du profil élève vers les codes officiels du référentiel
 */
export function normalizeStudentCurriculum(
  profileLevel?: string | null,
  profileTrack?: string | null
): { levelCode: LevelCode; trackCode: TrackCode } {
  let levelCode: LevelCode = 'terminale';
  const rawLevel = (profileLevel || '').toLowerCase().trim();
  if (rawLevel.includes('prem') || rawLevel.includes('1')) levelCode = 'premiere';
  else if (rawLevel.includes('sec') || rawLevel.includes('2')) levelCode = 'seconde';
  else if (rawLevel.includes('trois') || rawLevel.includes('3') || rawLevel.includes('bfem')) levelCode = 'troisieme';
  else levelCode = 'terminale';

  let trackCode: TrackCode = 's2';
  const rawTrack = (profileTrack || '').toLowerCase().trim();
  if (levelCode === 'troisieme') {
    trackCode = 'bfem';
  } else if (levelCode === 'seconde') {
    trackCode = rawTrack.includes('l') ? '2l' : '2s';
  } else if (levelCode === 'premiere') {
    trackCode = rawTrack.includes('l') ? '1l' : '1s';
  } else {
    // Terminale
    if (rawTrack.includes('s1')) trackCode = 's1';
    else if (rawTrack.includes('l_prime') || rawTrack.includes("l'") || rawTrack.includes('l1')) trackCode = 'l_prime';
    else if (rawTrack.includes('l2') || rawTrack.includes('l')) trackCode = 'l2';
    else if (rawTrack.includes('g') || rawTrack.includes('steg')) trackCode = 'g';
    else trackCode = 's2';
  }

  return { levelCode, trackCode };
}

