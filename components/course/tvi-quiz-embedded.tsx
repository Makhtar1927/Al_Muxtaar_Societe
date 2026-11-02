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

const TVI_QUESTION_BANK: RawQuestion[] = [
  {
    id: 'tvi_1',
    difficulty: 1,
    question: `Pour garantir l'**unicité** de la solution de l'équation $f(x) = k$ sur un intervalle $I$, quelle condition supplémentaire est **absolument indispensable** en plus de la continuité ?`,
    answers: [
      { id: '1', text: 'La parité de $f$', isCorrect: false, explanation: 'La parité n\'a aucun rapport avec le nombre de racines.' },
      { id: '2', text: 'La stricte monotonie de $f$ sur $I$', isCorrect: true, explanation: '✓ Exact ! Si $f$ est strictement croissante (ou décroissante), chaque valeur de l\'image n\'est atteinte qu\'une seule fois (bijection).' },
      { id: '3', text: 'La positivité de $f$', isCorrect: false, explanation: 'Une fonction positive ne garantit nullement l\'unicité.' },
      { id: '4', text: '$f\'\'(x) = 0$', isCorrect: false, explanation: 'La dérivée seconde concerne la convexité, pas l\'unicité des solutions.' },
    ],
  },
  {
    id: 'tvi_2',
    difficulty: 1,
    question: `Soit $f$ continue sur $[1, 5]$ telle que $f(1) = -3$ et $f(5) = 7$. Que permet d'affirmer le Théorème des Valeurs Intermédiaires ?`,
    answers: [
      { id: '1', text: 'Il existe au moins un réel $c \\in [1, 5]$ tel que $f(c) = 0$', isCorrect: true, explanation: '✓ Comme $f(1) < 0 < f(5)$, 0 est compris entre $f(1)$ et $f(5)$ : la courbe traverse l\'axe des abscisses au moins une fois.' },
      { id: '2', text: '$f(x) = 0$ admet exactement 3 solutions', isCorrect: false, explanation: 'Le TVI général sans stricte monotonie garantit seulement l\'existence d\'au moins une solution, pas le nombre exact.' },
      { id: '3', text: '$f(3) = 2$', isCorrect: false, explanation: 'La fonction n\'est pas nécessairement affine.' },
      { id: '4', text: '$f$ est dérivable sur $[1, 5]$', isCorrect: false, explanation: 'La continuité n\'implique pas la dérivabilité.' },
    ],
  },
  {
    id: 'tvi_3',
    difficulty: 2,
    question: `Soit $f$ continue et **strictement décroissante** sur $\\mathbb{R}$ telle que $f(\\alpha) = 0$. Quel est le signe de $f(x)$ pour $x < \\alpha$ ?`,
    answers: [
      { id: '1', text: '$f(x) > 0$ (strictement positif)', isCorrect: true, explanation: '✓ Piège classique Bac S2 ! Comme $f$ est DÉCROISSANTE, si $x < \\alpha$, alors $f(x) > f(\\alpha) = 0$. Le signe est donc positif avant $\\alpha$.' },
      { id: '2', text: '$f(x) < 0$ (strictement négatif)', isCorrect: false, explanation: 'Non ! Ce serait le cas si $f$ était croissante. Ici elle est décroissante, les inégalités s\'inversent.' },
      { id: '3', text: '$f(x) = 0$', isCorrect: false, explanation: 'La racine est unique en $\\alpha$.' },
      { id: '4', text: 'On ne peut pas savoir', isCorrect: false, explanation: 'La stricte monotonie permet de déterminer le signe avec certitude.' },
    ],
  },
  {
    id: 'tvi_4',
    difficulty: 2,
    question: `Au Bac S2, on calcule : $g(1,4) = -0,12$ et $g(1,5) = +0,08$ pour une fonction $g$ continue et strictement croissante. Quel encadrement de $\\alpha$ en déduit-on ?`,
    answers: [
      { id: '1', text: '$-0,12 < \\alpha < 0,08$', isCorrect: false, explanation: 'Attention, ce sont les valeurs de $g(x)$, pas celles de $x$ !' },
      { id: '2', text: '$1,4 < \\alpha < 1,5$ à $10^{-1}$ près', isCorrect: true, explanation: '✓ Comme $g(1,4) < 0 < g(1,5)$, la racine $\\alpha$ se trouve dans l\'intervalle $]1,4 \\;; 1,5[$, d\'amplitude $0,1 = 10^{-1}$.' },
      { id: '3', text: '$\\alpha = 1,45$', isCorrect: false, explanation: 'C\'est le milieu, pas nécessairement la racine.' },
      { id: '4', text: '$0 < \\alpha < 1$', isCorrect: false, explanation: 'L\'encadrement obtenu est bien plus précis : entre 1,4 et 1,5.' },
    ],
  },
  {
    id: 'tvi_5',
    difficulty: 2,
    question: `Soit $f$ une fonction continue et strictement croissante sur $I = ]-\\infty, 2]$. Si $\\lim_{x \\to -\\infty} f(x) = -1$ et $f(2) = 4$, quel est l'ensemble image $f(I)$ ?`,
    answers: [
      { id: '1', text: '$]-1, 4]$', isCorrect: true, explanation: '✓ Comme $f$ est continue et strictement croissante, l\'image d\'un intervalle $]a, b]$ est $]\\lim_{x \\to a} f(x), f(b)] = ]-1, 4]$.' },
      { id: '2', text: '$[-1, 4]$', isCorrect: false, explanation: '-1 est une limite non atteinte, le crochet doit être ouvert en -1.' },
      { id: '3', text: '$\\mathbb{R}$', isCorrect: false, explanation: 'L\'image est bornée par -1 à gauche et 4 à droite.' },
      { id: '4', text: '$]-\\infty, 2]$', isCorrect: false, explanation: 'C\'est l\'intervalle de départ, pas l\'intervalle image.' },
    ],
  },
  {
    id: 'tvi_6',
    difficulty: 3,
    question: `L'équation $x^3 + x - 1 = 0$ admet-elle des solutions sur $\\mathbb{R}$ ?`,
    answers: [
      { id: '1', text: 'Oui, une unique solution réelle', isCorrect: true, explanation: '✓ En posant $f(x) = x^3 + x - 1$, $f\'(x) = 3x^2 + 1 > 0$. $f$ est continue, strictement croissante de $-\\infty$ à $+\\infty$. Elle réalise donc une bijection de $\\mathbb{R}$ sur $\\mathbb{R}$ : $f(x) = 0$ admet une unique solution.' },
      { id: '2', text: 'Oui, exactement 3 solutions réelles', isCorrect: false, explanation: 'Comme $f$ est strictement croissante, elle ne peut traverser l\'axe qu\'une seule fois.' },
      { id: '3', text: 'Non, aucune solution réelle', isCorrect: false, explanation: 'Par exemple $f(0) = -1 < 0$ et $f(1) = 1 > 0$, la racine existe bien dans ]0, 1[.' },
      { id: '4', text: 'Une infinité de solutions', isCorrect: false, explanation: 'Un polynôme de degré 3 a au plus 3 racines.' },
    ],
  },
  {
    id: 'tvi_7',
    difficulty: 3,
    question: `Au Bac S2, si $f$ réalise une bijection de $I$ sur $J$, que peut-on dire de sa bijection réciproque $f^{-1}$ ?`,
    answers: [
      { id: '1', text: '$f^{-1}$ a le même sens de variation que $f$', isCorrect: true, explanation: '✓ Théorème fondamental : $f^{-1}$ est continue et a exactement le même sens de variation que $f$ sur $J$.' },
      { id: '2', text: '$f^{-1}$ a le sens de variation inverse', isCorrect: false, explanation: 'Faux : si $f$ est croissante, $f^{-1}$ est également strictement croissante.' },
      { id: '3', text: '$f^{-1}(x) = \\frac{1}{f(x)}$', isCorrect: false, explanation: 'Confusion majeure entre bijection réciproque ($f^{-1}$) et inverse algébrique ($1/f$).' },
      { id: '4', text: '$f^{-1}$ n\'est jamais continue', isCorrect: false, explanation: 'Elle est toujours continue sur l\'intervalle image.' },
    ],
  },
  {
    id: 'tvi_8',
    difficulty: 2,
    question: `Quelle est la symétrie graphique reliant les courbes $(\\mathcal{C}_f)$ et $(\\mathcal{C}_{f^{-1}})$ dans un repère orthonormé ?`,
    answers: [
      { id: '1', text: 'Symétrie par rapport à la première bissectrice $(D) : y = x$', isCorrect: true, explanation: '✓ Les coordonnées $(x, y)$ de $(\\mathcal{C}_f)$ deviennent $(y, x)$ sur $(\\mathcal{C}_{f^{-1}})$, ce qui correspond géométriquement à la réflexion d\'axe $y = x$.' },
      { id: '2', text: 'Symétrie par rapport à l\'axe des abscisses $(Ox)$', isCorrect: false, explanation: 'Ce serait la courbe de $-f(x)$.' },
      { id: '3', text: 'Symétrie par rapport à l\'origine $O(0, 0)$', isCorrect: false, explanation: 'Ce serait pour une fonction impaire.' },
      { id: '4', text: 'Translation de vecteur $\\vec{i} + \\vec{j}$', isCorrect: false, explanation: 'Ce n\'est pas une translation.' },
    ],
  },
  {
    id: 'tvi_9',
    difficulty: 3,
    question: `Soit $f$ continue sur $[a, b]$. Si $f(a) \\times f(b) > 0$, peut-on affirmer que $f(x) = 0$ n'a aucune racine sur $[a, b]$ ?`,
    answers: [
      { id: '1', text: 'Non ! Il peut y avoir un nombre pair de racines (ex: 2 racines)', isCorrect: true, explanation: '✓ Règle essentielle : si $f(a)$ et $f(b)$ sont tous deux positifs, la courbe peut descendre traverser l\'axe deux fois puis remonter. Le TVI ne conclut rien dans ce cas.' },
      { id: '2', text: 'Oui, c\'est certain', isCorrect: false, explanation: 'Faux ! $f(a) \\times f(b) > 0$ ne garantit pas l\'absence de racines.' },
      { id: '3', text: 'Oui seulement si $f$ est dérivable', isCorrect: false, explanation: 'Même dérivable, la fonction peut avoir 2 racines.' },
      { id: '4', text: 'La fonction est alors constante', isCorrect: false, explanation: 'Aucun rapport.' },
    ],
  },
  {
    id: 'tvi_10',
    difficulty: 1,
    question: `La fonction $f(x) = \\frac{1}{x}$ est-elle continue sur $[-1, 1]$ ?`,
    answers: [
      { id: '1', text: 'Non, car elle n\'est pas définie en 0', isCorrect: true, explanation: '✓ $f$ n\'est pas définie en $0 \\in [-1, 1]$, donc elle ne peut pas être continue sur cet intervalle. Le TVI n\'est pas applicable sur $[-1, 1]$.' },
      { id: '2', text: 'Oui, car elle est continue sur $\\mathbb{R}^*$', isCorrect: false, explanation: 'Elle est continue sur $]-\\infty, 0[$ et $]0, +\\infty[$, mais pas sur un intervalle contenant 0.' },
      { id: '3', text: 'Oui, car $f(-1) = -1$ et $f(1) = 1$', isCorrect: false, explanation: 'La présence des bornes ne suffit pas.' },
      { id: '4', text: 'Oui en posant $f(0) = 0$', isCorrect: false, explanation: 'Elle admet une asymptote verticale en 0, pas un prolongement continu.' },
    ],
  },
  {
    id: 'tvi_11',
    difficulty: 2,
    question: `Au Bac S2, que vaut la dérivée de $f^{-1}$ en un point $y_0 = f(x_0)$ où $f'(x_0) \\ne 0$ ?`,
    answers: [
      { id: '1', text: '$(f^{-1})\'(y_0) = \\frac{1}{f\'(x_0)}$', isCorrect: true, explanation: '✓ Formule clé de la dérivée de la fonction réciproque exigée au Bac : $(f^{-1})\'(y_0) = \\frac{1}{f\'(f^{-1}(y_0))} = \\frac{1}{f\'(x_0)}$.' },
      { id: '2', text: '$(f^{-1})\'(y_0) = -f\'(x_0)$', isCorrect: false, explanation: 'Faux, c\'est l\'inverse multiplicatif, pas l\'opposé.' },
      { id: '3', text: '$(f^{-1})\'(y_0) = f\'(y_0)$', isCorrect: false, explanation: 'Faux.' },
      { id: '4', text: '$(f^{-1})\'(y_0) = 0$', isCorrect: false, explanation: 'Faux.' },
    ],
  },
  {
    id: 'tvi_12',
    difficulty: 2,
    question: `Dans la rédaction du Bac, quelle est la formulation exacte pour le corollaire du TVI ?`,
    answers: [
      { id: '1', text: '« f continue, strictement monotone sur [a,b] et 0 ∈ f([a,b]) »', isCorrect: true, explanation: '✓ La trilogie gagnante exigée par le barème : continuité, stricte monotonie, et appartenance de la valeur cible à l\'image.' },
      { id: '2', text: '« f est croissante donc il y a une solution »', isCorrect: false, explanation: 'Incomplet : manque la continuité et le changement de signe.' },
      { id: '3', text: '« d\'après Pythagore, il y a une racine »', isCorrect: false, explanation: 'Hors sujet.' },
      { id: '4', text: '« la calculatrice affiche 0,6 »', isCorrect: false, explanation: 'La calculatrice donne une valeur approchée, elle ne remplace pas la démonstration mathématique.' },
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

function buildRandomSession(count = 8): ProcessedQuestion[] {
  const letters = ['A', 'B', 'C', 'D'];
  const shuffledQuestions = shuffleArray(TVI_QUESTION_BANK).slice(0, count);

  return shuffledQuestions.map((q) => {
    const shuffledAnswers = shuffleArray(q.answers);
    return {
      id: q.id,
      question: q.question,
      difficulty: q.difficulty,
      answers: shuffledAnswers.map((ans, idx) => ({
        letter: letters[idx] ?? String(idx + 1),
        text: ans.text,
        isCorrect: ans.isCorrect,
        explanation: ans.explanation,
      })),
    };
  });
}

const DIFFICULTY_CONFIG: Record<
  number,
  { label: string; badgeClass: string; iconName: StudyIconName }
> = {
  1: {
    label: 'Facile',
    badgeClass: 'bg-emerald-50 text-emerald-800 border-emerald-300',
    iconName: 'niveau_facile',
  },
  2: {
    label: 'Intermédiaire',
    badgeClass: 'bg-amber-50 text-amber-800 border-amber-300',
    iconName: 'niveau_intermediaire',
  },
  3: {
    label: 'Bac S2',
    badgeClass: 'bg-rose-50 text-rose-800 border-rose-300',
    iconName: 'niveau_difficile',
  },
};

export default function TviQuizEmbedded() {
  const [questions, setQuestions] = useState<ProcessedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [sessionCount, setSessionCount] = useState(1);

  const initQuiz = useCallback(() => {
    const session = buildRandomSession(8);
    setQuestions(session);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setIsQuizFinished(false);
  }, []);

  useEffect(() => {
    initQuiz();
  }, [initQuiz, sessionCount]);

  if (questions.length === 0) return null;

  const currentQ = questions[currentIndex];
  const diffConfig = DIFFICULTY_CONFIG[currentQ.difficulty] || DIFFICULTY_CONFIG[1];

  function handleSelect(letter: string) {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(letter);
  }

  function handleValidate() {
    if (!selectedAnswer || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    const chosen = currentQ.answers.find((a) => a.letter === selectedAnswer);
    if (chosen?.isCorrect) {
      const newScore = score + 1;
      const newStreak = streak + 1;
      setScore(newScore);
      setStreak(newStreak);
      if (newStreak > maxStreak) setMaxStreak(newStreak);
    } else {
      setStreak(0);
    }
  }

  function handleNext() {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setIsQuizFinished(true);
    }
  }

  function handleRestart() {
    setSessionCount((prev) => prev + 1);
  }

  return (
    <section className="my-8 rounded-3xl border border-navy/15 bg-white p-4 sm:p-6 shadow-sm">
      {/* En-tête HUD Quiz */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-wider text-turquoise bg-turquoise/15 px-2.5 py-0.5 rounded-full border border-turquoise/20">
              Quiz Interactif TVI
            </span>
            <span className="text-[10px] font-bold text-text/50">
              Session #{sessionCount} • Tirage Aléatoire
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-black text-navy mt-1 flex items-center gap-2">
            <StudyIcon name="de_tirage" size={22} />
            <span>Testez vos Réflexes : TVI &amp; Bijection Bac S2</span>
          </h3>
        </div>

        {/* Compteurs HUD Mobile */}
        <div className="flex items-center gap-2">
          {/* Série Streak */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 font-bold text-xs">
            <StudyIcon name="flamme_serie" size={16} />
            <span>{streak} d&apos;affilée</span>
          </div>

          {/* Score */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold text-xs">
            <StudyIcon name="correct" size={16} />
            <span>{score}/{questions.length}</span>
          </div>
        </div>
      </div>

      {!isQuizFinished ? (
        <div className="mt-4 space-y-4">
          {/* Barre de progression et métadonnées de la question */}
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-navy">
              Question {currentIndex + 1} sur {questions.length}
            </span>
            <div className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border flex items-center gap-1 ${diffConfig.badgeClass}`}>
              <StudyIcon name={diffConfig.iconName} size={14} />
              <span>{diffConfig.label}</span>
            </div>
          </div>

          {/* Énoncé de la question avec rendu KaTeX */}
          <div className="p-4 rounded-2xl bg-surface/70 border border-navy/10 text-navy font-semibold text-sm sm:text-base leading-relaxed">
            <MathRenderer content={currentQ.question} />
          </div>

          {/* Choix de réponses A, B, C, D */}
          <div className="space-y-2">
            {currentQ.answers.map((ans) => {
              const isSelected = selectedAnswer === ans.letter;
              let btnClass = 'bg-white hover:bg-surface border-navy/15 text-navy';

              if (isAnswerSubmitted) {
                if (ans.isCorrect) {
                  btnClass = 'bg-emerald-50 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-500/20';
                } else if (isSelected && !ans.isCorrect) {
                  btnClass = 'bg-rose-50 border-rose-500 text-rose-950 font-bold ring-2 ring-rose-500/20';
                } else {
                  btnClass = 'bg-white/50 border-navy/10 text-text/40 opacity-50';
                }
              } else if (isSelected) {
                btnClass = 'bg-turquoise/15 border-turquoise text-navy font-bold ring-2 ring-turquoise/30';
              }

              return (
                <button
                  key={ans.letter}
                  type="button"
                  onClick={() => handleSelect(ans.letter)}
                  disabled={isAnswerSubmitted}
                  className={`w-full p-3 sm:p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${btnClass}`}
                >
                  <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                    isAnswerSubmitted && ans.isCorrect
                      ? 'bg-emerald-600 text-white'
                      : isAnswerSubmitted && isSelected && !ans.isCorrect
                        ? 'bg-rose-600 text-white'
                        : isSelected
                          ? 'bg-turquoise text-white'
                          : 'bg-navy/10 text-navy'
                  }`}>
                    {ans.letter}
                  </span>

                  <div className="flex-1 text-xs sm:text-sm">
                    <MathRenderer content={ans.text} />
                  </div>

                  {isAnswerSubmitted && ans.isCorrect && (
                    <StudyIcon name="correct" size={18} className="shrink-0" />
                  )}
                  {isAnswerSubmitted && isSelected && !ans.isCorrect && (
                    <StudyIcon name="incorrect" size={18} className="shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explication pédagogique immédiate après validation */}
          {isAnswerSubmitted && (
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm animate-in fade-in-50">
              <div className="flex items-center gap-1.5 font-bold text-navy mb-1">
                <StudyIcon name="cle_solution" size={16} />
                <span>Explication officielle :</span>
              </div>
              <p className="text-text/80 leading-relaxed">
                {currentQ.answers.find((a) => a.isCorrect)?.explanation}
              </p>
            </div>
          )}

          {/* Bouton d'action Valider ou Question Suivante */}
          <div className="pt-2 flex justify-end">
            {!isAnswerSubmitted ? (
              <button
                type="button"
                onClick={handleValidate}
                disabled={!selectedAnswer}
                className="px-6 py-2.5 rounded-xl bg-navy hover:bg-[#0B6477] disabled:opacity-40 text-white font-bold text-xs sm:text-sm transition-all"
              >
                Valider ma réponse
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="px-6 py-2.5 rounded-xl bg-turquoise hover:brightness-110 text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-1.5"
              >
                <span>{currentIndex < questions.length - 1 ? 'Question suivante' : 'Voir mon bilan'}</span>
                <StudyIcon name="suivant" size={16} />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Écran de bilan final */
        <div className="py-8 text-center space-y-4 animate-in zoom-in-95">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-turquoise/15 flex items-center justify-center">
            <StudyIcon name="diplome_bac" size={36} />
          </div>

          <h4 className="text-xl font-black text-navy">
            Session Terminée ! Score : {score} / {questions.length}
          </h4>

          <p className="text-xs sm:text-sm text-text/70 max-w-md mx-auto">
            {score >= 7
              ? 'Excellent niveau ! Vous maîtrisez parfaitement les subtilités du TVI et de la bijection pour le Bac S2.'
              : score >= 5
                ? 'Bon travail ! Relisez bien la fiche réflexe pour éliminer les dernières hésitations sur la stricte monotonie.'
                : 'Poursuivez vos révisions : le TVI est indispensable pour réussir l\'épreuve de maths au Baccalauréat.'}
          </p>

          <div className="flex justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleRestart}
              className="px-5 py-2.5 rounded-xl bg-navy hover:bg-[#0B6477] text-white font-bold text-xs sm:text-sm transition-all flex items-center gap-2"
            >
              <StudyIcon name="recommencer" size={16} />
              <span>Nouveau tirage aléatoire</span>
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

