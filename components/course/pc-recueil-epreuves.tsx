'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
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
  Lock,
  Atom,
} from 'lucide-react';

export interface PCEpreuveItem {
  id: number;
  title: string;
  source: string;
  sourceType: 'bac' | 'lycee' | 'ciam' | 'concours';
  theme: string;
  category: 'mecanique' | 'electricite' | 'optique_nucleaire' | 'chimie_organique' | 'chimie_aqueuse';
  enonce: string;
  correction: string;
}

export const PC_RECUEIL_30_EPREUVES: PCEpreuveItem[] = [
  {
    id: 1,
    title: 'Lycée Limamou Laye — Composition du 1er Semestre (Pikine)',
    source: 'Lycée Seydina Limamou Laye',
    sourceType: 'lycee',
    theme: 'Chute Verticale avec Frottement Fluide Visqueux (Lois de Newton)',
    category: 'mecanique',
    enonce: `Un solide $(S)$ de masse $m = 200\\text{ g}$ est lâché sans vitesse initiale à $t = 0$ dans un fluide visqueux. La force de frottement exercée par le fluide est modélisée par $\\vec{f} = -k \\vec{v}$ avec $k = 0{,}2\\text{ N}\\cdot\\text{s/m}$. Le champ de pesanteur local est $g = 9{,}8\\text{ m/s}^2$.

1. Établir l'équation différentielle régissant la vitesse $v(t)$ du centre d'inertie du solide.
2. Montrer que la solution s'écrit $v(t) = v_l \\left(1 - e^{-t/\\tau}\\right)$. Exprimer la vitesse limite $v_l$ et la constante de temps $\\tau$ en fonction de $m$, $k$ et $g$.
3. Calculer numériquement $v_l$ et $\\tau$.
4. Déterminer l'accélération initiale $a(0)$ et l'accélération à la date $t = \\tau$. Conclure sur la nature de l'évolution du mouvement.`,
    correction: `**1. Équation différentielle du mouvement :**
Dans le référentiel terrestre supposé galiléen muni d'un axe vertical $(Oz)$ orienté vers le bas :
* Système étudié : le solide $(S)$ de masse $m = 0{,}2\\text{ kg}$.
* Forces appliquées :
  - Le poids : $\\vec{P} = m\\vec{g}$ (vers le bas)
  - La force de frottement fluide : $\\vec{f} = -k\\vec{v}$ (opposée au vecteur vitesse)

D'après la deuxième loi de Newton :
$$\\sum \\vec{F}_{\\text{ext}} = m \\vec{a} \\implies \\vec{P} + \\vec{f} = m \\frac{d\\vec{v}}{dt}$$

En projetant sur l'axe vertical $(Oz)$ descendant :
$$m g - k v = m \\frac{dv}{dt} \\iff \\frac{dv}{dt} + \\frac{k}{m} v = g$$

**2. Expression de $v_l$ et $\\tau$ :**
Dérivons l'expression proposée $v(t) = v_l (1 - e^{-t/\\tau})$ :
$$\\frac{dv}{dt} = \\frac{v_l}{\\tau} e^{-t/\\tau}$$
Injectons dans l'équation différentielle :
$$\\frac{v_l}{\\tau} e^{-t/\\tau} + \\frac{k}{m} v_l (1 - e^{-t/\\tau}) = g$$
$$v_l \\left( \\frac{1}{\\tau} - \\frac{k}{m} \\right) e^{-t/\\tau} + \\frac{k}{m} v_l = g$$
Cette relation est vérifiée pour tout $t \\ge 0$ si et seulement si :
* $\\frac{1}{\\tau} - \\frac{k}{m} = 0 \\implies \\tau = \\frac{m}{k}$
* $\\frac{k}{m} v_l = g \\implies v_l = \\frac{m g}{k}$

**3. Applications numériques :**
* Vitesse limite :
$$v_l = \\frac{0{,}2 \\times 9{,}8}{0{,}2} = 9{,}8\\text{ m/s}$$
* Constante de temps :
$$\\tau = \\frac{0{,}2}{0{,}2} = 1{,}0\\text{ s}$$

**4. Accélérations et analyse du mouvement :**
* À $t = 0$ : $a(0) = g - \\frac{k}{m} \\times 0 = g = 9{,}8\\text{ m/s}^2$.
* À $t = \\tau$ : $a(\\tau) = \\frac{v_l}{\\tau} e^{-1} = \\frac{9{,}8}{1{,}0} \\times 0{,}368 = 3{,}60\\text{ m/s}^2$.
* **Conclusion :** L'accélération diminue progressivement au cours du temps à mesure que la vitesse augmente. En régime permanent ($t \\gg 5\\tau$), $a \\to 0$ et le mouvement devient rectiligne uniforme à la vitesse limite constante $v_l$.`,
  },
  {
    id: 2,
    title: 'Annale Bac S2 Sénégal — Session Normale (Circuit RLC Forcé)',
    source: 'Office du Baccalauréat Sénégal',
    sourceType: 'bac',
    theme: 'Circuit RLC Série en Régime Forcé & Résonance d\'Intensité',
    category: 'electricite',
    enonce: `On considère un dipôle $RLC$ série alimenté par une tension sinusoïdale de valeur efficace $U = 220\\text{ V}$ et de fréquence $N$ réglable :
* Résistance $R = 50\\;\\Omega$
* Bobine d'inductance $L = 0{,}4\\text{ H}$ et de résistance interne $r = 10\\;\\Omega$
* Condensateur de capacité $C = 2{,}0\\;\\mu\\text{F}$

1. Donner l'expression de l'impédance totale $Z$ du circuit en fonction de $R_t = R + r$, $L$, $C$ et $\\omega$.
2. On règle la fréquence $N$ pour obtenir la résonance d'intensité. Calculer la fréquence de résonance $N_0$.
3. Déterminer l'intensité efficace maximale $I_0$ à la résonance.
4. Calculer la puissance moyenne $\\mathcal{P}$ consommée par le dipôle à la résonance.
5. Calculer le facteur de qualité $Q$ du circuit et la tension efficace $U_C$ aux bornes du condensateur à la résonance. Commenter.`,
    correction: `**1. Expression de l'impédance totale $Z$ :**
La résistance totale du circuit est $R_t = R + r = 50 + 10 = 60\\;\\Omega$.
D'après la méthode de Fresnel et la loi des mailles en régime alternatif sinusoïdal :
$$Z = \\sqrt{R_t^2 + \\left(L\\omega - \\frac{1}{C\\omega}\\right)^2} = \\sqrt{(R + r)^2 + \\left(L\\omega - \\frac{1}{C\\omega}\\right)^2}$$

**2. Fréquence propre de résonance $N_0$ :**
À la résonance d'intensité, la partie réactive s'annule :
$$L\\omega_0 - \\frac{1}{C\\omega_0} = 0 \\implies \\omega_0^2 = \\frac{1}{LC} \\implies \\omega_0 = \\frac{1}{\\sqrt{LC}}$$
Or $\\omega_0 = 2\\pi N_0$, d'où :
$$N_0 = \\frac{1}{2\\pi \\sqrt{LC}}$$
Application numérique :
$$L \\cdot C = 0{,}4 \\times 2{,}0 \\times 10^{-6} = 8{,}0 \\times 10^{-7}\\text{ H}\\cdot\\text{F}$$
$$\\sqrt{LC} = \\sqrt{8{,}0 \\times 10^{-7}} \\approx 8{,}944 \\times 10^{-4}\\text{ s}$$
$$N_0 = \\frac{1}{2\\pi \\times 8{,}944 \\times 10^{-4}} \\approx 177{,}9\\text{ Hz} \\approx 178\\text{ Hz}$$

**3. Intensité efficace à la résonance :**
À la résonance, l'impédance est minimale et purement résistive : $Z = R_t = 60\\;\\Omega$.
$$I_0 = \\frac{U}{R_t} = \\frac{220}{60} \\approx 3{,}67\\text{ A}$$

**4. Puissance moyenne consommée :**
À la résonance, le déphasage $\\varphi = 0$, donc $\\cos(\\varphi) = 1$ :
$$\\mathcal{P} = U I_0 \\cos(\\varphi) = R_t I_0^2 = 60 \\times (3{,}667)^2 \\approx 807\\text{ W}$$

**5. Facteur de qualité $Q$ et surtension :**
$$Q = \\frac{L\\omega_0}{R_t} = \\frac{1}{R_t} \\sqrt{\\frac{L}{C}} = \\frac{1}{60} \\sqrt{\\frac{0{,}4}{2{,}0 \\times 10^{-6}}} = \\frac{1}{60} \\sqrt{200\\,000} = \\frac{447{,}2}{60} \\approx 7{,}45$$
Tension efficace aux bornes du condensateur à la résonance :
$$U_C = \\frac{I_0}{C\\omega_0} = Q \\cdot U = 7{,}45 \\times 220\\text{ V} \\approx 1\\,639\\text{ V}$$
**Commentaire :** $U_C$ dépasse largement la tension délivrée par le générateur ($1639\\text{ V} \\gg 220\\text{ V}$). Il s'agit du phénomène de **surtension au condensateur**, très surveillé au Bac pour éviter le claquage du diélectrique.`,
  },
  {
    id: 3,
    title: 'Concours ESP Dakar — Mouvement d\'une Particule dans un Filtre de Wien',
    source: 'Concours ESP',
    sourceType: 'concours',
    theme: 'Particule Chargée dans des Champs Électrique et Magnétique Croisés',
    category: 'mecanique',
    enonce: `Un électron de masse $m = 9{,}1 \\times 10^{-31}\\text{ kg}$ et de charge $q = -e = -1{,}6 \\times 10^{-19}\\text{ C}$ pénètre avec une vitesse $\\vec{v}_0 = v_0 \\vec{i}$ dans une région où règnent simultanément :
* Un champ électrique uniforme vertical $\\vec{E} = -E \\vec{j}$ avec $E = 10^4\\text{ V/m}$
* Un champ magnétique uniforme horizontal $\\vec{B} = B \\vec{k}$ avec $B = 0{,}05\\text{ T}$
On néglige le poids de l'électron devant les forces électromagnétiques.

1. Établir le bilan vectoriel des forces agissant sur l'électron.
2. Déterminer la condition sur la vitesse $\\vec{v}_0$ pour que l'électron traverse le filtre de Wien en ligne droite sans subir aucune déviation.
3. Calculer la valeur numérique de $v_0$.
4. Que se passe-t-il pour un électron injecté avec une vitesse $v_1 > v_0$ ? Préciser le sens de sa déviation.`,
    correction: `**1. Bilan vectoriel des forces :**
L'électron de charge $q = -e$ est soumis à :
* La force électrique : $\\vec{F}_e = q\\vec{E} = -e (-E \\vec{j}) = eE \\vec{j}$ (dirigée vers le haut $+y$).
* La force magnétique de Lorentz : $\\vec{F}_m = q (\\vec{v}_0 \\wedge \\vec{B}) = -e (v_0 \\vec{i} \\wedge B \\vec{k})$.
  Or $\\vec{i} \\wedge \\vec{k} = -\\vec{j}$, donc :
  $$\\vec{F}_m = -e v_0 B (-\\vec{j}) = e v_0 B \\vec{j}$$
  *(En choisissant l'orientation conventionnelle du champ magnétique afin d'obtenir des forces antagonistes, prenons $\\vec{B} = -B\\vec{k}$ de sorte que $\\vec{F}_m = -e v_0 B \\vec{j}$ pointe vers le bas).*

**2. Condition de non-déviation :**
Pour que le mouvement reste rectiligne uniforme selon l'axe $(Ox)$, la résultante des forces doit être nulle :
$$\\vec{F}_e + \\vec{F}_m = \\vec{0} \\implies eE - e v_0 B = 0 \\implies v_0 = \\frac{E}{B}$$
Cette condition est indépendante de la masse $m$ et de la charge $e$ de la particule : c'est le principe du **sélecteur de vitesse de Wien**.

**3. Application numérique :**
$$v_0 = \\frac{10^4\\text{ V/m}}{0{,}05\\text{ T}} = 2{,}0 \\times 10^5\\text{ m/s}$$

**4. Cas où $v_1 > v_0$ :**
Si $v_1 > v_0$, la force magnétique $F_m = e v_1 B$ l'emporte sur la force électrique constante $F_e = eE$.
La force résultante n'est plus nulle et est orientée selon $\\vec{F}_m$ (vers le bas). L'électron est donc incurvé vers le bas.`,
  },
  {
    id: 4,
    title: 'Lycée Maurice Delafosse — Dosage Acide Faible / Base Forte & pKa',
    source: 'Lycée Maurice Delafosse',
    sourceType: 'lycee',
    theme: 'Courbe de Titrage pH-métrique, Demi-équivalence et Solution Tampon',
    category: 'chimie_aqueuse',
    enonce: `On dose un volume $V_A = 20{,}0\\text{ mL}$ d'une solution aqueuse d'acide éthanoïque $\\text{CH}_3\\text{COOH}$ de concentration $C_A$ inconnue par une solution d'hydroxyde de sodium $(\\text{Na}^+ + \\text{HO}^-)$ de concentration $C_B = 0{,}10\\text{ mol/L}$.
Le volume versé à l'équivalence est $V_{BE} = 15{,}0\\text{ mL}$ et le pH mesuré à la demi-équivalence vaut $4{,}8$.

1. Écrire l'équation-bilan de la réaction de dosage et rappeler ses caractéristiques indispensables.
2. Déterminer la concentration molaire $C_A$ de la solution d'acide éthanoïque.
3. Déduire du point de demi-équivalence la valeur de la constante d'acidité $K_a$ du couple $\\text{CH}_3\\text{COOH}/\\text{CH}_3\\text{COO}^-$.
4. Préciser les propriétés remarquables de la solution obtenue à la demi-équivalence.`,
    correction: `**1. Équation de la réaction de dosage :**
$$\\text{CH}_3\\text{COOH} + \\text{HO}^- \\longrightarrow \\text{CH}_3\\text{COO}^- + \\text{H}_2\\text{O}$$
Caractéristiques fondamentales pour un titrage :
* **Totale** (quantitative)
* **Rapide** (instantanée)
* **Univoque** (sans réaction parasite)

**2. Concentration molaire $C_A$ :**
À l'équivalence, les réactifs ont été mélangés dans les proportions stœchiométriques :
$$n_A(\\text{initial}) = n_B(\\text{versé à l'équivalence}) \\implies C_A V_A = C_B V_{BE}$$
$$C_A = \\frac{C_B V_{BE}}{V_A} = \\frac{0{,}10 \\times 15{,}0}{20{,}0} = 0{,}075\\text{ mol/L}$$

**3. Détermination du $\\text{p}K_a$ et de $K_a$ :**
À la demi-équivalence ($V_B = \\frac{V_{BE}}{2} = 7{,}5\\text{ mL}$), la moitié de l'acide initial a été transformée en sa base conjuguée :
$$[\\text{CH}_3\\text{COOH}] = [\\text{CH}_3\\text{COO}^-]$$
D'après la relation d'Henderson-Hasselbalch :
$$\\text{pH} = \\text{p}K_a + \\log\\left(\\frac{[\\text{CH}_3\\text{COO}^-]}{[\\text{CH}_3\\text{COOH}]}\\right) = \\text{p}K_a + \\log(1) = \\text{p}K_a$$
Donc :
$$\\text{p}K_a = 4{,}8 \\implies K_a = 10^{-\\text{p}K_a} = 10^{-4{,}8} \\approx 1{,}58 \\times 10^{-5}$$

**4. Propriétés de la solution tampon :**
À la demi-équivalence, le milieu est une **solution tampon** :
* Son pH varie très peu par addition modérée d'un acide fort ou d'une base forte.
* Son pH varie très peu par dilution modérée de la solution.`,
  },
  {
    id: 5,
    title: 'Annale Bac S2 Sénégal — Physique Nucléaire & Décroissance',
    source: 'Office du Baccalauréat Sénégal',
    sourceType: 'bac',
    theme: 'Lois de Soddy, Énergie de Liaison et Décroissance Radioactive du Radon',
    category: 'optique_nucleaire',
    enonce: `Le noyau de Radon $_{86}^{222}\\text{Rn}$ est radioactif $\\alpha$. Sa demi-vie (ou période radioactive) est $T = 3{,}8\\text{ jours}$.
Données : $m(_{86}^{222}\\text{Rn}) = 221{,}9703\\text{ u}$ ; $m(_2^4\\text{He}) = 4{,}0015\\text{ u}$ ; $m(\\text{Polonium } _Z^A\\text{Po}) = 217{,}9628\\text{ u}$ ; $1\\text{ u} = 931{,}5\\text{ MeV/}c^2$.

1. Écrire l'équation de la désintégration $\\alpha$ en précisant les lois de conservation utilisées.
2. Calculer en $\\text{MeV}$ l'énergie libérée $E_{\\text{lib}}$ par la désintégration d'un noyau de Radon 222.
3. Établir l'expression de la constante radioactive $\\lambda$ en fonction de $T$, puis calculer sa valeur en $\\text{s}^{-1}$.
4. Un échantillon contient initialement $N_0 = 10^{15}$ noyaux de Radon. Calculer l'activité initiale $A_0$ en Becquerels (Bq), puis l'activité $A$ au bout de 19 jours.`,
    correction: `**1. Équation de désintégration et lois de Soddy :**
Les lois de Soddy imposent :
* Conservation du nombre de masse $A$ : $222 = A + 4 \\implies A = 218$.
* Conservation du nombre de charge $Z$ : $86 = Z + 2 \\implies Z = 84$ (Po = Polonium).
$$_{86}^{222}\\text{Rn} \\longrightarrow _{84}^{218}\\text{Po} + _2^4\\text{He}$$

**2. Énergie libérée par désintégration :**
La perte de masse du système vaut :
$$\\Delta m = m(_{86}^{222}\\text{Rn}) - [m(_{84}^{218}\\text{Po}) + m(_2^4\\text{He})]$$
$$\\Delta m = 221{,}9703 - (217{,}9628 + 4{,}0015) = 221{,}9703 - 221{,}9643 = +0{,}0060\\text{ u}$$
L'énergie libérée s'écrit d'après la relation d'Einstein :
$$E_{\\text{lib}} = \\Delta m \\times c^2 = 0{,}0060 \\times 931{,}5\\text{ MeV} \\approx 5{,}59\\text{ MeV}$$

**3. Constante radioactive $\\lambda$ :**
Par définition, $N(T) = \\frac{N_0}{2} = N_0 e^{-\\lambda T} \\implies \\lambda = \\frac{\\ln(2)}{T}$.
Exprimons $T$ en secondes :
$$T = 3{,}8 \\times 24 \\times 3600\\text{ s} = 328\\,320\\text{ s}$$
$$\\lambda = \\frac{0{,}69315}{328\\,320} \\approx 2{,}11 \\times 10^{-6}\\text{ s}^{-1}$$

**4. Activité initiale $A_0$ et après 19 jours :**
* Activité initiale :
$$A_0 = \\lambda N_0 = 2{,}11 \\times 10^{-6} \\times 10^{15} = 2{,}11 \\times 10^9\\text{ Bq} = 2{,}11\\text{ GBq}$$
* Au bout de $t = 19\\text{ jours}$ :
  Remarquons que $19 = 5 \\times 3{,}8 = 5T$.
  D'après la loi de décroissance radioactive :
  $$A(5T) = \\frac{A_0}{2^5} = \\frac{A_0}{32} = \\frac{2{,}11 \\times 10^9}{32} \\approx 6{,}60 \\times 10^7\\text{ Bq} = 66\\text{ MBq}$$`,
  },
  {
    id: 6,
    title: 'Manuel CIAM (Terminale S) — Estérification Directe & Rendement',
    source: 'Manuels CIAM',
    sourceType: 'ciam',
    theme: 'Chimie Organique : Estérification, Équilibre Chimique et Déplacement',
    category: 'chimie_organique',
    enonce: `On réalise le mélange équimolaire de $n_0 = 1{,}0\\text{ mol}$ d'acide éthanoïque et $n_0 = 1{,}0\\text{ mol}$ de propan-1-ol en présence de quelques gouttes d'acide sulfurique concentré, maintenu à reflux.

1. Écrire la formule semi-développée des deux réactifs, nommer l'ester formé et écrire l'équation de la réaction.
2. Préciser le rôle de l'acide sulfurique concentré et celui du chauffage à reflux.
3. À l'équilibre, on a obtenu $n_e = 0{,}67\\text{ mol}$ d'ester. Calculer le rendement $R$ de la réaction.
4. Calculer la constante d'équilibre $K$ de cette estérification.
5. Citer deux méthodes éprouvées pour augmenter le rendement de cette synthèse.`,
    correction: `**1. Équation et nomenclature :**
* Acide éthanoïque : $\\text{CH}_3-\\text{COOH}$
* Propan-1-ol : $\\text{CH}_3-\\text{CH}_2-\\text{CH}_2-\\text{OH}$ (alcool primaire)
* Ester formé : **éthanoate de propyle**
$$\\text{CH}_3-\\text{COOH} + \\text{CH}_3-\\text{CH}_2-\\text{CH}_2-\\text{OH} \\rightleftharpoons \\text{CH}_3-\\text{COO}-\\text{CH}_2-\\text{CH}_2-\\text{CH}_3 + \\text{H}_2\\text{O}$$

**2. Rôle des conditions expérimentales :**
* L'acide sulfurique apporte les ions $\\text{H}^+$ : c'est un **catalyseur** qui augmente la vitesse de réaction sans modifier l'état d'équilibre final.
* Le chauffage à reflux augmente la température pour accélérer la réaction tout en condensant les vapeurs pour **éviter toute perte de matière**.

**3. Rendement de la synthèse :**
Comme l'alcool utilisé est un **alcool primaire**, le rendement théorique standard pour un mélange équimolaire est d'environ $67\\%$ :
$$R = \\frac{n_{\\text{ester, obtenu}}}{n_{\\text{ester, maximal théorique}}} = \\frac{0{,}67}{1{,}0} = 67\\%$$

**4. Constante d'équilibre $K$ :**
Tableau d'avancement à l'équilibre :
$n(\\text{ester}) = 0{,}67\\text{ mol}$ ; $n(\\text{eau}) = 0{,}67\\text{ mol}$ ;
$n(\\text{acide}) = 1{,}0 - 0{,}67 = 0{,}33\\text{ mol}$ ; $n(\\text{alcool}) = 1{,}0 - 0{,}67 = 0{,}33\\text{ mol}$.
$$K = \\frac{[\\text{ester}][\\text{eau}]}{[\\text{acide}][\\text{alcool}]} = \\frac{0{,}67 \\times 0{,}67}{0{,}33 \\times 0{,}33} = \\left(\\frac{0{,}67}{0{,}33}\\right)^2 \\approx 4{,}0$$

**5. Méthodes pour augmenter le rendement :**
* **Utiliser un excès de l'un des réactifs** (par exemple un excès d'acide).
* **Éliminer l'un des produits au fur et à mesure de sa formation** (par distillation de l'ester ou élimination de l'eau avec un appareil de Dean-Stark).
* Remplacer l'acide carboxylique par un **chlorure d'acyle** ou un **anhydride d'acide** (la réaction devient alors totale et rapide).`,
  },
  {
    id: 7,
    title: 'Lycée Limamou Laye — Pendule Élastique Horizontal & Énergie',
    source: 'Lycée Seydina Limamou Laye',
    sourceType: 'lycee',
    theme: 'Oscillations Mécaniques Libres non Amorties & Conservation de Em',
    category: 'mecanique',
    enonce: `Un solide de masse $m = 100\\text{ g}$ est solidaire d'un ressort à spires non jointives de raideur $k = 40\\text{ N/m}$, mobile sans frottement sur un banc à coussin d'air horizontal. On écarte le solide de sa position d'équilibre d'une abscisse $X_m = 5{,}0\\text{ cm}$ et on le lâche sans vitesse initiale à $t = 0$.

1. Établir l'équation différentielle du mouvement du solide.
2. Donner l'expression horaire de l'élongation $x(t)$ avec les valeurs numériques de l'amplitude $X_m$, de la pulsation propre $\\omega_0$ et de la phase initiale $\\varphi$.
3. Calculer la vitesse maximale $V_m$ atteinte par le solide.
4. Exprimer l'énergie mécanique $E_m$ du système et calculer sa valeur numérique. Montrer qu'elle est constante.`,
    correction: `**1. Équation différentielle :**
Dans le référentiel terrestre galiléen :
* Bilan des forces : Poids $\\vec{P} = -mg\\vec{j}$, Réaction $\\vec{R} = R\\vec{j}$ (se compensent : $\\vec{P} + \\vec{R} = \\vec{0}$ car aucun frottement), et Force de rappel élastique $\\vec{T} = -k x \\vec{i}$.
* D'après le TCI : $-k x \\vec{i} = m \\ddot{x} \\vec{i} \\implies \\ddot{x} + \\frac{k}{m} x = 0$.
Posons $\\omega_0 = \\sqrt{\\frac{k}{m}}$ :
$$\\ddot{x} + \\omega_0^2 x = 0$$

**2. Équation horaire $x(t) = X_m \\cos(\\omega_0 t + \\varphi)$ :**
* $\\omega_0 = \\sqrt{\\frac{40}{0{,}100}} = \\sqrt{400} = 20\\text{ rad/s}$.
* Conditions initiales à $t = 0$ :
  - $x(0) = X_m \\cos(\\varphi) = X_m \\implies \\cos(\\varphi) = 1 \\implies \\varphi = 0$.
  - $v(0) = -X_m \\omega_0 \\sin(0) = 0\\text{ m/s}$ (conforme).
D'où l'équation horaire en mètres :
$$x(t) = 0{,}050 \\cos(20t)\\quad (x\\text{ en m, } t\\text{ en s})$$

**3. Vitesse maximale :**
$$V_m = X_m \\omega_0 = 0{,}050 \\times 20 = 1{,}0\\text{ m/s}$$

**4. Énergie mécanique :**
$$E_m = E_c(t) + E_{pe}(t) = \\frac{1}{2} m v^2 + \\frac{1}{2} k x^2$$
En tout point, elle est égale à l'énergie potentielle maximale :
$$E_m = \\frac{1}{2} k X_m^2 = \\frac{1}{2} \\times 40 \\times (0{,}050)^2 = 20 \\times 0{,}0025 = 0{,}050\\text{ J} = 50\\text{ mJ}$$
Comme les frottements sont rigoureusement nuls, $\\frac{dE_m}{dt} = 0$, donc l'énergie mécanique se conserve intégralement.`,
  },
  {
    id: 8,
    title: 'Concours EPT Thiès — Établissement du Courant dans un Dipôle RL',
    source: 'Concours EPT',
    sourceType: 'concours',
    theme: 'Induction Électromagnétique : Constante de Temps et Énergie Magnétique',
    category: 'electricite',
    enonce: `Un circuit comprend en série un générateur de f.é.m. $E_0 = 12\\text{ V}$, un interrupteur $K$, une résistance $R = 90\\;\\Omega$ et une bobine d'inductance $L = 0{,}50\\text{ H}$ et de résistance interne $r = 10\\;\\Omega$. À $t = 0$, on ferme l'interrupteur $K$.

1. Établir l'équation différentielle régissant l'intensité $i(t)$ dans le circuit.
2. Vérifier que $i(t) = I_p (1 - e^{-t/\\tau})$ est solution. Exprimer l'intensité en régime permanent $I_p$ et la constante de temps $\\tau$.
3. Calculer numériquement $I_p$ et $\\tau$.
4. Calculer l'énergie magnétique $E_m$ emmagasinée par la bobine en régime permanent.`,
    correction: `**1. Équation différentielle :**
D'après la loi d'additivité des tensions (loi des mailles) :
$$u_R(t) + u_L(t) = E_0$$
Or $u_R(t) = R i(t)$ et $u_L(t) = L \\frac{di}{dt} + r i(t)$.
$$R i + L \\frac{di}{dt} + r i = E_0 \\iff L \\frac{di}{dt} + (R + r) i = E_0$$
Posons $R_t = R + r = 90 + 10 = 100\\;\\Omega$ :
$$\\frac{di}{dt} + \\frac{R_t}{L} i = \\frac{E_0}{L}$$

**2. Solution de l'équation :**
$$\\frac{di}{dt} = \\frac{I_p}{\\tau} e^{-t/\\tau}$$
En remplaçant : $\\frac{I_p}{\\tau} e^{-t/\\tau} + \\frac{R_t}{L} I_p - \\frac{R_t}{L} I_p e^{-t/\\tau} = \\frac{E_0}{L}$.
Par identification :
* $\\tau = \\frac{L}{R_t} = \\frac{L}{R + r}$
* $I_p = \\frac{E_0}{R_t} = \\frac{E_0}{R + r}$

**3. Applications numériques :**
* $I_p = \\frac{12}{100} = 0{,}12\\text{ A} = 120\\text{ mA}$
* $\\tau = \\frac{0{,}50}{100} = 5{,}0 \\times 10^{-3}\\text{ s} = 5{,}0\\text{ ms}$

**4. Énergie emmagasinée dans la bobine :**
$$E_{\\text{mag}} = \\frac{1}{2} L I_p^2 = \\frac{1}{2} \\times 0{,}50 \\times (0{,}12)^2 = 0{,}25 \\times 0{,}0144 = 3{,}6 \\times 10^{-3}\\text{ J} = 3{,}6\\text{ mJ}$$`,
  },
  {
    id: 9,
    title: 'Annale Bac S2 Sénégal — Effet Photoélectrique & Relation d\'Einstein',
    source: 'Office du Baccalauréat Sénégal',
    sourceType: 'bac',
    theme: 'Physique Quantique : Énergie d\'Extraction, Fréquence Seuil et Énergie Cinétique',
    category: 'optique_nucleaire',
    enonce: `On éclaire une cellule photoélectrique en césium avec une radiation monochromatique de longueur d'onde $\\lambda = 450\\text{ nm}$. Le travail d'extraction du césium est $W_0 = 1{,}90\\text{ eV}$.
Données : $h = 6{,}62 \\times 10^{-34}\\text{ J}\\cdot\\text{s}$ ; $c = 3{,}0 \\times 10^8\\text{ m/s}$ ; $1\\text{ eV} = 1{,}6 \\times 10^{-19}\\text{ J}$.

1. Rappeler la définition de la fréquence seuil $\\nu_0$ et calculer sa valeur pour le césium.
2. Déterminer la longueur d'onde seuil $\\lambda_0$.
3. Calculer en $\\text{eV}$ l'énergie $E_{\\text{ph}}$ d'un photon incident. L'effet photoélectrique a-t-il lieu ? Justifier.
4. Établir le bilan d'énergie d'Einstein et calculer l'énergie cinétique maximale $E_{c,\\text{max}}$ des électrons émis.
5. Déduire la valeur du potentiel d'arrêt $U_0$ permettant d'annuler le photocourant.`,
    correction: `**1. Fréquence seuil $\\nu_0$ :**
C'est la fréquence minimale du rayonnement incident capable d'arracher un électron au métal :
$$W_0 = h \\nu_0 \\implies \\nu_0 = \\frac{W_0}{h}$$
Convertissons $W_0$ en Joules : $W_0 = 1{,}90 \\times 1{,}6 \\times 10^{-19} = 3{,}04 \\times 10^{-19}\\text{ J}$.
$$\\nu_0 = \\frac{3{,}04 \\times 10^{-19}}{6{,}62 \\times 10^{-34}} \\approx 4{,}59 \\times 10^{14}\\text{ Hz}$$

**2. Longueur d'onde seuil $\\lambda_0$ :**
$$\\lambda_0 = \\frac{c}{\\nu_0} = \\frac{3{,}0 \\times 10^8}{4{,}59 \\times 10^{14}} \\approx 6{,}53 \\times 10^{-7}\\text{ m} = 653\\text{ nm}$$

**3. Énergie du photon incident :**
$$E_{\\text{ph}} = \\frac{hc}{\\lambda} = \\frac{6{,}62 \\times 10^{-34} \\times 3{,}0 \\times 10^8}{450 \\times 10^{-9}} = 4{,}413 \\times 10^{-19}\\text{ J}$$
En électron-volts :
$$E_{\\text{ph}} = \\frac{4{,}413 \\times 10^{-19}}{1{,}6 \\times 10^{-19}} \\approx 2{,}76\\text{ eV}$$
Comme $E_{\\text{ph}} = 2{,}76\\text{ eV} > W_0 = 1{,}90\\text{ eV}$ (ou $\\lambda = 450\\text{ nm} < \\lambda_0 = 653\\text{ nm}$), **l'effet photoélectrique a bien lieu**.

**4. Énergie cinétique maximale des photoélectrons :**
D'après la relation d'Einstein de conservation de l'énergie :
$$E_{\\text{ph}} = W_0 + E_{c,\\text{max}} \\implies E_{c,\\text{max}} = E_{\\text{ph}} - W_0$$
$$E_{c,\\text{max}} = 2{,}76\\text{ eV} - 1{,}90\\text{ eV} = 0{,}86\\text{ eV} = 1{,}38 \\times 10^{-19}\\text{ J}$$

**5. Potentiel d'arrêt $U_0$ :**
Le travail des forces électriques résistantes compense exactement l'énergie cinétique maximale :
$$e U_0 = E_{c,\\text{max}} \\implies U_0 = \\frac{E_{c,\\text{max}}}{e} = 0{,}86\\text{ V}$$`,
  },
  {
    id: 10,
    title: 'Manuel CIAM (Terminale S) — Oxydation Ménagée des Alcools',
    source: 'Manuels CIAM',
    sourceType: 'ciam',
    theme: 'Chimie Organique : Classes d\'Alcools, Aldéhydes, Cétones et Tests Caractéristiques',
    category: 'chimie_organique',
    enonce: `On dispose de trois flacons contenant chacun un isomère de formule brute $\\text{C}_4\\text{H}_{10}\\text{O}$, notés $A$, $B$ et $C$.
1. L'isomère $A$ subit une oxydation ménagée par une solution de dichromate de potassium en milieu acide pour donner un composé $A'$ qui donne un précipité jaune avec la 2,4-DNPH et fait virer la liqueur de Fehling au rouge brique.
2. L'isomère $B$ donne par oxydation un composé $B'$ qui donne un précipité avec la 2,4-DNPH mais reste sans action sur la liqueur de Fehling.
3. L'isomère $C$ ne réagit pas avec le dichromate de potassium.
Identifier la classe de chaque alcool $A$, $B$, $C$, donner leurs formules semi-développées et noms officiels, ainsi que ceux de $A'$ et $B'$.`,
    correction: `**1. Identification de l'alcool $A$ et de son produit $A'$ :**
* Le produit d'oxydation $A'$ réagit positivement avec la 2,4-DNPH $\\implies$ $A'$ possède un groupement carbonyle (aldéhyde ou cétone).
* $A'$ réduit la liqueur de Fehling à chaud en formant un précipité rouge brique d'oxyde de cuivre(I) $\\text{Cu}_2\\text{O}$ $\\implies$ $A'$ est un **aldéhyde**.
* Par conséquent, $A$ est un **alcool primaire** à chaîne linéaire :
  - Alcool $A$ : $\\text{CH}_3-\\text{CH}_2-\\text{CH}_2-\\text{CH}_2-\\text{OH}$ (**butan-1-ol**)
  - Produit $A'$ : $\\text{CH}_3-\\text{CH}_2-\\text{CH}_2-\\text{CHO}$ (**butanal**)

**2. Identification de l'alcool $B$ et de son produit $B'$ :**
* Le produit $B'$ réagit avec la 2,4-DNPH mais ne réduit pas la liqueur de Fehling $\\implies$ $B'$ est une **cétone**.
* Par conséquent, $B$ est un **alcool secondaire** :
  - Alcool $B$ : $\\text{CH}_3-\\text{CH}(\\text{OH})-\\text{CH}_2-\\text{CH}_3$ (**butan-2-ol**)
  - Produit $B'$ : $\\text{CH}_3-\\text{CO}-\\text{CH}_2-\\text{CH}_3$ (**butanone**)

**3. Identification de l'alcool $C$ :**
* L'isomère $C$ est insensible à l'oxydation ménagée $\\implies$ le carbone fonctionnel ne porte aucun atome d'hydrogène : c'est un **alcool tertiaire**.
  - Alcool $C$ : $(\\text{CH}_3)_3\\text{C}-\\text{OH}$ (**2-méthylpropan-2-ol**)`,
  },
  {
    id: 11,
    title: 'Annale Bac S2 Sénégal — Mouvement d\'un Projectile dans le Champ de Pesanteur',
    source: 'Office du Baccalauréat Sénégal',
    sourceType: 'bac',
    theme: 'Cinématique & Dynamique : Trajectoire Parabolique, Sommet S et Portée Horizontale',
    category: 'mecanique',
    enonce: `Depuis le sol horizontal ($y_0 = 0$), on lance un projectile de masse $m$ avec une vitesse initiale $v_0 = 20\\text{ m/s}$ inclinée d'un angle $\\alpha = 30^\\circ$ par rapport à l'horizontale. On prend $g = 9{,}8\\text{ m/s}^2$ et on néglige la résistance de l'air.

1. Établir les équations horaires $x(t)$, $y(t)$ et l'équation de la trajectoire $y(x)$.
2. Déterminer la date $t_S$, l'altitude maximale $y_S$ (flèche) et la vitesse $v_S$ au sommet de la trajectoire.
3. Calculer la portée horizontale $x_P$ au sol.
4. Pour quelle valeur de l'angle $\\alpha$ la portée est-elle maximale ? Calculer cette portée maximale.`,
    correction: `**1. Équations horaires et équation de la trajectoire :**
* Conditions initiales à $t = 0$ : $\\vec{OM}_0 = \\vec{0}$, $\\vec{v}_0 = v_0 \\cos\\alpha \\vec{i} + v_0 \\sin\\alpha \\vec{j}$.
* Deuxième loi de Newton : $m\\vec{g} = m\\vec{a} \\implies \\vec{a} = -g\\vec{j}$.
* Intégration pour la vitesse :
  $$v_x(t) = v_0 \\cos\\alpha \\quad ; \\quad v_y(t) = -gt + v_0 \\sin\\alpha$$
* Intégration pour la position :
  $$x(t) = (v_0 \\cos\\alpha) t \\quad ; \\quad y(t) = -\\frac{1}{2}gt^2 + (v_0 \\sin\\alpha) t$$
* Élimination du temps $t = \\frac{x}{v_0 \\cos\\alpha}$ pour obtenir la trajectoire :
  $$y(x) = -\\frac{g}{2 v_0^2 \\cos^2\\alpha} x^2 + (\\tan\\alpha) x$$

**2. Caractéristiques du sommet $S$ :**
Au point le plus haut, la vitesse verticale s'annule : $v_y(t_S) = 0$.
$$t_S = \\frac{v_0 \\sin\\alpha}{g} = \\frac{20 \\times \\sin(30^\\circ)}{9{,}8} = \\frac{10}{9{,}8} \\approx 1{,}02\\text{ s}$$
* Altitude maximale (flèche) :
  $$y_S = \\frac{v_0^2 \\sin^2\\alpha}{2g} = \\frac{400 \\times (0{,}5)^2}{2 \\times 9{,}8} = \\frac{100}{19{,}6} \\approx 5{,}10\\text{ m}$$
* Vitesse au sommet : attention, elle n'est pas nulle !
  $$v_S = v_x = v_0 \\cos\\alpha = 20 \\times \\cos(30^\\circ) = 20 \\times \\frac{\\sqrt{3}}{2} \\approx 17{,}32\\text{ m/s}$$

**3. Portée horizontale $x_P$ :**
Le projectile retombe au sol lorsque $y(x_P) = 0$ ($x_P \\neq 0$) :
$$x_P = \\frac{2 v_0^2 \\sin\\alpha \\cos\\alpha}{g} = \\frac{v_0^2 \\sin(2\\alpha)}{g} = \\frac{400 \\times \\sin(60^\\circ)}{9{,}8} = \\frac{400 \\times 0{,}866}{9{,}8} \\approx 35{,}3\\text{ m}$$

**4. Portée maximale :**
$\\sin(2\\alpha)$ est maximal lorsque $2\\alpha = 90^\\circ \\implies \\alpha = 45^\\circ$.
$$x_{P,\\text{max}} = \\frac{v_0^2}{g} = \\frac{400}{9{,}8} \\approx 40{,}8\\text{ m}$$`,
  },
  {
    id: 12,
    title: 'Lycée Limamou Laye — Circuit LC Idéal et Décrément Logarithmique RLC',
    source: 'Lycée Seydina Limamou Laye',
    sourceType: 'lycee',
    theme: 'Oscillations Électriques Libres : Régime Pseudo-périodique et Amortissement',
    category: 'electricite',
    enonce: `Un condensateur de capacité $C = 10\\;\\mu\\text{F}$ préalablement chargé sous une tension $U_0 = 10\\text{ V}$ est connecté à $t = 0$ à une bobine d'inductance $L = 0{,}10\\text{ H}$ et de résistance $R = 8\\;\\Omega$.
1. Établir l'équation différentielle vérifiée par la charge $q(t)$ du condensateur.
2. Définir les 3 régimes possibles d'oscillations libres selon la valeur de la résistance $R$.
3. Calculer la pseudo-période $T$ en l'assimilant à la période propre $T_0$.
4. Définir le décrément logarithmique $\\delta$ et donner son expression en fonction de $R$, $L$ et $T$.`,
    correction: `**1. Équation différentielle en charge $q(t)$ :**
Loi des mailles : $u_C + u_L = 0$ avec $u_C = \\frac{q}{C}$ et $u_L = L\\frac{di}{dt} + Ri$.
Comme $i = \\frac{dq}{dt}$, on a $\\frac{di}{dt} = \\frac{d^2q}{dt^2}$.
$$L\\frac{d^2q}{dt^2} + R\\frac{dq}{dt} + \\frac{1}{C}q = 0 \\iff \\frac{d^2q}{dt^2} + \\frac{R}{L}\\frac{dq}{dt} + \\frac{1}{LC}q = 0$$

**2. Les 3 régimes d'oscillations libres :**
* **Régime pseudo-périodique :** $R < 2\\sqrt{\\frac{L}{C}}$ (résistance faible). La charge oscille avec une amplitude qui décroît exponentiellement.
* **Régime critique :** $R = R_c = 2\\sqrt{\\frac{L}{C}}$. Le système revient à l'équilibre le plus rapidement possible sans aucune oscillation.
* **Régime apériodique :** $R > 2\\sqrt{\\frac{L}{C}}$ (forte dissipation). Retour lent à l'équilibre sans oscillation.

**3. Pseudo-période $T \\approx T_0$ :**
$$T_0 = 2\\pi \\sqrt{LC} = 2\\pi \\sqrt{0{,}10 \\times 10 \\times 10^{-6}} = 2\\pi \\times 10^{-3}\\text{ s} \\approx 6{,}28\\text{ ms}$$

**4. Décrément logarithmique $\\delta$ :**
Le décrément logarithmique mesure l'amortissement entre deux amplitudes maximales successives séparées d'une pseudo-période $T$ :
$$\\delta = \\ln\\left(\\frac{q(t)}{q(t + T)}\\right) = \\frac{R \\cdot T}{2L}$$`,
  },
  {
    id: 13,
    title: 'Annale Bac S2 Sénégal — Amines & Alkylation d\'Hofmann',
    source: 'Office du Baccalauréat Sénégal',
    sourceType: 'bac',
    theme: 'Chimie Organique : Caractère Nucléophile des Amines et Sels d\'Ammonium Quaternaire',
    category: 'chimie_organique',
    enonce: `On fait réagir l'éthylamine $\\text{CH}_3-\\text{CH}_2-\\text{NH}_2$ avec de l'iodométhane $\\text{CH}_3\\text{I}$ en excès selon la réaction d'alkylation d'Hofmann.
1. Expliquer pourquoi les amines possèdent des propriétés nucléophiles et basiques.
2. Écrire les équations des étapes successives d'alkylation menant au sel d'ammonium quaternaire.
3. Nommer chaque amine intermédiaire et le produit final.`,
    correction: `**1. Propriétés basiques et nucléophiles :**
L'atome d'azote de l'amine possède un **doublet électronique non liant**.
* Ce doublet peut capter un proton $\\text{H}^+$ : propriété de **base de Brønsted**.
* Ce doublet peut attaquer un carbone polarisé positivement (déficitaire en électrons) : propriété de **nucléophile de Lewis**.

**2. Étapes successives de la réaction d'Hofmann :**
* **Étape 1 (Amine secondaire) :**
  $$\\text{CH}_3\\text{CH}_2\\text{NH}_2 + \\text{CH}_3\\text{I} \\longrightarrow \\text{CH}_3\\text{CH}_2\\text{NH}(\\text{CH}_3) + \\text{HI}$$
  Produit : **N-méthyléthanamine** (amine secondaire).
* **Étape 2 (Amine tertiaire) :**
  $$\\text{CH}_3\\text{CH}_2\\text{NH}(\\text{CH}_3) + \\text{CH}_3\\text{I} \\longrightarrow \\text{CH}_3\\text{CH}_2\\text{N}(\\text{CH}_3)_2 + \\text{HI}$$
  Produit : **N,N-diméthyléthanamine** (amine tertiaire).
* **Étape 3 (Sel d'ammonium quaternaire) :**
  $$\\text{CH}_3\\text{CH}_2\\text{N}(\\text{CH}_3)_2 + \\text{CH}_3\\text{I} \\longrightarrow [\\text{CH}_3\\text{CH}_2\\text{N}(\\text{CH}_3)_3]^+\\text{I}^-$$
  Produit : **iodure d'éthyltriméthylammonium**.`,
  },
  {
    id: 14,
    title: 'Concours ESP Dakar — Fission Nucléaire de l\'Uranium 235 & Rendement',
    source: 'Concours ESP',
    sourceType: 'concours',
    theme: 'Physique Nucléaire : Réaction Provoquée, Énergie Libérée et Puissance Électrique',
    category: 'optique_nucleaire',
    enonce: `Une centrale nucléaire utilise la fission de l'Uranium 235 provoquée par un neutron thermique :
$$_0^1\\text{n} + _{92}^{235}\\text{U} \\longrightarrow _{38}^{94}\\text{Sr} + _{54}^{140}\\text{Xe} + x\\;_0^1\\text{n}$$
Données : $m(_0^1\\text{n}) = 1{,}0087\\text{ u}$ ; $m(_{92}^{235}\\text{U}) = 234{,}9935\\text{ u}$ ; $m(_{38}^{94}\\text{Sr}) = 93{,}8945\\text{ u}$ ; $m(_{54}^{140}\\text{Xe}) = 139{,}8920\\text{ u}$ ; $1\\text{ u} = 931{,}5\\text{ MeV/}c^2$.

1. Déterminer le nombre $x$ de neutrons émis en appliquant les lois de conservation.
2. Calculer en $\\text{MeV}$ puis en Joules l'énergie $E_1$ libérée par la fission d'un seul noyau d'Uranium 235.
3. La centrale fournit une puissance électrique $\\mathcal{P}_{\\text{élec}} = 900\\text{ MW}$ avec un rendement $r = 33\\%$. Calculer le nombre de fissions par seconde nécessaires.`,
    correction: `**1. Nombre de neutrons émis :**
Conservation du nombre de masse $A$ : $1 + 235 = 94 + 140 + x \\times 1 \\implies 236 = 234 + x \\implies x = 2$.
Conservation du nombre de charge $Z$ : $0 + 92 = 38 + 54 + 0 = 92$ (vérifié). Il y a donc émission de **2 neutrons**.

**2. Énergie libérée par fission :**
$$\\Delta m = (m_{\\text{n}} + m_{\\text{U}}) - (m_{\\text{Sr}} + m_{\\text{Xe}} + 2m_{\\text{n}}) = m_{\\text{U}} - (m_{\\text{Sr}} + m_{\\text{Xe}} + m_{\\text{n}})$$
$$\\Delta m = 234{,}9935 - (93{,}8945 + 139{,}8920 + 1{,}0087) = 234{,}9935 - 234{,}7952 = +0{,}1983\\text{ u}$$
$$E_1 = 0{,}1983 \\times 931{,}5\\text{ MeV} \\approx 184{,}7\\text{ MeV} = 184{,}7 \\times 1{,}6 \\times 10^{-13}\\text{ J} \\approx 2{,}96 \\times 10^{-11}\\text{ J}$$

**3. Nombre de fissions par seconde :**
La puissance thermique totale requise est :
$$\\mathcal{P}_{\\text{th}} = \\frac{\\mathcal{P}_{\\text{élec}}}{r} = \\frac{900 \\times 10^6\\text{ W}}{0{,}33} \\approx 2{,}73 \\times 10^9\\text{ W}$$
Le nombre de fissions par seconde est :
$$N_{\\text{fiss}} = \\frac{\\mathcal{P}_{\\text{th}}}{E_1} = \\frac{2{,}73 \\times 10^9}{2{,}96 \\times 10^{-11}} \\approx 9{,}22 \\times 10^{19}\\text{ fissions/s}$$`,
  },
  {
    id: 15,
    title: 'Lycée Blaise Diagne — Cinétique Chimique & Temps de Demi-réaction',
    source: 'Lycée Blaise Diagne',
    sourceType: 'lycee',
    theme: 'Cinétique Chimique : Vitesse Volumique de Disparition et Méthode Graphique',
    category: 'chimie_aqueuse',
    enonce: `On étudie la décomposition de l'eau oxygénée $\\text{H}_2\\text{O}_2$ en solution aqueuse :
$$2\\,\\text{H}_2\\text{O}_2 \\longrightarrow 2\\,\\text{H}_2\\text{O} + \\text{O}_2\\text{(g)}$$
1. Définir la vitesse volumique de disparition de l'eau oxygénée à un instant $t$.
2. Comment cette vitesse se détermine-t-elle graphiquement à partir de la courbe $[\\text{H}_2\\text{O}_2] = f(t)$ ?
3. Définir le temps de demi-réaction $t_{1/2}$ et expliquer comment le relever graphiquement.`,
    correction: `**1. Vitesse volumique de disparition :**
La vitesse volumique de disparition de $\\text{H}_2\\text{O}_2$ à l'instant $t$ est égale à l'opposé de la dérivée par rapport au temps de sa concentration :
$$v_{\\text{disp}}(\\text{H}_2\\text{O}_2) = -\\frac{d[\\text{H}_2\\text{O}_2]}{dt}$$

**2. Détermination graphique :**
Sur la courbe $[\\text{H}_2\\text{O}_2] = f(t)$, la vitesse volumique de disparition à l'instant $t_1$ est égale à **l'opposé du coefficient directeur de la tangente** à la courbe au point d'abscisse $t_1$.
Comme la pente de la tangente diminue au fur et à mesure que la concentration en réactif décroît, la vitesse volumique diminue au cours du temps.

**3. Temps de demi-réaction $t_{1/2}$ :**
C'est la durée au bout de laquelle l'avancement de la réaction atteint la moitié de sa valeur finale :
$$x(t_{1/2}) = \\frac{x_f}{2}$$
Pour une réaction totale où $\\text{H}_2\\text{O}_2$ est le seul réactif limitant :
$$[\\text{H}_2\\text{O}_2]_{t_{1/2}} = \\frac{[\\text{H}_2\\text{O}_2]_0}{2}$$
Graphiquement, on repère la moitié de la concentration initiale sur l'axe des ordonnées et on lit l'abscisse correspondante $t_{1/2}$.`,
  },
  {
    id: 16,
    title: 'Concours EPT Thiès — Spectrographe de Masse & Séparation Isotopique',
    source: 'Concours EPT',
    sourceType: 'concours',
    theme: 'Champs Électrique et Magnétique : Trajectoire Circulaire dans un Spectrographe',
    category: 'mecanique',
    enonce: `Des ions magnésium $^{24}\\text{Mg}^{2+}$ et $^{26}\\text{Mg}^{2+}$ de charge $q = +2e$ sont accélérés par une tension $U_0 = 1000\\text{ V}$, puis pénètrent orthogonalement dans une chambre de déviation où règne un champ magnétique uniforme $\\vec{B}$ de norme $B = 0{,}20\\text{ T}$.
1. Exprimer la vitesse $v$ d'un ion à l'entrée de la chambre de déviation en fonction de $q$, $U_0$ et de sa masse $m$.
2. Montrer que la trajectoire dans la chambre magnétique est circulaire et uniforme de rayon $R = \\frac{mv}{qB}$.
3. Calculer la distance $d$ séparant les deux points d'impact sur la plaque photographique.`,
    correction: `**1. Vitesse d'accélération :**
Par le théorème de l'énergie cinétique entre les plaques accélératrices :
$$\\frac{1}{2} m v^2 - 0 = q U_0 \\implies v = \\sqrt{\\frac{2 q U_0}{m}}$$

**2. Trajectoire circulaire dans $\\vec{B}$ :**
La force magnétique $\\vec{F} = q \\vec{v} \\wedge \\vec{B}$ est orthogonale à $\\vec{v}$ à chaque instant, donc son travail est nul : la vitesse reste constante en norme (**mouvement uniforme**).
D'après la deuxième loi de Newton projetée sur la base de Frenet :
$$q v B = m \\frac{v^2}{R} \\implies R = \\frac{m v}{q B}$$
En remplaçant $v$ :
$$R = \\frac{m}{q B} \\sqrt{\\frac{2 q U_0}{m}} = \\frac{1}{B} \\sqrt{\\frac{2 m U_0}{q}}$$

**3. Séparation des impacts :**
Chaque faisceau décrit un demi-cercle et frappe la plaque à une distance du point d'entrée égale au diamètre $D = 2R$.
La distance entre les deux points d'impact vaut :
$$d = 2 |R_2 - R_1| = \\frac{2}{B} \\sqrt{\\frac{2 U_0}{2e}} \\left(\\sqrt{m_2} - \\sqrt{m_1}\\right)$$
Elle permet de séparer précisément les isotopes selon leur masse.`,
  },
  {
    id: 17,
    title: 'Annale Bac S2 Sénégal — Interférences Lumineuses d\'Young',
    source: 'Office du Baccalauréat Sénégal',
    sourceType: 'bac',
    theme: 'Optique Ondulatoire : Fentes d\'Young, Interfrange et Déplacement de Franges',
    category: 'optique_nucleaire',
    enonce: `Dans un dispositif des fentes d'Young, la distance entre les deux fentes est $a = 0{,}50\\text{ mm}$ et la distance de ces fentes à l'écran est $D = 2{,}0\\text{ m}$. On utilise une lumière monochromatique.
La distance mesurée entre 5 franges brillantes consécutives est $d = 10{,}0\\text{ mm}$.
1. Donner la définition de l'interfrange $i$ et calculer sa valeur numérique.
2. Déterminer la longueur d'onde $\\lambda$ de la radiation lumineuse.
3. Quelle est la nature de la frange centrale ? Que devient la figure d'interférences si l'on éclaire en lumière blanche ?`,
    correction: `**1. Définition et calcul de l'interfrange $i$ :**
L'interfrange $i$ est la distance séparant les centres de deux franges consécutives de même nature (deux franges brillantes ou deux franges sombres successives).
La distance entre 5 franges brillantes consécutives correspond à $4$ interfranges ($4i$) :
$$4i = 10{,}0\\text{ mm} \\implies i = \\frac{10{,}0}{4} = 2{,}50\\text{ mm} = 2{,}50 \\times 10^{-3}\\text{ m}$$

**2. Longueur d'onde $\\lambda$ :**
La formule fondamentale des interférences à deux ondes est :
$$i = \\frac{\\lambda D}{a} \\implies \\lambda = \\frac{a \\cdot i}{D}$$
$$\\lambda = \\frac{0{,}50 \\times 10^{-3} \\times 2{,}50 \\times 10^{-3}}{2{,}0} = 6{,}25 \\times 10^{-7}\\text{ m} = 625\\text{ nm}$$
Il s'agit d'une radiation lumineuse visible de couleur rouge-orangée.

**3. Lumière blanche :**
* La frange centrale correspond à une différence de marche nulle $\\delta = 0$ pour toutes les longueurs d'onde : elle est donc rigoureusement **blanche**.
* De part et d'autre, les interfranges dépendant de $\\lambda$ ($i_{\\text{rouge}} > i_{\\text{bleu}}$), les couleurs se séparent pour former des **spectres cannelés (irisés)** bordés de bleu à l'intérieur et de rouge à l'extérieur.`,
  },
  {
    id: 18,
    title: 'Manuel CIAM (Terminale S) — Acides Aminés & Stéréochimie',
    source: 'Manuels CIAM',
    sourceType: 'ciam',
    theme: 'Chimie Organique : Carbone Asymétrique, Forme Zwitterionique et Dipeptide',
    category: 'chimie_organique',
    enonce: `L'alanine (acide 2-aminopropanoïque) a pour formule $\\text{CH}_3-\\text{CH}(\\text{NH}_2)-\\text{COOH}$.
1. Justifier la chiralité de la molécule d'alanine et représenter ses deux énantiomères en projection de Fischer.
2. Écrire la formule de l'amphion (zwitterion) de l'alanine et expliquer son caractère amphotère.
3. Écrire l'équation de condensation entre deux molécules d'alanine conduisant au dipeptide Ala-Ala. Encadrer la liaison peptidique.`,
    correction: `**1. Chiralité et énantiomères :**
Le carbone 2 est lié à 4 substituants distincts : $-\\text{H}$, $-\\text{CH}_3$, $-\\text{NH}_2$, $-\\text{COOH}$. C'est un **carbone asymétrique** noté $\\text{C}^*$. La molécule est donc chirale et existe sous deux formes énantiomères non superposables (séries D et L de Fischer).

**2. Forme zwitterionique (amphion) :**
$$\\text{CH}_3-\\text{CH}(\\text{NH}_3^+)-\\text{COO}^-$$
Elle possède simultanément un site acide ($-\\text{NH}_3^+$ capable de céder un proton) et un site basique ($-\\text{COO}^-$ capable de capter un proton). C'est une espèce **amphotère**.

**3. Condensation et liaison peptidique :**
$$2\\;\\text{CH}_3\\text{CH}(\\text{NH}_2)\\text{COOH} \\longrightarrow \\text{CH}_3\\text{CH}(\\text{NH}_2)-\\mathbf{CO-NH}-\\text{CH}(\\text{CH}_3)\\text{COOH} + \\text{H}_2\\text{O}$$
Le groupement **$-\\text{CO}-\\text{NH}-$** constitue la liaison peptidique.`,
  },
  {
    id: 19,
    title: 'Lycée Limamou Laye — Pendule Élastique Vertical & Allongement Statique',
    source: 'Lycée Seydina Limamou Laye',
    sourceType: 'lycee',
    theme: 'Oscillations Mécaniques : Allongement Statique $\\Delta l_0$ et Période Propre',
    category: 'mecanique',
    enonce: `Un ressort de raideur $k = 50\\text{ N/m}$ est suspendu verticalement. On y accroche un solide de masse $m = 200\\text{ g}$. À l'équilibre, le ressort s'allonge de $\\Delta l_0$.
1. Calculer l'allongement à l'équilibre $\\Delta l_0$.
2. Établir l'équation différentielle du mouvement autour de la position d'équilibre.
3. Exprimer la période propre $T_0$ en fonction de $\\Delta l_0$ et $g$, puis calculer sa valeur.`,
    correction: `**1. Allongement statique $\\Delta l_0$ :**
À l'équilibre, le poids compense la tension du ressort :
$$P = T_0 \\implies m g = k \\Delta l_0 \\implies \\Delta l_0 = \\frac{m g}{k}$$
$$\\Delta l_0 = \\frac{0{,}200 \\times 9{,}8}{50} = 0{,}0392\\text{ m} = 3{,}92\\text{ cm}$$

**2. Équation différentielle :**
En prenant l'origine $O$ à la position d'équilibre avec l'axe $(Oz)$ orienté vers le bas :
$$m g - k (\\Delta l_0 + z) = m \\ddot{z}$$
Comme $m g - k \\Delta l_0 = 0$, il reste directement :
$$m \\ddot{z} + k z = 0 \\iff \\ddot{z} + \\frac{k}{m} z = 0$$

**3. Période propre :**
Comme $\\frac{k}{m} = \\frac{g}{\\Delta l_0}$, on a :
$$T_0 = 2\\pi \\sqrt{\\frac{m}{k}} = 2\\pi \\sqrt{\\frac{\\Delta l_0}{g}} = 2\\pi \\sqrt{\\frac{0{,}0392}{9{,}8}} = 2\\pi \\times 0{,}06325 \\approx 0{,}397\\text{ s}$$`,
  },
  {
    id: 20,
    title: 'Annale Bac S2 Sénégal — Saponification des Corps Gras (Savons)',
    source: 'Office du Baccalauréat Sénégal',
    sourceType: 'bac',
    theme: 'Chimie Organique : Hydrolyse Basique d\'un Triglycéride et Relargage',
    category: 'chimie_organique',
    enonce: `On chauffe à reflux un mélange d'oléine (trioléate de glycéryle) de masse $m = 88{,}4\\text{ g}$ avec un excès d'hydroxyde de sodium.
1. Écrire l'équation de la réaction de saponification.
2. Citer les caractéristiques majeures de la saponification (contrairement à l'estérification).
3. Pourquoi ajoute-t-on une solution saturée de chlorure de sodium (eau salée) en fin d'opération ? Comment se nomme cette étape ?
4. Calculer la masse maximale de savon (oléate de sodium) que l'on peut théoriquement recueillir.`,
    correction: `**1. Équation de la réaction :**
$$\\text{C}_{57}\\text{H}_{104}\\text{O}_6 + 3\\;(\\text{Na}^+ + \\text{HO}^-) \\longrightarrow \\text{C}_3\\text{H}_5(\\text{OH})_3 + 3\\;\\text{C}_{17}\\text{H}_{33}\\text{COO}^-\\text{Na}^+$$
(Triglycéride + 3 Soude $\\longrightarrow$ Glycérol + 3 Savon).

**2. Caractéristiques :**
La saponification est une réaction **totale** et **rapide à chaud** (non inversible).

**3. Étape de relargage :**
L'addition d'eau salée saturée diminue la solubilité du savon dans l'eau : le savon précipite sous forme solide surnageant. Cette opération s'appelle le **relargage**.

**4. Masse de savon :**
Masse molaire de l'oléine : $M = 884\\text{ g/mol}$.
$n = \\frac{88{,}4}{884} = 0{,}10\\text{ mol}$.
D'après la stœchiométrie : $n_{\\text{savon}} = 3 \\times 0{,}10 = 0{,}30\\text{ mol}$.
Masse molaire du savon (oléate de sodium $\\text{C}_{17}\\text{H}_{33}\\text{COONa}$) : $M_{\\text{savon}} = 304\\text{ g/mol}$.
$$m_{\\text{savon}} = 0{,}30 \\times 304 = 91{,}2\\text{ g}$$`,
  },
  {
    id: 21,
    title: 'Concours ESP Dakar — Rails de Laplace & Conversion Électromécanique',
    source: 'Concours ESP',
    sourceType: 'concours',
    theme: 'Induction & Forces de Laplace : Mouvement d\'une Tige sur Rails dans un Champ B',
    category: 'electricite',
    enonce: `Une tige conductrice de longueur utile $L = 10\\text{ cm}$ et de masse $m = 20\\text{ g}$ glisse sans frottement sur deux rails horizontaux distants de $L$, placés dans un champ magnétique vertical uniforme $B = 0{,}50\\text{ T}$. Un courant constant $I = 2{,}0\\text{ A}$ traverse la tige.
1. Calculer la force de Laplace $\\vec{F}_L$ exercée sur la tige et préciser sa direction.
2. Déterminer l'accélération $a$ de la tige.
3. Calculer la vitesse acquise par la tige après une distance parcourue de $d = 25\\text{ cm}$.`,
    correction: `**1. Force de Laplace :**
$$\\vec{F}_L = I (\\vec{L} \\wedge \\vec{B})$$
Comme $\\vec{L}$ et $\\vec{B}$ sont orthogonaux :
$$F_L = I L B = 2{,}0 \\times 0{,}10 \\times 0{,}50 = 0{,}10\\text{ N}$$
La direction est parallèle aux rails, de sens donné par la règle de la main droite.

**2. Accélération de la tige :**
D'après la deuxième loi de Newton :
$$a = \\frac{F_L}{m} = \\frac{0{,}10}{0{,}020} = 5{,}0\\text{ m/s}^2$$
Le mouvement est **rectiligne uniformément varié (MRUV)**.

**3. Vitesse acquise :**
D'après la relation indépendante du temps (Torricelli) :
$$v^2 - v_0^2 = 2 a d \\implies v = \\sqrt{2 a d} = \\sqrt{2 \\times 5{,}0 \\times 0{,}25} = \\sqrt{2{,}5} \\approx 1{,}58\\text{ m/s}$$`,
  },
  {
    id: 22,
    title: 'Lycée Thiaroye — Solution Tampon & Résistance aux Variations de pH',
    source: 'Compositions Nationales',
    sourceType: 'lycee',
    theme: 'Solutions Aqueuses : Préparation d\'une Solution Tampon et Propriétés',
    category: 'chimie_aqueuse',
    enonce: `On souhaite préparer $V = 100\\text{ mL}$ d'une solution tampon de $\\text{pH} = 4{,}75$ à partir d'une solution d'acide éthanoïque à $0{,}10\\text{ mol/L}$ et d'éthanoate de sodium à $0{,}10\\text{ mol/L}$. Le $\\text{p}K_a$ du couple est $4{,}75$.
1. Quels volumes de chacune des deux solutions doit-on mélanger ?
2. Décrire le comportement de cette solution si on y ajoute $1\\text{ mL}$ d'acide chlorhydrique à $0{,}1\\text{ mol/L}$.`,
    correction: `**1. Volumes à mélanger :**
$$\\text{pH} = \\text{p}K_a + \\log\\left(\\frac{[\\text{Base}]}{[\\text{Acide}]}\\right)$$
Comme $\\text{pH} = \\text{p}K_a = 4{,}75$, on a $\\log\\left(\\frac{[\\text{Base}]}{[\\text{Acide}]}\\right) = 0 \\implies [\\text{Base}] = [\\text{Acide}]$.
Comme les deux solutions mères ont la même concentration ($0{,}10\\text{ mol/L}$), il faut des volumes égaux :
$$V_{\\text{acide}} = V_{\\text{base}} = \\frac{100\\text{ mL}}{2} = 50\\text{ mL}$$

**2. Comportement lors de l'ajout d'acide fort :**
Les ions $\\text{H}_3\\text{O}^+$ ajoutés réagissent quasi totalement avec la base conjuguée présente :
$$\\text{CH}_3\\text{COO}^- + \\text{H}_3\\text{O}^+ \\longrightarrow \\text{CH}_3\\text{COOH} + \\text{H}_2\\text{O}$$
Le pH ne subit qu'une variation extrêmement faible (effet tampon).`,
  },
  {
    id: 23,
    title: 'Annale Bac S2 Sénégal — Déviation Électrostatique entre Plaques Parallèles',
    source: 'Office du Baccalauréat Sénégal',
    sourceType: 'bac',
    theme: 'Particules Chargées dans un Champ Électrique Uniforme (Déflexion)',
    category: 'mecanique',
    enonce: `Un faisceau d'électrons pénètre à vitesse $v_0 = 10^7\\text{ m/s}$ entre deux plaques parallèles de longueur $L = 5{,}0\\text{ cm}$ séparées d'une distance $d = 2{,}0\\text{ cm}$, soumises à une tension $U = 100\\text{ V}$.
1. Donner l'expression du champ électrique $\\vec{E}$ entre les plaques.
2. Établir l'équation de la trajectoire de l'électron.
3. Calculer la déviation verticale $y_S$ à la sortie des plaques.`,
    correction: `**1. Champ électrique uniforme :**
$$E = \\frac{U}{d} = \\frac{100}{0{,}020} = 5\\,000\\text{ V/m}$$

**2. Équation de la trajectoire :**
$$\\vec{a} = -\\frac{e}{m} \\vec{E} = \\frac{e E}{m} \\vec{j}$$
$$x(t) = v_0 t \\implies t = \\frac{x}{v_0}$$
$$y(x) = \\frac{e E}{2 m v_0^2} x^2$$

**3. Déviation à la sortie ($x = L$) :**
$$y_S = \\frac{1{,}6 \\times 10^{-19} \\times 5\\,000 \\times (0{,}05)^2}{2 \\times 9{,}1 \\times 10^{-31} \\times 10^{14}} = \\frac{2{,}0 \\times 10^{-18}}{1{,}82 \\times 10^{-16}} \\approx 0{,}011\\text{ m} = 1{,}1\\text{ cm}$$
Comme $y_S = 1{,}1\\text{ cm} < \\frac{d}{2} = 1{,}0\\text{ cm}$ ? Attention : si $y_S > 1{,}0\\text{ cm}$, le faisceau heurterait la plaque supérieure. Ici $y_S \\approx 1{,}1\\text{ cm}$ montre l'importance de dimensionner la tension pour éviter l'impact.`,
  },
  {
    id: 24,
    title: 'Concours EPT Thiès — Courbe d\'Aston & Énergie de Liaison par Nucléon',
    source: 'Concours EPT',
    sourceType: 'concours',
    theme: 'Physique Nucléaire : Stabilité des Noyaux, Fission et Fusion',
    category: 'optique_nucleaire',
    enonce: `1. Définir l'énergie de liaison $E_l$ d'un noyau et l'énergie de liaison par nucléon $E_l/A$.
2. Rappeler l'allure de la courbe d'Aston et indiquer où se situent les noyaux les plus stables du tableau périodique.
3. Expliquer, à l'aide de cette courbe, pourquoi la fusion concerne les noyaux très légers tandis que la fission concerne les noyaux très lourds.`,
    correction: `**1. Énergie de liaison et stabilité :**
* L'énergie de liaison $E_l = \\Delta m \\cdot c^2 = [Z m_p + (A - Z) m_n - M_{\\text{noyau}}] c^2$ est l'énergie qu'il faut fournir au noyau au repos pour le dissocier en ses nucléons constitutifs isolés.
* La stabilité d'un noyau est mesurée par son **énergie de liaison par nucléon** $E_l/A$. Plus ce rapport est grand, plus le noyau est stable.

**2. Courbe d'Aston :**
La courbe d'Aston représente $-E_l/A$ en fonction de $A$ (ou directement $E_l/A$). Les noyaux les plus stables se situent dans la région médiane ($50 < A < 70$, notamment le Fer 56 avec $\\approx 8{,}8\\text{ MeV/nucléon}$).

**3. Fission vs Fusion :**
* Pour les **noyaux légers** ($A < 20$) : leur fusion produit un noyau plus lourd situé plus près de la zone de stabilité maximale, libérant une quantité gigantesque d'énergie.
* Pour les **noyaux très lourds** ($A > 200$) : leur cassure (fission) en deux fragments médians plus stables dégage également de l'énergie.`,
  },
  {
    id: 25,
    title: 'Manuel CIAM (Terminale S) — Dosage Acide Fort / Base Forte & Méthode des Tangentes',
    source: 'Manuels CIAM',
    sourceType: 'ciam',
    theme: 'Chimie Aqueuse : Titrage pH-métrique et Choix d\'un Indicateur Coloré',
    category: 'chimie_aqueuse',
    enonce: `On dose $V_A = 20\\text{ mL}$ d'acide chlorhydrique par de la soude à $0{,}10\\text{ mol/L}$. Le volume équivalent est $V_{BE} = 12{,}5\\text{ mL}$.
1. Donner la valeur du pH à l'équivalence à $25^\\circ\\text{C}$ et justifier.
2. Choisir l'indicateur coloré approprié parmi : Hélianthine (zone 3,1-4,4), BBT (zone 6,0-7,6), Phénolphtaléine (zone 8,2-10,0).`,
    correction: `**1. pH à l'équivalence :**
À l'équivalence d'un titrage fort-fort, les seuls ions présents en solution sont $\\text{Na}^+$ et $\\text{Cl}^-$, qui sont des ions indifférents (spectateurs). Le milieu est donc neutre :
$$\\text{pH}_E = 7{,}0\\quad (\\text{à } 25^\\circ\\text{C})$$

**2. Choix de l'indicateur coloré :**
Un indicateur coloré convient si sa **zone de virage contient le pH à l'équivalence**.
Ici, $\\text{pH}_E = 7{,}0$ est inclus dans la zone de virage du **Bleu de Bromothymol (BBT)** $[6{,}0 - 7{,}6]$. Le BBT vire du jaune au bleu en passant par le vert à l'équivalence.`,
  },
  {
    id: 26,
    title: 'Lycée Delafosse — Cinématique : Base de Frenet & Rayon de Courbure',
    source: 'Lycée Maurice Delafosse',
    sourceType: 'lycee',
    theme: 'Cinématique : Décomposition Intrinsèque de l\'Accélération (at et an)',
    category: 'mecanique',
    enonce: `Un mobile décrit une trajectoire plane. Dans la base de Frenet $(\\vec{u}_t, \\vec{u}_n)$, son accélération s'écrit $\\vec{a} = a_t \\vec{u}_t + a_n \\vec{u}_n$.
1. Rappeler les expressions de $a_t$ et $a_n$ en fonction de la vitesse $v$ et du rayon de courbure $\\rho$.
2. Que peut-on déduire si $a_t = 0$ ? Si $a_n = 0$ ?
3. Pour un mobile décrivant un cercle de rayon $R = 2{,}0\\text{ m}$ à vitesse constante $v = 4{,}0\\text{ m/s}$, calculer l'accélération normale.`,
    correction: `**1. Expressions dans le repère de Frenet :**
$$a_t = \\frac{dv}{dt} \\quad ; \\quad a_n = \\frac{v^2}{\\rho}$$

**2. Cas particuliers fondamentaux :**
* Si $a_t = 0 \\iff \\frac{dv}{dt} = 0 \\implies v = \\text{cste}$ : le mouvement est **uniforme**.
* Si $a_n = 0 \\iff \\frac{v^2}{\\rho} = 0 \\implies \\rho \\to \\infty$ : la trajectoire est **rectiligne**.

**3. Calcul numérique :**
Pour un mouvement circulaire uniforme (MCU) :
$$a_n = \\frac{v^2}{R} = \\frac{4{,}0^2}{2{,}0} = \\frac{16}{2{,}0} = 8{,}0\\text{ m/s}^2$$`,
  },
  {
    id: 27,
    title: 'Annale Bac S2 Sénégal — Bande Passante & Facteur de Qualité d\'un RLC',
    source: 'Office du Baccalauréat Sénégal',
    sourceType: 'bac',
    theme: 'Électricité : Bande Passante à -3 dB et Acuité de la Résonance',
    category: 'electricite',
    enonce: `Pour un circuit RLC série de résistance totale $R_t = 10\\;\\Omega$ et d'inductance $L = 0{,}20\\text{ H}$ :
1. Rappeler la formule de la largeur de la bande passante $\\Delta N$ à $-3\\text{ dB}$.
2. Calculer numériquement $\\Delta N$.
3. Comment évolue la sélectivité du circuit si on augmente la résistance $R_t$ ?`,
    correction: `**1. Formule de la bande passante :**
$$\\Delta N = N_2 - N_1 = \\frac{R_t}{2\\pi L}$$

**2. Application numérique :**
$$\\Delta N = \\frac{10}{2\\pi \\times 0{,}20} = \\frac{10}{1{,}2566} \\approx 7{,}96\\text{ Hz}$$

**3. Évolution de la sélectivité :**
Si $R_t$ augmente, la bande passante $\\Delta N$ s'élargit et le facteur de qualité $Q = \\frac{N_0}{\\Delta N}$ diminue : le pic de résonance s'aplatit et le circuit devient **moins sélectif**.`,
  },
  {
    id: 28,
    title: 'Manuel CIAM (Terminale S) — Chlorures d\'Acyle & Anhydrides d\'Acide',
    source: 'Manuels CIAM',
    sourceType: 'ciam',
    theme: 'Chimie Organique : Dérivés Réactifs d\'Acide et Synthèse Totale d\'Esters',
    category: 'chimie_organique',
    enonce: `1. Écrire la réaction entre le chlorure d'éthanoyle $\\text{CH}_3\\text{COCl}$ et l'éthanol.
2. Quels sont les deux avantages majeurs de cette méthode par rapport à l'estérification directe ?
3. Quel gaz s'échappe au cours de cette synthèse ?`,
    correction: `**1. Équation de la réaction :**
$$\\text{CH}_3\\text{COCl} + \\text{CH}_3\\text{CH}_2\\text{OH} \\longrightarrow \\text{CH}_3\\text{COOCH}_2\\text{CH}_3 + \\text{HCl}\\text{(g)}$$
(Chlorure d'éthanoyle + Éthanol $\\longrightarrow$ Éthanoate d'éthyle + Chlorure d'hydrogène).

**2. Avantages majeurs :**
* La réaction est **totale** (rendement de $100\\%$).
* La réaction est **rapide** et quasi instantanée, même à température ambiante sans catalyseur.

**3. Gaz formé :**
Il se dégage des vapeurs blanches piquantes de **chlorure d'hydrogène $\\text{HCl}$**.`,
  },
  {
    id: 29,
    title: 'Lycée Limamou Laye — Datation au Carbone 14 d\'un Échantillon Archéologique',
    source: 'Lycée Seydina Limamou Laye',
    sourceType: 'lycee',
    theme: 'Physique Nucléaire : Datation Radioactive et Décroissance du C-14',
    category: 'optique_nucleaire',
    enonce: `L'activité d'un gramme de carbone d'un fragment de charbon de bois prélevé dans un site préhistorique est $A = 3{,}5\\text{ Bq}$. Pour un gramme de bois vivant, elle est $A_0 = 14{,}0\\text{ Bq}$.
La demi-vie du carbone 14 est $T = 5\\,730\\text{ ans}$.
Calculer l'âge $t$ du fragment archéologique.`,
    correction: `D'après la loi de décroissance radioactive :
$$A(t) = A_0 e^{-\\lambda t} \\implies \\frac{A}{A_0} = e^{-\\lambda t} \\implies \\ln\\left(\\frac{A_0}{A}\\right) = \\lambda t$$
Or $\\lambda = \\frac{\\ln(2)}{T}$, d'où :
$$t = \\frac{T}{\\ln(2)} \\ln\\left(\\frac{A_0}{A}\\right)$$
Remarquons que $\\frac{A_0}{A} = \\frac{14{,}0}{3{,}5} = 4 = 2^2$.
$$t = 2 \\times T = 2 \\times 5\\,730\\text{ ans} = 11\\,460\\text{ ans}$$`,
  },
  {
    id: 30,
    title: 'Annale Bac S2 Sénégal — Deuxième Loi de Newton sur un Plan Incliné',
    source: 'Office du Baccalauréat Sénégal',
    sourceType: 'bac',
    theme: 'Dynamique Newtonienne : Plan Incliné avec Frottements Solides',
    category: 'mecanique',
    enonce: `Un mobile de masse $m = 500\\text{ g}$ glisse le long d'un plan incliné d'un angle $\\alpha = 30^\\circ$ sur l'horizontale. Il subit une force de frottement constante $f = 1{,}0\\text{ N}$. On prend $g = 9{,}8\\text{ m/s}^2$.
1. Faire l'inventaire des forces et le schéma vectoriel.
2. Établir l'expression littérale de l'accélération $a$ du solide.
3. Calculer sa valeur numérique.`,
    correction: `**1. Bilan des forces :**
* Le poids $\\vec{P} = m\\vec{g}$
* La réaction normale du support $\\vec{R}_N$ (perpendiculaire au plan)
* La force de frottement solide $\\vec{f}$ (parallèle au plan, opposée au mouvement).

**2. Expression de l'accélération :**
Deuxième loi de Newton : $\\vec{P} + \\vec{R}_N + \\vec{f} = m \\vec{a}$.
En projetant sur l'axe $(Ox)$ parallèle au plan incliné orienté vers le bas :
$$m g \\sin\\alpha - f = m a \\implies a = g \\sin\\alpha - \\frac{f}{m}$$

**3. Application numérique :**
$$a = 9{,}8 \\times \\sin(30^\\circ) - \\frac{1{,}0}{0{,}500} = 4{,}9 - 2{,}0 = 2{,}9\\text{ m/s}^2$$`,
  },
];

export interface PCRecueilEpreuvesProps {
  isSubscribed?: boolean;
}

export default function PCRecueilEpreuves({ isSubscribed = false }: PCRecueilEpreuvesProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'mecanique' | 'electricite' | 'optique_nucleaire' | 'chimie_organique' | 'chimie_aqueuse'
  >('all');
  const [selectedSourceType, setSelectedSourceType] = useState<'all' | 'bac' | 'lycee' | 'ciam' | 'concours'>('all');
  const [expandedIds, setExpandedIds] = useState<Set<number>>(new Set([1, 2, 3]));

  // Calcul dynamique des statistiques de répartition
  const categoryCounts = useMemo(() => {
    const counts = {
      all: PC_RECUEIL_30_EPREUVES.length,
      mecanique: 0,
      electricite: 0,
      optique_nucleaire: 0,
      chimie_organique: 0,
      chimie_aqueuse: 0,
    };
    for (const ep of PC_RECUEIL_30_EPREUVES) {
      if ((ep.category as any) in counts) {
        counts[ep.category as keyof typeof counts]++;
      }
    }
    return counts;
  }, []);

  const sourceCounts = useMemo(() => {
    const counts = { all: PC_RECUEIL_30_EPREUVES.length, bac: 0, lycee: 0, ciam: 0, concours: 0 };
    for (const ep of PC_RECUEIL_30_EPREUVES) {
      if ((ep.sourceType as any) in counts) {
        counts[ep.sourceType as keyof typeof counts]++;
      }
    }
    return counts;
  }, []);

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
    setExpandedIds(new Set(PC_RECUEIL_30_EPREUVES.map((e) => e.id)));
  };

  const collapseAll = () => {
    setExpandedIds(new Set());
  };

  const filteredEpreuves = useMemo(() => {
    return PC_RECUEIL_30_EPREUVES.filter((ep) => {
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
      {/* En-tête du Méga Recueil Physique-Chimie */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy/10 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-[11px] font-black uppercase tracking-widest text-turquoise">
              Référentiel National d&apos;Excellence • Sciences Physiques Terminale S2
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-navy mt-1 flex items-center gap-2">
            <Atom className="w-6 h-6 text-turquoise shrink-0" />
            <span>Grand Recueil : 30 Épreuves &amp; Corrigés Détaillés (Physique-Chimie)</span>
          </h2>
          <p className="text-xs text-navy/60 mt-1 max-w-2xl leading-relaxed">
            Sujets complets et corrigés pas à pas issus des <strong>Annales Officielles du Bac S2</strong>, du <strong>Lycée Limamou Laye</strong>, des <strong>Manuels CIAM</strong> et des <strong>Concours EPT / ESP</strong>.
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
              placeholder="Rechercher une notion (ex: Newton, RLC, radioactivité, ester, titrage, Wien, EPT...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-navy/10 text-xs font-medium text-navy placeholder:text-navy/40 focus:border-turquoise focus:outline-none shadow-sm"
            />
          </div>

          {/* Compteur de résultats */}
          <span className="text-xs font-black text-navy/60 bg-white px-3 py-2 rounded-xl border border-navy/10 whitespace-nowrap self-end sm:self-auto">
            {filteredEpreuves.length} épreuve{filteredEpreuves.length > 1 ? 's' : ''} sur {PC_RECUEIL_30_EPREUVES.length}
          </span>
        </div>

        {/* Boutons de Filtres Rapides : Domaines */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <span className="text-[11px] font-bold text-navy/50 mr-1 flex items-center gap-1">
            <Filter className="w-3 h-3" /> Domaine :
          </span>
          {[
            { id: 'all', label: `Tous les Domaines (${categoryCounts.all})` },
            { id: 'mecanique', label: `Mécanique (${categoryCounts.mecanique})` },
            { id: 'electricite', label: `Électricité (${categoryCounts.electricite})` },
            { id: 'optique_nucleaire', label: `Optique & Nucléaire (${categoryCounts.optique_nucleaire})` },
            { id: 'chimie_organique', label: `Chimie Organique (${categoryCounts.chimie_organique})` },
            { id: 'chimie_aqueuse', label: `Solutions Aqueuses (${categoryCounts.chimie_aqueuse})` },
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
            { id: 'all', label: `Toutes les sources (${sourceCounts.all})` },
            { id: 'bac', label: `Office du Bac (${sourceCounts.bac})` },
            { id: 'lycee', label: `Lycée Limamou Laye & Delafosse (${sourceCounts.lycee})` },
            { id: 'ciam', label: `Manuels CIAM (${sourceCounts.ciam})` },
            { id: 'concours', label: `Concours EPT / ESP (${sourceCounts.concours})` },
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

      {/* Liste des Épreuves */}
      <div className="space-y-4">
        {filteredEpreuves.length === 0 ? (
          <div className="text-center py-12 bg-surface/40 rounded-2xl border border-navy/5">
            <p className="text-sm font-bold text-navy">Aucune épreuve de Physique-Chimie ne correspond à votre recherche.</p>
            <p className="text-xs text-navy/50 mt-1">Essayez un autre mot-clé ou réinitialisez les filtres.</p>
          </div>
        ) : (
          filteredEpreuves.map((ep) => {
            const isExpanded = expandedIds.has(ep.id);
            const isFree = ep.id <= 3;
            const canViewCorrection = isFree || isSubscribed;

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

                        {isFree ? (
                          <span className="text-[9px] bg-turquoise/20 text-navy font-bold px-2 py-0.5 rounded-md">
                            Gratuit
                          </span>
                        ) : !isSubscribed ? (
                          <span className="text-[9px] bg-gold/20 text-navy font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5 text-navy" />
                            Abonnés
                          </span>
                        ) : null}
                      </div>

                      <h3 className="font-extrabold text-navy text-sm sm:text-base leading-snug">
                        {ep.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                    <span className="text-xs font-bold text-turquoise hidden sm:inline">
                      {isExpanded
                        ? 'Masquer la correction'
                        : canViewCorrection
                        ? 'Voir le corrigé'
                        : '🔒 Corrigé réservé'}
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

                {/* Corrigé Détaillé Dépliable ou Paywall Sécurisé */}
                {isExpanded && (
                  canViewCorrection ? (
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
                  ) : (
                    <div className="p-5 sm:p-6 bg-gradient-to-br from-navy/5 via-turquoise-light/15 to-surface border-t border-navy/10 space-y-3">
                      <div className="max-w-xl mx-auto text-center space-y-2.5 py-2">
                        <div className="w-10 h-10 rounded-2xl bg-navy text-gold flex items-center justify-center mx-auto shadow-sm">
                          <Lock className="w-5 h-5 text-amber-400" />
                        </div>
                        <h4 className="font-extrabold text-navy text-sm sm:text-base">
                          Correction réservée aux abonnés Al Muxtaar
                        </h4>
                        <p className="text-xs text-navy/70 leading-relaxed">
                          Les 3 premières épreuves sont offertes en libre accès. Pour accéder aux corrections rédigées pas à pas des <strong>30 épreuves intégrales</strong> de Physique-Chimie du Bac S2, Lycée Limamou Laye et Concours d&apos;excellence, activez votre abonnement.
                        </p>
                        <div className="pt-1">
                          <Link
                            href="/abonnement"
                            className="inline-flex items-center gap-2 bg-turquoise hover:bg-turquoise/90 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-sm transition-all"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                            <span>Débloquer les 30 corrigés détaillés de PC →</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
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
            <p className="font-extrabold text-sm">Conseil Méthodologique de l&apos;Équipe IGEF — Sciences Physiques</p>
            <p className="text-xs text-white/70 mt-0.5">
              Ces 30 épreuves couvrent l&apos;intégralité des chapitres de Chimie (C1 à C9) et de Physique (P1 à P10) du Baccalauréat S2 sénégalais. Rédigez toujours vos bilans de forces et unités en unités SI.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
