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
  Droplet,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

interface WeakAcid {
  id: string;
  name: string;
  formula: string;
  conjugateBase: string;
  pKa: number;
  description: string;
}

const ACIDES_FAIBLES: WeakAcid[] = [
  {
    id: 'ethanoique',
    name: 'Acide Éthanoïque (Vinaigre)',
    formula: 'CH₃COOH',
    conjugateBase: 'CH₃COO⁻',
    pKa: 4.8,
    description: 'Le cas d’école incontournable du Baccalauréat sénégalais.',
  },
  {
    id: 'methanoique',
    name: 'Acide Méthanoïque (Acide formique)',
    formula: 'HCOOH',
    conjugateBase: 'HCOO⁻',
    pKa: 3.8,
    description: 'Acide plus fort que l’acide éthanoïque, saut de pH plus ample.',
  },
  {
    id: 'benzoique',
    name: 'Acide Benzoïque',
    formula: 'C₆H₅COOH',
    conjugateBase: 'C₆H₅COO⁻',
    pKa: 4.2,
    description: 'Conservateur alimentaire classique dans les sujets de Bac.',
  },
  {
    id: 'lactique',
    name: 'Acide Lactique (Lait caillé / Yaourt)',
    formula: 'CH₃CH(OH)COOH',
    conjugateBase: 'CH₃CH(OH)COO⁻',
    pKa: 3.9,
    description: 'Contrôle qualité dans les industries laitières au Sénégal.',
  },
  {
    id: 'ammonium',
    name: 'Ion Ammonium',
    formula: 'NH₄⁺',
    conjugateBase: 'NH₃',
    pKa: 9.2,
    description: 'Acide cationique dosé par la soude pour régénérer l’ammoniac.',
  },
];

type IndicatorType = 'phenolphtaleine' | 'bbt' | 'helianthine';

export default function DosageAcideFaibleBaseForteInteractiveSimulator() {
  const [activeTab, setActiveTab] = useState<'banc_dosage' | 'tangentes_derivee' | 'crash_tampon'>('banc_dosage');

  // =========================================================================
  // ATELIER 1 & 2 : DOSAGE VIRTUEL
  // =========================================================================
  const [selectedAcidId, setSelectedAcidId] = useState<string>('ethanoique');
  const [va, setVa] = useState<number>(20); // mL
  const [ca, setCa] = useState<number>(0.1); // mol/L
  const [cb, setCb] = useState<number>(0.1); // mol/L
  const [vb, setVb] = useState<number>(10); // mL ajoutés
  const [showTangents, setShowTangents] = useState<boolean>(true);
  const [showDerivee, setShowDerivee] = useState<boolean>(false);
  const [selectedIndicator, setSelectedIndicator] = useState<IndicatorType>('phenolphtaleine');

  const acid = ACIDES_FAIBLES.find((a) => a.id === selectedAcidId) || ACIDES_FAIBLES[0];

  // Volume d'équivalence VbE = (Ca * Va) / Cb
  const vbE = (ca * va) / cb;
  const vbDemi = vbE / 2;

  // Calcul physique du pH en fonction de Vb
  const calculatePH = (volB: number): number => {
    if (volB <= 0) {
      // pH initial acide faible : pH0 ≈ 1/2(pKa - log Ca)
      const ph0 = 0.5 * (acid.pKa - Math.log10(ca));
      return Math.max(1, Math.min(6.5, ph0));
    }

    if (volB < vbE * 0.999) {
      // Zone tampon avant équivalence : pH = pKa + log([A-]/[AH]) = pKa + log(Vb / (VbE - Vb))
      const ratio = volB / (vbE - volB);
      if (ratio <= 0) return 1;
      const ph = acid.pKa + Math.log10(ratio);
      return Math.max(1, Math.min(13, ph));
    }

    if (Math.abs(volB - vbE) <= 0.05) {
      // À l'équivalence : solution de base faible de concentration C'b = (Ca * Va) / (Va + VbE)
      const cPrimeB = (ca * va) / (va + vbE);
      const phE = 7 + 0.5 * acid.pKa + 0.5 * Math.log10(cPrimeB);
      return Math.min(13, Math.max(7.1, phE));
    }

    // Après équivalence : excès de base forte (OH-)
    const vTot = va + volB;
    const nOH = cb * (volB - vbE); // mmol
    const concOH = nOH / vTot; // mol/L
    if (concOH <= 0) return 7;
    const pOH = -Math.log10(concOH);
    const ph = 14 - pOH;
    return Math.min(13.8, Math.max(7.5, ph));
  };

  const currentPH = calculatePH(vb);
  const phE = calculatePH(vbE);
  const phDemi = acid.pKa;

  // Couleur de la fiole selon l'indicateur
  const getSolutionColor = (currentVal: number, ind: IndicatorType) => {
    if (ind === 'phenolphtaleine') {
      // 8.2 - 10.0 : Incolore à Rose/Fuchsia
      if (currentVal < 8.2) return { bg: 'rgba(255, 255, 255, 0.4)', text: 'Incolore', border: '#CBD5E1' };
      if (currentVal >= 10.0) return { bg: 'rgba(236, 72, 153, 0.85)', text: 'Rose Fuchsia Foncé', border: '#DB2777' };
      const opacity = 0.2 + 0.65 * ((currentVal - 8.2) / 1.8);
      return { bg: `rgba(236, 72, 153, ${opacity})`, text: 'Rose Pâle (Virage)', border: '#F472B6' };
    }
    if (ind === 'bbt') {
      // 6.0 - 7.6 : Jaune à Bleu (Vert au virage)
      if (currentVal < 6.0) return { bg: 'rgba(251, 191, 36, 0.85)', text: 'Jaune (Acide)', border: '#F59E0B' };
      if (currentVal >= 7.6) return { bg: 'rgba(59, 130, 246, 0.85)', text: 'Bleu (Basique)', border: '#2563EB' };
      return { bg: 'rgba(16, 185, 129, 0.85)', text: 'Vert (Virage)', border: '#059669' };
    }
    // Hélianthine : 3.1 - 4.4 : Rouge à Jaune
    if (currentVal < 3.1) return { bg: 'rgba(239, 68, 68, 0.85)', text: 'Rouge', border: '#DC2626' };
    if (currentVal >= 4.4) return { bg: 'rgba(250, 204, 21, 0.85)', text: 'Jaune', border: '#EAB308' };
    return { bg: 'rgba(249, 115, 22, 0.85)', text: 'Orange (Virage)', border: '#EA580C' };
  };

  const solColor = getSolutionColor(currentPH, selectedIndicator);

  // SVG Curve points
  const svgWidth = 600;
  const svgHeight = 320;
  const maxVb = vbE * 2;
  const toSvgX = (v: number) => 50 + (v / maxVb) * (svgWidth - 90);
  const toSvgY = (p: number) => svgHeight - 40 - (p / 14) * (svgHeight - 70);

  const curvePoints: string[] = [];
  const deriveePoints: string[] = [];
  const steps = 100;
  let prevPH = calculatePH(0);

  for (let i = 0; i <= steps; i++) {
    const v = (i / steps) * maxVb;
    const p = calculatePH(v);
    curvePoints.push(`${toSvgX(v)},${toSvgY(p)}`);

    if (i > 0) {
      const dp = Math.abs(p - prevPH) / (maxVb / steps);
      // Échelle pour la dérivée
      const scaledDeriv = Math.min(14, dp * 3.5);
      deriveePoints.push(`${toSvgX(v)},${toSvgY(scaledDeriv)}`);
    }
    prevPH = p;
  }

  // =========================================================================
  // ATELIER 3 : CRASH-TEST SOLUTION TAMPON
  // =========================================================================
  const [waterPH, setWaterPH] = useState<number>(7.0);
  const [tamponPH, setTamponPH] = useState<number>(4.8);
  const [crashHistory, setCrashHistory] = useState<string[]>([
    'État initial : Eau pure à pH 7,00 vs Solution tampon CH₃COOH/CH₃COO⁻ à pH 4,80.',
  ]);

  const applyCrashTest = (action: 'add_hcl' | 'add_naoh' | 'dilution') => {
    if (action === 'add_hcl') {
      setWaterPH(2.0); // Chute brutale de 7 à 2
      setTamponPH(4.72); // Variation infime de 0,08 unité !
      setCrashHistory((prev) => [
        'Ajout de 1 mL de HCl (1M) : Le pH de l’eau s’effondre de 7,00 à 2,00 (chute de 5 unités !) tandis que le tampon résiste avec brio (pH passe de 4,80 à 4,72, ΔpH = -0,08).',
        ...prev,
      ]);
    } else if (action === 'add_naoh') {
      setWaterPH(12.0); // Explosion brutale de 7 à 12
      setTamponPH(4.88); // Variation infime de 0,08 unité !
      setCrashHistory((prev) => [
        'Ajout de 1 mL de NaOH (1M) : Le pH de l’eau explose de 7,00 à 12,00 (hausse de 5 unités !) alors que le tampon reste quasi-parfait (pH passe de 4,80 à 4,88, ΔpH = +0,08).',
        ...prev,
      ]);
    } else if (action === 'dilution') {
      setWaterPH(7.0);
      setTamponPH(4.8); // Dilution modérée ne change rien au rapport [Base]/[Acide]
      setCrashHistory((prev) => [
        'Dilution par 10 (Ajout de 90 mL d’eau) : Le rapport n(CH₃COO⁻)/n(CH₃COOH) reste rigoureusement constant, le pH du tampon demeure fixé à 4,80 !',
        ...prev,
      ]);
    }
  };

  const resetCrash = () => {
    setWaterPH(7.0);
    setTamponPH(4.8);
    setCrashHistory(['Réinitialisation effectuée. Eau à pH 7,00 et Tampon à pH 4,80.']);
  };

  return (
    <div className="bg-white rounded-3xl border border-navy/15 p-4 sm:p-7 shadow-md space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-navy/10 pb-5">
        <div className="flex items-start sm:items-center gap-3.5 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-white shadow-sm shrink-0 p-2">
            <FlaskConical className="w-7 h-7" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                Laboratoire Virtuel de Chimie
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                Terminale S2
              </span>
            </div>
            <h3 className="font-extrabold text-navy text-lg sm:text-2xl leading-tight mt-1">
              Simulateur de Dosage Acide Faible / Base Forte &amp; Effet Tampon
            </h3>
            <p className="text-xs sm:text-sm text-text/70 mt-1">
              Courbe $pH = f(V_b)$, point de demi-équivalence ($pH = pKa$), équivalence basique ($pH_E &gt; 7$) et crash-test des solutions tampons.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-1.5 bg-surface/70 rounded-2xl border border-navy/10">
        <button
          type="button"
          onClick={() => setActiveTab('banc_dosage')}
          className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'banc_dosage'
              ? 'bg-navy text-white shadow-sm'
              : 'text-text/70 hover:text-navy hover:bg-white/60'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>Banc de Dosage &amp; Burette</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('tangentes_derivee')}
          className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'tangentes_derivee'
              ? 'bg-navy text-white shadow-sm'
              : 'text-text/70 hover:text-navy hover:bg-white/60'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Tangentes Parallèles &amp; Dérivée</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('crash_tampon')}
          className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
            activeTab === 'crash_tampon'
              ? 'bg-navy text-white shadow-sm'
              : 'text-text/70 hover:text-navy hover:bg-white/60'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Crash-Test Pouvoir Tampon</span>
        </button>
      </div>

      {/* =================================================================== */}
      {/* ATELIER 1 & 2 : DOSAGE EN DIRECT ET TANGENTES                       */}
      {/* =================================================================== */}
      {(activeTab === 'banc_dosage' || activeTab === 'tangentes_derivee') && (
        <div className="space-y-5 animate-in fade-in duration-200">
          {/* Sélection de l'acide faible */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-navy uppercase tracking-wider block">
              1. Choisir l&apos;acide faible à doser :
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {ACIDES_FAIBLES.map((ac) => (
                <button
                  key={ac.id}
                  type="button"
                  onClick={() => setSelectedAcidId(ac.id)}
                  className={`p-2.5 rounded-2xl border text-left transition-all ${
                    selectedAcidId === ac.id
                      ? 'bg-amber-500/15 border-amber-500 text-navy shadow-xs font-bold'
                      : 'bg-surface border-navy/10 text-text/70 hover:bg-surface-muted'
                  }`}
                >
                  <span className="text-xs block font-mono">{ac.formula}</span>
                  <span className="text-[10px] text-amber-700 block font-semibold mt-0.5">pKa = {ac.pKa}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Sliders de concentration et volume */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 bg-surface/60 rounded-2xl p-4 border border-navy/10">
            <div>
              <div className="flex justify-between text-xs font-bold text-navy mb-1.5">
                <span>Volume initial Va</span>
                <span className="text-amber-600 font-mono font-black">{va} mL</span>
              </div>
              <input
                type="range"
                min="10"
                max="30"
                step="5"
                value={va}
                onChange={(e) => setVa(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-navy mb-1.5">
                <span>Concentration Ca</span>
                <span className="text-amber-600 font-mono font-black">{ca} mol/L</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.2"
                step="0.01"
                value={ca}
                onChange={(e) => setCa(parseFloat(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-navy mb-1.5">
                <span>Concentration Cb (NaOH)</span>
                <span className="text-blue-600 font-mono font-black">{cb} mol/L</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.2"
                step="0.01"
                value={cb}
                onChange={(e) => setCb(parseFloat(e.target.value))}
                className="w-full accent-blue-500 cursor-pointer"
              />
            </div>

            <div className="bg-white rounded-xl p-3 border border-navy/10 flex flex-col justify-center">
              <span className="text-[10px] font-bold uppercase text-navy/50">Équivalence Théorique :</span>
              <p className="text-sm font-black text-navy mt-0.5 font-mono">
                VbE = {vbE.toFixed(1)} mL
              </p>
              <span className="text-[10px] text-text/60">Demi-éq : {(vbE / 2).toFixed(1)} mL</span>
            </div>
          </div>

          {/* Curseur de versement Burette Vb */}
          <div className="bg-amber-50/70 rounded-2xl p-4 border border-amber-200 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Droplet className="w-5 h-5 text-amber-600 animate-bounce" />
                <span className="text-xs font-bold text-navy uppercase tracking-wider">
                  Volume de Soude Versé depuis la Burette (Vb) :
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-base font-black text-amber-700 font-mono">{vb.toFixed(1)} mL</span>
                <span className="text-xs text-text/60">
                  ({((vb / vbE) * 100).toFixed(0)}% de l&apos;équivalence)
                </span>
              </div>
            </div>

            <input
              type="range"
              min="0"
              max={maxVb}
              step="0.2"
              value={vb}
              onChange={(e) => setVb(parseFloat(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer h-2"
            />

            <div className="flex justify-between text-[11px] font-mono text-text/60">
              <button
                type="button"
                onClick={() => setVb(0)}
                className="hover:text-navy underline cursor-pointer"
              >
                Vb = 0 (Initial)
              </button>
              <button
                type="button"
                onClick={() => setVb(vbDemi)}
                className="hover:text-amber-700 font-bold underline cursor-pointer text-amber-600"
              >
                Vb = {vbDemi.toFixed(1)} mL (Demi-éq : pH = pKa)
              </button>
              <button
                type="button"
                onClick={() => setVb(vbE)}
                className="hover:text-emerald-700 font-bold underline cursor-pointer text-emerald-600"
              >
                Vb = {vbE.toFixed(1)} mL (Équivalence E)
              </button>
              <button
                type="button"
                onClick={() => setVb(maxVb)}
                className="hover:text-navy underline cursor-pointer"
              >
                Vb = {maxVb.toFixed(1)} mL (Excès)
              </button>
            </div>
          </div>

          {/* Cartes d'État en direct : pH, Erlenmeyer et Indicateur */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-surface rounded-2xl p-4 border border-navy/10 space-y-1">
              <span className="text-[11px] uppercase font-bold text-navy/50 tracking-wider block">
                pH Actuel Mesuré
              </span>
              <div className="text-2xl font-black text-navy font-mono">
                pH = {currentPH.toFixed(2)}
              </div>
              <p className="text-[11px] text-text/60">
                {vb < vbDemi && 'Zone initiale acide'}
                {Math.abs(vb - vbDemi) < 0.2 && '★ POINT DE DEMI-ÉQUIVALENCE (pH = pKa)'}
                {vb > vbDemi && vb < vbE && 'Zone tampon à pouvoir protecteur maximal'}
                {Math.abs(vb - vbE) < 0.2 && '⚡ ÉQUIVALENCE ATTEINTE (pH_E > 7)'}
                {vb > vbE && 'Excès d’ions OH⁻ (milieu fortement basique)'}
              </p>
            </div>

            <div className="bg-surface rounded-2xl p-4 border border-navy/10 space-y-1">
              <span className="text-[11px] uppercase font-bold text-navy/50 tracking-wider block">
                Couleur de la Solution dans l&apos;Erlenmeyer
              </span>
              <div className="flex items-center gap-3 pt-1">
                <div
                  className="w-8 h-8 rounded-full border-2 transition-colors duration-300 shadow-sm"
                  style={{ backgroundColor: solColor.bg, borderColor: solColor.border }}
                />
                <div>
                  <span className="text-xs font-bold text-navy block">{solColor.text}</span>
                  <span className="text-[10px] text-text/50">Indicateur : {selectedIndicator}</span>
                </div>
              </div>
            </div>

            <div className="bg-surface rounded-2xl p-4 border border-navy/10 space-y-1">
              <span className="text-[11px] uppercase font-bold text-navy/50 tracking-wider block">
                Indicateur Coloré Virtuel
              </span>
              <div className="flex flex-wrap gap-1 pt-1">
                <button
                  type="button"
                  onClick={() => setSelectedIndicator('phenolphtaleine')}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                    selectedIndicator === 'phenolphtaleine'
                      ? 'bg-rose-500 text-white border-rose-600'
                      : 'bg-white text-navy border-navy/10 hover:bg-surface'
                  }`}
                >
                  Phénolphtaléine (Idéal)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedIndicator('bbt')}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                    selectedIndicator === 'bbt'
                      ? 'bg-blue-600 text-white border-blue-700'
                      : 'bg-white text-navy border-navy/10 hover:bg-surface'
                  }`}
                >
                  BBT (Imprécis)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedIndicator('helianthine')}
                  className={`px-2 py-1 rounded-lg text-[10px] font-bold border transition-colors ${
                    selectedIndicator === 'helianthine'
                      ? 'bg-amber-500 text-white border-amber-600'
                      : 'bg-white text-navy border-navy/10 hover:bg-surface'
                  }`}
                >
                  Hélianthine (Inadapté)
                </button>
              </div>
            </div>
          </div>

          {/* Options graphiques (Tangentes & Dérivée) */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="font-semibold text-text/70">Outils du laboratoire :</span>
            <label className="inline-flex items-center gap-1.5 cursor-pointer bg-surface px-3 py-1 rounded-lg border border-navy/10 hover:bg-surface-muted transition-colors">
              <input
                type="checkbox"
                checked={showTangents}
                onChange={(e) => setShowTangents(e.target.checked)}
                className="accent-amber-500 rounded"
              />
              <span className="font-medium text-navy">Tracer la Méthode des Tangentes Parallèles</span>
            </label>
            <label className="inline-flex items-center gap-1.5 cursor-pointer bg-surface px-3 py-1 rounded-lg border border-navy/10 hover:bg-surface-muted transition-colors">
              <input
                type="checkbox"
                checked={showDerivee}
                onChange={(e) => setShowDerivee(e.target.checked)}
                className="accent-amber-500 rounded"
              />
              <span className="font-medium text-navy">Afficher la Courbe Dérivée dpH/dVb</span>
            </label>
          </div>

          {/* SVG Canvas de la Courbe de Dosage */}
          <div className="bg-[#0A1628] rounded-3xl p-4 border border-amber-500/20 shadow-xl flex flex-col items-center overflow-hidden relative">
            <div className="absolute top-3 left-4 text-[11px] font-mono text-white/50">
              Courbe de Titrage pH-métrique : pH = f(Vb) · Acide Faible ({acid.formula}) par Soude (NaOH)
            </div>

            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full max-w-2xl h-auto select-none">
              {/* Ligne de neutralité pH = 7 */}
              <line
                x1={toSvgX(0)}
                y1={toSvgY(7)}
                x2={toSvgX(maxVb)}
                y2={toSvgY(7)}
                stroke="#64748B"
                strokeWidth="1"
                strokeDasharray="4,4"
              />
              <text x={toSvgX(0) + 5} y={toSvgY(7) - 4} fill="#64748B" fontSize="10">
                pH = 7 (Neutralité)
              </text>

              {/* Axes orthogonaux */}
              <line x1={toSvgX(0)} y1={toSvgY(0)} x2={toSvgX(maxVb) + 15} y2={toSvgY(0)} stroke="#94A3B8" strokeWidth="2" />
              <text x={toSvgX(maxVb) + 20} y={toSvgY(0) + 4} fill="#94A3B8" fontSize="11" fontWeight="bold">
                Vb (mL)
              </text>

              <line x1={toSvgX(0)} y1={toSvgY(0)} x2={toSvgX(0)} y2={toSvgY(14) - 15} stroke="#94A3B8" strokeWidth="2" />
              <text x={toSvgX(0) - 10} y={toSvgY(14) - 20} fill="#94A3B8" fontSize="11" fontWeight="bold">
                pH
              </text>

              {/* Graduations pH */}
              {[2, 4, 6, 8, 10, 12, 14].map((p) => (
                <g key={`grad-p-${p}`}>
                  <line x1={toSvgX(0) - 4} y1={toSvgY(p)} x2={toSvgX(0)} y2={toSvgY(p)} stroke="#94A3B8" strokeWidth="1.5" />
                  <text x={toSvgX(0) - 18} y={toSvgY(p) + 4} fill="#94A3B8" fontSize="10">
                    {p}
                  </text>
                </g>
              ))}

              {/* Courbe de dosage pH = f(Vb) */}
              <polyline
                points={curvePoints.join(' ')}
                fill="none"
                stroke="#F59E0B"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Courbe Dérivée dpH/dVb */}
              {showDerivee && (
                <polyline
                  points={deriveePoints.join(' ')}
                  fill="none"
                  stroke="#38BDF8"
                  strokeWidth="2"
                  strokeDasharray="3,3"
                  opacity="0.85"
                />
              )}

              {/* Point de Demi-Équivalence E_1/2 */}
              <line
                x1={toSvgX(vbDemi)}
                y1={toSvgY(0)}
                x2={toSvgX(vbDemi)}
                y2={toSvgY(phDemi)}
                stroke="#FBBF24"
                strokeWidth="1.5"
                strokeDasharray="3,3"
              />
              <line
                x1={toSvgX(0)}
                y1={toSvgY(phDemi)}
                x2={toSvgX(vbDemi)}
                y2={toSvgY(phDemi)}
                stroke="#FBBF24"
                strokeWidth="1.5"
                strokeDasharray="3,3"
              />
              <circle cx={toSvgX(vbDemi)} cy={toSvgY(phDemi)} r="5" fill="#F59E0B" stroke="#ffffff" strokeWidth="1.5" />
              <text x={toSvgX(vbDemi) + 8} y={toSvgY(phDemi) - 6} fill="#FDE047" fontSize="11" fontWeight="bold">
                E₁/₂ (pH = pKa = {acid.pKa})
              </text>

              {/* Point d'Équivalence E */}
              <line
                x1={toSvgX(vbE)}
                y1={toSvgY(0)}
                x2={toSvgX(vbE)}
                y2={toSvgY(phE)}
                stroke="#10B981"
                strokeWidth="1.5"
                strokeDasharray="3,3"
              />
              <line
                x1={toSvgX(0)}
                y1={toSvgY(phE)}
                x2={toSvgX(vbE)}
                y2={toSvgY(phE)}
                stroke="#10B981"
                strokeWidth="1.5"
                strokeDasharray="3,3"
              />
              <circle cx={toSvgX(vbE)} cy={toSvgY(phE)} r="6" fill="#10B981" stroke="#ffffff" strokeWidth="2" />
              <text x={toSvgX(vbE) + 10} y={toSvgY(phE) - 8} fill="#34D399" fontSize="12" fontWeight="bold">
                E ({vbE.toFixed(1)} mL ; pH_E = {phE.toFixed(1)})
              </text>

              {/* Méthode des Tangentes Parallèles */}
              {showTangents && (
                <g opacity="0.6">
                  {/* Tangente 1 inférieure */}
                  <line
                    x1={toSvgX(vbE - 4)}
                    y1={toSvgY(phE - 2.8)}
                    x2={toSvgX(vbE + 1.5)}
                    y2={toSvgY(phE - 1.2)}
                    stroke="#E2E8F0"
                    strokeWidth="1.5"
                  />
                  {/* Tangente 2 supérieure */}
                  <line
                    x1={toSvgX(vbE - 1.5)}
                    y1={toSvgY(phE + 1.2)}
                    x2={toSvgX(vbE + 4)}
                    y2={toSvgY(phE + 2.8)}
                    stroke="#E2E8F0"
                    strokeWidth="1.5"
                  />
                  {/* Droite médiane */}
                  <line
                    x1={toSvgX(vbE - 3)}
                    y1={toSvgY(phE - 0.8)}
                    x2={toSvgX(vbE + 3)}
                    y2={toSvgY(phE + 0.8)}
                    stroke="#34D399"
                    strokeWidth="1.5"
                    strokeDasharray="2,2"
                  />
                </g>
              )}

              {/* Curseur de Versement Actuel M(Vb, pH) */}
              <circle
                cx={toSvgX(vb)}
                cy={toSvgY(currentPH)}
                r="7"
                fill="#EF4444"
                stroke="#ffffff"
                strokeWidth="2"
                className="animate-pulse"
              />
              <text
                x={toSvgX(vb) + 10}
                y={toSvgY(currentPH) + 14}
                fill="#F87171"
                fontSize="11"
                fontWeight="bold"
              >
                M ({vb.toFixed(1)} mL ; {currentPH.toFixed(2)})
              </text>
            </svg>
          </div>
        </div>
      )}

      {/* =================================================================== */}
      {/* ATELIER 3 : CRASH-TEST SOLUTION TAMPON                              */}
      {/* =================================================================== */}
      {activeTab === 'crash_tampon' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl space-y-1 text-xs">
            <span className="font-bold text-amber-800 uppercase tracking-wider block">
              Protocole du Crash-Test :
            </span>
            <p className="text-navy leading-relaxed">
              Testez la résistance spectaculaire d&apos;une solution tampon en lui injectant des acides ou des bases concentrées. Observez la jauge de pH de l&apos;eau pure s&apos;effondrer ou exploser, tandis que la solution tampon demeure remarquablement stable !
            </p>
          </div>

          {/* Deux bechers côte à côte */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Becher A : Eau Pure */}
            <div className="bg-white rounded-2xl border-2 border-rose-200 p-5 shadow-xs space-y-3 text-center">
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider block">
                Témoin : Eau Pure (Non Tamponnée)
              </span>
              <div className="w-24 h-32 mx-auto rounded-b-3xl border-4 border-slate-300 bg-blue-50/50 flex flex-col justify-end p-2 relative overflow-hidden">
                <div
                  className="w-full rounded-b-2xl transition-all duration-500"
                  style={{
                    height: '65%',
                    backgroundColor:
                      waterPH < 5
                        ? 'rgba(239, 68, 68, 0.4)'
                        : waterPH > 9
                        ? 'rgba(59, 130, 246, 0.4)'
                        : 'rgba(56, 189, 248, 0.3)',
                  }}
                />
              </div>
              <div className="text-2xl font-black text-rose-600 font-mono">
                pH = {waterPH.toFixed(2)}
              </div>
              <span className="text-[11px] text-text/60 block">
                {waterPH < 5 && '⚠️ Acidification extrême !'}
                {waterPH > 9 && '⚠️ Alcalinisation violente !'}
                {waterPH === 7.0 && 'pH neutre fragile'}
              </span>
            </div>

            {/* Becher B : Solution Tampon */}
            <div className="bg-white rounded-2xl border-2 border-emerald-300 p-5 shadow-xs space-y-3 text-center">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                Solution Tampon : CH₃COOH / CH₃COO⁻
              </span>
              <div className="w-24 h-32 mx-auto rounded-b-3xl border-4 border-emerald-500 bg-emerald-50/50 flex flex-col justify-end p-2 relative overflow-hidden">
                <div
                  className="w-full rounded-b-2xl bg-emerald-400/40 transition-all duration-500"
                  style={{ height: '65%' }}
                />
              </div>
              <div className="text-2xl font-black text-emerald-700 font-mono">
                pH = {tamponPH.toFixed(2)}
              </div>
              <span className="text-[11px] text-emerald-800 font-semibold block">
                🛡️ Pouvoir tampon actif (ΔpH ≈ 0)
              </span>
            </div>
          </div>

          {/* Boutons d'injection */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => applyCrashTest('add_hcl')}
              className="py-2.5 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
            >
              <span>🧪</span>
              <span>Injecter 1 mL de HCl (1 mol/L)</span>
            </button>

            <button
              type="button"
              onClick={() => applyCrashTest('add_naoh')}
              className="py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
            >
              <span>🧪</span>
              <span>Injecter 1 mL de NaOH (1 mol/L)</span>
            </button>

            <button
              type="button"
              onClick={() => applyCrashTest('dilution')}
              className="py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center gap-2 shadow-xs transition-colors"
            >
              <span>💧</span>
              <span>Diluer par 10 (+90 mL d&apos;eau)</span>
            </button>

            <button
              type="button"
              onClick={resetCrash}
              className="py-2.5 px-4 rounded-xl bg-surface hover:bg-surface-muted text-navy border border-navy/15 font-bold text-xs flex items-center gap-2 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Réinitialiser</span>
            </button>
          </div>

          {/* Journal des observations */}
          <div className="bg-surface rounded-2xl p-4 border border-navy/10 space-y-2">
            <span className="text-xs font-bold text-navy uppercase tracking-wider block">
              Journal d&apos;Analyse Pédagogique :
            </span>
            <div className="space-y-1.5 text-xs text-text/80 max-h-40 overflow-y-auto">
              {crashHistory.map((item, i) => (
                <div key={`crash-${i}`} className="p-2 rounded-lg bg-white border border-navy/5">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

