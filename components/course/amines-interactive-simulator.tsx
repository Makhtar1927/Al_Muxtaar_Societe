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
  Eye,
  Info,
} from 'lucide-react';
import MathRenderer from '@/components/course/math-renderer';

interface AmineSample {
  id: string;
  name: string;
  brute: string;
  classe: '1' | '2' | '3' | 'aromatique';
  classeLabel: string;
  nbHSurN: number;
  tEb: number;
  pKa: number;
  liquidColor: string; // couleur réaliste du liquide pur
  description: string;
  odeur: string;
}

const AMINES_LAB: AmineSample[] = [
  {
    id: 'ethanamine',
    name: 'Éthanamine',
    brute: 'C₂H₇N',
    classe: '1',
    classeLabel: 'Amine Primaire (1°)',
    nbHSurN: 2,
    tEb: 16.6,
    pKa: 10.65,
    liquidColor: '#E0F2FE', // liquide limpide légèrement bleuté
    description: 'CH₃—CH₂—NH₂ : Monoalkylamine aliphatique saturée de classe 1.',
    odeur: 'Forte odeur d\'ammoniac et de marée fraîche',
  },
  {
    id: 'n-methylethanamine',
    name: 'N-méthyléthanamine',
    brute: 'C₃H₉N',
    classe: '2',
    classeLabel: 'Amine Secondaire (2°)',
    nbHSurN: 1,
    tEb: 36.7,
    pKa: 10.73,
    liquidColor: '#F0FDF4', // liquide très limpide verdâtre
    description: 'CH₃—CH₂—NH—CH₃ : Amine secondaire avec 1 seul H sur l\'azote.',
    odeur: 'Odeur poissonneuse typique d\'amines secondaires',
  },
  {
    id: 'trimethylamine',
    name: 'Triméthylamine',
    brute: 'C₃H₉N',
    classe: '3',
    classeLabel: 'Amine Tertiaire (3°)',
    nbHSurN: 0,
    tEb: 2.9,
    pKa: 9.81,
    liquidColor: '#F8FAFC', // limpide très volatil
    description: '(CH₃)₃N : Amine tertiaire sans aucun H lié à l\'azote.',
    odeur: 'Odeur très vive de poisson avarié (hareng)',
  },
  {
    id: 'aniline',
    name: 'Aniline',
    brute: 'C₆H₇N',
    classe: 'aromatique',
    classeLabel: 'Amine Aromatique (1°)',
    nbHSurN: 2,
    tEb: 184.1,
    pKa: 4.63,
    liquidColor: '#FEF3C7', // liquide huileux jaunâtre à l'air
    description: 'C₆H₅—NH₂ : Doublet non-liant délocalisé dans le cycle benzénique.',
    odeur: 'Odeur aromatique âcre et pénétrante, huileuse',
  },
];

type LabWorkshop = 'indicateurs' | 'acylation' | 'hofmann' | 'bunsen' | 'defi';

export default function AminesInteractiveSimulator() {
  const [activeWorkshop, setActiveWorkshop] = useState<LabWorkshop>('indicateurs');
  const [selectedAmineId, setSelectedAmineId] = useState<string>('ethanamine');

  // 🧪 Atelier 1 : Indicateurs & pH
  const [chosenIndicator, setChosenIndicator] = useState<'aucun' | 'bbt' | 'phenol' | 'rouge_methyle'>('aucun');
  const [hclDropsCount, setHclDropsCount] = useState<number>(0);
  const [isPouringDroplet, setIsPouringDroplet] = useState<boolean>(false);
  const [isShakingTube, setIsShakingTube] = useState<boolean>(false);

  // ⚗️ Atelier 2 : Acylation (Chlorure d'acyle)
  const [acylAdded, setAcylAdded] = useState<boolean>(false);
  const [acylSmokeActive, setAcylSmokeActive] = useState<boolean>(false);
  const [tubeTemperature, setTubeTemperature] = useState<number>(20);

  // 🧬 Atelier 3 : Hofmann (Alkylation CH3I)
  const [ch3iDrops, setCh3iDrops] = useState<number>(0);
  const [hofmannProductStage, setHofmannProductStage] = useState<'initial' | 'sec' | 'tert' | 'quaternaire'>('initial');

  // 🔥 Atelier 4 : Banc Bunsen
  const [burnerLit, setBurnerLit] = useState<boolean>(false);
  const [burnerTemp, setBurnerTemp] = useState<number>(20);

  // 🎯 Atelier 5 : Défi Aveugle
  const [mysteryAmine, setMysteryAmine] = useState<AmineSample>(AMINES_LAB[0]);
  const [mysteryActionDone, setMysteryActionDone] = useState<{ bbt: boolean; acyl: boolean; hofmann: boolean }>({
    bbt: false,
    acyl: false,
    hofmann: false,
  });
  const [mysteryAnswer, setMysteryAnswer] = useState<string | null>(null);
  const [mysteryRevealed, setMysteryRevealed] = useState<boolean>(false);

  const amine = AMINES_LAB.find((a) => a.id === selectedAmineId) || AMINES_LAB[0];

  // Gestion de la flamme du bec Bunsen
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (burnerLit) {
      timer = setInterval(() => {
        setBurnerTemp((prev) => {
          if (prev >= 200) {
            setBurnerLit(false);
            return 200;
          }
          return prev + 3;
        });
      }, 100);
    }
    return () => clearInterval(timer);
  }, [burnerLit]);

  // Réinitialisation de l'atelier 1
  const resetIndicateurs = () => {
    setChosenIndicator('aucun');
    setHclDropsCount(0);
    setIsShakingTube(false);
  };

  // Verser une goutte d'acide chlorhydrique
  const handleAddHclDrop = () => {
    if (hclDropsCount >= 10) return;
    setIsPouringDroplet(true);
    setTimeout(() => {
      setIsPouringDroplet(false);
      setHclDropsCount((prev) => prev + 1);
      // animation secousse
      setIsShakingTube(true);
      setTimeout(() => setIsShakingTube(false), 500);
    }, 400);
  };

  // Couleur dynamique du liquide selon indicateur et gouttes de HCl
  const getLiquidColor = () => {
    if (chosenIndicator === 'aucun') return amine.liquidColor;

    // Si BBT : Basique = Bleu Roi ; Équivalence (~5-6 gouttes) = Vert ; Acide = Jaune vif
    if (chosenIndicator === 'bbt') {
      if (hclDropsCount < 5) return '#2563EB'; // Bleu roi basique intense
      if (hclDropsCount === 5) return '#10B981'; // Vert d'équivalence virage
      return '#FACC15'; // Jaune acide
    }

    // Si Phénolphtaléine : Basique = Rose Fuchsia ; Acide = Incolore
    if (chosenIndicator === 'phenol') {
      if (amine.classe === 'aromatique' && hclDropsCount >= 1) return '#F8FAFC'; // aniline peu basique
      if (hclDropsCount < 5) return '#EC4899'; // Rose fuchsia éclatant
      return '#F8FAFC'; // Incolore à l'équivalence et en milieu acide
    }

    // Si Rouge de Méthyle (Indicateur officiel Bac pour base faible titrée par acide fort, virage 4,2-6,2)
    if (chosenIndicator === 'rouge_methyle') {
      if (hclDropsCount < 5) return '#FBBF24'; // Jaune en milieu basique
      if (hclDropsCount === 5) return '#F97316'; // Teinte orangée de virage
      return '#EF4444'; // Rouge vif en milieu acide après équivalence
    }

    return amine.liquidColor;
  };

  // Action Acylation (Chlorure d'acyle)
  const handleTriggerAcylation = () => {
    setAcylAdded(true);
    setAcylSmokeActive(true);
    setTubeTemperature(amine.classe === '3' ? 22 : 68); // pas de réaction avec amine 3° !

    setTimeout(() => {
      setAcylSmokeActive(false);
    }, 2800);
  };

  const handleResetAcylation = () => {
    setAcylAdded(false);
    setAcylSmokeActive(false);
    setTubeTemperature(20);
  };

  // Action Hofmann
  const handleAddCh3i = () => {
    setCh3iDrops((prev) => {
      const next = prev + 1;
      if (amine.classe === '1') {
        if (next === 1) setHofmannProductStage('sec');
        else if (next === 2) setHofmannProductStage('tert');
        else setHofmannProductStage('quaternaire');
      } else if (amine.classe === '2') {
        if (next === 1) setHofmannProductStage('tert');
        else setHofmannProductStage('quaternaire');
      } else {
        setHofmannProductStage('quaternaire');
      }
      return next;
    });
  };

  const handleResetHofmann = () => {
    setCh3iDrops(0);
    setHofmannProductStage('initial');
  };

  // Défi mystère
  const handleStartMystery = () => {
    const random = AMINES_LAB[Math.floor(Math.random() * AMINES_LAB.length)];
    setMysteryAmine(random);
    setMysteryActionDone({ bbt: false, acyl: false, hofmann: false });
    setMysteryAnswer(null);
    setMysteryRevealed(false);
  };

  return (
    <section className="bg-white rounded-3xl border border-navy/10 p-4 sm:p-7 shadow-sm space-y-6 w-full max-w-full overflow-hidden">
      {/* ── EN-TÊTE DE LA PAILLASSE RÉELLE ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-[11px] font-bold text-turquoise uppercase tracking-widest">
              Laboratoire Virtuel Interactif • Terminale S2 Sénégal
            </span>
          </div>
          <h2 className="text-lg sm:text-2xl font-black text-navy mt-1 flex flex-wrap items-center gap-2">
            <span>Paillasse Expérimentale des Amines</span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-navy/5 text-navy border border-navy/10">
              Verrerie & Réactions Réelles
            </span>
          </h2>
        </div>

        {/* Badges de la molécule en manipulation */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
          <span className="rounded-full bg-turquoise-light/60 text-turquoise font-mono text-xs px-2.5 sm:px-3 py-1 font-extrabold border border-turquoise/20">
            {amine.brute}
          </span>
          <span className="rounded-full bg-navy/5 text-navy text-xs px-2.5 sm:px-3 py-1 font-bold">
            {amine.name}
          </span>
          <span
            className={`rounded-full text-xs px-2.5 sm:px-3 py-1 font-black ${
              amine.classe === '1'
                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                : amine.classe === '2'
                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                : amine.classe === '3'
                ? 'bg-rose-100 text-rose-800 border border-rose-300'
                : 'bg-purple-100 text-purple-800 border border-purple-300'
            }`}
          >
            {amine.classeLabel}
          </span>
        </div>
      </div>

      {/* ── BARRE D'ONGLETS DES 5 ATELIERS EXPÉRIMENTAUX ── */}
      <div className="flex overflow-x-auto no-scrollbar sm:grid sm:grid-cols-3 lg:grid-cols-5 gap-1.5 p-1.5 bg-surface rounded-2xl border border-navy/10 w-full max-w-full">
        <button
          onClick={() => setActiveWorkshop('indicateurs')}
          className={`shrink-0 whitespace-nowrap sm:whitespace-normal py-2 px-3 text-center rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeWorkshop === 'indicateurs'
              ? 'bg-white text-navy shadow-sm border border-navy/10'
              : 'text-navy/60 hover:text-navy'
          }`}
        >
          <Droplets className="w-3.5 h-3.5 text-blue-600 shrink-0" />
          <span>1. Indicateurs & pH</span>
        </button>

        <button
          onClick={() => setActiveWorkshop('acylation')}
          className={`shrink-0 whitespace-nowrap sm:whitespace-normal py-2 px-3 text-center rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeWorkshop === 'acylation'
              ? 'bg-white text-navy shadow-sm border border-navy/10'
              : 'text-navy/60 hover:text-navy'
          }`}
        >
          <TestTube className="w-3.5 h-3.5 text-rose-600 shrink-0" />
          <span>2. Acylation (Fumées)</span>
        </button>

        <button
          onClick={() => setActiveWorkshop('hofmann')}
          className={`shrink-0 whitespace-nowrap sm:whitespace-normal py-2 px-3 text-center rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeWorkshop === 'hofmann'
              ? 'bg-white text-navy shadow-sm border border-navy/10'
              : 'text-navy/60 hover:text-navy'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-purple-600 shrink-0" />
          <span>3. Sels d&apos;Hofmann</span>
        </button>

        <button
          onClick={() => setActiveWorkshop('bunsen')}
          className={`shrink-0 whitespace-nowrap sm:whitespace-normal py-2 px-3 text-center rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeWorkshop === 'bunsen'
              ? 'bg-white text-navy shadow-sm border border-navy/10'
              : 'text-navy/60 hover:text-navy'
          }`}
        >
          <Flame className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span>4. Bec Bunsen & Ébullition</span>
        </button>

        <button
          onClick={() => {
            setActiveWorkshop('defi');
            handleStartMystery();
          }}
          className={`shrink-0 whitespace-nowrap sm:whitespace-normal sm:col-span-1 py-2 px-3 text-center rounded-xl text-xs font-extrabold transition-all flex items-center justify-center gap-1.5 ${
            activeWorkshop === 'defi'
              ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm'
              : 'bg-amber-100/70 text-amber-900 hover:bg-amber-200'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span>5. Défi Pratique Bac</span>
        </button>
      </div>

      {/* ── FLACONS SUR LE PLAN DE TRAVAIL (Pour ateliers 1 à 4) ── */}
      {activeWorkshop !== 'defi' && (
        <div className="bg-surface/60 p-3 sm:p-4 rounded-2xl border border-navy/5 space-y-2.5 w-full max-w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
            <span className="font-bold uppercase tracking-wider text-navy/70 flex items-center gap-1.5">
              <Beaker className="w-3.5 h-3.5 text-turquoise shrink-0" />
              <span>Choisir le flacon d&apos;amine à verser dans le tube à essai :</span>
            </span>
            <span className="text-[11px] text-navy/50 font-medium">4 familles chimiques représentées</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {AMINES_LAB.map((item) => {
              const isSelected = selectedAmineId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedAmineId(item.id);
                    resetIndicateurs();
                    handleResetAcylation();
                    handleResetHofmann();
                    setBurnerLit(false);
                    setBurnerTemp(20);
                  }}
                  className={`p-2 sm:p-2.5 rounded-xl border text-left transition-all flex items-center justify-between gap-1.5 min-w-0 ${
                    isSelected
                      ? 'bg-navy text-white border-navy shadow-sm ring-2 ring-turquoise/40'
                      : 'bg-white hover:bg-surface text-navy border-navy/10'
                  }`}
                >
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-black block truncate" title={item.name}>{item.name}</span>
                    <span className="font-mono text-[10px] opacity-70 block">{item.brute}</span>
                  </div>
                  <span
                    className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded-full shrink-0 ${
                      item.classe === '1'
                        ? isSelected ? 'bg-emerald-500/30 text-emerald-300' : 'bg-emerald-100 text-emerald-800'
                        : item.classe === '2'
                        ? isSelected ? 'bg-amber-500/30 text-amber-300' : 'bg-amber-100 text-amber-800'
                        : item.classe === '3'
                        ? isSelected ? 'bg-rose-500/30 text-rose-300' : 'bg-rose-100 text-rose-800'
                        : isSelected ? 'bg-purple-500/30 text-purple-300' : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {item.classe === 'aromatique' ? 'Arome' : `${item.classe}°`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* ATELIER 1 : TUBE À ESSAI RÉEL — INDICATEURS COLORÉS & DOSAGE HCL */}
      {/* ════════════════════════════════════════════════════════════════ */}
      {activeWorkshop === 'indicateurs' && (
        <div className="grid gap-6 lg:grid-cols-12 items-center w-full min-w-0 max-w-full">
          {/* Banc Visuel avec Tube à essai SVG réaliste */}
          <div className="lg:col-span-6 bg-gradient-to-b from-slate-50 to-slate-100/70 rounded-2xl border border-navy/10 p-4 sm:p-6 flex flex-col items-center justify-center relative shadow-inner min-h-[360px] w-full min-w-0 max-w-full overflow-hidden">
            {/* Goutte animée qui tombe */}
            {isPouringDroplet && (
              <div className="absolute top-12 left-1/2 -translate-x-1/2 z-20 animate-bounce">
                <span className="block w-3 h-4 bg-sky-400 rounded-full shadow-sm animate-pulse" />
              </div>
            )}

            {/* Tube à essai en verre réaliste */}
            <div className={`relative transition-transform duration-300 ${isShakingTube ? 'rotate-3 scale-105' : ''}`}>
              <svg width="120" height="260" viewBox="0 0 120 260" className="drop-shadow-lg">
                {/* Corps en verre du tube */}
                <path
                  d="M35 20 L35 210 Q35 245 60 245 Q85 245 85 210 L85 20"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="3.5"
                />
                {/* Col évasé du tube */}
                <ellipse cx="60" cy="20" rx="28" ry="6" fill="#F8FAFC" stroke="#334155" strokeWidth="3" />

                {/* Graduations sur le tube */}
                <line x1="38" y1="60" x2="48" y2="60" stroke="#94A3B8" strokeWidth="1.5" />
                <line x1="38" y1="90" x2="52" y2="90" stroke="#94A3B8" strokeWidth="2" />
                <line x1="38" y1="120" x2="48" y2="120" stroke="#94A3B8" strokeWidth="1.5" />
                <line x1="38" y1="150" x2="52" y2="150" stroke="#94A3B8" strokeWidth="2" />
                <line x1="38" y1="180" x2="48" y2="180" stroke="#94A3B8" strokeWidth="1.5" />

                {/* Solution liquide colorée avec ménisque */}
                <path
                  d="M38 100 L38 210 Q38 241 60 241 Q82 241 82 210 L82 100 Q60 108 38 100 Z"
                  fill={getLiquidColor()}
                  fillOpacity="0.85"
                  className="transition-colors duration-500"
                />

                {/* Reflet de lumière sur le verre */}
                <path
                  d="M42 30 L42 205 Q42 230 52 235"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeOpacity="0.6"
                  strokeLinecap="round"
                />
              </svg>

              {/* Étiquette sur le tube */}
              <div className="absolute top-28 left-1/2 -translate-x-1/2 bg-white/95 px-2 py-0.5 rounded border border-navy/20 shadow-xs text-center pointer-events-none">
                <span className="text-[10px] font-black text-navy block font-mono">{amine.name}</span>
                <span className="text-[9px] text-navy/60 font-mono">10 mL (0.01M)</span>
              </div>
            </div>

            {/* Statut visuel sous le tube */}
            <div className="mt-4 text-center space-y-1 px-2">
              <span
                className="inline-block text-xs font-black px-4 py-1.5 rounded-full shadow-xs border transition-all max-w-full break-words"
                style={{
                  backgroundColor: getLiquidColor(),
                  color: chosenIndicator === 'aucun' || getLiquidColor() === '#F8FAFC' || getLiquidColor() === '#FACC15' ? '#0F172A' : '#FFFFFF',
                  borderColor: '#CBD5E1',
                }}
              >
                {chosenIndicator === 'aucun'
                  ? 'Solution pure d\'amine (Pas d\'indicateur)'
                  : chosenIndicator === 'bbt'
                  ? hclDropsCount < 5 ? 'Bleu : Milieu Basique (pH ≈ 11)' : hclDropsCount === 5 ? 'Vert : Équivalence acido-basique' : 'Jaune : Milieu Acide (pH < 6)'
                  : chosenIndicator === 'phenol'
                  ? hclDropsCount < 5 ? 'Rose Fuchsia : Zone Basique' : 'Incolore : Décoloration complète'
                  : hclDropsCount < 5 ? 'Jaune : Base prédominante' : hclDropsCount === 5 ? 'Orange : Zone virage pKa' : 'Rouge : Forme acide prédominante'}
              </span>
              <p className="text-[11px] text-navy/60">
                Gouttes de HCl versées : <strong>{hclDropsCount}</strong> / 10 (Équivalence à 5 gouttes)
              </p>
            </div>
          </div>

          {/* Console de manipulation tactile */}
          <div className="lg:col-span-6 space-y-4 w-full min-w-0 max-w-full">
            <div className="bg-surface/50 rounded-2xl border border-navy/10 p-4 sm:p-5 space-y-3 w-full min-w-0">
              <span className="text-xs font-bold uppercase tracking-wider text-navy/70 block">
                Étape 1 : Choisir un indicateur coloré du laboratoire
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => setChosenIndicator('bbt')}
                  className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all min-w-0 ${
                    chosenIndicator === 'bbt'
                      ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'bg-white text-navy border-navy/10 hover:bg-surface'
                  }`}
                >
                  <span className="block font-black">B.B.T.</span>
                  <span className="text-[10px] opacity-80 block truncate">Virage 6.0 - 7.6</span>
                </button>

                <button
                  onClick={() => setChosenIndicator('phenol')}
                  className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all min-w-0 ${
                    chosenIndicator === 'phenol'
                      ? 'bg-pink-600 text-white border-pink-600 shadow-sm'
                      : 'bg-white text-navy border-navy/10 hover:bg-surface'
                  }`}
                >
                  <span className="block font-black truncate">Phénolphtaléine</span>
                  <span className="text-[10px] opacity-80 block truncate">Virage 8.2 - 10.0</span>
                </button>

                <button
                  onClick={() => setChosenIndicator('rouge_methyle')}
                  className={`p-2.5 rounded-xl border text-xs font-bold text-center transition-all min-w-0 ${
                    chosenIndicator === 'rouge_methyle'
                      ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                      : 'bg-white text-navy border-navy/10 hover:bg-surface'
                  }`}
                >
                  <span className="block font-black truncate">Rouge Méthyle</span>
                  <span className="text-[10px] opacity-80 block truncate">Indicateur Bac S2</span>
                </button>
              </div>
            </div>

            {/* Étape 2 : Pipette de HCl */}
            <div className="bg-white rounded-2xl border border-navy/10 p-4 sm:p-5 space-y-3 shadow-sm w-full min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-navy/70 block">
                    Étape 2 : Neutraliser par HCl (0.01 mol/L)
                  </span>
                  <span className="text-[11px] text-navy/50">Ajoutez goutte à goutte et observez le virage dans le tube</span>
                </div>
                <button
                  onClick={resetIndicateurs}
                  className="self-start sm:self-auto px-2.5 py-1 text-[11px] font-bold text-navy/60 hover:text-navy border border-navy/10 rounded-lg whitespace-nowrap"
                >
                  Vider & Rincer
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddHclDrop}
                  disabled={hclDropsCount >= 10 || isPouringDroplet}
                  className="w-full py-3 px-3 bg-navy text-white text-xs font-black rounded-xl shadow-md hover:bg-navy/90 disabled:opacity-40 transition-all flex items-center justify-center gap-2 text-center"
                >
                  <Droplets className="w-4 h-4 text-sky-400 shrink-0" />
                  <span className="truncate">Verser 1 goutte d&apos;acide chlorhydrique (HCl)</span>
                </button>
              </div>

              {/* Règle Bac associée */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
                <span className="font-bold flex items-center gap-1 text-[11px]">
                  <span>✓</span> Règle Officielle du Bac S2 :
                </span>
                <p>
                  Pour le titrage d&apos;une base faible (amine) par un acide fort (HCl), le point d&apos;équivalence est <strong>acide (pH_E &lt; 7)</strong>. L&apos;indicateur le plus pertinent est le <strong>Rouge de Méthyle</strong> (zone de virage 4,2 - 6,2) car sa zone englobe le pH_E !
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* ATELIER 2 : RÉACTION AVEC CHLORURE D'ACYLE (FUMÉES & AMIDE)     */}
      {/* ════════════════════════════════════════════════════════════════ */}
      {activeWorkshop === 'acylation' && (
        <div className="grid gap-6 lg:grid-cols-12 items-center w-full min-w-0 max-w-full">
          {/* Tube avec simulation de fumées et exothermie */}
          <div className="lg:col-span-6 bg-gradient-to-b from-slate-50 to-slate-100/70 rounded-2xl border border-navy/10 p-4 sm:p-6 flex flex-col items-center justify-center relative shadow-inner min-h-[360px] w-full min-w-0 max-w-full overflow-hidden">
            {/* Fumées blanches animées (HCl + vapeurs amine) */}
            {acylSmokeActive && amine.classe !== '3' && (
              <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center animate-pulse pointer-events-none">
                <span className="text-3xl filter blur-[1px] opacity-80">💨</span>
                <span className="text-[11px] sm:text-xs font-black text-slate-800 bg-white/95 px-2.5 py-0.5 rounded-full border border-slate-300 shadow-sm whitespace-nowrap">
                  Fumées blanches denses (RNH₃⁺Cl⁻)
                </span>
              </div>
            )}

            {/* Tube à essai centré avec thermomètre digital adjacent */}
            <div className="flex items-center justify-center gap-3 sm:gap-4 my-2">
              <svg width="110" height="250" viewBox="0 0 120 260" className="drop-shadow-lg shrink-0">
                <path
                  d="M35 20 L35 210 Q35 245 60 245 Q85 245 85 210 L85 20"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="3.5"
                />
                <ellipse cx="60" cy="20" rx="28" ry="6" fill="#F8FAFC" stroke="#334155" strokeWidth="3" />

                {/* Liquide réactionnel */}
                <path
                  d="M38 120 L38 210 Q38 241 60 241 Q82 241 82 210 L82 120 Q60 126 38 120 Z"
                  fill={acylAdded && amine.classe !== '3' ? '#F1F5F9' : amine.liquidColor}
                  fillOpacity="0.9"
                  className="transition-colors duration-700"
                />

                {/* Cristaux blancs d'amide précipité au fond du tube */}
                {acylAdded && amine.classe !== '3' && (
                  <g className="animate-fade-in">
                    <rect x="48" y="215" width="6" height="6" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" />
                    <rect x="58" y="222" width="7" height="7" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" />
                    <rect x="68" y="217" width="5" height="5" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" />
                    <rect x="52" y="228" width="8" height="6" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" />
                    <rect x="63" y="230" width="6" height="5" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1" />
                  </g>
                )}
              </svg>

              {/* Thermomètre digital fixé à côté du tube sans dépasser */}
              <div className="bg-white px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl border border-navy/20 shadow-md text-center shrink-0">
                <span className="text-[9px] font-bold text-navy/50 block">Thermomètre</span>
                <span className={`font-mono text-sm sm:text-base font-black ${tubeTemperature > 40 ? 'text-rose-600 animate-pulse' : 'text-navy'}`}>
                  {tubeTemperature} °C
                </span>
              </div>
            </div>

            <div className="mt-3 text-center px-2">
              {acylAdded ? (
                amine.classe === '3' ? (
                  <span className="inline-block text-[11px] sm:text-xs font-black px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300">
                    ⚠️ Aucune réaction visible : Amine tertiaire sans H !
                  </span>
                ) : (
                  <span className="inline-block text-[11px] sm:text-xs font-black px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                    ✓ Réaction Totale : Amide formé + Cristaux blancs solides
                  </span>
                )
              ) : (
                <span className="text-[11px] sm:text-xs text-navy/50 font-bold">
                  Tube prêt • Prêt à recevoir le chlorure d&apos;éthanoyle CH₃COCl
                </span>
              )}
            </div>
          </div>

          {/* Commandes et Explication Réactionnelle */}
          <div className="lg:col-span-6 space-y-4 w-full min-w-0 max-w-full">
            <div className="bg-surface/50 rounded-2xl border border-navy/10 p-4 sm:p-5 space-y-3 w-full min-w-0">
              <span className="text-xs font-bold uppercase tracking-wider text-navy/70 block">
                Ajout de Chlorure d&apos;Éthanoyle pur (CH₃COCl)
              </span>
              <p className="text-xs text-navy-light leading-relaxed">
                Le chlorure d&apos;acyle est un dérivé d&apos;acide très réactif. Observez l&apos;effet du contact avec l&apos;amine dans le tube à essai.
              </p>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleTriggerAcylation}
                  disabled={acylAdded}
                  className="w-full sm:flex-1 py-3 px-3 bg-rose-600 hover:bg-rose-700 text-white text-xs font-black rounded-xl shadow-md disabled:opacity-40 transition-all flex items-center justify-center gap-2"
                >
                  <TestTube className="w-4 h-4 shrink-0" />
                  <span>Injecter 2 mL de CH₃COCl</span>
                </button>

                <button
                  onClick={handleResetAcylation}
                  className="w-full sm:w-auto px-4 py-3 bg-white border border-navy/10 text-navy text-xs font-bold rounded-xl hover:bg-surface whitespace-nowrap"
                >
                  Nettoyer le tube
                </button>
              </div>
            </div>

            {/* Équation-bilan et règle du coefficient 2 */}
            <div className="bg-white rounded-2xl border border-navy/10 p-4 sm:p-5 space-y-3 shadow-sm w-full min-w-0 max-w-full overflow-hidden">
              <span className="text-[10px] font-bold uppercase tracking-wider text-navy/40 block">
                Équation-bilan officielle au Baccalauréat :
              </span>
              <div className="bg-surface p-3 rounded-xl border border-navy/5 font-mono text-xs text-navy font-bold text-center w-full max-w-full overflow-x-auto">
                <MathRenderer content="$$CH_3-CO-Cl + \mathbf{2}\,R-NH_2 \longrightarrow CH_3-CO-NH-R + (R-NH_3^+ + Cl^-)$$" />
              </div>

              <div className="text-xs space-y-2 text-navy-light leading-relaxed">
                <p>
                  <strong>Pourquoi voit-on des fumées blanches et des cristaux ?</strong>
                </p>
                <p>
                  La réaction libère une chaleur intense (exothermie à 68°C). Le chlorure d&apos;hydrogène gazeux réagit immédiatement avec une deuxième molécule d&apos;amine dans l&apos;air et dans la solution pour former un brouillard de micro-cristaux de <strong>chlorure d&apos;alkylammonium</strong> !
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* ATELIER 3 : POLYALKYLATION D'HOFMANN (CRISTAUX QUATERNAIRES)    */}
      {/* ════════════════════════════════════════════════════════════════ */}
      {activeWorkshop === 'hofmann' && (
        <div className="grid gap-6 lg:grid-cols-12 items-center w-full min-w-0 max-w-full">
          {/* Tube avec cristallisation progressive */}
          <div className="lg:col-span-6 bg-gradient-to-b from-slate-50 to-slate-100/70 rounded-2xl border border-navy/10 p-4 sm:p-6 flex flex-col items-center justify-center relative shadow-inner min-h-[360px] w-full min-w-0 max-w-full overflow-hidden">
            <div className="relative my-2">
              <svg width="120" height="260" viewBox="0 0 120 260" className="drop-shadow-lg">
                <path
                  d="M35 20 L35 210 Q35 245 60 245 Q85 245 85 210 L85 20"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="3.5"
                />
                <ellipse cx="60" cy="20" rx="28" ry="6" fill="#F8FAFC" stroke="#334155" strokeWidth="3" />

                {/* Liquide qui s'épaissit */}
                <path
                  d="M38 110 L38 210 Q38 241 60 241 Q82 241 82 210 L82 110 Q60 117 38 110 Z"
                  fill={hofmannProductStage === 'quaternaire' ? '#E2E8F0' : '#FEF08A'}
                  fillOpacity="0.8"
                  className="transition-colors duration-500"
                />

                {/* Cristaux massifs de sel d'ammonium quaternaire */}
                {hofmannProductStage === 'quaternaire' && (
                  <g className="animate-fade-in">
                    <polygon points="50,210 55,215 50,220 45,215" fill="#FFFFFF" stroke="#64748B" strokeWidth="1" />
                    <polygon points="65,215 70,220 65,225 60,220" fill="#FFFFFF" stroke="#64748B" strokeWidth="1" />
                    <polygon points="58,225 63,230 58,235 53,230" fill="#FFFFFF" stroke="#64748B" strokeWidth="1" />
                    <polygon points="46,222 51,227 46,232 41,227" fill="#FFFFFF" stroke="#64748B" strokeWidth="1" />
                    <polygon points="68,228 73,233 68,238 63,233" fill="#FFFFFF" stroke="#64748B" strokeWidth="1" />
                  </g>
                )}
              </svg>

              <div className="absolute top-28 left-1/2 -translate-x-1/2 bg-white/90 px-2 py-0.5 rounded border border-navy/20 text-center pointer-events-none">
                <span className="text-[10px] font-black text-purple-900 block font-mono">
                  {hofmannProductStage === 'initial'
                    ? 'Amine de départ'
                    : hofmannProductStage === 'sec'
                    ? 'Amine 2°'
                    : hofmannProductStage === 'tert'
                    ? 'Amine 3°'
                    : 'Sel Quaternaire [R₄N]⁺I⁻'}
                </span>
              </div>
            </div>

            <div className="mt-4 text-center px-2">
              <span
                className={`inline-block text-xs font-black px-4 py-1.5 rounded-full border max-w-full break-words ${
                  hofmannProductStage === 'quaternaire'
                    ? 'bg-purple-100 text-purple-900 border-purple-300 shadow-sm'
                    : 'bg-amber-100 text-amber-900 border-amber-300'
                }`}
              >
                {hofmannProductStage === 'quaternaire'
                  ? '✨ Fin de réaction : Précipité Cristallin de Sel Quaternaire'
                  : `Étape intermédiaire (${ch3iDrops} équiv. CH₃I ajoutés)`}
              </span>
            </div>
          </div>

          {/* Console de Polyalkylation */}
          <div className="lg:col-span-6 space-y-4 w-full min-w-0 max-w-full">
            <div className="bg-surface/50 rounded-2xl border border-navy/10 p-4 sm:p-5 space-y-3 w-full min-w-0">
              <span className="text-xs font-bold uppercase tracking-wider text-navy/70 block">
                Ajout séquentiel d&apos;iodométhane (CH₃I)
              </span>
              <p className="text-xs text-navy-light leading-relaxed">
                Chaque ajout permet à l&apos;azote de réaliser une substitution nucléophile jusqu&apos;à l&apos;arrêt complet au stade quaternaire.
              </p>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={handleAddCh3i}
                  disabled={hofmannProductStage === 'quaternaire'}
                  className="w-full sm:flex-1 py-3 px-3 bg-purple-600 hover:bg-purple-700 text-white text-xs font-black rounded-xl shadow-md disabled:opacity-40 transition-all flex items-center justify-center gap-2"
                >
                  <Droplets className="w-4 h-4 text-purple-200 shrink-0" />
                  <span>Ajouter 1 équivalent de CH₃I</span>
                </button>

                <button
                  onClick={handleResetHofmann}
                  className="w-full sm:w-auto px-4 py-3 bg-white border border-navy/10 text-navy text-xs font-bold rounded-xl hover:bg-surface whitespace-nowrap"
                >
                  Réinitialiser
                </button>
              </div>
            </div>

            {/* Fiche récapitulative Hofmann */}
            <div className="bg-white rounded-2xl border border-navy/10 p-4 sm:p-5 space-y-3 shadow-sm w-full min-w-0 max-w-full">
              <span className="text-[10px] font-bold uppercase tracking-wider text-navy/40 block">
                Bilan stœchiométrique Bac S2 :
              </span>
              <p className="text-xs text-navy-light leading-relaxed">
                - Si l&apos;amine est en <strong>excès</strong> : on isole l&apos;amine secondaire.<br />
                - Si l&apos;halogénoalcane CH₃I est en <strong>excès</strong> : la chaîne de réactions se termine obligatoirement par le sel d&apos;ammonium quaternaire <strong>[(CH₃)₄N]⁺ I⁻</strong> !
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* ATELIER 4 : BEC BUNSEN EN DIRECT & ÉBULLITION                   */}
      {/* ════════════════════════════════════════════════════════════════ */}
      {activeWorkshop === 'bunsen' && (
        <div className="grid gap-6 lg:grid-cols-12 items-center w-full min-w-0 max-w-full">
          {/* Banc Bunsen avec flamme animée et tube à essai chauffé */}
          <div className="lg:col-span-6 bg-gradient-to-b from-slate-900 to-slate-950 rounded-2xl border border-navy/10 p-4 sm:p-6 flex flex-col items-center justify-center relative shadow-inner min-h-[360px] w-full min-w-0 max-w-full overflow-hidden">
            {/* Bulles d'ébullition et vapeur */}
            {burnerTemp >= amine.tEb && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center animate-pulse pointer-events-none">
                <span className="text-2xl opacity-70">♨️</span>
                <span className="text-[10px] font-black text-rose-300 bg-rose-950/80 px-2 py-0.5 rounded-full border border-rose-500/40 whitespace-nowrap">
                  Ébullition active ({amine.tEb} °C)
                </span>
              </div>
            )}

            {/* Tube chauffé */}
            <div className="relative my-2">
              <svg width="120" height="230" viewBox="0 0 120 230" className="drop-shadow-lg">
                <path
                  d="M35 10 L35 170 Q35 195 60 195 Q85 195 85 170 L85 10"
                  fill="none"
                  stroke="#94A3B8"
                  strokeWidth="3"
                />
                <ellipse cx="60" cy="10" rx="28" ry="5" fill="#334155" stroke="#94A3B8" strokeWidth="2" />

                {/* Liquide chauffé */}
                <path
                  d="M38 100 L38 170 Q38 192 60 192 Q82 192 82 170 L82 100 Q60 106 38 100 Z"
                  fill={burnerTemp >= amine.tEb ? '#FDA4AF' : '#93C5FD'}
                  fillOpacity="0.75"
                />

                {/* Bulles de vapeur à l'ébullition */}
                {burnerTemp >= amine.tEb && (
                  <g className="animate-bounce">
                    <circle cx="50" cy="150" r="3" fill="#FFFFFF" opacity="0.8" />
                    <circle cx="65" cy="135" r="4" fill="#FFFFFF" opacity="0.8" />
                    <circle cx="55" cy="120" r="3.5" fill="#FFFFFF" opacity="0.8" />
                  </g>
                )}
              </svg>

              {/* Bec Bunsen placé sous le tube */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
                {/* Flamme animée */}
                {burnerLit && (
                  <div className="w-5 h-10 bg-gradient-to-t from-blue-500 via-sky-300 to-amber-300 rounded-full animate-pulse filter blur-[1px] mb-[-4px]" />
                )}
                {/* Corps métallique du brûleur */}
                <div className="w-8 h-10 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 rounded-t border border-slate-600" />
                <div className="w-16 h-3 bg-slate-600 rounded-b shadow-md" />
              </div>
            </div>

            {/* Température au dessus */}
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-right">
              <span className="text-[10px] text-white/50 block font-mono">Température</span>
              <span className={`font-mono text-base font-black ${burnerTemp >= amine.tEb ? 'text-rose-400 animate-pulse' : 'text-emerald-400'}`}>
                {burnerTemp} °C
              </span>
            </div>
          </div>

          {/* Commandes du Banc Thermique */}
          <div className="lg:col-span-6 space-y-4 w-full min-w-0 max-w-full">
            <div className="bg-surface/50 rounded-2xl border border-navy/10 p-4 sm:p-5 space-y-3 w-full min-w-0">
              <span className="text-xs font-bold uppercase tracking-wider text-navy/70 block">
                Contrôle de la flamme du Bec Bunsen
              </span>

              <div className="flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => setBurnerLit(!burnerLit)}
                  className={`w-full sm:flex-1 py-3 px-3 text-xs font-black rounded-xl shadow-md transition-all flex items-center justify-center gap-2 ${
                    burnerLit
                      ? 'bg-rose-600 text-white animate-pulse'
                      : 'bg-navy text-white hover:bg-navy/90'
                  }`}
                >
                  <Flame className="w-4 h-4 shrink-0" />
                  <span className="truncate">{burnerLit ? 'Éteindre le Bec Bunsen' : 'Allumer la flamme bleue'}</span>
                </button>

                <button
                  onClick={() => {
                    setBurnerLit(false);
                    setBurnerTemp(20);
                  }}
                  className="w-full sm:w-auto px-4 py-3 bg-white border border-navy/10 text-navy text-xs font-bold rounded-xl hover:bg-surface whitespace-nowrap"
                >
                  Refroidir (20 °C)
                </button>
              </div>
            </div>

            {/* Explication Liaisons H */}
            <div className="bg-white rounded-2xl border border-navy/10 p-4 sm:p-5 space-y-2 shadow-sm text-xs leading-relaxed text-navy-light w-full min-w-0 max-w-full">
              <span className="text-[10px] font-bold uppercase tracking-wider text-navy/40 block">
                Interprétation microscopique au Bac :
              </span>
              <p>
                L&apos;éthanamine bout à <strong>+16,6 °C</strong> alors que le propane (même masse molaire) bout à <strong>-42,1 °C</strong>.
              </p>
              <p className="font-semibold text-navy">
                Pourquoi cet écart de près de 60 °C ?
              </p>
              <p>
                Parce que les molécules d&apos;amine primaire sont unies entre elles par un réseau solide de <strong>liaisons hydrogène N—H···N</strong> qui exige un apport d&apos;énergie thermique important pour être dissocié !
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════ */}
      {/* ATELIER 5 : DÉFI PRATIQUE DU BACCALAURÉAT (TUBE INCONNU)       */}
      {/* ════════════════════════════════════════════════════════════════ */}
      {activeWorkshop === 'defi' && (
        <div className="bg-gradient-to-br from-amber-500/10 via-white to-amber-500/5 rounded-2xl border border-amber-300 p-4 sm:p-7 space-y-6 w-full min-w-0 max-w-full overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-200/60 pb-4">
            <div>
              <span className="text-[10px] font-black text-amber-800 uppercase tracking-widest block">
                Épreuve Pratique Virtuelle • Baccalauréat Scientifique
              </span>
              <h3 className="text-base sm:text-lg font-black text-navy mt-0.5">
                Diagnostic en aveugle : Identifier le contenu du Tube X
              </h3>
            </div>
            <button
              onClick={handleStartMystery}
              className="self-start sm:self-auto px-3.5 py-2 rounded-xl text-xs font-bold bg-amber-500 text-white hover:bg-amber-600 shadow-sm flex items-center gap-1.5 transition-all whitespace-nowrap"
            >
              <RotateCcw className="w-3.5 h-3.5 shrink-0" />
              <span>Changer de Tube Inconnu</span>
            </button>
          </div>

          <div className="grid gap-6 lg:grid-cols-12 items-center w-full min-w-0 max-w-full">
            {/* Tube Inconnu avec réactifs appliqués */}
            <div className="lg:col-span-5 bg-white rounded-2xl border border-navy/10 p-4 sm:p-6 flex flex-col items-center justify-center shadow-inner w-full min-w-0 max-w-full overflow-hidden">
              <svg width="100" height="220" viewBox="0 0 100 220" className="drop-shadow-md">
                <path
                  d="M30 15 L30 180 Q30 205 50 205 Q70 205 70 180 L70 15"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="3"
                />
                <ellipse cx="50" cy="15" rx="22" ry="5" fill="#F8FAFC" stroke="#334155" strokeWidth="2" />
                <path
                  d="M32 90 L32 180 Q32 202 50 202 Q68 202 68 180 L68 90 Z"
                  fill={
                    mysteryActionDone.bbt
                      ? mysteryAmine.classe === 'aromatique'
                        ? '#10B981'
                        : '#2563EB'
                      : mysteryAmine.liquidColor
                  }
                  fillOpacity="0.8"
                />
                {mysteryActionDone.acyl && mysteryAmine.classe !== '3' && (
                  <g>
                    <rect x="42" y="185" width="5" height="5" fill="#FFFFFF" stroke="#94A3B8" />
                    <rect x="52" y="190" width="5" height="5" fill="#FFFFFF" stroke="#94A3B8" />
                  </g>
                )}
              </svg>

              <div className="mt-3 text-center">
                <span className="text-xs font-black px-3 py-1 bg-surface border border-navy/10 rounded-full text-navy font-mono">
                  Échantillon Inconnu : Flacon Mystère
                </span>
              </div>
            </div>

            {/* Tests à effectuer sur le tube inconnu */}
            <div className="lg:col-span-7 space-y-4 w-full min-w-0 max-w-full">
              <span className="text-xs font-bold uppercase tracking-wider text-navy/70 block">
                1. Effectuer des tests chimiques au choix :
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  onClick={() => setMysteryActionDone((prev) => ({ ...prev, bbt: true }))}
                  className={`p-3 rounded-xl border text-xs font-bold text-left transition-all min-w-0 ${
                    mysteryActionDone.bbt
                      ? 'bg-blue-50 border-blue-400 text-blue-900 shadow-sm'
                      : 'bg-white border-navy/10 text-navy hover:bg-surface'
                  }`}
                >
                  <span className="block font-black">Test B.B.T.</span>
                  <span className="text-[10px] opacity-70 block truncate">
                    {mysteryActionDone.bbt
                      ? mysteryAmine.classe === 'aromatique'
                        ? 'Virage Vert (Base faible)'
                        : 'Bleu Intense (pH > 10)'
                      : 'Cliquer pour tester'}
                  </span>
                </button>

                <button
                  onClick={() => setMysteryActionDone((prev) => ({ ...prev, acyl: true }))}
                  className={`p-3 rounded-xl border text-xs font-bold text-left transition-all min-w-0 ${
                    mysteryActionDone.acyl
                      ? 'bg-rose-50 border-rose-400 text-rose-900 shadow-sm'
                      : 'bg-white border-navy/10 text-navy hover:bg-surface'
                  }`}
                >
                  <span className="block font-black">Test CH₃COCl</span>
                  <span className="text-[10px] opacity-70 block truncate">
                    {mysteryActionDone.acyl
                      ? mysteryAmine.classe === '3'
                        ? 'Aucune réaction !'
                        : 'Fumées + Cristaux Amide'
                      : 'Cliquer pour tester'}
                  </span>
                </button>

                <button
                  onClick={() => setMysteryActionDone((prev) => ({ ...prev, hofmann: true }))}
                  className={`p-3 rounded-xl border text-xs font-bold text-left transition-all min-w-0 ${
                    mysteryActionDone.hofmann
                      ? 'bg-purple-50 border-purple-400 text-purple-900 shadow-sm'
                      : 'bg-white border-navy/10 text-navy hover:bg-surface'
                  }`}
                >
                  <span className="block font-black">Excès CH₃I</span>
                  <span className="text-[10px] opacity-70 block truncate">
                    {mysteryActionDone.hofmann ? 'Précipité sel quaternaire' : 'Cliquer pour tester'}
                  </span>
                </button>
              </div>

              {/* Sélection du verdict */}
              <div className="pt-2 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-navy/70 block">
                  2. Votre diagnostic : quelle est l&apos;amine dans ce tube ?
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {AMINES_LAB.map((item) => (
                    <button
                      key={item.id}
                      disabled={mysteryRevealed}
                      onClick={() => setMysteryAnswer(item.id)}
                      className={`p-2.5 sm:p-3 rounded-xl border text-xs font-bold text-left transition-all min-w-0 ${
                        mysteryAnswer === item.id
                          ? 'bg-navy text-white border-navy shadow-sm ring-2 ring-turquoise/40'
                          : 'bg-white text-navy border-navy/10 hover:bg-surface'
                      }`}
                    >
                      <span className="block font-black truncate">{item.name}</span>
                      <span className="text-[10px] opacity-70 block truncate">{item.classeLabel}</span>
                    </button>
                  ))}
                </div>
              </div>

              {!mysteryRevealed ? (
                <button
                  disabled={!mysteryAnswer}
                  onClick={() => setMysteryRevealed(true)}
                  className="w-full py-3 bg-turquoise hover:bg-turquoise/90 text-white font-black text-xs rounded-xl shadow-md disabled:opacity-40 transition-all"
                >
                  Confirmer le verdict expérimental
                </button>
              ) : (
                <div
                  className={`p-4 rounded-xl border text-xs font-bold flex items-center gap-2 ${
                    mysteryAnswer === mysteryAmine.id
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                      : 'bg-rose-50 border-rose-300 text-rose-900'
                  }`}
                >
                  {mysteryAnswer === mysteryAmine.id ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      <span>
                        Bravo ! Diagnostic parfait : il s&apos;agissait de l&apos;échantillon <strong>{mysteryAmine.name}</strong> ({mysteryAmine.classeLabel}).
                      </span>
                    </>
                  ) : (
                    <>
                      <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      <span>
                        Erreur de diagnostic : l&apos;échantillon était <strong>{mysteryAmine.name}</strong> ({mysteryAmine.classeLabel}).
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
