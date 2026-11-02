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

const STATISTIQUES_QUESTION_BANK: RawQuestion[] = [
  {
    id: 'st_1',
    difficulty: 1,
    question: `Soit une série statistique double $(X, Y)$ de point moyen $G(4, 15)$. Laquelle des affirmations suivantes est TOUJOURS vraie ?`,
    answers: [
      { id: '1', text: `La droite de régression de $Y$ en $X$ passe obligatoirement par le point $G(4, 15)$.`, isCorrect: true, explanation: "✓ Exact ! Par construction des moindres carrés, la droite d'ajustement vérifie $\\bar{y} = a\\bar{x} + b$, ce qui prouve que $G(\\bar{x}, \\bar{y})$ appartient toujours à la droite de régression." },
      { id: '2', text: `Le coefficient de corrélation linéaire vaut $r = 15/4 = 3,75$.`, isCorrect: false, explanation: "Faux : le coefficient $r$ est toujours compris entre -1 et 1 !" },
      { id: '3', text: `La covariance est obligatoirement égale à $4 \\times 15 = 60$.`, isCorrect: false, explanation: "Faux : $Cov(X, Y) = \\frac{1}{N}\\sum x_i y_i - \\bar{x}\\bar{y}$, ce n'est pas le produit des moyennes." },
      { id: '4', text: `Tous les points du nuage sont alignés avec $G$.`, isCorrect: false, explanation: "Faux : les points du nuage sont dispersés autour du point moyen $G$." },
    ],
  },
  {
    id: 'st_2',
    difficulty: 1,
    question: `D'après la formule de Koenig, comment calcule-t-on la covariance $Cov(X, Y)$ d'une série statistique double de taille $N$ ?`,
    answers: [
      { id: '1', text: `$Cov(X, Y) = \\dfrac{1}{N} \\sum_{i=1}^N x_i y_i - \\bar{x}\\bar{y}$`, isCorrect: true, explanation: "✓ Bravo ! C'est la formule fondamentale de Koenig : la moyenne des produits moins le produit des moyennes." },
      { id: '2', text: `$Cov(X, Y) = \\dfrac{1}{N} \\sum_{i=1}^N x_i^2 - \\bar{x}^2$`, isCorrect: false, explanation: "Cette formule donne la variance marginale $V(X)$, pas la covariance entre $X$ et $Y$." },
      { id: '3', text: `$Cov(X, Y) = \\dfrac{\\bar{x} + \\bar{y}}{2}$`, isCorrect: false, explanation: "Formule totalement incorrecte." },
      { id: '4', text: `$Cov(X, Y) = \\sqrt{V(X) \\cdot V(Y)}$`, isCorrect: false, explanation: "Ce terme est le dénominateur servant à calculer le coefficient de corrélation $r$." },
    ],
  },
  {
    id: 'st_3',
    difficulty: 2,
    question: `On a obtenu $V(X) = 4$, $V(Y) = 9$ et $Cov(X, Y) = 5$. Que vaut le coefficient directeur (la pente) $a$ de la droite de régression de $Y$ en $X$ ?`,
    answers: [
      { id: '1', text: `$a = \\dfrac{Cov(X, Y)}{V(X)} = \\dfrac{5}{4} = 1,25$`, isCorrect: true, explanation: "✓ Excellent ! Pour la régression de $Y$ en $X$ ($y = ax + b$), la pente est donnée par le quotient de la covariance par la variance de la variable explicative $X$, soit $a = \\frac{Cov(X, Y)}{V(X)} = \\frac{5}{4} = 1,25$." },
      { id: '2', text: `$a = \\dfrac{Cov(X, Y)}{V(Y)} = \\dfrac{5}{9} \\approx 0,556$`, isCorrect: false, explanation: "Attention : $\\frac{Cov(X, Y)}{V(Y)}$ est la pente $a'$ de la droite de régression de $X$ en $Y$ ($x = a'y + b'$)." },
      { id: '3', text: `$a = \\dfrac{V(X)}{V(Y)} = \\dfrac{4}{9}$`, isCorrect: false, explanation: "Formule incorrecte." },
      { id: '4', text: `$a = \\dfrac{5}{\\sqrt{36}} = \\dfrac{5}{6}$`, isCorrect: false, explanation: "Ceci correspond au coefficient de corrélation linéaire $r = \\frac{Cov(X,Y)}{\\sigma_X \\sigma_Y}$, pas à la pente $a$." },
    ],
  },
  {
    id: 'st_4',
    difficulty: 2,
    question: `Au terme d'une étude statistique, un candidat au Bac S2 calcule un coefficient de corrélation $r = -0,96$. Quelle conclusion doit-il obligatoirement rédiger ?`,
    answers: [
      { id: '1', text: `Comme $|r| = 0,96 \\ge 0,87$, il existe une très forte corrélation linéaire entre $X$ et $Y$ ; un ajustement linéaire par les moindres carrés est parfaitement justifié.`, isCorrect: true, explanation: "✓ Parfait ! Le signe négatif indique simplement que $Y$ décroît quand $X$ augmente. La proximité de $|r|$ avec 1 confirme l'excellence de l'ajustement linéaire." },
      { id: '2', text: `Comme $r < 0$, l'ajustement linéaire est impossible et rejeté.`, isCorrect: false, explanation: "Faux ! Une corrélation négative est tout à fait valide : elle traduit une relation décroissante (ex: prix qui augmente entraîne baisse de la demande)." },
      { id: '3', text: `Les points sont tous situés au-dessus de l'axe des ordonnées.`, isCorrect: false, explanation: "Aucun lien entre le signe de $r$ et la position géométrique des ordonnées." },
      { id: '4', text: `La variance $V(X)$ est négative.`, isCorrect: false, explanation: "Une variance est toujours strictement positive ($V(X) > 0$)." },
    ],
  },
  {
    id: 'st_5',
    difficulty: 3,
    question: `Une entreprise souhaite déterminer l'année $x$ où sa production $y$ atteindra 100 tonnes. On dispose des deux droites : $(D) : y = 3x + 10$ et $(D') : x = 0,31 y - 2,8$. Quelle démarche est exigée au Baccalauréat ?`,
    answers: [
      { id: '1', text: `Utiliser la droite de régression de $X$ en $Y$ $(D')$ : $x = 0,31(100) - 2,8 = 31 - 2,8 = 28,2$.`, isCorrect: true, explanation: "✓ Règle d'or absolue au Bac S2 ! Quand on veut estimer $X$ connaissant $Y$, la droite des moindres carrés optimale est $(D_{X/Y}) : x = a'y + b'$, et NON la résolution algébrique de $(D)$." },
      { id: '2', text: `Résoudre $100 = 3x + 10$ sur la droite $(D)$, ce qui donne $x = 30$.`, isCorrect: false, explanation: "Piège récurrent au Bac ! La droite (D) minimise les distances verticales (en Y). Pour estimer X, il faut minimiser les distances horizontales via la droite (D')." },
      { id: '3', text: `Calculer la moyenne des deux résultats $(28,2 + 30)/2 = 29,1$.`, isCorrect: false, explanation: "Procédé sans justification statistique." },
      { id: '4', text: `L'énoncé ne permet pas de répondre sans connaître le coefficient $r$.`, isCorrect: false, explanation: "La droite (D') fournit directement l'estimation recherchée." },
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

export default function StatistiquesQuizEmbedded() {
  const [questions, setQuestions] = useState<ProcessedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [history, setHistory] = useState<{ isCorrect: boolean; selected: string }[]>([]);

  const LETTERS = ['A', 'B', 'C', 'D'];

  const initQuiz = useCallback(() => {
    const processed: ProcessedQuestion[] = STATISTIQUES_QUESTION_BANK.map((q) => {
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
              Quiz Auto-Évaluation : Séries Doubles &amp; Moindres Carrés
            </h3>
            <p className="text-xs sm:text-sm text-navy/60">
              5 questions chronométrées pour sécuriser les 4 à 5 points de l&apos;épreuve
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
              ? 'Excellent ! Vous dominez les Statistiques S2'
              : score >= 3
              ? 'Bonne maîtrise, revoyez les formules de Koenig'
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
