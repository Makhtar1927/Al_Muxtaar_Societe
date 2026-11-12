'use client';

import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

type StepType = 'lesion' | 'vasodilatation' | 'diapedese' | 'adhesion' | 'ingestion' | 'digestion' | 'presentation';

export default function B3ImmuniteInneeInteractiveLab() {
  const [step, setStep] = useState<StepType>('lesion');

  const getStepDetails = (s: StepType) => {
    switch (s) {
      case 'lesion':
        return {
          titre: '1. Brèche Tissulaire & Entrée des Pathogènes',
          statut: 'Inoculation bactérienne cutanée',
          description: 'Une piqûre d\'épine ou coupure franchit la barrière mécanique de la peau. Des bactéries pénètrent dans le derme et libèrent des toxines. Les cellules résidentes (mastocytes, macrophages) détectent les motifs microbiens (PAMP) via leurs récepteurs PRR.',
          boxColor: 'border-red-200 bg-red-50/50 text-red-950',
          badgeColor: 'bg-red-100 text-red-800 border-red-200',
        };
      case 'vasodilatation':
        return {
          titre: '2. Libération de Médiateurs & Vasodilatation',
          statut: 'Signes cardinaux de l\'inflammation',
          description: 'Les mastocytes dégranulent et libèrent de l\'histamine et des prostaglandines. Conséquences immédiates : vasodilatation artériolaire (rougeur et chaleur) et augmentation de la perméabilité capillaire créant un œdème plasmatique (gonflement et douleur par compression nerveuse).',
          boxColor: 'border-amber-200 bg-amber-50/50 text-amber-950',
          badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
        };
      case 'diapedese':
        return {
          titre: '3. Diapédèse Leucocytaire Active',
          statut: 'Recrutement des phagocytes',
          description: 'Sous l\'action de facteurs chimiotactiques (cytokines), les polynucléaires neutrophiles et les monocytes circulants ralentissent (roulement), adhèrent aux sélectines endothéliales puis s\'immiscent entre deux cellules de la paroi capillaire par émission de pseudopodes.',
          boxColor: 'border-blue-200 bg-blue-50/50 text-blue-950',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
        };
      case 'adhesion':
        return {
          titre: '4. Phase d\'Adhésion Phagocytaire',
          statut: 'Reconnaissance membranaires',
          description: 'Le macrophage ou granulocyte entre en contact direct avec la bactérie. La fixation s\'opère grâce aux récepteurs PRR reconnaissant les polysaccharides bactériens, ou via les opsonines (anticorps ou protéines du complément C3b fixés sur le microbe).',
          boxColor: 'border-cyan-200 bg-cyan-50/50 text-cyan-950',
          badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
        };
      case 'ingestion':
        return {
          titre: '5. Phase d\'Ingestion & Formation du Phagosome',
          statut: 'Endocytose membranaire',
          description: 'Le phagocyte déploie des expansions cytoplasmiques (pseudopodes) qui enserrent la bactérie. Les membranes fusionnent pour séquestrer le micro-organisme dans une vésicule intracellulaire close : le phagosome.',
          boxColor: 'border-indigo-200 bg-indigo-50/50 text-indigo-950',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        };
      case 'digestion':
        return {
          titre: '6. Digestion Enzymatique (Phagolysosome)',
          statut: 'Destruction lytique',
          description: 'Les lysosomes du phagocyte fusionnent avec le phagosome pour former le phagolysosome. Le cocktail d\'hydrolases acides, de lysozyme et de radicaux libres oxydants digère et détruit la paroi et l\'ADN bactériens en quelques minutes.',
          boxColor: 'border-purple-200 bg-purple-50/50 text-purple-950',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
        };
      case 'presentation':
      default:
        return {
          titre: '7. Rejet des Débris & Présentation de l\'Antigène (CPA)',
          statut: 'Transition vers l\'immunité adaptative',
          description: 'Les résidus non digestibles sont rejetés par exocytose. Étape capitale du Bac : le macrophage associe des fragments peptidiques microbiens aux molécules du CMH de classe II sur sa membrane pour devenir Cellule Présentatrice d\'Antigène (CPA) prête à stimuler les LT4 !',
          boxColor: 'border-emerald-200 bg-emerald-50/50 text-emerald-950',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        };
    }
  };

  const current = getStepDetails(step);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 space-y-5 shadow-xs text-slate-800">
      {/* En-tête du banc d'essai */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-700 block">
            Laboratoire Virtuel d'Immunologie Cellulaire
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-0.5">
            Microscope Virtuel : Réaction Inflammatoire & Étapes de la Phagocytose
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Animation pas à pas de l'agression tissulaire, diapédèse leucocytaire et présentation antigénique sur CMH II.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setStep('lesion')}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          Réinitialiser au début
        </button>
      </div>

      {/* PLANCHE ANATOMIQUE VECTORIELLE MÉDICALE */}
      <div className="border border-slate-200 rounded-lg p-3 sm:p-4 bg-slate-50/40 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-600 border-b border-slate-200 pb-2">
          <span className="font-bold uppercase tracking-wider text-slate-700">
            Coupe Histologique Cutanée : Épiderme, Derme, Capillaire Sanguin & Phagocyte
          </span>
          <span className={`font-semibold text-[11px] px-2 py-0.5 rounded border ${current.badgeColor}`}>
            {current.statut}
          </span>
        </div>

        <svg viewBox="0 0 860 440" className="w-full h-auto max-h-[420px] bg-white rounded border border-slate-200 select-none">
          <defs>
            {/* Dégradé épiderme cutané */}
            <linearGradient id="epidermeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fed7aa" />
              <stop offset="100%" stopColor="#fdba74" />
            </linearGradient>

            {/* Dégradé derme conjonctif */}
            <linearGradient id="dermeGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fff7ed" />
              <stop offset="100%" stopColor="#ffedd5" />
            </linearGradient>

            {/* Dégradé capillaire sanguin */}
            <linearGradient id="capillaryGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fca5a5" />
              <stop offset="50%" stopColor="#fee2e2" />
              <stop offset="100%" stopColor="#fca5a5" />
            </linearGradient>
          </defs>

          {/* 1. ÉPIDERME CUTANÉ (Couche supérieure protectrice) */}
          <rect x="0" y="0" width="860" height="45" fill="url(#epidermeGrad)" stroke="#ea580c" strokeWidth="1" />
          <text x="30" y="28" fill="#9a3412" fontSize="11" fontWeight="bold">ÉPIDERME (Barrière épithéliale)</text>

          {/* Lésion cutanée mécanique (Épine pénétrante au centre) */}
          {step === 'lesion' && (
            <g id="epine_lesion">
              {/* Brèche dans l'épiderme */}
              <polygon points="400,0 435,0 422,50 412,50" fill="#fff7ed" stroke="#c2410c" strokeWidth="1.5" />
              {/* Épine de bois */}
              <polygon points="410,-20 425,-20 420,70 415,70" fill="#78350f" stroke="#451a03" strokeWidth="1.5" />
              <text x="435" y="30" fill="#78350f" fontSize="10" fontWeight="bold">Épine / Corps étranger</text>
            </g>
          )}

          {/* 2. DERME TISSULAIRE (Matrice conjonctive où siège l'inflammation) */}
          <rect x="0" y="45" width="860" height="235" fill="url(#dermeGrad)" />
          <text x="30" y="70" fill="#c2410c" fontSize="10.5" fontWeight="bold">DERME VASCULARISÉ (Tissu conjonctif)</text>

          {/* Bactéries inoculées (bâtonnets verts/bactéries pathogènes) */}
          <g id="bacteries" transform="translate(400, 75)">
            <rect x="-10" y="0" width="16" height="7" rx="3.5" fill="#15803d" stroke="#14532d" strokeWidth="1" />
            <rect x="15" y="-5" width="15" height="6.5" rx="3" fill="#15803d" stroke="#14532d" strokeWidth="1" />
            <rect x="5" y="15" width="16" height="7" rx="3.5" fill="#15803d" stroke="#14532d" strokeWidth="1" />
            <text x="38" y="10" fill="#14532d" fontSize="9.5" fontWeight="bold">Bactéries pathogènes (Non-Soi)</text>
          </g>

          {/* Mastocyte résident libérant l'histamine */}
          <g id="mastocyte" transform="translate(180, 110)">
            <ellipse cx="0" cy="0" rx="30" ry="22" fill="#fbcfe8" stroke="#db2777" strokeWidth="1.5" />
            <text x="0" y="3" fill="#9d174d" fontSize="8.5" fontWeight="bold" textAnchor="middle">Mastocyte</text>
            
            {/* Granulations d'histamine libérées lors de la vasodilatation */}
            {(step === 'vasodilatation' || step === 'diapedese') && (
              <g fill="#ec4899">
                <circle cx="28" cy="-5" r="2.5" />
                <circle cx="35" cy="5" r="2.5" />
                <circle cx="25" cy="15" r="2.5" />
                <circle cx="45" cy="22" r="2.5" />
                <text x="40" y="-12" fill="#be185d" fontSize="8.5" fontWeight="bold">Histamine (Médiateur)</text>
              </g>
            )}
          </g>

          {/* 3. CAPILLAIRE SANGUIN & DIAPÉDÈSE (Partie inférieure de 280 à 440) */}
          <rect x="0" y="280" width="860" height="150" fill="url(#capillaryGrad)" stroke="#ef4444" strokeWidth="2" />
          <text x="30" y="305" fill="#991b1b" fontSize="10.5" fontWeight="bold">CAPILLAIRE SANGUIN DERMIQUE</text>

          {/* Cellules endothéliales de la paroi capillaire */}
          <g fill="#f87171" stroke="#b91c1c" strokeWidth="1.2">
            {/* Ligne endothéliale supérieure */}
            <rect x="50" y="276" width="100" height="8" rx="3" />
            <rect x="160" y="276" width="100" height="8" rx="3" />
            <rect x="270" y="276" width="100" height="8" rx="3" />
            {/* Brèche de diapédèse entre 380 et 420 */}
            <rect x="420" y="276" width="100" height="8" rx="3" />
            <rect x="530" y="276" width="100" height="8" rx="3" />
            <rect x="640" y="276" width="100" height="8" rx="3" />
          </g>

          {/* Globules rouges circulants (Hématies anucléées biconcaves) */}
          <g fill="#dc2626" stroke="#991b1b" strokeWidth="1">
            <ellipse cx="120" cy="350" rx="14" ry="7" />
            <ellipse cx="250" cy="370" rx="14" ry="7" />
            <ellipse cx="580" cy="360" rx="14" ry="7" />
            <ellipse cx="720" cy="340" rx="14" ry="7" />
          </g>

          {/* PHAGOCYTE (Monocyte / Macrophage / Polynucléaire Neutrophile) DYNAMIQUE SELON L'ÉTAPE */}
          {/* Étape DIAPÉDÈSE : Phagocyte se faufilant à travers la fente endothéliale */}
          {step === 'diapedese' && (
            <g id="leucocyte_diapedese" transform="translate(390, 260)">
              {/* Forme déformée en sablier passant la fente */}
              <path
                d="M 0 35 C -15 35, -20 20, -10 0 C -5 -10, -15 -25, 0 -35 C 15 -25, 5 -10, 10 0 C 20 20, 15 35, 0 35 Z"
                fill="#e0e7ff"
                stroke="#4338ca"
                strokeWidth="1.8"
              />
              <circle cx="0" cy="18" r="7" fill="#6366f1" />
              <text x="35" y="5" fill="#3730a3" fontSize="9.5" fontWeight="bold">Diapédèse active</text>
              <text x="35" y="17" fill="#64748b" fontSize="8">(Émission de pseudopodes)</text>
            </g>
          )}

          {/* Étape ADHÉSION, INGESTION, DIGESTION & PRÉSENTATION : Phagocyte dans le derme */}
          {(step === 'adhesion' || step === 'ingestion' || step === 'digestion' || step === 'presentation') && (
            <g id="macrophage_actif" transform="translate(420, 150)">
              {/* Corps cellulaire du macrophage avec pseudopodes */}
              {step === 'ingestion' ? (
                // Pseudopodes enserrant la bactérie
                <path
                  d="M -40 0 C -45 -35, -15 -45, 10 -40 C 25 -35, 30 -25, 20 -15 C 35 -10, 45 15, 30 35 C 10 45, -30 40, -40 0 Z"
                  fill="#e0f2fe"
                  stroke="#0284c7"
                  strokeWidth="2"
                />
              ) : (
                <ellipse cx="0" cy="0" rx="46" ry="34" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
              )}

              {/* Noyau réniforme du macrophage */}
              <path d="M -22 -12 C -28 0, -25 15, -12 18 C -5 20, -12 5, -14 -8 Z" fill="#0369a1" />

              {/* Lysosomes intracellulaires (vésicules enzymatiques) */}
              <circle cx="-15" cy="-18" r="4" fill="#a855f7" />
              <circle cx="18" cy="15" r="4" fill="#a855f7" />

              {/* DÉTAIL PARTICULIER PAR SOUS-ÉTAPE */}
              {step === 'adhesion' && (
                <g transform="translate(40, -5)">
                  {/* Bactérie en contact membranaire avec récepteurs PRR */}
                  <rect x="0" y="0" width="15" height="7" rx="3.5" fill="#15803d" stroke="#14532d" strokeWidth="1" />
                  <text x="20" y="8" fill="#0284c7" fontSize="9" fontWeight="bold">Adhésion (PRR-PAMP)</text>
                </g>
              )}

              {step === 'ingestion' && (
                <g transform="translate(10, -8)">
                  {/* Bactérie enfermée dans le phagosome */}
                  <circle cx="0" cy="0" r="10" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.2" strokeDasharray="2 2" />
                  <rect x="-6" y="-3" width="12" height="6" rx="3" fill="#15803d" />
                  <text x="18" y="3" fill="#0369a1" fontSize="9" fontWeight="bold">Phagosome formé</text>
                </g>
              )}

              {step === 'digestion' && (
                <g transform="translate(5, -5)">
                  {/* Phagolysosome : fusion lysosome + phagosome et débris bactériens */}
                  <circle cx="0" cy="0" r="13" fill="#f3e8ff" stroke="#9333ea" strokeWidth="1.5" />
                  <circle cx="-4" cy="-3" r="2.5" fill="#15803d" />
                  <circle cx="3" cy="2" r="2" fill="#15803d" />
                  <text x="22" y="3" fill="#7e22ce" fontSize="9" fontWeight="bold">Phagolysosome (Lyse)</text>
                </g>
              )}

              {step === 'presentation' && (
                <g>
                  {/* Complexe CMH II + Peptide antigénique exposé à la membrane */}
                  <g transform="translate(36, -24)">
                    {/* Molécule de CMH II (Deux chaînes formant une pince) */}
                    <path d="M 0 0 L 8 -8 M 4 4 L 12 -4" stroke="#059669" strokeWidth="2.5" strokeLinecap="round" />
                    {/* Peptide antigénique fixé au centre de la corbeille */}
                    <circle cx="10" cy="-6" r="3" fill="#dc2626" />
                    <text x="18" y="-4" fill="#065f46" fontSize="9.5" fontWeight="bold">CMH II + Peptide</text>
                  </g>
                  <text x="0" y="55" fill="#0284c7" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Cellule Présentatrice d'Antigène (CPA)
                  </text>
                </g>
              )}
            </g>
          )}
        </svg>
      </div>

      {/* Explication physiologique de l'étape active */}
      <div className={`p-4 rounded-xl border text-xs leading-relaxed ${current.boxColor}`}>
        <span className="font-bold uppercase tracking-wider block mb-1">
          {current.titre}
        </span>
        <p>{current.description}</p>
      </div>

      {/* Barre de navigation chronologique des 7 étapes */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
          Chronologie Expérimentale des Événements
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-1.5">
          {[
            { id: 'lesion', label: '1. Brèche' },
            { id: 'vasodilatation', label: '2. Vasodilatation' },
            { id: 'diapedese', label: '3. Diapédèse' },
            { id: 'adhesion', label: '4. Adhésion' },
            { id: 'ingestion', label: '5. Ingestion' },
            { id: 'digestion', label: '6. Digestion' },
            { id: 'presentation', label: '7. CMH II (CPA)' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setStep(item.id as StepType)}
              className={`p-2 rounded-lg border text-center text-xs font-semibold transition-all ${
                step === item.id
                  ? 'border-slate-800 bg-slate-900 text-white shadow-xs'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

