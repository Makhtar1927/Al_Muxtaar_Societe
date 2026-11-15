'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  Dna,
  Layers,
  Activity,
  AlertTriangle,
  CheckCircle2,
  GitBranch,
  BookOpen,
} from 'lucide-react';

interface Reflexe {
  id: number;
  category: string;
  categoryColor: string;
  title: string;
  trigger: string;
  regle: string;
  details: string[];
  bacTip: string;
  formula?: string;
}

const REFLEXES: Reflexe[] = [
  {
    id: 1,
    category: 'Structure & Chargaff',
    categoryColor: 'bg-blue-100 text-blue-800 border-blue-200',
    title: 'Structure de l’ADN vs ARN & Règles d’Équimolarité de Chargaff',
    trigger: 'On vous donne des pourcentages de bases azotées ou la structure d’un acide nucléique',
    regle: 'Dans tout ADN bicaténaire (double brin), la complémentarité impose A = T (2 liaisons H) et C = G (3 liaisons H). Par conséquent, le rapport (A+G)/(T+C) = 1 (purines = pyrimidines). Si A ≠ T ou si l’uracile (U) remplace la thymine (T), il s’agit d’un acide nucléique monocaténaire ou d’un ARN.',
    details: [
      'Nucléotide ADN = Désoxyribose + Acide phosphorique + Base (A, T, C, G).',
      'Nucléotide ARN = Ribose + Acide phosphorique + Base (A, U, C, G).',
      'Liaisons hydrogène inter-brins : 2 liaisons entre A et T (ou A et U), 3 liaisons entre C et G (plus stables thermiquement).',
      'Orientation antiparallèle : un brin est orienté 5’→3’, le brin complémentaire est orienté 3’→5’.',
      'Rapport de spécificité (A+T)/(C+G) est constant pour une espèce donnée, mais varie d’une espèce à l’autre.',
    ],
    bacTip: 'Au Bac S2 : si un tableau donne %A = 22%, %T = 22%, %C = 28%, %G = 28%, concluez immédiatement : « A = T et C = G, donc cet ADN est bicaténaire ». Si %A ≠ %T, concluez : « ADN monocaténaire » (comme chez certains virus).',
    formula: '\\frac{A+G}{T+C} = 1 \\quad \\text{et} \\quad A=T, \\; C=G',
  },
  {
    id: 2,
    category: 'Réplication de l’ADN',
    categoryColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    title: 'Réplication Semi-Conservative & Expérience de Meselson et Stahl',
    trigger: 'Expliquer le mécanisme de duplication de l’ADN ou interpréter des tubes de centrifugation sur gradient de CsCl',
    regle: 'Chaque molécule d’ADN fille conserve l’un des brins parentaux d’origine (brin matrice ancien) et synthétise un brin néoformé complémentaire par l’ADN polymérase dans le sens 5’→3’. À la 1ère génération en milieu léger N14, 100% de l’ADN est hybride (15N/14N) ; à la 2e génération, 50% hybride et 50% léger.',
    details: [
      'Génération 0 (milieu lourd 15N) : 1 bande unique au fond du tube (ADN 100% lourd 15N-15N).',
      'Génération 1 (milieu léger 14N) : 1 bande unique intermédiaire (ADN 100% hybride 15N-14N) $\\implies$ Élimine le modèle conservatif (qui aurait donné 2 bandes : une lourde et une légère).',
      'Génération 2 : 2 bandes d’égale intensité (50% hybride 15N-14N et 50% léger 14N-14N) $\\implies$ Élimine le modèle dispersif (qui aurait donné une seule bande devenant progressivement plus légère).',
      'Œil de réplication : ouvert par l’hélicase ; synthèse continue sur le brin précoce, discontinue (fragments d’Okazaki reliés par la ligase) sur le brin tardif.',
    ],
    bacTip: 'Démonstration incontournable au Bac : « L’existence d’une bande d’ADN hybride unique en G1 réfute le modèle conservatif. L’apparition conjointe d’une bande légère et d’une bande hybride en G2 valide définitivement le modèle semi-conservatif. »',
    formula: 'G_n : \\text{Nombre molécules } = 2^n \\implies 2 \\text{ hybrides } + (2^n - 2) \\text{ légères}',
  },
  {
    id: 3,
    category: 'Transcription',
    categoryColor: 'bg-purple-100 text-purple-800 border-purple-200',
    title: 'Transcription : Du Brin Transcrit (Matrice) à l’ARNm Pré-Messager',
    trigger: 'On vous donne deux brins d’ADN et demande d’écrire la séquence de l’ARNm',
    regle: 'Identifiez impérativement le brin transcrit (brin matrice orienté 3’→5’). L’ARN polymérase synthétise l’ARNm dans le sens 5’→3’ par stricte complémentarité : A de l’ADN donne U sur l’ARNm, T donne A, C donne G, et G donne C. L’ARNm a la même séquence que le brin non transcrit (brin codant), aux T remplacés par des U.',
    details: [
      'Sens de déplacement de l’ARN polymérase : lit le brin transcrit de 3’ vers 5’.',
      'Sens de synthèse de l’ARNm : polymérisation des ribonucléotides de 5’ vers 3’.',
      'Reconnaissance du promoteur (boîte TATA) et arrêt au terminateur.',
      'Maturation chez les eucaryotes : excision des introns (parties non codantes) et épissage des exons (parties codantes) pour donner l’ARNm mature exporté vers le cytoplasme.',
      'Si l’énoncé ne précise pas quel brin est transcrit : cherchez le codon initiateur AUG sur l’ARNm, qui correspond au triplet TAC orienté 3’→5’ sur le brin d’ADN transcrit.',
    ],
    bacTip: 'Le piège classique n°1 au Bac S2 : recopier le mauvais brin d’ADN ! Si on vous donne le brin codant 5’-ATG-CTA-3’, le brin transcrit est 3’-TAC-GAT-5’, et l’ARNm est 5’-AUG-CUA-3’. Précisez toujours les polarités 5’ et 3’ !',
    formula: '\\text{ADN transcrit (3\'}\\to\\text{5\')} : \\text{TAC-GAT} \\implies \\text{ARNm (5\'}\\to\\text{3\')} : \\text{AUG-CUA}',
  },
  {
    id: 4,
    category: 'Code Génétique',
    categoryColor: 'bg-amber-100 text-amber-800 border-amber-200',
    title: 'Les 4 Propriétés Universelles du Code Génétique',
    trigger: 'Justifier l’utilisation du tableau du code génétique ou expliquer pourquoi une mutation est neutre',
    regle: 'Le code génétique est le dictionnaire cellulaire traduisant un triplet de nucléotides (codon) en un acide aminé. Il est : 1. Dégénéré ou redondant (plusieurs codons pour le même acide aminé) ; 2. Universel (partagé par tous les êtres vivants) ; 3. Non chevauchant (lu 3 nucléotides par 3 sans virgule) ; 4. Comporte 1 codon initiateur (AUG = Méthionine) et 3 codons STOP sans acide aminé (UAA, UAG, UGA).',
    details: [
      '64 codons possibles ($4^3 = 64$) : 61 codons codants pour 20 acides aminés + 3 codons STOP ou non-sens.',
      'Redondance / Dégénérescence : protège souvent contre les mutations (ex: GAA et GAG codent tous deux pour l’acide glutamique).',
      'Universalité : preuve de l’origine évolutive commune de tous les êtres vivants ; rend possible la transgénèse et la production d’insuline humaine par des bactéries génétiquement modifiées.',
      'Codon STOP : provoque la fixation d’un facteur de libération et la dissociation immédiate du complexe ribosomique.',
    ],
    bacTip: 'Au Bac S2, ne traduisez JAMAIS un codon STOP par un acide aminé ou par un point d’interrogation ! Le codon STOP signale la fin de la traduction : la chaîne polypeptidique s’arrête à l’acide aminé qui le précède immédiatement.',
  },
  {
    id: 5,
    category: 'Traduction Ribosomique',
    categoryColor: 'bg-teal-100 text-teal-800 border-teal-200',
    title: 'Traduction en 3 Étapes : Initiation, Élongation & Terminaison',
    trigger: 'Décrire le fonctionnement du ribosome ou ordonner les étapes de la biosynthèse des protéines',
    regle: 'La traduction se déroule dans le cytoplasme au niveau des ribosomes : 1. Initiation (assemblage du complexe ribosomique sur AUG au site P avec l’ARNt-Met) ; 2. Élongation (arrivée de l’ARNt suivant au site A, formation de la liaison peptidique catalysée par la peptidyl-transférase, puis translocation de 3 nucléotides) ; 3. Terminaison (au codon STOP, libération de la protéine et clivage de la méthionine initiale).',
    details: [
      'Rôle de l’ARNt : adaptateur moléculaire portant un anticodon complémentaire du codon et l’acide aminé correspondant à son extrémité 3’.',
      'Site P (Peptidyle) : porte la chaîne polypeptidique en cours de croissance.',
      'Site A (Aminoacyle) : accueille le nouvel ARNt chargé d’un acide aminé.',
      'Liaison peptidique : liaison covalente entre le groupement amine (-NH2) d’un acide aminé et le carboxyle (-COOH) du précédent avec élimination d’une molécule d’eau.',
      'Polysome : plusieurs ribosomes lisent simultanément le même ARNm en file indienne, produisant rapidement de nombreux exemplaires de la même protéine.',
    ],
    bacTip: 'Rappel capital pour le Bac S2 : la première méthionine codée par le codon initiateur AUG est quasi-systématiquement éliminée après la traduction par une peptidase pour former la protéine fonctionnelle mature.',
  },
  {
    id: 6,
    category: 'Mutations & Conséquences',
    categoryColor: 'bg-rose-100 text-rose-800 border-rose-200',
    title: 'Typologie des Mutations Ponctuelles & Conséquences Phénotypiques (Drépanocytose)',
    trigger: 'Comparer une séquence normale et une séquence mutée pour expliquer l’origine d’une maladie génétique',
    regle: 'Une mutation ponctuelle modifie un seul nucléotide : 1. Mutation silencieuse (même acide aminé grâce à la redondance du code) ; 2. Mutation faux-sens (changement d’un acide aminé, ex: GAG→GTG remplaçant Glu par Val dans la drépanocytose) ; 3. Mutation non-sens (création d’un codon STOP prématuré donnant une protéine tronquée inactive) ; 4. Délétion ou insertion (décalage du cadre de lecture ou frameshift).',
    details: [
      'Cas emblématique du Bac S2 : La Drépanocytose (Anémie falciforme) :',
      '- ADN normal (brin transcrit) : CTC $\\implies$ ARNm : GAG $\\implies$ 6e acide aminé = Acide glutamique (HbA soluble, hydrophile).',
      '- ADN muté : CAC (substitution A par T sur le brin codant) $\\implies$ ARNm : GUG $\\implies$ 6e acide aminé = Valine (HbS insoluble, hydrophobe).',
      '- Conséquence tissulaire : polymérisation de l’HbS en fibres hélicoïdales lors de la désoxygénation, déformation des hématies en faucilles (drépanocytes), hémolyse et vaso-occlusion.',
    ],
    bacTip: 'Structure de réponse parfaite au Bac S2 : 1. Nommez la mutation précise (ex: « substitution du nucléotide A par T au niveau du 6e triplet ») ; 2. Donnez l’impact sur l’ARNm et la séquence peptidique ; 3. Expliquez la conséquence sur la structure tertiaire de la protéine et le phénotype macroscopique.',
    formula: '\\text{ADN normal: CTC } \\to \\text{Glu (HbA)} \\quad \\Bigg| \\quad \\text{ADN muté: CAC } \\to \\text{Val (HbS)}',
  },
];

export default function B5ExpressionGenetiqueReflexesCard() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <div className="my-10 rounded-3xl bg-white border border-navy/10 p-5 sm:p-7 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/10 pb-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-3 py-1 text-xs font-bold text-navy mb-1 border border-navy/10">
            <Dna className="w-3.5 h-3.5 text-turquoise" />
            <span>Fiche Réflexes Bac S2 • Chapitre B5 • Leçon 2</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-navy">
            Acides Nucléiques &amp; Expression de l’Information Génétique
          </h3>
          <p className="text-xs sm:text-sm text-text/70 mt-0.5">
            Les 6 automatismes fondamentaux pour maîtriser la réplication, la transcription, le code génétique, la traduction et les mutations au Bac S2.
          </p>
        </div>
        <span className="self-start sm:self-center rounded-2xl bg-purple-50 border border-purple-200 px-3 py-1.5 text-xs font-bold text-purple-800">
          Biologie Moléculaire
        </span>
      </div>

      <div className="space-y-3">
        {REFLEXES.map((r) => {
          const isOpen = openId === r.id;
          return (
            <div key={r.id} className="rounded-2xl border border-navy/10 overflow-hidden transition-all">
              <button
                onClick={() => setOpenId(isOpen ? null : r.id)}
                className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-surface/50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-navy/5 text-xs font-bold text-navy border border-navy/10">
                    {r.id}
                  </span>
                  <div className="min-w-0">
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border mb-0.5 ${r.categoryColor}`}>
                      {r.category}
                    </span>
                    <p className="text-sm font-bold text-navy leading-snug truncate">{r.title}</p>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-navy/50 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="px-4 pb-5 space-y-4 border-t border-navy/10 pt-4 bg-white">
                  <div className="rounded-xl bg-navy/5 border border-navy/10 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-text/50 mb-1">
                      Signal déclencheur dans l’énoncé
                    </p>
                    <p className="text-xs text-navy font-semibold leading-relaxed">{r.trigger}</p>
                  </div>

                  <div className="rounded-xl bg-turquoise/5 border border-turquoise/20 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-turquoise mb-1">
                      Règle de démonstration obligatoire
                    </p>
                    <p className="text-sm font-bold text-navy leading-relaxed">{r.regle}</p>
                  </div>

                  {r.formula && (
                    <div className="rounded-xl bg-purple-50 border border-purple-200 p-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-purple-600 mb-1">
                        Formule / Schéma de référence
                      </p>
                      <code className="text-xs font-mono text-purple-900 font-bold block">{r.formula}</code>
                    </div>
                  )}

                  <div className="grid gap-2 sm:grid-cols-2">
                    {r.details.map((d, i) => (
                      <div key={i} className="flex items-start gap-2.5 rounded-xl bg-surface/50 p-2.5 border border-navy/10">
                        <CheckCircle2 className="w-3.5 h-3.5 text-turquoise shrink-0 mt-0.5" />
                        <span className="text-xs text-text/80 leading-relaxed">{d}</span>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-3 flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div className="text-xs text-amber-950">
                      <span className="font-bold block mb-0.5">Exigence stricte des correcteurs du Baccalauréat sénégalais :</span>
                      <p className="leading-relaxed opacity-90">{r.bacTip}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
