'use client';

import React, { useState } from 'react';
import StudyIcon from '@/components/ui/study-icon';
import MathRenderer from '@/components/course/math-renderer';

interface EquadiffModel {
  id: string;
  name: string;
  badge: string;
  equationMd: string;
  solutionFormulaMd: string;
  description: string;
  defaultA: number;
  defaultB: number;
  minA: number;
  maxA: number;
  stepA: number;
  labelA: string;
  minB: number;
  maxB: number;
  stepB: number;
  labelB: string;
  compute: (x: number, a: number, b: number) => number;
  comment: (a: number, b: number) => string;
  wolofTip: string;
}

const EQUADIFF_MODELS: EquadiffModel[] = [
  {
    id: 'first_order',
    name: "1er Ordre : y' + a·y = b",
    badge: '1er Ordre',
    equationMd: "y' + a y = b",
    solutionFormulaMd: 'y(x) = C \\cdot e^{-ax} + \\dfrac{b}{a}',
    description: "Modèle exponentiel avec asymptote horizontale en y = b/a (ou b si a=1). On fixe ici C = 2 pour observer la convergence.",
    defaultA: 1.0,
    defaultB: 2.0,
    minA: 0.2,
    maxA: 3.0,
    stepA: 0.1,
    labelA: 'Coefficient a (amortissement)',
    minB: -4.0,
    maxB: 4.0,
    stepB: 0.5,
    labelB: 'Second membre b (niveau asymptote)',
    compute: (x, a, b) => 2 * Math.exp(-a * x) + b / a,
    comment: (a, b) =>
      `Avec $a = ${a.toFixed(1)}$ et $b = ${b.toFixed(1)}$, l'asymptote horizontale en $+\\infty$ est la droite $y = \\frac{b}{a} = ${(b / a).toFixed(2)}$. La solution décroît exponentiellement vers cette limite.`,
    wolofTip: '« Équation 1er ordre dafa melni jënd ak jaay ci marché : y(x) mooy jëkkër bi dafay dem ndànk ci asymptote bi (b/a). Coefficient a moo wax gaawu convergence bi — a bu mag, gawaan bu sedd la jëkkër bi taax ci b/a ! »',
  },
  {
    id: 'harmonic',
    name: "Oscillateur Harmonique : y'' + ω²y = 0",
    badge: '2nd Ordre',
    equationMd: "y'' + \\omega^2 y = 0",
    solutionFormulaMd: 'y(x) = A \\cos(\\omega x) + B \\sin(\\omega x)',
    description: "Oscillations périodiques pures sans amortissement. Vous pouvez modifier la pulsation propre ω et l'amplitude initiale A.",
    defaultA: 1.5,
    defaultB: 2.0,
    minA: 0.5,
    maxA: 4.0,
    stepA: 0.25,
    labelA: 'Pulsation ω (rad/s)',
    minB: 0.5,
    maxB: 4.0,
    stepB: 0.5,
    labelB: 'Amplitude A = y(0)',
    compute: (x, a, b) => b * Math.cos(a * x),
    comment: (a, b) =>
      `Pulsation $\\omega = ${a.toFixed(2)}\\text{ rad/s}$. La période temporelle propre des oscillations est $T = \\frac{2\\pi}{\\omega} = ${( (2 * Math.PI) / a ).toFixed(2)}\\text{ s}$, d'amplitude maximale $y_{\\max} = ${b.toFixed(1)}$.`,
    wolofTip: '« Oscillateur harmonique dafa melni pirogue ci houle Soumbédioune bu amul fànn : dafay yéngu di ñëw di dellu ci diggante +A ak -A dëgg dëgg. ω moo wax vitesse yéngu bi ! »',
  },
  {
    id: 'damped',
    name: "Amorti : y'' + 2λy' + ω₀²y = 0",
    badge: 'Physique & Analyse',
    equationMd: "y'' + 2\\lambda y' + \\omega_0^2 y = 0",
    solutionFormulaMd: 'y(x) = A \\cdot e^{-\\lambda x} \\cos(\\Omega x)',
    description: "Régime pseudo-périodique : oscillations amorties par frottement fluide avec enveloppe exponentielle décroissante.",
    defaultA: 0.4,
    defaultB: 3.0,
    minA: 0.1,
    maxA: 1.0,
    stepA: 0.05,
    labelA: 'Coefficient d amortissement λ',
    minB: 1.0,
    maxB: 4.0,
    stepB: 0.5,
    labelB: 'Pulsation propre ω₀',
    compute: (x, a, b) => {
      const omega = Math.sqrt(Math.max(0.1, b * b - a * a));
      return 3 * Math.exp(-a * x) * Math.cos(omega * x);
    },
    comment: (a, b) => {
      const omega = Math.sqrt(Math.max(0.1, b * b - a * a));
      return `Amortissement $\\lambda = ${a.toFixed(2)}$ et $\\omega_0 = ${b.toFixed(1)}$. Pseudo-pulsation $\\Omega = \\sqrt{\\omega_0^2 - \\lambda^2} = ${omega.toFixed(2)}\\text{ rad/s}$. L'enveloppe de décroissance est bornée par $\\pm 3 e^{-${a.toFixed(2)} x}$.`;
    },
    wolofTip: '« Oscillations amorties dafa melni gal buy jël forse ci ndox : dafay yéngu waaye yéngu-yéngu bi day wàcc ndànk ba taxaw ndax frottement bi (λ). Exponentielle bi mooy enveloppe buy dindi doole bi ! »',
  },
];

export default function EquadiffInteractiveSimulator() {
  const [activeModelId, setActiveModelId] = useState<string>('first_order');
  const activeModel = EQUADIFF_MODELS.find((m) => m.id === activeModelId) ?? EQUADIFF_MODELS[0];

  const [paramA, setParamA] = useState<number>(activeModel.defaultA);
  const [paramB, setParamB] = useState<number>(activeModel.defaultB);

  const handleSelectModel = (id: string) => {
    const mod = EQUADIFF_MODELS.find((m) => m.id === id);
    if (mod) {
      setActiveModelId(id);
      setParamA(mod.defaultA);
      setParamB(mod.defaultB);
    }
  };

  // Dimensions graphiques SVG
  const width = 640;
  const height = 320;
  const paddingLeft = 55;
  const paddingRight = 25;
  const paddingTop = 25;
  const paddingBottom = 40;

  const graphW = width - paddingLeft - paddingRight;
  const graphH = height - paddingTop - paddingBottom;

  const xMin = 0;
  const xMax = 6;
  const yMin = -4.5;
  const yMax = 4.5;

  const toSvgX = (x: number) => paddingLeft + ((x - xMin) / (xMax - xMin)) * graphW;
  const toSvgY = (y: number) => paddingTop + graphH - ((y - yMin) / (yMax - yMin)) * graphH;

  // Calcul du tracé de la courbe
  const sampleCount = 120;
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i <= sampleCount; i++) {
    const xVal = xMin + (i / sampleCount) * (xMax - xMin);
    const yVal = activeModel.compute(xVal, paramA, paramB);
    const clampedY = Math.max(yMin - 1, Math.min(yMax + 1, yVal));
    points.push({ x: toSvgX(xVal), y: toSvgY(clampedY) });
  }

  const pathD = points.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}` : `${acc} L ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`;
  }, '');

  // Tracé asymptote pour le 1er ordre
  const asymptoteY = activeModel.id === 'first_order' ? paramB / paramA : null;

  return (
    <div className="bg-white rounded-2xl border border-navy/10 p-5 sm:p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy/10 pb-4">
        <div className="flex items-start sm:items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-turquoise/15 flex items-center justify-center text-turquoise shrink-0 mt-0.5 sm:mt-0 p-1.5">
            <StudyIcon name="courbe_fonction" size={24} />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-navy text-base sm:text-lg leading-tight break-words">
              Simulateur Dynamique : Trajectoires d&apos;Équations Différentielles
            </h3>
            <p className="text-xs text-text/60 mt-1 leading-snug">
              Ajustez les paramètres en temps réel pour visualiser le comportement des solutions
            </p>
          </div>
        </div>
        <span className="self-start sm:self-center text-xs font-semibold px-2.5 py-1 rounded-full bg-navy/5 text-navy border border-navy/10 shrink-0 whitespace-nowrap">
          Simulation Interactive
        </span>
      </div>

      {/* Model Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {EQUADIFF_MODELS.map((model) => {
          const isSelected = model.id === activeModel.id;
          return (
            <button
              key={model.id}
              onClick={() => handleSelectModel(model.id)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-1.5 ${
                isSelected
                  ? 'border-turquoise bg-turquoise/10 shadow-sm'
                  : 'border-navy/10 bg-surface/40 hover:bg-surface text-navy/70'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-navy/10 text-navy">
                  {model.badge}
                </span>
                {isSelected && <span className="w-2 h-2 rounded-full bg-turquoise" />}
              </div>
              <p className={`text-xs font-bold ${isSelected ? 'text-navy' : 'text-text/80'}`}>
                {model.name}
              </p>
            </button>
          );
        })}
      </div>

      {/* Model Math Banner */}
      <div className="bg-surface rounded-xl p-4 border border-navy/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <span className="text-[11px] font-bold text-text/50 uppercase tracking-wider block">
            Équation en cours d&apos;étude :
          </span>
          <div className="text-base font-bold text-navy mt-0.5">
            <MathRenderer content={`$$${activeModel.equationMd} \\implies ${activeModel.solutionFormulaMd}$$`} />
          </div>
        </div>
        <p className="text-xs text-text/60 max-w-sm">{activeModel.description}</p>
      </div>

      {/* Interactive Controls Sliders */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-surface/50 rounded-xl p-4 border border-navy/5">
        <div>
          <div className="flex justify-between text-xs font-bold text-navy mb-1.5">
            <span>{activeModel.labelA}</span>
            <span className="text-turquoise font-mono font-black">{paramA.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min={activeModel.minA}
            max={activeModel.maxA}
            step={activeModel.stepA}
            value={paramA}
            onChange={(e) => setParamA(parseFloat(e.target.value))}
            className="w-full accent-turquoise cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-text/40 mt-1">
            <span>{activeModel.minA}</span>
            <span>{activeModel.maxA}</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-navy mb-1.5">
            <span>{activeModel.labelB}</span>
            <span className="text-amber-600 font-mono font-black">{paramB.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min={activeModel.minB}
            max={activeModel.maxB}
            step={activeModel.stepB}
            value={paramB}
            onChange={(e) => setParamB(parseFloat(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-text/40 mt-1">
            <span>{activeModel.minB}</span>
            <span>{activeModel.maxB}</span>
          </div>
        </div>
      </div>

      {/* SVG Interactive Canvas */}
      <div className="bg-[#0B132B] rounded-2xl p-4 border border-navy/20 shadow-inner flex flex-col items-center">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-2xl h-auto select-none">
          {/* Grille */}
          <g stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1">
            {[-4, -2, 0, 2, 4].map((yVal) => (
              <line
                key={`grid-y-${yVal}`}
                x1={paddingLeft}
                y1={toSvgY(yVal)}
                x2={width - paddingRight}
                y2={toSvgY(yVal)}
              />
            ))}
            {[0, 1, 2, 3, 4, 5, 6].map((xVal) => (
              <line
                key={`grid-x-${xVal}`}
                x1={toSvgX(xVal)}
                y1={paddingTop}
                x2={toSvgX(xVal)}
                y2={height - paddingBottom}
              />
            ))}
          </g>

          {/* Axe horizontal Ox (y = 0) */}
          <line
            x1={paddingLeft}
            y1={toSvgY(0)}
            x2={width - paddingRight}
            y2={toSvgY(0)}
            stroke="#94A3B8"
            strokeWidth="2"
          />
          <text
            x={width - paddingRight + 5}
            y={toSvgY(0) + 4}
            fill="#94A3B8"
            fontSize="12"
            fontWeight="bold"
          >
            x
          </text>

          {/* Axe vertical Oy (x = 0) */}
          <line
            x1={toSvgX(0)}
            y1={height - paddingBottom}
            x2={toSvgX(0)}
            y2={paddingTop}
            stroke="#94A3B8"
            strokeWidth="2"
          />
          <text x={toSvgX(0) - 4} y={paddingTop - 8} fill="#94A3B8" fontSize="12" fontWeight="bold">
            y
          </text>

          {/* Graduations sur Ox */}
          {[1, 2, 3, 4, 5, 6].map((val) => (
            <text
              key={`x-label-${val}`}
              x={toSvgX(val)}
              y={toSvgY(0) + 16}
              fill="#94A3B8"
              fontSize="10"
              textAnchor="middle"
            >
              {val}
            </text>
          ))}

          {/* Graduations sur Oy */}
          {[-4, -2, 2, 4].map((val) => (
            <text
              key={`y-label-${val}`}
              x={toSvgX(0) - 8}
              y={toSvgY(val) + 4}
              fill="#94A3B8"
              fontSize="10"
              textAnchor="end"
            >
              {val}
            </text>
          ))}

          {/* Asymptote horizontale si 1er ordre */}
          {asymptoteY !== null && asymptoteY >= yMin && asymptoteY <= yMax && (
            <g>
              <line
                x1={paddingLeft}
                y1={toSvgY(asymptoteY)}
                x2={width - paddingRight}
                y2={toSvgY(asymptoteY)}
                stroke="#FBBF24"
                strokeWidth="1.5"
                strokeDasharray="6,4"
              />
              <text
                x={width - paddingRight - 80}
                y={toSvgY(asymptoteY) - 6}
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                y = {(paramB / paramA).toFixed(2)}
              </text>
            </g>
          )}

          {/* Tracé de la courbe solution */}
          <path
            d={pathD}
            fill="none"
            stroke="#00F5D4"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Point initial x=0 */}
          <circle
            cx={toSvgX(0)}
            cy={toSvgY(activeModel.compute(0, paramA, paramB))}
            r="5"
            fill="#38BDF8"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
        </svg>

        {/* Commentaire dynamique sous le graphe */}
        <div className="w-full mt-3 bg-white/5 rounded-xl p-3 border border-white/10 text-xs text-white/90">
          <MathRenderer content={activeModel.comment(paramA, paramB)} />
        </div>

        {/* Décryptage Wolof */}
        <div className="w-full mt-3 bg-amber-500/10 rounded-xl p-3 border border-amber-500/20 text-xs text-amber-200">
          <div className="flex items-center gap-1.5 font-bold text-amber-400 mb-1">
            <span>🇸🇳</span>
            <span>Xam-xam ci Wolof (Équations Différentielles) :</span>
          </div>
          <p className="italic text-amber-100 leading-relaxed font-medium">
            {activeModel.wolofTip}
          </p>
        </div>
      </div>
    </div>
  );
}

