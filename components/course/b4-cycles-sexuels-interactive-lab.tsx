'use client';

import React, { useState } from 'react';
import {
  Activity,
  Play,
  RotateCcw,
  Sparkles,
  Layers,
  Thermometer,
  Calendar,
  AlertCircle,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

type TabMode = 'chronogramme' | 'axe-retrocontroles' | 'reperes-bac';
type ExperimentType = 'normal' | 'ovariectomie' | 'oestro-faible' | 'oestro-forte' | 'progest-oestro';

export default function B4CyclesSexuelsInteractiveLab() {
  const [activeTab, setActiveTab] = useState<TabMode>('chronogramme');
  const [selectedDay, setSelectedDay] = useState<number>(14);
  const [activeExperiment, setActiveExperiment] = useState<ExperimentType>('normal');

  // Données dynamiques selon le jour (1 à 28)
  function getDayState(day: number) {
    let phase = '';
    let ovaire = '';
    let endometre = '';
    let glaire = '';
    let temperature = 36.6;
    let lhLevel = 10;
    let fshLevel = 8;
    let oestroLevel = 50;
    let progestLevel = 0.5;
    let retrocontrole = 'Rétrocontrôle négatif modéré sur l’axe HH';

    if (day <= 5) {
      phase = 'Phase des Règles (Menstruation)';
      ovaire = 'Recrutement des follicules primordiaux et primaires';
      endometre = 'Desquamation de la zone fonctionnelle (règles), épaisseur ~1 mm';
      glaire = 'Épaisse, opaque, imperméable aux spermatozoïdes (maillage serré)';
      temperature = 36.6;
      fshLevel = 12;
      lhLevel = 8;
      oestroLevel = 40;
      progestLevel = 0.2;
      retrocontrole = 'Rétrocontrôle négatif très faible suite à la chute lutéale précédente';
    } else if (day <= 11) {
      phase = 'Phase Folliculaire & Proliférative';
      ovaire = 'Sélection du follicule dominant et croissance cavitaire';
      endometre = 'Prolifération cellulaire sous l’action des œstrogènes (2 à 4 mm)';
      glaire = 'Devient progressivement plus fluide';
      temperature = 36.5;
      fshLevel = 9;
      lhLevel = 10;
      oestroLevel = 120 + (day - 6) * 25;
      progestLevel = 0.4;
      retrocontrole = 'Rétrocontrôle négatif classique (freinage de la FSH)';
    } else if (day <= 13) {
      phase = 'Phase Pré-ovulatoire (Pic Hormonal)';
      ovaire = 'Follicule mûr de De Graaf (20 mm) produisant des œstrogènes massifs';
      endometre = 'Épaisseur 4 à 5 mm, début de formation des glandes utérines';
      glaire = 'Filante, claire, très abondante, alcaline (facilite la survie des spermatozoïdes)';
      temperature = 36.4; // nadir
      fshLevel = 18;
      lhLevel = 85; // PIC DE LH
      oestroLevel = 320; // > seuil critique de 200 pg/mL
      progestLevel = 1.0;
      retrocontrole = 'RÉTROCONTRÔLE POSITIF DÉCLENCHÉ ! (Décharge ovulatoire de LH/FSH)';
    } else if (day === 14) {
      phase = 'Jour de l’Ovulation (J14)';
      ovaire = 'Rupture folliculaire et expulsion de l’ovocyte II bloqué en métaphase II + GP1';
      endometre = 'Endomètre prêt pour la transition sécrétoire (~5 mm)';
      glaire = 'Cristallisation maximale en « feuilles de fougère », maillage très lâche';
      temperature = 36.5;
      fshLevel = 14;
      lhLevel = 60;
      oestroLevel = 220;
      progestLevel = 2.0;
      retrocontrole = 'Fin du rétrocontrôle positif, chute de la décharge hypophysaire';
    } else if (day <= 24) {
      phase = 'Phase Lutéinique & Sécrétoire';
      ovaire = 'Corps jaune en pleine activité sécrétoire (lutéinisation)';
      endometre = 'Dentelle utérine : glandes très contournées riches en glycogène, artérioles spiralées (7-8 mm)';
      glaire = 'Rétractée, imperméable et hostile sous l’action de la progestérone';
      temperature = 37.2; // PLATEAU HYPERTHERMIQUE
      fshLevel = 5;
      lhLevel = 6;
      oestroLevel = 160;
      progestLevel = 16.0; // PIC DE PROGESTÉRONE
      retrocontrole = 'PUISSANT RÉTROCONTRÔLE NÉGATIF (Progestérone + Œstrogènes freinent l’axe HH)';
    } else {
      phase = 'Fin de Cycle & Déclin Lutéal';
      ovaire = 'Régression du corps jaune en corps albicans (sans fécondation)';
      endometre = 'Ischémie et vasoconstriction des artérioles spiralées avant desquamation';
      glaire = 'Très dense et fermée';
      temperature = 36.8;
      fshLevel = 8;
      lhLevel = 6;
      oestroLevel = 50;
      progestLevel = 1.5;
      retrocontrole = 'Effondrement hormonal → levée du rétrocontrôle négatif → règles imminentes';
    }

    return {
      phase,
      ovaire,
      endometre,
      glaire,
      temperature,
      lhLevel,
      fshLevel,
      oestroLevel,
      progestLevel,
      retrocontrole,
    };
  }

  const currentDayState = getDayState(selectedDay);

  // Expériences simulées pour l'onglet 2
  const EXPERIMENTS = [
    {
      id: 'normal',
      title: 'Témoin Normal',
      desc: 'Cycle normal de 28 jours avec rétrocontrôle négatif initial, pic positif à J13, et rétrocontrôle négatif lutéal.',
      gnrh: 'Pulsatile normale (1 pulse/90 min)',
      fshLh: 'Niveaux physiologiques avec pic pré-ovulatoire',
      steroids: 'Œstrogènes cycliques + pic de progestérone lutéal',
      uterus: 'Cycle endométrial complet (règles, prolifération, dentelle)',
    },
    {
      id: 'ovariectomie',
      title: 'Ovariectomie Bilatérale',
      desc: 'Ablation chirurgicale des deux ovaires.',
      gnrh: 'Pulses très fréquents et de forte amplitude',
      fshLh: 'Sécrétion massive et permanente de FSH et LH (Castration)',
      steroids: 'Effondrement total des œstrogènes et de la progestérone (~0)',
      uterus: 'Atrophie utérine irréversible (disparition complète des cycles utérins)',
    },
    {
      id: 'oestro-faible',
      title: 'Injection Faible Dose d’Œstrogènes',
      desc: 'Administration quotidienne de faibles doses d’œstrogènes chez une ovariectomisée.',
      gnrh: 'Freinage modéré des pulses',
      fshLh: 'Baisse nette des taux de FSH et LH (Rétrocontrôle Négatif vérifié)',
      steroids: 'Niveau basique constant',
      uterus: 'Légère prolifération endométriale sans cycle',
    },
    {
      id: 'oestro-forte',
      title: 'Perfusion Forte Dose (> 200 pg/mL pendant 36h)',
      desc: 'Maintien artificiel d’un taux élevé d’œstrogènes au-delà du seuil critique.',
      gnrh: 'Décharge massive continue de GnRH',
      fshLh: 'EXPLOSION DU TAUX DE LH (Rétrocontrôle Positif déclenché !)',
      steroids: 'Taux élevé imposé',
      uterus: 'Prolifération intense',
    },
    {
      id: 'progest-oestro',
      title: 'Injection Progestérone + Œstrogènes (Pilule Combinée)',
      desc: 'Administration continue de progestatif et d’œstrogène de synthèse.',
      gnrh: 'Blocage total des pulses hypothalamiques',
      fshLh: 'Taux de FSH et LH quasi nuls (mise au repos hypophysaire)',
      steroids: 'Stéroïdes de synthèse circulants, production ovarienne bloquée',
      uterus: 'Endomètre atrophique, ovaires au repos, absence d’ovulation (effet contraceptif)',
    },
  ];

  const currentExp = EXPERIMENTS.find((e) => e.id === activeExperiment) || EXPERIMENTS[0];

  return (
    <div className="bg-white rounded-2xl border border-navy/15 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy via-slate-900 to-rose-950 p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center">
              <Activity className="w-6 h-6 text-teal-300" />
            </div>
            <div>
              <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">
                Simulateur Interactif Bac S2
              </span>
              <h3 className="text-xl font-bold">
                Laboratoire des Cycles Sexuels & Rétrocontrôles Hormonaux
              </h3>
            </div>
          </div>

          {/* Onglets navigation */}
          <div className="flex bg-white/10 p-1 rounded-xl self-start sm:self-auto gap-1 border border-white/10">
            <button
              type="button"
              onClick={() => setActiveTab('chronogramme')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'chronogramme'
                  ? 'bg-teal-500 text-white shadow-sm'
                  : 'text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              📅 Chronogramme J1-J28
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('axe-retrocontroles')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'axe-retrocontroles'
                  ? 'bg-teal-500 text-white shadow-sm'
                  : 'text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              🔄 Axe & Rétrocontrôles
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('reperes-bac')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'reperes-bac'
                  ? 'bg-teal-500 text-white shadow-sm'
                  : 'text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              📊 Tableau de Synthèse
            </button>
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {/* ========================================================================= */}
        {/* ONGLET 1 : CHRONOGRAMME SYNCHRONISÉ J1 À J28                              */}
        {/* ========================================================================= */}
        {activeTab === 'chronogramme' && (
          <div className="space-y-6">
            {/* Curseur temporel de jour */}
            <div className="bg-surface/80 rounded-2xl p-5 border border-navy/15 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                    Curseur temporel interactif du cycle féminin (28 jours)
                  </span>
                  <h4 className="font-black text-navy text-xl mt-1">
                    Jour {selectedDay} / 28 — <span className="text-teal-700">{currentDayState.phase}</span>
                  </h4>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSelectedDay(14)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-rose-600 text-white hover:bg-rose-700 transition shadow-xs"
                  >
                    Aller à l’Ovulation (J14)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedDay(21)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-600 text-white hover:bg-amber-700 transition shadow-xs"
                  >
                    Pic Progestérone (J21)
                  </button>
                </div>
              </div>

              <input
                type="range"
                min="1"
                max="28"
                value={selectedDay}
                onChange={(e) => setSelectedDay(parseInt(e.target.value, 10))}
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-teal-600"
              />

              <div className="flex justify-between text-[11px] font-mono text-navy/60 font-bold px-1">
                <span>J1 (Règles)</span>
                <span>J7</span>
                <span className="text-rose-600 font-black">J14 (Ovulation)</span>
                <span>J21 (Corps jaune)</span>
                <span>J28 (Fin cycle)</span>
              </div>
            </div>

            {/* Fiches des 4 niveaux synchronisés à ce jour */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* 1. Ovaire */}
              <div className="bg-white rounded-xl border border-navy/15 p-4 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-rose-700 font-bold text-xs uppercase tracking-wider">
                  <Calendar className="w-4 h-4" /> 1. Cycle Ovarien
                </div>
                <p className="text-navy font-bold text-sm leading-snug">{currentDayState.ovaire}</p>
                <div className="text-[11px] text-text/70 bg-surface p-2 rounded-lg">
                  {selectedDay < 14
                    ? 'Phase folliculaire sous influence de la FSH.'
                    : selectedDay === 14
                    ? 'Décharge de LH déclenchant la ponte ovulaire.'
                    : 'Phase lutéale sous l’action du corps jaune.'}
                </div>
              </div>

              {/* 2. Utérus & Endomètre */}
              <div className="bg-white rounded-xl border border-navy/15 p-4 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-purple-700 font-bold text-xs uppercase tracking-wider">
                  <Layers className="w-4 h-4" /> 2. Cycle Utérin
                </div>
                <p className="text-navy font-bold text-sm leading-snug">{currentDayState.endometre}</p>
                <div className="text-[11px] text-text/70 bg-surface p-2 rounded-lg">
                  {selectedDay <= 5
                    ? 'Chute hormonale → ischémie artérielle.'
                    : selectedDay <= 14
                    ? 'Prolifération stimulée par les œstrogènes.'
                    : 'Dentelle utérine stimulée par la progestérone.'}
                </div>
              </div>

              {/* 3. Glaire Cervicale */}
              <div className="bg-white rounded-xl border border-navy/15 p-4 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-teal-700 font-bold text-xs uppercase tracking-wider">
                  <Activity className="w-4 h-4" /> 3. Glaire Cervicale
                </div>
                <p className="text-navy font-bold text-sm leading-snug">{currentDayState.glaire}</p>
                <div className="text-[11px] text-text/70 bg-surface p-2 rounded-lg">
                  {selectedDay >= 12 && selectedDay <= 15
                    ? 'Maillage lâche, favorable au franchissement des spermatozoïdes.'
                    : 'Barrière dense et hostile (filtre protecteur).'}
                </div>
              </div>

              {/* 4. Température Corporelle */}
              <div className="bg-white rounded-xl border border-navy/15 p-4 shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-amber-700 font-bold text-xs uppercase tracking-wider">
                  <Thermometer className="w-4 h-4" /> 4. Température
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black text-navy">{currentDayState.temperature} °C</span>
                  <span className="text-[11px] font-bold text-amber-600">
                    {selectedDay >= 15 ? 'Plateau Hyperthermique' : 'Phase Hypothermique'}
                  </span>
                </div>
                <p className="text-[11px] text-text/70 bg-surface p-2 rounded-lg">
                  {selectedDay >= 15
                    ? 'Élévation de +0,4 °C due à l’effet thermogène central de la progestérone.'
                    : 'Température basale matinale sous 37 °C.'}
                </p>
              </div>
            </div>

            {/* Jauge des taux hormonaux à ce jour précis */}
            <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 text-white space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
                  Dosage plasmatique estimé au Jour {selectedDay}
                </span>
                <span className="text-xs text-rose-300 font-semibold bg-rose-500/20 px-3 py-1 rounded-full border border-rose-500/30">
                  {currentDayState.retrocontrole}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* LH */}
                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-bold text-amber-400">LH (Lutéinisante)</span>
                    <span className="font-mono text-slate-300">{currentDayState.lhLevel} mUI/mL</span>
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-400 h-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (currentDayState.lhLevel / 90) * 100)}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    {selectedDay === 13 || selectedDay === 14 ? 'PIC PRÉ-OVULATOIRE !' : 'Niveau de base'}
                  </span>
                </div>

                {/* FSH */}
                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-bold text-blue-400">FSH (Folliculostimulante)</span>
                    <span className="font-mono text-slate-300">{currentDayState.fshLevel} mUI/mL</span>
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-blue-400 h-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (currentDayState.fshLevel / 20) * 100)}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-1">Recrutement folliculaire</span>
                </div>

                {/* Œstrogènes */}
                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-bold text-rose-400">Œstrogènes (17β-œstradiol)</span>
                    <span className="font-mono text-slate-300">{currentDayState.oestroLevel} pg/mL</span>
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-rose-400 h-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (currentDayState.oestroLevel / 350) * 100)}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    {currentDayState.oestroLevel > 200 ? 'Seuil critique franchi (>200 pg/mL)' : 'Niveau normal'}
                  </span>
                </div>

                {/* Progestérone */}
                <div className="bg-slate-800/80 p-3.5 rounded-xl border border-slate-700">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-bold text-emerald-400">Progestérone</span>
                    <span className="font-mono text-slate-300">{currentDayState.progestLevel} ng/mL</span>
                  </div>
                  <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-400 h-full transition-all duration-300"
                      style={{ width: `${Math.min(100, (currentDayState.progestLevel / 18) * 100)}%` }}
                    />
                  </div>
                  <span className="text-[10px] text-slate-400 block mt-1">
                    {selectedDay >= 15 ? 'Sécrétée par le corps jaune' : 'Quasi nulle avant ovulation'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ONGLET 2 : L'AXE HYPOTHALAMO-HYPOPHYSO-OVARIEN & EXPÉRIENCES DU BAC       */}
        {/* ========================================================================= */}
        {activeTab === 'axe-retrocontroles' && (
          <div className="space-y-6">
            <div className="bg-teal-50/80 border border-teal-200 rounded-xl p-4 text-xs sm:text-sm text-teal-900 flex items-start gap-2.5">
              <Sparkles className="w-5 h-5 text-teal-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Laboratoire d’Analyse Expérimentale du Bac S2 :</span>
                Sélectionnez une expérience classique (ovariectomie, perfusion d’œstrogènes, pilule combinée) pour observer en temps réel la réponse de l’axe hypothalamo-hypophysaire et de l’utérus.
              </div>
            </div>

            {/* Boutons d'expériences */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {EXPERIMENTS.map((exp) => (
                <button
                  key={exp.id}
                  type="button"
                  onClick={() => setActiveExperiment(exp.id as ExperimentType)}
                  className={`p-2.5 rounded-xl text-xs font-bold text-left transition-all border ${
                    activeExperiment === exp.id
                      ? 'bg-navy text-white border-navy shadow-sm'
                      : 'bg-white text-navy hover:bg-slate-50 border-navy/10'
                  }`}
                >
                  <p className="truncate">{exp.title}</p>
                </button>
              ))}
            </div>

            {/* Schéma de l'axe fonctionnel */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Schéma SVG Interactif */}
              <div className="lg:col-span-6 bg-slate-900 rounded-2xl p-5 border border-slate-800 text-white">
                <h4 className="font-bold text-xs uppercase tracking-wider text-teal-300 mb-3 text-center">
                  Schéma Fonctionnel de l’Axe HH-Ovaire
                </h4>

                <svg viewBox="0 0 340 320" className="w-full h-auto">
                  {/* Hypothalamus */}
                  <rect x="70" y="10" width="200" height="42" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" rx="8" />
                  <text x="170" y="28" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">
                    HYPOTHALAMUS
                  </text>
                  <text x="170" y="42" fill="#38bdf8" fontSize="9" textAnchor="middle">
                    GnRH pulsatile
                  </text>

                  {/* Flèche GnRH */}
                  <line x1="170" y1="52" x2="170" y2="80" stroke="#38bdf8" strokeWidth="2" markerEnd="url(#arrow)" />
                  <polygon points="170,82 166,74 174,74" fill="#38bdf8" />

                  {/* Adénohypophyse */}
                  <rect x="70" y="85" width="200" height="42" fill="#1e293b" stroke="#fbbf24" strokeWidth="2" rx="8" />
                  <text x="170" y="103" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">
                    ANTÉHYPOPHYSE
                  </text>
                  <text x="170" y="117" fill="#fbbf24" fontSize="9" textAnchor="middle">
                    Sécrétion de FSH &amp; LH
                  </text>

                  {/* Flèches FSH & LH */}
                  <line x1="170" y1="127" x2="170" y2="155" stroke="#fbbf24" strokeWidth="2" />
                  <polygon points="170,157 166,149 174,149" fill="#fbbf24" />

                  {/* Ovaires */}
                  <rect x="70" y="160" width="200" height="46" fill="#1e293b" stroke="#f43f5e" strokeWidth="2" rx="8" />
                  <text x="170" y="178" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">
                    OVAIRES
                  </text>
                  <text x="170" y="194" fill="#f43f5e" fontSize="9" textAnchor="middle">
                    Œstrogènes &amp; Progestérone
                  </text>

                  {/* Flèche vers Utérus */}
                  <line x1="170" y1="206" x2="170" y2="236" stroke="#f43f5e" strokeWidth="2" />
                  <polygon points="170,238 166,230 174,230" fill="#f43f5e" />

                  {/* Organe cible : Utérus */}
                  <rect x="70" y="240" width="200" height="42" fill="#1e293b" stroke="#a855f7" strokeWidth="2" rx="8" />
                  <text x="170" y="258" fill="#e2e8f0" fontSize="11" fontWeight="bold" textAnchor="middle">
                    UTÉRUS (Endomètre)
                  </text>
                  <text x="170" y="272" fill="#c084fc" fontSize="9" textAnchor="middle">
                    Prolifération &amp; Dentelle utérine
                  </text>

                  {/* Rétrocontrôles (Boucle latérale gauche) */}
                  <path
                    d="M 70,180 C 15,180 15,31 65,31"
                    fill="none"
                    stroke={
                      activeExperiment === 'oestro-forte'
                        ? '#22c55e'
                        : activeExperiment === 'ovariectomie'
                        ? '#64748b'
                        : '#f43f5e'
                    }
                    strokeWidth="2.5"
                    strokeDasharray={activeExperiment === 'ovariectomie' ? '4' : 'none'}
                  />
                  <polygon
                    points="68,31 60,27 60,35"
                    fill={activeExperiment === 'oestro-forte' ? '#22c55e' : '#f43f5e'}
                  />
                  <text
                    x="25"
                    y="110"
                    fill={activeExperiment === 'oestro-forte' ? '#4ade80' : '#fca5a5'}
                    fontSize="9"
                    fontWeight="bold"
                    transform="rotate(-90 25,110)"
                  >
                    {activeExperiment === 'oestro-forte'
                      ? 'Rétrocontrôle Positif (+)'
                      : activeExperiment === 'ovariectomie'
                      ? 'Rétrocontrôle rompu'
                      : 'Rétrocontrôle Négatif (-)'}
                  </text>
                </svg>
              </div>

              {/* Résultats & Analyse Expérimentale */}
              <div className="lg:col-span-6 bg-white rounded-2xl border border-navy/15 p-5 shadow-sm space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
                    Protocole expérimental
                  </span>
                  <h4 className="font-bold text-navy text-lg mt-1">{currentExp.title}</h4>
                  <p className="text-text/80 text-xs sm:text-sm mt-1 leading-relaxed bg-surface p-3 rounded-xl border border-navy/10">
                    {currentExp.desc}
                  </p>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="border-l-4 border-l-blue-500 pl-3">
                    <span className="font-bold text-navy block text-xs">Activité de l’Hypothalamus (GnRH) :</span>
                    <p className="text-text/80">{currentExp.gnrh}</p>
                  </div>

                  <div className="border-l-4 border-l-amber-500 pl-3">
                    <span className="font-bold text-navy block text-xs">Sécrétion Hypophysaire (FSH &amp; LH) :</span>
                    <p className="text-text/80 font-semibold">{currentExp.fshLh}</p>
                  </div>

                  <div className="border-l-4 border-l-rose-500 pl-3">
                    <span className="font-bold text-navy block text-xs">Stéroïdes Ovariens Circulants :</span>
                    <p className="text-text/80">{currentExp.steroids}</p>
                  </div>

                  <div className="border-l-4 border-l-purple-500 pl-3">
                    <span className="font-bold text-navy block text-xs">État de l’Utérus (Endomètre) :</span>
                    <p className="text-text/80 font-bold text-purple-900">{currentExp.uterus}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ONGLET 3 : TABLEAU DE SYNTHÈSE DES HORMONES & REPÈRES BAC                 */}
        {/* ========================================================================= */}
        {activeTab === 'reperes-bac' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-navy/15 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-navy to-slate-800 p-4 text-white font-bold text-sm">
                Tableau Récapitulatif Officiel des 4 Hormones de la Reproduction Féminine
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-surface text-navy font-bold uppercase text-[11px] border-b border-navy/10">
                    <tr>
                      <th className="p-3">Hormone</th>
                      <th className="p-3">Origine Cellulaire</th>
                      <th className="p-3">Organe Cible</th>
                      <th className="p-3">Effets Biologiques Majeurs</th>
                      <th className="p-3">Type de Rétrocontrôle</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy/10">
                    <tr>
                      <td className="p-3 font-bold text-blue-700">FSH</td>
                      <td className="p-3 text-text/80">Antéhypophyse</td>
                      <td className="p-3 text-text/80">Cellules de la granulosa ovarienne</td>
                      <td className="p-3 text-text/80">Recrutement et maturation folliculaire, activation de l’aromatase</td>
                      <td className="p-3 text-text/80">Régulée par RC- des œstrogènes et de l’inhibine</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-amber-700">LH</td>
                      <td className="p-3 text-text/80">Antéhypophyse</td>
                      <td className="p-3 text-text/80">Thèque interne &amp; Granulosa</td>
                      <td className="p-3 text-text/80">Sécrétion d’androgènes, déclenchement de l’ovulation (pic), lutéinisation</td>
                      <td className="p-3 text-emerald-700 font-bold">RC- modéré puis RC+ spectaculaire à J13-J14</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-rose-700">Œstrogènes (Œstradiol)</td>
                      <td className="p-3 text-text/80">Thèque interne + Granulosa (follicule), Corps jaune</td>
                      <td className="p-3 text-text/80">Endomètre utérin, Axe HH, Glaire cervicale</td>
                      <td className="p-3 text-text/80">Prolifération de l’endomètre, glaire filante, RC- puis RC+ si &gt; 200 pg/mL</td>
                      <td className="p-3 text-purple-700 font-bold">Actrice du RC- et du RC+ pré-ovulatoire</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-bold text-emerald-700">Progestérone</td>
                      <td className="p-3 text-text/80">Corps jaune (cellules lutéales)</td>
                      <td className="p-3 text-text/80">Endomètre utérin, Myomètre, Hypothalamus</td>
                      <td className="p-3 text-text/80">Dentelle utérine (sécrétion de glycogène), silence utérin, effet thermogène (+0,4 °C)</td>
                      <td className="p-3 text-rose-700 font-bold">Puissant RC- en phase lutéale avec les œstrogènes</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

