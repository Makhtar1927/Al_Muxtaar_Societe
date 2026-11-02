'use client';

import React, { useState } from 'react';
import StudyIcon from '@/components/ui/study-icon';
import MathRenderer from '@/components/course/math-renderer';

interface TviFunction {
  id: string;
  name: string;
  expression: string;
  a: number;
  b: number;
  exactAlpha: number;
  fn: (x: number) => number;
  derivativeSign: 'croissante' | 'décroissante';
  comment: string;
  wolofTip: string;
}

const TVI_FUNCTIONS: TviFunction[] = [
  {
    id: 'bac2023',
    name: 'f(x) = x³ + 3x - 2 (Bac 2023 S2)',
    expression: 'x^3 + 3x - 2',
    a: 0,
    b: 1,
    exactAlpha: 0.596,
    fn: (x: number) => Math.pow(x, 3) + 3 * x - 2,
    derivativeSign: 'croissante',
    comment: 'f\'(x) = 3x² + 3 > 0 pour tout x : f est strictement croissante sur [0, 1].',
    wolofTip: '« Xoolal fi : boo dëgmale 0,59, f(x) day waajal a tollook 0. Ci Bac 2023, su ñu la laajee encadrement ci 10⁻¹, dangay wax 0,5 < α < 0,6 ndax f(0,5) < 0 te f(0,6) > 0 ! »',
  },
  {
    id: 'poly3',
    name: 'g(x) = x³ - 3x - 1 sur [1, 2]',
    expression: 'x^3 - 3x - 1',
    a: 1,
    b: 2,
    exactAlpha: 1.879,
    fn: (x: number) => Math.pow(x, 3) - 3 * x - 1,
    derivativeSign: 'croissante',
    comment: 'g\'(x) = 3(x² - 1) > 0 sur ]1, 2] : g est strictement croissante.',
    wolofTip: '« Bu f(x) < 0, xam nga ne α mi ngi ci kanam (ndeyjoor). Bu f(x) > 0, mi ngi ci ginaaw (cammooñ). Pexe boobu mooy balayage ! »',
  },
  {
    id: 'trigo',
    name: 'h(x) = x - cos(x) sur [0, 1]',
    expression: 'x - \\cos(x)',
    a: 0,
    b: 1,
    exactAlpha: 0.739,
    fn: (x: number) => x - Math.cos(x),
    derivativeSign: 'croissante',
    comment: 'h\'(x) = 1 + sin(x) > 0 : h est strictement croissante sur [0, 1].',
    wolofTip: '« Cosinus ak x ñoo lëjaloo : bala 0,74 yangi ci suuf, ginaaw 0,74 yangi ci kaw. Ci 0,739 rek lañuy yem ! »',
  },
];

export default function TviInteractiveSimulator() {
  const [selectedFunc, setSelectedFunc] = useState<TviFunction>(TVI_FUNCTIONS[0]);
  const [testPoint, setTestPoint] = useState<number>(0.5);

  const fa = selectedFunc.fn(selectedFunc.a);
  const fb = selectedFunc.fn(selectedFunc.b);
  const fx = selectedFunc.fn(testPoint);
  const distanceToAlpha = Math.abs(testPoint - selectedFunc.exactAlpha);

  return (
    <div className="my-6 rounded-3xl border-2 border-turquoise/30 bg-gradient-to-b from-white via-surface/30 to-surface/80 p-4 sm:p-6 shadow-md">
      {/* En-tête */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy/10 pb-3">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-turquoise bg-turquoise/15 px-2.5 py-0.5 rounded-full border border-turquoise/20">
            Laboratoire Interactif TVI
          </span>
          <h3 className="text-base sm:text-lg font-black text-navy mt-1 flex items-center gap-2">
            <StudyIcon name="courbe_fonction" size={22} />
            <span>Simulateur Tactile du Théorème de la Bijection</span>
          </h3>
        </div>
        <div className="text-xs font-semibold text-text/60">
          <MathRenderer content="Recherche de la racine $\alpha$" />
        </div>
      </div>

      {/* Sélection de la fonction */}
      <div className="my-4">
        <label className="block text-xs font-bold text-navy/70 mb-1.5 uppercase tracking-wider">
          Choisissez une fonction type Bac S2 :
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {TVI_FUNCTIONS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => {
                setSelectedFunc(f);
                setTestPoint(Number(((f.a + f.b) / 2).toFixed(2)));
              }}
              className={`p-2.5 rounded-2xl text-xs font-bold text-left transition-all border ${
                selectedFunc.id === f.id
                  ? 'bg-navy text-white border-navy shadow-sm'
                  : 'bg-white hover:bg-surface text-navy/80 border-navy/10'
              }`}
            >
              <div className="truncate">{f.name}</div>
              <div className="text-[10px] opacity-75 mt-0.5">
                Intervalle : [{f.a}, {f.b}]
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Analyse des 3 conditions du TVI en temps réel */}
      <div className="p-4 rounded-2xl bg-white border border-navy/10 shadow-sm space-y-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
          <div className="p-2.5 rounded-xl bg-surface">
            <span className="text-[10px] font-bold text-text/50 uppercase block">Borne a = {selectedFunc.a}</span>
            <span className="text-xs sm:text-sm font-mono font-black text-rose-600">
              f({selectedFunc.a}) = {fa.toFixed(2)}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-surface">
            <span className="text-[10px] font-bold text-text/50 uppercase block">Borne b = {selectedFunc.b}</span>
            <span className="text-xs sm:text-sm font-mono font-black text-emerald-600">
              f({selectedFunc.b}) = {fb.toFixed(2)}
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-surface">
            <span className="text-[10px] font-bold text-text/50 uppercase block">Produit f(a)×f(b)</span>
            <span className="text-xs sm:text-sm font-mono font-black text-navy">
              {(fa * fb).toFixed(2)} &lt; 0 ✓
            </span>
          </div>

          <div className="p-2.5 rounded-xl bg-turquoise/10 border border-turquoise/30">
            <span className="text-[10px] font-bold text-turquoise uppercase block">Racine exacte α</span>
            <span className="text-xs sm:text-sm font-mono font-black text-turquoise">
              α ≈ {selectedFunc.exactAlpha}
            </span>
          </div>
        </div>

        {/* Curseur tactile de balayage */}
        <div className="mt-4 pt-2 border-t border-navy/10 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold text-navy">
            <div className="flex items-center gap-1">
              <span>Balayez avec votre doigt pour tester</span>
              <MathRenderer content="$x$" /> :
            </div>
            <span className="font-mono text-sm px-2 py-0.5 rounded-lg bg-navy text-white">
              x = {testPoint.toFixed(2)}
            </span>
          </div>

          <input
            type="range"
            min={selectedFunc.a}
            max={selectedFunc.b}
            step={0.01}
            value={testPoint}
            onChange={(e) => setTestPoint(Number(e.target.value))}
            className="w-full h-2.5 bg-navy/10 rounded-lg appearance-none cursor-pointer accent-turquoise"
          />

          <div className="flex items-center justify-between text-[11px] font-mono text-text/50">
            <span>a = {selectedFunc.a}</span>
            <span className="font-bold text-turquoise">
              Écart avec α : {distanceToAlpha < 0.03 ? '🎯 ÉCART MINIMAL (Proche de α !)' : `${distanceToAlpha.toFixed(3)}`}
            </span>
            <span>b = {selectedFunc.b}</span>
          </div>
        </div>

        {/* Résultat dynamique du point testé */}
        <div className={`p-3.5 rounded-2xl border transition-all ${
          distanceToAlpha < 0.03
            ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
            : fx < 0
              ? 'bg-rose-50/70 border-rose-200 text-rose-950'
              : 'bg-cyan-50/70 border-cyan-200 text-cyan-950'
        }`}>
          <div className="flex items-center justify-between gap-2">
            <div className="text-xs font-bold">
              <MathRenderer content={`Pour $x = ${testPoint.toFixed(2)}$ :`} />
            </div>
            <span className="text-xs sm:text-sm font-mono font-black">
              f({testPoint.toFixed(2)}) = {fx.toFixed(3)} {fx < 0 ? '(< 0)' : '(> 0)'}
            </span>
          </div>
          <div className="text-xs mt-1 leading-snug">
            {distanceToAlpha < 0.03 ? (
              <div className="font-bold text-emerald-700">
                <MathRenderer content="✓ Bravo ! Vous êtes au voisinage immédiat de la solution $\alpha$. C'est exactement la méthode de balayage demandée au Baccalauréat." />
              </div>
            ) : fx < 0 ? (
              <div>
                <MathRenderer content={`Puisque $f(x) < 0$, la racine $\\alpha$ est située **à droite** de ${testPoint.toFixed(2)} (car $f$ est strictement croissante).`} />
              </div>
            ) : (
              <div>
                <MathRenderer content={`Puisque $f(x) > 0$, la racine $\\alpha$ est située **à gauche** de ${testPoint.toFixed(2)}.`} />
              </div>
            )}
          </div>
        </div>

        {/* Décryptage Wolof */}
        <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-950">
          <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-0.5">
            <span>🇸🇳</span>
            <span>Xam-xam ci Wolof (Pexe ngir wër α) :</span>
          </div>
          <p className="italic text-amber-900 leading-relaxed font-medium">
            {selectedFunc.wolofTip}
          </p>
        </div>
      </div>
    </div>
  );
}

