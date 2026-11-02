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

const EQUADIFF_QUESTION_BANK: RawQuestion[] = [
  {
    id: 'eq_1',
    difficulty: 1,
    question: `Quelle est la solution générale sur $\\mathbb{R}$ de l'équation différentielle $y' - 4y = 0$ ?`,
    answers: [
      { id: '1', text: `$y(x) = C \\cdot e^{4x} \\quad (C \\in \\mathbb{R})$`, isCorrect: true, explanation: "✓ Exact ! L'équation s'écrit $y' = 4y$. La solution de $y' = ky$ est $C e^{kx}$, donc ici $C e^{4x}$." },
      { id: '2', text: `$y(x) = C \\cdot e^{-4x} \\quad (C \\in \\mathbb{R})$`, isCorrect: false, explanation: "Attention au signe : $y' - 4y = 0 \\iff y' = +4y$ ! Le signe de l'exponentielle est donc positif." },
      { id: '3', text: `$y(x) = 4e^x + C$`, isCorrect: false, explanation: "Ceci n'est pas la forme générale des solutions d'une équation homogène du premier ordre." },
      { id: '4', text: `$y(x) = \\ln(4x) + C$`, isCorrect: false, explanation: "La solution fait intervenir l'exponentielle, jamais le logarithme." },
    ],
  },
  {
    id: 'eq_2',
    difficulty: 1,
    question: `Quelle est l'unique solution de $y' + 2y = 0$ vérifiant la condition initiale $y(0) = 3$ ?`,
    answers: [
      { id: '1', text: `$f(x) = 3e^{-2x}$`, isCorrect: true, explanation: "✓ Bravo ! La forme générale est $y(x) = C e^{-2x}$. Condition $y(0) = C e^0 = C = 3$. Donc $f(x) = 3e^{-2x}$." },
      { id: '2', text: `$f(x) = 3e^{2x}$`, isCorrect: false, explanation: "Erreur de signe : pour $y' + ay = 0$, la puissance est $-ax$, donc $-2x$." },
      { id: '3', text: `$f(x) = -2e^{3x}$`, isCorrect: false, explanation: "Confusion entre la condition initiale et le coefficient différentiel." },
      { id: '4', text: `$f(x) = e^{-2x} + 2$`, isCorrect: false, explanation: "Une équation sans second membre n'a pas de terme constant additif." },
    ],
  },
  {
    id: 'eq_3',
    difficulty: 2,
    question: `Quelle est la solution générale sur $\\mathbb{R}$ de l'équation $y' + 3y = 6$ ?`,
    answers: [
      { id: '1', text: `$y(x) = C e^{-3x} + 2 \\quad (C \\in \\mathbb{R})$`, isCorrect: true, explanation: "✓ Exact ! La solution constante particulière est $y_0 = \\frac{b}{a} = \\frac{6}{3} = 2$. On l'ajoute à la solution homogène $C e^{-3x}$." },
      { id: '2', text: `$y(x) = C e^{-3x} + 6$`, isCorrect: false, explanation: "Erreur : il faut diviser le second membre par le coefficient de y, ici $6 / 3 = 2$." },
      { id: '3', text: `$y(x) = C e^{3x} - 2$`, isCorrect: false, explanation: "Double erreur de signe." },
      { id: '4', text: `$y(x) = 2e^{-3x}$`, isCorrect: false, explanation: "Ceci omet la solution générale avec la constante $C$ et le second membre." },
    ],
  },
  {
    id: 'eq_4',
    difficulty: 2,
    question: `L'ensemble des solutions sur $\\mathbb{R}$ de l'équation différentielle du second ordre $y'' + 16y = 0$ est :`,
    answers: [
      { id: '1', text: `$y(x) = A \\cos(4x) + B \\sin(4x) \\quad (A, B \\in \\mathbb{R})$`, isCorrect: true, explanation: "✓ Règle d'or : $y'' + \\omega^2 y = 0$ avec $\\omega^2 = 16 \\implies \\omega = 4$. Les solutions sont donc $A\\cos(4x) + B\\sin(4x)$." },
      { id: '2', text: `$y(x) = A \\cos(16x) + B \\sin(16x)$`, isCorrect: false, explanation: "Attention : la pulsation est la racine carrée de 16, soit $\\omega = 4$, et non 16." },
      { id: '3', text: `$y(x) = C_1 e^{4x} + C_2 e^{-4x}$`, isCorrect: false, explanation: "Ceci serait la solution de $y'' - 16y = 0$, pas avec un signe plus !" },
      { id: '4', text: `$y(x) = (Ax + B)e^{4x}$`, isCorrect: false, explanation: "Forme réservée au cas d'une racine double réelle dans une équation complète." },
    ],
  },
  {
    id: 'eq_5',
    difficulty: 3,
    question: `Pour l'équation différentielle $y'' - 6y' + 9y = 0$, quelle est la forme des solutions sur $\\mathbb{R}$ ?`,
    answers: [
      { id: '1', text: `$y(x) = (C_1 x + C_2) e^{3x} \\quad (C_1, C_2 \\in \\mathbb{R})$`, isCorrect: true, explanation: "✓ Bravo ! Équation caractéristique $r^2 - 6r + 9 = 0 \\iff (r - 3)^2 = 0$. Il y a une racine double $r_0 = 3$, donc la solution est $(C_1 x + C_2)e^{3x}$." },
      { id: '2', text: `$y(x) = C_1 e^{3x} + C_2 e^{-3x}$`, isCorrect: false, explanation: "Ceci correspondrait à deux racines réelles distinctes opposées." },
      { id: '3', text: `$y(x) = C e^{3x}$`, isCorrect: false, explanation: "Incomplet : une équation différentielle du 2nd ordre possède toujours un espace de solutions de dimension 2." },
      { id: '4', text: `$y(x) = e^{3x}(A \\cos x + B \\sin x)$`, isCorrect: false, explanation: "Le discriminant est nul ($\Delta = 0$), il n'y a pas de terme trigonométrique." },
    ],
  },
  {
    id: 'eq_6',
    difficulty: 3,
    question: `Soit la solution $f$ de $y'' + 4y = 0$ vérifiant $f(0) = 1$ et $f'(0) = 0$. Quelle est la valeur de $f\\left(\\dfrac{\\pi}{4}\\right)$ ?`,
    answers: [
      { id: '1', text: `$f\\left(\\dfrac{\\pi}{4}\\right) = 0$`, isCorrect: true, explanation: "✓ Excellent ! $\\omega = 2$. $f(x) = A\\cos(2x) + B\\sin(2x)$. $f(0) = A = 1$. $f'(0) = 2B = 0 \\implies B = 0$. Donc $f(x) = \\cos(2x)$. En $\\frac{\\pi}{4}$, $f(\\pi/4) = \\cos(2 \\cdot \\frac{\\pi}{4}) = \\cos(\\frac{\\pi}{2}) = 0$." },
      { id: '2', text: `$f\\left(\\dfrac{\\pi}{4}\\right) = 1$`, isCorrect: false, explanation: "Calcul erroné : $\\cos(\\pi/2) = 0$ et non 1." },
      { id: '3', text: `$f\\left(\\dfrac{\\pi}{4}\\right) = -1$`, isCorrect: false, explanation: "$-1$ correspondrait à $\\cos(\\pi)$ pour $x = \\pi/2$." },
      { id: '4', text: `$f\\left(\\dfrac{\\pi}{4}\\right) = \\dfrac{\\sqrt{2}}{2}$`, isCorrect: false, explanation: "Vous avez oublié de multiplier par la pulsation $\\omega = 2$ dans l'argument du cosinus." },
    ],
  },
];

export default function EquadiffQuizEmbedded() {
  const [questions, setQuestions] = useState<ProcessedQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const letters = ['A', 'B', 'C', 'D'];

  const initQuiz = useCallback(() => {
    const processed: ProcessedQuestion[] = EQUADIFF_QUESTION_BANK.map((q) => {
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
              Quiz Éclair : Équations Différentielles (1er &amp; 2nd Ordre)
            </h3>
            <p className="text-xs text-text/60 mt-1 leading-snug">
              6 questions d&apos;automatismes conformes aux exigences du Bac S2
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

