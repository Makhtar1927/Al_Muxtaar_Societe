'use client';

import React, { useState } from 'react';
import MathRenderer from '@/components/course/math-renderer';
import { Target, Lightbulb, AlertTriangle, CheckCircle, Sparkles, Scale } from 'lucide-react';

export default function NewtonReflexesCard() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const REFLEXES = [
    {
      num: 1,
      title: "La Rédaction Officielle du TCI en 5 Étapes Obligatoires",
      badge: "Méthode Officielle Bac",
      formule: "\\sum \\vec{F}_{\\text{ext}} = m\\,\\vec{a}_G \\iff \\vec{P} + \\vec{R}_N + \\vec{f} + \\vec{T} + \\vec{F} = m\\,\\vec{a}_G",
      regleBac:
        "Au Baccalauréat sénégalais, le barème impose systématiquement 5 étapes strictes pour l'application de la 2ème loi de Newton. Oublier de nommer le système ou de préciser que le référentiel est galiléen entraîne la perte immédiate des points de méthode !",
      explication:
        "Pour résoudre tout exercice de dynamique au Bac S2 :\n1. **Système matériel étudié** : préciser clairement le corps ou l'ensemble de corps (ex : {le solide $S$ de masse $m$}).\n2. **Référentiel d'étude** : « Référentiel terrestre supposé galiléen ».\n3. **Bilan des forces extérieures appliquées** :\n   - Le poids $\\vec{P} = m\\,\\vec{g}$ (vertical descendant).\n   - La réaction normale du support $\\vec{R}_N$ (perpendiculaire au contact).\n   - La force de frottement éventuelle $\\vec{f}$ (tangente et opposée au mouvement).\n   - La tension d'un fil $\\vec{T}$ ou la force motrice $\\vec{F}$.\n4. **Application de la 2ème loi de Newton (Théorème du Centre d'Inertie)** :\n   $$\\sum \\vec{F}_{\\text{ext}} = m\\,\\vec{a}_G \\implies \\vec{P} + \\vec{R}_N + \\vec{f} = m\\,\\vec{a}_G$$\n5. **Projection sur le repère cartésien choisi $(Gx, Gy)$** :\n   Projeter chaque vecteur pour obtenir l'équation scalaire selon l'axe du mouvement.",
      wolof:
        "« 5 étapes yii faww nga bind leen ci Bac S2 : 1. Système bi • 2. Référentiel terrestre galiléen • 3. Forces yi yépp (Poids, Réaction, Frottement) • 4. Bindal formule bi : $\\sum \\vec{F}_{\\text{ext}} = m\\,\\vec{a}_G$ • 5. Projeteel ci axes yi ! Boo ko defe rekk, point bi wàcc na ! »",
      piege:
        "Ne jamais écrire l'égalité vectorielle $\\sum \\vec{F} = m\\,\\vec{a}$ sans la flèche vectorielle sur l'accélération et les forces ! Si vous écrivez directement une équation scalaire sans projection explicite, les correcteurs sanctionnent sévèrement.",
    },
    {
      num: 2,
      title: "Dynamique du Plan Incliné : Décomposition de $\\vec{P}$",
      badge: "Plan Incliné & Sinus/Cosinus",
      formule: "P_x = +m\\,g\\,\\sin\\alpha \\quad ; \\quad P_y = -m\\,g\\,\\cos\\alpha \\quad ; \\quad R_N = m\\,g\\,\\cos\\alpha",
      regleBac:
        "Sur une rampe inclinée d'un angle $\\alpha$ avec l'horizontale, l'accélération sans frottement vaut $a = g\\,\\sin\\alpha$. Elle est RIGOUREUSEMENT INDÉPENDANTE de la masse $m$ du corps !",
      explication:
        "1. **Choix du repère judicieux $(Gx, Gy)$** :\n   - Axe $(Gx)$ parallèle à la pente, orienté dans le sens de la descente.\n   - Axe $(Gy)$ perpendiculaire à la pente, orienté vers le haut.\n2. **Décomposition vectorielle du poids $\\vec{P}$** :\n   L'angle $\\alpha$ se retrouve entre la verticale et l'axe $(Gy)$ (angles à côtés perpendiculaires) :\n   - $P_x = +P\\,\\sin\\alpha = +m\\,g\\,\\sin\\alpha$\n   - $P_y = -P\\,\\cos\\alpha = -m\\,g\\,\\cos\\alpha$\n3. **Projection sur l'axe $(Gy)$** (aucun décollement du plan, $a_y = 0$) :\n   $$R_N - m\\,g\\,\\cos\\alpha = 0 \\implies R_N = m\\,g\\,\\cos\\alpha$$\n4. **Projection sur l'axe $(Gx)$ (sans frottement $\\vec{f} = \\vec{0}$)** :\n   $$m\\,g\\,\\sin\\alpha = m\\,a_x \\implies a_x = g\\,\\sin\\alpha$$\n   Un camion de 20 tonnes et une bille de 10 grammes descendent la même rampe avec la même accélération !",
      wolof:
        "« Ci plan incliné bu am angle $\\alpha$ : composante bi di tëj solide bi ci suuf mooy $P_y = -m\\,g\\,\\cos\\alpha$, motax $R_N = m\\,g\\,\\cos\\alpha$. Composante bi koy rëddal ci suuf mooy $P_x = m\\,g\\,\\sin\\alpha$ ! Bu frottement amul, accélération bi mooy $a = g\\,\\sin\\alpha$, masse $m$ bi dafay dindi boppam ! »",
      piege:
        "Attention au piège classique du Bac : si l'angle $\\alpha$ est donné par rapport à la VERTICALE (et non l'horizontale), les rôles de $\\sin\\alpha$ et $\\cos\\alpha$ sont inversés ! Vérifiez toujours si à $\\alpha = 0$ la pente est horizontale ($P_x = 0 \\implies \\sin\\alpha$).",
    },
    {
      num: 3,
      title: "Loi de Frottement de Coulomb & Coefficient $\\mu$",
      badge: "Frottement & Adhérence",
      formule: "f = \\mu\\,R_N = \\mu\\,m\\,g\\,\\cos\\alpha \\implies a = g\\,(\\sin\\alpha - \\mu\\,\\cos\\alpha)",
      regleBac:
        "La force de frottement solide $\\vec{f}$ s'oppose TOUJOURS au vecteur vitesse relative. En mouvement, son intensité est strictement proportionnelle à la réaction normale : $f = \\mu\\,R_N$.",
      explication:
        "1. **Caractéristiques de la force de frottement $\\vec{f}$** :\n   - Direction : parallèle au plan de contact (axe $Gx$).\n   - Sens : opposé au vecteur vitesse $\\vec{v}$ (elle résiste toujours au glissement).\n   - Norme : $f = \\mu\\,R_N$ où $\\mu$ est le coefficient de frottement dynamique (sans unité).\n2. **Accélération sur plan incliné avec frottements** :\n   $$\\sum F_x = m\\,a_x \\implies P_x - f = m\\,a$$\n   $$m\\,g\\,\\sin\\alpha - \\mu\\,m\\,g\\,\\cos\\alpha = m\\,a$$\n   $$a = g\\,(\\sin\\alpha - \\mu\\,\\cos\\alpha)$$\n3. **Condition de glissement sans vitesse initiale** :\n   Le mobile ne se met à glisser vers le bas que si la composante motrice l'emporte sur le frottement :\n   $$P_x > f \\implies m\\,g\\,\\sin\\alpha > \\mu\\,m\\,g\\,\\cos\\alpha \\implies \\tan\\alpha > \\mu$$",
      wolof:
        "« Frottement $\\vec{f}$ dafay kontar waxtu wu nekk vitesse bi ! Norme bi mooy $f = \\mu\\,R_N$. Boo ko duggalé ci formule bi, accélération bi day wàññiku : $a = g\\,(\\sin\\alpha - \\mu\\,\\cos\\alpha)$ ! Bu $\\tan\\alpha < \\mu$, solide bi du yëngu mukk ! »",
      piege:
        "Ne jamais écrire que $f = \\mu\\,P$ ! C'est faux. Le frottement dépend de la réaction normale $R_N$, et non du poids total $P$ ! Sur plan incliné, $R_N = m\\,g\\,\\cos\\alpha$, donc $f = \\mu\\,m\\,g\\,\\cos\\alpha$.",
    },
    {
      num: 4,
      title: "Systèmes de Deux Solides Liés (Poulie & Fil Inextensible)",
      badge: "Machine d'Atwood & Systèmes",
      formule: "T_1 = T_2 = T \\quad ; \\quad a_1 = a_2 = a \\implies a = \\frac{m_2 - m_1}{m_1 + m_2}\\,g",
      regleBac:
        "Pour un fil inextensible et de masse négligeable passant sur une poulie idéale, la tension est uniforme ($T_1 = T_2 = T$) et les deux corps ont la même accélération scalaire ($a_1 = a_2 = a$).",
      explication:
        "1. **Méthode d'isolation des systèmes** :\n   Ne jamais tenter d'appliquer la 2ème loi au système global d'un seul coup sans isoler les composantes, car la tension $\\vec{T}$ est une force intérieure au système global !\n2. **Étape par étape (Cas de la machine d'Atwood, $m_2 > m_1$)** :\n   - Pour le solide $S_1$ (qui monte) : $T - m_1\\,g = m_1\\,a$\n   - Pour le solide $S_2$ (qui descend) : $m_2\\,g - T = m_2\\,a$\n3. **Addition membre à membre pour éliminer la tension $T$** :\n   $$(T - m_1\\,g) + (m_2\\,g - T) = (m_1 + m_2)\\,a$$\n   $$(m_2 - m_1)\\,g = (m_1 + m_2)\\,a \\implies a = \\frac{m_2 - m_1}{m_1 + m_2}\\,g$$\n4. **Calcul de la tension $T$ du fil** :\n   $$T = m_1\\,(g + a) = \\frac{2\\,m_1\\,m_2}{m_1 + m_2}\\,g$$",
      wolof:
        "« Boo amee ñaari solide yu lëkkale ci wànjaare (fil) ak poulie : $T$ bi ci ñaari cati wànjaare bi benn la ($T_1 = T_2 = T$) te accélération bi benn la ($a_1 = a_2 = a$) ! Teelal solide bu nekk ci boppam, nga bolé ñaari équations yi ngir dindi $T$ bi, accélération bi génn ! »",
      piege:
        "Si l'un des solides est sur un plan horizontal ou incliné, sa projection est différente : n'appliquez pas aveuglément la formule d'Atwood ! Rédigez toujours le bilan pour chaque solide.",
    },
    {
      num: 5,
      title: "La 3ème Loi de Newton : Le Piège de la Non-Compensation",
      badge: "Action & Réaction",
      formule: "\\vec{F}_{A/B} = -\\vec{F}_{B/A} \\implies \\|\\vec{F}_{A/B}\\| = \\|\\vec{F}_{B/A}\\|",
      regleBac:
        "L'action et la réaction ont la même droite d'action, la même intensité et des sens opposés, mais elles s'exercent sur deux corps DIFFÉRENTS. Elles ne s'annulent donc JAMAIS !",
      explication:
        "1. **Énoncé fondamental de Newton** :\n   Lorsqu'un corps $A$ exerce une force $\\vec{F}_{A/B}$ sur un corps $B$, le corps $B$ exerce instantanément sur $A$ une force directement opposée $\\vec{F}_{B/A} = -\\vec{F}_{A/B}$.\n2. **Pourquoi elles ne s'annulent pas ?**\n   - $\\vec{F}_{A/B}$ est appliquée au point matériel $B$.\n   - $\\vec{F}_{B/A}$ est appliquée au point matériel $A$.\n   Pour s'annuler ou former un équilibre, des forces doivent être appliquées au MÊME corps !\n3. **Applications sénégalaises fondamentales** :\n   - **Lutte sénégalaise (Lamb)** : pour projeter son adversaire, le lutteur pousse violemment le sol vers l'arrière avec ses pieds ($\\vec{F}_{\\text{pied}/\\text{sol}}$). En retour, le sol propulse le lutteur vers l'avant ($\\vec{F}_{\\text{sol}/\\text{pied}}$).\n   - **Pirogue à moteur à Kayar** : l'hélice pousse l'eau vers l'arrière, l'eau propulse la pirogue vers l'avant.",
      wolof:
        "« 3ème loi de Newton dafay wax ne bu corps $A$ daan corps $B$, $B$ itam dafay daan $A$ ak doole ju tolloo waaye sens bi safaanoo ! Dañuy laaj ci Bac : ndax ñaari doole yii dañuy faye bopp ? Déedéet ! Ndax benn bi dafa nekk ci $A$, baneen bi nekk ci $B$ ! Moom mooy tax mbarodi Lamb yi mën a daan tey jàll ! »",
      piege:
        "Question piège récurrente de l'Office du Bac : « Un cheval tire une charrette. D'après la 3ème loi, la charrette tire le cheval avec une force égale et opposée. Pourquoi l'ensemble avance-t-il ? » Réponse : Le cheval avance grâce à la réaction horizontale du SOL sur ses sabots (frottement propulsif), qui est supérieure à la résistance du sol sur les roues de la charrette !",
    },
    {
      num: 6,
      title: "Enchaînement Dynamique $\\to$ Cinématique $\\to$ Torricelli",
      badge: "De Newton à Torricelli",
      formule: "\\sum \\vec{F}_{\\text{ext}} = m\\,\\vec{a} \\implies a = \\text{cte} \\implies v_B^2 - v_A^2 = 2\\,a\\,d",
      regleBac:
        "Dans 95% des épreuves du Bac S2, la question de dynamique (calcul de l'accélération $a$ par le TCI) est immédiatement suivie d'une question de cinématique (vitesse en bas du plan ou distance d'arrêt).",
      explication:
        "1. **Passage de la dynamique à la cinématique** :\n   Dès que les forces appliquées sont constantes, l'accélération $a$ est constante $\\implies$ le mouvement est un **MRUV** (Mouvement Rectiligne Uniformément Varié).\n2. **Équations horaires déduites par intégration** :\n   - $v(t) = a\\,t + v_0$\n   - $x(t) = \\frac{1}{2}\\,a\\,t^2 + v_0\\,t + x_0$\n3. **L'arme secrète du Bac S2 : La formule de Torricelli** :\n   Pour trouver la vitesse à l'arrivée au point $B$ après avoir parcouru la distance $d = AB$ :\n   $$v_B^2 - v_A^2 = 2\\,a\\,d \\implies v_B = \\sqrt{v_A^2 + 2\\,a\\,d}$$\n   Si le mobile part sans vitesse initiale ($v_A = 0$) sur un plan incliné sans frottement ($a = g\\,\\sin\\alpha$) :\n   $$v_B = \\sqrt{2\\,(g\\,\\sin\\alpha)\\,d} = \\sqrt{2\\,g\\,h} \\quad (\\text{car } h = d\\,\\sin\\alpha)$$\n   On retrouve exactement le théorème de l'énergie cinétique !",
      wolof:
        "« Bu forces yi tegu (constantes), accélération bi $a$ day constante (MRUV) ! Fii la cinématique di lëkkaloo ak dynamique : jëfandikool formule de Torricelli $v_B^2 - v_A^2 = 2\\,a\\,d$ ngir faye vitesse bu mujj bi te doo sonn di faye waxtu $t$ ! »",
      piege:
        "Ne confondez pas accélération et vitesse : si la somme des forces s'annule en un point $B$, l'accélération devient nulle ($a = 0$), mais la VITESSE N'EST PAS NULLE ! Le mobile continue son mouvement par inertie à la vitesse acquise $v_B$ (MRU).",
    },
  ];

  const current = REFLEXES[activeTab];

  return (
    <div className="bg-white rounded-3xl border border-navy/10 p-5 sm:p-7 shadow-sm space-y-6">
      {/* En-tête */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-turquoise-light text-turquoise">
            <Scale className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-xl font-bold text-navy">
              Fiches Réflexes Bac S2 — P2 : Les Lois de Newton sur le Mouvement
            </h3>
            <p className="text-xs text-text/60">
              6 réflexes incontournables et rigoureux pour maîtriser le Théorème du Centre d&apos;Inertie, le plan incliné et les actions réciproques au Baccalauréat sénégalais.
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          Physique Terminale S2
        </span>
      </div>

      {/* Onglets des réflexes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {REFLEXES.map((r, idx) => (
          <button
            key={r.num}
            onClick={() => setActiveTab(idx)}
            className={`py-2 px-3 rounded-2xl text-xs font-bold text-left transition-all border ${
              activeTab === idx
                ? 'bg-turquoise text-white border-turquoise shadow-md shadow-turquoise/20'
                : 'bg-surface hover:bg-navy/5 text-navy border-navy/10'
            }`}
          >
            <span className="block text-[10px] opacity-80 uppercase tracking-wider">
              Réflexe #{r.num}
            </span>
            <span className="truncate block font-semibold">{r.badge}</span>
          </button>
        ))}
      </div>

      {/* Contenu du réflexe actif */}
      <div className="space-y-4 bg-surface rounded-2xl p-5 border border-navy/10">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-turquoise text-white flex items-center justify-center font-bold text-xs">
              {current.num}
            </span>
            <div className="font-bold text-navy text-base sm:text-lg">
              <MathRenderer content={current.title} />
            </div>
          </div>
          <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-navy/5 text-navy border border-navy/10">
            {current.badge}
          </span>
        </div>

        {/* Formule clé KaTeX */}
        <div className="p-3 bg-white rounded-xl border border-navy/10 text-center">
          <span className="text-[10px] uppercase tracking-wider text-text/50 font-bold block mb-1">
            Formule Fondamentale de Dynamique
          </span>
          <MathRenderer content={`$$${current.formule}$$`} />
        </div>

        {/* Règle officielle du Bac */}
        <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-emerald-900 mb-1">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Règle Officielle exigée par l&apos;Office du Baccalauréat :</span>
          </div>
          <MathRenderer content={current.regleBac} className="leading-relaxed pl-5 font-medium text-emerald-950" />
        </div>

        {/* Explication détaillée */}
        <div className="space-y-1.5 text-xs text-navy leading-relaxed bg-white p-4 rounded-xl border border-navy/10">
          <div className="font-bold text-navy flex items-center gap-1.5 mb-2">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Démonstration &amp; Méthode de Résolution Pas-à-Pas :</span>
          </div>
          <MathRenderer content={current.explication} className="pl-5 text-text/80 space-y-2" />
        </div>

        {/* Note pédagogique en Wolof */}
        <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
          <div className="font-bold text-amber-900 flex items-center gap-1.5 mb-1">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Xam-xam ci Wolof (Réflexe Minute) :</span>
          </div>
          <MathRenderer content={current.wolof} className="italic pl-5 text-amber-900/90 leading-relaxed" />
        </div>

        {/* Piège classique à éviter */}
        <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-950 space-y-1">
          <div className="font-bold text-rose-900 flex items-center gap-1.5 mb-1">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>Piège d&apos;Or du Baccalauréat Sénégalais :</span>
          </div>
          <MathRenderer content={current.piege} className="pl-5 text-rose-900/90 font-medium leading-relaxed" />
        </div>
      </div>
    </div>
  );
}

