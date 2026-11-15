'use client';

import React, { useState, useMemo } from 'react';

export default function P7RlcLibresInteractiveLab() {
  // Paramètres réglables par sliders
  const [inductanceMh, setInductanceMh] = useState<number>(100); // L en mH [10, 500]
  const [capaciteMicroF, setCapaciteMicroF] = useState<number>(10); // C en µF [1, 50]
  const [resistanceOhm, setResistanceOhm] = useState<number>(20); // R en Ohm [0, 500]
  const [tensionInitialeV, setTensionInitialeV] = useState<number>(12); // E en V [2, 24]
  const [switchPosition, setSwitchPosition] = useState<'charge' | 'decharge'>('decharge');
  const [activeTab, setActiveTab] = useState<'oscilloscope' | 'energies' | 'schema' | 'analogie'>('oscilloscope');

  // Conversions SI
  const L = inductanceMh * 1e-3; // Henrys
  const C = capaciteMicroF * 1e-6; // Farads
  const R = resistanceOhm; // Ohms
  const E = tensionInitialeV; // Volts

  // Calculs fondamentaux
  const omega0 = 1 / Math.sqrt(L * C); // rad/s
  const T0 = (2 * Math.PI) / omega0; // s
  const f0 = 1 / T0; // Hz
  const Rc = 2 * Math.sqrt(L / C); // Résistance critique en Ohm
  const Qm = C * E; // Charge maximale initiale en Coulombs
  const Im0 = omega0 * Qm; // Courant max sans amortissement en Ampères
  const Et0 = 0.5 * C * E * E; // Énergie électrostatique initiale en Joules

  // Régime physique
  const regime = useMemo<'non_amorti' | 'pseudoperiodique' | 'critique' | 'aperiodique'>(() => {
    if (R === 0) return 'non_amorti';
    if (R < Rc * 0.98) return 'pseudoperiodique';
    if (Math.abs(R - Rc) <= Rc * 0.04) return 'critique';
    return 'aperiodique';
  }, [R, Rc]);

  // Pseudo-période et amortissement
  const gamma = R / (2 * L); // Facteur d'amortissement
  const omegaA = regime === 'pseudoperiodique' ? Math.sqrt(Math.max(0, omega0 * omega0 - gamma * gamma)) : omega0;
  const Tpseudo = regime === 'pseudoperiodique' ? (2 * Math.PI) / omegaA : T0;
  const decrementLog = regime === 'pseudoperiodique' ? gamma * Tpseudo : 0;

  // Raccourcis de sélection de régime
  const setPresetRegime = (type: 'non_amorti' | 'faible' | 'critique' | 'aperiodique') => {
    if (type === 'non_amorti') {
      setResistanceOhm(0);
    } else if (type === 'faible') {
      setResistanceOhm(Math.max(5, Math.round(Rc * 0.2)));
    } else if (type === 'critique') {
      setResistanceOhm(Math.round(Rc));
    } else if (type === 'aperiodique') {
      setResistanceOhm(Math.round(Rc * 2.5));
    }
  };

  // Génération des points d'échantillonnage pour le tracé u_C(t)
  const timeSpan = Math.max(3 * T0, 0.02); // Afficher au moins 3 à 4 périodes
  const numPoints = 180;
  const waveformPoints = useMemo(() => {
    const points: { t: number; uc: number; i: number; Ee: number; Em: number; Et: number }[] = [];
    for (let k = 0; k <= numPoints; k++) {
      const t = (k / numPoints) * timeSpan;
      let uc = 0;
      let i = 0;

      if (regime === 'non_amorti') {
        uc = E * Math.cos(omega0 * t);
        i = -C * E * omega0 * Math.sin(omega0 * t);
      } else if (regime === 'pseudoperiodique') {
        const env = Math.exp(-gamma * t);
        const phi = Math.atan(gamma / omegaA);
        uc = (E / Math.cos(phi)) * env * Math.cos(omegaA * t - phi);
        i = -(E / (L * omegaA)) * env * Math.sin(omegaA * t);
      } else if (regime === 'critique') {
        const env = Math.exp(-gamma * t);
        uc = E * (1 + gamma * t) * env;
        i = -(E / L) * t * env;
      } else {
        // Apériodique
        const beta = Math.sqrt(gamma * gamma - omega0 * omega0);
        const r1 = -gamma + beta;
        const r2 = -gamma - beta;
        const A1 = (E * r2) / (r2 - r1);
        const A2 = (-E * r1) / (r2 - r1);
        uc = A1 * Math.exp(r1 * t) + A2 * Math.exp(r2 * t);
        i = C * (A1 * r1 * Math.exp(r1 * t) + A2 * r2 * Math.exp(r2 * t));
      }

      const Ee = 0.5 * C * uc * uc;
      const Em = 0.5 * L * i * i;
      const Et = Ee + Em;

      points.push({ t, uc, i, Ee, Em, Et });
    }
    return points;
  }, [timeSpan, numPoints, regime, E, omega0, omegaA, gamma, C, L]);

  // Coordonnées SVG pour l'oscilloscope
  const svgWidth = 620;
  const svgHeight = 260;
  const midY = svgHeight / 2;
  const scaleY = (svgHeight * 0.4) / (E * 1.15);

  const pathUc = useMemo(() => {
    return waveformPoints
      .map((p, idx) => {
        const x = (p.t / timeSpan) * (svgWidth - 60) + 40;
        const y = midY - p.uc * scaleY;
        return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  }, [waveformPoints, timeSpan, scaleY, midY]);

  // Enveloppes exponentielles pour le régime pseudopériodique
  const pathEnvUpper = useMemo(() => {
    if (regime !== 'pseudoperiodique') return '';
    return waveformPoints
      .map((p, idx) => {
        const x = (p.t / timeSpan) * (svgWidth - 60) + 40;
        const env = E * Math.exp(-gamma * p.t);
        const y = midY - env * scaleY;
        return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  }, [waveformPoints, regime, timeSpan, scaleY, midY, gamma, E]);

  const pathEnvLower = useMemo(() => {
    if (regime !== 'pseudoperiodique') return '';
    return waveformPoints
      .map((p, idx) => {
        const x = (p.t / timeSpan) * (svgWidth - 60) + 40;
        const env = -E * Math.exp(-gamma * p.t);
        const y = midY - env * scaleY;
        return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  }, [waveformPoints, regime, timeSpan, scaleY, midY, gamma, E]);

  // Courbes énergétiques SVG
  const energyScaleY = (svgHeight * 0.75) / (Et0 * 1.1);
  const energyBaseY = svgHeight - 30;

  const pathEe = useMemo(() => {
    return waveformPoints
      .map((p, idx) => {
        const x = (p.t / timeSpan) * (svgWidth - 60) + 40;
        const y = energyBaseY - p.Ee * energyScaleY;
        return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  }, [waveformPoints, timeSpan, energyBaseY, energyScaleY]);

  const pathEm = useMemo(() => {
    return waveformPoints
      .map((p, idx) => {
        const x = (p.t / timeSpan) * (svgWidth - 60) + 40;
        const y = energyBaseY - p.Em * energyScaleY;
        return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  }, [waveformPoints, timeSpan, energyBaseY, energyScaleY]);

  const pathEt = useMemo(() => {
    return waveformPoints
      .map((p, idx) => {
        const x = (p.t / timeSpan) * (svgWidth - 60) + 40;
        const y = energyBaseY - p.Et * energyScaleY;
        return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  }, [waveformPoints, timeSpan, energyBaseY, energyScaleY]);

  return (
    <section className="bg-white rounded-3xl border border-navy/10 p-6 md:p-8 shadow-sm space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy/10 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-turquoise/10 text-navy border border-turquoise/30">
              Laboratoire Virtuel Interactif
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-navy/5 text-navy border border-navy/15">
              Circuit LC & RLC Série
            </span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-navy flex items-center gap-2.5">
            <span>Simulateur d’Oscillations Électriques Libres & Oscilloscope Virtuel</span>
          </h2>
          <p className="text-sm text-text/70 mt-1">
            Visualisez en direct l’influence de L, C et R sur la décharge d’un condensateur, les trois régimes d’amortissement, le décrément logarithmique et les transferts d’énergie.
          </p>
        </div>

        {/* Boutons de sélection rapide du régime */}
        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-center bg-surface/70 p-1.5 rounded-2xl border border-navy/10">
          <button
            onClick={() => setPresetRegime('non_amorti')}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
              regime === 'non_amorti'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-text/70 hover:text-navy hover:bg-white'
            }`}
          >
            Idéal (R = 0)
          </button>
          <button
            onClick={() => setPresetRegime('faible')}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
              regime === 'pseudoperiodique'
                ? 'bg-turquoise text-white shadow-xs'
                : 'text-text/70 hover:text-navy hover:bg-white'
            }`}
          >
            Pseudopériodique
          </button>
          <button
            onClick={() => setPresetRegime('critique')}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
              regime === 'critique'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-text/70 hover:text-navy hover:bg-white'
            }`}
          >
            Critique (R = Rc)
          </button>
          <button
            onClick={() => setPresetRegime('aperiodique')}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
              regime === 'aperiodique'
                ? 'bg-red-600 text-white shadow-xs'
                : 'text-text/70 hover:text-navy hover:bg-white'
            }`}
          >
            Apériodique
          </button>
        </div>
      </div>

      {/* Barre de navigation des vues */}
      <div className="flex flex-wrap items-center gap-2 border-b border-navy/10 pb-3">
        <button
          onClick={() => setActiveTab('oscilloscope')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'oscilloscope'
              ? 'bg-navy text-white shadow-xs'
              : 'bg-surface/50 text-navy hover:bg-surface border border-navy/10'
          }`}
        >
          <span>Oscilloscope Virtuel : u_C(t)</span>
        </button>

        <button
          onClick={() => setActiveTab('energies')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'energies'
              ? 'bg-navy text-white shadow-xs'
              : 'bg-surface/50 text-navy hover:bg-surface border border-navy/10'
          }`}
        >
          <span>Diagramme Énergétique : Ee, Em, Et</span>
        </button>

        <button
          onClick={() => setActiveTab('schema')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'schema'
              ? 'bg-navy text-white shadow-xs'
              : 'bg-surface/50 text-navy hover:bg-surface border border-navy/10'
          }`}
        >
          <span>Schéma Circuit RLC Série & Maille</span>
        </button>

        <button
          onClick={() => setActiveTab('analogie')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
            activeTab === 'analogie'
              ? 'bg-navy text-white shadow-xs'
              : 'bg-surface/50 text-navy hover:bg-surface border border-navy/10'
          }`}
        >
          <span>Analogie Mécanique-Électrique</span>
        </button>
      </div>

      {/* Zone d'affichage SVG interactif */}
      <div className="bg-slate-900 rounded-2xl p-4 md:p-6 text-white border border-slate-800 shadow-inner">
        {/* VUE 1 : Oscilloscope Virtuel */}
        {activeTab === 'oscilloscope' && (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2 gap-2">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-cyan-400 font-mono">
                  <span className="w-2.5 h-0.5 bg-cyan-400 inline-block" />
                  Voie CH1 : Tension condensateur u_C(t)
                </span>
                {regime === 'pseudoperiodique' && (
                  <span className="flex items-center gap-1.5 text-amber-400 font-mono text-[11px]">
                    <span className="w-2.5 h-0.5 bg-amber-400 border-t border-dashed inline-block" />
                    Enveloppe +/- E*exp(-gamma*t)
                  </span>
                )}
              </div>
              <div className="font-mono text-slate-300 text-right">
                Base de temps : {(timeSpan * 1000).toFixed(1)} ms pleine échelle | Échelle Y : +/- {E.toFixed(1)} V
              </div>
            </div>

            <div className="w-full overflow-x-auto">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto min-w-[540px]">
                {/* Grille oscilloscope */}
                <defs>
                  <pattern id="oscilloGrid" width="40" height="26" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 26" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.8" />
                  </pattern>
                </defs>
                <rect x="30" y="10" width={svgWidth - 50} height={svgHeight - 20} fill="#0a101d" rx="6" />
                <rect x="30" y="10" width={svgWidth - 50} height={svgHeight - 20} fill="url(#oscilloGrid)" rx="6" />

                {/* Axe horizontal t = 0 */}
                <line x1="30" y1={midY} x2={svgWidth - 20} y2={midY} stroke="#334155" strokeWidth="1.5" />
                {/* Axe vertical t */}
                <line x1="40" y1="10" x2="40" y2={svgHeight - 10} stroke="#334155" strokeWidth="1.5" />

                {/* Graduations Y (+E, 0, -E) */}
                <text x="35" y={midY - E * scaleY + 4} fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="end">
                  +{E}V
                </text>
                <text x="35" y={midY + 4} fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="end">
                  0V
                </text>
                <text x="35" y={midY + E * scaleY + 4} fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="end">
                  -{E}V
                </text>

                {/* Enveloppes exponentielles si pseudopériodique */}
                {pathEnvUpper && (
                  <path d={pathEnvUpper} fill="none" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="4 3" opacity="0.8" />
                )}
                {pathEnvLower && (
                  <path d={pathEnvLower} fill="none" stroke="#f59e0b" strokeWidth="1.2" strokeDasharray="4 3" opacity="0.8" />
                )}

                {/* Tracé principal u_C(t) */}
                <path d={pathUc} fill="none" stroke="#06b6d4" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                {/* Flèche indiquant la pseudo-période ou T0 si oscillant */}
                {regime !== 'aperiodique' && regime !== 'critique' && (
                  <g>
                    {/* Flèche T0/T entre 1er max et 2e max */}
                    <line
                      x1="40"
                      y1={midY - E * scaleY - 6}
                      x2={(Tpseudo / timeSpan) * (svgWidth - 60) + 40}
                      y2={midY - E * scaleY - 6}
                      stroke="#38bdf8"
                      strokeWidth="1.5"
                      markerStart="url(#arrowLeft)"
                      markerEnd="url(#arrowRight)"
                    />
                    <text
                      x={((Tpseudo / 2) / timeSpan) * (svgWidth - 60) + 40}
                      y={midY - E * scaleY - 10}
                      fill="#38bdf8"
                      fontSize="10"
                      fontFamily="monospace"
                      textAnchor="middle"
                      fontWeight="bold"
                    >
                      {regime === 'non_amorti' ? 'T₀' : 'T (pseudo-période)'} = {(Tpseudo * 1000).toFixed(2)} ms
                    </text>
                  </g>
                )}
              </svg>
            </div>
          </div>
        )}

        {/* VUE 2 : Diagramme Énergétique */}
        {activeTab === 'energies' && (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2 gap-2">
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <span className="w-3 h-1 bg-cyan-400 rounded-sm" />
                  E_e(t) = 1/2 C u_C² (Électrostatique)
                </span>
                <span className="flex items-center gap-1.5 text-amber-400">
                  <span className="w-3 h-1 bg-amber-400 rounded-sm" />
                  E_m(t) = 1/2 L i² (Magnétique)
                </span>
                <span className="flex items-center gap-1.5 text-white">
                  <span className="w-3 h-1 bg-white rounded-sm" />
                  E_t(t) = E_e + E_m (Totale)
                </span>
              </div>
              <div className="font-mono text-slate-300 text-right">
                Période énergétique T_E = T₀ / 2 = {((T0 / 2) * 1000).toFixed(2)} ms
              </div>
            </div>

            <div className="w-full overflow-x-auto">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto min-w-[540px]">
                <rect x="30" y="10" width={svgWidth - 50} height={svgHeight - 20} fill="#0a101d" rx="6" />

                {/* Axe horizontal 0 J */}
                <line x1="30" y1={energyBaseY} x2={svgWidth - 20} y2={energyBaseY} stroke="#334155" strokeWidth="1.5" />
                {/* Axe vertical */}
                <line x1="40" y1="10" x2="40" y2={energyBaseY} stroke="#334155" strokeWidth="1.5" />

                {/* Graduations Énergie */}
                <text x="35" y={energyBaseY - Et0 * energyScaleY + 4} fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="end">
                  {(Et0 * 1000).toFixed(1)} mJ
                </text>
                <text x="35" y={energyBaseY + 14} fill="#94a3b8" fontSize="10" fontFamily="monospace" textAnchor="end">
                  0
                </text>

                {/* Tracés énergétiques */}
                <path d={pathEe} fill="none" stroke="#06b6d4" strokeWidth="2" strokeDasharray="3 2" />
                <path d={pathEm} fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 2" />
                <path d={pathEt} fill="none" stroke="#ffffff" strokeWidth="2.5" />

                {/* Annotation T_E */}
                {regime === 'non_amorti' && (
                  <g>
                    <line
                      x1="40"
                      y1="25"
                      x2={((T0 / 2) / timeSpan) * (svgWidth - 60) + 40}
                      y2="25"
                      stroke="#a855f7"
                      strokeWidth="1.5"
                    />
                    <text
                      x={((T0 / 4) / timeSpan) * (svgWidth - 60) + 40}
                      y="20"
                      fill="#c084fc"
                      fontSize="10"
                      fontFamily="monospace"
                      textAnchor="middle"
                      fontWeight="bold"
                    >
                      T_E = T₀ / 2
                    </text>
                  </g>
                )}
              </svg>
            </div>
            <p className="text-[11px] text-slate-400 italic text-center">
              {regime === 'non_amorti'
                ? 'En régime idéal non amorti, l’énergie totale E_t est strictement constante. Les échanges entre C et L s’effectuent à la période double T_E = T₀ / 2.'
                : 'En régime amorti, la courbe blanche E_t(t) décroît continuellement. La pente négative dE/dt = -R_t i²(t) correspond à la puissance thermique dissipée par effet Joule.'}
            </p>
          </div>
        )}

        {/* VUE 3 : Schéma Vectoriel Illustratif du Circuit RLC Série */}
        {activeTab === 'schema' && (
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800 pb-2">
              <span className="font-bold text-slate-200">
                Schéma normalisé du circuit RLC série & Conventions récepteur
              </span>
              <div className="flex items-center gap-2">
                <span className="text-[11px]">Position commutateur K :</span>
                <button
                  onClick={() => setSwitchPosition('charge')}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    switchPosition === 'charge' ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Pos 1 : Charge sous E
                </button>
                <button
                  onClick={() => setSwitchPosition('decharge')}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                    switchPosition === 'decharge' ? 'bg-cyan-600 text-white' : 'bg-slate-800 text-slate-400'
                  }`}
                >
                  Pos 2 : Oscillations (L, C, R)
                </button>
              </div>
            </div>

            <div className="w-full overflow-x-auto py-2">
              <svg viewBox="0 0 620 220" className="w-full h-auto min-w-[540px]">
                {/* Maille Principale */}
                {/* Fil supérieur */}
                <line x1="80" y1="50" x2="220" y2="50" stroke="#94a3b8" strokeWidth="2" />
                {/* Commutateur K */}
                <circle cx="220" cy="50" r="4" fill="#38bdf8" />
                <text x="215" y="40" fill="#38bdf8" fontSize="11" fontWeight="bold">K</text>
                <circle cx="260" cy="30" r="3" fill="#cbd5e1" />
                <text x="268" y="32" fill="#cbd5e1" fontSize="10">(1)</text>
                <circle cx="260" cy="70" r="3" fill="#cbd5e1" />
                <text x="268" y="75" fill="#cbd5e1" fontSize="10">(2)</text>
                {/* Couteau du commutateur */}
                {switchPosition === 'charge' ? (
                  <line x1="220" y1="50" x2="258" y2="32" stroke="#f59e0b" strokeWidth="2.5" />
                ) : (
                  <line x1="220" y1="50" x2="258" y2="68" stroke="#06b6d4" strokeWidth="2.5" />
                )}

                {/* Branche (1) : Générateur de charge continue E */}
                <line x1="260" y1="30" x2="320" y2="30" stroke="#94a3b8" strokeWidth="2" />
                <line x1="320" y1="30" x2="320" y2="60" stroke="#94a3b8" strokeWidth="2" />
                {/* Symbole générateur E */}
                <circle cx="320" cy="85" r="16" fill="#1e293b" stroke="#f59e0b" strokeWidth="2" />
                <line x1="320" y1="76" x2="320" y2="94" stroke="#f59e0b" strokeWidth="2" />
                <line x1="313" y1="85" x2="327" y2="85" stroke="#f59e0b" strokeWidth="2" />
                <text x="345" y="90" fill="#f59e0b" fontSize="12" fontWeight="bold">E = {E} V</text>
                <line x1="320" y1="101" x2="320" y2="170" stroke="#94a3b8" strokeWidth="2" />

                {/* Branche (2) : Circuit oscillant RLC */}
                <line x1="260" y1="70" x2="380" y2="70" stroke="#94a3b8" strokeWidth="2" />

                {/* Résistance R */}
                <rect x="380" y="60" width="50" height="20" fill="#1e293b" stroke="#ef4444" strokeWidth="2" rx="2" />
                <text x="396" y="74" fill="#ef4444" fontSize="11" fontWeight="bold">R</text>
                <text x="388" y="94" fill="#94a3b8" fontSize="10">{R} Ω</text>
                {/* Flèche tension u_R */}
                <line x1="430" y1="52" x2="380" y2="52" stroke="#ef4444" strokeWidth="1.5" />
                <text x="400" y="47" fill="#ef4444" fontSize="10">u_R</text>

                {/* Fil vers Bobine L */}
                <line x1="430" y1="70" x2="470" y2="70" stroke="#94a3b8" strokeWidth="2" />

                {/* Bobine L, r (spires) */}
                <path d="M 470 70 Q 480 50, 490 70 Q 500 50, 510 70 Q 520 50, 530 70" fill="none" stroke="#f59e0b" strokeWidth="2.5" />
                <text x="488" y="94" fill="#f59e0b" fontSize="11" fontWeight="bold">(L, r)</text>
                <text x="475" y="106" fill="#94a3b8" fontSize="9">{inductanceMh} mH</text>
                {/* Flèche tension u_L */}
                <line x1="530" y1="52" x2="470" y2="52" stroke="#f59e0b" strokeWidth="1.5" />
                <text x="495" y="47" fill="#f59e0b" fontSize="10">u_L</text>

                {/* Descente droite */}
                <line x1="530" y1="70" x2="570" y2="70" stroke="#94a3b8" strokeWidth="2" />
                <line x1="570" y1="70" x2="570" y2="170" stroke="#94a3b8" strokeWidth="2" />

                {/* Fil inférieur de retour vers C */}
                <line x1="570" y1="170" x2="80" y2="170" stroke="#94a3b8" strokeWidth="2" />

                {/* Condensateur C sur la branche gauche */}
                <line x1="80" y1="50" x2="80" y2="95" stroke="#94a3b8" strokeWidth="2" />
                {/* Armatures condensateur */}
                <line x1="60" y1="95" x2="100" y2="95" stroke="#06b6d4" strokeWidth="3" />
                <text x="105" y="94" fill="#06b6d4" fontSize="10" fontWeight="bold">+q</text>
                <line x1="60" y1="107" x2="100" y2="107" stroke="#06b6d4" strokeWidth="3" />
                <text x="105" y="112" fill="#94a3b8" fontSize="10" fontWeight="bold">-q</text>
                <text x="35" y="105" fill="#06b6d4" fontSize="11" fontWeight="bold">C</text>
                <text x="25" y="118" fill="#94a3b8" fontSize="9">{capaciteMicroF} µF</text>
                {/* Flèche tension u_C */}
                <line x1="50" y1="115" x2="50" y2="85" stroke="#06b6d4" strokeWidth="1.5" />
                <text x="26" y="88" fill="#06b6d4" fontSize="10">u_C</text>

                <line x1="80" y1="107" x2="80" y2="170" stroke="#94a3b8" strokeWidth="2" />

                {/* Flèche courant i(t) dans la maille */}
                {switchPosition === 'decharge' && (
                  <g>
                    <line x1="330" y1="64" x2="360" y2="64" stroke="#38bdf8" strokeWidth="2" />
                    <polygon points="360,61 368,64 360,67" fill="#38bdf8" />
                    <text x="340" y="58" fill="#38bdf8" fontSize="11" fontWeight="bold">i(t)</text>
                  </g>
                )}
              </svg>
            </div>
          </div>
        )}

        {/* VUE 4 : Analogie Mécanique-Électrique */}
        {activeTab === 'analogie' && (
          <div className="space-y-4">
            <div className="border-b border-slate-800 pb-2">
              <h4 className="text-sm font-bold text-slate-200">
                Tableau Synoptique de Correspondance : Pendule Élastique vs Circuit RLC
              </h4>
              <p className="text-xs text-slate-400 mt-0.5">
                Au Baccalauréat sénégalais, les questions d’analogie permettent de passer instantanément des formules mécaniques aux formules électriques.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Colonne Mécanique */}
              <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/80 space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                  <span className="font-bold text-cyan-300 text-xs uppercase tracking-wider">
                    Système Mécanique (Pendule)
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">x(t)</span>
                </div>
                <ul className="text-xs space-y-2 text-slate-300 font-mono">
                  <li className="flex justify-between">
                    <span className="text-slate-400">Élongation :</span>
                    <span className="text-white font-bold">x(t) [m]</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-400">Vitesse :</span>
                    <span className="text-white font-bold">v(t) = dx/dt [m/s]</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-400">Masse (inertie) :</span>
                    <span className="text-amber-300 font-bold">m [kg]</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-400">Raideur du ressort :</span>
                    <span className="text-cyan-300 font-bold">k [N/m]</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-400">Frottement fluide :</span>
                    <span className="text-red-400 font-bold">h [N·s/m]</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-400">Énergie cinétique :</span>
                    <span className="text-white font-bold">Ec = 1/2 m v²</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-400">Énergie potentielle :</span>
                    <span className="text-white font-bold">Ep = 1/2 k x²</span>
                  </li>
                  <li className="flex justify-between border-t border-slate-700 pt-1.5">
                    <span className="text-slate-400">Équation libre :</span>
                    <span className="text-cyan-300 font-bold">m x&apos;&apos; + h x&apos; + k x = 0</span>
                  </li>
                </ul>
              </div>

              {/* Colonne Électrique */}
              <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/80 space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                  <span className="font-bold text-amber-300 text-xs uppercase tracking-wider">
                    Système Électrique (RLC)
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">q(t)</span>
                </div>
                <ul className="text-xs space-y-2 text-slate-300 font-mono">
                  <li className="flex justify-between">
                    <span className="text-slate-400">Charge électrique :</span>
                    <span className="text-white font-bold">q(t) [C]</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-400">Intensité du courant :</span>
                    <span className="text-white font-bold">i(t) = dq/dt [A]</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-400">Inductance (inertie) :</span>
                    <span className="text-amber-300 font-bold">L [H]</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-400">Inverse de capacité :</span>
                    <span className="text-cyan-300 font-bold">1 / C [F⁻¹]</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-400">Résistance totale :</span>
                    <span className="text-red-400 font-bold">R_t [Ω]</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-400">Énergie magnétique :</span>
                    <span className="text-white font-bold">Em = 1/2 L i²</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-slate-400">Énergie électrostatique :</span>
                    <span className="text-white font-bold">Ee = 1/2 q² / C</span>
                  </li>
                  <li className="flex justify-between border-t border-slate-700 pt-1.5">
                    <span className="text-slate-400">Équation libre :</span>
                    <span className="text-amber-300 font-bold">L q&apos;&apos; + R_t q&apos; + 1/C q = 0</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Tableau de bord des métriques calculées en direct */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-surface/70 rounded-2xl p-3 border border-navy/10 space-y-1">
          <span className="text-[10px] uppercase font-bold text-text/50">Régime Actuel</span>
          <div className="text-sm font-bold capitalize text-navy">
            {regime === 'non_amorti' && 'Non amorti (LC)'}
            {regime === 'pseudoperiodique' && 'Pseudopériodique'}
            {regime === 'critique' && 'Critique (R = Rc)'}
            {regime === 'aperiodique' && 'Apériodique'}
          </div>
        </div>

        <div className="bg-surface/70 rounded-2xl p-3 border border-navy/10 space-y-1">
          <span className="text-[10px] uppercase font-bold text-text/50">Période Propre T₀</span>
          <div className="text-sm font-bold text-navy font-mono">
            {(T0 * 1000).toFixed(2)} ms
          </div>
        </div>

        <div className="bg-surface/70 rounded-2xl p-3 border border-navy/10 space-y-1">
          <span className="text-[10px] uppercase font-bold text-text/50">Résistance critique Rc</span>
          <div className="text-sm font-bold text-navy font-mono">
            {Rc.toFixed(1)} Ω
          </div>
        </div>

        <div className="bg-surface/70 rounded-2xl p-3 border border-navy/10 space-y-1">
          <span className="text-[10px] uppercase font-bold text-text/50">Fréquence f₀</span>
          <div className="text-sm font-bold text-navy font-mono">
            {f0.toFixed(1)} Hz
          </div>
        </div>

        <div className="bg-surface/70 rounded-2xl p-3 border border-navy/10 space-y-1">
          <span className="text-[10px] uppercase font-bold text-text/50">Charge Initiale Q₀</span>
          <div className="text-sm font-bold text-navy font-mono">
            {(Qm * 1e6).toFixed(1)} µC
          </div>
        </div>

        <div className="bg-surface/70 rounded-2xl p-3 border border-navy/10 space-y-1">
          <span className="text-[10px] uppercase font-bold text-text/50">Décrément δ</span>
          <div className="text-sm font-bold text-navy font-mono">
            {regime === 'pseudoperiodique' ? decrementLog.toFixed(3) : '—'}
          </div>
        </div>
      </div>

      {/* Sliders de réglage interactif */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 bg-surface/40 p-5 rounded-2xl border border-navy/10">
        {/* Slider L */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-navy">Inductance L :</span>
            <span className="font-mono font-bold text-turquoise bg-turquoise/10 px-2 py-0.5 rounded">
              {inductanceMh} mH
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="500"
            step="10"
            value={inductanceMh}
            onChange={(e) => setInductanceMh(Number(e.target.value))}
            className="w-full accent-turquoise cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-text/50 font-mono">
            <span>10 mH</span>
            <span>500 mH</span>
          </div>
        </div>

        {/* Slider C */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-navy">Capacité C :</span>
            <span className="font-mono font-bold text-turquoise bg-turquoise/10 px-2 py-0.5 rounded">
              {capaciteMicroF} µF
            </span>
          </div>
          <input
            type="range"
            min="1"
            max="50"
            step="1"
            value={capaciteMicroF}
            onChange={(e) => setCapaciteMicroF(Number(e.target.value))}
            className="w-full accent-turquoise cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-text/50 font-mono">
            <span>1 µF</span>
            <span>50 µF</span>
          </div>
        </div>

        {/* Slider R */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-navy">Résistance R :</span>
            <span className="font-mono font-bold text-turquoise bg-turquoise/10 px-2 py-0.5 rounded">
              {resistanceOhm} Ω
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="500"
            step="5"
            value={resistanceOhm}
            onChange={(e) => setResistanceOhm(Number(e.target.value))}
            className="w-full accent-turquoise cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-text/50 font-mono">
            <span>0 Ω (Idéal)</span>
            <span>500 Ω</span>
          </div>
        </div>

        {/* Slider Tension initiale E */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <span className="font-bold text-navy">Tension initiale E :</span>
            <span className="font-mono font-bold text-turquoise bg-turquoise/10 px-2 py-0.5 rounded">
              {tensionInitialeV} V
            </span>
          </div>
          <input
            type="range"
            min="2"
            max="24"
            step="1"
            value={tensionInitialeV}
            onChange={(e) => setTensionInitialeV(Number(e.target.value))}
            className="w-full accent-turquoise cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-text/50 font-mono">
            <span>2 V</span>
            <span>24 V</span>
          </div>
        </div>
      </div>
    </section>
  );
}

