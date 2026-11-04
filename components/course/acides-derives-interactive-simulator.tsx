'use client';

import React, { useState, useEffect } from 'react';
import {
  Flame,
  Droplets,
  TestTube,
  Sparkles,
  RotateCcw,
  Beaker,
  Layers,
  Thermometer,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Play,
  Pause,
  ArrowRight,
  Filter,
} from 'lucide-react';
import MathRenderer from '@/components/course/math-renderer';

interface EsterificationReactants {
  acidName: string;
  alcoholName: string;
  alcoholClasse: '1' | '2' | '3';
  esterName: string;
  esterFormula: string;
  esterOdor: string;
  limitYieldEquimolar: number; // 67, 60 ou 5%
  constantK: number;
}

const REACTANTS_OPTIONS: EsterificationReactants[] = [
  {
    acidName: 'Acide éthanoïque (CH₃COOH)',
    alcoholName: 'Éthanol (CH₃CH₂OH — Alcool 1°)',
    alcoholClasse: '1',
    esterName: 'Éthanoate d\'éthyle',
    esterFormula: 'CH₃—COO—CH₂—CH₃',
    esterOdor: 'Odeur fruitée agréable (solvant vernis/poire)',
    limitYieldEquimolar: 67,
    constantK: 4.0,
  },
  {
    acidName: 'Acide éthanoïque (CH₃COOH)',
    alcoholName: 'Propan-2-ol ((CH₃)₂CHOH — Alcool 2°)',
    alcoholClasse: '2',
    esterName: 'Éthanoate de 1-méthyléthyle (isopropyle)',
    esterFormula: 'CH₃—COO—CH(CH₃)₂',
    esterOdor: 'Odeur fruitée douce',
    limitYieldEquimolar: 60,
    constantK: 2.25,
  },
  {
    acidName: 'Acide éthanoïque (CH₃COOH)',
    alcoholName: '2-méthylpropan-2-ol ((CH₃)₃COH — Alcool 3°)',
    alcoholClasse: '3',
    esterName: 'Éthanoate de tert-butyle',
    esterFormula: 'CH₃—COO—C(CH₃)₃',
    esterOdor: 'Odeur camphrée très faible',
    limitYieldEquimolar: 5,
    constantK: 0.005,
  },
];

type C3Workshop = 'reflux' | 'lechatelier' | 'chlorure' | 'saponification' | 'aromes';

export default function AcidesDerivesInteractiveSimulator() {
  const [activeWorkshop, setActiveWorkshop] = useState<C3Workshop>('reflux');

  // 🧪 Atelier 1 : Chauffage à Reflux
  const [selectedReactantIdx, setSelectedReactantIdx] = useState<number>(0);
  const [hasCatalyst, setHasCatalyst] = useState<boolean>(false);
  const [hasBoilingStones, setHasBoilingStones] = useState<boolean>(false);
  const [heatingActive, setHeatingActive] = useState<boolean>(false);
  const [currentYield, setCurrentYield] = useState<number>(0);
  const [refluxMinutes, setRefluxMinutes] = useState<number>(0);

  // ⚗️ Atelier 2 : Le Chatelier (Déplacement équilibre)
  const [optimizationMode, setOptimizationMode] = useState<'standard' | 'excess_acid' | 'dean_stark'>('standard');
  const [deanStarkWaterVolume, setDeanStarkWaterVolume] = useState<number>(0);

  // 💥 Atelier 3 : Chlorure d'acyle
  const [reagentType, setReagentType] = useState<'acide' | 'chlorure' | 'anhydride'>('chlorure');
  const [chlorureReacted, setChlorureReacted] = useState<boolean>(false);

  // 🧼 Atelier 4 : Saponification & Relargage
  const [saponificationTemp, setSaponificationTemp] = useState<number>(20);
  const [isHeatingSoap, setIsHeatingSoap] = useState<boolean>(false);
  const [saltWaterAdded, setSaltWaterAdded] = useState<boolean>(false);
  const [soapFiltered, setSoapFiltered] = useState<boolean>(false);

  // 🍌 Atelier 5 : Défi Arômes
  const [mysteryIdx, setMysteryIdx] = useState<number>(0);
  const [mysteryAnswer, setMysteryAnswer] = useState<number | null>(null);
  const [mysteryConfirmed, setMysteryConfirmed] = useState<boolean>(false);

  const reactant = REACTANTS_OPTIONS[selectedReactantIdx];

  // Simulation de l'avancement du reflux (Atelier 1)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (heatingActive) {
      interval = setInterval(() => {
        setRefluxMinutes((prev) => prev + 5);
        setCurrentYield((prev) => {
          const maxYield = reactant.limitYieldEquimolar;
          // Sans catalyseur, la réaction est extrêmement lente
          const step = hasCatalyst ? 4 : 0.8;
          const next = prev + step;
          if (next >= maxYield) {
            setHeatingActive(false);
            return maxYield;
          }
          return Number(next.toFixed(1));
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [heatingActive, reactant.limitYieldEquimolar, hasCatalyst]);

  const handleStartReflux = () => {
    setHeatingActive(true);
  };

  const handleResetReflux = () => {
    setHeatingActive(false);
    setCurrentYield(0);
    setRefluxMinutes(0);
  };

  // Gestion du chauffage du savon (Atelier 4)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isHeatingSoap) {
      timer = setInterval(() => {
        setSaponificationTemp((prev) => {
          if (prev >= 85) {
            setIsHeatingSoap(false);
            return 85;
          }
          return prev + 5;
        });
      }, 150);
    }
    return () => clearInterval(timer);
  }, [isHeatingSoap]);

  return (
    <section className="bg-white rounded-3xl border border-navy/10 p-4 sm:p-7 shadow-sm space-y-6">
      {/* ── EN-TÊTE DE LA PAILLASSE VIRTUELLE C3 ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-bold text-turquoise uppercase tracking-widest">
              Paillasse Virtuelle • Baccalauréat Scientifique S2
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-black text-navy mt-1 flex items-center gap-2">
            <span>Laboratoire d&apos;Estérification & Dérivés d&apos;Acides</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-navy/5 text-navy border border-navy/10">
              C3 Chimie
            </span>
          </h2>
        </div>

        {/* Badges d'état rapide */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-turquoise-light/60 text-turquoise font-mono text-xs px-3 py-1 font-extrabold border border-turquoise/20">
            R—COOH + R&apos;—OH
          </span>
          <span className="rounded-full bg-navy/5 text-navy text-xs px-3 py-1 font-bold">
            {reactant.esterName}
          </span>
          <span className="rounded-full bg-emerald-100 text-emerald-800 text-xs px-3 py-1 font-black border border-emerald-300">
            Plafond Bac : {reactant.limitYieldEquimolar}%
          </span>
        </div>
      </div>

      {/* ── BARRE D'ONGLETS DES 5 ATELIERS EXPÉRIMENTAUX ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5 p-1.5 bg-surface rounded-2xl border border-navy/10">
        <button
          onClick={() => setActiveWorkshop('reflux')}
          className={`py-2 px-2.5 text-center rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeWorkshop === 'reflux'
              ? 'bg-white text-navy shadow-sm border border-navy/10'
              : 'text-navy/60 hover:text-navy'
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>1. Montage à Reflux</span>
        </button>

        <button
          onClick={() => setActiveWorkshop('lechatelier')}
          className={`py-2 px-2.5 text-center rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeWorkshop === 'lechatelier'
              ? 'bg-white text-navy shadow-sm border border-navy/10'
              : 'text-navy/60 hover:text-navy'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span>2. Optimiser (98%)</span>
        </button>

        <button
          onClick={() => setActiveWorkshop('chlorure')}
          className={`py-2 px-2.5 text-center rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeWorkshop === 'chlorure'
              ? 'bg-white text-navy shadow-sm border border-navy/10'
              : 'text-navy/60 hover:text-navy'
          }`}
        >
          <TestTube className="w-3.5 h-3.5 text-rose-600 shrink-0" />
          <span>3. Dérivés (100%)</span>
        </button>

        <button
          onClick={() => setActiveWorkshop('saponification')}
          className={`py-2 px-2.5 text-center rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeWorkshop === 'saponification'
              ? 'bg-white text-navy shadow-sm border border-navy/10'
              : 'text-navy/60 hover:text-navy'
          }`}
        >
          <Droplets className="w-3.5 h-3.5 text-purple-600 shrink-0" />
          <span>4. Savon & Relargage</span>
        </button>

        <button
          onClick={() => setActiveWorkshop('aromes')}
          className={`col-span-2 sm:col-span-1 py-2 px-2.5 text-center rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
            activeWorkshop === 'aromes'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm'
              : 'bg-amber-100/70 text-amber-900 hover:bg-amber-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span>5. Défi Arômes Bac</span>
        </button>
      </div>

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* ATELIER 1 : MONTAGE À REFLUX & RENDEMENTS SELON LA CLASSE       */}
      {/* ════════════════════════════════════════════════════════════════ */}
      {activeWorkshop === 'reflux' && (
        <div className="grid gap-6 lg:grid-cols-12 items-center">
          {/* Verrerie complète de chauffage à reflux en SVG */}
          <div className="lg:col-span-6 bg-gradient-to-b from-slate-50 to-slate-100/70 rounded-2xl border border-navy/10 p-5 flex flex-col items-center justify-center relative shadow-inner min-h-[400px]">
            {/* Vapeurs de reflux montant dans le réfrigérant */}
            {heatingActive && (
              <div className="absolute top-16 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center animate-pulse">
                <span className="text-[10px] font-bold text-blue-700 bg-white/90 px-2 py-0.5 rounded-full border border-blue-200 shadow-xs">
                  Condensation des vapeurs (Reflux)
                </span>
              </div>
            )}

            {/* Schéma vectoriel du montage à reflux */}
            <div className="relative">
              <svg width="150" height="320" viewBox="0 0 150 320" className="drop-shadow-md">
                {/* 1. Réfrigérant à boules (Allihn) */}
                <rect x="62" y="15" width="26" height="150" rx="3" fill="#F8FAFC" stroke="#334155" strokeWidth="2.5" />
                {/* Boules de condensation */}
                <ellipse cx="75" cy="45" rx="10" ry="12" fill="#E2E8F0" stroke="#334155" strokeWidth="1.5" />
                <ellipse cx="75" cy="80" rx="10" ry="12" fill="#E2E8F0" stroke="#334155" strokeWidth="1.5" />
                <ellipse cx="75" cy="115" rx="10" ry="12" fill="#E2E8F0" stroke="#334155" strokeWidth="1.5" />
                <ellipse cx="75" cy="150" rx="10" ry="12" fill="#E2E8F0" stroke="#334155" strokeWidth="1.5" />

                {/* Arrivée et sortie d'eau du réfrigérant */}
                <line x1="88" y1="140" x2="110" y2="140" stroke="#0284C7" strokeWidth="3" />
                <text x="115" y="143" fontSize="8" fill="#0284C7" fontWeight="bold">Entrée eau</text>
                <line x1="88" y1="35" x2="110" y2="35" stroke="#0284C7" strokeWidth="3" />
                <text x="115" y="38" fontSize="8" fill="#0284C7" fontWeight="bold">Sortie eau</text>

                {/* 2. Ballon à fond rond */}
                <path
                  d="M65 165 L65 185 C40 190 30 215 30 240 C30 270 50 285 75 285 C100 285 120 270 120 240 C120 215 110 190 85 185 L85 165 Z"
                  fill="#F8FAFC"
                  stroke="#334155"
                  strokeWidth="2.5"
                />

                {/* Solution acide + alcool en ébullition */}
                <path
                  d="M38 245 C38 270 52 282 75 282 C98 282 112 270 112 245 C95 242 55 242 38 245 Z"
                  fill={heatingActive ? '#FCD34D' : '#93C5FD'}
                  fillOpacity="0.85"
                  className="transition-colors duration-500"
                />

                {/* Grains de pierre ponce au fond */}
                {hasBoilingStones && (
                  <g>
                    <polygon points="65,278 68,274 72,278" fill="#475569" />
                    <polygon points="78,279 81,275 84,279" fill="#475569" />
                    <polygon points="56,277 59,273 62,277" fill="#475569" />
                  </g>
                )}

                {/* Bulles d'ébullition */}
                {heatingActive && (
                  <g className="animate-bounce">
                    <circle cx="68" cy="260" r="2.5" fill="#FFFFFF" opacity="0.8" />
                    <circle cx="82" cy="252" r="3" fill="#FFFFFF" opacity="0.8" />
                    <circle cx="60" cy="255" r="2" fill="#FFFFFF" opacity="0.8" />
                  </g>
                )}

                {/* 3. Chauffe-ballon électrique */}
                <path
                  d="M20 250 C20 305 45 315 75 315 C105 315 130 305 130 250 Z"
                  fill="none"
                  stroke="#64748B"
                  strokeWidth="4"
                />
                <rect x="25" y="275" width="100" height="35" rx="6" fill="#1E293B" />
                <circle cx="50" cy="292" r="3" fill={heatingActive ? '#EF4444' : '#64748B'} className={heatingActive ? 'animate-pulse' : ''} />
                <text x="60" y="295" fontSize="8" fill="#F8FAFC" fontWeight="bold">Chauffe-ballon</text>
              </svg>
            </div>

            {/* Jauge de rendement dynamique */}
            <div className="w-full mt-4 bg-white p-3.5 rounded-xl border border-navy/10 space-y-2 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-navy/70">Rendement d&apos;estérification en direct :</span>
                <span className="font-mono text-base font-black text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-lg border border-emerald-200">
                  r = {currentYield}%
                </span>
              </div>
              <div className="w-full bg-navy/10 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-300"
                  style={{ width: `${(currentYield / 100) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-navy/50 font-bold">
                <span>0% (Départ)</span>
                <span>Plafond équilibre : {reactant.limitYieldEquimolar}% ({reactant.alcoholClasse}°)</span>
                <span>100% (Impossible en direct)</span>
              </div>
            </div>
          </div>

          {/* Console de contrôle et choix des réactifs */}
          <div className="lg:col-span-6 space-y-4">
            {/* Choix de la classe de l'alcool */}
            <div className="bg-surface/50 rounded-2xl border border-navy/10 p-5 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-navy/70 block">
                Étape 1 : Choisir la classe d&apos;alcool à estérifier
              </span>
              <div className="space-y-1.5">
                {REACTANTS_OPTIONS.map((item, idx) => (
                  <button
                    key={idx}
                    disabled={heatingActive}
                    onClick={() => {
                      setSelectedReactantIdx(idx);
                      handleResetReflux();
                    }}
                    className={`w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between text-xs ${
                      selectedReactantIdx === idx
                        ? 'bg-navy text-white border-navy shadow-sm'
                        : 'bg-white hover:bg-surface text-navy border-navy/10'
                    }`}
                  >
                    <div>
                      <span className="font-black block">{item.alcoholName}</span>
                      <span className="text-[10px] opacity-70">Donne l&apos;ester : {item.esterName}</span>
                    </div>
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                        selectedReactantIdx === idx
                          ? 'bg-white/20 text-white'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      Plafond {item.limitYieldEquimolar}%
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Ingrédients du laboratoire (Catalyseur & Pierre ponce) */}
            <div className="bg-white rounded-2xl border border-navy/10 p-4 space-y-3 shadow-sm text-xs">
              <span className="font-bold uppercase tracking-wider text-navy/70 block text-[11px]">
                Étape 2 : Préparation du mélange dans le ballon
              </span>

              <div className="grid grid-cols-2 gap-2">
                <button
                  disabled={heatingActive}
                  onClick={() => setHasCatalyst(!hasCatalyst)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    hasCatalyst
                      ? 'bg-blue-50 border-blue-400 text-blue-900 font-bold'
                      : 'bg-surface border-navy/5 text-navy hover:bg-surface-muted'
                  }`}
                >
                  <span className="block text-xs font-black">{hasCatalyst ? '✓ H₂SO₄ ajouté' : '+ Ajouter H₂SO₄'}</span>
                  <span className="text-[10px] opacity-70">Catalyseur acide</span>
                </button>

                <button
                  disabled={heatingActive}
                  onClick={() => setHasBoilingStones(!hasBoilingStones)}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    hasBoilingStones
                      ? 'bg-amber-50 border-amber-400 text-amber-900 font-bold'
                      : 'bg-surface border-navy/5 text-navy hover:bg-surface-muted'
                  }`}
                >
                  <span className="block text-xs font-black">{hasBoilingStones ? '✓ Pierre ponce OK' : '+ Pierre ponce'}</span>
                  <span className="text-[10px] opacity-70">Régule l&apos;ébullition</span>
                </button>
              </div>
            </div>

            {/* Commandes du chauffe-ballon */}
            <div className="flex gap-2">
              <button
                onClick={handleStartReflux}
                disabled={heatingActive || currentYield >= reactant.limitYieldEquimolar}
                className="flex-1 py-3 bg-navy hover:bg-navy/90 text-white font-black text-xs rounded-xl shadow-md disabled:opacity-40 transition-all flex items-center justify-center gap-2"
              >
                <Flame className="w-4 h-4 text-amber-400" />
                <span>{heatingActive ? 'Chauffage à reflux en cours...' : 'Chauffer à reflux & observer l\'équilibre'}</span>
              </button>

              <button
                onClick={handleResetReflux}
                className="px-4 py-3 bg-white border border-navy/10 text-navy font-bold text-xs rounded-xl hover:bg-surface"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Règle d'or de l'épreuve de physique-chimie */}
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
              <span className="font-bold flex items-center gap-1 text-[11px]">
                <span>✓</span> Règle Officielle Baccalauréat S2 :
              </span>
              <p>
                Le rendement d&apos;estérification directe équimolaire est strictement plafonné par la classe de l&apos;alcool : <strong>67% pour un alcool 1°</strong> (K = 4), <strong>60% pour un 2°</strong> (K = 2,25) et <strong>5% pour un 3°</strong>. Le chauffage accélère l&apos;obtention de l&apos;état d&apos;équilibre sans JAMAIS déplacer le rendement final car la réaction est athermique !
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* ATELIER 2 : PRINCIPE DE LE CHATELIER (ATTEINDRE 98% EN DIRECT) */}
      {/* ════════════════════════════════════════════════════════════════ */}
      {activeWorkshop === 'lechatelier' && (
        <div className="space-y-6">
          <div className="bg-surface/50 rounded-2xl border border-navy/10 p-5 space-y-4">
            <div>
              <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest block">
                Optimisation Industrielle & Déplacement d&apos;Équilibre
              </span>
              <h3 className="text-base sm:text-lg font-black text-navy">
                Comment dépasser le plafond des 67% au laboratoire ?
              </h3>
            </div>

            {/* Sélecteur de technique d'optimisation */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setOptimizationMode('standard')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  optimizationMode === 'standard'
                    ? 'bg-navy text-white border-navy shadow-md'
                    : 'bg-white text-navy border-navy/10 hover:bg-surface'
                }`}
              >
                <span className="text-xs font-black block">1. Mélange Équimolaire (1:1)</span>
                <span className="text-[11px] opacity-70 block mt-1">1 mol acide + 1 mol alcool</span>
                <span className="inline-block mt-2 font-mono text-sm font-black text-amber-400">
                  Rendement = 67%
                </span>
              </button>

              <button
                onClick={() => setOptimizationMode('excess_acid')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  optimizationMode === 'excess_acid'
                    ? 'bg-navy text-white border-navy shadow-md'
                    : 'bg-white text-navy border-navy/10 hover:bg-surface'
                }`}
              >
                <span className="text-xs font-black block">2. Excès de Réactif (3:1)</span>
                <span className="text-[11px] opacity-70 block mt-1">3 mol d&apos;acide pour 1 mol d&apos;alcool</span>
                <span className="inline-block mt-2 font-mono text-sm font-black text-emerald-400">
                  Rendement = 85%
                </span>
              </button>

              <button
                onClick={() => setOptimizationMode('dean_stark')}
                className={`p-4 rounded-xl border text-left transition-all ${
                  optimizationMode === 'dean_stark'
                    ? 'bg-navy text-white border-navy shadow-md'
                    : 'bg-white text-navy border-navy/10 hover:bg-surface'
                }`}
              >
                <span className="text-xs font-black block">3. Appareil de Dean-Stark</span>
                <span className="text-[11px] opacity-70 block mt-1">Élimination de l&apos;eau en continu</span>
                <span className="inline-block mt-2 font-mono text-sm font-black text-emerald-400">
                  Rendement = 98% (Quasi-total)
                </span>
              </button>
            </div>

            {/* Schéma explicatif du quotient réactionnel Qr */}
            <div className="bg-white p-5 rounded-2xl border border-navy/10 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-navy/70 block">
                Explication par le Quotient Réactionnel Q_r :
              </span>
              <div className="bg-surface p-3.5 rounded-xl border border-navy/5 font-mono text-center text-sm font-bold text-navy">
                <MathRenderer content="$$Q_r = \frac{[\text{Ester}] \cdot [\text{H}_2\text{O}]}{[\text{Acide}] \cdot [\text{Alcool}]}$$" />
              </div>
              <p className="text-xs text-navy-light leading-relaxed">
                {optimizationMode === 'standard' && (
                  <span>À l&apos;équilibre, Q_r = K = 4. La réaction directe et la réaction inverse s&apos;annulent à r = 67%.</span>
                )}
                {optimizationMode === 'excess_acid' && (
                  <span>En augmentant le dénominateur [Acide], Q_r devient inférieur à K. D&apos;après le principe de Le Chatelier, le système évolue dans le sens direct : le rendement grimpe à 85% !</span>
                )}
                {optimizationMode === 'dean_stark' && (
                  <span>En piégeant l&apos;eau liquide au fur et à mesure, [H₂O] reste quasi-nulle dans le milieu. Ainsi Q_r reste constamment inférieur à K et l&apos;estérification se poursuit jusqu&apos;à épuisement total de l&apos;alcool (98%) !</span>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* ATELIER 3 : DÉRIVÉS RÉACTIFS (100% TOTAL SANS ÉQUILIBRE)       */}
      {/* ════════════════════════════════════════════════════════════════ */}
      {activeWorkshop === 'chlorure' && (
        <div className="grid gap-6 lg:grid-cols-12 items-center">
          <div className="lg:col-span-6 bg-gradient-to-b from-slate-50 to-slate-100 rounded-2xl border border-navy/10 p-6 flex flex-col items-center justify-center relative shadow-inner min-h-[350px]">
            {/* Vapeurs de HCl */}
            {chlorureReacted && reagentType === 'chlorure' && (
              <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center animate-pulse">
                <span className="text-3xl filter blur-[1px]">💨</span>
                <span className="text-[10px] font-black text-rose-800 bg-white/95 px-2.5 py-0.5 rounded-full border border-rose-300 shadow-xs">
                  Vapeurs acides de HCl(g)
                </span>
              </div>
            )}

            <svg width="120" height="230" viewBox="0 0 120 230" className="drop-shadow-md">
              <path d="M35 15 L35 180 Q35 205 60 205 Q85 205 85 180 L85 15" fill="none" stroke="#334155" strokeWidth="3" />
              <ellipse cx="60" cy="15" rx="26" ry="5" fill="#F8FAFC" stroke="#334155" strokeWidth="2" />
              <path
                d="M38 100 L38 180 Q38 202 60 202 Q82 202 82 180 L82 100 Q60 106 38 100 Z"
                fill={chlorureReacted ? '#A7F3D0' : '#E2E8F0'}
                fillOpacity="0.85"
                className="transition-colors duration-500"
              />
            </svg>

            <div className="mt-3 text-center">
              <span className={`text-xs font-black px-4 py-1 rounded-full ${chlorureReacted ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-surface text-navy/50'}`}>
                {chlorureReacted ? '✓ Ester pur formé à 100% de rendement' : 'Prêt à mélanger'}
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="bg-surface/50 rounded-2xl border border-navy/10 p-5 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-navy/70 block">
                Choix du dérivé d&apos;acide acyle :
              </span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setReagentType('chlorure');
                    setChlorureReacted(false);
                  }}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all text-left ${
                    reagentType === 'chlorure'
                      ? 'bg-navy text-white border-navy shadow-sm'
                      : 'bg-white text-navy border-navy/10 hover:bg-surface'
                  }`}
                >
                  <span className="block font-black">Chlorure d&apos;acyle</span>
                  <span className="text-[10px] opacity-70">R—COCl (Très réactif)</span>
                </button>

                <button
                  onClick={() => {
                    setReagentType('anhydride');
                    setChlorureReacted(false);
                  }}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all text-left ${
                    reagentType === 'anhydride'
                      ? 'bg-navy text-white border-navy shadow-sm'
                      : 'bg-white text-navy border-navy/10 hover:bg-surface'
                  }`}
                >
                  <span className="block font-black">Anhydride d&apos;acide</span>
                  <span className="text-[10px] opacity-70">(RCO)₂O (Sans HCl)</span>
                </button>
              </div>

              <button
                onClick={() => setChlorureReacted(true)}
                disabled={chlorureReacted}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl shadow-md disabled:opacity-40 transition-all flex items-center justify-center gap-2"
              >
                <span>Mélanger avec l&apos;alcool et déclencher l&apos;estérification</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl border border-navy/10 p-4 space-y-2 text-xs leading-relaxed text-navy-light shadow-sm">
              <span className="font-bold text-navy block text-[11px] uppercase tracking-wider">
                Avantages par rapport à l&apos;acide carboxylique :
              </span>
              <p>
                - Réaction <strong>TOTALE (non limitée)</strong> : pas de double flèche.<br />
                - Réaction <strong>RAPIDE et EXOTHERMIQUE</strong> à froid.<br />
                - Rendement quantitatif de <strong>100%</strong> même sur les alcools secondaires et tertiaires !
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* ATELIER 4 : SAPONIFICATION & RELARGAGE DU SAVON DANS LE SEL     */}
      {/* ════════════════════════════════════════════════════════════════ */}
      {activeWorkshop === 'saponification' && (
        <div className="grid gap-6 lg:grid-cols-12 items-center">
          {/* Bécher avec saponification et précipité blanc de savon */}
          <div className="lg:col-span-6 bg-gradient-to-b from-slate-50 to-slate-100 rounded-2xl border border-navy/10 p-5 flex flex-col items-center justify-center relative shadow-inner min-h-[380px]">
            {/* Bécher SVG */}
            <div className="relative">
              <svg width="150" height="230" viewBox="0 0 150 230" className="drop-shadow-lg">
                {/* Bécher gradué */}
                <path d="M25 20 L25 200 Q25 215 45 215 L105 215 Q125 215 125 200 L125 20" fill="none" stroke="#334155" strokeWidth="3" />
                <path d="M20 20 L30 20" stroke="#334155" strokeWidth="3" />
                <path d="M120 20 L130 20" stroke="#334155" strokeWidth="3" />

                {/* Graduations bécher */}
                <line x1="30" y1="60" x2="45" y2="60" stroke="#94A3B8" strokeWidth="1.5" />
                <line x1="30" y1="100" x2="50" y2="100" stroke="#94A3B8" strokeWidth="2" />
                <line x1="30" y1="140" x2="45" y2="140" stroke="#94A3B8" strokeWidth="1.5" />
                <line x1="30" y1="180" x2="50" y2="180" stroke="#94A3B8" strokeWidth="2" />

                {/* Solution réactionnelle (mélange huile + soude) */}
                <path
                  d="M28 90 L28 200 Q28 212 45 212 L105 212 Q122 212 122 200 L122 90 Z"
                  fill={saltWaterAdded ? '#E2E8F0' : '#FEF08A'}
                  fillOpacity="0.85"
                  className="transition-colors duration-700"
                />

                {/* Pain de savon flottant après relargage */}
                {saltWaterAdded && (
                  <g className="animate-fade-in">
                    <rect x="35" y="85" width="80" height="22" rx="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
                    <text x="50" y="100" fontSize="9" fontWeight="bold" fill="#334155">SAVON PUR</text>
                  </g>
                )}
              </svg>

              {/* Indicateur thermomètre */}
              <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 bg-white px-2.5 py-1 rounded-xl border border-navy/15 shadow-sm text-center">
                <span className="text-[8px] font-bold text-navy/40 block">T_mélange</span>
                <span className={`font-mono text-xs font-black ${saponificationTemp > 50 ? 'text-rose-600' : 'text-navy'}`}>
                  {saponificationTemp} °C
                </span>
              </div>
            </div>

            <div className="mt-4 text-center">
              <span className={`text-xs font-black px-4 py-1.5 rounded-full border ${saltWaterAdded ? 'bg-purple-100 text-purple-900 border-purple-300' : 'bg-amber-100 text-amber-900 border-amber-300'}`}>
                {saltWaterAdded ? '✨ Relargage terminé : Le savon solide surnage au-dessus du glycérol' : 'Émulsion réactionnelle (Huile + Soude)'}
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="bg-surface/50 rounded-2xl border border-navy/10 p-5 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-navy/70 block">
                Étapes de fabrication du savon au laboratoire :
              </span>

              <div className="space-y-2">
                <button
                  onClick={() => setIsHeatingSoap(!isHeatingSoap)}
                  className={`w-full py-2.5 px-3 rounded-xl border text-xs font-bold flex items-center justify-between transition-all ${
                    saponificationTemp >= 80 ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-white border-navy/10 text-navy'
                  }`}
                >
                  <span>1. Chauffer le mélange huile + soude</span>
                  <span className="font-mono text-[10px]">{saponificationTemp >= 80 ? '✓ Réaction totale' : 'Cliquer pour chauffer'}</span>
                </button>

                <button
                  onClick={() => setSaltWaterAdded(true)}
                  disabled={saponificationTemp < 80 || saltWaterAdded}
                  className="w-full py-2.5 px-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-black disabled:opacity-40 transition-all flex items-center justify-between shadow-xs"
                >
                  <span>2. Effectuer le Relargage (Eau salée saturée NaCl)</span>
                  <span className="text-[10px] font-mono">Fait précipiter le savon</span>
                </button>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  onClick={() => {
                    setSaponificationTemp(20);
                    setSaltWaterAdded(false);
                    setSoapFiltered(false);
                  }}
                  className="text-[11px] font-bold text-navy/50 hover:text-navy"
                >
                  Réinitialiser l&apos;expérience
                </button>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-navy/10 p-4 space-y-2 text-xs text-navy-light shadow-sm">
              <span className="font-bold text-navy block text-[11px] uppercase tracking-wider">
                Bilan stœchiométrique officiel Bac :
              </span>
              <p className="font-mono font-bold text-navy text-center py-1 bg-surface rounded-lg">
                1 Triester + 3 NaOH → 1 Glycérol + 3 Savons
              </p>
              <p className="text-[11px]">
                Le savon est insoluble dans l&apos;eau salée concentrée car les ions Na⁺ en excès déplacent l&apos;équilibre de solubilité (effet d&apos;ion commun) et font précipiter le carboxylate de sodium sous forme solide.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* ATELIER 5 : DÉFI ARÔMES & ESTERS MYSTÈRES DU BACCALAURÉAT       */}
      {/* ════════════════════════════════════════════════════════════════ */}
      {activeWorkshop === 'aromes' && (
        <div className="bg-gradient-to-br from-amber-500/10 via-white to-amber-500/5 rounded-2xl border border-amber-300 p-5 sm:p-7 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200/60 pb-4">
            <div>
              <span className="text-[10px] font-black text-amber-800 uppercase tracking-widest block">
                Épreuve Pratique Virtuelle • Baccalauréat Scientifique
              </span>
              <h3 className="text-base sm:text-lg font-black text-navy mt-0.5">
                Défi Arômes : Identifier l&apos;Ester Inconnu
              </h3>
            </div>
            <button
              onClick={() => {
                setMysteryIdx((prev) => (prev + 1) % REACTANTS_OPTIONS.length);
                setMysteryAnswer(null);
                setMysteryConfirmed(false);
              }}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500 text-white hover:bg-amber-600 shadow-sm flex items-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Changer d&apos;Échantillon</span>
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-12 items-center">
            <div className="lg:col-span-5 bg-white rounded-2xl border border-navy/10 p-5 space-y-3 shadow-inner text-center">
              <span className="text-4xl block">🧪</span>
              <h4 className="text-sm font-black text-navy">Échantillon Inconnu N°{mysteryIdx + 1}</h4>
              <div className="bg-surface p-3 rounded-xl border border-navy/5 text-xs space-y-1 text-left">
                <span className="text-[10px] text-navy/50 font-bold block uppercase">Indices de laboratoire :</span>
                <p>• Formule brute : <strong>C₄H₈O₂</strong></p>
                <p>• Résultat d&apos;estérification équimolaire : <strong>Plafond atteint à {REACTANTS_OPTIONS[mysteryIdx].limitYieldEquimolar}%</strong></p>
                <p>• Constante K mesurée : <strong>K = {REACTANTS_OPTIONS[mysteryIdx].constantK}</strong></p>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-3">
              <span className="text-xs font-bold text-navy block">
                D&apos;après le rendement limite et la constante d&apos;équilibre K, quelle est la classe de l&apos;alcool utilisé ?
              </span>

              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map((idx) => (
                  <button
                    key={idx}
                    disabled={mysteryConfirmed}
                    onClick={() => setMysteryAnswer(idx)}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all ${
                      mysteryAnswer === idx
                        ? 'bg-navy text-white border-navy shadow-sm'
                        : 'bg-white text-navy border-navy/10 hover:bg-surface'
                    }`}
                  >
                    <span className="block font-black">{REACTANTS_OPTIONS[idx].alcoholClasse}° Classe</span>
                    <span className="text-[10px] opacity-70">r = {REACTANTS_OPTIONS[idx].limitYieldEquimolar}%</span>
                  </button>
                ))}
              </div>

              {!mysteryConfirmed ? (
                <button
                  disabled={mysteryAnswer === null}
                  onClick={() => setMysteryConfirmed(true)}
                  className="w-full py-3 bg-turquoise hover:bg-turquoise/90 text-white font-black text-xs rounded-xl shadow-md disabled:opacity-40 transition-all"
                >
                  Valider mon diagnostic
                </button>
              ) : (
                <div
                  className={`p-4 rounded-xl border text-xs font-bold flex items-center gap-2 ${
                    mysteryAnswer === mysteryIdx
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : 'bg-rose-50 border-rose-300 text-rose-900'
                  }`}
                >
                  {mysteryAnswer === mysteryIdx ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>
                        Bravo ! Diagnostic exact : il s&apos;agit bien d&apos;un alcool de classe {REACTANTS_OPTIONS[mysteryIdx].alcoholClasse}° conduisant à {REACTANTS_OPTIONS[mysteryIdx].esterName} (r = {REACTANTS_OPTIONS[mysteryIdx].limitYieldEquimolar}%).
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      <span>
                        Erreur : Le rendement de {REACTANTS_OPTIONS[mysteryIdx].limitYieldEquimolar}% correspond strictement à un alcool de classe {REACTANTS_OPTIONS[mysteryIdx].alcoholClasse}°.
                      </span>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

