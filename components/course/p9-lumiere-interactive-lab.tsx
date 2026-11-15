'use client';

import React, { useState, useMemo } from 'react';

// Constantes physiques fondamentales SI
const H_PLANCK = 6.62607e-34; // J.s
const C_LIGHT = 2.99792e8; // m/s
const Q_E = 1.60218e-19; // Coulombs (1 eV = 1.60218e-19 J)
const M_ELECTRON = 9.10938e-31; // kg
const E0_HYDROGEN = 13.6057; // eV

interface MetalData {
  name: string;
  symbol: string;
  w0_ev: number;
}

const METALS_LIST: MetalData[] = [
  { name: 'Césium', symbol: 'Cs', w0_ev: 1.90 },
  { name: 'Potassium', symbol: 'K', w0_ev: 2.30 },
  { name: 'Sodium', symbol: 'Na', w0_ev: 2.40 },
  { name: 'Zinc', symbol: 'Zn', w0_ev: 4.30 },
  { name: 'Platine', symbol: 'Pt', w0_ev: 5.65 },
];

export default function P9LumiereInteractiveLab() {
  const [activeTab, setActiveTab] = useState<'young' | 'photoelectrique' | 'bohr'>('young');

  // --- ÉTAT 1 : FENTES D'YOUNG ---
  const [lambdaNm, setLambdaNm] = useState<number>(633); // Longueur d'onde en nm [400, 750]
  const [ecartMm, setEcartMm] = useState<number>(0.5); // Distance entre fentes a en mm [0.1, 1.5]
  const [distanceM, setDistanceM] = useState<number>(2.0); // Distance fentes-écran D en m [1.0, 3.5]
  const [lameEpaisseurUm, setLameEpaisseurUm] = useState<number>(0); // Épaisseur lame e en µm [0, 10]
  const [lameIndice, setLameIndice] = useState<number>(1.5); // Indice n de la lame

  // --- ÉTAT 2 : EFFET PHOTOÉLECTRIQUE ---
  const [metalIndex, setMetalIndex] = useState<number>(0); // Césium par défaut
  const [photoLambdaNm, setPhotoLambdaNm] = useState<number>(380); // Longueur d'onde incidente en nm [150, 800]
  const [tensionUakV, setTensionUakV] = useState<number>(0.0); // Tension appliquée U_AK en V [-3.0, 3.0]

  // --- ÉTAT 3 : MODÈLE DE BOHR HYDROGÈNE ---
  const [bohrLevelP, setBohrLevelP] = useState<number>(3); // Niveau supérieur (initial en émission)
  const [bohrLevelN, setBohrLevelN] = useState<number>(2); // Niveau inférieur (final en émission)

  // ─── CALCULS D'YOUNG ───
  const lambdaM = lambdaNm * 1e-9;
  const aM = ecartMm * 1e-3;
  const DM = distanceM;
  // Interfrange i = lambda * D / a (en mm)
  const interfrangeMm = ((lambdaM * DM) / aM) * 1e3;
  // Décalage par la lame en mm : Delta x = (n - 1) * e * D / a
  const decalageLameMm = (((lameIndice - 1) * (lameEpaisseurUm * 1e-6) * DM) / aM) * 1e3;

  // Couleur représentative du rayonnement pour le SVG
  const beamColor = useMemo(() => {
    if (lambdaNm < 440) return '#7c3aed'; // Violet
    if (lambdaNm < 490) return '#2563eb'; // Bleu
    if (lambdaNm < 560) return '#10b981'; // Vert
    if (lambdaNm < 590) return '#eab308'; // Jaune
    if (lambdaNm < 630) return '#f97316'; // Orange
    return '#ef4444'; // Rouge
  }, [lambdaNm]);

  // Points du profil d'intensité lumineuse I(x) = 4 I0 cos²(pi * a * x / (lambda * D))
  const youngIntensityPoints = useMemo(() => {
    const pts: { xMm: number; intensity: number }[] = [];
    const spanMm = 12; // De -6 mm à +6 mm autour du centre
    const steps = 140;
    const stepMm = (2 * spanMm) / (steps - 1);
    for (let i = 0; i < steps; i++) {
      const xMm = -spanMm + i * stepMm;
      const xEffective = xMm - decalageLameMm;
      const phase = (Math.PI * aM * (xEffective * 1e-3)) / (lambdaM * DM);
      const intensity = Math.pow(Math.cos(phase), 2); // [0, 1]
      pts.push({ xMm, intensity });
    }
    return pts;
  }, [aM, lambdaM, DM, decalageLameMm]);

  // ─── CALCULS EFFET PHOTOÉLECTRIQUE ───
  const currentMetal = METALS_LIST[metalIndex];
  const photonEnergyJ = (H_PLANCK * C_LIGHT) / (photoLambdaNm * 1e-9);
  const photonEnergyEv = photonEnergyJ / Q_E;
  const w0J = currentMetal.w0_ev * Q_E;
  // Longueur d'onde seuil lambda_0 = h * c / W0
  const lambdaSeuilNm = ((H_PLANCK * C_LIGHT) / w0J) * 1e9;
  const frequenceSeuilHz = w0J / H_PLANCK;

  // Effet photoélectrique effectif ?
  const hasPhotoeffect = photonEnergyEv >= currentMetal.w0_ev;
  const ecMaxEv = hasPhotoeffect ? photonEnergyEv - currentMetal.w0_ev : 0;
  const ecMaxJ = ecMaxEv * Q_E;
  const vMax = hasPhotoeffect ? Math.sqrt((2 * ecMaxJ) / M_ELECTRON) : 0;
  const u0ArrêtV = hasPhotoeffect ? ecMaxEv : 0; // e |U0| = Ec_max

  // Courant photoélectrique estimé
  const isBlockedByUak = tensionUakV <= -u0ArrêtV;
  const photocourantRelatif = useMemo(() => {
    if (!hasPhotoeffect) return 0;
    if (isBlockedByUak) return 0;
    if (tensionUakV >= 0) return 1.0; // Courant de saturation
    // Régime de freinage entre -U0 et 0 V
    return (tensionUakV + u0ArrêtV) / u0ArrêtV;
  }, [hasPhotoeffect, isBlockedByUak, tensionUakV, u0ArrêtV]);

  // ─── CALCULS MODÈLE DE BOHR ───
  const eLevelP_ev = -E0_HYDROGEN / (bohrLevelP * bohrLevelP);
  const eLevelN_ev = -E0_HYDROGEN / (bohrLevelN * bohrLevelN);
  const deltaEBohrEv = Math.abs(eLevelP_ev - eLevelN_ev);
  const deltaEBohrJ = deltaEBohrEv * Q_E;
  const bohrLambdaNm = deltaEBohrJ > 0 ? ((H_PLANCK * C_LIGHT) / deltaEBohrJ) * 1e9 : 0;

  // Identification de la série spectrale
  const serieInfo = useMemo(() => {
    const minLevel = Math.min(bohrLevelP, bohrLevelN);
    if (minLevel === 1) return { name: 'Série de Lyman', domain: 'Ultraviolet (UV)', badgeColor: 'bg-purple-100 text-purple-800' };
    if (minLevel === 2) return { name: 'Série de Balmer', domain: 'Visible & Proche UV', badgeColor: 'bg-emerald-100 text-emerald-800' };
    if (minLevel === 3) return { name: 'Série de Paschen', domain: 'Infrarouge (IR)', badgeColor: 'bg-amber-100 text-amber-800' };
    if (minLevel === 4) return { name: 'Série de Brackett', domain: 'Infrarouge lointain', badgeColor: 'bg-rose-100 text-rose-800' };
    return { name: `Série n=${minLevel}`, domain: 'Infrarouge lointain', badgeColor: 'bg-slate-100 text-slate-800' };
  }, [bohrLevelP, bohrLevelN]);

  // Couleur de la raie de Bohr si dans le visible
  const bohrRayColor = useMemo(() => {
    if (bohrLambdaNm < 380) return '#8b5cf6'; // UV
    if (bohrLambdaNm < 420) return '#6366f1'; // Violet
    if (bohrLambdaNm < 450) return '#3b82f6'; // Bleu foncé
    if (bohrLambdaNm < 500) return '#06b6d4'; // Cyan
    if (bohrLambdaNm < 570) return '#10b981'; // Vert
    if (bohrLambdaNm < 595) return '#eab308'; // Jaune
    if (bohrLambdaNm < 620) return '#f97316'; // Orange
    if (bohrLambdaNm <= 750) return '#ef4444'; // Rouge
    return '#dc2626'; // Infrarouge
  }, [bohrLambdaNm]);

  // Raccourcis pédagogiques Bac
  const applyPreset = (preset: 'he_ne' | 'laser_vert' | 'cesium_visible' | 'balmer_alpha' | 'lyman_alpha') => {
    if (preset === 'he_ne') {
      setActiveTab('young');
      setLambdaNm(633);
      setEcartMm(0.5);
      setDistanceM(2.0);
      setLameEpaisseurUm(0);
    } else if (preset === 'laser_vert') {
      setActiveTab('young');
      setLambdaNm(532);
      setEcartMm(0.4);
      setDistanceM(1.8);
      setLameEpaisseurUm(0);
    } else if (preset === 'cesium_visible') {
      setActiveTab('photoelectrique');
      setMetalIndex(0); // Cs W0=1.9eV
      setPhotoLambdaNm(450); // Bleu 2.76 eV > 1.9 eV
      setTensionUakV(0);
    } else if (preset === 'balmer_alpha') {
      setActiveTab('bohr');
      setBohrLevelP(3);
      setBohrLevelN(2); // H-alpha 656.3 nm
    } else if (preset === 'lyman_alpha') {
      setActiveTab('bohr');
      setBohrLevelP(2);
      setBohrLevelN(1); // Lyman-alpha 121.6 nm UV
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm my-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-2">
            Laboratoire Interactif Virtuel Bac S2 • Chapitre P9
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Simulateur Lumière &amp; Quanta : Interférences d’Young, Effet Photoélectrique &amp; Atome de Bohr
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Explorez les deux faces de la lumière : propagation ondulatoire (franges d’Young) et interactions corpusculaires (quanta de Planck-Einstein, cellule photoélectrique et spectre de l’hydrogène).
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto">
          <button
            onClick={() => applyPreset('he_ne')}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors"
          >
            Laser Rouge (633 nm)
          </button>
          <button
            onClick={() => applyPreset('laser_vert')}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
          >
            Laser Vert (532 nm)
          </button>
          <button
            onClick={() => applyPreset('cesium_visible')}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors"
          >
            Effet Cs (Bleu)
          </button>
          <button
            onClick={() => applyPreset('balmer_alpha')}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 transition-colors"
          >
            Raie Hα (Balmer)
          </button>
        </div>
      </div>

      {/* Mode Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-2 my-6 overflow-x-auto">
        <button
          onClick={() => setActiveTab('young')}
          className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold transition-all border-b-2 whitespace-nowrap ${
            activeTab === 'young'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          1. Fentes d’Young (Interférences &amp; Interfrange)
        </button>
        <button
          onClick={() => setActiveTab('photoelectrique')}
          className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold transition-all border-b-2 whitespace-nowrap ${
            activeTab === 'photoelectrique'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          2. Effet Photoélectrique (Einstein &amp; Potentiel d’arrêt)
        </button>
        <button
          onClick={() => setActiveTab('bohr')}
          className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold transition-all border-b-2 whitespace-nowrap ${
            activeTab === 'bohr'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          3. Atome de Bohr (Niveaux d’énergie &amp; Spectres)
        </button>
      </div>

      {/* TAB 1 : FENTES D'YOUNG */}
      {activeTab === 'young' && (
        <div className="space-y-6">
          {/* Sliders Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            {/* Lambda */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-slate-700">
                <span>Longueur d’onde (λ) :</span>
                <span className="font-mono font-bold" style={{ color: beamColor }}>
                  {lambdaNm} nm
                </span>
              </div>
              <input
                type="range"
                min={400}
                max={750}
                step={5}
                value={lambdaNm}
                onChange={(e) => setLambdaNm(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>400 nm (Violet)</span>
                <span>750 nm (Rouge)</span>
              </div>
            </div>

            {/* Ecart a */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-slate-700">
                <span>Écartement fentes (a) :</span>
                <span className="font-mono font-bold text-slate-900">{ecartMm.toFixed(2)} mm</span>
              </div>
              <input
                type="range"
                min={0.15}
                max={1.2}
                step={0.05}
                value={ecartMm}
                onChange={(e) => setEcartMm(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>0.15 mm</span>
                <span>1.20 mm</span>
              </div>
            </div>

            {/* Distance D */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-slate-700">
                <span>Distance écran (D) :</span>
                <span className="font-mono font-bold text-slate-900">{distanceM.toFixed(2)} m</span>
              </div>
              <input
                type="range"
                min={1.0}
                max={3.0}
                step={0.1}
                value={distanceM}
                onChange={(e) => setDistanceM(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1.0 m</span>
                <span>3.0 m</span>
              </div>
            </div>

            {/* Lame décalage */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-slate-700">
                <span>Lame mince (e) :</span>
                <span className="font-mono font-bold text-indigo-600">
                  {lameEpaisseurUm > 0 ? `${lameEpaisseurUm.toFixed(1)} µm (n=1.5)` : 'Aucune'}
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={8}
                step={0.5}
                value={lameEpaisseurUm}
                onChange={(e) => setLameEpaisseurUm(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>0 µm (Centré)</span>
                <span>8 µm (Décalé)</span>
              </div>
            </div>
          </div>

          {/* Metrics Dashboard */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <div className="text-[10px] uppercase font-bold text-slate-500">Interfrange i = λD / a</div>
              <div className="text-base font-bold text-indigo-600 font-mono mt-0.5">
                {interfrangeMm.toFixed(3)} mm
              </div>
              <div className="text-[10px] text-slate-400 mt-1">Écart entre 2 franges</div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <div className="text-[10px] uppercase font-bold text-slate-500">Largeur 5 franges (L=5i)</div>
              <div className="text-base font-bold text-slate-900 font-mono mt-0.5">
                {(interfrangeMm * 5).toFixed(2)} mm
              </div>
              <div className="text-[10px] text-slate-400 mt-1">Mesure type laboratoire</div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <div className="text-[10px] uppercase font-bold text-slate-500">Fréquence lumineuse ν</div>
              <div className="text-base font-bold text-slate-900 font-mono mt-0.5">
                {((C_LIGHT / (lambdaNm * 1e-9)) * 1e-14).toFixed(2)} × 10¹⁴ Hz
              </div>
              <div className="text-[10px] text-slate-400 mt-1">ν = c / λ</div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <div className="text-[10px] uppercase font-bold text-slate-500">Déplacement frange centrale</div>
              <div className="text-base font-bold text-rose-600 font-mono mt-0.5">
                {decalageLameMm > 0 ? `+${decalageLameMm.toFixed(2)} mm` : '0.00 mm (x₀ = 0)'}
              </div>
              <div className="text-[10px] text-slate-400 mt-1">Δx = (n - 1)eD / a</div>
            </div>
          </div>

          {/* SVG Canvas : Franges d'Young et Profil d'intensité */}
          <div className="bg-slate-950 rounded-2xl p-4 text-white border border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between text-xs border-b border-slate-800 pb-2">
              <span className="text-slate-300 font-semibold">
                Écran d’Observation E : Motif d’Interférence &amp; Profil d’Intensité I(x)
              </span>
              <div className="font-mono text-emerald-400 text-[11px]">
                i = {interfrangeMm.toFixed(2)} mm • Échelle : -6 mm à +6 mm
              </div>
            </div>

            {/* Visualisation SVG */}
            <div className="relative w-full h-[320px]">
              <svg className="w-full h-full" viewBox="-300 -120 600 240">
                {/* 1. Bande supérieure : Aspect visuel direct des franges sur l'écran */}
                <text x="-290" y="-95" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                  ASPECT VISUEL DE L’ÉCRAN (Franges sombres &amp; brillantes)
                </text>
                <rect x="-290" y="-85" width="580" height="45" fill="#0f172a" stroke="#334155" rx="4" />

                {/* Génération visuelle des franges lumineuses et sombres */}
                {Array.from({ length: 25 }).map((_, idx) => {
                  const k = idx - 12;
                  const xMm = k * interfrangeMm + decalageLameMm;
                  // Échelle SVG : 6 mm = 280 px -> 1 mm = 46.6 px
                  const xSvg = xMm * 46.6;
                  if (xSvg < -285 || xSvg > 285) return null;

                  return (
                    <rect
                      key={`frange-${idx}`}
                      x={xSvg - (interfrangeMm * 46.6) / 4}
                      y="-83"
                      width={(interfrangeMm * 46.6) / 2}
                      height="41"
                      fill={beamColor}
                      opacity={k === 0 ? 0.95 : Math.max(0.2, 0.9 - Math.abs(k) * 0.08)}
                      rx="2"
                    />
                  );
                })}

                {/* Repère de la frange centrale */}
                <line
                  x1={decalageLameMm * 46.6}
                  y1="-85"
                  x2={decalageLameMm * 46.6}
                  y2="-35"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeDasharray="2 2"
                />
                <text
                  x={decalageLameMm * 46.6 + 4}
                  y="-72"
                  fill="#ffffff"
                  fontSize="9"
                  fontWeight="bold"
                >
                  k = 0
                </text>

                {/* 2. Partie inférieure : Courbe d'intensité I(x) */}
                <text x="-290" y="-15" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                  PROFIL D’INTENSITÉ I(x) = 4 I₀ cos²(π a x / λD)
                </text>

                {/* Axe horizontal x */}
                <line x1="-290" y1="90" x2="290" y2="90" stroke="#475569" strokeWidth="1.2" />
                <text x="260" y="105" fill="#94a3b8" fontSize="10" fontFamily="monospace">x (mm)</text>

                {/* Graduations sur l'axe x */}
                {[-6, -4, -2, 0, 2, 4, 6].map((xVal) => (
                  <g key={`grad-${xVal}`} transform={`translate(${xVal * 46.6}, 0)`}>
                    <line x1="0" y1="87" x2="0" y2="93" stroke="#64748b" strokeWidth="1" />
                    <text x="-6" y="105" fill="#64748b" fontSize="9" fontFamily="monospace">
                      {xVal}
                    </text>
                  </g>
                ))}

                {/* Axe vertical I */}
                <line x1="0" y1="0" x2="0" y2="90" stroke="#334155" strokeWidth="1" strokeDasharray="2 2" />
                <text x="5" y="10" fill="#cbd5e1" fontSize="9" fontFamily="monospace">I_max</text>
                <text x="5" y="85" fill="#64748b" fontSize="9" fontFamily="monospace">0</text>

                {/* Tracé de la courbe cos² */}
                <path
                  d={youngIntensityPoints
                    .map((pt, idx) => {
                      const svgX = pt.xMm * 46.6;
                      const svgY = 90 - pt.intensity * 75; // 0 -> 90, 1 -> 15
                      return `${idx === 0 ? 'M' : 'L'} ${svgX.toFixed(1)} ${svgY.toFixed(1)}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke={beamColor}
                  strokeWidth="2.5"
                />

                {/* Indication de l'interfrange i */}
                {(() => {
                  const xCenter = decalageLameMm * 46.6;
                  const xNext = xCenter + interfrangeMm * 46.6;
                  if (xNext > 280) return null;
                  return (
                    <g>
                      <line x1={xCenter} y1="15" x2={xNext} y2="15" stroke="#fbbf24" strokeWidth="1.5" markerEnd="url(#arrow)" />
                      <line x1={xCenter} y1="10" x2={xCenter} y2="20" stroke="#fbbf24" strokeWidth="1.5" />
                      <line x1={xNext} y1="10" x2={xNext} y2="20" stroke="#fbbf24" strokeWidth="1.5" />
                      <text x={(xCenter + xNext) / 2 - 8} y="11" fill="#fbbf24" fontSize="10" fontWeight="bold">
                        i
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2 : EFFET PHOTOÉLECTRIQUE */}
      {activeTab === 'photoelectrique' && (
        <div className="space-y-6">
          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            {/* Métal */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-slate-700">
                <span>Métal de la cathode :</span>
                <span className="font-mono font-bold text-indigo-600">
                  {currentMetal.name} ({currentMetal.symbol})
                </span>
              </div>
              <div className="grid grid-cols-5 gap-1 pt-1">
                {METALS_LIST.map((m, idx) => (
                  <button
                    key={m.symbol}
                    onClick={() => setMetalIndex(idx)}
                    className={`py-1.5 px-1 rounded text-xs font-bold border transition-all ${
                      metalIndex === idx
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {m.symbol}
                  </button>
                ))}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">
                Travail d’extraction W₀ = {currentMetal.w0_ev.toFixed(2)} eV
              </div>
            </div>

            {/* Longueur d'onde incidente */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-slate-700">
                <span>Longueur d’onde incidente (λ) :</span>
                <span className="font-mono font-bold text-slate-900">{photoLambdaNm} nm</span>
              </div>
              <input
                type="range"
                min={180}
                max={750}
                step={5}
                value={photoLambdaNm}
                onChange={(e) => setPhotoLambdaNm(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>180 nm (UV lointain)</span>
                <span>Seuil λ₀ = {Math.round(lambdaSeuilNm)} nm</span>
                <span>750 nm</span>
              </div>
            </div>

            {/* Tension U_AK */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-slate-700">
                <span>Tension appliquée U_AK :</span>
                <span className="font-mono font-bold text-slate-900">
                  {tensionUakV >= 0 ? `+${tensionUakV.toFixed(2)} V` : `${tensionUakV.toFixed(2)} V`}
                </span>
              </div>
              <input
                type="range"
                min={-3.0}
                max={3.0}
                step={0.1}
                value={tensionUakV}
                onChange={(e) => setTensionUakV(Number(e.target.value))}
                className="w-full accent-indigo-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>-3.0 V (Freinage)</span>
                <span>0 V</span>
                <span>+3.0 V (Accélération)</span>
              </div>
            </div>
          </div>

          {/* Physics KPI Results */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <div className="text-[10px] uppercase font-bold text-slate-500">Énergie du photon hν</div>
              <div className="text-base font-bold text-indigo-600 font-mono mt-0.5">
                {photonEnergyEv.toFixed(2)} eV
              </div>
              <div className="text-[10px] text-slate-400 mt-1">{(photonEnergyJ * 1e19).toFixed(2)} × 10⁻¹⁹ J</div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <div className="text-[10px] uppercase font-bold text-slate-500">Condition de seuil (hν ≥ W₀)</div>
              <div className={`text-base font-bold font-mono mt-0.5 ${hasPhotoeffect ? 'text-emerald-600' : 'text-rose-600'}`}>
                {hasPhotoeffect ? 'ÉMISSION ACTIVE' : 'AUCUNE ÉMISSION'}
              </div>
              <div className="text-[10px] text-slate-400 mt-1">λ₀ = {Math.round(lambdaSeuilNm)} nm</div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <div className="text-[10px] uppercase font-bold text-slate-500">Énergie cinétique max Ec_max</div>
              <div className="text-base font-bold text-slate-900 font-mono mt-0.5">
                {ecMaxEv.toFixed(2)} eV
              </div>
              <div className="text-[10px] text-slate-400 mt-1">v_max = {(vMax / 1e5).toFixed(1)} × 10⁵ m/s</div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <div className="text-[10px] uppercase font-bold text-slate-500">Potentiel d’arrêt |U₀|</div>
              <div className="text-base font-bold text-rose-600 font-mono mt-0.5">
                {u0ArrêtV.toFixed(2)} V
              </div>
              <div className="text-[10px] text-slate-400 mt-1">U_AK_arrêt = -{u0ArrêtV.toFixed(2)} V</div>
            </div>
          </div>

          {/* SVG Diagram Cellule Photoélectrique */}
          <div className="bg-slate-950 rounded-2xl p-4 text-white border border-slate-800">
            <div className="flex flex-wrap items-center justify-between text-xs border-b border-slate-800 pb-2 mb-3">
              <span className="text-slate-300 font-semibold">
                Cellule Photoémissive sous Vide &amp; Mouvement des Photoélectrons
              </span>
              <div className="font-mono text-cyan-400 text-[11px]">
                Photocourant I : {isBlockedByUak ? '0 µA (Bloqué par U_AK)' : hasPhotoeffect ? `${(photocourantRelatif * 12).toFixed(1)} µA (Actif)` : '0 µA (Sous le seuil)'}
              </div>
            </div>

            <div className="relative w-full h-[260px] flex items-center justify-center">
              <svg className="w-full h-full max-w-[560px]" viewBox="0 0 560 220">
                {/* Ampoule en verre sous vide */}
                <ellipse cx="280" cy="95" rx="140" ry="75" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                <text x="370" y="45" fill="#64748b" fontSize="10" fontFamily="monospace">Vide poussé</text>

                {/* Cathode C (courbée en demi-cylindre à gauche) */}
                <path d="M 190 45 Q 160 95 190 145" fill="none" stroke="#a855f7" strokeWidth="6" strokeLinecap="round" />
                <text x="140" y="98" fill="#a855f7" fontSize="11" fontWeight="bold">Cathode K</text>
                <text x="140" y="112" fill="#94a3b8" fontSize="9">{currentMetal.symbol} ({currentMetal.w0_ev} eV)</text>

                {/* Anode A (fil métallique droit au centre à droite) */}
                <line x1="330" y1="50" x2="330" y2="140" stroke="#38bdf8" strokeWidth="4" strokeLinecap="round" />
                <text x="345" y="98" fill="#38bdf8" fontSize="11" fontWeight="bold">Anode A</text>

                {/* Faisceau lumineux incident (flèches ondulées jaunes) */}
                <path d="M 90 25 L 175 70" stroke="#fbbf24" strokeWidth="2.5" strokeDasharray="4 2" />
                <path d="M 90 55 L 175 95" stroke="#fbbf24" strokeWidth="2.5" strokeDasharray="4 2" />
                <path d="M 90 85 L 175 120" stroke="#fbbf24" strokeWidth="2.5" strokeDasharray="4 2" />
                <text x="70" y="18" fill="#fbbf24" fontSize="10" fontWeight="bold">
                  Photons hν ({photoLambdaNm} nm)
                </text>

                {/* Électrons émis si effet photoélectrique */}
                {hasPhotoeffect && (
                  <g>
                    {/* Électrons volant vers l'anode */}
                    <circle cx="215" cy="80" r="3.5" fill="#10b981" />
                    <line x1="215" y1="80" x2="235" y2="80" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2 2" />

                    <circle cx="245" cy="95" r="3.5" fill="#10b981" />
                    <line x1="245" y1="95" x2="270" y2="95" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2 2" />

                    <circle cx="280" cy="110" r="3.5" fill="#10b981" />
                    <line x1="280" y1="110" x2="305" y2="110" stroke="#10b981" strokeWidth="1.5" strokeDasharray="2 2" />

                    <text x="210" y="65" fill="#10b981" fontSize="9" fontWeight="bold">
                      Photoélectrons (e⁻)
                    </text>
                  </g>
                )}

                {/* Circuit extérieur avec générateur de tension réglable */}
                <path d="M 175 145 L 175 190 L 250 190" fill="none" stroke="#64748b" strokeWidth="2" />
                <path d="M 330 140 L 330 190 L 310 190" fill="none" stroke="#64748b" strokeWidth="2" />

                {/* Symbole générateur U_AK */}
                <rect x="250" y="180" width="60" height="20" rx="4" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1.5" />
                <text x="256" y="194" fill="#cbd5e1" fontSize="10" fontFamily="monospace">
                  U_AK
                </text>

                {/* Microampèremètre */}
                <circle cx="390" cy="190" r="14" fill="#1e293b" stroke="#cbd5e1" strokeWidth="1.5" />
                <text x="384" y="194" fill="#fbbf24" fontSize="10" fontWeight="bold">µA</text>
                <path d="M 330 190 L 376 190" stroke="#64748b" strokeWidth="2" />
                <path d="M 404 190 L 440 190 L 440 95 L 420 95" stroke="#64748b" strokeWidth="2" fill="none" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3 : MODÈLE DE BOHR */}
      {activeTab === 'bohr' && (
        <div className="space-y-6">
          {/* Controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
            {/* Niveau supérieur p */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-slate-700">
                <span>Niveau initial supérieur (p) :</span>
                <span className="font-mono font-bold text-indigo-600">
                  p = {bohrLevelP} (E_{bohrLevelP} = {(-E0_HYDROGEN / (bohrLevelP * bohrLevelP)).toFixed(2)} eV)
                </span>
              </div>
              <div className="flex gap-2">
                {[2, 3, 4, 5, 6].map((pVal) => (
                  <button
                    key={`p-${pVal}`}
                    onClick={() => {
                      setBohrLevelP(pVal);
                      if (bohrLevelN >= pVal) setBohrLevelN(pVal - 1);
                    }}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      bohrLevelP === pVal
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    p = {pVal}
                  </button>
                ))}
              </div>
            </div>

            {/* Niveau inférieur n */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-medium text-slate-700">
                <span>Niveau final inférieur (n) :</span>
                <span className="font-mono font-bold text-indigo-600">
                  n = {bohrLevelN} (E_{bohrLevelN} = {(-E0_HYDROGEN / (bohrLevelN * bohrLevelN)).toFixed(2)} eV)
                </span>
              </div>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((nVal) => (
                  <button
                    key={`n-${nVal}`}
                    disabled={nVal >= bohrLevelP}
                    onClick={() => setBohrLevelN(nVal)}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                      bohrLevelN === nVal
                        ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                        : nVal >= bohrLevelP
                        ? 'bg-slate-100 text-slate-300 border-slate-100 cursor-not-allowed'
                        : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    n = {nVal}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* KPI Transition */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <div className="text-[10px] uppercase font-bold text-slate-500">Énergie photon émis ΔE</div>
              <div className="text-base font-bold text-indigo-600 font-mono mt-0.5">
                {deltaEBohrEv.toFixed(3)} eV
              </div>
              <div className="text-[10px] text-slate-400 mt-1">{(deltaEBohrJ * 1e19).toFixed(2)} × 10⁻¹⁹ J</div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <div className="text-[10px] uppercase font-bold text-slate-500">Longueur d’onde émise λ</div>
              <div className="text-base font-bold font-mono mt-0.5" style={{ color: bohrRayColor }}>
                {bohrLambdaNm.toFixed(1)} nm
              </div>
              <div className="text-[10px] text-slate-400 mt-1">λ = hc / ΔE</div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <div className="text-[10px] uppercase font-bold text-slate-500">Série spectrale</div>
              <div className="text-xs font-bold text-slate-900 mt-1">
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-bold ${serieInfo.badgeColor}`}>
                  {serieInfo.name}
                </span>
              </div>
              <div className="text-[10px] text-slate-500 mt-1">{serieInfo.domain}</div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
              <div className="text-[10px] uppercase font-bold text-slate-500">Énergie d’ionisation</div>
              <div className="text-base font-bold text-emerald-600 font-mono mt-0.5">
                +13.61 eV
              </div>
              <div className="text-[10px] text-slate-400 mt-1">Transition n=1 → ∞</div>
            </div>
          </div>

          {/* SVG Diagramme des Niveaux de Bohr */}
          <div className="bg-slate-950 rounded-2xl p-4 text-white border border-slate-800">
            <div className="flex flex-wrap items-center justify-between text-xs border-b border-slate-800 pb-2 mb-2">
              <span className="text-slate-300 font-semibold">
                Diagramme Quantifié des Niveaux d’Énergie de l’Hydrogène (E_n = -13,6 / n² eV)
              </span>
              <div className="font-mono text-[11px]" style={{ color: bohrRayColor }}>
                Transition {bohrLevelP} → {bohrLevelN} : photon λ = {bohrLambdaNm.toFixed(1)} nm ({serieInfo.name})
              </div>
            </div>

            <div className="relative w-full h-[280px]">
              <svg className="w-full h-full" viewBox="0 0 540 260">
                {/* Axe vertical énergie */}
                <line x1="60" y1="20" x2="60" y2="240" stroke="#475569" strokeWidth="1.5" />
                <text x="15" y="25" fill="#94a3b8" fontSize="10" fontFamily="monospace">E (eV)</text>

                {/* Niveaux horizontaux */}
                {[
                  { n: 1, e: -13.6, y: 230, label: 'n = 1 (Fondamental)' },
                  { n: 2, e: -3.4, y: 155, label: 'n = 2 (1er excité)' },
                  { n: 3, e: -1.51, y: 110, label: 'n = 3 (2e excité)' },
                  { n: 4, e: -0.85, y: 85, label: 'n = 4' },
                  { n: 5, e: -0.54, y: 68, label: 'n = 5' },
                  { n: 6, e: -0.38, y: 55, label: 'n = 6' },
                  { n: 99, e: 0.0, y: 35, label: 'n = ∞ (Ionisation)' },
                ].map((lvl) => {
                  const isLevelP = lvl.n === bohrLevelP;
                  const isLevelN = lvl.n === bohrLevelN;

                  return (
                    <g key={`lvl-${lvl.n}`}>
                      <line
                        x1="60"
                        y1={lvl.y}
                        x2="480"
                        y2={lvl.y}
                        stroke={isLevelP || isLevelN ? '#38bdf8' : '#334155'}
                        strokeWidth={isLevelP || isLevelN ? 2.5 : 1}
                        strokeDasharray={lvl.n === 99 ? '3 3' : undefined}
                      />
                      <text x="10" y={lvl.y + 3} fill="#94a3b8" fontSize="9" fontFamily="monospace">
                        {lvl.e.toFixed(2)}
                      </text>
                      <text
                        x="485"
                        y={lvl.y + 3}
                        fill={isLevelP || isLevelN ? '#38bdf8' : '#64748b'}
                        fontSize="9"
                        fontWeight={isLevelP || isLevelN ? 'bold' : 'normal'}
                      >
                        {lvl.label}
                      </text>
                    </g>
                  );
                })}

                {/* Flèche de transition sélectionnée */}
                {(() => {
                  const yMap: Record<number, number> = { 1: 230, 2: 155, 3: 110, 4: 85, 5: 68, 6: 55 };
                  const yStart = yMap[bohrLevelP];
                  const yEnd = yMap[bohrLevelN];
                  if (!yStart || !yEnd) return null;

                  return (
                    <g>
                      <line
                        x1="260"
                        y1={yStart}
                        x2="260"
                        y2={yEnd}
                        stroke={bohrRayColor}
                        strokeWidth="3"
                        markerEnd="url(#arrowBohr)"
                      />
                      <circle cx="260" cy={yStart} r="4" fill={bohrRayColor} />
                      <circle cx="260" cy={yEnd} r="4" fill={bohrRayColor} />

                      {/* Émission d'un photon ondulé */}
                      <path
                        d={`M 265 ${(yStart + yEnd) / 2} Q 280 ${(yStart + yEnd) / 2 - 8}, 295 ${(yStart + yEnd) / 2} T 325 ${(yStart + yEnd) / 2}`}
                        fill="none"
                        stroke="#fbbf24"
                        strokeWidth="2"
                      />
                      <text
                        x="335"
                        y={(yStart + yEnd) / 2 + 4}
                        fill="#fbbf24"
                        fontSize="10"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        Photon hν = {deltaEBohrEv.toFixed(2)} eV (λ = {bohrLambdaNm.toFixed(0)} nm)
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* Experimental Observation Takeaway */}
      <div className="mt-6 p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 text-xs text-indigo-950">
        <div>
          <span className="font-bold text-indigo-900 block mb-0.5">
            Synthèse d’Excellence pour l’Épreuve de Physique du Bac S2 :
          </span>
          La lumière présente une <strong>dualité onde-corpuscule</strong> irréductible : le modèle ondulatoire de Huygens-Fresnel rend compte avec exactitude de la propagation, des interférences d’Young (i = λ·D / a) et de la diffraction ; le modèle corpusculaire d’Einstein-Planck explique l’interaction ponctuelle lumière-matière avec l’effet photoélectrique (hν = W₀ + ½ m v_max²) et les sauts quantiques de Bohr (ΔE = hν = hc / λ).
        </div>
      </div>
    </section>
  );
}
