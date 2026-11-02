'use client';

import React, { useState } from 'react';
import StudyIcon from '@/components/ui/study-icon';
import MathRenderer from '@/components/course/math-renderer';

interface SuiteModel {
  id: string;
  name: string;
  badge: string;
  recurrenceMd: string;
  explicitMd: string;
  expectedLimit: number | null; // null si divergente vers +inf
  limitLabelMd: string;
  calculate: (n: number) => number;
  maxN: number;
  comment: string;
  yMin: number;
  yMax: number;
  wolofTip: string;
}

const SUITE_MODELS: SuiteModel[] = [
  {
    id: 'homographique',
    name: 'u_{n+1} = (2u_n + 3)/(u_n + 4) (Arithmético-géométrique)',
    badge: 'Croissante & Majorée',
    recurrenceMd: 'u_0 = 0{,}2 \\quad \\text{et} \\quad u_{n+1} = \\dfrac{2u_n + 3}{u_n + 4}',
    explicitMd: '\\text{Théorème de convergence monotone } (u_n \\le 1)',
    expectedLimit: 1,
    limitLabelMd: '\\lim_{n \\to +\\infty} u_n = 1',
    calculate: (n: number) => {
      let val = 0.2;
      for (let i = 0; i < n; i++) {
        val = (2 * val + 3) / (val + 4);
      }
      return val;
    },
    maxN: 20,
    comment:
      'La suite commence à $u_0 = 0{,}2$, elle est strictement croissante et majorée par $1$. Elle converge vers la solution positive de $L = \\frac{2L+3}{L+4}$, soit $L = 1$.',
    yMin: 0,
    yMax: 1.2,
    wolofTip:
      '« Xoolal ni uₙ di yéegee ndànk-ndànk jëm ci 1 : ndax dafa majorée par 1 te croissante, mënul romb 1 muk ! Equation bi L = (2L+3)/(L+4) mooy joxe L = 1. »',
  },
  {
    id: 'geometrique',
    name: 'v_n = 4 × (0,7)ⁿ (Suite Géométrique |q| < 1)',
    badge: 'Décroissante vers 0',
    recurrenceMd: 'v_{n+1} = 0{,}7 \\times v_n \\quad \\text{avec} \\quad v_0 = 4',
    explicitMd: 'v_n = 4 \\times (0{,}7)^n',
    expectedLimit: 0,
    limitLabelMd: '\\lim_{n \\to +\\infty} v_n = 0',
    calculate: (n: number) => 4 * Math.pow(0.7, n),
    maxN: 20,
    comment:
      'Puisque la raison $q = 0{,}7$ vérifie $-1 < q < 1$, on a immédiatement $\\lim_{n \\to +\\infty} (0{,}7)^n = 0$. La suite s\'écrase rapidement vers $0$.',
    yMin: -0.2,
    yMax: 4.5,
    wolofTip:
      '« Raison bi q = 0,7 dafa nekk ci diggante -1 ak 1. Boo yokkee n, vₙ day wàcc gawaan ba melni zéro ! Loolu mooy doole wu suites géométriques au Bac S2. »',
  },
  {
    id: 'arithmetique',
    name: 'w_n = 1 + 0,3n (Suite Arithmétique r > 0)',
    badge: 'Divergente vers +∞',
    recurrenceMd: 'w_{n+1} = w_n + 0{,}3 \\quad \\text{avec} \\quad w_0 = 1',
    explicitMd: 'w_n = 1 + 0{,}3n',
    expectedLimit: null,
    limitLabelMd: '\\lim_{n \\to +\\infty} w_n = +\\infty',
    calculate: (n: number) => 1 + 0.3 * n,
    maxN: 20,
    comment:
      'Une suite arithmétique de raison $r > 0$ n\'est jamais majorée : elle diverge vers $+\\infty$ par sauts constants de $0{,}3$.',
    yMin: 0,
    yMax: 7.5,
    wolofTip:
      '« Suite arithmétique bi dafay yokk 0,3 ci sa bu nekk. Amul plafon bu ko tëj : day wéy di dem ba ca infini (+∞) ! »',
  },
];

export default function SuitesInteractiveSimulator() {
  const [selected, setSelected] = useState<SuiteModel>(SUITE_MODELS[0]);
  const [currentN, setCurrentN] = useState<number>(3);

  const un = selected.calculate(currentN);
  const unPlus1 = selected.calculate(currentN + 1);
  const diff = unPlus1 - un;
  const isIncreasing = diff > 0.0001;
  const isDecreasing = diff < -0.0001;

  const distanceToLimit =
    selected.expectedLimit !== null ? Math.abs(un - selected.expectedLimit) : null;

  // Configuration du graphe SVG
  const svgWidth = 740;
  const svgHeight = 270;
  const padLeft = 60;
  const padRight = 40;
  const padTop = 30;
  const padBottom = 40;

  const plotW = svgWidth - padLeft - padRight;
  const plotH = svgHeight - padTop - padBottom;

  const mapX = (n: number) => padLeft + (n / selected.maxN) * plotW;
  const mapY = (y: number) =>
    padTop + plotH - ((y - selected.yMin) / (selected.yMax - selected.yMin)) * plotH;

  const pointsList: { n: number; val: number; x: number; y: number }[] = [];
  for (let i = 0; i <= selected.maxN; i++) {
    const v = selected.calculate(i);
    pointsList.push({
      n: i,
      val: v,
      x: mapX(i),
      y: mapY(v),
    });
  }

  const axisY0 = Math.max(padTop, Math.min(mapY(0), svgHeight - padBottom));
  const limitYPixel = selected.expectedLimit !== null ? mapY(selected.expectedLimit) : null;

  return (
    <div className="my-6 rounded-3xl border-2 border-turquoise/30 bg-gradient-to-b from-white via-surface/30 to-surface/80 p-4 sm:p-6 shadow-md">
      {/* En-tête */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy/10 pb-3">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-turquoise bg-turquoise/15 px-2.5 py-0.5 rounded-full border border-turquoise/20">
            Laboratoire Interactif : Suites Numériques
          </span>
          <h3 className="text-base sm:text-lg font-bold text-navy mt-1 flex items-center gap-2">
            <StudyIcon name="formule_cle" size={20} className="text-turquoise" />
            <span>Simulateur Visuel d&apos;Évolution et de Convergence</span>
          </h3>
        </div>
        <span className="text-xs font-semibold text-text/60 bg-white/80 px-2.5 py-1 rounded-lg border border-navy/10">
          Bac S2 Sénégal
        </span>
      </div>

      {/* Choix de la suite */}
      <div className="mt-4">
        <label className="text-xs font-bold uppercase tracking-wider text-navy/70 block mb-2">
          Sélectionner une suite d&apos;examen :
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {SUITE_MODELS.map((s) => (
            <button
              key={s.id}
              onClick={() => {
                setSelected(s);
                setCurrentN(3);
              }}
              className={`p-2.5 rounded-xl text-left border text-xs font-bold transition-all active:scale-95 ${
                selected.id === s.id
                  ? 'bg-navy text-white border-navy shadow-sm'
                  : 'bg-white text-navy/80 border-navy/15 hover:border-turquoise'
              }`}
            >
              <div className="text-[9px] text-turquoise uppercase tracking-wider font-extrabold mb-0.5">
                {s.badge}
              </div>
              <div className="truncate font-black">{s.name.split(' (')[0]}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Formules de définition */}
      <div className="mt-4 bg-white rounded-2xl border border-navy/10 p-4 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-text/60">
            <MathRenderer content="Relation de récurrence / Définition" />
          </div>
          <div className="mt-1 font-bold text-navy">
            <MathRenderer content={`$${selected.recurrenceMd}$`} />
          </div>
        </div>
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-text/60">
            <MathRenderer content="Comportement limite théorique" />
          </div>
          <div className="mt-1 font-bold text-turquoise">
            <MathRenderer content={`$${selected.limitLabelMd}$`} />
          </div>
        </div>
      </div>

      {/* GRAPHE VECTORIEL INTERACTIF DES TERMES DISCRETS */}
      <div className="mt-4 bg-[#081521] rounded-2xl p-3 sm:p-4 border border-[#143048] shadow-inner overflow-hidden">
        <div className="flex flex-wrap items-center justify-between text-xs text-white/70 mb-2 px-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-turquoise animate-pulse" />
            <span className="font-bold text-white">Nuage de points discrets (n, uₙ)</span>
          </div>
          <span className="text-turquoise text-[11px] font-mono">
            Rang sélectionné : n = {currentN}
          </span>
        </div>

        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto block select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Grille */}
          <g stroke="#143048" strokeWidth="1" strokeDasharray="3 3">
            {[0.25, 0.5, 0.75].map((r) => (
              <line
                key={r}
                x1={padLeft}
                y1={padTop + r * plotH}
                x2={svgWidth - padRight}
                y2={padTop + r * plotH}
              />
            ))}
          </g>

          {/* Axe horizontal n */}
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
            n
          </text>

          {/* Axe vertical u_n */}
          <line
            x1={padLeft}
            y1={svgHeight - padBottom + 10}
            x2={padLeft}
            y2={padTop - 15}
            stroke="#64748B"
            strokeWidth="1.5"
          />
          <polygon
            points={`${padLeft},${padTop - 15} ${padLeft - 4},${padTop - 8} ${padLeft + 4},${padTop - 8}`}
            fill="#64748B"
          />
          <text x={padLeft - 20} y={padTop - 15} fill="#94A3B8" fontSize="11" fontWeight="bold">
            uₙ
          </text>

          {/* Ligne de limite L si existante */}
          {limitYPixel !== null && (
            <g>
              <line
                x1={padLeft}
                y1={limitYPixel}
                x2={svgWidth - padRight}
                y2={limitYPixel}
                stroke="#38EF7D"
                strokeWidth="1.5"
                strokeDasharray="6 3"
              />
              <text x={padLeft + 10} y={limitYPixel - 6} fill="#38EF7D" fontSize="10" fontWeight="bold">
                Limite L = {selected.expectedLimit}
              </text>
            </g>
          )}

          {/* Tiges et points de tous les termes */}
          {pointsList.map((pt) => {
            const isSelectedPoint = pt.n === currentN;
            return (
              <g key={pt.n}>
                {/* Tige verticale discrète */}
                <line
                  x1={pt.x}
                  y1={axisY0}
                  x2={pt.x}
                  y2={pt.y}
                  stroke={isSelectedPoint ? '#F7B731' : '#143048'}
                  strokeWidth={isSelectedPoint ? 2.5 : 1}
                />
                {/* Point discret */}
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={isSelectedPoint ? 7 : 4}
                  fill={isSelectedPoint ? '#F7B731' : '#00B8A9'}
                  stroke={isSelectedPoint ? '#FFFFFF' : '#081521'}
                  strokeWidth={1.5}
                />
                {/* Label n sous l'axe pour les multiples de 5 */}
                {pt.n % 5 === 0 && (
                  <text
                    x={pt.x}
                    y={axisY0 + 15}
                    fill="#64748B"
                    fontSize="9"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {pt.n}
                  </text>
                )}
              </g>
            );
          })}

          {/* Bulle flottante au-dessus du point courant */}
          {(() => {
            const curPt = pointsList[currentN];
            if (!curPt) return null;
            return (
              <g>
                <rect
                  x={Math.max(padLeft, Math.min(curPt.x - 45, svgWidth - padRight - 90))}
                  y={Math.max(10, curPt.y - 30)}
                  width="90"
                  height="20"
                  rx="5"
                  fill="#143048"
                  stroke="#F7B731"
                  strokeWidth="1"
                />
                <text
                  x={Math.max(padLeft + 45, Math.min(curPt.x, svgWidth - padRight - 45))}
                  y={Math.max(24, curPt.y - 16)}
                  fill="#FFFFFF"
                  fontSize="10"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  u({currentN}) = {un.toFixed(3)}
                </text>
              </g>
            );
          })()}
        </svg>
      </div>

      {/* Slider tactile pour changer l'indice n */}
      <div className="mt-5 bg-gradient-to-r from-navy/5 to-turquoise/10 rounded-2xl p-4 sm:p-5 border border-navy/10 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <StudyIcon name="rigueur_compas" size={18} className="text-navy" />
            <span className="text-xs sm:text-sm font-bold text-navy flex items-center gap-1">
              Faire évoluer le rang <MathRenderer content="$n$" /> :
            </span>
          </div>
          <span className="font-mono font-black text-sm sm:text-base px-3 py-1 rounded-lg bg-navy text-white shadow-inner">
            Rang n = {currentN}
          </span>
        </div>

        <input
          type="range"
          min={0}
          max={selected.maxN}
          step={1}
          value={currentN}
          onChange={(e) => setCurrentN(parseInt(e.target.value, 10))}
          className="w-full h-3 bg-navy/20 rounded-lg appearance-none cursor-pointer accent-turquoise my-2"
        />

        <div className="flex justify-between text-[11px] font-semibold text-text/60">
          <span>Premier terme (n = 0)</span>
          <span className="text-turquoise font-bold">Glissez vers la droite pour voir l&apos;évolution</span>
          <span>Grand rang (n = {selected.maxN})</span>
        </div>
      </div>

      {/* Mesures dynamiques */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Terme u_n */}
        <div className="bg-white rounded-2xl border border-navy/10 p-3.5 text-center">
          <div className="text-[10px] font-bold uppercase tracking-wider text-text/50">
            <MathRenderer content="Valeur du terme $u_n$" />
          </div>
          <div className="mt-1 font-mono text-lg font-black text-navy">
            {un.toFixed(4)}
          </div>
          <span className="text-[10px] text-text/60">Rang actuel : {currentN}</span>
        </div>

        {/* Variation u_{n+1} - u_n */}
        <div className="bg-white rounded-2xl border border-navy/10 p-3.5 text-center">
          <div className="text-[10px] font-bold uppercase tracking-wider text-text/50">
            <MathRenderer content="Variation $u_{n+1} - u_n$" />
          </div>
          <div
            className={`mt-1 font-mono text-lg font-black ${
              isIncreasing ? 'text-emerald-600' : isDecreasing ? 'text-rose-600' : 'text-navy'
            }`}
          >
            {diff >= 0 ? `+${diff.toFixed(4)}` : diff.toFixed(4)}
          </div>
          <span className="text-[10px] font-bold text-text/60">
            {isIncreasing ? '↗ Suite croissante' : isDecreasing ? '↘ Suite décroissante' : 'Stationnaire'}
          </span>
        </div>

        {/* Convergence vers L */}
        <div className="bg-white rounded-2xl border border-navy/10 p-3.5 text-center">
          <div className="text-[10px] font-bold uppercase tracking-wider text-text/50">
            <MathRenderer content="Écart $|u_n - L|$" />
          </div>
          <div className="mt-1 font-mono text-lg font-black text-turquoise">
            {distanceToLimit !== null ? distanceToLimit.toFixed(4) : '+∞ (Divergente)'}
          </div>
          <span className="text-[10px] text-text/60">
            {distanceToLimit !== null && distanceToLimit < 0.01
              ? '🎯 Proximité immédiate de la limite'
              : 'Écart restant à combler'}
          </span>
        </div>
      </div>

      {/* Conseil pédagogique */}
      <div className="mt-4 bg-turquoise/5 border border-turquoise/20 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-1">
          <StudyIcon name="conseil_professeur" size={16} className="text-turquoise" />
          <span className="text-xs font-bold text-turquoise uppercase tracking-wider">
            Conseil clé pour l&apos;exercice de suites au Bac :
          </span>
        </div>
        <MathRenderer content={selected.comment} />
      </div>

      {/* Décryptage Wolof */}
      <div className="mt-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-950">
        <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
          <span>🇸🇳</span>
          <span>Xam-xam ci Wolof (Suites ak Convergence) :</span>
        </div>
        <p className="italic text-amber-900 leading-relaxed font-medium">
          {selected.wolofTip}
        </p>
      </div>
    </div>
  );
}

