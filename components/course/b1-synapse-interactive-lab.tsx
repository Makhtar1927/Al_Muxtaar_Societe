'use client';

import React, { useState, useEffect, useRef } from 'react';
import MathRenderer from '@/components/course/math-renderer';

export default function B1SynapseInteractiveLab() {
  const [activeTab, setActiveTab] = useState<'neurotransmission' | 'sommation' | 'pharmacologie'>('neurotransmission');

  // --- TAB 1: NEUROTRANSMISSION ---
  const [caConcentration, setCaConcentration] = useState<number>(2.0); // mM
  const [synapseType, setSynapseType] = useState<'excitatory' | 'inhibitory'>('excitatory');
  const [isFiringPresynaptic, setIsFiringPresynaptic] = useState<boolean>(false);
  const [vesicleExocytosisStep, setVesicleExocytosisStep] = useState<number>(0);
  const [postSynapticPotential, setPostSynapticPotential] = useState<number>(-70);

  // Trigger synaptic transmission
  const triggerSynapse = () => {
    if (isFiringPresynaptic) return;
    setIsFiringPresynaptic(true);
    setVesicleExocytosisStep(1); // Action potential arrives

    setTimeout(() => {
      setVesicleExocytosisStep(2); // Ca2+ influx & exocytosis
    }, 400);

    setTimeout(() => {
      setVesicleExocytosisStep(3); // Neurotransmitter binding & ROC channel opening
      const amplitude = Math.round((caConcentration / 2.0) * 15);
      if (synapseType === 'excitatory') {
        setPostSynapticPotential(-70 + amplitude);
      } else {
        setPostSynapticPotential(-70 - amplitude);
      }
    }, 800);

    setTimeout(() => {
      setVesicleExocytosisStep(4); // Degradation / Repolarization
      setPostSynapticPotential(-70);
      setIsFiringPresynaptic(false);
    }, 1800);
  };

  // --- TAB 2: SOMMATION ---
  const [activeE1, setActiveE1] = useState<boolean>(false);
  const [activeE2, setActiveE2] = useState<boolean>(false);
  const [activeI1, setActiveI1] = useState<boolean>(false);
  const [temporalCount, setTemporalCount] = useState<number>(1); // 1, 2, or 3 consecutive spikes
  const [conePotential, setConePotential] = useState<number>(-70);
  const [hasActionPotentialFired, setHasActionPotentialFired] = useState<boolean>(false);

  useEffect(() => {
    let delta = 0;
    if (activeE1) delta += 10 * temporalCount;
    if (activeE2) delta += 12 * temporalCount;
    if (activeI1) delta -= 10 * temporalCount;

    const calculated = -70 + delta;
    setConePotential(calculated);
    setHasActionPotentialFired(calculated >= -55);
  }, [activeE1, activeE2, activeI1, temporalCount]);

  const resetSummation = () => {
    setActiveE1(false);
    setActiveE2(false);
    setActiveI1(false);
    setTemporalCount(1);
  };

  // --- TAB 3: PHARMACOLOGIE ---
  type DrugType = 'control' | 'curare' | 'eserine' | 'botulinum' | 'zero_ca';
  const [selectedDrug, setSelectedDrug] = useState<DrugType>('control');

  const DRUG_DATA: Record<DrugType, {
    name: string;
    target: string;
    mechanism: string;
    effectPost: string;
    clinicalEffect: string;
    bacTrap: string;
  }> = {
    control: {
      name: 'Milieu Témoin Physiologique',
      target: 'Conditions normales',
      mechanism: 'Exocytose normale de l’ACh, ouverture brève des canaux ROC sodiques, hydrolyse rapide par l’acétylcholinestérase.',
      effectPost: 'PPSE physiologique d’amplitude normale (+15 mV), dépolarisation brève de 1 à 2 ms.',
      clinicalEffect: 'Transmission synaptique normale et contraction musculaire efficace.',
      bacTrap: 'Sert de référence absolue pour comparer les tracés expérimentaux.',
    },
    curare: {
      name: 'Curare (D-Tubocurarine)',
      target: 'Récepteurs nicotiniques postsynaptiques (canaux ROC)',
      mechanism: 'Antagoniste compétitif : se lie aux sites récepteurs de l’ACh sans provoquer l’ouverture du canal ionique Na+.',
      effectPost: 'Absence totale de PPSE (tracé plat à -70 mV), même en stimulant vigoureusement le neurone présynaptique.',
      clinicalEffect: 'Paralysie flasque totale du muscle squelettique (asphyxie par arrêt du diaphragme).',
      bacTrap: 'Le curare n’empêche PAS la libération d’ACh dans la fente ; il bloque sa fixation postsynaptique !',
    },
    eserine: {
      name: 'Éserine (Physostigmine) / Néostigmine',
      target: 'Acétylcholinestérase (enzyme de dégradation dans la fente)',
      mechanism: 'Inhibiteur enzymatique réversible : empêche l’hydrolyse de l’ACh en acétate et choline.',
      effectPost: 'PPSE géant et prolongé : maintien d’une dépolarisation postsynaptique durable.',
      clinicalEffect: 'Contractions musculaires spasmodiques répétées, convulsions et tétanie motrice.',
      bacTrap: 'L’éserine peut lever l’effet d’une faible dose de curare par accumulation compétitive d’ACh native.',
    },
    botulinum: {
      name: 'Toxine Botulique (Botox)',
      target: 'Protéines SNARE de la membrane présynaptique',
      mechanism: 'Endopeptidase clivant les protéines d’arrimage : empêche la fusion des vésicules synaptiques avec la membrane.',
      effectPost: 'Aucun médiateur libéré dans la fente : PPSE nul (potentiel de repos inchangé à -70 mV).',
      clinicalEffect: 'Paralysie motrice flasque sans altération de la membrane postsynaptique.',
      bacTrap: 'L’injection directe d’acétylcholine exogène dans la fente rétablit la contraction, prouvant que les récepteurs sont intacts.',
    },
    zero_ca: {
      name: 'Milieu Dépourvu d’Ions Calcium ([Ca²⁺] = 0)',
      target: 'Canaux Ca²⁺ voltage-dépendants présynaptiques',
      mechanism: 'Même si le potentiel d’action présynaptique arrive, l’absence de gradient entrant de Ca²⁺ empêche le signal d’exocytose.',
      effectPost: 'Aucune exocytose d’acétylcholine : absence de PPSE.',
      clinicalEffect: 'Blocage synaptique complet réversible dès réintroduction de CaCl2.',
      bacTrap: 'Démontre que le PA présynaptique est insuffisant seul : le Ca²⁺ est le second messager obligatoire de l’exocytose.',
    },
  };

  return (
    <section className="rounded-3xl border border-emerald-900/10 shadow-sm overflow-hidden my-6 sm:my-8 w-full max-w-full bg-slate-950 text-slate-100">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 p-4 sm:p-6 lg:p-8 border-b border-emerald-500/20">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-300 font-bold bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30">
            LAB-B1.3 • Laboratoire Virtuel Synaptique
          </span>
          <span className="text-xs font-semibold text-emerald-200/80 bg-teal-950/60 px-2.5 py-0.5 rounded-full border border-teal-500/20">
            Neurophysiologie Expérimentale
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
          Simulateur Électrophysiologique : Synapse & Intégration
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Manipulez en direct la libération vésiculaire du neurotransmetteur, testez la sommation spatio-temporelle au niveau du cône d’implantation et analysez les effets pharmacologiques du curare, de l’ésérine et du calcium.
        </p>

        {/* Tab Controls - Segmented Control Pro Mobile-First */}
        <div className="grid grid-cols-3 gap-1.5 bg-black/50 p-1.5 rounded-2xl border border-white/10 text-xs font-mono w-full mt-5">
          <button
            type="button"
            onClick={() => setActiveTab('neurotransmission')}
            className={`py-2.5 px-1 sm:px-3 text-center rounded-xl transition-all touch-manipulation min-h-[46px] flex flex-col items-center justify-center ${
              activeTab === 'neurotransmission'
                ? 'bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-950/60'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/60 font-semibold'
            }`}
          >
            <span className="text-[11px] sm:text-xs font-bold leading-tight">1. Transmission</span>
            <span className="text-[9px] sm:text-[10px] tracking-tight opacity-75 mt-0.5">Vésicules &amp; ROC</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('sommation')}
            className={`py-2.5 px-1 sm:px-3 text-center rounded-xl transition-all touch-manipulation min-h-[46px] flex flex-col items-center justify-center ${
              activeTab === 'sommation'
                ? 'bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-950/60'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/60 font-semibold'
            }`}
          >
            <span className="text-[11px] sm:text-xs font-bold leading-tight">2. Sommation</span>
            <span className="text-[9px] sm:text-[10px] tracking-tight opacity-75 mt-0.5">Spatio-temporelle</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pharmacologie')}
            className={`py-2.5 px-1 sm:px-3 text-center rounded-xl transition-all touch-manipulation min-h-[46px] flex flex-col items-center justify-center ${
              activeTab === 'pharmacologie'
                ? 'bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-950/60'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/60 font-semibold'
            }`}
          >
            <span className="text-[11px] sm:text-xs font-bold leading-tight">3. Neurotoxines</span>
            <span className="text-[9px] sm:text-[10px] tracking-tight opacity-75 mt-0.5">Curare &amp; Éserine</span>
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-3.5 sm:p-6 lg:p-8 space-y-6">
        {/* ========================================================= */}
        {/* TAB 1: NEUROTRANSMISSION */}
        {/* ========================================================= */}
        {activeTab === 'neurotransmission' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Control Panel (4 cols) */}
            <div className="lg:col-span-5 space-y-5 bg-slate-900/80 p-4 sm:p-5 rounded-2xl border border-slate-800">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                  Pupitre Présynaptique
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white mt-1">
                  Paramètres de Stimulation &amp; Ioniques
                </h3>
              </div>

              {/* Synapse Type */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 block">
                  Nature de la Synapse :
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setSynapseType('excitatory')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                      synapseType === 'excitatory'
                        ? 'bg-emerald-600 text-white border-emerald-400'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    Excitatrice (ACh / PPSE)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSynapseType('inhibitory')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                      synapseType === 'inhibitory'
                        ? 'bg-rose-600 text-white border-rose-400'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    Inhibitrice (GABA / PPSI)
                  </button>
                </div>
              </div>

              {/* Ca2+ concentration slider */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="font-mono text-slate-300">[Ca²⁺] Extracellulaire :</span>
                  <span className="font-mono font-bold text-emerald-400">{caConcentration.toFixed(1)} mM</span>
                </div>
                <input
                  type="range"
                  min="0.0"
                  max="4.0"
                  step="0.5"
                  value={caConcentration}
                  onChange={(e) => setCaConcentration(parseFloat(e.target.value))}
                  className="w-full accent-emerald-500 bg-slate-800 rounded-lg cursor-pointer h-2"
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>0.0 mM (Blocage)</span>
                  <span>2.0 mM (Physiologique)</span>
                  <span>4.0 mM (Suractivation)</span>
                </div>
              </div>

              {/* Fire Button */}
              <button
                type="button"
                onClick={triggerSynapse}
                disabled={isFiringPresynaptic}
                className={`w-full py-3 px-4 rounded-xl font-mono text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-md touch-manipulation min-h-[48px] ${
                  isFiringPresynaptic
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20 active:scale-98'
                }`}
              >
                {isFiringPresynaptic ? 'SIGNAL EN COURS DE TRANSMISSION...' : 'ÉMETTRE UN PA PRÉSYNAPTIQUE'}
              </button>

              {/* Info badge */}
              <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1">
                <p className="font-bold text-emerald-300 font-mono">
                  État de la jonction :
                </p>
                <p>
                  {vesicleExocytosisStep === 0 && 'En attente de stimulation électrique.'}
                  {vesicleExocytosisStep === 1 && 'Arrivée de l’onde de dépolarisation présynaptique.'}
                  {vesicleExocytosisStep === 2 && `Ouverture des canaux Ca²⁺ VD (entrée de Ca²⁺) et exocytose des vésicules.`}
                  {vesicleExocytosisStep === 3 && `Diffusion et fixation sur les récepteurs ROC postsynaptiques (${synapseType === 'excitatory' ? 'entrée de Na⁺ → PPSE' : 'entrée de Cl⁻ → PPSI'}).`}
                  {vesicleExocytosisStep === 4 && 'Hydrolyse enzymatique du médiateur et retour au potentiel de repos.'}
                </p>
              </div>
            </div>

            {/* Visualizer & Oscilloscope (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              {/* Synapse Diagram SVG */}
              <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 relative overflow-hidden">
                <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block mb-2">
                  Ultrastructure de la Synapse (Grossissement × 50 000)
                </span>

                <svg viewBox="0 0 500 240" className="w-full h-auto rounded-xl bg-slate-950 border border-slate-800/80">
                  {/* Presynaptic bouton */}
                  <path
                    d="M 50 20 Q 250 20 250 90 Q 250 110 50 110"
                    fill="#0f172a"
                    stroke="#10b981"
                    strokeWidth="3"
                  />
                  <text x="70" y="45" fill="#10b981" fontSize="12" fontFamily="monospace" fontWeight="bold">
                    BOUTON PRÉSYNAPTIQUE
                  </text>

                  {/* Mitochondria */}
                  <ellipse cx="140" cy="65" rx="25" ry="12" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
                  <text x="122" y="68" fill="#94a3b8" fontSize="8" fontFamily="sans-serif">Mitochondrie</text>

                  {/* Synaptic vesicles */}
                  <circle cx="190" cy="55" r="7" fill={vesicleExocytosisStep >= 2 ? '#34d399' : '#059669'} />
                  <circle cx="215" cy="60" r="7" fill={vesicleExocytosisStep >= 2 ? '#34d399' : '#059669'} />
                  <circle cx="205" cy="80" r="7" fill={vesicleExocytosisStep >= 2 ? '#34d399' : '#059669'} />
                  <circle cx="230" cy="75" r="7" fill={vesicleExocytosisStep >= 2 ? '#34d399' : '#059669'} />

                  {/* Ca2+ influx arrow */}
                  {vesicleExocytosisStep >= 2 && caConcentration > 0 && (
                    <g>
                      <line x1="240" y1="30" x2="230" y2="60" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrow)" />
                      <text x="245" y="42" fill="#f59e0b" fontSize="11" fontFamily="monospace" fontWeight="bold">
                        Ca²⁺ ({caConcentration} mM)
                      </text>
                    </g>
                  )}

                  {/* Synaptic cleft */}
                  <rect x="252" y="30" width="30" height="180" fill="#020617" opacity="0.8" />
                  <text x="255" y="125" fill="#64748b" fontSize="9" fontFamily="monospace" transform="rotate(90, 255, 125)">
                    Fente (30 nm)
                  </text>

                  {/* Released molecules */}
                  {vesicleExocytosisStep >= 2 && caConcentration > 0 && (
                    <g>
                      <circle cx="265" cy="75" r="3" fill="#38bdf8" />
                      <circle cx="270" cy="95" r="3" fill="#38bdf8" />
                      <circle cx="262" cy="115" r="3" fill="#38bdf8" />
                      <circle cx="268" cy="135" r="3" fill="#38bdf8" />
                    </g>
                  )}

                  {/* Postsynaptic membrane */}
                  <path
                    d="M 285 20 Q 285 110 450 110 L 450 220 L 285 220 Z"
                    fill="#0f172a"
                    stroke={synapseType === 'excitatory' ? '#38bdf8' : '#f43f5e'}
                    strokeWidth="3"
                  />
                  <text x="300" y="180" fill={synapseType === 'excitatory' ? '#38bdf8' : '#f43f5e'} fontSize="12" fontFamily="monospace" fontWeight="bold">
                    MEMBRANE POSTSYNAPTIQUE
                  </text>

                  {/* ROC Receptors on postsynaptic membrane */}
                  <rect x="282" y="65" width="8" height="20" fill="#f59e0b" rx="2" />
                  <rect x="282" y="105" width="8" height="20" fill="#f59e0b" rx="2" />
                  <rect x="282" y="145" width="8" height="20" fill="#f59e0b" rx="2" />
                  <text x="300" y="78" fill="#fbbf24" fontSize="9" fontFamily="sans-serif">
                    Récepteurs-canaux ROC
                  </text>

                  {/* Influx into postsynaptic cell */}
                  {vesicleExocytosisStep === 3 && (
                    <g>
                      <text x="305" y="118" fill={synapseType === 'excitatory' ? '#34d399' : '#f43f5e'} fontSize="11" fontFamily="monospace" fontWeight="bold">
                        {synapseType === 'excitatory' ? '→ Entrée de Na⁺ (Dépolarisation)' : '→ Entrée de Cl⁻ (Hyperpolarisation)'}
                      </text>
                    </g>
                  )}
                </svg>
              </div>

              {/* Live Postsynaptic Oscilloscope */}
              <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                    Oscilloscope Postsynaptique (Électrode de mesure)
                  </span>
                  <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                    postSynapticPotential > -70
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                      : postSynapticPotential < -70
                      ? 'bg-rose-950 text-rose-300 border border-rose-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    Vm = {postSynapticPotential} mV
                  </span>
                </div>

                <div className="h-28 bg-slate-950 rounded-xl border border-slate-800 p-3 relative flex items-center justify-center overflow-hidden">
                  {/* Grid Lines */}
                  <div className="absolute inset-0 flex flex-col justify-between p-2 opacity-15 pointer-events-none">
                    <div className="border-b border-emerald-500 w-full" />
                    <div className="border-b border-emerald-500 w-full" />
                    <div className="border-b border-emerald-500 w-full" />
                  </div>

                  {/* Baseline indicator */}
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-[10px] text-slate-500">
                    PR: -70 mV
                  </div>

                  {/* Oscilloscope Waveform */}
                  <svg viewBox="0 0 300 80" className="w-full h-full">
                    {/* Zero reference */}
                    <line x1="0" y1="40" x2="300" y2="40" stroke="#334155" strokeDasharray="3,3" />

                    {/* Waveform path */}
                    {postSynapticPotential === -70 ? (
                      <path d="M 0 40 L 300 40" fill="none" stroke="#10b981" strokeWidth="2.5" />
                    ) : postSynapticPotential > -70 ? (
                      <path
                        d={`M 0 40 L 70 40 Q 120 ${40 - (postSynapticPotential - -70) * 1.8} 170 40 L 300 40`}
                        fill="none"
                        stroke="#34d399"
                        strokeWidth="3"
                      />
                    ) : (
                      <path
                        d={`M 0 40 L 70 40 Q 120 ${40 + (-70 - postSynapticPotential) * 1.8} 170 40 L 300 40`}
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth="3"
                      />
                    )}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: SOMMATION SPATIALE & TEMPORELLE */}
        {/* ========================================================= */}
        {activeTab === 'sommation' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Stimulation Controls (5 cols) */}
              <div className="lg:col-span-5 space-y-4 bg-slate-900/80 p-4 sm:p-5 rounded-2xl border border-slate-800">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                  Console d’Intégration Postsynaptique
                </span>
                <p className="text-xs text-slate-300">
                  Activez simultanément ou en rafale les différentes synapses afférentes pour observer la réponse au cône d’implantation.
                </p>

                {/* Synapse toggles */}
                <div className="space-y-3 pt-2">
                  {/* E1 */}
                  <button
                    type="button"
                    onClick={() => setActiveE1(!activeE1)}
                    className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all touch-manipulation ${
                      activeE1
                        ? 'bg-emerald-950/80 border-emerald-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-mono font-bold text-emerald-400">Synapse E1 (Dendrite 1)</p>
                      <p className="text-[11px] text-slate-300">Excitatrice : PPSE = +10 mV</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${activeE1 ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-500'}`}>
                      {activeE1 ? 'ACTIF' : 'INACTIF'}
                    </span>
                  </button>

                  {/* E2 */}
                  <button
                    type="button"
                    onClick={() => setActiveE2(!activeE2)}
                    className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all touch-manipulation ${
                      activeE2
                        ? 'bg-emerald-950/80 border-emerald-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-mono font-bold text-teal-400">Synapse E2 (Dendrite 2)</p>
                      <p className="text-[11px] text-slate-300">Excitatrice : PPSE = +12 mV</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${activeE2 ? 'bg-teal-600 text-white' : 'bg-slate-800 text-slate-500'}`}>
                      {activeE2 ? 'ACTIF' : 'INACTIF'}
                    </span>
                  </button>

                  {/* I1 */}
                  <button
                    type="button"
                    onClick={() => setActiveI1(!activeI1)}
                    className={`w-full p-3 rounded-xl border flex items-center justify-between text-left transition-all touch-manipulation ${
                      activeI1
                        ? 'bg-rose-950/80 border-rose-500 text-white'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-mono font-bold text-rose-400">Synapse I1 (Soma)</p>
                      <p className="text-[11px] text-slate-300">Inhibitrice (GABA) : PPSI = -10 mV</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${activeI1 ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-500'}`}>
                      {activeI1 ? 'ACTIF' : 'INACTIF'}
                    </span>
                  </button>
                </div>

                {/* Temporal summation multiplier */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <label className="text-xs font-mono text-slate-300 block">
                    Fréquence Temporelle (Salves Rapprochées) :
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[1, 2, 3].map((count) => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setTemporalCount(count)}
                        className={`py-2 rounded-xl text-xs font-mono font-bold transition-all border ${
                          temporalCount === count
                            ? 'bg-emerald-600 text-white border-emerald-400'
                            : 'bg-slate-950 text-slate-400 border-slate-800'
                        }`}
                      >
                        {count === 1 ? '1 Choc' : `${count} Chocs`}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Reset button */}
                <button
                  type="button"
                  onClick={resetSummation}
                  className="w-full py-2.5 bg-slate-950 hover:bg-slate-800 text-slate-300 text-xs font-mono font-bold uppercase tracking-wider rounded-xl border border-slate-800 transition-colors"
                >
                  RÉINITIALISER LES SYNAPSES
                </button>
              </div>

              {/* Summation Display & Outcome (7 cols) */}
              <div className="lg:col-span-7 space-y-4">
                {/* Result Card */}
                <div className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                  hasActionPotentialFired
                    ? 'bg-emerald-950/40 border-emerald-500 shadow-lg shadow-emerald-950/50'
                    : 'bg-slate-900/90 border-slate-800'
                }`}>
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800/80 pb-3 mb-3">
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                      Point d’Enregistrement : Cône d’Implantation
                    </span>
                    <span className={`font-mono text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded-full ${
                      hasActionPotentialFired
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      {hasActionPotentialFired ? 'SEUIL ATTEINT (-55 mV)' : 'INFRALIMINAIRE (< -55 mV)'}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-3 my-2">
                    <span className="text-3xl sm:text-4xl font-black font-mono text-white">
                      {conePotential} mV
                    </span>
                    <span className="text-xs font-mono text-slate-400">
                      (Seuil critique d’ouverture des CVD-Na⁺ = -55 mV)
                    </span>
                  </div>

                  {/* Diagnostic Text */}
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2">
                    {hasActionPotentialFired ? (
                      <span className="text-emerald-300 font-semibold">
                        Dépolarisation supraliminaire ! La somme algébrique des potentiels a franchi le seuil critique. Les canaux Na⁺ voltage-dépendants du cône d’implantation s’ouvrent massivement : <strong>un train de potentiels d’action (100 mV) se propage le long de l’axone (Loi du Tout ou Rien)</strong>.
                      </span>
                    ) : (
                      <span className="text-slate-400">
                        La dépolarisation globale reste insuffisante pour ouvrir les canaux voltage-dépendants du cône d’implantation. <strong>Aucun potentiel d’action n’est émis</strong> par le neurone postsynaptique.
                      </span>
                    )}
                  </p>
                </div>

                {/* Calculation breakdown */}
                <div className="bg-slate-900/90 p-4 sm:p-5 rounded-2xl border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                      Équation d’Intégration Algébrique au Bac S2
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-500/30">
                      Règle Officielle
                    </span>
                  </div>
                  <div className="p-3 sm:p-4 bg-slate-950 rounded-xl border border-emerald-900/40 text-emerald-200 overflow-x-auto text-xs sm:text-sm">
                    <MathRenderer
                      content={`$$V_m = V_{\\text{repos}} + \\sum \\Delta V_{\\text{PPSE}} + \\sum \\Delta V_{\\text{PPSI}} = -70 + (${activeE1 ? 10 * temporalCount : 0}) + (${activeE2 ? 12 * temporalCount : 0}) + (${activeI1 ? -10 * temporalCount : 0}) = ${conePotential}\\,\\text{mV}$$`}
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-[11px] font-mono pt-1 text-center">
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                      <span className="text-slate-400 block text-[9px] uppercase">Repos</span>
                      <span className="text-slate-200 font-bold">-70 mV</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                      <span className="text-emerald-400 block text-[9px] uppercase">PPSE Total</span>
                      <span className="text-emerald-300 font-bold">
                        +{((activeE1 ? 10 * temporalCount : 0) + (activeE2 ? 12 * temporalCount : 0))} mV
                      </span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-950 border border-slate-800/80">
                      <span className="text-rose-400 block text-[9px] uppercase">PPSI Total</span>
                      <span className="text-rose-300 font-bold">
                        {activeI1 ? -10 * temporalCount : 0} mV
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: PHARMACOLOGIE & NEUROTOXINES */}
        {/* ========================================================= */}
        {activeTab === 'pharmacologie' && (
          <div className="space-y-6">
            {/* Drug selection buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {(['control', 'curare', 'eserine', 'botulinum', 'zero_ca'] as DrugType[]).map((d, index) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setSelectedDrug(d)}
                  className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all touch-manipulation min-h-[58px] flex flex-col justify-between ${
                    index === 4 ? 'col-span-2 sm:col-span-1' : ''
                  } ${
                    selectedDrug === d
                      ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-900/30'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[9px] font-mono font-bold uppercase opacity-80">
                    {d === 'control' ? 'RÉFÉRENCE' : 'POISON'}
                  </span>
                  <p className="text-xs font-bold truncate mt-1">
                    {DRUG_DATA[d].name.split(' (')[0]}
                  </p>
                </button>
              ))}
            </div>

            {/* Selected Drug Analysis Card */}
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base sm:text-lg font-black text-white">
                  {DRUG_DATA[selectedDrug].name}
                </h3>
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-slate-950 border border-emerald-500/30 text-emerald-300">
                  Cible : {DRUG_DATA[selectedDrug].target}
                </span>
              </div>

              {/* 3 Columns details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-1">
                  <span className="text-[11px] font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                    Mode d’Action Moléculaire
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {DRUG_DATA[selectedDrug].mechanism}
                  </p>
                </div>

                <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-1">
                  <span className="text-[11px] font-mono font-bold text-teal-400 uppercase tracking-wider block">
                    Tracé Électrique Postsynaptique
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {DRUG_DATA[selectedDrug].effectPost}
                  </p>
                </div>

                <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-1">
                  <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
                    Conséquence Motrice &amp; Clinique
                  </span>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {DRUG_DATA[selectedDrug].clinicalEffect}
                  </p>
                </div>
              </div>

              {/* Bac Trap Box */}
              <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-900/40 flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-rose-500 mt-1 shrink-0" />
                <div>
                  <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider block mb-0.5">
                    Le Conseil d’Or de l’Office du Bac Sénégal
                  </span>
                  <p className="text-xs sm:text-sm text-rose-200/90 leading-relaxed">
                    {DRUG_DATA[selectedDrug].bacTrap}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
