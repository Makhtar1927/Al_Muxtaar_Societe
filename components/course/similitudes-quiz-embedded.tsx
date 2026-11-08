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

const LETTERS = ['A', 'B', 'C', 'D'];

const SIMILITUDES_QUESTION_BANK: RawQuestion[] = [
  {
    id: 'sim_1',
    difficulty: 1,
    question: `Soit la similitude directe $S$ d'écriture complexe $z' = 2i z + 1 - 3i$. Quels sont son rapport $k$ et son angle $\\theta$ ?`,
    answers: [
      { id: '1', text: `$k = 2 \\quad \\text{et} \\quad \\theta = \\frac{\\pi}{2} \\pmod{2\\pi}$`, isCorrect: true, explanation: "✓ Bravo ! Le coefficient est $a = 2i$. Le rapport est $k = |a| = |2i| = 2$. L'angle est $\\theta = \\arg(a) = \\arg(2i) = \\frac{\\pi}{2}$." },
      { id: '2', text: `$k = 2 \\quad \\text{et} \\quad \\theta = \\pi \\pmod{2\\pi}$`, isCorrect: false, explanation: "L'argument de $2i$ est $+\\frac{\\pi}{2}$ (imaginaire pur à partie imaginaire positive), pas $\\pi$." },
      { id: '3', text: `$k = 4 \\quad \\text{et} \\quad \\theta = \\frac{\\pi}{2} \\pmod{2\\pi}$`, isCorrect: false, explanation: "Le rapport est le module de $a$ ($|2i| = 2$), pas son carré." },
      { id: '4', text: `$k = 2i \\quad \\text{et} \\quad \\theta = 0$`, isCorrect: false, explanation: "Un rapport de similitude est TOUJOURS un réel strictement positif ($k > 0$), jamais un nombre complexe imaginaire." },
    ],
  },
  {
    id: 'sim_2',
    difficulty: 2,
    question: `Une similitude directe de rapport $k = 3$ transforme un triangle $ABC$ d'aire $\\mathcal{A} = 5\\text{ cm}^2$ en un triangle $A'B'C'$. Quelle est l'aire $\\mathcal{A}'$ du triangle $A'B'C'$ ?`,
    answers: [
      { id: '1', text: `$\\mathcal{A}' = 45\\text{ cm}^2$`, isCorrect: true, explanation: "✓ Règle d'or absolue du Bac S2 : l'aire d'une surface plane est multipliée par $k^2$ ! $\\mathcal{A}' = k^2 \\times \\mathcal{A} = 3^2 \\times 5 = 9 \\times 5 = 45\\text{ cm}^2$." },
      { id: '2', text: `$\\mathcal{A}' = 15\\text{ cm}^2$`, isCorrect: false, explanation: "Piège classique : vous avez multiplié par $k$ au lieu de $k^2$ ! Les longueurs sont multipliées par $k$, mais les aires sont multipliées par $k^2$." },
      { id: '3', text: `$\\mathcal{A}' = 135\\text{ cm}^2$`, isCorrect: false, explanation: "$k^3 = 27$ s'applique pour les volumes dans l'espace, pas pour les aires du plan." },
      { id: '4', text: `$\\mathcal{A}' = 5\\text{ cm}^2$`, isCorrect: false, explanation: "Une similitude de rapport $k = 3 \\neq 1$ n'est pas une isométrie : l'aire n'est pas conservée." },
    ],
  },
  {
    id: 'sim_3',
    difficulty: 2,
    question: `Soit la similitude directe $S$ vérifiant $S(A) = A'$ et $S(B) = B'$ avec $z_A = 1$, $z_B = i$, $z_{A'} = 2i$ et $z_{B'} = -2$. Quelle est la valeur du coefficient $a$ de son écriture complexe $z' = az + b$ ?`,
    answers: [
      { id: '1', text: `$a = 2i$`, isCorrect: true, explanation: "✓ Exact ! Par la formule du quotient : $a = \\frac{z_{B'} - z_{A'}}{z_B - z_A} = \\frac{-2 - 2i}{i - 1} = \\frac{-2(1 + i)}{-(1 - i)} = \\frac{2(1 + i)^2}{1 - i^2} = \\frac{2(2i)}{2} = 2i$." },
      { id: '2', text: `$a = 2$`, isCorrect: false, explanation: "Attention aux calculs avec les imaginaires : il reste le facteur $i$ au numérateur." },
      { id: '3', text: `$a = -2i$`, isCorrect: false, explanation: "Erreur de signe lors de la division par $(i - 1)$." },
      { id: '4', text: `$a = 1 + i$`, isCorrect: false, explanation: "Calcul incorrect du rapport $(z_{B'} - z_{A'}) / (z_B - z_A)$." },
    ],
  },
  {
    id: 'sim_4',
    difficulty: 1,
    question: `Quelle est la nature géométrique exacte de la transformation d'écriture complexe $z' = -3 z + 8$ ?`,
    answers: [
      { id: '1', text: `Une homothétie de rapport $-3$ et de centre invariant $\\Omega(2)$`, isCorrect: true, explanation: "✓ Parfait ! Puisque $a = -3 \\in \\mathbb{R}^* \\setminus \\{1\\}$, c'est une homothétie de rapport $k = -3$. L'affixe du centre est $\\omega = \\frac{b}{1 - a} = \\frac{8}{1 - (-3)} = \\frac{8}{4} = 2$." },
      { id: '2', text: `Une rotation d'angle $\\pi$ et de rapport $3$`, isCorrect: false, explanation: "Bien qu'équivalente à une rotation d'angle $\\pi$ composée avec une homothétie de rapport 3, la dénomination officielle au Bac pour $a \\in \\mathbb{R}^*$ est l'homothétie de rapport $-3$." },
      { id: '3', text: `Une translation de vecteur d'affixe $8$`, isCorrect: false, explanation: "Une translation correspond exclusivement au cas où $a = 1$." },
      { id: '4', text: `Une réflexion (symétrie axiale)`, isCorrect: false, explanation: "Toute écriture $z' = az + b$ avec $z$ (et non $\\bar{z}$) est une transformation directe, jamais un antidéplacement." },
    ],
  },
  {
    id: 'sim_5',
    difficulty: 2,
    question: `Soient $S_1$ une similitude directe de rapport $k_1 = 2$ et d'angle $\\theta_1 = \\frac{\\pi}{3}$, et $S_2$ une similitude directe de rapport $k_2 = \\frac{1}{2}$ et d'angle $\\theta_2 = \\frac{\\pi}{6}$. Quelle est la nature de la composée $S_2 \\circ S_1$ ?`,
    answers: [
      { id: '1', text: `Une rotation d'angle $\\frac{\\pi}{2}$`, isCorrect: true, explanation: "✓ Excellent ! Rapport de la composée : $k = k_1 \\cdot k_2 = 2 \\times \\frac{1}{2} = 1$. Angle : $\\theta = \\theta_1 + \\theta_2 = \\frac{\\pi}{3} + \\frac{\\pi}{6} = \\frac{\\pi}{2}$. Puisque le rapport vaut 1 et l'angle est non nul modulo $2\\pi$, c'est une rotation d'angle $\\frac{\\pi}{2}$ !" },
      { id: '2', text: `Une homothétie de rapport $1$`, isCorrect: false, explanation: "L'angle de rotation n'est pas nul : $\\frac{\\pi}{3} + \\frac{\\pi}{6} = \\frac{\\pi}{2} \\neq 0 \\pmod{2\\pi}$." },
      { id: '3', text: `Une similitude de rapport $4$ et d'angle $\\frac{\\pi}{2}$`, isCorrect: false, explanation: "On multiplie les rapports : $2 \\times (1/2) = 1$, et non $2 / (1/2) = 4$." },
      { id: '4', text: `La translation de vecteur nul (l'identité)`, isCorrect: false, explanation: "L'angle est $\\frac{\\pi}{2}$, la figure subit donc un quart de tour complet." },
    ],
  },
  {
    id: 'sim_6',
    difficulty: 3,
    question: `On considère un cercle $\\mathcal{C}$ de centre $I(1 - i)$ et de rayon $R = 3$. Soit $S$ la similitude directe d'écriture $z' = 2i z + 3$. Quel est le rayon $R'$ et l'affixe du centre $I'$ du cercle image $\\mathcal{C}' = S(\\mathcal{C})$ ?`,
    answers: [
      { id: '1', text: `$R' = 6 \\quad \\text{et} \\quad z_{I'} = 5 + 2i$`, isCorrect: true, explanation: "✓ Magnifique ! Rapport $k = |2i| = 2$, d'où le rayon image $R' = k \\cdot R = 2 \\times 3 = 6$. Le centre image est $I' = S(I)$, donc $z_{I'} = 2i(1 - i) + 3 = 2i - 2i^2 + 3 = 2i + 2 + 3 = 5 + 2i$." },
      { id: '2', text: `$R' = 3 \\quad \\text{et} \\quad z_{I'} = 5 + 2i$`, isCorrect: false, explanation: "Vous avez oublié de multiplier le rayon par le rapport de similitude $k = 2$." },
      { id: '3', text: `$R' = 12 \\quad \\text{et} \\quad z_{I'} = 1 - i$`, isCorrect: false, explanation: "Calcul erroné : le rayon est multiplié par $k = 2$ ($R' = 6$) et le centre est transformé par $S$." },
      { id: '4', text: `$R' = 6 \\quad \\text{et} \\quad z_{I'} = 1 + 5i$`, isCorrect: false, explanation: "Erreur de développement : $2i(1 - i) + 3 = 2i + 2 + 3 = 5 + 2i$." },
    ],
  },
];

export default function SimilitudesQuizEmbedded() {
  const [questions, setQuestions] = useState<ProcessedQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const initQuiz = useCallback(() => {
    const processed: ProcessedQuestion[] = SIMILITUDES_QUESTION_BANK.map((q) => {
      const shuffledAnswers = [...q.answers].sort(() => Math.random() - 0.5);
      return {
        id: q.id,
        question: q.question,
        difficulty: q.difficulty,
        answers: shuffledAnswers.map((ans, idx) => ({
          letter: LETTERS[idx] || 'A',
          text: ans.text,
          isCorrect: ans.isCorrect,
          explanation: ans.explanation,
        })),
      };
    });

    setQuestions(processed);
    setCurrentIdx(0);
    setSelectedLetter(null);
    setShowExplanation(false);
    setScore(0);
    setQuizFinished(false);
  }, []);

  useEffect(() => {
    initQuiz();
  }, [initQuiz]);

  if (!questions.length) return null;

  const currentQ = questions[currentIdx];
  const selectedAnswerObj = currentQ?.answers.find((a) => a.letter === selectedLetter);

  const handleSelectAnswer = (letter: string) => {
    if (showExplanation) return;
    setSelectedLetter(letter);
    setShowExplanation(true);

    const ans = currentQ.answers.find((a) => a.letter === letter);
    if (ans?.isCorrect) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1);
      setSelectedLetter(null);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-navy/10 p-5 sm:p-6 shadow-sm space-y-5">
      {/* Quiz Header */}
      <div className="flex items-center justify-between border-b border-navy/10 pb-4">
        <div>
          <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
            Quiz d&apos;Entraînement Bac S2
          </span>
          <h3 className="text-base sm:text-lg font-black text-navy mt-0.5">
            M9 : Similitudes Planes Directes ({questions.length} questions clés)
          </h3>
        </div>
        <div className="text-right">
          <span className="text-xs font-bold text-navy bg-surface px-3 py-1 rounded-full border border-navy/10">
            Score : {score} / {questions.length}
          </span>
        </div>
      </div>

      {!quizFinished ? (
        <div className="space-y-4">
          {/* Question Indicator */}
          <div className="flex items-center justify-between text-xs text-text/60">
            <span>
              Question <strong className="text-navy">{currentIdx + 1}</strong> sur {questions.length}
            </span>
            <span className="flex items-center gap-1 font-semibold text-amber-600">
              {Array.from({ length: currentQ.difficulty }).map((_, i) => (
                <span key={i}>★</span>
              ))}
              <span className="text-[10px] uppercase ml-1">
                {currentQ.difficulty === 1 ? 'Facile' : currentQ.difficulty === 2 ? 'Moyen' : 'Difficile Bac'}
              </span>
            </span>
          </div>

          {/* Statement */}
          <div className="p-4 rounded-xl bg-surface border border-navy/10 text-sm font-semibold text-navy leading-relaxed">
            <MathRenderer content={currentQ.question} />
          </div>

          {/* Answers List */}
          <div className="grid grid-cols-1 gap-2.5">
            {currentQ.answers.map((ans) => {
              const isSelected = selectedLetter === ans.letter;
              let btnClass = 'border-navy/10 bg-white hover:bg-surface text-navy';

              if (showExplanation) {
                if (ans.isCorrect) {
                  btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                } else if (isSelected && !ans.isCorrect) {
                  btnClass = 'border-rose-500 bg-rose-50 text-rose-950 font-bold';
                } else {
                  btnClass = 'border-navy/5 bg-navy/5 text-text/40 opacity-60';
                }
              }

              return (
                <button
                  key={ans.letter}
                  onClick={() => handleSelectAnswer(ans.letter)}
                  disabled={showExplanation}
                  className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-start gap-3 ${btnClass}`}
                >
                  <span
                    className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected
                        ? ans.isCorrect
                          ? 'bg-emerald-500 text-white'
                          : 'bg-rose-500 text-white'
                        : 'bg-navy/5 text-navy/70'
                    }`}
                  >
                    {ans.letter}
                  </span>
                  <div className="text-xs sm:text-sm leading-relaxed flex-1">
                    <MathRenderer content={ans.text} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {showExplanation && selectedAnswerObj && (
            <div
              className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed animate-in fade-in ${
                selectedAnswerObj.isCorrect
                  ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                  : 'bg-rose-50/70 border-rose-300 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-2 font-bold mb-1.5">
                <span>{selectedAnswerObj.isCorrect ? '✅ Réponse Correcte !' : '❌ Réponse Incorrecte'}</span>
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
                ? 'Excellent travail sur les Similitudes ! 🎯'
                : score >= 3
                ? 'Bien joué ! Continuez ainsi 👏'
                : 'Encore un petit effort sur les formules ! 💪'}
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
              <span>Recommencer le Quiz Similitudes</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
