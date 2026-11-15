'use client';

import React, { useState, useMemo } from 'react';

export default function P8RlcForceesInteractiveLab() {
  // Paramètres réglables par sliders
  const [inductanceMh, setInductanceMh] = useState<number>(100); // L en mH [10, 500]
  const [capaciteMicroF, setCapaciteMicroF] = useState<number>(4.7); // C en µF [0.5, 20]
  const [resistanceOhm, setResistanceOhm] = useState<number>(30); // R_t en Ohm [5, 200]
  const [frequenceHz, setFrequenceHz] = useState<number>(232); // Fréquence du GBF N en Hz [20, 1000]
  const [amplitudeTensionV, setAmplitudeTensionV] = useState<number>(10); // Um en V [2, 24]
  const [activeTab, setActiveTab] = useState<'oscilloscope' | 'fresnel' | 'resonance' | 'schema'>('oscilloscope');

  // Conversions SI
  const L = inductanceMh * 1e-3; // Henrys
  const C = capaciteMicroF * 1e-6; // Farads
  const Rt = resistanceOhm; // Ohms
  const Um = amplitudeTensionV; // Volts
  const Ueff = Um / Math.SQRT2; // Volts efficaces
  const N = frequenceHz; // Hz
  const omega = 2 * Math.PI * N; // rad/s

  // Fréquence et pulsation de résonance propre
  const omega0 = 1 / Math.sqrt(L * C); // rad/s
  const N0 = omega0 / (2 * Math.PI); // Hz

  // Impédance et réactances
  const Z_L = L * omega; // Impédance inductive (Ohms)
  const Z_C = 1 / (C * omega); // Impédance capacitive (Ohms)
  const reactance = Z_L - Z_C; // X = Lω - 1/(Cω)
  const Z = Math.sqrt(Rt * Rt + reactance * reactance); // Impédance totale Z

  // Intensités
  const Im = Um / Z; // Ampères max
  const Ieff = Ueff / Z; // Ampères efficaces
  const Im0 = Um / Rt; // Courant max à la résonance
  const Ieff0 = Ueff / Rt; // Courant efficace à la résonance

  // Déphasage phi = phi_u - phi_i
  const phiRad = Math.atan2(reactance, Rt); // [-pi/2, +pi/2]
  const phiDeg = (phiRad * 180) / Math.PI;

  // Facteur de puissance et puissance
  const cosPhi = Rt / Z;
  const Pactive = Ueff * Ieff * cosPhi; // Watts

  // Facteur de qualité et bande passante
  const Q = (L * omega0) / Rt;
  const deltaN = N0 / Q; // Hz
  const N1 = N0 * (Math.sqrt(1 + 1 / (4 * Q * Q)) - 1 / (2 * Q));
  const N2 = N0 * (Math.sqrt(1 + 1 / (4 * Q * Q)) + 1 / (2 * Q));

  // Tensions partielles efficaces
  const U_R_eff = Rt * Ieff;
  const U_L_eff = Z_L * Ieff;
  const U_C_eff = Z_C * Ieff;
  const surtensionRatio = U_C_eff / Ueff;

  // Nature du circuit
  const natureCircuit = useMemo<'inductif' | 'capacitif' | 'resonance'>(() => {
    if (Math.abs(N - N0) / N0 < 0.015) return 'resonance';
    if (N > N0) return 'inductif';
    return 'capacitif';
  }, [N, N0]);

  // Raccourcis pédagogiques
  const setPreset = (type: 'resonance' | 'inductif' | 'capacitif' | 'haute_acuite' | 'faible_acuite') => {
    if (type === 'resonance') {
      setFrequenceHz(Math.round(N0));
    } else if (type === 'inductif') {
      setFrequenceHz(Math.round(N0 * 1.5));
    } else if (type === 'capacitif') {
      setFrequenceHz(Math.max(20, Math.round(N0 * 0.65)));
    } else if (type === 'haute_acuite') {
      setResistanceOhm(10);
      setFrequenceHz(Math.round(N0));
    } else if (type === 'faible_acuite') {
      setResistanceOhm(120);
      setFrequenceHz(Math.round(N0));
    }
  };

  // Tracé des sinusoïdes pour l'oscilloscope
  // Afficher exactement 2,5 périodes du signal excitateur
  const T = 1 / N; // s
  const numWavePoints = 140;
  const wavePoints = useMemo(() => {
    const points: { t: number; u: number; ur: number }[] = [];
    const tMax = 2.5 * T;
    const dt = tMax / (numWavePoints - 1);
    for (let i = 0; i < numWavePoints; i++) {
      const t = i * dt;
      // u(t) = Um * cos(omega * t)
      const u = Um * Math.cos(omega * t);
      // i(t) = Im * cos(omega * t - phi) -> u_R(t) = Rt * i(t) = (Rt * Im) * cos(omega * t - phi)
      const ur = (Rt * Im) * Math.cos(omega * t - phiRad);
      points.push({ t, u, ur });
    }
    return points;
  }, [T, numWavePoints, Um, omega, Rt, Im, phiRad]);

  // Points SVG de la courbe de résonance I(N)
  const resonanceCurvePoints = useMemo(() => {
    const pts: { f: number; i: number }[] = [];
    const fMin = Math.max(10, N0 * 0.2);
    const fMax = N0 * 2.5;
    const step = (fMax - fMin) / 120;
    for (let f = fMin; f <= fMax; f += step) {
      const w = 2 * Math.PI * f;
      const xL = L * w;
      const xC = 1 / (C * w);
      const zCur = Math.sqrt(Rt * Rt + (xL - xC) * (xL - xC));
      const iCur = (Ueff / zCur) * 1000; // mA efficaces
      pts.push({ f, i: iCur });
    }
    return pts;
  }, [N0, L, C, Rt, Ueff]);

  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm my-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-2">
            <span>Laboratoire Interactif Virtuel Bac S2</span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Simulateur RLC Série Forcé : Fresnel, Oscilloscope & Résonance d&apos;Intensité
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Modifiez la fréquence du GBF, la résistance, la bobine et le condensateur pour visualiser le déphasage, l&apos;acuité de résonance et le phénomène de surtension.
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto">
          <button
            onClick={() => setPreset('resonance')}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors"
          >
            Résonance (N = N₀)
          </button>
          <button
            onClick={() => setPreset('inductif')}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors"
          >
            Inductif (N &gt; N₀)
          </button>
          <button
            onClick={() => setPreset('capacitif')}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
          >
            Capacitif (N &lt; N₀)
          </button>
          <button
            onClick={() => setPreset('haute_acuite')}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 transition-colors"
          >
            Pic Aigu (Q élevé)
          </button>
        </div>
      </div>

      {/* Sliders Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 my-6 bg-slate-50 p-4 rounded-xl border border-slate-200">
        {/* Frequence GBF */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium text-slate-700">
            <span>Fréquence GBF (N) :</span>
            <span className="font-mono font-bold text-indigo-600">{frequenceHz} Hz</span>
          </div>
          <input
            type="range"
            min={30}
            max={800}
            step={2}
            value={frequenceHz}
            onChange={(e) => setFrequenceHz(Number(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>30 Hz</span>
            <span className="text-rose-600 font-semibold">N₀ = {Math.round(N0)} Hz</span>
            <span>800 Hz</span>
          </div>
        </div>

        {/* Resistance Rt */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium text-slate-700">
            <span>Résistance (R_t) :</span>
            <span className="font-mono font-bold text-slate-900">{resistanceOhm} Ω</span>
          </div>
          <input
            type="range"
            min={5}
            max={150}
            step={5}
            value={resistanceOhm}
            onChange={(e) => setResistanceOhm(Number(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>5 Ω (Aigu)</span>
            <span>150 Ω (Flou)</span>
          </div>
        </div>

        {/* Inductance L */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium text-slate-700">
            <span>Inductance (L) :</span>
            <span className="font-mono font-bold text-slate-900">{inductanceMh} mH</span>
          </div>
          <input
            type="range"
            min={20}
            max={400}
            step={10}
            value={inductanceMh}
            onChange={(e) => setInductanceMh(Number(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>20 mH</span>
            <span>400 mH</span>
          </div>
        </div>

        {/* Capacite C */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium text-slate-700">
            <span>Capacité (C) :</span>
            <span className="font-mono font-bold text-slate-900">{capaciteMicroF} µF</span>
          </div>
          <input
            type="range"
            min={1}
            max={15}
            step={0.5}
            value={capaciteMicroF}
            onChange={(e) => setCapaciteMicroF(Number(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>1 µF</span>
            <span>15 µF</span>
          </div>
        </div>

        {/* Amplitude Um */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs font-medium text-slate-700">
            <span>Tension GBF (U_m) :</span>
            <span className="font-mono font-bold text-slate-900">{amplitudeTensionV} V</span>
          </div>
          <input
            type="range"
            min={2}
            max={20}
            step={1}
            value={amplitudeTensionV}
            onChange={(e) => setAmplitudeTensionV(Number(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400">
            <span>2 V</span>
            <span>U_eff = {(Ueff).toFixed(1)} V</span>
            <span>20 V</span>
          </div>
        </div>
      </div>

      {/* Physics KPI Dashboard */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
          <div className="text-[10px] uppercase font-bold text-slate-500">Impédance Z</div>
          <div className="text-base font-bold text-slate-900 font-mono mt-0.5">{Z.toFixed(1)} Ω</div>
          <div className="text-[10px] text-slate-400 mt-1">Z_min = {Rt} Ω</div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
          <div className="text-[10px] uppercase font-bold text-slate-500">Courant efficace I</div>
          <div className="text-base font-bold text-indigo-600 font-mono mt-0.5">{(Ieff * 1000).toFixed(1)} mA</div>
          <div className="text-[10px] text-slate-400 mt-1">I_max = {(Im * 1000).toFixed(1)} mA</div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
          <div className="text-[10px] uppercase font-bold text-slate-500">Déphasage φ = φ_u - φ_i</div>
          <div
            className={`text-base font-bold font-mono mt-0.5 ${
              natureCircuit === 'inductif'
                ? 'text-indigo-600'
                : natureCircuit === 'capacitif'
                ? 'text-emerald-600'
                : 'text-rose-600'
            }`}
          >
            {phiDeg >= 0 ? `+${phiDeg.toFixed(1)}°` : `${phiDeg.toFixed(1)}°`}
          </div>
          <div className="text-[10px] font-semibold uppercase mt-1">
            {natureCircuit === 'inductif' ? (
              <span className="text-indigo-600">Inductif (u avance)</span>
            ) : natureCircuit === 'capacitif' ? (
              <span className="text-emerald-600">Capacitif (u retard)</span>
            ) : (
              <span className="text-rose-600 font-bold">Résonance (en phase)</span>
            )}
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
          <div className="text-[10px] uppercase font-bold text-slate-500">Facteur de Puissance</div>
          <div className="text-base font-bold text-slate-900 font-mono mt-0.5">cos φ = {cosPhi.toFixed(3)}</div>
          <div className="text-[10px] text-slate-400 mt-1">P = {(Pactive * 1000).toFixed(1)} mW</div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
          <div className="text-[10px] uppercase font-bold text-slate-500">Qualité Q & Bande</div>
          <div className="text-base font-bold text-purple-700 font-mono mt-0.5">Q = {Q.toFixed(2)}</div>
          <div className="text-[10px] text-slate-400 mt-1">ΔN = {deltaN.toFixed(1)} Hz</div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3">
          <div className="text-[10px] uppercase font-bold text-slate-500">Tension Condensateur</div>
          <div
            className={`text-base font-bold font-mono mt-0.5 ${
              surtensionRatio > 1.2 ? 'text-rose-600' : 'text-slate-900'
            }`}
          >
            {U_C_eff.toFixed(1)} V eff
          </div>
          <div className="text-[10px] font-medium text-slate-500 mt-1">
            Ratio = {surtensionRatio.toFixed(2)} × U
          </div>
        </div>
      </div>

      {/* Navigation Tabs for Visualization */}
      <div className="flex border-b border-slate-200 gap-2 mb-4 overflow-x-auto">
        <button
          onClick={() => setActiveTab('oscilloscope')}
          className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold transition-all border-b-2 whitespace-nowrap ${
            activeTab === 'oscilloscope'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Oscilloscope Bi-courbe (u et i)
        </button>
        <button
          onClick={() => setActiveTab('fresnel')}
          className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold transition-all border-b-2 whitespace-nowrap ${
            activeTab === 'fresnel'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Diagramme de Fresnel Vectoriel
        </button>
        <button
          onClick={() => setActiveTab('resonance')}
          className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold transition-all border-b-2 whitespace-nowrap ${
            activeTab === 'resonance'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Courbe de Résonance I(N)
        </button>
        <button
          onClick={() => setActiveTab('schema')}
          className={`pb-2.5 px-3 text-xs sm:text-sm font-semibold transition-all border-b-2 whitespace-nowrap ${
            activeTab === 'schema'
              ? 'border-indigo-600 text-indigo-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          Schéma &amp; Branchement Oscillo
        </button>
      </div>

      {/* Visual Canvas Content */}
      <div className="bg-slate-900 rounded-2xl p-4 text-white border border-slate-800 min-h-[380px] flex flex-col justify-center">
        {/* TAB 1 : OSCILLOSCOPE */}
        {activeTab === 'oscilloscope' && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between text-xs border-b border-slate-800 pb-2">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-amber-400 font-semibold font-mono">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
                  Voie 1 : u(t) [GBF]
                </span>
                <span className="flex items-center gap-1.5 text-cyan-400 font-semibold font-mono">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block"></span>
                  Voie 2 : u_R(t) = R·i(t) [Image du courant]
                </span>
              </div>
              <div className="font-mono text-slate-400 text-[11px]">
                Base de temps : {(T * 1000).toFixed(2)} ms/cycle • Décalage Δt : {((Math.abs(phiRad) / (2 * Math.PI)) * T * 1000).toFixed(2)} ms
              </div>
            </div>

            {/* SVG Oscilloscope Screen */}
            <div className="relative w-full h-[300px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
              <svg className="w-full h-full" viewBox="0 0 600 280" preserveAspectRatio="none">
                <defs>
                  {/* Grille d'oscilloscope */}
                  <pattern id="oscGridP8" width="60" height="28" patternUnits="userSpaceOnUse">
                    <path d="M 60 0 L 0 0 0 28" fill="none" stroke="#1e293b" strokeWidth="0.8" />
                  </pattern>
                </defs>

                <rect width="600" height="280" fill="url(#oscGridP8)" />

                {/* Axes centraux de réticule */}
                <line x1="0" y1="140" x2="600" y2="140" stroke="#334155" strokeWidth="1.2" strokeDasharray="3 3" />
                <line x1="300" y1="0" x2="300" y2="280" stroke="#334155" strokeWidth="1.2" strokeDasharray="3 3" />

                {/* Subdivisions centrales (réticule de mesure) */}
                {Array.from({ length: 20 }).map((_, idx) => (
                  <line key={`x-${idx}`} x1={idx * 30} y1="137" x2={idx * 30} y2="143" stroke="#475569" strokeWidth="1" />
                ))}

                {/* Trace 1 : u(t) - Jaune */}
                <path
                  d={wavePoints
                    .map((p, idx) => {
                      const x = (idx / (wavePoints.length - 1)) * 600;
                      // Échelle : Um max = 24 V -> 110 px de déviation max
                      const y = 140 - (p.u / 24) * 110;
                      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="2.5"
                />

                {/* Trace 2 : u_R(t) = R * i(t) - Cyan */}
                <path
                  d={wavePoints
                    .map((p, idx) => {
                      const x = (idx / (wavePoints.length - 1)) * 600;
                      // Normaliser u_R pour une visibilité optimale sur l'écran
                      const urNorm = (p.ur / 24) * 110;
                      const y = 140 - urNorm;
                      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                    })
                    .join(' ')}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                />
              </svg>

              {/* Badges d'information sur l'écran */}
              <div className="absolute bottom-2 left-3 text-[11px] font-mono text-slate-400 bg-slate-900/80 px-2 py-1 rounded border border-slate-800">
                Déphasage mesuré : φ = {phiDeg >= 0 ? `+${phiDeg.toFixed(1)}°` : `${phiDeg.toFixed(1)}°`} (
                {natureCircuit === 'inductif' ? 'u en avance sur i' : natureCircuit === 'capacitif' ? 'u en retard sur i' : 'en phase'}
                )
              </div>
            </div>
          </div>
        )}

        {/* TAB 2 : FRESNEL */}
        {activeTab === 'fresnel' && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between text-xs border-b border-slate-800 pb-2">
              <span className="text-slate-300 font-semibold">
                Construction de Fresnel : Vecteurs associés aux tensions partielles
              </span>
              <div className="font-mono text-indigo-300 text-[11px]">
                Vecteur U = U_R + U_L + U_C • Amplitude U_m = {Um.toFixed(1)} V
              </div>
            </div>

            {/* SVG Fresnel Construction */}
            <div className="relative w-full h-[300px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center">
              <svg className="w-full h-full" viewBox="-250 -140 500 280">
                {/* Axes cartésiens */}
                <line x1="-240" y1="0" x2="240" y2="0" stroke="#334155" strokeWidth="1" />
                <line x1="0" y1="-130" x2="0" y2="130" stroke="#334155" strokeWidth="1" />
                <text x="235" y="-5" fill="#64748b" fontSize="10" fontFamily="monospace">Axe de i</text>
                <text x="5" y="-120" fill="#64748b" fontSize="10" fontFamily="monospace">+π/2</text>
                <text x="5" y="125" fill="#64748b" fontSize="10" fontFamily="monospace">-π/2</text>

                {/* Échelle graphique des vecteurs */}
                {(() => {
                  const scale = 140 / (Um * 1.5 || 15);
                  const vRx = (Rt * Im) * scale;
                  const vLy = -(L * omega * Im) * scale; // vers le haut (y négatif en SVG)
                  const vCy = (1 / (C * omega) * Im) * scale; // vers le bas (y positif en SVG)
                  const totalY = vLy + vCy; // réactance résultante

                  return (
                    <g>
                      {/* Vecteur U_R (Horizontal Cyan) */}
                      <line
                        x1="0"
                        y1="0"
                        x2={vRx}
                        y2="0"
                        stroke="#38bdf8"
                        strokeWidth="3.5"
                        markerEnd="url(#arrowCyan)"
                      />
                      <text x={vRx / 2 - 10} y="15" fill="#38bdf8" fontSize="11" fontWeight="bold">
                        U_R = {(Rt * Im).toFixed(1)} V
                      </text>

                      {/* Vecteur U_L (Vers le haut Violet) */}
                      <line
                        x1={vRx}
                        y1="0"
                        x2={vRx}
                        y2={vLy}
                        stroke="#a855f7"
                        strokeWidth="3"
                        strokeDasharray="2 2"
                      />
                      <text x={vRx + 6} y={vLy / 2} fill="#a855f7" fontSize="10">
                        U_L = {(L * omega * Im).toFixed(1)} V
                      </text>

                      {/* Vecteur U_C (Vers le bas Vert) */}
                      <line
                        x1={vRx}
                        y1={vLy}
                        x2={vRx}
                        y2={totalY}
                        stroke="#10b981"
                        strokeWidth="3"
                        strokeDasharray="2 2"
                      />
                      <text x={vRx + 6} y={(vLy + totalY) / 2} fill="#10b981" fontSize="10">
                        U_C = {((1 / (C * omega)) * Im).toFixed(1)} V
                      </text>

                      {/* Vecteur U Résultant (Jaune) */}
                      <line
                        x1="0"
                        y1="0"
                        x2={vRx}
                        y2={totalY}
                        stroke="#fbbf24"
                        strokeWidth="3.5"
                      />
                      <circle cx={vRx} cy={totalY} r="4" fill="#fbbf24" />

                      {/* Arc de déphasage phi */}
                      <path
                        d={`M 35 0 A 35 35 0 0 ${totalY > 0 ? 1 : 0} ${35 * Math.cos(phiRad)} ${-35 * Math.sin(phiRad)}`}
                        fill="none"
                        stroke="#fbbf24"
                        strokeWidth="1.5"
                        strokeDasharray="3 2"
                      />
                      <text
                        x={45 * Math.cos(phiRad / 2)}
                        y={-45 * Math.sin(phiRad / 2) + 4}
                        fill="#fbbf24"
                        fontSize="11"
                        fontWeight="bold"
                      >
                        φ = {phiDeg >= 0 ? `+${phiDeg.toFixed(1)}°` : `${phiDeg.toFixed(1)}°`}
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>
        )}

        {/* TAB 3 : RESONANCE CURVE */}
        {activeTab === 'resonance' && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between text-xs border-b border-slate-800 pb-2">
              <span className="text-slate-300 font-semibold">
                Courbe de Résonance d&apos;Intensité I_eff en fonction de la Fréquence N
              </span>
              <div className="font-mono text-rose-400 text-[11px]">
                Pic à N₀ = {Math.round(N0)} Hz • I₀ = {(Ieff0 * 1000).toFixed(1)} mA • Q = {Q.toFixed(2)}
              </div>
            </div>

            {/* SVG Resonance Plot */}
            <div className="relative w-full h-[300px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 p-2">
              <svg className="w-full h-full" viewBox="0 0 560 260">
                {/* Axes */}
                <line x1="50" y1="220" x2="540" y2="220" stroke="#475569" strokeWidth="1.2" />
                <line x1="50" y1="20" x2="50" y2="220" stroke="#475569" strokeWidth="1.2" />
                <text x="500" y="240" fill="#94a3b8" fontSize="10" fontFamily="monospace">Fréquence N (Hz)</text>
                <text x="20" y="25" fill="#94a3b8" fontSize="10" fontFamily="monospace">I_eff (mA)</text>

                {(() => {
                  const fMin = Math.max(10, N0 * 0.2);
                  const fMax = N0 * 2.5;
                  const iMax = Ieff0 * 1000 * 1.15 || 100;

                  const mapX = (f: number) => 50 + ((f - fMin) / (fMax - fMin)) * 480;
                  const mapY = (i: number) => 220 - (i / iMax) * 190;

                  // Ligne horizontale I0 / sqrt(2) pour la bande passante
                  const iCutoff = (Ieff0 * 1000) / Math.SQRT2;
                  const yCutoff = mapY(iCutoff);

                  return (
                    <g>
                      {/* Bande passante délimitée */}
                      <line x1="50" y1={yCutoff} x2="530" y2={yCutoff} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
                      <text x="55" y={yCutoff - 5} fill="#cbd5e1" fontSize="9">
                        I₀ / √2 = {iCutoff.toFixed(1)} mA (-3 dB)
                      </text>

                      {/* Lignes verticales N1 et N2 */}
                      {N1 >= fMin && N1 <= fMax && (
                        <line x1={mapX(N1)} y1={yCutoff} x2={mapX(N1)} y2="220" stroke="#a855f7" strokeWidth="1" strokeDasharray="2 2" />
                      )}
                      {N2 >= fMin && N2 <= fMax && (
                        <line x1={mapX(N2)} y1={yCutoff} x2={mapX(N2)} y2="220" stroke="#a855f7" strokeWidth="1" strokeDasharray="2 2" />
                      )}

                      {/* Courbe de résonance */}
                      <path
                        d={resonanceCurvePoints
                          .map((p, idx) => {
                            const x = mapX(p.f);
                            const y = mapY(p.i);
                            return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
                          })
                          .join(' ')}
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth="2.8"
                      />

                      {/* Point de fonctionnement actuel */}
                      <circle
                        cx={mapX(N)}
                        cy={mapY(Ieff * 1000)}
                        r="6"
                        fill="#38bdf8"
                        stroke="#ffffff"
                        strokeWidth="2"
                      />
                      <line
                        x1={mapX(N)}
                        y1={mapY(Ieff * 1000)}
                        x2={mapX(N)}
                        y2="220"
                        stroke="#38bdf8"
                        strokeWidth="1.2"
                        strokeDasharray="2 2"
                      />
                      <text
                        x={mapX(N) - 25}
                        y={mapY(Ieff * 1000) - 10}
                        fill="#38bdf8"
                        fontSize="10"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        N = {N} Hz
                      </text>
                    </g>
                  );
                })()}
              </svg>
            </div>
          </div>
        )}

        {/* TAB 4 : SCHEMA ELECTRIQUE */}
        {activeTab === 'schema' && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between text-xs border-b border-slate-800 pb-2">
              <span className="text-slate-300 font-semibold">
                Montage Expérimental Officiel & Branchements de l&apos;Oscilloscope Bi-courbe
              </span>
              <div className="font-mono text-emerald-400 text-[11px]">
                Voie 1 sur GBF • Voie 2 sur Résistor R (Masse commune au point milieu)
              </div>
            </div>

            {/* SVG Circuit Schematic */}
            <div className="relative w-full h-[300px] bg-slate-950 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center p-4">
              <svg className="w-full h-full max-w-[540px]" viewBox="0 0 540 240">
                {/* Boucle principale du circuit */}
                <rect x="70" y="50" width="400" height="140" fill="none" stroke="#64748b" strokeWidth="2.5" rx="8" />

                {/* Générateur GBF à gauche */}
                <circle cx="70" cy="120" r="22" fill="#0f172a" stroke="#fbbf24" strokeWidth="2.5" />
                <path d="M 58 120 Q 64 110, 70 120 T 82 120" fill="none" stroke="#fbbf24" strokeWidth="2" />
                <text x="35" y="125" fill="#fbbf24" fontSize="11" fontWeight="bold">GBF</text>

                {/* Résistor R en haut */}
                <rect x="150" y="40" width="60" height="20" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
                <text x="175" y="54" fill="#38bdf8" fontSize="10" fontWeight="bold">R</text>

                {/* Point de masse M entre le résistor et la bobine */}
                <circle cx="250" cy="50" r="4" fill="#ffffff" />
                <line x1="250" y1="50" x2="250" y2="25" stroke="#ffffff" strokeWidth="1.5" />
                <line x1="242" y1="25" x2="258" y2="25" stroke="#ffffff" strokeWidth="2" />
                <line x1="245" y1="21" x2="255" y2="21" stroke="#ffffff" strokeWidth="1.5" />
                <line x1="248" y1="17" x2="252" y2="17" stroke="#ffffff" strokeWidth="1" />
                <text x="260" y="25" fill="#ffffff" fontSize="10" fontWeight="bold">Masse ⏚</text>

                {/* Bobine (L, r) en haut à droite */}
                <path d="M 285 50 Q 295 38 305 50 Q 315 38 325 50 Q 335 38 345 50" fill="none" stroke="#a855f7" strokeWidth="2.5" />
                <text x="305" y="32" fill="#a855f7" fontSize="10" fontWeight="bold">(L, r)</text>

                {/* Condensateur C à droite */}
                <line x1="470" y1="105" x2="470" y2="135" stroke="#64748b" strokeWidth="2.5" />
                <line x1="460" y1="113" x2="480" y2="113" stroke="#10b981" strokeWidth="3" />
                <line x1="460" y1="127" x2="480" y2="127" stroke="#10b981" strokeWidth="3" />
                <text x="490" y="124" fill="#10b981" fontSize="11" fontWeight="bold">C</text>

                {/* Connexions Oscilloscope */}
                {/* Voie 1 (Y_A) connectée à l'entrée du GBF */}
                <circle cx="110" cy="50" r="4" fill="#fbbf24" />
                <path d="M 110 50 L 110 90 L 140 90" fill="none" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="3 2" />
                <rect x="140" y="80" width="55" height="20" rx="4" fill="#fbbf24" />
                <text x="148" y="94" fill="#0f172a" fontSize="10" fontWeight="bold">Voie 1 (Y₁)</text>

                {/* Voie 2 (Y_B) connectée avant le résistor */}
                <circle cx="215" cy="50" r="4" fill="#38bdf8" />
                <path d="M 215 50 L 215 90 L 250 90" fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="3 2" />
                <rect x="250" y="80" width="70" height="20" rx="4" fill="#38bdf8" />
                <text x="256" y="94" fill="#0f172a" fontSize="10" fontWeight="bold">Voie 2 (INV Y₂)</text>

                {/* Note pédagogique d'inversion */}
                <rect x="110" y="165" width="320" height="40" rx="6" fill="#1e293b" stroke="#334155" />
                <text x="120" y="182" fill="#e2e8f0" fontSize="9">
                  Règle Bac S2 : Le courant entre par la borne du résistor opposée à la masse.
                </text>
                <text x="120" y="196" fill="#38bdf8" fontSize="9" fontWeight="bold">
                  Il faut activer le bouton INVERT de la Voie 2 pour observer u_R(t) dans le bon sens !
                </text>
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Experimental Observation Takeaway */}
      <div className="mt-4 p-4 rounded-xl bg-indigo-50/70 border border-indigo-200 text-xs text-indigo-950">
        <div>
          <span className="font-bold text-indigo-900 block mb-0.5">
            Interprétation Physique pour l&apos;Épreuve du Bac S2 :
          </span>
          À la fréquence de résonance N₀ = 1/(2π√(LC)) ≈{' '}
          <span className="font-mono font-bold text-indigo-700">{Math.round(N0)} Hz</span>,
          les effets réactifs de la bobine et du condensateur se compensent rigoureusement (Lω = 1/(Cω)).
          L&apos;impédance totale Z devient minimale et égale à la résistance totale R_t = {Rt} Ω,
          conférant à l&apos;intensité son maximum I₀ = U/R_t.
          Le circuit est alors en phase (φ = 0, cos φ = 1) et absorbe la puissance active maximale.
        </div>
      </div>
    </section>
  );
}
