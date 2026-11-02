'use client';

import React, { useState } from 'react';
import StudyIcon from '@/components/ui/study-icon';
import MathRenderer from '@/components/course/math-renderer';

interface AsympModel {
  id: string;
  name: string;
  typeBadge: string;
  expressionMd: string;
  asymptoteEquationMd: string;
  asymptoteType: 'oblique' | 'horizontale';
  fn: (x: number) => number;
  asympFn: (x: number) => number;
  minX: number;
  maxX: number;
  defaultX: number;
  step: number;
  comment: string;
  wolofTip: string;
}

const ASYMP_MODELS: AsympModel[] = [
  {
    id: 'rationnelle_oblique',
    name: 'f(x) = 2x - 1 + 3/(x - 1) (Bac S2 classique)',
    typeBadge: 'Asymptote Oblique',
    expressionMd: 'f(x) = 2x - 1 + \\dfrac{3}{x - 1}',
    asymptoteEquationMd: '(D) : y = 2x - 1',
    asymptoteType: 'oblique',
    fn: (x) => 2 * x - 1 + 3 / (x - 1),
    asympFn: (x) => 2 * x - 1,
    minX: 2,
    maxX: 40,
    defaultX: 4,
    step: 0.5,
    comment:
      'L\'écart $d(x) = f(x) - (2x - 1) = \\dfrac{3}{x - 1}$. Pour $x > 1$, $d(x) > 0$ : la courbe est **strictement au-dessus** de l\'asymptote $(D)$ et se rapproche à l\'infini car $\\lim_{x \\to +\\infty} \\frac{3}{x-1} = 0$.',
    wolofTip:
      '« Xoolal ni d(x) di néewee boo jëmee ci +∞ : 3/(x-1) day waajal a tollook 0. Ndax d(x) > 0, courbe bi mi ngi ci kaw droite bi saa su nekk ! »',
  },
  {
    id: 'homographique',
    name: 'g(x) = (3x - 1) / (x + 2) (Fonction homographique)',
    typeBadge: 'Asymptote Horizontale',
    expressionMd: 'g(x) = \\dfrac{3x - 1}{x + 2} = 3 - \\dfrac{7}{x + 2}',
    asymptoteEquationMd: '(\\Delta) : y = 3',
    asymptoteType: 'horizontale',
    fn: (x) => (3 * x - 1) / (x + 2),
    asympFn: () => 3,
    minX: 1,
    maxX: 50,
    defaultX: 5,
    step: 1,
    comment:
      'L\'écart $d(x) = g(x) - 3 = -\\dfrac{7}{x + 2}$. Pour $x > 0$, $d(x) < 0$ : la courbe est **strictement au-dessous** de l\'asymptote horizontale $y = 3$.',
    wolofTip:
      '« -7/(x+2) dafa négatif (< 0), moo tax courbe bi nekk ci suuf asymptote y = 3. Boo yokkee x, écart bi day gën a ndaw ba melni dafa laal droite bi ! »',
  },
  {
    id: 'exponentielle_oblique',
    name: 'h(x) = x + 2e⁻ˣ (Exponentielle décroissante)',
    typeBadge: 'Asymptote Oblique en +∞',
    expressionMd: 'h(x) = x + 2e^{-x}',
    asymptoteEquationMd: '(D) : y = x',
    asymptoteType: 'oblique',
    fn: (x) => x + 2 * Math.exp(-x),
    asympFn: (x) => x,
    minX: 0.5,
    maxX: 10,
    defaultX: 2,
    step: 0.25,
    comment:
      'L\'écart $d(x) = h(x) - x = 2e^{-x} > 0$ pour tout réel $x$. La courbe $\\mathcal{C}_h$ est **toujours au-dessus** de son asymptote oblique $y = x$. La vitesse d\'écrasement est ultra-rapide grâce à l\'exponentielle !',
    wolofTip:
      '« e⁻ˣ dafa gawa dëpp lool : boo jëlee x = 4 walla 5, courbe bi ak droite bi y = x dañuy melni benn yoon rekk ! »',
  },
];

export default function AsymptotesInteractiveSimulator() {
  const [selected, setSelected] = useState<AsympModel>(ASYMP_MODELS[0]);
  const [xVal, setXVal] = useState<number>(selected.defaultX);

  const fx = selected.fn(xVal);
  const asympY = selected.asympFn(xVal);
  const diff = fx - asympY;
  const absDiff = Math.abs(diff);

  const isAbove = diff > 0.0001;
  const isBelow = diff < -0.0001;
  const isVeryClose = absDiff < 0.05;

  return (
    <div className="my-6 rounded-3xl border-2 border-turquoise/30 bg-gradient-to-b from-white via-surface/30 to-surface/80 p-4 sm:p-6 shadow-md">
      {/* En-tête */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy/10 pb-3">
        <div>
          <span className="text-[10px] font-black uppercase tracking-wider text-turquoise bg-turquoise/15 px-2.5 py-0.5 rounded-full border border-turquoise/20">
            Laboratoire Interactif : Comportement Asymptotique
          </span>
          <h3 className="text-base sm:text-lg font-bold text-navy mt-1 flex items-center gap-2">
            <StudyIcon name="formule_cle" size={20} className="text-turquoise" />
            <span>Simulateur Tactile de Convergence vers l&apos;Asymptote</span>
          </h3>
        </div>
        <span className="text-xs font-semibold text-text/60 bg-white/80 px-2.5 py-1 rounded-lg border border-navy/10">
          Bac S2 Sénégal
        </span>
      </div>

      {/* Choix du modèle */}
      <div className="mt-4">
        <label className="text-xs font-bold uppercase tracking-wider text-navy/70 block mb-2">
          Sélectionner une fonction d&apos;examen :
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          {ASYMP_MODELS.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setSelected(m);
                setXVal(m.defaultX);
              }}
              className={`p-2.5 rounded-xl text-left border text-xs font-bold transition-all active:scale-95 ${
                selected.id === m.id
                  ? 'bg-navy text-white border-navy shadow-sm'
                  : 'bg-white text-navy/80 border-navy/15 hover:border-turquoise'
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-white/10 border border-white/20">
                  {m.typeBadge}
                </span>
              </div>
              <div className="font-extrabold truncate">{m.name.split(' (')[0]}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Équations en présence */}
      <div className="mt-4 bg-white rounded-2xl border border-navy/10 p-4 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-text/60">
            <MathRenderer content="Courbe de la fonction $\mathcal{C}_f$" />
          </div>
          <div className="mt-1">
            <MathRenderer content={`$${selected.expressionMd}$`} />
          </div>
        </div>
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-text/60">
            Équation de l&apos;asymptote
          </span>
          <div className="mt-1 font-bold text-turquoise">
            <MathRenderer content={`$${selected.asymptoteEquationMd}$`} />
          </div>
        </div>
      </div>

      {/* Slider tactile vers +infini */}
      <div className="mt-5 bg-gradient-to-r from-navy/5 to-turquoise/10 rounded-2xl p-4 sm:p-5 border border-navy/10">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <StudyIcon name="rigueur_compas" size={18} className="text-navy" />
            <span className="text-xs sm:text-sm font-bold text-navy flex items-center gap-1">
              Faire tendre <MathRenderer content="$x$" /> vers l&apos;infini :
            </span>
          </div>
          <span className="font-mono font-black text-sm sm:text-base px-3 py-1 rounded-lg bg-navy text-white shadow-inner">
            x = {xVal.toFixed(1)}
          </span>
        </div>

        <input
          type="range"
          min={selected.minX}
          max={selected.maxX}
          step={selected.step}
          value={xVal}
          onChange={(e) => setXVal(parseFloat(e.target.value))}
          className="w-full h-3 bg-navy/20 rounded-lg appearance-none cursor-pointer accent-turquoise my-2"
        />

        <div className="flex justify-between text-[11px] font-semibold text-text/60">
          <span>Départ : x = {selected.minX}</span>
          <span className="text-turquoise font-bold">
            Glissez vers la droite pour voir la courbe coller à la droite !
          </span>
          <span>Vers +∞ : x = {selected.maxX}</span>
        </div>
      </div>

      {/* Cartes dynamiques des valeurs */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Ordonnée de la courbe */}
        <div className="bg-white rounded-2xl border border-navy/10 p-3.5 text-center">
          <div className="text-[10px] font-bold uppercase tracking-wider text-text/50">
            <MathRenderer content="Point sur $\mathcal{C}_f$ : $f(x)$" />
          </div>
          <div className="mt-1 font-mono text-lg font-black text-navy">
            {fx.toFixed(3)}
          </div>
          <span className="text-[10px] text-text/60">Hauteur réelle</span>
        </div>

        {/* Ordonnée de l'asymptote */}
        <div className="bg-white rounded-2xl border border-navy/10 p-3.5 text-center">
          <div className="text-[10px] font-bold uppercase tracking-wider text-text/50">
            <MathRenderer content="Point sur la droite : $y_{asymp}$" />
          </div>
          <div className="mt-1 font-mono text-lg font-black text-turquoise">
            {asympY.toFixed(3)}
          </div>
          <span className="text-[10px] text-text/60">Hauteur asymptote</span>
        </div>

        {/* Écart d(x) = f(x) - y */}
        <div
          className={`rounded-2xl border p-3.5 text-center flex flex-col justify-center items-center transition-all ${
            isVeryClose
              ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
              : 'bg-white border-navy/15 text-navy'
          }`}
        >
          <div className="text-[10px] font-bold uppercase tracking-wider opacity-75">
            <MathRenderer content="Écart : $d(x) = f(x) - y$" />
          </div>
          <div className="mt-1 font-mono text-lg font-black">
            {diff >= 0 ? `+${diff.toFixed(4)}` : diff.toFixed(4)}
          </div>
          <span className="text-[10px] font-bold">
            {isVeryClose ? '🎯 Quasiment confondues !' : `Distance : ${absDiff.toFixed(4)}`}
          </span>
        </div>
      </div>

      {/* Position Relative Card */}
      <div className="mt-4 bg-navy/5 border border-navy/15 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <StudyIcon name="cle_solution" size={16} className="text-navy" />
          <span className="text-xs font-bold text-navy uppercase tracking-wider">
            Position Relative Déduite au Bac :
          </span>
        </div>
        <div className="bg-white rounded-xl p-3 border border-navy/10 text-sm font-semibold flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`w-3 h-3 rounded-full ${
                isAbove ? 'bg-emerald-500' : isBelow ? 'bg-rose-500' : 'bg-gray-400'
              }`}
            />
            <div className="flex-1">
              {isAbove ? (
                <div className="text-emerald-900 font-medium">
                  <MathRenderer content="La courbe $\mathcal{C}_f$ est **strictement au-dessus** de l'asymptote (car $d(x) > 0$)." />
                </div>
              ) : isBelow ? (
                <div className="text-rose-900 font-medium">
                  <MathRenderer content="La courbe $\mathcal{C}_f$ est **strictement au-dessous** de l'asymptote (car $d(x) < 0$)." />
                </div>
              ) : (
                <div className="text-navy font-medium">
                  <MathRenderer content="Intersection de la courbe $\mathcal{C}_f$ et de l'asymptote ($d(x) = 0$)." />
                </div>
              )}
            </div>
          </div>
          <div className="text-xs font-bold text-text/50 shrink-0">
            <MathRenderer content="$\lim_{x \to +\infty} |d(x)| = 0$" />
          </div>
        </div>
      </div>

      {/* Commentaire Pédagogique */}
      <div className="mt-4 bg-turquoise/5 border border-turquoise/20 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-1">
          <StudyIcon name="conseil_professeur" size={16} className="text-turquoise" />
          <span className="text-xs font-bold text-turquoise uppercase tracking-wider">
            Conseil de l&apos;Office du Bac pour le tracé :
          </span>
        </div>
        <MathRenderer content={selected.comment} />
      </div>

      {/* Décryptage Wolof */}
      <div className="mt-4 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-950">
        <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
          <span>🇸🇳</span>
          <span>Xam-xam ci Wolof (Asymptote ak Espace bi ci diggante bi) :</span>
        </div>
        <p className="italic text-amber-900 leading-relaxed font-medium">
          {selected.wolofTip}
        </p>
      </div>
    </div>
  );
}
