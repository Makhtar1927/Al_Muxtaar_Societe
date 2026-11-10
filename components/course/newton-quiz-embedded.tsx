'use client';

import React, { useState } from 'react';
import MathRenderer from '@/components/course/math-renderer';
import { CheckCircle, XCircle, Star, Lightbulb, Trophy, RotateCcw } from 'lucide-react';

interface QuizQuestion {
  id: number;
  stars: number;
  points: number;
  question: string;
  answers: string[];
  correctIndex: number;
  explanation: string;
  wolof?: string;
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    stars: 1,
    points: 1,
    question:
      "D'après la première loi de Newton (Principe d'Inertie), si la résultante des forces extérieures appliquées à un solide est nulle ($\\sum \\vec{F}_{\\text{ext}} = \\vec{0}$) dans un référentiel galiléen, que peut-on affirmer sur le mouvement de son centre d'inertie $G$ ?",
    answers: [
      "Le centre d'inertie $G$ est soit au repos, soit en Mouvement Rectiligne Uniforme ($\\vec{v}_G = \\vec{\\text{cte}}$)",
      "Le solide est obligatoirement et définitivement immobile",
      "Le solide est en Mouvement Circulaire Uniforme",
      "Le solide possède une accélération constante non nulle",
    ],
    correctIndex: 0,
    explanation:
      "La première loi de Newton stipule que dans un référentiel galiléen, tout corps persévère dans son état de repos ou de mouvement rectiligne et uniforme tant que la somme vectorielle des forces qui s'exercent sur lui est nulle : $\\sum \\vec{F}_{\\text{ext}} = \\vec{0} \\iff \\vec{v}_G = \\vec{\\text{cte}}$.",
    wolof:
      "« 1ère loi bu Newton dafay wax ne : bu somme des forces bi tolloo ak zéro ($\\sum \\vec{F} = \\vec{0}$), solide bi dafay taxaw walla mu di daw ci yoon bu jub te tegu (MRU) ! Du soppi vitesse mukk ! »",
  },
  {
    id: 2,
    stars: 1,
    points: 1,
    question:
      "En utilisant la deuxième loi de Newton $\\vec{F} = m\\,\\vec{a}$, quelle est l'expression d'un Newton ($1\\text{ N}$) en unités de base du Système International (SI) ?",
    answers: [
      "$1\\text{ N} = 1\\text{ kg}\\cdot\\text{m}\\cdot\\text{s}^{-2}$",
      "$1\\text{ N} = 1\\text{ kg}\\cdot\\text{m}\\cdot\\text{s}^{-1}$",
      "$1\\text{ N} = 1\\text{ kg}\\cdot\\text{m}^2\\cdot\\text{s}^{-2}$",
      "$1\\text{ N} = 1\\text{ g}\\cdot\\text{cm}\\cdot\\text{s}^{-2}$",
    ],
    correctIndex: 0,
    explanation:
      "D'après la relation fondamentale de la dynamique $\\vec{F} = m\\,\\vec{a}$, la dimension de la force est $[F] = [M]\\,[L]\\,[T]^{-2}$. L'unité du Newton en unités SI de base est donc : $1\\text{ N} = 1\\text{ kg} \\times 1\\text{ m}\\cdot\\text{s}^{-2} = 1\\text{ kg}\\cdot\\text{m}\\cdot\\text{s}^{-2}$.",
    wolof:
      "« Formule bi $F = m\\,a$ la : masse $m$ en kg la, accélération $a$ en $\\text{m}\\cdot\\text{s}^{-2}$ la. Kon $1\\text{ Newton} = 1\\text{ kg}\\cdot\\text{m}\\cdot\\text{s}^{-2}$ ! »",
  },
  {
    id: 3,
    stars: 2,
    points: 2,
    question:
      "Un solide de masse $m = 500\\text{ g}$ descend sans frottement un plan incliné d'un angle $\\alpha = 30^\\circ$ avec l'horizontale. En prenant $g = 9{,}8\\text{ m}\\cdot\\text{s}^{-2}$, quelle est la valeur de son accélération $a$ ?",
    answers: [
      "$a = g\\,\\sin\\alpha = 4{,}90\\text{ m}\\cdot\\text{s}^{-2}$ (indépendante de la masse $m$)",
      "$a = g\\,\\cos\\alpha = 8{,}49\\text{ m}\\cdot\\text{s}^{-2}$",
      "$a = m\\,g\\,\\sin\\alpha = 2{,}45\\text{ m}\\cdot\\text{s}^{-2}$",
      "$a = 9{,}80\\text{ m}\\cdot\\text{s}^{-2}$",
    ],
    correctIndex: 0,
    explanation:
      "Par projection du TCI sur l'axe $(Ox)$ orienté vers le bas de la pente : $P_x = m\\,a \\implies m\\,g\\,\\sin\\alpha = m\\,a \\implies a = g\\,\\sin\\alpha$. L'accélération ne dépend absolument pas de la masse $m$ ! Numériquement : $a = 9{,}8 \\times \\sin(30^\\circ) = 9{,}8 \\times 0{,}5 = 4{,}90\\text{ m}\\cdot\\text{s}^{-2}$.",
    wolof:
      "« Ci plan incliné sans frottement, masse bi dafay dindi boppam : $a = g\\,\\sin\\alpha = 9{,}8 \\times 0{,}5 = 4{,}9\\text{ m}\\cdot\\text{s}^{-2}$ ! Camion ak boussol benn vitesse lañuy wàcce ! »",
  },
  {
    id: 4,
    stars: 2,
    points: 2,
    question:
      "Pour le même solide de masse $m = 0{,}50\\text{ kg}$ sur ce plan incliné à $\\alpha = 30^\\circ$ ($g = 9{,}8\\text{ m}\\cdot\\text{s}^{-2}$), que vaut la norme de la réaction normale $R_N$ exercée par le support ?",
    answers: [
      "$R_N = m\\,g\\,\\cos\\alpha \\approx 4{,}24\\text{ N}$",
      "$R_N = m\\,g = 4{,}90\\text{ N}$",
      "$R_N = m\\,g\\,\\sin\\alpha = 2{,}45\\text{ N}$",
      "$R_N = m\\,g\\,\\tan\\alpha \\approx 2{,}83\\text{ N}$",
    ],
    correctIndex: 0,
    explanation:
      "Sur l'axe $(Oy)$ perpendiculaire à la pente, il n'y a aucun mouvement ($a_y = 0$). La projection de la 2ème loi donne : $R_N - P_y = 0 \\implies R_N = m\\,g\\,\\cos\\alpha$. Numériquement : $R_N = 0{,}50 \\times 9{,}8 \\times \\cos(30^\\circ) = 4{,}9 \\times \\frac{\\sqrt{3}}{2} \\approx 4{,}24\\text{ N}$.",
    wolof:
      "« Axe $y$ bi amul yëngu-yëngu, motax $R_N = P_y = m\\,g\\,\\cos\\alpha = 0{,}5 \\times 9{,}8 \\times \\cos(30^\\circ) \\approx 4{,}24\\text{ N}$ ! »",
  },
  {
    id: 5,
    stars: 3,
    points: 3,
    question:
      "Le plan incliné présente désormais des frottements solides caractérisés par un coefficient dynamique $\\mu = 0{,}20$. L'angle est toujours $\\alpha = 30^\\circ$ et $g = 9{,}8\\text{ m}\\cdot\\text{s}^{-2}$. Que vaut l'accélération $a$ du mobile en descente ?",
    answers: [
      "$a = g\\,(\\sin\\alpha - \\mu\\,\\cos\\alpha) \\approx 3{,}20\\text{ m}\\cdot\\text{s}^{-2}$",
      "$a = g\\,(\\sin\\alpha + \\mu\\,\\cos\\alpha) \\approx 6{,}60\\text{ m}\\cdot\\text{s}^{-2}$",
      "$a = g\\,\\sin\\alpha - \\mu = 4{,}70\\text{ m}\\cdot\\text{s}^{-2}$",
      "$a = 0\\text{ m}\\cdot\\text{s}^{-2}$ car le solide est bloqué",
    ],
    correctIndex: 0,
    explanation:
      "La force de frottement vaut $f = \\mu\\,R_N = \\mu\\,m\\,g\\,\\cos\\alpha$. Sur l'axe $(Ox)$ orienté vers le bas : $P_x - f = m\\,a \\implies m\\,g\\,\\sin\\alpha - \\mu\\,m\\,g\\,\\cos\\alpha = m\\,a \\implies a = g\\,(\\sin\\alpha - \\mu\\,\\cos\\alpha)$. Numériquement : $a = 9{,}8\\,(0{,}50 - 0{,}20 \\times 0{,}866) = 9{,}8 \\times (0{,}50 - 0{,}1732) = 9{,}8 \\times 0{,}3268 \\approx 3{,}20\\text{ m}\\cdot\\text{s}^{-2}$.",
    wolof:
      "« Frottement bi dafay wàññi accélération bi : $a = g\\,(\\sin\\alpha - \\mu\\,\\cos\\alpha) = 9{,}8 \\times (0{,}5 - 0{,}2 \\times 0{,}866) \\approx 3{,}20\\text{ m}\\cdot\\text{s}^{-2}$ ! »",
  },
  {
    id: 6,
    stars: 2,
    points: 2,
    question:
      "Un bloc est posé sans vitesse initiale sur un plan incliné rugueux de coefficient de frottement statique $\\mu$. À quelle condition géométrique sur l'angle $\\alpha$ le bloc reste-t-il IMMOBILE (pas de glissement) ?",
    answers: [
      "$\\tan\\alpha \\le \\mu$",
      "$\\tan\\alpha > \\mu$",
      "$\\sin\\alpha \\ge \\mu$",
      "$\\cos\\alpha \\le \\mu$",
    ],
    correctIndex: 0,
    explanation:
      "Le solide reste au repos tant que la composante motrice du poids ne dépasse pas la force d'adhérence maximale : $P_x \\le f_{\\text{max}} \\implies m\\,g\\,\\sin\\alpha \\le \\mu\\,m\\,g\\,\\cos\\alpha \\implies \\frac{\\sin\\alpha}{\\cos\\alpha} \\le \\mu \\implies \\tan\\alpha \\le \\mu$.",
    wolof:
      "« Solide bi du yëngu tant que pente bi dafa féewul lool : $\\tan\\alpha \\le \\mu$ ! Bu $\\tan\\alpha > \\mu$ dafay rëcc wàcc ci suuf ! »",
  },
  {
    id: 7,
    stars: 2,
    points: 2,
    question:
      "Le Train Express Régional (TER) Dakar-Diamniadio de masse $M = 150\\text{ tonnes}$ roule à la vitesse constante de $144\\text{ km}\\cdot\\text{h}^{-1}$ sur une voie rectiligne et horizontale. La force de traction motrice développée par les moteurs est $F_m = 30\\text{ kN}$. Que vaut la résultante des forces de frottement et de résistance de l'air $\\vec{f}$ ?",
    answers: [
      "$\\|\\vec{f}\\| = 30\\text{ kN}$ (exactement opposée à $\\vec{F}_m$)",
      "$\\|\\vec{f}\\| = 0\\text{ kN}$ car le mouvement est parfait",
      "$\\|\\vec{f}\\| = 150\\text{ kN}$",
      "$\\|\\vec{f}\\| = 450\\text{ kN}$",
    ],
    correctIndex: 0,
    explanation:
      "Puisque le TER roule à vitesse CONSTANTE sur ligne droite, son mouvement est un MRU : l'accélération est rigoureusement nulle ($a = 0$). D'après la 1ère loi de Newton (Principe d'Inertie) : $\\sum \\vec{F}_{\\text{ext}} = \\vec{0} \\implies \\vec{F}_m + \\vec{f} = \\vec{0} \\implies \\|\\vec{f}\\| = \\|\\vec{F}_m\\| = 30\\text{ kN}$.",
    wolof:
      "« Vitesse bi dafa tegu ($v = \\text{cte}$), motax $a = 0$ (Principe d'Inertie) ! Forces yi dañuy faye bopp : $F_m - f = 0 \\implies f = F_m = 30\\text{ kN}$ ! »",
  },
  {
    id: 8,
    stars: 2,
    points: 2,
    question:
      "Dans une machine d'Atwood, deux masses $m_1 = 3{,}0\\text{ kg}$ et $m_2 = 5{,}0\\text{ kg}$ sont reliées par un fil inextensible de masse négligeable passant sur une poulie idéale. En prenant $g = 10\\text{ m}\\cdot\\text{s}^{-2}$, que vaut l'accélération commune $a$ du système ?",
    answers: [
      "$a = \\frac{m_2 - m_1}{m_1 + m_2}\\,g = 2{,}50\\text{ m}\\cdot\\text{s}^{-2}$",
      "$a = 10{,}0\\text{ m}\\cdot\\text{s}^{-2}$ (chute libre)",
      "$a = \\frac{m_1 + m_2}{m_2 - m_1}\\,g = 40\\text{ m}\\cdot\\text{s}^{-2}$",
      "$a = 5{,}0\\text{ m}\\cdot\\text{s}^{-2}$",
    ],
    correctIndex: 0,
    explanation:
      "En appliquant le TCI à chaque solide ($m_2\\,g - T = m_2\\,a$ et $T - m_1\\,g = m_1\\,a$) et en sommant les deux équations : $(m_2 - m_1)\\,g = (m_1 + m_2)\\,a \\implies a = \\frac{m_2 - m_1}{m_1 + m_2}\\,g$. Numériquement : $a = \\frac{5 - 3}{5 + 3} \\times 10 = \\frac{2}{8} \\times 10 = 2{,}50\\text{ m}\\cdot\\text{s}^{-2}$.",
    wolof:
      "« Formule Atwood : $a = \\frac{m_2 - m_1}{m_1 + m_2}\\,g = \\frac{5 - 3}{8} \\times 10 = \\frac{2}{8} \\times 10 = 2{,}5\\text{ m}\\cdot\\text{s}^{-2}$ ! »",
  },
  {
    id: 9,
    stars: 3,
    points: 3,
    question:
      "Dans cette même machine d'Atwood ($m_1 = 3{,}0\\text{ kg}$, $m_2 = 5{,}0\\text{ kg}$, $g = 10\\text{ m}\\cdot\\text{s}^{-2}$, $a = 2{,}5\\text{ m}\\cdot\\text{s}^{-2}$), que vaut la tension $T$ du fil pendant le mouvement ?",
    answers: [
      "$T = 37{,}5\\text{ N}$",
      "$T = 50{,}0\\text{ N}$",
      "$T = 30{,}0\\text{ N}$",
      "$T = 20{,}0\\text{ N}$",
    ],
    correctIndex: 0,
    explanation:
      "Pour le solide $m_1$ qui monte : $T - m_1\\,g = m_1\\,a \\implies T = m_1\\,(g + a) = 3{,}0 \\times (10 + 2{,}5) = 3{,}0 \\times 12{,}5 = 37{,}5\\text{ N}$. On peut vérifier avec $m_2$ qui descend : $m_2\\,g - T = m_2\\,a \\implies T = m_2\\,(g - a) = 5{,}0 \\times (10 - 2{,}5) = 5{,}0 \\times 7{,}5 = 37{,}5\\text{ N}$.",
    wolof:
      "« Tension fil bi : $T = m_1\\,(g + a) = 3 \\times 12{,}5 = 37{,}5\\text{ N}$ ! $T$ bi dafa toloo ci ñaari wette yépp ! »",
  },
  {
    id: 10,
    stars: 2,
    points: 2,
    question:
      "La Terre (masse $M_T = 5{,}97\\cdot 10^{24}\\text{ kg}$) attire la Lune (masse $M_L = 7{,}35\\cdot 10^{22}\\text{ kg}$) avec une force gravitationnelle $\\vec{F}_{T/L}$. D'après la 3ème loi de Newton (principe des actions réciproques), que peut-on affirmer sur la force $\\vec{F}_{L/T}$ exercée par la Lune sur la Terre ?",
    answers: [
      "$\\vec{F}_{L/T} = -\\vec{F}_{T/L}$ : les deux forces ont STRICTEMENT la même intensité, malgré l'immense différence de masse",
      "La force de la Terre est 81 fois plus grande que celle de la Lune car la Terre est 81 fois plus massive",
      "La force de la Lune est négligeable et considérée comme nulle",
      "Les deux forces s'annulent et le système est en équilibre statique",
    ],
    correctIndex: 0,
    explanation:
      "La troisième loi de Newton est formelle et universelle : l'action et la réaction sont de sens opposés mais ont RIGOUREUSEMENT la même intensité : $\\|\\vec{F}_{L/T}\\| = \\|\\vec{F}_{T/L}\\| = G\\,\\frac{M_T\\,M_L}{d^2}$. La différence d'accélération subie par les deux astres provient uniquement de leurs masses différentes ($a_T = \\frac{F}{M_T} \\ll a_L = \\frac{F}{M_L}$).",
    wolof:
      "« 3ème loi de Newton dafay am doole fu nekk : suuf ak weer dañuy sotti doole yu toloo bu baax $\\|\\vec{F}_{T/L}\\| = \\|\\vec{F}_{L/T}\\|$ ! Bu benn bi gën a rëy moroom ma sax, doole yi benn lañu ! »",
  },
];

export default function NewtonQuizEmbedded() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSelectAnswer = (questionId: number, answerIndex: number) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const totalQuestions = QUESTIONS.length;
  const isComplete = answeredCount === totalQuestions;

  let totalPoints = 0;
  let earnedPoints = 0;

  QUESTIONS.forEach((q) => {
    totalPoints += q.points;
    if (selectedAnswers[q.id] === q.correctIndex) {
      earnedPoints += q.points;
    }
  });

  const percentage = Math.round((earnedPoints / totalPoints) * 100);

  return (
    <div className="bg-white rounded-3xl border border-navy/10 p-5 sm:p-7 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-gold/10 text-gold">
              <Trophy className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-navy">
              Quiz d&apos;Entraînement Bac S2 : P2 — Les Lois de Newton sur le Mouvement
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-text/70 mt-1">
            10 questions authentiques conformes aux épreuves de Dynamique de l&apos;Office du Baccalauréat sénégalais.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-turquoise-light text-turquoise border border-turquoise/20">
            {answeredCount} / {totalQuestions} répondues
          </span>
        </div>
      </div>

      {/* Résumé du score si validé */}
      {showResults && (
        <div
          className={`p-5 rounded-2xl border ${
            percentage >= 70
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : percentage >= 50
              ? 'bg-amber-50 border-amber-200 text-amber-950'
              : 'bg-rose-50 border-rose-200 text-rose-950'
          } flex flex-col sm:flex-row items-center justify-between gap-4`}
        >
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold">
              {percentage >= 80
                ? '🏆 Exceptionnel ! Vous maîtrisez les lois de Newton du Bac S2 !'
                : percentage >= 60
                ? '👍 Bon travail ! Revoir les projections de forces sur plan incliné.'
                : '📚 Relisez attentivement les fiches réflexes de dynamique pour consolider.'}
            </h4>
            <p className="text-xs opacity-90">
              Votre note : <strong>{earnedPoints} / {totalPoints} points</strong> ({percentage}%)
            </p>
          </div>

          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-navy text-white text-xs font-bold hover:bg-navy/90 transition-all shrink-0 flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Refaire le quiz
          </button>
        </div>
      )}

      {/* Liste des questions */}
      <div className="space-y-6">
        {QUESTIONS.map((q, qIndex) => {
          const userAnswer = selectedAnswers[q.id];
          const isAnswered = userAnswer !== undefined;
          const isCorrect = isAnswered && userAnswer === q.correctIndex;

          return (
            <div
              key={q.id}
              className={`p-5 rounded-2xl border transition-all ${
                showResults
                  ? isCorrect
                    ? 'border-emerald-300 bg-emerald-50/30'
                    : 'border-rose-300 bg-rose-50/30'
                  : isAnswered
                  ? 'border-turquoise/40 bg-surface'
                  : 'border-navy/10 bg-white'
              } space-y-4`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-navy/10 text-navy font-bold text-xs flex items-center justify-center">
                      {qIndex + 1}
                    </span>
                    <span className="text-[11px] font-bold text-text/50 uppercase tracking-wider">
                      Question #{qIndex + 1} • {q.points} point{q.points > 1 ? 's' : ''}
                    </span>
                    <div className="flex items-center text-amber-500">
                      {Array.from({ length: q.stars }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-navy mt-1">
                    <MathRenderer content={q.question} />
                  </div>
                </div>

                {showResults && (
                  <span className="shrink-0">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600" />
                    )}
                  </span>
                )}
              </div>

              {/* Choix de réponses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.answers.map((ans, aIndex) => {
                  const isSelected = userAnswer === aIndex;
                  const isThisCorrect = q.correctIndex === aIndex;

                  let btnStyle = 'border-navy/10 bg-white hover:border-turquoise/40 text-navy';

                  if (showResults) {
                    if (isThisCorrect) {
                      btnStyle = 'border-emerald-500 bg-emerald-100 text-emerald-950 font-bold';
                    } else if (isSelected) {
                      btnStyle = 'border-rose-400 bg-rose-100 text-rose-950 font-medium';
                    } else {
                      btnStyle = 'border-navy/10 bg-white opacity-50';
                    }
                  } else if (isSelected) {
                    btnStyle = 'border-turquoise bg-turquoise-light text-navy font-bold shadow-xs';
                  }

                  return (
                    <button
                      key={aIndex}
                      onClick={() => handleSelectAnswer(q.id, aIndex)}
                      disabled={showResults}
                      className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span className="pr-2">
                        <MathRenderer content={ans} />
                      </span>
                      <span
                        className={`w-5 h-5 rounded-full border text-[10px] font-bold flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-turquoise bg-turquoise text-white'
                            : 'border-navy/20 text-text/40'
                        }`}
                      >
                        {String.fromCharCode(65 + aIndex)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Explication après validation */}
              {showResults && (
                <div className="pt-3 border-t border-navy/10 space-y-2 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-navy/10 space-y-1">
                    <span className="font-bold text-navy flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                      Correction détaillée :
                    </span>
                    <MathRenderer content={q.explanation} className="text-text/80 text-[11px] leading-relaxed pl-5" />
                  </div>

                  {q.wolof && (
                    <div className="text-[11px] italic text-amber-900 bg-amber-50/70 p-2.5 rounded-lg border border-amber-200">
                      <MathRenderer content={q.wolof} />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bouton de validation final */}
      {!showResults && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-navy/10">
          <span className="text-xs text-text/60">
            {isComplete
              ? 'Toutes les questions ont été répondues ! Vous pouvez valider.'
              : `Il vous reste ${totalQuestions - answeredCount} question(s) à répondre.`}
          </span>
          <button
            onClick={() => setShowResults(true)}
            disabled={!isComplete}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-turquoise hover:bg-turquoise/90 text-white font-bold text-xs transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Valider mes réponses ({answeredCount}/{totalQuestions})
          </button>
        </div>
      )}
    </div>
  );
}

