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

const ASYMPTOTES_QUESTION_BANK: RawQuestion[] = [
  {
    id: 'asymp_1',
    difficulty: 1,
    question: `Si $\\lim_{x \\to 2^+} f(x) = -\\infty$, quelle conclusion géométrique immédiate doit-on porter sur sa copie du Bac S2 ?`,
    answers: [
      { id: '1', text: `La droite d'équation $x = 2$ est asymptote verticale à $\\mathcal{C}_f$`, isCorrect: true, explanation: "✓ Exact ! Quand la variable tend vers un nombre fini $x_0$ et donne une limite infinie, l'asymptote est verticale d'équation $x = x_0$." },
      { id: '2', text: `La droite d'équation $y = 2$ est asymptote horizontale à $\\mathcal{C}_f$`, isCorrect: false, explanation: "Attention : l'asymptote horizontale s'obtient quand x tend vers l'infini, pas vers 2 !" },
      { id: '3', text: `La courbe admet une tangente horizontale en $x = 2$`, isCorrect: false, explanation: "La fonction n'est même pas définie en 2, il s'agit d'une droite asymptote verticale." },
      { id: '4', text: `La droite $y = -\\infty$ est asymptote`, isCorrect: false, explanation: "Une équation de droite ne peut jamais contenir le symbole infini." },
    ],
  },
  {
    id: 'asymp_2',
    difficulty: 1,
    question: `Si $\\lim_{x \\to +\\infty} f(x) = -3$, quelle est la nature de l'asymptote à $\\mathcal{C}_f$ au voisinage de $+\\infty$ ?`,
    answers: [
      { id: '1', text: `Une asymptote horizontale d'équation $y = -3$`, isCorrect: true, explanation: "✓ Exact ! La limite à l'infini donne un réel fini $L = -3$, donc $y = -3$ est asymptote horizontale." },
      { id: '2', text: `Une asymptote verticale d'équation $x = -3$`, isCorrect: false, explanation: "Faux : $x = a$ correspond à une asymptote verticale (limite infinie en un point)." },
      { id: '3', text: `Une asymptote oblique d'équation $y = -3x$`, isCorrect: false, explanation: "La droite est purement horizontale car la limite est constante." },
      { id: '4', text: `Une branche parabolique de direction $(Ox)$`, isCorrect: false, explanation: "C'est une asymptote horizontale, pas une branche parabolique." },
    ],
  },
  {
    id: 'asymp_3',
    difficulty: 2,
    question: `Pour prouver que la droite $(D) : y = 3x - 2$ est asymptote oblique à $\\mathcal{C}_f$ en $+\\infty$, quelle égalité doit-on impérativement établir ?`,
    answers: [
      { id: '1', text: `$\\lim_{x \\to +\\infty} [f(x) - (3x - 2)] = 0$`, isCorrect: true, explanation: "✓ Formule reine du Baccalauréat ! L'écart entre la courbe et la droite doit tendre vers 0 à l'infini." },
      { id: '2', text: `$\\lim_{x \\to +\\infty} \\dfrac{f(x)}{3x - 2} = 0$`, isCorrect: false, explanation: "Le quotient tendrait vers 1, pas vers 0." },
      { id: '3', text: `$\\lim_{x \\to +\\infty} [f(x) + (3x - 2)] = 0$`, isCorrect: false, explanation: "Attention au signe : c'est une SOUSTRACTION $[f(x) - y_{(D)}]$, pas une addition." },
      { id: '4', text: `$\\lim_{x \\to +\\infty} f'(x) = 3$`, isCorrect: false, explanation: "La dérivée peut osciller sans empêcher l'asymptote ; le critère fondamental porte sur la différence $f(x) - y$." },
    ],
  },
  {
    id: 'asymp_4',
    difficulty: 2,
    question: `Soit $(D) : y = ax + b$ asymptote oblique à $\\mathcal{C}_f$. Si pour tout $x > 5$, on a $f(x) - (ax + b) = \\dfrac{2}{x^2 + 1}$, quelle est la position relative de $\\mathcal{C}_f$ par rapport à $(D)$ sur $]5, +\\infty[$ ?`,
    answers: [
      { id: '1', text: `$\\mathcal{C}_f$ est strictement au-dessus de $(D)$`, isCorrect: true, explanation: "✓ Puisque $x^2 + 1 > 0$, la différence est strictement positive : $f(x) - y_{(D)} > 0 \\implies f(x) > y_{(D)}$ : la courbe est AU-DESSUS." },
      { id: '2', text: `$\\mathcal{C}_f$ est strictement au-dessous de $(D)$`, isCorrect: false, explanation: "La différence est positive, donc la courbe ne peut pas être en dessous." },
      { id: '3', text: `$\\mathcal{C}_f$ traverse la droite $(D)$ une infinité de fois`, isCorrect: false, explanation: "Le numérateur 2 ne s'annule jamais, donc il n'y a aucun point d'intersection." },
      { id: '4', text: `On ne peut pas conclure sans calculer la dérivée`, isCorrect: false, explanation: "La position relative dépend EXCLUSIVEMENT du signe de la différence $f(x) - y_{(D)}$, pas de la dérivée." },
    ],
  },
  {
    id: 'asymp_5',
    difficulty: 3,
    question: `Si $\\lim_{x \\to +\\infty} f(x) = +\\infty$ et $\\lim_{x \\to +\\infty} \\dfrac{f(x)}{x} = +\\infty$, quelle est la branche infinie de la courbe $\\mathcal{C}_f$ ?`,
    answers: [
      { id: '1', text: `Une branche parabolique de direction l'axe des ordonnées $(Oy)$`, isCorrect: true, explanation: "✓ La courbe croît beaucoup plus vite que toute droite affine (ex: fonction exponentielle $e^x$ ou carré $x^2$) : elle grimpe le long de l'axe vertical $(Oy)$." },
      { id: '2', text: `Une branche parabolique de direction l'axe des abscisses $(Ox)$`, isCorrect: false, explanation: "La direction $(Ox)$ correspond à une limite nulle $\\lim \\frac{f(x)}{x} = 0$ (croissance lente comme $\\ln x$)." },
      { id: '3', text: `Une asymptote verticale`, isCorrect: false, explanation: "L'asymptote verticale a lieu en un point fini, pas quand $x$ tend vers $+\\infty$." },
      { id: '4', text: `Une asymptote oblique d'équation $y = x$`, isCorrect: false, explanation: "La limite du quotient doit être un nombre fini non nul pour avoir une direction oblique." },
    ],
  },
  {
    id: 'asymp_6',
    difficulty: 3,
    question: `Si $\\lim_{x \\to +\\infty} f(x) = +\\infty$ et $\\lim_{x \\to +\\infty} \\dfrac{f(x)}{x} = 0$, quelle est la branche infinie de la courbe $\\mathcal{C}_f$ ?`,
    answers: [
      { id: '1', text: `Une branche parabolique de direction l'axe des abscisses $(Ox)$`, isCorrect: true, explanation: "✓ La courbe continue de monter mais s'aplatit infiniment le long de l'axe horizontal $(Ox)$ (comme la fonction logarithme népérien $\\ln(x)$)." },
      { id: '2', text: `Une branche parabolique de direction $(Oy)$`, isCorrect: false, explanation: "Faux, c'est la direction $(Ox)$." },
      { id: '3', text: `Une asymptote horizontale $y = 0$`, isCorrect: false, explanation: "Comme $f(x) \\to +\\infty$, la courbe ne s'approche pas d'une hauteur finie." },
      { id: '4', text: `Une tangente horizontale`, isCorrect: false, explanation: "Une asymptote ou branche infinie concerne le comportement à l'infini, pas une tangente locale." },
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

export default function AsymptotesQuizEmbedded() {
  const [questions, setQuestions] = useState<ProcessedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerValidated, setIsAnswerValidated] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const initQuiz = useCallback(() => {
    const selected = shuffleArray(ASYMPTOTES_QUESTION_BANK).slice(0, 5);
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
          Quiz Asymptotes Terminé !
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
            <span>Recommencer avec d&apos;autres questions</span>
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
            Quiz d&apos;Évaluation : Asymptotes &amp; Branches Infinies
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
            <span>Explication de l&apos;examinateur :</span>
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

