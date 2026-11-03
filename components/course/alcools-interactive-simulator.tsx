'use client';

import React, { useState, useEffect } from 'react';

interface AlcoholItem {
  id: string;
  name: string;
  brute: string;
  carbonCount: number;
  molMass: number;
  classe: '1' | '2' | '3';
  classeLabel: 'Primaire (1°)' | 'Secondaire (2°)' | 'Tertiaire (3°)';
  semiDeveloppee: string;
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
  lucasColor: string;
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
    lucasColor: '#10B981',
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
    lucasColor: '#10B981',
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
    lucasColor: '#10B981',
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
    iupacBreakdown: {
      chain: 'Propane (3 carbones)',
      position: 2,
      substituants: 'Groupe -OH sur carbone central C2',
    },
    tEb: 82.5,
    alcaneCorrespondant: {
      name: 'Butane (M = 58 g/mol)',
      brute: 'C₄H₁₀',
      tEb: -0.5,
    },
    solubilityGPer100mL: 'Infinie',
    lucasDelaySec: 300,
    lucasColor: '#F59E0B',
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
    iupacBreakdown: {
      chain: 'Butane (4 carbones)',
      position: 1,
      substituants: 'Linéaire, -OH en bout de chaîne',
    },
    tEb: 117.7,
    alcaneCorrespondant: {
      name: 'Pentane (M = 72 g/mol)',
      brute: 'C₅H₁₂',
      tEb: 36.1,
    },
    solubilityGPer100mL: 9.1,
    lucasDelaySec: -1,
    lucasColor: '#10B981',
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
    iupacBreakdown: {
      chain: 'Butane (4 carbones)',
      position: 2,
      substituants: 'Groupe -OH sur le carbone C2',
    },
    tEb: 99.5,
    alcaneCorrespondant: {
      name: 'Pentane (M = 72 g/mol)',
      brute: 'C₅H₁₂',
      tEb: 36.1,
    },
    solubilityGPer100mL: 12.5,
    lucasDelaySec: 300,
    lucasColor: '#F59E0B',
  },
  {
    id: '2-methylpropan-2-ol',
    name: '2-méthylpropan-2-ol',
    brute: 'C₄H₁₀O',
    carbonCount: 4,
    molMass: 74.12,
    classe: '3',
    classeLabel: 'Tertiaire (3°)',
    semiDeveloppee: 'CH₃—C(CH₃)(OH)—CH₃',
    iupacBreakdown: {
      chain: 'Propane (3 carbones)',
      position: 2,
      substituants: 'Méthyle (-CH₃) sur C2 et -OH sur C2',
    },
    tEb: 82.4,
    alcaneCorrespondant: {
      name: '2-méthylbutane (M = 72 g/mol)',
      brute: 'C₅H₁₂',
      tEb: 27.8,
    },
    solubilityGPer100mL: 'Infinie',
    lucasDelaySec: 15,
    lucasColor: '#EF4444',
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
    iupacBreakdown: {
      chain: 'Pentane (5 carbones)',
      position: 1,
      substituants: 'Linéaire, chaîne lipophile prédominante',
    },
    tEb: 137.9,
    alcaneCorrespondant: {
      name: 'Hexane (M = 86 g/mol)',
      brute: 'C₆H₁₄',
      tEb: 68.7,
    },
    solubilityGPer100mL: 2.2,
    lucasDelaySec: -1,
    lucasColor: '#10B981',
  },
];

export default function AlcoolsInteractiveSimulator() {
  const [selectedAlcoholId, setSelectedAlcoholId] = useState<string>('ethanol');
  const [activeMode, setActiveMode] = useState<'structure' | 'thermal' | 'solubility' | 'lucas'>('structure');

  // État du simulateur thermique
  const [thermalTemp, setThermalTemp] = useState<number>(25);

  // État du test de Lucas
  const [lucasTimerRunning, setLucasTimerRunning] = useState<boolean>(false);
  const [lucasElapsedSeconds, setLucasElapsedSeconds] = useState<number>(0);
  const [lucasReagentPoured, setLucasReagentPoured] = useState<boolean>(false);

  const alcohol = ALCOHOL_DATA.find((a) => a.id === selectedAlcoholId) || ALCOHOL_DATA[0];

  // Gestion du chronomètre de Lucas
  useEffect(() => {
    let interval: any;
    if (lucasTimerRunning) {
      interval = setInterval(() => {
        setLucasElapsedSeconds((prev) => {
          if (alcohol.classe === '3' && prev >= 20) {
            setLucasTimerRunning(false);
            return 20;
          }
          if (alcohol.classe === '2' && prev >= 320) {
            setLucasTimerRunning(false);
            return 320;
          }
          if (alcohol.classe === '1' && prev >= 60) {
            setLucasTimerRunning(false);
            return 60;
          }
          return prev + 1;
        });
      }, 200);
    }
    return () => clearInterval(interval);
  }, [lucasTimerRunning, alcohol.classe]);

  const handleResetLucas = () => {
    setLucasTimerRunning(false);
    setLucasElapsedSeconds(0);
    setLucasReagentPoured(false);
  };

  const handleStartLucas = () => {
    setLucasReagentPoured(true);
    setLucasElapsedSeconds(0);
    setLucasTimerRunning(true);
  };

  const isEbullition = thermalTemp >= alcohol.tEb;
  const isAlcaneEbullition = thermalTemp >= alcohol.alcaneCorrespondant.tEb;

  // Calcul du trouble de Lucas
  const isTroubled =
    lucasReagentPoured &&
    ((alcohol.classe === '3' && lucasElapsedSeconds >= 10) ||
      (alcohol.classe === '2' && lucasElapsedSeconds >= 150));

  return (
    <section className="bg-white rounded-3xl border border-navy/10 p-5 sm:p-7 shadow-sm space-y-6">
      {/* En-tête du Simulateur */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-bold text-turquoise uppercase tracking-widest">
              Laboratoire Virtuel de Chimie Organique • Bac S2
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-navy mt-1">
            Simulateur Moléculaire & Banc d&apos;Essai des Alcools
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-navy/5 text-navy font-mono text-xs px-3 py-1 font-bold">
            {alcohol.brute} • M = {alcohol.molMass} g/mol
          </span>
        </div>
      </div>

      {/* Sélecteur de molécule */}
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-wider text-navy/70 flex items-center justify-between">
          <span>Choisir une molécule étudiée au Bac S2 :</span>
          <span className="text-turquoise font-semibold">{alcohol.name} ({alcohol.classeLabel})</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5">
          {ALCOHOL_DATA.map((item) => {
            const isSelected = item.id === selectedAlcoholId;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedAlcoholId(item.id);
                  handleResetLucas();
                }}
                className={`px-2 py-2 rounded-xl text-center border transition-all flex flex-col items-center justify-center ${
                  isSelected
                    ? 'bg-navy text-white border-navy shadow-sm'
                    : 'bg-surface hover:bg-surface-muted text-navy border-navy/5'
                }`}
              >
                <span className="text-[11px] font-bold truncate w-full">{item.name}</span>
                <span
                  className={`text-[9px] font-black uppercase mt-0.5 px-1 rounded ${
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

      {/* Navigation des 4 modes du laboratoire */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-surface rounded-2xl border border-navy/10">
        <button
          onClick={() => setActiveMode('structure')}
          className={`flex-1 min-w-[130px] py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            activeMode === 'structure'
              ? 'bg-white text-navy shadow-sm border border-navy/10'
              : 'text-navy/60 hover:text-navy'
          }`}
        >
          1. Structure & Classe
        </button>
        <button
          onClick={() => setActiveMode('thermal')}
          className={`flex-1 min-w-[130px] py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            activeMode === 'thermal'
              ? 'bg-white text-navy shadow-sm border border-navy/10'
              : 'text-navy/60 hover:text-navy'
          }`}
        >
          2. Banc Thermique (Liaisons H)
        </button>
        <button
          onClick={() => setActiveMode('solubility')}
          className={`flex-1 min-w-[130px] py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            activeMode === 'solubility'
              ? 'bg-white text-navy shadow-sm border border-navy/10'
              : 'text-navy/60 hover:text-navy'
          }`}
        >
          3. Solubilité & Miscibilité
        </button>
        <button
          onClick={() => setActiveMode('lucas')}
          className={`flex-1 min-w-[130px] py-2 px-3 rounded-xl text-xs font-bold transition-all ${
            activeMode === 'lucas'
              ? 'bg-white text-navy shadow-sm border border-navy/10'
              : 'text-navy/60 hover:text-navy'
          }`}
        >
          4. Test de Lucas (Tube à essai)
        </button>
      </div>

      {/* MODE 1 : Structure, Formule Semi-Développée & Détection de Classe */}
      {activeMode === 'structure' && (
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Rendu Moléculaire SVG */}
          <div className="lg:col-span-7 bg-surface/60 rounded-2xl border border-navy/10 p-5 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-navy/50">
                Visualisation Moléculaire Semi-Développée
              </span>
              <span
                className={`text-xs font-black uppercase px-2.5 py-1 rounded-full ${
                  alcohol.classe === '1'
                    ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    : alcohol.classe === '2'
                    ? 'bg-amber-100 text-amber-800 border border-amber-300'
                    : 'bg-rose-100 text-rose-800 border border-rose-300'
                }`}
              >
                Classe {alcohol.classeLabel}
              </span>
            </div>

            {/* Schéma vectoriel interactif */}
            <div className="bg-white rounded-xl border border-navy/10 p-6 flex flex-col items-center justify-center min-h-[190px] relative overflow-hidden shadow-inner">
              {/* Légende interactive */}
              <div className="absolute top-2 left-3 flex items-center gap-3 text-[10px] font-bold text-navy/50">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 inline-block" /> Carbone Fonctionnel
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Groupe Hydroxyle (-OH)
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 inline-block" /> Chaînes Alkyles
                </span>
              </div>

              {/* Rendu textuel stylisé de la molécule */}
              <div className="pt-4 flex items-center justify-center flex-wrap gap-2 text-lg sm:text-2xl font-mono font-black">
                {alcohol.id === 'methanol' && (
                  <div className="flex items-center">
                    <span className="px-3 py-1.5 bg-cyan-100 text-cyan-900 border-2 border-cyan-400 rounded-xl shadow-sm">
                      H₃<span className="text-cyan-600 font-extrabold underline">C</span>
                    </span>
                    <span className="text-navy/40 px-1 font-sans">—</span>
                    <span className="px-3 py-1.5 bg-rose-100 text-rose-900 border-2 border-rose-400 rounded-xl shadow-sm">
                      OH
                    </span>
                  </div>
                )}

                {alcohol.id === 'ethanol' && (
                  <div className="flex items-center">
                    <span className="px-2 py-1.5 bg-indigo-50 text-indigo-900 border border-indigo-200 rounded-xl">
                      CH₃
                    </span>
                    <span className="text-navy/40 px-1 font-sans">—</span>
                    <span className="px-3 py-1.5 bg-cyan-100 text-cyan-900 border-2 border-cyan-400 rounded-xl shadow-sm">
                      <span className="text-cyan-600 font-extrabold underline">C</span>H₂
                    </span>
                    <span className="text-navy/40 px-1 font-sans">—</span>
                    <span className="px-3 py-1.5 bg-rose-100 text-rose-900 border-2 border-rose-400 rounded-xl shadow-sm">
                      OH
                    </span>
                  </div>
                )}

                {alcohol.id === 'propan-1-ol' && (
                  <div className="flex items-center">
                    <span className="px-2 py-1.5 bg-indigo-50 text-indigo-900 border border-indigo-200 rounded-xl">
                      CH₃—CH₂
                    </span>
                    <span className="text-navy/40 px-1 font-sans">—</span>
                    <span className="px-3 py-1.5 bg-cyan-100 text-cyan-900 border-2 border-cyan-400 rounded-xl shadow-sm">
                      <span className="text-cyan-600 font-extrabold underline">C</span>H₂
                    </span>
                    <span className="text-navy/40 px-1 font-sans">—</span>
                    <span className="px-3 py-1.5 bg-rose-100 text-rose-900 border-2 border-rose-400 rounded-xl shadow-sm">
                      OH
                    </span>
                  </div>
                )}

                {alcohol.id === 'propan-2-ol' && (
                  <div className="flex flex-col items-center">
                    <span className="px-3 py-1.5 bg-rose-100 text-rose-900 border-2 border-rose-400 rounded-xl shadow-sm mb-1">
                      OH
                    </span>
                    <span className="text-navy/40 font-sans">|</span>
                    <div className="flex items-center">
                      <span className="px-2 py-1.5 bg-indigo-50 text-indigo-900 border border-indigo-200 rounded-xl">
                        CH₃
                      </span>
                      <span className="text-navy/40 px-1 font-sans">—</span>
                      <span className="px-3 py-1.5 bg-cyan-100 text-cyan-900 border-2 border-cyan-400 rounded-xl shadow-sm">
                        <span className="text-cyan-600 font-extrabold underline">C</span>H
                      </span>
                      <span className="text-navy/40 px-1 font-sans">—</span>
                      <span className="px-2 py-1.5 bg-indigo-50 text-indigo-900 border border-indigo-200 rounded-xl">
                        CH₃
                      </span>
                    </div>
                  </div>
                )}

                {alcohol.id === 'butan-1-ol' && (
                  <div className="flex items-center">
                    <span className="px-2 py-1.5 bg-indigo-50 text-indigo-900 border border-indigo-200 rounded-xl">
                      CH₃—CH₂—CH₂
                    </span>
                    <span className="text-navy/40 px-1 font-sans">—</span>
                    <span className="px-3 py-1.5 bg-cyan-100 text-cyan-900 border-2 border-cyan-400 rounded-xl shadow-sm">
                      <span className="text-cyan-600 font-extrabold underline">C</span>H₂
                    </span>
                    <span className="text-navy/40 px-1 font-sans">—</span>
                    <span className="px-3 py-1.5 bg-rose-100 text-rose-900 border-2 border-rose-400 rounded-xl shadow-sm">
                      OH
                    </span>
                  </div>
                )}

                {alcohol.id === 'butan-2-ol' && (
                  <div className="flex flex-col items-center">
                    <span className="px-3 py-1.5 bg-rose-100 text-rose-900 border-2 border-rose-400 rounded-xl shadow-sm mb-1">
                      OH
                    </span>
                    <span className="text-navy/40 font-sans">|</span>
                    <div className="flex items-center">
                      <span className="px-2 py-1.5 bg-indigo-50 text-indigo-900 border border-indigo-200 rounded-xl">
                        CH₃—CH₂
                      </span>
                      <span className="text-navy/40 px-1 font-sans">—</span>
                      <span className="px-3 py-1.5 bg-cyan-100 text-cyan-900 border-2 border-cyan-400 rounded-xl shadow-sm">
                        <span className="text-cyan-600 font-extrabold underline">C</span>H
                      </span>
                      <span className="text-navy/40 px-1 font-sans">—</span>
                      <span className="px-2 py-1.5 bg-indigo-50 text-indigo-900 border border-indigo-200 rounded-xl">
                        CH₃
                      </span>
                    </div>
                  </div>
                )}

                {alcohol.id === '2-methylpropan-2-ol' && (
                  <div className="flex flex-col items-center">
                    <span className="px-2.5 py-1 bg-indigo-50 text-indigo-900 border border-indigo-200 rounded-xl text-sm mb-1">
                      CH₃
                    </span>
                    <span className="text-navy/40 font-sans leading-none">|</span>
                    <div className="flex items-center">
                      <span className="px-2 py-1.5 bg-indigo-50 text-indigo-900 border border-indigo-200 rounded-xl">
                        CH₃
                      </span>
                      <span className="text-navy/40 px-1 font-sans">—</span>
                      <span className="px-3 py-1.5 bg-cyan-100 text-cyan-900 border-2 border-cyan-400 rounded-xl shadow-sm">
                        <span className="text-cyan-600 font-extrabold underline">C</span>
                      </span>
                      <span className="text-navy/40 px-1 font-sans">—</span>
                      <span className="px-3 py-1.5 bg-rose-100 text-rose-900 border-2 border-rose-400 rounded-xl shadow-sm">
                        OH
                      </span>
                    </div>
                    <span className="text-navy/40 font-sans leading-none">|</span>
                    <span className="px-2.5 py-1 bg-indigo-50 text-indigo-900 border border-indigo-200 rounded-xl text-sm mt-1">
                      CH₃
                    </span>
                  </div>
                )}

                {alcohol.id === 'pentan-1-ol' && (
                  <div className="flex items-center">
                    <span className="px-2 py-1.5 bg-indigo-50 text-indigo-900 border border-indigo-200 rounded-xl">
                      CH₃—(CH₂)₃
                    </span>
                    <span className="text-navy/40 px-1 font-sans">—</span>
                    <span className="px-3 py-1.5 bg-cyan-100 text-cyan-900 border-2 border-cyan-400 rounded-xl shadow-sm">
                      <span className="text-cyan-600 font-extrabold underline">C</span>H₂
                    </span>
                    <span className="text-navy/40 px-1 font-sans">—</span>
                    <span className="px-3 py-1.5 bg-rose-100 text-rose-900 border-2 border-rose-400 rounded-xl shadow-sm">
                      OH
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Voyants carbones voisins */}
            <div className="p-3 bg-white rounded-xl border border-navy/10 flex items-center justify-between text-xs">
              <span className="font-bold text-navy/70">Carbones liés au carbone fonctionnel :</span>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2 py-1 rounded font-bold ${
                    alcohol.classe === '1'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-surface text-navy/40'
                  }`}
                >
                  {alcohol.id === 'methanol' ? '0 carbone (Convention)' : '1 seul carbone (R—CH₂—OH)'}
                </span>
                <span
                  className={`px-2 py-1 rounded font-bold ${
                    alcohol.classe === '2'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-surface text-navy/40'
                  }`}
                >
                  2 carbones (R—CH(OH)—R&apos;)
                </span>
                <span
                  className={`px-2 py-1 rounded font-bold ${
                    alcohol.classe === '3'
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : 'bg-surface text-navy/40'
                  }`}
                >
                  3 carbones (R—C(R&apos;)(OH)—R&apos;&apos;)
                </span>
              </div>
            </div>
          </div>

          {/* Fiche d'Analyse Pédagogique UICPA */}
          <div className="lg:col-span-5 bg-white rounded-2xl border border-navy/10 p-5 space-y-4 shadow-sm">
            <h3 className="text-sm font-black uppercase tracking-wider text-navy border-b border-navy/10 pb-2">
              Décorticage Pédagogique UICPA
            </h3>

            <div className="space-y-3 text-xs">
              <div className="bg-surface p-3 rounded-xl border border-navy/5">
                <span className="font-bold text-navy/50 uppercase text-[10px] block">
                  1. Chaîne Principale
                </span>
                <p className="font-semibold text-navy mt-0.5">
                  {alcohol.iupacBreakdown.chain}
                </p>
              </div>

              <div className="bg-surface p-3 rounded-xl border border-navy/5">
                <span className="font-bold text-navy/50 uppercase text-[10px] block">
                  2. Numérotation du Carbone Fonctionnel
                </span>
                <p className="font-semibold text-turquoise mt-0.5">
                  Position n° {alcohol.iupacBreakdown.position} (plus petit indice attribué au groupe -OH)
                </p>
              </div>

              <div className="bg-surface p-3 rounded-xl border border-navy/5">
                <span className="font-bold text-navy/50 uppercase text-[10px] block">
                  3. Ramifications Alkyles
                </span>
                <p className="font-semibold text-navy mt-0.5">
                  {alcohol.iupacBreakdown.substituants}
                </p>
              </div>

              <div className="bg-navy text-white p-3.5 rounded-xl shadow-sm">
                <span className="font-bold text-white/60 uppercase text-[10px] block">
                  Nom Officiel Complet UICPA :
                </span>
                <p className="text-base font-black text-turquoise-light mt-0.5">
                  {alcohol.name}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2 : Banc Thermique & Liaisons Hydrogène */}
      {activeMode === 'thermal' && (
        <div className="space-y-6">
          <div className="bg-surface/50 rounded-2xl border border-navy/10 p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-black text-navy">
                  Comparaison des Températures d&apos;Ébullition : Alcool vs Alcane
                </h3>
                <p className="text-xs text-navy/60 mt-0.5">
                  Mettez en évidence l&apos;influence cruciale des ponts hydrogène intermoléculaires (—O—H···O—).
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-navy/70">Température de chauffe :</span>
                <span className="font-mono text-base font-black text-turquoise bg-white px-3 py-1 rounded-xl border border-navy/10 shadow-sm">
                  {thermalTemp} °C
                </span>
              </div>
            </div>

            {/* Slider de Température */}
            <div className="space-y-1.5">
              <input
                type="range"
                min={-50}
                max={150}
                step={1}
                value={thermalTemp}
                onChange={(e) => setThermalTemp(Number(e.target.value))}
                className="w-full h-2 bg-navy/10 rounded-lg appearance-none cursor-pointer accent-turquoise"
              />
              <div className="flex justify-between text-[10px] text-navy/50 font-bold">
                <span>-50 °C (Très froid)</span>
                <span>0 °C (Glace)</span>
                <span>25 °C (Ambiance)</span>
                <span>78 °C (Ébullition éthanol)</span>
                <span>100 °C (Eau)</span>
                <span>150 °C (Vapeur)</span>
              </div>
            </div>

            {/* Comparateur en 2 colonnes */}
            <div className="grid gap-4 sm:grid-cols-2 pt-2">
              {/* Alcool */}
              <div
                className={`p-5 rounded-2xl border transition-all ${
                  isEbullition
                    ? 'bg-rose-50/80 border-rose-300 shadow-sm'
                    : 'bg-emerald-50/80 border-emerald-300 shadow-sm'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-navy">
                    {alcohol.name} (Alcool)
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isEbullition ? 'bg-rose-200 text-rose-900' : 'bg-emerald-200 text-emerald-900'
                    }`}
                  >
                    {isEbullition ? 'État Gazeux (Vapeur)' : 'État Liquide'}
                  </span>
                </div>
                <div className="mt-3 space-y-1">
                  <div className="text-2xl font-black text-navy">
                    T_éb = +{alcohol.tEb} °C
                  </div>
                  <p className="text-xs text-navy/70">
                    Présence d&apos;un vaste réseau de <strong>liaisons hydrogène</strong> intermoléculaires
                    qui retiennent fortement les molécules entre elles.
                  </p>
                </div>
              </div>

              {/* Alcane équivalent */}
              <div
                className={`p-5 rounded-2xl border transition-all ${
                  isAlcaneEbullition
                    ? 'bg-amber-50/80 border-amber-300 shadow-sm'
                    : 'bg-surface border-navy/10'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-navy">
                    {alcohol.alcaneCorrespondant.name}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isAlcaneEbullition ? 'bg-amber-200 text-amber-900' : 'bg-navy/10 text-navy'
                    }`}
                  >
                    {isAlcaneEbullition ? 'État Gazeux (Gaz)' : 'État Liquide'}
                  </span>
                </div>
                <div className="mt-3 space-y-1">
                  <div className="text-2xl font-black text-navy">
                    T_éb = {alcohol.alcaneCorrespondant.tEb} °C
                  </div>
                  <p className="text-xs text-navy/70">
                    Pas de groupement polaire — uniquement des forces de Van der Waals très faibles.
                    L&apos;alcane bout à une température infiniment plus basse !
                  </p>
                </div>
              </div>
            </div>

            {/* Schéma explicatif liaison hydrogène */}
            <div className="bg-white rounded-xl border border-navy/10 p-4 text-center space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-navy/40">
                Mécanisme Moléculaire des Liaisons Hydrogène
              </span>
              <div className="flex items-center justify-center gap-3 text-sm font-mono font-bold text-navy py-1">
                <span className="px-2 py-1 bg-surface rounded">R—O(δ⁻)—H(δ⁺)</span>
                <span className="text-amber-500 font-extrabold tracking-widest animate-pulse">······</span>
                <span className="px-2 py-1 bg-surface rounded">O(δ⁻)—H(δ⁺)—R</span>
              </div>
              <p className="text-xs text-navy/70 max-w-xl mx-auto">
                L&apos;oxygène est fortement électronégatif (χ = 3,44) par rapport à l&apos;hydrogène (χ = 2,20).
                L&apos;attraction électrostatique entre le doublet libre de l&apos;oxygène et l&apos;atome d&apos;hydrogène voisin forme la liaison hydrogène.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* MODE 3 : Solubilité & Miscibilité dans l'eau */}
      {activeMode === 'solubility' && (
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Éprouvette graduée SVG */}
          <div className="lg:col-span-5 bg-surface/60 rounded-2xl border border-navy/10 p-5 flex flex-col items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-navy/50 self-start">
              Observation en Éprouvette Graduée
            </span>

            {/* SVG Éprouvette */}
            <div className="py-4">
              <svg width="120" height="260" viewBox="0 0 120 260" className="drop-shadow-sm">
                {/* Corps de l'éprouvette */}
                <rect x="25" y="10" width="70" height="220" rx="6" fill="#F8FAFC" stroke="#0A192F" strokeWidth="2.5" />
                {/* Base de l'éprouvette */}
                <path d="M10 230 L110 230 L100 245 L20 245 Z" fill="#0A192F" />

                {/* Graduations */}
                {[40, 70, 100, 130, 160, 190, 210].map((y, i) => (
                  <line key={i} x1="25" y1={y} x2="35" y2={y} stroke="#0A192F" strokeWidth="1.5" strokeOpacity="0.4" />
                ))}

                {/* Contenu liquide */}
                {alcohol.carbonCount <= 3 ? (
                  // Solution 100% limpide et homogène
                  <rect x="27.5" y="50" width="65" height="178" fill="#0EA5E9" fillOpacity="0.25" />
                ) : alcohol.carbonCount === 4 ? (
                  // Solution partiellement miscible (léger trouble)
                  <g>
                    <rect x="27.5" y="50" width="65" height="178" fill="#0EA5E9" fillOpacity="0.35" />
                    <line x1="27.5" y1="95" x2="92.5" y2="95" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 2" />
                  </g>
                ) : (
                  // Deux phases nettement séparées !
                  <g>
                    {/* Phase aqueuse inférieure (eau dense d = 1.0) */}
                    <rect x="27.5" y="120" width="65" height="108" fill="#0EA5E9" fillOpacity="0.3" />
                    {/* Ménisque de séparation */}
                    <ellipse cx="60" cy="120" rx="32.5" ry="4" fill="#0A192F" fillOpacity="0.3" />
                    {/* Phase organique supérieure (alcool surnageant d = 0.8) */}
                    <rect x="27.5" y="50" width="65" height="70" fill="#F59E0B" fillOpacity="0.3" />
                  </g>
                )}

                {/* Étiquettes sur l'éprouvette */}
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
                  <text x="60" y="140" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0369A1">
                    Solution Homogène
                  </text>
                )}
              </svg>
            </div>

            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${
                alcohol.solubilityGPer100mL === 'Infinie'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}
            >
              Solubilité : {alcohol.solubilityGPer100mL === 'Infinie' ? 'Infinie (Miscible en toutes proportions)' : `${alcohol.solubilityGPer100mL} g / 100 mL`}
            </span>
          </div>

          {/* Analyse Hydrophile vs Hydrophobe */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-navy/10 p-5 space-y-4">
            <h3 className="text-sm font-black uppercase tracking-wider text-navy border-b border-navy/10 pb-2">
              Bilan du Caractère Amphiphile
            </h3>

            {/* Jauges d'équilibre */}
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-emerald-700">Pôle Hydrophile (-OH) :</span>
                  <span className="text-emerald-700">Affinité pour l&apos;eau</span>
                </div>
                <div className="w-full bg-surface rounded-full h-2.5 overflow-hidden border border-navy/5">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: '100%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-1">
                  <span className="text-amber-700">Queue Hydrophobe (R-) :</span>
                  <span className="text-amber-700">{alcohol.carbonCount} Carbone(s) lipophiles</span>
                </div>
                <div className="w-full bg-surface rounded-full h-2.5 overflow-hidden border border-navy/5">
                  <div
                    className="bg-amber-500 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(alcohol.carbonCount * 20, 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Règle Bac */}
            <div className="bg-surface rounded-xl p-4 border border-navy/10 space-y-2 text-xs">
              <span className="font-bold text-navy block text-[11px] uppercase tracking-wider">
                Règle à retenir pour le Bac S2 :
              </span>
              <ul className="space-y-1.5 text-navy/70 list-disc pl-4">
                <li>
                  <strong>C1 à C3 (Méthanol, Éthanol, Propanol)</strong> : Le groupe polaire —OH domine. Les molécules d&apos;alcool s&apos;insèrent facilement entre les molécules d&apos;eau par liaison hydrogène (miscibilité totale).
                </li>
                <li>
                  <strong>C4 (Butanol)</strong> : Limite de solubilité (environ 9 g / 100 mL).
                </li>
                <li>
                  <strong>C5 et plus (Pentanol, Octanol...)</strong> : La longue chaîne alkyle hydrophobe empêche la dissolution (deux phases non miscibles).
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* MODE 4 : Test de Lucas au Laboratoire Virtuel */}
      {activeMode === 'lucas' && (
        <div className="space-y-6">
          <div className="bg-surface/50 rounded-2xl border border-navy/10 p-5 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-black text-navy">
                  Test de Lucas : Identification de la Classe en Tube à Essai
                </h3>
                <p className="text-xs text-navy/60 mt-0.5">
                  Réactif : Chlorure de zinc ($ZnCl_2$) dissous dans l&apos;acide chlorhydrique concentré ($HCl$).
                </p>
              </div>

              {/* Contrôles du test */}
              <div className="flex items-center gap-2">
                {!lucasReagentPoured ? (
                  <button
                    onClick={handleStartLucas}
                    className="px-4 py-2 bg-turquoise text-white font-bold text-xs rounded-xl shadow-sm hover:bg-turquoise/90 transition-all"
                  >
                    Ajouter le Réactif de Lucas & Chronométrer
                  </button>
                ) : (
                  <button
                    onClick={handleResetLucas}
                    className="px-4 py-2 bg-navy text-white font-bold text-xs rounded-xl shadow-sm hover:bg-navy/90 transition-all"
                  >
                    Réinitialiser le Test
                  </button>
                )}
              </div>
            </div>

            {/* Banc expérimental */}
            <div className="grid gap-6 sm:grid-cols-12 items-center">
              {/* Animation du tube à essai */}
              <div className="sm:col-span-5 bg-white rounded-2xl border border-navy/10 p-6 flex flex-col items-center justify-center shadow-inner">
                <svg width="80" height="220" viewBox="0 0 80 220">
                  {/* Tube à essai */}
                  <path
                    d="M20 15 L20 180 Q20 205 40 205 Q60 205 60 180 L60 15"
                    fill="none"
                    stroke="#0A192F"
                    strokeWidth="2.5"
                  />
                  {/* Bord supérieur */}
                  <line x1="16" y1="15" x2="64" y2="15" stroke="#0A192F" strokeWidth="3" />

                  {/* Liquide réactif */}
                  {lucasReagentPoured && (
                    <path
                      d="M22 100 L22 180 Q22 203 40 203 Q58 203 58 180 L58 100 Z"
                      fill={isTroubled ? '#E2E8F0' : '#38BDF8'}
                      fillOpacity={isTroubled ? '0.95' : '0.4'}
                      className="transition-all duration-700"
                    />
                  )}

                  {/* Précipité / trouble laiteux */}
                  {isTroubled && (
                    <g>
                      <circle cx="35" cy="140" r="3" fill="#94A3B8" opacity="0.6" />
                      <circle cx="45" cy="160" r="2.5" fill="#94A3B8" opacity="0.6" />
                      <circle cx="38" cy="175" r="3" fill="#94A3B8" opacity="0.6" />
                      <circle cx="42" cy="125" r="2" fill="#94A3B8" opacity="0.6" />
                    </g>
                  )}
                </svg>

                {/* État visuel */}
                <div className="mt-3 text-center">
                  <span
                    className={`text-xs font-black px-3 py-1 rounded-full ${
                      !lucasReagentPoured
                        ? 'bg-surface text-navy/40'
                        : isTroubled
                        ? 'bg-rose-100 text-rose-800 border border-rose-300'
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                    }`}
                  >
                    {!lucasReagentPoured
                      ? 'Tube prêt (en attente)'
                      : isTroubled
                      ? 'Trouble Laiteux Obtenu !'
                      : 'Solution Limpide'}
                  </span>
                </div>
              </div>

              {/* Chronomètre & Verdict */}
              <div className="sm:col-span-7 bg-white rounded-2xl border border-navy/10 p-5 space-y-4 shadow-sm">
                <div className="flex items-center justify-between border-b border-navy/10 pb-3">
                  <span className="text-xs font-bold text-navy/60">Chronomètre du laboratoire :</span>
                  <span className="font-mono text-xl font-black text-navy bg-surface px-3 py-1 rounded-xl">
                    {Math.floor(lucasElapsedSeconds / 60)} min {lucasElapsedSeconds % 60} s
                  </span>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="font-bold text-navy">
                    Résultat officiel pour {alcohol.name} ({alcohol.classeLabel}) :
                  </div>

                  {alcohol.classe === '3' && (
                    <div className="bg-rose-50 border border-rose-200 text-rose-950 p-3 rounded-xl space-y-1">
                      <span className="font-black uppercase tracking-wider text-[10px] text-rose-800 block">
                        Alcool Tertiaire (3°) : Trouble Immédiat
                      </span>
                      <p>
                        La substitution nucléophile est quasi-instantanée grâce à la grande stabilité du carbocation tertiaire intermédiare ($R_3C^+$).
                        Le dérivé chloré $R-Cl$ insoluble précipite en moins de 30 secondes !
                      </p>
                    </div>
                  )}

                  {alcohol.classe === '2' && (
                    <div className="bg-amber-50 border border-amber-200 text-amber-950 p-3 rounded-xl space-y-1">
                      <span className="font-black uppercase tracking-wider text-[10px] text-amber-800 block">
                        Alcool Secondaire (2°) : Trouble en ~5 minutes
                      </span>
                      <p>
                        La réaction est modérément rapide. Le trouble apparaît après environ 5 minutes à température ambiante (ou immédiatement si on tiédit légèrement le tube).
                      </p>
                    </div>
                  )}

                  {alcohol.classe === '1' && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-950 p-3 rounded-xl space-y-1">
                      <span className="font-black uppercase tracking-wider text-[10px] text-emerald-800 block">
                        Alcool Primaire (1°) : Aucun Trouble à Froid
                      </span>
                      <p>
                        Le carbocation primaire n&apos;étant pas assez stable, aucune réaction n&apos;est observée à froid. La solution reste parfaitement limpide même après plusieurs heures.
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-surface rounded-xl p-3 border border-navy/5 text-[11px] text-navy/70">
                  <strong>Équation de la réaction :</strong>{' '}
                  <span className="font-mono text-navy font-bold">R—OH + HCl ➔ R—Cl + H₂O</span> (catalysée par ZnCl₂)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

