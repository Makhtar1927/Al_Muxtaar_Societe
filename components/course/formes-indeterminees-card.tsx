'use client';

import React, { useState } from 'react';

export default function FormesIndetermineesCard() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const METHODES = [
    {
      num: 1,
      title: 'Factorisation du Terme Prépondérant',
      when: 'En ±∞ pour les polynômes et fractions rationnelles',
      formule: 'x^n (a + b/x + c/x^2 + ...)',
      exemple: 'lim (3x² - 5x + 2) / (2x² + 1) = lim (3x²)/(2x²) = 3/2 en +∞',
      astuce: 'Ne factorisez que les termes de plus haut degré au numérateur et au dénominateur.',
      wolof: '« Ci ±∞, mbeur mi gën a mag ci kaw (x^n) ak bi gën a mag ci suuf (x^m) ñoo ciy joxe ndam li. Terme yu ndaw yi dañuy dëpp ndax puissance bu mag bi dafa leen ëpp doole lool ! »',
      vieReelle: 'Regarder un gratte-ciel de 100 étages : les petits cailloux au sol ne comptent plus dans la hauteur totale. À l\'infini, seul le monôme dominant dicte la limite.',
    },
    {
      num: 2,
      title: 'Expression Conjuguée',
      when: 'Présence de radicaux √(A) - B conduisant à "+∞ - ∞" ou "0/0"',
      formule: '(√(A) - B)(√(A) + B) = A - B²',
      exemple: 'lim (√(x+4) - 2) / x en 0 : multipliez haut et bas par (√(x+4) + 2) ⟹ 1/4',
      astuce: 'Très fréquent aux sessions 2021, 2023 et 2024 du Bac S2 au Sénégal.',
      wolof: '« Boo gisee racine carrée √ te mu doon soustraction (+∞ - ∞), foofu doole yi dañuy xëccoo. Dangay jël quantité conjuguée (√(A) + B) nga faf ko ci kaw ak ci suuf ngir dindi racine bi ba li leen tëj feeñ ! »',
      vieReelle: 'Déverrouiller une porte bloquée : l\'identité remarquable (A-B)(A+B) = A² - B² fait sauter la racine carrée qui empêchait la simplification par (x - a).',
    },
    {
      num: 3,
      title: 'Taux de Variation (Nombre Dérivé)',
      when: 'Formes "0/0" avec fonctions trigonométriques en 0',
      formule: 'lim [f(x) - f(x₀)] / (x - x₀) = f\'(x₀)',
      exemple: 'lim (sin x) / x = sin\'(0) = cos(0) = 1 quand x → 0',
      astuce: 'Pensez à poser X = ax si l\'argument du sinus est ax.',
      wolof: '« Forme 0/0 buy dellu ci trigonometrie ci 0, bu ko xeeñ ci calcul bu gawaan. Xoolal ko naka dérivée ci bérab 0 : lim (sin x - sin 0)/(x - 0) = cos(0) = 1 ! »',
      vieReelle: 'Mesurer la vitesse instantanée d\'une moto au millième de seconde près au démarrage plutôt que sur un long trajet.',
    },
  ];

  return (
    <div className="my-6 rounded-3xl border border-navy/15 bg-white p-4 sm:p-6 shadow-sm">
      {/* En-tête */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy/10 pb-3">
        <h3 className="text-base sm:text-lg font-black text-navy flex items-center gap-2">
          <span>🎯</span>
          <span>Fiche Réflexe Bac : Les 4 Formes Indéterminées</span>
        </h3>
        <span className="text-[11px] font-bold text-turquoise bg-turquoise/10 px-2.5 py-0.5 rounded-full">
          Terminale S2
        </span>
      </div>

      {/* Les 4 FI bien visibles en cartes mobiles */}
      <div className="mt-4">
        <p className="text-xs font-bold text-rose-800 uppercase tracking-wider mb-2">
          Les 4 seules formes indéterminées :
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-2.5 text-center">
            <span className="block text-base sm:text-lg font-black text-rose-700 font-mono">0 / 0</span>
            <span className="text-[10px] text-rose-600 font-semibold">Taux / Factorisation</span>
          </div>
          <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-2.5 text-center">
            <span className="block text-base sm:text-lg font-black text-rose-700 font-mono">∞ / ∞</span>
            <span className="text-[10px] text-rose-600 font-semibold">Plus haut degré</span>
          </div>
          <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-2.5 text-center">
            <span className="block text-base sm:text-lg font-black text-rose-700 font-mono">0 × ∞</span>
            <span className="text-[10px] text-rose-600 font-semibold">Inverser en quotient</span>
          </div>
          <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-2.5 text-center">
            <span className="block text-base sm:text-lg font-black text-rose-700 font-mono">+∞ - ∞</span>
            <span className="text-[10px] text-rose-600 font-semibold">Conjuguée / Factoriser</span>
          </div>
        </div>
      </div>

      {/* Les 3 Réflexes Officiels - Onglets tactiles adaptés pour smartphone */}
      <div className="mt-6 pt-4 border-t border-navy/10">
        <p className="text-xs font-bold text-navy uppercase tracking-wider mb-3">
          Les 3 Réflexes pour lever l&apos;indétermination :
        </p>
        <div className="flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
          {METHODES.map((m, idx) => (
            <button
              key={m.num}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border shrink-0 ${
                activeTab === idx
                  ? 'border-turquoise bg-turquoise text-white shadow-sm'
                  : 'border-navy/10 bg-surface/60 text-navy hover:bg-surface'
              }`}
            >
              {m.num}. {m.title.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Détail de la méthode sélectionnée */}
        <div className="mt-3 rounded-2xl bg-surface/70 border border-navy/10 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-turquoise text-white text-xs font-black flex items-center justify-center shrink-0">
              {METHODES[activeTab].num}
            </span>
            <h4 className="font-extrabold text-navy text-sm sm:text-base">
              {METHODES[activeTab].title}
            </h4>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-white rounded-xl p-3 border border-navy/5">
              <span className="text-navy/60 font-semibold block mb-1">Quand l&apos;utiliser ?</span>
              <p className="text-navy font-medium leading-relaxed">
                {METHODES[activeTab].when}
              </p>
            </div>
            <div className="bg-white rounded-xl p-3 border border-navy/5">
              <span className="text-navy/60 font-semibold block mb-1">Formule clé :</span>
              <p className="font-mono font-bold text-turquoise">
                {METHODES[activeTab].formule}
              </p>
            </div>
          </div>

          <div className="bg-emerald-50/90 rounded-xl p-3 border border-emerald-200 text-xs text-emerald-950">
            <span className="font-bold text-emerald-800 block mb-1">Exemple type Bac :</span>
            <p className="font-mono text-emerald-900 leading-relaxed">
              {METHODES[activeTab].exemple}
            </p>
          </div>

          {/* Décodage en Wolof */}
          <div className="bg-amber-500/10 rounded-xl p-3 border border-amber-500/25 text-xs text-amber-950">
            <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
              <span>🇸🇳</span>
              <span>Xam-xam ci Wolof (Décodage) :</span>
            </div>
            <p className="italic text-amber-900 leading-relaxed font-medium">
              {METHODES[activeTab].wolof}
            </p>
          </div>

          {/* Illustration de la Vie Réelle */}
          <div className="bg-indigo-50/90 rounded-xl p-3 border border-indigo-200 text-xs text-indigo-950">
            <div className="flex items-center gap-1.5 font-bold text-indigo-900 mb-1">
              <span>🌍</span>
              <span>Illustration Concrète :</span>
            </div>
            <p className="text-indigo-900 leading-relaxed">
              {METHODES[activeTab].vieReelle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

