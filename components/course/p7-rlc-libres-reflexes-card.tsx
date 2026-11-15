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

const RLC_LIBRES_REFLEXES: ReflexItem[] = [
  {
    id: 1,
    title: 'Circuit LC Idéal : Équation Différentielle & Période Propre T₀',
    badge: 'Oscillateur harmonique',
    summary:
      'Dans un circuit LC idéal sans résistance ($R_t = 0$), la loi d\'additivité des tensions mène à une équation différentielle linéaire du second ordre sans dérivée première.',
    formula:
      '\\frac{\\mathrm{d}^2q}{\\mathrm{d}t^2} + \\frac{1}{LC}\\,q = 0 \\iff \\mathbf{\\ddot{q} + \\omega_0^2\\,q = 0} \\quad \\text{avec} \\quad \\omega_0 = \\frac{1}{\\sqrt{LC}} \\quad ; \\quad T_0 = 2\\pi\\sqrt{LC}',
    demonstration:
      '1. **Conventions des tensions** :\n   - Condensateur : $u_C(t) = \\dfrac{q(t)}{C}$\n   - Bobine purement inductive : $u_L(t) = L\\,\\dfrac{di}{dt}$\n2. **Relation fondamentale courant-charge** :\n   $$i(t) = \\frac{dq}{dt} \\implies \\frac{di}{dt} = \\frac{d^2q}{dt^2}$$\n3. **Loi des mailles (additivité des tensions)** :\n   $$u_L(t) + u_C(t) = 0 \\iff L\\,\\frac{d^2q}{dt^2} + \\frac{1}{C}\\,q = 0$$\n4. **Forme canonique de l\'oscillateur harmonique** :\n   En divisant par $L$ :\n   $$\\mathbf{\\frac{\\mathrm{d}^2q}{\\mathrm{d}t^2} + \\frac{1}{LC}\\,q = 0 \\iff \\ddot{q} + \\omega_0^2\\,q = 0} \\quad \\text{avec} \\quad \\omega_0 = \\frac{1}{\\sqrt{LC}}$$\n5. **Période propre et Fréquence propre** :\n   $$T_0 = \\frac{2\\pi}{\\omega_0} = 2\\pi\\sqrt{LC} \\quad (\\text{en secondes s}) \\qquad ; \\qquad N_0 = \\frac{1}{T_0} = \\frac{1}{2\\pi\\sqrt{LC}} \\quad (\\text{en Hertz Hz})$$',
    wolof:
      '« Circuit LC idéal mooy équivalent u pendule élastique horizontal sans frottement ! Amul benn résistance bu koy téye. Énergie bi dafay jéggi diggante condensateur bi ($E_e$) ak bobine bi ($E_m$) ba fàww. Période propre bi $T_0 = 2\\pi\\sqrt{LC}$ ci bobine bi ($L$) ak condensateur bi ($C$) rekk la dépendre, du soppiku ndax tension initiale bi ! »',
    bacTrap:
      'Piège fréquent au Bac : oublier la racine carrée ou inverser L et C. Vérifiez toujours par analyse dimensionnelle : [LC] = s², donc [√(LC)] = s. Ne confondez pas pulsation ω₀ = 1/√(LC) et période T₀ = 2π√(LC).',
    scoringGuide:
      'Loi de maille et conventions des dipôles (0,25 pt) • Relation i = dq/dt et dérivation seconde (0,25 pt) • Équation différentielle canonique en q(t) (0,5 pt) • Expression littérale de T₀ et unité SI (0,25 pt).',
  },
  {
    id: 2,
    title: 'Loi Horaire & Détermination Rigoureuse de Q_m et φ par les CI',
    badge: 'Conditions initiales',
    summary:
      'La solution générale s\'écrit $q(t) = Q_m\\cos(\\omega_0 t + \\varphi)$. L\'amplitude $Q_m$ et la phase à l\'origine $\\varphi$ sont rigoureusement fixées par les conditions initiales à $t = 0$.',
    formula:
      'q(t) = Q_m\\cos(\\omega_0 t + \\varphi) \\quad ; \\quad i(t) = \\frac{\\mathrm{d}q}{\\mathrm{d}t} = -I_m\\sin(\\omega_0 t + \\varphi) = I_m\\cos\\left(\\omega_0 t + \\varphi + \\frac{\\pi}{2}\\right)',
    demonstration:
      '1. **Dérivation temporelle de la charge** :\n   $$i(t) = \\dot{q}(t) = -\\omega_0 Q_m\\sin(\\omega_0 t + \\varphi) = I_m\\cos\\left(\\omega_0 t + \\varphi + \\frac{\\pi}{2}\\right)$$\n   avec $I_m = \\omega_0 Q_m = \\dfrac{Q_m}{\\sqrt{LC}}$.\n2. **Quadrature de phase** :\n   L\'intensité $i(t)$ est en **quadrature avance de phase** de $+\\pi/2$ radians (un quart de période) par rapport à la charge $q(t)$.\n3. **Cas classique du condensateur préchargé sous tension $E$ (ou $U_0$)** :\n   À $t = 0$ :\n   - Charge initiale : $q(0) = C\\,E = Q_m\\cos\\varphi > 0 \\implies \\cos\\varphi > 0$\n   - Courant initial : $i(0) = 0$ (par continuité dans la bobine $i(0^+) = i(0^-) = 0$)\n     $$i(0) = -\\omega_0 Q_m\\sin\\varphi = 0 \\implies \\sin\\varphi = 0$$\n4. **Déduction du quadrant** :\n   $$\\begin{cases} \\cos\\varphi = 1 \\\\ \\sin\\varphi = 0 \\end{cases} \\implies \\mathbf{\\varphi = 0\\text{ rad}} \\quad \\text{et} \\quad \\mathbf{Q_m = C\\,E}$$\n5. **Lois horaires complètes** :\n   $$q(t) = C\\,E\\cos(\\omega_0 t) \\qquad ; \\qquad u_C(t) = E\\cos(\\omega_0 t) \\qquad ; \\qquad i(t) = -C\\,E\\,\\omega_0\\sin(\\omega_0 t)$$',
    wolof:
      '« Bii mooy piège bi gën a ràññéeku ci Bac ! Boo bëggee wone $\\varphi$, bul jël tangente rekk ndax dafay réer ci quadrant bi. Dajalal ñaari équations yi : $\\cos\\varphi$ ak $\\sin\\varphi$. Su fekkee condensateur bi dafa chargé ba noppi ñu tëj circuit bi à $t = 0$, courant bi meenul dem ci sassa ($i(0) = 0$), kon $\\varphi = 0$ rad te $Q_m = C U_0$. »',
    bacTrap:
      'Ne déterminez JAMAIS la phase uniquement via tan(φ) ! tan(φ) = 0 admet deux solutions : 0 et π. Vous devez impérativement vérifier le signe de cos(φ) pour éliminer l\'ambiguïté.',
    scoringGuide:
      'Expression littérale de q(t) et i(t) (0,5 pt) • Relation Im = ω₀ Qm (0,25 pt) • Système des deux conditions initiales q(0) et i(0) (0,5 pt) • Déduction rigoureuse de Qm et φ (0,25 pt).',
  },
  {
    id: 3,
    title: 'Conservation de l\'Énergie Électromagnétique & Période T_E = T₀/2',
    badge: 'Bilan énergétique',
    summary:
      'En l\'absence de résistance, l\'énergie totale $E_t$ se conserve parfaitement par transfert perpétuel entre le champ électrique du condensateur et le champ magnétique de la bobine.',
    formula:
      'E_t = \\frac{1}{2}\\frac{q^2}{C} + \\frac{1}{2}L\\,i^2 = \\frac{1}{2}\\frac{Q_m^2}{C} = \\frac{1}{2}L\\,I_m^2 = \\text{Cste} \\quad ; \\quad \\mathbf{T_E = \\frac{T_0}{2}}',
    demonstration:
      '1. **Énergie électrostatique emmagasinée dans le condensateur** :\n   $$E_e(t) = \\frac{1}{2}\\frac{q^2(t)}{C} = \\frac{Q_m^2}{2C}\\cos^2(\\omega_0 t + \\varphi)$$\n2. **Énergie magnétique emmagasinée dans la bobine** :\n   $$E_m(t) = \\frac{1}{2}L\\,i^2(t) = \\frac{1}{2}L(\\omega_0 Q_m)^2\\sin^2(\\omega_0 t + \\varphi)$$\n3. **Somme et conservation totale** :\n   Comme $\\omega_0^2 = \\dfrac{1}{LC}$, le terme préfactoriel magnétique vaut :\n   $$\\frac{1}{2}L\\,\\omega_0^2 Q_m^2 = \\frac{1}{2}L\\left(\\frac{1}{LC}\\right)Q_m^2 = \\frac{Q_m^2}{2C}$$\n   D\'où :\n   $$E_t(t) = \\frac{Q_m^2}{2C}\\left[\\cos^2(\\omega_0 t + \\varphi) + \\sin^2(\\omega_0 t + \\varphi)\\right] = \\mathbf{\\frac{Q_m^2}{2C} = \\frac{1}{2}C\\,U_m^2 = \\frac{1}{2}L\\,I_m^2 = \\text{constante}}$$\n4. **Retrouver l\'équation différentielle par dérivation de $E_t$** :\n   $$\\frac{dE_t}{dt} = \\frac{q}{C}\\frac{dq}{dt} + L\\,i\\,\\frac{di}{dt} = i\\left(\\frac{q}{C} + L\\frac{di}{dt}\\right) = 0 \\implies L\\frac{d^2q}{dt^2} + \\frac{q}{C} = 0$$\n5. **Période énergétique $T_E$** :\n   Par la formule $\\cos^2\\theta = \\dfrac{1 + \\cos 2\\theta}{2}$, la pulsation énergétique est $2\\omega_0$. La période énergétique est donc la moitié de la période des grandeurs électriques : $$\\mathbf{T_E = \\frac{T_0}{2}}$$',
    wolof:
      '« Bilan énergétique ci circuit LC dafa am benn règle d\'or : période bi énergie bi di oscillé dafay tollook xàjji période mécanique bi ($T_E = T_0 / 2$) ! Ndax ci benn cycle complet u charge bi ($+Q_m \\to 0 \\to -Q_m \\to 0 \\to +Q_m$), énergie bi day agsi ci maximum ñaari yoon. Su fekkee $T_0 = 4\\text{ ms}$, période énergétique bi $2\\text{ ms}$ la ! »',
    bacTrap:
      'Piège classique : confondre la période des oscillations de q(t) ou u(t) avec celle de l\'énergie. Si l\'énoncé donne un graphe d\'énergie et demande la période propre T₀, n\'oubliez pas de multiplier la période du graphe par 2 ! T₀ = 2 * T_E.',
    scoringGuide:
      'Expressions de Ee et Em (0,5 pt) • Somme constante indépendante du temps (0,5 pt) • Équivalence dE/dt = 0 redonnant l\'équadiff (0,25 pt) • Relation T_E = T₀ / 2 démontrée (0,25 pt).',
  },
  {
    id: 4,
    title: 'Circuit RLC Série Amorti : Équation Différentielle & Perte Joule',
    badge: 'Amortissement & Joule',
    summary:
      'La présence d\'une résistance totale $R_t = R + r$ dissipe irréversiblement l\'énergie électromagnétique sous forme thermique par effet Joule.',
    formula:
      'L\\,\\frac{\\mathrm{d}^2q}{\\mathrm{d}t^2} + R_t\\,\\frac{\\mathrm{d}q}{\\mathrm{d}t} + \\frac{1}{C}\\,q = 0 \\iff \\mathbf{\\frac{\\mathrm{d}E_t}{\\mathrm{d}t} = -R_t\\,i^2(t) \\le 0}',
    demonstration:
      '1. **Loi des mailles avec résistance** :\n   $$u_L(t) + u_R(t) + u_C(t) = 0$$\n   avec $u_L = L\\dfrac{di}{dt} + r\\,i$, $u_R = R\\,i$, et $u_C = \\dfrac{q}{C}$.\n2. **Résistance totale du circuit** :\n   $$R_t = R + r$$\n3. **Équation différentielle canonique en $q(t)$** :\n   $$L\\,\\frac{di}{dt} + R_t\\,i + \\frac{q}{C} = 0 \\iff \\mathbf{L\\,\\frac{\\mathrm{d}^2q}{\\mathrm{d}t^2} + R_t\\,\\frac{\\mathrm{d}q}{\\mathrm{d}t} + \\frac{1}{C}\\,q = 0}$$\n4. **Équation différentielle en tension $u_C(t)$ (divisant par $C$)** :\n   $$L C\\,\\frac{d^2u_C}{dt^2} + R_t C\\,\\frac{du_C}{dt} + u_C = 0 \\iff \\mathbf{\\frac{\\mathrm{d}^2u_C}{\\mathrm{d}t^2} + \\frac{R_t}{L}\\frac{\\mathrm{d}u_C}{\\mathrm{d}t} + \\frac{1}{LC}u_C = 0}$$\n5. **Bilan énergétique & puissance Joule dissipée** :\n   $$\\frac{dE_t}{dt} = \\frac{d}{dt}\\left(\\frac{1}{2}\\frac{q^2}{C} + \\frac{1}{2}L\\,i^2\\right) = \\frac{q}{C}\\dot{q} + L\\,i\\,\\dot{i} = i\\left(\\frac{q}{C} + L\\frac{di}{dt}\\right)$$\n   Or, d\'après la loi des mailles, $\\dfrac{q}{C} + L\\dfrac{di}{dt} = -R_t\\,i$.\n   D\'où la relation fondamentale :\n   $$\\mathbf{\\frac{\\mathrm{d}E_t}{\\mathrm{d}t} = -R_t\\,i^2(t) \\le 0}$$\n   L\'énergie mécanique/électrique décroît strictement au cours du temps, dissipée sous forme de chaleur.',
    wolof:
      '« Ci circuit RLC réel, résistance bi ($R_t = R + r$) dafay lekke énergie bi ni mbeur buy sàcc doole ! À chaque seconde, puissance bu tollook $P_J = R_t i^2$ dafay génne ci forme de chaleur par effet Joule. Motax élongation bi di wàññiku ba faww : c\'est le régime pseudopériodique. »',
    bacTrap:
      'N\'oubliez jamais la résistance interne r de la bobine ! Si le sujet mentionne « bobine d\'inductance L et de résistance r », la résistance totale sous l\'équadiff est TOUJOURS R_t = R + r. L\'oubli de r fausse tous les calculs suivants de résistance critique et de décrément.',
    scoringGuide:
      'Loi d\'additivité incluant r (0,25 pt) • Équation différentielle complète du second ordre avec terme dérivé premier (0,5 pt) • Démonstration rigoureuse de dEt/dt = -Rt i² (0,5 pt).',
  },
  {
    id: 5,
    title: 'Régimes d\'Amortissement, Résistance Critique R_c & Décrément δ',
    badge: 'Classification des régimes',
    summary:
      'La valeur de la résistance totale $R_t$ comparée à la résistance critique $R_c = 2\\sqrt{\\dfrac{L}{C}}$ détermine la nature de la décharge : pseudopériodique, critique ou apériodique.',
    formula:
      'R_c = 2\\sqrt{\\frac{L}{C}} \\quad ; \\quad \\delta = \\ln\\left(\\frac{u_k}{u_{k+1}}\\right) = \\frac{1}{n}\\ln\\left(\\frac{u_0}{u_n}\\right) \\approx \\frac{R_t\\,T}{2L}',
    demonstration:
      '1. **Équation caractéristique associée** :\n   $$L\\,r^2 + R_t\\,r + \\frac{1}{C} = 0 \\implies \\Delta = R_t^2 - 4\\frac{L}{C}$$\n2. **Résistance critique $R_c$** :\n   $$\\Delta = 0 \\iff R_t^2 = \\frac{4L}{C} \\implies \\mathbf{R_c = 2\\sqrt{\\frac{L}{C}}}$$\n3. **Les 3 régimes physiques** :\n   - **Régime pseudopériodique ($R_t < R_c$)** : $\\Delta < 0$, oscillations amorties d\'amplitude exponentiellement décroissante avec une pseudo-période $T = \\dfrac{2\\pi}{\\sqrt{\\omega_0^2 - \\lambda^2}} \\approx T_0$.\n   - **Régime critique ($R_t = R_c$)** : $\\Delta = 0$, retour à l\'équilibre le plus rapide possible sans aucune oscillation.\n   - **Régime apériodique ($R_t > R_c$)** : $\\Delta > 0$, décharge lente sans oscillation.\n4. **Décrément logarithmique $\\delta$** :\n   Mesure de l\'amortissement entre deux amplitudes maximales successives de même signe séparées par une pseudo-période $T$ :\n   $$\\delta = \\ln\\left(\\frac{u(t)}{u(t + T)}\\right)$$\n   Pour $n$ pseudo-périodes ($n = k\' - k$) :\n   $$\\mathbf{\\delta = \\frac{1}{n}\\ln\\left(\\frac{u_0}{u_n}\\right)}$$\n5. **Relation avec les paramètres du circuit (faible amortissement)** :\n   $$\\mathbf{\\delta \\approx \\frac{R_t\\,T}{2L}}$$\n   Cette relation permet de déterminer expérimentalement la résistance totale $R_t$ ou l\'inductance $L$.',
    wolof:
      '« Résistance critique $R_c = 2\\sqrt{L/C}$ mooy frontière bi : su résistance bi tuutee ($R_t < R_c$), circuit bi day oscillé wante di wàññiku (pseudopériodique). Su résistance bi baree lool ($R_t > R_c$), du mëna oscillé benn yoon (apériodique). Décrément logarithmique $\\delta$ dafay natt vitesse bi oscillations yi di deeye : boo jëlee $n$ périodes, bul fatte divisé par $n$ ! »',
    bacTrap:
      'Pour calculer le décrément sur n périodes, la formule est delta = (1/n) * ln(U₀ / U_n). Les candidats oublient très souvent le facteur 1/n lorsqu\'ils mesurent entre la 1ère et la 4ème crête (où n = 3 pseudo-périodes) !',
    scoringGuide:
      'Formule littérale et calcul de Rc (0,25 pt) • Distinction nette des 3 régimes (0,5 pt) • Définition et formule de delta sur n périodes (0,25 pt) • Détermination numérique de Rt ou L à partir de delta (0,5 pt).',
  },
  {
    id: 6,
    title: 'Analogie Mécanique-Électrique & Entretien des Oscillations',
    badge: 'Couplage & Amplificateur',
    summary:
      'L\'analogie formelle entre les oscillations du pendule élastique et celles du circuit RLC permet de transposer toutes les équations. Pour compenser l\'effet Joule, un montage à ampli-op fournit de l\'énergie.',
    formula:
      'q \\leftrightarrow x \\quad ; \\quad i \\leftrightarrow v \\quad ; \\quad L \\leftrightarrow m \\quad ; \\quad \\frac{1}{C} \\leftrightarrow k \\quad ; \\quad R_0 = R_t \\; \\text{(Entretien)}',
    demonstration:
      '1. **Tableau d\'analogie formelle** :\n   - Grandeur de position : Charge $q(t) \\longleftrightarrow$ Élongation $x(t)$\n   - Grandeur cinématique : Courant $i(t) = \\dot{q} \\longleftrightarrow$ Vitesse $v(t) = \\dot{x}$\n   - Inertie : Inductance $L \\longleftrightarrow$ Masse $m$\n   - Élasticité / Rappel : Inverse de la capacité $\\dfrac{1}{C} \\longleftrightarrow$ Raideur du ressort $k$\n   - Dissipation : Résistance $R_t \\longleftrightarrow$ Coefficient de frottement fluide $h$\n   - Énergie cinétique/magnétique : $E_m = \\frac{1}{2}L\\,i^2 \\longleftrightarrow E_c = \\frac{1}{2}m\\,v^2$\n   - Énergie potentielle/électrique : $E_e = \\frac{1}{2}\\frac{q^2}{C} \\longleftrightarrow E_{pe} = \\frac{1}{2}k\\,x^2$\n2. **Dispositif d\'entretien des oscillations** :\n   Pour compenser les pertes Joule sans modifier la période propre, on insère en série un dipôle actif simulant une **résistance négative** : $u_{\\text{actif}}(t) = -R_0\\,i(t)$ (réalisé avec un amplificateur opérationnel).\n3. **Loi des mailles du circuit entretenu** :\n   $$u_L + u_R + u_C + u_{\\text{actif}} = 0 \\iff L\\frac{di}{dt} + R_t\\,i + \\frac{q}{C} - R_0\\,i = 0$$\n   $$\\mathbf{L\\,\\frac{\\mathrm{d}^2q}{\\mathrm{d}t^2} + (R_t - R_0)\\,\\frac{\\mathrm{d}q}{\\mathrm{d}t} + \\frac{1}{C}\\,q = 0}$$\n4. **Condition d\'entretien sinusoïdal permanent** :\n   Pour obtenir des oscillations purement sinusoïdales non amorties, le terme dissipatif doit être rigoureusement nul :\n   $$R_t - R_0 = 0 \\implies \\mathbf{R_0 = R_t = R + r}$$\n   Le dipôle actif injecte à chaque instant une puissance $P = R_0 i^2$ qui compense exactement la puissance dissipée par effet Joule $P_J = R_t i^2$.',
    wolof:
      '« Analogie mécanique-électrique dafay wone ne Physique benn bopp la ! Inductance $L$ mooy masse $m$ (inertie). Condensateur $1/C$ mooy ressort $k$ (raideur). Résistance $R_t$ mooy frottement fluide $h$. Entretien bi mooy jox ko énergie bu tollook li effet Joule di sàcc : $R_0 = R_t$. Su $R_0$ gënee mag $R_t$, amplificateur bi day saturer ! »',
    bacTrap:
      'Si R_0 > R_t, l\'amplitude des oscillations diverge exponentiellement jusqu\'à la saturation de l\'amplificateur opérationnel (±V_sat). Si R_0 < R_t, les oscillations finissent par s\'amortir et s\'éteindre.',
    scoringGuide:
      'Tableau d\'analogie mécanique-électrique complet (0,5 pt) • Équation différentielle du circuit avec dipôle actif -R₀i (0,5 pt) • Condition d\'entretien R₀ = Rt et interprétation énergétique (0,5 pt).',
  },
];

export default function P7RlcLibresReflexesCard() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const activeReflex = RLC_LIBRES_REFLEXES[activeTab];

  return (
    <section className="bg-white rounded-3xl border border-navy/10 p-6 md:p-8 shadow-sm space-y-6">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-navy/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-900 mb-2">
            <span>Fiches Réflexes • Physique Terminale S2</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-navy">
            P7 : Oscillations Électriques Libres (Circuit LC &amp; RLC)
          </h2>
          <p className="text-sm text-navy/70 mt-1">
            Les 6 protocoles officiels pour l’équation différentielle, les bilans énergétiques, les régimes d’amortissement et l’analogie mécanique
          </p>
        </div>
      </div>

      {/* Onglets des 6 réflexes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {RLC_LIBRES_REFLEXES.map((ref, idx) => {
          const isActive = idx === activeTab;
          return (
            <button
              key={ref.id}
              onClick={() => setActiveTab(idx)}
              className={`p-3 rounded-2xl text-left border transition-all flex flex-col justify-between gap-1.5 ${
                isActive
                  ? 'bg-navy text-white border-navy shadow-sm'
                  : 'bg-slate-50 hover:bg-slate-100 text-navy border-navy/10'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <span
                  className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isActive ? 'bg-white/20 text-white' : 'bg-navy/10 text-navy'
                  }`}
                >
                  {ref.id}
                </span>
                <span className="text-[11px] font-semibold truncate">{ref.badge}</span>
              </div>
              <div className="text-[11px] font-normal truncate opacity-85">{ref.title}</div>
            </button>
          );
        })}
      </div>

      {/* Détails du réflexe actif */}
      <div className="space-y-5">
        {/* Titre et Formule clé */}
        <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-navy/10">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-lg text-xs font-black bg-navy text-white">
              Réflexe #{activeReflex.id}
            </span>
            <h4 className="text-base sm:text-lg font-bold text-navy">{activeReflex.title}</h4>
          </div>

          <div className="my-3 py-3 px-3 bg-white rounded-xl border border-navy/10 text-center overflow-x-auto shadow-xs">
            <MathRenderer formula={activeReflex.formula} />
          </div>

          <div className="text-xs sm:text-sm text-navy/80 font-medium leading-relaxed">
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
