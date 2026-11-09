'use client';

import React, { useState, useEffect, useRef } from 'react';
import MathRenderer from '@/components/course/math-renderer';
import {
  Scale,
  Gauge,
  Play,
  Pause,
  RotateCcw,
  Sliders,
  TrendingUp,
  AlertTriangle,
  Info,
  CheckCircle2,
  Zap,
  Layers,
  ArrowRight,
  Anchor,
} from 'lucide-react';

export default function NewtonInteractiveSimulator() {
  const [activeTab, setActiveTab] = useState<'plan_incline' | 'ter_traction' | 'atwood' | 'action_reaction'>('plan_incline');

  // ========================================================
  // ATELIER 1 : LE PLAN INCLINÉ DYNAMIQUE
  // ========================================================
  const [alphaDeg, setAlphaDeg] = useState<number>(30); // Angle d'inclinaison (degrés)
  const [masseM, setMasseM] = useState<number>(2.0); // Masse m en kg
  const [coeffMu, setCoeffMu] = useState<number>(0.2); // Coefficient de frottement dynamique
  const [isPlayingPlan, setIsPlayingPlan] = useState<boolean>(false);
  const [mobilePos, setMobilePos] = useState<number>(0); // Position le long du plan (0 à 100%)
  const animPlanRef = useRef<number | null>(null);

  const g = 9.8; // m·s⁻²
  const alphaRad = (alphaDeg * Math.PI) / 180;

  // Calculs physiques
  const P = masseM * g; // Poids (N)
  const Px = P * Math.sin(alphaRad); // Composante tangentielle motrice (N)
  const Py = P * Math.cos(alphaRad); // Composante normale (N)
  const RN = Py; // Réaction normale du support (N)
  const fMax = coeffMu * RN; // Force de frottement de Coulomb (N)

  // Condition de glissement vers le bas
  const canSlide = Px > fMax;
  const accPlan = canSlide ? (Px - fMax) / masseM : 0; // Accélération résultante (m·s⁻²)

  useEffect(() => {
    if (isPlayingPlan && canSlide) {
      const step = () => {
        setMobilePos((prev) => {
          const next = prev + (accPlan * 0.15 + 0.3);
          return next > 95 ? 0 : next;
        });
        animPlanRef.current = requestAnimationFrame(step);
      };
      animPlanRef.current = requestAnimationFrame(step);
    } else if (animPlanRef.current) {
      cancelAnimationFrame(animPlanRef.current);
    }
    return () => {
      if (animPlanRef.current) cancelAnimationFrame(animPlanRef.current);
    };
  }, [isPlayingPlan, canSlide, accPlan]);

  // ========================================================
  // ATELIER 2 : TRACTION & FREINAGE DU TER DAKAR
  // ========================================================
  const [terMode, setTerMode] = useState<'traction' | 'freinage'>('traction');
  const [terMasseT, setTerMasseT] = useState<number>(150); // Tonnes (150 t = 150 000 kg)
  const [terForceKN, setTerForceKN] = useState<number>(120); // kN
  const [terResistanceKN, setTerResistanceKN] = useState<number>(20); // kN

  const masseKg = terMasseT * 1000;
  let forceNetteN = 0;
  let terAccMs2 = 0;

  if (terMode === 'traction') {
    forceNetteN = (terForceKN - terResistanceKN) * 1000;
    terAccMs2 = forceNetteN / masseKg;
  } else {
    // Freinage : les freins + la résistance s'opposent au mouvement
    forceNetteN = -(terForceKN + terResistanceKN) * 1000;
    terAccMs2 = forceNetteN / masseKg;
  }

  // Distance pour atteindre 160 km/h (44.4 m/s) ou s'arrêter depuis 160 km/h
  const vCibleMs = 44.44;
  const distTerMetres = Math.abs((vCibleMs * vCibleMs) / (2 * Math.abs(terAccMs2 || 0.01)));
  const tempsTerSec = Math.abs(vCibleMs / (terAccMs2 || 0.01));

  // ========================================================
  // ATELIER 3 : MACHINE D'ATWOOD (SYSTÈMES LIÉS)
  // ========================================================
  const [atwoodM1, setAtwoodM1] = useState<number>(2.0); // kg
  const [atwoodM2, setAtwoodM2] = useState<number>(4.0); // kg
  const [isPlayingAtwood, setIsPlayingAtwood] = useState<boolean>(false);
  const [atwoodOffset, setAtwoodOffset] = useState<number>(0);
  const animAtwoodRef = useRef<number | null>(null);

  const diffM = Math.abs(atwoodM2 - atwoodM1);
  const sumM = atwoodM1 + atwoodM2;
  const accAtwood = (diffM / sumM) * g; // m·s⁻²
  const tensionAtwood = (2 * atwoodM1 * atwoodM2 * g) / sumM; // N

  useEffect(() => {
    if (isPlayingAtwood && diffM > 0.05) {
      const step = () => {
        setAtwoodOffset((prev) => {
          const next = prev + accAtwood * 0.4;
          return next > 60 ? -60 : next;
        });
        animAtwoodRef.current = requestAnimationFrame(step);
      };
      animAtwoodRef.current = requestAnimationFrame(step);
    } else if (animAtwoodRef.current) {
      cancelAnimationFrame(animAtwoodRef.current);
    }
    return () => {
      if (animAtwoodRef.current) cancelAnimationFrame(animAtwoodRef.current);
    };
  }, [isPlayingAtwood, diffM, accAtwood]);

  // ========================================================
  // ATELIER 4 : 3ème LOI DE NEWTON (ACTION - RÉACTION)
  // ========================================================
  const [pousseeN, setPousseeN] = useState<number>(650); // Force exercée (N)
  const [lutteurMasse, setLutteurMasse] = useState<number>(110); // kg

  const accPropulsion = pousseeN / lutteurMasse; // a = F / m

  return (
    <div className="bg-white rounded-3xl border border-navy/10 p-5 sm:p-7 shadow-sm space-y-6">
      {/* En-tête du Laboratoire */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-turquoise-light text-turquoise">
              <Scale className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-navy">
              Laboratoire Interactif : P2 — Les Lois de Newton sur le Mouvement
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-text/70 mt-1">
            Explorez le TCI, le plan incliné, la machine d&apos;Atwood et la 3ème loi avec calcul dynamique des vecteurs en temps réel.
          </p>
        </div>

        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 self-start sm:self-auto">
          Terminale S2 • Sénégal
        </span>
      </div>

      {/* Navigation des 4 Ateliers */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={() => setActiveTab('plan_incline')}
          className={`p-3 rounded-2xl text-xs font-bold transition-all border text-left flex flex-col justify-between gap-1 ${
            activeTab === 'plan_incline'
              ? 'bg-turquoise text-white border-turquoise shadow-md shadow-turquoise/20'
              : 'bg-surface hover:bg-navy/5 text-navy border-navy/10'
          }`}
        >
          <span className="text-[10px] uppercase tracking-wider opacity-80">Atelier 1</span>
          <span className="font-bold flex items-center gap-1">
            <Layers className="w-3.5 h-3.5" /> Plan Incliné
          </span>
        </button>

        <button
          onClick={() => setActiveTab('ter_traction')}
          className={`p-3 rounded-2xl text-xs font-bold transition-all border text-left flex flex-col justify-between gap-1 ${
            activeTab === 'ter_traction'
              ? 'bg-turquoise text-white border-turquoise shadow-md shadow-turquoise/20'
              : 'bg-surface hover:bg-navy/5 text-navy border-navy/10'
          }`}
        >
          <span className="text-[10px] uppercase tracking-wider opacity-80">Atelier 2</span>
          <span className="font-bold flex items-center gap-1">
            <Zap className="w-3.5 h-3.5" /> TER Traction/Frein
          </span>
        </button>

        <button
          onClick={() => setActiveTab('atwood')}
          className={`p-3 rounded-2xl text-xs font-bold transition-all border text-left flex flex-col justify-between gap-1 ${
            activeTab === 'atwood'
              ? 'bg-turquoise text-white border-turquoise shadow-md shadow-turquoise/20'
              : 'bg-surface hover:bg-navy/5 text-navy border-navy/10'
          }`}
        >
          <span className="text-[10px] uppercase tracking-wider opacity-80">Atelier 3</span>
          <span className="font-bold flex items-center gap-1">
            <Scale className="w-3.5 h-3.5" /> Machine d&apos;Atwood
          </span>
        </button>

        <button
          onClick={() => setActiveTab('action_reaction')}
          className={`p-3 rounded-2xl text-xs font-bold transition-all border text-left flex flex-col justify-between gap-1 ${
            activeTab === 'action_reaction'
              ? 'bg-turquoise text-white border-turquoise shadow-md shadow-turquoise/20'
              : 'bg-surface hover:bg-navy/5 text-navy border-navy/10'
          }`}
        >
          <span className="text-[10px] uppercase tracking-wider opacity-80">Atelier 4</span>
          <span className="font-bold flex items-center gap-1">
            <ArrowRight className="w-3.5 h-3.5" /> 3ème Loi (Lamb/Pirogue)
          </span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* ATELIER 1 : LE PLAN INCLINÉ DYNAMIQUE */}
      {/* ======================================================== */}
      {activeTab === 'plan_incline' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Colonne de gauche : Contrôles */}
          <div className="lg:col-span-5 space-y-4 bg-surface rounded-2xl p-4 border border-navy/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-turquoise" /> Paramètres du Plan Incliné
            </h4>

            {/* Slider Angle alpha */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-navy">
                <span>Angle de la pente (α) :</span>
                <span className="font-mono font-bold text-turquoise">{alphaDeg}°</span>
              </div>
              <input
                type="range"
                min={0}
                max={60}
                step={1}
                value={alphaDeg}
                onChange={(e) => setAlphaDeg(Number(e.target.value))}
                className="w-full accent-turquoise cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-text/50 font-mono">
                <span>0° (Plat)</span>
                <span>30° (Moyen)</span>
                <span>60° (Raide)</span>
              </div>
            </div>

            {/* Slider Masse m */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-navy">
                <span>Masse du solide (m) :</span>
                <span className="font-mono font-bold text-navy">{masseM.toFixed(1)} kg</span>
              </div>
              <input
                type="range"
                min={0.5}
                max={10.0}
                step={0.5}
                value={masseM}
                onChange={(e) => setMasseM(Number(e.target.value))}
                className="w-full accent-navy cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-text/50 font-mono">
                <span>0,5 kg</span>
                <span>5,0 kg</span>
                <span>10,0 kg</span>
              </div>
            </div>

            {/* Slider Frottement mu */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-navy">
                <span>Coefficient de frottement (μ) :</span>
                <span className="font-mono font-bold text-amber-600">{coeffMu.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min={0.0}
                max={0.6}
                step={0.05}
                value={coeffMu}
                onChange={(e) => setCoeffMu(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-text/50 font-mono">
                <span>0,00 (Lisse / Glace)</span>
                <span>0,30 (Bois/Acier)</span>
                <span>0,60 (Rugueux)</span>
              </div>
            </div>

            {/* Diagnostic Adhérence / Mouvement */}
            <div
              className={`p-3 rounded-xl border text-xs space-y-1 ${
                canSlide
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-amber-50 border-amber-200 text-amber-950'
              }`}
            >
              <div className="flex items-center justify-between font-bold">
                <span className="flex items-center gap-1">
                  {canSlide ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-amber-600" />}
                  {canSlide ? 'Glissement Accéléré' : 'Adhérence / Blocage'}
                </span>
                <span className="font-mono text-xs">
                  a = {accPlan.toFixed(2)} m·s⁻²
                </span>
              </div>
              <p className="text-[11px] leading-tight">
                {canSlide
                  ? `La composante du poids Pₓ (${Px.toFixed(1)} N) dépasse le frottement maximal f (${fMax.toFixed(1)} N). Le mobile descend en MRUV !`
                  : `Pₓ (${Px.toFixed(1)} N) ≤ f_max (${fMax.toFixed(1)} N) : tan(α) ≤ μ. Le mobile reste immobile à cause de l'adhérence.`}
              </p>
            </div>

            {/* Boutons Animation */}
            <div className="flex items-center gap-2 pt-2 border-t border-navy/10">
              <button
                onClick={() => setIsPlayingPlan(!isPlayingPlan)}
                disabled={!canSlide}
                className="flex-1 py-2 rounded-xl bg-turquoise hover:bg-turquoise/90 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm disabled:opacity-40"
              >
                {isPlayingPlan ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isPlayingPlan ? 'Pause' : 'Lancer la descente'}
              </button>
              <button
                onClick={() => {
                  setIsPlayingPlan(false);
                  setMobilePos(0);
                }}
                className="p-2 rounded-xl bg-white hover:bg-navy/5 text-navy border border-navy/10 transition-all"
                title="Réinitialiser"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Colonne de droite : Visualisation SVG dynamique */}
          <div className="lg:col-span-7 bg-surface rounded-2xl p-5 border border-navy/10 space-y-4">
            <div className="flex items-center justify-between border-b border-navy/10 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-navy">
                Bilan Vectoriel en Temps Réel (TCI)
              </span>
              <div className="flex items-center gap-3 text-[11px] font-semibold">
                <span className="text-rose-500 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
                  <MathRenderer content="$\vec{P}$" /> ({P.toFixed(1)} N)
                </span>
                <span className="text-sky-500 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-sky-500 inline-block" />
                  <MathRenderer content="$\vec{R}_N$" /> ({RN.toFixed(1)} N)
                </span>
                <span className="text-amber-500 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                  <MathRenderer content="$\vec{f}$" /> ({fMax.toFixed(1)} N)
                </span>
              </div>
            </div>

            {/* Tracé SVG interactif */}
            <div className="bg-slate-900 rounded-xl p-3 border border-navy/10 flex flex-col items-center overflow-hidden">
              <svg viewBox="0 0 340 210" className="w-full h-56 drop-shadow-sm">
                {/* Sol horizontal */}
                <line x1="20" y1="185" x2="320" y2="185" stroke="#475569" strokeWidth="2" />

                {/* Rampe inclinée selon alphaDeg */}
                {(() => {
                  const rampeLongueur = 260;
                  const xBase = 30;
                  const yBase = 185;
                  const xSommet = xBase + rampeLongueur * Math.cos(alphaRad);
                  const ySommet = yBase - rampeLongueur * Math.sin(alphaRad);

                  // Position du mobile sur la rampe (du sommet vers le bas)
                  const tFrac = mobilePos / 100;
                  const mobileX = xSommet - tFrac * (xSommet - xBase) * 0.85;
                  const mobileY = ySommet + tFrac * (yBase - ySommet) * 0.85;

                  return (
                    <g>
                      {/* Triangle de la rampe */}
                      <polygon
                        points={`${xBase},${yBase} ${xSommet},${ySommet} ${xSommet},${yBase}`}
                        fill="#1E293B"
                        stroke="#64748B"
                        strokeWidth="1.5"
                      />

                      {/* Arc d'angle alpha */}
                      <path
                        d={`M ${xBase + 35},${yBase} A 35,35 0 0,0 ${xBase + 35 * Math.cos(alphaRad)},${
                          yBase - 35 * Math.sin(alphaRad)
                        }`}
                        fill="none"
                        stroke="#FBBF24"
                        strokeWidth="2"
                      />
                      <text x={xBase + 42} y={yBase - 8} fill="#FBBF24" fontSize="10" fontWeight="bold">
                        {alphaDeg}°
                      </text>

                      {/* Mobile M sur la rampe */}
                      <g transform={`translate(${mobileX}, ${mobileY}) rotate(${-alphaDeg})`}>
                        <rect x="-18" y="-14" width="36" height="20" rx="3" fill="#00B8A9" stroke="#FFFFFF" strokeWidth="1.5" />
                        <circle cx="0" cy="-4" r="2.5" fill="#FFFFFF" />
                        <text x="4" y="-8" fill="#FFFFFF" fontSize="8" fontWeight="bold">G</text>

                        {/* Réaction Normale RN (perpendiculaire vers le haut) */}
                        <line x1="0" y1="-4" x2="0" y2={-4 - Math.min(45, RN * 1.5)} stroke="#38BDF8" strokeWidth="2.5" markerEnd="url(#arrow-cyan-sim)" />
                        <text x="3" y={-10 - Math.min(35, RN * 1.5)} fill="#38BDF8" fontSize="9" fontWeight="bold">R_N</text>

                        {/* Frottement f (parallèle vers l'arrière) */}
                        {coeffMu > 0 && (
                          <g>
                            <line x1="0" y1="-4" x2={-Math.min(35, fMax * 2.5)} y2="-4" stroke="#F59E0B" strokeWidth="2" markerEnd="url(#arrow-amber-sim)" />
                            <text x={-Math.min(35, fMax * 2.5) - 8} y="-6" fill="#FBBF24" fontSize="9" fontWeight="bold">f</text>
                          </g>
                        )}
                      </g>

                      {/* Poids P (vertical vers le bas depuis le centre du mobile) */}
                      <line
                        x1={mobileX}
                        y1={mobileY}
                        x2={mobileX}
                        y2={mobileY + Math.min(55, P * 2.0)}
                        stroke="#F43F5E"
                        strokeWidth="2.5"
                        markerEnd="url(#arrow-rose-sim)"
                      />
                      <text x={mobileX + 5} y={mobileY + Math.min(45, P * 2.0)} fill="#FDA4AF" fontSize="10" fontWeight="bold">
                        P
                      </text>
                    </g>
                  );
                })()}

                <defs>
                  <marker id="arrow-cyan-sim" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#38BDF8" />
                  </marker>
                  <marker id="arrow-rose-sim" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#F43F5E" />
                  </marker>
                  <marker id="arrow-amber-sim" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#F59E0B" />
                  </marker>
                </defs>
              </svg>
            </div>

            {/* Équations analytiques calculées */}
            <div className="p-3 bg-white rounded-xl border border-navy/10 text-center text-xs space-y-1">
              <span className="text-[10px] text-text/50 font-bold uppercase tracking-wider block">
                Application Numérique du TCI sur la Pente
              </span>
              <MathRenderer
                content={`$$a = g\\,(\\sin\\alpha - \\mu\\,\\cos\\alpha) = 9{,}8\\,(\\sin(${alphaDeg}^\\circ) - ${coeffMu.toFixed(2)}\\,\\cos(${alphaDeg}^\\circ)) = \\mathbf{${accPlan.toFixed(2)}\\text{ m}\\cdot\\text{s}^{-2}}$$`}
              />
              <div className="text-[11px] text-text/70 mt-1 flex items-center justify-center gap-1 flex-wrap">
                <span>La réaction normale vaut</span>
                <MathRenderer content={`$R_N = m\\,g\\,\\cos\\alpha = ${RN.toFixed(1)}\\text{ N}$`} />
                <span>et le frottement</span>
                <MathRenderer content={`$f = ${fMax.toFixed(1)}\\text{ N}$`} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ATELIER 2 : TRACTION & FREINAGE DU TER DAKAR */}
      {/* ======================================================== */}
      {activeTab === 'ter_traction' && (
        <div className="space-y-5">
          <div className="bg-sky-50/70 p-4 rounded-2xl border border-sky-200 text-xs text-sky-950 space-y-1">
            <span className="font-bold flex items-center gap-1.5 text-sky-900">
              <Info className="w-4 h-4 text-sky-600" />
              Cas Réel : Train Express Régional (TER) Dakar-Diamniadio :
            </span>
            <div className="leading-relaxed">
              Une rame de TER (<MathRenderer content="$M = 150\text{ t}$" className="inline" />) subit la force motrice <MathRenderer content="$\vec{F}_m$" className="inline" /> transmise par les moteurs électriques, les forces de résistance à l&apos;avancement <MathRenderer content="$\vec{f}$" className="inline" /> (frottements mécaniques et aérodynamiques), et les freins à disque en phase d&apos;arrêt.
            </div>
          </div>

          {/* Sélecteur de mode */}
          <div className="flex gap-2">
            <button
              onClick={() => setTerMode('traction')}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs border transition-all ${
                terMode === 'traction'
                  ? 'bg-turquoise text-white border-turquoise shadow-sm'
                  : 'bg-surface text-navy border-navy/10 hover:bg-navy/5'
              }`}
            >
              🚀 Phase 1 : Traction &amp; Accélération (Départ Colobane)
            </button>
            <button
              onClick={() => setTerMode('freinage')}
              className={`flex-1 py-2.5 rounded-xl font-bold text-xs border transition-all ${
                terMode === 'freinage'
                  ? 'bg-rose-500 text-white border-rose-500 shadow-sm'
                  : 'bg-surface text-navy border-navy/10 hover:bg-navy/5'
              }`}
            >
              🛑 Phase 2 : Freinage d&apos;Urgence (Arrivée Rufisque)
            </button>
          </div>

          {/* Contrôles du TER */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-surface p-4 rounded-2xl border border-navy/10">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-text/70">Masse de la rame (M) :</span>
                <span className="font-mono font-bold text-navy">{terMasseT} tonnes</span>
              </div>
              <input
                type="range"
                min={80}
                max={250}
                step={10}
                value={terMasseT}
                onChange={(e) => setTerMasseT(Number(e.target.value))}
                className="w-full accent-navy cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-text/50">
                <span>80 t (Léger)</span>
                <span>150 t (Normal)</span>
                <span>250 t (Complet)</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-text/70">
                  {terMode === 'traction' ? 'Force motrice (F_m) :' : 'Force de freinage (F_freins) :'}
                </span>
                <span className="font-mono font-bold text-turquoise">{terForceKN} kN</span>
              </div>
              <input
                type="range"
                min={40}
                max={250}
                step={10}
                value={terForceKN}
                onChange={(e) => setTerForceKN(Number(e.target.value))}
                className="w-full accent-turquoise cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-text/50">
                <span>40 kN</span>
                <span>120 kN</span>
                <span>250 kN</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-text/70">Résistance au roulement (f) :</span>
                <span className="font-mono font-bold text-amber-600">{terResistanceKN} kN</span>
              </div>
              <input
                type="range"
                min={10}
                max={50}
                step={5}
                value={terResistanceKN}
                onChange={(e) => setTerResistanceKN(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-text/50">
                <span>10 kN</span>
                <span>20 kN</span>
                <span>50 kN</span>
              </div>
            </div>
          </div>

          {/* Métriques calculées */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
            <div className="bg-surface p-3 rounded-xl border border-navy/10">
              <span className="text-[10px] text-text/60 block uppercase font-bold">Force Nette</span>
              <span className="font-mono font-bold text-navy">
                {forceNetteN > 0 ? `+${(forceNetteN / 1000).toFixed(0)}` : (forceNetteN / 1000).toFixed(0)} kN
              </span>
            </div>
            <div className="bg-surface p-3 rounded-xl border border-navy/10">
              <span className="text-[10px] text-text/60 block uppercase font-bold">Accélération a</span>
              <span className={`font-mono font-bold ${terAccMs2 >= 0 ? 'text-turquoise' : 'text-rose-600'}`}>
                {terAccMs2.toFixed(3)} m·s⁻²
              </span>
            </div>
            <div className="bg-surface p-3 rounded-xl border border-navy/10">
              <span className="text-[10px] text-text/60 block uppercase font-bold">
                {terMode === 'traction' ? 'Distance à 160 km/h' : 'Distance d\'arrêt'}
              </span>
              <span className="font-mono font-bold text-indigo-600">
                {distTerMetres > 1000 ? `${(distTerMetres / 1000).toFixed(2)} km` : `${distTerMetres.toFixed(0)} m`}
              </span>
            </div>
            <div className="bg-surface p-3 rounded-xl border border-navy/10">
              <span className="text-[10px] text-text/60 block uppercase font-bold">Durée de phase</span>
              <span className="font-mono font-bold text-amber-600">{tempsTerSec.toFixed(1)} s</span>
            </div>
          </div>

          {/* Formule KaTeX TCI TER */}
          <div className="bg-surface rounded-2xl p-4 border border-navy/10 text-center text-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-text/50 block mb-1">
              Deuxième Loi de Newton Appliquée au TER (Axe horizontal Ox)
            </span>
            <MathRenderer
              content={
                terMode === 'traction'
                  ? `$$F_m - f = M\\,a \\implies a = \\frac{F_m - f}{M} = \\frac{${(terForceKN * 1000).toLocaleString()} - ${(
                      terResistanceKN * 1000
                    ).toLocaleString()}}{${masseKg.toLocaleString()}} = \\mathbf{${terAccMs2.toFixed(3)}\\text{ m}\\cdot\\text{s}^{-2}}$$`
                  : `$$-F_{\\text{freins}} - f = M\\,a \\implies a = \\frac{-(${(terForceKN * 1000).toLocaleString()} + ${(
                      terResistanceKN * 1000
                    ).toLocaleString()})}{${masseKg.toLocaleString()}} = \\mathbf{${terAccMs2.toFixed(3)}\\text{ m}\\cdot\\text{s}^{-2}}$$`
              }
            />
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ATELIER 3 : MACHINE D'ATWOOD (SYSTÈMES LIÉS) */}
      {/* ======================================================== */}
      {activeTab === 'atwood' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Contrôles Atwood */}
          <div className="lg:col-span-5 space-y-4 bg-surface rounded-2xl p-4 border border-navy/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-turquoise" /> Masses Suspendues (Poulie &amp; Fil)
            </h4>

            {/* Slider Masse 1 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-navy">
                <span>Masse suspendue m₁ (Gauche) :</span>
                <span className="font-mono font-bold text-sky-600">{atwoodM1.toFixed(1)} kg</span>
              </div>
              <input
                type="range"
                min={1.0}
                max={8.0}
                step={0.5}
                value={atwoodM1}
                onChange={(e) => setAtwoodM1(Number(e.target.value))}
                className="w-full accent-sky-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-text/50 font-mono">
                <span>1,0 kg</span>
                <span>4,0 kg</span>
                <span>8,0 kg</span>
              </div>
            </div>

            {/* Slider Masse 2 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-navy">
                <span>Masse suspendue m₂ (Droite) :</span>
                <span className="font-mono font-bold text-purple-600">{atwoodM2.toFixed(1)} kg</span>
              </div>
              <input
                type="range"
                min={1.0}
                max={8.0}
                step={0.5}
                value={atwoodM2}
                onChange={(e) => setAtwoodM2(Number(e.target.value))}
                className="w-full accent-purple-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-text/50 font-mono">
                <span>1,0 kg</span>
                <span>4,0 kg</span>
                <span>8,0 kg</span>
              </div>
            </div>

            {/* Diagnostic Sens du Mouvement */}
            <div className="p-3 bg-white rounded-xl border border-navy/10 space-y-1 text-xs">
              <span className="font-bold text-navy block">Comportement du Système :</span>
              <p className="text-[11px] text-text/80">
                {atwoodM2 > atwoodM1
                  ? `m₂ (${atwoodM2} kg) > m₁ (${atwoodM1} kg) : m₂ descend et m₁ monte avec une accélération commune de ${accAtwood.toFixed(2)} m·s⁻².`
                  : atwoodM1 > atwoodM2
                  ? `m₁ (${atwoodM1} kg) > m₂ (${atwoodM2} kg) : m₁ descend et m₂ monte.`
                  : 'Équilibre statique parfait (m₁ = m₂) : accélération nulle a = 0 m·s⁻².'}
              </p>
            </div>

            {/* Boutons Animation */}
            <div className="flex items-center gap-2 pt-2 border-t border-navy/10">
              <button
                onClick={() => setIsPlayingAtwood(!isPlayingAtwood)}
                disabled={diffM === 0}
                className="flex-1 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm disabled:opacity-40"
              >
                {isPlayingAtwood ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                {isPlayingAtwood ? 'Pause' : 'Animer le mouvement'}
              </button>
              <button
                onClick={() => {
                  setIsPlayingAtwood(false);
                  setAtwoodOffset(0);
                }}
                className="p-2 rounded-xl bg-white hover:bg-navy/5 text-navy border border-navy/10 transition-all"
                title="Réinitialiser"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Visualisation SVG Atwood */}
          <div className="lg:col-span-7 bg-surface rounded-2xl p-5 border border-navy/10 space-y-4">
            <div className="flex items-center justify-between border-b border-navy/10 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-navy">
                Schéma Mécanique de la Machine d&apos;Atwood
              </span>
              <span className="text-xs font-mono font-bold text-purple-700 px-2.5 py-0.5 rounded-full bg-purple-50 border border-purple-200">
                Tension T = {tensionAtwood.toFixed(1)} N
              </span>
            </div>

            {/* Tracé SVG de la machine d'Atwood */}
            <div className="bg-slate-900 rounded-xl p-3 border border-navy/10 flex flex-col items-center">
              <svg viewBox="0 0 300 220" className="w-full h-56">
                {/* Support haut */}
                <rect x="135" y="10" width="30" height="15" fill="#475569" rx="2" />
                <line x1="150" y1="25" x2="150" y2="45" stroke="#94A3B8" strokeWidth="2" />

                {/* Poulie centrale */}
                <circle cx="150" cy="55" r="22" fill="#334155" stroke="#64748B" strokeWidth="2.5" />
                <circle cx="150" cy="55" r="5" fill="#CBD5E1" />

                {/* Fil gauche (m1) */}
                {(() => {
                  const y1 = 120 - atwoodOffset;
                  const y2 = 120 + atwoodOffset;

                  return (
                    <g>
                      {/* Fil reliant m1 */}
                      <line x1="128" y1="55" x2="128" y2={y1} stroke="#E2E8F0" strokeWidth="2" />
                      {/* Masse m1 */}
                      <rect x="113" y={y1} width="30" height="24" rx="4" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="1.5" />
                      <text x="128" y={y1 + 16} fill="#0F172A" fontSize="10" fontWeight="bold" textAnchor="middle">
                        m₁
                      </text>
                      {/* Vecteur P1 (vers le bas) */}
                      <line x1="128" y1={y1 + 24} x2="128" y2={y1 + 24 + atwoodM1 * 4} stroke="#F43F5E" strokeWidth="2" markerEnd="url(#arrow-rose-sim)" />
                      {/* Vecteur T1 (vers le haut) */}
                      <line x1="128" y1={y1} x2="128" y2={y1 - 25} stroke="#38BDF8" strokeWidth="2" markerEnd="url(#arrow-cyan-sim)" />

                      {/* Fil reliant m2 */}
                      <line x1="172" y1="55" x2="172" y2={y2} stroke="#E2E8F0" strokeWidth="2" />
                      {/* Masse m2 */}
                      <rect x="157" y={y2} width="30" height="24" rx="4" fill="#A855F7" stroke="#FFFFFF" strokeWidth="1.5" />
                      <text x="172" y={y2 + 16} fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">
                        m₂
                      </text>
                      {/* Vecteur P2 (vers le bas) */}
                      <line x1="172" y1={y2 + 24} x2="172" y2={y2 + 24 + atwoodM2 * 4} stroke="#F43F5E" strokeWidth="2" markerEnd="url(#arrow-rose-sim)" />
                      {/* Vecteur T2 (vers le haut) */}
                      <line x1="172" y1={y2} x2="172" y2={y2 - 25} stroke="#A855F7" strokeWidth="2" markerEnd="url(#arrow-cyan-sim)" />
                    </g>
                  );
                })()}
              </svg>
            </div>

            {/* Formule de la tension et de l'accélération */}
            <div className="p-3 bg-white rounded-xl border border-navy/10 text-center text-xs space-y-1">
              <span className="text-[10px] text-text/50 font-bold uppercase tracking-wider block">
                Formules Fondamentales d&apos;Atwood au Bac S2
              </span>
              <MathRenderer
                content={`$$a = \\frac{|m_2 - m_1|}{m_1 + m_2}\\,g = \\mathbf{${accAtwood.toFixed(2)}\\text{ m}\\cdot\\text{s}^{-2}} \\quad ; \\quad T = \\frac{2\\,m_1\\,m_2}{m_1 + m_2}\\,g = \\mathbf{${tensionAtwood.toFixed(1)}\\text{ N}}$$`}
              />
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ATELIER 4 : 3ème LOI DE NEWTON (ACTION - RÉACTION) */}
      {/* ======================================================== */}
      {activeTab === 'action_reaction' && (
        <div className="space-y-5">
          <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-200 text-xs text-amber-950 space-y-1">
            <span className="font-bold flex items-center gap-1.5 text-amber-900">
              <Info className="w-4 h-4 text-amber-600" />
              La 3ème Loi dans la Lutte Sénégalaise (Lamb) &amp; la Pirogue de Kayar :
            </span>
            <div className="leading-relaxed">
              Pour se propulser vers l&apos;avant et attaquer, le lutteur pousse violemment le sol sablonneux vers l&apos;arrière avec ses pieds (force <MathRenderer content="$\vec{F}_{\text{pied}/\text{sol}}$" className="inline" />). Simultanément, le sol exerce sur le lutteur une force exactement égale en valeur mais dirigée vers l&apos;avant (<MathRenderer content="$\vec{F}_{\text{sol}/\text{pied}}$" className="inline" />) qui assure son accélération !
            </div>
          </div>

          {/* Réglages interactifs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-surface p-4 rounded-2xl border border-navy/10">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-text/70">Force de poussée exercée sur le sol (F) :</span>
                <span className="font-mono font-bold text-rose-600">{pousseeN} N</span>
              </div>
              <input
                type="range"
                min={200}
                max={1500}
                step={50}
                value={pousseeN}
                onChange={(e) => setPousseeN(Number(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-text/50">
                <span>200 N (Léger)</span>
                <span>650 N (Moyen)</span>
                <span>1500 N (Attaque éclair)</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-text/70">Masse du lutteur / sportif (m) :</span>
                <span className="font-mono font-bold text-navy">{lutteurMasse} kg</span>
              </div>
              <input
                type="range"
                min={60}
                max={140}
                step={5}
                value={lutteurMasse}
                onChange={(e) => setLutteurMasse(Number(e.target.value))}
                className="w-full accent-navy cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-text/50">
                <span>60 kg</span>
                <span>110 kg (Poids lourd)</span>
                <span>140 kg (Super lourd)</span>
              </div>
            </div>
          </div>

          {/* Schéma Action-Réaction SVG */}
          <div className="bg-slate-900 rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden h-56">
            <svg viewBox="0 0 400 180" className="w-full h-full max-w-md">
              {/* Sol de l'arène de lutte */}
              <line x1="30" y1="130" x2="370" y2="130" stroke="#78350F" strokeWidth="6" />
              <text x="200" y="145" fill="#D97706" fontSize="9" textAnchor="middle">
                Sable de l&apos;Arène Nationale (Sol)
              </text>

              {/* Point de contact Pied - Sol */}
              <circle cx="200" cy="127" r="5" fill="#F8FAFC" />

              {/* Vecteur Action : Pied pousse le sol vers la GAUCHE (arrière) */}
              <line x1="200" y1="127" x2={200 - Math.min(80, pousseeN * 0.08)} y2="127" stroke="#F43F5E" strokeWidth="3" markerEnd="url(#arrow-rose-sim)" />
              <text x={200 - Math.min(80, pousseeN * 0.08) - 10} y="118" fill="#FDA4AF" fontSize="10" fontWeight="bold">
                F_pied/sol ({pousseeN} N)
              </text>

              {/* Vecteur Réaction : Sol propulse le pied vers la DROITE (avant) */}
              <line x1="200" y1="127" x2={200 + Math.min(80, pousseeN * 0.08)} y2="127" stroke="#00B8A9" strokeWidth="3" markerEnd="url(#arrow-green-sim)" />
              <text x={200 + Math.min(80, pousseeN * 0.08) + 10} y="118" fill="#5EEAD4" fontSize="10" fontWeight="bold">
                F_sol/pied (+{pousseeN} N)
              </text>

              {/* Athlète / Lutteur symbolisé */}
              <circle cx="200" cy="70" r="14" fill="#00B8A9" />
              <line x1="200" y1="84" x2="200" y2="127" stroke="#00B8A9" strokeWidth="3" />
              <text x="200" y="50" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">
                Lutteur ({lutteurMasse} kg)
              </text>
            </svg>
          </div>

          {/* Formules et conclusions */}
          <div className="bg-surface rounded-2xl p-4 border border-navy/10 text-center text-xs space-y-1">
            <span className="text-[10px] uppercase font-bold text-text/50 block mb-1">
              Égalité des Intensités &amp; Accélération de Propulsion du Lutteur
            </span>
            <MathRenderer
              content={`$$\\vec{F}_{\\text{sol}/\\text{pied}} = -\\vec{F}_{\\text{pied}/\\text{sol}} \\implies \\|\\vec{F}_{\\text{sol}/\\text{pied}}\\| = \\mathbf{${pousseeN}\\text{ N}} \\implies a = \\frac{F}{m} = \\frac{${pousseeN}}{${lutteurMasse}} = \\mathbf{${accPropulsion.toFixed(2)}\\text{ m}\\cdot\\text{s}^{-2}}$$`}
            />
            <div className="text-[11px] text-text/70 mt-1">
              Les deux forces ont la même intensité ({pousseeN} N) mais ne s&apos;annulent jamais car <MathRenderer content="$\vec{F}_{\text{pied}/\text{sol}}$" className="inline" /> s&apos;exerce sur le sol et <MathRenderer content="$\vec{F}_{\text{sol}/\text{pied}}$" className="inline" /> s&apos;exerce sur le sportif !
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
