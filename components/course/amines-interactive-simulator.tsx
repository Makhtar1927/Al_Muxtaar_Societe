'use client';

import React, { useState } from 'react';
import MathRenderer from '@/components/course/math-renderer';

/* ============================================================
   TYPES
   ============================================================ */
interface AmineItem {
  id: string;
  nom: string;
  brute: string;
  semiDeveloppee: string;
  classe: '1' | '2' | '3';
  classeLabel: string;
  nbHSurN: number;
  nbAlkylesOnN: number;
  pKa: number;
  solubiliteEau: 'infinie' | 'bonne' | 'limitee';
  odeur: string;
  reactions: { reactif: string; produit: string; type: string }[];
  wolofTip: string;
}

/* ============================================================
   DONNÉES DES AMINES
   ============================================================ */
const AMINES_DATA: AmineItem[] = [
  {
    id: 'ethanamine',
    nom: 'Éthanamine (Éthylamine)',
    brute: 'C₂H₇N',
    semiDeveloppee: 'CH₃—CH₂—NH₂',
    classe: '1',
    classeLabel: 'Amine primaire (1°)',
    nbHSurN: 2,
    nbAlkylesOnN: 1,
    pKa: 10.65,
    solubiliteEau: 'infinie',
    odeur: 'Odeur de poisson (très forte)',
    reactions: [
      {
        reactif: 'HCl',
        produit: 'CH₃CH₂NH₃⁺ Cl⁻ (chlorure d\'éthylammonium)',
        type: 'Acido-basique',
      },
      {
        reactif: 'CH₃COCl (chlorure d\'acétyle)',
        produit: 'CH₃CONHCH₂CH₃ + HCl (N-éthylacétamide)',
        type: 'Acylation',
      },
    ],
    wolofTip:
      'Amine primaire la : azote bi dafa am 2 hydrogènes (NH₂). Dafa gën a forcé ammoniac car effet +I u radical éthyle bi.',
  },
  {
    id: 'n_methyl_ethanamine',
    nom: 'N-méthyléthanamine (Éthylméthylamine)',
    brute: 'C₃H₉N',
    semiDeveloppee: 'CH₃—CH₂—NH—CH₃',
    classe: '2',
    classeLabel: 'Amine secondaire (2°)',
    nbHSurN: 1,
    nbAlkylesOnN: 2,
    pKa: 10.73,
    solubiliteEau: 'infinie',
    odeur: 'Odeur de poisson (moins forte que primaire)',
    reactions: [
      {
        reactif: 'HBr',
        produit: 'CH₃CH₂N⁺H₂CH₃ Br⁻ (sel d\'ammonium secondaire)',
        type: 'Acido-basique',
      },
      {
        reactif: 'CH₃COCl',
        produit: 'CH₃CON(CH₃)CH₂CH₃ + HCl (amide N,N-disubstitué)',
        type: 'Acylation',
      },
    ],
    wolofTip:
      'Amine secondaire la : azote bi dafa am 1 rek hydrogène (NH). Yeneen ñaar alkyles ñoo ko takku. Dafa gën a forcé amine primaire car +I bi gën a baax !',
  },
  {
    id: 'trimethylamine',
    nom: 'Triméthylamine',
    brute: 'C₃H₉N',
    semiDeveloppee: '(CH₃)₃N',
    classe: '3',
    classeLabel: 'Amine tertiaire (3°)',
    nbHSurN: 0,
    nbAlkylesOnN: 3,
    pKa: 9.81,
    solubiliteEau: 'infinie',
    odeur: 'Odeur de hareng pourri (emblématique)',
    reactions: [
      {
        reactif: 'HI (iodure de méthyle CH₃I)',
        produit: '[(CH₃)₄N]⁺ I⁻ (iodure de tétraméthylammonium)',
        type: 'Alkylation (sel quaternaire)',
      },
    ],
    wolofTip:
      'Amine tertiaire la : azote bi amul benn hydrogène ! Ñett alkyles yi dañko wër. Dafa néew doole ci base par rapport à diméthylamine car radicaux ñetti bi dañuy bloquer doublet bi un peu.',
  },
  {
    id: 'aniline',
    nom: 'Aniline (Phénylamine)',
    brute: 'C₆H₇N',
    semiDeveloppee: 'C₆H₅—NH₂',
    classe: '1',
    classeLabel: 'Amine primaire aromatique (1°)',
    nbHSurN: 2,
    nbAlkylesOnN: 1,
    pKa: 4.63,
    solubiliteEau: 'limitee',
    odeur: 'Odeur caractéristique âcre (toxique)',
    reactions: [
      {
        reactif: 'HCl',
        produit: 'C₆H₅NH₃⁺ Cl⁻ (chlorure de phénylammonium — sel soluble)',
        type: 'Acido-basique (base faible)',
      },
      {
        reactif: 'CH₃COCl × 2',
        produit: 'CH₃CO—NH—C₆H₅ (acétanilide — amide cristallin blanc)',
        type: 'Acylation par chlorure d\'acyle',
      },
    ],
    wolofTip:
      'Aniline dafa base bu néew lool (pKa ≈ 4,6) ndax doublet azote bi dafa tàbi ci cycle benzène bi par mésomérie. Bu la HCl joxee, dafa dissolves ci ndox car sel la jëlee !',
  },
];

/* ============================================================
   COMPOSANT PRINCIPAL
   ============================================================ */
export default function AminesInteractiveSimulator() {
  const [selectedAmine, setSelectedAmine] = useState<AmineItem>(AMINES_DATA[0]);
  const [activeSection, setActiveSection] = useState<
    'structure' | 'proprietes' | 'reactions'
  >('structure');
  const [showWolof, setShowWolof] = useState(false);

  const classBgColor = {
    '1': 'from-emerald-50 to-teal-50/40 border-emerald-200',
    '2': 'from-blue-50 to-indigo-50/40 border-blue-200',
    '3': 'from-violet-50 to-purple-50/40 border-violet-200',
  }[selectedAmine.classe];

  const classBadgeColor = {
    '1': 'bg-emerald-100 text-emerald-800 border-emerald-300',
    '2': 'bg-blue-100 text-blue-800 border-blue-300',
    '3': 'bg-violet-100 text-violet-800 border-violet-300',
  }[selectedAmine.classe];

  const pKaLevel =
    selectedAmine.pKa >= 10
      ? { label: 'Base forte (alkylamines)', color: 'text-emerald-700', bar: 90 }
      : selectedAmine.pKa >= 8
      ? { label: 'Base modérée (ammoniac ~9.2)', color: 'text-blue-700', bar: 60 }
      : { label: 'Base très faible (aromatique)', color: 'text-rose-700', bar: 25 };

  return (
    <div className="my-10 rounded-3xl border border-indigo-200/70 bg-gradient-to-br from-white via-indigo-50/20 to-blue-50/30 p-5 md:p-8 shadow-xl shadow-indigo-500/5">
      {/* Title */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-indigo-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-500/30 text-xl font-black">
            🧪
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Simulateur Interactif • C2 Physique-Chimie S2
            </p>
            <h3 className="text-lg md:text-xl font-black text-slate-900">
              Laboratoire Virtuel — Amines
            </h3>
          </div>
        </div>
        <button
          onClick={() => setShowWolof((v) => !v)}
          className={`text-xs font-bold px-3.5 py-2 rounded-full border transition-all ${
            showWolof
              ? 'bg-amber-500 text-white border-amber-500 shadow-md'
              : 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100'
          }`}
        >
          💡 {showWolof ? 'Masquer' : 'Afficher'} Xam-xam Wolof
        </button>
      </div>

      {/* Amine Selector */}
      <div className="mb-6">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
          Choisir une amine à analyser :
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {AMINES_DATA.map((amine) => (
            <button
              key={amine.id}
              onClick={() => {
                setSelectedAmine(amine);
                setActiveSection('structure');
              }}
              className={`rounded-xl border p-3 text-left transition-all ${
                selectedAmine.id === amine.id
                  ? 'border-indigo-500 bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                  : 'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50'
              }`}
            >
              <div
                className={`text-[10px] font-bold uppercase mb-0.5 ${
                  selectedAmine.id === amine.id ? 'text-indigo-200' : 'text-indigo-600'
                }`}
              >
                Classe {amine.classe}°
              </div>
              <div
                className={`text-xs font-black leading-tight ${
                  selectedAmine.id === amine.id ? 'text-white' : 'text-slate-800'
                }`}
              >
                {amine.nom.split('(')[0].trim()}
              </div>
              <div
                className={`text-[10px] font-mono mt-0.5 ${
                  selectedAmine.id === amine.id ? 'text-indigo-200' : 'text-slate-500'
                }`}
              >
                {amine.brute}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Detail Panel */}
      <div className={`rounded-2xl border bg-gradient-to-br ${classBgColor} p-5 md:p-6 shadow-sm`}>
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h4 className="text-base md:text-lg font-black text-slate-900">
              {selectedAmine.nom}
            </h4>
            <span
              className={`inline-block mt-1 text-xs font-bold border rounded-full px-2.5 py-0.5 ${classBadgeColor}`}
            >
              {selectedAmine.classeLabel}
            </span>
          </div>
          <div className="font-mono text-sm font-bold text-slate-600 bg-white/70 rounded-xl px-3 py-1.5 border border-slate-200/60">
            {selectedAmine.brute}
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex gap-2 mb-5 flex-wrap">
          {(['structure', 'proprietes', 'reactions'] as const).map((sec) => (
            <button
              key={sec}
              onClick={() => setActiveSection(sec)}
              className={`text-xs font-bold px-3 py-1.5 rounded-lg transition-all ${
                activeSection === sec
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-white/70 text-slate-600 hover:bg-indigo-50 border border-slate-200/60'
              }`}
            >
              {sec === 'structure' ? '🔬 Structure' : sec === 'proprietes' ? '⚗️ Propriétés' : '🔁 Réactions'}
            </button>
          ))}
        </div>

        {/* SECTION : STRUCTURE */}
        {activeSection === 'structure' && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Semi-développée */}
              <div className="rounded-xl bg-white/80 border border-slate-200/60 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Formule semi-développée
                </p>
                <p className="font-mono text-base font-black text-slate-900">
                  {selectedAmine.semiDeveloppee}
                </p>
              </div>

              {/* Hydrogènes sur N */}
              <div className="rounded-xl bg-white/80 border border-slate-200/60 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Atomes H liés à l&apos;azote N
                </p>
                <div className="flex items-center gap-2 mt-1">
                  {[...Array(selectedAmine.nbHSurN)].map((_, i) => (
                    <span
                      key={i}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 text-indigo-700 text-sm font-black border-2 border-indigo-300"
                    >
                      H
                    </span>
                  ))}
                  {selectedAmine.nbHSurN === 0 && (
                    <span className="text-sm font-bold text-rose-600">
                      ∅ Aucun H sur N → Amine tertiaire !
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  {selectedAmine.nbHSurN} H sur azote → Classe {selectedAmine.classe}°
                </p>
              </div>

              {/* Groupes alkyles sur N */}
              <div className="rounded-xl bg-white/80 border border-slate-200/60 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Groupes alkyles sur azote N
                </p>
                <div className="flex items-center gap-2 mt-1">
                  {[...Array(selectedAmine.nbAlkylesOnN)].map((_, i) => (
                    <span
                      key={i}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 text-xs font-black border-2 border-emerald-300"
                    >
                      R
                    </span>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  {selectedAmine.nbAlkylesOnN} groupe(s) alkyle(s)/aryle(s)
                </p>
              </div>

              {/* Odeur */}
              <div className="rounded-xl bg-white/80 border border-slate-200/60 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                  Odeur caractéristique
                </p>
                <p className="text-sm font-semibold text-slate-700">
                  🐟 {selectedAmine.odeur}
                </p>
                <p className="text-xs text-slate-500 mt-1">
                  Causée par la volatilité et la basicité de l&apos;amine
                </p>
              </div>
            </div>

            {/* Wolof Tip */}
            {showWolof && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                <p className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                  💡 Xam-xam ci Wolof
                </p>
                <p className="text-sm text-amber-900 italic">{selectedAmine.wolofTip}</p>
              </div>
            )}
          </div>
        )}

        {/* SECTION : PROPRIÉTÉS */}
        {activeSection === 'proprietes' && (
          <div className="space-y-5">
            {/* pKa */}
            <div className="rounded-xl bg-white/80 border border-slate-200/60 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Force basique — pKa du couple R-NH₃⁺ / R-NH₂
              </p>
              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-black text-slate-900">
                  pKa = {selectedAmine.pKa}
                </span>
                <span className={`text-xs font-bold ${pKaLevel.color}`}>
                  {pKaLevel.label}
                </span>
              </div>
              {/* Bar */}
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div
                  className="h-3 rounded-full bg-gradient-to-r from-rose-400 via-amber-400 to-emerald-500 transition-all duration-500"
                  style={{ width: `${pKaLevel.bar}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>Base très faible (aniline ~4.6)</span>
                <span>Base forte (dialkylamines ~11)</span>
              </div>
            </div>

            {/* Échelle basique */}
            <div className="rounded-xl bg-white/80 border border-slate-200/60 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                Comparaison — Échelle de force basique (Bac S2)
              </p>
              <div className="space-y-2.5">
                {[
                  { nom: 'Aniline C₆H₅NH₂', pka: 4.63, color: 'bg-rose-200' },
                  { nom: 'Ammoniac NH₃', pka: 9.21, color: 'bg-amber-200' },
                  { nom: 'Éthanamine CH₃CH₂NH₂', pka: 10.65, color: 'bg-blue-200' },
                  { nom: 'Diéthylamine (C₂H₅)₂NH', pka: 10.93, color: 'bg-emerald-200' },
                ].map((item) => (
                  <div key={item.nom} className="flex items-center gap-2">
                    <div
                      className={`h-2.5 rounded-full transition-all ${item.color}`}
                      style={{ width: `${(item.pka / 12) * 100}%` }}
                    />
                    <span className="text-xs font-semibold text-slate-700 whitespace-nowrap">
                      {item.nom} (pKa={item.pka})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Solubilité */}
            <div className="rounded-xl bg-white/80 border border-slate-200/60 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Solubilité dans l&apos;eau
              </p>
              <p className="text-sm font-bold text-slate-800">
                {selectedAmine.solubiliteEau === 'infinie'
                  ? '✅ Miscible en toutes proportions (liaisons H avec l\'eau)'
                  : selectedAmine.solubiliteEau === 'bonne'
                  ? '🟡 Bonne solubilité'
                  : '⚠️ Peu soluble (chaîne longue ou cycle aromatique)'}
              </p>
            </div>

            {showWolof && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                <p className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                  💡 Xam-xam ci Wolof
                </p>
                <p className="text-sm text-amber-900 italic">{selectedAmine.wolofTip}</p>
              </div>
            )}
          </div>
        )}

        {/* SECTION : RÉACTIONS */}
        {activeSection === 'reactions' && (
          <div className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Réactions clés de {selectedAmine.nom}
            </p>

            {selectedAmine.reactions.map((rxn, i) => (
              <div
                key={i}
                className="rounded-xl bg-white/90 border border-slate-200/60 p-4 shadow-sm"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                  <span className="text-xs font-bold text-indigo-700 uppercase tracking-wide">
                    {rxn.type}
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-sm font-mono font-semibold text-slate-700">
                  <span className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs">
                    {selectedAmine.brute}
                  </span>
                  <span className="text-indigo-500 font-black">+</span>
                  <span className="bg-indigo-50 border border-indigo-200 rounded-lg px-2 py-1 text-xs">
                    {rxn.reactif}
                  </span>
                  <span className="text-indigo-600 font-black text-base">→</span>
                  <span className="bg-emerald-50 border border-emerald-200 rounded-lg px-2 py-1 text-xs flex-1">
                    {rxn.produit}
                  </span>
                </div>
              </div>
            ))}

            {/* Rappel : Amine 3° ne peut pas former d'amide */}
            {selectedAmine.classe === '3' && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 p-4">
                <p className="text-xs font-bold text-rose-800 mb-1">⚠️ Rappel Bac S2</p>
                <p className="text-sm font-semibold text-rose-900">
                  Une amine tertiaire (3°) ne possède aucun atome d&apos;hydrogène lié à l&apos;azote.
                  Elle NE PEUT PAS former d&apos;amide par réaction avec un chlorure d&apos;acyle.
                  Elle peut uniquement former un sel d&apos;ammonium quaternaire (par alkylation totale).
                </p>
              </div>
            )}

            {showWolof && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                <p className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                  💡 Xam-xam ci Wolof
                </p>
                <p className="text-sm text-amber-900 italic">{selectedAmine.wolofTip}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Footer note */}
      <p className="mt-4 text-center text-xs text-slate-400 font-medium">
        Simulateur C2 — Amines · Terminale S2 Sénégal · Al Muxtaar Société
      </p>
    </div>
  );
}

