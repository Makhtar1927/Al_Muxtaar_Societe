'use client';

import React, { useState } from 'react';
import StudyIcon from '@/components/ui/study-icon';
import MathRenderer from '@/components/course/math-renderer';

const PRIMITIVES_METHODES = [
  {
    num: 1,
    title: "Primitives Composées & Ajustement de Constante",
    icon: 'formule_cle' as const,
    when: "Pour trouver une primitive immédiate sans passer par l'intégration par parties",
    formule: `**Les 4 formes maîtresses du Bac S2 :**

1. **$\\dfrac{u'}{u} \\implies \\ln|u| + k$**
   Exemple : $f(x) = \\dfrac{x}{x^2 + 1} = \\dfrac{1}{2} \\cdot \\dfrac{2x}{x^2 + 1} \\implies F(x) = \\dfrac{1}{2}\\ln(x^2 + 1) + k$

2. **$u' \\cdot e^u \\implies e^u + k$**
   Exemple : $f(x) = x e^{-x^2} = -\\dfrac{1}{2}(-2x e^{-x^2}) \\implies F(x) = -\\dfrac{1}{2}e^{-x^2} + k$

3. **$u' \\cdot u^n \\implies \\dfrac{u^{n+1}}{n+1} + k \\quad (n \\neq -1)$**
   Exemple : $f(x) = (2x + 1)(x^2 + x)^3 \\implies F(x) = \\dfrac{(x^2 + x)^4}{4} + k$

4. **$\\dfrac{u'}{\\sqrt{u}} \\implies 2\\sqrt{u} + k$**
   Exemple : $f(x) = \\dfrac{1}{\\sqrt{2x + 3}} = \\dfrac{1}{2} \\cdot \\dfrac{2}{\\sqrt{2x + 3}} \\implies F(x) = \\sqrt{2x + 3} + k$`,
    exemple: `Déterminer la primitive $F$ de $f(x) = \\dfrac{\\ln x}{x}$ sur $]0, +\\infty[$ s'annulant en $1$ :

On remarque que $f(x) = \\dfrac{1}{x} \\cdot \\ln(x) = u'(x) \\cdot [u(x)]^1$ avec $u(x) = \\ln x$.
Donc :
$$F(x) = \\dfrac{(\\ln x)^2}{2} + k$$
Condition initiale $F(1) = 0$ :
$$F(1) = \\dfrac{(\\ln 1)^2}{2} + k = 0 + k = 0 \\implies k = 0$$
L'unique primitive est : $F(x) = \\dfrac{1}{2}(\\ln x)^2$.`,
    astuce: 'N\'appliquez JAMAIS d\'intégration par parties quand la dérivée de l\'expression sous le logarithme ou sous l\'exponentielle apparaît déjà à côté ! L\'ajustement d\'une constante multiplicative prend 10 secondes.',
    wolof: '« 4 formes fondamentales : u\'/u day jox ln|u|, u\'·eᵘ day jox eᵘ, u\'·uⁿ day jox uⁿ⁺¹/(n+1). Bu constante multiplicative bi manqué (melni 1/2), dangay ko yokk ci biti ngir calcul bi leer nàññ ! »',
    vieReelle: 'Ajuster le dosage des ingrédients dans une recette : multiplier par la constante manquante (comme 1/2) pour faire apparaître la forme exacte de la formule.',
  },
  {
    num: 2,
    title: "Intégration par Parties (IPP) & Règle ALPES",
    icon: 'rigueur_compas' as const,
    when: "Dès que l'on doit intégrer un produit P(x)·ln(x) ou P(x)·eˣ",
    formule: `**Formule d'Intégration par Parties :**
$$\\int_a^b u'(x)v(x)\\,dx = \\Big[u(x)v(x)\\Big]_a^b - \\int_a^b u(x)v'(x)\\,dx$$

**La règle ALPES pour choisir $v(x)$ (celle que l'on DÉRIVE) :**
- **A** : Arc (fonctions réciproques)
- **L** : **Logarithme** (priorité absolue à poser comme $v$ !)
- **P** : **Polynôme** (se dérive pour baisser de degré)
- **E** : **Exponentielle** (se pose comme $u'$, car s'intègre facilement)
- **S** : Sinus / Cosinus`,
    exemple: `Calculer par IPP $I = \\int_0^1 (2x + 1)e^x\\,dx$ :

D'après ALPES, le **P** (Polynôme $2x+1$) passe avant le **E** (Exponentielle $e^x$). On pose :
- $v(x) = 2x + 1 \\implies v'(x) = 2$
- $u'(x) = e^x \\implies u(x) = e^x$

Les fonctions $u$ et $v$ sont dérivables à dérivées continues sur $[0, 1]$. Par IPP :
$$I = \\Big[(2x + 1)e^x\\Big]_0^1 - \\int_0^1 2e^x\\,dx = \\Big(3e^1 - 1e^0\\Big) - \\Big[2e^x\\Big]_0^1$$
$$I = (3e - 1) - (2e - 2) = 3e - 1 - 2e + 2 = e + 1$$`,
    astuce: 'Rédaction obligatoire au Bac S2 : n\'oubliez jamais de mentionner la phrase clé : « Les fonctions u et v sont dérivables et leurs dérivées sont continues sur [a, b] » sous peine de perdre un demi-point.',
    wolof: '« Ci Intégration par parties, ALPES moo lay jox ordre bi : Logarithme (L) moo jëkk Polynôme (P), Polynôme moo jëkk Exponentielle (E). Ki jëkk ci ALPES mooy ki ngay poser v(x) ngir dériver ko ! »',
    vieReelle: 'Choisir les priorités dans un atelier : transformer d\'abord la pièce la plus complexe (ln x qui devient 1/x) pour rendre tout le reste de la fabrication immédiat.',
  },
  {
    num: 3,
    title: "Calcul d'Aires & Unité Graphique en cm²",
    icon: 'technique_outils' as const,
    when: "À la dernière question du grand problème d'analyse pour calculer l'aire d'un domaine",
    formule: `**Définition de l'Unité d'Aire (u.a.) :**
Soit un repère orthogonal $(O; \\vec{i}, \\vec{j})$ d'unités $d_x = \\|\\vec{i}\\|$ et $d_y = \\|\\vec{j}\\|$ en centimètres :
$$1\\text{ u.a.} = \\|\\vec{i}\\| \\times \\|\\vec{j}\\|\\text{ cm}^2$$

**Calcul de l'Aire $\\mathcal{A}$ en $\\text{cm}^2$ :**
- **Sous une courbe positive :** $\\mathcal{A} = \\left(\\int_a^b f(x)\\,dx\\right) \\times 1\\text{ u.a.}$
- **Entre deux courbes $\\mathcal{C}_f$ et $\\mathcal{C}_g$ ($f \\ge g$) :**
  $$\\mathcal{A} = \\left(\\int_a^b \\big(f(x) - g(x)\\big)\\,dx\\right) \\times \\|\\vec{i}\\| \\times \\|\\vec{j}\\|\\text{ cm}^2$$
- **Entre $\\mathcal{C}_f$ et son asymptote oblique $y = ax + b$ :**
  $$\\mathcal{A} = \\left(\\int_a^b |f(x) - (ax + b)|\\,dx\\right) \\times 1\\text{ u.a.}$$`,
    exemple: `Soit $f(x) = e^{-x}$. On considère le domaine délimité par $\\mathcal{C}_f$, l'axe $Ox$ et les droites $x = 0$ et $x = 2$.
L'unité graphique est de $3\\text{ cm}$ sur $Ox$ et $2\\text{ cm}$ sur $Oy$.

1. *Unité d'aire :* $1\\text{ u.a.} = 3\\text{ cm} \\times 2\\text{ cm} = 6\\text{ cm}^2$.
2. *Intégrale en u.a. :*
   $$I = \\int_0^2 e^{-x}\\,dx = \\Big[-e^{-x}\\Big]_0^2 = -e^{-2} - (-e^0) = 1 - e^{-2}\\text{ u.a.}$$
3. *Aire réelle en $\\text{cm}^2$ :*
   $$\\mathcal{A} = 6(1 - e^{-2}) = 6 - \\dfrac{6}{e^2}\\text{ cm}^2 \\approx 5{,}19\\text{ cm}^2$$`,
    astuce: 'Attention au signe : une aire est TOUJOURS strictement positive ! Si votre intégrale donne un résultat négatif, c\'est que votre courbe était située sous l\'axe Ox : l\'aire vaut alors -int_a^b f(x) dx.',
    wolof: '« Natt yaatuwaay (Aire) ci cm² : bu la examinateur waxee unité bi ci repère bi, dangay faf intégrale bi ak yaatuwaayu carreau bi (ǁiǁ × ǁjǁ cm²). Bu la fatte loolu ndax foofu lañuy wàññee points ! »',
    vieReelle: 'Acheter du tissu au marché HLM : multiplier le nombre de carreaux trouvés par la superficie réelle en centimètres carrés de chaque carreau repère.',
  },
  {
    num: 4,
    title: "Relation de Chasles & Valeur Moyenne",
    icon: 'cible_reflexe' as const,
    when: "Pour intégrer une fonction avec valeur absolue ou calculer la valeur moyenne d'une fonction",
    formule: `**Relation de Chasles :**
Pour tous réels $a, b, c$ de l'intervalle d'intégration :
$$\\int_a^c f(x)\\,dx = \\int_a^b f(x)\\,dx + \\int_b^c f(x)\\,dx$$

**Valeur Moyenne d'une fonction continue sur $[a, b]$ ($a < b$) :**
$$\\mu = \\dfrac{1}{b - a} \\int_a^b f(x)\\,dx$$

**Inégalité de la Moyenne :**
Si pour tout $x \\in [a, b]$, on a $m \\le f(x) \\le M$, alors :
$$m(b - a) \\le \\int_a^b f(x)\\,dx \\le M(b - a) \\iff m \\le \\mu \\le M$$`,
    exemple: `Calculer $J = \\int_{-1}^2 |x|\\,dx$ :

La valeur absolue change d'expression en $0$ :
- Si $x \\le 0$, $|x| = -x$.
- Si $x \\ge 0$, $|x| = x$.

Par la relation de Chasles en coupant en $0$ :
$$J = \\int_{-1}^0 (-x)\\,dx + \\int_0^2 x\\,dx = \\left[-\\dfrac{x^2}{2}\\right]_{-1}^0 + \\left[\\dfrac{x^2}{2}\\right]_0^2$$
$$J = \\left(0 - \\left(-\\dfrac{1}{2}\\right)\\right) + \\left(\\dfrac{4}{2} - 0\\right) = \\dfrac{1}{2} + 2 = \\dfrac{5}{2}$$`,
    astuce: 'Interprétation géométrique de J : c\'est la somme des aires de deux triangles rectangles isocèles de côtés 1 et 2 -> (1x1)/2 + (2x2)/2 = 0.5 + 2 = 2.5 ! Un moyen instantané de vérifier votre calcul.',
    wolof: '« Relation de Chasles dafa melni yoon wu am escale : ∫ₐᶜ = ∫ₐᵇ + ∫ᵦᶜ. Dafa am solo lool ci valeur absolue |x| ndax dangay xaaj yoon bi ci 0 : ci wetu négatif nga def -x, ci wetu positif nga def +x ! »',
    vieReelle: 'Un trajet Dakar - Thiès - Saint-Louis : calculer la distance globale en additionnant celle du premier tronçon à celle du second.',
  },
];

export default function PrimitivesReflexesCard() {
  const [activeTab, setActiveTab] = useState(0);
  const current = PRIMITIVES_METHODES[activeTab];

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
              Fiches Réflexes Bac S2 : Primitives &amp; Calcul Intégral
            </h3>
            <p className="text-xs text-text/60 mt-1 leading-snug">
              Les 4 automatismes indispensables pour réussir l&apos;exercice d&apos;intégration et calcul d&apos;aires
            </p>
          </div>
        </div>
        <span className="self-start sm:self-center text-xs font-semibold px-2.5 py-1 rounded-full bg-navy/5 text-navy border border-navy/10 shrink-0 whitespace-nowrap">
          Méthode {activeTab + 1} / {PRIMITIVES_METHODES.length}
        </span>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {PRIMITIVES_METHODES.map((m, idx) => {
          const isActive = activeTab === idx;
          return (
            <button
              key={m.num}
              onClick={() => setActiveTab(idx)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 ${
                isActive
                  ? 'border-turquoise bg-turquoise/10 shadow-sm'
                  : 'border-navy/10 bg-surface hover:border-turquoise/40 hover:bg-turquoise/5'
              }`}
            >
              <div className="flex items-center justify-between">
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
            <span className="text-[11px] font-bold uppercase tracking-wider text-turquoise">
              Quand dégainer ce réflexe ?
            </span>
            <p className="text-sm font-semibold text-navy mt-0.5">
              {current.when}
            </p>
          </div>
        </div>

        {/* Formule cle */}
        <div className="bg-white rounded-xl p-4 border border-navy/10 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-navy uppercase tracking-wider">
            <StudyIcon name="formule_cle" size={16} className="text-turquoise" />
            <span>Formules et Démarches Mathématiques</span>
          </div>
          <div className="text-sm text-text/80 overflow-x-auto py-1">
            <MathRenderer content={current.formule} />
          </div>
        </div>

        {/* Exemple type Bac */}
        <div className="bg-white rounded-xl p-4 border border-navy/10 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-navy uppercase tracking-wider">
            <StudyIcon name="exemple_loupe" size={16} className="text-navy/70" />
            <span>Exemple Rédigé Type Baccalauréat Sénégalais</span>
          </div>
          <div className="text-sm text-text/80 overflow-x-auto py-1">
            <MathRenderer content={current.exemple} />
          </div>
        </div>

        {/* Conseil / Astuce prof */}
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3.5 flex items-start gap-3">
          <div className="w-6 h-6 rounded-md bg-amber-500/20 flex items-center justify-center text-amber-700 shrink-0 mt-0.5">
            <StudyIcon name="conseil_professeur" size={16} />
          </div>
          <div className="text-xs text-amber-900 leading-relaxed">
            <span className="font-bold">Conseil du Correcteur Bac : </span>
            {current.astuce}
          </div>
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

