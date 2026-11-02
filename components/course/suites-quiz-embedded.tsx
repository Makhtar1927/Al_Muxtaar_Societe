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

const SUITES_QUESTION_BANK: RawQuestion[] = [
  {
    id: 'suit_1',
    difficulty: 1,
    question: `D'après le **théorème de convergence monotone**, que peut-on affirmer d'une suite $(u_n)$ qui est **croissante** et **majorée** par $3$ ?`,
    answers: [
      { id: '1', text: `La suite $(u_n)$ est convergente vers une limite finie $L \\le 3$`, isCorrect: true, explanation: "✓ Exact ! Toute suite croissante et majorée converge vers une limite réelle L inférieure ou égale au majorant." },
      { id: '2', text: `La suite $(u_n)$ converge obligatoirement vers $3$`, isCorrect: false, explanation: "Faux : le majorant est un plafond, la limite peut être strictement inférieure à 3 (ex: suite tendant vers 2 majorée par 3)." },
      { id: '3', text: `La suite $(u_n)$ diverge vers $+\\infty$`, isCorrect: false, explanation: "Impossible : le majorant bloque la suite, elle ne peut pas s'enfuir vers l'infini." },
      { id: '4', text: `La suite $(u_n)$ est constante`, isCorrect: false, explanation: "Une suite croissante n'est pas nécessairement constante." },
    ],
  },
  {
    id: 'suit_2',
    difficulty: 1,
    question: `Soit $(v_n)$ une suite géométrique de premier terme $v_0 = 5$ et de raison $q = 0{,}8$. Quelle est la limite de $v_n$ quand $n \\to +\\infty$ ?`,
    answers: [
      { id: '1', text: `$\\lim_{n \\to +\\infty} v_n = 0$`, isCorrect: true, explanation: "✓ Puisque $|q| = 0{,}8 < 1$, on a $\\lim q^n = 0$, donc $\\lim v_n = 5 \\times 0 = 0$." },
      { id: '2', text: `$\\lim_{n \\to +\\infty} v_n = 5$`, isCorrect: false, explanation: "5 est le premier terme v₀, pas la limite." },
      { id: '3', text: `$\\lim_{n \\to +\\infty} v_n = +\\infty$`, isCorrect: false, explanation: "La raison est strictement inférieure à 1, les termes diminuent vers 0." },
      { id: '4', text: `La suite n'a pas de limite`, isCorrect: false, explanation: "Toute suite géométrique de raison comprise entre -1 et 1 converge vers 0." },
    ],
  },
  {
    id: 'suit_3',
    difficulty: 2,
    question: `Dans un raisonnement par récurrence, quelle est la formulation rigoureuse exigée par l'examinateur du Bac pour l'**hypothèse de récurrence** à l'étape d'hérédité ?`,
    answers: [
      { id: '1', text: `« Soit $k \\ge n_0$. Supposons que $P(k)$ est vraie. Démontrons que $P(k+1)$ est vraie. »`, isCorrect: true, explanation: "✓ Parfait ! k est un entier fixé supérieur ou égal au rang initial." },
      { id: '2', text: `« Supposons que pour tout entier $n$, $P(n)$ est vraie. »`, isCorrect: false, explanation: "Erreur de logique majeure : vous supposez ce que vous devez prouver !" },
      { id: '3', text: `« Supposons que $P(n+1)$ est vraie pour trouver $P(n)$. »`, isCorrect: false, explanation: "Le raisonnement va de k vers k+1, pas l'inverse." },
      { id: '4', text: `« On suppose que $P(0)$ est vraie pour tout $n$. »`, isCorrect: false, explanation: "Formulation dénuée de sens mathématique." },
    ],
  },
  {
    id: 'suit_4',
    difficulty: 2,
    question: `Soit $(u_n)$ une suite définie par $u_0 = 1$ et $u_{n+1} = \\dfrac{1}{2}u_n + 3$. Sachant que $(u_n)$ converge vers une limite réelle $L$, quelle équation permet de déterminer $L$ ?`,
    answers: [
      { id: '1', text: `$L = \\dfrac{1}{2}L + 3 \\implies L = 6$`, isCorrect: true, explanation: "✓ Exact ! Par passage à la limite dans la relation de récurrence (point fixe), $L = f(L) \\implies L - \\frac{1}{2}L = 3 \\implies \\frac{1}{2}L = 3 \\implies L = 6$." },
      { id: '2', text: `$L = \\dfrac{1}{2}(0) + 3 = 3$`, isCorrect: false, explanation: "On ne remplace pas L par 0." },
      { id: '3', text: `$L = u_0 + 3 = 4$`, isCorrect: false, explanation: "Formule erronée." },
      { id: '4', text: `$L = +\\infty$`, isCorrect: false, explanation: "La suite converge vers un nombre fini car la fonction associée est contractante." },
    ],
  },
  {
    id: 'suit_5',
    difficulty: 2,
    question: `Quelle est la formule correcte de la somme des $(n+1)$ premiers termes d'une suite géométrique $S_n = v_0 + v_1 + \\dots + v_n$ de raison $q \\neq 1$ ?`,
    answers: [
      { id: '1', text: `$S_n = v_0 \\times \\dfrac{1 - q^{n+1}}{1 - q}$`, isCorrect: true, explanation: "✓ Formule reine du Baccalauréat ! Attention au nombre de termes : de 0 à n, il y a $(n + 1)$ termes, d'où l'exposant $(n+1)$." },
      { id: '2', text: `$S_n = v_0 \\times \\dfrac{1 - q^n}{1 - q}$`, isCorrect: false, explanation: "Piège classique ! Il y a $(n+1)$ termes si l'on commence à 0, pas n." },
      { id: '3', text: `$S_n = (n+1) \\times \\dfrac{v_0 + v_n}{2}$`, isCorrect: false, explanation: "Ceci est la formule pour une suite ARITHMÉTIQUE, pas géométrique !" },
      { id: '4', text: `$S_n = v_0 \\times q^n$`, isCorrect: false, explanation: "Ceci est l'expression du terme vₙ, pas de la somme." },
    ],
  },
  {
    id: 'suit_6',
    difficulty: 3,
    question: `Si pour tout entier naturel $n$, on a $u_{n+1} - u_n = -\\dfrac{n^2 + 1}{n + 2}$, quel est le sens de variation de la suite $(u_n)$ ?`,
    answers: [
      { id: '1', text: `La suite $(u_n)$ est strictement décroissante sur $\\mathbb{N}$`, isCorrect: true, explanation: "✓ Comme $n^2 + 1 > 0$ et $n + 2 > 0$ pour tout $n \\in \\mathbb{N}$, la fraction est strictement positive. Avec le signe moins, $u_{n+1} - u_n < 0$ pour tout $n$." },
      { id: '2', text: `La suite $(u_n)$ est strictement croissante sur $\\mathbb{N}$`, isCorrect: false, explanation: "La différence est strictement négative, donc la suite diminue." },
      { id: '3', text: `La suite $(u_n)$ n'est ni croissante ni décroissante`, isCorrect: false, explanation: "Le signe est strictement négatif pour tout n, la suite est parfaitement monotone." },
      { id: '4', text: `La suite converge vers 0`, isCorrect: false, explanation: "L'expression donne la variation, pas la limite de uₙ." },
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

export default function SuitesQuizEmbedded() {
  const [questions, setQuestions] = useState<ProcessedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerValidated, setIsAnswerValidated] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const initQuiz = useCallback(() => {
    const selected = shuffleArray(SUITES_QUESTION_BANK).slice(0, 5);
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
          Quiz Suites Numériques Terminé !
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
            Quiz d&apos;Évaluation Bac S2 : Suites Numériques
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
            <span>Explication rigoureuse :</span>
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

