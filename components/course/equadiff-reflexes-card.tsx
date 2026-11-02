'use client';

import React, { useState } from 'react';
import StudyIcon from '@/components/ui/study-icon';
import MathRenderer from '@/components/course/math-renderer';

const EQUADIFF_METHODES = [
  {
    num: 1,
    title: "Premier Ordre Homogène : y' + ay = 0",
    icon: 'theoreme_equerre' as const,
    when: "Dès que l'équation ne comporte que la dérivée première et la fonction sans terme constant",
    formule: `**Théorème clé :**
Pour tout réel $a \\neq 0$, l'ensemble des solutions de l'équation $y' + ay = 0$ (soit $y' = -ay$) sur $\\mathbb{R}$ est :
$$y(x) = C \\cdot e^{-ax} \\quad (C \\in \\mathbb{R})$$

- Si l'équation s'écrit $y' - 3y = 0 \\implies y(x) = C e^{3x}$.
- Si l'équation s'écrit $2y' + 5y = 0 \\iff y' + \\frac{5}{2}y = 0 \\implies y(x) = C e^{-\\frac{5}{2}x}$.`,
    exemple: `Résoudre sur $\\mathbb{R}$ l'équation $3y' + 6y = 0$ avec la condition initiale $y(1) = 2$ :

1. Forme normalisée : $y' + 2y = 0$ (ici $a = 2$).
2. Solution générale : $y(x) = C \\cdot e^{-2x}$ avec $C \\in \\mathbb{R}$.
3. Condition initiale $y(1) = 2$ :
   $$y(1) = C \\cdot e^{-2(1)} = C \\cdot e^{-2} = 2 \\iff C = 2e^2$$
4. Expression de l'unique solution :
   $$f(x) = 2e^2 \\cdot e^{-2x} = 2e^{-2x + 2} = 2e^{-2(x - 1)}$$`,
    astuce: 'Attention au signe : le coefficient dans l\'exponentielle est l\'OPPOSÉ de a. Si y\' + ay = 0, l\'exposant est -ax. Ne vous trompez pas de signe au Bac !',
    wolof: '« 1er ordre homogène y\' + ay = 0 : solution bi C·e⁻ᵃˣ la. Moytul signe bi : bu équation bi doon y\' + 2y = 0, exposant bi -2x la ! Condition initiale bu melni y(1) = 2 moo lay may nga wër C. »',
    vieReelle: 'La vidange naturelle d\'une bassine percée : l\'eau s\'échappe d\'autant plus vite que le niveau est haut, diminuant selon une exponentielle décroissante.',
  },
  {
    num: 2,
    title: "Premier Ordre avec Second Membre : y' + ay = b",
    icon: 'technique_outils' as const,
    when: "Équation du premier ordre avec un terme constant b non nul",
    formule: `**Solution complète en 2 étapes :**
$$y(x) = \\underbrace{C \\cdot e^{-ax}}_{\\text{Solution homogène } y_h} + \\underbrace{\\dfrac{b}{a}}_{\\text{Solution constante } y_0}$$

1. La solution constante particulière est obtenue en posant $y = k$ (donc $y' = 0$) :
   $$0 + ak = b \\implies k = \\dfrac{b}{a}$$
2. La solution générale s'écrit :
   $$y(x) = C \\cdot e^{-ax} + \\dfrac{b}{a} \\quad (C \\in \\mathbb{R})$$`,
    exemple: `Résoudre sur $\\mathbb{R}$ l'équation $y' - 2y = 6$ telle que la courbe représentative coupe l'axe des ordonnées au point d'ordonnée $1$ :

1. Ici $a = -2$ et $b = 6$.
2. Solution constante : $y_0 = \\frac{6}{-2} = -3$.
3. Solutions générales : $y(x) = C e^{-(-2)x} + (-3) = C e^{2x} - 3$.
4. Condition initiale : coupe l'axe $Oy$ en $1 \\implies y(0) = 1$.
   $$y(0) = C e^0 - 3 = C - 3 = 1 \\implies C = 4$$
5. L'unique solution est : $f(x) = 4e^{2x} - 3$.`,
    astuce: 'Pour vérifier votre solution constante, réinjectez y₀ dans l\'équation de départ : ici -2(-3) = 6, c\'est immédiatement vérifié.',
    wolof: '« 1er ordre avec second membre y\' + ay = b : dangay jël solution homogène bi C·e⁻ᵃˣ nga yokk ci solution constante bi b/a ! »',
    vieReelle: 'Le verre d\'attaya posé sous la véranda : il se refroidit exponentiellement pour se stabiliser exactement à la température ambiante b/a.',
  },
  {
    num: 3,
    title: "Oscillateur Harmonique : y'' + ω²y = 0",
    icon: 'rigueur_compas' as const,
    when: "Équation du second ordre sans dérivée première (modèle classique des oscillations mécaniques/électriques)",
    formule: `**Solutions sinusoïdales ($\\\\omega > 0$) :**
L'ensemble des solutions de $y'' + \\omega^2 y = 0$ sur $\\mathbb{R}$ est :
$$y(x) = A \\cos(\\omega x) + B \\sin(\\omega x) \\quad (A, B \\in \\mathbb{R})$$

- $\\omega$ est la pulsation propre (en rad/s en physique).
- Deux conditions initiales sont impératives pour fixer $A$ et $B$ :
  $$y(0) = y_0 \\implies A = y_0$$
  $$y'(0) = v_0 \\implies \\omega B = v_0 \\iff B = \\dfrac{v_0}{\\omega}$$`,
    exemple: `Résoudre $y'' + 9y = 0$ avec $y(0) = 2$ et $y'(0) = -6$ :

1. On a $\\omega^2 = 9 \\implies \\omega = 3$.
2. Solution générale : $y(x) = A\\cos(3x) + B\\sin(3x)$.
3. Dérivée : $y'(x) = -3A\\sin(3x) + 3B\\cos(3x)$.
4. Conditions initiales :
   - $y(0) = A\\cos(0) + B\\sin(0) = A = 2$.
   - $y'(0) = -3A\\sin(0) + 3B\\cos(0) = 3B = -6 \\implies B = -2$.
5. L'unique solution est : $f(x) = 2\\cos(3x) - 2\\sin(3x)$.`,
    astuce: 'Pour transformer f(x) sous la forme Xₘ cos(ωx + φ) : amplitude Xₘ = √(A² + B²) = √(4+4) = 2√2. On factorise par 2√2 pour trouver le déphasage φ.',
    wolof: '« 2nd ordre sans frottement y\'\' + ω²y = 0 : solution bi dafay yéngu ci diggante cosinus ak sinus : A·cos(ωx) + B·sin(ωx). Dangay soxla ñaari conditions initiales ngir wër A ak B ! »',
    vieReelle: 'Le roulis régulier d\'une pirogue sur la houle de Soumbédioune : un balancement périodique perpétuel de période T = 2π/ω.',
  },
  {
    num: 4,
    title: "Équation Complète : ay'' + by' + cy = 0",
    icon: 'cle_solution' as const,
    when: "Équation du second ordre à coefficients constants (régimes apériodiques, critiques ou pseudo-périodiques)",
    formule: `**Équation caractéristique $ar^2 + br + c = 0$ :**
Calculer le discriminant $\\Delta = b^2 - 4ac$ :

1. **$\\Delta > 0$ (2 racines réelles $r_1, r_2$) :**
   $$y(x) = C_1 e^{r_1 x} + C_2 e^{r_2 x}$$
2. **$\\Delta = 0$ (1 racine double $r_0 = -b/2a$) :**
   $$y(x) = (C_1 x + C_2) e^{r_0 x}$$
3. **$\\Delta < 0$ (2 racines complexes $\\alpha \\pm i\\beta$) :**
   $$y(x) = e^{\\alpha x}\\big(A \\cos(\\beta x) + B \\sin(\\beta x)\\big)$$
   avec $\\alpha = -\\frac{b}{2a}$ et $\\beta = \\frac{\\sqrt{|\\Delta|}}{2a}$.`,
    exemple: `Résoudre $y'' - 4y' + 4y = 0$ avec $y(0) = 1$ et $y'(0) = 3$ :

1. Équation caractéristique : $r^2 - 4r + 4 = 0 \\iff (r - 2)^2 = 0$.
2. Racine double : $r_0 = 2$.
3. Solutions : $y(x) = (C_1 x + C_2) e^{2x}$.
4. Dérivée : $y'(x) = C_1 e^{2x} + 2(C_1 x + C_2) e^{2x} = \\big(2C_1 x + (C_1 + 2C_2)\\big)e^{2x}$.
5. Conditions :
   - $y(0) = C_2 = 1$.
   - $y'(0) = C_1 + 2C_2 = C_1 + 2 = 3 \\implies C_1 = 1$.
6. L'unique solution est : $f(x) = (x + 1)e^{2x}$.`,
    astuce: 'Quand Δ = 0, n\'oubliez JAMAIS le facteur (C₁ x + C₂) devant l\'exponentielle ! Si vous écrivez seulement C e^(r₀ x), vous perdez une dimension de solution.',
    wolof: '« Équation complète ay\'\' + by\' + cy = 0 : defal équation caractéristique ar² + br + c = 0. Bu Δ > 0 (ñaari racines), bu Δ = 0 ((C₁x + C₂)eʳ⁰ˣ), bu Δ < 0 dafay doon eᵃˣ(A cos βx + B sin βx) ! »',
    vieReelle: 'L\'amortisseur d\'un véhicule sur une route de latérite : selon l\'huile et le ressort (Δ), la voiture oscille, s\'amortit doucement ou se stabilise net.',
  },
];

export default function EquadiffReflexesCard() {
  const [activeTab, setActiveTab] = useState(0);
  const current = EQUADIFF_METHODES[activeTab];

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
              Fiches Réflexes Bac S2 : Équations Différentielles
            </h3>
            <p className="text-xs text-text/60 mt-1 leading-snug">
              Les 4 automatismes indispensables pour réussir les équations du 1er et 2nd ordre
            </p>
          </div>
        </div>
        <span className="self-start sm:self-center text-xs font-semibold px-2.5 py-1 rounded-full bg-navy/5 text-navy border border-navy/10 shrink-0 whitespace-nowrap">
          Méthode {activeTab + 1} / {EQUADIFF_METHODES.length}
        </span>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {EQUADIFF_METHODES.map((m, idx) => {
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

