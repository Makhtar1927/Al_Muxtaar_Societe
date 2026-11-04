'use client';

import React, { useState } from 'react';
import MathRenderer from '@/components/course/math-renderer';

export default function AcidesDerivesReflexesCard() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const REFLEXES = [
    {
      num: 1,
      shortLabel: 'Nomenclature',
      title: 'Les 5 Familles de Dérivés d\'Acides',
      badge: 'Nomenclature & Fonctions',
      formule: '\\text{Acide } R-\\text{COOH} \\quad | \\quad \\text{Ester } R-\\text{COO}-R\' \\quad | \\quad \\text{Chlorure } R-\\text{COCl} \\quad | \\quad \\text{Anhydride } (R\\text{CO})_2\\text{O} \\quad | \\quad \\text{Amide } R-\\text{CONH}_2',
      regleBac:
        'Sachez identifier et nommer sans hésitation les 5 familles dérivées du groupe carbonyle au Baccalauréat sénégalais S2.',
      explication:
        '1. **Acides carboxyliques ($R-\\text{COOH}$)** :\n   - Nom : *Acide + alcane + -oïque*. Exemple : Acide propanoïque ($\\text{CH}_3-\\text{CH}_2-\\text{COOH}$).\n\n2. **Esters ($R-\\text{COO}-R\'$)** :\n   - Nom : *Alcanoate de + nom du groupe alkyle $R\'$*. Exemple : Méthanoate d\'éthyle ($\\text{H}-\\text{COO}-\\text{CH}_2-\\text{CH}_3$).\n\n3. **Chlorures d\'acyle ($R-\\text{CO}-\\text{Cl}$)** :\n   - Dérivé le plus réactif. Nom : *Chlorure d\'alcanoyle*. Exemple : Chlorure d\'éthanoyle ($\\text{CH}_3-\\text{CO}-\\text{Cl}$).\n\n4. **Anhydrides d\'acide ($R-\\text{CO}-\\text{O}-\\text{CO}-R$)** :\n   - Obtenus par déshydratation intermoléculaire d\'acides. Nom : *Anhydride + alcanoïque*. Exemple : Anhydride éthanoïque ($(\\text{CH}_3\\text{CO})_2\\text{O}$).\n\n5. **Amides ($R-\\text{CO}-\\text{NR}\'R\'\'$)** :\n   - Nom : *Alcanamide*. Exemple : $N$-méthyléthanamide ($\\text{CH}_3-\\text{CO}-\\text{NH}-\\text{CH}_3$).',
      wolof:
        "« 5 familles yii dañuy bokk groupe carbonyle C=O :\n- Acide : am na -COOH ci caat gi.\n- Ester : acide boole ak alcool (alcanoate d'alkyle, am na xet yu neex).\n- Chlorure d'acyle : azote amul, Cl la yor, dafa gaaw réagir lool.\n- Anhydride : ñaari acides ñoo lakkaloo ci digg bi.\n- Amide : C=O bi dafa lakkaloo ak azote N ! »",
      piege:
        'Pour nommer un ester R—COO—R\', la chaîne R attachée au carbone du carbonyle donne le suffixe "-oate", et le groupe R\' lié à l\'oxygène donne le nom de l\'alkyle. Ne permutez jamais les deux !',
    },
    {
      num: 2,
      shortLabel: 'Estérification',
      title: 'Les 4 Caractéristiques de l\'Estérification Directe',
      badge: 'Équilibre Chimique',
      formule: 'R-\\text{COOH} + R\'-\\text{OH} \\;\\underset{\\text{Hydrolyse}}{\\overset{\\text{Estérification}}{\\rightleftharpoons}}\\; R-\\text{COO}-R\' + \\text{H}_2\\text{O}',
      regleBac:
        'L\'estérification directe entre un acide carboxylique et un alcool est une réaction LENTE, LIMITÉE, RÉVERSIBLE et ATHERMIQUE.',
      explication:
        '1. **Lente** : À température ambiante, l\'équilibre met plusieurs semaines à s\'établir. On utilise un catalyseur acide (ions $\\text{H}_3\\text{O}^+$ ou $\\text{H}_2\\text{SO}_4$ concentré) et on chauffe à reflux pour accélérer les chocs sans perte de matière.\n\n2. **Limitée (Équilibre chimique)** : La réaction s\'arrête lorsque la vitesse d\'estérification égale la vitesse d\'hydrolyse. Les 4 réactifs et produits coexistent à l\'état final.\n\n3. **Réversible** : L\'ester formé réagit avec l\'eau pour redonner l\'acide et l\'alcool (réaction inverse d\'hydrolyse).\n\n4. **Athermique ($\\Delta H \\approx 0$)** : La réaction ne dégage ni n\'absorbe de chaleur. Conséquence capitale au Bac : **la température accélère la réaction mais ne modifie STRICTEMENT PAS la composition à l\'équilibre ni le rendement final !**',
      wolof:
        "« Règle 4 yii ci Bac S2 war nga leen wax à chaque fois :\n- Lente : dafay toog ba yàgg, motax ñuy sotti acide sulfurique H₂SO₄.\n- Limitée : du jeex mukk, dafay tollu ci équilibre.\n- Réversible : ester bi ak ndox mi mën nañu delsiwaat ci acide ak alcool.\n- Athermique : tàngay bi du soppi rendement bi mukk, dafay accélérer rek ! »",
      piege:
        'Ne confondez pas vitesse et équilibre ! Chauffer permet d\'atteindre l\'équilibre en 1 heure au lieu de 3 semaines, mais le pourcentage final d\'ester formé reste RIGOUREUSEMENT LE MÊME.',
    },
    {
      num: 3,
      shortLabel: 'Rendements & Classes',
      title: 'Rendement d\'Estérification selon la Classe d\'Alcool',
      badge: 'Règle d\'or du Bac',
      formule: 'r(1^\\circ) = 67\\% \\; (K=4) \\qquad r(2^\\circ) = 60\\% \\; (K=2{,}25) \\qquad r(3^\\circ) = 5\\% \\text{ à } 10\\%',
      regleBac:
        'Pour un mélange équimolaire initial (1 mol d\'acide + 1 mol d\'alcool), le rendement limite dépend UNIQUEMENT de la classe de l\'alcool utilisé.',
      explication:
        'À partir d\'un mélange équimolaire $n_0(\\text{acide}) = n_0(\\text{alcool}) = 1\\text{ mol}$ :\n\n- **Alcool primaire ($1^\\circ$)** : $n(\\text{ester})_\\text{éq} = \\frac{2}{3}\\text{ mol} \\implies r = \\mathbf{67\\%}$.\n  $$\\text{Constante d\'équilibre : } K = \\frac{[\\text{Ester}][\\text{Eau}]}{[\\text{Acide}][\\text{Alcool}]} = \\frac{(2/3)(2/3)}{(1/3)(1/3)} = \\mathbf{4}$$\n\n- **Alcool secondaire ($2^\\circ$)** : $n(\\text{ester})_\\text{éq} = 0{,}60\\text{ mol} \\implies r = \\mathbf{60\\%}$.\n  $$\\text{Constante d\'équilibre : } K = \\frac{(0{,}6)(0{,}6)}{(0{,}4)(0{,}4)} = \\mathbf{2{,}25}$$\n\n- **Alcool tertiaire ($3^\\circ$)** : Encombrement stérique maximal $\\implies r = \\mathbf{5\\% \\text{ à } 10\\%}$ seulement ($K \\approx 0{,}005$).\n\n- **Comment déplacer l\'équilibre et augmenter le rendement ?**\n  1. Utiliser un excès de l\'un des réactifs (acide ou alcool).\n  2. Éliminer l\'un des produits au fur et à mesure (distiller l\'ester le plus volatil ou piéger l\'eau avec un appareil de Dean-Stark).',
      wolof:
        "« Li mooy scanner u classes d'alcool ci Bac S2 :\n- Bu mélangé équimolaire joxee 67% (2/3) : alcool primaire la, K = 4 !\n- Bu joxee 60% : alcool secondaire la, K = 2,25 !\n- Bu joxee lu néew lool (5% ba 10%) : alcool tertiaire la ndax branches yi dañuy xat ! »",
      piege:
        'La constante d\'équilibre K est adimensionnelle (sans unité) et NE dépend QUE de la classe de l\'alcool. Elle ne dépend ni des concentrations initiales, ni de la pression, ni de la température (car réaction athermique).',
    },
    {
      num: 4,
      shortLabel: 'Dérivés Réactifs',
      title: 'Estérification Totale par les Chlorures et Anhydrides',
      badge: 'Réactions Totales',
      formule: 'R-\\text{COCl} + R\'-\\text{OH} \\xrightarrow{\\text{totale, rapide}} R-\\text{COO}-R\' + \\text{HCl} \\qquad (r = 100\\%)',
      regleBac:
        'Pour obtenir un rendement quantitatif (100%) sans équilibre et de manière rapide, on remplace l\'acide carboxylique par un chlorure d\'acyle ou un anhydride d\'acide.',
      explication:
        '1. **Avec un chlorure d\'acyle ($R-\\text{COCl}$)** :\n   - Réaction **totale, rapide et exothermique** dès la température ambiante.\n   - Dégagement de chlorure d\'hydrogène gazeux $\\text{HCl}$ (fumées acides).\n   - On ajoute souvent une base (pyridine) pour neutraliser le $\\text{HCl}$ formé.\n   - Rendement : **$r = 100\\%$**, même avec un alcool tertiaire !\n\n2. **Avec un anhydride d\'acide ($R-\\text{CO}-\\text{O}-\\text{CO}-R$)** :\n   - Réaction **totale et rapide à chaud**.\n   - Équation-bilan : $(R\\text{CO})_2\\text{O} + R\'-\\text{OH} \\longrightarrow R-\\text{COO}-R\' + R-\\text{COOH}$.\n   - Avantage industriel : pas de dégagement de $\\text{HCl}$ corrosif, synthèse courante de l\'aspirine (acide acétylsalicylique).',
      wolof:
        "« Boo bëggée am 100% rendement te bañ di xaar équilibre chimique : bayyil acide carboxylique bi ! Jëlal chlorure d'acyle walla anhydride d'acide. Dafay gaaw, du am retour, te 100% lay joxe ci saasi ! »",
      piege:
        'L\'action d\'un chlorure d\'acyle sur un alcool est TOTALE et NON réversible : il est rigoureusement interdit d\'écrire une double flèche d\'équilibre dans l\'équation au Bac !',
    },
    {
      num: 5,
      shortLabel: 'Saponification',
      title: 'Saponification des Esters & Fabrication du Savon',
      badge: 'Chimie Industrielle & Vie Réelle',
      formule: '\\text{Triglycéride} + 3(\\text{Na}^+ + \\text{OH}^-) \\xrightarrow{\\Delta} \\text{Glycérol} + 3(R-\\text{COO}^- + \\text{Na}^+) \\; [\\text{Savon}]',
      regleBac:
        'La saponification est l\'hydrolyse basique d\'un ester par une solution d\'hydroxyde de sodium (soude) ou de potassium (potasse). C\'est une réaction TOTALE et LENTE à froid, accélérée par chauffage.',
      explication:
        '1. **Hydrolyse basique d\'un ester simple** :\n   $$R-\\text{COO}-R\' + \\text{OH}^- \\longrightarrow R-\\text{COO}^- + R\'-\\text{OH}$$\n   L\'ion hydroxyde attaque le carbone du carbonyle et forme un ion carboxylate $R-\\text{COO}^-$ stable qui ne peut plus réagir avec l\'alcool : la réaction est donc **IRRÉVERSIBLE (TOTALE)**.\n\n2. **Saponification d\'un corps gras (Triglycéride)** :\n   - Un corps gras est un triester du glycérol (propane-1,2,3-triol) et d\'acides gras à longue chaîne (acide oléique, stéarique, palmitique).\n   - Bilan stœchiométrique impératif : **1 mole de triester nécessite 3 moles de soude** $\\text{NaOH}$ pour donner 1 mole de glycérol et **3 moles de savon**.\n\n3. **Le Relargage au laboratoire (Expérience clé)** :\n   - Après chauffage, on verse le mélange dans une solution saturée de chlorure de sodium (eau salée $\\text{NaCl}$).\n   - Le savon, peu soluble dans l\'eau salée dense, précipite immédiatement et surnage (formation du pain de savon solide).\n\n4. **Propriétés amphiphiles du savon** :\n   - Queue hydrophobe/lipophile (longue chaîne carbonée $R-$ qui s\'accroche aux graisses).\n   - Tête hydrophile polaire ($-COO^-$ qui se lie à l\'eau pour former des micelles lavantes).',
      wolof:
        "« Saponification mooy ñam u savon ci labo :\n1. Jëlal diw (triglycéride) boole ko ak soude NaOH tàngal ko.\n2. 1 mole diw dafay laaj 3 moles soude pour joxe 1 glycérol ak 3 savons !\n3. Boo ci sotti ndox mu am khorom (eau salée NaCl), savon bi dafay solidifier ci kaw (mooy relargage) !\n4. Savon dafa am loxo bu bëgg diw (lipophile) ak loxo bu bëgg ndox (hydrophile), looloo tax mu mën a raxas ! »",
      piege:
        'N\'oubliez jamais le coefficient 3 devant la soude NaOH lors de la saponification d\'un triglycéride ! 1 triester = 3 fonctions esters à couper = 3 moles de NaOH consommées = 3 molécules de savon produites.',
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
            Les 5 Réflexes sur les Acides & Dérivés
          </h2>
        </div>
        <span className="rounded-full bg-turquoise-light/30 text-turquoise border border-turquoise/30 px-3 py-1 text-xs font-black">
          C3 : Acides & Dérivés
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
                {r.title}
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

