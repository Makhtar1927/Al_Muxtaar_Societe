'use client';

import React, { useState, useEffect } from 'react';
import MathRenderer from '@/components/course/math-renderer';

export default function B2CardiaqueInteractiveLab() {
  const [activeTab, setActiveTab] = useState<'automatisme' | 'stannius' | 'inexcitabilite'>('automatisme');

  // --- TAB 1: AUTOMATISME & CYCLE CARDIAQUE ---
  const [isPlayingCycle, setIsPlayingCycle] = useState<boolean>(true);
  const [cycleStep, setCycleStep] = useState<number>(0); // 0: Diastole, 1: Onde P (Systole A), 2: QRS (Systole V), 3: Onde T (Repol)
  const [heartRate, setHeartRate] = useState<number>(75); // bpm

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
      manipulation: 'Aucune ligature. Cœur perfusé au liquide de Ringer.',
      sinusRythme: '60 batt/min (Pace-maker actif)',
      oreilletteRythme: '60 batt/min (Synchrone)',
      ventriculeRythme: '60 batt/min (Synchrone)',
      explicationBac:
        'Le nœud sinusal (sinus veineux) génère l’impulsion initiale qui est transmise aux oreillettes puis aux ventricules. Le rythme est uniforme.',
    },
    ligature1: {
      title: '1ère Ligature de Stannius (Sinuso-auriculaire)',
      manipulation: 'Fil noué sur le sillon sinuso-auriculaire isolant le sinus veineux des oreillettes.',
      sinusRythme: '60 batt/min (Continue de battre à son rythme propre)',
      oreilletteRythme: 'Arrêt temporaire puis reprise lente à 30-40 batt/min',
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
        'Le ventricule possède un centre idioventriculaire (réseau sous-endocardique de Purkinje) capable d’automatisme résiduel, mais à fréquence très basse. Confirmation du gradient d’automatisme décroissant.',
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
  const [curveTrace, setCurveTrace] = useState<string>('normal'); // 'normal', 'refractaire', 'extrasystole'

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
    <div className="w-full bg-slate-950 border border-slate-800 rounded-3xl p-4 sm:p-7 text-slate-100 shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-widest bg-rose-500/20 text-rose-400 px-2.5 py-0.5 rounded-full border border-rose-500/30">
              Labo Virtuel SVT B2.1
            </span>
            <span className="text-xs text-slate-400 font-medium">Physiologie Cardiovasculaire</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Laboratoire d&apos;Électrophysiologie Cardiaque
          </h2>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-xl self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
          <span>Simulateur Bac S2</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
        <button
          onClick={() => setActiveTab('automatisme')}
          className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all text-center ${
            activeTab === 'automatisme'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <div className="truncate">Révolution & ECG</div>
          <div className="text-[9px] font-normal opacity-75 hidden sm:block">Propagation & Ondes</div>
        </button>

        <button
          onClick={() => setActiveTab('stannius')}
          className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all text-center ${
            activeTab === 'stannius'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <div className="truncate">Stannius (Grenouille)</div>
          <div className="text-[9px] font-normal opacity-75 hidden sm:block">Ligatures & Tissu Nodal</div>
        </button>

        <button
          onClick={() => setActiveTab('inexcitabilite')}
          className={`py-2.5 px-2 rounded-xl text-xs font-bold transition-all text-center ${
            activeTab === 'inexcitabilite'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
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
            {/* Visualisation SVG Cœur & Conduction */}
            <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                  Coupe Schématique de la Conduction Cardiaque
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-full">
                  Temps de cycle : {(60 / heartRate).toFixed(2)} s
                </span>
              </div>

              {/* Heart SVG */}
              <div className="relative w-full aspect-[4/3] bg-slate-950/80 rounded-xl border border-slate-800/80 flex items-center justify-center p-3 overflow-hidden">
                <svg viewBox="0 0 400 300" className="w-full h-full max-h-[260px]">
                  {/* Silhouette du cœur */}
                  <path
                    d="M 200 70 C 130 10, 50 70, 70 160 C 90 230, 200 280, 200 280 C 200 280, 310 230, 330 160 C 350 70, 270 10, 200 70 Z"
                    fill={cycleStep === 1 ? '#4c1d95' : cycleStep === 2 ? '#881337' : '#1e293b'}
                    stroke="#334155"
                    strokeWidth="3"
                    className="transition-colors duration-300"
                  />

                  {/* Septum interventriculaire */}
                  <line x1="200" y1="120" x2="200" y2="270" stroke="#475569" strokeWidth="4" />
                  <line x1="120" y1="120" x2="280" y2="120" stroke="#475569" strokeWidth="3" strokeDasharray="4 4" />

                  {/* Cavités annotations */}
                  <text x="140" y="95" fill="#94a3b8" fontSize="11" textAnchor="middle">Oreillette D</text>
                  <text x="260" y="95" fill="#94a3b8" fontSize="11" textAnchor="middle">Oreillette G</text>
                  <text x="145" y="190" fill="#94a3b8" fontSize="11" textAnchor="middle">Ventricule D</text>
                  <text x="255" y="190" fill="#94a3b8" fontSize="11" textAnchor="middle">Ventricule G</text>

                  {/* Nœud Sinusal (Keith-Flack) */}
                  <circle
                    cx="120"
                    cy="70"
                    r={cycleStep === 1 ? "10" : "7"}
                    fill={cycleStep === 1 ? "#fb7185" : "#e11d48"}
                    stroke="#fff"
                    strokeWidth="2"
                    className="transition-all duration-200"
                  />
                  <text x="75" y="60" fill="#fda4af" fontSize="10" fontWeight="bold">Nœud Sinusal</text>

                  {/* Nœud Auriculo-Ventriculaire (Aschoff-Tawara) */}
                  <circle
                    cx="195"
                    cy="125"
                    r={cycleStep === 1 || cycleStep === 2 ? "8" : "6"}
                    fill={cycleStep === 2 ? "#fbbf24" : "#d97706"}
                    stroke="#fff"
                    strokeWidth="1.5"
                  />
                  <text x="135" y="130" fill="#fde68a" fontSize="9">Nœud AV</text>

                  {/* Faisceau de His */}
                  <path
                    d="M 195 130 L 200 160 L 175 220 M 200 160 L 225 220"
                    fill="none"
                    stroke={cycleStep === 2 ? "#38bdf8" : "#0284c7"}
                    strokeWidth={cycleStep === 2 ? "4" : "2.5"}
                    strokeLinecap="round"
                  />

                  {/* Réseau de Purkinje */}
                  <path
                    d="M 175 220 L 150 240 M 175 220 L 140 200 M 225 220 L 250 240 M 225 220 L 260 200"
                    fill="none"
                    stroke={cycleStep === 2 ? "#4ade80" : "#16a34a"}
                    strokeWidth={cycleStep === 2 ? "3" : "1.5"}
                  />
                  <text x="285" y="240" fill="#86efac" fontSize="9">Purkinje</text>
                </svg>
              </div>

              {/* Statut de l'étape courante */}
              <div className="mt-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="flex items-center justify-between text-xs font-bold text-slate-300">
                  <span>Étape active :</span>
                  <span className="text-rose-400">
                    {cycleStep === 0 && 'Diastole Générale (Remplissage auriculaire et ventriculaire)'}
                    {cycleStep === 1 && 'Systole Auriculaire (Onde P - Dépolarisation des oreillettes)'}
                    {cycleStep === 2 && 'Systole Ventriculaire (Complexe QRS - Éjection dans les artères)'}
                    {cycleStep === 3 && 'Repolarisation Ventriculaire (Onde T - Relâchement)'}
                  </span>
                </div>
              </div>
            </div>

            {/* Tracé ECG & Contrôles */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              {/* Tracé ECG interactif */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4">
                <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block mb-2">
                  Tracé ECG Synchronisé (Dérivation DII)
                </span>
                <div className="relative w-full h-36 bg-slate-950 rounded-xl border border-slate-800 p-2 overflow-hidden flex items-center justify-center">
                  <svg viewBox="0 0 300 100" className="w-full h-full">
                    {/* Grille millimétrée */}
                    <defs>
                      <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="300" height="100" fill="url(#grid)" />

                    {/* Ligne isoélectrique et onde P-QRS-T */}
                    <path
                      d="M 10 50 L 50 50 Q 65 30 80 50 L 100 50 L 105 60 L 115 10 L 125 75 L 130 50 L 160 50 Q 185 35 210 50 L 290 50"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="2.5"
                    />

                    {/* Curseur de temps */}
                    <line
                      x1={cycleStep === 0 ? 30 : cycleStep === 1 ? 70 : cycleStep === 2 ? 115 : 185}
                      y1="5"
                      x2={cycleStep === 0 ? 30 : cycleStep === 1 ? 70 : cycleStep === 2 ? 115 : 185}
                      y2="95"
                      stroke="#f43f5e"
                      strokeWidth="2"
                      strokeDasharray="2 2"
                    />

                    {/* Labels des ondes */}
                    <text x="70" y="25" fill="#fda4af" fontSize="10" fontWeight="bold">P</text>
                    <text x="112" y="8" fill="#38bdf8" fontSize="10" fontWeight="bold">R</text>
                    <text x="100" y="70" fill="#94a3b8" fontSize="8">Q</text>
                    <text x="127" y="85" fill="#94a3b8" fontSize="8">S</text>
                    <text x="185" y="28" fill="#fde047" fontSize="10" fontWeight="bold">T</text>
                  </svg>
                </div>
                <div className="grid grid-cols-3 gap-1.5 mt-2 text-[10px] text-center">
                  <div className="bg-slate-950 p-1.5 rounded border border-slate-800/80">
                    <span className="font-bold text-rose-400">Onde P</span> : Oreillettes (0,08 s)
                  </div>
                  <div className="bg-slate-950 p-1.5 rounded border border-slate-800/80">
                    <span className="font-bold text-sky-400">QRS</span> : Ventricules (0,08 s)
                  </div>
                  <div className="bg-slate-950 p-1.5 rounded border border-slate-800/80">
                    <span className="font-bold text-amber-400">Onde T</span> : Repolarisation (0,16 s)
                  </div>
                </div>
              </div>

              {/* Contrôleur Fréquence */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-300">Fréquence Cardiaque (FC) :</span>
                  <span className="font-black text-rose-400 text-sm">{heartRate} bpm</span>
                </div>
                <input
                  type="range"
                  min="45"
                  max="150"
                  value={heartRate}
                  onChange={(e) => setHeartRate(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
                <div className="flex justify-between items-center pt-1">
                  <button
                    onClick={() => setIsPlayingCycle(!isPlayingCycle)}
                    className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-rose-600/30"
                  >
                    {isPlayingCycle ? 'Mettre en Pause' : 'Reprendre le Battement'}
                  </button>
                  <span className="text-[11px] text-slate-400 font-medium">
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
                    ? 'border-rose-500 bg-rose-950/40 text-white shadow-md shadow-rose-950/50'
                    : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-[10px] font-bold text-rose-400 uppercase mb-1">
                  {stateKey === 'temoin' && 'Témoin'}
                  {stateKey === 'ligature1' && '1ère Ligature'}
                  {stateKey === 'ligature2' && '2ème Ligature'}
                  {stateKey === 'ligature3' && '3ème Ligature'}
                </div>
                <div className="text-xs font-black truncate">{STANNIUS_DETAILS[stateKey].title}</div>
              </button>
            ))}
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
              <h3 className="text-base font-black text-white">{STANNIUS_DETAILS[stanniusState].title}</h3>
              <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full">
                {STANNIUS_DETAILS[stanniusState].manipulation}
              </span>
            </div>

            {/* Tableau des rythmes observés */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Sinus Veineux</span>
                <span className="text-xs font-bold text-rose-400">
                  {STANNIUS_DETAILS[stanniusState].sinusRythme}
                </span>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Oreillettes</span>
                <span className="text-xs font-bold text-amber-400">
                  {STANNIUS_DETAILS[stanniusState].oreilletteRythme}
                </span>
              </div>
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3">
                <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Ventricule</span>
                <span className="text-xs font-bold text-emerald-400">
                  {STANNIUS_DETAILS[stanniusState].ventriculeRythme}
                </span>
              </div>
            </div>

            {/* Analyse Bac Sénégal */}
            <div className="bg-slate-950 border border-rose-500/30 rounded-xl p-4">
              <div className="text-xs font-black text-rose-400 uppercase tracking-wider mb-2">
                Interprétation Conforme au Barème Baccalauréat Sénégalais
              </div>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {STANNIUS_DETAILS[stanniusState].explicationBac}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3 CONTENT : INEXCITABILITÉ & EXTRASYSTOLE */}
      {activeTab === 'inexcitabilite' && (
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-black text-white">
                  Épreuve d&apos;Inexcitabilité Périodique du Myocarde (Loi de Marey)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Appliquez une stimulation électrique supraliminaire à différents moments de la secousse cardiaque.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setStimTiming('systole')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    stimTiming === 'systole'
                      ? 'border-rose-500 bg-rose-500/20 text-rose-300'
                      : 'border-slate-800 bg-slate-950 text-slate-400'
                  }`}
                >
                  Pendant la Systole
                </button>
                <button
                  onClick={() => setStimTiming('diastole')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    stimTiming === 'diastole'
                      ? 'border-emerald-500 bg-emerald-500/20 text-emerald-300'
                      : 'border-slate-800 bg-slate-950 text-slate-400'
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
                className={`px-6 py-3 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-lg ${
                  stimActive
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/40 hover:scale-[1.02]'
                }`}
              >
                {stimActive ? 'Stimulation en cours...' : 'Envoyer Choc Électrique Supraliminaire'}
              </button>
            </div>

            {/* Tracé Mécanogramme */}
            <div className="relative w-full h-44 bg-slate-950 rounded-2xl border border-slate-800 p-3 overflow-hidden flex items-center justify-center">
              <svg viewBox="0 0 400 120" className="w-full h-full">
                {/* Ligne de base */}
                <line x1="0" y1="90" x2="400" y2="90" stroke="#334155" strokeWidth="1" strokeDasharray="4 4" />

                {/* Secousse normale 1 */}
                <path d="M 20 90 Q 50 20 80 90" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
                <text x="50" y="105" fill="#64748b" fontSize="9" textAnchor="middle">Battement normal</text>

                {/* Deuxième battement normal ou avec extrasystole */}
                {curveTrace === 'normal' && (
                  <>
                    <path d="M 120 90 Q 150 20 180 90" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
                    <path d="M 220 90 Q 250 20 280 90" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
                  </>
                )}

                {curveTrace === 'refractaire' && (
                  <>
                    {/* Battement normal inchangé malgré la stimulation */}
                    <path d="M 120 90 Q 150 20 180 90" fill="none" stroke="#f43f5e" strokeWidth="3" />
                    {/* Éclair stimulation pendant systole */}
                    <path d="M 148 10 L 152 25 L 146 25 L 150 40" stroke="#fde047" strokeWidth="2" fill="none" />
                    <text x="150" y="8" fill="#fde047" fontSize="9" textAnchor="middle" fontWeight="bold">CHOC (Systole)</text>
                    <path d="M 220 90 Q 250 20 280 90" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
                  </>
                )}

                {curveTrace === 'extrasystole' && (
                  <>
                    {/* Premier battement */}
                    <path d="M 120 90 Q 150 20 180 90" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
                    {/* Choc en diastole */}
                    <path d="M 198 60 L 202 75 L 196 75 L 200 88" stroke="#fde047" strokeWidth="2" fill="none" />
                    <text x="200" y="55" fill="#fde047" fontSize="9" textAnchor="middle" fontWeight="bold">CHOC (Diastole)</text>
                    {/* Extrasystole anticipée */}
                    <path d="M 195 90 Q 215 30 235 90" fill="none" stroke="#22c55e" strokeWidth="3" />
                    <text x="215" y="25" fill="#4ade80" fontSize="9" textAnchor="middle" fontWeight="bold">Extrasystole</text>
                    {/* Long repos compensateur */}
                    <line x1="235" y1="90" x2="310" y2="90" stroke="#38bdf8" strokeWidth="3" />
                    <text x="272" y="105" fill="#38bdf8" fontSize="9" textAnchor="middle" fontWeight="bold">Repos compensateur</text>
                    {/* Battement normal suivant */}
                    <path d="M 310 90 Q 340 20 370 90" fill="none" stroke="#94a3b8" strokeWidth="2.5" />
                  </>
                )}
              </svg>
            </div>

            {/* Bilan scientifique */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
              {curveTrace === 'refractaire' ? (
                <div>
                  <span className="font-bold text-rose-400 block mb-1">
                    Période Réfractaire Absolue (Systole) :
                  </span>
                  Le choc appliqué pendant la systole ne produit aucun effet mécanique. Le cœur est totalement inexcitable.
                  Cette propriété vitale rend le cœur <span className="text-white font-bold">infatigable et intétanisable</span>.
                </div>
              ) : curveTrace === 'extrasystole' ? (
                <div>
                  <span className="font-bold text-emerald-400 block mb-1">
                    Extrasystole Ventriculaire & Repos Compensateur (Diastole) :
                  </span>
                  Le choc en période diastolique (période réfractaire relative) déclenche une contraction anticipée
                  (extrasystole). Elle est obligatoirement suivie d&apos;une pause plus longue appelée{' '}
                  <span className="text-white font-bold">repos compensateur</span>, car l&apos;influx physiologique normal suivant tombe pendant la période réfractaire de l&apos;extrasystole.
                </div>
              ) : (
                <div className="text-slate-400">
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
