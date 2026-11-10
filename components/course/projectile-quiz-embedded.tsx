'use client';

import React, { useState } from 'react';
import MathRenderer from '@/components/course/math-renderer';
import { CheckCircle, XCircle, Star, Lightbulb, Trophy, RotateCcw, Target } from 'lucide-react';

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
      "Dans le repère $(O, \\vec{i}, \\vec{j})$ où l'axe $(Oy)$ est vertical ascendant, quelles sont les coordonnées du vecteur accélération $\\vec{a}$ d'un projectile lancé dans le champ de pesanteur uniforme (frottements négligés) ?",
    answers: [
      "$a_x = 0 \\quad \\text{et} \\quad a_y = -g$",
      "$a_x = g \\quad \\text{et} \\quad a_y = 0$",
      "$a_x = 0 \\quad \\text{et} \\quad a_y = +g$",
      "$a_x = v_0\\cos\\alpha \\quad \\text{et} \\quad a_y = -gt + v_0\\sin\\alpha$",
    ],
    correctIndex: 0,
    explanation:
      "D'après la 2ème loi de Newton (TCI) : $\\sum \\vec{F}_{\\text{ext}} = m\\vec{a} \\implies m\\vec{g} = m\\vec{a} \\implies \\vec{a} = \\vec{g}$. Comme le champ de pesanteur $\\vec{g}$ est vertical descendant et que l'axe $(Oy)$ pointe vers le haut, on a : $a_x = 0$ et $a_y = -g$.",
    wolof:
      "« Axe $(Oy)$ dafa jëm ci kaw, pesanteur $\\vec{g}$ di ñëw ci suuf, motax $a_y = -g$ (signe moins bi dafa am solo lool !). Ci wetu $(Ox)$ amul force, motax $a_x = 0$ ! »",
  },
  {
    id: 2,
    stars: 1,
    points: 1,
    question:
      "Quelle est la nature du mouvement du projectile selon chacun des axes $(Ox)$ horizontal et $(Oy)$ vertical ascendant ?",
    answers: [
      "Mouvement Rectiligne Uniforme (MRU) selon $(Ox)$ et Mouvement Rectiligne Uniformément Varié (MRUV) selon $(Oy)$",
      "MRUV selon $(Ox)$ et MRU selon $(Oy)$",
      "MRUV selon les deux axes $(Ox)$ et $(Oy)$",
      "Mouvement Circulaire Uniforme dans le plan $(Oxy)$",
    ],
    correctIndex: 0,
    explanation:
      "Sur $(Ox)$ : $a_x = 0 \\implies v_x = v_0\\cos\\alpha = \\text{constante}$, le mouvement est donc un MRU. Sur $(Oy)$ : $a_y = -g = \\text{constante} \\ne 0$, le mouvement est un MRUV de chute libre.",
    wolof:
      "« Ci $(Ox)$, vitesse bi du soppiku mukk ($v_x = v_0\\cos\\alpha$), mooy MRU. Ci $(Oy)$, pesanteur bi dafay soppi vitesse bi waxtu wu nekk ($a_y = -g$), mooy MRUV ! »",
  },
  {
    id: 3,
    stars: 2,
    points: 1.5,
    question:
      "Au sommet $S$ de la trajectoire parabolique, que vaut la norme du vecteur vitesse $\\vec{v}_S$ du projectile ?",
    answers: [
      "$v_S = v_0\\cos\\alpha$",
      "$v_S = 0$ (le projectile s'arrête instantanément)",
      "$v_S = v_0\\sin\\alpha$",
      "$v_S = \\sqrt{v_0^2 - 2gH}$",
    ],
    correctIndex: 0,
    explanation:
      "Au sommet $S$, la tangente est horizontale : seule la composante verticale s'annule ($v_{Sy} = 0$). Mais la composante horizontale $v_{Sx} = v_0\\cos\\alpha$ subsiste toujours ! Donc $v_S = \\sqrt{(v_0\\cos\\alpha)^2 + 0^2} = v_0\\cos\\alpha$. C'est le piège numéro 1 du Bac S2 !",
    wolof:
      "« Bul nànd ne ball bi dafay taxaw ci summit bi ! Composante verticale bi $v_y$ rekk moo nekk zéro, waaye ball bi dafay wéy di daw ci kanam ak $v_x = v_0\\cos\\alpha$ ! »",
  },
  {
    id: 4,
    stars: 2,
    points: 1.5,
    question:
      "Pour un tir effectué depuis le sol ($y_0 = 0$), pour quel angle de tir $\\alpha$ la portée horizontale $x_P$ est-elle maximale, et que vaut alors cette portée ?",
    answers: [
      "$\\alpha = 45^\\circ \\quad \\text{et} \\quad x_{P,\\max} = \\frac{v_0^2}{g}$",
      "$\\alpha = 60^\\circ \\quad \\text{et} \\quad x_{P,\\max} = \\frac{v_0^2}{2g}$",
      "$\\alpha = 90^\\circ \\quad \\text{et} \\quad x_{P,\\max} = \\frac{2v_0^2}{g}$",
      "$\\alpha = 30^\\circ \\quad \\text{et} \\quad x_{P,\\max} = \\frac{v_0^2\\sqrt{3}}{g}$",
    ],
    correctIndex: 0,
    explanation:
      "La portée s'écrit $x_P = \\frac{v_0^2\\sin(2\\alpha)}{g}$. Comme le sinus est borné par $1$, le maximum est atteint lorsque $\\sin(2\\alpha) = 1 \\implies 2\\alpha = 90^\\circ \\implies \\alpha = 45^\\circ$. La portée maximale vaut alors $x_{P,\\max} = \\frac{v_0^2}{g}$.",
    wolof:
      "« Boo bëggé ball bi sori lool ci suuf ($y_0 = 0$), dangakoy tiral ci angle $45^\\circ$ ndax $\\sin(2 \\times 45^\\circ) = \\sin(90^\\circ) = 1$, portée bi day tollu ci $\\frac{v_0^2}{g}$ ! »",
  },
  {
    id: 5,
    stars: 3,
    points: 2,
    question:
      "Deux angles de tir distincts $\\alpha_1$ et $\\alpha_2$ donnent exactement la même portée horizontale $x_P$ pour une même vitesse initiale $v_0$. Quelle relation mathématique lie ces deux angles ?",
    answers: [
      "$\\alpha_1 + \\alpha_2 = 90^\\circ$ (angles complémentaires)",
      "$\\alpha_1 + \\alpha_2 = 180^\\circ$ (angles supplémentaires)",
      "$\\alpha_2 = 2\\,\\alpha_1$",
      "$\\alpha_2 - \\alpha_1 = 45^\\circ$",
    ],
    correctIndex: 0,
    explanation:
      "Comme $x_P = \\frac{v_0^2\\sin(2\\alpha)}{g}$, l'égalité des portées impose $\\sin(2\\alpha_1) = \\sin(2\\alpha_2)$. Or $\\sin(\\pi - 2\\alpha_1) = \\sin(2\\alpha_1)$, donc $2\\alpha_2 = 180^\\circ - 2\\alpha_1 \\implies \\alpha_1 + \\alpha_2 = 90^\\circ$. Les angles complémentaires (ex : $30^\\circ$ et $60^\\circ$, ou $20^\\circ$ et $70^\\circ$) ont la même portée : l'un donne le tir tendu et l'autre le tir en cloche.",
    wolof:
      "« Tir à $30^\\circ$ ak tir à $60^\\circ$ benn portée lay am ci suuf ! Benn bi tir tendu la (gaaw na te kaweul), baneen bi tir en cloche la (kawe na te yéex) ! »",
  },
  {
    id: 6,
    stars: 3,
    points: 2,
    question:
      "Un projectile est lancé depuis une falaise d'altitude $h$ au-dessus du sol avec une vitesse $v_0$ sous un angle $\\alpha$. En appliquant le Théorème de l'Énergie Cinétique (TEC) entre le lancement et l'impact au sol, que vaut la norme de la vitesse d'impact $v_{\\text{impact}}$ ?",
    answers: [
      "$v_{\\text{impact}} = \\sqrt{v_0^2 + 2gh}$ (indépendante de l'angle $\\alpha$)",
      "$v_{\\text{impact}} = \\sqrt{v_0^2\\cos^2\\alpha + 2gh}$",
      "$v_{\\text{impact}} = v_0 + \\sqrt{2gh}$",
      "$v_{\\text{impact}} = \\sqrt{v_0^2 - 2gh\\sin\\alpha}$",
    ],
    correctIndex: 0,
    explanation:
      "Le poids $\\vec{P}$ est la seule force appliquée (chute libre). Entre l'altitude $h$ et le sol $0$, son travail est $W(\\vec{P}) = mgh$. D'après le TEC : $\\frac{1}{2}mv_{\\text{impact}}^2 - \\frac{1}{2}mv_0^2 = mgh \\implies v_{\\text{impact}} = \\sqrt{v_0^2 + 2gh}$. Cette norme remarquable ne dépend ni de la masse $m$, ni de l'angle de tir $\\alpha$ !",
    wolof:
      "« Xam-xam bu am solo : vitesse bi muy dëkke suuf dafay dépendre rekk ci vitesse départ $v_0$ ak hauteur $h$ ! Angle $\\alpha$ bi du changer vitesse d'impact bi mukk ! »",
  },
];

export default function ProjectileQuizEmbedded() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const totalPoints = QUESTIONS.reduce((acc, q) => acc + q.points, 0);

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

  // Calcul du score
  let score = 0;
  let correctCount = 0;
  QUESTIONS.forEach((q) => {
    if (selectedAnswers[q.id] === q.correctIndex) {
      score += q.points;
      correctCount++;
    }
  });

  const percentage = Math.round((score / totalPoints) * 100);
  const answeredCount = Object.keys(selectedAnswers).length;
  const totalQuestions = QUESTIONS.length;
  const isComplete = answeredCount === totalQuestions;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-navy/10 shadow-sm space-y-6">
      {/* En-tête du Quiz */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-navy/10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-3 py-1 rounded-full bg-turquoise/10 text-turquoise text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5" />
              Quiz d&apos;Évaluation Bac S2
            </span>
            <span className="text-xs text-text/50">
              {totalQuestions} Questions • {totalPoints} Points
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-navy">
            Test de Maîtrise : Projectile dans le Champ de Pesanteur
          </h3>
          <p className="text-xs text-text/70 mt-0.5">
            Équations horaires, trajectoire parabolique, flèche, portée et méthode énergétique
          </p>
        </div>

        {/* Score ou Progression */}
        {showResults ? (
          <div className="flex items-center gap-3 bg-navy/5 px-4 py-2.5 rounded-2xl border border-navy/10 shrink-0">
            <Trophy
              className={`w-7 h-7 ${
                percentage >= 80
                  ? 'text-amber-500'
                  : percentage >= 50
                  ? 'text-turquoise'
                  : 'text-rose-500'
              }`}
            />
            <div>
              <div className="text-xs text-text/60 font-medium">Score Final</div>
              <div className="text-base font-bold text-navy">
                {score} / {totalPoints} pts{' '}
                <span className="text-xs font-semibold text-text/60">({percentage}%)</span>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="p-1.5 hover:bg-white rounded-xl text-navy/60 hover:text-navy transition-colors ml-1"
              title="Recommencer le quiz"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-xs text-text/60 shrink-0">
            <span>Progression :</span>
            <span className="font-bold text-navy">
              {answeredCount}/{totalQuestions}
            </span>
            <div className="w-20 bg-navy/10 h-2 rounded-full overflow-hidden">
              <div
                className="bg-turquoise h-full transition-all duration-300"
                style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Liste des questions */}
      <div className="space-y-6">
        {QUESTIONS.map((q, qIndex) => {
          const selectedAns = selectedAnswers[q.id];
          const isCorrect = selectedAns === q.correctIndex;

          return (
            <div
              key={q.id}
              className="p-5 rounded-2xl bg-surface/40 border border-navy/10 space-y-4"
            >
              {/* Entête Question */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-navy/10 text-navy font-bold text-xs flex items-center justify-center shrink-0">
                    {qIndex + 1}
                  </span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: q.stars }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-text/50">
                  {q.points} {q.points > 1 ? 'points' : 'point'}
                </span>
              </div>

              {/* Énoncé */}
              <div className="text-xs sm:text-sm font-semibold text-navy leading-relaxed">
                <MathRenderer content={q.question} />
              </div>

              {/* Options de réponse */}
              <div className="grid grid-cols-1 gap-2.5">
                {q.answers.map((ans, aIndex) => {
                  const isSelected = selectedAns === aIndex;
                  const isThisCorrect = aIndex === q.correctIndex;

                  let btnStyle = 'border-navy/10 bg-white hover:border-turquoise/50 text-navy';
                  if (isSelected) {
                    btnStyle = 'border-turquoise bg-turquoise/10 text-turquoise font-semibold';
                  }

                  if (showResults) {
                    if (isThisCorrect) {
                      btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold';
                    } else if (isSelected && !isThisCorrect) {
                      btnStyle = 'border-rose-500 bg-rose-50 text-rose-900 font-semibold';
                    } else {
                      btnStyle = 'border-navy/5 bg-white/50 text-text/40 opacity-70';
                    }
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

