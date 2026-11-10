'use client';

import React, { useState } from 'react';
import MathRenderer from '@/components/course/math-renderer';
import { Target, Lightbulb, AlertTriangle, CheckCircle, Sparkles, Crosshair } from 'lucide-react';

export default function ProjectileReflexesCard() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const REFLEXES = [
    {
      num: 1,
      title: "Indépendance des Mouvements selon (Ox) et (Oy)",
      badge: "Principe de Superposition",
      formule: "a_x = 0 \\implies v_x = v_0\\cos\\alpha = \\text{cte} \\quad ; \\quad a_y = -g \\implies v_y = -g\\,t + v_0\\sin\\alpha",
      regleBac:
        "Au Baccalauréat sénégalais, le mouvement d'un projectile dans le champ de pesanteur se décompose rigoureusement en deux mouvements orthogonaux indépendants : un MRU horizontal et un MRUV vertical de chute libre.",
      explication:
        "D'après le Théorème du Centre d'Inertie : $m\\vec{a} = m\\vec{g} \\implies \\vec{a} = \\vec{g}$.\nEn projetant dans le repère $(O, \\vec{i}, \\vec{j})$ où $(Oy)$ est vertical ascendant :\n- **Sur l'axe horizontal $(Ox)$** : aucune force n'agit ($a_x = 0$). La vitesse horizontale reste strictement constante au cours du vol :\n  $$v_x(t) = v_0\\cos\\alpha \\implies x(t) = (v_0\\cos\\alpha)\\,t + x_0$$\n- **Sur l'axe vertical $(Oy)$** : le projectile subit en permanence l'attraction gravitationnelle ($a_y = -g$). Le mouvement est rectiligne uniformément varié :\n  $$v_y(t) = -g\\,t + v_0\\sin\\alpha \\implies y(t) = -\\frac{1}{2}g\\,t^2 + (v_0\\sin\\alpha)\\,t + y_0$$",
      wolof:
        "« 2 mouvements yii dañoo seddaliku ci ñaari axes yu bokkul : ci wetu $(Ox)$, force amul, vitesse bi $v_x = v_0\\cos\\alpha$ du soppiku mukk (MRU) ! Ci kaw ak suuf $(Oy)$, pesanteur $\\vec{g}$ kese koy ñaññ ci suuf ($a_y = -g$), motax vitesse verticale bi $v_y = -gt + v_0\\sin\\alpha$ dafay wàcc ba nekk zéro fa summit bi bala muy dellusiwaat ci suuf ! »",
      piege:
        "Attention au signe de $a_y$ : comme l'axe $(Oy)$ pointe vers le haut et que la pesanteur $\\vec{g}$ tire vers le bas, on a $a_y = -g$. Mettre $+g$ au lieu de $-g$ fausse immédiatement toutes les équations horaires !",
    },
    {
      num: 2,
      title: "Équation Cartésienne de la Trajectoire Parabolique",
      badge: "Élimination du Temps t",
      formule: "y(x) = -\\frac{g}{2\\,v_0^2\\,\\cos^2\\alpha}\\,x^2 + (\\tan\\alpha)\\,x + y_0",
      regleBac:
        "L'équation de la trajectoire ne doit JAMAIS contenir le temps $t$. Elle s'obtient en exprimant $t = \\frac{x}{v_0\\cos\\alpha}$ depuis l'équation de $x(t)$, puis en le substituant dans $y(t)$.",
      explication:
        "1. De $x(t) = (v_0\\cos\\alpha)\\,t$ (pour $x_0 = 0$), on isole la variable temps :\n   $$t = \\frac{x}{v_0\\cos\\alpha}$$\n2. On reporte $t$ dans l'équation horaire de l'ordonnée $y(t)$ :\n   $$y(x) = -\\frac{1}{2}g\\left(\\frac{x}{v_0\\cos\\alpha}\\right)^2 + (v_0\\sin\\alpha)\\left(\\frac{x}{v_0\\cos\\alpha}\\right) + y_0$$\n3. En simplifiant : $\\frac{\\sin\\alpha}{\\cos\\alpha} = \\tan\\alpha$, d'où :\n   $$y(x) = -\\frac{g}{2\\,v_0^2\\,\\cos^2\\alpha}\\,x^2 + (\\tan\\alpha)\\,x + y_0$$\n   Puisque le coefficient devant $x^2$ est strictement négatif ($-\\frac{g}{2v_0^2\\cos^2\\alpha} < 0$), la courbe est une parabole orientée vers le bas.",
      wolof:
        "« Équation de trajectoire du am mukk waxtu bi $t$ ! Génneel $t = \\frac{x}{v_0\\cos\\alpha}$ ci $x$, duggal ko ci $y$. Parabole buy daanu ci suuf ngay am ndax coefficient bu $x^2$ dafa négatif ! »",
      piege:
        "Ne pas confondre les équations horaires $x(t)$ et $y(t)$ (qui dépendent du temps $t$) avec l'équation de la trajectoire $y(x)$ (qui ne dépend que de la position spatiale $x$).",
    },
    {
      num: 3,
      title: "Sommet S de la Trajectoire & Flèche Maximale H",
      badge: "Condition vy = 0",
      formule: "t_S = \\frac{v_0\\sin\\alpha}{g} \\quad ; \\quad x_S = \\frac{v_0^2\\sin(2\\alpha)}{2\\,g} \\quad ; \\quad y_S = H = \\frac{v_0^2\\sin^2\\alpha}{2\\,g} + y_0",
      regleBac:
        "Au sommet $S$ de la parabole, la vitesse du mobile n'est JAMAIS nulle ! Seule sa composante verticale s'annule ($v_y = 0$). La vitesse au sommet est purement horizontale : $v_S = v_0\\cos\\alpha$.",
      explication:
        "1. **Condition physique au sommet** : la tangente est horizontale, donc le projectile cesse temporairement de monter :\n   $$v_y(t_S) = 0 \\iff -g\\,t_S + v_0\\sin\\alpha = 0 \\implies t_S = \\frac{v_0\\sin\\alpha}{g}$$\n2. **Abscisse du sommet $x_S$** :\n   $$x_S = (v_0\\cos\\alpha)\\,t_S = \\frac{v_0^2\\sin\\alpha\\cos\\alpha}{g} = \\frac{v_0^2\\sin(2\\alpha)}{2\\,g}$$\n3. **Flèche $H$ (ordonnée maximale $y_S$)** :\n   $$y_S = -\\frac{1}{2}g\\,t_S^2 + (v_0\\sin\\alpha)\\,t_S + y_0 = \\frac{v_0^2\\sin^2\\alpha}{2\\,g} + y_0$$\n4. **Norme du vecteur vitesse au sommet** :\n   $$v_S = \\sqrt{v_{Sx}^2 + v_{Sy}^2} = \\sqrt{(v_0\\cos\\alpha)^2 + 0} = v_0\\cos\\alpha$$",
      wolof:
        "« Piège bu mag ci Bac S2 : bul wax mukk ne ci summit bi vitesse bi dafay nekk zéro ! Dédét ! Composante verticale bi $v_y$ kese moo nekk zéro, waaye composante horizontale bi $v_x = v_0\\cos\\alpha$ dafay wéy di daw ! Vitesse bi ci summit bi mooy $v_S = v_0\\cos\\alpha$ ! »",
      piege:
        "Écrire $v_S = 0$ au sommet est une faute éliminatoire au Bac. Seule $v_{Sy} = 0$, tandis que $v_{Sx} = v_0\\cos\\alpha > 0$.",
    },
    {
      num: 4,
      title: "Portée Horizontale & Condition de Portée Maximale",
      badge: "Portée Maximale à 45°",
      formule: "x_P = \\frac{v_0^2\\sin(2\\alpha)}{g} \\quad \\implies \\quad x_{P,\\text{max}} = \\frac{v_0^2}{g} \\quad (\\text{pour } \\alpha = 45^\\circ)",
      regleBac:
        "Lorsque le tir a lieu depuis le sol ($y_0 = 0$), la portée est maximale pour un angle de tir $\\alpha = 45^\\circ$ car $\\sin(2\\alpha) = \\sin(90^\\circ) = 1$. De plus, la parabole est symétrique : $x_P = 2\\,x_S$ et $t_P = 2\\,t_S$.",
      explication:
        "1. **Condition d'impact sur le sol plat ($y = 0$)** :\n   $$y(x_P) = 0 \\iff x_P\\left(-\\frac{g}{2v_0^2\\cos^2\\alpha}x_P + \\tan\\alpha\\right) = 0$$\n   La solution non nulle donne la portée :\n   $$x_P = \\frac{2v_0^2\\sin\\alpha\\cos\\alpha}{g} = \\frac{v_0^2\\sin(2\\alpha)}{g}$$\n2. **Angle de portée maximale** :\n   Puisque $\\sin(2\\alpha) \\le 1$, la valeur maximale est atteinte quand $\\sin(2\\alpha) = 1$, soit $2\\alpha = 90^\\circ \\implies \\alpha = 45^\\circ$.\n3. **Propriétés de symétrie (pour $y_0 = 0$)** :\n   - Le sommet est exactement au milieu : $x_S = \\frac{x_P}{2}$.\n   - La durée de vol totale est le double du temps de montée : $t_P = 2\\,t_S$.",
      wolof:
        "« Boo amee suuf bu plat ($y_0 = 0$), parabole bi dafa symétrique temm : distance bi ball bi def bala muy summit bi ($x_S$) mooy moitié portée bi ($x_P = 2\\,x_S$) ! Waxtu bi muy def ngir summit bi ($t_S$) dafay doublewu ngir dëkk suuf ($t_P = 2\\,t_S$) ! Boo bëggee mu sori lool ci suuf, tëjal ko ci $45^\\circ$ ! »",
      piege:
        "Attention : si $y_0 > 0$ (lancement depuis une hauteur, ex : joueur de basket ou lanceur de poids), la portée maximale n'est plus à $45^\\circ$, mais légèrement inférieure (autour de $40^\\circ$ à $42^\\circ$).",
    },
    {
      num: 5,
      title: "Vitesse d'Impact au Sol & Théorème de l'Énergie Cinétique",
      badge: "Méthode Énergétique T.E.C.",
      formule: "v_P = \\sqrt{v_0^2 + 2\\,g\\,(y_0 - y_P)} \\quad \\implies \\quad v_P = v_0 \\quad (\\text{si } y_0 = y_P = 0)",
      regleBac:
        "Le Théorème de l'Énergie Cinétique permet de déterminer instantanément la vitesse en n'importe quel point de la trajectoire sans avoir besoin de calculer la durée de vol ni les composantes vectorielles.",
      explication:
        "Entre le point de lancement $M_0(x_0, y_0)$ et le point d'impact $P(x_P, y_P)$ :\n$$\\Delta E_c = \\frac{1}{2}m v_P^2 - \\frac{1}{2}m v_0^2 = W(\\vec{P}) = m\\,g\\,(y_0 - y_P)$$\nEn simplifiant par la masse $m$ :\n$$v_P^2 = v_0^2 + 2\\,g\\,(y_0 - y_P) \\implies v_P = \\sqrt{v_0^2 + 2\\,g\\,(y_0 - y_P)}$$\n- Si le projectile retombe au même niveau ($y_0 = y_P = 0$) : $v_P = v_0$. La vitesse d'impact a exactement la même valeur que la vitesse initiale !\n- Si le projectile tombe dans un ravin ($y_P < y_0$) : le poids est moteur ($W(\\vec{P}) > 0$), donc $v_P > v_0$.\n- Si le projectile atterrit en hauteur ($y_P > y_0$) : le poids est résistant, donc $v_P < v_0$.",
      wolof:
        "« Théorème de l'Énergie Cinétique mooy sa arme secrète ngir wuti vitesse ! Mën nga dindi waxtu $t$ yépp : $v^2 = v_0^2 + 2g(y_0 - y)$. Su fekkee sol bi plat la ($y_0 = y = 0$), ball bi day dëkkuwaat ci suuf ak exactement vitesse bi mu génnee ci départ bi ($v_P = v_0$) ! »",
      piege:
        "N'oubliez pas que le travail du poids ne dépend que de la dénivellation verticale $\\Delta y = y_{\\text{départ}} - y_{\\text{arrivée}}$, et jamais du chemin suivi ni de l'angle de tir $\\alpha$ !",
    },
    {
      num: 6,
      title: "Équation en tan(α) pour Toucher une Cible & Vitesse Minimale",
      badge: "Grand Classique d'Excellence",
      formule: "\\frac{1}{\\cos^2\\alpha} = 1 + \\tan^2\\alpha \\implies \\left(\\frac{g\\,x_C^2}{2v_0^2}\\right)\\tan^2\\alpha - x_C\\tan\\alpha + \\left(y_C + \\frac{g\\,x_C^2}{2v_0^2}\\right) = 0",
      regleBac:
        "Pour trouver l'angle de tir permettant d'atteindre une cible $C(x_C, y_C)$, on utilise toujours l'identité $\\frac{1}{\\cos^2\\alpha} = 1 + \\tan^2\\alpha$ pour se ramener à une équation du second degré en $X = \\tan\\alpha$.",
      explication:
        "1. L'équation de la trajectoire s'écrit :\n   $$y = -\\frac{g\\,x^2}{2v_0^2\\cos^2\\alpha} + (\\tan\\alpha)x = -\\frac{g\\,x^2}{2v_0^2}(1 + \\tan^2\\alpha) + x\\tan\\alpha$$\n2. En posant $X = \\tan\\alpha$, on obtient le trinôme $A\\,X^2 + B\\,X + C = 0$.\n3. Si le discriminant $\\Delta > 0$, il existe **deux angles de tir possibles** :\n   - $\\alpha_1$ (angle faible) : **tir tendu** (trajectoire rasante, durée de vol courte).\n   - $\\alpha_2$ (angle élevé) : **tir en cloche** (trajectoire haute, pour survoler des obstacles).\n4. La vitesse minimale requise pour atteindre la cible correspond à $\\Delta = 0$ :\n   $$v_{0,\\min} = \\sqrt{g(y_C + OC)} \\quad \\text{avec } OC = \\sqrt{x_C^2 + y_C^2}$$",
      wolof:
        "« Boo bëggee toucher cible $C(x_C, y_C)$, soppil $\\frac{1}{\\cos^2\\alpha}$ mu nekk $1 + \\tan^2\\alpha$ ! Danga am trinôme du second degré en $X = \\tan\\alpha$. Su $\\Delta > 0$, am nga ñaari angles : tir tendu (dafa fés ci suuf) ak tir en cloche (dafa kawé lool) ! »",
      piege:
        "Bien calculer la racine carrée de $\\Delta$ et ne pas oublier d'appliquer $\\arctan$ sur les racines $X_1$ et $X_2$ pour obtenir les angles en degrés $\\alpha_1$ et $\\alpha_2$ !",
    },
  ];

  const current = REFLEXES[activeTab];

  return (
    <div className="bg-white rounded-3xl border border-navy/10 p-5 sm:p-7 shadow-sm space-y-6">
      {/* En-tête */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-turquoise-light text-turquoise">
            <Crosshair className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-xl font-bold text-navy">
              Fiches Réflexes Bac S2 — P3 : Mouvement d&apos;un Projectile dans le Champ de Pesanteur
            </h3>
            <p className="text-xs text-text/60">
              6 réflexes incontournables et rigoureux pour maîtriser la trajectoire parabolique, la flèche, la portée et le tir sur cible au Baccalauréat sénégalais.
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
            <div className="flex items-center gap-1.5 mb-1">
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                activeTab === idx ? 'bg-white/20 text-white' : 'bg-navy/10 text-navy'
              }`}>
                {r.num}
              </span>
              <span className="truncate">{r.badge}</span>
            </div>
            <div className="text-[11px] font-normal truncate opacity-90">{r.title}</div>
          </button>
        ))}
      </div>

      {/* Contenu du réflexe actif */}
      <div className="space-y-5 animate-in fade-in duration-300">
        {/* Titre et Formule clé */}
        <div className="bg-gradient-to-r from-navy/5 via-turquoise/5 to-transparent p-4 sm:p-5 rounded-2xl border border-navy/10">
          <div className="flex items-center gap-2 mb-2">
            <Target className="w-5 h-5 text-turquoise" />
            <h4 className="text-base font-bold text-navy">
              Réflexe #{current.num} : {current.title}
            </h4>
          </div>
          <div className="my-3 py-2 px-3 bg-white rounded-xl border border-navy/10 text-center">
            <MathRenderer content={`$$${current.formule}$$`} />
          </div>
          <p className="text-xs text-text/80 font-medium leading-relaxed">
            {current.regleBac}
          </p>
        </div>

        {/* Explication détaillée pas à pas */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-navy font-bold text-sm">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Démonstration &amp; Démarche Pas à Pas Conforme au Bac S2</span>
          </div>
          <div className="bg-surface/60 rounded-2xl p-4 sm:p-5 border border-navy/10 text-xs sm:text-sm text-text leading-relaxed">
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
            <p className="text-amber-950/90 leading-relaxed font-medium">
              {current.wolof}
            </p>
          </div>

          {/* Piège classique du Bac */}
          <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs sm:text-sm space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-rose-800">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Piège Éliminatoire au Baccalauréat</span>
            </div>
            <p className="text-rose-950/90 leading-relaxed">
              {current.piege}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
