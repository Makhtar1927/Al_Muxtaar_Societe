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
  // P1. CINÉMATIQUE DU POINT MATÉRIEL (PHYSIQUE S2 - P1)
  cinematique_point: [
    {
      year: 2021,
      session: 'Session Normale (S2)',
      points: 'Exercice 3 — Mécanique (4 Points)',
      topic: 'Trajectoire parabolique, Vecteur vitesse, Produit scalaire a·v, Base de Frenet et Rayon de courbure',
      enonce: `Dans un repère orthonormé $(O, \\vec{i}, \\vec{j})$, un solide ponctuel $M$ de masse $m = 250\\text{ g}$ est lancé à l'instant $t = 0$ depuis l'origine $O(0, 0)$. Les équations horaires de son mouvement sont données par :
$$\\begin{cases} x(t) = 4{,}0\\,t \\\\ y(t) = -5{,}0\\,t^2 + 10{,}0\\,t \\end{cases} \\quad (\\text{unités SI, pour } t \\ge 0)$$

1. Établir l'équation cartésienne de la trajectoire $y = f(x)$. Préciser sa nature géométrique.
2. Déterminer les coordonnées du sommet $S$ de la trajectoire et l'instant $t_S$ auquel il est atteint.
3. Donner l'expression du vecteur vitesse instantanée $\\vec{v}(t)$. Calculer sa norme à $t = 1{,}0\\text{ s}$ et à $t = 2{,}0\\text{ s}$.
4. Déterminer le vecteur accélération $\\vec{a}(t)$. Montrer qu'il est constant et préciser ses caractéristiques.
5. Calculer le produit scalaire $\\vec{a} \\cdot \\vec{v}$ à $t = 0{,}5\\text{ s}$ et à $t = 1{,}5\\text{ s}$. En déduire la nature du mouvement (accéléré ou retardé) à ces deux dates.
6. Dans la base de Frenet $(S, \\vec{u}_t, \\vec{u}_n)$ au sommet de la trajectoire :
   a) Préciser la valeur de l'accélération tangentielle $a_t$ et de l'accélération normale $a_n$.
   b) En déduire la valeur du rayon de courbure $\\rho_S$ de la trajectoire au sommet.`,
      solution: `### 1. Équation cartésienne de la trajectoire
Pour $t \\ge 0$, on exprime le temps $t$ à partir de $x(t)$ :
$$t = \\frac{x}{4{,}0}$$
En reportant dans $y(t)$ :
$$y(x) = -5{,}0\\left(\\frac{x}{4{,}0}\\right)^2 + 10{,}0\\left(\\frac{x}{4{,}0}\\right) = -0{,}3125\\,x^2 + 2{,}5\\,x$$
La trajectoire est une **branche de parabole** dont la concavité est tournée vers les $y$ négatifs (coefficient dominant $-0{,}3125 < 0$).

---

### 2. Coordonnées du sommet $S$
Au sommet $S$, la tangente est horizontale $\\implies v_y(t_S) = \\frac{dy}{dt}(t_S) = 0$ :
$$v_y(t) = -10{,}0\\,t + 10{,}0 = 0 \\implies t_S = 1{,}0\\text{ s}$$
Coordonnées de $S$ :
$$x_S = x(1{,}0) = 4{,}0 \\times 1{,}0 = 4{,}0\\text{ m}$$
$$y_S = y(1{,}0) = -5{,}0(1{,}0)^2 + 10{,}0(1{,}0) = 5{,}0\\text{ m}$$
Le sommet est **$S(4{,}0\\text{ m} ; 5{,}0\\text{ m})$** atteint à $t_S = 1{,}0\\text{ s}$.

---

### 3. Vecteur vitesse instantanée
$$\\vec{v}(t) = \\frac{dx}{dt}\\,\\vec{i} + \\frac{dy}{dt}\\,\\vec{j} = 4{,}0\\,\\vec{i} + (-10{,}0\\,t + 10{,}0)\\,\\vec{j}$$
- **À $t = 1{,}0\\text{ s}$** : $\\vec{v}(1{,}0) = 4{,}0\\,\\vec{i} \\implies v_S = 4{,}0\\text{ m}\\cdot\\text{s}^{-1}$.
- **À $t = 2{,}0\\text{ s}$** : $\\vec{v}(2{,}0) = 4{,}0\\,\\vec{i} - 10{,}0\\,\\vec{j} \\implies v(2{,}0) = \\sqrt{4{,}0^2 + (-10{,}0)^2} = \\sqrt{116} \\approx 10{,}77\\text{ m}\\cdot\\text{s}^{-1}$.

---

### 4. Vecteur accélération
$$\\vec{a}(t) = \\frac{d\\vec{v}}{dt} = 0\\,\\vec{i} - 10{,}0\\,\\vec{j} = -10{,}0\\,\\vec{j} \\quad (\\text{en m}\\cdot\\text{s}^{-2})$$
Le vecteur accélération est rigoureusement constant : vertical, dirigé vers le bas, d'intensité $a = 10{,}0\\text{ m}\\cdot\\text{s}^{-2}$ (champ de pesanteur local $\\vec{a} = \\vec{g}$).

---

### 5. Produit scalaire $\\vec{a} \\cdot \\vec{v}$ et nature du mouvement
$$\\vec{a} \\cdot \\vec{v} = a_x v_x + a_y v_y = 0(4{,}0) + (-10{,}0)(-10{,}0\\,t + 10{,}0) = 100{,}0\\,t - 100{,}0$$
- **À $t = 0{,}5\\text{ s}$** : $\\vec{a} \\cdot \\vec{v} = 100(0{,}5) - 100 = -50{,}0 < 0 \\implies$ mouvement **retardé (ou décéléré)**.
- **À $t = 1{,}5\\text{ s}$** : $\\vec{a} \\cdot \\vec{v} = 100(1{,}5) - 100 = +50{,}0 > 0 \\implies$ mouvement **accéléré**.

---

### 6. Rayon de courbure $\\rho_S$ dans Frenet au sommet
Au sommet $S$, la vitesse est horizontale ($\\vec{v}_S = 4{,}0\\,\\vec{i}$) et l'accélération est verticale ($\\vec{a} = -10{,}0\\,\\vec{j}$).
Comme $\\vec{a} \\perp \\vec{v}_S$ :
a) $a_t = 0$ et $a_n = a = 10{,}0\\text{ m}\\cdot\\text{s}^{-2}$.
b) D'après Frenet : $a_n = \\frac{v_S^2}{\\rho_S} \\implies \\rho_S = \\frac{v_S^2}{a_n} = \\frac{(4{,}0)^2}{10{,}0} = 1{,}60\\text{ m}$.`,
      baremeAstuce: `Barème officiel Office du Bac :
- Équation de la trajectoire et nature parabole : 0,75 pt
- Coordonnées du sommet et instant : 0,75 pt
- Vitesse instantanée et normes : 0,75 pt
- Accélération constante et caractéristiques : 0,5 pt
- Produit scalaire et justification accéléré/retardé : 0,75 pt
- Base de Frenet et calcul du rayon de courbure : 0,5 pt.
Astuce correcteur : Ne déduisez jamais la nature d'un mouvement à partir du signe de a seul ; seul le signe du produit scalaire a·v fait foi pour le jury !`,
    },
    {
      year: 2019,
      session: 'Session Normale (S2)',
      points: 'Exercice 3 — Mécanique (3,5 Points)',
      topic: 'Mouvement Rectiligne Sinusoïdal (MRS), Pulsation propre, Amplitude et Phase à l\'origine',
      enonce: `Un point matériel $M$ effectue un mouvement rectiligne sinusoïdal sur un axe $(Ox)$ d'origine $O$. Son élongation vérifie l'équation différentielle :
$$\\frac{d^2x}{dt^2} + 100\\pi^2\\,x = 0$$

À la date initiale $t = 0$, le mobile passe par la position $x_0 = +2{,}0\\text{ cm}$ en se déplaçant dans le sens négatif avec une vitesse $v_0 = -20\\pi\\sqrt{3}\\text{ cm}\\cdot\\text{s}^{-1}$.

1. Déterminer la pulsation propre $\\omega_0$, la période propre $T_0$ et la fréquence propre $N$ de ce mouvement.
2. Établir l'expression générale de l'élongation sous la forme $x(t) = X_m\\cos(\\omega_0 t + \\varphi)$.
3. Déterminer les valeurs numériques de l'amplitude $X_m$ et de la phase à l'origine $\\varphi$.
4. Calculer la vitesse maximale $V_m$ du mobile et préciser les positions où elle est atteinte.
5. Calculer l'accélération maximale $a_m$ et préciser en quelles positions elle est atteinte.`,
      solution: `### 1. Grandeurs caractéristiques
L'équation différentielle type est $\\ddot{x} + \\omega_0^2\\,x = 0$.
Par identification :
$$\\omega_0^2 = 100\\pi^2 \\implies \\omega_0 = 10\\pi\\text{ rad}\\cdot\\text{s}^{-1} \\approx 31{,}4\\text{ rad}\\cdot\\text{s}^{-1}$$
- **Période propre** : $T_0 = \\frac{2\\pi}{\\omega_0} = \\frac{2\\pi}{10\\pi} = 0{,}20\\text{ s}$.
- **Fréquence** : $N = \\frac{1}{T_0} = 5{,}0\\text{ Hz}$.

---

### 2 & 3. Amplitude $X_m$ et phase $\\varphi$
La loi horaire et sa dérivée sont :
$$\\begin{cases} x(t) = X_m\\cos(10\\pi t + \\varphi) \\\\ v(t) = -X_m(10\\pi)\\sin(10\\pi t + \\varphi) \\end{cases}$$
À $t = 0$ :
$$\\begin{cases} X_m\\cos\\varphi = 2{,}0\\cdot 10^{-2}\\text{ m} \\\\ -X_m(10\\pi)\\sin\\varphi = -20\\pi\\sqrt{3}\\cdot 10^{-2}\\text{ m/s} \\implies X_m\\sin\\varphi = 2\\sqrt{3}\\cdot 10^{-2}\\text{ m} \\end{cases}$$

- **Calcul de l'amplitude $X_m$** :
$$X_m = \\sqrt{(X_m\\cos\\varphi)^2 + (X_m\\sin\\varphi)^2} = 10^{-2}\\sqrt{2^2 + (2\\sqrt{3})^2} = 10^{-2}\\sqrt{4 + 12} = 4{,}0\\cdot 10^{-2}\\text{ m} = 4{,}0\\text{ cm}$$

- **Calcul de la phase $\\varphi$** :
$$\\cos\\varphi = \\frac{2{,}0}{4{,}0} = +\\frac{1}{2} \\quad \\text{et} \\quad \\sin\\varphi = \\frac{2\\sqrt{3}}{4{,}0} = +\\frac{\\sqrt{3}}{2} \\implies \\varphi = +\\frac{\\pi}{3}\\text{ rad}$$
Loi horaire complète :
$$x(t) = 4{,}0\\cdot 10^{-2}\\cos\\left(10\\pi t + \\frac{\\pi}{3}\\right) \\quad (\\text{en m})$$

---

### 4. Vitesse maximale $V_m$
$$V_m = X_m\\,\\omega_0 = 4{,}0\\cdot 10^{-2} \\times 10\\pi = 0{,}40\\pi\\text{ m}\\cdot\\text{s}^{-1} \\approx 1{,}26\\text{ m}\\cdot\\text{s}^{-1}$$
Elle est atteinte lors du passage par la position d'équilibre ($x = 0$).

---

### 5. Accélération maximale $a_m$
$$a_m = X_m\\,\\omega_0^2 = 4{,}0\\cdot 10^{-2} \\times 100\\pi^2 = 4\\pi^2\\text{ m}\\cdot\\text{s}^{-2} \\approx 39{,}5\\text{ m}\\cdot\\text{s}^{-2}$$
Elle est atteinte aux élongations extrêmes ($x = \\pm X_m = \\pm 4{,}0\\text{ cm}$).`,
      baremeAstuce: `Barème officiel Bac S2 :
- ω₀, T₀ et N : 0,75 pt
- Système à t = 0 et calcul de Xm : 1 pt
- Calcul de φ avec signe de sin et cos : 0,75 pt
- Vitesse maximale et position d'équilibre : 0,5 pt
- Accélération maximale et positions extrêmes : 0,5 pt.
Astuce : N'oubliez jamais de vérifier à la fois le cosinus ET le sinus pour lever l'indétermination sur le signe de φ !`,
    },
  ],
  cinematique: [], // alias vers cinematique_point

  // P2. LES LOIS DE NEWTON SUR LE MOUVEMENT (PHYSIQUE S2 - P2)
  lois_newton: [
    {
      year: 2023,
      session: 'Session Normale (S2)',
      points: 'Exercice 3 — Mécanique & Dynamique (4 Points)',
      topic: 'Théorème du Centre d\'Inertie (TCI), Plan incliné avec et sans frottements, Loi de Coulomb',
      enonce: `Un solide ponctuel $(S)$ de masse $m = 400\\text{ g}$ glisse le long d'une ligne de plus grande pente d'un plan incliné d'un angle $\\alpha = 30^\\circ$ par rapport à l'horizontale. La longueur de la rampe est $AB = L = 2{,}5\\text{ m}$.
Le solide est lâché en $A$ sans vitesse initiale ($v_A = 0$) à la date $t = 0$. On prendra $g = 9{,}8\\text{ m}\\cdot\\text{s}^{-2}$.

1. **Première phase : Frottements supposés négligeables**
   a) Faire l'inventaire des forces appliquées à $(S)$ et les représenter sur un schéma clair.
   b) En appliquant la deuxième loi de Newton (TCI), déterminer l'expression littérale et la valeur numérique de l'accélération $a_1$ du mobile.
   c) Calculer la vitesse théorique $v_B$ du solide au point $B$ et la durée $t_B$ de la descente.

2. **Deuxième phase : Frottements réels de Coulomb**
   À l'arrivée en $B$, des capteurs électroniques mesurent une vitesse réelle $v'_B = 4{,}0\\text{ m}\\cdot\\text{s}^{-1}$.
   a) Justifier l'existence de forces de frottement et calculer l'accélération réelle $a_2$ du solide.
   b) En appliquant le TCI, établir l'expression de la force de frottement $\\vec{f}$ et calculer son intensité $f$.
   c) En déduire la valeur du coefficient de frottement dynamique $\\mu$ entre le solide et le plan.`,
      solution: `### 1. Première phase (sans frottements)

**a) Bilan des forces appliquées** :
- Système : {Solide $(S)$ de masse $m = 0{,}40\\text{ kg}$}.
- Référentiel : Terrestre, supposé galiléen.
- Forces extérieures :
  - Le poids $\\vec{P} = m\\vec{g}$ (vertical vers le bas).
  - La réaction normale du support $\\vec{R}_N$ (perpendiculaire au plan incliné vers le haut).

**b) Accélération $a_1$** :
D'après le Théorème du Centre d'Inertie :
$$\\vec{P} + \\vec{R}_N = m\\vec{a}_1$$
En projetant sur l'axe $(Ax)$ parallèle à la pente et orienté vers le bas :
$$P_x + R_{Nx} = m a_1 \\implies m g\\sin\\alpha + 0 = m a_1 \\implies a_1 = g\\sin\\alpha$$
Application numérique :
$$a_1 = 9{,}8 \\times \\sin(30^\\circ) = 9{,}8 \\times 0{,}5 = 4{,}90\\text{ m}\\cdot\\text{s}^{-2}$$

**c) Vitesse $v_B$ et durée $t_B$** :
D'après la relation de Torricelli :
$$v_B^2 - v_A^2 = 2 a_1 L \\implies v_B = \\sqrt{2 a_1 L} = \\sqrt{2 \\times 4{,}90 \\times 2{,}5} = \\sqrt{24{,}5} \\approx 4{,}95\\text{ m}\\cdot\\text{s}^{-1}$$
Durée de la descente :
$$v_B = a_1 t_B \\implies t_B = \\frac{v_B}{a_1} = \\frac{4{,}95}{4{,}90} \\approx 1{,}01\\text{ s}$$

---

### 2. Deuxième phase (avec frottements)

**a) Mise en évidence des frottements et calcul de $a_2$** :
Puisque $v'_B = 4{,}0\\text{ m}\\cdot\\text{s}^{-1} < v_B = 4{,}95\\text{ m}\\cdot\\text{s}^{-1}$, une partie de l'énergie mécanique a été dissipée sous forme thermique : le contact présente des frottements !
D'après Torricelli :
$$(v'_B)^2 - 0 = 2 a_2 L \\implies a_2 = \\frac{(v'_B)^2}{2 L} = \\frac{4{,}0^2}{2 \\times 2{,}5} = \\frac{16{,}0}{5{,}0} = 3{,}20\\text{ m}\\cdot\\text{s}^{-2}$$

**b) Intensité de la force de frottement $f$** :
En présence de frottements $\\vec{f} = -f\\vec{i}$, la projection du TCI sur $(Ax)$ donne :
$$m g\\sin\\alpha - f = m a_2 \\implies f = m(g\\sin\\alpha - a_2) = m(a_1 - a_2)$$
Application numérique :
$$f = 0{,}40 \\times (4{,}90 - 3{,}20) = 0{,}40 \\times 1{,}70 = 0{,}68\\text{ N}$$

**c) Coefficient de frottement dynamique $\\mu$** :
La projection sur l'axe $(Ay)$ perpendiculaire au plan donne :
$$R_N - m g\\cos\\alpha = 0 \\implies R_N = m g\\cos\\alpha = 0{,}40 \\times 9{,}8 \\times \\cos(30^\\circ) = 3{,}92 \\times \\frac{\\sqrt{3}}{2} \\approx 3{,}395\\text{ N}$$
D'après la loi de Coulomb ($f = \\mu R_N$) :
$$\\mu = \\frac{f}{R_N} = \\frac{0{,}68}{3{,}395} \\approx 0{,}20$$`,
      baremeAstuce: `Barème officiel Bac S2 :
- Bilan des forces et schéma : 0,5 pt
- Démonstration a₁ = g·sinα et calcul : 0,75 pt
- Vitesse vB et durée tB : 0,75 pt
- Justification frottements et calcul a₂ : 0,75 pt
- Expression et calcul de f : 0,75 pt
- Calcul de RN et coefficient μ : 0,5 pt.
Astuce : N'oubliez jamais de projeter sur l'axe perpendiculaire (Ay) pour calculer RN avant d'appliquer μ = f / RN !`,
    },
    {
      year: 2020,
      session: 'Session Normale (S2)',
      points: 'Exercice 3 — Mécanique (3,5 Points)',
      topic: 'Systèmes de Solides Liés, Machine d\'Atwood, Tension du Fil et Accélération Commune',
      enonce: `Deux solides $(S_1)$ de masse $m_1 = 300\\text{ g}$ et $(S_2)$ de masse $m_2 = 500\\text{ g}$ sont reliés par un fil inextensible et sans masse passant sur la gorge d'une poulie de masse négligeable.
Le système est abandonné sans vitesse initiale à $t = 0$. On prendra $g = 9{,}8\\text{ m}\\cdot\\text{s}^{-2}$.

1. Préciser le sens du mouvement du système.
2. Écrire le bilan des forces appliquées à chaque solide.
3. En appliquant la 2ème loi de Newton à chaque solide, établir l'expression littérale de l'accélération commune $a$ en fonction de $m_1$, $m_2$ et $g$. Calculer sa valeur.
4. Déterminer l'expression littérale et la valeur numérique de la tension $T$ du fil pendant le mouvement.
5. Calculer la distance parcourue par les deux masses après une durée $\\Delta t = 1{,}5\\text{ s}$.`,
      solution: `### 1. Sens du mouvement
Puisque $m_2 = 500\\text{ g} > m_1 = 300\\text{ g}$, le solide $(S_2)$ descend et le solide $(S_1)$ monte.

---

### 2 & 3. Application de la 2ème loi de Newton et accélération commune
- Le fil étant inextensible, les deux solides ont la même accélération scalaire : $a_1 = a_2 = a$.
- Le fil et la poulie étant idéaux, la tension est uniforme : $T_1 = T_2 = T$.

- **Pour $(S_1)$ qui monte (axe ascendant)** :
$$T - m_1 g = m_1 a \\quad (1)$$
- **Pour $(S_2)$ qui descend (axe descendant)** :
$$m_2 g - T = m_2 a \\quad (2)$$

En additionnant membre à membre $(1) + (2)$ pour éliminer $T$ :
$$(m_2 - m_1)g = (m_1 + m_2)a \\implies a = \\frac{m_2 - m_1}{m_1 + m_2}\\,g$$
Application numérique :
$$a = \\frac{0{,}50 - 0{,}30}{0{,}50 + 0{,}30} \\times 9{,}8 = \\frac{0{,}20}{0{,}80} \\times 9{,}8 = \\frac{1}{4} \\times 9{,}8 = 2{,}45\\text{ m}\\cdot\\text{s}^{-2}$$

---

### 4. Tension du fil $T$
À partir de l'équation $(1)$ :
$$T = m_1(g + a) = \\frac{2 m_1 m_2}{m_1 + m_2}\\,g$$
Application numérique :
$$T = 0{,}30 \\times (9{,}8 + 2{,}45) = 0{,}30 \\times 12{,}25 = 3{,}675\\text{ N} \\approx 3{,}68\\text{ N}$$

---

### 5. Distance parcourue après $\\Delta t = 1{,}5\\text{ s}$
Le mouvement est rectiligne uniformément varié sans vitesse initiale :
$$d = \\frac{1}{2} a (\\Delta t)^2 = \\frac{1}{2} \\times 2{,}45 \\times (1{,}5)^2 = 1{,}225 \\times 2{,}25 \\approx 2{,}76\\text{ m}$$`,
      baremeAstuce: `Barème officiel Bac S2 :
- Sens du mouvement et hypothèses fil/poulie : 0,5 pt
- Équations TCI pour S1 et S2 : 1 pt
- Élimination de T et expression littérale de a : 0,75 pt
- Expression et calcul de la tension T : 0,75 pt
- Calcul de la distance d : 0,5 pt.
Astuce : N'écrivez jamais T = m₂g ! La tension est strictement inférieure au poids de la masse qui descend pendant l'accélération (T < m₂g).`,
    },
  ],
  newton: [], // alias vers lois_newton
  // P3. MOUVEMENT D'UN PROJECTILE DANS UN CHAMP DE PESANTEUR UNIFORME (PHYSIQUE S2 - P3)
  projectile_champ_pesanteur: [
    {
      year: 2022,
      session: 'Session Normale (S2)',
      points: 'Exercice 3 — Mécanique (4 Points)',
      topic: 'Tir Balistique, Équation de la Trajectoire, Franchissement d\'Obstacle (Mur/Filet), Flèche, Portée et Vitesse d\'Impact',
      enonce: `Dans un repère orthonormé $(O, \\vec{i}, \\vec{j})$ lié au sol terrestre supposé galiléen, un footballeur frappe un ballon ponctuel de masse $m = 450\\text{ g}$ depuis l'origine $O(0, 0)$ à la date $t = 0$. Le vecteur vitesse initiale $\\vec{v}_0$ est situé dans le plan vertical $(Oxy)$ et fait un angle $\\alpha = 30^\\circ$ avec l'horizontale. Sa norme est $v_0 = 20\\text{ m}\\cdot\\text{s}^{-1}$.
Le champ de pesanteur local est vertical, descendant, d'intensité $g = 9{,}8\\text{ m}\\cdot\\text{s}^{-2}$. Les forces de frottement dans l'air ainsi que la poussée d'Archimède sont négligées.

1. Appliquer le Théorème du Centre d'Inertie (TCI) pour déterminer les coordonnées du vecteur accélération $\\vec{a}(t)$ du ballon.
2. Établir les équations horaires de la vitesse $v_x(t)$ et $v_y(t)$, puis celles de la position $x(t)$ et $y(t)$.
3. Montrer que l'équation cartésienne de la trajectoire s'écrit :
$y(x) = -\\frac{g}{2\\,v_0^2\\,\\cos^2\\alpha}\\,x^2 + (\\tan\\alpha)\\,x$
Donner son expression numérique simplifiée et préciser la nature géométrique de la courbe.
4. Un mur défensif de joueurs, de hauteur $H_{\\text{mur}} = 2{,}20\\text{ m}$, se dresse à la distance $d = 12{,}0\\text{ m}$ du point de tir. Le ballon franchit-il ce mur ? Justifier rigoureusement par le calcul.
5. Déterminer les coordonnées $(x_S, y_S)$ du sommet $S$ de la trajectoire (la flèche $H$) ainsi que la date $t_S$ à laquelle il est atteint.
6. Calculer la portée horizontale $x_P$ du tir (point de retombée sur le sol $y = 0$).
7. Calculer la norme $v_P$ du vecteur vitesse du ballon à l'impact au sol par deux méthodes indépendantes :
   a) À partir des composantes $v_x(t_P)$ et $v_y(t_P)$.
   b) En appliquant le Théorème de l'Énergie Cinétique (TEC).`,
      solution: `### 1. Vecteur accélération (TCI)
- **Système** : {Ballon de masse $m = 0{,}45\\text{ kg}$}.
- **Référentiel** : Terrestre supposé galiléen, muni du repère $(O, \\vec{i}, \\vec{j})$.
- **Forces extérieures** : Seul le poids $\\vec{P} = m\\vec{g}$ s'exerce (chute libre).
D'après le Théorème du Centre d'Inertie (2ème loi de Newton) :
$\\sum \\vec{F}_{\\text{ext}} = m\\vec{a} \\implies m\\vec{g} = m\\vec{a} \\implies \\vec{a} = \\vec{g}$
Dans le repère $(O, \\vec{i}, \\vec{j})$ où $\\vec{j}$ est ascendant :
$\\vec{a} \\begin{pmatrix} a_x = 0 \\\\ a_y = -g \\end{pmatrix}$

---

### 2. Équations horaires de la vitesse et de la position
- Conditions initiales à $t = 0$ :
$\\vec{OM}_0 \\begin{pmatrix} x_0 = 0 \\\\ y_0 = 0 \\end{pmatrix} \\quad ; \\quad \\vec{v}_0 \\begin{pmatrix} v_{0x} = v_0\\cos\\alpha \\\\ v_{0y} = v_0\\sin\\alpha \\end{pmatrix}$
- **Vecteur vitesse $\\vec{v}(t)$** par intégration de $\\vec{a}(t)$ :
$\\vec{v}(t) \\begin{pmatrix} v_x(t) = v_0\\cos\\alpha \\\\ v_y(t) = -g\\,t + v_0\\sin\\alpha \\end{pmatrix}$
- **Vecteur position $\\vec{OM}(t)$** par intégration de $\\vec{v}(t)$ :
$\\vec{OM}(t) \\begin{pmatrix} x(t) = (v_0\\cos\\alpha)\\,t \\\\ y(t) = -\\frac{1}{2}g\\,t^2 + (v_0\\sin\\alpha)\\,t \\end{pmatrix}$

---

### 3. Équation cartésienne de la trajectoire
De $x(t) = (v_0\\cos\\alpha)\\,t$, on tire $t = \\frac{x}{v_0\\cos\\alpha}$. En reportant dans $y(t)$ :
$y(x) = -\\frac{1}{2}g\\left(\\frac{x}{v_0\\cos\\alpha}\\right)^2 + (v_0\\sin\\alpha)\\left(\\frac{x}{v_0\\cos\\alpha}\\right) = -\\frac{g}{2\\,v_0^2\\,\\cos^2\\alpha}\\,x^2 + (\\tan\\alpha)\\,x$
Application numérique :
- $\\cos(30^\\circ) = \\frac{\\sqrt{3}}{2} \\implies \\cos^2(30^\\circ) = 0{,}75$
- $2\\,v_0^2\\,\\cos^2\\alpha = 2 \\times 20^2 \\times 0{,}75 = 600$
- Coefficient dominant : $-\\frac{9{,}8}{600} \\approx -0{,}01633\\text{ m}^{-1}$
- $\\tan(30^\\circ) = \\frac{\\sqrt{3}}{3} \\approx 0{,}5774$
$y(x) = -0{,}01633\\,x^2 + 0{,}5774\\,x$
La trajectoire est une **parabole** située dans le demi-plan supérieur $y \\ge 0$, à concavité tournée vers le bas.

---

### 4. Franchissement du mur défensif ($x = 12{,}0\\text{ m}$)
Calculons l'altitude du ballon à l'abscisse $x = 12{,}0\\text{ m}$ :
$y(12{,}0) = -0{,}01633 \\times (12{,}0)^2 + 0{,}5774 \\times 12{,}0 = -0{,}01633 \\times 144 + 6{,}928 = -2{,}352 + 6{,}928 = 4{,}58\\text{ m}$
Comme $y(12{,}0) = 4{,}58\\text{ m} > H_{\\text{mur}} = 2{,}20\\text{ m}$, le ballon **franchit largement le mur défensif** avec une marge de sécurité de $4{,}58 - 2{,}20 = 2{,}38\\text{ m}$.

---

### 5. Sommet $S$ de la trajectoire (Flèche $H$)
Au sommet $S$, la tangente est horizontale $\\implies v_y(t_S) = 0$ :
$-g\\,t_S + v_0\\sin\\alpha = 0 \\implies t_S = \\frac{v_0\\sin\\alpha}{g} = \\frac{20 \\times \\sin(30^\\circ)}{9{,}8} = \\frac{10}{9{,}8} \\approx 1{,}02\\text{ s}$
Coordonnées du sommet :
$x_S = x(t_S) = (v_0\\cos\\alpha)\\,t_S = \\frac{v_0^2\\,\\sin(2\\alpha)}{2\\,g} = \\frac{400 \\times \\sin(60^\\circ)}{2 \\times 9{,}8} = \\frac{400 \\times 0{,}866}{19{,}6} \\approx 17{,}67\\text{ m}$
$y_S = H = -\\frac{1}{2}g\\,t_S^2 + (v_0\\sin\\alpha)\\,t_S = \\frac{v_0^2\\,\\sin^2\\alpha}{2\\,g} = \\frac{400 \\times (0{,}5)^2}{2 \\times 9{,}8} = \\frac{100}{19{,}6} \\approx 5{,}10\\text{ m}$
Le sommet est **$S(17{,}67\\text{ m} ; 5{,}10\\text{ m})$**, atteint à $t_S = 1{,}02\\text{ s}$.

---

### 6. Portée horizontale $x_P$
Le ballon retombe au sol lorsque $y(x_P) = 0$ avec $x_P \\neq 0$ :
$x_P\\left(-\\frac{g}{2\\,v_0^2\\,\\cos^2\\alpha}\\,x_P + \\tan\\alpha\\right) = 0 \\implies x_P = \\frac{2\\,v_0^2\\,\\sin\\alpha\\,\\cos\\alpha}{g} = \\frac{v_0^2\\,\\sin(2\\alpha)}{g}$
Remarque fondamentale de symétrie : $x_P = 2\\,x_S = 2 \\times 17{,}67 = 35{,}35\\text{ m}$.
La portée horizontale vaut **$x_P = 35{,}35\\text{ m}$**.

---

### 7. Vitesse d'impact au sol $v_P$
- **Méthode a : Par les composantes de la vitesse à $t_P = 2\\,t_S = 2{,}04\\text{ s}$** :
  - $v_{Px} = v_0\\cos\\alpha = 20 \\times \\frac{\\sqrt{3}}{2} \\approx 17{,}32\\text{ m}\\cdot\\text{s}^{-1}$
  - $v_{Py} = -g(2\\,t_S) + v_0\\sin\\alpha = -2(v_0\\sin\\alpha) + v_0\\sin\\alpha = -v_0\\sin\\alpha = -10{,}0\\text{ m}\\cdot\\text{s}^{-1}$
  $v_P = \\sqrt{v_{Px}^2 + v_{Py}^2} = \\sqrt{(v_0\\cos\\alpha)^2 + (-v_0\\sin\\alpha)^2} = \\sqrt{v_0^2(\\cos^2\\alpha + \\sin^2\\alpha)} = v_0 = 20{,}0\\text{ m}\\cdot\\text{s}^{-1}$

- **Méthode b : Par le Théorème de l'Énergie Cinétique entre $O$ et $P$** :
  $\\Delta E_c = \\frac{1}{2}m v_P^2 - \\frac{1}{2}m v_0^2 = W(\\vec{P}) = m\\,g\\,(y_O - y_P)$
  Comme $y_O = y_P = 0$ (le sol est horizontal) :
  $W(\\vec{P}) = 0 \\implies \\frac{1}{2}m v_P^2 = \\frac{1}{2}m v_0^2 \\implies v_P = v_0 = 20{,}0\\text{ m}\\cdot\\text{s}^{-1}$
  Les deux méthodes concordent rigoureusement !`,
      baremeAstuce: `Barème officiel Bac S2 :
- Bilan des forces et accélération a = g : 0,5 pt
- Équations horaires de v et OM : 0,75 pt
- Équation cartésienne de la trajectoire : 0,5 pt
- Calcul y(12 m) et conclusion franchissement mur : 0,5 pt
- Coordonnées du sommet S et instant tS : 0,75 pt
- Calcul de la portée xP : 0,5 pt
- Calcul de vP par les deux méthodes (composantes et TEC) : 0,5 pt.
Astuce correcteur : Rappelez-vous la symétrie de la parabole quand y₀ = 0 : xP = 2·xS et tP = 2·tS ! De plus, sans frottements, l'énergie mécanique se conserve donc la vitesse d'impact au même niveau est exactement égale à la vitesse initiale : vP = v₀ !`,
    },
    {
      year: 2018,
      session: 'Session Normale (S2)',
      points: 'Exercice 3 — Mécanique (4 Points)',
      topic: 'Conditions de Tir Balistique Optimal, Équation en tan(α), Deux Angles de Tir et Vitesse Minimale',
      enonce: `Un lanceur placé à l'origine $O$ tire un projectile ponctuel de masse $m = 200\\text{ g}$ avec une vitesse initiale de norme $v_0 = 15{,}0\\text{ m}\\cdot\\text{s}^{-1}$. Le projectile doit atteindre une cible ponctuelle $C$ située en hauteur aux coordonnées $x_C = 18{,}0\\text{ m}$ et $y_C = 3{,}0\\text{ m}$. On prendra $g = 9{,}8\\text{ m}\\cdot\\text{s}^{-2}$.

1. En utilisant la relation trigonométrique $\\frac{1}{\\cos^2\\alpha} = 1 + \\tan^2\\alpha$, montrer que l'équation de la trajectoire du projectile peut s'écrire sous la forme :
$y(x) = -\\frac{g}{2\\,v_0^2}\\,(1 + \\tan^2\\alpha)\\,x^2 + (\\tan\\alpha)\\,x$
2. Montrer que la condition pour que le projectile atteigne la cible $C(x_C, y_C)$ conduit à une équation du second degré en $X = \\tan\\alpha$ de la forme :
$A\\,X^2 + B\\,X + C = 0$
Calculer les valeurs numériques des coefficients $A$, $B$ et $C$.
3. Résoudre cette équation et déterminer les deux angles de tir $\\alpha_1$ et $\\alpha_2$ possibles (avec $\\alpha_1 < \\alpha_2$).
4. Donner le nom physique de ces deux types de tir (tir tendu et tir en cloche).
5. Calculer la durée du trajet $t_1$ et $t_2$ du projectile pour chacun de ces deux angles.
6. Déterminer la vitesse initiale minimale $v_{0,\\min}$ en deçà de laquelle il est physiquement impossible d'atteindre la cible $C$, quel que soit l'angle de tir $\\alpha$ choisi.`,
      solution: `### 1. Forme trigonométrique en $\\tan\\alpha$
L'équation de la trajectoire d'un projectile lancé depuis l'origine est :
$y = -\\frac{g}{2\\,v_0^2\\,\\cos^2\\alpha}\\,x^2 + (\\tan\\alpha)\\,x$
Comme $\\frac{1}{\\cos^2\\alpha} = \\frac{\\cos^2\\alpha + \\sin^2\\alpha}{\\cos^2\\alpha} = 1 + \\tan^2\\alpha$, on obtient immédiatement :
$y(x) = -\\frac{g\\,x^2}{2\\,v_0^2}\\,(1 + \\tan^2\\alpha) + x\\,\\tan\\alpha$

---

### 2. Équation du second degré en $X = \\tan\\alpha$
Pour que le projectile passe par la cible $C(x_C, y_C)$, ses coordonnées doivent vérifier l'équation de la trajectoire :
$y_C = -\\frac{g\\,x_C^2}{2\\,v_0^2}\\,(1 + \\tan^2\\alpha) + x_C\\,\\tan\\alpha$
En posant $X = \\tan\\alpha$ et en réorganisant tous les termes :
$\\frac{g\\,x_C^2}{2\\,v_0^2}\\,X^2 - x_C\\,X + \\left(y_C + \\frac{g\\,x_C^2}{2\\,v_0^2}\\right) = 0$
Calcul des coefficients numériques :
- Terme $\\frac{g\\,x_C^2}{2\\,v_0^2} = \\frac{9{,}8 \\times (18{,}0)^2}{2 \\times (15{,}0)^2} = \\frac{9{,}8 \\times 324}{2 \\times 225} = \\frac{3175{,}2}{450} = 7{,}056\\text{ m}$
- $A = 7{,}056$
- $B = -x_C = -18{,}0$
- $C = y_C + 7{,}056 = 3{,}0 + 7{,}056 = 10{,}056$
L'équation s'écrit donc :
$7{,}056\\,X^2 - 18{,}0\\,X + 10{,}056 = 0$

---

### 3. Résolution et angles de tir $\\alpha_1$ et $\\alpha_2$
Calcul du discriminant :
$\\Delta = B^2 - 4AC = (-18{,}0)^2 - 4(7{,}056)(10{,}056) = 324 - 283{,}82 = 40{,}18 > 0$
$\\sqrt{\\Delta} = \\sqrt{40{,}18} \\approx 6{,}339$
Les deux racines sont :
$X_1 = \\tan\\alpha_1 = \\frac{18{,}0 - 6{,}339}{2 \\times 7{,}056} = \\frac{11{,}661}{14{,}112} \\approx 0{,}8263 \\implies \\alpha_1 = \\arctan(0{,}8263) \\approx 39{,}6^\\circ$
$X_2 = \\tan\\alpha_2 = \\frac{18{,}0 + 6{,}339}{2 \\times 7{,}056} = \\frac{24{,}339}{14{,}112} \\approx 1{,}7247 \\implies \\alpha_2 = \\arctan(1{,}7247) \\approx 59{,}9^\\circ$
Les deux angles de tir possibles sont **$\\alpha_1 = 39{,}6^\\circ$** et **$\\alpha_2 = 59{,}9^\\circ$** (environ $40^\\circ$ et $60^\\circ$).

---

### 4. Noms physiques des deux tirs
- **$\\alpha_1 = 39{,}6^\\circ$** correspond au **tir tendu** : trajectoire plus basse, plus directe, flèche réduite, durée de vol minimale.
- **$\\alpha_2 = 59{,}9^\\circ$** correspond au **tir en cloche** (ou plongeant) : trajectoire haute, flèche élevée, durée de vol plus longue, utile pour franchir des obstacles avant de retomber sur la cible.

---

### 5. Durées de parcours $t_1$ et $t_2$
Comme $x(t) = (v_0\\cos\\alpha)\\,t$, la durée de vol jusqu'à $x_C$ est :
$t = \\frac{x_C}{v_0\\cos\\alpha}$
- **Pour $\\alpha_1 = 39{,}6^\\circ$** :
  $\\cos(39{,}6^\\circ) \\approx 0{,}7705 \\implies t_1 = \\frac{18{,}0}{15{,}0 \\times 0{,}7705} = \\frac{18{,}0}{11{,}558} \\approx 1{,}56\\text{ s}$
- **Pour $\\alpha_2 = 59{,}9^\\circ$** :
  $\\cos(59{,}9^\\circ) \\approx 0{,}5015 \\implies t_2 = \\frac{18{,}0}{15{,}0 \\times 0{,}5015} = \\frac{18{,}0}{7{,}523} \\approx 2{,}39\\text{ s}$

---

### 6. Vitesse initiale minimale $v_{0,\\min}$
Pour que l'équation du second degré en $X = \\tan\\alpha$ admette au moins une solution réelle, le discriminant $\\Delta$ doit être positif ou nul :
$\\Delta = x_C^2 - 4\\left(\\frac{g\\,x_C^2}{2\\,v_0^2}\\right)\\left(y_C + \\frac{g\\,x_C^2}{2\\,v_0^2}\\right) \\ge 0$
En simplifiant par $x_C^2 > 0$ :
$1 - \\frac{2\\,g}{v_0^2}\\left(y_C + \\frac{g\\,x_C^2}{2\\,v_0^2}\\right) \\ge 0 \\implies v_0^4 - 2\\,g\\,y_C\\,v_0^2 - g^2\\,x_C^2 \\ge 0$
À la limite d'accessibilité (discriminant nul), la vitesse minimale vérifie :
$v_{0,\\min}^2 = g\\,y_C + \\sqrt{g^2\\,y_C^2 + g^2\\,x_C^2} = g\\left(y_C + \\sqrt{x_C^2 + y_C^2}\\right) = g(y_C + OC)$
Application numérique :
- Distance à la cible : $OC = \\sqrt{18{,}0^2 + 3{,}0^2} = \\sqrt{324 + 9} = \\sqrt{333} \\approx 18{,}25\\text{ m}$
- $v_{0,\\min}^2 = 9{,}8 \\times (3{,}0 + 18{,}25) = 9{,}8 \\times 21{,}25 = 208{,}25\\text{ m}^2\\cdot\\text{s}^{-2}$
$v_{0,\\min} = \\sqrt{208{,}25} \\approx 14{,}43\\text{ m}\\cdot\\text{s}^{-1}$
La vitesse minimale requise pour toucher la cible $C$ est de **$14{,}43\\text{ m}\\cdot\\text{s}^{-1}$**. Avec $v_0 = 15{,}0\\text{ m}\\cdot\\text{s}^{-1} > 14{,}43\\text{ m}\\cdot\\text{s}^{-1}$, la cible est bien à portée !`,
      baremeAstuce: `Barème officiel Bac S2 :
- Transformation avec 1/cos²α = 1 + tan²α : 0,5 pt
- Établissement de l'équation du second degré en tan α et coefficients : 1 pt
- Calcul du discriminant et des deux angles α₁ et α₂ : 1 pt
- Définition tir tendu et tir en cloche : 0,5 pt
- Calcul des durées de vol t₁ et t₂ : 0,5 pt
- Détermination de la vitesse minimale v₀,min (parabole de sécurité) : 0,5 pt.
Astuce correcteur : Cette équation en tan α est le grand classique d'excellence du Bac S2 ! Pensez toujours à poser X = tan α pour obtenir un polynôme classique AX² + BX + C = 0.`,
    },
    {
      year: 2020,
      session: 'Session Normale (S2)',
      points: 'Exercice 3 — Mécanique (4 Points)',
      topic: 'Lancement d\'une Balle de Tennis depuis une Hauteur Initiale non nulle y₀ ≠ 0, Service, Franchissement du Filet et Carré de Service',
      enonce: `Lors d'un match de tennis au stade de Dakar, un joueur effectue un service en frappant la balle en un point $A$ situé à la hauteur $h = 2{,}45\\text{ m}$ au-dessus du sol. Le vecteur vitesse initiale $\\vec{v}_0$ est horizontal ($\\alpha = 0^\\circ$) de norme $v_0 = 30{,}0\\text{ m}\\cdot\\text{s}^{-1}$. Le repère orthonormé $(O, \\vec{i}, \\vec{j})$ est choisi tel que l'origine $O$ est au sol à la verticale de $A$, l'axe $(Ox)$ horizontal orienté vers l'adversaire et l'axe $(Oy)$ vertical ascendant. On prendra $g = 9{,}8\\text{ m}\\cdot\\text{s}^{-2}$ et on néglige toute résistance de l'air.
Le filet, d'une hauteur $H_{\\text{filet}} = 0{,}90\\text{ m}$, est situé à la distance $d = 12{,}0\\text{ m}$ du point de service. La ligne de fond du carré de service adverse est située à $D = 18{,}4\\text{ m}$ de $O$.

1. Établir les équations horaires du mouvement du centre d'inertie de la balle $x(t)$ et $y(t)$.
2. En déduire l'équation cartésienne de la trajectoire $y(x)$. Préciser sa nature géométrique.
3. Le service est-il réussi du point de vue du filet ? C'est-à-dire : la balle franchit-elle le filet ? Justifier par le calcul en précisant la marge de passage.
4. Pour que le service soit considéré comme valable, la balle doit impérativement rebondir dans le carré de service, c'est-à-dire que le point d'impact au sol $I(x_I, y=0)$ doit vérifier :
$d < x_I < D$
a) Déterminer la date d'impact $t_I$ de la balle avec le sol.
b) Calculer l'abscisse du point d'impact $x_I$. Le service est-il jugé « bon » (in) ou « faute » (long) ?
5. Déterminer la norme du vecteur vitesse $\\vec{v}_I$ de la balle au moment du premier rebond sur le sol ainsi que l'angle $\\theta$ que fait ce vecteur avec l'horizontale.
6. Le joueur souhaite que sa balle retombe exactement sur la ligne de fond du carré de service ($x_I = D = 18{,}4\\text{ m}$). En conservant la même hauteur $h = 2{,}45\\text{ m}$ et un tir horizontal, quelle valeur devrait-il donner à sa vitesse initiale $v'_0$ ?`,
      solution: `### 1. Équations horaires du mouvement
- **Système** : {Balle de tennis assimilée à un point matériel}.
- **Référentiel** : Terrestre supposé galiléen, repère $(O, \\vec{i}, \\vec{j})$.
- **Forces** : Poids seul $\\vec{P} = m\\vec{g}$ (chute libre).
D'après le TCI : $\\vec{a} = \\vec{g} \\implies \\begin{cases} a_x(t) = 0 \\\\ a_y(t) = -g \\end{cases}$
- **Conditions initiales** à $t = 0$ :
$\\vec{OM}_0 \\begin{pmatrix} x_0 = 0 \\\\ y_0 = h = 2{,}45\\text{ m} \\end{pmatrix} \\quad ; \\quad \\vec{v}_0 \\begin{pmatrix} v_{0x} = v_0 \\\\ v_{0y} = 0 \\end{pmatrix}$ (car $\\alpha = 0$)
- **Vecteur vitesse** :
$\\vec{v}(t) \\begin{cases} v_x(t) = v_0 \\\\ v_y(t) = -gt \\end{cases}$
- **Vecteur position** :
$\\vec{OM}(t) \\begin{cases} x(t) = v_0\\,t \\\\ y(t) = -\\frac{1}{2}gt^2 + h \\end{cases}$

---

### 2. Équation cartésienne de la trajectoire
De $x(t) = v_0\\,t$, on déduit $t = \\frac{x}{v_0}$. En substituant dans $y(t)$ :
$y(x) = -\\frac{g}{2v_0^2}\\,x^2 + h$
Application numérique :
$y(x) = -\\frac{9{,}8}{2 \\times (30{,}0)^2}\\,x^2 + 2{,}45 = -\\frac{9{,}8}{1800}\\,x^2 + 2{,}45 \\approx -0{,}005444\\,x^2 + 2{,}45$
La trajectoire est une **branche de parabole** à concavité tournée vers le bas, dont le sommet est le point initial $A(0, h)$.

---

### 3. Franchissement du filet ($x = d = 12{,}0\\text{ m}$)
Calculons la hauteur de la balle au-dessus du sol à l'abscisse du filet :
$y(12{,}0) = -0{,}005444 \\times (12{,}0)^2 + 2{,}45 = -0{,}005444 \\times 144 + 2{,}45 = -0{,}784 + 2{,}45 = 1{,}666\\text{ m} \\approx 1{,}67\\text{ m}$
La hauteur du filet étant $H_{\\text{filet}} = 0{,}90\\text{ m}$ :
$y(12{,}0) - H_{\\text{filet}} = 1{,}67 - 0{,}90 = +0{,}77\\text{ m} > 0$
La balle franchit largement le filet avec une marge de sécurité de **$77\\text{ cm}$**.

---

### 4. Étude de l'impact au sol
a) Date d'impact $t_I$ (ordonnée $y(t_I) = 0$) :
$-\\frac{1}{2}gt_I^2 + h = 0 \\implies t_I = \\sqrt{\\frac{2h}{g}} = \\sqrt{\\frac{2 \\times 2{,}45}{9{,}8}} = \\sqrt{\\frac{4{,}9}{9{,}8}} = \\sqrt{0{,}5} \\approx 0{,}707\\text{ s}$
Remarque remarquable : la durée de chute ne dépend que de la hauteur $h$ et de $g$, indépendamment de la vitesse horizontale $v_0$ !

b) Abscisse du point d'impact :
$x_I = v_0\\,t_I = 30{,}0 \\times 0{,}707 \\approx 21{,}21\\text{ m}$
Comme $x_I = 21{,}21\\text{ m} > D = 18{,}4\\text{ m}$, la balle retombe au-delà de la ligne de service :
Le service est donc jugé **« faute » (balle longue de $2{,}81\\text{ m}$)**.

---

### 5. Vitesse d'impact et angle avec le sol
- Composantes de la vitesse à la date $t_I$ :
$v_{Ix} = v_0 = 30{,}0\\text{ m}\\cdot\\text{s}^{-1}$
$v_{Iy} = -g\\,t_I = -9{,}8 \\times 0{,}707 \\approx -6{,}93\\text{ m}\\cdot\\text{s}^{-1}$
- Norme de la vitesse d'impact :
$v_I = \\sqrt{v_{Ix}^2 + v_{Iy}^2} = \\sqrt{30{,}0^2 + (-6{,}93)^2} = \\sqrt{900 + 48{,}0} = \\sqrt{948{,}0} \\approx 30{,}79\\text{ m}\\cdot\\text{s}^{-1}$
Vérification par le Théorème de l'Énergie Cinétique (TEC) :
$\\frac{1}{2}mv_I^2 - \\frac{1}{2}mv_0^2 = mgh \\implies v_I = \\sqrt{v_0^2 + 2gh} = \\sqrt{900 + 2 \\times 9{,}8 \\times 2{,}45} = \\sqrt{900 + 48{,}02} = 30{,}79\\text{ m}\\cdot\\text{s}^{-1}$ (parfaite cohérence).
- Angle $\\theta$ avec l'horizontale :
$\\tan\\theta = \\frac{|v_{Iy}|}{v_{Ix}} = \\frac{6{,}93}{30{,}0} \\approx 0{,}231 \\implies \\theta = \\arctan(0{,}231) \\approx 13{,}0^\\circ$ sous l'horizontale.

---

### 6. Ajustement de la vitesse pour un service parfait ($x_I = D = 18{,}4\\text{ m}$)
Comme $t_I = \\sqrt{\\frac{2h}{g}} = 0{,}707\\text{ s}$ reste invariant :
$x_I = v'_0\\,t_I = D \\implies v'_0 = \\frac{D}{t_I} = \\frac{18{,}4}{0{,}707} \\approx 26{,}02\\text{ m}\\cdot\\text{s}^{-1}$
Vérification du franchissement du filet avec cette nouvelle vitesse :
$y(12{,}0) = -\\frac{9{,}8 \\times 12{,}0^2}{2 \\times (26{,}02)^2} + 2{,}45 = -\\frac{1411{,}2}{1354} + 2{,}45 = -1{,}04 + 2{,}45 = 1{,}41\\text{ m} > 0{,}90\\text{ m}$
Le filet est toujours franchi avec succès (marge de $51\\text{ cm}$). Le joueur doit donc réduire sa vitesse de frappe à **$26{,}0\\text{ m}\\cdot\\text{s}^{-1}$** (soit environ $94\\text{ km/h}$).`,
      baremeAstuce: `Barème officiel Bac S2 :
- TCI et équations horaires avec conditions initiales (h et v₀ horizontal) : 1 pt
- Équation de la trajectoire y(x) : 0,5 pt
- Franchissement du filet avec justification numérique : 0,75 pt
- Calcul du temps d'impact t_I et décision « faute » : 0,75 pt
- Norme et angle de la vitesse d'impact (ou TEC) : 0,5 pt
- Calcul de la nouvelle vitesse v'_0 : 0,5 pt.
Astuce correcteur : Dans le cas du tir horizontal (α = 0), t_I ne dépend jamais de v₀ mais uniquement de la hauteur de chute h ! C'est le principe même de l'indépendance des mouvements galiléens.`,
    },
    {
      year: 2015,
      session: 'Session Normale (S2)',
      points: 'Exercice 3 — Mécanique (4 Points)',
      topic: 'Saut d\'un Véhicule par-dessus un Ravin, Rampe Inclinée, Portée et Vitesse d\'Atterrissage',
      enonce: `Pour les besoins d'un spectacle de cascades au Sénégal, un motard aborde un tremplin incliné d'un angle $\\beta = 20^\\circ$ par rapport à l'horizontale. Il quitte le tremplin au point $O$ à la date $t = 0$ avec une vitesse $\\vec{v}_0$ colinéaire au tremplin, de norme $v_0 = 22{,}0\\text{ m}\\cdot\\text{s}^{-1}$.
Le point $O$ est situé à une hauteur $H_0 = 3{,}50\\text{ m}$ au-dessus du sol horizontal de réception. Un ravin d'une largeur $L = 25{,}0\\text{ m}$ sépare le point de décollage de la plate-forme d'atterrissage. On prendra $g = 9{,}8\\text{ m}\\cdot\\text{s}^{-2}$ et on assimilera l'ensemble {moto + motard} à un solide ponctuel de masse $M = 220\\text{ kg}$.

1. Déterminer dans le repère $(O, \\vec{i}, \\vec{j})$ lié au point $O$ (avec $(Ox)$ horizontal et $(Oy)$ vertical ascendant) :
a) Les composantes du vecteur accélération $\\vec{a}$.
b) Les équations horaires $x(t)$ et $y(t)$ de la trajectoire de la moto.
2. Établir l'équation cartésienne de la trajectoire du motard.
3. Déterminer la flèche $y_{\\max}$ de la trajectoire par rapport au point $O$, ainsi que l'altitude maximale $H_{\\max}$ atteinte par rapport au sol.
4. Le sol de la plate-forme d'atterrissage est situé au niveau du sol de référence ($y = -H_0 = -3{,}50\\text{ m}$).
a) Déterminer la date $t_R$ à laquelle le motard atterrit sur la plate-forme.
b) Calculer la portée $x_R$ du saut. Le motard franchit-il le ravin de largeur $L = 25{,}0\\text{ m}$ ?
5. Déterminer la norme du vecteur vitesse $\\vec{v}_R$ au moment du contact avec la plate-forme d'atterrissage en utilisant le Théorème de l'Énergie Cinétique.`,
      solution: `### 1. Vecteur accélération et équations horaires
- **Système** : {Moto + motard de masse $M = 220\\text{ kg}$}.
- **Référentiel** : Terrestre galiléen, repère $(O, \\vec{i}, \\vec{j})$ centré sur le sommet du tremplin.
- **Forces** : Poids seul $\\vec{P} = M\\vec{g}$ (frottements d'air négligés).
Par le TCI : $\\vec{a} = \\vec{g} \\implies a_x = 0 \\quad ; \\quad a_y = -g$.
- **Conditions initiales** en $O$ à $t = 0$ :
$x_0 = 0 \\quad ; \\quad y_0 = 0$
$v_{0x} = v_0\\cos\\beta \\quad ; \\quad v_{0y} = v_0\\sin\\beta$
- **Vecteur vitesse** :
$v_x(t) = v_0\\cos\\beta$
$v_y(t) = -gt + v_0\\sin\\beta$
- **Vecteur position** :
$x(t) = (v_0\\cos\\beta)\\,t$
$y(t) = -\\frac{1}{2}gt^2 + (v_0\\sin\\beta)\\,t$

---

### 2. Équation cartésienne de la trajectoire
On élimine le paramètre temps $t = \\frac{x}{v_0\\cos\\beta}$ :
$y(x) = -\\frac{g}{2v_0^2\\cos^2\\beta}\\,x^2 + (\\tan\\beta)\\,x$
Application numérique :
- $\\beta = 20^\\circ \\implies \\cos(20^\\circ) \\approx 0{,}9397 \\implies \\cos^2(20^\\circ) \\approx 0{,}8830$
- $2v_0^2\\cos^2\\beta = 2 \\times (22{,}0)^2 \\times 0{,}8830 = 2 \\times 484 \\times 0{,}8830 = 854{,}7\\text{ m}^2\\cdot\\text{s}^{-2}$
- $-\\frac{9{,}8}{854{,}7} \\approx -0{,}01147\\text{ m}^{-1}$
- $\\tan(20^\\circ) \\approx 0{,}3640$
$y(x) = -0{,}01147\\,x^2 + 0{,}3640\\,x$

---

### 3. Flèche et altitude maximale
Au sommet de la trajectoire, $v_y(t_S) = 0 \\implies t_S = \\frac{v_0\\sin\\beta}{g}$ :
$t_S = \\frac{22{,}0 \\times \\sin(20^\\circ)}{9{,}8} = \\frac{22{,}0 \\times 0{,}3420}{9{,}8} = \\frac{7{,}524}{9{,}8} \\approx 0{,}768\\text{ s}$
- Flèche par rapport au point de départ $O$ :
$y_{\\max} = y(t_S) = \\frac{(v_0\\sin\\beta)^2}{2g} = \\frac{(7{,}524)^2}{2 \\times 9{,}8} = \\frac{56{,}61}{19{,}6} \\approx 2{,}89\\text{ m}$
- Altitude maximale par rapport au sol :
$H_{\\max} = H_0 + y_{\\max} = 3{,}50 + 2{,}89 = 6{,}39\\text{ m}$

---

### 4. Atterrissage sur la plate-forme ($y = -H_0 = -3{,}50\\text{ m}$)
a) Date d'atterrissage $t_R$ :
$y(t_R) = -\\frac{1}{2}gt_R^2 + (v_0\\sin\\beta)\\,t_R = -3{,}50$
$-\\frac{1}{2}(9{,}8)t_R^2 + 7{,}524\\,t_R + 3{,}50 = 0 \\implies -4{,}9\\,t_R^2 + 7{,}524\\,t_R + 3{,}50 = 0$
$4{,}9\\,t_R^2 - 7{,}524\\,t_R - 3{,}50 = 0$
Discriminant :
$\\Delta = (-7{,}524)^2 - 4(4{,}9)(-3{,}50) = 56{,}61 + 68{,}60 = 125{,}21 > 0$
$\\sqrt{\\Delta} = \\sqrt{125{,}21} \\approx 11{,}19$
La racine positive physiquement admissible est :
$t_R = \\frac{7{,}524 + 11{,}19}{2 \\times 4{,}9} = \\frac{18{,}714}{9{,}8} \\approx 1{,}910\\text{ s}$

b) Portée horizontale du saut :
$x_R = x(t_R) = (v_0\\cos\\beta)\\,t_R = (22{,}0 \\times 0{,}9397) \\times 1{,}910 = 20{,}67 \\times 1{,}910 \\approx 39{,}48\\text{ m}$
Comme $x_R = 39{,}48\\text{ m} > L = 25{,}0\\text{ m}$, le cascadeur franchit très largement le ravin (marge d'atterrissage de $+14{,}48\\text{ m}$).

---

### 5. Vitesse d'atterrissage par le Théorème de l'Énergie Cinétique
Entre le point de décollage $O$ et le point de réception $R$, seul le poids $\\vec{P}$ travaille :
$W(\\vec{P}) = Mg(y_O - y_R) = Mg(0 - (-H_0)) = MgH_0$
D'après le TEC :
$\\Delta E_c = \\frac{1}{2}M v_R^2 - \\frac{1}{2}M v_0^2 = MgH_0$
$\\frac{1}{2}v_R^2 = \\frac{1}{2}v_0^2 + gH_0 \\implies v_R = \\sqrt{v_0^2 + 2gH_0}$
Application numérique :
$v_R = \\sqrt{(22{,}0)^2 + 2 \\times 9{,}8 \\times 3{,}50} = \\sqrt{484 + 68{,}6} = \\sqrt{552{,}6} \\approx 23{,}51\\text{ m}\\cdot\\text{s}^{-1}$
Soit une vitesse d'impact de **$23{,}5\\text{ m}\\cdot\\text{s}^{-1}$** (environ $84{,}6\\text{ km/h}$). Le calcul par le TEC est remarquablement simple et évite de dériver les composantes vectorielles !`,
      baremeAstuce: `Barème officiel Bac S2 :
- TCI, accélération et équations horaires : 1 pt
- Équation de la trajectoire y(x) : 0,5 pt
- Flèche y_max et altitude maximale H_max : 0,75 pt
- Équation du 2nd degré en temps et portée x_R : 1 pt
- Vitesse d'impact par le TEC : 0,75 pt.
Astuce correcteur : Remarquez que la cible d'atterrissage a une ordonnée négative y = -H₀ par rapport à l'origine ! Attention à ne pas confondre le sommet S (où v_y = 0) et le point d'impact P.`,
    },
  ],
  projectile: [], // alias vers projectile_champ_pesanteur
  pesanteur: [], // alias vers projectile_champ_pesanteur
  champ_pesanteur: [], // alias vers projectile_champ_pesanteur
  p3: [], // alias vers projectile_champ_pesanteur
  // P4. MOUVEMENT D'UNE PARTICULE CHARGÉE DANS UN CHAMP ÉLECTRIQUE OU MAGNÉTIQUE UNIFORME (PHYSIQUE S2 - P4)
  particule_champ_e_b: [
    {
      year: 2021,
      session: 'Session Normale (S2)',
      points: 'Exercice 3 — Physique (4 Points)',
      topic: 'Accélération Préalable, Filtre de Vitesses de Wien, Chambre de Déviation Magnétique et Séparation des Isotopes du Magnésium',
      enonce: `Des ions magnésium $^{24}\\text{Mg}^{2+}$ et $^{26}\\text{Mg}^{2+}$ de masses respectives $m_1$ et $m_2$, de même charge $q = +2e$ ($e = 1{,}6 \\times 10^{-19}\\text{ C}$), sont émis avec une vitesse pratiquement négligeable depuis une fente $O_1$.
Données :
- Masse du nucléon : $m_0 = 1{,}66 \\times 10^{-27}\\text{ kg}$ ; $m_1 = 24\\,m_0 \\approx 3{,}984 \\times 10^{-26}\\text{ kg}$ ; $m_2 = 26\\,m_0 \\approx 4{,}316 \\times 10^{-26}\\text{ kg}$.
- On néglige le poids des ions devant les forces électromagnétiques.

**Partie 1 : Accélération des ions**
Les ions sont accélérés entre deux plaques parallèles $P_1$ et $P_2$ par une tension $U_0 = V_{P1} - V_{P2} > 0$. Ils franchissent la fente $O_2$ avec une vitesse $\\vec{v}_1$ pour $^{24}\\text{Mg}^{2+}$ et $\\vec{v}_2$ pour $^{26}\\text{Mg}^{2+}$.
1. Préciser le signe de la tension $U_0$ et justifier la direction et le sens du champ électrostatique $\\vec{E}_0$ entre les plaques.
2. En appliquant le Théorème de l'Énergie Cinétique, exprimer la vitesse $v$ d'un ion à la sortie $O_2$ en fonction de $q$, $U_0$ et de sa masse $m$.
3. Calculer la vitesse $v_1$ de l'isotope $^{24}\\text{Mg}^{2+}$ pour $U_0 = 4000\\text{ V}$.

**Partie 2 : Filtre de vitesses de Wien**
Les ions pénètrent ensuite dans un sélecteur de vitesses constitué de deux plaques séparées d'une distance $d = 5{,}0\\text{ cm}$ soumises à une tension $U$, créant un champ électrique uniforme $\\vec{E}$, et d'un champ magnétique uniforme $\\vec{B}$. Les champs $\\vec{E}$ et $\\vec{B}$ sont perpendiculaires entre eux et perpendiculaires à la trajectoire des ions.
4. Représenter sur un schéma les forces $\\vec{F}_e$ et $\\vec{F}_m$ agissant sur un ion se déplaçant en ligne droite sans déviation.
5. Établir la relation entre la vitesse sélectionnée $v_0$, $E$ et $B$. Calculer la valeur de $B$ pour que les ions de vitesse $v_1 = 2{,}54 \\times 10^5\\text{ m}\\cdot\\text{s}^{-1}$ traversent sans déviation sous un champ électrique $E = 5{,}0 \\times 10^4\\text{ V}\\cdot\\text{m}^{-1}$.

**Partie 3 : Déviation magnétique et séparation isotopique**
À la sortie du filtre en $O_3$, les ions pénètrent dans une chambre où règne un champ magnétique uniforme $\\vec{B}'$ orthogonal au plan de la figure, d'intensité $B' = 0{,}15\\text{ T}$.
6. Montrer que dans la chambre de déviation, le mouvement de chaque ion est circulaire et uniforme. Donner l'expression littérale du rayon $R$ de sa trajectoire.
7. Les ions décrivent des demi-cercles et viennent heurter une plaque photographique en deux points $C_1$ et $C_2$.
   a) Quel isotope frappe le point le plus éloigné de $O_3$ ? Justifier.
   b) Exprimer la distance $\\Delta d = C_1C_2$ en fonction de $v_0$, $q$, $B'$, $m_1$ et $m_2$. Calculer numériquement $\\Delta d$.`,
      solution: `### Partie 1 : Accélération des ions
1. **Signe de la tension et sens du champ $\\vec{E}_0$** :
- Les ions ont une charge positive $q = +2e > 0$. Pour être accélérés de $P_1$ vers $P_2$, la force électrostatique $\\vec{F}_e = q\\vec{E}_0$ doit être dirigée dans le sens du mouvement (de $P_1$ vers $P_2$).
- Comme $q > 0$, $\\vec{E}_0$ est dans le même sens que $\\vec{F}_e$, donc dirigé de $P_1$ vers $P_2$.
- Comme $\\vec{E}_0$ pointe vers les potentiels décroissants : $V_{P1} > V_{P2} \\implies U_0 = V_{P1} - V_{P2} > 0$. La tension accélératrice est strictement positive.

2. **Expression de la vitesse de sortie (T.E.C.)** :
- Système : {Ion de masse $m$, charge $q = +2e$}.
- Référentiel : Terrestre galiléen.
- Force extérieure : Seule la force électrostatique $\\vec{F}_e$ travaille (poids négligé).
$\\Delta E_c = \\frac{1}{2}m v^2 - \\frac{1}{2}m v_0^2 = W(\\vec{F}_e) = q(V_{P1} - V_{P2}) = q\\,U_0$
Comme $v_0 \\approx 0$ :
$\\frac{1}{2}m v^2 = q\\,U_0 \\implies v = \\sqrt{\\frac{2\\,q\\,U_0}{m}}$

3. **Calcul numérique de $v_1$** :
$v_1 = \\sqrt{\\frac{2 \\times 2 \\times 1{,}6 \\times 10^{-19} \\times 4000}{3{,}984 \\times 10^{-26}}} = \\sqrt{\\frac{2{,}56 \\times 10^{-15}}{3{,}984 \\times 10^{-26}}} \\approx 2{,}535 \\times 10^5\\text{ m}\\cdot\\text{s}^{-1}$
Soit **$v_1 \\approx 2{,}54 \\times 10^5\\text{ m}\\cdot\\text{s}^{-1}$**.

---

### Partie 2 : Filtre de vitesses de Wien
4. **Schéma des forces** :
- L'ion subit $\\vec{F}_e = q\\vec{E}$ et $\\vec{F}_m = q\\vec{v} \\wedge \\vec{B}$.
- Pour que la trajectoire soit rectiligne uniforme, la résultante des forces doit être nulle :
$\\vec{F}_e + \\vec{F}_m = \\vec{0} \\implies \\vec{F}_m = -\\vec{F}_e$
Les deux forces sont colinéaires, de même intensité et de sens directement opposés.

5. **Relation de sélection et calcul de $B$** :
$\\|\\vec{F}_e\\| = \\|\\vec{F}_m\\| \\iff |q|\\,E = |q|\\,v_0\\,B \\implies v_0 = \\frac{E}{B}$
On en déduit l'intensité du champ magnétique :
$B = \\frac{E}{v_0} = \\frac{5{,}0 \\times 10^4}{2{,}535 \\times 10^5} \\approx 0{,}197\\text{ T} \\approx 0{,}20\\text{ T}$

---

### Partie 3 : Séparation des isotopes
6. **Mouvement circulaire uniforme** :
- Dans la chambre de déviation, les ions ne subissent que la force magnétique $\\vec{F}_m = q\\vec{v}_0 \\wedge \\vec{B}'$.
- Puissance instantanée : $\\mathcal{P} = \\vec{F}_m \\cdot \\vec{v} = 0$, donc la vitesse reste constante en norme : $v = v_0 = \\text{cte}$ (mouvement uniforme).
- D'après le TCI dans le repère de Frenet $(\\vec{u}_t, \\vec{u}_n)$ :
$m\\vec{a} = \\vec{F}_m \\implies m\\left(a_t\\vec{u}_t + a_n\\vec{u}_n\\right) = |q|v_0 B'\\,\\vec{u}_n$
Selon $\\vec{u}_t$ : $m\\frac{dv}{dt} = 0 \\implies v = \\text{cte}$.
Selon $\\vec{u}_n$ : $m\\frac{v_0^2}{R} = |q|v_0 B' \\implies R = \\frac{m\\,v_0}{|q|\\,B'} = \\text{cte}$.
Le rayon de courbure étant constant et le mouvement plan, la trajectoire est un demi-cercle.

7. **Séparation et écartement $\\Delta d$** :
a) Comme $R = \\frac{m v_0}{|q| B'}$ et que tous les ions ont la même vitesse $v_0$, la même charge $q = 2e$ et baignent dans le même champ $B'$, le rayon est directement proportionnel à la masse :
$m_2 > m_1 \\implies R_2 > R_1$
L'isotope le plus lourd $^{26}\\text{Mg}^{2+}$ décrit le demi-cercle de plus grand rayon et vient donc frapper la plaque au point $C_2$, le plus éloigné de $O_3$.

b) Distance $\\Delta d = C_1C_2$ :
Comme les ions décrivent des demi-cercles, $O_3C_1 = 2R_1$ et $O_3C_2 = 2R_2$.
$\\Delta d = 2(R_2 - R_1) = \\frac{2\\,v_0}{|q|\\,B'}\\,(m_2 - m_1)$
Calcul numérique :
$m_2 - m_1 = (26 - 24) \\times 1{,}66 \\times 10^{-27} = 3{,}32 \\times 10^{-27}\\text{ kg}$
$\\Delta d = \\frac{2 \\times 2{,}535 \\times 10^5 \\times 3{,}32 \\times 10^{-27}}{2 \\times 1{,}6 \\times 10^{-19} \\times 0{,}15} = \\frac{1{,}683 \\times 10^{-21}}{4{,}8 \\times 10^{-20}} \\approx 0{,}03506\\text{ m} = 3{,}51\\text{ cm}$
Les deux isotopes sont séparés par un écart très net de **$3{,}51\\text{ cm}$** sur la plaque photographique.`,
      baremeAstuce: `Barème officiel Bac S2 :
- T.E.C. et vitesse v₁ : 1 pt
- Filtre de Wien (schéma + relation v₀ = E/B) : 1 pt
- Mouvement circulaire uniforme et rayon R : 1 pt
- Déduction de l'isotope le plus éloigné et calcul de Δd : 1 pt.
Astuce correcteur : Attention au piège du diamètre ! La distance entre l'entrée O₃ et le point d'impact est 2R (et non R) car la trajectoire est un demi-cercle complet.`,
    },
    {
      year: 2017,
      session: 'Session Normale (S2)',
      points: 'Exercice 3 — Physique (4 Points)',
      topic: 'Oscilloscope Cathodique, Déviation Électrostatique d\'un Faisceau d\'Électrons, Sensibilité et Tache sur Écran',
      enonce: `Un faisceau d'électrons de masse $m = 9{,}1 \\times 10^{-31}\\text{ kg}$ et de charge $q = -e = -1{,}6 \\times 10^{-19}\\text{ C}$ est émis avec une vitesse initiale négligeable par une cathode $C$.
Les électrons sont accélérés par une anode $A$ sous une tension $U_0 = V_A - V_C = 1000\\text{ V}$.
Ils pénètrent ensuite au point $O$, avec une vitesse horizontale $\\vec{v}_0$, entre les deux armatures horizontales $P_1$ et $P_2$ d'un condensateur plan de longueur $L = 6{,}0\\text{ cm}$, distantes de $d = 2{,}0\\text{ cm}$. Une tension constante $U = V_{P1} - V_{P2} = 120\\text{ V}$ est appliquée entre les armatures.
Un écran fluorescent est placé perpendiculairement à l'axe initial $(Ox)$ à la distance $D = 30{,}0\\text{ cm}$ du centre $I$ des plaques.

1. Calculer la norme $v_0$ du vecteur vitesse des électrons à leur entrée en $O$.
2. Comparer le poids d'un électron à la force électrostatique subie dans le condensateur. Conclure.
3. Établir, dans le repère $(O, \\vec{i}, \\vec{j})$, les équations horaires du mouvement d'un électron entre les plaques.
4. Montrer que l'équation cartésienne de la trajectoire s'écrit :
$y(x) = \\frac{e\\,U}{2\\,m\\,d\\,v_0^2}\\,x^2$
Calculer l'ordonnée $y_S$ de l'électron à la sortie des plaques ($x = L$). Vérifier que l'électron ne heurte pas les armatures.
5. Déterminer la déviation angulaire $\\alpha$ du faisceau à la sortie du condensateur.
6. Exprimer la déviation linéaire $Y$ du spot sur l'écran en fonction de $U$, $L$, $D$, $d$ et $U_0$.
7. Définir la sensibilité de déflexion de cet oscilloscope $s = \\frac{Y}{U}$ et calculer sa valeur en $\\text{mm}\\cdot\\text{V}^{-1}$.`,
      solution: `### 1. Vitesse initiale $v_0$ (Accélération par $U_0$)
D'après le Théorème de l'Énergie Cinétique entre la cathode et l'anode :
$\\frac{1}{2}m v_0^2 - 0 = -e(V_C - V_A) = e\\,U_0 \\implies v_0 = \\sqrt{\\frac{2\\,e\\,U_0}{m}}$
$v_0 = \\sqrt{\\frac{2 \\times 1{,}6 \\times 10^{-19} \\times 1000}{9{,}1 \\times 10^{-31}}} = \\sqrt{3{,}516 \\times 10^{14}} \\approx 1{,}875 \\times 10^7\\text{ m}\\cdot\\text{s}^{-1}$
Soit **$v_0 \\approx 1{,}88 \\times 10^7\\text{ m}\\cdot\\text{s}^{-1}$**.

---

### 2. Comparaison du poids $P$ et de la force électrostatique $F_e$
- Poids : $P = m\\,g = 9{,}1 \\times 10^{-31} \\times 9{,}8 \\approx 8{,}92 \\times 10^{-30}\\text{ N}$.
- Champ électrique : $E = \\frac{U}{d} = \\frac{120}{0{,}02} = 6000\\text{ V}\\cdot\\text{m}^{-1}$.
- Force électrostatique : $F_e = e\\,E = 1{,}6 \\times 10^{-19} \\times 6000 = 9{,}6 \\times 10^{-16}\\text{ N}$.
- Rapport : $\\frac{F_e}{P} = \\frac{9{,}6 \\times 10^{-16}}{8{,}92 \\times 10^{-30}} \\approx 1{,}08 \\times 10^{14} \\gg 1$.
Le poids est plus de cent mille milliards de fois plus faible que la force électrique : il est rigoureusement négligeable devant $\\vec{F}_e$.

---

### 3. Équations horaires entre les plaques
- Système : {Électron de masse $m$, charge $q = -e$}.
- TCI : $m\\vec{a} = \\vec{F}_e = -e\\vec{E}$.
Comme $V_{P1} > V_{P2}$, $\\vec{E}$ est vertical descendant ($\\vec{E} = -E\\vec{j}$), d'où $\\vec{F}_e = -e(-E\\vec{j}) = e E\\vec{j}$ (force dirigée vers le haut, vers la plaque positive $P_1$).
- Accélération :
$\\vec{a} \\begin{pmatrix} a_x = 0 \\\\ a_y = \\frac{e E}{m} = \\frac{e U}{m d} \\end{pmatrix}$
- Vitesse par intégration avec $\\vec{v}_0(v_0, 0)$ :
$\\vec{v}(t) \\begin{pmatrix} v_x(t) = v_0 \\\\ v_y(t) = \\frac{e U}{m d}\\,t \\end{pmatrix}$
- Position par intégration avec $x_0 = 0, y_0 = 0$ :
$\\vec{OM}(t) \\begin{pmatrix} x(t) = v_0\\,t \\\\ y(t) = \\frac{e U}{2 m d}\\,t^2 \\end{pmatrix}$

---

### 4. Trajectoire et vérification de non-heurt
En éliminant $t = \\frac{x}{v_0}$ :
$y(x) = \\frac{e\\,U}{2\\,m\\,d\\,v_0^2}\\,x^2$
À la sortie ($x = L = 0{,}06\\text{ m}$) :
$y_S = \\frac{1{,}6 \\times 10^{-19} \\times 120 \\times (0{,}06)^2}{2 \\times 9{,}1 \\times 10^{-31} \\times 0{,}02 \\times (1{,}875 \\times 10^7)^2} \\approx 5{,}40 \\times 10^{-3}\\text{ m} = 0{,}54\\text{ cm}$
Pour ne pas heurter les plaques, il faut que $|y_S| < \\frac{d}{2} = 1{,}0\\text{ cm}$.
Puisque $0{,}54\\text{ cm} < 1{,}0\\text{ cm}$, les électrons émergent sans heurter les armatures.

---

### 5. Déviation angulaire $\\alpha$
$\\tan\\alpha = \\left.\\frac{dy}{dx}\\right|_{x=L} = \\frac{e U L}{m d v_0^2} = \\frac{2\\,y_S}{L} = \\frac{2 \\times 0{,}0054}{0{,}06} = 0{,}18$
$\\alpha = \\arctan(0{,}18) \\approx 10{,}2^\\circ$

---

### 6. Déviation linéaire $Y$ sur l'écran
La tangente à la trajectoire en $S$ coupe l'axe $(Ox)$ au milieu du condensateur en $x = \\frac{L}{2}$.
Comme l'écran est à la distance $D$ du centre des plaques :
$Y = D\\,\\tan\\alpha = D\\,\\frac{e U L}{m d v_0^2}$
Or $\\frac{1}{2}m v_0^2 = e U_0 \\implies m v_0^2 = 2 e U_0$. En injectant :
$Y = \\frac{e U L D}{d \\times 2 e U_0} = \\frac{U\\,L\\,D}{2\\,d\\,U_0}$
Calcul numérique :
$Y = \\frac{120 \\times 0{,}06 \\times 0{,}30}{2 \\times 0{,}02 \\times 1000} = \\frac{2{,}16}{40} = 0{,}054\\text{ m} = 5{,}4\\text{ cm}$

---

### 7. Sensibilité de déflexion $s$
$s = \\frac{Y}{U} = \\frac{L\\,D}{2\\,d\\,U_0} = \\frac{0{,}06 \\times 0{,}30}{2 \\times 0{,}02 \\times 1000} = 4{,}5 \\times 10^{-4}\\text{ m}\\cdot\\text{V}^{-1} = 0{,}45\\text{ mm}\\cdot\\text{V}^{-1}$
Pour chaque volt supplémentaire appliqué entre les plaques, le spot se déplace de **$0{,}45\\text{ mm}$** sur l'écran.`,
      baremeAstuce: `Barème officiel Bac S2 :
- Vitesse initiale v₀ et comparaison P/Fe : 0,75 pt
- Équations horaires et équation de la trajectoire : 1 pt
- Calcul de y_S et justification du non-heurt : 0,75 pt
- Déviation angulaire et relation Y = (U L D)/(2 d U₀) : 1 pt
- Sensibilité s : 0,5 pt.
Astuce correcteur : Remarquez la remarquable simplification de e et m dans l'expression de Y en fonction de U₀ ! La déviation Y est totalement indépendante de la nature de la particule chargée (électron ou proton).`,
    },
  ],
  particule: [], // alias vers particule_champ_e_b
  champ_e_b: [], // alias vers particule_champ_e_b
  p4: [], // alias vers particule_champ_e_b
  // 0. ALCOOLS (CHIMIE S2 - C1)
  alcools: [
    {
      year: 2022,
      session: 'Session Normale (S2)',
      points: 'Exercice 1 — Chimie Organique (4 Points)',
      topic: 'Formule brute, Isomères de position et de chaîne, Classes d\'alcools et Test de Lucas',
      enonce: `Un monoalcool saturé non cyclique $A$ a une masse molaire $M = 74\\text{ g/mol}$.

1. Déterminer la formule brute de cet alcool.
2. Écrire les formules semi-développées de tous les isomères de constitution correspondant à cette formule brute.
3. Donner le nom officiel UICPA et la classe ($1^\\circ, 2^\\circ, 3^\\circ$) de chacun de ces isomères.
4. On réalise le test de Lucas ($ZnCl_2 + HCl$) sur un échantillon de chacun des isomères à température ambiante :
   - L'isomère $A_1$ donne un trouble laiteux immédiat (en moins de 30 secondes).
   - L'isomère $A_2$ donne un trouble après 5 minutes.
   - Les isomères $A_3$ et $A_4$ ne donnent aucun trouble à froid.
   Identifier formellement $A_1$ et $A_2$.
5. Expliquer pourquoi le butan-1-ol bout à $+118^\\circ\\text{C}$ alors que le pentane ($M = 72\\text{ g/mol}$) bout à $+36^\\circ\\text{C}$.`,
      solution: `### 1. Formule brute de l'alcool
La formule générale d'un monoalcool saturé est $C_n H_{2n+2}O$.
Sa masse molaire s'écrit :
$$M = 12n + (2n + 2) \\times 1 + 16 = 14n + 18$$
On a donc :
$$14n + 18 = 74 \\implies 14n = 56 \\implies n = 4$$
La formule brute de l'alcool est **$C_4H_{10}O$**.

---

### 2 & 3. Formules semi-développées, Noms UICPA et Classes
Il existe 4 isomères alcools pour la formule $C_4H_{10}O$ :

1. **$CH_3-CH_2-CH_2-CH_2-OH$** : **Butan-1-ol**
   - Carbone fonctionnel lié à 1 seul carbone $\\implies$ **Alcool Primaire ($1^\\circ$)**.
2. **$CH_3-CH_2-CH(OH)-CH_3$** : **Butan-2-ol**
   - Carbone fonctionnel lié à 2 carbones $\\implies$ **Alcool Secondaire ($2^\\circ$)**.
3. **$CH_3-CH(CH_3)-CH_2-OH$** : **2-méthylpropan-1-ol**
   - Carbone fonctionnel lié à 1 seul carbone $\\implies$ **Alcool Primaire ($1^\\circ$)**.
4. **$CH_3-C(CH_3)(OH)-CH_3$** : **2-méthylpropan-2-ol**
   - Carbone fonctionnel lié à 3 carbones $\\implies$ **Alcool Tertiaire ($3^\\circ$)**.

---

### 4. Identification par le test de Lucas
- **$A_1$ donne un trouble immédiat** : c'est la caractéristique exclusive des alcools tertiaires. Donc **$A_1$ est le 2-méthylpropan-2-ol**.
- **$A_2$ donne un trouble après 5 minutes** : c'est la signature des alcools secondaires. Donc **$A_2$ est le butan-2-ol**.
- Les alcools primaires ($A_3$ et $A_4$) ne réagissent pas à température ambiante, ce qui correspond bien au butan-1-ol et au 2-méthylpropan-1-ol.

---

### 5. Comparaison des températures d'ébullition
Bien que le butan-1-ol ($M = 74\\text{ g/mol}$) et le pentane ($M = 72\\text{ g/mol}$) aient des masses molaires très voisines :
- La liaison $O-H$ du butan-1-ol est fortement polarisée (différence d'électronégativité $\\Delta\\chi = 3{,}44 - 2{,}20 = 1{,}24$). Il s'établit des **liaisons hydrogène intermoléculaires** fortes ($\\delta^- O - H \\cdots O \\delta^-$) formant un réseau difficile à dissocier.
- Le pentane est une molécule apolaire dépourvue de liaisons hydrogène (seules existent de faibles interactions de Van der Waals).
- Il faut donc apporter beaucoup plus d'énergie thermique pour vaporiser le butan-1-ol, d'où sa température d'ébullition nettement supérieure ($+118^\\circ\\text{C} \\gg +36^\\circ\\text{C}$).`,
      baremeAstuce: `Barème type Bac :
- Calcul de n et formule brute : 0,75 pt
- Les 4 isomères et leurs classes : 1,5 pt (0,375 pt par molécule)
- Identification A1 et A2 avec justification Lucas : 1 pt
- Justification par les liaisons hydrogène (polarisation O-H) : 0,75 pt.
Astuce correcteur : Mentionnez toujours explicitement le terme « liaison hydrogène intermoléculaire » pour obtenir la totalité des points.`,
    },
    {
      year: 2019,
      session: 'Remplacement (S2)',
      points: 'Exercice 1 — Chimie (3,5 Points)',
      topic: 'Solubilité dans l\'eau, Pôle hydrophile vs Chaîne hydrophobe',
      enonce: `On s'intéresse à la solubilité dans l'eau de deux alcools : l'éthanol ($C_2H_5OH$) et l'octan-1-ol ($C_8H_{17}OH$).

1. Rappeler la structure électronique de l'atome d'oxygène ($Z = 8$) et de l'hydrogène ($Z = 1$). Justifier la géométrie coudée et la polarité de la liaison $O-H$.
2. L'éthanol est miscible à l'eau en toutes proportions, alors que la solubilité de l'octan-1-ol dans l'eau n'est que de $0{,}05\\text{ g/100 mL}$ à $20^\\circ\\text{C}$.
   Expliquer cette différence en analysant la structure amphiphile de la molécule d'alcool.
3. Lors d'un mélange dans une ampoule à décanter d'eau et d'octan-1-ol, observera-t-on une ou deux phases ? Quelle phase surnage ? (Donnée : densité de l'octan-1-ol $d = 0{,}83$).`,
      solution: `### 1. Structure électronique et polarité
- Oxygène ($Z = 8$) : structure $1s^2 2s^2 2p^4$ (6 électrons de valence : 2 doublets non liants et 2 électrons célibataires).
- Hydrogène ($Z = 1$) : structure $1s^1$ (1 électron célibataire).
- Autour de l'oxygène, la géométrie est coudée (type $AX_2E_2$ selon VSEPR, angle $\\approx 104{,}5^\\circ$).
- L'oxygène étant plus électronégatif que l'hydrogène ($\\chi_O = 3{,}44 > \\chi_H = 2{,}20$), la liaison $O-H$ est fortement polarisée : $\\delta^- O - H^{\\delta^+}$.

---

### 2. Analyse du caractère amphiphile et solubilité
Une molécule d'alcool présente deux parties antagonistes :
- Le groupe hydroxyle $-OH$ : polaire et **hydrophile**, capable de former des liaisons hydrogène avec les molécules d'eau.
- La chaîne carbonée $R-$ : apolaire et **hydrophobe** (lipophile).

- **Pour l'éthanol ($C_2H_5OH$)** : La chaîne carbonée est très courte (2 carbones). Le caractère hydrophile du groupe $-OH$ l'emporte largement. Les molécules d'éthanol s'insèrent parfaitement dans le réseau de liaisons hydrogène de l'eau $\\implies$ **miscibilité totale**.
- **Pour l'octan-1-ol ($C_8H_{17}OH$)** : La chaîne carbonée hydrophobe compte 8 carbones. Son encombrement et sa nature apolaire empêchent la pénétration de l'eau et perturbent le réseau de liaisons hydrogène $\\implies$ **insolubilité quasi-totale ($0{,}05\\text{ g/100 mL}$)**.

---

### 3. Observation dans l'ampoule à décanter
On observe **deux phases liquides non miscibles** séparées par un ménisque net.
La phase organique supérieure est constituée d'**octan-1-ol** car sa densité ($d = 0{,}83$) est inférieure à celle de l'eau ($d = 1{,}00$). L'octan-1-ol surnage donc au-dessus de la phase aqueuse.`,
      baremeAstuce: `Points clés au Bac :
- Définir clairement les notions de « pôle hydrophile (-OH) » et « chaîne carbonée hydrophobe (R-) ».
- Justifier la flottaison par la comparaison explicite des densités ($d_\\text{alcool} < d_\\text{eau}$).`,
    },
  ],

  // 0. AMINES (CHIMIE S2 - C2)
  amines: [
    {
      year: 2023,
      session: 'Session Normale (S2)',
      points: 'Exercice 1 — Chimie Organique (4 Points)',
      topic: 'Formule brute d\'une amine, Isomères de constitution, Réaction avec un chlorure d\'acyle et Alkylation d\'Hofmann',
      enonce: `Une monoamine aliphatique saturée non cyclique $A$ contient en masse $23{,}73\\%$ d\'azote.
(Données : $M(C) = 12\\text{ g/mol}$, $M(H) = 1\\text{ g/mol}$, $M(N) = 14\\text{ g/mol}$, $M(Cl) = 35{,}5\\text{ g/mol}$, $M(O) = 16\\text{ g/mol}$).

1. Déterminer la formule brute de l\'amine $A$.
2. Écrire les formules semi-développées de tous les isomères amines correspondant à cette formule brute. Préciser leur nom en nomenclature UICPA et leur classe ($1^\\circ$, $2^\\circ$, $3^\\circ$).
3. On fait réagir l\'isomère $A_1$, qui est une amine secondaire, avec le chlorure d\'éthanoyle $CH_3-CO-Cl$.
   a) Écrire l\'équation-bilan de la réaction en précisant le nom du composé organique obtenu.
   b) Justifier la nécessité d\'utiliser au moins 2 moles d\'amine pour une mole de chlorure d\'éthanoyle.
4. L\'amine primaire $A_2$ est soumise à une réaction avec un excès d\'iodométhane $CH_3-I$ (réaction de polyalkylation d\'Hofmann).
   a) Écrire les équations des réactions successives conduisant au produit terminal.
   b) Nommer le produit final obtenu.`,
      solution: `### 1. Formule brute de l\'amine $A$
La formule générale d\'une monoamine aliphatique saturée s\'écrit $C_n H_{2n+3} N$.
Sa masse molaire moléculaire est :
$$M = 12n + (2n + 3) \\times 1 + 14 = 14n + 17\\text{ g/mol}$$
Le pourcentage massique d\'azote est :
$$\\%N = \\frac{M(N)}{M} \\times 100 = \\frac{14}{14n + 17} \\times 100 = 23{,}73$$
On résout l\'équation :
$$\\frac{1400}{23{,}73} = 14n + 17 \\implies 59{,}00 = 14n + 17 \\implies 14n = 42 \\implies n = 3$$
La masse molaire est donc $M = 59\\text{ g/mol}$ et la formule brute est **$C_3H_9N$**.

---

### 2. Isomères de constitution, Noms UICPA et Classes
Pour la formule $C_3H_9N$, il existe 4 isomères :

1. **$CH_3-CH_2-CH_2-NH_2$** :
   - Nom : **Propan-1-amine**
   - Classe : **Primaire ($1^\\circ$)** (l\'azote porte 2 H et 1 radical alkyle).
2. **$CH_3-CH(NH_2)-CH_3$** :
   - Nom : **Propan-2-amine**
   - Classe : **Primaire ($1^\\circ$)** (l\'azote porte 2 H et 1 radical isopropyle ; attention : le carbone est secondaire mais l\'amine est primaire !).
3. **$CH_3-CH_2-NH-CH_3$** :
   - Nom : **$N$-méthyléthanamine**
   - Classe : **Secondaire ($2^\\circ$)** (l\'azote porte 1 H et 2 radicaux alkyles).
4. **$CH_3-N(CH_3)-CH_3$** ou **$(CH_3)_3N$** :
   - Nom : **$N,N$-diméthylméthanamine** (ou triméthylamine)
   - Classe : **Tertiaire ($3^\\circ$)** (l\'azote porte 0 H et 3 radicaux méthyles).

---

### 3. Réaction avec le chlorure d\'éthanoyle
L\'isomère secondaire est $A_1 : CH_3-CH_2-NH-CH_3$.

a) **Équation-bilan** :
$$CH_3-CO-Cl + 2\\,CH_3-CH_2-NH-CH_3 \\longrightarrow CH_3-CO-N(CH_3)-CH_2-CH_3 + [CH_3-CH_2-NH_2-CH_3]^+ Cl^-$$
- Le composé organique obtenu est un **amide $N,N$-disubstitué** : le **$N$-éthyl-$N$-méthyléthanamide**.
- Le produit secondaire est le chlorure d\'éthylméthylammonium.

b) **Justification du facteur stœchiométrique 2** :
La réaction entre le chlorure d\'acyle et l\'amine libère du chlorure d\'hydrogène $HCl$. Comme l\'amine est une base de Brönsted, elle réagit immédiatement avec $HCl$ selon une réaction acido-basique totale pour former un sel d\'alkylammonium.
Il faut donc une 1ère mole d\'amine pour attaquer le chlorure d\'acyle et former l\'amide, et une 2nde mole d\'amine pour neutraliser le $HCl$ formé.

---

### 4. Alkylation d\'Hofmann de l\'amine primaire $A_2$
Soit $A_2 : CH_3-CH_2-CH_2-NH_2$ (Propan-1-amine).

a) **Étapes successives en présence d\'un excès d\'iodométhane $CH_3I$** :
- **Étape 1 (Amine $1^\\circ \\to$ Amine $2^\\circ$)** :
  $$C_3H_7-NH_2 + CH_3-I \\longrightarrow [C_3H_7-NH_2-CH_3]^+ I^- \\xrightarrow{C_3H_7NH_2} C_3H_7-NH-CH_3 + C_3H_7NH_3^+ I^-$$
- **Étape 2 (Amine $2^\\circ \\to$ Amine $3^\\circ$)** :
  $$C_3H_7-NH-CH_3 + CH_3-I \\longrightarrow [C_3H_7-NH(CH_3)_2]^+ I^- \\xrightarrow{\\text{base}} C_3H_7-N(CH_3)_2 + \\text{sel}$$
- **Étape 3 (Amine $3^\\circ \\to$ Sel quaternaire)** :
  $$C_3H_7-N(CH_3)_2 + CH_3-I \\longrightarrow [C_3H_7-N(CH_3)_3]^+ I^-$$

b) **Nom du produit final** :
**Iodure de triméthylpropylammonium** (sel d\'ammonium quaternaire). La chaîne de substitutions s\'arrête car l\'azote n\'a plus d\'hydrogène remplaçable.`,
      baremeAstuce: 'Au Bac S2, ne confondez jamais la classe de l\'alcool (carbone porteur) et celle de l\'amine (azote porteur). Pour la réaction d\'acylation, écrivez toujours le coefficient 2 devant l\'amine et précisez le sel formé.',
    },
    {
      year: 2019,
      session: 'Session Normale (S2)',
      points: 'Exercice 1 — Chimie Organique (4 Points)',
      topic: 'Propriétés acido-basiques des amines, Effets électroniques et Dosage pH-métrique',
      enonce: `On dispose de trois solutions aqueuses de même concentration molaire $C = 10^{-2}\\text{ mol/L}$ :
- Solution $S_1$ : ammoniac $NH_3$ ($pK_{a1} = 9{,}2$)
- Solution $S_2$ : éthanamine $CH_3-CH_2-NH_2$ ($pK_{a2} = 10{,}7$)
- Solution $S_3$ : aniline (phénylamine) $C_6H_5-NH_2$ ($pK_{a3} = 4{,}6$)

1. Définir une base selon Brönsted et montrer que l\'éthanamine est une base dans l\'eau en écrivant l\'équation de sa réaction avec l\'eau.
2. Comparer les forces relatives des bases présentes dans $S_1$, $S_2$ et $S_3$.
3. Justifier cette différence de basicité à l\'aide des effets électroniques (inducteur et mésomère).
4. On dose un volume $V_b = 20\\text{ mL}$ de la solution d\'éthanamine $S_2$ par une solution d\'acide chlorhydrique de concentration $C_a = 10^{-2}\\text{ mol/L}$.
   a) Écrire l\'équation de la réaction support du titrage.
   b) Déterminer le volume $V_{aE}$ à l\'équivalence.
   c) Préciser la nature du mélange à l\'équivalence et justifier si le $pH_E$ est inférieur, égal ou supérieur à 7.`,
      solution: `### 1. Définition et équation acido-basique
- Une **base de Brönsted** est toute espèce chimique capable de capter au moins un proton $H^+$.
- L\'atome d\'azote de l\'éthanamine possède un doublet non liant libre disponible pour fixer un proton $H^+$.
- En solution aqueuse, l\'équilibre s\'écrit :
$$CH_3-CH_2-NH_2 + H_2O \\rightleftharpoons CH_3-CH_2-NH_3^+ + OH^-$$
Le couple associé est $CH_3-CH_2-NH_3^+ / CH_3-CH_2-NH_2$.

---

### 2. Comparaison des forces basiques
À concentration égale, plus le $pK_a$ du couple acide/base conjugué est grand, plus la base est forte.
On a :
$$pK_{a3} (\\text{aniline, } 4{,}6) < pK_{a1} (\\text{ammoniac, } 9{,}2) < pK_{a2} (\\text{éthanamine, } 10{,}7)$$
Par conséquent, l\'ordre croissant de force basique est :
$$\\text{Aniline} < \\text{Ammoniac} < \\text{Éthanamine}$$
L\'éthanamine est la base la plus forte, l\'aniline est la plus faible.

---

### 3. Justification par les effets électroniques
- **Cas de l\'éthanamine ($CH_3-CH_2-NH_2$) par rapport à l\'ammoniac ($NH_3$)** :
  Le groupe éthyle ($C_2H_5-$) exerce un **effet inducteur donneur d\'électrons ($+I$)**. Il repousse les électrons vers l\'atome d\'azote, augmentant ainsi sa densité électronique. Le doublet non liant de l\'azote devient plus disponible pour capter un proton $H^+$, ce qui renforce le caractère basique de l\'éthanamine par rapport à $NH_3$.
- **Cas de l\'aniline ($C_6H_5-NH_2$)** :
  Le groupe phényle ($C_6H_5-$) est conjugué avec le doublet non liant de l\'azote. Ce doublet participe à la **délocalisation par résonance (mésomérie $+M$)** sur le cycle benzénique. Moins localisé sur l\'atome d\'azote, il est beaucoup moins disponible pour fixer un proton $H^+$. L\'aniline est donc une base beaucoup plus faible que l\'ammoniac.

---

### 4. Titrage de l\'éthanamine par l\'acide chlorhydrique
a) **Équation du titrage** :
$$CH_3-CH_2-NH_2 + H_3O^+ \\longrightarrow CH_3-CH_2-NH_3^+ + H_2O$$
(Réaction quasi-totale, exothermique et rapide).

b) **Volume à l\'équivalence** :
À l\'équivalence :
$$C_a V_{aE} = C_b V_b \\implies V_{aE} = \\frac{C_b V_b}{C_a} = \\frac{10^{-2} \\times 20}{10^{-2}} = 20\\text{ mL}$$

c) **Nature du mélange à l\'équivalence et $pH_E$** :
À l\'équivalence, tous les réactifs ont été consommés dans les proportions stœchiométriques. La solution contient uniquement les ions chlorure spectateurs $Cl^-$ et les ions éthylammonium $CH_3-CH_2-NH_3^+$.
L\'ion $CH_3-CH_2-NH_3^+$ est un acide faible (acide conjugué de l\'éthanamine). Il réagit partiellement avec l\'eau :
$$CH_3-CH_2-NH_3^+ + H_2O \\rightleftharpoons CH_3-CH_2-NH_2 + H_3O^+$$
Le milieu est donc **acide à l\'équivalence : $pH_E < 7$** (typiquement autour de $5{,}8$).`,
      baremeAstuce: 'Retenez bien pour le Bac S2 : le titrage d\'une base faible par un acide fort conduit TOUJOURS à un pH à l\'équivalence acide (pHE < 7). L\'indicateur coloré approprié est donc le rouge de méthyle (zone de virage 4,2 - 6,2) et non la phénolphtaléine.',
    },
  ],

  // 0. ACIDES CARBOXYLIQUES & DÉRIVÉS (CHIMIE S2 - C3)
  acides_derives: [
    {
      year: 2022,
      session: 'Session Normale (S2)',
      points: 'Exercice 2 — Chimie Organique (5 Points)',
      topic: "Estérification directe — Constante d'\u00e9quilibre K, Rendement limite et Dean-Stark",
      enonce: `On étudie l'estérification entre l'acide propanoïque $CH_3CH_2COOH$ et le propan-1-ol $CH_3CH_2CH_2OH$.
On mélange $n_0 = 1{,}00\\\\text{ mol}$ de chaque réactif à température ambiante puis on chauffe à reflux.

1. Écrire l'équation-bilan. Préciser ses caractéristiques cinétique, thermodynamique et thermique.
2. Dresser le tableau d'avancement (avancement $x$). Exprimer $K$ en fonction de $x_{\\\\text{éq}}$ et $n_0$.
3. À l'équilibre, $\\\\chi_{\\\\text{ester}} = 0{,}40$. Calculer $x_{\\\\text{éq}}$ puis $K$.
4. Déduire le taux d'avancement $\\\\tau$ et identifier la classe de l'alcool.
5. On installe un Dean-Stark. a) Expliquer par Le Chatelier comment le rendement augmente. b) Avec $\\\\tau = 98\\\\%$, calculer la masse d'ester. ($M = 116\\\\text{ g/mol}$)`,
      solution: `### 1. Équation-bilan et caractéristiques
$$CH_3CH_2COOH + CH_3CH_2CH_2OH \\\\rightleftharpoons CH_3CH_2COOCH_2CH_2CH_3 + H_2O$$
(Propanoate de propyle + eau)

- **Lente** : catalyseur $H_2SO_4$ ou reflux nécessaire.
- **Limitée / réversible** ($\\\\rightleftharpoons$).
- **Athermique** ($\\\\Delta H \\\\approx 0$) : T n\'influence pas le rendement limite.

---

### 2. Tableau d\'avancement et K

| Espèce | Acide | Alcool | Ester | Eau |
|--------|-------|--------|-------|-----|
| $t=0$ | $n_0$ | $n_0$ | $0$ | $0$ |
| équilibre | $n_0 - x$ | $n_0 - x$ | $x$ | $x$ |

$$K = \\\\left(\\\\frac{x}{n_0-x}\\\\right)^2$$

---

### 3. Calcul de $x_{\\\\text{éq}}$ et $K$

$$\\\\chi_{\\\\text{ester}} = \\\\frac{x_{\\\\text{éq}}}{2n_0} = 0{,}40 \\\\implies x_{\\\\text{éq}} = 0{,}80\\\\text{ mol}$$

$$K = \\\\left(\\\\frac{0{,}80}{0{,}20}\\\\right)^2 = 16$$

---

### 4. Taux et classe

$$\\\\tau = 0{,}80 = 80\\\\% \\\\implies \\\\text{alcool primaire } (1^\\\\circ)$$

---

### 5. Dean-Stark

**a)** Le Dean-Stark élimine l\'eau (produit). Par Le Chatelier, éliminer un produit déplace l'équilibre **dans le sens direct** →, vers plus d\'ester. Le rendement s\'approche de 100 %.

**b)** $m = 0{,}98 \\\\times 116 = 113{,}7\\\\text{ g}$`,
      baremeAstuce: "Bac S2 : (1) ⇌ et non \u2192 pour l\'estérification. (2) K = (x/(n₀−x))². (3) Pour Le Chatelier : « éliminer un produit » + « sens direct ». (4) Chauffer n\'augmente PAS le rendement (athermique)!",
    },
    {
      year: 2018,
      session: 'Session Normale (S2)',
      points: 'Exercice 2 — Chimie Organique (5 Points)',
      topic: "Saponification d\'un corps gras — Stœchiométrie, Masse de savon et Relargage",
      enonce: `On saponifie $n_{\\\\text{TG}} = 0{,}10\\\\text{ mol}$ de tripalmitine $C_3H_5(OOC\\\\text{-}C_{15}H_{31})_3$ par $NaOH$ aqueux.

1. Équation-bilan de la saponification. Nature de la réaction.
2. Identifier les deux produits organiques. Nommer le savon.
3. Calculer $n_{\\\\text{min}}(NaOH)$.
4. a) Calculer $M$ du palmitate de sodium $C_{15}H_{31}COO^-Na^+$. b) Masse de savon produit.
5. On ajoute $NaCl$ en excès. a) Phénomène observé ? Nommer le procédé. b) Explication par l\'ion commun. c) Intérêt industriel.`,
      solution: `### 1. Équation-bilan

$$C_3H_5(OOC\\\\text{-}C_{15}H_{31})_3 + 3\\\\,NaOH \\\\longrightarrow C_3H_5(OH)_3 + 3\\\\,C_{15}H_{31}COO^-Na^+$$

Réaction **totale et irréversible** ($\\\\longrightarrow$). K >> 1. Rapide en milieu chaud basique.

---

### 2. Produits

- **Glycérol** : $C_3H_5(OH)_3$ (propane-1,2,3-triol).
- **Palmitate de sodium** : $C_{15}H_{31}COO^-Na^+$ (savon).

---

### 3. Quantité de NaOH

$$n(NaOH) = 3 \\\\times 0{,}10 = 0{,}30\\\\text{ mol}$$

---

### 4. Masse de savon

**a)** $M = 16 \\\\times 12 + 31 + 2 \\\\times 16 + 23 = 278\\\\text{ g/mol}$

**b)** $n = 3 \\\\times 0{,}10 = 0{,}30\\\\text{ mol}$, $m = 0{,}30 \\\\times 278 = 83{,}4\\\\text{ g}$

---

### 5. Relargage

**a)** Le savon **précipite** (pain de savon flottant). Procédé : **relargage** (*salting-out*).

**b)** $NaCl$ libère $Na^+$ (ion commun avec $RCOO^-Na^+$). La solubilité du savon chute $\\\\implies$ précipitation.

**c)** Purification du savon + récupération du glycérol (cosmétique, pharmacie).`,
      baremeAstuce: "Bac S2 : (1) \u2192 et NON \u21cc pour la saponification. (2) Coefficient 3 devant NaOH obligatoire. (3) Citer « ion Na⁺ commun » pour le relargage. (4) Nommer les deux produits : glycérol ET palmitate de sodium.",
    },
  ],

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

  // 0. AUTOPROTOLYSE DE L'EAU, pH & INDICATEURS COLORÉS (CHIMIE S2 - C5)
  autoprotolyse_ph: [
    {
      year: 2021,
      session: 'Session Normale (S2)',
      points: 'Exercice 1 — Solutions Aqueuses (4 Points)',
      topic: "Autoprotolyse de l'eau, Produit ionique Ke à température variable et Neutralité",
      enonce: `On étudie l'équilibre d'autoprotolyse de l'eau pure :
$$2\\,\\text{H}_2\\text{O} \\rightleftharpoons \\text{H}_3\\text{O}^+ + \\text{OH}^-$$

1. Rappeler la définition du produit ionique de l'eau $K_e$. Donner sa valeur à $25^\\circ\\text{C}$ ainsi que la valeur de $pK_e$.
2. L'autoprotolyse de l'eau est une réaction endothermique ($\\Delta H > 0$).
   a) En appliquant la loi de Le Chatelier (règle de van 't Hoff), justifier l'évolution de la valeur de $K_e$ lorsque la température augmente.
   b) À la température de $60^\\circ\\text{C}$, on mesure que $K_e = 1{,}0 \\times 10^{-13}$. Calculer la valeur de $pK_e$ à cette température.
3. a) Déterminer la valeur du pH de l'eau pure à $60^\\circ\\text{C}$.
   b) Un élève affirme que « cette eau est acide car son pH est inférieur à 7,00 ». Critiquer cette affirmation en précisant la condition générale de neutralité d'une solution aqueuse.`,
      solution: `### 1. Définition et valeurs de $K_e$ et $pK_e$ à $25^\\circ\\text{C}$
- Le **produit ionique de l'eau $K_e$** est la constante d'équilibre associée à la réaction d'autoprotolyse de l'eau :
$$K_e = [\\text{H}_3\\text{O}^+][\\text{OH}^-]$$
- À $25^\\circ\\text{C}$, **$K_e = 1{,}0 \\times 10^{-14}$** et **$pK_e = -\\log(K_e) = 14{,}0$**.

---

### 2. Influence de la température sur $K_e$
a) D'après la loi de van 't Hoff, une élévation de température déplace un équilibre chimique dans le **sens endothermique** ($\\Delta H > 0$), c'est-à-dire ici dans le **sens direct** (formation de plus d'ions $\\text{H}_3\\text{O}^+$ et $\\text{OH}^-$).
Par conséquent, lorsque la température augmente, la concentration en ions augmente et la constante **$K_e$ augmente**.

b) À $60^\\circ\\text{C}$ :
$$pK_e = -\\log(K_e) = -\\log(1{,}0 \\times 10^{-13}) = \\mathbf{13{,}0}$$
*(Remarque : $K_e$ augmente bien de $10^{-14}$ à $10^{-13}$, ce qui confirme la diminution de $pK_e$ de 14 à 13).*

---

### 3. pH de l'eau pure à $60^\\circ\\text{C}$ et neutralité
a) Dans l'eau pure, l'électroneutralité et la stœchiométrie imposent :
$$[\\text{H}_3\\text{O}^+] = [\\text{OH}^-] = \\sqrt{K_e} = \\sqrt{1{,}0 \\times 10^{-13}} = 10^{-6{,}5}\\text{ mol/L}$$
$$\\text{pH} = -\\log[\\text{H}_3\\text{O}^+] = \\mathbf{6{,}50}$$

b) **Critique rigoureuse de l'affirmation de l'élève :**
L'affirmation de l'élève est **fausse**.
- Une solution aqueuse est définie comme **neutre** si et seulement si :
$$[\\text{H}_3\\text{O}^+] = [\\text{OH}^-] \\iff \\text{pH} = \\frac{1}{2}\\,pK_e$$
- La valeur $\\text{pH} = 7{,}00$ n'est le seuil de neutralité **qu'à $25^\\circ\\text{C}$ exclusivement** (car $pK_e = 14{,}00$).
- À $60^\\circ\\text{C}$, le seuil de neutralité est $\\text{pH}_\\text{neutre} = \\frac{1}{2}\\,pK_e = 6{,}50$.
L'eau pure à $60^\\circ\\text{C}$ ayant un pH de $6{,}50$, elle est **strictement NEUTRE**. Elle ne contient aucun acide.`,
      baremeAstuce: "Bac S2 — Piège majeur : ne confondez JAMAIS « pH < 7 » et « milieu acide ». La seule définition absolue de la neutralité est [H₃O⁺] = [OH⁻] = √(Ke), soit pH = ½ pKe.",
    },
    {
      year: 2017,
      session: 'Session Normale (S2)',
      points: 'Exercice 1 — Chimie (4 Points)',
      topic: "Zone de virage des indicateurs colorés, Choix pour un titrage et Effet de dilution",
      enonce: `On dispose d'un indicateur coloré acido-basique, le Bleu de Bromothymol (BBT), noté $\\text{HIn} / \\text{In}^-$, de constante d'acidité $pK_i = 7{,}0$. Sa forme acide $\\text{HIn}$ est jaune et sa forme basique $\\text{In}^-$ est bleue.

1. Écrire l'équation de la réaction de l'indicateur $\\text{HIn}$ avec l'eau.
2. Définir la zone de virage d'un indicateur coloré et donner l'intervalle de pH correspondant pour le BBT.
3. Quelle teinte prend une solution aqueuse de BBT à $\\text{pH} = 6{,}8$ ? Justifier.
4. On dose un volume $V_a = 20\\text{ mL}$ d'acide chlorhydrique de concentration $C_a = 0{,}05\\text{ mol/L}$ par une solution de soude de concentration $C_b = 0{,}05\\text{ mol/L}$.
   a) Justifier pourquoi le BBT est l'indicateur idéal pour repérer l'équivalence de ce dosage.
   b) Que se passe-t-il si l'on dilue 10 fois la solution d'acide chlorhydrique avant le dosage ? Calculer son nouveau pH.`,
      solution: `### 1. Équation de réaction avec l'eau
$$\\text{HIn} + \\text{H}_2\\text{O} \\rightleftharpoons \\text{In}^- + \\text{H}_3\\text{O}^+$$

---

### 2. Définition et zone de virage du BBT
- La **zone de virage** est l'intervalle de pH dans lequel les deux formes $\\text{HIn}$ et $\\text{In}^-$ coexistent en concentrations du même ordre de grandeur ($0{,}1 \\le [\\text{In}^-]/[\\text{HIn}] \\le 10$). L'œil ne distingue plus nettement une seule couleur pure mais perçoit une **teinte sensible** intermédiaire.
- Pour le BBT ($pK_i = 7{,}0$), la zone de virage s'étend approximativement sur $[pK_i - 1 \\,;\\, pK_i + 1]$, soit **entre $\\text{pH} = 6{,}0$ (jaune) et $\\text{pH} = 7{,}6$ (bleu)**.

---

### 3. Teinte à $\\text{pH} = 6{,}8$
$\\text{pH} = 6{,}8$ est compris dans la zone de virage $[6{,}0 \\,;\\, 7{,}6]$.
La solution prend la **teinte sensible verte** (superposition optique de la forme acide jaune et de la forme basique bleue).

---

### 4. Titrage fort-fort et dilution
a) Lors du titrage d'un acide fort par une base forte à $25^\\circ\\text{C}$, la réaction de neutralité $\\text{H}_3\\text{O}^+ + \\text{OH}^- \\to 2\\,\\text{H}_2\\text{O}$ conduit à l'équivalence à une solution neutre de chlorure de sodium, avec **$pH_E = 7{,}00$**.
Le critère de validité impose que le $pH_E$ appartienne à la zone de virage de l'indicateur.
Comme **$7{,}00 \\in [6{,}0 \\,;\\, 7{,}6]$**, le virage du BBT (du jaune au bleu en passant par le vert net) coïncide exactement avec le point d'équivalence : le BBT est donc l'indicateur idéal.

b) **Effet de la dilution par 10 :**
- Concentration initiale : $C_a = 0{,}05\\text{ mol/L} \\implies \\text{pH}_0 = -\\log(0{,}05) = 1{,}30$.
- Après dilution par 10 : $C_a' = 0{,}005\\text{ mol/L} \\implies \\text{pH}' = -\\log(0{,}005) = 2{,}30$.
Le pH augmente exactement de **$+1{,}00$ unité**, tout en restant strictement acide.`,
      baremeAstuce: "Critère Bac S2 : Pour justifier le choix d'un indicateur, énoncez explicitement que « le pH à l'équivalence pHE est inclus dans la zone de virage de l'indicateur ».",
    },
  ],

  // C6 : ACIDE FORT & BASE FORTE — DOSAGE FORT-FORT (CHIMIE S2)
  acide_fort_base_forte: [
    {
      year: 2019,
      session: 'Session Normale (S2)',
      points: 'Exercice 1 — Chimie Générale (4 Points)',
      topic: 'Dosage pH-métrique fort-fort, Méthode des tangentes, Concentrations à divers états et Bilan de matière',
      enonce: `On dose un volume $V_a = 20{,}0\\text{ mL}$ d'une solution aqueuse d'acide chlorhydrique $S_a$ de concentration molaire $C_a$ inconnue par une solution aqueuse d'hydroxyde de sodium $S_b$ de concentration molaire $C_b = 1{,}0 \\times 10^{-1}\\text{ mol/L}$.
Le suivi du pH au cours de l'addition du volume $V_b$ de soude a permis de tracer la courbe $pH = f(V_b)$.

1. Faire un schéma annoté et soigné du dispositif expérimental de dosage pH-métrique.
2. Écrire l'équation-bilan de la réaction de dosage. Quelles sont ses caractéristiques essentielles ?
3. Par la méthode des tangentes parallèles appliquée à la courbe expérimentale, on détermine les coordonnées du point d'équivalence $E$ : $V_{bE} = 16{,}0\\text{ mL}$ et $pH_E = 7{,}00$.
   a) Définir l'équivalence acido-basique.
   b) Calculer la concentration molaire $C_a$ de la solution d'acide chlorhydrique.
4. Calculer la composition molaire et le pH du mélange réactionnel pour un volume de soude versé $V_b = 8{,}0\\text{ mL}$ (demi-équivalence).
5. Quel indicateur coloré parmi la phénolphtaléine ($8{,}2 - 10{,}0$), l'hélianthine ($3{,}1 - 4{,}4$) et le bleu de bromothymol ($6{,}0 - 7{,}6$) conviendrait le mieux pour un dosage colorimétrique ? Justifier rigoureusement.`,
      solution: `### 1. Schéma annoté du dispositif expérimental
Le montage comporte :
- Une **burette graduée** de $25\\text{ mL}$ fixée à une potence, contenant la solution titrante (solution de soude $S_b$, $C_b = 0{,}10\\text{ mol/L}$).
- Un **bécher** de $100\\text{ mL}$ placé sur un agitateur magnétique, contenant le volume prélevé à la pipette jaugée : $V_a = 20{,}0\\text{ mL}$ de la solution titrée d'acide chlorhydrique $S_a$.
- Un **barreau aimanté** pour assurer l'homogénéisation continue de la solution.
- Une **électrode combinée** de pH plongeant dans la solution sans toucher les parois ni le barreau.
- Un **pH-mètre numérique** étalonné relié à l'électrode.

---

### 2. Équation-bilan de la réaction de dosage
L'acide chlorhydrique ($H_3O^+ + Cl^-$) et la soude ($Na^+ + OH^-$) sont totalement dissociés dans l'eau.
L'équation-bilan s'écrit :
$$H_3O^+ + OH^- \\longrightarrow 2\\,H_2O$$
*(Les ions $Na^+$ et $Cl^-$ sont des ions spectateurs).*
**Caractéristiques :** Réaction **totale** (constante $K = 1/K_e = 10^{14}$ à $25^\\circ\\text{C}$), **rapide** et **exothermique** (dégagement de chaleur).

---

### 3. Exploitation du point d'équivalence $E$
a) **Définition de l'équivalence :**
L'équivalence acido-basique est l'état du système où les réactifs (l'acide titré et la base titrante) ont été mélangés dans les **proportions stœchiométriques**. Les ions $H_3O^+$ et $OH^-$ sont alors totalement consommés.

b) **Calcul de la concentration $C_a$ :**
À l'équivalence stœchiométrique :
$$n_a = n_b \iff C_a \\times V_a = C_b \\times V_{bE}$$
$$C_a = \\frac{C_b \\times V_{bE}}{V_a} = \\frac{0{,}10 \\times 16{,}0}{20{,}0} = \\mathbf{8{,}0 \\times 10^{-2}\\text{ mol/L}}$$

---

### 4. Composition et pH à la demi-équivalence ($V_b = 8{,}0\\text{ mL}$)
- Quantité de matière initiale d'ions $H_3O^+$ :
  $$n_0(H_3O^+) = C_a \\times V_a = 8{,}0 \\times 10^{-2} \\times 0{,}020 = 1{,}6 \\times 10^{-3}\\text{ mol}$$
- Quantité d'ions $OH^-$ apportée :
  $$n(OH^-) = C_b \\times V_b = 0{,}10 \\times 0{,}008 = 0{,}80 \\times 10^{-3}\\text{ mol}$$
- Quantité d'ions $H_3O^+$ restante :
  $$n_r(H_3O^+) = 1{,}6 \\times 10^{-3} - 0{,}80 \\times 10^{-3} = 0{,}80 \\times 10^{-3}\\text{ mol}$$
- Volume total du mélange :
  $$V_\\text{tot} = V_a + V_b = 20{,}0 + 8{,}0 = 28{,}0\\text{ mL} = 0{,}028\\text{ L}$$
- Concentration résiduelle en ions hydronium :
  $$[H_3O^+] = \\frac{n_r(H_3O^+)}{V_\\text{tot}} = \\frac{0{,}80 \\times 10^{-3}}{0{,}028} \\approx 2{,}86 \\times 10^{-2}\\text{ mol/L}$$
- Calcul du pH :
  $$pH = -\log(2{,}86 \\times 10^{-2}) = \\mathbf{1{,}54}$$

---

### 5. Choix de l'indicateur coloré
Le pH à l'équivalence vaut **$pH_E = 7{,}00$** (solution de chlorure de sodium, sel neutre).
Pour qu'un indicateur coloré convienne, sa **zone de virage doit impérativement englober le $pH_E$**.
- Zone de virage du **Bleu de bromothymol (BBT)** : $[6{,}0 \\,;\\, 7{,}6]$.
Comme $7{,}00 \in [6{,}0 \\,;\\, 7{,}6]$, le **BBT est l'indicateur idéal**. Il passera nettement du jaune au bleu en traversant sa teinte sensible verte exactement à la goutte équivalente.`,
      baremeAstuce: "Bac S2 : N'oubliez jamais d'ajouter le volume Vb au volume Va pour calculer la concentration à chaque instant : [H₃O⁺] = n_restant / (Va + Vb) !",
    },
    {
      year: 2016,
      session: 'Session Normale (S2)',
      points: 'Exercice 1 — Chimie (4 Points)',
      topic: 'Titrage comparé Monoacide fort (HCl) vs Diacide fort (H₂SO₄) et Volume équivalent',
      enonce: `On réalise deux dosages indépendants à l'aide d'une solution de soude ($Na^+ + OH^-$) de concentration $C_b = 0{,}20\\text{ mol/L}$ :
- **Expérience 1 :** On dose $V_1 = 10{,}0\\text{ mL}$ d'une solution d'acide chlorhydrique $HCl$ de concentration $C_1 = 0{,}10\\text{ mol/L}$.
- **Expérience 2 :** On dose $V_2 = 10{,}0\\text{ mL}$ d'une solution d'acide sulfurique $H_2SO_4$ de concentration $C_2 = 0{,}10\\text{ mol/L}$.

1. Donner l'expression du pH d'une solution de monoacide fort en fonction de sa concentration, puis calculer le pH initial de la solution de $HCl$.
2. En considérant les deux acidités de l'acide sulfurique comme totalement dissociées dans l'eau :
   a) Écrire l'équation de dissolution complète de $H_2SO_4$ dans l'eau.
   b) En déduire la concentration $[H_3O^+]$ et le pH initial de la solution de $H_2SO_4$.
3. Déterminer les volumes de soude $V_{bE1}$ et $V_{bE2}$ nécessaires pour atteindre l'équivalence dans chaque expérience.
4. Comparer les deux volumes équivalents et interpréter le résultat.
5. Quel est le pH du mélange à l'équivalence dans les deux cas à $25^\\circ\\text{C}$ ? Justifier.`,
      solution: `### 1. pH initial de la solution de $HCl$
L'acide chlorhydrique est un monoacide fort :
$$HCl + H_2O \\longrightarrow H_3O^+ + Cl^-$$
$$[H_3O^+] = C_1 = 0{,}10\\text{ mol/L} \\implies pH_1 = -\log(0{,}10) = \\mathbf{1{,}00}$$

---

### 2. Dissolution et pH initial de $H_2SO_4$
a) L'acide sulfurique est un **diacide fort** (dissociation de 2 protons $H^+$) :
$$H_2SO_4 + 2\\,H_2O \\longrightarrow 2\\,H_3O^+ + SO_4^{2-}$$
b) Chaque mole de $H_2SO_4$ libère deux moles de $H_3O^+$ :
$$[H_3O^+] = 2 \\times C_2 = 2 \\times 0{,}10 = 0{,}20\\text{ mol/L}$$
$$pH_2 = -\log(0{,}20) = \\mathbf{0{,}70}$$

---

### 3. Calcul des volumes équivalents
- **Expérience 1 (Monoacide HCl) :**
  $$C_1 \\times V_1 = C_b \\times V_{bE1} \\implies V_{bE1} = \\frac{C_1 \\times V_1}{C_b} = \\frac{0{,}10 \\times 10{,}0}{0{,}20} = \\mathbf{5{,}0\\text{ mL}}$$

- **Expérience 2 (Diacide H₂SO₄) :**
  L'équation de neutralisation globale s'écrit :
  $$(2\\,H_3O^+ + SO_4^{2-}) + 2\\,(Na^+ + OH^-) \\longrightarrow 4\\,H_2O + 2\\,Na^+ + SO_4^{2-}$$
  À l'équivalence stœchiométrique, la quantité de matière d'ions $OH^-$ versée est égale à la quantité d'ions $H_3O^+$ initiale :
  $$n(OH^-) = n(H_3O^+) \iff C_b \\times V_{bE2} = 2 \\times C_2 \\times V_2$$
  $$V_{bE2} = \\frac{2 \\times C_2 \\times V_2}{C_b} = \\frac{2 \\times 0{,}10 \\times 10{,}0}{0{,}20} = \\mathbf{10{,}0\\text{ mL}}$$

---

### 4. Comparaison et interprétation
On constate que **$V_{bE2} = 2 \\times V_{bE1}$** ($10{,}0\\text{ mL} = 2 \\times 5{,}0\\text{ mL}$).
**Interprétation :** À volumes et concentrations molaires identiques, l'acide sulfurique apporte **deux fois plus de protons $H_3O^+$** que l'acide chlorhydrique. Il faut donc verser exactement le **double** de base forte pour parvenir à la neutralisation complète.

---

### 5. pH à l'équivalence à $25^\\circ\\text{C}$
Dans les deux cas, la neutralisation de tous les ions $H_3O^+$ et $OH^-$ aboutit à une solution de sels neutres ($NaCl$ pour le premier, $Na_2SO_4$ pour le second) dont les ions n'ont aucune propriété acido-basique dans l'eau.
Par conséquent, à $25^\\circ\\text{C}$ :
$$\\mathbf{pH_E = 7{,}00}$$
Le point d'équivalence est rigoureusement neutre dans les deux expériences.`,
      baremeAstuce: "Bac S2 — Réflexe classique : Pour H₂SO₄, écrivez TOUJOURS la stœchiométrie n(OH⁻) = 2 n(H₂SO₄) avant d'isoler V_bE !",
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

  // 9. DÉNOMBREMENT (S2 - M11)
  denombrement: [
    {
      year: 2023,
      session: 'Session Normale (S2)',
      points: 'Exercice 1 — Dénombrement & Tirages (4 Points)',
      topic: 'Tirage simultané, tirage successif sans remise, boules bicolores et événement contraire',
      enonce: `Une urne contient $10$ boules indiscernables au toucher :
- $4$ boules rouges numérotées de $1$ à $4$ ;
- $6$ boules vertes numérotées de $1$ à $6$.

**Partie A : Tirage simultané**
On tire simultanément $3$ boules de l'urne.
1. Quel est le nombre total de tirages possibles ?
2. Déterminer le nombre de tirages contenant :
   a) Exactement $2$ boules rouges et $1$ boule verte.
   b) Des boules de la même couleur (tirage unicolore).
   c) Au moins une boule rouge.

**Partie B : Tirage successif sans remise**
On tire successivement et sans remise $3$ boules de l'urne.
1. Quel est le nombre total de tirages possibles ?
2. Déterminer le nombre de tirages contenant $1$ boule rouge au premier tirage et $2$ boules vertes ensuite.`,
      solution: `### Partie A : Tirages simultanés ($C_n^p$)

Comme le tirage est simultané, l'ordre n'intervient pas et il n'y a pas de remise. On utilise les combinaisons $C_n^p$.

**1. Nombre total de tirages possibles**
On choisit 3 boules parmi les 10 boules de l'urne :
$$\\text{Card}(\\Omega_A) = C_{10}^3 = \\frac{10 \\times 9 \\times 8}{3 \\times 2 \\times 1} = 120 \\text{ tirages possibles}$$

**2. a) Tirages avec exactement 2 rouges et 1 verte**
On choisit 2 boules rouges parmi les 4, et 1 boule verte parmi les 6 :
$$N_1 = C_4^2 \\times C_6^1 = \\frac{4 \\times 3}{2} \\times 6 = 6 \\times 6 = 36 \\text{ tirages}$$

**2. b) Tirage unicolore (3 rouges OU 3 vertes)**
Les deux cas sont incompatibles (principe additif) :
$$N_2 = C_4^3 + C_6^3 = 4 + \\frac{6 \\times 5 \\times 4}{3 \\times 2 \\times 1} = 4 + 20 = 24 \\text{ tirages}$$

**2. c) Au moins une boule rouge (Événement contraire)**
Le contraire de « au moins une rouge » est « aucune rouge », c'est-à-dire tirer 3 boules vertes parmi les 6 :
$$N_{\\text{aucune rouge}} = C_6^3 = 20$$
Par soustraction du total :
$$N_3 = \\text{Card}(\\Omega_A) - N_{\\text{aucune rouge}} = 120 - 20 = 100 \\text{ tirages}$$

---

### Partie B : Tirages successifs sans remise ($A_n^p$)

L'ordre des tirages compte impérativement et il n'y a pas de répétition.

**1. Nombre total de tirages possibles**
On forme un arrangement de 3 boules parmi 10 :
$$\\text{Card}(\\Omega_B) = A_{10}^3 = 10 \\times 9 \\times 8 = 720 \\text{ tirages possibles}$$

**2. Tirage d'une rouge en 1er, puis 2 vertes**
- 1er tirage (rouge) : $4$ choix possibles.
- 2e tirage (verte) : $6$ choix possibles.
- 3e tirage (verte) : $5$ choix restants.
$$N = 4 \\times 6 \\times 5 = 120 \\text{ tirages}$$
*(Ou par arrangements : $A_4^1 \\times A_6^2 = 4 \\times (6 \\times 5) = 120$).*`,
      baremeAstuce: `Barème indicatif Office du Bac : Partie A.1 (0,75 pt) · A.2.a (0,75 pt) · A.2.b (0,75 pt) · A.2.c par l'événement contraire (0,75 pt) · Partie B.1 & B.2 (1 pt). Astuce d'Or : Dès que vous lisez « au moins un » dans un sujet de Bac, passez TOUJOURS par l'événement contraire pour gagner du temps et éviter les erreurs d'omission.`,
    },
    {
      year: 2019,
      session: 'Session de Remplacement (S2)',
      points: 'Exercice 1 — Anagrammes & Choix de comités (4 Points)',
      topic: 'Permutations avec répétition, combinaisons et contraintes hiérarchiques',
      enonce: `1. Combien d'anagrammes distincts peut-on former avec les lettres du mot « FATICK » ? Même question avec le mot « CASAMANCE ».
2. Une association de quartier à Saint-Louis compte $8$ hommes et $6$ femmes. On souhaite élire un bureau restreint de $4$ membres.
   a) De combien de façons peut-on composer ce bureau sans distinction de poste ?
   b) Combien de bureaux comportent exactement $2$ hommes et $2$ femmes ?
   c) Le bureau doit obligatoirement être composé d'un Président, d'un Vice-Président, d'un Trésorier et d'un Secrétaire Général. De combien de façons peut-on attribuer ces postes distincts parmi les 14 personnes ?`,
      solution: `### 1. Anagrammes de mots
- Pour « FATICK » : Le mot comporte 6 lettres toutes distinctes.
  $$N_1 = 6! = 720 \\text{ anagrammes}$$
- Pour « CASAMANCE » : Le mot comporte 9 lettres avec des répétitions : la lettre **A** apparaît 3 fois, la lettre **C** apparaît 2 fois, les lettres S, M, N, E apparaissent 1 fois.
  $$N_2 = \\frac{9!}{3! \\times 2!} = \\frac{362\\,880}{6 \\times 2} = \\frac{362\\,880}{12} = 30\\,240 \\text{ anagrammes distincts}$$

---

### 2. Composition du bureau
**a) Bureau de 4 personnes sans distinction de rôle :**
On choisit un sous-ensemble non ordonné de 4 personnes parmi les 14 :
$$N_a = C_{14}^4 = \\frac{14 \\times 13 \\times 12 \\times 11}{4 \\times 3 \\times 2 \\times 1} = 1\\,001 \\text{ bureaux}$$

**b) Parité : 2 hommes et 2 femmes :**
$$N_b = C_8^2 \\times C_6^2 = \\frac{8 \\times 7}{2} \\times \\frac{6 \\times 5}{2} = 28 \\times 15 = 420 \\text{ bureaux}$$

**c) Postes distincts et hiérarchisés :**
Chaque personne reçoit un poste unique : l'ordre et l'attribution comptent. On utilise les arrangements de 4 parmi 14 :
$$N_c = A_{14}^4 = 14 \\times 13 \\times 12 \\times 11 = 24\\,024 \\text{ bureaux différents}$$`,
      baremeAstuce: `Barème Office du Bac : Formule des anagrammes avec répétition n!/(n1!n2!...) (1 pt) · Bureau sans rôles C_14^4 (1 pt) · Bureau paritaire (1 pt) · Postes nommés A_14^4 (1 pt). Conseil : Retenez que « bureau avec postes distincts » = Arrangements ($A_n^p$), alors que « délégation / comité sans rôles » = Combinaisons ($C_n^p$).`,
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

  // ── C7 : ACIDE FAIBLE – BASE FAIBLE – Ka / pKa ──────────────────────────
  acide_faible_base_faible: [
    {
      year: 2021,
      session: 'Session Normale (S2)',
      points: 'Exercice 2 — Chimie des Solutions (5 Points)',
      topic: 'Acide acétique, constante Ka, Henderson-Hasselbalch et diagramme de prédominance',
      enonce: `L'acide acétique $\\text{CH}_3\\text{COOH}$ (noté $\\text{HA}$) forme le couple $\\text{HA}/\\text{A}^-$ avec $pK_a = 4{,}75$ à $25^\\circ\\text{C}$.

**Partie A**

1. Écrire l'équation d'équilibre de dissolution de $\\text{HA}$ dans l'eau. Calculer $K_a$.
2. Expliquer pourquoi $K_a$ ne dépend pas de la concentration de la solution.

**Partie B**

3. On mesure $\\text{pH} = 2{,}875$ pour une solution de $C = 0{,}10\\text{ mol/L}$. Identifier l'espèce prédominante et calculer le coefficient de dissociation $\\alpha$.
4. Tracer le diagramme de prédominance du couple $\\text{HA}/\\text{A}^-$.

**Partie C**

5. On mélange 100 mL de solution de $\\text{HA}$ ($C_a = 0{,}10\\text{ mol/L}$) et 100 mL d'acétate de sodium ($C_b = 0{,}10\\text{ mol/L}$). Calculer le pH.
6. Rôle tampon : que se passe-t-il si on ajoute quelques gouttes d'acide fort à ce mélange ?`,
      solution: `### Partie A

**1. Équation d'équilibre et $K_a$**
$$\\text{CH}_3\\text{COOH} + \\text{H}_2\\text{O} \\rightleftharpoons \\text{CH}_3\\text{COO}^- + \\text{H}_3\\text{O}^+$$
$$K_a = 10^{-4{,}75} \\approx 1{,}78 \\times 10^{-5}$$

**2. Indépendance de $K_a$ vis-à-vis de $C$**
$K_a$ est une constante thermodynamique fixée uniquement par la température (énergie libre de Gibbs). La concentration $C$ modifie $\\alpha$ mais pas le rapport des activités à l'équilibre.

---

### Partie B

**3. Prédominance et $\\alpha$**
$\\text{pH} = 2{,}875 < pK_a = 4{,}75 \\implies$ **$\\text{HA}$ prédomine**.
$$[\\text{H}_3\\text{O}^+] = 10^{-2{,}875} \\approx 1{,}33 \\times 10^{-3}\\text{ mol/L}$$
$$\\alpha = \\frac{[\\text{H}_3\\text{O}^+]}{C} = \\frac{1{,}33 \\times 10^{-3}}{0{,}10} \\approx \\mathbf{1{,}33\\%}$$

**4. Diagramme de prédominance**

Axe pH de 0 à 14, marqueur $pK_a = 4{,}75$ :

| $\\text{pH} < 4{,}75$ | $\\text{pH} = 4{,}75$ | $\\text{pH} > 4{,}75$ |
|:---:|:---:|:---:|
| **HA prédomine** | $[\\text{HA}] = [\\text{A}^-]$ | **A⁻ prédomine** |

---

### Partie C

**5. pH du mélange tampon**
$n_{\\text{HA}} = n_{\\text{A}^-} = 0{,}10 \\times 0{,}100 = 0{,}010\\text{ mol}$. Relation d'Henderson :
$$\\text{pH} = pK_a + \\log\\!\\left(\\frac{n_{\\text{A}^-}}{n_{\\text{HA}}}\\right) = 4{,}75 + \\log(1) = \\mathbf{4{,}75}$$

**6. Rôle tampon**
L'ion acétate $\\text{A}^-$ neutralise les protons ajoutés :
$$\\text{A}^- + \\text{H}_3\\text{O}^+ \\rightleftharpoons \\text{HA} + \\text{H}_2\\text{O}$$
Le pH varie très peu : c'est l'effet tampon.`,
      baremeAstuce: `Barème Office du Bac : équation ⇌ + Ka (0,75 pt) · explication indépendance Ka/T (0,5 pt) · prédominance pH < pKa + calcul α (1,25 pt) · diagramme avec pKa et espèces annotées (1 pt) · Henderson-Hasselbalch pH = 4,75 (1 pt) · rôle tampon avec équation ionique (0,5 pt). Piège fatal : écrire → au lieu de ⇌ pour un acide faible est une erreur éliminatoire au Bac S2 !`,
    },
    {
      year: 2018,
      session: 'Session Normale (S2)',
      points: 'Exercice 3 — Chimie des Solutions (4 Points)',
      topic: 'Classification des couples acide-base, force relative et calcul de pH par Ostwald',
      enonce: `On donne les $pK_a$ à $25^\\circ\\text{C}$ de quatre couples :

| Couple acide/base | $pK_a$ |
|:---|:---:|
| $\\text{HCOOH}/\\text{HCOO}^-$ (acide méthanoïque) | $3{,}75$ |
| $\\text{CH}_3\\text{COOH}/\\text{CH}_3\\text{COO}^-$ (acide acétique) | $4{,}75$ |
| $\\text{H}_2\\text{CO}_3/\\text{HCO}_3^-$ (acide carbonique) | $6{,}35$ |
| $\\text{NH}_4^+/\\text{NH}_3$ (ion ammonium) | $9{,}25$ |

1. Classer les acides par ordre de force décroissante. Justifier par $K_a$.
2. Classer les bases conjuguées par ordre de force basique décroissante et énoncer la relation force acide / force base conjuguée.
3. À $\\text{pH} = 5{,}50$, identifier l'espèce prédominante de chaque couple.
4. Calculer le pH d'une solution de $\\text{HCOOH}$ de concentration $C = 5{,}0 \\times 10^{-2}\\text{ mol/L}$, en admettant $\\alpha \\ll 1$.`,
      solution: `### 1. Classement des acides

$K_a = 10^{-pK_a}$ : plus $pK_a$ petit $\\implies$ plus $K_a$ grand $\\implies$ plus l'acide est fort.

Classement force décroissante : $\\text{HCOOH} > \\text{CH}_3\\text{COOH} > \\text{H}_2\\text{CO}_3 > \\text{NH}_4^+$.

---

### 2. Bases conjuguées

**Relation** : plus un acide est fort, plus sa base conjuguée est faible (et inversement).

Classement force basique décroissante : $\\text{NH}_3 > \\text{HCO}_3^- > \\text{CH}_3\\text{COO}^- > \\text{HCOO}^-$.

---

### 3. Prédominance à pH $= 5{,}50$

| Couple | $pK_a$ | pH vs $pK_a$ | Espèce prédominante |
|:---|:---:|:---:|:---|
| $\\text{HCOOH}/\\text{HCOO}^-$ | $3{,}75$ | $5{,}50 > 3{,}75$ | **$\\text{HCOO}^-$** |
| $\\text{CH}_3\\text{COOH}/\\text{CH}_3\\text{COO}^-$ | $4{,}75$ | $5{,}50 > 4{,}75$ | **$\\text{CH}_3\\text{COO}^-$** |
| $\\text{H}_2\\text{CO}_3/\\text{HCO}_3^-$ | $6{,}35$ | $5{,}50 < 6{,}35$ | **$\\text{H}_2\\text{CO}_3$** |
| $\\text{NH}_4^+/\\text{NH}_3$ | $9{,}25$ | $5{,}50 < 9{,}25$ | **$\\text{NH}_4^+$** |

---

### 4. pH de l'acide méthanoïque

Avec $\\alpha \\ll 1$ : $K_a \\approx x^2 / C$, donc :
$$x = [\\text{H}_3\\text{O}^+] = \\sqrt{K_a \\times C} = \\sqrt{10^{-3{,}75} \\times 5{,}0 \\times 10^{-2}} = \\sqrt{8{,}9 \\times 10^{-6}} \\approx 2{,}98 \\times 10^{-3}\\text{ mol/L}$$
$$\\text{pH} = -\\log(2{,}98 \\times 10^{-3}) \\approx \\mathbf{2{,}53}$$
Vérification : $\\alpha = 2{,}98 \\times 10^{-3} / 5{,}0 \\times 10^{-2} = 6{,}0\\% < 20\\%$ ✓.`,
      baremeAstuce: `Barème Office du Bac : classement acides + justification Ka (0,75 pt) · bases conjuguées + relation inverse (0,75 pt) · 4 prédominances à pH = 5,50 (1 pt) · pH par Ostwald (approximation justifiée) (1,5 pt). Astuce : Pour le diagramme, tracez un axe unique de 0 à 14 et placez les 4 pKa dans l'ordre. Vérifiez TOUJOURS la validité de l'hypothèse α ≪ 1 après le calcul.`,
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

  // B1. ORGANISATION DU SYSTÈME NERVEUX CÉRÉBROSPINAL (SVT S2 - B1)
  systeme_nerveux: [
    {
      year: 2022,
      session: 'Session Normale (S2)',
      points: 'Première Partie — Maîtrise des Connaissances (5 Points)',
      topic: 'Organisation anatomique du système nerveux cérébrospinal, coupe transversale de la moelle épinière et systèmes de protection',
      enonce: `Le système nerveux cérébrospinal des mammifères assure la communication rapide et coordonnée entre l'organisme et son environnement.

1. Définir le **névraxe** (ou système nerveux central) et citer ses deux grandes composantes anatomiques chez l'Homme.
2. Décrire la triple protection mécanique et liquidienne qui enveloppe le névraxe en précisant l'ordre exact des méninges de l'extérieur vers l'intérieur.
3. À l'aide d'un schéma soigné, annoté et orienté d'une **coupe transversale de moelle épinière** :
   a) Mettre en évidence la disposition respective de la substance grise et de la substance blanche.
   b) Indiquer les racines rachidiennes (dorsale et ventrale), le ganglion spinal et le canal de l'épendyme.
   c) Expliquer brièvement pourquoi le nerf rachidien est qualifié de nerf mixte.`,
      solution: `### 1. Définition et composantes du Névraxe (1 point)
Le **névraxe** (ou Système Nerveux Central, SNC) désigne l'ensemble des centres nerveux régulateurs et intégrateurs logés dans les cavités osseuses axiales de l'organisme. Chez l'Homme, il comprend deux grandes parties :
- **L'Encéphale** : logé dans la boîte crânienne (formé du cerveau, du cervelet et du tronc cérébral dont le bulbe rachidien).
- **La Moelle Épinière** : cordon cylindrique blanchâtre logé dans le canal rachidien de la colonne vertébrale.

---

### 2. Les systèmes de protection du névraxe (1,5 point)
Le névraxe, organe particulièrement vulnérable, est protégé par :
1. **Une protection osseuse rigide** : le squelette crânien pour l'encéphale et la colonne vertébrale (empilement des vertèbres) pour la moelle épinière.
2. **Une protection membranaire (les trois méninges)**, ordonnées de l'extérieur vers l'intérieur (mnémotechnique **DAP**) :
   - **La Dure-mère** : membrane conjonctive externe, épaisse, fibreuse et très résistante.
   - **L'Arachnoïde** : membrane médiane fine et avasculaire, en forme de toile d'araignée, délimitant l'espace sous-arachnoïdien.
   - **La Pie-mère** : membrane interne très fine, transparente et richement vascularisée, intimement appliquée contre le tissu nerveux.
3. **Une protection liquidienne** : le **liquide céphalo-rachidien (LCR)** circulant dans l'espace sous-arachnoïdien et dans le canal de l'épendyme, agissant comme un coussin amortisseur hydraulique contre les chocs mécaniques.

---

### 3. Coupe transversale de la moelle épinière & nerf mixte (2,5 points)
**a) Disposition des substances :**
- **Substance grise** : strictement **centrale**, ayant la forme caractéristique d'ailes de papillon ou de lettre « H ». Elle présente deux cornes postérieures (dorsales) étroites et deux cornes antérieures (ventrales) larges et massives. Elle renferme les corps cellulaires des neurones.
- **Substance blanche** : **périphérique**, entourant la substance grise. Elle est divisée en cordons (antérieurs, latéraux, postérieurs) et contient exclusivement des faisceaux de fibres nerveuses myélinisées conductrices.

**b) Éléments de légende du schéma exigé :**
- Fissure médiane antérieure (fente large et profonde côté ventral).
- Sillon médian postérieur (étroit côté dorsal).
- Canal central de l'épendyme (au milieu de la commissure grise).
- Racine dorsale (postérieure) portant le **ganglion spinal**.
- Racine ventrale (antérieure) motrice sans ganglion.
- Tronc du nerf rachidien.

**c) Notion de nerf mixte :**
Le nerf rachidien résulte de la coalescence de la racine dorsale (purement sensitive / afférente) et de la racine ventrale (purement motrice / efférente). Il contient donc à la fois des fibres conductrices centripètes et centrifuges : c'est un **nerf mixte**.`,
      baremeAstuce: 'Au Bac S2, l’orientation de la coupe est primordiale : placez impérativement la fissure médiane antérieure en bas (ou indiquez clairement les orientations Dorsal/Ventral) et le ganglion spinal sur la racine dorsale sous peine de perte de points d’exactitude.',
    },
    {
      year: 2018,
      session: 'Session Normale (S2)',
      points: 'Deuxième Partie — Raisonnement Scientifique (6 Points)',
      topic: 'Expériences de section de Bell et Magendie, dégénérescence wallérienne et localisation des corps cellulaires',
      enonce: `Pour déterminer la fonction des racines du nerf rachidien et la localisation des corps cellulaires des fibres nerveuses, on réalise une série d'expériences chez le chien :

- **Expérience 1** : La section bilatérale d'un nerf rachidien entraîne la perte totale de motricité et de sensibilité du membre correspondant.
- **Expérience 2** : La section de la racine antérieure (ventrale) d'un nerf rachidien entraîne la paralysie du membre, mais la sensibilité reste intacte. Quelques jours plus tard, les fibres du bout périphérique dégénèrent.
- **Expérience 3** : La section de la racine postérieure (dorsale) en avant du ganglion spinal entraîne la perte de sensibilité du membre, la motricité restant normale. Quelques jours après, seules les fibres situées du côté central (entre la section et la moelle) dégénèrent.
- **Expérience 4** : La section de la racine postérieure en arrière du ganglion spinal entraîne également une anesthésie du membre. Les fibres du bout périphérique dégénèrent.

1. Interpréter rigoureusement les résultats des expériences 1, 2 et 3 quant au rôle fonctionnel respectif du nerf rachidien et de ses deux racines.
2. Rappeler le principe de la dégénérescence wallérienne.
3. Déduire des résultats des expériences 2, 3 et 4 la localisation précise des corps cellulaires des fibres motrices et des fibres sensitives.`,
      solution: `### 1. Interprétation fonctionnelle (2,5 points)
- **Expérience 1** : La perte conjointe de la motricité et de la sensibilité démontre que le tronc du nerf rachidien conduit à la fois les influx moteurs et sensitifs : c'est un **nerf mixte**.
- **Expérience 2** : La paralysie motrice isolée prouve que la racine antérieure (ventrale) est la **voie motrice efférente (centrifuge)**. Elle achemine les ordres moteurs de la moelle vers les muscles effecteurs.
- **Expérience 3** : L'anesthésie sensorielle isolée prouve que la racine postérieure (dorsale) est la **voie sensitive afférente (centripète)**. Elle achemine les messages sensoriels des récepteurs vers les centres nerveux.

---

### 2. Principe de la dégénérescence wallérienne (1,5 point)
Lorsqu'une fibre nerveuse est coupée, la partie séparée du corps cellulaire qui contient le noyau trophique (bout périphérique déconnecté) dégénère en quelques jours et disparaît (dégénérescence wallérienne). En revanche, la partie restant en continuité avec le corps cellulaire (bout central) survit et peut régénérer. La dégénérescence indique donc toujours le côté **opposé** au corps cellulaire.

---

### 3. Déduction de la localisation des corps cellulaires (2 points)
- **Fibres motrices (Expérience 2)** : Le bout périphérique dégénère tandis que le bout central attaché à la moelle reste intact. Les corps cellulaires des neurones moteurs sont donc situés dans le centre nerveux : dans la **corne antérieure (ventrale) de la substance grise de la moelle épinière**.
- **Fibres sensitives (Expériences 3 et 4)** :
  - Dans l'expérience 3 (section entre ganglion et moelle), les fibres du côté de la moelle dégénèrent : le corps cellulaire n'est donc pas dans la moelle.
  - Dans l'expérience 4 (section entre récepteurs et ganglion), le bout périphérique dégénère : le corps cellulaire n'est pas en périphérie.
  - Conclusion : Les corps cellulaires des neurones sensitifs (en T) sont situés exclusivement dans le **ganglion spinal de la racine dorsale**.`,
      baremeAstuce: 'Dans l’épreuve de raisonnement du Bac S2, appliquez toujours la démarche : Constat précis → Déduction physiologique → Conclusion rigoureuse.',
    },
  ],

  // B1. TISSU NERVEUX & POTENTIELS BIOÉLECTRIQUES (SVT S2 - B1 LEÇON 2)
  tissu_nerveux: [
    {
      year: 2021,
      session: 'Session Normale (S2)',
      points: 'Deuxième Partie — Raisonnement Scientifique (6 Points)',
      topic: 'Cinétique du potentiel d’action sur axone géant, rôle des flux ioniques Na+/K+, action sélective de la tétrodotoxine (TTX) et du TEA',
      enonce: `Sur un axone géant de calmar maintenu en survie dans de l'eau de mer oxygénée, on introduit une microélectrode réceptrice intracellulaire $R_1$, l'électrode de référence $R_2$ étant placée dans le bain externe. Le dispositif est relié à la voie A d'un oscilloscope cathodique.

1. Avant toute stimulation, l'oscilloscope indique une valeur stable de $-70\\text{ mV}$.
   a) Comment nomme-t-on cette valeur et quelle est son origine ionique au repos ?
   b) Quel est le rôle exact de la pompe $Na^+/K^+$ ATPase dans ce maintien ?

2. On applique une stimulation électrique efficace en $S_1-S_2$. On enregistre un potentiel d'action diphasique d'amplitude $100\\text{ mV}$ (inversion de polarité jusqu'à $+30\\text{ mV}$ suivie d'un retour au repos après une brève hyperpolarisation à $-80\\text{ mV}$).
   Expliquer les mécanismes ioniques membranaires précis (états des canaux ioniques voltage-dépendants et flux ioniques) responsables de :
   - La phase ascendante (dépolarisation).
   - La phase descendante (repolarisation).
   - L'hyperpolarisation terminale.

3. Pour préciser les flux ioniques, on renouvelle l'expérience en ajoutant au milieu de perfusion :
   - Milieu 1 : de la Tétrodotoxine (TTX).
   - Milieu 2 : du Tétraéthylammonium (TEA).
   Préciser l'effet de chacune de ces substances sur l'enregistrement oscillographique et déduire le type de canaux bloqués.`,
      solution: `### 1. Le Potentiel de Repos (PR = -70 mV) (1,5 point)
**a) Définition et origine ionique :**
Il s'agit du **Potentiel de Repos** (ou potentiel de membrane). Il s'explique par :
- Une répartition inégale des ions : forte concentration interne de $K^+$ ($140\\text{ mmol/L}$) et externe de $Na^+$ ($140\\text{ mmol/L}$), et présence de gros anions protéiques intracellulaires non diffusibles $A^-$.
- Une perméabilité membranaire sélective au repos : la membrane est environ 50 à 100 fois plus perméable aux ions $K^+$ qu'aux ions $Na^+$ (canaux de fuite ouverts). Les ions $K^+$ sortent passivement de la cellule selon leur gradient de concentration, ce qui charge positivement la face externe et laisse l'intérieur électronégatif.

**b) Rôle de la pompe $Na^+/K^+$ ATPase :**
C'est un transporteur actif électrogène qui expulse $3\\,Na^+$ contre l'entrée de $2\\,K^+$ en hydrolysant une molécule d'ATP. Elle s'oppose à l'épuisement passif des gradients et maintient la stabilité à long terme des concentrations ioniques.

---

### 2. Mécanismes moléculaires du Potentiel d'Action (2,5 points)
- **Dépolarisation (-70 mV à +30 mV) :** L'atteinte du seuil de dépolarisation critique ($-55\\text{ mV}$) provoque l'ouverture instantanée des **canaux sodium voltage-dépendants (CVD-$Na^+$)**. Il se produit une entrée massive, rapide et passive d'ions $Na^+$ selon leur gradient électrochimique (flux entrant dépolarisant), inversant la polarité membranaire.
- **Repolarisation (+30 mV à -70 mV) :** Les CVD-$Na^+$ s'inactivent automatiquement tandis que les **canaux potassium voltage-dépendants (CVD-$K^+$)** s'ouvrent avec un léger retard. Les ions $K^+$ sortent massivement et passivement de la cellule selon leur gradient électrochimique (flux sortant repolarisant).
- **Hyperpolarisation transitoire (-80 mV) :** La fermeture des CVD-$K^+$ est lente et retardée, provoquant une sortie prolongée d'ions $K^+$ au-delà du potentiel de repos avant fermeture complète. La pompe $Na^+/K^+$ rétablit ensuite les stocks ioniques initiaux.

---

### 3. Action des neurotoxines sélectives (2 points)
- **Milieu 1 (+ TTX) :** La TTX bloque sélectivement les CVD-$Na^+$. Le potentiel d'action est totalement aboli (seul subsiste un potentiel électrotonique infraliminaire ou l'artéfact de choc). Cela confirme que la phase de dépolarisation dépend exclusivement de l'ouverture des canaux sodium voltage-dépendants.
- **Milieu 2 (+ TEA) :** Le TEA bloque sélectivement les CVD-$K^+$. La dépolarisation a lieu normalement jusqu'à $+30\\text{ mV}$, mais la repolarisation rapide est supprimée ; le retour au repos devient extrêmement lent. Cela confirme que la repolarisation dépend directement du flux sortant de $K^+$ via les canaux potassium voltage-dépendants.`,
      baremeAstuce: 'Attention : ne confondez jamais canaux de fuite (toujours ouverts, responsables du PR) et canaux voltage-dépendants (fermés au repos, activés par la variation de potentiel lors du PA).',
    },
    {
      year: 2019,
      session: 'Session Normale (S2)',
      points: 'Première Partie — Maîtrise des Connaissances (5 Points)',
      topic: 'Comparaison des réponses d’une fibre nerveuse isolée et d’un nerf sciatique à des stimulations d’intensités croissantes (Loi du tout ou rien vs Recrutement)',
      enonce: `On dispose de deux préparations neurophysiologiques chez la grenouille :
- Préparation A : une fibre nerveuse isolée (axone unique).
- Préparation B : un nerf sciatique entier disséqué.

Chaque préparation est placée sur des électrodes stimulatrices $S_1-S_2$ et réceptrices $R_1-R_2$ connectées à un oscilloscope. On applique une série de stimulations électriques d'intensités croissantes $I_1 < I_2 < I_3 < I_4 < I_5 < I_6$.

1. Décrire et expliquer l'évolution de l'amplitude de la réponse électrique enregistrée sur la **fibre nerveuse isolée** (Préparation A). Énoncer la loi physiologique mise en évidence.
2. Décrire et expliquer l'évolution de l'amplitude du tracé obtenu sur le **nerf entier** (Préparation B).
3. Pourquoi le nerf entier ne répond-il pas à la même loi que la fibre isolée ? Définir précisément le phénomène en cause.`,
      solution: `### 1. Réponse de la fibre nerveuse isolée & Loi du Tout ou Rien (2 points)
- Pour des intensités faibles $I_1$ et $I_2$ inférieures à l'intensité seuil $I_s$ (stimulations infraliminaires), aucune réponse propagée n'apparaît (l'amplitude est nulle, simple potentiel électrotonique local décrémentiel).
- Dès que l'intensité atteint la valeur seuil $I_s = I_3$ (stimulation liminaire), la fibre émet d'emblée un potentiel d'action d'**amplitude maximale constante** (environ $100\\text{ mV}$).
- Pour toutes les intensités supérieures $I_4, I_5, I_6$ (supraliminaires), l'amplitude du potentiel d'action reste rigoureusement identique.
- **Loi mise en évidence :** La fibre nerveuse isolée obéit strictement à la **Loi du « Tout ou Rien »** : si la stimulation est inférieure au seuil, la fibre ne répond pas (« Rien ») ; dès que le seuil est atteint ou dépassé, la fibre répond avec son amplitude maximale possible qui ne dépend plus de l'intensité (« Tout »).

---

### 2. Réponse du nerf sciatique entier (1,5 point)
- Pour $I < I_{seuil\\,global}$, la réponse est nulle.
- À partir du seuil global, l'amplitude du potentiel d'action diphasique augmente progressivement et régulièrement à mesure que l'intensité de stimulation augmente ($I_3 < I_4 < I_5$).
- À partir d'une certaine intensité $I_5$, l'amplitude atteint un palier maximal et ne progresse plus, même si l'on augmente encore l'intensité jusqu'à $I_6$ (phénomène de saturation).

---

### 3. Explication : Phénomène de Recrutement (1,5 point)
Le nerf entier n'obéit **pas** à la loi du tout ou rien car ce n'est pas une cellule unique, mais un organe constitué de plusieurs milliers de fibres nerveuses différentes :
- Ces fibres possèdent des diamètres variés et des **seuils d'excitabilité différents** (étagés du plus faible au plus élevé).
- Une intensité modérée n'excite que les fibres les plus sensibles (à seuil bas).
- Une augmentation de l'intensité excite successivement des fibres à seuils plus élevés qui s'ajoutent aux précédentes : c'est le phénomène de **recrutement** (sommation spatiale des réponses des différentes fibres).
- Le palier de saturation est atteint lorsque $100\\%$ des fibres du nerf sont recrutées.`,
      baremeAstuce: 'Dans une copie du Bac S2, si un élève écrit que « le nerf obéit à la loi du tout ou rien », l’examinateur retire systématiquement la totalité des points de la question.',
    },
  ],
  synapse: [
    {
      year: 2018,
      session: 'Session Normale (S2)',
      points: 'Deuxième Partie — Raisonnement Scientifique (6 Points)',
      topic: 'Transmission Neuromusculaire, Rôle du Calcium et Pharmacologie du Curare et de l’Éserine',
      enonce: `On étudie le fonctionnement d'une jonction neuromusculaire (plaque motrice) isolée entre un motoneurone rachidien et une fibre musculaire striée squelettique.

### Série d'Expériences Réalisées :
1. **Expérience 1 (Témoin) :** Une stimulation électrique efficace du motoneurone entraîne une libération d'acétylcholine (ACh) dans la fente synaptique, l'enregistrement d'un potentiel de plaque motrice dépolarisant (PPM ou PPSE) de $+25\\text{ mV}$ et la contraction vigoureuse de la fibre musculaire.
2. **Expérience 2 (Milieu sans Calcium) :** La même préparation est baignée dans un liquide physiologique dépourvu d'ions calcium ($[\\text{Ca}^{2+}] = 0$). Une stimulation électrique efficace du motoneurone entraîne l'apparition normale d'un potentiel d'action présynaptique, mais aucune molécule d'acétylcholine n'est détectée dans la fente synaptique, aucun PPM n'est enregistré et la fibre ne se contracte pas.
3. **Expérience 3 (Action du Curare) :** On ajoute du curare dans la fente synaptique en présence de calcium normal. Lors de la stimulation du motoneurone, l'acétylcholine est normalement libérée dans la fente, mais aucun PPM n'est enregistré et le muscle reste inerte. La stimulation électrique directe de la membrane de la fibre musculaire provoque toutefois sa contraction normale.
4. **Expérience 4 (Action de l'Éserine) :** On injecte de l'éserine dans la fente synaptique normale. Après une stimulation brève du motoneurone, la fibre musculaire subit une contraction prolongée et répétée (secousses tétaniques).

### Consignes Officielles :
1. Analysez les expériences 1 et 2 pour préciser le rôle exact des ions $\\text{Ca}^{2+}$ dans la transmission synaptique (1,5 point).
2. À partir de l'expérience 3, déterminez le site et le mode d'action précis du curare à la synapse neuromusculaire (1,5 point).
3. Expliquez le mécanisme par lequel l'éserine induit des contractions tétaniques durables dans l'expérience 4 (1,5 point).
4. Résumez sous forme d'un schéma fonctionnel légendé les étapes de la transmission neuromusculaire normale (1,5 point).`,
      solution: `### 1. Rôle des ions $\\text{Ca}^{2+}$ dans la transmission synaptique (1,5 point)
- Dans l'expérience 1 (témoin avec $\\text{Ca}^{2+}$), le potentiel d'action présynaptique provoque la libération d'acétylcholine, un PPM et la contraction musculaire.
- Dans l'expérience 2 (sans $\\text{Ca}^{2+}$), le potentiel d'action présynaptique se propage normalement jusqu'à la terminaison, mais l'acétylcholine n'est pas libérée.
- **Déduction :** Le potentiel d'action électrique présynaptique est à lui seul incapable de provoquer la libération du neurotransmetteur. L'entrée d'ions $\\text{Ca}^{2+}$ par les canaux voltage-dépendants lors de la dépolarisation présynaptique constitue le **signal intracellulaire obligatoire qui déclenche l'exocytose des vésicules synaptiques**.

---

### 2. Site et mode d'action du Curare (1,5 point)
- Dans l'expérience 3, sous curare, l'acétylcholine est libérée normalement dans la fente, ce qui prouve que l'élément présynaptique fonctionne parfaitement.
- De plus, la stimulation électrique directe du muscle provoque sa contraction, ce qui prouve que la machinerie contractile musculaire (actine, myosine, tubules T) est intacte.
- Le blocage se situe donc exclusivement au niveau de la **membrane postsynaptique** : le curare est un **antagoniste compétitif** des récepteurs nicotiniques chimiodépendants (ROC). Il se fixe sur les récepteurs à la place de l'ACh sans ouvrir le canal sodique, empêchant ainsi la genèse du PPM (PPSE) et paralysant le muscle.

---

### 3. Mécanisme d'action de l'Éserine (1,5 point)
- L'éserine (physostigmine) est un inhibiteur spécifique de l'**acétylcholinestérase**, enzyme fixée dans la fente chargée d'hydrolyser l'acétylcholine en acétate et choline en une fraction de milliseconde.
- En bloquant cette enzyme, l'acétylcholine libérée ne peut plus être détruite : elle persiste dans la fente synaptique et stimule continuellement les récepteurs ROC postsynaptiques.
- Il en résulte un PPM géant prolongé et une salve ininterrompue de potentiels d'action musculaires provoquant des contractions tétaniques continues.

---

### 4. Schéma fonctionnel des étapes de la transmission normale (1,5 point)
$$\\text{PA présynaptique} \\xrightarrow{\\text{Ouverture CVD-}Ca^{2+}} \\text{Entrée } Ca^{2+} \\xrightarrow{\\text{Exocytose}} \\text{ACh dans la fente}$$
$$\\xrightarrow{\\text{Fixation Récepteurs ROC}} \\text{Entrée } Na^+ \\to \\text{PPM (PPSE)} \\to \\text{PA musculaire} \\to \\text{Contraction}$$
$$\\text{Simultanément : } \\text{ACh} \\xrightarrow{\\text{Acétylcholinestérase}} \\text{Acétate} + \\text{Choline (recaptée)}$$`,
      baremeAstuce: 'Dans la question sur le curare, l’Office du Bac exige impérativement de mentionner que la stimulation directe du muscle fonctionne (prouvant l’intégrité du muscle) pour valider l’action purement synaptique postsynaptique.',
    },
    {
      year: 2020,
      session: 'Session Normale (S2)',
      points: 'Deuxième Partie — Raisonnement Scientifique (6 Points)',
      topic: 'Intégration Postsynaptique par le Motoneurone : Sommation Spatiale, Temporelle et Rôle du Cône d’Implantation',
      enonce: `On étudie un motoneurone $M$ de la corne antérieure de la moelle épinière chez le mammifère. Ce motoneurone reçoit trois terminaisons axonales synaptiques :
- La fibre $F_1$ provenant d'un fuseau neuromusculaire (synapse excitatrice $S_1$).
- La fibre $F_2$ provenant d'une voie cortico-spinale (synapse excitatrice $S_2$).
- La fibre $F_3$ provenant d'un interneurone de Renshaw (synapse inhibitrice $S_3$).

Une microélectrode réceptrice $R_1$ enregistre le potentiel de membrane au niveau du corps cellulaire (soma, repos $-70\\text{ mV}$), et une microélectrode $R_2$ enregistre au niveau du cône d'implantation (seuil d'excitabilité $-55\\text{ mV}$).

### Résultats Expérimentaux :
1. **Stimulation isolée de $F_1$ :** $R_1$ enregistre une dépolarisation de $+8\\text{ mV}$. Au niveau de $R_2$, aucun potentiel d'action n'est enregistré.
2. **Stimulation isolée de $F_2$ :** $R_1$ enregistre une dépolarisation de $+10\\text{ mV}$. Au niveau de $R_2$, aucun potentiel d'action n'est enregistré.
3. **Stimulation isolée de $F_3$ :** $R_1$ enregistre une hyperpolarisation de $-8\\text{ mV}$.
4. **Stimulations simultanées de $F_1$ et $F_2$ :** $R_1$ enregistre une dépolarisation de $+18\\text{ mV}$. Au niveau de $R_2$, un train de potentiels d'action propagés de $100\\text{ mV}$ apparaît.
5. **Stimulations simultanées de $F_1$, $F_2$ et $F_3$ :** $R_1$ enregistre une dépolarisation de $+10\\text{ mV}$. Au niveau de $R_2$, aucun potentiel d'action n'apparaît.
6. **Deux stimulations successives très rapprochées de $F_1$ (intervalle $1\\text{ ms}$) :** $R_1$ enregistre une dépolarisation globale de $+16\\text{ mV}$, déclenchant un potentiel d'action en $R_2$.

### Consignes Officielles :
1. Qualifiez la nature des réponses obtenues en $R_1$ lors des stimulations isolées de $F_1$, $F_2$ et $F_3$ (1,5 point).
2. Interprétez les résultats des expériences 4 et 5 en nommant le phénomène physiologique mis en jeu (1,5 point).
3. Analysez l'expérience 6 et distinguez-la de l'expérience 4 (1,5 point).
4. Expliquez le rôle primordial du cône d'implantation dans le déclenchement du potentiel d'action postsynaptique (1,5 point).`,
      solution: `### 1. Nature des réponses élémentaires en $R_1$ (1,5 point)
- Les stimulations de $F_1$ et $F_2$ provoquent des dépolarisations locales ($+8\\text{ mV}$ et $+10\\text{ mV}$) : ce sont des **Potentiels Post-Synaptiques Excitateurs (PPSE)** résultant de l'entrée d'ions $\\text{Na}^+$ par des récepteurs-canaux chimiodépendants.
- La stimulation de $F_3$ provoque une hyperpolarisation ($-8\\text{ mV}$) : c'est un **Potentiel Post-Synaptique Inhibiteur (PPSI)** résultant de l'ouverture de canaux chimiodépendants au $\\text{Cl}^-$ (entrée de $\\text{Cl}^-$) ou au $\\text{K}^+$ (sortie de $\\text{K}^+$), qui éloigne le potentiel du seuil critique.

---

### 2. Interprétation des expériences 4 et 5 : Sommation Spatiale (1,5 point)
- Dans l'expérience 4, les deux PPSE s'additionnent algébriquement : $+8\\text{ mV} + 10\\text{ mV} = +18\\text{ mV}$. Le potentiel au cône atteint $-70\\text{ mV} + 18\\text{ mV} = -52\\text{ mV}$, ce qui dépasse le seuil critique ($-55\\text{ mV}$). Des potentiels d'action sont donc émis en $R_2$. C'est la **sommation spatiale excitatrice**.
- Dans l'expérience 5, l'activation conjointe du neurone inhibiteur $F_3$ soustrait son amplitude : $+8\\text{ mV} + 10\\text{ mV} - 8\\text{ mV} = +10\\text{ mV}$. Le potentiel résultant n'est que de $-60\\text{ mV}$, inférieur au seuil de $-55\\text{ mV}$ : la réponse reste infraliminaire et aucun PA n'est émis. Le neurone effectue donc une **sommation algébrique spatiale**.

---

### 3. Distinction entre Expérience 6 (Temporelle) et Expérience 4 (Spatiale) (1,5 point)
- Dans l'expérience 4, la sommation est **spatiale** car elle résulte de la mise en jeu simultanée de synapses distinctes situées à des endroits différents du soma ($F_1$ et $F_2$).
- Dans l'expérience 6, la sommation est **temporelle** car elle provient d'une seule et même synapse ($F_1$) recevant deux potentiels d'action très rapprochés dans le temps. Le second PPSE s'ajoute au premier avant que celui-ci ne soit dissipé ($+8\\text{ mV} + 8\\text{ mV} = +16\\text{ mV}$), atteignant $-54\\text{ mV} \\ge -55\\text{ mV}$ pour déclencher un PA.

---

### 4. Rôle du Cône d'Implantation (1,5 point)
Le cône d'implantation (zone gâchette) est le carrefour intégrateur du neurone :
- Il possède une concentration en **canaux $\\text{Na}^+$ voltage-dépendants** jusqu'à 100 fois supérieure à celle du corps cellulaire.
- C'est pourquoi son seuil critique d'excitabilité est le plus bas ($-55\\text{ mV}$).
- Si et seulement si la somme algébrique des PPSE et PPSI atteint ce seuil au cône, les canaux voltage-dépendants s'ouvrent brutalement et engendrent un potentiel d'action propageable selon la loi du tout ou rien.`,
      baremeAstuce: 'Pensez à toujours poser la somme algébrique mathématique chiffrée (-70 + PPSE - PPSI) pour obtenir le maximum de points à la question d’intégration au Bac S2.',
    },
  ],
  reflexes_medullaires: [
    {
      year: 2019,
      session: 'Session Normale (S2)',
      points: 'Deuxième Partie — Raisonnement Scientifique (6 Points)',
      topic: 'Expériences de Magendie sur les Racines Rachidiennes & Arc Réflexe Myotatique',
      enonce: `Pour comprendre l'organisation anatomique et fonctionnelle des voies nerveuses motrices et sensitives, on réalise chez des mammifères de laboratoire une série de sections et de stimulations électriques au niveau de la moelle épinière lombo-sacrée innervant le membre postérieur.

### Série d'Expériences Réalisées :
1. **Expérience 1 :** On sectionne le nerf sciatique droit d'un cobaye. On observe immédiatement une perte de toute sensibilité au niveau de la patte droite, accompagnée d'une paralysie totale de cette même patte.
2. **Expérience 2 :** Chez un second cobaye, on réalise la section bilatérale des racines dorsales (avec ganglion spinal) innervant le membre postérieur droit. Après réveil, l'animal marche en utilisant sa patte droite, mais ne réagit à aucune piqûre ou brûlure appliquée sur cette patte. La percussion du tendon rotulien ne déclenche aucun réflexe.
3. **Expérience 3 :** Sur la racine dorsale coupée de l'expérience 2, on applique une stimulation électrique efficace :
   - D'abord sur le **bout périphérique** : aucun mouvement, aucune réaction de l'animal.
   - Ensuite sur le **bout central** : l'animal gémit de douleur et fléchit vivement sa patte controlatérale gauche intacte.
4. **Expérience 4 :** Chez un troisième cobaye, on sectionne les racines ventrales innervant la patte droite. L'animal ressent la douleur des piqûres sur sa patte droite, mais cette patte pend inerte, incapable d'exécuter le moindre mouvement. La stimulation du bout périphérique de la racine ventrale entraîne une contraction musculaire immédiate.

### Consignes Officielles :
1. Analysez les résultats des expériences 1, 2 et 4 pour déduire le rôle précis du nerf sciatique, de la racine dorsale et de la racine ventrale (2 points).
2. Interprétez les résultats de stimulation des bouts central et périphérique de la racine dorsale dans l'expérience 3 en précisant le sens de conduction de l'influx nerveux (1,5 point).
3. Pourquoi la section de la racine dorsale dans l'expérience 2 abolit-elle le réflexe rotulien alors que la motricité volontaire persiste ? (1,5 point).
4. Réalisez un schéma légendé de l'arc réflexe myotatique rotulien illustrant la disposition du neurone sensitif et du motoneurone (1 point).`,
      solution: `### 1. Rôle du nerf sciatique et des racines dorsale et ventrale (2 points)
- **Expérience 1 (Nerf sciatique coupé) :** L'apparition simultanée d'une anesthésie et d'une paralysie prouve que le nerf sciatique contient à la fois des fibres sensitives et motrices : c'est un **nerf mixte**.
- **Expérience 2 (Racine dorsale coupée) :** L'insensibilité sans paralysie prouve que la racine dorsale conduit exclusivement les informations sensitives vers les centres : c'est la **voie afférente sensitive**.
- **Expérience 4 (Racine ventrale coupée) :** La paralysie sans perte de sensibilité prouve que la racine ventrale conduit exclusivement les commandes motrices vers les effecteurs : c'est la **voie efférente motrice**.

---

### 2. Interprétation de l'expérience 3 et sens de conduction (1,5 point)
- La stimulation du **bout central** (connecté à la moelle épinière) déclenche une douleur consciente et un réflexe de fuite : l'influx a pu remonter vers la moelle puis vers l'encéphale.
- La stimulation du **bout périphérique** est inefficace car il n'y a pas d'organe récepteur à stimuler dans ce sens et les synapses médullaires imposent une conduction centripète stricte.
- **Conclusion :** La racine dorsale conduit l'influx nerveux de manière **unidirectionnelle centripète** (de la périphérie vers le centre nerveux intégrateur).

---

### 3. Abolition du réflexe rotulien vs Maintien de la motricité volontaire (1,5 point)
- Le **réflexe rotulien est un acte réflexe inné** dont le déclenchement dépend obligatoirement du message sensitif proprioceptif né dans les fuseaux neuromusculaires du quadriceps. La coupure de la racine dorsale interrompt ce premier maillon afférent : le réflexe est donc aboli.
- En revanche, la **motricité volontaire** prend naissance dans le **cortex cérébral moteur**, descend par le faisceau pyramidal à travers la substance blanche médullaire, et rejoint le motoneurone $\\alpha$ de la corne antérieure. Comme la racine ventrale est intacte, les ordres volontaires atteignent normalement le muscle.

---

### 4. Schéma annoté de l'arc réflexe (1 point)
Le schéma doit comporter impérativement :
$$\\text{Fuseau Neuromusculaire (FNM)} \\to \\text{Fibre Ia en T (Ganglion spinal, Racine dorsale)}$$
$$\\to \\text{Synapse excitatrice (Corne ventrale de la moelle)} \\to \\text{Motoneurone } \\alpha \\text{ (Racine ventrale)}$$
$$\\to \\text{Plaque motrice du muscle quadriceps (Contraction)}$$`,
      baremeAstuce: 'Dans l’explication de la motricité volontaire conservée, mentionnez impérativement que la commande volontaire descend de l’encéphale vers la racine ventrale sans passer par la racine dorsale.',
    },
    {
      year: 2017,
      session: 'Session Normale (S2)',
      points: 'Première Partie — Restitution Organisée des Connaissances (4 Points)',
      topic: 'Mécanisme d’Établissement, Rôle du Cortex et Extinction du Réflexe Conditionnel Pavlovien',
      enonce: `Chez les animaux supérieurs et chez l'Homme, le comportement ne se limite pas aux réflexes innés : il s'enrichit continuellement de réflexes acquis au cours de l'existence.

À partir du protocole classique d'Ivan Pavlov (salivation du chien) :
1. Définissez les notions de stimulus inconditionnel (SI), stimulus neutre (SN) et stimulus conditionnel (SC) (1 point).
2. Décrivez le protocole expérimental et expliquez le mécanisme neurophysiologique qui permet l'établissement du réflexe conditionnel (1,5 point).
3. Expliquez le phénomène d'inhibition d'extinction lorsque le stimulus conditionnel est répété sans renforcement (1 point).
4. Démontrez expérimentalement le rôle indispensable du cortex cérébral dans l'activité conditionnelle (0,5 point).`,
      solution: `### 1. Définitions des termes clés (1 point)
- **Stimulus Inconditionnel (SI) :** Stimulus naturel, absolu, capable de déclencher d'emblée une réponse réflexe innée sans apprentissage préalable (ex. la viande déposée dans la gueule).
- **Stimulus Neutre (SN) :** Stimulus sans lien physiologique initial avec la réponse étudiée, ne provoquant aucune réaction spécifique de l'organe cible (ex. le son d'une cloche ou un éclair lumineux).
- **Stimulus Conditionnel (SC) :** Stimulus neutre qui, après association temporelle répétée avec le stimulus inconditionnel, acquiert la capacité de déclencher à lui seul la réponse salivaire.

---

### 2. Protocole expérimental et mécanisme neurophysiologique (1,5 point)
- **Protocole :** On fait retentir le son de cloche (SN), puis quelques secondes après on délivre la viande (SI). Cette association $[\\text{SN} \\to \\text{SI}]$ est répétée de multiples fois consécutives.
- **Mécanisme :** Au niveau cérébral, l'aire auditive corticale (stimulée par le son) et l'aire gustative corticale (stimulée par la viande) sont activées de façon synchronisée. Par plasticité synaptique, il s'établit une **liaison nerveuse fonctionnelle temporaire** entre ces deux aires corticales. Dès lors, l'excitation de l'aire auditive suffit à activer le centre salivaire bulbaire par voie descendante : le chien salive au seul son de la cloche !

---

### 3. Phénomène d'inhibition d'extinction (1 point)
- Si le stimulus conditionnel (cloche) est émis de façon répétée sans être jamais suivi de la viande (absence de renforcement), l'intensité de la sécrétion salivaire diminue progressivement pour devenir nulle.
- C'est l'**inhibition d'extinction** : ce n'est pas une disparition anatomique des neurones, mais une inhibition corticale active temporaire. Preuve : après quelques heures de repos ou après un seul nouveau renforcement, le réflexe réapparaît instantanément.

---

### 4. Rôle indispensable du cortex cérébral (0,5 point)
- Si l'on pratique l'ablation bilatérale des hémisphères cérébraux (animal décortiqué), le chien conserve intact le réflexe inné de salivation à la vue de la viande (centre bulbaire sous-cortical).
- En revanche, il devient **totalement incapable d'acquérir le moindre réflexe conditionnel**, et tous les réflexes conditionnels préalablement appris sont définitivement perdus. Cela démontre que le cortex cérébral est le support exclusif de la liaison temporaire.`,
      baremeAstuce: 'Insistez sur le terme « liaison nerveuse temporaire » et mentionnez que l’animal décortiqué conserve son réflexe inné : cette nuance est notée sur 0,5 pt par les correcteurs de l’Office du Bac.',
    },
  ],

  // =========================================================================
  // B2.1 ACTIVITÉ CARDIAQUE & AUTOMATISME CARDIAQUE (SVT S2 - B2)
  // =========================================================================
  activite_cardiaque: [
    {
      year: 2022,
      session: 'Session Normale (S2)',
      points: 'Première Partie — Restitution Organisée des Connaissances (4 Points)',
      topic: 'Automatisme Cardiaque, Tissu Nodal, Ligatures de Stannius et Inexcitabilité Périodique (Loi de Marey)',
      enonce: `Le myocarde des vertébrés possède un ensemble de propriétés électrophysiologiques originales qui assurent sa fonction vitale de pompe hémodynamique permanente.

1. **Origine de l'automatisme cardiaque :**
   a) Définissez la notion d'automatisme cardiaque intrinsèque (0,5 point).
   b) Citez, dans l'ordre chronologique de propagation de l'onde de dépolarisation, les quatre formations anatomiques qui constituent le tissu nodal (1 point).

2. **Expérimentation historique de Stannius :**
   Sur un cœur de grenouille isolé et perfusé :
   - On pose une première ligature dans le sillon sinuso-auriculaire : décrivez les résultats observés et déduisez-en le rôle physiologique du sinus veineux (1 point).
   - On pose une seconde ligature dans le sillon auriculo-ventriculaire : quel résultat obtient-on au niveau du ventricule ? Que met en évidence cette expérience (0,5 point) ?

3. **Propriétés physiologiques du myocarde :**
   a) Pourquoi le cœur est-il physiologiquement incapable d'entrer en tétanos ? Justifiez votre réponse en précisant la durée de la période réfractaire absolue (0,5 point).
   b) Que se passe-t-il si l'on applique une excitation électrique efficace au cours de la diastole ventriculaire ? Nommez les deux manifestations graphiques consécutives (0,5 point).`,
      solution: `### 1. Origine de l'automatisme cardiaque (1,5 point)
a) **Définition de l'automatisme intrinsèque (0,5 pt) :**
L'automatisme cardiaque est la propriété que possède le cœur de se contracter spontanément et de façon rythmique sans aucune intervention ou commande du système nerveux central, même lorsqu'il est complètement isolé de l'organisme et perfusé dans un liquide physiologique approprié (liquide de Ringer oxygéné à $37^\\circ\\text{C}$).

b) **Les 4 formations du tissu nodal dans l'ordre chronologique (1 pt, soit 0,25 pt par structure) :**
1. **Nœud sinusal (de Keith et Flack) :** Situé dans l'oreillette droite, c'est le pace-maker physiologique (fréquence spontanée maximale : $70\\text{ à }80\\text{ batt/min}$).
2. **Nœud auriculo-ventriculaire (d'Aschoff-Tawara) :** Situé dans le septum interauriculaire, il ralentit la conduction ($0,1\\text{ s}$) pour permettre la vidange complète des oreillettes ($40\\text{ à }50\\text{ batt/min}$).
3. **Faisceau de His :** Faisceau traversant le septum interventriculaire, se divisant en deux branches droite et gauche ($30\\text{ à }40\\text{ batt/min}$).
4. **Réseau sous-endocardique de Purkinje :** Ramifications terminales diffuses dans la paroi des deux ventricules à conduction très rapide ($2\\text{ à }4\\text{ m/s}$), assurant la contraction ventriculaire synchrone de la pointe vers la base.

---

### 2. Expériences historiques de Stannius (1,5 point)
- **1ère Ligature sinuso-auriculaire (1 pt) :**
  - *Observation (0,5 pt) :* Le sinus veineux continue de battre à son rythme rapide propre ($60\\text{ bpm}$). Les oreillettes et le ventricule s'arrêtent net en diastole, puis reprennent après quelques minutes des battements synchrones mais nettement ralentis ($30\\text{ à }40\\text{ bpm}$).
  - *Déduction (0,5 pt) :* Le sinus veineux est le **centre automatique dominant (pace-maker maître)** dont la fréquence impose le rythme à l'ensemble du cœur. Il existe un centre secondaire subordonné à fréquence inférieure (le nœud AV).
- **2ème Ligature auriculo-ventriculaire (0,5 pt) :**
  - *Observation :* Les oreillettes continuent à battre à $30-40\\text{ bpm}$. Le ventricule s'arrête longuement puis reprend des battements autonomes très lents ($15\\text{ à }20\\text{ bpm}$).
  - *Conclusion :* Cette expérience prouve que le ventricule possède un troisième centre d'automatisme idioventriculaire (réseau de Purkinje). L'ensemble démontre le **gradient d'automatisme décroissant** du tissu nodal : Sinus veineux ($60\\text{ bpm}$) $>$ Nœud AV ($30-40\\text{ bpm}$) $>$ Ventricule/Purkinje ($15-20\\text{ bpm}$).

---

### 3. Propriétés physiologiques du myocarde (1 point)
a) **Impossibilité de tétanisation (0,5 pt) :**
Le cœur ne peut jamais être tétanisé (contraction continue fusionnée) car le potentiel d'action des cellules myocardiques présente une phase de plateau calcique très longue, conférant une **période réfractaire absolue (PRA) d'environ $0,30\\text{ s}$**, qui recouvre pratiquement toute la durée de la systole ventriculaire. Pendant cette phase, le myocarde est totalement inexcitable, rendant toute sommation temporelle impossible. Cette propriété vitale garantit le relâchement diastolique indispensable au remplissage des cavités.

b) **Excitation en diastole (0,5 pt) :**
En diastole, le myocarde est en période réfractaire relative et redevient excitable :
1. Une stimulation efficace déclenche une contraction prématurée anticipée appelée **extrasystole ventriculaire** (0,25 pt).
2. Cette extrasystole est obligatoirement suivie d'un temps de repos prolongé appelé **repos compensateur** (0,25 pt), car l'onde physiologique sinusale suivante arrive pendant la période réfractaire de l'extrasystole et reste inefficace.`,
      baremeAstuce: 'Au Bac S2, ne confondez jamais « période réfractaire absolue » (systole = inexcitable = intétanisable) et « période réfractaire relative » (diastole = extrasystole + repos compensateur). Cette distinction rapporte 1 point plein.',
    },
    {
      year: 2019,
      session: 'Session Normale (S2)',
      points: 'Deuxième Partie — Raisonnement Scientifique & Analyse de Données (4 Points)',
      topic: 'Révolution Cardiaque, Électrocardiogramme (ECG) et Hémodynamique Quantitative (Débit & Pression Artérielle)',
      enonce: `Chez un jeune adulte athlète en bonne santé, un enregistrement électrocardiographique (dérivation DII sur papier millimétré déroulé à la vitesse de $25\\text{ mm/s}$) et des mesures hémodynamiques par échographie Doppler ont été réalisés au repos puis au cours d'un test d'effort maximal sur bicyclette ergométrique.

Les données recueillies sont les suivantes :
- **Au repos :**
  - La distance entre deux sommets $R$ consécutifs de l'ECG est de $20\\text{ mm}$.
  - Volume télédiastolique ventriculaire : $VTD = 130\\text{ mL}$.
  - Volume télésystolique résiduel : $VTS = 50\\text{ mL}$.
  - Résistances périphériques totales : $RPT = 18\\text{ mmHg}\\cdot\\text{min}\\cdot\\text{L}^{-1}$.
- **À l'effort maximal :**
  - La distance entre deux ondes $R$ consécutives n'est plus que de $7{,}5\\text{ mm}$.
  - Le volume d'éjection systolique augmente de $50\\%$ par rapport au repos sous l'effet de la stimulation sympathique.
  - Les artérioles musculaires se dilatent, abaissant les résistances périphériques à $RPT' = 6\\text{ mmHg}\\cdot\\text{min}\\cdot\\text{L}^{-1}$.

1. **Interprétation de l'ECG au repos :**
   a) Rappelez la signification physiologique des trois accidents graphiques majeurs de l'ECG : onde P, complexe QRS et onde T (0,75 point).
   b) Calculez la durée d'une révolution cardiaque au repos en secondes, puis déterminez la fréquence cardiaque $FC$ en battements par minute (0,75 point).

2. **Calculs hémodynamiques au repos :**
   a) Calculez le volume d'éjection systolique $VES$ au repos en mL puis en Litres (0,5 point).
   b) Déterminez le débit cardiaque $DC$ du sujet au repos en $\\text{L/min}$ (0,5 point).
   c) Calculez la pression artérielle moyenne $PA$ au repos en $\\text{mmHg}$ (0,5 point).

3. **Adaptation hémodynamique à l'effort :**
   a) Calculez la nouvelle fréquence cardiaque $FC'$ et le nouveau débit cardiaque $DC'$ à l'effort maximal (0,5 point).
   b) En déduire la nouvelle valeur de la pression artérielle moyenne $PA'$. Expliquez comment l'organisme parvient à multiplier considérablement son débit sanguin tout en maintenant une élévation modérée de sa pression artérielle (0,5 point).`,
      solution: `### 1. Interprétation de l'ECG au repos (1,5 point)
a) **Signification des ondes (0,75 pt, soit 0,25 pt par onde) :**
- **Onde P :** Dépolarisation des oreillettes (générée par l'influx du nœud sinusal), précédant immédiatement la systole auriculaire.
- **Complexe QRS :** Dépolarisation rapide et synchrone des ventricules (via le faisceau de His et le réseau de Purkinje), marquant le début de la systole ventriculaire.
- **Onde T :** Repolarisation des ventricules, correspondant à la phase de relaxation préalable à la diastole générale.

b) **Calcul de la durée de révolution et de la fréquence cardiaque (0,75 pt) :**
- Vitesse de défilement : $v = 25\\text{ mm/s} \\implies 1\\text{ mm} = \\frac{1}{25}\\text{ s} = 0{,}04\\text{ s}$.
- La distance $R-R = 20\\text{ mm}$.
- Durée d'un cycle cardiaque (révolution) :
  $$\\Delta t = 20 \\times 0{,}04\\text{ s} = 0{,}80\\text{ s}$$
- Fréquence cardiaque $FC$ :
  $$FC = \\frac{60}{\\Delta t} = \\frac{60}{0{,}80} = 75\\text{ battements/minute}$$

---

### 2. Calculs hémodynamiques au repos (1,5 point)
a) **Volume d'éjection systolique (0,5 pt) :**
$$VES = VTD - VTS = 130\\text{ mL} - 50\\text{ mL} = 80\\text{ mL} = 0{,}080\\text{ L}$$

b) **Débit cardiaque au repos (0,5 pt) :**
$$DC = FC \\times VES = 75\\text{ batt/min} \\times 0{,}080\\text{ L} = 6{,}0\\text{ L/min}$$

c) **Pression artérielle moyenne au repos (0,5 pt) :**
$$PA = DC \\times RPT = 6{,}0\\text{ L/min} \\times 18\\text{ mmHg}\\cdot\\text{min}\\cdot\\text{L}^{-1} = 108\\text{ mmHg}$$

---

### 3. Adaptation hémodynamique à l'effort maximal (1 point)
a) **Fréquence cardiaque et Débit cardiaque à l'effort (0,5 pt) :**
- Nouvelle durée de cycle à l'effort : $\\Delta t' = 7{,}5 \\times 0{,}04\\text{ s} = 0{,}30\\text{ s}$.
- Nouvelle fréquence : $FC' = \\frac{60}{0{,}30} = 200\\text{ battements/minute}$.
- Nouveau volume d'éjection systolique ($+50\\%$) :
  $$VES' = 80\\text{ mL} \\times 1{,}50 = 120\\text{ mL} = 0{,}120\\text{ L}$$
- Nouveau débit cardiaque :
  $$DC' = FC' \\times VES' = 200\\text{ batt/min} \\times 0{,}120\\text{ L} = 24{,}0\\text{ L/min}$$
  *(Le débit cardiaque a été multiplié par 4 !)*

b) **Nouvelle pression artérielle et explication physiologique (0,5 pt) :**
- Nouvelle pression artérielle :
  $$PA' = DC' \\times RPT' = 24{,}0\\text{ L/min} \\times 6\\text{ mmHg}\\cdot\\text{min}\\cdot\\text{L}^{-1} = 144\\text{ mmHg}$$
- **Explication physiologique :**
  Bien que le débit cardiaque soit multiplié par $4$ (passage de $6$ à $24\\text{ L/min}$), la pression artérielle moyenne n'augmente que très modérément (de $108$ à $144\\text{ mmHg}$). Cette prouesse physiologique résulte de la **vasodilatation massive des artérioles musculaires** actives (sous l'effet de métabolites locaux et de récepteurs $\\beta_2$), qui fait chuter les résistances périphériques totales ($RPT$ passe de $18$ à $6$). Cela protège le système cardiovasculaire contre des hypertensions destructrices tout en garantissant une oxygénation maximale des muscles squelettiques.`,
      baremeAstuce: 'Dans les calculs de débit cardiaque, convertissez TOUJOURS le VES en Litres ($1\\text{ mL} = 10^{-3}\\text{ L}$) avant de multiplier par FC, pour obtenir un débit directement en L/min sans erreur d’unité.',
    },
  ],
  // B2.2. INNERVATION ET RÉGULATION NERVEUSE ET HORMONALE DU CŒUR (SVT S2 - B2 LEÇON 2)
  regulation_nerveuse: [
    {
      year: 2021,
      session: 'Session Normale (S2)',
      points: 'Exercice 2 — Neurophysiologie Cardiovasculaire (4 Points)',
      topic: 'Expérience d’Otto Loewi (1921), Transmission chimique de l’influx vagal et Spécificité des récepteurs (Atropine, Curare)',
      enonce: `Afin d'élucider le mécanisme par lequel les nerfs vagues (pneumogastriques X) modulent l'activité cardiaque, on réalise une série d'expériences sur des cœurs isolés de grenouilles perfusés avec du liquide de Ringer oxygéné.

**Document 1 : L'expérience historique d'Otto Loewi**
Deux cœurs de grenouille $C_1$ et $C_2$ sont montés en série. Le cœur $C_1$ conserve son innervation vagale intacte. Le cœur $C_2$ est totalement dénervé. Le liquide physiologique baignant $C_1$ est acheminé par une canule vers $C_2$.
- À l'instant $t_1$, on stimule électriquement le nerf pneumogastrique de $C_1$ pendant 10 secondes : on observe un ralentissement immédiat de $C_1$, suivi de son arrêt en diastole.
- Quelques secondes plus tard ($t_2$), alors que le cœur $C_2$ n'a reçu aucune stimulation électrique, on observe également un ralentissement de $C_2$ puis son arrêt en diastole.
- Après lavage des deux préparations par du liquide de Ringer neuf, les deux cœurs reprennent leurs battements spontanés.

**Document 2 : Tests pharmacologiques**
1. Sur une préparation de cœur isolé normal, l'adjonction dans le liquide de Ringer d'une goutte d'atropine à $10^{-5}\\text{ mol/L}$ entraîne une légère tachycardie. La stimulation électrique ultérieure du nerf vague reste alors totalement sans effet.
2. Si on perfuse le cœur avec du curare à concentration efficace, les battements cardiaques et l'effet freinateur de la stimulation du nerf vague ne subissent aucune modification, alors que le muscle squelettique gastrocnémien de la même grenouille est totalement paralysé.

**Questions :**
1. Analysez les résultats du Document 1. Quelle conclusion fondamentale relative à la transmission du message vagal dégagez-vous de l'expérience d'Otto Loewi ? *(1,5 point)*
2. Précisez la nature de la substance chimique libérée lors de la stimulation vagale et le type de récepteurs membranaires sur lesquels elle se fixe au niveau du tissu nodal. *(1 point)*
3. À partir du Document 2 :
   a) Expliquez le mécanisme d'action de l'atropine sur le rythme cardiaque. *(0,75 point)*
   b) Justifiez pourquoi le curare paralyse le muscle squelettique sans affecter l'activité cardiaque. *(0,75 point)*`,
      solution: `### 1. Analyse de l'expérience d'Otto Loewi et Conclusion fondamentale (1,5 pt)
- **Analyse des observations :**
  - La stimulation électrique du nerf vague du cœur donneur $C_1$ provoque une bradycardie immédiate puis un arrêt du cœur en diastole (relâchement musculaire).
  - Après un court temps de latence correspondant au temps de transit du liquide de perfusion, le cœur receveur $C_2$ (pourtant dénervé et sans contact électrique avec $C_1$) ralentit et s'arrête également en diastole.
  - Le lavage au Ringer neuf restaure l'automatisme des deux cœurs, montrant la réversibilité du phénomène.
- **Déduction & Conclusion :**
  Le cœur $C_2$ n'ayant reçu aucune décharge électrique, son arrêt ne peut s'expliquer que par la présence d'une **substance chimique soluble** libérée par les terminaisons du nerf pneumogastrique de $C_1$ dans le liquide de Ringer. Cette substance a été transportée par le liquide vers $C_2$ où elle a exercé le même effet freinateur.
  **Conclusion fondamentale :** La commande nerveuse exercée par le nerf vague n'est pas électrique directe, elle s'effectue par l'intermédiaire d'un **médiateur chimique neuro-humoral (neurotransmetteur)**.

---

### 2. Nature du neurotransmetteur et récepteurs nodaux (1 pt)
- **Nature de la substance :** C'est **l'Acétylcholine (ACh)** (nommée initialement *Vagusstoff* par Loewi).
- **Type de récepteurs :** Récepteurs **cholinergiques muscariniques (de type $M_2$)**, situés sur les membranes des cellules cardionectrices du nœud sinusal et du nœud auriculo-ventriculaire.

---

### 3. Exploitation des tests pharmacologiques (1,5 pt)
a) **Mécanisme d'action de l'atropine (0,75 pt) :**
- L'atropine est un **antagoniste compétitif** spécifique des récepteurs muscariniques : elle se fixe sur les récepteurs à l'acétylcholine sans déclencher de transduction, empêchant ainsi l'acétylcholine endogène de s'y lier.
- En bloquant les récepteurs, elle lève le frein vagal permanent au repos $\\implies$ tachycardie.
- La stimulation du nerf vague devient inopérante car l'ACh libérée ne peut plus interagir avec ses récepteurs masqués par l'atropine.

b) **Spécificité d'action Atropine vs Curare (0,75 pt) :**
- Les synapses neuromusculaires des muscles squelettiques possèdent des **récepteurs nicotiniques**, bloqués sélectivement par le curare $\\implies$ paralysie du gastrocnémien.
- Le myocarde possède quant à lui des **récepteurs muscariniques**, sensibles à l'atropine mais insensibles au curare. Cela démontre **l'hétérogénéité et la stéréospécificité des récepteurs membranaires** à l'acétylcholine dans l'organisme.`,
      baremeAstuce: 'Au Bac S2, ne confondez jamais récepteurs nicotiniques (curare / muscle strié) et récepteurs muscariniques (atropine / cœur). C’est la distinction clé qui rapporte l’intégralité des points de pharmacodynamie.',
    },
    {
      year: 2017,
      session: 'Session Normale (S2)',
      points: 'Exercice 2 — Physiologie Cardiovasculaire (4 Points)',
      topic: 'Innervation antagoniste, Sections nerveuses bilatérales, Notion de Tonus vagal et Propriétés myocardiques',
      enonce: `Chez un chien anesthésié, on enregistre la pression artérielle et le cardiogramme ventriculaire. La fréquence cardiaque de repos est de $72\\text{ battements par minute}$.

On pratique successivement les interventions expérimentales suivantes :
1. **Expérience 1 :** On sectionne les deux nerfs vagues (pneumogastriques X) au niveau du cou (vagotomie bilatérale). La fréquence cardiaque s'élève instantanément à $115\\text{ batt/min}$.
2. **Expérience 2 :** Sur l'animal vagotomisé, on stimule le bout périphérique d'un nerf vague sectionné : la fréquence cardiaque s'effondre à $35\\text{ batt/min}$. La stimulation du bout central du même nerf ne produit aucun effet sur le cœur.
3. **Expérience 3 :** On sectionne ensuite les nerfs cardiaques sympathiques : la fréquence cardiaque s'abaisse légèrement pour se stabiliser à $100\\text{ batt/min}$.
4. **Expérience 4 :** On stimule le bout périphérique des nerfs sympathiques : la fréquence cardiaque passe à $150\\text{ batt/min}$, avec un accroissement net de l'amplitude de chaque systole ventriculaire.

**Consignes :**
1. Interprétez les résultats de l'Expérience 1. Définissez la notion physiologique mise en évidence. *(1 point)*
2. Que déduisez-vous de la stimulation différentielle bout périphérique vs bout central dans l'Expérience 2 ? *(1 point)*
3. Comparez les rôles physiologiques respectifs du système parasympathique et du système orthosympathique sur le myocarde en complétant un tableau précisant : centres d'origine, neurotransmetteur terminal, récepteurs, et les 4 effets myocardiques cardinaux (chronotrope, inotrope, dromotrope, bathmotrope). *(2 points)*`,
      solution: `### 1. Interprétation de l'Expérience 1 & Tonus vagal (1 pt)
- **Constat :** La section des deux nerfs vagues entraîne une augmentation immédiate de la fréquence cardiaque (tachycardie de $72$ à $115\\text{ batt/min}$).
- **Déduction :** Comme la suppression de la liaison nerveuse accélère le rythme, cela prouve que les nerfs vagues exerçaient en permanence une action freinatrice sur le cœur au repos.
- **Définition du Tonus Vagal :** C'est l'activité inhibitrice modératrice continue exercée par le centre bulbaire parasympathique sur le nœud sinusal, maintenant la fréquence cardiaque physiologique à un niveau inférieur à sa fréquence intrinsèque spontanée ($115\\text{ bpm}$).

---

### 2. Voie motrice centrifuge du nerf vague (1 pt)
- La stimulation du **bout périphérique** (relié au cœur) reproduit la bradycardie, montrant que l'influx nerveux circule des centres bulbaires vers le myocarde de manière **centrifuge (voie motrice efférente)**.
- L'absence d'effet lors de la stimulation du **bout central** (relié à l'encéphale) confirme que les fibres motrices cardiomodératrices n'ont pas d'action directe descendante à partir de cette extrémité sectionnée.

---

### 3. Tableau comparatif complet de la double innervation cardiaque (2 pts)

| Paramètre physiologique | Système Parasympathique (Nerf Vague X) | Système Orthosympathique (Nerfs Sympathiques) |
| :--- | :--- | :--- |
| **Centre nerveux d'origine** | Bulbe rachidien (noyau dorsal du X) | Moelle épinière thoracique ($D_1$ à $D_5$) |
| **Neurotransmetteur terminal** | Acétylcholine (ACh) | Noradrénaline (NA) |
| **Type de récepteurs** | Muscariniques ($M_2$) | $\\beta_1$-adrénergiques |
| **Effet Chronotrope** | **Négatif** (ralentit la FC = Bradycardie) | **Positif** (accélère la FC = Tachycardie) |
| **Effet Inotrope** | **Négatif modéré** (surtout atriale) | **Positif puissant** (augmente la force systolique) |
| **Effet Dromotrope** | **Négatif** (ralentit la conduction nodale) | **Positif** (accélère la conduction nodale) |
| **Effet Bathmotrope** | **Négatif** (abaisse l'excitabilité) | **Positif** (augmente l'excitabilité) |`,
      baremeAstuce: 'Dans l’épreuve de SVT du Bac S2, associez TOUJOURS chaque nerf à son effet précis : Vague = Chronotrope négatif (Acétylcholine) ; Sympathique = Chronotrope et Inotrope positifs (Noradrénaline).',
    },
  ],
};

BAC_ANNALES_BY_CHAPTER.cinematique = BAC_ANNALES_BY_CHAPTER.cinematique_point;
BAC_ANNALES_BY_CHAPTER.newton = BAC_ANNALES_BY_CHAPTER.lois_newton;
BAC_ANNALES_BY_CHAPTER.projectile = BAC_ANNALES_BY_CHAPTER.projectile_champ_pesanteur;
BAC_ANNALES_BY_CHAPTER.pesanteur = BAC_ANNALES_BY_CHAPTER.projectile_champ_pesanteur;
BAC_ANNALES_BY_CHAPTER.champ_pesanteur = BAC_ANNALES_BY_CHAPTER.projectile_champ_pesanteur;
BAC_ANNALES_BY_CHAPTER.p3 = BAC_ANNALES_BY_CHAPTER.projectile_champ_pesanteur;
BAC_ANNALES_BY_CHAPTER.particule = BAC_ANNALES_BY_CHAPTER.particule_champ_e_b;
BAC_ANNALES_BY_CHAPTER.champ_e_b = BAC_ANNALES_BY_CHAPTER.particule_champ_e_b;
BAC_ANNALES_BY_CHAPTER.p4 = BAC_ANNALES_BY_CHAPTER.particule_champ_e_b;
BAC_ANNALES_BY_CHAPTER.b1 = BAC_ANNALES_BY_CHAPTER.systeme_nerveux;
BAC_ANNALES_BY_CHAPTER['systeme-nerveux'] = BAC_ANNALES_BY_CHAPTER.systeme_nerveux;
BAC_ANNALES_BY_CHAPTER['systeme_nerveux'] = BAC_ANNALES_BY_CHAPTER.systeme_nerveux;
BAC_ANNALES_BY_CHAPTER['moelle-epiniere'] = BAC_ANNALES_BY_CHAPTER.systeme_nerveux;
BAC_ANNALES_BY_CHAPTER.tissu_nerveux = BAC_ANNALES_BY_CHAPTER.tissu_nerveux;
BAC_ANNALES_BY_CHAPTER['tissu-nerveux'] = BAC_ANNALES_BY_CHAPTER.tissu_nerveux;
BAC_ANNALES_BY_CHAPTER['potentiel-action'] = BAC_ANNALES_BY_CHAPTER.tissu_nerveux;
BAC_ANNALES_BY_CHAPTER['potentiel_action'] = BAC_ANNALES_BY_CHAPTER.tissu_nerveux;
BAC_ANNALES_BY_CHAPTER['potentiel-repos'] = BAC_ANNALES_BY_CHAPTER.tissu_nerveux;
BAC_ANNALES_BY_CHAPTER['neurone'] = BAC_ANNALES_BY_CHAPTER.tissu_nerveux;
BAC_ANNALES_BY_CHAPTER.synapse = BAC_ANNALES_BY_CHAPTER.synapse;
BAC_ANNALES_BY_CHAPTER['transmission-synaptique'] = BAC_ANNALES_BY_CHAPTER.synapse;
BAC_ANNALES_BY_CHAPTER['synapses'] = BAC_ANNALES_BY_CHAPTER.synapse;
BAC_ANNALES_BY_CHAPTER['ppse'] = BAC_ANNALES_BY_CHAPTER.synapse;
BAC_ANNALES_BY_CHAPTER['ppsi'] = BAC_ANNALES_BY_CHAPTER.synapse;
BAC_ANNALES_BY_CHAPTER['arc-reflexe'] = BAC_ANNALES_BY_CHAPTER.reflexes_medullaires;
BAC_ANNALES_BY_CHAPTER['arc_reflexe'] = BAC_ANNALES_BY_CHAPTER.reflexes_medullaires;
BAC_ANNALES_BY_CHAPTER['reflexe-myotatique'] = BAC_ANNALES_BY_CHAPTER.reflexes_medullaires;
BAC_ANNALES_BY_CHAPTER['reflexe_myotatique'] = BAC_ANNALES_BY_CHAPTER.reflexes_medullaires;
BAC_ANNALES_BY_CHAPTER['reflexes-medullaires'] = BAC_ANNALES_BY_CHAPTER.reflexes_medullaires;
BAC_ANNALES_BY_CHAPTER['pavlov'] = BAC_ANNALES_BY_CHAPTER.reflexes_medullaires;
BAC_ANNALES_BY_CHAPTER['conditionnel'] = BAC_ANNALES_BY_CHAPTER.reflexes_medullaires;
BAC_ANNALES_BY_CHAPTER['b1l4'] = BAC_ANNALES_BY_CHAPTER.reflexes_medullaires;
BAC_ANNALES_BY_CHAPTER['b1l3'] = BAC_ANNALES_BY_CHAPTER.synapse;
BAC_ANNALES_BY_CHAPTER['activite-cardiaque'] = BAC_ANNALES_BY_CHAPTER.activite_cardiaque;
BAC_ANNALES_BY_CHAPTER['cardiaque'] = BAC_ANNALES_BY_CHAPTER.activite_cardiaque;
BAC_ANNALES_BY_CHAPTER['b2'] = BAC_ANNALES_BY_CHAPTER.activite_cardiaque;
BAC_ANNALES_BY_CHAPTER['b2l1'] = BAC_ANNALES_BY_CHAPTER.activite_cardiaque;
BAC_ANNALES_BY_CHAPTER['automatisme_cardiaque'] = BAC_ANNALES_BY_CHAPTER.activite_cardiaque;
BAC_ANNALES_BY_CHAPTER['automatisme-cardiaque'] = BAC_ANNALES_BY_CHAPTER.activite_cardiaque;
BAC_ANNALES_BY_CHAPTER['tissu-nodal'] = BAC_ANNALES_BY_CHAPTER.activite_cardiaque;
BAC_ANNALES_BY_CHAPTER['tissu_nodal'] = BAC_ANNALES_BY_CHAPTER.activite_cardiaque;
BAC_ANNALES_BY_CHAPTER['regulation_nerveuse'] = BAC_ANNALES_BY_CHAPTER.regulation_nerveuse;
BAC_ANNALES_BY_CHAPTER['regulation-nerveuse'] = BAC_ANNALES_BY_CHAPTER.regulation_nerveuse;
BAC_ANNALES_BY_CHAPTER['b2l2'] = BAC_ANNALES_BY_CHAPTER.regulation_nerveuse;
BAC_ANNALES_BY_CHAPTER['innervation_cardiaque'] = BAC_ANNALES_BY_CHAPTER.regulation_nerveuse;
BAC_ANNALES_BY_CHAPTER['innervation-cardiaque'] = BAC_ANNALES_BY_CHAPTER.regulation_nerveuse;
BAC_ANNALES_BY_CHAPTER['loewi'] = BAC_ANNALES_BY_CHAPTER.regulation_nerveuse;
BAC_ANNALES_BY_CHAPTER['nerf-vague'] = BAC_ANNALES_BY_CHAPTER.regulation_nerveuse;
BAC_ANNALES_BY_CHAPTER['sympathique'] = BAC_ANNALES_BY_CHAPTER.regulation_nerveuse;

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