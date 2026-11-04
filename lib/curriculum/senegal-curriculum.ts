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
  domain?: string;
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
            statusLabel: 'Programme disponible',
            progressPercent: 100,
            teacherLead: 'M. Makhtar Ndiaye & Équipe IGEF',
            description: '12 chapitres officiels articulés en 3 grands domaines : Analyse, Algèbre & Géométrie, Probabilités & Dénombrement.',
            chapters: [
              // ── 1. ANALYSE (7 Chapitres) ──
              {
                id: 1,
                slug: 'limites-continuite',
                title: 'Limites et Continuité',
                domain: 'Analyse',
                lessonsCount: 2,
                isFree: true,
                desc: 'Opérations sur les limites, asymptotes, continuité sur un intervalle, théorème des valeurs intermédiaires (TVI).',
                competences: ['Opérations sur les limites et formes indéterminées', 'Asymptotes horizontales et verticales', 'Continuité et théorème des valeurs intermédiaires (TVI)'],
                keyFormula: '\\lim_{x \\to x_0} f(x) = L \\qquad f(a) \\times f(b) < 0 \\implies \\exists! \\alpha \\in ]a, b[, \\; f(\\alpha) = 0',
                wolofInsight: 'Limite dafa melni car rapide buy jegeñsi péage. TVI mooy yoonu Ndar : boo jogee Dakar ba Saint-Louis, faw nga romb Thiès.',
              },
              {
                id: 2,
                slug: 'derivabilite-fonctions',
                title: 'Dérivabilité et Étude de Fonctions',
                domain: 'Analyse',
                lessonsCount: 2,
                isFree: false,
                desc: 'Nombre dérivé, sens de variation, branches infinies (asymptotes obliques, branches paraboliques), tracé de courbes.',
                competences: ['Calcul du nombre dérivé et f\'(x)', 'Équation de tangente et extremums', 'Branches infinies et tracé de la courbe'],
                keyFormula: 'y = f\'(x_0)(x - x_0) + f(x_0) \\qquad \\lim_{x \\to \\pm\\infty} [f(x) - (ax + b)] = 0',
                wolofInsight: 'Dérivée mooy pente u toundu Mamelles : day yéeg (+), taxaw ci kocc bi (0), wàcc (-). Asymptote mooy rails u TER.',
              },
              {
                id: 3,
                slug: 'logarithme',
                title: 'Fonction Logarithme Népérien (ln)',
                domain: 'Analyse',
                lessonsCount: 1,
                isFree: false,
                desc: 'Définition, propriétés algébriques, limites et étude de fonctions avec ln.',
                competences: ['Propriétés algébriques de ln(x)', 'Croissances comparées lim ln x / x', 'Résolution d\'équations et étude de fonction'],
                keyFormula: '\\ln(ab) = \\ln a + \\ln b \\qquad \\lim_{x \\to +\\infty} \\frac{\\ln x}{x} = 0',
                wolofInsight: 'Logarithme dafa melni mbonat (tortue) : dafay yéeg ndànk lool waaye du taxaw mukk.',
              },
              {
                id: 4,
                slug: 'exponentielle',
                title: 'Fonctions Exponentielles',
                domain: 'Analyse',
                lessonsCount: 1,
                isFree: false,
                desc: 'Exponentielle de base e, exponentielles de base a, croissances comparées.',
                competences: ['Dérivée (e^u)\' = u\' e^u', 'Limites et croissances comparées', 'Étude de fonctions exponentielles'],
                keyFormula: '(e^u)\' = u\' \\cdot e^u \\qquad \\lim_{x \\to +\\infty} \\frac{e^x}{x^n} = +\\infty',
                wolofInsight: 'Exponentielle dafa melni fusée buy yéeg ci kaw asamaan ci anam bu gaaw lool.',
              },
              {
                id: 5,
                slug: 'integration',
                title: 'Primitives et Calcul Intégral',
                domain: 'Analyse',
                lessonsCount: 1,
                isFree: false,
                desc: 'Calcul de primitives, intégration par parties, calcul d\'aires.',
                competences: ['Calcul des primitives usuelles', 'Intégration par parties u\'v', 'Calcul d\'aires en unités d\'aire'],
                keyFormula: '\\int_a^b u\'(t) v(t) dt = [u(t)v(t)]_a^b - \\int_a^b u(t) v\'(t) dt',
                wolofInsight: 'Intégrale mooy natt champ u gerte bu amul forme bu jub : da ngay daggate di boole aire yi.',
              },
              {
                id: 6,
                slug: 'equadiff',
                title: 'Équations Différentielles',
                domain: 'Analyse',
                lessonsCount: 1,
                isFree: false,
                desc: 'Équations du premier et du second ordre à coefficients constants.',
                competences: ['Résoudre y\' + ay = b', 'Résoudre ay\'\' + by\' + cy = 0', 'Injecter les conditions initiales'],
                keyFormula: 'y\' + ay = b \\implies y(x) = C e^{-ax} + \\frac{b}{a} \\qquad ay\'\' + by\' + cy = 0',
                wolofInsight: 'Équation différentielle dafa melni yéngu-yéngu pirogue ci géej : doole yi ñoo ciy wax trajectoire bi.',
              },
              {
                id: 7,
                slug: 'suites',
                title: 'Suites Numériques',
                domain: 'Analyse',
                lessonsCount: 1,
                isFree: false,
                desc: 'Suites arithmétiques, géométriques, raisonnement par récurrence, convergence et théorèmes de convergence (suites adjacentes, etc.).',
                competences: ['Raisonnement par récurrence en 3 étapes', 'Suites arithmétiques et géométriques', 'Théorème de convergence monotone et suites adjacentes'],
                keyFormula: 'P(0) \\text{ vrai et } P(k) \\implies P(k+1) \\implies \\forall n, P(n)',
                wolofInsight: 'Récurrence dafa melni dominos : boo daanee bu jëkk bi te koo daan mu daaneel sa kanam, yépp dañuy daanu.',
              },

              // ── 2. ALGÈBRE ET GÉOMÉTRIE (3 Chapitres) ──
              {
                id: 8,
                slug: 'complexes',
                title: 'Nombres Complexes',
                domain: 'Algèbre et Géométrie',
                lessonsCount: 1,
                isFree: false,
                desc: 'Forme algébrique, forme trigonométrique et exponentielle, affixes, résolutions d\'équations du second degré dans C, applications géométriques.',
                competences: ['Module et argument', 'Résolution az² + bz + c = 0 dans C', 'Applications géométriques : triangles, alignement, orthogonalité'],
                keyFormula: 'z = r(\\cos\\theta + i\\sin\\theta) = r e^{i\\theta} \\qquad \\arg\\left(\\frac{z_C - z_A}{z_B - z_A}\\right) = (\\vec{AB}, \\vec{AC})',
                wolofInsight: 'Complexe mooy boussole gaal ci géej Dakar : module bi mooy distance bi, argument bi di cap bi.',
              },
              {
                id: 9,
                slug: 'similitudes',
                title: 'Similitudes Planes Directes',
                domain: 'Algèbre et Géométrie',
                lessonsCount: 1,
                isFree: false,
                desc: 'Définition, écriture complexe, caractérisation et propriétés géométriques.',
                competences: ['Écriture complexe z\' = az + b', 'Déterminer centre, rapport k et angle theta', 'Images de figures géométriques et composée'],
                keyFormula: 'z\' = a z + b \\qquad k = |a|, \\; \\theta = \\arg(a), \\; \\omega = \\frac{b}{1 - a}',
                wolofInsight: 'Similitude dafa melni foto ci portable : day agrandir (rapport), tourner ko (angle) te am point fixe bu bougul (centre).',
              },
              {
                id: 10,
                slug: 'isometries',
                title: 'Isométries et Transformations du Plan',
                domain: 'Algèbre et Géométrie',
                lessonsCount: 1,
                isFree: false,
                desc: 'Translations, rotations, réflexions, composées de transformations (selon les rappels et approfondissements).',
                competences: ['Caractériser les translations, rotations et réflexions', 'Composée d\'isométries', 'Réduction et nature d\'une transformation'],
                keyFormula: 't_{\\vec{u}} : z\' = z + z_u \\qquad r(\\Omega, \\theta) : z\' - z_\\Omega = e^{i\\theta}(z - z_\\Omega)',
                wolofInsight: 'Isométrie mooy transformation bu dul soppi distance yi mukk : da ngay déplacer walla mirrorer sans yàq.',
              },

              // ── 3. PROBABILITÉS ET DÉNOMBREMENT (2 Chapitres) ──
              {
                id: 11,
                slug: 'denombrement',
                title: 'Dénombrement',
                domain: 'Probabilités et Dénombrement',
                lessonsCount: 1,
                isFree: false,
                desc: 'Arrangements, permutations, combinaisons (listes, p-listes).',
                competences: ['Identifier l\'ordre et la répétition', 'Calculer arrangements A_n^p et combinaisons C_n^p', 'Dénombrer des tirages'],
                keyFormula: 'A_n^p = \\frac{n!}{(n - p)!} \\qquad C_n^p = \\frac{n!}{p!(n - p)!} \\qquad n^p \\text{ (p-listes)}',
                wolofInsight: 'Dénombrement mooy waññ : ndax ordre am na solo (arrangements) walla amul solo (combinaisons) ?',
              },
              {
                id: 12,
                slug: 'probabilites',
                title: 'Probabilités',
                domain: 'Probabilités et Dénombrement',
                lessonsCount: 1,
                isFree: false,
                desc: 'Probabilités conditionnelles, formule des probabilités totales, variables aléatoires, loi binomiale, loi de probabilité, espérance, variance et écart-type.',
                competences: ['Probabilités conditionnelles et arbre', 'Formule des probabilités totales', 'Variable aléatoire X, loi binomiale, E(X), V(X)'],
                keyFormula: 'P(B) = \\sum P(A_i) P(B|A_i) \\qquad P(X = k) = C_n^k p^k (1 - p)^{n-k} \\qquad E(X) = n p',
                wolofInsight: 'Probabilités dafa melni tànn bourses ci concours walla pénaltys ci finale football.',
              },
            ],
          },
          {
            code: 'physique-chimie',
            name: 'Sciences Physiques (PC)',
            shortName: 'Physique-Chimie S2',
            iconName: 'physique',
            coeffBac: 6,
            status: 'active',
            statusLabel: 'Programme disponible',
            progressPercent: 95,
            teacherLead: 'M. Ibrahima Sall (Lycée Lamine Guèye)',
            description: 'Programme officiel Terminale S2 — Chimie organique (alcools, amines, acides, cinétique, acides aminés), solutions aqueuses (pH, acides-bases, dosages, tampons), mécanique (cinématique, Newton, projectiles, oscillations), électricité (induction, RLC libre et forcé), physique atomique et nucléaire.',
            chapters: [
              // ── PARTIE CHIMIE ──
              {
                id: 1,
                slug: 'alcools',
                title: 'C1 : Alcools',
                lessonsCount: 3,
                isFree: false,
                desc: 'Classes, nomenclature, oxydations ménagées (aldéhydes, cétones, acides carboxyliques) et déshydratation intra/intermoléculaire des alcools.',
                competences: ['Classer un alcool (primaire, secondaire, tertiaire)', 'Identifier les produits d\'oxydation ménagée', 'Écrire l\'équation de déshydratation'],
                wolofInsight: 'Alcool dafa melni ndox bu am odeur : bu ñu ko oxyder, dafay wecceel aldéhyde walla acide, naka tàmit buy yàgg.',
              },
              {
                id: 2,
                slug: 'amines',
                title: 'C2 : Amines',
                lessonsCount: 3,
                isFree: false,
                desc: 'Structure et classes des amines, nomenclature officielle, caractère basique et nucléophile, réaction d\'alkylation d\'Hofmann.',
                competences: ['Classer une amine (primaire, secondaire, tertiaire)', 'Écrire la réaction de formation d\'un sel d\'ammonium', 'Comparer la basicité amine / ammoniac'],
                wolofInsight: 'Amine dafa melni ammoniaque bu am "aile" organique : dafay gën a base te dafay sàftal réactions yëgël.',
              },
              {
                id: 3,
                slug: 'acides-carboxyliques',
                title: 'C3 : Acides carboxyliques et dérivés',
                lessonsCount: 4,
                isFree: false,
                desc: 'Acides carboxyliques, chlorures d\'acyle, anhydrides, amides, esters. Estérification directe, hydrolyse, saponification et rendement de synthèse.',
                competences: ['Nommer les acides, esters, amides', 'Calculer le rendement d\'estérification', 'Distinguer estérification et saponification'],
                keyFormula: '\\tau = \\frac{n_\\text{ester\\ formé}}{n_{\\text{acide ou alcool initial}}} \\times 100',
                wolofInsight: 'Estérification dafa melni jàlle entre acide ak alcool : dagañu ko ak chaleur, du gaaw, di taxaw ci équilibre. Saponification ak soude mooy yor complet !',
              },
              {
                id: 4,
                slug: 'cinetique',
                title: 'C4 : Cinétique chimique',
                lessonsCount: 3,
                isFree: true,
                desc: 'Facteurs cinétiques (température, concentration, catalyseur), suivi temporel par spectrophotométrie, vitesse volumique, tangente graphique et temps de demi-réaction t½.',
                competences: ['Calculer la vitesse volumique v = (1/V) dx/dt', 'Déterminer graphiquement t½', 'Justifier le rôle de la trempe chimique', 'Distinguer catalyse homogène et hétérogène'],
                keyFormula: 'v(t) = \\frac{1}{V}\\frac{dx}{dt} \\qquad x(t_{1/2}) = \\frac{x_\\text{max}}{2}',
                wolofInsight: 'Cinétique dafa melni toggu ceebu jën : bu safara gi tàngée lool, togg bi dafay gaaw. Su réactifs yi féssee del naka Sandaga, chocs yi dañuy yokk !',
              },
              {
                id: 5,
                slug: 'autoprotolyse-ph',
                title: 'C5 : Autoprotolyse de l\'eau – pH – Indicateurs colorés',
                lessonsCount: 3,
                isFree: false,
                desc: 'Autoprotolyse de l\'eau, produit ionique Ke, définition du pH, échelle acido-basique et indicateurs colorés avec zones de virage.',
                competences: ['Calculer le pH d\'une solution à partir de [H3O+]', 'Utiliser Ke = 10^(-14) à 25°C', 'Choisir l\'indicateur approprié à un dosage'],
                keyFormula: 'K_e = [H_3O^+][OH^-] = 10^{-14} \\quad (25^\\circ\\text{C}) \\qquad \\text{pH} = -\\log[H_3O^+]',
                wolofInsight: 'pH dafa melni thermomètre chimique : pH < 7 mooy acide (tangaaw), pH > 7 mooy base (sedd), pH = 7 mooy neutre (naka ndox puur).',
              },
              {
                id: 6,
                slug: 'acide-fort-base-forte',
                title: 'C6 : Acide fort – Base forte – Dosage',
                lessonsCount: 3,
                isFree: false,
                desc: 'Dissociation totale des acides et bases forts, réaction de neutralisation et courbe de dosage pH-métrique. Saut de pH au point d\'équivalence.',
                competences: ['Calculer le pH d\'un acide / base fort', 'Déterminer le volume à l\'équivalence VE', 'Exploiter la courbe de dosage fort-fort'],
                keyFormula: 'C_A V_A = C_B V_B \\quad (\\text{à l\'équivalence}) \\qquad \\text{pH}_{\\text{éq.}} = 7 \\; (25^\\circ\\text{C})',
                wolofInsight: 'Dosage dafa melni natt ndox ci seau : bu ñu xëy amount bu juste bu ci dee bu base yi, ñu dem ci digg ci (équivalence) !',
              },
              {
                id: 7,
                slug: 'acides-bases-faibles',
                title: 'C7 : Acides et bases faibles – Couples acide-base – pKa',
                lessonsCount: 3,
                isFree: false,
                desc: 'Couples acide-base conjugués, constante d\'acidité Ka, pKa, relation de Henderson-Hasselbalch et diagramme de prédominance.',
                competences: ['Calculer Ka et pKa à partir du pH', 'Tracer le diagramme de prédominance', 'Appliquer pH = pKa + log([A-]/[AH])'],
                keyFormula: '\\text{pH} = \\text{p}K_a + \\log\\frac{[A^-]}{[AH]} \\qquad K_a = \\frac{[A^-][H_3O^+]}{[AH]}',
                wolofInsight: 'Acide faible du dacc totalement naka acide fort : dafa faible naka tiit mooy fey. pKa bi dafay wax force bi — bu pKa bi topp, acide bi gën a doylu.',
              },
              {
                id: 8,
                slug: 'dosages-tampon',
                title: 'C8 : Réaction acide faible / base forte, effet tampon et dosages',
                lessonsCount: 3,
                isFree: false,
                desc: 'Courbe de dosage acide faible - base forte, méthode des tangentes parallèles, demi-équivalence pKa = pH, et propriétés des solutions tampons.',
                competences: ['Tracer et analyser une courbe de dosage faible-fort', 'Lire le pKa à la demi-équivalence', 'Expliquer l\'effet tampon d\'une solution'],
                keyFormula: '\\text{À la demi-équivalence} : \\text{pH} = \\text{p}K_a \\qquad \\text{Tampon} : \\Delta\\text{pH} \\approx 0',
                wolofInsight: 'Solution tampon dafa melni "amortisseur" bu résister addition acide walla base. Naka sang bu amul sida — dafay taxaw pH bi ci même endroit !',
              },
              {
                id: 9,
                slug: 'acides-amines',
                title: 'C9 : Acides aminés (éléments de stéréochimie)',
                lessonsCount: 3,
                isFree: false,
                desc: 'Structure des alpha-amino-acides, carbone asymétrique, chiralité et énantiomères, représentation de Fischer, séries D/L, amphion (zwitterion) et liaison peptidique.',
                competences: ['Identifier un carbone asymétrique', 'Dessiner les énantiomères en représentation de Fischer', 'Écrire la forme amphion (zwitterion) et la liaison peptidique'],
                wolofInsight: 'Acide aminé dafa melni lettre ci alfabet chimique bu yëgël protéines. Chiralité mooy méwet bu amul image ci miroir — naka main droite ak main gauche !',
              },
              // ── PARTIE PHYSIQUE ──
              {
                id: 10,
                slug: 'cinematique-point',
                title: 'P1 : Cinématique du point matériel',
                lessonsCount: 3,
                isFree: false,
                desc: 'Vecteurs position, vitesse instantanée, accélération et repère de Frenet. Mouvements rectilignes uniformes (MRU) et uniformément variés (MRUV).',
                competences: ['Exprimer les vecteurs vitesse et accélération en coordonnées cartésiennes', 'Distinguer MRU, MRUV et mouvement circulaire', 'Établir les équations horaires'],
                keyFormula: 'v = \\frac{d\\overrightarrow{OM}}{dt} \\qquad a = \\frac{d\\overrightarrow{v}}{dt}',
              },
              {
                id: 11,
                slug: 'lois-newton',
                title: 'P2 : Les lois de Newton sur le mouvement',
                lessonsCount: 3,
                isFree: false,
                desc: 'Les trois lois de Newton : inertie, principe fondamental de la dynamique (PFD) et principe des actions réciproques. Application aux forces de contact et gravitation.',
                competences: ['Appliquer le PFD vectoriellement', 'Identifier toutes les forces sur le point matériel', 'Déduire la nature du mouvement à partir du PFD'],
                keyFormula: '\\sum \\overrightarrow{F_{ext}} = m\\overrightarrow{a}',
                wolofInsight: 'Newton dafa wax : bu xale bi dëkk, dafay dëkk (inertie). Su ñu ko tëral, da ngay yéeg (F = ma). Su ñu dëkk dañ wax rekk (actions réciproques) !',
              },
              {
                id: 12,
                slug: 'projectile-pesanteur',
                title: 'P3 : Mouvement d\'un projectile dans un champ de pesanteur uniforme',
                lessonsCount: 3,
                isFree: false,
                desc: 'Équations horaires du tir parabolique, équation de la trajectoire (parabole), calcul de la portée, de la flèche (hauteur maximale) et de l\'angle optimal.',
                competences: ['Établir les équations x(t) et y(t) par intégration du PFD', 'Calculer la portée et la hauteur maximale', 'Déterminer l\'angle de tir pour la portée maximale'],
                keyFormula: 'x = v_0\\cos\\theta \\cdot t \\qquad y = v_0\\sin\\theta \\cdot t - \\frac{1}{2}gt^2',
                wolofInsight: 'Projectile dafa melni ball bu ñu topp ci kaw ci cour : dafay yéeg yéeg di daanu, jàpp trajectoire bu parabole ak pesanteur g.',
              },
              {
                id: 13,
                slug: 'particule-chargee',
                title: 'P4 : Mouvement d\'une particule chargée dans un champ électrique ou magnétique',
                lessonsCount: 3,
                isFree: false,
                desc: 'Déviation électrostatique entre plaques parallèles, force de Lorentz dans un champ magnétique uniforme, mouvement circulaire uniforme. Applications : spectromètre de masse, cyclotron.',
                competences: ['Calculer la déviation d\'un électron entre deux plaques', 'Appliquer la force de Lorentz F = qv × B', 'Déterminer le rayon de la trajectoire circulaire'],
                keyFormula: '\\overrightarrow{F} = q(\\overrightarrow{E} + \\overrightarrow{v} \\wedge \\overrightarrow{B}) \\qquad r = \\frac{mv}{|q|B}',
              },
              {
                id: 14,
                slug: 'oscillations-mecaniques',
                title: 'P5 : Les oscillations mécaniques (pendule élastique)',
                lessonsCount: 3,
                isFree: false,
                desc: 'Pendule élastique horizontal et vertical : équation différentielle harmonique, pulsation propre ω₀, période T₀ et conservation de l\'énergie mécanique.',
                competences: ['Établir l\'équation différentielle du pendule élastique', 'Calculer T₀ = 2π√(m/k)', 'Analyser l\'énergie cinétique et potentielle élastique'],
                keyFormula: '\\ddot{x} + \\omega_0^2 x = 0 \\qquad T_0 = 2\\pi\\sqrt{\\frac{m}{k}}',
                wolofInsight: 'Pendule élastique dafa melni xale buy yéew ci bathtub : dafay xar xar ci même période T₀ quel que soit l\'amplitude !',
              },
              {
                id: 15,
                slug: 'induction-auto-induction',
                title: 'P6 : Phénomène d\'induction électromagnétique et auto-induction',
                lessonsCount: 3,
                isFree: false,
                desc: 'Flux magnétique, loi de Lenz-Faraday, f.é.m. d\'induction. Auto-induction : inductance L, énergie emmagasinée et établissement/rupture du courant en circuit RL.',
                competences: ['Calculer la f.é.m. e = -dΦ/dt', 'Établir l\'équation différentielle du circuit RL', 'Tracer i(t) lors de l\'établissement du courant'],
                keyFormula: 'e = -\\frac{d\\Phi}{dt} \\qquad e_L = -L\\frac{di}{dt} \\qquad \\tau = \\frac{L}{R}',
              },
              {
                id: 16,
                slug: 'oscillations-lc-rlc-libres',
                title: 'P7 : Les oscillations électriques libres (circuit LC et RLC)',
                lessonsCount: 3,
                isFree: false,
                desc: 'Circuit LC idéal : oscillations libres sinusoïdales et pulsation propre ω₀. Circuit RLC : amortissement, pseudopériode, régime apériodique et énergie.',
                competences: ['Établir l\'équation différentielle du circuit RLC libre', 'Calculer ω₀ = 1/√(LC) et la pseudopériode T', 'Distinguer les régimes pseudopériodique, critique et apériodique'],
                keyFormula: 'L\\frac{d^2q}{dt^2} + R\\frac{dq}{dt} + \\frac{q}{C} = 0 \\qquad \\omega_0 = \\frac{1}{\\sqrt{LC}}',
                wolofInsight: 'Circuit LC dafa melni ballon buy doxal énérgie entre C (stocke) ak L (libère) naka xale buy jox nguer di ko ñëw : dañu oscille jusqu\'à RLC bi ko taxawal !',
              },
              {
                id: 17,
                slug: 'oscillations-rlc-forces-ac',
                title: 'P8 : Oscillations électriques forcées en courant alternatif (RLC série)',
                lessonsCount: 3,
                isFree: false,
                desc: 'Représentation de Fresnel, impédance complexe Z, loi d\'Ohm en alternatif, déphasage tension-intensité, résonance d\'intensité, bande passante et facteur de qualité Q.',
                competences: ['Calculer l\'impédance Z du circuit RLC série', 'Déterminer la fréquence de résonance f₀ = 1/(2π√(LC))', 'Tracer la courbe de résonance I(f) et lire la bande passante'],
                keyFormula: 'Z = \\sqrt{R^2 + (L\\omega - \\frac{1}{C\\omega})^2} \\qquad I_{\\max} \\text{ si } \\omega = \\omega_0 = \\frac{1}{\\sqrt{LC}}',
              },
              {
                id: 18,
                slug: 'modele-ondulatoire-corpusculaire',
                title: 'P9 : Modèle ondulatoire et corpusculaire de la lumière',
                lessonsCount: 3,
                isFree: false,
                desc: 'Dualité onde-corpuscule : interférences lumineuses (fentes d\'Young, interfrange i = λD/a), effet photoélectrique (E = hν), niveaux d\'énergie de l\'atome de Bohr.',
                competences: ['Calculer l\'interfrange i = λD/a', 'Appliquer Ec,max = hν - Ws pour l\'effet photoélectrique', 'Interpréter les spectres de raies avec les niveaux de Bohr'],
                keyFormula: 'i = \\frac{\\lambda D}{a} \\qquad E_\\text{photon} = h\\nu \\qquad h = 6{,}63 \\times 10^{-34}\\text{ J.s}',
              },
              {
                id: 19,
                slug: 'physique-nucleaire',
                title: 'P10 : Physique nucléaire (radioactivité, réactions et énergie)',
                lessonsCount: 3,
                isFree: false,
                desc: 'Structure du noyau, lois de conservation, radioactivité α, β, γ, loi de décroissance N(t) = N₀ e^(-λt), défaut de masse Δm et énergie de liaison par nucléon.',
                competences: ['Écrire et équilibrer une équation nucléaire', 'Calculer l\'activité A = λN et la demi-vie t½', 'Calculer l\'énergie libérée ΔE = Δm·c²'],
                keyFormula: 'N(t) = N_0 e^{-\\lambda t} \\quad t_{1/2} = \\frac{\\ln 2}{\\lambda} \\qquad \\Delta E = \\Delta m \\cdot c^2',
                wolofInsight: 'Noyau radioactif dafa melni bougie buy weesu ndànk ndànk : ay borom t½ du waññiku ci digg bi, quel que soit combien ñoo amoon ci kanam !',
              },
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

