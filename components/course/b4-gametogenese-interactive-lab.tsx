'use client';

import React, { useState } from 'react';
import {
  Play,
  RotateCcw,
  Info,
  Dna,
  Layers,
  Sparkles,
  CheckCircle2,
  Activity,
  Flame,
} from 'lucide-react';

type TabType = 'spermatogenese' | 'ovogenese' | 'adn-compare';

export default function B4GametogeneseInteractiveLab() {
  const [activeTab, setActiveTab] = useState<TabType>('spermatogenese');
  const [selectedCellStage, setSelectedCellStage] = useState<number>(0);
  const [selectedFollicleStage, setSelectedFollicleStage] = useState<number>(3);
  const [timelineStep, setTimelineStep] = useState<number>(1);
  const [isFertilized, setIsFertilized] = useState<boolean>(false);

  // Stades spermatogenèse
  const SPERM_STAGES = [
    {
      id: 0,
      name: 'Spermatogonie (2n)',
      type: 'Multiplication',
      dna: '2n = 46 chrs (2C)',
      localisation: 'Accolée à la membrane basale (périphérie du tube)',
      details:
        'Cellule souche diploïde qui se divise indéfiniment par mitoses équationnelles. Une cellule fille reste souche de réserve (Ad), l’autre s’engage dans la spermatogenèse (Ap).',
      duree: 'Multiplication continue',
    },
    {
      id: 1,
      name: 'Spermatocyte I (2n)',
      type: 'Accroissement & Réplication',
      dna: '2n = 46 chrs doubles (4C)',
      localisation: 'Zone intermédiaire, soutenu par la cellule de Sertoli',
      details:
        'Résulte de la croissance de la spermatogonie et de la réplication de l’ADN en interphase. S’engage dans la première division de méiose (réductionnelle). Prophase I très longue avec crossing-over (brassage intrachromosomique).',
      duree: '~22 jours',
    },
    {
      id: 2,
      name: 'Spermatocyte II (n)',
      type: 'Maturation (Méiose I achevée)',
      dna: 'n = 23 chrs doubles (2C)',
      localisation: 'Plus près de la lumière du tube',
      details:
        'Cellule haploïde issue de la division réductionnelle. Chaque spermatocyte I donne 2 spermatocytes II. Leur vie est très brève : ils entrent quasi-instantanément en méiose II équationnelle.',
      duree: '~quelques heures',
    },
    {
      id: 3,
      name: 'Spermatide (n)',
      type: 'Fin de Méiose II',
      dna: 'n = 23 chrs simples (C)',
      localisation: 'Bordure immédiate de la lumière',
      details:
        'Petite cellule ronde haploïde sans flagelle. Chaque spermatocyte II donne 2 spermatides, soit 4 spermatides pour 1 spermatocyte I initial. Elle va subir la métamorphose sans aucune division supplémentaire.',
      duree: '~1 à 2 jours',
    },
    {
      id: 4,
      name: 'Spermatozoïde mûr (n)',
      type: 'Spermiogenèse achevée',
      dna: 'n = 23 chrs simples (C)',
      localisation: 'Libre dans la lumière du tube séminifère',
      details:
        'Gamète mâle hautement différencié et profilé pour la mobilité : tête avec acrosome rempli d’hyaluronidase, noyau ultra-condensé (protamines), col, pièce intermédiaire riche en mitochondries spirales fournissant l’ATP, et flagelle propulseur.',
      duree: 'Processus total ~74 jours',
    },
  ];

  // Stades folliculogenèse
  const FOLLICLE_STAGES = [
    {
      id: 0,
      name: 'Follicule Primordial',
      ovocyte: 'Ovocyte I bloqué en Prophase I',
      taille: '30 à 50 µm',
      caracteristiques:
        'Constitué dès la vie fœtale. Présent en stock non renouvelable (~400 000 à la puberté). Ovocyte I entouré d’une seule couche de quelques cellules folliculaires très aplaties.',
    },
    {
      id: 1,
      name: 'Follicule Primaire',
      ovocyte: 'Ovocyte I en croissance',
      taille: '50 à 80 µm',
      caracteristiques:
        'Les cellules folliculaires deviennent cubiques et forment une assise continue unistratifiée. Début de synthèse de la membrane pellucide glycoprotéique.',
    },
    {
      id: 2,
      name: 'Follicule Secondaire (Plein)',
      ovocyte: 'Ovocyte I volumineux',
      taille: '100 à 200 µm',
      caracteristiques:
        'Cellules folliculaires prolifèrent pour former la granulosa pluristratifiée. Apparition de la zone pellucide nette et différenciation du stroma ovarien en thèque interne (sécrétrice) et thèque externe (fibreuse).',
    },
    {
      id: 3,
      name: 'Follicule Tertiaire (Cavitaire / Antral)',
      ovocyte: 'Ovocyte I refoulé en périphérie',
      taille: '0,5 à 10 mm',
      caracteristiques:
        'Apparition de petites cavités remplies de liquide folliculaire qui fusionnent progressivement pour former un antrum. La thèque interne sécrète activement des œstrogènes sous contrôle de la LH.',
    },
    {
      id: 4,
      name: 'Follicule Mûr de De Graaf',
      ovocyte: 'Ovocyte I prêt à l’ovulation (déblocage en ovocyte II)',
      taille: '18 à 25 mm',
      caracteristiques:
        'Très volumineux, fait saillie à la surface de l’ovaire. Immense antrum. L’ovocyte est perché sur le cumulus oophorus, entouré de la corona radiata. 36h avant l’ovulation, le pic de LH réactive la méiose I : expulsion du GP1 et blocage en Métaphase II.',
    },
    {
      id: 5,
      name: 'Ovulation (J14)',
      ovocyte: 'Ovocyte II bloqué en Métaphase II + GP1',
      taille: '120 µm (cellule géante)',
      caracteristiques:
        'Rupture de la paroi folliculaire sous l’effet d’enzymes lytiques activées par le pic de LH. Expulsion du complexe ovulaire (ovocyte II + zone pellucide + corona radiata) aspiré par les franges du pavillon tubaire.',
    },
    {
      id: 6,
      name: 'Corps Jaune',
      ovocyte: 'Absent (dans la trompe)',
      taille: '20 à 30 mm',
      caracteristiques:
        'Transformation des cellules de la granulosa et de la thèque interne en cellules lutéales sous l’effet de la LH (lutéinisation). Sécrétion massive de progestérone et d’œstrogènes. Sans fécondation, il régresse en corps albicans (cicatrice fibreuse).',
    },
  ];

  const currentSperm = SPERM_STAGES[selectedCellStage];
  const currentFollicle = FOLLICLE_STAGES[selectedFollicleStage];

  return (
    <div className="bg-white rounded-2xl border border-navy/15 shadow-sm overflow-hidden">
      {/* Header du laboratoire */}
      <div className="bg-gradient-to-r from-navy via-slate-900 to-teal-950 p-6 text-white">
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
                Laboratoire Virtuel de Gamétogenèse & Méiose Comparée
              </h3>
            </div>
          </div>

          {/* Onglets navigation */}
          <div className="flex bg-white/10 p-1 rounded-xl self-start sm:self-auto gap-1 border border-white/10">
            <button
              type="button"
              onClick={() => setActiveTab('spermatogenese')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'spermatogenese'
                  ? 'bg-teal-500 text-white shadow-sm'
                  : 'text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              ♂ Spermatogenèse
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('ovogenese')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'ovogenese'
                  ? 'bg-teal-500 text-white shadow-sm'
                  : 'text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              ♀ Ovogenèse
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('adn-compare')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'adn-compare'
                  ? 'bg-teal-500 text-white shadow-sm'
                  : 'text-slate-200 hover:text-white hover:bg-white/5'
              }`}
            >
              📊 Courbe ADN & Ploïdie
            </button>
          </div>
        </div>
      </div>

      {/* Contenu selon onglet */}
      <div className="p-5 sm:p-6">
        {/* ========================================================================= */}
        {/* ONGLET 1 : SPERMATOGENÈSE CENTRIPÈTE                                      */}
        {/* ========================================================================= */}
        {activeTab === 'spermatogenese' && (
          <div className="space-y-6">
            <div className="bg-blue-50/70 border border-blue-200 rounded-xl p-4 text-xs sm:text-sm text-blue-900 flex items-start gap-2.5">
              <Info className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Principe centripète :</span> Les cellules progresse de la membrane basale (périphérie du tube séminifère) vers la lumière centrale. Cliquez sur chaque niveau cellulaire pour explorer sa ploïdie, sa morphologie et les transformations de la spermiogenèse.
              </div>
            </div>

            {/* Schéma SVG du tube séminifère */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-7 bg-slate-900 rounded-2xl p-4 border border-slate-800 shadow-inner">
                <div className="flex items-center justify-between mb-3 text-white text-xs font-semibold px-2">
                  <span>Coupe sectorielle de tube séminifère</span>
                  <span className="text-teal-400 font-mono">Sens centripète ↓</span>
                </div>

                <svg viewBox="0 0 500 340" className="w-full h-auto rounded-xl">
                  <defs>
                    <linearGradient id="sertoliGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#1e293b" />
                      <stop offset="100%" stopColor="#0f172a" />
                    </linearGradient>
                    <linearGradient id="basaleGrad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#e11d48" />
                      <stop offset="100%" stopColor="#f43f5e" />
                    </linearGradient>
                  </defs>

                  {/* Espace interstitiel avec cellules de Leydig */}
                  <rect x="10" y="5" width="480" height="25" fill="#334155" rx="6" />
                  <text x="25" y="22" fill="#cbd5e1" fontSize="10" fontWeight="bold">
                    Espace interstitiel : Cellules de Leydig (sécrétion de Testostérone) + Capillaires
                  </text>
                  <circle cx="430" cy="18" r="6" fill="#fbbf24" />
                  <circle cx="450" cy="18" r="6" fill="#fbbf24" />
                  <circle cx="470" cy="18" r="6" fill="#fbbf24" />

                  {/* Membrane basale */}
                  <rect x="10" y="35" width="480" height="6" fill="url(#basaleGrad)" rx="2" />
                  <text x="20" y="52" fill="#fda4af" fontSize="9" fontWeight="bold">
                    Membrane basale
                  </text>

                  {/* Fond de la paroi du tube (Cellule de Sertoli) */}
                  <rect x="10" y="45" width="480" height="235" fill="url(#sertoliGrad)" stroke="#334155" strokeWidth="1" rx="8" />

                  {/* Représentation cellule nourricière de Sertoli */}
                  <path
                    d="M 50,45 Q 60,150 70,280 L 110,280 Q 90,150 110,45 Z"
                    fill="#14b8a6"
                    opacity="0.15"
                  />
                  <text x="55" y="160" fill="#2dd4bf" fontSize="9" opacity="0.8" transform="rotate(-90 55,160)">
                    Cellule de Sertoli (nourricière)
                  </text>

                  {/* NIVEAU 0 : Spermatogonies (y = 55 à 90) */}
                  <g
                    onClick={() => setSelectedCellStage(0)}
                    className="cursor-pointer transition-transform hover:opacity-90"
                  >
                    <rect
                      x="20"
                      y="58"
                      width="460"
                      height="38"
                      fill={selectedCellStage === 0 ? '#1e3a8a' : '#1e293b'}
                      stroke={selectedCellStage === 0 ? '#60a5fa' : '#475569'}
                      strokeWidth={selectedCellStage === 0 ? 2 : 1}
                      rx="8"
                    />
                    <circle cx="150" cy="77" r="12" fill="#3b82f6" />
                    <circle cx="210" cy="77" r="12" fill="#3b82f6" />
                    <circle cx="270" cy="77" r="12" fill="#3b82f6" />
                    <circle cx="330" cy="77" r="12" fill="#3b82f6" />
                    <text x="30" y="81" fill="#93c5fd" fontSize="11" fontWeight="bold">
                      1. Spermatogonies (2n)
                    </text>
                    <text x="365" y="81" fill="#60a5fa" fontSize="9" fontWeight="bold">
                      [Multiplication]
                    </text>
                  </g>

                  {/* NIVEAU 1 : Spermatocytes I (y = 104 à 148) */}
                  <g
                    onClick={() => setSelectedCellStage(1)}
                    className="cursor-pointer transition-transform hover:opacity-90"
                  >
                    <rect
                      x="20"
                      y="102"
                      width="460"
                      height="44"
                      fill={selectedCellStage === 1 ? '#064e3b' : '#1e293b'}
                      stroke={selectedCellStage === 1 ? '#34d399' : '#475569'}
                      strokeWidth={selectedCellStage === 1 ? 2 : 1}
                      rx="8"
                    />
                    <circle cx="160" cy="124" r="16" fill="#10b981" />
                    <circle cx="240" cy="124" r="16" fill="#10b981" />
                    <circle cx="320" cy="124" r="16" fill="#10b981" />
                    <text x="30" y="128" fill="#a7f3d0" fontSize="11" fontWeight="bold">
                      2. Spermatocytes I (2n, 4C)
                    </text>
                    <text x="365" y="128" fill="#34d399" fontSize="9" fontWeight="bold">
                      [Accroissement]
                    </text>
                  </g>

                  {/* NIVEAU 2 : Spermatocytes II (y = 154 à 192) */}
                  <g
                    onClick={() => setSelectedCellStage(2)}
                    className="cursor-pointer transition-transform hover:opacity-90"
                  >
                    <rect
                      x="20"
                      y="152"
                      width="460"
                      height="38"
                      fill={selectedCellStage === 2 ? '#701a75' : '#1e293b'}
                      stroke={selectedCellStage === 2 ? '#f472b6' : '#475569'}
                      strokeWidth={selectedCellStage === 2 ? 2 : 1}
                      rx="8"
                    />
                    <circle cx="150" cy="171" r="11" fill="#ec4899" />
                    <circle cx="210" cy="171" r="11" fill="#ec4899" />
                    <circle cx="270" cy="171" r="11" fill="#ec4899" />
                    <circle cx="330" cy="171" r="11" fill="#ec4899" />
                    <text x="30" y="175" fill="#fbcfe8" fontSize="11" fontWeight="bold">
                      3. Spermatocytes II (n, 2C)
                    </text>
                    <text x="365" y="175" fill="#f472b6" fontSize="9" fontWeight="bold">
                      [Méiose I Réductionnelle]
                    </text>
                  </g>

                  {/* NIVEAU 3 : Spermatides (y = 198 à 232) */}
                  <g
                    onClick={() => setSelectedCellStage(3)}
                    className="cursor-pointer transition-transform hover:opacity-90"
                  >
                    <rect
                      x="20"
                      y="196"
                      width="460"
                      height="36"
                      fill={selectedCellStage === 3 ? '#78350f' : '#1e293b'}
                      stroke={selectedCellStage === 3 ? '#fbbf24' : '#475569'}
                      strokeWidth={selectedCellStage === 3 ? 2 : 1}
                      rx="8"
                    />
                    <circle cx="140" cy="214" r="8" fill="#f59e0b" />
                    <circle cx="180" cy="214" r="8" fill="#f59e0b" />
                    <circle cx="220" cy="214" r="8" fill="#f59e0b" />
                    <circle cx="260" cy="214" r="8" fill="#f59e0b" />
                    <circle cx="300" cy="214" r="8" fill="#f59e0b" />
                    <circle cx="340" cy="214" r="8" fill="#f59e0b" />
                    <text x="30" y="218" fill="#fef3c7" fontSize="11" fontWeight="bold">
                      4. Spermatides rondes (n, C)
                    </text>
                    <text x="365" y="218" fill="#fbbf24" fontSize="9" fontWeight="bold">
                      [Méiose II Équationnelle]
                    </text>
                  </g>

                  {/* NIVEAU 4 : Lumière du tube & Spermatozoïdes (y = 238 à 320) */}
                  <g
                    onClick={() => setSelectedCellStage(4)}
                    className="cursor-pointer transition-transform hover:opacity-90"
                  >
                    <rect
                      x="10"
                      y="240"
                      width="480"
                      height="90"
                      fill={selectedCellStage === 4 ? '#042f2e' : '#0f172a'}
                      stroke={selectedCellStage === 4 ? '#2dd4bf' : '#334155'}
                      strokeWidth={selectedCellStage === 4 ? 2 : 1}
                      rx="8"
                    />
                    <text x="30" y="260" fill="#99f6e4" fontSize="12" fontWeight="bold">
                      5. Lumière du tube séminifère : Spermatozoïdes (n, C)
                    </text>
                    <text x="330" y="260" fill="#2dd4bf" fontSize="9" fontWeight="bold">
                      [Différenciation / Spermiogenèse]
                    </text>

                    {/* Spermatozoïdes dessinés */}
                    <g transform="translate(140, 275) rotate(-25)">
                      <ellipse cx="0" cy="0" rx="7" ry="4" fill="#38bdf8" />
                      <line x1="7" y1="0" x2="35" y2="0" stroke="#38bdf8" strokeWidth="1.5" />
                    </g>
                    <g transform="translate(230, 290) rotate(15)">
                      <ellipse cx="0" cy="0" rx="7" ry="4" fill="#38bdf8" />
                      <line x1="7" y1="0" x2="35" y2="0" stroke="#38bdf8" strokeWidth="1.5" />
                    </g>
                    <g transform="translate(320, 275) rotate(-10)">
                      <ellipse cx="0" cy="0" rx="7" ry="4" fill="#38bdf8" />
                      <line x1="7" y1="0" x2="35" y2="0" stroke="#38bdf8" strokeWidth="1.5" />
                    </g>
                  </g>
                </svg>

                <p className="text-[11px] text-slate-400 text-center mt-2 italic">
                  Cliquez sur chaque strate cellulaire du tube séminifère pour afficher l’analyse cytologique.
                </p>
              </div>

              {/* Fiche d'identité de la cellule sélectionnée */}
              <div className="lg:col-span-5 bg-white border border-navy/15 rounded-2xl p-5 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-navy/10 pb-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                      Stade sélectionné
                    </span>
                    <h4 className="font-bold text-navy text-base mt-1">{currentSperm.name}</h4>
                  </div>
                  <span className="text-xs font-mono font-bold text-navy bg-navy/5 px-2.5 py-1 rounded-lg border border-navy/10">
                    {currentSperm.dna}
                  </span>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div>
                    <span className="font-bold text-navy/70 block uppercase text-[10px] tracking-wider">
                      Phase & Rôle
                    </span>
                    <p className="text-navy font-semibold">{currentSperm.type}</p>
                  </div>

                  <div>
                    <span className="font-bold text-navy/70 block uppercase text-[10px] tracking-wider">
                      Localisation histologique
                    </span>
                    <p className="text-text/80">{currentSperm.localisation}</p>
                  </div>

                  <div>
                    <span className="font-bold text-navy/70 block uppercase text-[10px] tracking-wider">
                      Détails cytologiques & Mécanisme
                    </span>
                    <p className="text-text/80 leading-relaxed bg-surface p-3 rounded-xl border border-navy/10">
                      {currentSperm.details}
                    </p>
                  </div>

                  <div>
                    <span className="font-bold text-navy/70 block uppercase text-[10px] tracking-wider">
                      Durée / Cinétique
                    </span>
                    <p className="text-teal-700 font-semibold">{currentSperm.duree}</p>
                  </div>
                </div>

                {/* Focus spermiogenèse si stade 4 */}
                {selectedCellStage === 4 && (
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs space-y-1">
                    <p className="font-bold text-amber-900 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Les 4 métamorphoses de la Spermiogenèse :
                    </p>
                    <ul className="list-disc list-inside text-amber-950/80 space-y-0.5">
                      <li>Acrosome (fusion des vésicules de l’appareil de Golgi)</li>
                      <li>Condensation du noyau (histones → protamines)</li>
                      <li>Flagelle issu du centriole distal</li>
                      <li>Élimination de la gouttelette cytoplasmique résiduelle</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ONGLET 2 : OVOGENÈSE & FOLLICULOGENÈSE                                     */}
        {/* ========================================================================= */}
        {activeTab === 'ovogenese' && (
          <div className="space-y-6">
            <div className="bg-rose-50/80 border border-rose-200 rounded-xl p-4 text-xs sm:text-sm text-rose-900 flex items-start gap-2.5">
              <Info className="w-5 h-5 text-rose-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Les 2 Blocages Méiotiques Capitaux au Bac :</span>
                <ul className="list-disc list-inside mt-1 space-y-0.5">
                  <li><strong>1er blocage :</strong> Prophase I (diplotène) dès le 7e mois fœtal (stade ovocyte I) → levé à la puberté par le pic de LH.</li>
                  <li><strong>2e blocage :</strong> Métaphase II (stade ovocyte II + GP1) expulsé à l’ovulation → levé <em>exclusivement</em> par la fécondation.</li>
                </ul>
              </div>
            </div>

            {/* Sélecteur de follicule horizontal */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {FOLLICLE_STAGES.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setSelectedFollicleStage(f.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
                    selectedFollicleStage === f.id
                      ? 'bg-rose-600 text-white border-rose-700 shadow-sm'
                      : 'bg-white text-navy hover:bg-rose-50 border-navy/10'
                  }`}
                >
                  {f.name}
                </button>
              ))}
            </div>

            {/* Panneau Folliculogenèse */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Représentation visuelle SVG */}
              <div className="lg:col-span-6 bg-slate-900 rounded-2xl p-5 border border-slate-800 text-white">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-rose-300">
                    Structure : {currentFollicle.name}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400">
                    Diamètre : {currentFollicle.taille}
                  </span>
                </div>

                <div className="flex items-center justify-center p-4 min-h-[220px]">
                  {selectedFollicleStage === 0 && (
                    <div className="text-center space-y-2">
                      <div className="w-20 h-20 rounded-full bg-rose-500/30 border-2 border-dashed border-rose-400 flex items-center justify-center mx-auto">
                        <div className="w-10 h-10 rounded-full bg-rose-400 flex items-center justify-center font-bold text-xs text-navy">
                          Ov I
                        </div>
                      </div>
                      <p className="text-xs text-rose-200">Ovocyte I bloqué en Prophase I + cellules plates</p>
                    </div>
                  )}

                  {selectedFollicleStage === 1 && (
                    <div className="text-center space-y-2">
                      <div className="w-28 h-28 rounded-full bg-rose-500/20 border-2 border-rose-400 flex items-center justify-center mx-auto p-2">
                        <div className="w-14 h-14 rounded-full bg-rose-300 flex items-center justify-center font-bold text-xs text-navy">
                          Ov I
                        </div>
                      </div>
                      <p className="text-xs text-rose-200">1 assise de cellules folliculaires cubiques</p>
                    </div>
                  )}

                  {selectedFollicleStage === 2 && (
                    <div className="text-center space-y-2">
                      <div className="w-36 h-36 rounded-full bg-rose-950 border-2 border-rose-500 flex items-center justify-center mx-auto p-4 shadow-lg shadow-rose-900/40">
                        <div className="w-16 h-16 rounded-full bg-rose-300 border-2 border-amber-300 flex items-center justify-center font-bold text-xs text-navy">
                          Ov I
                        </div>
                      </div>
                      <p className="text-xs text-rose-200">Granulosa pluristratifiée + Thèques externe et interne</p>
                    </div>
                  )}

                  {selectedFollicleStage === 3 && (
                    <div className="text-center space-y-2">
                      <div className="w-44 h-44 rounded-full bg-rose-950/80 border-2 border-rose-500 flex items-center justify-between p-4 mx-auto relative">
                        <div className="w-12 h-12 rounded-full bg-cyan-900/80 border border-cyan-400 flex items-center justify-center text-[10px] text-cyan-200">
                          Antrum
                        </div>
                        <div className="w-14 h-14 rounded-full bg-rose-300 border border-amber-300 flex items-center justify-center font-bold text-xs text-navy">
                          Ov I
                        </div>
                      </div>
                      <p className="text-xs text-rose-200">Liquide folliculaire (Antrum) sécréteur d’œstrogènes</p>
                    </div>
                  )}

                  {selectedFollicleStage === 4 && (
                    <div className="text-center space-y-2">
                      <div className="w-52 h-52 rounded-full bg-rose-950 border-2 border-amber-400 flex flex-col items-center justify-center mx-auto p-3 relative shadow-xl shadow-amber-500/20">
                        <div className="w-full text-center text-[10px] font-mono text-cyan-300 mb-1">
                          Vaste cavité antrale (liquide)
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-16 rounded-full bg-rose-200 border-2 border-amber-400 flex items-center justify-center font-bold text-xs text-navy">
                            Ov I → II
                          </div>
                          <span className="text-[9px] bg-amber-400 text-navy font-bold px-1.5 py-0.5 rounded">
                            Cumulus
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-amber-200">Follicule mûr pré-ovulatoire de De Graaf (20 mm)</p>
                    </div>
                  )}

                  {selectedFollicleStage === 5 && (
                    <div className="text-center space-y-3">
                      <div className="flex items-center justify-center gap-4">
                        <div className="w-20 h-20 rounded-full bg-amber-400 border-2 border-white flex flex-col items-center justify-center text-navy font-bold shadow-lg">
                          <span className="text-xs">Ovocyte II</span>
                          <span className="text-[9px] font-mono">n=23 (2C)</span>
                        </div>
                        <div className="w-7 h-7 rounded-full bg-rose-400 border border-white flex items-center justify-center text-[9px] font-bold text-white">
                          GP1
                        </div>
                      </div>
                      <p className="text-xs text-rose-200 font-semibold">
                        Expulsion à J14 : Ovocyte II bloqué en Métaphase II + 1er Globule Polaire
                      </p>
                    </div>
                  )}

                  {selectedFollicleStage === 6 && (
                    <div className="text-center space-y-2">
                      <div className="w-40 h-40 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 border-4 border-amber-300 flex flex-col items-center justify-center mx-auto p-2 text-navy shadow-lg shadow-amber-500/30">
                        <span className="font-black text-sm">Corps Jaune</span>
                        <span className="text-[10px] font-bold text-amber-950">Lutéinisation</span>
                        <span className="text-[9px] font-mono bg-white/70 px-2 py-0.5 rounded-full mt-1">
                          Progestérone +++
                        </span>
                      </div>
                      <p className="text-xs text-amber-200">Sans fécondation : régression en corps albicans</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Fiche descriptive du follicule */}
              <div className="lg:col-span-6 bg-white border border-navy/15 rounded-2xl p-5 shadow-sm space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200">
                    Étape du cycle folliculaire
                  </span>
                  <h4 className="font-bold text-navy text-lg mt-1">{currentFollicle.name}</h4>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="bg-surface p-3 rounded-xl border border-navy/10">
                    <span className="font-bold text-navy/70 block uppercase text-[10px] tracking-wider mb-0.5">
                      État nucléaire du gamète
                    </span>
                    <p className="font-bold text-rose-700">{currentFollicle.ovocyte}</p>
                  </div>

                  <div>
                    <span className="font-bold text-navy/70 block uppercase text-[10px] tracking-wider mb-1">
                      Caractéristiques histologiques & Fonctionnelles
                    </span>
                    <p className="text-text/80 leading-relaxed bg-surface p-3.5 rounded-xl border border-navy/10">
                      {currentFollicle.caracteristiques}
                    </p>
                  </div>
                </div>

                {/* Simulateur Déblocage Fécondation */}
                <div className="border-t border-navy/10 pt-4">
                  <div className="flex items-center justify-between gap-2">
                    <div>
                      <p className="font-bold text-navy text-xs">Simuler l’arrivée d’un spermatozoïde fécondant :</p>
                      <p className="text-[11px] text-text/60">Condition unique pour lever le 2e blocage (Métaphase II)</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsFertilized(!isFertilized)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        isFertilized
                          ? 'bg-emerald-600 text-white'
                          : 'bg-navy text-white hover:bg-navy/90'
                      }`}
                    >
                      {isFertilized ? 'Fécondation simulée !' : 'Injecter spermatozoïde'}
                    </button>
                  </div>

                  {isFertilized && (
                    <div className="mt-3 bg-emerald-50 border border-emerald-200 rounded-xl p-3 text-xs text-emerald-950 space-y-1 animate-fadeIn">
                      <p className="font-bold flex items-center gap-1.5 text-emerald-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Fin triomphale de la méiose femelle !
                      </p>
                      <p className="leading-relaxed">
                        L’entrée du spermatozoïde déclenche une vague calcique : achèvement de l’anaphase II et de la télophase II, expulsion du <strong>2e globule polaire (GP2)</strong> et formation du pronoyau femelle qui fusionne avec le pronoyau mâle (caryogamie → zygote 2n).
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* ONGLET 3 : COURBE ADN COMPARÉE & TABLEAU DE PLOÏDIE                        */}
        {/* ========================================================================= */}
        {activeTab === 'adn-compare' && (
          <div className="space-y-6">
            <div className="bg-purple-50/70 border border-purple-200 rounded-xl p-4 text-xs sm:text-sm text-purple-900 flex items-start gap-2.5">
              <Dna className="w-5 h-5 text-purple-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Règle d’or du Bac S2 :</span> Ne confondez jamais <strong>ploïdie</strong> (nombre de chromosomes : 2n ou n) et <strong>quantité d’ADN</strong> (Q, 2Q ou 4Q).
                Un spermatocyte II est haploïde (n) mais contient 2Q d’ADN car chaque chromosome est constitué de 2 chromatides sœurs !
              </div>
            </div>

            {/* Graphe SVG de l'évolution de la quantité d'ADN */}
            <div className="bg-slate-900 rounded-2xl p-5 border border-slate-800 text-white">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                <h4 className="font-bold text-sm text-purple-300">
                  Graphe d’évolution de la quantité d’ADN par cellule au cours de la gamétogenèse
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400">Étape active :</span>
                  <span className="text-xs font-mono font-bold text-teal-400 bg-teal-500/20 px-2 py-0.5 rounded border border-teal-400/30">
                    {timelineStep === 1 && '1. Gonie (2n, 2Q)'}
                    {timelineStep === 2 && '2. Réplication S (2n, 4Q)'}
                    {timelineStep === 3 && '3. Méiose I Réductionnelle (n, 2Q)'}
                    {timelineStep === 4 && '4. Méiose II Équationnelle (n, Q)'}
                  </span>
                </div>
              </div>

              <svg viewBox="0 0 600 240" className="w-full h-auto">
                {/* Axes */}
                <line x1="50" y1="200" x2="570" y2="200" stroke="#475569" strokeWidth="2" />
                <line x1="50" y1="30" x2="50" y2="200" stroke="#475569" strokeWidth="2" />

                {/* Marqueurs axe Y */}
                <text x="25" y="204" fill="#94a3b8" fontSize="10" fontWeight="bold">0</text>
                <line x1="45" y1="160" x2="55" y2="160" stroke="#94a3b8" />
                <text x="25" y="164" fill="#94a3b8" fontSize="10" fontWeight="bold">Q</text>
                <line x1="45" y1="110" x2="55" y2="110" stroke="#94a3b8" />
                <text x="20" y="114" fill="#94a3b8" fontSize="10" fontWeight="bold">2Q</text>
                <line x1="45" y1="50" x2="55" y2="50" stroke="#94a3b8" />
                <text x="20" y="54" fill="#94a3b8" fontSize="10" fontWeight="bold">4Q</text>

                {/* Lignes horizontales repères */}
                <line x1="50" y1="160" x2="570" y2="160" stroke="#334155" strokeDasharray="4" />
                <line x1="50" y1="110" x2="570" y2="110" stroke="#334155" strokeDasharray="4" />
                <line x1="50" y1="50" x2="570" y2="50" stroke="#334155" strokeDasharray="4" />

                {/* Courbe ADN :
                    1. Gonie G1 : (50, 110) à (120, 110) -> 2Q
                    2. Phase S : (120, 110) à (180, 50) -> montée vers 4Q
                    3. G2 & Prophase I : (180, 50) à (280, 50) -> plateau 4Q
                    4. Fin Méiose I (Anaphase I/Télophase I) : (280, 50) à (320, 110) -> chute à 2Q
                    5. Intercinèse brève & Méiose II : (320, 110) à (420, 110) -> plateau 2Q
                    6. Fin Méiose II (Anaphase II/Télophase II) : (420, 110) à (460, 160) -> chute à Q
                    7. Gamète final (spermatide / spermatozoïde / ovotide) : (460, 160) à (550, 160) -> plateau Q
                */}
                <polyline
                  points="50,110 120,110 180,50 280,50 320,110 420,110 460,160 550,160"
                  fill="none"
                  stroke="#a855f7"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Zones colorées sous la courbe */}
                <polygon
                  points="50,200 50,110 120,110 180,50 280,50 320,110 420,110 460,160 550,160 550,200"
                  fill="#a855f7"
                  opacity="0.1"
                />

                {/* Indicateurs interactifs */}
                {timelineStep === 1 && (
                  <circle cx="85" cy="110" r="7" fill="#38bdf8" stroke="#fff" strokeWidth="2" />
                )}
                {timelineStep === 2 && (
                  <circle cx="230" cy="50" r="7" fill="#38bdf8" stroke="#fff" strokeWidth="2" />
                )}
                {timelineStep === 3 && (
                  <circle cx="370" cy="110" r="7" fill="#38bdf8" stroke="#fff" strokeWidth="2" />
                )}
                {timelineStep === 4 && (
                  <circle cx="505" cy="160" r="7" fill="#38bdf8" stroke="#fff" strokeWidth="2" />
                )}

                {/* Annotations textuelles sous l'axe X */}
                <text x="65" y="220" fill="#94a3b8" fontSize="9">Gonie (G1)</text>
                <text x="135" y="220" fill="#94a3b8" fontSize="9">Phase S</text>
                <text x="210" y="220" fill="#94a3b8" fontSize="9">Gamétocyte I</text>
                <text x="330" y="220" fill="#94a3b8" fontSize="9">Div. Réductionnelle</text>
                <text x="430" y="220" fill="#94a3b8" fontSize="9">Div. Équationnelle</text>
                <text x="500" y="220" fill="#94a3b8" fontSize="9">Gamète (Q)</text>
              </svg>

              {/* Boutons de contrôle de la chronologie */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
                {[
                  { step: 1, label: '1. Gonie (2n, 2Q)' },
                  { step: 2, label: '2. Réplication S (2n, 4Q)' },
                  { step: 3, label: '3. Méiose I (n, 2Q)' },
                  { step: 4, label: '4. Méiose II (n, Q)' },
                ].map((btn) => (
                  <button
                    key={btn.step}
                    type="button"
                    onClick={() => setTimelineStep(btn.step)}
                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                      timelineStep === btn.step
                        ? 'bg-purple-600 text-white border-purple-400 shadow-md'
                        : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border-slate-700'
                    }`}
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Tableau comparatif Récapitulatif Bac */}
            <div className="bg-white rounded-2xl border border-navy/15 shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-navy to-slate-800 p-4 text-white font-bold text-sm">
                Tableau comparatif officiel : Spermatogenèse vs Ovogenèse
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-surface text-navy font-bold uppercase text-[11px] border-b border-navy/10">
                    <tr>
                      <th className="p-3">Critère de comparaison</th>
                      <th className="p-3 text-blue-700">Spermatogenèse (♂)</th>
                      <th className="p-3 text-rose-700">Ovogenèse (♀)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-navy/10">
                    <tr>
                      <td className="p-3 font-semibold text-navy">Lieu de formation</td>
                      <td className="p-3 text-text/80">Tubes séminifères des testicules</td>
                      <td className="p-3 text-text/80">Follicules du cortex ovarien</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-navy">Période d’activité</td>
                      <td className="p-3 text-text/80">Continue de la puberté à la mort</td>
                      <td className="p-3 text-text/80">Cyclique de la puberté à la ménopause (~50 ans)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-navy">Stock initial de gonies</td>
                      <td className="p-3 text-text/80">Renouvelable indéfiniment par mitoses</td>
                      <td className="p-3 text-text/80">Fini, bloqué dès le 7e mois fœtal (stock non renouvelable)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-navy">Blocages méiotiques</td>
                      <td className="p-3 text-emerald-700 font-bold">Aucun (méiose continue)</td>
                      <td className="p-3 text-rose-700 font-bold">2 blocages : Prophase I (in utero) & Métaphase II (ovulation)</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-navy">Rendement cellulaire</td>
                      <td className="p-3 text-text/80">1 spermatogonie → 4 spermatozoïdes utiles</td>
                      <td className="p-3 text-text/80">1 ovogonie → 1 seul ovocyte II utile + 2 ou 3 globules polaires</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-navy">Différenciation morphologique</td>
                      <td className="p-3 text-blue-700 font-bold">Présente (spermiogenèse : acrosome, flagelle)</td>
                      <td className="p-3 text-rose-700 font-bold">Absente (pas de spermiogenèse femelle)</td>
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

