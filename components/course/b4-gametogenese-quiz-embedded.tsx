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
      'Parmi les cellules suivantes de la lignée germinale masculine, quelle est la première cellule haploïde (n chromosomes) ?',
    options: [
      'La spermatogonie',
      'Le spermatocyte I',
      'Le spermatocyte II',
      'La spermatide',
    ],
    correct: 2,
    explanation:
      'Le spermatocyte II résulte de la première division de méiose (division réductionnelle) qui sépare les chromosomes homologues. Il possède donc n chromosomes (n = 23 chez l’homme), chacun étant formé de deux chromatides sœurs (n, 2C). Les spermatogonies et spermatocytes I sont diploïdes (2n).',
    concept: 'Ploïdie & Méiose I',
  },
  {
    id: 2,
    question:
      'À quel stade de la méiose se trouve bloqué le gamète femelle expulsé lors de l’ovulation ?',
    options: [
      'En Prophase I (stade diplotène)',
      'En Métaphase I',
      'En Métaphase II',
      'En Télophase II',
    ],
    correct: 2,
    explanation:
      'Lors de l’ovulation au 14e jour du cycle, l’ovaire expulse un ovocyte II bloqué en Métaphase II, accompagné de son premier globule polaire (GP1). Le premier blocage a lieu en Prophase I chez le fœtus ; le second blocage en Métaphase II n’est levé que s’il y a fécondation par un spermatozoïde.',
    concept: 'Blocages Méiotiques',
  },
  {
    id: 3,
    question:
      'Dans le testicule, où sont situées les cellules de Leydig et quelle est leur fonction principale ?',
    options: [
      'À l’intérieur des tubes séminifères pour nourrir les spermatocytes',
      'Dans l’espace interstitiel entre les tubes pour sécréter la testostérone',
      'Dans la lumière du tube séminifère pour guider les spermatozoïdes',
      'Sur la membrane basale pour se diviser et donner des spermatogonies',
    ],
    correct: 1,
    explanation:
      'Les cellules de Leydig constituent le tissu interstitiel endocrine du testicule, situé à l’extérieur des tubes séminifères et au contact des vaisseaux sanguins. Elles sécrètent la testostérone. Les cellules nourricières intra-tubulaires sont les cellules de Sertoli.',
    concept: 'Histologie Testiculaire',
  },
  {
    id: 4,
    question:
      'La spermiogenèse est définie comme :',
    options: [
      'L’ensemble des mitoses successives des spermatogonies',
      'La double division réductionnelle et équationnelle de la méiose',
      'La différenciation cytologique de la spermatide ronde en spermatozoïde sans division',
      'La pénétration du spermatozoïde dans l’ovocyte II',
    ],
    correct: 2,
    explanation:
      'La spermiogenèse est la phase finale de différenciation morphologique. Sans aucune division cellulaire supplémentaire, la spermatide ronde se métamorphose en spermatozoïde : formation de l’acrosome, condensation du noyau avec des protamines, apparition du flagelle et élimination du cytoplasme résiduel.',
    concept: 'Spermiogenèse',
  },
  {
    id: 5,
    question:
      'Si une cellule somatique humaine contient une quantité d’ADN notée 2Q en phase G1, quelle est la quantité d’ADN contenue dans un spermatocyte II ?',
    options: ['4Q', '2Q', 'Q', '0,5Q'],
    correct: 1,
    explanation:
      'Un spermatocyte I possède 4Q d’ADN après réplication (2n chromosomes doubles). La méiose I réductionnelle divise cette quantité par deux sans séparer les chromatides sœurs : chaque spermatocyte II contient donc n chromosomes à deux chromatides, ce qui correspond exactement à une quantité 2Q d’ADN ! La quantité ne tombera à Q qu’après la méiose II chez la spermatide.',
    concept: 'Quantité d’ADN & Méiose',
  },
  {
    id: 6,
    question:
      'Après l’ovulation, que devient le follicule délesté de son ovocyte au sein de l’ovaire ?',
    options: [
      'Il est immédiatement expulsé dans la trompe de Fallope',
      'Il dégénère instantanément en une cicatrice fibreuse',
      'Il se transforme en corps jaune sous l’effet de la LH et sécrète progestérone et œstrogènes',
      'Il recommence immédiatement un nouveau cycle de mitoses pour former un follicule primaire',
    ],
    correct: 2,
    explanation:
      'Sous l’influence du pic de LH, les cellules de la granulosa et de la thèque interne restantes se vascularisent et subissent la lutéinisation pour former le corps jaune. Celui-ci sécrète de fortes doses de progestérone et des œstrogènes pour préparer l’endomètre à une éventuelle nidation.',
    concept: 'Folliculogenèse & Corps Jaune',
  },
  {
    id: 7,
    question:
      'L’expulsion du 2e globule polaire (GP2) par le gamète femelle se produit :',
    options: [
      'Au moment de la rupture du follicule de De Graaf à J14',
      'Uniquement après la pénétration d’un spermatozoïde fécondant',
      'Dès la puberté sous l’action du pic pré-ovulatoire de LH',
      'Au 7e mois de la vie fœtale intra-utérine',
    ],
    correct: 1,
    explanation:
      'La deuxième division de méiose (équationnelle) est bloquée en Métaphase II. Seule la fécondation (vague d’ions Ca2+ déclenchée par le spermatozoïde) permet la reprise de la méiose, l’achèvement de l’anaphase II et l’expulsion asymétrique du 2e globule polaire (GP2). Sans fécondation, le GP2 n’est jamais émis.',
    concept: 'Dénouement de la Méiose',
  },
  {
    id: 8,
    question:
      'Quel est le rendement gamétique d’une ovogonie par rapport à une spermatogonie après maturation complète ?',
    options: [
      '1 ovogonie donne 4 ovocytes utiles, comme 1 spermatogonie donne 4 spermatozoïdes',
      '1 ovogonie donne 1 seul ovocyte II volumineux utile et des globules polaires dégénérescents, contre 4 spermatozoïdes utiles pour 1 spermatogonie',
      '1 ovogonie donne 2 ovocytes utiles et 2 globules polaires',
      '1 ovogonie donne 8 ovotides après divisions supplémentaires',
    ],
    correct: 1,
    explanation:
      'L’ovogenèse se caractérise par des divisions cytoplasmiques hautement asymétriques qui concentrent toutes les réserves vitellines (vitellus, organites, ARNm maternels) dans une seule cellule géante : l’ovocyte II. Les cellules sœurs expulsées (globules polaires GP1 et GP2) sont minuscules et dégénèrent. Chez l’homme, la méiose est symétrique et produit 4 spermatozoïdes fonctionnels.',
    concept: 'Rendement Gamétique Comparé',
  },
];

export default function B4GametogeneseQuizEmbedded() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const letters = ['A', 'B', 'C', 'D'];

  function handleSelect(questionId: number, optionIdx: number) {
    if (showResults) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  }

  function calculateScore() {
    let score = 0;
    QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct) {
        score++;
      }
    });
    return score;
  }

  function handleReset() {
    setSelectedAnswers({});
    setShowResults(false);
  }

  const score = calculateScore();
  const allAnswered = Object.keys(selectedAnswers).length === QUESTIONS.length;

  return (
    <div className="bg-white rounded-2xl border border-navy/15 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy via-slate-900 to-indigo-950 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-teal-300" />
          </div>
          <div>
            <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">
              Auto-évaluation Bac S2
            </span>
            <h3 className="text-lg sm:text-xl font-bold">
              Quiz d’Entraînement : Gamétogenèse & Méiose (8 Questions Types)
            </h3>
          </div>
        </div>
        <p className="text-sm text-slate-300 max-w-2xl mt-1">
          Testez votre maîtrise des pièges classiques du Bac S2 : ploïdie, quantité d’ADN, blocages méiotiques, histologie du testicule et folliculogenèse.
        </p>
      </div>

      {/* Questions */}
      <div className="p-5 sm:p-6 space-y-6">
        {QUESTIONS.map((q, idx) => {
          const userAnswer = selectedAnswers[q.id];
          const isCorrect = userAnswer === q.correct;

          return (
            <div
              key={q.id}
              className={`p-4 sm:p-5 rounded-xl border transition-all ${
                showResults
                  ? isCorrect
                    ? 'bg-emerald-50/70 border-emerald-300'
                    : 'bg-rose-50/70 border-rose-300'
                  : 'bg-surface/50 border-navy/10 hover:border-navy/20'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-navy text-white text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                    {q.concept}
                  </span>
                </div>
                {showResults && (
                  <div>
                    {isCorrect ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-700">
                        <CheckCircle className="w-4 h-4 text-emerald-600" /> Correct (+1)
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-rose-700">
                        <XCircle className="w-4 h-4 text-rose-600" /> Incorrect
                      </span>
                    )}
                  </div>
                )}
              </div>

              <h4 className="font-bold text-navy text-sm sm:text-base mb-3 leading-snug">
                {q.question}
              </h4>

              {/* Options */}
              <div className="space-y-2">
                {q.options.map((opt, oIdx) => {
                  const isSelected = userAnswer === oIdx;
                  let optStyle =
                    'border-navy/10 bg-white text-navy hover:bg-slate-50 hover:border-navy/20';

                  if (showResults) {
                    if (oIdx === q.correct) {
                      optStyle = 'border-emerald-500 bg-emerald-100 text-emerald-950 font-bold';
                    } else if (isSelected) {
                      optStyle = 'border-rose-400 bg-rose-100 text-rose-950 line-through';
                    } else {
                      optStyle = 'border-navy/5 bg-white/60 text-navy/40';
                    }
                  } else if (isSelected) {
                    optStyle = 'border-teal-500 bg-teal-50 text-teal-900 font-bold shadow-xs';
                  }

                  return (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => handleSelect(q.id, oIdx)}
                      disabled={showResults}
                      className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm flex items-center gap-3 transition-all ${optStyle}`}
                    >
                      <span
                        className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 border ${
                          isSelected
                            ? 'bg-teal-600 text-white border-teal-600'
                            : 'bg-navy/5 text-navy border-navy/10'
                        }`}
                      >
                        {letters[oIdx]}
                      </span>
                      <span className="flex-1">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explication après validation */}
              {showResults && (
                <div className="mt-3 bg-white p-3.5 rounded-xl border border-navy/10 text-xs sm:text-sm text-text/80 space-y-1">
                  <p className="font-bold text-navy flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-teal-600" />
                    Explication de la réponse :
                  </p>
                  <p className="leading-relaxed">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}

        {/* Footer Score & Boutons */}
        <div className="border-t border-navy/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          {showResults ? (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs text-text/60 font-medium">Votre score final :</p>
                <p className="text-xl font-black text-navy">
                  {score} / {QUESTIONS.length}{' '}
                  <span className="text-sm font-semibold text-text/70">
                    ({Math.round((score / QUESTIONS.length) * 100)}%)
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-text/60 italic">
              {Object.keys(selectedAnswers).length} sur {QUESTIONS.length} questions répondues.
            </p>
          )}

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {showResults ? (
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-navy/20 bg-white hover:bg-slate-50 text-navy font-bold text-xs transition"
              >
                <RotateCcw className="w-4 h-4" /> Recommencer le test
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowResults(true)}
                disabled={!allAnswered}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 text-white font-bold text-xs transition shadow-sm"
              >
                Valider mes réponses <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

