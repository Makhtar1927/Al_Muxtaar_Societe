'use client';

import React, { useState } from 'react';
import StudyIcon from '@/components/ui/study-icon';
import MathRenderer from '@/components/course/math-renderer';

export default function ComplexesInteractiveSimulator() {
  const [realPart, setRealPart] = useState<number>(2.0);
  const [imagPart, setImagPart] = useState<number>(2.0);
  const [powerN, setPowerN] = useState<number>(1);

  // Calculs complexes fondamentaux
  const modulus = Math.sqrt(realPart * realPart + imagPart * imagPart);
  const argumentRad = Math.atan2(imagPart, realPart);
  const argumentDeg = (argumentRad * 180) / Math.PI;

  // Puissance z^n (Formule de Moivre)
  const powerModulus = Math.pow(modulus, powerN);
  const powerArgRad = powerN * argumentRad;
  const powerReal = powerModulus * Math.cos(powerArgRad);
  const powerImag = powerModulus * Math.sin(powerArgRad);

  // Coordonnées graphiques SVG
  const width = 640;
  const height = 340;
  const originX = width / 2;
  const originY = height / 2;
  const scale = 36; // 1 unité = 36 pixels

  const toSvgX = (x: number) => originX + x * scale;
  const toSvgY = (y: number) => originY - y * scale;

  const pointX = toSvgX(realPart);
  const pointY = toSvgY(imagPart);

  // Formatage de l'écriture trigonométrique
  const formatFractionPi = (rad: number) => {
    const piMultiple = rad / Math.PI;
    const commonFractions: { [key: string]: string } = {
      '0': '0',
      '0.5': '\\frac{\\pi}{2}',
      '-0.5': '-\\frac{\\pi}{2}',
      '0.25': '\\frac{\\pi}{4}',
      '-0.25': '-\\frac{\\pi}{4}',
      '0.333': '\\frac{\\pi}{3}',
      '-0.333': '-\\frac{\\pi}{3}',
      '0.167': '\\frac{\\pi}{6}',
      '-0.167': '-\\frac{\\pi}{6}',
      '1': '\\pi',
      '-1': '-\\pi',
    };

    for (const key in commonFractions) {
      if (Math.abs(piMultiple - parseFloat(key)) < 0.04) {
        return commonFractions[key];
      }
    }
    return `${(rad).toFixed(2)}\\text{ rad}`;
  };

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
              Simulateur Dynamique : Plan Complexe d&apos;Argand &amp; Formes d&apos;Euler
            </h3>
            <p className="text-xs text-text/60 mt-1 leading-snug">
              Modifiez la partie réelle et imaginaire pour observer le module, l&apos;argument et la puissance $z^n$
            </p>
          </div>
        </div>
        <span className="self-start sm:self-center text-xs font-semibold px-2.5 py-1 rounded-full bg-navy/5 text-navy border border-navy/10 shrink-0 whitespace-nowrap">
          Simulation Géométrique
        </span>
      </div>

      {/* Sliders de contrôle */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-surface/50 rounded-xl p-4 border border-navy/5">
        <div>
          <div className="flex justify-between text-xs font-bold text-navy mb-1.5">
            <span>Partie Réelle : a = Re(z)</span>
            <span className="text-turquoise font-mono font-black">{realPart.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="-4"
            max="4"
            step="0.2"
            value={realPart}
            onChange={(e) => setRealPart(parseFloat(e.target.value))}
            className="w-full accent-turquoise cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-text/40 mt-1">
            <span>-4</span>
            <span>+4</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-navy mb-1.5">
            <span>Partie Imaginaire : b = Im(z)</span>
            <span className="text-amber-600 font-mono font-black">{imagPart.toFixed(1)}</span>
          </div>
          <input
            type="range"
            min="-4"
            max="4"
            step="0.2"
            value={imagPart}
            onChange={(e) => setImagPart(parseFloat(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-text/40 mt-1">
            <span>-4</span>
            <span>+4</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-xs font-bold text-navy mb-1.5">
            <span>Puissance n (Formule de Moivre)</span>
            <span className="text-rose-500 font-mono font-black">n = {powerN}</span>
          </div>
          <input
            type="range"
            min="1"
            max="6"
            step="1"
            value={powerN}
            onChange={(e) => setPowerN(parseInt(e.target.value, 10))}
            className="w-full accent-rose-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-text/40 mt-1">
            <span>1</span>
            <span>6</span>
          </div>
        </div>
      </div>

      {/* Math Results Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-surface rounded-xl p-3.5 border border-navy/5">
          <span className="text-[10px] uppercase font-bold text-text/40 tracking-wider block">
            Forme Algébrique
          </span>
          <div className="text-sm font-bold text-navy mt-1">
            <MathRenderer
              content={`$$z = ${realPart >= 0 ? realPart.toFixed(1) : realPart.toFixed(1)} ${
                imagPart >= 0 ? '+' : '-'
              } ${Math.abs(imagPart).toFixed(1)}i$$`}
            />
          </div>
        </div>

        <div className="bg-surface rounded-xl p-3.5 border border-navy/5">
          <span className="text-[10px] uppercase font-bold text-text/40 tracking-wider block">
            Module &amp; Argument
          </span>
          <div className="text-sm font-bold text-navy mt-1">
            <MathRenderer
              content={`$$|z| = ${modulus.toFixed(2)}, \\; \\arg(z) \\equiv ${formatFractionPi(argumentRad)}$$`}
            />
          </div>
        </div>

        <div className="bg-surface rounded-xl p-3.5 border border-navy/5">
          <span className="text-[10px] uppercase font-bold text-text/40 tracking-wider block">
            Forme Exponentielle
          </span>
          <div className="text-sm font-bold text-navy mt-1">
            <MathRenderer
              content={`$$z = ${modulus.toFixed(2)} \\cdot e^{i(${formatFractionPi(argumentRad)})}$$`}
            />
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="bg-[#0B132B] rounded-2xl p-4 border border-navy/20 shadow-inner flex flex-col items-center">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-2xl h-auto select-none">
          {/* Cercles de référence r=1, r=2, r=3, r=4 */}
          {[1, 2, 3, 4].map((r) => (
            <circle
              key={`circle-r-${r}`}
              cx={originX}
              cy={originY}
              r={r * scale}
              fill="none"
              stroke="#ffffff"
              strokeOpacity="0.08"
              strokeWidth="1"
            />
          ))}

          {/* Grille cartésienne */}
          <g stroke="#ffffff" strokeOpacity="0.06" strokeWidth="1">
            {[-4, -3, -2, -1, 1, 2, 3, 4].map((v) => (
              <React.Fragment key={`grid-${v}`}>
                <line x1={originX + v * scale} y1={20} x2={originX + v * scale} y2={height - 20} />
                <line x1={40} y1={originY - v * scale} x2={width - 40} y2={originY - v * scale} />
              </React.Fragment>
            ))}
          </g>

          {/* Axe Réel (Ox) */}
          <line x1={30} y1={originY} x2={width - 30} y2={originY} stroke="#94A3B8" strokeWidth="2" />
          <polygon points={`${width - 30},${originY} ${width - 40},${originY - 5} ${width - 40},${originY + 5}`} fill="#94A3B8" />
          <text x={width - 25} y={originY + 4} fill="#94A3B8" fontSize="11" fontWeight="bold">Re</text>

          {/* Axe Imaginaire (Oy) */}
          <line x1={originX} y1={height - 20} x2={originX} y2={20} stroke="#94A3B8" strokeWidth="2" />
          <polygon points={`${originX},20 ${originX - 5},30 ${originX + 5},30`} fill="#94A3B8" />
          <text x={originX + 8} y={24} fill="#94A3B8" fontSize="11" fontWeight="bold">Im</text>

          {/* Projections orthogonales */}
          <line
            x1={pointX}
            y1={pointY}
            x2={pointX}
            y2={originY}
            stroke="#FBBF24"
            strokeWidth="1.5"
            strokeDasharray="4,4"
          />
          <line
            x1={pointX}
            y1={pointY}
            x2={originX}
            y2={pointY}
            stroke="#FBBF24"
            strokeWidth="1.5"
            strokeDasharray="4,4"
          />

          {/* Vecteur OM (z) */}
          <line
            x1={originX}
            y1={originY}
            x2={pointX}
            y2={pointY}
            stroke="#00F5D4"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Point M(z) */}
          <circle
            cx={pointX}
            cy={pointY}
            r="6"
            fill="#00F5D4"
            stroke="#FFFFFF"
            strokeWidth="2"
          />
          <text
            x={pointX + 10}
            y={pointY - 8}
            fill="#00F5D4"
            fontSize="12"
            fontWeight="bold"
          >
            M(z)
          </text>

          {/* Arc d'argument θ */}
          {modulus > 0.4 && (
            <path
              d={`M ${originX + 28} ${originY} A 28 28 0 ${Math.abs(argumentRad) > Math.PI ? 1 : 0} ${
                argumentRad < 0 ? 1 : 0
              } ${originX + 28 * Math.cos(argumentRad)} ${originY - 28 * Math.sin(argumentRad)}`}
              fill="none"
              stroke="#F43F5E"
              strokeWidth="2"
            />
          )}

          {/* Point de puissance z^n si n > 1 et reste dans le cadre */}
          {powerN > 1 && Math.abs(powerReal) <= 7 && Math.abs(powerImag) <= 4.5 && (
            <g>
              <line
                x1={originX}
                y1={originY}
                x2={toSvgX(powerReal)}
                y2={toSvgY(powerImag)}
                stroke="#F43F5E"
                strokeWidth="2"
                strokeDasharray="5,3"
              />
              <circle
                cx={toSvgX(powerReal)}
                cy={toSvgY(powerImag)}
                r="5"
                fill="#F43F5E"
                stroke="#FFFFFF"
                strokeWidth="1.5"
              />
              <text
                x={toSvgX(powerReal) + 8}
                y={toSvgY(powerImag) - 6}
                fill="#F43F5E"
                fontSize="11"
                fontWeight="bold"
              >
                M&apos;(z^{powerN})
              </text>
            </g>
          )}
        </svg>

        {/* Commentaire dynamique sous le canevas */}
        <div className="w-full mt-3 bg-white/5 rounded-xl p-3 border border-white/10 text-xs text-white/90">
          <MathRenderer
            content={`D'après la formule de Moivre : $z^{${powerN}} = \\left(${modulus.toFixed(
              2
            )} e^{i(${formatFractionPi(argumentRad)})}\\right)^{${powerN}} = ${(powerModulus).toFixed(
              2
            )} e^{i(${formatFractionPi(powerArgRad)})} = ${(powerReal).toFixed(2)} ${
              powerImag >= 0 ? '+' : '-'
            } ${(Math.abs(powerImag)).toFixed(2)}i$.`}
          />
        </div>

        {/* Décryptage Wolof */}
        <div className="w-full mt-3 bg-amber-500/10 rounded-xl p-3 border border-amber-500/20 text-xs text-amber-200">
          <div className="flex items-center gap-1.5 font-bold text-amber-400 mb-1">
            <span>🇸🇳</span>
            <span>Xam-xam ci Wolof (Formule de Moivre &amp; Boussole) :</span>
          </div>
          <p className="italic text-amber-100 leading-relaxed font-medium">
            {powerN === 1
              ? `« Fii point M(z) dafa am module |z| = ${modulus.toFixed(2)} (soréwaay bi ak por bi) ak argument θ = ${argumentDeg.toFixed(1)}° (cap bi ci boussole). Forme exponentielle bi mooy r·e^(iθ). »`
              : `« Boo boolee puissance n = ${powerN} (Moivre) : soréwaay bi day doon |z|^${powerN} = ${powerModulus.toFixed(2)}, te boussole bi day wër ${(powerN * argumentDeg).toFixed(1)}° (${powerN} yoon angle bi) ! »`}
          </p>
        </div>
      </div>
    </div>
  );
}

