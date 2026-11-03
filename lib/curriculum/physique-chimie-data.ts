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
  title: string;
  status: 'published';
  lessons: PhysiqueLessonItem[];
}

export const PHYSIQUE_CHIMIE_SUBJECT_ID = '40000000-0000-0000-0000-000000000002';

export const PHYSIQUE_CHIMIE_CHAPTERS: PhysiqueChapterItem[] = [
  {
    id: '50000000-0000-0000-0001-000000000001',
    order_index: 1,
    title: 'Cinétique Chimique & Vitesse de Réaction',
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
  {
    id: '50000000-0000-0000-0001-000000000002',
    order_index: 2,
    title: 'Solutions Aqueuses : Acides, Bases & pH-métrie',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0000-0001-000000000004',
        title: "Produit ionique de l'eau, autoprotolyse et échelle de pH",
        order_index: 1,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0000-0001-000000000005',
        title: "Constante d'acidité Ka, pKa et diagramme de prédominance",
        order_index: 2,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0000-0001-000000000006',
        title: 'Dosages acido-basiques et méthode des tangentes parallèles',
        order_index: 3,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0000-0001-000000000007',
        title: 'Solutions tampons : propriétés et préparation',
        order_index: 4,
        is_free: false,
        status: 'published',
      },
    ],
  },
  {
    id: '50000000-0000-0000-0001-000000000003',
    order_index: 3,
    title: 'Chimie Organique : Estérification & Dérivés',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0000-0001-000000000008',
        title: 'Familles organiques : alcools, acides carboxyliques et anhydrides',
        order_index: 1,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0000-0001-000000000009',
        title: "Réaction d'estérification directe et hydrolyse d'un ester",
        order_index: 2,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0000-0001-000000000010',
        title: "Contrôle de l'état d'équilibre et rendement de synthèse",
        order_index: 3,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0000-0001-000000000011',
        title: 'Saponification des esters et fabrication des savons',
        order_index: 4,
        is_free: false,
        status: 'published',
      },
    ],
  },
  {
    id: '50000000-0000-0000-0001-000000000004',
    order_index: 4,
    title: 'Cinématique & Lois de Newton',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0000-0001-000000000012',
        title: 'Vecteurs position, vitesse, accélération et repère de Frenet',
        order_index: 1,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0000-0001-000000000013',
        title: 'Deuxième loi de Newton : principe fondamental de la dynamique',
        order_index: 2,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0000-0001-000000000014',
        title: 'Mouvements rectilignes uniformes et uniformément variés',
        order_index: 3,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0000-0001-000000000015',
        title: 'Mouvements circulaires uniformes et vitesse angulaire',
        order_index: 4,
        is_free: false,
        status: 'published',
      },
    ],
  },
  {
    id: '50000000-0000-0000-0001-000000000005',
    order_index: 5,
    title: 'Mouvement dans les Champs de Pesanteur et Électrostatique',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0000-0001-000000000016',
        title: 'Projectile dans un champ de pesanteur uniforme',
        order_index: 1,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0000-0001-000000000017',
        title: 'Équations horaires, équation de la trajectoire, portée et flèche',
        order_index: 2,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0000-0001-000000000018',
        title: 'Particule chargée dans un champ électrostatique uniforme',
        order_index: 3,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0000-0001-000000000019',
        title: "Théorème de l'énergie cinétique et accélération de particules",
        order_index: 4,
        is_free: false,
        status: 'published',
      },
    ],
  },
  {
    id: '50000000-0000-0000-0001-000000000006',
    order_index: 6,
    title: 'Oscillations Électriques Libres et Forcées (RLC)',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0000-0001-000000000020',
        title: 'Charge et décharge du condensateur dans un circuit RC',
        order_index: 1,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0000-0001-000000000021',
        title: "Bobine d'inductance et établissement du courant en circuit RL",
        order_index: 2,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0000-0001-000000000022',
        title: 'Circuit RLC libre : oscillations libres, amortissement et pseudopériode',
        order_index: 3,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0000-0001-000000000023',
        title: 'Oscillations forcées, impédance électrique et résonance d\'intensité',
        order_index: 4,
        is_free: false,
        status: 'published',
      },
    ],
  },
  {
    id: '50000000-0000-0000-0001-000000000007',
    order_index: 7,
    title: 'Interférences Lumineuses & Dualité Onde-Corpuscule',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0000-0001-000000000024',
        title: 'Modèle ondulatoire de la lumière et diffraction',
        order_index: 1,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0000-0001-000000000025',
        title: "Fentes d'Young : interférences à deux ondes et calcul d'interfrange",
        order_index: 2,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0001-000000000026',
        title: "Effet photoélectrique et quanta d'énergie de Planck-Einstein",
        order_index: 3,
        is_free: false,
        status: 'published',
      },
    ],
  },
  {
    id: '50000000-0000-0000-0001-000000000008',
    order_index: 8,
    title: "Physique Nucléaire & Réactions d'Énergie",
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0000-0001-000000000027',
        title: 'Structure du noyau, isotopes, défaut de masse et énergie de liaison',
        order_index: 1,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0000-0001-000000000028',
        title: 'Radioactivité naturelle alpha, bêta, gamma et loi de décroissance',
        order_index: 2,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0000-0001-000000000029',
        title: "Réactions nucléaires provoquées : fission, fusion et relation d'Einstein",
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
      // Trouver la track 's2'
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

    // 2. Insérer/vérifier le Chapitre 1 (Cinétique Chimique)
    const chap1 = PHYSIQUE_CHIMIE_CHAPTERS[0];
    await admin.from('chapters').upsert(
      {
        id: chap1.id,
        subject_id: targetSubjectId,
        title: chap1.title,
        order_index: chap1.order_index,
        status: 'published',
      },
      { onConflict: 'id' }
    );

    // 3. Insérer les leçons du Chapitre 1
    for (const l of chap1.lessons) {
      await admin.from('lessons').upsert(
        {
          id: l.id,
          chapter_id: chap1.id,
          title: l.title,
          order_index: l.order_index,
          is_free: l.is_free,
          status: 'published',
          content_markdown: `# ${chap1.title}\n\n## ${l.title}`,
        },
        { onConflict: 'id' }
      );
    }

    return targetSubjectId;
  } catch (err) {
    console.error('Erreur ensurePhysiqueChimieInDatabase:', err);
    return PHYSIQUE_CHIMIE_SUBJECT_ID;
  }
}

