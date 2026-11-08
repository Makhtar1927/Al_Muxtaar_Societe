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

const LOGARITHME_QUESTION_BANK: RawQuestion[] = [
  {
    id: 'log_1',
    difficulty: 1,
    question: `Quel est l'ensemble de définition $D_f$ de la fonction $f(x) = \\ln(2x - 6)$ ?`,
    answers: [
      { id: '1', text: `$D_f = ]3, +\\infty[$`, isCorrect: true, explanation: "✓ Exact ! La condition d'existence impose $2x - 6 > 0 \\iff 2x > 6 \\iff x > 3$." },
      { id: '2', text: `$D_f = [3, +\\infty[$`, isCorrect: false, explanation: "Faux : $\\ln(0)$ n'est pas défini ! L'inégalité doit être STRICTEMENT positive, crochet ouvert." },
      { id: '3', text: `$D_f = \\mathbb{R} \\setminus \\{3\\}$`, isCorrect: false, explanation: "Ceci serait vrai pour $f(x) = \\ln|2x - 6|$, mais ici l'expression sans valeur absolue ne tolère pas les négatifs." },
      { id: '4', text: `$D_f = ]0, +\\infty[$`, isCorrect: false, explanation: "On ne résout pas $x > 0$, mais bien $u(x) > 0$ avec $u(x) = 2x - 6$." },
    ],
  },
  {
    id: 'log_2',
    difficulty: 1,
    question: `Quelle est la valeur simplifiée de l'expression $A = \\ln(12) - \\ln(3)$ ?`,
    answers: [
      { id: '1', text: `$\\ln(4) = 2\\ln(2)$`, isCorrect: true, explanation: "✓ Bravo ! On applique $\\ln(a) - \\ln(b) = \\ln\\left(\\frac{a}{b}\\right) = \\ln\\left(\\frac{12}{3}\\right) = \\ln(4) = \\ln(2^2) = 2\\ln(2)$." },
      { id: '2', text: `$\\ln(9)$`, isCorrect: false, explanation: "Erreur fatale au Bac : $\\ln a - \\ln b \\neq \\ln(a - b)$ !" },
      { id: '3', text: `$\\dfrac{\\ln(12)}{\\ln(3)} = 4$`, isCorrect: false, explanation: "Attention : la soustraction de deux logarithmes n'est pas le quotient de ces deux termes." },
      { id: '4', text: `$\\ln(36)$`, isCorrect: false, explanation: "$\\ln(36)$ correspondrait à une addition $\\ln(12) + \\ln(3)$." },
    ],
  },
  {
    id: 'log_3',
    difficulty: 2,
    question: `D'après les théorèmes de croissances comparées, quelle est la limite de $f(x) = x^2 \\ln(x)$ quand $x \\to 0^+$ ?`,
    answers: [
      { id: '1', text: `$\\lim_{x \\to 0^+} x^2 \\ln(x) = 0$`, isCorrect: true, explanation: "✓ Règle d'or au Bac S2 : en $0^+$, la puissance de $x$ l'emporte toujours sur le logarithme (limite fondamentale $\\lim_{x \\to 0^+} x^n \\ln x = 0$)." },
      { id: '2', text: `$\\lim_{x \\to 0^+} x^2 \\ln(x) = -\\infty$`, isCorrect: false, explanation: "Forme indéterminée $0 \\times (-\\infty)$, mais le terme polynomial $x^2$ domine et attire le produit vers 0." },
      { id: '3', text: `$\\lim_{x \\to 0^+} x^2 \\ln(x) = +\\infty$`, isCorrect: false, explanation: "Le logarithme tend vers $-\\infty$, pas $+\\infty$." },
      { id: '4', text: `$\\lim_{x \\to 0^+} x^2 \\ln(x) = 1$`, isCorrect: false, explanation: "Valeur incorrecte." },
    ],
  },
  {
    id: 'log_4',
    difficulty: 2,
    question: `Quelle est la fonction dérivée de $f(x) = \\ln(x^2 + 5)$ pour tout réel $x$ ?`,
    answers: [
      { id: '1', text: `$f'(x) = \\dfrac{2x}{x^2 + 5}$`, isCorrect: true, explanation: "✓ Parfait ! La formule est $(\\ln u)' = \\frac{u'}{u}$. Ici $u(x) = x^2 + 5$, donc $u'(x) = 2x$." },
      { id: '2', text: `$f'(x) = \\dfrac{1}{x^2 + 5}$`, isCorrect: false, explanation: "Il manque la dérivée interne $u'(x) = 2x$ au numérateur." },
      { id: '3', text: `$f'(x) = \\dfrac{2x}{x}$`, isCorrect: false, explanation: "Le dénominateur doit être $u(x) = x^2 + 5$, pas $x$." },
      { id: '4', text: `$f'(x) = \\dfrac{1}{2x}$`, isCorrect: false, explanation: "Formule totalement erronée." },
    ],
  },
  {
    id: 'log_5',
    difficulty: 2,
    question: `Quelle est l'unique solution réelle de l'équation $\\ln(x) = 3$ ?`,
    answers: [
      { id: '1', text: `$x = e^3$`, isCorrect: true, explanation: "✓ Exact ! Par bijection réciproque (exponentielle), $\\ln(x) = 3 \\iff x = e^3 \\approx 20{,}08$." },
      { id: '2', text: `$x = 3$`, isCorrect: false, explanation: "$\\\\ln(3) \\approx 1{,}098 \\neq 3$." },
      { id: '3', text: `$x = 10^3 = 1000$`, isCorrect: false, explanation: "Confusion entre le logarithme népérien $\\ln$ (base $e$) et le logarithme décimal $\\log$ (base 10)." },
      { id: '4', text: `$x = \\sqrt{3}$`, isCorrect: false, explanation: "Incorrect." },
    ],
  },
  {
    id: 'log_6',
    difficulty: 3,
    question: `Soit $f(x) = \\dfrac{\\ln x}{x}$. Quelle est la valeur de $x$ où $f$ admet son maximum absolu sur $]0, +\\infty[$ ?`,
    answers: [
      { id: '1', text: `$x = e$ avec un maximum égal à $\\dfrac{1}{e}$`, isCorrect: true, explanation: "✓ Question classique du Bac S2 ! $f'(x) = \\frac{1 - \\ln x}{x^2}$. La dérivée s'annule en $1 - \\ln x = 0 \\iff \\ln x = 1 \\iff x = e$. Comme $f'$ est positive avant $e$ et négative après, $f(e) = \\frac{1}{e}$ est le maximum absolu." },
      { id: '2', text: `$x = 1$ avec un maximum égal à $0$`, isCorrect: false, explanation: "En $x = 1$, $f(1) = 0$, mais la fonction continue de croître jusqu'à $e$ où $f(e) = 1/e > 0$." },
      { id: '3', text: `$x = 0$`, isCorrect: false, explanation: "0 n'appartient pas au domaine de définition de la fonction logarithme." },
      { id: '4', text: `La fonction n'admet aucun extremum`, isCorrect: false, explanation: "Faux : la courbe monte puis redescend vers 0 à l'infini." },
    ],
  },
];

export default function LogarithmeQuizEmbedded() {
  const [questions, setQuestions] = useState<ProcessedQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const initQuiz = useCallback(() => {
    const letters = ['A', 'B', 'C', 'D'];
    const processed: ProcessedQuestion[] = LOGARITHME_QUESTION_BANK.map((q) => {
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
              Quiz Éclair : Logarithme Népérien
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
              Votre score sur la fonction Logarithme Népérien :
            </p>
          </div>

          <div className="inline-block bg-surface px-6 py-3 rounded-2xl border border-navy/10 font-mono text-3xl font-black text-navy">
            {score} / {questions.length}
          </div>

          <div className="max-w-md mx-auto text-xs text-text/75 leading-relaxed">
            {score === questions.length ? (
              <span className="text-emerald-700 font-bold">
                Mention Très Bien ! Vous maîtrisez parfaitement les règles et pièges du logarithme pour le Bac S2.
              </span>
            ) : score >= 4 ? (
              <span className="text-navy font-semibold">
                Bonne assimilation ! Relisez la fiche réflexe pour éliminer les dernières hésitations sur la dérivée ou les limites.
              </span>
            ) : (
              <span className="text-rose-700 font-medium">
                Revoyez attentivement les propriétés algébriques et la règle $(\ln u)&apos; = u&apos;/u$ avant d&apos;aborder les exercices.
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

