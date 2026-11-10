'use client';

import React, { useState, useEffect, useRef } from 'react';
import MathRenderer from '@/components/course/math-renderer';
import {
  Zap,
  Magnet,
  Filter,
  Layers,
  Sliders,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Info,
  Sparkles,
} from 'lucide-react';

type AtelierP4 = 'deviation_e' | 'deviation_b' | 'selecteur_wien' | 'spectrometre';

// ============================================================
// ATELIER 1 : DÉVIATION ÉLECTROSTATIQUE DANS UN CONDENSATEUR
// ============================================================
function AtelierDeviationE() {
  const [U, setU] = useState(200); // Volts
  const [d, setD] = useState(0.04); // mètres (4 cm)
  const [L, setL] = useState(0.08); // mètres (8 cm)
  const [v0KmS, setV0KmS] = useState(2000); // km/s (ex: électron)
  const [distEcran, setDistEcran] = useState(0.20); // mètres (20 cm du centre)
  const [particule, setParticule] = useState<'electron' | 'proton'>('electron');
  const [isAnimating, setIsAnimating] = useState(false);
  const [animProgress, setAnimProgress] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number | null>(null);

  // Constantes physiques
  const eCharge = 1.6e-19; // Coulomb
  const mElectron = 9.1e-31; // kg
  const mProton = 1.67e-27; // kg

  const q = particule === 'electron' ? -eCharge : eCharge;
  const m = particule === 'electron' ? mElectron : mProton;
  const v0 = v0KmS * 1000; // m/s

  // Champ électrique E = U / d (orienté vers les potentiels décroissants)
  const E = U / d; // V/m
  const ay = (q * E) / m; // m/s²
  const tSortie = L / v0; // s
  const ySortie = 0.5 * ay * tSortie * tSortie; // m
  const vySortie = ay * tSortie;
  const tanAlpha = vySortie / v0;
  const alphaDeg = (Math.atan(tanAlpha) * 180) / Math.PI;

  // Déviation sur l'écran Y (distance D par rapport au centre des plaques)
  const D = distEcran;
  const Y = D * tanAlpha; // m
  const Ycm = Y * 100; // cm

  // Condition d'émergence sans heurter les plaques (|y(L)| < d / 2)
  const heurtePlaque = Math.abs(ySortie) >= d / 2;

  // Animation
  useEffect(() => {
    if (isAnimating) {
      let start: number | null = null;
      const duration = 1200;
      const step = (ts: number) => {
        if (!start) start = ts;
        const progress = Math.min((ts - start) / duration, 1);
        setAnimProgress(progress);
        if (progress < 1) {
          animRef.current = requestAnimationFrame(step);
        } else {
          setIsAnimating(false);
          setAnimProgress(0);
        }
      };
      animRef.current = requestAnimationFrame(step);
    } else {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    }
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isAnimating]);

  // Tracé Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Fond blanc pur
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);

    const midY = H / 2;
    const startX = 40;
    const plaqueL = 140;
    const ecranX = W - 35;
    const plaqueH = 60;

    // Plaque supérieure (+)
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(startX, midY - plaqueH, plaqueL, 8);
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('+ + + + + + + + + (Plaque A)', startX + plaqueL / 2, midY - plaqueH - 6);

    // Plaque inférieure (-)
    ctx.fillStyle = '#e2e8f0';
    ctx.fillRect(startX, midY + plaqueH - 8, plaqueL, 8);
    ctx.fillStyle = '#3b82f6';
    ctx.fillText('- - - - - - - - - (Plaque B)', startX + plaqueL / 2, midY + plaqueH + 16);

    // Flèches du champ E (vertical descendant car VA > VB)
    ctx.strokeStyle = '#cbd5e1';
    ctx.fillStyle = '#94a3b8';
    for (let i = 1; i <= 4; i++) {
      const fx = startX + (i / 5) * plaqueL;
      ctx.beginPath();
      ctx.moveTo(fx, midY - plaqueH + 12);
      ctx.lineTo(fx, midY + plaqueH - 14);
      ctx.stroke();
      // pointe
      ctx.beginPath();
      ctx.moveTo(fx, midY + plaqueH - 14);
      ctx.lineTo(fx - 3, midY + plaqueH - 20);
      ctx.lineTo(fx + 3, midY + plaqueH - 20);
      ctx.closePath();
      ctx.fill();
    }
    ctx.fillStyle = '#64748b';
    ctx.font = '10px sans-serif';
    ctx.fillText('E = U / d', startX + plaqueL / 2, midY - 5);

    // Axe optique Ox (pointillés)
    ctx.strokeStyle = '#94a3b8';
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(10, midY);
    ctx.lineTo(ecranX, midY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Écran fluorescent
    ctx.fillStyle = '#334155';
    ctx.fillRect(ecranX, 20, 6, H - 40);
    ctx.fillStyle = '#64748b';
    ctx.font = '10px sans-serif';
    ctx.fillText('Écran', ecranX + 3, 14);

    // Trajectoire de la particule
    // Échelle visuelle pour y : plaqueH correspond à d/2
    const scaleY = (plaqueH - 10) / (d / 2);
    const scaleX = plaqueL / L;

    ctx.strokeStyle = '#00B8A9';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(startX, midY);

    const steps = 40;
    let lastX = startX;
    let lastY = midY;

    for (let i = 0; i <= steps; i++) {
      const xReal = (i / steps) * L;
      const t = xReal / v0;
      const yReal = 0.5 * ay * t * t;
      const cx = startX + xReal * scaleX;
      // Remarque : dans le canvas y est vers le bas.
      // Si q < 0 (électron), ay < 0 donc l'électron monte vers la plaque positive -> - yReal
      const cy = midY - yReal * scaleY;

      // Arrêt si heurt
      if (Math.abs(yReal) >= d / 2 && i > 0) {
        ctx.lineTo(cx, cy);
        lastX = cx;
        lastY = cy;
        break;
      }

      ctx.lineTo(cx, cy);
      lastX = cx;
      lastY = cy;
    }
    ctx.stroke();

    // Ligne droite de sortie jusqu'à l'écran si non heurté
    if (!heurtePlaque) {
      const yScreenReal = Y;
      const cScreenY = midY - yScreenReal * scaleY;

      ctx.strokeStyle = '#00B8A9';
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(ecranX, cScreenY);
      ctx.stroke();
      ctx.setLineDash([]);

      // Spot lumineux sur l'écran
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(ecranX + 3, cScreenY, 5, 0, 2 * Math.PI);
      ctx.fill();

      // Flèche déviation Y
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(ecranX + 16, midY);
      ctx.lineTo(ecranX + 16, cScreenY);
      ctx.stroke();
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(`Y = ${Ycm.toFixed(2)} cm`, ecranX + 22, (midY + cScreenY) / 2 + 4);
    } else {
      // Impact sur armature
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(lastX, lastY, 6, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = '#dc2626';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('💥 Heurt Armature !', lastX, lastY > midY ? lastY + 18 : lastY - 10);
    }

    // Balle animée
    if (isAnimating || animProgress > 0) {
      let bx = startX;
      let by = midY;
      if (animProgress <= 0.5) {
        // Dans le condensateur
        const pIn = animProgress / 0.5;
        const xReal = pIn * L;
        const t = xReal / v0;
        const yReal = 0.5 * ay * t * t;
        bx = startX + xReal * scaleX;
        by = midY - yReal * scaleY;
      } else if (!heurtePlaque) {
        // Hors condensateur
        const pOut = (animProgress - 0.5) / 0.5;
        const startOutX = startX + plaqueL;
        const startOutY = midY - ySortie * scaleY;
        const endOutY = midY - Y * scaleY;
        bx = startOutX + pOut * (ecranX - startOutX);
        by = startOutOutY(pOut, startOutY, endOutY);
      }
      ctx.fillStyle = particule === 'electron' ? '#3b82f6' : '#ef4444';
      ctx.beginPath();
      ctx.arc(bx, by, 6, 0, 2 * Math.PI);
      ctx.fill();
    }

    function startOutOutY(p: number, y1: number, y2: number) {
      return y1 + p * (y2 - y1);
    }
  }, [U, d, L, v0KmS, distEcran, particule, ay, ySortie, Y, Ycm, heurtePlaque, isAnimating, animProgress, v0]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Sliders & Contrôles */}
        <div className="bg-surface/50 border border-navy/10 rounded-2xl p-5 space-y-3.5">
          <h4 className="font-bold text-navy flex items-center gap-2 text-sm">
            <Sliders className="w-4 h-4 text-turquoise" /> Paramètres du Condensateur
          </h4>

          {/* Choix particule */}
          <div className="flex gap-2">
            <button
              onClick={() => setParticule('electron')}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                particule === 'electron'
                  ? 'bg-navy text-white shadow-xs'
                  : 'bg-white border border-navy/10 text-text/80'
              }`}
            >
              Électron (q = -e)
            </button>
            <button
              onClick={() => setParticule('proton')}
              className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                particule === 'proton'
                  ? 'bg-navy text-white shadow-xs'
                  : 'bg-white border border-navy/10 text-text/80'
              }`}
            >
              Proton (q = +e)
            </button>
          </div>

          {[
            {
              label: 'Tension U',
              min: 50,
              max: 600,
              step: 10,
              value: U,
              set: setU,
              unit: 'V',
              color: 'text-rose-600',
            },
            {
              label: 'Distance d',
              min: 0.02,
              max: 0.08,
              step: 0.005,
              value: d,
              set: setD,
              unit: 'm',
              color: 'text-purple-600',
            },
            {
              label: 'Longueur L',
              min: 0.04,
              max: 0.12,
              step: 0.01,
              value: L,
              set: setL,
              unit: 'm',
              color: 'text-amber-600',
            },
            {
              label: 'Vitesse v₀',
              min: 1000,
              max: 5000,
              step: 100,
              value: v0KmS,
              set: setV0KmS,
              unit: 'km/s',
              color: 'text-turquoise',
            },
          ].map((s) => (
            <div key={s.label}>
              <div className="text-xs text-text/80 flex justify-between font-medium mb-1">
                <span>{s.label}</span>
                <span className={`font-mono font-bold ${s.color}`}>
                  {s.value} {s.unit}
                </span>
              </div>
              <input
                type="range"
                min={s.min}
                max={s.max}
                step={s.step}
                value={s.value}
                onChange={(e) => s.set(Number(e.target.value))}
                className="w-full accent-navy"
              />
            </div>
          ))}

          <div className="flex gap-2 pt-1">
            <button
              onClick={() => setIsAnimating(true)}
              className="flex-1 flex items-center justify-center gap-1.5 bg-turquoise hover:bg-turquoise-hover text-white rounded-xl py-2.5 text-xs font-bold transition-all shadow-sm"
            >
              <Play className="w-4 h-4" /> Tirer la particule
            </button>
            <button
              onClick={() => {
                setU(200);
                setD(0.04);
                setL(0.08);
                setV0KmS(2000);
                setIsAnimating(false);
              }}
              className="flex items-center justify-center bg-white hover:bg-surface border border-navy/10 text-navy rounded-xl px-3 py-2.5 text-xs transition-all shadow-sm"
              title="Réinitialiser"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Canvas de visualisation */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-navy/10 p-3 flex items-center justify-center shadow-sm">
          <canvas ref={canvasRef} width={520} height={280} className="w-full max-w-[520px] h-auto" />
        </div>
      </div>

      {/* Cartes de résultats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-amber-50/80 rounded-2xl p-3.5 border border-amber-200">
          <div className="text-xs text-amber-800 font-semibold">Champ Électrique E</div>
          <div className="text-xl font-bold text-amber-900 mt-1">{(U / d).toFixed(0)} V/m</div>
        </div>
        <div className="bg-purple-50/80 rounded-2xl p-3.5 border border-purple-200">
          <div className="text-xs text-purple-800 font-semibold">Déviation Angulaire α</div>
          <div className="text-xl font-bold text-purple-900 mt-1">{alphaDeg.toFixed(2)}°</div>
        </div>
        <div className="bg-rose-50/80 rounded-2xl p-3.5 border border-rose-200">
          <div className="text-xs text-rose-800 font-semibold">Sortie y(L)</div>
          <div className="text-xl font-bold text-rose-900 mt-1">
            {(Math.abs(ySortie) * 100).toFixed(2)} cm
          </div>
        </div>
        <div
          className={`rounded-2xl p-3.5 border ${
            heurtePlaque ? 'bg-rose-100 border-rose-300' : 'bg-emerald-50/80 border-emerald-200'
          }`}
        >
          <div
            className={`text-xs font-semibold ${
              heurtePlaque ? 'text-rose-800' : 'text-emerald-800'
            }`}
          >
            Déviation Écran Y
          </div>
          <div
            className={`text-xl font-bold mt-1 ${
              heurtePlaque ? 'text-rose-900' : 'text-emerald-900'
            }`}
          >
            {heurtePlaque ? 'Heurt' : `${Ycm.toFixed(2)} cm`}
          </div>
        </div>
      </div>

      {/* Équation détaillée */}
      <div className="bg-white rounded-2xl border border-navy/10 p-4 text-center shadow-sm space-y-1">
        <span className="text-[10px] text-text/50 font-bold uppercase tracking-wider block">
          Formule de la Déviation Linéaire sur l&apos;Écran
        </span>
        <MathRenderer
          content={`$$Y = D\\,\\tan\\alpha = \\frac{|q|\\,U\\,L\\,D}{m\\,d\\,v_0^2} = \\mathbf{${
            heurtePlaque ? '\\text{Collision avec armature}' : `${Ycm.toFixed(2)}\\text{ cm}`
          }}$$`}
        />
        <div className="text-xs text-text/60 mt-1">
          Sensibilité de déflexion de l&apos;oscilloscope : proportionnalité parfaite avec la tension U.
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ATELIER 2 : DÉVIATION MAGNÉTIQUE (FORCE DE LORENTZ DANS B)
// ============================================================
function AtelierDeviationB() {
  const [BmT, setBmT] = useState(50); // Champ B en millitesla (50 mT)
  const [v0KmS, setV0KmS] = useState(3000); // km/s
  const [ionType, setIonType] = useState<'proton' | 'alpha' | 'electron'>('proton');

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Constantes
  const eCharge = 1.6e-19;
  const mProton = 1.67e-27;
  const mAlpha = 6.64e-27;
  const mElectron = 9.1e-31;

  let q = eCharge;
  let m = mProton;
  let ionNom = 'Proton (¹H⁺)';

  if (ionType === 'alpha') {
    q = 2 * eCharge;
    m = mAlpha;
    ionNom = 'Particule α (⁴He²⁺)';
  } else if (ionType === 'electron') {
    q = -eCharge;
    m = mElectron;
    ionNom = 'Électron (e⁻)';
  }

  const B = BmT / 1000; // Tesla
  const v0 = v0KmS * 1000; // m/s

  // Rayon R = m*v / (|q|*B)
  const R = (m * v0) / (Math.abs(q) * B); // m
  const Rcm = R * 100; // cm
  const T = (2 * Math.PI * m) / (Math.abs(q) * B); // s
  const Tns = T * 1e9; // nanosecondes
  const freqMHz = 1 / (T * 1e6); // MHz

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);

    // Zone de champ B uniforme (rectangle teinté clair)
    const bZoneX = 140;
    const bZoneW = W - 160;
    ctx.fillStyle = '#f0fdf4';
    ctx.fillRect(bZoneX, 20, bZoneW, H - 40);
    ctx.strokeStyle = '#bbf7d0';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(bZoneX, 20, bZoneW, H - 40);

    // Symboles ⊗ pour B entrant
    ctx.fillStyle = '#16a34a';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    for (let r = 50; r < H - 40; r += 45) {
      for (let c = bZoneX + 35; c < bZoneX + bZoneW - 20; c += 45) {
        ctx.fillText('⊗', c, r);
      }
    }
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText(`Zone de Champ B = ${BmT} mT (Entrant ⊗)`, bZoneX + bZoneW / 2, 40);

    // Point d'entrée O
    const ox = bZoneX;
    const oy = H / 2;

    // Trajectoire rectiligne avant d'entrer
    ctx.strokeStyle = '#243447';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(30, oy);
    ctx.lineTo(ox, oy);
    ctx.stroke();

    // Flèche v0
    ctx.fillStyle = '#00B8A9';
    ctx.beginPath();
    ctx.arc(ox - 10, oy, 4, 0, 2 * Math.PI);
    ctx.fill();

    // Tracé de l'arc de cercle dans B
    // Si B est entrant ⊗ et q > 0 : v vers la droite, q*v vers la droite, B vers l'intérieur.
    // Main droite : pouce q*v (droite), index B (entrant) -> majeur F vers le haut !
    // Donc la particule tourne vers le haut si q > 0, vers le bas si q < 0.
    const sensHaut = q > 0;
    const scaleR = Math.min(100 / Math.max(R, 0.01), 160);
    const rPix = Math.min(Math.max(R * scaleR, 30), (H - 50) / 2);

    const centreX = ox;
    const centreY = sensHaut ? oy - rPix : oy + rPix;

    ctx.strokeStyle = '#00B8A9';
    ctx.lineWidth = 3;
    ctx.beginPath();
    if (sensHaut) {
      ctx.arc(centreX, centreY, rPix, Math.PI / 2, 0, true);
    } else {
      ctx.arc(centreX, centreY, rPix, -Math.PI / 2, 0, false);
    }
    ctx.stroke();

    // Centre C
    ctx.fillStyle = '#ea580c';
    ctx.beginPath();
    ctx.arc(centreX, centreY, 4, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#ea580c';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('C (Centre)', centreX + 10, sensHaut ? centreY - 6 : centreY + 12);

    // Rayon R (pointillés)
    ctx.strokeStyle = '#ea580c';
    ctx.setLineDash([3, 3]);
    ctx.beginPath();
    ctx.moveTo(centreX, centreY);
    ctx.lineTo(ox, oy);
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = '#ea580c';
    ctx.fillText(`R = ${Rcm.toFixed(1)} cm`, centreX - 25, (centreY + oy) / 2);

    // Vecteur force centripète Fm
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(ox, oy);
    ctx.lineTo(ox, sensHaut ? oy - 35 : oy + 35);
    ctx.stroke();
    ctx.fillStyle = '#ef4444';
    ctx.fillText('Fm = q v ∧ B', ox - 35, sensHaut ? oy - 20 : oy + 25);
  }, [BmT, v0KmS, ionType, R, Rcm, q]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Sliders */}
        <div className="bg-surface/50 border border-navy/10 rounded-2xl p-5 space-y-4">
          <h4 className="font-bold text-navy flex items-center gap-2 text-sm">
            <Magnet className="w-4 h-4 text-purple-600" /> Paramètres du Champ Magnétique
          </h4>

          {/* Choix ion */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-text/70">Nature de la particule :</span>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'proton', label: 'Proton ¹H⁺' },
                { id: 'alpha', label: 'Particule α' },
                { id: 'electron', label: 'Électron e⁻' },
              ].map((p) => (
                <button
                  key={p.id}
                  onClick={() => setIonType(p.id as any)}
                  className={`py-1.5 px-1 rounded-xl text-[11px] font-bold truncate transition-all ${
                    ionType === p.id
                      ? 'bg-navy text-white shadow-xs'
                      : 'bg-white border border-navy/10 text-text/80'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs text-text/80 flex justify-between font-medium mb-1">
              <span>Champ magnétique B</span>
              <span className="font-mono text-purple-600 font-bold">{BmT} mT</span>
            </div>
            <input
              type="range"
              min={10}
              max={200}
              step={5}
              value={BmT}
              onChange={(e) => setBmT(Number(e.target.value))}
              className="w-full accent-purple-600"
            />
          </div>

          <div>
            <div className="text-xs text-text/80 flex justify-between font-medium mb-1">
              <span>Vitesse initiale v₀</span>
              <span className="font-mono text-turquoise font-bold">{v0KmS} km/s</span>
            </div>
            <input
              type="range"
              min={500}
              max={6000}
              step={100}
              value={v0KmS}
              onChange={(e) => setV0KmS(Number(e.target.value))}
              className="w-full accent-turquoise"
            />
          </div>

          <div className="p-3 bg-white rounded-xl border border-navy/10 text-xs text-text/80 space-y-1">
            <div className="font-bold text-navy flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Propriété Cyclotron
            </div>
            <div>
              La période <strong className="font-mono text-navy">T = {Tns.toFixed(2)} ns</strong> est
              strictement indépendante de la vitesse !
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-navy/10 p-3 flex items-center justify-center shadow-sm">
          <canvas ref={canvasRef} width={520} height={280} className="w-full max-w-[520px] h-auto" />
        </div>
      </div>

      {/* Cartes résultats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-amber-50/80 rounded-2xl p-3.5 border border-amber-200">
          <div className="text-xs text-amber-800 font-semibold">Rayon de Courbure R</div>
          <div className="text-xl font-bold text-amber-900 mt-1">{Rcm.toFixed(2)} cm</div>
        </div>
        <div className="bg-purple-50/80 rounded-2xl p-3.5 border border-purple-200">
          <div className="text-xs text-purple-800 font-semibold">Période Cyclotron T</div>
          <div className="text-xl font-bold text-purple-900 mt-1">{Tns.toFixed(2)} ns</div>
        </div>
        <div className="bg-rose-50/80 rounded-2xl p-3.5 border border-rose-200">
          <div className="text-xs text-rose-800 font-semibold">Fréquence Cyclotron f</div>
          <div className="text-xl font-bold text-rose-900 mt-1">{freqMHz.toFixed(2)} MHz</div>
        </div>
        <div className="bg-emerald-50/80 rounded-2xl p-3.5 border border-emerald-200">
          <div className="text-xs text-emerald-800 font-semibold">Vitesse Norme |v|</div>
          <div className="text-xl font-bold text-emerald-900 mt-1">Constante (W=0)</div>
        </div>
      </div>

      {/* Équation détaillée */}
      <div className="bg-white rounded-2xl border border-navy/10 p-4 text-center shadow-sm space-y-1">
        <span className="text-[10px] text-text/50 font-bold uppercase tracking-wider block">
          Loi du Rayon de Courbure dans un Champ Magnétique
        </span>
        <MathRenderer
          content={`$$R = \\frac{m\\,v}{|q|\\,B} = \\frac{${m.toExponential(
            2
          )} \\times ${(v0).toExponential(2)}}{${Math.abs(q).toExponential(2)} \\times ${B.toFixed(
            3
          )}} = \\mathbf{${Rcm.toFixed(2)}\\text{ cm}}$$`}
        />
      </div>
    </div>
  );
}

// ============================================================
// ATELIER 3 : SÉLECTEUR DE VITESSES DE WIEN (CHAMPS CROISÉS)
// ============================================================
function AtelierSelecteurWien() {
  const [E_kV, setE_kV] = useState(50); // kV/m (50 kV/m)
  const [B_mT, setB_mT] = useState(100); // mT (100 mT)
  const [vParticuleKmS, setVParticuleKmS] = useState(500); // km/s

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const E = E_kV * 1000; // V/m
  const B = B_mT / 1000; // T
  const vSelected = E / B; // m/s
  const vSelectedKmS = vSelected / 1000;

  const vParticule = vParticuleKmS * 1000; // m/s
  const diffPercent = ((vParticule - vSelected) / vSelected) * 100;

  const isSelected = Math.abs(diffPercent) < 4;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);

    const midY = H / 2;
    const fenteInX = 60;
    const fenteOutX = W - 70;
    const zoneW = fenteOutX - fenteInX;

    // Chambre à champs croisés
    ctx.fillStyle = '#f8fafc';
    ctx.fillRect(fenteInX, 35, zoneW, H - 70);
    ctx.strokeStyle = '#cbd5e1';
    ctx.strokeRect(fenteInX, 35, zoneW, H - 70);

    // Plaques électriques
    ctx.fillStyle = '#fee2e2';
    ctx.fillRect(fenteInX, 35, zoneW, 8);
    ctx.fillStyle = '#dbeafe';
    ctx.fillRect(fenteInX, H - 43, zoneW, 8);

    // Flèches E (descendant)
    ctx.fillStyle = '#94a3b8';
    ctx.strokeStyle = '#cbd5e1';
    for (let x = fenteInX + 35; x < fenteOutX; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 48);
      ctx.lineTo(x, H - 48);
      ctx.stroke();
    }
    ctx.font = '10px sans-serif';
    ctx.fillText('E (Descendant)', fenteInX + 50, 60);

    // Champ B (entrant ⊗)
    ctx.fillStyle = '#16a34a';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    for (let x = fenteInX + 35; x < fenteOutX; x += 40) {
      ctx.fillText('⊗', x, midY - 20);
      ctx.fillText('⊗', x, midY + 25);
    }
    ctx.fillText('B (Entrant ⊗)', fenteInX + zoneW / 2, midY + 45);

    // Écrans avec fentes
    ctx.fillStyle = '#1e293b';
    // Fente entrée
    ctx.fillRect(fenteInX - 6, 20, 6, midY - 14);
    ctx.fillRect(fenteInX - 6, midY + 14, 6, H - 20 - (midY + 14));
    // Fente sortie
    ctx.fillRect(fenteOutX, 20, 6, midY - 14);
    ctx.fillRect(fenteOutX, midY + 14, 6, H - 20 - (midY + 14));

    // Trajectoire
    ctx.strokeStyle = isSelected ? '#10b981' : '#ef4444';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(20, midY);
    ctx.lineTo(fenteInX, midY);

    if (isSelected) {
      // Ligne droite parfaite
      ctx.lineTo(fenteOutX + 45, midY);
      ctx.stroke();

      ctx.fillStyle = '#10b981';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText('✅ Franchit la fente ! (v = E / B)', fenteOutX - 10, midY - 22);
    } else if (vParticule > vSelected) {
      // Force magnétique l'emporte -> déviation vers le haut
      ctx.quadraticCurveTo(fenteInX + zoneW * 0.5, midY - 45, fenteInX + zoneW * 0.85, 43);
      ctx.stroke();

      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Fm > Fe (Trop rapide -> Arrêté)', fenteInX + zoneW / 2, 80);
    } else {
      // Force électrique l'emporte -> déviation vers le bas
      ctx.quadraticCurveTo(fenteInX + zoneW * 0.5, midY + 45, fenteInX + zoneW * 0.85, H - 43);
      ctx.stroke();

      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Fe > Fm (Trop lent -> Arrêté)', fenteInX + zoneW / 2, H - 60);
    }
  }, [E_kV, B_mT, vParticuleKmS, isSelected, vParticule, vSelected]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Sliders */}
        <div className="bg-surface/50 border border-navy/10 rounded-2xl p-5 space-y-4">
          <h4 className="font-bold text-navy flex items-center gap-2 text-sm">
            <Filter className="w-4 h-4 text-turquoise" /> Paramètres du Filtre de Wien
          </h4>

          <div>
            <div className="text-xs text-text/80 flex justify-between font-medium mb-1">
              <span>Champ Électrique E</span>
              <span className="font-mono text-rose-600 font-bold">{E_kV} kV/m</span>
            </div>
            <input
              type="range"
              min={10}
              max={150}
              step={5}
              value={E_kV}
              onChange={(e) => setE_kV(Number(e.target.value))}
              className="w-full accent-rose-600"
            />
          </div>

          <div>
            <div className="text-xs text-text/80 flex justify-between font-medium mb-1">
              <span>Champ Magnétique B</span>
              <span className="font-mono text-purple-600 font-bold">{B_mT} mT</span>
            </div>
            <input
              type="range"
              min={20}
              max={300}
              step={10}
              value={B_mT}
              onChange={(e) => setB_mT(Number(e.target.value))}
              className="w-full accent-purple-600"
            />
          </div>

          <div>
            <div className="text-xs text-text/80 flex justify-between font-medium mb-1">
              <span>Vitesse de la particule test</span>
              <span className="font-mono text-turquoise font-bold">{vParticuleKmS} km/s</span>
            </div>
            <input
              type="range"
              min={100}
              max={1500}
              step={10}
              value={vParticuleKmS}
              onChange={(e) => setVParticuleKmS(Number(e.target.value))}
              className="w-full accent-turquoise"
            />
          </div>

          <button
            onClick={() => setVParticuleKmS(Math.round(vSelectedKmS))}
            className="w-full py-2 bg-navy text-white rounded-xl text-xs font-bold hover:bg-navy-light transition-all shadow-xs"
          >
            🎯 Aligner sur la vitesse sélectionnée ({vSelectedKmS.toFixed(0)} km/s)
          </button>
        </div>

        {/* Canvas */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-navy/10 p-3 flex items-center justify-center shadow-sm">
          <canvas ref={canvasRef} width={520} height={280} className="w-full max-w-[520px] h-auto" />
        </div>
      </div>

      {/* Cartes résultats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-amber-50/80 rounded-2xl p-4 border border-amber-200">
          <div className="text-xs text-amber-800 font-semibold">Vitesse Sélectionnée v₀ = E / B</div>
          <div className="text-2xl font-bold text-amber-900 mt-1">{vSelectedKmS.toFixed(1)} km/s</div>
        </div>
        <div className="bg-purple-50/80 rounded-2xl p-4 border border-purple-200">
          <div className="text-xs text-purple-800 font-semibold">Vitesse Particule Test</div>
          <div className="text-2xl font-bold text-purple-900 mt-1">{vParticuleKmS} km/s</div>
        </div>
        <div
          className={`rounded-2xl p-4 border ${
            isSelected ? 'bg-emerald-50/90 border-emerald-300' : 'bg-rose-50/90 border-rose-300'
          }`}
        >
          <div
            className={`text-xs font-semibold ${
              isSelected ? 'text-emerald-800' : 'text-rose-800'
            }`}
          >
            Statut du Franchissement
          </div>
          <div
            className={`text-lg font-bold mt-1 ${
              isSelected ? 'text-emerald-900' : 'text-rose-900'
            }`}
          >
            {isSelected ? '✅ Sortie sans déviation' : '❌ Arrêté par écran'}
          </div>
        </div>
      </div>

      {/* Équation détaillée */}
      <div className="bg-white rounded-2xl border border-navy/10 p-4 text-center shadow-sm space-y-1">
        <span className="text-[10px] text-text/50 font-bold uppercase tracking-wider block">
          Condition d&apos;Équilibre des Forces dans le Filtre de Wien
        </span>
        <MathRenderer
          content={`$$\\vec{F}_e + \\vec{F}_m = \\vec{0} \\iff |q|\\,E = |q|\\,v_0\\,B \\implies v_0 = \\frac{E}{B} = \\frac{${E}\\text{ V/m}}{${B.toFixed(
            3
          )}\\text{ T}} = \\mathbf{${vSelectedKmS.toFixed(1)}\\text{ km/s}}$$`}
        />
        <div className="text-xs text-text/60 mt-1">
          Remarque capitale Bac : ce filtre est rigoureusement indépendant de la masse m et de la charge q !
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ATELIER 4 : SPECTROMÈTRE DE MASSE DE BAINBRIDGE (ISOTOPES)
// ============================================================
function AtelierSpectrometre() {
  const [Bprime_mT, setBprime_mT] = useState(120); // mT (120 mT)
  const [v0KmS, setV0KmS] = useState(1500); // km/s
  const [element, setElement] = useState<'lithium' | 'neon' | 'uranium'>('lithium');

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const eCharge = 1.6e-19;
  const uKg = 1.66e-27; // unité de masse atomique (u)

  let iso1Nom = '⁶Li⁺';
  let m1 = 6.015 * uKg;
  let iso2Nom = '⁷Li⁺';
  let m2 = 7.016 * uKg;
  let charge = eCharge;

  if (element === 'neon') {
    iso1Nom = '²⁰Ne⁺';
    m1 = 19.99 * uKg;
    iso2Nom = '²²Ne⁺';
    m2 = 21.99 * uKg;
  } else if (element === 'uranium') {
    iso1Nom = '²³⁵U⁺';
    m1 = 235.04 * uKg;
    iso2Nom = '²³⁸U⁺';
    m2 = 238.05 * uKg;
  }

  const Bprime = Bprime_mT / 1000;
  const v0 = v0KmS * 1000;

  const R1 = (m1 * v0) / (charge * Bprime);
  const R2 = (m2 * v0) / (charge * Bprime);
  const R1cm = R1 * 100;
  const R2cm = R2 * 100;

  const d1cm = 2 * R1cm;
  const d2cm = 2 * R2cm;
  const deltaDcm = d2cm - d1cm;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, W, H);

    const ox = 70;
    const oy = H - 45;

    // Plaque photographique (axe horizontal inférieur)
    ctx.fillStyle = '#334155';
    ctx.fillRect(30, oy, W - 60, 6);
    ctx.fillStyle = '#64748b';
    ctx.font = 'bold 10px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Plaque Photographique (Détection des impacts)', 35, oy + 22);

    // Fente d'entrée O
    ctx.fillStyle = '#00B8A9';
    ctx.beginPath();
    ctx.arc(ox, oy, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#00B8A9';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('O (Entrée)', ox - 20, oy - 12);

    // Zone B' (fond vert pâle)
    ctx.fillStyle = '#f0fdf4';
    ctx.fillRect(ox, 20, W - ox - 30, oy - 20);
    ctx.strokeStyle = '#86efac';
    ctx.strokeRect(ox, 20, W - ox - 30, oy - 20);

    // Symboles ⊙ pour B' sortant
    ctx.fillStyle = '#16a34a';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    for (let r = 45; r < oy - 20; r += 45) {
      for (let c = ox + 40; c < W - 50; c += 55) {
        ctx.fillText('⊙', c, r);
      }
    }
    ctx.fillText(`Chambre de déviation B' = ${Bprime_mT} mT (Sortant ⊙)`, ox + (W - ox - 30) / 2, 35);

    // Échelle visuelle des rayons
    const maxR = Math.max(R1, R2);
    const scale = (W - ox - 70) / (2 * maxR * 1.15);

    const r1Pix = R1 * scale;
    const r2Pix = R2 * scale;

    // Demi-cercle Isotope 1 (bleu)
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(ox + r1Pix, oy, r1Pix, Math.PI, 0, false);
    ctx.stroke();

    // Impact P1
    const p1x = ox + 2 * r1Pix;
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.arc(p1x, oy, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`P₁ (${iso1Nom})`, p1x, oy - 10);

    // Demi-cercle Isotope 2 (violet)
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(ox + r2Pix, oy, r2Pix, Math.PI, 0, false);
    ctx.stroke();

    // Impact P2
    const p2x = ox + 2 * r2Pix;
    ctx.fillStyle = '#8b5cf6';
    ctx.beginPath();
    ctx.arc(p2x, oy, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText(`P₂ (${iso2Nom})`, p2x, oy - 10);

    // Écartement Δd entre P1 et P2
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(p1x, oy + 12);
    ctx.lineTo(p2x, oy + 12);
    ctx.stroke();
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 10px sans-serif';
    ctx.fillText(`Δd = ${deltaDcm.toFixed(2)} cm`, (p1x + p2x) / 2, oy + 26);
  }, [Bprime_mT, v0KmS, element, R1, R2, deltaDcm, iso1Nom, iso2Nom]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Sliders */}
        <div className="bg-surface/50 border border-navy/10 rounded-2xl p-5 space-y-4">
          <h4 className="font-bold text-navy flex items-center gap-2 text-sm">
            <Layers className="w-4 h-4 text-turquoise" /> Séparation Isotopique
          </h4>

          {/* Choix élément */}
          <div className="space-y-1.5">
            <span className="text-xs font-semibold text-text/70">Élément chimique à analyser :</span>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: 'lithium', label: 'Lithium (⁶Li/⁷Li)' },
                { id: 'neon', label: 'Néon (²⁰Ne/²²Ne)' },
                { id: 'uranium', label: 'Uranium (²³⁵U/²³⁸U)' },
              ].map((el) => (
                <button
                  key={el.id}
                  onClick={() => setElement(el.id as any)}
                  className={`py-1.5 px-1 rounded-xl text-[10px] font-bold truncate transition-all ${
                    element === el.id
                      ? 'bg-navy text-white shadow-xs'
                      : 'bg-white border border-navy/10 text-text/80'
                  }`}
                >
                  {el.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs text-text/80 flex justify-between font-medium mb-1">
              <span>Champ B&apos;</span>
              <span className="font-mono text-purple-600 font-bold">{Bprime_mT} mT</span>
            </div>
            <input
              type="range"
              min={50}
              max={300}
              step={10}
              value={Bprime_mT}
              onChange={(e) => setBprime_mT(Number(e.target.value))}
              className="w-full accent-purple-600"
            />
          </div>

          <div>
            <div className="text-xs text-text/80 flex justify-between font-medium mb-1">
              <span>Vitesse v₀ des ions</span>
              <span className="font-mono text-turquoise font-bold">{v0KmS} km/s</span>
            </div>
            <input
              type="range"
              min={500}
              max={4000}
              step={100}
              value={v0KmS}
              onChange={(e) => setV0KmS(Number(e.target.value))}
              className="w-full accent-turquoise"
            />
          </div>
        </div>

        {/* Canvas */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-navy/10 p-3 flex items-center justify-center shadow-sm">
          <canvas ref={canvasRef} width={520} height={280} className="w-full max-w-[520px] h-auto" />
        </div>
      </div>

      {/* Cartes résultats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-blue-50/80 rounded-2xl p-3.5 border border-blue-200">
          <div className="text-xs text-blue-800 font-semibold">Diamètre {iso1Nom} (d₁)</div>
          <div className="text-xl font-bold text-blue-900 mt-1">{d1cm.toFixed(2)} cm</div>
        </div>
        <div className="bg-purple-50/80 rounded-2xl p-3.5 border border-purple-200">
          <div className="text-xs text-purple-800 font-semibold">Diamètre {iso2Nom} (d₂)</div>
          <div className="text-xl font-bold text-purple-900 mt-1">{d2cm.toFixed(2)} cm</div>
        </div>
        <div className="bg-rose-50/80 rounded-2xl p-3.5 border border-rose-200">
          <div className="text-xs text-rose-800 font-semibold">Écartement Δd = P₁P₂</div>
          <div className="text-xl font-bold text-rose-900 mt-1">{deltaDcm.toFixed(2)} cm</div>
        </div>
        <div className="bg-emerald-50/80 rounded-2xl p-3.5 border border-emerald-200">
          <div className="text-xs text-emerald-800 font-semibold">Rapport des Rayons R₂/R₁</div>
          <div className="text-xl font-bold text-emerald-900 mt-1">{(R2 / R1).toFixed(3)}</div>
        </div>
      </div>

      {/* Équation détaillée */}
      <div className="bg-white rounded-2xl border border-navy/10 p-4 text-center shadow-sm space-y-1">
        <span className="text-[10px] text-text/50 font-bold uppercase tracking-wider block">
          Loi de Séparation Isotopique de Bainbridge
        </span>
        <MathRenderer
          content={`$$P_1P_2 = \\Delta d = 2(R_2 - R_1) = \\frac{2\\,v_0}{|q|\\,B'}\\,(m_2 - m_1) = \\mathbf{${deltaDcm.toFixed(
            2
          )}\\text{ cm}}$$`}
        />
        <div className="text-xs text-text/60 mt-1">
          L&apos;écartement entre les taches sur la plaque est rigoureusement proportionnel à la différence de masse Δm.
        </div>
      </div>
    </div>
  );
}

// ============================================================
// COMPOSANT PRINCIPAL DU LABORATOIRE INTERACTIF P4
// ============================================================
export default function P4ParticuleInteractiveSimulator() {
  const [activeTab, setActiveTab] = useState<AtelierP4>('deviation_e');

  const tabs: { id: AtelierP4; label: string; icon: React.ReactNode }[] = [
    {
      id: 'deviation_e',
      label: 'Déviation Électrostatique E',
      icon: <Zap className="w-4 h-4" />,
    },
    {
      id: 'deviation_b',
      label: 'Déviation Magnétique B',
      icon: <Magnet className="w-4 h-4" />,
    },
    {
      id: 'selecteur_wien',
      label: 'Sélecteur de Wien',
      icon: <Filter className="w-4 h-4" />,
    },
    {
      id: 'spectrometre',
      label: 'Spectrographe de Masse',
      icon: <Layers className="w-4 h-4" />,
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-navy/10 shadow-sm space-y-6">
      {/* En-tête du simulateur */}
      <div className="bg-gradient-to-r from-navy via-navy-light to-navy p-5 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="bg-white/10 rounded-xl p-2.5">
            <Zap className="w-6 h-6 text-turquoise" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">
              Laboratoire Interactif — Particules Chargées dans E et B
            </h3>
            <p className="text-white/70 text-xs sm:text-sm mt-0.5">
              Simulateur de haute précision pour explorer les 4 grands volets du chapitre P4 (Bac S2)
            </p>
          </div>
        </div>

        {/* Onglets */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white text-navy shadow-sm'
                  : 'bg-white/10 text-white/80 hover:bg-white/20'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Contenu de l'atelier actif */}
      <div className="pt-1">
        {activeTab === 'deviation_e' && <AtelierDeviationE />}
        {activeTab === 'deviation_b' && <AtelierDeviationB />}
        {activeTab === 'selecteur_wien' && <AtelierSelecteurWien />}
        {activeTab === 'spectrometre' && <AtelierSpectrometre />}
      </div>

      {/* Pied de page informatif */}
      <div className="bg-surface/50 px-4 py-3 rounded-xl border border-navy/5 flex items-center gap-2 text-xs text-text/60">
        <Info className="w-3.5 h-3.5 text-turquoise shrink-0" />
        <span>
          Modèle relativiste classique • Poids rigoureusement négligeable devant les forces électromagnétiques • Conforme aux annales officielles de l&apos;Office du Baccalauréat du Sénégal
        </span>
      </div>
    </div>
  );
}
