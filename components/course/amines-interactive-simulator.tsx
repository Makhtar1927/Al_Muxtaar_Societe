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
import MathRenderer from '@/components/course/math-renderer';

interface AmineItem {
  id: string;
  name: string;
  brute: string;
  carbonCount: number;
  molMass: number;
  classe: '1' | '2' | '3';
  classeLabel: 'Primaire (1°)' | 'Secondaire (2°)' | 'Tertiaire (3°)';
  semiDeveloppee: string;
  topologique: string;
  nbHSurN: number;
  nbAlkylesOnN: number;
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
  pKa: number;
  solubilityGPer100mL: number | 'Infinie';
  odeur: string;
  wolofTip: string;
}

const AMINES_DATA: AmineItem[] = [
  {
    id: 'ethanamine',
    name: 'Éthanamine',
    brute: 'C₂H₇N',
    carbonCount: 2,
    molMass: 45.08,
    classe: '1',
    classeLabel: 'Primaire (1°)',
    semiDeveloppee: 'CH₃—CH₂—NH₂',
    topologique: 'CH3-CH2-NH2',
    nbHSurN: 2,
    nbAlkylesOnN: 1,
    iupacBreakdown: {
      chain: 'Éthane (2 carbones)',
      position: 1,
      substituants: 'Aucun (chaîne linéaire)',
    },
    tEb: 16.6,
    alcaneCorrespondant: {
      name: 'Propane (M = 44 g/mol)',
      brute: 'C₃H₈',
      tEb: -42.1,
    },
    pKa: 10.65,
    solubilityGPer100mL: 'Infinie',
    odeur: 'Forte odeur d\'ammoniac et de poisson frais',
    wolofTip: 'Amine primaire la : azote N bi yor na 2 hydrogènes (-NH₂). Dafa gën a forcé ammoniac grâce à l\'effet +I du radical éthyle.',
  },
  {
    id: 'methanamine',
    name: 'Méthanamine',
    brute: 'CH₅N',
    carbonCount: 1,
    molMass: 31.06,
    classe: '1',
    classeLabel: 'Primaire (1°)',
    semiDeveloppee: 'CH₃—NH₂',
    topologique: 'CH3-NH2',
    nbHSurN: 2,
    nbAlkylesOnN: 1,
    iupacBreakdown: {
      chain: 'Méthane (1 carbone)',
      position: 1,
      substituants: 'Aucun',
    },
    tEb: -6.3,
    alcaneCorrespondant: {
      name: 'Éthane (M = 30 g/mol)',
      brute: 'C₂H₆',
      tEb: -88.6,
    },
    pKa: 10.66,
    solubilityGPer100mL: 'Infinie',
    odeur: 'Gaz très piquant, odeur poissonneuse vive',
    wolofTip: 'Amine bi gën a yomb : benn carbone rek la yor. Gaz la ci température ambiante (Teb = -6,3 °C).',
  },
  {
    id: 'propan-1-amine',
    name: 'Propan-1-amine',
    brute: 'C₃H₉N',
    carbonCount: 3,
    molMass: 59.11,
    classe: '1',
    classeLabel: 'Primaire (1°)',
    semiDeveloppee: 'CH₃—CH₂—CH₂—NH₂',
    topologique: 'CH3-CH2-CH2-NH2',
    nbHSurN: 2,
    nbAlkylesOnN: 1,
    iupacBreakdown: {
      chain: 'Propane (3 carbones)',
      position: 1,
      substituants: 'Groupe -NH₂ en bout de chaîne (C1)',
    },
    tEb: 47.8,
    alcaneCorrespondant: {
      name: 'Butane (M = 58 g/mol)',
      brute: 'C₄H₁₀',
      tEb: -0.5,
    },
    pKa: 10.71,
    solubilityGPer100mL: 'Infinie',
    odeur: 'Odeur d\'ammoniac marquée, liquide volatil',
    wolofTip: 'Groupe -NH₂ bi ci caat gi la nekk (carbone 1). Liquide la ba 48 °C ndax liaisons hydrogène N-H...N.',
  },
  {
    id: 'propan-2-amine',
    name: 'Propan-2-amine',
    brute: 'C₃H₉N',
    carbonCount: 3,
    molMass: 59.11,
    classe: '1',
    classeLabel: 'Primaire (1°)',
    semiDeveloppee: 'CH₃—CH(NH₂)—CH₃',
    topologique: '(CH3)2CH-NH2',
    nbHSurN: 2,
    nbAlkylesOnN: 1,
    iupacBreakdown: {
      chain: 'Propane (3 carbones)',
      position: 2,
      substituants: 'Groupe -NH₂ sur le carbone central (C2)',
    },
    tEb: 32.4,
    alcaneCorrespondant: {
      name: 'Butane (M = 58 g/mol)',
      brute: 'C₄H₁₀',
      tEb: -0.5,
    },
    pKa: 10.63,
    solubilityGPer100mL: 'Infinie',
    odeur: 'Odeur âcre de poisson séché',
    wolofTip: 'Moytoukoul : carbone bi secondaire la, wanté azote bi am na 2 H, kon amine primaire la !',
  },
  {
    id: 'n-methylethanamine',
    name: 'N-méthyléthanamine',
    brute: 'C₃H₉N',
    carbonCount: 3,
    molMass: 59.11,
    classe: '2',
    classeLabel: 'Secondaire (2°)',
    semiDeveloppee: 'CH₃—CH₂—NH—CH₃',
    topologique: 'CH3-CH2-NH-CH3',
    nbHSurN: 1,
    nbAlkylesOnN: 2,
    iupacBreakdown: {
      chain: 'Éthanamine (chaîne principale 2C)',
      position: 1,
      substituants: 'Groupe N-méthyle sur l\'azote',
    },
    tEb: 36.7,
    alcaneCorrespondant: {
      name: 'Butane (M = 58 g/mol)',
      brute: 'C₄H₁₀',
      tEb: -0.5,
    },
    pKa: 10.73,
    solubilityGPer100mL: 'Infinie',
    odeur: 'Odeur typique d\'amines secondaires',
    wolofTip: 'Amine secondaire la : azote N bi ñaari chaîne yu takku ci moom (éthyle ak méthyle) ak benn H.',
  },
  {
    id: 'dimethylamine',
    name: 'Diméthylamine',
    brute: 'C₂H₇N',
    carbonCount: 2,
    molMass: 45.08,
    classe: '2',
    classeLabel: 'Secondaire (2°)',
    semiDeveloppee: 'CH₃—NH—CH₃',
    topologique: '(CH3)2NH',
    nbHSurN: 1,
    nbAlkylesOnN: 2,
    iupacBreakdown: {
      chain: 'Méthanamine (1 carbone)',
      position: 1,
      substituants: 'Groupe N-méthyle',
    },
    tEb: 6.9,
    alcaneCorrespondant: {
      name: 'Propane (M = 44 g/mol)',
      brute: 'C₃H₈',
      tEb: -42.1,
    },
    pKa: 10.73,
    solubilityGPer100mL: 'Infinie',
    odeur: 'Gaz à odeur de poisson très caractéristique',
    wolofTip: 'Amine secondaire bu gën a yomb. Ñaari méthyle ñoo ko wër, dafa forcé lool ci base.',
  },
  {
    id: 'trimethylamine',
    name: 'Triméthylamine',
    brute: 'C₃H₉N',
    carbonCount: 3,
    molMass: 59.11,
    classe: '3',
    classeLabel: 'Tertiaire (3°)',
    semiDeveloppee: '(CH₃)₃N',
    topologique: '(CH3)3N',
    nbHSurN: 0,
    nbAlkylesOnN: 3,
    iupacBreakdown: {
      chain: 'Méthanamine (1 carbone)',
      position: 1,
      substituants: 'Deux groupes N,N-diméthyle',
    },
    tEb: 2.9,
    alcaneCorrespondant: {
      name: 'Butane (M = 58 g/mol)',
      brute: 'C₄H₁₀',
      tEb: -0.5,
    },
    pKa: 9.81,
    solubilityGPer100mL: 'Infinie',
    odeur: 'Odeur très intense de poisson avarié',
    wolofTip: 'Amine tertiaire : amul benn H ci azote bi ! Motax mënut a def liaisons hydrogène entre moom ak moroomam (Teb = 2,9 °C).',
  },
  {
    id: 'tert-butylamine',
    name: '2-méthylpropan-2-amine',
    brute: 'C₄H₁₁N',
    carbonCount: 4,
    molMass: 73.14,
    classe: '1',
    classeLabel: 'Primaire (1°)',
    semiDeveloppee: '(CH₃)₃C—NH₂',
    topologique: '(CH3)3C-NH2',
    nbHSurN: 2,
    nbAlkylesOnN: 1,
    iupacBreakdown: {
      chain: 'Propan-2-amine (3 carbones)',
      position: 2,
      substituants: 'Groupe 2-méthyle (carbone tertiaire)',
    },
    tEb: 44.4,
    alcaneCorrespondant: {
      name: 'Pentane (M = 72 g/mol)',
      brute: 'C₅H₁₂',
      tEb: 36.1,
    },
    pKa: 10.68,
    solubilityGPer100mL: 'Infinie',
    odeur: 'Odeur d\'ammoniac camphrée',
    wolofTip: 'PIÈGE MAJEUR BAC : Carbone bi tertiaire la wanté azote bi am na 2 H (-NH₂), kon amine PRIMAIRE la !',
  },
  {
    id: 'aniline',
    name: 'Aniline (Phénylamine)',
    brute: 'C₆H₇N',
    carbonCount: 6,
    molMass: 93.13,
    classe: '1',
    classeLabel: 'Primaire (1°)',
    semiDeveloppee: 'C₆H₅—NH₂',
    topologique: 'C6H5-NH2',
    nbHSurN: 2,
    nbAlkylesOnN: 1,
    iupacBreakdown: {
      chain: 'Cycle benzénique (6 carbones)',
      position: 1,
      substituants: 'Amine aromatique primaire',
    },
    tEb: 184.1,
    alcaneCorrespondant: {
      name: 'Toluène (M = 92 g/mol)',
      brute: 'C₇H₈',
      tEb: 110.6,
    },
    pKa: 4.63,
    solubilityGPer100mL: 3.6,
    odeur: 'Odeur aromatique caractéristique âcre, liquide huileux',
    wolofTip: 'Aniline base bu néew doole la (pKa = 4,63) ndax doublet azote bi dafa tàbi ci biir cycle benzène bi par mésomérie.',
  },
];

type LabMode = 'structure' | 'thermal' | 'ph_bench' | 'hofmann' | 'mystery';

export default function AminesInteractiveSimulator() {
  const [selectedAmineId, setSelectedAmineId] = useState<string>('ethanamine');
  const [activeMode, setActiveMode] = useState<LabMode>('structure');

  // État Mode 1 : Structure
  const [selectedAtom, setSelectedAtom] = useState<'none' | 'n_center' | 'nh_bonds' | 'r_chain'>('none');

  // État Mode 2 : Banc thermique
  const [thermalTemp, setThermalTemp] = useState<number>(20);
  const [isBurnerActive, setIsBurnerActive] = useState<boolean>(false);

  // État Mode 3 : pH-mètre & Basicité
  const [concentrationLog, setConcentrationLog] = useState<number>(-2); // C = 10^-2 mol/L
  const [isProbeImmersed, setIsProbeImmersed] = useState<boolean>(true);

  // État Mode 4 : Réacteur d'Hofmann
  const [hofmannStep, setHofmannStep] = useState<number>(1);
  const [reagentRatio, setReagentRatio] = useState<'amine_excess' | 'stoechio' | 'halogene_excess'>('amine_excess');
  const [showAcylReaction, setShowAcylReaction] = useState<boolean>(false);

  // État Mode 5 : Défi Bac Mystère
  const [mysteryTarget, setMysteryTarget] = useState<AmineItem | null>(null);
  const [mysteryRevealed, setMysteryRevealed] = useState<boolean>(false);
  const [mysteryUserClass, setMysteryUserClass] = useState<'1' | '2' | '3' | null>(null);
  const [mysteryUserAmineId, setMysteryUserAmineId] = useState<string | null>(null);

  const amine = AMINES_DATA.find((a) => a.id === selectedAmineId) || AMINES_DATA[0];

  // Gestion du chauffage du bec Bunsen
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isBurnerActive) {
      timer = setInterval(() => {
        setThermalTemp((prev) => {
          if (prev >= 190) {
            setIsBurnerActive(false);
            return 190;
          }
          return prev + 2;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isBurnerActive]);

  // Génération Défi Mystère
  const handleGenerateMystery = () => {
    const random = AMINES_DATA[Math.floor(Math.random() * AMINES_DATA.length)];
    setMysteryTarget(random);
    setMysteryRevealed(false);
    setMysteryUserClass(null);
    setMysteryUserAmineId(null);
  };

  // Calcul du pH théorique de la solution d'amine :
  // B + H2O <=> BH+ + OH-
  // [OH-] = sqrt(Kb * C) => pOH = 0.5 * (pKb - log C) => pH = 14 - pOH = 7 + 0.5 * (pKa + log C)
  const concentration = Math.pow(10, concentrationLog);
  const calculatedPH = Math.min(
    13.9,
    Math.max(
      1.0,
      Number((7 + 0.5 * (amine.pKa + concentrationLog)).toFixed(2))
    )
  );

  const isEbullition = thermalTemp >= amine.tEb;
  const isAlcaneEbullition = thermalTemp >= amine.alcaneCorrespondant.tEb;

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
            <span>Simulateur & Laboratoire d&apos;Amines</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-navy/5 text-navy border border-navy/10">
              C2 Chimie
            </span>
          </h2>
        </div>

        {/* Indicateurs rapides */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-turquoise-light/60 text-turquoise font-mono text-xs px-3 py-1 font-extrabold border border-turquoise/20">
            {amine.brute}
          </span>
          <span className="rounded-full bg-navy/5 text-navy font-mono text-xs px-3 py-1 font-bold">
            M = {amine.molMass} g/mol
          </span>
          <span className="rounded-full bg-indigo-50 text-indigo-700 font-mono text-xs px-3 py-1 font-bold border border-indigo-200">
            pK_a = {amine.pKa}
          </span>
          <span
            className={`rounded-full text-xs px-3 py-1 font-black ${
              amine.classe === '1'
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : amine.classe === '2'
                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                : 'bg-rose-100 text-rose-800 border border-rose-300'
            }`}
          >
            {amine.classeLabel}
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
          <span>1. Structure & Azote</span>
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
          onClick={() => setActiveMode('ph_bench')}
          className={`py-2 px-2.5 text-center rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeMode === 'ph_bench'
              ? 'bg-white text-navy shadow-sm border border-navy/10'
              : 'text-navy/60 hover:text-navy'
          }`}
        >
          <Droplets className="w-3.5 h-3.5 text-sky-500 shrink-0" />
          <span>3. pH-mètre & Basicité</span>
        </button>

        <button
          onClick={() => setActiveMode('hofmann')}
          className={`py-2 px-2.5 text-center rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeMode === 'hofmann'
              ? 'bg-white text-navy shadow-sm border border-navy/10'
              : 'text-navy/60 hover:text-navy'
          }`}
        >
          <TestTube className="w-3.5 h-3.5 text-purple-600 shrink-0" />
          <span>4. Hofmann & Amides</span>
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

      {/* ── SÉLECTEUR MANIABLE D'AMINES (Actif en mode 1, 2, 3, 4) ── */}
      {activeMode !== 'mystery' && (
        <div className="space-y-2 bg-surface/50 p-3 sm:p-4 rounded-2xl border border-navy/5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
            <span className="font-bold uppercase tracking-wider text-navy/70 flex items-center gap-1.5">
              <Beaker className="w-3.5 h-3.5 text-turquoise" />
              <span>Flacon d&apos;amine sélectionné :</span>
            </span>
            <span className="text-[11px] text-navy/50 font-medium">
              Cliquez pour changer de molécule et observer les propriétés
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-1.5">
            {AMINES_DATA.map((item) => {
              const isSelected = selectedAmineId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedAmineId(item.id);
                    setSelectedAtom('none');
                  }}
                  className={`px-2 py-2 rounded-xl text-center border transition-all flex flex-col items-center justify-center min-w-0 ${
                    isSelected
                      ? 'bg-navy text-white border-navy shadow-sm ring-2 ring-turquoise/40'
                      : 'bg-white hover:bg-surface-muted text-navy border-navy/10'
                  }`}
                >
                  <span className="text-[10px] sm:text-[11px] font-bold truncate w-full">{item.name.split('(')[0].trim()}</span>
                  <span
                    className={`text-[9px] font-black uppercase mt-0.5 px-1.5 py-0.2 rounded ${
                      item.classe === '1'
                        ? isSelected ? 'bg-emerald-500/30 text-emerald-300' : 'bg-emerald-100 text-emerald-800'
                        : item.classe === '2'
                        ? isSelected ? 'bg-amber-500/30 text-amber-300' : 'bg-amber-100 text-amber-800'
                        : isSelected ? 'bg-rose-500/30 text-rose-300' : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {item.classe}°
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* MODE 1 : STRUCTURE & AZOTE INTERACTIF                           */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {activeMode === 'structure' && (
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Visualiseur Moléculaire Interactif */}
          <div className="lg:col-span-7 bg-surface/60 rounded-2xl border border-navy/10 p-4 sm:p-5 flex flex-col justify-between space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-navy/60 flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-turquoise" />
                <span>Clique sur une partie de l&apos;amine pour l&apos;analyser :</span>
              </span>
              <span className="text-[11px] text-navy/50 font-medium">Formule semi-développée</span>
            </div>

            {/* Scène de la Molécule avec Boutons Cliquables */}
            <div className="bg-white rounded-2xl border border-navy/10 p-5 min-h-[190px] flex flex-col items-center justify-center relative shadow-inner overflow-hidden">
              {/* Légende interactive */}
              <div className="flex flex-wrap items-center justify-center gap-2 text-[10px] font-bold pb-4">
                <button
                  onClick={() => setSelectedAtom('n_center')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-all ${
                    selectedAtom === 'n_center'
                      ? 'bg-blue-100 text-blue-900 border-blue-400 font-extrabold shadow-sm'
                      : 'bg-surface text-navy/60 border-navy/5 hover:text-navy'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <span>Azote Central (:N)</span>
                </button>

                <button
                  onClick={() => setSelectedAtom('nh_bonds')}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-all ${
                    selectedAtom === 'nh_bonds'
                      ? 'bg-emerald-100 text-emerald-900 border-emerald-400 font-extrabold shadow-sm'
                      : 'bg-surface text-navy/60 border-navy/5 hover:text-navy'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span>Hydrogènes Liés ({amine.nbHSurN} H)</span>
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
                  <span>Chaînes Alkyles ({amine.nbAlkylesOnN} R)</span>
                </button>
              </div>

              {/* Rendu Moléculaire Interactif */}
              <div className="w-full overflow-x-auto py-3 flex items-center justify-center">
                <div className="flex items-center justify-center text-lg sm:text-2xl font-mono font-black min-w-fit px-3">
                  {/* Visualisation éthanamine */}
                  {amine.id === 'ethanamine' && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setSelectedAtom('r_chain')}
                        className={`px-3 py-2 rounded-xl border transition-all ${
                          selectedAtom === 'r_chain'
                            ? 'bg-indigo-200 text-indigo-950 border-indigo-500 ring-2 ring-indigo-400 scale-105'
                            : 'bg-indigo-50 text-indigo-900 border-indigo-200'
                        }`}
                      >
                        CH₃—CH₂
                      </button>
                      <span className="text-navy/30 px-1 font-sans">—</span>
                      <button
                        onClick={() => setSelectedAtom('n_center')}
                        className={`px-3 py-2 rounded-xl border-2 transition-all ${
                          selectedAtom === 'n_center'
                            ? 'bg-blue-200 text-blue-950 border-blue-500 ring-2 ring-blue-400 scale-105 shadow-md'
                            : 'bg-blue-50 text-blue-900 border-blue-300'
                        }`}
                      >
                        <span className="underline font-extrabold text-blue-800">N</span>
                      </button>
                      <button
                        onClick={() => setSelectedAtom('nh_bonds')}
                        className={`px-2.5 py-2 rounded-xl border transition-all ${
                          selectedAtom === 'nh_bonds'
                            ? 'bg-emerald-200 text-emerald-950 border-emerald-500 ring-2 ring-emerald-400 scale-105'
                            : 'bg-emerald-50 text-emerald-900 border-emerald-200'
                        }`}
                      >
                        H₂
                      </button>
                    </div>
                  )}

                  {/* N-méthyléthanamine */}
                  {amine.id === 'n-methylethanamine' && (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setSelectedAtom('r_chain')}
                        className="px-2.5 py-1.5 rounded-xl border bg-indigo-50 text-indigo-900 border-indigo-200"
                      >
                        CH₃—CH₂
                      </button>
                      <span className="text-navy/30 px-1 font-sans">—</span>
                      <button
                        onClick={() => setSelectedAtom('n_center')}
                        className="px-3 py-1.5 rounded-xl border-2 bg-blue-50 text-blue-900 border-blue-300"
                      >
                        <span className="underline font-extrabold text-blue-800">N</span>H
                      </button>
                      <span className="text-navy/30 px-1 font-sans">—</span>
                      <button
                        onClick={() => setSelectedAtom('r_chain')}
                        className="px-2.5 py-1.5 rounded-xl border bg-indigo-50 text-indigo-900 border-indigo-200"
                      >
                        CH₃
                      </button>
                    </div>
                  )}

                  {/* Triméthylamine */}
                  {amine.id === 'trimethylamine' && (
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
                          onClick={() => setSelectedAtom('n_center')}
                          className="px-3 py-1.5 rounded-xl border-2 bg-blue-50 text-blue-900 border-blue-300"
                        >
                          <span className="underline font-extrabold text-blue-800">N</span>
                        </button>
                        <span className="text-navy/30 font-sans">—</span>
                        <button
                          onClick={() => setSelectedAtom('r_chain')}
                          className="px-2 py-1 bg-indigo-50 text-indigo-900 border border-indigo-200 rounded-xl text-xs"
                        >
                          CH₃
                        </button>
                      </div>
                    </div>
                  )}

                  {/* 2-méthylpropan-2-amine (tert-butylamine - Le Piège) */}
                  {amine.id === 'tert-butylamine' && (
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => setSelectedAtom('r_chain')}
                        className="px-2 py-0.5 bg-indigo-50 text-indigo-900 border border-indigo-200 rounded-xl text-xs mb-0.5"
                      >
                        CH₃
                      </button>
                      <span className="text-navy/30 font-sans leading-none">|</span>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-slate-500 font-mono">H₃C—</span>
                        <span className="px-2 py-1 bg-cyan-50 border border-cyan-300 text-cyan-900 rounded-xl text-xs font-bold">C</span>
                        <span className="text-xs text-slate-500 font-mono">—</span>
                        <button
                          onClick={() => setSelectedAtom('n_center')}
                          className="px-2.5 py-1 bg-blue-50 text-blue-900 border-2 border-blue-300 rounded-xl text-sm"
                        >
                          <span className="underline font-bold text-blue-800">N</span>H₂
                        </button>
                      </div>
                      <span className="text-navy/30 font-sans leading-none">|</span>
                      <button
                        onClick={() => setSelectedAtom('r_chain')}
                        className="px-2 py-0.5 bg-indigo-50 text-indigo-900 border border-indigo-200 rounded-xl text-xs mt-0.5"
                      >
                        CH₃
                      </button>
                    </div>
                  )}

                  {/* Fallback générique autres molécules */}
                  {amine.id !== 'ethanamine' &&
                    amine.id !== 'n-methylethanamine' &&
                    amine.id !== 'trimethylamine' &&
                    amine.id !== 'tert-butylamine' && (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setSelectedAtom('r_chain')}
                          className="px-3 py-1.5 rounded-xl border bg-indigo-50 text-indigo-900 border-indigo-200"
                        >
                          {amine.semiDeveloppee.replace(/—NH.*$/, '').replace(/NH.*$/, '') || 'R'}
                        </button>
                        <span className="text-navy/30 px-1 font-sans">—</span>
                        <button
                          onClick={() => setSelectedAtom('n_center')}
                          className="px-3 py-1.5 rounded-xl border-2 bg-blue-50 text-blue-900 border-blue-300"
                        >
                          <span className="underline font-extrabold text-blue-800">N</span>
                          {amine.nbHSurN > 0 ? `H${amine.nbHSurN > 1 ? amine.nbHSurN : ''}` : ''}
                        </button>
                      </div>
                    )}
                </div>
              </div>

              {/* Rétroaction interactive lors du clic sur un atome */}
              <div className="w-full mt-3 p-3 rounded-xl bg-surface/70 border border-navy/5 text-xs">
                {selectedAtom === 'n_center' && (
                  <p className="text-blue-900">
                    <strong className="font-black text-blue-800">Azote central (:N) :</strong> Il possède un doublet non-liant disponible pour capter un proton H⁺ (caractère basique) ou attaquer un carbone électrophile (nucléophile d&apos;Hofmann).
                  </p>
                )}
                {selectedAtom === 'nh_bonds' && (
                  <p className="text-emerald-900">
                    <strong className="font-black text-emerald-800">Liaisons N—H ({amine.nbHSurN} H) :</strong> Déterminent la classe ({amine.classeLabel}) et permettent les liaisons hydrogène intermoléculaires N-H···N.
                  </p>
                )}
                {selectedAtom === 'r_chain' && (
                  <p className="text-indigo-900">
                    <strong className="font-black text-indigo-800">Radicaux alkyles ({amine.nbAlkylesOnN} R) :</strong> Exercent un effet inducteur donneur (+I) qui renforce la disponibilité du doublet non liant de l&apos;azote.
                  </p>
                )}
                {selectedAtom === 'none' && (
                  <p className="text-navy/60 italic text-center">
                    Cliquez sur les atomes colorés ci-dessus pour inspecter leur rôle réactionnel officiel au Bac.
                  </p>
                )}
              </div>
            </div>

            {/* Décryptage Nomenclature UICPA */}
            <div className="bg-white rounded-2xl border border-navy/10 p-4 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-navy/40 block">
                Décryptage Officiel UICPA • Bac S2
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                <div className="bg-surface p-2.5 rounded-xl border border-navy/5">
                  <span className="text-navy/50 block text-[10px]">Chaîne Principale :</span>
                  <span className="font-bold text-navy">{amine.iupacBreakdown.chain}</span>
                </div>
                <div className="bg-surface p-2.5 rounded-xl border border-navy/5">
                  <span className="text-navy/50 block text-[10px]">Position de l&apos;azote :</span>
                  <span className="font-bold text-turquoise">Carbone n°{amine.iupacBreakdown.position}</span>
                </div>
                <div className="bg-surface p-2.5 rounded-xl border border-navy/5">
                  <span className="text-navy/50 block text-[10px]">Substituants :</span>
                  <span className="font-bold text-navy">{amine.iupacBreakdown.substituants}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Fiche d'Identité & Conseils Bac */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            <div className="bg-white rounded-2xl border border-navy/10 p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between border-b border-navy/5 pb-3">
                <h3 className="text-base font-black text-navy">{amine.name}</h3>
                <span className="text-xs font-mono font-bold text-turquoise bg-turquoise-light/30 px-2.5 py-0.5 rounded-lg">
                  {amine.brute}
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-navy/5">
                  <span className="text-navy/60">Classe d&apos;amine :</span>
                  <span className="font-bold text-navy">{amine.classeLabel}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-navy/5">
                  <span className="text-navy/60">Hydrogènes sur l&apos;azote :</span>
                  <span className="font-bold text-navy">{amine.nbHSurN} atome(s)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-navy/5">
                  <span className="text-navy/60">Radicaux sur l&apos;azote :</span>
                  <span className="font-bold text-navy">{amine.nbAlkylesOnN} groupe(s)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-navy/5">
                  <span className="text-navy/60">Constante d&apos;acidité :</span>
                  <span className="font-bold text-indigo-700">pK_a = {amine.pKa}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-navy/5">
                  <span className="text-navy/60">Point d&apos;ébullition :</span>
                  <span className="font-bold text-navy">{amine.tEb} °C</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-navy/60">Odeur caractéristique :</span>
                  <span className="font-medium text-navy-light text-right max-w-[180px]">{amine.odeur}</span>
                </div>
              </div>
            </div>

            {/* Repère Wolof */}
            <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 space-y-1">
              <span className="text-[11px] font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                <span>💡</span> Xam-xam ci Wolof :
              </span>
              <p className="text-xs text-amber-950 font-medium italic leading-relaxed">
                {amine.wolofTip}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* MODE 2 : BANC THERMIQUE & LIAISONS HYDROGÈNE                   */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {activeMode === 'thermal' && (
        <div className="space-y-6">
          <div className="bg-surface/50 rounded-2xl border border-navy/10 p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest block">
                  Expérience Physique • Ébullition comparée
                </span>
                <h3 className="text-base sm:text-lg font-black text-navy">
                  Chauffage & Rupture des Liaisons Hydrogène N—H···N
                </h3>
              </div>

              {/* Contrôles Bec Bunsen */}
              <div className="flex items-center gap-2">
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
                    setThermalTemp(20);
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-bold bg-white border border-navy/10 text-navy hover:bg-surface flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>20 °C</span>
                </button>

                <button
                  onClick={() => {
                    setIsBurnerActive(false);
                    setThermalTemp(amine.tEb);
                  }}
                  className="px-3 py-2 rounded-xl text-xs font-bold bg-turquoise-light text-turquoise hover:bg-turquoise hover:text-white transition-colors"
                >
                  Régler à T_éb ({amine.tEb} °C)
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
                max={200}
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
                <span>20 °C (Ambiance)</span>
                <span className="text-turquoise font-extrabold">{amine.tEb} °C (T_éb {amine.name})</span>
                <span>100 °C (Eau)</span>
                <span>184 °C (Aniline)</span>
                <span>200 °C</span>
              </div>
            </div>

            {/* Comparateur en 2 colonnes : Amine vs Alcane */}
            <div className="grid gap-4 sm:grid-cols-2">
              {/* Carte Amine */}
              <div
                className={`p-5 rounded-2xl border transition-all ${
                  isEbullition
                    ? 'bg-rose-50/70 border-rose-300 ring-2 ring-rose-200'
                    : 'bg-white border-navy/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-navy">Amine étudiée :</span>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isEbullition ? 'bg-rose-500 text-white animate-pulse' : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {isEbullition ? 'VAPEUR / ÉBULLITION' : 'ÉTAT LIQUIDE'}
                  </span>
                </div>
                <h4 className="text-lg font-black text-navy mt-1">{amine.name}</h4>
                <p className="text-xs text-navy/60 font-mono">T_éb = {amine.tEb} °C (M = {amine.molMass} g/mol)</p>
                <div className="mt-3 p-3 rounded-xl bg-surface/80 border border-navy/5 text-xs text-navy-light leading-relaxed">
                  {amine.classe === '3' ? (
                    <span>
                      ⚠️ <strong>Amine tertiaire :</strong> Ne possède aucun H sur l&apos;azote. Les molécules ne peuvent pas former de liaisons hydrogène entre elles → température d&apos;ébullition très basse (gaz ou liquide très volatil) !
                    </span>
                  ) : (
                    <span>
                      Liaisons hydrogène intermoléculaires <strong>N—H···N</strong> présentes ({amine.nbHSurN} H donneurs). Ébullition nettement plus haute que l&apos;alcane correspondant !
                    </span>
                  )}
                </div>
              </div>

              {/* Carte Alcane */}
              <div
                className={`p-5 rounded-2xl border transition-all ${
                  isAlcaneEbullition
                    ? 'bg-rose-50/70 border-rose-300 ring-2 ring-rose-200'
                    : 'bg-white border-navy/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-navy">Alcane correspondant :</span>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      isAlcaneEbullition ? 'bg-rose-500 text-white' : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {isAlcaneEbullition ? 'VAPEUR / GAZ' : 'LIQUIDE'}
                  </span>
                </div>
                <h4 className="text-lg font-black text-navy mt-1">{amine.alcaneCorrespondant.name}</h4>
                <p className="text-xs text-navy/60 font-mono">T_éb = {amine.alcaneCorrespondant.tEb} °C</p>
                <div className="mt-3 p-3 rounded-xl bg-surface/80 border border-navy/5 text-xs text-navy-light leading-relaxed">
                  Molécule apolaire, uniquement des liaisons faibles de Van der Waals. Aucune liaison hydrogène possible → passe à l&apos;état gazeux à très basse température.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* MODE 3 : pH-MÈTRE & ÉCHELLE DE BASICITÉ                        */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {activeMode === 'ph_bench' && (
        <div className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-12">
            {/* Paillasse de mesure pH */}
            <div className="lg:col-span-7 bg-surface/50 rounded-2xl border border-navy/10 p-5 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-sky-600 uppercase tracking-widest block">
                    pH-mètrie & Alcalimétrie
                  </span>
                  <h3 className="text-base font-black text-navy">
                    Mesure du pH de la solution d&apos;amine
                  </h3>
                </div>
                <button
                  onClick={() => setIsProbeImmersed(!isProbeImmersed)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                    isProbeImmersed
                      ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                      : 'bg-white text-navy border-navy/10 hover:bg-surface'
                  }`}
                >
                  {isProbeImmersed ? '✓ Sonde plongée' : 'Sonde hors solution'}
                </button>
              </div>

              {/* Écran pH-mètre digital */}
              <div className="bg-navy text-white rounded-2xl p-6 text-center space-y-2 shadow-md">
                <span className="text-[10px] font-mono tracking-widest text-white/50 uppercase block">
                  pH-mètre de précision Al Muxtaar
                </span>
                <div className="font-mono text-5xl font-black text-emerald-400">
                  {isProbeImmersed ? calculatedPH : '—.—'}
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-white/70">
                  <span>Solution : {amine.name}</span>
                  <span>•</span>
                  <span>C = 10^{concentrationLog} mol/L</span>
                </div>
              </div>

              {/* Curseur de concentration C */}
              <div className="bg-white p-4 rounded-xl border border-navy/10 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-navy/70">Concentration molaire C :</span>
                  <span className="font-mono font-bold text-turquoise bg-surface px-2.5 py-0.5 rounded-lg border border-navy/5">
                    C = {concentration.toExponential(0)} mol/L
                  </span>
                </div>
                <input
                  type="range"
                  min={-4}
                  max={-1}
                  step={1}
                  value={concentrationLog}
                  onChange={(e) => setConcentrationLog(Number(e.target.value))}
                  className="w-full h-2.5 bg-navy/10 rounded-lg appearance-none cursor-pointer accent-turquoise"
                />
                <div className="flex justify-between text-[10px] text-navy/40 font-bold">
                  <span>10⁻⁴ mol/L (Diluée)</span>
                  <span>10⁻³ mol/L</span>
                  <span>10⁻² mol/L (Standard Bac)</span>
                  <span>10⁻¹ mol/L (Concentrée)</span>
                </div>
              </div>

              {/* Formule de calcul au Bac */}
              <div className="bg-white p-4 rounded-xl border border-navy/10 space-y-1 text-xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-navy/40 block">
                  Formule officielle Bac S2 pour une base faible :
                </span>
                <p className="font-mono text-navy font-bold">
                  pH ≈ 7 + ½(pK_a + log C) = 7 + ½({amine.pKa} + ({concentrationLog})) = {calculatedPH}
                </p>
                <p className="text-navy/60 text-[11px] pt-1">
                  Valable si la base est faiblement ionisée ([OH⁻] &lt;&lt; C, soit pH &gt; pKa - 1).
                </p>
              </div>
            </div>

            {/* Échelle comparative de basicité */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-navy/10 p-5 space-y-4 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest block">
                  Échelle de pKa
                </span>
                <h4 className="text-base font-black text-navy mt-0.5">
                  Hiérarchie des forces basiques au Bac S2
                </h4>
              </div>

              <div className="space-y-3">
                {[
                  { name: 'Aniline (amine aromatique)', pka: 4.63, tag: 'Base très faible (mésomérie cycle)', color: 'bg-rose-500' },
                  { name: 'Ammoniac NH₃ (référence)', pka: 9.21, tag: 'Base étalon', color: 'bg-amber-500' },
                  { name: 'Amine 1° aliphatique (éthanamine)', pka: 10.65, tag: 'Base forte (+I donneur)', color: 'bg-emerald-500' },
                  { name: 'Amine 2° aliphatique (diéthylamine)', pka: 10.93, tag: 'Base encore plus forte (+I x2)', color: 'bg-teal-500' },
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-surface border border-navy/5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-navy">{item.name}</span>
                      <span className="font-mono text-xs font-black text-navy">pKa = {item.pka}</span>
                    </div>
                    <div className="w-full bg-navy/5 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: `${(item.pka / 12) * 100}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-navy/60 font-medium block">{item.tag}</span>
                  </div>
                ))}
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-3 text-xs text-emerald-950 font-medium leading-relaxed">
                ✓ <strong>Règle d&apos;or du correcteur :</strong> L&apos;effet inducteur donneur +I des radicaux alkyles repousse les électrons vers l&apos;azote N, rendant son doublet libre plus disponible : <strong>R—NH₂ est plus basique que NH₃ !</strong>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* MODE 4 : RÉACTEUR D'HOFMANN & SYNTHÈSE D'AMIDES                */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {activeMode === 'hofmann' && (
        <div className="space-y-6">
          <div className="bg-surface/50 rounded-2xl border border-navy/10 p-5 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold text-purple-600 uppercase tracking-widest block">
                  Réactions chimiques fondamentales
                </span>
                <h3 className="text-base sm:text-lg font-black text-navy">
                  Polyalkylation d&apos;Hofmann & Synthèse d&apos;Amides
                </h3>
              </div>

              {/* Bascule Hofmann vs Acylation */}
              <div className="flex items-center gap-1.5 bg-white p-1 rounded-xl border border-navy/10">
                <button
                  onClick={() => setShowAcylReaction(false)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    !showAcylReaction
                      ? 'bg-navy text-white shadow-sm'
                      : 'text-navy/60 hover:text-navy'
                  }`}
                >
                  1. Alkylation d&apos;Hofmann
                </button>
                <button
                  onClick={() => setShowAcylReaction(true)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    showAcylReaction
                      ? 'bg-navy text-white shadow-sm'
                      : 'text-navy/60 hover:text-navy'
                  }`}
                >
                  2. Synthèse d&apos;Amides (Chlorure d&apos;acyle)
                </button>
              </div>
            </div>

            {!showAcylReaction ? (
              /* Simulation Hofmann */
              <div className="space-y-4">
                {/* Sélecteur de proportion stœchiométrique */}
                <div className="bg-white p-4 rounded-xl border border-navy/10 space-y-2">
                  <span className="text-xs font-bold text-navy/70 block">
                    Conditions opératoires (Ratio halogénoalcane / amine) :
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <button
                      onClick={() => {
                        setReagentRatio('amine_excess');
                        setHofmannStep(1);
                      }}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${
                        reagentRatio === 'amine_excess'
                          ? 'bg-purple-50 border-purple-400 text-purple-950 font-bold shadow-sm'
                          : 'bg-surface border-navy/5 text-navy hover:bg-surface-muted'
                      }`}
                    >
                      <span className="block font-black">Excès d&apos;amine primaire</span>
                      <span className="text-[10px] text-navy/60">Favorise l&apos;amine secondaire (Étape 1)</span>
                    </button>

                    <button
                      onClick={() => {
                        setReagentRatio('stoechio');
                        setHofmannStep(2);
                      }}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${
                        reagentRatio === 'stoechio'
                          ? 'bg-purple-50 border-purple-400 text-purple-950 font-bold shadow-sm'
                          : 'bg-surface border-navy/5 text-navy hover:bg-surface-muted'
                      }`}
                    >
                      <span className="block font-black">Proportions équimolaires</span>
                      <span className="text-[10px] text-navy/60">Mélange d&apos;amines 2° et 3°</span>
                    </button>

                    <button
                      onClick={() => {
                        setReagentRatio('halogene_excess');
                        setHofmannStep(3);
                      }}
                      className={`p-3 rounded-xl border text-left text-xs transition-all ${
                        reagentRatio === 'halogene_excess'
                          ? 'bg-purple-50 border-purple-400 text-purple-950 font-bold shadow-sm'
                          : 'bg-surface border-navy/5 text-navy hover:bg-surface-muted'
                      }`}
                    >
                      <span className="block font-black">Excès d&apos;halogénoalcane CH₃I</span>
                      <span className="text-[10px] text-navy/60">Conduit au sel d&apos;ammonium quaternaire</span>
                    </button>
                  </div>
                </div>

                {/* Étapes illustrées */}
                <div className="bg-white p-5 rounded-2xl border border-navy/10 space-y-4">
                  <div className="flex items-center gap-2 border-b border-navy/5 pb-2">
                    <span className="h-6 w-6 rounded-full bg-purple-600 text-white text-xs font-black flex items-center justify-center">
                      {hofmannStep}
                    </span>
                    <h4 className="text-sm font-black text-navy">
                      {hofmannStep === 1
                        ? 'Étape 1 : Formation de l\'amine secondaire'
                        : hofmannStep === 2
                        ? 'Étape 2 : Formation de l\'amine tertiaire'
                        : 'Étape finale : Formation du sel d\'ammonium quaternaire'}
                    </h4>
                  </div>

                  <div className="bg-surface p-4 rounded-xl border border-navy/5 font-mono text-xs sm:text-sm text-navy overflow-x-auto text-center font-bold">
                    {hofmannStep === 1 && (
                      <MathRenderer content="$$R-\text{NH}_2 + \text{CH}_3-\text{I} \longrightarrow [R-\text{NH}_2-\text{CH}_3]^+ \text{I}^- \xrightarrow{R-\text{NH}_2} R-\text{NH}-\text{CH}_3 + R-\text{NH}_3^+\text{I}^-$$" />
                    )}
                    {hofmannStep === 2 && (
                      <MathRenderer content="$$R-\text{NH}-\text{CH}_3 + \text{CH}_3-\text{I} \longrightarrow [R-\text{NH}(\text{CH}_3)_2]^+ \text{I}^- \xrightarrow{\text{base}} R-\text{N}(\text{CH}_3)_2 + \text{sel}$$" />
                    )}
                    {hofmannStep === 3 && (
                      <MathRenderer content="$$R-\text{N}(\text{CH}_3)_2 + \text{CH}_3-\text{I} \longrightarrow [R-\text{N}(\text{CH}_3)_3]^+ \text{I}^- \quad (\text{sel quaternaire cristallin})$$" />
                    )}
                  </div>

                  <div className="text-xs text-navy-light leading-relaxed">
                    {hofmannStep === 3 ? (
                      <p className="text-purple-900 font-medium">
                        ✓ <strong>Observation :</strong> Apparition d&apos;un précipité cristallin blanc. L&apos;atome d&apos;azote porte 4 liaisons covalentes et une charge positive permanente. Il n&apos;a plus aucun atome d&apos;hydrogène : <strong>la polyalkylation s&apos;arrête définitivement ici !</strong>
                      </p>
                    ) : (
                      <p>
                        L&apos;azote utilise son doublet non-liant pour attaquer le carbone électrophile de l&apos;halogénoalcane par substitution nucléophile (SN2).
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              /* Simulation Synthèse d'Amides */
              <div className="space-y-4">
                <div className="bg-white p-5 rounded-2xl border border-navy/10 space-y-4">
                  <div className="flex items-center justify-between border-b border-navy/5 pb-2">
                    <span className="text-xs font-black uppercase tracking-wider text-rose-700">
                      Action d&apos;un chlorure d&apos;acyle (R—CO—Cl) sur l&apos;amine
                    </span>
                    <span className="rounded-full bg-rose-100 text-rose-800 text-[10px] font-black px-2.5 py-0.5">
                      Réaction Totale & Rapide
                    </span>
                  </div>

                  <div className="bg-surface p-4 rounded-xl border border-navy/5 font-mono text-xs sm:text-sm text-navy overflow-x-auto text-center font-bold">
                    <MathRenderer content="$$R-\text{CO}-\text{Cl} + \mathbf{2}\,R'-\text{NH}_2 \longrightarrow R-\text{CO}-\text{NH}-R' + (R'-\text{NH}_3^+ + \text{Cl}^-)$$" />
                  </div>

                  <div className="grid gap-3 sm:grid-cols-2 text-xs">
                    <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-emerald-950 space-y-1">
                      <span className="font-bold flex items-center gap-1 text-[11px]">
                        <span>✓</span> Pourquoi le Facteur 2 ?
                      </span>
                      <p className="leading-relaxed">
                        1 mole d&apos;amine forme la liaison amide. La 2ème mole d&apos;amine neutralise immédiatement l&apos;acide chlorhydrique HCl libéré pour donner un sel de chlorure d&apos;ammonium.
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 text-rose-950 space-y-1">
                      <span className="font-bold flex items-center gap-1 text-[11px]">
                        <span>⚠️</span> Cas de l&apos;Amine Tertiaire (3°) :
                      </span>
                      <p className="leading-relaxed">
                        Une amine 3° ne possède AUCUN atome d&apos;hydrogène sur l&apos;azote N. Elle ne peut donc <strong>JAMAIS</strong> former d&apos;amide !
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════════════════════════════ */}
      {/* MODE 5 : DÉFI BAC MYSTÈRE                                      */}
      {/* ══════════════════════════════════════════════════════════════ */}
      {activeMode === 'mystery' && mysteryTarget && (
        <div className="bg-gradient-to-br from-amber-500/10 via-white to-amber-500/5 rounded-2xl border border-amber-300 p-5 sm:p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200/60 pb-4">
            <div>
              <span className="text-[10px] font-black text-amber-800 uppercase tracking-widest block">
                Épreuve Pratique Virtuelle • Baccalauréat S2
              </span>
              <h3 className="text-base sm:text-lg font-black text-navy mt-0.5">
                Défi : Identifier l&apos;Amine Inconnue (Échantillon X)
              </h3>
            </div>
            <button
              onClick={handleGenerateMystery}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500 text-white hover:bg-amber-600 shadow-sm flex items-center gap-1.5 transition-all"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Tirer un autre échantillon</span>
            </button>
          </div>

          {/* Indices du Laboratoire */}
          <div className="bg-white rounded-2xl border border-navy/10 p-4 space-y-3 shadow-sm">
            <span className="text-[11px] font-bold uppercase tracking-wider text-navy/60 block">
              Données Expérimentales relevées au Laboratoire :
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div className="bg-surface p-3 rounded-xl border border-navy/5">
                <span className="text-navy/50 block text-[10px]">Masse molaire déterminée :</span>
                <span className="font-mono text-sm font-black text-navy">{mysteryTarget.molMass} g/mol</span>
              </div>
              <div className="bg-surface p-3 rounded-xl border border-navy/5">
                <span className="text-navy/50 block text-[10px]">Température d&apos;ébullition :</span>
                <span className="font-mono text-sm font-black text-turquoise">{mysteryTarget.tEb} °C</span>
              </div>
              <div className="bg-surface p-3 rounded-xl border border-navy/5">
                <span className="text-navy/50 block text-[10px]">pK_a mesuré à 25 °C :</span>
                <span className="font-mono text-sm font-black text-indigo-700">{mysteryTarget.pKa}</span>
              </div>
            </div>
            <div className="bg-surface/60 p-3 rounded-xl border border-navy/5 text-xs">
              <span className="text-navy/50 block text-[10px] font-bold">Odeur et réactivité observées :</span>
              <p className="text-navy-light font-medium mt-0.5">{mysteryTarget.odeur}</p>
            </div>
          </div>

          {/* Questions à l'élève */}
          <div className="space-y-4">
            {/* Étape 1 : Classe */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-navy">
                1. Quelle est la classe de cette amine ?
              </span>
              <div className="grid grid-cols-3 gap-2">
                {(['1', '2', '3'] as const).map((cls) => {
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
                      Classe {cls}°
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Étape 2 : Nom de l'amine */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-navy">
                2. Identifier formellement la molécule parmi la liste :
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-1.5">
                {AMINES_DATA.map((item) => {
                  const isSelected = mysteryUserAmineId === item.id;
                  return (
                    <button
                      key={item.id}
                      disabled={mysteryRevealed}
                      onClick={() => setMysteryUserAmineId(item.id)}
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
                disabled={!mysteryUserClass || !mysteryUserAmineId}
                onClick={() => setMysteryRevealed(true)}
                className="w-full py-3 bg-navy text-white text-xs font-bold rounded-xl shadow-md hover:bg-navy/90 disabled:opacity-40 transition-all"
              >
                Valider mon identification Bac
              </button>
            ) : (
              /* Résultat de la devinette */
              <div className="space-y-3 pt-2">
                <div
                  className={`p-4 rounded-xl border text-xs sm:text-sm font-bold flex items-center gap-2 ${
                    mysteryUserClass === mysteryTarget.classe && mysteryUserAmineId === mysteryTarget.id
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : 'bg-rose-50 border-rose-300 text-rose-900'
                  }`}
                >
                  {mysteryUserClass === mysteryTarget.classe && mysteryUserAmineId === mysteryTarget.id ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>Bravo ! Identification parfaite : il s&apos;agissait bien de {mysteryTarget.name} (Classe {mysteryTarget.classe}°).</span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      <span>Erreur d&apos;identification : la bonne réponse était {mysteryTarget.name} ({mysteryTarget.classeLabel}).</span>
                    </>
                  )}
                </div>

                <div className="bg-surface p-4 rounded-xl border border-navy/5 text-xs text-navy-light space-y-1">
                  <span className="font-bold text-navy">Explication de l&apos;examinateur :</span>
                  <p>
                    La formule semi-développée est <code className="font-bold text-navy">{mysteryTarget.semiDeveloppee}</code>. L&apos;azote porte {mysteryTarget.nbHSurN} atome(s) d&apos;hydrogène, ce qui en fait rigoureusement une amine {mysteryTarget.classeLabel}.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
