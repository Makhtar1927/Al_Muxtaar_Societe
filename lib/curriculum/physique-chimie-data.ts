export interface PhysiqueLessonItem {
  id: string;
  title: string;
  order_index: number;
  is_free: boolean;
  status: 'published';
}

export interface PhysiqueChapterItem {
  id: string;
  order_index: number;
  code: string; // Ex: 'C1', 'C4', 'P1', 'P10'
  part: 'Chimie' | 'Physique';
  subDomain?: string; // Ex: 'Chimie organique', 'Solutions aqueuses', 'Mécanique', etc.
  title: string;
  status: 'published';
  lessons: PhysiqueLessonItem[];
}

export const PHYSIQUE_CHIMIE_SUBJECT_ID = '40000000-0000-0000-0000-000000000002';

export const PHYSIQUE_CHIMIE_CHAPTERS: PhysiqueChapterItem[] = [
  // ==========================================
  // PARTIE 1 : CHIMIE (C1 à C9)
  // ==========================================

  // --- Domaine : Chimie organique ---
  {
    id: '50000000-0000-0001-0001-000000000001',
    order_index: 1,
    code: 'C1',
    part: 'Chimie',
    subDomain: 'Chimie organique',
    title: 'C1 : Alcools',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0001-0001-000000000001',
        title: "Classes d'alcools, nomenclature et propriétés physiques",
        order_index: 1,
        is_free: true,
        status: 'published',
      },
      {
        id: '60000000-0000-0001-0001-000000000002',
        title: 'Oxydation ménagée des alcools et identification des produits',
        order_index: 2,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0001-0001-000000000003',
        title: 'Déshydratation intra et intermoléculaire des alcools',
        order_index: 3,
        is_free: false,
        status: 'published',
      },
    ],
  },
  {
    id: '50000000-0000-0001-0001-000000000002',
    order_index: 2,
    code: 'C2',
    part: 'Chimie',
    subDomain: 'Chimie organique',
    title: 'C2 : Amines',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0001-0001-000000000004',
        title: "Structure, classes d'amines et nomenclature officielle",
        order_index: 1,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0001-0001-000000000005',
        title: 'Propriétés acido-basiques et caractère nucléophile des amines',
        order_index: 2,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0001-0001-000000000006',
        title: "Réaction d'alkylation d'Hofmann et passage aux sels d'ammonium",
        order_index: 3,
        is_free: false,
        status: 'published',
      },
    ],
  },
  {
    id: '50000000-0000-0001-0001-000000000003',
    order_index: 3,
    code: 'C3',
    part: 'Chimie',
    subDomain: 'Chimie organique',
    title: 'C3 : Acides carboxyliques et dérivés',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0001-0001-000000000007',
        title: 'Structure et nomenclature des acides carboxyliques et esters',
        order_index: 1,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0001-0001-000000000008',
        title: 'Chlorures d’acyle, anhydrides d’acide et amides',
        order_index: 2,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0001-0001-000000000009',
        title: 'Estérification directe et hydrolyse : état d’équilibre et rendement',
        order_index: 3,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0001-0001-000000000010',
        title: 'Saponification des esters et fabrication des savons',
        order_index: 4,
        is_free: false,
        status: 'published',
      },
    ],
  },
  {
    // ⭐ C4 : Cinétique chimique (Cours complet, simulateur labo, reflexes, quiz, annales)
    id: '50000000-0000-0000-0001-000000000001',
    order_index: 4,
    code: 'C4',
    part: 'Chimie',
    subDomain: 'Chimie organique / Cinétique',
    title: 'C4 : Cinétique chimique',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0000-0001-000000000001',
        title: 'Facteurs cinétiques, vitesse volumique et suivi temporel',
        order_index: 1,
        is_free: true,
        status: 'published',
      },
      {
        id: '60000000-0000-0000-0001-000000000002',
        title: 'Méthodes graphiques, tangentes et temps de demi-réaction',
        order_index: 2,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0000-0001-000000000003',
        title: 'Trempe chimique, catalyse et mécanismes réactionnels',
        order_index: 3,
        is_free: false,
        status: 'published',
      },
    ],
  },

  // --- Domaine : Solutions aqueuses et équilibres chimiques ---
  {
    id: '50000000-0000-0001-0001-000000000005',
    order_index: 5,
    code: 'C5',
    part: 'Chimie',
    subDomain: 'Solutions aqueuses & équilibres',
    title: 'C5 : Autoprotolyse de l’eau – pH d’une solution aqueuse – Indicateurs colorés',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0001-0001-000000000011',
        title: "Équilibre d'autoprotolyse de l'eau et produit ionique Ke",
        order_index: 1,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0001-0001-000000000012',
        title: 'Définition du pH, échelle et relations de concentration',
        order_index: 2,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0001-0001-000000000013',
        title: 'Indicateurs colorés acido-basiques et zone de virage',
        order_index: 3,
        is_free: false,
        status: 'published',
      },
    ],
  },
  {
    id: '50000000-0000-0001-0001-000000000006',
    order_index: 6,
    code: 'C6',
    part: 'Chimie',
    subDomain: 'Solutions aqueuses & équilibres',
    title: 'C6 : Acide fort – Base forte – Réaction entre acide fort et base forte – Dosage',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0001-0001-000000000014',
        title: 'Définition, dissociation totale et calcul du pH des solutions fortes',
        order_index: 1,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0001-0001-000000000015',
        title: 'Réaction de neutralisation fort-fort et calcul du point d’équivalence',
        order_index: 2,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0001-0001-000000000016',
        title: 'Courbe de dosage pH-métrique fort-fort et choix de l’indicateur',
        order_index: 3,
        is_free: false,
        status: 'published',
      },
    ],
  },
  {
    id: '50000000-0000-0001-0001-000000000007',
    order_index: 7,
    code: 'C7',
    part: 'Chimie',
    subDomain: 'Solutions aqueuses & équilibres',
    title: 'C7 : Acides et bases faibles – Couples acide-base – Constante d’acidité (pKa)',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0001-0001-000000000017',
        title: 'Couples acide-base faibles et constante d’acidité Ka et pKa',
        order_index: 1,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0001-0001-000000000018',
        title: 'Diagramme de prédominance et relation pH = pKa + log([B]/[A])',
        order_index: 2,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0001-0001-000000000019',
        title: 'Classification et comparaison de la force relative des couples',
        order_index: 3,
        is_free: false,
        status: 'published',
      },
    ],
  },
  {
    id: '50000000-0000-0001-0001-000000000008',
    order_index: 8,
    code: 'C8',
    part: 'Chimie',
    subDomain: 'Solutions aqueuses & équilibres',
    title: 'C8 : Réaction acide faible / base forte, effet tampon et dosages',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0001-0001-000000000020',
        title: 'Courbe de dosage acide faible - base forte et méthode des tangentes',
        order_index: 1,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0001-0001-000000000021',
        title: 'La demi-équivalence et détermination graphique du pKa',
        order_index: 2,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0001-0001-000000000022',
        title: 'Propriétés des solutions tampons, préparation et applications',
        order_index: 3,
        is_free: false,
        status: 'published',
      },
    ],
  },
  {
    id: '50000000-0000-0001-0001-000000000009',
    order_index: 9,
    code: 'C9',
    part: 'Chimie',
    subDomain: 'Chimie organique / Stéréochimie',
    title: 'C9 : Acides aminés (éléments de stéréochimie)',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0001-0001-000000000023',
        title: 'Structure des acides alpha-aminés et carbone asymétrique',
        order_index: 1,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0001-0001-000000000024',
        title: 'Chiralité, énantiomères, représentation de Fischer (séries D et L)',
        order_index: 2,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0001-0001-000000000025',
        title: 'Caractère amphotère, amphion (zwitterion) et liaison peptidique',
        order_index: 3,
        is_free: false,
        status: 'published',
      },
    ],
  },

  // ==========================================
  // PARTIE 2 : PHYSIQUE (P1 à P10)
  // ==========================================

  // --- Domaine : 1. Mécanique ---
  {
    id: '50000000-0000-0002-0001-000000000001',
    order_index: 10,
    code: 'P1',
    part: 'Physique',
    subDomain: '1. Mécanique',
    title: 'P1 : Cinématique du point matériel (vecteurs position, vitesse, accélération)',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0002-0001-000000000001',
        title: 'Vecteur position et équations horaires d’une trajectoire',
        order_index: 1,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0002-0001-000000000002',
        title: 'Vecteurs vitesse et accélération dans la base de Frenet',
        order_index: 2,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0002-0001-000000000003',
        title: 'Mouvements rectilignes (MRU, MRUV) et mouvements circulaires',
        order_index: 3,
        is_free: false,
        status: 'published',
      },
    ],
  },
  {
    id: '50000000-0000-0002-0001-000000000002',
    order_index: 11,
    code: 'P2',
    part: 'Physique',
    subDomain: '1. Mécanique',
    title: 'P2 : Les lois de Newton sur le mouvement',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0002-0001-000000000004',
        title: 'Référentiels galiléens et première loi de Newton (principe d’inertie)',
        order_index: 1,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0002-0001-000000000005',
        title: 'Deuxième loi de Newton : principe fondamental de la dynamique',
        order_index: 2,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0002-0001-000000000006',
        title: 'Troisième loi de Newton : principe des actions réciproques',
        order_index: 3,
        is_free: false,
        status: 'published',
      },
    ],
  },
  {
    id: '50000000-0000-0002-0001-000000000003',
    order_index: 12,
    code: 'P3',
    part: 'Physique',
    subDomain: '1. Mécanique',
    title: 'P3 : Mouvement d’un projectile dans un champ de pesanteur uniforme',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0002-0001-000000000007',
        title: 'Équations différentielles et équations horaires du tir parabolique',
        order_index: 1,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0002-0001-000000000008',
        title: 'Équation de la trajectoire, sommet de la parabole et flèche',
        order_index: 2,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0002-0001-000000000009',
        title: 'Portée horizontale du projectile et conditions de tir optimal',
        order_index: 3,
        is_free: false,
        status: 'published',
      },
    ],
  },
  {
    id: '50000000-0000-0002-0001-000000000004',
    order_index: 13,
    code: 'P4',
    part: 'Physique',
    subDomain: '1. Mécanique',
    title: 'P4 : Mouvement d’une particule chargée dans un champ électrique ou magnétique',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0002-0001-000000000010',
        title: 'Déviation électrostatique uniforme entre deux plaques parallèles',
        order_index: 1,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0002-0001-000000000011',
        title: 'Force de Lorentz et mouvement circulaire dans un champ magnétique B',
        order_index: 2,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0002-0001-000000000012',
        title: 'Applications : spectromètre de masse et cyclotron',
        order_index: 3,
        is_free: false,
        status: 'published',
      },
    ],
  },
  {
    id: '50000000-0000-0002-0001-000000000005',
    order_index: 14,
    code: 'P5',
    part: 'Physique',
    subDomain: '1. Mécanique',
    title: 'P5 : Les oscillations mécaniques (pendule élastique)',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0002-0001-000000000013',
        title: 'Pendule élastique horizontal : équation différentielle et période propre',
        order_index: 1,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0002-0001-000000000014',
        title: 'Pendule élastique vertical et condition d’équilibre statique',
        order_index: 2,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0002-0001-000000000015',
        title: 'Énergie cinétique, énergie potentielle élastique et conservation',
        order_index: 3,
        is_free: false,
        status: 'published',
      },
    ],
  },

  // --- Domaine : 2. Électricité et Électromagnétisme ---
  {
    id: '50000000-0000-0002-0001-000000000006',
    order_index: 15,
    code: 'P6',
    part: 'Physique',
    subDomain: '2. Électricité & Électromagnétisme',
    title: 'P6 : Phénomène d’induction électromagnétique et auto-induction',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0002-0001-000000000016',
        title: 'Flux du champ magnétique et loi de Lenz-Faraday',
        order_index: 1,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0002-0001-000000000017',
        title: 'Auto-induction : inductance L d’une bobine et f.é.m. induite e = -L di/dt',
        order_index: 2,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0002-0001-000000000018',
        title: 'Établissement et rupture du courant dans le dipôle RL (tau = L/R)',
        order_index: 3,
        is_free: false,
        status: 'published',
      },
    ],
  },
  {
    id: '50000000-0000-0002-0001-000000000007',
    order_index: 16,
    code: 'P7',
    part: 'Physique',
    subDomain: '2. Électricité & Électromagnétisme',
    title: 'P7 : Les oscillations électriques libres (circuit LC et RLC)',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0002-0001-000000000019',
        title: 'Circuit LC idéal non amorti : oscillations sinusoïdales et période T0',
        order_index: 1,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0002-0001-000000000020',
        title: 'Circuit RLC série libre : régimes pseudopériodique et apériodique',
        order_index: 2,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0002-0001-000000000021',
        title: 'Évolution énergétique et dispositif d’entretien des oscillations',
        order_index: 3,
        is_free: false,
        status: 'published',
      },
    ],
  },
  {
    id: '50000000-0000-0002-0001-000000000008',
    order_index: 17,
    code: 'P8',
    part: 'Physique',
    subDomain: '2. Électricité & Électromagnétisme',
    title: 'P8 : Les oscillations électriques forcées en courant alternatif (RLC série)',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0002-0001-000000000022',
        title: 'Grandeur sinusoïdale, représentation de Fresnel et impédance Z',
        order_index: 1,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0002-0001-000000000023',
        title: 'Loi d’Ohm en alternatif et déphasage tension-intensité',
        order_index: 2,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0002-0001-000000000024',
        title: 'Résonance d’intensité, acuité, bande passante et facteur de qualité Q',
        order_index: 3,
        is_free: false,
        status: 'published',
      },
    ],
  },

  // --- Domaine : 3. Physique atomique et nucléaire ---
  {
    id: '50000000-0000-0002-0001-000000000009',
    order_index: 18,
    code: 'P9',
    part: 'Physique',
    subDomain: '3. Physique atomique & nucléaire',
    title: 'P9 : Le modèle ondulatoire et corpusculaire de la lumière',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0002-0001-000000000025',
        title: 'Modèle ondulatoire : interférences des fentes d’Young et interfrange i',
        order_index: 1,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0002-0001-000000000026',
        title: 'Effet photoélectrique, travail d’extraction et photon de Planck-Einstein',
        order_index: 2,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0002-0001-000000000027',
        title: 'Postulats de Bohr, niveaux d’énergie discrets et spectres de raies',
        order_index: 3,
        is_free: false,
        status: 'published',
      },
    ],
  },
  {
    id: '50000000-0000-0002-0001-000000000010',
    order_index: 19,
    code: 'P10',
    part: 'Physique',
    subDomain: '3. Physique atomique & nucléaire',
    title: 'P10 : Physique nucléaire (radioactivité, réactions et énergie de liaison)',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0002-0001-000000000028',
        title: 'Structure du noyau, isotopes, défaut de masse et énergie de liaison',
        order_index: 1,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0002-0001-000000000029',
        title: 'Radioactivité naturelle alpha, bêta, gamma et loi de décroissance',
        order_index: 2,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0002-0001-000000000030',
        title: 'Réactions nucléaires provoquées : fission, fusion et relation d’Einstein',
        order_index: 3,
        is_free: false,
        status: 'published',
      },
    ],
  },
];

/**
 * Synchronise les chapitres et leçons de Physique-Chimie dans Supabase si nécessaire.
 */
export async function ensurePhysiqueChimieInDatabase(admin: any) {
  try {
    // 1. Récupérer ou insérer le sujet Sciences Physiques (PC)
    const { data: existingSub } = await admin
      .from('subjects')
      .select('id')
      .eq('code', 'physique-chimie')
      .maybeSingle();

    let targetSubjectId = existingSub?.id || PHYSIQUE_CHIMIE_SUBJECT_ID;

    if (!existingSub) {
      const { data: trackRow } = await admin
        .from('tracks')
        .select('id')
        .ilike('code', 's2')
        .limit(1)
        .maybeSingle();

      const { data: newSub } = await admin
        .from('subjects')
        .upsert(
          {
            id: PHYSIQUE_CHIMIE_SUBJECT_ID,
            name: 'Sciences Physiques (PC)',
            code: 'physique-chimie',
            track_id: trackRow?.id || '20000000-0000-0000-0000-000000000002',
          },
          { onConflict: 'id' }
        )
        .select('id')
        .maybeSingle();

      if (newSub?.id) {
        targetSubjectId = newSub.id;
      }
    }

    // 2. Insérer/vérifier tous les Chapitres et leçons du programme PC
    for (const chap of PHYSIQUE_CHIMIE_CHAPTERS) {
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
    console.error('Erreur ensurePhysiqueChimieInDatabase:', err);
    return PHYSIQUE_CHIMIE_SUBJECT_ID;
  }
}
