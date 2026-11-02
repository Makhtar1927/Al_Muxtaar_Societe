'use client';

import React, { useState } from 'react';
import StudyIcon from '@/components/ui/study-icon';
import MathRenderer from '@/components/course/math-renderer';

interface IntegralModel {
  id: string;
  name: string;
  badge: string;
  expressionMd: string;
  primitiveMd: string;
  minBound: number;
  maxBound: number;
  defaultA: number;
  defaultB: number;
  step: number;
  graphXMin: number;
  graphXMax: number;
  graphYMin: number;
  graphYMax: number;
  fn: (x: number) => number;
  primitive: (x: number) => number;
  comment: string;
  wolofTip: string;
}

const INTEGRAL_MODELS: IntegralModel[] = [
  {
    id: 'inv_x',
    name: 'f(x) = 1/x (Aire & Logarithme népérien)',
    badge: 'Fondamentale',
    expressionMd: 'f(x) = \\dfrac{1}{x}',
    primitiveMd: 'F(x) = \\ln(x)',
    minBound: 0.5,
    maxBound: 5.0,
    defaultA: 1.0,
    defaultB: 2.72,
    step: 0.1,
    graphXMin: 0.2,
    graphXMax: 5.5,
    graphYMin: -0.2,
    graphYMax: 2.5,
    fn: (x) => 1 / x,
    primitive: (x) => Math.log(x),
    comment:
      "L'intégrale de $1/x$ sur $[1, e]$ vaut exactement $1\\text{ u.a.}$ car $\\int_1^e \\frac{1}{x}\\,dx = [\\ln x]_1^e = \\ln(e) - \\ln(1) = 1 - 0 = 1$. C'est la définition géométrique historique du nombre $e$ !",
    wolofTip:
      "« Intégrale 1/x ci diggante 1 ak e dafay jox 1 u.a. dëgg ndax ln(e) - ln(1) = 1 - 0 = 1 ! Foofu lañu sukkandikoo ngir définir nimero e ≈ 2,718. »",
  },
  {
    id: 'x_exp_neg',
    name: 'g(x) = x·e⁻ˣ (Modèle classique IPP Bac)',
    badge: 'IPP Obligatoire',
    expressionMd: 'g(x) = x e^{-x}',
    primitiveMd: 'G(x) = (-x - 1)e^{-x}',
    minBound: 0.0,
    maxBound: 4.5,
    defaultA: 0.0,
    defaultB: 2.0,
    step: 0.1,
    graphXMin: -0.5,
    graphXMax: 5.0,
    graphYMin: -0.1,
    graphYMax: 0.6,
    fn: (x) => x * Math.exp(-x),
    primitive: (x) => (-x - 1) * Math.exp(-x),
    comment:
      "Calculée par IPP en posant $u = x$ et $v' = e^{-x}$. On obtient $G(x) = (-x - 1)e^{-x}$. L'aire sous la courbe entre $0$ et $+\\infty$ converge vers exactement $1\\text{ u.a.}$",
    wolofTip:
      "« Fonction x·e⁻ˣ dangay ko intégrer par parties (IPP) : poseel u = x ak v' = e⁻ˣ. Primitive bi G(x) = (-x - 1)e⁻ˣ la ! »",
  },
  {
    id: 'parabole',
    name: 'h(x) = -x² + 4x (Arche parabolique)',
    badge: 'Polynôme',
    expressionMd: 'h(x) = -x^2 + 4x',
    primitiveMd: 'H(x) = -\\dfrac{x^3}{3} + 2x^2',
    minBound: 0.0,
    maxBound: 4.0,
    defaultA: 0.5,
    defaultB: 3.5,
    step: 0.1,
    graphXMin: -0.5,
    graphXMax: 4.5,
    graphYMin: -0.5,
    graphYMax: 4.5,
    fn: (x) => -Math.pow(x, 2) + 4 * x,
    primitive: (x) => -Math.pow(x, 3) / 3 + 2 * Math.pow(x, 2),
    comment:
      "Sur $[0, 4]$, la parabole est strictement positive et s'annule aux bornes $0$ et $4$. L'aire totale sous l'arche vaut $\\int_0^4 (-x^2 + 4x)\\,dx = \\left[-\\frac{x^3}{3} + 2x^2\\right]_0^4 = \\frac{32}{3} \\approx 10{,}67\\text{ u.a.}$",
    wolofTip:
      "« Parabole bi dafa positivoo ci diggante 0 ak 4. Intégrale bi mooy yaatuwaayu kocc bi yépp : 32/3 u.a. Bu la examinateur laajee cm², faf ko ak unité graphique bi ! »",
  },
];

export default function PrimitivesInteractiveSimulator() {
  const [selectedModel, setSelectedModel] = useState<IntegralModel>(INTEGRAL_MODELS[0]);
  const [boundA, setBoundA] = useState<number>(1.0);
  const [boundB, setBoundB] = useState<number>(2.72);

  // Échelle graphique Bac S2 (ex: 2 cm x 2 cm)
  const unitCm = 2;
  const unitAreaCm2 = unitCm * unitCm; // 4 cm²

  // Calcul rigoureux de l'intégrale
  const integralValue = selectedModel.primitive(boundB) - selectedModel.primitive(boundA);
  const areaCm2 = integralValue * unitAreaCm2;
  const meanValue = integralValue / (boundB - boundA);

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
      ((x - selectedModel.graphXMin) / (selectedModel.graphXMax - selectedModel.graphXMin)) *
        (svgWidth - padLeft - padRight)
    );
  };

  const mapY = (y: number) => {
    return (
      svgHeight -
      padBottom -
      ((y - selectedModel.graphYMin) / (selectedModel.graphYMax - selectedModel.graphYMin)) *
        (svgHeight - padTop - padBottom)
    );
  };

  // Tracé dynamique de la courbe f
  const curvePoints: string[] = [];
  const steps = 150;
  const xSpan = selectedModel.graphXMax - selectedModel.graphXMin;

  for (let i = 0; i <= steps; i++) {
    const px = selectedModel.graphXMin + (i / steps) * xSpan;
    if (px <= 0.05 && selectedModel.id === 'inv_x') continue;
    const py = selectedModel.fn(px);
    const sx = mapX(px);
    const sy = mapY(py);
    if (!isNaN(sy) && sy >= 5 && sy <= svgHeight + 50) {
      curvePoints.push(`${curvePoints.length === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${sy.toFixed(1)}`);
    }
  }

  // Polygone de l'aire ombrée entre x = a et x = b
  const areaPolyPoints: string[] = [];
  const areaSteps = 60;
  const areaSpan = boundB - boundA;

  // Départ sur l'axe Ox en x = a
  areaPolyPoints.push(`M ${mapX(boundA).toFixed(1)} ${mapY(0).toFixed(1)}`);

  // Courbe supérieure de a vers b
  for (let i = 0; i <= areaSteps; i++) {
    const px = boundA + (i / areaSteps) * areaSpan;
    const py = selectedModel.fn(px);
    areaPolyPoints.push(`L ${mapX(px).toFixed(1)} ${mapY(py).toFixed(1)}`);
  }

  // Descente sur l'axe Ox en x = b
  areaPolyPoints.push(`L ${mapX(boundB).toFixed(1)} ${mapY(0).toFixed(1)}`);
  areaPolyPoints.push('Z');

  const axisY0 = Math.max(padTop, Math.min(mapY(0), svgHeight - padBottom));
  const axisX0 = Math.max(padLeft, Math.min(mapX(0), svgWidth - padRight));

  const handleSetA = (val: number) => {
    if (val < boundB - 0.2) {
      setBoundA(val);
    }
  };

  const handleSetB = (val: number) => {
    if (val > boundA + 0.2) {
      setBoundB(val);
    }
  };

  return (
    <div className="my-6 rounded-3xl border-2 border-turquoise/30 bg-gradient-to-b from-white via-surface/30 to-surface/80 p-4 sm:p-6 shadow-md">
      {/* En-tête */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy/10 pb-3">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-turquoise bg-turquoise/15 px-2.5 py-0.5 rounded-full border border-turquoise/20">
            Laboratoire Interactif : Calcul Intégral &amp; Aires
          </span>
          <h3 className="text-base sm:text-lg font-bold text-navy mt-1 flex items-center gap-2">
            <StudyIcon name="courbe_fonction" size={22} className="text-turquoise" />
            <span>Simulateur Visuel d&apos;Intégration &amp; Calcul d&apos;Aires</span>
          </h3>
        </div>
        <span className="text-xs font-semibold text-text/60 bg-white/80 px-2.5 py-1 rounded-lg border border-navy/10">
          Bac S2 Sénégal
        </span>
      </div>

      {/* Sélection du modèle */}
      <div className="mt-4">
        <label className="text-xs font-bold uppercase tracking-wider text-navy/70 block mb-2">
          Choisir une intégrale remarquable du Baccalauréat :
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {INTEGRAL_MODELS.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setSelectedModel(m);
                setBoundA(m.defaultA);
                setBoundB(m.defaultB);
              }}
              className={`p-3 rounded-xl text-left border text-xs font-bold transition-all active:scale-95 ${
                selectedModel.id === m.id
                  ? 'bg-navy text-white border-navy shadow-sm'
                  : 'bg-white text-navy/80 border-navy/15 hover:border-turquoise'
              }`}
            >
              <div className="text-[9px] text-turquoise uppercase tracking-wider font-extrabold mb-0.5">
                {m.badge}
              </div>
              <div className="truncate font-black">{m.name.split(' (')[0]}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Équations & Primitives */}
      <div className="mt-4 bg-white rounded-2xl border border-navy/10 p-4 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-text/60">
            Fonction à intégrer $f(x)$
          </span>
          <div className="mt-1">
            <MathRenderer content={`$${selectedModel.expressionMd}$`} />
          </div>
        </div>
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-text/60">
            Primitive trouvée $F(x)$
          </span>
          <div className="mt-1 font-bold text-turquoise">
            <MathRenderer content={`$${selectedModel.primitiveMd}$`} />
          </div>
        </div>
      </div>

      {/* SVG Canvas Interactif de l'Aire */}
      <div className="mt-5 bg-navy/95 rounded-2xl p-3 border border-navy/20 shadow-inner overflow-hidden">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto select-none font-sans"
        >
          {/* Grille */}
          <g stroke="#ffffff" strokeOpacity="0.07" strokeWidth="1">
            {[0, 1, 2, 3, 4, 5].map((gx) => (
              <line
                key={`gx-${gx}`}
                x1={mapX(gx)}
                y1={padTop}
                x2={mapX(gx)}
                y2={svgHeight - padBottom}
              />
            ))}
            {[0, 1, 2, 3, 4].map((gy) => (
              <line
                key={`gy-${gy}`}
                x1={padLeft}
                y1={mapY(gy)}
                x2={svgWidth - padRight}
                y2={mapY(gy)}
              />
            ))}
          </g>

          {/* Aire sous la courbe (zone hachurée colorée) */}
          <path
            d={areaPolyPoints.join(' ')}
            fill="#00F5D4"
            fillOpacity="0.35"
            stroke="#00F5D4"
            strokeWidth="1.5"
          />

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
          {[1, 2, 3, 4, 5].map((gx) => (
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
              stroke="#38BDF8"
              strokeWidth="3"
              strokeLinecap="round"
            />
          )}

          {/* Lignes de délimitation a et b */}
          <line
            x1={mapX(boundA)}
            y1={axisY0}
            x2={mapX(boundA)}
            y2={mapY(selectedModel.fn(boundA))}
            stroke="#00F5D4"
            strokeWidth="2.5"
            strokeDasharray="4,3"
          />
          <line
            x1={mapX(boundB)}
            y1={axisY0}
            x2={mapX(boundB)}
            y2={mapY(selectedModel.fn(boundB))}
            stroke="#FBBF24"
            strokeWidth="2.5"
            strokeDasharray="4,3"
          />

          {/* Points bornes sur l'axe Ox */}
          <circle cx={mapX(boundA)} cy={axisY0} r="5" fill="#00F5D4" />
          <text
            x={mapX(boundA)}
            y={axisY0 + 26}
            fill="#00F5D4"
            fontSize="11"
            fontWeight="bold"
            textAnchor="middle"
          >
            a = {boundA.toFixed(2)}
          </text>

          <circle cx={mapX(boundB)} cy={axisY0} r="5" fill="#FBBF24" />
          <text
            x={mapX(boundB)}
            y={axisY0 + 26}
            fill="#FBBF24"
            fontSize="11"
            fontWeight="bold"
            textAnchor="middle"
          >
            b = {boundB.toFixed(2)}
          </text>

          {/* Pastille aire dans la zone */}
          <g transform={`translate(${((mapX(boundA) + mapX(boundB)) / 2) - 45}, ${mapY(selectedModel.fn((boundA + boundB) / 2)) + 15})`}>
            <rect width="90" height="28" rx="6" fill="#0B132B" stroke="#00F5D4" strokeWidth="1" opacity="0.9" />
            <text x="45" y="18" fill="#00F5D4" fontSize="11" fontWeight="bold" textAnchor="middle">
              {integralValue.toFixed(3)} u.a.
            </text>
          </g>
        </svg>
      </div>

      {/* Sliders tactiles pour les bornes a et b */}
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4 bg-gradient-to-r from-navy/5 to-turquoise/10 rounded-2xl p-4 sm:p-5 border border-navy/10">
        {/* Slider borne a */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-navy flex items-center gap-1">
              Borne inférieure <MathRenderer content="$a$" /> :
            </span>
            <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded bg-turquoise text-navy">
              a = {boundA.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min={selectedModel.minBound}
            max={selectedModel.maxBound - 0.3}
            step={selectedModel.step}
            value={boundA}
            onChange={(e) => handleSetA(parseFloat(e.target.value))}
            className="w-full h-2.5 bg-navy/20 rounded-lg appearance-none cursor-pointer accent-turquoise"
          />
        </div>

        {/* Slider borne b */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-bold text-navy flex items-center gap-1">
              Borne supérieure <MathRenderer content="$b$" /> :
            </span>
            <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded bg-amber-500 text-white">
              b = {boundB.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min={selectedModel.minBound + 0.3}
            max={selectedModel.maxBound}
            step={selectedModel.step}
            value={boundB}
            onChange={(e) => handleSetB(parseFloat(e.target.value))}
            className="w-full h-2.5 bg-navy/20 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
        </div>
      </div>

      {/* Cartes métriques de l'intégrale */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Intégrale en u.a. */}
        <div className="bg-white rounded-2xl border border-navy/10 p-3.5 text-center">
          <div className="text-[10px] font-bold uppercase tracking-wider text-text/50">
            <MathRenderer content="Intégrale $\int_a^b f(x)\,dx$" />
          </div>
          <div className="mt-1 font-mono text-lg font-black text-navy">
            {integralValue.toFixed(4)} <span className="text-xs font-bold text-text/60">u.a.</span>
          </div>
          <span className="text-[10px] text-text/60">Unités d&apos;aire pures</span>
        </div>

        {/* Aire réelle en cm² */}
        <div className="bg-white rounded-2xl border border-navy/10 p-3.5 text-center">
          <div className="text-[10px] font-bold uppercase tracking-wider text-text/50">
            <MathRenderer content="Aire réelle ($2\text{ cm} \times 2\text{ cm}$)" />
          </div>
          <div className="mt-1 font-mono text-lg font-black text-turquoise">
            {areaCm2.toFixed(3)} <span className="text-xs font-bold">cm²</span>
          </div>
          <span className="text-[10px] text-text/60">Multiplié par 4 cm²</span>
        </div>

        {/* Valeur moyenne mu */}
        <div className="bg-white rounded-2xl border border-navy/10 p-3.5 text-center">
          <div className="text-[10px] font-bold uppercase tracking-wider text-text/50">
            <MathRenderer content="Valeur moyenne $\mu$" />
          </div>
          <div className="mt-1 font-mono text-lg font-black text-amber-600">
            {meanValue.toFixed(4)}
          </div>
          <span className="text-[10px] text-text/60">Hauteur moyenne du rectangle</span>
        </div>
      </div>

      {/* Formule de calcul développée */}
      <div className="mt-4 bg-navy/5 border border-navy/15 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-1.5">
          <StudyIcon name="cle_solution" size={16} className="text-navy" />
          <span className="text-xs font-bold text-navy uppercase tracking-wider">
            Calcul détaillé de l&apos;intégrale :
          </span>
        </div>
        <div className="bg-white rounded-xl p-3 border border-navy/10 overflow-x-auto text-center font-mono font-bold text-navy text-xs sm:text-sm">
          <MathRenderer
            content={`$\\int_{${boundA.toFixed(2)}}^{${boundB.toFixed(2)}} f(t)\\,dt = \\Big[F(t)\\Big]_{${boundA.toFixed(2)}}^{${boundB.toFixed(2)}} = F(${boundB.toFixed(2)}) - F(${boundA.toFixed(2)}) = ${integralValue.toFixed(4)}\\text{ u.a.}$`}
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
          <MathRenderer content={selectedModel.comment} />
        </div>
      </div>

      {/* Décryptage Wolof */}
      <div className="mt-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-950">
        <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
          <span>🇸🇳</span>
          <span>Xam-xam ci Wolof (Calcul d&apos;Aire ak Primitives) :</span>
        </div>
        <p className="italic text-amber-900 leading-relaxed font-medium">
          {selectedModel.wolofTip}
        </p>
      </div>
    </div>
  );
}

