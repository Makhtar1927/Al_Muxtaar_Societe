'use client';

import React, { useState } from 'react';
import StudyIcon from '@/components/ui/study-icon';
import MathRenderer from '@/components/course/math-renderer';

type LabMode = 'affixes_moivre' | 'triangles_bac' | 'ensembles_points' | 'racines_equations';

export default function ComplexesInteractiveSimulator() {
  const [activeMode, setActiveMode] = useState<LabMode>('affixes_moivre');

  // =========================================================================
  // MODE 1 : AFFIXES & SPIRALE DE MOIVRE
  // =========================================================================
  const [realPart, setRealPart] = useState<number>(1.5);
  const [imagPart, setImagPart] = useState<number>(1.5);
  const [powerN, setPowerN] = useState<number>(3);
  const [showConjugate, setShowConjugate] = useState<boolean>(true);
  const [showInverse, setShowInverse] = useState<boolean>(false);
  const [showSpiral, setShowSpiral] = useState<boolean>(true);

  const modulus = Math.sqrt(realPart * realPart + imagPart * imagPart);
  const argumentRad = Math.atan2(imagPart, realPart);

  // Puissances z^k pour la spirale de Moivre
  const spiralPoints: { k: number; x: number; y: number; mod: number; arg: number }[] = [];
  if (modulus > 0) {
    for (let k = 1; k <= powerN; k++) {
      const rK = Math.pow(modulus, k);
      const thetaK = k * argumentRad;
      spiralPoints.push({
        k,
        x: rK * Math.cos(thetaK),
        y: rK * Math.sin(thetaK),
        mod: rK,
        arg: thetaK,
      });
    }
  }

  // =========================================================================
  // MODE 2 : LABORATOIRE GÉOMÉTRIQUE DES TRIANGLES (A, B, C)
  // =========================================================================
  const [ptA, setPtA] = useState<{ x: number; y: number }>({ x: 1, y: 1 });
  const [ptB, setPtB] = useState<{ x: number; y: number }>({ x: 3, y: -1 });
  const [ptC, setPtC] = useState<{ x: number; y: number }>({ x: 2, y: 2 });

  // Vecteurs et quotient Q = (z_C - z_A) / (z_B - z_A)
  const vAB = { x: ptB.x - ptA.x, y: ptB.y - ptA.y };
  const vAC = { x: ptC.x - ptA.x, y: ptC.y - ptA.y };
  const vBC = { x: ptC.x - ptB.x, y: ptC.y - ptB.y };

  const distAB = Math.sqrt(vAB.x * vAB.x + vAB.y * vAB.y);
  const distAC = Math.sqrt(vAC.x * vAC.x + vAC.y * vAC.y);
  const distBC = Math.sqrt(vBC.x * vBC.x + vBC.y * vBC.y);

  // Quotient complexe Q = num / den
  const denModuleSq = vAB.x * vAB.x + vAB.y * vAB.y;
  const qReal = denModuleSq > 0 ? (vAC.x * vAB.x + vAC.y * vAB.y) / denModuleSq : 0;
  const qImag = denModuleSq > 0 ? (vAC.y * vAB.x - vAC.x * vAB.y) / denModuleSq : 0;
  const qMod = Math.sqrt(qReal * qReal + qImag * qImag);
  const qArgRad = Math.atan2(qImag, qReal);
  const qArgDeg = (qArgRad * 180) / Math.PI;

  // Détection de la nature du triangle
  let triangleNature = 'Triangle quelconque';
  let triangleBadgeColor = 'bg-surface text-navy border-navy/20';

  if (denModuleSq > 0) {
    const isIsoceleA = Math.abs(distAB - distAC) < 0.08;
    const isRectangleA = Math.abs(qReal) < 0.05 && Math.abs(Math.abs(qArgDeg) - 90) < 3;
    const isEquilateral =
      Math.abs(distAB - distAC) < 0.08 &&
      Math.abs(distAB - distBC) < 0.08 &&
      (Math.abs(Math.abs(qArgDeg) - 60) < 3 || Math.abs(qMod - 1) < 0.05);
    const isAlignes = Math.abs(qImag) < 0.04 || Math.abs(qArgDeg) < 2 || Math.abs(Math.abs(qArgDeg) - 180) < 2;

    if (isAlignes) {
      triangleNature = 'Points A, B et C alignés (Q ∈ ℝ)';
      triangleBadgeColor = 'bg-rose-50 text-rose-700 border-rose-300';
    } else if (isEquilateral) {
      triangleNature = 'Triangle ABC Équilatéral (|Q| = 1 et arg(Q) = ±π/3)';
      triangleBadgeColor = 'bg-purple-50 text-purple-700 border-purple-300';
    } else if (isRectangleA && isIsoceleA) {
      triangleNature = 'Triangle ABC Rectangle et Isocèle en A (Q = ±i)';
      triangleBadgeColor = 'bg-emerald-50 text-emerald-800 border-emerald-300';
    } else if (isRectangleA) {
      triangleNature = 'Triangle ABC Rectangle en A (Q ∈ iℝ*)';
      triangleBadgeColor = 'bg-blue-50 text-blue-800 border-blue-300';
    } else if (isIsoceleA) {
      triangleNature = 'Triangle ABC Isocèle en A (AB = AC, |Q| = 1)';
      triangleBadgeColor = 'bg-amber-50 text-amber-800 border-amber-300';
    }
  }

  // Presets pour les triangles
  const setTrianglePreset = (preset: 'bac2023' | 'equilateral' | 'rectangle' | 'alignes') => {
    if (preset === 'bac2023') {
      // Q = i -> Rectangle isocèle en A
      setPtA({ x: 1, y: 1 });
      setPtB({ x: 3, y: 1 });
      setPtC({ x: 1, y: 3 });
    } else if (preset === 'equilateral') {
      // Triangle équilatéral de côté 2
      setPtA({ x: 0, y: 0 });
      setPtB({ x: 2, y: 0 });
      setPtC({ x: 1, y: parseFloat((Math.sqrt(3)).toFixed(2)) });
    } else if (preset === 'rectangle') {
      setPtA({ x: 0, y: 0 });
      setPtB({ x: 3, y: 0 });
      setPtC({ x: 0, y: 2 });
    } else if (preset === 'alignes') {
      setPtA({ x: -1, y: -1 });
      setPtB({ x: 1, y: 1 });
      setPtC({ x: 2, y: 2 });
    }
  };

  // =========================================================================
  // MODE 3 : DÉTECTEUR D'ENSEMBLES DE POINTS (ℰ) DU BAC S2
  // =========================================================================
  type EnsembleType = 'mediatrice' | 'cercle_centre' | 'diametre_orthogonal' | 'droite_alignement';
  const [ensembleType, setEnsembleType] = useState<EnsembleType>('mediatrice');
  const [ensA, setEnsA] = useState<{ x: number; y: number }>({ x: -2, y: 1 });
  const [ensB, setEnsB] = useState<{ x: number; y: number }>({ x: 2, y: -1 });
  const [ensRadius, setEnsRadius] = useState<number>(2.5);

  // Milieu de [AB]
  const midAB = { x: (ensA.x + ensB.x) / 2, y: (ensA.y + ensB.y) / 2 };
  const vEnsAB = { x: ensB.x - ensA.x, y: ensB.y - ensA.y };
  const distEnsAB = Math.sqrt(vEnsAB.x * vEnsAB.x + vEnsAB.y * vEnsAB.y);

  // =========================================================================
  // MODE 4 : SOLVEUR INTERACTIF DE RACINES CARRÉES (Z = X + iY)
  // =========================================================================
  const [inputX, setInputX] = useState<number>(3);
  const [inputY, setInputY] = useState<number>(4);

  const modZ = Math.sqrt(inputX * inputX + inputY * inputY);
  const rootX = Math.sqrt(Math.max(0, (modZ + inputX) / 2));
  const rootY = Math.sqrt(Math.max(0, (modZ - inputX) / 2)) * (inputY >= 0 ? 1 : -1);

  // Formatage des angles en fractions de pi
  const formatFractionPi = (rad: number) => {
    let normalized = rad;
    while (normalized > Math.PI) normalized -= 2 * Math.PI;
    while (normalized <= -Math.PI) normalized += 2 * Math.PI;

    const piMultiple = normalized / Math.PI;
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
      '0.667': '\\frac{2\\pi}{3}',
      '-0.667': '-\\frac{2\\pi}{3}',
      '0.75': '\\frac{3\\pi}{4}',
      '-0.75': '-\\frac{3\\pi}{4}',
      '0.833': '\\frac{5\\pi}{6}',
      '-0.833': '-\\frac{5\\pi}{6}',
      '1': '\\pi',
      '-1': '-\\pi',
    };

    for (const key in commonFractions) {
      if (Math.abs(piMultiple - parseFloat(key)) < 0.04) {
        return commonFractions[key];
      }
    }
    return `${(normalized).toFixed(2)}\\text{ rad}`;
  };

  // Dimensions graphiques SVG
  const width = 640;
  const height = 360;
  const originX = width / 2;
  const originY = height / 2;
  const scale = 36; // 1 unité = 36 px

  const toSvgX = (x: number) => originX + x * scale;
  const toSvgY = (y: number) => originY - y * scale;

  return (
    <div className="bg-white rounded-3xl border border-navy/15 p-4 sm:p-7 shadow-md space-y-6">
      {/* Header Principal du Laboratoire */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-navy/10 pb-5">
        <div className="flex items-start sm:items-center gap-3.5 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-turquoise to-[#009E91] flex items-center justify-center text-navy shadow-sm shrink-0 p-2">
            <StudyIcon name="rigueur_compas" size={28} />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-turquoise uppercase tracking-wider bg-turquoise/10 px-2.5 py-0.5 rounded-full">
                Laboratoire Virtuel Haut de Gamme
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Terminale S2
              </span>
            </div>
            <h3 className="font-extrabold text-navy text-lg sm:text-2xl leading-tight mt-1">
              Laboratoire Interactif : Nombres Complexes &amp; Géométrie du Bac
            </h3>
            <p className="text-xs sm:text-sm text-text/70 mt-1">
              Visualisez le plan d&apos;Argand-Cauchy, la spirale de Moivre, les configurations de triangles et les ensembles de points.
            </p>
          </div>
        </div>
      </div>

      {/* Navigation par Onglets Stylisés */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 p-1.5 bg-surface/70 rounded-2xl border border-navy/10">
        <button
          type="button"
          onClick={() => setActiveMode('affixes_moivre')}
          className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeMode === 'affixes_moivre'
              ? 'bg-navy text-white shadow-sm'
              : 'text-text/70 hover:text-navy hover:bg-white/60'
          }`}
        >
          <span>🌀</span>
          <span className="truncate">Plan d&apos;Argand &amp; Moivre</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMode('triangles_bac')}
          className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeMode === 'triangles_bac'
              ? 'bg-navy text-white shadow-sm'
              : 'text-text/70 hover:text-navy hover:bg-white/60'
          }`}
        >
          <span>📐</span>
          <span className="truncate">Triangles &amp; Quotients</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMode('ensembles_points')}
          className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeMode === 'ensembles_points'
              ? 'bg-navy text-white shadow-sm'
              : 'text-text/70 hover:text-navy hover:bg-white/60'
          }`}
        >
          <span>🎯</span>
          <span className="truncate">Ensembles de Points (ℰ)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMode('racines_equations')}
          className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeMode === 'racines_equations'
              ? 'bg-navy text-white shadow-sm'
              : 'text-text/70 hover:text-navy hover:bg-white/60'
          }`}
        >
          <span>⚡</span>
          <span className="truncate">Racines Carrées de Z</span>
        </button>
      </div>

      {/* =================================================================== */}
      {/* CONTENU MODE 1 : AFFIXES & SPIRALE DE MOIVRE                         */}
      {/* =================================================================== */}
      {activeMode === 'affixes_moivre' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Contrôles interactifs */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-surface/60 rounded-2xl p-4 border border-navy/10">
            <div>
              <div className="flex justify-between text-xs font-bold text-navy mb-1.5">
                <span>Partie Réelle : a = Re(z)</span>
                <span className="text-turquoise font-mono font-black text-sm">{realPart.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="-3.5"
                max="3.5"
                step="0.1"
                value={realPart}
                onChange={(e) => setRealPart(parseFloat(e.target.value))}
                className="w-full accent-turquoise cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-text/40 mt-1">
                <span>-3.5</span>
                <span>0</span>
                <span>+3.5</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-navy mb-1.5">
                <span>Partie Imaginaire : b = Im(z)</span>
                <span className="text-amber-600 font-mono font-black text-sm">{imagPart.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="-3.5"
                max="3.5"
                step="0.1"
                value={imagPart}
                onChange={(e) => setImagPart(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-text/40 mt-1">
                <span>-3.5</span>
                <span>0</span>
                <span>+3.5</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-navy mb-1.5">
                <span>Puissance n (Formule de Moivre)</span>
                <span className="text-rose-600 font-mono font-black text-sm">n = {powerN}</span>
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
                <span>z¹</span>
                <span>z³</span>
                <span>z⁶</span>
              </div>
            </div>
          </div>

          {/* Options d'affichage */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="text-text/70 font-semibold">Afficher sur le plan :</span>
            <label className="inline-flex items-center gap-1.5 cursor-pointer bg-surface px-3 py-1 rounded-lg border border-navy/10 hover:bg-surface-muted transition-colors">
              <input
                type="checkbox"
                checked={showConjugate}
                onChange={(e) => setShowConjugate(e.target.checked)}
                className="accent-turquoise rounded"
              />
              <span className="font-medium text-navy">Conjugué z̄ ({realPart.toFixed(1)} - {imagPart.toFixed(1)}i)</span>
            </label>
            <label className="inline-flex items-center gap-1.5 cursor-pointer bg-surface px-3 py-1 rounded-lg border border-navy/10 hover:bg-surface-muted transition-colors">
              <input
                type="checkbox"
                checked={showInverse}
                onChange={(e) => setShowInverse(e.target.checked)}
                className="accent-turquoise rounded"
              />
              <span className="font-medium text-navy">Inverse $1/z$</span>
            </label>
            <label className="inline-flex items-center gap-1.5 cursor-pointer bg-surface px-3 py-1 rounded-lg border border-navy/10 hover:bg-surface-muted transition-colors">
              <input
                type="checkbox"
                checked={showSpiral}
                onChange={(e) => setShowSpiral(e.target.checked)}
                className="accent-turquoise rounded"
              />
              <span className="font-medium text-navy">Spirale de Moivre ($z^1 \to z^{powerN}$)</span>
            </label>
          </div>

          {/* Cartes de résultats mathématiques */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-surface rounded-2xl p-4 border border-navy/10 space-y-1">
              <span className="text-[11px] uppercase font-bold text-navy/50 tracking-wider block">
                1. Forme Algébrique
              </span>
              <div className="text-sm font-bold text-navy">
                <MathRenderer
                  content={`$$z = ${realPart.toFixed(1)} ${imagPart >= 0 ? '+' : '-'} ${Math.abs(imagPart).toFixed(1)}i$$`}
                />
              </div>
              <p className="text-[11px] text-text/60">
                Re(z) = {realPart.toFixed(1)} · Im(z) = {imagPart.toFixed(1)}
              </p>
            </div>

            <div className="bg-surface rounded-2xl p-4 border border-navy/10 space-y-1">
              <span className="text-[11px] uppercase font-bold text-navy/50 tracking-wider block">
                2. Module &amp; Argument
              </span>
              <div className="text-sm font-bold text-navy">
                <MathRenderer
                  content={`$$|z| = ${modulus.toFixed(2)}, \\; \\arg(z) \\equiv ${formatFractionPi(argumentRad)}$$`}
                />
              </div>
              <p className="text-[11px] text-text/60">
                Soit environ {((argumentRad * 180) / Math.PI).toFixed(1)}° par rapport à l&apos;axe réel
              </p>
            </div>

            <div className="bg-surface rounded-2xl p-4 border border-navy/10 space-y-1">
              <span className="text-[11px] uppercase font-bold text-navy/50 tracking-wider block">
                3. Moivre : Puissance $z^{powerN}$
              </span>
              <div className="text-sm font-bold text-navy">
                <MathRenderer
                  content={`$$z^{${powerN}} = ${Math.pow(modulus, powerN).toFixed(1)} \\cdot e^{i(${formatFractionPi(powerN * argumentRad)})}$$`}
                />
              </div>
              <p className="text-[11px] text-text/60">
                Module : $r^{powerN}$ = {Math.pow(modulus, powerN).toFixed(2)} · Angle : {powerN} &times; &theta;
              </p>
            </div>
          </div>

          {/* SVG Canvas Interactif */}
          <div className="bg-[#0A1628] rounded-3xl p-4 border border-turquoise/20 shadow-xl flex flex-col items-center overflow-hidden relative">
            <div className="absolute top-3 left-4 text-[11px] font-mono text-white/50">
              {"Plan d'Argand-Cauchy (O; u, v) · 1 unité = 36 px"}
            </div>

            <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-2xl h-auto select-none">
              {/* Cercles concentriques r = 1, 2, 3, 4 */}
              {[1, 2, 3, 4].map((r) => (
                <circle
                  key={`circ-${r}`}
                  cx={originX}
                  cy={originY}
                  r={r * scale}
                  fill="none"
                  stroke="#ffffff"
                  strokeOpacity={r === 1 ? '0.25' : '0.08'}
                  strokeWidth={r === 1 ? '1.5' : '1'}
                  strokeDasharray={r === 1 ? 'none' : '3,3'}
                />
              ))}
              <text x={originX + 1 * scale + 3} y={originY - 4} fill="#00F5D4" fontSize="10" opacity="0.6">
                r = 1
              </text>

              {/* Grille cartésienne fine */}
              <g stroke="#ffffff" strokeOpacity="0.05" strokeWidth="1">
                {[-6, -4, -2, 2, 4, 6].map((v) => (
                  <React.Fragment key={`grid-${v}`}>
                    <line x1={originX + v * scale} y1={20} x2={originX + v * scale} y2={height - 20} />
                    <line x1={30} y1={originY - v * scale} x2={width - 30} y2={originY - v * scale} />
                  </React.Fragment>
                ))}
              </g>

              {/* Axe Réel (Ox) */}
              <line x1={25} y1={originY} x2={width - 25} y2={originY} stroke="#94A3B8" strokeWidth="2" />
              <polygon points={`${width - 20},${originY} ${width - 30},${originY - 5} ${width - 30},${originY + 5}`} fill="#94A3B8" />
              <text x={width - 18} y={originY + 4} fill="#94A3B8" fontSize="11" fontWeight="bold">Re</text>

              {/* Axe Imaginaire (Oy) */}
              <line x1={originX} y1={height - 20} x2={originX} y2={20} stroke="#94A3B8" strokeWidth="2" />
              <polygon points={`${originX},15 ${originX - 5},25 ${originX + 5},25`} fill="#94A3B8" />
              <text x={originX + 8} y={22} fill="#94A3B8" fontSize="11" fontWeight="bold">Im</text>

              {/* Arc d'angle pour argument theta */}
              {modulus > 0.3 && (
                <path
                  d={`M ${originX + 28} ${originY} A 28 28 0 ${Math.abs(argumentRad) > Math.PI ? 1 : 0} ${argumentRad < 0 ? 1 : 0} ${originX + 28 * Math.cos(argumentRad)} ${originY - 28 * Math.sin(argumentRad)}`}
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="2"
                />
              )}

              {/* Projections orthogonales en pointillés */}
              <line
                x1={toSvgX(realPart)}
                y1={toSvgY(imagPart)}
                x2={toSvgX(realPart)}
                y2={originY}
                stroke="#00F5D4"
                strokeWidth="1.5"
                strokeDasharray="4,4"
                opacity="0.6"
              />
              <line
                x1={toSvgX(realPart)}
                y1={toSvgY(imagPart)}
                x2={originX}
                y2={toSvgY(imagPart)}
                stroke="#00F5D4"
                strokeWidth="1.5"
                strokeDasharray="4,4"
                opacity="0.6"
              />

              {/* Vecteur OM (z) */}
              <line
                x1={originX}
                y1={originY}
                x2={toSvgX(realPart)}
                y2={toSvgY(imagPart)}
                stroke="#00F5D4"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Point M(z) */}
              <circle
                cx={toSvgX(realPart)}
                cy={toSvgY(imagPart)}
                r="7"
                fill="#00F5D4"
                stroke="#ffffff"
                strokeWidth="2"
                className="animate-pulse"
              />
              <text
                x={toSvgX(realPart) + 10}
                y={toSvgY(imagPart) - 10}
                fill="#00F5D4"
                fontSize="13"
                fontWeight="bold"
              >
                M(z)
              </text>

              {/* Conjugué z_bar */}
              {showConjugate && (
                <>
                  <line
                    x1={originX}
                    y1={originY}
                    x2={toSvgX(realPart)}
                    y2={toSvgY(-imagPart)}
                    stroke="#F59E0B"
                    strokeWidth="2"
                    strokeDasharray="3,3"
                  />
                  <circle
                    cx={toSvgX(realPart)}
                    cy={toSvgY(-imagPart)}
                    r="5"
                    fill="#F59E0B"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                  <text
                    x={toSvgX(realPart) + 8}
                    y={toSvgY(-imagPart) + 14}
                    fill="#F59E0B"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    M&apos;(\overline&#123;z&#125;)
                  </text>
                </>
              )}

              {/* Inverse 1/z */}
              {showInverse && modulus > 0.1 && (
                <>
                  {(() => {
                    const invMod = 1 / modulus;
                    const invX = invMod * Math.cos(-argumentRad);
                    const invY = invMod * Math.sin(-argumentRad);
                    return (
                      <>
                        <line
                          x1={originX}
                          y1={originY}
                          x2={toSvgX(invX)}
                          y2={toSvgY(invY)}
                          stroke="#A78BFA"
                          strokeWidth="2"
                          strokeDasharray="2,2"
                        />
                        <circle
                          cx={toSvgX(invX)}
                          cy={toSvgY(invY)}
                          r="5"
                          fill="#A78BFA"
                          stroke="#ffffff"
                          strokeWidth="1.5"
                        />
                        <text
                          x={toSvgX(invX) + 8}
                          y={toSvgY(invY) - 8}
                          fill="#A78BFA"
                          fontSize="11"
                          fontWeight="bold"
                        >
                          1/z
                        </text>
                      </>
                    );
                  })()}
                </>
              )}

              {/* Spirale de Moivre */}
              {showSpiral && spiralPoints.length > 1 && (
                <>
                  <polyline
                    points={spiralPoints.map((p) => `${toSvgX(p.x)},${toSvgY(p.y)}`).join(' ')}
                    fill="none"
                    stroke="#EC4899"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                    opacity="0.8"
                  />
                  {spiralPoints.map((p) => (
                    <g key={`moivre-${p.k}`}>
                      <circle
                        cx={toSvgX(p.x)}
                        cy={toSvgY(p.y)}
                        r={p.k === powerN ? '6' : '4'}
                        fill="#EC4899"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                      <text
                        x={toSvgX(p.x) + 7}
                        y={toSvgY(p.y) - 6}
                        fill="#EC4899"
                        fontSize="11"
                        fontWeight="bold"
                      >
                        z^{p.k}
                      </text>
                    </g>
                  ))}
                </>
              )}
            </svg>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* CONTENU MODE 2 : LABORATOIRE GÉOMÉTRIQUE DES TRIANGLES              */}
      {/* =================================================================== */}
      {activeMode === 'triangles_bac' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Presets rapides du Bac S2 */}
          <div className="flex flex-wrap items-center gap-2 p-3 bg-surface/70 rounded-2xl border border-navy/10">
            <span className="text-xs font-bold text-navy">Presets types Bac Sénégal :</span>
            <button
              type="button"
              onClick={() => setTrianglePreset('bac2023')}
              className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs"
            >
              ⭐ Bac S2 2023 (Rectangle Isocèle)
            </button>
            <button
              type="button"
              onClick={() => setTrianglePreset('equilateral')}
              className="px-3 py-1 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs transition-colors shadow-xs"
            >
              🔺 Triangle Équilatéral Direct
            </button>
            <button
              type="button"
              onClick={() => setTrianglePreset('rectangle')}
              className="px-3 py-1 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs transition-colors shadow-xs"
            >
              📐 Triangle Rectangle en A
            </button>
            <button
              type="button"
              onClick={() => setTrianglePreset('alignes')}
              className="px-3 py-1 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-colors shadow-xs"
            >
              📏 Points Alignés (Q ∈ ℝ)
            </button>
          </div>

          {/* Sliders de positionnement des 3 points A, B, C */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-surface/60 rounded-2xl p-4 border border-navy/10">
            {/* Point A */}
            <div className="space-y-2">
              <span className="text-xs font-black text-rose-600 uppercase tracking-wider block">
                Point A : $z_A = {ptA.x.toFixed(1)} {ptA.y >= 0 ? '+' : '-'} {Math.abs(ptA.y).toFixed(1)}i$
              </span>
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-text/70">
                  <span>x_A : {ptA.x.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.2"
                  value={ptA.x}
                  onChange={(e) => setPtA({ ...ptA, x: parseFloat(e.target.value) })}
                  className="w-full accent-rose-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-text/70">
                  <span>y_A : {ptA.y.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.2"
                  value={ptA.y}
                  onChange={(e) => setPtA({ ...ptA, y: parseFloat(e.target.value) })}
                  className="w-full accent-rose-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Point B */}
            <div className="space-y-2">
              <span className="text-xs font-black text-blue-600 uppercase tracking-wider block">
                Point B : $z_B = {ptB.x.toFixed(1)} {ptB.y >= 0 ? '+' : '-'} {Math.abs(ptB.y).toFixed(1)}i$
              </span>
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-text/70">
                  <span>x_B : {ptB.x.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.2"
                  value={ptB.x}
                  onChange={(e) => setPtB({ ...ptB, x: parseFloat(e.target.value) })}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-text/70">
                  <span>y_B : {ptB.y.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.2"
                  value={ptB.y}
                  onChange={(e) => setPtB({ ...ptB, y: parseFloat(e.target.value) })}
                  className="w-full accent-blue-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Point C */}
            <div className="space-y-2">
              <span className="text-xs font-black text-emerald-600 uppercase tracking-wider block">
                Point C : $z_C = {ptC.x.toFixed(1)} {ptC.y >= 0 ? '+' : '-'} {Math.abs(ptC.y).toFixed(1)}i$
              </span>
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-text/70">
                  <span>x_C : {ptC.x.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.2"
                  value={ptC.x}
                  onChange={(e) => setPtC({ ...ptC, x: parseFloat(e.target.value) })}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-text/70">
                  <span>y_C : {ptC.y.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.2"
                  value={ptC.y}
                  onChange={(e) => setPtC({ ...ptC, y: parseFloat(e.target.value) })}
                  className="w-full accent-emerald-500 cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Diagnostic de Nature du Triangle */}
          <div className={`p-4 rounded-2xl border ${triangleBadgeColor} flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-xs`}>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider block opacity-70">
                Diagnostic Automatique de l&apos;Examinateur du Bac
              </span>
              <p className="text-sm sm:text-base font-black mt-0.5">{triangleNature}</p>
            </div>
            <div className="text-xs font-mono font-bold shrink-0">
              <MathRenderer content={`$$Q = \\frac{z_C - z_A}{z_B - z_A} \\approx ${qReal.toFixed(2)} ${qImag >= 0 ? '+' : '-'} ${Math.abs(qImag).toFixed(2)}i$$`} />
            </div>
          </div>

          {/* SVG du Triangle */}
          <div className="bg-[#0A1628] rounded-3xl p-4 border border-turquoise/20 shadow-xl flex flex-col items-center overflow-hidden">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-2xl h-auto select-none">
              {/* Axes */}
              <line x1={25} y1={originY} x2={width - 25} y2={originY} stroke="#94A3B8" strokeWidth="1.5" opacity="0.4" />
              <line x1={originX} y1={height - 20} x2={originX} y2={20} stroke="#94A3B8" strokeWidth="1.5" opacity="0.4" />

              {/* Triangle rempli */}
              <polygon
                points={`${toSvgX(ptA.x)},${toSvgY(ptA.y)} ${toSvgX(ptB.x)},${toSvgY(ptB.y)} ${toSvgX(ptC.x)},${toSvgY(ptC.y)}`}
                fill="#00F5D4"
                fillOpacity="0.12"
                stroke="#00F5D4"
                strokeWidth="2.5"
              />

              {/* Sommets A, B, C */}
              <g>
                <circle cx={toSvgX(ptA.x)} cy={toSvgY(ptA.y)} r="7" fill="#EF4444" stroke="#ffffff" strokeWidth="2" />
                <text x={toSvgX(ptA.x) - 15} y={toSvgY(ptA.y) - 10} fill="#EF4444" fontSize="13" fontWeight="bold">A</text>
              </g>
              <g>
                <circle cx={toSvgX(ptB.x)} cy={toSvgY(ptB.y)} r="7" fill="#3B82F6" stroke="#ffffff" strokeWidth="2" />
                <text x={toSvgX(ptB.x) + 12} y={toSvgY(ptB.y) - 10} fill="#3B82F6" fontSize="13" fontWeight="bold">B</text>
              </g>
              <g>
                <circle cx={toSvgX(ptC.x)} cy={toSvgY(ptC.y)} r="7" fill="#10B981" stroke="#ffffff" strokeWidth="2" />
                <text x={toSvgX(ptC.x) + 12} y={toSvgY(ptC.y) + 16} fill="#10B981" fontSize="13" fontWeight="bold">C</text>
              </g>

              {/* Mesures des côtés */}
              <text x={originX - 180} y={35} fill="#ffffff" fontSize="11" opacity="0.8">
                AB = {distAB.toFixed(2)} · AC = {distAC.toFixed(2)} · BC = {distBC.toFixed(2)}
              </text>
              <text x={originX - 180} y={55} fill="#F59E0B" fontSize="11" fontWeight="bold">
                Angle orienté (AB, AC) = {qArgDeg.toFixed(1)}° ({formatFractionPi(qArgRad)})
              </text>
            </svg>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* CONTENU MODE 3 : DÉTECTEUR D'ENSEMBLES DE POINTS (ℰ)               */}
      {/* =================================================================== */}
      {activeMode === 'ensembles_points' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Choix du type d'ensemble */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            <button
              type="button"
              onClick={() => setEnsembleType('mediatrice')}
              className={`p-3 rounded-2xl border text-left transition-all ${
                ensembleType === 'mediatrice'
                  ? 'bg-turquoise/15 border-turquoise text-navy shadow-sm'
                  : 'bg-surface border-navy/10 text-text/70 hover:bg-surface-muted'
              }`}
            >
              <span className="text-[11px] font-bold uppercase tracking-wider block text-turquoise">Cas n°1</span>
              <span className="text-xs font-black block mt-0.5">$|z - z_A| = |z - z_B|$</span>
              <span className="text-[10px] text-text/60 block mt-1">Médiatrice du segment $[AB]$</span>
            </button>

            <button
              type="button"
              onClick={() => setEnsembleType('cercle_centre')}
              className={`p-3 rounded-2xl border text-left transition-all ${
                ensembleType === 'cercle_centre'
                  ? 'bg-turquoise/15 border-turquoise text-navy shadow-sm'
                  : 'bg-surface border-navy/10 text-text/70 hover:bg-surface-muted'
              }`}
            >
              <span className="text-[11px] font-bold uppercase tracking-wider block text-turquoise">Cas n°2</span>
              <span className="text-xs font-black block mt-0.5">$|z - z_A| = R$</span>
              <span className="text-[10px] text-text/60 block mt-1">Cercle $\mathcal&#123;C&#125;(A, R)$</span>
            </button>

            <button
              type="button"
              onClick={() => setEnsembleType('diametre_orthogonal')}
              className={`p-3 rounded-2xl border text-left transition-all ${
                ensembleType === 'diametre_orthogonal'
                  ? 'bg-turquoise/15 border-turquoise text-navy shadow-sm'
                  : 'bg-surface border-navy/10 text-text/70 hover:bg-surface-muted'
              }`}
            >
              <span className="text-[11px] font-bold uppercase tracking-wider block text-turquoise">Cas n°3</span>
              <span className="text-xs font-black block mt-0.5">
                <MathRenderer content="$\arg\left(\frac{z-z_A}{z-z_B}\right) = \pm\frac{\pi}{2}$" />
              </span>
              <span className="text-[10px] text-text/60 block mt-1">Cercle diamètre [AB] privé de A et B</span>
            </button>

            <button
              type="button"
              onClick={() => setEnsembleType('droite_alignement')}
              className={`p-3 rounded-2xl border text-left transition-all ${
                ensembleType === 'droite_alignement'
                  ? 'bg-turquoise/15 border-turquoise text-navy shadow-sm'
                  : 'bg-surface border-navy/10 text-text/70 hover:bg-surface-muted'
              }`}
            >
              <span className="text-[11px] font-bold uppercase tracking-wider block text-turquoise">Cas n°4</span>
              <span className="text-xs font-black block mt-0.5">
                <MathRenderer content="$\arg\left(\frac{z-z_A}{z-z_B}\right) = 0 \pmod{\pi}$" />
              </span>
              <span className="text-[10px] text-text/60 block mt-1">Droite (AB) privée de A et B</span>
            </button>
          </div>

          {/* Contrôles interactifs pour points et rayon */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-surface/60 rounded-2xl p-4 border border-navy/10">
            <div>
              <span className="text-xs font-bold text-navy block mb-1">Point A ($z_A$)</span>
              <div className="flex gap-2">
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.5"
                  value={ensA.x}
                  onChange={(e) => setEnsA({ ...ensA, x: parseFloat(e.target.value) })}
                  className="w-1/2 accent-turquoise"
                />
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.5"
                  value={ensA.y}
                  onChange={(e) => setEnsA({ ...ensA, y: parseFloat(e.target.value) })}
                  className="w-1/2 accent-turquoise"
                />
              </div>
              <span className="text-[10px] font-mono text-text/60 block mt-1">
                A({ensA.x}, {ensA.y})
              </span>
            </div>

            <div>
              <span className="text-xs font-bold text-navy block mb-1">Point B ($z_B$)</span>
              <div className="flex gap-2">
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.5"
                  value={ensB.x}
                  onChange={(e) => setEnsB({ ...ensB, x: parseFloat(e.target.value) })}
                  className="w-1/2 accent-amber-500"
                />
                <input
                  type="range"
                  min="-3"
                  max="3"
                  step="0.5"
                  value={ensB.y}
                  onChange={(e) => setEnsB({ ...ensB, y: parseFloat(e.target.value) })}
                  className="w-1/2 accent-amber-500"
                />
              </div>
              <span className="text-[10px] font-mono text-text/60 block mt-1">
                B({ensB.x}, {ensB.y})
              </span>
            </div>

            {ensembleType === 'cercle_centre' && (
              <div>
                <span className="text-xs font-bold text-navy block mb-1">Rayon R : {ensRadius} unités</span>
                <input
                  type="range"
                  min="0.5"
                  max="4"
                  step="0.2"
                  value={ensRadius}
                  onChange={(e) => setEnsRadius(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500"
                />
                <span className="text-[10px] font-mono text-text/60 block mt-1">
                  Diamètre = {(2 * ensRadius).toFixed(1)}
                </span>
              </div>
            )}
          </div>

          {/* Formule de rédaction Bac certifiée */}
          <div className="bg-navy rounded-2xl p-4 text-white text-xs leading-relaxed space-y-1">
            <span className="text-turquoise font-black uppercase tracking-wider block text-[11px]">
              Rédaction officielle exigée au Bac S2 :
            </span>
            {ensembleType === 'mediatrice' && (
              <div className="space-y-1">
                <MathRenderer content={`$$|z - z_A| = |z - z_B| \\iff AM = BM$$`} />
                <p>
                  {"L'ensemble (E) des points M est la médiatrice du segment [AB]. Elle passe par le milieu I("}{midAB.x}{", "}{midAB.y}{") et est perpendiculaire à (AB)."}
                </p>
              </div>
            )}
            {ensembleType === 'cercle_centre' && (
              <div className="space-y-1">
                <MathRenderer content={`$$|z - z_A| = ${ensRadius} \\iff AM = ${ensRadius}$$`} />
                <p>
                  {"L'ensemble (E) des points M est le cercle de centre A("}{ensA.x}{", "}{ensA.y}{`) et de rayon R = ${ensRadius}.`}
                </p>
              </div>
            )}
            {ensembleType === 'diametre_orthogonal' && (
              <div className="space-y-1">
                <MathRenderer content={`$$\\arg\\left(\\frac{z-z_A}{z-z_B}\\right) = \\pm\\frac{\\pi}{2} \\pmod{\\pi} \\iff (\\vec{MB}, \\vec{MA}) = \\frac{\\pi}{2} \\pmod{\\pi} \\iff (MA) \\perp (MB)$$`} />
                <p>
                  {"L'ensemble (E) est le cercle de diamètre [AB] privé des points A et B."}
                </p>
              </div>
            )}
            {ensembleType === 'droite_alignement' && (
              <div className="space-y-1">
                <MathRenderer content={`$$\\arg\\left(\\frac{z-z_A}{z-z_B}\\right) = 0 \\pmod{\\pi} \\iff (\\vec{MB}, \\vec{MA}) = 0 \\pmod{\\pi}$$`} />
                <p>
                  {"Les vecteurs MA et MB sont colinéaires. L'ensemble (E) est la droite (AB) privée des points A et B."}
                </p>
              </div>
            )}
          </div>

          {/* SVG Canvas Ensemble de points */}
          <div className="bg-[#0A1628] rounded-3xl p-4 border border-turquoise/20 shadow-xl flex flex-col items-center overflow-hidden">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full max-w-2xl h-auto select-none">
              {/* Axes */}
              <line x1={25} y1={originY} x2={width - 25} y2={originY} stroke="#94A3B8" strokeWidth="1.5" opacity="0.4" />
              <line x1={originX} y1={height - 20} x2={originX} y2={20} stroke="#94A3B8" strokeWidth="1.5" opacity="0.4" />

              {/* Segment [AB] */}
              <line
                x1={toSvgX(ensA.x)}
                y1={toSvgY(ensA.y)}
                x2={toSvgX(ensB.x)}
                y2={toSvgY(ensB.y)}
                stroke="#64748B"
                strokeWidth="2"
                strokeDasharray="4,4"
              />

              {/* Tracé de l'ensemble (E) */}
              {ensembleType === 'mediatrice' && (
                <>
                  {/* Vecteur normal vEnsAB -> vecteur directeur médiatrice (-vY, vX) */}
                  <line
                    x1={toSvgX(midAB.x - vEnsAB.y * 3)}
                    y1={toSvgY(midAB.y + vEnsAB.x * 3)}
                    x2={toSvgX(midAB.x + vEnsAB.y * 3)}
                    y2={toSvgY(midAB.y - vEnsAB.x * 3)}
                    stroke="#00F5D4"
                    strokeWidth="3.5"
                  />
                  <circle cx={toSvgX(midAB.x)} cy={toSvgY(midAB.y)} r="4" fill="#00F5D4" />
                  <text x={toSvgX(midAB.x) + 8} y={toSvgY(midAB.y) - 6} fill="#00F5D4" fontSize="10" fontWeight="bold">I (Milieu)</text>
                </>
              )}

              {ensembleType === 'cercle_centre' && (
                <circle
                  cx={toSvgX(ensA.x)}
                  cy={toSvgY(ensA.y)}
                  r={ensRadius * scale}
                  fill="#00F5D4"
                  fillOpacity="0.1"
                  stroke="#00F5D4"
                  strokeWidth="3"
                />
              )}

              {ensembleType === 'diametre_orthogonal' && (
                <circle
                  cx={toSvgX(midAB.x)}
                  cy={toSvgY(midAB.y)}
                  r={(distEnsAB / 2) * scale}
                  fill="#A78BFA"
                  fillOpacity="0.15"
                  stroke="#A78BFA"
                  strokeWidth="3"
                />
              )}

              {ensembleType === 'droite_alignement' && (
                <line
                  x1={toSvgX(ensA.x - vEnsAB.x * 2)}
                  y1={toSvgY(ensA.y - vEnsAB.y * 2)}
                  x2={toSvgX(ensB.x + vEnsAB.x * 2)}
                  y2={toSvgY(ensB.y + vEnsAB.y * 2)}
                  stroke="#F59E0B"
                  strokeWidth="3"
                />
              )}

              {/* Points A et B */}
              <circle cx={toSvgX(ensA.x)} cy={toSvgY(ensA.y)} r="7" fill="#EF4444" stroke="#ffffff" strokeWidth="2" />
              <text x={toSvgX(ensA.x) + 10} y={toSvgY(ensA.y) - 8} fill="#EF4444" fontSize="12" fontWeight="bold">A</text>

              <circle cx={toSvgX(ensB.x)} cy={toSvgY(ensB.y)} r="7" fill="#3B82F6" stroke="#ffffff" strokeWidth="2" />
              <text x={toSvgX(ensB.x) + 10} y={toSvgY(ensB.y) - 8} fill="#3B82F6" fontSize="12" fontWeight="bold">B</text>
            </svg>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* CONTENU MODE 4 : SOLVEUR INTERACTIF DE RACINES CARRÉES (Z = X + iY) */}
      {/* =================================================================== */}
      {activeMode === 'racines_equations' && (
        <div className="space-y-5 animate-in fade-in duration-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-surface/60 rounded-2xl p-4 border border-navy/10">
            <div>
              <div className="flex justify-between text-xs font-bold text-navy mb-1.5">
                <span>Partie Réelle : X</span>
                <span className="text-turquoise font-mono font-black text-sm">{inputX}</span>
              </div>
              <input
                type="range"
                min="-12"
                max="12"
                step="1"
                value={inputX}
                onChange={(e) => setInputX(parseInt(e.target.value, 10))}
                className="w-full accent-turquoise cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-navy mb-1.5">
                <span>Partie Imaginaire : Y</span>
                <span className="text-amber-600 font-mono font-black text-sm">{inputY}</span>
              </div>
              <input
                type="range"
                min="-12"
                max="12"
                step="1"
                value={inputY}
                onChange={(e) => setInputY(parseInt(e.target.value, 10))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Déroulé complet du système de résolution pas à pas */}
          <div className="bg-white rounded-2xl border border-navy/10 p-5 space-y-4 shadow-sm text-xs sm:text-sm">
            <h4 className="font-extrabold text-navy text-sm uppercase tracking-wider flex items-center gap-2">
              <span>📝</span> Déroulé pas à pas de la méthode officielle (Système en 3 équations) :
            </h4>

            <p className="text-text/75 leading-relaxed">
              Soit $z = x + iy$ tel que $z^2 = Z = {inputX} {inputY >= 0 ? '+' : '-'} {Math.abs(inputY)}i$. En égalisant les parties réelles, les modules et les parties imaginaires, on pose le système :
            </p>

            <div className="bg-surface p-4 rounded-xl font-mono text-navy font-bold space-y-1 border border-navy/5">
              <div>(1) $x^2 - y^2 = {inputX}$</div>
              <div>(2) $x^2 + y^2 = \sqrt&#123;{inputX}^2 + ({inputY})^2&#125; = {modZ.toFixed(2)}$</div>
              <div>(3) $2xy = {inputY} \implies xy$ est du signe de ${inputY >= 0 ? 'positif (+)' : 'négatif (-)'}$</div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-emerald-900">
                <span className="font-bold block text-xs uppercase">Addition (1) + (2) :</span>
                <p className="mt-1 font-mono text-sm">
                  $2x^2 = {inputX} + {modZ.toFixed(2)} = {(inputX + modZ).toFixed(2)}$<br />
                  $x = \pm {rootX.toFixed(2)}$
                </p>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-amber-900">
                <span className="font-bold block text-xs uppercase">Soustraction (2) - (1) :</span>
                <p className="mt-1 font-mono text-sm">
                  $2y^2 = {modZ.toFixed(2)} - ({inputX}) = {(modZ - inputX).toFixed(2)}$<br />
                  $y = \pm {Math.abs(rootY).toFixed(2)}$
                </p>
              </div>
            </div>

            {/* Deux racines carrées finales */}
            <div className="p-4 rounded-xl bg-navy text-white text-center space-y-1">
              <span className="text-[11px] font-bold text-turquoise uppercase tracking-widest block">
                Conclusion : Les Deux Racines Carrées Opposées
              </span>
              <div className="text-base sm:text-lg font-black text-gold font-mono">
                $$\delta_1 = {rootX.toFixed(2)} {rootY >= 0 ? '+' : '-'} {Math.abs(rootY).toFixed(2)}i \qquad \delta_2 = -{rootX.toFixed(2)} {rootY >= 0 ? '-' : '+'} {Math.abs(rootY).toFixed(2)}i$$
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
