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

const PROBABILITES_QUESTION_BANK: RawQuestion[] = [
  {
    id: 'pr_1',
    difficulty: 1,
    question: `Une urne contient 10 boules. On tire simultanément 3 boules de l'urne. Quel est le nombre total de tirages possibles ?`,
    answers: [
      { id: '1', text: `$C_{10}^3 = 120$`, isCorrect: true, explanation: "✓ Exact ! Un tirage simultané correspond à des combinaisons sans ordre : $C_{10}^3 = \\frac{10 \\times 9 \\times 8}{3 \\times 2 \\times 1} = 120$." },
      { id: '2', text: `$A_{10}^3 = 720$`, isCorrect: false, explanation: "Attention : $A_{10}^3$ correspondrait à un tirage successif SANS remise où l'ordre des boules compterait." },
      { id: '3', text: `$10^3 = 1000$`, isCorrect: false, explanation: "$10^3$ correspondrait à un tirage successif AVEC remise." },
      { id: '4', text: `$30$`, isCorrect: false, explanation: "Calcul sans justification combinatoire." },
    ],
  },
  {
    id: 'pr_2',
    difficulty: 1,
    question: `Si $A$ et $B$ sont deux événements indépendants avec $P(A) = 0,4$ et $P(B) = 0,5$, que vaut $P(A \\cap B)$ ?`,
    answers: [
      { id: '1', text: `$P(A \\cap B) = 0,2$`, isCorrect: true, explanation: "✓ Bravo ! Par définition de l'indépendance de deux événements, $P(A \\cap B) = P(A) \\times P(B) = 0,4 \\times 0,5 = 0,2$." },
      { id: '2', text: `$P(A \\cap B) = 0,9$`, isCorrect: false, explanation: "0,9 est la somme $P(A) + P(B)$, pas le produit." },
      { id: '3', text: `$P(A \\cap B) = 0,1$`, isCorrect: false, explanation: "Erreur de multiplication décimale." },
      { id: '4', text: `$P(A \\cap B) = 0$`, isCorrect: false, explanation: "0 correspondrait à des événements incompatibles (disjoints), et non indépendants." },
    ],
  },
  {
    id: 'pr_3',
    difficulty: 2,
    question: `Dans un groupe de 8 élèves, on souhaite former un bureau composé d'un Président, d'un Secrétaire et d'un Trésorier (3 postes distincts). Combien de bureaux différents peut-on constituer ?`,
    answers: [
      { id: '1', text: `$A_8^3 = 336$`, isCorrect: true, explanation: "✓ Exact ! Les postes étant distincts et hiérarchisés, l'ordre compte : il s'agit d'un arrangement de 3 personnes parmi 8 : $A_8^3 = 8 \\times 7 \\times 6 = 336$." },
      { id: '2', text: `$C_8^3 = 56$`, isCorrect: false, explanation: "Une combinaison correspondrait à un simple comité de 3 élèves sans rôles différenciés." },
      { id: '3', text: `$8^3 = 512$`, isCorrect: false, explanation: "Un élève ne peut pas cumuler plusieurs postes (pas de remise)." },
      { id: '4', text: `$24$`, isCorrect: false, explanation: "Calcul incorrect." },
    ],
  },
  {
    id: 'pr_4',
    difficulty: 2,
    question: `On lance 4 fois de suite une pièce équilibrée. Quelle est la probabilité d'obtenir « au moins une fois Pile » ?`,
    answers: [
      { id: '1', text: `$\\dfrac{15}{16}$`, isCorrect: true, explanation: "✓ Règle d'or au Bac S2 ! Par l'événement contraire : $P(\\text{au moins un Pile}) = 1 - P(\\text{aucun Pile}) = 1 - (1/2)^4 = 1 - 1/16 = 15/16$." },
      { id: '2', text: `$\\dfrac{1}{16}$`, isCorrect: false, explanation: "$1/16$ est la probabilité d'obtenir zéro Pile (4 Faces consécutifs)." },
      { id: '3', text: `$\\dfrac{1}{2}$`, isCorrect: false, explanation: "Confusion avec le résultat d'un seul lancer." },
      { id: '4', text: `$\\dfrac{3}{4}$`, isCorrect: false, explanation: "Calcul erroné." },
    ],
  },
  {
    id: 'pr_5',
    difficulty: 3,
    question: `Soit une variable aléatoire $X$ suivant la loi binomiale $\\mathcal{B}(10;\\, 0,3)$. Quelle est son espérance mathématique $E(X)$ et sa variance $V(X)$ ?`,
    answers: [
      { id: '1', text: `$E(X) = 3$ et $V(X) = 2,1$`, isCorrect: true, explanation: "✓ Bravo ! $E(X) = n \\cdot p = 10 \\times 0,3 = 3$ et $V(X) = n \\cdot p \\cdot (1 - p) = 10 \\times 0,3 \\times 0,7 = 2,1$." },
      { id: '2', text: `$E(X) = 3$ et $V(X) = 3$`, isCorrect: false, explanation: "Vous avez oublié de multiplier par $(1 - p) = 0,7$ dans la formule de la variance." },
      { id: '3', text: `$E(X) = 0,3$ et $V(X) = 0,21$`, isCorrect: false, explanation: "Vous avez oublié de multiplier par $n = 10$." },
      { id: '4', text: `$E(X) = 7$ et $V(X) = 2,1$`, isCorrect: false, explanation: "7 correspondrait au nombre moyen d'échecs, pas de succès." },
    ],
  },
  {
    id: 'pr_6',
    difficulty: 3,
    question: `Deux urnes $U_1$ et $U_2$ sont indiscernables. $U_1$ contient 3 blanches et 1 noire. $U_2$ contient 1 blanche et 3 noires. On choisit une urne au hasard ($P(U_1) = P(U_2) = 0,5$) puis on tire une boule. Sachant que la boule tirée est blanche, quelle est la probabilité qu'elle provienne de l'urne $U_1$ ?`,
    answers: [
      { id: '1', text: `$P_B(U_1) = \\dfrac{3}{4} = 0,75$`, isCorrect: true, explanation: "✓ Excellent ! Probabilités totales : $P(B) = 0,5 \\times (3/4) + 0,5 \\times (1/4) = 3/8 + 1/8 = 4/8 = 0,5$. Par la formule de Bayes : $P_B(U_1) = \\frac{P(U_1 \\cap B)}{P(B)} = \\frac{3/8}{4/8} = \\frac{3}{4}$." },
      { id: '2', text: `$P_B(U_1) = \\dfrac{1}{2} = 0,5$`, isCorrect: false, explanation: "Les deux urnes ne contiennent pas la même proportion de boules blanches, donc le fait d'avoir tiré une blanche favorise fortement l'urne 1." },
      { id: '3', text: `$P_B(U_1) = \\dfrac{3}{8}$`, isCorrect: false, explanation: "$3/8$ est la probabilité de l'intersection $P(U_1 \\cap B)$, pas la conditionnelle $P_B(U_1)$." },
      { id: '4', text: `$P_B(U_1) = \\dfrac{2}{3}$`, isCorrect: false, explanation: "Erreur dans le calcul de la probabilité a posteriori." },
    ],
  },
];

export default function ProbabilitesQuizEmbedded() {
  const [questions, setQuestions] = useState<ProcessedQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const letters = ['A', 'B', 'C', 'D'];

  const initQuiz = useCallback(() => {
    const processed: ProcessedQuestion[] = PROBABILITES_QUESTION_BANK.map((q) => {
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
              Quiz Éclair : Dénombrement, Probabilités &amp; Loi Binomiale
            </h3>
            <p className="text-xs text-text/60 mt-1 leading-snug">
              6 questions incontournables calibrées d&apos;après les annales du Bac S2
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

