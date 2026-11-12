'use client';

import { useState } from 'react';
import { Play, RotateCcw, Info, Activity, ShieldAlert, Award } from 'lucide-react';

type LabViewMode =
  | 'synapse'
  | 'zinkernagel'
  | 'cascade_lt4'
  | 'perforine_apoptose'
  | 'comparatif';

export default function B3ImmuniteCellulaireInteractiveLab() {
  const [viewMode, setViewMode] = useState<LabViewMode>('synapse');
  const [synapseStep, setSynapseStep] = useState<number>(1);
  const [zinkernagelLot, setZinkernagelLot] = useState<number>(1);
  const [apoptoseStep, setApoptoseStep] = useState<number>(1);
  const [showHelperInfo, setShowHelperInfo] = useState<boolean>(true);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden my-8">
      {/* En-tête du Laboratoire Virtuel */}
      <div className="bg-gradient-to-r from-red-950 via-red-900 to-rose-900 text-white p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="bg-rose-500/20 text-rose-200 text-xs font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider border border-rose-400/30">
              Laboratoire Virtuel Réaliste
            </span>
            <span className="text-rose-200 text-xs">Biologie Cellulaire & Expérimentation Bac S2</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSynapseStep(1);
                setZinkernagelLot(1);
                setApoptoseStep(1);
              }}
              className="flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors"
            >
              <RotateCcw size={13} />
              <span>Réinitialiser</span>
            </button>
          </div>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Simulateur Interactif : Synapse Immunologique, Cytotoxicité & Expériences Historiques
        </h2>
        <p className="text-rose-100/90 text-sm mt-1 max-w-3xl">
          Visualisez la double reconnaissance TCR-CMH I, le pivot central des LT4 via l'IL-2, le mécanisme moléculaire du baiser de la mort (perforine/granzyme/caspases) et l'expérience de Zinkernagel et Doherty.
        </p>
      </div>

      {/* Barre de sélection des vues */}
      <div className="border-b border-gray-200 bg-gray-50/90 p-2 sm:p-3 overflow-x-auto scrollbar-thin">
        <div className="flex gap-2 min-w-max">
          <button
            onClick={() => setViewMode('synapse')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'synapse'
                ? 'bg-red-800 text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            1. Synapse Immunologique TCR / CD8 / CMH I
          </button>
          <button
            onClick={() => setViewMode('cascade_lt4')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'cascade_lt4'
                ? 'bg-red-800 text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            2. Pivot Central des LT4 (IL-2 Autocrine & Paracrine)
          </button>
          <button
            onClick={() => setViewMode('perforine_apoptose')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'perforine_apoptose'
                ? 'bg-red-800 text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            3. Baiser de la Mort (Perforines, Granzymes & Caspases)
          </button>
          <button
            onClick={() => setViewMode('zinkernagel')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'zinkernagel'
                ? 'bg-red-800 text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            4. Expérience de Zinkernagel & Doherty (Restriction CMH)
          </button>
          <button
            onClick={() => setViewMode('comparatif')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'comparatif'
                ? 'bg-red-800 text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            5. Tableau Comparatif LT4 vs LT8 vs LB
          </button>
        </div>
      </div>

      {/* Zone d'affichage Interactive */}
      <div className="p-4 sm:p-6 space-y-6">
        {/* VUE 1 : SYNAPSE IMMUNOLOGIQUE */}
        {viewMode === 'synapse' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-red-50 p-3.5 rounded-xl border border-red-100">
              <div>
                <span className="text-xs font-bold text-red-800 uppercase tracking-wide">
                  Étape {synapseStep} / 3 :
                </span>
                <span className="text-sm font-semibold text-gray-900 ml-2">
                  {synapseStep === 1 && "Approche cellulaire & Reconnaissance de contact"}
                  {synapseStep === 2 && "Double arrimage : TCR-Peptide et CD8-CMH I (α3)"}
                  {synapseStep === 3 && "Activation intracellulaire du LT8 via le complexe CD3"}
                </span>
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3].map((step) => (
                  <button
                    key={step}
                    onClick={() => setSynapseStep(step)}
                    className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                      synapseStep === step
                        ? 'bg-red-800 text-white shadow-xs'
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    Étape {step}
                  </button>
                ))}
              </div>
            </div>

            {/* Schéma SVG Vectoriel : Synapse TCR-CD8-CMH I */}
            <div className="border border-gray-200 rounded-xl bg-slate-900 p-4 overflow-x-auto flex justify-center">
              <svg viewBox="0 0 760 400" className="w-full max-w-3xl h-auto select-none">
                <defs>
                  <linearGradient id="gradCellTarget" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#334155" />
                    <stop offset="100%" stopColor="#1e293b" />
                  </linearGradient>
                  <linearGradient id="gradLt8" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#991b1b" />
                    <stop offset="100%" stopColor="#7f1d1d" />
                  </linearGradient>
                  <filter id="glowRed" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>

                {/* Arrière-plan grille labo */}
                <pattern id="gridSubtle" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.5" strokeOpacity="0.3" />
                </pattern>
                <rect width="760" height="400" fill="url(#gridSubtle)" />

                {/* 1. Cellule Cible Infectée (en haut) */}
                <path
                  d="M 50 100 C 180 120, 580 120, 710 100 L 710 20 L 50 20 Z"
                  fill="url(#gradCellTarget)"
                  stroke="#475569"
                  strokeWidth="2"
                />
                <text x="70" y="50" fill="#94a3b8" fontSize="13" fontWeight="bold">
                  CELLULE CIBLE INFECTÉE (du Soi altéré)
                </text>
                <text x="70" y="70" fill="#64748b" fontSize="11">
                  Présentation des peptides du Non-Soi via les molécules du CMH I
                </text>

                {/* Virus intracellulaires */}
                <circle cx="620" cy="55" r="12" fill="#ef4444" fillOpacity="0.4" stroke="#f87171" strokeWidth="1.5" strokeDasharray="2,2" />
                <text x="620" y="59" fill="#fecaca" fontSize="9" textAnchor="middle" fontWeight="bold">Virus</text>

                {/* Molécule du CMH I (α1, α2 sillon, α3 domaine invariant, β2m) */}
                <g transform="translate(380, 115)">
                  {/* Membrane de la cellule cible */}
                  <line x1="-120" y1="0" x2="120" y2="0" stroke="#64748b" strokeWidth="3" />

                  {/* Domaine α3 */}
                  <rect x="-35" y="8" width="30" height="26" rx="4" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.5" />
                  <text x="-20" y="25" fill="#eff6ff" fontSize="10" textAnchor="middle" fontWeight="bold">α3</text>

                  {/* β2-microglobuline */}
                  <rect x="5" y="8" width="30" height="26" rx="4" fill="#60a5fa" stroke="#2563eb" strokeWidth="1.5" />
                  <text x="20" y="25" fill="#eff6ff" fontSize="10" textAnchor="middle" fontWeight="bold">β2m</text>

                  {/* Domaines polymorphes α1 et α2 formant le sillon */}
                  <path d="M -45 38 Q -20 38 -15 65 Q -5 45 15 65 Q 20 38 45 38 Z" fill="#2563eb" stroke="#1d4ed8" strokeWidth="1.5" />
                  <text x="-25" y="52" fill="#dbeafe" fontSize="9" fontWeight="bold">α1</text>
                  <text x="18" y="52" fill="#dbeafe" fontSize="9" fontWeight="bold">α2</text>

                  {/* Peptide Antigénique Viral (rouge) */}
                  <rect
                    x="-12"
                    y="55"
                    width="24"
                    height="12"
                    rx="3"
                    fill="#ef4444"
                    stroke="#dc2626"
                    strokeWidth="1.5"
                    filter={synapseStep >= 2 ? "url(#glowRed)" : undefined}
                  />
                  <text x="0" y="64" fill="#ffffff" fontSize="8" textAnchor="middle" fontWeight="bold">Peptide</text>
                </g>

                {/* 2. Synapse & Molécules du LT8 (en bas) */}
                {/* Corps cellulaire LT8 */}
                <path
                  d="M 50 300 C 180 280, 580 280, 710 300 L 710 380 L 50 380 Z"
                  fill="url(#gradLt8)"
                  stroke="#b91c1c"
                  strokeWidth="2"
                />
                <text x="70" y="350" fill="#fecaca" fontSize="13" fontWeight="bold">
                  LYMPHOCYTE T8 NAÏF (ou LTC EFFECTEUR)
                </text>
                <text x="70" y="370" fill="#fca5a5" fontSize="11">
                  Équipé de récepteurs TCR spécifiques et du corécepteur CD8
                </text>

                {/* Complexe TCR + CD3 + CD8 */}
                <g transform="translate(380, 285)">
                  {/* Membrane du LT8 */}
                  <line x1="-120" y1="0" x2="120" y2="0" stroke="#f87171" strokeWidth="3" />

                  {/* Corécepteur CD8 (se lie au domaine α3 du CMH I) */}
                  <path
                    d="M -50 0 L -50 -75 L -35 -75 L -35 0 Z"
                    fill="#10b981"
                    stroke="#047857"
                    strokeWidth="1.5"
                  />
                  <text x="-42" y="-35" fill="#ffffff" fontSize="9" textAnchor="middle" fontWeight="bold" transform="rotate(-90 -42 -35)">
                    CD8
                  </text>

                  {/* Complexe CD3 invariant (transduction de signal) */}
                  <rect x="-85" y="-60" width="18" height="60" rx="3" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
                  <text x="-76" y="-30" fill="#ffffff" fontSize="8" textAnchor="middle" fontWeight="bold" transform="rotate(-90 -76 -30)">CD3 γ/ε</text>

                  <rect x="65" y="-60" width="18" height="60" rx="3" fill="#f59e0b" stroke="#d97706" strokeWidth="1" />
                  <text x="74" y="-30" fill="#ffffff" fontSize="8" textAnchor="middle" fontWeight="bold" transform="rotate(-90 74 -30)">CD3 δ/ε</text>

                  {/* TCR (Chaînes α et β avec domaines constants et variables) */}
                  {/* Chaîne alpha */}
                  <path d="M -18 0 L -18 -40 L -28 -70 L -10 -70 L 0 -40 L 0 0 Z" fill="#e11d48" stroke="#be123c" strokeWidth="1.5" />
                  <text x="-12" y="-20" fill="#ffe4e6" fontSize="9" textAnchor="middle" fontWeight="bold">Cα</text>
                  <text x="-18" y="-55" fill="#ffffff" fontSize="9" textAnchor="middle" fontWeight="bold">Vα</text>

                  {/* Chaîne bêta */}
                  <path d="M 0 0 L 0 -40 L 10 -70 L 28 -70 L 18 -40 L 18 0 Z" fill="#be123c" stroke="#9f1239" strokeWidth="1.5" />
                  <text x="9" y="-20" fill="#ffe4e6" fontSize="9" textAnchor="middle" fontWeight="bold">Cβ</text>
                  <text x="18" y="-55" fill="#ffffff" fontSize="9" textAnchor="middle" fontWeight="bold">Vβ</text>

                  {/* Paratope du TCR formant la poche de reconnaissance */}
                  <path d="M -12 -70 Q 0 -62 12 -70" stroke="#fecdd3" strokeWidth="2" fill="none" />
                </g>

                {/* État de la synapse selon l'étape */}
                {synapseStep >= 2 && (
                  <g>
                    {/* Flèche de reconnaissance CD8 -> alpha3 */}
                    <path d="M 330 205 L 345 145" stroke="#34d399" strokeWidth="2" strokeDasharray="3,3" />
                    <text x="270" y="175" fill="#34d399" fontSize="10" fontWeight="bold">Liaison CD8 - α3</text>

                    {/* Flèche de reconnaissance TCR -> Peptide + CMH */}
                    <path d="M 380 210 L 380 185" stroke="#f43f5e" strokeWidth="2.5" />
                    <text x="440" y="195" fill="#f43f5e" fontSize="10" fontWeight="bold">TCR reconnaît le complexe</text>
                  </g>
                )}

                {synapseStep === 3 && (
                  <g>
                    {/* Ondes d'activation du signal CD3 */}
                    <circle cx="300" cy="300" r="10" fill="none" stroke="#fbbf24" strokeWidth="2" opacity="0.8" />
                    <circle cx="300" cy="300" r="18" fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.5" />
                    <circle cx="460" cy="300" r="10" fill="none" stroke="#fbbf24" strokeWidth="2" opacity="0.8" />
                    <circle cx="460" cy="300" r="18" fill="none" stroke="#fbbf24" strokeWidth="1.5" opacity="0.5" />

                    <rect x="250" y="325" width="260" height="24" rx="4" fill="#78350f" stroke="#b45309" strokeWidth="1" />
                    <text x="380" y="341" fill="#fef3c7" fontSize="10" textAnchor="middle" fontWeight="bold">
                      Signal 1 transmis par ITAM de CD3 : Synthèse de perforines & granzymes
                    </text>
                  </g>
                )}
              </svg>
            </div>

            {/* Légende explicative */}
            <div className="bg-gray-50 border border-gray-200 p-4 rounded-xl text-xs sm:text-sm text-gray-700 space-y-1.5">
              <div className="font-bold text-gray-900 flex items-center gap-1.5">
                <Info size={16} className="text-red-700" />
                <span>Points fondamentaux de la Synapse Immunologique au Bac S2 :</span>
              </div>
              <p>
                <strong>1. Double spécificité :</strong> Le TCR ne reconnaît ni le peptide viral isolé, ni le CMH isolé. Il reconnaît la conformation tridimensionnelle du <em>complexe CMH I - peptide</em>.
              </p>
              <p>
                <strong>2. Rôle du corécepteur CD8 :</strong> Il renforce l'affinité globale en se fixant sur le domaine constant invariant <strong>α3</strong> du CMH I, sans interférer avec le peptide antigénique.
              </p>
              <p>
                <strong>3. Complexe CD3 invariant :</strong> Dépourvu de site de fixation à l'Ag, il transmet le signal intracellulaire grâce à ses motifs ITAM intracytoplasmiques.
              </p>
            </div>
          </div>
        )}

        {/* VUE 2 : CASCADE DES LT4 & PIVOT CENTRAL */}
        {viewMode === 'cascade_lt4' && (
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs sm:text-sm text-amber-900">
              <div className="font-bold text-amber-950 flex items-center gap-2 mb-1">
                <Award size={18} className="text-amber-700" />
                <span>Le Lymphocyte T4 : Chef d'Orchestre du Système Immunitaire</span>
              </div>
              <p>
                Sans LT4, la réponse immunitaire adaptative s'effondre. Le LT4 sécrète de l'<strong>Interleukine-2 (IL-2)</strong> qui agit à la fois en boucle <strong>autocrine</strong> (sur le LT4 lui-même) et en boucle <strong>paracrine</strong> (sur les LT8 et les LB).
              </p>
            </div>

            {/* Schéma Interactif SVG : Cascade IL-2 */}
            <div className="border border-gray-200 rounded-xl bg-slate-900 p-4 overflow-x-auto flex justify-center">
              <svg viewBox="0 0 760 380" className="w-full max-w-3xl h-auto select-none">
                {/* 1. CPA (Cellule Dendritique) */}
                <g transform="translate(60, 160)">
                  <path d="M 0 0 C 10 -40, 50 -50, 70 -30 C 100 -50, 130 -20, 130 10 C 140 40, 110 70, 80 60 C 50 80, 10 60, 0 30 Z" fill="#3b82f6" stroke="#2563eb" strokeWidth="2" />
                  <text x="65" y="10" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="bold">CPA</text>
                  <text x="65" y="26" fill="#bfdbfe" fontSize="8" textAnchor="middle">Dendritique</text>
                  {/* CMH II */}
                  <rect x="125" y="0" width="18" height="15" fill="#1d4ed8" rx="2" />
                  <rect x="135" y="5" width="10" height="5" fill="#ef4444" />
                </g>

                {/* Flèche CPA -> LT4 */}
                <path d="M 205 170 L 265 170" stroke="#60a5fa" strokeWidth="2.5" markerEnd="url(#arrow)" />
                <text x="235" y="160" fill="#93c5fd" fontSize="9" textAnchor="middle" fontWeight="bold">CMH II + Il-1</text>

                {/* 2. LT4 (Lymphocyte T4 Helper) */}
                <g transform="translate(275, 120)">
                  <circle cx="50" cy="50" r="45" fill="#7c3aed" stroke="#6d28d9" strokeWidth="2.5" />
                  <text x="50" y="45" fill="#ffffff" fontSize="13" textAnchor="middle" fontWeight="bold">LT4</text>
                  <text x="50" y="62" fill="#ddd6fe" fontSize="9" textAnchor="middle">Auxiliaire (CD4)</text>

                  {/* Boucle Autocrine IL-2 */}
                  <path d="M 25 10 C 20 -30, 80 -30, 75 10" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeDasharray="3,2" />
                  <polygon points="75,10 70,0 80,0" fill="#f59e0b" />
                  <text x="50" y="-35" fill="#fbbf24" fontSize="10" textAnchor="middle" fontWeight="bold">Action AUTOCRINE</text>
                  <text x="50" y="-22" fill="#fde68a" fontSize="8" textAnchor="middle">(Auto-prolifération)</text>
                </g>

                {/* Voie Vers LT8 (Cytotoxique) */}
                <path d="M 370 145 C 440 120, 480 80, 520 70" fill="none" stroke="#ef4444" strokeWidth="2.5" />
                <polygon points="520,70 510,75 515,65" fill="#ef4444" />
                <text x="445" y="90" fill="#fca5a5" fontSize="10" fontWeight="bold">IL-2 (Paracrine)</text>

                {/* Cible 1 : LT8 -> LTC */}
                <g transform="translate(530, 30)">
                  <rect x="0" y="0" width="180" height="75" rx="8" fill="#991b1b" stroke="#ef4444" strokeWidth="2" />
                  <text x="90" y="24" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="bold">LYMPHOCYTES T8</text>
                  <text x="90" y="42" fill="#fecaca" fontSize="9" textAnchor="middle">Prolifération & Différenciation</text>
                  <text x="90" y="58" fill="#fca5a5" fontSize="10" textAnchor="middle" fontWeight="bold">──&gt; LTC Cytotoxiques</text>
                </g>

                {/* Voie Vers LB (Humorale) */}
                <path d="M 370 195 C 440 220, 480 260, 520 270" fill="none" stroke="#3b82f6" strokeWidth="2.5" />
                <polygon points="520,270 515,275 510,265" fill="#3b82f6" />
                <text x="445" y="260" fill="#93c5fd" fontSize="10" fontWeight="bold">IL-4, IL-5, IL-6</text>

                {/* Cible 2 : LB -> Plasmocytes */}
                <g transform="translate(530, 235)">
                  <rect x="0" y="0" width="180" height="75" rx="8" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="2" />
                  <text x="90" y="24" fill="#ffffff" fontSize="11" textAnchor="middle" fontWeight="bold">LYMPHOCYTES B</text>
                  <text x="90" y="42" fill="#bfdbfe" fontSize="9" textAnchor="middle">Prolifération & Commutation</text>
                  <text x="90" y="58" fill="#93c5fd" fontSize="10" textAnchor="middle" fontWeight="bold">──&gt; Plasmocytes (Anticorps)</text>
                </g>

                {/* Note Clinique VIH */}
                <g transform="translate(60, 310)">
                  <rect x="0" y="0" width="370" height="45" rx="6" fill="#450a0a" stroke="#dc2626" strokeWidth="1.5" />
                  <text x="15" y="20" fill="#fca5a5" fontSize="10" fontWeight="bold">APPLICATION PATHOLOGIQUE DU BAC S2 : VIH / SIDA</text>
                  <text x="15" y="35" fill="#fecaca" fontSize="9">
                    Le virus cible le récepteur CD4 des LT4 ──&gt; Effondrement des LT4 = Immunodéficience globale.
                  </text>
                </g>
              </svg>
            </div>
          </div>
        )}

        {/* VUE 3 : LE BAISER DE LA MORT (PERFORINES / GRANZYMES / APOPTOSE) */}
        {viewMode === 'perforine_apoptose' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-rose-50 p-3.5 rounded-xl border border-rose-200">
              <div>
                <span className="text-xs font-bold text-rose-800 uppercase tracking-wide">
                  Chronologie Lytique : Étape {apoptoseStep} / 3
                </span>
                <span className="text-sm font-semibold text-gray-900 ml-2">
                  {apoptoseStep === 1 && "Adhésion étroite & Polarisation des granules lytiques (MTOC)"}
                  {apoptoseStep === 2 && "Exocytose polarisée de la perforine & polymérisation en pores membranaires"}
                  {apoptoseStep === 3 && "Entrée des granzymes, activation des caspases & apoptose sans lyse tissulaire"}
                </span>
              </div>
              <div className="flex gap-1.5">
                {[1, 2, 3].map((step) => (
                  <button
                    key={step}
                    onClick={() => setApoptoseStep(step)}
                    className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                      apoptoseStep === step
                        ? 'bg-red-800 text-white shadow-xs'
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    Phase {step}
                  </button>
                ))}
              </div>
            </div>

            {/* Schéma SVG Vectoriel : Cytolyse */}
            <div className="border border-gray-200 rounded-xl bg-slate-900 p-4 overflow-x-auto flex justify-center">
              <svg viewBox="0 0 760 380" className="w-full max-w-3xl h-auto select-none">
                {/* LTC à gauche */}
                <g transform="translate(60, 60)">
                  <path d="M 0 0 C 100 -20, 200 -20, 250 50 L 250 210 C 200 280, 100 280, 0 260 Z" fill="#991b1b" stroke="#dc2626" strokeWidth="2" />
                  <text x="80" y="40" fill="#ffffff" fontSize="13" fontWeight="bold">LTC Effecteur</text>
                  <text x="80" y="60" fill="#fca5a5" fontSize="10">Contient granules lytiques</text>

                  {/* Centrosome polarisé vers la cible */}
                  <circle cx="210" cy="130" r="10" fill="#fbbf24" opacity="0.8" />
                  <text x="210" y="134" fill="#78350f" fontSize="7" textAnchor="middle" fontWeight="bold">MTOC</text>

                  {/* Granules lytiques migrant vers la membrane */}
                  <circle cx="170" cy="110" r="8" fill="#f43f5e" stroke="#ffe4e6" strokeWidth="1" />
                  <circle cx="190" cy="140" r="8" fill="#f43f5e" stroke="#ffe4e6" strokeWidth="1" />
                  <circle cx="175" cy="165" r="8" fill="#f43f5e" stroke="#ffe4e6" strokeWidth="1" />
                </g>

                {/* Cellule Cible à droite */}
                <g transform="translate(450, 60)">
                  <path
                    d={
                      apoptoseStep === 3
                        ? "M 0 50 C 30 20, 150 10, 180 40 C 230 80, 210 180, 180 220 C 140 250, 40 240, 0 210 Z"
                        : "M 0 50 C 50 10, 180 10, 220 50 L 220 210 C 180 250, 50 250, 0 210 Z"
                    }
                    fill={apoptoseStep === 3 ? "#1e293b" : "#334155"}
                    stroke={apoptoseStep === 3 ? "#ef4444" : "#475569"}
                    strokeWidth={apoptoseStep === 3 ? "2" : "1.5"}
                    strokeDasharray={apoptoseStep === 3 ? "4,4" : undefined}
                  />
                  <text x="80" y="40" fill="#94a3b8" fontSize="12" fontWeight="bold">
                    {apoptoseStep === 3 ? "Cellule Cible en APOPTOSE" : "Cellule Cible Infectée"}
                  </text>
                  {/* Noyau */}
                  <circle
                    cx="110"
                    cy="130"
                    r={apoptoseStep === 3 ? "25" : "35"}
                    fill={apoptoseStep === 3 ? "#7f1d1d" : "#1e293b"}
                    stroke="#64748b"
                    strokeWidth="1.5"
                  />
                  <text x="110" y="134" fill="#ffffff" fontSize="9" textAnchor="middle">
                    {apoptoseStep === 3 ? "ADN fragmenté" : "Noyau"}
                  </text>
                </g>

                {/* Espace Synaptique entre les deux cellules */}
                {apoptoseStep >= 2 && (
                  <g transform="translate(310, 110)">
                    {/* Perforines formant des canaux cylindriques */}
                    <rect x="135" y="20" width="10" height="25" fill="#38bdf8" rx="2" />
                    <rect x="135" y="60" width="10" height="25" fill="#38bdf8" rx="2" />
                    <rect x="135" y="100" width="10" height="25" fill="#38bdf8" rx="2" />
                    <text x="140" y="10" fill="#38bdf8" fontSize="9" textAnchor="middle" fontWeight="bold">Pores de Perforine</text>

                    {/* Granzymes pénétrant dans la cellule cible */}
                    <circle cx="60" cy="32" r="5" fill="#a855f7" />
                    <circle cx="100" cy="72" r="5" fill="#a855f7" />
                    <circle cx="160" cy="72" r="5" fill="#a855f7" />
                    <text x="60" y="18" fill="#c084fc" fontSize="9" textAnchor="middle" fontWeight="bold">Granzyme B</text>
                    <path d="M 60 72 L 155 72" stroke="#c084fc" strokeWidth="1.5" strokeDasharray="3,2" />
                  </g>
                )}

                {/* Apoptose : Déclenchement de la cascade des caspases */}
                {apoptoseStep === 3 && (
                  <g transform="translate(480, 200)">
                    <rect x="0" y="0" width="220" height="40" rx="4" fill="#450a0a" stroke="#b91c1c" strokeWidth="1" />
                    <text x="110" y="16" fill="#fca5a5" fontSize="9" textAnchor="middle" fontWeight="bold">CASCADE DES CASPASES ACTIVÉE</text>
                    <text x="110" y="30" fill="#fecaca" fontSize="8" textAnchor="middle">Corps apoptotiques phagocytés sans nécrose</text>
                  </g>
                )}
              </svg>
            </div>
          </div>
        )}

        {/* VUE 4 : EXPÉRIENCE DE ZINKERNAGEL & DOHERTY */}
        {viewMode === 'zinkernagel' && (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl text-xs sm:text-sm text-blue-900">
              <div className="font-bold text-blue-950 flex items-center gap-2 mb-1">
                <Info size={18} className="text-blue-700" />
                <span>Expérience Historique de Restriction au CMH (Prix Nobel 1996)</span>
              </div>
              <p>
                Des souris de souche A (CMH H-2k) sont infectées par le virus de la chorioméningite lymphocytaire (LCM). Leurs LTC sont testés in vitro contre 4 types de cellules cibles :
              </p>
            </div>

            {/* Sélecteur de lot */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { lot: 1, label: 'Lot 1 : Souche A + Virus LCM', resultat: 'LYSE (+)' },
                { lot: 2, label: 'Lot 2 : Souche A Saine (sans virus)', resultat: 'PAS DE LYSE (-)' },
                { lot: 3, label: 'Lot 3 : Souche B + Virus LCM', resultat: 'PAS DE LYSE (-)' },
                { lot: 4, label: 'Lot 4 : Souche A + Virus Variole', resultat: 'PAS DE LYSE (-)' }
              ].map((item) => (
                <button
                  key={item.lot}
                  onClick={() => setZinkernagelLot(item.lot)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    zinkernagelLot === item.lot
                      ? 'bg-red-800 text-white border-red-900 shadow-sm'
                      : 'bg-white text-gray-800 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="text-[10px] uppercase font-bold opacity-80">{item.resultat}</div>
                  <div className="text-xs font-bold mt-1 leading-snug">{item.label}</div>
                </button>
              ))}
            </div>

            {/* Affichage du résultat expérimental */}
            <div className="bg-gray-900 text-white p-5 rounded-xl border border-gray-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400">PROTOCOLE EXPÉRIMENTAL IN VITRO</span>
                <span
                  className={`text-xs px-2.5 py-1 rounded font-bold ${
                    zinkernagelLot === 1
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-red-500/20 text-red-300 border border-red-500/30'
                  }`}
                >
                  {zinkernagelLot === 1 ? 'RÉSULTAT : CYTOLYSE ACTIVE' : 'RÉSULTAT : AUCUNE LYSE'}
                </span>
              </div>

              <div className="text-sm leading-relaxed text-gray-200">
                {zinkernagelLot === 1 && (
                  <p>
                    <strong>Lot 1 (Témoin Positif) :</strong> Les LTC prélevés chez la souris A reconnaissent à la fois le <strong>CMH H-2k</strong> (soi) et le <strong>peptide du virus LCM</strong> (non-soi). Les deux conditions de la double reconnaissance sont réunies : il y a <strong>adhésion synaptique, libération de perforine et lyse complète des cellules cibles</strong>.
                  </p>
                )}
                {zinkernagelLot === 2 && (
                  <p>
                    <strong>Lot 2 (Cellules A saines) :</strong> Le CMH H-2k est bien présent, mais les cellules ne présentent que des peptides du Soi normal. Les LTC spécifiques du virus LCM ne sont pas activés (tolérance au soi). <strong>Pas de lyse</strong>.
                  </p>
                )}
                {zinkernagelLot === 3 && (
                  <p>
                    <strong>Lot 3 (Cellules de Souche B infectées LCM) :</strong> Le virus LCM est bien présent, mais il est présenté par les molécules du <strong>CMH H-2d (allogénique)</strong>. Le TCR des LTC de la souche A ne peut pas s'arrimer au CMH de la souche B. <strong>Pas de reconnaissance, donc pas de lyse</strong>. C&apos;est la démonstration éclatante de la <em>restriction allogénique au CMH</em>.
                  </p>
                )}
                {zinkernagelLot === 4 && (
                  <p>
                    <strong>Lot 4 (Cellules A infectées par un autre virus) :</strong> Le CMH H-2k est correct, mais le peptide présenté provient du virus de la variole et non du LCM. Le TCR ne s'y lie pas car sa spécificité est rigoureuse pour LCM. <strong>Pas de lyse</strong>.
                  </p>
                )}
              </div>

              <div className="pt-2 border-t border-gray-800 text-xs font-mono text-amber-300">
                Conclusion Bac : Pour qu&apos;il y ait cytotoxicité, il faut IMPÉRATIVEMENT identité du CMH (histocompatibilité) ET identité de l&apos;antigène viral.
              </div>
            </div>
          </div>
        )}

        {/* VUE 5 : TABLEAU COMPARATIF D'INTÉGRATION */}
        {viewMode === 'comparatif' && (
          <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-xs">
            <table className="w-full text-xs sm:text-sm text-left text-gray-700">
              <thead className="bg-red-800 text-white uppercase text-[11px] font-bold">
                <tr>
                  <th className="p-3">Critère</th>
                  <th className="p-3">Lymphocyte T4 (LTh)</th>
                  <th className="p-3">Lymphocyte T8 (LTC)</th>
                  <th className="p-3">Lymphocyte B (LB)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr>
                  <td className="p-3 font-semibold bg-gray-50">Lieu de maturation</td>
                  <td className="p-3">Thymus</td>
                  <td className="p-3">Thymus</td>
                  <td className="p-3">Moelle osseuse rouge</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold bg-gray-50">Récepteur membranaire</td>
                  <td className="p-3">TCR + Corécepteur CD4</td>
                  <td className="p-3">TCR + Corécepteur CD8</td>
                  <td className="p-3">BCR (IgM / IgD membranaires)</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold bg-gray-50">Reconnaissance de l'Ag</td>
                  <td className="p-3">Peptide sur <strong>CMH II</strong> (CPA)</td>
                  <td className="p-3">Peptide sur <strong>CMH I</strong> (Cellules cibles)</td>
                  <td className="p-3">Antigène <strong>natif</strong> soluble ou particulaire</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold bg-gray-50">Rôle biologique</td>
                  <td className="p-3 text-red-800 font-bold">Chef d'orchestre (Sécrétion IL-2)</td>
                  <td className="p-3 text-emerald-800 font-bold">Effecteur lytique (Apoptose cellulaire)</td>
                  <td className="p-3 text-blue-800 font-bold">Production d'anticorps sériques</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold bg-gray-50">Armes effectrices</td>
                  <td className="p-3">Cytokines (IL-2, IL-4, IFN-γ)</td>
                  <td className="p-3">Perforines, Granzymes, FasL</td>
                  <td className="p-3">Immunoglobulines (IgG, IgM, IgA...)</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

