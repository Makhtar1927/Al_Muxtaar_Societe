'use client';

import React, { useState, useEffect } from 'react';
import MathRenderer from '@/components/course/math-renderer';

type SimulationMode = 'oscilloscope' | 'cytologie' | 'comparateur';
type PreparationType = 'fibre_isolee' | 'nerf_entier';
type ToxinType = 'none' | 'ttx' | 'tea' | 'ouabaine';
type ConductionMode = 'saltatoire' | 'continue';

export default function B1TissuNerveuxInteractiveLab() {
  const [activeTab, setActiveTab] = useState<SimulationMode>('oscilloscope');

  // État du simulateur Oscilloscope
  const [prepType, setPrepType] = useState<PreparationType>('fibre_isolee');
  const [stimIntensity, setStimIntensity] = useState<number>(35); // mV (seuil = 20 mV)
  const [electrodeDist, setElectrodeDist] = useState<number>(4); // cm
  const [selectedToxin, setSelectedToxin] = useState<ToxinType>('none');
  const [isStimulating, setIsStimulating] = useState<boolean>(false);
  const [traceProgress, setTraceProgress] = useState<number>(0);
  const [measuredAmplitude, setMeasuredAmplitude] = useState<number>(0);
  const [measuredVelocity, setMeasuredVelocity] = useState<number>(50); // m/s
  const [measuredLatency, setMeasuredLatency] = useState<number>(0.8); // ms
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);

  // État du schéma cytologique
  const [selectedOrganelle, setSelectedOrganelle] = useState<string>('soma');
  const [isImpulseActive, setIsImpulseActive] = useState<boolean>(false);
  const [conductionType, setConductionType] = useState<ConductionMode>('saltatoire');

  // Animation de la stimulation sur oscilloscope
  useEffect(() => {
    let animId: number;
    if (isStimulating) {
      setTraceProgress(0);
      const startTime = performance.now();
      const duration = 1200; // ms pour tracer l'écran complet

      const animateTrace = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        setTraceProgress(progress);

        if (progress < 1) {
          animId = requestAnimationFrame(animateTrace);
        } else {
          setIsStimulating(false);
        }
      };

      animId = requestAnimationFrame(animateTrace);
    }
    return () => cancelAnimationFrame(animId);
  }, [isStimulating]);

  // Calculs biophysiques
  useEffect(() => {
    const threshold = 20; // seuil liminaire 20 mV
    const velocity = prepType === 'fibre_isolee' ? (conductionType === 'saltatoire' ? 50 : 2) : 40; // m/s
    const latencyMs = (electrodeDist * 0.01 / velocity) * 1000; // ms
    setMeasuredVelocity(velocity);
    setMeasuredLatency(parseFloat(latencyMs.toFixed(2)));

    if (prepType === 'fibre_isolee') {
      // Loi du tout ou rien
      if (selectedToxin === 'ttx') {
        setMeasuredAmplitude(0);
      } else if (stimIntensity < threshold) {
        setMeasuredAmplitude(parseFloat((stimIntensity * 0.25).toFixed(1))); // réponse électrotonique
      } else {
        setMeasuredAmplitude(100); // PA maximal constant (-70 mV -> +30 mV = 100 mV)
      }
    } else {
      // Nerf entier : recrutement progressif
      if (selectedToxin === 'ttx') {
        setMeasuredAmplitude(0);
      } else if (stimIntensity < 10) {
        setMeasuredAmplitude(0);
      } else {
        // Courbe sigmoïde de recrutement
        const maxAmp = 85;
        const fraction = Math.min(Math.max((stimIntensity - 10) / 60, 0), 1);
        const recruited = Math.sin((fraction * Math.PI) / 2) * maxAmp;
        setMeasuredAmplitude(parseFloat(recruited.toFixed(1)));
      }
    }
  }, [prepType, stimIntensity, electrodeDist, selectedToxin, conductionType]);

  const handleTriggerStimulation = () => {
    setIsStimulating(true);
    setIsImpulseActive(true);
    setTimeout(() => setIsImpulseActive(false), 2000);
  };

  // Points du tracé oscillographique
  const generateOscilloPath = () => {
    const baseY = 195; // -70 mV
    const peakY = 45;  // +30 mV
    const hyperY = 210; // -80 mV

    const threshold = 20;
    const isOverThreshold = stimIntensity >= threshold;

    let points: [number, number][] = [];

    // Ligne de repos avant choc
    points.push([0, baseY]);
    points.push([50, baseY]);

    // Artéfact de stimulation
    const artAmp = Math.min(stimIntensity * 0.7, 35);
    points.push([52, baseY - artAmp]);
    points.push([56, baseY + artAmp * 0.4]);
    points.push([60, baseY]);

    // Temps de latence
    const latenceX = 60 + Math.min(electrodeDist * 18, 120);
    points.push([latenceX, baseY]);

    if (selectedToxin === 'ttx') {
      points.push([latenceX + 10, baseY]);
      points.push([480, baseY]);
    } else if (prepType === 'fibre_isolee' && !isOverThreshold) {
      const localH = stimIntensity * 0.8;
      points.push([latenceX + 15, baseY - localH]);
      points.push([latenceX + 35, baseY]);
      points.push([480, baseY]);
    } else if (selectedToxin === 'tea') {
      points.push([latenceX + 20, peakY]);
      points.push([latenceX + 60, peakY + 15]);
      points.push([latenceX + 150, baseY - 20]);
      points.push([480, baseY - 10]);
    } else if (prepType === 'fibre_isolee') {
      points.push([latenceX + 18, peakY]);
      points.push([latenceX + 38, baseY]);
      points.push([latenceX + 60, hyperY]);
      points.push([latenceX + 100, baseY]);
      points.push([480, baseY]);
    } else {
      const ampY = baseY - (measuredAmplitude / 85) * (baseY - peakY);
      points.push([latenceX + 25, ampY]);
      points.push([latenceX + 55, baseY]);
      points.push([latenceX + 85, baseY + (measuredAmplitude * 0.2)]);
      points.push([latenceX + 130, baseY]);
      points.push([480, baseY]);
    }

    const totalVisibleX = 480 * traceProgress;
    const visiblePoints = points.filter(([x]) => x <= totalVisibleX);

    if (visiblePoints.length < 2) {
      return `M 0,${baseY} L ${Math.max(totalVisibleX, 10)},${baseY}`;
    }

    let d = `M ${visiblePoints[0][0]},${visiblePoints[0][1]}`;
    for (let i = 1; i < visiblePoints.length; i++) {
      d += ` L ${visiblePoints[i][0]},${visiblePoints[i][1]}`;
    }
    return d;
  };

  const ORGANELLES_DATA: Record<string, { title: string; subtitle: string; role: string; bacImportance: string; wolof: string }> = {
    soma: {
      title: 'Péricaryon (Soma ou Corps Cellulaire)',
      subtitle: 'Centre trophique et biosynthétique du neurone',
      role: 'Contient le noyau volumineux, les organites cellulaires et les corps de Nissl. Il intègre les signaux électriques reçus par les dendrites et assure la synthèse de tous les constituants cellulaires nécessaires à la survie du neurone.',
      bacImportance: 'Toute section séparant un prolongement du soma entraîne la dégénérescence wallérienne de la partie isolée, démontrant le rôle trophique vital du péricaryon.',
      wolof: 'Soma bi mooy xolou cellule bi : fii la dundu ak ñam bi yépp di génne. Bu axone bi daggé ba fastek soma bi, dafay dee ndax amul centre de vie.',
    },
    nissl: {
      title: 'Corps de Nissl (Ergastoplasme ribosomique)',
      subtitle: 'Amas denses de réticulum endoplasmique granuleux',
      role: 'Colorables au bleu de méthylène ou violet de crésyle. Hautement spécialisés dans la synthèse protéique massive (neurotransmetteurs, canaux ioniques, tubuline). Présents dans le soma et la base des dendrites.',
      bacImportance: 'Règle d’or du Bac S2 : les corps de Nissl sont rigoureusement ABSENTS du cône d’implantation et de l’axone.',
      wolof: 'Corps de Nissl yi ñooy usine à protéines yi : ñoo ciy liggéey neuro-transmetteurs yi, waaye amuñu mukk ci biir axone bi.',
    },
    cone: {
      title: 'Cône d’Implantation (Zone Gâchette)',
      subtitle: 'Site d’initiation du potentiel d’action',
      role: 'Région conique de transition entre le soma et l’axone. Présente la plus forte densité membranaire en canaux sodium voltage-dépendants (CVD-Na+).',
      bacImportance: 'C’est là que s’effectue la sommation spatio-temporelle des potentiels postsynaptiques. Si le seuil critique (-55 mV) est franchi, le PA naît ici et se propage.',
      wolof: 'Zone gâchette bi mooy déclencheur bi : fi lañuy kalkulé ndax dooley courant bi egna seuil bi ba mëna déclenché Potentiel d’Action.',
    },
    myeline: {
      title: 'Gaine de Myéline & Cellules de Schwann',
      subtitle: 'Manchon lipidique isolant électrique plurilamellaire',
      role: 'Formée par l’enroulement spiralé de la membrane plasmique des cellules de Schwann (dans le SNP) ou des oligodendrocytes (dans le SNC). Riche en sphingomyéline, elle isole électriquement l’axone.',
      bacImportance: 'Elle supprime la fuite capacitive de courant et force l’influx à se propager par conduction saltatoire, augmentant la vitesse jusqu’à 100 fois par rapport aux fibres nues.',
      wolof: 'Myéline bi dafa melni plastique bi ñuy gante fil électrique ngir courant bi bumu sance : dafay tax xibaar bi di tëb di gaaw.',
    },
    ranvier: {
      title: 'Étranglements (Nœuds) de Ranvier',
      subtitle: 'Zones de régénération active du signal électrique',
      role: 'Interruptions périodiques de la gaine de myéline (tous les 1 à 2 mm). La membrane axonale y est nue et concentre une densité colossale de canaux voltage-dépendants (CVD-Na+ et CVD-K+).',
      bacImportance: 'Seul endroit où peuvent naître les potentiels d’action dans une fibre myélinisée. C’est le support exclusif de la conduction saltatoire d’un nœud à l’autre.',
      wolof: 'Nœuds de Ranvier yi ñooy escaliers yi : courant bi fii rekk lay mëna dugge ak génn, dafay tëb nœud ba nœud.',
    },
    boutons: {
      title: 'Arborisation Terminale & Boutons Synaptiques',
      subtitle: 'Pôle émetteur chimique de l’information',
      role: 'Extrémité distale ramifiée de l’axone. Chaque renflement (bouton terminal) contient des vésicules remplies de neurotransmetteurs (acétylcholine, glutamate, GABA) prêtes pour l’exocytose.',
      bacImportance: 'Transforme le signal électrique (codé en fréquence de PA) en un signal chimique (codé en concentration de neurotransmetteur).',
      wolof: 'Boutons synaptiques yi ñooy kër neurotransmetteurs yi : bu courant bi eggee, dañuy sotti messagers chimiques yi ci neurone bi toftal.',
    },
  };

  return (
    <section className="bg-white rounded-3xl border border-emerald-900/10 shadow-sm overflow-hidden my-6 sm:my-8 w-full max-w-full">
      {/* En-tête sobre et médical */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 p-4 sm:p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-mono font-bold">
              LAB-B1.2
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider font-mono font-bold px-2.5 py-0.5 rounded bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                  Laboratoire Virtuel • Électrophysiologie
                </span>
                <span className="text-[11px] text-emerald-200/70 font-medium">Simulation Temps Réel</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-white mt-1 leading-snug">
                Oscilloscope Cathodique, Potentiels Bioélectriques &amp; Cytologie
              </h2>
            </div>
          </div>

          {/* Navigation par onglets adaptée aux mobiles */}
          <div className="flex flex-wrap items-center gap-1.5 bg-black/30 p-1.5 rounded-2xl border border-white/10 text-xs font-bold w-full sm:w-auto">
            <button
              onClick={() => setActiveTab('oscilloscope')}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-xl transition-all text-center touch-manipulation ${
                activeTab === 'oscilloscope'
                  ? 'bg-emerald-500 text-white font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Oscilloscope
            </button>
            <button
              onClick={() => setActiveTab('cytologie')}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-xl transition-all text-center touch-manipulation ${
                activeTab === 'cytologie'
                  ? 'bg-emerald-500 text-white font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Neurone &amp; Myéline
            </button>
            <button
              onClick={() => setActiveTab('comparateur')}
              className={`flex-1 sm:flex-none px-3 py-1.5 rounded-xl transition-all text-center touch-manipulation ${
                activeTab === 'comparateur'
                  ? 'bg-emerald-500 text-white font-bold shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Fibre vs Nerf
            </button>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* ONGLET 1 : OSCILLOSCOPE CATHODIQUE                                  */}
      {/* ==================================================================== */}
      {activeTab === 'oscilloscope' && (
        <div className="p-3.5 sm:p-6 lg:p-7 space-y-5 bg-slate-50/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Colonne gauche : Pupitre de Commande */}
            <div className="lg:col-span-5 space-y-4 bg-white p-4 sm:p-5 rounded-2xl border border-emerald-900/10 shadow-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-emerald-800">
                  Pupitre de Commande &amp; Électrodes
                </span>
                <span className="text-[10px] font-mono text-slate-400">Canal A</span>
              </div>

              {/* Type de préparation biologique */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 block">
                  Préparation Biologique :
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPrepType('fibre_isolee')}
                    className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition-all text-center touch-manipulation ${
                      prepType === 'fibre_isolee'
                        ? 'bg-emerald-700 text-white border-emerald-800 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-500'
                    }`}
                  >
                    Fibre Isolée (Axone)
                  </button>
                  <button
                    onClick={() => setPrepType('nerf_entier')}
                    className={`py-2 px-2.5 rounded-xl border text-xs font-bold transition-all text-center touch-manipulation ${
                      prepType === 'nerf_entier'
                        ? 'bg-emerald-700 text-white border-emerald-800 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-500'
                    }`}
                  >
                    Nerf Sciatique Entier
                  </button>
                </div>
              </div>

              {/* Curseur intensité de stimulation */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">
                    Intensité de Stimulation (I) :
                  </span>
                  <span className="font-mono font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {stimIntensity} mV
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={stimIntensity}
                  onChange={(e) => setStimIntensity(parseInt(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-bold">
                  <span>0 (Infraliminaire)</span>
                  <span className="text-amber-700 font-mono">Seuil = 20 mV</span>
                  <span>100 mV (Max)</span>
                </div>
              </div>

              {/* Distance électrodes réceptrices d */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-bold text-slate-800">
                    Distance S1-S2 / R1-R2 (d) :
                  </span>
                  <span className="font-mono font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {electrodeDist} cm ({electrodeDist * 10} mm)
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="8"
                  step="0.5"
                  value={electrodeDist}
                  onChange={(e) => setElectrodeDist(parseFloat(e.target.value))}
                  className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                />
              </div>

              {/* Neurotoxines sélectives */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 block">
                  Agent Pharmacologique (Neurotoxine) :
                </label>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
                  <button
                    onClick={() => setSelectedToxin('none')}
                    className={`py-2 px-2 rounded-xl border text-center transition-all touch-manipulation ${
                      selectedToxin === 'none'
                        ? 'bg-slate-900 text-white border-slate-950 shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200'
                    }`}
                  >
                    Aucun (Contrôle)
                  </button>
                  <button
                    onClick={() => setSelectedToxin('ttx')}
                    className={`py-2 px-2 rounded-xl border text-center transition-all touch-manipulation ${
                      selectedToxin === 'ttx'
                        ? 'bg-rose-700 text-white border-rose-800 shadow-xs'
                        : 'bg-rose-50 text-rose-800 border-rose-200'
                    }`}
                  >
                    + TTX (Bloque Na+)
                  </button>
                  <button
                    onClick={() => setSelectedToxin('tea')}
                    className={`py-2 px-2 rounded-xl border text-center transition-all touch-manipulation ${
                      selectedToxin === 'tea'
                        ? 'bg-amber-700 text-white border-amber-800 shadow-xs'
                        : 'bg-amber-50 text-amber-800 border-amber-200'
                    }`}
                  >
                    + TEA (Bloque K+)
                  </button>
                  <button
                    onClick={() => setSelectedToxin('ouabaine')}
                    className={`py-2 px-2 rounded-xl border text-center transition-all touch-manipulation ${
                      selectedToxin === 'ouabaine'
                        ? 'bg-purple-700 text-white border-purple-800 shadow-xs'
                        : 'bg-purple-50 text-purple-800 border-purple-200'
                    }`}
                  >
                    + Ouabaïne (Pompe)
                  </button>
                </div>
              </div>

              {/* Bouton de déclenchement pleine largeur sans icône */}
              <button
                onClick={handleTriggerStimulation}
                disabled={isStimulating}
                className={`w-full py-3.5 px-4 rounded-2xl text-xs font-mono font-black uppercase tracking-wider transition-all shadow-md touch-manipulation ${
                  isStimulating
                    ? 'bg-slate-700 text-slate-300 cursor-not-allowed'
                    : 'bg-emerald-600 hover:bg-emerald-500 text-white active:scale-98'
                }`}
              >
                {isStimulating ? 'BALAYAGE CATHODIQUE EN COURS...' : 'DÉCLENCHER DÉCHARGE ÉLECTRIQUE (S1-S2)'}
              </button>
            </div>

            {/* Colonne droite : Écran cathodique et Télémétrie */}
            <div className="lg:col-span-7 space-y-4">
              <div className="rounded-2xl bg-slate-950 p-3 sm:p-4 border-2 border-slate-800 shadow-inner overflow-hidden">
                <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-emerald-400/90 pb-2 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>POTENTIEL MEMBRANAIRE (Vm)</span>
                  </div>
                  <span>0.5 ms/div • 20 mV/div</span>
                </div>

                {/* SVG Oscilloscope */}
                <div className="w-full aspect-[16/9] relative my-2 overflow-hidden">
                  <svg viewBox="0 0 500 260" className="w-full h-full select-none">
                    <defs>
                      <pattern id="oscGrid" width="25" height="25" patternUnits="userSpaceOnUse">
                        <path d="M 25 0 L 0 0 0 25" fill="none" stroke="rgba(16, 185, 129, 0.12)" strokeWidth="0.5" />
                      </pattern>
                      <pattern id="oscMainGrid" width="50" height="50" patternUnits="userSpaceOnUse">
                        <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(16, 185, 129, 0.28)" strokeWidth="1" />
                      </pattern>
                      <filter id="glowF" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="2.5" result="blur" />
                        <feMerge>
                          <feMergeNode in="blur" />
                          <feMergeNode in="SourceGraphic" />
                        </feMerge>
                      </filter>
                    </defs>

                    <rect width="500" height="260" fill="#020d0a" />
                    <rect width="500" height="260" fill="url(#oscGrid)" />
                    <rect width="500" height="260" fill="url(#oscMainGrid)" />

                    {/* Repères horizontaux de potentiel */}
                    <line x1="0" y1="45" x2="500" y2="45" stroke="rgba(16, 185, 129, 0.35)" strokeDasharray="3,3" />
                    <text x="8" y="42" fill="#34d399" fontSize="10" fontFamily="monospace" fontWeight="bold">+30 mV (Pic)</text>

                    <line x1="0" y1="90" x2="500" y2="90" stroke="rgba(16, 185, 129, 0.5)" strokeWidth="1" />
                    <text x="8" y="87" fill="#6ee7b7" fontSize="10" fontFamily="monospace" fontWeight="bold">0 mV</text>

                    <line x1="0" y1="172.5" x2="500" y2="172.5" stroke="rgba(251, 191, 36, 0.4)" strokeDasharray="4,2" />
                    <text x="8" y="169" fill="#fbbf24" fontSize="9" fontFamily="monospace">Seuil critique : -55 mV</text>

                    <line x1="0" y1="195" x2="500" y2="195" stroke="rgba(52, 211, 153, 0.6)" strokeWidth="1.2" />
                    <text x="8" y="208" fill="#34d399" fontSize="10" fontFamily="monospace" fontWeight="bold">-70 mV (PR)</text>

                    <line x1="0" y1="210" x2="500" y2="210" stroke="rgba(16, 185, 129, 0.3)" strokeDasharray="2,2" />
                    <text x="8" y="222" fill="#10b981" fontSize="9" fontFamily="monospace">-80 mV</text>

                    {/* Tracé réel */}
                    <path
                      d={generateOscilloPath()}
                      fill="none"
                      stroke="#10b981"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      filter="url(#glowF)"
                    />

                    {isStimulating && (
                      <circle
                        cx={480 * traceProgress}
                        cy={195}
                        r="4"
                        fill="#6ee7b7"
                        filter="url(#glowF)"
                      />
                    )}

                    {traceProgress >= 0.9 && measuredAmplitude >= 80 && prepType === 'fibre_isolee' && (
                      <g className="text-[10px] font-sans">
                        <text x="135" y="78" fill="#34d399" fontSize="9" fontWeight="bold">↑ Dépolarisation</text>
                        <text x="180" y="128" fill="#6ee7b7" fontSize="9" fontWeight="bold">↓ Repolarisation</text>
                        <text x="210" y="242" fill="#a7f3d0" fontSize="8">Hyperpolarisation</text>
                      </g>
                    )}
                  </svg>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-400 pt-2 border-t border-slate-800">
                  <div className="flex flex-wrap items-center gap-3">
                    <span>PR = -70 mV</span>
                    <span className="text-emerald-400 font-bold">
                      AMPLITUDE = {measuredAmplitude} mV
                    </span>
                    <span>LATENCE = {measuredLatency} ms</span>
                  </div>
                  <div className="text-slate-300 text-[11px]">
                    RÉGIME : {stimIntensity < 20 ? 'INFRALIMINAIRE' : 'EFFICACE'}
                  </div>
                </div>
              </div>

              {/* 5 Phases au clic */}
              <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-3">
                <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block font-mono">
                  Détail Moléculaire des 5 Phases (Touchez pour afficher) :
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5 text-xs">
                  {[
                    { id: 'artefact', num: '1', name: 'Artéfact' },
                    { id: 'depolarisation', num: '2', name: 'Dépolarisation' },
                    { id: 'repolarisation', num: '3', name: 'Repolarisation' },
                    { id: 'hyperpolarisation', num: '4', name: 'Hyperpol.' },
                    { id: 'retour', num: '5', name: 'Restauration' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPhase(p.id)}
                      className={`p-2 rounded-xl border text-left transition-all touch-manipulation ${
                        selectedPhase === p.id
                          ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-emerald-400'
                      }`}
                    >
                      <span className="font-mono text-[9px] block opacity-70">PHASE {p.num}</span>
                      <span className="font-bold text-[11px] leading-tight block">{p.name}</span>
                    </button>
                  ))}
                </div>

                {selectedPhase && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-slate-800 animate-fadeIn">
                    {selectedPhase === 'artefact' && (
                      <p>
                        <strong>Artéfact de stimulation :</strong> Courte déviation instantanée due à la fuite physique directe de courant des électrodes de stimulation aux électrodes réceptrices ($t = 0$).
                      </p>
                    )}
                    {selectedPhase === 'depolarisation' && (
                      <p>
                        <strong>Dépolarisation active (-70 mV à +30 mV) :</strong> L’atteinte du seuil déclenche l’ouverture foudroyante des CVD-Na+. Les ions Na+ s’engouffrent passivement dans la cellule selon leur gradient électrochimique (flux entrant).
                      </p>
                    )}
                    {selectedPhase === 'repolarisation' && (
                      <p>
                        <strong>Repolarisation (+30 mV à -70 mV) :</strong> Inactivation spontanée des CVD-Na+ et ouverture plus lente des CVD-K+. Les ions K+ sortent massivement de l’axone selon leur gradient électrochimique (flux sortant).
                      </p>
                    )}
                    {selectedPhase === 'hyperpolarisation' && (
                      <p>
                        <strong>Hyperpolarisation transitoire (-80 mV) :</strong> La fermeture retardée et lente des CVD-K+ prolonge la sortie d’ions K+ au-delà du potentiel de repos avant fermeture complète.
                      </p>
                    )}
                    {selectedPhase === 'retour' && (
                      <p>
                        <strong>Restauration de l’état initial :</strong> La pompe Na+/K+ ATPase expulse les 3 ions Na+ entrés et réabsorbe les 2 ions K+ sortis avec hydrolyse d’ATP, rétablissant les gradients de repos.
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* ONGLET 2 : CYTOLOGIE DU NEURONE MULTIPOLAIRE                        */}
      {/* ==================================================================== */}
      {activeTab === 'cytologie' && (
        <div className="p-3.5 sm:p-6 lg:p-7 space-y-5 bg-slate-50/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            {/* Visualiseur SVG du Motoneurone */}
            <div className="lg:col-span-8 bg-slate-950 p-4 sm:p-5 rounded-2xl border border-slate-800 shadow-inner">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-800 text-xs font-mono text-slate-300">
                <span className="text-emerald-400 font-bold">
                  CYTOLOGIE DU MOTONEURONE MYÉLINISÉ
                </span>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  <span className="text-slate-400 text-[10px]">Mode :</span>
                  <button
                    onClick={() => setConductionType(conductionType === 'saltatoire' ? 'continue' : 'saltatoire')}
                    className="px-2.5 py-1 rounded bg-emerald-900 hover:bg-emerald-800 text-emerald-200 text-[10px] font-bold border border-emerald-700 transition-colors touch-manipulation"
                  >
                    {conductionType === 'saltatoire' ? 'Conduction Saltatoire (Myéline)' : 'Conduction Continue (Amyélinique)'}
                  </button>
                </div>
              </div>

              {/* Boutons tactiles de sélection rapide pour smartphone */}
              <div className="flex flex-wrap items-center gap-1.5 pt-3 pb-1">
                {[
                  { id: 'soma', label: 'Soma (Corps)' },
                  { id: 'nissl', label: 'Corps de Nissl' },
                  { id: 'cone', label: 'Cône d’émergence' },
                  { id: 'myeline', label: 'Myéline' },
                  { id: 'ranvier', label: 'Nœuds de Ranvier' },
                  { id: 'boutons', label: 'Boutons synaptiques' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedOrganelle(item.id)}
                    className={`px-2.5 py-1.5 rounded-lg text-[10px] font-bold transition-all border touch-manipulation ${
                      selectedOrganelle === item.id
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Grand SVG du Neurone */}
              <div className="w-full aspect-[2/1] relative my-2 overflow-hidden">
                <svg viewBox="0 0 800 380" className="w-full h-full select-none">
                  <defs>
                    <radialGradient id="somaG" cx="30%" cy="35%" r="70%">
                      <stop offset="0%" stopColor="#047857" />
                      <stop offset="70%" stopColor="#064e3b" />
                      <stop offset="100%" stopColor="#022c22" />
                    </radialGradient>
                    <linearGradient id="myelinG" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#fef08a" />
                      <stop offset="50%" stopColor="#fde047" />
                      <stop offset="100%" stopColor="#ca8a04" />
                    </linearGradient>
                    <linearGradient id="axonG" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#34d399" />
                      <stop offset="100%" stopColor="#059669" />
                    </linearGradient>
                  </defs>

                  {/* Dendrites */}
                  <g stroke="#059669" strokeWidth="5" strokeLinecap="round" fill="none">
                    <path d="M 120 160 Q 60 110 30 70 M 60 110 Q 40 140 10 150 M 80 125 Q 50 80 20 50" />
                    <path d="M 150 140 Q 140 70 120 30 M 140 70 Q 170 40 180 20" />
                    <path d="M 110 220 Q 50 260 20 310 M 65 245 Q 40 280 10 270 M 50 260 Q 20 340 10 360" />
                    <path d="M 140 250 Q 150 320 130 360 M 145 290 Q 175 330 180 350" />
                  </g>

                  {/* Soma */}
                  <g className="cursor-pointer" onClick={() => setSelectedOrganelle('soma')}>
                    <polygon
                      points="100,180 120,150 150,140 190,160 210,190 190,230 140,250 110,220"
                      fill="url(#somaG)"
                      stroke={selectedOrganelle === 'soma' ? '#10b981' : '#047857'}
                      strokeWidth={selectedOrganelle === 'soma' ? '4' : '2'}
                    />
                    <circle cx="155" cy="190" r="28" fill="#d1fae5" opacity="0.85" stroke="#065f46" strokeWidth="2" />
                    <circle cx="155" cy="190" r="9" fill="#064e3b" />
                  </g>

                  {/* Corps de Nissl */}
                  <g className="cursor-pointer" onClick={() => setSelectedOrganelle('nissl')}>
                    <ellipse cx="125" cy="170" rx="6" ry="3" fill="#818cf8" />
                    <ellipse cx="135" cy="215" rx="7" ry="4" fill="#818cf8" />
                    <ellipse cx="175" cy="160" rx="5" ry="3" fill="#818cf8" />
                    <ellipse cx="175" cy="225" rx="6" ry="3.5" fill="#818cf8" />
                    <ellipse cx="130" cy="195" rx="4" ry="2" fill="#818cf8" />
                  </g>

                  {/* Cône d'émergence */}
                  <g className="cursor-pointer" onClick={() => setSelectedOrganelle('cone')}>
                    <path
                      d="M 210 180 L 250 188 L 250 196 L 210 204 Z"
                      fill="#059669"
                      stroke={selectedOrganelle === 'cone' ? '#34d399' : 'none'}
                      strokeWidth="2"
                    />
                  </g>

                  {/* Axone */}
                  <rect x="250" y="188" width="450" height="8" fill="url(#axonG)" />

                  {/* Gaines de Myéline */}
                  {[
                    { x: 260, w: 90, id: 'm1' },
                    { x: 370, w: 90, id: 'm2' },
                    { x: 480, w: 90, id: 'm3' },
                    { x: 590, w: 90, id: 'm4' },
                  ].map((m) => (
                    <g key={m.id} className="cursor-pointer" onClick={() => setSelectedOrganelle('myeline')}>
                      <rect x={m.x} y="172" width={m.w} height="16" rx="4" fill="url(#myelinG)" stroke="#854d0e" strokeWidth="1.5" />
                      <rect x={m.x} y="196" width={m.w} height="16" rx="4" fill="url(#myelinG)" stroke="#854d0e" strokeWidth="1.5" />
                      <ellipse cx={m.x + m.w / 2} cy="176" rx="12" ry="4" fill="#713f12" />
                    </g>
                  ))}

                  {/* Nœuds de Ranvier */}
                  {[355, 465, 575].map((rx, idx) => (
                    <g key={`rn-${idx}`} className="cursor-pointer" onClick={() => setSelectedOrganelle('ranvier')}>
                      <line x1={rx} y1="172" x2={rx} y2="212" stroke="#34d399" strokeWidth="3" />
                      <circle cx={rx} cy="192" r="5" fill="#10b981" opacity="0.6" />
                    </g>
                  ))}

                  {/* Boutons synaptiques */}
                  <g className="cursor-pointer" stroke="#059669" strokeWidth="3" strokeLinecap="round" fill="none" onClick={() => setSelectedOrganelle('boutons')}>
                    <path d="M 685 192 Q 720 150 760 120" />
                    <path d="M 685 192 Q 730 180 770 170" />
                    <path d="M 685 192 Q 730 210 770 220" />
                    <path d="M 685 192 Q 720 240 760 270" />
                    <circle cx="760" cy="120" r="7" fill="#047857" />
                    <circle cx="770" cy="170" r="7" fill="#047857" />
                    <circle cx="770" cy="220" r="7" fill="#047857" />
                    <circle cx="760" cy="270" r="7" fill="#047857" />
                  </g>

                  {/* Animation saltatoire */}
                  {isImpulseActive && conductionType === 'saltatoire' && (
                    <g>
                      <path
                        d="M 210 192 Q 285 140 355 192 Q 410 140 465 192 Q 520 140 575 192 Q 630 140 685 192"
                        fill="none"
                        stroke="#fbbf24"
                        strokeWidth="3.5"
                        strokeDasharray="8,6"
                        className="animate-pulse"
                      />
                      <circle cx="355" cy="192" r="7" fill="#f59e0b" className="animate-ping" />
                      <circle cx="465" cy="192" r="7" fill="#f59e0b" className="animate-ping" />
                      <circle cx="575" cy="192" r="7" fill="#f59e0b" className="animate-ping" />
                    </g>
                  )}

                  {/* Légendes */}
                  <text x="130" y="125" fill="#6ee7b7" fontSize="11" fontWeight="bold">Dendrites</text>
                  <text x="125" y="275" fill="#a7f3d0" fontSize="11" fontWeight="bold">Soma (Péricaryon)</text>
                  <text x="215" y="165" fill="#34d399" fontSize="10" fontWeight="bold">Cône</text>
                  <text x="400" y="160" fill="#fef08a" fontSize="11" fontWeight="bold">Myéline</text>
                  <text x="440" y="235" fill="#34d399" fontSize="10" fontWeight="bold">Ranvier</text>
                  <text x="700" y="105" fill="#6ee7b7" fontSize="11" fontWeight="bold">Boutons</text>
                </svg>
              </div>

              {/* Bouton de stimulation cytologique pleine largeur mobile sans icône */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800 text-xs">
                <button
                  onClick={() => {
                    setIsImpulseActive(true);
                    setTimeout(() => setIsImpulseActive(false), 2200);
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono font-bold uppercase tracking-wider text-xs active:scale-98 transition-all shadow-sm touch-manipulation"
                >
                  SIMULER PROPAGATION SALTATOIRE DE L’INFLUX
                </button>
                <span className="text-slate-400 text-[11px] text-center sm:text-right">
                  Touchez un composant ou un bouton pour l’inspecter
                </span>
              </div>
            </div>

            {/* Fiche Histologique */}
            <div className="lg:col-span-4 space-y-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 space-y-3 shadow-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <span className="text-[10px] font-mono font-bold uppercase text-emerald-800 tracking-wider">
                    Fiche Histologique Bac S2
                  </span>
                  <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">
                    MEN Sénégal
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-black text-slate-900 leading-snug">
                    {ORGANELLES_DATA[selectedOrganelle].title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {ORGANELLES_DATA[selectedOrganelle].subtitle}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider block font-mono">
                    Rôle Physiologique :
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                    {ORGANELLES_DATA[selectedOrganelle].role}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-950 space-y-1">
                  <div className="text-rose-800 font-mono font-bold uppercase tracking-wider text-[10px]">
                    PIÈGE BAC S2
                  </div>
                  <p className="text-xs leading-relaxed text-rose-900">
                    {ORGANELLES_DATA[selectedOrganelle].bacImportance}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
                  <div className="text-amber-800 font-mono font-bold uppercase tracking-wider text-[10px]">
                    WOLOF • DÉCODAGE
                  </div>
                  <p className="text-xs leading-relaxed text-amber-900 italic">
                    « {ORGANELLES_DATA[selectedOrganelle].wolof} »
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* ONGLET 3 : COMPARATEUR FIBRE ISOLÉE VS NERF ENTIER                   */}
      {/* ==================================================================== */}
      {activeTab === 'comparateur' && (
        <div className="p-3.5 sm:p-6 lg:p-7 space-y-5 bg-slate-50/50">
          <div className="max-w-4xl mx-auto space-y-5">
            <div className="text-center space-y-1">
              <span className="text-[10px] font-mono font-black uppercase text-emerald-800 tracking-wider bg-emerald-100 px-3 py-1 rounded-full">
                Comparaison Expérimentale Incontournable au Baccalauréat
              </span>
              <h3 className="text-lg sm:text-2xl font-black text-slate-900">
                Fibre Nerveuse Isolée (Tout ou Rien) vs Nerf Entier (Recrutement)
              </h3>
              <p className="text-xs text-slate-600 max-w-xl mx-auto">
                Pourquoi la fibre répond-elle d’emblée à son amplitude maximale, alors que le tronc nerveux présente une amplitude croissante en palier ?
              </p>
            </div>

            {/* Tableau avec défilement horizontal sans déformation */}
            <div className="rounded-2xl border border-slate-200 overflow-x-auto shadow-xs bg-white">
              <table className="w-full text-left text-xs min-w-[500px]">
                <thead className="bg-slate-900 text-white font-mono font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3">Critère Expérimental</th>
                    <th className="p-3 bg-emerald-950 text-emerald-300">Fibre Isolée (1 axone)</th>
                    <th className="p-3 bg-slate-800 text-slate-200">Nerf Sciatique Entier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 text-slate-700">
                  <tr>
                    <td className="p-3 font-bold bg-slate-50">Structure biologique</td>
                    <td className="p-3 font-semibold text-emerald-800">Unité cellulaire unique (1 prolongement)</td>
                    <td className="p-3">Organe réunissant des milliers de fibres hétérogènes</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold bg-slate-50">Loi biologique obéie</td>
                    <td className="p-3 font-bold text-emerald-800">Loi du "Tout ou Rien"</td>
                    <td className="p-3 font-bold text-rose-700">N'obéit PAS au tout ou rien !</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold bg-slate-50">Stimulation I &lt; Seuil</td>
                    <td className="p-3">Réponse nulle (électrotonus passif)</td>
                    <td className="p-3">Réponse nulle (aucune fibre excitée)</td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold bg-slate-50">Variation amplitude avec I</td>
                    <td className="p-3 font-bold text-emerald-800">
                      Constante et maximale (100 mV) : ne varie jamais
                    </td>
                    <td className="p-3 font-bold text-indigo-700">
                      Graduable et croissante avec l’intensité
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold bg-slate-50">Mécanisme sous-jacent</td>
                    <td className="p-3">Ouverture synchronisée des CVD-Na+ dès le seuil</td>
                    <td className="p-3 font-semibold">
                      Phénomène de <strong>recrutement</strong> de fibres à seuils étagés
                    </td>
                  </tr>
                  <tr>
                    <td className="p-3 font-bold bg-slate-50">Palier de saturation</td>
                    <td className="p-3">Immédiat dès la première stimulation efficace</td>
                    <td className="p-3 font-semibold">
                      Atteint quand 100 % des fibres du nerf sont excitées
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-slate-800 space-y-1">
              <span className="font-mono font-bold text-emerald-900 uppercase tracking-wider text-[10px] block">
                Conseil de Rédaction Office du Bac :
              </span>
              <p className="leading-relaxed">
                Devant un tracé d’amplitude croissante selon l’intensité I, commencez TOUJOURS par : 
                <em> « Ce tracé met en évidence le phénomène de recrutement de fibres nerveuses au sein d’un tronc nerveux hétérogène, prouvant qu’il s’agit d’un nerf entier et non d’une fibre isolée. »</em>
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
