'use client';

import React, { useState, useCallback } from 'react';
import MathRenderer from '@/components/course/math-renderer';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explication: string;
  piegeBac: string;
  sourceBac: string;
}

const QUESTIONS_P10: Question[] = [
  {
    id: 1,
    sourceBac: 'Bac S2 Sénégal 2023',
    question:
      'Lequel des critères suivants caractérise avec certitude la plus grande stabilité d’un noyau atomique ?',
    options: [
      'Avoir la plus grande masse atomique $m(\\text{noyau})$.',
      'Avoir la plus grande énergie de liaison totale $E_\\ell$.',
      'Avoir la plus grande énergie de liaison par nucléon $E_\\ell / A$.',
      'Avoir un nombre de neutrons égal au double du nombre de protons.',
    ],
    correct: 2,
    explication:
      'La stabilité d’un noyau est mesurée EXCLUSIVEMENT par son énergie de liaison par nucléon $E_\\ell / A$ (exprimée généralement en MeV/nucléon). Plus cette grandeur est élevée, plus le noyau est fortement lié et stable. Le Fer 56 et le Nickel 62 présentent les valeurs maximales ($\\approx 8{,}8$ MeV/nucléon).',
    piegeBac:
      'Ne confondez jamais l’énergie de liaison totale $E_\\ell$ et l’énergie de liaison par nucléon $E_\\ell/A$. L’Uranium 238 a une énergie de liaison totale $\\approx 1800$ MeV bien supérieure à celle du Fer 56 ($\\approx 492$ MeV), mais le Fer 56 est beaucoup plus stable car son $E_\\ell/A$ (8,79 MeV/nucléon) dépasse celle de l’Uranium (7,57 MeV/nucléon).',
  },
  {
    id: 2,
    sourceBac: 'Bac S2 Sénégal 2022',
    question:
      'Dans la réaction de fission nucléaire suivante : $^{1}_{0}\\text{n} + ^{235}_{92}\\text{U} \\longrightarrow ^{94}_{38}\\text{Sr} + ^{140}_{54}\\text{Xe} + x \\cdot ^{1}_{0}\\text{n}$, quelle est la valeur de l’entier $x$ ?',
    options: ['$x = 1$', '$x = 2$', '$x = 3$', '$x = 4$'],
    correct: 1,
    explication:
      'D’après la première loi de Soddy (conservation du nombre total de nucléons $A$) : $A(\\text{avant}) = 1 + 235 = 236$. $A(\\text{après}) = 94 + 140 + x \\cdot 1 = 234 + x$. Ainsi : $236 = 234 + x \\implies x = 2$. On vérifie également la charge $Z$ : $0 + 92 = 92$ et $38 + 54 + 0 = 92$ (vérifié).',
    piegeBac:
      'Pensez toujours à compter le neutron incident à gauche de la flèche ! Oublier le neutron projectile amène à poser à tort $235 = 234 + x$, ce qui donnerait $x = 1$ (erreur très fréquente).',
  },
  {
    id: 3,
    sourceBac: 'Bac S2 Sénégal 2021',
    question:
      'Quelle est la transformation intranucléaire responsable de l’émission d’une particule $\\beta^-$ (électron $^{0}_{-1}\\text{e}$) ?',
    options: [
      'La désintégration d’un proton en un neutron avec émission d’un positon : $\\text{p} \\to \\text{n} + \\text{e}^+$.',
      'La transformation spontanée d’un neutron en un proton : $^{1}_{0}\\text{n} \\to ^{1}_{1}\\text{p} + ^{0}_{-1}\\text{e} + \\bar{\\nu}_e$.',
      'L’éjection d’un électron du cortège électronique de l’atome par effet photoélectrique.',
      'La fission spontanée du noyau d’hélium 4.',
    ],
    correct: 1,
    explication:
      'La radioactivité $\\beta^-$ se produit dans les noyaux présentant un excès de neutrons. Au cœur du noyau, un neutron se transforme spontanément en un proton, un électron rapide (rayon $\\beta^-$) et un antineutrino électronique : $^{1}_{0}\\text{n} \\to ^{1}_{1}\\text{p} + ^{0}_{-1}\\text{e} + \\bar{\\nu}_e$.',
    piegeBac:
      'L’électron émis ne provient JAMAIS du nuage électronique de l’atome ! Il est créé au sein même du noyau au moment exact de la désintégration du neutron.',
  },
  {
    id: 4,
    sourceBac: 'Bac S2 Sénégal 2020',
    question:
      'La période radioactive (demi-vie) du Polonium 210 est $T = 138$ jours. Au bout d’une durée $t = 414$ jours, quel est le pourcentage de noyaux de Polonium 210 restant par rapport à la population initiale $N_0$ ?',
    options: ['50 %', '25 %', '12,5 %', '6,25 %'],
    correct: 2,
    explication:
      'Le nombre de demi-vies écoulées est $n = t / T = 414 / 138 = 3$. Selon la loi de décroissance $N(n T) = N_0 / 2^n$ : $N(3 T) = N_0 / 2^3 = N_0 / 8 = 0{,}125 \\cdot N_0$, soit exactement 12,5 % de noyaux restants.',
    piegeBac:
      'Attention à ne pas diviser par 3 ! Après 3 périodes, il ne reste pas $N_0 / 3$ mais $N_0 / 2^3 = N_0 / 8$.',
  },
  {
    id: 5,
    sourceBac: 'Bac S2 Sénégal 2019',
    question:
      'Quelle est la nature physique du rayonnement radioactif gamma ($\\gamma$) et quand est-il émis ?',
    options: [
      'Un faisceau de noyaux d’hélium très énergétiques émis lors d’une fission.',
      'Une onde électromagnétique de très haute fréquence émise lors de la désexcitation d’un noyau fils.',
      'Un flux de neutrons lents expulsés lors d’une réaction de fusion.',
      'Un courant de positons créés lors de la réaction $\\text{p} \\to \\text{n} + \\text{e}^+$.',
    ],
    correct: 1,
    explication:
      'Le rayonnement $\\gamma$ est un rayonnement électromagnétique de photons très énergétiques (longueur d’onde très courte, $\\lambda < 10^{-11}$ m). Il accompagne presque toujours les désintégrations $\\alpha$ ou $\\beta$ lorsque le noyau fils est formé dans un état excité (noté $Y^*$) et se désexcite vers son état fondamental : $Y^* \\to Y + \\gamma$.',
    piegeBac:
      'Le rayonnement $\\gamma$ ne modifie ni le nombre de masse $A$ ni le numéro atomique $Z$ du noyau.',
  },
  {
    id: 6,
    sourceBac: 'Bac S2 Sénégal 2018',
    question:
      'Le défaut de masse d’un noyau d’Hélium $^{4}_{2}\\text{He}$ vaut $\\Delta m = 0{,}03038$ u. Sachant que $1\\text{ u} = 931{,}5\\text{ MeV}/c^2$, quelle est son énergie de liaison par nucléon $E_\\ell / A$ ?',
    options: [
      '$E_\\ell / A \\approx 28{,}30\\text{ MeV/nucléon}$',
      '$E_\\ell / A \\approx 7{,}07\\text{ MeV/nucléon}$',
      '$E_\\ell / A \\approx 14{,}15\\text{ MeV/nucléon}$',
      '$E_\\ell / A \\approx 3{,}54\\text{ MeV/nucléon}$',
    ],
    correct: 1,
    explication:
      'Énergie de liaison totale : $E_\\ell = \\Delta m \\cdot c^2 = 0{,}03038 \\times 931{,}5 \\approx 28{,}299\\text{ MeV}$. Le noyau d’hélium 4 possède $A = 4$ nucléons. Son énergie de liaison par nucléon vaut : $E_\\ell / A = 28{,}299 / 4 \\approx 7{,}07\\text{ MeV/nucléon}$.',
    piegeBac:
      'Erreur classique : s’arrêter à $E_\\ell = 28{,}3$ MeV sans diviser par le nombre de nucléons $A = 4$. Relisez attentivement si la question demande l’énergie de liaison totale $E_\\ell$ ou l’énergie de liaison par nucléon $E_\\ell/A$.',
  },
  {
    id: 7,
    sourceBac: 'Bac S2 Sénégal 2023',
    question:
      'Pour calculer l’activité radioactive $A = \\lambda \\cdot N$ en Becquerels (Bq), dans quelle unité la constante radioactive $\\lambda$ doit-elle OBLIGATOIREMENT être exprimée ?',
    options: [
      'En année inverse (an$^{-1}$).',
      'En jour inverse (jour$^{-1}$).',
      'En seconde inverse (s$^{-1}$).',
      'Sans dimension (nombre pur).',
    ],
    correct: 2,
    explication:
      'Par définition, 1 Becquerel (1 Bq) correspond à 1 désintégration par SECONDE ($1\\text{ s}^{-1}$). Pour que l’activité $A = \\lambda N$ soit en Bq, $\\lambda$ doit impérativement être exprimée en $\\text{s}^{-1}$. Si la période $T$ est donnée en ans, convertissez : $T(\\text{s}) = T(\\text{ans}) \\times 365{,}25 \\times 24 \\times 3600\\text{ s}$.',
    piegeBac:
      'Utiliser $\\lambda$ en an$^{-1}$ avec $N$ donne un résultat en désintégrations par an, et NON en Becquerels ! C’est une cause majeure de perte de points au Bac S2.',
  },
  {
    id: 8,
    sourceBac: 'Bac S2 Sénégal 2021',
    question:
      'Un échantillon de bois fossile présente une activité $A(t) = 0{,}25 \\cdot A_0$ (où $A_0$ est l’activité d’un échantillon vivant témoin). Sachant que la demi-vie du Carbone 14 est $T = 5730$ ans, quel est l’âge de ce bois fossile ?',
    options: ['2 865 ans', '5 730 ans', '11 460 ans', '17 190 ans'],
    correct: 2,
    explication:
      'Puisque $A(t) = A_0 / 4 = A_0 / 2^2$, exactement $n = 2$ demi-vies se sont écoulées depuis la mort du végétal. L’âge du fossile est donc $t = 2 \\cdot T = 2 \\times 5730 = 11460$ ans.',
    piegeBac:
      'Ne pas confondre la division par 4 de l’activité avec une multiplication de l’âge par 4 ! Ici $A(t)/A_0 = (1/2)^n = (1/2)^2 \\implies n = 2$ périodes.',
  },
  {
    id: 9,
    sourceBac: 'Bac S2 Sénégal 2020',
    question:
      'Pourquoi la fission des noyaux lourds et la fusion des noyaux légers libèrent-elles TOUTES LES DEUX de l’énergie, alors qu’elles sont des transformations inverses ?',
    options: [
      'Parce que dans les deux réactions, les noyaux formés possèdent une énergie de liaison par nucléon $E_\\ell/A$ supérieure à celle des réactifs.',
      'Parce que le nombre de protons augmente toujours au cours des réactions.',
      'Parce que les deux réactions consomment des neutrons rapides.',
      'Parce que la masse des produits est supérieure à la masse des réactifs.',
    ],
    correct: 0,
    explication:
      'Sur la courbe d’Aston, le sommet de stabilité se situe au niveau des noyaux moyens (Fer 56, $E_\\ell/A \\approx 8{,}8$ MeV/nucléon). En fusionnant, deux noyaux légers grimpent vers ce sommet ; en subissant une fission, un noyau lourd se casse en noyaux moyens plus proches du sommet. Dans les deux cas, les produits sont plus stables (plus fortement liés), la masse totale diminue ($\\Delta m < 0$) et de l’énergie est libérée ($E_{\\text{lib}} = |\\Delta m| \\cdot c^2$).',
    piegeBac:
      'Une réaction nucléaire libère de l’énergie si et seulement si la masse des produits est INFÉRIEURE à celle des réactifs (défaut de masse négatif $\\Delta m < 0$).',
  },
  {
    id: 10,
    sourceBac: 'Bac S2 Sénégal 2019',
    question:
      'Une centrale nucléaire fournit une puissance électrique $P_{\\text{élec}} = 900\\text{ MW}$ avec un rendement de 30 %. Sachant que chaque fission d’un noyau d’Uranium 235 libère $E_1 = 200\\text{ MeV}$, quel est le nombre de fissions par seconde requises ?',
    options: [
      '$N_f \\approx 2{,}8 \\times 10^{19}\\text{ fissions/s}$',
      '$N_f \\approx 9{,}4 \\times 10^{19}\\text{ fissions/s}$',
      '$N_f \\approx 3{,}1 \\times 10^{18}\\text{ fissions/s}$',
      '$N_f \\approx 1{,}5 \\times 10^{20}\\text{ fissions/s}$',
    ],
    correct: 1,
    explication:
      '1. Puissance thermique nécessaire : $P_{\\text{th}} = P_{\\text{élec}} / r = 900 / 0{,}30 = 3000\\text{ MW} = 3 \\times 10^9\\text{ W}$. 2. Énergie libérée par une fission en Joules : $E_1 = 200 \\times 10^6 \\times 1{,}602 \\times 10^{-19}\\text{ J} = 3{,}204 \\times 10^{-11}\\text{ J}$. 3. Nombre de fissions par seconde : $N_f = P_{\\text{th}} / E_1 = (3 \\times 10^9) / (3{,}204 \\times 10^{-11}) \\approx 9{,}36 \\times 10^{19}\\text{ fissions/s}$.',
    piegeBac:
      'Ne pas oublier le rendement $r$ ! Calculer avec $P_{\\text{élec}}$ (900 MW) au lieu de $P_{\\text{th}}$ (3 000 MW) conduit à $2{,}8 \\times 10^{19}$ fissions/s (option A, le piège classique).',
  },
];

export default function P10NucleaireQuizEmbedded() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);

  const LETTERS = ['A', 'B', 'C', 'D'];
  const q = QUESTIONS_P10[currentIdx];

  const handleSelectOption = useCallback(
    (index: number) => {
      if (isAnswered) return;
      setSelectedOption(index);
      setIsAnswered(true);

      const isCorrect = index === q.correct;
      if (isCorrect) {
        setScore((prev) => prev + 1);
      }
      setUserAnswers((prev) => [...prev, index]);
    },
    [isAnswered, q.correct]
  );

  const handleNext = () => {
    if (currentIdx + 1 < QUESTIONS_P10.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowSummary(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowSummary(false);
    setUserAnswers([]);
  };

  if (showSummary) {
    const percentage = Math.round((score / QUESTIONS_P10.length) * 100);
    return (
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl my-8 text-white">
        <div className="text-center py-6">
          <div className="inline-flex p-3 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-3 font-bold text-xl">
            ★
          </div>
          <h3 className="text-2xl font-bold text-slate-100">
            Bilan du Quiz Bac S2 · P10 Physique Nucléaire
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Score Final : <strong className="text-emerald-400 font-mono text-lg">{score} / {QUESTIONS_P10.length}</strong> ({percentage} %)
          </p>

          <div className="mt-4 max-w-md mx-auto p-4 rounded-xl bg-slate-800 border border-slate-700 text-xs text-slate-300">
            {percentage >= 80 ? (
              <p className="text-emerald-400 font-semibold">
                Mention Très Bien ! Vos automatismes sur le défaut de masse, les lois de Soddy, la courbe d’Aston et la cinétique radioactive sont parfaitement au point pour le Baccalauréat.
              </p>
            ) : percentage >= 50 ? (
              <p className="text-amber-400 font-semibold">
                Bon niveau ! Révisez attentivement la conversion des unités (Becquerels et s⁻¹), le calcul d’âge de datation et l’application du rendement thermique dans les réacteurs.
              </p>
            ) : (
              <p className="text-rose-400 font-semibold">
                Des lacunes à combler. Reprenez la fiche réflexes et le simulateur interactif pour bien ancrer les lois de Soddy et la formule de décroissance N(t).
              </p>
            )}
          </div>

          <button
            onClick={handleRestart}
            className="mt-6 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors inline-flex items-center gap-2"
          >
            Recommencer le Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl my-8 text-white">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
            Question {currentIdx + 1} / {QUESTIONS_P10.length}
          </span>
          <span className="text-xs text-slate-400">
            {q.sourceBac}
          </span>
        </div>
        <div className="text-xs font-mono text-emerald-400 font-bold">
          Score : {score}
        </div>
      </div>

      {/* Question Text */}
      <div className="my-5">
        <div className="text-base font-bold text-slate-100 leading-relaxed">
          <MathRenderer content={q.question} />
        </div>
      </div>

      {/* Options */}
      <div className="space-y-2.5">
        {q.options.map((opt, idx) => {
          let btnStyle = 'bg-slate-800 border-slate-700 hover:border-slate-600 text-slate-200';
          if (isAnswered) {
            if (idx === q.correct) {
              btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md';
            } else if (idx === selectedOption) {
              btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
            } else {
              btnStyle = 'bg-slate-800/40 border-slate-800 text-slate-500 opacity-60';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(idx)}
              disabled={isAnswered}
              className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all flex items-start gap-3 ${btnStyle}`}
            >
              <span className="w-5 h-5 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-[11px] shrink-0 mt-0.5">
                {LETTERS[idx]}
              </span>
              <span className="flex-1 leading-relaxed">
                <MathRenderer content={opt} />
              </span>
              {isAnswered && idx === q.correct && (
                <span className="text-emerald-400 font-bold text-xs shrink-0 mt-0.5">✓</span>
              )}
              {isAnswered && idx === selectedOption && idx !== q.correct && (
                <span className="text-rose-400 font-bold text-xs shrink-0 mt-0.5">✗</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Explanation Box */}
      {isAnswered && (
        <div className="mt-5 space-y-3 pt-4 border-t border-slate-800 animate-in fade-in duration-200">
          <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-xs text-slate-300">
            <strong className="text-emerald-400 block mb-1">
              {selectedOption === q.correct ? 'Bonne réponse !' : 'Explication détaillée :'}
            </strong>
            <MathRenderer content={q.explication} />
          </div>

          <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-800/50 text-[11px] text-rose-300">
            <strong className="text-rose-200 block mb-0.5">Piège classique du Bac : </strong>
            <MathRenderer content={q.piegeBac} />
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleNext}
              className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
            >
              {currentIdx + 1 < QUESTIONS_P10.length ? 'Question suivante' : 'Voir les résultats'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
