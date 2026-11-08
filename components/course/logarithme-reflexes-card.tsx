'use client';

import React, { useState } from 'react';
import StudyIcon from '@/components/ui/study-icon';
import MathRenderer from '@/components/course/math-renderer';

const LOGARITHME_METHODES = [
  {
    num: 1,
    title: "Ensemble de Définition & Conditions d'Existence",
    icon: 'rigueur_compas' as const,
    when: "Dès la première question d'un problème comportant une ou plusieurs expressions ln",
    formule: `**Règle d'or au Bac S2 :**
Pour toute expression $\\ln(u(x))$, la condition stricte est :
$$u(x) > 0$$

- Si $f(x) = \\ln(u(x)) \\implies D_f = \\{x \\in \\mathbb{R} \\mid u(x) > 0\\}$
- Si $f(x) = \\ln|u(x)| \\implies D_f = \\{x \\in \\mathbb{R} \\mid u(x) \\neq 0\\}$
- Si $f(x) = \\ln\\left(\\dfrac{A(x)}{B(x)}\\right) \\implies D_f = \\left\\{x \\in \\mathbb{R} \\mid \\dfrac{A(x)}{B(x)} > 0 \\text{ et } B(x) \\neq 0\\right\\}$
- Si $f(x) = \\ln(A(x)) - \\ln(B(x)) \\implies D_f = \\{x \\in \\mathbb{R} \\mid A(x) > 0 \\text{ et } B(x) > 0\\}$`,
    exemple: `Déterminer le domaine de $f(x) = \\ln\\left(\\dfrac{x-2}{3-x}\\right)$ :

On dresse le tableau de signe du quotient :
- $x - 2 = 0 \\iff x = 2$
- $3 - x = 0 \\iff x = 3$ (valeur interdite)

Le quotient est strictement positif pour $x \\in ]2, 3[$.
Donc : $D_f = ]2, 3[$.`,
    astuce: 'Attention : le domaine de ln(A/B) n\'est PAS le même que celui de ln(A) - ln(B) ! Pour ln(A/B), A et B peuvent être tous les deux négatifs (leur quotient est alors positif), alors que pour ln(A) - ln(B), A et B doivent être individuellement strictement positifs.',
    wolof: '« Logarithme dafa bëgg lu positif : li ci biir ln(u) faw nga tëral u(x) > 0. Bu fékkee fraction la, dangay def tableau de signe ba seet fan la quotient bi positif ! »',
    vieReelle: 'Monter sur un pèse-personne au dispensaire : on ne mesure que des grandeurs réelles et positives. La quantité sous le logarithme doit être strictement au-dessus de zéro.',
  },
  {
    num: 2,
    title: 'Propriétés Algébriques & Équations',
    icon: 'technique_outils' as const,
    when: 'Pour simplifier des calculs, regrouper des termes ou résoudre des équations/inéquations',
    formule: `**Formules fondamentales ($a > 0$, $b > 0$) :**
$$\\ln(a \\cdot b) = \\ln a + \\ln b$$
$$\\ln\\left(\\dfrac{a}{b}\\right) = \\ln a - \\ln b \\qquad \\ln\\left(\\dfrac{1}{b}\\right) = -\\ln b$$
$$\\ln(a^n) = n\\ln a \\qquad \\ln(\\sqrt{a}) = \\dfrac{1}{2}\\ln a$$

**Équations & Inéquations :**
$$\\ln(A) = \\ln(B) \\iff A = B \\quad (A > 0, B > 0)$$
$$\\ln(A) \\le \\ln(B) \\iff A \\le B \\quad (A > 0, B > 0)$$
$$\\ln(A) = k \\iff A = e^k \\quad (A > 0)$$`,
    exemple: `Résoudre dans $\\mathbb{R}$ l'équation $\\ln(x + 1) + \\ln(x - 2) = \\ln(4)$ :

1. *Domaine d'existence :* $x + 1 > 0 \\implies x > -1$ et $x - 2 > 0 \\implies x > 2$. Donc $D_E = ]2, +\\infty[$.
2. *Résolution :* $\\ln((x + 1)(x - 2)) = \\ln(4) \\iff (x + 1)(x - 2) = 4$.
   $$x^2 - x - 2 = 4 \\iff x^2 - x - 6 = 0$$
   Racines : $\\Delta = 1 + 24 = 25$. $x_1 = \\dfrac{1 - 5}{2} = -2$, $x_2 = \\dfrac{1 + 5}{2} = 3$.
3. *Vérification du domaine :* $-2 \\notin D_E$, alors que $3 \\in D_E$.
   L'unique solution est : $S = \\{3\\}$.`,
    astuce: 'N\'oubliez jamais de vérifier vos solutions dans le domaine initial ! Si vous aviez conservé x = -2, vous auriez perdu l\'intégralité des points de la question au Bac.',
    wolof: '« Propriétés yi daño yombal calcul : ln(a·b) = ln a + ln b day soppi multiplication bi mu doon addition ! Boo amee ln(A) = ln(B), dangay wax A = B, waaye bu la fatte vérifié ndax A ak B positif lañu ci domaine bi ! »',
    vieReelle: 'Le passeport biométrique aux frontières : trouver un candidat mathématique ne suffit pas, il faut impérativement vérifier qu\'il est en règle avec le domaine d\'existence.',
  },
  {
    num: 3,
    title: 'Croissances Comparées & Limites Remarquables',
    icon: 'formule_cle' as const,
    when: 'Dès que vous rencontrez une forme indéterminée "0 x infini" ou "infini / infini" avec ln',
    formule: `**Les 4 limites fondamentales au Bac S2 :**

1. **En 0⁺ :**
   $$\\lim_{x \\to 0^+} \\ln x = -\\infty \\qquad \\lim_{x \\to 0^+} x^n \\ln x = 0^- \\quad (n > 0)$$

2. **En +∞ :**
   $$\\lim_{x \\to +\\infty} \\ln x = +\\infty \\qquad \\lim_{x \\to +\\infty} \\dfrac{\\ln x}{x^n} = 0^+ \\quad (n > 0)$$

3. **Taux de variation en 1 et en 0 :**
   $$\\lim_{x \\to 1} \\dfrac{\\ln x}{x - 1} = 1 \\qquad \\lim_{X \\to 0} \\dfrac{\\ln(1 + X)}{X} = 1$$`,
    exemple: `Calculer $\\lim_{x \\to +\\infty} \\dfrac{3x^2 - 5\\ln x}{x^2 + 1}$ :

On factorise par le terme de plus haut degré $x^2$ :
$$\\dfrac{3x^2 - 5\\ln x}{x^2 + 1} = \\dfrac{x^2\\left(3 - 5\\dfrac{\\ln x}{x^2}\\right)}{x^2\\left(1 + \\dfrac{1}{x^2}\\right)} = \\dfrac{3 - 5\\dfrac{\\ln x}{x^2}}{1 + \\dfrac{1}{x^2}}$$

Or par croissances comparées, $\\lim_{x \\to +\\infty} \\dfrac{\\ln x}{x^2} = 0$, et $\\lim_{x \\to +\\infty} \\dfrac{1}{x^2} = 0$.
Par quotient des limites :
$$\\lim_{x \\to +\\infty} f(x) = \\dfrac{3 - 0}{1 + 0} = 3$$`,
    astuce: 'Pour retenir la règle des croissances comparées : en +infini, toute puissance de x (même x^0.1 ou sqrt(x)) écrasera TOUJOURS la fonction ln(x) !',
    wolof: '« Croissances comparées ci +∞ : xⁿ day gën a gaaw lool ln(x). Moo tax boo gisee ln(x)/xⁿ, réponse bi 0 la saa su nekk ! Dangay factorisé par xⁿ ngir dindi forme indéterminée ∞/∞. »',
    vieReelle: 'La course entre une gazelle rapide (xⁿ) et une tortue (ln x) : à long terme, la gazelle prend tellement d\'avance que la vitesse de la tortue devient négligeable.',
  },
  {
    num: 4,
    title: "Dérivée Composite (ln u)' = u'/u",
    icon: 'cible_reflexe' as const,
    when: 'Pour calculer la dérivée d\'une fonction composée avec ln et étudier son signe',
    formule: `**Formule générale de dérivation :**
$$(\\ln |u|)' = \\dfrac{u'}{u}$$

**Cas particuliers fréquents au Bac :**
- $f(x) = \\ln(ax + b) \\implies f'(x) = \\dfrac{a}{ax + b}$
- $f(x) = [\\ln x]^n \\implies f'(x) = n \\cdot \\dfrac{1}{x} \\cdot [\\ln x]^{n-1}$
- $f(x) = x \\ln x \\implies f'(x) = 1 \\cdot \\ln x + x \\cdot \\dfrac{1}{x} = \\ln x + 1$
- $f(x) = \\dfrac{\\ln x}{x} \\implies f'(x) = \\dfrac{\\frac{1}{x} \\cdot x - \\ln x \\cdot 1}{x^2} = \\dfrac{1 - \\ln x}{x^2}$`,
    exemple: `Soit $f(x) = \\ln\\left(x + \\sqrt{x^2 + 1}\\right)$ sur $\\mathbb{R}$.
Calculer $f'(x)$ :

Ici $u(x) = x + \\sqrt{x^2 + 1}$.
$$u'(x) = 1 + \\dfrac{2x}{2\\sqrt{x^2 + 1}} = 1 + \\dfrac{x}{\\sqrt{x^2 + 1}} = \\dfrac{\\sqrt{x^2 + 1} + x}{\\sqrt{x^2 + 1}}$$

On applique $f'(x) = \\dfrac{u'(x)}{u(x)}$ :
$$f'(x) = \\dfrac{\\dfrac{x + \\sqrt{x^2 + 1}}{\\sqrt{x^2 + 1}}}{x + \\sqrt{x^2 + 1}} = \\dfrac{1}{\\sqrt{x^2 + 1}}$$
Un résultat particulièrement élégant et classique des épreuves du Baccalauréat !`,
    astuce: 'Le signe de la dérivée : pour f\'(x) = (1 - ln x)/x^2, comme x^2 > 0, le signe dépend uniquement du numérateur 1 - ln x. Or 1 - ln x > 0 <=> ln x < 1 <=> x < e. Donc f est croissante sur ]0, e] et décroissante sur [e, +infini[.',
    wolof: '« Dérivée bi dafa yomb : (ln u)\' = u\'/u. Dangay dériver li ci biir (u\') nga séddale ko ak li ci biir ci boppam (u). Dénominateur bi du soppi signe ndax u(x) > 0 la ci domaine bi ! »',
    vieReelle: 'Le taux de croissance relatif d\'une récolte d\'arachides : diviser la variation annuelle (u\') par le stock actuel (u).',
  },
];

export default function LogarithmeReflexesCard() {
  const [activeTab, setActiveTab] = useState(0);
  const current = LOGARITHME_METHODES[activeTab];

  return (
    <div className="bg-white rounded-2xl border border-navy/10 p-5 sm:p-6 shadow-sm space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy/10 pb-4">
        <div className="flex items-start sm:items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-turquoise/15 flex items-center justify-center text-turquoise shrink-0 mt-0.5 sm:mt-0 p-1.5">
            <StudyIcon name="theoreme_equerre" size={24} />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-navy text-base sm:text-lg leading-tight break-words">
              Fiches Réflexes Bac S2 : Fonction Logarithme Népérien
            </h3>
            <p className="text-xs text-text/60 mt-1 leading-snug">
              Les 4 méthodes infaillibles pour le grand problème d&apos;analyse
            </p>
          </div>
        </div>
        <span className="self-start sm:self-center text-xs font-semibold px-2.5 py-1 rounded-full bg-navy/5 text-navy border border-navy/10 shrink-0 whitespace-nowrap">
          Méthode {activeTab + 1} / {LOGARITHME_METHODES.length}
        </span>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {LOGARITHME_METHODES.map((m, idx) => {
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

