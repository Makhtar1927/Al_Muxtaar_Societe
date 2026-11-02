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

const EXPONENTIELLE_QUESTION_BANK: RawQuestion[] = [
  {
    id: 'exp_1',
    difficulty: 1,
    question: `Quel est l'ensemble des solutions réelles de l'équation $e^x = -3$ ?`,
    answers: [
      { id: '1', text: `$S = \\emptyset$ (Aucune solution dans $\\mathbb{R}$)`, isCorrect: true, explanation: "✓ Exact ! Pour tout réel x, l'exponentielle est STRICTEMENT positive ($e^x > 0$). Elle ne peut donc jamais être égale à un nombre négatif." },
      { id: '2', text: `$S = \\{\\ln(-3)\\}$`, isCorrect: false, explanation: "Erreur fatale au Bac : le logarithme d'un nombre négatif n'existe pas !" },
      { id: '3', text: `$S = \\{-\\ln(3)\\}$`, isCorrect: false, explanation: "Attention : $e^{-\\ln 3} = \\frac{1}{e^{\\ln 3}} = \\frac{1}{3} > 0 \\neq -3$." },
      { id: '4', text: `$S = \\{-e^3\\}$`, isCorrect: false, explanation: "Valeur sans fondement mathématique." },
    ],
  },
  {
    id: 'exp_2',
    difficulty: 1,
    question: `Quelle est la fonction dérivée de $f(x) = e^{-3x + 1}$ sur $\\mathbb{R}$ ?`,
    answers: [
      { id: '1', text: `$f'(x) = -3e^{-3x + 1}$`, isCorrect: true, explanation: "✓ Bravo ! La formule de dérivation composite est $(e^u)' = u' \\cdot e^u$. Ici $u(x) = -3x + 1$, donc $u'(x) = -3$." },
      { id: '2', text: `$f'(x) = e^{-3x + 1}$`, isCorrect: false, explanation: "Faux : vous avez oublié de multiplier par la dérivée interne $u'(x) = -3$." },
      { id: '3', text: `$f'(x) = (-3x + 1)e^{-3x}$`, isCorrect: false, explanation: "Ceci n'est pas la formule de dérivation de l'exponentielle." },
      { id: '4', text: `$f'(x) = -3x e^{-3x + 1}$`, isCorrect: false, explanation: "La dérivée de $-3x + 1$ est $-3$, pas $-3x$." },
    ],
  },
  {
    id: 'exp_3',
    difficulty: 2,
    question: `D'après les théorèmes de croissances comparées, quelle est la limite de $f(x) = \\dfrac{e^x}{x^3}$ quand $x \\to +\\infty$ ?`,
    answers: [
      { id: '1', text: `$\\lim_{x \\to +\\infty} \\dfrac{e^x}{x^3} = +\\infty$`, isCorrect: true, explanation: "✓ Règle d'or au Bac S2 : en $+\\infty$, la fonction exponentielle l'emporte sur n'importe quel polynôme ou puissance de x." },
      { id: '2', text: `$\\lim_{x \\to +\\infty} \\dfrac{e^x}{x^3} = 0$`, isCorrect: false, explanation: "0 serait la limite de l'inverse $\\frac{x^3}{e^x}$, pas de $\\frac{e^x}{x^3}$." },
      { id: '3', text: `$\\lim_{x \\to +\\infty} \\dfrac{e^x}{x^3} = 1$`, isCorrect: false, explanation: "Il s'agit d'une croissance comparée, pas d'un quotient équivalent." },
      { id: '4', text: `La limite n'existe pas`, isCorrect: false, explanation: "La limite est parfaitement déterminée et vaut $+\\infty$." },
    ],
  },
  {
    id: 'exp_4',
    difficulty: 2,
    question: `Quelle est la limite de $g(x) = x^2 e^x$ lorsque $x \\to -\\infty$ ?`,
    answers: [
      { id: '1', text: `$\\lim_{x \\to -\\infty} x^2 e^x = 0$`, isCorrect: true, explanation: "✓ Exact ! Croissance comparée en $-\\infty$ : l'exponentielle écrase le polynôme et attire le produit vers 0." },
      { id: '2', text: `$\\lim_{x \\to -\\infty} x^2 e^x = +\\infty$`, isCorrect: false, explanation: "Même si $x^2 \\to +\\infty$, $e^x \\to 0$ beaucoup plus vite et impose sa limite nulle." },
      { id: '3', text: `$\\lim_{x \\to -\\infty} x^2 e^x = -\\infty$`, isCorrect: false, explanation: "Un carré fois une exponentielle est toujours strictement positif." },
      { id: '4', text: `$\\lim_{x \\to -\\infty} x^2 e^x = 1$`, isCorrect: false, explanation: "Valeur incorrecte." },
    ],
  },
  {
    id: 'exp_5',
    difficulty: 2,
    question: `En posant $X = e^x > 0$, quelles sont les solutions dans $\\mathbb{R}$ de l'équation $e^{2x} - 5e^x + 6 = 0$ ?`,
    answers: [
      { id: '1', text: `$S = \\{\\ln(2), \\ln(3)\\}$`, isCorrect: true, explanation: "✓ Parfait ! $X^2 - 5X + 6 = 0$ donne $(X - 2)(X - 3) = 0$, donc $X = 2$ ou $X = 3$. Comme $2 > 0$ et $3 > 0$, les deux racines sont valides : $x = \\ln 2$ et $x = \\ln 3$." },
      { id: '2', text: `$S = \\{2, 3\\}$`, isCorrect: false, explanation: "2 et 3 sont les valeurs de $X = e^x$, il faut ensuite repasser à $x$ en prenant le logarithme !" },
      { id: '3', text: `$S = \\{e^2, e^3\\}$`, isCorrect: false, explanation: "Confusion : $e^x = 2 \\implies x = \\ln(2)$, pas $e^2$." },
      { id: '4', text: `$S = \\emptyset$`, isCorrect: false, explanation: "L'équation possède bien deux solutions réelles distinctes." },
    ],
  },
  {
    id: 'exp_6',
    difficulty: 3,
    question: `Quelle est l'équation cartésienne de la droite tangente à la courbe de la fonction exponentielle $f(x) = e^x$ au point d'abscisse $x_0 = 0$ ?`,
    answers: [
      { id: '1', text: `$y = x + 1$`, isCorrect: true, explanation: "✓ Résultat fondamental ! $f'(0) = e^0 = 1$ et $f(0) = 1$. L'équation est $y = f'(0)(x - 0) + f(0) = 1(x) + 1 = x + 1$. Cette droite majore la courbe : pour tout $x$, $e^x \\ge x + 1$." },
      { id: '2', text: `$y = x$`, isCorrect: false, explanation: "La première bissectrice $y = x$ ne touche pas la courbe exponentielle ($e^x > x$ pour tout $x$)." },
      { id: '3', text: `$y = 1$`, isCorrect: false, explanation: "La tangente n'est pas horizontale en 0 puisque sa pente vaut $f'(0) = 1$." },
      { id: '4', text: `$y = 2x + 1$`, isCorrect: false, explanation: "La pente vaut $f'(0) = 1$, pas 2." },
    ],
  },
];

export default function ExponentielleQuizEmbedded() {
  const [questions, setQuestions] = useState<ProcessedQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const initQuiz = useCallback(() => {
    const letters = ['A', 'B', 'C', 'D'];
    const processed: ProcessedQuestion[] = EXPONENTIELLE_QUESTION_BANK.map((q) => {
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

  if (questions.length === 0) return null;

  const currentQ = questions[currentIdx];
  const selectedAnswerObj = currentQ.answers.find((a) => a.letter === selectedLetter);

  const handleSelect = (letter: string) => {
    if (isAnswered) return;
    setSelectedLetter(letter);
    setIsAnswered(true);
    const chosen = currentQ.answers.find((a) => a.letter === letter);
    if (chosen?.isCorrect) {
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
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy/10 pb-4 mb-6">
        <div className="flex items-start sm:items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-turquoise/15 text-turquoise flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 p-2">
            <StudyIcon name="eclair_reflexe" size={24} />
          </div>
          <div className="min-w-0">
            <h3 className="font-extrabold text-navy text-base sm:text-lg leading-tight break-words">
              Quiz Éclair : Fonction Exponentielle
            </h3>
            <p className="text-xs text-text/60 mt-1 leading-snug">
              Questions types Bac S2 pour valider les automatismes de calcul et dérivation
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
          <div className="bg-surface rounded-2xl p-4 sm:p-5 border border-navy/5">
            <div className="text-xs font-bold text-turquoise uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span>Niveau de difficulté :</span>
              <span className="text-amber-600 font-extrabold">
                {'★'.repeat(currentQ.difficulty)}
                {'☆'.repeat(3 - currentQ.difficulty)}
              </span>
            </div>
            <div className="text-base sm:text-lg font-bold text-navy leading-snug">
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
        /* Results View */
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 rounded-3xl bg-turquoise/15 text-turquoise flex items-center justify-center mx-auto">
            <StudyIcon name="trophee_reussite" size={36} />
          </div>
          <div>
            <h4 className="text-xl font-black text-navy">Quiz Terminé !</h4>
            <p className="text-sm text-text/60 mt-1">
              Votre score sur la fonction Exponentielle :
            </p>
          </div>

          <div className="inline-block bg-surface px-6 py-3 rounded-2xl border border-navy/10 font-mono text-3xl font-black text-navy">
            {score} / {questions.length}
          </div>

          <div className="max-w-md mx-auto text-xs text-text/75 leading-relaxed">
            {score === questions.length ? (
              <span className="text-emerald-700 font-bold">
                Félicitations ! Vous maîtrisez les propriétés et réflexes indispensables de l&apos;exponentielle pour le Bac S2.
              </span>
            ) : score >= 4 ? (
              <span className="text-navy font-semibold">
                Très bon travail ! Revoir la fiche réflexe pour consolider les limites en $-\infty$ ou le changement de variable.
              </span>
            ) : (
              <span className="text-rose-700 font-medium">
                Poursuivez vos révisions : la stricte positivité $e^x &gt; 0$ et la règle $(e^u)&apos; = u&apos;e^u$ doivent devenir des automatismes.
              </span>
            )}
          </div>

          <div className="pt-2">
            <button
              onClick={initQuiz}
              className="bg-turquoise text-navy font-black text-xs px-6 py-3 rounded-xl hover:bg-turquoise/80 transition-all shadow-sm active:scale-95"
            >
              Recommencer le quiz avec ordre aléatoire 🔄
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

