'use client';

import React, { useState } from 'react';
import MathRenderer from '@/components/course/math-renderer';

export default function AlcoolsReflexesCard() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const REFLEXES = [
    {
      num: 1,
      title: 'Les 3 Classes d\'Alcools en 1 clin d\'œil',
      badge: 'Notion Fondamentale',
      formule: '1^\\circ : R-\\mathbf{C}H_2-OH \\qquad 2^\\circ : R-\\mathbf{C}H(OH)-R\' \\qquad 3^\\circ : R-\\mathbf{C}(OH)(R\')-R\'\'',
      regleBac:
        'La classe d\'un alcool est déterminée EXCLUSIVEMENT par le nombre d\'atomes de carbone directement liés au carbone fonctionnel (le carbone qui porte le groupement -OH).',
      explication:
        '1. **Alcool Primaire ($1^\\circ$)** : Le carbone fonctionnel est lié à **au plus un seul** atome de carbone (ou aucun, cas du méthanol $CH_3-OH$). Formule générale : $R-CH_2-OH$.\n   - *Exemples* : Éthanol ($CH_3-CH_2-OH$), Butan-1-ol.\n2. **Alcool Secondaire ($2^\\circ$)** : Le carbone fonctionnel est lié à **deux** atomes de carbone. Formule générale : $R-CH(OH)-R\'$.\n   - *Exemples* : Propan-2-ol ($CH_3-CH(OH)-CH_3$), Butan-2-ol.\n3. **Alcool Tertiaire ($3^\\circ$)** : Le carbone fonctionnel est lié à **trois** atomes de carbone. Formule générale : $R-C(R\')(OH)-R\'\'$.\n   - *Exemples* : 2-méthylpropan-2-ol ($CH_3-C(CH_3)(OH)-CH_3$).',
      wolof:
        '« Xoolal carbone bi yor $-OH$ bi (carbone fonctionnel). Ñaata carbone ñoo ko làpp ? Su dee benn rekk (walla benn sax amul ci méthanol) : mooy classe 1 ($1^\\circ$). Su dee ñaar ñoo ko wër : mooy classe 2 ($2^\\circ$). Su dee ñett ñoo ko rëpp ci wet yépp : mooy classe 3 ($3^\\circ$) ! »',
      piege:
        'Le méthanol $CH_3-OH$ ne possède aucun carbone voisin, mais il est classé par convention stricte comme un alcool PRIMAIRE ($1^\\circ$) au Baccalauréat sénégalais !',
    },
    {
      num: 2,
      title: 'Les 4 Règles d\'Or de la Nomenclature UICPA',
      badge: 'Méthode Infaillible',
      formule: '\\text{Préfixe (Ramifications)} + \\text{Alcane de base} + \\text{Indice position} + \\text{"-ol"}',
      regleBac:
        'Pour nommer un alcool sans se tromper au Bac S2, appliquez rigoureusement les 4 étapes dans l\'ordre.',
      explication:
        '1. **Trouver la chaîne carbonée la plus longue contenant obligatoirement le carbone fonctionnel** (porteur de $-OH$). Attention : ce n\'est pas toujours la chaîne la plus longue en ligne droite !\n2. **Numéroter cette chaîne principale de manière à attribuer au carbone fonctionnel le plus petit numéro possible** (le groupe fonctionnel prime sur tous les substituants alkyles).\n3. **Nommer les ramifications alkyles** (méthyle, éthyle) avec leur indice de position, rangées par ordre alphabétique.\n4. **Remplacer le "e" final du nom de l\'alcane par le suffixe "-ol"**, précédé du numéro du carbone fonctionnel (ex : butan-2-ol, et non pas 2-butanol selon les normes UICPA actuelles).',
      wolof:
        '« Boo bëggée tudd alcool ci règle UICPA : 1. Seetal chaîne bi gën a gudd te yor $-OH$ bi. 2. Gën a jox numero bu ndaw carbone $-OH$ bi (moo gën a am solo que branches yi). 3. Tudd branches yi ak sen numero. 4. Tàppal "-ol" ci mujj gi ak position bi (naka 2-méthylbutan-1-ol) ! »',
      piege:
        'Attention au choix de la chaîne principale : une chaîne à 5 carbones qui ne contient PAS le carbone porteur du $-OH$ ne peut JAMAIS être choisie ! Le carbone fonctionnel est obligatoire.',
    },
    {
      num: 3,
      title: 'Liaisons Hydrogène & Température d\'Ébullition',
      badge: 'Physique Moléculaire',
      formule: '\\delta^- \\mathbf{O} - H^{\\delta^+} \\;\\cdots\\; \\delta^- \\mathbf{O} - H^{\\delta^+} \\implies T_\\text{éb}(\\text{alcool}) \\gg T_\\text{éb}(\\text{alcane})',
      regleBac:
        'Les alcools possèdent des températures d\'ébullition anormalement élevées par rapport aux alcanes de même masse molaire en raison de l\'existence de liaisons hydrogène intermoléculaires.',
      explication:
        'La liaison $O-H$ est fortement polarisée (l\'oxygène est beaucoup plus électronégatif que l\'hydrogène : $\\delta^- O - H \\delta^+$).\n- Il s\'établit entre l\'atome d\'hydrogène d\'une molécule et le doublet non liant de l\'oxygène d\'une molécule voisine une attraction électrostatique appelée **liaison hydrogène**.\n- Pour faire bouillir l\'alcool et passer à l\'état gazeux, il faut apporter une quantité d\'énergie thermique supplémentaire considérable pour rompre ce réseau de liaisons hydrogène.\n- **Comparaison classique Bac S2** :\n  - Éthanol ($M = 46\\text{ g/mol}$) : $T_\\text{éb} = +78^\\circ\\text{C}$ (liquide à température ambiante).\n  - Propane ($M = 44\\text{ g/mol}$) : $T_\\text{éb} = -42^\\circ\\text{C}$ (gaz à température ambiante).',
      wolof:
        '« Li tax éthanol di liquide ba $78^\\circ\\text{C}$ fekk propane di gaz ci $-42^\\circ\\text{C}$, fekk ñoom ñaar ñoo bëgg a tolloo masse : mooy liaisons hydrogène yi ! Molécules u alcool yi dañuy jàppante lool naka aimant, war nga tàngal bu baax pour ñu mëna tas di dem ci asamaan ! »',
      piege:
        'Au Bac, justifiez toujours en citant explicitement : « la forte polarisation de la liaison O-H due à la différence d\'électronégativité entre O et H, conduisant à la formation de liaisons hydrogène intermoléculaires ». C\'est le barème officiel.',
    },
    {
      num: 4,
      title: 'Solubilité dans l\'Eau : Hydrophile vs Hydrophobe',
      badge: 'Équilibre & Miscibilité',
      formule: '\\text{Chaîne } R\\text{ (lipophile / hydrophobe)} \\quad \\longleftrightarrow \\quad \\text{Groupe } -OH\\text{ (hydrophile / polaire)}',
      regleBac:
        'La solubilité des alcools dans l\'eau diminue très rapidement lorsque la longueur de la chaîne carbonée augmente.',
      explication:
        'Une molécule d\'alcool comporte deux parties aux propriétés opposées :\n1. **Le groupe $-OH$** : polaire et hydrophile, capable de former des liaisons hydrogène avec les molécules d\'eau ($H_2O$).\n2. **La chaîne carbonée $R-$** : apolaire et hydrophobe (lipophile).\n\n- **Pour $n = 1, 2, 3$ (Méthanol, Éthanol, Propan-1-ol)** : le groupe hydrophile $-OH$ est prépondérant $\\implies$ **miscibilité infinie (totale)** avec l\'eau en toutes proportions.\n- **Pour $n = 4$ (Butan-1-ol)** : solubilité limitée à environ $9\\text{ g/100 mL}$ à $20^\\circ\\text{C}$.\n- **Pour $n \\ge 5$ (Pentanol, Hexanol...)** : la longue chaîne carbonée hydrophobe l\'emporte $\\implies$ l\'alcool devient **quasiment insoluble** et forme deux phases distinctes (l\'alcool surnage car sa densité $d \\approx 0{,}8$ est inférieure à celle de l\'eau).',
      wolof:
        '« Groupe $-OH$ dafa bëgg ndox (hydrophile) ndax dafay def liaisons hydrogène ak ndox. Chaîne carbone bi moom dafa bañ ndox (hydrophobe). Bu chaîne bi gàttée (1 ba 3 carbones), ndox mi dafay jaxaso bu baax. Bu chaîne bi guddée (pentanol, octanol), dafay dem ci kaw te du jaxaso mukk ! »',
      piege:
        'Ne dites jamais que tous les alcools sont solubles dans l\'eau ! Seuls les trois premiers le sont totalement. Dès 5 atomes de carbone, ils sont insolubles.',
    },
    {
      num: 5,
      title: 'Le Test de Lucas : Identification Immédiate de la Classe',
      badge: 'Protocole Expérimental',
      formule: 'R-OH + HCl \\xrightarrow{ZnCl_2} R-Cl_{(s/liq\\;trouble)} + H_2O',
      regleBac:
        'Le réactif de Lucas est une solution de chlorure de zinc anhydre ($ZnCl_2$) dissous dans l\'acide chlorhydrique concentré ($HCl$). Il permet de distinguer les trois classes d\'alcools par la vitesse d\'apparition d\'un trouble laiteux.',
      explication:
        'Le produit formé, le dérivé chloré $R-Cl$, est insoluble dans l\'eau, ce qui provoque un trouble laiteux ou une émulsion dans le tube à essai :\n- **Alcool Tertiaire ($3^\\circ$)** : réaction quasi-instantanée $\\implies$ **trouble immédiat à froid** (en moins de 30 secondes).\n- **Alcool Secondaire ($2^\\circ$)** : réaction plus lente $\\implies$ **trouble après 5 minutes** à température ambiante (ou à tiède).\n- **Alcool Primaire ($1^\\circ$)** : à température ambiante, **aucun trouble n\'apparaît** même après plusieurs heures (il faut chauffer intensément pour observer une réaction).',
      wolof:
        '« Test de Lucas mooy scanner u classes d\'alcool ci labo : nga sotti réactif bi ($ZnCl_2 + HCl$).\n- Alcool tertiaire ($3^\\circ$) : dafay xonq immédiatement ci saasi (< 1 min) !\n- Alcool secondaire ($2^\\circ$) : dafay toog ba 5 minutes doog a xonq.\n- Alcool primaire ($1^\\circ$) : dafay sedd guyy, du xonq mukk ci seddaay bi ! »',
      piege:
        'Le test de Lucas n\'est valable que pour les monoalcools comportant moins de 6 atomes de carbone (au-delà, l\'alcool lui-même n\'est pas soluble dans le réactif de Lucas aqueux).',
    },
  ];

  const current = REFLEXES[activeTab];

  return (
    <section className="bg-white rounded-3xl border border-navy/10 p-5 sm:p-7 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy/10 pb-4">
        <div>
          <span className="text-[11px] font-bold text-turquoise uppercase tracking-widest block">
            Fiche Réflexe Baccalauréat Sénégal • Terminale S2
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-navy mt-1">
            Les 5 Réflexes Infaillibles sur les Alcools
          </h2>
        </div>
        <span className="rounded-full bg-turquoise-light/30 text-turquoise border border-turquoise/30 px-3 py-1 text-xs font-black">
          C1 : Alcools
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
                  {idx === 0 ? 'Classes' : idx === 1 ? 'Nomenclature' : idx === 2 ? 'Liaisons H' : idx === 3 ? 'Solubilité' : 'Lucas'}
                </span>
              </div>
              <span className="text-xs font-bold line-clamp-2">
                {r.title.split(':')[0]}
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

