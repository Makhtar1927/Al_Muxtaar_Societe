'use client';

import React, { useState } from 'react';
import MathRenderer from '@/components/course/math-renderer';

export default function AminesReflexesCard() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const REFLEXES = [
    {
      num: 1,
      title: "Les 3 Classes d'Amines (Le Piège d'or du Bac)",
      badge: "Notion Fondamentale",
      formule: "1^\\circ : R-\\mathbf{N}H_2 \\qquad 2^\\circ : R-\\mathbf{N}H-R' \\qquad 3^\\circ : R-\\mathbf{N}(R')(R'')",
      regleBac:
        "La classe d'une amine dépend EXCLUSIVEMENT du nombre d'atomes de carbone (groupes alkyles ou aryles) directement liés à l'atome d'AZOTE N (et NON PAS du carbone comme pour les alcools !).",
      explication:
        "Pour identifier la classe en un clin d'œil au Bac S2, comptez simplement les atomes d'hydrogène fixés sur l'azote :\n\n1. **Amine Primaire ($1^\\circ$)** : L'azote est lié à **1 seul groupe carboné** et porte **2 atomes d'hydrogène** ($-\\text{NH}_2$).\n   - Formule générale : $R-\\text{NH}_2$.\n   - *Exemples* : Éthanamine ($\\text{CH}_3-\\text{CH}_2-\\text{NH}_2$), 2-méthylpropan-2-amine ($(\\text{CH}_3)_3\\text{C}-\\text{NH}_2$).\n2. **Amine Secondaire ($2^\\circ$)** : L'azote est lié à **2 groupes carbonés** et porte **1 seul atome d'hydrogène** ($-\\text{NH}-$).\n   - Formule générale : $R-\\text{NH}-R'$.\n   - *Exemple* : $N$-méthyléthanamine ($\\text{CH}_3-\\text{CH}_2-\\text{NH}-\\text{CH}_3$).\n3. **Amine Tertiaire ($3^\\circ$)** : L'azote est lié à **3 groupes carbonés** et ne porte **aucun atome d'hydrogène**.\n   - Formule générale : $R-\\text{N}(R')(R'')$.\n   - *Exemple* : Triméthylamine ($(\\text{CH}_3)_3\\text{N}$).\n\n- **Formule brute générale des monoamines aliphatiques saturées** :\n  $$\\text{C}_n\\text{H}_{2n+3}\\text{N} \\quad \\implies \\quad M = 14n + 17 \\quad (\\text{g/mol})$$",
      wolof:
        "« Bul jaxase alcools ak amines mukk ! Ci alcool, carbone bi yor -OH bi ngay xool. Waaye ci amine, AZOTE N bi ngay xool : ñaata hydrogène ñoo takku ci moom ?\n- Su dee 2 H rek : mooy classe 1 (1°).\n- Su dee 1 H rek : mooy classe 2 (2°).\n- Su amul benn H : mooy classe 3 (3°) ! »",
      piege:
        "PIÈGE CLASSIQUE BAC S2 : La molécule (CH₃)₃C—NH₂ possède un carbone lié à 3 autres carbones (carbone tertiaire). Beaucoup d'élèves écrivent par erreur qu'il s'agit d'une amine tertiaire. C'EST FAUX ! L'azote ne porte qu'un seul radical et possède 2 H : c'est une amine PRIMAIRE (1°) !",
    },
    {
      num: 2,
      title: "Nomenclature UICPA & Notation N-alkyle",
      badge: "Règle d'or",
      formule: "\\text{Préfixe } N\\text{-alkyle} + \\text{Nom alcane principal} + \\text{Indice} + \\text{\"-amine\"}",
      regleBac:
        "Pour nommer une amine sans hésitation au Baccalauréat, déterminez la chaîne principale la plus longue liée à l'azote, et préfixez les autres ramifications par la lettre \"N-\".",
      explication:
        "1. **Amine primaire ($1^\\circ$)** :\n   - On cherche la chaîne carbonée la plus longue contenant le carbone lié au groupe $-\\text{NH}_2$.\n   - On numérote pour donner à ce carbone le plus petit indice possible.\n   - *Exemple* : $\\text{CH}_3-\\text{CH}(\\text{NH}_2)-\\text{CH}_2-\\text{CH}_3$ se nomme **butan-2-amine**.\n\n2. **Amines secondaires ($2^\\circ$) et tertiaires ($3^\\circ$)** :\n   - La chaîne la plus longue forme le squelette de l'amine principale.\n   - Les autres groupes alkyles portés par l'azote sont désignés comme des substituants précédés de la lettre majuscule en italique $N-$ (ex : $N$-méthyl, $N$-éthyl).\n   - *Exemple 1* : $\\text{CH}_3-\\text{CH}_2-\\text{NH}-\\text{CH}_3 \\implies$ **$N$-méthyléthanamine**.\n   - *Exemple 2* : $\\text{CH}_3-\\text{N}(\\text{CH}_3)-\\text{CH}_2-\\text{CH}_2-\\text{CH}_3 \\implies$ **$N,N$-diméthylpropan-1-amine**.\n\n3. **Amine aromatique de référence** :\n   - $\\text{C}_6\\text{H}_5-\\text{NH}_2$ : **phénylamine** ou **aniline** (nom accepté par l'UICPA).",
      wolof:
        "« Bu fekkee amine secondaire walla tertiaire la : jëllal chaîne bi gën a gudd def ko principal. Yeneen chaîne yu ndaw yi takku ci azote bi, jox leen préfixe \"N-\" ci kanam (naka N-méthyléthanamine) ! »",
      piege:
        "N'oubliez pas la lettre \"N-\" devant chaque groupe attaché à l'azote ! Écrire \"méthyléthanamine\" sans le \"N-\" est une faute de nomenclature pénalisée au Bac.",
    },
    {
      num: 3,
      title: "Propriétés Acido-Basiques & Effet Inducteur +I",
      badge: "Chimie des Solutions",
      formule: "R-\\text{NH}_2 + \\text{H}_2\\text{O} \\rightleftharpoons R-\\text{NH}_3^+ + \\text{OH}^- \\qquad (pK_a \\approx 10{,}6 - 11)",
      regleBac:
        "Les amines sont des bases faibles de Brönsted grâce au doublet non-liant porté par l'atome d'azote N, capable de capter un proton H⁺.",
      explication:
        "L'atome d'azote possède un doublet non liant disponible :\n$$\\text{Couple acide/base : } R-\\text{NH}_3^+ \\; / \\; R-\\text{NH}_2$$\n\n- **Comparaison de la force basique (Question type Bac S2)** :\n  $$\\text{Aniline } (pK_a \\approx 4{,}6) \\; < \\; \\text{Ammoniac } \\text{NH}_3 \\; (pK_a = 9{,}2) \\; < \\; \\text{Monoalkylamines } (pK_a \\approx 10{,}6) \\; < \\; \\text{Dialkylamines } (pK_a \\approx 10{,}9)$$\n\n- **Explication par les effets électroniques** :\n  - Les groupes alkyles $R-$ exercent un **effet inducteur donneur d'électrons ($+I$)**. Ils enrichissent l'atome d'azote en électrons, ce qui rend son doublet libre beaucoup plus disponible pour capter un proton $\\text{H}^+$. Les alkylamines sont donc des bases plus fortes que l'ammoniac $\\text{NH}_3$.\n  - Pour l'aniline ($\\text{C}_6\\text{H}_5-\\text{NH}_2$), le doublet non liant de l'azote est **délocalisé par mésomérie** dans le cycle benzénique. Il est donc très peu disponible pour capter un proton : l'aniline est une base beaucoup plus faible que $\\text{NH}_3$.\n\n- **Action des acides forts** :\n  $$R-\\text{NH}_2 + \\text{HCl} \\longrightarrow R-\\text{NH}_3^+ + \\text{Cl}^- \\quad (\\text{sel d'alkylammonium})$$",
      wolof:
        "« Azote N dafa yor doublet d'électrons bu ubbeeku bu mëna jàpp proton H⁺. Radicaux alkyles yi (-CH₃, -C₂H₅) dañuy joxe électrons (effet +I), looloo tax amines aliphatiques yi gën a forcé ammoniac NH₃. Waaye aniline moom doublet bi dafa tàbi ci biir cycle benzène bi, looloo tax mu néew doole lool ! »",
      piege:
        "Attention à l'expression de la constante d'acidité : Ka est toujours relative au couple acide/base R-NH₃⁺ / R-NH₂. Plus le pKa est grand, plus l'amine est une base FORTE !",
    },
    {
      num: 4,
      title: "Caractère Nucléophile & Polyalkylation d'Hofmann",
      badge: "Mécanisme Réactionnel",
      formule: "R-\\text{NH}_2 + 3 R'-\\text{X} \\xrightarrow{\\text{excès de } R'-\\text{X}} [R-\\text{N}(R')_3]^+ \\text{X}^- + 2 \\text{HX}",
      regleBac:
        "Grâce au doublet non liant de l'azote, les amines sont des nucléophiles remarquables qui attaquent les atomes de carbone électrophiles des halogénoalcanes (R'—X).",
      explication:
        "La réaction d'alkylation d'Hofmann procède par substitutions nucléophiles successives :\n\n1. **Passage de l'amine $1^\\circ$ à l'amine $2^\\circ$** :\n   $$R-\\text{NH}_2 + R'-\\text{X} \\longrightarrow [R-\\text{NH}_2-R']^+ \\text{X}^- \\xrightarrow{R-\\text{NH}_2} R-\\text{NH}-R' + R-\\text{NH}_3^+\\text{X}^-$$\n2. **Passage de l'amine $2^\\circ$ à l'amine $3^\\circ$** :\n   $$R-\\text{NH}-R' + R'-\\text{X} \\longrightarrow [R-\\text{NH}(R')_2]^+ \\text{X}^- \\xrightarrow{\\text{base}} R-\\text{N}(R')_2 + \\text{sel}$$\n3. **Passage de l'amine $3^\\circ$ au sel d'ammonium quaternaire** :\n   $$R-\\text{N}(R')_2 + R'-\\text{X} \\longrightarrow [R-\\text{N}(R')_3]^+ \\text{X}^-$$\n   Cette dernière étape est une simple addition : l'ion ammonium quaternaire ne possède plus aucun hydrogène fixé sur l'azote, la chaîne de réactions s'arrête ici !\n\n- **Stratégie au laboratoire** :\n  - Pour favoriser l'amine secondaire : on utilise un **large excès d'amine primaire**.\n  - Pour obtenir le sel d'ammonium quaternaire pur : on utilise un **large excès d'halogénoalcane**.",
      wolof:
        "« Réaction d'Hofmann dafay jël benn amine di ko doli ay groupes alkyles benn ci benn ba keroog azote bi di am 4 liaisons ak charge positive ([R-NR'₃]⁺). Ci stade bi mooy sel d'ammonium quaternaire, mënatul am benn réaction ! »",
      piege:
        "Le sel d'ammonium quaternaire [R₄N]⁺ X⁻ n'est PAS une amine ! C'est un composé ionique cristallin, analogue aux sels minéraux comme NaCl, soluble dans l'eau et totalement dissocié.",
    },
    {
      num: 5,
      title: "Action sur les Dérivés d'Acides (Synthèse d'Amides)",
      badge: "Réaction Totale",
      formule: "R-\\text{CO}-\\text{Cl} + 2 R'-\\text{NH}_2 \\longrightarrow R-\\text{CO}-\\text{NH}-R' + (R'-\\text{NH}_3^+ + \\text{Cl}^-)",
      regleBac:
        "La réaction d'une amine primaire ou secondaire avec un chlorure d'acyle (ou un anhydride d'acide) est TOTALE, RAPIDE et EXOTHERMIQUE. Elle conduit à la synthèse d'un amide N-substitué.",
      explication:
        "Cette réaction illustre parfaitement le caractère nucléophile des amines :\n\n- **Avec un chlorure d'acyle ($R-\\text{CO}-\\text{Cl}$)** :\n  $$\\text{Équation-bilan : } R-\\text{CO}-\\text{Cl} + 2 R'-\\text{NH}_2 \\longrightarrow R-\\text{CO}-\\text{NH}-R' + (R'-\\text{NH}_3^+ + \\text{Cl}^-)$$\n  - **Pourquoi le coefficient 2 ?**\n    - La première molécule d'amine attaque le carbone du carbonyle et forme l'amide en libérant une molécule de chlorure d'hydrogène $\\text{HCl}$.\n    - La deuxième molécule d'amine (qui est une base) réagit immédiatement avec $\\text{HCl}$ pour former le chlorure d'alkylammonium.\n\n- **Avec un anhydride d'acide ($R-\\text{CO}-\\text{O}-\\text{CO}-R$)** :\n  $$R-\\text{CO}-\\text{O}-\\text{CO}-R + R'-\\text{NH}_2 \\longrightarrow R-\\text{CO}-\\text{NH}-R' + R-\\text{COOH}$$\n\n- **Remarque fondamentale** : Une amine tertiaire ($3^\\circ$) ne possède pas d'hydrogène lié à l'azote ; elle **NE PEUT PAS former d'amide** !",
      wolof:
        "« Boo bëggée def amide ci Bac S2 : jëlal chlorure d'acyle boole ko ak ñaari moles d'amine (2 R'-NH₂). Benn bi mooy créer amide bi (liaison peptide), ñaareel bi dafay jàpp acide HCl bi génn pour def sel blanc ! Su fekkee amine tertiaire la nak, du mëna def amide ndax amul hydrogène ! »",
      piege:
        "Si le sujet de Bac demande d'écrire l'équation en n'utilisant qu'une seule molécule d'amine, la réaction s'écrit : R-COCl + R'NH₂ → R-CONH-R' + HCl. Mais si on précise \"en milieu sans solvant\", le HCl formé réagit obligatoirement avec une 2ème mole d'amine : n'oubliez jamais ce facteur 2 !",
    },
  ];

  const current = REFLEXES[activeTab];

  return (
    <div className="my-10 rounded-3xl border border-blue-200/80 bg-gradient-to-br from-blue-50/50 via-white to-indigo-50/40 p-6 md:p-8 shadow-xl shadow-blue-500/5 backdrop-blur-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-blue-100 pb-5">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30">
            <span className="text-xl font-black">C2</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Fiches Réflexes Bac S2 Sénégal
              </span>
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                Chimie Organique
              </span>
            </div>
            <h3 className="text-lg md:text-xl font-black text-slate-900">
              Amines : Les 5 Réflexes d&apos;Excellence
            </h3>
          </div>
        </div>
        <div className="text-xs font-semibold text-slate-500 bg-white/80 border border-slate-200/80 px-3 py-1.5 rounded-full shadow-sm">
          Réflexe {activeTab + 1} sur {REFLEXES.length}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="mt-6 flex flex-wrap gap-2">
        {REFLEXES.map((item, idx) => (
          <button
            key={item.num}
            onClick={() => setActiveTab(idx)}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs md:text-sm font-bold transition-all ${
              activeTab === idx
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25 scale-[1.02]'
                : 'bg-white/80 text-slate-600 hover:bg-blue-50 hover:text-blue-700 border border-slate-200/60'
            }`}
          >
            <span
              className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black ${
                activeTab === idx
                  ? 'bg-white text-blue-600'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {item.num}
            </span>
            <span className="truncate max-w-[120px] sm:max-w-none">
              {item.badge}
            </span>
          </button>
        ))}
      </div>

      {/* Active Reflex Card Content */}
      <div className="mt-6 rounded-2xl border border-blue-100 bg-white p-5 md:p-7 shadow-sm space-y-5">
        {/* Title and Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <h4 className="text-base md:text-lg font-black text-slate-900 flex items-center gap-2">
            <span className="text-blue-600">#{current.num}</span>
            {current.title}
          </h4>
          <span className="inline-flex self-start sm:self-auto items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-200/60">
            {current.badge}
          </span>
        </div>

        {/* Formula Banner */}
        <div className="rounded-xl border border-blue-200 bg-gradient-to-r from-blue-50 via-indigo-50/50 to-blue-50/30 p-4 text-center overflow-x-auto shadow-inner">
          <div className="text-sm md:text-base font-bold text-slate-800">
            <MathRenderer content={`$$${current.formule}$$`} />
          </div>
        </div>

        {/* Official Bac Rule */}
        <div className="rounded-xl border-l-4 border-blue-600 bg-blue-50/60 p-4">
          <p className="text-xs font-bold uppercase tracking-wider text-blue-700 mb-1">
            Règle Officielle Bac S2
          </p>
          <p className="text-sm font-semibold text-slate-800 leading-relaxed">
            {current.regleBac}
          </p>
        </div>

        {/* Detailed Explanation */}
        <div className="space-y-3 text-sm text-slate-700 leading-relaxed border-t border-slate-100 pt-4">
          <MathRenderer content={current.explication} />
        </div>

        {/* Wolof Insight */}
        <div className="rounded-xl border border-amber-200 bg-gradient-to-r from-amber-50/80 to-yellow-50/40 p-4">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-base">💡</span>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
              Xam-xam ci Wolof (Comprendre d&apos;un coup d&apos;œil)
            </span>
          </div>
          <p className="text-xs md:text-sm font-medium text-amber-950/90 italic leading-relaxed whitespace-pre-line">
            {current.wolof}
          </p>
        </div>

        {/* Piège Exam Alert */}
        <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base">⚠️</span>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-800">
              Piège Classique du Baccalauréat
            </span>
          </div>
          <p className="text-xs md:text-sm font-semibold text-rose-950/90 leading-relaxed">
            {current.piege}
          </p>
        </div>
      </div>

      {/* Footer Navigation Buttons */}
      <div className="mt-5 flex items-center justify-between">
        <button
          onClick={() => setActiveTab((prev) => Math.max(0, prev - 1))}
          disabled={activeTab === 0}
          className="flex items-center gap-1.5 text-xs md:text-sm font-bold text-blue-600 hover:text-blue-800 disabled:opacity-30 disabled:hover:text-blue-600 transition"
        >
          ← Réflexe précédent
        </button>
        <button
          onClick={() =>
            setActiveTab((prev) => Math.min(REFLEXES.length - 1, prev + 1))
          }
          disabled={activeTab === REFLEXES.length - 1}
          className="flex items-center gap-1.5 text-xs md:text-sm font-bold text-blue-600 hover:text-blue-800 disabled:opacity-30 disabled:hover:text-blue-600 transition"
        >
          Réflexe suivant →
        </button>
      </div>
    </div>
  );
}
