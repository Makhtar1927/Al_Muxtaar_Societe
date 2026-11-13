'use client';

import React, { useState } from 'react';
import {
  HelpCircle,
  CheckCircle,
  XCircle,
  RotateCcw,
  Award,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  concept: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question:
      'Dans quelle portion précise des voies génitales féminines la fécondation se déroule-t-elle normalement chez l’espèce humaine ?',
    options: [
      'Dans la lumière de la cavité utérine, au contact de la dentelle utérine',
      'Dans le tiers externe de la trompe de Fallope (ampoule tubaire)',
      'À la surface de l’ovaire, immédiatement après la rupture folliculaire',
      'Dans le canal cervical, au sein de la glaire ovulatoire',
    ],
    correct: 1,
    explanation:
      'La fécondation a lieu exclusivement dans l’ampoule tubaire (tiers externe de la trompe de Fallope). L’ovocyte II expulsé lors de l’ovulation y est capté par les franges du pavillon tubaire et y rencontre les spermatozoïdes capacitants ayant migré à travers le col et la cavité utérine.',
    concept: 'Siège de la Fécondation',
  },
  {
    id: 2,
    question:
      'Quel est le mécanisme cellulaire responsable du blocage définitif de la polyspermie lors de la fécondation ?',
    options: [
      'L’épuisement immédiat du pool d’ATP des spermatozoïdes environnants',
      'L’onde de dépolarisation membranaire continue durant 48 heures',
      'L’exocytose des granules corticaux ovocytaires durcissant la zone pellucide par hydrolyse de ZP3',
      'La fermeture mécanique de l’orifice pavillonnaire de la trompe',
    ],
    correct: 2,
    explanation:
      'La fusion des membranes plasmiques de l’ovocyte et du premier spermatozoïde déclenche une onde calcique intracellulaire (Ca2+). Ce signal induit la réaction corticale : les granules corticaux sous-membranaires libèrent par exocytose des enzymes dans l’espace périvitellin, ce qui modifie la structure de ZP3 et durcit la zone pellucide, empêchant irréversiblement l’entrée de tout autre spermatozoïde.',
    concept: 'Réaction Corticale & Polyspermie',
  },
  {
    id: 3,
    question:
      'Quelle est la particularité morphologique et volumique majeure caractérisant la phase de segmentation du zygote (J1 à J4) ?',
    options: [
      'L’embryon multiplie son volume par 10 sous l’effet de l’absorption de liquide utérin',
      'Le nombre de cellules augmente par mitoses successives tandis que le volume global de l’embryon reste rigoureusement constant',
      'L’embryon perd son matériel génétique diploïde pour redevenir haploïde',
      'Les cellules embryonnaires se différencient déjà en tissus osseux et musculaires',
    ],
    correct: 1,
    explanation:
      'Durant les divisions de clivage (2, 4, 8, puis 16 à 32 cellules formant la morula), l’embryon demeure enfermé dans la zone pellucide inextensible. Le diamètre global reste d’environ 100 micromètres : il y a donc multiplication mitotique sans aucune croissance en masse ni en volume. Les blastomères deviennent simplement de plus en plus petits.',
    concept: 'Segmentation Tubaire',
  },
  {
    id: 4,
    question:
      'Pourquoi le trophoblaste embryonnaire commence-t-il à sécréter de la HCG dès la nidation (J7-J8) ?',
    options: [
      'Pour stimuler directement la croissance des organes fœtaux in utero',
      'Pour remplacer immédiatement les reins maternels dans l’élimination des déchets',
      'Pour se lier aux récepteurs lutéaux de la LH et maintenir en activité le corps jaune gravidique (aménorrhée)',
      'Pour déclencher les premières contractions rythmiques du myomètre',
    ],
    correct: 2,
    explanation:
      'En fin de cycle normal, la baisse de LH provoque l’involution du corps jaune, la chute de progestérone et l’apparition des règles (menstruation). La HCG embryonnaire, homologue structural de la LH, prend le relais de l’hypophyse maternelle en stimulant le corps jaune : devenu corps jaune gravidique, il continue à sécréter progestérone et œstrogènes, ce qui préserve l’endomètre et empêche les règles.',
    concept: 'Rôle de la HCG',
  },
  {
    id: 5,
    question:
      'Quelle est la conséquence d’une ovariectomie bilatérale pratiquée au 4e mois de gestation chez la femme ?',
    options: [
      'Un avortement spontané immédiat par effondrement des concentrations de progestérone',
      'La poursuite normale de la grossesse jusqu’à terme car le placenta assure en autonomie la synthèse de progestérone',
      'L’apparition d’une lactation prématurée incontrôlable',
      'Une destruction irréversible des annexes embryonnaires',
    ],
    correct: 1,
    explanation:
      'Au cours du 1er trimestre, le corps jaune ovarien est la seule source de progestérone. Mais dès la fin du 3e mois (semaines 12-14), le placenta mature prend le relais complet et produit lui-même des quantités massives de progestérone et d’œstrogènes. Le corps jaune ovarien devient obsolète ; l’ablation des deux ovaires au 4e mois n’interrompt donc pas la grossesse.',
    concept: 'Relais Placentaire',
  },
  {
    id: 6,
    question:
      'Lors de l’accouchement, par quel mécanisme neuro-endocrinien les contractions utérines s’intensifient-elles (réflexe de Ferguson) ?',
    options: [
      'Par un rétrocontrôle négatif de la progestérone freinant l’hypothalamus',
      'Par une boucle de rétrocontrôle positif : la distension du col stimule la sécrétion d’ocytocine qui amplifie les contractions',
      'Par une libération continue de dopamine bloquant l’hypophyse',
      'Par une baisse d’adrénaline provoquant la relaxation musculaire',
    ],
    correct: 1,
    explanation:
      'Le réflexe de Ferguson est une boucle de rétrocontrôle positif rare : l’engagement de la tête fœtale dilate mécaniquement le col utérin. Les mécanorécepteurs cervicaux envoient des influx sensitifs à l’hypothalamus, qui stimule la libération d’ocytocine par la posthypophyse. L’ocytocine contracte le myomètre, ce qui pousse davantage le fœtus et distend encore plus le col. Le processus s’auto-amplifie jusqu’à l’expulsion.',
    concept: 'Réflexe de Ferguson & Accouchement',
  },
  {
    id: 7,
    question:
      'Quelle est la distinction fonctionnelle rigoureuse entre la prolactine et l’ocytocine lors de la lactation ?',
    options: [
      'La prolactine assure la contraction myoépithéliale et l’ocytocine la synthèse des caséines',
      'La prolactine stimule la synthèse et la sécrétion du lait dans les acini ; l’ocytocine provoque l’éjection par contraction des cellules myoépithéliales',
      'Les deux hormones ont un rôle strictement identique et redondant',
      'La prolactine inhibe la production de lait tandis que l’ocytocine l’active',
    ],
    correct: 1,
    explanation:
      'La prolactine (antéhypophyse) agit sur les cellules glandulaires des acini mammaires pour déclencher la synthèse et la sécrétion des composants du lait (lactose, caséines, lipides). L’ocytocine (posthypophyse), libérée par réflexe sous l’effet de la succion du mamelon, contracte les cellules myoépithéliales entourant les acini pour éjecter mécaniquement le lait dans les canaux galactophores.',
    concept: 'Prolactine vs Ocytocine',
  },
  {
    id: 8,
    question:
      'Comment explique-t-on l’aménorrhée de lactation (absence de règles et infécondité temporaire) chez la femme allaitante ?',
    options: [
      'L’ocytocine détruit directement le stock de follicules primordiaux ovariens',
      'La progestérone placentaire résiduelle reste présente dans le sang pendant 1 an',
      'La prolactine élevée lors des tétées fréquentes exerce un rétrocontrôle négatif sur l’hypothalamus, freinant la GnRH et les gonadostimulines',
      'La prolactine stimule la maturation folliculaire précoce sans rupture',
    ],
    correct: 2,
    explanation:
      'La stimulation fréquente et régulière du mamelon maintient un taux sérique élevé de prolactine. Cette hyperprolactinémie physiologique exerce un rétrocontrôle négatif puissant sur l’hypothalamus : elle inhibe la pulsatilité de la GnRH, ce qui effondre la sécrétion de FSH et de LH. En l’absence de gonadostimulines, il n’y a ni développement folliculaire ni ovulation : c’est l’aménorrhée de lactation.',
    concept: 'Aménorrhée de Lactation',
  },
];

export default function B4FecondationQuizEmbedded() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const calculateScore = () => {
    let score = 0;
    QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct) {
        score++;
      }
    });
    return score;
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const score = calculateScore();
  const allAnswered = Object.keys(selectedAnswers).length === QUESTIONS.length;

  return (
    <div className="my-10 rounded-3xl bg-white border border-navy/10 p-5 sm:p-7 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/10 pb-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700 mb-1 border border-rose-200">
            <HelpCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>Évaluation Formative • Baccalauréat S2</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-navy">
            Quiz d’Entraînement : Fécondation, Gestation &amp; Lactation
          </h3>
          <p className="text-xs sm:text-sm text-text/70 mt-0.5">
            8 questions ciblées sur les mécanismes cellulaires, la cinétique de HCG, le relais placentaire et la régulation neuro-endocrinienne.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2 bg-surface px-4 py-2 rounded-2xl border border-navy/10">
          <BookOpen className="w-4 h-4 text-turquoise" />
          <span className="text-xs font-bold text-navy">
            {Object.keys(selectedAnswers).length} / {QUESTIONS.length} répondues
          </span>
        </div>
      </div>

      {/* Résultat si soumis */}
      {showResults && (
        <div
          className={`mb-8 rounded-2xl p-5 border text-center transition-all ${
            score >= 6
              ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
              : score >= 4
              ? 'bg-amber-50/80 border-amber-300 text-amber-950'
              : 'bg-rose-50/80 border-rose-300 text-rose-950'
          }`}
        >
          <div className="inline-flex p-3 rounded-2xl bg-white/80 shadow-sm mb-2">
            <Award
              className={`w-8 h-8 ${
                score >= 6 ? 'text-emerald-600' : score >= 4 ? 'text-amber-600' : 'text-rose-600'
              }`}
            />
          </div>
          <h4 className="text-lg font-black">
            Score obtenu : {score} sur {QUESTIONS.length} ({Math.round((score / QUESTIONS.length) * 100)}%)
          </h4>
          <p className="text-xs sm:text-sm mt-1 max-w-xl mx-auto opacity-90 leading-relaxed">
            {score >= 7
              ? 'Excellente maîtrise des mécanismes de la fécondation, de la gestation et de la lactation. Vos réflexes méthodologiques sont parfaitement affûtés pour le Bac S2.'
              : score >= 5
              ? 'Bon niveau d’ensemble. Prenez le temps de revoir les justifications détaillées des questions manquées ci-dessous.'
              : 'Des confusions persistent sur la chronologie et les relais hormonaux. Relisez attentivement les 6 fiches réflexes ci-dessus avant de retenter le quiz.'}
          </p>
        </div>
      )}

      {/* Liste des questions */}
      <div className="space-y-6">
        {QUESTIONS.map((q, idx) => {
          const userAnswer = selectedAnswers[q.id];
          const isAnswered = userAnswer !== undefined;
          const isCorrect = userAnswer === q.correct;

          return (
            <div
              key={q.id}
              className={`rounded-2xl border p-4 sm:p-5 transition-all ${
                showResults
                  ? isCorrect
                    ? 'border-emerald-300 bg-emerald-50/30'
                    : 'border-rose-300 bg-rose-50/30'
                  : 'border-navy/10 bg-white hover:border-navy/20'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="w-6 h-6 rounded-lg bg-navy/5 text-navy font-black text-xs flex items-center justify-center shrink-0 border border-navy/10">
                    {idx + 1}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-navy/5 text-navy/70 border border-navy/10">
                    {q.concept}
                  </span>
                </div>
                {showResults && (
                  <span className="shrink-0 flex items-center gap-1 text-xs font-black">
                    {isCorrect ? (
                      <span className="text-emerald-700 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-emerald-600" /> Correct (+1 pt)
                      </span>
                    ) : (
                      <span className="text-rose-700 flex items-center gap-1">
                        <XCircle className="w-4 h-4 text-rose-600" /> Incorrect (0 pt)
                      </span>
                    )}
                  </span>
                )}
              </div>

              <h4 className="font-bold text-navy text-sm sm:text-base leading-snug mb-3">
                {q.question}
              </h4>

              {/* Options de réponse */}
              <div className="space-y-2">
                {q.options.map((opt, oIdx) => {
                  const isSelected = userAnswer === oIdx;
                  const isOptionCorrect = oIdx === q.correct;

                  let optionStyle =
                    'border-navy/10 bg-white hover:border-navy/30 text-navy/90';

                  if (showResults) {
                    if (isOptionCorrect) {
                      optionStyle =
                        'border-emerald-500 bg-emerald-100/60 text-emerald-950 font-bold';
                    } else if (isSelected && !isOptionCorrect) {
                      optionStyle =
                        'border-rose-400 bg-rose-100/60 text-rose-950 line-through opacity-80';
                    } else {
                      optionStyle = 'border-navy/5 bg-gray-50 text-navy/40';
                    }
                  } else if (isSelected) {
                    optionStyle =
                      'border-turquoise bg-turquoise/10 text-navy font-bold shadow-sm';
                  }

                  return (
                    <button
                      key={oIdx}
                      type="button"
                      disabled={showResults}
                      onClick={() => handleSelectOption(q.id, oIdx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${optionStyle}`}
                    >
                      <span className="w-5 h-5 rounded-md bg-navy/5 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span className="flex-1 leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explication après validation */}
              {showResults && (
                <div className="mt-4 p-3.5 rounded-xl bg-white border border-navy/10 text-xs sm:text-sm text-text/80 leading-relaxed">
                  <span className="font-bold text-navy block mb-1">
                    Justification méthodologique :
                  </span>
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Barre d'action inférieure */}
      <div className="mt-8 pt-5 border-t border-navy/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-text/60">
          {!showResults
            ? 'Cochez une option pour chaque question avant de valider votre copie.'
            : 'Consultez les explications méthodologiques pour chaque question.'}
        </p>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {!showResults ? (
            <button
              type="button"
              disabled={!allAnswered}
              onClick={() => setShowResults(true)}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-navy text-white text-xs sm:text-sm font-bold shadow-sm hover:bg-navy/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span>Valider mes réponses</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-navy/20 bg-white text-navy text-xs sm:text-sm font-bold shadow-sm hover:bg-surface transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4 text-navy/70" />
              <span>Recommencer le test</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
