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
      'Dans un dipôle RLC série alimenté par un GBF délivrant une tension sinusoïdale $u(t)$, on constate que la pulsation imposée vérifie $L\\omega > \\dfrac{1}{C\\omega}$. Quel est le comportement du circuit et le déphasage $\\varphi = \\varphi_u - \\varphi_i$ ?',
    context: 'Nature du circuit et déphasage',
    options: [
      'Le circuit est à prédominance capacitive et la tension $u(t)$ est en retard sur le courant $i(t)$ ($\\varphi < 0$).',
      'Le circuit est à prédominance inductive et la tension $u(t)$ est en avance sur le courant $i(t)$ ($\\varphi > 0$).',
      'Le circuit est à la résonance d\'intensité et la tension $u(t)$ est en phase avec le courant $i(t)$ ($\\varphi = 0$).',
      'Le circuit est apériodique et aucune oscillation permanente ne peut s’établir.',
    ],
    correctAnswer: 1,
    explanation:
      'L\'expression du déphasage est $\\tan\\varphi = \\dfrac{L\\omega - \\frac{1}{C\\omega}}{R_t}$. Si $L\\omega > \\dfrac{1}{C\\omega}$, le numérateur est strictement positif, donc $\\tan\\varphi > 0$ et $\\varphi > 0$. La tension $u(t)$ est donc en avance de phase sur l\'intensité $i(t)$ : le dipôle a un comportement inductif prédominant ($N > N_0$).',
    bacYear: 'Bac S2',
    theme: 'Déphasage & Nature inductive',
  },
  {
    id: 2,
    question:
      'À la résonance d’intensité dans un circuit RLC série, que valent respectivement l’impédance totale $Z$ et le facteur de puissance $\\cos\\varphi$ ?',
    context: 'Conditions à la résonance d\'intensité',
    options: [
      '$Z = 0\\,\\Omega$ et $\\cos\\varphi = 0$.',
      '$Z = L\\omega_0$ et $\\cos\\varphi = 0$.',
      '$Z = R_t$ et $\\cos\\varphi = 1$.',
      '$Z = \\sqrt{L/C}$ et $\\cos\\varphi = \\dfrac{\\sqrt{2}}{2}$.',
    ],
    correctAnswer: 2,
    explanation:
      'À la résonance d’intensité, $L\\omega_0 = \\dfrac{1}{C\\omega_0}$. La réactance s’annule : $X = L\\omega_0 - \\dfrac{1}{C\\omega_0} = 0$. L’impédance atteint son minimum absolu $Z_{\\min} = \\sqrt{R_t^2 + 0^2} = R_t = R + r$. Le déphasage s’annule ($\\varphi = 0$), d\'où le facteur de puissance $\\cos\\varphi = \\cos(0) = \\dfrac{R_t}{Z} = 1$.',
    bacYear: 'Bac S2',
    theme: 'Impédance à la résonance',
  },
  {
    id: 3,
    question:
      'Un circuit RLC série comporte un résistor de résistance $R = 45\\,\\Omega$, une bobine d’inductance $L = 0{,}25\\text{ H}$ et de résistance interne $r = 5\\,\\Omega$, et un condensateur de capacité $C = 10\\,\\mu\\text{F}$. Le GBF délivre une tension efficace $U = 12\\text{ V}$. Que vaut l’intensité efficace du courant à la résonance $I_0$ ?',
    context: 'Calcul du courant de résonance',
    options: [
      '$I_0 = 0{,}12\\text{ A} = 120\\text{ mA}$',
      '$I_0 = 0{,}24\\text{ A} = 240\\text{ mA}$',
      '$I_0 = 0{,}27\\text{ A} = 267\\text{ mA}$',
      '$I_0 = 2{,}40\\text{ A} = 2\\,400\\text{ mA}$',
    ],
    correctAnswer: 1,
    explanation:
      'La résistance totale du circuit est $R_t = R + r = 45 + 5 = 50\\,\\Omega$. À la résonance d’intensité, l\'impédance est minimale : $Z_{\\min} = R_t = 50\\,\\Omega$. L’intensité efficace vaut donc $I_0 = \\dfrac{U}{R_t} = \\dfrac{12\\text{ V}}{50\\,\\Omega} = 0{,}24\\text{ A} = 240\\text{ mA}$.',
    bacYear: 'Bac S2',
    theme: 'Loi d\'Ohm à la résonance',
  },
  {
    id: 4,
    question:
      'Dans un circuit RLC série soumis à une tension efficace $U = 100\\text{ V}$, l’impédance mesurée est $Z = 50\\,\\Omega$ et la résistance totale est $R_t = 40\\,\\Omega$. Quelle est la puissance active moyenne $\\mathcal{P}$ consommée par l’ensemble du dipôle ?',
    context: 'Bilan de puissance en courant alternatif',
    options: [
      '$\\mathcal{P} = 200\\text{ W}$',
      '$\\mathcal{P} = 160\\text{ W}$',
      '$\\mathcal{P} = 250\\text{ W}$',
      '$\\mathcal{P} = 80\\text{ W}$',
    ],
    correctAnswer: 1,
    explanation:
      'L\'intensité efficace vaut $I = \\dfrac{U}{Z} = \\dfrac{100}{50} = 2\\text{ A}$. Le facteur de puissance vaut $\\cos\\varphi = \\dfrac{R_t}{Z} = \\dfrac{40}{50} = 0{,}8$. La puissance active moyenne consommée s\'exprime par $\\mathcal{P} = U\\cdot I\\cdot\\cos\\varphi = 100 \\times 2 \\times 0{,}8 = 160\\text{ W}$. On retrouve la même valeur par effet Joule : $\\mathcal{P} = R_t\\cdot I^2 = 40 \\times 2^2 = 160\\text{ W}$.',
    bacYear: 'Bac S2',
    theme: 'Puissance active & Facteur de puissance',
  },
  {
    id: 5,
    question:
      'Un dipôle RLC série possède une bobine d\'inductance $L = 0{,}10\\text{ H}$ et de résistance $r = 4{,}0\\,\\Omega$, un résistor $R = 16{,}0\\,\\Omega$, et résonne à la fréquence $N_0 = 500\\text{ Hz}$. Quelle est la largeur de la bande passante à $-3\\text{ dB}$ ($\\Delta N$) ?',
    context: 'Sélectivité et bande passante',
    options: [
      '$\\Delta N = 10{,}0\\text{ Hz}$',
      '$\\Delta N = 31{,}8\\text{ Hz}$',
      '$\\Delta N = 63{,}7\\text{ Hz}$',
      '$\\Delta N = 100\\text{ Hz}$',
    ],
    correctAnswer: 1,
    explanation:
      'La résistance totale est $R_t = R + r = 16 + 4 = 20\\,\\Omega$. La formule directe de la bande passante à $-3\\text{ dB}$ est $\\Delta N = \\dfrac{R_t}{2\\pi L} = \\dfrac{20}{2\\pi \\times 0{,}10} = \\dfrac{200}{2\\pi} = \\dfrac{100}{\\pi} \\approx 31{,}83\\text{ Hz}$.',
    bacYear: 'Bac S2',
    theme: 'Bande passante à -3 dB',
  },
  {
    id: 6,
    question:
      'Un circuit RLC série alimenté sous $U = 6{,}0\\text{ V}$ possède un facteur de qualité $Q = 15$. Que vaut la tension efficace $U_{C0}$ aux bornes du condensateur à la résonance d’intensité ?',
    context: 'Surtension à la résonance',
    options: [
      '$U_{C0} = 0{,}40\\text{ V}$ (la tension est atténuée)',
      '$U_{C0} = 6{,}0\\text{ V}$ (la tension est identique à celle du GBF)',
      '$U_{C0} = 90\\text{ V}$ (phénomène de surtension)',
      '$U_{C0} = 150\\text{ V}$',
    ],
    correctAnswer: 2,
    explanation:
      'À la résonance, la tension efficace aux bornes du condensateur vérifie la relation fondamentale $U_{C0} = Q\\cdot U$. Avec $Q = 15$ et $U = 6{,}0\\text{ V}$, on obtient $U_{C0} = 15 \\times 6{,}0 = 90\\text{ V}$. C\'est le phénomène de surtension à la résonance ($U_{C0} \\gg U$), qui peut provoquer le claquage diélectrique du composant.',
    bacYear: 'Bac S2',
    theme: 'Surtension & Facteur Q',
  },
];

export default function P8RlcForceesQuizEmbedded() {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qId: number]: number }>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentQ = QUESTIONS[currentIdx];
  const selectedAnswer = selectedAnswers[currentQ.id];
  const isAnswered = selectedAnswer !== undefined;

  const handleSelectOption = (optIdx: number) => {
    if (showExplanation) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: optIdx }));
  };

  const handleValidate = () => {
    setShowExplanation(true);
  };

  const handleNext = () => {
    setShowExplanation(false);
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowExplanation(false);
    setCurrentIdx(0);
    setIsFinished(false);
  };

  const score = Object.entries(selectedAnswers).reduce((acc, [qId, optIdx]) => {
    const q = QUESTIONS.find((item) => item.id === Number(qId));
    return q && q.correctAnswer === optIdx ? acc + 1 : acc;
  }, 0);

  const percentage = Math.round((score / QUESTIONS.length) * 100);

  return (
    <div className="my-8 p-5 sm:p-7 rounded-3xl bg-white border border-navy/10 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-navy/10 gap-2">
        <div>
          <span className="text-[11px] font-black uppercase tracking-wider text-blue-700">
            Auto-Évaluation Officielle Bac S2
          </span>
          <h3 className="text-lg sm:text-xl font-black text-navy">
            Quiz d&apos;Entraînement : Oscillations Forcées &amp; Résonance RLC
          </h3>
        </div>
        <div className="text-xs font-bold text-navy/70 self-start sm:self-auto px-3 py-1 bg-surface rounded-full border border-navy/10">
          Question {currentIdx + 1} / {QUESTIONS.length}
        </div>
      </div>

      {!isFinished ? (
        <div className="mt-6 space-y-6">
          {/* Question context and title */}
          <div className="space-y-2">
            {currentQ.context && (
              <span className="inline-block text-[11px] font-bold text-navy/60 uppercase tracking-wider bg-surface px-2.5 py-1 rounded-md border border-navy/5">
                {currentQ.context}
              </span>
            )}
            <div className="text-sm sm:text-base font-semibold text-navy leading-relaxed">
              <MathRenderer content={currentQ.question} />
            </div>
          </div>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, oIdx) => {
              const isSelected = selectedAnswer === oIdx;
              const isCorrect = currentQ.correctAnswer === oIdx;

              let btnStyle =
                'border-navy/10 bg-surface/30 hover:bg-surface hover:border-navy/30 text-navy';
              if (showExplanation) {
                if (isCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'border-rose-400 bg-rose-50 text-rose-950';
                } else {
                  btnStyle = 'border-navy/5 bg-surface/20 text-navy/40 opacity-60';
                }
              } else if (isSelected) {
                btnStyle = 'border-navy bg-navy/5 text-navy font-semibold shadow-sm';
              }

              return (
                <button
                  key={oIdx}
                  onClick={() => handleSelectOption(oIdx)}
                  disabled={showExplanation}
                  className={`w-full p-3.5 sm:p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${btnStyle}`}
                >
                  <span className="flex-shrink-0 w-6 h-6 rounded-full border border-current flex items-center justify-center text-xs font-bold mt-0.5">
                    {String.fromCharCode(65 + oIdx)}
                  </span>
                  <div className="flex-1 leading-relaxed">
                    <MathRenderer content={opt} />
                  </div>
                  {showExplanation && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                  )}
                  {showExplanation && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation panel */}
          {showExplanation && (
            <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/70 border border-blue-200/70 text-xs sm:text-sm space-y-2">
              <div className="font-bold text-blue-950 flex items-center gap-1.5 uppercase text-[11px] tracking-wider">
                <span>Justification &amp; Barème Bac S2</span>
              </div>
              <div className="text-blue-900/90 leading-relaxed font-medium">
                <MathRenderer content={currentQ.explanation} />
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-navy/10">
            {!showExplanation ? (
              <button
                onClick={handleValidate}
                disabled={!isAnswered}
                className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                  isAnswered
                    ? 'bg-navy text-white hover:bg-navy/90 shadow-sm'
                    : 'bg-surface text-navy/40 border border-navy/10 cursor-not-allowed'
                }`}
              >
                Vérifier ma réponse
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-5 py-2.5 rounded-2xl bg-navy text-white hover:bg-navy/90 text-xs sm:text-sm font-bold transition-all flex items-center gap-2 shadow-sm"
              >
                <span>{currentIdx < QUESTIONS.length - 1 ? 'Question suivante' : 'Voir le bilan'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Final summary screen */
        <div className="mt-8 text-center space-y-6 max-w-md mx-auto py-4">
          <div className="w-16 h-16 rounded-full bg-blue-50 border-2 border-blue-300 flex items-center justify-center mx-auto">
            <Award className="w-8 h-8 text-blue-600" />
          </div>

          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-navy">Bilan de l&apos;évaluation</h3>
            <p className="text-sm text-navy/70">
              Oscillations Électriques Forcées en Courant Alternatif (RLC série) — Terminale S2
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
              ? 'Excellente maîtrise de Fresnel, de la résonance d\'intensité, de la bande passante et du phénomène de surtension ! Vous êtes parfaitement au point pour le Bac S2.'
              : percentage >= 50
              ? 'Résultats honorables. Revoyez les formules de la bande passante $\\Delta N = R_t/(2\\pi L)$ et de la surtension $U_{C0} = Q\\cdot U$.'
              : 'Revenez sur les fiches réflexes et le simulateur interactif de Fresnel pour bien visualiser les vecteurs tournants et le calcul de l\'impédance $Z$.'}
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
