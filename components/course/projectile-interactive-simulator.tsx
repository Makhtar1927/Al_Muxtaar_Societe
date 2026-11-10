'use client';

import React, { useState, useEffect, useRef } from 'react';
import MathRenderer from '@/components/course/math-renderer';
import {
  Target,
  Crosshair,
  Sliders,
  Play,
  RotateCcw,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Info,
  Zap,
  BarChart2,
  ArrowRight,
} from 'lucide-react';

// ============================================================
// TYPES & CONSTANTES
// ============================================================
type Atelier = 'trajectoire' | 'obstacle' | 'cible' | 'portees';

const G = 9.8; // m·s⁻²

function toRad(deg: number) {
  return (deg * Math.PI) / 180;
}
function toDeg(rad: number) {
  return (rad * 180) / Math.PI;
}

// ============================================================
// HELPERS CALCULS PHYSIQUES
// ============================================================
function computeTrajectory(
  v0: number,
  alphaDeg: number,
  y0: number
): {
  tS: number;
  xS: number;
  yS: number;
  tP: number;
  xP: number;
  vxP: number;
  vyP: number;
  vP: number;
  points: { x: number; y: number; t: number }[];
} {
  const alpha = toRad(alphaDeg);
  const vx = v0 * Math.cos(alpha);
  const vy0 = v0 * Math.sin(alpha);

  // Sommet S
  const tS = vy0 / G;
  const xS = vx * tS;
  const yS = y0 + vy0 * tS - 0.5 * G * tS * tS;

  // Portée (y = 0)
  const disc = vy0 * vy0 + 2 * G * y0;
  const tP = disc >= 0 ? (vy0 + Math.sqrt(disc)) / G : 0;
  const xP = vx * tP;
  const vxP = vx;
  const vyP = vy0 - G * tP;
  const vP = Math.sqrt(vxP * vxP + vyP * vyP);

  // Échantillonnage de la trajectoire
  const steps = 200;
  const points: { x: number; y: number; t: number }[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (tP * i) / steps;
    const px = vx * t;
    const py = y0 + vy0 * t - 0.5 * G * t * t;
    if (py >= -0.5) {
      points.push({ x: px, y: py, t });
    }
  }

  return { tS, xS, yS, tP, xP, vxP, vyP, vP, points };
}

// ============================================================
// ATELIER 1 : TRAJECTOIRE PARAMÉTRIQUE
// ============================================================
function AtelierTrajectoire() {
  const [v0, setV0] = useState(15);
  const [alphaDeg, setAlphaDeg] = useState(45);
  const [y0, setY0] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [ballProgress, setBallProgress] = useState(0);
  const animRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const traj = computeTrajectory(v0, alphaDeg, y0);

  // Animation de la balle
  useEffect(() => {
    if (isPlaying) {
      let start: number | null = null;
      const duration = Math.max(traj.tP * 300, 800);
      const step = (ts: number) => {
        if (!start) start = ts;
        const elapsed = ts - start;
        const progress = Math.min(elapsed / duration, 1);
        setBallProgress(progress);
        if (progress < 1) {
          animRef.current = requestAnimationFrame(step);
        } else {
          setIsPlaying(false);
          setBallProgress(0);
        }
      };
      animRef.current = requestAnimationFrame(step);
    } else {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    }
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlaying, traj.tP]);

  // Tracé Canvas
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

    const mx = 45;
    const my = 25;
    const plotW = W - mx - 25;
    const plotH = H - my - 45;

    const maxX = Math.max(traj.xP * 1.15, 1);
    const maxY = Math.max(traj.yS * 1.35, y0 + 1, 1);

    function toCanvas(x: number, y: number): [number, number] {
      return [mx + (x / maxX) * plotW, H - 45 - (y / maxY) * plotH];
    }

    // Grille légère
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 4; i++) {
      const gx = mx + (i / 4) * plotW;
      ctx.beginPath();
      ctx.moveTo(gx, my);
      ctx.lineTo(gx, H - 45);
      ctx.stroke();
      const gy = H - 45 - (i / 4) * plotH;
      ctx.beginPath();
      ctx.moveTo(mx, gy);
      ctx.lineTo(W - 25, gy);
      ctx.stroke();
    }

    // Sol terrestre
    const [, yGround] = toCanvas(0, 0);
    ctx.fillStyle = '#10b981';
    ctx.fillRect(mx, yGround, plotW, 3);

    // Axes
    ctx.strokeStyle = '#243447';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(mx, H - 45);
    ctx.lineTo(W - 20, H - 45);
    ctx.moveTo(mx, H - 45);
    ctx.lineTo(mx, my);
    ctx.stroke();

    // Labels axes
    ctx.fillStyle = '#64748b';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('x (m)', W / 2, H - 8);
    ctx.save();
    ctx.translate(14, H / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('y (m)', 0, 0);
    ctx.restore();

    // Graduations
    for (let i = 0; i <= 4; i++) {
      const xVal = (maxX * i) / 4;
      const [cx] = toCanvas(xVal, 0);
      ctx.fillStyle = '#64748b';
      ctx.textAlign = 'center';
      ctx.fillText(xVal.toFixed(0), cx, H - 28);
    }

    // Trajectoire parabolique
    if (traj.points.length > 1) {
      ctx.strokeStyle = '#00B8A9';
      ctx.lineWidth = 3;
      ctx.beginPath();
      const [x0c, y0c] = toCanvas(traj.points[0].x, traj.points[0].y);
      ctx.moveTo(x0c, y0c);
      for (let i = 1; i < traj.points.length; i++) {
        const [xc, yc] = toCanvas(traj.points[i].x, traj.points[i].y);
        ctx.lineTo(xc, yc);
      }
      ctx.stroke();
    }

    // Vecteur v₀
    const alpha = toRad(alphaDeg);
    const arrowLen = 45;
    const [ox, oy] = toCanvas(0, y0);
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(ox, oy);
    ctx.lineTo(ox + arrowLen * Math.cos(alpha), oy - arrowLen * Math.sin(alpha));
    ctx.stroke();
    // Flèche
    ctx.fillStyle = '#f97316';
    const ax = ox + arrowLen * Math.cos(alpha);
    const ay = oy - arrowLen * Math.sin(alpha);
    ctx.beginPath();
    ctx.moveTo(ax, ay);
    ctx.lineTo(ax - 9 * Math.cos(alpha - 0.35), ay + 9 * Math.sin(alpha - 0.35));
    ctx.lineTo(ax - 9 * Math.cos(alpha + 0.35), ay + 9 * Math.sin(alpha + 0.35));
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#ea580c';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('v₀', ax + 8, ay - 4);

    // Arc α
    ctx.strokeStyle = '#8b5cf6';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(ox, oy, 22, -alpha, 0);
    ctx.stroke();
    ctx.fillStyle = '#7c3aed';
    ctx.font = 'bold 11px sans-serif';
    ctx.fillText('α', ox + 28, oy - 6);

    // Point O
    ctx.fillStyle = '#243447';
    ctx.beginPath();
    ctx.arc(ox, oy, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#243447';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('O', ox + 7, oy + 14);

    // Sommet S
    if (traj.yS > 0.1) {
      const [sxc, syc] = toCanvas(traj.xS, traj.yS);
      ctx.fillStyle = '#d97706';
      ctx.beginPath();
      ctx.arc(sxc, syc, 5.5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = '#d97706';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`S (H = ${traj.yS.toFixed(1)}m)`, sxc, syc - 10);
      ctx.strokeStyle = '#f59e0b';
      ctx.lineWidth = 1;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(sxc, syc);
      ctx.lineTo(sxc, yGround);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Portée P
    if (traj.xP > 0.1) {
      const [pxc, pyc] = toCanvas(traj.xP, 0);
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.arc(pxc, pyc, 5.5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = '#dc2626';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(`P (${traj.xP.toFixed(1)}m)`, pxc, pyc + 18);
    }

    // Balle animée
    if (isPlaying || ballProgress > 0) {
      const idx = Math.min(
        Math.floor(ballProgress * (traj.points.length - 1)),
        traj.points.length - 1
      );
      const pt = traj.points[idx];
      if (pt) {
        const [bxc, byc] = toCanvas(pt.x, pt.y);
        ctx.fillStyle = '#ef4444';
        ctx.shadowColor = 'rgba(239, 68, 68, 0.5)';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(bxc, byc, 7, 0, 2 * Math.PI);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
  }, [traj, alphaDeg, y0, isPlaying, ballProgress]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Paramètres & Sliders */}
        <div className="bg-surface/50 border border-navy/10 rounded-2xl p-5 space-y-4">
          <h4 className="font-bold text-navy flex items-center gap-2 text-sm">
            <Sliders className="w-4 h-4 text-turquoise" /> Paramètres du Tir
          </h4>
          <div>
            <div className="text-xs text-text/80 flex justify-between font-medium mb-1">
              <span>Vitesse initiale v₀</span>
              <span className="font-mono text-turquoise font-bold">{v0} m/s</span>
            </div>
            <input
              type="range"
              min={5}
              max={30}
              step={0.5}
              value={v0}
              onChange={(e) => {
                setV0(Number(e.target.value));
                setBallProgress(0);
                setIsPlaying(false);
              }}
              className="w-full accent-turquoise"
            />
          </div>
          <div>
            <div className="text-xs text-text/80 flex justify-between font-medium mb-1">
              <span>Angle de tir α</span>
              <span className="font-mono text-purple-600 font-bold">{alphaDeg}°</span>
            </div>
            <input
              type="range"
              min={5}
              max={85}
              step={1}
              value={alphaDeg}
              onChange={(e) => {
                setAlphaDeg(Number(e.target.value));
                setBallProgress(0);
                setIsPlaying(false);
              }}
              className="w-full accent-purple-600"
            />
          </div>
          <div>
            <div className="text-xs text-text/80 flex justify-between font-medium mb-1">
              <span>Hauteur de tir y₀</span>
              <span className="font-mono text-orange-600 font-bold">{y0.toFixed(1)} m</span>
            </div>
            <input
              type="range"
              min={0}
              max={5}
              step={0.5}
              value={y0}
              onChange={(e) => {
                setY0(Number(e.target.value));
                setBallProgress(0);
                setIsPlaying(false);
              }}
              className="w-full accent-orange-500"
            />
          </div>
          <div className="flex gap-2 pt-2">
            <button
              onClick={() => {
                setBallProgress(0);
                setIsPlaying(true);
              }}
              className="flex-1 flex items-center justify-center gap-1.5 bg-turquoise hover:bg-turquoise-hover text-white rounded-xl py-2.5 text-xs font-bold transition-all shadow-sm"
            >
              <Play className="w-4 h-4" /> Lancer l&apos;animation
            </button>
            <button
              onClick={() => {
                setIsPlaying(false);
                setBallProgress(0);
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
          <canvas ref={canvasRef} width={480} height={260} className="w-full max-w-[480px] h-auto" />
        </div>
      </div>

      {/* Cartes de résultats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-amber-50/80 rounded-2xl p-3.5 border border-amber-200">
          <div className="text-xs text-amber-800 font-semibold">Sommet xₛ</div>
          <div className="text-xl font-bold text-amber-900 mt-1">{traj.xS.toFixed(2)} m</div>
        </div>
        <div className="bg-amber-50/80 rounded-2xl p-3.5 border border-amber-200">
          <div className="text-xs text-amber-800 font-semibold">Flèche H (yₛ)</div>
          <div className="text-xl font-bold text-amber-900 mt-1">{traj.yS.toFixed(2)} m</div>
        </div>
        <div className="bg-rose-50/80 rounded-2xl p-3.5 border border-rose-200">
          <div className="text-xs text-rose-800 font-semibold">Portée xₚ</div>
          <div className="text-xl font-bold text-rose-900 mt-1">{traj.xP.toFixed(2)} m</div>
        </div>
        <div className="bg-emerald-50/80 rounded-2xl p-3.5 border border-emerald-200">
          <div className="text-xs text-emerald-800 font-semibold">Vitesse impact |v|</div>
          <div className="text-xl font-bold text-emerald-900 mt-1">{traj.vP.toFixed(2)} m/s</div>
        </div>
      </div>

      {/* Équation de trajectoire */}
      <div className="bg-white rounded-2xl border border-navy/10 p-4 text-center shadow-sm space-y-1">
        <span className="text-[10px] text-text/50 font-bold uppercase tracking-wider block">
          Équation Cartésienne de la Trajectoire y(x)
        </span>
        <MathRenderer
          content={`$$y(x) = y_0 + x \\tan ${alphaDeg}^\\circ - \\frac{g}{2v_0^2 \\cos^2 ${alphaDeg}^\\circ}x^2$$`}
        />
        <div className="text-xs text-text/60 mt-1">
          avec v₀ = {v0} m/s, α = {alphaDeg}°, y₀ = {y0} m, g = 9,8 m/s²
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ATELIER 2 : FRANCHISSEMENT D'OBSTACLE
// ============================================================
function AtelierObstacle() {
  const [v0, setV0] = useState(20);
  const [alphaDeg, setAlphaDeg] = useState(40);
  const [dMur, setDMur] = useState(15);
  const [hMur, setHMur] = useState(3);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const traj = computeTrajectory(v0, alphaDeg, 0);

  const alpha = toRad(alphaDeg);
  const vx = v0 * Math.cos(alpha);
  const vy0 = v0 * Math.sin(alpha);

  const tAtMur = dMur / vx;
  const yBall = vy0 * tAtMur - 0.5 * G * tAtMur * tAtMur;
  const clears = yBall >= hMur;
  const delta = yBall - hMur;

  const numerV0min = G * dMur * dMur;
  const denomV0min = 2 * Math.cos(alpha) * Math.cos(alpha) * (Math.tan(alpha) * dMur - hMur);
  const v0MinSq = denomV0min > 0 ? numerV0min / denomV0min : Infinity;
  const v0Min = isFinite(v0MinSq) ? Math.sqrt(v0MinSq) : null;

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

    const mx = 45;
    const my = 25;
    const plotW = W - mx - 25;
    const plotH = H - my - 45;

    const maxX = Math.max(traj.xP * 1.15, dMur * 1.35, 1);
    const maxY = Math.max(traj.yS * 1.35, hMur * 1.6, 1);

    function toCanvas(x: number, y: number): [number, number] {
      return [mx + (x / maxX) * plotW, H - 45 - (y / maxY) * plotH];
    }

    // Grille légère
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 4; i++) {
      const gx = mx + (i / 4) * plotW;
      ctx.beginPath();
      ctx.moveTo(gx, my);
      ctx.lineTo(gx, H - 45);
      ctx.stroke();
    }

    // Sol
    const [, yGround] = toCanvas(0, 0);
    ctx.fillStyle = '#10b981';
    ctx.fillRect(mx, yGround, plotW, 3);

    // Axes
    ctx.strokeStyle = '#243447';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(mx, H - 45);
    ctx.lineTo(W - 20, H - 45);
    ctx.moveTo(mx, H - 45);
    ctx.lineTo(mx, my);
    ctx.stroke();

    // Trajectoire
    if (traj.points.length > 1) {
      ctx.strokeStyle = clears ? '#00B8A9' : '#94a3b8';
      ctx.lineWidth = 3;
      ctx.beginPath();
      const [x0c, y0c] = toCanvas(traj.points[0].x, traj.points[0].y);
      ctx.moveTo(x0c, y0c);
      for (let i = 1; i < traj.points.length; i++) {
        const [xc, yc] = toCanvas(traj.points[i].x, traj.points[i].y);
        ctx.lineTo(xc, yc);
      }
      ctx.stroke();
    }

    // Mur
    const [murX, murY0] = toCanvas(dMur, 0);
    const [, murYTop] = toCanvas(dMur, hMur);
    ctx.fillStyle = '#243447';
    ctx.fillRect(murX - 5, murYTop, 10, murY0 - murYTop);
    ctx.fillStyle = '#243447';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`Mur ${hMur}m`, murX, murYTop - 7);

    // Balle au niveau du mur
    if (yBall >= 0) {
      const [bx, by] = toCanvas(dMur, yBall);
      ctx.fillStyle = clears ? '#10b981' : '#ef4444';
      ctx.beginPath();
      ctx.arc(bx, by, 7, 0, 2 * Math.PI);
      ctx.fill();

      // Marge Δh
      ctx.strokeStyle = clears ? '#10b981' : '#ef4444';
      ctx.lineWidth = 2;
      ctx.setLineDash([3, 3]);
      ctx.beginPath();
      ctx.moveTo(bx + 12, by);
      ctx.lineTo(bx + 12, murYTop);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    ctx.fillStyle = '#64748b';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`d = ${dMur}m`, murX, H - 28);
  }, [traj, dMur, hMur, clears, yBall]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Sliders */}
        <div className="bg-surface/50 border border-navy/10 rounded-2xl p-5 space-y-3.5">
          <h4 className="font-bold text-navy flex items-center gap-2 text-sm">
            <Sliders className="w-4 h-4 text-orange-500" /> Paramètres de l&apos;Obstacle
          </h4>
          {[
            { label: 'Vitesse v₀', min: 5, max: 30, step: 0.5, value: v0, set: setV0, color: 'text-turquoise', unit: 'm/s' },
            { label: 'Angle α', min: 10, max: 80, step: 1, value: alphaDeg, set: setAlphaDeg, color: 'text-purple-600', unit: '°' },
            { label: 'Distance mur d', min: 3, max: 30, step: 1, value: dMur, set: setDMur, color: 'text-orange-600', unit: 'm' },
            { label: 'Hauteur mur h', min: 1, max: 8, step: 0.5, value: hMur, set: setHMur, color: 'text-rose-600', unit: 'm' },
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
        </div>

        {/* Canvas */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-navy/10 p-3 flex items-center justify-center shadow-sm">
          <canvas ref={canvasRef} width={480} height={260} className="w-full max-w-[480px] h-auto" />
        </div>
      </div>

      {/* Résultat du franchissement */}
      <div
        className={`rounded-2xl p-5 border ${
          clears ? 'bg-emerald-50/90 border-emerald-300' : 'bg-rose-50/90 border-rose-300'
        }`}
      >
        <div className="flex items-center gap-2.5 mb-3">
          {clears ? (
            <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
          ) : (
            <AlertTriangle className="w-6 h-6 text-rose-600 shrink-0" />
          )}
          <span className={`font-bold text-base ${clears ? 'text-emerald-900' : 'text-rose-900'}`}>
            {clears ? '✅ Le projectile franchit le mur avec succès !' : '❌ Le projectile percute le mur'}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-3 text-xs sm:text-sm">
          <div className="bg-white/80 rounded-xl p-3 border border-navy/5">
            <div className="text-text/60">Altitude y(d) au mur</div>
            <div className="font-mono font-bold text-navy text-base mt-0.5">{yBall.toFixed(2)} m</div>
          </div>
          <div className="bg-white/80 rounded-xl p-3 border border-navy/5">
            <div className="text-text/60">Hauteur mur H</div>
            <div className="font-mono font-bold text-navy text-base mt-0.5">{hMur.toFixed(1)} m</div>
          </div>
          <div className="bg-white/80 rounded-xl p-3 border border-navy/5">
            <div className="text-text/60">Marge Δh</div>
            <div
              className={`font-mono font-bold text-base mt-0.5 ${
                delta >= 0 ? 'text-emerald-700' : 'text-rose-700'
              }`}
            >
              {delta >= 0 ? '+' : ''}
              {delta.toFixed(2)} m
            </div>
          </div>
        </div>

        {/* Équation détaillée */}
        <div className="mt-4 p-3 bg-white rounded-xl border border-navy/10 text-center space-y-1">
          <MathRenderer
            content={`$$y(d) = d\\,\\tan\\alpha - \\frac{g\\,d^2}{2v_0^2\\cos^2\\alpha} = \\mathbf{${yBall.toFixed(2)}\\text{ m}}$$`}
          />
          {v0Min && (
            <div className="text-xs text-text/70 mt-1">
              Vitesse minimale requise pour franchir l&apos;obstacle :{' '}
              <strong className="text-navy font-bold font-mono">v₀_min = {v0Min.toFixed(2)} m/s</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// ATELIER 3 : TIR SUR CIBLE (ÉQUATION EN tan α)
// ============================================================
function AtelierCible() {
  const [v0, setV0] = useState(20);
  const [xC, setXC] = useState(18);
  const [yC, setYC] = useState(2);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const A = (G * xC * xC) / (2 * v0 * v0);
  const B = -xC;
  const C = yC + A;
  const disc = B * B - 4 * A * C;

  let tanAlpha1: number | null = null;
  let tanAlpha2: number | null = null;
  let alpha1Deg: number | null = null;
  let alpha2Deg: number | null = null;
  let traj1: ReturnType<typeof computeTrajectory> | null = null;
  let traj2: ReturnType<typeof computeTrajectory> | null = null;

  if (disc >= 0) {
    tanAlpha1 = (-B - Math.sqrt(disc)) / (2 * A);
    tanAlpha2 = (-B + Math.sqrt(disc)) / (2 * A);
    alpha1Deg = toDeg(Math.atan(tanAlpha1));
    alpha2Deg = toDeg(Math.atan(tanAlpha2));
    if (alpha1Deg > 0) traj1 = computeTrajectory(v0, alpha1Deg, 0);
    if (alpha2Deg > 0 && alpha2Deg < 90) traj2 = computeTrajectory(v0, alpha2Deg, 0);
  }

  const v0MinSq = G * (yC + Math.sqrt(xC * xC + yC * yC));
  const v0Min = Math.sqrt(v0MinSq);

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

    const mx = 45;
    const my = 25;
    const plotW = W - mx - 25;
    const plotH = H - my - 45;

    const allPts = [...(traj1?.points ?? []), ...(traj2?.points ?? []), { x: xC, y: yC }];
    const maxX = Math.max(...allPts.map((p) => p.x), xC * 1.25, 1);
    const maxY = Math.max(...allPts.map((p) => p.y), yC * 1.5, 1);

    function toCanvas(x: number, y: number): [number, number] {
      return [mx + (x / maxX) * plotW, H - 45 - (y / maxY) * plotH];
    }

    // Grille
    ctx.strokeStyle = '#f1f5f9';
    ctx.lineWidth = 1;
    for (let i = 1; i <= 4; i++) {
      const gx = mx + (i / 4) * plotW;
      ctx.beginPath();
      ctx.moveTo(gx, my);
      ctx.lineTo(gx, H - 45);
      ctx.stroke();
    }

    // Sol
    const [, yGround] = toCanvas(0, 0);
    ctx.fillStyle = '#10b981';
    ctx.fillRect(mx, yGround, plotW, 3);

    // Axes
    ctx.strokeStyle = '#243447';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(mx, H - 45);
    ctx.lineTo(W - 20, H - 45);
    ctx.moveTo(mx, H - 45);
    ctx.lineTo(mx, my);
    ctx.stroke();

    // Trajectoire 1 (tir tendu)
    if (traj1 && traj1.points.length > 1) {
      ctx.strokeStyle = '#00B8A9';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      const [x0c, y0c] = toCanvas(traj1.points[0].x, traj1.points[0].y);
      ctx.moveTo(x0c, y0c);
      for (let i = 1; i < traj1.points.length; i++) {
        const [xc, yc] = toCanvas(traj1.points[i].x, traj1.points[i].y);
        ctx.lineTo(xc, yc);
      }
      ctx.stroke();
    }

    // Trajectoire 2 (tir en cloche)
    if (traj2 && traj2.points.length > 1) {
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 2.5;
      ctx.setLineDash([5, 4]);
      ctx.beginPath();
      const [x0c, y0c] = toCanvas(traj2.points[0].x, traj2.points[0].y);
      ctx.moveTo(x0c, y0c);
      for (let i = 1; i < traj2.points.length; i++) {
        const [xc, yc] = toCanvas(traj2.points[i].x, traj2.points[i].y);
        ctx.lineTo(xc, yc);
      }
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Cible C
    const [cxc, cyc] = toCanvas(xC, yC);
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cxc - 10, cyc);
    ctx.lineTo(cxc + 10, cyc);
    ctx.moveTo(cxc, cyc - 10);
    ctx.lineTo(cxc, cyc + 10);
    ctx.stroke();
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('🎯 C', cxc + 6, cyc - 6);

    // Légendes
    if (traj1) {
      ctx.fillStyle = '#00B8A9';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(`Tir tendu : α₁ = ${alpha1Deg?.toFixed(1)}°`, mx + 10, my + 15);
    }
    if (traj2) {
      ctx.fillStyle = '#8b5cf6';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(`Tir en cloche : α₂ = ${alpha2Deg?.toFixed(1)}°`, mx + 10, my + 30);
    }
  }, [traj1, traj2, xC, yC, alpha1Deg, alpha2Deg]);

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Sliders */}
        <div className="bg-surface/50 border border-navy/10 rounded-2xl p-5 space-y-4">
          <h4 className="font-bold text-navy flex items-center gap-2 text-sm">
            <Crosshair className="w-4 h-4 text-rose-500" /> Cible & Vitesse
          </h4>
          {[
            { label: 'Vitesse v₀', min: 10, max: 35, step: 0.5, value: v0, set: setV0, color: 'text-turquoise', unit: 'm/s' },
            { label: 'Distance cible x_C', min: 5, max: 35, step: 1, value: xC, set: setXC, color: 'text-orange-600', unit: 'm' },
            { label: 'Altitude cible y_C', min: -2, max: 10, step: 0.5, value: yC, set: setYC, color: 'text-rose-600', unit: 'm' },
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
        </div>

        {/* Canvas */}
        <div className="md:col-span-2 bg-white rounded-2xl border border-navy/10 p-3 flex items-center justify-center shadow-sm">
          <canvas ref={canvasRef} width={480} height={260} className="w-full max-w-[480px] h-auto" />
        </div>
      </div>

      {/* Résolution algébrique pas à pas */}
      <div className="bg-surface/50 rounded-2xl p-5 border border-navy/10 space-y-3">
        <h4 className="font-bold text-navy text-sm flex items-center gap-2">
          <ArrowRight className="w-4 h-4 text-turquoise" />
          Démonstration : Équation du 2nd Degré en X = tan α
        </h4>

        <div className="bg-white rounded-xl p-4 border border-navy/10 space-y-2 text-center shadow-sm">
          <MathRenderer
            content={`$$A = \\frac{g x_C^2}{2v_0^2} = \\frac{9{,}8 \\times ${xC}^2}{2 \\times ${v0}^2} = \\mathbf{${A.toFixed(3)}}$$`}
          />
          <MathRenderer
            content={`$$A \\tan^2\\alpha - x_C \\tan\\alpha + (y_C + A) = 0 \\implies ${A.toFixed(3)}\\tan^2\\alpha - ${xC}\\tan\\alpha + ${C.toFixed(3)} = 0$$`}
          />
          <MathRenderer
            content={`$$\\Delta = B^2 - 4AC = (-${xC})^2 - 4(${A.toFixed(3)})(${C.toFixed(3)}) = \\mathbf{${disc.toFixed(3)}}$$`}
          />
        </div>

        {disc >= 0 && alpha1Deg !== null && alpha2Deg !== null ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="bg-turquoise-light/50 rounded-xl p-4 border border-turquoise/20">
              <div className="text-xs text-turquoise font-bold uppercase tracking-wider">Tir Tendu (Angle faible)</div>
              <div className="font-mono text-2xl font-bold text-navy mt-1">α₁ = {alpha1Deg.toFixed(1)}°</div>
              <div className="text-xs text-text/70 mt-1">tan α₁ = {tanAlpha1?.toFixed(3)} • Trajet direct et rapide</div>
            </div>
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-200">
              <div className="text-xs text-purple-700 font-bold uppercase tracking-wider">Tir en Cloche (Angle fort)</div>
              <div className="font-mono text-2xl font-bold text-navy mt-1">α₂ = {alpha2Deg.toFixed(1)}°</div>
              <div className="text-xs text-text/70 mt-1">tan α₂ = {tanAlpha2?.toFixed(3)} • Trajet plongeant en hauteur</div>
            </div>
          </div>
        ) : (
          <div className="bg-rose-50 rounded-xl p-4 border border-rose-200 space-y-2">
            <div className="flex items-center gap-2 text-rose-800 font-bold">
              <AlertTriangle className="w-5 h-5 text-rose-600" />
              <span>Cible inaccessible avec v₀ = {v0} m/s (Δ &lt; 0)</span>
            </div>
            <div className="text-xs text-rose-950">
              Vitesse minimale absolue pour atteindre ce point :
            </div>
            <MathRenderer
              content={`$$v_{0,\\min} = \\sqrt{g(y_C + \\sqrt{x_C^2 + y_C^2})} = \\mathbf{${v0Min.toFixed(2)}\\text{ m/s}}$$`}
            />
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// ATELIER 4 : COMPARAISON DES PORTÉES
// ============================================================
function AtelierPortees() {
  const [v0, setV0] = useState(20);

  const angles = [5, 15, 25, 30, 35, 40, 45, 50, 55, 60, 65, 75, 85];
  const ranges = angles.map((a) => {
    const r = computeTrajectory(v0, a, 0);
    return { alpha: a, xP: r.xP };
  });

  const maxRange = Math.max(...ranges.map((r) => r.xP));

  return (
    <div className="space-y-5">
      {/* Contrôle vitesse */}
      <div className="bg-surface/50 border border-navy/10 rounded-2xl p-5">
        <div className="text-xs text-text/80 flex justify-between font-medium mb-1.5">
          <span className="font-bold text-navy text-sm">Vitesse initiale v₀</span>
          <span className="font-mono text-turquoise font-bold text-base">{v0} m/s</span>
        </div>
        <input
          type="range"
          min={5}
          max={40}
          step={1}
          value={v0}
          onChange={(e) => setV0(Number(e.target.value))}
          className="w-full accent-navy"
        />
      </div>

      {/* Formule de la portée */}
      <div className="bg-white rounded-2xl border border-navy/10 p-4 text-center shadow-sm">
        <span className="text-[10px] text-text/50 font-bold uppercase tracking-wider block mb-1">
          Formule de la Portée Horizontale sur Sol Plat
        </span>
        <MathRenderer
          content={`$$x_P(\\alpha) = \\frac{v_0^2 \\sin(2\\alpha)}{g} = \\frac{${v0}^2 \\sin(2\\alpha)}{9{,}8}$$`}
        />
      </div>

      {/* Graphique SVG des portées */}
      <div className="bg-white rounded-2xl border border-navy/10 p-5 shadow-sm">
        <h4 className="font-bold text-navy mb-4 flex items-center gap-2 text-sm">
          <BarChart2 className="w-4 h-4 text-turquoise" />
          Portée xₚ en Fonction de l&apos;Angle de Tir (v₀ = {v0} m/s)
        </h4>
        <div className="overflow-x-auto">
          <svg viewBox="0 0 700 280" className="w-full" style={{ minWidth: '500px' }}>
            <line x1="60" y1="20" x2="60" y2="240" stroke="#cbd5e1" strokeWidth="1.5" />
            <line x1="60" y1="240" x2="680" y2="240" stroke="#cbd5e1" strokeWidth="1.5" />
            <text x="8" y="130" fontSize="11" fill="#64748b" transform="rotate(-90, 8, 130)" textAnchor="middle">
              xP (m)
            </text>

            {[0, 25, 50, 75, 100].map((pct) => {
              const y = 240 - (pct / 100) * 220;
              const val = (maxRange * pct) / 100;
              return (
                <g key={pct}>
                  <line x1="55" y1={y} x2="680" y2={y} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3,3" />
                  <text x="52" y={y + 4} fontSize="10" fill="#94a3b8" textAnchor="end">
                    {val.toFixed(0)}
                  </text>
                </g>
              );
            })}

            {ranges.map((r, i) => {
              const barW = 42;
              const x = 70 + i * (barW + 4);
              const h = maxRange > 0 ? (r.xP / maxRange) * 220 : 0;
              const y = 240 - h;
              const is45 = r.alpha === 45;
              return (
                <g key={r.alpha}>
                  <rect
                    x={x}
                    y={y}
                    width={barW}
                    height={h}
                    fill={is45 ? '#00B8A9' : '#243447'}
                    rx={3}
                    opacity={is45 ? 1 : 0.75}
                  />
                  <text
                    x={x + barW / 2}
                    y={y - 5}
                    fontSize="9"
                    fill={is45 ? '#00B8A9' : '#64748b'}
                    textAnchor="middle"
                    fontWeight={is45 ? 'bold' : 'normal'}
                  >
                    {r.xP.toFixed(1)}
                  </text>
                  <text
                    x={x + barW / 2}
                    y={255}
                    fontSize="10"
                    fill={is45 ? '#00B8A9' : '#64748b'}
                    textAnchor="middle"
                    fontWeight={is45 ? 'bold' : 'normal'}
                  >
                    {r.alpha}°
                  </text>
                  {is45 && (
                    <text x={x + barW / 2} y={270} fontSize="10" fill="#00B8A9" textAnchor="middle" fontWeight="bold">
                      ★ Max
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Propriétés physiques clés */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 space-y-1">
          <div className="font-bold text-amber-900 text-sm flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-600" />
            Portée Maximale Absolue
          </div>
          <MathRenderer
            content={`$$x_{P,\\max} = \\frac{v_0^2}{g} = \\frac{${v0}^2}{9{,}8} = \\mathbf{${(
              (v0 * v0) /
              G
            ).toFixed(2)}\\text{ m}}$$`}
          />
          <div className="text-xs text-amber-950 mt-1">
            <MathRenderer content="Atteinte rigoureusement pour $\alpha = 45^\circ$ car $\sin(2 \times 45^\circ) = \sin(90^\circ) = 1$." />
          </div>
        </div>

        <div className="bg-purple-50 rounded-2xl p-4 border border-purple-200 space-y-1">
          <div className="font-bold text-purple-900 text-sm flex items-center gap-1.5">
            <Info className="w-4 h-4 text-purple-600" />
            Angles Complémentaires de Même Portée
          </div>
          <MathRenderer content={`$$x_P(\\alpha) = x_P(90^\\circ - \\alpha)$$`} />
          <div className="text-xs text-purple-950 mt-1">
            <MathRenderer content="Deux angles dont la somme vaut $90^\circ$ ont exactement la même portée : $30^\circ$ et $60^\circ$, $25^\circ$ et $65^\circ$." />
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// COMPOSANT PRINCIPAL DU SIMULATEUR
// ============================================================
export default function ProjectileInteractiveSimulator() {
  const [activeTab, setActiveTab] = useState<Atelier>('trajectoire');

  const tabs: { id: Atelier; label: string; icon: React.ReactNode }[] = [
    {
      id: 'trajectoire',
      label: 'Trajectoire',
      icon: <TrendingUp className="w-4 h-4" />,
    },
    {
      id: 'obstacle',
      label: 'Franchissement',
      icon: <AlertTriangle className="w-4 h-4" />,
    },
    {
      id: 'cible',
      label: 'Tir sur Cible',
      icon: <Crosshair className="w-4 h-4" />,
    },
    {
      id: 'portees',
      label: 'Comparaison Portées',
      icon: <BarChart2 className="w-4 h-4" />,
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-navy/10 shadow-sm space-y-6">
      {/* En-tête */}
      <div className="bg-gradient-to-r from-navy via-navy-light to-navy p-5 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="bg-white/10 rounded-xl p-2.5">
            <Target className="w-6 h-6 text-turquoise" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">
              Laboratoire Interactif — Projectile dans le Champ de Pesanteur
            </h3>
            <p className="text-white/70 text-xs sm:text-sm mt-0.5">
              Simulateur dynamique pour explorer les 4 grands types d&apos;exercices du Bac S2
            </p>
          </div>
        </div>

        {/* Onglets de navigation */}
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

      {/* Contenu de l'atelier sélectionné */}
      <div className="pt-1">
        {activeTab === 'trajectoire' && <AtelierTrajectoire />}
        {activeTab === 'obstacle' && <AtelierObstacle />}
        {activeTab === 'cible' && <AtelierCible />}
        {activeTab === 'portees' && <AtelierPortees />}
      </div>

      {/* Pied de page informatif */}
      <div className="bg-surface/50 px-4 py-3 rounded-xl border border-navy/5 flex items-center gap-2 text-xs text-text/60">
        <Info className="w-3.5 h-3.5 text-turquoise shrink-0" />
        <span>Modèle physique galiléen conforme au programme officiel S2 • Champ de pesanteur uniforme g = 9,8 m·s⁻² • Frottements de l&apos;air négligés</span>
      </div>
    </div>
  );
}
