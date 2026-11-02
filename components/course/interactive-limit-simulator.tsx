'use client';

import React, { useState } from 'react';
import StudyIcon from '@/components/ui/study-icon';
import MathRenderer from '@/components/course/math-renderer';

interface LimitFunction {
  id: string;
  name: string;
  badge: string;
  formulaMd: string;
  targetX: number;
  expectedLimit: number;
  fn: (x: number) => number;
  minDelta: number;
  maxDelta: number;
  defaultDelta: number;
  stepDelta: number;
  explanation: string;
  wolofTip: string;
  // Plage graphique pour le SVG
  graphXMin: number;
  graphXMax: number;
  graphYMin: number;
  graphYMax: number;
}

const LIMIT_FUNCTIONS: LimitFunction[] = [
  {
    id: 'sin_x',
    name: 'f(x) = sin(x) / x (Limite trigonométrique)',
    badge: 'Taux de variation',
    formulaMd: '\\lim_{x \\to 0} \\dfrac{\\sin x}{x} = 1',
    targetX: 0,
    expectedLimit: 1,
    fn: (x) => (Math.abs(x) < 1e-6 ? 1 : Math.sin(x) / x),
    minDelta: 0.01,
    maxDelta: 2.5,
    defaultDelta: 1.2,
    stepDelta: 0.05,
    explanation:
      'En $x = 0$, $f(0)$ n\'est pas définie (forme indéterminée $\\frac{0}{0}$). Mais en approchant infiniment de $0$, le quotient tend vers le nombre dérivé de $\\sin$ en $0$, c\'est-à-dire $\\cos(0) = 1$.',
    wolofTip:
      '« Booy sotti x = 0, sin(0)/0 dafay joxe 0/0. Waaye booy xool pente bi ci bérab 0, day joxe dérivée bu sinus ci 0, maanaam cos(0) = 1 ! Loolu tax lim sin(x)/x = 1. »',
    graphXMin: -2.8,
    graphXMax: 2.8,
    graphYMin: -0.2,
    graphYMax: 1.3,
  },
  {
    id: 'sqrt_conj',
    name: 'g(x) = (√(x+1) - 1) / x (Expression conjuguée)',
    badge: 'Forme 0/0 radicale',
    formulaMd: '\\lim_{x \\to 0} \\dfrac{\\sqrt{x+1} - 1}{x} = \\dfrac{1}{2} = 0{,}5',
    targetX: 0,
    expectedLimit: 0.5,
    fn: (x) => (Math.abs(x) < 1e-6 ? 0.5 : (Math.sqrt(x + 1) - 1) / x),
    minDelta: 0.01,
    maxDelta: 2.0,
    defaultDelta: 1.0,
    stepDelta: 0.05,
    explanation:
      'Multiplier par l\'expression conjuguée $(\\sqrt{x+1} + 1)$ au numérateur et au dénominateur permet de simplifier par $x$ : $\\frac{(x+1)-1}{x(\\sqrt{x+1}+1)} = \\frac{1}{\\sqrt{x+1}+1} \\to \\frac{1}{2}$.',
    wolofTip:
      '« Racine bi dafa tëjoon x bi ci suuf. Boo ko fafé ak conjugué bi (√(x+1) + 1), racine bi day daanu mu des 1/(√(x+1)+1). X boobu nga dindi moo taxoon forme 0/0 bi di am ! »',
    graphXMin: -0.8,
    graphXMax: 2.5,
    graphYMin: 0.0,
    graphYMax: 1.1,
  },
  {
    id: 'poly_fact',
    name: 'h(x) = (x² - 4) / (x - 2) (Factorisation polynôme)',
    badge: 'Forme 0/0 rationnelle',
    formulaMd: '\\lim_{x \\to 2} \\dfrac{x^2 - 4}{x - 2} = 4',
    targetX: 2,
    expectedLimit: 4,
    fn: (x) => (Math.abs(x - 2) < 1e-6 ? 4 : (x * x - 4) / (x - 2)),
    minDelta: 0.01,
    maxDelta: 2.5,
    defaultDelta: 1.2,
    stepDelta: 0.05,
    explanation:
      'En factorisant le numérateur grâce à l\'identité remarquable $x^2 - 4 = (x - 2)(x + 2)$, on simplifie par $(x - 2)$ pour tout $x \\neq 2$. Il reste $x + 2$, qui tend vers $2 + 2 = 4$ quand $x \\to 2$.',
    wolofTip:
      '« x² - 4 = (x - 2)(x + 2). (x - 2) bi ci kaw ak bi ci suuf dañuy dindi seen bopp, mu des x + 2. Boo ci defee x = 2, mu jox la 2 + 2 = 4 ci saas yi ! »',
    graphXMin: 0.0,
    graphXMax: 4.8,
    graphYMin: 1.0,
    graphYMax: 6.5,
  },
];

export default function InteractiveLimitSimulator() {
  const [selectedFunc, setSelectedFunc] = useState<LimitFunction>(LIMIT_FUNCTIONS[0]);
  const [delta, setDelta] = useState<number>(selectedFunc.defaultDelta);
  const [side, setSide] = useState<'right' | 'left'>('right');

  // Point d'essai courant
  const currentX = selectedFunc.targetX + (side === 'right' ? delta : -delta);
  const currentY = selectedFunc.fn(currentX);
  const distanceToLimit = Math.abs(currentY - selectedFunc.expectedLimit);
  const isExtremelyClose = distanceToLimit < 0.01;

  // Calcul des coordonnées SVG pour le rendu dynamique
  const svgWidth = 740;
  const svgHeight = 280;
  const padLeft = 70;
  const padRight = 40;
  const padTop = 35;
  const padBottom = 45;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const mapX = (x: number) =>
    padLeft + ((x - selectedFunc.graphXMin) / (selectedFunc.graphXMax - selectedFunc.graphXMin)) * plotW;
  const mapY = (y: number) =>
    padTop + plotH - ((y - selectedFunc.graphYMin) / (selectedFunc.graphYMax - selectedFunc.graphYMin)) * plotH;

  // Génération des points de la courbe
  const curvePoints: string[] = [];
  const steps = 80;
  const xSpan = selectedFunc.graphXMax - selectedFunc.graphXMin;

  for (let i = 0; i <= steps; i++) {
    const px = selectedFunc.graphXMin + (i / steps) * xSpan;
    const py = selectedFunc.fn(px);
    const sx = mapX(px);
    const sy = mapY(py);
    if (!isNaN(sy) && sy >= 10 && sy <= svgHeight - 10) {
      curvePoints.push(`${i === 0 ? 'M' : 'L'} ${sx.toFixed(1)} ${sy.toFixed(1)}`);
    }
  }

  // Coordonnées cibles et mobiles
  const targetXPixel = mapX(selectedFunc.targetX);
  const targetYPixel = mapY(selectedFunc.expectedLimit);
  const currentXPixel = mapX(currentX);
  const currentYPixel = mapY(currentY);

  const axisY0 = Math.max(padTop, Math.min(mapY(0), svgHeight - padBottom));
  const axisX0 = Math.max(padLeft, Math.min(mapX(0), svgWidth - padRight));

  return (
    <div className="my-6 rounded-3xl border-2 border-turquoise/30 bg-gradient-to-b from-white via-surface/30 to-surface/80 p-4 sm:p-6 shadow-md">
      {/* En-tête */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy/10 pb-3">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-turquoise bg-turquoise/15 px-2.5 py-0.5 rounded-full border border-turquoise/20">
            Laboratoire Interactif : Limites & Continuité
          </span>
          <h3 className="text-base sm:text-lg font-bold text-navy mt-1 flex items-center gap-2">
            <StudyIcon name="courbe_fonction" size={22} className="text-turquoise" />
            <span>Simulateur Visuel de Convergence vers la Limite</span>
          </h3>
        </div>
        <span className="text-xs font-semibold text-text/60 bg-white/80 px-2.5 py-1 rounded-lg border border-navy/10">
          Bac S2 Sénégal
        </span>
      </div>

      {/* Sélection de la fonction */}
      <div className="mt-4">
        <label className="text-xs font-bold uppercase tracking-wider text-navy/70 block mb-2">
          Choisir une limite remarquable d&apos;examen :
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {LIMIT_FUNCTIONS.map((fn) => (
            <button
              key={fn.id}
              onClick={() => {
                setSelectedFunc(fn);
                setDelta(fn.defaultDelta);
              }}
              className={`p-2.5 rounded-xl text-left border text-xs font-bold transition-all active:scale-95 ${
                selectedFunc.id === fn.id
                  ? 'bg-navy text-white border-navy shadow-sm'
                  : 'bg-white text-navy/80 border-navy/15 hover:border-turquoise'
              }`}
            >
              <div className="text-[9px] text-turquoise uppercase tracking-wider font-extrabold mb-0.5">
                {fn.badge}
              </div>
              <div className="truncate font-black">{fn.name.split(' (')[0]}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Équation de la limite étudiée */}
      <div className="mt-4 bg-navy/5 border border-navy/15 rounded-2xl p-4 text-center">
        <span className="text-[10px] font-bold uppercase tracking-wider text-text/50 block mb-1">
          Formule théorique démontrée :
        </span>
        <div className="font-mono text-base sm:text-lg font-bold text-navy">
          <MathRenderer content={`$${selectedFunc.formulaMd}$`} />
        </div>
      </div>

      {/* VÉRITABLE GRAPHIQUE VECTORIEL INTERACTIF EN DIRECT */}
      <div className="mt-4 bg-[#081521] rounded-2xl p-3 sm:p-4 border border-[#143048] shadow-inner overflow-hidden">
        <div className="flex flex-wrap items-center justify-between text-xs text-white/70 mb-2 px-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <div className="font-bold text-white">
              <MathRenderer content="Trajectoire dynamique sur la courbe $\mathcal{C}_f$" />
            </div>
          </div>
          <span className="text-turquoise text-[11px] font-mono">
            Point cible : ({selectedFunc.targetX}, L = {selectedFunc.expectedLimit})
          </span>
        </div>

        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto block select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <linearGradient id="curveGradLim" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00B8A9" />
              <stop offset="100%" stopColor="#38EF7D" />
            </linearGradient>
            <filter id="glowLim" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="glow" />
              <feComposite in="SourceGraphic" in2="glow" operator="over" />
            </filter>
          </defs>

          {/* Grille fine */}
          <g stroke="#143048" strokeWidth="1" strokeDasharray="3 3">
            {[0.25, 0.5, 0.75].map((ratio) => (
              <React.Fragment key={ratio}>
                <line
                  x1={padLeft}
                  y1={padTop + ratio * plotH}
                  x2={svgWidth - padRight}
                  y2={padTop + ratio * plotH}
                />
                <line
                  x1={padLeft + ratio * plotW}
                  y1={padTop}
                  x2={padLeft + ratio * plotW}
                  y2={svgHeight - padBottom}
                />
              </React.Fragment>
            ))}
          </g>

          {/* Axe Ox */}
          <line
            x1={padLeft - 10}
            y1={axisY0}
            x2={svgWidth - padRight + 15}
            y2={axisY0}
            stroke="#64748B"
            strokeWidth="1.5"
          />
          <polygon
            points={`${svgWidth - padRight + 15},${axisY0} ${svgWidth - padRight + 8},${axisY0 - 4} ${svgWidth - padRight + 8},${axisY0 + 4}`}
            fill="#64748B"
          />
          <text x={svgWidth - padRight + 20} y={axisY0 + 4} fill="#94A3B8" fontSize="11" fontWeight="bold">
            x
          </text>

          {/* Axe Oy */}
          <line
            x1={axisX0}
            y1={svgHeight - padBottom + 10}
            x2={axisX0}
            y2={padTop - 15}
            stroke="#64748B"
            strokeWidth="1.5"
          />
          <polygon
            points={`${axisX0},${padTop - 15} ${axisX0 - 4},${padTop - 8} ${axisX0 + 4},${padTop - 8}`}
            fill="#64748B"
          />
          <text x={axisX0 - 15} y={padTop - 15} fill="#94A3B8" fontSize="11" fontWeight="bold">
            y
          </text>

          {/* Ligne horizontale de la limite cible y = L */}
          <line
            x1={padLeft}
            y1={targetYPixel}
            x2={svgWidth - padRight}
            y2={targetYPixel}
            stroke="#38EF7D"
            strokeWidth="1.5"
            strokeDasharray="5 3"
          />
          <text
            x={padLeft + 5}
            y={targetYPixel - 6}
            fill="#38EF7D"
            fontSize="10"
            fontWeight="bold"
          >
            Limite L = {selectedFunc.expectedLimit}
          </text>

          {/* Ligne verticale de la cible x = x0 */}
          <line
            x1={targetXPixel}
            y1={padTop}
            x2={targetXPixel}
            y2={svgHeight - padBottom}
            stroke="#00B8A9"
            strokeWidth="1"
            strokeDasharray="4 4"
            opacity="0.6"
          />

          {/* Tracé de la courbe f(x) */}
          <path
            d={curvePoints.join(' ')}
            fill="none"
            stroke="url(#curveGradLim)"
            strokeWidth="3.5"
            strokeLinecap="round"
            filter="url(#glowLim)"
          />

          {/* Lignes de projection pour le point courant M(x, f(x)) */}
          <line
            x1={currentXPixel}
            y1={currentYPixel}
            x2={currentXPixel}
            y2={axisY0}
            stroke="#F7B731"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />
          <line
            x1={currentXPixel}
            y1={currentYPixel}
            x2={axisX0}
            y2={currentYPixel}
            stroke="#F7B731"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />

          {/* Marqueur x sur l'axe horizontal */}
          <circle cx={currentXPixel} cy={axisY0} r="4" fill="#F7B731" />
          <text
            x={currentXPixel}
            y={axisY0 + 16}
            fill="#F7B731"
            fontSize="10"
            fontWeight="bold"
            textAnchor="middle"
          >
            x={currentX.toFixed(2)}
          </text>

          {/* Point cible limite (cercle ouvert si forme 0/0 non définie) */}
          <circle cx={targetXPixel} cy={targetYPixel} r="7" fill="none" stroke="#38EF7D" strokeWidth="2.5" />
          <circle cx={targetXPixel} cy={targetYPixel} r="3" fill="#081521" />

          {/* Point mobile M(x, f(x)) de l'élève */}
          <circle
            cx={currentXPixel}
            cy={currentYPixel}
            r="8"
            fill="#F7B731"
            stroke="#FFFFFF"
            strokeWidth="2"
            filter="url(#glowLim)"
          />

          {/* Bulle d'affichage au-dessus du point mobile */}
          <rect
            x={Math.max(padLeft, Math.min(currentXPixel - 45, svgWidth - padRight - 90))}
            y={Math.max(10, currentYPixel - 30)}
            width="90"
            height="20"
            rx="5"
            fill="#143048"
            stroke="#F7B731"
            strokeWidth="1"
          />
          <text
            x={Math.max(padLeft + 45, Math.min(currentXPixel, svgWidth - padRight - 45))}
            y={Math.max(24, currentYPixel - 16)}
            fill="#FFFFFF"
            fontSize="10"
            fontWeight="bold"
            textAnchor="middle"
          >
            f(x) = {currentY.toFixed(3)}
          </text>
        </svg>
      </div>

      {/* Contrôle tactile du rapprochement */}
      <div className="mt-5 bg-gradient-to-r from-navy/5 to-turquoise/10 rounded-2xl p-4 sm:p-5 border border-navy/10 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <StudyIcon name="rigueur_compas" size={18} className="text-navy" />
            <span className="text-xs sm:text-sm font-bold text-navy flex items-center gap-1">
              Faire glisser x vers la cible <MathRenderer content={`$x_0 = ${selectedFunc.targetX}$`} /> :
            </span>
          </div>

          {/* Boutons Approche Gauche / Droite */}
          <div className="flex gap-1 bg-white p-1 rounded-xl border border-navy/10 text-xs font-bold">
            <button
              onClick={() => setSide('left')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                side === 'left' ? 'bg-navy text-white shadow-sm' : 'text-text/70 hover:bg-surface'
              }`}
            >
              À gauche ($x &lt; x_0$)
            </button>
            <button
              onClick={() => setSide('right')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                side === 'right' ? 'bg-navy text-white shadow-sm' : 'text-text/70 hover:bg-surface'
              }`}
            >
              À droite ($x &gt; x_0$)
            </button>
          </div>
        </div>

        <input
          type="range"
          min={selectedFunc.minDelta}
          max={selectedFunc.maxDelta}
          step={selectedFunc.stepDelta}
          value={delta}
          onChange={(e) => setDelta(parseFloat(e.target.value))}
          className="w-full h-3 bg-navy/20 rounded-lg appearance-none cursor-pointer accent-turquoise"
        />

        <div className="flex justify-between text-[11px] font-semibold text-text/60">
          <span className="text-emerald-700 font-bold">
            🎯 Contact immédiat (écart : {selectedFunc.minDelta})
          </span>
          <span className="text-turquoise font-black">
            Distance à la cible : {delta.toFixed(2)}
          </span>
          <span>Éloigné (écart : {selectedFunc.maxDelta})</span>
        </div>
      </div>

      {/* Mesures en direct */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Abscisse x */}
        <div className="bg-white rounded-2xl border border-navy/10 p-3.5 text-center">
          <div className="text-[10px] font-bold uppercase tracking-wider text-text/50">
            <MathRenderer content="Abscisse testée $x$" />
          </div>
          <div className="mt-1 font-mono text-lg font-black text-navy">
            {currentX.toFixed(4)}
          </div>
          <div className="text-[10px] text-text/60">
            <MathRenderer content={`Écart avec $x_0$ : ${delta.toFixed(3)}`} />
          </div>
        </div>

        {/* Valeur f(x) */}
        <div className="bg-white rounded-2xl border border-navy/10 p-3.5 text-center">
          <div className="text-[10px] font-bold uppercase tracking-wider text-text/50">
            <MathRenderer content="Image calculée $f(x)$" />
          </div>
          <div className="mt-1 font-mono text-lg font-black text-turquoise">
            {currentY.toFixed(4)}
          </div>
          <span className="text-[10px] text-text/60">
            Limite attendue : {selectedFunc.expectedLimit}
          </span>
        </div>

        {/* Écart à la limite */}
        <div
          className={`rounded-2xl border p-3.5 text-center flex flex-col justify-center items-center transition-all ${
            isExtremelyClose
              ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold'
              : 'bg-amber-50 border-amber-300 text-amber-950'
          }`}
        >
          <div className="text-[10px] font-bold uppercase tracking-wider">
            <MathRenderer content="Écart $|f(x) - L|$" />
          </div>
          <div className="mt-1 font-mono text-lg font-black">
            {distanceToLimit.toFixed(4)}
          </div>
          <span className="text-[10px] mt-0.5">
            {isExtremelyClose ? '✓ Convergence atteinte !' : 'Continue de rapprocher x'}
          </span>
        </div>
      </div>

      {/* Note Pédagogique */}
      <div className="mt-4 bg-turquoise/5 border border-turquoise/20 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-1">
          <StudyIcon name="conseil_professeur" size={16} className="text-turquoise" />
          <span className="text-xs font-bold text-turquoise uppercase tracking-wider">
            Explication pédagogique de l&apos;examinateur :
          </span>
        </div>
        <MathRenderer content={selectedFunc.explanation} />
      </div>

      {/* Décodage en Wolof dans le Simulateur */}
      <div className="mt-3 bg-amber-500/10 border border-amber-500/25 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-base">🇸🇳</span>
          <span className="text-xs font-bold text-amber-900 uppercase tracking-wider">
            Xam-xam ci Wolof (Décodage Tactile) :
          </span>
        </div>
        <p className="text-xs sm:text-sm text-amber-950 italic font-medium leading-relaxed">
          {selectedFunc.wolofTip}
        </p>
      </div>
    </div>
  );
}
