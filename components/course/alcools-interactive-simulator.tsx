'use client';

import React, { useState, useEffect } from 'react';
import {
  Flame,
  Droplets,
  TestTube,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Play,
  Pause,
  HelpCircle,
  Beaker,
  Thermometer,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface AlcoholItem {
  id: string;
  name: string;
  brute: string;
  carbonCount: number;
  molMass: number;
  classe: '1' | '2' | '3';
  classeLabel: 'Primaire (1°)' | 'Secondaire (2°)' | 'Tertiaire (3°)';
  semiDeveloppee: string;
  topologique: string;
  iupacBreakdown: {
    chain: string;
    position: number;
    substituants: string;
  };
  tEb: number;
  alcaneCorrespondant: {
    name: string;
    brute: string;
    tEb: number;
  };
  solubilityGPer100mL: number | 'Infinie';
  lucasDelaySec: number; // 0 = immédiat, 300 = 5min, -1 = pas de trouble à froid
  lucasObservation: string;
  wolofTip: string;
}

const ALCOHOL_DATA: AlcoholItem[] = [
  {
    id: 'ethanol',
    name: 'Éthanol',
    brute: 'C₂H₆O',
    carbonCount: 2,
    molMass: 46.07,
    classe: '1',
    classeLabel: 'Primaire (1°)',
    semiDeveloppee: 'CH₃—CH₂—OH',
    topologique: 'CH3-CH2-OH',
    iupacBreakdown: {
      chain: 'Éthane (2 carbones)',
      position: 1,
      substituants: 'Aucun (chaîne linéaire)',
    },
    tEb: 78.4,
    alcaneCorrespondant: {
      name: 'Propane (M = 44 g/mol)',
      brute: 'C₃H₈',
      tEb: -42.1,
    },
    solubilityGPer100mL: 'Infinie',
    lucasDelaySec: -1,
    lucasObservation: 'Aucun trouble à froid même après 1 heure. Solution parfaitement limpide.',
    wolofTip: 'Classe 1 la : benn carbone rek la fonctionnel bi lakkalool. Test de Lucas bi du am genn trouble ci sedd bi.',
  },
  {
    id: 'methanol',
    name: 'Méthanol',
    brute: 'CH₄O',
    carbonCount: 1,
    molMass: 32.04,
    classe: '1',
    classeLabel: 'Primaire (1°)',
    semiDeveloppee: 'CH₃—OH',
    topologique: 'CH3-OH',
    iupacBreakdown: {
      chain: 'Méthane (1 carbone)',
      position: 1,
      substituants: 'Aucun',
    },
    tEb: 64.7,
    alcaneCorrespondant: {
      name: 'Éthane (M = 30 g/mol)',
      brute: 'C₂H₆',
      tEb: -88.6,
    },
    solubilityGPer100mL: 'Infinie',
    lucasDelaySec: -1,
    lucasObservation: 'Aucun trouble à froid. Alcool primaire par convention internationale.',
    wolofTip: 'Méthanol amul bénn carbone voisin, wanté ci convention classe 1 (primaire) lañ ko jappé.',
  },
  {
    id: 'propan-1-ol',
    name: 'Propan-1-ol',
    brute: 'C₃H₈O',
    carbonCount: 3,
    molMass: 60.1,
    classe: '1',
    classeLabel: 'Primaire (1°)',
    semiDeveloppee: 'CH₃—CH₂—CH₂—OH',
    topologique: 'CH3-CH2-CH2-OH',
    iupacBreakdown: {
      chain: 'Propane (3 carbones)',
      position: 1,
      substituants: 'Aucun',
    },
    tEb: 97.2,
    alcaneCorrespondant: {
      name: 'Butane (M = 58 g/mol)',
      brute: 'C₄H₁₀',
      tEb: -0.5,
    },
    solubilityGPer100mL: 'Infinie',
    lucasDelaySec: -1,
    lucasObservation: 'Aucun trouble à froid.',
    wolofTip: '-OH bi dafa nekk ci caat gi (carbone 1), motax mu doon primaire.',
  },
  {
    id: 'propan-2-ol',
    name: 'Propan-2-ol',
    brute: 'C₃H₈O',
    carbonCount: 3,
    molMass: 60.1,
    classe: '2',
    classeLabel: 'Secondaire (2°)',
    semiDeveloppee: 'CH₃—CH(OH)—CH₃',
    topologique: '(CH3)2-CH-OH',
    iupacBreakdown: {
      chain: 'Propane (3 carbones)',
      position: 2,
      substituants: 'Groupe -OH sur le carbone n°2',
    },
    tEb: 82.5,
    alcaneCorrespondant: {
      name: 'Butane (M = 58 g/mol)',
      brute: 'C₄H₁₀',
      tEb: -0.5,
    },
    solubilityGPer100mL: 'Infinie',
    lucasDelaySec: 300,
    lucasObservation: 'Trouble laiteux net apparaissant après environ 5 minutes à 20°C.',
    wolofTip: 'Carbone fonctionnel bi ñaari carbone la lakkalool : classe 2 la. Test de Lucas bi 5 minutes lay jël.',
  },
  {
    id: 'butan-1-ol',
    name: 'Butan-1-ol',
    brute: 'C₄H₁₀O',
    carbonCount: 4,
    molMass: 74.12,
    classe: '1',
    classeLabel: 'Primaire (1°)',
    semiDeveloppee: 'CH₃—CH₂—CH₂—CH₂—OH',
    topologique: 'CH3-(CH2)3-OH',
    iupacBreakdown: {
      chain: 'Butane (4 carbones)',
      position: 1,
      substituants: 'Chaîne linéaire, -OH en position 1',
    },
    tEb: 117.7,
    alcaneCorrespondant: {
      name: 'Pentane (M = 72 g/mol)',
      brute: 'C₅H₁₂',
      tEb: 36.1,
    },
    solubilityGPer100mL: 9.1,
    lucasDelaySec: -1,
    lucasObservation: 'Solution limpide à froid. Pas de réaction immédiate.',
    wolofTip: 'Butan-1-ol bi dafa tollu ci limite solubilité bi (9 g ci 100 mL ndox).',
  },
  {
    id: 'butan-2-ol',
    name: 'Butan-2-ol',
    brute: 'C₄H₁₀O',
    carbonCount: 4,
    molMass: 74.12,
    classe: '2',
    classeLabel: 'Secondaire (2°)',
    semiDeveloppee: 'CH₃—CH₂—CH(OH)—CH₃',
    topologique: 'CH3-CH2-CH(OH)-CH3',
    iupacBreakdown: {
      chain: 'Butane (4 carbones)',
      position: 2,
      substituants: 'Groupe -OH sur le carbone n°2',
    },
    tEb: 99.5,
    alcaneCorrespondant: {
      name: 'Pentane (M = 72 g/mol)',
      brute: 'C₅H₁₂',
      tEb: 36.1,
    },
    solubilityGPer100mL: 12.5,
    lucasDelaySec: 300,
    lucasObservation: 'Trouble laiteux après 4 à 5 minutes de repos.',
    wolofTip: 'Secondaire la, carbone fonctionnel bi am na benn éthyle ak benn méthyle ci wetam.',
  },
  {
    id: '2-methylpropan-2-ol',
    name: '2-méthylpropan-2-ol',
    brute: 'C₄H₁₀O',
    carbonCount: 4,
    molMass: 74.12,
    classe: '3',
    classeLabel: 'Tertiaire (3°)',
    semiDeveloppee: '(CH₃)₃C—OH',
    topologique: '(CH3)3-C-OH',
    iupacBreakdown: {
      chain: 'Propane (3 carbones)',
      position: 2,
      substituants: 'Méthyle en 2 et groupe -OH en 2',
    },
    tEb: 82.4,
    alcaneCorrespondant: {
      name: '2-méthylbutane (M = 72 g/mol)',
      brute: 'C₅H₁₂',
      tEb: 27.8,
    },
    solubilityGPer100mL: 'Infinie',
    lucasDelaySec: 15,
    lucasObservation: 'Trouble laiteux immédiat et précipité huileux en moins de 30 secondes !',
    wolofTip: 'Alcool tertiaire la ! Carbocation bi dafa kawe stabilité motax substitution bi gaaw lool ci Lucas.',
  },
  {
    id: 'pentan-1-ol',
    name: 'Pentan-1-ol',
    brute: 'C₅H₁₂O',
    carbonCount: 5,
    molMass: 88.15,
    classe: '1',
    classeLabel: 'Primaire (1°)',
    semiDeveloppee: 'CH₃—(CH₂)₃—CH₂—OH',
    topologique: 'CH3-(CH2)4-OH',
    iupacBreakdown: {
      chain: 'Pentane (5 carbones)',
      position: 1,
      substituants: 'Linéaire à 5 carbones',
    },
    tEb: 137.9,
    alcaneCorrespondant: {
      name: 'Hexane (M = 86 g/mol)',
      brute: 'C₆H₁₄',
      tEb: 68.7,
    },
    solubilityGPer100mL: 2.2,
    lucasDelaySec: -1,
    lucasObservation: 'Pas de trouble à froid. Pratiquement insoluble dans l’eau (2 phases).',
    wolofTip: 'Chaîne carbonée bi dafa gudd (5 carbones) motax du seey ci ndox bi, ñaari phase lay def.',
  },
];

type LabMode = 'structure' | 'thermal' | 'solubility' | 'lucas' | 'mystery';

export default function AlcoolsInteractiveSimulator() {
  const [selectedAlcoholId, setSelectedAlcoholId] = useState<string>('ethanol');
  const [activeMode, setActiveMode] = useState<LabMode>('structure');

  // État Mode 1 : Structure
  const [selectedAtom, setSelectedAtom] = useState<'none' | 'c_func' | 'oh' | 'r_chain'>('none');

  // État Mode 2 : Banc thermique & chauffage
  const [thermalTemp, setThermalTemp] = useState<number>(25);
  const [isBurnerActive, setIsBurnerActive] = useState<boolean>(false);

  // État Mode 3 : Solubilité
  const [waterVolume, setWaterVolume] = useState<number>(20); // mL
  const [isShaking, setIsShaking] = useState<boolean>(false);

  // État Mode 4 : Lucas
  const [lucasReagentAdded, setLucasReagentAdded] = useState<boolean>(false);
  const [lucasSeconds, setLucasSeconds] = useState<number>(0);
  const [lucasTimerRunning, setLucasTimerRunning] = useState<boolean>(false);
  const [lucasSpeed, setLucasSpeed] = useState<number>(1);

  // État Mode 5 : Défi Bac Alcool Mystère
  const [mysteryTarget, setMysteryTarget] = useState<AlcoholItem>(ALCOHOL_DATA[3]);
  const [mysteryUserClass, setMysteryUserClass] = useState<string | null>(null);
  const [mysteryUserAlcoholId, setMysteryUserAlcoholId] = useState<string | null>(null);
  const [mysteryRevealed, setMysteryRevealed] = useState<boolean>(false);

  const alcohol = ALCOHOL_DATA.find((a) => a.id === selectedAlcoholId) || ALCOHOL_DATA[0];

  // Gestion du chauffage automatique
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isBurnerActive) {
      timer = setInterval(() => {
        setThermalTemp((prev) => {
          if (prev >= 140) {
            setIsBurnerActive(false);
            return 140;
          }
          return prev + 2;
        });
      }, 150);
    }
    return () => clearInterval(timer);
  }, [isBurnerActive]);

  // Chronomètre de Lucas avec multiplicateur de vitesse
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (lucasTimerRunning) {
      interval = setInterval(() => {
        setLucasSeconds((prev) => {
          const next = prev + 1;
          if (alcohol.classe === '3' && next >= 30) {
            setLucasTimerRunning(false);
            return 30;
          }
          if (alcohol.classe === '2' && next >= 320) {
            setLucasTimerRunning(false);
            return 320;
          }
          if (alcohol.classe === '1' && next >= 60) {
            setLucasTimerRunning(false);
            return 60;
          }
          return next;
        });
      }, 1000 / lucasSpeed);
    }
    return () => clearInterval(interval);
  }, [lucasTimerRunning, alcohol.classe, lucasSpeed]);

  const handleResetLucas = () => {
    setLucasTimerRunning(false);
    setLucasSeconds(0);
    setLucasReagentAdded(false);
  };

  const handleStartLucas = () => {
    setLucasReagentAdded(true);
    setLucasSeconds(0);
    setLucasTimerRunning(true);
  };

  const handleShakeTube = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 900);
  };

  const handleGenerateMystery = () => {
    const random = ALCOHOL_DATA[Math.floor(Math.random() * ALCOHOL_DATA.length)];
    setMysteryTarget(random);
    setMysteryUserClass(null);
    setMysteryUserAlcoholId(null);
    setMysteryRevealed(false);
    handleResetLucas();
    setThermalTemp(25);
  };

  const isEbullition = thermalTemp >= alcohol.tEb;
  const isAlcaneEbullition = thermalTemp >= alcohol.alcaneCorrespondant.tEb;

  const isTroubled =
    lucasReagentAdded &&
    ((alcohol.classe === '3' && lucasSeconds >= 8) ||
      (alcohol.classe === '2' && lucasSeconds >= 240));

  return (
    <section className="bg-white rounded-3xl border border-navy/10 p-4 sm:p-7 shadow-sm space-y-6">
      {/* ── BARRE SUPÉRIEURE DE LA PAILLASSE VIRTUELLE ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-bold text-turquoise uppercase tracking-widest">
              Paillasse Virtuelle • Bac S2 Sénégal
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-black text-navy mt-1 flex items-center gap-2">
            <span>Simulateur & Laboratoire d&apos;Alcools</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-navy/5 text-navy border border-navy/10">
              C1 Chimie
            </span>
          </h2>
        </div>

        {/* Indicateurs rapides */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-turquoise-light/60 text-turquoise font-mono text-xs px-3 py-1 font-extrabold border border-turquoise/20">
            {alcohol.brute}
          </span>
          <span className="rounded-full bg-navy/5 text-navy font-mono text-xs px-3 py-1 font-bold">
            M = {alcohol.molMass} g/mol
          </span>
          <span
            className={`rounded-full text-xs px-3 py-1 font-black ${
              alcohol.classe === '1'
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : alcohol.classe === '2'
                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                : 'bg-rose-100 text-rose-800 border border-rose-300'
            }`}
          >
            {alcohol.classeLabel}
          </span>
        </div>
      </div>

      {/* ── BARRE D'OUTILS ET ONGLETS DU LABORATOIRE ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5 p-1.5 bg-surface rounded-2xl border border-navy/10">
        <button
          onClick={() => setActiveMode('structure')}
          className={`py-2 px-2.5 text-center rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeMode === 'structure'
              ? 'bg-white text-navy shadow-sm border border-navy/10'
              : 'text-navy/60 hover:text-navy'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-turquoise shrink-0" />
          <span>1. Structure & Atomes</span>
        </button>

        <button
          onClick={() => setActiveMode('thermal')}
          className={`py-2 px-2.5 text-center rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeMode === 'thermal'
              ? 'bg-white text-navy shadow-sm border border-navy/10'
              : 'text-navy/60 hover:text-navy'
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>2. Banc Thermique</span>
        </button>

        <button
          onClick={() => setActiveMode('solubility')}
          className={`py-2 px-2.5 text-center rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeMode === 'solubility'
              ? 'bg-white text-navy shadow-sm border border-navy/10'
              : 'text-navy/60 hover:text-navy'
          }`}
        >
          <Droplets className="w-3.5 h-3.5 text-sky-500 shrink-0" />
          <span>3. Solubilité & Eau</span>
        </button>

        <button
          onClick={() => setActiveMode('lucas')}
          className={`py-2 px-2.5 text-center rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeMode === 'lucas'
              ? 'bg-white text-navy shadow-sm border border-navy/10'
              : 'text-navy/60 hover:text-navy'
          }`}
        >
          <TestTube className="w-3.5 h-3.5 text-purple-600 shrink-0" />
          <span>4. Test de Lucas</span>
        </button>

        <button
          onClick={() => {
            setActiveMode('mystery');
            if (!mysteryTarget) handleGenerateMystery();
          }}
          className={`col-span-2 sm:col-span-1 py-2 px-2.5 text-center rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
            activeMode === 'mystery'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm'
              : 'bg-amber-100/70 text-amber-900 hover:bg-amber-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span>5. Défi Bac Mystère</span>
        </button>
      </div>

      {/* ── SÉLECTEUR MANIABLE D'ALCOOLS (Actif en mode 1, 2, 3, 4) ── */}
      {activeMode !== 'mystery' && (
        <div className="space-y-2 bg-surface/50 p-3 sm:p-4 rounded-2xl border border-navy/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
            <span className="font-bold uppercase tracking-wider text-navy/70 flex items-center gap-1.5">
              <Beaker className="w-3.5 h-3.5 text-turquoise" />
              <span>Flacon en cours d&apos;analyse :</span>
            </span>
            <span className="text-turquoise font-extrabold text-xs">
              {alcohol.name} • Formule {alcohol.semiDeveloppee}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5">
            {ALCOHOL_DATA.map((item) => {
              const isSelected = item.id === selectedAlcoholId;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedAlcoholId(item.id);
                    handleResetLucas();
                    setSelectedAtom('none');
                  }}
                  className={`px-2 py-2 rounded-xl text-center border transition-all flex flex-col items-center justify-center min-w-0 ${
                    isSelected
                      ? 'bg-navy text-white border-navy shadow-sm ring-2 ring-turquoise/40'
                      : 'bg-white hover:bg-surface-muted text-navy border-navy/10'
                  }`}
                >
                  <span className="text-[10px] sm:text-[11px] font-bold truncate w-full">{item.name}</span>
                  <span
                    className={`text-[9px] font-black uppercase mt-0.5 px-1.5 py-0.2 rounded ${
                      item.classe === '1'
                        ? isSelected ? 'bg-emerald-500/30 text-emerald-300' : 'bg-emerald-100 text-emerald-800'
                        : item.classe === '2'
                        ? isSelected ? 'bg-amber-500/30 text-amber-300' : 'bg-amber-100 text-amber-800'
                        : isSelected ? 'bg-rose-500/30 text-rose-300' : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    Classe {item.classe}°
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* MODE 1 : STRUCTURE & ATOMES INTERACTIFS                         */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {activeMode === 'structure' && (
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Visualiseur Moléculaire Interactif */}
          <div className="lg:col-span-7 bg-surface/60 rounded-2xl border border-navy/10 p-4 sm:p-5 flex flex-col justify-between space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-navy/60 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-turquoise" />
                <span>Clique sur une partie de la molécule pour l&apos;analyser :</span>
              </span>
              <span className="text-[11px] text-navy/50 font-medium">Formule semi-développée</span>
            </div>

            {/* Scène de la Molécule avec Boutons Cliquables */}
            <div className="bg-white rounded-2xl border border-navy/10 p-5 min-h-[190px] flex flex-col items-center justify-center relative shadow-inner overflow-hidden">
              {/* Légende interactive */}
              <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-bold pb-4">
                <button
                  onClick={() => setSelectedAtom('c_func')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-all ${
                    selectedAtom === 'c_func'
                      ? 'bg-cyan-100 text-cyan-900 border-cyan-400 font-extrabold shadow-sm'
                      : 'bg-surface text-navy/60 border-navy/5 hover:text-navy'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                  <span>Carbone Fonctionnel</span>
                </button>

                <button
                  onClick={() => setSelectedAtom('oh')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-all ${
                    selectedAtom === 'oh'
                      ? 'bg-rose-100 text-rose-900 border-rose-400 font-extrabold shadow-sm'
                      : 'bg-surface text-navy/60 border-navy/5 hover:text-navy'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  <span>Groupe Hydroxyle (-OH)</span>
                </button>

                <button
                  onClick={() => setSelectedAtom('r_chain')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-all ${
                    selectedAtom === 'r_chain'
                      ? 'bg-indigo-100 text-indigo-900 border-indigo-400 font-extrabold shadow-sm'
                      : 'bg-surface text-navy/60 border-navy/5 hover:text-navy'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                  <span>Chaîne Alkyle (R—)</span>
                </button>
              </div>

              {/* Rendu Moléculaire avec Scroll Horizontal Fluide */}
              <div className="w-full overflow-x-auto py-3 flex items-center justify-center">
                <div className="flex items-center justify-center text-lg sm:text-2xl font-mono font-black min-w-fit px-3">
                  {alcohol.id === 'methanol' && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setSelectedAtom('c_func')}
                        className={`px-3 py-2 rounded-xl border-2 transition-all cursor-pointer ${
                          selectedAtom === 'c_func'
                            ? 'bg-cyan-200 text-cyan-950 border-cyan-500 ring-2 ring-cyan-400 scale-105 shadow-md'
                            : 'bg-cyan-50 text-cyan-900 border-cyan-300'
                        }`}
                      >
                        H₃<span className="text-cyan-700 underline font-extrabold">C</span>
                      </button>
                      <span className="text-navy/30 px-1 font-sans">—</span>
                      <button
                        onClick={() => setSelectedAtom('oh')}
                        className={`px-3 py-2 rounded-xl border-2 transition-all cursor-pointer ${
                          selectedAtom === 'oh'
                            ? 'bg-rose-200 text-rose-950 border-rose-500 ring-2 ring-rose-400 scale-105 shadow-md'
                            : 'bg-rose-50 text-rose-900 border-rose-300'
                        }`}
                      >
                        OH
                      </button>
                    </div>
                  )}

                  {alcohol.id === 'ethanol' && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setSelectedAtom('r_chain')}
                        className={`px-2.5 py-2 rounded-xl border transition-all ${
                          selectedAtom === 'r_chain'
                            ? 'bg-indigo-200 text-indigo-950 border-indigo-500 ring-2 ring-indigo-400 scale-105'
                            : 'bg-indigo-50 text-indigo-900 border-indigo-200'
                        }`}
                      >
                        CH₃
                      </button>
                      <span className="text-navy/30 px-1 font-sans">—</span>
                      <button
                        onClick={() => setSelectedAtom('c_func')}
                        className={`px-3 py-2 rounded-xl border-2 transition-all ${
                          selectedAtom === 'c_func'
                            ? 'bg-cyan-200 text-cyan-950 border-cyan-500 ring-2 ring-cyan-400 scale-105 shadow-md'
                            : 'bg-cyan-50 text-cyan-900 border-cyan-300'
                        }`}
                      >
                        <span className="text-cyan-700 underline font-extrabold">C</span>H₂
                      </button>
                      <span className="text-navy/30 px-1 font-sans">—</span>
                      <button
                        onClick={() => setSelectedAtom('oh')}
                        className={`px-3 py-2 rounded-xl border-2 transition-all ${
                          selectedAtom === 'oh'
                            ? 'bg-rose-200 text-rose-950 border-rose-500 ring-2 ring-rose-400 scale-105 shadow-md'
                            : 'bg-rose-50 text-rose-900 border-rose-300'
                        }`}
                      >
                        OH
                      </button>
                    </div>
                  )}

                  {alcohol.id === 'propan-1-ol' && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setSelectedAtom('r_chain')}
                        className={`px-2.5 py-2 rounded-xl border transition-all ${
                          selectedAtom === 'r_chain'
                            ? 'bg-indigo-200 text-indigo-950 border-indigo-500 ring-2 ring-indigo-400 scale-105'
                            : 'bg-indigo-50 text-indigo-900 border-indigo-200'
                        }`}
                      >
                        CH₃—CH₂
                      </button>
                      <span className="text-navy/30 px-1 font-sans">—</span>
                      <button
                        onClick={() => setSelectedAtom('c_func')}
                        className={`px-3 py-2 rounded-xl border-2 transition-all ${
                          selectedAtom === 'c_func'
                            ? 'bg-cyan-200 text-cyan-950 border-cyan-500 ring-2 ring-cyan-400 scale-105 shadow-md'
                            : 'bg-cyan-50 text-cyan-900 border-cyan-300'
                        }`}
                      >
                        <span className="text-cyan-700 underline font-extrabold">C</span>H₂
                      </button>
                      <span className="text-navy/30 px-1 font-sans">—</span>
                      <button
                        onClick={() => setSelectedAtom('oh')}
                        className={`px-3 py-2 rounded-xl border-2 transition-all ${
                          selectedAtom === 'oh'
                            ? 'bg-rose-200 text-rose-950 border-rose-500 ring-2 ring-rose-400 scale-105 shadow-md'
                            : 'bg-rose-50 text-rose-900 border-rose-300'
                        }`}
                      >
                        OH
                      </button>
                    </div>
                  )}

                  {alcohol.id === 'propan-2-ol' && (
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => setSelectedAtom('oh')}
                        className={`px-3 py-1.5 rounded-xl border-2 transition-all mb-1 ${
                          selectedAtom === 'oh'
                            ? 'bg-rose-200 text-rose-950 border-rose-500 ring-2 ring-rose-400 scale-105 shadow-md'
                            : 'bg-rose-50 text-rose-900 border-rose-300'
                        }`}
                      >
                        OH
                      </button>
                      <span className="text-navy/30 font-sans leading-none">|</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setSelectedAtom('r_chain')}
                          className={`px-2 py-1.5 rounded-xl border transition-all ${
                            selectedAtom === 'r_chain'
                              ? 'bg-indigo-200 text-indigo-950 border-indigo-500'
                              : 'bg-indigo-50 text-indigo-900 border-indigo-200'
                          }`}
                        >
                          CH₃
                        </button>
                        <span className="text-navy/30 font-sans">—</span>
                        <button
                          onClick={() => setSelectedAtom('c_func')}
                          className={`px-3 py-1.5 rounded-xl border-2 transition-all ${
                            selectedAtom === 'c_func'
                              ? 'bg-cyan-200 text-cyan-950 border-cyan-500 ring-2 ring-cyan-400 scale-105 shadow-md'
                              : 'bg-cyan-50 text-cyan-900 border-cyan-300'
                          }`}
                        >
                          <span className="text-cyan-700 underline font-extrabold">C</span>H
                        </button>
                        <span className="text-navy/30 font-sans">—</span>
                        <button
                          onClick={() => setSelectedAtom('r_chain')}
                          className={`px-2 py-1.5 rounded-xl border transition-all ${
                            selectedAtom === 'r_chain'
                              ? 'bg-indigo-200 text-indigo-950 border-indigo-500'
                              : 'bg-indigo-50 text-indigo-900 border-indigo-200'
                          }`}
                        >
                          CH₃
                        </button>
                      </div>
                    </div>
                  )}

                  {alcohol.id === 'butan-1-ol' && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setSelectedAtom('r_chain')}
                        className={`px-2.5 py-2 rounded-xl border transition-all ${
                          selectedAtom === 'r_chain'
                            ? 'bg-indigo-200 text-indigo-950 border-indigo-500 ring-2 ring-indigo-400'
                            : 'bg-indigo-50 text-indigo-900 border-indigo-200'
                        }`}
                      >
                        CH₃—CH₂—CH₂
                      </button>
                      <span className="text-navy/30 px-1 font-sans">—</span>
                      <button
                        onClick={() => setSelectedAtom('c_func')}
                        className={`px-3 py-2 rounded-xl border-2 transition-all ${
                          selectedAtom === 'c_func'
                            ? 'bg-cyan-200 text-cyan-950 border-cyan-500 ring-2 ring-cyan-400 shadow-md'
                            : 'bg-cyan-50 text-cyan-900 border-cyan-300'
                        }`}
                      >
                        <span className="text-cyan-700 underline font-extrabold">C</span>H₂
                      </button>
                      <span className="text-navy/30 px-1 font-sans">—</span>
                      <button
                        onClick={() => setSelectedAtom('oh')}
                        className={`px-3 py-2 rounded-xl border-2 transition-all ${
                          selectedAtom === 'oh'
                            ? 'bg-rose-200 text-rose-950 border-rose-500 ring-2 ring-rose-400 shadow-md'
                            : 'bg-rose-50 text-rose-900 border-rose-300'
                        }`}
                      >
                        OH
                      </button>
                    </div>
                  )}

                  {alcohol.id === 'butan-2-ol' && (
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => setSelectedAtom('oh')}
                        className={`px-3 py-1.5 rounded-xl border-2 transition-all mb-1 ${
                          selectedAtom === 'oh'
                            ? 'bg-rose-200 text-rose-950 border-rose-500 ring-2 ring-rose-400'
                            : 'bg-rose-50 text-rose-900 border-rose-300'
                        }`}
                      >
                        OH
                      </button>
                      <span className="text-navy/30 font-sans leading-none">|</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setSelectedAtom('r_chain')}
                          className="px-2 py-1.5 rounded-xl border bg-indigo-50 text-indigo-900 border-indigo-200 text-sm"
                        >
                          CH₃—CH₂
                        </button>
                        <span className="text-navy/30 font-sans">—</span>
                        <button
                          onClick={() => setSelectedAtom('c_func')}
                          className="px-3 py-1.5 rounded-xl border-2 bg-cyan-50 text-cyan-900 border-cyan-300"
                        >
                          <span className="text-cyan-700 underline font-extrabold">C</span>H
                        </button>
                        <span className="text-navy/30 font-sans">—</span>
                        <button
                          onClick={() => setSelectedAtom('r_chain')}
                          className="px-2 py-1.5 rounded-xl border bg-indigo-50 text-indigo-900 border-indigo-200 text-sm"
                        >
                          CH₃
                        </button>
                      </div>
                    </div>
                  )}

                  {alcohol.id === '2-methylpropan-2-ol' && (
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => setSelectedAtom('r_chain')}
                        className="px-2 py-1 bg-indigo-50 text-indigo-900 border border-indigo-200 rounded-xl text-xs mb-1"
                      >
                        CH₃
                      </button>
                      <span className="text-navy/30 font-sans leading-none">|</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setSelectedAtom('r_chain')}
                          className="px-2 py-1 bg-indigo-50 text-indigo-900 border border-indigo-200 rounded-xl text-xs"
                        >
                          CH₃
                        </button>
                        <span className="text-navy/30 font-sans">—</span>
                        <button
                          onClick={() => setSelectedAtom('c_func')}
                          className="px-3 py-1.5 rounded-xl border-2 bg-cyan-50 text-cyan-900 border-cyan-300"
                        >
                          <span className="text-cyan-700 underline font-extrabold">C</span>
                        </button>
                        <span className="text-navy/30 font-sans">—</span>
                        <button
                          onClick={() => setSelectedAtom('oh')}
                          className="px-3 py-1.5 rounded-xl border-2 bg-rose-50 text-rose-900 border-rose-300"
                        >
                          OH
                        </button>
                      </div>
                      <span className="text-navy/30 font-sans leading-none">|</span>
                      <button
                        onClick={() => setSelectedAtom('r_chain')}
                        className="px-2 py-1 bg-indigo-50 text-indigo-900 border border-indigo-200 rounded-xl text-xs mt-1"
                      >
                        CH₃
                      </button>
                    </div>
                  )}

                  {alcohol.id === 'pentan-1-ol' && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setSelectedAtom('r_chain')}
                        className="px-2.5 py-2 rounded-xl border bg-indigo-50 text-indigo-900 border-indigo-200"
                      >
                        CH₃—(CH₂)₃
                      </button>
                      <span className="text-navy/30 px-1 font-sans">—</span>
                      <button
                        onClick={() => setSelectedAtom('c_func')}
                        className="px-3 py-2 rounded-xl border-2 bg-cyan-50 text-cyan-900 border-cyan-300"
                      >
                        <span className="text-cyan-700 underline font-extrabold">C</span>H₂
                      </button>
                      <span className="text-navy/30 px-1 font-sans">—</span>
                      <button
                        onClick={() => setSelectedAtom('oh')}
                        className="px-3 py-2 rounded-xl border-2 bg-rose-50 text-rose-900 border-rose-300"
                      >
                        OH
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Encadré d'explication de l'atome cliqué */}
              <div className="w-full mt-3 p-3 rounded-xl bg-surface border border-navy/10 text-xs">
                {selectedAtom === 'c_func' && (
                  <p className="text-cyan-950 font-medium">
                    🔵 <strong>Carbone Fonctionnel :</strong> C&apos;est l&apos;atome de carbone qui porte le groupement —OH. Il est directement lié à{' '}
                    <span className="font-extrabold text-navy">
                      {alcohol.classe === '1' ? '1 seul carbone' : alcohol.classe === '2' ? '2 carbones' : '3 carbones'}
                    </span>
                    . Cela définit la classe <strong>{alcohol.classeLabel}</strong>.
                  </p>
                )}
                {selectedAtom === 'oh' && (
                  <p className="text-rose-950 font-medium">
                    🔴 <strong>Groupe Hydroxyle (—OH) :</strong> Responsable des propriétés chimiques des alcools. La forte polarité de la liaison O—H permet la création de <strong>liaisons hydrogène</strong> intermoléculaires très solides.
                  </p>
                )}
                {selectedAtom === 'r_chain' && (
                  <p className="text-indigo-950 font-medium">
                    🟣 <strong>Chaîne Alkyle (R—) :</strong> Partie carbonée hydrophobe (lipophile). Plus cette chaîne est longue, plus l&apos;alcool devient insoluble dans l&apos;eau et plus sa masse molaire augmente.
                  </p>
                )}
                {selectedAtom === 'none' && (
                  <p className="text-navy/60 text-center italic">
                    💡 Astuce : Toujours numéroter la chaîne carbonée principale pour donner au carbone fonctionnel le plus petit numéro possible.
                  </p>
                )}
              </div>
            </div>

            {/* Repère Wolof */}
            <div className="p-3 bg-gold-light/20 rounded-xl border border-gold/30 text-xs text-[#8A5A00] flex items-center gap-2">
              <span className="font-bold shrink-0">💡 Xam-xam Bac :</span>
              <span>{alcohol.wolofTip}</span>
            </div>
          </div>

          {/* Fiche d'Analyse Pédagogique UICPA */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-navy/10 p-5 space-y-4 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <h3 className="text-sm font-black uppercase tracking-wider text-navy border-b border-navy/10 pb-2">
                Règles de Nomenclature UICPA
              </h3>

              <div className="space-y-2 text-xs">
                <div className="bg-surface p-3 rounded-xl border border-navy/5">
                  <span className="font-bold text-navy/50 uppercase text-[10px] block">
                    1. Chaîne Principale la plus longue
                  </span>
                  <p className="font-bold text-navy mt-0.5">{alcohol.iupacBreakdown.chain}</p>
                </div>

                <div className="bg-surface p-3 rounded-xl border border-navy/5">
                  <span className="font-bold text-navy/50 uppercase text-[10px] block">
                    2. Position du Carbone Fonctionnel
                  </span>
                  <p className="font-bold text-turquoise mt-0.5">
                    Indice n° {alcohol.iupacBreakdown.position} (plus petit numéro possible)
                  </p>
                </div>

                <div className="bg-surface p-3 rounded-xl border border-navy/5">
                  <span className="font-bold text-navy/50 uppercase text-[10px] block">
                    3. Ramifications Alkyles
                  </span>
                  <p className="font-bold text-navy mt-0.5">{alcohol.iupacBreakdown.substituants}</p>
                </div>
              </div>
            </div>

            <div className="bg-navy text-white p-4 rounded-xl shadow-sm space-y-1">
              <span className="font-bold text-white/60 uppercase text-[10px] block">
                Nom UICPA Homologué :
              </span>
              <p className="text-lg font-black text-turquoise-light tracking-wide">{alcohol.name}</p>
              <p className="text-[11px] text-white/70">
                Classe : <span className="text-emerald-300 font-bold">{alcohol.classeLabel}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* MODE 2 : BANC THERMIQUE & ÉBULLITION INTERACTIVE               */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {activeMode === 'thermal' && (
        <div className="space-y-6">
          <div className="bg-surface/50 rounded-2xl border border-navy/10 p-4 sm:p-6 space-y-5">
            {/* Contrôles du Banc Thermique */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy/10 pb-4">
              <div>
                <h3 className="text-base font-black text-navy flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-turquoise" />
                  <span>Chauffage au Banc d&apos;Essai & Température d&apos;Ébullition</span>
                </h3>
                <p className="text-xs text-navy/60 mt-0.5">
                  Mettez en évidence l&apos;écart thermique phénoménal entre un alcool et un alcane de masse molaire similaire.
                </p>
              </div>

              {/* Actions de chauffe */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setIsBurnerActive(!isBurnerActive)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
                    isBurnerActive
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-navy text-white hover:bg-navy/90'
                  }`}
                >
                  <Flame className="w-4 h-4" />
                  <span>{isBurnerActive ? 'Éteindre la flamme' : 'Allumer le bec Bunsen'}</span>
                </button>

                <button
                  onClick={() => {
                    setIsBurnerActive(false);
                    setThermalTemp(25);
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-bold bg-white border border-navy/10 text-navy hover:bg-surface flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>25 °C</span>
                </button>

                <button
                  onClick={() => {
                    setIsBurnerActive(false);
                    setThermalTemp(alcohol.tEb);
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-bold bg-turquoise-light text-turquoise hover:bg-turquoise hover:text-white transition-colors"
                >
                  Régler à T_éb ({alcohol.tEb} °C)
                </button>
              </div>
            </div>

            {/* Curseur et Jauge de Température */}
            <div className="space-y-2 bg-white p-4 rounded-2xl border border-navy/10">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-navy/70">Température de la paillasse :</span>
                <span className="font-mono text-xl font-black text-turquoise bg-surface px-3 py-1 rounded-xl border border-navy/5">
                  {thermalTemp} °C
                </span>
              </div>

              <input
                type="range"
                min={-50}
                max={150}
                step={1}
                value={thermalTemp}
                onChange={(e) => {
                  setIsBurnerActive(false);
                  setThermalTemp(Number(e.target.value));
                }}
                className="w-full h-3 bg-navy/10 rounded-lg appearance-none cursor-pointer accent-turquoise"
              />

              <div className="flex justify-between text-[9px] sm:text-[10px] text-navy/50 font-bold overflow-x-auto gap-2 pt-1">
                <span>-50 °C</span>
                <span>0 °C (Glace)</span>
                <span>25 °C (Ambiance)</span>
                <span className="text-turquoise font-extrabold">{alcohol.tEb} °C (T_éb {alcohol.name})</span>
                <span>100 °C (Eau)</span>
                <span>150 °C</span>
              </div>
            </div>

            {/* Comparateur en 2 colonnes : Alcool vs Alcane */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Carte Alcool */}
              <div
                className={`p-5 rounded-2xl border transition-all ${
                  isEbullition
                    ? 'bg-rose-50/90 border-rose-300 shadow-sm'
                    : 'bg-emerald-50/90 border-emerald-300 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-navy">
                    {alcohol.name} ({alcohol.brute})
                  </span>
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                      isEbullition ? 'bg-rose-200 text-rose-900 animate-pulse' : 'bg-emerald-200 text-emerald-900'
                    }`}
                  >
                    {isEbullition ? '💨 Ébullition en cours (Vapeur)' : '💧 État Liquide'}
                  </span>
                </div>

                <div className="mt-3 space-y-1">
                  <div className="text-2xl font-black text-navy">T_éb = +{alcohol.tEb} °C</div>
                  <p className="text-xs text-navy/80 leading-relaxed pt-1">
                    Les molécules d&apos;alcool sont fortement unies par des <strong>liaisons hydrogène intermoléculaires</strong> (—O—H···O—). Il faut apporter beaucoup d&apos;énergie thermique pour les séparer.
                  </p>
                </div>
              </div>

              {/* Carte Alcane */}
              <div
                className={`p-5 rounded-2xl border transition-all ${
                  isAlcaneEbullition
                    ? 'bg-amber-50/90 border-amber-300 shadow-sm'
                    : 'bg-surface border-navy/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-navy">
                    {alcohol.alcaneCorrespondant.name}
                  </span>
                  <span
                    className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full ${
                      isAlcaneEbullition ? 'bg-amber-200 text-amber-900' : 'bg-navy/10 text-navy'
                    }`}
                  >
                    {isAlcaneEbullition ? '💨 État Gazeux (Gaz)' : '💧 État Liquide'}
                  </span>
                </div>

                <div className="mt-3 space-y-1">
                  <div className="text-2xl font-black text-navy">T_éb = {alcohol.alcaneCorrespondant.tEb} °C</div>
                  <p className="text-xs text-navy/80 leading-relaxed pt-1">
                    Pas de groupe —OH polaire ! Uniquement des <strong>forces de Van der Waals</strong> très faibles. À température ambiante (25°C), l&apos;alcane est déjà sous forme gazeuse.
                  </p>
                </div>
              </div>
            </div>

            {/* Schéma vectoriel des liaisons H */}
            <div className="bg-white rounded-2xl border border-navy/10 p-4 text-center space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-navy/40 block">
                Formule Clé Exigible au Bac S2 Sénégal
              </span>
              <div className="flex items-center justify-center gap-2 text-sm sm:text-base font-mono font-bold text-navy py-1 overflow-x-auto">
                <span className="px-2.5 py-1 bg-surface rounded-lg">R—O(δ⁻)—H(δ⁺)</span>
                <span className="text-rose-500 font-extrabold tracking-widest animate-pulse">······</span>
                <span className="px-2.5 py-1 bg-surface rounded-lg">O(δ⁻)—H(δ⁺)—R</span>
              </div>
              <p className="text-xs text-navy/70 max-w-xl mx-auto">
                L&apos;électronégativité élevée de l&apos;oxygène (χ = 3,44) polarise la liaison O—H. Le doublet non liant de l&apos;oxygène attire l&apos;hydrogène d&apos;une molécule voisine.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* MODE 3 : SOLUBILITÉ & MISCIBILITÉ INTERACTIVE                  */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {activeMode === 'solubility' && (
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Éprouvette Graduée Interactive */}
          <div className="lg:col-span-5 bg-surface/60 rounded-2xl border border-navy/10 p-5 flex flex-col items-center justify-between space-y-4">
            <div className="w-full flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-navy/60">
                Éprouvette Graduée en Direct
              </span>
              <button
                onClick={handleShakeTube}
                className="px-2.5 py-1 text-xs font-bold bg-white border border-navy/10 rounded-lg text-navy hover:text-turquoise shadow-sm transition-all"
              >
                Agiter l&apos;éprouvette
              </button>
            </div>

            {/* Tube SVG Animé */}
            <div className={`py-2 transition-transform duration-300 ${isShaking ? 'rotate-12 scale-105' : ''}`}>
              <svg width="120" height="260" viewBox="0 0 120 260" className="drop-shadow-md">
                {/* Corps de l'éprouvette */}
                <rect x="25" y="10" width="70" height="220" rx="6" fill="#F8FAFC" stroke="#0A192F" strokeWidth="2.5" />
                <path d="M10 230 L110 230 L100 245 L20 245 Z" fill="#0A192F" />

                {/* Graduations */}
                {[40, 70, 100, 130, 160, 190, 210].map((y, i) => (
                  <line key={i} x1="25" y1={y} x2="35" y2={y} stroke="#0A192F" strokeWidth="1.5" strokeOpacity="0.4" />
                ))}

                {/* Liquide */}
                {alcohol.carbonCount <= 3 ? (
                  // Solution parfaitement limpide (1 phase)
                  <rect x="27.5" y="50" width="65" height="178" fill="#0EA5E9" fillOpacity="0.3" />
                ) : alcohol.carbonCount === 4 ? (
                  // Limite de solubilité
                  <g>
                    <rect x="27.5" y="50" width="65" height="178" fill="#0EA5E9" fillOpacity="0.35" />
                    <line x1="27.5" y1="100" x2="92.5" y2="100" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 2" />
                  </g>
                ) : (
                  // 2 phases nettement séparées
                  <g>
                    {/* Eau en bas (d = 1.0) */}
                    <rect x="27.5" y="125" width="65" height="103" fill="#0EA5E9" fillOpacity="0.3" />
                    {/* Ménisque de séparation */}
                    <ellipse cx="60" cy="125" rx="32.5" ry="4" fill="#0A192F" fillOpacity="0.4" />
                    {/* Alcool surnageant (d ≈ 0.81) */}
                    <rect x="27.5" y="50" width="65" height="75" fill="#F59E0B" fillOpacity="0.35" />
                  </g>
                )}

                {/* Étiquettes */}
                {alcohol.carbonCount >= 5 && (
                  <>
                    <text x="60" y="85" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#B45309">
                      Alcool (d ≈ 0,8)
                    </text>
                    <text x="60" y="170" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0369A1">
                      Eau (d = 1,0)
                    </text>
                  </>
                )}
                {alcohol.carbonCount <= 3 && (
                  <text x="60" y="140" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0369A1">
                    Solution Homogène
                  </text>
                )}
              </svg>
            </div>

            {/* Verdict Solubilité */}
            <span
              className={`text-xs font-black px-3.5 py-1.5 rounded-full text-center ${
                alcohol.solubilityGPer100mL === 'Infinie'
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-amber-100 text-amber-800 border border-amber-300'
              }`}
            >
              Solubilité : {alcohol.solubilityGPer100mL === 'Infinie' ? 'Infinie (Miscible en toutes proportions)' : `${alcohol.solubilityGPer100mL} g / 100 mL d'eau`}
            </span>
          </div>

          {/* Bilan Amphiphile & Règle Bac */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-navy/10 p-5 space-y-4 shadow-sm flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-black uppercase tracking-wider text-navy border-b border-navy/10 pb-2">
                Équilibre Amphiphile : Pôle Hydrophile vs Queue Hydrophobe
              </h3>

              <div className="space-y-3 pt-3">
                {/* Jauge Pôle Hydrophile */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-emerald-700">Groupe —OH Hydrophile :</span>
                    <span className="text-emerald-700">Affinité pour l&apos;eau (100%)</span>
                  </div>
                  <div className="w-full bg-surface rounded-full h-2.5 overflow-hidden border border-navy/5">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>

                {/* Jauge Queue Hydrophobe */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-amber-700">Chaîne R— Hydrophobe :</span>
                    <span className="text-amber-700">{alcohol.carbonCount} Carbone(s) lipophile(s)</span>
                  </div>
                  <div className="w-full bg-surface rounded-full h-2.5 overflow-hidden border border-navy/5">
                    <div
                      className="bg-amber-500 h-full rounded-full transition-all duration-300"
                      style={{ width: `${Math.min(alcohol.carbonCount * 20, 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Règle d'Or Bac */}
              <div className="bg-surface rounded-xl p-3.5 border border-navy/10 space-y-1.5 text-xs mt-4">
                <span className="font-bold text-navy block text-[11px] uppercase tracking-wider">
                  Règle d&apos;or du Baccalauréat sénégalais :
                </span>
                <ul className="space-y-1 text-navy/80 list-disc pl-4">
                  <li>
                    <strong>C1 à C3 (Méthanol, Éthanol, Propan-1-ol) :</strong> Le pôle —OH l&apos;emporte très largement. Miscibilité complète avec l&apos;eau.
                  </li>
                  <li>
                    <strong>C4 (Butan-1-ol) :</strong> Zone critique frontière (solubilité ≈ 9 g/100 mL).
                  </li>
                  <li>
                    <strong>C5 et plus :</strong> La chaîne carbonée apolaire impose sa loi. Deux phases non miscibles se forment. L&apos;alcool flotte car sa densité (0,8) est inférieure à celle de l&apos;eau (1,0).
                  </li>
                </ul>
              </div>
            </div>

            <div className="p-3 bg-gold-light/20 rounded-xl border border-gold/30 text-xs text-[#8A5A00]">
              <strong>Astuce QCM Bac :</strong> Plus la chaîne alkyle est ramifiée, plus la solubilité dans l&apos;eau augmente légèrement par rapport à l&apos;isomère linéaire car la surface hydrophobe exposée diminue.
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* MODE 4 : TEST DE LUCAS AU LABORATOIRE                          */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {activeMode === 'lucas' && (
        <div className="space-y-6">
          <div className="bg-surface/50 rounded-2xl border border-navy/10 p-4 sm:p-6 space-y-5">
            {/* Barre de protocole */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/10 pb-4">
              <div>
                <h3 className="text-base font-black text-navy flex items-center gap-2">
                  <TestTube className="w-5 h-5 text-purple-600" />
                  <span>Test de Lucas : Protocole d&apos;Identification de Classe</span>
                </h3>
                <p className="text-xs text-navy/60 mt-0.5">
                  Réactif de Lucas : Solution de chlorure de zinc anhydre (ZnCl₂) dissous dans l&apos;acide chlorhydrique concentré (HCl).
                </p>
              </div>

              {/* Commandes tactiles */}
              <div className="flex flex-wrap items-center gap-2">
                {!lucasReagentAdded ? (
                  <button
                    onClick={handleStartLucas}
                    className="px-4 py-2 bg-turquoise text-white font-extrabold text-xs rounded-xl shadow-sm hover:bg-turquoise/90 transition-all flex items-center gap-1.5"
                  >
                    <Droplets className="w-4 h-4" />
                    <span>Verser le Réactif de Lucas & Chronométrer</span>
                  </button>
                ) : (
                  <button
                    onClick={handleResetLucas}
                    className="px-4 py-2 bg-navy text-white font-extrabold text-xs rounded-xl shadow-sm hover:bg-navy/90 transition-all flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Réinitialiser le Test</span>
                  </button>
                )}

                {lucasReagentAdded && (
                  <button
                    onClick={() => setLucasSpeed((prev) => (prev === 1 ? 10 : 1))}
                    className="px-3 py-2 bg-white border border-navy/10 text-navy font-bold text-xs rounded-xl hover:bg-surface transition-colors"
                  >
                    Vitesse : {lucasSpeed}x
                  </button>
                )}
              </div>
            </div>

            {/* Banc Expérimental du Test */}
            <div className="grid gap-6 sm:grid-cols-12 items-center">
              {/* Tube à essai vectoriel */}
              <div className="sm:col-span-5 bg-white rounded-2xl border border-navy/10 p-6 flex flex-col items-center justify-center shadow-inner">
                <svg width="90" height="230" viewBox="0 0 90 230">
                  {/* Tube à essai */}
                  <path
                    d="M25 15 L25 190 Q25 215 45 215 Q65 215 65 190 L65 15"
                    fill="none"
                    stroke="#0A192F"
                    strokeWidth="2.5"
                  />
                  <line x1="20" y1="15" x2="70" y2="15" stroke="#0A192F" strokeWidth="3" />

                  {/* Liquide */}
                  {lucasReagentAdded && (
                    <path
                      d="M27 95 L27 190 Q27 213 45 213 Q63 213 63 190 L63 95 Z"
                      fill={isTroubled ? '#E2E8F0' : '#38BDF8'}
                      fillOpacity={isTroubled ? '0.95' : '0.4'}
                      className="transition-all duration-700"
                    />
                  )}

                  {/* Particules de trouble laiteux */}
                  {isTroubled && (
                    <g>
                      <circle cx="40" cy="145" r="3" fill="#94A3B8" opacity="0.7" />
                      <circle cx="50" cy="165" r="3.5" fill="#94A3B8" opacity="0.7" />
                      <circle cx="43" cy="185" r="3" fill="#94A3B8" opacity="0.7" />
                      <circle cx="47" cy="125" r="2.5" fill="#94A3B8" opacity="0.7" />
                    </g>
                  )}
                </svg>

                <div className="mt-3 text-center">
                  <span
                    className={`text-xs font-black px-3 py-1 rounded-full ${
                      !lucasReagentAdded
                        ? 'bg-surface text-navy/40'
                        : isTroubled
                        ? 'bg-rose-100 text-rose-800 border border-rose-300'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    }`}
                  >
                    {!lucasReagentAdded
                      ? 'Tube prêt (Alcool seul)'
                      : isTroubled
                      ? '⚠️ Trouble Laiteux Positif !'
                      : 'Solution Limpide (En attente)'}
                  </span>
                </div>
              </div>

              {/* Chronomètre et Diagnostic Bac */}
              <div className="sm:col-span-7 bg-white rounded-2xl border border-navy/10 p-5 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-navy/10 pb-3">
                  <span className="text-xs font-bold text-navy/60">Chronomètre :</span>
                  <span className="font-mono text-xl font-black text-navy bg-surface px-3 py-1 rounded-xl">
                    {Math.floor(lucasSeconds / 60)} min {lucasSeconds % 60} s
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="font-bold text-navy">
                    Comportement de {alcohol.name} ({alcohol.classeLabel}) :
                  </div>

                  {alcohol.classe === '3' && (
                    <div className="bg-rose-50 border border-rose-200 text-rose-950 p-3.5 rounded-xl space-y-1">
                      <span className="font-black uppercase tracking-wider text-[10px] text-rose-800 block">
                        Alcool Tertiaire (3°) : Trouble Immédiat (&lt; 30 s)
                      </span>
                      <p className="leading-relaxed">
                        Le carbocation tertiaire intermédiaire (R₃C⁺) est ultra-stable. La substitution par l&apos;ion chlorure (Cl⁻) est instantanée. Le dérivé halogéné insoluble (R—Cl) précipite sous forme de gouttelettes laiteuses.
                      </p>
                    </div>
                  )}

                  {alcohol.classe === '2' && (
                    <div className="bg-amber-50 border border-amber-200 text-amber-950 p-3.5 rounded-xl space-y-1">
                      <span className="font-black uppercase tracking-wider text-[10px] text-amber-800 block">
                        Alcool Secondaire (2°) : Trouble en 4 à 5 minutes
                      </span>
                      <p className="leading-relaxed">
                        Le carbocation secondaire est modérément stable. La réaction démarre lentement à température ambiante (trouble net après 5 min). Si on chauffe légèrement au bain-marie, le trouble s&apos;accélère.
                      </p>
                    </div>
                  )}

                  {alcohol.classe === '1' && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-950 p-3.5 rounded-xl space-y-1">
                      <span className="font-black uppercase tracking-wider text-[10px] text-emerald-800 block">
                        Alcool Primaire (1°) : Aucun Trouble à Froid
                      </span>
                      <p className="leading-relaxed">
                        Le carbocation primaire n&apos;est pas assez stable. La réaction de substitution nucléophile ne se produit pas à froid. Le mélange reste parfaitement transparent.
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-surface rounded-xl p-3 border border-navy/5 text-[11px] text-navy/70">
                  <strong>Équation officielle Bac :</strong>{' '}
                  <span className="font-mono text-navy font-bold">R—OH + HCl ➔ R—Cl (trouble) + H₂O</span> (catalyseur : ZnCl₂)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* MODE 5 : DÉFI BAC "ALCOOL MYSTÈRE"                            */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {activeMode === 'mystery' && (
        <div className="space-y-6">
          <div className="bg-amber-500/10 rounded-3xl border border-amber-500/30 p-5 sm:p-7 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-500/20 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 bg-amber-200/60 px-2.5 py-0.5 rounded-full">
                  Épreuve Pratique Virtuelle • Baccalauréat S2
                </span>
                <h3 className="text-xl font-black text-navy mt-1">
                  Défi : Identifier l&apos;Échantillon d&apos;Alcool Inconnu (X)
                </h3>
              </div>
              <button
                onClick={handleGenerateMystery}
                className="px-4 py-2 bg-amber-600 text-white font-extrabold text-xs rounded-xl shadow-sm hover:bg-amber-700 transition-all flex items-center gap-1.5 self-start sm:self-auto"
              >
                <Sparkles className="w-4 h-4" />
                <span>Nouveau Flacon Inconnu</span>
              </button>
            </div>

            {/* Données d'analyse fournies au laboratoire */}
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="bg-white p-4 rounded-2xl border border-navy/10 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-navy/40 block">
                  1. Mesure au Banc Thermique :
                </span>
                <p className="text-xl font-mono font-black text-navy">T_éb = {mysteryTarget.tEb} °C</p>
                <p className="text-[11px] text-navy/60">
                  L&apos;alcane correspondant de même masse bout à {mysteryTarget.alcaneCorrespondant.tEb} °C.
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-navy/10 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-navy/40 block">
                  2. Test de Miscibilité à l&apos;Eau :
                </span>
                <p className="text-sm font-black text-turquoise">
                  {mysteryTarget.solubilityGPer100mL === 'Infinie'
                    ? 'Totalement miscible (1 seule phase limpide)'
                    : `Solubilité limitée (${mysteryTarget.solubilityGPer100mL} g/100 mL)`}
                </p>
                <p className="text-[11px] text-navy/60">
                  Nombre de carbones estimé : {mysteryTarget.carbonCount} carbone(s).
                </p>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-navy/10 space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-navy/40 block">
                  3. Résultat du Test de Lucas :
                </span>
                <p className="text-sm font-black text-purple-700">
                  {mysteryTarget.classe === '3'
                    ? '⚠️ Trouble laiteux instantané (< 30 s)'
                    : mysteryTarget.classe === '2'
                    ? '⏳ Trouble laiteux après 5 minutes'
                    : '❄️ Solution limpide, aucun trouble à froid'}
                </p>
              </div>
            </div>

            {/* Questions du Défi */}
            <div className="bg-white rounded-2xl border border-navy/10 p-5 space-y-5 shadow-sm">
              <h4 className="font-extrabold text-navy text-sm border-b border-navy/10 pb-2">
                Votre Diagnostic Pédagogique :
              </h4>

              {/* Étape A : Déterminer la classe */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-navy/70 block">
                  A. Quelle est la classe de cet alcool ?
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['1', '2', '3'] as const).map((cls) => {
                    const label = cls === '1' ? 'Primaire (1°)' : cls === '2' ? 'Secondaire (2°)' : 'Tertiaire (3°)';
                    const isSelected = mysteryUserClass === cls;
                    return (
                      <button
                        key={cls}
                        disabled={mysteryRevealed}
                        onClick={() => setMysteryUserClass(cls)}
                        className={`py-2 px-3 rounded-xl text-xs font-black border transition-all ${
                          isSelected
                            ? 'bg-navy text-white border-navy shadow-sm'
                            : 'bg-surface text-navy border-navy/10 hover:border-turquoise'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Étape B : Nommer l'alcool */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-navy/70 block">
                  B. Quel est le nom exact de cet alcool ?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {ALCOHOL_DATA.map((item) => {
                    const isSelected = mysteryUserAlcoholId === item.id;
                    return (
                      <button
                        key={item.id}
                        disabled={mysteryRevealed}
                        onClick={() => setMysteryUserAlcoholId(item.id)}
                        className={`py-2 px-2.5 rounded-xl text-[11px] font-bold border transition-all truncate ${
                          isSelected
                            ? 'bg-turquoise text-white border-turquoise shadow-sm'
                            : 'bg-surface text-navy border-navy/10 hover:border-turquoise'
                        }`}
                      >
                        {item.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bouton de validation */}
              {!mysteryRevealed ? (
                <button
                  disabled={!mysteryUserClass || !mysteryUserAlcoholId}
                  onClick={() => setMysteryRevealed(true)}
                  className="w-full py-3 bg-navy text-white font-black text-xs uppercase tracking-wider rounded-xl shadow-md hover:bg-navy/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Valider mon diagnostic
                </button>
              ) : (
                <div className="space-y-4 pt-2">
                  {mysteryUserClass === mysteryTarget.classe && mysteryUserAlcoholId === mysteryTarget.id ? (
                    <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-950 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-black text-sm">Excellente déduction ! Diagnostic 100% Correct !</p>
                        <p className="text-xs mt-1">
                          Il s&apos;agissait bien de <strong>{mysteryTarget.name}</strong>, alcool de <strong>{mysteryTarget.classeLabel}</strong>.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 bg-rose-50 border border-rose-300 rounded-xl text-rose-950 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-black text-sm">Diagnostic incomplet ou erroné</p>
                        <p className="text-xs mt-1">
                          La bonne réponse était <strong>{mysteryTarget.name}</strong> ({mysteryTarget.classeLabel}).
                          Observation clé : {mysteryTarget.lucasObservation}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="p-4 bg-surface rounded-xl border border-navy/10 space-y-2 text-xs">
                    <span className="font-bold text-navy uppercase text-[10px] block">
                      Rappel de correction type Baccalauréat S2 :
                    </span>
                    <p className="text-navy/80">
                      1. Le test de Lucas tranche immédiatement la classe grâce à la cinétique d&apos;apparition du trouble laiteux.
                    </p>
                    <p className="text-navy/80">
                      2. La température d&apos;ébullition ({mysteryTarget.tEb} °C) et la solubilité confirment sans ambiguïté la longueur de la chaîne carbonée et la présence de ramifications.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
