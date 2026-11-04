'use client';

import React, { useState, useEffect } from 'react';
import MathRenderer from '@/components/course/math-renderer';
import {
  FlaskConical,
  Flame,
  Snowflake,
  Play,
  Pause,
  RotateCcw,
  Zap,
  Gauge,
  Eye,
  AlertTriangle,
} from 'lucide-react';

export default function CinetiqueInteractiveSimulator() {
  const [activeTab, setActiveTab] = useState<'reacteur' | 'spectro' | 'trempe' | 'catalyseur'>('reacteur');

  // Facteurs cinétiques configurables
  const [temperature, setTemperature] = useState<number>(25); // 0 à 60 °C
  const [concentration, setConcentration] = useState<number>(0.05); // 0.01 à 0.10 mol/L
  const [hasCatalyst, setHasCatalyst] = useState<boolean>(false);
  const [isTrempeActive, setIsTrempeActive] = useState<boolean>(false);

  // Temps de simulation en minutes (0 à 25 min)
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Dosage à la burette (Atelier 3)
  const [buretteVolume, setBuretteVolume] = useState<number>(0); // 0 à 20 mL
  const [isDosing, setIsDosing] = useState<boolean>(false);
  const [hasAmidon, setHasAmidon] = useState<boolean>(true);

  // Vitesse globale k
  const kRate = isTrempeActive
    ? 0.0001
    : (0.04 + (temperature / 50) * 0.14 + (concentration / 0.1) * 0.08) * (hasCatalyst ? 2.8 : 1.0);

  // Avancement maximal en mmol
  const xMax = concentration * 50;

  // Avancement x(t) = xMax * (1 - exp(-k * t))
  const getX = (t: number, forceCatalyst?: boolean) => {
    let k = kRate;
    if (forceCatalyst !== undefined) {
      k = (0.04 + (temperature / 50) * 0.14 + (concentration / 0.1) * 0.08) * (forceCatalyst ? 2.8 : 1.0);
    }
    return xMax * (1 - Math.exp(-k * t));
  };

  // Vitesse de réaction v(t) = dx/dt
  const getV = (t: number) => {
    return isTrempeActive ? 0 : kRate * xMax * Math.exp(-kRate * t);
  };

  // Temps de demi-réaction
  const tDemi = Math.log(2) / kRate;

  // Absorbance A(t)
  const kSpectro = 0.85;
  const currentA = kSpectro * getX(time);

  // Boucle d'animation
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isRunning && !isTrempeActive) {
      interval = setInterval(() => {
        setTime((prev) => {
          if (prev >= 25) {
            setIsRunning(false);
            return 25;
          }
          return Math.round((prev + 0.25) * 100) / 100;
        });
      }, 70);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, isTrempeActive]);

  // Boucle de dosage burette
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isDosing) {
      interval = setInterval(() => {
        setBuretteVolume((prev) => {
          if (prev >= 20) {
            setIsDosing(false);
            return 20;
          }
          return Math.round((prev + 0.2) * 10) / 10;
        });
      }, 80);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isDosing]);

  const currentX = getX(time);
  const currentV = getV(time);
  const ratio = Math.min(1, currentX / xMax);

  const vEquivalence = Math.round(((2 * currentX) / 0.2) * 10) / 10;
  const isEquivalentReached = buretteVolume >= vEquivalence && vEquivalence > 0.5;

  const getIodineColor = () => {
    if (isTrempeActive) return '#7DD3FC';
    if (ratio < 0.04) return 'rgba(240, 248, 255, 0.4)';
    if (ratio < 0.25) return 'rgba(253, 224, 71, 0.75)';
    if (ratio < 0.55) return 'rgba(245, 158, 11, 0.85)';
    if (ratio < 0.8) return 'rgba(180, 83, 9, 0.9)';
    return 'rgba(120, 53, 15, 0.95)';
  };

  const svgW = 440;
  const svgH = 220;
  const pad = { top: 20, right: 20, bottom: 30, left: 45 };
  const graphW = svgW - pad.left - pad.right;
  const graphH = svgH - pad.top - pad.bottom;

  const pathD = Array.from({ length: 50 })
    .map((_, i) => {
      const t = (i / 49) * 25;
      const x = getX(t);
      const px = pad.left + (t / 25) * graphW;
      const py = pad.top + graphH - (x / xMax) * graphH;
      return `${i === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`;
    })
    .join(' ');

  const pathWithCat = Array.from({ length: 50 })
    .map((_, i) => {
      const t = (i / 49) * 25;
      const x = getX(t, true);
      const px = pad.left + (t / 25) * graphW;
      const py = pad.top + graphH - (x / xMax) * graphH;
      return `${i === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`;
    })
    .join(' ');

  const pathNoCat = Array.from({ length: 50 })
    .map((_, i) => {
      const t = (i / 49) * 25;
      const x = getX(t, false);
      const px = pad.left + (t / 25) * graphW;
      const py = pad.top + graphH - (x / xMax) * graphH;
      return `${i === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`;
    })
    .join(' ');

  const curPx = pad.left + (time / 25) * graphW;
  const curPy = pad.top + graphH - (currentX / xMax) * graphH;

  const dt = 3.5;
  const tA = Math.max(0, time - dt);
  const tB = Math.min(25, time + dt);
  const xA = currentX - currentV * (time - tA);
  const xB = currentX + currentV * (tB - time);
  const pAx = pad.left + (tA / 25) * graphW;
  const pAy = pad.top + graphH - (Math.max(0, xA) / xMax) * graphH;
  const pBx = pad.left + (tB / 25) * graphW;
  const pBy = pad.top + graphH - (Math.min(xMax * 1.25, xB) / xMax) * graphH;

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
              Laboratoire Virtuel : Cinétique Chimique (Bac S2)
            </h3>
          </div>
          <p className="text-sm text-text/70">
            Suivi temporel de l’oxydation des ions iodure :{' '}
            <code className="text-xs bg-navy/5 px-2 py-0.5 rounded text-navy font-semibold">
              S₂O₈²⁻ + 2 I⁻ ⟶ 2 SO₄²⁻ + I₂ (brun)
            </code>
          </p>
        </div>
        <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          Atelier Expérimental S2
        </span>
      </div>

      {/* Tabs navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={() => setActiveTab('reacteur')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'reacteur'
              ? 'bg-turquoise text-white shadow-md'
              : 'bg-surface hover:bg-navy/5 text-navy border border-navy/10'
          }`}
        >
          <Gauge className="w-4 h-4" />
          <span>1. Réacteur &amp; Facteurs</span>
        </button>

        <button
          onClick={() => setActiveTab('spectro')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'spectro'
              ? 'bg-turquoise text-white shadow-md'
              : 'bg-surface hover:bg-navy/5 text-navy border border-navy/10'
          }`}
        >
          <Eye className="w-4 h-4" />
          <span>2. Spectrophotomètre</span>
        </button>

        <button
          onClick={() => setActiveTab('trempe')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'trempe'
              ? 'bg-turquoise text-white shadow-md'
              : 'bg-surface hover:bg-navy/5 text-navy border border-navy/10'
          }`}
        >
          <Snowflake className="w-4 h-4" />
          <span>3. Trempe &amp; Dosage</span>
        </button>

        <button
          onClick={() => setActiveTab('catalyseur')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'catalyseur'
              ? 'bg-turquoise text-white shadow-md'
              : 'bg-surface hover:bg-navy/5 text-navy border border-navy/10'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>4. Piège Catalyseur &amp; t½</span>
        </button>
      </div>

      {/* TAB 1 : RÉACTEUR ET FACTEURS CINÉTIQUES */}
      {activeTab === 'reacteur' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 space-y-4 bg-surface rounded-2xl p-4 border border-navy/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy flex items-center gap-1.5">
              <span>🎛️</span>
              <span>Facteurs Cinétiques à Tester</span>
            </h4>

            {/* Température */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-navy">
                <span className="flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5 text-amber-500" /> Température ($T$) :
                </span>
                <span className="font-mono text-turquoise font-bold">{temperature} °C</span>
              </div>
              <input
                type="range"
                min={0}
                max={60}
                step={5}
                value={temperature}
                disabled={isTrempeActive}
                onChange={(e) => setTemperature(Number(e.target.value))}
                className="w-full accent-turquoise cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-text/50">
                <span>0°C (Glace)</span>
                <span>25°C (Ambiante)</span>
                <span>60°C (Bain chaud)</span>
              </div>
            </div>

            {/* Concentration */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-navy">
                <span>🧪 Concentration $[I^-]_0$ :</span>
                <span className="font-mono text-turquoise font-bold">{concentration.toFixed(2)} mol/L</span>
              </div>
              <input
                type="range"
                min={0.01}
                max={0.10}
                step={0.01}
                value={concentration}
                disabled={isTrempeActive}
                onChange={(e) => setConcentration(Number(e.target.value))}
                className="w-full accent-turquoise cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-text/50">
                <span>0.01 (Dilué)</span>
                <span>0.05</span>
                <span>0.10 (Concentré)</span>
              </div>
            </div>

            {/* Catalyseur toggle */}
            <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-navy/10">
              <div>
                <p className="text-xs font-bold text-navy flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-amber-500" /> Catalyseur (ions Fe³⁺)
                </p>
                <p className="text-[10px] text-text/60">Accélère la cinétique sans changer x_max</p>
              </div>
              <button
                onClick={() => setHasCatalyst(!hasCatalyst)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  hasCatalyst ? 'bg-emerald-500 text-white shadow-sm' : 'bg-navy/10 text-navy hover:bg-navy/20'
                }`}
              >
                {hasCatalyst ? 'Actif (+)' : 'Inactif'}
              </button>
            </div>

            {/* Trempe rapide */}
            <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-blue-900 flex items-center gap-1">
                  <Snowflake className="w-3.5 h-3.5 text-blue-600" /> Trempe dans l’eau glacée
                </span>
                <button
                  onClick={() => {
                    setIsTrempeActive(!isTrempeActive);
                    if (!isTrempeActive) setIsRunning(false);
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                    isTrempeActive
                      ? 'bg-blue-600 text-white animate-pulse'
                      : 'bg-white text-blue-700 border border-blue-300 hover:bg-blue-100'
                  }`}
                >
                  {isTrempeActive ? 'Figé à 0 °C' : 'Plonger'}
                </button>
              </div>
              <p className="text-[10px] text-blue-800 leading-tight">
                {isTrempeActive
                  ? '✓ Réaction figée net ! Agitation thermique nulle, vitesse $v = 0$.'
                  : 'Stoppe brutalement la réaction à l’instant $t$ pour doser.'}
              </p>
            </div>

            {/* Contrôles de simulation */}
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setIsRunning(!isRunning)}
                disabled={isTrempeActive || time >= 25}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold text-white transition-all flex items-center justify-center gap-2 ${
                  isRunning
                    ? 'bg-amber-600 hover:bg-amber-700'
                    : 'bg-turquoise hover:bg-turquoise/90 disabled:opacity-50'
                }`}
              >
                {isRunning ? (
                  <>
                    <Pause className="w-4 h-4" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" /> Démarrer ($t = {time.toFixed(1)}$ min)
                  </>
                )}
              </button>
              <button
                onClick={() => {
                  setTime(0);
                  setIsRunning(false);
                  setIsTrempeActive(false);
                }}
                className="p-2.5 rounded-xl border border-navy/20 text-navy hover:bg-white"
                title="Réinitialiser"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center bg-surface rounded-2xl p-4 border border-navy/10">
              <div className="sm:col-span-5 flex flex-col items-center">
                <span className="text-xs font-bold text-navy mb-1">Bécher Pyrex &amp; Agitateur</span>

                <svg viewBox="0 0 160 210" className="w-36 h-48 drop-shadow">
                  <rect x="20" y="150" width="120" height="45" rx="8" fill="#334155" stroke="#1E293B" strokeWidth="2" />
                  <rect x="25" y="153" width="110" height="6" rx="3" fill="#E2E8F0" />
                  <rect x="35" y="165" width="45" height="20" rx="4" fill="#0F172A" />
                  <text x="57" y="179" textAnchor="middle" fill="#10B981" fontSize="11" fontFamily="monospace" fontWeight="bold">
                    {temperature}°C
                  </text>
                  <circle cx="100" cy="175" r="7" fill="#64748B" stroke="#475569" strokeWidth="1.5" />
                  <circle cx="120" cy="175" r="7" fill="#64748B" stroke="#475569" strokeWidth="1.5" />

                  <path
                    d="M 40 40 L 40 145 A 8 8 0 0 0 48 153 L 112 153 A 8 8 0 0 0 120 145 L 120 40 L 123 37 L 37 37 Z"
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="3"
                  />
                  <path d="M 37 37 L 32 34 L 40 40" fill="none" stroke="#94A3B8" strokeWidth="2.5" />

                  <path
                    d="M 42 70 L 42 145 A 6 6 0 0 0 48 151 L 112 151 A 6 6 0 0 0 118 145 L 118 70 C 100 72 60 68 42 70 Z"
                    fill={getIodineColor()}
                    className="transition-colors duration-500"
                  />

                  <line x1="43" y1="60" x2="55" y2="60" stroke="#64748B" strokeWidth="1.5" />
                  <text x="58" y="63" fill="#64748B" fontSize="7" fontWeight="bold">200 mL</text>
                  <line x1="43" y1="85" x2="52" y2="85" stroke="#64748B" strokeWidth="1" />
                  <line x1="43" y1="110" x2="55" y2="110" stroke="#64748B" strokeWidth="1.5" />
                  <text x="58" y="113" fill="#64748B" fontSize="7" fontWeight="bold">100 mL</text>
                  <line x1="43" y1="135" x2="52" y2="135" stroke="#64748B" strokeWidth="1" />

                  <g transform="translate(80, 145)">
                    <rect
                      x="-14"
                      y="-4"
                      width="28"
                      height="8"
                      rx="4"
                      fill="#FFFFFF"
                      stroke="#CBD5E1"
                      strokeWidth="1"
                      className={isRunning && !isTrempeActive ? 'animate-spin origin-center' : ''}
                    />
                  </g>

                  {isRunning && !isTrempeActive && (
                    <>
                      <circle cx="65" cy="120" r="2" fill="rgba(255,255,255,0.7)" className="animate-ping" />
                      <circle cx="95" cy="100" r="2.5" fill="rgba(255,255,255,0.6)" className="animate-pulse" />
                      <circle cx="78" cy="85" r="1.5" fill="rgba(255,255,255,0.8)" />
                    </>
                  )}

                  {isTrempeActive && (
                    <g>
                      <rect x="50" y="75" width="14" height="14" rx="2" fill="#E0F2FE" stroke="#38BDF8" opacity="0.8" />
                      <rect x="75" y="80" width="16" height="14" rx="2" fill="#E0F2FE" stroke="#38BDF8" opacity="0.8" />
                      <rect x="95" y="72" width="14" height="14" rx="2" fill="#E0F2FE" stroke="#38BDF8" opacity="0.8" />
                      <text x="80" y="115" textAnchor="middle" fill="#0369A1" fontSize="10" fontWeight="bold">
                        GELÉ ❄️
                      </text>
                    </g>
                  )}
                </svg>

                <p className="text-[11px] font-medium text-navy/70 mt-1">
                  {ratio < 0.05
                    ? 'Incolore ($t = 0$)'
                    : ratio < 0.5
                    ? 'Jaune (I₂ naissant)'
                    : 'Brun acajou foncé (I₂ formé)'}
                </p>
              </div>

              <div className="sm:col-span-7 grid grid-cols-2 gap-2 text-center">
                <div className="bg-white rounded-xl p-2.5 border border-navy/10">
                  <span className="text-[10px] text-text/50 uppercase block font-semibold">Date $t$</span>
                  <span className="text-base font-bold text-navy">{time.toFixed(1)} min</span>
                </div>
                <div className="bg-white rounded-xl p-2.5 border border-navy/10">
                  <span className="text-[10px] text-text/50 uppercase block font-semibold">Avancement $x(t)$</span>
                  <span className="text-base font-bold text-turquoise">{currentX.toFixed(2)} mmol</span>
                  <span className="text-[9px] text-text/40 block">sur {xMax.toFixed(2)} mmol</span>
                </div>
                <div className="bg-white rounded-xl p-2.5 border border-navy/10">
                  <span className="text-[10px] text-text/50 uppercase block font-semibold">Vitesse $v(t)$</span>
                  <span className="text-base font-bold text-gold">{currentV.toFixed(3)}</span>
                  <span className="text-[8px] text-text/40 block">mmol·L⁻¹·min⁻¹</span>
                </div>
                <div className="bg-white rounded-xl p-2.5 border border-navy/10">
                  <span className="text-[10px] text-text/50 uppercase block font-semibold">Temps $t_{1/2}$</span>
                  <span className="text-base font-bold text-emerald-600">
                    {isFinite(tDemi) ? `${tDemi.toFixed(1)} min` : '∞'}
                  </span>
                  <span className="text-[8px] text-text/40 block">à $x = {(xMax / 2).toFixed(2)}$</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-navy/10 p-3 shadow-xs space-y-1">
              <div className="flex items-center justify-between text-xs font-semibold px-2">
                <span className="text-navy">Courbe Cinétique : $x = f(t)$ &amp; Tangente</span>
                <span className="text-gold font-bold text-[11px]">Pente de la tangente = Vitesse instantanée</span>
              </div>

              <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto">
                <defs>
                  <pattern id="gridCin1" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F1F5F9" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect x={pad.left} y={pad.top} width={graphW} height={graphH} fill="url(#gridCin1)" />

                <line
                  x1={pad.left}
                  y1={pad.top}
                  x2={pad.left + graphW}
                  y2={pad.top}
                  stroke="#94A3B8"
                  strokeDasharray="4 4"
                  strokeWidth="1.5"
                />
                <text x={pad.left + graphW - 5} y={pad.top - 5} textAnchor="end" className="text-[9px] fill-slate-500 font-bold">
                  x_max = {xMax.toFixed(2)} mmol
                </text>

                <line
                  x1={pad.left}
                  y1={pad.top + graphH / 2}
                  x2={pad.left + graphW}
                  y2={pad.top + graphH / 2}
                  stroke="#10B981"
                  strokeDasharray="3 3"
                  strokeWidth="1"
                />
                <text x={pad.left + 5} y={pad.top + graphH / 2 - 3} className="text-[8px] fill-emerald-600 font-bold">
                  x_max / 2
                </text>

                <line x1={pad.left} y1={pad.top + graphH} x2={pad.left + graphW} y2={pad.top + graphH} stroke="#1E293B" strokeWidth="2" />
                <line x1={pad.left} y1={pad.top} x2={pad.left} y2={pad.top + graphH} stroke="#1E293B" strokeWidth="2" />

                <text x={pad.left} y={pad.top + graphH + 15} textAnchor="middle" className="text-[8px] fill-slate-600">0</text>
                <text x={pad.left + graphW / 2} y={pad.top + graphH + 15} textAnchor="middle" className="text-[8px] fill-slate-600">12,5 min</text>
                <text x={pad.left + graphW} y={pad.top + graphH + 15} textAnchor="middle" className="text-[8px] fill-slate-600">25 min</text>

                <path d={pathD} fill="none" stroke="#00B8A9" strokeWidth="3" />
                <line x1={pAx} y1={pAy} x2={pBx} y2={pBy} stroke="#F6A000" strokeWidth="2.5" strokeDasharray="5 3" />
                <circle cx={curPx} cy={curPy} r="5" fill="#F6A000" stroke="#FFFFFF" strokeWidth="2" />
              </svg>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2 : SPECTROPHOTOMÈTRE */}
      {activeTab === 'spectro' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center bg-surface rounded-2xl p-5 border border-navy/10">
            <div className="md:col-span-7 flex flex-col items-center">
              <span className="text-xs font-bold text-navy mb-2">Spectrophotomètre UV-Visible de Paillasse</span>

              <svg viewBox="0 0 340 180" className="w-full max-w-sm drop-shadow-md">
                <rect x="20" y="20" width="300" height="140" rx="12" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />
                <rect x="25" y="25" width="290" height="20" rx="6" fill="#334155" />
                <circle cx="40" cy="35" r="4" fill="#EF4444" />
                <circle cx="55" cy="35" r="4" fill="#10B981" />
                <text x="170" y="38" textAnchor="middle" fill="#CBD5E1" fontSize="9" fontWeight="bold" letterSpacing="1">
                  SPECTRONIC 2026 • TERMINALE S2
                </text>

                <rect x="40" y="55" width="130" height="50" rx="6" fill="#064E3B" stroke="#047857" strokeWidth="2" />
                <text x="48" y="72" fill="#6EE7B7" fontSize="8" fontWeight="bold">λ = 450 nm (Bleu)</text>
                <text x="48" y="93" fill="#A7F3D0" fontSize="18" fontFamily="monospace" fontWeight="bold">
                  A = {currentA.toFixed(3)}
                </text>

                <rect x="200" y="55" width="90" height="85" rx="8" fill="#0F172A" stroke="#475569" strokeWidth="2" />
                <text x="245" y="70" textAnchor="middle" fill="#94A3B8" fontSize="8" fontWeight="bold">CUVE QUARTZ</text>

                <line x1="180" y1="100" x2="215" y2="100" stroke="#60A5FA" strokeWidth="4" opacity="0.9" />
                <polygon points="215,97 222,100 215,103" fill="#60A5FA" />

                <rect x="225" y="78" width="40" height="55" rx="4" fill={getIodineColor()} stroke="#E2E8F0" strokeWidth="2" />

                <line x1="265" y1="100" x2="285" y2="100" stroke="#60A5FA" strokeWidth={Math.max(1, 4 * (1 - ratio))} opacity="0.7" />
              </svg>
            </div>

            <div className="md:col-span-5 space-y-3">
              <div className="bg-white rounded-xl p-4 border border-navy/10 space-y-2">
                <span className="text-xs font-bold text-turquoise uppercase tracking-wider block">Loi de Beer-Lambert</span>
                <div className="text-sm font-semibold text-navy">
                  <MathRenderer content="$$A = \\varepsilon \\cdot \\ell \\cdot [I_2] = k \\cdot x(t)$$" />
                </div>
                <p className="text-xs text-text/70 leading-relaxed">
                  L&apos;absorbance $A$ est strictement proportionnelle à la concentration en diiode formé.
                  La vitesse volumique s’obtient directement par dérivation de $A$ :
                </p>
                <div className="bg-surface rounded-lg p-2 text-center text-xs font-bold text-navy">
                  <MathRenderer content="$$v(t) = \\frac{1}{\\varepsilon \\cdot \\ell \\cdot V} \\frac{dA}{dt}$$" />
                </div>
              </div>

              <div className="bg-amber-50 rounded-xl p-3 border border-amber-200 text-xs text-amber-900 space-y-1">
                <span className="font-bold flex items-center gap-1">
                  <span>💡</span> Avantage de la méthode :
                </span>
                <p>
                  Méthode physique <strong>continue et non destructive</strong> : nul besoin de prélever ni de détruire les échantillons avec une trempe !
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3 : TREMPE CHIMIQUE & DOSAGE À LA BURETTE */}
      {activeTab === 'trempe' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-6 bg-surface rounded-2xl p-5 border border-navy/10 flex flex-col items-center">
            <span className="text-xs font-bold text-navy mb-2">Montage de Dosage : Burette &amp; Erlenmeyer</span>

            <svg viewBox="0 0 220 280" className="w-52 h-64 drop-shadow">
              <rect x="25" y="250" width="170" height="15" rx="3" fill="#475569" />
              <rect x="45" y="15" width="8" height="235" fill="#64748B" />
              <rect x="45" y="70" width="55" height="6" fill="#334155" />
              <circle cx="100" cy="73" r="5" fill="#1E293B" />

              <rect x="95" y="10" width="14" height="150" fill="none" stroke="#94A3B8" strokeWidth="2" />
              <rect
                x="96"
                y={10 + (buretteVolume / 20) * 120}
                width="12"
                height={150 - (buretteVolume / 20) * 120}
                fill="rgba(224, 242, 254, 0.6)"
              />
              {[20, 50, 80, 110, 140].map((y, i) => (
                <g key={i}>
                  <line x1="95" y1={y} x2="102" y2={y} stroke="#64748B" strokeWidth="1" />
                  <text x="91" y={y + 3} textAnchor="end" fill="#64748B" fontSize="6">{i * 5} mL</text>
                </g>
              ))}
              <path d="M 97 160 L 107 160 L 102 170 Z" fill="#94A3B8" />
              <rect x="92" y="166" width="20" height="5" rx="2" fill="#2563EB" />
              <line x1="102" y1="171" x2="102" y2="182" stroke="#94A3B8" strokeWidth="2" />

              {isDosing && (
                <circle cx="102" cy="195" r="2.5" fill="#38BDF8" className="animate-bounce" />
              )}

              <path
                d="M 94 200 L 110 200 L 110 210 L 138 245 A 6 6 0 0 1 133 252 L 71 252 A 6 6 0 0 1 66 245 L 94 210 Z"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="2.5"
              />
              <path
                d="M 85 225 L 119 225 L 134 246 A 4 4 0 0 1 130 250 L 74 250 A 4 4 0 0 1 70 246 Z"
                fill={
                  isEquivalentReached
                    ? 'rgba(240, 248, 255, 0.4)'
                    : hasAmidon
                    ? '#1E1B4B'
                    : getIodineColor()
                }
              />
            </svg>

            <div className="mt-2 text-center space-y-1">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                isEquivalentReached
                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                  : 'bg-amber-100 text-amber-900 border border-amber-300'
              }`}>
                {isEquivalentReached ? '✓ Équivalence Atteinte ! Solution Décolorée' : 'En cours de titrage...'}
              </span>
              <p className="text-[11px] text-text/60">
                Volume versé : <span className="font-mono font-bold text-navy">{buretteVolume.toFixed(1)} mL</span> / $V_E = {vEquivalence.toFixed(1)}$ mL
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="bg-surface rounded-2xl p-4 border border-navy/10 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-navy">
                🧪 Protocole de Titrage du Diiode
              </h4>
              <p className="text-xs text-text/70 leading-relaxed">
                Réaction du dosage avec le thiosulfate de sodium :
              </p>
              <div className="bg-white rounded-xl p-2.5 border border-navy/10 text-xs font-bold text-center text-navy font-mono">
                I₂ + 2 S₂O₃²⁻ ⟶ 2 I⁻ + S₄O₆²⁻
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setIsDosing(!isDosing)}
                  disabled={buretteVolume >= 20}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold text-white transition-all ${
                    isDosing ? 'bg-amber-600 hover:bg-amber-700' : 'bg-turquoise hover:bg-turquoise/90'
                  }`}
                >
                  {isDosing ? '⏸ Stopper la burette' : '💧 Ouvrir le robinet de burette'}
                </button>
                <button
                  onClick={() => setBuretteVolume(0)}
                  className="px-3 py-2.5 rounded-xl border border-navy/20 text-navy hover:bg-white text-xs font-bold"
                >
                  Remplir
                </button>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-navy/10 text-xs">
                <span>Indicateur empois d&apos;amidon (bleu nuit) :</span>
                <button
                  onClick={() => setHasAmidon(!hasAmidon)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                    hasAmidon ? 'bg-indigo-600 text-white' : 'bg-navy/10 text-navy'
                  }`}
                >
                  {hasAmidon ? 'Présent' : 'Absent'}
                </button>
              </div>
            </div>

            <div className="bg-blue-50/80 rounded-2xl p-4 border border-blue-200 space-y-2">
              <span className="text-xs font-bold text-blue-900 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-blue-600" />
                Pourquoi la trempe est obligatoire avant le dosage ?
              </span>
              <p className="text-xs text-blue-950 leading-relaxed">
                Le dosage à la burette prend entre 1 et 3 minutes. Sans trempe dans l’eau glacée, la réaction continuerait dans l&apos;erlenmeyer pendant qu&apos;on verse la burette : le volume $V_E$ mesuré ne correspondrait plus du tout à la date $t$ du prélèvement !
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4 : LE PIÈGE D'OR DU CATALYSEUR & t1/2 */}
      {activeTab === 'catalyseur' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 bg-surface rounded-2xl p-4 border border-navy/10 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold px-2">
                <span className="text-navy">Comparaison : Avec vs Sans Catalyseur</span>
                <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  Même x_max final !
                </span>
              </div>

              <svg viewBox={`0 0 ${svgW} ${svgH}`} className="w-full h-auto bg-white rounded-xl border border-navy/10">
                <defs>
                  <pattern id="gridCat" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#F1F5F9" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect x={pad.left} y={pad.top} width={graphW} height={graphH} fill="url(#gridCat)" />

                <line
                  x1={pad.left}
                  y1={pad.top}
                  x2={pad.left + graphW}
                  y2={pad.top}
                  stroke="#E11D48"
                  strokeDasharray="4 4"
                  strokeWidth="2"
                />
                <text x={pad.left + graphW - 5} y={pad.top - 5} textAnchor="end" className="text-[10px] fill-rose-600 font-bold">
                  Même Asymptote x_max = {xMax.toFixed(2)} mmol
                </text>

                <line x1={pad.left} y1={pad.top + graphH} x2={pad.left + graphW} y2={pad.top + graphH} stroke="#1E293B" strokeWidth="2" />
                <line x1={pad.left} y1={pad.top} x2={pad.left} y2={pad.top + graphH} stroke="#1E293B" strokeWidth="2" />

                <path d={pathNoCat} fill="none" stroke="#2563EB" strokeWidth="2.5" />
                <path d={pathWithCat} fill="none" stroke="#10B981" strokeWidth="3" />

                <circle cx={pad.left + 15} cy={pad.top + 25} r="4" fill="#10B981" />
                <text x={pad.left + 25} y={pad.top + 28} fill="#065F46" fontSize="9" fontWeight="bold">
                  Avec Fe³⁺ (vitesse × 2,8 • t½ court)
                </text>

                <circle cx={pad.left + 15} cy={pad.top + 42} r="4" fill="#2563EB" />
                <text x={pad.left + 25} y={pad.top + 45} fill="#1E40AF" fontSize="9" fontWeight="bold">
                  Sans catalyseur (plus lente • t½ long)
                </text>
              </svg>
            </div>

            <div className="md:col-span-5 space-y-3">
              <div className="bg-rose-50/80 rounded-2xl p-4 border border-rose-200 space-y-2">
                <span className="text-xs font-bold text-rose-800 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  Piège N°1 de l’Office du Bac Sénégalais
                </span>
                <p className="text-xs text-rose-950 leading-relaxed">
                  L&apos;erreur fatale commise par beaucoup de candidats au Bac S2 : affirmer que le catalyseur augmente le rendement ou la quantité finale x_max.
                </p>
                <div className="p-2.5 rounded-xl bg-white border border-rose-200 text-xs font-bold text-rose-900">
                  ⚠️ Le catalyseur augmente la vitesse (pente plus forte) et divise le temps $t_{1/2}$, mais{' '}
                  <span className="underline decoration-rose-500 font-black">
                    x_max reste STRICTEMENT INCHANGÉ
                  </span>{' '}
                  !
                </div>
              </div>

              <div className="bg-amber-50/60 rounded-2xl border border-amber-200/60 p-4 space-y-1">
                <span className="text-xs font-bold text-amber-800 flex items-center gap-1">
                  <span>🗣️</span> En Wolof :
                </span>
                <p className="text-xs text-amber-900 leading-relaxed italic">
                  « Catalyseur dafa melni wassila buy gaawal yoon wi rekk. Du dolli mukk li ciy génn (x_max du soppiku). Xoolal ñaari courbes yi : dañuy tëdd ci même niveau bu jéxee ! »
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
