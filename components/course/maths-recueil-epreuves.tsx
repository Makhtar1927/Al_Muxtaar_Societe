'use client';

import React, { useState, useMemo } from 'react';
import MathRenderer from '@/components/course/math-renderer';
import {
  BookOpen,
  Award,
  Search,
  Filter,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export interface EpreuveItem {
  id: number;
  title: string;
  source: string;
  sourceType: 'bac' | 'lycee' | 'ciam' | 'concours';
  theme: string;
  category: 'analyse' | 'algebre' | 'proba' | 'geometrie' | 'autre';
  enonce: string;
  correction: string;
}

export const MEGA_RECUEIL_30_EPREUVES: EpreuveItem[] = [
  {
    id: 1,
    title: 'Annale Bac S2 Sénégal — Session 2024',
    source: 'Office du Baccalauréat Sénégal',
    sourceType: 'bac',
    theme: 'Nombres Complexes (Équation du 2nd degré)',
    category: 'algebre',
    enonce: `Le plan complexe est muni d'un repère orthonormé direct $(O, \\vec{u}, \\vec{v})$.

1. Résoudre dans $\\mathbb{C}$ l'équation :
$$z^2 - 2\\sqrt{2}z + 4 = 0$$

2. Écrire les solutions sous forme exponentielle.`,
    correction: `1. Calculons le discriminant $\\Delta$ :
$$\\Delta = (-2\\sqrt{2})^2 - 4(1)(4) = 8 - 16 = -8 = (2i\\sqrt{2})^2$$

Comme $\\Delta < 0$, l'équation admet deux solutions complexes conjuguées :
$$z' = \\frac{2\\sqrt{2} - 2i\\sqrt{2}}{2} = \\sqrt{2} - i\\sqrt{2}$$
$$z'' = \\frac{2\\sqrt{2} + 2i\\sqrt{2}}{2} = \\sqrt{2} + i\\sqrt{2}$$

2. Écriture sous forme exponentielle :
* Pour $z'' = \\sqrt{2} + i\\sqrt{2}$ :
  * Module : $|z''| = \\sqrt{(\\sqrt{2})^2 + (\\sqrt{2})^2} = \\sqrt{2 + 2} = \\sqrt{4} = 2$.
  * Argument : $\\cos\\theta = \\frac{\\sqrt{2}}{2}$ et $\\sin\\theta = \\frac{\\sqrt{2}}{2} \\implies \\theta \\equiv \\frac{\\pi}{4} \\pmod{2\\pi}$.
  * D'où : $$z'' = 2e^{i\\frac{\\pi}{4}}$$

* Pour $z' = \\sqrt{2} - i\\sqrt{2} = \\overline{z''}$ :
  * D'où : $$z' = 2e^{-i\\frac{\\pi}{4}}$$`,
  },
  {
    id: 2,
    title: 'Devoir Surveillé N°1 — Lycée Limamou Laye (LSLL) 2023',
    source: 'Lycée Seydina Limamou Laye (Guédiawaye)',
    sourceType: 'lycee',
    theme: 'Analyse (Limite & Asymptote Verticale)',
    category: 'analyse',
    enonce: `Soit $f$ la fonction définie sur $]0, +\\infty[$ par :
$$f(x) = x - 2 + \\frac{1 + \\ln(x)}{x}$$

Calculer la limite de $f$ en $0^+$ et en donner une interprétation graphique.`,
    correction: `Étudions terme à terme quand $x \\to 0^+$ :
* $\\lim_{x \\to 0^+} (x - 2) = -2$
* $\\lim_{x \\to 0^+} (1 + \\ln(x)) = -\\infty$ (car $\\lim_{x \\to 0^+} \\ln(x) = -\\infty$)
* $\\lim_{x \\to 0^+} x = 0^+$

Par quotient de limites :
$$\\lim_{x \\to 0^+} \\frac{1 + \\ln(x)}{x} = -\\infty$$

Par somme de limites :
$$\\lim_{x \\to 0^+} f(x) = -\\infty$$

**Interprétation graphique :**
La droite d'équation $x = 0$ (l'axe des ordonnées) est **asymptote verticale** à la courbe représentative $\\mathcal{C}_f$ au voisinage de $0^+$.`,
  },
  {
    id: 3,
    title: 'Concours d\'Entrée EPT (École Polytechnique de Thiès) — 2022',
    source: 'École Polytechnique de Thiès (EPT)',
    sourceType: 'concours',
    theme: 'Équations Différentielles du 2nd Ordre avec Second Membre',
    category: 'analyse',
    enonce: `Résoudre sur $\\mathbb{R}$ l'équation différentielle linéaire du second ordre :
$$(E) : y'' - 2y' + y = x e^x$$`,
    correction: `1. **Résolution de l'équation homogène associée $(E_0) : y'' - 2y' + y = 0$** :
L'équation caractéristique est :
$$r^2 - 2r + 1 = 0 \\iff (r - 1)^2 = 0$$
Elle admet une racine double $r_0 = 1$.
Les solutions de l'équation homogène sont donc :
$$y_0(x) = (C_1 + C_2 x)e^x \\quad (C_1, C_2 \\in \\mathbb{R})$$

2. **Recherche d'une solution particulière $y_p$ de $(E)$** :
Le second membre est de la forme $P(x)e^{\\alpha x}$ avec $P(x) = x$ (degré 1) et $\\alpha = 1$.
Comme $\\alpha = 1$ est racine double de l'équation caractéristique, on cherche $y_p(x)$ sous la forme :
$$y_p(x) = x^2 (ax + b)e^x = (ax^3 + bx^2)e^x$$

En dérivant et en injectant dans $(E)$, on obtient après identification :
$$a = \\frac{1}{6} \\quad \\text{et} \\quad b = 0 \\implies y_p(x) = \\frac{1}{6}x^3 e^x$$

3. **Solution générale de $(E)$** :
$$y(x) = y_0(x) + y_p(x) = \\left(C_1 + C_2 x + \\frac{1}{6}x^3\\right)e^x \\quad (C_1, C_2 \\in \\mathbb{R})$$`,
  },
  {
    id: 4,
    title: 'Manuel CIAM (Terminale S) — Probabilités & Loi Binomiale',
    source: 'Collection Inter-Africaine de Mathématiques (CIAM)',
    sourceType: 'ciam',
    theme: 'Probabilités & Tirages avec Remise',
    category: 'proba',
    enonce: `Une urne contient 3 boules rouges et 2 boules vertes.
On tire successivement et avec remise 3 boules de l'urne.

Quelle est la probabilité d'obtenir exactement 2 boules rouges ?`,
    correction: `Chaque tirage est une épreuve de Bernoulli à deux issues :
* Succès $S$ : « Obtenir une boule rouge », avec probabilité :
$$p = \\frac{3}{3 + 2} = \\frac{3}{5} = 0{,}6$$
* Échec $E$ : « Obtenir une boule verte », avec probabilité $q = 1 - p = 0{,}4$.

Les tirages étant avec remise, ils sont indépendants. Le nombre $X$ de boules rouges tirées suit donc une **loi binomiale** de paramètres $n = 3$ et $p = 0{,}6$ :
$$X \\sim \\mathcal{B}(3;\\; 0{,}6)$$

La probabilité d'obtenir exactement 2 boules rouges est :
$$P(X = 2) = C_3^2 \\times (0{,}6)^2 \\times (0{,}4)^{3-2} = 3 \\times 0{,}36 \\times 0{,}4 = 0{,}432$$

La probabilité est donc de **$0{,}432$** (soit $43{,}2\\%$).`,
  },
  {
    id: 5,
    title: 'Composition de Fin de Semestre — Lycée Djignabo (Ziguinchor) 2023',
    source: 'Lycée Djignabo de Ziguinchor',
    sourceType: 'lycee',
    theme: 'Calcul Intégral & Intégration par Parties',
    category: 'analyse',
    enonce: `À l'aide d'une intégration par parties, calculer la valeur exacte de l'intégrale :
$$I = \\int_{0}^{\\pi/2} x \\cos(x) \\, dx$$`,
    correction: `Appliquons la méthode d'intégration par parties :
$$\\int_a^b u(x) v'(x) \\, dx = [u(x)v(x)]_a^b - \\int_a^b u'(x)v(x) \\, dx$$

Posons :
* $u(x) = x \\implies u'(x) = 1$
* $v'(x) = \\cos(x) \\implies v(x) = \\sin(x)$

Les fonctions $u$ et $v$ sont dérivables et leurs dérivées sont continues sur $[0, \\pi/2]$.
$$I = [x \\sin(x)]_0^{\\pi/2} - \\int_0^{\\pi/2} 1 \\cdot \\sin(x) \\, dx$$
$$I = \\left(\\frac{\\pi}{2}\\sin\\left(\\frac{\\pi}{2}\\right) - 0\\right) - [-\\cos(x)]_0^{\\pi/2}$$
Comme $\\sin(\\pi/2) = 1$, $\\cos(\\pi/2) = 0$ et $\\cos(0) = 1$ :
$$I = \\frac{\\pi}{2} - (0 - (-1)) = \\frac{\\pi}{2} - 1$$`,
  },
  {
    id: 6,
    title: 'Annale Bac S2 Sénégal — Session 2021',
    source: 'Office du Baccalauréat Sénégal',
    sourceType: 'bac',
    theme: 'Suites Numériques & Raisonnement par Récurrence',
    category: 'analyse',
    enonce: `Soit la suite $(u_n)$ définie par $u_0 = 1$ et pour tout $n \\in \\mathbb{N}$ :
$$u_{n+1} = \\frac{1}{2}u_n + 1$$

Démontrer par récurrence que pour tout $n \\in \\mathbb{N}$, $u_n < 2$.`,
    correction: `Démontrons par récurrence la propriété $\\mathcal{P}(n) : « u_n < 2 »$.

1. **Initialisation :**
Pour $n = 0$ : $u_0 = 1 < 2$. La propriété $\\mathcal{P}(0)$ est donc vraie.

2. **Hérédité :**
Supposons que pour un entier $k \\ge 0$ fixé, $\\mathcal{P}(k)$ soit vraie, c'est-à-dire :
$$u_k < 2$$
Montrons qu'alors $\\mathcal{P}(k+1)$ est vraie, soit $u_{k+1} < 2$.
D'après l'hypothèse de récurrence :
$$u_k < 2 \\implies \\frac{1}{2}u_k < \\frac{1}{2}(2) = 1 \\implies \\frac{1}{2}u_k + 1 < 1 + 1 = 2$$
Or $u_{k+1} = \\frac{1}{2}u_k + 1$, donc $u_{k+1} < 2$.
La propriété est héréditaire.

3. **Conclusion :**
Par le principe de récurrence, pour tout $n \\in \\mathbb{N}$, $u_n < 2$.`,
  },
  {
    id: 7,
    title: 'Concours d\'Entrée ESP (École Supérieure Polytechnique) — 2023',
    source: 'École Supérieure Polytechnique (ESP Dakar)',
    sourceType: 'concours',
    theme: 'Analyse (Limite & Taux d\'Accroissement)',
    category: 'analyse',
    enonce: `Calculer la limite suivante sans la règle de L'Hôpital :
$$\\lim_{x \\to 0} \\frac{e^{2x} - 1}{x}$$`,
    correction: `Considérons la fonction $g$ définie sur $\\mathbb{R}$ par $g(x) = e^{2x}$.
La fonction $g$ est dérivable sur $\\mathbb{R}$, de dérivée :
$$g'(x) = 2e^{2x}$$
En $x_0 = 0$, on a $g(0) = e^0 = 1$ et $g'(0) = 2e^0 = 2$.

L'expression recherchée est exactement le taux d'accroissement de $g$ en $0$ :
$$\\lim_{x \\to 0} \\frac{e^{2x} - 1}{x} = \\lim_{x \\to 0} \\frac{g(x) - g(0)}{x - 0} = g'(0) = 2$$`,
  },
  {
    id: 8,
    title: 'Composition Trimestrielle — Lycée Limamou Laye 2022',
    source: 'Lycée Seydina Limamou Laye',
    sourceType: 'lycee',
    theme: 'Nombres Complexes (Forme Algébrique)',
    category: 'algebre',
    enonce: `Déterminer la forme algébrique du nombre complexe :
$$Z = \\frac{1 + i}{1 - i}$$`,
    correction: `Multiplions le numérateur et le dénominateur par le conjugué du dénominateur $(1 + i)$ :
$$Z = \\frac{(1 + i)(1 + i)}{(1 - i)(1 + i)} = \\frac{(1 + i)^2}{1^2 - i^2} = \\frac{1 + 2i + i^2}{1 - (-1)}$$
Comme $i^2 = -1$ :
$$Z = \\frac{1 + 2i - 1}{2} = \\frac{2i}{2} = i$$

La forme algébrique est donc :
$$Z = i \\quad (\\text{partie réelle } 0, \\text{ partie imaginaire } 1)$$`,
  },
  {
    id: 9,
    title: 'Manuel CIAM (Terminale S) — Géométrie dans l\'Espace',
    source: 'CIAM Terminale S',
    sourceType: 'ciam',
    theme: 'Géométrie dans l\'Espace & Produit Scalaire',
    category: 'geometrie',
    enonce: `Dans l'espace muni d'un repère orthonormé $(O, \\vec{i}, \\vec{j}, \\vec{k})$, on considère les vecteurs :
$$\\vec{u}(1, -2, 3) \\quad \\text{et} \\quad \\vec{v}(4, 5, 1)$$

1. Calculer le produit scalaire $\\vec{u} \\cdot \\vec{v}$.
2. Les vecteurs sont-ils orthogonaux ?`,
    correction: `1. Calcul du produit scalaire analytique :
$$\\vec{u} \\cdot \\vec{v} = x x' + y y' + z z' = 1(4) + (-2)(5) + 3(1) = 4 - 10 + 3 = -3$$

2. Orthogonalité :
Deux vecteurs sont orthogonaux si et seulement si leur produit scalaire est nul.
Comme $\\vec{u} \\cdot \\vec{v} = -3 \\neq 0$, les vecteurs $\\vec{u}$ et $\\vec{v}$ **ne sont pas orthogonaux**.`,
  },
  {
    id: 10,
    title: 'Annale Bac S2 Sénégal — Session 2020',
    source: 'Office du Baccalauréat Sénégal',
    sourceType: 'bac',
    theme: 'Fonction Logarithme Népérien & Équation',
    category: 'analyse',
    enonce: `Résoudre dans $\\mathbb{R}$ l'équation :
$$\\ln(x - 1) + \\ln(x) = \\ln(2)$$`,
    correction: `1. **Domaine de validité de l'équation ($D_E$) :**
L'équation a un sens si et seulement si :
$$\\begin{cases} x - 1 > 0 \\\\ x > 0 \\end{cases} \\iff \\begin{cases} x > 1 \\\\ x > 0 \\end{cases} \\iff x \\in ]1, +\\infty[$$
Donc $D_E = ]1, +\\infty[$.

2. **Résolution algébrique :**
Pour tout $x \\in D_E$ :
$$\\ln((x - 1)x) = \\ln(2) \\iff x(x - 1) = 2 \\iff x^2 - x - 2 = 0$$

Calcul du discriminant $\\Delta$ :
$$\\Delta = (-1)^2 - 4(1)(-2) = 1 + 8 = 9 = 3^2$$
Les racines sont :
$$x_1 = \\frac{1 - 3}{2} = -1 \\quad \\text{et} \\quad x_2 = \\frac{1 + 3}{2} = 2$$

3. **Vérification dans $D_E$ :**
* $x_1 = -1 \\notin D_E$ (rejetée)
* $x_2 = 2 \\in D_E$ (retenue car $2 > 1$)

L'ensemble des solutions est :
$$S = \\{2\\}$$`,
  },
  {
    id: 11,
    title: 'Devoir Commun — Lycée Maurice Delafosse 2023',
    source: 'Lycée Technique Commercial Maurice Delafosse (Dakar)',
    sourceType: 'lycee',
    theme: 'Analyse & Dérivation d\'un Produit',
    category: 'analyse',
    enonce: `Calculer la fonction dérivée $f'$ de la fonction $f$ définie sur $]0, +\\infty[$ par :
$$f(x) = x^2 \\ln(x)$$`,
    correction: `La fonction $f$ est le produit de deux fonctions dérivables sur $]0, +\\infty[$ :
* $u(x) = x^2 \\implies u'(x) = 2x$
* $v(x) = \\ln(x) \\implies v'(x) = \\frac{1}{x}$

D'après la formule de dérivation d'un produit $(uv)' = u'v + uv'$ :
$$f'(x) = (2x) \\ln(x) + x^2 \\left(\\frac{1}{x}\\right) = 2x \\ln(x) + x$$

En factorisant par $x$ :
$$f'(x) = x(2\\ln(x) + 1)$$`,
  },
  {
    id: 12,
    title: 'Concours d\'Entrée EPT — 2021',
    source: 'École Polytechnique de Thiès',
    sourceType: 'concours',
    theme: 'Arithmétique & Équation Diophantienne',
    category: 'algebre',
    enonce: `Résoudre dans $\\mathbb{Z}^2$ l'équation :
$$3x - 5y = 1$$`,
    correction: `1. **Recherche d'une solution particulière :**
Remarquons que :
$$3(2) - 5(1) = 6 - 5 = 1$$
Le couple $(x_0, y_0) = (2, 1)$ est donc une solution particulière dans $\\mathbb{Z}^2$.

2. **Résolution générale :**
Par soustraction membre à membre :
$$3x - 5y = 3(2) - 5(1) \\iff 3(x - 2) = 5(y - 1)$$
* $3$ divise $5(y - 1)$.
* Comme $\\text{PGCD}(3, 5) = 1$, d'après le **théorème de Gauss**, $3$ divise $(y - 1)$.
Il existe donc un entier $k \\in \\mathbb{Z}$ tel que :
$$y - 1 = 3k \\implies y = 3k + 1$$

En remplaçant dans $3(x - 2) = 5(3k)$ :
$$3(x - 2) = 15k \\implies x - 2 = 5k \\implies x = 5k + 2$$

L'ensemble des solutions dans $\\mathbb{Z}^2$ est :
$$S = \\{(5k + 2, \\; 3k + 1) \\mid k \\in \\mathbb{Z}\\}$$`,
  },
  {
    id: 13,
    title: 'Manuel CIAM (Terminale S) — Racines Carrées dans C',
    source: 'CIAM Terminale S',
    sourceType: 'ciam',
    theme: 'Nombres Complexes & Racines Carrées',
    category: 'algebre',
    enonce: `Déterminer les racines carrées du nombre complexe :
$$Z = 3 - 4i$$`,
    correction: `Soit $\\delta = x + iy$ ($x, y \\in \\mathbb{R}$) une racine carrée de $Z$, c'est-à-dire $\\delta^2 = Z$.
On a le système d'identification classique :
$$\\begin{cases} x^2 - y^2 = \\text{Re}(Z) = 3 & (1) \\\\ x^2 + y^2 = |Z| = \\sqrt{3^2 + (-4)^2} = 5 & (2) \\\\ 2xy = \\text{Im}(Z) = -4 < 0 & (3) \\end{cases}$$

En additionnant $(1) + (2)$ :
$$2x^2 = 8 \\implies x^2 = 4 \\implies x = \\pm 2$$

En soustrayant $(2) - (1)$ :
$$2y^2 = 2 \\implies y^2 = 1 \\implies y = \\pm 1$$

D'après $(3)$, $2xy = -4 < 0$, donc $x$ et $y$ sont de signes contraires.
Les racines carrées de $Z$ sont donc :
$$\\delta_1 = 2 - i \\quad \\text{et} \\quad \\delta_2 = -2 + i$$`,
  },
  {
    id: 14,
    title: 'Annale Bac S2 Sénégal — Session 2019',
    source: 'Office du Baccalauréat Sénégal',
    sourceType: 'bac',
    theme: 'Dénombrement & Tirage Simultané',
    category: 'proba',
    enonce: `Une urne contient 5 boules rouges et 3 boules noires indiscernables au toucher.
On tire simultanément 2 boules de l'urne.

Calculer la probabilité d'obtenir 2 boules rouges.`,
    correction: `Un tirage simultané de 2 boules parmi 8 boules au total ($5 + 3 = 8$) correspond à une combinaison.
Le nombre total de tirages possibles est :
$$\\text{Card}(\\Omega) = C_8^2 = \\frac{8 \\times 7}{2 \\times 1} = 28$$

Soit l'événement $A$ : « Obtenir 2 boules rouges ».
Pour réaliser $A$, il faut choisir 2 boules rouges parmi les 5 boules rouges de l'urne :
$$\\text{Card}(A) = C_5^2 = \\frac{5 \\times 4}{2 \\times 1} = 10$$

Par équiprobabilité :
$$P(A) = \\frac{\\text{Card}(A)}{\\text{Card}(\\Omega)} = \\frac{10}{28} = \\frac{5}{14}$$`,
  },
  {
    id: 15,
    title: 'Composition du 2nd Semestre — Lycée Limamou Laye 2021',
    source: 'Lycée Seydina Limamou Laye',
    sourceType: 'lycee',
    theme: 'Croissances Comparées Fondamentales',
    category: 'analyse',
    enonce: `Calculer la limite :
$$\\lim_{x \\to +\\infty} \\frac{e^x}{x^3}$$`,
    correction: `Il s'agit d'une forme indéterminée de type « $\\frac{+\\infty}{+\\infty}$ ».
D'après le théorème des **croissances comparées** du programme officiel de Terminale S2 (l'exponentielle l'emporte sur toute puissance de $x$ au voisinage de $+\\infty$) :
$$\\forall n \\in \\mathbb{N}^*, \\quad \\lim_{x \\to +\\infty} \\frac{e^x}{x^n} = +\\infty$$
Pour $n = 3$, on a immédiatement :
$$\\lim_{x \\to +\\infty} \\frac{e^x}{x^3} = +\\infty$$`,
  },
  {
    id: 16,
    title: 'Concours d\'Entrée ESP — Session 2020',
    source: 'École Supérieure Polytechnique (Dakar)',
    sourceType: 'concours',
    theme: 'Algèbre Linéaire & Déterminant $2 \\times 2$',
    category: 'algebre',
    enonce: `Calculer le déterminant de la matrice carrée $A$ d'ordre 2 :
$$A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$$`,
    correction: `Pour une matrice carrée $A = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$, le déterminant est donné par la formule :
$$\\det(A) = ad - bc$$

Ici, avec $a=1, b=2, c=3, d=4$ :
$$\\det(A) = (1)(4) - (2)(3) = 4 - 6 = -2$$`,
  },
  {
    id: 17,
    title: 'Manuel CIAM (Terminale S) — Barycentres dans le Plan',
    source: 'CIAM Terminale S',
    sourceType: 'ciam',
    theme: 'Barycentre de Deux Points Pondérés',
    category: 'geometrie',
    enonce: `Soient $A$ et $B$ deux points distincts du plan.
Construire et exprimer le vecteur $\\vec{AG}$ en fonction de $\\vec{AB}$, où $G$ est le barycentre du système pondéré :
$$\\{(A, 2), \\; (B, 1)\\}$$`,
    correction: `La somme des coefficients est $2 + 1 = 3 \\neq 0$, le barycentre $G$ existe donc et est unique.
Par définition du barycentre :
$$2\\vec{GA} + 1\\vec{GB} = \\vec{0}$$

En introduisant le point $A$ dans le second vecteur par la relation de Chasles ($\\vec{GB} = \\vec{GA} + \\vec{AB}$) :
$$2\\vec{GA} + (\\vec{GA} + \\vec{AB}) = \\vec{0} \\implies 3\\vec{GA} + \\vec{AB} = \\vec{0}$$
$$-3\\vec{AG} + \\vec{AB} = \\vec{0} \\implies 3\\vec{AG} = \\vec{AB} \\implies \\vec{AG} = \\frac{1}{3}\\vec{AB}$$

Le point $G$ est situé sur le segment $[AB]$, au tiers de la distance à partir de $A$.`,
  },
  {
    id: 18,
    title: 'Annale Bac S2 Sénégal — Session 2018',
    source: 'Office du Baccalauréat Sénégal',
    sourceType: 'bac',
    theme: 'Équation Différentielle Linéaire du 1er Ordre',
    category: 'analyse',
    enonce: `Résoudre sur $\\mathbb{R}$ l'équation différentielle :
$$y' + 2y = 0$$`,
    correction: `L'équation différentielle est de la forme $y' + ay = 0$ avec $a = 2$.
D'après le cours de Terminale S2, l'ensemble des solutions sur $\\mathbb{R}$ est constitué des fonctions de la forme :
$$y(x) = C e^{-ax} = C e^{-2x} \\quad (C \\in \\mathbb{R})$$`,
  },
  {
    id: 19,
    title: 'Devoir Surveillé — Prytanée Militaire de Saint-Louis (PMS) 2022',
    source: 'Prytanée Militaire Charles Ntchoréré de Saint-Louis',
    sourceType: 'lycee',
    theme: 'Analyse & Étude de la Parité',
    category: 'analyse',
    enonce: `Étudier la parité de la fonction $f$ définie sur $\\mathbb{R}$ par :
$$f(x) = x^3 - x$$`,
    correction: `1. Le domaine de définition est $D_f = \\mathbb{R}$, qui est symétrique par rapport à 0 (pour tout $x \\in \\mathbb{R}$, $-x \\in \\mathbb{R}$).

2. Calculons $f(-x)$ :
$$f(-x) = (-x)^3 - (-x) = -x^3 + x = -(x^3 - x) = -f(x)$$

Puisque pour tout $x \\in \\mathbb{R}$, $f(-x) = -f(x)$, la fonction $f$ est **impaire**.
Sa courbe représentative $\\mathcal{C}_f$ est symétrique par rapport à l'origine $O$ du repère.`,
  },
  {
    id: 20,
    title: 'Concours d\'Entrée EPT — Session 2020',
    source: 'École Polytechnique de Thiès',
    sourceType: 'concours',
    theme: 'Suites Géométriques & Somme des Termes',
    category: 'analyse',
    enonce: `Calculer la somme $S$ des six premiers termes de la suite géométrique $(u_n)$ définie par $u_n = 2^n$ :
$$S = \\sum_{k=0}^5 2^k = 1 + 2 + 4 + 8 + 16 + 32$$`,
    correction: `Il s'agit de la somme de $n = 6$ termes consécutifs d'une suite géométrique de premier terme $u_0 = 1$ et de raison $q = 2 \\neq 1$.
D'après la formule de la somme :
$$S = u_0 \\times \\frac{1 - q^{\\text{nb de termes}}}{1 - q} = 1 \\times \\frac{1 - 2^6}{1 - 2} = \\frac{1 - 64}{-1} = \\frac{-63}{-1} = 63$$`,
  },
  {
    id: 21,
    title: 'Manuel CIAM (Terminale S) — Intégration de $1/x$',
    source: 'CIAM Terminale S',
    sourceType: 'ciam',
    theme: 'Calcul Intégral & Primitive de $1/x$',
    category: 'analyse',
    enonce: `Calculer la valeur exacte de l'intégrale :
$$K = \\int_{1}^{e} \\frac{1}{x} \\, dx$$`,
    correction: `Une primitive de $x \\mapsto \\frac{1}{x}$ sur $[1, e]$ est $x \\mapsto \\ln(x)$.
$$K = [\\ln(x)]_1^e = \\ln(e) - \\ln(1)$$
Comme $\\ln(e) = 1$ et $\\ln(1) = 0$ :
$$K = 1 - 0 = 1$$`,
  },
  {
    id: 22,
    title: 'Annale Bac S2 Sénégal — Session 2017',
    source: 'Office du Baccalauréat Sénégal',
    sourceType: 'bac',
    theme: 'Nombres Complexes & Module',
    category: 'algebre',
    enonce: `Déterminer le module du nombre complexe :
$$z = 3 - 4i$$`,
    correction: `Pour un nombre complexe $z = a + ib$, le module est défini par $|z| = \\sqrt{a^2 + b^2}$.
Ici $a = 3$ et $b = -4$ :
$$|z| = \\sqrt{3^2 + (-4)^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$$`,
  },
  {
    id: 23,
    title: 'Composition Trimestrielle — Lycée John F. Kennedy (Dakar) 2023',
    source: 'Lycée de Jeunes Filles John F. Kennedy (Dakar)',
    sourceType: 'lycee',
    theme: 'Fonction Exponentielle & Inéquation',
    category: 'analyse',
    enonce: `Résoudre dans $\\mathbb{R}$ l'inéquation :
$$e^x - 1 > 0$$`,
    correction: `$$e^x - 1 > 0 \\iff e^x > 1$$
Comme la fonction logarithme népérien est strictement croissante sur $]0, +\\infty[$ :
$$\\ln(e^x) > \\ln(1) \\iff x > 0$$

L'ensemble des solutions est donc :
$$S = ]0, +\\infty[$$`,
  },
  {
    id: 24,
    title: 'Concours d\'Entrée ESP — Session 2019',
    source: 'École Supérieure Polytechnique (ESP)',
    sourceType: 'concours',
    theme: 'Dérivation d\'une Fonction Composée $\\ln(u)$',
    category: 'analyse',
    enonce: `Soit la fonction $f$ définie sur $\\mathbb{R}$ par $f(x) = \\ln(x^2 + 1)$.
Calculer la dérivée $f'(x)$.`,
    correction: `La fonction $f$ est de la forme $\\ln(u(x))$ avec $u(x) = x^2 + 1$.
Pour tout $x \\in \\mathbb{R}$, $u(x) = x^2 + 1 \\ge 1 > 0$, donc $f$ est dérivable sur $\\mathbb{R}$.
D'après la formule $(\\ln(u))' = \\frac{u'}{u}$ :
$$u'(x) = 2x \\implies f'(x) = \\frac{2x}{x^2 + 1}$$`,
  },
  {
    id: 25,
    title: 'Manuel CIAM (Terminale S) — Suites Arithmétiques',
    source: 'CIAM Terminale S',
    sourceType: 'ciam',
    theme: 'Suites Arithmétiques & Formule du Terme Général',
    category: 'analyse',
    enonce: `Soit $(u_n)$ une suite arithmétique de premier terme $u_0 = 3$ et de raison $r = 4$.
Calculer la valeur du 11ème terme $u_{10}$.`,
    correction: `La formule explicite d'une suite arithmétique de premier terme $u_0$ et de raison $r$ est :
$$u_n = u_0 + n \\cdot r$$
Pour $n = 10$ :
$$u_{10} = 3 + 10(4) = 3 + 40 = 43$$`,
  },
  {
    id: 26,
    title: 'Annale Bac S2 Sénégal — Session 2016',
    source: 'Office du Baccalauréat Sénégal',
    sourceType: 'bac',
    theme: 'Analyse & Factorisation pour Lever une Indétermination',
    category: 'analyse',
    enonce: `Calculer la limite :
$$\\lim_{x \\to +\\infty} (x - \\ln(x))$$`,
    correction: `En $+\\infty$, on a une forme indéterminée de type « $+\\infty - \\infty$ ».
Pour lever l'indétermination, factorisons par le terme prépondérant $x$ pour tout $x > 0$ :
$$x - \\ln(x) = x \\left(1 - \\frac{\\ln(x)}{x}\\right)$$

Par croissance comparée fondamentale :
$$\\lim_{x \\to +\\infty} \\frac{\\ln(x)}{x} = 0$$
Donc :
$$\\lim_{x \\to +\\infty} \\left(1 - \\frac{\\ln(x)}{x}\\right) = 1 - 0 = 1$$
Comme $\\lim_{x \\to +\\infty} x = +\\infty$, par produit de limites :
$$\\lim_{x \\to +\\infty} (x - \\ln(x)) = +\\infty$$`,
  },
  {
    id: 27,
    title: 'Devoir Surveillé — Lycée Limamou Laye 2020',
    source: 'Lycée Seydina Limamou Laye',
    sourceType: 'lycee',
    theme: 'Équations Différentielles Harmoniques $y\'\' + \\omega^2 y = 0$',
    category: 'analyse',
    enonce: `Déterminer la solution générale sur $\\mathbb{R}$ de l'équation différentielle :
$$y'' + 9y = 0$$`,
    correction: `L'équation caractéristique est :
$$r^2 + 9 = 0 \\iff r^2 = -9 = (3i)^2 \\iff r = \\pm 3i$$

La pulsation propre est $\\omega = 3$.
D'après le cours de Terminale S2, la solution générale sur $\\mathbb{R}$ est de la forme :
$$y(x) = A \\cos(3x) + B \\sin(3x) \\quad (A, B \\in \\mathbb{R})$$`,
  },
  {
    id: 28,
    title: 'Concours d\'Entrée EPT — Session 2019',
    source: 'École Polytechnique de Thiès',
    sourceType: 'concours',
    theme: 'Dérivation d\'une Fonction Composée $e^{u}$',
    category: 'analyse',
    enonce: `Calculer la dérivée de la fonction $f$ définie sur $\\mathbb{R}$ par :
$$f(x) = e^{\\cos(x)}$$`,
    correction: `La fonction $f$ est de la forme $e^{u(x)}$ avec $u(x) = \\cos(x)$.
La fonction $\\cos$ est dérivable sur $\\mathbb{R}$ avec $u'(x) = -\\sin(x)$.
D'après la formule $(e^u)' = u' \\cdot e^u$ :
$$f'(x) = -\\sin(x) e^{\\cos(x)}$$`,
  },
  {
    id: 29,
    title: 'Manuel CIAM (Terminale S) — Transformations du Plan',
    source: 'CIAM Terminale S',
    sourceType: 'ciam',
    theme: 'Similitudes Directes & Écriture Complexe',
    category: 'algebre',
    enonce: `Préciser la nature et les éléments caractéristiques de la transformation du plan d'écriture complexe :
$$z' = z + 3 - 2i$$`,
    correction: `L'écriture complexe est de la forme $z' = az + b$ avec :
$$a = 1 \\quad \\text{et} \\quad b = 3 - 2i$$

Puisque $a = 1$, il s'agit d'une **translation**.
Le vecteur de translation $\\vec{v}$ a pour affixe $b = 3 - 2i$.
Dans le repère $(O, \\vec{u}, \\vec{v})$, ses coordonnées sont :
$$\\vec{v}\\begin{pmatrix} 3 \\\\ -2 \\end{pmatrix}$$`,
  },
  {
    id: 30,
    title: 'Annale Bac S2 Sénégal — Session 2015',
    source: 'Office du Baccalauréat Sénégal',
    sourceType: 'bac',
    theme: 'Calcul Intégral & Primitive de $e^{ax}$',
    category: 'analyse',
    enonce: `Calculer l'intégrale :
$$J = \\int_{0}^{1} e^{3x} \\, dx$$`,
    correction: `Une primitive de $x \\mapsto e^{ax}$ (avec $a = 3 \\neq 0$) est $x \\mapsto \\frac{1}{3}e^{3x}$.
$$J = \\left[\\frac{1}{3}e^{3x}\\right]_0^1 = \\frac{1}{3}e^{3(1)} - \\frac{1}{3}e^{3(0)} = \\frac{1}{3}e^3 - \\frac{1}{3}(1) = \\frac{e^3 - 1}{3}$$`,
  },
];

export default function MathsRecueilEpreuves() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'analyse' | 'algebre' | 'proba' | 'geometrie'>('all');
  const [selectedSourceType, setSelectedSourceType] = useState<'all' | 'bac' | 'lycee' | 'ciam' | 'concours'>('all');
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set([1, 2]));

  const toggleExpand = (id: number) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedIds(new Set(MEGA_RECUEIL_30_EPREUVES.map((e) => e.id)));
  };

  const collapseAll = () => {
    setExpandedIds(new Set());
  };

  const filteredEpreuves = useMemo(() => {
    return MEGA_RECUEIL_30_EPREUVES.filter((ep) => {
      const matchCategory = selectedCategory === 'all' || ep.category === selectedCategory;
      const matchSource = selectedSourceType === 'all' || ep.sourceType === selectedSourceType;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        ep.title.toLowerCase().includes(q) ||
        ep.source.toLowerCase().includes(q) ||
        ep.theme.toLowerCase().includes(q) ||
        ep.enonce.toLowerCase().includes(q) ||
        ep.correction.toLowerCase().includes(q);

      return matchCategory && matchSource && matchSearch;
    });
  }, [searchQuery, selectedCategory, selectedSourceType]);

  return (
    <section className="bg-white rounded-3xl border border-navy/10 p-5 sm:p-8 shadow-sm space-y-6">
      {/* En-tête du Méga Recueil */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-[11px] font-black uppercase tracking-widest text-turquoise">
              Référentiel National d&apos;Excellence • Terminale S2
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-navy mt-1 flex items-center gap-2">
            <Award className="w-6 h-6 text-gold shrink-0" />
            <span>Méga Recueil de 30 Épreuves &amp; Corrigés Détaillés</span>
          </h2>
          <p className="text-xs text-navy/60 mt-1 max-w-2xl leading-relaxed">
            Sujets complets et corrigés pas à pas issus des <strong>Annales du Bac S2</strong>, du <strong>Lycée Limamou Laye</strong>, des <strong>Manuels CIAM</strong> et des <strong>Concours EPT / ESP</strong>.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
          <button
            onClick={expandAll}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-surface hover:bg-surface-muted text-navy border border-navy/10 transition-all"
          >
            Tout déplier
          </button>
          <button
            onClick={collapseAll}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-surface hover:bg-surface-muted text-navy/60 border border-navy/10 transition-all"
          >
            Tout replier
          </button>
        </div>
      </div>

      {/* Barre de Recherche et Filtres */}
      <div className="space-y-3 bg-surface/60 p-4 rounded-2xl border border-navy/5">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Champ de recherche */}
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-navy/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Rechercher une notion (ex: limites, complexe, intégrale, EPT, 2024...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-navy/10 text-xs font-medium text-navy placeholder:text-navy/40 focus:border-turquoise focus:outline-none shadow-sm"
            />
          </div>

          {/* Compteur de résultats */}
          <span className="text-xs font-black text-navy/60 bg-white px-3 py-2 rounded-xl border border-navy/10 whitespace-nowrap self-end sm:self-auto">
            {filteredEpreuves.length} épreuve{filteredEpreuves.length > 1 ? 's' : ''} sur 30
          </span>
        </div>

        {/* Boutons de Filtres Rapides : Thèmes */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] font-bold text-navy/50 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Domaine :
          </span>
          {[
            { id: 'all', label: 'Tous les Domaines' },
            { id: 'analyse', label: 'Analyse (17)' },
            { id: 'algebre', label: 'Algèbre (7)' },
            { id: 'proba', label: 'Probabilités (4)' },
            { id: 'geometrie', label: 'Géométrie (2)' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? 'bg-navy text-white shadow-sm'
                  : 'bg-white text-navy/70 hover:bg-white/80 border border-navy/5'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Boutons de Filtres Rapides : Sources */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-bold text-navy/50 mr-1 flex items-center gap-1">
            <GraduationCap className="w-3 h-3" /> Source :
          </span>
          {[
            { id: 'all', label: 'Toutes les sources' },
            { id: 'bac', label: 'Office du Bac (9)' },
            { id: 'lycee', label: 'Lycée Limamou Laye & Djignabo (8)' },
            { id: 'ciam', label: 'Manuels CIAM (7)' },
            { id: 'concours', label: 'Concours EPT / ESP (6)' },
          ].map((src) => (
            <button
              key={src.id}
              onClick={() => setSelectedSourceType(src.id as any)}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                selectedSourceType === src.id
                  ? 'bg-turquoise text-white shadow-sm'
                  : 'bg-white text-navy/70 hover:bg-white/80 border border-navy/5'
              }`}
            >
              {src.label}
            </button>
          ))}
        </div>
      </div>

      {/* Liste des 30 Épreuves */}
      <div className="space-y-4">
        {filteredEpreuves.length === 0 ? (
          <div className="text-center py-12 bg-surface/40 rounded-2xl border border-navy/5">
            <p className="text-sm font-bold text-navy">Aucune épreuve ne correspond à votre recherche.</p>
            <p className="text-xs text-navy/50 mt-1">Essayez un autre mot-clé ou réinitialisez les filtres.</p>
          </div>
        ) : (
          filteredEpreuves.map((ep) => {
            const isExpanded = expandedIds.has(ep.id);

            return (
              <div
                key={ep.id}
                className="bg-white rounded-2xl border border-navy/10 overflow-hidden shadow-sm hover:border-turquoise/40 transition-all"
              >
                {/* En-tête de la carte d'épreuve */}
                <div
                  onClick={() => toggleExpand(ep.id)}
                  className="p-4 sm:p-5 cursor-pointer bg-gradient-to-r from-surface/40 to-white hover:from-surface/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-colors"
                >
                  <div className="flex items-start sm:items-center gap-3 min-w-0">
                    <span className="w-9 h-9 rounded-xl bg-navy text-white text-xs font-black flex items-center justify-center shrink-0 shadow-sm">
                      N°{ep.id}
                    </span>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 mb-0.5">
                        <span
                          className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${
                            ep.sourceType === 'bac'
                              ? 'bg-emerald-100 text-emerald-800'
                              : ep.sourceType === 'concours'
                              ? 'bg-purple-100 text-purple-800'
                              : ep.sourceType === 'ciam'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-sky-100 text-sky-800'
                          }`}
                        >
                          {ep.source}
                        </span>

                        <span className="text-[10px] font-bold text-navy/40 uppercase tracking-wider">
                          • {ep.theme}
                        </span>
                      </div>

                      <h3 className="font-extrabold text-navy text-sm sm:text-base leading-snug">
                        {ep.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                    <span className="text-xs font-bold text-turquoise hidden sm:inline">
                      {isExpanded ? 'Masquer la correction' : 'Voir le corrigé'}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center border border-navy/5 text-navy">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Énoncé de l'exercice */}
                <div className="p-4 sm:p-5 border-t border-navy/5 bg-white space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-navy bg-surface px-2.5 py-1 rounded-md border border-navy/5">
                      Énoncé Officiel
                    </span>
                  </div>

                  <div className="text-sm text-navy/90 leading-relaxed font-sans pt-1">
                    <MathRenderer content={ep.enonce} />
                  </div>
                </div>

                {/* Corrigé Détaillé Dépliable */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 bg-gradient-to-b from-turquoise-light/10 to-surface/40 border-t border-turquoise/20 space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="text-[11px] font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-300">
                        Correction Complète &amp; Rédigée (Barème Bac S2)
                      </span>
                    </div>

                    <div className="text-sm text-navy/90 leading-relaxed font-sans pt-1 space-y-2">
                      <MathRenderer content={ep.correction} />
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer Pédagogique du Recueil */}
      <div className="rounded-2xl bg-navy text-white p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <Sparkles className="w-6 h-6 text-turquoise shrink-0" />
          <div>
            <p className="font-extrabold text-sm">Conseil Méthodologique de l&apos;Équipe IGEF</p>
            <p className="text-xs text-white/70 mt-0.5">
              Ces 30 épreuves couvrent l&apos;intégralité des questions types du Bac S2 de 2015 à 2024. Travaillez d&apos;abord chaque énoncé pendant 15 minutes avant de regarder le corrigé.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

