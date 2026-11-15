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

const P5_OSCILLATIONS_REFLEXES: ReflexItem[] = [
  {
    id: 1,
    title: 'TCI sur Pendule Horizontal & Équation Différentielle',
    badge: 'Oscillateur harmonique',
    summary:
      'Solide de masse $m$ sur plan horizontal sans frottement. Bilan vectoriel des forces : poids $\\vec{P}$, réaction normale $\\vec{R}_N$ et force de rappel $\\vec{T} = -k x \\vec{i}$. Projection stricte sur $(Ox)$.',
    formula: '\\ddot{x} + \\frac{k}{m}x = 0 \\iff \\ddot{x} + \\omega_0^2 x = 0 \\quad \\text{avec} \\quad \\omega_0 = \\sqrt{\\frac{k}{m}}',
    demonstration:
      '1. **Système & Référentiel** : Solide $(S)$ de masse $m$ dans le référentiel terrestre supposé galiléen muni du repère $(O, \\vec{i})$ horizontal.\n2. **Bilan des forces extérieures** :\n   - Poids : $\\vec{P} = -m\\,g\\,\\vec{j}$\n   - Réaction normale du support : $\\vec{R}_N = R_N\\,\\vec{j}$\n   - Force de rappel du ressort : $\\vec{T} = -k\\,x\\,\\vec{i}$\n3. **Application de la 2e loi de Newton (TCI)** :\n   $$\\sum \\vec{F}_{\\text{ext}} = m\\,\\vec{a} \\iff \\vec{P} + \\vec{R}_N + \\vec{T} = m\\,\\vec{a}$$\n4. **Projection sur l\'axe horizontal $(O, \\vec{i})$** :\n   $$0 + 0 - k\\,x = m\\,a_x \\iff -k\\,x = m\\,\\ddot{x}$$\n5. **Forme canonique de l\'oscillateur harmonique** :\n   $$\\ddot{x} + \\frac{k}{m}\\,x = 0 \\iff \\mathbf{\\ddot{x} + \\omega_0^2\\,x = 0} \\quad \\text{avec} \\quad \\omega_0 = \\sqrt{\\frac{k}{m}}$$',
    wolof:
      '« Bilan des forces ci pendule horizontal : 3 forces kese ñoo am : $\\vec{P}$ ak $\\vec{R}_N$ dañuy neutraliser seen bopp ci vertical bi ($P_x = R_x = 0$). Force bu des mooy rappel bu ressort bi : $\\vec{T} = -kx\\,\\vec{i}$. Signe moins bi dafay firndeel ne su ball bi demee à droite ($x > 0$), ressort bi day ñaññ jëm à gauche ngir dellu ci équilibre bi ! »',
    bacTrap:
      'Ne jamais omettre le signe négatif dans la force de rappel vectorielle : $\\vec{T} = -k x \\vec{i}$. Si $x > 0$, la tension tire vers la gauche ; si $x < 0$, elle pousse vers la droite. Écrire $\\vec{T} = +k x \\vec{i}$ fausse l\'équation différentielle en créant une solution exponentielle divergente au lieu d\'oscillations !',
    scoringGuide:
      'Système et référentiel galiléen (0,25 pt) • Bilan vectoriel rigoureux des 3 forces (0,25 pt) • Projection sur (Ox) et mise sous forme canonique avec ω₀ (0,5 pt).',
  },
  {
    id: 2,
    title: 'Période Propre T₀, Fréquence N₀ & Isochronisme',
    badge: 'Période propre',
    summary:
      'La période propre $T_0$ est la durée d\'une oscillation complète. Elle ne dépend ni de l\'amplitude $X_m$ ni des conditions initiales : c\'est l\'isochronisme des petites et grandes oscillations.',
    formula: 'T_0 = \\frac{2\\pi}{\\omega_0} = 2\\pi\\sqrt{\\frac{m}{k}} \\quad ; \\quad N_0 = \\frac{1}{T_0} = \\frac{1}{2\\pi}\\sqrt{\\frac{k}{m}}',
    demonstration:
      '1. **Lien entre pulsation et période** :\n   $$T_0 = \\frac{2\\pi}{\\omega_0}$$\n2. **Expression en fonction des grandeurs d\'inertie et de rappel** :\n   Comme $\\omega_0 = \\sqrt{\\frac{k}{m}}$, on en déduit immédiatement :\n   $$\\mathbf{T_0 = 2\\pi\\sqrt{\\frac{m}{k}}}$$\n3. **Fréquence propre $N_0$** :\n   $$N_0 = \\frac{1}{T_0} = \\frac{\\omega_0}{2\\pi} = \\frac{1}{2\\pi}\\sqrt{\\frac{k}{m}}$$\n4. **Propriété d\'isochronisme** :\n   La période $T_0$ est intrinsèque au système {solide + ressort}. Si l\'on double l\'amplitude de lâcher ($X_m\' = 2X_m$), la période $T_0$ reste rigoureusement inchangée !\n5. **Influence de la masse** :\n   Si la masse quadruple ($m\' = 4m$), la période ne fait que doubler : $T_0\' = 2\\pi\\sqrt{\\frac{4m}{k}} = 2\\,T_0$.',
    wolof:
      '« Isochronisme mooy li ëpp solo : période $T_0$ dafay dépendre rekk ci masse $m$ bi ak raideur $k$ bi. Boo lâché ball bi ci 2 cm wala 8 cm, waxtu wu muy def ngir déf benn tour dafay melni benn ! Boo quadrupler masse bi ($m\' = 4m$), période bi dafay doublewu ($T_0\' = 2T_0$) ndax racine carrée bi ! »',
    bacTrap:
      'Confondre $m/k$ et $k/m$ sous la racine carrée. Mémo dimensionnel : plus un solide est lourd (forte inertie $m$), plus le mouvement est lent et donc plus la période $T_0$ doit être grande, ce qui impose $m$ au numérateur : $T_0 = 2\\pi\\sqrt{m/k}$.',
    scoringGuide:
      'Formule littérale de T₀ et unité SI en secondes (0,5 pt) • Mention explicite du principe d\'isochronisme des oscillations (0,25 pt).',
  },
  {
    id: 3,
    title: 'Loi Horaire : Détermination de X_m et de la Phase φ',
    badge: 'Conditions initiales',
    summary:
      'La solution générale $x(t) = X_m\\cos(\\omega_0 t + \\varphi)$ et sa dérivée $v(t) = -\\omega_0 X_m\\sin(\\omega_0 t + \\varphi)$ permettent de déterminer rigoureusement le couple $(X_m, \\varphi)$ à $t = 0$.',
    formula: 'X_m = \\sqrt{x_0^2 + \\left(\\frac{v_0}{\\omega_0}\\right)^2} \\quad ; \\quad \\tan\\varphi = -\\frac{v_0}{\\omega_0\\,x_0}',
    demonstration:
      '1. **Équations générales de position et de vitesse** :\n   $$\\begin{cases} x(t) = X_m\\cos(\\omega_0 t + \\varphi) \\\\ v(t) = \\dot{x}(t) = -\\omega_0 X_m\\sin(\\omega_0 t + \\varphi) \\end{cases}$$\n2. **Application aux conditions initiales ($t = 0$)** :\n   $$\\begin{cases} x(0) = X_m\\cos\\varphi = x_0 \\\\ v(0) = -\\omega_0 X_m\\sin\\varphi = v_0 \\implies X_m\\sin\\varphi = -\\frac{v_0}{\\omega_0} \\end{cases}$$\n3. **Calcul de l\'amplitude $X_m$** (somme des carrés) :\n   $$(X_m\\cos\\varphi)^2 + (X_m\\sin\\varphi)^2 = x_0^2 + \\left(-\\frac{v_0}{\\omega_0}\\right)^2$$\n   $$X_m^2(\\cos^2\\varphi + \\sin^2\\varphi) = X_m^2 = x_0^2 + \\frac{v_0^2}{\\omega_0^2} \\implies \\mathbf{X_m = \\sqrt{x_0^2 + \\frac{v_0^2}{\\omega_0^2}}}$$\n4. **Détermination sans équivoque de la phase $\\varphi$** :\n   $$\\tan\\varphi = \\frac{X_m\\sin\\varphi}{X_m\\cos\\varphi} = -\\frac{v_0}{\\omega_0 x_0}$$\n   Pour lever l\'ambiguïté de $\\pi$ sur l\'arctangente, on contrôle impérativement le signe de $\\cos\\varphi$ et de $\\sin\\varphi$.',
    wolof:
      '« Boo bëggee xam phase initiale $\\varphi$ ci Bac bi, bul yem rekk ci $\\tan\\varphi$ ! Danga wara xool ñaari signes yi : signe bu $\\cos\\varphi = \\frac{x_0}{X_m}$ ak signe bu $\\sin\\varphi = -\\frac{v_0}{\\omega_0 X_m}$. Loolu rekk moo lay won ci ban quadrant trigonométrique la $\\varphi$ nekk (0, $\\pi/2$, $\\pi$ wala $-\\pi/2$) ! »',
    bacTrap:
      'Se fier uniquement à $\\tan\\varphi$ sur la calculatrice sans examiner les signes de $\\cos\\varphi$ et $\\sin\\varphi$. Par exemple, $\\tan\\varphi = 1$ donne $\\varphi = \\pi/4$ ou $\\varphi = -3\\pi/4$. Seul le signe de $x_0$ permet de trancher !',
    scoringGuide:
      'Pose des deux équations à t=0 (0,5 pt) • Calcul de X_m avec conversion en mètres (0,25 pt) • Calcul de φ avec justification des signes trigonométriques (0,5 pt).',
  },
  {
    id: 4,
    title: 'Pendule Élastique Vertical & Allongement Statique Δl₀',
    badge: 'Équilibre statique',
    summary:
      'À l\'équilibre statique : $m\\,g = k\\,\\Delta l_0$. En repérant l\'élongation $z(t)$ depuis cette position d\'équilibre, le terme $m\\,g$ est exactement compensé et $T_0 = 2\\pi\\sqrt{\\Delta l_0 / g}$.',
    formula: 'm\\,g = k\\,\\Delta l_0 \\implies \\frac{k}{m} = \\frac{g}{\\Delta l_0} \\implies T_0 = 2\\pi\\sqrt{\\frac{\\Delta l_0}{g}}',
    demonstration:
      '1. **Condition d\'équilibre statique** :\n   Suspendu verticalement, le solide est immobile sous l\'action de son poids $\\vec{P}$ et de la tension $\\vec{T}_0$ :\n   $$\\vec{P} + \\vec{T}_0 = \\vec{0} \\implies m\\,g - k\\,\\Delta l_0 = 0 \\implies \\mathbf{\\Delta l_0 = \\frac{m\\,g}{k}}$$\n   On en tire le rapport fondamental : $\\mathbf{\\frac{k}{m} = \\frac{g}{\\Delta l_0}}$.\n2. **Mouvement dynamique autour de l\'équilibre** :\n   Soit $z(t)$ l\'élongation comptée vers le bas depuis la position d\'équilibre statique.\n   L\'allongement total du ressort est $\\Delta l(t) = \\Delta l_0 + z(t)$.\n   Tension dynamique : $\\vec{T} = -k(\\Delta l_0 + z)\\,\\vec{k}$.\n3. **Application de la 2e loi de Newton** :\n   $$P_z + T_z = m\\,\\ddot{z} \\iff m\\,g - k(\\Delta l_0 + z) = m\\,\\ddot{z}$$\n   $$(\\underbrace{m\\,g - k\\,\\Delta l_0}_{= 0}) - k\\,z = m\\,\\ddot{z} \\implies -k\\,z = m\\,\\ddot{z}$$\n   $$\\mathbf{\\ddot{z} + \\frac{k}{m}\\,z = 0} \\iff \\mathbf{\\ddot{z} + \\omega_0^2\\,z = 0}$$\n4. **Période propre remarquable** :\n   $$T_0 = 2\\pi\\sqrt{\\frac{m}{k}} = \\mathbf{2\\pi\\sqrt{\\frac{\\Delta l_0}{g}}}$$',
    wolof:
      '« Pendule vertical bi : dafa am équilibre statique bala muy daw ! Poids bi dafay sàmm boppam ak tension bi : $mg = k\\,\\Delta l_0$. Motax $\\frac{k}{m} = \\frac{g}{\\Delta l_0}$. Boo duggee ci dynamique bi, équation bi dafay dellusiwaat exactement naka pendule horizontal bi : $\\ddot{z} + \\frac{k}{m}z = 0$. Période bi dafay melni pendule simple : $T_0 = 2\\pi\\sqrt{\\frac{\\Delta l_0}{g}}$ ! »',
    bacTrap:
      'Repérer l\'élongation $z(t)$ à partir de la position à vide du ressort au lieu de la position d\'équilibre statique. Si on la prend depuis la longueur à vide $l_0$, le terme constant $mg$ subsiste dans l\'équation et l\'équation différentielle n\'est plus canonique !',
    scoringGuide:
      'Équation statique mg = k·Δl₀ (0,25 pt) • Expression de la tension dynamique et compensation de mg (0,5 pt) • Équation canonique et T₀ en fonction de Δl₀ (0,25 pt).',
  },
  {
    id: 5,
    title: 'Conservation de l\'Énergie Mécanique & Vitesse Maximale',
    badge: 'Bilan énergétique',
    summary:
      'En l\'absence de frottements, l\'énergie mécanique $E_m = E_c + E_{pe}$ est constante à tout instant : $E_m = \\frac{1}{2}k X_m^2 = \\frac{1}{2}m V_m^2$. Elle permet de calculer $V_m = \\omega_0 X_m$.',
    formula: 'E_m = \\frac{1}{2}m\\,v^2 + \\frac{1}{2}k\\,x^2 = \\frac{1}{2}k\\,X_m^2 = \\frac{1}{2}m\\,V_m^2 = \\text{constante}',
    demonstration:
      '1. **Énergie cinétique instantanée** :\n   $$E_c(t) = \\frac{1}{2}m\\,v^2 = \\frac{1}{2}m\\,X_m^2\\,\\omega_0^2\\,\\sin^2(\\omega_0 t + \\varphi)$$\n2. **Énergie potentielle élastique instantanée** :\n   $$E_{pe}(t) = \\frac{1}{2}k\\,x^2 = \\frac{1}{2}k\\,X_m^2\\,\\cos^2(\\omega_0 t + \\varphi)$$\n3. **Énergie mécanique totale** :\n   Comme $\\omega_0^2 = \\frac{k}{m} \\implies m\\,\\omega_0^2 = k$ :\n   $$E_m = \\frac{1}{2}k\\,X_m^2\\left(\\sin^2(\\omega_0 t + \\varphi) + \\cos^2(\\omega_0 t + \\varphi)\\right) = \\mathbf{\\frac{1}{2}k\\,X_m^2 = \\text{constante}}$$\n4. **Vitesse maximale au passage par l\'équilibre ($x = 0$)** :\n   Quand $x = 0$, $E_{pe} = 0$, donc toute l\'énergie est cinétique :\n   $$E_m = \\frac{1}{2}m\\,V_m^2 = \\frac{1}{2}k\\,X_m^2 \\implies \\mathbf{V_m = X_m\\sqrt{\\frac{k}{m}} = \\omega_0\\,X_m}$$\n5. **Période des énergies $T_E$** :\n   Comme $\\cos^2(\\theta) = \\frac{1 + \\cos(2\\theta)}{2}$, l\'énergie oscille à la pulsation $2\\omega_0$. La période énergétique est donc la moitié de la période propre : $\\mathbf{T_E = \\frac{T_0}{2}}$.',
    wolof:
      '« Énergie mécanique $E_m$ dafay gardé boppam saa su nekk su amul frottements : su ball bi nekkee ci mbeñu ($x = \\pm X_m$), vitesse bi zéro la, énergie yépp dafay doon potentielle ($E_m = \\frac{1}{2}kX_m^2$). Su tàbbee ci digg bi ($x = 0$), dafay gaaw lool, énergie yépp doon cinétique ($E_m = \\frac{1}{2}mV_m^2$) ! Vitesse maximale bi mooy $V_m = \\omega_0 X_m$. Période énergétique bi mooy moitié période propre bi : $T_E = T_0 / 2$ ! »',
    bacTrap:
      'Confondre la période mécanique $T_0$ (qui régit $x(t)$ et $v(t)$) avec la période énergétique $T_E$. Comme les énergies s\'annulent et culminent deux fois par oscillation, leur période vaut impérativement $T_E = \\frac{T_0}{2}$.',
    scoringGuide:
      'Expressions complètes de Ec et Epe (0,5 pt) • Somme et simplification en 1/2 k Xm² (0,25 pt) • Vitesse maximale Vm = ω₀ Xm et période TE = T₀/2 (0,25 pt).',
  },
  {
    id: 6,
    title: 'Retrouver l\'Équation Différentielle par Dérivation de Em',
    badge: 'Méthode énergétique',
    summary:
      'Puisque $E_m$ est constante dans un système conservatif, sa dérivée par rapport au temps est nulle : $\\frac{dE_m}{dt} = 0$. En factorisant par la vitesse $\\dot{x} \\neq 0$, on retrouve l\'équation du mouvement.',
    formula: '\\frac{dE_m}{dt} = 0 \\iff \\dot{x}\\left(m\\,\\ddot{x} + k\\,x\\right) = 0 \\implies \\ddot{x} + \\frac{k}{m}\\,x = 0',
    demonstration:
      '1. **Expression de l\'énergie mécanique** :\n   $$E_m = \\frac{1}{2}m\\,\\dot{x}^2 + \\frac{1}{2}k\\,x^2 = \\text{constante}$$\n2. **Dérivation temporelle membre à membre** :\n   En appliquant la règle de dérivation des fonctions composées $(u^2)\' = 2u\\,u\'$ :\n   $$\\frac{dE_m}{dt} = \\frac{1}{2}m\\left(2\\,\\dot{x}\\,\\ddot{x}\\right) + \\frac{1}{2}k\\left(2\\,x\\,\\dot{x}\\right) = 0$$\n   $$m\\,\\dot{x}\\,\\ddot{x} + k\\,x\\,\\dot{x} = 0$$\n3. **Factorisation par la vitesse $\\dot{x} = v$** :\n   $$\\dot{x}\\left(m\\,\\ddot{x} + k\\,x\\right) = 0$$\n4. **Justification physique indispensable au Bac** :\n   Puisque l\'oscillateur effectue des oscillations libres, sa vitesse $\\dot{x}(t)$ n\'est pas identiquement nulle à tout instant $t$.\n   Par conséquent, le terme entre parenthèses s\'annule nécessairement :\n   $$m\\,\\ddot{x} + k\\,x = 0 \\iff \\mathbf{\\ddot{x} + \\frac{k}{m}\\,x = 0}$$',
    wolof:
      '« Mbindu énergétique mooy méthode bi gën a gaaw ci Bac ngir génne équation différentielle ! Derivel $E_m$ ci temps bi ($dE_m/dt = 0$), factorisel par vitesse bi $\\dot{x}$. Nanga wax jury bi ne vitesse bi du zéro waxtu wu nekk, motax li nekk ci parenthèses bi moo wara nekk zéro : $m\\ddot{x} + kx = 0$ ! »',
    bacTrap:
      'Oublier d\'écrire la phrase justificative clé : « Comme $\\dot{x}(t)$ n\'est pas identiquement nulle à chaque instant, on a $m\\ddot{x} + kx = 0$ ». Omettre cette phrase fait systématiquement perdre le quart de point accordé par le barème officiel !',
    scoringGuide:
      'Calcul correct de la dérivée temporelle de Em (0,5 pt) • Factorisation par la vitesse x_point (0,25 pt) • Justification explicite x_point != 0 et équation finale (0,25 pt).',
  },
];

export default function P5OscillationsReflexesCard() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const activeReflex = P5_OSCILLATIONS_REFLEXES[activeTab];

  return (
    <div className="bg-white rounded-3xl border border-navy/10 p-5 sm:p-7 shadow-sm space-y-6">
      {/* En-tête sobre sans icônes superflues */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy/10 pb-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-3 py-1 text-xs font-bold text-navy mb-1.5 border border-navy/10">
            <span>Chapitre P5 • Fiches Méthodes &amp; Réflexes</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-navy">
            Oscillations Mécaniques &amp; Pendule Élastique (Bac S2)
          </h3>
          <p className="text-xs sm:text-sm text-surface-muted mt-1 max-w-2xl">
            6 règles d&apos;or et démonstrations pas à pas conformes au programme sénégalais : TCI, isochronisme, loi horaire, pendule vertical et méthode énergétique.
          </p>
        </div>
        <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 shrink-0">
          Physique — Terminale S2
        </span>
      </div>

      {/* Onglets des réflexes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {P5_OSCILLATIONS_REFLEXES.map((r, idx) => (
          <button
            key={r.id}
            onClick={() => setActiveTab(idx)}
            className={`py-2 px-3 rounded-2xl text-xs font-bold text-left transition-all border ${
              activeTab === idx
                ? 'bg-navy text-white border-navy shadow-sm'
                : 'bg-surface hover:bg-navy/5 text-navy border-navy/10'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span
                className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  activeTab === idx ? 'bg-white/20 text-white' : 'bg-navy/10 text-navy'
                }`}
              >
                {r.id}
              </span>
              <span className="truncate">{r.badge}</span>
            </div>
            <div className="text-[11px] font-normal truncate opacity-85">{r.title}</div>
          </button>
        ))}
      </div>

      {/* Contenu du réflexe actif */}
      <div className="space-y-5">
        {/* Titre et Formule clé */}
        <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-navy/10">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 rounded-lg text-xs font-black bg-navy text-white">
              Réflexe #{activeReflex.id}
            </span>
            <h4 className="text-base sm:text-lg font-bold text-navy">{activeReflex.title}</h4>
          </div>
          <div className="my-3 py-3 px-3 bg-white rounded-xl border border-navy/10 text-center overflow-x-auto">
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
    </div>
  );
}
