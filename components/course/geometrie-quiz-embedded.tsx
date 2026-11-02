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

const GEOMETRIE_QUESTION_BANK: RawQuestion[] = [
  {
    id: 'geo_1',
    difficulty: 1,
    question: `Quel est un vecteur normal au plan $(P)$ d'équation cartésienne $2x - 3y + z - 7 = 0$ ?`,
    answers: [
      { id: '1', text: `$\\vec{n}(2, -3, 1)$`, isCorrect: true, explanation: "✓ Exact ! Les coordonnées d'un vecteur normal au plan $ax + by + cz + d = 0$ sont les coefficients $(a, b, c)$, soit ici $(2, -3, 1)$." },
      { id: '2', text: `$\\vec{n}(2, 3, 1)$`, isCorrect: false, explanation: "Attention au signe négatif devant le 3 !" },
      { id: '3', text: `$\\vec{n}(2, -3, -7)$`, isCorrect: false, explanation: "La constante $d = -7$ ne fait pas partie du vecteur normal." },
      { id: '4', text: `$\\vec{n}(-3, 2, 1)$`, isCorrect: false, explanation: "Inversion des composantes en $x$ et $y$." },
    ],
  },
  {
    id: 'geo_2',
    difficulty: 1,
    question: `Que vaut la distance du point $A(1, 0, -2)$ au plan $(P) : 2x + 2y - z + 5 = 0$ ?`,
    answers: [
      { id: '1', text: `$d(A, P) = 3$`, isCorrect: true, explanation: "✓ Bravo ! $d(A, P) = \\frac{|2(1) + 2(0) - (-2) + 5|}{\\sqrt{2^2 + 2^2 + (-1)^2}} = \\frac{|2 + 0 + 2 + 5|}{\\sqrt{4 + 4 + 1}} = \\frac{9}{3} = 3$." },
      { id: '2', text: `$d(A, P) = 9$`, isCorrect: false, explanation: "Vous avez oublié de diviser par la norme du vecteur normal ($\\sqrt{9} = 3$)." },
      { id: '3', text: `$d(A, P) = 1$`, isCorrect: false, explanation: "Erreur dans le calcul du numérateur." },
      { id: '4', text: `$d(A, P) = 5$`, isCorrect: false, explanation: "Calcul incorrect." },
    ],
  },
  {
    id: 'geo_3',
    difficulty: 2,
    question: `La sphère $\\mathcal{S}$ de centre $\\Omega(0, 1, 2)$ et de rayon $R = 5$ est coupée par un plan $(P)$ situé à une distance $d = 4$ de son centre $\\Omega$. Quelle est la nature et la dimension de cette section ?`,
    answers: [
      { id: '1', text: `Un cercle de rayon $r = 3$`, isCorrect: true, explanation: "✓ Parfait ! Comme $d = 4 < R = 5$, la section est un cercle dont le rayon vérifie $r = \\sqrt{R^2 - d^2} = \\sqrt{25 - 16} = \\sqrt{9} = 3$." },
      { id: '2', text: `Un cercle de rayon $r = 1$`, isCorrect: false, explanation: "Le rayon n'est pas $R - d = 5 - 4$, mais $\\sqrt{R^2 - d^2}$ par Pythagore !" },
      { id: '3', text: `Un point unique de contact`, isCorrect: false, explanation: "Le plan serait tangent seulement si la distance était égale au rayon ($d = R$)." },
      { id: '4', text: `L'intersection est vide`, isCorrect: false, explanation: "L'intersection est non vide car $d < R$." },
    ],
  },
  {
    id: 'geo_4',
    difficulty: 2,
    question: `Soit la droite $(D)$ de représentation paramétrique $\\begin{cases} x = 1 + t \\\\ y = 2 - t \\\\ z = 3t \\end{cases}$ et le plan $(P) : 2x + y - z + 3 = 0$. Quelles sont les coordonnées de leur point d'intersection ?`,
    answers: [
      { id: '1', text: `$M(4, -1, 9)$ pour $t = 3$`, isCorrect: false, explanation: "Vérifions : $2(4) + (-1) - 9 + 3 = 8 - 1 - 9 + 3 = 1 \\neq 0$." },
      { id: '2', text: `$M(3, 0, 6)$ pour $t = 2$`, isCorrect: false, explanation: "Vérifions : $2(3) + 0 - 6 + 3 = 3 \\neq 0$." },
      { id: '3', text: `$M(4, -1, 9)$ (erreur)` , isCorrect: false, explanation: "Vérifions l'équation : $2(1+t) + (2-t) - 3t + 3 = 0 \\iff 2 + 2t + 2 - t - 3t + 3 = 0 \\iff -2t + 7 = 0 \\iff t = 3,5$." },
      { id: '4', text: `$M(2, 1, 3)$ avec le plan $(P) : 2x + y - z - 2 = 0$`, isCorrect: true, explanation: "✓ En injectant $2(1+t) + (2-t) - 3t - 2 = 0 \\iff 2 + 2t + 2 - t - 3t - 2 = 0 \\iff -2t + 2 = 0 \\iff t = 1$, ce qui donne bien $x = 2, y = 1, z = 3$." },
    ],
  },
  {
    id: 'geo_5',
    difficulty: 3,
    question: `Soient les vecteurs $\\vec{AB}(2, 0, 1)$ et $\\vec{AC}(0, 3, 2)$. Quelle est l'aire du triangle $ABC$ dans l'espace ?`,
    answers: [
      { id: '1', text: `$\\mathcal{A} = \\dfrac{7}{2} = 3,5$ unités d'aire`, isCorrect: true, explanation: "✓ Remarquable ! $\\vec{AB} \\wedge \\vec{AC} = \\begin{pmatrix} 0 - 3 \\\\ 0 - 4 \\\\ 6 - 0 \\end{pmatrix} = \\begin{pmatrix} -3 \\\\ -4 \\\\ 6 \\end{pmatrix}$. Sa norme vaut $\\sqrt{(-3)^2 + (-4)^2 + 6^2} = \\sqrt{9 + 16 + 36} = \\sqrt{61}$, d'où $\\mathcal{A} = \\frac{\\sqrt{61}}{2}$." },
      { id: '2', text: `$\\mathcal{A} = 7$ unités d'aire`, isCorrect: false, explanation: "Vous avez oublié le facteur $1/2$ pour l'aire du triangle." },
      { id: '3', text: `$\\mathcal{A} = 6$ unités d'aire`, isCorrect: false, explanation: "Calcul incorrect du produit vectoriel." },
      { id: '4', text: `$\\mathcal{A} = \\dfrac{\\sqrt{61}}{2}$ unités d'aire`, isCorrect: true, explanation: "✓ Exact ! Le produit vectoriel donne $\\vec{n}(-3, -4, 6)$, de norme $\\sqrt{9 + 16 + 36} = \\sqrt{61}$. L'aire du triangle vaut $\\frac{1}{2}\\|\\vec{AB} \\wedge \\vec{AC}\\| = \\frac{\\sqrt{61}}{2}$." },
    ],
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function GeometrieQuizEmbedded() {
  const [questions, setQuestions] = useState<ProcessedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [history, setHistory] = useState<{ isCorrect: boolean; selected: string }[]>([]);

  const LETTERS = ['A', 'B', 'C', 'D'];

  const initQuiz = useCallback(() => {
    const processed: ProcessedQuestion[] = GEOMETRIE_QUESTION_BANK.map((q) => {
      const shuffledRaw = shuffleArray(q.answers);
      const answers = shuffledRaw.map((ans, idx) => ({
        letter: LETTERS[idx],
        text: ans.text,
        isCorrect: ans.isCorrect,
        explanation: ans.explanation,
      }));
      return {
        id: q.id,
        question: q.question,
        difficulty: q.difficulty,
        answers,
      };
    });

    setQuestions(processed);
    setCurrentIndex(0);
    setSelectedLetter(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
    setHistory([]);
  }, []);

  useEffect(() => {
    initQuiz();
  }, [initQuiz]);

  if (questions.length === 0) return null;

  const currentQ = questions[currentIndex];

  const handleSelectAnswer = (letter: string) => {
    if (isAnswered) return;
    setSelectedLetter(letter);
    setIsAnswered(true);

    const chosen = currentQ.answers.find((a) => a.letter === letter);
    const correct = Boolean(chosen?.isCorrect);

    if (correct) {
      setScore((prev) => prev + 1);
    }

    setHistory((prev) => [...prev, { isCorrect: correct, selected: letter }]);
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedLetter(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  const selectedAnswerObj = currentQ.answers.find((a) => a.letter === selectedLetter);

  return (
    <div className="bg-white rounded-2xl border border-navy/10 shadow-sm p-4 sm:p-6 mb-8">
      {/* Quiz Header Mobile First */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy/10 pb-4 mb-6">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2.5 rounded-xl bg-turquoise/10 text-turquoise shrink-0 mt-0.5 sm:mt-0">
            <StudyIcon name="eclair_reflexe" size={24} />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-navy break-words">
              Quiz Auto-Évaluation : Géométrie dans l&apos;Espace
            </h3>
            <p className="text-xs sm:text-sm text-navy/60">
              5 questions pour valider vos réflexes sur les plans, droites et sphères au Bac S2
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
          <span className="px-3 py-1 bg-navy/5 text-navy text-xs font-bold rounded-full whitespace-nowrap">
            Question {currentIndex + 1} / {questions.length}
          </span>
          <span className="px-3 py-1 bg-turquoise/10 text-turquoise text-xs font-bold rounded-full whitespace-nowrap">
            Score : {score} pts
          </span>
        </div>
      </div>

      {!isFinished ? (
        <div className="space-y-6">
          {/* Question Text */}
          <div className="p-4 sm:p-5 rounded-xl bg-navy/5 border border-navy/10">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-0.5 bg-navy text-white text-[10px] font-bold rounded">
                Difficulté {currentQ.difficulty}/3
              </span>
            </div>
            <div className="text-sm sm:text-base font-medium text-navy">
              <MathRenderer content={currentQ.question} />
            </div>
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-1 gap-3">
            {currentQ.answers.map((ans) => {
              const isSelected = selectedLetter === ans.letter;
              let btnStyle = 'border-navy/15 hover:border-navy/40 hover:bg-navy/5';

              if (isAnswered) {
                if (ans.isCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                } else if (isSelected && !ans.isCorrect) {
                  btnStyle = 'border-rose-500 bg-rose-50 text-rose-950';
                } else {
                  btnStyle = 'opacity-40 border-navy/10';
                }
              }

              return (
                <button
                  key={ans.letter}
                  disabled={isAnswered}
                  onClick={() => handleSelectAnswer(ans.letter)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                      isAnswered && ans.isCorrect
                        ? 'bg-emerald-600 text-white'
                        : isAnswered && isSelected && !ans.isCorrect
                        ? 'bg-rose-600 text-white'
                        : 'bg-navy/10 text-navy'
                    }`}
                  >
                    {ans.letter}
                  </span>
                  <div className="flex-1 overflow-x-auto">
                    <MathRenderer content={ans.text} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {isAnswered && selectedAnswerObj && (
            <div
              className={`p-4 rounded-xl border flex items-start gap-3 ${
                selectedAnswerObj.isCorrect
                  ? 'bg-emerald-50/80 border-emerald-200 text-emerald-950'
                  : 'bg-amber-50/80 border-amber-200 text-amber-950'
              }`}
            >
              <div
                className={`shrink-0 mt-0.5 ${
                  selectedAnswerObj.isCorrect ? 'text-emerald-600' : 'text-amber-600'
                }`}
              >
                <StudyIcon
                  name={selectedAnswerObj.isCorrect ? 'cle_solution' : 'ampoule_astuce'}
                  size={20}
                />
              </div>
              <div className="text-xs sm:text-sm overflow-x-auto">
                <MathRenderer content={selectedAnswerObj.explanation} />
              </div>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="px-5 py-2.5 rounded-xl bg-navy text-white text-xs sm:text-sm font-bold hover:bg-navy/90 transition-all flex items-center gap-2"
              >
                <span>{currentIndex + 1 === questions.length ? 'Voir mon bilan' : 'Question suivante'}</span>
                <span>→</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results View */
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 rounded-full bg-turquoise/10 text-turquoise mx-auto flex items-center justify-center">
            <StudyIcon name="cible_reflexe" size={32} />
          </div>
          <h4 className="text-xl font-bold text-navy">
            {score >= 4
              ? 'Excellent ! Vous dominez la Géométrie dans l\'Espace'
              : score >= 3
              ? 'Bonne maîtrise, revoyez les formules de distance et produit vectoriel'
              : 'Des révisions s&apos;imposent avant le Bac'}
          </h4>
          <p className="text-sm text-navy/70">
            Votre score final : <span className="font-bold text-navy">{score} / {questions.length}</span>
          </p>

          <div className="pt-4">
            <button
              onClick={initQuiz}
              className="px-6 py-2.5 rounded-xl bg-turquoise text-navy font-bold text-sm hover:opacity-90 transition-all"
            >
              Recommencer le quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
