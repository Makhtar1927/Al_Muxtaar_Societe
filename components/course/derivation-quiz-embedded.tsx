'use client';

import React, { useState, useEffect, useCallback } from 'react';
import MathRenderer from '@/components/course/math-renderer';
import StudyIcon, { StudyIconName } from '@/components/ui/study-icon';

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

const DERIVATION_QUESTION_BANK: RawQuestion[] = [
  {
    id: 'deriv_1',
    difficulty: 1,
    question: `Quelle est la formule correcte de la dérivée d'un quotient $\\left(\\dfrac{u}{v}\\right)'$ avec $v(x) \\neq 0$ ?`,
    answers: [
      { id: '1', text: `$\\dfrac{u'v - uv'}{v^2}$`, isCorrect: true, explanation: "✓ Exact ! Attention au signe moins au numérateur et au carré au dénominateur." },
      { id: '2', text: `$\\dfrac{u'v + uv'}{v^2}$`, isCorrect: false, explanation: "Faux : le signe au numérateur est un MOINS, pas un plus." },
      { id: '3', text: `$\\dfrac{u'}{v'}$`, isCorrect: false, explanation: "Erreur fatale très pénalisée au Bac : la dérivée d'un quotient n'est JAMAIS le quotient des dérivées." },
      { id: '4', text: `$\\dfrac{u'v - uv'}{v}$`, isCorrect: false, explanation: "Il manque le carré sur le dénominateur ($v^2$)." },
    ],
  },
  {
    id: 'deriv_2',
    difficulty: 1,
    question: `Quelle est l'équation cartésienne de la tangente à la courbe d'une fonction $f$ en un point d'abscisse $x_0$ ?`,
    answers: [
      { id: '1', text: `$y = f'(x_0)(x - x_0) + f(x_0)$`, isCorrect: true, explanation: "✓ Formule fondamentale exigée dans chaque problème du Bac S2." },
      { id: '2', text: `$y = f'(x_0)(x + x_0) - f(x_0)$`, isCorrect: false, explanation: "Attention aux signes : c'est $(x - x_0)$ et $+ f(x_0)$." },
      { id: '3', text: `$y = f(x_0)(x - x_0) + f'(x_0)$`, isCorrect: false, explanation: "La pente est $f'(x_0)$, pas $f(x_0)$." },
      { id: '4', text: `$y = f'(x)(x - x_0) + f(x)$`, isCorrect: false, explanation: "Les termes doivent être évalués en la constante $x_0$." },
    ],
  },
  {
    id: 'deriv_3',
    difficulty: 2,
    question: `Soit $f(x) = (2x - 3)e^{2x}$. Quelle est l'expression de sa dérivée $f'(x)$ ?`,
    answers: [
      { id: '1', text: `$f'(x) = 4(x - 1)e^{2x}$`, isCorrect: true, explanation: "✓ En posant $u = 2x - 3$ ($u' = 2$) et $v = e^{2x}$ ($v' = 2e^{2x}$), on a $f'(x) = 2e^{2x} + (2x - 3)(2e^{2x}) = e^{2x}(2 + 4x - 6) = 4(x - 1)e^{2x}$." },
      { id: '2', text: `$f'(x) = 2e^{2x}$`, isCorrect: false, explanation: "Vous avez oublié de dériver le produit $(u \\cdot v)' = u'v + uv'$." },
      { id: '3', text: `$f'(x) = (4x - 6)e^{2x}$`, isCorrect: false, explanation: "Il manque le terme $u'v = 2e^{2x}$." },
      { id: '4', text: `$f'(x) = (2x - 1)e^{2x}$`, isCorrect: false, explanation: "Erreur de factorisation lors du calcul." },
    ],
  },
  {
    id: 'deriv_4',
    difficulty: 2,
    question: `Soit $g(x) = \\ln(x^2 + 1)$. Quelle est l'expression de sa dérivée $g'(x)$ ?`,
    answers: [
      { id: '1', text: `$g'(x) = \\dfrac{2x}{x^2 + 1}$`, isCorrect: true, explanation: "✓ La dérivée de $\\ln(u)$ est $\\dfrac{u'}{u}$. Ici $u = x^2 + 1$ donc $u' = 2x$." },
      { id: '2', text: `$g'(x) = \\dfrac{1}{x^2 + 1}$`, isCorrect: false, explanation: "Vous avez oublié de multiplier par la dérivée intérieure $u' = 2x$." },
      { id: '3', text: `$g'(x) = \\dfrac{2x}{(x^2 + 1)^2}$`, isCorrect: false, explanation: "Pas de carré au dénominateur pour la dérivée du logarithme népérien." },
      { id: '4', text: `$g'(x) = 2x \\ln(x^2 + 1)$`, isCorrect: false, explanation: "Formule incorrecte." },
    ],
  },
  {
    id: 'deriv_5',
    difficulty: 2,
    question: `Si $f'(x_0) = 0$ et $f'$ **change de signe** en passant par $x_0$, que peut-on affirmer avec certitude ?`,
    answers: [
      { id: '1', text: "La courbe admet un extremum local en $x_0$", isCorrect: true, explanation: "✓ Si $f'$ s'annule en changeant de signe, il s'agit d'un maximum ou minimum local." },
      { id: '2', text: "La fonction $f$ s'annule obligatoirement en $x_0$", isCorrect: false, explanation: "C'est la dérivée qui s'annule, pas la fonction ! On peut avoir $f(x_0) \\neq 0$." },
      { id: '3', text: "La courbe admet une asymptote verticale en $x_0$", isCorrect: false, explanation: "La dérivée est finie ($0$), il n'y a aucune asymptote." },
      { id: '4', text: "La fonction $f$ n'est pas continue en $x_0$", isCorrect: false, explanation: "La dérivabilité en $x_0$ implique au contraire la continuité en $x_0$." },
    ],
  },
  {
    id: 'deriv_6',
    difficulty: 3,
    question: `Que signifie géométriquement la limite suivante : $\\lim_{x \\to 0^+} \\dfrac{f(x) - f(0)}{x} = +\\infty$ ?`,
    answers: [
      { id: '1', text: "La courbe admet une demi-tangente verticale dirigée vers le haut en $0$", isCorrect: true, explanation: "✓ Un taux d'accroissement infini traduit une tangente verticale. Comme la limite à droite donne $+\\infty$, la demi-tangente est orientée vers le haut." },
      { id: '2', text: "$f$ est dérivable à droite en $0$", isCorrect: false, explanation: "Une limite infinie signifie que $f$ N'EST PAS dérivable en ce point." },
      { id: '3', text: "La courbe admet une asymptote horizontale", isCorrect: false, explanation: "Il s'agit d'une étude de dérivabilité locale en un point fini, pas d'une limite en l'infini." },
      { id: '4', text: "La tangente a pour coefficient directeur $0$", isCorrect: false, explanation: "La pente est infinie (tangente verticale), non nulle." },
    ],
  },
  {
    id: 'deriv_7',
    difficulty: 3,
    question: `Soit $f$ une fonction deux fois dérivable sur $I$. À quelle condition un point d'abscisse $x_0$ est-il un **point d'inflexion** pour la courbe $\\mathcal{C}_f$ ?`,
    answers: [
      { id: '1', text: `$f''(x_0) = 0$ et $f''$ change de signe en $x_0$`, isCorrect: true, explanation: "✓ Condition rigoureuse : la dérivée seconde s'annule ET change de signe. La courbe traverse alors sa tangente." },
      { id: '2', text: `$f'(x_0) = 0$`, isCorrect: false, explanation: "Ceci caractérise une tangente horizontale, pas un point d'inflexion." },
      { id: '3', text: `$f(x_0) = 0$`, isCorrect: false, explanation: "C'est une racine de la fonction." },
      { id: '4', text: `$f''(x_0) > 0$ sur tout l'intervalle`, isCorrect: false, explanation: "Une dérivée seconde strictement positive signifie que la fonction est strictement convexe." },
    ],
  },
];

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function DerivationQuizEmbedded() {
  const [questions, setQuestions] = useState<ProcessedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerValidated, setIsAnswerValidated] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const initQuiz = useCallback(() => {
    const selected = shuffleArray(DERIVATION_QUESTION_BANK).slice(0, 5);
    const letters = ['A', 'B', 'C', 'D'];

    const processed: ProcessedQuestion[] = selected.map((q) => {
      const shuffledAnswers = shuffleArray(q.answers);
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
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswerValidated(false);
    setScore(0);
    setQuizFinished(false);
  }, []);

  useEffect(() => {
    initQuiz();
  }, [initQuiz]);

  if (questions.length === 0) return null;

  const currentQ = questions[currentIndex];

  const handleSelect = (idx: number) => {
    if (isAnswerValidated) return;
    setSelectedAnswer(idx);
  };

  const handleValidate = () => {
    if (selectedAnswer === null) return;
    setIsAnswerValidated(true);
    if (currentQ.answers[selectedAnswer].isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerValidated(false);
    } else {
      setQuizFinished(true);
    }
  };

  if (quizFinished) {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <section className="bg-white rounded-3xl border border-navy/10 p-6 sm:p-8 shadow-sm text-center">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-turquoise/15 flex items-center justify-center text-turquoise mb-4">
          <StudyIcon name="trophee_reussite" size={32} />
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-navy">
          Quiz Dérivation Terminé !
        </h3>
        <p className="text-sm text-text/60 mt-1">
          Votre score : <strong className="text-turquoise">{score} / {questions.length}</strong> ({pct}%)
        </p>

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={initQuiz}
            className="px-5 py-2.5 rounded-xl bg-navy text-white text-xs font-bold hover:bg-navy/90 active:scale-95 transition-all flex items-center gap-2"
          >
            <StudyIcon name="reculer_10s" size={16} />
            <span>Recommencer avec de nouvelles questions</span>
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-3xl border border-navy/10 p-5 sm:p-7 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/10 pb-4 mb-5">
        <div className="flex items-center gap-2.5 min-w-0">
          <StudyIcon name="cible_reflexe" size={20} className="text-turquoise shrink-0" />
          <h3 className="font-extrabold text-navy text-base sm:text-lg leading-tight truncate">
            Quiz d&apos;Évaluation Bac S2 : Dérivation &amp; Variations
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs font-bold text-navy/60 shrink-0 self-start sm:self-center">
          <span>Question {currentIndex + 1} / {questions.length}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-navy/30" />
          <span className="text-turquoise">Score : {score}</span>
        </div>
      </div>

      {/* Question */}
      <div className="mb-6">
        <div className="text-sm sm:text-base font-semibold text-navy leading-relaxed">
          <MathRenderer content={currentQ.question} />
        </div>
      </div>

      {/* Answers list */}
      <div className="space-y-2.5 mb-6">
        {currentQ.answers.map((ans, idx) => {
          const isSelected = selectedAnswer === idx;
          let btnClass = 'bg-white border-navy/15 hover:border-turquoise text-navy';

          if (isAnswerValidated) {
            if (ans.isCorrect) {
              btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold';
            } else if (isSelected && !ans.isCorrect) {
              btnClass = 'bg-rose-50 border-rose-500 text-rose-950 font-bold';
            } else {
              btnClass = 'bg-gray-50 border-gray-200 text-gray-400 opacity-60';
            }
          } else if (isSelected) {
            btnClass = 'bg-turquoise/10 border-turquoise text-navy font-bold';
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={isAnswerValidated}
              className={`w-full p-3.5 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 active:scale-[0.99] ${btnClass}`}
            >
              <span className="w-6 h-6 rounded-lg bg-navy/5 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                {ans.letter}
              </span>
              <div className="flex-1">
                <MathRenderer content={ans.text} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Explanation when validated */}
      {isAnswerValidated && (
        <div className="mb-6 p-4 rounded-xl bg-surface border border-navy/10 text-xs sm:text-sm">
          <div className="font-bold text-navy mb-1 flex items-center gap-1.5">
            <StudyIcon name="cle_solution" size={16} className="text-turquoise" />
            <span>Explication :</span>
          </div>
          <MathRenderer content={currentQ.answers[selectedAnswer!].explanation} />
        </div>
      )}

      {/* Action buttons */}
      <div className="flex justify-end gap-3">
        {!isAnswerValidated ? (
          <button
            onClick={handleValidate}
            disabled={selectedAnswer === null}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
              selectedAnswer !== null
                ? 'bg-turquoise text-white hover:bg-turquoise/90 active:scale-95 shadow-sm'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            Valider ma réponse
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="px-5 py-2.5 rounded-xl bg-navy text-white hover:bg-navy/90 text-xs font-bold active:scale-95 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>{currentIndex < questions.length - 1 ? 'Question suivante' : 'Voir mon score'}</span>
            <StudyIcon name="suivant" size={14} />
          </button>
        )}
      </div>
    </section>
  );
}
