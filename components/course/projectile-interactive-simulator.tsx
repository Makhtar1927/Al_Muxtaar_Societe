'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import MathRenderer from '@/components/course/math-renderer';
import {
  Target,
  Crosshair,
  Sliders,
  Play,
  Pause,
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
// TYPES
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
// HELPERS PHYSIQUE
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

  // Sommet
  const tS = vy0 / G;
  const xS = vx * tS;
  const yS = y0 + vy0 * tS - 0.5 * G * tS * tS;

  // Portée (y = 0)
  // y0 + vy0*t - 0.5*G*t² = 0  → 0.5G t² - vy0 t - y0 = 0
  const disc = vy0 * vy0 + 2 * G * y0;
  const tP = disc >= 0 ? (vy0 + Math.sqrt(disc)) / G : 0;
  const xP = vx * tP;
  const vxP = vx;
  const vyP = vy0 - G * tP;
  const vP = Math.sqrt(vxP * vxP + vyP * vyP);

  // Points de la courbe
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
  const [ballProgress, setBallProgress] = useState(0); // 0..1
  const animRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const traj = computeTrajectory(v0, alphaDeg, y0);

  // Animation de la balle
  useEffect(() => {
    if (isPlaying) {
      let start: number | null = null;
      const duration = Math.max(traj.tP * 300, 800); // ms
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

  // Dessin canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;
    ctx.clearRect(0, 0, W, H);

    // Marges
    const mx = 40;
    const my = 30;
    const plotW = W - mx - 20;
    const plotH = H - my - 40;

    // Domaine
    const maxX = Math.max(traj.xP * 1.1, 1);
    const maxY = Math.max(traj.yS * 1.3, y0 + 1, 1);

    function toCanvas(x: number, y: number): [number, number] {
      return [mx + (x / maxX) * plotW, H - 40 - (y / maxY) * plotH];
    }

    // Axes
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(mx, H - 40);
    ctx.lineTo(W - 20, H - 40);
    ctx.moveTo(mx, H - 40);
    ctx.lineTo(mx, my);
    ctx.stroke();

    // Labels axes
    ctx.fillStyle = '#64748b';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('x (m)', W / 2, H - 5);
    ctx.save();
    ctx.translate(12, H / 2);
    ctx.rotate(-Math.PI / 2);
    ctx.fillText('y (m)', 0, 0);
    ctx.restore();

    // Graduation x
    for (let i = 0; i <= 4; i++) {
      const xVal = (maxX * i) / 4;
      const [cx] = toCanvas(xVal, 0);
      ctx.fillStyle = '#94a3b8';
      ctx.textAlign = 'center';
      ctx.fillText(xVal.toFixed(0), cx, H - 25);
    }

    // Sol (y=0)
    ctx.strokeStyle = '#22c55e33';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    const [, yGround] = toCanvas(0, 0);
    ctx.beginPath();
    ctx.moveTo(mx, yGround);
    ctx.lineTo(W - 20, yGround);
    ctx.stroke();
    ctx.setLineDash([]);

    // Trajectoire
    if (traj.points.length > 1) {
      ctx.strokeStyle = '#0ea5e9';
      ctx.lineWidth = 2.5;
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
    const arrowLen = 40;
    const [ox, oy] = toCanvas(0, y0);
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 2;
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
    ctx.lineTo(ax - 8 * Math.cos(alpha - 0.4), ay + 8 * Math.sin(alpha - 0.4));
    ctx.lineTo(ax - 8 * Math.cos(alpha + 0.4), ay + 8 * Math.sin(alpha + 0.4));
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#f97316';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillText('v₀', ax + 8, ay - 5);

    // Arc α
    ctx.strokeStyle = '#a855f7';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(ox, oy, 20, -alpha, 0);
    ctx.stroke();
    ctx.fillStyle = '#a855f7';
    ctx.fillText('α', ox + 24, oy - 5);

    // Point O
    ctx.fillStyle = '#1e293b';
    ctx.beginPath();
    ctx.arc(ox, oy, 5, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('O', ox + 7, oy + 14);

    // Sommet S
    if (traj.yS > 0.1) {
      const [sxc, syc] = toCanvas(traj.xS, traj.yS);
      ctx.fillStyle = '#f59e0b';
      ctx.beginPath();
      ctx.arc(sxc, syc, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = '#f59e0b';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('S', sxc, syc - 10);
      // Ligne pointillée sommet
      ctx.strokeStyle = '#f59e0b55';
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
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(pxc, pyc, 5, 0, 2 * Math.PI);
      ctx.fill();
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 12px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('P', pxc, pyc + 16);
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
        ctx.shadowColor = '#ef4444';
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(bxc, byc, 7, 0, 2 * Math.PI);
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
  }, [traj, alphaDeg, y0, isPlaying, ballProgress]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Sliders */}
        <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 space-y-4">
          <h4 className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-sky-500" /> Paramètres
          </h4>
          <div>
            <label className="text-sm text-slate-600 dark:text-slate-300 flex justify-between">
              <span>Vitesse initiale v₀</span>
              <span className="font-mono text-sky-600 font-bold">{v0} m/s</span>
            </label>
            <input type="range" min={5} max={30} step={0.5} value={v0}
              onChange={e => { setV0(Number(e.target.value)); setBallProgress(0); setIsPlaying(false); }}
              className="w-full accent-sky-500" />
          </div>
          <div>
            <label className="text-sm text-slate-600 dark:text-slate-300 flex justify-between">
              <span>Angle de tir α</span>
              <span className="font-mono text-purple-600 font-bold">{alphaDeg}°</span>
            </label>
            <input type="range" min={5} max={85} step={1} value={alphaDeg}
              onChange={e => { setAlphaDeg(Number(e.target.value)); setBallProgress(0); setIsPlaying(false); }}
              className="w-full accent-purple-500" />
          </div>
          <div>
            <label className="text-sm text-slate-600 dark:text-slate-300 flex justify-between">
              <span>Hauteur de lancement y₀</span>
              <span className="font-mono text-orange-600 font-bold">{y0.toFixed(1)} m</span>
            </label>
            <input type="range" min={0} max={5} step={0.5} value={y0}
              onChange={e => { setY0(Number(e.target.value)); setBallProgress(0); setIsPlaying(false); }}
              className="w-full accent-orange-500" />
          </div>
          <div className="flex gap-2 pt-2">
            <button onClick={() => { setBallProgress(0); setIsPlaying(true); }}
              className="flex-1 flex items-center justify-center gap-1 bg-sky-500 hover:bg-sky-600 text-white rounded-lg py-2 text-sm font-medium transition-colors">
              <Play className="w-4 h-4" /> Lancer
            </button>
            <button onClick={() => { setIsPlaying(false); setBallProgress(0); }}
              className="flex items-center justify-center gap-1 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 rounded-lg px-3 py-2 text-sm transition-colors">
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 flex items-center justify-center">
          <canvas ref={canvasRef} width={480} height={260}
            className="w-full max-w-[480px] h-auto" />
        </div>
      </div>

      {/* Résultats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Sommet xₛ', value: `${traj.xS.toFixed(2)} m`, color: 'amber', formula: 'x_S = \\frac{v_0^2 \\sin 2\\alpha}{2g}' },
          { label: 'Flèche H', value: `${traj.yS.toFixed(2)} m`, color: 'amber', formula: 'H = y_0 + \\frac{v_0^2 \\sin^2\\alpha}{2g}' },
          { label: 'Portée xₚ', value: `${traj.xP.toFixed(2)} m`, color: 'red', formula: 'x_P = \\frac{v_0 \\cos\\alpha}{g}\\left(v_0 \\sin\\alpha + \\sqrt{v_0^2 \\sin^2\\alpha + 2gy_0}\\right)' },
          { label: 'Vitesse impact |v|', value: `${traj.vP.toFixed(2)} m/s`, color: 'green', formula: '|\\vec{v}_P| = \\sqrt{v_x^2 + v_{y_P}^2}' },
        ].map(item => (
          <div key={item.label} className={`bg-${item.color}-50 dark:bg-${item.color}-950 rounded-xl p-3 border border-${item.color}-200 dark:border-${item.color}-800`}>
            <div className={`text-xs text-${item.color}-600 dark:text-${item.color}-400 font-medium`}>{item.label}</div>
            <div className={`text-xl font-bold text-${item.color}-700 dark:text-${item.color}-300 mt-1`}>{item.value}</div>
          </div>
        ))}
      </div>

      {/* Équation de trajectoire */}
      <div className="bg-sky-50 dark:bg-sky-950 rounded-xl p-4 border border-sky-200 dark:border-sky-800">
        <div className="text-xs text-sky-600 dark:text-sky-400 font-semibold mb-2">Équation de trajectoire y(x)</div>
        <MathRenderer
          content={`$$y(x) = y_0 + x \\tan ${alphaDeg}° - \\frac{g}{2v_0^2 \\cos^2 ${alphaDeg}°}x^2$$`}
        />
        <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
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

  // y = vy0*t - 0.5*g*t² = hMur → find min v0 for given alpha and dMur
  // vy0 * (dMur/vx) - 0.5*g*(dMur/vx)² = hMur
  // tan(α)*dMur - g*dMur²/(2*v0²*cos²α) = hMur
  // → v0_min² = g*dMur² / (2*cos²α*(tan(α)*dMur - hMur))
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

    const mx = 40;
    const my = 20;
    const plotW = W - mx - 20;
    const plotH = H - my - 40;

    const maxX = Math.max(traj.xP * 1.1, dMur * 1.3, 1);
    const maxY = Math.max(traj.yS * 1.3, hMur * 1.5, 1);

    function toCanvas(x: number, y: number): [number, number] {
      return [mx + (x / maxX) * plotW, H - 40 - (y / maxY) * plotH];
    }

    // Axes
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(mx, H - 40);
    ctx.lineTo(W - 20, H - 40);
    ctx.moveTo(mx, H - 40);
    ctx.lineTo(mx, my);
    ctx.stroke();

    // Sol
    ctx.fillStyle = '#86efac';
    ctx.fillRect(mx, H - 40, plotW, 4);

    // Trajectoire
    if (traj.points.length > 1) {
      ctx.strokeStyle = clears ? '#0ea5e9' : '#94a3b8';
      ctx.lineWidth = 2.5;
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
    ctx.fillStyle = '#374151';
    ctx.fillRect(murX - 5, murYTop, 10, murY0 - murYTop);
    // Label
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`${hMur}m`, murX, murYTop - 6);

    // Point balle au niveau du mur
    if (yBall >= 0) {
      const [bx, by] = toCanvas(dMur, yBall);
      ctx.fillStyle = clears ? '#22c55e' : '#ef4444';
      ctx.shadowColor = clears ? '#22c55e' : '#ef4444';
      ctx.shadowBlur = 12;
      ctx.beginPath();
      ctx.arc(bx, by, 7, 0, 2 * Math.PI);
      ctx.fill();
      ctx.shadowBlur = 0;

      // Flèche delta
      ctx.strokeStyle = clears ? '#22c55e' : '#ef4444';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(bx + 15, by);
      ctx.lineTo(bx + 15, murYTop);
      ctx.stroke();
      ctx.setLineDash([]);
    }

    // Label dMur
    ctx.fillStyle = '#6b7280';
    ctx.font = '11px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(`d=${dMur}m`, murX, H - 25);
  }, [traj, dMur, hMur, clears, yBall]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Sliders */}
        <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 space-y-4">
          <h4 className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-sky-500" /> Paramètres
          </h4>
          {[
            { label: 'v₀ (m/s)', min: 5, max: 30, step: 0.5, value: v0, set: setV0, color: 'sky', unit: 'm/s' },
            { label: 'Angle α', min: 10, max: 80, step: 1, value: alphaDeg, set: setAlphaDeg, color: 'purple', unit: '°' },
            { label: 'Distance mur d', min: 3, max: 30, step: 1, value: dMur, set: setDMur, color: 'orange', unit: 'm' },
            { label: 'Hauteur mur h', min: 1, max: 8, step: 0.5, value: hMur, set: setHMur, color: 'rose', unit: 'm' },
          ].map(s => (
            <div key={s.label}>
              <label className="text-sm text-slate-600 dark:text-slate-300 flex justify-between">
                <span>{s.label}</span>
                <span className={`font-mono text-${s.color}-600 font-bold`}>{s.value}{s.unit}</span>
              </label>
              <input type="range" min={s.min} max={s.max} step={s.step} value={s.value}
                onChange={e => s.set(Number(e.target.value))}
                className={`w-full accent-${s.color}-500`} />
            </div>
          ))}
        </div>

        {/* Canvas */}
        <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 flex items-center justify-center">
          <canvas ref={canvasRef} width={480} height={260}
            className="w-full max-w-[480px] h-auto" />
        </div>
      </div>

      {/* Résultat */}
      <div className={`rounded-xl p-4 border ${clears
        ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'
        : 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800'}`}>
        <div className="flex items-center gap-3 mb-3">
          {clears
            ? <CheckCircle2 className="w-6 h-6 text-green-500" />
            : <AlertTriangle className="w-6 h-6 text-red-500" />}
          <span className={`font-bold text-lg ${clears ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300'}`}>
            {clears ? '✅ Le projectile franchit le mur !' : '❌ Le projectile percute le mur'}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div>
            <div className="text-slate-500 dark:text-slate-400">y(d) au niveau du mur</div>
            <div className="font-mono font-bold text-sky-600 dark:text-sky-400">{yBall.toFixed(2)} m</div>
          </div>
          <div>
            <div className="text-slate-500 dark:text-slate-400">Hauteur mur h</div>
            <div className="font-mono font-bold text-orange-600 dark:text-orange-400">{hMur.toFixed(1)} m</div>
          </div>
          <div>
            <div className="text-slate-500 dark:text-slate-400">Marge Δh</div>
            <div className={`font-mono font-bold ${delta >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {delta >= 0 ? '+' : ''}{delta.toFixed(2)} m
            </div>
          </div>
        </div>

        {v0Min && (
          <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-700">
            <MathRenderer
          content={`$$y(d) = \\tan\\alpha \\cdot d - \\frac{g \\cdot d^2}{2v_0^2 \\cos^2\\alpha} = ${yBall.toFixed(2)} \\text{ m}$$`}
        />
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Vitesse minimale pour franchir : <span className="font-mono font-bold text-purple-600 dark:text-purple-400">v₀_min = {v0Min.toFixed(2)} m/s</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// ATELIER 3 : TIR SUR CIBLE (tan α)
// ============================================================
function AtelierCible() {
  const [v0, setV0] = useState(20);
  const [xC, setXC] = useState(18);
  const [yC, setYC] = useState(2);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Equation en tan(α): A*tan²α + B*tanα + C = 0
  // avec A = g*xC²/(2v₀²), B = -xC, C = yC + g*xC²/(2v₀²)
  // Forme : A*(tan²α + 1) - xC*tanα + yC = 0
  // → A*tan²α - xC*tanα + (yC + A) = 0
  const A = (G * xC * xC) / (2 * v0 * v0);
  const B = -xC;
  const C = yC + A;
  const disc = B * B - 4 * A * C; // = xC² - 4A(yC+A)

  let tanAlpha1: number | null = null;
  let tanAlpha2: number | null = null;
  let alpha1Deg: number | null = null;
  let alpha2Deg: number | null = null;
  let traj1: ReturnType<typeof computeTrajectory> | null = null;
  let traj2: ReturnType<typeof computeTrajectory> | null = null;

  if (disc >= 0) {
    tanAlpha1 = (-B - Math.sqrt(disc)) / (2 * A); // tir tendu (petit angle)
    tanAlpha2 = (-B + Math.sqrt(disc)) / (2 * A); // tir en cloche (grand angle)
    alpha1Deg = toDeg(Math.atan(tanAlpha1));
    alpha2Deg = toDeg(Math.atan(tanAlpha2));
    if (alpha1Deg > 0) traj1 = computeTrajectory(v0, alpha1Deg, 0);
    if (alpha2Deg > 0 && alpha2Deg < 90) traj2 = computeTrajectory(v0, alpha2Deg, 0);
  }

  // v0_min : discriminant = 0 → v0² = g*(xC²+yC²+ xC*sqrt(xC²+yC²))... 
  // Simplified: v0_min² = g*(yC + sqrt(xC²+yC²))
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

    const mx = 40;
    const my = 20;
    const plotW = W - mx - 20;
    const plotH = H - my - 40;

    const allPts = [
      ...(traj1?.points ?? []),
      ...(traj2?.points ?? []),
      { x: xC, y: yC },
    ];
    const maxX = Math.max(...allPts.map(p => p.x), xC * 1.2, 1);
    const maxY = Math.max(...allPts.map(p => p.y), yC * 1.5, 1);

    function toCanvas(x: number, y: number): [number, number] {
      return [mx + (x / maxX) * plotW, H - 40 - (y / maxY) * plotH];
    }

    // Axes
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(mx, H - 40);
    ctx.lineTo(W - 20, H - 40);
    ctx.moveTo(mx, H - 40);
    ctx.lineTo(mx, my);
    ctx.stroke();

    // Sol
    ctx.fillStyle = '#86efac';
    ctx.fillRect(mx, H - 40, plotW, 4);

    // Trajectoire 1 (tir tendu)
    if (traj1 && traj1.points.length > 1) {
      ctx.strokeStyle = '#0ea5e9';
      ctx.lineWidth = 2;
      ctx.setLineDash([]);
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
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
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

    // Cible (croix)
    const [cxc, cyc] = toCanvas(xC, yC);
    ctx.strokeStyle = '#ef4444';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(cxc - 10, cyc); ctx.lineTo(cxc + 10, cyc);
    ctx.moveTo(cxc, cyc - 10); ctx.lineTo(cxc, cyc + 10);
    ctx.stroke();
    ctx.fillStyle = '#ef4444';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('🎯', cxc + 5, cyc - 5);

    // Légendes
    if (traj1) {
      ctx.fillStyle = '#0ea5e9';
      ctx.font = '11px sans-serif';
      ctx.fillText(`α₁ = ${alpha1Deg?.toFixed(1)}°`, mx + 5, my + 15);
    }
    if (traj2) {
      ctx.fillStyle = '#a855f7';
      ctx.font = '11px sans-serif';
      ctx.fillText(`α₂ = ${alpha2Deg?.toFixed(1)}°`, mx + 5, my + 30);
    }
  }, [traj1, traj2, xC, yC, alpha1Deg, alpha2Deg]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* Sliders */}
        <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 space-y-4">
          <h4 className="font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2">
            <Crosshair className="w-4 h-4 text-red-500" /> Cible & vitesse
          </h4>
          {[
            { label: 'v₀ (m/s)', min: 10, max: 35, step: 0.5, value: v0, set: setV0, color: 'sky', unit: 'm/s' },
            { label: 'xC (distance cible)', min: 5, max: 35, step: 1, value: xC, set: setXC, color: 'orange', unit: 'm' },
            { label: 'yC (hauteur cible)', min: -2, max: 10, step: 0.5, value: yC, set: setYC, color: 'rose', unit: 'm' },
          ].map(s => (
            <div key={s.label}>
              <label className="text-sm text-slate-600 dark:text-slate-300 flex justify-between">
                <span>{s.label}</span>
                <span className={`font-mono text-${s.color}-600 font-bold`}>{s.value}{s.unit}</span>
              </label>
              <input type="range" min={s.min} max={s.max} step={s.step} value={s.value}
                onChange={e => s.set(Number(e.target.value))}
                className={`w-full accent-${s.color}-500`} />
            </div>
          ))}
        </div>

        {/* Canvas */}
        <div className="md:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-2 flex items-center justify-center">
          <canvas ref={canvasRef} width={480} height={260}
            className="w-full max-w-[480px] h-auto" />
        </div>
      </div>

      {/* Résolution */}
      <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-3 flex items-center gap-2">
          <ArrowRight className="w-4 h-4 text-sky-500" /> Résolution (équation en tan α)
        </h4>
        <div className="space-y-2">
          <MathRenderer
          content={`$$A = \\frac{g x_C^2}{2v_0^2} = \\frac{9{,}8 \\times ${xC}^2}{2 \\times ${v0}^2} = ${A.toFixed(3)}$$`}
        />
          <MathRenderer
          content={`$$A \\tan^2\\alpha - x_C \\tan\\alpha + (y_C + A) = 0$$`}
        />
          <MathRenderer
          content={`$$${A.toFixed(3)} \\tan^2\\alpha - ${xC} \\tan\\alpha + ${C.toFixed(3)} = 0$$`}
        />
          <MathRenderer
          content={`$$\\Delta = ${xC}^2 - 4 \\times ${A.toFixed(3)} \\times ${C.toFixed(3)} = ${disc.toFixed(3)}$$`}
        />
        </div>

        {disc >= 0 && alpha1Deg !== null && alpha2Deg !== null ? (
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="bg-sky-50 dark:bg-sky-950 rounded-xl p-3 border border-sky-200 dark:border-sky-800">
              <div className="text-xs text-sky-600 dark:text-sky-400 font-semibold">Tir tendu (petit α)</div>
              <div className="font-mono text-2xl font-bold text-sky-700 dark:text-sky-300 mt-1">
                α₁ = {alpha1Deg.toFixed(1)}°
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">tan α₁ = {tanAlpha1?.toFixed(3)}</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950 rounded-xl p-3 border border-purple-200 dark:border-purple-800">
              <div className="text-xs text-purple-600 dark:text-purple-400 font-semibold">Tir en cloche (grand α)</div>
              <div className="font-mono text-2xl font-bold text-purple-700 dark:text-purple-300 mt-1">
                α₂ = {alpha2Deg.toFixed(1)}°
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">tan α₂ = {tanAlpha2?.toFixed(3)}</div>
            </div>
          </div>
        ) : (
          <div className="mt-4 bg-red-50 dark:bg-red-950 rounded-xl p-4 border border-red-200 dark:border-red-800">
            <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-bold">Hors de portée — Augmentez v₀ !</span>
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400 mt-2">
              Δ &lt; 0 → la cible est inaccessible avec v₀ = {v0} m/s
            </div>
            <div className="mt-2">
              <MathRenderer
          content={`$$v_{0,\\min} = \\sqrt{g(y_C + \\sqrt{x_C^2 + y_C^2})} = ${v0Min.toFixed(2)} \\text{ m/s}$$`}
        />
            </div>
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
  const ranges = angles.map(a => {
    const r = computeTrajectory(v0, a, 0);
    return { alpha: a, xP: r.xP };
  });

  const maxRange = Math.max(...ranges.map(r => r.xP));

  return (
    <div className="space-y-4">
      {/* Slider v0 */}
      <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-4">
        <label className="text-sm text-slate-600 dark:text-slate-300 flex justify-between mb-2">
          <span className="font-semibold">Vitesse initiale v₀</span>
          <span className="font-mono text-sky-600 font-bold">{v0} m/s</span>
        </label>
        <input type="range" min={5} max={40} step={1} value={v0}
          onChange={e => setV0(Number(e.target.value))}
          className="w-full accent-sky-500" />
      </div>

      {/* Formule */}
      <div className="bg-sky-50 dark:bg-sky-950 rounded-xl p-4 border border-sky-200 dark:border-sky-800">
        <MathRenderer
          content={`$$x_P(\\alpha) = \\frac{v_0^2 \\sin 2\\alpha}{g} = \\frac{${v0}^2 \\sin 2\\alpha}{9{,}8}$$`}
        />
      </div>

      {/* Graphique barres */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
        <h4 className="font-semibold text-slate-700 dark:text-slate-200 mb-4 flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-sky-500" /> Portée xP selon l&apos;angle α (v₀ = {v0} m/s)
        </h4>
        <div className="overflow-x-auto">
          <svg viewBox={`0 0 700 300`} className="w-full" style={{ minWidth: '500px' }}>
            {/* Axe Y */}
            <line x1="60" y1="20" x2="60" y2="260" stroke="#94a3b8" strokeWidth="1.5" />
            <line x1="60" y1="260" x2="690" y2="260" stroke="#94a3b8" strokeWidth="1.5" />
            <text x="8" y="140" fontSize="11" fill="#64748b" transform="rotate(-90, 8, 140)" textAnchor="middle">xP (m)</text>

            {/* Graduations Y */}
            {[0, 25, 50, 75, 100].map(pct => {
              const y = 260 - (pct / 100) * 240;
              const val = (maxRange * pct) / 100;
              return (
                <g key={pct}>
                  <line x1="55" y1={y} x2="690" y2={y} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="4,4" />
                  <text x="52" y={y + 4} fontSize="10" fill="#94a3b8" textAnchor="end">{val.toFixed(0)}</text>
                </g>
              );
            })}

            {/* Barres */}
            {ranges.map((r, i) => {
              const barW = 44;
              const x = 70 + i * (barW + 2);
              const h = maxRange > 0 ? (r.xP / maxRange) * 240 : 0;
              const y = 260 - h;
              const is45 = r.alpha === 45;
              return (
                <g key={r.alpha}>
                  <rect
                    x={x} y={y} width={barW} height={h}
                    fill={is45 ? '#0ea5e9' : '#1e3a5f'}
                    rx={3}
                    opacity={is45 ? 1 : 0.75}
                  />
                  {/* Valeur sur barre */}
                  <text x={x + barW / 2} y={y - 4} fontSize="9" fill={is45 ? '#0ea5e9' : '#64748b'} textAnchor="middle" fontWeight={is45 ? 'bold' : 'normal'}>
                    {r.xP.toFixed(1)}
                  </text>
                  {/* Label angle */}
                  <text x={x + barW / 2} y={275} fontSize="10" fill={is45 ? '#0ea5e9' : '#94a3b8'} textAnchor="middle" fontWeight={is45 ? 'bold' : 'normal'}>
                    {r.alpha}°
                  </text>
                  {is45 && (
                    <text x={x + barW / 2} y={290} fontSize="9" fill="#0ea5e9" textAnchor="middle" fontWeight="bold">★</text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* Propriétés complémentaires */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-amber-50 dark:bg-amber-950 rounded-xl p-4 border border-amber-200 dark:border-amber-800">
          <div className="font-semibold text-amber-700 dark:text-amber-300 mb-2 flex items-center gap-2">
            <Zap className="w-4 h-4" /> Propriété clé : portée maximale
          </div>
          <MathRenderer
          content={`$$x_{P,\\max} = \\frac{v_0^2}{g} = \\frac{${v0}^2}{9{,}8} = ${(v0 * v0 / G).toFixed(2)} \\text{ m}$$`}
        />
          <div className="text-sm text-amber-700 dark:text-amber-300 mt-2">
            Atteinte à α = 45° (sin 2×45° = sin 90° = 1)
          </div>
        </div>
        <div className="bg-purple-50 dark:bg-purple-950 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
          <div className="font-semibold text-purple-700 dark:text-purple-300 mb-2 flex items-center gap-2">
            <Info className="w-4 h-4" /> Angles complémentaires
          </div>
          <MathRenderer
          content={`$$x_P(\\alpha) = x_P(90° - \\alpha)$$`}
        />
          <div className="text-sm text-purple-700 dark:text-purple-300 mt-2">
            Exemples : xP(30°) = xP(60°), xP(25°) = xP(65°)
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            {[[30, 60], [25, 65], [15, 75]].map(([a1, a2]) => {
              const r1 = ranges.find(r => r.alpha === a1);
              const r2 = ranges.find(r => r.alpha === a2);
              return (
                <div key={a1} className="bg-white dark:bg-purple-900 rounded p-2">
                  <span className="font-mono">{a1}°: {r1?.xP.toFixed(1)}m</span>
                  <span className="text-purple-400 mx-1">≈</span>
                  <span className="font-mono">{a2}°: {r2?.xP.toFixed(1)}m</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tableau */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800">
              <th className="px-4 py-2 text-left text-slate-600 dark:text-slate-300">Angle α</th>
              <th className="px-4 py-2 text-right text-slate-600 dark:text-slate-300">Portée xP (m)</th>
              <th className="px-4 py-2 text-right text-slate-600 dark:text-slate-300">% du max</th>
            </tr>
          </thead>
          <tbody>
            {ranges.map(r => (
              <tr key={r.alpha}
                className={`border-t border-slate-100 dark:border-slate-800 ${r.alpha === 45 ? 'bg-sky-50 dark:bg-sky-950 font-bold' : ''}`}>
                <td className={`px-4 py-2 ${r.alpha === 45 ? 'text-sky-700 dark:text-sky-300' : 'text-slate-700 dark:text-slate-300'}`}>
                  {r.alpha}° {r.alpha === 45 ? '★' : ''}
                </td>
                <td className="px-4 py-2 text-right font-mono text-slate-700 dark:text-slate-300">{r.xP.toFixed(2)}</td>
                <td className="px-4 py-2 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <div className="w-16 bg-slate-100 dark:bg-slate-700 rounded-full h-1.5">
                      <div
                        className={`h-1.5 rounded-full ${r.alpha === 45 ? 'bg-sky-500' : 'bg-slate-400'}`}
                        style={{ width: `${(r.xP / maxRange) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-500 dark:text-slate-400 w-10 text-right">
                      {((r.xP / maxRange) * 100).toFixed(0)}%
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================
export default function ProjectileInteractiveSimulator() {
  const [activeTab, setActiveTab] = useState<Atelier>('trajectoire');

  const tabs: { id: Atelier; label: string; icon: React.ReactNode; color: string }[] = [
    {
      id: 'trajectoire',
      label: 'Trajectoire',
      icon: <TrendingUp className="w-4 h-4" />,
      color: 'sky',
    },
    {
      id: 'obstacle',
      label: 'Franchissement',
      icon: <AlertTriangle className="w-4 h-4" />,
      color: 'orange',
    },
    {
      id: 'cible',
      label: 'Tir sur cible',
      icon: <Crosshair className="w-4 h-4" />,
      color: 'red',
    },
    {
      id: 'portees',
      label: 'Portées',
      icon: <BarChart2 className="w-4 h-4" />,
      color: 'purple',
    },
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
      {/* En-tête */}
      <div className="bg-gradient-to-r from-sky-600 to-indigo-600 p-5">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 rounded-xl p-2.5">
            <Target className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">
              Laboratoire Interactif — Projectile
            </h3>
            <p className="text-sky-100 text-sm mt-0.5">
              Simulez le mouvement d&apos;un projectile dans le champ de pesanteur uniforme
            </p>
          </div>
        </div>

        {/* Onglets */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-white text-sky-700 shadow-md'
                  : 'bg-white/15 text-white hover:bg-white/25'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Corps */}
      <div className="p-5">
        {activeTab === 'trajectoire' && <AtelierTrajectoire />}
        {activeTab === 'obstacle' && <AtelierObstacle />}
        {activeTab === 'cible' && <AtelierCible />}
        {activeTab === 'portees' && <AtelierPortees />}
      </div>

      {/* Pied */}
      <div className="bg-slate-50 dark:bg-slate-800 px-5 py-3 border-t border-slate-200 dark:border-slate-700">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Info className="w-3.5 h-3.5" />
          <span>Simulateur physique — g = 9,8 m/s² — Résistance de l&apos;air négligée</span>
        </div>
      </div>
    </div>
  );
}

