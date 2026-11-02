'use client';

import React, { useState, useMemo } from 'react';
import StudyIcon from '@/components/ui/study-icon';

interface DataPoint {
  x: number;
  y: number;
}

const PRESETS = [
  {
    name: "Production d'arachide au Sénégal (Année vs Milliers de Tonnes)",
    points: [
      { x: 1, y: 12 },
      { x: 2, y: 15 },
      { x: 3, y: 21 },
      { x: 4, y: 26 },
      { x: 5, y: 32 },
    ],
    xLabel: "Année (x)",
    yLabel: "Production (y)",
  },
  {
    name: "Dépenses d'engrais vs Rendement du mil (kg/ha)",
    points: [
      { x: 10, y: 45 },
      { x: 20, y: 55 },
      { x: 30, y: 72 },
      { x: 40, y: 88 },
      { x: 50, y: 105 },
    ],
    xLabel: "Engrais en kg (x)",
    yLabel: "Rendement (y)",
  },
  {
    name: "Vitesse d'une réaction chimique vs Température",
    points: [
      { x: 20, y: 14 },
      { x: 30, y: 28 },
      { x: 40, y: 52 },
      { x: 50, y: 85 },
      { x: 60, y: 130 },
    ],
    xLabel: "Température °C (x)",
    yLabel: "Vitesse mmol/s (y)",
  },
];

export default function StatistiquesInteractiveSimulator() {
  const [selectedPresetIdx, setSelectedPresetIdx] = useState(0);
  const [customPoints, setCustomPoints] = useState<DataPoint[]>(PRESETS[0].points);
  const [predictX, setPredictX] = useState<number>(6);

  const activePreset = PRESETS[selectedPresetIdx];

  // Load preset
  const handlePresetSelect = (idx: number) => {
    setSelectedPresetIdx(idx);
    setCustomPoints(PRESETS[idx].points);
    const lastX = PRESETS[idx].points[PRESETS[idx].points.length - 1].x;
    setPredictX(lastX + (lastX - PRESETS[idx].points[0].x) / (PRESETS[idx].points.length - 1));
  };

  // Calculations
  const stats = useMemo(() => {
    const n = customPoints.length;
    if (n === 0) return null;

    let sumX = 0;
    let sumY = 0;
    let sumX2 = 0;
    let sumY2 = 0;
    let sumXY = 0;

    customPoints.forEach((p) => {
      sumX += p.x;
      sumY += p.y;
      sumX2 += p.x * p.x;
      sumY2 += p.y * p.y;
      sumXY += p.x * p.y;
    });

    const meanX = sumX / n;
    const meanY = sumY / n;

    const varX = sumX2 / n - meanX * meanX;
    const varY = sumY2 / n - meanY * meanY;

    const sigmaX = Math.sqrt(Math.max(0, varX));
    const sigmaY = Math.sqrt(Math.max(0, varY));

    const covXY = sumXY / n - meanX * meanY;

    // Linear regression y = ax + b
    const a = varX !== 0 ? covXY / varX : 0;
    const b = meanY - a * meanX;

    // Linear regression x = a'y + b'
    const aPrime = varY !== 0 ? covXY / varY : 0;
    const bPrime = meanX - aPrime * meanY;

    // Correlation coefficient r
    const denom = sigmaX * sigmaY;
    const r = denom !== 0 ? covXY / denom : 0;
    const r2 = r * r;

    // Predicted Y
    const predictedY = a * predictX + b;

    return {
      n,
      sumX,
      sumY,
      sumX2,
      sumY2,
      sumXY,
      meanX,
      meanY,
      varX,
      varY,
      sigmaX,
      sigmaY,
      covXY,
      a,
      b,
      aPrime,
      bPrime,
      r,
      r2,
      predictedY,
    };
  }, [customPoints, predictX]);

  // Adjust point value
  const handlePointChange = (index: number, field: 'x' | 'y', value: number) => {
    const updated = [...customPoints];
    updated[index] = { ...updated[index], [field]: value };
    setCustomPoints(updated);
  };

  // SVG dimensions & bounds
  const svgBounds = useMemo(() => {
    if (customPoints.length === 0) return { minX: 0, maxX: 10, minY: 0, maxY: 10 };
    const xs = customPoints.map((p) => p.x).concat(predictX);
    const ys = customPoints.map((p) => p.y).concat(stats?.predictedY ?? 0);
    const minX = Math.min(0, ...xs);
    const maxX = Math.max(...xs) * 1.15;
    const minY = Math.min(0, ...ys);
    const maxY = Math.max(...ys) * 1.15;
    return { minX, maxX, minY, maxY };
  }, [customPoints, predictX, stats]);

  const width = 500;
  const height = 300;
  const padding = 45;

  const scaleX = (x: number) =>
    padding + ((x - svgBounds.minX) / (svgBounds.maxX - svgBounds.minX || 1)) * (width - 2 * padding);
  const scaleY = (y: number) =>
    height - padding - ((y - svgBounds.minY) / (svgBounds.maxY - svgBounds.minY || 1)) * (height - 2 * padding);

  return (
    <div className="bg-white rounded-2xl border border-navy/10 shadow-sm p-4 sm:p-6 mb-8">
      {/* Header Mobile First */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy/10 pb-4 mb-6">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2.5 rounded-xl bg-turquoise/10 text-turquoise shrink-0 mt-0.5 sm:mt-0">
            <StudyIcon name="courbe_fonction" size={24} />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-navy break-words">
              Laboratoire Tactile : Régression Linéaire &amp; Moindres Carrés
            </h3>
            <p className="text-xs sm:text-sm text-navy/60">
              Manipulez le nuage de points, observez la droite (D) passer par G et calculez r en direct
            </p>
          </div>
        </div>
        <span className="self-start sm:self-center px-3 py-1 bg-turquoise/10 text-turquoise text-xs font-semibold rounded-full shrink-0 whitespace-nowrap">
          Simulateur Interactif
        </span>
      </div>

      {/* Preset selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {PRESETS.map((p, idx) => (
          <button
            key={p.name}
            onClick={() => handlePresetSelect(idx)}
            className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
              selectedPresetIdx === idx
                ? 'bg-navy text-white shadow-sm'
                : 'bg-navy/5 text-navy/70 hover:bg-navy/10'
            }`}
          >
            {p.name.split('(')[0]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive SVG Scatter Plot */}
        <div className="lg:col-span-7 bg-[#0B132B] rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden">
          <div className="w-full flex items-center justify-between mb-2 px-2 text-xs text-slate-300">
            <span>Nuage de points &amp; Droite de régression (D)</span>
            <span className="text-turquoise font-mono font-bold">
              y = {stats?.a.toFixed(2)}x + {stats?.b.toFixed(2)}
            </span>
          </div>

          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto max-h-[320px]">
            {/* Grid lines */}
            <line
              x1={padding}
              y1={height - padding}
              x2={width - padding}
              y2={height - padding}
              stroke="#334155"
              strokeWidth="1.5"
            />
            <line
              x1={padding}
              y1={padding}
              x2={padding}
              y2={height - padding}
              stroke="#334155"
              strokeWidth="1.5"
            />

            {/* Regression line (D) */}
            {stats && (
              <line
                x1={scaleX(svgBounds.minX)}
                y1={scaleY(stats.a * svgBounds.minX + stats.b)}
                x2={scaleX(svgBounds.maxX)}
                y2={scaleY(stats.a * svgBounds.maxX + stats.b)}
                stroke="#00F5D4"
                strokeWidth="2.5"
                strokeDasharray="none"
              />
            )}

            {/* Scatter points */}
            {customPoints.map((pt, i) => (
              <g key={i}>
                <circle
                  cx={scaleX(pt.x)}
                  cy={scaleY(pt.y)}
                  r="5.5"
                  fill="#38BDF8"
                  stroke="#FFFFFF"
                  strokeWidth="1.5"
                />
                <text
                  x={scaleX(pt.x) + 7}
                  y={scaleY(pt.y) - 6}
                  fill="#94A3B8"
                  fontSize="10"
                  fontFamily="sans-serif"
                >
                  M{i + 1}({pt.x},{pt.y})
                </text>
              </g>
            ))}

            {/* Point Moyen G */}
            {stats && (
              <g>
                <circle
                  cx={scaleX(stats.meanX)}
                  cy={scaleY(stats.meanY)}
                  r="7.5"
                  fill="#FBBF24"
                  stroke="#0B132B"
                  strokeWidth="2"
                />
                <text
                  x={scaleX(stats.meanX) + 9}
                  y={scaleY(stats.meanY) + 4}
                  fill="#FBBF24"
                  fontSize="11"
                  fontWeight="bold"
                  fontFamily="sans-serif"
                >
                  G({stats.meanX.toFixed(1)}, {stats.meanY.toFixed(1)})
                </text>
              </g>
            )}

            {/* Prediction Point */}
            {stats && (
              <g>
                <circle
                  cx={scaleX(predictX)}
                  cy={scaleY(stats.predictedY)}
                  r="6"
                  fill="#F43F5E"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
                <line
                  x1={scaleX(predictX)}
                  y1={height - padding}
                  x2={scaleX(predictX)}
                  y2={scaleY(stats.predictedY)}
                  stroke="#F43F5E"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
                <line
                  x1={padding}
                  y1={scaleY(stats.predictedY)}
                  x2={scaleX(predictX)}
                  y2={scaleY(stats.predictedY)}
                  stroke="#F43F5E"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
              </g>
            )}

            {/* Axis labels */}
            <text
              x={width - padding}
              y={height - padding + 22}
              fill="#94A3B8"
              fontSize="10"
              textAnchor="end"
              fontFamily="sans-serif"
            >
              {activePreset.xLabel}
            </text>
            <text
              x={padding}
              y={padding - 12}
              fill="#94A3B8"
              fontSize="10"
              fontFamily="sans-serif"
            >
              {activePreset.yLabel}
            </text>
          </svg>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-2 text-[11px] text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8]" />
              <span>Points Mi(xi, yi)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FBBF24]" />
              <span>Point Moyen G(x̄, ȳ)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-0.5 bg-[#00F5D4]" />
              <span>Droite (D) : y = ax + b</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F43F5E]" />
              <span>Prédiction estimée</span>
            </div>
          </div>
        </div>

        {/* Right Dashboard : Calculated metrics and predictor */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          {stats && (
            <div className="space-y-3">
              {/* Summary Metrics */}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-navy/5 border border-navy/10">
                  <span className="text-[10px] uppercase font-bold text-navy/50 block">Moyenne x̄</span>
                  <span className="text-base font-bold text-navy">{stats.meanX.toFixed(2)}</span>
                </div>
                <div className="p-3 rounded-xl bg-navy/5 border border-navy/10">
                  <span className="text-[10px] uppercase font-bold text-navy/50 block">Moyenne ȳ</span>
                  <span className="text-base font-bold text-navy">{stats.meanY.toFixed(2)}</span>
                </div>
                <div className="p-3 rounded-xl bg-navy/5 border border-navy/10">
                  <span className="text-[10px] uppercase font-bold text-navy/50 block">Variance V(X)</span>
                  <span className="text-base font-bold text-navy">{stats.varX.toFixed(2)}</span>
                </div>
                <div className="p-3 rounded-xl bg-navy/5 border border-navy/10">
                  <span className="text-[10px] uppercase font-bold text-navy/50 block">Covariance Cov(X,Y)</span>
                  <span className="text-base font-bold text-navy">{stats.covXY.toFixed(2)}</span>
                </div>
              </div>

              {/* Correlation Badge */}
              <div
                className={`p-3.5 rounded-xl border flex items-center justify-between ${
                  Math.abs(stats.r) >= 0.87
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : 'bg-amber-50 border-amber-200 text-amber-950'
                }`}
              >
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider block opacity-75">
                    Coefficient de Corrélation
                  </span>
                  <span className="text-lg font-bold font-mono">
                    r = {stats.r.toFixed(4)}
                  </span>
                  <span className="text-xs block opacity-80">
                    r² = {(stats.r2 * 100).toFixed(1)}% de variance expliquée
                  </span>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full font-bold shrink-0 ${
                    Math.abs(stats.r) >= 0.87
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-600 text-white'
                  }`}
                >
                  {Math.abs(stats.r) >= 0.87 ? 'Très Forte' : 'Modérée'}
                </span>
              </div>

              {/* Equation of (D) */}
              <div className="p-3.5 rounded-xl bg-turquoise/10 border border-turquoise/20 text-navy">
                <span className="text-[10px] uppercase font-bold text-turquoise tracking-wider block mb-1">
                  Équation de la Droite de Régression (D)
                </span>
                <p className="text-sm font-mono font-bold">
                  (D) : y = {stats.a >= 0 ? stats.a.toFixed(3) : `- ${Math.abs(stats.a).toFixed(3)}`} x + {stats.b.toFixed(3)}
                </p>
                <p className="text-[11px] text-navy/70 mt-0.5">
                  Passe par G({stats.meanX.toFixed(2)}, {stats.meanY.toFixed(2)})
                </p>
              </div>

              {/* Real-time Predictor Slider */}
              <div className="p-3.5 rounded-xl bg-navy/5 border border-navy/10 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-navy">Estimation prédictive pour x = {predictX} :</span>
                  <span className="font-mono font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md">
                    y ≈ {stats.predictedY.toFixed(2)}
                  </span>
                </div>
                <input
                  type="range"
                  min={svgBounds.minX}
                  max={svgBounds.maxX}
                  step={0.5}
                  value={predictX}
                  onChange={(e) => setPredictX(parseFloat(e.target.value))}
                  className="w-full accent-navy cursor-pointer"
                />
                <p className="text-[10px] text-navy/60 italic">
                  Déplacez le curseur pour simuler une estimation future par extrapolation linéaire.
                </p>
              </div>

              {/* Décryptage Wolof */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-950">
                <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
                  <span>🇸🇳</span>
                  <span>Xam-xam ci Wolof (Statistiques &amp; Droite D) :</span>
                </div>
                <p className="italic text-amber-900 leading-relaxed font-medium">
                  {`« Point moyen G(${stats.meanX.toFixed(1)}, ${stats.meanY.toFixed(1)}) mooy diggu mbootaay gi. Droite bi (D) dafa am pente a = ${stats.a.toFixed(2)} : boo yokkee x ci 1 unité, y day yokk ci ${stats.a.toFixed(2)}. Ndax |r| = ${Math.abs(stats.r).toFixed(2)} ${Math.abs(stats.r) >= 0.87 ? '≥ 0,87, kon li ngay wax am na doole lool !' : '< 0,87, ajustement linéaire bi amul doole gu doy.'} »`}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
