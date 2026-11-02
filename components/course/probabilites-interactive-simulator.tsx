'use client';

import React, { useState } from 'react';
import StudyIcon from '@/components/ui/study-icon';
import MathRenderer from '@/components/course/math-renderer';

export default function ProbabilitesInteractiveSimulator() {
  const [totalTrialsN, setTotalTrialsN] = useState<number>(8);
  const [successProbP, setSuccessProbP] = useState<number>(0.4);

  // Calcul du coefficient binomial C_n^k
  const combination = (n: number, k: number): number => {
    if (k < 0 || k > n) return 0;
    if (k === 0 || k === n) return 1;
    let res = 1;
    for (let i = 1; i <= k; i++) {
      res = (res * (n - i + 1)) / i;
    }
    return Math.round(res);
  };

  // Distribution de la loi binomiale B(n, p)
  const binomialDist: { k: number; prob: number }[] = [];
  for (let k = 0; k <= totalTrialsN; k++) {
    const c = combination(totalTrialsN, k);
    const prob = c * Math.pow(successProbP, k) * Math.pow(1 - successProbP, totalTrialsN - k);
    binomialDist.push({ k, prob });
  }

  // Indicateurs fondamentaux
  const esperance = totalTrialsN * successProbP;
  const variance = totalTrialsN * successProbP * (1 - successProbP);
  const ecartType = Math.sqrt(variance);

  // Dimensions graphiques de l'histogramme SVG
  const width = 640;
  const height = 300;
  const paddingLeft = 45;
  const paddingRight = 20;
  const paddingTop = 25;
  const paddingBottom = 40;

  const graphW = width - paddingLeft - paddingRight;
  const graphH = height - paddingTop - paddingBottom;

  const maxProb = Math.max(...binomialDist.map((d) => d.prob), 0.35);

  const barWidth = Math.min(38, (graphW / (totalTrialsN + 1)) * 0.7);

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
              Simulateur Dynamique : Loi Binomiale &amp; Schéma de Bernoulli ℬ(n, p)
            </h3>
            <p className="text-xs text-text/60 mt-1 leading-snug">
              Variez le nombre d&apos;épreuves $n$ et la probabilité de succès $p$ pour visualiser la distribution
            </p>
          </div>
        </div>
        <span className="self-start sm:self-center text-xs font-semibold px-2.5 py-1 rounded-full bg-navy/5 text-navy border border-navy/10 shrink-0 whitespace-nowrap">
          Distribution Aléatoire
        </span>
      </div>

      {/* Sliders de contrôle */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-surface/50 rounded-xl p-4 border border-navy/5">
        <div>
          <div className="flex justify-between text-xs font-bold text-navy mb-1.5">
            <span>Nombre de répétitions : n</span>
            <span className="text-turquoise font-mono font-black">n = {totalTrialsN}</span>
          </div>
          <input
            type="range"
            min="2"
            max="12"
            step="1"
            value={totalTrialsN}
            onChange={(e) => setTotalTrialsN(parseInt(e.target.value, 10))}
            className="w-full accent-turquoise cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-text/40 mt-1">
            <span>2 épreuves</span>
            <span>12 épreuves</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-navy mb-1.5">
            <span>Probabilité d&apos;un succès : p</span>
            <span className="text-amber-600 font-mono font-black">p = {successProbP.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="0.05"
            max="0.95"
            step="0.05"
            value={successProbP}
            onChange={(e) => setSuccessProbP(parseFloat(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-text/40 mt-1">
            <span>p = 0,05</span>
            <span>p = 0,95</span>
          </div>
        </div>
      </div>

      {/* Cartes d'indicateurs fondamentaux */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-surface rounded-xl p-3.5 border border-navy/5">
          <span className="text-[10px] uppercase font-bold text-text/40 tracking-wider block">
            Espérance E(X) = n · p
          </span>
          <div className="text-base font-bold text-navy mt-1">
            <MathRenderer content={`$$E(X) = ${esperance.toFixed(2)}\\text{ succès}$$`} />
          </div>
        </div>

        <div className="bg-surface rounded-xl p-3.5 border border-navy/5">
          <span className="text-[10px] uppercase font-bold text-text/40 tracking-wider block">
            Variance V(X) = n · p(1 - p)
          </span>
          <div className="text-base font-bold text-navy mt-1">
            <MathRenderer content={`$$V(X) = ${variance.toFixed(2)}$$`} />
          </div>
        </div>

        <div className="bg-surface rounded-xl p-3.5 border border-navy/5">
          <span className="text-[10px] uppercase font-bold text-text/40 tracking-wider block">
            Écart-type σ(X) = √V(X)
          </span>
          <div className="text-base font-bold text-navy mt-1">
            <MathRenderer content={`$$\\sigma(X) = ${ecartType.toFixed(2)}$$`} />
          </div>
        </div>
      </div>

      {/* SVG Canvas - Histogramme des probabilités */}
      <div className="bg-[#0B132B] rounded-2xl p-4 border border-navy/20 shadow-inner flex flex-col items-center">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-2xl h-auto select-none">
          {/* Lignes horizontales de référence */}
          {[0.1, 0.2, 0.3, 0.4].map((pVal) => {
            if (pVal > maxProb * 1.1) return null;
            const yPos = paddingTop + graphH - (pVal / maxProb) * graphH;
            return (
              <g key={`prob-line-${pVal}`}>
                <line
                  x1={paddingLeft}
                  y1={yPos}
                  x2={width - paddingRight}
                  y2={yPos}
                  stroke="#ffffff"
                  strokeOpacity="0.08"
                  strokeDasharray="4,4"
                />
                <text
                  x={paddingLeft - 6}
                  y={yPos + 3}
                  fill="#94A3B8"
                  fontSize="10"
                  textAnchor="end"
                >
                  {(pVal * 100).toFixed(0)}%
                </text>
              </g>
            );
          })}

          {/* Axe horizontal Ox */}
          <line
            x1={paddingLeft}
            y1={paddingTop + graphH}
            x2={width - paddingRight}
            y2={paddingTop + graphH}
            stroke="#94A3B8"
            strokeWidth="2"
          />

          {/* Barres de probabilités pour chaque k */}
          {binomialDist.map((item, idx) => {
            const centerX = paddingLeft + (idx + 0.5) * (graphW / (totalTrialsN + 1));
            const barHeight = (item.prob / maxProb) * graphH;
            const yTop = paddingTop + graphH - barHeight;
            const isHighest = item.prob === Math.max(...binomialDist.map((d) => d.prob));

            return (
              <g key={`bar-${item.k}`}>
                <rect
                  x={centerX - barWidth / 2}
                  y={yTop}
                  width={barWidth}
                  height={Math.max(2, barHeight)}
                  rx="4"
                  fill={isHighest ? '#00F5D4' : '#38BDF8'}
                  fillOpacity={isHighest ? 0.95 : 0.75}
                  stroke={isHighest ? '#FFFFFF' : 'none'}
                  strokeWidth="1.5"
                />
                {/* Pourcentage au-dessus de la barre */}
                {item.prob >= 0.03 && (
                  <text
                    x={centerX}
                    y={yTop - 6}
                    fill={isHighest ? '#00F5D4' : '#E2E8F0'}
                    fontSize="9"
                    fontWeight="bold"
                    textAnchor="middle"
                  >
                    {(item.prob * 100).toFixed(1)}%
                  </text>
                )}
                {/* Libellé k sous l'axe */}
                <text
                  x={centerX}
                  y={paddingTop + graphH + 16}
                  fill={isHighest ? '#00F5D4' : '#94A3B8'}
                  fontSize="11"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {item.k}
                </text>
              </g>
            );
          })}

          <text
            x={width - paddingRight}
            y={paddingTop + graphH + 32}
            fill="#94A3B8"
            fontSize="10"
            textAnchor="end"
          >
            Nombre de succès k
          </text>
        </svg>

        {/* Commentaire dynamique sous le graphe */}
        <div className="w-full mt-3 bg-white/5 rounded-xl p-3 border border-white/10 text-xs text-white/90">
          <MathRenderer
            content={`Loi $\\mathcal{B}(${totalTrialsN};\\, ${successProbP.toFixed(
              2
            )})$ : En répétant $${totalTrialsN}$ fois l'expérience, le nombre de succès le plus probable est $k = ${Math.round(
              esperance
            )}$ avec une probabilité de ${(
              Math.max(...binomialDist.map((d) => d.prob)) * 100
            ).toFixed(1)}\\%$.`}
          />
        </div>

        {/* Décryptage Wolof */}
        <div className="w-full mt-3 bg-amber-500/10 rounded-xl p-3 border border-amber-500/20 text-xs text-amber-200">
          <div className="flex items-center gap-1.5 font-bold text-amber-400 mb-1">
            <span>🇸🇳</span>
            <span>Xam-xam ci Wolof (Loi Binomiale &amp; Nataalu Chance) :</span>
          </div>
          <p className="italic text-amber-100 leading-relaxed font-medium">
            {`« Ci n = ${totalTrialsN} tirs yu indépendant ak probabilité p = ${(successProbP * 100).toFixed(0)}%, nombre de succès bi gën a am chance mooy k = ${Math.round(esperance)} (Espérance E(X) = n·p = ${esperance.toFixed(2)}). Gisement bi gën a kawe ci graphe bi moo lay wax li gën a am chance xew ci réel bi ! »`}
          </p>
        </div>
      </div>
    </div>
  );
}

