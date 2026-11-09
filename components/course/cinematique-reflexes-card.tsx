'use client';

import React, { useState } from 'react';
import MathRenderer from '@/components/course/math-renderer';
import { Target, Lightbulb, AlertTriangle, CheckCircle, Sparkles, Compass } from 'lucide-react';

export default function CinematiqueReflexesCard() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const REFLEXES = [
    {
      num: 1,
      title: "Équation de la Trajectoire par Élimination du Temps t",
      badge: "Trajectoire Cartésienne",
      formule: "\\vec{OM}(t) = x(t)\\,\\vec{i} + y(t)\\,\\vec{j} \\implies t = f(x) \\implies y = g(x)",
      regleBac:
        "L'équation cartésienne de la trajectoire s'obtient en exprimant le temps $t$ à partir de l'équation horaire $x(t)$ puis en le substituant dans $y(t)$. La variable temps $t$ ne doit JAMAIS figurer dans l'équation cartésienne de la trajectoire !",
      explication:
        "1. À partir des équations horaires du mouvement, isoler la variable scalaire temps $t$ dans l'expression de $x(t)$ :\n   $$x(t) = v_0\\,t \\implies t = \\frac{x}{v_0}$$\n2. Remplacer $t$ dans l'expression de $y(t)$ :\n   $$y(t) = -\\frac{1}{2}\\,g\\,t^2 + h \\implies y(x) = -\\frac{g}{2\\,v_0^2}\\,x^2 + h$$\n3. **Identification immédiate au Bac S2** :\n   - Si $y(x) = a\\,x + b$ : la trajectoire est une **droite** (mouvement rectiligne).\n   - Si $y(x) = a\\,x^2 + b\\,x + c$ : la trajectoire est une **branche de parabole**.\n   - Si $(x - x_0)^2 + (y - y_0)^2 = R^2$ : la trajectoire est un **cercle** de centre $C(x_0, y_0)$ et de rayon $R$.",
      wolof:
        "« Équation de la trajectoire mooy relation bi lëkkale $y$ ak $x$ sans waxtu bi $t$ ! Jëleel $t$ ci biir $x(t)$, duggal ko ci $y(t)$. Boo amee $y = a\\,x^2 + b$, xamal ni parabole la ; boo amee $y = a\\,x + b$, droite la ! »",
      piege:
        "Piège classique de rédaction au Bac : n'oubliez jamais de préciser le domaine de validité spatial de $x$ (ex : pour $t \\ge 0$, si $x = v_0\\,t$, alors $x \\ge 0$) pour ne pas décrire une courbe infinie inexistante physiquement.",
    },
    {
      num: 2,
      title: "Nature du Mouvement : Le Test du Produit Scalaire $\\vec{a} \\cdot \\vec{v}$",
      badge: "Accéléré ou Retardé",
      formule: "\\vec{a} \\cdot \\vec{v} > 0 \\iff \\text{Accéléré} \\quad ; \\quad \\vec{a} \\cdot \\vec{v} < 0 \\iff \\text{Retardé / Décéléré}",
      regleBac:
        "Pour déterminer si un mouvement est accéléré ou retardé, calculez TOUJOURS le produit scalaire $\\vec{a} \\cdot \\vec{v}$ (ou le produit algébrique $a \\cdot v$ en mouvement rectiligne), et JAMAIS le signe de l'accélération $a$ seul !",
      explication:
        "1. En cinématique, une accélération négative ($a < 0$) ne signifie PAS obligatoirement que le mouvement est ralenti !\n2. **Règle fondamentale vectorielle** :\n   - Si $\\vec{a} \\cdot \\vec{v} > 0$ : $\\vec{a}$ et $\\vec{v}$ font un angle aigu (même sens) $\\implies$ la norme $v = \\|\\vec{v}\\|$ augmente, le mouvement est **accéléré**.\n   - Si $\\vec{a} \\cdot \\vec{v} < 0$ : $\\vec{a}$ et $\\vec{v}$ font un angle obtus (sens contraires) $\\implies$ la norme $v = \\|\\vec{v}\\|$ diminue, le mouvement est **retardé (ou décéléré)**.\n   - Si $\\vec{a} \\cdot \\vec{v} = 0$ : $\\vec{a} \\perp \\vec{v} \\implies$ la norme de la vitesse est constante ($v = \\text{cte}$), le mouvement est **uniforme**.\n3. **Exemple du Bac S2** : un projectile lancé vers le haut le long d'un axe vertical ascendant ($Oz$) : à la montée $v_z > 0$ et $a_z = -g < 0$, donc $a_z \\cdot v_z < 0$ : le mouvement est retardé. À la descente $v_z < 0$ et $a_z = -g < 0$, donc $a_z \\cdot v_z > 0$ : le mouvement est accéléré !",
      wolof:
        "« Bul jàpp ne bu accélération bi $a < 0$ rekk day wàññi vitesse ! Dafa laaj nga xool produit bi $\\vec{a} \\cdot \\vec{v}$ ! Bu $\\vec{a} \\cdot \\vec{v} > 0$, vitesse bi day yokku (accéléré) ; bu $\\vec{a} \\cdot \\vec{v} < 0$, vitesse bi day wàññiku (retardé / décéléré) ! »",
      piege:
        "Au Baccalauréat, ne dites JAMAIS : « le mouvement est retardé car $a < 0$ ». Vous perdrez la totalité des points ! Formulez ainsi : « $\\vec{a}$ et $\\vec{v}$ sont de sens contraires, donc $\\vec{a} \\cdot \\vec{v} < 0$, par conséquent le mouvement est retardé ».",
    },
    {
      num: 3,
      title: "Le Repère de Frenet $(M, \\vec{u}_t, \\vec{u}_n)$ & Rayon de Courbure $\\rho$",
      badge: "Base Intrinsèque",
      formule: "\\vec{a} = a_t\\,\\vec{u}_t + a_n\\,\\vec{u}_n \\quad \\text{avec} \\quad a_t = \\frac{dv}{dt} \\quad \\text{et} \\quad a_n = \\frac{v^2}{\\rho}",
      regleBac:
        "Dans la base mobile de Frenet $(M, \\vec{u}_t, \\vec{u}_n)$, l'accélération tangentielle $a_t = \\frac{dv}{dt}$ traduit la variation de la valeur scalaire de la vitesse, et l'accélération normale $a_n = \\frac{v^2}{\\rho}$ traduit la courbure de la trajectoire.",
      explication:
        "1. **Vecteur unitaire tangent $\\vec{u}_t$** : tangent à la trajectoire au point $M$, orienté dans le **sens du mouvement**.\n2. **Vecteur unitaire normal $\\vec{u}_n$** : orthogonal à $\\vec{u}_t$, dirigé vers le **centre de courbure $C$ (intérieur de la concavité)**.\n3. **Formules fondamentales de Frenet** :\n   - Accélération tangentielle : $a_t = \\frac{dv}{dt}$\n   - Accélération normale : $a_n = \\frac{v^2}{\\rho}$ où $\\rho$ est le rayon de courbure local en mètres ($\\text{m}$).\n   - Norme totale de l'accélération : $a = \\|\\vec{a}\\| = \\sqrt{a_t^2 + a_n^2}$.\n4. **Calcul du rayon de courbure $\\rho$ au Bac S2** :\n   $$\\rho = \\frac{v^2}{a_n} = \\frac{v^2}{\\sqrt{a^2 - a_t^2}}$$\n   Au sommet $S$ d'une trajectoire parabolique où la vitesse est horizontale : $a_t = 0 \\implies a_n = g \\implies \\rho_S = \\frac{v_S^2}{g}$.",
      wolof:
        "« Repère bu Frenet dafay ànd ak mobile bi $M$ ! $a_t = \\frac{dv}{dt}$ dafay natt ni vitesse bi di soppikoo ci valeur. $a_n = \\frac{v^2}{\\rho}$ dafay natt ni trajectoire bi di kurwewoo (virage) ! Rayon de courbure bi mooy $\\rho = \\frac{v^2}{a_n}$ ! »",
      piege:
        "Ne confondez pas le repère fixe cartésien $(O, \\vec{i}, \\vec{j})$ et le repère mobile de Frenet $(M, \\vec{u}_t, \\vec{u}_n)$ ! Dans Frenet, l'origine se déplace avec le mobile $M$ et $\\vec{u}_n$ pointe TOUJOURS vers la concavité (centre de courbure).",
    },
    {
      num: 4,
      title: "La Formule de Torricelli dans les MRUV (Sans le Temps)",
      badge: "Relation Indépendante de t",
      formule: "v_B^2 - v_A^2 = 2\\,a\\,(x_B - x_A) = 2\\,a\\,d",
      regleBac:
        "Pour un Mouvement Rectiligne Uniformément Varié (MRUV, accélération constante $a = \\text{cte}$), la relation de Torricelli permet de calculer directement la vitesse ou la distance d'arrêt $d$ sans passer par la variable temps $t$.",
      explication:
        "1. **Démonstration officielle du Bac S2** :\n   - Équation de la vitesse : $v(t) = a\\,t + v_A \\implies t = \\frac{v(t) - v_A}{a}$\n   - Équation horaire de position : $x(t) - x_A = \\frac{1}{2}\\,a\\,t^2 + v_A\\,t$\n   - En substituant $t$ :\n     $$x_B - x_A = \\frac{1}{2}\\,a\\left(\\frac{v_B - v_A}{a}\\right)^2 + v_A\\left(\\frac{v_B - v_A}{a}\\right) = \\frac{v_B^2 - v_A^2}{2\\,a}$$\n     $$\\implies v_B^2 - v_A^2 = 2\\,a\\,(x_B - x_A) = 2\\,a\\,d$$\n2. **Application au freinage d'urgence (TER / BRT)** :\n   À l'arrêt final : $v_B = 0 \\implies -v_A^2 = 2\\,a\\,d \\implies d = \\frac{-v_A^2}{2\\,a} = \\frac{v_A^2}{2\\,|a|}$.",
      wolof:
        "« Formule de Torricelli : $v_B^2 - v_A^2 = 2\\,a\\,d$ ! Dafalay dimbali nga faye distance de freinage $d$ walla vitesse bu mujj bi te doo soxla waxtu bi $t$ ! Bu mobile bi taxawé ($v_B = 0$), distance d'arrêt bi mooy $d = \\frac{v_A^2}{2\\,|a|}$ ! »",
      piege:
        "Attention aux unités : convertissez TOUJOURS la vitesse de $\\text{km}\\cdot\\text{h}^{-1}$ en $\\text{m}\\cdot\\text{s}^{-1}$ en divisant par $3{,}6$ avant d'appliquer Torricelli ($160\\text{ km}\\cdot\\text{h}^{-1} = \\frac{160}{3{,}6} \\approx 44{,}44\\text{ m}\\cdot\\text{s}^{-1}$).",
    },
    {
      num: 5,
      title: "Mouvement Circulaire Uniforme (MCU) & Accélération Centripète",
      badge: "MCU : a_t = 0 & a_n = R ω²",
      formule: "v = R\\,\\omega \\quad ; \\quad a_t = 0 \\quad ; \\quad a = a_n = \\frac{v^2}{R} = R\\,\\omega^2 = R\\,(2\\pi\\,N)^2",
      regleBac:
        "En Mouvement Circulaire Uniforme, la vitesse scalaire $v$ est constante, donc l'accélération tangentielle est rigoureusement NULLE ($a_t = \\frac{dv}{dt} = 0$). L'accélération n'est pas nulle : elle est purement normale et centripète ($a_n = \\frac{v^2}{R}$).",
      explication:
        "1. **Paramètres angulaires et linéaires** :\n   - Abscisse curviligne : $s(t) = R\\,\\theta(t)$\n   - Vitesse linéaire : $v = \\frac{ds}{dt} = R\\,\\frac{d\\theta}{dt} = R\\,\\omega$ (avec $\\omega$ en $\\text{rad}\\cdot\\text{s}^{-1}$ et $v$ en $\\text{m}\\cdot\\text{s}^{-1}$)\n2. **Accélération dans la base de Frenet** :\n   $$\\vec{a} = a_t\\,\\vec{u}_t + a_n\\,\\vec{u}_n = 0\\,\\vec{u}_t + \\frac{v^2}{R}\\,\\vec{u}_n = R\\,\\omega^2\\,\\vec{u}_n$$\n   Le vecteur accélération $\\vec{a}$ est dirigé vers le centre du cercle : il est **centripète**.\n3. **Période $T$ et Fréquence $N$** :\n   - Période $T$ (durée d'un tour) : $T = \\frac{2\\pi}{\\omega} = \\frac{2\\pi\\,R}{v}$ (en secondes $\\text{s}$)\n   - Fréquence $N$ ou $f$ (nombre de tours par seconde) : $N = \\frac{1}{T} = \\frac{\\omega}{2\\pi}$ (en Hertz $\\text{Hz}$ ou $\\text{s}^{-1}$).",
      wolof:
        "« Ci MCU, vitesse en valeur dafay tegu ($v = \\text{cte}$), motax $a_t = 0$. Waaye accélération am na : mooy $a_n = \\frac{v^2}{R} = R\\,\\omega^2$ ! Dafay jëm ci digg cercle bi (centripète la) ! Période bi mooy $T = \\frac{2\\pi}{\\omega}$ ! »",
      piege:
        "Erreur fatale fréquente : affirmer que « comme la vitesse est constante, l'accélération est nulle ». C'est FAUX ! La NORME de la vitesse est constante, mais le VECTEUR vitesse $\\vec{v}$ tourne en permanence, d'où l'existence de l'accélération normale $\\vec{a} = a_n\\,\\vec{u}_n \\neq \\vec{0}$.",
    },
    {
      num: 6,
      title: "Mouvement Rectiligne Sinusoïdal & Oscillateur Harmonique",
      badge: "Oscillateur Harmonique",
      formule: "\\ddot{x}(t) + \\omega_0^2\\,x(t) = 0 \\iff x(t) = X_m\\,\\cos(\\omega_0\\,t + \\varphi)",
      regleBac:
        "Tout mouvement dont l'accélération est proportionnelle et opposée à l'élongation ($\\ddot{x} = -\\omega_0^2\\,x$) est un Mouvement Rectiligne Sinusoïdal (MRS) de pulsation propre $\\omega_0$.",
      explication:
        "1. **Équations d'état** :\n   - Position / Élongation : $x(t) = X_m\\,\\cos(\\omega_0\\,t + \\varphi)$\n   - Vitesse instantanée : $v(t) = \\dot{x}(t) = -X_m\\,\\omega_0\\,\\sin(\\omega_0\\,t + \\varphi)$\n   - Accélération instantanée : $a(t) = \\ddot{x}(t) = -X_m\\,\\omega_0^2\\,\\cos(\\omega_0\\,t + \\varphi) = -\\omega_0^2\\,x(t)$\n2. **Grandeurs caractéristiques à retenir** :\n   - Amplitude : $X_m > 0$ (valeur maximale de $|x(t)|$ en $\\text{m}$)\n   - Vitesse maximale au passage par l'équilibre ($x = 0$) : $V_m = X_m\\,\\omega_0$\n   - Accélération maximale aux extrémités ($x = \\pm X_m$) : $a_m = X_m\\,\\omega_0^2$\n   - Période propre : $T_0 = \\frac{2\\pi}{\\omega_0}$ (en secondes $\\text{s}$)\n3. **Phase à l'origine $\\varphi$** :\n   Déterminée à $t = 0$ par les conditions initiales : $x(0) = X_m\\cos(\\varphi)$ et $v(0) = -X_m\\omega_0\\sin(\\varphi)$.",
      wolof:
        "« Mouvement sinusoïdal mooy yengu-yengu bu melni pirogue ci géej gi : $\\ddot{x} + \\omega_0^2\\,x = 0$ ! Vitesse bi gën a mag ci digg bi ($x = 0$) mooy $V_m = X_m\\,\\omega_0$ ! Accélération bi gën a mag ci cati yoon bi mooy $a_m = X_m\\,\\omega_0^2$ ! »",
      piege:
        "Pour trouver $\\varphi$, utilisez TOUJOURS à la fois $x(0)$ ET le signe de la vitesse $v(0)$ ! Si $x(0) = 0$ et le mobile part dans le sens positif ($v(0) > 0$), alors $\\sin(\\varphi) < 0 \\implies \\varphi = -\\frac{\\pi}{2}$ rad (et non $+\\frac{\\pi}{2}$).",
    },
  ];

  const current = REFLEXES[activeTab];

  return (
    <div className="bg-white rounded-3xl border border-navy/10 p-5 sm:p-7 shadow-sm space-y-6">
      {/* En-tête */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-turquoise-light text-turquoise">
            <Compass className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-xl font-bold text-navy">
              Fiches Réflexes Bac S2 — P1 : Cinématique du Point Matériel
            </h3>
            <p className="text-xs text-text/60">
              6 réflexes fondamentaux avec écriture scientifique rigoureuse pour maîtriser les vecteurs, la base de Frenet et les lois du mouvement au Baccalauréat sénégalais.
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
            Formule &amp; Écriture Scientifique Fondamentale
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
