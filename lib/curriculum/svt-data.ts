export interface SvtLessonItem {
  id: string;
  title: string;
  order_index: number;
  is_free: boolean;
  status: 'published';
}

export interface SvtChapterItem {
  id: string;
  order_index: number;
  code: string; // Ex: 'B1', 'B2', 'B3', 'B4', 'B5'
  domain: string;
  title: string;
  slug: string;
  desc: string;
  competences: string[];
  keyFormula?: string;
  wolofInsight?: string;
  status: 'published';
  lessons: SvtLessonItem[];
}

export const SVT_SUBJECT_ID = '40000000-0000-0000-0000-000000000003';

export const SVT_DOMAINS = [
  {
    number: 1,
    title: 'Neurophysiologie & Comportement',
    badge: 'Axe 1',
    description: 'Organisation du système nerveux cérébrospinal, tissu nerveux, transmission synaptique et activité réflexe.',
    chapterCodes: ['B1'],
  },
  {
    number: 2,
    title: 'Physiologie Cardiovasculaire',
    badge: 'Axe 2',
    description: 'Automatisme cardiaque, régulation nerveuse et hormonale, homéostasie de la pression artérielle.',
    chapterCodes: ['B2'],
  },
  {
    number: 3,
    title: 'Immunologie & Défense de l’Organisme',
    badge: 'Axe 3',
    description: 'Immunité innée et adaptative (humorale et cellulaire), mémoire immunitaire et dysfonctionnements (VIH, allergies).',
    chapterCodes: ['B3'],
  },
  {
    number: 4,
    title: 'Reproduction & Endocrinologie',
    badge: 'Axe 4',
    description: 'Gamétogenèse, régulation hormonale des cycles sexuels chez l’homme et la femme, procréation et maîtrise médicale.',
    chapterCodes: ['B4'],
  },
  {
    number: 5,
    title: 'Génétique & Biotechnologies',
    badge: 'Axe 5',
    description: 'Hérédité humaine et généalogie, expression du message génétique (ADN, transcription, traduction) et génie génétique (OGM).',
    chapterCodes: ['B5'],
  },
];

export const SVT_CHAPTERS: SvtChapterItem[] = [
  // =========================================================================
  // AXE 1 : B1 - Organisation et fonctionnement du système nerveux
  // =========================================================================
  {
    id: '50000000-0000-0003-0001-000000000001',
    order_index: 1,
    code: 'B1',
    domain: 'Neurophysiologie',
    title: 'B1 : Organisation et fonctionnement du système nerveux',
    slug: 'systeme-nerveux',
    desc: 'Organisation du système nerveux cérébrospinal (encéphale, moelle épinière, nerfs), neurone, potentiels bioélectriques (repos et action), synapse et transmission chimique, activité réflexe (médullaire et conditionnelle).',
    competences: [
      'Identifier les centres nerveux (encéphale, moelle épinière) et les voies afférentes/efférentes',
      'Expliquer l’origine ionique du potentiel de repos (-70 mV) et du potentiel d’action',
      'Décrire le mécanisme de la transmission synaptique chimique et l’intégration postsynaptique (PPSE, PPSI)',
      'Schématiser l’arc réflexe médullaire et analyser les réflexes conditionnels pavloviens',
    ],
    keyFormula: 'PR = -70\\text{ mV} \\quad (\\text{pompe } Na^+/K^+) \\qquad PA : \\text{dépolarisation (+30 mV) } \\to \\text{repolarisation } \\to \\text{hyperpolarisation}',
    wolofInsight: 'Xel mi ak yaram bi : yoonu xibaar bi (influx nerveux) dafa melni courant électrique bu daw ci fil (axone), waaye bu eggee ci péxé yi (synapse), dafay turned melni messager (neurotransmetteur) buy joxe baat ci benen neurone !',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0003-0001-000000000001',
        title: 'Organisation du système nerveux cérébrospinal des mammifères (encéphale, moelle, nerfs)',
        order_index: 1,
        is_free: true,
        status: 'published',
      },
      {
        id: '60000000-0000-0003-0001-000000000002',
        title: 'Tissu nerveux : structure du neurone, potentiel de repos et potentiel d’action',
        order_index: 2,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0003-0001-000000000003',
        title: 'Transmission synaptique chimique et intégration nerveuse (PPSE, PPSI)',
        order_index: 3,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0003-0001-000000000004',
        title: 'Activité réflexe médullaire (réflexe myotatique) et réflexes conditionnels pavloviens',
        order_index: 4,
        is_free: false,
        status: 'published',
      },
    ],
  },

  // =========================================================================
  // AXE 2 : B2 - Activité cardiaque et régulation
  // =========================================================================
  {
    id: '50000000-0000-0003-0001-000000000002',
    order_index: 2,
    code: 'B2',
    domain: 'Physiologie Cardiovasculaire',
    title: 'B2 : Activité cardiaque et régulation de la pression artérielle',
    slug: 'activite-cardiaque-regulation',
    desc: 'Structure et automatisme cardiaque (tissu nodal, électrophysiologie), innervation cardiaque (nerfs vagues et sympathiques), régulation de la pression artérielle par boucle réflexe barosensible (sinus carotidiens, centres bulbaires).',
    competences: [
      'Expliquer l’origine intrinsèque de l’automatisme cardiaque (nœud sinusal, faisceau de His)',
      'Comparer les effets du système nerveux végétatif (parasympathique modérateur vs orthosympathique accélérateur)',
      'Analyser les expériences de stimulation et de section nerveuse (nerfs de Cyon, de Hering, vagues)',
      'Construire le schéma fonctionnel de la boucle de régulation de la pression artérielle à court terme',
    ],
    keyFormula: 'PA = DC \\times RPT \\quad \\text{avec } DC = FC \\times VES \\qquad \\Delta P \\to \\text{barorécepteurs } \\to \\text{centre bulbaire}',
    wolofInsight: 'Xol bi mooy pompe bu mag bi ci yaram bi : amna moteur boppam (automatisme cardiaque), waaye cerveau bi mooy accélérateur (sympathique) ak frein bi (parasympathique) ngir réglé pression bi saa su nekk !',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0003-0002-000000000001',
        title: 'Anatomie, révolution cardiaque et mécanisme de l’automatisme cardiaque (tissu nodal)',
        order_index: 1,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0003-0002-000000000002',
        title: 'Innervation et régulation nerveuse et hormonale de l’activité cardiaque',
        order_index: 2,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0003-0002-000000000003',
        title: 'Régulation réflexe de la pression artérielle : barorécepteurs, centres bulbaires et effecteurs',
        order_index: 3,
        is_free: false,
        status: 'published',
      },
    ],
  },

  // =========================================================================
  // AXE 3 : B3 - Intégrité de l’organisme et Immunologie
  // =========================================================================
  {
    id: '50000000-0000-0003-0001-000000000003',
    order_index: 3,
    code: 'B3',
    domain: 'Immunologie',
    title: 'B3 : Intégrité de l’organisme et Immunologie',
    slug: 'immunologie',
    desc: 'Distinction du soi et du non-soi (système HLA/CMH), immunité innée non spécifique (phagocytose, réaction inflammatoire), immunité adaptative spécifique humorale (LB, anticorps) et cellulaire (LT8, cytotoxicité), coopération cellulaire (LT4) et dysfonctionnements (allergies, VIH/SIDA).',
    competences: [
      'Définir le complexe majeur d’histocompatibilité (CMH / HLA) et la reconnaissance du non-soi',
      'Détailler les 4 étapes de la phagocytose et la réponse inflammatoire aiguë',
      'Expliquer la structure d’un anticorps et la neutralisation antigénique par les plasmocytes',
      'Décrire le rôle pivot des lymphocytes T4 (auxiliaires) et le mode d’action du virus VIH',
    ],
    keyFormula: '\\text{Antigène} + \\text{Anticorps} \\to \\text{Complexe immun} \\qquad LT4 \\xrightarrow{IL-2} \\text{coopération} \\to LB \\text{ et } LT8',
    wolofInsight: 'Système immunitaire bi mooy armée réw mi : phagocytes yi ñoo jëkkë xeex (immunité innée), su jàllee LB yi def ay missil yu ciblé (anticorps), LT8 yi ray cellules infectées yi, té LT4 mooy général de guerre bi coordiné lepp !',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0003-0003-000000000001',
        title: 'Reconnaissance du soi et du non-soi (CMH/HLA) et immunité innée (inflammation, phagocytose)',
        order_index: 1,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0003-0003-000000000002',
        title: 'Immunité adaptative humorale : lymphocytes B, sélection clonale et complexe antigène-anticorps',
        order_index: 2,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0003-0003-000000000003',
        title: 'Immunité adaptative cellulaire : lymphocytes T cytotoxiques et rôle central pivot des LT4',
        order_index: 3,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0003-0003-000000000004',
        title: 'Dysfonctionnements immunitaires : allergies, maladies auto-immunes et cycle infectieux du VIH/SIDA',
        order_index: 4,
        is_free: false,
        status: 'published',
      },
    ],
  },

  // =========================================================================
  // AXE 4 : B4 - Reproduction et endocrinologie
  // =========================================================================
  {
    id: '50000000-0000-0003-0001-000000000004',
    order_index: 4,
    code: 'B4',
    domain: 'Endocrinologie & Reproduction',
    title: 'B4 : Reproduction et endocrinologie humaine',
    slug: 'reproduction-endocrinologie',
    desc: 'Gamétogenèse (spermatogenèse continue vs ovogenèse cyclique), cycles sexuels féminins (ovarien et utérin), régulation neurohormonale (axe hypothalamo-hypophysaire, GnRH, FSH, LH, rétrocontrôles), fécondation, gestation, accouchement et maîtrise de la reproduction.',
    competences: [
      'Comparer les étapes cellulaires de la spermatogenèse et de l’ovogenèse',
      'Analyser l’évolution des hormones ovariennes (œstrogènes, progestérone) et hypophysaires (FSH, LH)',
      'Expliquer le pic ovulatoire de LH par rétrocontrôle positif des œstrogènes',
      'Distinguer les méthodes de contraception préventive, d’urgence et l’Assistance Médicale à la Procréation (FIVETE)',
    ],
    keyFormula: '\\text{GnRH} \\to \\text{FSH/LH} \\to \\text{Gonades (Stéroïdes)} \\xrightarrow{\\text{rétrocontrôle - / +}} \\text{Axe HH}',
    wolofInsight: 'Axe hypothalamo-hypophysaire bi dafa melni télécommande : GnRH ci xel mi mooy déclenché FSH ak LH, gonades yi tontu ak hormones, su béré retrocontrôle négatif diko délo ci ordre ngir yaram bi gardé équilibre bi !',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0003-0004-000000000001',
        title: 'Gamétogenèse comparée chez l’homme et la femme : spermatogenèse, ovogenèse et méiose',
        order_index: 1,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0003-0004-000000000002',
        title: 'Cycles sexuels chez la femme et régulation hormonale de l’axe hypothalamo-hypophyso-ovarien',
        order_index: 2,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0003-0004-000000000003',
        title: 'De la fécondation à la lactation : nidation, gestation, hormones placentaires (HCG) et accouchement',
        order_index: 3,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0003-0004-000000000004',
        title: 'Maîtrise de la reproduction : contraception hormonale, contragestion et Assistance Médicale à la Procréation (AMP)',
        order_index: 4,
        is_free: false,
        status: 'published',
      },
    ],
  },

  // =========================================================================
  // AXE 5 : B5 - Génétique et biotechnologies
  // =========================================================================
  {
    id: '50000000-0000-0003-0001-000000000005',
    order_index: 5,
    code: 'B5',
    domain: 'Génétique & Biotechnologies',
    title: 'B5 : Génétique humaine et biotechnologies',
    slug: 'genetique-biotechnologies',
    desc: 'Génétique humaine et transmission des caractères héréditaires, analyse des arbres généalogiques (maladies autosomiques et liées au sexe X), réplication semi-conservative de l’ADN, transcription, traduction (code génétique) et outils du génie génétique (enzymes de restriction, clonage, OGM).',
    competences: [
      'Interpréter un arbre généalogique pour déterminer le mode de transmission d’une tare héréditaire (dominant/récessif, gonosomique/autosomique)',
      'Calculer les probabilités génétiques pour un couple d’avoir un enfant atteint',
      'Détailler les étapes de l’expression génique : transcription (ARNm) et traduction ribosomique',
      'Expliquer le principe de la transgénèse et du clonage moléculaire (plasmide recombinant, PCR, OGM)',
    ],
    keyFormula: '\\text{ADN} \\xrightarrow{\\text{Transcription}} \\text{ARNm} \\xrightarrow{\\text{Traduction (Code génétique)}} \\text{Protéine}',
    wolofInsight: 'ADN bi mooy livre d’or bou bind yaram bi : codé nako ci 4 lettres (A, T, C, G). ARNm bi mooy photocopie bi, ribosomes yi traduire ko def ko ay protéines yu am rôle ci sunu santé ak sunu yaram !',
    status: 'published',
    lessons: [
      {
        id: '60000000-0000-0003-0005-000000000001',
        title: 'Hérédité humaine et analyse rigoureuse des arbres généalogiques (maladies génétiques)',
        order_index: 1,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0003-0005-000000000002',
        title: 'Acides nucléiques et expression de l’information génétique : réplication, transcription et traduction',
        order_index: 2,
        is_free: false,
        status: 'published',
      },
      {
        id: '60000000-0000-0003-0005-000000000003',
        title: 'Génie génétique et biotechnologies : enzymes de restriction, clonage, OGM et applications biomédicales',
        order_index: 3,
        is_free: false,
        status: 'published',
      },
    ],
  },
];

/**
 * Synchronise les chapitres et leçons de SVT dans Supabase si nécessaire.
 */
export async function ensureSvtInDatabase(admin: any) {
  try {
    // 1. Récupérer ou insérer le sujet SVT
    const { data: existingSub } = await admin
      .from('subjects')
      .select('id')
      .eq('code', 'svt')
      .maybeSingle();

    let targetSubjectId = existingSub?.id || SVT_SUBJECT_ID;

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
            id: SVT_SUBJECT_ID,
            name: 'Sciences de la Vie et de la Terre (SVT)',
            code: 'svt',
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

    // 2. Insérer/vérifier tous les Chapitres et leçons du programme SVT
    for (const chap of SVT_CHAPTERS) {
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
    console.error('Erreur ensureSvtInDatabase:', err);
    return SVT_SUBJECT_ID;
  }
}
