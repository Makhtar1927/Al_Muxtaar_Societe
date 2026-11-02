'use client';

import React, { useState, useEffect, useCallback } from 'react';
import MathRenderer from '@/components/course/math-renderer';
import StudyIcon, { StudyIconName } from '@/components/ui/study-icon';

/* ============================================================
   TYPES & STRUCTURES
   ============================================================ */

interface RawAnswer {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
}

interface RawQuestion {
  id: string;
  question: string;
  difficulty: 1 | 2 | 3; // 1: Facile, 2: Intermédiaire, 3: Type Bac S2
  answers: RawAnswer[];
}

interface ProcessedQuestion {
  id: string;
  question: string;
  difficulty: 1 | 2 | 3;
  answers: {
    letter: string; // A, B, C, D
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
}

/* ============================================================
   BANQUE COMPLÈTE DE QUESTIONS (Pool pour tirage aléatoire)
   ============================================================ */
const QUESTION_BANK: RawQuestion[] = [
  {
    id: 'q1',
    difficulty: 1,
    question: `Laquelle de ces expressions est une **forme indéterminée** ?`,
    answers: [
      { id: '1', text: '$\\dfrac{0}{\\infty}$', isCorrect: false, explanation: '$\\frac{0}{\\infty} = 0$, ce n\'est **pas** une indétermination : le résultat est directement 0.' },
      { id: '2', text: '$\\dfrac{0}{0}$', isCorrect: true, explanation: '✓ $\\frac{0}{0}$ est une **forme indéterminée majeure**. Au Bac S2, on la lève par factorisation, quantité conjuguée ou taux de variation.' },
      { id: '3', text: '$\\dfrac{5}{\\infty}$', isCorrect: false, explanation: '$\\frac{5}{\\infty} = 0$, c\'est un résultat déterminé immédiatement.' },
      { id: '4', text: '$\\dfrac{\\infty}{1}$', isCorrect: false, explanation: '$\\frac{\\infty}{1} = \\infty$, résultat déterminé.' },
    ],
  },
  {
    id: 'q2',
    difficulty: 1,
    question: `Calculer la limite fondamentale : $\\displaystyle\\lim_{x \\to 0} \\frac{\\sin x}{x}$`,
    answers: [
      { id: '1', text: '$0$', isCorrect: false, explanation: 'Non. C\'est un piège classique : $\\frac{\\sin x}{x}$ tend vers 1 quand $x \\to 0$.' },
      { id: '2', text: '$+\\infty$', isCorrect: false, explanation: 'Non, la limite est finie et vaut 1.' },
      { id: '3', text: '$1$', isCorrect: true, explanation: '✓ Limite trigonométrique fondamentale issue du nombre dérivé du sinus en 0 : $\\sin\'(0) = \\cos(0) = 1$.' },
      { id: '4', text: '$\\pi$', isCorrect: false, explanation: 'Non, la limite vaut exactement 1.' },
    ],
  },
  {
    id: 'q3',
    difficulty: 2,
    question: `Calculer : $\\displaystyle\\lim_{x \\to +\\infty} \\frac{3x^2 + 5x - 1}{2x^2 - 7}$`,
    answers: [
      { id: '1', text: '$+\\infty$', isCorrect: false, explanation: 'Non. Les degrés sont identiques (degré 2), la limite est finie.' },
      { id: '2', text: '$\\dfrac{3}{2}$', isCorrect: true, explanation: '✓ En $\\pm\\infty$, la limite d\'une fraction rationnelle est égale à la limite du rapport de ses termes de plus haut degré : $\\lim \\frac{3x^2}{2x^2} = \\frac{3}{2}$.' },
      { id: '3', text: '$0$', isCorrect: false, explanation: 'Non, ce serait 0 seulement si le dénominateur avait un degré strictement supérieur.' },
      { id: '4', text: '$3$', isCorrect: false, explanation: 'Attention à ne pas oublier le coefficient 2 du dénominateur : $\\frac{3}{2}$.' },
    ],
  },
  {
    id: 'q4',
    difficulty: 2,
    question: `Pour lever l'indétermination de $\\displaystyle\\lim_{x \\to +\\infty} (\\sqrt{x+4} - \\sqrt{x})$, le réflexe Bac officiel est :`,
    answers: [
      { id: '1', text: 'Factoriser par $x^2$', isCorrect: false, explanation: 'Non, la factorisation directe donne encore une forme indéterminée $\\infty \\times (1 - 1) = \\infty \\times 0$.' },
      { id: '2', text: 'Multiplier et diviser par l\'expression conjuguée', isCorrect: true, explanation: '✓ Exact ! En multipliant par $\\sqrt{x+4} + \\sqrt{x}$, le numérateur devient $(x+4)-x = 4$, et le quotient $\\frac{4}{\\sqrt{x+4}+\\sqrt{x}}$ tend immédiatement vers 0.' },
      { id: '3', text: 'Appliquer le théorème des gendarmes', isCorrect: false, explanation: 'Le théorème des gendarmes est réservé aux fonctions oscillantes comme le sinus ou cosinus.' },
      { id: '4', text: 'Dériver la fonction', isCorrect: false, explanation: 'Le nombre dérivé sert pour les limites en un point fini $x_0$, pas en $+\\infty$.' },
    ],
  },
  {
    id: 'q5',
    difficulty: 2,
    question: `Si pour tout $x > 0$, on a $-\\dfrac{1}{x} \\le f(x) \\le \\dfrac{1}{x}$, quelle est $\\displaystyle\\lim_{x \\to +\\infty} f(x)$ ?`,
    answers: [
      { id: '1', text: '$0$', isCorrect: true, explanation: '✓ D\'après le **Théorème des Gendarmes** : puisque $\\lim -\\frac{1}{x} = 0$ et $\\lim \\frac{1}{x} = 0$, la fonction encadrée $f(x)$ converge obligatoirement vers 0.' },
      { id: '2', text: '$1$', isCorrect: false, explanation: 'Non. Les deux bornes convergent vers 0, pas vers 1.' },
      { id: '3', text: 'La limite n\'existe pas', isCorrect: false, explanation: 'Elle existe assurément grâce au théorème d\'encadrement.' },
      { id: '4', text: '$+\\infty$', isCorrect: false, explanation: 'Non, $f(x)$ est piégée autour de 0.' },
    ],
  },
  {
    id: 'q6',
    difficulty: 2,
    question: `Calculer la limite fondamentale de l'exponentielle : $\\displaystyle\\lim_{x \\to 0} \\frac{e^x - 1}{x}$`,
    answers: [
      { id: '1', text: '$0$', isCorrect: false, explanation: 'Non. En $x=0$, $e^0 - 1 = 0$, c\'est une forme $\\frac{0}{0}$. La vraie limite vaut 1.' },
      { id: '2', text: '$1$', isCorrect: true, explanation: '✓ C\'est le taux d\'accroissement de la fonction exponentielle en 0 : $\\lim_{x \\to 0} \\frac{e^x - e^0}{x - 0} = (e^x)\'|_{x=0} = e^0 = 1$.' },
      { id: '3', text: '$e$', isCorrect: false, explanation: 'Non, $e^1 = e$, mais le nombre dérivé en 0 vaut $e^0 = 1$.' },
      { id: '4', text: '$+\\infty$', isCorrect: false, explanation: 'Non, la limite est finie.' },
    ],
  },
  {
    id: 'q7',
    difficulty: 2,
    question: `Quelle est la valeur de $\\displaystyle\\lim_{x \\to 0^+} x \\ln(x)$ (croissance comparée) ?`,
    answers: [
      { id: '1', text: '$-\\infty$', isCorrect: false, explanation: 'Bien que $\\ln(x) \\to -\\infty$, la puissance $x$ l\'emporte toujours sur le logarithme en 0.' },
      { id: '2', text: '$0$', isCorrect: true, explanation: '✓ Règle de croissance comparée fondamentale du Bac S2 : les puissances de $x$ l\'emportent sur le logarithme, donc $\\lim_{x \\to 0^+} x^n \\ln(x) = 0$.' },
      { id: '3', text: '$1$', isCorrect: false, explanation: 'Non. Le produit tend vers 0.' },
      { id: '4', text: 'Indéterminée non calculable', isCorrect: false, explanation: 'C\'est une forme $0 \\times (-\\infty)$, mais le théorème des croissances comparées donne 0.' },
    ],
  },
  {
    id: 'q8',
    difficulty: 3,
    question: `Soit $f(x) = \\dfrac{x^2 - 9}{x - 3}$ pour $x \\ne 3$. Déterminer $\\displaystyle\\lim_{x \\to 3} f(x)$.`,
    answers: [
      { id: '1', text: '$6$', isCorrect: true, explanation: '✓ On factorise : $\\frac{x^2-9}{x-3} = \\frac{(x-3)(x+3)}{x-3} = x+3$ pour $x \\ne 3$. Donc $\\lim_{x \\to 3} (x+3) = 6$.' },
      { id: '2', text: '$0$', isCorrect: false, explanation: 'Non, en remplaçant directement on a $\\frac{0}{0}$ qu\'il faut lever par factorisation.' },
      { id: '3', text: '$3$', isCorrect: false, explanation: 'Non, $x+3$ en 3 donne $3+3 = 6$.' },
      { id: '4', text: 'N\'existe pas car $f(3)$ n\'est pas défini', isCorrect: false, explanation: 'Une fonction peut ne pas être définie en $x_0$ tout en admettant une limite finie en ce point !' },
    ],
  },
  {
    id: 'q9',
    difficulty: 3,
    question: `Pour appliquer le corollaire du TVI et prouver qu'une équation $f(x) = 0$ admet une **unique** solution sur $[a, b]$, il faut :`,
    answers: [
      { id: '1', text: '$f$ continue uniquement et $f(a) \\times f(b) < 0$', isCorrect: false, explanation: 'La continuité seule prouve qu\'il existe *au moins une* solution, mais pas qu\'elle est *unique*.' },
      { id: '2', text: '$f$ continue ET strictement monotone sur $[a,b]$, et $0 \\in f([a,b])$', isCorrect: true, explanation: '✓ Les 3 conditions indissociables : continuité (existence), stricte monotonie (unicité), et changement de signe (présence de 0 dans l\'intervalle image).' },
      { id: '3', text: '$f\'(x) = 0$ sur $[a,b]$', isCorrect: false, explanation: 'Si la dérivée est nulle, la fonction est constante et n\'est pas strictement monotone.' },
      { id: '4', text: 'Que $f$ soit un polynôme', isCorrect: false, explanation: 'Le TVI s\'applique à toute fonction continue, pas seulement aux polynômes.' },
    ],
  },
  {
    id: 'q10',
    difficulty: 3,
    question: `Attention au piège de signe : calculer $\\displaystyle\\lim_{x \\to -\\infty} \\frac{\\sqrt{x^2 + 1}}{x}$`,
    answers: [
      { id: '1', text: '$1$', isCorrect: false, explanation: 'Piège classique du Bac S2 ! Pour $x < 0$, $\\sqrt{x^2} = |x| = -x$. Donc le rapport vaut $-1$ !' },
      { id: '2', text: '$-1$', isCorrect: true, explanation: '✓ Bravo ! Quand $x \\to -\\infty$, $x$ est négatif, donc $\\sqrt{x^2} = |x| = -x$. Ainsi : $\\frac{\\sqrt{x^2(1+1/x^2)}}{x} = \\frac{-x\\sqrt{1+1/x^2}}{x} = -1$.' },
      { id: '3', text: '$0$', isCorrect: false, explanation: 'Non, les puissances de $x$ ont le même degré 1.' },
      { id: '4', text: '$-\\infty$', isCorrect: false, explanation: 'Non, la limite est finie et égale à $-1$.' },
    ],
  },
  {
    id: 'q11',
    difficulty: 2,
    question: `La droite d'équation $y = ax + b$ est asymptote oblique à $(\\mathcal{C}_f)$ en $+\\infty$ si et seulement si :`,
    answers: [
      { id: '1', text: '$\\displaystyle\\lim_{x \\to +\\infty} f(x) = +\\infty$', isCorrect: false, explanation: 'C\'est une condition nécessaire pour une branche infinie, mais pas suffisante pour une asymptote.' },
      { id: '2', text: '$\\displaystyle\\lim_{x \\to +\\infty} [f(x) - (ax + b)] = 0$', isCorrect: true, explanation: '✓ Définition rigoureuse exigée au Bac : l\'écart vertical entre la courbe et la droite doit tendre vers 0 à l\'infini.' },
      { id: '3', text: '$\\displaystyle\\lim_{x \\to +\\infty} \\frac{f(x)}{x} = 0$', isCorrect: false, explanation: 'Si le rapport tend vers 0, c\'est une branche parabolique de direction $(Ox)$.' },
      { id: '4', text: '$f\'(x) = a$ pour tout $x$', isCorrect: false, explanation: 'Ce serait le cas uniquement si $f$ était elle-même une droite affine.' },
    ],
  },
  {
    id: 'q12',
    difficulty: 3,
    question: `Soit $f(x) = \\begin{cases} mx + 2 & \\text{si } x \\le 1 \\\\ 4x - 1 & \\text{si } x > 1 \\end{cases}$. Pour quelle valeur de $m$ la fonction est-elle continue en $x = 1$ ?`,
    answers: [
      { id: '1', text: '$m = 1$', isCorrect: true, explanation: '✓ Continuité en 1 : $\\lim_{x \\to 1^-} f(x) = m(1) + 2 = m+2$ et $\\lim_{x \\to 1^+} f(x) = 4(1)-1 = 3$. Donc $m + 2 = 3 \\implies m = 1$.' },
      { id: '2', text: '$m = 3$', isCorrect: false, explanation: 'Si $m=3$, $3+2=5 \\ne 3$, donc la fonction présenterait un saut (discontinuité).' },
      { id: '3', text: '$m = -1$', isCorrect: false, explanation: 'Non, $-1 + 2 = 1 \\ne 3$.' },
      { id: '4', text: '$m = 0$', isCorrect: false, explanation: 'Non, $0 + 2 = 2 \\ne 3$.' },
    ],
  },
];

/* ============================================================
   UTILITAIRES DE MÉLANGE ALÉATOIRE (Fisher-Yates Shuffle)
   ============================================================ */
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
  const shuffledQuestions = shuffleArray(QUESTION_BANK).slice(0, count);

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
    label: 'Type Bac S2',
    badgeClass: 'bg-rose-50 text-rose-800 border-rose-300',
    iconName: 'niveau_difficile',
  },
};

/* ============================================================
   COMPOSANT PRINCIPAL
   ============================================================ */
export default function LimitesQuizEmbedded() {
  const [questions, setQuestions] = useState<ProcessedQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);
  const [history, setHistory] = useState<Record<string, { chosen: string; isCorrect: boolean }>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setQuestions(buildRandomSession(8));
    setIsMounted(true);
  }, []);

  const total = questions.length;
  const currentQ = questions[currentIdx];
  const diff = currentQ ? DIFFICULTY_CONFIG[currentQ.difficulty] : null;

  const handleSelect = useCallback(
    (letter: string) => {
      if (isRevealed) return;
      setSelectedLetter(letter);
    },
    [isRevealed]
  );

  const handleValidate = useCallback(() => {
    if (!selectedLetter || isRevealed || !currentQ) return;
    const chosenAnswer = currentQ.answers.find((a) => a.letter === selectedLetter);
    const correct = Boolean(chosenAnswer?.isCorrect);

    if (correct) {
      setScore((s) => s + 1);
      setStreak((prev) => {
        const next = prev + 1;
        if (next > maxStreak) setMaxStreak(next);
        return next;
      });
    } else {
      setStreak(0);
    }

    setHistory((prev) => ({
      ...prev,
      [currentQ.id]: { chosen: selectedLetter, isCorrect: correct },
    }));

    setIsRevealed(true);
  }, [selectedLetter, isRevealed, currentQ, maxStreak]);

  const handleNext = useCallback(() => {
    if (currentIdx < total - 1) {
      setCurrentIdx((i) => i + 1);
      setSelectedLetter(null);
      setIsRevealed(false);
    } else {
      setIsFinished(true);
    }
  }, [currentIdx, total]);

  const handleRestart = useCallback(() => {
    setQuestions(buildRandomSession(8));
    setCurrentIdx(0);
    setSelectedLetter(null);
    setIsRevealed(false);
    setScore(0);
    setStreak(0);
    setMaxStreak(0);
    setHistory({});
    setIsFinished(false);
  }, []);

  if (!isMounted || !currentQ) {
    return (
      <div className="my-8 rounded-2xl border border-navy/10 bg-white p-5 text-center text-navy/60 animate-pulse flex items-center justify-center gap-2">
        <StudyIcon name="de_tirage" size={20} />
        <span className="text-xs font-semibold">Tirage aléatoire en cours...</span>
      </div>
    );
  }

  const selectedAnswerObj = currentQ.answers.find((a) => a.letter === selectedLetter);
  const correctAnswerObj = currentQ.answers.find((a) => a.isCorrect);
  const isAnswerCorrect = isRevealed && Boolean(selectedAnswerObj?.isCorrect);

  const scorePercent = Math.round((score / total) * 100);
  let feedback = {
    icon: 'diplome_bac' as StudyIconName,
    title: 'Excellente maîtrise !',
    msg: 'Félicitations de la part d\'Al Muxtaar Société. Vous avez les réflexes requis pour décrocher la mention au Bac S2 !',
    colorClass: 'text-emerald-700 bg-emerald-50 border-emerald-300',
  };
  if (scorePercent < 50) {
    feedback = {
      icon: 'avertissement' as StudyIconName,
      title: 'Entraînement nécessaire',
      msg: 'Révisez les fiches réflexes ci-dessus (quantité conjuguée, formes indéterminées) et relancez une série de questions.',
      colorClass: 'text-rose-700 bg-rose-50 border-rose-300',
    };
  } else if (scorePercent < 80) {
    feedback = {
      icon: 'etoile_favori' as StudyIconName,
      title: 'Bon niveau d\'ensemble',
      msg: 'De très bons réflexes ! Corrigez les petits pièges de signe pour viser le 20/20 au Bac.',
      colorClass: 'text-amber-800 bg-amber-50 border-amber-300',
    };
  }

  const progressPercent = Math.round(((currentIdx + (isRevealed ? 1 : 0)) / total) * 100);

  return (
    <section className="my-8 space-y-3.5">
      {/* ============================================================
          NOUVEAU BANDEAU ERGONOMIQUE MOBILE & DESKTOP (HUD MODERNE)
          ============================================================ */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#0c1c2b] via-[#143048] to-[#0B6477] text-white shadow-md border border-white/10">
        {/* Cercles décoratifs d'ambiance */}
        <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-turquoise/15 blur-2xl pointer-events-none" />
        <div className="absolute -left-6 -bottom-6 h-28 w-28 rounded-full bg-emerald-500/10 blur-xl pointer-events-none" />

        <div className="p-4 sm:p-5 space-y-3.5 relative z-10">
          {/* Ligne 1 : Tags statut & Action rejouer */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-bold text-emerald-300 border border-white/15">
                <StudyIcon name="de_tirage" size={14} />
                <span>Tirage Aléatoire</span>
              </span>

              {streak >= 2 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-400/20 px-2 py-0.5 text-[11px] font-black text-amber-300 border border-amber-400/30 animate-pulse">
                  <StudyIcon name="flamme_serie" size={13} />
                  <span>{streak} d&apos;affilée !</span>
                </span>
              )}
            </div>

            {/* Bouton Nouveau Tirage ultra-compact sur mobile */}
            <button
              type="button"
              onClick={handleRestart}
              title="Générer une nouvelle série aléatoire"
              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-white/80 hover:text-white bg-white/10 hover:bg-white/15 active:scale-95 px-2.5 py-1 rounded-xl transition-all border border-white/10 shrink-0"
            >
              <StudyIcon name="recommencer" size={14} />
              <span className="hidden xs:inline sm:inline">Nouveau tirage</span>
            </button>
          </div>

          {/* Ligne 2 : Titre principal sobre et équilibré */}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center shrink-0 shadow-inner">
              <StudyIcon name="cible_reflexe" size={22} />
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-base sm:text-lg font-black tracking-tight text-white leading-tight truncate">
                Quiz : Limites &amp; Continuité
              </h2>
              <p className="text-[11px] sm:text-xs text-white/70 truncate">
                Terminale S2 · Épreuves &amp; Réflexes Officiels
              </p>
            </div>
          </div>

          {/* Ligne 3 : Barres d'infos / HUD équilibré (3 colonnes mobiles) */}
          <div className="grid grid-cols-3 gap-2 pt-1 text-center">
            {/* Case 1 : Progression */}
            <div className="rounded-xl bg-white/10 p-2 border border-white/10 backdrop-blur-sm">
              <span className="block text-[10px] font-bold uppercase text-white/60 tracking-wider">
                Question
              </span>
              <span className="text-xs sm:text-sm font-black text-white">
                {currentIdx + 1} <span className="text-[11px] text-white/50 font-normal">/ {total}</span>
              </span>
            </div>

            {/* Case 2 : Score en direct */}
            <div className="rounded-xl bg-white/10 p-2 border border-white/10 backdrop-blur-sm">
              <span className="block text-[10px] font-bold uppercase text-turquoise tracking-wider">
                Score
              </span>
              <span className="text-xs sm:text-sm font-black text-emerald-300">
                {score} <span className="text-[11px] text-white/50 font-normal">pts</span>
              </span>
            </div>

            {/* Case 3 : Niveau difficulté de la question active */}
            <div className="rounded-xl bg-white/10 p-2 border border-white/10 backdrop-blur-sm flex flex-col justify-center items-center">
              <span className="block text-[10px] font-bold uppercase text-white/60 tracking-wider">
                Niveau
              </span>
              <div className="flex items-center justify-center gap-1 mt-0.5">
                {diff && <StudyIcon name={diff.iconName} size={13} />}
                <span className="text-[11px] font-bold text-white truncate max-w-[70px]">
                  {diff?.label}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Barre de progression fluide intégrée au bas de la carte (edge-to-edge) */}
        <div className="w-full bg-black/40 h-1.5 sm:h-2">
          <div
            className="h-full bg-gradient-to-r from-turquoise via-emerald-400 to-emerald-300 transition-all duration-500 ease-out shadow-sm"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* ============================================================
          CORPS DU QUIZ : CARTE DE QUESTION OU RÉSULTATS
          ============================================================ */}
      {isFinished ? (
        /* ÉCRAN DE RÉSULTATS FINAUX */
        <div className="rounded-2xl sm:rounded-3xl border border-navy/15 bg-white p-5 sm:p-7 shadow-sm text-center space-y-5 animate-in fade-in duration-300">
          <div className="flex justify-center">
            <StudyIcon name={feedback.icon} size={64} className="animate-bounce" />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-navy">{feedback.title}</h3>
            <p className="text-xs sm:text-sm text-navy/70 max-w-md mx-auto leading-relaxed">
              {feedback.msg}
            </p>
          </div>

          {/* Badge de Score en grand */}
          <div className={`max-w-xs mx-auto p-3.5 sm:p-4 rounded-2xl border-2 ${feedback.colorClass} space-y-0.5`}>
            <div className="text-3xl sm:text-4xl font-black leading-tight">
              {score} / {total}
            </div>
            <div className="text-xs sm:text-sm font-bold uppercase tracking-wider">
              {scorePercent}% de réussite
            </div>
            {maxStreak >= 2 && (
              <div className="text-[11px] font-semibold pt-1 opacity-80 flex items-center justify-center gap-1">
                <StudyIcon name="flamme_serie" size={13} />
                <span>Meilleure série : {maxStreak} questions consécutives</span>
              </div>
            )}
          </div>

          {/* Liste récapitulative des questions du tirage */}
          <div className="text-left space-y-2 border-t border-navy/10 pt-4">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-navy/60 mb-2">
              Bilan du tirage :
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {questions.map((q, idx) => {
                const hist = history[q.id];
                const ok = hist?.isCorrect;
                return (
                  <div
                    key={q.id}
                    className={`flex items-center justify-between p-2 rounded-xl border text-xs font-semibold ${
                      ok
                        ? 'bg-emerald-50/70 border-emerald-300 text-emerald-950'
                        : 'bg-rose-50/70 border-rose-300 text-rose-950'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate pr-2">
                      <StudyIcon
                        name={ok ? 'correct' : 'incorrect'}
                        size={16}
                        className="shrink-0"
                      />
                      <span className="truncate text-[11px]">
                        Q{idx + 1} : {q.question.replace(/\*\*/g, '').slice(0, 32)}...
                      </span>
                    </div>
                    <span className="text-[10px] opacity-75 shrink-0 flex items-center gap-1">
                      <StudyIcon name={DIFFICULTY_CONFIG[q.difficulty].iconName} size={11} />
                      <span>{DIFFICULTY_CONFIG[q.difficulty].label}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bouton pour relancer un tirage 100% aléatoire */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleRestart}
              className="w-full sm:w-auto px-6 py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-navy to-[#0B6477] text-white font-black text-xs sm:text-sm shadow-md hover:brightness-110 active:scale-95 transition-all inline-flex items-center justify-center gap-2"
            >
              <StudyIcon name="de_tirage" size={18} />
              <span>Générer un Nouveau Tirage Aléatoire</span>
            </button>
          </div>
        </div>
      ) : (
        /* CARTE DE QUESTION ACTIVE */
        <div className="rounded-2xl sm:rounded-3xl border border-navy/15 bg-white shadow-sm overflow-hidden transition-all">
          {/* Énoncé de la question avec KaTeX */}
          <div className="p-4 sm:p-5 bg-surface/30 border-b border-navy/5">
            <div className="text-sm sm:text-base font-bold text-navy leading-relaxed">
              <MathRenderer content={currentQ.question} />
            </div>
          </div>

          {/* Options de réponse en boutons tactiles */}
          <div className="p-4 sm:p-5 space-y-2.5">
            <div className="grid grid-cols-1 gap-2.5">
              {currentQ.answers.map((ans) => {
                const isSelected = selectedLetter === ans.letter;

                let cardStyle =
                  'border-navy/15 bg-white hover:border-[#0B6477] hover:bg-[#0B6477]/5 text-navy';
                let badgeStyle = 'border-navy/20 bg-surface text-navy/70';

                if (isRevealed) {
                  if (ans.isCorrect) {
                    cardStyle =
                      'border-emerald-500 bg-emerald-50/90 text-emerald-950 shadow-sm ring-1 ring-emerald-400/20';
                    badgeStyle = 'bg-emerald-500 border-emerald-500 text-white';
                  } else if (isSelected && !ans.isCorrect) {
                    cardStyle = 'border-rose-400 bg-rose-50/90 text-rose-950 shadow-sm';
                    badgeStyle = 'bg-rose-500 border-rose-500 text-white';
                  } else {
                    cardStyle = 'border-navy/10 bg-white opacity-40 text-navy/50';
                    badgeStyle = 'border-navy/10 bg-surface/50 text-navy/30';
                  }
                } else if (isSelected) {
                  cardStyle =
                    'border-[#0B6477] bg-[#0B6477]/10 text-navy shadow-sm ring-1 ring-[#0B6477]/30';
                  badgeStyle = 'bg-[#0B6477] border-[#0B6477] text-white';
                }

                return (
                  <button
                    key={ans.letter}
                    type="button"
                    onClick={() => handleSelect(ans.letter)}
                    disabled={isRevealed}
                    className={`w-full text-left rounded-xl sm:rounded-2xl border-2 p-3 sm:p-3.5 transition-all duration-150 flex items-start gap-3 ${cardStyle} ${
                      !isRevealed ? 'cursor-pointer active:scale-[0.99]' : 'cursor-default'
                    }`}
                  >
                    {/* Badge Lettre A, B, C, D ou Icône SVG */}
                    {isRevealed && ans.isCorrect ? (
                      <StudyIcon name="correct" size={22} className="shrink-0 mt-0.5" />
                    ) : isRevealed && isSelected && !ans.isCorrect ? (
                      <StudyIcon name="incorrect" size={22} className="shrink-0 mt-0.5" />
                    ) : (
                      <span
                        className={`shrink-0 w-6 h-6 rounded-lg border flex items-center justify-center text-xs font-black transition-colors ${badgeStyle}`}
                      >
                        {ans.letter}
                      </span>
                    )}

                    {/* Texte de l'option (avec support KaTeX) */}
                    <div className="flex-1 text-xs sm:text-sm font-medium leading-relaxed pt-0.5">
                      <MathRenderer content={ans.text} />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Cadre d'explication pédagogique post-validation */}
            {isRevealed && (
              <div
                className={`mt-3.5 rounded-xl sm:rounded-2xl p-3.5 sm:p-4 border space-y-2 animate-in fade-in-50 duration-200 ${
                  isAnswerCorrect
                    ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                    : 'bg-rose-50/90 border-rose-300 text-rose-950'
                }`}
              >
                <div className="flex items-center gap-2 font-black text-xs uppercase tracking-wider">
                  <StudyIcon
                    name={isAnswerCorrect ? 'correct' : 'ampoule_astuce'}
                    size={16}
                  />
                  <span>
                    {isAnswerCorrect
                      ? 'Bien vu ! Explication :'
                      : 'Rappel Méthode Bac S2 :'}
                  </span>
                </div>

                {!isAnswerCorrect && selectedAnswerObj && (
                  <div className="rounded-lg bg-white/70 p-2.5 text-xs leading-relaxed border border-rose-200">
                    <strong className="text-rose-900 block font-bold mb-0.5 flex items-center gap-1 text-[11px]">
                      <StudyIcon name="incorrect" size={12} />
                      <span>Votre choix ({selectedLetter}) :</span>
                    </strong>
                    <MathRenderer content={selectedAnswerObj.explanation} />
                  </div>
                )}

                {correctAnswerObj && (
                  <div className="rounded-lg bg-white/70 p-2.5 text-xs leading-relaxed border border-emerald-200">
                    <strong className="text-emerald-900 block font-bold mb-0.5 flex items-center gap-1 text-[11px]">
                      <StudyIcon name="cle_solution" size={12} />
                      <span>Bonne réponse ({correctAnswerObj.letter}) :</span>
                    </strong>
                    <MathRenderer content={correctAnswerObj.explanation} />
                  </div>
                )}
              </div>
            )}

            {/* Boutons d'action (Valider ou Suivant) */}
            <div className="pt-2 flex gap-2">
              {!isRevealed ? (
                <button
                  type="button"
                  onClick={handleValidate}
                  disabled={!selectedLetter}
                  className={`flex-1 py-3 px-5 rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm tracking-wide transition-all shadow-sm flex items-center justify-center gap-2 ${
                    selectedLetter
                      ? 'bg-gradient-to-r from-navy to-[#0B6477] text-white hover:brightness-110 active:scale-[0.98]'
                      : 'bg-navy/10 text-navy/30 cursor-not-allowed shadow-none'
                  }`}
                >
                  <StudyIcon name="cible_reflexe" size={16} />
                  <span>Valider</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 py-3 px-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-[#0B6477] to-emerald-600 text-white font-black text-xs sm:text-sm tracking-wide shadow-sm hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
                >
                  <span>
                    {currentIdx < total - 1 ? 'Question Suivante' : 'Voir le Bilan'}
                  </span>
                  <StudyIcon name="suivant" size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
