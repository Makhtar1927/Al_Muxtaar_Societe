'use client';

import React, { useState, useEffect } from 'react';

export default function B2CardiaqueInteractiveLab() {
  const [activeTab, setActiveTab] = useState<'automatisme' | 'stannius' | 'inexcitabilite'>('automatisme');

  // --- TAB 1: AUTOMATISME & CYCLE CARDIAQUE ---
  const [isPlayingCycle, setIsPlayingCycle] = useState<boolean>(true);
  const [cycleStep, setCycleStep] = useState<number>(0); // 0: Diastole générale, 1: Onde P (Systole A), 2: Complexe QRS (Systole V), 3: Onde T (Repolarisation)
  const [heartRate, setHeartRate] = useState<number>(75); // bpm
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  useEffect(() => {
    if (!isPlayingCycle) return;
    const intervalTime = (60 / heartRate) * 1000 / 4;
    const timer = setInterval(() => {
      setCycleStep((prev) => (prev + 1) % 4);
    }, intervalTime);
    return () => clearInterval(timer);
  }, [isPlayingCycle, heartRate]);

  // --- TAB 2: LIGATURES DE STANNIUS ---
  type StanniusLigature = 'temoin' | 'ligature1' | 'ligature2' | 'ligature3';
  const [stanniusState, setStanniusState] = useState<StanniusLigature>('temoin');

  const STANNIUS_DETAILS: Record<
    StanniusLigature,
    {
      title: string;
      manipulation: string;
      sinusRythme: string;
      oreilletteRythme: string;
      ventriculeRythme: string;
      explicationBac: string;
    }
  > = {
    temoin: {
      title: 'Cœur de grenouille intact (Témoin)',
      manipulation: 'Aucune ligature. Cœur perfusé au liquide de Ringer oxygéné.',
      sinusRythme: '60 batt/min (Pace-maker actif)',
      oreilletteRythme: '60 batt/min (Synchrone)',
      ventriculeRythme: '60 batt/min (Synchrone)',
      explicationBac:
        'Le nœud sinusal (sinus veineux) génère l’impulsion initiale qui est transmise aux oreillettes puis aux ventricules. Le rythme est uniforme et synchrone.',
    },
    ligature1: {
      title: '1ère Ligature de Stannius (Sinuso-auriculaire)',
      manipulation: 'Fil noué sur le sillon sinuso-auriculaire isolant le sinus veineux des oreillettes.',
      sinusRythme: '60 batt/min (Continue à son rythme rapide)',
      oreilletteRythme: 'Arrêt temporaire puis reprise ralentie à 30-40 batt/min',
      ventriculeRythme: 'Arrêt temporaire puis reprise synchrone avec oreillettes (30-40 batt/min)',
      explicationBac:
        'Le sinus veineux possède l’automatisme le plus rapide (60 bpm). Isolé, le nœud d’Aschoff-Tawara (auriculo-ventriculaire) prend le relais à son rythme propre plus lent. Démonstration de la hiérarchie nodale.',
    },
    ligature2: {
      title: '2ème Ligature de Stannius (Auriculo-ventriculaire)',
      manipulation: 'Après la 1ère ligature, ligature placée dans le sillon auriculo-ventriculaire.',
      sinusRythme: '60 batt/min',
      oreilletteRythme: '30-40 batt/min (Géré par nœud AV)',
      ventriculeRythme: 'Arrêt prolongé puis battements lents et autonomes (15-20 batt/min)',
      explicationBac:
        'Le ventricule possède un centre idioventriculaire (faisceau de His et réseau de Purkinje) capable d’automatisme résiduel, mais à fréquence très basse. Confirmation du gradient d’automatisme décroissant.',
    },
    ligature3: {
      title: '3ème Ligature de Stannius (Pointe / Apex du ventricule)',
      manipulation: 'Ligature sectionnant ou isolant le tiers inférieur (apex) du ventricule.',
      sinusRythme: '60 batt/min',
      oreilletteRythme: '30-40 batt/min',
      ventriculeRythme: 'Base : bat / Pointe isolée : IMMOBILE DÉFINITIVEMENT',
      explicationBac:
        'La pointe du cœur ne contient pas de tissu nodal fonctionnel propre. Stimulée mécaniquement ou électriquement, elle se contracte, prouvant qu’elle est excitable et contractile mais NON automatique.',
    },
  };

  // --- TAB 3: INEXCITABILITÉ & EXTRASYSTOLE ---
  const [stimTiming, setStimTiming] = useState<'systole' | 'diastole'>('diastole');
  const [stimActive, setStimActive] = useState<boolean>(false);
  const [curveTrace, setCurveTrace] = useState<string>('normal');

  const handleStimulation = () => {
    setStimActive(true);
    if (stimTiming === 'systole') {
      setCurveTrace('refractaire');
    } else {
      setCurveTrace('extrasystole');
    }

    setTimeout(() => {
      setStimActive(false);
    }, 2500);
  };

  return (
    <div className="w-full bg-white border border-slate-200 rounded-3xl p-4 sm:p-7 text-slate-800 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-black uppercase tracking-widest bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded-full border border-rose-200">
              Labo Virtuel SVT B2.1
            </span>
            <span className="text-xs text-slate-500 font-medium">Physiologie Cardiovasculaire</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Laboratoire Virtuel d&apos;Électrophysiologie Cardiaque
          </h3>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-600 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl self-start sm:self-auto font-medium">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
          <span>Simulateur Médical Réaliste Bac S2</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 gap-2 bg-slate-100/80 p-1.5 rounded-2xl border border-slate-200">
        <button
          onClick={() => setActiveTab('automatisme')}
          className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all text-center ${
            activeTab === 'automatisme'
              ? 'bg-white text-rose-700 shadow-sm border border-slate-200 font-black'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <div className="truncate">Cœur & Conduction 3D</div>
          <div className="text-[9px] font-normal opacity-75 hidden sm:block">Propagation & ECG</div>
        </button>

        <button
          onClick={() => setActiveTab('stannius')}
          className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all text-center ${
            activeTab === 'stannius'
              ? 'bg-white text-rose-700 shadow-sm border border-slate-200 font-black'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <div className="truncate">Stannius (Grenouille)</div>
          <div className="text-[9px] font-normal opacity-75 hidden sm:block">Ligatures & Tissu Nodal</div>
        </button>

        <button
          onClick={() => setActiveTab('inexcitabilite')}
          className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all text-center ${
            activeTab === 'inexcitabilite'
              ? 'bg-white text-rose-700 shadow-sm border border-slate-200 font-black'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
          }`}
        >
          <div className="truncate">Période Réfractaire</div>
          <div className="text-[9px] font-normal opacity-75 hidden sm:block">Extrasystole & Repos</div>
        </button>
      </div>

      {/* TAB 1 CONTENT */}
      {activeTab === 'automatisme' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Visualisation SVG Cœur Médical Réaliste */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 flex flex-col justify-between">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">
                  Coupe Frontale Anatomique & Système de Conduction
                </span>
                <span className="text-[10px] bg-white border border-slate-200 text-slate-700 px-2.5 py-0.5 rounded-full font-bold shadow-sm">
                  Période : {(60 / heartRate).toFixed(2)} s
                </span>
              </div>

              {/* Heart Realistic Medical SVG */}
              <div className="relative w-full aspect-[4/3] bg-gradient-to-b from-white via-slate-50/50 to-rose-50/20 rounded-2xl border border-slate-200/90 flex items-center justify-center p-2 shadow-sm overflow-hidden">
                <svg
                  viewBox="0 0 540 440"
                  className="w-full h-full max-h-[340px] drop-shadow-md select-none transition-transform duration-300"
                  style={{
                    transform:
                      cycleStep === 2
                        ? 'scale(0.97)'
                        : cycleStep === 1
                        ? 'scale(0.99)'
                        : 'scale(1)',
                  }}
                >
                  <defs>
                    {/* Dégradés anatomiques réalistes */}
                    <linearGradient id="aortaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="50%" stopColor="#dc2626" />
                      <stop offset="100%" stopColor="#991b1b" />
                    </linearGradient>

                    <linearGradient id="pulmonaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#3b82f6" />
                      <stop offset="50%" stopColor="#2563eb" />
                      <stop offset="100%" stopColor="#1e40af" />
                    </linearGradient>

                    <linearGradient id="venaCavaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="60%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#1d4ed8" />
                    </linearGradient>

                    <linearGradient id="myoOuterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fda4af" />
                      <stop offset="40%" stopColor="#f43f5e" />
                      <stop offset="80%" stopColor="#be123c" />
                      <stop offset="100%" stopColor="#881337" />
                    </linearGradient>

                    <radialGradient id="cavityGrad" cx="50%" cy="50%" r="60%">
                      <stop offset="0%" stopColor="#9f1239" />
                      <stop offset="70%" stopColor="#881337" />
                      <stop offset="100%" stopColor="#4c0519" />
                    </radialGradient>

                    <linearGradient id="electricalGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#fef08a" />
                      <stop offset="50%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#d97706" />
                    </linearGradient>

                    {/* Effet néon pour conduction */}
                    <filter id="neonPulse" x="-30%" y="-30%" width="160%" height="160%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* ── 1. GROS VAISSEAUX POSTÉRIEURS (Veines Caves) ── */}
                  {/* Veine cave supérieure */}
                  <path
                    d="M 175 40 C 175 40, 180 85, 185 125 L 215 125 C 215 85, 210 40, 210 40 Z"
                    fill="url(#venaCavaGrad)"
                    stroke="#1e3a8a"
                    strokeWidth="1.5"
                  />
                  {/* Veine cave inférieure */}
                  <path
                    d="M 185 300 C 185 340, 190 380, 190 380 L 220 380 C 220 340, 215 300, 215 300 Z"
                    fill="url(#venaCavaGrad)"
                    stroke="#1e3a8a"
                    strokeWidth="1.5"
                  />

                  {/* ── 2. CROSSE DE L'AORTE (Arc Aortique + 3 branches) ── */}
                  {/* Troncs artériels au sommet de l'aorte */}
                  <path d="M 270 50 L 270 20 L 285 20 L 285 55" fill="url(#aortaGrad)" stroke="#7f1d1d" strokeWidth="1.5" />
                  <path d="M 295 55 L 298 15 L 312 15 L 310 58" fill="url(#aortaGrad)" stroke="#7f1d1d" strokeWidth="1.5" />
                  <path d="M 320 60 L 328 20 L 342 20 L 334 68" fill="url(#aortaGrad)" stroke="#7f1d1d" strokeWidth="1.5" />

                  {/* Arc Aortique */}
                  <path
                    d="M 255 120 C 255 45, 360 40, 365 120 C 370 160, 360 190, 355 210 L 330 200 C 335 180, 340 150, 335 120 C 330 80, 275 80, 275 120 Z"
                    fill="url(#aortaGrad)"
                    stroke="#7f1d1d"
                    strokeWidth="2"
                  />

                  {/* ── 3. TRONC PULMONAIRE (Croisant en avant de l'aorte) ── */}
                  <path
                    d="M 250 170 C 260 120, 290 90, 320 85 L 335 110 C 310 115, 290 135, 280 175 Z"
                    fill="url(#pulmonaryGrad)"
                    stroke="#1e3a8a"
                    strokeWidth="2"
                  />

                  {/* ── 4. MYOCARDE ET CONTOUR EXTERNE DU CŒUR ── */}
                  <path
                    d="M 190 120
                       C 140 125, 140 180, 160 210
                       C 140 230, 160 300, 240 375
                       C 270 405, 300 415, 315 415
                       C 335 415, 365 375, 410 300
                       C 455 220, 440 150, 385 125
                       C 365 115, 340 120, 320 130
                       C 300 120, 240 115, 190 120 Z"
                    fill="url(#myoOuterGrad)"
                    stroke="#4c0519"
                    strokeWidth="3.5"
                  />

                  {/* ── 5. CAVITÉS CARDIAQUES INTERNES EN COUPE ── */}
                  {/* Oreillette Droite (Cavité) */}
                  <path
                    d="M 175 140 C 155 160, 165 200, 185 210 C 205 210, 235 200, 235 155 C 235 140, 205 135, 175 140 Z"
                    fill="url(#cavityGrad)"
                    stroke="#4c0519"
                    strokeWidth="1.5"
                  />

                  {/* Oreillette Gauche (Cavité) */}
                  <path
                    d="M 315 145 C 315 185, 345 205, 375 200 C 400 195, 410 160, 395 140 C 375 125, 335 130, 315 145 Z"
                    fill="url(#cavityGrad)"
                    stroke="#4c0519"
                    strokeWidth="1.5"
                  />

                  {/* Ventricule Droit (Cavité - Paroi modérément épaisse 4-5mm) */}
                  <path
                    d="M 190 235 C 175 270, 195 330, 260 365 C 265 330, 260 270, 250 235 Z"
                    fill="url(#cavityGrad)"
                    stroke="#4c0519"
                    strokeWidth="2"
                  />

                  {/* Ventricule Gauche (Cavité - Entouré d'une paroi très épaisse 12-15mm) */}
                  <path
                    d="M 285 235 C 285 275, 290 340, 315 375 C 360 330, 385 270, 375 235 C 345 230, 315 230, 285 235 Z"
                    fill="url(#cavityGrad)"
                    stroke="#4c0519"
                    strokeWidth="2"
                  />

                  {/* Septum Interventriculaire (Cloison épaisse centrale) */}
                  <path
                    d="M 250 230 L 285 230 L 290 375 L 260 365 Z"
                    fill="#be123c"
                    stroke="#881337"
                    strokeWidth="1"
                    opacity="0.85"
                  />

                  {/* Valvule Tricuspide (AV droite) & Cordages tendineux */}
                  <line x1="185" y1="215" x2="200" y2="245" stroke="#fecdd3" strokeWidth="2.5" />
                  <line x1="225" y1="215" x2="210" y2="245" stroke="#fecdd3" strokeWidth="2.5" />
                  <line x1="200" y1="245" x2="205" y2="275" stroke="#fecdd3" strokeWidth="1" strokeDasharray="2 1" />
                  <line x1="210" y1="245" x2="215" y2="275" stroke="#fecdd3" strokeWidth="1" strokeDasharray="2 1" />

                  {/* Valvule Mitrale (AV gauche) & Cordages tendineux */}
                  <line x1="325" y1="215" x2="335" y2="245" stroke="#fecdd3" strokeWidth="2.5" />
                  <line x1="365" y1="215" x2="355" y2="245" stroke="#fecdd3" strokeWidth="2.5" />
                  <line x1="335" y1="245" x2="335" y2="280" stroke="#fecdd3" strokeWidth="1" strokeDasharray="2 1" />
                  <line x1="355" y1="245" x2="350" y2="280" stroke="#fecdd3" strokeWidth="1" strokeDasharray="2 1" />

                  {/* ── 6. SYSTÈME DE CONDUCTION NODAL DYNAMIQUE & ANIME ── */}

                  {/* Voies internodales (3 faisceaux) et faisceau de Bachmann vers l'OG */}
                  <path
                    d="M 180 150 Q 210 160 235 195"
                    fill="none"
                    stroke={cycleStep === 1 ? '#f59e0b' : '#fbbf24'}
                    strokeWidth={cycleStep === 1 ? '3' : '1.5'}
                    strokeDasharray={cycleStep === 1 ? '4 2' : 'none'}
                    className="transition-all"
                  />
                  <path
                    d="M 180 150 Q 200 175 235 195"
                    fill="none"
                    stroke={cycleStep === 1 ? '#f59e0b' : '#fbbf24'}
                    strokeWidth={cycleStep === 1 ? '3' : '1.5'}
                  />
                  {/* Faisceau de Bachmann vers OG */}
                  <path
                    d="M 180 148 Q 250 120 330 145"
                    fill="none"
                    stroke={cycleStep === 1 ? '#f59e0b' : '#fcd34d'}
                    strokeWidth={cycleStep === 1 ? '2.5' : '1.2'}
                    strokeDasharray="3 2"
                  />

                  {/* Flèches de dépolarisation auriculaire pendant Onde P */}
                  {cycleStep === 1 && (
                    <g filter="url(#neonPulse)">
                      <path d="M 195 155 L 210 168" stroke="#fef08a" strokeWidth="2" markerEnd="url(#arrow)" />
                      <path d="M 240 135 L 265 140" stroke="#fef08a" strokeWidth="2" />
                    </g>
                  )}

                  {/* NŒUD SINUSAL (Keith & Flack) */}
                  <g
                    className="cursor-pointer transition-transform hover:scale-125"
                    onMouseEnter={() => setHoveredNode('sinusal')}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    {cycleStep === 1 && (
                      <circle cx="178" cy="148" r="15" fill="#f59e0b" opacity="0.35" className="animate-ping" />
                    )}
                    <ellipse
                      cx="178"
                      cy="148"
                      rx="9"
                      ry="6"
                      fill={cycleStep === 1 ? '#fef08a' : '#f59e0b'}
                      stroke="#b45309"
                      strokeWidth="2"
                      filter={cycleStep === 1 ? 'url(#neonPulse)' : 'none'}
                    />
                  </g>

                  {/* NŒUD AURICULO-VENTRICULAIRE (Aschoff-Tawara) */}
                  <g
                    className="cursor-pointer transition-transform hover:scale-125"
                    onMouseEnter={() => setHoveredNode('av')}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    {(cycleStep === 1 || cycleStep === 2) && (
                      <circle cx="238" cy="198" r="12" fill="#eab308" opacity="0.3" className="animate-pulse" />
                    )}
                    <ellipse
                      cx="238"
                      cy="198"
                      rx="8"
                      ry="6"
                      fill={cycleStep === 2 ? '#fef08a' : '#eab308'}
                      stroke="#854d0e"
                      strokeWidth="2"
                      filter={cycleStep === 2 ? 'url(#neonPulse)' : 'none'}
                    />
                  </g>

                  {/* TRONC COMMUN DU FAISCEAU DE HIS */}
                  <path
                    d="M 242 203 L 268 235"
                    fill="none"
                    stroke={cycleStep === 2 ? '#38bdf8' : '#0284c7'}
                    strokeWidth={cycleStep === 2 ? '4.5' : '3'}
                    strokeLinecap="round"
                    filter={cycleStep === 2 ? 'url(#neonPulse)' : 'none'}
                  />

                  {/* BRANCHE DROITE DU FAISCEAU DE HIS */}
                  <path
                    d="M 268 235 C 265 270, 260 310, 245 345"
                    fill="none"
                    stroke={cycleStep === 2 ? '#38bdf8' : '#0284c7'}
                    strokeWidth={cycleStep === 2 ? '3.5' : '2.5'}
                    strokeLinecap="round"
                  />

                  {/* BRANCHE GAUCHE DU FAISCEAU DE HIS */}
                  <path
                    d="M 268 235 C 275 275, 285 315, 305 355"
                    fill="none"
                    stroke={cycleStep === 2 ? '#38bdf8' : '#0284c7'}
                    strokeWidth={cycleStep === 2 ? '3.5' : '2.5'}
                    strokeLinecap="round"
                  />

                  {/* RÉSEAU DE PURKINJE (Fibres arborescentes remontant dans les ventricules) */}
                  <g
                    stroke={cycleStep === 2 ? '#22c55e' : '#15803d'}
                    strokeWidth={cycleStep === 2 ? '2.5' : '1.5'}
                    strokeLinecap="round"
                    fill="none"
                    filter={cycleStep === 2 ? 'url(#neonPulse)' : 'none'}
                  >
                    {/* Purkinje Ventricule Droit */}
                    <path d="M 245 345 C 220 330, 195 300, 185 265" />
                    <path d="M 230 335 C 205 315, 185 285, 180 250" />
                    <path d="M 240 348 C 215 350, 190 325, 178 280" />

                    {/* Purkinje Ventricule Gauche */}
                    <path d="M 305 355 C 335 345, 365 315, 380 265" />
                    <path d="M 315 345 C 345 325, 375 290, 385 250" />
                    <path d="M 300 365 C 330 365, 360 335, 375 285" />
                  </g>

                  {/* Flèches de contraction systolique ventriculaire (QRS) */}
                  {cycleStep === 2 && (
                    <g fill="#22c55e" stroke="#15803d" strokeWidth="1">
                      {/* Remontée de l'apex vers la base */}
                      <path d="M 200 300 L 200 270 L 195 275 M 200 270 L 205 275" stroke="#facc15" strokeWidth="2.5" />
                      <path d="M 360 300 L 360 270 L 355 275 M 360 270 L 365 275" stroke="#facc15" strokeWidth="2.5" />
                    </g>
                  )}

                  {/* ── 7. LÉGENDES ANATOMIQUES CLAIRES & INTÉRACTIVES ── */}
                  {/* Nœud Sinusal Label */}
                  <line x1="178" y1="148" x2="105" y2="120" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
                  <rect x="25" y="105" width="85" height="26" rx="6" fill="#fff" stroke="#f59e0b" strokeWidth="1.5" />
                  <text x="67" y="122" fill="#b45309" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Nœud Sinusal
                  </text>

                  {/* Nœud AV Label */}
                  <line x1="238" y1="198" x2="135" y2="215" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
                  <rect x="55" y="202" width="75" height="26" rx="6" fill="#fff" stroke="#eab308" strokeWidth="1.5" />
                  <text x="92" y="219" fill="#854d0e" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Nœud AV
                  </text>

                  {/* Faisceau de His Label */}
                  <line x1="270" y1="240" x2="415" y2="190" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
                  <rect x="415" y="177" width="95" height="26" rx="6" fill="#fff" stroke="#0284c7" strokeWidth="1.5" />
                  <text x="462" y="194" fill="#0369a1" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Faisceau de His
                  </text>

                  {/* Fibres de Purkinje Label */}
                  <line x1="375" y1="285" x2="425" y2="330" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2 2" />
                  <rect x="420" y="318" width="105" height="26" rx="6" fill="#fff" stroke="#16a34a" strokeWidth="1.5" />
                  <text x="472" y="335" fill="#15803d" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Fibres de Purkinje
                  </text>
                </svg>
              </div>

              {/* Statut de l'étape courante (Feedback dynamique) */}
              <div className="mt-3 bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1 font-bold">
                  <span className="text-slate-500 uppercase tracking-wider text-[11px]">Étape active :</span>
                  <span className="text-rose-700">
                    {cycleStep === 0 && '① Diastole Générale (Remplissage passif des cavités • 0,40 s)'}
                    {cycleStep === 1 && '② Systole Auriculaire (Onde P • Contraction des oreillettes • 0,10 s)'}
                    {cycleStep === 2 && '③ Systole Ventriculaire (Complexe QRS • Éjection puissante • 0,30 s)'}
                    {cycleStep === 3 && '④ Repolarisation Ventriculaire (Onde T • Relâchement du myocarde)'}
                  </span>
                </div>
              </div>

              {/* Info bulle au survol d'un nœud */}
              {hoveredNode && (
                <div className="mt-2 p-2.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-950 font-medium animate-fadeIn">
                  {hoveredNode === 'sinusal' &&
                    'Nœud Sinusal (Keith-Flack) : Pace-maker principal à 70-80 dépolarisations/min. Impose son rythme à tout le myocarde.'}
                  {hoveredNode === 'av' &&
                    'Nœud Auriculo-Ventriculaire (Aschoff-Tawara) : Ralentit l’influx de 0,1 s pour laisser aux oreillettes le temps de se vider.'}
                </div>
              )}
            </div>

            {/* Tracé ECG & Contrôles */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              {/* Tracé ECG interactif */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-rose-700 uppercase tracking-wider">
                    Tracé ECG Synchronisé (Dérivation DII)
                  </span>
                  <span className="text-[10px] bg-white border border-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded shadow-sm">
                    {heartRate} bpm
                  </span>
                </div>

                <div className="relative w-full h-36 bg-white rounded-xl border border-slate-200 p-2 overflow-hidden flex items-center justify-center shadow-inner">
                  <svg viewBox="0 0 300 100" className="w-full h-full">
                    {/* Grille millimétrée claire */}
                    <defs>
                      <pattern id="gridLight2" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#f1f5f9" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="300" height="100" fill="url(#gridLight2)" />

                    {/* Ligne isoélectrique et onde P-QRS-T */}
                    <path
                      d="M 10 50 L 50 50 Q 65 30 80 50 L 100 50 L 105 60 L 115 10 L 125 75 L 130 50 L 160 50 Q 185 35 210 50 L 290 50"
                      fill="none"
                      stroke="#059669"
                      strokeWidth="2.5"
                    />

                    {/* Curseur temporel dynamique */}
                    <line
                      x1={cycleStep === 0 ? 30 : cycleStep === 1 ? 70 : cycleStep === 2 ? 115 : 185}
                      y1="5"
                      x2={cycleStep === 0 ? 30 : cycleStep === 1 ? 70 : cycleStep === 2 ? 115 : 185}
                      y2="95"
                      stroke="#e11d48"
                      strokeWidth="2.5"
                      strokeDasharray="2 2"
                    />

                    {/* Point lumineux sur la courbe */}
                    <circle
                      cx={cycleStep === 0 ? 30 : cycleStep === 1 ? 70 : cycleStep === 2 ? 115 : 185}
                      cy={cycleStep === 0 ? 50 : cycleStep === 1 ? 40 : cycleStep === 2 ? 10 : 42}
                      r="4"
                      fill="#e11d48"
                      className="animate-ping"
                    />

                    {/* Labels des ondes */}
                    <text x="70" y="25" fill="#e11d48" fontSize="11" fontWeight="bold">P</text>
                    <text x="112" y="8" fill="#0284c7" fontSize="11" fontWeight="bold">R</text>
                    <text x="100" y="70" fill="#64748b" fontSize="9" fontWeight="bold">Q</text>
                    <text x="127" y="85" fill="#64748b" fontSize="9" fontWeight="bold">S</text>
                    <text x="185" y="28" fill="#d97706" fontSize="11" fontWeight="bold">T</text>
                  </svg>
                </div>

                <div className="grid grid-cols-3 gap-1.5 mt-2.5 text-[10px] text-center font-medium">
                  <div
                    className={`p-2 rounded-lg border transition-all ${
                      cycleStep === 1
                        ? 'bg-rose-50 border-rose-300 ring-1 ring-rose-400 font-bold'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <span className="text-rose-700">Onde P</span><br />Oreillettes (0,08s)
                  </div>
                  <div
                    className={`p-2 rounded-lg border transition-all ${
                      cycleStep === 2
                        ? 'bg-sky-50 border-sky-300 ring-1 ring-sky-400 font-bold'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <span className="text-sky-700">QRS</span><br />Ventricules (0,08s)
                  </div>
                  <div
                    className={`p-2 rounded-lg border transition-all ${
                      cycleStep === 3
                        ? 'bg-amber-50 border-amber-300 ring-1 ring-amber-400 font-bold'
                        : 'bg-white border-slate-200'
                    }`}
                  >
                    <span className="text-amber-700">Onde T</span><br />Repolarisation
                  </div>
                </div>
              </div>

              {/* Contrôleur Fréquence */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">Fréquence Cardiaque (FC) :</span>
                  <span className="font-black text-rose-700 text-sm">{heartRate} bpm</span>
                </div>
                <input
                  type="range"
                  min="45"
                  max="150"
                  value={heartRate}
                  onChange={(e) => setHeartRate(Number(e.target.value))}
                  className="w-full accent-rose-600 cursor-pointer"
                />
                <div className="flex flex-wrap justify-between items-center gap-2 pt-1">
                  <button
                    onClick={() => setIsPlayingCycle(!isPlayingCycle)}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                  >
                    {isPlayingCycle ? 'Mettre en Pause' : 'Reprendre le Battement'}
                  </button>
                  <span className="text-[11px] text-slate-600 font-bold bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                    Débit estimé : {((heartRate * 70) / 1000).toFixed(1)} L/min
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2 CONTENT : LIGATURES DE STANNIUS */}
      {activeTab === 'stannius' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {(['temoin', 'ligature1', 'ligature2', 'ligature3'] as StanniusLigature[]).map((stateKey) => (
              <button
                key={stateKey}
                onClick={() => setStanniusState(stateKey)}
                className={`p-3 rounded-2xl border text-left transition-all ${
                  stanniusState === stateKey
                    ? 'border-rose-500 bg-rose-50/80 text-rose-950 shadow-sm ring-2 ring-rose-500/20'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                <div className="text-[10px] font-black text-rose-700 uppercase mb-1">
                  {stateKey === 'temoin' && 'Témoin'}
                  {stateKey === 'ligature1' && '1ère Ligature'}
                  {stateKey === 'ligature2' && '2ème Ligature'}
                  {stateKey === 'ligature3' && '3ème Ligature'}
                </div>
                <div className="text-xs font-bold truncate">{STANNIUS_DETAILS[stateKey].title}</div>
              </button>
            ))}
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
              <h4 className="text-base font-black text-slate-900">{STANNIUS_DETAILS[stanniusState].title}</h4>
              <span className="text-xs bg-white text-slate-700 font-semibold px-3 py-1 rounded-full border border-slate-200 shadow-sm">
                {STANNIUS_DETAILS[stanniusState].manipulation}
              </span>
            </div>

            {/* Tableau des rythmes observés */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm">
                <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Sinus Veineux</span>
                <span className="text-xs font-black text-rose-700">
                  {STANNIUS_DETAILS[stanniusState].sinusRythme}
                </span>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm">
                <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Oreillettes</span>
                <span className="text-xs font-black text-amber-700">
                  {STANNIUS_DETAILS[stanniusState].oreilletteRythme}
                </span>
              </div>
              <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm">
                <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1">Ventricule</span>
                <span className="text-xs font-black text-emerald-700">
                  {STANNIUS_DETAILS[stanniusState].ventriculeRythme}
                </span>
              </div>
            </div>

            {/* Analyse Bac Sénégal */}
            <div className="bg-white border border-rose-200 rounded-xl p-4 shadow-sm">
              <div className="text-xs font-black text-rose-700 uppercase tracking-wider mb-1.5">
                Interprétation Conforme au Barème Baccalauréat Sénégalais
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {STANNIUS_DETAILS[stanniusState].explicationBac}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3 CONTENT : INEXCITABILITÉ & EXTRASYSTOLE */}
      {activeTab === 'inexcitabilite' && (
        <div className="space-y-6">
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h4 className="text-base font-black text-slate-900">
                  Épreuve d&apos;Inexcitabilité Périodique du Myocarde (Loi de Marey)
                </h4>
                <p className="text-xs text-slate-600 mt-1">
                  Appliquez une stimulation électrique supraliminaire à différents moments du cardiogramme.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStimTiming('systole')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    stimTiming === 'systole'
                      ? 'border-rose-500 bg-rose-50 text-rose-800 shadow-sm'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  Pendant la Systole
                </button>
                <button
                  onClick={() => setStimTiming('diastole')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    stimTiming === 'diastole'
                      ? 'border-emerald-500 bg-emerald-50 text-emerald-800 shadow-sm'
                      : 'border-slate-200 bg-white text-slate-600'
                  }`}
                >
                  Pendant la Diastole
                </button>
              </div>
            </div>

            {/* Bouton de stimulation */}
            <div className="flex justify-center pt-2">
              <button
                onClick={handleStimulation}
                disabled={stimActive}
                className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-md ${
                  stimActive
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30 hover:scale-[1.02]'
                }`}
              >
                {stimActive ? 'Stimulation en cours...' : 'Envoyer Choc Électrique Supraliminaire'}
              </button>
            </div>

            {/* Tracé Mécanogramme */}
            <div className="relative w-full h-44 bg-white rounded-2xl border border-slate-200 p-3 overflow-hidden flex items-center justify-center shadow-inner">
              <svg viewBox="0 0 400 120" className="w-full h-full">
                {/* Ligne de base */}
                <line x1="0" y1="90" x2="400" y2="90" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" />

                {/* Secousse normale 1 */}
                <path d="M 20 90 Q 50 20 80 90" fill="none" stroke="#64748b" strokeWidth="2.5" />
                <text x="50" y="105" fill="#475569" fontSize="9" fontWeight="600" textAnchor="middle">Battement normal</text>

                {/* Deuxième battement normal ou avec extrasystole */}
                {curveTrace === 'normal' && (
                  <>
                    <path d="M 120 90 Q 150 20 180 90" fill="none" stroke="#64748b" strokeWidth="2.5" />
                    <path d="M 220 90 Q 250 20 280 90" fill="none" stroke="#64748b" strokeWidth="2.5" />
                  </>
                )}

                {curveTrace === 'refractaire' && (
                  <>
                    {/* Battement normal inchangé malgré la stimulation */}
                    <path d="M 120 90 Q 150 20 180 90" fill="none" stroke="#e11d48" strokeWidth="3" />
                    {/* Éclair stimulation pendant systole */}
                    <path d="M 148 10 L 152 25 L 146 25 L 150 40" stroke="#d97706" strokeWidth="2.5" fill="none" />
                    <text x="150" y="8" fill="#d97706" fontSize="9" textAnchor="middle" fontWeight="bold">CHOC (Systole)</text>
                    <path d="M 220 90 Q 250 20 280 90" fill="none" stroke="#64748b" strokeWidth="2.5" />
                  </>
                )}

                {curveTrace === 'extrasystole' && (
                  <>
                    {/* Premier battement */}
                    <path d="M 120 90 Q 150 20 180 90" fill="none" stroke="#64748b" strokeWidth="2.5" />
                    {/* Choc en diastole */}
                    <path d="M 198 60 L 202 75 L 196 75 L 200 88" stroke="#d97706" strokeWidth="2.5" fill="none" />
                    <text x="200" y="55" fill="#d97706" fontSize="9" textAnchor="middle" fontWeight="bold">CHOC (Diastole)</text>
                    {/* Extrasystole anticipée */}
                    <path d="M 195 90 Q 215 30 235 90" fill="none" stroke="#059669" strokeWidth="3" />
                    <text x="215" y="25" fill="#059669" fontSize="9" textAnchor="middle" fontWeight="bold">Extrasystole</text>
                    {/* Long repos compensateur */}
                    <line x1="235" y1="90" x2="310" y2="90" stroke="#0284c7" strokeWidth="3" />
                    <text x="272" y="105" fill="#0284c7" fontSize="9" textAnchor="middle" fontWeight="bold">Repos compensateur</text>
                    {/* Battement normal suivant */}
                    <path d="M 310 90 Q 340 20 370 90" fill="none" stroke="#64748b" strokeWidth="2.5" />
                  </>
                )}
              </svg>
            </div>

            {/* Bilan scientifique */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed shadow-sm">
              {curveTrace === 'refractaire' ? (
                <div>
                  <span className="font-bold text-rose-700 block mb-1">
                    Période Réfractaire Absolue (Systole) :
                  </span>
                  Le choc appliqué pendant la systole ne produit aucun effet mécanique. Le myocarde est totalement inexcitable.
                  Cette propriété fondamentale rend le cœur <span className="text-slate-900 font-bold">infatigable et intétanisable</span>.
                </div>
              ) : curveTrace === 'extrasystole' ? (
                <div>
                  <span className="font-bold text-emerald-700 block mb-1">
                    Extrasystole Ventriculaire & Repos Compensateur (Diastole) :
                  </span>
                  Le choc en période diastolique déclenche une contraction anticipée (extrasystole). Elle est obligatoirement
                  suivie d&apos;une pause plus longue appelée <span className="text-slate-900 font-bold">repos compensateur</span>,
                  car l&apos;influx normal suivant tombe pendant la période réfractaire de l&apos;extrasystole.
                </div>
              ) : (
                <div className="text-slate-500">
                  Sélectionnez le moment d&apos;excitation (systole ou diastole) puis envoyez le choc pour observer l&apos;enregistrement mécanique.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
