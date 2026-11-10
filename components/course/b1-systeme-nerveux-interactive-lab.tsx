'use client';

import React, { useState, useEffect } from 'react';
import MathRenderer from '@/components/course/math-renderer';

interface StructureDetail {
  id: string;
  latinName: string;
  name: string;
  role: string;
  histologie: string;
  piegeBac: string;
  markerCoords: { x: number; y: number };
}

const STRUCTURES: Record<string, StructureDetail> = {
  substance_grise: {
    id: 'substance_grise',
    latinName: 'Substantia grisea',
    name: 'Substance Grise Médullaire',
    role: 'Centre d’intégration et de traitement réflexe des signaux bioélectriques. Siège des synapses et des corps cellulaires de l’arc réflexe.',
    histologie: 'Formée par les péricaryons (corps cellulaires) des motoneurones multipolaires dans les cornes ventrales, les interneurones dans les cornes dorsales, les dendrites non myélinisées, les synapses et les cellules gliales (astrocytes, microglie).',
    piegeBac: 'Inversion topographique avec l’encéphale : dans la moelle épinière, la substance grise est strictement centrale (en ailes de papillon) alors que dans les hémisphères cérébraux, elle forme le cortex périphérique.',
    markerCoords: { x: 400, y: 250 },
  },
  substance_blanche: {
    id: 'substance_blanche',
    latinName: 'Substantia alba',
    name: 'Substance Blanche (Cordons médullaires)',
    role: 'Conduction rapide des influx ascendants (sensitifs vers l’encéphale) et descendants (moteurs de l’encéphale vers les motoneurones).',
    histologie: 'Constituée exclusivement de fibres nerveuses myélinisées regroupées en faisceaux ou cordons (faisceaux de Goll et Burdach, faisceaux pyramidaux direct et croisé, faisceaux spino-thalamiques). Absence totale de corps cellulaires.',
    piegeBac: 'Ne jamais affirmer que la substance blanche contient des péricaryons. Sa couleur découle de la gaine lipidique de myéline isolante.',
    markerCoords: { x: 470, y: 350 },
  },
  ganglion_spinal: {
    id: 'ganglion_spinal',
    latinName: 'Ganglion sensorium nervi spinalis',
    name: 'Ganglion Spinal (ou Ganglion Rachidien)',
    role: 'Relais anatomique sensitif obligatoire sur la voie afférente centripète.',
    histologie: 'Renflement fusiforme volumineux encapsulé par la dure-mère, abritant les corps cellulaires ovoïdes des neurones sensitifs pseudo-unipolaires (« neurones en T ») entourés de cellules satellites.',
    piegeBac: 'Le ganglion spinal est TOUJOURS et STRICTEMENT porté par la racine dorsale. La racine ventrale motrice n’en possède jamais. Sa présence permet d’orienter la coupe sans ambiguïté.',
    markerCoords: { x: 195, y: 155 },
  },
  racine_dorsale: {
    id: 'racine_dorsale',
    latinName: 'Radix posterior (sensoria)',
    name: 'Racine Postérieure (Dorsale)',
    role: 'Conduction sensitive afférente (centripète) transportant les messages des récepteurs périphériques vers les centres médullaires.',
    histologie: 'Convergence de 4 à 6 radicelles dorsales émergeant du sillon postéro-latéral, traversant le ganglion spinal avant de rejoindre le tronc commun du nerf.',
    piegeBac: 'La section de la racine dorsale entraîne la perte exclusive de la sensibilité dans le dermatome correspondant, avec conservation intégrale de la motricité réflexe et volontaire.',
    markerCoords: { x: 260, y: 180 },
  },
  racine_ventrale: {
    id: 'racine_ventrale',
    latinName: 'Radix anterior (motoria)',
    name: 'Racine Antérieure (Ventrale)',
    role: 'Conduction motrice efférente (centrifuge) transmettant les ordres moteurs de la corne ventrale vers les effecteurs musculaires.',
    histologie: 'Constituée des axones des motoneurones alpha émergeant en éventail le long du sillon antéro-latéral, passant sous le ganglion spinal sans y pénétrer.',
    piegeBac: 'La section de la racine ventrale entraîne la paralysie motrice totale du métamère sans aucune altération de la sensibilité.',
    markerCoords: { x: 260, y: 320 },
  },
  corne_ventrale: {
    id: 'corne_ventrale',
    latinName: 'Cornu anterius (ventrale)',
    name: 'Corne Antérieure (Ventrale, Motrice)',
    role: 'Origine de la motricité somatique réflexe et volontaire.',
    histologie: 'Corne large, trapue et festonnée, ne touchant pas la surface médullaire. Renferme les motoneurones multipolaires volumineux avec leurs corps de Nissl proéminents.',
    piegeBac: 'La corne ventrale est toujours plus courte et nettement plus large que la corne dorsale. C’est la corne motrice.',
    markerCoords: { x: 360, y: 310 },
  },
  corne_dorsale: {
    id: 'corne_dorsale',
    latinName: 'Cornu posterius (dorsale)',
    name: 'Corne Postérieure (Dorsale, Sensitive)',
    role: 'Réception des afférences sensorielles et premier niveau d’intégration synaptique.',
    histologie: 'Corne allongée, effilée et étroite, s’étendant jusqu’à proximité immédiate de la surface dorsale. Présente à son apex la substance gélatineuse de Rolando.',
    piegeBac: 'Elle reçoit les axones des neurones en T dont les corps cellulaires sont dans le ganglion spinal.',
    markerCoords: { x: 355, y: 185 },
  },
  canal_ependyme: {
    id: 'canal_ependyme',
    latinName: 'Canalis centralis',
    name: 'Canal Central de l’Épendyme',
    role: 'Circulation axiale du liquide céphalo-rachidien (LCR) au cœur du névraxe.',
    histologie: 'Lumière centrale microscopique tapissée d’un épithélium unistratifié cubique ou prismatique cilié (cellules épendymaires) favorisant le flux du LCR.',
    piegeBac: 'Le LCR circule à la fois dans le canal de l’épendyme et dans l’espace sous-arachnoïdien externe.',
    markerCoords: { x: 400, y: 240 },
  },
  fissure_anterieure: {
    id: 'fissure_anterieure',
    latinName: 'Fissura mediana anterior',
    name: 'Fissure Médiane Antérieure (Sillon ventral)',
    role: 'Repère morphologique ventral cardinal et passage de l’artère spinale antérieure.',
    histologie: 'Entaille profonde et béante s’enfonçant sur un tiers de l’épaisseur de la moelle, tapissée par un repli de la pie-mère.',
    piegeBac: 'En l’absence de ganglion spinal visible, la profondeur et la béance de la fissure antérieure identifient la face ventrale avec certitude.',
    markerCoords: { x: 400, y: 410 },
  },
  nerf_rachidien: {
    id: 'nerf_rachidien',
    latinName: 'Nervus spinalis',
    name: 'Tronc du Nerf Rachidien (Mixte)',
    role: 'Voie de transmission bidirectionnelle (conduction simultanée des influx sensitifs afférents et moteurs efférents).',
    histologie: 'Formé par la coalescence de la racine dorsale et de la racine ventrale au niveau du trou de conjugaison. Protégé par l’épinèvre fibreux.',
    piegeBac: 'Le nerf rachidien est un nerf mixte, mais ses racines constituantes sont rigoureusement univoques (dorsale = sensitive, ventrale = motrice).',
    markerCoords: { x: 60, y: 240 },
  },
};

const EVAL_ITEMS = [
  {
    targetId: 'ganglion_spinal',
    prompt: 'Localisez le renflement fusiforme contenant les corps cellulaires des neurones sensitifs en T.',
    rationale: 'Le ganglion spinal est le renflement ovoïde exclusif de la racine postérieure.',
  },
  {
    targetId: 'fissure_anterieure',
    prompt: 'Pointez la formation anatomique qui permet d’orienter la face ventrale de la moelle sans ambiguïté.',
    rationale: 'La fissure médiane antérieure est une entaille ventrale large et profonde.',
  },
  {
    targetId: 'corne_ventrale',
    prompt: 'Désignez la zone de la substance grise où siègent les corps cellulaires des motoneurones alpha.',
    rationale: 'La corne ventrale est massive, large et héberge les gros neurones multipolaires moteurs.',
  },
  {
    targetId: 'racine_ventrale',
    prompt: 'Sélectionnez la voie motrice efférente dépourvue de ganglion rachidien.',
    rationale: 'La racine ventrale naît directement des motoneurones et ne possède aucun renflement.',
  },
  {
    targetId: 'canal_ependyme',
    prompt: 'Indiquez le canal central traversé par le liquide céphalo-rachidien.',
    rationale: 'Le canal de l’épendyme est situé au centre de la commissure grise.',
  },
];

export default function B1SystemeNerveuxInteractiveLab() {
  const [activeMode, setActiveMode] = useState<'anatomie' | 'histologie' | 'evaluation'>('anatomie');
  const [selectedStructureId, setSelectedStructureId] = useState<string>('ganglion_spinal');
  
  // Animation de l'arc réflexe
  const [isSimulating, setIsSimulating] = useState<boolean>(true);
  const [influxProgress, setInfluxProgress] = useState<number>(0);
  const [simSpeedMs, setSimSpeedMs] = useState<number>(30);

  // État de l'évaluation
  const [evalIndex, setEvalIndex] = useState<number>(0);
  const [evalScore, setEvalScore] = useState<number>(0);
  const [evalResult, setEvalResult] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // Propagation continue de l'influx nerveux
  useEffect(() => {
    if (!isSimulating) return;
    const timer = setInterval(() => {
      setInfluxProgress((p) => (p >= 100 ? 0 : p + 1));
    }, simSpeedMs);
    return () => clearInterval(timer);
  }, [isSimulating, simSpeedMs]);

  const selectStructure = (id: string) => {
    setSelectedStructureId(id);
    if (activeMode === 'evaluation' && evalIndex < EVAL_ITEMS.length) {
      const current = EVAL_ITEMS[evalIndex];
      if (id === current.targetId) {
        setEvalScore((s) => s + 1);
        setEvalResult({
          isCorrect: true,
          text: `Exact. Identification validée : ${STRUCTURES[id].name}.`,
        });
      } else {
        setEvalResult({
          isCorrect: false,
          text: `Inexact. Vous avez sélectionné ${STRUCTURES[id].name}. La cible attendue était ${STRUCTURES[current.targetId].name}.`,
        });
      }
    }
  };

  const nextEvaluationStep = () => {
    setEvalResult(null);
    setEvalIndex((i) => i + 1);
  };

  const resetEvaluation = () => {
    setEvalIndex(0);
    setEvalScore(0);
    setEvalResult(null);
  };

  // Trajectoire anatomique réaliste de l'influx dans l'arc réflexe (SVG 800 x 500)
  // Progression de 0 à 100 :
  // 0-25% : Nerf rachidien gauche -> Radicelles -> Ganglion spinal fusiforme
  // 25-45% : Ganglion spinal -> Racine dorsale -> Corne postérieure
  // 45-65% : Relais synaptique dans la substance grise (interneurone) -> Corne ventrale
  // 65-85% : Corne ventrale motrice -> Radicelles ventrales -> Racine ventrale
  // 85-100% : Racine ventrale -> Tronc du nerf rachidien vers le muscle effecteur
  const calculateInfluxCoords = (t: number) => {
    if (t < 25) {
      const u = t / 25;
      const x = 50 + u * (195 - 50);
      const y = 230 + u * (155 - 230);
      return { x, y, label: 'Voie afférente centripète (Nerf spinal)', color: '#3b82f6' };
    } else if (t < 45) {
      const u = (t - 25) / 20;
      const x = 195 + u * (355 - 195);
      const y = 155 + u * (185 - 155);
      return { x, y, label: 'Traversée du ganglion spinal et pénétration dorsale', color: '#6366f1' };
    } else if (t < 65) {
      const u = (t - 45) / 20;
      const x = 355 + Math.sin(u * Math.PI) * 15;
      const y = 185 + u * (310 - 185);
      return { x, y, label: 'Intégration synaptique centrale (Substance grise)', color: '#8b5cf6' };
    } else if (t < 85) {
      const u = (t - 65) / 20;
      const x = 360 - u * (360 - 180);
      const y = 310 + u * (315 - 310);
      return { x, y, label: 'Voie efférente motrice centrifuge (Racine ventrale)', color: '#059669' };
    } else {
      const u = (t - 85) / 15;
      const x = 180 - u * (180 - 50);
      const y = 315 - u * (315 - 255);
      return { x, y, label: 'Conduction périphérique vers le muscle effecteur', color: '#dc2626' };
    }
  };

  const activePosition = calculateInfluxCoords(influxProgress);
  const selected = STRUCTURES[selectedStructureId] || STRUCTURES.ganglion_spinal;

  return (
    <section className="bg-slate-900 rounded-3xl border border-slate-800 shadow-xl overflow-hidden my-8 text-slate-100 font-sans">
      {/* Barre supérieure médicale & instrumentale */}
      <div className="bg-slate-950/80 px-6 py-5 border-b border-slate-800/80">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                LABORATOIRE DE NEURO-ANATOMIE SÉRIE S2
              </span>
              <span className="text-xs text-slate-400 font-mono">
                REF-MEN-SN-TS2
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white mt-1.5">
              Dissection &amp; Histologie : Moelle Épinière &amp; Ganglion Spinal
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl leading-relaxed">
              Modélisation morphologique haute fidélité conforme aux coupes anatomiques réelles des mammifères.
            </p>
          </div>

          {/* Onglets de modes de travail professionnels */}
          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setActiveMode('anatomie')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeMode === 'anatomie'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Coupe Transversale &amp; Traçage
            </button>
            <button
              onClick={() => setActiveMode('histologie')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeMode === 'histologie'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Zoom Histologique du Ganglion
            </button>
            <button
              onClick={() => setActiveMode('evaluation')}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all ${
                activeMode === 'evaluation'
                  ? 'bg-slate-800 text-white shadow-sm border border-slate-700'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
              }`}
            >
              Évaluation Schéma Bac
            </button>
          </div>
        </div>
      </div>

      {/* Corps du laboratoire */}
      <div className="p-6 sm:p-8 space-y-6 bg-slate-900/60">
        {/* ========================================================================= */}
        {/* MODE 1 : COUPE ANATOMIQUE RÉALISTE & TRAÇAGE DE L'INFLUX */}
        {/* ========================================================================= */}
        {activeMode === 'anatomie' && (
          <div className="space-y-6">
            {/* Console de contrôle du traçage */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setIsSimulating(!isSimulating)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all border ${
                    isSimulating
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 hover:bg-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                  }`}
                >
                  {isSimulating ? 'PAUSE TRAÇAGE' : 'ACTIVER TRAÇAGE'}
                </button>
                <button
                  onClick={() => setInfluxProgress(0)}
                  className="px-3 py-2 rounded-xl text-xs font-mono font-bold bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 transition-colors"
                >
                  RÉINITIALISER
                </button>
              </div>

              {/* Vitesse & Étape clinique */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span className="font-mono text-[11px] uppercase">Vitesse :</span>
                  {[50, 30, 15].map((ms) => (
                    <button
                      key={ms}
                      onClick={() => setSimSpeedMs(ms)}
                      className={`px-2 py-1 rounded text-[11px] font-mono font-bold transition-all ${
                        simSpeedMs === ms
                          ? 'bg-emerald-500 text-slate-950'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {ms === 50 ? '0.5x' : ms === 30 ? '1.0x' : '2.0x'}
                    </button>
                  ))}
                </div>

                <div className="hidden md:flex items-center gap-2 text-xs font-mono text-slate-300 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Segment actif : <strong className="text-emerald-400">{activePosition.label}</strong></span>
                </div>
              </div>
            </div>

            {/* Grille : Visualiseur SVG & Panneau descriptif */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Visualiseur SVG Médical Haute Définition */}
              <div className="lg:col-span-8 bg-slate-950 rounded-3xl border border-slate-800 p-5 shadow-2xl relative">
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 mb-3 px-1">
                  <span>DORSAL (POSTÉRIEUR)</span>
                  <span>ORIENTATION TRANSVERSALE CLINIQUE</span>
                  <span>VENTRAL (ANTÉRIEUR)</span>
                </div>

                <div className="relative w-full aspect-[16/10] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800/80 flex items-center justify-center">
                  <svg
                    viewBox="0 0 800 500"
                    className="w-full h-full select-none"
                    style={{ background: '#090d16' }}
                  >
                    <defs>
                      {/* Gradient Substance Blanche Réaliste (aspect ivoire naturel avec ombrage myélinique) */}
                      <linearGradient id="medWhiteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f1f5f9" />
                        <stop offset="40%" stopColor="#e2e8f0" />
                        <stop offset="100%" stopColor="#cbd5e1" />
                      </linearGradient>

                      {/* Gradient Substance Grise Réaliste (teinte histologique hématoxyline/crésyl violet) */}
                      <linearGradient id="medGreyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#818cf8" />
                        <stop offset="50%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#4338ca" />
                      </linearGradient>

                      {/* Gradient Ganglion Spinal Réaliste (aspect fusiforme, tissu cellulaire rosé-ambré vascularisé) */}
                      <radialGradient id="ganglionGrad" cx="45%" cy="45%" r="65%">
                        <stop offset="0%" stopColor="#fbbf24" />
                        <stop offset="60%" stopColor="#d97706" />
                        <stop offset="100%" stopColor="#92400e" />
                      </radialGradient>

                      {/* Filtre de brillance pour l'influx bioélectrique */}
                      <filter id="actionPotentialGlow" x="-30%" y="-30%" width="160%" height="160%">
                        <feGaussianBlur stdDeviation="4" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    {/* AXE DE SYMÉTRIE ET REPAIRES ANATOMIQUES */}
                    <line x1="400" y1="40" x2="400" y2="460" stroke="#1e293b" strokeDasharray="3 4" strokeWidth="1" />

                    {/* MANCHON DURALE ET PIE-MÈRE PÉRIPHÉRIQUE (MENINGES) */}
                    <path
                      d="M 210 250 
                         C 210 90, 310 50, 400 50 
                         C 490 50, 590 90, 590 250 
                         C 590 410, 490 450, 400 450 
                         C 310 450, 210 410, 210 250 Z"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="5"
                      strokeOpacity="0.25"
                    />

                    {/* =================================================================== */}
                    {/* SUBSTANCE BLANCHE RÉALISTE : CONTOUR OVALAIRE NATUREL */}
                    {/* =================================================================== */}
                    <path
                      d="M 220 250 
                         C 220 100, 310 65, 400 65 
                         C 490 65, 580 100, 580 250 
                         C 580 400, 490 435, 412 435 
                         L 407 310 L 393 310 L 388 435
                         C 310 435, 220 400, 220 250 Z"
                      fill="url(#medWhiteGrad)"
                      stroke="#94a3b8"
                      strokeWidth="2.5"
                      className="cursor-pointer hover:opacity-95 transition-opacity"
                      onClick={() => selectStructure('substance_blanche')}
                    />

                    {/* SILLON MÉDIAN POSTÉRIEUR (SEPTUM MÉDIAN ÉTROIT) */}
                    <line x1="400" y1="65" x2="400" y2="185" stroke="#334155" strokeWidth="2.5" />

                    {/* FISSURE MÉDIANE ANTÉRIEURE (BÉANTE ET PROFONDE AVEC ARTÈRE SPINAL ANTERIEURE) */}
                    <g
                      className="cursor-pointer"
                      onClick={() => selectStructure('fissure_anterieure')}
                    >
                      <polygon
                        points="388,435 412,435 407,310 393,310"
                        fill="#090d16"
                        stroke="#475569"
                        strokeWidth="1.5"
                      />
                      {/* Section transversale de l'artère spinale antérieure */}
                      <circle cx="400" cy="385" r="5" fill="#ef4444" stroke="#991b1b" strokeWidth="1.5" />
                    </g>

                    {/* =================================================================== */}
                    {/* RACINES RACHIDIENNES GAUCHES ET GANGLION SPINAL FUSIFORME RÉALISTE */}
                    {/* =================================================================== */}

                    {/* Filets radiculaires dorsaux (radicelles émergeant du sillon postéro-latéral) */}
                    <path d="M 335 155 Q 300 145, 260 150" stroke="#6366f1" strokeWidth="2.5" fill="none" opacity="0.8" />
                    <path d="M 345 170 Q 300 155, 260 155" stroke="#6366f1" strokeWidth="3" fill="none" opacity="0.9" />
                    <path d="M 350 185 Q 310 165, 260 160" stroke="#6366f1" strokeWidth="2.5" fill="none" opacity="0.8" />

                    {/* Racine dorsale principale reliant les radicelles au ganglion spinal */}
                    <path
                      d="M 260 155 C 235 155, 220 155, 200 155"
                      stroke="#4f46e5"
                      strokeWidth="7"
                      fill="none"
                      strokeLinecap="round"
                      className="cursor-pointer"
                      onClick={() => selectStructure('racine_dorsale')}
                    />

                    {/* GANGLION SPINAL RÉALISTE : FORME FUSIFORME ASYMÉTRIQUE AVEC CELLULES EN T */}
                    <g
                      className="cursor-pointer transition-transform hover:scale-105"
                      onClick={() => selectStructure('ganglion_spinal')}
                    >
                      {/* Manchon conjonctif dural entourant le renflement */}
                      <path
                        d="M 140 195 
                           C 150 145, 170 135, 195 135 
                           C 225 135, 245 145, 255 160 
                           C 245 175, 225 185, 195 185 
                           C 170 185, 150 180, 140 195 Z"
                        fill="url(#ganglionGrad)"
                        stroke="#78350f"
                        strokeWidth="2.5"
                      />

                      {/* Représentation histologique schématique des corps cellulaires en T dans le ganglion */}
                      <circle cx="180" cy="155" r="4" fill="#fef3c7" stroke="#b45309" strokeWidth="1" />
                      <circle cx="195" cy="150" r="4.5" fill="#fef3c7" stroke="#b45309" strokeWidth="1" />
                      <circle cx="210" cy="158" r="4" fill="#fef3c7" stroke="#b45309" strokeWidth="1" />
                      <circle cx="195" cy="168" r="3.5" fill="#fef3c7" stroke="#b45309" strokeWidth="1" />
                      
                      {/* Axone en T émergeant */}
                      <path d="M 195 150 L 195 160 L 175 170" stroke="#fef3c7" strokeWidth="1.5" fill="none" />
                    </g>

                    {/* Prolongement de la racine dorsale vers le nerf mixte */}
                    <path
                      d="M 145 175 C 115 195, 90 220, 70 230"
                      stroke="#4f46e5"
                      strokeWidth="6"
                      fill="none"
                      strokeLinecap="round"
                    />

                    {/* Filets radiculaires ventraux (moteurs émergeant de la corne ventrale) */}
                    <path d="M 330 315 Q 290 325, 260 320" stroke="#059669" strokeWidth="2.5" fill="none" opacity="0.8" />
                    <path d="M 345 330 Q 300 330, 260 325" stroke="#059669" strokeWidth="3" fill="none" opacity="0.9" />
                    <path d="M 360 340 Q 310 335, 260 330" stroke="#059669" strokeWidth="2.5" fill="none" opacity="0.8" />

                    {/* Racine ventrale motrice passant sous le ganglion sans renflement */}
                    <path
                      d="M 260 325 C 210 325, 140 300, 70 250"
                      stroke="#059669"
                      strokeWidth="7"
                      fill="none"
                      strokeLinecap="round"
                      className="cursor-pointer"
                      onClick={() => selectStructure('racine_ventrale')}
                    />

                    {/* Tronc commun du nerf spinal rachidien mixte */}
                    <g
                      className="cursor-pointer"
                      onClick={() => selectStructure('nerf_rachidien')}
                    >
                      <rect
                        x="15"
                        y="225"
                        width="55"
                        height="34"
                        rx="7"
                        fill="#be185d"
                        stroke="#9d174d"
                        strokeWidth="2"
                      />
                      <text x="42" y="246" fill="#ffffff" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="monospace">
                        NERF
                      </text>
                    </g>

                    {/* =================================================================== */}
                    {/* SYMÉTRIE DROITE (ANATOMIE COLLATÉRALE) */}
                    {/* =================================================================== */}
                    {/* Radicelles et racine dorsale droite */}
                    <path d="M 465 155 Q 500 145, 540 150" stroke="#6366f1" strokeWidth="2.5" fill="none" opacity="0.8" />
                    <path d="M 455 170 Q 500 155, 540 155" stroke="#6366f1" strokeWidth="3" fill="none" opacity="0.9" />
                    <path d="M 540 155 C 565 155, 580 155, 600 155" stroke="#4f46e5" strokeWidth="7" fill="none" strokeLinecap="round" />

                    {/* Ganglion spinal droit */}
                    <path
                      d="M 660 195 
                         C 650 145, 630 135, 605 135 
                         C 575 135, 555 145, 545 160 
                         C 555 175, 575 185, 605 185 
                         C 630 185, 650 180, 660 195 Z"
                      fill="url(#ganglionGrad)"
                      stroke="#78350f"
                      strokeWidth="2.5"
                    />
                    <path d="M 655 175 C 685 195, 710 220, 730 230" stroke="#4f46e5" strokeWidth="6" fill="none" strokeLinecap="round" />

                    {/* Racine ventrale droite */}
                    <path d="M 540 325 C 590 325, 660 300, 730 250" stroke="#059669" strokeWidth="7" fill="none" strokeLinecap="round" />
                    <rect x="730" y="225" width="55" height="34" rx="7" fill="#be185d" stroke="#9d174d" strokeWidth="2" />
                    <text x="757" y="246" fill="#ffffff" textAnchor="middle" fontSize="10" fontWeight="bold" fontFamily="monospace">
                      NERF
                    </text>

                    {/* =================================================================== */}
                    {/* SUBSTANCE GRISE RÉALISTE : AILES DE PAPILLON ORGANISÉES */}
                    {/* =================================================================== */}
                    <g
                      className="cursor-pointer"
                      onClick={() => selectStructure('substance_grise')}
                    >
                      {/* Corne postérieure gauche (mince, effilée, avec apex de Rolando) */}
                      <path
                        d="M 390 230 
                           C 370 230, 345 175, 340 145 
                           C 355 145, 370 175, 385 220 Z"
                        fill="url(#medGreyGrad)"
                        stroke="#3730a3"
                        strokeWidth="2"
                        onClick={(e) => {
                          e.stopPropagation();
                          selectStructure('corne_dorsale');
                        }}
                      />
                      {/* Coiffe gélatineuse apicale plus claire de Rolando */}
                      <ellipse cx="342" cy="150" rx="6" ry="10" fill="#a5b4fc" opacity="0.6" />

                      {/* Corne postérieure droite */}
                      <path
                        d="M 410 230 
                           C 430 230, 455 175, 460 145 
                           C 445 145, 430 175, 415 220 Z"
                        fill="url(#medGreyGrad)"
                        stroke="#3730a3"
                        strokeWidth="2"
                      />
                      <ellipse cx="458" cy="150" rx="6" ry="10" fill="#a5b4fc" opacity="0.6" />

                      {/* Commissure grise centrale */}
                      <rect x="375" y="225" width="50" height="30" rx="6" fill="url(#medGreyGrad)" stroke="#3730a3" strokeWidth="1" />

                      {/* Corne antérieure gauche (large, massive, quadrangulaire festonnée) */}
                      <path
                        d="M 390 250 
                           C 360 250, 315 285, 325 335 
                           C 355 345, 385 315, 395 260 Z"
                        fill="url(#medGreyGrad)"
                        stroke="#3730a3"
                        strokeWidth="2"
                        onClick={(e) => {
                          e.stopPropagation();
                          selectStructure('corne_ventrale');
                        }}
                      />

                      {/* Motoneurones multipolaires perceptibles dans la corne ventrale gauche */}
                      <circle cx="340" cy="315" r="3" fill="#fef08a" opacity="0.8" />
                      <circle cx="355" cy="325" r="3.5" fill="#fef08a" opacity="0.8" />
                      <circle cx="365" cy="300" r="3" fill="#fef08a" opacity="0.8" />

                      {/* Corne antérieure droite */}
                      <path
                        d="M 410 250 
                           C 440 250, 485 285, 475 335 
                           C 445 345, 415 315, 405 260 Z"
                        fill="url(#medGreyGrad)"
                        stroke="#3730a3"
                        strokeWidth="2"
                      />
                      <circle cx="460" cy="315" r="3" fill="#fef08a" opacity="0.8" />
                      <circle cx="445" cy="325" r="3.5" fill="#fef08a" opacity="0.8" />
                    </g>

                    {/* CANAL DE L'ÉPENDYME AU STRICT CENTRE */}
                    <circle
                      cx="400"
                      cy="240"
                      r="6.5"
                      fill="#0284c7"
                      stroke="#0369a1"
                      strokeWidth="2"
                      className="cursor-pointer hover:scale-125 transition-transform"
                      onClick={() => selectStructure('canal_ependyme')}
                    />

                    {/* INFLUX NERVEUX BIOÉLECTRIQUE DANS L'ARC RÉFLEXE (PULSE VECTORIEL) */}
                    {isSimulating && (
                      <g filter="url(#actionPotentialGlow)">
                        <circle
                          cx={activePosition.x}
                          cy={activePosition.y}
                          r="8"
                          fill={activePosition.color}
                          stroke="#ffffff"
                          strokeWidth="2.5"
                        />
                        <circle
                          cx={activePosition.x}
                          cy={activePosition.y}
                          r="15"
                          fill={activePosition.color}
                          opacity="0.3"
                        />
                      </g>
                    )}

                    {/* LIGNES REPAIRANTES & ANNOTATIONS CLINIQUES */}
                    <g fontSize="10" fontFamily="monospace" fontWeight="bold">
                      {/* Ganglion spinal */}
                      <line x1="195" y1="135" x2="195" y2="105" stroke="#f59e0b" strokeWidth="1.5" />
                      <rect x="140" y="85" width="110" height="20" rx="4" fill="#0f172a" stroke="#f59e0b" strokeWidth="1" />
                      <text x="195" y="99" fill="#fcd34d" textAnchor="middle">GANGLION SPINAL</text>

                      {/* Racine dorsale */}
                      <line x1="260" y1="150" x2="260" y2="70" stroke="#818cf8" strokeWidth="1.5" />
                      <rect x="205" y="50" width="110" height="20" rx="4" fill="#0f172a" stroke="#818cf8" strokeWidth="1" />
                      <text x="260" y="64" fill="#c7d2fe" textAnchor="middle">RACINE DORSALE</text>

                      {/* Racine ventrale */}
                      <line x1="260" y1="325" x2="260" y2="400" stroke="#10b981" strokeWidth="1.5" />
                      <rect x="200" y="400" width="120" height="20" rx="4" fill="#0f172a" stroke="#10b981" strokeWidth="1" />
                      <text x="260" y="414" fill="#6ee7b7" textAnchor="middle">RACINE VENTRALE</text>

                      {/* Substance grise */}
                      <line x1="420" y1="210" x2="520" y2="210" stroke="#a855f7" strokeWidth="1.5" />
                      <rect x="520" y="200" width="130" height="20" rx="4" fill="#0f172a" stroke="#a855f7" strokeWidth="1" />
                      <text x="585" y="214" fill="#e9d5ff" textAnchor="middle">SUBSTANCE GRISE (H)</text>

                      {/* Fissure médiane antérieure */}
                      <line x1="400" y1="435" x2="400" y2="465" stroke="#94a3b8" strokeWidth="1.5" />
                      <rect x="330" y="465" width="140" height="20" rx="4" fill="#0f172a" stroke="#94a3b8" strokeWidth="1" />
                      <text x="400" y="479" fill="#e2e8f0" textAnchor="middle">FISSURE ANTÉRIEURE</text>
                    </g>
                  </svg>
                </div>
              </div>

              {/* Fiche Anatomique & Histologique Clinique */}
              <div className="lg:col-span-4 bg-slate-950 rounded-3xl border border-slate-800 p-6 shadow-xl space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                      STRUCTURE SÉLECTIONNÉE
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white mt-0.5">
                      {selected.name}
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                    {selected.id}
                  </span>
                </div>

                <div className="italic text-xs text-slate-400 border-l-2 border-emerald-500 pl-2.5 py-0.5">
                  Nom latin officiel : <strong>{selected.latinName}</strong>
                </div>

                <div className="space-y-3.5 text-xs">
                  <div>
                    <span className="font-mono text-slate-400 text-[10px] uppercase font-bold block">
                      Fonction Physiologique :
                    </span>
                    <p className="text-slate-300 mt-1 leading-relaxed">
                      {selected.role}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-slate-400 text-[10px] uppercase font-bold block">
                      Caractérisation Histologique :
                    </span>
                    <p className="text-slate-300 mt-1 leading-relaxed">
                      {selected.histologie}
                    </p>
                  </div>

                  <div className="bg-amber-950/40 border border-amber-800/60 rounded-xl p-3.5 mt-2">
                    <span className="font-mono font-bold text-amber-400 text-[11px] block uppercase tracking-wider">
                      Critère d’Excellence au Bac S2 :
                    </span>
                    <p className="text-amber-200/90 text-xs mt-1 leading-relaxed">
                      {selected.piegeBac}
                    </p>
                  </div>
                </div>

                {/* Sélecteur direct des organes */}
                <div className="pt-3 border-t border-slate-800/80">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-500 block mb-2">
                    Sélectionner un organe ou tissu :
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {Object.values(STRUCTURES).slice(0, 6).map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSelectedStructureId(s.id)}
                        className={`text-left p-2 rounded-lg text-[11px] font-medium truncate transition-all ${
                          selectedStructureId === s.id
                            ? 'bg-emerald-600 text-white font-bold shadow-sm'
                            : 'bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800'
                        }`}
                      >
                        {s.name.split('(')[0]}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE 2 : HISTOLOGIE DU GANGLION SPINAL ET NEURONES EN T */}
        {/* ========================================================================= */}
        {activeMode === 'histologie' && (
          <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="border-b border-slate-800 pb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                  CYTOLOGIE &amp; HISTOLOGIE CELLULAIRE
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Structure Microscopique Réelle du Ganglion Spinal (Neurones en T)
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400 bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
                Grossissement : x400 / Coupe longitudinale
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Schéma vectoriel ultra-précis du neurone pseudo-unipolaire en T */}
              <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 flex flex-col items-center justify-center">
                <svg viewBox="0 0 400 300" className="w-full h-64 select-none">
                  {/* Capsule conjonctive périphérique */}
                  <rect x="20" y="20" width="360" height="260" rx="16" fill="#1e293b" stroke="#334155" strokeWidth="2" />
                  
                  {/* Corps cellulaire sphérique volumineux */}
                  <circle cx="150" cy="150" r="50" fill="#fef08a" stroke="#ca8a04" strokeWidth="3" />
                  <circle cx="150" cy="150" r="18" fill="#fde047" stroke="#a16207" strokeWidth="2" />
                  <circle cx="155" cy="148" r="6" fill="#854d0e" />

                  {/* Cellules satellites gliales entourant le corps cellulaire */}
                  <circle cx="95" cy="150" r="6" fill="#38bdf8" />
                  <circle cx="110" cy="110" r="6" fill="#38bdf8" />
                  <circle cx="150" cy="95" r="6" fill="#38bdf8" />
                  <circle cx="190" cy="110" r="6" fill="#38bdf8" />
                  <circle cx="205" cy="150" r="6" fill="#38bdf8" />
                  <circle cx="190" cy="190" r="6" fill="#38bdf8" />
                  <circle cx="150" cy="205" r="6" fill="#38bdf8" />
                  <circle cx="110" cy="190" r="6" fill="#38bdf8" />

                  {/* Prolongement unique émergeant du péricaryon puis bifurquant en T */}
                  <path d="M 200 150 L 250 150" stroke="#ca8a04" strokeWidth="6" strokeLinecap="round" />
                  {/* La bifurcation en T */}
                  <path d="M 250 70 L 250 230" stroke="#ca8a04" strokeWidth="6" strokeLinecap="round" />

                  {/* Gaine de myéline sur les deux branches */}
                  <rect x="242" y="80" width="16" height="35" rx="3" fill="#cbd5e1" stroke="#94a3b8" />
                  <rect x="242" y="185" width="16" height="35" rx="3" fill="#cbd5e1" stroke="#94a3b8" />

                  {/* Légendes */}
                  <text x="150" y="155" fill="#713f12" fontSize="9" fontWeight="bold" textAnchor="middle">NOYAU</text>
                  <text x="250" y="55" fill="#93c5fd" fontSize="10" fontWeight="bold" textAnchor="middle">Vers la Moelle (Centripète)</text>
                  <text x="250" y="250" fill="#fcd34d" fontSize="10" fontWeight="bold" textAnchor="middle">Vers le Récepteur (Périphérique)</text>
                  <text x="70" y="70" fill="#38bdf8" fontSize="9" fontWeight="bold">Cellules satellites</text>
                </svg>
              </div>

              {/* Texte explicatif officiel */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <span className="font-mono text-emerald-400 font-bold uppercase text-xs block">
                    1. Morphologie en T (Neurone Pseudo-Unipolaire) :
                  </span>
                  <p className="leading-relaxed text-slate-300">
                    Le neurone sensitif possède un corps cellulaire sphérique volumineux logé dans le ganglion spinal. Un prolongement cytoplasmique unique s’en détache avant de se diviser à angle droit en forme de <strong>T</strong> :
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-400 pl-1">
                    <li>Une branche périphérique longue qui conduit l’influx depuis le récepteur sensoriel.</li>
                    <li>Une branche centrale qui pénètre dans la moelle par la corne dorsale.</li>
                  </ul>
                </div>

                <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <span className="font-mono text-emerald-400 font-bold uppercase text-xs block">
                    2. Rôle des Cellules Satellites :
                  </span>
                  <p className="leading-relaxed text-slate-300">
                    Chaque péricaryon est étroitement ceinturé par une couronne protectrice de cellules gliales satellites assurant l’isolation électrique et les échanges trophiques.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MODE 3 : ATELIER ÉVALUATION DU SCHÉMA BAC S2 SANS ICÔNE */}
        {/* ========================================================================= */}
        {activeMode === 'evaluation' && (
          <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 sm:p-8 space-y-6 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                  CONTRÔLE DE CONNAISSANCES OFFICIEL
                </span>
                <h3 className="text-xl font-bold text-white mt-1">
                  Épreuve d’Identification Anatomique • Baccalauréat S2
                </h3>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-400 uppercase block">Score Évaluation</span>
                <span className="text-2xl font-mono font-bold text-emerald-400">
                  {evalScore} / {EVAL_ITEMS.length}
                </span>
              </div>
            </div>

            {evalIndex < EVAL_ITEMS.length ? (
              <div className="space-y-6">
                <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800">
                  <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider">
                    Question {evalIndex + 1} sur {EVAL_ITEMS.length} :
                  </span>
                  <h4 className="text-base sm:text-lg font-bold text-white mt-1.5">
                    {EVAL_ITEMS[evalIndex].prompt}
                  </h4>
                  <p className="text-xs text-slate-400 mt-2 font-mono">
                    Indice barème : {EVAL_ITEMS[evalIndex].rationale}
                  </p>
                </div>

                {/* Grille de sélection des organes cibles */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {Object.values(STRUCTURES).map((s) => (
                    <button
                      key={s.id}
                      onClick={() => selectStructure(s.id)}
                      className="p-3 rounded-xl border border-slate-800 text-left bg-slate-900 hover:bg-slate-800 hover:border-slate-700 transition-all text-xs font-medium text-slate-200"
                    >
                      <span className="block truncate font-semibold">{s.name}</span>
                      <span className="text-[10px] font-mono text-slate-500 block mt-1">Valider structure</span>
                    </button>
                  ))}
                </div>

                {/* Validation */}
                {evalResult && (
                  <div
                    className={`p-4 rounded-xl border flex items-center justify-between gap-4 ${
                      evalResult.isCorrect
                        ? 'bg-emerald-950/60 border-emerald-700 text-emerald-200'
                        : 'bg-rose-950/60 border-rose-700 text-rose-200'
                    }`}
                  >
                    <span className="text-xs sm:text-sm font-semibold">{evalResult.text}</span>
                    <button
                      onClick={nextEvaluationStep}
                      className="px-4 py-1.5 rounded-lg bg-white text-slate-950 text-xs font-bold font-mono hover:bg-slate-200 shrink-0"
                    >
                      SUIVANT ➔
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 space-y-4">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  SESSION TERMINÉE
                </span>
                <h4 className="text-2xl font-bold text-white">
                  Bilan de l’Évaluation Anatomique
                </h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto">
                  Votre score final est de <strong>{evalScore} sur {EVAL_ITEMS.length}</strong>. La topographie de la moelle épinière, l’orientation de la fissure antérieure et le rôle du ganglion spinal sont validés pour l’examen officiel.
                </p>
                <button
                  onClick={resetEvaluation}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-mono font-bold text-xs hover:bg-emerald-500 transition-colors shadow"
                >
                  RECOMMENCER L’ÉVALUATION
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
