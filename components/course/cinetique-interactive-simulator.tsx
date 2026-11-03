'use client';

import React, { useState, useEffect } from 'react';
import StudyIcon from '@/components/ui/study-icon';
import MathRenderer from '@/components/course/math-renderer';

export default function CinetiqueInteractiveSimulator() {
  // Facteurs cinétiques configurables
  const [temperature, setTemperature] = useState<number>(25); // en °C (0 à 60)
  const [concentration, setConcentration] = useState<number>(0.05); // en mol/L (0.01 à 0.10)
  const [hasCatalyst, setHasCatalyst] = useState<boolean>(false);
  const [isTrempeActive, setIsTrempeActive] = useState<boolean>(false);

  // Animation temporelle
  const [currentTime, setCurrentTime] = useState<number>(0); // en minutes (0 à 25)
  const [isRunning, setIsRunning] = useState<boolean>(false);

  // Vitesse k globale dépendant des facteurs cinétiques (loi d'Arrhenius simplifiée)
  const kRate = isTrempeActive
    ? 0
    : (0.04 + (temperature / 50) * 0.12 + (concentration / 0.1) * 0.08) * (hasCatalyst ? 2.5 : 1.0);

  // Avancement maximal en mmol/L
  const xMax = concentration * 50; // ex: 2.5 mmol

  // Fonction d'avancement x(t) = xMax * (1 - exp(-k * t))
  const getX = (t: number) => {
    return xMax * (1 - Math.exp(-kRate * t));
  };

  // Vitesse de réaction v(t) = dx/dt = k * xMax * exp(-k * t)
  const getVitesse = (t: number) => {
    return isTrempeActive ? 0 : kRate * xMax * Math.exp(-kRate * t);
  };

  // Temps de demi-réaction t1/2 = ln(2) / k
  const tDemi = kRate > 0 ? Math.log(2) / kRate : Infinity;

  // Boucle de simulation d'animation
  useEffect(() => {
    let interval: any = null;
    if (isRunning && !isTrempeActive) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= 25) {
            setIsRunning(false);
            return 25;
          }
          return Math.round((prev + 0.25) * 100) / 100;
        });
      }, 80);
    }
    return () => clearInterval(interval);
  }, [isRunning, isTrempeActive]);

  // Valeurs calculées à l'instant t
  const currentX = getX(currentTime);
  const currentV = getVitesse(currentTime);
  const progressRatio = currentX / xMax; // 0 à 1

  // Couleur de la solution de diiode I2 (incolore -> jaune -> brun foncé)
  const getBeakerColor = () => {
    if (isTrempeActive) return 'rgba(180, 220, 240, 0.85)'; // Glace / Bleuté
    if (progressRatio < 0.05) return 'rgba(240, 245, 255, 0.4)'; // Incolore
    if (progressRatio < 0.3) return 'rgba(250, 204, 21, 0.65)'; // Jaune pâle
    if (progressRatio < 0.7) return 'rgba(217, 119, 6, 0.85)'; // Jaune orangé / ambré
    return 'rgba(120, 53, 15, 0.95)'; // Brun diiode foncé
  };

  // Points pour le tracé SVG de la courbe x(t)
  const svgWidth = 460;
  const svgHeight = 240;
  const padding = { top: 20, right: 25, bottom: 35, left: 45 };
  const graphW = svgWidth - padding.left - padding.right;
  const graphH = svgHeight - padding.top - padding.bottom;

  const pointsCount = 60;
  const pathD = Array.from({ length: pointsCount })
    .map((_, i) => {
      const t = (i / (pointsCount - 1)) * 25;
      const x = getX(t);
      const px = padding.left + (t / 25) * graphW;
      const py = padding.top + graphH - (x / xMax) * graphH;
      return `${i === 0 ? 'M' : 'L'} ${px.toFixed(1)} ${py.toFixed(1)}`;
    })
    .join(' ');

  // Coordonnées du point actuel sur la courbe
  const currentPx = padding.left + (currentTime / 25) * graphW;
  const currentPy = padding.top + graphH - (currentX / xMax) * graphH;

  // Tangente en ce point pour visualiser la vitesse volumique
  const tangentDt = 4;
  const t1 = Math.max(0, currentTime - tangentDt);
  const t2 = Math.min(25, currentTime + tangentDt);
  const x1 = currentX - currentV * (currentTime - t1);
  const x2 = currentX + currentV * (t2 - currentTime);
  const p1x = padding.left + (t1 / 25) * graphW;
  const p1y = padding.top + graphH - (Math.max(0, x1) / xMax) * graphH;
  const p2x = padding.left + (t2 / 25) * graphW;
  const p2y = padding.top + graphH - (Math.min(xMax * 1.2, x2) / xMax) * graphH;

  return (
    <div className="my-8 rounded-3xl border border-navy/15 bg-white p-4 sm:p-6 shadow-sm">
      {/* En-tête */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 font-black text-sm">
              ⚗️
            </span>
            <h3 className="text-base sm:text-lg font-black text-navy">
              Simulateur de Laboratoire : Facteurs Cinétiques &amp; Vitesse de Réaction
            </h3>
          </div>
          <p className="text-xs text-text/60 mt-1">
            Oxydation des ions iodure par le peroxodisulfate :{' '}
            <span className="font-mono text-navy font-bold">
              S₂O₈²⁻ + 2 I⁻ ⟶ 2 SO₄²⁻ + I₂ (brun)
            </span>
          </p>
        </div>
        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
          Terminale S2 • Chimie
        </span>
      </div>

      {/* Zone Interactive : Contrôles & Réacteur Virtuel */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Colonne de gauche : Paramètres & Facteurs cinétiques */}
        <div className="lg:col-span-5 space-y-4 rounded-2xl bg-surface p-4 border border-navy/8">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-black uppercase tracking-wider text-navy">
              🎛️ Facteurs Cinétiques
            </h4>
            <span className="text-[10px] text-text/60">Ajustez en temps réel</span>
          </div>

          {/* 1. Température */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-navy flex items-center gap-1">
                🌡️ Température ($T$) :
              </span>
              <span className={`font-mono font-black ${temperature === 0 ? 'text-blue-600' : temperature > 40 ? 'text-rose-600' : 'text-gold'}`}>
                {temperature} °C {temperature === 0 ? '(Bain de glace)' : ''}
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={60}
              step={5}
              value={temperature}
              disabled={isTrempeActive}
              onChange={(e) => setTemperature(Number(e.target.value))}
              className="w-full accent-gold cursor-pointer"
            />
            <div className="flex justify-between text-[9px] text-text/50">
              <span>0°C (Glace)</span>
              <span>25°C (Ambiante)</span>
              <span>60°C (Bain-marie)</span>
            </div>
          </div>

          {/* 2. Concentration initiale */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="font-bold text-navy flex items-center gap-1">
                🧪 Conc. $[I^-]_0$ :
              </span>
              <span className="font-mono font-black text-turquoise">
                {concentration.toFixed(2)} mol/L
              </span>
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
            <div className="flex justify-between text-[9px] text-text/50">
              <span>0,01 (Dilué)</span>
              <span>0,05 mol/L</span>
              <span>0,10 (Concentré)</span>
            </div>
          </div>

          {/* 3. Catalyseur */}
          <div className="flex items-center justify-between rounded-xl bg-white p-2.5 border border-navy/10">
            <div>
              <span className="text-xs font-bold text-navy block">⚡ Présence d&apos;un catalyseur (Fe²⁺)</span>
              <span className="text-[10px] text-text/50 block">Accélère sans modifier x_max</span>
            </div>
            <button
              onClick={() => setHasCatalyst(!hasCatalyst)}
              disabled={isTrempeActive}
              className={`px-3 py-1 rounded-lg text-xs font-black transition-all ${
                hasCatalyst
                  ? 'bg-emerald-500 text-white shadow-sm'
                  : 'bg-navy/10 text-navy hover:bg-navy/20'
              }`}
            >
              {hasCatalyst ? 'OUI (Actif)' : 'NON'}
            </button>
          </div>

          {/* 4. Bouton spécial Trempe Chimique */}
          <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-3 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-blue-900 flex items-center gap-1.5">
                ❄️ Action : Trempe Chimique
              </span>
              <button
                onClick={() => {
                  setIsTrempeActive(!isTrempeActive);
                  if (!isTrempeActive) setIsRunning(false);
                }}
                className={`px-2.5 py-1 rounded-md text-[11px] font-black transition-all ${
                  isTrempeActive
                    ? 'bg-blue-600 text-white animate-pulse'
                    : 'bg-white text-blue-700 border border-blue-300 hover:bg-blue-100'
                }`}
              >
                {isTrempeActive ? '🧊 Trempe Active (v = 0)' : 'Plonger dans la glace'}
              </button>
            </div>
            <p className="text-[10px] text-blue-800 leading-tight">
              {isTrempeActive
                ? '✓ Réaction brutalement figée ! L\'agitation thermique tombe à zéro : la vitesse est nulle. Indispensable au Bac S2 avant de procéder au dosage.'
                : 'Cliquez pour simuler l\'ajout d\'eau glacée afin de stopper net la réaction à l\'instant t.'}
            </p>
          </div>

          {/* Contrôles de lecture temporelle */}
          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={() => setIsRunning(!isRunning)}
              disabled={isTrempeActive || currentTime >= 25}
              className={`flex-1 py-2 rounded-xl text-xs font-black text-white transition-all shadow-md ${
                isRunning
                  ? 'bg-amber-600 hover:bg-amber-700'
                  : 'bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50'
              }`}
            >
              {isRunning ? '⏸ Pause Réaction' : currentTime >= 25 ? '✓ Fin de réaction' : '▶ Démarrer la réaction'}
            </button>
            <button
              onClick={() => {
                setCurrentTime(0);
                setIsRunning(false);
                setIsTrempeActive(false);
              }}
              className="px-3 py-2 rounded-xl border border-navy/20 text-xs font-bold text-navy hover:bg-surface"
            >
              ↺ Reset
            </button>
          </div>
        </div>

        {/* Colonne de droite : Bécher réactionnel & Graphique x(t) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Bécher et métriques en temps réel */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center rounded-2xl bg-navy/5 p-4 border border-navy/10">
            {/* Bécher SVG interactif */}
            <div className="sm:col-span-4 flex flex-col items-center justify-center">
              <span className="text-[11px] font-bold text-navy mb-1">Mélange Réactionnel</span>
              <div className="relative w-24 h-32 rounded-b-3xl border-4 border-t-0 border-slate-400 bg-white shadow-inner flex flex-col justify-end overflow-hidden">
                {/* Niveau du liquide avec couleur variable */}
                <div
                  className="w-full transition-all duration-300 relative flex items-center justify-center"
                  style={{
                    height: '75%',
                    backgroundColor: getBeakerColor(),
                  }}
                >
                  {/* Bulles d'agitation thermique */}
                  {isRunning && !isTrempeActive && (
                    <div className="absolute inset-0 flex justify-around items-end pb-2 opacity-50">
                      <span className="h-1.5 w-1.5 rounded-full bg-white animate-ping" />
                      <span className="h-2 w-2 rounded-full bg-white animate-bounce" />
                      <span className="h-1 w-1 rounded-full bg-white animate-ping" />
                    </div>
                  )}
                  {isTrempeActive && (
                    <span className="text-[10px] font-black text-blue-900 bg-white/80 px-1 rounded">
                      FIGÉ ❄️
                    </span>
                  )}
                </div>
                {/* Graduations bécher */}
                <div className="absolute left-1 top-6 space-y-3 pointer-events-none opacity-40">
                  <div className="h-0.5 w-3 bg-slate-700" />
                  <div className="h-0.5 w-2 bg-slate-700" />
                  <div className="h-0.5 w-3 bg-slate-700" />
                  <div className="h-0.5 w-2 bg-slate-700" />
                </div>
              </div>
              <span className="text-[10px] font-mono text-text/70 mt-1">
                {progressRatio < 0.05
                  ? 'Incolore (t = 0)'
                  : progressRatio < 0.5
                  ? 'Jaune (I₂ naissant)'
                  : 'Brun foncé (I₂ formé)'}
              </span>
            </div>

            {/* Métriques numériques calculées */}
            <div className="sm:col-span-8 grid grid-cols-2 gap-2 text-center">
              <div className="rounded-xl bg-white p-2.5 border border-navy/10 shadow-xs">
                <span className="text-[10px] text-text/50 uppercase block font-semibold">Temps Écoulé</span>
                <span className="text-lg font-black text-navy">{currentTime.toFixed(1)} min</span>
              </div>
              <div className="rounded-xl bg-white p-2.5 border border-navy/10 shadow-xs">
                <span className="text-[10px] text-text/50 uppercase block font-semibold">Avancement $x(t)$</span>
                <span className="text-lg font-black text-turquoise">{currentX.toFixed(2)} mmol</span>
                <span className="text-[9px] text-text/50 block">sur {xMax.toFixed(2)} mmol</span>
              </div>
              <div className="rounded-xl bg-white p-2.5 border border-navy/10 shadow-xs">
                <span className="text-[10px] text-text/50 uppercase block font-semibold">Vitesse Volumique</span>
                <span className="text-base font-black text-gold">{currentV.toFixed(3)}</span>
                <span className="text-[9px] text-text/50 block">mmol · L⁻¹ · min⁻¹</span>
              </div>
              <div className="rounded-xl bg-white p-2.5 border border-navy/10 shadow-xs">
                <span className="text-[10px] text-text/50 uppercase block font-semibold">Temps $t_{1/2}$</span>
                <span className="text-base font-black text-emerald-600">
                  {isFinite(tDemi) ? `${tDemi.toFixed(1)} min` : '∞ (Trempe)'}
                </span>
                <span className="text-[9px] text-text/50 block">$x(t_{1/2}) = {(xMax / 2).toFixed(2)}$ mmol</span>
              </div>
            </div>
          </div>

          {/* Graphique SVG dynamique x = f(t) */}
          <div className="rounded-2xl border border-navy/10 bg-white p-3 shadow-xs">
            <div className="flex items-center justify-between px-2 mb-1">
              <span className="text-xs font-black text-navy">
                Courbe Cinétique : Avancement $x = f(t)$ &amp; Tangente
              </span>
              <span className="text-[10px] text-gold font-bold">
                Pente de la tangente = Vitesse instantanée
              </span>
            </div>

            <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto">
              {/* Fond de grille */}
              <defs>
                <pattern id="gridCinetique" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#f1f5f9" strokeWidth="1" />
                </pattern>
              </defs>
              <rect
                x={padding.left}
                y={padding.top}
                width={graphW}
                height={graphH}
                fill="url(#gridCinetique)"
              />

              {/* Ligne asymptote horizontale xMax */}
              <line
                x1={padding.left}
                y1={padding.top}
                x2={padding.left + graphW}
                y2={padding.top}
                stroke="#94a3b8"
                strokeDasharray="4 4"
                strokeWidth="1.5"
              />
              <text
                x={padding.left + graphW - 5}
                y={padding.top - 5}
                textAnchor="end"
                className="text-[10px] fill-slate-500 font-bold font-mono"
              >
                x_max = {xMax.toFixed(2)} mmol
              </text>

              {/* Ligne xMax / 2 (pour t1/2) */}
              <line
                x1={padding.left}
                y1={padding.top + graphH / 2}
                x2={padding.left + graphW}
                y2={padding.top + graphH / 2}
                stroke="#10b981"
                strokeDasharray="3 3"
                strokeWidth="1"
              />
              <text
                x={padding.left + 5}
                y={padding.top + graphH / 2 - 4}
                className="text-[9px] fill-emerald-600 font-bold"
              >
                x_max / 2
              </text>

              {/* Axes Ox et Oy */}
              <line
                x1={padding.left}
                y1={padding.top + graphH}
                x2={padding.left + graphW}
                y2={padding.top + graphH}
                stroke="#1e293b"
                strokeWidth="2"
              />
              <line
                x1={padding.left}
                y1={padding.top}
                x2={padding.left}
                y2={padding.top + graphH}
                stroke="#1e293b"
                strokeWidth="2"
              />

              {/* Graduations axes */}
              <text x={padding.left} y={padding.top + graphH + 18} textAnchor="middle" className="text-[9px] fill-slate-600">0</text>
              <text x={padding.left + graphW / 2} y={padding.top + graphH + 18} textAnchor="middle" className="text-[9px] fill-slate-600">12,5 min</text>
              <text x={padding.left + graphW} y={padding.top + graphH + 18} textAnchor="middle" className="text-[9px] fill-slate-600">25 min</text>

              {/* Tracé de la courbe x(t) */}
              <path d={pathD} fill="none" stroke="#00B8A9" strokeWidth="3" />

              {/* Tracé de la tangente au point courant */}
              <line
                x1={p1x}
                y1={p1y}
                x2={p2x}
                y2={p2y}
                stroke="#F6A000"
                strokeWidth="2.5"
                strokeDasharray="5 3"
              />

              {/* Point courant mobile */}
              <circle cx={currentPx} cy={currentPy} r="6" fill="#F6A000" stroke="#fff" strokeWidth="2" />
            </svg>
          </div>
        </div>
      </div>

      {/* Décryptage Wolof & Métaphores de la vie réelle */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Wolof */}
        <div className="rounded-2xl border border-gold/30 bg-gold-light/40 p-4 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-black text-[#8A5A00]">
            <StudyIcon name="ampoule_astuce" size={16} />
            <span>Xam-xam ci Wolof : Safara ak Ndoxum Galaas</span>
          </div>
          <p className="text-xs text-navy/85 leading-relaxed">
            « Cinétique chimique dafa melni <strong>toggu ceebu jën</strong> : bu safara gi tàngée lool (température bu yéeg),
            molécule yi dañuy gaaw a daccante ba togg bi gaaw a ñor. Bu réactifs yi baree ci ndox mi (concentration),
            foule bi day xat naka <strong>marché Sandaga</strong> veille fête, nit ñi dañuy fexee daccante !
            Bu ñu ko dëppee ci ndoxum galaas (<strong>trempe chimique</strong>), réaction bi day taxaw cak ngir ñu mën ko dose ! »
          </p>
        </div>

        {/* Réflexe Bac */}
        <div className="rounded-2xl border border-emerald-500/30 bg-emerald-50/60 p-4 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-black text-emerald-800">
            <StudyIcon name="cible_reflexe" size={16} />
            <span>Le Réflexe Clé au Baccalauréat Sénégalais</span>
          </div>
          <p className="text-xs text-emerald-950 leading-relaxed">
            Au Bac S2, retenez les 2 lois absolues :
            <br />
            1. <strong>La vitesse volumique diminue toujours au cours du temps</strong> car les réactifs disparaissent (la pente de la tangente s&apos;aplatit).
            <br />
            2. <strong>Le catalyseur augmente la vitesse</strong> (la pente initiale est plus raide), mais il ne change <strong>JAMAIS</strong> l&apos;avancement maximal final x_max !
          </p>
        </div>
      </div>
    </div>
  );
}

