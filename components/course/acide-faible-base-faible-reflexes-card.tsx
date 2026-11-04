'use client';

import React, { useState } from 'react';
import MathRenderer from '@/components/course/math-renderer';
import { Target, Lightbulb, AlertTriangle, CheckCircle, Sparkles, Scale, Droplet } from 'lucide-react';

export default function AcideFaibleBaseFaibleReflexesCard() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const REFLEXES = [
    {
      num: 1,
      title: "Équilibre d'un Acide Faible dans l'Eau & Constante Ka",
      badge: "Équilibre Chimique Partiel",
      formule: "\\text{HA} + \\text{H}_2\\text{O} \\rightleftharpoons \\text{A}^- + \\text{H}_3\\text{O}^+, \\quad K_a = \\frac{[\\text{A}^-][\\text{H}_3\\text{O}^+]}{[\\text{HA}]}, \\quad pK_a = -\\log K_a",
      regleBac:
        "Un acide faible ne se dissocie que partiellement dans l'eau. La réaction conduit à un état d'équilibre dynamique représenté par une double flèche (⇌).",
      explication:
        "1. À l'état d'équilibre, la concentration résiduelle en molécules [HA] n'est JAMAIS nulle.\n2. La constante d'acidité Ka ne dépend **QUE de la température** : elle caractérise le couple acide/base.\n3. Plus Ka est grand (plus pKa est petit), plus l'acide se dissocie facilement dans l'eau.\n4. Pour une base faible B (ex: NH₃) : B + H₂O ⇌ BH⁺ + OH⁻, sa constante d'acidité Ka est celle de son acide conjugué BH⁺.",
      wolof:
        "« Acide faible bi (naka acide acétique CH₃COOH) du jeex bépp ci ndox mi ! Dafa am lu ci des waxtu wu nekk, motax ñu koy bind ak ñaari flèche ⇌. Constante Ka bi tàngaay bi rekk la dépendre ! »",
      piege:
        "Ne confondez jamais constante de réaction et constante d'acidité ! L'eau n'intervient jamais dans l'expression de Ka car son activité vaut 1.",
    },
    {
      num: 2,
      title: "Relation d'Henderson-Hasselbalch & Demi-Égalité",
      badge: "Formule Reine du Bac S2",
      formule: "\\text{pH} = pK_a + \\log\\left(\\frac{[\\text{A}^-]}{[\\text{HA}]}\\right) \\iff \\frac{[\\text{A}^-]}{[\\text{HA}]} = 10^{\\text{pH} - pK_a}",
      regleBac:
        "Cette relation relie directement le pH d'une solution contenant un couple acide/base faible au pKa du couple et aux concentrations des deux formes.",
      explication:
        "1. **Cas particulier capital :** Si [A⁻] = [HA], alors log([A⁻]/[HA]) = log(1) = 0 ⟹ **pH = pKa**.\n2. Si pH < pKa : log([A⁻]/[HA]) < 0 ⟹ [A⁻]/[HA] < 1 ⟹ **[HA] > [A⁻]** (l'acide prédomine).\n3. Si pH > pKa : log([A⁻]/[HA]) > 0 ⟹ [A⁻]/[HA] > 1 ⟹ **[A⁻] > [HA]** (la base conjuguée prédomine).\n4. Cette formule s'applique à TOUTE solution contenant l'acide et sa base conjuguée, qu'elle provienne d'un mélange ou d'un dosage.",
      wolof:
        "« Formule bi mooy kiilifag acide faible : pH = pKa + log([Base]/[Acide]). Bu [Base] = [Acide], pH bi day yem ci pKa bi rek ! Bu pH gën a tuuti pKa, acide bi moo ëpp. Bu pH gën a rëy pKa, base bi moo ëpp ! »",
      piege:
        "Attention au sens de la fraction dans le logarithme : c'est TOUJOURS [Base] au numérateur et [Acide] au dénominateur : log([Base]/[Acide]) !",
    },
    {
      num: 3,
      title: "Diagramme de Prédominance & Règle des 10%",
      badge: "Représentation Graphique",
      formule: "\\text{Zone de coexistence : } [pK_a - 1 \\,;\\, pK_a + 1], \\quad \\text{Prédominance stricte à } 10\\times",
      regleBac:
        "Sur l'axe des pH orienté de 0 à 14, la valeur du pKa constitue la frontière stricte entre le domaine de prédominance de l'acide et celui de la base.",
      explication:
        "1. **Pour pH ≤ pKa - 1** : [HA] ≥ 10 [A⁻], l'acide HA est **ultra-majoritaire** (représente plus de 91% du couple).\n2. **Pour pH ≥ pKa + 1** : [A⁻] ≥ 10 [HA], la base A⁻ est **ultra-majoritaire** (représente plus de 91% du couple).\n3. **Pour pKa - 1 < pH < pKa + 1** : les deux formes coexistent en concentrations du même ordre de grandeur.\n4. À pH = pKa : il y a exactement **50% de HA et 50% de A⁻**.",
      wolof:
        "« Axe bi da ngay def trait horizontal : pKa bi nekk ci diggante bi. Féete gauche (pH < pKa), acide bi moo foofu dëkk ; féete droite (pH > pKa), base bi moo dëkk. Ci pKa exact, 50-50 lañuy am ! »",
      piege:
        "Ne dites jamais que l'autre espèce n'existe plus ! Les deux formes coexistent toujours en solution, l'une prédomine simplement sur l'autre en concentration.",
    },
    {
      num: 4,
      title: "Coefficient de Dissociation α & Loi de Dilution d'Ostwald",
      badge: "Effet de la Dilution",
      formule: "\\alpha = \\frac{[\\text{A}^-]}{C} = \\frac{[\\text{H}_3\\text{O}^+]}{C}, \\quad C \\to 0 \\implies \\alpha \\to 1",
      regleBac:
        "Le coefficient de dissociation α mesure la fraction de molécules d'acide dissociées. Plus une solution d'acide faible est diluée, plus son coefficient de dissociation augmente.",
      explication:
        "1. Pour un acide faible pur en solution : [A⁻] = [H₃O⁺] (électroneutralité), donc **α = [H₃O⁺] / C = 10⁻ᵖᴴ / C**.\n2. **Loi de dilution d'Ostwald :** Ka = (C · α²) / (1 - α). Si C diminue (dilution), α augmente.\n3. **Attention au paradoxe apparent du Bac :** lors d'une dilution, α augmente (l'acide se dissocie plus en pourcentage), mais [H₃O⁺] diminue car le volume augmente beaucoup plus vite : par conséquent, **le pH augmente** (tend vers 7) !",
      wolof:
        "« Boo dollee ndox ci acide faible (dilution), pourcentage bi di xàjjikoo (α) day yokku ! Waaye pH bi day yéeg ndànk dem ci 7 ndax ndox mi dafa bare lool. Mënul mukk nekk base ! »",
      piege:
        "Ne confondez pas « l'acide est plus dissocié en pourcentage » (α augmente) et « la solution est plus acide » (faux ! [H₃O⁺] diminue et le pH augmente) !",
    },
    {
      num: 5,
      title: "Forces Relatives des Couples & Échelle des pKa",
      badge: "Classification & Réactivité",
      formule: "pK_a \\searrow \\iff K_a \\nearrow \\iff \\text{Acide plus fort et Base conjuguée plus faible}",
      regleBac:
        "Un acide est d'autant plus fort que son pKa est petit (Ka grand). Plus un acide est fort, plus sa base conjuguée est faible.",
      explication:
        "1. **Couples limites de l'eau :**\n   - H₃O⁺ / H₂O : pKa = 0 (l'acide le plus fort pouvant exister dans l'eau).\n   - H₂O / OH⁻ : pKa = 14 (la base la plus forte pouvant exister dans l'eau).\n2. **Échelle des pKa classiques du Bac S2 :**\n   - HCOOH / HCOO⁻ : pKa = 3,8\n   - CH₃COOH / CH₃COO⁻ : pKa = 4,8 (l'acide méthanoïque est plus fort que l'acide éthanoïque car 3,8 < 4,8)\n   - NH₄⁺ / NH₃ : pKa = 9,2\n3. **Règle du gamma (γ) :** La réaction entre l'acide le plus fort (pKa le plus bas) et la base la plus forte (pKa le plus élevé) est thermodynamiquement favorisée.",
      wolof:
        "« pKa bi bu gënee tuuti, acide bi moo gën a kàttan (plus fort) waaye base conjuguée-am mooy gën a néew kàttan (plus faible). HCOOH (pKa = 3,8) moo gën a fort CH₃COOH (pKa = 4,8) ndax pKa-am moo gën a wàcc ! »",
      piege:
        "Au Bac, classez toujours en précisant : « acide de force croissante lorsque pKa décroît » et « base de force croissante lorsque pKa croît » !",
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
            Fiches Réflexes Bac S2 — C7 : Acides &amp; Bases Faibles – Couples &amp; pKa
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
