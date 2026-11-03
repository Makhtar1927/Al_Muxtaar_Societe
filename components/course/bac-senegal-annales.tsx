'use client';

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import MathRenderer from '@/components/course/math-renderer';
import StudyIcon from '@/components/ui/study-icon';

export interface BacItem {
  year: number;
  session: string;
  points: string;
  topic: string;
  enonce: string;
  solution: string;
  baremeAstuce: string;
}

export const BAC_ANNALES_BY_CHAPTER: Record<string, BacItem[]> = {
  // 0. CINÉTIQUE CHIMIQUE (CHIMIE S2)
  cinetique: [
    {
      year: 2023,
      session: 'Session Normale (S2)',
      points: 'Exercice 1 — Chimie (4 Points)',
      topic: 'Suivi cinétique par spectrophotométrie, Vitesse volumique & Temps de demi-réaction',
      enonce: `On étudie à $25^\\circ\\text{C}$ la réaction lente et totale entre les ions peroxodisulfate $S_2O_8^{2-}$ et les ions iodure $I^-$ en solution aqueuse :
$$S_2O_8^{2-} + 2 I^- \\longrightarrow 2 SO_4^{2-} + I_2$$
À l'instant $t = 0$, on mélange un volume $V_1 = 50\\text{ mL}$ d'une solution de peroxodisulfate de potassium de concentration $C_1 = 0{,}02\\text{ mol/L}$ avec un volume $V_2 = 50\\text{ mL}$ d'une solution d'iodure de potassium de concentration $C_2 = 0{,}08\\text{ mol/L}$.
Le volume total du mélange réactionnel est $V = V_1 + V_2 = 100\\text{ mL}$.

1. Préciser le réactif limitant et calculer l'avancement maximal $x_\\text{max}$.
2. Par spectrophotométrie, on mesure la concentration en diiode $[I_2]$ au cours du temps. Définir la vitesse volumique de réaction $v(t)$ et donner son expression en fonction de $[I_2]$.
3. La pente de la tangente à la courbe $[I_2] = f(t)$ à $t = 10\\text{ min}$ vaut $a = 0{,}80\\text{ mmol} \\cdot \\text{L}^{-1} \\cdot \\text{min}^{-1}$. En déduire la vitesse volumique à cette date.
4. Définir le temps de demi-réaction $t_{1/2}$ et déterminer graphiquement sa valeur sachant que $[I_2](t_{1/2}) = 5{,}0\\text{ mmol/L}$.
5. Comment évoluerait la vitesse de réaction si l'on réalisait l'expérience à $40^\\circ\\text{C}$ au lieu de $25^\\circ\\text{C}$ ? Justifier.`,
      solution: `### 1. Réactif limitant et avancement maximal $x_\\text{max}$
- Quantités de matière initiales :
  $$n_1(S_2O_8^{2-}) = C_1 \\times V_1 = 0{,}02 \\times 0{,}050 = 1{,}0 \\times 10^{-3}\\text{ mol} = 1{,}0\\text{ mmol}$$
  $$n_2(I^-) = C_2 \\times V_2 = 0{,}08 \\times 0{,}050 = 4{,}0 \\times 10^{-3}\\text{ mol} = 4{,}0\\text{ mmol}$$
- Rapports stœchiométriques :
  $$\\frac{n_1}{1} = 1{,}0\\text{ mmol} \\quad < \\quad \\frac{n_2}{2} = \\frac{4{,}0}{2} = 2{,}0\\text{ mmol}$$
Le réactif limitant est l'ion **peroxodisulfate $S_2O_8^{2-}$**.
L'avancement maximal est donc **$x_\\text{max} = 1{,}0\\text{ mmol}$**.

### 2. Définition et expression de la vitesse volumique
La vitesse volumique de réaction $v(t)$ est la dérivée par rapport au temps de l'avancement $x$, divisée par le volume total $V$ du mélange :
$$v(t) = \\frac{1}{V} \\frac{dx}{dt}$$
D'après l'équation bilan, $n(I_2) = x(t)$, donc $[I_2](t) = \\frac{x(t)}{V}$.
Par dérivation :
$$v(t) = \\frac{d[I_2]}{dt}$$

### 3. Calcul de la vitesse à $t = 10\\text{ min}$
$$v(10\\text{ min}) = \\left( \\frac{d[I_2]}{dt} \\right)_{t = 10} = a = 0{,}80\\text{ mmol} \\cdot \\text{L}^{-1} \\cdot \\text{min}^{-1}$$

### 4. Temps de demi-réaction $t_{1/2}$
$t_{1/2}$ est la durée au bout de laquelle l'avancement atteint la moitié de sa valeur maximale : $x(t_{1/2}) = \\frac{x_\\text{max}}{2}$, ce qui équivaut ici à $[I_2](t_{1/2}) = \\frac{[I_2]_\\text{max}}{2} = 5{,}0\\text{ mmol/L}$.
Par lecture de l'abscisse correspondante sur la courbe, on lit **$t_{1/2} = 8\\text{ min}$**.

### 5. Influence de la température
La température est un **facteur cinétique**. À $40^\\circ\\text{C}$, l'agitation thermique augmente et la fréquence des chocs efficaces entre entités réactives est plus élevée : la vitesse de réaction est donc **plus grande** à chaque instant. La courbe rejoindra l'asymptote $x_\\text{max}$ plus rapidement.`,
      baremeAstuce: 'Attention au Bac S2 : n\'oubliez jamais de justifier le réactif limitant avec les rapports stœchiométriques n/coeff.',
    },
    {
      year: 2020,
      session: 'Session Normale (S2)',
      points: 'Exercice 1 — Chimie (3,5 Points)',
      topic: 'Facteurs cinétiques, Rôle du catalyseur & Justification de la trempe',
      enonce: `On étudie la dismutation de l'eau oxygénée : $2 H_2O_2 \\longrightarrow 2 H_2O + O_2(g)$.
Cette réaction est très lente à température ordinaire.

1. On ajoute quelques gouttes d'une solution de chlorure de fer III ($Fe^{3+} + 3 Cl^-$). On observe un dégagement gazeux immédiat et vigoureux.
   a. Quel est le rôle des ions ferriques $Fe^{3+}$ ?
   b. De quel type de catalyse s'agit-il ?
   c. La présence de ce catalyseur modifie-t-elle le volume final de dioxygène $O_2$ recueilli ? Justifier.
2. Pour suivre la cinétique par dosage de $H_2O_2$ restant avec du permanganate de potassium, l'élève effectue des prélèvements à différentes dates $t$ et les verse immédiatement dans un erlenmeyer contenant de l'eau glacée.
   Expliquer l'utilité de cette opération (la trempe).`,
      solution: `### 1. Étude du catalyseur
a. Les ions $Fe^{3+}$ jouent le rôle de **catalyseur** : ils accélèrent la dismutation de $H_2O_2$ sans être consommés.
b. Il s'agit d'une **catalyse homogène** car le catalyseur ($Fe^{3+}$ en solution aqueuse) et les réactifs ($H_2O_2$ en solution aqueuse) se trouvent dans la même phase liquide.
c. **Non**, le catalyseur ne modifie pas le volume final de dioxygène $V(O_2)_\\text{final}$. Un catalyseur modifie la vitesse mais n'a **aucune influence sur l'état final d'équilibre ou l'avancement maximal $x_\\text{max}$**.

### 2. Justification de la trempe chimique
L'ajout d'eau glacée constitue une **trempe chimique** (baisse brutale de la température et dilution). Elle a pour rôle de **stopper quasi-instantanément la réaction** ($v \\approx 0$), afin que la quantité de $H_2O_2$ reste rigoureusement constante pendant toute la durée du dosage volumétrique au permanganate.`,
      baremeAstuce: 'Mentionnez toujours deux effets pour la trempe : le refroidissement thermique brutal et la dilution par l\'eau.',
    },
  ],

  // 1. LIMITES & CONTINUITÉ
  limites: [
    {
      year: 2024,
      session: 'Session Normale (S2)',
      points: 'Problème — Partie A (4 Points)',
      topic: 'Limites aux bornes, Asymptote oblique & Position relative',
      enonce: `Soit la fonction $f$ définie sur $\\mathbb{R}^*$ par :
$$f(x) = \\frac{2x^2 - 3x + 1}{x}$$

1. Déterminer l'ensemble de définition $D_f$ et calculer les limites de $f$ aux bornes de $D_f$.
2. Montrer que la droite $(D)$ d'équation $y = 2x - 3$ est asymptote oblique à $(\\mathcal{C}_f)$ en $+\\infty$ et $-\\infty$.
3. Étudier la position relative de $(\\mathcal{C}_f)$ par rapport à $(D)$.`,
      solution: `### 1. Ensemble de définition et limites aux bornes
- $D_f = ]-\\infty, 0[ \\cup ]0, +\\infty[$.
- **En $\\pm\\infty$** : rapport des monômes de plus haut degré :
$$\\lim_{x \\to +\\infty} f(x) = \\lim_{x \\to +\\infty} 2x = +\\infty \\quad \\text{et} \\quad \\lim_{x \\to -\\infty} f(x) = -\\infty$$
- **En $0$** : le numérateur tend vers $1 > 0$.
$$\\lim_{x \\to 0^+} f(x) = +\\infty \\quad \\text{et} \\quad \\lim_{x \\to 0^-} f(x) = -\\infty$$
La droite $x = 0$ est asymptote verticale.

### 2. Asymptote oblique
$$f(x) = 2x - 3 + \\frac{1}{x} \\implies \\lim_{x \\to \\pm\\infty} [f(x) - (2x - 3)] = \\lim_{x \\to \\pm\\infty} \\frac{1}{x} = 0$$
Donc la droite $(D) : y = 2x - 3$ est asymptote oblique.

### 3. Position relative
$f(x) - (2x - 3) = \\frac{1}{x}$ :
- Pour $x > 0$, $(\\mathcal{C}_f)$ est strictement au-dessus de $(D)$.
- Pour $x < 0$, $(\\mathcal{C}_f)$ est strictement en-dessous de $(D)$.`,
      baremeAstuce: 'Exigez la rédaction rigoureuse : la limite de f(x) - (ax+b) doit être explicitement démontrée égale à 0.',
    },
    {
      year: 2022,
      session: 'Session de Remplacement (S2)',
      points: 'Exercice 1 (4 Points)',
      topic: 'Levée d\'indétermination par quantité conjuguée & Continuité en 0',
      enonce: `On considère la fonction $h$ définie par :
$$h(x) = \\begin{cases} \\frac{\\sqrt{1 + x^2} - 1}{x} & \\text{si } x \\ne 0 \\\\ 0 & \\text{si } x = 0 \\end{cases}$$

1. Déterminer le domaine de définition de $h$.
2. Étudier la continuité de la fonction $h$ au point $x_0 = 0$.
3. Calculer les limites de $h$ en $+\\infty$ et $-\\infty$.`,
      solution: `### 1. Domaine de définition
$1 + x^2 > 0$ pour tout $x \\in \\mathbb{R}$, et $h(0) = 0$, donc $D_h = \\mathbb{R}$.

### 2. Continuité en 0
$$h(x) = \\frac{(\\sqrt{1+x^2} - 1)(\\sqrt{1+x^2} + 1)}{x(\\sqrt{1+x^2} + 1)} = \\frac{x^2}{x(\\sqrt{1+x^2} + 1)} = \\frac{x}{\\sqrt{1+x^2} + 1}$$
$$\\lim_{x \\to 0} h(x) = \\frac{0}{\\sqrt{1} + 1} = 0 = h(0)$$
La fonction $h$ est continue en 0.

### 3. Limites en $\\pm\\infty$
Pour $x > 0$ : $\\sqrt{1+x^2} = x\\sqrt{1 + 1/x^2}$, d'où $\\lim_{x \\to +\\infty} h(x) = 1$.  
Pour $x < 0$ : $\\sqrt{1+x^2} = -x\\sqrt{1 + 1/x^2}$, d'où $\\lim_{x \\to -\\infty} h(x) = -1$.`,
      baremeAstuce: 'Piège classique : $\\sqrt{x^2} = |x| = -x$ quand $x \\to -\\infty$ ! Ne perdez pas le signe négatif.',
    },
    {
      year: 2011,
      session: 'Session Normale (S2)',
      points: 'Problème — Partie A (3 Points)',
      topic: 'Théorème d\'encadrement des gendarmes & Oscillations',
      enonce: `Soit la fonction $\\varphi$ définie sur $]0, +\\infty[$ par :
$$\\varphi(x) = \\frac{x + \\sin x}{2x - 1}$$

1. Démontrer que pour tout $x > 1/2$ :
$$\\frac{x - 1}{2x - 1} \\le \\varphi(x) \\le \\frac{x + 1}{2x - 1}$$
2. En déduire la limite de $\\varphi(x)$ en $+\\infty$. Interpréter graphiquement.`,
      solution: `### 1. Encadrement
Pour tout $x$, $-1 \\le \\sin x \\le 1 \\implies x - 1 \\le x + \\sin x \\le x + 1$.  
Comme $2x - 1 > 0$ pour $x > 1/2$, on divise sans changer le sens.

### 2. Limite
$$\\lim_{x \\to +\\infty} \\frac{x - 1}{2x - 1} = \\frac{1}{2} \\quad \\text{et} \\quad \\lim_{x \\to +\\infty} \\frac{x + 1}{2x - 1} = \\frac{1}{2}$$
Par le théorème des gendarmes, $\\lim_{x \\to +\\infty} \\varphi(x) = \\frac{1}{2}$. La droite $y = 1/2$ est asymptote horizontale en $+\\infty$.`,
      baremeAstuce: 'Toujours justifier le signe strictement positif du dénominateur $2x - 1 > 0$ avant de diviser.',
    },
  ],

  // 2. TVI & BIJECTION
  tvi: [
    {
      year: 2023,
      session: 'Session Normale (S2)',
      points: 'Problème — Partie A (5 Points)',
      topic: 'Théorème des Valeurs Intermédiaires (TVI) & Encadrement de α',
      enonce: `Soit la fonction $g$ définie sur $\\mathbb{R}$ par :
$$g(x) = x^3 + 3x - 2$$

1. Calculer les limites de $g$ en $-\\infty$ et $+\\infty$.
2. Dresser le tableau de variation complet de $g$.
3. Démontrer que l'équation $g(x) = 0$ admet une unique solution réelle $\\alpha$ sur $\\mathbb{R}$.
4. Justifier que $\\alpha \\in ]0, 1[$ puis donner un encadrement de $\\alpha$ à $10^{-1}$ près.
5. En déduire le signe de $g(x)$ sur $\\mathbb{R}$.`,
      solution: `### 1. Limites
Polynôme de degré 3 : $\\lim_{x \\to -\\infty} g(x) = -\\infty$ et $\\lim_{x \\to +\\infty} g(x) = +\\infty$.

### 2. Variations
$g'(x) = 3x^2 + 3 = 3(x^2 + 1) > 0$ pour tout $x$. $g$ est strictement croissante sur $\\mathbb{R}$.

### 3. Existence et unicité de $\\alpha$
- $g$ est continue sur $\\mathbb{R}$.
- $g$ est strictement croissante sur $\\mathbb{R}$.
- $g(\\mathbb{R}) = \\mathbb{R}$. Or $0 \\in \\mathbb{R}$.
D'après le corollaire du TVI (théorème de la bijection), l'équation $g(x) = 0$ admet une unique solution $\\alpha \\in \\mathbb{R}$.

### 4. Encadrement
$g(0) = -2 < 0$ et $g(1) = 2 > 0$. Comme $g(0) \\times g(1) < 0$, $\\alpha \\in ]0, 1[$.  
$g(0.5) = -0.375 < 0$ et $g(0.6) = 0.016 > 0$, donc $0.5 < \\alpha < 0.6$.

### 5. Signe de $g(x)$
- Pour $x < \\alpha$ : $g(x) < 0$.
- Pour $x > \\alpha$ : $g(x) > 0$.`,
      baremeAstuce: 'Citer impérativement : CONTINU, STRICTEMENT MONOTONE, et 0 compris entre les limites.',
    },
    {
      year: 2016,
      session: 'Session Normale (S2)',
      points: 'Problème — Partie A (4 Points)',
      topic: 'Fonction auxiliaire, bijection et racine unique',
      enonce: `Soit la fonction $h$ définie sur $[0, +\\infty[$ par $h(x) = x + 1 + e^{-x}$.
1. Étudier les variations de $h$ sur $[0, +\\infty[$.
2. Montrer que l'équation $h(x) = 3$ admet une solution unique $\\alpha$ dans $[1, 2]$.
3. Déterminer un encadrement de $\\alpha$ à $10^{-1}$ près.`,
      solution: `### 1. Variations
$h'(x) = 1 - e^{-x}$. Pour tout $x > 0$, $e^{-x} < 1$, donc $h'(x) > 0$. $h$ est strictement croissante.

### 2. Solution unique
$h$ est continue et strictement croissante sur $[1, 2]$.  
$h(1) = 2 + e^{-1} \\approx 2.37 < 3$ et $h(2) = 3 + e^{-2} \\approx 3.14 > 3$.  
Comme $3 \\in [h(1), h(2)]$, il existe un unique $\\alpha \\in [1, 2]$ tel que $h(\\alpha) = 3$.

### 3. Encadrement
Par balayage : $h(1.8) \\approx 2.96$ et $h(1.9) \\approx 3.05$, d'où $1.8 < \\alpha < 1.9$.`,
      baremeAstuce: 'Toujours calculer précisément les images aux bornes pour prouver que la valeur cible est encadrée.',
    },
  ],

  // 3. DÉRIVATION & ASYMPTOTES
  derivation: [
    {
      year: 2024,
      session: 'Session Normale (S2)',
      points: 'Problème — Partie B (6 Points)',
      topic: 'Dérivée, tangentes, extremum et étude de variations',
      enonce: `Soit $f(x) = \\frac{x^2 - x + 1}{x - 1}$.
1. Déterminer le domaine $D_f$.
2. Calculer $f'(x)$ et montrer que $f'(x) = \\frac{x(x - 2)}{(x - 1)^2}$.
3. Dresser le tableau de variation de $f$.
4. Déterminer l'équation de la tangente $(T)$ à $(\\mathcal{C}_f)$ au point d'abscisse $x_0 = 2$.`,
      solution: `### 1. Domaine
$D_f = \\mathbb{R} \\setminus \\{1\\}$.

### 2. Dérivée
Formule $(u/v)' = (u'v - uv')/v^2$ :
$$f'(x) = \\frac{(2x - 1)(x - 1) - (x^2 - x + 1)(1)}{(x - 1)^2} = \\frac{2x^2 - 3x + 1 - x^2 + x - 1}{(x - 1)^2} = \\frac{x^2 - 2x}{(x - 1)^2} = \\frac{x(x - 2)}{(x - 1)^2}$$

### 3. Variations
Le dénominateur étant un carré strictement positif, $f'(x)$ a le même signe que $x(x - 2)$ :
- Positif sur $]-\\infty, 0[$ et $]2, +\\infty[$ (croissante).
- Négatif sur $]0, 1[$ et $]1, 2[$ (décroissante).

### 4. Tangente en $x_0 = 2$
$f'(2) = 0$ et $f(2) = 3$. L'équation est $y = f'(2)(x - 2) + f(2) = 3$ (tangente horizontale).`,
      baremeAstuce: 'Une dérivée nulle en $x_0$ correspond à une tangente horizontale d\'équation $y = f(x_0)$.',
    },
  ],

  asymptotes: [
    {
      year: 2018,
      session: 'Session Normale (S2)',
      points: 'Problème — Partie B (5 Points)',
      topic: 'Branches infinies, Asymptote oblique & Branches paraboliques',
      enonce: `Soit la fonction $f(x) = x + \\sqrt{x^2 - 1}$.
1. Déterminer l'ensemble de définition $D_f$.
2. Montrer que $(\\mathcal{C}_f)$ admet une asymptote oblique $(D_1)$ en $+\\infty$ et une asymptote horizontale $(D_2)$ en $-\\infty$.
3. Préciser les équations de ces asymptotes.`,
      solution: `### 1. Domaine
$x^2 - 1 \\ge 0 \\iff D_f = ]-\\infty, -1] \\cup [1, +\\infty[$.

### 2. En $+\\infty$
$$\\lim_{x \\to +\\infty} \\frac{f(x)}{x} = \\lim_{x \\to +\\infty} \\left(1 + \\sqrt{1 - \\frac{1}{x^2}}\\right) = 2 = a$$
$$\\lim_{x \\to +\\infty} (f(x) - 2x) = \\lim_{x \\to +\\infty} (\\sqrt{x^2 - 1} - x) = \\lim_{x \\to +\\infty} \\frac{-1}{\\sqrt{x^2 - 1} + x} = 0 = b$$
Donc $(D_1) : y = 2x$ est asymptote oblique en $+\\infty$.

### 3. En $-\\infty$
$$\\lim_{x \\to -\\infty} f(x) = \\lim_{x \\to -\\infty} (x + \\sqrt{x^2 - 1}) = \\lim_{x \\to -\\infty} \\frac{-1}{\\sqrt{x^2 - 1} - x} = 0$$
Donc $(D_2) : y = 0$ (l'axe des abscisses) est asymptote horizontale en $-\\infty$.`,
      baremeAstuce: 'Attention au calcul de $\\lim [f(x) - ax]$ : utiliser la quantité conjuguée pour lever la forme $\\infty - \\infty$.',
    },
  ],

  // 4. SUITES NUMÉRIQUES
  suites: [
    {
      year: 2019,
      session: 'Session Normale (S2)',
      points: 'Exercice 1 (4,5 Points)',
      topic: 'Suite récurrente arithmético-géométrique & Convergence',
      enonce: `Soit la suite $(u_n)$ définie pour tout $n \\in \\mathbb{N}$ par :
$$u_0 = 2 \\quad \\text{et} \\quad u_{n+1} = \\frac{1}{3}u_n + 2$$

1. Calculer $u_1$ et $u_2$.
2. Démontrer par récurrence que pour tout $n \\in \\mathbb{N}$, $u_n \\le 3$.
3. On pose $v_n = u_n - 3$.
   a) Démontrer que $(v_n)$ est une suite géométrique dont on précisera le premier terme $v_0$ et la raison $q$.
   b) Exprimer $v_n$ puis $u_n$ en fonction de $n$.
4. Déterminer la limite de $(u_n)$ quand $n \\to +\\infty$.`,
      solution: `### 1. Premiers termes
$u_1 = \\frac{1}{3}(2) + 2 = \\frac{8}{3}$, $u_2 = \\frac{1}{3}\\left(\\frac{8}{3}\\right) + 2 = \\frac{26}{9}$.

### 2. Récurrence
- Initialisation : $u_0 = 2 \\le 3$ (vrai).
- Hérédité : supposons $u_n \\le 3$. Alors $\\frac{1}{3}u_n \\le 1 \\implies \\frac{1}{3}u_n + 2 \\le 3 \\implies u_{n+1} \\le 3$.
- Conclusion : $\\forall n \\in \\mathbb{N}$, $u_n \\le 3$.

### 3. Suite auxiliaire $(v_n)$
$$v_{n+1} = u_{n+1} - 3 = \\frac{1}{3}u_n + 2 - 3 = \\frac{1}{3}u_n - 1 = \\frac{1}{3}(u_n - 3) = \\frac{1}{3}v_n$$
$(v_n)$ est géométrique de raison $q = 1/3$ et $v_0 = u_0 - 3 = 2 - 3 = -1$.  
D'où $v_n = -1 \\cdot (1/3)^n$ et $u_n = 3 - (1/3)^n$.

### 4. Limite
Comme $|1/3| < 1$, $\\lim_{n \\to +\\infty} (1/3)^n = 0$, donc $\\lim_{n \\to +\\infty} u_n = 3$.`,
      baremeAstuce: 'Rédigez rigoureusement les 3 étapes de la récurrence : Initialisation, Hérédité et Conclusion.',
    },
  ],

  // 5. LOGARITHME NÉPÉRIEN
  logarithme: [
    {
      year: 2020,
      session: 'Session Normale (S2)',
      points: 'Problème (10 Points)',
      topic: 'Étude complète d\'une fonction logarithme népérien',
      enonce: `Soit la fonction $f$ définie par :
$$f(x) = x + \\ln\\left|\\frac{x - 1}{x + 1}\\right|$$

1. Déterminer l'ensemble de définition $D_f$.
2. Étudier la parité de $f$. En déduire un élément de symétrie pour la courbe $(\\mathcal{C}_f)$.
3. Calculer les limites aux bornes de $D_f$.
4. Montrer que $f'(x) = \\frac{x^2 + 1}{x^2 - 1}$ et dresser le tableau de variation de $f$.`,
      solution: `### 1. Domaine
Il faut $\\frac{x - 1}{x + 1} \\ne 0$ et $x + 1 \\ne 0$, donc $x \\ne 1$ et $x \\ne -1$.  
$$D_f = \\mathbb{R} \\setminus \\{-1, 1\\}$$

### 2. Parité
$$f(-x) = -x + \\ln\\left|\\frac{-x - 1}{-x + 1}\\right| = -x + \\ln\\left|\\frac{x + 1}{x - 1}\\right| = -x - \\ln\\left|\\frac{x - 1}{x + 1}\\right| = -f(x)$$
La fonction $f$ est impaire. L'origine $O(0, 0)$ est centre de symétrie de $(\\mathcal{C}_f)$.

### 3. Limites
En $+\\infty$, $\\frac{x-1}{x+1} \\to 1$, donc $\\ln(1) = 0$, d'où $\\lim_{x \\to +\\infty} f(x) = +\\infty$.  
En $1$, $\\frac{x-1}{x+1} \\to 0$, donc $\\lim_{x \\to 1} f(x) = -\\infty$ (asymptote verticale $x = 1$).

### 4. Dérivée
$$\\left(\\ln\\left|\\frac{x-1}{x+1}\\right|\\right)' = \\frac{1}{x-1} - \\frac{1}{x+1} = \\frac{2}{x^2 - 1}$$
$$f'(x) = 1 + \\frac{2}{x^2 - 1} = \\frac{x^2 + 1}{x^2 - 1}$$
Le numérateur $x^2 + 1 > 0$ toujours. $f'(x)$ est du signe de $x^2 - 1$.`,
      baremeAstuce: 'Propriété clé : $(\\ln|u|)\' = u\'/u$. Pour un quotient, appliquez $\\ln|u/v| = \\ln|u| - \\ln|v|$ avant de dériver.',
    },
  ],

  // 6. EXPONENTIELLE
  exponentielle: [
    {
      year: 2022,
      session: 'Session Normale (S2)',
      points: 'Problème — Partie A & B (7 Points)',
      topic: 'Fonction exponentielle, croissance comparée et asymptotes',
      enonce: `On considère la fonction $f$ définie sur $\\mathbb{R}$ par :
$$f(x) = (x - 1)e^{-x} + 2$$

1. Calculer $\\lim_{x \\to +\\infty} f(x)$ et $\\lim_{x \\to -\\infty} f(x)$. Interpréter graphiquement.
2. Calculer $f'(x)$ et montrer que $f'(x) = (2 - x)e^{-x}$.
3. Dresser le tableau de variation de $f$.
4. Démontrer que la droite $(\\Delta) : y = 2$ est asymptote à $(\\mathcal{C}_f)$ en $+\\infty$ et étudier la position relative de $(\\mathcal{C}_f)$ par rapport à $(\\Delta)$.`,
      solution: `### 1. Limites
- En $+\\infty$ : par croissances comparées, $\\lim_{x \\to +\\infty} x e^{-x} = 0$ et $\\lim e^{-x} = 0$, donc $\\lim_{x \\to +\\infty} f(x) = 2$.
- En $-\\infty$ : $(x - 1) \\to -\\infty$ et $e^{-x} \\to +\\infty$, donc $\\lim_{x \\to -\\infty} f(x) = -\\infty$.

### 2. Dérivée
$$f'(x) = 1 \\cdot e^{-x} + (x - 1)(-e^{-x}) = e^{-x}(1 - x + 1) = (2 - x)e^{-x}$$

### 3. Variations
Comme $e^{-x} > 0$, $f'(x)$ a le signe de $2 - x$ :
- $f'(x) > 0$ sur $]-\\infty, 2[$ (croissante).
- $f'(x) < 0$ sur $]2, +\\infty[$ (décroissante).  
Maximum en $x = 2$ : $f(2) = e^{-2} + 2$.

### 4. Asymptote et position
$\\lim_{x \\to +\\infty} [f(x) - 2] = \\lim_{x \\to +\\infty} (x - 1)e^{-x} = 0$, donc $y = 2$ est asymptote horizontale en $+\\infty$.  
$f(x) - 2 = (x - 1)e^{-x}$ a le signe de $x - 1$ :
- $(\\mathcal{C}_f)$ est au-dessus de $(\\Delta)$ pour $x > 1$.
- $(\\mathcal{C}_f)$ est en-dessous de $(\\Delta)$ pour $x < 1$.`,
      baremeAstuce: 'Mentionner obligatoirement le théorème des croissances comparées : $\\lim_{x \\to +\\infty} x^n e^{-x} = 0$.',
    },
  ],

  // 7. PRIMITIVES & INTÉGRALES
  primitives: [
    {
      year: 2023,
      session: 'Session Normale (S2)',
      points: 'Exercice 1 (3 Points)',
      topic: 'Primitives usuelles composées et intégration',
      enonce: `1. Donner les primitives des fonctions suivantes sur leur domaine de validité :
   a) $g(x) = f'(x) \\cdot e^{f(x)}$
   b) $h(x) = \\frac{f'(x)}{f(x)}$ (avec $f$ dérivable et ne s'annulant pas).
2. Calculer l'intégrale suivante à l'aide d'une intégration par parties :
$$I = \\int_1^e x \\ln x \\, dx$$`,
      solution: `### 1. Formules de primitives
a) Une primitive de $f'(x)e^{f(x)}$ est :
$$G(x) = e^{f(x)} + C \\quad (C \\in \\mathbb{R})$$
b) Une primitive de $\\frac{f'(x)}{f(x)}$ est :
$$H(x) = \\ln|f(x)| + C \\quad (C \\in \\mathbb{R})$$

### 2. Intégration par parties
Posons :
- $u(x) = \\ln x \\implies u'(x) = \\frac{1}{x}$
- $v'(x) = x \\implies v(x) = \\frac{x^2}{2}$
$$I = \\left[ \\frac{x^2}{2} \\ln x \\right]_1^e - \\int_1^e \\frac{x^2}{2} \\cdot \\frac{1}{x} \\, dx = \\left(\\frac{e^2}{2} \\ln e - 0\\right) - \\frac{1}{2} \\int_1^e x \\, dx$$
$$I = \\frac{e^2}{2} - \\frac{1}{2} \\left[ \\frac{x^2}{2} \\right]_1^e = \\frac{e^2}{2} - \\frac{1}{4}(e^2 - 1) = \\frac{e^2 + 1}{4}$$`,
      baremeAstuce: 'Poser clairement le choix de $u(x)$ et $v\'(x)$ sur la copie pour bénéficier de l\'intégralité des points de barème.',
    },
  ],

  // 8. ÉQUATIONS DIFFÉRENTIELLES
  equadiff: [
    {
      year: 2017,
      session: 'Session Normale (S2)',
      points: 'Exercice 1 (4 Points)',
      topic: 'Équation différentielle du second ordre sans second membre',
      enonce: `1. Résoudre dans $\\mathbb{R}$ l'équation différentielle :
$$(E) : y'' + 4y = 0$$
2. Déterminer la solution particulière $f$ de $(E)$ vérifiant les conditions initiales :
$$f(0) = 1 \\quad \\text{et} \\quad f'\\left(\\frac{\\pi}{4}\\right) = -2$$`,
      solution: `### 1. Solution générale
L'équation caractéristique associée à $y'' + \\omega^2 y = 0$ avec $\\omega = 2$ est $r^2 + 4 = 0 \\iff r = \\pm 2i$.  
La solution générale est de la forme :
$$y(x) = A \\cos(2x) + B \\sin(2x) \\quad (A, B \\in \\mathbb{R})$$

### 2. Conditions initiales
- $f(0) = 1 \\implies A \\cos(0) + B \\sin(0) = 1 \\implies A = 1$.
- Dérivée : $f'(x) = -2A \\sin(2x) + 2B \\cos(2x) = -2 \\sin(2x) + 2B \\cos(2x)$.
- $f'(\\pi/4) = -2 \\sin(\\pi/2) + 2B \\cos(\\pi/2) = -2(1) + 2B(0) = -2$.
Cette relation est toujours vérifiée pour toute valeur de $B$ !  
Si l'on spécifie en plus $f'(0) = 0 \\implies B = 0$.
La solution est :
$$f(x) = \\cos(2x) + B \\sin(2x)$$`,
      baremeAstuce: 'Formule clé : les solutions de $y\'\' + \\omega^2 y = 0$ s\'écrivent $A\\cos(\\omega x) + B\\sin(\\omega x)$. Ne confondez pas avec $e^{\\omega x}$ !',
    },
  ],

  // 9. NOMBRES COMPLEXES
  complexes: [
    {
      year: 2023,
      session: 'Session Normale (S2)',
      points: 'Exercice 2 (4 Points)',
      topic: 'Polynôme complexe du 3e degré, racines et barycentre',
      enonce: `Soit le polynôme complexe défini par :
$$P(z) = 2z^3 - 3(1+i)z^2 + 4iz + 1 - i$$

1. Vérifier que $z_1 = 1$ et $z_2 = i$ sont des racines de $P$.
2. Déterminer le polynôme $g(z)$ tel que $P(z) = (z - 1)(z - i)g(z)$.
3. Résoudre l'équation $P(z) = 0$ dans $\\mathbb{C}$.
4. On pose $z_A = 1$, $z_B = i$ et $z_C = \\frac{1}{2} + \\frac{1}{2}i$.
   a) Montrer que $C$ est le milieu du segment $[AB]$.
   b) Déterminer la nature du triangle $OAB$.`,
      solution: `### 1. Vérification
$P(1) = 2(1) - 3(1+i) + 4i + 1 - i = 2 - 3 - 3i + 4i + 1 - i = 0$.  
$P(i) = 2(-i) - 3(1+i)(-1) + 4i(i) + 1 - i = -2i + 3 + 3i - 4 + 1 - i = 0$.

### 2. Factorisation
$(z - 1)(z - i) = z^2 - (1+i)z + i$.  
Par identification : $g(z) = 2z - (1 - i)$.

### 3. Résolution
$P(z) = 0 \\iff z = 1$ ou $z = i$ ou $2z - 1 + i = 0 \\iff z_3 = \\frac{1 - i}{2} = \\frac{1}{2} - \\frac{1}{2}i$.  
$$S = \\left\\{1,\\; i,\\; \\frac{1}{2} - \\frac{1}{2}i\\right\\}$$

### 4. Géométrie
a) $\\frac{z_A + z_B}{2} = \\frac{1 + i}{2} = \\frac{1}{2} + \\frac{1}{2}i = z_C$. Donc $C$ est bien le milieu de $[AB]$.  
b) $\\frac{z_B - z_O}{z_A - z_O} = \\frac{i}{1} = i$. Le module vaut 1 et l'argument vaut $\\pi/2$. Le triangle $OAB$ est donc **rectangle et isocèle en $O$**.`,
      baremeAstuce: 'Le quotient $(z_B - z_O)/(z_A - z_O) = i$ prouve simultanément l\'égalité des longueurs $OA = OB$ et l\'angle droit $(\\vec{OA}, \\vec{OB}) = \\pi/2$.',
    },
    {
      year: 2022,
      session: 'Session Normale (S2)',
      points: 'Exercice 1 (4 Points)',
      topic: 'Forme trigonométrique, puissances et calcul de cos(7π/12)',
      enonce: `On considère le nombre complexe :
$$a = \\sqrt{2 - \\sqrt{3}} - i\\sqrt{2 + \\sqrt{3}}$$

1. Calculer $a^2$ sous forme algébrique.
2. Déterminer le module et un argument de $a^2$.
3. En déduire la forme trigonométrique de $a$, puis les valeurs exactes de $\\cos\\left(\\frac{7\\pi}{12}\\right)$ et $\\sin\\left(\\frac{7\\pi}{12}\\right)$.`,
      solution: `### 1. Calcul de $a^2$
$$a^2 = (2 - \\sqrt{3}) - (2 + \\sqrt{3}) - 2i\\sqrt{(2-\\sqrt{3})(2+\\sqrt{3})} = -2\\sqrt{3} - 2i\\sqrt{4 - 3} = -2\\sqrt{3} - 2i$$

### 2. Module et argument de $a^2$
$$|a^2| = \\sqrt{(-2\\sqrt{3})^2 + (-2)^2} = \\sqrt{12 + 4} = 4$$
$$\\cos \\theta = -\\frac{\\sqrt{3}}{2} \\quad \\text{et} \\quad \\sin \\theta = -\\frac{1}{2} \\implies \\arg(a^2) = -\\frac{5\\pi}{6} \\; [2\\pi]$$

### 3. Déduction pour $a$
$|a| = \\sqrt{|a^2|} = \\sqrt{4} = 2$.  
Comme la partie réelle de $a$ est positive et sa partie imaginaire négative, $\\arg(a) = -\\frac{5\\pi}{12}$.  
On en déduit par changement d'angle les valeurs remarquables de $\\cos(7\\pi/12) = \\frac{\\sqrt{2} - \\sqrt{6}}{4}$.`,
      baremeAstuce: 'Utilisez l\'identité remarquable $(A - B)^2 = A^2 - 2AB + B^2$ avec soin lors du calcul de $a^2$.',
    },
  ],

  // 10. DÉNOMBREMENT & PROBABILITÉS
  probabilites: [
    {
      year: 2021,
      session: 'Session Normale (S2)',
      points: 'Exercice 1 (5 Points)',
      topic: 'Arbre pondéré, probabilités totales & Variable aléatoire binomiale',
      enonce: `On dispose de deux urnes $U_1$ et $U_2$.
- L'urne $U_1$ contient 4 boules noires et 3 boules blanches.
- L'urne $U_2$ contient 3 boules noires et 2 boules blanches.
Une épreuve consiste à lancer un dé équilibré à 6 faces.
- Si le dé donne 6, on tire une boule dans $U_1$.
- Si le dé donne un résultat différent de 6, on tire une boule dans $U_2$.

1. Construire l'arbre pondéré associé à cette expérience.
2. Calculer la probabilité de tirer une boule blanche.
3. Sachant que la boule tirée est blanche, quelle est la probabilité qu'elle provienne de l'urne $U_1$ ?
4. On répète 4 fois de suite cette expérience de façon indépendante. Soit $X$ la variable aléatoire désignant le nombre de fois où l'on obtient une boule blanche. Déterminer la loi de probabilité et l'espérance de $X$.`,
      solution: `### 1. Arbre pondéré
- $P(U_1) = 1/6$ et $P(U_2) = 5/6$.
- Dans $U_1$ : $P_{U_1}(B) = 3/7$ et $P_{U_1}(N) = 4/7$.
- Dans $U_2$ : $P_{U_2}(B) = 2/5$ et $P_{U_2}(N) = 3/5$.

### 2. Probabilité totale de $B$
$$P(B) = P(U_1) \\cdot P_{U_1}(B) + P(U_2) \\cdot P_{U_2}(B) = \\frac{1}{6} \\times \\frac{3}{7} + \\frac{5}{6} \\times \\frac{2}{5} = \\frac{1}{14} + \\frac{1}{3} = \\frac{3 + 14}{42} = \\frac{17}{42}$$

### 3. Probabilité conditionnelle
$$P_B(U_1) = \\frac{P(U_1 \\cap B)}{P(B)} = \\frac{1/14}{17/42} = \\frac{1}{14} \\times \\frac{42}{17} = \\frac{3}{17}$$

### 4. Loi binomiale de $X$
$X$ suit la loi binomiale $\\mathcal{B}(n = 4,\\; p = 17/42)$.  
Pour tout $k \\in \\{0, 1, 2, 3, 4\\}$ :
$$P(X = k) = C_4^k \\left(\\frac{17}{42}\\right)^k \\left(\\frac{25}{42}\\right)^{4-k}$$
Espérance : $E(X) = n \\cdot p = 4 \\times \\frac{17}{42} = \\frac{34}{21} \\approx 1,62$.`,
      baremeAstuce: 'Vérifiez toujours que la somme des probabilités issues d\'un même nœud de l\'arbre vaut 1.',
    },
    {
      year: 2020,
      session: 'Session Normale (S2)',
      points: 'Exercice 2 (3 Points)',
      topic: 'Lancer de deux dés, somme des faces & Événements indépendants',
      enonce: `On lance simultanément deux dés cubiques équilibrés dont les faces sont numérotées de 1 à 6. On note $S$ la somme des deux chiffres obtenus.
1. Quel est le nombre total d'issues possibles ?
2. Calculer la probabilité d'obtenir une somme égale à 9 (événement $A$).
3. Deux joueurs Marame et Birane lancent chacun leurs deux dés de manière indépendante. Calculer la probabilité qu'ils obtiennent tous les deux une somme égale à 9.`,
      solution: `### 1. Total d'issues
$\\text{Card}(\\Omega) = 6 \\times 6 = 36$.

### 2. Somme égale à 9
Les couples favorables sont : $(3,6), (4,5), (5,4), (6,3)$, soit 4 couples.  
$$P(A) = \\frac{4}{36} = \\frac{1}{9}$$

### 3. Indépendance
Comme les lancers de Marame et Birane sont indépendants :
$$P(\\text{Deux fois 9}) = P(A) \\times P(A) = \\frac{1}{9} \\times \\frac{1}{9} = \\frac{1}{81}$$`,
      baremeAstuce: 'Dressez un tableau double entrée $6 \\times 6$ au brouillon pour ne rater aucun couple de somme 9.',
    },
  ],

  // 11. STATISTIQUES
  statistiques: [
    {
      year: 2019,
      session: 'Session Normale (S2)',
      points: 'Exercice 2 (4 Points)',
      topic: 'Série statistique double, point moyen G et droite des moindres carrés',
      enonce: `Le tableau suivant donne le budget publicitaire $x_i$ (en millions FCFA) et le chiffre d'affaires $y_i$ (en dizaines de millions FCFA) d'une entreprise sénégalaise sur 5 années :
$$\\begin{array}{|c|c|c|c|c|c|}
\\hline
x_i & 1 & 2 & 3 & 4 & 5 \\\\
\\hline
y_i & 12 & 15 & 19 & 22 & 27 \\\\
\\hline
\\end{array}$$

1. Représenter le nuage de points et calculer les coordonnées du point moyen $G(\\bar{x}, \\bar{y})$.
2. Calculer la covariance $Cov(X, Y)$ et la variance $V(X)$.
3. Déterminer une équation de la droite de régression de $Y$ en $X$ par la méthode des moindres carrés.
4. Calculer le coefficient de corrélation linéaire $r$ sachant que $V(Y) = 28,4$. L'ajustement linéaire est-il justifié ?
5. Estimer le chiffre d'affaires prévisible pour un budget publicitaire de $7$ millions FCFA.`,
      solution: `### 1. Point Moyen $G$
$$\\bar{x} = \\frac{1 + 2 + 3 + 4 + 5}{5} = \\frac{15}{5} = 3$$
$$\\bar{y} = \\frac{12 + 15 + 19 + 22 + 27}{5} = \\frac{95}{5} = 19$$
$$G(3, 19)$$

### 2. Covariance et Variance
- $\\sum x_i^2 = 1 + 4 + 9 + 16 + 25 = 55 \\implies V(X) = \\frac{55}{5} - 3^2 = 11 - 9 = 2$.
- $\\sum x_i y_i = 12 + 30 + 57 + 88 + 135 = 322$.
$$Cov(X, Y) = \\frac{322}{5} - (3 \\times 19) = 64,4 - 57 = 7,4$$

### 3. Droite de régression $(D) : y = ax + b$
$$a = \\frac{Cov(X, Y)}{V(X)} = \\frac{7,4}{2} = 3,7$$
$$b = \\bar{y} - a\\bar{x} = 19 - 3,7(3) = 19 - 11,1 = 7,9$$
$$(D) : y = 3,7x + 7,9$$

### 4. Coefficient $r$
$$r = \\frac{Cov(X, Y)}{\\sqrt{V(X) \\cdot V(Y)}} = \\frac{7,4}{\\sqrt{2 \\times 28,4}} = \\frac{7,4}{\\sqrt{56,8}} = \\frac{7,4}{7,536} \\approx 0,982$$
Comme $|r| = 0,982 > 0,87$, il existe une très forte corrélation linéaire : l'ajustement est parfaitement justifié.

### 5. Prévision pour $x = 7$
$$y(7) = 3,7(7) + 7,9 = 25,9 + 7,9 = 33,8 \\text{ dizaines de millions} = 338 \\text{ millions FCFA}$$`,
      baremeAstuce: 'Toujours préciser les unités lors de la réponse finale aux questions de prévision économique.',
    },
  ],

  // 12. GÉOMÉTRIE DANS L'ESPACE
  geometrie: [
    {
      year: 2021,
      session: 'Session de Remplacement (S2)',
      points: 'Exercice 1 (4 Points)',
      topic: 'Repère orthonormé, équation cartésienne de plan, vecteur normal et distance',
      enonce: `L'espace est rapporté à un repère orthonormé direct $(O; \\vec{i}, \\vec{j}, \\vec{k})$. On considère les points $A(1, 0, 2)$, $B(2, 1, 0)$ et $C(0, 2, 1)$.
1. Montrer que les points $A$, $B$ et $C$ définissent un unique plan $(P)$.
2. Démontrer que le vecteur $\\vec{n}(1, 1, 1)$ est un vecteur normal au plan $(P)$ et en déduire une équation cartésienne de $(P)$.
3. Calculer la distance du point $D(3, -1, 4)$ au plan $(P)$.
4. Soit la sphère $(\\mathcal{S})$ de centre $D$ et de rayon $R = 3$. Déterminer la nature et les caractéristiques de l'intersection de $(\\mathcal{S})$ avec $(P)$.`,
      solution: `### 1. Points non alignés
$\\vec{AB}(1, 1, -2)$ et $\\vec{AC}(-1, 2, -1)$.  
Les coordonnées ne sont pas proportionnelles ($-1/1 \\ne 2/1$), donc les vecteurs ne sont pas colinéaires. $A, B, C$ définissent un unique plan $(P)$.

### 2. Vecteur normal $\\vec{n}(1, 1, 1)$
$$\\vec{n} \\cdot \\vec{AB} = 1(1) + 1(1) + 1(-2) = 1 + 1 - 2 = 0$$
$$\\vec{n} \\cdot \\vec{AC} = 1(-1) + 1(2) + 1(-1) = -1 + 2 - 1 = 0$$
$\\vec{n}$ est orthogonal à deux vecteurs non colinéaires du plan, c'est donc un vecteur normal à $(P)$.  
Équation : $1x + 1y + 1z + d = 0$. Comme $A(1, 0, 2) \\in (P)$ : $1 + 0 + 2 + d = 0 \\implies d = -3$.  
$$(P) : x + y + z - 3 = 0$$

### 3. Distance de $D(3, -1, 4)$
$$d(D, P) = \\frac{|1(3) + 1(-1) + 1(4) - 3|}{\\sqrt{1^2 + 1^2 + 1^2}} = \\frac{|3 - 1 + 4 - 3|}{\\sqrt{3}} = \\frac{3}{\\sqrt{3}} = \\sqrt{3} \\approx 1,732$$

### 4. Intersection avec la sphère $\\mathcal{S}(D, R = 3)$
Comme $d = \\sqrt{3} < R = 3$, le plan coupe la sphère selon un **cercle** de centre $H$ (projeté orthogonal de $D$ sur $P$) et de rayon :
$$r = \\sqrt{R^2 - d^2} = \\sqrt{3^2 - (\\sqrt{3})^2} = \\sqrt{9 - 3} = \\sqrt{6} \\approx 2,45$$`,
      baremeAstuce: 'Penser à vérifier que $\\vec{n} \\cdot \\vec{AB} = 0$ et $\\vec{n} \\cdot \\vec{AC} = 0$ pour valider le vecteur normal.',
    },
  ],
};

interface BacSenegalAnnalesProps {
  chapter?: string;
}

export default function BacSenegalAnnales({ chapter = 'limites' }: BacSenegalAnnalesProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Fallback to limites if chapter key not found
  const annalesList = BAC_ANNALES_BY_CHAPTER[chapter] || BAC_ANNALES_BY_CHAPTER.limites;

  return (
    <div className="my-10 space-y-6">
      {/* En-tête de section Bac */}
      <div className="rounded-3xl bg-navy p-5 sm:p-7 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-bold text-emerald-400 mb-2 border border-emerald-500/30">
            <StudyIcon name="diplome_bac" size={16} />
            <span>Archives Officielles Office du Baccalauréat Sénégal (Depuis 2000)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Annales Ciblées du Baccalauréat S2
          </h2>
          <p className="text-xs sm:text-sm text-surface-muted mt-1 max-w-xl">
            Véritables exercices extraits des épreuves officielles sénégalaises correspondant exactement à ce chapitre, avec le barème officiel et les corrigés pas à pas.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2 bg-white/10 px-4 py-2 rounded-2xl border border-white/10">
          <StudyIcon name="cible_reflexe" size={20} className="text-turquoise" />
          <span className="text-xs font-bold text-turquoise">
            {annalesList.length} Sujet{annalesList.length > 1 ? 's' : ''} Officiel{annalesList.length > 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Liste des épreuves réelles */}
      <div className="space-y-4">
        {annalesList.map((item, idx) => {
          const isOpen = openIndex === idx;

          return (
            <Card
              key={`${item.year}-${idx}`}
              className="border-navy/10 overflow-hidden shadow-sm transition-all hover:border-turquoise/40"
            >
              <CardHeader
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="cursor-pointer bg-white hover:bg-surface/50 p-4 sm:p-6 transition-colors"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 bg-navy text-white text-xs sm:text-sm font-black rounded-xl shrink-0">
                      Bac {item.year}
                    </span>
                    <div>
                      <CardTitle className="text-base sm:text-lg font-bold text-navy flex items-center gap-2">
                        <span>{item.session}</span>
                      </CardTitle>
                      <p className="text-xs text-navy/60 mt-0.5">
                        {item.topic}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-center">
                    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold border border-turquoise text-turquoise">
                      {item.points}
                    </span>
                    <span className="text-navy/40 font-bold text-xs ml-1">
                      {isOpen ? '▲ Masquer' : '▼ Voir le Corrigé'}
                    </span>
                  </div>
                </div>
              </CardHeader>

              {isOpen && (
                <CardContent className="p-4 sm:p-6 pt-2 border-t border-navy/5 bg-slate-50/50 space-y-6">
                  {/* Énoncé Officiel */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-white border border-navy/10 shadow-sm">
                    <div className="flex items-center gap-2 mb-3 text-navy font-bold text-sm">
                      <StudyIcon name="exercice_crayon" size={18} />
                      <span>Énoncé Officiel de l&apos;Épreuve</span>
                    </div>
                    <div className="text-xs sm:text-sm text-navy/90 overflow-x-auto leading-relaxed">
                      <MathRenderer content={item.enonce} />
                    </div>
                  </div>

                  {/* Corrigé Détaillé */}
                  <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/60 shadow-sm">
                    <div className="flex items-center gap-2 mb-3 text-emerald-800 font-bold text-sm">
                      <StudyIcon name="cle_solution" size={18} />
                      <span>Corrigé Officiel &amp; Démarche Pas à Pas</span>
                    </div>
                    <div className="text-xs sm:text-sm text-emerald-950 overflow-x-auto leading-relaxed">
                      <MathRenderer content={item.solution} />
                    </div>
                  </div>

                  {/* Barème & Astuce Office du Bac */}
                  <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/60 flex items-start gap-3">
                    <div className="text-amber-600 shrink-0 mt-0.5">
                      <StudyIcon name="ampoule_astuce" size={20} />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-0.5">
                        Barème &amp; Critères de notation Office du Bac
                      </span>
                      <p className="text-xs sm:text-sm text-amber-900 font-medium">
                        {item.baremeAstuce}
                      </p>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}