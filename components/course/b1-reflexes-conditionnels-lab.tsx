'use client';

import React, { useState } from 'react';
import MathRenderer from '@/components/course/math-renderer';

export default function B1ReflexesConditionnelsLab() {
  const [activeTab, setActiveTab] = useState<'myotatique' | 'magendie' | 'pavlov'>('myotatique');

  // --- TAB 1: RÉFLEXE MYOTATIQUE ROTULIEN ---
  const [percussionForce, setPercussionForce] = useState<'infraliminaire' | 'liminaire' | 'supraliminaire'>('liminaire');
  const [isStriking, setIsStriking] = useState<boolean>(false);
  const [reflexeStep, setReflexeStep] = useState<number>(0);

  const triggerPatellarReflex = () => {
    if (isStriking) return;
    setIsStriking(true);
    setReflexeStep(1); // Marteau frappe le tendon rotulien

    setTimeout(() => {
      if (percussionForce === 'infraliminaire') {
        setReflexeStep(0);
        setIsStriking(false);
      } else {
        setReflexeStep(2); // Influx sensitif Ia se propage vers la moelle
      }
    }, 400);

    setTimeout(() => {
      if (percussionForce !== 'infraliminaire') {
        setReflexeStep(3); // Synapse monosynaptique dans la corne antérieure + inhibition réciproque
      }
    }, 900);

    setTimeout(() => {
      if (percussionForce !== 'infraliminaire') {
        setReflexeStep(4); // Contraction du quadriceps et extension brusque de la jambe
      }
    }, 1400);

    setTimeout(() => {
      setReflexeStep(0);
      setIsStriking(false);
    }, 2800);
  };

  // --- TAB 2: BANC DE DISSECTION VIRTUELLE DE MAGENDIE ---
  type MagendieSection = 'intact' | 'section_rd' | 'section_rv' | 'section_nerf';
  type MagendieStim = 'none' | 'central' | 'peripherique';

  const [selectedSection, setSelectedSection] = useState<MagendieSection>('intact');
  const [selectedStim, setSelectedStim] = useState<MagendieStim>('none');

  const MAGENDIE_DATA: Record<MagendieSection, {
    title: string;
    description: string;
    sensibility: string;
    motricity: string;
    stimCentralEffect: string;
    stimPeriphEffect: string;
    bacConclusion: string;
  }> = {
    intact: {
      title: 'Moelle Épinière & Racines Intactes (Témoin)',
      description: 'L’arc réflexe et les voies ascendantes/descendantes sont en continuité parfaite.',
      sensibility: 'Sensibilité normale (100 %)',
      motricity: 'Motricité normale et réflexe rotulien vif',
      stimCentralEffect: 'Non applicable sur nerf intact.',
      stimPeriphEffect: 'Non applicable sur nerf intact.',
      bacConclusion: 'Le nerf rachidien conduit à la fois les informations sensorielles et les ordres moteurs (nerf mixte).',
    },
    section_rd: {
      title: 'Section de la Racine Dorsale (avec Ganglion)',
      description: 'Coupure chirurgicale entre le ganglion spinal et la moelle épinière.',
      sensibility: 'Anesthésie totale du territoire innervé (insensibilité à la piqûre et à la chaleur)',
      motricity: 'Motricité volontaire conservée ! (Le membre n’est pas paralysé, mais le réflexe myotatique est aboli)',
      stimCentralEffect: 'Sensation de douleur vive et mouvement réflexe de retrait du membre controlatéral.',
      stimPeriphEffect: 'Aucune sensation, aucune douleur, aucune contraction musculaire (inefficace).',
      bacConclusion: 'La racine dorsale est la voie afférente purement SENSITIVE (conduction centripète vers les centres).',
    },
    section_rv: {
      title: 'Section de la Racine Ventrale (Antérieure)',
      description: 'Coupure chirurgicale de la racine antérieure émergeant de la moelle.',
      sensibility: 'Sensibilité rigoureusement normale ! (L’animal ressent la douleur parfaitement)',
      motricity: 'Paralysie motrice complète et flasque du territoire musculaire innervé',
      stimCentralEffect: 'Aucun effet (l’influx moteur ne remonte pas dans la moelle à cause de la polarité synaptique).',
      stimPeriphEffect: 'Contraction musculaire vigoureuse et immédiate du muscle effecteur.',
      bacConclusion: 'La racine ventrale est la voie efférente purement MOTRICE (conduction centrifuge vers les effecteurs).',
    },
    section_nerf: {
      title: 'Section du Nerf Rachidien Mixte (Sciatique)',
      description: 'Coupure du tronc nerveux commun après la réunion des deux racines.',
      sensibility: 'Perte totale de la sensibilité (anesthésie locale)',
      motricity: 'Paralysie motrice flasque totale du membre',
      stimCentralEffect: 'Sensation douloureuse consciente (si les centres encéphaliques sont intacts).',
      stimPeriphEffect: 'Contraction musculaire des faisceaux moteurs périphériques.',
      bacConclusion: 'Le tronc du nerf rachidien est MIXTE : il contient à la fois des fibres sensitives et des fibres motrices.',
    },
  };

  // --- TAB 3: LABORATOIRE PAVLOVIEN ---
  const [pavlovStage, setPavlovStage] = useState<'sn' | 'si' | 'conditionnement' | 'sc' | 'extinction'>('si');
  const [salivationLevel, setSalivationLevel] = useState<number>(100);

  const handleSelectPavlovStage = (stage: 'sn' | 'si' | 'conditionnement' | 'sc' | 'extinction') => {
    setPavlovStage(stage);
    if (stage === 'sn') setSalivationLevel(0);
    if (stage === 'si') setSalivationLevel(100);
    if (stage === 'conditionnement') setSalivationLevel(100);
    if (stage === 'sc') setSalivationLevel(95);
    if (stage === 'extinction') setSalivationLevel(10);
  };

  return (
    <section className="rounded-3xl border border-emerald-900/10 shadow-sm overflow-hidden my-6 sm:my-8 w-full max-w-full bg-slate-950 text-slate-100">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 p-4 sm:p-6 lg:p-8 border-b border-emerald-500/20">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-300 font-bold bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30">
            LAB-B1.4 • Laboratoire Virtuel des Réflexes
          </span>
          <span className="text-xs font-semibold text-emerald-200/80 bg-teal-950/60 px-2.5 py-0.5 rounded-full border border-teal-500/20">
            Neurophysiologie &amp; Éthologie Expérimentale
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
          Simulateur Neurophysiologique : Réflexes Médullaires &amp; Pavloviens
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Explorez le mécanisme monosynaptique du réflexe rotulien, disséquez virtuellement les racines de Magendie et reproduisez les 4 phases du conditionnement pavlovien avec mesure de l’inhibition d’extinction.
        </p>

        {/* Tab Controls - Segmented Control Pro Mobile-First */}
        <div className="grid grid-cols-3 gap-1.5 bg-black/50 p-1.5 rounded-2xl border border-white/10 text-xs font-mono w-full mt-5">
          <button
            type="button"
            onClick={() => setActiveTab('myotatique')}
            className={`py-2.5 px-1 sm:px-3 text-center rounded-xl transition-all touch-manipulation min-h-[46px] flex flex-col items-center justify-center ${
              activeTab === 'myotatique'
                ? 'bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-950/60'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/60 font-semibold'
            }`}
          >
            <span className="text-[11px] sm:text-xs font-bold leading-tight">1. Myotatique</span>
            <span className="text-[9px] sm:text-[10px] tracking-tight opacity-75 mt-0.5">Arc &amp; Fuseau</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('magendie')}
            className={`py-2.5 px-1 sm:px-3 text-center rounded-xl transition-all touch-manipulation min-h-[46px] flex flex-col items-center justify-center ${
              activeTab === 'magendie'
                ? 'bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-950/60'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/60 font-semibold'
            }`}
          >
            <span className="text-[11px] sm:text-xs font-bold leading-tight">2. Magendie</span>
            <span className="text-[9px] sm:text-[10px] tracking-tight opacity-75 mt-0.5">Sections Racines</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('pavlov')}
            className={`py-2.5 px-1 sm:px-3 text-center rounded-xl transition-all touch-manipulation min-h-[46px] flex flex-col items-center justify-center ${
              activeTab === 'pavlov'
                ? 'bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-950/60'
                : 'text-slate-300 hover:text-white hover:bg-slate-900/60 font-semibold'
            }`}
          >
            <span className="text-[11px] sm:text-xs font-bold leading-tight">3. Pavlov</span>
            <span className="text-[9px] sm:text-[10px] tracking-tight opacity-75 mt-0.5">Conditionnel</span>
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-3.5 sm:p-6 lg:p-8 space-y-6">
        {/* ========================================================= */}
        {/* TAB 1: RÉFLEXE MYOTATIQUE ROTULIEN */}
        {/* ========================================================= */}
        {activeTab === 'myotatique' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Control Panel (5 cols) */}
            <div className="lg:col-span-5 space-y-5 bg-slate-900/80 p-4 sm:p-5 rounded-2xl border border-slate-800">
              <div className="border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                  Console d’Excitabilité Médullaire
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white mt-1">
                  Percussion du Tendon Rotulien
                </h3>
              </div>

              {/* Percussion Intensity */}
              <div className="space-y-2">
                <label className="text-xs font-mono text-slate-300 block">
                  Force du Choc au Marteau de Réflexe :
                </label>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  <button
                    type="button"
                    onClick={() => setPercussionForce('infraliminaire')}
                    className={`py-2 px-1 sm:px-2 rounded-xl text-center transition-all border font-mono ${
                      percussionForce === 'infraliminaire'
                        ? 'bg-rose-950/90 text-rose-200 border-rose-500 shadow-sm shadow-rose-950'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span className="block text-xs sm:text-sm font-bold">Infra</span>
                    <span className="block text-[9px] sm:text-[10px] opacity-75 mt-0.5">&lt; Seuil (0)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPercussionForce('liminaire')}
                    className={`py-2 px-1 sm:px-2 rounded-xl text-center transition-all border font-mono ${
                      percussionForce === 'liminaire'
                        ? 'bg-emerald-600 text-white border-emerald-400 shadow-sm shadow-emerald-950'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span className="block text-xs sm:text-sm font-bold">Liminaire</span>
                    <span className="block text-[9px] sm:text-[10px] opacity-80 mt-0.5">= Seuil (1 PA)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPercussionForce('supraliminaire')}
                    className={`py-2 px-1 sm:px-2 rounded-xl text-center transition-all border font-mono ${
                      percussionForce === 'supraliminaire'
                        ? 'bg-teal-600 text-white border-teal-400 shadow-sm shadow-teal-950'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span className="block text-xs sm:text-sm font-bold">Supra</span>
                    <span className="block text-[9px] sm:text-[10px] opacity-80 mt-0.5">&gt; Seuil (Max)</span>
                  </button>
                </div>
              </div>

              {/* Trigger Button */}
              <button
                type="button"
                onClick={triggerPatellarReflex}
                disabled={isStriking}
                className={`w-full py-3 px-4 rounded-xl font-mono text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-md touch-manipulation min-h-[48px] ${
                  isStriking
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                    : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20 active:scale-98'
                }`}
              >
                {isStriking ? 'CYCLE RÉFLEXE EN COURS...' : 'FRAPPER LE TENDON AVEC LE MARTEAU'}
              </button>

              {/* Status Box */}
              <div className="p-3.5 bg-slate-950/90 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-1.5 font-mono">
                <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
                  <span className="text-emerald-400 font-bold uppercase text-[10px]">
                    Chronologie de l’Arc Réflexe :
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {reflexeStep === 0 && 'REPOS PHYSIOLOGIQUE'}
                    {reflexeStep === 1 && 'ÉTAPE 1 : PERCUSSION'}
                    {reflexeStep === 2 && 'ÉTAPE 2 : CONDUCTION Ia'}
                    {reflexeStep === 3 && 'ÉTAPE 3 : SYNAPSE CORNE'}
                    {reflexeStep === 4 && 'ÉTAPE 4 : EXTENSION JAMBE'}
                  </span>
                </div>
                <p className="text-[11px] leading-relaxed text-slate-300">
                  {reflexeStep === 0 && 'Le membre inférieur est au repos, quadriceps à sa longueur de repos tonique.'}
                  {reflexeStep === 1 && 'Choc mécanique sur le tendon : étirement brusque du muscle quadriceps et stimulation des fuseaux neuromusculaires (FNM).'}
                  {reflexeStep === 2 && 'Genèse d’un train de potentiels d’action sur les fibres sensitives Ia centripètes traversant le ganglion spinal de la racine dorsale.'}
                  {reflexeStep === 3 && 'Entrée dans la corne antérieure : synapse directe excitatrice avec le motoneurone α ET synapse inhibitrice avec l’interneurone pour les ischio-jambiers.'}
                  {reflexeStep === 4 && 'Contraction vigoureuse du quadriceps et relâchement de l’ischio-jambier : extension réflexe brusque de la jambe !'}
                </p>
              </div>
            </div>

            {/* Visualizer & Oscilloscope (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Dynamic Diagram */}
              <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                    Schéma de l’Arc Réflexe Rotulien Monosynaptique
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-emerald-400 border border-slate-800">
                    Temps de latence ≈ 25 ms
                  </span>
                </div>

                <svg viewBox="0 0 500 240" className="w-full h-auto rounded-xl bg-slate-950 border border-slate-800/80">
                  {/* Moelle épinière (coupe transversale schématisée) */}
                  <rect x="330" y="30" width="150" height="180" rx="20" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                  <text x="355" y="55" fill="#64748b" fontSize="10" fontFamily="monospace" fontWeight="bold">MOELLE ÉPINIÈRE</text>

                  {/* Papillon de substance grise */}
                  <path
                    d="M 360 80 Q 405 100 405 120 Q 405 140 360 160 Q 380 120 360 80 Z"
                    fill="#1e293b"
                    stroke="#475569"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M 450 80 Q 405 100 405 120 Q 405 140 450 160 Q 430 120 450 80 Z"
                    fill="#1e293b"
                    stroke="#475569"
                    strokeWidth="1.5"
                  />

                  {/* Muscle Quadriceps (Agoniste extenseur) */}
                  <rect x="30" y="40" width="130" height="40" rx="8" fill="#1e293b" stroke={reflexeStep === 4 ? '#10b981' : '#334155'} strokeWidth="2.5" />
                  <text x="40" y="65" fill={reflexeStep === 4 ? '#34d399' : '#94a3b8'} fontSize="11" fontFamily="monospace" fontWeight="bold">
                    QUADRICEPS {reflexeStep === 4 ? '(CONTRACTÉ)' : '(REPOS)'}
                  </text>

                  {/* Muscle Ischio-Jambier (Antagoniste fléchisseur) */}
                  <rect x="30" y="160" width="130" height="40" rx="8" fill="#1e293b" stroke={reflexeStep === 4 ? '#38bdf8' : '#334155'} strokeWidth="2" />
                  <text x="40" y="185" fill={reflexeStep === 4 ? '#38bdf8' : '#94a3b8'} fontSize="11" fontFamily="monospace">
                    ISCHIO-JAMBIER {reflexeStep === 4 ? '(RELÂCHÉ)' : ''}
                  </text>

                  {/* Tendon rotulien et marteau */}
                  <line x1="20" y1="50" x2="20" y2="70" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
                  <text x="10" y="32" fill="#f59e0b" fontSize="9" fontFamily="monospace">Tendon</text>
                  {reflexeStep >= 1 && (
                    <circle cx="20" cy="60" r="10" fill="#f59e0b" opacity="0.6" />
                  )}

                  {/* Fibre Ia sensitive (bleue/turquoise, racine dorsale avec ganglion) */}
                  <path
                    d="M 160 55 Q 240 40 270 70 Q 300 80 375 95"
                    fill="none"
                    stroke={reflexeStep >= 2 ? '#38bdf8' : '#475569'}
                    strokeWidth="2.5"
                    strokeDasharray={reflexeStep === 2 ? '4,4' : 'none'}
                  />
                  {/* Ganglion spinal (renflement) */}
                  <circle cx="270" cy="70" r="9" fill="#0284c7" stroke="#38bdf8" strokeWidth="1.5" />
                  <text x="245" y="93" fill="#38bdf8" fontSize="8" fontFamily="monospace">Ganglion</text>

                  {/* Motoneurone alpha (vert, corne antérieure vers quadriceps) */}
                  <path
                    d="M 375 145 Q 260 160 160 75"
                    fill="none"
                    stroke={reflexeStep >= 3 ? '#10b981' : '#475569'}
                    strokeWidth="2.5"
                    strokeDasharray={reflexeStep === 3 ? '4,4' : 'none'}
                  />
                  {/* Corps cellulaire motoneurone dans la corne ventrale */}
                  <polygon points="375,140 380,150 370,150" fill="#10b981" />
                  <text x="385" y="148" fill="#10b981" fontSize="9" fontFamily="monospace">Motoneurone α</text>

                  {/* Interneurone inhibiteur (rose) vers motoneurone antagoniste */}
                  <line x1="375" y1="95" x2="375" y2="120" stroke="#f43f5e" strokeWidth="2" strokeDasharray="2,2" />
                  <circle cx="375" cy="120" r="4" fill="#f43f5e" />
                  <path
                    d="M 375 120 Q 250 170 160 180"
                    fill="none"
                    stroke={reflexeStep >= 3 ? '#f43f5e' : '#475569'}
                    strokeWidth="1.5"
                  />
                  <text x="315" y="125" fill="#f43f5e" fontSize="8" fontFamily="monospace">Interneurone (-)</text>
                </svg>
              </div>

              {/* Électrophysiologie : Traceur de Potentiel d’Action */}
              <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider">
                    Enregistrement Électromyographique (EMG Quadriceps)
                  </span>
                  <span className={`font-mono text-xs font-bold px-2 py-0.5 rounded ${
                    reflexeStep === 4 && percussionForce !== 'infraliminaire'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400'
                  }`}>
                    {reflexeStep === 4 && percussionForce !== 'infraliminaire' ? 'RÉPONSE DÉCLENCHÉE (100 mV)' : 'LIGNE DE BASE (0 mV)'}
                  </span>
                </div>

                <div className="h-20 bg-slate-950 rounded-xl border border-slate-800 p-2 relative flex items-center justify-center overflow-hidden">
                  <svg viewBox="0 0 300 60" className="w-full h-full">
                    <line x1="0" y1="30" x2="300" y2="30" stroke="#334155" strokeDasharray="3,3" />
                    {reflexeStep === 4 && percussionForce !== 'infraliminaire' ? (
                      <path
                        d="M 0 30 L 70 30 L 75 10 L 80 50 L 85 15 L 90 40 L 95 30 L 300 30"
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="2.5"
                      />
                    ) : (
                      <path d="M 0 30 L 300 30" fill="none" stroke="#475569" strokeWidth="2" />
                    )}
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: EXPÉRIENCES DE SECTION DE MAGENDIE */}
        {/* ========================================================= */}
        {activeTab === 'magendie' && (
          <div className="space-y-6">
            {/* Section selector buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'intact', label: '1. Témoin Intact', tag: 'Sain' },
                { id: 'section_rd', label: '2. Section R. Dorsale', tag: 'Sensitive' },
                { id: 'section_rv', label: '3. Section R. Ventrale', tag: 'Motrice' },
                { id: 'section_nerf', label: '4. Section Nerf Rach.', tag: 'Mixte' },
              ].map((s) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => {
                    setSelectedSection(s.id as MagendieSection);
                    setSelectedStim('none');
                  }}
                  className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all touch-manipulation min-h-[58px] flex flex-col justify-between ${
                    selectedSection === s.id
                      ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-900/30'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[9px] font-mono font-bold uppercase opacity-80">{s.tag}</span>
                  <p className="text-xs font-bold mt-1 leading-tight">{s.label}</p>
                </button>
              ))}
            </div>

            {/* Stimulation Buttons */}
            {selectedSection !== 'intact' && (
              <div className="p-3 bg-slate-900/80 rounded-xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-mono font-bold text-slate-300">
                  Électrodes de Stimulation Excitatoire :
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setSelectedStim('central')}
                    className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all border text-center ${
                      selectedStim === 'central'
                        ? 'bg-teal-600 text-white border-teal-400'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    Bout Central (Moelle)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedStim('peripherique')}
                    className={`px-3 py-2 rounded-xl text-xs font-mono font-bold transition-all border text-center ${
                      selectedStim === 'peripherique'
                        ? 'bg-teal-600 text-white border-teal-400'
                        : 'bg-slate-950 text-slate-400 border-slate-800'
                    }`}
                  >
                    Bout Périphérique (Muscle)
                  </button>
                </div>
              </div>
            )}

            {/* Results Display */}
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-base sm:text-lg font-black text-white">
                  {MAGENDIE_DATA[selectedSection].title}
                </h3>
                <span className="font-mono text-xs px-3 py-1 rounded-full bg-slate-950 border border-emerald-500/30 text-emerald-300">
                  {selectedSection === 'intact' ? 'État normal' : 'Lésion neurochirurgicale'}
                </span>
              </div>

              {/* 3 columns metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono">
                <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                    Sensibilité du Territoire
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200">
                    {MAGENDIE_DATA[selectedSection].sensibility}
                  </p>
                </div>

                <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-bold text-teal-400 uppercase tracking-wider block">
                    Motricité &amp; Contraction
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200">
                    {MAGENDIE_DATA[selectedSection].motricity}
                  </p>
                </div>

                <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-1">
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                    Effet de Stimulation
                  </span>
                  <p className="text-xs sm:text-sm text-slate-200">
                    {selectedStim === 'none' && 'Sélectionnez un bout ci-dessus.'}
                    {selectedStim === 'central' && MAGENDIE_DATA[selectedSection].stimCentralEffect}
                    {selectedStim === 'peripherique' && MAGENDIE_DATA[selectedSection].stimPeriphEffect}
                  </p>
                </div>
              </div>

              {/* Conclusion Bac */}
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-900/40">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                  Déduction Exigée au Baccalauréat Sénégalais (Magendie) :
                </span>
                <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed">
                  {MAGENDIE_DATA[selectedSection].bacConclusion}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 3: CONDITIONNEMENT PAVLOVIEN */}
        {/* ========================================================= */}
        {activeTab === 'pavlov' && (
          <div className="space-y-6">
            {/* Stage selection buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {[
                { id: 'sn', label: '1. Cloche (SN)', badge: 'Neutre' },
                { id: 'si', label: '2. Viande (SI)', badge: 'Absolu' },
                { id: 'conditionnement', label: '3. Cloche + Viande', badge: 'Association' },
                { id: 'sc', label: '4. Cloche (SC)', badge: 'Conditionné' },
                { id: 'extinction', label: '5. Non Renforcé', badge: 'Extinction' },
              ].map((st, idx) => (
                <button
                  key={st.id}
                  type="button"
                  onClick={() => handleSelectPavlovStage(st.id as any)}
                  className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all touch-manipulation min-h-[58px] flex flex-col justify-between ${
                    idx === 4 ? 'col-span-2 sm:col-span-1' : ''
                  } ${
                    pavlovStage === st.id
                      ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-900/30'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <span className="text-[9px] font-mono font-bold uppercase opacity-80">{st.badge}</span>
                  <p className="text-xs font-bold mt-1 leading-tight">{st.label}</p>
                </button>
              ))}
            </div>

            {/* Conditionnement Interactive Dashboard */}
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-4 sm:p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div>
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider block">
                    Observation Expérimentale de Pavlov
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-white mt-0.5">
                    {pavlovStage === 'sn' && 'Stimulus Neutre : Le son de la cloche'}
                    {pavlovStage === 'si' && 'Stimulus Inconditionnel : La viande dans la gueule'}
                    {pavlovStage === 'conditionnement' && 'Phase d’Apprentissage : Association Temporelle Répétée'}
                    {pavlovStage === 'sc' && 'Stimulus Conditionnel : La cloche déclenche la salivation'}
                    {pavlovStage === 'extinction' && 'Inhibition d’Extinction : Cloche répétée sans viande'}
                  </h3>
                </div>
                <div className="font-mono text-xs px-3 py-1 rounded-full bg-slate-950 border border-emerald-500/30 text-emerald-300 shrink-0">
                  Salivation : {salivationLevel}%
                </div>
              </div>

              {/* Gauge */}
              <div className="space-y-1 font-mono">
                <div className="flex justify-between text-xs text-slate-400">
                  <span>Sécrétion salivaire réflexe :</span>
                  <span className="text-emerald-400 font-bold">{salivationLevel}%</span>
                </div>
                <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className={`h-full transition-all duration-500 ${
                      salivationLevel > 50 ? 'bg-emerald-500' : salivationLevel > 0 ? 'bg-amber-500' : 'bg-slate-700'
                    }`}
                    style={{ width: `${salivationLevel}%` }}
                  />
                </div>
              </div>

              {/* Explanatory Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-1.5">
                  <span className="font-mono text-xs font-bold text-teal-400 uppercase tracking-wider block">
                    Circuit Cérébral Mis en Jeu
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {pavlovStage === 'sn' && 'Le cortex auditif est activé mais aucune voie anatomique ne le relie au centre salivaire bulbaire.'}
                    {pavlovStage === 'si' && 'Circuit inné sous-cortical : récepteurs gustatifs → nerf gustatif → bulbe rachidien (centre salivaire) → glandes salivaires.'}
                    {pavlovStage === 'conditionnement' && 'La répétition synchronisée crée une liaison nerveuse temporaire (plasticité synaptique corticale) entre l’aire auditive et le centre salivaire.'}
                    {pavlovStage === 'sc' && 'Le stimulus auditif active la liaison corticale temporaire qui stimule en cascade le centre salivaire bulbaire : salivation réflexe !'}
                    {pavlovStage === 'extinction' && 'En l’absence de renforcement (viande), une inhibition corticale interne étouffe progressivement la liaison temporaire.'}
                  </p>
                </div>

                <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800/80 space-y-1.5">
                  <span className="font-mono text-xs font-bold text-amber-400 uppercase tracking-wider block">
                    Statut Physiologique au Bac S2
                  </span>
                  <p className="text-slate-300 leading-relaxed">
                    {pavlovStage === 'sn' && 'Stimulus inefficace sur la fonction salivaire (réponse salivaire nulle).'}
                    {pavlovStage === 'si' && 'Réflexe inné, absolu, définitif, non appris, commun à tous les chiens de l’espèce.'}
                    {pavlovStage === 'conditionnement' && 'Le stimulus neutre doit obligatoirement précéder le stimulus inconditionnel de quelques fractions de seconde.'}
                    {pavlovStage === 'sc' && 'Réflexe acquis, conditionnel, individuel, temporaire, dépendant impérativement du cortex cérébral.'}
                    {pavlovStage === 'extinction' && 'Réversible ! Un repos de quelques heures ou une réassociation unique fait réapparaître immédiatement le réflexe.'}
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

