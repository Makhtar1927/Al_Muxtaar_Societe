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
      'Une bobine plate circulaire de $N = 100$ spires de rayon $r = 5{,}0\\text{ cm}$ est placée dans un champ magnétique uniforme $B = 0{,}20\\text{ T}$. Le vecteur champ $\\vec{B}$ fait un angle de $30^\\circ$ avec le plan de la bobine. Quelle est la valeur exacte du flux magnétique traversant la bobine ?',
    context: 'Calcul du flux magnétique & piège d\'angle $\\alpha$',
    options: [
      '$\\Phi = 100 \\times 0{,}20 \\times \\pi(0{,}05)^2 \\times \\cos(30^\\circ) \\approx 0{,}136\\text{ Wb}$',
      '$\\Phi = 100 \\times 0{,}20 \\times \\pi(0{,}05)^2 \\times \\cos(60^\\circ) \\approx 0{,}0785\\text{ Wb}$',
      '$\\Phi = 0{,}20 \\times \\pi(0{,}05)^2 \\approx 0{,}00157\\text{ Wb}$',
      '$\\Phi = 0\\text{ Wb} \\text{ car le champ n\'est pas perpendiculaire}$',
    ],
    correctAnswer: 1,
    explanation:
      'Attention au piège classique du Bac ! L\'angle $\\alpha$ dans la formule $\\Phi = N B S \\cos\\alpha$ est l\'angle entre le champ $\\vec{B}$ et la normale $\\vec{n}$ au plan de la bobine. Si $\\vec{B}$ fait un angle de $30^\\circ$ avec le plan du circuit, alors $\\alpha = 90^\\circ - 30^\\circ = 60^\\circ$. D\'où $\\Phi = 100 \\times 0{,}20 \\times \\pi(0{,}05)^2 \\times \\cos(60^\\circ) = 0{,}0785\\text{ Wb}$.',
    bacYear: 'Bac S2',
    theme: 'Flux magnétique',
  },
  {
    id: 2,
    question:
      'En vertu de la loi de Lenz, quel est le comportement magnétique d\'une spire circulaire fermée lorsqu\'on approche d\'elle le pôle Nord d\'un aimant droit ?',
    context: 'Loi de Lenz et sens du courant induit',
    options: [
      'La face de la spire en regard de l\'aimant devient une face Sud pour attirer l\'aimant.',
      'La face de la spire en regard de l\'aimant devient une face Nord pour exercer une force magnétique répulsive s\'opposant à l\'approche de l\'aimant.',
      'Aucun courant n\'apparaît tant que l\'aimant ne traverse pas physiquement le centre de la spire.',
      'La spire s\'échauffe par effet Joule sans générer le moindre champ magnétique propre.',
    ],
    correctAnswer: 1,
    explanation:
      'La loi de Lenz stipule que le courant induit s\'oppose par ses effets à la cause qui lui donne naissance. La cause étant l\'approche du pôle Nord (augmentation du flux sortant), la spire crée une face de même nom (face Nord) en regard de l\'aimant pour le repousser et s\'opposer au mouvement d\'approche.',
    bacYear: 'Bac S2',
    theme: 'Loi de Lenz',
  },
  {
    id: 3,
    question:
      'Sur deux rails horizontaux distants d\'une largeur $l$ et reliés par un résistor $R$, une tige mobile glisse à la vitesse constante $v$ dans un champ $\\vec{B}$ vertical descendant. Quelle est l\'expression de la force de Laplace de freinage s\'exerçant sur la tige ?',
    context: 'Rails de Laplace en régime permanent',
    options: [
      '$F_L = \\dfrac{B\\,l\\,v}{R}$',
      '$F_L = \\dfrac{B^2\\,l^2\\,v}{R}$ orientée en sens opposé au vecteur vitesse $\\vec{v}$',
      '$F_L = B^2\\,l^2\\,v\\,R$ orientée dans le sens de $\\vec{v}$',
      '$F_L = 0$ car la vitesse est constante',
    ],
    correctAnswer: 1,
    explanation:
      'La f.é.m. induite est $|e| = B\\,l\\,v$. Le courant induit est $i = \\dfrac{|e|}{R} = \\dfrac{B\\,l\\,v}{R}$. La force de Laplace vaut $F_L = i\\,l\\,B = \\left(\\dfrac{B\\,l\\,v}{R}\\right) l B = \\dfrac{B^2\\,l^2\\,v}{R}$. D\'après la loi de Lenz, cette force est rigoureusement opposée au vecteur vitesse $\\vec{v}$ : c\'est une force de freinage électromagnétique.',
    bacYear: 'Bac S2',
    theme: 'Rails de Laplace',
  },
  {
    id: 4,
    question:
      'Quelle est l\'expression littérale de l\'inductance propre $L$ d\'un solénoïde de longueur $l$, de section $S$ et comportant $N$ spires enroulées dans l\'air (perméabilité $\\mu_0$) ?',
    context: 'Inductance propre d\'une bobine',
    options: [
      '$L = \\mu_0\\,\\dfrac{N\\,S}{l}$',
      '$L = \\mu_0\\,\\dfrac{N^2\\,S}{l} = \\mu_0\\,n^2\\,S\\,l$',
      '$L = \\mu_0\\,\\dfrac{N^2\\,l}{S}$',
      '$L = \\dfrac{N^2\\,S}{\\mu_0\\,l}$',
    ],
    correctAnswer: 1,
    explanation:
      'Le champ propre créé par le solénoïde est $B = \\mu_0 \\dfrac{N}{l} i$. Le flux propre à travers les $N$ spires est $\\Phi_p = N B S = \\mu_0 \\dfrac{N^2 S}{l} i$. Par identification avec $\\Phi_p = L i$, on en déduit immédiatement $L = \\mu_0\\dfrac{N^2 S}{l} = \\mu_0 n^2 V$ (exprimée en Henrys $\\text{H}$).',
    bacYear: 'Bac S2',
    theme: 'Inductance solénoïde',
  },
  {
    id: 5,
    question:
      'Dans un circuit comprenant un générateur idéal de f.é.m. $E$ en série avec une bobine $(L, r)$ et un résistor $R$, quelle est l\'équation différentielle régissant l\'établissement du courant $i(t)$ ?',
    context: 'Dipôle RL — Établissement du courant',
    options: [
      '$\\dfrac{\\mathrm{d}i}{\\mathrm{d}t} - \\dfrac{R+r}{L}i = \\dfrac{E}{L}$',
      '$\\dfrac{\\mathrm{d}i}{\\mathrm{d}t} + \\dfrac{R+r}{L}i = \\dfrac{E}{L} \\iff \\dfrac{\\mathrm{d}i}{\\mathrm{d}t} + \\dfrac{1}{\\tau}i = \\dfrac{I_0}{\\tau}$',
      '$L\\,\\dfrac{\\mathrm{d}i}{\\mathrm{d}t} + (R-r)i = E$',
      '$\\dfrac{\\mathrm{d}^2i}{\\mathrm{d}t^2} + \\dfrac{R+r}{L}i = 0$',
    ],
    correctAnswer: 1,
    explanation:
      'Loi d\'additivité des tensions : $u_R + u_B = E$. Avec $u_R = R i$ et $u_B = r i + L \\dfrac{di}{dt}$, on a $(R+r)i + L\\dfrac{di}{dt} = E$. En divisant par $L$, on obtient $\\dfrac{\\mathrm{d}i}{\\mathrm{d}t} + \\dfrac{R+r}{L}i = \\dfrac{E}{L}$, avec $\\tau = \\dfrac{L}{R+r}$ et $I_0 = \\dfrac{E}{R+r}$.',
    bacYear: 'Bac S2',
    theme: 'Équation différentielle RL',
  },
  {
    id: 6,
    question:
      'Sur l\'oscillogramme de la tension $u_R(t) = R\\,i(t)$ lors de l\'établissement du courant dans un dipôle RL, comment détermine-t-on graphiquement la constante de temps $\\tau$ par la méthode de la tangente ?',
    context: 'Exploitation graphique d\'un oscillogramme',
    options: [
      'C\'est la date où la courbe coupe l\'axe des temps.',
      'C\'est l\'abscisse du point d\'intersection entre la tangente à la courbe à l\'origine ($t = 0$) et l\'asymptote horizontale de régime permanent $u_R = R\\,I_0$.',
      'C\'est la moitié de la durée totale du balayage de l\'oscilloscope.',
      'C\'est l\'inverse de la pente de l\'asymptote.',
    ],
    correctAnswer: 1,
    explanation:
      'L\'équation de la tangente à l\'origine est $y(t) = \\left(\\dfrac{R I_0}{\\tau}\\right) t$. L\'asymptote horizontale a pour équation $y = R I_0$. Leur intersection vérifie $\\dfrac{R I_0}{\\tau} t = R I_0 \\implies t = \\tau$. L\'abscisse de ce point donne rigoureusement la valeur de la constante de temps $\\tau$.',
    bacYear: 'Bac S2',
    theme: 'Constante de temps tau',
  },
  {
    id: 7,
    question:
      'Une bobine d\'inductance $L = 0{,}50\\text{ H}$ est parcourue par un courant d\'intensité constante $I = 2{,}0\\text{ A}$. Quelle est l\'énergie magnétique stockée dans cette bobine ?',
    context: 'Énergie magnétique d\'une bobine',
    options: [
      '$E_m = 0{,}50\\text{ J}$',
      '$E_m = 1{,}0\\text{ J}$',
      '$E_m = 2{,}0\\text{ J}$',
      '$E_m = 4{,}0\\text{ J}$',
    ],
    correctAnswer: 1,
    explanation:
      'L\'énergie emmagasinée dans le champ magnétique d\'une bobine d\'inductance $L$ parcourue par un courant $I$ est donnée par $E_m = \\dfrac{1}{2} L I^2$. Application numérique : $E_m = \\dfrac{1}{2} \\times 0{,}50 \\times (2{,}0)^2 = 0{,}25 \\times 4 = 1{,}0\\text{ J}$.',
    bacYear: 'Bac S2',
    theme: 'Énergie magnétique',
  },
  {
    id: 8,
    question:
      'Pourquoi observe-t-on une étincelle de rupture ou une forte surtension aux bornes d\'une bobine lors de l\'ouverture brutale d\'un circuit sans diode de protection ?',
    context: 'Rupture du courant & surtension',
    options: [
      'Parce que la résistance du résistor devient subitement négative.',
      'Parce que le courant $i(t)$ dans la bobine est strictement continu pour des raisons énergétiques : l\'ouverture brutale impose une variation $\\frac{di}{dt}$ colossale et négative, générant une f.é.m. $e = -L\\frac{di}{dt}$ de plusieurs milliers de volts qui ionise l\'air.',
      'Parce que le générateur injecte une tension double au moment de l\'ouverture.',
      'Parce que le flux magnétique devient infini à l\'ouverture.',
    ],
    correctAnswer: 1,
    explanation:
      'L\'énergie magnétique $E_m = \\frac{1}{2}Li^2$ ne peut pas varier de façon discontinue (ce qui nécessiterait une puissance infinie). À l\'ouverture, le courant tend à chuter à zéro en une durée $dt$ quasi nulle. La dérivée $|di/dt|$ devient gigantesque, engendrant une f.é.m. d\'auto-induction $e = -L\\frac{di}{dt}$ de plusieurs centaines ou milliers de volts qui crée un arc électrique destructeur.',
    bacYear: 'Bac S2',
    theme: 'Surtension d\'ouverture',
  },
];

export default function P6InductionQuizEmbedded() {
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
            Quiz Bac S2 : Induction Électromagnétique &amp; Auto-Induction
          </h2>
          <p className="text-sm text-navy/70 mt-1">
            8 questions — loi de Faraday-Lenz, rails de Laplace, solénoïde et dipôle RL
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
              Induction Électromagnétique &amp; Auto-Induction — Terminale S2
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
              ? 'Excellente maîtrise des lois de Faraday, de Lenz et du dipôle RL ! Vos bases en électromagnétisme sont solides pour le Bac S2.'
              : percentage >= 50
              ? 'Résultats honorables. Révisez le calcul d\'angle sur le flux magnétique $\\Phi$ et la méthode graphique pour la constante de temps $\\tau$.'
              : 'Revenez sur les fiches réflexes et le simulateur virtuel pour bien assimiler la loi de Lenz et le comportement transitoire de la bobine.'}
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
