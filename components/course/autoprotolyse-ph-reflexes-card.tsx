'use client';

import React, { useState } from 'react';
import MathRenderer from '@/components/course/math-renderer';
import { Target, Lightbulb, AlertTriangle, CheckCircle, Sparkles, Droplets } from 'lucide-react';

export default function AutoprotolysePhReflexesCard() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const REFLEXES = [
    {
      num: 1,
      title: "Autoprotolyse de l'eau & Produit Ionique Ke",
      badge: 'Équilibre Fondamental',
      formule: '2\\,\\text{H}_2\\text{O} \\rightleftharpoons \\text{H}_3\\text{O}^+ + \\text{OH}^-, \\quad K_e = [\\text{H}_3\\text{O}^+][\\text{OH}^-] = 10^{-14} \\text{ à } 25^\\circ\\text{C}',
      regleBac:
        "L'eau pure subit une ionisation partielle très faible appelée autoprotolyse. Le produit ionique Ke dépend UNIQUEMENT de la température.",
      explication:
        "1. À 25 °C, Ke = 1,0 × 10⁻¹⁴, donc pKe = -log(Ke) = 14,0.\n2. L'autoprotolyse est une réaction **endothermique** (ΔH > 0) : d'après la loi de van 't Hoff, si la température augmente, l'équilibre se déplace dans le sens direct.\n3. Par conséquent : quand T augmente, Ke augmente et pKe diminue (ex: à 60 °C, Ke ≈ 10⁻¹³ et pKe ≈ 13,0).",
      wolof:
        "« Ndox mu sell mi (eau pure) dafay xàjjikoo ci boppam tuuti def ay ions H₃O⁺ ak OH⁻. Produkt bi Ke dafa dépendre ci safara gi (température) rekk : bu tàngaay bi yéegee, Ke day yokku, pKe di wàññiku ! »",
      piege:
        "Ne confondez jamais Ke et pKe ! Quand la température augmente, Ke AUGMENTE mais pKe DIMINUE (car pKe = -log Ke).",
    },
    {
      num: 2,
      title: "Neutralité d'une Solution : Le Piège d'Or du Bac S2",
      badge: 'Piège Majeur Bac',
      formule: '\\text{Solution neutre } \\iff [\\text{H}_3\\text{O}^+] = [\\text{OH}^-] = \\sqrt{K_e} \\implies \\text{pH}_\\text{neutre} = \\frac{1}{2}\\,pK_e',
      regleBac:
        "Une solution est neutre si et seulement si [H₃O⁺] = [OH⁻]. Dire que la neutralité correspond TOUJOURS à pH = 7 est FAUX !",
      explication:
        "1. À 25 °C : pKe = 14,0 => pH_neutre = 7,0.\n2. À 60 °C : pKe = 13,0 => pH_neutre = 6,5.\n3. **Question classique du Bac S2** : À 60 °C, une eau pure a un pH de 6,5. Est-elle acide ?\n**Réponse officielle** : NON, elle est strictement NEUTRE car elle ne contient aucun acide et [H₃O⁺] = [OH⁻] = 10⁻⁶'⁵ mol/L.",
      wolof:
        "« Lii mooy njuumte bi gën a bare ci Bac S2 ! Ndox mu neutre du pH = 7 waxtu wu nekk ! Dafa dépendre ci tàngaay bi. Ci 60 °C, ndox mu neutre pH = 6,5 la am waaye neutre la ba tey ndax [H₃O⁺] = [OH⁻] ! »",
      piege:
        "Au Bac S2, ne justifiez JAMAIS la neutralité par « le pH vaut 7 » ! Justifiez TOUJOURS par l'égalité des concentrations : [H₃O⁺] = [OH⁻] = √(Ke).",
    },
    {
      num: 3,
      title: "Définition du pH & Domaine de Validité",
      badge: 'Formules Clés',
      formule: '\\text{pH} = -\\log[\\text{H}_3\\text{O}^+] \\iff [\\text{H}_3\\text{O}^+] = 10^{-\\text{pH}} \\quad (\\text{pour } [\\text{H}_3\\text{O}^+] \\le 0{,}1\\text{ mol/L})',
      regleBac:
        "Le pH mesure l'activité des ions oxonium en solution aqueuse diluée. Le nombre de décimales du pH correspond au nombre de chiffres significatifs de la concentration.",
      explication:
        "1. Échelle à 25 °C : Solution acide si pH < 7 ; neutre si pH = 7 ; basique si pH > 7.\n2. Relation fondamentale à toute température : pH + pOH = pKe.\n3. Si pH = 3,40 (2 décimales), alors [H₃O⁺] = 10⁻³'⁴⁰ = 4,0 × 10⁻⁴ mol/L (2 chiffres significatifs).\n4. Au-delà de C = 0,1 mol/L, la formule usuelle n'est plus rigoureuse car les interactions électrostatiques modifient le coefficient d'activité.",
      wolof:
        "« pH dafay natt acidité ndox mi ci log. Bu pH wàññikoo, acidité bi day yokku. Boo gisee [H₃O⁺] = 10⁻⁴, xamal ni pH bi 4 la. pH + pOH = 14 ci 25 °C waxtu wu nekk ! »",
      piege:
        "Attention aux chiffres significatifs au Bac : la partie entière du pH indique l'ordre de grandeur, seules les décimales comptent comme chiffres significatifs !",
    },
    {
      num: 4,
      title: "Indicateurs Colorés & Zone de Virage",
      badge: 'Méthode Expérimentale',
      formule: '\\text{HIn} + \\text{H}_2\\text{O} \\rightleftharpoons \\text{In}^- + \\text{H}_3\\text{O}^+, \\quad \\text{Zone de virage} : [pK_i - 1 \\,;\\, pK_i + 1]',
      regleBac:
        "Un indicateur coloré acido-basique est un couple acide/base faible dont la forme acide HIn et la forme basique In⁻ ont des couleurs nettement différentes.",
      explication:
        "1. Si pH < pKi - 1 : [HIn] ≥ 10 [In⁻], la couleur de la forme acide HIn s'impose à l'œil.\n2. Si pH > pKi + 1 : [In⁻] ≥ 10 [HIn], la couleur de la forme basique In⁻ s'impose.\n3. Si pKi - 1 ≤ pH ≤ pKi + 1 : c'est la **zone de virage**, l'œil perçoit la **teinte sensible** (mélange des deux couleurs).\n4. Les 3 indicateurs incontournables du Bac S2 :\n   - **Hélianthine** (pKi = 3,7) : Rouge (pH < 3,1) / Teinte orangée / Jaune (pH > 4,4).\n   - **Bleu de bromothymol (BBT)** (pKi = 7,0) : Jaune (pH < 6,0) / Vert / Bleu (pH > 7,6).\n   - **Phénolphtaléine** (pKi = 9,4) : Incolore (pH < 8,2) / Rose violacé (pH > 10,0).",
      wolof:
        "« Indicateur coloré dafa am ñaari melo (deux couleurs) : benn bu acide ak benn bu base. Diggante bi la ñuy wax zone de virage : foofu melo yi dañuy jaxasoo def teinte sensible (naka vert ci BBT bi jaxase jaune ak bleu) ! »",
      piege:
        "Critère de choix pour un dosage : l'indicateur est approprié si et seulement si son intervalle de virage CONTIENT le pH à l'équivalence pHE !",
    },
    {
      num: 5,
      title: "Effet de la Dilution sur le pH d'un Acide ou Base",
      badge: 'Règle Limite',
      formule: '\\text{Dilution } \\times 10 \\implies \\Delta\\text{pH} = +1 \\text{ (Acide fort)}, \\quad \\Delta\\text{pH} = -1 \\text{ (Base forte)}',
      regleBac:
        "La dilution d'une solution acide augmente son pH, celle d'une base diminue son pH, mais le pH tend vers 7 sans JAMAIS dépasser la neutralité.",
      explication:
        "1. Pour un acide fort de concentration C : pH = -log C. Si on dilue 10 fois (C' = C/10), pH' = -log(C/10) = -log C + log 10 = pH + 1.\n2. Si on dilue indéfiniment un acide fort (ex: HCl à 10⁻⁸ mol/L), le pH ne vaut PAS 8 ! On doit tenir compte de l'autoprotolyse de l'eau : le pH tend asymptotiquement vers 7,0.\n3. Pour une base forte : une dilution par 10 diminue le pH de 1 unité (pH' = pH - 1), avec une asymptote inférieure à 7,0.",
      wolof:
        "« Boo dollee ndox ci acide (dilution), pH bi dafay yéeg ndànk waaye mësul romb 7 ! Boo ko dollee ndox ba faww, day yem ci 7 rekk ndax ndox mi ci boppam. Mënul mukk nekk base ! »",
      piege:
        "Le piège classique de l'énoncé à 10⁻⁸ mol/L de HCl : ne répondez jamais pH = 8 ! Un acide dilué reste acide, pH < 7 (en réalité pH ≈ 6,98).",
    },
  ];

  const current = REFLEXES[activeTab];

  return (
    <div className="bg-white rounded-3xl border border-navy/10 p-5 sm:p-7 shadow-sm space-y-5">
      {/* En-tête */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-turquoise-light text-turquoise">
            <Droplets className="w-5 h-5" />
          </span>
          <h3 className="text-xl font-bold text-navy">
            Fiches Réflexes Bac S2 — C5 : Autoprotolyse de l&apos;Eau, pH &amp; Indicateurs
          </h3>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          5 Réflexes Clés
        </span>
      </div>

      {/* Onglets horizontaux */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {REFLEXES.map((ref, idx) => (
          <button
            key={ref.num}
            onClick={() => setActiveTab(idx)}
            className={`whitespace-nowrap rounded-2xl px-3.5 py-2 text-xs font-semibold transition-all ${
              activeTab === idx
                ? 'bg-turquoise text-white shadow-md'
                : 'bg-surface text-navy/70 hover:bg-navy/10 border border-navy/10'
            }`}
          >
            {ref.num}. {ref.title.split('&')[0].split(':')[0]}
          </button>
        ))}
      </div>

      {/* Contenu actif */}
      <div className="rounded-2xl bg-surface p-4 sm:p-5 border border-navy/10 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-turquoise block">
              {current.badge}
            </span>
            <h4 className="text-base font-bold text-navy">{current.title}</h4>
          </div>
          <div className="rounded-xl bg-white px-3 py-1.5 border border-navy/10 shadow-xs">
            <MathRenderer content={`$${current.formule}$`} />
          </div>
        </div>

        <div className="rounded-xl bg-white p-4 border border-navy/10 space-y-2">
          <p className="text-xs font-bold text-navy leading-snug flex items-center gap-1.5">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Règle Officielle Bac S2 :</span> {current.regleBac}
          </p>
          <div className="text-xs text-navy/80 leading-relaxed whitespace-pre-line pt-1">
            <MathRenderer content={current.explication} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <div className="rounded-2xl border border-amber-200/60 bg-amber-50/60 p-4 space-y-1">
            <span className="text-xs font-bold text-amber-800 flex items-center gap-1">
              <Lightbulb className="w-4 h-4 text-amber-600" />
              <span>Xam-xam ci Wolof :</span>
            </span>
            <p className="text-xs text-amber-900 leading-relaxed italic">
              {current.wolof}
            </p>
          </div>

          <div className="rounded-2xl border border-rose-200/60 bg-rose-50/60 p-4 space-y-1">
            <span className="text-xs font-bold text-rose-800 flex items-center gap-1">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Piège Fréquent au Bac :</span>
            </span>
            <p className="text-xs text-rose-950 leading-relaxed">
              {current.piege}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
