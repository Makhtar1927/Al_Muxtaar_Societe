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

const RLC_FORCEES_REFLEXES: ReflexItem[] = [
  {
    id: 1,
    title: 'Équation Différentielle du Circuit RLC Forcé & Régime Permanent',
    badge: 'Régime établi forcé',
    summary:
      'Un générateur basse fréquence (GBF) impose au circuit une tension sinusoïdale $u(t) = U_m\\cos(\\omega t)$. En régime permanent établi, le courant $i(t)$ oscille obligatoirement à la pulsation imposée $\\omega$ du GBF.',
    formula:
      'L\\,\\frac{\\mathrm{d}i}{\\mathrm{d}t} + R_t\\,i + \\frac{q}{C} = u(t) \\iff \\mathbf{L\\,\\frac{\\mathrm{d}^2q}{\\mathrm{d}t^2} + R_t\\,\\frac{\\mathrm{d}q}{\\mathrm{d}t} + \\frac{1}{C}\\,q = U_m\\cos(\\omega t)}',
    demonstration:
      '1. **Loi des mailles en convention récepteur** :\n   $$u_L(t) + u_R(t) + u_C(t) = u(t)$$\n   avec $u_R(t) = R\\,i(t)$, $u_L(t) = L\\,\\dfrac{di}{dt} + r\\,i(t)$, et $u_C(t) = \\dfrac{q(t)}{C}$.\n2. **Résistance totale du circuit** :\n   $$R_t = R + r$$\n3. **Équation différentielle en charge $q(t)$** :\n   Comme $i(t) = \\dot{q}(t)$ et $\\dfrac{di}{dt} = \\ddot{q}(t)$ :\n   $$\\mathbf{L\\,\\frac{\\mathrm{d}^2q}{\\mathrm{d}t^2} + R_t\\,\\frac{\\mathrm{d}q}{\\mathrm{d}t} + \\frac{1}{C}\\,q = U_m\\cos(\\omega t)}$$\n4. **Équation différentielle en intensité $i(t)$** :\n   En dérivant par rapport au temps $t$ :\n   $$\\mathbf{L\\,\\frac{\\mathrm{d}^2i}{\\mathrm{d}t^2} + R_t\\,\\frac{\\mathrm{d}i}{\\mathrm{d}t} + \\frac{1}{C}\\,i = -\\omega U_m\\sin(\\omega t)}$$\n5. **Régime permanent sinusoïdal** :\n   Après extinction du régime transitoire (amorti par $R_t$), la solution forcée permanente s\'écrit :\n   $$i(t) = I_m\\cos(\\omega t - \\varphi) \\quad \\text{avec } \\omega = 2\\pi N \\text{ (imposée par le GBF)}$$',
    wolof:
      '« Ci oscillations forcées, GBF bi mooy commandant bi (l\'excitateur) : mooy joxe cadence bi ak pulsation $\\omega = 2\\pi N$. Circuit RLC bi (le résonateur) amul choix, dafay topp rythme bobu ba faww ! Résistance totale bi $R_t = R + r$ dafay feye régime transitoire bi ci ndoorte gi, ba pare régime permanent sinusoïdal bi rekk des. Bul fatte mukk résistance interne $r$ bu bobine bi ! »',
    bacTrap:
      'Ne confondez jamais la pulsation imposée ω = 2πN (réglable sur le bouton du GBF) et la pulsation propre ω₀ = 1/√(LC) caractéristique du dipôle passif sans générateur.',
    scoringGuide:
      'Schéma et loi de maille avec dipôles en convention récepteur (0,25 pt) • Somme Rt = R + r explicite (0,25 pt) • Équation différentielle canonique complète (0,5 pt) • Forme sinusoïdale de i(t) en régime permanent (0,25 pt).',
  },
  {
    id: 2,
    title: 'Construction Vectorielle de Fresnel & Impédance Z du Dipôle RLC',
    badge: 'Méthode de Fresnel',
    summary:
      'La méthode de Fresnel associe à chaque tension sinusoïdale un vecteur de longueur égale à son amplitude. L\'addition vectorielle permet de déterminer géométriquement l\'impédance totale $Z$ et la loi d\'Ohm en alternatif.',
    formula:
      '\\mathbf{Z = \\sqrt{R_t^2 + \\left(L\\omega - \\frac{1}{C\\omega}\\right)^2}} \\quad ; \\quad U_m = Z\\,I_m \\iff \\mathbf{U = Z\\,I}',
    demonstration:
      '1. **Choix de l\'origine des phases** :\n   On choisit l\'intensité du courant comme référence : $i(t) = I_m\\cos(\\omega t)$ (axe horizontal des abscisses).\n2. **Association des vecteurs de Fresnel** :\n   - Conducteur ohmique : $\\vec{V}_R$ colinéaire à l\'axe, de norme $U_{Rm} = R_t I_m$ (phase nulle).\n   - Bobine idéale : $\\vec{V}_L$ orthogonal dirigé vers le haut, de norme $U_{Lm} = L\\omega I_m$ (phase $+\\pi/2$).\n   - Condensateur : $\\vec{V}_C$ orthogonal dirigé vers le bas, de norme $U_{Cm} = \\dfrac{I_m}{C\\omega}$ (phase $-\\pi/2$).\n3. **Vecteur résultant de la tension du GBF** :\n   $$\\vec{V} = \\vec{V}_R + \\vec{V}_L + \\vec{V}_C$$\n4. **Théorème de Pythagore dans le triangle rectangle de Fresnel** :\n   $$U_m^2 = (R_t I_m)^2 + \\left(L\\omega I_m - \\frac{I_m}{C\\omega}\\right)^2 = I_m^2\\left[R_t^2 + \\left(L\\omega - \\frac{1}{C\\omega}\\right)^2\\right]$$\n5. **Impédance $Z$ et Loi d\'Ohm** :\n   $$U_m = Z\\,I_m \\implies \\mathbf{Z = \\sqrt{R_t^2 + \\left(L\\omega - \\frac{1}{C\\omega}\\right)^2}} \\quad (\\text{en Ohms } \\Omega)$$\n   En divisant par $\\sqrt{2}$, la relation reste valable pour les grandeurs efficaces : $\\mathbf{U = Z\\,I}$.',
    wolof:
      '« Construction de Fresnel dafay wone li xew ci circuit bi ci ñaari axes : axe horizontal bi dafa nuy wan résistance bi ($R_t I_m$), axe vertical bi di natt xeex bi diggante bobine bi buy yéeg ($+L\\omega$) ak condensateur bi buy wàcc ($-1/C\\omega$). Pythagore rekk ngay def : $Z = \\sqrt{R_t^2 + (L\\omega - 1/C\\omega)^2}$. Impédance $Z$ ci Ohms lañ koy natte, dafay teye courant bi ni résistance ! »',
    bacTrap:
      'Attention à l\'unité et aux parenthèses : Z s\'exprime en Ohms (Ω). N\'oubliez jamais d\'élever la différence (Lω - 1/(Cω)) au carré. Pour la bobine réelle seule, l\'impédance est Z_b = √(r² + (Lω)²) et non simplement Lω !',
    scoringGuide:
      'Schéma vectoriel de Fresnel avec échelle et annotations (0,5 pt) • Application du théorème de Pythagore (0,25 pt) • Expression littérale de l\'impédance totale Z (0,5 pt) • Loi d\'Ohm en alternatif U = Z·I (0,25 pt).',
  },
  {
    id: 3,
    title: 'Déphasage φ = φ_u - φ_i & Comportement Inductif / Capacitif / Résistif',
    badge: 'Déphasage & Nature',
    summary:
      'Le signe et la valeur du déphasage $\\varphi = \\varphi_u - \\varphi_i$ déterminent sans ambiguïté si le dipôle présente une prédominance inductive, capacitive, ou s\'il se trouve à la résonance.',
    formula:
      '\\tan\\varphi = \\frac{L\\omega - \\frac{1}{C\\omega}}{R_t} \\quad ; \\quad \\cos\\varphi = \\frac{R_t}{Z} > 0 \\quad \\left(-\\frac{\\pi}{2} < \\varphi < +\\frac{\\pi}{2}\\right)',
    demonstration:
      '1. **Calcul trigonométrique à partir de Fresnel** :\n   $$\\tan\\varphi = \\frac{\\text{côté opposé}}{\\text{côté adjacent}} = \\mathbf{\\frac{L\\omega - \\frac{1}{C\\omega}}{R_t}}$$\n   $$\\cos\\varphi = \\frac{\\text{côté adjacent}}{\\text{hypoténuse}} = \\mathbf{\\frac{R_t}{Z}}$$\n2. **Étude des trois comportements physiques** :\n   - **Circuit à prédominance inductive ($L\\omega > \\dfrac{1}{C\\omega} \\iff N > N_0$)** :\n     $$\\tan\\varphi > 0 \\implies \\mathbf{\\varphi > 0}$$\n     La tension $u(t)$ est en **avance de phase** sur l\'intensité $i(t)$ (sur l\'oscilloscope, $u(t)$ atteint son maximum avant $u_R(t)$).\n   - **Circuit à prédominance capacitive ($L\\omega < \\dfrac{1}{C\\omega} \\iff N < N_0$)** :\n     $$\\tan\\varphi < 0 \\implies \\mathbf{\\varphi < 0}$$\n     La tension $u(t)$ est en **retard de phase** sur l\'intensité $i(t)$ (sur l\'oscilloscope, $u(t)$ atteint son maximum après $u_R(t)$).\n   - **Circuit résistif pur (Résonance $L\\omega = \\dfrac{1}{C\\omega} \\iff N = N_0$)** :\n     $$\\tan\\varphi = 0 \\implies \\mathbf{\\varphi = 0}$$\n     La tension $u(t)$ et le courant $i(t)$ sont en **phase**.\n3. **Mesure expérimentale du déphasage à l\'oscilloscope** :\n   $$|\\varphi| = 2\\pi\\,\\frac{\\Delta t}{T} = 2\\pi\\,\\frac{d}{D} \\quad (\\text{en radians})$$\n   où $d$ est le décalage horizontal entre les deux courbes et $D$ est la longueur d\'une période complète.',
    wolof:
      '« Déphasage $\\varphi$ dafay wax kan mooy jëkka agsi ci sommet bi : su fekkee bobine bi moo gën a bare doole ($L\\omega > 1/C\\omega$), tension bi dafay jëkka agsi ($\\\\varphi > 0$, inductif). Su condensateur bi gënee am doole ($N < N_0$), tension bi dafay des ci ginaaw ($\\\\varphi < 0$, capacitif). Su ñu tolloo ni résonance ($N = N_0$), ñoom ñaar dañuy ànd ci sassa ($\\\\varphi = 0$, en phase) ! »',
    bacTrap:
      'L\'oscilloscope fournit uniquement la valeur absolue |φ| = 2π(d/D). Le signe de φ DOIT être rigoureusement justifié à partir de l\'ordre temporel des crêtes (« u avant i » ⟹ φ > 0 ; « u après i » ⟹ φ < 0).',
    scoringGuide:
      'Formule littérale de tan φ et cos φ (0,5 pt) • Calcul de |φ| depuis l\'oscillogramme (0,5 pt) • Justification rigoureuse du signe de φ (0,25 pt) • Conclusion sur la nature inductive/capacitive (0,25 pt).',
  },
  {
    id: 4,
    title: 'Résonance d\'Intensité : Fréquence N₀, Impédance Minimale & Courant Max',
    badge: 'Résonance d\'intensité',
    summary:
      'À tension efficace $U$ constante, lorsque la fréquence excitatrice $N$ atteint la fréquence propre $N_0$, l\'impédance devient minimale ($Z_{\\min} = R_t$) et l\'intensité atteint son pic maximal $I_0 = U/R_t$.',
    formula:
      '\\mathbf{N_0 = \\frac{1}{2\\pi\\sqrt{LC}}} \\iff L\\omega_0 = \\frac{1}{C\\omega_0} \\quad ; \\quad \\mathbf{Z_{\\min} = R_t} \\implies \\mathbf{I_0 = \\frac{U}{R_t}}',
    demonstration:
      '1. **Condition d\'annulation de la réactance** :\n   L\'intensité efficace s\'écrit :\n   $$I(\\omega) = \\frac{U}{Z(\\omega)} = \\frac{U}{\\sqrt{R_t^2 + \\left(L\\omega - \\frac{1}{C\\omega}\\right)^2}}$$\n2. **Minimisation du dénominateur** :\n   Comme $U$ et $R_t$ sont constants, $I(\\omega)$ est maximale si et seulement si le terme quadratique s\'annule :\n   $$L\\omega - \\frac{1}{C\\omega} = 0 \\iff L C\\,\\omega^2 = 1 \\iff \\mathbf{\\omega_0 = \\frac{1}{\\sqrt{LC}}}$$\n3. **Fréquence de résonance d\'intensité** :\n   $$\\mathbf{N_0 = \\frac{\\omega_0}{2\\pi} = \\frac{1}{2\\pi\\sqrt{LC}}}$$\n   Elle est rigoureusement identique à la fréquence propre du circuit LC non amorti.\n4. **Grandeurs à la résonance** :\n   - Impédance minimale : $\\mathbf{Z_{\\min} = R_t = R + r}$\n   - Intensité efficace maximale : $\\mathbf{I_0 = \\frac{U}{R_t}}$\n   - Déphasage nul : $\\varphi = 0 \\implies \\cos\\varphi = 1$\n   - Comportement purement résistant : le dipôle se comporte comme un simple conducteur ohmique de résistance $R_t$.',
    wolof:
      '« À la résonance d\'intensité, bobine bi ak condensateur bi dañuy feye sen doole ci biir circuit bi ($L\\omega_0 = 1/C\\omega_0$) ! Dafa melni ñoom ñaar dañuy xuloo ci 0. Ci kanam GBF bi, résistance bi ($R_t$) rekk moo des. Motax impédance bi di wàcc ba ci suuf ($Z = R_t$) te courant bi di yéeg ba ci kaww lool : $I_0 = U/R_t$. Boo yokkee $R_t$, sommet bi dafay wàcc ! »',
    bacTrap:
      'À la résonance, l\'impédance Z n\'est JAMAIS nulle ! Elle vaut Z_min = R_t. De plus, modifier L ou C déplace la fréquence N₀, mais ne change PAS la valeur du courant de crête I₀ (qui dépend uniquement de U et R_t).',
    scoringGuide:
      'Condition d\'annulation de la réactance X = 0 (0,25 pt) • Expression et calcul de N₀ (0,5 pt) • Détermination de Z_min = Rt (0,25 pt) • Calcul littéral et numérique de I₀ = U/Rt (0,5 pt).',
  },
  {
    id: 5,
    title: 'Bande Passante à -3 dB, Facteur de Qualité Q & Phénomène de Surtension',
    badge: 'Facteur de qualité & Sélectivité',
    summary:
      'La bande passante $\\Delta N$ mesure la sélectivité du résonateur à $I \\ge I_0/\\sqrt{2}$. Le facteur de qualité $Q = N_0/\\Delta N$ quantifie l\'acuité et engendre une surtension aux bornes du condensateur si $Q > 1$.',
    formula:
      '\\mathbf{\\Delta N = \\frac{R_t}{2\\pi L} = \\frac{N_0}{Q}} \\quad ; \\quad \\mathbf{Q = \\frac{L\\omega_0}{R_t} = \\frac{1}{R_t C \\omega_0}} \\quad ; \\quad \\mathbf{U_{C0} = Q\\cdot U}',
    demonstration:
      '1. **Définition de la bande passante à $-3\\text{ dB}$** :\n   Intervalle de fréquences $[N_1, N_2]$ pour lequel la puissance moyenne est au moins la moitié de la puissance maximale :\n   $$\\mathcal{P} \\ge \\frac{\\mathcal{P}_{\\max}}{2} \\iff I \\ge \\frac{I_0}{\\sqrt{2}}$$\n2. **Condition sur l\'impédance aux fréquences de coupure** :\n   $$\\frac{U}{Z} = \\frac{U}{R_t\\sqrt{2}} \\implies Z^2 = 2\\,R_t^2 \\implies \\left|L\\omega - \\frac{1}{C\\omega}\\right| = R_t$$\n3. **Largeur de la bande passante** :\n   $$\\Delta\\omega = \\omega_2 - \\omega_1 = \\frac{R_t}{L} \\implies \\mathbf{\\Delta N = N_2 - N_1 = \\frac{R_t}{2\\pi L}}$$\n4. **Facteur de qualité $Q$ et Acuité de la résonance** :\n   $$\\mathbf{Q = \\frac{\\omega_0}{\\Delta\\omega} = \\frac{N_0}{\\Delta N} = \\frac{L\\omega_0}{R_t} = \\frac{1}{R_t C \\omega_0} = \\frac{1}{R_t}\\sqrt{\\frac{L}{C}}}$$\n   - Si $R_t$ est faible : $Q$ est grand, $\\Delta N$ est étroite $\\implies$ **résonance aiguë (haute sélectivité)**.\n   - Si $R_t$ est élevée : $Q$ est petit, $\\Delta N$ est large $\\implies$ **résonance floue (faible sélectivité)**.\n5. **Phénomène de surtension à la résonance** :\n   Tension efficace aux bornes du condensateur à $N = N_0$ :\n   $$U_{C0} = \\frac{I_0}{C\\omega_0} = \\frac{U}{R_t}\\frac{1}{C\\omega_0} = \\mathbf{Q\\cdot U}$$\n   Si $Q > 1$, la tension $U_{C0}$ dépasse largement la tension délivrée par le GBF (danger de claquage du diélectrique).',
    wolof:
      '« Facteur de qualité $Q$ mooy natt acuité u résonance bi : su résistance bi tuutee ($R_t \\to 0$), pic bi dafay dëgër te rafet lool ni ñàkk (résonance très aiguë), radio bi di sélectionner station yi bu baax. Wante dafa am danger bu rëy ci condensateur bi : tension bi ci boppam dafay yokk ba ëpp tension u générateur bi ($U_{C0} = Q \\cdot U$) ! Su $Q = 15$ te $U = 6\\text{ V}$, condensateur bi day am $90\\text{ V}$, mën na xàcc ! »',
    bacTrap:
      'Retenez la formule directe de la bande passante ΔN = R_t / (2πL). Dans les exercices de Bac, vérifiez toujours si la tension aux bornes du condensateur U_C0 dépasse la tension nominale de service pour alerter sur le risque de destruction !',
    scoringGuide:
      'Définition de la condition I₀/√2 (0,25 pt) • Expression littérale de ΔN = Rt/(2πL) (0,5 pt) • Formules et calcul de Q (0,5 pt) • Démonstration de UC0 = Q·U et mention de la surtension (0,5 pt).',
  },
  {
    id: 6,
    title: 'Puissance Active Moyenne, Facteur de Puissance & Bilan Énergétique',
    badge: 'Énergie & Puissance',
    summary:
      'En courant alternatif sinusoïdal, seule la résistance dissipe de la puissance active moyenne par effet Joule. La bobine et le condensateur échangent de la puissance réactive sans aucune consommation nette sur une période.',
    formula:
      '\\mathbf{\\mathcal{P} = U\\,I\\cos\\varphi = R_t\\,I^2} \\quad ; \\quad \\mathbf{\\cos\\varphi = \\frac{R_t}{Z}} \\quad ; \\quad \\mathcal{P}_{\\max} = \\frac{U^2}{R_t}',
    demonstration:
      '1. **Puissance instantanée fournie par le générateur** :\n   $$p(t) = u(t)\\cdot i(t) = U_m\\cos(\\omega t) \\times I_m\\cos(\\omega t - \\varphi)$$\n2. **Développement trigonométrique** :\n   En utilisant $\\cos a\\cos b = \\dfrac{1}{2}[\\cos(a - b) + \\cos(a + b)]$ :\n   $$p(t) = \\frac{1}{2}U_m I_m\\cos\\varphi + \\frac{1}{2}U_m I_m\\cos(2\\omega t - \\varphi)$$\n3. **Puissance active moyenne sur une période $T$** :\n   Le terme oscillant à la pulsation double $2\\omega$ a une moyenne temporelle strictement nulle :\n   $$\\langle\\cos(2\\omega t - \\varphi)\\rangle = 0$$\n   Comme $U = \\dfrac{U_m}{\\sqrt{2}}$ et $I = \\dfrac{I_m}{\\sqrt{2}}$ :\n   $$\\mathbf{\\mathcal{P} = \\langle p(t)\\rangle = U\\,I\\cos\\varphi} \\quad (\\text{en Watts W})$$\n4. **Identification à l\'effet Joule** :\n   Comme $\\cos\\varphi = \\dfrac{R_t}{Z}$ et $U = Z\\,I$ :\n   $$\\mathcal{P} = (Z\\,I)\\,I\\left(\\frac{R_t}{Z}\\right) = \\mathbf{R_t\\,I^2}$$\n5. **Puissance à la résonance** :\n   À $N = N_0$, $\\cos\\varphi = 1$ et $I_0 = \\dfrac{U}{R_t}$ :\n   $$\\mathbf{\\mathcal{P}_{\\max} = U\\,I_0 = R_t\\,I_0^2 = \\frac{U^2}{R_t}}$$',
    wolof:
      '« Ci courant alternatif, bobine idéale ak condensateur duñu lekke benn puissance active ! Dañuy jël énergie bi di ko delloo ci chaque alternance. Résistance bi ($R_t$) rekk mooy lekke énergie di ko génne ci forme u chaleur par effet Joule : $\\mathcal{P} = R_t I^2 = U I \\cos\\varphi$. À la résonance, facteur de puissance bi dafay tollook 1 ($\\\\cos\\varphi = 1$), puissance bi génne dafay am maximum absolu ! »',
    bacTrap:
      'Dans la formule P = U·I·cos φ, U et I sont TOUJOURS les grandeurs EFFICACES mesurées aux multimètres ou voltmètres, jamais les valeurs de crête Um et Im ! Si vous utilisez Um et Im, n\'oubliez pas de diviser par 2 : P = (1/2) Um Im cos φ.',
    scoringGuide:
      'Établissement de la puissance moyenne par intégration ou valeur moyenne de cos(2ωt) (0,5 pt) • Expression P = U·I·cos φ (0,25 pt) • Égalité P = Rt·I² démontrée (0,25 pt) • Puissance maximale à la résonance cos φ = 1 (0,25 pt).',
  },
];

export default function P8RlcForceesReflexesCard() {
  const [activeId, setActiveId] = useState<number>(1);
  const activeReflex =
    RLC_FORCEES_REFLEXES.find((r) => r.id === activeId) || RLC_FORCEES_REFLEXES[0];

  return (
    <section className="bg-white rounded-3xl border border-navy/10 p-5 sm:p-7 shadow-sm my-8">
      {/* En-tête sobre sans icônes superflues */}
      <div className="pb-5 border-b border-navy/10">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-navy/5 text-navy border border-navy/10">
            Chapitre P8 - Fiches Méthodes &amp; Réflexes
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200">
            Physique - Terminale S2
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-navy tracking-tight">
          Oscillations Électriques Forcées en Régime Sinusoïdal (Bac S2)
        </h3>
        <p className="text-xs sm:text-sm text-navy/70 mt-1.5 leading-relaxed">
          Les 6 méthodes capitales pour maîtriser la construction de Fresnel, l&apos;impédance $Z$, la résonance d&apos;intensité, la bande passante et la surtension selon les exigences du jury du Baccalauréat sénégalais.
        </p>
      </div>

      {/* Sélecteur de Réflexes (Boutons sobres) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 my-6">
        {RLC_FORCEES_REFLEXES.map((item) => {
          const isSelected = item.id === activeId;
          return (
            <button
              key={item.id}
              onClick={() => setActiveId(item.id)}
              className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-navy bg-navy text-white shadow-md'
                  : 'border-navy/10 bg-surface/40 hover:bg-surface hover:border-navy/30 text-navy'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span
                  className={`text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-navy/5 text-navy/70'
                  }`}
                >
                  RÉFLEXE {item.id}
                </span>
              </div>
              <span
                className={`text-xs font-bold line-clamp-2 ${
                  isSelected ? 'text-white' : 'text-navy'
                }`}
              >
                {item.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Contenu détaillé du réflexe sélectionné */}
      <div className="bg-surface/50 rounded-2xl border border-navy/10 p-5 sm:p-6 space-y-6">
        {/* Titre et badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-navy/10 pb-4">
          <div className="space-y-1">
            <div className="text-[11px] font-black uppercase tracking-wider text-blue-700">
              Réflexe #{activeReflex.id} • {activeReflex.badge}
            </div>
            <h4 className="text-base sm:text-lg font-bold text-navy">
              {activeReflex.title}
            </h4>
          </div>
        </div>

        {/* Formule Fondamentale Mise en Avant avec MathRenderer */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-navy/15 shadow-sm text-center">
          <div className="text-[11px] font-bold text-navy/60 uppercase tracking-wider mb-2">
            Formule Clé &amp; Relations au Baccalauréat
          </div>
          <div className="text-sm sm:text-base text-navy font-semibold overflow-x-auto py-1">
            <MathRenderer formula={activeReflex.formula} />
          </div>
        </div>

        {/* Résumé synthétique */}
        <div className="space-y-1.5">
          <div className="text-navy font-bold text-xs sm:text-sm uppercase tracking-wide">
            Principe Physique Fondamental
          </div>
          <div className="text-xs sm:text-sm text-navy/80 leading-relaxed">
            <MathRenderer content={activeReflex.summary} />
          </div>
        </div>

        {/* Démonstration pas à pas */}
        <div className="space-y-2">
          <div className="text-navy font-bold text-xs sm:text-sm uppercase tracking-wide">
            Protocole de Rédaction Officiel (Critères de notation Bac S2)
          </div>
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-navy/10 text-xs sm:text-sm text-navy/90 leading-relaxed overflow-x-auto shadow-sm">
            <MathRenderer content={activeReflex.demonstration} />
          </div>
        </div>

        {/* Décryptage en Wolof & Piège à éviter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Note en Wolof */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/70 text-xs sm:text-sm space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-amber-600/15 text-amber-900 border border-amber-600/20">
                Xam-Xam ci Wolof
              </span>
              <span>Décodage conceptuel</span>
            </div>
            <div className="text-amber-950/90 leading-relaxed font-medium">
              <MathRenderer content={activeReflex.wolof} />
            </div>
          </div>

          {/* Piège classique du Bac */}
          <div className="p-4 rounded-2xl bg-rose-50/70 border border-rose-200/70 text-xs sm:text-sm space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-rose-900">
              <span className="px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider bg-rose-600/15 text-rose-900 border border-rose-600/20">
                Alerte Bac S2
              </span>
              <span>Erreur fréquente à éliminer</span>
            </div>
            <div className="text-rose-950/90 leading-relaxed font-medium">
              <MathRenderer content={activeReflex.bacTrap} />
            </div>
          </div>
        </div>

        {/* Guide d'évaluation du correcteur */}
        <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/60 text-xs text-emerald-950/90">
          <div className="font-bold text-emerald-900 mb-1 uppercase tracking-wider text-[10px]">
            Critères &amp; Barème Officiel de l&apos;Office du Baccalauréat
          </div>
          <div>
            <MathRenderer content={activeReflex.scoringGuide} />
          </div>
        </div>
      </div>
    </section>
  );
}
