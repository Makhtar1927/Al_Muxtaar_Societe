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

const PRIMITIVES_QUESTION_BANK: RawQuestion[] = [
  {
    id: 'prim_1',
    difficulty: 1,
    question: `Quelle est l'ensemble des primitives sur $\\mathbb{R}$ de la fonction $f(x) = \\dfrac{2x}{x^2 + 1}$ ?`,
    answers: [
      { id: '1', text: `$F(x) = \\ln(x^2 + 1) + k \\quad (k \\in \\mathbb{R})$`, isCorrect: true, explanation: "✓ Exact ! On reconnaît la forme $\\frac{u'}{u}$ avec $u(x) = x^2 + 1 > 0$, dont la primitive est $\\ln|u| + k = \\ln(x^2 + 1) + k$." },
      { id: '2', text: `$F(x) = \\dfrac{1}{x^2 + 1} + k$`, isCorrect: false, explanation: "Faux : $\\frac{1}{x^2+1}$ n'est pas une primitive de $\\frac{2x}{x^2+1}$." },
      { id: '3', text: `$F(x) = 2\\ln(x^2 + 1) + k$`, isCorrect: false, explanation: "Le coefficient 2 est déjà le $u'(x) = 2x$, il ne faut pas le rajouter en facteur devant." },
      { id: '4', text: `$F(x) = \\ln(2x) + k$`, isCorrect: false, explanation: "Formule erronée." },
    ],
  },
  {
    id: 'prim_2',
    difficulty: 1,
    question: `Quelle est la primitive sur $\\mathbb{R}$ de la fonction $g(x) = e^{-3x}$ qui s'annule en $0$ ?`,
    answers: [
      { id: '1', text: `$G(x) = -\\dfrac{1}{3}e^{-3x} + \\dfrac{1}{3}$`, isCorrect: true, explanation: "✓ Bravo ! Les primitives sont $G(x) = -\\frac{1}{3}e^{-3x} + k$. Condition $G(0) = 0 \\implies -\\frac{1}{3}(1) + k = 0 \\implies k = \\frac{1}{3}$." },
      { id: '2', text: `$G(x) = -3e^{-3x} + 3$`, isCorrect: false, explanation: "Erreur fréquente : on DIVISE par le coefficient $-3$ pour intégrer, on ne multiplie pas !" },
      { id: '3', text: `$G(x) = -\\dfrac{1}{3}e^{-3x}$`, isCorrect: false, explanation: "Il manque la constante $k = 1/3$ pour satisfaire la condition initiale $G(0) = 0$." },
      { id: '4', text: `$G(x) = e^{-3x} - 1$`, isCorrect: false, explanation: "Coefficient manquant devant l'exponentielle." },
    ],
  },
  {
    id: 'prim_3',
    difficulty: 2,
    question: `Pour calculer l'intégrale $I = \\int_1^e x^2 \\ln(x)\\,dx$ par Intégration par Parties (IPP), quel est le bon choix imposé par la règle **ALPES** ?`,
    answers: [
      { id: '1', text: `Poser $v(x) = \\ln(x)$ (à dériver) et $u'(x) = x^2$ (à intégrer)`, isCorrect: true, explanation: "✓ Règle d'or au Bac S2 ! Dans ALPES, le L (Logarithme) a la priorité absolue sur le P (Polynôme $x^2$) pour être dérivé." },
      { id: '2', text: `Poser $v(x) = x^2$ (à dériver) et $u'(x) = \\ln(x)$ (à intégrer)`, isCorrect: false, explanation: "Erreur fatale : on ne sait pas intégrer directement $\\ln(x)$ dans une IPP !" },
      { id: '3', text: `Poser $u(x) = x^2$ et $v(x) = \\ln(x)$ sans dérivées`, isCorrect: false, explanation: "L'IPP nécessite obligatoirement d'avoir une dérivée $u'$ et une fonction $v$." },
      { id: '4', text: `Dériver les deux fonctions simultanément`, isCorrect: false, explanation: "Ceci violerait le principe fondamental de l'intégration par parties." },
    ],
  },
  {
    id: 'prim_4',
    difficulty: 2,
    question: `Le plan est muni d'un repère orthogonal d'unités graphiques : $2\\text{ cm}$ sur l'axe des abscisses et $3\\text{ cm}$ sur l'axe des ordonnées. Si le calcul d'intégrale donne $\\int_a^b f(x)\\,dx = 4\\text{ u.a.}$, quelle est l'aire réelle en $\\text{cm}^2$ ?`,
    answers: [
      { id: '1', text: `$\\mathcal{A} = 24\\text{ cm}^2$`, isCorrect: true, explanation: "✓ Exact ! L'unité d'aire vaut $1\\text{ u.a.} = \\|\\vec{i}\\| \\times \\|\\vec{j}\\| = 2\\text{ cm} \\times 3\\text{ cm} = 6\\text{ cm}^2$. Donc $\\mathcal{A} = 4 \\times 6 = 24\\text{ cm}^2$." },
      { id: '2', text: `$\\mathcal{A} = 4\\text{ cm}^2$`, isCorrect: false, explanation: "Piège classique du Bac : vous avez confondu les unités d'aires pures (u.a.) avec les centimètres carrés !" },
      { id: '3', text: `$\\mathcal{A} = 12\\text{ cm}^2$`, isCorrect: false, explanation: "Calcul incomplet : il faut multiplier par le produit des deux échelles (2 x 3 = 6)." },
      { id: '4', text: `$\\mathcal{A} = 20\\text{ cm}^2$`, isCorrect: false, explanation: "Résultat erroné." },
    ],
  },
  {
    id: 'prim_5',
    difficulty: 2,
    question: `D'après la **relation de Chasles**, que vaut la somme $\\int_1^4 f(t)\\,dt + \\int_4^7 f(t)\\,dt$ ?`,
    answers: [
      { id: '1', text: `$\\int_1^7 f(t)\\,dt$`, isCorrect: true, explanation: "✓ Parfait ! La borne intermédiaire 4 s'enchaîne exactement par la relation de Chasles : $\\int_a^b + \\int_b^c = \\int_a^c$." },
      { id: '2', text: `$\\int_1^4 f(t)\\,dt \\times \\int_4^7 f(t)\\,dt$`, isCorrect: false, explanation: "L'intégrale d'une somme n'est pas un produit d'intégrales." },
      { id: '3', text: `$\\int_1^{11} f(t)\\,dt$`, isCorrect: false, explanation: "On n'additionne pas les bornes d'intégration !" },
      { id: '4', text: `$0$`, isCorrect: false, explanation: "Incorrect." },
    ],
  },
  {
    id: 'prim_6',
    difficulty: 3,
    question: `Quelle est la valeur moyenne de la fonction affine $f(x) = 2x + 1$ sur l'intervalle $[0, 3]$ ?`,
    answers: [
      { id: '1', text: `$\\mu = 4$`, isCorrect: true, explanation: "✓ Bravo ! $\\mu = \\frac{1}{3 - 0}\\int_0^3 (2x + 1)\\,dx = \\frac{1}{3}\\Big[x^2 + x\\Big]_0^3 = \\frac{1}{3}(9 + 3 - 0) = \\frac{12}{3} = 4$." },
      { id: '2', text: `$\\mu = 12$`, isCorrect: false, explanation: "12 est la valeur de l'intégrale $\\int_0^3 f$, il faut diviser par la largeur de l'intervalle $(b - a) = 3$." },
      { id: '3', text: `$\\mu = 2$`, isCorrect: false, explanation: "2 est la pente de la fonction, pas sa valeur moyenne." },
      { id: '4', text: `$\\mu = 6$`, isCorrect: false, explanation: "Calcul erroné." },
    ],
  },
];

export default function PrimitivesQuizEmbedded() {
  const [questions, setQuestions] = useState<ProcessedQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const initQuiz = useCallback(() => {
    const letters = ['A', 'B', 'C', 'D'];
    const processed: ProcessedQuestion[] = PRIMITIVES_QUESTION_BANK.map((q) => {
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
      {/* Header Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy/10 pb-4 mb-6">
        <div className="flex items-start sm:items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-turquoise/15 text-turquoise flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 p-2">
            <StudyIcon name="eclair_reflexe" size={24} />
          </div>
          <div className="min-w-0">
            <h3 className="font-extrabold text-navy text-base sm:text-lg leading-tight break-words">
              Quiz Éclair : Primitives, IPP &amp; Calcul d&apos;Aires
            </h3>
            <p className="text-xs text-text/60 mt-1 leading-snug">
              Questions calibrées d&apos;après les annales officielles du Bac S2
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
              Votre score sur les Primitives &amp; Calcul Intégral :
            </p>
          </div>

          <div className="inline-block bg-surface px-6 py-3 rounded-2xl border border-navy/10 font-mono text-3xl font-black text-navy">
            {score} / {questions.length}
          </div>

          <div className="max-w-md mx-auto text-xs text-text/75 leading-relaxed">
            {score === questions.length ? (
              <span className="text-emerald-700 font-bold">
                Excellente maîtrise ! Vous êtes prêt pour la question de calcul d&apos;aire du grand problème d&apos;analyse du Bac S2.
              </span>
            ) : score >= 4 ? (
              <span className="text-navy font-semibold">
                Bon niveau ! Révisez la règle ALPES pour l&apos;IPP et la conversion en $\text{cm}^2$ avec les unités graphiques.
              </span>
            ) : (
              <span className="text-rose-700 font-medium">
                Poursuivez vos révisions : maîtriser les 4 formes de primitives composées est obligatoire pour réussir l&apos;épreuve de Mathématiques.
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

