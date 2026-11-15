'use client';

import React, { useState } from 'react';
import MathRenderer from '@/components/course/math-renderer';

interface ReflexItem {
  id: number;
  title: string;
  badge: string;
  summary: string;
  formula: string;
  demonstration: string;
  wolof: string;
  bacTrap: string;
  scoringGuide: string;
}

const LUMIERE_REFLEXES: ReflexItem[] = [
  {
    id: 1,
    title: 'Dispositif d’Young : Différence de Marche & Position des Franges',
    badge: 'Interférences lumineuses',
    summary:
      'Deux fentes fines parallèles $F_1$ et $F_2$ distantes de $a$, éclairées par une source monochromatique synchrone, produisent sur un écran à distance $D$ un champ d’interférences constitué d’une alternance de franges brillantes et sombres.',
    formula:
      '\\delta = d_2 - d_1 = \\frac{a \\cdot x}{D} \\quad ; \\quad x_k^{\\text{brillante}} = k\\,\\frac{\\lambda D}{a} \\quad ; \\quad x_{k\'}^{\\text{sombre}} = \\left(k\' + \\frac{1}{2}\\right)\\frac{\\lambda D}{a} \\quad (k, k\' \\in \\mathbb{Z})',
    demonstration:
      '1. **Approximation des petits angles ($a \\ll D$ et $x \\ll D$)** :\n   Dans le triangle des trajets optiques, la différence de marche s’écrit :\n   $$\\delta = d_2 - d_1 = a\\sin\\theta \\approx a\\tan\\theta = a\\,\\frac{x}{D}$$\n2. **Franges brillantes (interférences constructives)** :\n   Les deux ondes arrivent en phase à l’écran si $\\delta = k\\,\\lambda$ ($k \\in \\mathbb{Z}$, ordre d’interférence) :\n   $$\\frac{a x}{D} = k\\,\\lambda \\implies \\mathbf{x_k = k\\,\\frac{\\lambda D}{a}}$$\n   Pour $k = 0$, $x_0 = 0$ correspond à la **frange centrale brillante**.\n3. **Franges sombres (interférences destructives)** :\n   Les ondes arrivent en opposition de phase si $\\delta = (2k\' + 1)\\dfrac{\\lambda}{2} = \\left(k\' + \\dfrac{1}{2}\\right)\\lambda$ :\n   $$\\frac{a x}{D} = \\left(k\' + \\frac{1}{2}\\right)\\lambda \\implies \\mathbf{x_{k\'} = \\left(k\' + \\frac{1}{2}\\right)\\frac{\\lambda D}{a}}$$',
    wolof:
      '« Ci fentes d\'Young yi, ñaari source yu synchrones te cohérentes dañuy dajalo ci écran bi. Bu onde yi àndee ci phase (ñaari xool yi dëppoo), dañuy yokkante doole def barab bu leer nàññ (frange brillante, $\\delta = k\\lambda$). Bu ñu fegoo nak (opposition de phase), dañuy feye seen biir def lëndëm gu tëcc (frange sombre, $\\delta = (k+1/2)\\lambda$). Ci digg bi rekk la $x=0$, fa la frange centrale brillante bi nekk ! »',
    bacTrap:
      'Attention impérative aux unités : $a$ est en millimètres ($10^{-3}$ m), $x$ en millimètres, $D$ en mètres, et $\\lambda$ en nanomètres ($10^{-9}$ m). Convertissez TOUJOURS en mètres avant d’effectuer le calcul numérique !',
    scoringGuide:
      'Schéma optique annoté des trajets $d_1$ et $d_2$ (0,25 pt) • Expression géométrique $\\delta = ax/D$ (0,5 pt) • Conditions d’interférences constructives et destructives (0,5 pt).',
  },
  {
    id: 2,
    title: 'Interfrange i, Mesure sur n Intervalles & Déplacement par une Lame',
    badge: 'Interfrange & Lame mince',
    summary:
      'L’interfrange $i$ est la distance séparant les milieux de deux franges consécutives de même nature. L’interposition d’une lame mince translate le système de franges sans modifier l’interfrange.',
    formula:
      'i = \\frac{\\lambda D}{a} \\quad ; \\quad L = n \\cdot i = (N - 1) \\cdot i \\quad ; \\quad \\Delta x = \\frac{(n_{\\text{lame}} - 1)\\,e\\,D}{a}',
    demonstration:
      '1. **Définition de l’interfrange** :\n   Distance entre deux franges brillantes consécutives $k$ et $k+1$ :\n   $$i = x_{k+1} - x_k = (k+1)\\frac{\\lambda D}{a} - k\\frac{\\lambda D}{a} = \\mathbf{\\frac{\\lambda D}{a}}$$\n2. **Méthode de mesure de haute précision (Bac S2)** :\n   Sur une distance $L$ mesurée entre $N$ franges brillantes consécutives, il y a exactement $n = (N - 1)$ interfranges :\n   $$L = (N - 1)\\,i \\implies \\mathbf{i = \\frac{L}{N - 1}} \\implies \\lambda = \\frac{a\\,i}{D}$$\n3. **Interposition d’une lame transparente d’épaisseur $e$ et d’indice $n$ devant $F_1$** :\n   Le trajet optique dans $F_1$ augmente de $(n - 1)e$. La nouvelle différence de marche devient :\n   $$\\delta\' = \\frac{ax}{D} - (n - 1)e$$\n   La frange centrale ($\\delta\' = 0$) se translate vers la fente couverte $F_1$ de :\n   $$\\mathbf{\\Delta x = \\frac{(n - 1)\\,e\\,D}{a}}$$\n   L’interfrange $i = \\dfrac{\\lambda D}{a}$ reste rigoureusement inchangé !',
    wolof:
      '« Bii mooy piège numéro 1 au Bac S2 ! Boo natté distance $L$ ci diggante $N$ franges brillantes, limu intervalles $i$ bi dafay nekk $N - 1$, du $N$ ! Su ñu waxee 6 franges consécutives, am na 5 interfranges ($L = 5i$). Te itam, su ñu doliwé lame transparente ci kanam $F_1$, système de franges bi dafay daanu ci wetu $F_1$ (vers la fente couverte), waaye interfrange $i$ bi du soppiku mukk ! »',
    bacTrap:
      'Ne comptez jamais $N$ interfranges pour $N$ franges : 5 franges = 4 interfranges ! De plus, la lame ne change jamais la valeur de $i$, elle déplace uniquement la position de l’ensemble des franges.',
    scoringGuide:
      'Définition et formule de l’interfrange $i$ (0,25 pt) • Règle $L = (N-1)i$ (0,5 pt) • Expression du déplacement $\\Delta x$ et sens de décalage vers la fente munie de la lame (0,5 pt).',
  },
  {
    id: 3,
    title: 'Dualité Onde-Corpuscule, Photon d’Einstein & Relations Fondamentales',
    badge: 'Physique quantique',
    summary:
      'La lumière présente une double nature : ondulatoire lors de sa propagation (diffraction, interférences), et corpusculaire lors de ses échanges d’énergie avec la matière (émission, absorption, effet photoélectrique).',
    formula:
      'E = h\\nu = \\frac{hc}{\\lambda} \\quad ; \\quad p = \\frac{h}{\\lambda} = \\frac{E}{c} \\quad (h \\approx 6{,}626 \\times 10^{-34}\\text{ J}\\cdot\\text{s} \\; ; \\; 1\\text{ eV} = 1{,}6 \\times 10^{-19}\\text{ J})',
    demonstration:
      '1. **Hypothèse des quanta de Planck (1900)** :\n   Les échanges d’énergie entre rayonnement et matière s’effectuent de manière discontinue par paquets d’énergie $\\Delta E = h\\nu$.\n2. **Postulat du photon d’Einstein (1905)** :\n   La lumière est elle-même un flux de corpuscules (photons) d’énergie $E = h\\nu$ se propageant dans le vide à la vitesse $c = 3 \\times 10^8$ m/s, de masse nulle au repos et de charge nulle.\n3. **Relation de De Broglie (1924)** :\n   La quantité de mouvement associée au photon est :\n   $$p = \\frac{E}{c} = \\frac{h\\nu}{c} = \\frac{h}{\\lambda} \\iff \\lambda = \\frac{h}{p}$$\n4. **Conversions fondamentales obligatoires** :\n   - Pour convertir des Joules (J) en électron-volts (eV) : diviser par $1{,}6 \\times 10^{-19}$.\n   - Pour convertir des électron-volts (eV) en Joules (J) : multiplier par $1{,}6 \\times 10^{-19}$.',
    wolof:
      '« Leer bi ñaari melokaan la yor (dualité onde-corpuscule) : su koy dox ci jaww ji (propagation), dafay mel ni onde (interférences, diffraction). Waaye bu dencoo ak matière bi (absorption, émission), dafay mel ni ay balle yu sew-sew (photons) yu yor énergie $E = h\\nu = hc/\\lambda$. Bul fatte mukk : ci formules $h\\nu$, da nga wara soppi énergie bi def ko en Joules (J) bala ngay calculé ! »',
    bacTrap:
      'Grosse erreur de calcul au Bac : injecter des énergies en eV dans la formule $E = h\\nu$. Vous devez OBLIGATOIREMENT convertir l’énergie en Joules avant d’appliquer la constante de Planck $h$.',
    scoringGuide:
      'Formule de Planck-Einstein $E = h\\nu = hc/\\lambda$ (0,5 pt) • Conversion correcte eV $\\leftrightarrow$ Joules (0,25 pt) • Énoncé de la dualité onde-corpuscule (0,25 pt).',
  },
  {
    id: 4,
    title: 'Effet Photoélectrique, Travail d’Extraction W₀ & Seuil Photoélectrique',
    badge: 'Effet photoélectrique',
    summary:
      'L’effet photoélectrique est l’extraction d’électrons d’un métal sous l’impact de photons incidents. Il ne se déclenche que si l’énergie du photon incident est supérieure ou égale au travail d’extraction $W_0$ du métal.',
    formula:
      'h\\nu \\ge W_0 \\iff \\mathbf{\\nu \\ge \\nu_0 = \\frac{W_0}{h}} \\iff \\mathbf{\\lambda \\le \\lambda_0 = \\frac{hc}{W_0}} \\quad ; \\quad W_0 = h\\nu_0 = \\frac{hc}{\\lambda_0}',
    demonstration:
      '1. **Processus élémentaire** :\n   Un photon incident n’interagit qu’avec un et un seul électron du réseau cristallin métallique (interaction $1 \\text{ photon} \\leftrightarrow 1 \\text{ électron}$).\n2. **Travail d’extraction $W_0$** :\n   C’est l’énergie minimale nécessaire pour arracher un électron superficiel du métal sans lui donner de vitesse initiale.\n3. **Conditions d’existence de l’effet photoélectrique** :\n   - En fréquence : $\\nu \\ge \\nu_0$ où $\\nu_0 = \\dfrac{W_0}{h}$ est la **fréquence seuil**.\n   - En longueur d’onde : $\\lambda \\le \\lambda_0$ où $\\lambda_0 = \\dfrac{hc}{W_0}$ est la **longueur d’onde seuil** (seuil rouge).\n4. **Insuffisance de la théorie ondulatoire** :\n   Si $\\nu < \\nu_0$ (ou $\\lambda > \\lambda_0$), aucun électron n’est éjecté, même si on augmente considérablement la puissance ou l’intensité du flux lumineux incident !',
    wolof:
      '« Ci effet photoélectrique, photon bu nekk bénn électron kesse lay jël (1 photon pour 1 électron). Su photon bi amul énergie bu mat travail d’extraction $W_0$ bi (ndax $\\nu < \\nu_0$ wala $\\lambda > \\lambda_0$), bénn électron du génn métale bi, doonte nga doli puissance lampe bi ba mu ëpp ! Su fekkee $\\nu \\ge \\nu_0$, électrons dañuy génn, te su nga gënë yokk puissance lumineuse bi, limu électrons yiy génn rekk ngay yokk. »',
    bacTrap:
      'Attention au sens de la condition : pour la fréquence c’est $\\nu \\ge \\nu_0$ (plus élevée), mais pour la longueur d’onde c’est $\\lambda \\le \\lambda_0$ (plus courte). Ne confondez pas ces deux sens contraires.',
    scoringGuide:
      'Condition d’existence de l’effet photoélectrique $h\\nu \\ge W_0$ (0,5 pt) • Définitions littérales de $\\nu_0$ et $\\lambda_0$ (0,5 pt) • Justification du seuil par la nature corpusculaire (0,25 pt).',
  },
  {
    id: 5,
    title: 'Bilan d’Einstein, Énergie Cinétique Maximale & Potentiel d’Arrêt U₀',
    badge: 'Bilan d’Einstein & Millikan',
    summary:
      'Le surplus d’énergie du photon au-delà de $W_0$ est intégralement conféré à l’électron émis sous forme d’énergie cinétique maximale. Le potentiel d’arrêt $U_0$ est la tension qui annule le courant.',
    formula:
      'E_c^{\\max} = \\frac{1}{2}m v_{\\max}^2 = h\\nu - W_0 = hc\\left(\\frac{1}{\\lambda} - \\frac{1}{\\lambda_0}\\right) \\quad ; \\quad e\\,|U_0| = E_c^{\\max} \\implies |U_0| = \\frac{h}{e}\\nu - \\frac{W_0}{e}',
    demonstration:
      '1. **Bilan énergétique d’Einstein** :\n   $$E_{\\text{photon}} = W_{\\text{extraction}} + E_{c}^{\\max} \\iff h\\nu = W_0 + \\frac{1}{2}m v_{\\max}^2$$\n2. **Vitesse maximale des photoélectrons** :\n   $$v_{\\max} = \\sqrt{\\frac{2(h\\nu - W_0)}{m}} = \\sqrt{\\frac{2hc}{m}\\left(\\frac{1}{\\lambda} - \\frac{1}{\\lambda_0}\\right)}$$\n3. **Potentiel d’arrêt (tension d’arrêt) $|U_0|$** :\n   Dans une cellule photoélectrique, en appliquant une tension retardatrice opposée $U_{AK} < 0$, les électrons sont freinés par le champ électrique opposé.\n   Le photocourant s’annule pour la tension d’arrêt $U_{AK} = -|U_0|$ telle que :\n   $$|W(\\vec{F}_e)| = e\\,|U_0| = E_c^{\\max} = h\\nu - W_0$$\n4. **Droite expérimentale de Millikan** :\n   $$|U_0| = \\left(\\frac{h}{e}\\right)\\nu - \\frac{W_0}{e}$$\n   C’est une droite affine de pente $\\dfrac{h}{e}$ et d’abscisse à l’origine $\\nu_0$ permettant de déterminer expérimentalement la constante de Planck $h$.',
    wolof:
      '« Bilan d’Einstein mooy doole : énergie photon bi ($h\\nu$) dafay jël benn cër ngir génne électron bi ($W_0$), li ci des mooy énergie cinétique maximale bi ($E_c^{\\max} = \\frac{1}{2}mv_{\\max}^2$). Tension d’arrêt $|U_0|$ bi mooy frein bi : tension bi nga wara teg ngir téye électrons yi gën a gaaw ba courant bi nekk zéro ($e|U_0| = E_c^{\\max}$). Droite Millikan bi $|U_0| = f(\\nu)$ dafay am pente $h/e$. »',
    bacTrap:
      'Le potentiel d’arrêt $|U_0|$ s’exprime en Volts (V), et $e|U_0|$ est directement l’énergie cinétique maximale en électron-volts (eV) ! Ne confondez pas $U_0$ et $E_c^{\\max}$ lors des calculs numériques.',
    scoringGuide:
      'Équation du bilan d’Einstein (0,5 pt) • Expression littérale de $v_{\\max}$ (0,5 pt) • Relation $e|U_0| = E_c^{\\max}$ et exploitation de la droite de Millikan (0,5 pt).',
  },
  {
    id: 6,
    title: 'Modèle de Bohr, Niveaux d’Énergie de l’Hydrogène & Spectres de Raies',
    badge: 'Atome de Bohr & Spectres',
    summary:
      'L’atome d’hydrogène ne peut exister que dans des états discrets d’énergie stationnaires. Toute transition électronique entre deux niveaux s’accompagne de l’émission ou de l’absorption d’un photon unique.',
    formula:
      'E_n = -\\frac{E_0}{n^2} = -\\frac{13{,}6}{n^2} \\text{ (eV)} \\quad ; \\quad \\Delta E = |E_p - E_n| = h\\nu = \\frac{hc}{\\lambda} \\quad (n, p \\in \\mathbb{N}^*)',
    demonstration:
      '1. **Niveaux d’énergie de l’atome d’hydrogène** :\n   - État fondamental ($n = 1$) : $E_1 = -13{,}6$ eV (état le plus stable).\n   - États excités ($n > 1$) : $E_2 = -3{,}40$ eV, $E_3 = -1{,}51$ eV, $E_4 = -0{,}85$ eV...\n   - État ionisé ($n \\to \\infty$) : $E_\\infty = 0$ eV. Énergie d’ionisation depuis le fondamental : $E_i = E_\\infty - E_1 = +13{,}6$ eV.\n2. **Condition de fréquence de Bohr (Postulat de Bohr)** :\n   - **Émission de lumière (désexcitation $p \\to n$ avec $p > n$)** :\n     $$E_p - E_n = h\\nu = \\frac{hc}{\\lambda} > 0$$\n   - **Absorption de lumière ($n \\to p$)** : l’atome ne peut absorber qu’un photon d’énergie EXACTEMENT égale à $\\Delta E = E_p - E_n$.\n3. **Séries spectrales officielles au Bac S2** :\n   - **Série de Lyman** (transitions vers $n = 1$) : domaine Ultraviolet (UV).\n   - **Série de Balmer** (transitions vers $n = 2$) : domaine Visible (raies $H_\\alpha = 656$ nm rouge, $H_\\beta = 486$ nm cyan, $H_\\gamma = 434$ nm bleu, $H_\\delta = 410$ nm violet).\n   - **Série de Paschen** (transitions vers $n = 3$) : domaine Infrarouge (IR).',
    wolof:
      '« Ci atome bu Bohr, électron bi meenul nekk fu ko neex ci wëru noyau bi. Ay colline d\'énergie stationnaires bien précises rekk lay am : $E_n = -13{,}6/n^2$ eV. Bumu jógee ci niveau bu kawe $p$ wàcc ci niveau bu suufe $n$, dafay génne bénn photon bu am énergie $\\Delta E = E_p - E_n = hc/\\lambda$. Su wàccee ci $n=1$, série Lyman la (UV) ; su wàccee ci $n=2$, série Balmer la (Visible, gisu ko ak sa gët) ; su wàccee ci $n=3$, série Paschen la (Infrarouge) ! »',
    bacTrap:
      'La différence d’énergie $\\Delta E = h\\nu$ d’un photon émis est TOUJOURS POSITIVE : $\\Delta E = E_{\\text{haut}} - E_{\\text{bas}} > 0$. Ne laissez jamais une énergie de photon négative ! De plus, pour trouver $\\lambda$ en mètres, convertissez impérativement $\\Delta E$ en Joules.',
    scoringGuide:
      'Formule des niveaux d’énergie $E_n$ (0,25 pt) • Équation du saut quantique $\\Delta E = hc/\\lambda$ (0,5 pt) • Calcul numérique de $\\lambda$ avec conversion d’unité (0,5 pt) • Identification de la série spectrale (0,25 pt).',
  },
];

export default function P9LumiereReflexesCard() {
  const [activeId, setActiveId] = useState<number>(1);
  const activeReflex = LUMIERE_REFLEXES.find((r) => r.id === activeId) || LUMIERE_REFLEXES[0];

  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm my-8">
      {/* Header */}
      <div className="pb-5 border-b border-slate-100">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-2">
          Physique Terminale S2 • Chapitre P9 : Lumière, Interférences & Quanta
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Fiches Méthodes &amp; Réflexes : Modèle Ondulatoire &amp; Corpusculaire (Bac S2)
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          Les 6 automatismes décisifs de l’Office du Bac : calcul d’interfrange, lame transparente, seuil photoélectrique, potentiel d’arrêt et niveaux de Bohr.
        </p>
      </div>

      {/* Tabs navigation */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 my-5">
        {LUMIERE_REFLEXES.map((item) => {
          const isSelected = item.id === activeId;
          return (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-indigo-600 bg-indigo-50/70 shadow-sm ring-1 ring-indigo-600'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span
                className={`text-[10px] font-bold uppercase tracking-wider mb-1 px-1.5 py-0.5 rounded w-fit ${
                  isSelected ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                Réflexe #{item.id}
              </span>
              <span className="text-xs font-semibold text-slate-800 line-clamp-2">
                {item.title.split(':')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Active Reflex Detail Content */}
      <div className="bg-slate-50/60 rounded-2xl border border-slate-200 p-5 space-y-5">
        {/* Title & Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
          <h4 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold shrink-0">
              {activeReflex.id}
            </span>
            {activeReflex.title}
          </h4>
          <span className="inline-block px-2.5 py-1 text-xs font-semibold rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
            {activeReflex.badge}
          </span>
        </div>

        {/* Summary with MathRenderer */}
        <div className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-2xs">
          <MathRenderer content={activeReflex.summary} />
        </div>

        {/* Fundamental Formula Box */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-inner">
          <div className="text-[11px] font-bold uppercase tracking-wider text-indigo-300 mb-1.5">
            Formule Clé Incontournable pour l&apos;Épreuve du Bac S2
          </div>
          <div className="py-1 overflow-x-auto text-indigo-100 font-medium">
            <MathRenderer formula={activeReflex.formula} />
          </div>
        </div>

        {/* Step by step Demonstration */}
        <div>
          <h5 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Démonstration &amp; Raisonnement Exigé au Bac S2
          </h5>
          <div className="text-xs sm:text-sm text-slate-700 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-2 leading-relaxed">
            <MathRenderer content={activeReflex.demonstration} />
          </div>
        </div>

        {/* Wolof Pedagogical Note */}
        <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-4 text-xs sm:text-sm text-amber-950 leading-relaxed shadow-2xs">
          <div className="font-bold text-amber-800 uppercase tracking-wider text-xs mb-1">
            Xam-Xam ci Wolof : Comprendre le Mécanisme Physique
          </div>
          <MathRenderer content={activeReflex.wolof} />
        </div>

        {/* Bac Trap & Scoring Guide */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <div className="bg-rose-50/70 border border-rose-200 rounded-xl p-3.5 text-xs text-rose-950">
            <div className="font-bold text-rose-700 uppercase tracking-wider mb-1">
              Piège Fréquent au Baccalauréat
            </div>
            <p className="leading-relaxed">{activeReflex.bacTrap}</p>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-3.5 text-xs text-emerald-950">
            <div className="font-bold text-emerald-700 uppercase tracking-wider mb-1">
              Barème Indicatif &amp; Critères de Notation
            </div>
            <p className="leading-relaxed">{activeReflex.scoringGuide}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
