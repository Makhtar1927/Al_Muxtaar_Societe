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

const ISOMETRIES_QUESTION_BANK: RawQuestion[] = [
  {
    id: 'iso_1',
    difficulty: 1,
    question: `Soit l'isométrie du plan $f$ d'écriture complexe $z' = -i \\overline{z} + 2$. Quelle est la nature globale de $f$ ?`,
    answers: [
      { id: '1', text: `Un antidéplacement (isométrie indirecte)`, isCorrect: true, explanation: "✓ Parfait ! L'écriture est de la forme $z' = e^{i\\theta}\\overline{z} + b$ avec $|-i| = 1$. La présence du conjugué $\\overline{z}$ inverse l'orientation des angles orientés : c'est un antidéplacement (soit une réflexion axiale, soit une symétrie glissée)." },
      { id: '2', text: `Un déplacement (isométrie directe)`, isCorrect: false, explanation: "Un déplacement s'écrit $z' = e^{i\\theta} z + b$ avec $z$, jamais avec son conjugué $\\overline{z}$." },
      { id: '3', text: `Une rotation d'angle $-\\frac{\\pi}{2}$`, isCorrect: false, explanation: "Une rotation est un déplacement (isométrie directe) d'écriture $z' = e^{i\\theta} z + b$. Ici le terme est $\\overline{z}$, donc ce ne peut pas être une rotation." },
      { id: '4', text: `Une similitude de rapport $k = -1$`, isCorrect: false, explanation: "Un rapport de similitude est TOUJOURS un réel strictement positif ($k > 0$). Ici $|-i| = 1$, c'est donc une isométrie ($k = 1$)." },
    ],
  },
  {
    id: 'iso_2',
    difficulty: 1,
    question: `Soit $f$ une isométrie du plan qui admet deux points invariants distincts $A$ et $B$ ($A \\neq B$). Que peut-on affirmer avec certitude ?`,
    answers: [
      { id: '1', text: `Tout point de la droite $(AB)$ est invariant par $f$, et $f$ est soit $\\text{Id}$, soit la réflexion axiale $S_{(AB)}$`, isCorrect: true, explanation: "✓ Exactement ! Si une isométrie fixe deux points distincts $A$ et $B$, elle conserve les distances à $A$ et $B$ et fixe donc chaque point de la droite $(AB)$. Dès lors, $\\text{Inv}(f)$ contient la droite $(AB)$, donc $f$ est soit l'identité du plan $\\text{Id}$, soit la réflexion axiale $S_{(AB)}$." },
      { id: '2', text: `$f$ est obligatoirement l'identité du plan $\\text{Id}$`, isCorrect: false, explanation: "Non, $f$ peut aussi être la réflexion axiale d'axe $(AB)$, qui laisse invariante toute la droite $(AB)$ sans être l'identité sur le reste du plan." },
      { id: '3', text: `$f$ est une rotation de centre le milieu de $[AB]$`, isCorrect: false, explanation: "Une rotation (distincte de l'identité) n'admet qu'un SEUL point invariant (son centre). Elle ne peut jamais avoir deux points fixes distincts." },
      { id: '4', text: `$f$ est une translation de vecteur $\\vec{AB}$`, isCorrect: false, explanation: "Une translation de vecteur non nul n'admet AUCUN point invariant ($\\|\\vec{AB}\\| > 0$)." },
    ],
  },
  {
    id: 'iso_3',
    difficulty: 2,
    question: `Soient deux droites sécantes $\\Delta_1$ et $\\Delta_2$ en un point $\\Omega$, telles que l'angle orienté $(\\Delta_1, \\Delta_2) \\equiv \\frac{\\pi}{6} \\pmod\\pi$. Quelle est la nature de la transformation composée $S_{\\Delta_2} \\circ S_{\\Delta_1}$ ?`,
    answers: [
      { id: '1', text: `La rotation de centre $\\Omega$ et d'angle $\\theta = \\frac{\\pi}{3} \\pmod{2\\pi}$`, isCorrect: true, explanation: "✓ Excellent ! La composée de deux réflexions d'axes sécants en $\\Omega$ est la rotation de centre $\\Omega$ et d'angle $\\theta = 2(\\Delta_1, \\Delta_2)$. Ici $\\theta = 2 \\times \\frac{\\pi}{6} = \\frac{\\pi}{3} \\pmod{2\\pi}$." },
      { id: '2', text: `La rotation de centre $\\Omega$ et d'angle $\\theta = \\frac{\\pi}{6} \\pmod{2\\pi}$`, isCorrect: false, explanation: "Attention au facteur 2 ! L'angle de la rotation est le DOUBLE de l'angle entre les axes : $\\theta = 2(\\Delta_1, \\Delta_2) = \\frac{\\pi}{3}$." },
      { id: '3', text: `Une translation de vecteur orthogonal à $\\Delta_1$`, isCorrect: false, explanation: "Une translation est obtenue lorsque les deux axes sont PARALLÈLES ($\\Delta_1 \\parallel \\Delta_2$). Lorsqu'ils sont sécants, on obtient une rotation." },
      { id: '4', text: `Une réflexion axiale d'axe la bissectrice de $\\Delta_1$ et $\\Delta_2$`, isCorrect: false, explanation: "La composée de deux réflexions axiales est TOUJOURS une isométrie directe (déplacement : translation ou rotation), car $(-1) \\times (-1) = +1$. Elle ne peut jamais être une réflexion." },
    ],
  },
  {
    id: 'iso_4',
    difficulty: 2,
    question: `Soit $f = t_{\\vec{u}} \\circ S_\\Delta$ une symétrie glissée d'axe $\\Delta$ et de vecteur $\\vec{u} \\neq \\vec{0}$ (avec $\\vec{u}$ directeur de $\\Delta$). Que vaut la transformation composée $f \\circ f = f^2$ ?`,
    answers: [
      { id: '1', text: `La translation de vecteur $2\\vec{u}$ : $f^2 = t_{2\\vec{u}}$`, isCorrect: true, explanation: "✓ Magistral ! Comme $\\vec{u}$ est colinéaire à $\\Delta$, $t_{\\vec{u}}$ et $S_\\Delta$ commutent. D'où $f^2 = t_{\\vec{u}} \\circ S_\\Delta \\circ t_{\\vec{u}} \\circ S_\\Delta = t_{\\vec{u}} \\circ t_{\\vec{u}} \\circ S_\\Delta \\circ S_\\Delta = t_{2\\vec{u}} \\circ \\text{Id} = t_{2\\vec{u}}$." },
      { id: '2', text: `L'identité du plan : $f^2 = \\text{Id}$`, isCorrect: false, explanation: "Seule une réflexion axiale pure est involutive ($S_\\Delta \\circ S_\\Delta = \\text{Id}$). Une symétrie glissée avance de $2\\vec{u}$ après deux applications consécutives." },
      { id: '3', text: `La réflexion axiale $S_\\Delta$`, isCorrect: false, explanation: "La composée de deux isométries indirectes est TOUJOURS directe, donc $f^2$ ne peut pas être une réflexion." },
      { id: '4', text: `Une rotation de centre sur $\\Delta$ et d'angle $\\pi$`, isCorrect: false, explanation: "Une symétrie glissée itérée deux fois n'a aucun point fixe si $\\vec{u} \\neq \\vec{0}$. $f^2$ est strictement la translation $t_{2\\vec{u}}$." },
    ],
  },
  {
    id: 'iso_5',
    difficulty: 3,
    question: `Soit $f = t_{\\vec{u}} \\circ S_\\Delta$ une symétrie glissée. Pour tout point $M$ du plan et son image $M' = f(M)$, où se situe le milieu $I$ du segment $[MM']$ ?`,
    answers: [
      { id: '1', text: `Le milieu $I$ appartient obligatoirement à l'axe $\\Delta$ de la symétrie glissée`, isCorrect: true, explanation: "✓ Règle d'or du Bac S2 ! Posons $M_1 = S_\\Delta(M)$. Le segment $[MM_1]$ est orthogonal à $\\Delta$ et son milieu $H$ est sur $\\Delta$. Ensuite $M' = t_{\\vec{u}}(M_1)$. Par la relation des milieux, le milieu $I$ de $[MM']$ se déduit de $H$ par la translation $\\frac{1}{2}\\vec{u}$. Comme $\\vec{u}$ est directeur de $\\Delta$, $I$ reste sur $\\Delta$ !" },
      { id: '2', text: `Le milieu $I$ est le centre d'inertie du plan complexe`, isCorrect: false, explanation: "Le milieu dépend du point $M$ choisi, mais sa trajectoire géométrique reste confinée à la droite $\\Delta$." },
      { id: '3', text: `Le milieu $I$ appartient à la médiatrice de l'axe $\\Delta$`, isCorrect: false, explanation: "L'axe $\\Delta$ est une droite infinie, elle n'a pas de médiatrice. $I$ est directement situé sur la droite $\\Delta$." },
      { id: '4', text: `Le milieu $I$ est invariant par $f$ ($f(I) = I$)`, isCorrect: false, explanation: "Une symétrie glissée n'admet AUCUN point invariant ($\\text{Inv}(f) = \\emptyset$). Donc $f(I) \\neq I$." },
    ],
  },
  {
    id: 'iso_6',
    difficulty: 2,
    question: `Soit $\\mathcal{T}$ un triangle d'aire $18 \\text{ cm}^2$. On lui applique successivement une réflexion axiale $S_\\Delta$, puis une rotation de centre $\\Omega$ et d'angle $\\frac{\\pi}{3}$. Quelle est l'aire du triangle image final $\\mathcal{T}''$ ?`,
    answers: [
      { id: '1', text: `$18 \\text{ cm}^2$ (l'aire est rigoureusement conservée)`, isCorrect: true, explanation: "✓ Exact ! La réflexion et la rotation sont des isométries (rapport de distances $k = 1$). Toute isométrie conserve exactement les longueurs, et donc le facteur multiplicatif sur les aires est $k^2 = 1^2 = 1$. L'aire reste donc strictement égale à $18 \\text{ cm}^2$." },
      { id: '2', text: `$36 \\text{ cm}^2$ (l'aire double après deux transformations)`, isCorrect: false, explanation: "La composition de deux isométries reste une isométrie de rapport $k = 1 \\times 1 = 1$. Les aires ne sont pas multipliées par 2." },
      { id: '3', text: `$18\\sqrt{3} \\text{ cm}^2$ (à cause de l'angle $\\frac{\\pi}{3}$)`, isCorrect: false, explanation: "L'angle de rotation modifie l'orientation de la figure mais n'affecte en aucun cas sa surface ou ses longueurs." },
      { id: '4', text: `$-18 \\text{ cm}^2$ car la réflexion inverse l'orientation`, isCorrect: false, explanation: "Une aire géométrique est par définition une grandeur scalaire strictement positive. L'inversion d'orientation n'affecte pas le signe de l'aire géométrique." },
    ],
  },
];

export default function IsometriesQuizEmbedded() {
  const [questions, setQuestions] = useState<ProcessedQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const initQuiz = useCallback(() => {
    const processed: ProcessedQuestion[] = ISOMETRIES_QUESTION_BANK.map((q) => {
      return {
        id: q.id,
        question: q.question,
        difficulty: q.difficulty,
        answers: q.answers.map((ans, idx) => ({
          letter: LETTERS[idx],
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

  const difficultyStars = (level: number) => {
    return '★'.repeat(level) + '☆'.repeat(3 - level);
  };

  return (
    <div className="bg-white rounded-3xl border border-navy/10 shadow-lg p-6 sm:p-8 my-8 overflow-hidden">
      {/* Quiz Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy/10 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <StudyIcon name="cible_reflexe" className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-black tracking-widest text-emerald-600 uppercase">
              Auto-Évaluation Bac S2
            </span>
            <h3 className="text-lg sm:text-xl font-black text-navy">
              Quiz Interactif : Isométries &amp; Transformations
            </h3>
          </div>
        </div>

        {!quizFinished && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 bg-navy/5 text-navy/70 rounded-full">
              Question {currentIdx + 1} / {questions.length}
            </span>
            <span className="text-xs font-bold px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full">
              Score : {score}
            </span>
          </div>
        )}
      </div>

      {!quizFinished ? (
        <div>
          {/* Difficulty & Question text */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-black text-amber-500 tracking-wider">
                NIVEAU DE DIFFICULTÉ : {difficultyStars(currentQ.difficulty)}
              </span>
            </div>
            <div className="text-base sm:text-lg font-bold text-navy leading-relaxed">
              <MathRenderer content={currentQ.question} />
            </div>
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-1 gap-3 mb-6">
            {currentQ.answers.map((ans) => {
              const isSelected = selectedLetter === ans.letter;
              let btnClass = 'border-navy/15 bg-navy/[0.02] hover:bg-navy/[0.05] text-navy';

              if (showExplanation) {
                if (ans.isCorrect) {
                  btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold ring-2 ring-emerald-500/20';
                } else if (isSelected && !ans.isCorrect) {
                  btnClass = 'border-red-500 bg-red-50 text-red-950 font-semibold ring-2 ring-red-500/20';
                } else {
                  btnClass = 'border-navy/10 bg-navy/[0.01] text-navy/40 opacity-60';
                }
              } else if (isSelected) {
                btnClass = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold';
              }

              return (
                <button
                  key={ans.letter}
                  onClick={() => handleSelectAnswer(ans.letter)}
                  disabled={showExplanation}
                  className={`flex items-start gap-3 p-4 rounded-2xl border text-left transition-all ${btnClass}`}
                >
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black shrink-0 ${
                      showExplanation && ans.isCorrect
                        ? 'bg-emerald-600 text-white'
                        : showExplanation && isSelected && !ans.isCorrect
                        ? 'bg-red-500 text-white'
                        : 'bg-navy/10 text-navy'
                    }`}
                  >
                    {ans.letter}
                  </span>
                  <div className="text-sm sm:text-base pt-0.5 leading-normal flex-1">
                    <MathRenderer content={ans.text} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {showExplanation && selectedAnswerObj && (
            <div
              className={`p-4 sm:p-5 rounded-2xl mb-6 border animate-fadeIn ${
                selectedAnswerObj.isCorrect
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50/80 border-amber-300 text-amber-950'
              }`}
            >
              <div className="flex items-center gap-2 mb-1.5 font-bold text-sm">
                <StudyIcon
                  name={selectedAnswerObj.isCorrect ? 'correct' : 'avertissement'}
                  className={`w-5 h-5 ${selectedAnswerObj.isCorrect ? 'text-emerald-600' : 'text-amber-600'}`}
                />
                <span>
                  {selectedAnswerObj.isCorrect
                    ? 'Excellente réponse !'
                    : 'Attention, analyse de la méthode :'}
                </span>
              </div>
              <div className="text-xs sm:text-sm leading-relaxed">
                <MathRenderer content={selectedAnswerObj.explanation} />
              </div>
            </div>
          )}

          {/* Navigation Action */}
          <div className="flex justify-end">
            {showExplanation ? (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2"
              >
                <span>{currentIdx < questions.length - 1 ? 'Question Suivante' : 'Voir mon Bilan'}</span>
                <span>→</span>
              </button>
            ) : (
              <p className="text-xs text-navy/40 italic">
                Sélectionnez une réponse pour afficher la correction détaillée.
              </p>
            )}
          </div>
        </div>
      ) : (
        /* Results screen */
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-emerald-500/15 flex items-center justify-center text-emerald-600 p-3">
            <StudyIcon name="cible_reflexe" className="w-8 h-8" />
          </div>
          <div>
            <h4 className="text-xl font-black text-navy">
              {score >= 5
                ? 'Excellent travail sur les Isométries ! 🎯'
                : score >= 3
                ? 'Bien joué ! Continuez ainsi 👏'
                : 'Encore un petit effort sur les formules ! 💪'}
            </h4>
            <p className="text-xs text-navy/60 mt-1">
              Vous avez obtenu <strong className="text-navy">{score}</strong> sur{' '}
              <strong className="text-navy">{questions.length}</strong> questions correctes.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={initQuiz}
              className="inline-flex items-center gap-2 bg-emerald-600 text-white font-black text-xs px-5 py-3 rounded-xl shadow hover:bg-emerald-700 transition-transform active:scale-95"
            >
              <StudyIcon name="recommencer" className="w-4 h-4" />
              <span>Recommencer le Quiz Isométries</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
