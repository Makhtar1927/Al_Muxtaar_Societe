'use client';

import React, { useState } from 'react';

const COMMON_ANGLES = [
  { deg: 0, rad: '0', cos: '1', sin: '0' },
  { deg: 30, rad: 'π/6', cos: '√3/2', sin: '1/2' },
  { deg: 45, rad: 'π/4', cos: '√2/2', sin: '√2/2' },
  { deg: 60, rad: 'π/3', cos: '1/2', sin: '√3/2' },
  { deg: 90, rad: 'π/2', cos: '0', sin: '1' },
  { deg: 120, rad: '2π/3', cos: '-1/2', sin: '√3/2' },
  { deg: 135, rad: '3π/4', cos: '-√2/2', sin: '√2/2' },
  { deg: 150, rad: '5π/6', cos: '-√3/2', sin: '1/2' },
  { deg: 180, rad: 'π', cos: '-1', sin: '0' },
  { deg: 270, rad: '3π/2', cos: '0', sin: '-1' },
];

export default function TrigCircle() {
  const [deg, setDeg] = useState(45);

  const rad = (deg * Math.PI) / 180;
  const cosVal = Math.cos(rad);
  const sinVal = Math.sin(rad);

  const size = 280;
  const center = size / 2;
  const radius = 100;

  const pointX = center + radius * cosVal;
  const pointY = center - radius * sinVal; // SVG y is inverted

  // Check if current degree matches a common angle
  const matched = COMMON_ANGLES.find((a) => a.deg === deg);

  return (
    <div className="bg-white rounded-2xl border border-navy/10 p-5 shadow-sm space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy/10 pb-3">
        <div>
          <h3 className="font-bold text-navy text-base flex items-center gap-2">
            <span>📐</span> Cercle Trigonométrique Interactif
          </h3>
          <p className="text-xs text-text/60">
            Faites glisser l&apos;angle pour observer les valeurs du cosinus et du sinus.
          </p>
        </div>
        <div className="text-right">
          <span className="text-lg font-black text-turquoise">{deg}°</span>
          <span className="text-xs text-text/50 ml-1.5">
            ({matched ? matched.rad : `${((deg / 180) * Math.PI).toFixed(2)} rad`})
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        {/* SVG Circle */}
        <div className="flex justify-center">
          <svg width={size} height={size} className="overflow-visible select-none">
            {/* Axes */}
            <line
              x1={center - radius - 20}
              y1={center}
              x2={center + radius + 20}
              y2={center}
              stroke="#243447"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />
            <line
              x1={center}
              y1={center - radius - 20}
              x2={center}
              y2={center + radius + 20}
              stroke="#243447"
              strokeWidth="1.5"
              strokeDasharray="3 3"
            />

            {/* Labels Axes */}
            <text x={center + radius + 25} y={center + 4} fontSize="11" fill="#243447" fontWeight="bold">cos</text>
            <text x={center - 4} y={center - radius - 25} fontSize="11" fill="#243447" fontWeight="bold">sin</text>

            {/* Main Circle */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#00B8A9"
              strokeWidth="2.5"
            />

            {/* Projections */}
            {/* cos projection (blue horizontal) */}
            <line
              x1={center}
              y1={center}
              x2={pointX}
              y2={center}
              stroke="#243447"
              strokeWidth="3"
            />
            {/* sin projection (red vertical) */}
            <line
              x1={pointX}
              y1={center}
              x2={pointX}
              y2={pointY}
              stroke="#F0654C"
              strokeWidth="2"
              strokeDasharray="4 2"
            />

            {/* Radius line */}
            <line
              x1={center}
              y1={center}
              x2={pointX}
              y2={pointY}
              stroke="#00B8A9"
              strokeWidth="2"
            />

            {/* Point M */}
            <circle cx={pointX} cy={pointY} r="6" fill="#F7B731" stroke="#243447" strokeWidth="2" />
          </svg>
        </div>

        {/* Real-time Values & Quick Angles */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-surface border border-navy/10">
              <span className="text-[11px] font-bold text-navy/60 uppercase">cos(θ)</span>
              <p className="text-xl font-black text-navy mt-0.5">
                {matched ? matched.cos : cosVal.toFixed(3)}
              </p>
              <span className="text-[10px] text-text/50">≈ {cosVal.toFixed(3)}</span>
            </div>
            <div className="p-3 rounded-xl bg-surface border border-navy/10">
              <span className="text-[11px] font-bold text-coral uppercase">sin(θ)</span>
              <p className="text-xl font-black text-coral mt-0.5">
                {matched ? matched.sin : sinVal.toFixed(3)}
              </p>
              <span className="text-[10px] text-text/50">≈ {sinVal.toFixed(3)}</span>
            </div>
          </div>

          {/* Slider */}
          <div>
            <label className="flex justify-between text-xs font-semibold text-navy mb-1">
              <span>Angle θ : {deg}°</span>
              <span className="text-turquoise">0° → 360°</span>
            </label>
            <input
              type="range"
              min="0"
              max="360"
              step="5"
              value={deg}
              onChange={(e) => setDeg(Number(e.target.value))}
              className="w-full h-2 bg-navy/10 rounded-lg appearance-none cursor-pointer accent-turquoise"
            />
          </div>

          {/* Common angles presets */}
          <div>
            <span className="text-[11px] font-semibold text-text/60 block mb-2">
              Angles remarquables Bac S2 :
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[0, 30, 45, 60, 90, 120, 135, 180].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDeg(d)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                    deg === d
                      ? 'bg-turquoise text-white'
                      : 'bg-surface border border-navy/10 text-navy hover:bg-navy/5'
                  }`}
                >
                  {d}°
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

