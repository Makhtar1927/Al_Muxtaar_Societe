'use client';

import React, { useState } from 'react';
import MathRenderer from '@/components/course/math-renderer';
import {
  FlaskConical,
  Gauge,
  Play,
  RotateCcw,
  Sparkles,
  Layers,
  ChevronRight,
  Droplets,
  Scale,
} from 'lucide-react';

export default function AcideFortBaseForteInteractiveSimulator() {
  const [activeTab, setActiveTab] = useState<'titrage' | 'tangentes' | 'indicateurs' | 'diacide'>('titrage');

  // Paramètres du titrage
  // Dosage d'un acide fort (HCl) par une base forte (NaOH)
  const [ca, setCa] = useState<number>(0.10); // mol/L
  const [va, setVa] = useState<number>(20.0); // mL
  const [cb, setCb] = useState<number>(0.10); // mol/L
  const [vb, setVb] = useState<number>(0.0); // mL versé (0 à 40 mL)
  const [isDiacide, setIsDiacide] = useState<boolean>(false); // H2SO4 vs HCl
  const [selectedIndicator, setSelectedIndicator] = useState<'bbt' | 'bbp' | 'helianthine'>('bbt');
  const [showTangents, setShowTangents] = useState<boolean>(false);
  const [showDerivative, setShowDerivative] = useState<boolean>(false);

  // Volume équivalent VbE (en mL)
  // Pour monoacide : Ca * Va = Cb * VbE => VbE = (Ca * Va) / Cb
  // Pour diacide H2SO4 : 2 * Ca * Va = Cb * VbE => VbE = (2 * Ca * Va) / Cb
  const factor = isDiacide ? 2 : 1;
  const vbE = (factor * ca * va) / cb;

  // Calcul du pH théorique à 25°C pour un volume Vb
  const calculatePh = (volB: number): number => {
    const vTot = va + volB; // mL
    const nH3O_initial = factor * ca * (va / 1000); // mol
    const nOH_verse = cb * (volB / 1000); // mol

    if (Math.abs(volB - vbE) < 0.05) {
      return 7.0; // À l'équivalence stricte
    } else if (volB < vbE) {
      // Avant équivalence : acide en excès
      const nH3O_restant = nH3O_initial - nOH_verse;
      const concH3O = nH3O_restant / (vTot / 1000);
      if (concH3O <= 0) return 7.0;
      const ph = -Math.log10(concH3O);
      return Math.min(Math.max(ph, 0.5), 6.95);
    } else {
      // Après équivalence : base en excès
      const nOH_exces = nOH_verse - nH3O_initial;
      const concOH = nOH_exces / (vTot / 1000);
      if (concOH <= 0) return 7.0;
      const pOH = -Math.log10(concOH);
      const ph = 14.0 - pOH;
      return Math.min(Math.max(ph, 7.05), 13.5);
    }
  };

  const currentPh = calculatePh(vb);

  // Couleur de la solution dans le bécher selon l'indicateur sélectionné
  const getSolutionColor = (ph: number, indicator: 'bbt' | 'bbp' | 'helianthine'): string => {
    if (indicator === 'bbt') {
      // BBT : Jaune (< 6.0), Vert (6.0 - 7.6), Bleu (> 7.6)
      if (ph < 6.0) return 'rgba(234, 179, 8, 0.65)'; // Jaune
      if (ph <= 7.6) return 'rgba(34, 197, 94, 0.75)'; // Vert franc (teinte sensible)
      return 'rgba(59, 130, 246, 0.75)'; // Bleu franc
    } else if (indicator === 'bbp') {
      // Phénolphtaléine : Incolore (< 8.2), Rose pâle (8.2 - 10.0), Rose fuchsia (> 10.0)
      if (ph < 8.2) return 'rgba(241, 245, 249, 0.45)'; // Incolore
      if (ph <= 10.0) return 'rgba(244, 114, 182, 0.6)'; // Rose pâle
      return 'rgba(219, 39, 119, 0.85)'; // Rose fuchsia
    } else {
      // Hélianthine : Rouge (< 3.1), Orangé (3.1 - 4.4), Jaune (> 4.4)
      if (ph < 3.1) return 'rgba(239, 68, 68, 0.75)'; // Rouge
      if (ph <= 4.4) return 'rgba(249, 115, 22, 0.75)'; // Orangé (teinte sensible)
      return 'rgba(250, 204, 21, 0.75)'; // Jaune
    }
  };

  // Génération des points SVG de la courbe de titrage pH = f(Vb) de 0 à 40 mL
  const svgWidth = 440;
  const svgHeight = 240;
  const padLeft = 45;
  const padRight = 20;
  const padTop = 20;
  const padBottom = 35;
  const graphWidth = svgWidth - padLeft - padRight;
  const graphHeight = svgHeight - padTop - padBottom;

  const maxVb = 40.0;
  const maxPh = 14.0;

  const getSvgX = (vol: number) => padLeft + (vol / maxVb) * graphWidth;
  const getSvgY = (phVal: number) => padTop + graphHeight - (phVal / maxPh) * graphHeight;

  // Calcul du tracé de la courbe
  const curvePoints: string[] = [];
  const derivativePoints: string[] = [];
  const step = 0.5;

  for (let v = 0; v <= maxVb; v += step) {
    const phVal = calculatePh(v);
    const x = getSvgX(v);
    const y = getSvgY(phVal);
    curvePoints.push(`${x.toFixed(1)},${y.toFixed(1)}`);

    // Dérivée approximée dpH/dVb
    if (v > 0 && v < maxVb) {
      const phNext = calculatePh(v + 0.1);
      const phPrev = calculatePh(v - 0.1);
      const deriv = (phNext - phPrev) / 0.2;
      // Normaliser la dérivée pour l'affichage (max peak ~ 25)
      const derivY = padTop + graphHeight - Math.min(deriv / 20, 1.0) * graphHeight;
      derivativePoints.push(`${x.toFixed(1)},${derivY.toFixed(1)}`);
    }
  }

  const curvePath = `M ${curvePoints.join(' L ')}`;
  const derivativePath = `M ${derivativePoints.join(' L ')}`;

  // Coordonnées du point d'équivalence E
  const xE = getSvgX(vbE);
  const yE = getSvgY(7.0);

  // Position du point courant
  const currentX = getSvgX(vb);
  const currentY = getSvgY(currentPh);

  return (
    <div className="bg-white rounded-2xl border border-navy/10 p-4 sm:p-6 shadow-xs space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-turquoise/10 text-turquoise">
              <FlaskConical className="w-5 h-5" />
            </span>
            <h3 className="font-bold text-navy text-lg">Laboratoire Virtuel de Titrage Acido-Basique Fort-Fort</h3>
          </div>
          <p className="text-xs sm:text-sm text-text/70 mt-1">
            Banc de dosage pH-métrique haute fidélité, tracé dynamique, méthode des tangentes parallèles et nuancier d’indicateurs
          </p>
        </div>
        <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          Atelier Virtuel S2
        </span>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={() => setActiveTab('titrage')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'titrage'
              ? 'bg-turquoise text-white shadow-md'
              : 'bg-surface hover:bg-navy/5 text-navy border border-navy/10'
          }`}
        >
          <Gauge className="w-4 h-4" />
          <span>1. Banc de Dosage</span>
        </button>

        <button
          onClick={() => setActiveTab('tangentes')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'tangentes'
              ? 'bg-turquoise text-white shadow-md'
              : 'bg-surface hover:bg-navy/5 text-navy border border-navy/10'
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>2. Tangentes &amp; Saut</span>
        </button>

        <button
          onClick={() => setActiveTab('indicateurs')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'indicateurs'
              ? 'bg-turquoise text-white shadow-md'
              : 'bg-surface hover:bg-navy/5 text-navy border border-navy/10'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>3. Nuancier du BBT</span>
        </button>

        <button
          onClick={() => setActiveTab('diacide')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'diacide'
              ? 'bg-turquoise text-white shadow-md'
              : 'bg-surface hover:bg-navy/5 text-navy border border-navy/10'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>4. Piège Diacide (H₂SO₄)</span>
        </button>
      </div>

      {/* ATELIER 1 : BANC DE DOSAGE */}
      {activeTab === 'titrage' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Contrôles du dosage */}
          <div className="lg:col-span-5 space-y-4 bg-surface rounded-2xl p-4 border border-navy/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy flex items-center gap-1.5">
              <span>🎛️</span>
              <span>Paramètres du Banc de Titrage</span>
            </h4>

            {/* Slider Volume versé Vb */}
            <div className="space-y-1.5 bg-white p-3 rounded-xl border border-navy/10 shadow-xs">
              <div className="flex justify-between text-xs font-semibold text-navy">
                <span className="flex items-center gap-1">
                  <Droplets className="w-3.5 h-3.5 text-blue-500" /> Volume de Soude NaOH versé (Vb) :
                </span>
                <span className="font-mono text-turquoise font-bold text-sm">{vb.toFixed(1)} mL</span>
              </div>
              <input
                type="range"
                min={0}
                max={40}
                step={0.2}
                value={vb}
                onChange={(e) => setVb(Number(e.target.value))}
                className="w-full accent-turquoise cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-text/50 font-mono">
                <span>0.0 mL</span>
                <span className="font-bold text-emerald-600">VbE = {vbE.toFixed(1)} mL</span>
                <span>40.0 mL</span>
              </div>
            </div>

            {/* Boutons d'ajout rapide */}
            <div className="grid grid-cols-4 gap-1.5 text-xs">
              <button
                onClick={() => setVb((v) => Math.max(0, Number((v - 1.0).toFixed(1))))}
                className="py-1.5 px-2 rounded-lg bg-white border border-navy/15 text-navy font-semibold hover:bg-navy/5"
              >
                - 1 mL
              </button>
              <button
                onClick={() => setVb((v) => Math.min(40, Number((v + 0.2).toFixed(1))))}
                className="py-1.5 px-2 rounded-lg bg-white border border-navy/15 text-navy font-semibold hover:bg-navy/5"
              >
                + 1 goutte
              </button>
              <button
                onClick={() => setVb((v) => Math.min(40, Number((v + 1.0).toFixed(1))))}
                className="py-1.5 px-2 rounded-lg bg-white border border-navy/15 text-navy font-semibold hover:bg-navy/5"
              >
                + 1 mL
              </button>
              <button
                onClick={() => setVb(vbE)}
                className="py-1.5 px-2 rounded-lg bg-emerald-600 text-white font-bold hover:bg-emerald-700 shadow-xs"
              >
                À VbE
              </button>
            </div>

            {/* Réglage des concentrations */}
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-navy">Concentration Acide (Ca) :</span>
                <span className="font-mono font-bold text-turquoise">{ca.toFixed(2)} mol/L</span>
              </div>
              <input
                type="range"
                min={0.05}
                max={0.20}
                step={0.01}
                value={ca}
                onChange={(e) => setCa(Number(e.target.value))}
                className="w-full accent-turquoise cursor-pointer"
              />

              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-navy">Concentration Base (Cb) :</span>
                <span className="font-mono font-bold text-blue-600">{cb.toFixed(2)} mol/L</span>
              </div>
              <input
                type="range"
                min={0.05}
                max={0.20}
                step={0.01}
                value={cb}
                onChange={(e) => setCb(Number(e.target.value))}
                className="w-full accent-blue-600 cursor-pointer"
              />
            </div>

            {/* Choix de l'indicateur */}
            <div className="space-y-1.5 pt-2">
              <span className="text-xs font-semibold text-navy block">Indicateur coloré ajouté au bécher :</span>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                <button
                  onClick={() => setSelectedIndicator('bbt')}
                  className={`p-2 rounded-xl font-bold border transition-all ${
                    selectedIndicator === 'bbt'
                      ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs'
                      : 'bg-white text-navy border-navy/15 hover:bg-navy/5'
                  }`}
                >
                  BBT (Idéal)
                </button>
                <button
                  onClick={() => setSelectedIndicator('bbp')}
                  className={`p-2 rounded-xl font-bold border transition-all ${
                    selectedIndicator === 'bbp'
                      ? 'bg-pink-500 text-white border-pink-600 shadow-xs'
                      : 'bg-white text-navy border-navy/15 hover:bg-navy/5'
                  }`}
                >
                  Phénolpht.
                </button>
                <button
                  onClick={() => setSelectedIndicator('helianthine')}
                  className={`p-2 rounded-xl font-bold border transition-all ${
                    selectedIndicator === 'helianthine'
                      ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                      : 'bg-white text-navy border-navy/15 hover:bg-navy/5'
                  }`}
                >
                  Hélianthine
                </button>
              </div>
            </div>

            {/* Bouton reset */}
            <button
              onClick={() => setVb(0)}
              className="w-full py-2 rounded-xl border border-navy/20 text-navy font-semibold text-xs flex items-center justify-center gap-2 hover:bg-white"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Réinitialiser la burette (Vb = 0 mL)
            </button>
          </div>

          {/* Banc expérimental SVG + Données */}
          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-surface rounded-2xl p-4 border border-navy/10">
              {/* SVG de la burette et du bécher agité */}
              <div className="sm:col-span-6 flex flex-col items-center">
                <span className="text-xs font-bold text-navy mb-1">Montage de Titrage pH-métrique</span>

                <svg viewBox="0 0 170 270" className="w-44 h-64 drop-shadow">
                  {/* Potence métallique */}
                  <rect x="25" y="250" width="120" height="10" rx="2" fill="#334155" />
                  <rect x="35" y="15" width="8" height="240" fill="#64748B" />
                  {/* Pince burette */}
                  <rect x="35" y="60" width="35" height="6" fill="#475569" />
                  <circle cx="70" cy="63" r="5" fill="#334155" />

                  {/* Burette graduée (remplie de NaOH) */}
                  <rect x="66" y="20" width="8" height="110" fill="none" stroke="#94A3B8" strokeWidth="1.5" />
                  {/* Niveau de liquide dans la burette */}
                  <rect
                    x="67"
                    y={20 + (vb / 40) * 100}
                    width="6"
                    height={110 - (vb / 40) * 100}
                    fill="#38BDF8"
                    opacity="0.8"
                  />
                  {/* Graduations burette */}
                  {[30, 45, 60, 75, 90, 105, 120].map((yGrad, idx) => (
                    <line key={idx} x1="71" y1={yGrad} x2="74" y2={yGrad} stroke="#64748B" strokeWidth="0.8" />
                  ))}
                  {/* Robinet de la burette */}
                  <rect x="65" y="130" width="10" height="5" fill="#0F172A" />
                  <line x1="70" y1="135" x2="70" y2="148" stroke="#94A3B8" strokeWidth="2" />
                  {/* Goutte tombante */}
                  {vb > 0 && vb < 40 && (
                    <circle cx="70" cy="155" r="2.2" fill="#38BDF8" className="animate-bounce" />
                  )}

                  {/* Agitateur magnétique chauffant */}
                  <rect x="35" y="220" width="100" height="30" rx="5" fill="#1E293B" stroke="#0F172A" strokeWidth="1.5" />
                  {/* Affichage digital agitateur */}
                  <rect x="45" y="228" width="35" height="14" rx="2" fill="#020617" />
                  <text x="62" y="239" textAnchor="middle" fill="#10B981" fontSize="9" fontFamily="monospace" fontWeight="bold">
                    25°C
                  </text>
                  <circle cx="100" cy="235" r="5" fill="#475569" />
                  <circle cx="115" cy="235" r="5" fill="#475569" />

                  {/* Bécher Pyrex */}
                  <path
                    d="M 50 160 L 50 215 A 5 5 0 0 0 55 220 L 115 220 A 5 5 0 0 0 120 215 L 120 160"
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="2.5"
                  />
                  <path d="M 48 160 L 45 157 L 52 160" fill="none" stroke="#94A3B8" strokeWidth="2" />

                  {/* Liquide réactionnel dans le bécher avec couleur dynamique selon indicateur */}
                  <path
                    d="M 52 175 L 52 215 A 4 4 0 0 0 55 218 L 115 218 A 4 4 0 0 0 118 215 L 118 175 Z"
                    fill={getSolutionColor(currentPh, selectedIndicator)}
                    className="transition-colors duration-500"
                  />

                  {/* Barreau aimanté rotatif */}
                  <g transform="translate(85, 214)">
                    <rect
                      x="-10"
                      y="-3"
                      width="20"
                      height="6"
                      rx="3"
                      fill="#FFFFFF"
                      stroke="#94A3B8"
                      strokeWidth="1"
                      className="animate-spin origin-center"
                    />
                  </g>

                  {/* Électrode combinée de pH plongeant dans le bécher */}
                  <rect x="95" y="115" width="6" height="75" rx="3" fill="#E2E8F0" stroke="#475569" strokeWidth="1" />
                  <circle cx="98" cy="190" r="4" fill="#3B82F6" opacity="0.8" />
                  <path d="M 98 115 Q 120 90 135 110" fill="none" stroke="#1E293B" strokeWidth="1.5" />

                  {/* Boîtier pH-mètre digital */}
                  <g transform="translate(115, 105)">
                    <rect x="0" y="0" width="45" height="30" rx="4" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
                    <rect x="4" y="5" width="37" height="20" rx="2" fill="#020617" />
                    <text x="22" y="19" textAnchor="middle" fill="#38BDF8" fontSize="11" fontFamily="monospace" fontWeight="bold">
                      {currentPh.toFixed(2)}
                    </text>
                  </g>
                </svg>

                {/* État coloré */}
                <span className="text-[11px] font-semibold text-navy/70 mt-1">
                  Teinte :{' '}
                  <span className="font-bold text-navy">
                    {selectedIndicator === 'bbt'
                      ? currentPh < 6.0
                        ? 'Jaune (Acide fort dominant)'
                        : currentPh <= 7.6
                        ? 'Verte franc (Équivalence ! pH = 7)'
                        : 'Bleue (Base forte en excès)'
                      : selectedIndicator === 'bbp'
                      ? currentPh < 8.2
                        ? 'Incolore'
                        : currentPh <= 10.0
                        ? 'Rose pâle'
                        : 'Rose fuchsia vif'
                      : currentPh < 3.1
                      ? 'Rouge vif'
                      : currentPh <= 4.4
                      ? 'Orangé (Teinte sensible)'
                      : 'Jaune'}
                  </span>
                </span>
              </div>

              {/* Cartes métrologiques du titrage */}
              <div className="sm:col-span-6 grid grid-cols-2 gap-2 text-center">
                <div className="bg-white rounded-xl p-2.5 border border-navy/10 shadow-2xs">
                  <span className="text-[10px] text-text/50 uppercase block font-semibold">Volume versé Vb</span>
                  <span className="text-base font-bold text-navy">{vb.toFixed(1)} mL</span>
                  <span className="text-[9px] text-text/40 block">sur 40.0 mL</span>
                </div>

                <div className="bg-white rounded-xl p-2.5 border border-navy/10 shadow-2xs">
                  <span className="text-[10px] text-text/50 uppercase block font-semibold">pH Mesuré</span>
                  <span
                    className={`text-lg font-bold ${
                      Math.abs(currentPh - 7.0) < 0.2
                        ? 'text-emerald-600'
                        : currentPh < 7
                        ? 'text-amber-600'
                        : 'text-blue-600'
                    }`}
                  >
                    {currentPh.toFixed(2)}
                  </span>
                  <span className="text-[9px] text-text/40 block">
                    {currentPh < 6.9 ? 'Milieu Acide' : currentPh <= 7.1 ? 'Neutralité exacte' : 'Milieu Basique'}
                  </span>
                </div>

                <div className="bg-white rounded-xl p-2.5 border border-navy/10 shadow-2xs">
                  <span className="text-[10px] text-text/50 uppercase block font-semibold">Équivalence VbE</span>
                  <span className="text-base font-bold text-emerald-600">{vbE.toFixed(1)} mL</span>
                  <span className="text-[9px] text-text/40 block">pHE = 7.00</span>
                </div>

                <div className="bg-white rounded-xl p-2.5 border border-navy/10 shadow-2xs">
                  <span className="text-[10px] text-text/50 uppercase block font-semibold">État Titrage</span>
                  <span className="text-xs font-bold text-navy">
                    {vb < vbE - 0.2 ? 'Avant E' : Math.abs(vb - vbE) <= 0.2 ? '🎯 Équivalence' : 'Après E'}
                  </span>
                  <span className="text-[9px] text-text/40 block">
                    {vb < vbE ? 'H₃O⁺ en excès' : vb === vbE ? 'NaCl pur neutre' : 'OH⁻ en excès'}
                  </span>
                </div>
              </div>
            </div>

            {/* Aperçu courbe en direct */}
            <div className="bg-white rounded-2xl border border-navy/10 p-3 shadow-xs space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold px-1">
                <span className="text-navy flex items-center gap-1">
                  <span>📈</span> Courbe en temps réel : pH = f(Vb)
                </span>
                <span className="text-[11px] font-mono text-emerald-600 font-bold">
                  Point E ({vbE.toFixed(1)} mL ; 7.00)
                </span>
              </div>

              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto">
                {/* Lignes de grille */}
                {[0, 2, 4, 6, 7, 8, 10, 12, 14].map((phLvl) => (
                  <g key={phLvl}>
                    <line
                      x1={padLeft}
                      y1={getSvgY(phLvl)}
                      x2={svgWidth - padRight}
                      y2={getSvgY(phLvl)}
                      stroke={phLvl === 7 ? '#10B981' : '#F1F5F9'}
                      strokeWidth={phLvl === 7 ? 1.5 : 1}
                      strokeDasharray={phLvl === 7 ? '3 3' : undefined}
                    />
                    <text
                      x={padLeft - 6}
                      y={getSvgY(phLvl) + 3}
                      textAnchor="end"
                      fontSize="9"
                      fill={phLvl === 7 ? '#10B981' : '#94A3B8'}
                      fontWeight={phLvl === 7 ? 'bold' : 'normal'}
                    >
                      {phLvl}
                    </text>
                  </g>
                ))}

                {/* Axes */}
                <line
                  x1={padLeft}
                  y1={padTop + graphHeight}
                  x2={svgWidth - padRight}
                  y2={padTop + graphHeight}
                  stroke="#64748B"
                  strokeWidth="1.5"
                />
                <line
                  x1={padLeft}
                  y1={padTop}
                  x2={padLeft}
                  y2={padTop + graphHeight}
                  stroke="#64748B"
                  strokeWidth="1.5"
                />

                <text x={svgWidth - padRight} y={padTop + graphHeight + 18} textAnchor="end" fontSize="10" fill="#64748B">
                  Vb (mL)
                </text>
                <text x={padLeft - 20} y={padTop - 5} textAnchor="start" fontSize="10" fill="#64748B">
                  pH
                </text>

                {/* Courbe globale */}
                <path d={curvePath} fill="none" stroke="#0EA5E9" strokeWidth="2.5" />

                {/* Point d'équivalence E */}
                <line
                  x1={xE}
                  y1={getSvgY(0)}
                  x2={xE}
                  y2={yE}
                  stroke="#10B981"
                  strokeDasharray="4 4"
                  strokeWidth="1"
                />
                <circle cx={xE} cy={yE} r="4.5" fill="#10B981" />
                <text x={xE + 6} y={yE - 6} fill="#10B981" fontSize="10" fontWeight="bold">
                  E ({vbE.toFixed(1)} ; 7.0)
                </text>

                {/* Point de suivi actuel */}
                <circle cx={currentX} cy={currentY} r="6" fill="#F43F5E" className="animate-pulse" />
                <circle cx={currentX} cy={currentY} r="2.5" fill="#FFFFFF" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* ATELIER 2 : MÉTHODE DES TANGENTES PARALLÈLES */}
      {activeTab === 'tangentes' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-surface p-4 rounded-2xl border border-navy/10">
            <div>
              <h4 className="font-bold text-navy text-sm">Détermination Expérimentale du Point d’Équivalence</h4>
              <p className="text-xs text-text/70 mt-0.5">
                La méthode des tangentes parallèles permet de localiser avec une extrême rigueur le centre de symétrie du saut de pH.
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowTangents(!showTangents)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  showTangents ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white text-navy border border-navy/20'
                }`}
              >
                {showTangents ? '✓ Tangentes affichées' : 'Tracer les tangentes'}
              </button>
              <button
                onClick={() => setShowDerivative(!showDerivative)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  showDerivative ? 'bg-rose-600 text-white shadow-xs' : 'bg-white text-navy border border-navy/20'
                }`}
              >
                {showDerivative ? '✓ Dérivée dpH/dVb' : 'Tracer la dérivée'}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-navy/10 p-4 shadow-xs">
            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto">
              {/* Grille */}
              {[0, 2, 4, 6, 7, 8, 10, 12, 14].map((phLvl) => (
                <line
                  key={phLvl}
                  x1={padLeft}
                  y1={getSvgY(phLvl)}
                  x2={svgWidth - padRight}
                  y2={getSvgY(phLvl)}
                  stroke={phLvl === 7 ? '#10B981' : '#F1F5F9'}
                  strokeWidth={phLvl === 7 ? 1.5 : 1}
                  strokeDasharray={phLvl === 7 ? '3 3' : undefined}
                />
              ))}

              {/* Axes */}
              <line
                x1={padLeft}
                y1={padTop + graphHeight}
                x2={svgWidth - padRight}
                y2={padTop + graphHeight}
                stroke="#64748B"
                strokeWidth="1.5"
              />
              <line
                x1={padLeft}
                y1={padTop}
                x2={padLeft}
                y2={padTop + graphHeight}
                stroke="#64748B"
                strokeWidth="1.5"
              />

              {/* Courbe titrage */}
              <path d={curvePath} fill="none" stroke="#0284C7" strokeWidth="2.5" />

              {/* Courbe dérivée optionnelle */}
              {showDerivative && (
                <path d={derivativePath} fill="none" stroke="#E11D48" strokeWidth="2" strokeDasharray="2 2" />
              )}

              {/* Tangentes parallèles tracées */}
              {showTangents && (
                <g>
                  {/* Tangente 1 (avant virage, au niveau pH ~ 3.5) */}
                  <line
                    x1={getSvgX(vbE - 8)}
                    y1={getSvgY(3.0)}
                    x2={getSvgX(vbE - 1)}
                    y2={getSvgY(4.5)}
                    stroke="#4F46E5"
                    strokeWidth="1.5"
                  />
                  {/* Tangente 2 (après virage, parallèle au niveau pH ~ 10.5) */}
                  <line
                    x1={getSvgX(vbE + 1)}
                    y1={getSvgY(9.5)}
                    x2={getSvgX(vbE + 8)}
                    y2={getSvgY(11.0)}
                    stroke="#4F46E5"
                    strokeWidth="1.5"
                  />
                  {/* Droite médiane équidistante */}
                  <line
                    x1={getSvgX(vbE - 6)}
                    y1={getSvgY(6.25)}
                    x2={getSvgX(vbE + 6)}
                    y2={getSvgY(7.75)}
                    stroke="#10B981"
                    strokeWidth="2"
                  />
                  {/* Segment perpendiculaire */}
                  <line
                    x1={getSvgX(vbE - 2.5)}
                    y1={getSvgY(4.2)}
                    x2={getSvgX(vbE + 2.5)}
                    y2={getSvgY(9.8)}
                    stroke="#64748B"
                    strokeDasharray="2 2"
                    strokeWidth="1"
                  />
                </g>
              )}

              {/* Point E */}
              <circle cx={xE} cy={yE} r="5" fill="#10B981" />
              <text x={xE + 8} y={yE - 8} fill="#10B981" fontSize="11" fontWeight="bold">
                E ({vbE.toFixed(1)} mL ; 7.00)
              </text>
            </svg>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-surface border border-navy/10 space-y-1">
              <span className="font-bold text-navy block">Étape 1 : Tangentes</span>
              <p className="text-text/70">
                Tracer 2 tangentes à la courbe de part et d’autre du point d’inflexion, parfaitement parallèles entre elles.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-surface border border-navy/10 space-y-1">
              <span className="font-bold text-navy block">Étape 2 : Médiane</span>
              <p className="text-text/70">
                Tracer une perpendiculaire commune aux deux tangentes, repérer son milieu, puis tracer la droite médiane équidistante.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 space-y-1">
              <span className="font-bold text-emerald-900 block">Étape 3 : Point E</span>
              <p className="text-emerald-800">
                L’intersection de la droite médiane avec la courbe donne exactement le point d’équivalence E (VbE, pHE = 7.00).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ATELIER 3 : NUANCIER DES INDICATEURS */}
      {activeTab === 'indicateurs' && (
        <div className="space-y-4">
          <div className="bg-surface p-4 rounded-2xl border border-navy/10">
            <h4 className="font-bold text-navy text-sm">Comparatif des 3 Grands Indicateurs du Bac S2</h4>
            <p className="text-xs text-text/70 mt-1">
              Déplacez le curseur de volume pour observer simultanément la réponse visuelle des 3 indicateurs colorés.
            </p>
          </div>

          {/* Slider synchrone */}
          <div className="bg-white p-3 rounded-xl border border-navy/10 flex items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold text-navy">
              <span>Volume Vb :</span>
              <span className="font-mono text-turquoise text-sm">{vb.toFixed(1)} mL</span>
            </div>
            <input
              type="range"
              min={0}
              max={40}
              step={0.5}
              value={vb}
              onChange={(e) => setVb(Number(e.target.value))}
              className="flex-1 accent-turquoise cursor-pointer"
            />
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-surface text-navy">
              pH = {currentPh.toFixed(2)}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* 1. BBT */}
            <div className="p-4 rounded-2xl border-2 border-emerald-400 bg-emerald-50/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-900 text-sm">Bleu de bromothymol (BBT)</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-600 text-white">Idéal</span>
              </div>
              <p className="text-[11px] text-emerald-950">
                Zone de virage : <strong>6,0 – 7,6</strong> (Teinte sensible : verte à pH = 7,00)
              </p>

              {/* Bécher SVG BBT */}
              <div className="flex justify-center py-2">
                <div
                  className="w-20 h-28 rounded-b-2xl border-2 border-slate-400 transition-colors duration-300 flex items-center justify-center font-bold text-xs"
                  style={{ backgroundColor: getSolutionColor(currentPh, 'bbt') }}
                >
                  <span className="bg-white/80 px-2 py-0.5 rounded text-[10px] text-navy font-bold">
                    {currentPh < 6.0 ? 'Jaune' : currentPh <= 7.6 ? 'VERT (E)' : 'Bleu'}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-emerald-900 leading-tight">
                Le virage franc au vert s’observe exactement à l’équivalence stœchiométrique.
              </p>
            </div>

            {/* 2. Phénolphtaléine */}
            <div className="p-4 rounded-2xl border border-pink-200 bg-pink-50/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-pink-900 text-sm">Phénolphtaléine</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-600 text-white">Acceptable</span>
              </div>
              <p className="text-[11px] text-pink-950">
                Zone de virage : <strong>8,2 – 10,0</strong> (Incolore ⟶ Rose fuchsia)
              </p>

              <div className="flex justify-center py-2">
                <div
                  className="w-20 h-28 rounded-b-2xl border-2 border-slate-400 transition-colors duration-300 flex items-center justify-center font-bold text-xs"
                  style={{ backgroundColor: getSolutionColor(currentPh, 'bbp') }}
                >
                  <span className="bg-white/80 px-2 py-0.5 rounded text-[10px] text-navy font-bold">
                    {currentPh < 8.2 ? 'Incolore' : currentPh <= 10.0 ? 'Rose pâle' : 'Fuchsia'}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-pink-900 leading-tight">
                Vire légèrement après l’équivalence stœchiométrique, mais inclus dans le grand saut de pH.
              </p>
            </div>

            {/* 3. Hélianthine */}
            <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50/30 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-amber-900 text-sm">Hélianthine</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-600 text-white">Acceptable</span>
              </div>
              <p className="text-[11px] text-amber-950">
                Zone de virage : <strong>3,1 – 4,4</strong> (Rouge ⟶ Jaune orangé)
              </p>

              <div className="flex justify-center py-2">
                <div
                  className="w-20 h-28 rounded-b-2xl border-2 border-slate-400 transition-colors duration-300 flex items-center justify-center font-bold text-xs"
                  style={{ backgroundColor: getSolutionColor(currentPh, 'helianthine') }}
                >
                  <span className="bg-white/80 px-2 py-0.5 rounded text-[10px] text-navy font-bold">
                    {currentPh < 3.1 ? 'Rouge' : currentPh <= 4.4 ? 'Orangé' : 'Jaune'}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-amber-900 leading-tight">
                Vire au début du saut de pH, avant d’atteindre la neutralité parfaite.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ATELIER 4 : PIÈGE DU DIACIDE FORT H2SO4 */}
      {activeTab === 'diacide' && (
        <div className="space-y-4">
          <div className="bg-surface p-4 rounded-2xl border border-navy/10 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-navy text-sm">Monoacide (HCl) vs Diacide Fort (H₂SO₄)</h4>
              <button
                onClick={() => setIsDiacide(!isDiacide)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isDiacide ? 'bg-amber-600 text-white shadow-xs' : 'bg-turquoise text-white shadow-xs'
                }`}
              >
                {isDiacide ? 'Mode Diacide : H₂SO₄ actif' : 'Mode Monoacide : HCl actif'}
              </button>
            </div>
            <p className="text-xs text-text/70">
              L’acide sulfurique H₂SO₄ apporte <strong>2 moles d’ions H₃O⁺</strong> par mole d’acide dissoute.
              Le volume équivalent est donc exactement <strong>doublé</strong> !
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className={`p-4 rounded-2xl border transition-all ${
                !isDiacide ? 'border-turquoise bg-turquoise/5' : 'border-navy/10 bg-white opacity-60'
              }`}
            >
              <span className="font-bold text-navy text-sm block mb-1">Monoacide Fort : HCl</span>
              <p className="text-xs text-text/70 mb-2">
                HCl + H₂O ⟶ Cl⁻ + H₃O⁺
              </p>
              <div className="space-y-1 text-xs">
                <p>• [H₃O⁺] = Ca = {ca.toFixed(2)} mol/L</p>
                <p>• pH initial = -log(Ca) = {(-Math.log10(ca)).toFixed(2)}</p>
                <p className="font-bold text-turquoise">
                  • VbE = (Ca × Va) / Cb = {((ca * va) / cb).toFixed(1)} mL
                </p>
              </div>
            </div>

            <div
              className={`p-4 rounded-2xl border transition-all ${
                isDiacide ? 'border-amber-500 bg-amber-50/50' : 'border-navy/10 bg-white opacity-60'
              }`}
            >
              <span className="font-bold text-amber-900 text-sm block mb-1">⚠️ Diacide Fort : H₂SO₄</span>
              <p className="text-xs text-amber-800 mb-2">
                H₂SO₄ + 2 H₂O ⟶ SO₄²⁻ + 2 H₃O⁺
              </p>
              <div className="space-y-1 text-xs text-amber-950">
                <p>• [H₃O⁺] = 2 × Ca = {(2 * ca).toFixed(2)} mol/L</p>
                <p>• pH initial = -log(2 Ca) = {(-Math.log10(2 * ca)).toFixed(2)}</p>
                <p className="font-bold text-amber-700">
                  • VbE = (2 × Ca × Va) / Cb = {((2 * ca * va) / cb).toFixed(1)} mL (DOUBLÉ !)
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

