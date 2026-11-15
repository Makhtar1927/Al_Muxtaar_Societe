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
      'Dans un circuit LC idéal non amorti ($R_t = 0$), si l\'on quadruple à la fois l\'inductance $L$ de la bobine et la capacité $C$ du condensateur, comment évolue la période propre $T_0$ des oscillations ?',
    context: 'Circuit LC — Dépendance de la période propre',
    options: [
      'Elle reste rigoureusement inchangée.',
      'Elle est multipliée par 2.',
      'Elle est multipliée par 4 : $T\'_0 = 4\\,T_0$.',
      'Elle est divisée par 2.',
    ],
    correctAnswer: 2,
    explanation:
      'La période propre s\'écrit $T_0 = 2\\pi\\sqrt{LC}$. Si $L\' = 4L$ et $C\' = 4C$, alors $L\'C\' = 16\\,LC$. La nouvelle période propre devient $T\'_0 = 2\\pi\\sqrt{16\\,LC} = 4 \\times 2\\pi\\sqrt{LC} = 4\\,T_0$. La période propre est donc quadruplée.',
    bacYear: 'Bac S2',
    theme: 'Période propre LC',
  },
  {
    id: 2,
    question:
      'Quelle est la relation de phase exacte entre l\'intensité du courant $i(t)$ et la charge électrique $q(t)$ du condensateur dans un circuit LC en convention récepteur ?',
    context: 'Cinématique des oscillations électriques',
    options: [
      '$i(t)$ et $q(t)$ sont strictement en phase.',
      '$i(t)$ et $q(t)$ sont en opposition de phase (déphasage de $\\pi$ radians).',
      '$i(t)$ est en quadrature avance de phase de $+\\dfrac{\\pi}{2}$ radians sur $q(t)$.',
      '$i(t)$ est en retard de phase de $-\\dfrac{\\pi}{2}$ radians sur $q(t)$.',
    ],
    correctAnswer: 2,
    explanation:
      'Par définition en convention récepteur, $i(t) = \\dot{q}(t)$. Si $q(t) = Q_m\\cos(\\omega_0 t + \\varphi)$, alors $i(t) = -\\omega_0 Q_m\\sin(\\omega_0 t + \\varphi) = I_m\\cos\\left(\\omega_0 t + \\varphi + \\dfrac{\\pi}{2}\\right)$. L\'intensité $i(t)$ est donc en quadrature avance d\'un quart de période ($+\\pi/2$ rad) par rapport à la charge $q(t)$.',
    bacYear: 'Bac S2',
    theme: 'Déphasage courant-charge',
  },
  {
    id: 3,
    question:
      'Dans un circuit LC idéal, les oscillations de la tension $u_C(t)$ ont pour période $T_0 = 4{,}0\\text{ ms}$. Quelle est la période $T_E$ des oscillations de l\'énergie électrostatique $E_e(t)$ emmagasinée dans le condensateur ?',
    context: 'Périodicité des transferts énergétiques',
    options: [
      '$T_E = 8{,}0\\text{ ms}$',
      '$T_E = 4{,}0\\text{ ms}$',
      '$T_E = \\dfrac{T_0}{2} = 2{,}0\\text{ ms}$',
      '$T_E = 1{,}0\\text{ ms}$',
    ],
    correctAnswer: 2,
    explanation:
      'L\'énergie électrostatique s\'écrit $E_e(t) = \\dfrac{1}{2}C\\,u_C^2(t) = \\dfrac{1}{2}C\\,U_m^2\\cos^2(\\omega_0 t + \\varphi)$. D\'après l\'identité $\\cos^2\\theta = \\dfrac{1+\\cos 2\\theta}{2}$, la pulsation énergétique est $2\\omega_0$. Par conséquent, la période énergétique est la moitié de la période des grandeurs électriques : $T_E = \\dfrac{T_0}{2} = \\dfrac{4{,}0}{2} = 2{,}0\\text{ ms}$.',
    bacYear: 'Bac S2',
    theme: 'Période énergétique',
  },
  {
    id: 4,
    question:
      'Quelle est l\'expression littérale de la résistance critique $R_c$ séparant le régime pseudopériodique du régime apériodique dans un circuit RLC série libre ?',
    context: 'Classification des régimes d\'amortissement',
    options: [
      '$R_c = \\dfrac{1}{2\\sqrt{LC}}$',
      '$R_c = 2\\sqrt{\\dfrac{L}{C}}$',
      '$R_c = 2\\sqrt{\\dfrac{C}{L}}$',
      '$R_c = \\dfrac{1}{2}\\sqrt{\\dfrac{L}{C}}$',
    ],
    correctAnswer: 1,
    explanation:
      'L\'équation caractéristique associée est $L\\,r^2 + R_t\\,r + \\dfrac{1}{C} = 0$, de discriminant $\\Delta = R_t^2 - \\dfrac{4L}{C}$. Le régime critique correspond à la racine double $\\Delta = 0 \\iff R_t^2 = \\dfrac{4L}{C} \\implies R_c = 2\\sqrt{\\dfrac{L}{C}}$. On vérifie que $[L/C] = \\Omega^2$, donc $[\\sqrt{L/C}] = \\Omega$.',
    bacYear: 'Bac S2',
    theme: 'Résistance critique',
  },
  {
    id: 5,
    question:
      'Sur l\'oscillogramme d\'un circuit RLC en régime pseudopériodique, la première crête positive vaut $U_0 = 10{,}0\\text{ V}$ et la quatrième crête positive (après 3 pseudo-périodes consécutives) vaut $U_3 = 1{,}25\\text{ V}$. Quelle est la valeur exacte du décrément logarithmique $\\delta$ ?',
    context: 'Mesure expérimentale du décrément $\\delta$',
    options: [
      '$\\delta = \\ln(8) \\approx 2{,}08$',
      '$\\delta = \\dfrac{1}{3}\\ln(8) = \\ln(2) \\approx 0{,}693$',
      '$\\delta = \\dfrac{1}{4}\\ln(8) \\approx 0{,}520$',
      '$\\delta = 3\\ln(8) \\approx 6{,}24$',
    ],
    correctAnswer: 1,
    explanation:
      'La formule générale du décrément mesuré sur $n$ pseudo-périodes est $\\delta = \\dfrac{1}{n}\\ln\\left(\\dfrac{U_0}{U_n}\\right)$. Entre la 1ère crête ($k=0$) et la 4ème crête ($k=3$), il s\'est écoulé $n = 3$ pseudo-périodes. Ainsi : $\\delta = \\dfrac{1}{3}\\ln\\left(\\dfrac{10{,}0}{1{,}25}\\right) = \\dfrac{1}{3}\\ln(8) = \\dfrac{1}{3}\\ln(2^3) = \\ln(2) \\approx 0{,}693$.',
    bacYear: 'Bac S2',
    theme: 'Décrément logarithmique',
  },
  {
    id: 6,
    question:
      'Dans l\'analogie formelle entre les oscillations du pendule élastique et celles du circuit RLC série, à quelle grandeur mécanique correspond rigoureusement l\'inductance $L$ de la bobine ?',
    context: 'Analogie mécanique-électrique',
    options: [
      'À la raideur $k$ du ressort.',
      'Au coefficient de frottement visqueux $h$.',
      'À la masse $m$ du solide (inertie mécanique).',
      'À la position d\'équilibre $x_0$.',
    ],
    correctAnswer: 2,
    explanation:
      'L\'équation mécanique $m\\ddot{x} + h\\dot{x} + kx = 0$ s\'identifie terme à terme à $L\\ddot{q} + R_t\\dot{q} + \\dfrac{1}{C}q = 0$. L\'inductance $L$ représente l\'inertie électrique (opposition aux variations de courant), tout comme la masse $m$ représente l\'inertie mécanique (opposition aux variations de vitesse). De plus, $E_m = \\frac{1}{2}Li^2 \\longleftrightarrow E_c = \\frac{1}{2}mv^2$.',
    bacYear: 'Bac S2',
    theme: 'Analogie formelle',
  },
  {
    id: 7,
    question:
      'Pour entretenir des oscillations sinusoïdales d\'amplitude constante dans un circuit RLC série de résistance totale $R_t = 25\\,\\Omega$, on insère un dipôle actif simulant une résistance négative $u_g = -R_0\\,i$. Quelle doit être la valeur de $R_0$ ?',
    context: 'Entretien des oscillations électriques',
    options: [
      '$R_0 > 25\\,\\Omega$',
      '$R_0 = 25\\,\\Omega = R_t$',
      '$R_0 < 25\\,\\Omega$',
      '$R_0 = 0\\,\\Omega$',
    ],
    correctAnswer: 1,
    explanation:
      'La loi de maille avec le dipôle actif s\'écrit $L\\dfrac{di}{dt} + (R_t - R_0)i + \\dfrac{q}{C} = 0$. Pour obtenir des oscillations sinusoïdales permanentes d\'amplitude strictement constante, le coefficient d\'amortissement global doit être rigoureusement nul : $R_t - R_0 = 0 \\implies R_0 = R_t = 25\\,\\Omega$.',
    bacYear: 'Bac S2',
    theme: 'Entretien par résistance négative',
  },
  {
    id: 8,
    question:
      'Dans un circuit RLC amorti, que vaut l\'expression de la dérivée temporelle de l\'énergie électromagnétique totale $\\dfrac{\\mathrm{d}E_t}{\\mathrm{d}t}$ ?',
    context: 'Bilan énergétique et dissipation Joule',
    options: [
      '$\\dfrac{\\mathrm{d}E_t}{\\mathrm{d}t} = 0$ (l\'énergie se conserve)',
      '$\\dfrac{\\mathrm{d}E_t}{\\mathrm{d}t} = +R_t\\,i^2(t)$',
      '$\\dfrac{\\mathrm{d}E_t}{\\mathrm{d}t} = -R_t\\,i^2(t)$',
      '$\\dfrac{\\mathrm{d}E_t}{\\mathrm{d}t} = -\\dfrac{1}{2}R_t\\,i^2(t)$',
    ],
    correctAnswer: 2,
    explanation:
      '$E_t = \\dfrac{q^2}{2C} + \\dfrac{1}{2}Li^2$. En dérivant : $\\dfrac{dE_t}{dt} = \\dfrac{q}{C}\\dot{q} + Li\\dot{i} = i\\left(\\dfrac{q}{C} + L\\dfrac{di}{dt}\\right)$. Or, d\'après la loi des mailles, $\\dfrac{q}{C} + L\\dfrac{di}{dt} = -R_t i$. On en déduit $\\dfrac{dE_t}{dt} = -R_t i^2(t) \\le 0$. Cette grandeur négative traduit la puissance instantanée dissipée sous forme thermique par effet Joule.',
    bacYear: 'Bac S2',
    theme: 'Dissipation par effet Joule',
  },
];

export default function P7RlcLibresQuizEmbedded() {
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
            Quiz Bac S2 : Oscillations Électriques Libres (Circuit LC &amp; RLC)
          </h2>
          <p className="text-sm text-navy/70 mt-1">
            8 questions — période propre T₀, bilan énergétique, régimes d’amortissement et analogie mécanique
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
              Oscillations Électriques Libres (LC &amp; RLC) — Terminale S2
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
              ? 'Excellente maîtrise du circuit LC idéal, de la résistance critique et du décrément logarithmique ! Vous êtes fin prêt(e) pour les épreuves de physique du Bac S2.'
              : percentage >= 50
              ? 'Résultats honorables. Revoyez la formule du décrément $\\delta$ sur $n$ périodes et la période énergétique $T_E = T_0/2$.'
              : 'Revenez sur les fiches réflexes et le simulateur interactif pour bien assimiler la loi d\'additivité et la dissipation par effet Joule.'}
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
