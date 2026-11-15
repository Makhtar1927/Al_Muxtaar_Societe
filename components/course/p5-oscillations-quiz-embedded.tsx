'use client';

import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw, ChevronRight, Award } from 'lucide-react';
import MathRenderer from '@/components/course/math-renderer';

interface Question {
  id: number;
  question: string;
  context?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  bacYear?: string;
  theme: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question:
      "Pour un oscillateur élastique horizontal de masse $m$ et de raideur $k$ glissant sans frottement sur un banc à coussin d'air, quelle est l'équation différentielle exacte vérifiée par l'élongation $x(t)$ ?",
    context: 'Pendule élastique horizontal — Application du TCI',
    options: [
      '$m \\ddot{x} - k x = 0 \\iff \\ddot{x} - \\dfrac{k}{m}x = 0$',
      '$\\ddot{x} + \\dfrac{k}{m}x = 0 \\iff \\ddot{x} + \\omega_0^2 x = 0 \\quad \\text{avec} \\quad \\omega_0 = \\sqrt{\\dfrac{k}{m}}$',
      '$\\ddot{x} + \\dfrac{m}{k}x = 0 \\iff \\ddot{x} + \\omega_0^2 x = 0 \\quad \\text{avec} \\quad \\omega_0 = \\sqrt{\\dfrac{m}{k}}$',
      '$m \\dot{x} + k x = 0$',
    ],
    correctAnswer: 1,
    explanation:
      "D'après la 2e loi de Newton projetée sur $(Ox)$ : $P_x + R_x + T_x = m\\,a_x$. Comme $\\vec{P}$ et $\\vec{R}_N$ sont verticaux, $P_x = R_x = 0$ ; la force de rappel donne $T_x = -kx$. On obtient $-kx = m\\ddot{x}$, soit $\\ddot{x} + \\dfrac{k}{m}x = 0$ avec $\\omega_0 = \\sqrt{\\dfrac{k}{m}}$.",
    bacYear: 'Bac S2',
    theme: 'Équation différentielle',
  },
  {
    id: 2,
    question:
      "Un pendule élastique vertical à l'équilibre statique présente un allongement $\\Delta l_0$. Quelle est la période propre $T_0$ en fonction de $\\Delta l_0$ et de $g$ uniquement ?",
    context: "Pendule élastique vertical — Allongement à l'équilibre",
    options: [
      '$T_0 = 2\\pi \\sqrt{\\dfrac{g}{\\Delta l_0}}$',
      '$T_0 = 2\\pi \\sqrt{\\dfrac{\\Delta l_0}{g}}$',
      '$T_0 = \\dfrac{1}{2\\pi} \\sqrt{\\dfrac{\\Delta l_0}{g}}$',
      '$T_0 = 2\\pi \\dfrac{\\Delta l_0}{g}$',
    ],
    correctAnswer: 1,
    explanation:
      "À l'équilibre : $\\vec{P} + \\vec{T}_0 = \\vec{0} \\implies mg = k\\,\\Delta l_0 \\implies \\dfrac{k}{m} = \\dfrac{g}{\\Delta l_0}$. En substituant dans $T_0 = 2\\pi\\sqrt{\\dfrac{m}{k}}$ on obtient $T_0 = 2\\pi\\sqrt{\\dfrac{\\Delta l_0}{g}}$.",
    bacYear: 'Bac S2',
    theme: 'Allongement statique',
  },
  {
    id: 3,
    question:
      "On remplace le solide de masse $m$ par un autre de masse $m' = 4m$ sans changer le ressort de raideur $k$. Que devient la nouvelle période propre $T'_0$ ?",
    context: 'Isochronisme & dépendance massique',
    options: [
      "$T'_0 = \\dfrac{T_0}{2}$",
      "$T'_0 = T_0$",
      "$T'_0 = 4\\,T_0$",
      "$T'_0 = 2\\,T_0$",
    ],
    correctAnswer: 3,
    explanation:
      "$T_0 = 2\\pi\\sqrt{\\dfrac{m}{k}}$. Avec $m' = 4m$ : $T'_0 = 2\\pi\\sqrt{\\dfrac{4m}{k}} = 2\\,T_0$. La période est proportionnelle à $\\sqrt{m}$, donc elle double.",
    bacYear: 'Bac S2',
    theme: 'Période propre',
  },
  {
    id: 4,
    question:
      "À $t = 0$, le solide est lâché sans vitesse initiale depuis $x_0 = +X_m$. Sachant que $x(t) = X_m\\cos(\\omega_0 t + \\varphi)$, quelle est la valeur de la phase initiale $\\varphi$ ?",
    context: 'Conditions initiales — phase à l\'origine',
    options: [
      '$\\varphi = +\\dfrac{\\pi}{2}$ rad',
      '$\\varphi = 0$ rad',
      '$\\varphi = \\pi$ rad',
      '$\\varphi = -\\dfrac{\\pi}{2}$ rad',
    ],
    correctAnswer: 1,
    explanation:
      "À $t = 0$ : $x(0) = X_m\\cos\\varphi = X_m \\implies \\cos\\varphi = 1 \\implies \\varphi = 0$ rad. Et $v(0) = -X_m\\omega_0\\sin(0) = 0$ ✓, ce qui confirme l'absence de vitesse initiale.",
    bacYear: 'Bac S2',
    theme: 'Phase initiale',
  },
  {
    id: 5,
    question:
      "Quelle est la relation entre la vitesse maximale $V_m$, l'amplitude $X_m$ et la pulsation propre $\\omega_0$ lors du passage par la position d'équilibre ?",
    context: 'Cinématique du mouvement rectiligne sinusoïdal (MRS)',
    options: [
      '$V_m = \\dfrac{X_m}{\\omega_0}$',
      '$V_m = \\omega_0\\,X_m$',
      '$V_m = \\omega_0^2\\,X_m$',
      '$V_m = \\dfrac{1}{2}\\omega_0 X_m^2$',
    ],
    correctAnswer: 1,
    explanation:
      "$v(t) = \\dot{x}(t) = -\\omega_0 X_m \\sin(\\omega_0 t + \\varphi)$. Le sinus variant entre $-1$ et $+1$, la valeur maximale est $V_m = \\omega_0 X_m$, atteinte lors du passage par $x = 0$.",
    bacYear: 'Bac S2',
    theme: 'Vitesse maximale',
  },
  {
    id: 6,
    question:
      "Un oscillateur a une période mécanique $T_0 = 1{,}20$ s. Quelle est la période $T_E$ des oscillations de l'énergie cinétique $E_c(t)$ et de l'énergie potentielle élastique $E_{pe}(t)$ ?",
    context: 'Périodicité des formes d\'énergie',
    options: [
      '$T_E = 2\\,T_0 = 2{,}40$ s',
      '$T_E = T_0 = 1{,}20$ s',
      '$T_E = \\dfrac{T_0}{2} = 0{,}60$ s',
      '$T_E = \\dfrac{T_0}{4} = 0{,}30$ s',
    ],
    correctAnswer: 2,
    explanation:
      "$E_{pe} = \\frac{1}{2}k X_m^2\\cos^2(\\omega_0 t + \\varphi)$. Par la formule $\\cos^2\\theta = \\frac{1+\\cos 2\\theta}{2}$, la pulsation des énergies est $2\\omega_0$, donc leur période est $T_E = \\dfrac{T_0}{2} = 0{,}60$ s.",
    bacYear: 'Bac S2',
    theme: 'Période énergétique',
  },
  {
    id: 7,
    question:
      "Comment retrouve-t-on l'équation différentielle du mouvement par la méthode énergétique (dérivation de $E_m$) ?",
    context: 'Méthode énergétique de dérivation',
    options: [
      'En posant $E_m = 0$, puis en résolvant par rapport à $x$.',
      'En dérivant $E_m = \\frac{1}{2}mv^2 + \\frac{1}{2}kx^2$ par rapport au temps : $\\frac{dE_m}{dt} = mv\\dot{v} + kx\\dot{x} = v(m\\ddot{x} + kx) = 0$. Comme $v$ n\'est pas nul partout, on déduit $m\\ddot{x} + kx = 0$.',
      'En intégrant $E_m$ par parties entre $0$ et $T_0$.',
      "En égalisant l'énergie cinétique et l'énergie potentielle à tout instant.",
    ],
    correctAnswer: 1,
    explanation:
      "Sans forces non conservatives, $E_m = \\text{cste}$, donc $\\dfrac{dE_m}{dt} = 0$. En dérivant : $m v \\ddot{x} + k x \\dot{x} = v(m\\ddot{x} + kx) = 0$. La vitesse n'étant pas toujours nulle, on conclut $m\\ddot{x} + kx = 0 \\iff \\ddot{x} + \\dfrac{k}{m}x = 0$.",
    bacYear: 'Bac S2',
    theme: "Conservation de l'énergie",
  },
  {
    id: 8,
    question:
      "En présence de frottements fluides modérés ($\\vec{f} = -h\\,\\vec{v}$), quel est le régime du mouvement et comment évoluent l'amplitude et l'énergie mécanique ?",
    context: 'Oscillations amorties',
    options: [
      'Régime périodique pur : amplitude et énergie restent constantes.',
      'Régime apériodique : le mobile effectue de nombreuses oscillations avant de s\'arrêter.',
      "Régime pseudo-périodique : mouvement oscillatoire avec pseudo-période $T \\approx T_0$, amplitude décroissante exponentiellement et énergie mécanique dissipée sous forme de chaleur.",
      'Régime chaotique : la période augmente sans limite dès le premier cycle.',
    ],
    correctAnswer: 2,
    explanation:
      "Pour un amortissement fluide faible, le système oscille en régime pseudo-périodique avec une pseudo-période $T$ légèrement supérieure à $T_0$. L'amplitude décroît exponentiellement, et $\\dfrac{dE_m}{dt} = \\vec{f}\\cdot\\vec{v} = -hv^2 < 0$ : l'énergie est dissipée en chaleur.",
    bacYear: 'Bac S2',
    theme: 'Oscillations amorties',
  },
];

export default function P5OscillationsQuizEmbedded() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = QUESTIONS[currentIdx];
  const isAnswered = selectedAnswers[currentIdx] !== undefined;

  const handleSelect = (optIdx: number) => {
    if (isAnswered) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIdx]: optIdx }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setShowExplanation(selectedAnswers[currentIdx + 1] !== undefined);
    } else {
      setQuizFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
      setShowExplanation(true);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setShowExplanation(false);
    setQuizFinished(false);
  };

  const score = Object.entries(selectedAnswers).reduce((acc, [idx, ans]) => {
    return ans === QUESTIONS[Number(idx)].correctAnswer ? acc + 1 : acc;
  }, 0);

  const percentage = Math.round((score / QUESTIONS.length) * 100);

  return (
    <div className="bg-white rounded-3xl border border-navy/10 p-6 md:p-8 shadow-sm">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-navy/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-900 mb-2">
            <span>Évaluation Formative — Bac S2</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-navy">
            Quiz Bac S2 : Oscillations Mécaniques &amp; Pendule Élastique
          </h2>
          <p className="text-sm text-navy/70 mt-1">
            8 questions — équation différentielle, loi horaire, bilans énergétiques
          </p>
        </div>

        {!quizFinished && (
          <div className="text-right shrink-0">
            <span className="text-xs font-medium text-navy/60 block">Progression</span>
            <span className="text-lg font-bold text-navy">
              Question {currentIdx + 1} / {QUESTIONS.length}
            </span>
          </div>
        )}
      </div>

      {!quizFinished ? (
        <div className="mt-6 space-y-6">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-navy/5 text-navy font-semibold">
              {currentQ.theme}
            </span>
            {currentQ.bacYear && (
              <span className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-900 font-medium border border-blue-200/60">
                {currentQ.bacYear}
              </span>
            )}
          </div>

          {/* Contexte */}
          {currentQ.context && (
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-navy/80">
              <span className="font-bold">Contexte d'évaluation : </span>
              {currentQ.context}
            </div>
          )}

          {/* Énoncé */}
          <h3 className="text-base md:text-lg font-semibold text-navy leading-relaxed">
            <MathRenderer content={currentQ.question} />
          </h3>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((option, optIdx) => {
              const isSelected = selectedAnswers[currentIdx] === optIdx;
              const isCorrect = currentQ.correctAnswer === optIdx;
              const showResult = isAnswered;

              let btnStyle = 'border-navy/15 bg-white hover:bg-navy/5 text-navy';
              let indicator = (
                <div className="w-6 h-6 rounded-full border border-navy/30 flex items-center justify-center text-xs font-bold text-navy/70 shrink-0">
                  {String.fromCharCode(65 + optIdx)}
                </div>
              );

              if (showResult) {
                if (isCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-medium';
                  indicator = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'border-red-400 bg-red-50/70 text-red-950';
                  indicator = <XCircle className="w-5 h-5 text-red-600 shrink-0" />;
                } else {
                  btnStyle = 'border-navy/10 bg-white/50 text-navy/40';
                }
              } else if (isSelected) {
                btnStyle = 'border-blue-600 bg-blue-50 text-blue-950 font-medium';
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelect(optIdx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${btnStyle}`}
                >
                  <div className="mt-0.5 shrink-0">{indicator}</div>
                  <span className="text-sm leading-relaxed">
                    <MathRenderer content={option} />
                  </span>
                </button>
              );
            })}
          </div>

          {/* Explication */}
          {showExplanation && (
            <div
              className={`p-4 rounded-2xl border transition-all ${
                selectedAnswers[currentIdx] === currentQ.correctAnswer
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                  : 'bg-amber-50/80 border-amber-300 text-amber-950'
              }`}
            >
              <div className="text-xs md:text-sm space-y-2 leading-relaxed">
                <div className="font-bold text-sm">
                  {selectedAnswers[currentIdx] === currentQ.correctAnswer
                    ? '✓ Démonstration validée'
                    : 'Éclairage pédagogique Bac S2'}
                </div>
                <MathRenderer content={currentQ.explanation} />
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4 border-t border-navy/10">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="px-4 py-2 text-xs font-semibold text-navy/70 hover:text-navy disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              Question précédente
            </button>

            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className="px-5 py-2.5 rounded-2xl bg-navy text-white text-xs font-bold hover:bg-navy/90 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center gap-2 shadow-sm"
            >
              <span>{currentIdx === QUESTIONS.length - 1 ? 'Voir le bilan' : 'Question suivante'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Bilan */
        <div className="mt-8 text-center space-y-6 max-w-md mx-auto py-4">
          <div className="w-16 h-16 rounded-full bg-blue-50 border-2 border-blue-300 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8 text-blue-600" />
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-navy">Bilan de l&apos;évaluation</h3>
            <p className="text-sm text-navy/70">
              Oscillations Mécaniques &amp; Pendule Élastique — Terminale S2
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-4xl font-black text-navy">{percentage} %</div>
            <p className="text-xs text-navy/70">
              Vous avez obtenu <strong>{score}</strong> réponse(s) exacte(s) sur{' '}
              <strong>{QUESTIONS.length}</strong>.
            </p>
          </div>

          <p className="text-xs text-navy/80 leading-relaxed italic">
            {percentage >= 75
              ? 'Excellente maîtrise du pendule élastique et des bilans énergétiques ! Vous êtes parfaitement paré(e) pour le Bac S2.'
              : percentage >= 50
              ? 'Résultats honorables. Revoyez la détermination de la phase $\\varphi$ et la période énergétique $T_E = T_0/2$ pour viser la mention.'
              : 'Revenez sur les fiches réflexes et le laboratoire virtuel pour assimiler la projection du TCI et la dérivation de $E_m$.'}
          </p>

          <button
            onClick={handleReset}
            className="w-full py-3 rounded-2xl bg-navy text-white text-sm font-bold hover:bg-navy/90 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Recommencer le quiz</span>
          </button>
        </div>
      )}
    </div>
  );
}
