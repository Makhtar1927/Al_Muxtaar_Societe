'use client';

import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Sliders,
  Activity,
  Layers,
  Zap,
  Info,
  Maximize2,
  Compass,
} from 'lucide-react';

export default function P5OscillationsInteractiveLab() {
  // Mode d'affichage du labo
  const [activeTab, setActiveTab] = useState<'horizontal' | 'vertical' | 'energie'>('horizontal');

  // Paramètres physiques ajustables
  const [mass, setMass] = useState<number>(0.25); // en kg (250 g)
  const [stiffness, setStiffness] = useState<number>(25); // en N/m
  const [amplitude, setAmplitude] = useState<number>(0.08); // en m (8 cm)
  const [phaseInit, setPhaseInit] = useState<number>(0); // en rad

  // Animation state
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [simTime, setSimTime] = useState<number>(0);

  // Constante gravitationnelle locale
  const g = 9.8; // m/s^2

  // Calculs physiques dérivés
  const omega0 = Math.sqrt(stiffness / mass); // rad/s
  const T0 = (2 * Math.PI) / omega0; // s
  const freq0 = 1 / T0; // Hz
  const deltaL0 = (mass * g) / stiffness; // allongement statique en m

  // Élongation, vitesse et accélération actuelles
  const currentX = amplitude * Math.cos(omega0 * simTime + phaseInit);
  const currentV = -amplitude * omega0 * Math.sin(omega0 * simTime + phaseInit);
  const currentA = -amplitude * omega0 * omega0 * Math.cos(omega0 * simTime + phaseInit);

  // Énergies
  const Ec = 0.5 * mass * currentV * currentV; // Joules
  const Epe = 0.5 * stiffness * currentX * currentX; // Joules
  const Em = Ec + Epe; // Joules (constante = 0.5 * k * Xm^2)
  const Vmax = omega0 * amplitude;

  // Boucle d'animation fluide
  useEffect(() => {
    let animId: number;
    let lastStamp: number | null = null;

    const loop = (timestamp: number) => {
      if (!lastStamp) lastStamp = timestamp;
      const dt = (timestamp - lastStamp) / 1000;
      lastStamp = timestamp;

      if (isPlaying) {
        setSimTime(prev => (prev + dt) % 20); // boucle sur 20s
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  const handleReset = () => {
    setSimTime(0);
    setIsPlaying(false);
  };

  // Coordonnées visuelles pour le ressort horizontal
  // Centre d'équilibre à x = 200, déplacement max = ±80px
  const scaleX = 1000; // pixels par mètre (8cm = 80px)
  const visualDisplacement = currentX * scaleX;
  const blockX = 220 + visualDisplacement;

  // Génération dynamique des spires SVG en zigzag
  const numCoils = 14;
  const startX = 40;
  const endX = blockX;
  const coilWidth = (endX - startX) / numCoils;
  let springPoints = `M ${startX} 80 `;
  for (let i = 0; i < numCoils; i++) {
    const px1 = startX + (i + 0.25) * coilWidth;
    const py1 = 60;
    const px2 = startX + (i + 0.75) * coilWidth;
    const py2 = 100;
    springPoints += `L ${px1} ${py1} L ${px2} ${py2} `;
  }
  springPoints += `L ${endX} 80`;

  return (
    <div className="bg-white rounded-3xl border border-navy/10 p-6 md:p-8 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-navy/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-turquoise/10 border border-turquoise/30 text-xs font-semibold text-turquoise mb-2">
            <Activity className="w-3.5 h-3.5" />
            <span>Laboratoire Virtuel Interactif • Physique S2</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-navy">
            Simulateur d&apos;Oscillations &amp; Énergies Mécaniques
          </h2>
          <p className="text-sm text-navy/70 mt-1">
            Visualisez les oscillations en temps réel, l&apos;allongement statique et le transfert dynamique d&apos;énergie
          </p>
        </div>

        {/* Boutons d'onglet */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-navy/5 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('horizontal')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'horizontal'
                ? 'bg-navy text-white shadow-sm'
                : 'text-navy/70 hover:text-navy'
            }`}
          >
            Pendule Horizontal
          </button>
          <button
            onClick={() => setActiveTab('vertical')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'vertical'
                ? 'bg-navy text-white shadow-sm'
                : 'text-navy/70 hover:text-navy'
            }`}
          >
            Pendule Vertical
          </button>
          <button
            onClick={() => setActiveTab('energie')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'energie'
                ? 'bg-navy text-white shadow-sm'
                : 'text-navy/70 hover:text-navy'
            }`}
          >
            Échanges Énergétiques
          </button>
        </div>
      </div>

      {/* Zone Graphique Principale (SVG Dynamique) */}
      <div className="rounded-2xl border border-navy/10 bg-slate-900 overflow-hidden shadow-inner p-4 text-white">
        {activeTab === 'horizontal' && (
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2 px-2">
              <span className="font-semibold text-slate-200">
                Oscillateur Élastique Horizontal sans Frottement sur coussin d&apos;air
              </span>
              <span className="font-mono">
                x(t) = {(currentX * 100).toFixed(2)} cm | v(t) = {(currentV).toFixed(2)} m/s
              </span>
            </div>

            {/* Schéma SVG Vectoriel du Pendule Horizontal */}
            <svg viewBox="0 0 500 180" className="w-full h-48 bg-slate-950 rounded-xl">
              {/* Paroi fixe à gauche */}
              <rect x="20" y="30" width="20" height="110" fill="#334155" stroke="#64748b" strokeWidth="2" />
              {/* Hachures de support */}
              {Array.from({ length: 6 }).map((_, i) => (
                <line
                  key={i}
                  x1="12"
                  y1={45 + i * 16}
                  x2="20"
                  y2={37 + i * 16}
                  stroke="#64748b"
                  strokeWidth="2"
                />
              ))}

              {/* Sol horizontal / table */}
              <line x1="20" y1="140" x2="480" y2="140" stroke="#475569" strokeWidth="3" />
              {/* Petits points d'air (banc à coussin d'air) */}
              {Array.from({ length: 25 }).map((_, i) => (
                <circle key={i} cx={40 + i * 18} cy="144" r="1" fill="#00c4b4" opacity="0.6" />
              ))}

              {/* Axe des abscisses (Ox) */}
              <line x1="120" y1="165" x2="440" y2="165" stroke="#64748b" strokeWidth="1.5" strokeDasharray="3 3" />
              <polygon points="445,165 435,161 435,169" fill="#64748b" />
              <text x="450" y="169" fill="#94a3b8" fontSize="11" fontFamily="sans-serif">x</text>

              {/* Position d'équilibre x = 0 (trait vertical vertic) */}
              <line x1="220" y1="40" x2="220" y2="170" stroke="#10b981" strokeWidth="1.5" strokeDasharray="4 4" />
              <text x="215" y="177" fill="#10b981" fontSize="10" fontWeight="bold" fontFamily="sans-serif">O (x=0)</text>

              {/* Bornes d'oscillation -Xm et +Xm */}
              <line x1={220 - amplitude * scaleX} y1="130" x2={220 - amplitude * scaleX} y2="160" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2 2" />
              <text x={220 - amplitude * scaleX - 12} y="157" fill="#f43f5e" fontSize="9" fontFamily="sans-serif">-Xm</text>

              <line x1={220 + amplitude * scaleX} y1="130" x2={220 + amplitude * scaleX} y2="160" stroke="#f43f5e" strokeWidth="1" strokeDasharray="2 2" />
              <text x={220 + amplitude * scaleX + 3} y="157" fill="#f43f5e" fontSize="9" fontFamily="sans-serif">+Xm</text>

              {/* Ressort élastique dynamique */}
              <path d={springPoints} fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

              {/* Solide M de masse m */}
              <rect
                x={blockX}
                y="55"
                width="50"
                height="50"
                rx="6"
                fill="#1e293b"
                stroke="#00c4b4"
                strokeWidth="2.5"
              />
              {/* Centre de gravité G */}
              <circle cx={blockX + 25} cy="80" r="3" fill="#ffffff" />
              <text x={blockX + 18} y="84" fill="#ffffff" fontSize="11" fontWeight="bold" fontFamily="sans-serif">G</text>

              {/* Vecteurs forces à partir de G */}
              {/* Poids P (vers le bas) */}
              <line x1={blockX + 25} y1="80" x2={blockX + 25} y2="125" stroke="#e2e8f0" strokeWidth="2" />
              <polygon points={`${blockX + 25},130 ${blockX + 22},123 ${blockX + 28},123`} fill="#e2e8f0" />
              <text x={blockX + 30} y="115" fill="#e2e8f0" fontSize="10" fontFamily="sans-serif">P</text>

              {/* Réaction normale R (vers le haut) */}
              <line x1={blockX + 25} y1="80" x2={blockX + 25} y2="35" stroke="#e2e8f0" strokeWidth="2" />
              <polygon points={`${blockX + 25},30 ${blockX + 22},37 ${blockX + 28},37`} fill="#e2e8f0" />
              <text x={blockX + 30} y="45" fill="#e2e8f0" fontSize="10" fontFamily="sans-serif">R</text>

              {/* Force de rappel T = -kx (horizontale vers O) */}
              {Math.abs(currentX) > 0.005 && (
                <>
                  <line
                    x1={blockX}
                    y1="80"
                    x2={blockX - currentX * 600}
                    y2="80"
                    stroke="#f59e0b"
                    strokeWidth="2.5"
                  />
                  <polygon
                    points={
                      currentX > 0
                        ? `${blockX - currentX * 600 - 6},80 ${blockX - currentX * 600},76 ${blockX - currentX * 600},84`
                        : `${blockX - currentX * 600 + 6},80 ${blockX - currentX * 600},76 ${blockX - currentX * 600},84`
                    }
                    fill="#f59e0b"
                  />
                  <text
                    x={blockX - (currentX * 600) / 2 - 8}
                    y="72"
                    fill="#f59e0b"
                    fontSize="10"
                    fontWeight="bold"
                    fontFamily="sans-serif"
                  >
                    T
                  </text>
                </>
              )}

              {/* Vecteur vitesse v */}
              {Math.abs(currentV) > 0.05 && (
                <>
                  <line
                    x1={blockX + 25}
                    y1="105"
                    x2={blockX + 25 + currentV * 40}
                    y2="105"
                    stroke="#00c4b4"
                    strokeWidth="2"
                  />
                  <polygon
                    points={
                      currentV > 0
                        ? `${blockX + 25 + currentV * 40 + 5},105 ${blockX + 25 + currentV * 40},102 ${blockX + 25 + currentV * 40},108`
                        : `${blockX + 25 + currentV * 40 - 5},105 ${blockX + 25 + currentV * 40},102 ${blockX + 25 + currentV * 40},108`
                    }
                    fill="#00c4b4"
                  />
                  <text
                    x={blockX + 25 + (currentV * 40) / 2 - 5}
                    y="118"
                    fill="#00c4b4"
                    fontSize="10"
                    fontFamily="sans-serif"
                  >
                    v
                  </text>
                </>
              )}
            </svg>
          </div>
        )}

        {activeTab === 'vertical' && (
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2 px-2">
              <span className="font-semibold text-slate-200">
                Comparatif des 3 États du Pendule Vertical : À vide, Équilibre &amp; En mouvement
              </span>
              <span className="font-mono text-emerald-400">
                Δl₀ = mg/k = {(deltaL0 * 100).toFixed(1)} cm
              </span>
            </div>

            {/* Schéma SVG Vectoriel du Pendule Vertical */}
            <svg viewBox="0 0 500 240" className="w-full h-56 bg-slate-950 rounded-xl">
              {/* Plafond de fixation */}
              <rect x="30" y="15" width="440" height="12" fill="#334155" stroke="#64748b" strokeWidth="1.5" />
              {Array.from({ length: 22 }).map((_, i) => (
                <line
                  key={i}
                  x1={40 + i * 20}
                  y1="15"
                  x2={32 + i * 20}
                  y2="7"
                  stroke="#64748b"
                  strokeWidth="1.5"
                />
              ))}

              {/* Colonne 1 : Ressort à vide l0 */}
              <g transform="translate(80, 0)">
                <text x="0" y="40" fill="#94a3b8" fontSize="10" textAnchor="middle" fontWeight="bold">1. À vide (l₀)</text>
                {/* Spire à vide (hauteur 70px) */}
                <path
                  d="M 0 27 L 0 35 L -8 40 L 8 46 L -8 52 L 8 58 L -8 64 L 8 70 L -8 76 L 8 82 L -8 88 L 8 94 L 0 99 L 0 105"
                  fill="none"
                  stroke="#94a3b8"
                  strokeWidth="2"
                />
                <line x1="-15" y1="105" x2="15" y2="105" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="2 2" />
                <line x1="-30" y1="105" x2="330" y2="105" stroke="#64748b" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />
                <text x="0" y="120" fill="#94a3b8" fontSize="9" textAnchor="middle">Longueur l₀</text>
              </g>

              {/* Colonne 2 : Équilibre statique (allongement deltaL0) */}
              <g transform="translate(230, 0)">
                <text x="0" y="40" fill="#10b981" fontSize="10" textAnchor="middle" fontWeight="bold">2. Équilibre (P + T₀ = 0)</text>
                {/* Spire étirée de deltaL0 */}
                <path
                  d="M 0 27 L 0 35 L -9 43 L 9 52 L -9 61 L 9 70 L -9 79 L 9 88 L -9 97 L 9 106 L -9 115 L 9 124 L 0 131 L 0 138"
                  fill="none"
                  stroke="#10b981"
                  strokeWidth="2"
                />
                {/* Solide M suspendu */}
                <rect x="-18" y="138" width="36" height="36" rx="4" fill="#1e293b" stroke="#10b981" strokeWidth="2" />
                <circle cx="0" cy="156" r="2.5" fill="#ffffff" />
                <text x="0" y="159" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">G₀</text>

                {/* Forces P et T0 à l'équilibre */}
                <line x1="0" y1="156" x2="0" y2="195" stroke="#e2e8f0" strokeWidth="2" />
                <polygon points="0,200 -3,193 3,193" fill="#e2e8f0" />
                <text x="7" y="185" fill="#e2e8f0" fontSize="9">P</text>

                <line x1="0" y1="156" x2="0" y2="117" stroke="#f59e0b" strokeWidth="2" />
                <polygon points="0,112 -3,119 3,119" fill="#f59e0b" />
                <text x="7" y="125" fill="#f59e0b" fontSize="9">T₀</text>

                {/* Cote delta l0 */}
                <line x1="28" y1="105" x2="28" y2="138" stroke="#38bdf8" strokeWidth="1.5" />
                <polygon points="28,105 26,110 30,110" fill="#38bdf8" />
                <polygon points="28,138 26,133 30,133" fill="#38bdf8" />
                <text x="35" y="124" fill="#38bdf8" fontSize="9" fontWeight="bold">Δl₀</text>

                {/* Ligne d'équilibre prolongée */}
                <line x1="-30" y1="156" x2="200" y2="156" stroke="#10b981" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />
              </g>

              {/* Colonne 3 : Oscillateur dynamique en mouvement */}
              <g transform="translate(380, 0)">
                <text x="0" y="40" fill="#38bdf8" fontSize="10" textAnchor="middle" fontWeight="bold">3. Oscillations z(t)</text>
                {/* Hauteur variable selon currentX */}
                {(() => {
                  const dynamicBottom = 138 + currentX * 400;
                  const step = (dynamicBottom - 35) / 10;
                  return (
                    <>
                      <path
                        d={`M 0 27 L 0 35 ${Array.from({ length: 9 }).map((_, idx) => `L ${idx % 2 === 0 ? -9 : 9} ${35 + (idx + 1) * step}`).join(' ')} L 0 ${dynamicBottom}`}
                        fill="none"
                        stroke="#00c4b4"
                        strokeWidth="2.5"
                      />
                      <rect
                        x="-18"
                        y={dynamicBottom}
                        width="36"
                        height="36"
                        rx="4"
                        fill="#1e293b"
                        stroke="#00c4b4"
                        strokeWidth="2"
                      />
                      <circle cx="0" cy={dynamicBottom + 18} r="2.5" fill="#ffffff" />
                      <text x="0" y={dynamicBottom + 21} fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">G</text>

                      {/* Cote d'élongation z */}
                      <line x1="28" y1="156" x2="28" y2={dynamicBottom + 18} stroke="#f43f5e" strokeWidth="1.5" />
                      <polygon points={`28,156 26,${dynamicBottom + 18 > 156 ? 161 : 151} 30,${dynamicBottom + 18 > 156 ? 161 : 151}`} fill="#f43f5e" />
                      <polygon points={`28,${dynamicBottom + 18} 26,${dynamicBottom + 18 > 156 ? dynamicBottom + 13 : dynamicBottom + 23} 30,${dynamicBottom + 18 > 156 ? dynamicBottom + 13 : dynamicBottom + 23}`} fill="#f43f5e" />
                      <text x="35" y={156 + (dynamicBottom + 18 - 156) / 2 + 3} fill="#f43f5e" fontSize="9" fontWeight="bold">z</text>
                    </>
                  );
                })()}

                {/* Axe Z orienté vers le bas */}
                <line x1="65" y1="50" x2="65" y2="225" stroke="#64748b" strokeWidth="1.5" />
                <polygon points="65,230 62,223 68,223" fill="#64748b" />
                <text x="70" y="230" fill="#94a3b8" fontSize="10">z</text>
                <line x1="60" y1="156" x2="70" y2="156" stroke="#10b981" strokeWidth="1.5" />
                <text x="73" y="159" fill="#10b981" fontSize="9" fontWeight="bold">0</text>
              </g>
            </svg>
          </div>
        )}

        {activeTab === 'energie' && (
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2 px-2">
              <span className="font-semibold text-slate-200">
                Diagramme des Énergies en fonction du Temps (Conservation Parfaite sans Frottement)
              </span>
              <span className="font-mono text-emerald-400">
                Em = Ec + Epe = {(Em * 1000).toFixed(1)} mJ (constante)
              </span>
            </div>

            {/* Graphe SVG Dynamique des Énergies */}
            <svg viewBox="0 0 500 180" className="w-full h-48 bg-slate-950 rounded-xl">
              {/* Axes orthogonaux */}
              <line x1="50" y1="150" x2="470" y2="150" stroke="#64748b" strokeWidth="1.5" />
              <polygon points="475,150 467,146 467,154" fill="#64748b" />
              <text x="470" y="165" fill="#94a3b8" fontSize="10">t (s)</text>

              <line x1="50" y1="150" x2="50" y2="20" stroke="#64748b" strokeWidth="1.5" />
              <polygon points="50,15 46,23 54,23" fill="#64748b" />
              <text x="25" y="22" fill="#94a3b8" fontSize="10">E (J)</text>

              {/* Ligne constante Em */}
              <line x1="50" y1="40" x2="460" y2="40" stroke="#10b981" strokeWidth="2.5" strokeDasharray="5 3" />
              <text x="410" y="34" fill="#10b981" fontSize="10" fontWeight="bold">Em = constante</text>

              {/* Courbes sinusoïdales Ec(t) et Epe(t) sur 2 périodes */}
              {(() => {
                const pointsEc: string[] = [];
                const pointsEpe: string[] = [];
                const totalSamples = 120;
                const plotWidth = 400;
                const baseHeight = 150;
                const ampHeight = 110;

                for (let i = 0; i <= totalSamples; i++) {
                  const tSample = (i / totalSamples) * (2 * T0);
                  const px = 50 + (i / totalSamples) * plotWidth;

                  const vSample = -amplitude * omega0 * Math.sin(omega0 * tSample + phaseInit);
                  const xSample = amplitude * Math.cos(omega0 * tSample + phaseInit);

                  const ecSample = 0.5 * mass * vSample * vSample;
                  const epeSample = 0.5 * stiffness * xSample * xSample;

                  const pyEc = baseHeight - (ecSample / (Em || 1)) * ampHeight;
                  const pyEpe = baseHeight - (epeSample / (Em || 1)) * ampHeight;

                  pointsEc.push(`${px},${pyEc}`);
                  pointsEpe.push(`${px},${pyEpe}`);
                }

                // Curseur de temps actuel
                const curTNormalized = (simTime % (2 * T0)) / (2 * T0);
                const curXCoord = 50 + curTNormalized * plotWidth;

                return (
                  <>
                    {/* Courbe Epe (potentielle élastique en ambre) */}
                    <polyline
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="2"
                      points={pointsEpe.join(' ')}
                    />
                    {/* Courbe Ec (cinétique en cyan) */}
                    <polyline
                      fill="none"
                      stroke="#00c4b4"
                      strokeWidth="2"
                      points={pointsEc.join(' ')}
                    />

                    {/* Curseur temporel en direct */}
                    <line x1={curXCoord} y1="35" x2={curXCoord} y2="150" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="2 2" />
                    <circle
                      cx={curXCoord}
                      cy={baseHeight - (Ec / (Em || 1)) * ampHeight}
                      r="4"
                      fill="#00c4b4"
                    />
                    <circle
                      cx={curXCoord}
                      cy={baseHeight - (Epe / (Em || 1)) * ampHeight}
                      r="4"
                      fill="#f59e0b"
                    />
                  </>
                );
              })()}

              {/* Graduations de période énergétique TE = T0 / 2 */}
              <text x="50" y="165" fill="#64748b" fontSize="9" textAnchor="middle">0</text>
              <line x1="150" y1="147" x2="150" y2="153" stroke="#64748b" />
              <text x="150" y="165" fill="#64748b" fontSize="9" textAnchor="middle">TE = T₀/2</text>
              <line x1="250" y1="147" x2="250" y2="153" stroke="#64748b" />
              <text x="250" y="165" fill="#64748b" fontSize="9" textAnchor="middle">T₀</text>
              <line x1="350" y1="147" x2="350" y2="153" stroke="#64748b" />
              <text x="350" y="165" fill="#64748b" fontSize="9" textAnchor="middle">3T₀/2</text>
              <line x1="450" y1="147" x2="450" y2="153" stroke="#64748b" />
              <text x="450" y="165" fill="#64748b" fontSize="9" textAnchor="middle">2T₀</text>

              {/* Légende */}
              <g transform="translate(60, 25)">
                <circle cx="0" cy="0" r="4" fill="#00c4b4" />
                <text x="8" y="3" fill="#00c4b4" fontSize="9" fontWeight="bold">Ec (cinétique)</text>

                <circle cx="95" cy="0" r="4" fill="#f59e0b" />
                <text x="103" y="3" fill="#f59e0b" fontSize="9" fontWeight="bold">Epe (élastique)</text>

                <line x1="190" y1="0" x2="205" y2="0" stroke="#10b981" strokeWidth="2" strokeDasharray="3 2" />
                <text x="210" y="3" fill="#10b981" fontSize="9" fontWeight="bold">Em (totale)</text>
              </g>
            </svg>
          </div>
        )}
      </div>

      {/* Barres d'Énergie en Temps Réel */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-navy">Énergie Cinétique (Ec)</span>
            <span className="font-mono font-bold text-turquoise">{(Ec * 1000).toFixed(2)} mJ</span>
          </div>
          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-turquoise transition-all duration-75"
              style={{ width: `${Math.min(100, (Ec / (Em || 1)) * 100)}%` }}
            />
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-navy">Énergie Potentielle (Epe)</span>
            <span className="font-mono font-bold text-amber-600">{(Epe * 1000).toFixed(2)} mJ</span>
          </div>
          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 transition-all duration-75"
              style={{ width: `${Math.min(100, (Epe / (Em || 1)) * 100)}%` }}
            />
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-navy">Énergie Mécanique (Em)</span>
            <span className="font-mono font-bold text-emerald-700">{(Em * 1000).toFixed(2)} mJ</span>
          </div>
          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-600 w-full" />
          </div>
        </div>
      </div>

      {/* Tableau de bord interactif des curseurs */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-navy/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-navy uppercase tracking-wider">
            <Sliders className="w-4 h-4 text-turquoise" />
            <span>Paramètres Expérimentaux du Laboratoire</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-3.5 py-1.5 rounded-xl bg-navy text-white text-xs font-bold hover:bg-navy/90 transition-all flex items-center gap-1.5 shadow-sm"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pause' : 'Animer'}</span>
            </button>
            <button
              onClick={handleReset}
              className="px-3 py-1.5 rounded-xl bg-white border border-navy/15 text-navy text-xs font-semibold hover:bg-navy/5 transition-all flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          {/* Masse m */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-navy/70">Masse m :</span>
              <span className="font-bold text-navy font-mono">{(mass * 1000).toFixed(0)} g</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="1.0"
              step="0.05"
              value={mass}
              onChange={e => setMass(parseFloat(e.target.value))}
              className="w-full accent-navy cursor-pointer"
            />
          </div>

          {/* Raideur k */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-navy/70">Raideur k :</span>
              <span className="font-bold text-navy font-mono">{stiffness} N/m</span>
            </div>
            <input
              type="range"
              min="5"
              max="100"
              step="5"
              value={stiffness}
              onChange={e => setStiffness(parseFloat(e.target.value))}
              className="w-full accent-navy cursor-pointer"
            />
          </div>

          {/* Amplitude Xm */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-navy/70">Amplitude Xm :</span>
              <span className="font-bold text-navy font-mono">{(amplitude * 100).toFixed(1)} cm</span>
            </div>
            <input
              type="range"
              min="0.02"
              max="0.12"
              step="0.01"
              value={amplitude}
              onChange={e => setAmplitude(parseFloat(e.target.value))}
              className="w-full accent-navy cursor-pointer"
            />
          </div>

          {/* Phase initiale phi */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-navy/70">Phase initiale φ :</span>
              <span className="font-bold text-navy font-mono">
                {phaseInit === 0 ? '0' : phaseInit === Math.PI ? 'π' : (phaseInit / Math.PI).toFixed(2) + ' π'} rad
              </span>
            </div>
            <input
              type="range"
              min="0"
              max={2 * Math.PI}
              step={Math.PI / 4}
              value={phaseInit}
              onChange={e => setPhaseInit(parseFloat(e.target.value))}
              className="w-full accent-navy cursor-pointer"
            />
          </div>
        </div>

        {/* Bilan Numérique Instantané */}
        <div className="pt-3 border-t border-navy/10 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
          <div className="p-2 rounded-xl bg-white border border-navy/10">
            <span className="text-navy/60 block text-[11px]">Pulsation ω₀</span>
            <span className="font-mono font-bold text-navy">{omega0.toFixed(2)} rad/s</span>
          </div>
          <div className="p-2 rounded-xl bg-white border border-navy/10">
            <span className="text-navy/60 block text-[11px]">Période propre T₀</span>
            <span className="font-mono font-bold text-navy">{T0.toFixed(2)} s</span>
          </div>
          <div className="p-2 rounded-xl bg-white border border-navy/10">
            <span className="text-navy/60 block text-[11px]">Vitesse max Vm</span>
            <span className="font-mono font-bold text-navy">{Vmax.toFixed(2)} m/s</span>
          </div>
          <div className="p-2 rounded-xl bg-white border border-navy/10">
            <span className="text-navy/60 block text-[11px]">Allongement Δl₀</span>
            <span className="font-mono font-bold text-emerald-700">{(deltaL0 * 100).toFixed(1)} cm</span>
          </div>
        </div>
      </div>
    </div>
  );
}
