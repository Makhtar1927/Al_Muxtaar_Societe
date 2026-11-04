'use client';

import React, { useState } from 'react';
import MathRenderer from '@/components/course/math-renderer';
import {
  FlaskConical,
  Gauge,
  Flame,
  Pipette,
  Layers,
  Sparkles,
  Droplets,
  AlertTriangle,
  Info,
  CheckCircle2,
  RefreshCw,
} from 'lucide-react';

interface SolutionSample {
  id: string;
  name: string;
  formula: string;
  pH: number;
  nature: 'acide' | 'neutre' | 'base';
  description: string;
  color: string;
}

const COMMON_SOLUTIONS: SolutionSample[] = [
  {
    id: 'hcl',
    name: 'Acide chlorhydrique (0,1 M)',
    formula: 'H₃O⁺ + Cl⁻',
    pH: 1.0,
    nature: 'acide',
    description: 'Acide fort totalement dissocié, concentration [H₃O⁺] = 0,1 mol/L.',
    color: '#F87171',
  },
  {
    id: 'vinaigre',
    name: 'Vinaigre d’alcool (acide acétique)',
    formula: 'CH₃COOH',
    pH: 2.8,
    nature: 'acide',
    description: 'Acide faible partiellement dissocié en solution aqueuse.',
    color: '#FB923C',
  },
  {
    id: 'salive',
    name: 'Salive humaine saine',
    formula: 'Milieu tamponné',
    pH: 6.8,
    nature: 'acide',
    description: 'Légèrement acide, protège l’émail dentaire.',
    color: '#FACC15',
  },
  {
    id: 'eau_pure',
    name: 'Eau pure distillée (25 °C)',
    formula: 'H₂O',
    pH: 7.0,
    nature: 'neutre',
    description: 'Neutralité stricte : [H₃O⁺] = [OH⁻] = 1,0 × 10⁻⁷ mol/L.',
    color: '#34D399',
  },
  {
    id: 'sang',
    name: 'Sang humain physiologique',
    formula: 'Tampon HCO₃⁻ / CO₂',
    pH: 7.4,
    nature: 'base',
    description: 'Légèrement basique, régulé très précisément par l’organisme.',
    color: '#2DD4BF',
  },
  {
    id: 'mer',
    name: 'Eau de mer océanique',
    formula: 'Sels minéraux',
    pH: 8.2,
    nature: 'base',
    description: 'Riche en ions carbonate et hydrogénocarbonate.',
    color: '#38BDF8',
  },
  {
    id: 'javel',
    name: 'Eau de Javel commerciale',
    formula: 'ClO⁻ + Na⁺',
    pH: 11.5,
    nature: 'base',
    description: 'Solution très basique et oxydante d’hypochlorite de sodium.',
    color: '#818CF8',
  },
  {
    id: 'naoh',
    name: 'Soude caustique (0,1 M)',
    formula: 'Na⁺ + OH⁻',
    pH: 13.0,
    nature: 'base',
    description: 'Base forte totalement dissociée, [OH⁻] = 0,1 mol/L.',
    color: '#A855F7',
  },
];

interface Indicator {
  id: string;
  name: string;
  pKi: number;
  acidColor: string;
  acidColorHex: string;
  baseColor: string;
  baseColorHex: string;
  sensibleColor: string;
  sensibleColorHex: string;
  rangeMin: number;
  rangeMax: number;
}

const INDICATORS: Indicator[] = [
  {
    id: 'helianthine',
    name: 'Hélianthine (Méthylorange)',
    pKi: 3.7,
    acidColor: 'Rouge cerise',
    acidColorHex: '#DC2626',
    sensibleColor: 'Teinte orangée',
    sensibleColorHex: '#EA580C',
    baseColor: 'Jaune d’or',
    baseColorHex: '#EAB308',
    rangeMin: 3.1,
    rangeMax: 4.4,
  },
  {
    id: 'bbt',
    name: 'Bleu de Bromothymol (BBT)',
    pKi: 7.0,
    acidColor: 'Jaune citron',
    acidColorHex: '#EAB308',
    sensibleColor: 'Vert émeraude',
    sensibleColorHex: '#10B981',
    baseColor: 'Bleu outremer',
    baseColorHex: '#1D4ED8',
    rangeMin: 6.0,
    rangeMax: 7.6,
  },
  {
    id: 'phenolphtaleine',
    name: 'Phénolphtaléine',
    pKi: 9.4,
    acidColor: 'Incolore',
    acidColorHex: 'rgba(240, 248, 255, 0.4)',
    sensibleColor: 'Rose pâle',
    sensibleColorHex: '#F472B6',
    baseColor: 'Rose violacé intense',
    baseColorHex: '#BE185D',
    rangeMin: 8.2,
    rangeMax: 10.0,
  },
];

export default function AutoprotolysePhInteractiveSimulator() {
  const [activeTab, setActiveTab] = useState<'phmetre' | 'temperature' | 'indicateurs' | 'dilution'>('phmetre');

  // Atelier 1 : pH-mètre
  const [selectedSolution, setSelectedSolution] = useState<SolutionSample>(COMMON_SOLUTIONS[3]); // Eau pure
  const [customPh, setCustomPh] = useState<number>(7.0);

  // Atelier 2 : Température et Autoprotolyse de l'eau
  const [tempCelsius, setTempCelsius] = useState<number>(25);

  // Atelier 3 : Indicateurs colorés
  const [selectedIndicator, setSelectedIndicator] = useState<Indicator>(INDICATORS[1]); // BBT
  const [indicatorPh, setIndicatorPh] = useState<number>(7.0);

  // Atelier 4 : Dilution continue
  const [initialAcidConc, setInitialAcidConc] = useState<number>(0.01); // 10^-2 mol/L
  const [dilutionFactor, setDilutionFactor] = useState<number>(1); // 1, 10, 100, 1000, 10000

  // Calculs Atelier 1
  const h3oConc = Math.pow(10, -customPh);
  const ohConc = Math.pow(10, -(14.0 - customPh));

  // Calculs Atelier 2 (pKe en fonction de T d'après formule empirique)
  // À 0°C pKe = 14.94, à 25°C pKe = 14.00, à 60°C pKe = 13.02, à 100°C pKe = 12.29
  const calcPKe = (temp: number) => {
    return Math.round((14.94 - 0.038 * temp + 0.00011 * temp * temp) * 100) / 100;
  };
  const currentPKe = calcPKe(tempCelsius);
  const currentKe = Math.pow(10, -currentPKe);
  const neutralPh = Math.round((currentPKe / 2) * 100) / 100;
  const neutralH3O = Math.sqrt(currentKe);

  // Calculs Atelier 3 (Couleur de l'indicateur selon le pH)
  const getIndicatorColor = (ph: number, ind: Indicator) => {
    if (ph < ind.rangeMin) return ind.acidColorHex;
    if (ph > ind.rangeMax) return ind.baseColorHex;
    return ind.sensibleColorHex;
  };
  const getIndicatorStateName = (ph: number, ind: Indicator) => {
    if (ph < ind.rangeMin) return `Forme acide HIn dominante (${ind.acidColor})`;
    if (ph > ind.rangeMax) return `Forme basique In⁻ dominante (${ind.baseColor})`;
    return `Zone de virage : Teinte sensible (${ind.sensibleColor})`;
  };

  // Calculs Atelier 4 (Dilution d'un acide fort avec prise en compte autoprotolyse de l'eau)
  // [H3O+]^2 - C_dilue * [H3O+] - 10^-14 = 0
  const cDilue = initialAcidConc / dilutionFactor;
  const h3oReal = (cDilue + Math.sqrt(cDilue * cDilue + 4 * 1e-14)) / 2;
  const phDilue = Math.round(-Math.log10(h3oReal) * 100) / 100;

  return (
    <div className="bg-white rounded-3xl border border-navy/10 p-5 sm:p-7 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/10 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-turquoise-light text-turquoise">
              <FlaskConical className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-navy">
              Laboratoire Virtuel : Autoprotolyse de l&apos;Eau, pH &amp; Indicateurs (Bac S2)
            </h3>
          </div>
          <p className="text-sm text-text/70">
            Sonde pH-métrique de précision, équilibre de l’eau à température variable, nuancier de virage et dilution limite.
          </p>
        </div>
        <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          Chimie Terminale S2
        </span>
      </div>

      {/* Tabs navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={() => setActiveTab('phmetre')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'phmetre'
              ? 'bg-turquoise text-white shadow-md'
              : 'bg-surface hover:bg-navy/5 text-navy border border-navy/10'
          }`}
        >
          <Gauge className="w-4 h-4" />
          <span>1. pH-mètre Digital</span>
        </button>

        <button
          onClick={() => setActiveTab('temperature')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'temperature'
              ? 'bg-turquoise text-white shadow-md'
              : 'bg-surface hover:bg-navy/5 text-navy border border-navy/10'
          }`}
        >
          <Flame className="w-4 h-4" />
          <span>2. T°C &amp; Ke de l&apos;Eau</span>
        </button>

        <button
          onClick={() => setActiveTab('indicateurs')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'indicateurs'
              ? 'bg-turquoise text-white shadow-md'
              : 'bg-surface hover:bg-navy/5 text-navy border border-navy/10'
          }`}
        >
          <Droplets className="w-4 h-4" />
          <span>3. Indicateurs &amp; Virage</span>
        </button>

        <button
          onClick={() => setActiveTab('dilution')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'dilution'
              ? 'bg-turquoise text-white shadow-md'
              : 'bg-surface hover:bg-navy/5 text-navy border border-navy/10'
          }`}
        >
          <Pipette className="w-4 h-4" />
          <span>4. Dilution Limite</span>
        </button>
      </div>

      {/* ATELIER 1 : PH-MÈTRE DIGITAL DE PAILLASSE */}
      {activeTab === 'phmetre' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Colonne de gauche : Sélection de solution et curseur */}
          <div className="lg:col-span-5 space-y-4 bg-surface rounded-2xl p-4 border border-navy/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy flex items-center gap-1.5">
              <span>🧪</span>
              <span>Solutions Étalons à Mesurer</span>
            </h4>

            {/* Grille des solutions */}
            <div className="grid grid-cols-2 gap-2">
              {COMMON_SOLUTIONS.map((sol) => (
                <button
                  key={sol.id}
                  onClick={() => {
                    setSelectedSolution(sol);
                    setCustomPh(sol.pH);
                  }}
                  className={`p-2 rounded-xl border text-left transition-all ${
                    selectedSolution.id === sol.id
                      ? 'border-turquoise bg-turquoise-light text-navy font-bold shadow-xs'
                      : 'border-navy/10 bg-white hover:border-turquoise/40 text-navy/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold truncate">{sol.name.split('(')[0]}</span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded-full ${
                        sol.nature === 'acide'
                          ? 'bg-rose-100 text-rose-700'
                          : sol.nature === 'neutre'
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {sol.pH.toFixed(1)}
                    </span>
                  </div>
                  <span className="text-[9px] text-text/50 block font-mono">{sol.formula}</span>
                </button>
              ))}
            </div>

            {/* Curseur de pH libre */}
            <div className="space-y-1.5 pt-2 border-t border-navy/10">
              <div className="flex justify-between text-xs font-semibold text-navy">
                <span>Curseur Manuel de pH (0 à 14) :</span>
                <span className="font-mono text-turquoise font-bold text-sm">{customPh.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min={0}
                max={14}
                step={0.1}
                value={customPh}
                onChange={(e) => setCustomPh(Number(e.target.value))}
                className="w-full accent-turquoise cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-text/50">
                <span className="text-rose-600 font-bold">Acide fort (0)</span>
                <span className="text-emerald-600 font-bold">Neutre (7)</span>
                <span className="text-blue-600 font-bold">Base forte (14)</span>
              </div>
            </div>

            {/* Description pédagogique */}
            <div className="p-3 rounded-xl bg-white border border-navy/10 space-y-1 text-xs">
              <span className="font-bold text-navy">{selectedSolution.name}</span>
              <p className="text-text/70 text-[11px] leading-relaxed">{selectedSolution.description}</p>
            </div>
          </div>

          {/* Colonne de droite : Paillasse SVG & Métriques */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-surface rounded-2xl p-4 border border-navy/10">
              {/* Montage SVG : Boîtier pH-mètre + Électrode combinée en verre dans le bécher */}
              <div className="sm:col-span-6 flex flex-col items-center">
                <span className="text-xs font-bold text-navy mb-1">pH-mètre Digital &amp; Électrode en Verre</span>

                <svg viewBox="0 0 200 240" className="w-44 h-52 drop-shadow">
                  {/* Boîtier pH-mètre de paillasse */}
                  <rect x="25" y="15" width="150" height="70" rx="8" fill="#1E293B" stroke="#0F172A" strokeWidth="2.5" />
                  <rect x="30" y="20" width="140" height="15" rx="4" fill="#334155" />
                  <text x="100" y="31" textAnchor="middle" fill="#CBD5E1" fontSize="8" fontWeight="bold" letterSpacing="1">
                    METTLER pH 2026 • 25 °C
                  </text>
                  {/* Écran digital LCD vert émeraude */}
                  <rect x="40" y="42" width="120" height="36" rx="5" fill="#064E3B" stroke="#047857" strokeWidth="1.5" />
                  <text x="100" y="67" textAnchor="middle" fill="#A7F3D0" fontSize="22" fontFamily="monospace" fontWeight="bold">
                    {customPh.toFixed(2)}
                  </text>

                  {/* Câble BNC souple reliant le boîtier à l'électrode */}
                  <path d="M 100 85 C 100 110, 140 100, 125 125" fill="none" stroke="#0F172A" strokeWidth="3" />

                  {/* Bécher Pyrex 250 mL */}
                  <path
                    d="M 50 120 L 50 215 A 8 8 0 0 0 58 223 L 142 223 A 8 8 0 0 0 150 215 L 150 120 Z"
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="3"
                  />
                  {/* Bec verseur */}
                  <path d="M 47 120 L 40 116 L 50 123" fill="none" stroke="#94A3B8" strokeWidth="2" />

                  {/* Solution liquide dans le bécher */}
                  <path
                    d="M 52 145 L 52 215 A 6 6 0 0 0 58 221 L 142 221 A 6 6 0 0 0 148 215 L 148 145 Z"
                    fill={selectedSolution.color}
                    opacity="0.75"
                    className="transition-colors duration-500"
                  />

                  {/* Graduations bécher */}
                  <line x1="53" y1="160" x2="63" y2="160" stroke="#64748B" strokeWidth="1.5" />
                  <text x="66" y="163" fill="#64748B" fontSize="6" fontWeight="bold">200 mL</text>
                  <line x1="53" y1="185" x2="61" y2="185" stroke="#64748B" strokeWidth="1" />
                  <line x1="53" y1="205" x2="63" y2="205" stroke="#64748B" strokeWidth="1.5" />
                  <text x="66" y="208" fill="#64748B" fontSize="6" fontWeight="bold">100 mL</text>

                  {/* Corps de l'électrode en verre combinée */}
                  <rect x="118" y="105" width="14" height="105" rx="3" fill="#E2E8F0" stroke="#475569" strokeWidth="1.5" />
                  <line x1="125" y1="105" x2="125" y2="205" stroke="#94A3B8" strokeWidth="1" />
                  {/* Bulbe en verre sensible (membrane) */}
                  <circle cx="125" cy="210" r="6" fill="#60A5FA" opacity="0.8" stroke="#1D4ED8" strokeWidth="1.5" />
                </svg>

                <span className="text-[11px] font-bold text-navy mt-1">
                  {customPh < 6.9 ? 'Milieu Acide' : customPh > 7.1 ? 'Milieu Basique' : 'Milieu Strictement Neutre'}
                </span>
              </div>

              {/* Métriques ioniques calculées */}
              <div className="sm:col-span-6 space-y-2">
                <div className="bg-white rounded-xl p-3 border border-navy/10">
                  <span className="text-[10px] text-text/50 uppercase font-semibold block">Concentration [H₃O⁺]</span>
                  <span className="text-base font-bold text-turquoise font-mono">
                    {h3oConc >= 0.001
                      ? `${h3oConc.toFixed(4)} mol/L`
                      : `${h3oConc.toExponential(2)} mol/L`}
                  </span>
                  <span className="text-[9px] text-text/40 block mt-0.5">Ions oxonium hydratés</span>
                </div>

                <div className="bg-white rounded-xl p-3 border border-navy/10">
                  <span className="text-[10px] text-text/50 uppercase font-semibold block">Concentration [OH⁻]</span>
                  <span className="text-base font-bold text-gold font-mono">
                    {ohConc >= 0.001
                      ? `${ohConc.toFixed(4)} mol/L`
                      : `${ohConc.toExponential(2)} mol/L`}
                  </span>
                  <span className="text-[9px] text-text/40 block mt-0.5">Ions hydroxyde</span>
                </div>

                <div className="bg-white rounded-xl p-3 border border-navy/10">
                  <span className="text-[10px] text-text/50 uppercase font-semibold block">Produit Ionique Ke (à 25 °C)</span>
                  <span className="text-sm font-bold text-emerald-600 font-mono">
                    1,0 × 10⁻¹⁴ (pKe = 14,0)
                  </span>
                  <span className="text-[9px] text-text/40 block mt-0.5">pH + pOH = 14,00</span>
                </div>
              </div>
            </div>

            {/* Échelle colorimétrique de pH */}
            <div className="bg-white rounded-2xl border border-navy/10 p-3 space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-navy px-1">
                <span>Échelle Universelle de pH (25 °C)</span>
                <span className="text-turquoise">pH = {customPh.toFixed(1)}</span>
              </div>
              <div className="h-4 rounded-xl w-full bg-gradient-to-r from-red-500 via-yellow-400 via-emerald-400 via-cyan-400 to-purple-600 relative overflow-hidden">
                <div
                  className="absolute top-0 bottom-0 w-1.5 bg-navy border-2 border-white shadow-md transition-all duration-300"
                  style={{ left: `${(customPh / 14) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-[9px] text-text/50 px-1 font-mono">
                <span>0 (Acide très fort)</span>
                <span>7 (Eau pure)</span>
                <span>14 (Base très forte)</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ATELIER 2 : EFFET DE LA TEMPÉRATURE SUR L'EAU PURE (LE PIÈGE D'OR DU BAC) */}
      {activeTab === 'temperature' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center bg-surface rounded-2xl p-5 border border-navy/10">
            {/* Thermostat & Bain-marie SVG */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <span className="text-xs font-bold text-navy mb-2">Bain Thermostaté Régulé (Eau Pure Distillée)</span>

              <svg viewBox="0 0 260 200" className="w-56 h-48 drop-shadow">
                {/* Cuve du bain-marie inox */}
                <rect x="20" y="30" width="220" height="150" rx="10" fill="#334155" stroke="#1E293B" strokeWidth="3" />
                <rect x="26" y="36" width="208" height="18" rx="4" fill="#64748B" />

                {/* Eau pure dans la cuve */}
                <rect x="30" y="65" width="200" height="105" rx="6" fill="#38BDF8" opacity="0.6" />

                {/* Serpentin chauffant rougeoyant en fond */}
                <path
                  d="M 40 160 Q 60 145 80 160 T 120 160 T 160 160 T 200 160"
                  fill="none"
                  stroke={tempCelsius > 40 ? '#EF4444' : '#F59E0B'}
                  strokeWidth="3.5"
                  className={tempCelsius > 40 ? 'animate-pulse' : ''}
                />

                {/* Afficheur digital de température */}
                <rect x="75" y="40" width="110" height="20" rx="4" fill="#0F172A" />
                <text x="130" y="54" textAnchor="middle" fill="#F87171" fontSize="12" fontFamily="monospace" fontWeight="bold">
                  {tempCelsius} °C
                </text>

                {/* Bulles de convection si T > 50°C */}
                {tempCelsius > 50 && (
                  <g>
                    <circle cx="70" cy="120" r="3" fill="#FFFFFF" opacity="0.7" className="animate-ping" />
                    <circle cx="130" cy="100" r="3.5" fill="#FFFFFF" opacity="0.6" className="animate-pulse" />
                    <circle cx="180" cy="115" r="2.5" fill="#FFFFFF" opacity="0.8" />
                  </g>
                )}

                {/* Thermomètre plongé */}
                <rect x="185" y="10" width="8" height="140" rx="4" fill="#E2E8F0" stroke="#475569" strokeWidth="1" />
                <line x1="189" y1="15" x2="189" y2="145" stroke="#EF4444" strokeWidth="3" />
                <circle cx="189" cy="145" r="7" fill="#EF4444" />
              </svg>

              {/* Slider de température */}
              <div className="w-full max-w-xs space-y-1 mt-3">
                <div className="flex justify-between text-xs font-semibold text-navy">
                  <span>Régler la Température :</span>
                  <span className="font-mono font-bold text-turquoise">{tempCelsius} °C</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={5}
                  value={tempCelsius}
                  onChange={(e) => setTempCelsius(Number(e.target.value))}
                  className="w-full accent-turquoise cursor-pointer"
                />
                <div className="flex justify-between text-[9px] text-text/50">
                  <span>0 °C (Glace)</span>
                  <span>25 °C (Standard)</span>
                  <span>60 °C (Bac S2)</span>
                  <span>100 °C (Ébullition)</span>
                </div>
              </div>
            </div>

            {/* Démonstration du Piège d'Or Bac S2 */}
            <div className="lg:col-span-6 space-y-3">
              <div className="bg-white rounded-2xl p-4 border border-navy/10 space-y-3">
                <div className="flex items-center justify-between border-b border-navy/10 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-turquoise">
                    Équilibre d&apos;Autoprotolyse de l&apos;Eau
                  </span>
                  <span className="text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                    ΔH &gt; 0 (Endothermique)
                  </span>
                </div>

                <div className="text-xs text-navy space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-surface rounded-xl p-2 border border-navy/10">
                      <span className="text-[9px] text-text/50 block font-semibold">Produit Ionique Ke</span>
                      <span className="text-sm font-bold font-mono text-navy">
                        {currentKe.toExponential(2)}
                      </span>
                    </div>
                    <div className="bg-surface rounded-xl p-2 border border-navy/10">
                      <span className="text-[9px] text-text/50 block font-semibold">Valeur de pKe</span>
                      <span className="text-sm font-bold font-mono text-turquoise">
                        {currentPKe.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="bg-emerald-50 rounded-xl p-3 border border-emerald-200 space-y-1">
                    <span className="text-xs font-bold text-emerald-900 block">
                      pH de neutralité à {tempCelsius} °C :
                    </span>
                    <p className="text-2xl font-black text-emerald-700 font-mono">
                      pH = ½ pKe = {neutralPh.toFixed(2)}
                    </p>
                    <p className="text-[11px] text-emerald-800 leading-tight">
                      [H₃O⁺] = [OH⁻] = {neutralH3O.toExponential(2)} mol/L
                    </p>
                  </div>
                </div>
              </div>

              {/* Boîte d'alerte Bac S2 */}
              <div className="bg-rose-50 rounded-2xl p-4 border border-rose-200 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  <span>Question Incontournable au Baccalauréat Sénégalais :</span>
                </div>
                <p className="text-xs text-rose-950 leading-relaxed">
                  « À 60 °C, l’eau pure possède un pH égal à <strong>6,50</strong>. Cette eau est-elle acide ? »
                </p>
                <div className="bg-white rounded-xl p-2.5 border border-rose-300 text-xs text-rose-900 font-semibold space-y-1">
                  <p>
                    ❌ <strong>Réponse de l&apos;élève non averti :</strong> « Oui car son pH est inférieur à 7. » (0 point !)
                  </p>
                  <p className="text-emerald-800">
                    ✅ <strong>Réponse officielle du correcteur :</strong> « NON, elle est strictement NEUTRE car elle ne contient que de l&apos;eau pure, et l&apos;on a toujours [H₃O⁺] = [OH⁻] = 10⁻⁶˒⁵ mol/L. Le seuil de neutralité dépend de la température ! »
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ATELIER 3 : INDICATEURS COLORÉS & ZONE DE VIRAGE */}
      {activeTab === 'indicateurs' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Colonne de gauche : Choix de l'indicateur & Tube à essai */}
          <div className="lg:col-span-5 space-y-4 bg-surface rounded-2xl p-4 border border-navy/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy">
              🎨 Choisir un Indicateur Coloré
            </h4>

            {/* Boutons des 3 indicateurs phares du Bac */}
            <div className="space-y-2">
              {INDICATORS.map((ind) => (
                <button
                  key={ind.id}
                  onClick={() => setSelectedIndicator(ind)}
                  className={`w-full p-3 rounded-xl border text-left transition-all ${
                    selectedIndicator.id === ind.id
                      ? 'border-turquoise bg-turquoise-light font-bold shadow-xs'
                      : 'border-navy/10 bg-white hover:border-turquoise/40 text-navy'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-navy">{ind.name}</span>
                    <span className="text-[10px] font-mono bg-navy/5 px-2 py-0.5 rounded text-navy/70">
                      pKi = {ind.pKi.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5 text-[10px]">
                    <span className="flex items-center gap-1 font-semibold" style={{ color: ind.acidColorHex }}>
                      ● {ind.acidColor}
                    </span>
                    <span className="text-text/40">⟶</span>
                    <span className="flex items-center gap-1 font-semibold" style={{ color: ind.baseColorHex }}>
                      ● {ind.baseColor}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Curseur de pH pour observer le virage */}
            <div className="space-y-1.5 pt-2 border-t border-navy/10">
              <div className="flex justify-between text-xs font-semibold text-navy">
                <span>Tester le pH de la solution :</span>
                <span className="font-mono text-turquoise font-bold text-sm">pH = {indicatorPh.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min={0}
                max={14}
                step={0.1}
                value={indicatorPh}
                onChange={(e) => setIndicatorPh(Number(e.target.value))}
                className="w-full accent-turquoise cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-text/50">
                <span>0 (Acide)</span>
                <span>Virage : {selectedIndicator.rangeMin} à {selectedIndicator.rangeMax}</span>
                <span>14 (Base)</span>
              </div>
            </div>
          </div>

          {/* Colonne de droite : Tube à essai SVG réaliste & Diagramme de prédominance */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-surface rounded-2xl p-4 border border-navy/10">
              {/* Tube à essai en verre réaliste */}
              <div className="sm:col-span-5 flex flex-col items-center">
                <span className="text-xs font-bold text-navy mb-1">Tube à Essai Pyrex</span>

                <svg viewBox="0 0 100 220" className="w-24 h-52 drop-shadow">
                  {/* Portoir à tube en bois */}
                  <rect x="10" y="195" width="80" height="15" rx="3" fill="#D97706" stroke="#B45309" strokeWidth="1.5" />

                  {/* Tube à essai en verre */}
                  <path
                    d="M 32 20 L 32 185 A 18 18 0 0 0 68 185 L 68 20 Z"
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="2.5"
                  />
                  {/* Col évasé du tube */}
                  <path d="M 28 20 L 72 20" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />

                  {/* Liquide coloré avec ménisque */}
                  <path
                    d="M 34 70 L 34 185 A 16 16 0 0 0 66 185 L 66 70 C 58 73, 42 73, 34 70 Z"
                    fill={getIndicatorColor(indicatorPh, selectedIndicator)}
                    className="transition-colors duration-300"
                  />

                  {/* Reflet de transparence en verre */}
                  <path d="M 37 40 L 37 175" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
                </svg>

                <div className="text-center mt-2">
                  <span className="text-xs font-bold text-navy block">
                    {getIndicatorStateName(indicatorPh, selectedIndicator)}
                  </span>
                </div>
              </div>

              {/* Diagramme de prédominance horizontal */}
              <div className="sm:col-span-7 space-y-3">
                <div className="bg-white rounded-xl p-3 border border-navy/10 space-y-2">
                  <span className="text-xs font-bold text-navy uppercase tracking-wider block">
                    Diagramme de Prédominance
                  </span>

                  {/* Barre visuelle du diagramme */}
                  <div className="relative h-8 rounded-xl bg-gray-100 border border-navy/10 overflow-hidden flex">
                    <div
                      className="h-full flex items-center justify-center text-[9px] font-bold text-white transition-all"
                      style={{
                        width: `${(selectedIndicator.rangeMin / 14) * 100}%`,
                        backgroundColor: selectedIndicator.acidColorHex,
                      }}
                    >
                      HIn
                    </div>
                    <div
                      className="h-full flex items-center justify-center text-[8px] font-bold text-navy/80 transition-all border-x border-white"
                      style={{
                        width: `${((selectedIndicator.rangeMax - selectedIndicator.rangeMin) / 14) * 100}%`,
                        backgroundColor: selectedIndicator.sensibleColorHex,
                      }}
                    >
                      Virage
                    </div>
                    <div
                      className="h-full flex-1 flex items-center justify-center text-[9px] font-bold text-white transition-all"
                      style={{
                        backgroundColor: selectedIndicator.baseColorHex,
                      }}
                    >
                      In⁻
                    </div>

                    {/* Curseur mobile de pH */}
                    <div
                      className="absolute top-0 bottom-0 w-1 bg-navy shadow-lg transition-all"
                      style={{ left: `${(indicatorPh / 14) * 100}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[10px] text-text/60 font-mono">
                    <span>pH &lt; {selectedIndicator.rangeMin}</span>
                    <span>Zone [{selectedIndicator.rangeMin} - {selectedIndicator.rangeMax}]</span>
                    <span>pH &gt; {selectedIndicator.rangeMax}</span>
                  </div>
                </div>

                <div className="bg-surface rounded-xl p-3 border border-navy/10 space-y-1 text-xs">
                  <span className="font-bold text-navy block">Règle de choix pour un titrage :</span>
                  <p className="text-text/70 text-[11px] leading-relaxed">
                    Un indicateur est adapté si sa <strong>zone de virage englobe le pH à l’équivalence pHE</strong>.
                    Par exemple, pour un titrage acide fort / base forte où pHE = 7,0, le <strong>BBT</strong> est l’indicateur idéal.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ATELIER 4 : SIMULATEUR DE DILUTION CONTINUE */}
      {activeTab === 'dilution' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 space-y-4 bg-surface rounded-2xl p-4 border border-navy/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy">
              💧 Dilution d’un Acide Fort (HCl)
            </h4>

            {/* Facteurs de dilution discrets */}
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-navy block">Facteur de Dilution :</span>
              <div className="grid grid-cols-5 gap-1.5">
                {[1, 10, 100, 1000, 1000000].map((fac) => (
                  <button
                    key={fac}
                    onClick={() => setDilutionFactor(fac)}
                    className={`py-2 px-1 rounded-xl text-center text-xs font-bold border transition-all ${
                      dilutionFactor === fac
                        ? 'bg-turquoise text-white border-turquoise shadow-xs'
                        : 'bg-white text-navy border-navy/10 hover:border-turquoise/40'
                    }`}
                  >
                    {fac === 1 ? 'Pur' : `×${fac >= 1000 ? fac / 1000 + 'k' : fac}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Fiole jaugée / Pipette visuelle */}
            <div className="bg-white rounded-xl p-3 border border-navy/10 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-text/60">Concentration initiale C₀ :</span>
                <span className="font-mono font-bold text-navy">1,0 × 10⁻² mol/L (pH = 2,00)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text/60">Concentration diluée C :</span>
                <span className="font-mono font-bold text-turquoise">
                  {cDilue.toExponential(2)} mol/L
                </span>
              </div>
              <div className="flex justify-between border-t border-navy/10 pt-1.5">
                <span className="font-bold text-navy">pH mesuré :</span>
                <span className="font-mono font-black text-emerald-600 text-base">{phDilue.toFixed(2)}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <span className="font-bold flex items-center gap-1">
                <Info className="w-4 h-4 text-amber-600 shrink-0" />
                Règle de dilution par 10 :
              </span>
              <p className="text-[11px] leading-relaxed">
                Tant que la solution reste modérément diluée, diluer 10 fois un acide fort augmente le pH exactement de <strong>+1 unité</strong>.
              </p>
            </div>
          </div>

          {/* Graphique d'asymptote pH vers 7 */}
          <div className="lg:col-span-7 bg-surface rounded-2xl p-4 border border-navy/10 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold px-1">
              <span className="text-navy">Courbe : pH en fonction de la Dilution</span>
              <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Asymptote pH = 7,00
              </span>
            </div>

            {/* Tracé SVG de l'asymptote */}
            <svg viewBox="0 0 340 180" className="w-full h-auto bg-white rounded-xl border border-navy/10">
              {/* Ligne asymptote pH = 7 */}
              <line x1="40" y1="50" x2="320" y2="50" stroke="#10B981" strokeDasharray="4 4" strokeWidth="1.5" />
              <text x="315" y="45" textAnchor="end" fill="#059669" fontSize="9" fontWeight="bold">
                Asymptote Neutralité (pH = 7,00)
              </text>

              {/* Axes */}
              <line x1="40" y1="150" x2="320" y2="150" stroke="#1E293B" strokeWidth="2" />
              <line x1="40" y1="20" x2="40" y2="150" stroke="#1E293B" strokeWidth="2" />

              {/* Graduations Oy (pH de 2 à 8) */}
              <text x="35" y="153" textAnchor="end" fill="#64748B" fontSize="8">pH 2</text>
              <text x="35" y="103" textAnchor="end" fill="#64748B" fontSize="8">pH 4</text>
              <text x="35" y="53" textAnchor="end" fill="#059669" fontSize="8" fontWeight="bold">pH 7</text>

              {/* Graduations Ox (Dilution) */}
              <text x="45" y="165" fill="#64748B" fontSize="8">Pur</text>
              <text x="110" y="165" fill="#64748B" fontSize="8">×10</text>
              <text x="180" y="165" fill="#64748B" fontSize="8">×100</text>
              <text x="250" y="165" fill="#64748B" fontSize="8">×1000</text>

              {/* Courbe asymptotique qui s'aplatit sous pH = 7 */}
              <path
                d="M 45 150 C 90 125, 150 70, 220 54 C 260 52, 290 51, 315 50.5"
                fill="none"
                stroke="#00B8A9"
                strokeWidth="3"
              />

              {/* Point courant de la dilution choisie */}
              <circle
                cx={
                  dilutionFactor === 1
                    ? 45
                    : dilutionFactor === 10
                    ? 110
                    : dilutionFactor === 100
                    ? 180
                    : dilutionFactor === 1000
                    ? 250
                    : 310
                }
                cy={150 - ((phDilue - 2) / 5) * 100}
                r="5"
                fill="#F6A000"
                stroke="#FFFFFF"
                strokeWidth="2"
              />
            </svg>

            <div className="bg-rose-50 rounded-xl p-3 border border-rose-200 text-xs text-rose-950 space-y-1">
              <span className="font-bold flex items-center gap-1 text-rose-800">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                Piège Mortel de l&apos;acide très dilué :
              </span>
              <p className="text-[11px] leading-relaxed">
                Si un énoncé propose un acide fort à C = 10⁻⁸ mol/L, la formule simplifiée donnerait pH = -log(10⁻⁸) = 8.
                <strong>C&apos;est rigoureusement impossible</strong> : un acide dilué ne devient jamais une base !
                À cette dilution, l’autoprotolyse de l’eau fournit 10⁻⁷ mol/L d’ions H₃O⁺ et le pH vaut <strong>6,98</strong> (asymptote à 7,00).
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
