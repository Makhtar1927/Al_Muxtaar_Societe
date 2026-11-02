'use client';

import React, { useState } from 'react';
import StudyIcon from '@/components/ui/study-icon';
import MathRenderer from '@/components/course/math-renderer';

const EXPONENTIELLE_METHODES = [
  {
    num: 1,
    title: "Stricte Positivité eᵘ > 0 & Signe de Dérivée",
    icon: 'rigueur_compas' as const,
    when: "Pour justifier le signe d'une dérivée ou repérer une équation impossible",
    formule: `**La règle d'or absolue au Bac S2 :**
Pour TOUT réel $x$ et pour TOUTE fonction $u(x)$ :
$$e^{u(x)} > 0$$

- $e^x$ ne peut **JAMAIS** être négatif, ni égal à $0$.
- L'équation $e^x = -5$ n'a **aucune solution** dans $\\mathbb{R}$ ($S = \\emptyset$).
- Si $f'(x) = P(x) \\cdot e^{u(x)}$, alors comme $e^{u(x)} > 0$ :
  $$\\operatorname{signe}\\left(f'(x)\\right) = \\operatorname{signe}\\left(P(x)\\right)$$`,
    exemple: `Soit $f(x) = (x^2 - 3x + 2)e^{-x}$.
Déterminer le signe de $f'(x)$ :

$$f'(x) = (2x - 3)e^{-x} + (x^2 - 3x + 2)(-e^{-x}) = (-x^2 + 5x - 5)e^{-x}$$

*Rédaction Bac :*
« Pour tout $x \\in \\mathbb{R}$, $e^{-x} > 0$. Par conséquent, $f'(x)$ a exactement le même signe que le trinôme $-x^2 + 5x - 5$. »
$\\Delta = 25 - 20 = 5 > 0$. Le trinôme est positif entre ses racines et négatif à l'extérieur.`,
    astuce: 'N\'écrivez JAMAIS dans un tableau de signes une ligne où e^x s\'annule ou change de signe. e^x a TOUJOURS le signe « + » de -infini à +infini !',
    wolof: '« Règle d\'or bi am solo lool : eᵘ(ˣ) > 0 saa su nekk ! Mënul doon zéro te mënul négatif muk. Boo amee f\'(x) = P(x) · eˣ, signe bi ci P(x) rekk lay dellu ! »',
    vieReelle: 'La lumière du soleil en plein midi : l\'énergie reçue est strictement positive, il n\'y a pas d\'énergie négative. eˣ ne fait qu\'amplifier sans jamais altérer le signe.',
  },
  {
    num: 2,
    title: "Changement de Variable X = eˣ dans les Équations",
    icon: 'technique_outils' as const,
    when: "Dès que vous rencontrez une équation du second degré avec des puissances de eˣ (ex: e²ˣ, eˣ)",
    formule: `**Méthode en 4 étapes pour $a e^{2x} + b e^x + c = 0$ :**

1. **Poser le changement de variable :**
   $$X = e^x \\quad \\text{avec la condition impérative } X > 0$$
2. **Résoudre l'équation polynomiale :**
   $$aX^2 + bX + c = 0$$
3. **Filtrer les racines :**
   - Si $X_k \\le 0$, la racine est **rejetée** (car $e^x > 0$).
   - Si $X_k > 0$, la racine est **retenue**.
4. **Revenir à la variable $x$ :**
   $$X_k = e^x \\iff x = \\ln(X_k)$$`,
    exemple: `Résoudre dans $\\mathbb{R}$ l'équation $e^{2x} - 3e^x - 4 = 0$ :

1. En posant $X = e^x$ avec $X > 0$, l'équation devient $X^2 - 3X - 4 = 0$.
2. $\\Delta = 9 - 4(1)(-4) = 25 = 5^2$.
   $$X_1 = \\dfrac{3 - 5}{2} = -1 \\qquad X_2 = \\dfrac{3 + 5}{2} = 4$$
3. Comme $X > 0$, la racine $X_1 = -1$ est **impossible**. On ne garde que $X_2 = 4$.
4. $e^x = 4 \\iff x = \\ln(4) = 2\\ln(2)$.
   L'ensemble des solutions est : $S = \\{2\\ln 2\\}$.`,
    astuce: 'Piège d\'examinateur : si un élève écrit x = ln(-1), il perd immédiatement les points ! ln n\'est défini que pour les nombres STRICTEMENT positifs.',
    wolof: '« Boo gisee e²ˣ ak eˣ, dangay poser X = eˣ te wax ne X > 0. Boo résoudree trinôme bi, bépp racine bu négatif walla bu zéro dangay ko rejeté (naguñ ko) ! Racines yu positif yi rekk ngay jël nga def x = ln(X). »',
    vieReelle: 'Changer de monnaie pour un achat : on convertit en monnaie temporaire X, on résout le marché, on élimine les montants absurdes négatifs, puis on revient à la monnaie d\'origine x.',
  },
  {
    num: 3,
    title: "Croissances Comparées & Levée d'Indéterminations",
    icon: 'formule_cle' as const,
    when: "Pour calculer les limites à l'infini avec des formes 'infini - infini' ou 'infini / infini'",
    formule: `**Les 4 limites maîtresses du Bac S2 :**

1. **En +∞ (l'exponentielle écrase tout polynôme) :**
   $$\\lim_{x \\to +\\infty} \\dfrac{e^x}{x^n} = +\\infty \\qquad \\lim_{x \\to +\\infty} \\dfrac{x^n}{e^x} = 0 \\quad (n > 0)$$

2. **En -∞ (l'exponentielle attire vers 0) :**
   $$\\lim_{x \\to -\\infty} e^x = 0^+ \\qquad \\lim_{x \\to -\\infty} x^n e^x = 0 \\quad (n > 0)$$

3. **Taux de variation en 0 :**
   $$\\lim_{x \\to 0} \\dfrac{e^x - 1}{x} = 1$$`,
    exemple: `Calculer $\\lim_{x \\to +\\infty} (x^2 - e^x)$ :

Il s'agit d'une forme indéterminée « $+\\infty - \\infty$ ».
On met le terme prépondérant $e^x$ en facteur commun :
$$x^2 - e^x = e^x \\left(\\dfrac{x^2}{e^x} - 1\\right)$$

Or par croissances comparées, $\\lim_{x \\to +\\infty} \\dfrac{x^2}{e^x} = 0$.
Donc :
$$\\lim_{x \\to +\\infty} \\left(\\dfrac{x^2}{e^x} - 1\\right) = -1$$
Comme $\\lim_{x \\to +\\infty} e^x = +\\infty$, par produit :
$$\\lim_{x \\to +\\infty} (x^2 - e^x) = +\\infty \\times (-1) = -\\infty$$`,
    astuce: 'Pour les limites en -infini, posez souvent le changement de variable t = -x -> +infini : lim_{x -> -inf} x e^x = lim_{t -> +inf} (-t) e^{-t} = lim_{t -> +inf} -t / e^t = 0.',
    wolof: '« Croissances comparées ci +∞ : eˣ moo ëpp doole bépp xⁿ. Boo gisee forma indéterminée ∞ - ∞, dangay factorisé par eˣ bu gawaan ba réponse bi génn ! »',
    vieReelle: 'Une fusée spatiale (eˣ) qui dépasse un camion de marchandises (xⁿ) : à très haute altitude, la vitesse du camion devient complètement insignifiante.',
  },
  {
    num: 4,
    title: "Dérivée Composite (eᵘ)' = u' · eᵘ",
    icon: 'cible_reflexe' as const,
    when: "Pour dériver toute fonction exponentielle composée et dresser son tableau de variations",
    formule: `**Formule fondamentale de dérivation :**
$$(e^{u})' = u' \\cdot e^u$$

**Formules dérivées incontournables :**
- $f(x) = e^{ax + b} \\implies f'(x) = a \\cdot e^{ax + b}$
- $f(x) = e^{-x} \\implies f'(x) = -e^{-x}$
- $f(x) = e^{-x^2} \\implies f'(x) = -2x \\cdot e^{-x^2}$
- $f(x) = (x - x_0)e^x \\implies f'(x) = 1 \\cdot e^x + (x - x_0)e^x = (x - x_0 + 1)e^x$`,
    exemple: `Soit $f(x) = \\dfrac{e^x - 1}{e^x + 1}$ définie sur $\\mathbb{R}$.
Calculer $f'(x)$ et déterminer son signe :

On applique la formule du quotient $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$ :
$$f'(x) = \\dfrac{e^x(e^x + 1) - (e^x - 1)e^x}{(e^x + 1)^2} = \\dfrac{e^{2x} + e^x - e^{2x} + e^x}{(e^x + 1)^2} = \\dfrac{2e^x}{(e^x + 1)^2}$$

*Signe :* Comme $e^x > 0$ et $(e^x + 1)^2 > 0$, on a $f'(x) > 0$ pour tout $x \\in \\mathbb{R}$.
La fonction $f$ est **strictement croissante** sur $\\mathbb{R}$.`,
    astuce: 'Remarquez comme le terme e^{2x} s\'est simplifié au numérateur ! C\'est un grand classique des sujets du Baccalauréat sénégalais.',
    wolof: '« Dérivée bi dafa gën a yomb bépp fonction : (eᵘ)\' = u\' · eᵘ. Dangay dériver li ci kaw (u\') nga faf ko ci kanam, ba noppi eᵘ bi déllusi ci wetam ! »',
    vieReelle: 'La prolifération des graines ou des bactéries : la vitesse d\'accroissement instantanée est égale au produit du taux de reproduction u\' par la biomasse existante eᵘ.',
  },
];

export default function ExponentielleReflexesCard() {
  const [activeTab, setActiveTab] = useState(0);
  const current = EXPONENTIELLE_METHODES[activeTab];

  return (
    <div className="bg-white rounded-2xl border border-navy/10 p-5 sm:p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy/10 pb-4">
        <div className="flex items-start sm:items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-turquoise/15 flex items-center justify-center text-turquoise shrink-0 mt-0.5 sm:mt-0 p-1.5">
            <StudyIcon name="theoreme_equerre" size={24} />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-navy text-base sm:text-lg leading-tight break-words">
              Fiches Réflexes Bac S2 : Fonction Exponentielle
            </h3>
            <p className="text-xs text-text/60 mt-1 leading-snug">
              Les 4 automatismes indispensables pour réussir le grand problème d&apos;analyse
            </p>
          </div>
        </div>
        <span className="self-start sm:self-center text-xs font-semibold px-2.5 py-1 rounded-full bg-navy/5 text-navy border border-navy/10 shrink-0 whitespace-nowrap">
          Méthode {activeTab + 1} / {EXPONENTIELLE_METHODES.length}
        </span>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {EXPONENTIELLE_METHODES.map((m, idx) => {
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
            <span>Formule et Règles Fondamentales</span>
          </div>
          <div className="text-sm text-text/80 overflow-x-auto py-1">
            <MathRenderer content={current.formule} />
          </div>
        </div>

        {/* Exemple type Bac */}
        <div className="bg-white rounded-xl p-4 border border-navy/10 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-navy uppercase tracking-wider">
            <StudyIcon name="exemple_loupe" size={16} className="text-navy/70" />
            <span>Exemple Type Baccalauréat Sénégalais</span>
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

