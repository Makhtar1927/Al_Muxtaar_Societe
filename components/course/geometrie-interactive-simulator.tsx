'use client';

import React, { useState, useMemo } from 'react';
import StudyIcon from '@/components/ui/study-icon';

export default function GeometrieInteractiveSimulator() {
  // Plan (P) : a*x + b*y + c*z + d = 0
  const [a, setA] = useState<number>(2);
  const [b, setB] = useState<number>(-2);
  const [c, setC] = useState<number>(1);
  const [d, setD] = useState<number>(5);

  // Point M (or Sphere center Omega)
  const [mx, setMx] = useState<number>(3);
  const [my, setMy] = useState<number>(1);
  const [mz, setMz] = useState<number>(0);

  // Sphere Radius R
  const [radiusR, setRadiusR] = useState<number>(5);

  // Calculations
  const results = useMemo(() => {
    const normN = Math.sqrt(a * a + b * b + c * c);
    if (normN === 0) return null;

    const numerator = a * mx + b * my + c * mz + d;
    const distance = Math.abs(numerator) / normN;

    // Projected point H: M - ( (a*mx + b*my + c*mz + d)/(normN^2) ) * n
    const k = -numerator / (normN * normN);
    const hx = mx + k * a;
    const hy = my + k * b;
    const hz = mz + k * c;

    // Sphere section
    let sphereStatus: 'cercle' | 'tangent' | 'vide' = 'vide';
    let circleRadius = 0;

    if (Math.abs(distance - radiusR) < 0.001) {
      sphereStatus = 'tangent';
    } else if (distance < radiusR) {
      sphereStatus = 'cercle';
      circleRadius = Math.sqrt(radiusR * radiusR - distance * distance);
    } else {
      sphereStatus = 'vide';
    }

    return {
      normN,
      numerator,
      distance,
      hx,
      hy,
      hz,
      k,
      sphereStatus,
      circleRadius,
    };
  }, [a, b, c, d, mx, my, mz, radiusR]);

  // Isometric 3D Projection into 2D SVG
  // 3D coordinates (X, Y, Z) projected:
  // screenX = originX + (X - Y) * cos(30°)
  // screenY = originY - Z + (X + Y) * sin(30°)
  const project3D = (x3d: number, y3d: number, z3d: number) => {
    const originX = 240;
    const originY = 170;
    const scale = 14;
    const angle = Math.PI / 6; // 30 deg

    const px = originX + (x3d - y3d) * Math.cos(angle) * scale;
    const py = originY - z3d * scale + (x3d + y3d) * Math.sin(angle) * scale * 0.65;
    return { x: px, y: py };
  };

  const pM = project3D(mx, my, mz);
  const pH = results ? project3D(results.hx, results.hy, results.hz) : { x: 0, y: 0 };
  const pOrigin = project3D(0, 0, 0);
  const pX = project3D(7, 0, 0);
  const pY = project3D(0, 7, 0);
  const pZ = project3D(0, 0, 7);

  // Plane corners in 3D around H
  const planeCorners = useMemo(() => {
    if (!results) return [];
    const hx = results.hx;
    const hy = results.hy;
    const hz = results.hz;

    // Vectors in plane
    const span = 4.5;
    return [
      project3D(hx - span, hy - span * 0.5, hz),
      project3D(hx + span, hy - span * 0.5, hz),
      project3D(hx + span, hy + span * 0.5, hz),
      project3D(hx - span, hy + span * 0.5, hz),
    ];
  }, [results]);

  return (
    <div className="bg-white rounded-2xl border border-navy/10 shadow-sm p-4 sm:p-6 mb-8">
      {/* Header Mobile First */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy/10 pb-4 mb-6">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2.5 rounded-xl bg-turquoise/10 text-turquoise shrink-0 mt-0.5 sm:mt-0">
            <StudyIcon name="courbe_fonction" size={24} />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-navy break-words">
              Laboratoire 3D Interactif : Plan, Distance &amp; Section de Sphère
            </h3>
            <p className="text-xs sm:text-sm text-navy/60">
              Modifiez l&apos;équation cartésienne, visualisez la projection orthogonale et la section sphérique
            </p>
          </div>
        </div>
        <span className="self-start sm:self-center px-3 py-1 bg-turquoise/10 text-turquoise text-xs font-semibold rounded-full shrink-0 whitespace-nowrap">
          Visualiseur 3D
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SVG 3D Canvas */}
        <div className="lg:col-span-7 bg-[#0B132B] rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden min-h-[340px]">
          <div className="w-full flex items-center justify-between mb-2 px-2 text-xs text-slate-300">
            <span>Projection Isométrique 3D de l&apos;espace</span>
            <span className="text-turquoise font-mono font-bold">
              (P) : {a}x {b >= 0 ? `+ ${b}y` : `- ${Math.abs(b)}y`}{' '}
              {c >= 0 ? `+ ${c}z` : `- ${Math.abs(c)}z`} {d >= 0 ? `+ ${d}` : `- ${Math.abs(d)}`} = 0
            </span>
          </div>

          <svg viewBox="0 0 480 340" className="w-full h-auto max-h-[330px]">
            {/* Coordinate Axes */}
            {/* X axis */}
            <line
              x1={pOrigin.x}
              y1={pOrigin.y}
              x2={pX.x}
              y2={pX.y}
              stroke="#475569"
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />
            <text x={pX.x + 6} y={pX.y + 4} fill="#64748B" fontSize="10" fontFamily="sans-serif">
              x
            </text>

            {/* Y axis */}
            <line
              x1={pOrigin.x}
              y1={pOrigin.y}
              x2={pY.x}
              y2={pY.y}
              stroke="#475569"
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />
            <text x={pY.x - 12} y={pY.y + 10} fill="#64748B" fontSize="10" fontFamily="sans-serif">
              y
            </text>

            {/* Z axis */}
            <line
              x1={pOrigin.x}
              y1={pOrigin.y}
              x2={pZ.x}
              y2={pZ.y}
              stroke="#475569"
              strokeWidth="1.5"
              strokeDasharray="2 2"
            />
            <text x={pZ.x} y={pZ.y - 6} fill="#64748B" fontSize="10" fontFamily="sans-serif">
              z
            </text>

            {/* Projected Plane Polygon (P) */}
            {planeCorners.length === 4 && (
              <polygon
                points={planeCorners.map((p) => `${p.x},${p.y}`).join(' ')}
                fill="#00F5D4"
                fillOpacity="0.18"
                stroke="#00F5D4"
                strokeWidth="1.5"
              />
            )}

            {/* Sphere Section Circle on the plane (if sphereStatus === 'cercle') */}
            {results && results.sphereStatus === 'cercle' && (
              <ellipse
                cx={pH.x}
                cy={pH.y}
                rx={results.circleRadius * 12}
                ry={results.circleRadius * 6}
                fill="#38BDF8"
                fillOpacity="0.3"
                stroke="#38BDF8"
                strokeWidth="1.5"
                strokeDasharray="3 2"
              />
            )}

            {/* Normal Vector n at H */}
            {results && (
              <line
                x1={pH.x}
                y1={pH.y}
                x2={pH.x + (a * 4)}
                y2={pH.y - (c * 6) + (b * 2)}
                stroke="#FBBF24"
                strokeWidth="2"
                markerEnd="url(#arrow)"
              />
            )}

            {/* Segment MH (Distance orthogonal line) */}
            <line
              x1={pM.x}
              y1={pM.y}
              x2={pH.x}
              y2={pH.y}
              stroke="#F43F5E"
              strokeWidth="2"
              strokeDasharray="4 3"
            />

            {/* Point M */}
            <circle cx={pM.x} cy={pM.y} r="6" fill="#F43F5E" stroke="#FFFFFF" strokeWidth="2" />
            <text
              x={pM.x + 8}
              y={pM.y - 6}
              fill="#F43F5E"
              fontSize="11"
              fontWeight="bold"
              fontFamily="sans-serif"
            >
              M({mx}, {my}, {mz})
            </text>

            {/* Projeté H */}
            {results && (
              <g>
                <circle cx={pH.x} cy={pH.y} r="5" fill="#00F5D4" stroke="#0B132B" strokeWidth="1.5" />
                <text
                  x={pH.x + 7}
                  y={pH.y + 14}
                  fill="#00F5D4"
                  fontSize="10"
                  fontWeight="bold"
                  fontFamily="sans-serif"
                >
                  H({results.hx.toFixed(1)}, {results.hy.toFixed(1)}, {results.hz.toFixed(1)})
                </text>
              </g>
            )}
          </svg>

          {/* Legend */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-2 text-[11px] text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F43F5E]" />
              <span>Point M ou Centre Ω</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00F5D4]" />
              <span>Projeté Orthogonal H</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-4 h-1 bg-[#00F5D4]/40 border border-[#00F5D4]" />
              <span>Plan (P)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#38BDF8]" />
              <span>Cercle de section</span>
            </div>
          </div>
        </div>

        {/* Right Controls & Live Results */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          {/* Real-time Math Summary */}
          {results && (
            <div className="space-y-3">
              {/* Distance Result */}
              <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-950 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-75 block">
                    Distance d(M, P)
                  </span>
                  <span className="text-xl font-bold font-mono">
                    d = {results.distance.toFixed(3)}
                  </span>
                </div>
                <span className="text-xs bg-rose-600 text-white px-2.5 py-1 rounded-full font-bold">
                  |ax+by+cz+d| / ||n||
                </span>
              </div>

              {/* Sphere Section Card */}
              <div
                className={`p-3.5 rounded-xl border ${
                  results.sphereStatus === 'cercle'
                    ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                    : results.sphereStatus === 'tangent'
                    ? 'bg-blue-50 border-blue-200 text-blue-950'
                    : 'bg-amber-50 border-amber-200 text-amber-950'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-75">
                    Section avec Sphère 𝒮(M, R = {radiusR})
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded font-bold ${
                      results.sphereStatus === 'cercle'
                        ? 'bg-emerald-600 text-white'
                        : results.sphereStatus === 'tangent'
                        ? 'bg-blue-600 text-white'
                        : 'bg-amber-600 text-white'
                    }`}
                  >
                    {results.sphereStatus === 'cercle'
                      ? 'Cercle de section'
                      : results.sphereStatus === 'tangent'
                      ? 'Plan Tangent'
                      : 'Intersection Vide'}
                  </span>
                </div>
                <p className="text-xs font-medium">
                  {results.sphereStatus === 'cercle' && (
                    <>
                      Rayon du cercle :{' '}
                      <span className="font-bold font-mono">
                        r = √(R² - d²) ≈ {results.circleRadius.toFixed(3)}
                      </span>
                    </>
                  )}
                  {results.sphereStatus === 'tangent' && (
                    <>Distance égale au rayon : d = R. Point de contact unique H.</>
                  )}
                  {results.sphereStatus === 'vide' && (
                    <>La distance d ({results.distance.toFixed(2)}) dépasse le rayon R ({radiusR}).</>
                  )}
                </p>
              </div>

              {/* Coordinates of H */}
              <div className="p-3 rounded-xl bg-navy/5 border border-navy/10 text-xs text-navy">
                <span className="text-[10px] uppercase font-bold text-navy/50 block mb-1">
                  Coordonnées du Projeté Orthogonal H
                </span>
                <p className="font-mono font-bold text-sm">
                  H({results.hx.toFixed(2)}, {results.hy.toFixed(2)}, {results.hz.toFixed(2)})
                </p>
              </div>

              {/* Sliders for Controls */}
              <div className="p-3 rounded-xl bg-navy/5 border border-navy/10 space-y-2 text-xs">
                <span className="font-bold text-navy block">Ajuster les coordonnées de M(x, y, z) :</span>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] text-navy/60 block">x = {mx}</label>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      step="1"
                      value={mx}
                      onChange={(e) => setMx(parseInt(e.target.value))}
                      className="w-full accent-navy"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-navy/60 block">y = {my}</label>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      step="1"
                      value={my}
                      onChange={(e) => setMy(parseInt(e.target.value))}
                      className="w-full accent-navy"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-navy/60 block">z = {mz}</label>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      step="1"
                      value={mz}
                      onChange={(e) => setMz(parseInt(e.target.value))}
                      className="w-full accent-navy"
                    />
                  </div>
                </div>

                <div className="pt-1">
                  <label className="text-[10px] text-navy/60 block">Rayon de la sphère R = {radiusR}</label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={radiusR}
                    onChange={(e) => setRadiusR(parseFloat(e.target.value))}
                    className="w-full accent-navy"
                  />
                </div>
              </div>

              {/* Décryptage Wolof */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/25 text-xs text-amber-950">
                <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
                  <span>🇸🇳</span>
                  <span>Xam-xam ci Wolof (Plan &amp; Sphère) :</span>
                </div>
                <p className="italic text-amber-900 leading-relaxed font-medium">
                  {results.sphereStatus === 'cercle'
                    ? `« Distance d(Ω, P) = ${results.distance.toFixed(2)} dafa gën a ndaw rayon R = ${radiusR}. Kon plan bi dog na sphère bi ci cercle bu am rayon r = ${results.circleRadius.toFixed(2)} ci théorème de Pythagore (d² + r² = R²). Projeté H(${results.hx.toFixed(1)}, ${results.hy.toFixed(1)}, ${results.hz.toFixed(1)}) mooy diggu cercle boobu ! »`
                    : results.sphereStatus === 'tangent'
                    ? `« Distance d(Ω, P) = ${results.distance.toFixed(2)} dafa yem ak rayon R = ${radiusR}. Plan bi dafay laal sphère bi rek ci benn point H(${results.hx.toFixed(1)}, ${results.hy.toFixed(1)}, ${results.hz.toFixed(1)}) (plan tangent) ! »`
                    : `« Distance d(Ω, P) = ${results.distance.toFixed(2)} dafa gën a mag rayon R = ${radiusR}. Plan bi sori na sphère bi lool, kenn laaluwul moroomam (intersection vide) ! »`}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
