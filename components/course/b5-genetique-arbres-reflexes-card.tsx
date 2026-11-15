'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  Dna,
  Users,
  GitBranch,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Calculator,
  Shield,
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
    category: 'Lecture & Conventions',
    categoryColor: 'bg-blue-100 text-blue-800 border-blue-200',
    title: 'Lecture d’un Pedigree : Symboles, Générations & Numérotation',
    trigger: 'On vous donne un arbre généalogique et demande d’identifier les individus',
    regle: 'Numérotez les générations en chiffres romains (I, II, III) et les individus de gauche à droite en chiffres arabes (I-1, I-2, II-1...). Le carré représente un individu masculin, le cercle un individu féminin, et le remplissage sombre un individu phénotypiquement atteint.',
    details: [
      'Carré vide = Homme sain ; Carré sombre = Homme atteint par la tare.',
      'Cercle vide = Femme saine ; Cercle sombre = Femme atteinte.',
      'Trait horizontal = Union ou mariage ; Double trait = Union consanguine (augmente le risque de récessivité).',
      'Trait vertical descendant = Descendance issue de l’union.',
      'Cercle pointé au centre (ou demi-sombre) = Femme conductrice / hétérozygote asymptomatique.',
      'Jumeaux : traits obliques partant d’un même point (vrais jumeaux reliés par un trait horizontal).',
    ],
    bacTip: 'Au Bac S2, commencez impérativement votre réponse par désigner l’individu étudié par ses coordonnées complètes : « Soit l’individu II-3 issu du couple I-1 et I-2... »',
  },
  {
    id: 2,
    category: 'Dominance vs Récessivité',
    categoryColor: 'bg-purple-100 text-purple-800 border-purple-200',
    title: 'Détermination du Caractère Dominant ou Récessif',
    trigger: 'Deux parents sains ont un enfant atteint (ou vice versa)',
    regle: 'Si deux parents phénotypiquement normaux ont au moins un enfant malade, l’allèle responsable de la maladie est obligatoirement RÉCESSIF. Les deux parents portent l’allèle sans l’exprimer : ils sont hétérozygotes.',
    details: [
      'Règle d’or n°1 : Parents sains [S] × [S] → Enfant atteint [m] = Allèle m récessif (m < S).',
      'Règle d’or n°2 : Si la maladie est dominante, tout enfant malade possède au moins un parent malade (la maladie ne saute pas de génération).',
      'Attention au faux saut de génération : une pénétrance incomplète ou une fausse paternité peut mimer un saut, mais au Bac S2 le déterminisme mendélien strict s’applique toujours.',
      'Notations conventionnelles Bac : Allèle dominant en majuscule (N ou M), récessif en minuscule (m ou s).',
    ],
    bacTip: 'Ne dites jamais « les parents sont malades récessifs ». Dites avec rigueur : « L’allèle responsable de la maladie est récessif car présent à l’état masqué chez les parents phénotypiquement sains ». Justification notée sur 1 point entier au Bac S2 !',
    formula: 'Parents [N] \\times [N] \\to \\text{Enfant } [m] \\implies m \\text{ est récessif face à } N',
  },
  {
    id: 3,
    category: 'Localisation Chromosomique',
    categoryColor: 'bg-teal-100 text-teal-800 border-teal-200',
    title: 'Autosomique vs Gonosomique (Liaison à X ou Y)',
    trigger: 'Déterminer si le gène est porté par un autosome ou un gonosome',
    regle: 'Testez successivement les 3 hypothèses gonosomiques classiques. Éliminez la liaison à Y si des femmes sont atteintes ou si un père atteint a un fils sain. Pour X récessif : un père malade DOIT avoir TOUTES ses filles atteintes si la mère est homozygote atteinte, et une femme malade DOIT avoir TOUS ses fils atteints.',
    details: [
      'Élimination liaison à Y (holandrique) : présence de femmes atteintes OU père atteint transmettant à une fille OU père atteint ayant un fils sain.',
      'Élimination liaison à X récessif : une fille atteinte (X^m X^m) a un père sain (X^N Y) → IMPOSSIBLE si lié à X récessif, car le père transmettrait X^N et la fille serait saine.',
      'Autre élimination X récessif : une mère atteinte (X^m X^m) a un fils sain (X^N Y) → IMPOSSIBLE car elle lui donne obligatoirement X^m.',
      'Si X et Y sont tous deux éliminés de manière irréfutable, la localisation est OBLIGATOIREMENT autosomique.',
    ],
    bacTip: 'Formulation d’or Bac : « Si le gène était lié à X récessif, la fille malade II-2 aurait le génotype Xm/Xm ; elle recevrait un allèle Xm de son père I-1 qui serait donc Xm/Y (malade). Or son père est sain (XN/Y). Donc l’hypothèse est rejetée : le gène est autosomique. »',
    formula: '\\text{Fille } X^m X^m \\implies \\text{Père nécessairement } X^m Y',
  },
  {
    id: 4,
    category: 'Calcul de Probabilités',
    categoryColor: 'bg-amber-100 text-amber-800 border-amber-200',
    title: 'Échiquier de Croisement & Calcul des Risques Génétiques',
    trigger: 'Calculer la probabilité pour un couple d’avoir un enfant atteint',
    regle: 'Décomposez le calcul en 3 probabilités indépendantes et appliquez la règle du produit : P(enfant malade) = P(père porteur) × P(mère porteuse) × P(transmission de l’allèle malade par les deux parents, soit 1/4).',
    details: [
      'Cas classique : un individu sain avec un frère malade (parents sains) a une probabilité de 2/3 d’être hétérozygote (et NON 1/2, car sachant qu’il est sain, la case récessive homozygote 1/4 est exclue).',
      'Échiquier de croisement : 1/4 AA, 2/4 Aa, 1/4 aa → Parmi les individus sains [A], la proportion est 1/3 AA et 2/3 Aa.',
      'Probabilité d’un couple issu de la population générale : utiliser la fréquence allélique q (loi de Hardy-Weinberg : fréquence hétérozygote = 2pq ≈ 2q si q est petit).',
      'Règle d’addition : pour deux événements mutuellement exclusifs (ex. avoir un enfant sain OU un enfant malade = P1 + P2 = 1).',
    ],
    bacTip: 'Le piège n°1 du Bac S2 : attribuer une probabilité 1/2 au lieu de 2/3 à un individu sain phénotypiquement dont un parent ou collatéral est atteint ! Justifiez toujours : « L’individu étant sain, il ne peut pas être aa ; il a donc 2 chances sur 3 d’être Aa ».',
    formula: 'P(\\text{enfant } aa) = P(\\text{Père } Aa) \\times P(\\text{Mère } Aa) \\times \\frac{1}{4}',
  },
  {
    id: 5,
    category: 'Anomalies & Trisomie',
    categoryColor: 'bg-rose-100 text-rose-800 border-rose-200',
    title: 'Non-Disjonction Méiotique & Caryotypes Anormaux (Trisomie 21)',
    trigger: 'Expliquer l’origine chromosomique d’un caryotype à 47 chromosomes',
    regle: 'La non-disjonction chromosomique se produit en anaphase I (défaut de séparation de la paire d’homologues) ou en anaphase II (défaut de disjonction des chromatides sœurs). Elle génère des gamètes anormaux disomiques (n+1) ou nullisomiques (n-1). La fécondation avec un gamète normal donne une trisomie (2n+1) ou une monosomie (2n-1).',
    details: [
      'Trisomie 21 libre et homogène (47, XX, +21 ou 47, XY, +21) : 95% des cas, liée à un accident méiotique le plus souvent maternel (ovocyte I bloqué depuis la vie fœtale).',
      'Trisomie 21 par translocation robertsonienne (46 chromosomes mais matériel génétique équivalent à 47, par fusion du 21 sur le 14) : héréditaire dans 50% des cas.',
      'Syndrome de Turner (45, X0) : monosomie viable chez la femme.',
      'Syndrome de Klinefelter (47, XXY) : trisomie gonosomique chez l’homme.',
    ],
    bacTip: 'Distinguez rigoureusement accident méiotique maternel vs paternel. Si on vous donne les allèles portés par le père et la mère grâce à une électrophorèse d’ADN, comparez les bandes de l’enfant pour identifier le gamète fautif (porteur de 2 allèles parentaux différents = anaphase I ; 2 allèles identiques = anaphase II).',
  },
  {
    id: 6,
    category: 'Outils Modernes',
    categoryColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    title: 'Diagnostic Moléculaire : Électrophorèse de l’ADN & Sondes Géniques',
    trigger: 'On vous fournit des profils de fragments de restriction (Southern Blot) pour chaque membre de la famille',
    regle: 'Faites correspondre chaque fragment d’ADN (bande sur le gel) à un allèle précis. L’allèle normal donne une ou plusieurs bandes de taille déterminée, l’allèle muté donne un profil différent par perte ou gain d’un site de restriction.',
    details: [
      'Individu homozygote normal : une seule bande caractéristique (ou 2 bandes si le site normal est clivé).',
      'Individu hétérozygote porteur sain : présence simultanée de la bande normale et de la bande mutée (profil composite).',
      'Individu homozygote malade : absence complète de la bande normale, présence exclusive de la bande mutée.',
      'Diagnostic prénatal : amniocentèse (liquide amniotique vers 15-16 semaines) ou choriocentèse (villosités choriales vers 10-12 semaines) pour extraire l’ADN fœtal.',
    ],
    bacTip: 'L’analyse d’électrophorèse est souvent couplée à l’arbre généalogique. Rédigez : « Le sujet I-1 présente les bandes à 4 kb et 2 kb : il est hétérozygote. L’enfant malade présente uniquement la bande à 4 kb : il est homozygote pour l’allèle muté. »',
    formula: '\\text{Profil hétérozygote} = \\text{Bande normale} + \\text{Bande mutée}',
  },
];

export default function B5GenetiqueArbresReflexesCard() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <div className="my-10 rounded-3xl bg-white border border-navy/10 p-5 sm:p-7 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/10 pb-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-3 py-1 text-xs font-bold text-navy mb-1 border border-navy/10">
            <Dna className="w-3.5 h-3.5 text-turquoise" />
            <span>Fiche Réflexes Bac S2 • Chapitre B5 • Leçon 1</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-navy">
            Hérédité Humaine &amp; Analyse des Arbres Généalogiques
          </h3>
          <p className="text-xs sm:text-sm text-text/70 mt-0.5">
            Les 6 automatismes méthodologiques indispensables pour réussir l’exercice de génétique humaine au Bac S2.
          </p>
        </div>
        <span className="self-start sm:self-center rounded-2xl bg-blue-50 border border-blue-200 px-3 py-1.5 text-xs font-bold text-blue-800">
          Génétique &amp; Biotechnologies
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
                        Formulation mathématique / Algébrique
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
