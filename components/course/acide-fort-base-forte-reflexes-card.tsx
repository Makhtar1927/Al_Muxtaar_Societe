'use client';

import React, { useState } from 'react';
import MathRenderer from '@/components/course/math-renderer';
import { Target, Lightbulb, AlertTriangle, CheckCircle, Sparkles, Scale, Droplet } from 'lucide-react';

export default function AcideFortBaseForteReflexesCard() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const REFLEXES = [
    {
      num: 1,
      title: "Dissociation Totale & Calcul Direct du pH",
      badge: "Monoacide vs Diacide Fort",
      formule: "\\text{HA} + \\text{H}_2\\text{O} \\longrightarrow \\text{A}^- + \\text{H}_3\\text{O}^+, \\quad \\text{pH} = -\\log C_a",
      regleBac:
        "Un acide fort réagit totalement avec l'eau (flèche unique ⟶). Il ne reste aucune molécule HA non dissociée en solution.",
      explication:
        "1. **Monoacide fort** (HCl, HNO₃) : [H₃O⁺] = Ca ⟹ **pH = -log Ca** (valable pour Ca entre 10⁻⁶ et 10⁻¹ mol/L).\n2. **⚠️ Piège du Diacide fort** (H₂SO₄) : chaque mole libère 2 ions H₃O⁺ ! [H₃O⁺] = 2 Ca ⟹ **pH = -log(2 Ca)**.\n3. **Base forte** (NaOH, KOH) : dissociation totale en ions OH⁻ : [OH⁻] = Cb ⟹ pOH = -log Cb ⟹ **pH = 14 + log Cb** à 25 °C.",
      wolof:
        "« Acide fort bi (naka HCl) ak base forte bi (naka NaOH), bu ñu duggee ci ndox dañuy xàjjikoo bépp def ay ions, amul benn molécule bu des ! H₂SO₄ nak ñaari H₃O⁺ lay jur, motax concentration bi 2 Ca lay doon ! »",
      piege:
        "Au Bac S2, vérifiez TOUJOURS si l'acide est monoacide (HCl) ou diacide (H₂SO₄) ! Pour H₂SO₄ de concentration Ca = 5 × 10⁻³ mol/L, [H₃O⁺] = 10⁻² mol/L donc pH = 2,00 et non 2,30 !",
    },
    {
      num: 2,
      title: "Réaction de Neutralisation Fort-Fort & Équivalence",
      badge: "Formule Reine du Dosage",
      formule: "\\text{H}_3\\text{O}^+ + \\text{OH}^- \\longrightarrow 2\\,\\text{H}_2\\text{O}, \\quad C_a V_a = C_b V_{bE} \\implies \\text{pH}_E = 7{,}00",
      regleBac:
        "La réaction entre un acide fort et une base forte est unique, totale (K ≈ 10¹⁴), quasi-instantanée et nettement exothermique.",
      explication:
        "1. Les ions spectateurs Na⁺ et Cl⁻ ne participent pas à la réaction chimique.\n2. **À l'équivalence stœchiométrique E** : les réactifs ont été mélangés dans les proportions de l'équation : na = nb ⟹ **Ca × Va = Cb × VbE**.\n3. **Nature de la solution à l'équivalence** : solution aqueuse de chlorure de sodium (NaCl), sel neutre. À 25 °C : **pHE = 7,00** rigoureusement.",
      wolof:
        "« Réaction bi totale la te dafay tàngal (exothermique) : H₃O⁺ + OH⁻ ⟶ 2 H₂O. Équivalence bi mooy waxtu bi H₃O⁺ yépp ak OH⁻ yépp di jeexandoo : Ca × Va = Cb × VbE. Ndoxum xorom neutre lay jur, motax pH équivalence bi 7 la koy doon faww ci 25 °C ! »",
      piege:
        "Pour calculer la concentration en ions H₃O⁺ à tout instant avant l'équivalence, n'oubliez jamais d'ajouter le volume versé au dénominateur : [H₃O⁺] = (Ca Va - Cb Vb) / (Va + Vb) !",
    },
    {
      num: 3,
      title: "Allure de la Courbe & Méthode des Tangentes",
      badge: "Méthode Graphique Bac",
      formule: "E(V_{bE}\\,;\\, \\text{pH}_E = 7{,}00) \\quad \\text{par tangentes parallèles}",
      regleBac:
        "La courbe de dosage présente un saut de pH vertical abrupt autour de VbE. Le point d'inflexion unique est le point d'équivalence E.",
      explication:
        "1. **Avant l'équivalence (Vb < VbE)** : pH < 7, évolution très lente au départ (courbe concave).\n2. **Au saut de pH** : brusque variation de pH de ≈ 3 à ≈ 11 pour une seule goutte de soude. La dérivée dpH/dVb passe par un pic aigu à VbE.\n3. **Méthode des tangentes parallèles** : tracer 2 tangentes parallèles de part et d'autre du saut, puis la droite médiane équidistante. L'intersection avec la courbe donne E(VbE ; 7,00).",
      wolof:
        "« Courbe bi dafay yéeg ndànk ba ci équivalence bi mu tëb bu baax (saut de pH) génne 3 ba 11 ! Pour nga xam fu équivalence bi nekk ci graphique bi, da ngay tracer ñaari tangentes parallèles, médiane bi ci diggante bi mooy joxe point E bi ! »",
      piege:
        "Tracez les deux tangentes parfaitement parallèles à l'œil et au compas/équerre. Une erreur de parallélisme fausse la lecture de VbE !",
    },
    {
      num: 4,
      title: "Choix de l'Indicateur Coloré : Le Rôle Clé du BBT",
      badge: "Critère Officiel Bac",
      formule: "\\text{Critère : } \\text{pH}_E \\in [pK_i - 1 \\,;\\, pK_i + 1] \\implies \\text{BBT } [6{,}0 \\,;\\, 7{,}6]",
      regleBac:
        "Un indicateur coloré convient pour un titrage si et seulement si sa zone de virage contient le pH à l'équivalence pHE.",
      explication:
        "1. Pour le titrage fort-fort, pHE = 7,00 à 25 °C.\n2. Le **Bleu de bromothymol (BBT)** a pour zone de virage **[6,0 ; 7,6]** : comme 7,00 ∈ [6,0 ; 7,6], le BBT est l'**indicateur idéal** ! Sa teinte sensible verte s'observe exactement à l'équivalence.\n3. L'hélianthine (3,1 - 4,4) et la phénolphtaléine (8,2 - 10,0) virent également dans le grand saut de pH, mais le BBT est le seul rigoureusement centré sur pHE = 7,00.",
      wolof:
        "« Pour nga tànn indicateur bu baax ci Bac bi, da ngay wax ni : zone de virage bi dafa wara ëmb pH équivalence bi (pHE = 7) ! BBT (6,0 ba 7,6) moo ci gën ndax 7 dafa nekk ci diggante bi exact, melo woom dafay vert bu rafet ci équivalence bi ! »",
      piege:
        "Pour justifier le choix du BBT au Bac, citez TOUJOURS explicitement : 1° la valeur de pHE = 7,00 ; 2° la zone de virage du BBT [6,0 ; 7,6] ; 3° l'inclusion 7,00 ∈ [6,0 ; 7,6].",
    },
    {
      num: 5,
      title: "Dilution et Asymptote de Neutralité",
      badge: "Règle Limite",
      formule: "\\text{Acide fort : } \\text{Dilution } \\times 10 \\implies \\Delta\\text{pH} = +1{,}00, \\quad \\lim_{V \\to +\\infty} \\text{pH} = 7{,}00",
      regleBac:
        "Diluer 10 fois un acide fort augmente son pH de 1 unité. Par dilution infinie, le pH tend asymptotiquement vers 7,00 sans jamais le dépasser.",
      explication:
        "1. Si Ca = 10⁻² mol/L (pH = 2,00), une dilution par 10 donne Ca' = 10⁻³ mol/L ⟹ pH' = 3,00 (soit +1 unité de pH).\n2. Si on dilue indéfiniment un acide fort, les ions H₃O⁺ apportés par l'acide deviennent négligeables devant les 10⁻⁷ mol/L de l'autoprotolyse de l'eau : le pH tend vers 7,00 mais la solution reste acide (pH ≤ 7,00).\n3. Même règle pour une base forte : dilution par 10 diminue le pH de 1 unité (ΔpH = -1), avec asymptote inférieure à 7,00.",
      wolof:
        "« Boo dollee ndox ci acide fort (dilution par 10), pH bi day yokku 1 unité (2 ba 3 ba 4...). Waaye boo ko dollee ndox ba faww, day yem ci 7 rekk, mësul romb 7 nekk base ndax ndox mi ci boppam ! »",
      piege:
        "Si l'énoncé du Bac vous demande le pH d'une solution de HCl à 10⁻⁸ mol/L, ne calculez surtout pas -log(10⁻⁸) = 8 ! Un acide ne devient jamais basique par dilution : son pH vaut environ 6,98 (calcul avec l'autoprotolyse de l'eau).",
    },
  ];

  const current = REFLEXES[activeTab];

  return (
    <div className="bg-white rounded-3xl border border-navy/10 p-5 sm:p-7 shadow-sm space-y-5">
      {/* En-tête */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-turquoise/10 text-turquoise">
            <Scale className="w-5 h-5" />
          </span>
          <h3 className="text-xl font-bold text-navy">
            Fiches Réflexes Bac S2 — C6 : Acide Fort &amp; Base Forte – Dosage
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
