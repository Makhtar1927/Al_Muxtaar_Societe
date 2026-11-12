'use client';

import React, { useState, useEffect, useRef } from 'react';

type LabTab = 'innervation' | 'loewi' | 'pharmaco';

export default function B2RegulationNerveuseInteractiveLab() {
  const [activeTab, setActiveTab] = useState<LabTab>('innervation');

  // =========================================================================
  // ÉTAT ONGLET 1 : INNERVATION CARDIAQUE & MONITORING CLINIQUE
  // =========================================================================
  const [heartRate, setHeartRate] = useState<number>(75);
  const [contractility, setContractility] = useState<number>(70); // VES en mL (force de contraction)
  const [activeIntervention, setActiveIntervention] = useState<
    'repos' | 'vague_modere' | 'vague_fort' | 'sympathique' | 'vagotomie' | 'sympathectomie' | 'effort'
  >('repos');
  const [vagalTone, setVagalTone] = useState<number>(70); // % tonus frein
  const [sympTone, setSympTone] = useState<number>(30); // % tonus accélérateur
  const [pulsePhase, setPulsePhase] = useState<'diastole' | 'systole'>('diastole');
  const [stimulatingNerve, setStimulatingNerve] = useState<'none' | 'vague' | 'sympathique'>('none');
  const [cutNerve, setCutNerve] = useState<'none' | 'vague' | 'sympathique'>('none');

  // Calculs hémodynamiques en temps réel
  const cardiacOutput = heartRate > 0 ? ((heartRate * contractility) / 1000).toFixed(1) : '0.0';
  const bloodPressureSys = heartRate > 0 ? Math.round(100 + (heartRate - 70) * 0.4 + (contractility - 70) * 0.5) : 0;
  const bloodPressureDia = heartRate > 0 ? Math.round(70 + (heartRate - 70) * 0.2) : 0;

  // Battement cardiaque mécanique réaliste (animation de contraction systole/diastole)
  useEffect(() => {
    if (heartRate <= 0) {
      setPulsePhase('diastole');
      return;
    }
    const cycleMs = Math.round(60000 / heartRate);
    const systoleDuration = Math.min(300, Math.round(cycleMs * 0.35));

    const interval = setInterval(() => {
      setPulsePhase('systole');
      setTimeout(() => {
        setPulsePhase('diastole');
      }, systoleDuration);
    }, cycleMs);

    return () => clearInterval(interval);
  }, [heartRate]);

  // Points du tracé cardiographique réaliste (ECG continu avec onde P, QRS et T)
  const [ecgPoints, setEcgPoints] = useState<number[]>(new Array(40).fill(50));
  const phaseRef = useRef<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setEcgPoints((prev) => {
        const next = [...prev.slice(1)];
        if (heartRate <= 0) {
          next.push(50); // Ligne isoélectrique d'asystolie
        } else {
          phaseRef.current = (phaseRef.current + 1) % 20;
          const p = phaseRef.current;
          let val = 50;

          // Génération d'une onde ECG réaliste
          const ampMult = contractility / 70;
          if (p === 3) val = 47; // Onde P (oreillettes)
          else if (p === 4) val = 45;
          else if (p === 5) val = 50;
          else if (p === 8) val = 53; // Q
          else if (p === 9) val = 50 - 38 * ampMult; // R (pic systolique ventriculaire)
          else if (p === 10) val = 50 + 15 * ampMult; // S
          else if (p === 14) val = 44; // Onde T (repolarisation)
          else if (p === 15) val = 43;
          else val = 50; // Ligne de base

          next.push(val);
        }
        return next;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [heartRate, contractility]);

  // Actions expérimentales
  const applyIntervention = (
    type: 'repos' | 'vague_modere' | 'vague_fort' | 'sympathique' | 'vagotomie' | 'sympathectomie' | 'effort'
  ) => {
    setActiveIntervention(type);
    if (type === 'repos') {
      setHeartRate(75);
      setContractility(70);
      setVagalTone(70);
      setSympTone(30);
      setStimulatingNerve('none');
      setCutNerve('none');
    } else if (type === 'vague_modere') {
      setHeartRate(42);
      setContractility(60);
      setVagalTone(95);
      setSympTone(15);
      setStimulatingNerve('vague');
      setCutNerve('none');
    } else if (type === 'vague_fort') {
      setHeartRate(0);
      setContractility(50);
      setVagalTone(100);
      setSympTone(5);
      setStimulatingNerve('vague');
      setCutNerve('none');
    } else if (type === 'sympathique') {
      setHeartRate(140);
      setContractility(110);
      setVagalTone(10);
      setSympTone(95);
      setStimulatingNerve('sympathique');
      setCutNerve('none');
    } else if (type === 'vagotomie') {
      setHeartRate(105);
      setContractility(75);
      setVagalTone(0);
      setSympTone(40);
      setStimulatingNerve('none');
      setCutNerve('vague');
    } else if (type === 'sympathectomie') {
      setHeartRate(60);
      setContractility(58);
      setVagalTone(75);
      setSympTone(0);
      setStimulatingNerve('none');
      setCutNerve('sympathique');
    } else if (type === 'effort') {
      setHeartRate(165);
      setContractility(125);
      setVagalTone(5);
      setSympTone(100);
      setStimulatingNerve('sympathique');
      setCutNerve('none');
    }
  };

  // =========================================================================
  // ÉTAT ONGLET 2 : EXPÉRIENCE D'OTTO LOEWI (1921)
  // =========================================================================
  const [loewiStep, setLoewiStep] = useState<number>(0);
  const [loewiPlaying, setLoewiPlaying] = useState<boolean>(false);
  const [c1Rate, setC1Rate] = useState<number>(60);
  const [c2Rate, setC2Rate] = useState<number>(60);
  const [valveOpen, setValveOpen] = useState<boolean>(false);

  const startLoewiExperiment = () => {
    setLoewiPlaying(true);
    setLoewiStep(1); // Étape 1 : Stimulation du Vague du Cœur 1
    setC1Rate(25);
    setTimeout(() => {
      setLoewiStep(2); // Étape 2 : Cœur 1 arrêté en diastole, sécrétion Vagusstoff
      setC1Rate(0);
      setValveOpen(true);
      setTimeout(() => {
        setLoewiStep(3); // Étape 3 : Transfert du liquide enrichi vers Cœur 2
        setTimeout(() => {
          setLoewiStep(4); // Étape 4 : Cœur 2 s'arrête sans nerf !
          setC2Rate(0);
          setLoewiPlaying(false);
        }, 3000);
      }, 2500);
    }, 2500);
  };

  const resetLoewi = () => {
    setLoewiStep(0);
    setLoewiPlaying(false);
    setC1Rate(60);
    setC2Rate(60);
    setValveOpen(false);
  };

  // =========================================================================
  // ÉTAT ONGLET 3 : BANC PHARMACOLOGIQUE MOLÉCULAIRE
  // =========================================================================
  const [selectedDrug, setSelectedDrug] = useState<
    'none' | 'ach' | 'atropine' | 'noradrenaline' | 'propranolol' | 'adrenaline' | 'curare'
  >('none');

  const DRUG_DETAILS = {
    none: {
      name: 'Liquide physiologique de Ringer (Témoin)',
      badge: 'Solution Isotonique',
      color: 'slate',
      fc: 75,
      amplitude: 'Normale (70 mL)',
      mecanisme:
        'Milieu nutritif salin contenant Na⁺, K⁺, Ca²⁺ à concentrations physiologiques. Ne modifie pas l’équilibre basal.',
      bacTip:
        'Sert de témoin négatif dans toutes les expérimentations de physiologie cardiaque du Baccalauréat.',
    },
    ach: {
      name: 'Acétylcholine (ACh - 10⁻⁶ mol/L)',
      badge: 'Agoniste Muscarinique M₂',
      color: 'sky',
      fc: 35,
      amplitude: 'Réduite (50 mL)',
      mecanisme:
        'Se fixe sur les récepteurs muscariniques M₂ couplés aux protéines Gi. Ouvre les canaux potassiques K_ACh, hyperpolarise la membrane des cellules nodales et freine la pente de prépotentiel.',
      bacTip:
        'Reproduit exactement les effets de la stimulation du nerf vague (effet chronotrope, inotrope et dromotrope négatifs). Arrêt réversible en diastole.',
    },
    atropine: {
      name: 'Atropine (10⁻⁵ mol/L)',
      badge: 'Antagoniste Muscarinique',
      color: 'purple',
      fc: 112,
      amplitude: 'Légèrement accrue (75 mL)',
      mecanisme:
        'Antagoniste compétitif stéréospécifique des récepteurs muscariniques. Occupe le site de liaison de l’ACh sans l’activer, empêchant tout freinage vagal.',
      bacTip:
        'Lève le tonus cardiomodérateur permanent au repos (tachycardie) et rend toute stimulation électrique du nerf vague totalement inefficace !',
    },
    noradrenaline: {
      name: 'Noradrénaline (NA - 10⁻⁶ mol/L)',
      badge: 'Agoniste β₁-Adrénergique',
      color: 'rose',
      fc: 140,
      amplitude: 'Fortement accrue (115 mL)',
      mecanisme:
        'Active les récepteurs β₁ couplés à la protéine Gs, augmentant l’AMP cyclique intracellulaire et stimulant l’entrée massive d’ions calcium Ca²⁺ par les canaux de type L.',
      bacTip:
        'Mime la stimulation des nerfs sympathiques : chronotrope positif puissant et inotrope positif (doublement de l’amplitude des contractions ventriculaires).',
    },
    propranolol: {
      name: 'Propranolol (Bêtabloquant)',
      badge: 'Antagoniste β₁-Adrénergique',
      color: 'indigo',
      fc: 58,
      amplitude: 'Atténuée (62 mL)',
      mecanisme:
        'Bloque sélectivement les récepteurs β₁-adrénergiques myocardiques. Empêche la fixation de la noradrénaline et de l’adrénaline circulantes.',
      bacTip:
        'Abaisse la fréquence cardiaque de repos et neutralise complètement la tachycardie d’effort ou de stress. Médicament clé de l’hypertension artérielle.',
    },
    adrenaline: {
      name: 'Adrénaline Médullosurrénalienne',
      badge: 'Hormone d’Urgence',
      color: 'amber',
      fc: 155,
      amplitude: 'Maximale (130 mL)',
      mecanisme:
        'Hormone sécrétée par la médullosurrénale. Action systémique puissante sur les récepteurs β₁ nodaux et sur la totalité des myocytes ventriculaires.',
      bacTip:
        'Provoque une tachycardie explosive et une augmentation massive du volume d’éjection systolique (DC > 20 L/min lors du stress ou effort maximal).',
    },
    curare: {
      name: 'Curare (d-Tubocurarine)',
      badge: 'Bloquant Nicotinique Exclusif',
      color: 'emerald',
      fc: 75,
      amplitude: 'Normale (70 mL)',
      mecanisme:
        'Bloque exclusivement les récepteurs nicotiniques de la plaque motrice des muscles striés squelettiques. Sans AUCUNE affinité pour les récepteurs muscariniques du cœur !',
      bacTip:
        'PIÈGE BAC MAJEUR : Le curare paralyse les muscles du corps mais n’a AUCUN effet sur le cœur. Démontre l’hétérogénéité des récepteurs cholinergiques !',
    },
  };

  const activeDrug = DRUG_DETAILS[selectedDrug];

  return (
    <div className="w-full bg-white border border-slate-200 rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden mb-8">
      {/* ── EN-TÊTE DU LABORATOIRE ── */}
      <div className="px-5 py-6 sm:px-8 sm:py-7 bg-gradient-to-r from-sky-50 via-white to-rose-50 border-b border-slate-200/80">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-sky-100 text-sky-800 border border-sky-200">
            DISPOSITIF DE PHYSIOLOGIE MÉDICALE
          </span>
          <span className="text-xs font-bold text-slate-500">
            SVT Terminale S2 &bull; Physiologie Cardiovasculaire
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Laboratoire d&apos;Électrophysiologie & <span className="text-sky-600">Régulation Cardiaque</span>
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Explorez l&apos;anatomie réelle de la double innervation, stimulez les nerfs crâniens et spinaux, reproduisez le protocole d&apos;Otto Loewi et analysez l&apos;action moléculaire des drogues sur le myocarde.
        </p>

        {/* Navigation des 3 Onglets Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-5">
          {[
            { id: 'innervation', label: '1. Anatomie & Double Innervation', sub: 'Bulbe, Moelle, Cœur & ECG' },
            { id: 'loewi', label: '2. Expérience Loewi (1921)', sub: 'Transmission chimique Ringer' },
            { id: 'pharmaco', label: '3. Banc Pharmacologique', sub: 'ACh, Atropine, Bêtabloquant' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as LabTab)}
              className={`p-3 rounded-2xl text-left transition-all border ${
                activeTab === tab.id
                  ? 'bg-sky-600 text-white border-sky-600 shadow-md ring-2 ring-sky-300/40'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              <p className="font-bold text-xs sm:text-sm">{tab.label}</p>
              <p className={`text-[10px] mt-0.5 ${activeTab === tab.id ? 'text-sky-100' : 'text-slate-500'}`}>
                {tab.sub}
              </p>
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ONGLET 1 : ANATOMIE RÉALISTE DE LA DOUBLE INNERVATION & MONITORING CLINIQUE */}
      {/* ========================================================================= */}
      {activeTab === 'innervation' && (
        <div className="p-4 sm:p-7 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* ILLUSTRATION ANATOMIQUE MÉDICALE EN SVG RÉALISTE (7 colonnes) */}
            <div className="lg:col-span-7 bg-slate-50/80 border border-slate-200 rounded-3xl p-4 sm:p-6 flex flex-col items-center">
              <div className="w-full flex items-center justify-between mb-3 border-b border-slate-200/80 pb-2.5">
                <span className="text-xs font-black text-slate-800 tracking-wider flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  DISSECTION ANATOMIQUE DU SYSTÈME VÉGÉTATIF CARDIAQUE
                </span>
                <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                  Vue Médicale Antérieure
                </span>
              </div>

              {/* Conteneur SVG avec ratio d'aspect préservé */}
              <div className="w-full max-w-lg aspect-[4/3.8] relative my-1">
                <svg viewBox="0 0 520 480" className="w-full h-full select-none" preserveAspectRatio="xMidYMid meet">
                  <defs>
                    {/* Dégradés anatomiques haute fidélité */}
                    {/* Encéphale / Tronc cérébral */}
                    <linearGradient id="brainStemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fbcfe8" />
                      <stop offset="60%" stopColor="#f472b6" />
                      <stop offset="100%" stopColor="#db2777" />
                    </linearGradient>

                    {/* Moelle Épinière */}
                    <linearGradient id="spinalCordGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ffedd5" />
                      <stop offset="50%" stopColor="#fed7aa" />
                      <stop offset="100%" stopColor="#fb923c" />
                    </linearGradient>

                    {/* Aorte (Oxygénée - Rouge vif) */}
                    <linearGradient id="aortaRealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#f87171" />
                      <stop offset="40%" stopColor="#ef4444" />
                      <stop offset="85%" stopColor="#b91c1c" />
                      <stop offset="100%" stopColor="#7f1d1d" />
                    </linearGradient>

                    {/* Veines Caves (Désoxygénées - Bleu intense) */}
                    <linearGradient id="venaCavaRealGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#60a5fa" />
                      <stop offset="50%" stopColor="#2563eb" />
                      <stop offset="100%" stopColor="#1e3a8a" />
                    </linearGradient>

                    {/* Artère Pulmonaire */}
                    <linearGradient id="pulmonaryRealGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#93c5fd" />
                      <stop offset="60%" stopColor="#3b82f6" />
                      <stop offset="100%" stopColor="#1d4ed8" />
                    </linearGradient>

                    {/* Myocarde externe (Musculaire carné) */}
                    <linearGradient id="myocardiumGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fb7185" />
                      <stop offset="35%" stopColor="#e11d48" />
                      <stop offset="75%" stopColor="#be123c" />
                      <stop offset="100%" stopColor="#881337" />
                    </linearGradient>

                    {/* Lueur de décharge électrique */}
                    <filter id="electricGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                  </defs>

                  {/* ── 1. CENTRES NERVEUX SUPÉRIEURS (EN HAUT) ── */}

                  {/* A) TRONC CÉRÉBRAL & BULBE RACHIDIEN (GOUVERNE LE PARASYMPATHIQUE) */}
                  <g transform="translate(60, 20)">
                    {/* Silhouette anatomique du tronc cérébral & bulbe */}
                    <path
                      d="M 40 10 C 25 10, 20 30, 25 50 C 15 65, 20 85, 35 90 C 35 110, 55 115, 65 115 C 75 115, 95 110, 95 90 C 110 85, 115 65, 105 50 C 110 30, 105 10, 90 10 Z"
                      fill="url(#brainStemGrad)"
                      stroke="#9d174d"
                      strokeWidth="2"
                    />
                    {/* Sillons bulbaires & olives */}
                    <path d="M 50 60 Q 65 85 80 60" fill="none" stroke="#be185d" strokeWidth="1.5" />
                    <ellipse cx="45" cy="75" rx="8" ry="12" fill="#be185d" opacity="0.3" />
                    <ellipse cx="85" cy="75" rx="8" ry="12" fill="#be185d" opacity="0.3" />

                    {/* Noyau Moteur Dorsal du X (Centre cardiomodérateur bulbaire) */}
                    <circle
                      cx="65"
                      cy="82"
                      r={stimulatingNerve === 'vague' ? 7 : 5}
                      fill="#0284c7"
                      stroke="#e0f2fe"
                      strokeWidth="2"
                      className={stimulatingNerve === 'vague' ? 'animate-pulse' : ''}
                      filter="url(#electricGlow)"
                    />
                    <text x="65" y="5" textAnchor="middle" fontSize="10" fontWeight="900" fill="#9d174d">BULBE RACHIDIEN</text>
                    <text x="65" y="105" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#0369a1">Noyau Moteur du X</text>
                  </g>

                  {/* B) MOELLE ÉPINIÈRE THORACIQUE D1-D5 (GOUVERNE LE SYMPATHIQUE) */}
                  <g transform="translate(340, 20)">
                    {/* Colonne et moelle épinière */}
                    <rect x="35" y="10" width="40" height="110" rx="8" fill="url(#spinalCordGrad)" stroke="#c2410c" strokeWidth="2" />
                    {/* Métamères médullaires D1 - D5 */}
                    {[25, 45, 65, 85, 105].map((y, i) => (
                      <line key={y} x1="38" y1={y} x2="72" y2={y} stroke="#ea580c" strokeWidth="1.5" strokeDasharray="2 2" />
                    ))}
                    {/* Corne latérale sympathique */}
                    <circle
                      cx="55"
                      cy="65"
                      r={stimulatingNerve === 'sympathique' ? 7 : 5}
                      fill="#dc2626"
                      stroke="#fee2e2"
                      strokeWidth="2"
                      className={stimulatingNerve === 'sympathique' ? 'animate-pulse' : ''}
                      filter="url(#electricGlow)"
                    />
                    <text x="55" y="5" textAnchor="middle" fontSize="10" fontWeight="900" fill="#c2410c">MOELLE THORACIQUE</text>
                    <text x="55" y="130" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#b91c1c">Centres D1 - D5</text>
                  </g>

                  {/* ── 2. TRAJET ANATOMIQUE DES VOIES NERVEUSES ── */}

                  {/* VOIE PARASYMPATHIQUE (NERF VAGUE X - BLEU CYAN) */}
                  <g>
                    {/* Trajet du nerf vague partant du bulbe jusqu'à l'oreillette droite */}
                    <path
                      d="M 125 105 C 130 160, 160 210, 205 245"
                      fill="none"
                      stroke={stimulatingNerve === 'vague' ? '#0284c7' : '#64748b'}
                      strokeWidth={stimulatingNerve === 'vague' ? 4.5 : 2.5}
                      strokeLinecap="round"
                      strokeDasharray={stimulatingNerve === 'vague' ? '5 3' : 'none'}
                      className={stimulatingNerve === 'vague' ? 'animate-pulse' : ''}
                    />

                    {/* Micro-ganglion intramural à l'abouchement auriculaire */}
                    <circle cx="205" cy="245" r="5" fill="#38bdf8" stroke="#0369a1" strokeWidth="1.5" />

                    {/* Électrode de stimulation sur le nerf vague */}
                    <g transform="translate(142, 175)">
                      <rect x="-8" y="-4" width="16" height="8" rx="2" fill="#334155" stroke="#94a3b8" strokeWidth="1" />
                      <line x1="-4" y1="-8" x2="-4" y2="-4" stroke="#94a3b8" strokeWidth="1.5" />
                      <line x1="4" y1="-8" x2="4" y2="-4" stroke="#94a3b8" strokeWidth="1.5" />
                      {stimulatingNerve === 'vague' && (
                        <text x="12" y="3" fontSize="11" fill="#0284c7" fontWeight="bold">⚡ 5V</text>
                      )}
                    </g>

                    {cutNerve === 'vague' && (
                      <g transform="translate(136, 170)">
                        <text x="0" y="0" fontSize="18" fill="#dc2626" fontWeight="bold">✂</text>
                        <text x="15" y="-5" fontSize="9" fill="#dc2626" fontWeight="black">SECTION</text>
                      </g>
                    )}

                    <text x="100" y="160" fontSize="9" fontWeight="black" fill="#0284c7">Nerf Vague (X)</text>
                    <text x="100" y="172" fontSize="7.5" fill="#0369a1">Acétylcholine (ACh)</text>
                  </g>

                  {/* VOIE ORTHOSYMPATHIQUE (NERFS SYMPATHIQUES - ROUGE ORANGE) */}
                  <g>
                    {/* Rameau préganglionnaire reliant la moelle au ganglion stellaire */}
                    <path d="M 375 85 L 345 155" fill="none" stroke="#ea580c" strokeWidth="2" strokeDasharray="3 2" />

                    {/* GANGLION STELLAIRE (Cervico-thoracique étoilé) */}
                    <path
                      d="M 345 145 C 335 150, 335 165, 345 170 C 355 170, 358 158, 352 148 Z"
                      fill="#fca5a5"
                      stroke="#dc2626"
                      strokeWidth="2"
                    />
                    <circle cx="347" cy="158" r="7" fill="#ef4444" opacity="0.4" />
                    <text x="362" y="158" fontSize="8" fontWeight="bold" fill="#991b1b">Ganglion Stellaire</text>

                    {/* Nerf cardiaque post-ganglionnaire descendant vers la base et ventricules */}
                    <path
                      d="M 345 168 C 340 210, 310 250, 260 280"
                      fill="none"
                      stroke={stimulatingNerve === 'sympathique' ? '#dc2626' : '#64748b'}
                      strokeWidth={stimulatingNerve === 'sympathique' ? 4.5 : 2.5}
                      strokeLinecap="round"
                      strokeDasharray={stimulatingNerve === 'sympathique' ? '5 3' : 'none'}
                      className={stimulatingNerve === 'sympathique' ? 'animate-pulse' : ''}
                    />

                    {/* Électrode de stimulation sur le nerf sympathique */}
                    <g transform="translate(325, 220)">
                      <rect x="-8" y="-4" width="16" height="8" rx="2" fill="#334155" stroke="#94a3b8" strokeWidth="1" />
                      <line x1="-4" y1="-8" x2="-4" y2="-4" stroke="#94a3b8" strokeWidth="1.5" />
                      <line x1="4" y1="-8" x2="4" y2="-4" stroke="#94a3b8" strokeWidth="1.5" />
                      {stimulatingNerve === 'sympathique' && (
                        <text x="12" y="3" fontSize="11" fill="#dc2626" fontWeight="bold">⚡ 5V</text>
                      )}
                    </g>

                    {cutNerve === 'sympathique' && (
                      <g transform="translate(325, 215)">
                        <text x="0" y="0" fontSize="18" fill="#dc2626" fontWeight="bold">✂</text>
                        <text x="15" y="-5" fontSize="9" fill="#dc2626" fontWeight="black">SECTION</text>
                      </g>
                    )}

                    <text x="350" y="215" fontSize="9" fontWeight="black" fill="#dc2626">Nerf Sympathique</text>
                    <text x="350" y="227" fontSize="7.5" fill="#991b1b">Noradrénaline (NA)</text>
                  </g>

                  {/* ── 3. CŒUR ANATOMIQUE MÉDICAL RÉALISTE EN BATTEMENT PHYSIOLOGIQUE ── */}
                  <g
                    transform={`translate(260, 335) scale(${
                      pulsePhase === 'systole' ? 0.94 : 1.0
                    }) translate(-260, -335)`}
                    style={{ transition: 'transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                  >
                    {/* A) GROS VAISSEAUX SANGUINS SUPÉRIEURS */}

                    {/* Veine cave supérieure (Bleue) */}
                    <path
                      d="M 195 210 L 195 245 C 195 255, 205 260, 215 260 L 218 210 Z"
                      fill="url(#venaCavaRealGrad)"
                      stroke="#1e3a8a"
                      strokeWidth="1.5"
                    />

                    {/* Veine cave inférieure */}
                    <path d="M 210 390 L 210 420 L 230 420 L 230 395 Z" fill="url(#venaCavaRealGrad)" stroke="#1e3a8a" strokeWidth="1.5" />

                    {/* Crosse Aortique Rouge avec 3 troncs artériels */}
                    {/* Troncs brachio-céphaliques */}
                    <path d="M 248 190 L 246 165 L 255 165 L 258 193 Z" fill="url(#aortaRealGrad)" stroke="#7f1d1d" strokeWidth="1" />
                    <path d="M 265 195 L 268 160 L 277 160 L 275 197 Z" fill="url(#aortaRealGrad)" stroke="#7f1d1d" strokeWidth="1" />
                    <path d="M 284 198 L 292 166 L 301 167 L 293 205 Z" fill="url(#aortaRealGrad)" stroke="#7f1d1d" strokeWidth="1" />

                    {/* Arc aortique principal */}
                    <path
                      d="M 235 240 C 235 195, 305 185, 315 235 C 320 260, 315 280, 310 295 L 295 290 C 300 270, 300 250, 295 235 C 290 215, 255 218, 252 245 Z"
                      fill="url(#aortaRealGrad)"
                      stroke="#7f1d1d"
                      strokeWidth="2"
                    />

                    {/* Tronc artériel pulmonaire croisant en avant */}
                    <path
                      d="M 245 270 C 250 235, 275 220, 300 215 L 305 230 C 285 235, 270 250, 265 275 Z"
                      fill="url(#pulmonaryRealGrad)"
                      stroke="#1e3a8a"
                      strokeWidth="1.5"
                    />

                    {/* B) MYOCARDE ET CONTOUR VENTRICULAIRE / AURICULAIRE RÉALISTE */}
                    <path
                      d="M 205 245
                         C 170 248, 165 285, 180 315
                         C 165 330, 180 395, 235 440
                         C 255 458, 275 462, 285 462
                         C 300 462, 325 435, 355 385
                         C 385 330, 375 275, 335 255
                         C 320 248, 305 250, 290 258
                         C 275 248, 235 242, 205 245 Z"
                      fill="url(#myocardiumGrad)"
                      stroke="#4c0519"
                      strokeWidth="3"
                    />

                    {/* Sillons musculaires & vaisseaux coronaires en surface (Arteries rouges & Veines bleues) */}
                    <path d="M 265 285 Q 260 360 280 440" fill="none" stroke="#7f1d1d" strokeWidth="2.5" />
                    <path d="M 268 285 Q 263 360 283 440" fill="none" stroke="#1e3a8a" strokeWidth="1.5" />
                    <path d="M 262 330 Q 235 345 210 355" fill="none" stroke="#991b1b" strokeWidth="1.2" />
                    <path d="M 270 365 Q 315 375 340 380" fill="none" stroke="#991b1b" strokeWidth="1.2" />

                    {/* C) TISSU NODAL CARDIAQUE EN SITUATION ANATOMIQUE */}
                    {/* Nœud Sinusal de Keith & Flack (dans la paroi de l'oreillette droite) */}
                    <g filter="url(#electricGlow)">
                      <circle
                        cx="205"
                        cy="252"
                        r={pulsePhase === 'systole' ? 6.5 : 5}
                        fill="#facc15"
                        stroke="#b45309"
                        strokeWidth="1.5"
                      />
                      <text x="180" y="244" fontSize="8" fontWeight="black" fill="#ca8a04">NŒUD SINUSAL</text>
                    </g>

                    {/* Nœud Auriculo-Ventriculaire (d'Aschoff-Tawara) */}
                    <circle cx="245" cy="295" r="4.5" fill="#facc15" stroke="#b45309" strokeWidth="1.5" />

                    {/* Faisceau de His & Réseau de Purkinje */}
                    <path d="M 245 299 L 255 340" fill="none" stroke="#facc15" strokeWidth="2" strokeDasharray="2 1" />
                    <path d="M 255 340 Q 240 380 230 410" fill="none" stroke="#facc15" strokeWidth="1.5" />
                    <path d="M 255 340 Q 285 390 310 420" fill="none" stroke="#facc15" strokeWidth="1.5" />
                  </g>
                </svg>
              </div>

              {/* Encadré d'analyse physiologique en direct */}
              <div className="w-full bg-white border border-slate-200 rounded-2xl p-3.5 mt-2 text-xs leading-relaxed text-slate-700 shadow-sm">
                <span className="font-black text-slate-900 block mb-0.5">
                  ANALYSE DU TRACÉ & ÉTAT PHYSIOLOGIQUE :
                </span>
                {activeIntervention === 'repos' && (
                  <p>
                    <strong className="text-slate-900">Équilibre neurovégétatif basal (75 bpm) :</strong> Le cœur est soumis en permanence au <span className="text-sky-700 font-bold">tonus cardiomodérateur vagal</span> qui freine le rythme spontané du nœud sinusal (qui battrait sinon à ~105 bpm).
                  </p>
                )}
                {activeIntervention === 'vague_modere' && (
                  <p>
                    <strong className="text-sky-700">Stimulation du Nerf Vague (X) :</strong> Libération d&apos;Acétylcholine sur récepteurs muscariniques M₂ &rarr; Ralentissement de la fréquence (<strong className="text-sky-800">bradycardie à 42 bpm</strong>) et espacement des cycles cardiaques.
                  </p>
                )}
                {activeIntervention === 'vague_fort' && (
                  <p>
                    <strong className="text-sky-800">Stimulation Vagale Intense :</strong> Hyperpolarisation massive des cellules nodales &rarr; <strong className="text-rose-700 font-black">ARRÊT CARDIAQUE RÉVERSIBLE EN DIASTOLE</strong> (relâchement musculaire total).
                  </p>
                )}
                {activeIntervention === 'sympathique' && (
                  <p>
                    <strong className="text-rose-700">Stimulation des Nerfs Sympathiques :</strong> Libération de Noradrénaline sur récepteurs β₁ &rarr; <strong className="text-rose-800">Tachycardie (140 bpm)</strong> et augmentation massive de la contractilité ventriculaire (<strong className="text-slate-900">Inotrope positif</strong>).
                  </p>
                )}
                {activeIntervention === 'vagotomie' && (
                  <p>
                    <strong className="text-amber-700">Double Vagotomie (Section bilatérale des nerfs X) :</strong> Suppression du frein vagal permanent &rarr; Démasquage du rythme intrinsèque spontané du tissu nodal (<strong className="text-rose-700 font-black">105 bpm</strong>) !
                  </p>
                )}
                {activeIntervention === 'sympathectomie' && (
                  <p>
                    <strong className="text-slate-800">Section des Sympathiques :</strong> Perte du faible tonus cardioaccélérateur de repos &rarr; Légère diminution de la FC de repos (60 bpm).
                  </p>
                )}
                {activeIntervention === 'effort' && (
                  <p>
                    <strong className="text-rose-700">Effort Musculaire Intense / Stress :</strong> Activation sympathique maximale + libération d&apos;adrénaline médullosurrénalienne &rarr; FC = 165 bpm, débit cardiaque triplé (DC &approx; 20.6 L/min) !
                  </p>
                )}
              </div>
            </div>

            {/* MONITORING CLINIQUE & CONTRÔLES EXPÉRIMENTAUX (5 colonnes) */}
            <div className="lg:col-span-5 space-y-4">
              {/* MONITEUR CARDIOVASCULAIRE NUMÉRIQUE (STYLE BLOC OPÉRATOIRE / HOSPITALIER) */}
              <div className="bg-slate-950 border-2 border-slate-800 rounded-3xl p-4 sm:p-5 text-emerald-400 font-mono shadow-xl relative overflow-hidden">
                {/* Ligne d'état du moniteur */}
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 text-xs">
                  <span className="flex items-center gap-1.5 text-slate-400 font-sans font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                    MONITEUR ECG DII &bull; EN DIRECT
                  </span>
                  <span className="text-[11px] font-bold text-slate-400">FILTRE 50 Hz</span>
                </div>

                {/* Oscilloscope ECG en temps réel */}
                <div className="h-32 w-full bg-slate-900/90 rounded-2xl relative overflow-hidden p-1.5 border border-slate-800 flex items-center justify-center">
                  {/* Grille millimétrée d'ECG */}
                  <div
                    className="absolute inset-0 opacity-15"
                    style={{
                      backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)',
                      backgroundSize: '12px 12px',
                    }}
                  ></div>

                  {/* Tracé de l'onde ECG */}
                  <svg viewBox="0 0 100 100" className="w-full h-full relative z-10" preserveAspectRatio="none">
                    <polyline
                      fill="none"
                      stroke={heartRate === 0 ? '#ef4444' : '#10b981'}
                      strokeWidth="2.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={ecgPoints.map((y, i) => `${(i / (ecgPoints.length - 1)) * 100},${y}`).join(' ')}
                    />
                  </svg>
                </div>

                {/* Données hémodynamiques chiffrées en direct */}
                <div className="grid grid-cols-2 gap-3 mt-3 pt-3 border-t border-slate-800/80">
                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-sans uppercase block">Fréquence Cardiaque</span>
                    <span className={`text-2xl font-black ${
                      heartRate === 0 ? 'text-rose-500 animate-pulse' : heartRate > 100 ? 'text-amber-400' : 'text-emerald-400'
                    }`}>
                      {heartRate > 0 ? `${heartRate} BPM` : '0 BPM (Arrêt)'}
                    </span>
                  </div>

                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-sans uppercase block">Pression Artérielle</span>
                    <span className="text-xl font-black text-sky-400">
                      {heartRate > 0 ? `${bloodPressureSys} / ${bloodPressureDia}` : '0 / 0'}{' '}
                      <span className="text-[11px] text-slate-500 font-normal">mmHg</span>
                    </span>
                  </div>

                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-sans uppercase block">Débit Cardiaque (DC)</span>
                    <span className="text-xl font-black text-white">
                      {cardiacOutput} <span className="text-[11px] text-slate-500 font-normal">L/min</span>
                    </span>
                  </div>

                  <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800">
                    <span className="text-[10px] text-slate-400 font-sans uppercase block">Systole (VES)</span>
                    <span className="text-xl font-black text-rose-400">
                      {contractility} <span className="text-[11px] text-slate-500 font-normal">mL</span>
                    </span>
                  </div>
                </div>

                {/* Double Jauge de Balance Neurovégétative */}
                <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] font-sans">
                  <div className="flex justify-between text-slate-300 font-bold mb-1">
                    <span>Balance Végétative :</span>
                    <span className="text-sky-400">Vague {vagalTone}%</span>
                    <span className="text-slate-500">|</span>
                    <span className="text-rose-400">Sympathique {sympTone}%</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden flex">
                    <div
                      className="bg-sky-500 h-full transition-all duration-300"
                      style={{ width: `${vagalTone}%` }}
                    ></div>
                    <div
                      className="bg-rose-500 h-full transition-all duration-300"
                      style={{ width: `${sympTone}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* CONTRÔLES EXPÉRIMENTAUX DU BACCALAURÉAT S2 */}
              <div className="bg-white border border-slate-200 rounded-3xl p-4 sm:p-5 shadow-sm space-y-3">
                <span className="text-xs font-black text-slate-800 uppercase tracking-wider block">
                  BANQUE D&apos;EXPÉRIMENTATIONS BAC S2
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => applyIntervention('vague_modere')}
                    className={`p-3 rounded-2xl text-left border transition-all text-xs font-bold ${
                      activeIntervention === 'vague_modere'
                        ? 'bg-sky-600 text-white border-sky-600 shadow-md ring-2 ring-sky-300'
                        : 'bg-sky-50/70 border-sky-200 hover:bg-sky-100 text-sky-900'
                    }`}
                  >
                    Stimuler Nerf Vague (Modéré)
                    <span className="block text-[10px] font-normal opacity-85">Bradycardie (ACh &rarr; 42 bpm)</span>
                  </button>

                  <button
                    onClick={() => applyIntervention('vague_fort')}
                    className={`p-3 rounded-2xl text-left border transition-all text-xs font-bold ${
                      activeIntervention === 'vague_fort'
                        ? 'bg-sky-900 text-white border-sky-900 shadow-md ring-2 ring-sky-300'
                        : 'bg-sky-100 border-sky-300 hover:bg-sky-200 text-sky-950'
                    }`}
                  >
                    Stimulation Vagale Intense
                    <span className="block text-[10px] font-normal opacity-85">Arrêt Réversible en Diastole</span>
                  </button>

                  <button
                    onClick={() => applyIntervention('sympathique')}
                    className={`p-3 rounded-2xl text-left border transition-all text-xs font-bold ${
                      activeIntervention === 'sympathique'
                        ? 'bg-rose-600 text-white border-rose-600 shadow-md ring-2 ring-rose-300'
                        : 'bg-rose-50/70 border-rose-200 hover:bg-rose-100 text-rose-900'
                    }`}
                  >
                    Stimuler Sympathique
                    <span className="block text-[10px] font-normal opacity-85">Tachycardie + Inotrope (+)</span>
                  </button>

                  <button
                    onClick={() => applyIntervention('vagotomie')}
                    className={`p-3 rounded-2xl text-left border transition-all text-xs font-bold ${
                      activeIntervention === 'vagotomie'
                        ? 'bg-amber-600 text-white border-amber-600 shadow-md ring-2 ring-amber-300'
                        : 'bg-amber-50/70 border-amber-300 hover:bg-amber-100 text-amber-950'
                    }`}
                  >
                    Double Vagotomie ✂
                    <span className="block text-[10px] font-normal opacity-85">Levée du frein (105 bpm)</span>
                  </button>

                  <button
                    onClick={() => applyIntervention('effort')}
                    className={`p-3 rounded-2xl text-left border transition-all text-xs font-bold ${
                      activeIntervention === 'effort'
                        ? 'bg-red-600 text-white border-red-600 shadow-md ring-2 ring-red-300'
                        : 'bg-red-50/70 border-red-200 hover:bg-red-100 text-red-900'
                    }`}
                  >
                    Effort / Stress Aigu
                    <span className="block text-[10px] font-normal opacity-85">Sympathique + Adrénaline (165 bpm)</span>
                  </button>

                  <button
                    onClick={() => applyIntervention('repos')}
                    className={`p-3 rounded-2xl text-left border transition-all text-xs font-bold ${
                      activeIntervention === 'repos'
                        ? 'bg-slate-800 text-white border-slate-800 shadow-md'
                        : 'bg-slate-100 border-slate-200 hover:bg-slate-200 text-slate-800'
                    }`}
                  >
                    Réinitialiser (Repos Basal)
                    <span className="block text-[10px] font-normal opacity-85">Tonus Vagal de repos (75 bpm)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ONGLET 2 : EXPÉRIENCE D'OTTO LOEWI (1921) HAUTE FIDÉLITÉ SCIENTIFIQUE */}
      {/* ========================================================================= */}
      {activeTab === 'loewi' && (
        <div className="p-4 sm:p-7 space-y-6">
          <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-5">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md border border-emerald-300">
                DISPOSITIF DE PERFUSION DE LOEWI
              </span>
              <span className="text-xs text-slate-600 font-bold">Prix Nobel de Médecine 1936</span>
            </div>
            <h3 className="text-lg font-black text-emerald-950">
              Démonstration de la Nature Chimique de la Médiation Vagale
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-1">
              Deux cœurs de grenouille sont perfusés en série par du liquide de Ringer oxygéné. Le <strong>Cœur 1 (donneur)</strong> conserve son innervation vagale. Le <strong>Cœur 2 (receveur)</strong> est dénervé et sans contact électrique. Observez la diffusion de la <em>Vagusstoff</em> (Acétylcholine).
            </p>
          </div>

          {/* Simulateur Visuel Réaliste des Deux Cœurs et de la Verrerie de Laboratoire */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-5 sm:p-7 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              {/* CŒUR 1 : DONNEUR AVEC NERF VAGUE */}
              <div className={`p-5 rounded-2xl border-2 transition-all ${
                loewiStep >= 2 ? 'bg-sky-50/80 border-sky-300 shadow-sm' : 'bg-white border-slate-200'
              }`}>
                <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                  <span className="text-xs font-black text-slate-900 uppercase">CŒUR 1 (Donneur)</span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                    Nerf Vague Connecté
                  </span>
                </div>

                <div className="h-44 flex flex-col items-center justify-center relative">
                  {/* Cœur anatomique animé */}
                  <div className={`relative transition-all duration-300 ${
                    c1Rate > 0 ? 'scale-100' : 'scale-90 opacity-70'
                  }`}>
                    {/* Électrode sur nerf vague */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-center">
                      <span className="text-xs font-black text-sky-700 bg-white px-2 py-0.5 rounded-md border border-sky-200 shadow-sm">
                        {loewiStep === 1 ? '⚡ STIMULATION (5V)' : 'Nerf Vague'}
                      </span>
                    </div>

                    <div className={`w-24 h-24 rounded-3xl flex items-center justify-center text-4xl shadow-md border-2 ${
                      loewiStep === 1
                        ? 'bg-sky-100 border-sky-400 ring-4 ring-sky-300 animate-pulse'
                        : c1Rate === 0
                        ? 'bg-slate-200 border-slate-300 text-slate-400'
                        : 'bg-rose-500 border-rose-600 text-white animate-bounce'
                    }`}>
                      🫀
                    </div>
                  </div>

                  <div className="mt-3 text-center">
                    <p className="text-sm font-black text-slate-900">
                      {c1Rate > 0 ? `${c1Rate} BPM (Actif)` : 'ARRÊT EN DIASTOLE (0 BPM)'}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {loewiStep === 1 ? 'Impulsions électriques actives...' : loewiStep >= 2 ? 'Inhibé par Acétylcholine' : 'Battements spontanés'}
                    </p>
                  </div>
                </div>
              </div>

              {/* CONNECTEUR LIQUIDE DESKTOP */}
              <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 bg-white border border-slate-300 px-4 py-2 rounded-full shadow-md text-xs font-black text-slate-700 flex-col items-center">
                <span>{valveOpen ? '🟢 Canule Ouverte' : '⚪ Canule Fermée'}</span>
                <span className="text-[9px] font-normal text-slate-500">
                  {loewiStep >= 3 ? 'Diffusion de la Vagusstoff (ACh)' : 'Liquide Ringer'}
                </span>
              </div>

              {/* CONNECTEUR LIQUIDE MOBILE */}
              <div className="flex md:hidden justify-center items-center py-2 px-3 text-xs font-bold text-emerald-800 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                {loewiStep >= 3 ? '🟢 Canule : Transfert du liquide enrichi en Acétylcholine &darr;' : '💧 Canule : Perfusion de liquide de Ringer neutre &darr;'}
              </div>

              {/* CŒUR 2 : RECEVEUR DÉNERVÉ */}
              <div className={`p-5 rounded-2xl border-2 transition-all ${
                loewiStep >= 4 ? 'bg-sky-50/80 border-sky-300 shadow-sm' : 'bg-white border-slate-200'
              }`}>
                <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-2">
                  <span className="text-xs font-black text-slate-900 uppercase">CŒUR 2 (Receveur)</span>
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                    Dénervé (Sans aucun nerf)
                  </span>
                </div>

                <div className="h-44 flex flex-col items-center justify-center relative">
                  <div className={`relative transition-all duration-300 ${
                    c2Rate > 0 ? 'scale-100' : 'scale-90 opacity-70'
                  }`}>
                    <div className={`w-24 h-24 rounded-3xl flex items-center justify-center text-4xl shadow-md border-2 ${
                      loewiStep >= 4
                        ? 'bg-slate-200 border-slate-300 text-slate-400'
                        : 'bg-rose-500 border-rose-600 text-white animate-bounce'
                    }`}>
                      🫀
                    </div>
                  </div>

                  <div className="mt-3 text-center">
                    <p className="text-sm font-black text-slate-900">
                      {c2Rate > 0 ? `${c2Rate} BPM (Autonome)` : 'ARRÊT EN DIASTOLE (0 BPM)'}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {loewiStep >= 4 ? 'Arrêt provoqué par la Vagusstoff reçue !' : loewiStep === 3 ? 'Arrivée du liquide de perfusion...' : 'Battement autonome'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* BARRE DE CONTRÔLE D'OTTO LOEWI */}
            <div className="p-4 bg-white border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-700 leading-relaxed">
                <span className="font-black text-slate-900 block mb-0.5">DÉMONSTRATION SCIENTIFIQUE DU BAC S2 :</span>
                {loewiStep === 0 && 'Cliquez sur « Déclencher l’Expérience » pour stimuler électriquement le Vague du Cœur 1.'}
                {loewiStep === 1 && '1/4 : Le nerf vague du cœur 1 reçoit des impulsions électriques &rarr; bradycardie.'}
                {loewiStep === 2 && '2/4 : Le cœur 1 s’arrête en diastole. Libération d’un médiateur chimique soluble.'}
                {loewiStep === 3 && '3/4 : Ouverture de la vanne : le liquide de Ringer baignant le cœur 1 s’écoule vers le cœur 2.'}
                {loewiStep === 4 && '4/4 : Le cœur 2 s’arrête sans aucun contact électrique ! Découverte de l’Acétylcholine.'}
              </div>

              <div className="flex gap-2 shrink-0">
                <button
                  disabled={loewiPlaying}
                  onClick={startLoewiExperiment}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-black shadow-sm transition-all"
                >
                  {loewiPlaying ? 'Expérience en cours...' : 'Déclencher l’Expérience'}
                </button>
                <button
                  onClick={resetLoewi}
                  className="px-4 py-2.5 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-all"
                >
                  Réinitialiser
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ONGLET 3 : BANC PHARMACOLOGIQUE MOLÉCULAIRE (AGONISTES & ANTAGONISTES) */}
      {/* ========================================================================= */}
      {activeTab === 'pharmaco' && (
        <div className="p-4 sm:p-7 space-y-6">
          <div className="bg-purple-50 border border-purple-200 rounded-3xl p-5">
            <span className="text-[10px] font-black uppercase tracking-widest bg-purple-100 text-purple-800 px-2.5 py-0.5 rounded-md border border-purple-300">
              PHARMACODYNAMIE DU MYOCARDE
            </span>
            <h3 className="text-lg font-black text-purple-950 mt-1">
              Banc d&apos;Essai Moléculaire : Neurotransmetteurs, Drogues & Hormones
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mt-1">
              Sélectionnez une molécule pour l&apos;injecter dans la cuve de perfusion du cœur isolé et observez la modulation de fréquence, de force contractile et le mécanisme récepteur.
            </p>
          </div>

          {/* Grille de sélection des 7 molécules testées */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {[
              { id: 'none', label: 'Ringer Neutre', tag: 'Témoin' },
              { id: 'ach', label: 'Acétylcholine', tag: 'Agoniste M₂' },
              { id: 'atropine', label: 'Atropine', tag: 'Bloquant M₂' },
              { id: 'noradrenaline', label: 'Noradrénaline', tag: 'Agoniste β₁' },
              { id: 'propranolol', label: 'Propranolol', tag: 'Bêtabloquant' },
              { id: 'adrenaline', label: 'Adrénaline', tag: 'Hormone' },
              { id: 'curare', label: 'Curare', tag: 'Nicotinique' },
            ].map((drug) => (
              <button
                key={drug.id}
                onClick={() => setSelectedDrug(drug.id as any)}
                className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                  selectedDrug === drug.id
                    ? 'bg-purple-600 text-white border-purple-600 shadow-md ring-2 ring-purple-300'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span className="text-[10px] font-extrabold opacity-80">{drug.tag}</span>
                <p className="text-xs font-black mt-1 leading-snug">{drug.label}</p>
              </button>
            ))}
          </div>

          {/* Fiche de résultat pharmacologique détaillé */}
          <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded bg-purple-100 text-purple-800">
                  {activeDrug.badge}
                </span>
                <h4 className="text-xl font-black text-slate-900 mt-1">{activeDrug.name}</h4>
              </div>

              <div className="flex items-center gap-4 bg-slate-50 border border-slate-200 px-4 py-2 rounded-2xl">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Fréquence</span>
                  <span className="text-xl font-black text-purple-700">{activeDrug.fc} bpm</span>
                </div>
                <div className="border-l border-slate-200 pl-4">
                  <span className="text-[10px] text-slate-500 font-bold uppercase block">Force Systole</span>
                  <span className="text-sm font-black text-slate-800">{activeDrug.amplitude}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                <p className="font-black text-slate-900 mb-1 uppercase tracking-wider">
                  MÉCANISME D&apos;ACTION MOLÉCULAIRE :
                </p>
                <p className="text-slate-700 leading-relaxed">{activeDrug.mecanisme}</p>
              </div>

              <div className="bg-purple-50/70 rounded-2xl p-4 border border-purple-200 text-purple-950">
                <p className="font-black mb-1 uppercase tracking-wider">
                  CLÉ D&apos;OR DU BACCALAURÉAT S2 :
                </p>
                <p className="leading-relaxed font-medium">{activeDrug.bacTip}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
