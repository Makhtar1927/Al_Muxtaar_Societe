'use client';

import React, { useState } from 'react';
import MathRenderer from '@/components/course/math-renderer';
import { CheckCircle2, XCircle, RotateCcw, Trophy, Star, Droplets } from 'lucide-react';

const LETTERS = ['A', 'B', 'C', 'D'] as const;

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  points: number;
  difficulty: 1 | 2 | 3;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question:
      "Quelle est la caractéristique fondamentale de la réaction de dissolution d'un acide fort (comme HCl) dans l'eau ?",
    options: [
      "C'est un équilibre chimique incomplet réversible (double flèche ⇌)",
      "C'est une réaction totale et quantitative (flèche unique ⟶)",
      "C'est une réaction athermique qui ne dégage aucune chaleur",
      "Le pH final ne dépend absolument pas de la concentration initiale de l'acide",
    ],
    correctAnswer: 1,
    explanation:
      "Par définition, un acide fort réagit totalement avec l'eau selon l'équation : HA + H₂O ⟶ A⁻ + H₃O⁺. La dissociation est complète à 100%, sans molécule HA résiduelle.",
    points: 1,
    difficulty: 1,
  },
  {
    id: 2,
    question:
      "On prépare une solution d'acide chlorhydrique HCl de concentration Ca = 0,020 mol/L. Quel est son pH à 25 °C ?",
    options: [
      "pH = 1,70",
      "pH = 2,00",
      "pH = 2,30",
      "pH = 12,30",
    ],
    correctAnswer: 0,
    explanation:
      "Pour un monoacide fort : pH = -log(Ca) = -log(0,020) = -log(2 × 10⁻²) = 2 - log(2) = 2 - 0,301 = 1,70.",
    points: 1,
    difficulty: 1,
  },
  {
    id: 3,
    question:
      "On dissout de l'acide sulfurique H₂SO₄ dans l'eau à une concentration Ca = 5,0 × 10⁻³ mol/L. En considérant les deux acidités comme fortes, quel est le pH de la solution ?",
    options: [
      "pH = 2,30",
      "pH = 2,00",
      "pH = 1,70",
      "pH = 2,60",
    ],
    correctAnswer: 1,
    explanation:
      "Piège d'or du Bac S2 : H₂SO₄ est un diacide fort ! Chaque mole d'acide libère 2 moles de H₃O⁺. Donc [H₃O⁺] = 2 × Ca = 2 × (5,0 × 10⁻³) = 1,0 × 10⁻² mol/L. D'où pH = -log(10⁻²) = 2,00 !",
    points: 2,
    difficulty: 2,
  },
  {
    id: 4,
    question:
      "Quel est le pH d'une solution d'hydroxyde de sodium (soude) NaOH de concentration Cb = 2,5 × 10⁻² mol/L à 25 °C ?",
    options: [
      "pH = 1,60",
      "pH = 12,40",
      "pH = 11,40",
      "pH = 13,00",
    ],
    correctAnswer: 1,
    explanation:
      "Pour une monobase forte : [OH⁻] = Cb = 0,025 mol/L. pOH = -log(0,025) = 1,60. D'où pH = 14,00 - pOH = 14,00 - 1,60 = 12,40.",
    points: 1,
    difficulty: 1,
  },
  {
    id: 5,
    question:
      "Concernant la réaction de neutralisation entre un acide fort et une base forte (H₃O⁺ + OH⁻ ⟶ 2 H₂O), quelle affirmation est STRICTEMENT VRAIE ?",
    options: [
      "C'est une réaction endothermique qui refroidit le milieu",
      "C'est une réaction limitée caractérisée par une constante d'équilibre K = 10⁻¹⁴",
      "C'est une réaction quasi-totale (K ≈ 10¹⁴) et nettement exothermique",
      "La température n'a aucune influence sur la constante Ke de l'eau",
    ],
    correctAnswer: 2,
    explanation:
      "La neutralisation d'un acide fort par une base forte est la réaction inverse de l'autoprotolyse de l'eau : K = 1/Ke = 10¹⁴ à 25°C. C'est une réaction totale, rapide et très exothermique (dégagement de chaleur).",
    points: 2,
    difficulty: 2,
  },
  {
    id: 6,
    question:
      "On dose Va = 20,0 mL d'acide chlorhydrique HCl par une solution de soude NaOH de concentration Cb = 0,10 mol/L. L'équivalence est atteinte pour VbE = 15,0 mL. Quelle est la concentration Ca de l'acide ?",
    options: [
      "Ca = 0,050 mol/L",
      "Ca = 0,075 mol/L",
      "Ca = 0,133 mol/L",
      "Ca = 0,150 mol/L",
    ],
    correctAnswer: 1,
    explanation:
      "À l'équivalence stœchiométrique fort-fort : Ca × Va = Cb × VbE ⟹ Ca = (Cb × VbE) / Va = (0,10 × 15,0) / 20,0 = 1,5 / 20 = 0,075 mol/L.",
    points: 1,
    difficulty: 1,
  },
  {
    id: 7,
    question:
      "Pourquoi le pH à l'équivalence d'un titrage acide fort / base forte vaut-il STRICTEMENT 7,00 à 25 °C ?",
    options: [
      "Parce que la burette est graduée pour s'arrêter à pH 7",
      "Parce que le mélange final est une solution aqueuse de chlorure de sodium (NaCl), sel d'acide fort et de base forte dont les ions n'ont aucun caractère acide ou basique",
      "Parce que le volume de soude versé est toujours égal au volume d'acide",
      "Parce que la réaction s'arrête spontanément dès que le pH atteint 7",
    ],
    correctAnswer: 1,
    explanation:
      "À l'équivalence, tous les H₃O⁺ et OH⁻ ont réagi pour former de l'eau. Il ne reste en solution que les ions spectateurs Na⁺ et Cl⁻, qui sont totalement indifférents d'un point de vue acido-basique. La solution est donc neutre, soit pH = 7,00 à 25 °C.",
    points: 2,
    difficulty: 2,
  },
  {
    id: 8,
    question:
      "Comment repère-t-on le point d'équivalence E sur la courbe de dosage pH-métrique fort-fort par la méthode des tangentes parallèles ?",
    options: [
      "Au point où la courbe coupe l'axe des abscisses",
      "À l'intersection de la courbe avec la droite médiane équidistante des deux tangentes parallèles au saut de pH",
      "Au minimum de la courbe de titrage",
      "Au point où le volume versé est nul",
    ],
    correctAnswer: 1,
    explanation:
      "La méthode consiste à tracer deux tangentes parallèles de part et d'autre du saut de pH, puis la droite parallèle équidistante (médiane). L'intersection de cette médiane avec la courbe donne exactement le point d'équivalence E(VbE ; pHE).",
    points: 2,
    difficulty: 2,
  },
  {
    id: 9,
    question:
      "Quel indicateur coloré est le plus rigoureusement adapté pour repérer l'équivalence d'un dosage acide fort / base forte ?",
    options: [
      "L'hélianthine (zone de virage 3,1 – 4,4)",
      "La phénolphtaléine (zone de virage 8,2 – 10,0)",
      "Le bleu de bromothymol BBT (zone de virage 6,0 – 7,6)",
      "Le rouge de méthyle (zone de virage 4,2 – 6,2)",
    ],
    correctAnswer: 2,
    explanation:
      "Le critère officiel stipule que le pH à l'équivalence (pHE = 7,00) doit appartenir à la zone de virage de l'indicateur. Le BBT (6,0 - 7,6) contient idéalement 7,00 en son centre exact, avec une teinte sensible verte très nette !",
    points: 1,
    difficulty: 1,
  },
  {
    id: 10,
    question:
      "On dilue 10 fois une solution d'acide chlorhydrique de concentration Ca = 10⁻² mol/L (pH = 2,0). Quel sera le nouveau pH, et que se passerait-il si l'on diluait une infinité de fois ?",
    options: [
      "Le pH devient 1,0 ; et par dilution infinie il tend vers 0",
      "Le pH devient 3,0 ; et par dilution infinie il tend vers 7,00 sans jamais le dépasser",
      "Le pH devient 3,0 ; et par dilution infinie il devient basique à pH 14",
      "Le pH ne change pas car c'est un acide fort",
    ],
    correctAnswer: 1,
    explanation:
      "Pour un acide fort, diluer par 10 divise la concentration par 10 : pH' = -log(Ca/10) = -log(Ca) + 1 = pH + 1 = 3,0. Par dilution infinie, l'acide est si dilué que l'autoprotolyse de l'eau prend le relais : le pH tend asymptotiquement vers 7,00 sans jamais dépasser la neutralité !",
    points: 2,
    difficulty: 2,
  },
];

export default function AcideFortBaseForteQuizEmbedded() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSelect = (qId: number, optIdx: number) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const totalPoints = QUESTIONS.reduce((sum, q) => sum + q.points, 0);
  const earnedPoints = QUESTIONS.reduce((sum, q) => {
    return selectedAnswers[q.id] === q.correctAnswer ? sum + q.points : sum;
  }, 0);

  const percentage = Math.round((earnedPoints / totalPoints) * 100);

  return (
    <div className="bg-white rounded-2xl border border-navy/10 p-5 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/10 pb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-gold/10 text-gold">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-bold text-navy text-base">Quiz Bac S2 — C6 : Acide Fort &amp; Base Forte</h3>
            <p className="text-xs text-text/60">
              10 questions inédites de niveau Baccalauréat sénégalais pour tester vos réflexes
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-navy/5 text-navy border border-navy/10">
            Total : {totalPoints} points
          </span>
          {showResults && (
            <button
              onClick={resetQuiz}
              className="p-1.5 rounded-lg border border-navy/20 text-navy hover:bg-surface text-xs font-semibold flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Recommencer
            </button>
          )}
        </div>
      </div>

      {/* Score Banner when completed */}
      {showResults && (
        <div
          className={`p-4 rounded-2xl border text-center space-y-2 ${
            percentage >= 80
              ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
              : percentage >= 50
              ? 'bg-amber-50 border-amber-200 text-amber-900'
              : 'bg-rose-50 border-rose-200 text-rose-900'
          }`}
        >
          <div className="text-2xl font-bold">
            Score : {earnedPoints} / {totalPoints} ({percentage}%)
          </div>
          <p className="text-xs font-medium">
            {percentage >= 80
              ? '🎉 Excellent ! Vous maîtrisez parfaitement les dosages fort-fort, le calcul de pH et la méthode des tangentes !'
              : percentage >= 50
              ? '👍 Bon travail ! Révisez bien le piège du diacide H₂SO₄ et le choix du BBT.'
              : '⚠️ Reprenez les Fiches Réflexes C6 ci-dessus et rejouez le simulateur de titrage pour consolider vos acquis.'}
          </p>
        </div>
      )}

      {/* Questions list */}
      <div className="space-y-6">
        {QUESTIONS.map((q, idx) => {
          const userChoice = selectedAnswers[q.id];
          const isAnswered = userChoice !== undefined;
          const isCorrect = userChoice === q.correctAnswer;

          return (
            <div
              key={q.id}
              className={`p-4 rounded-xl border transition-all ${
                showResults
                  ? isCorrect
                    ? 'border-emerald-200 bg-emerald-50/20'
                    : 'border-rose-200 bg-rose-50/20'
                  : 'border-navy/10 bg-surface/30'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-navy flex items-center gap-1">
                  <span className="w-5 h-5 rounded-full bg-navy/10 text-navy flex items-center justify-center text-[10px]">
                    {idx + 1}
                  </span>
                  <span>Question {idx + 1}</span>
                </span>
                <div className="flex items-center gap-1 text-[11px] font-semibold text-text/50">
                  <div className="flex">
                    {Array.from({ length: q.difficulty }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-gold text-gold" />
                    ))}
                  </div>
                  <span>• {q.points} pt{q.points > 1 ? 's' : ''}</span>
                </div>
              </div>

              <p className="text-sm font-semibold text-navy mb-3 leading-relaxed">{q.question}</p>

              {/* Options */}
              <div className="space-y-2">
                {q.options.map((opt, optIdx) => {
                  const isThisSelected = userChoice === optIdx;
                  const isThisCorrect = optIdx === q.correctAnswer;

                  let optClass = 'bg-white border-navy/15 text-navy hover:bg-surface';
                  if (showResults) {
                    if (isThisCorrect) {
                      optClass = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
                    } else if (isThisSelected) {
                      optClass = 'bg-rose-50 border-rose-300 text-rose-900 line-through';
                    } else {
                      optClass = 'bg-white/50 border-navy/10 text-text/40';
                    }
                  } else if (isThisSelected) {
                    optClass = 'bg-turquoise/10 border-turquoise text-turquoise font-semibold';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(q.id, optIdx)}
                      disabled={showResults}
                      className={`w-full p-2.5 rounded-xl border text-left text-xs transition-all flex items-center gap-2.5 ${optClass}`}
                    >
                      <span
                        className={`w-5 h-5 rounded-md flex items-center justify-center font-bold text-[10px] shrink-0 ${
                          showResults && isThisCorrect
                            ? 'bg-emerald-600 text-white'
                            : isThisSelected
                            ? 'bg-turquoise text-white'
                            : 'bg-navy/10 text-navy'
                        }`}
                      >
                        {LETTERS[optIdx]}
                      </span>
                      <span className="flex-1">{opt}</span>
                      {showResults && isThisCorrect && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      )}
                      {showResults && isThisSelected && !isThisCorrect && (
                        <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explication */}
              {showResults && (
                <div className="mt-3 p-3 rounded-xl bg-white border border-navy/10 text-xs text-text/80 space-y-1">
                  <span className="font-bold text-navy block">Explication Bac S2 :</span>
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Validation button */}
      {!showResults ? (
        <button
          onClick={() => setShowResults(true)}
          disabled={Object.keys(selectedAnswers).length === 0}
          className="w-full py-3 rounded-xl bg-turquoise hover:bg-turquoise/90 disabled:opacity-50 text-white font-bold text-sm shadow-sm transition-all"
        >
          Valider mes réponses ({Object.keys(selectedAnswers).length}/{QUESTIONS.length} répondues)
        </button>
      ) : (
        <button
          onClick={resetQuiz}
          className="w-full py-3 rounded-xl bg-navy text-white font-bold text-sm shadow-sm hover:bg-navy/90 transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" /> Recommencer le Quiz
        </button>
      )}
    </div>
  );
}

