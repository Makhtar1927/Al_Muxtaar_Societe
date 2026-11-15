'use client';

import React, { useState } from 'react';
import {
  Dna,
  Users,
  GitBranch,
  Activity,
  CheckCircle2,
  AlertCircle,
  FlaskConical,
  Layers,
  Calculator,
  ChevronRight,
  Shield,
  HelpCircle,
} from 'lucide-react';

type PedigreeKey = 'autosomal_recessif' | 'gonosomique_x' | 'autosomal_dominant';

interface PedigreeCase {
  title: string;
  badge: string;
  mode: string;
  modeColor: string;
  maladie: string;
  description: string;
  clues: string[];
  conclusion: string;
  bacTip: string;
}

const PEDIGREES: Record<PedigreeKey, PedigreeCase> = {
  autosomal_recessif: {
    title: 'Arbre 1 • Tare Autosomique Récessive',
    badge: 'Cas classique n°1',
    mode: 'Autosomique Récessif',
    modeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    maladie: 'Drépanocytose / Mucoviscidose / Albinisme oculo-cutané',
    description:
      'Dans cette famille, deux parents phénotypiquement sains (I-1 et I-2) donnent naissance à 4 enfants, dont une fille saine (II-1), un fils atteint (II-3) et deux enfants sains (II-2, II-4). La tare saute une génération.',
    clues: [
      'Parents I-1 et I-2 sains donnant un enfant II-3 malade → L’allèle responsable de la tare est récessif (m < N).',
      'Les parents sont obligatoirement hétérozygotes porteurs : Génotypes N//m.',
      'L’enfant malade II-3 est homozygote récessif : Génotype m//m.',
      'Le gène n’est pas lié à Y car une fille malade existe dans les branches collatérales et les pères sains peuvent avoir des fils malades.',
      'Le gène n’est pas lié à X récessif : si c’était lié à X, toute fille malade m//m aurait obligatoirement un père malade (Xm/Y) ; or les pères sont sains.',
      'Probabilité pour deux parents N//m d’avoir un enfant malade : 1/4 (25%).',
    ],
    conclusion:
      'Conclusion formelle : Le gène est localisé sur un autosome, et l’allèle responsable de l’affection est récessif face à l’allèle normal.',
    bacTip:
      'Pour justifier l’exclusion de la liaison à X récessif au Bac : recherchez systématiquement une fille malade dans l’arbre et vérifiez le phénotype de son père. Si le père est sain, l’hypothèse X récessif est immédiatement détruite.',
  },
  gonosomique_x: {
    title: 'Arbre 2 • Tare Gonosomique Récessive Liée à X',
    badge: 'Cas classique n°2',
    mode: 'Gonosomique Lié à X Récessif',
    modeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    maladie: 'Hémophilie A / Daltonisme / Myopathie de Duchenne',
    description:
      'La tare ne touche que les garçons de la descendance. Une mère saine (I-2) a un père hémophile décédé et transmet l’allèle à 50% de ses fils (II-2 atteint), tandis que ses filles sont toutes saines mais conductrices.',
    clues: [
      'Deux parents sains (I-1 et I-2) ont un fils atteint (II-2) → Allèle récessif (m < N).',
      'Seuls les individus de sexe masculin expriment la maladie dans l’arbre (atteinte asymétrique marquée).',
      'La mère I-2 est conductrice hétérozygote : Génotype XN//Xm.',
      'Le père I-1 est sain hémi-zygote : Génotype XN//Y. Il ne transmet son chromosome Y qu’à ses fils, donc il ne peut pas transmettre la tare à ses garçons.',
      'Les fils reçoivent le chromosome X de leur mère : 50% de risque de recevoir Xm et d’être malades (Xm//Y).',
      'Toutes les filles d’un père malade sont obligatoirement conductrices car le père leur lègue son unique chromosome Xm.',
    ],
    conclusion:
      'Conclusion formelle : Le gène est localisé sur la partie spécifique du chromosome X, l’allèle de la maladie est récessif.',
    bacTip:
      'Règle d’or du Bac S2 : un homme atteint d’une tare liée à X récessif ne peut JAMAIS transmettre la maladie à ses fils, car il leur transmet son chromosome Y ! C’est la transmission croisée mère conductrice → fils malade.',
  },
  autosomal_dominant: {
    title: 'Arbre 3 • Tare Autosomique Dominante',
    badge: 'Cas classique n°3',
    mode: 'Autosomique Dominant',
    modeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    maladie: 'Maladie de Huntington / Achondroplasie / Polydactylie',
    description:
      'La tare est présente dans toutes les générations consécutives sans aucun saut. Tout individu atteint a au moins un de ses deux parents atteint. Les hommes et les femmes sont touchés à égale proportion.',
    clues: [
      'Tout individu malade a au moins un parent malade → La tare ne saute aucune génération.',
      'Deux parents malades (II-1 et II-2) ont un enfant sain (III-3) → PREUVE ABSOLUE que la maladie est DOMINANTE (M > n). Si elle était récessive, deux malades donneraient 100% d’enfants malades.',
      'Les parents malades ayant un enfant sain sont hétérozygotes : Génotypes M//n.',
      'L’enfant sain III-3 est homozygote récessif normal : Génotype n//n.',
      'Un père malade a un fils sain et une fille saine → Élimine la liaison à Y.',
      'Un père malade (I-1) a des fils malades (II-3) : élimine la liaison à X récessif.',
    ],
    conclusion:
      'Conclusion formelle : L’allèle mutant est dominant (M > n) et le locus est situé sur un autosome.',
    bacTip:
      'La preuve irréfutable de dominance au Bac : trouvez un couple de parents TOUS DEUX MALADES qui donnent un ENFANT SAIN. Cela prouve à 100% que l’allèle normal est récessif et l’allèle de la tare est dominant.',
  },
};

type AlleleVal = 'N' | 'm';

interface PunnettCross {
  label: string;
  description: string;
  pere: [AlleleVal, AlleleVal];
  mere: [AlleleVal, AlleleVal];
}

const PUNNETT_CROSSES: PunnettCross[] = [
  {
    label: 'N//m × N//m',
    description: 'Deux parents hétérozygotes porteurs sains (Cas classique drépanocytose)',
    pere: ['N', 'm'],
    mere: ['N', 'm'],
  },
  {
    label: 'N//m × m//m',
    description: 'Parent porteur sain croisé avec un parent homozygote malade (Back-cross)',
    pere: ['N', 'm'],
    mere: ['m', 'm'],
  },
  {
    label: 'N//N × N//m',
    description: 'Parent sain homozygote croisé avec un parent hétérozygote',
    pere: ['N', 'N'],
    mere: ['N', 'm'],
  },
  {
    label: 'm//m × m//m',
    description: 'Deux parents malades récessifs (100% d’enfants atteints attendus)',
    pere: ['m', 'm'],
    mere: ['m', 'm'],
  },
];

export default function B5GenetiqueArbresInteractiveLab() {
  const [activePedigree, setActivePedigree] = useState<PedigreeKey>('autosomal_recessif');
  const [crossIndex, setCrossIndex] = useState<number>(0);
  const [meiosisStage, setMeiosisStage] = useState<'MI' | 'MII'>('MI');

  const pedigree = PEDIGREES[activePedigree];
  const activeCross = PUNNETT_CROSSES[crossIndex];

  // Calculs grille Punnett
  const gametesPere = activeCross.pere;
  const gametesMere = activeCross.mere;
  const cells = [
    [gametesPere[0] + '/' + gametesMere[0], gametesPere[0] + '/' + gametesMere[1]],
    [gametesPere[1] + '/' + gametesMere[0], gametesPere[1] + '/' + gametesMere[1]],
  ];

  // Normalisation des génotypes (mettre N avant m)
  const normalize = (g: string) => {
    const parts = g.split('/');
    if (parts[0] === 'm' && parts[1] === 'N') return 'N//m';
    return parts[0] + '//' + parts[1];
  };

  const allGenotypes = cells.flat().map(normalize);
  const countSains = allGenotypes.filter((g) => g === 'N//N').length;
  const countPorteurs = allGenotypes.filter((g) => g === 'N//m').length;
  const countMalades = allGenotypes.filter((g) => g === 'm//m').length;

  return (
    <div className="my-10 rounded-3xl bg-white border border-navy/10 p-5 sm:p-7 shadow-sm">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/10 pb-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-3 py-1 text-xs font-bold text-navy mb-1 border border-navy/10">
            <FlaskConical className="w-3.5 h-3.5 text-turquoise" />
            <span>Laboratoire Interactif &amp; Simulateur Génétique</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-navy">
            Hérédité Humaine : Pedigrees, Punnett &amp; Caryotypes
          </h3>
          <p className="text-xs sm:text-sm text-text/70 mt-0.5">
            Schémas anatomiques et génétiques complets : décryptage d’arbres généalogiques, calculs d’échiquiers et non-disjonctions de la trisomie 21.
          </p>
        </div>
      </div>

      {/* MODULE 1 : Analyseur Interactif d'Arbres Généalogiques */}
      <div className="mb-8 rounded-2xl border border-navy/10 bg-surface/30 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-navy/10 pb-3 mb-5">
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-turquoise" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-text/50">Module 1</span>
            <h4 className="text-base sm:text-lg font-black text-navy">
              Décodeur de Pedigrees : 3 Modes de Transmission au Bac S2
            </h4>
          </div>
          <span className="text-xs text-text/60 font-semibold">{pedigree.maladie}</span>
        </div>

        {/* Boutons de sélection du Pedigree */}
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 mb-5">
          {(Object.keys(PEDIGREES) as PedigreeKey[]).map((key) => {
            const item = PEDIGREES[key];
            const isSelected = activePedigree === key;
            return (
              <button
                key={key}
                onClick={() => setActivePedigree(key)}
                className={`rounded-2xl p-3 text-left transition-all border ${
                  isSelected
                    ? 'bg-navy text-white border-navy shadow-sm'
                    : 'bg-white text-navy/80 border-navy/10 hover:bg-surface hover:border-navy/20'
                }`}
              >
                <span
                  className={`block text-[10px] font-bold uppercase tracking-wider ${
                    isSelected ? 'text-turquoise' : 'text-text/50'
                  }`}
                >
                  {item.badge}
                </span>
                <span className="mt-1 block text-xs font-bold leading-tight">
                  {item.mode}
                </span>
              </button>
            );
          })}
        </div>

        {/* Schéma SVG Illustratif du Pedigree */}
        <div className="rounded-2xl border border-navy/10 bg-white p-4 mb-4 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-text/50 mb-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-turquoise" />
              <span>Arbre généalogique officiel — {pedigree.title}</span>
            </div>
            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${pedigree.modeColor}`}>
              {pedigree.mode}
            </span>
          </div>

          {activePedigree === 'autosomal_recessif' && (
            <svg viewBox="0 0 460 210" className="w-full max-w-lg mx-auto" aria-label="Arbre autosomique récessif">
              {/* Génération I */}
              <text x="25" y="45" fontSize="11" fill="#6b7280" fontWeight="bold">I</text>
              {/* I-1 Père sain porteur N//m */}
              <rect x="100" y="25" width="32" height="32" rx="3" fill="#ffffff" stroke="#0a1628" strokeWidth="2"/>
              <text x="116" y="73" textAnchor="middle" fontSize="8" fill="#0a1628" fontWeight="bold">I-1</text>
              <text x="116" y="83" textAnchor="middle" fontSize="7" fill="#6b7280">N//m</text>
              {/* Ligne d'union I-1 et I-2 */}
              <line x1="132" y1="41" x2="230" y2="41" stroke="#0a1628" strokeWidth="2"/>
              {/* I-2 Mère saine porteuse N//m */}
              <circle cx="246" cy="41" r="16" fill="#ffffff" stroke="#0a1628" strokeWidth="2"/>
              <text x="246" y="73" textAnchor="middle" fontSize="8" fill="#0a1628" fontWeight="bold">I-2</text>
              <text x="246" y="83" textAnchor="middle" fontSize="7" fill="#6b7280">N//m</text>
              {/* Descente de l'union */}
              <line x1="181" y1="41" x2="181" y2="95" stroke="#0a1628" strokeWidth="2"/>
              <line x1="70" y1="95" x2="380" y2="95" stroke="#0a1628" strokeWidth="2"/>

              {/* Génération II */}
              <text x="25" y="125" fontSize="11" fill="#6b7280" fontWeight="bold">II</text>
              {/* II-1 Fille saine */}
              <line x1="70" y1="95" x2="70" y2="110" stroke="#0a1628" strokeWidth="2"/>
              <circle cx="70" cy="126" r="16" fill="#ffffff" stroke="#0a1628" strokeWidth="2"/>
              <text x="70" y="156" textAnchor="middle" fontSize="8" fill="#0a1628" fontWeight="bold">II-1</text>
              <text x="70" y="166" textAnchor="middle" fontSize="7" fill="#6b7280">N//?</text>

              {/* II-2 Garçon sain */}
              <line x1="160" y1="95" x2="160" y2="110" stroke="#0a1628" strokeWidth="2"/>
              <rect x="144" y="110" width="32" height="32" rx="3" fill="#ffffff" stroke="#0a1628" strokeWidth="2"/>
              <text x="160" y="156" textAnchor="middle" fontSize="8" fill="#0a1628" fontWeight="bold">II-2</text>
              <text x="160" y="166" textAnchor="middle" fontSize="7" fill="#6b7280">N//?</text>

              {/* II-3 Garçon atteint (plein noir) */}
              <line x1="260" y1="95" x2="260" y2="110" stroke="#0a1628" strokeWidth="2"/>
              <rect x="244" y="110" width="32" height="32" rx="3" fill="#0a1628" stroke="#0a1628" strokeWidth="2"/>
              <text x="260" y="156" textAnchor="middle" fontSize="8" fill="#0a1628" fontWeight="bold">II-3</text>
              <text x="260" y="166" textAnchor="middle" fontSize="7" fill="#b91c1c" fontWeight="bold">m//m [m]</text>

              {/* II-4 Fille saine */}
              <line x1="380" y1="95" x2="380" y2="110" stroke="#0a1628" strokeWidth="2"/>
              <circle cx="380" cy="126" r="16" fill="#ffffff" stroke="#0a1628" strokeWidth="2"/>
              <text x="380" y="156" textAnchor="middle" fontSize="8" fill="#0a1628" fontWeight="bold">II-4</text>
              <text x="380" y="166" textAnchor="middle" fontSize="7" fill="#6b7280">N//?</text>

              {/* Légende en bas */}
              <rect x="90" y="185" width="12" height="12" fill="#ffffff" stroke="#0a1628" strokeWidth="1.5"/>
              <text x="108" y="194" fontSize="7.5" fill="#374151">Homme sain</text>
              <circle cx="180" cy="191" r="6" fill="#ffffff" stroke="#0a1628" strokeWidth="1.5"/>
              <text x="192" y="194" fontSize="7.5" fill="#374151">Femme saine</text>
              <rect x="265" y="185" width="12" height="12" fill="#0a1628" stroke="#0a1628" strokeWidth="1.5"/>
              <text x="283" y="194" fontSize="7.5" fill="#0a1628" fontWeight="bold">Homme atteint [m]</text>
            </svg>
          )}

          {activePedigree === 'gonosomique_x' && (
            <svg viewBox="0 0 460 210" className="w-full max-w-lg mx-auto" aria-label="Arbre lié à X récessif">
              {/* Génération I */}
              <text x="25" y="45" fontSize="11" fill="#6b7280" fontWeight="bold">I</text>
              <rect x="100" y="25" width="32" height="32" rx="3" fill="#ffffff" stroke="#0a1628" strokeWidth="2"/>
              <text x="116" y="73" textAnchor="middle" fontSize="8" fill="#0a1628" fontWeight="bold">I-1</text>
              <text x="116" y="83" textAnchor="middle" fontSize="7" fill="#6b7280">XN//Y</text>
              <line x1="132" y1="41" x2="230" y2="41" stroke="#0a1628" strokeWidth="2"/>
              {/* I-2 Mère conductrice : cercle avec point central */}
              <circle cx="246" cy="41" r="16" fill="#ffffff" stroke="#0a1628" strokeWidth="2"/>
              <circle cx="246" cy="41" r="6" fill="#be185d"/>
              <text x="246" y="73" textAnchor="middle" fontSize="8" fill="#0a1628" fontWeight="bold">I-2</text>
              <text x="246" y="83" textAnchor="middle" fontSize="7" fill="#be185d" fontWeight="bold">XN//Xm (Conductrice)</text>
              <line x1="181" y1="41" x2="181" y2="95" stroke="#0a1628" strokeWidth="2"/>
              <line x1="90" y1="95" x2="360" y2="95" stroke="#0a1628" strokeWidth="2"/>

              {/* Génération II */}
              <text x="25" y="125" fontSize="11" fill="#6b7280" fontWeight="bold">II</text>
              {/* II-1 Fille conductrice */}
              <line x1="90" y1="95" x2="90" y2="110" stroke="#0a1628" strokeWidth="2"/>
              <circle cx="90" cy="126" r="16" fill="#ffffff" stroke="#0a1628" strokeWidth="2"/>
              <circle cx="90" cy="126" r="6" fill="#be185d"/>
              <text x="90" y="156" textAnchor="middle" fontSize="8" fill="#0a1628" fontWeight="bold">II-1</text>
              <text x="90" y="166" textAnchor="middle" fontSize="7" fill="#be185d">XN//Xm</text>

              {/* II-2 Garçon atteint (plein noir) */}
              <line x1="180" y1="95" x2="180" y2="110" stroke="#0a1628" strokeWidth="2"/>
              <rect x="164" y="110" width="32" height="32" rx="3" fill="#0a1628" stroke="#0a1628" strokeWidth="2"/>
              <text x="180" y="156" textAnchor="middle" fontSize="8" fill="#0a1628" fontWeight="bold">II-2</text>
              <text x="180" y="166" textAnchor="middle" fontSize="7" fill="#b91c1c" fontWeight="bold">Xm//Y [m]</text>

              {/* II-3 Garçon sain */}
              <line x1="270" y1="95" x2="270" y2="110" stroke="#0a1628" strokeWidth="2"/>
              <rect x="254" y="110" width="32" height="32" rx="3" fill="#ffffff" stroke="#0a1628" strokeWidth="2"/>
              <text x="270" y="156" textAnchor="middle" fontSize="8" fill="#0a1628" fontWeight="bold">II-3</text>
              <text x="270" y="166" textAnchor="middle" fontSize="7" fill="#6b7280">XN//Y</text>

              {/* II-4 Fille saine */}
              <line x1="360" y1="95" x2="360" y2="110" stroke="#0a1628" strokeWidth="2"/>
              <circle cx="360" cy="126" r="16" fill="#ffffff" stroke="#0a1628" strokeWidth="2"/>
              <text x="360" y="156" textAnchor="middle" fontSize="8" fill="#0a1628" fontWeight="bold">II-4</text>
              <text x="360" y="166" textAnchor="middle" fontSize="7" fill="#6b7280">XN//X?</text>

              {/* Légende */}
              <circle cx="90" cy="190" r="6" fill="#ffffff" stroke="#0a1628" strokeWidth="1.5"/>
              <circle cx="90" cy="190" r="3" fill="#be185d"/>
              <text x="104" y="193" fontSize="7.5" fill="#be185d">Femme conductrice</text>
              <rect x="230" y="184" width="12" height="12" fill="#0a1628" stroke="#0a1628" strokeWidth="1.5"/>
              <text x="248" y="193" fontSize="7.5" fill="#0a1628" fontWeight="bold">Homme atteint Xm//Y</text>
            </svg>
          )}

          {activePedigree === 'autosomal_dominant' && (
            <svg viewBox="0 0 460 210" className="w-full max-w-lg mx-auto" aria-label="Arbre autosomique dominant">
              {/* Génération I */}
              <text x="25" y="45" fontSize="11" fill="#6b7280" fontWeight="bold">I</text>
              {/* I-1 Père atteint (plein noir) */}
              <rect x="100" y="25" width="32" height="32" rx="3" fill="#0a1628" stroke="#0a1628" strokeWidth="2"/>
              <text x="116" y="73" textAnchor="middle" fontSize="8" fill="#0a1628" fontWeight="bold">I-1</text>
              <text x="116" y="83" textAnchor="middle" fontSize="7" fill="#b91c1c" fontWeight="bold">M//n [M]</text>
              <line x1="132" y1="41" x2="230" y2="41" stroke="#0a1628" strokeWidth="2"/>
              {/* I-2 Mère atteinte (pleine noire) */}
              <circle cx="246" cy="41" r="16" fill="#0a1628" stroke="#0a1628" strokeWidth="2"/>
              <text x="246" y="73" textAnchor="middle" fontSize="8" fill="#0a1628" fontWeight="bold">I-2</text>
              <text x="246" y="83" textAnchor="middle" fontSize="7" fill="#b91c1c" fontWeight="bold">M//n [M]</text>
              <line x1="181" y1="41" x2="181" y2="95" stroke="#0a1628" strokeWidth="2"/>
              <line x1="80" y1="95" x2="380" y2="95" stroke="#0a1628" strokeWidth="2"/>

              {/* Génération II */}
              <text x="25" y="125" fontSize="11" fill="#6b7280" fontWeight="bold">II</text>
              {/* II-1 Fille atteinte */}
              <line x1="80" y1="95" x2="80" y2="110" stroke="#0a1628" strokeWidth="2"/>
              <circle cx="80" cy="126" r="16" fill="#0a1628" stroke="#0a1628" strokeWidth="2"/>
              <text x="80" y="156" textAnchor="middle" fontSize="8" fill="#0a1628" fontWeight="bold">II-1</text>
              <text x="80" y="166" textAnchor="middle" fontSize="7" fill="#b91c1c">M//?</text>

              {/* II-2 Garçon atteint */}
              <line x1="180" y1="95" x2="180" y2="110" stroke="#0a1628" strokeWidth="2"/>
              <rect x="164" y="110" width="32" height="32" rx="3" fill="#0a1628" stroke="#0a1628" strokeWidth="2"/>
              <text x="180" y="156" textAnchor="middle" fontSize="8" fill="#0a1628" fontWeight="bold">II-2</text>
              <text x="180" y="166" textAnchor="middle" fontSize="7" fill="#b91c1c">M//?</text>

              {/* II-3 Fille SAINE (Preuve de dominance) */}
              <line x1="280" y1="95" x2="280" y2="110" stroke="#0a1628" strokeWidth="2"/>
              <circle cx="280" cy="126" r="16" fill="#ffffff" stroke="#059669" strokeWidth="3"/>
              <text x="280" y="156" textAnchor="middle" fontSize="8" fill="#059669" fontWeight="bold">II-3 (Saine !)</text>
              <text x="280" y="166" textAnchor="middle" fontSize="7" fill="#059669" fontWeight="bold">n//n [sain]</text>

              {/* II-4 Garçon atteint */}
              <line x1="380" y1="95" x2="380" y2="110" stroke="#0a1628" strokeWidth="2"/>
              <rect x="364" y="110" width="32" height="32" rx="3" fill="#0a1628" stroke="#0a1628" strokeWidth="2"/>
              <text x="380" y="156" textAnchor="middle" fontSize="8" fill="#0a1628" fontWeight="bold">II-4</text>
              <text x="380" y="166" textAnchor="middle" fontSize="7" fill="#b91c1c">M//?</text>

              {/* Légende */}
              <circle cx="120" cy="190" r="6" fill="#0a1628" stroke="#0a1628" strokeWidth="1.5"/>
              <text x="134" y="193" fontSize="7.5" fill="#0a1628">Individu atteint [M]</text>
              <circle cx="270" cy="190" r="6" fill="#ffffff" stroke="#059669" strokeWidth="2"/>
              <text x="284" y="193" fontSize="7.5" fill="#059669" fontWeight="bold">Enfant sain issu de 2 atteints = PREUVE M &gt; n</text>
            </svg>
          )}
        </div>

        {/* Panneau d'indices méthodologiques */}
        <div className="rounded-2xl border border-navy/10 bg-white p-4">
          <p className="text-xs text-text/80 leading-relaxed mb-4">{pedigree.description}</p>
          <div className="grid gap-2 sm:grid-cols-2 mb-4">
            {pedigree.clues.map((clue, idx) => (
              <div key={idx} className="flex items-start gap-2.5 rounded-xl bg-surface/50 p-2.5 border border-navy/10">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-turquoise/10 text-[10px] font-bold text-turquoise border border-turquoise/20">
                  {idx + 1}
                </span>
                <span className="text-xs text-text/80 leading-relaxed">{clue}</span>
              </div>
            ))}
          </div>

          <div className="rounded-xl bg-turquoise/5 border border-turquoise/20 p-3 mb-3">
            <p className="text-xs font-bold text-navy leading-relaxed">{pedigree.conclusion}</p>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-3 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-950">
              <span className="font-bold block mb-0.5">Règle de démonstration officielle au Baccalauréat sénégalais :</span>
              <p className="leading-relaxed opacity-90">{pedigree.bacTip}</p>
            </div>
          </div>
        </div>
      </div>

      {/* MODULE 2 : Simulateur d'Échiquier de Punnett */}
      <div className="mb-8 rounded-2xl border border-navy/10 bg-white p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/10 pb-3 mb-5">
          <div className="flex items-center gap-2">
            <Calculator className="w-4 h-4 text-turquoise" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-text/50">Module 2</span>
            <h4 className="text-base sm:text-lg font-black text-navy">
              Simulateur Dynamique d’Échiquier de Croisement (Punnett)
            </h4>
          </div>
          <span className="text-xs text-text/60 font-semibold">Croisement mendélien</span>
        </div>

        {/* Sélecteur de types de croisements */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 mb-5">
          {PUNNETT_CROSSES.map((cross, idx) => (
            <button
              key={idx}
              onClick={() => setCrossIndex(idx)}
              className={`rounded-2xl p-3 text-left transition-all border ${
                crossIndex === idx
                  ? 'bg-navy text-white border-navy shadow-sm'
                  : 'bg-surface/50 text-navy/80 border-navy/10 hover:bg-surface'
              }`}
            >
              <span className="block text-xs font-black font-mono">{cross.label}</span>
              <span className="text-[10px] opacity-75 mt-0.5 block truncate">{cross.description}</span>
            </button>
          ))}
        </div>

        {/* Grille de Punnett interactive */}
        <div className="rounded-2xl border border-navy/10 bg-surface/30 p-5 mb-5">
          <div className="max-w-md mx-auto">
            <div className="text-center text-xs font-bold text-navy mb-3">
              Gamètes maternels ({activeCross.mere.join(' ou ')})
            </div>
            <div className="grid grid-cols-3 gap-2 text-center">
              {/* Coin supérieur gauche vide */}
              <div className="rounded-xl bg-navy/5 border border-navy/10 p-3 text-xs font-bold text-navy/50 flex items-center justify-center">
                Père ↓ / Mère →
              </div>
              {/* En-têtes colonnes (gamètes mère) */}
              {activeCross.mere.map((m, idx) => (
                <div key={idx} className="rounded-xl bg-turquoise/10 border border-turquoise/20 p-3 text-sm font-black font-mono text-navy">
                  Gamète {m}
                </div>
              ))}
              {/* Lignes du père */}
              {activeCross.pere.map((p, pIdx) => (
                <React.Fragment key={pIdx}>
                  <div className="rounded-xl bg-blue-100/60 border border-blue-200 p-3 text-sm font-black font-mono text-blue-950 flex items-center justify-center">
                    Gamète {p}
                  </div>
                  {activeCross.mere.map((m, mIdx) => {
                    const geno = normalize(p + '/' + m);
                    const isMalade = geno === 'm//m';
                    const isPorteur = geno === 'N//m';
                    return (
                      <div
                        key={mIdx}
                        className={`rounded-xl border-2 p-3 text-center transition-all ${
                          isMalade
                            ? 'bg-rose-100 border-rose-300 text-rose-900 font-black'
                            : isPorteur
                            ? 'bg-amber-100 border-amber-300 text-amber-900 font-bold'
                            : 'bg-emerald-100 border-emerald-300 text-emerald-900 font-black'
                        }`}
                      >
                        <span className="text-sm font-mono block">{geno}</span>
                        <span className="text-[10px] mt-0.5 block uppercase tracking-wider">
                          {isMalade ? 'Atteint [m]' : isPorteur ? 'Porteur [N]' : 'Sain pur [N]'}
                        </span>
                      </div>
                    );
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Synthèse statistique des descendants */}
          <div className="mt-5 grid grid-cols-3 gap-2 max-w-md mx-auto text-center">
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-2.5">
              <span className="text-lg font-black text-emerald-800">{countSains}/4 ({countSains * 25}%)</span>
              <span className="block text-[10px] font-bold text-emerald-900/80 mt-0.5">Sains homozygotes (N//N)</span>
            </div>
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-2.5">
              <span className="text-lg font-black text-amber-800">{countPorteurs}/4 ({countPorteurs * 25}%)</span>
              <span className="block text-[10px] font-bold text-amber-900/80 mt-0.5">Porteurs sains (N//m)</span>
            </div>
            <div className="rounded-xl bg-rose-50 border border-rose-200 p-2.5">
              <span className="text-lg font-black text-rose-800">{countMalades}/4 ({countMalades * 25}%)</span>
              <span className="block text-[10px] font-bold text-rose-900/80 mt-0.5">Malades récessifs (m//m)</span>
            </div>
          </div>
        </div>
      </div>

      {/* MODULE 3 : Aberration Chromosomique & Trisomie 21 */}
      <div className="rounded-2xl border border-navy/10 bg-surface/30 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/10 pb-3 mb-5">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-turquoise" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-text/50">Module 3</span>
            <h4 className="text-base sm:text-lg font-black text-navy">
              Mécanisme de Non-Disjonction Méiotique : Origine de la Trisomie 21
            </h4>
          </div>
          {/* Sélecteur Anaphase I vs Anaphase II */}
          <div className="inline-flex rounded-xl bg-white border border-navy/10 p-1">
            <button
              onClick={() => setMeiosisStage('MI')}
              className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                meiosisStage === 'MI' ? 'bg-navy text-white' : 'text-navy/70 hover:text-navy'
              }`}
            >
              Non-Disjonction en Méiose I
            </button>
            <button
              onClick={() => setMeiosisStage('MII')}
              className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                meiosisStage === 'MII' ? 'bg-navy text-white' : 'text-navy/70 hover:text-navy'
              }`}
            >
              Non-Disjonction en Méiose II
            </button>
          </div>
        </div>

        {/* Schéma SVG Méiose Anormale */}
        <div className="rounded-2xl border border-navy/10 bg-white p-4 mb-4 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-text/50 mb-3 flex items-center gap-1.5">
            <Dna className="w-3.5 h-3.5 text-turquoise" />
            <span>
              Schéma méiotique détaillé — Non-disjonction en {meiosisStage === 'MI' ? 'Anaphase I (homologues)' : 'Anaphase II (chromatides sœurs)'}
            </span>
          </div>

          {meiosisStage === 'MI' ? (
            <svg viewBox="0 0 460 210" className="w-full max-w-lg mx-auto" aria-label="Non-disjonction Méiose I">
              {/* Cellule mère Prophase I 2n=46 */}
              <ellipse cx="65" cy="105" rx="48" ry="50" fill="#f0fdfb" stroke="#00c4b4" strokeWidth="2"/>
              <text x="65" y="70" textAnchor="middle" fontSize="8" fill="#0a1628" fontWeight="bold">Cellule mère (2n=46)</text>
              {/* Paire de chromosomes 21 dupliqués */}
              <rect x="52" y="85" width="10" height="24" rx="2" fill="#be185d"/>
              <rect x="68" y="85" width="10" height="24" rx="2" fill="#2563eb"/>
              <text x="65" y="125" textAnchor="middle" fontSize="6.5" fill="#6b7280">Paire n°21</text>
              <text x="65" y="140" textAnchor="middle" fontSize="6.5" fill="#b91c1c" fontWeight="bold">Défaut anaphase I !</text>

              {/* Télophase I : Les 2 chromosomes migrent dans la même cellule */}
              <line x1="115" y1="90" x2="160" y2="60" stroke="#b91c1c" strokeWidth="2" strokeDasharray="3 2"/>
              <ellipse cx="200" cy="55" rx="35" ry="32" fill="#fff1f2" stroke="#b91c1c" strokeWidth="2"/>
              <rect x="190" y="45" width="8" height="18" rx="2" fill="#be185d"/>
              <rect x="202" y="45" width="8" height="18" rx="2" fill="#2563eb"/>
              <text x="200" y="80" textAnchor="middle" fontSize="7" fill="#b91c1c" fontWeight="bold">Cellule disomique (n+1)</text>

              <line x1="115" y1="120" x2="160" y2="150" stroke="#6b7280" strokeWidth="1.5"/>
              <ellipse cx="200" cy="155" rx="32" ry="28" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5"/>
              <text x="200" y="158" textAnchor="middle" fontSize="7" fill="#64748b" fontWeight="bold">Nullisomique (n-1)</text>

              {/* Méiose II et Gamètes finaux */}
              <line x1="235" y1="45" x2="280" y2="35" stroke="#0a1628" strokeWidth="1.5"/>
              <ellipse cx="310" cy="35" rx="24" ry="20" fill="#fff1f2" stroke="#b91c1c" strokeWidth="1.5"/>
              <rect x="305" y="27" width="5" height="14" rx="1" fill="#be185d"/>
              <rect x="312" y="27" width="5" height="14" rx="1" fill="#2563eb"/>
              <text x="310" y="50" textAnchor="middle" fontSize="6.5" fill="#b91c1c" fontWeight="bold">n+1 (24 chr)</text>

              <line x1="235" y1="65" x2="280" y2="75" stroke="#0a1628" strokeWidth="1.5"/>
              <ellipse cx="310" cy="75" rx="24" ry="20" fill="#fff1f2" stroke="#b91c1c" strokeWidth="1.5"/>
              <rect x="305" y="67" width="5" height="14" rx="1" fill="#be185d"/>
              <rect x="312" y="67" width="5" height="14" rx="1" fill="#2563eb"/>
              <text x="310" y="90" textAnchor="middle" fontSize="6.5" fill="#b91c1c" fontWeight="bold">n+1 (24 chr)</text>

              {/* Fécondation gamète n+1 avec spermatozoïde normal (n=23) */}
              <line x1="335" y1="55" x2="375" y2="55" stroke="#059669" strokeWidth="2"/>
              <polygon points="375,52 383,55 375,58" fill="#059669"/>
              <ellipse cx="415" cy="55" rx="35" ry="32" fill="#fef3c7" stroke="#b45309" strokeWidth="2"/>
              <text x="415" y="47" textAnchor="middle" fontSize="7.5" fill="#b45309" fontWeight="bold">Zygote 2n+1=47</text>
              <text x="415" y="58" textAnchor="middle" fontSize="7" fill="#b45309" fontWeight="bold">TRISOMIE 21</text>
              <text x="415" y="70" textAnchor="middle" fontSize="6" fill="#78350f">Syndrome de Down</text>

              <text x="310" y="145" textAnchor="middle" fontSize="7" fill="#64748b">Gamètes n-1 → Monosomie 21 (léthale)</text>
            </svg>
          ) : (
            <svg viewBox="0 0 460 210" className="w-full max-w-lg mx-auto" aria-label="Non-disjonction Méiose II">
              {/* Méiose I normale */}
              <ellipse cx="65" cy="105" rx="45" ry="46" fill="#f0fdfb" stroke="#00c4b4" strokeWidth="2"/>
              <text x="65" y="75" textAnchor="middle" fontSize="8" fill="#0a1628" fontWeight="bold">Méiose I NORMALE</text>
              <rect x="60" y="95" width="10" height="22" rx="2" fill="#be185d"/>
              <text x="65" y="130" textAnchor="middle" fontSize="6.5" fill="#059669">Séparation 21 homologues OK</text>

              {/* Télophase I normale */}
              <line x1="110" y1="90" x2="160" y2="60" stroke="#059669" strokeWidth="1.5"/>
              <ellipse cx="195" cy="55" rx="30" ry="28" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5"/>
              <rect x="190" y="45" width="10" height="18" rx="2" fill="#be185d"/>
              <text x="195" y="75" textAnchor="middle" fontSize="6.5" fill="#059669">Cellule n=23</text>

              <line x1="110" y1="120" x2="160" y2="150" stroke="#059669" strokeWidth="1.5"/>
              <ellipse cx="195" cy="155" rx="30" ry="28" fill="#f0fdf4" stroke="#059669" strokeWidth="1.5"/>
              <rect x="190" y="145" width="10" height="18" rx="2" fill="#2563eb"/>
              <text x="195" y="175" textAnchor="middle" fontSize="6.5" fill="#059669">Cellule n=23</text>

              {/* Non disjonction en Méiose II sur la cellule supérieure */}
              <line x1="225" y1="45" x2="275" y2="35" stroke="#b91c1c" strokeWidth="2" strokeDasharray="3 2"/>
              <ellipse cx="305" cy="35" rx="24" ry="20" fill="#fff1f2" stroke="#b91c1c" strokeWidth="2"/>
              <rect x="300" y="27" width="4" height="14" rx="1" fill="#be185d"/>
              <rect x="306" y="27" width="4" height="14" rx="1" fill="#be185d"/>
              <text x="305" y="50" textAnchor="middle" fontSize="6.5" fill="#b91c1c" fontWeight="bold">n+1 (2 chromatides)</text>

              <line x1="225" y1="65" x2="275" y2="75" stroke="#6b7280" strokeWidth="1.5"/>
              <ellipse cx="305" cy="75" rx="24" ry="20" fill="#f8fafc" stroke="#94a3b8" strokeWidth="1.5"/>
              <text x="305" y="78" textAnchor="middle" fontSize="6.5" fill="#64748b">n-1 (0 chr 21)</text>

              {/* La cellule inférieure fait sa MII normalement */}
              <ellipse cx="305" cy="140" rx="22" ry="18" fill="#f0fdf4" stroke="#059669" strokeWidth="1"/>
              <text x="305" y="143" textAnchor="middle" fontSize="6" fill="#059669">Gamète normal n</text>
              <ellipse cx="305" cy="175" rx="22" ry="18" fill="#f0fdf4" stroke="#059669" strokeWidth="1"/>
              <text x="305" y="178" textAnchor="middle" fontSize="6" fill="#059669">Gamète normal n</text>

              {/* Fécondation */}
              <line x1="330" y1="35" x2="370" y2="35" stroke="#059669" strokeWidth="2"/>
              <polygon points="370,32 378,35 370,38" fill="#059669"/>
              <ellipse cx="410" cy="35" rx="35" ry="30" fill="#fef3c7" stroke="#b45309" strokeWidth="2"/>
              <text x="410" y="30" textAnchor="middle" fontSize="7" fill="#b45309" fontWeight="bold">Zygote 2n+1=47</text>
              <text x="410" y="42" textAnchor="middle" fontSize="6.5" fill="#b45309">Trisomie 21</text>
            </svg>
          )}
        </div>

        {/* Détails et rappel Bac S2 */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-white p-3.5 border border-navy/10 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text/50 block mb-1">
              Conséquence d’une non-disjonction en Méiose I
            </span>
            <p className="text-xs text-text/80 leading-relaxed">
              100% des gamètes produits sont anormaux : 50% de gamètes disomiques (n+1 = 24 chromosomes avec les deux allèles parentaux différents) et 50% de gamètes nullisomiques (n-1 = 22 chromosomes).
            </p>
          </div>
          <div className="rounded-xl bg-white p-3.5 border border-navy/10 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text/50 block mb-1">
              Conséquence d’une non-disjonction en Méiose II
            </span>
            <p className="text-xs text-text/80 leading-relaxed">
              Seulement 50% des gamètes sont anormaux (25% n+1 avec 2 chromatides identiques et 25% n-1), tandis que 50% des gamètes restent normaux (n = 23 chromosomes).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
