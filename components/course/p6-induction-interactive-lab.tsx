'use client';

import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Sliders,
  Zap,
  Activity,
  Magnet,
  Compass,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

export default function P6InductionInteractiveLab() {
  const [activeTab, setActiveTab] = useState<'laplace' | 'lenz' | 'rl'>('laplace');

  // Paramètres Rails de Laplace
  const [fieldB, setFieldB] = useState<number>(0.5); // en Tesla
  const [rodLength, setRodLength] = useState<number>(0.2); // 20 cm = 0.2 m
  const [rodVelocity, setRodVelocity] = useState<number>(2.0); // 2 m/s
  const [circuitResist, setCircuitResist] = useState<number>(5.0); // 5 Ohms

  // Paramètres Dipôle RL
  const [genVoltE, setGenVoltE] = useState<number>(10); // 10 V
  const [resistorR, setResistorR] = useState<number>(50); // 50 Ohms
  const [inductanceL, setInductanceL] = useState<number>(0.25); // 0.25 H (250 mH)

  // Paramètres Aimant & Bobine (Lenz)
  const [magnetDistance, setMagnetDistance] = useState<number>(120); // px
  const [approachDir, setApproachDir] = useState<'approaching' | 'receding'>('approaching');
  const [magnetPole, setMagnetPole] = useState<'North' | 'South'>('North');

  // Animation générale
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [simTime, setSimTime] = useState<number>(0);

  // Calculs dérivés Laplace
  const femInduite = fieldB * rodLength * rodVelocity; // |e| = B l v en Volts
  const courantInduit = femInduite / circuitResist; // i en Ampères
  const forceLaplace = courantInduit * rodLength * fieldB; // F_L = i l B en Newtons
  const puissanceElectrique = femInduite * courantInduit; // P = e i en Watts

  // Calculs dérivés Dipôle RL
  const tauRL = inductanceL / resistorR; // tau = L / R en secondes
  const courantMaxI0 = genVoltE / resistorR; // I0 = E / R en Ampères
  const energieMagMax = 0.5 * inductanceL * courantMaxI0 * courantMaxI0; // 1/2 L I0^2 en Joules

  // Boucle d'animation
  useEffect(() => {
    let animId: number;
    let lastStamp: number | null = null;

    const loop = (timestamp: number) => {
      if (!lastStamp) lastStamp = timestamp;
      const dt = (timestamp - lastStamp) / 1000;
      lastStamp = timestamp;

      if (isPlaying) {
        setSimTime(prev => (prev + dt) % 15);
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

  return (
    <div className="bg-white rounded-3xl border border-navy/10 p-6 md:p-8 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-navy/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-xs font-semibold text-amber-900 mb-2">
            <Zap className="w-3.5 h-3.5 text-amber-700" />
            <span>Laboratoire Virtuel d&apos;Électromagnétisme • Physique S2</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-navy">
            Simulateur d&apos;Induction &amp; Réponse Transitoire RL
          </h2>
          <p className="text-sm text-navy/70 mt-1">
            Visualisez la force de freinage de Laplace, la règle de Lenz et l&apos;évolution temporelle de i(t)
          </p>
        </div>

        {/* Boutons d'onglet */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl border border-navy/5 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('laplace')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'laplace'
                ? 'bg-navy text-white shadow-sm'
                : 'text-navy/70 hover:text-navy'
            }`}
          >
            Rails de Laplace
          </button>
          <button
            onClick={() => setActiveTab('lenz')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'lenz'
                ? 'bg-navy text-white shadow-sm'
                : 'text-navy/70 hover:text-navy'
            }`}
          >
            Aimant &amp; Loi de Lenz
          </button>
          <button
            onClick={() => setActiveTab('rl')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'rl'
                ? 'bg-navy text-white shadow-sm'
                : 'text-navy/70 hover:text-navy'
            }`}
          >
            Dipôle RL (Oscilloscope)
          </button>
        </div>
      </div>

      {/* Zone Graphique SVG Principal */}
      <div className="rounded-2xl border border-navy/10 bg-slate-900 overflow-hidden shadow-inner p-4 text-white">
        {activeTab === 'laplace' && (
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2 px-2">
              <span className="font-semibold text-slate-200">
                Rails de Laplace Horizontaux : Induction par mouvement dans un champ uniforme B entrant
              </span>
              <span className="font-mono text-amber-400">
                e = -B l v = -{femInduite.toFixed(2)} V | i = {courantInduit.toFixed(3)} A
              </span>
            </div>

            {/* Schéma SVG Vectoriel des Rails de Laplace */}
            <svg viewBox="0 0 520 200" className="w-full h-52 bg-slate-950 rounded-xl">
              {/* Rails horizontaux */}
              <line x1="60" y1="50" x2="480" y2="50" stroke="#94a3b8" strokeWidth="4" />
              <line x1="60" y1="150" x2="480" y2="150" stroke="#94a3b8" strokeWidth="4" />

              {/* Résistance fermant le circuit à gauche */}
              <line x1="60" y1="50" x2="60" y2="80" stroke="#94a3b8" strokeWidth="3" />
              <rect x="48" y="80" width="24" height="40" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" rx="3" />
              <text x="60" y="104" fill="#f59e0b" fontSize="10" textAnchor="middle" fontWeight="bold">R</text>
              <line x1="60" y1="120" x2="60" y2="150" stroke="#94a3b8" strokeWidth="3" />

              {/* Champ magnétique B uniforme entrant (croix cerclées ⊗) */}
              {Array.from({ length: 6 }).map((_, col) =>
                Array.from({ length: 3 }).map((_, row) => (
                  <g key={`${col}-${row}`} transform={`translate(${110 + col * 60}, ${65 + row * 35})`}>
                    <circle cx="0" cy="0" r="7" fill="none" stroke="#38bdf8" strokeWidth="1" opacity="0.6" />
                    <line x1="-4" y1="-4" x2="4" y2="4" stroke="#38bdf8" strokeWidth="1" opacity="0.8" />
                    <line x1="4" y1="-4" x2="-4" y2="4" stroke="#38bdf8" strokeWidth="1" opacity="0.8" />
                  </g>
                ))
              )}
              <text x="470" y="35" fill="#38bdf8" fontSize="10" fontWeight="bold">B (entrant)</text>

              {/* Position de la tige mobile (animée ou statique) */}
              {(() => {
                const rodPosX = 180 + ((simTime * rodVelocity * 30) % 240);
                return (
                  <g>
                    {/* Tige mobile MN */}
                    <line
                      x1={rodPosX}
                      y1="35"
                      x2={rodPosX}
                      y2="165"
                      stroke="#00c4b4"
                      strokeWidth="7"
                      strokeLinecap="round"
                    />
                    <circle cx={rodPosX} cy="40" r="4" fill="#ffffff" />
                    <text x={rodPosX - 12} y="38" fill="#ffffff" fontSize="10" fontWeight="bold">M</text>
                    <circle cx={rodPosX} cy="160" r="4" fill="#ffffff" />
                    <text x={rodPosX - 12} y="172" fill="#ffffff" fontSize="10" fontWeight="bold">N</text>

                    {/* Flèche de vitesse v vers la droite */}
                    <line x1={rodPosX} y1="100" x2={rodPosX + 50} y2="100" stroke="#00c4b4" strokeWidth="2.5" />
                    <polygon points={`${rodPosX + 55},100 ${rodPosX + 46},96 ${rodPosX + 46},104`} fill="#00c4b4" />
                    <text x={rodPosX + 30} y="92" fill="#00c4b4" fontSize="11" fontWeight="bold">v</text>

                    {/* Force de Laplace FL vers la gauche (freinage) */}
                    <line x1={rodPosX} y1="100" x2={rodPosX - 45} y2="100" stroke="#f43f5e" strokeWidth="2.5" />
                    <polygon points={`${rodPosX - 50},100 ${rodPosX - 41},96 ${rodPosX - 41},104`} fill="#f43f5e" />
                    <text x={rodPosX - 48} y="92" fill="#f43f5e" fontSize="11" fontWeight="bold">FL</text>

                    {/* Flèche de courant induit i dans la tige (de M vers N d'après Lenz) */}
                    <line x1={rodPosX} y1="75" x2={rodPosX} y2="125" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3 3" />
                    <polygon points={`${rodPosX},132 ${rodPosX - 4},122 ${rodPosX + 4},122`} fill="#fbbf24" />
                    <text x={rodPosX + 10} y="125" fill="#fbbf24" fontSize="10" fontWeight="bold">i induit</text>
                  </g>
                );
              })()}

              {/* Cote de longueur utile l */}
              <line x1="85" y1="50" x2="85" y2="150" stroke="#64748b" strokeWidth="1.5" />
              <polygon points="85,50 82,57 88,57" fill="#64748b" />
              <polygon points="85,150 82,143 88,143" fill="#64748b" />
              <text x="92" y="105" fill="#94a3b8" fontSize="10" fontWeight="bold">l = {(rodLength * 100).toFixed(0)} cm</text>
            </svg>
          </div>
        )}

        {activeTab === 'lenz' && (
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2 px-2">
              <span className="font-semibold text-slate-200">
                Approche d&apos;un Aimant Droit devant un Solénoïde (Loi de Lenz : Création d&apos;une Face Répulsive)
              </span>
              <span className="font-mono text-emerald-400">
                Lenz : B_induit s&apos;oppose à la variation du flux entrant
              </span>
            </div>

            {/* Schéma SVG Vectoriel de la Loi de Lenz */}
            <svg viewBox="0 0 520 200" className="w-full h-52 bg-slate-950 rounded-xl">
              {/* Aimant Droit */}
              <g transform="translate(100, 75)">
                {/* Pôle Nord (rouge) */}
                <rect x="0" y="0" width="55" height="36" fill="#ef4444" rx="3" />
                <text x="27" y="23" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">N</text>

                {/* Pôle Sud (bleu) */}
                <rect x="-55" y="0" width="55" height="36" fill="#3b82f6" rx="3" />
                <text x="-27" y="23" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle">S</text>

                {/* Flèche de mouvement vers la bobine */}
                <line x1="65" y1="18" x2="105" y2="18" stroke="#ffffff" strokeWidth="2" />
                <polygon points="110,18 102,14 102,22" fill="#ffffff" />
                <text x="85" y="10" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">Approche (v)</text>

                {/* Lignes de champ de l'aimant sortant du Nord */}
                <path d="M 55 18 C 110 5, 170 5, 230 18" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="180" y="32" fill="#ef4444" fontSize="10">B_aimant (sortant du pôle N)</text>
              </g>

              {/* Solénoïde (Bobine) */}
              <g transform="translate(340, 50)">
                {/* Noyau cylindrique transparent */}
                <rect x="0" y="10" width="120" height="70" fill="#1e293b" stroke="#475569" strokeWidth="1" rx="4" />

                {/* Spires hélicoïdales de la bobine */}
                {Array.from({ length: 6 }).map((_, i) => (
                  <ellipse
                    key={i}
                    cx={15 + i * 18}
                    cy="45"
                    rx="8"
                    ry="35"
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="3"
                  />
                ))}

                {/* Face d'entrée de la bobine (en face du pôle Nord) */}
                <text x="-15" y="49" fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="end">Face NORD induite</text>
                <text x="-15" y="63" fill="#94a3b8" fontSize="9" textAnchor="end">(Force répulsive de freinage)</text>

                {/* Champ induit Binduit orienté vers la gauche pour repousser */}
                <line x1="30" y1="45" x2="-45" y2="45" stroke="#10b981" strokeWidth="2.5" />
                <polygon points="-50,45 -42,41 -42,49" fill="#10b981" />
                <text x="-25" y="38" fill="#10b981" fontSize="10" fontWeight="bold">B_induit</text>

                {/* Circuit fermé avec galvanomètre / ampèremètre */}
                <path d="M 5 80 L 5 125 L 110 125 L 110 80" fill="none" stroke="#94a3b8" strokeWidth="2" />
                <circle cx="57" cy="125" r="16" fill="#0f172a" stroke="#00c4b4" strokeWidth="2" />
                <text x="57" y="129" fill="#00c4b4" fontSize="10" fontWeight="bold" textAnchor="middle">G (mA)</text>
                {/* Aiguille du galvanomètre déviée */}
                <line x1="57" y1="125" x2="67" y2="117" stroke="#f43f5e" strokeWidth="2" />
              </g>
            </svg>
          </div>
        )}

        {activeTab === 'rl' && (
          <div>
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2 px-2">
              <span className="font-semibold text-slate-200">
                Oscilloscope : Établissement du courant i(t) dans le dipôle RL sous échelon de tension E
              </span>
              <span className="font-mono text-emerald-400">
                τ = L/R = {(tauRL * 1000).toFixed(1)} ms | I₀ = E/R = {(courantMaxI0 * 1000).toFixed(0)} mA
              </span>
            </div>

            {/* Oscilloscope SVG Dynamique */}
            <svg viewBox="0 0 520 200" className="w-full h-52 bg-slate-950 rounded-xl">
              {/* Graticule d'oscilloscope (quadrillage vert discret) */}
              {Array.from({ length: 9 }).map((_, i) => (
                <line
                  key={`gx-${i}`}
                  x1={60 + i * 50}
                  y1="20"
                  x2={60 + i * 50}
                  y2="170"
                  stroke="#1e3a2f"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
              ))}
              {Array.from({ length: 5 }).map((_, i) => (
                <line
                  key={`gy-${i}`}
                  x1="60"
                  y1={30 + i * 35}
                  x2="460"
                  y2={30 + i * 35}
                  stroke="#1e3a2f"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
              ))}

              {/* Axes orthogonaux */}
              <line x1="60" y1="170" x2="480" y2="170" stroke="#64748b" strokeWidth="1.5" />
              <polygon points="485,170 477,166 477,174" fill="#64748b" />
              <text x="475" y="185" fill="#94a3b8" fontSize="10">t</text>

              <line x1="60" y1="170" x2="60" y2="15" stroke="#64748b" strokeWidth="1.5" />
              <polygon points="60,10 56,18 64,18" fill="#64748b" />
              <text x="25" y="20" fill="#94a3b8" fontSize="10">i(t), u(t)</text>

              {/* Asymptote horizontale I0 (ligne pointillée) */}
              <line x1="60" y1="50" x2="460" y2="50" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" />
              <text x="420" y="44" fill="#f59e0b" fontSize="10" fontWeight="bold">I₀ = E / R</text>

              {/* Tangente à l'origine coupant l'asymptote à t = tau */}
              {(() => {
                const tauCoordX = 60 + 80; // échelle : tau = 80px
                return (
                  <>
                    <line x1="60" y1="170" x2={tauCoordX} y2="50" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="2 2" />
                    <line x1={tauCoordX} y1="50" x2={tauCoordX} y2="170" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
                    <circle cx={tauCoordX} cy="50" r="3.5" fill="#38bdf8" />
                    <text x={tauCoordX} y="183" fill="#38bdf8" fontSize="10" fontWeight="bold" textAnchor="middle">τ = L/R</text>

                    {/* Niveau 0,63 I0 */}
                    <line x1="60" y1={170 - (170 - 50) * 0.632} x2={tauCoordX} y2={170 - (170 - 50) * 0.632} stroke="#10b981" strokeWidth="1" strokeDasharray="2 2" />
                    <text x="15" y={170 - (170 - 50) * 0.632 + 3} fill="#10b981" fontSize="9" fontWeight="bold">0,63 I₀</text>
                  </>
                );
              })()}

              {/* Courbe exponentielle i(t) = I0 (1 - e^(-t/tau)) */}
              {(() => {
                const points: string[] = [];
                for (let px = 60; px <= 460; px += 4) {
                  const tNorm = (px - 60) / 80; // t / tau
                  const iNorm = 1 - Math.exp(-tNorm);
                  const py = 170 - iNorm * (170 - 50);
                  points.push(`${px},${py}`);
                }
                return (
                  <polyline
                    fill="none"
                    stroke="#00c4b4"
                    strokeWidth="3"
                    strokeLinecap="round"
                    points={points.join(' ')}
                  />
                );
              })()}

              {/* Repère temporel à 5 tau (régime permanent établi à 99,3%) */}
              <line x1={60 + 5 * 80} y1="45" x2={60 + 5 * 80} y2="170" stroke="#94a3b8" strokeWidth="1" strokeDasharray="3 3" />
              <text x={60 + 5 * 80} y="183" fill="#94a3b8" fontSize="10" textAnchor="middle">5τ (Permanent)</text>
            </svg>
          </div>
        )}
      </div>

      {/* Barres d'Indicateurs Numériques */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-navy">f.é.m. induite |e|</span>
            <span className="font-mono font-bold text-amber-600">{femInduite.toFixed(2)} V</span>
          </div>
          <span className="text-[11px] text-navy/60 block">e = B · l · v (Rails de Laplace)</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-navy">Force de Laplace FL</span>
            <span className="font-mono font-bold text-rose-600">{(forceLaplace * 1000).toFixed(1)} mN</span>
          </div>
          <span className="text-[11px] text-navy/60 block">Action de freinage opposée à v</span>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="font-semibold text-navy">Constante de temps τ</span>
            <span className="font-mono font-bold text-emerald-700">{(tauRL * 1000).toFixed(1)} ms</span>
          </div>
          <span className="text-[11px] text-navy/60 block">τ = L / R (Établissement à 63%)</span>
        </div>
      </div>

      {/* Panneau de Contrôle & Sliders */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-navy/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold text-navy uppercase tracking-wider">
            <Sliders className="w-4 h-4 text-amber-600" />
            <span>Paramètres Modifiables du Circuit</span>
          </div>
          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-xl bg-white border border-navy/15 text-navy text-xs font-semibold hover:bg-navy/5 transition-all flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Réinitialiser</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
          {/* Champ B */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-navy/70">Champ B :</span>
              <span className="font-bold text-navy font-mono">{fieldB.toFixed(2)} T</span>
            </div>
            <input
              type="range"
              min="0.1"
              max="2.0"
              step="0.1"
              value={fieldB}
              onChange={e => setFieldB(parseFloat(e.target.value))}
              className="w-full accent-navy cursor-pointer"
            />
          </div>

          {/* Vitesse de la tige v */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-navy/70">Vitesse v :</span>
              <span className="font-bold text-navy font-mono">{rodVelocity.toFixed(1)} m/s</span>
            </div>
            <input
              type="range"
              min="0.5"
              max="5.0"
              step="0.5"
              value={rodVelocity}
              onChange={e => setRodVelocity(parseFloat(e.target.value))}
              className="w-full accent-navy cursor-pointer"
            />
          </div>

          {/* Inductance L */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-navy/70">Inductance L :</span>
              <span className="font-bold text-navy font-mono">{(inductanceL * 1000).toFixed(0)} mH</span>
            </div>
            <input
              type="range"
              min="0.05"
              max="1.0"
              step="0.05"
              value={inductanceL}
              onChange={e => setInductanceL(parseFloat(e.target.value))}
              className="w-full accent-navy cursor-pointer"
            />
          </div>

          {/* Résistance R */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-navy/70">Résistance R :</span>
              <span className="font-bold text-navy font-mono">{resistorR} Ω</span>
            </div>
            <input
              type="range"
              min="10"
              max="200"
              step="10"
              value={resistorR}
              onChange={e => setResistorR(parseFloat(e.target.value))}
              className="w-full accent-navy cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
