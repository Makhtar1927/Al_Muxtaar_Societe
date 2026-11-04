'use client';

import React, { useState } from 'react';
import MathRenderer from '@/components/course/math-renderer';
import {
  FlaskConical,
  Gauge,
  Sparkles,
  Layers,
  RotateCcw,
  Scale,
  Percent,
  Sliders,
  TrendingUp,
} from 'lucide-react';

interface AcidBaseCouple {
  id: string;
  name: string;
  acidFormula: string;
  baseFormula: string;
  pKa: number;
  Ka: number;
  description: string;
}

const COUPLES: AcidBaseCouple[] = [
  {
    id: 'methanoique',
    name: 'Acide Méthanoïque / Ion Méthanoate',
    acidFormula: 'HCOOH',
    baseFormula: 'HCOO⁻',
    pKa: 3.8,
    Ka: 1.58e-4,
    description: 'Acide formique des piqûres de fourmis, le plus fort des acides carboxyliques simples au Bac S2.',
  },
  {
    id: 'ethanoique',
    name: 'Acide Éthanoïque / Ion Éthanoate',
    acidFormula: 'CH₃COOH',
    baseFormula: 'CH₃COO⁻',
    pKa: 4.8,
    Ka: 1.58e-5,
    description: 'Acide acétique du vinaigre, le couple acide faible de référence incontournable au Bac sénégalais.',
  },
  {
    id: 'ammonium',
    name: 'Ion Ammonium / Ammoniac',
    acidFormula: 'NH₄⁺',
    baseFormula: 'NH₃',
    pKa: 9.2,
    Ka: 6.31e-10,
    description: 'Couple basique type, ammoniac très soluble avec une solution basique d’odeur piquante.',
  },
  {
    id: 'acide_nitreux',
    name: 'Acide Nitreux / Ion Nitrite',
    acidFormula: 'HNO₂',
    baseFormula: 'NO₂⁻',
    pKa: 3.3,
    Ka: 5.01e-4,
    description: 'Acide faible plus dissocié que l’acide acétique, classique des épreuves de séries S.',
  },
  {
    id: 'acide_carbonique',
    name: 'Acide Carbonique / Ion Hydrogénocarbonate',
    acidFormula: 'H₂CO₃',
    baseFormula: 'HCO₃⁻',
    pKa: 6.4,
    Ka: 3.98e-7,
    description: 'Tampon biologique fondamental régulant le pH du sang humain autour de 7,4.',
  },
];

export default function AcideFaibleBaseFaibleInteractiveSimulator() {
  const [activeTab, setActiveTab] = useState<'predominance' | 'distribution' | 'ostwald' | 'echelle'>('predominance');

  // Paramètres du simulateur
  const [selectedCoupleId, setSelectedCoupleId] = useState<string>('ethanoique');
  const [ph, setPh] = useState<number>(4.8); // 0 à 14
  const [concentrationLog, setConcentrationLog] = useState<number>(-2.0); // log10(C) de -4 à -1 => C de 10⁻⁴ à 10⁻¹

  const couple = COUPLES.find((c) => c.id === selectedCoupleId) || COUPLES[1];

  // Calcul des pourcentages de prédominance
  // [A⁻]/[HA] = 10^(pH - pKa)
  // %HA = 100 / (1 + 10^(pH - pKa))
  // %A⁻ = 100 - %HA
  const delta = ph - couple.pKa;
  const ratio = Math.pow(10, delta);
  const pctAcid = 100 / (1 + ratio);
  const pctBase = 100 - pctAcid;

  // Calcul pour la loi d'Ostwald (Atelier 3)
  const cOstwald = Math.pow(10, concentrationLog); // mol/L
  // Équation Ka = C * alpha^2 / (1 - alpha) => C * alpha^2 + Ka * alpha - Ka = 0
  // alpha = (-Ka + sqrt(Ka^2 + 4 * Ka * C)) / (2 * C)
  const ka = couple.Ka;
  const alpha = (-ka + Math.sqrt(ka * ka + 4 * ka * cOstwald)) / (2 * cOstwald);
  const concH3O = cOstwald * alpha;
  const phOstwald = -Math.log10(concH3O);

  // SVG dimensions pour la courbe de distribution
  const svgWidth = 440;
  const svgHeight = 220;
  const padLeft = 40;
  const padRight = 20;
  const padTop = 20;
  const padBottom = 35;
  const graphWidth = svgWidth - padLeft - padRight;
  const graphHeight = svgHeight - padTop - padBottom;

  const getSvgX = (phVal: number) => padLeft + (phVal / 14) * graphWidth;
  const getSvgY = (pctVal: number) => padTop + graphHeight - (pctVal / 100) * graphHeight;

  // Génération des courbes %HA et %A⁻ de pH 0 à 14
  const acidCurvePoints: string[] = [];
  const baseCurvePoints: string[] = [];

  for (let p = 0; p <= 14; p += 0.25) {
    const r = Math.pow(10, p - couple.pKa);
    const pAcid = 100 / (1 + r);
    const pBase = 100 - pAcid;
    acidCurvePoints.push(`${getSvgX(p).toFixed(1)},${getSvgY(pAcid).toFixed(1)}`);
    baseCurvePoints.push(`${getSvgX(p).toFixed(1)},${getSvgY(pBase).toFixed(1)}`);
  }

  const acidPath = `M ${acidCurvePoints.join(' L ')}`;
  const basePath = `M ${baseCurvePoints.join(' L ')}`;

  const currentX = getSvgX(ph);

  return (
    <div className="bg-white rounded-2xl border border-navy/10 p-4 sm:p-6 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-turquoise/10 text-turquoise">
              <FlaskConical className="w-5 h-5" />
            </span>
            <h3 className="font-bold text-navy text-lg">Laboratoire Virtuel des Équilibres Acide-Base Faibles</h3>
          </div>
          <p className="text-xs sm:text-sm text-text/70 mt-1">
            Diagrammes de prédominance, courbes de distribution, loi de dilution d’Ostwald et échelle des pKa
          </p>
        </div>
        <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          Atelier Virtuel S2
        </span>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={() => setActiveTab('predominance')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'predominance'
              ? 'bg-turquoise text-white shadow-md'
              : 'bg-surface hover:bg-navy/5 text-navy border border-navy/10'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>1. Prédominance</span>
        </button>

        <button
          onClick={() => setActiveTab('distribution')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'distribution'
              ? 'bg-turquoise text-white shadow-md'
              : 'bg-surface hover:bg-navy/5 text-navy border border-navy/10'
          }`}
        >
          <Percent className="w-4 h-4" />
          <span>2. Courbes Sigmoïdes</span>
        </button>

        <button
          onClick={() => setActiveTab('ostwald')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'ostwald'
              ? 'bg-turquoise text-white shadow-md'
              : 'bg-surface hover:bg-navy/5 text-navy border border-navy/10'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>3. Dilution d’Ostwald</span>
        </button>

        <button
          onClick={() => setActiveTab('echelle')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'echelle'
              ? 'bg-turquoise text-white shadow-md'
              : 'bg-surface hover:bg-navy/5 text-navy border border-navy/10'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>4. Échelle des pKa</span>
        </button>
      </div>

      {/* SÉLECTEUR DU COUPLE ACIDE/BASE (Commun à tous les onglets) */}
      <div className="bg-surface rounded-xl p-3 border border-navy/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-0.5">
          <span className="text-[10px] uppercase font-bold text-navy/50 tracking-wider">Couple étudié :</span>
          <h4 className="text-xs sm:text-sm font-bold text-navy flex items-center gap-2">
            <span>{couple.name}</span>
            <span className="px-2 py-0.5 rounded-md bg-white border border-navy/15 text-turquoise font-mono font-bold text-xs">
              pKa = {couple.pKa}
            </span>
          </h4>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {COUPLES.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setSelectedCoupleId(c.id);
                setPh(c.pKa); // recentrer sur le pKa
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                selectedCoupleId === c.id
                  ? 'bg-navy text-white shadow-xs'
                  : 'bg-white text-navy border border-navy/10 hover:bg-navy/5'
              }`}
            >
              {c.acidFormula} (pKa {c.pKa})
            </button>
          ))}
        </div>
      </div>

      {/* ATELIER 1 : DIAGRAMME DE PRÉDOMINANCE */}
      {activeTab === 'predominance' && (
        <div className="space-y-4">
          <div className="bg-surface rounded-2xl p-4 border border-navy/10 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-navy flex items-center gap-1.5">
                <span>🎚️</span>
                <span>Variation Continue du pH de la Solution</span>
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPh(couple.pKa)}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-xs shadow-xs hover:bg-emerald-700"
                >
                  À pH = pKa ({couple.pKa})
                </button>
                <span className="font-mono text-base font-bold text-turquoise bg-white px-3 py-0.5 rounded-lg border border-navy/10">
                  pH = {ph.toFixed(2)}
                </span>
              </div>
            </div>

            <input
              type="range"
              min={0}
              max={14}
              step={0.1}
              value={ph}
              onChange={(e) => setPh(Number(e.target.value))}
              className="w-full accent-turquoise cursor-pointer"
            />

            <div className="flex justify-between text-[10px] text-text/50 font-mono">
              <span>pH 0 (Très acide)</span>
              <span className="font-bold text-emerald-600">pKa = {couple.pKa} (50% / 50%)</span>
              <span>pH 14 (Très basique)</span>
            </div>
          </div>

          {/* Barres de proportions relatives */}
          <div className="bg-white rounded-2xl p-4 border border-navy/10 shadow-xs space-y-4">
            <div className="flex justify-between items-center text-xs font-bold text-navy">
              <span>Répartition en Pourcentage des Espèces à l’Équilibre :</span>
              <span className="text-[11px] font-mono text-text/60">
                [A⁻]/[HA] = {ratio < 0.001 ? '< 0.001' : ratio > 1000 ? '> 1000' : ratio.toFixed(3)}
              </span>
            </div>

            {/* Barre double dynamique */}
            <div className="w-full h-8 rounded-xl overflow-hidden flex border border-navy/15 shadow-inner">
              <div
                style={{ width: `${pctAcid}%` }}
                className="bg-amber-500 text-white text-xs font-bold flex items-center justify-center transition-all duration-300"
              >
                {pctAcid >= 15 && `[${couple.acidFormula}] ${pctAcid.toFixed(1)}%`}
              </div>
              <div
                style={{ width: `${pctBase}%` }}
                className="bg-blue-600 text-white text-xs font-bold flex items-center justify-center transition-all duration-300"
              >
                {pctBase >= 15 && `[${couple.baseFormula}] ${pctBase.toFixed(1)}%`}
              </div>
            </div>

            {/* Cartes d'état */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div
                className={`p-3 rounded-xl border transition-all ${
                  ph < couple.pKa - 0.1
                    ? 'border-amber-400 bg-amber-50/70 text-amber-950 font-semibold shadow-xs'
                    : 'border-navy/10 bg-slate-50 text-text/60'
                }`}
              >
                <span className="font-bold block mb-1">
                  {ph < couple.pKa - 0.1 ? '⭐ Acide Prédominant' : 'Zone Acide'}
                </span>
                <p className="text-[11px]">
                  pH &lt; pKa ⟹ [{couple.acidFormula}] &gt; [{couple.baseFormula}]
                </p>
                <span className="block mt-1 font-mono font-bold text-amber-700">
                  {pctAcid.toFixed(1)}% de {couple.acidFormula}
                </span>
              </div>

              <div
                className={`p-3 rounded-xl border transition-all ${
                  Math.abs(ph - couple.pKa) <= 0.1
                    ? 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold shadow-xs'
                    : 'border-navy/10 bg-slate-50 text-text/60'
                }`}
              >
                <span className="font-bold block mb-1">
                  {Math.abs(ph - couple.pKa) <= 0.1 ? '🎯 Demi-Égalité Parfaite' : 'Frontière pKa'}
                </span>
                <p className="text-[11px]">
                  pH = pKa ⟹ [{couple.acidFormula}] = [{couple.baseFormula}]
                </p>
                <span className="block mt-1 font-mono font-bold text-emerald-700">
                  50% / 50% exact
                </span>
              </div>

              <div
                className={`p-3 rounded-xl border transition-all ${
                  ph > couple.pKa + 0.1
                    ? 'border-blue-400 bg-blue-50/70 text-blue-950 font-semibold shadow-xs'
                    : 'border-navy/10 bg-slate-50 text-text/60'
                }`}
              >
                <span className="font-bold block mb-1">
                  {ph > couple.pKa + 0.1 ? '⭐ Base Prédominante' : 'Zone Basique'}
                </span>
                <p className="text-[11px]">
                  pH &gt; pKa ⟹ [{couple.baseFormula}] &gt; [{couple.acidFormula}]
                </p>
                <span className="block mt-1 font-mono font-bold text-blue-700">
                  {pctBase.toFixed(1)}% de {couple.baseFormula}
                </span>
              </div>
            </div>
          </div>

          {/* Axe de prédominance SVG */}
          <div className="bg-white rounded-2xl p-4 border border-navy/10 space-y-2">
            <span className="text-xs font-bold text-navy block">Diagramme de Prédominance sur l’Axe des pH :</span>

            <svg viewBox="0 0 440 70" className="w-full h-auto">
              {/* Ligne principale */}
              <line x1="20" y1="35" x2="420" y2="35" stroke="#94A3B8" strokeWidth="2" />
              <polygon points="420,31 430,35 420,39" fill="#94A3B8" />

              {/* Graduation 0, 7, 14 */}
              <line x1="25" y1="30" x2="25" y2="40" stroke="#64748B" strokeWidth="1.5" />
              <text x="25" y="52" textAnchor="middle" fontSize="10" fill="#64748B">0</text>
              <line x1="225" y1="30" x2="225" y2="40" stroke="#64748B" strokeWidth="1.5" />
              <text x="225" y="52" textAnchor="middle" fontSize="10" fill="#64748B">7</text>
              <line x1="415" y1="30" x2="415" y2="40" stroke="#64748B" strokeWidth="1.5" />
              <text x="415" y="52" textAnchor="middle" fontSize="10" fill="#64748B">14</text>
              <text x="430" y="52" textAnchor="start" fontSize="10" fill="#64748B">pH</text>

              {/* Position du pKa */}
              {(() => {
                const xPka = 25 + (couple.pKa / 14) * 390;
                return (
                  <g>
                    <line x1={xPka} y1="20" x2={xPka} y2="50" stroke="#10B981" strokeWidth="2.5" />
                    <text x={xPka} y="15" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#10B981">
                      pKa = {couple.pKa}
                    </text>
                    {/* Zone Acide prédomine */}
                    <text x={Math.max(45, xPka - 60)} y="28" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#D97706">
                      [{couple.acidFormula}] prédomine
                    </text>
                    {/* Zone Base prédomine */}
                    <text x={Math.min(390, xPka + 65)} y="28" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#2563EB">
                      [{couple.baseFormula}] prédomine
                    </text>
                  </g>
                );
              })()}

              {/* Curseur de pH actuel */}
              {(() => {
                const xCur = 25 + (ph / 14) * 390;
                return (
                  <g>
                    <circle cx={xCur} cy="35" r="5" fill="#EF4444" className="animate-pulse" />
                    <circle cx={xCur} cy="35" r="2" fill="#FFFFFF" />
                  </g>
                );
              })()}
            </svg>
          </div>
        </div>
      )}

      {/* ATELIER 2 : COURBES DE DISTRIBUTION CROISÉES */}
      {activeTab === 'distribution' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 bg-surface p-4 rounded-2xl border border-navy/10">
            <div>
              <h4 className="font-bold text-navy text-sm">Courbes de Distribution en Sigmoïde Croisées</h4>
              <p className="text-xs text-text/70 mt-0.5">
                Intersection rigoureuse des deux courbes à 50% exactement à l’abscisse pH = pKa.
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1 font-bold text-amber-600">
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" /> % {couple.acidFormula}
              </span>
              <span className="flex items-center gap-1 font-bold text-blue-600">
                <span className="w-3 h-3 rounded-full bg-blue-600 inline-block" /> % {couple.baseFormula}
              </span>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-navy/10 p-4 shadow-xs">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto">
              {/* Grille horizontale % */}
              {[0, 20, 40, 50, 60, 80, 100].map((pctLvl) => (
                <g key={pctLvl}>
                  <line
                    x1={padLeft}
                    y1={getSvgY(pctLvl)}
                    x2={svgWidth - padRight}
                    y2={getSvgY(pctLvl)}
                    stroke={pctLvl === 50 ? '#10B981' : '#F1F5F9'}
                    strokeWidth={pctLvl === 50 ? 1.5 : 1}
                    strokeDasharray={pctLvl === 50 ? '3 3' : undefined}
                  />
                  <text
                    x={padLeft - 6}
                    y={getSvgY(pctLvl) + 3}
                    textAnchor="end"
                    fontSize="9"
                    fill={pctLvl === 50 ? '#10B981' : '#94A3B8'}
                    fontWeight={pctLvl === 50 ? 'bold' : 'normal'}
                  >
                    {pctLvl}%
                  </text>
                </g>
              ))}

              {/* Grille verticale pH */}
              {[0, 2, 4, 6, 8, 10, 12, 14].map((phVal) => (
                <g key={phVal}>
                  <line
                    x1={getSvgX(phVal)}
                    y1={padTop}
                    x2={getSvgX(phVal)}
                    y2={padTop + graphHeight}
                    stroke="#F1F5F9"
                    strokeWidth="1"
                  />
                  <text
                    x={getSvgX(phVal)}
                    y={padTop + graphHeight + 14}
                    textAnchor="middle"
                    fontSize="9"
                    fill="#94A3B8"
                  >
                    {phVal}
                  </text>
                </g>
              ))}

              {/* Ligne verticale au pKa */}
              {(() => {
                const xPka = getSvgX(couple.pKa);
                const y50 = getSvgY(50);
                return (
                  <g>
                    <line
                      x1={xPka}
                      y1={padTop}
                      x2={xPka}
                      y2={padTop + graphHeight}
                      stroke="#10B981"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                    />
                    <circle cx={xPka} cy={y50} r="5" fill="#10B981" />
                    <text x={xPka + 6} y={y50 - 6} fill="#10B981" fontSize="10" fontWeight="bold">
                      pKa = {couple.pKa} (50%)
                    </text>
                  </g>
                );
              })()}

              {/* Courbes en sigmoïde */}
              <path d={acidPath} fill="none" stroke="#F59E0B" strokeWidth="2.5" />
              <path d={basePath} fill="none" stroke="#2563EB" strokeWidth="2.5" />

              {/* Curseur de pH actuel */}
              <line
                x1={currentX}
                y1={padTop}
                x2={currentX}
                y2={padTop + graphHeight}
                stroke="#EF4444"
                strokeWidth="1.5"
              />
              <circle cx={currentX} cy={getSvgY(pctAcid)} r="4" fill="#F59E0B" />
              <circle cx={currentX} cy={getSvgY(pctBase)} r="4" fill="#2563EB" />
            </svg>
          </div>
        </div>
      )}

      {/* ATELIER 3 : LOI DE DILUTION D'OSTWALD */}
      {activeTab === 'ostwald' && (
        <div className="space-y-4">
          <div className="bg-surface rounded-2xl p-4 border border-navy/10 space-y-3">
            <h4 className="font-bold text-navy text-sm">Simulation de la Dilution d’un Acide Faible</h4>
            <p className="text-xs text-text/70">
              Déplacez la concentration de {couple.acidFormula} pour observer l’évolution du coefficient de
              dissociation α et du pH.
            </p>

            <div className="bg-white p-3 rounded-xl border border-navy/10 space-y-1.5">
              <div className="flex justify-between items-center text-xs font-semibold text-navy">
                <span>Concentration C de l’acide :</span>
                <span className="font-mono text-turquoise font-bold text-sm">
                  {cOstwald >= 0.01 ? cOstwald.toFixed(3) : cOstwald.toExponential(2)} mol/L
                </span>
              </div>
              <input
                type="range"
                min={-4}
                max={-1}
                step={0.1}
                value={concentrationLog}
                onChange={(e) => setConcentrationLog(Number(e.target.value))}
                className="w-full accent-turquoise cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-text/50 font-mono">
                <span>10⁻⁴ mol/L (Très dilué)</span>
                <span>10⁻² mol/L</span>
                <span>10⁻¹ mol/L (Concentré)</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
            <div className="bg-white rounded-xl p-3 border border-navy/10 shadow-2xs">
              <span className="text-[10px] text-text/50 uppercase block font-semibold">Coefficient α</span>
              <span className="text-xl font-bold text-turquoise">{(alpha * 100).toFixed(2)} %</span>
              <span className="text-[9px] text-text/40 block">dissocié dans l’eau</span>
            </div>

            <div className="bg-white rounded-xl p-3 border border-navy/10 shadow-2xs">
              <span className="text-[10px] text-text/50 uppercase block font-semibold">[H₃O⁺]</span>
              <span className="text-xl font-bold text-navy font-mono">
                {concH3O.toExponential(2)}
              </span>
              <span className="text-[9px] text-text/40 block">mol/L</span>
            </div>

            <div className="bg-white rounded-xl p-3 border border-navy/10 shadow-2xs">
              <span className="text-[10px] text-text/50 uppercase block font-semibold">pH Résultant</span>
              <span className="text-xl font-bold text-emerald-600 font-mono">{phOstwald.toFixed(2)}</span>
              <span className="text-[9px] text-text/40 block">tend vers 7 si C ⟶ 0</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 space-y-1">
            <span className="font-bold text-amber-900 block">💡 Conclusion de la Loi d’Ostwald au Bac S2 :</span>
            <p>
              Plus la solution est <strong>diluée</strong> (C diminue), plus l’acide est <strong>dissocié en pourcentage</strong> (α augmente).
              Cependant, le volume augmente plus vite que la dissociation : la concentration globale en ions H₃O⁺ diminue, et le <strong>pH augmente</strong> (se rapproche de 7 sans jamais le dépasser).
            </p>
          </div>
        </div>
      )}

      {/* ATELIER 4 : ÉCHELLE DES PKA */}
      {activeTab === 'echelle' && (
        <div className="space-y-4">
          <div className="bg-surface rounded-2xl p-4 border border-navy/10">
            <h4 className="font-bold text-navy text-sm">Classification des Couples Acide/Base au Bac S2</h4>
            <p className="text-xs text-text/70 mt-1">
              Plus le pKa est faible, plus l’acide est fort. Plus le pKa est élevé, plus la base conjuguée est forte.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-4 border border-navy/10 shadow-xs space-y-3">
            <div className="flex justify-between text-xs font-bold px-2">
              <span className="text-rose-600 flex items-center gap-1">⬇️ Force croissante de l’acide (pKa diminue)</span>
              <span className="text-blue-600 flex items-center gap-1">⬆️ Force croissante de la base (pKa augmente)</span>
            </div>

            <div className="space-y-2">
              {[
                { acid: 'H₃O⁺', base: 'H₂O', pKa: 0.0, highlight: false },
                { acid: 'HNO₂', base: 'NO₂⁻', pKa: 3.3, highlight: false },
                { acid: 'HCOOH', base: 'HCOO⁻', pKa: 3.8, highlight: false },
                { acid: 'CH₃COOH', base: 'CH₃COO⁻', pKa: 4.8, highlight: true },
                { acid: 'H₂CO₃', base: 'HCO₃⁻', pKa: 6.4, highlight: false },
                { acid: 'NH₄⁺', base: 'NH₃', pKa: 9.2, highlight: true },
                { acid: 'HCO₃⁻', base: 'CO₃²⁻', pKa: 10.3, highlight: false },
                { acid: 'H₂O', base: 'OH⁻', pKa: 14.0, highlight: false },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-all ${
                    item.highlight
                      ? 'border-turquoise bg-turquoise/5 font-semibold'
                      : 'border-navy/10 bg-slate-50/50'
                  }`}
                >
                  <span className="font-bold text-amber-700 w-24">{item.acid}</span>
                  <div className="flex-1 flex items-center justify-center">
                    <span className="px-2.5 py-0.5 rounded-md bg-white border border-navy/15 font-mono font-bold text-navy text-[11px]">
                      pKa = {item.pKa.toFixed(1)}
                    </span>
                  </div>
                  <span className="font-bold text-blue-700 w-24 text-right">{item.base}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
