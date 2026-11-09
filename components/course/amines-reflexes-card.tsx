'use client';

import React, { useState } from 'react';
import MathRenderer from '@/components/course/math-renderer';

export default function AminesReflexesCard() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const REFLEXES = [
    {
      num: 1,
      shortLabel: 'Classes',
      title: "Les 3 Classes d'Amines (Le Piège d'or du Bac)",
      badge: 'Notion Fondamentale',
      formule: "1^\\circ : R-\\mathbf{N}H_2 \\qquad 2^\\circ : R-\\mathbf{N}H-R' \\qquad 3^\\circ : R-\\mathbf{N}(R')(R'')",
      regleBac:
        "La classe d'une amine dépend EXCLUSIVEMENT du nombre de radicaux carbonés directement liés à l'atome d'AZOTE N (et NON PAS du carbone fonctionnel comme pour les alcools !).",
      explication:
        "Pour identifier la classe en un clin d'œil au Bac S2, comptez simplement les atomes d'hydrogène fixés sur l'azote :\n\n1. **Amine Primaire ($1^\\circ$)** : L'azote est lié à **1 seul groupe carboné** et porte **2 atomes d'hydrogène** ($-\\text{NH}_2$).\n   - Formule générale : $R-\\text{NH}_2$.\n   - *Exemples* : Éthanamine ($\\text{CH}_3-\\text{CH}_2-\\text{NH}_2$), 2-méthylpropan-2-amine ($(\\text{CH}_3)_3\\text{C}-\\text{NH}_2$).\n2. **Amine Secondaire ($2^\\circ$)** : L'azote est lié à **2 groupes carbonés** et porte **1 seul atome d'hydrogène** ($-\\text{NH}-$).\n   - Formule générale : $R-\\text{NH}-R'$.\n   - *Exemple* : $N$-méthyléthanamine ($\\text{CH}_3-\\text{CH}_2-\\text{NH}-\\text{CH}_3$).\n3. **Amine Tertiaire ($3^\\circ$)** : L'azote est lié à **3 groupes carbonés** et ne porte **aucun atome d'hydrogène**.\n   - Formule générale : $R-\\text{N}(R')(R'')$.\n   - *Exemple* : Triméthylamine ($(\\text{CH}_3)_3\\text{N}$).\n\n- **Formule brute générale des monoamines aliphatiques saturées** :\n  $$\\text{C}_n\\text{H}_{2n+3}\\text{N} \\quad \\implies \\quad M = 14n + 17 \\quad (\\text{g/mol})$$",
      wolof:
        "« Bul jaxase alcools ak amines mukk ! Ci alcool, carbone bi yor -OH bi ngay xool. Waaye ci amine, AZOTE N bi ngay xool : ñaata hydrogène ñoo takku ci moom ?\n- Su dee 2 H rek : mooy classe 1 (1°).\n- Su dee 1 H rek : mooy classe 2 (2°).\n- Su amul benn H : mooy classe 3 (3°) ! »",
      piege:
        "La molécule (CH₃)₃C—NH₂ possède un carbone lié à 3 autres carbones (carbone tertiaire). Beaucoup d'élèves écrivent par erreur qu'il s'agit d'une amine tertiaire. C'EST FAUX ! L'azote ne porte qu'un seul radical et possède 2 H : c'est une amine PRIMAIRE (1°) !",
    },
    {
      num: 2,
      shortLabel: 'Nomenclature',
      title: 'Nomenclature UICPA & Notation N-alkyle',
      badge: "Règle d'or",
      formule: "\\text{Préfixe } N\\text{-alkyle} + \\text{Nom alcane principal} + \\text{Indice} + \\text{\"-amine\"}",
      regleBac:
        "Pour nommer une amine sans hésitation au Baccalauréat, déterminez la chaîne principale la plus longue liée à l'azote, et préfixez les autres ramifications par la lettre majuscule en italique \"N-\".",
      explication:
        "1. **Amine primaire ($1^\\circ$)** :\n   - On cherche la chaîne carbonée la plus longue contenant le carbone lié au groupe $-\\text{NH}_2$.\n   - On numérote pour donner à ce carbone le plus petit indice possible.\n   - *Exemple* : $\\text{CH}_3-\\text{CH}(\\text{NH}_2)-\\text{CH}_2-\\text{CH}_3$ se nomme **butan-2-amine**.\n\n2. **Amines secondaires ($2^\\circ$) et tertiaires ($3^\\circ$)** :\n   - La chaîne la plus longue forme le squelette de l'amine principale.\n   - Les autres groupes alkyles portés par l'azote sont désignés comme des substituants précédés de la lettre majuscule $N-$ (ex : $N$-méthyl, $N$-éthyl).\n   - *Exemple 1* : $\\text{CH}_3-\\text{CH}_2-\\text{NH}-\\text{CH}_3 \\implies$ **$N$-méthyléthanamine**.\n   - *Exemple 2* : $\\text{CH}_3-\\text{N}(\\text{CH}_3)-\\text{CH}_2-\\text{CH}_2-\\text{CH}_3 \\implies$ **$N,N$-diméthylpropan-1-amine**.\n\n3. **Amine aromatique de référence** :\n   - $\\text{C}_6\\text{H}_5-\\text{NH}_2$ : **phénylamine** ou **aniline** (nom accepté par l'UICPA).",
      wolof:
        "« Bu fekkee amine secondaire walla tertiaire la : jëllal chaîne bi gën a gudd def ko principal. Yeneen chaîne yu ndaw yi takku ci azote bi, jox leen préfixe \"N-\" ci kanam (naka N-méthyléthanamine) ! »",
      piege:
        "N'oubliez pas la lettre \"N-\" devant chaque groupe attaché à l'azote ! Écrire \"méthyléthanamine\" sans le \"N-\" est une faute de nomenclature pénalisée au Bac.",
    },
    {
      num: 3,
      shortLabel: 'Basicité & +I',
      title: 'Propriétés Acido-Basiques & Effet Inducteur +I',
      badge: 'Chimie des Solutions',
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
      shortLabel: 'Hofmann',
      title: "Caractère Nucléophile & Polyalkylation d'Hofmann",
      badge: 'Mécanisme Réactionnel',
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
      shortLabel: 'Amides & Coef 2',
      title: "Action sur les Dérivés d'Acides (Synthèse d'Amides)",
      badge: 'Réaction Totale',
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
    <section className="bg-white rounded-3xl border border-navy/10 p-4 sm:p-7 shadow-sm space-y-6 w-full max-w-full overflow-hidden">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy/10 pb-4">
        <div>
          <span className="text-[11px] font-bold text-turquoise uppercase tracking-widest block">
            Fiche Réflexe Baccalauréat Sénégal • Terminale S2
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-navy mt-1">
            Les 5 Réflexes Infaillibles sur les Amines
          </h2>
        </div>
        <span className="rounded-full bg-turquoise-light/30 text-turquoise border border-turquoise/30 px-3 py-1 text-xs font-black">
          C2 : Amines
        </span>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {REFLEXES.map((r, idx) => {
          const isActive = activeTab === idx;
          return (
            <button
              key={r.num}
              onClick={() => setActiveTab(idx)}
              className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-navy text-white border-navy shadow-md'
                  : 'bg-surface hover:bg-surface-muted text-navy border-navy/5'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-1">
                <span
                  className={`text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md ${
                    isActive ? 'bg-white/20 text-white' : 'bg-navy/10 text-navy'
                  }`}
                >
                  R{r.num}
                </span>
                <span className="text-[10px] opacity-70">
                  {r.shortLabel}
                </span>
              </div>
              <span className="text-xs font-bold line-clamp-2">
                {r.title.split('(')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Tab Card */}
      <div className="rounded-2xl border border-navy/10 bg-surface/50 p-5 sm:p-6 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="h-7 w-7 rounded-full bg-navy text-white text-xs font-black flex items-center justify-center">
              {current.num}
            </span>
            <h3 className="text-base sm:text-lg font-black text-navy">
              {current.title}
            </h3>
          </div>
          <span className="rounded-full bg-turquoise-light text-turquoise font-bold text-xs px-2.5 py-0.5">
            {current.badge}
          </span>
        </div>

        {/* Formule clé */}
        <div className="bg-white rounded-xl border border-navy/10 p-4 text-center overflow-x-auto shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-navy/40 block mb-1">
            Formule & Modèle de Référence Bac
          </span>
          <div className="text-navy font-semibold text-sm sm:text-base">
            <MathRenderer content={`$$${current.formule}$$`} />
          </div>
        </div>

        {/* Règle d'or Bac */}
        <div className="bg-emerald-50/80 rounded-xl border border-emerald-200 p-4 space-y-1">
          <span className="text-[11px] font-black uppercase tracking-wider text-emerald-800 flex items-center gap-1.5">
            <span>✓</span> Règle d&apos;or du Bac Sénégal :
          </span>
          <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
            {current.regleBac}
          </p>
        </div>

        {/* Explication détaillée */}
        <div className="bg-white rounded-xl border border-navy/10 p-4 space-y-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-navy/50 block">
            Détails & Démonstration :
          </span>
          <div className="text-xs sm:text-sm text-navy-light leading-relaxed whitespace-pre-line">
            <MathRenderer content={current.explication} />
          </div>
        </div>

        {/* Grille Wolof & Piège Bac */}
        <div className="grid gap-3 sm:grid-cols-2">
          {/* Wolof */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3.5 space-y-1 text-xs text-amber-950">
            <span className="font-bold text-amber-900 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
              <span>💡</span> Xam-xam ci Wolof (Repère Intuitif) :
            </span>
            <p className="italic leading-relaxed">
              {current.wolof}
            </p>
          </div>

          {/* Piège classique */}
          <div className="rounded-xl border border-rose-200 bg-rose-50/60 p-3.5 space-y-1 text-xs text-rose-950">
            <span className="font-bold text-rose-900 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
              <span>⚠️</span> Le Piège Fréquent des Correcteurs :
            </span>
            <p className="leading-relaxed">
              {current.piege}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
