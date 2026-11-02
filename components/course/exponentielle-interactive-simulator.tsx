'use client';

import React, { useState } from 'react';
import StudyIcon from '@/components/ui/study-icon';
import MathRenderer from '@/components/course/math-renderer';

interface ExpFunction {
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

const EXP_FUNCTIONS: ExpFunction[] = [
  {
    id: 'exp_base',
    name: 'f(x) = eˣ (Fonction de base)',
    badge: 'Fondamentale',
    expressionMd: 'f(x) = e^x',
    derivativeMd: "f'(x) = e^x = f(x) > 0",
    minX: -3.0,
    maxX: 2.0,
    defaultX: 0.0,
    step: 0.1,
    graphXMin: -3.5,
    graphXMax: 2.5,
    graphYMin: -0.5,
    graphYMax: 7.5,
    fn: (x) => Math.exp(x),
    dfn: (x) => Math.exp(x),
    tangentLabel: (x0, y0, m) =>
      `y = ${m.toFixed(2)}(x - ${x0.toFixed(2)}) + (${y0.toFixed(2)})`,
    comment:
      "Propriété unique en mathématiques : $f'(x) = f(x)$. La pente de la tangente en tout point $M(x_0, y_0)$ est exactement égale à son ordonnée $y_0$ ! En $x = 0$, la tangente a pour équation $y = x + 1$ (pente = 1). En $-\\infty$, l'axe $Ox$ ($y = 0$) est asymptote horizontale.",
    wolofTip:
      "« eˣ mooy fonction bi nga xam ne f'(x) = f(x) : pente bi ci bépp point tollook hauteur bi ! Ci 0, e⁰ = 1 la te tangente bi y = x + 1 la. Dafa positif saa su nekk (> 0) ! »",
  },
  {
    id: 'x_moins_1_exp',
    name: 'g(x) = (x - 1)eˣ (Minimum en 0)',
    badge: 'Grand Classique Bac',
    expressionMd: 'g(x) = (x - 1)e^x',
    derivativeMd: "g'(x) = 1 \\cdot e^x + (x - 1)e^x = x e^x",
    minX: -3.0,
    maxX: 2.0,
    defaultX: 0.0,
    step: 0.1,
    graphXMin: -3.5,
    graphXMax: 2.2,
    graphYMin: -1.5,
    graphYMax: 7.0,
    fn: (x) => (x - 1) * Math.exp(x),
    dfn: (x) => x * Math.exp(x),
    tangentLabel: (x0, y0, m) =>
      `y = ${m.toFixed(2)}(x - ${x0.toFixed(2)}) + (${y0.toFixed(2)})`,
    comment:
      "Le signe de $g'(x) = x e^x$ dépend uniquement de $x$ car $e^x > 0$. Tangente horizontale en $x = 0$ ($g'(0) = 0$). La fonction admet un minimum absolu en $(0, -1)$. À $-\\infty$, $\\lim g(x) = 0$ par croissance comparée.",
    wolofTip:
      "« Ci g'(x) = x eˣ, ndax eˣ positif la, signe bi ci x rekk lay dellu : bala 0 dafay wàcc, ginaaw 0 dafay yéeg. Ci 0 la minimum bi nekk (-1) ! »",
  },
  {
    id: '2_moins_x_exp',
    name: 'h(x) = (2 - x)eˣ (Maximum en 1)',
    badge: 'Problème Type Bac',
    expressionMd: 'h(x) = (2 - x)e^x',
    derivativeMd: "h'(x) = -e^x + (2 - x)e^x = (1 - x)e^x",
    minX: -3.0,
    maxX: 2.5,
    defaultX: 1.0,
    step: 0.1,
    graphXMin: -3.5,
    graphXMax: 3.0,
    graphYMin: -2.0,
    graphYMax: 4.0,
    fn: (x) => (2 - x) * Math.exp(x),
    dfn: (x) => (1 - x) * Math.exp(x),
    tangentLabel: (x0, y0, m) =>
      `y = ${m.toFixed(2)}(x - ${x0.toFixed(2)}) + (${y0.toFixed(2)})`,
    comment:
      "La dérivée s'annule en $x = 1$ ($h'(1) = 0$), d'où un maximum absolu égal à $h(1) = e \\approx 2{,}718$. La courbe coupe l'axe des abscisses en $x = 2$ ($h(2) = 0$).",
    wolofTip:
      "« Ci h'(x) = (1 - x)eˣ, 1 - x mooy joxe signe bi : ci 1 la maximum bi nekk fu h(1) = e ≈ 2,72. Yoon bi dafay soppiku ci 1 ! »",
  },
];

export default function ExponentielleInteractiveSimulator() {
  const [selectedFunc, setSelectedFunc] = useState<ExpFunction>(EXP_FUNCTIONS[0]);
  const [pointX, setPointX] = useState<number>(0.0);

  const fx = selectedFunc.fn(pointX);
  const dfx = selectedFunc.dfn(pointX);

  const isCritical = Math.abs(dfx) < 0.04;
  const isIncreasing = dfx > 0.04;
  const isDecreasing = dfx < -0.04;

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
  const steps = 150;
  const xSpan = selectedFunc.graphXMax - selectedFunc.graphXMin;

  for (let i = 0; i <= steps; i++) {
    const px = selectedFunc.graphXMin + (i / steps) * xSpan;
    const py = selectedFunc.fn(px);
    const sx = mapX(px);
    const sy = mapY(py);
    if (!isNaN(sy) && sy >= -50 && sy <= svgHeight + 50) {
      curvePoints.push(`${curvePoints.length === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${sy.toFixed(1)}`);
    }
  }

  // Tangente dynamique : y = dfx * (x - pointX) + fx
  const tX1 = Math.max(selectedFunc.graphXMin, pointX - 1.6);
  const tX2 = Math.min(selectedFunc.graphXMax, pointX + 1.6);
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
            Laboratoire Interactif : Fonction Exponentielle
          </span>
          <h3 className="text-base sm:text-lg font-bold text-navy mt-1 flex items-center gap-2">
            <StudyIcon name="courbe_fonction" size={22} className="text-turquoise" />
            <span>Simulateur Visuel de Tangentes & Croissance Rapide</span>
          </h3>
        </div>
        <span className="text-xs font-semibold text-text/60 bg-white/80 px-2.5 py-1 rounded-lg border border-navy/10">
          Bac S2 Sénégal
        </span>
      </div>

      {/* Choix du modèle */}
      <div className="mt-4">
        <label className="text-xs font-bold uppercase tracking-wider text-navy/70 block mb-2">
          Choisir une fonction exponentielle du Baccalauréat :
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {EXP_FUNCTIONS.map((f) => (
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
            {[-3, -2, -1, 0, 1, 2].map((gx) => (
              <line
                key={`gx-${gx}`}
                x1={mapX(gx)}
                y1={padTop}
                x2={mapX(gx)}
                y2={svgHeight - padBottom}
              />
            ))}
            {[-1, 0, 1, 2, 3, 4, 5, 6].map((gy) => (
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
          {/* Axe Ox et Asymptote Horizontale y = 0 */}
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

          {/* Asymptote y = 0 en -infini (ligne pointillée rouge) */}
          <line
            x1={padLeft}
            y1={axisY0 - 1}
            x2={mapX(0)}
            y2={axisY0 - 1}
            stroke="#FF6B6B"
            strokeWidth="2"
            strokeDasharray="4,3"
          />
          <text
            x={padLeft + 10}
            y={axisY0 - 8}
            fill="#FF6B6B"
            fontSize="10"
            fontWeight="bold"
          >
            Asymptote y = 0
          </text>

          {/* Axe Oy */}
          <line
            x1={axisX0}
            y1={svgHeight - padBottom + 10}
            x2={axisX0}
            y2={padTop - 10}
            stroke="#94A3B8"
            strokeWidth="1.5"
          />
          <text
            x={axisX0 + 6}
            y={padTop - 2}
            fill="#94A3B8"
            fontSize="10"
            fontWeight="bold"
          >
            y
          </text>

          {/* Graduations Ox */}
          {[-3, -2, -1, 1, 2].map((gx) => (
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
            Observez la pente s&apos;accélérer exponentiellement vers la droite !
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
          <span className="text-[10px] text-text/60">Pente de la tangente</span>
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
          <span>Xam-xam ci Wolof (Pexe wu Exponentielle) :</span>
        </div>
        <p className="italic text-amber-900 leading-relaxed font-medium">
          {selectedFunc.wolofTip}
        </p>
      </div>
    </div>
  );
}

