'use client';

import { useState, useEffect, useRef } from 'react';

type LabTab = 'innervation' | 'loewi' | 'pharmaco';

export default function B2RegulationNerveuseInteractiveLab() {
  const [activeTab, setActiveTab] = useState<LabTab>('innervation');

  // --- ÉTAT ONGLET 1 : INNERVATION ---
  const [heartRate, setHeartRate] = useState<number>(75);
  const [activeStimulation, setActiveStimulation] = useState<'none' | 'vague' | 'sympathique' | 'vagotomie' | 'sympathectomie'>('none');
  const [pulseScale, setPulseScale] = useState<number>(1);
  const [statusText, setStatusText] = useState<string>('État de repos normal (Équilibre neurovégétatif avec prédominance du tonus vagal)');

  // Tracé cardiographique temps réel
  const [points, setPoints] = useState<number[]>([50, 50, 50, 50, 50, 50, 50, 50, 50, 50]);

  // Battement de cœur animé
  useEffect(() => {
    if (heartRate <= 0) return;
    const intervalMs = Math.max(300, Math.round(60000 / heartRate));
    const interval = setInterval(() => {
      setPulseScale(1.15);
      setTimeout(() => setPulseScale(1), 180);
    }, intervalMs);
    return () => clearInterval(interval);
  }, [heartRate]);

  // Animation du tracé cardiographique
  useEffect(() => {
    const timer = setInterval(() => {
      setPoints((prev) => {
        const next = [...prev.slice(1)];
        if (heartRate <= 0) {
          next.push(50); // Ligne plate (arrêt en diastole)
        } else {
          const t = Date.now() / (60000 / heartRate / (2 * Math.PI));
          // Forme d'onde cardiographique avec amplitude dépendante du tonus
          const isSymp = activeStimulation === 'sympathique';
          const amplitude = isSymp ? 42 : 28;
          const baseline = 50;
          const wave = Math.sin(t) > 0.85 ? baseline - amplitude : Math.sin(t) < -0.85 ? baseline + amplitude * 0.4 : baseline;
          next.push(wave);
        }
        return next;
      });
    }, 100);
    return () => clearInterval(timer);
  }, [heartRate, activeStimulation]);

  const handleStimulateVague = () => {
    setActiveStimulation('vague');
    setHeartRate(40);
    setStatusText('Stimulation du Nerf Vague (X) : Libération d\'Acétylcholine sur récepteurs muscariniques → Bradycardie marquée (effet chronotrope et dromotrope négatifs).');
  };

  const handleVagueArret = () => {
    setActiveStimulation('vague');
    setHeartRate(0);
    setStatusText('Stimulation vagale forte et prolongée : Arrêt cardiaque complet et réversible en DIASTOLE (relâchement musculaire total).');
  };

  const handleStimulateSymp = () => {
    setActiveStimulation('sympathique');
    setHeartRate(135);
    setStatusText('Stimulation des Nerfs Sympathiques : Libération de Noradrénaline sur récepteurs β₁ → Tachycardie et augmentation de la force contractile (chronotrope et inotrope positifs).');
  };

  const handleVagotomie = () => {
    setActiveStimulation('vagotomie');
    setHeartRate(105);
    setStatusText('Section des deux nerfs vagues (Double vagotomie) : Levée du frein vagal permanent → Le cœur s\'accélère spontanément jusqu\'à son rythme nodal intrinsèque (~105 bpm) !');
  };

  const handleSympathectomie = () => {
    setActiveStimulation('sympathectomie');
    setHeartRate(62);
    setStatusText('Section des nerfs sympathiques : Perte du faible tonus cardioaccélérateur de repos → Légère diminution de la fréquence cardiaque.');
  };

  const handleResetInnervation = () => {
    setActiveStimulation('none');
    setHeartRate(75);
    setStatusText('État de repos basal rétabli : FC = 75 bpm. Tonus cardiomodérateur vagal permanent équilibrant le rythme.');
  };

  // --- ÉTAT ONGLET 2 : OTTO LOEWI ---
  const [loewiStep, setLoewiStep] = useState<number>(0);
  const [loewiPlaying, setLoewiPlaying] = useState<boolean>(false);

  const startLoewiExperiment = () => {
    setLoewiPlaying(true);
    setLoewiStep(1); // Étape 1 : Cœur 1 et 2 normaux, stimulation du nerf vague 1
    setTimeout(() => {
      setLoewiStep(2); // Étape 2 : Cœur 1 ralentit et s'arrête
      setTimeout(() => {
        setLoewiStep(3); // Étape 3 : Perfusion transférée vers cœur 2
        setTimeout(() => {
          setLoewiStep(4); // Étape 4 : Cœur 2 ralentit et s'arrête à son tour !
          setLoewiPlaying(false);
        }, 3200);
      }, 2800);
    }, 2500);
  };

  const resetLoewi = () => {
    setLoewiStep(0);
    setLoewiPlaying(false);
  };

  // --- ÉTAT ONGLET 3 : PHARMACOLOGIE ---
  const [selectedDrug, setSelectedDrug] = useState<'none' | 'ach' | 'atropine' | 'noradrenaline' | 'propranolol' | 'adrenaline' | 'curare'>('none');

  const DRUG_DETAILS = {
    none: {
      name: 'Solution physiologique de Ringer (Témoin neutre)',
      badge: 'Contrôle',
      fc: 75,
      nature: 'Solution isotonique sans principe actif',
      mecanisme: 'Maintient l\'hydratation et l\'équilibre électrolytique (Na⁺, K⁺, Ca²⁺) sans modifier la fréquence cardiaque de repos.',
      cardiogramme: 'Tracé sinusal régulier à 75 bpm avec amplitude systolique normale.',
    },
    ach: {
      name: 'Acétylcholine (ACh - 10⁻⁶ M)',
      badge: 'Agoniste Muscarinique',
      fc: 35,
      nature: 'Neuromédiateur parasympathique',
      mecanisme: 'Se fixe sur les récepteurs muscariniques M₂ du nœud sinusal. Ouvre les canaux K⁺, hyperpolarise la membrane et freine la dépolarisation spontanée.',
      cardiogramme: 'Bradycardie sévère immédiate, espacement des cycles, puis arrêt réversible en diastole.',
    },
    atropine: {
      name: 'Atropine (10⁻⁵ M)',
      badge: 'Antagoniste Muscarinique',
      fc: 110,
      nature: 'Alcaloïde extrait de la belladone (parasympatholytique)',
      mecanisme: 'Bloque compétitivement les récepteurs muscariniques. Empêche l\'acétylcholine de se fixer et lève le frein vagal permanent.',
      cardiogramme: 'Tachycardie nette et insensibilité totale à toute stimulation électrique ultérieure du nerf vague.',
    },
    noradrenaline: {
      name: 'Noradrénaline (NA)',
      badge: 'Agoniste Adrénergique β₁',
      fc: 130,
      nature: 'Neuromédiateur orthosympathique',
      mecanisme: 'Active les récepteurs β₁-adrénergiques myocardiques, augmente l\'AMPc intracellulaire et stimule l\'entrée massive d\'ions calcium Ca²⁺.',
      cardiogramme: 'Tachycardie marquée avec doublement de l\'amplitude des contractions ventriculaires (inotrope positif puissant).',
    },
    propranolol: {
      name: 'Propranolol (Bêtabloquant)',
      badge: 'Antagoniste Adrénergique β₁',
      fc: 58,
      nature: 'Médicament cardiovasculaire (bêtabloquant)',
      mecanisme: 'Bloque spécifiquement les récepteurs β₁ myocardiques. Empêche la noradrénaline et l\'adrénaline de se fixer.',
      cardiogramme: 'Ralentissement modéré du rythme de repos et blocage total de toute accélération cardiaque en réponse au stress ou à l\'effort.',
    },
    adrenaline: {
      name: 'Adrénaline Médullosurrénalienne',
      badge: 'Hormone d\'Urgence',
      fc: 145,
      nature: 'Catécholamine sécrétée par la glande médullo-surrénale',
      mecanisme: 'Action hormonale systémique puissante sur les récepteurs β₁ du nœud sinusal et des deux ventricules.',
      cardiogramme: 'Tachycardie intense, raccourcissement de la révolution cardiaque et augmentation colossale du débit cardiaque (DC > 15 L/min).',
    },
    curare: {
      name: 'Curare (d-tubocurarine)',
      badge: 'Bloquant Nicotinique',
      fc: 75,
      nature: 'Poison paralysant des muscles squelettiques',
      mecanisme: 'Bloque les récepteurs nicotiniques des plaques motrices des muscles striés squelettiques. Sans action sur les récepteurs muscariniques du cœur !',
      cardiogramme: 'AUCUN CHANGEMENT du tracé cardiaque ! Démontre la spécificité des récepteurs cardiaques muscariniques par rapport aux récepteurs musculaires nicotiniques.',
    },
  };

  const currentDrug = DRUG_DETAILS[selectedDrug];

  return (
    <div className="w-full bg-white border border-slate-200 rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden mb-8">
      {/* En-tête */}
      <div className="px-5 py-6 sm:px-8 sm:py-7 bg-gradient-to-r from-sky-50 via-white to-indigo-50 border-b border-slate-200/80">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-sky-100 text-sky-800 border border-sky-200">
            LABORATOIRE INTERACTIF SVT
          </span>
          <span className="text-xs font-bold text-slate-500">Terminales S2 &bull; Physiologie Cardiovasculaire</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Simulateur d&apos;Innervation & <span className="text-sky-600">Régulation Cardiaque</span>
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Expérimentez en direct la stimulation des nerfs vagues et sympathiques, revivez l&apos;expérience historique d&apos;Otto Loewi (1921) et testez l&apos;effet des drogues pharmacologiques sur le myocarde.
        </p>

        {/* Navigation des 3 Onglets Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-5">
          {[
            { id: 'innervation', label: '1. Double Innervation & Tracé' },
            { id: 'loewi', label: '2. Expérience Loewi (1921)' },
            { id: 'pharmaco', label: '3. Banc Pharmacologique' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as LabTab)}
              className={`px-3 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all text-center border ${
                activeTab === tab.id
                  ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ONGLET 1 : INNERVATION CARDIAQUE & CARDIOGRAMME DYNAMIQUE */}
      {/* ========================================================================= */}
      {activeTab === 'innervation' && (
        <div className="p-5 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Visualisation Anatomique & Cœur Battant (7 colonnes) */}
            <div className="lg:col-span-7 bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-6 flex flex-col items-center justify-between">
              <div className="w-full flex items-center justify-between mb-2">
                <span className="text-xs font-black text-slate-700 uppercase tracking-wider">
                  DISPOSITIF EXPÉRIMENTAL D&apos;INNERVATION
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                  FC : <strong className="text-sky-700 font-black">{heartRate} bpm</strong>
                </span>
              </div>

              {/* Schéma anatomique SVG interactif */}
              <div className="relative w-full max-w-md h-64 sm:h-72 my-2 flex items-center justify-center">
                <svg viewBox="0 0 400 300" className="w-full h-full">
                  {/* Centres nerveux en haut */}
                  {/* Bulbe rachidien (Parasympathique) */}
                  <rect x="50" y="20" width="120" height="40" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
                  <text x="110" y="38" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0369a1">Bulbe Rachidien</text>
                  <text x="110" y="50" textAnchor="middle" fontSize="8" fill="#0284c7">Centre cardio-modérateur (X)</text>

                  {/* Moelle épinière thoracique (Sympathique) */}
                  <rect x="230" y="20" width="120" height="40" rx="8" fill="#ffe4e6" stroke="#e11d48" strokeWidth="2" />
                  <text x="290" y="38" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#be123c">Moelle Thoracique</text>
                  <text x="290" y="50" textAnchor="middle" fontSize="8" fill="#e11d48">Centres D1 - D5 (Sympathique)</text>

                  {/* Nerf Vague (Bleu) */}
                  <path
                    d="M 110 60 C 110 110, 150 140, 175 180"
                    fill="none"
                    stroke={activeStimulation === 'vague' ? '#0284c7' : '#94a3b8'}
                    strokeWidth={activeStimulation === 'vague' ? 4 : 2}
                    strokeDasharray={activeStimulation === 'vague' ? '4 2' : 'none'}
                    className={activeStimulation === 'vague' ? 'animate-pulse' : ''}
                  />
                  {activeStimulation === 'vagotomie' && (
                    <text x="125" y="110" fontSize="14" fill="#dc2626" fontWeight="bold">✂ Section</text>
                  )}
                  <text x="100" y="115" fontSize="9" fontWeight="bold" fill="#0369a1">Nerf Vague (X)</text>
                  <text x="100" y="127" fontSize="8" fill="#0284c7">Acétylcholine</text>

                  {/* Nerf Sympathique (Rouge) avec ganglion stellaire */}
                  <path
                    d="M 290 60 L 290 95"
                    fill="none"
                    stroke={activeStimulation === 'sympathique' ? '#e11d48' : '#94a3b8'}
                    strokeWidth={activeStimulation === 'sympathique' ? 4 : 2}
                  />
                  {/* Ganglion stellaire */}
                  <circle cx="290" cy="105" r="9" fill="#fecdd3" stroke="#e11d48" strokeWidth="2" />
                  <text x="305" y="108" fontSize="8" fontWeight="bold" fill="#9f1239">G. stellaire</text>

                  <path
                    d="M 290 114 C 290 145, 245 160, 220 185"
                    fill="none"
                    stroke={activeStimulation === 'sympathique' ? '#e11d48' : '#94a3b8'}
                    strokeWidth={activeStimulation === 'sympathique' ? 4 : 2}
                    strokeDasharray={activeStimulation === 'sympathique' ? '4 2' : 'none'}
                    className={activeStimulation === 'sympathique' ? 'animate-pulse' : ''}
                  />
                  {activeStimulation === 'sympathectomie' && (
                    <text x="250" y="145" fontSize="14" fill="#dc2626" fontWeight="bold">✂ Section</text>
                  )}
                  <text x="285" y="140" fontSize="9" fontWeight="bold" fill="#be123c">Nerf Sympathique</text>
                  <text x="285" y="152" fontSize="8" fill="#e11d48">Noradrénaline</text>

                  {/* Cœur au centre en bas */}
                  <g transform={`translate(200, 225) scale(${pulseScale * 0.9}) translate(-200, -225)`}>
                    {/* Silhouette de cœur réaliste */}
                    <path
                      d="M 200 270 C 140 230, 140 180, 175 175 C 195 170, 200 190, 200 190 C 200 190, 205 170, 225 175 C 260 180, 260 230, 200 270 Z"
                      fill={heartRate > 0 ? (activeStimulation === 'sympathique' ? '#f43f5e' : '#e11d48') : '#94a3b8'}
                      stroke="#881337"
                      strokeWidth="2.5"
                    />
                    {/* Tissu nodal sinusal */}
                    <circle cx="178" cy="188" r="4.5" fill="#facc15" stroke="#ca8a04" strokeWidth="1.5" />
                    <text x="150" y="191" fontSize="7" fontWeight="bold" fill="#854d0e">Nœud S.</text>
                    {/* Nœud septal */}
                    <circle cx="196" cy="205" r="3.5" fill="#facc15" stroke="#ca8a04" strokeWidth="1" />
                  </g>
                </svg>
              </div>

              {/* Statut explicatif */}
              <div className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs text-slate-700 leading-relaxed">
                <strong className="text-slate-900 font-bold">Observation en direct :</strong> {statusText}
              </div>
            </div>

            {/* Tracé cardiographique & Commandes (5 colonnes) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              {/* Écran d'enregistrement Cardiogramme */}
              <div className="bg-slate-900 rounded-2xl p-4 text-emerald-400 font-mono shadow-inner border border-slate-800">
                <div className="flex items-center justify-between text-[11px] text-slate-400 border-b border-slate-800 pb-2 mb-2">
                  <span>CARDIOGRAMME ENREGISTRÉ</span>
                  <span className="text-emerald-400 font-bold">{heartRate > 0 ? `${heartRate} BPM` : 'ARRÊT (0 BPM)'}</span>
                </div>

                {/* Graphique SVG du cardiogramme */}
                <div className="h-28 w-full flex items-center justify-center bg-slate-950/60 rounded-lg overflow-hidden p-1 border border-slate-800/80">
                  <svg viewBox="0 0 100 100" className="w-full h-full preserve-3d" preserveAspectRatio="none">
                    <polyline
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={points.map((y, i) => `${i * 11},${y}`).join(' ')}
                    />
                  </svg>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2">
                  <span>Débit Cardiaque : <strong className="text-white font-bold">{((heartRate * 70) / 1000).toFixed(1)} L/min</strong></span>
                  <span>État : <strong className="text-emerald-300 font-bold">{heartRate === 0 ? 'Arrêt diastolique' : heartRate > 100 ? 'Tachycardie' : heartRate < 60 ? 'Bradycardie' : 'Rythme normal'}</strong></span>
                </div>
              </div>

              {/* Boutons d'expérimentation */}
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  INTERVENTIONS EXPÉRIMENTALES DU BAC S2
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={handleStimulateVague}
                    className="p-2.5 rounded-xl text-left bg-sky-50 border border-sky-300 hover:bg-sky-100 text-sky-900 text-xs font-bold transition-all"
                  >
                    Stimuler Nerf Vague (X)
                    <span className="block text-[10px] font-normal text-sky-700">Bradycardie (ACh)</span>
                  </button>

                  <button
                    onClick={handleVagueArret}
                    className="p-2.5 rounded-xl text-left bg-sky-100 border border-sky-400 hover:bg-sky-200 text-sky-950 text-xs font-bold transition-all"
                  >
                    Stimulation Vagale Forte
                    <span className="block text-[10px] font-normal text-sky-800">Arrêt en Diastole</span>
                  </button>

                  <button
                    onClick={handleStimulateSymp}
                    className="p-2.5 rounded-xl text-left bg-rose-50 border border-rose-300 hover:bg-rose-100 text-rose-900 text-xs font-bold transition-all"
                  >
                    Stimuler Sympathique
                    <span className="block text-[10px] font-normal text-rose-700">Tachycardie (Noradrénaline)</span>
                  </button>

                  <button
                    onClick={handleVagotomie}
                    className="p-2.5 rounded-xl text-left bg-amber-50 border border-amber-300 hover:bg-amber-100 text-amber-900 text-xs font-bold transition-all"
                  >
                    Double Vagotomie ✂
                    <span className="block text-[10px] font-normal text-amber-700">Levée du frein (105 bpm)</span>
                  </button>

                  <button
                    onClick={handleSympathectomie}
                    className="p-2.5 rounded-xl text-left bg-slate-100 border border-slate-300 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all"
                  >
                    Section Sympathique ✂
                    <span className="block text-[10px] font-normal text-slate-600">Baisse modérée (62 bpm)</span>
                  </button>

                  <button
                    onClick={handleResetInnervation}
                    className="p-2.5 rounded-xl text-left bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 text-emerald-900 text-xs font-bold transition-all"
                  >
                    Réinitialiser (Repos)
                    <span className="block text-[10px] font-normal text-emerald-700">Équilibre basal (75 bpm)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ONGLET 2 : EXPÉRIENCE D'OTTO LOEWI (1921) */}
      {/* ========================================================================= */}
      {activeTab === 'loewi' && (
        <div className="p-5 sm:p-8 space-y-6">
          <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5">
            <h3 className="text-base font-black text-emerald-900 mb-1">
              Protocole Historique d&apos;Otto Loewi (Prix Nobel 1936)
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Deux cœurs de grenouille isolés sont maintenus en vie par une perfusion de liquide de Ringer. Le liquide baignant le <strong>Cœur 1 (avec nerf vague intact)</strong> s&apos;écoule par une tubulure vers le <strong>Cœur 2 (totalement dénervé)</strong>.
            </p>
          </div>

          {/* Animation interactive Loewi */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              {/* Cœur 1 (Donneur) */}
              <div className={`p-4 rounded-xl border-2 transition-all ${
                loewiStep >= 2 ? 'bg-sky-50 border-sky-300' : 'bg-white border-slate-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-slate-800">CŒUR 1 (Donneur)</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 border border-sky-200">
                    Nerf Vague Intact
                  </span>
                </div>
                <div className="h-32 flex flex-col items-center justify-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                    loewiStep === 1
                      ? 'bg-sky-200 ring-4 ring-sky-400 animate-pulse'
                      : loewiStep >= 2
                      ? 'bg-slate-300 text-slate-600'
                      : 'bg-rose-500 text-white animate-bounce'
                  }`}>
                    <span className="text-xl">❤️</span>
                  </div>
                  <p className="text-xs font-bold text-slate-800 mt-2">
                    {loewiStep === 1
                      ? '⚡ Stimulation électrique du Vague...'
                      : loewiStep >= 2
                      ? 'Arrêt en diastole (0 bpm)'
                      : 'Battement normal (60 bpm)'}
                  </p>
                </div>
              </div>

              {/* Tubulure de communication Desktop */}
              <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-white border border-slate-300 px-3 py-1.5 rounded-full shadow-sm text-[11px] font-bold text-slate-700">
                {loewiStep >= 3 ? '🟢 Transfert Acétylcholine...' : '💧 Perfusion Ringer'}
              </div>

              {/* Connecteur Mobile */}
              <div className="flex md:hidden justify-center items-center py-2 px-3 text-xs font-bold text-emerald-800 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                {loewiStep >= 3 ? '🟢 Canule : Transfert du liquide enrichi en Acétylcholine &darr;' : '💧 Canule : Perfusion de liquide de Ringer neutre &darr;'}
              </div>

              {/* Cœur 2 (Receveur dénervé) */}
              <div className={`p-4 rounded-xl border-2 transition-all ${
                loewiStep >= 4 ? 'bg-sky-50 border-sky-300' : 'bg-white border-slate-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black text-slate-800">CŒUR 2 (Receveur)</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    Dénervé (Sans nerf)
                  </span>
                </div>
                <div className="h-32 flex flex-col items-center justify-center">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
                    loewiStep >= 4
                      ? 'bg-slate-300 text-slate-600'
                      : 'bg-rose-500 text-white animate-bounce'
                  }`}>
                    <span className="text-xl">❤️</span>
                  </div>
                  <p className="text-xs font-bold text-slate-800 mt-2">
                    {loewiStep >= 4
                      ? 'Ralentit et s\'arrête à son tour !'
                      : loewiStep === 3
                      ? 'Attente du liquide de Ringer...'
                      : 'Battement autonome régulier (60 bpm)'}
                  </p>
                </div>
              </div>
            </div>

            {/* Barre de contrôle Loewi */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
              <div className="text-xs text-slate-700">
                {loewiStep === 0 && 'Cliquez pour déclencher la stimulation du Nerf Vague du Cœur 1.'}
                {loewiStep === 1 && '1/4 : Le nerf vague du cœur 1 reçoit des impulsions électriques.'}
                {loewiStep === 2 && '2/4 : Le cœur 1 ralentit et s\'arrête en diastole. Une substance soluble est sécrétée.'}
                {loewiStep === 3 && '3/4 : Le liquide physiologique de perfusion est acheminé vers le cœur 2.'}
                {loewiStep === 4 && '4/4 : Le cœur 2 s\'arrête sans aucune stimulation électrique ! Découverte de l\'Acétylcholine.'}
              </div>

              <div className="flex gap-2">
                <button
                  disabled={loewiPlaying}
                  onClick={startLoewiExperiment}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
                >
                  {loewiPlaying ? 'Expérience en cours...' : 'Lancer l\'Expérience'}
                </button>
                <button
                  onClick={resetLoewi}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold transition-all"
                >
                  Réinitialiser
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* ONGLET 3 : BANC D'ESSAI PHARMACOLOGIQUE & HORMONAL */}
      {/* ========================================================================= */}
      {activeTab === 'pharmaco' && (
        <div className="p-5 sm:p-8 space-y-6">
          <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 sm:p-5">
            <h3 className="text-base font-black text-purple-900 mb-1">
              Banc d&apos;Essai Moléculaire : Agonistes, Antagonistes & Hormones
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Sélectionnez une substance chimique ou hormonale pour l&apos;injecter dans le liquide de perfusion du cœur isolé et observez la réponse pharmacologique immédiate du myocarde.
            </p>
          </div>

          {/* Grille de sélection des drogues */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2">
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
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  selectedDrug === drug.id
                    ? 'bg-purple-600 text-white border-purple-600 shadow-md ring-2 ring-purple-300'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <span className="text-[10px] font-bold opacity-80">{drug.tag}</span>
                <p className="text-xs font-black mt-1">{drug.label}</p>
              </button>
            ))}
          </div>

          {/* Fiche de résultat pharmacologique */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                  {currentDrug.badge}
                </span>
                <h4 className="text-lg font-black text-slate-900 mt-1">{currentDrug.name}</h4>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-500 font-bold block">Fréquence Cardiaque</span>
                <span className="text-xl font-black text-purple-700">{currentDrug.fc} bpm</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200">
                <p className="font-bold text-slate-900 mb-1">Mécanisme Moléculaire & Récepteurs :</p>
                <p className="text-slate-600 leading-relaxed">{currentDrug.mecanisme}</p>
              </div>

              <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200">
                <p className="font-bold text-slate-900 mb-1">Effet sur le Cardiogramme :</p>
                <p className="text-slate-600 leading-relaxed">{currentDrug.cardiogramme}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

