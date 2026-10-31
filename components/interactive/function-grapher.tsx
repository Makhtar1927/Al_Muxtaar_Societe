'use client';

import React, { useState } from 'react';

type FunctionKey = 'ln' | 'exp' | 'poly' | 'inv';

interface FuncConfig {
  name: string;
  formula: string;
  derivFormula: string;
  fn: (x: number) => number;
  dfn: (x: number) => number;
  domain: [number, number];
  defaultX: number;
}

const FUNCTIONS: Record<FunctionKey, FuncConfig> = {
  ln: {
    name: 'Fonction Logarithme népérien',
    formula: 'f(x) = ln(x)',
    derivFormula: "f'(x) = 1/x",
    fn: (x) => (x > 0 ? Math.log(x) : NaN),
    dfn: (x) => (x > 0 ? 1 / x : NaN),
    domain: [0.2, 5],
    defaultX: 1,
  },
  exp: {
    name: 'Fonction Exponentielle',
    formula: 'f(x) = e^x',
    derivFormula: "f'(x) = e^x",
    fn: (x) => Math.exp(x),
    dfn: (x) => Math.exp(x),
    domain: [-2.5, 2],
    defaultX: 0,
  },
  poly: {
    name: 'Polynôme du second degré',
    formula: 'f(x) = x² - 2x',
    derivFormula: "f'(x) = 2x - 2",
    fn: (x) => x * x - 2 * x,
    dfn: (x) => 2 * x - 2,
    domain: [-1.5, 3.5],
    defaultX: 2,
  },
  inv: {
    name: 'Fonction Inverse',
    formula: 'f(x) = 1/x',
    derivFormula: "f'(x) = -1/x²",
    fn: (x) => (x !== 0 ? 1 / x : NaN),
    dfn: (x) => (x !== 0 ? -1 / (x * x) : NaN),
    domain: [0.3, 4],
    defaultX: 1,
  },
};

export default function FunctionGrapher() {
  const [selectedKey, setSelectedKey] = useState<FunctionKey>('ln');
  const cfg = FUNCTIONS[selectedKey];

  const [x0, setX0] = useState<number>(cfg.defaultX);

  // SVG coordinate transformation
  const width = 360;
  const height = 240;
  const xMin = cfg.domain[0] - 0.5;
  const xMax = cfg.domain[1] + 0.5;
  const yMin = -2;
  const yMax = 5;

  function toSvgX(x: number) {
    return ((x - xMin) / (xMax - xMin)) * width;
  }
  function toSvgY(y: number) {
    return height - ((y - yMin) / (yMax - yMin)) * height;
  }

  // Generate curve points
  const points: [number, number][] = [];
  const steps = 120;
  for (let i = 0; i <= steps; i++) {
    const x = xMin + (i / steps) * (xMax - xMin);
    const y = cfg.fn(x);
    if (!isNaN(y) && isFinite(y)) {
      points.push([toSvgX(x), toSvgY(y)]);
    }
  }

  const pathD = points.reduce((acc, [px, py], idx) => {
    return idx === 0 ? `M ${px.toFixed(1)} ${py.toFixed(1)}` : `${acc} L ${px.toFixed(1)} ${py.toFixed(1)}`;
  }, '');

  // Tangent at x0
  const y0 = cfg.fn(x0);
  const slope = cfg.dfn(x0);

  // Tangent points
  const tanX1 = x0 - 1.2;
  const tanY1 = y0 + slope * (tanX1 - x0);
  const tanX2 = x0 + 1.2;
  const tanY2 = y0 + slope * (tanX2 - x0);

  return (
    <div className="bg-white rounded-2xl border border-navy/10 p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy/10 pb-3">
        <div>
          <h3 className="font-bold text-navy text-base flex items-center gap-2">
            <span>📈</span> Visualiseur de Courbes & Tangentes
          </h3>
          <p className="text-xs text-text/60">
            Observez la courbe représentative et le coefficient directeur de la tangente au point d&apos;abscisse x₀.
          </p>
        </div>

        {/* Function selector tabs */}
        <div className="flex flex-wrap gap-1">
          {(Object.keys(FUNCTIONS) as FunctionKey[]).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => {
                setSelectedKey(k);
                setX0(FUNCTIONS[k].defaultX);
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                selectedKey === k
                  ? 'bg-navy text-white'
                  : 'bg-surface border border-navy/10 text-navy hover:bg-navy/5'
              }`}
            >
              {FUNCTIONS[k].formula.split('=')[1]?.trim() ?? k}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* SVG Graph */}
        <div className="flex justify-center bg-surface/50 rounded-xl p-3 border border-navy/5">
          <svg width={width} height={height} className="overflow-hidden select-none">
            {/* Axis X (y = 0) */}
            <line
              x1="0"
              y1={toSvgY(0)}
              x2={width}
              y2={toSvgY(0)}
              stroke="#243447"
              strokeWidth="1.5"
            />
            {/* Axis Y (x = 0) */}
            <line
              x1={toSvgX(0)}
              y1="0"
              x2={toSvgX(0)}
              y2={height}
              stroke="#243447"
              strokeWidth="1.5"
            />

            {/* Function Curve */}
            <path d={pathD} fill="none" stroke="#00B8A9" strokeWidth="2.5" />

            {/* Tangent Line */}
            <line
              x1={toSvgX(tanX1)}
              y1={toSvgY(tanY1)}
              x2={toSvgX(tanX2)}
              y2={toSvgY(tanY2)}
              stroke="#F0654C"
              strokeWidth="2"
              strokeDasharray="4 2"
            />

            {/* Point (x0, y0) */}
            <circle
              cx={toSvgX(x0)}
              cy={toSvgY(y0)}
              r="5"
              fill="#F7B731"
              stroke="#243447"
              strokeWidth="2"
            />
          </svg>
        </div>

        {/* Real-time details */}
        <div className="space-y-4">
          <div className="rounded-xl bg-surface p-3 border border-navy/10 space-y-1 text-xs">
            <p className="font-bold text-navy text-sm">{cfg.name}</p>
            <p className="text-turquoise font-mono font-bold">{cfg.formula}</p>
            <p className="text-text/60 font-mono">Dérivée : {cfg.derivFormula}</p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-surface border border-navy/10">
              <span className="text-[11px] font-bold text-navy/60 uppercase">Point x₀</span>
              <p className="text-lg font-black text-navy mt-0.5">{x0.toFixed(2)}</p>
              <span className="text-[10px] text-text/50">f(x₀) = {y0.toFixed(2)}</span>
            </div>
            <div className="p-3 rounded-xl bg-surface border border-navy/10">
              <span className="text-[11px] font-bold text-coral uppercase">Pente f&apos;(x₀)</span>
              <p className="text-lg font-black text-coral mt-0.5">{slope.toFixed(2)}</p>
              <span className="text-[10px] text-text/50">Coeff. directeur</span>
            </div>
          </div>

          {/* Slider for x0 */}
          <div>
            <label className="flex justify-between text-xs font-semibold text-navy mb-1">
              <span>Position x₀ : {x0.toFixed(2)}</span>
              <span className="text-turquoise">Glisser pour déplacer</span>
            </label>
            <input
              type="range"
              min={cfg.domain[0]}
              max={cfg.domain[1]}
              step="0.05"
              value={x0}
              onChange={(e) => setX0(Number(e.target.value))}
              className="w-full h-2 bg-navy/10 rounded-lg appearance-none cursor-pointer accent-turquoise"
            />
          </div>

          <div className="p-2.5 rounded-lg bg-navy/5 text-[11px] text-text/75">
            <span className="font-semibold text-navy">Équation de la tangente (T) : </span>
            <code className="text-coral font-bold font-mono">
              y = {slope.toFixed(2)}(x - {x0.toFixed(2)}) + {y0.toFixed(2)}
            </code>
          </div>
        </div>
      </div>
    </div>
  );
}

