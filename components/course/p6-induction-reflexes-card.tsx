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

const P6_INDUCTION_REFLEXES: ReflexItem[] = [
  {
    id: 1,
    title: 'Flux Magnétique Φ & Loi Fondamentale de Faraday',
    badge: 'Loi de Faraday',
    summary:
      'Le flux magnétique $\\Phi$ à travers un circuit orienté de $N$ spires de section $S$ plongé dans un champ $\\vec{B}$ uniforme mesure le nombre de lignes de champ traversant la surface. Toute variation temporelle de ce flux induit une f.é.m. $e = -\\dfrac{d\\Phi}{dt}$.',
    formula:
      '\\Phi = N\\,\\vec{B}\\cdot\\vec{n}\\,S = N\\,B\\,S\\,\\cos\\alpha \\quad ; \\quad e = -\\frac{\\mathrm{d}\\Phi}{\\mathrm{d}t} \\quad (\\text{V})',
    demonstration:
      '1. **Orientation obligatoire du circuit** : Choisir arbitrairement un sens de parcours positif sur le contour du circuit. En déduire le vecteur unitaire normal $\\vec{n}$ par la règle de la main droite (ou du tire-bouchon de Maxwell).\n2. **Angle $\\alpha$** : $\\alpha = (\\vec{n}, \\vec{B})$. Attention : si $\\vec{B}$ fait un angle $\\theta$ avec le plan de la bobine, alors $\\alpha = 90^\\circ - \\theta$ !\n3. **Unité du flux** : Le Weber ($\\text{Wb}$), avec $1\\text{ Wb} = 1\\text{ T}\\cdot\\text{m}^2 = 1\\text{ V}\\cdot\\text{s}$.\n4. **Loi de Faraday** : La force électromotrice induite $e(t) = -\\dfrac{\\mathrm{d}\\Phi}{\\mathrm{d}t}$ s\'oppose aux variations de flux qui lui donnent naissance (signe moins).\n5. **Courant induit dans un circuit fermé de résistance totale $R$** : $$i(t) = \\frac{e(t)}{R} = -\\frac{1}{R}\\frac{\\mathrm{d}\\Phi}{\\mathrm{d}t}$$',
    wolof:
      '« Flux magnétique $\\Phi$ dafay natt limu rayons magnétiques yi jaar ci biir spire bi. Su aimant bi di sori wala di jege, flux bi day soppiku ($d\\Phi/dt \\neq 0$). Booba la courant induit di juddu ! Attention ci angle $\\alpha$ : $\\vec{n}$ dafa war a taxaw droit (perpendiculaire) ci spire bi. Su fekkee $\\vec{B}$ dafa tëdd ci kaw spire bi, $\\alpha = 90^\\circ$ kon $\\cos(90^\\circ) = 0$ : amul benn flux ! »',
    bacTrap:
      'Le piège mortel au Bac : si le sujet dit « le champ fait un angle de 30° avec le plan de la bobine », l\'angle alpha dans la formule N\'EST PAS 30° mais 60° (car le vecteur normal est perpendiculaire au plan : alpha = 90° - 30° = 60°). Si vous mettez cos(30°), vous perdez tous les points de la question !',
    scoringGuide:
      'Schéma de la bobine orientée avec vecteur normal n (0,25 pt) • Expression littérale complète de Phi(t) et calcul de alpha (0,5 pt) • Loi de Faraday e = -dPhi/dt avec signe moins explicité (0,5 pt).',
  },
  {
    id: 2,
    title: 'Loi de Modération de Lenz & Sens du Courant Induit',
    badge: 'Loi de Lenz',
    summary:
      'Énoncé fondamental d\'Heinrich Lenz (1834) : Le courant induit a un sens tel que, par ses effets magnétiques (champ induit $\\vec{B}_i$) ou mécaniques (forces de Laplace), il s\'oppose constamment à la cause qui lui donne naissance.',
    formula:
      '\\vec{B}_{\\text{induit}} \\text{ s\'oppose à } \\Delta\\vec{B}_{\\text{ext}} \\quad ; \\quad \\vec{F}_L \\text{ s\'oppose au déplacement}',
    demonstration:
      '1. **Cas 1 : Augmentation du flux sortant ($\\Delta\\Phi > 0$, ex: approche d\'un pôle Nord)** :\n   - *Cause* : Le champ extérieur $\\vec{B}$ augmente à travers la face.\n   - *Effet de Lenz* : Le courant induit crée un champ induit $\\vec{B}_i$ de **sens opposé** à $\\vec{B}$ pour tenter de freiner cette hausse.\n   - *Face magnétique* : La face en regard devient un **pôle Nord** qui repousse l\'aimant (force de répulsion résistive).\n2. **Cas 2 : Diminution du flux ($\\Delta\\Phi < 0$, ex: éloignement d\'un pôle Nord)** :\n   - *Cause* : Le champ extérieur faiblit.\n   - *Effet de Lenz* : Le courant induit crée un champ induit $\\vec{B}_i$ de **même sens** que $\\vec{B}$ pour compenser la baisse.\n   - *Face magnétique* : La face en regard devient un **pôle Sud** qui attire l\'aimant pour le retenir.\n3. **Détermination du sens de $i$** : Orienter la main droite avec le pouce selon $\\vec{B}_i$, les doigts enroulés donnent directement le sens réel de circulation du courant $i$.',
    wolof:
      '« Loi de Lenz mooy principe de contradiction totale ! Boo bëggee sori, mu ñaññ la (attraction). Boo bëggee jege, mu push la (répulsion). Su flux bi di yokk, spire bi dafay génne champ bu ko sàmm (sens opposé). Su flux bi di wàññiku, spire bi dafay génne champ bu koy jàppale (même sens). Motax mënul am courant gratuit sans que nga def travail mécanique ! »',
    bacTrap:
      'Confusion fréquente : le champ induit B_induit ne s\'oppose pas au champ extérieur B ! Il s\'oppose STRICTEMENT à sa VARIATION (Delta B). Si un champ B constant même gigantesque traverse une bobine immobile, il n\'y a AUCUN courant induit (e = 0).',
    scoringGuide:
      'Énoncé rigoureux de la loi de Lenz (0,5 pt) • Identification du sens de variation du flux entrant ou sortant (0,25 pt) • Règle de la main droite justifiant le sens de circulation de i (0,25 pt).',
  },
  {
    id: 3,
    title: 'Rails de Laplace : f.é.m. e = -Blv & Freinage Électromagnétique',
    badge: 'Induction de Lorentz',
    summary:
      'Une tige conductrice de longueur $l$ glissant à la vitesse $\\vec{v} = v\\,\\vec{i}$ sur deux rails parallèles distants de $l$ plongée dans un champ $\\vec{B}$ vertical subit une force de Laplace de freinage proportionnelle à la vitesse.',
    formula:
      '|e| = B\\,l\\,v \\quad ; \\quad i = \\frac{B\\,l\\,v}{R} \\quad ; \\quad \\vec{F}_L = -\\frac{B^2\\,l^2}{R}\\,v\\,\\vec{i}',
    demonstration:
      '1. **Surface balayée en une durée $dt$** :\n   La tige avance de $dx = v\\,dt$. L\'aire du circuit varie de $dS = l\\,dx = l\\,v\\,dt$.\n2. **Variation temporelle de flux** :\n   $$d\\Phi = B\\,dS = B\\,l\\,v\\,dt \\implies \\frac{d\\Phi}{dt} = B\\,l\\,v$$\n3. **f.é.m. induite par la loi de Faraday** :\n   $$e = -\\frac{d\\Phi}{dt} = -B\\,l\\,v$$\n4. **Courant induit dans la boucle de résistance totale $R$** :\n   $$i = \\frac{|e|}{R} = \\frac{B\\,l\\,v}{R}$$\n5. **Force de Laplace exercée sur la tige mobile** :\n   $$\\vec{F}_L = i\\,\\vec{l} \\wedge \\vec{B} \\implies \\mathbf{\\vec{F}_L = -\\frac{B^2\\,l^2}{R}\\,v\\,\\vec{i}}$$\n   Cette force est rigoureusement opposée à la vitesse $\\vec{v}$ : c\'est une force de **freinage électromagnétique**.\n6. **Équation différentielle du mouvement libre** :\n   $$m\\frac{dv}{dt} = -\\frac{B^2 l^2}{R}v \\iff \\mathbf{\\frac{dv}{dt} + \\frac{1}{\\tau}v = 0} \\quad \\text{avec} \\quad \\tau = \\frac{m R}{B^2 l^2}$$',
    wolof:
      '« Tige bi suy glisser ci rails yi, surface u circuit bi day gën a yaatu, kon flux bi day yokk. Courant bi juddu day jur benn force de Laplace bu koy freiner ci kanam ! Ndax li nga doon daaw vitesse bu gaaw, force bi day gën a metti. C\'est le principe de freinage des camions et des trains rapides (freins électromagnétiques sans frottement mécanique) ! »',
    bacTrap:
      'Ne pas oublier la résistance de la tige ! Si l\'énoncé donne une tige de résistance r et un résistor extérieur R, la résistance totale sous le dénominateur est impérativement R_total = R + r.',
    scoringGuide:
      'Établissement du flux dPhi = B*l*v*dt (0,25 pt) • Dérivation de e = -Blv (0,25 pt) • Expression vectorielle de la force de Laplace FL = -(B²l²v/R)i (0,5 pt) • Équation différentielle en v(t) (0,5 pt).',
  },
  {
    id: 4,
    title: 'Inductance Propre L d\'un Solénoïde & Tension Borne Bobine',
    badge: 'Auto-Induction',
    summary:
      'Un courant variable $i(t)$ circulant dans une bobine crée un champ magnétique propre $\\vec{B}_p(t)$ proportionnel à $i$. Le flux propre associé est $\\Phi_p = L\\,i$. L\'inductance $L$ caractérise l\'inertie électromagnétique du dipôle.',
    formula:
      'L = \\mu_0\\,\\frac{N^2\\,S}{l} = \\mu_0\\,n^2\\,V \\quad ; \\quad u_B = r\\,i + L\\,\\frac{\\mathrm{d}i}{\\mathrm{d}t} \\quad (\\text{V})',
    demonstration:
      '1. **Champ magnétique propre à l\'intérieur d\'un solénoïde long ($l \\gg R$)** :\n   $$B_p = \\mu_0\\,\\frac{N}{l}\\,i = \\mu_0\\,n\\,i$$\n2. **Flux propre traversant les $N$ spires** :\n   $$\\Phi_p = N\\,B_p\\,S = N\\left(\\mu_0\\frac{N}{l}i\\right)S = \\left(\\mu_0\\frac{N^2 S}{l}\\right)i$$\n3. **Identification avec la relation fondamentale $\\Phi_p = L\\,i$** :\n   $$\\mathbf{L = \\mu_0\\frac{N^2 S}{l} = \\mu_0 n^2 V} \\quad (\\text{en Henrys H})$$\n   avec $\\mu_0 = 4\\pi \\times 10^{-7}\\text{ H}\\cdot\\text{m}^{-1}$ et $V = S\\cdot l$ le volume intérieur.\n4. **f.é.m. d\'auto-induction** :\n   $$e = -\\frac{d\\Phi_p}{dt} = -L\\,\\frac{di}{dt}$$\n5. **Tension aux bornes de la bobine réelle en convention récepteur** :\n   $$u_B(t) = -e + r\\,i = \\mathbf{r\\,i(t) + L\\,\\frac{\\mathrm{d}i}{\\mathrm{d}t}}$$',
    wolof:
      '« Bobine bi dafa melni nit ku am inertie ci mécanique : dafa bañ changement ! Su courant bi bëggee ñëw ci sassa, bobine bi dafay créer $e = -L\\,\\frac{di}{dt}$ ngir téye ko. Su courant bi bëggee dakk ci sassa, bobine bi day jéem a maintenir courant bi. Valeur u $L$ ci géométrie bi kese la dépendre : limu tours yi ($N^2$), yaatuwaay bi ($S$) ak guddaay bi ($l$). »',
    bacTrap:
      'Comportement en régime continu permanent : quand i = I_0 = constante, di/dt = 0, donc u_B = r I_0. La bobine se comporte alors exactement comme un simple résistor de résistance interne r ! Ne cherchez pas de terme en L en régime continu.',
    scoringGuide:
      'Démonstration du flux propre Phi_p et identification de L (0,5 pt) • Unité Henry (H) (0,25 pt) • Expression de u_B = ri + L di/dt (0,25 pt) • Comportement équivalent en régime permanent (0,25 pt).',
  },
  {
    id: 5,
    title: 'Dipôle RL : Constante de Temps τ = L/R_t & Établissement du Courant',
    badge: 'Régime Transitoire',
    summary:
      'À la fermeture d\'un circuit RL sur un générateur idéal $E$ : $L\\,\\dfrac{di}{dt} + (R+r)i = E$. Le courant s\'établit progressivement selon une loi exponentielle avec une constante de temps $\\tau = \\dfrac{L}{R_t}$.',
    formula:
      'i(t) = I_0\\left(1 - e^{-t/\\tau}\\right) \\quad \\text{avec} \\quad I_0 = \\frac{E}{R + r} \\quad ; \\quad \\tau = \\frac{L}{R + r} \\quad (\\text{s})',
    demonstration:
      '1. **Loi des mailles (loi d\'additivité des tensions)** :\n   $$u_R(t) + u_B(t) = E \\iff R\\,i(t) + r\\,i(t) + L\\,\\frac{di}{dt} = E$$\n   $$(R + r)i + L\\,\\frac{di}{dt} = E$$\n2. **Équation différentielle canonique** :\n   $$\\mathbf{\\frac{\\mathrm{d}i}{\\mathrm{d}t} + \\frac{R_t}{L}\\,i = \\frac{E}{L}} \\iff \\mathbf{\\frac{\\mathrm{d}i}{\\mathrm{d}t} + \\frac{1}{\\tau}\\,i = \\frac{I_0}{\\tau}}$$\n3. **Résolution avec condition initiale $i(0) = 0$** :\n   $$i(t) = I_0\\left(1 - e^{-t/\\tau}\\right)$$\n4. **Méthode de la tangente à l\'origine sur le graphe de $i(t)$ ou $u_R(t)$** :\n   - Tangente en $t = 0$ : pente $= \\left(\\frac{di}{dt}\\right)_0 = \\frac{I_0}{\\tau}$.\n   - Elle coupe l\'asymptote horizontale $y = I_0$ exactement à l\'abscisse $\\mathbf{t = \\tau}$.\n5. **Méthode des $63\\%$** :\n   $$i(\\tau) = I_0(1 - e^{-1}) = I_0(1 - 0{,}368) = \\mathbf{0{,}632\\,I_0 \\approx 63\\% \\text{ de } I_0}$$\n6. **Régime permanent conventionnel** : atteint à $t = 5\\tau$ avec $i(5\\tau) = 0{,}993\\,I_0 > 99\\%$.',
    wolof:
      '« Ci circuit RL, ampoule bi du baax ci sassa ni ci lampe torche ! Bobine bi dafay retarder établissement bi ndax auto-induction. Temps bi mu koy laaj mooy $\\tau = L/R_t$. Boo gënee yokk $L$, retard bi day gën a yàgg. Boo gënee yokk résistance $R_t$, temps bi day gën a gàtt. Ci $t = \\tau$, courant bi agsi na ci $63\\%$. Ci $5\\tau$, lepp jàll na ! »',
    bacTrap:
      'Attention sur l\'oscilloscope : la voie visualisant u_R(t) = R i(t) donne l\'image directe fidèle du courant i(t). En revanche, la voie visualisant u_B(t) décroît de E à r*I_0 ! Ne confondez jamais les deux courbes exponentielles.',
    scoringGuide:
      'Loi des mailles et équation différentielle canonique (0,5 pt) • Définition littérale de I_0 et de tau avec unités (0,5 pt) • Détermination graphique de tau par la tangente ou les 63% (0,5 pt).',
  },
  {
    id: 6,
    title: 'Énergie Magnétique E_m & Principe Fondamental de Continuité',
    badge: 'Continuité de i(t)',
    summary:
      'L\'énergie emmagasinée dans le champ magnétique d\'une bobine est $E_m = \\frac{1}{2}L\\,i^2$. Par principe physique fondamental d\'énergie finie, l\'intensité $i(t)$ traversant une inductance est STRICTEMENT CONTINUE : $i(0^+) = i(0^-)$.',
    formula:
      'E_m = \\frac{1}{2}L\\,i^2 \\quad (\\text{J}) \\quad ; \\quad i(0^+) = i(0^-) \\quad ; \\quad e = -L\\frac{\\mathrm{d}i}{\\mathrm{d}t} \\text{ (surtension)}',
    demonstration:
      '1. **Puissance instantanée reçue par la bobine idéale** :\n   $$p(t) = u_L(t) \\cdot i(t) = \\left(L\\frac{di}{dt}\\right)i = \\frac{d}{dt}\\left(\\frac{1}{2}L\\,i^2\\right)$$\n2. **Énergie magnétique stockée** :\n   $$E_m = \\int_0^I L\\,i\\,di = \\mathbf{\\frac{1}{2}L\\,i^2} \\quad (\\text{en Joules J})$$\n3. **Théorème de continuité du courant** :\n   Si l\'intensité $i(t)$ sautait de $0$ à $I_0$ de façon discontinue en une durée nulle $dt = 0$, la dérivée $\\frac{di}{dt}$ serait infinie, imposant une tension $u_L = \\infty$ et une puissance $P = \\infty$, ce qui est physiquement impossible dans l\'Univers.\n   Par conséquent : $$\\mathbf{i(0^+) = i(0^-)}$$\n4. **Surtension d\'ouverture & Diode de roue libre** :\n   À l\'ouverture brutale d\'un circuit sans dérivation, le courant passe de $I_0$ à $0$ en un temps $dt$ quasi nul. La f.é.m. induite $e = -L\\frac{di}{dt}$ atteint des **milliers de volts** : l\'air s\'ionise et produit une **étincelle de rupture** destructrice. On place donc une diode de roue libre en parallèle inverse.',
    wolof:
      '« Courant ci bobine mënul ne tekk daanu ci 0 ci 0 seconde ! Ndax énergie magnétique $E_m = \\frac{1}{2}L\\,i^2$ mënul soppiku d\'un coup. Su fekkee da nga ubbi interrupteur bi ci gaawte gu ëpp, dérivée bi day dem vers l\'infini, tension bi yéeg ba plusieurs milliers de volts : loolu mooy créer étincelle de rupture bu mën a lakk circuit bi ! Motax ñuy tëral diode de roue libre. »',
    bacTrap:
      'Erreur fréquente : écrire i(0⁺) = I_0 à la fermeture. L\'intensité vaut TOUJOURS zéro juste après la fermeture : i(0⁺) = i(0⁻) = 0 A. Le courant ne peut pas bondir instantanément à travers une inductance.',
    scoringGuide:
      'Formule de Em en Joules (0,25 pt) • Justification énergétique de la continuité de i(t) (0,5 pt) • Explication physique de l\'étincelle de rupture à l\'ouverture (0,25 pt) • Rôle de la diode de roue libre (0,25 pt).',
  },
];

export default function P6InductionReflexesCard() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const activeReflex = P6_INDUCTION_REFLEXES[activeTab];

  return (
    <section className="bg-white rounded-3xl border border-navy/10 p-6 md:p-8 shadow-sm space-y-6">
      {/* En-tête sobre et clair */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-navy/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-xs font-semibold text-blue-900 mb-2">
            <span>Fiches Réflexes • Physique Terminale S2</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-navy">
            P6 : Induction Électromagnétique &amp; Auto-Induction
          </h2>
          <p className="text-sm text-navy/70 mt-1">
            Les 6 protocoles de rédaction incontournables du Baccalauréat sénégalais (Faraday, Lenz, Laplace, Solénoïde &amp; RL)
          </p>
        </div>
      </div>

      {/* Onglets des 6 réflexes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {P6_INDUCTION_REFLEXES.map((ref, idx) => {
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
