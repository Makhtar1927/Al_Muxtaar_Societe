'use client';

import React, { useState, useEffect, useCallback } from 'react';
import MathRenderer from '@/components/course/math-renderer';
import StudyIcon from '@/components/ui/study-icon';

interface RawAnswer {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

interface RawQuestion {
  id: string;
  question: string;
  difficulty: 1 | 2 | 3;
  answers: RawAnswer[];
}

interface ProcessedQuestion {
  id: string;
  question: string;
  difficulty: 1 | 2 | 3;
  answers: {
    letter: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

const COMPLEXES_QUESTION_BANK: RawQuestion[] = [
  {
    id: 'cx_1',
    difficulty: 1,
    question: `Quelle est la forme exponentielle du nombre complexe $z = 1 - i\\sqrt{3}$ ?`,
    answers: [
      { id: '1', text: `$z = 2 e^{-i\\frac{\\pi}{3}}$`, isCorrect: true, explanation: "✓ Exact ! Module $|z| = \\sqrt{1 + 3} = 2$. Cosinus $\\cos\\theta = 1/2$ et sinus $\\sin\\theta = -\\sqrt{3}/2$, donc $\\theta = -\\pi/3$." },
      { id: '2', text: `$z = 2 e^{i\\frac{\\pi}{3}}$`, isCorrect: false, explanation: "Attention au signe : la partie imaginaire est négative ($-\\sqrt{3}$), donc l'argument est négatif." },
      { id: '3', text: `$z = 4 e^{-i\\frac{\\pi}{6}}$`, isCorrect: false, explanation: "Le module vaut $\\sqrt{4} = 2$, et non 4. De plus, quand le $\\sqrt{3}$ est devant le i, l'angle est en $\\pi/3$." },
      { id: '4', text: `$z = \\sqrt{2} e^{-i\\frac{\\pi}{3}}$`, isCorrect: false, explanation: "Erreur de calcul sur le module : $1^2 + (-\\sqrt{3})^2 = 1 + 3 = 4$, d'où $r = 2$." },
    ],
  },
  {
    id: 'cx_2',
    difficulty: 1,
    question: `Dans $\\mathbb{C}$, quelles sont les solutions de l'équation $z^2 + 9 = 0$ ?`,
    answers: [
      { id: '1', text: `$S = \\{-3i, 3i\\}$`, isCorrect: true, explanation: "✓ Bravo ! $z^2 = -9 = 9i^2 = (3i)^2$, d'où $z = 3i$ ou $z = -3i$." },
      { id: '2', text: `$S = \\{-3, 3\\}$`, isCorrect: false, explanation: "$3^2 + 9 = 18 \\neq 0$. Un carré de réel ne peut pas être négatif sans le nombre imaginaire i." },
      { id: '3', text: `$S = \\{9i, -9i\\}$`, isCorrect: false, explanation: "La racine carrée de 9 est 3, pas 9." },
      { id: '4', text: `$S = \\emptyset$`, isCorrect: false, explanation: "Dans $\\mathbb{C}$, toute équation polynomiale de degré n admet exactement n racines comptées avec leur multiplicité (Théorème de d'Alembert-Gauss)." },
    ],
  },
  {
    id: 'cx_3',
    difficulty: 2,
    question: `Soient les points $A$, $B$ et $C$ d'affixes respectives $z_A$, $z_B$, $z_C$ tels que $\\dfrac{z_C - z_A}{z_B - z_A} = i$. Quelle est la nature du triangle $ABC$ ?`,
    answers: [
      { id: '1', text: `Rectangle et isocèle en $A$`, isCorrect: true, explanation: "✓ Exact ! $|i| = 1 \\implies \\frac{AC}{AB} = 1 \\implies AB = AC$. Et $\\arg(i) = \\frac{\\pi}{2} \\implies (\\vec{AB}, \\vec{AC}) = \\frac{\\pi}{2}$. Le triangle est donc rectangle et isocèle en A." },
      { id: '2', text: `Équilatéral`, isCorrect: false, explanation: "Pour un triangle équilatéral, le quotient vaudrait $e^{\\pm i\\frac{\\pi}{3}} = \\frac{1}{2} \\pm i\\frac{\\sqrt{3}}{2}$." },
      { id: '3', text: `Rectangle et isocèle en $B$`, isCorrect: false, explanation: "Attention au sommet : le point A apparaît au dénominateur et au numérateur, c'est donc en A que se trouve l'angle droit." },
      { id: '4', text: `Les points sont alignés`, isCorrect: false, explanation: "Les points seraient alignés si le quotient était un nombre réel, or $i$ est imaginaire pur." },
    ],
  },
  {
    id: 'cx_4',
    difficulty: 2,
    question: `D'après la formule de Moivre, que vaut $(\\cos\\theta + i\\sin\\theta)^4$ ?`,
    answers: [
      { id: '1', text: `$\\cos(4\\theta) + i\\sin(4\\theta)$`, isCorrect: true, explanation: "✓ Règle d'or : $(e^{i\\theta})^4 = e^{i 4\\theta} = \\cos(4\\theta) + i\\sin(4\\theta)$." },
      { id: '2', text: `$\\cos^4\\theta + i\\sin^4\\theta$`, isCorrect: false, explanation: "Erreur fréquente : la puissance ne s'applique pas aux termes isolés, mais multiplie l'angle (formule de Moivre)." },
      { id: '3', text: `$\\cos^4\\theta - \\sin^4\\theta$`, isCorrect: false, explanation: "Ceci omet complètement la partie imaginaire." },
      { id: '4', text: `$4\\cos\\theta + 4i\\sin\\theta$`, isCorrect: false, explanation: "Confusion entre puissance et multiplication." },
    ],
  },
  {
    id: 'cx_5',
    difficulty: 3,
    question: `Quelle est l'écriture complexe de la rotation de centre $\\Omega(1 + 2i)$ et d'angle $\\dfrac{\\pi}{2}$ ?`,
    answers: [
      { id: '1', text: `$z' = i z + 3 + i$`, isCorrect: true, explanation: "✓ Bravo ! Formule $z' - \\omega = e^{i\\frac{\\pi}{2}}(z - \\omega) = i(z - (1 + 2i)) = iz - i - 2i^2 = iz - i + 2$. Donc $z' = iz + 2 - i + (1 + 2i) = iz + 3 + i$." },
      { id: '2', text: `$z' = i z + 1 + 2i$`, isCorrect: false, explanation: "Vous avez oublié de multiplier le centre par $-i$ lors du développement de $z' - \\omega = i(z - \\omega)$." },
      { id: '3', text: `$z' = -i z + 3 + i$`, isCorrect: false, explanation: "$e^{i\\frac{\\pi}{2}} = +i$, pas $-i$." },
      { id: '4', text: `$z' = 2z + 1 + 2i$`, isCorrect: false, explanation: "Une rotation a un rapport égal à 1 ($|e^{i\\theta}| = 1$), jamais 2." },
    ],
  },
  {
    id: 'cx_6',
    difficulty: 3,
    question: `Soit la similitude directe d'écriture $z' = (1 + i)z + 2$. Quel est son rapport $k$ et son angle $\\theta$ ?`,
    answers: [
      { id: '1', text: `$k = \\sqrt{2}$ et $\\theta = \\dfrac{\\pi}{4}$`, isCorrect: true, explanation: "✓ Excellent ! Le coefficient de $z$ est $a = 1 + i$. Rapport $k = |a| = \\sqrt{1^2 + 1^2} = \\sqrt{2}$. Angle $\\theta = \\arg(1 + i) = \\frac{\\pi}{4}$ car $\\cos\\theta = \\frac{1}{\\sqrt{2}} = \\frac{\\sqrt{2}}{2}$ et $\\sin\\theta = \\frac{\\sqrt{2}}{2}$." },
      { id: '2', text: `$k = 2$ et $\\theta = \\dfrac{\\pi}{4}$`, isCorrect: false, explanation: "Le module de $1+i$ est $\\sqrt{2}$, et non 2." },
      { id: '3', text: `$k = \\sqrt{2}$ et $\\theta = \\dfrac{\\pi}{2}$`, isCorrect: false, explanation: "L'angle $\\frac{\\pi}{2}$ correspondrait à l'affixe $i$, or nous avons $1+i$." },
      { id: '4', text: `$k = 1$ et $\\theta = \\dfrac{\\pi}{4}$`, isCorrect: false, explanation: "Le rapport vaut $\\sqrt{2} > 1$." },
    ],
  },
];

export default function ComplexesQuizEmbedded() {
  const [questions, setQuestions] = useState<ProcessedQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const letters = ['A', 'B', 'C', 'D'];

  const initQuiz = useCallback(() => {
    const processed: ProcessedQuestion[] = COMPLEXES_QUESTION_BANK.map((q) => {
      const shuffledAnswers = [...q.answers].sort(() => Math.random() - 0.5);
      return {
        id: q.id,
        question: q.question,
        difficulty: q.difficulty,
        answers: shuffledAnswers.map((ans, idx) => ({
          letter: letters[idx],
          text: ans.text,
          isCorrect: ans.isCorrect,
          explanation: ans.explanation,
        })),
      };
    });

    setQuestions(processed);
    setCurrentIdx(0);
    setSelectedLetter(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  }, []);

  useEffect(() => {
    initQuiz();
  }, [initQuiz]);

  if (questions.length === 0) {
    return null;
  }

  const currentQ = questions[currentIdx];
  const selectedAnswerObj = currentQ?.answers.find((a) => a.letter === selectedLetter);

  const handleSelect = (letter: string) => {
    if (isAnswered) return;
    setSelectedLetter(letter);
    setIsAnswered(true);

    const ans = currentQ.answers.find((a) => a.letter === letter);
    if (ans?.isCorrect) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1);
      setSelectedLetter(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-turquoise/20 p-5 sm:p-7 shadow-sm">
      {/* Header Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy/10 pb-4 mb-6">
        <div className="flex items-start sm:items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-turquoise/15 text-turquoise flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 p-2">
            <StudyIcon name="eclair_reflexe" size={24} />
          </div>
          <div className="min-w-0">
            <h3 className="font-extrabold text-navy text-base sm:text-lg leading-tight break-words">
              Quiz Éclair : Nombres Complexes &amp; Géométrie (Bac S2)
            </h3>
            <p className="text-xs text-text/60 mt-1 leading-snug">
              6 questions de cours, de calcul algébrique et de similitudes directes
            </p>
          </div>
        </div>

        {!isFinished && (
          <span className="self-start sm:self-center text-xs font-bold text-navy bg-surface px-3 py-1.5 rounded-xl border border-navy/10 shrink-0 whitespace-nowrap">
            Question {currentIdx + 1} / {questions.length}
          </span>
        )}
      </div>

      {!isFinished ? (
        <div className="space-y-6">
          {/* Question text */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-turquoise bg-turquoise/10 px-2 py-0.5 rounded">
                Difficulté {currentQ.difficulty}/3
              </span>
            </div>
            <div className="text-base sm:text-lg font-bold text-navy leading-relaxed">
              <MathRenderer content={currentQ.question} />
            </div>
          </div>

          {/* Answers options */}
          <div className="grid grid-cols-1 gap-2.5">
            {currentQ.answers.map((ans) => {
              const isSelected = selectedLetter === ans.letter;
              let btnClass = 'border-navy/15 bg-white hover:border-turquoise hover:bg-turquoise/5 text-navy';

              if (isAnswered) {
                if (ans.isCorrect) {
                  btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                } else if (isSelected && !ans.isCorrect) {
                  btnClass = 'border-rose-500 bg-rose-50 text-rose-950';
                } else {
                  btnClass = 'border-navy/10 bg-gray-50 text-text/40 opacity-60';
                }
              }

              return (
                <button
                  key={ans.letter}
                  disabled={isAnswered}
                  onClick={() => handleSelect(ans.letter)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border-2 transition-all flex items-start gap-3 active:scale-[0.99] ${btnClass}`}
                >
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 mt-0.5 ${
                      isAnswered && ans.isCorrect
                        ? 'bg-emerald-600 text-white'
                        : isAnswered && isSelected && !ans.isCorrect
                        ? 'bg-rose-600 text-white'
                        : 'bg-navy/10 text-navy'
                    }`}
                  >
                    {ans.letter}
                  </span>
                  <div className="text-sm font-medium flex-1">
                    <MathRenderer content={ans.text} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation panel */}
          {isAnswered && selectedAnswerObj && (
            <div
              className={`rounded-2xl p-4 border animate-in fade-in duration-200 ${
                selectedAnswerObj.isCorrect
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50/80 border-rose-300 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-2 font-black text-sm mb-1">
                {selectedAnswerObj.isCorrect ? (
                  <>
                    <StudyIcon name="trophee_reussite" size={18} className="text-emerald-600" />
                    <span>Bonne réponse !</span>
                  </>
                ) : (
                  <>
                    <StudyIcon name="piege_bac" size={18} className="text-rose-600" />
                    <span>Attention au piège de l&apos;examinateur !</span>
                  </>
                )}
              </div>
              <div className="text-xs leading-relaxed">
                <MathRenderer content={selectedAnswerObj.explanation} />
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleNext}
                  className="bg-navy hover:bg-navy/90 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition-transform active:scale-95"
                >
                  {currentIdx < questions.length - 1 ? 'Question suivante →' : 'Voir mon bilan final 🏆'}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Results screen */
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-turquoise/15 flex items-center justify-center text-turquoise p-3">
            <StudyIcon name="trophee_reussite" size={36} />
          </div>
          <div>
            <h4 className="text-xl font-black text-navy">
              {score >= 5
                ? 'Excellent travail ! 🎯'
                : score >= 3
                ? 'Bien joué ! Continuez ainsi 👏'
                : 'Encore un petit effort ! 💪'}
            </h4>
            <p className="text-xs text-text/60 mt-1">
              Vous avez obtenu <strong className="text-navy">{score}</strong> sur{' '}
              <strong className="text-navy">{questions.length}</strong> questions correctes.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={initQuiz}
              className="inline-flex items-center gap-2 bg-turquoise text-navy font-black text-xs px-5 py-3 rounded-xl shadow hover:bg-turquoise/90 transition-transform active:scale-95"
            >
              <StudyIcon name="recommencer" size={16} />
              <span>Recommencer avec de nouvelles options</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

