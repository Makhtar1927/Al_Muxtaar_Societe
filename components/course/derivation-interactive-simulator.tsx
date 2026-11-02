'use client';

import React, { useState } from 'react';
import StudyIcon from '@/components/ui/study-icon';
import MathRenderer from '@/components/course/math-renderer';

interface DerivFunction {
  id: string;
  name: string;
  expressionMd: string;
  derivativeMd: string;
  tangentEquationMd: (x0: number, y0: number, slope: number) => string;
  minX: number;
  maxX: number;
  step: number;
  criticalPoints: number[];
  fn: (x: number) => number;
  dfn: (x: number) => number;
  comment: string;
  wolofTip: string;
}

const DERIV_FUNCTIONS: DerivFunction[] = [
  {
    id: 'poly',
    name: 'f(x) = x³ - 3x (Polynôme classique Bac)',
    expressionMd: 'f(x) = x^3 - 3x',
    derivativeMd: "f'(x) = 3x^2 - 3 = 3(x - 1)(x + 1)",
    tangentEquationMd: (x0, y0, m) =>
      `y = ${m.toFixed(2)}(x - ${x0.toFixed(2)}) + (${y0.toFixed(2)})`,
    minX: -2.5,
    maxX: 2.5,
    step: 0.1,
    criticalPoints: [-1, 1],
    fn: (x) => Math.pow(x, 3) - 3 * x,
    dfn: (x) => 3 * Math.pow(x, 2) - 3,
    comment:
      "Points critiques en $x = -1$ (maximum local $f(-1) = 2$) et $x = 1$ (minimum local $f(1) = -2$). La tangente y est strictement horizontale ($f'(x) = 0$).",
    wolofTip:
      "« Su f'(x) = 0 ci x = -1 ak x = 1, tangente bi day tëje noom ci kaw kocc bi (maximum) ak ci suuf xur bi (minimum). Yoon bi day soppiku foofu ! »",
  },
  {
    id: 'exp',
    name: 'g(x) = (x - 1)e^x (Fonction exponentielle Bac)',
    expressionMd: 'g(x) = (x - 1)e^x',
    derivativeMd: "g'(x) = 1 \\cdot e^x + (x - 1)e^x = x e^x",
    tangentEquationMd: (x0, y0, m) =>
      `y = ${m.toFixed(2)}(x - ${x0.toFixed(2)}) + (${y0.toFixed(2)})`,
    minX: -2.5,
    maxX: 1.5,
    step: 0.1,
    criticalPoints: [0],
    fn: (x) => (x - 1) * Math.exp(x),
    dfn: (x) => x * Math.exp(x),
    comment:
      "Le signe de $g'(x)$ dépend uniquement de $x$ car $e^x > 0$ pour tout $x$. Minimum absolu atteint en $x = 0$ avec $g(0) = -1$.",
    wolofTip:
      "« e^x dafa positif saa su nekk (> 0), kon x rekk mooy joxe signe bi ci g'(x) = x e^x. Bala 0 yangi wàcc, ginaaw 0 yangi yéeg ! »",
  },
  {
    id: 'quotient',
    name: 'h(x) = (x² - 1) / (x² + 1) (Quotient rationnel)',
    expressionMd: 'h(x) = \\dfrac{x^2 - 1}{x^2 + 1}',
    derivativeMd: "h'(x) = \\dfrac{2x(x^2 + 1) - (x^2 - 1)(2x)}{(x^2 + 1)^2} = \\dfrac{4x}{(x^2 + 1)^2}",
    tangentEquationMd: (x0, y0, m) =>
      `y = ${m.toFixed(2)}(x - ${x0.toFixed(2)}) + (${y0.toFixed(2)})`,
    minX: -3,
    maxX: 3,
    step: 0.1,
    criticalPoints: [0],
    fn: (x) => (Math.pow(x, 2) - 1) / (Math.pow(x, 2) + 1),
    dfn: (x) => (4 * x) / Math.pow(Math.pow(x, 2) + 1, 2),
    comment:
      "Dénominateur toujours strictement positif $((x^2 + 1)^2 > 0)$. Donc $h'(x)$ a le même signe que $4x$. Tangente horizontale en $x = 0$.",
    wolofTip:
      "« Dénominateur bi (x² + 1)² dafa positif te du tëju muk, kon 4x rekk mooy joxe signe bi. Ci 0 la minimum bi nekk fu tangente bi di doon horizontale ! »",
  },
];

export default function DerivationInteractiveSimulator() {
  const [selectedFunc, setSelectedFunc] = useState<DerivFunction>(DERIV_FUNCTIONS[0]);
  const [pointX, setPointX] = useState<number>(0.5);

  const fx = selectedFunc.fn(pointX);
  const dfx = selectedFunc.dfn(pointX);

  const isCritical = Math.abs(dfx) < 0.05;
  const isIncreasing = dfx > 0.05;
  const isDecreasing = dfx < -0.05;

  return (
    <div className="my-6 rounded-3xl border-2 border-turquoise/30 bg-gradient-to-b from-white via-surface/30 to-surface/80 p-4 sm:p-6 shadow-md">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy/10 pb-3">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-turquoise bg-turquoise/15 px-2.5 py-0.5 rounded-full border border-turquoise/20">
            Laboratoire Interactif : Dérivation & Pente
          </span>
          <h3 className="text-base sm:text-lg font-bold text-navy mt-1 flex items-center gap-2">
            <StudyIcon name="formule_cle" size={20} className="text-turquoise" />
            <span>Simulateur Tactile de Tangente et de Variation</span>
          </h3>
        </div>
        <span className="text-xs font-semibold text-text/60 bg-white/80 px-2.5 py-1 rounded-lg border border-navy/10">
          Bac S2 Sénégal
        </span>
      </div>

      {/* Function selection */}
      <div className="mt-4">
        <label className="text-xs font-bold uppercase tracking-wider text-navy/70 block mb-2">
          Choisir une fonction type Bac :
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {DERIV_FUNCTIONS.map((f) => (
            <button
              key={f.id}
              onClick={() => {
                setSelectedFunc(f);
                setPointX(0.5);
              }}
              className={`p-2.5 rounded-xl text-left border text-xs font-bold transition-all active:scale-95 ${
                selectedFunc.id === f.id
                  ? 'bg-navy text-white border-navy shadow-sm'
                  : 'bg-white text-navy/80 border-navy/15 hover:border-turquoise'
              }`}
            >
              <div className="font-extrabold truncate">{f.name.split(' (')[0]}</div>
              <div className="text-[10px] opacity-75 font-normal truncate">
                {f.name.includes('(') ? `(${f.name.split('(')[1]}` : ''}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Equations Card */}
      <div className="mt-4 bg-white rounded-2xl border border-navy/10 p-4 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-text/60">
            Fonction étudiée
          </span>
          <div className="mt-1">
            <MathRenderer content={`$${selectedFunc.expressionMd}$`} />
          </div>
        </div>
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-text/60">
            Fonction dérivée calculée
          </span>
          <div className="mt-1">
            <MathRenderer content={`$${selectedFunc.derivativeMd}$`} />
          </div>
        </div>
      </div>

      {/* Interactive slider */}
      <div className="mt-5 bg-gradient-to-r from-navy/5 to-turquoise/10 rounded-2xl p-4 sm:p-5 border border-navy/10">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <StudyIcon name="rigueur_compas" size={18} className="text-navy" />
            <span className="text-xs sm:text-sm font-bold text-navy flex items-center gap-1">
              Position du point d&apos;abscisse <MathRenderer content="$x_0$" /> :
            </span>
          </div>
          <span className="font-mono font-black text-sm sm:text-base px-3 py-1 rounded-lg bg-navy text-white shadow-inner">
            x₀ = {pointX.toFixed(2)}
          </span>
        </div>

        <input
          type="range"
          min={selectedFunc.minX}
          max={selectedFunc.maxX}
          step={selectedFunc.step}
          value={pointX}
          onChange={(e) => setPointX(parseFloat(e.target.value))}
          className="w-full h-3 bg-navy/20 rounded-lg appearance-none cursor-pointer accent-turquoise my-2"
        />

        <div className="flex justify-between text-[11px] font-semibold text-text/60">
          <span>Min : {selectedFunc.minX}</span>
          <span className="text-turquoise font-bold">Déplacez pour observer la pente</span>
          <span>Max : {selectedFunc.maxX}</span>
        </div>
      </div>

      {/* Dynamic results & variation card */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Value f(x) */}
        <div className="bg-white rounded-2xl border border-navy/10 p-3.5 text-center">
          <div className="text-[10px] font-bold uppercase tracking-wider text-text/50">
            <MathRenderer content="Image $f(x_0)$" />
          </div>
          <div className="mt-1 font-mono text-lg font-black text-navy">
            {fx.toFixed(3)}
          </div>
          <span className="text-[10px] text-text/60">Ordonnée du point</span>
        </div>

        {/* Slope f'(x) */}
        <div className="bg-white rounded-2xl border border-navy/10 p-3.5 text-center">
          <div className="text-[10px] font-bold uppercase tracking-wider text-text/50">
            <MathRenderer content="Nombre dérivé $f'(x_0)$" />
          </div>
          <div className="mt-1 font-mono text-lg font-black text-turquoise">
            {dfx.toFixed(3)}
          </div>
          <span className="text-[10px] text-text/60">Pente de la tangente</span>
        </div>

        {/* Variation state */}
        <div
          className={`rounded-2xl border p-3.5 text-center flex flex-col justify-center items-center transition-all ${
            isCritical
              ? 'bg-amber-50 border-amber-300 text-amber-900'
              : isIncreasing
              ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
              : 'bg-rose-50 border-rose-300 text-rose-900'
          }`}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider">
            Comportement local
          </span>
          <div className="mt-1 font-extrabold text-sm sm:text-base flex items-center gap-1.5">
            {isCritical && (
              <>
                <StudyIcon name="cible_reflexe" size={16} />
                <span>Extremum / Tangente Horizontale</span>
              </>
            )}
            {isIncreasing && (
              <>
                <span className="text-lg">↗</span>
                <span>Strictement Croissante</span>
              </>
            )}
            {isDecreasing && (
              <>
                <span className="text-lg">↘</span>
                <span>Strictement Décroissante</span>
              </>
            )}
          </div>
          <div className="text-[10px] opacity-80 mt-0.5">
            <MathRenderer
              content={
                isCritical
                  ? "$f'(x_0) = 0$"
                  : isIncreasing
                  ? "$f'(x_0) > 0$"
                  : "$f'(x_0) < 0$"
              }
            />
          </div>
        </div>
      </div>

      {/* Tangent equation */}
      <div className="mt-4 bg-navy/5 border border-navy/15 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-1.5">
          <StudyIcon name="cle_solution" size={16} className="text-navy" />
          <span className="text-xs font-bold text-navy uppercase tracking-wider">
            Équation cartésienne de la tangente en $(x_0, f(x_0))$ :
          </span>
        </div>
        <div className="bg-white rounded-xl p-3 border border-navy/10 overflow-x-auto text-center font-mono font-bold text-navy">
          <MathRenderer
            content={`$T : y = f'(x_0)(x - x_0) + f(x_0) \\implies y = ${dfx.toFixed(2)}(x - ${pointX.toFixed(2)}) + (${fx.toFixed(2)})$`}
          />
        </div>
      </div>

      {/* Pedagogical comment */}
      <div className="mt-4 bg-turquoise/5 border border-turquoise/20 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-1">
          <StudyIcon name="conseil_professeur" size={16} className="text-turquoise" />
          <span className="text-xs font-bold text-turquoise uppercase tracking-wider">
            Remarque clé pour l&apos;Office du Bac :
          </span>
        </div>
        <MathRenderer content={selectedFunc.comment} />
      </div>

      {/* Décryptage Wolof */}
      <div className="mt-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-950">
        <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
          <span>🇸🇳</span>
          <span>Xam-xam ci Wolof (Pente ak Tangente) :</span>
        </div>
        <p className="italic text-amber-900 leading-relaxed font-medium">
          {selectedFunc.wolofTip}
        </p>
      </div>
    </div>
  );
}
