'use client';

import React, { useState } from 'react';
import StudyIcon from '@/components/ui/study-icon';
import MathRenderer from '@/components/course/math-renderer';

const COMPLEXES_METHODES = [
  {
    num: 1,
    title: "Passage Algébrique ↔ Trigonométrique ↔ Exponentiel",
    icon: 'theoreme_equerre' as const,
    when: "Pour simplifier des puissances (Moivre), des quotients d'affixes ou déterminer un argument",
    formule: `**Algorithme en 3 étapes pour $z = a + ib$ ($z \\neq 0$) :**

1. **Calcul du module $r = |z|$ :**
   $$r = \\sqrt{a^2 + b^2} > 0$$
2. **Recherche de l'argument principal $\\theta \\in ]-\\pi, \\pi]$ :**
   $$\\cos\\theta = \\dfrac{a}{r} \\qquad \\sin\\theta = \\dfrac{b}{r}$$
3. **Écritures fondamentales :**
   $$z = r(\\cos\\theta + i\\sin\\theta) = r e^{i\\theta}$$

**Règle d'or de calcul des puissances :**
$$z^n = (r e^{i\\theta})^n = r^n e^{i n\\theta} = r^n\\big(\\cos(n\\theta) + i\\sin(n\\theta)\\big)$$`,
    exemple: `Mettre sous forme exponentielle $z = 1 - i\\sqrt{3}$ et calculer $z^6$ :

1. Module : $|z| = \\sqrt{1^2 + (-\\sqrt{3})^2} = \\sqrt{1 + 3} = \\sqrt{4} = 2$.
2. Argument $\\theta$ :
   $$\\cos\\theta = \\dfrac{1}{2} \\qquad \\sin\\theta = -\\dfrac{\\sqrt{3}}{2} \\implies \\theta = -\\dfrac{\\pi}{3} \\pmod{2\\pi}$$
3. Forme exponentielle : $z = 2 e^{-i\\frac{\\pi}{3}}$.
4. Puissance $z^6$ par la formule de Moivre :
   $$z^6 = \\left(2 e^{-i\\frac{\\pi}{3}}\\right)^6 = 2^6 \\cdot e^{-i \\frac{6\\pi}{3}} = 64 \\cdot e^{-i 2\\pi} = 64(1) = 64$$
Le résultat est un nombre réel positif !`,
    astuce: 'Pour reconnaître immédiatement les angles remarquables : si le √3 est devant le "i", l\'angle est en ±π/3. Si le √3 est sur la partie réelle, l\'angle est en ±π/6.',
    wolof: '« Soppiku ci forme trigonométrique dafa melni xam fànn bi nga jëm ci boussole ak soréwaay bi ci géej gi : r mooy module bi, θ mooy cap bi. Bu la examinateur joxee puissance zⁿ, Moivre da lay may nga yokk soréwaay bi rⁿ te wër boussole bi n·θ yoon ! »',
    vieReelle: 'Pensez aux pêcheurs artisanaux de Soumbédioune qui naviguent la nuit : au lieu de repérer un cap en coordonnées GPS compliquées (x, y), ils utilisent la distance en kilomètres au phare des Mamelles (module r) et l\'angle de leur boussole (argument θ). Calculer z^6, c\'est comme multiplier la distance et répéter l\'angle 6 fois !',
  },
  {
    num: 2,
    title: "Quotient d'Affixes & Nature des Triangles",
    icon: 'rigueur_compas' as const,
    when: "Pour démontrer qu'un triangle est rectangle, isocèle, équilatéral ou que des points sont alignés",
    formule: `**Le quotient maître : $Q = \\dfrac{z_C - z_A}{z_B - z_A}$**

- **Module :** $|Q| = \\dfrac{|z_C - z_A|}{|z_B - z_A|} = \\dfrac{AC}{AB}$
- **Argument :** $\\arg(Q) = (\\vec{AB}, \\vec{AC}) \\pmod{2\\pi}$

**Les 4 conclusions immédiates au Bac S2 :**
1. **$Q = \\pm i = e^{\\pm i\\frac{\\pi}{2}}$ :**
   $|Q| = 1 \\implies AB = AC$ et $\\arg(Q) = \\pm\\frac{\\pi}{2} \\implies (AB) \\perp (AC)$.
   $\\implies$ **Triangle $ABC$ rectangle et isocèle en $A$**.
2. **$Q = e^{\\pm i\\frac{\\pi}{3}} = \\frac{1}{2} \\pm i\\frac{\\sqrt{3}}{2}$ :**
   $|Q| = 1$ et angle de $\\pm\\frac{\\pi}{3} \\implies$ **Triangle $ABC$ équilatéral**.
3. **$Q \\in \\mathbb{R}$ (réel) :** $\\arg(Q) = 0$ ou $\\pi \\implies$ **Points $A, B, C$ alignés**.
4. **$Q \\in i\\mathbb{R}$ (imaginaire pur) :** $\\implies (AB) \\perp (AC)$ (**Triangle rectangle en $A$**).`,
    exemple: `Soient les points $A(1 + i)$, $B(3 - i)$ et $C(2 + 2i)$. Déterminer la nature de $ABC$ :

Calculons le quotient :
$$Q = \\dfrac{z_C - z_A}{z_B - z_A} = \\dfrac{(2 + 2i) - (1 + i)}{(3 - i) - (1 + i)} = \\dfrac{1 + i}{2 - 2i} = \\dfrac{1+i}{2(1-i)}$$
En multipliant par le conjugué $(1+i)$ :
$$Q = \\dfrac{(1+i)^2}{2(1^2 + (-1)^2)} = \\dfrac{1 + 2i - 1}{4} = \\dfrac{2i}{4} = \\dfrac{1}{2}i$$

- $\\arg(Q) = \\arg\\left(\\frac{1}{2}i\\right) = \\frac{\\pi}{2} \\implies (\\vec{AB}, \\vec{AC}) = \\frac{\\pi}{2}$.
Conclusion : Le triangle $ABC$ est **rectangle en $A$**, avec $AC = \\frac{1}{2}AB$.`,
    astuce: 'Pour simplifier un quotient d\'affixes sans erreur de calcul, factorisez toujours les constantes communes avant de multiplier par l\'expression conjuguée.',
    wolof: '« Quotient d\'affixes Q = (z_C - z_A)/(z_B - z_A) mooy xool diggante ñaari yoon yi : module |Q| mooy ratio guddaayu AC ak AB, te argument arg(Q) mooy angle bi leen séddale. Bu Q doonee ±i, kon angle bi 90° la te guddaay yi yem nañu (rectangle isocèle) ! »',
    vieReelle: 'Comme un géomètre traçant les fondations d\'une villa aux Almadies : pour vérifier qu\'un coin est parfaitement d\'équerre et que les deux façades mesurent exactement la même longueur, il vérifie que le rapport complexe vaut i ou -i. L\'argument donne l\'équerre (π/2) et le module confirme l\'égalité des murs.',
  },
  {
    num: 3,
    title: "Équations dans ℂ & Racines Carrées",
    icon: 'technique_outils' as const,
    when: "Dès que l'on doit résoudre une équation du second degré az² + bz + c = 0 ou trouver les racines carrées d'un nombre complexe",
    formule: `**1. Discriminant complexe $\\Delta = b^2 - 4ac$ :**
Si les coefficients sont réels et $\\Delta < 0$, alors $\\sqrt{\\Delta} = i\\sqrt{|\\Delta|}$ :
$$z_1 = \\dfrac{-b - i\\sqrt{|\\Delta|}}{2a} \\qquad z_2 = \\overline{z_1} = \\dfrac{-b + i\\sqrt{|\\Delta|}}{2a}$$

**2. Système d'identification des racines carrées de $Z = X + iY$ ($z = x + iy$) :**
$$\\begin{cases}
x^2 - y^2 = X & (\\text{Partie réelle de } z^2) \\\\
x^2 + y^2 = \\sqrt{X^2 + Y^2} & (\\text{Module } |z|^2 = |Z|) \\\\
2xy = Y & (\\text{Signe du produit } xy)
\\end{cases}$$`,
    exemple: `Déterminer les racines carrées de $Z = 3 + 4i$ :

Posons $z = x + iy$. Le système s'écrit :
1. $x^2 - y^2 = 3$
2. $x^2 + y^2 = \\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$
3. $2xy = 4 > 0 \\implies x$ et $y$ sont de **même signe**.

Par addition : $2x^2 = 8 \\implies x^2 = 4 \\implies x = \\pm 2$.
Par soustraction : $2y^2 = 2 \\implies y^2 = 1 \\implies y = \\pm 1$.
Comme $xy > 0$, les deux racines carrées sont :
$$\\delta_1 = 2 + i \\qquad \\delta_2 = -2 - i = -\\delta_1$$`,
    astuce: 'Vérifiez toujours votre racine carrée en la développant au brouillon : (2 + i)² = 4 + 4i - 1 = 3 + 4i ! Cela garantit 100% des points au Bac.',
    wolof: '« Équation du 2nd degré ak racine carrée d\'un complexe Z = X + iY dafay tëjoo ci ñetti équation yu leer : x² - y² = X (partie réelle), x² + y² = |Z| (module), ak 2xy = Y (signe). Boo leen boolee, x ak y dañuy génn bu leer nàññ ! »',
    vieReelle: 'Trouver la racine carrée d\'un complexe, c\'est comme retrouver les deux forces perpendiculaires (courant marin et vent d\'alizé) qui ont propulsé un voilier jusqu\'à sa destination Z. Le système x²-y² et x²+y² isole séparément l\'effet du vent et du courant.',
  },
  {
    num: 4,
    title: "Écritures Complexes des Transformations (Similitudes)",
    icon: 'cle_solution' as const,
    when: "Dès qu'une question demande de caractériser une similitude directe z' = az + b ou de trouver son centre, rapport et angle",
    formule: `**Forme générale de la Similitude Directe :**
$$z' = az + b \\quad (a \\in \\mathbb{C}^*, b \\in \\mathbb{C})$$

- **Si $a = 1$ :** **Translation** de vecteur $\\vec{u}$ d'affixe $b$.
- **Si $a \\in \\mathbb{R}^* \\setminus \\{1\\}$ :** **Homothétie** de rapport $k = a$ et de centre $\\Omega\\left(\\frac{b}{1-a}\\right)$.
- **Si $|a| = 1$ ($a = e^{i\\theta}, \\theta \\neq 0$) :** **Rotation** d'angle $\\theta = \\arg(a)$ et de centre $\\Omega\\left(\\frac{b}{1-a}\\right)$.
- **Cas général ($a = k e^{i\\theta}$ avec $k \\neq 1$) :**
  - **Centre invariant $\\Omega$ :** $\\omega = \\dfrac{b}{1 - a}$
  - **Rapport :** $k = |a| > 0$
  - **Angle :** $\\theta = \\arg(a) \\pmod{2\\pi}$`,
    exemple: `Soit la transformation $S$ d'écriture complexe $z' = (1 + i\\sqrt{3})z + 2 - 2i\\sqrt{3}$. Déterminer sa nature et ses éléments caractéristiques :

1. Ici $a = 1 + i\\sqrt{3}$ et $b = 2 - 2i\\sqrt{3}$.
2. Rapport de la similitude :
   $$k = |a| = \\sqrt{1^2 + (\\sqrt{3})^2} = \\sqrt{4} = 2$$
3. Angle de la similitude :
   $$\\cos\\theta = \\dfrac{1}{2}, \\; \\sin\\theta = \\dfrac{\\sqrt{3}}{2} \\implies \\theta = \\dfrac{\\pi}{3} \\pmod{2\\pi}$$
4. Centre invariant $\\Omega(\\omega)$ :
   $$\\omega = \\dfrac{b}{1 - a} = \\dfrac{2 - 2i\\sqrt{3}}{1 - (1 + i\\sqrt{3})} = \\dfrac{2 - 2i\\sqrt{3}}{-i\\sqrt{3}} = \\dfrac{2}{-i\\sqrt{3}} + 2 = \\dfrac{2i}{\\sqrt{3}} + 2 = 2 + \\dfrac{2\\sqrt{3}}{3}i$$
Conclusion : $S$ est la similitude directe de centre $\\Omega$, de rapport $2$ et d'angle $\\frac{\\pi}{3}$.`,
    astuce: 'Pour trouver le centre invariant, posez toujours l\'équation de point fixe z = az + b ⟺ z(1 - a) = b ⟺ z = b / (1 - a).',
    wolof: '« Similitude directe z\' = az + b dafa am ñetti batayel yu am solo : centre invariant Ω = b/(1-a) mooy bérab bu dul yéngu, rapport k = |a| mooy yaatal gi walla waññi gi, te angle θ = arg(a) mooy wërlu gi ! »',
    vieReelle: 'Pensez au plan de développement urbain de Diamniadio projeté sur maquette : la similitude directe reproduit la cité à l\'échelle (rapport k = |a|), en lui appliquant une rotation d\'orientation par rapport au Nord (angle θ = arg(a)) autour du point repère central de la ville (centre Ω).',
  },
];

export default function ComplexesReflexesCard() {
  const [activeTab, setActiveTab] = useState(0);
  const current = COMPLEXES_METHODES[activeTab];

  return (
    <div className="bg-white rounded-2xl border border-navy/10 p-5 sm:p-6 shadow-sm space-y-6">
      {/* Header Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy/10 pb-4">
        <div className="flex items-start sm:items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-turquoise/15 flex items-center justify-center text-turquoise shrink-0 mt-0.5 sm:mt-0 p-1.5">
            <StudyIcon name="theoreme_equerre" size={24} />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-navy text-base sm:text-lg leading-tight break-words">
              Fiches Réflexes Bac S2 : Nombres Complexes
            </h3>
            <p className="text-xs text-text/60 mt-1 leading-snug">
              Les 4 automatismes indispensables pour réussir l&apos;exercice d&apos;algèbre et de géométrie
            </p>
          </div>
        </div>
        <span className="self-start sm:self-center text-xs font-semibold px-2.5 py-1 rounded-full bg-navy/5 text-navy border border-navy/10 shrink-0 whitespace-nowrap">
          Méthode {activeTab + 1} / {COMPLEXES_METHODES.length}
        </span>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {COMPLEXES_METHODES.map((m, idx) => {
          const isActive = activeTab === idx;
          return (
            <button
              key={m.num}
              onClick={() => setActiveTab(idx)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 ${
                isActive
                  ? 'border-turquoise bg-turquoise/10 shadow-sm'
                  : 'border-navy/10 hover:border-navy/20 bg-surface/50'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-turquoise text-white' : 'bg-navy/10 text-navy/70'
                  }`}
                >
                  R{m.num}
                </span>
                <StudyIcon
                  name={m.icon}
                  size={16}
                  className={isActive ? 'text-turquoise' : 'text-text/40'}
                />
              </div>
              <p
                className={`text-xs font-bold leading-snug line-clamp-2 ${
                  isActive ? 'text-navy' : 'text-text/80'
                }`}
              >
                {m.title}
              </p>
            </button>
          );
        })}
      </div>

      {/* Content panel */}
      <div className="space-y-4 bg-surface rounded-xl p-5 border border-navy/5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-navy/10 flex items-center justify-center text-navy shrink-0 mt-0.5">
            <StudyIcon name="cible_reflexe" size={18} />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-text/50">
              Quand l&apos;appliquer au Bac ?
            </h4>
            <p className="text-sm font-medium text-navy mt-0.5">{current.when}</p>
          </div>
        </div>

        {/* Formula Box */}
        <div className="bg-white rounded-xl p-4 border border-navy/10 shadow-sm">
          <h4 className="text-xs font-bold uppercase tracking-wider text-turquoise mb-2 flex items-center gap-1.5">
            <StudyIcon name="formule_cle" size={16} />
            Formule &amp; Règle d&apos;or de rédaction
          </h4>
          <div className="text-sm text-navy/90 leading-relaxed overflow-x-auto">
            <MathRenderer content={current.formule} />
          </div>
        </div>

        {/* Example Box */}
        <div className="bg-white rounded-xl p-4 border border-navy/10 shadow-sm">
          <h4 className="text-xs font-bold uppercase tracking-wider text-navy mb-2 flex items-center gap-1.5">
            <StudyIcon name="exercice_crayon" size={16} />
            Exemple type corrigé pas à pas
          </h4>
          <div className="text-sm text-navy/90 leading-relaxed overflow-x-auto">
            <MathRenderer content={current.exemple} />
          </div>
        </div>

        {/* Exam Tip */}
        <div className="bg-amber-50 rounded-xl p-3.5 border border-amber-200/80 flex items-start gap-2.5">
          <div className="shrink-0 mt-0.5">
            <StudyIcon name="ampoule_astuce" size={18} className="text-amber-600" />
          </div>
          <p className="text-xs text-amber-900 leading-relaxed font-medium">
            <strong className="font-bold">Conseil du Correcteur Bac :</strong> {current.astuce}
          </p>
        </div>

        {/* Décodage en Wolof */}
        <div className="bg-amber-500/10 rounded-xl p-3 border border-amber-500/25 text-xs text-amber-950">
          <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
            <span>🇸🇳</span>
            <span>Xam-xam ci Wolof (Décodage) :</span>
          </div>
          <p className="italic text-amber-900 leading-relaxed font-medium">
            {current.wolof}
          </p>
        </div>

        {/* Illustration de la Vie Réelle */}
        <div className="bg-indigo-50/90 rounded-xl p-3 border border-indigo-200 text-xs text-indigo-950">
          <div className="flex items-center gap-1.5 font-bold text-indigo-900 mb-1">
            <span>🌍</span>
            <span>Illustration Concrète au Sénégal :</span>
          </div>
          <p className="text-indigo-900 leading-relaxed">
            {current.vieReelle}
          </p>
        </div>
      </div>
    </div>
  );
}

