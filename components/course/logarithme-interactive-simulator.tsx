'use client';

import React, { useState } from 'react';
import StudyIcon from '@/components/ui/study-icon';
import MathRenderer from '@/components/course/math-renderer';

interface LogFunction {
  id: string;
  name: string;
  badge: string;
  expressionMd: string;
  derivativeMd: string;
  minX: number;
  maxX: number;
  defaultX: number;
  step: number;
  graphXMin: number;
  graphXMax: number;
  graphYMin: number;
  graphYMax: number;
  fn: (x: number) => number;
  dfn: (x: number) => number;
  tangentLabel: (x0: number, y0: number, m: number) => string;
  comment: string;
  wolofTip: string;
}

const LOG_FUNCTIONS: LogFunction[] = [
  {
    id: 'ln_base',
    name: 'f(x) = ln(x) (Fonction de base)',
    badge: 'Fondamentale',
    expressionMd: 'f(x) = \\ln(x)',
    derivativeMd: "f'(x) = \\dfrac{1}{x} > 0",
    minX: 0.2,
    maxX: 6.0,
    defaultX: 1.0,
    step: 0.1,
    graphXMin: 0.1,
    graphXMax: 6.5,
    graphYMin: -2.5,
    graphYMax: 2.5,
    fn: (x) => Math.log(x),
    dfn: (x) => 1 / x,
    tangentLabel: (x0, y0, m) =>
      `y = ${m.toFixed(2)}(x - ${x0.toFixed(2)}) + (${y0.toFixed(2)})`,
    comment:
      "La dérivée $f'(x) = 1/x$ est strictement positive pour tout $x > 0$ : la fonction est strictement croissante. En $x = 1$, la pente de la tangente vaut exactement $1$ ($T : y = x - 1$). En $x = e \\approx 2{,}72$, $f(e) = 1$.",
    wolofTip:
      "« ln(x) dafa jogee ci xóot-xóot (-∞ ci 0⁺), romb suuf ci 1 (ln 1 = 0), ba agsi ci e (ln e = 1). Dérivée bi 1/x dafa positif ci bépp x > 0, kon dafay yéeg saa su nekk ! »",
  },
  {
    id: 'ln_sur_x',
    name: 'g(x) = ln(x)/x (Maximum en e)',
    badge: 'Grand Classique Bac',
    expressionMd: 'g(x) = \\dfrac{\\ln(x)}{x}',
    derivativeMd: "g'(x) = \\dfrac{1 - \\ln(x)}{x^2}",
    minX: 0.3,
    maxX: 6.5,
    defaultX: 2.72,
    step: 0.1,
    graphXMin: 0.2,
    graphXMax: 7.0,
    graphYMin: -2.0,
    graphYMax: 0.8,
    fn: (x) => Math.log(x) / x,
    dfn: (x) => (1 - Math.log(x)) / Math.pow(x, 2),
    tangentLabel: (x0, y0, m) =>
      `y = ${m.toFixed(2)}(x - ${x0.toFixed(2)}) + (${y0.toFixed(2)})`,
    comment:
      "Extremum en $x = e \\approx 2{,}718$ : la dérivée s'annule ($g'(e) = 0$), d'où une tangente strictement horizontale. La valeur maximale atteinte est $g(e) = 1/e \\approx 0{,}368$. À l'infini, $\\lim_{x \\to +\\infty} g(x) = 0$ (axe $Ox$ asymptote horizontale).",
    wolofTip:
      "« Ci x = e (2,718), g'(e) = 0 la : foofu la tangente bi di tëje noom ci kocc bi (maximum 1/e ≈ 0,37). Ginaaw e dafay wàcc ndànk jëm ci 0 ci +∞ ! »",
  },
  {
    id: 'x_moins_ln',
    name: 'h(x) = x - ln(x) (Minimum en 1)',
    badge: 'Croissance comparée',
    expressionMd: 'h(x) = x - \\ln(x)',
    derivativeMd: "h'(x) = 1 - \\dfrac{1}{x} = \\dfrac{x - 1}{x}",
    minX: 0.2,
    maxX: 5.0,
    defaultX: 1.0,
    step: 0.1,
    graphXMin: 0.1,
    graphXMax: 5.5,
    graphYMin: 0.0,
    graphYMax: 5.0,
    fn: (x) => x - Math.log(x),
    dfn: (x) => (x - 1) / x,
    tangentLabel: (x0, y0, m) =>
      `y = ${m.toFixed(2)}(x - ${x0.toFixed(2)}) + (${y0.toFixed(2)})`,
    comment:
      "Minimum absolu en $x = 1$ avec $h(1) = 1$ et tangente horizontale ($h'(1) = 0$). Comme $h(x) \\ge 1 > 0$, on en déduit l'inégalité fondamentale pour le Bac : pour tout $x > 0$, $\\ln(x) < x$.",
    wolofTip:
      "« Minimum bi mi ngi ci x = 1 fu h(1) = 1. Ndax h(x) ≥ 1 > 0 saa su nekk, xam nga ne ci bépp x > 0, x moo ëpp ln(x) doole ! »",
  },
];

export default function LogarithmeInteractiveSimulator() {
  const [selectedFunc, setSelectedFunc] = useState<LogFunction>(LOG_FUNCTIONS[0]);
  const [pointX, setPointX] = useState<number>(1.0);

  const fx = selectedFunc.fn(pointX);
  const dfx = selectedFunc.dfn(pointX);

  const isCritical = Math.abs(dfx) < 0.03;
  const isIncreasing = dfx > 0.03;
  const isDecreasing = dfx < -0.03;

  // Configuration graphique SVG
  const svgWidth = 720;
  const svgHeight = 280;
  const padLeft = 60;
  const padRight = 30;
  const padTop = 25;
  const padBottom = 35;

  const mapX = (x: number) => {
    return (
      padLeft +
      ((x - selectedFunc.graphXMin) / (selectedFunc.graphXMax - selectedFunc.graphXMin)) *
        (svgWidth - padLeft - padRight)
    );
  };

  const mapY = (y: number) => {
    return (
      svgHeight -
      padBottom -
      ((y - selectedFunc.graphYMin) / (selectedFunc.graphYMax - selectedFunc.graphYMin)) *
        (svgHeight - padTop - padBottom)
    );
  };

  // Tracé dynamique de la courbe
  const curvePoints: string[] = [];
  const steps = 140;
  const xSpan = selectedFunc.graphXMax - selectedFunc.graphXMin;

  for (let i = 0; i <= steps; i++) {
    const px = selectedFunc.graphXMin + (i / steps) * xSpan;
    if (px <= 0.05) continue; // Sécurité hors domaine
    const py = selectedFunc.fn(px);
    const sx = mapX(px);
    const sy = mapY(py);
    if (!isNaN(sy) && sy >= 5 && sy <= svgHeight + 50) {
      curvePoints.push(`${curvePoints.length === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${sy.toFixed(1)}`);
    }
  }

  // Tangente dynamique : y = dfx * (x - pointX) + fx
  const tX1 = Math.max(selectedFunc.graphXMin, pointX - 1.8);
  const tX2 = Math.min(selectedFunc.graphXMax, pointX + 1.8);
  const tY1 = dfx * (tX1 - pointX) + fx;
  const tY2 = dfx * (tX2 - pointX) + fx;

  const currentXPixel = mapX(pointX);
  const currentYPixel = mapY(fx);

  const axisY0 = Math.max(padTop, Math.min(mapY(0), svgHeight - padBottom));
  const axisX0 = Math.max(padLeft, Math.min(mapX(0), svgWidth - padRight));

  return (
    <div className="my-6 rounded-3xl border-2 border-turquoise/30 bg-gradient-to-b from-white via-surface/30 to-surface/80 p-4 sm:p-6 shadow-md">
      {/* En-tête */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy/10 pb-3">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-turquoise bg-turquoise/15 px-2.5 py-0.5 rounded-full border border-turquoise/20">
            Laboratoire Interactif : Fonction Logarithme Népérien
          </span>
          <h3 className="text-base sm:text-lg font-bold text-navy mt-1 flex items-center gap-2">
            <StudyIcon name="courbe_fonction" size={22} className="text-turquoise" />
            <span>Simulateur Visuel de Tangentes & Variations</span>
          </h3>
        </div>
        <span className="text-xs font-semibold text-text/60 bg-white/80 px-2.5 py-1 rounded-lg border border-navy/10">
          Bac S2 Sénégal
        </span>
      </div>

      {/* Choix du modèle */}
      <div className="mt-4">
        <label className="text-xs font-bold uppercase tracking-wider text-navy/70 block mb-2">
          Choisir une fonction type Baccalauréat :
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {LOG_FUNCTIONS.map((f) => (
            <button
              key={f.id}
              onClick={() => {
                setSelectedFunc(f);
                setPointX(f.defaultX);
              }}
              className={`p-3 rounded-xl text-left border text-xs font-bold transition-all active:scale-95 ${
                selectedFunc.id === f.id
                  ? 'bg-navy text-white border-navy shadow-sm'
                  : 'bg-white text-navy/80 border-navy/15 hover:border-turquoise'
              }`}
            >
              <div className="text-[9px] text-turquoise uppercase tracking-wider font-extrabold mb-0.5">
                {f.badge}
              </div>
              <div className="truncate font-black">{f.name.split(' (')[0]}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Équations en présence */}
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
            Dérivée calculée
          </span>
          <div className="mt-1 font-bold text-turquoise">
            <MathRenderer content={`$${selectedFunc.derivativeMd}$`} />
          </div>
        </div>
      </div>

      {/* SVG Canvas Interactif */}
      <div className="mt-5 bg-navy/95 rounded-2xl p-3 border border-navy/20 shadow-inner overflow-hidden">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto select-none font-sans"
        >
          {/* Grille */}
          <g stroke="#ffffff" strokeOpacity="0.07" strokeWidth="1">
            {[0, 1, 2, 3, 4, 5, 6].map((gx) => (
              <line
                key={`gx-${gx}`}
                x1={mapX(gx)}
                y1={padTop}
                x2={mapX(gx)}
                y2={svgHeight - padBottom}
              />
            ))}
            {[-2, -1, 0, 1, 2, 3, 4].map((gy) => (
              <line
                key={`gy-${gy}`}
                x1={padLeft}
                y1={mapY(gy)}
                x2={svgWidth - padRight}
                y2={mapY(gy)}
              />
            ))}
          </g>

          {/* Axes du repère */}
          {/* Axe Ox */}
          <line
            x1={padLeft - 10}
            y1={axisY0}
            x2={svgWidth - padRight + 10}
            y2={axisY0}
            stroke="#94A3B8"
            strokeWidth="1.5"
          />
          <text
            x={svgWidth - padRight + 12}
            y={axisY0 + 4}
            fill="#94A3B8"
            fontSize="10"
            fontWeight="bold"
          >
            x
          </text>

          {/* Axe Oy / Asymptote Verticale x = 0 */}
          <line
            x1={axisX0}
            y1={svgHeight - padBottom + 10}
            x2={axisX0}
            y2={padTop - 10}
            stroke="#FF6B6B"
            strokeWidth="2"
            strokeDasharray="4,3"
          />
          <text
            x={axisX0 + 6}
            y={padTop - 2}
            fill="#FF6B6B"
            fontSize="10"
            fontWeight="bold"
          >
            x = 0
          </text>

          {/* Graduations Ox */}
          {[1, 2, 3, 4, 5, 6].map((gx) => (
            <g key={`lbl-x-${gx}`}>
              <line
                x1={mapX(gx)}
                y1={axisY0 - 3}
                x2={mapX(gx)}
                y2={axisY0 + 3}
                stroke="#94A3B8"
                strokeWidth="1"
              />
              <text
                x={mapX(gx)}
                y={axisY0 + 14}
                fill="#94A3B8"
                fontSize="10"
                textAnchor="middle"
              >
                {gx}
              </text>
            </g>
          ))}

          {/* Courbe de f */}
          {curvePoints.length > 1 && (
            <path
              d={curvePoints.join(' ')}
              fill="none"
              stroke="#00F5D4"
              strokeWidth="3"
              strokeLinecap="round"
            />
          )}

          {/* Droite tangente en x0 */}
          <line
            x1={mapX(tX1)}
            y1={mapY(tY1)}
            x2={mapX(tX2)}
            y2={mapY(tY2)}
            stroke="#FBBF24"
            strokeWidth="2"
            strokeDasharray="5,3"
          />

          {/* Lignes de projection du point M(x0, f(x0)) */}
          <line
            x1={currentXPixel}
            y1={axisY0}
            x2={currentXPixel}
            y2={currentYPixel}
            stroke="#00F5D4"
            strokeWidth="1"
            strokeDasharray="3,3"
          />
          <line
            x1={axisX0}
            y1={currentYPixel}
            x2={currentXPixel}
            y2={currentYPixel}
            stroke="#00F5D4"
            strokeWidth="1"
            strokeDasharray="3,3"
          />

          {/* Point M sur la courbe */}
          <circle
            cx={currentXPixel}
            cy={currentYPixel}
            r="6"
            fill="#00F5D4"
            stroke="#0B132B"
            strokeWidth="2"
          />
          <text
            x={currentXPixel + 8}
            y={currentYPixel - 8}
            fill="#00F5D4"
            fontSize="11"
            fontWeight="bold"
          >
            M({pointX.toFixed(1)}; {fx.toFixed(1)})
          </text>
        </svg>
      </div>

      {/* Slider tactile pour x0 */}
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
          <span className="text-turquoise font-bold">
            Glissez pour observer la rotation de la tangente !
          </span>
          <span>Max : {selectedFunc.maxX}</span>
        </div>
      </div>

      {/* Cartes métriques instantanées */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Valeur f(x0) */}
        <div className="bg-white rounded-2xl border border-navy/10 p-3.5 text-center">
          <div className="text-[10px] font-bold uppercase tracking-wider text-text/50">
            <MathRenderer content="Image $f(x_0)$" />
          </div>
          <div className="mt-1 font-mono text-lg font-black text-navy">
            {fx.toFixed(3)}
          </div>
          <span className="text-[10px] text-text/60">Hauteur réelle</span>
        </div>

        {/* Pente f'(x0) */}
        <div className="bg-white rounded-2xl border border-navy/10 p-3.5 text-center">
          <div className="text-[10px] font-bold uppercase tracking-wider text-text/50">
            <MathRenderer content="Nombre dérivé $f'(x_0)$" />
          </div>
          <div className="mt-1 font-mono text-lg font-black text-turquoise">
            {dfx.toFixed(3)}
          </div>
          <span className="text-[10px] text-text/60">Coefficient directeur</span>
        </div>

        {/* Sens de variation */}
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
                <span>Tangente Horizontale</span>
              </>
            )}
            {isIncreasing && (
              <>
                <span className="text-lg">↗</span>
                <span>Croissante</span>
              </>
            )}
            {isDecreasing && (
              <>
                <span className="text-lg">↘</span>
                <span>Décroissante</span>
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

      {/* Équation de la tangente */}
      <div className="mt-4 bg-navy/5 border border-navy/15 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-1.5">
          <StudyIcon name="cle_solution" size={16} className="text-navy" />
          <span className="text-xs font-bold text-navy uppercase tracking-wider">
            Équation cartésienne de la tangente :
          </span>
        </div>
        <div className="bg-white rounded-xl p-3 border border-navy/10 overflow-x-auto text-center font-mono font-bold text-navy">
          <MathRenderer
            content={`$T : y = f'(x_0)(x - x_0) + f(x_0) \\implies y = ${dfx.toFixed(2)}(x - ${pointX.toFixed(2)}) + (${fx.toFixed(2)})$`}
          />
        </div>
      </div>

      {/* Commentaire pédagogique */}
      <div className="mt-4 bg-turquoise/5 border border-turquoise/20 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-1">
          <StudyIcon name="conseil_professeur" size={16} className="text-turquoise" />
          <span className="text-xs font-bold text-turquoise uppercase tracking-wider">
            Le réflexe examinateur du Bac S2 :
          </span>
        </div>
        <div className="text-xs text-text/85 leading-relaxed">
          <MathRenderer content={selectedFunc.comment} />
        </div>
      </div>

      {/* Décryptage Wolof */}
      <div className="mt-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-950">
        <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
          <span>🇸🇳</span>
          <span>Xam-xam ci Wolof (Pexe wu Logarithme) :</span>
        </div>
        <p className="italic text-amber-900 leading-relaxed font-medium">
          {selectedFunc.wolofTip}
        </p>
      </div>
    </div>
  );
}

