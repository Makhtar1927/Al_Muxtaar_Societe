'use client';

import React, { useState } from 'react';
import MathRenderer from '@/components/course/math-renderer';
import { Target, Lightbulb, AlertTriangle, CheckCircle, Sparkles, Zap, Magnet, Atom } from 'lucide-react';

export default function P4ParticuleReflexesCard() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const REFLEXES = [
    {
      num: 1,
      title: "Force Électrostatique Fe et Négligence du Poids",
      badge: "Poids Négligeable (P << Fe)",
      formule: "\\vec{F}_e = q\\,\\vec{E} \\quad ; \\quad \\frac{P}{F_e} = \\frac{m\\,g}{|q|\\,E} \\approx 10^{-14} \\ll 1",
      regleBac:
        "Au Baccalauréat sénégalais, pour toute particule élémentaire (électron, proton, ion $\\alpha$), le poids est systématiquement négligeable devant la force électrostatique (rapport de l'ordre de $10^{-14}$). On applique le T.C.I. avec la seule force $\\vec{F}_e$ : $m\\vec{a} = q\\vec{E} \\implies \\vec{a} = \\frac{q}{m}\\vec{E}$.",
      explication:
        "1. **Sens de la force électrostatique $\\vec{F}_e$** :\n- Si la charge est positive ($q > 0$) : $\\vec{F}_e$ et $\\vec{E}$ ont le **même sens**.\n- Si la charge est négative ($q < 0$, ex : électron avec $q = -e$) : $\\vec{F}_e$ et $\\vec{E}$ sont de **sens opposés**.\n2. **Champ électrique uniforme** :\nEntre deux armatures planes parallèles séparées de $d$ sous une tension $U = V_A - V_B$ :\n$$E = \\frac{|U|}{d} \\quad (\\text{en V/m ou N/C})$$\nLe vecteur $\\vec{E}$ est orthogonal aux plaques et dirigé vers les **potentiels décroissants** (de l'armature positive vers l'armature négative).",
      wolof:
        "« Ci Bac S2, poids particule bi ($m\\vec{g}$) dafa néew ba duñu ko compte mukk ndax force électrostatique $\\vec{F}_e = q\\vec{E}$ moo ko ëpp ba ci $10^{14}$ yoon ! Bu charge bi négatifé ($q = -e$), force bi dafay contraire direction champ $\\vec{E}$ bi ! »",
      piege:
        "Oublier que pour l'électron, $q = -e < 0$ ! Si la plaque supérieure est positive, $\\vec{E}$ pointe vers le bas, donc $\\vec{F}_e = -e\\vec{E}$ pointe vers le haut : l'électron est dévié vers le haut (attiré par le pôle positif).",
    },
    {
      num: 2,
      title: "Déviation Électrostatique Parabolique & Tache sur Écran",
      badge: "Trajectoire Parabolique & Écran",
      formule: "y(x) = \\frac{q\\,U}{2\\,m\\,d\\,v_0^2}\\,x^2 \\quad ; \\quad Y = D\\,\\tan\\alpha = \\frac{q\\,U\\,L\\,D}{m\\,d\\,v_0^2}",
      regleBac:
        "Dans le condensateur de longueur $L$, la trajectoire est une parabole. À la sortie $(x = L)$, la particule sort du champ et poursuit un mouvement rectiligne uniforme selon la tangente à la parabole. Cette tangente coupe l'axe $(Ox)$ exactement au milieu du condensateur en $x = \\frac{L}{2}$.",
      explication:
        "1. **Équations horaires dans le repère $(O, \\vec{i}, \\vec{j})$** :\n$$a_x = 0 \\implies v_x(t) = v_0 \\implies x(t) = v_0\\,t$$\n$$a_y = \\frac{q E}{m} = \\frac{q U}{m d} \\implies v_y(t) = \\frac{q U}{m d}\\,t \\implies y(t) = \\frac{q U}{2md}\\,t^2$$\n2. **Équation de la parabole** : en éliminant $t = \\frac{x}{v_0}$ :\n$$y(x) = \\frac{q U}{2 m d v_0^2}\\,x^2$$\n3. **Déviation angulaire $\\alpha$ à la sortie $(x = L)$** :\n$$\\tan\\alpha = \\left.\\frac{dy}{dx}\\right|_{x=L} = \\frac{q U L}{m d v_0^2} = \\frac{v_{yS}}{v_0}$$\n4. **Déviation linéaire sur l'écran situé à distance $D$ du centre du condensateur** :\n$$Y = D\\,\\tan\\alpha = \\frac{q\\,U\\,L\\,D}{m\\,d\\,v_0^2}$$\nLa déviation $Y$ est strictement proportionnelle à la tension appliquée $U$ (principe de l'oscilloscope).",
      wolof:
        "« Ci biir plaques yii, ball bi trajectoire parabolique lay def. Bala muy génn ci plaques yi, tangante bi dafay séddaliku ci digg plaques yi ci $x = \\frac{L}{2}$ ! Tache bi ci écran bi ($Y$) dafa proportionnel ak tension $U$ bi : su $U$ doublewé, $Y$ day doublewu ! »",
      piege:
        "Ne pas confondre la distance $D$ qui sépare le centre du condensateur de l'écran avec la distance entre la sortie du condensateur et l'écran ! Si l'énoncé donne la distance $D'$ entre la sortie et l'écran, alors $D = D' + \\frac{L}{2}$.",
    },
    {
      num: 3,
      title: "Force de Lorentz Magnétique : Travail Rigoureusement Nul",
      badge: "Puissance Nulle P = 0 & Ec = cte",
      formule: "\\vec{F}_m = q\\,\\vec{v} \\wedge \\vec{B} \\quad \\implies \\quad \\mathcal{P} = \\vec{F}_m \\cdot \\vec{v} = 0 \\quad \\implies \\quad v = \\text{cte}",
      regleBac:
        "Puisque la force magnétique de Lorentz est orthogonale à chaque instant au vecteur vitesse $\\vec{v}$ (produit vectoriel), sa puissance instantanée $\\mathcal{P} = \\vec{F}_m \\cdot \\vec{v} = 0$ et son travail sont rigoureusement nuls ($W = 0$). D'après le Théorème de l'Énergie Cinétique, la norme de la vitesse reste strictement constante : le mouvement est uniforme !",
      explication:
        "1. **Propriétés fondamentales du produit vectoriel $\\vec{v} \\wedge \\vec{B}$** :\n- Direction : perpendiculaire au plan défini par $(\\vec{v}, \\vec{B})$.\n- Sens : donné par la **règle de la main droite** (ou des trois doigts) en tenant compte du signe de $q$ ($q\\vec{v}$ est dans le sens de $\\vec{v}$ si $q>0$, opposé si $q<0$).\n- Norme : $F_m = |q|\\,v\\,B\\,\\sin(\\vec{v}, \\vec{B})$. Pour $\\vec{v} \\perp \\vec{B}$, $F_m = |q|\\,v\\,B$.\n2. **Conséquence énergétique capitale** :\n$$\\frac{dE_c}{dt} = \\mathcal{P} = \\vec{F}_m \\cdot \\vec{v} = (q\\,\\vec{v} \\wedge \\vec{B}) \\cdot \\vec{v} = 0 \\implies E_c = \\text{constante}$$\nUn champ magnétique ne peut **JAMAIS** modifier la valeur de la vitesse d'une particule (ni accélérer son énergie cinétique) ; il ne fait qu'**incurver sa trajectoire**.",
      wolof:
        "« Champ magnétique $\\vec{B}$ mënul mukk yokk wala wàññi vitesse particule ! Ndax force de Lorentz $\\vec{F} = q\\vec{v}\\wedge\\vec{B}$ dafa orthogonal ak $\\vec{v}$, motax liggéeyam (travail) zéro la : $W = 0$. Vitesse bi dafay gardé valeur am ba fàww (mouvement uniforme) ! »",
      piege:
        "Affirmer qu'un champ magnétique accélère une particule en augmentant sa vitesse est une erreur grave éliminatoire ! $\\vec{B}$ change la direction du vecteur $\\vec{v}$, mais la norme $v$ reste rigoureusement constante.",
    },
    {
      num: 4,
      title: "Mouvement Circulaire Uniforme dans B & Rayon de Courbure",
      badge: "Trajectoire Circulaire R = mv / (|q|B)",
      formule: "R = \\frac{m\\,v}{|q|\\,B} \\quad ; \\quad T = \\frac{2\\pi\\,m}{|q|\\,B} \\quad (\\text{indépendant de } v)",
      regleBac:
        "Dans un champ $\\vec{B}$ uniforme avec $\\vec{v}_0 \\perp \\vec{B}$, le mouvement est plan, circulaire et uniforme. Le rayon de la trajectoire est $R = \\frac{mv}{|q|B}$. La période de révolution $T = \\frac{2\\pi m}{|q|B}$ est strictement indépendante de la vitesse et du rayon (principe du cyclotron).",
      explication:
        "1. **Application du T.C.I. dans le repère de Frenet $(\\vec{u}_t, \\vec{u}_n)$** :\n$$m\\vec{a} = \\vec{F}_m \\iff m(a_t\\,\\vec{u}_t + a_n\\,\\vec{u}_n) = |q|\\,v\\,B\\,\\vec{u}_n$$\n2. **Identification des composantes** :\n- Selon la tangente : $m\\,a_t = m\\frac{dv}{dt} = 0 \\implies v = \\text{cte}$ (mouvement uniforme).\n- Selon la normale : $m\\,a_n = m\\frac{v^2}{R} = |q|\\,v\\,B \\implies R = \\frac{m\\,v}{|q|\\,B} = \\text{cte}$ (mouvement circulaire).\n3. **Période $T$ et pulsation cyclotron $\\omega_c$** :\n$$T = \\frac{2\\pi\\,R}{v} = \\frac{2\\pi\\left(\\frac{mv}{|q|B}\\right)}{v} = \\frac{2\\pi\\,m}{|q|\\,B}$$\n$$\\omega_c = \\frac{2\\pi}{T} = \\frac{|q|\\,B}{m}$$",
      wolof:
        "« Ci biir champ magnétique, particule bi day wër wër bu rëy ci benn rayon $R = \\frac{mv}{|q|B}$. Période bi $T = \\frac{2\\pi m}{|q|B}$ soppikul ndax vitesse bi dafay simplifiér ! Loolu moo tax cyclotron mën di accélérer particules yi à la même fréquence ! »",
      piege:
        "Écrire $R = \\frac{mv}{qB}$ sans valeur absolue sur $q$. Le rayon d'un cercle est une grandeur physique strictement positive : $R = \\frac{mv}{|q|B}$.",
    },
    {
      num: 5,
      title: "Sélecteur de Vitesses de Wien : Filtre Rectiligne E / B",
      badge: "Champs Croisés v0 = E / B",
      formule: "\\vec{F}_e + \\vec{F}_m = \\vec{0} \\iff q\\,\\vec{E} + q\\,\\vec{v}_0 \\wedge \\vec{B} = \\vec{0} \\implies v_0 = \\frac{E}{B}",
      regleBac:
        "Dans un sélecteur de Wien (filtre de vitesses), les champs $\\vec{E}$ et $\\vec{B}$ sont perpendiculaires entre eux et perpendiculaires à la vitesse $\\vec{v}_0$. Seules les particules animées de la vitesse précise $v_0 = \\frac{E}{B}$ subissent des forces électrique et magnétique qui se compensent rigoureusement, et traversent sans déviation.",
      explication:
        "1. **Condition d'absence de déviation** :\nPour que le mouvement reste rectiligne uniforme selon l'axe d'entrée, l'accélération doit être nulle :\n$$\\sum \\vec{F} = \\vec{0} \\iff \\vec{F}_e + \\vec{F}_m = \\vec{0} \\iff q\\,\\vec{E} = -q\\,\\vec{v}_0 \\wedge \\vec{B}$$\n2. **En norme (pour $\\vec{v}_0 \\perp \\vec{B}$)** :\n$$|q|\\,E = |q|\\,v_0\\,B \\implies v_0 = \\frac{E}{B}$$\n3. **Tri des particules** :\n- Si $v > v_0$ : la force magnétique l'emporte ($F_m > F_e$), la particule dévie du côté de $\\vec{F}_m$.\n- Si $v < v_0$ : la force électrostatique l'emporte ($F_e > F_m$), la particule dévie du côté de $\\vec{F}_e$.\n- Seules les particules de vitesse $v = v_0 = \\frac{E}{B}$ franchissent la fente de sortie rectiligne.",
      wolof:
        "« Filtre de Wien mooy sélecteur vitesse : $\\vec{E}$ ak $\\vec{B}$ dañoo croiséwu. Force électrique ak force magnétique dañuy fafanté ($qE = qvB$). Particule bi am vitesse $v_0 = \\frac{E}{B}$ kese mooy jaar ci digg fente bi direct té du dévier ! »",
      piege:
        "Penser que le filtre de Wien dépend de la masse $m$ ou de la charge $q$ de la particule. C'est faux ! La charge $q$ se simplifie rigoureusement ($qE = qvB$), donc la vitesse sélectionnée $v_0 = E/B$ est indépendante de $m$ et de $q$.",
    },
    {
      num: 6,
      title: "Spectromètre de Masse de Bainbridge & Séparation d'Isotopes",
      badge: "Séparation d'Isotopes Delta(d) = 2 Delta(R)",
      formule: "d = 2\\,R = \\frac{2\\,m\\,v_0}{|q|\\,B'} = \\frac{2\\,m\\,E}{|q|\\,B\\,B'} \\quad ; \\quad \\Delta d = d_2 - d_1 = \\frac{2\\,v_0}{|q|\\,B'}\\,(m_2 - m_1)",
      regleBac:
        "Le spectrographe de masse permet de séparer et d'identifier les isotopes d'un élément chimique (ex : $^{20}\\text{Ne}$ et $^{22}\\text{Ne}$, ou $^{6}\\text{Li}$ et $^{7}\\text{Li}$). Les ions pénètrent avec la même vitesse $v_0$ dans la chambre de déviation où règne un champ $\\vec{B}'$. Ils décrivent des demi-cercles de diamètres $d_1 = 2R_1$ et $d_2 = 2R_2$. La distance entre les points d'impact sur la plaque photographique est $\\Delta d = 2(R_2 - R_1) \\propto \\Delta m$.",
      explication:
        "1. **Chambre d'accélération préalable** : sous une tension $U_0$, le T.E.C. donne :\n$$\\frac{1}{2}m v_0^2 = |q|\\,U_0 \\implies v_0 = \\sqrt{\\frac{2|q|U_0}{m}}$$\n2. **Chambre de déviation magnétique $\\vec{B}'$** :\nChaque isotope décrit un demi-cercle de rayon :\n$$R = \\frac{m\\,v_0}{|q|\\,B'}$$\n3. **Écart entre les points d'impact $P_1$ et $P_2$** :\n$$P_1P_2 = d_2 - d_1 = 2(R_2 - R_1) = \\frac{2\\,v_0}{|q|\\,B'}\\,(m_2 - m_1)$$\nLa mesure précise de la distance $P_1P_2$ permet de déterminer la masse inconnue $m_2$ ou le rapport des masses.",
      wolof:
        "« Spectromètre de masse mooy séparer isotopes yi (ni Lithium 6 ak Lithium 7). Ndax masse yi bokkul ($m_2 > m_1$), rayon demi-cercle bi $R_2$ day ëpp $R_1$. Distance bi ci plaque bi $\\Delta d = 2(R_2 - R_1)$ lay am, mën nga ci xam masse isotope bi ! »",
      piege:
        "Attention au facteur 2 ! Les particules décrivent un demi-cercle, donc la distance entre le point d'entrée $O$ et le point d'impact $P$ est le **diamètre** $d = 2R$, et non le rayon $R$.",
    },
  ];

  const current = REFLEXES[activeTab];

  return (
    <div className="bg-white rounded-3xl border border-navy/10 p-5 sm:p-7 shadow-sm space-y-6">
      {/* En-tête */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-turquoise-light text-turquoise">
            <Atom className="w-5 h-5" />
          </span>
          <div>
            <h3 className="font-bold text-navy text-base sm:text-lg">
              Fiches Réflexes du Baccalauréat — Physique P4
            </h3>
            <p className="text-text/60 text-xs sm:text-sm">
              Particules chargées dans les champs électrique E et magnétique B (Terminale S2)
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-navy/5 text-navy border border-navy/10">
          6 Réflexes Stratégiques
        </span>
      </div>

      {/* Onglets des réflexes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {REFLEXES.map((r, idx) => (
          <button
            key={r.num}
            onClick={() => setActiveTab(idx)}
            className={`p-3 rounded-2xl text-left transition-all border ${
              activeTab === idx
                ? 'bg-navy text-white border-navy shadow-sm'
                : 'bg-surface/50 text-text/80 border-navy/10 hover:bg-surface'
            }`}
          >
            <div className="text-[10px] font-bold uppercase tracking-wider opacity-75">
              Réflexe #{r.num}
            </div>
            <div className="font-bold text-xs truncate mt-0.5">{r.title.split(' : ')[0]}</div>
          </button>
        ))}
      </div>

      {/* Contenu du réflexe actif */}
      <div className="space-y-5 bg-surface/30 rounded-2xl p-4 sm:p-6 border border-navy/5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-turquoise text-white flex items-center justify-center font-bold text-xs">
              {current.num}
            </span>
            <h4 className="font-bold text-navy text-base sm:text-lg">{current.title}</h4>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-turquoise/10 text-turquoise border border-turquoise/20">
            {current.badge}
          </span>
        </div>

        {/* Formule Clé */}
        <div className="bg-white rounded-2xl border border-navy/10 p-4 shadow-sm text-center">
          <span className="text-[10px] text-text/50 font-bold uppercase tracking-wider block mb-1">
            Formule &amp; Théorème Fondamental
          </span>
          <div className="text-navy font-bold text-sm sm:text-base">
            <MathRenderer content={`$$${current.formule}$$`} />
          </div>
        </div>

        {/* Règle d'or Baccalauréat */}
        <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200/60 text-xs sm:text-sm text-indigo-950 space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-indigo-900">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>Règle d&apos;Or de l&apos;Office du Baccalauréat Sénégalais</span>
          </div>
          <p className="leading-relaxed"><MathRenderer content={current.regleBac} /></p>
        </div>

        {/* Explication & Démonstration Complète */}
        <div className="bg-white rounded-2xl border border-navy/10 p-4 sm:p-5 text-xs sm:text-sm text-text/90 space-y-2">
          <div className="flex items-center gap-2 font-bold text-navy">
            <CheckCircle className="w-4 h-4 text-turquoise" />
            <span>Démonstration &amp; Justification Rigoureuse</span>
          </div>
          <div className="leading-relaxed space-y-2">
            <MathRenderer content={current.explication} />
          </div>
        </div>

        {/* Décryptage en Wolof & Piège à éviter */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Note en Wolof */}
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-amber-900">
              <span className="text-base">🇸🇳</span>
              <span>Xam-xam ci Wolof • Décodage Pédagogique</span>
            </div>
            <div className="text-amber-950/90 leading-relaxed font-medium">
              <MathRenderer content={current.wolof} />
            </div>
          </div>

          {/* Piège classique du Bac */}
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs sm:text-sm space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-rose-800">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Piège Éliminatoire au Baccalauréat</span>
            </div>
            <div className="text-rose-950/90 leading-relaxed">
              <MathRenderer content={current.piege} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
