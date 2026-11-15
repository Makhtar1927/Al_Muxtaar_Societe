'use client';

import React, { useState } from 'react';
import MathRenderer from '@/components/course/math-renderer';

type TabType = 'decroissance' | 'aston' | 'reactions';

interface IsotopeRadioactif {
  nom: string;
  symbole: string;
  typeEmission: string;
  periodeTexte: string;
  periodeSecondes: number;
  uniteNaturelle: string;
  periodeValeur: number;
}

const ISOTOPES: IsotopeRadioactif[] = [
  {
    nom: 'Carbone 14 (Datation)',
    symbole: '¹⁴₆C',
    typeEmission: 'β⁻',
    periodeTexte: '5 730 ans',
    periodeSecondes: 5730 * 365.25 * 24 * 3600,
    uniteNaturelle: 'ans',
    periodeValeur: 5730,
  },
  {
    nom: 'Iode 131 (Thyroïde)',
    symbole: '¹³¹₅₃I',
    typeEmission: 'β⁻, γ',
    periodeTexte: '8,02 jours',
    periodeSecondes: 8.02 * 24 * 3600,
    uniteNaturelle: 'jours',
    periodeValeur: 8.02,
  },
  {
    nom: 'Radon 222 (Gaz noble)',
    symbole: '²²²₈₆Rn',
    typeEmission: 'α',
    periodeTexte: '3,82 jours',
    periodeSecondes: 3.82 * 24 * 3600,
    uniteNaturelle: 'jours',
    periodeValeur: 3.82,
  },
  {
    nom: 'Radium 226 (Historique)',
    symbole: '²²⁶₈₈Ra',
    typeEmission: 'α, γ',
    periodeTexte: '1 600 ans',
    periodeSecondes: 1600 * 365.25 * 24 * 3600,
    uniteNaturelle: 'ans',
    periodeValeur: 1600,
  },
  {
    nom: 'Césium 137 (Fission)',
    symbole: '¹³⁷₅₅Cs',
    typeEmission: 'β⁻, γ',
    periodeTexte: '30,1 ans',
    periodeSecondes: 30.1 * 365.25 * 24 * 3600,
    uniteNaturelle: 'ans',
    periodeValeur: 30.1,
  },
  {
    nom: 'Polonium 210 (Marie Curie)',
    symbole: '²¹⁰₈₄Po',
    typeEmission: 'α',
    periodeTexte: '138,4 jours',
    periodeSecondes: 138.4 * 24 * 3600,
    uniteNaturelle: 'jours',
    periodeValeur: 138.4,
  },
];

interface NoyauAston {
  nom: string;
  symbole: string;
  A: number;
  Z: number;
  masseNoyauU: number;
  region: 'fusion' | 'stable' | 'fission';
}

const NOYAUX_ASTON: NoyauAston[] = [
  { nom: 'Deutérium (²₁H)', symbole: '²₁H', A: 2, Z: 1, masseNoyauU: 2.01355, region: 'fusion' },
  { nom: 'Tritium (³₁H)', symbole: '³₁H', A: 3, Z: 1, masseNoyauU: 3.01550, region: 'fusion' },
  { nom: 'Hélium 4 (⁴₂He, particule α)', symbole: '⁴₂He', A: 4, Z: 2, masseNoyauU: 4.00151, region: 'fusion' },
  { nom: 'Lithium 6 (⁶₃Li)', symbole: '⁶₃Li', A: 6, Z: 3, masseNoyauU: 6.01348, region: 'fusion' },
  { nom: 'Carbone 12 (¹²₆C)', symbole: '¹²₆C', A: 12, Z: 6, masseNoyauU: 11.99671, region: 'stable' },
  { nom: 'Oxygène 16 (¹⁶₈O)', symbole: '¹⁶₈O', A: 16, Z: 8, masseNoyauU: 15.99052, region: 'stable' },
  { nom: 'Fer 56 (⁵⁶₂₆Fe - Pic de Stabilité)', symbole: '⁵⁶₂₆Fe', A: 56, Z: 26, masseNoyauU: 55.92068, region: 'stable' },
  { nom: 'Nickel 62 (⁶²₂₈Ni - Maximum absolu)', symbole: '⁶²₂₈Ni', A: 62, Z: 28, masseNoyauU: 61.91428, region: 'stable' },
  { nom: 'Krypton 92 (⁹²₃₆Kr - Produit fission)', symbole: '⁹²₃₆Kr', A: 92, Z: 36, masseNoyauU: 91.8973, region: 'stable' },
  { nom: 'Baryum 141 (¹⁴¹₅₆Ba - Produit fission)', symbole: '¹⁴¹₅₆Ba', A: 141, Z: 56, masseNoyauU: 140.8836, region: 'fission' },
  { nom: 'Plomb 206 (²⁰⁶₈₂Pb - Stable final)', symbole: '²⁰⁶₈₂Pb', A: 206, Z: 82, masseNoyauU: 205.9295, region: 'fission' },
  { nom: 'Uranium 235 (²³⁵₉₂U - Fissile)', symbole: '²³⁵₉₂U', A: 235, Z: 92, masseNoyauU: 234.9934, region: 'fission' },
  { nom: 'Uranium 238 (²³⁸₉₂U - Fertile)', symbole: '²³⁸₉₂U', A: 238, Z: 92, masseNoyauU: 238.0003, region: 'fission' },
];

interface ReactionPreset {
  titre: string;
  type: string;
  equationLatex: string;
  mReactifsU: number;
  mProduitsU: number;
  commentaire: string;
}

const REACTIONS_NUCLEAIRES: ReactionPreset[] = [
  {
    titre: 'Désintégration Alpha du Radium 226',
    type: 'Radioactivité α',
    equationLatex: '^{226}_{88}\\text{Ra} \\longrightarrow ^{222}_{86}\\text{Rn} + ^{4}_{2}\\text{He}',
    mReactifsU: 225.9771,
    mProduitsU: 221.9703 + 4.00151,
    commentaire:
      'Émission d’un noyau d’hélium 4 par un noyau lourd instable. Le défaut de masse négatif se transforme en énergie cinétique partagée entre la particule α et le recul du Radon.',
  },
  {
    titre: 'Désintégration Bêta Moins du Carbone 14',
    type: 'Radioactivité β⁻',
    equationLatex: '^{14}_{6}\\text{C} \\longrightarrow ^{14}_{7}\\text{N} + ^{0}_{-1}\\text{e} + \\bar{\\nu}_e',
    mReactifsU: 13.99995,
    mProduitsU: 13.99923 + 0.0005486,
    commentaire:
      'Excès de neutrons dans le noyau : un neutron se transforme spontanément en proton avec émission d’un électron rapide et d’un antineutrino électronique.',
  },
  {
    titre: 'Désintégration Bêta Plus du Phosphore 30',
    type: 'Radioactivité β⁺',
    equationLatex: '^{30}_{15}\\text{P} \\longrightarrow ^{30}_{14}\\text{Si} + ^{0}_{+1}\\text{e} + \\nu_e',
    mReactifsU: 29.97005,
    mProduitsU: 29.96577 + 0.0005486,
    commentaire:
      'Excès de protons : un proton se transforme en neutron avec émission d’un positon (antiparticule de l’électron) et d’un neutrino.',
  },
  {
    titre: 'Fission Induite de l’Uranium 235 par un Neutron Lent',
    type: 'Fission Nucléaire Provoquée',
    equationLatex: '^{1}_{0}\\text{n} + ^{235}_{92}\\text{U} \\longrightarrow ^{94}_{38}\\text{Sr} + ^{140}_{54}\\text{Xe} + 2\\,^{1}_{0}\\text{n}',
    mReactifsU: 1.00866 + 234.9934,
    mProduitsU: 93.8945 + 139.8890 + 2 * 1.00866,
    commentaire:
      'Réaction en chaîne des réacteurs nucléaires. Un neutron thermique casse un noyau lourd en deux fragments moyens plus stables en libérant environ 200 MeV.',
  },
  {
    titre: 'Fusion Thermonucléaire Deutérium-Tritium (Soleil & ITER)',
    type: 'Fusion Nucléaire Provoquée',
    equationLatex: '^{2}_{1}\\text{H} + ^{3}_{1}\\text{H} \\longrightarrow ^{4}_{2}\\text{He} + ^{1}_{0}\\text{n}',
    mReactifsU: 2.01355 + 3.01550,
    mProduitsU: 4.00151 + 1.00866,
    commentaire:
      'Deux noyaux très légers fusionnent à très haute température pour former un noyau d’hélium 4 très fortement lié. Rendement massique 4 fois supérieur à la fission !',
  },
];

export default function P10NucleaireInteractiveLab() {
  const [activeTab, setActiveTab] = useState<TabType>('decroissance');

  // --- TAB 1 : Décroissance state ---
  const [selectedIsotopeIdx, setSelectedIsotopeIdx] = useState(0);
  const [tempsEnPeriodes, setTempsEnPeriodes] = useState(1.5);
  const [n0Initial, setN0Initial] = useState(1000); // en millions de noyaux
  const [datationActRatio, setDatationActRatio] = useState(0.5); // A(t)/A0 pour le mode datation C14

  // --- TAB 2 : Aston state ---
  const [selectedAstonNoyauIdx, setSelectedAstonNoyauIdx] = useState(6); // Fe 56 default

  // --- TAB 3 : Réactions state ---
  const [selectedReactionIdx, setSelectedReactionIdx] = useState(3); // U-235 fission

  // Constants
  const MP_U = 1.00728; // proton en u
  const MN_U = 1.00866; // neutron en u
  const C2_MEV = 931.5; // 1 u * c^2 = 931.5 MeV

  // Computations Tab 1
  const isotope = ISOTOPES[selectedIsotopeIdx];
  const tDivT = tempsEnPeriodes;
  const fractionRestante = Math.pow(0.5, tDivT);
  const nRestant = n0Initial * fractionRestante;
  const nDesintegres = n0Initial - nRestant;
  const lambdaSec = Math.LN2 / isotope.periodeSecondes;
  const activiteInitialeBq = lambdaSec * (n0Initial * 1e6 * 1e12); // scaled
  const activiteRestanteBq = activiteInitialeBq * fractionRestante;

  // Datation C-14 age
  const tDatationAns = -(5730 / Math.LN2) * Math.log(datationActRatio);

  // Computations Tab 2 (Aston)
  const astonNoyau = NOYAUX_ASTON[selectedAstonNoyauIdx];
  const Z = astonNoyau.Z;
  const A = astonNoyau.A;
  const N = A - Z;
  const masseNucleonsSeparesU = Z * MP_U + N * MN_U;
  const defautMasseU = masseNucleonsSeparesU - astonNoyau.masseNoyauU;
  const energieLiaisonMev = defautMasseU * C2_MEV;
  const energieLiaisonParNucleonMev = energieLiaisonMev / A;

  // Computations Tab 3 (Réactions)
  const reaction = REACTIONS_NUCLEAIRES[selectedReactionIdx];
  const deltaMU = reaction.mProduitsU - reaction.mReactifsU;
  const energieLibereeMev = Math.abs(deltaMU) * C2_MEV;
  const energieLibereeJoules = energieLibereeMev * 1e6 * 1.60218e-19;
  // Energie par gramme (estimation)
  const masseMolReacG = reaction.mReactifsU;
  const energieParGrammeMJ =
    masseMolReacG > 0
      ? ((6.022e23 / masseMolReacG) * energieLibereeJoules) / 1e6
      : 0;
  const equivalentCharbonKg = (energieParGrammeMJ * 1e6) / 3e7; // 30 MJ/kg charbon

  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm my-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-2">
            Laboratoire Interactif Virtuel Bac S2 • Chapitre P10
          </div>
          <h3 className="text-xl font-bold text-slate-900 tracking-tight">
            Simulateur Physique Nucléaire : Décroissance, Courbe d’Aston &amp; Énergie de Liaison
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            Visualisez la décroissance radioactive en temps réel, explorez la stabilité sur la courbe d’Aston et calculez les bilans d’énergie d’Einstein (E = Δm·c²).
          </p>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-1.5 self-start md:self-auto">
          <button
            onClick={() => {
              setActiveTab('decroissance');
              setSelectedIsotopeIdx(0);
              setTempsEnPeriodes(1.0);
            }}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100 transition-colors"
          >
            Carbone 14 (t = T)
          </button>
          <button
            onClick={() => {
              setActiveTab('aston');
              setSelectedAstonNoyauIdx(6); // Fe 56
            }}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 transition-colors"
          >
            Fer 56 (Stabilité max)
          </button>
          <button
            onClick={() => {
              setActiveTab('reactions');
              setSelectedReactionIdx(4); // Fusion D-T
            }}
            className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 transition-colors"
          >
            Fusion D-T (Soleil)
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 mt-4 mb-6 gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('decroissance')}
          className={`pb-3 px-4 text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'decroissance'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          1. Décroissance &amp; Datation
        </button>
        <button
          onClick={() => setActiveTab('aston')}
          className={`pb-3 px-4 text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'aston'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          2. Courbe d’Aston &amp; Défaut de Masse
        </button>
        <button
          onClick={() => setActiveTab('reactions')}
          className={`pb-3 px-4 text-sm font-semibold border-b-2 whitespace-nowrap transition-all ${
            activeTab === 'reactions'
              ? 'border-emerald-600 text-emerald-600'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          3. Bilan d’Énergie &amp; Soddy
        </button>
      </div>

      {/* ======================================================== */}
      {/* TAB 1 : DÉCROISSANCE RADIOACTIVE & DATATION */}
      {/* ======================================================== */}
      {activeTab === 'decroissance' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                Choisir le Radio-Isotope
              </label>
              <select
                value={selectedIsotopeIdx}
                onChange={(e) => setSelectedIsotopeIdx(Number(e.target.value))}
                className="w-full text-xs font-medium bg-white border border-slate-300 rounded-lg p-2 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                {ISOTOPES.map((iso, idx) => (
                  <option key={iso.nom} value={idx}>
                    {iso.nom} ({iso.symbole}) · T = {iso.periodeTexte}
                  </option>
                ))}
              </select>
              <div className="mt-2 text-[11px] text-slate-500 flex justify-between">
                <span>Rayonnement : <strong>{isotope.typeEmission}</strong></span>
                <span>Période T = <strong>{isotope.periodeTexte}</strong></span>
              </div>
            </div>

            {/* Slider Time t */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Temps écoulé t (en multiples de T)
                </label>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  t = {tDivT.toFixed(2)} · T
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="5"
                step="0.05"
                value={tempsEnPeriodes}
                onChange={(e) => setTempsEnPeriodes(parseFloat(e.target.value))}
                className="w-full accent-emerald-600"
              />
              <div className="flex justify-between text-[11px] text-slate-500 font-mono">
                <span>0</span>
                <span>1·T</span>
                <span>2·T</span>
                <span>3·T</span>
                <span>4·T</span>
                <span>5·T</span>
              </div>
              <div className="text-[11px] text-slate-600 pt-1 border-t border-slate-200">
                Temps réel : <strong>{(tDivT * isotope.periodeValeur).toFixed(1)} {isotope.uniteNaturelle}</strong>
              </div>
            </div>

            {/* Initial Nuclei N0 */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Population Initiale N₀
                </label>
                <span className="text-xs font-mono font-bold text-slate-800">
                  {n0Initial} × 10⁶ noyaux
                </span>
              </div>
              <input
                type="range"
                min="100"
                max="2000"
                step="50"
                value={n0Initial}
                onChange={(e) => setN0Initial(parseInt(e.target.value))}
                className="w-full accent-emerald-600"
              />
            </div>

            {/* Mode Datation C-14 */}
            <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-bold text-amber-900">Application Bac : Datation au Carbone 14</span>
              </div>
              <p className="text-[11px] text-amber-800 mb-2">
                Rapport d’activité mesuré A(t) / A₀ sur un morceau de bois archéologique :
              </p>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0.02"
                  max="0.98"
                  step="0.01"
                  value={datationActRatio}
                  onChange={(e) => setDatationActRatio(parseFloat(e.target.value))}
                  className="w-full accent-amber-600"
                />
                <span className="text-xs font-mono font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded shrink-0">
                  {(datationActRatio * 100).toFixed(0)} %
                </span>
              </div>
              <div className="mt-2 text-xs font-medium text-amber-950 bg-white/80 p-2 rounded border border-amber-200">
                Âge estimé du fossile : <strong className="text-amber-900 font-mono text-sm">{Math.round(tDatationAns)} ans</strong>
                <span className="text-[10px] text-amber-700 block">
                  Formule Bac : t = (T / ln 2) · ln(A₀ / A) avec T = 5 730 ans
                </span>
              </div>
            </div>
          </div>

          {/* SVG Decay Curve Display */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 shadow-inner">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-300">
                  Courbe de Décroissance Radioactive N(t) = N₀ · e^{'{-\\lambda t}'}
                </span>
                <span className="text-[11px] font-mono text-emerald-400">
                  N(t) / N₀ = {(fractionRestante * 100).toFixed(1)} %
                </span>
              </div>

              {/* Dynamic SVG Plot */}
              <div className="relative w-full h-64 bg-slate-900 rounded-lg overflow-hidden border border-slate-800">
                <svg className="w-full h-full" viewBox="0 0 500 240">
                  <defs>
                    <linearGradient id="decayArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  {[0, 1, 2, 3, 4, 5].map((period) => {
                    const x = 50 + period * 85;
                    return (
                      <g key={period}>
                        <line x1={x} y1="20" x2={x} y2="200" stroke="#334155" strokeDasharray="3 3" />
                        <text x={x} y="215" fill="#94a3b8" fontSize="10" textAnchor="middle" fontFamily="monospace">
                          {period === 0 ? '0' : `${period}T`}
                        </text>
                      </g>
                    );
                  })}

                  {/* Horizontal levels N0, N0/2, N0/4, N0/8 */}
                  <line x1="50" y1="30" x2="475" y2="30" stroke="#475569" strokeDasharray="2 2" />
                  <text x="45" y="34" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">N₀</text>

                  <line x1="50" y1="115" x2="475" y2="115" stroke="#475569" strokeDasharray="2 2" />
                  <text x="45" y="119" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">N₀/2</text>

                  <line x1="50" y1="157" x2="475" y2="157" stroke="#475569" strokeDasharray="2 2" />
                  <text x="45" y="161" fill="#94a3b8" fontSize="10" textAnchor="end" fontFamily="monospace">N₀/4</text>

                  {/* Axes */}
                  <line x1="50" y1="20" x2="50" y2="200" stroke="#cbd5e1" strokeWidth="2" />
                  <line x1="50" y1="200" x2="480" y2="200" stroke="#cbd5e1" strokeWidth="2" />

                  {/* Tangent at Origin: from (0, N0) to (tau = 1/lambda = 1.44 T, 0) */}
                  {/* x(tau) = 50 + 1.4427 * 85 = 172.6, y = 200 */}
                  <line
                    x1="50"
                    y1="30"
                    x2="172.6"
                    y2="200"
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                  />
                  <text x="175" y="195" fill="#f59e0b" fontSize="9" fontFamily="monospace">
                    τ = 1/λ ≈ 1,44 T
                  </text>

                  {/* Exponential curve path */}
                  {(() => {
                    let d = 'M 50 30';
                    let areaD = 'M 50 200 L 50 30';
                    for (let step = 0; step <= 100; step++) {
                      const p = (step / 100) * 5; // 0 to 5 T
                      const x = 50 + p * 85;
                      const frac = Math.pow(0.5, p);
                      const y = 200 - frac * 170;
                      d += ` L ${x} ${y}`;
                      areaD += ` L ${x} ${y}`;
                    }
                    areaD += ' L 475 200 Z';

                    return (
                      <>
                        <path d={areaD} fill="url(#decayArea)" />
                        <path d={d} fill="none" stroke="#10b981" strokeWidth="2.5" />
                      </>
                    );
                  })()}

                  {/* Current Operating Point */}
                  {(() => {
                    const curX = 50 + Math.min(tDivT, 5) * 85;
                    const curY = 200 - fractionRestante * 170;
                    return (
                      <g>
                        <line x1={curX} y1="20" x2={curX} y2="200" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="3 3" />
                        <line x1="50" y1={curY} x2={curX} y2={curY} stroke="#ec4899" strokeWidth="1.5" strokeDasharray="3 3" />
                        <circle cx={curX} cy={curY} r="6" fill="#ec4899" stroke="#ffffff" strokeWidth="2" />
                        <text
                          x={curX + (curX > 350 ? -10 : 10)}
                          y={curY - 10}
                          fill="#f472b6"
                          fontSize="10"
                          fontWeight="bold"
                          textAnchor={curX > 350 ? 'end' : 'start'}
                          fontFamily="monospace"
                        >
                          N(t) = {Math.round(nRestant)} M ({(fractionRestante * 100).toFixed(1)}%)
                        </text>
                      </g>
                    );
                  })()}
                </svg>
              </div>

              {/* Real-time stats box */}
              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Noyaux Intacts N(t)</span>
                  <span className="text-sm font-bold font-mono text-emerald-400">
                    {Math.round(nRestant)} × 10⁶
                  </span>
                  <span className="text-[9px] text-slate-500 block">{(fractionRestante * 100).toFixed(1)}% restants</span>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Noyaux Désintégrés</span>
                  <span className="text-sm font-bold font-mono text-rose-400">
                    {Math.round(nDesintegres)} × 10⁶
                  </span>
                  <span className="text-[9px] text-slate-500 block">{((1 - fractionRestante) * 100).toFixed(1)}% formés</span>
                </div>
                <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-400 block">Constante λ</span>
                  <span className="text-sm font-bold font-mono text-amber-400">
                    {lambdaSec.toExponential(3)} s⁻¹
                  </span>
                  <span className="text-[9px] text-slate-500 block">λ = ln 2 / T</span>
                </div>
              </div>
            </div>

            {/* Note pédagogique */}
            <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950">
              <div>
                <strong>Propriété d’Or du Bac S2 :</strong> La tangente à l’origine de la courbe N(t) coupe l’axe des temps à la constante de temps <strong>τ = 1/λ = T / ln 2 ≈ 1,44·T</strong>. À cet instant précis, la population résiduelle vaut N(τ) = N₀/e ≈ 36,8 % de N₀.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 2 : COURBE D'ASTON & DÉFAUT DE MASSE */}
      {/* ======================================================== */}
      {activeTab === 'aston' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Controls & Nucleus Picker */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                Sélectionner un Nucléide à Analyser
              </label>
              <select
                value={selectedAstonNoyauIdx}
                onChange={(e) => setSelectedAstonNoyauIdx(Number(e.target.value))}
                className="w-full text-xs font-medium bg-white border border-slate-300 rounded-lg p-2 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                {NOYAUX_ASTON.map((nuc, idx) => (
                  <option key={nuc.nom} value={idx}>
                    {nuc.nom} (A = {nuc.A}, Z = {nuc.Z})
                  </option>
                ))}
              </select>
            </div>

            {/* Nucleus Detail Card */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-sm font-bold text-slate-800">
                  Composition du noyau de {astonNoyau.nom}
                </span>
                <span
                  className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    astonNoyau.region === 'fusion'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : astonNoyau.region === 'stable'
                      ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                      : 'bg-rose-100 text-rose-800 border border-rose-300'
                  }`}
                >
                  Domaine {astonNoyau.region === 'fusion' ? 'Fusion' : astonNoyau.region === 'stable' ? 'Stabilité' : 'Fission'}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 bg-slate-50 rounded">
                  <span className="text-slate-500 block text-[10px]">Nucléons (A)</span>
                  <span className="font-bold text-slate-800 font-mono text-sm">{A}</span>
                </div>
                <div className="p-2 bg-slate-50 rounded">
                  <span className="text-slate-500 block text-[10px]">Protons (Z)</span>
                  <span className="font-bold text-blue-600 font-mono text-sm">{Z}</span>
                </div>
                <div className="p-2 bg-slate-50 rounded">
                  <span className="text-slate-500 block text-[10px]">Neutrons (N)</span>
                  <span className="font-bold text-slate-700 font-mono text-sm">{N}</span>
                </div>
              </div>

              {/* Mass Defect Step-by-Step */}
              <div className="space-y-1.5 text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-200 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Z·m_p + (A-Z)·m_n :</span>
                  <span>{masseNucleonsSeparesU.toFixed(5)} u</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">m(noyau) réel :</span>
                  <span>{astonNoyau.masseNoyauU.toFixed(5)} u</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200 font-bold text-emerald-700">
                  <span>Défaut de masse Δm :</span>
                  <span>{defautMasseU.toFixed(5)} u</span>
                </div>
                <div className="flex justify-between text-slate-500 text-[10px]">
                  <span>En kilogrammes :</span>
                  <span>{(defautMasseU * 1.66054e-27).toExponential(4)} kg</span>
                </div>
              </div>

              {/* Binding Energy Output */}
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 space-y-1 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-emerald-900 font-semibold">Énergie de liaison totale E_ℓ :</span>
                  <span className="font-mono font-bold text-emerald-800 text-sm">
                    {energieLiaisonMev.toFixed(2)} MeV
                  </span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-emerald-200/60">
                  <span className="text-emerald-900 font-bold">Stabilité E_ℓ / A :</span>
                  <span className="font-mono font-extrabold text-emerald-700 text-base">
                    {energieLiaisonParNucleonMev.toFixed(3)} MeV/nucléon
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SVG Aston Curve Display */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="bg-slate-950 rounded-xl p-4 border border-slate-800 shadow-inner">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-slate-300">
                  Représentation de la Stabilité : E_ℓ / A = f(A)
                </span>
                <span className="text-[11px] font-mono text-emerald-400">
                  Pic : ⁵⁶₂₆Fe ≈ 8,79 MeV/nucléon
                </span>
              </div>

              {/* Dynamic SVG Aston Curve */}
              <div className="relative w-full h-64 bg-slate-900 rounded-lg overflow-hidden border border-slate-800">
                <svg className="w-full h-full" viewBox="0 0 520 240">
                  {/* Regions background */}
                  {/* Fusion A < 30 */}
                  <rect x="50" y="20" width="60" height="180" fill="#f59e0b" fillOpacity="0.08" />
                  <text x="80" y="35" fill="#f59e0b" fontSize="9" fontWeight="bold" textAnchor="middle">
                    FUSION
                  </text>

                  {/* Stabilité 40 < A < 100 */}
                  <rect x="130" y="20" width="120" height="180" fill="#10b981" fillOpacity="0.08" />
                  <text x="190" y="35" fill="#10b981" fontSize="9" fontWeight="bold" textAnchor="middle">
                    NOYAUX LES PLUS STABLES
                  </text>

                  {/* Fission A > 120 */}
                  <rect x="290" y="20" width="200" height="180" fill="#f43f5e" fillOpacity="0.08" />
                  <text x="390" y="35" fill="#f43f5e" fontSize="9" fontWeight="bold" textAnchor="middle">
                    FISSION
                  </text>

                  {/* Grid Lines for A */}
                  {[0, 50, 100, 150, 200, 240].map((aVal) => {
                    const x = 50 + (aVal / 240) * 440;
                    return (
                      <g key={aVal}>
                        <line x1={x} y1="20" x2={x} y2="200" stroke="#334155" strokeDasharray="3 3" />
                        <text x={x} y="215" fill="#94a3b8" fontSize="9" textAnchor="middle" fontFamily="monospace">
                          {aVal}
                        </text>
                      </g>
                    );
                  })}

                  {/* Horizontal levels E_l / A from 0 to 10 MeV */}
                  {[0, 2, 4, 6, 8, 10].map((eVal) => {
                    const y = 200 - (eVal / 10) * 170;
                    return (
                      <g key={eVal}>
                        <line x1="50" y1={y} x2="490" y2={y} stroke="#334155" strokeDasharray="2 2" />
                        <text x="45" y={y + 3} fill="#94a3b8" fontSize="9" textAnchor="end" fontFamily="monospace">
                          {eVal}
                        </text>
                      </g>
                    );
                  })}

                  {/* Axes */}
                  <line x1="50" y1="20" x2="50" y2="200" stroke="#cbd5e1" strokeWidth="2" />
                  <line x1="50" y1="200" x2="495" y2="200" stroke="#cbd5e1" strokeWidth="2" />
                  <text x="495" y="215" fill="#cbd5e1" fontSize="9" textAnchor="end">A (nucléons)</text>
                  <text x="45" y="15" fill="#cbd5e1" fontSize="9" textAnchor="start">E_ℓ / A (MeV)</text>

                  {/* Plotted points for all Aston nuclei */}
                  {NOYAUX_ASTON.map((nuc, idx) => {
                    const nA = nuc.A;
                    const nZ = nuc.Z;
                    const nN = nA - nZ;
                    const nElPerA = ((nZ * MP_U + nN * MN_U - nuc.masseNoyauU) * C2_MEV) / nA;
                    const x = 50 + (nA / 240) * 440;
                    const y = 200 - (nElPerA / 10) * 170;
                    const isSelected = idx === selectedAstonNoyauIdx;

                    return (
                      <g key={nuc.nom} className="cursor-pointer" onClick={() => setSelectedAstonNoyauIdx(idx)}>
                        <circle
                          cx={x}
                          cy={y}
                          r={isSelected ? 6 : 3.5}
                          fill={isSelected ? '#38bdf8' : nuc.region === 'fusion' ? '#f59e0b' : nuc.region === 'stable' ? '#10b981' : '#f43f5e'}
                          stroke={isSelected ? '#ffffff' : 'none'}
                          strokeWidth="2"
                        />
                        {(nA === 4 || nA === 56 || nA === 235 || isSelected) && (
                          <text
                            x={x}
                            y={y - (isSelected ? 10 : 6)}
                            fill={isSelected ? '#38bdf8' : '#cbd5e1'}
                            fontSize={isSelected ? '10' : '8'}
                            fontWeight={isSelected ? 'bold' : 'normal'}
                            textAnchor="middle"
                            fontFamily="monospace"
                          >
                            {nuc.symbole}
                          </text>
                        )}
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Explanatory note */}
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                <span>Cliquez sur un point du graphe pour inspecter le noyau correspondant.</span>
                <span className="text-emerald-400 font-semibold">1 u ≈ 931,5 MeV/c²</span>
              </div>
            </div>

            <div className="mt-4 p-3 bg-indigo-50 rounded-xl border border-indigo-200 text-xs text-indigo-950">
              <div>
                <strong>Leçon Clé du Bac :</strong> L’Uranium 238 a une énergie de liaison totale gigantesque (1 800 MeV), mais son <strong>E_ℓ / A (7,57 MeV/nucléon)</strong> est plus faible que celle du Fer 56 (8,79 MeV/nucléon). C’est pour cela que la fission de l’Uranium libère de l’énergie : ses fragments de fission rejoignent le plateau central beaucoup plus stable !
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* TAB 3 : BILAN D'ÉNERGIE & LOIS DE SODDY */}
      {/* ======================================================== */}
      {activeTab === 'reactions' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Reaction picker & Soddy checker */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 block mb-2">
                Sélectionner la Réaction Nucléaire
              </label>
              <select
                value={selectedReactionIdx}
                onChange={(e) => setSelectedReactionIdx(Number(e.target.value))}
                className="w-full text-xs font-medium bg-white border border-slate-300 rounded-lg p-2 text-slate-800 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                {REACTIONS_NUCLEAIRES.map((reac, idx) => (
                  <option key={reac.titre} value={idx}>
                    {reac.type} : {reac.titre}
                  </option>
                ))}
              </select>
            </div>

            {/* Reaction Details */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="p-3 bg-slate-900 rounded-lg text-center overflow-x-auto text-emerald-400">
                <MathRenderer formula={reaction.equationLatex} />
              </div>

              {/* Soddy check pill */}
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-900">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-emerald-700">✓ Lois de Soddy Vérifiées</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-700">
                  Σ A_av = Σ A_ap &amp; Σ Z_av = Σ Z_ap
                </span>
              </div>

              {/* Mass computation */}
              <div className="space-y-2 text-xs font-mono bg-slate-50 p-3 rounded-lg border border-slate-200">
                <div className="flex justify-between text-slate-600">
                  <span>Masse réactifs m_initiale :</span>
                  <span>{reaction.mReactifsU.toFixed(5)} u</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Masse produits m_finale :</span>
                  <span>{reaction.mProduitsU.toFixed(5)} u</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-slate-200 font-bold text-rose-600">
                  <span>Variation Δm = m_f - m_i :</span>
                  <span>{deltaMU.toFixed(5)} u</span>
                </div>
                <div className="text-[11px] text-slate-500 font-sans">
                  Δm &lt; 0 : La masse totale diminue, le système cède de la masse transformée en énergie.
                </div>
              </div>
            </div>
          </div>

          {/* Energy Output & Comparisons */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 text-white shadow-lg space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Bilan Énergétique d’Einstein : ΔE = Δm · c²
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                  Énergie Libérée
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-center">
                  <span className="text-[11px] text-slate-400 block mb-1">Par réaction élémentaire (MeV)</span>
                  <span className="text-xl font-mono font-extrabold text-amber-400">
                    {energieLibereeMev.toFixed(2)} MeV
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1">
                    1 u × c² = 931,5 MeV
                  </span>
                </div>

                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 text-center">
                  <span className="text-[11px] text-slate-400 block mb-1">Par réaction en Joules (J)</span>
                  <span className="text-xl font-mono font-extrabold text-emerald-400">
                    {energieLibereeJoules.toExponential(3)} J
                  </span>
                  <span className="text-[10px] text-slate-500 block mt-1">
                    1 eV = 1,602 × 10⁻¹⁹ J
                  </span>
                </div>
              </div>

              {/* Equivalence 1 gramme */}
              <div className="bg-slate-950/80 p-3.5 rounded-lg border border-slate-800">
                <span className="text-xs font-bold text-slate-200 block mb-1">
                  Puissance prodigieuse : Pour 1 gramme de combustible réagi
                </span>
                <div className="text-xs text-slate-300 space-y-1">
                  <p>
                    Énergie libérée : <strong className="text-emerald-400 font-mono">{(energieParGrammeMJ / 1000).toFixed(1)} GJ/g</strong> (Gigajoules par gramme !)
                  </p>
                  <p>
                    Équivalent énergétique en charbon fossile : <strong className="text-amber-400 font-mono">{(equivalentCharbonKg / 1000).toFixed(1)} tonnes de charbon</strong> !
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-400 italic">
                {reaction.commentaire}
              </p>
            </div>

            {/* Trap Warning */}
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-950">
              <div>
                <strong>Convention de Signe au Bac S2 :</strong> Si la question demande l’énergie <em>échangée par le système</em>, écrivez <strong>ΔE = Δm·c² &lt; 0</strong> (car le système perd de l’énergie). Si la question demande l’énergie <em>fournie au milieu extérieur</em> ou <em>l’énergie libérée</em>, écrivez <strong>E_lib = |ΔE| = |Δm|·c² &gt; 0</strong>.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Experimental Observation Takeaway */}
      <div className="mt-6 p-4 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-950">
        <div>
          <span className="font-bold text-emerald-900 block mb-0.5">
            Synthèse d’Excellence pour l’Épreuve de Physique du Bac S2 :
          </span>
          La physique nucléaire repose sur trois piliers indissociables : la conservation stricte des nucléons et de la charge (lois de Soddy), la décroissance exponentielle N(t) = N₀·e^(-λt) avec la période T = ln 2 / λ régissant les datations archéologiques et médicales, et la célèbre équivalence masse-énergie d’Einstein (E_ℓ = Δm·c²), qui explique pourquoi la fusion des noyaux légers et la fission des noyaux lourds vers le pic du Fer 56 de la courbe d’Aston libèrent des quantités colossales d’énergie.
        </div>
      </div>
    </section>
  );
}
