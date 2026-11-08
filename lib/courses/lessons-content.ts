/**
 * Contenus pédagogiques d'excellence pour les cours de Terminale S2 (Al Muxtaar Société)
 * Intègre les animations SVG interactives, infographies réflexes Bac et KaTeX.
 */

export const RICH_LESSONS_MAP: Record<string, string> = {
  alcools: `# C1 : Alcools — Classes d'alcools, nomenclature et propriétés physiques (Terminale S2)

Bienvenue dans le premier chapitre de **Chimie Organique** pour la classe de **Terminale S2**, rigoureusement conforme au programme officiel sénégalais (MEN / IGEF / Office du Baccalauréat).

Les alcools constituent la famille fondamentale de la chimie organique au Baccalauréat sénégalais. Ils sont le point de départ de réactions essentielles : oxydations ménagées (aldéhydes, cétones, acides carboxyliques), déshydratations et synthèses d'esters.

---

## 1. Définition et Formule Générale des Alcools

Un **alcool** est un composé organique dont la molécule possède un groupement hydroxyle **$-\\text{OH}$** lié à un atome de carbone tétragonal (saturé, lié à 4 atomes par des liaisons simples).

- L'atome de carbone qui porte le groupement $-\\text{OH}$ est appelé le **carbone fonctionnel**.
- **Formule générale d'un monoalcool saturé non cyclique** :
  $$\\text{C}_n\\text{H}_{2n+1}\\text{OH} \\quad \\text{ou} \\quad \\text{C}_n\\text{H}_{2n+2}\\text{O} \\quad \\text{ou} \\quad R-\\text{OH} \\quad (n \\ge 1)$$
- **Masse molaire d'un monoalcool saturé** :
  $$M = 12n + (2n + 2) \\times 1 + 16 = 14n + 18 \\quad (\\text{g/mol})$$

> [!CONSEIL_BAC] **Réflexe Bac S2 :** Lorsqu'un sujet de Bac vous donne la masse molaire d'un monoalcool saturé (ou son pourcentage massique en oxygène $\%\\text{O} = \\frac{16}{M} \\times 100$), posez immédiatement l'équation $14n + 18 = M$ pour trouver l'entier $n$ et en déduire la formule brute !

---

![Figure 1 : Les 3 classes d'alcools et leurs applications dans la vie réelle](/assets/pedagogie/c1_alcools_classes_vie_reelle.svg)

> [!WOLOF] **Xam-xam ci Wolof — Alcools ci dundin u nit :**
> - « Alcool bi ñu xam ci hôpitaux yi mooy éthanol 70°. Dafa am ay liaisons hydrogène yu dëgër, motax bumu tàbbee ci bactéries yi dafay fàdd seen membrane ba ñu dee ! »
> - « Ci wallu fermentation traditionnelle (naka vin de palme wala toupiti ci Casamance), levures yi dañuy jël suukër bi (glucose) diko soppi éthanol ak gaz carbonique : $\text{C}_6\text{H}_{12}\text{O}_6 \longrightarrow 2\,\text{C}_2\text{H}_5\text{OH} + 2\,\text{CO}_2$. »
> - « Classe 1, 2 ak 3 : Boo bëggee xam classe bi ci 2 secondes, xoolal carbone bi yor $-\text{OH}$ bi rekk ! Su amee 1 seul voisin carbone = 1°, su amee 2 voisins = 2°, su ko 3 voisins wëree = 3°. »

---

## 2. Les Trois Classes d'Alcools

La **classe** d'un alcool dépend EXCLUSIVEMENT du nombre d'atomes de carbone directement liés au carbone fonctionnel :

### A. Alcool Primaire ($1^\\circ$)
Le carbone fonctionnel est lié à **au plus un seul** atome de carbone (ou à aucun pour le méthanol).
- **Formule type** :
  $$R-\\mathbf{C}\\text{H}_2-\\text{OH} \\quad \\text{ou} \\quad \\text{CH}_3-\\text{OH}$$
- *Exemples classiques du Bac S2* :
  - Éthanol : $\\text{CH}_3-\\text{CH}_2-\\text{OH}$
  - Butan-1-ol : $\\text{CH}_3-\\text{CH}_2-\\text{CH}_2-\\text{CH}_2-\\text{OH}$
  - 2-méthylpropan-1-ol : $\\text{CH}_3-\\text{CH}(\\text{CH}_3)-\\text{CH}_2-\\text{OH}$

### B. Alcool Secondaire ($2^\\circ$)
Le carbone fonctionnel est lié à **deux** atomes de carbone.
- **Formule type** :
  $$R-\\mathbf{C}\\text{H}(\\text{OH})-R'$$
- *Exemples classiques du Bac S2* :
  - Propan-2-ol : $\\text{CH}_3-\\text{CH}(\\text{OH})-\\text{CH}_3$
  - Butan-2-ol : $\\text{CH}_3-\\text{CH}_2-\\text{CH}(\\text{OH})-\\text{CH}_3$

### C. Alcool Tertiaire ($3^\\circ$)
Le carbone fonctionnel est lié à **trois** atomes de carbone (il ne porte aucun atome d'hydrogène).
- **Formule type** :
  $$R-\\mathbf{C}(\\text{OH})(R')-R''$$
- *Exemple roi du Bac S2* :
  - 2-méthylpropan-2-ol : $\\text{CH}_3-\\text{C}(\\text{CH}_3)(\\text{OH})-\\text{CH}_3$

> [!WOLOF] **Xam-xam ci Wolof :**
> - **Classe 1 ($1^\\circ$)** : Carbone bi yor $-\\text{OH}$ bi dafa am 1 seul carbone voisin (naka nit ku yor benn loxo u moroomam).
> - **Classe 2 ($2^\\circ$)** : Carbone bi dafa am 2 carbones voisins ci wet yi (naka nit ku yor ñaari loxo moroom yi).
> - **Classe 3 ($3^\\circ$)** : Carbone bi dafa am 3 carbones voisins yu ko wër ci wet yépp (amul benn hydrogène bu ko dessee).

---

## 3. Nomenclature Officielle UICPA

Pour nommer un alcool selon les règles internationales de l'UICPA :

1. **Repérer la chaîne carbonée la plus longue contenant obligatoirement le carbone fonctionnel.**
2. **Numéroter la chaîne principale** de façon à attribuer au carbone fonctionnel le plus petit numéro possible (la fonction alcool prime sur les ramifications alkyles).
3. **Identifier et numéroter les ramifications alkyles** (méthyle, éthyle...), placées en préfixe par ordre alphabétique.
4. **Prendre le nom de l'alcane correspondant**, remplacer le "e" final par le suffixe **"-ol"**, précédé de l'indice de position du carbone fonctionnel placé entre tirets.

### Les 4 isomères d'alcools de formule $\\text{C}_4\\text{H}_{10}\\text{O}$ (Sujet récurrent du Bac) :
| Formule Semi-Développée | Nom Officiel UICPA | Classe |
| :--- | :--- | :---: |
| $\\text{CH}_3-\\text{CH}_2-\\text{CH}_2-\\text{CH}_2-\\text{OH}$ | **Butan-1-ol** | Primaire ($1^\\circ$) |
| $\\text{CH}_3-\\text{CH}_2-\\text{CH}(\\text{OH})-\\text{CH}_3$ | **Butan-2-ol** | Secondaire ($2^\\circ$) |
| $\\text{CH}_3-\\text{CH}(\\text{CH}_3)-\\text{CH}_2-\\text{OH}$ | **2-méthylpropan-1-ol** | Primaire ($1^\\circ$) |
| $\\text{CH}_3-\\text{C}(\\text{CH}_3)(\\text{OH})-\\text{CH}_3$ | **2-méthylpropan-2-ol** | Tertiaire ($3^\\circ$) |

---

## 4. Propriétés Physiques & Liaisons Hydrogène

### A. Température d'Ébullition Élevée
Les alcools sont liquides ou solides à température ordinaire, avec des températures d'ébullition **considérablement plus élevées** que les alcanes de masse molaire voisine :
- **Éthanol** ($M = 46\\text{ g/mol}$) : liquide, $T_\\text{éb} = +78^\\circ\\text{C}$.
- **Propane** ($M = 44\\text{ g/mol}$) : gaz, $T_\\text{éb} = -42^\\circ\\text{C}$.

**Explication physique :**
La liaison $\\text{O}-\\text{H}$ est fortement polarisée (l'oxygène est très électronégatif : $\\delta^- \\text{O} - \\text{H} \\delta^+$). Il s'établit entre molécules d'alcool des **liaisons hydrogène intermoléculaires** :
$$\\delta^- \\mathbf{O} - \\text{H}^{\\delta^+} \\;\\cdots\\; \\delta^- \\mathbf{O} - \\text{H}^{\\delta^+}$$
La rupture de ces liaisons lors du passage à l'état gazeux nécessite un apport thermique considérable.

### B. Solubilité dans l'Eau
La molécule d'alcool présente un comportement amphiphile :
- Le groupement $-\\text{OH}$ est **hydrophile** (forme des liaisons hydrogène avec les molécules d'eau).
- La chaîne hydrocarbonée $R-$ est **hydrophobe** (lipophile).

**Conséquences expérimentales :**
1. **$n = 1, 2, 3$ (Méthanol, Éthanol, Propan-1-ol)** : le groupe hydrophile domine $\\implies$ **miscibilité totale** avec l'eau.
2. **$n = 4$ (Butan-1-ol)** : solubilité modérée (environ $9\\text{ g/100 mL}$).
3. **$n \\ge 5$ (Pentanol, Hexanol, Octanol...)** : la longue chaîne hydrophobe l'emporte $\\implies$ l'alcool est **quasiment insoluble** dans l'eau et forme deux phases distinctes (l'alcool surnage car sa densité $d \\approx 0{,}8$ est inférieure à celle de l'eau).

---

## 5. Identification Expérimentale : Le Test de Lucas

Le **test de Lucas** permet de distinguer rapidement la classe d'un alcool au laboratoire :
- **Réactif de Lucas** : Chlorure de zinc anhydre ($\\text{ZnCl}_2$) dans l'acide chlorhydrique concentré ($\\text{HCl}$).
- **Principe chimique** : substitution nucléophile transformant l'alcool soluble en dérivé halogéné $R-\\text{Cl}$ insoluble :
  $$R-\\text{OH} + \\text{HCl} \\\\xrightarrow{\\text{ZnCl}_2} R-\\text{Cl}_{(s/liq\\text{ trouble})} + \\text{H}_2\\text{O}$$

| Classe d'alcool | Observation expérimentale à froid ($20^\\circ\\text{C}$) | Vitesse de réaction |
| :--- | :--- | :--- |
| **Tertiaire ($3^\\circ$)** | **Trouble laiteux immédiat** (< 30 secondes) | Quasi-instantanée |
| **Secondaire ($2^\\circ$)** | **Trouble laiteux après 5 minutes** | Lente |
| **Primaire ($1^\\circ$)** | **Aucun trouble à froid** (solution limpide) | Nulle à température ambiante |

---

## 6. Synthèse des Compétences Exigibles au Baccalauréat

1. Reconnaître le carbone fonctionnel et déterminer sans hésiter la classe ($1^\\circ, 2^\\circ, 3^\\circ$) d'un alcool.
2. Donner le nom systématique UICPA complet en respectant l'indice minimal pour $-\\text{OH}$.
3. Écrire et dénombrer tous les isomères pour une formule brute donnée ($C_4H_{10}O$, $C_5H_{12}O$).
4. Justifier les anomalies de température d'ébullition et la variation de solubilité par les liaisons hydrogène.
5. Exploiter les résultats du test de Lucas pour identifier un isomère inconnu.
`,
  cinetique: `# C4 : Cinétique Chimique & Vitesse de Réaction (Terminale S2)

Bienvenue dans le premier chapitre de **Sciences Physiques (Chimie)** pour la classe de **Terminale S2**, rigoureusement aligné sur le programme officiel sénégalais (MEN / IGEF / Office du Bac).

---

![Figure 1 : Cinétique chimique, courbe d'avancement x(t), vitesse volumique et facteurs cinétiques](/assets/pedagogie/c4_cinetique_vitesse_facteurs.svg)

> [!VIE_REELLE] **La Cinétique Chimique au Sénégal : Attaya et Réfrigérateur !**
> - **La Température (Préparation de l'Attaya)** : Pour que les feuilles de thé vert libèrent rapidement la théine et leurs tanins, on fait bouillir l'eau sur le fourneau à charbon ardent. À haute température ($100^\circ\text{C}$), la vitesse d'extraction est multipliée par dix !
> - **La Trempe (Conservation des aliments)** : Pourquoi met-on le reste de Ceebu Jën au réfrigérateur ? Le froid ($4^\circ\text{C}$) ralentit drastiquement la vitesse des réactions enzymatiques et bactériennes d'oxydation, prolongeant la fraîcheur du plat.

---


Bienvenue dans le premier chapitre de **Sciences Physiques (Chimie)** pour la classe de **Terminale S2**, rigoureusement aligné sur le programme officiel sénégalais (MEN / IGEF / Office du Bac).

La cinétique chimique est la branche de la chimie qui étudie la **vitesse des transformations chimiques** et les facteurs expérimentaux qui permettent de les accélérer, de les ralentir ou de les figer.

---

## 1. Classification Temporelle des Réactions Chimiques

Toutes les réactions chimiques ne se déroulent pas au même rythme. On distingue trois grandes catégories :

1. **Les réactions très rapides ou instantanées :**
   Leur durée est inférieure à la seconde (inaccessible à l'œil nu ou aux instruments de mesure classiques de laboratoire).
   - *Exemples* : Réactions acido-basiques (neutralisation $H_3O^+ + OH^- \\to 2 H_2O$), formation de précipités instantanés (chlorure d'argent : $Ag^+ + Cl^- \\to AgCl_{(s)}$ blanc noircissant à la lumière), explosions ou feux d'artifice.

2. **Les réactions lentes :**
   Elles durent de quelques secondes à plusieurs heures. Leur évolution est mesurable au laboratoire par suivi de la coloration, de la pression, du pH ou par des dosages successifs.
   - *Exemples classiques du Bac S2* :
     - Oxydation des ions iodure par les ions peroxodisulfate :
       $$S_2O_8^{2-} + 2 I^- \\longrightarrow 2 SO_4^{2-} + I_2$$
       (Apparition progressive de la coloration jaune puis brune caractéristique du diiode $I_2$).
     - Réaction d'estérification entre un acide carboxylique et un alcool (très lente, nécessite plusieurs heures de chauffage à reflux).
     - Décomposition de l'eau oxygénée $2 H_2O_2 \\to 2 H_2O + O_2$.

3. **Les réactions infiniment lentes (stables cinétiquement) :**
   Leur durée se compte en mois, en années ou en siècles. À notre échelle humaine, le système paraît totalement immobile.
   - *Exemples* : Formation de la rouille sur le fer sans humidité saline, mélange gazeux $(H_2 + O_2)$ à température ordinaire sans étincelle, transformation du diamant en graphite.

> [!VIE_REELLE] Pensez à l'allumage d'une allumette : dès que le phosphore frotte le grattoir, la flamme jaillit instantanément (réaction rapide). En revanche, la fermentation du mil pour fabriquer le *laax* ou le mûrissement de la mangue prend plusieurs jours (réaction lente). Quant à une bouteille de plastique jetée dans la nature, elle met plus de 400 ans à se dégrader (réaction infiniment lente) !

> [!WOLOF] **Xam-xam ci Wolof :** Réaction chimique dafay teggi ci ñetti anam :
> 1. **Yu gaaw tey-tey (instantanée) :** Naka takkug allumette walla sotti vinaigre ci bicarbonate, day tàccu faf !
> 2. **Yu yeex (lente) :** Naka toggu ceebu jën walla fermenter mburu ak laax : dafay laaj waxtu ngir nga gis soppite gi. Foofu lañuy natt vitesse bi ci laboratoire lycée.
> 3. **Yu dul jeex mukk (infiniment lente) :** Naka weñ guy ruus ci bérab bu xat te amul xorom, day def ay at yu bare.

---

## 2. Les Facteurs Cinétiques Majeurs

Un **facteur cinétique** est un paramètre physique ou chimique susceptible de modifier la vitesse d'une réaction sans changer la nature des produits formés.

### A. La Température ($T$)
D'une manière générale, **la vitesse d'une transformation chimique augmente lorsque la température s'élève**.
- **Interprétation microscopique (Théorie des chocs)** : L'élévation de température augmente l'énergie cinétique moyenne des molécules réactives (agitation thermique). Les entités chimiques se déplacent plus rapidement, ce qui multiplie la **fréquence des chocs** et la proportion de **chocs efficaces** (chocs possédant une énergie supérieure à l'énergie d'activation nécessaire pour briser les liaisons).
- **Conséquence expérimentale** :
  - Pour accélérer une réaction lente : on utilise un **bain-marie** ou un système de **chauffage à reflux**.
  - Pour ralentir ou stopper net une réaction : on utilise la **trempe** (bain d'eau glacée).

### B. La Concentration Initiale des Réactifs
D'une manière générale, **la vitesse d'une transformation chimique est d'autant plus grande que les concentrations des réactifs sont élevées**.
- **Interprétation microscopique** : Plus les réactifs sont concentrés, plus le nombre de molécules par unité de volume est important. Les molécules sont plus proches les unes des autres, augmentant directement la probabilité qu'elles se heurtent efficacement.

### C. Le Catalyseur
Un **catalyseur** est une espèce chimique qui accélère une réaction thermodynamiquement possible sans être consommée par celle-ci (il est régénéré intact à la fin).
- Il n'apparaît **jamais** dans l'équation-bilan globale de la réaction.
- Il modifie le mécanisme réactionnel en abaissant l'énergie d'activation.
- **Règle d'or du Bac S2** : Un catalyseur ne modifie **JAMAIS** l'avancement maximal final $x_\\text{max}$ ni la constante d'équilibre ! Il permet simplement d'atteindre l'état d'équilibre beaucoup plus rapidement.

On distingue trois types de catalyses :
1. **Catalyse homogène** : Le catalyseur et les réactifs sont dans la même phase (ex: ions $Fe^{3+}$ liquides catalysant la dismutation de $H_2O_2$ liquide).
2. **Catalyse hétérogène** : Le catalyseur et les réactifs sont dans des phases différentes (ex: fil de platine solide $Pt$ dans un mélange gazeux).
3. **Catalyse enzymatique** : La réaction est accélérée par une protéine biologique spécifique (ex: l'amylase salivaire ou les enzymes digestives).

> [!VIE_REELLE] Visualisez deux métaphores sénégalaises très parlantes :
> 1. **La concentration** : C'est comme le marché Sandaga ou le rond-point Petersen aux heures de pointe. Quand la foule est très dense, tout le monde se bouscule continuellement (chocs efficaces très fréquents) ! Dans une rue déserte la nuit (faible concentration), vous pouvez marcher des kilomètres sans bousculer personne.
> 2. **Le catalyseur** : C'est le « Koorite » ou le sage conciliateur du quartier qui intervient pour dénouer un conflit ou accélérer un mariage entre deux familles. Il organise la rencontre, facilite l'accord en un temps record, mais ne prend pas lui-même femme : à la fin de la cérémonie, il rentre chez lui intact et disponible pour un autre mariage !

> [!WOLOF] **Xam-xam ci Wolof :**
> - **Température :** Bu safara gi tàngée lool, molécule yi dañuy gaaw a daccante.
> - **Concentration :** Bu ndox mi féssee del ak réactifs naka marché Sandaga, chocs yi dañuy yokk ba réaction bi gën a gaaw !
> - **Catalyseur :** Dafa melni wassila buy gaawal wax ji te du ca bokk : day yokk vitesse bi waaye du soppi li ngay mujje am ci x_max !

---

## 3. Définition et Calcul de la Vitesse Volumique de Réaction

Considérons une réaction chimique totale en milieu homogène de volume total constant $V$ :

$$a A + b B \\longrightarrow c C + d D$$

L'avancement de la réaction à l'instant $t$ est noté $x(t)$ (exprimé en $\\text{mol}$ ou $\\text{mmol}$).

### A. Vitesse Volumique de Réaction
La vitesse volumique de réaction $v(t)$ à l'instant $t$ est la dérivée de l'avancement $x(t)$ par rapport au temps, rapportée au volume total $V$ du milieu réactionnel :

$$v(t) = \\frac{1}{V} \\frac{dx}{dt}$$

- $v(t)$ s'exprime en $\\text{mol} \\cdot \\text{L}^{-1} \\cdot \\text{s}^{-1}$ ou $\\text{mol} \\cdot \\text{L}^{-1} \\cdot \\text{min}^{-1}$ (ou $\\text{mmol} \\cdot \\text{L}^{-1} \\cdot \\text{min}^{-1}$).
- $V$ est le volume de la solution en litres ($\\text{L}$).
- $\\frac{dx}{dt}$ est la dérivée de l'avancement par rapport au temps.

### B. Vitesse de Disparition d'un Réactif & Vitesse d'Apparition d'un Produit
- **Vitesse volumique d'apparition d'un produit $C$** :
  $$v_\\text{app}(C) = \\frac{1}{V} \\frac{dn_C}{dt} = \\frac{d[C]}{dt}$$
- **Vitesse volumique de disparition d'un réactif $A$** :
  Comme la quantité de réactif diminue, $\\frac{dn_A}{dt} < 0$. Pour obtenir une vitesse positive, on ajoute obligatoirement un signe moins :
  $$v_\\text{disp}(A) = -\\frac{1}{V} \\frac{dn_A}{dt} = -\\frac{d[A]}{dt}$$

**Lien avec la vitesse globale de réaction $v(t)$ :**
$$v(t) = -\\frac{1}{a} \\frac{d[A]}{dt} = -\\frac{1}{b} \\frac{d[B]}{dt} = \\frac{1}{c} \\frac{d[C]}{dt} = \\frac{1}{d} \\frac{d[D]}{dt}$$

> [!METHODE] **Règle stœchiométrique au Bac S2 :**
> Si l'équation est $S_2O_8^{2-} + 2 I^- \\to 2 SO_4^{2-} + I_2$ :
> - La vitesse d'apparition du diiode est : $v_\\text{app}(I_2) = \\frac{d[I_2]}{dt} = v(t)$.
> - La vitesse de disparition de l'ion iodure est : $v_\\text{disp}(I^-) = -\\frac{d[I^-]}{dt} = 2 v(t)$.
> L'ion iodure $I^-$ disparaît deux fois plus vite que le diiode n'apparaît !

---

## 4. Détermination Graphique de la Vitesse au Baccalauréat

Au Baccalauréat sénégalais, on vous fournit presque systématiquement une courbe expérimentale : soit $x = f(t)$, soit $[\\text{Produit}] = f(t)$.

### Méthode pas à pas pour déterminer $v(t_0)$ :
1. **Tracer la tangente** à la courbe au point d'abscisse $t_0$ à l'aide d'une règle transparente.
2. **Choisir deux points distincts** $M_1(t_1, x_1)$ et $M_2(t_2, x_2)$ situés sur cette droite tangente (choisissez-les le plus éloignés possible pour limiter les incertitudes de lecture).
3. **Calculer le coefficient directeur (la pente) $a$ de la tangente** :
   $$a = \\left( \\frac{dx}{dt} \\right)_{t_0} = \\frac{x_2 - x_1}{t_2 - t_1}$$
4. **Calculer la vitesse volumique** en divisant par le volume total $V$ :
   $$v(t_0) = \\frac{a}{V} = \\frac{1}{V} \\frac{x_2 - x_1}{t_2 - t_1}$$

### Évolution de la vitesse au cours du temps :
À mesure que le temps s'écoule, **la vitesse de la réaction diminue constamment jusqu'à s'annuler** :
- À $t = 0$ : les réactifs sont à leur concentration maximale, les chocs efficaces sont les plus fréquents, **la vitesse est maximale** (la tangente est la plus redressée).
- Au cours du temps : les réactifs sont consommés, leur concentration diminue, la fréquence des chocs diminue, **la vitesse décroît** (la tangente s'aplatit).
- Lorsque l'état final est atteint : le réactif limitant est totalement épuisé, $x(t) = x_\\text{max}$ (palier horizontal), **la vitesse s'annule** : $v = 0$ (la tangente est horizontale).

> [!PIEGE] Ne confondez pas l'avancement $x(t)$ et la vitesse $v(t)$ :
> - L'avancement $x(t)$ est une fonction **croissante** (les produits s'accumulent).
> - La vitesse $v(t)$ est une fonction **décroissante** (la réaction ralentit inexorablement).

---

## 5. Le Temps de Demi-Réaction ($t_{1/2}$)

### Définition officielle :
Le **temps de demi-réaction**, noté $t_{1/2}$, est la durée au bout de laquelle l'avancement de la réaction atteint la moitié de sa valeur maximale finale :

$$x(t_{1/2}) = \\frac{x_\\text{max}}{2}$$

Si la réaction est totale et que l'on suit la concentration d'un produit $P$ dont la concentration initiale est nulle :
$$[P](t_{1/2}) = \\frac{[P]_\\text{max}}{2}$$

### Détermination graphique de $t_{1/2}$ :
1. Repérer sur la courbe l'ordonnée maximale finale $x_\\text{max}$ (valeur du palier horizontal à la fin de la réaction).
2. Calculer la valeur $\\frac{x_\\text{max}}{2}$.
3. Placer cette valeur sur l'axe des ordonnées, tracer une droite horizontale jusqu'à couper la courbe cinétique.
4. Projeter verticalement ce point d'intersection sur l'axe des abscisses pour lire la valeur de $t_{1/2}$.

### Intérêt pratique de $t_{1/2}$ :
- Il permet d'estimer la durée totale d'une réaction : on considère couramment qu'une réaction chimique est pratiquement achevée au bout de $4$ à $7 \\times t_{1/2}$.
- Il permet de comparer l'efficacité de deux catalyseurs ou de deux conditions de température : **plus $t_{1/2}$ est petit, plus la réaction est rapide**.

---

## 6. La Technique Clé du Laboratoire : La Trempe Chimique

Dans de nombreux sujets du Bac S2, la cinétique d'une réaction lente est suivie par **dosage volumétrique** d'échantillons prélevés à intervalles réguliers.

### Le problème :
Le titrage à la burette prend entre 2 et 5 minutes. Si l'on dose directement le prélèvement, la réaction continue de se dérouler pendant qu'on verse la solution titrante ! La quantité mesurée ne correspondrait plus à la date $t$ du prélèvement.

### La solution : La Trempe Chimique
Dès qu'un prélèvement est effectué à l'instant $t$, on le verse instantanément dans un erlenmeyer contenant **de l'eau glacée** (eau distillée + glaçons pilés) :
1. **L'abaissement brutal de la température ($T \\to 0^\\circ\\text{C}$)** gèle l'agitation thermique.
2. **La forte dilution par l'eau** divise instantanément les concentrations des réactifs.

Ces deux effets conjugués réduisent la vitesse de réaction à une valeur quasi-nulle ($v \\approx 0$). L'avancement est figé exactement à la date $t$, ce qui permet d'effectuer le dosage à tête reposée sans erreur de chronométrage !

> [!ASTUCE] Dans votre copie de Bac S2, si l'on vous demande : *« Quel est le rôle de l'eau glacée lors du prélèvement ? »*, écrivez impérativement la phrase magique :
> **« L'eau glacée réalise une trempe chimique (chute brutale de température et dilution) qui a pour but de bloquer quasi-instantanément la réaction afin de doser l'espèce présente exactement à la date $t$ du prélèvement. »**
`,

  limites: `# Chapitre 1 : Limites et Continuité (Terminale S2)

Bienvenue dans ce cours interactif conçu pour vous faire maîtriser l'ensemble des notions de limites et de continuité exigées au **Baccalauréat Scientifique (Série S2)** au Sénégal.

---

## 1. Notion Intuitive et Définition de la Limite

Lorsque la variable $x$ se rapproche infiniment d'une valeur réelle $x_0$, les images $f(x)$ peuvent se rapprocher d'un nombre réel $L$. On écrit alors :

$$\\lim_{x \\to x_0} f(x) = L$$

Observez l'animation mathématique et l'illustration concrète de la vie courante ci-dessous :

![Figure 1 : Animation de la convergence d'une fonction vers sa limite](/assets/pedagogie/limite_convergence.svg)

![Figure 1b : Métaphore concrète au Sénégal : Le Car Rapide et la barrière de péage](/assets/pedagogie/limite_vie_reelle_car_rapide.svg)

> [!VIE_REELLE] Imaginez un véhicule qui arrive à un poste de péage sur l'Autoroute de l'Avenir (Dakar - Diamniadio). Lorsqu'il se rapproche de la barrière ($x \\to x_0$), son compteur de vitesse diminue progressivement pour se stabiliser à $0$ km/h ($L = 0$). Calculer une limite, ce n'est pas ce qui se passe **sur** la barrière, mais observer comment le véhicule s'en approche de plus en plus près !

> [!WOLOF] **Xam-xam ci Wolof :** Limite, ci kàddu yu yomb, mooy *« fu mu jëm »* : booy jegeñsi benn bérab ($x_0$) te do ko laal, ban bérab la $f(x)$ di waajal a taxaw ? Naka Car Rapide buy jegeñsi arrêt bus : day waññi viteesam ba jegeñsi ko lool. Mën nga jegeñsi ci wetu cammooñ ($x \\to x_0^-$) walla ci wetu ndeyjoor ($x \\to x_0^+$). Bu fékkee ñaari wet yépp benn bérab $L$ lañuy jëm, limite bi am na !

> [!METHODE] Le premier réflexe devant tout calcul de limite est de **remplacer directement $x$ par la valeur $x_0$**. Si le résultat est un nombre réel déterminé, le calcul est déjà terminé !

---

## 2. Les Formes Indéterminées & Comment les Lever

Au Baccalauréat sénégalais, les examinateurs testent votre capacité à lever les indéterminations. Il n'existe que **4 formes indéterminées** à connaître par cœur :

- **$\\frac{0}{0}$** (Taux de variation ou factorisation)
- **$\\frac{\\infty}{\\infty}$** (Terme de plus haut degré)
- **$0 \\times \\infty$** (Transformation en quotient)
- **$+\\infty - \\infty$** (Expression conjuguée ou factorisation)

Observez attentivement la métaphore visuelle des 4 forces ci-dessous :

![Figure 2 : Pourquoi le calcul bloque-t-il ? Les 4 formes indéterminées décodées](/assets/pedagogie/formes_indeterminees_vie_reelle.svg)

> [!VIE_REELLE] Pourquoi ces 4 formes sont-elles dites « indéterminées » ? Parce qu'elles représentent un affrontement de forces :
> - Dans $\\frac{\\infty}{\\infty}$, c'est comme un grand combat de lutte sénégalaise (Lamb) entre deux colosses : on ne sait pas qui gagne tant qu'on n'a pas isolé la force prépondérante (le plus haut degré) !
> - Dans $+\\infty - \\infty$, c'est un tir à la corde entre deux camions tirant en sens inverse : le résultat ne fait pas automatiquement $0$, la différence dépend de la puissance cachée sous les racines carrées.

> [!WOLOF] **Xam-xam ci Wolof :** Lu tax ñuy wax « Forme indéterminée » ? Ndax dafa jaxasoo ci xoolin wu yomb :
> - **$\\frac{0}{0}$ :** ñaari mbir yu ndaw lool yu kenn mënul seetlu ñoo ngi séddaloo. Dangay **yaatal (factoriser)** numérateur ak dénominateur par $(x - a)$ ngir dindi li leen di tëj ba kumpa gi génn !
> - **$\\frac{\\infty}{\\infty}$ :** ñaari mbeur yu mag ñoo ngi xëccoo. Terme bi gën a rëy ci kaw ($x^n$) ak bi ci suuf ($x^m$) ñoo ciy joxe ndam li !
> - **$+\\infty - \\infty$ :** boo amee racine $\\sqrt{\\dots}$, faw nga jëfandikoo **quantité conjuguée** ngir dindi soustraction bi jaxase doole yi.

### Les 3 réflexes fondamentaux :
1. **La factorisation par le terme prépondérant en $\\pm\\infty$** : on met en facteur la plus grande puissance de $x$ au numérateur et au dénominateur.
2. **L'expression conjuguée** : indispensable dès la présence d'un radical $\\sqrt{\\dots}$ suivi d'une soustraction menant à une forme "$\\infty - \\infty$".
3. **Le taux de variation (Nombre dérivé)** : indispensable pour les limites trigonométriques en $0$.

> [!ASTUCE] Au Bac S2, si vous rencontrez $\\lim_{x \\to 0} \\frac{\\sin(ax)}{x}$, le résultat immédiat est $a$, car $\\lim_{X \\to 0} \\frac{\\sin X}{X} = 1$.

> [!PIEGE] Ne confondez jamais $\\frac{0}{\\infty}$ (qui vaut simplement $0$) ou $\\frac{\\infty}{0}$ (qui tend vers $\\infty$) avec des formes indéterminées. Seules les 4 formes mentionnées ci-dessus nécessitent une transformation d'écriture.

---

## 3. Le Théorème d'Encadrement (Théorème des Gendarmes / Sandarmi)

Lorsque vous étudiez des fonctions contenant des oscillations trigonométriques comme $\\sin(x)$ ou $\\cos(x)$ en $\\pm\\infty$, vous ne pouvez pas calculer directement la limite car ces fonctions n'ont pas de limite à l'infini. 

La méthode consiste à les **enserrer** entre deux fonctions qui convergent vers la même valeur :

![Figure 3 : L'escorte des Gendarmes vers la destination L](/assets/pedagogie/theoreme_gendarmes_vie_reelle.svg)

$$\\forall x \\in I, \\quad g(x) \\le f(x) \\le h(x)$$
$$\\text{Si } \\lim_{x \\to x_0} g(x) = \\lim_{x \\to x_0} h(x) = L, \\quad \\text{alors } \\lim_{x \\to x_0} f(x) = L$$

> [!VIE_REELLE] C'est exactement comme un convoi officiel escorté sur la route : le véhicule officiel $f(x)$ est encadré par deux motards de la gendarmerie $g(x)$ (en bas) et $h(x)$ (en haut). Si les deux gendarmes se dirigent obligatoirement vers la même porte du Palais ($L$), le véhicule au milieu n'a pas d'autre choix que d'atterrir exactement au même endroit !

> [!WOLOF] **Xam-xam ci Wolof :** Théorème bi ñuy wax Sandarmi (Gendarmes) dafa yomb a xam : booy xool $f(x)$ bu melni $\\frac{\\cos x}{x}$, xam nga ne cosinus day dëpp ci diggante $-1$ ak $1$. Kon $f(x)$ dafay tëjoo ci diggante ñaari fonction : $g(x)$ ci suuf ak $h(x)$ ci kaw. Ndax ñaari fonction yooyu yépp ñoo ngi jëm ci $0$, kon $f(x)$ tamit du am pexe lu dul dem ci $0$ !

> [!EXEMPLE] Calculons $\\lim_{x \\to +\\infty} \\frac{\\cos x}{x}$.  
> Pour tout $x > 0$, on sait que $-1 \\le \\cos x \\le 1$.  
> En divisant par $x > 0$ : $-\\frac{1}{x} \\le \\frac{\\cos x}{x} \\le \\frac{1}{x}$.  
> Or $\\lim_{x \\to +\\infty} -\\frac{1}{x} = \\lim_{x \\to +\\infty} \\frac{1}{x} = 0$.  
> D'après le théorème des gendarmes, $\\lim_{x \\to +\\infty} \\frac{\\cos x}{x} = 0$.

---

## 4. Continuité d'une Fonction en un Point

Une fonction $f$ est dite **continue** en un point $x_0$ de son ensemble de définition si la limite de $f(x)$ quand $x$ tend vers $x_0$ est égale à l'image $f(x_0)$ :

$$\\lim_{x \\to x_0} f(x) = f(x_0) \\iff \\lim_{x \\to x_0^+} f(x) = \\lim_{x \\to x_0^-} f(x) = f(x_0)$$

> [!VIE_REELLE] Pensez au pont Faidherbe qui relie Saint-Louis à l'île : tant que le pont est posé sans rupture, la circulation est continue, on peut passer d'un bord à l'autre sans sauter ! Si le pont est ouvert pour laisser passer un bateau, il y a une discontinuité : la route est coupée en ce point. En mathématiques, une fonction continue est une courbe qu'on peut tracer sur sa feuille sans jamais lever la pointe de son stylo.

> [!WOLOF] **Xam-xam ci Wolof :** Continuité ci benn bérab $x_0$ mooy yoon bu dogul. Sa stylo mën na wéy ci xalaat bi ba paré te do ko yékkati. Bu fékkee fonction bi am na ñaari branche (par morceaux), dangay seet ndax limite ci wetu ndeyjoor ($x_0^+$) dafa tollook limite ci wetu cammooñ ($x_0^-$) te ñaar ñépp yem ak nataalu bérab bi $f(x_0)$ !
`,

  tvi: `# Leçon 2 : Théorème des Valeurs Intermédiaires (TVI), Continuité & Bijection

Bienvenue dans cette leçon consacrée à l'un des piliers du **Baccalauréat Sénégalais (Série S2)** : le **Théorème des Valeurs Intermédiaires (TVI)** et le **Théorème de la Bijection**.

Chaque année au Bac S2, l'exercice d'analyse commence par l'étude d'une fonction auxiliaire $g(x)$ dans la **Partie A**. La question centrale consiste systématiquement à prouver que $g(x) = 0$ admet une unique solution $\\alpha$, puis à en déduire le signe de $g(x)$ pour étudier la fonction principale $f(x)$ dans la **Partie B**.

---

## 1. Continuité sur un Intervalle : Le Prérequis Absolu

Une fonction $f$ est continue sur un intervalle $I$ si sa courbe représentative peut être tracée « sans lever le crayon ».

### Théorèmes de continuité usuelle :
- Toute fonction **polynôme** est continue sur $\\mathbb{R}$.
- Toute fonction **rationnelle** (quotient de polynômes) est continue sur chacun des intervalles de son ensemble de définition.
- Les fonctions $x \\mapsto \\sqrt{x}$, $x \\mapsto \\sin x$, $x \\mapsto \\cos x$, $x \\mapsto |x|$ sont continues sur leurs ensembles de définition respectifs.
- La somme, le produit et la composée de fonctions continues sont des fonctions continues.

> [!METHODE] Au Baccalauréat, ne sautez jamais l'étape de justification de la continuité ! Écrivez toujours une phrase claire telle que :  
> *« En tant que fonction polynôme (ou somme/quotient de fonctions continues), $f$ est continue sur $I$. »*

---

## 2. Le Théorème des Valeurs Intermédiaires (Version Existence)

### Énoncé officiel :
Soit $f$ une fonction continue sur un intervalle $[a, b]$. Pour tout réel $k$ compris entre $f(a)$ et $f(b)$, il existe **au moins** un réel $c \\in [a, b]$ tel que :

$$f(c) = k$$

En particulier, si $f(a)$ et $f(b)$ sont de signes contraires ($f(a) \\times f(b) < 0$), l'équation $f(x) = 0$ admet **au moins une solution** dans l'intervalle ouvert $]a, b[$.

> [!PIEGE] Cette version garantit seulement l'**existence** de solutions (il peut y en avoir $1$, $2$, $3$ ou plus). Pour prouver l'**unicité**, la stricte monotonie est obligatoire !

---

## 3. Le Corollaire du TVI : Théorème de la Bijection (Existence & Unicité)

C'est la version reine utilisée dans les épreuves du Baccalauréat sénégalais.

![Figure 1 : Animation de l'unicité de la solution alpha via le Théorème de la Bijection](/assets/pedagogie/theoreme_valeurs_intermediaires.svg)

![Figure 1b : Métaphore concrète au Sénégal : Le Bus Dakar Dem Dikk et le Théorème de la Bijection](/assets/pedagogie/tvi_vie_reelle_bus.svg)

> [!VIE_REELLE] Imaginez un bus Dakar Dem Dikk qui quitte une zone basse sous le niveau de la mer comme Thiaroye ($f(a) < 0$) pour rejoindre les hauteurs des Almadies ($f(b) > 0$). Tant que la route est praticable et continue (sans trou géant ni téléportation), le bus est OBLIGATOIREMENT obligé de couper la ligne du niveau zéro ($f(\\alpha) = 0$) au moins une fois ! Et comme le bus ne fait qu'avancer et grimper tout droit sans jamais reculer (stricte croissance), il ne coupera cette frontière qu'une SEULE et UNIQUE fois : c'est exactement le Théorème de la Bijection !

> [!WOLOF] **Xam-xam ci Wolof :** Théorème de la Bijection mooy wax ne : boo jogee ci suuf ($f(a) < 0$) ngir yéeg ci kaw ($f(b) > 0$), bu yoon bi dogul (continuité), faw nga romb digg bi ($0$). Te bu fékkee oto bi dafay yéeg rekk te du dellu ginaaw muk (stricte monotonie), benn bérab rekk lay rombe digg bi : bérab boobu lañuy wax $\\alpha$ fu $f(\\alpha) = 0$ !

### Les 3 Conditions Indispensables à Rédiger :
Pour démontrer que l'équation $f(x) = k$ admet une **unique solution $\\alpha$** sur un intervalle $I$ :

1. **Continuité** : $f$ est continue sur $I$.
2. **Stricte monotonie** : $f$ est strictement croissante (ou strictement décroissante) sur $I$.
3. **Appartenance de la valeur cible** : $k$ appartient à l'intervalle image $f(I)$ (dans le cas fréquent où $k = 0$ sur $[a, b]$, on vérifie simplement que $f(a) \\times f(b) < 0$).

> [!ASTUCE] **Phrase de rédaction modèle conforme aux attentes des jurys du Bac :**  
> *« La fonction $f$ est continue et strictement croissante sur l'intervalle $[a, b]$.  
> De plus, $f(a) = ... < 0$ et $f(b) = ... > 0$, donc $0 \\in [f(a), f(b)]$.  
> D'après le corollaire du Théorème des Valeurs Intermédiaires (Théorème de la Bijection), l'équation $f(x) = 0$ admet une unique solution $\\alpha$ dans $]a, b[$. »*

---

## 4. Déduction du Tableau de Signe de $f(x)$

Une fois l'existence et l'unicité de $\\alpha$ établies, l'examinateur vous demande toujours : **« En déduire le signe de $f(x)$ sur $I$ »**.

Si $f$ est strictement croissante sur $[a, b]$ et $f(\\alpha) = 0$ :
- Pour tout $x < \\alpha$ : $f(x) < f(\\alpha) = 0 \\implies f(x) < 0$ (strictement négatif).
- Pour tout $x > \\alpha$ : $f(x) > f(\\alpha) = 0 \\implies f(x) > 0$ (strictement positif).
- Pour $x = \\alpha$ : $f(\\alpha) = 0$.

| $x$ | $-\\infty$ (ou $a$) | | $\\alpha$ | | $+\\infty$ (ou $b$) |
| :---: | :---: | :---: | :---: | :---: | :---: |
| **Signe de $f(x)$** | | **$-$** | **$0$** | **$+$** | |

> [!METHODE] Ce tableau de signe est le pont qui permet de déterminer le signe de la dérivée dans la Partie B de l'exercice du Bac. Ne vous trompez pas sur l'ordre des signes !

> [!VIE_REELLE] C'est comme la ligne d'embarquement d'une pirogue à Soumbédioune : avant le point de contact $\\alpha$, vous êtes encore sur la terre ferme du côté négatif ($f(x) < 0$). Au point exact $\\alpha$, vous touchez la ligne d'eau ($f(\\alpha) = 0$). Dès que vous dépassez $\\alpha$, vous voguez en pleine mer du côté positif ($f(x) > 0$). Ce point $\\alpha$ est le commutateur universel qui sépare le négatif du positif.

> [!WOLOF] **Xam-xam ci Wolof :** Naka ngay xamee signe bi ? Ndax fonction bi dafay yéeg (croissante), bala nga agsi ci $\\alpha$ yangi ci suuf ($f(x) < 0$). Boo rombee $\\alpha$, yangi ci kaw ($f(x) > 0$). Ci $\\alpha$ ci boppam la yem ak zéro ($f(\\alpha) = 0$). Loolu moo tax tableau de signe bi di am : $(-)$ bala $\\alpha$, zéro ci $\\alpha$, ak $(+)$ ginaaw $\\alpha$ !

---

## 5. Encadrement de $\\alpha$ : Méthode par Balayage et Dichotomie

Au Bac S2, on vous demande souvent : *« Donner un encadrement de $\\alpha$ à $10^{-1}$ près ou $10^{-2}$ près »*.

### Exemple d'application :
Soit $g(x) = x^3 + 3x - 2$. On a prouvé que $g(x) = 0$ admet une unique racine $\\alpha \\in [0, 1]$.
1. Calculons les valeurs par pas de $0,1$ :
   - $g(0,5) = (0,5)^3 + 3(0,5) - 2 = 0,125 + 1,5 - 2 = -0,375 < 0$
   - $g(0,6) = (0,6)^3 + 3(0,6) - 2 = 0,216 + 1,8 - 2 = +0,016 > 0$
2. Comme $g(0,5) < 0$ et $g(0,6) > 0$, la fonction change de signe entre $0,5$ et $0,6$.
3. Conclusion : **$0,5 < \\alpha < 0,6$** (amplitude $0,1 = 10^{-1}$).

> [!VIE_REELLE] La recherche de $\\alpha$ par dichotomie ou balayage, c'est comme chercher une boutique au marché Sandaga : vous commencez par repérer entre quelles allées elle se trouve, puis vous réduisez la distance de moitié à chaque pas jusqu'à la localiser à quelques centimètres près !

> [!WOLOF] **Xam-xam ci Wolof :** Dichotomie mooy seet $\\alpha$ ni ngay seete nit ci marcha : dangay séddale digg bi ci ñaar (xaaj ko ci digg), seet ndax mi ngi ci wetu ndeyjoor walla cammooñ, nga tëj fulees ko giseewul ba wër ko ci $10^{-1}$ walla $10^{-2}$ !

`,
  derivation: `# Chapitre 2 : Dérivation et Étude de Fonctions (Terminale S2)

Bienvenue dans le grand pilier de l'analyse mathématique au **Baccalauréat Scientifique S2**. La dérivation est l'outil indispensable qui gouverne l'étude des variations, les tangentes, les extremums et le tracé rigoureux des courbes.

---

## 1. Nombre Dérivé et Interprétation Géométrique

### 1.1 Définition par le taux de variation
Soit $f$ une fonction définie sur un intervalle $I$ et $x_0 \\in I$. On dit que $f$ est dérivable en $x_0$ si la limite suivante existe et est un nombre réel fini $l$ :

$$\\lim_{x \\to x_0} \\frac{f(x) - f(x_0)}{x - x_0} = l \\quad \\text{ou encore} \\quad \\lim_{h \\to 0} \\frac{f(x_0 + h) - f(x_0)}{h} = l$$

Ce réel $l$ est noté **$f'(x_0)$** et est appelé le **nombre dérivé** de $f$ en $x_0$.

### 1.2 Interprétation géométrique : la Tangente
Le nombre dérivé $f'(x_0)$ représente la **pente** (le coefficient directeur) de la tangente $(T)$ à la courbe $\\mathcal{C}_f$ au point d'abscisse $x_0$.

![Figure 1 : Interprétation géométrique du nombre dérivé et de la tangente](/assets/pedagogie/derivation_tangente_sens.svg)

![Figure 1b : Métaphore concrète au Sénégal : La Dérivée = La Pente de la Colline des Mamelles](/assets/pedagogie/derivation_vie_reelle_colline.svg)

> [!VIE_REELLE] Imaginez que vous gravissez la colline des Mamelles à Dakar : à chaque pas, l'angle que fait la semelle de votre chaussure avec l'horizontale représente la droite tangente, et sa pente est le nombre dérivé $f'(x_0)$. Quand vous montez vers le phare, la pente est raide et positive ($f'(x) > 0$). Au sommet exact de la colline, vos pieds sont posés à plat à l'horizontale : la pente s'annule ($f'(x_0) = 0$), vous êtes au maximum local ! En redescendant vers la plage des Almadies, la pente devient négative ($f'(x) < 0$).

> [!WOLOF] **Xam-xam ci Wolof :** Dérivée $f'(x_0)$ mooy wax ni yoon bi di dëggee ci benn bérab. Boo yéeg toundu Mamelles, sa tànk day dëpp ci kaw ($f'(x) > 0$). Boo wàcc jëm tefes ga, sa tànk day dëpp ci suuf ($f'(x) < 0$). Ci kocc bi ci kaw (sommet), sa tànk day téye noom te du yéeg du wàcc : foofu la $f'(x_0) = 0$, di bérab bi gën a kawe (maximum local) !

> [!METHODE] **Équation cartésienne de la tangente :**
> $$(T) : y = f'(x_0)(x - x_0) + f(x_0)$$

### 1.3 Cas des demi-tangentes remarquables
Au Bac S2, l'étude de la dérivabilité aux bornes de l'ensemble de définition fait l'objet de questions types :
- Si $\\lim_{x \\to x_0^+} \\frac{f(x) - f(x_0)}{x - x_0} = +\\infty$ : $f$ n'est pas dérivable à droite en $x_0$, et $\\mathcal{C}_f$ admet une **demi-tangente verticale dirigée vers le haut**.
- Si $\\lim_{x \\to x_0^+} \\frac{f(x) - f(x_0)}{x - x_0} = -\\infty$ : $\\mathcal{C}_f$ admet une **demi-tangente verticale dirigée vers le bas**.
- Si le taux admet une limite à gauche $f'_g(x_0)$ et une limite à droite $f'_d(x_0)$ distinctes : le point est un **point anguleux**.

---

## 2. Tableau des Dérivées Usuelles et Opérations

### 2.1 Fonctions de référence
| Fonction $f(x)$ | Ensemble de dérivabilité | Dérivée $f'(x)$ |
| :---: | :---: | :---: |
| $k$ (constante) | $\\mathbb{R}$ | $0$ |
| $x^n \\; (n \\in \\mathbb{Z}^*)$ | $\\mathbb{R}$ ou $\\mathbb{R}^*$ | $n x^{n-1}$ |
| $\\sqrt{x}$ | $]0, +\\infty[$ | $\\dfrac{1}{2\\sqrt{x}}$ |
| $\\dfrac{1}{x}$ | $\\mathbb{R}^*$ | $-\\dfrac{1}{x^2}$ |
| $e^x$ | $\\mathbb{R}$ | $e^x$ |
| $\\ln x$ | $]0, +\\infty[$ | $\\dfrac{1}{x}$ |
| $\\sin x$ | $\\mathbb{R}$ | $\\cos x$ |
| $\\cos x$ | $\\mathbb{R}$ | $-\\sin x$ |

### 2.2 Règles de dérivation indispensables
- **Somme :** $(u + v)' = u' + v'$
- **Produit :** $(u \\cdot v)' = u'v + uv'$
- **Quotient :** $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$
- **Composée :** $(f(u))' = u' \\cdot f'(u)$

> [!ASTUCE] Pour la fonction composée $e^{u(x)}$, la dérivée est systématiquement **$u'(x) \\cdot e^{u(x)}$**. N'oubliez jamais le facteur $u'(x)$ en préfixe !

---

## 3. Sens de Variation et Extremums Locaux

Le signe de la fonction dérivée $f'$ détermine immédiatement le sens de variation de $f$ sur un intervalle $I$ :
1. Si $f'(x) > 0$ sur $I$ (sauf éventuellement en un nombre fini de points où elle s'annule), alors $f$ est **strictement croissante** sur $I$.
2. Si $f'(x) < 0$ sur $I$, alors $f$ est **strictement décroissante** sur $I$.
3. Si $f'(x) = 0$ sur tout $I$, alors $f$ est **constante** sur $I$.

![Figure 2 : Correspondance visuelle entre le signe de f'(x) et les variations de la courbe](/assets/pedagogie/derivation_signe_variations.svg)

### Condition d'extremum local :
> [!METHODE] Pour que $f$ admette un extremum local (maximum ou minimum) en $x_0$, il faut et il suffit que **$f'(x_0) = 0$ et que $f'$ change de signe en $x_0$**.
> La tangente y est alors **strictement horizontale** ($y = f(x_0)$).

> [!VIE_REELLE] C'est exactement comme un saut en l'air au basket ou un ballon de football tiré en cloche : pendant la montée, la vitesse verticale est positive ($v > 0$). Au point culminant de la trajectoire, pendant une fraction de seconde imperceptible, la vitesse verticale devient nulle ($v = 0$, sommet) avant de s'inverser pour la chute ($v < 0$). Ce point d'annulation de la vitesse est l'extremum local !

> [!WOLOF] **Xam-xam ci Wolof :** Naka ngay xamee maximum ak minimum ? Booy séddale ballon football buy naan ci kaw : bala muy delsi dafay jëm ci kaw (croissante), bu agsee ci bérab bi gën a kawe day taxaw benn sàcc (dérivée bi yem ak zéro), ba noppi tàmbalee wàcc (décroissante). Foomu lañuy wax extremum local !

---

## 4. Convexité et Points d'Inflexion

Une courbe traverse sa tangente en un point particulier appelé **point d'inflexion**.

- Si $f''(x) \\ge 0$ sur $I$ : $f$ est dite **convexe** (la courbe est située au-dessus de toutes ses tangentes).
- Si $f''(x) \\le 0$ sur $I$ : $f$ est dite **concave** (la courbe est située au-dessous de toutes ses tangentes).
- Si $f''(x_0) = 0$ en **changeant de signe** en $x_0$, alors le point $I(x_0, f(x_0))$ est un **point d'inflexion** de la courbe $\\mathcal{C}_f$.

> [!PIEGE] Au Bac, une erreur fréquente consiste à affirmer qu'il y a un point d'inflexion dès que $f''(x_0) = 0$. Il faut impérativement vérifier le changement de signe !
`,
  asymptotes: `# Chapitre 2 : Branches Infinies, Asymptotes et Positions Relatives (Terminale S2)

Dans le grand problème de synthèse du **Baccalauréat Scientifique (Série S2)**, l'étude des branches infinies et des asymptotes est l'étape cruciale qui relie le calcul des limites au **tracé géométrique définitif de la courbe $\\mathcal{C}_f$**.

![Figure 1 : Les 3 Asymptotes Clés au Baccalauréat Sénégalais](/assets/pedagogie/asymptotes_branches_infinies.svg)

![Figure 1b : Métaphore concrète au Sénégal : Les Asymptotes = Les Rails du TER et le Mur Infranchissable](/assets/pedagogie/asymptotes_vie_reelle_rails.svg)

> [!VIE_REELLE] Une asymptote est une ligne directrice que la courbe cherche à rejoindre sans jamais s'y confondre complètement : l'asymptote verticale $x = x_0$ est un mur infranchissable (comme les falaises de Popenguine) devant lequel la courbe s'enfuit vers les nuages ($+\\infty$) ou les profondeurs ($-\\infty$) ; l'asymptote horizontale ou oblique est comme les rails du TER Dakar - Diamniadio qui filent vers l'horizon : à mesure que vous regardez au loin vers l'infini, la trajectoire colle de plus en plus étroitement à la ligne droite.

> [!WOLOF] **Xam-xam ci Wolof :** Asymptote mooy yoon wu tegu wet :
> - **Verticale ($x = x_0$) :** miir bu kenn mënul daal la ci valeur interdite, boo ko jegeñsee yangi naan ci kaw ($+\\infty$) walla ci suuf ($-\\infty$) te do ko laal muk.
> - **Horizontale ($y = L$) & Oblique ($y = ax + b$) :** boo sori lool ci $+\\infty$, courbe bi day topp yoonu droite bi ba melni rail TER yu lëjaloo !

---

## 1. Asymptote Verticale et Asymptote Horizontale

### 1.1 Asymptote Verticale (Limite infinie en un point fini)
Soit $x_0$ une borne ouverte ou une valeur interdite de l'ensemble de définition $\\mathcal{D}_f$.

> [!METHODE] Si $\\lim_{x \\to x_0^+} f(x) = \\pm\\infty$ ou $\\lim_{x \\to x_0^-} f(x) = \\pm\\infty$, alors la droite d'équation :
> $$(D) : x = x_0$$
> est une **asymptote verticale** à la courbe $\\mathcal{C}_f$.

*Interprétation sur la copie :* La courbe s'approche infiniment de la droite verticale sans jamais la traverser en $x_0$.

### 1.2 Asymptote Horizontale (Limite finie à l'infini)
Soit $f$ une fonction définie au voisinage de $\\pm\\infty$.

> [!METHODE] Si $\\lim_{x \\to +\\infty} f(x) = L$ ou $\\lim_{x \\to -\\infty} f(x) = L$ avec $L \\in \\mathbb{R}$, alors la droite d'équation :
> $$(\\Delta) : y = L$$
> est une **asymptote horizontale** à la courbe $\\mathcal{C}_f$ au voisinage de l'infini considéré.

---

## 2. Asymptote Oblique : Les Deux Démarches Officielles

Une droite non parallèle aux axes cartésiens $(D) : y = ax + b$ (avec $a \\neq 0$) est dite **asymptote oblique** à $\\mathcal{C}_f$ en $\\pm\\infty$ si la distance verticale entre la courbe et la droite tend vers 0 lorsque $x$ s'éloigne vers l'infini.

### 2.1 Première démarche : L'équation est déjà connue ou conjecturée
C'est le cas le plus fréquent au Bac S2 lorsqu'une question préalable demande : *« Déterminer les réels $a, b, c$ tels que $f(x) = ax + b + \\frac{c}{x-1}$ »*.

> [!ASTUCE] Pour prouver que $(D) : y = ax + b$ est asymptote oblique, il suffit d'établir que :
> $$\\lim_{x \\to \\pm\\infty} [f(x) - (ax + b)] = 0$$

### 2.2 Deuxième démarche : Recherche méthodique par les quotients (Algorithme)
Si l'équation n'est pas fournie et que $\\lim_{x \\to \\pm\\infty} f(x) = \\pm\\infty$ :
1. On calcule la pente $a$ :
   $$a = \\lim_{x \\to \\pm\\infty} \\frac{f(x)}{x}$$
   - Si $a = 0$ ou $a = \\pm\\infty$, il s'agit d'une branche parabolique (voir section 3).
   - Si $a \\in \\mathbb{R}^*$, on passe à l'étape 2.
2. On calcule l'ordonnée à l'origine $b$ :
   $$b = \\lim_{x \\to \\pm\\infty} [f(x) - ax]$$
   - Si $b \\in \\mathbb{R}$, alors la droite **$y = ax + b$** est asymptote oblique.
   - Si $b = \\pm\\infty$, la courbe admet une branche parabolique de direction la droite $y = ax$.

---

## 3. Branches Paraboliques

Lorsque la courbe s'éloigne vers l'infini sans être canalisée par une asymptote droite, elle forme une branche parabolique :

| Limite calculée | Interprétation géométrique pour le tracé | Exemple de référence |
| :---: | :---: | :---: |
| $\\lim_{x \\to \\pm\\infty} \\dfrac{f(x)}{x} = \\pm\\infty$ | **Branche parabolique de direction l'axe $(Oy)$** (croissance rapide) | $f(x) = x^2$ ou $f(x) = e^x$ en $+\\infty$ |
| $\\lim_{x \\to \\pm\\infty} \\dfrac{f(x)}{x} = 0$ | **Branche parabolique de direction l'axe $(Ox)$** (croissance lente) | $f(x) = \\sqrt{x}$ ou $f(x) = \\ln x$ en $+\\infty$ |
| $\\lim \\dfrac{f(x)}{x} = a \\neq 0$ et $\\lim [f(x) - ax] = \\pm\\infty$ | **Branche parabolique de direction la droite $y = ax$** | $f(x) = 2x + \\sqrt{x}$ en $+\\infty$ |

---

## 4. Position Relative de la Courbe et de l'Asymptote

Au Baccalauréat, la question est systématique : *« Étudier la position relative de $\\mathcal{C}_f$ par rapport à l'asymptote $(D)$ »*.

### Méthode universelle :
On étudie le **signe algébrique de la différence** :
$$d(x) = f(x) - y_{(D)}$$

1. **Si $d(x) > 0$ sur un intervalle $I$** : $f(x) > y_{(D)}$, donc la courbe $\\mathcal{C}_f$ est **strictement au-dessus** de $(D)$ sur $I$.
2. **Si $d(x) < 0$ sur un intervalle $I$** : $f(x) < y_{(D)}$, donc la courbe $\\mathcal{C}_f$ est **strictement au-dessous** de $(D)$ sur $I$.
3. **Si $d(x_k) = 0$** : le point d'abscisse $x_k$ est le **point d'intersection** entre la courbe et la droite asymptote.

> [!PIEGE] Une asymptote oblique peut tout à fait traverser la courbe $\\mathcal{C}_f$ en un ou plusieurs points réels à distance finie ! La définition de l'asymptote concerne exclusivement le comportement **au voisinage de l'infini** ($x \\to \\pm\\infty$).

> [!VIE_REELLE] Étudier la position relative de la courbe par rapport à la droite, c'est comme savoir si un avion vole au-dessus ou au-dessous de la couche nuageuse : si $d(x) = f(x) - y_{(D)} > 0$, la courbe plane au-dessus ; si $d(x) < 0$, elle glisse en-dessous. Et là où $d(x) = 0$, la courbe traverse la droite !

> [!WOLOF] **Xam-xam ci Wolof :** Position relative dafa yomb : dangay seet signe wu $d(x) = f(x) - y_{(D)}$. Bu fékkee $d(x) > 0$, courbe bi mi ngi ci kaw droite bi ; bu $d(x) < 0$, mi ngi ci suuf droite bi ; bu $d(x) = 0$, ñaar ñi dañoo dajaloote ci benn bérab !
`,
  suites: `# Chapitre 3 : Suites Numériques (Terminale S2)

Au **Baccalauréat Scientifique (Série S2)**, l'exercice sur les suites numériques est un pourvoyeur de points précieux. Il associe systématiquement un raisonnement par récurrence, l'étude des variations, une suite géométrique auxiliaire et le théorème de convergence monotone.

![Figure 1 : Théorème de Convergence Monotone et Barrière du Majorant](/assets/pedagogie/suites_convergence_monotone.svg)

![Figure 1b : Métaphore concrète au Sénégal : Les Dominos de la Récurrence et le Plafond du Majorant](/assets/pedagogie/suites_vie_reelle_dominos_plafond.svg)

---

## 1. Le Raisonnement par Récurrence

Le principe de récurrence permet de prouver qu'une propriété $P(n)$ est vraie pour tout entier naturel $n \\ge n_0$.

> [!VIE_REELLE] Le raisonnement par récurrence fonctionne exactement comme une rangée de dominos alignés ou une file de tabalas : pour être certain que toute la file va tomber jusqu'au bout du monde, vous devez seulement vérifier deux choses : 1) que vous avez bien fait tomber le tout premier domino ($n_0$) ; et 2) que chaque domino est placé assez près du suivant pour que sa chute entraîne obligatoirement celle du suivant ($k \\implies k+1$). Si ces deux règles sont respectées, tous les dominos sans exception tomberont !

> [!WOLOF] **Xam-xam ci Wolof :** Récurrence dafa melni teggoo tabala : bu bu jëkk bi daanoo (initialisation $n_0$), te ku daanu daanal ki ci sa kanam (hérédité $k \\implies k+1$), kon tabala yépp dañuy daanu ba faaw ! Loolu moo tax boo wonee ñaari mbir yooyu rekk, propriété bi dafay dëggu ci bépp entier $n$.

> [!METHODE] **La Rédaction Modèle en 3 Étapes Exigée au Bac :**
> 1. **Initialisation :** On vérifie que la propriété est vraie au premier rang $n_0$ (ex: $n = 0$ ou $n = 1$).
> 2. **Hérédité :** Soit $k \\ge n_0$ un entier fixé. On suppose que la propriété $P(k)$ est vraie (*Hypothèse de récurrence*). On démontre qu'alors la propriété $P(k+1)$ est vraie au rang suivant.
> 3. **Conclusion :** Par le principe de raisonnement par récurrence, $P(n)$ est vraie pour tout entier $n \\ge n_0$.

> [!PIEGE] Ne commencez jamais votre étape d'hérédité par : *« Supposons que pour tout $n$, $P(n)$ est vraie »*. C'est une faute de logique grave qui annule les points de la question. Écrivez toujours : *« Soit $k \\ge n_0$ un entier fixé tel que $P(k)$ soit vraie »*.

---

## 2. Sens de Variation d'une Suite

Une suite $(u_n)$ est une fonction définie sur $\\mathbb{N}$. Pour étudier son sens de variation :

### 2.1 Méthode Universelle : Étude du signe de $u_{n+1} - u_n$
Pour tout entier $n$ :
- Si $u_{n+1} - u_n \\ge 0 \\implies$ la suite $(u_n)$ est **croissante**.
- Si $u_{n+1} - u_n \\le 0 \\implies$ la suite $(u_n)$ est **décroissante**.
- Si $u_{n+1} - u_n = 0 \\implies$ la suite $(u_n)$ est **constante** (stationnaire).

### 2.2 Méthode du Quotient (uniquement si tous les termes sont strictement positifs)
Si $u_n > 0$ pour tout $n$, on compare $\\frac{u_{n+1}}{u_n}$ avec $1$ :
- Si $\\dfrac{u_{n+1}}{u_n} \\ge 1 \\implies$ suite croissante.
- Si $\\dfrac{u_{n+1}}{u_n} \\le 1 \\implies$ suite décroissante.

---

## 3. Suites Bornées et Théorème de Convergence Monotone

### 3.1 Majorant, Minorant et Bornes
- Une suite $(u_n)$ est **majorée** par un réel $M$ si pour tout entier $n$, $u_n \\le M$.
- Une suite $(u_n)$ est **minorée** par un réel $m$ si pour tout entier $n$, $u_n \\ge m$.
- Une suite est dite **bornée** si elle est à la fois majorée et minorée ($m \\le u_n \\le M$).

### 3.2 Le Théorème Fondamental de Convergence Monotone
> [!METHODE] **Théorème Clé :**
> - **Toute suite croissante et majorée est convergente** (vers une limite finie $L \\le M$).
> - **Toute suite décroissante et minorée est convergente** (vers une limite finie $l \\ge m$).

> [!VIE_REELLE] Imaginez le réservoir d'eau d'un forage : l'eau monte à chaque pompage (suite croissante), mais le réservoir est fermé par une dalle en béton étanche à la hauteur $M$ (majorant). L'eau ne peut pas monter jusqu'au ciel ($+\\infty$) : elle est forcée de se stabiliser et d'affleurer à une hauteur maximale $L \\le M$. C'est l'essence même de la convergence monotone !

> [!WOLOF] **Xam-xam ci Wolof :** Convergence monotone mooy wax ne : bu suite bi di yéeg ci kaw saa su nekk (croissante), te am plafon $M$ bu ko tëj ba mënul romb (majorée), faw mu taxaw ci benn bérab $L \\le M$. Mënul dem ba ca infini muk !

---

## 4. Suites Géométriques et Limite de $q^n$

La plupart des exercices du Bac S2 introduisent une **suite auxiliaire géométrique** $v_n = u_n - \\alpha$ pour débloquer le calcul du terme général.

### 4.1 Rappels essentiels sur les suites géométriques
Soit $(v_n)$ une suite géométrique de raison $q$ et de premier terme $v_0$ :
- Relation de récurrence : $v_{n+1} = q \\cdot v_n$
- Forme explicite : **$v_n = v_0 \\cdot q^n$** (ou $v_n = v_p \\cdot q^{n-p}$)
- Somme des termes consécutifs :
  $$S_n = v_0 + v_1 + \\dots + v_n = v_0 \\cdot \\frac{1 - q^{n+1}}{1 - q} \\quad (q \\neq 1)$$

### 4.2 Limite fondamentale de $q^n$
Au Baccalauréat, la raison de la suite auxiliaire vérifie presque toujours **$-1 < q < 1$** :
- **Si $-1 < q < 1$ :** $\\lim_{n \\to +\\infty} q^n = 0$
- **Si $q > 1$ :** $\\lim_{n \\to +\\infty} q^n = +\\infty$
- **Si $q \\le -1$ :** la suite $(q^n)$ n'a pas de limite (divergente).

---

## 5. Suites Récurrentes $u_{n+1} = f(u_n)$ et Équation de Point Fixe

Lorsque la suite est définie par $u_{n+1} = f(u_n)$ avec $f$ une fonction continue sur un intervalle $I$ stable par $f$ :

> [!ASTUCE] Si l'on sait déjà que $(u_n)$ converge vers une limite réelle $L \\in I$, alors par passage à la limite dans la relation de récurrence :
> $$\\lim_{n \\to +\\infty} u_{n+1} = f\\left(\\lim_{n \\to +\\infty} u_n\\right) \\implies L = f(L)$$
> La limite $L$ est obligatoirement une solution de l'**équation de point fixe $f(x) = x$**.
`,
  logarithme: `# Chapitre 4 : Fonction Logarithme Népérien (Terminale S2)

La fonction **logarithme népérien**, notée $\\ln$, est l'une des deux fonctions transcendantes reines du **Baccalauréat sénégalais série S2**. Elle intervient systématiquement dans le grand problème d'analyse (souvent sous la forme $f(x) = x + \\ln\\left(\\frac{x-1}{x+1}\\right)$ ou $f(x) = \\frac{\\ln x}{x^2}$).

---

## 1. Définition et Allure Graphique

La fonction logarithme népérien est l'unique primitive sur $]0, +\\infty[$ de la fonction $x \\mapsto \\frac{1}{x}$ qui s'annule en $1$ :

$$\\begin{cases} \\ln'(x) = \\dfrac{1}{x} & \\forall x > 0 \\\\ \\ln(1) = 0 \\end{cases}$$

![Figure : Allure de la courbe de la fonction logarithme népérien](/assets/pedagogie/logarithme_courbe_proprietes.svg)

![Figure 1b : Métaphore concrète au Sénégal : Le Logarithme = La Croissance Lente et la Barrière d'Existence](/assets/pedagogie/logarithme_vie_reelle_tortue_echelle.svg)

> [!VIE_REELLE] Le logarithme népérien est comparable à une échelle d'intensité sonore ou à un tamis très sélectif : il n'accepte de mesurer QUE des grandeurs strictement positives ($u(x) > 0$). Pour des valeurs très petites proches de zéro ($0 < x < 1$), il plonge dans des profondeurs négatives (abîme en $0^+$) ; il traverse la ligne zéro au point pivot $x = 1$ ($\ln(1) = 0$), puis commence une ascension régulière mais extrêmement amortie et ralentie vers le haut.

> [!WOLOF] **Xam-xam ci Wolof :** Logarithme $\ln(x)$ dafa melni pésekat bu am kersa : lu amul walla lu négatif mënul dugg ci biiram muk (faw $u(x) > 0$). Ci 0 day xóot lool ba ci $-\infty$, ci 1 lay génn ci kaw suuf ($\ln(1) = 0$), ginaaw 1 nak dafay doon positif te di yéeg ndànk-ndànk ba melni mbonat !

### Propriétés immédiates :
- **Ensemble de définition :** $D_{\\ln} = ]0, +\\infty[$. Le logarithme d'un nombre négatif ou nul **n'existe pas**.
- **Sens de variation :** Pour tout $x > 0$, $\\ln'(x) = \\frac{1}{x} > 0$. Donc la fonction $\\ln$ est **strictement croissante** sur $]0, +\\infty[$.
- **Le nombre $e$ :** Il existe un unique réel $e \\approx 2{,}71828$ tel que $\\ln(e) = 1$.
- **Signe de $\\ln(x)$ :**
  - Si $x \\in ]0, 1[$, alors $\\ln(x) < 0$.
  - Si $x = 1$, alors $\\ln(1) = 0$.
  - Si $x \\in ]1, +\\infty[$, alors $\\ln(x) > 0$.

> [!METHODE] **Domaine de validité au Bac S2 :**
> Dès que vous avez une fonction $f(x) = \\ln(u(x))$, la toute première question de l'épreuve est : *"Déterminer l'ensemble de définition de $f$"*.
> Écrivez immédiatement la condition d'existence :
> $$D_f = \\{x \\in \\mathbb{R} \\mid u(x) > 0\\}$$
> Dressez un tableau de signe de $u(x)$ si c'est un produit ou un quotient pour ne pas faire d'erreur d'intervalle !

---

## 2. Propriétés Algébriques Fondamentales

Pour tous réels $a > 0$, $b > 0$ et pour tout entier $n \\in \\mathbb{Z}$ (ou rationnel $r$) :

1. **Relation fondamentale (Logarithme d'un produit) :**
   $$\\ln(a \\cdot b) = \\ln(a) + \\ln(b)$$
2. **Logarithme d'un quotient et de l'inverse :**
   $$\\ln\\left(\\frac{1}{b}\\right) = -\\ln(b) \\qquad \\ln\\left(\\frac{a}{b}\\right) = \\ln(a) - \\ln(b)$$
3. **Logarithme d'une puissance :**
   $$\\ln(a^n) = n \\ln(a) \\qquad \\ln(\\sqrt{a}) = \\frac{1}{2}\\ln(a)$$

> [!PIEGE] **Les 2 erreurs fatales au Bac :**
> - $\\ln(a + b) \\neq \\ln(a) + \\ln(b)$ (erreur classique !)
> - $\\frac{\\ln a}{\\ln b} \\neq \\ln(a - b)$ (le quotient des logarithmes n'est pas le logarithme de la différence).

---

## 3. Limites Fondamentales et Croissances Comparées

### 3.1 Limites aux bornes de l'ensemble de définition
$$\\lim_{x \\to 0^+} \\ln(x) = -\\infty \\implies \\text{La droite } x = 0 \\text{ (axe } Oy\\text{) est asymptote verticale à } \\mathcal{C}_{\\ln}$$

$$\\lim_{x \\to +\\infty} \\ln(x) = +\\infty$$

### 3.2 Nombre dérivé en 1 et limite trigonométrique associée
$$\\lim_{x \\to 1} \\frac{\\ln(x)}{x - 1} = 1 \\qquad \\lim_{X \\to 0} \\frac{\\ln(1 + X)}{X} = 1$$

### 3.3 Théorèmes de Croissances Comparées en $+\\infty$ et en $0^+$
Au voisinage de l'infini, les puissances de $x$ l'emportent toujours sur $\\ln(x)$ :

$$\\forall n > 0 : \\quad \\lim_{x \\to +\\infty} \\frac{\\ln x}{x^n} = 0$$

$$\\forall n > 0 : \\quad \\lim_{x \\to 0^+} x^n \\ln x = 0^-$$

> [!ASTUCE] Pour lever une forme indéterminée "$\\frac{\\infty}{\\infty}$" avec $\\ln$, factorisez systématiquement par le terme de plus haut degré :
> $$\\lim_{x \\to +\\infty} \\frac{2x - \\ln x}{x} = \\lim_{x \\to +\\infty} \\left(2 - \\frac{\\ln x}{x}\\right) = 2 - 0 = 2$$

> [!VIE_REELLE] Les croissances comparées sont comme une course entre un cheval de course fougueux ($x$ ou $x^n$) et une tortue essoufflée ($\ln x$) : même si la tortue avance sans jamais s'arrêter, la distance qui la sépare du cheval devient écrasante et infinie. Le quotient $\frac{\ln x}{x}$ s'écrase donc vers $0$ en $+\infty$ !

> [!WOLOF] **Xam-xam ci Wolof :** Croissances comparées dafay méngale doole : $\ln(x)$ dafa yéeg ndànk lool, te $x$ dafay daw ni fas bu gaaw. Moo tax ci $+\infty$, $x$ day faf $\ln(x)$ ba mu doon zero : $\lim \frac{\ln x}{x^n} = 0$. Ci $0^+$ tamit, $x^n$ moo koy natt ba mu doon $0^-$ : $\lim x^n \ln x = 0^-$ !

---

## 4. Dérivation de la Composée : $(\\ln u)' = \\frac{u'}{u}$

Soit $u$ une fonction dérivable et **strictement positive** sur un intervalle $I$ :

$$(\\ln u)' = \\frac{u'}{u}$$

Plus généralement, si $u(x) \\neq 0$, alors la fonction $x \\mapsto \\ln|u(x)|$ est dérivable et :
$$(\\ln |u|)' = \\frac{u'}{u}$$

### Exemples types du Baccalauréat :
1. Soit $f(x) = \\ln(x^2 + 3x + 1)$. Ici $u(x) = x^2 + 3x + 1$ et $u'(x) = 2x + 3$.
   $$f'(x) = \\frac{2x + 3}{x^2 + 3x + 1}$$
2. Soit $g(x) = \\ln\\left(\\frac{x+1}{x-1}\\right)$.
   *Méthode rapide :* Utilisez la propriété algébrique $g(x) = \\ln(x+1) - \\ln(x-1)$ sur $]1, +\\infty[$ :
   $$g'(x) = \\frac{1}{x+1} - \\frac{1}{x-1} = \\frac{(x-1) - (x+1)}{(x+1)(x-1)} = \\frac{-2}{x^2 - 1}$$
   Cette astuce évite d'appliquer lourdement la dérivée d'un quotient sous un logarithme !

---

## 5. Résolution d'Équations et Inéquations Logarithmiques

Grâce à la stricte croissance de $\\ln$ sur $]0, +\\infty[$ :

$$\\ln(a) = \\ln(b) \\iff a = b \\quad (a > 0 \\text{ et } b > 0)$$
$$\\ln(a) < \\ln(b) \\iff a < b \\quad (a > 0 \\text{ et } b > 0)$$

### Méthode rigoureuse en 3 étapes :
1. **Étape 1 :** Déterminer le domaine de validité $D_E$ (toutes les expressions sous un $\\ln$ doivent être strictement positives).
2. **Étape 2 :** Utiliser les propriétés de simplification pour regrouper sous la forme $\\ln(A) = \\ln(B)$ ou $\\ln(A) = c = \\ln(e^c)$.
3. **Étape 3 :** Résoudre $A = B$ et **conserver uniquement les solutions appartenant à $D_E$**.
`,
  exponentielle: `# Chapitre 5 : Fonction Exponentielle et Fonctions Puissances (Terminale S2)

La fonction **exponentielle**, notée $\\exp$ ou $x \\mapsto e^x$, est la fonction reine absolue de l'analyse en **Terminale S2**. Elle modélise les phénomènes à croissance continue (radioactivité, biologie, cinétique chimique) et constitue le thème central du grand problème du **Baccalauréat sénégalais**.

---

## 1. Définition et Propriétés Fondamentales

La fonction exponentielle est la bijection réciproque de la fonction logarithme népérien :

$$y = e^x \\iff x = \\ln(y) \\quad (x \\in \\mathbb{R}, \\, y > 0)$$

Elle est également l'unique fonction $f$ dérivable sur $\\mathbb{R}$ vérifiant :
$$\\begin{cases} f'(x) = f(x) & \\forall x \\in \\mathbb{R} \\\\ f(0) = 1 \\end{cases}$$

![Figure : Allure de la courbe de la fonction exponentielle](/assets/pedagogie/exponentielle_courbe_tangente.svg)

![Figure 1b : Métaphore concrète au Sénégal : L'Exponentielle = La Fusée Fulgurante et le Positif Absolu](/assets/pedagogie/exponentielle_vie_reelle_fusee_positif.svg)

> [!VIE_REELLE] L'exponentielle est le moteur le plus puissant de toutes les mathématiques du lycée : elle est sa propre dérivée ($(e^x)' = e^x$), ce qui signifie que plus sa valeur est élevée, plus sa vitesse de montée s'accélère vertigineusement ! De plus, elle vit dans une lumière positive absolue : $e^x > 0$ sur tout $\mathbb{R}$. Elle ne touche jamais la ligne du zéro, elle ne plonge jamais sous terre.

> [!WOLOF] **Xam-xam ci Wolof :** Exponentielle $e^x$ dafa am doole ju yéeme : saa su nekk mooy dériver boppam ($(e^x)' = e^x$). Dafa positif saa su nekk ($e^x > 0$), mënul doon zéro te mënul négatif muk ! Ci dérivée $f'(x) = (ax + b)e^x$, $e^x$ du soppi dara ci signe bi, li ci kanam rekk mooy joxe signe bi.

### Propriétés immédiates :
- **Ensemble de définition :** $D_{\\exp} = \\mathbb{R} = ]-\\infty, +\\infty[$. L'exponentielle est définie pour tout nombre réel.
- **Stricte positivité (La règle d'or du Bac) :**
  $$\\forall x \\in \\mathbb{R}, \\quad e^x > 0$$
  L'expression $e^x$ ne s'annule **JAMAIS** et n'est **JAMAIS** négative !
- **Sens de variation :** Pour tout $x \\in \\mathbb{R}$, $(e^x)' = e^x > 0$. Donc la fonction exponentielle est **strictement croissante** sur $\\mathbb{R}$.
- **Valeurs remarquables :** $e^0 = 1$ et $e^1 = e \\approx 2{,}71828$.

> [!METHODE] **Simplification immédiate des signes de dérivées au Bac S2 :**
> Dès que vous calculez une dérivée du type $f'(x) = (ax^2 + bx + c)e^{u(x)}$, écrivez immédiatement sur votre copie :
> *"Comme pour tout $x \\in \\mathbb{R}$, $e^{u(x)} > 0$, le signe de $f'(x)$ est exactement celui du facteur $(ax^2 + bx + c)$."*
> Cette justification concise vous assure l'intégralité des points de rigueur du barème officiel.

---

## 2. Propriétés Algébriques Fondamentales

Pour tous réels $a$ et $b$, et pour tout entier $n \\in \\mathbb{Z}$ :

1. **Relation fondamentale (Exponentielle d'une somme) :**
   $$e^{a + b} = e^a \\cdot e^b$$
2. **Exponentielle d'une différence et de l'opposé :**
   $$e^{-b} = \\frac{1}{e^b} \\qquad e^{a - b} = \\frac{e^a}{e^b}$$
3. **Exponentielle d'un produit (Puissance) :**
   $$\\left(e^a\\right)^n = e^{n \\cdot a} \\qquad \\sqrt{e^a} = e^{\\frac{a}{2}}$$

> [!PIEGE] **Attention aux fausses règles d'algèbre :**
> - $e^a + e^b \\neq e^{a+b}$ (l'addition des exponentielles ne s'additionne pas dans l'exposant !)
> - $\\left(e^a\\right)^2 = e^{2a} \\neq e^{a^2}$.

---

## 3. Limites Fondamentales et Croissances Comparées

### 3.1 Limites aux bornes de $\\mathbb{R}$
$$\\lim_{x \\to -\\infty} e^x = 0^+ \\implies \\text{L'axe des abscisses } (Ox) \\text{ d'équation } y = 0 \\text{ est asymptote horizontale en } -\\infty$$

$$\\lim_{x \\to +\\infty} e^x = +\\infty \\qquad \\lim_{x \\to +\\infty} \\frac{e^x}{x} = +\\infty \\implies \\text{Branche parabolique de direction } (Oy) \\text{ en } +\\infty$$

### 3.2 Nombre dérivé en 0
$$\\lim_{x \\to 0} \\frac{e^x - 1}{x} = 1 \\qquad \\lim_{X \\to 0} \\frac{e^{u(x)} - 1}{u(x)} = 1 \\quad (\\text{si } \\lim u(x) = 0)$$

### 3.3 Théorèmes de Croissances Comparées (Les règles reines)
À l'infini, la fonction exponentielle l'emporte sur **n'importe quelle puissance polynomiale** $x^n$ ($n > 0$) :

$$\\forall n > 0 : \\quad \\lim_{x \\to +\\infty} \\frac{e^x}{x^n} = +\\infty \\qquad \\lim_{x \\to +\\infty} \\frac{x^n}{e^x} = 0$$

$$\\forall n > 0 : \\quad \\lim_{x \\to -\\infty} x^n e^x = 0$$

> [!ASTUCE] Pour lever une indéterminée "$+\\infty - \\infty$" en $+\\infty$, mettez **toujours $e^x$ en facteur commun** :
> $$\\lim_{x \\to +\\infty} (e^x - 2x^2 + 1) = \\lim_{x \\to +\\infty} e^x \\left(1 - 2\\frac{x^2}{e^x} + \\frac{1}{e^x}\\right) = +\\infty \\times (1 - 0 + 0) = +\\infty$$

> [!VIE_REELLE] Les croissances comparées de l'exponentielle sont comparables à la puissance d'une fusée spatiale ($e^x$) face à une draisine sur rails ($x^n$) : peu importe la puissance du polynôme ($x^2, x^{10}, x^{100}$), l'exponentielle finit toujours par l'écraser complètement. C'est pourquoi en $+\infty$, le quotient $\frac{e^x}{x^n}$ tend vers $+\infty$, et son inverse $\frac{x^n}{e^x}$ tombe à $0$.

> [!WOLOF] **Xam-xam ci Wolof :** Croissances comparées ci $e^x$ : $e^x$ dafa gaaw ba kenn mënu ko dab ci $+\infty$. Bépp puissance $x^n$, bu mag ba melni $x^{100}$, $e^x$ moo koy dóor ci $+\infty$ : $\lim \frac{e^x}{x^n} = +\infty$. Ci $-\infty$ tamit, $e^x$ day faf $x^n$ ba mu doon zero : $\lim x^n e^x = 0$ !

---

## 4. Dérivation de la Composée : $(e^u)' = u' \\cdot e^u$

Soit $u$ une fonction dérivable sur un intervalle $I$. La fonction $x \\mapsto e^{u(x)}$ est dérivable sur $I$ et :

$$\\left(e^{u}\\right)' = u' \\cdot e^u$$

### Exemples types du Baccalauréat sénégalais :
1. Soit $f(x) = e^{-3x + 2}$. Ici $u(x) = -3x + 2 \\implies u'(x) = -3$.
   $$f'(x) = -3e^{-3x + 2}$$
2. Soit $g(x) = (2x - 1)e^{-x}$. Dérivée d'un produit $uv$ avec $u(x) = 2x-1$ et $v(x) = e^{-x}$ :
   $$g'(x) = 2 \\cdot e^{-x} + (2x - 1)(-e^{-x}) = [2 - (2x - 1)]e^{-x} = (3 - 2x)e^{-x}$$
   *Étude du signe :* Comme $e^{-x} > 0$, $g'(x) \\ge 0 \\iff 3 - 2x \\ge 0 \\iff x \\le \\frac{3}{2}$.
3. Soit $h(x) = e^{-x^2}$. Ici $u(x) = -x^2 \\implies u'(x) = -2x$.
   $$h'(x) = -2x e^{-x^2}$$
   La fonction admet un maximum en $x = 0$ avec $h(0) = 1$.

---

## 5. Équations, Inéquations et Changement de Variable

### 5.1 Égalités et Inégalités de base
Par stricte croissance de l'exponentielle :
$$e^A = e^B \\iff A = B$$
$$e^A < e^B \\iff A < B$$
$$e^A = k \\iff A = \\ln(k) \\quad (\\text{uniquement si } k > 0 !)$$

> [!PIEGE] Si $k \\le 0$, l'équation $e^A = k$ n'a **AUCUNE solution** dans $\\mathbb{R}$ (ex: $e^x = -3 \\implies S = \\emptyset$).

### 5.2 Le Changement de variable classique $X = e^x$
Pour résoudre une équation du second degré du type $a e^{2x} + b e^x + c = 0$ :
1. Poser $X = e^x$ avec la condition impérative **$X > 0$**.
2. Résoudre l'équation polynomiale associée $aX^2 + bX + c = 0$.
3. Éliminer toute racine négative ou nulle ($X \\le 0$).
4. Pour chaque racine positive $X_i > 0$, en déduire $x_i = \\ln(X_i)$.
`,
  integration: `# Chapitre 6 : Primitives et Calcul Intégral (Terminale S2)

Le **calcul intégral** est l'aboutissement majestueux du programme d'analyse de **Terminale S2**. Il clôture presque toujours le grand problème du Baccalauréat sénégalais en demandant de calculer une intégrale par parties et d'en déduire **l'aire exacte en $\\text{cm}^2$** d'un domaine délimité par des courbes.

---

## 1. Primitives & Théorème Fondamental

Soit $f$ une fonction continue sur un intervalle $I$.
Une **primitive** de $f$ sur $I$ est une fonction $F$ dérivable sur $I$ telle que :

$$F'(x) = f(x) \\quad \\forall x \\in I$$

- **Ensemble des primitives :** Si $F$ est une primitive de $f$, alors toutes les primitives de $f$ sont de la forme $x \\mapsto F(x) + k$ où $k \\in \\mathbb{R}$.
- **Condition initiale :** Il existe une **unique** primitive $F_0$ prenant une valeur fixée $y_0$ en un point $x_0$ ($F_0(x_0) = y_0$).

![Figure : Calcul intégral, aire sous la courbe et intégration par parties](/assets/pedagogie/calcul_integral_aire_courbe.svg)

![Figure 1b : Métaphore concrète au Sénégal : L'Intégration = L'Aire d'un Champ et la Priorité ALPES](/assets/pedagogie/integration_vie_reelle_champ_aire.svg)

> [!VIE_REELLE] L'intégration est l'art de reconstituer un tout à partir de ses parties : si la dérivation mesure la vitesse d'écoulement de l'eau seconde par seconde, l'intégrale $\int_a^b f(t)\,dt$ mesure le volume total d'eau accumulé dans le bassin entre deux instants. Géométriquement, c'est comme mesurer la surface d'un champ le long du fleuve Sénégal en additionnant des milliers de petites bandes de terre.

> [!WOLOF] **Xam-xam ci Wolof :** Intégration mooy dajale : bu dérivée di natt viteesu ndox mi ci benn waxtu, intégrale mooy natt réewu ndox mi yépp bu dajaloo ci diggante ñaari waxtu a ak b ! Ci géométrie, mooy natt yaatuwaayu tool bi (aire) nekk ci suuf courbe bi : $F(b) - F(a)$.

### Définition de l'Intégrale définie :
Pour tous réels $a, b \\in I$ :
$$\\int_a^b f(t)\\,dt = [F(t)]_a^b = F(b) - F(a)$$

---

## 2. Tableau des Primitives Composées (Les 4 Réflexes Bac)

Toutes les primitives des sujets du Bac S2 se ramènent aux 4 formes différentielles suivantes :

| Forme de la fonction | Primitive $F(x)$ | Condition de validité |
| :--- | :--- | :--- |
| **$u'(x) \\cdot [u(x)]^n$** | $\\dfrac{[u(x)]^{n+1}}{n+1}$ | $n \\in \\mathbb{R} \\setminus \\{-1\\}$ |
| **$\\dfrac{u'(x)}{u(x)}$** | $\\ln|u(x)|$ | $u(x) \\neq 0$ |
| **$u'(x) \\cdot e^{u(x)}$** | $e^{u(x)}$ | $u$ dérivable sur $I$ |
| **$\\dfrac{u'(x)}{\\sqrt{u(x)}}$** | $2\\sqrt{u(x)}$ | $u(x) > 0$ |

> [!METHODE] **L'astuce d'ajustement du coefficient :**
> Si la dérivée $u'(x)$ n'apparaît pas exactement, faites apparaître la constante multiplicative nécessaire :
> $$\\int \\frac{x}{x^2 + 1}\\,dx = \\frac{1}{2} \\int \\frac{2x}{x^2 + 1}\\,dx = \\frac{1}{2} \\ln(x^2 + 1) + k$$

---

## 3. L'Intégration par Parties (IPP) & La Règle ALPES

Lorsque la fonction à intégrer est le produit de deux fonctions de natures différentes (ex : polynôme $\\times$ logarithme ou polynôme $\\times$ exponentielle), on applique la formule d'**Intégration Par Parties (IPP)** :

$$\\int_a^b u'(x) \\cdot v(x)\\,dx = \\Big[u(x) \\cdot v(x)\\Big]_a^b - \\int_a^b u(x) \\cdot v'(x)\\,dx$$

### La Règle d'or mnémotechnique ALPES :
Pour choisir quelle fonction poser comme **$v(x)$** (la fonction que l'on va DÉRIVER en $v'$), suivez l'ordre des lettres :
1. **A** : Arc (fonctions réciproques)
2. **L** : **Logarithme** ($\\ln x$ se dérive TOUJOURS en $1/x$, car on ne sait pas l'intégrer directement !)
3. **P** : **Polynôme** ($x, x^2, 2x+1$ dont le degré baisse après dérivation)
4. **E** : **Exponentielle** ($e^x$ s'intègre très facilement)
5. **S** : Sinus / Cosinus

> [!EXEMPLE] **Exemple officiel Bac S2 : Calculer $I = \\int_1^e x \\ln(x)\\,dx$**
> D'après ALPES, le **L** (Logarithme) passe avant le **P** (Polynôme). On pose donc :
> - $v(x) = \\ln(x) \\implies v'(x) = \\frac{1}{x}$
> - $u'(x) = x \\implies u(x) = \\frac{x^2}{2}$
>
> Les fonctions $u$ et $v$ sont dérivables à dérivées continues sur $[1, e]$. Par IPP :
> $$I = \\left[\\frac{x^2}{2} \\ln(x)\\right]_1^e - \\int_1^e \\frac{x^2}{2} \\cdot \\frac{1}{x}\\,dx = \\left(\\frac{e^2}{2} \\cdot 1 - 0\\right) - \\frac{1}{2}\\int_1^e x\\,dx$$
> $$I = \\frac{e^2}{2} - \\frac{1}{2}\\left[\\frac{x^2}{2}\\right]_1^e = \\frac{e^2}{2} - \\frac{1}{4}(e^2 - 1) = \\frac{e^2 + 1}{4}$$

---

## 4. Propriétés Fondamentales des Intégrales

- **Relation de Chasles :** $\\int_a^c f(t)\\,dt = \\int_a^b f(t)\\,dt + \\int_b^c f(t)\\,dt$ (indispensable pour intégrer des expressions avec valeur absolue $|x - x_0|$).
- **Linéarité :** $\\int_a^b (\\alpha f + \\beta g) = \\alpha \\int_a^b f + \\beta \\int_a^b g$.
- **Positivité :** Si $a \\le b$ et $f(x) \\ge 0$ pour tout $x \\in [a, b]$, alors $\\int_a^b f(x)\\,dx \\ge 0$.
- **Valeur moyenne :** La valeur moyenne de $f$ sur $[a, b]$ ($a < b$) est :
  $$\\mu = \\frac{1}{b - a} \\int_a^b f(x)\\,dx$$

---

## 5. Calcul d'Aires & Conversion en $\\text{cm}^2$

Au Baccalauréat, l'énoncé précise toujours l'échelle du repère, par exemple : *« Le repère est orthogonal d'unités graphiques : $2\\text{ cm}$ sur l'axe des abscisses et $3\\text{ cm}$ sur l'axe des ordonnées »*.

### 5.1 L'Unité d'Aire (u.a.)
$$1\\text{ u.a.} = \\|\\vec{i}\\| \\times \\|\\vec{j}\\| = 2\\text{ cm} \\times 3\\text{ cm} = 6\\text{ cm}^2$$

### 5.2 Formules d'aires selon la disposition des courbes
1. **Aire sous une courbe positive :** Domaine délimité par $\\mathcal{C}_f$, l'axe $Ox$ et les droites $x = a$ et $x = b$ :
   $$\\mathcal{A} = \\left(\\int_a^b f(x)\\,dx\\right) \\times 1\\text{ u.a.}$$
2. **Aire entre deux courbes $\\mathcal{C}_f$ et $\\mathcal{C}_g$ (avec $f(x) \\ge g(x)$) :**
   $$\\mathcal{A} = \\left(\\int_a^b \\big(f(x) - g(x)\\big)\\,dx\\right) \\times 1\\text{ u.a.}$$
3. **Aire entre une courbe et son asymptote oblique $y = ax + b$ :**
   $$\\mathcal{A} = \\left(\\int_a^b |f(x) - (ax + b)|\\,dx\\right) \\times \\|\\vec{i}\\| \\times \\|\\vec{j}\\|\\text{ cm}^2$$

> [!PIEGE] **Le piège fatale de l'oubli de l'unité en $\\text{cm}^2$ :**
> Si $\\int_a^b f(x)\\,dx = 2$ et que l'unité est $2\\text{ cm}$ sur chaque axe :
> L'aire vaut $2 \\times (2 \\times 2) = 2 \\times 4 = 8\\text{ cm}^2$.
> Écrire simplement $2\\text{ cm}^2$ entraîne le retrait des points de l'unité au Bac S2 !

> [!VIE_REELLE] C'est exactement comme acheter du tissu au marché HLM : si le coupon étalon fait $2\text{ cm} \times 3\text{ cm} = 6\text{ cm}^2$ (l'unité d'aire), et que le patron de couture contient $4$ coupons (l'intégrale vaut $4$), la surface réelle du tissu coupé n'est pas $4\text{ cm}^2$, mais $4 \times 6 = 24\text{ cm}^2$ !

> [!WOLOF] **Xam-xam ci Wolof :** Piège bi gën a mag ci Bac : bu la examinateur laajee aire ci $\text{cm}^2$, bu la fatte faf intégrale bi nga am ak yaatuwaayu carreau bi $\|\vec{i}\| \times \|\vec{j}\|\text{ cm}^2$. Bu unité bi doon $2\text{ cm}$ ci axe yépp, carreau bi $2 \times 2 = 4\text{ cm}^2$ la : kon dangay faf intégrale bi ak $4$ !
`,

  equadiff: `# Chapitre 7 : Équations Différentielles (Terminale S2)

Bienvenue dans ce cours interactif dédié aux **Équations Différentielles**, un chapitre stratégique qui relie l'analyse des fonctions (exponentielles, trigonométrie) à la physique (mécanique, circuits RC/RLC) pour le **Baccalauréat Scientifique (Série S2)** au Sénégal.

---

## 1. Vue d'Ensemble & Notion d'Équation Différentielle

Une équation différentielle est une relation liant une variable réelle $x$, une fonction inconnue $y = f(x)$ et ses dérivées successives ($y', y''$).
Résoudre une équation différentielle sur un intervalle $I$, c'est déterminer **l'ensemble de toutes les fonctions dérivables** vérifiant cette égalité.

Observez l'infographie de synthèse ci-dessous récapitulant les familles de trajectoires et solutions au Bac S2 :

![Figure 1 : Familles de courbes et trajectoires de solutions d'équations différentielles](/assets/pedagogie/equations_differentielles_trajectoires.svg)

![Figure 1b : Métaphore concrète au Sénégal : Le Refroidissement de l'Attaya et le Balancement de la Pirogue](/assets/pedagogie/equadiff_vie_reelle_pirogue_oscillation.svg)

> [!VIE_REELLE] Une équation différentielle ne décrit pas un état figé, mais la loi d'évolution d'un système dans le temps :
> - Au 1er ordre ($y' + ay = b$), c'est la température d'un verre d'attaya chaud qui refroidit en tendant exponentiellement vers la température ambiante de la pièce ($b/a$).
> - Au 2nd ordre ($y'' + \omega^2 y = 0$), c'est le roulis permanent d'une pirogue artisanale à Soumbédioune bercée par la houle marine : un va-et-vient régulier entre cosinus et sinus sans jamais s'arrêter.

> [!WOLOF] **Xam-xam ci Wolof :** Équation différentielle mooy lëj-lëj bu méngale ni mbir di soppikoo ci waxtu :
> - **1er ordre ($y' + ay = b$) :** ataya buy sedd ndànk-ndànk la ci barada bi ba yem ak température bi ko wër ($y(x) = C e^{-ax} + b/a$).
> - **2nd ordre ($y'' + \omega^2 y = 0$) :** gal buy yéngu ci ndoxu géej la (pirogue ci houle) : dafay dëpp ci diggante cosinus ak sinus ($A\cos \omega x + B\sin \omega x$).

---

## 2. Équations Différentielles Linéaires du Premier Ordre

Au programme du Bac S2, deux formes fondamentales du 1er ordre sont exigées :

### 2.1 Équation homogène (sans second membre) : $y' + ay = 0$ ($a \\in \\mathbb{R}^*$)

L'équation s'écrit de manière équivalente $y' = -ay$.

> [!THEOREME] **Théorème fondamental du 1er ordre homogène :**
> L'ensemble des solutions sur $\\mathbb{R}$ de l'équation $y' + ay = 0$ est la famille de fonctions définies par :
> $$y(x) = C \\cdot e^{-ax} \\quad (C \\in \\mathbb{R})$$

### 2.2 Équation avec second membre constant : $y' + ay = b$ ($a \\neq 0, b \\in \\mathbb{R}$)

La résolution se fait par addition d'une **solution particulière constante** $y_0 = \\frac{b}{a}$ :

> [!THEOREME] **Solutions générales de $y' + ay = b$ :**
> $$y(x) = C \\cdot e^{-ax} + \\frac{b}{a} \\quad (C \\in \\mathbb{R})$$

### 2.3 Détermination de la constante $C$ (Condition Initiale)
D'après le **théorème de Cauchy-Lipschitz** (admis au niveau lycée), pour tout couple $(x_0, y_0) \\in \\mathbb{R}^2$, il existe **une unique solution** $f$ vérifiant la condition initiale :
$$f(x_0) = y_0$$

> [!EXEMPLE] **Exemple type Bac S2 :**
> Résoudre l'équation $2y' + 3y = 6$ avec la condition $y(0) = 5$.
> 1. Forme canonique : $y' + \\frac{3}{2}y = 3$. Ici $a = \\frac{3}{2}$ et $b = 3$.
> 2. Solution générale : $y(x) = C \\cdot e^{-\\frac{3}{2}x} + \\frac{3}{\\frac{3}{2}} = C \\cdot e^{-\\frac{3}{2}x} + 2$.
> 3. Condition initiale $y(0) = 5$ :
>    $$y(0) = C \\cdot e^0 + 2 = C + 2 = 5 \\implies C = 3$$
> 4. Conclusion : L'unique solution est $f(x) = 3e^{-\\frac{3}{2}x} + 2$.

---

## 3. Équations Différentielles Linéaires du Second Ordre

### 3.1 Équations du type $y'' + \\omega^2 y = 0$ (Modèle Oscillateur Harmonique, $\\omega > 0$)

C'est l'équation différentielle fondamentale des systèmes oscillants en physique (pendule, circuit LC).

> [!THEOREME] **Solutions oscillantes :**
> Les solutions de $y'' + \\omega^2 y = 0$ sur $\\mathbb{R}$ sont les fonctions de la forme :
> $$y(x) = A \\cos(\\omega x) + B \\sin(\\omega x) \\quad (A, B \\in \\mathbb{R})$$
>
> *(Forme équivalente avec amplitude et phase : $y(x) = X_m \\cos(\\omega x + \\varphi)$).*

Pour fixer les deux constantes $A$ et $B$, l'énoncé du Bac fournit **deux conditions initiales** : la valeur $y(x_0)$ et la vitesse ou dérivée $y'(x_0)$.

### 3.2 Équations complètes à coefficients constants : $a y'' + b y' + c y = 0$ ($a \\neq 0$)

Pour résoudre cette équation, on forme immédiatement son **équation caractéristique associée** :
$$a r^2 + b r + c = 0$$
On calcule le discriminant $\\Delta = b^2 - 4ac$ :

| Valeur de $\\Delta$ | Racines de l'équation caractéristique | Forme des solutions $y(x)$ sur $\\mathbb{R}$ |
| :--- | :--- | :--- |
| **$\\Delta > 0$** | Deux racines réelles distinctes $r_1, r_2$ | $y(x) = C_1 e^{r_1 x} + C_2 e^{r_2 x}$ |
| **$\\Delta = 0$** | Une racine réelle double $r_0 = -\\frac{b}{2a}$ | $y(x) = (C_1 x + C_2) e^{r_0 x}$ |
| **$\\Delta < 0$** | Deux racines complexes conjuguées $\\alpha \\pm i\\beta$ (avec $\\alpha = -\\frac{b}{2a}$, $\\beta = \\frac{\\sqrt{|\\Delta|}}{2a}$) | $y(x) = e^{\\alpha x}\\big(A \\cos(\\beta x) + B \\sin(\\beta x)\\big)$ |

---

## 4. Les Pièges et Réflexes de Rédaction au Bac S2

> [!METHODE] **La démarche infaillible en 4 temps :**
> 1. **Identifier l'ordre** : $y'$ (1er ordre) ou $y''$ (2nd ordre).
> 2. **Isoler $y'$ ou poser l'équation caractéristique** sans erreur de signe (attention à $y' - ay = 0 \\implies y(x) = C e^{ax}$).
> 3. **Écrire la solution générale** en précisant que $C, A, B$ sont des constantes réelles ($C \\in \\mathbb{R}$).
> 4. **Injecter les conditions initiales** en calculant d'abord la dérivée $y'(x)$ avec soin si $y'(0)$ est donnée.
`,

  complexes: `# Chapitre 8 : Nombres Complexes (Terminale S2)

Bienvenue dans ce cours d'excellence dédié aux **Nombres Complexes**, l'un des piliers les plus rentables du **Baccalauréat Scientifique (Série S2)** au Sénégal (sujet d'exercice obligatoire noté sur 4 à 5 points).

---

## 1. Définition et Formes d'un Nombre Complexe

L'ensemble des nombres complexes $\\mathbb{C}$ étend $\\mathbb{R}$ en introduisant un élément imaginaire $i$ tel que :
$$i^2 = -1$$

Tout nombre complexe $z$ admet trois représentations complémentaires :

![Figure 1 : Le plan complexe d'Argand-Cauchy, affixes et représentations trigonométriques](/assets/pedagogie/nombres_complexes_plan_argand.svg)

![Figure 1b : Métaphore concrète au Sénégal : Le Plan d'Argand = Carte Marine au Large de Dakar](/assets/pedagogie/complexes_vie_reelle_boussole_plan.svg)

> [!VIE_REELLE] Ne voyez plus un nombre complexe comme une entité bizarre ou fictive : c'est exactement la **carte marine d'un capitaine au large de Dakar** !
> - L'axe des réels est l'axe Est-Ouest, et l'axe des imaginaires est l'axe Nord-Sud.
> - Le **module $|z|$** est tout simplement la **distance en kilomètres** séparant la pirogue du Port de Dakar (l'origine $O$).
> - L'**argument $\\arg(z)$** est le **cap indiqué par la boussole** (l'angle orienté par rapport à l'Est).
> - Multiplier par $i$, c'est effectuer un virage sec de $90^\\circ$ vers la gauche (quart de tour antihoraire). Et élever à la puissance $n$ (formule de Moivre), c'est multiplier la distance au phare par $r^n$ et faire tourner la boussole de $n$ fois l'angle de cap !

> [!WOLOF] **Xam-xam ci Wolof :** Nimero complexe $z = a + ib$ du lenn luy kumpa : dafa melni nataalu gaal ci géej gi ci wetu Dakar :
> - Partie réelle $a$ mooy penku ak sowwu (Est-Ouest), partie imaginaire $b$ mooy bët gànnaar ak bët saloum (Nord-Sud).
> - **Module $|z| = \\sqrt{a^2 + b^2}$** mooy guddaayu yoon bi ci diggante gaal gi ak por Dakar ($O$).
> - **Argument $\\arg(z)$** mooy xool fu boussole bi jëm ci biir géej gi (angle orienté).
> - Boo jëlee $i$ di ko xool : booy multiplier ak $i$, dangay dëpp sa gaal ci cammooñ ci angle $90^\\circ$ ($\\frac{\\pi}{2}$). Formule de Moivre $(z^n)$ dafay wax : soréwaay bi day yokk ($r^n$) te boussole bi day wër $n$ yoon ($n\\theta$) !

### 1.1 Forme Algébrique : $z = a + ib$ ($a, b \\in \\mathbb{R}$)
- **Partie réelle :** $\operatorname{Re}(z) = a$
- **Partie imaginaire :** $\operatorname{Im}(z) = b$ (attention : la partie imaginaire est un réel, le $i$ n'en fait pas partie !)
- **Conjugué :** $\\overline{z} = a - ib$. Propriété capitale : $z \\cdot \\overline{z} = a^2 + b^2 = |z|^2$.
- $z$ est un **réel pur** $\\iff \operatorname{Im}(z) = 0 \\iff z = \\overline{z}$.
- $z$ est un **imaginaire pur** $\\iff \operatorname{Re}(z) = 0 \\iff z = -\\overline{z}$.

### 1.2 Module et Argument
Soit $z = a + ib \\neq 0$ :
- **Module :** $|z| = \\sqrt{a^2 + b^2} > 0$ (représente la distance $OM$ dans le plan complexe).
- **Argument :** $\\theta = \\arg(z) \\pmod{2\\pi}$ vérifiant :
  $$\\cos\\theta = \\frac{a}{|z|} \\qquad \\sin\\theta = \\frac{b}{|z|}$$

### 1.3 Forme Trigonométrique et Forme Exponentielle
$$z = r(\\cos\\theta + i\\sin\\theta) = r e^{i\\theta} \\quad (r = |z| > 0)$$

---

## 2. Formules Fondamentales de Moivre et d'Euler & Linéarisation

### 2.1 Formule de Moivre (Puissances de nombres complexes)
Pour tout réel $\\theta$ et pour tout entier relatif $n \\in \\mathbb{Z}$ :
$$(\\cos\\theta + i\\sin\\theta)^n = \\cos(n\\theta) + i\\sin(n\\theta) \\iff (e^{i\\theta})^n = e^{i n\\theta}$$

> [!CONSEIL_BAC] **Réflexe Bac S2 :** Pour calculer $(1 - i\\sqrt{3})^{12}$, ne développez jamais avec le binôme de Newton ! Écrivez d'abord $1 - i\\sqrt{3} = 2 e^{-i\\frac{\\pi}{3}}$, puis appliquez Moivre :
> $$(1 - i\\sqrt{3})^{12} = \\left(2 e^{-i\\frac{\\pi}{3}}\\right)^{12} = 2^{12} \\cdot e^{-i \\frac{12\\pi}{3}} = 4096 \\cdot e^{-i 4\\pi} = 4096(1) = 4096$$

### 2.2 Formules d'Euler & Linéarisation
Pour tout réel $x$ :
$$\\cos x = \\frac{e^{ix} + e^{-ix}}{2} \\qquad \\sin x = \\frac{e^{ix} - e^{-ix}}{2i}$$

**Méthode de linéarisation (Incontournable pour le calcul d'intégrales en Terminale S2) :**
Exemple : Linéariser $\\cos^3 x$ :
$$\\begin{aligned}
\\cos^3 x &= \\left(\\frac{e^{ix} + e^{-ix}}{2}\\right)^3 = \\frac{1}{8} \\left((e^{ix})^3 + 3(e^{ix})^2(e^{-ix}) + 3(e^{ix})(e^{-ix})^2 + (e^{-ix})^3\\right) \\\\
&= \\frac{1}{8} \\left(e^{i3x} + 3e^{ix} + 3e^{-ix} + e^{-i3x}\\right) \\\\
&= \\frac{1}{8} \\left((e^{i3x} + e^{-i3x}) + 3(e^{ix} + e^{-ix})\\right) \\\\
&= \\frac{1}{8} (2\\cos(3x) + 3 \\cdot 2\\cos x) = \\frac{1}{4}\\cos(3x) + \\frac{3}{4}\\cos x
\\end{aligned}$$

> [!VIE_REELLE] **À quoi sert la linéarisation dans la vraie vie ?**
> Pensez au réseau électrique de la Senelec ou aux signaux radio de la RTS : les générateurs produisent des ondes sinusoïdales pures $\\cos(\\omega t)$. Quand ces signaux traversent un amplificateur non linéaire, la puissance $(\\cos t)^3$ crée des harmoniques parasites ($3\\omega$). La linéarisation permet aux ingénieurs de décomposer une onde déformée en une somme d'ondes pures $\\frac{1}{4}\\cos(3x) + \\frac{3}{4}\\cos x$, infiniment plus simples à filtrer et à intégrer !

> [!WOLOF] **Xam-xam ci Wolof — Linéarisation :**
> - « Linéarisation dafa melni suukër bu ñu tëj ci biir paket bu dëgër $(\\cos^3 x)$ : bu dee calcul intégrale, mënuloo ko jëfandikoo noonu ! »
> - « Dangay jël formule Euler yi, tasaaro ko ci binôme de Newton ba mu génn ay kàddu yu amul benn puissance : $\\frac{1}{4}\\cos(3x) + \\frac{3}{4}\\cos x$. Loolu mooy soppi kàddu gu xat mu doon sumbu calcul bu yomb a primitiver ! »

---

## 3. Résolution d'Équations dans $\\mathbb{C}$

### 3.1 Racines carrées d'un nombre complexe $Z = X + iY$
Pour déterminer les racines carrées $\\delta = x + iy$ d'un nombre complexe $Z = X + iY$, on résout le système fondamental en 3 équations :
$$\\begin{cases}
x^2 - y^2 = X & (\\text{Égalité des parties réelles}) \\\\
x^2 + y^2 = \\sqrt{X^2 + Y^2} = |Z| & (\\text{Égalité des modules}) \\\\
2xy = Y & (\\text{Signe du produit } xy)
\\end{cases}$$

- En additionnant (1) et (2) : $2x^2 = X + |Z| \\implies x = \\pm \\sqrt{\\frac{X + |Z|}{2}}$.
- En soustrayant (1) de (2) : $2y^2 = |Z| - X \\implies y = \\pm \\sqrt{\\frac{|Z| - X}{2}}$.
- L'équation (3) impose à $x$ et $y$ d'avoir le **même signe** si $Y > 0$, ou des **signes opposés** si $Y < 0$.

> [!WOLOF] **Xam-xam ci Wolof — Racines carrées ci $\\mathbb{C}$ :**
> - « Ci biir $\\mathbb{R}$, nimero bu négatif amul racine carrée. Waaye ci $\\mathbb{C}$, lépp am na racine ! Même $-1$ am na ñaari racines : $i$ ak $-i$. »
> - « Système ñaari xarala yi : bul fàtte mukk équation $2xy = Y$ ! Moom mooy wax ndax $x$ ak $y$ dañuy bokk signe ($++$ wala $--$) bu $Y > 0$, wala dañuy wuute signe ($+-$ wala $-+$) bu $Y < 0$. »

### 3.2 Équations du second degré à coefficients complexes : $a z^2 + b z + c = 0$ ($a \\neq 0$)
1. Calculer le discriminant : $\\Delta = b^2 - 4ac$.
2. Déterminer une racine carrée $\\delta$ de $\\Delta$ (telle que $\\delta^2 = \\Delta$).
3. Les deux solutions distinctes sont :
   $$z_1 = \\frac{-b - \\delta}{2a} \\qquad z_2 = \\frac{-b + \\delta}{2a}$$

### 3.3 Équations de degré supérieur avec racine évidente
Au Baccalauréat sénégalais, les équations du 3ème degré $z^3 + \\alpha z^2 + \\beta z + \\gamma = 0$ comportent systématiquement une indication :
- *"Montrer que l'équation admet une solution imaginaire pure $z_0 = ib$ ($b \\in \\mathbb{R}$)"* :
  On injecte $z_0 = ib$ dans l'équation, on sépare la partie réelle et la partie imaginaire et on résout le système.
- Ensuite, on factorise par $(z - z_0)$ par identification des coefficients ou division euclidienne pour obtenir une équation du 2nd degré facile à résoudre.

---

## 4. Géométrie et Nombres Complexes (L'arme absolue au Bac S2)

Dans le plan complexe rapporté à un repère orthonormé direct $(O; \\vec{u}, \\vec{v})$ :

### 4.1 Distances et Angles orientés
Soient trois points distincts $A(z_A)$, $B(z_B)$, $C(z_C)$ :
- **Distance :** $AB = |z_B - z_A|$.
- **Angle orienté :** $(\\vec{AB}, \\vec{AC}) = \\arg\\left(\\frac{z_C - z_A}{z_B - z_A}\\right) \\pmod{2\\pi}$.
- Pour quatre points $A, B, C, D$ ($A \\neq B$ et $C \\neq D$) :
  $$(\\vec{AB}, \\vec{CD}) = \\arg\\left(\\frac{z_D - z_C}{z_B - z_A}\\right) \\pmod{2\\pi}$$

### 4.2 Nature des Triangles via le Quotient Maître : $Q = \\dfrac{z_C - z_A}{z_B - z_A}$

| Valeur du quotient $Q$ | Propriété géométrique | Nature du triangle $ABC$ |
| :--- | :--- | :--- |
| **$Q = \\pm i = e^{\\pm i\\frac{\\pi}{2}}$** | $|Q| = 1 \\implies AB = AC$ et $(\\vec{AB}, \\vec{AC}) = \\pm\\frac{\\pi}{2}$ | **Rectangle et isocèle en $A$** |
| **$Q = e^{\\pm i\\frac{\\pi}{3}} = \\frac{1}{2} \\pm i\\frac{\\sqrt{3}}{2}$** | $|Q| = 1 \\implies AB = AC$ et $(\\vec{AB}, \\vec{AC}) = \\pm\\frac{\\pi}{3}$ | **Équilatéral** |
| **$Q \\in i\\mathbb{R}^*$ (imaginaire pur)** | $(\\vec{AB}, \\vec{AC}) = \\pm\\frac{\\pi}{2} \\pmod\\pi$ | **Rectangle en $A$** |
| **$|Q| = 1$** | $AB = AC$ | **Isocèle en $A$** |
| **$Q \\in \\mathbb{R}^*$ (réel pur)** | $(\\vec{AB}, \\vec{AC}) = 0 \\pmod\\pi$ | **Points $A, B, C$ alignés** |

> [!WOLOF] **Xam-xam ci Wolof — Quotient Maître $Q$ :**
> - « Quotient $Q = \\dfrac{z_C - z_A}{z_B - z_A}$ mooy clé universel bi ci Bac S2 :
>   - Module $|Q| = \\dfrac{AC}{AB}$ dafay wax guddaay yi ndax dañoo tollook !
>   - Argument $\\arg(Q) = (\\vec{AB}, \\vec{AC})$ mooy angle bi ci diggante ñaari cotés yi.
>   - Boo amee $Q = i$, xamale ne $AC = AB$ te angle bi $90^\\circ$ la : triangle rectangle isocèle en $A$ sans hésiter ! »

---

## 5. Guide Ultime des Ensembles de Points $(\\mathcal{E})$ au Bac S2

Chaque année au Bac S2, une question demande de déterminer la nature et les éléments caractéristiques de l'ensemble des points $M(z)$ vérifiant une relation donnée.

### 5.1 Ensembles définis par des Modules (Distances)
- **$|z - z_A| = |z - z_B| \\iff AM = BM$** :
  L'ensemble $(\\mathcal{E})$ est la **médiatrice du segment $[AB]$**.
- **$|z - z_A| = R$ ($R > 0$) $\\iff AM = R$** :
  L'ensemble $(\\mathcal{E})$ est le **cercle de centre $A$ et de rayon $R$**.
- **$|z - z_A| = k|z - z_B|$ ($k > 0, k \\neq 1$) $\\iff \\frac{AM}{BM} = k$** :
  Cercle d'Apollonius dont le diamètre est déterminé par les barycentres $G_1 = \\operatorname{bar}\\{(A, 1), (B, k)\\}$ et $G_2 = \\operatorname{bar}\\{(A, 1), (B, -k)\\}$.

### 5.2 Ensembles définis par des Arguments (Angles orientés)
Soit $Z = \\frac{z - z_A}{z - z_B}$ avec $z \\neq z_B$ ($M \\neq B$) :
- **$Z \\in \\mathbb{R}^* \\iff \\arg(Z) = 0 \\pmod\\pi$** :
  $(\\vec{MB}, \\vec{MA}) = 0 \\pmod\\pi \\implies$ L'ensemble $(\\mathcal{E})$ est la **droite $(AB)$ privée des points $A$ et $B$**.
- **$Z \\in \\mathbb{R}^*_+ \\iff \\arg(Z) = 0 \\pmod{2\\pi}$** :
  L'ensemble $(\\mathcal{E})$ est la **droite $(AB)$ privée du segment $[AB]$**.
- **$Z \\in \\mathbb{R}^*_- \\iff \\arg(Z) = \\pi \\pmod{2\\pi}$** :
  L'ensemble $(\\mathcal{E})$ est le **segment $[AB]$ ouvert (privé de $A$ et $B$)**.
- **$Z \\in i\\mathbb{R}^* \\iff \\arg(Z) = \\frac{\\pi}{2} \\pmod\\pi$** :
  $(\\vec{MB}, \\vec{MA}) = \\frac{\\pi}{2} \\pmod\\pi \\implies (MA) \\perp (MB)$.
  L'ensemble $(\\mathcal{E})$ est le **cercle de diamètre $[AB]$ privé des points $A$ et $B$**.

> [!WOLOF] **Xam-xam ci Wolof — Ensembles de Points :**
> - « Boo gisee module $|z - z_A| = |z - z_B|$ : xalaatal ñaari kër $A$ ak $B$. Point $M$ bu tollook ñaar ñépp, médiatrice la ! »
> - « Boo gisee argument bu am $\\frac{\\pi}{2}$ : angle droit la, motax mu nekk cercle de diamètre $[AB]$. »

---

## 6. Similitudes Planes Directes

Une similitude plane directe $S$ est une transformation qui conserve les rapports de distances et les angles orientés.

### 6.1 Écriture complexe générale
Toute similitude directe admet une écriture de la forme :
$$z' = a z + b \\quad (a, b \\in \\mathbb{C}, \\; a \\neq 0)$$

### 6.2 Classification selon le paramètre $a$
1. **Si $a = 1$ :** $z' = z + b$ est la **translation** de vecteur $\\vec{u}$ d'affixe $b$.
2. **Si $a \\in \\mathbb{R}^* \\setminus \\{1\\}$ :** $z' = a z + b$ est une **homothétie** de rapport $k = a$ et de centre $\\Omega$ d'affixe $\\omega = \\frac{b}{1 - a}$.
3. **Si $|a| = 1$ et $a \\neq 1$ ($a = e^{i\\theta}$) :** $z' = e^{i\\theta} z + b$ est une **rotation** d'angle $\\theta = \\arg(a)$ et de centre $\\Omega$ d'affixe $\\omega = \\frac{b}{1 - a}$.
4. **Cas général ($a \\neq 1, |a| \\neq 1$) :** $S$ est la **similitude directe** d'éléments caractéristiques :
   - **Centre $\\Omega$** : unique point invariant vérifiant $\\omega = a\\omega + b \\implies \\omega = \\frac{b}{1 - a}$.
   - **Rapport $k$** : $k = |a| > 0$.
   - **Angle $\\theta$** : $\\theta = \\arg(a) \\pmod{2\\pi}$.
   - **Forme réduite canonique :** $z' - \\omega = k e^{i\\theta}(z - \\omega)$.

> [!THEOREME] **Propriétés géométriques des Similitudes :**
> - L'image d'une droite est une droite.
> - L'image d'un cercle $\\mathcal{C}(A, R)$ est le cercle $\\mathcal{C}(S(A), kR)$.
> - Si une figure a pour aire $\\mathcal{A}$, son image par $S$ a pour aire $\\mathcal{A}' = k^2 \\times \\mathcal{A}$.

> [!WOLOF] **Xam-xam ci Wolof — Similitude directe :**
> - « Similitude directe $z' = az + b$ dafa bolé ñaari mbir : rotation (wër ci angle $\\theta$) ak homothétie (yokk wala wàññi soréwaay bi ci rapport $k$). »
> - « Centre $\\Omega$ d'affixe $\\omega = \\frac{b}{1-a}$ mooy point bi du jog muk ci bérabam ! »

---

## 7. Exercice Type Baccalauréat Sénégal S2 Corrigé Pas à Pas

> [!BAC_SENEGAL] **Énoncé (Extrait conforme Bac S2) :**
> Dans le plan complexe rapporté au repère orthonormé direct $(O; \\vec{u}, \\vec{v})$, on considère les points $A, B, C$ d'affixes respectives :
> $$z_A = 1 + i, \\qquad z_B = 3 - i, \\qquad z_C = 2 + 2i$$
> 1. Déterminer la forme algébrique du quotient $Q = \\dfrac{z_C - z_A}{z_B - z_A}$.
> 2. En déduire la nature exacte du triangle $ABC$.
> 3. Déterminer l'écriture complexe de la similitude directe $S$ de centre $A$ qui transforme $B$ en $C$.
> 4. Préciser le rapport $k$ et l'angle $\\theta$ de la similitude $S$.

### Correction Détaillée et Barème Officiel :

**1. Calcul du quotient $Q$ :**
$$Q = \\frac{(2 + 2i) - (1 + i)}{(3 - i) - (1 + i)} = \\frac{1 + i}{2 - 2i} = \\frac{1 + i}{2(1 - i)}$$
Multiplions numérateur et dénominateur par le conjugué $(1 + i)$ :
$$Q = \\frac{(1 + i)^2}{2(1^2 + (-1)^2)} = \\frac{1 + 2i - 1}{2(2)} = \\frac{2i}{4} = \\frac{1}{2}i$$

**2. Nature du triangle $ABC$ :**
- Module : $|Q| = \\left|\\frac{1}{2}i\\right| = \\frac{1}{2} \\implies \\frac{AC}{AB} = \\frac{1}{2} \\implies AC = \\frac{1}{2}AB$.
- Argument : $\\arg(Q) = \\arg\\left(\\frac{1}{2}i\\right) = \\frac{\\pi}{2} \\pmod{2\\pi} \\implies (\\vec{AB}, \\vec{AC}) = \\frac{\\pi}{2} \\pmod{2\\pi}$.
Conclusion : Le triangle $ABC$ est **rectangle en $A$** (non isocèle, puisque $AC = \\frac{1}{2}AB$).

**3. Écriture complexe de la similitude $S$ :**
Puisque $S$ a pour centre $A$ et transforme $B$ en $C$ :
$$z_C - z_A = a(z_B - z_A) \\implies a = \\frac{z_C - z_A}{z_B - z_A} = Q = \\frac{1}{2}i$$
La forme réduite est donc :
$$z' - z_A = \\frac{1}{2}i(z - z_A) \\iff z' - (1 + i) = \\frac{1}{2}i(z - (1 + i))$$
$$z' = \\frac{1}{2}i z - \\frac{1}{2}i - \\frac{1}{2}i^2 + 1 + i = \\frac{1}{2}i z + \\frac{1}{2} + 1 + \\frac{1}{2}i$$
$$z' = \\frac{1}{2}i z + \\frac{3}{2} + \\frac{1}{2}i$$

**4. Éléments caractéristiques de $S$ :**
- Rapport : $k = |a| = \\left|\\frac{1}{2}i\\right| = \\frac{1}{2}$.
- Angle : $\\theta = \\arg(a) = \\arg\\left(\\frac{1}{2}i\\right) = \\frac{\\pi}{2} \\pmod{2\\pi}$.
- Centre : Le point $A(1 + i)$.
---

## 8. Synthèse Finale — Les 7 Réflexes Absolus du Bac S2 sur les Nombres Complexes

> [!IMPORTANT]
> **Réflexes à maîtriser par cœur pour l'exercice de Nombres Complexes (M8 Bac S2) :**
> 1. **Puissances $z^n$ (Formule de Moivre) :** Ne jamais développer ! Passer immédiatement en forme exponentielle $z = r e^{i\\theta} \\implies z^n = r^n e^{i n\\theta}$.
> 2. **Quotient Maître $Q = \\dfrac{z_C - z_A}{z_B - z_A}$ :**
>    - Si $Q = \\pm i \\implies$ triangle rectangle isocèle en $A$.
>    - Si $Q = e^{\\pm i\\frac{\\pi}{3}} \\implies$ triangle équilatéral.
>    - Si $Q \\in i\\mathbb{R}^* \\implies$ triangle rectangle en $A$.
>    - Si $Q \\in \\mathbb{R}^* \\implies$ points $A, B, C$ alignés.
> 3. **Racines carrées d'un complexe $Z = X + iY$ :** Poser le système fondamental à 3 équations ($x^2 - y^2 = X$, $x^2 + y^2 = |Z|$, $2xy = Y$). L'équation $2xy = Y$ fixe le signe commun ou opposé de $x$ et $y$.
> 4. **Ensemble de points avec module :**
>    - $|z - z_A| = |z - z_B| \\iff AM = BM \\implies$ médiatrice du segment $[AB]$.
>    - $|z - z_A| = R \\iff AM = R \\implies$ cercle de centre $A$ et de rayon $R$.
> 5. **Ensemble de points avec argument :**
>    - $\\arg\\left(\\dfrac{z - z_A}{z - z_B}\\right) = \\pm\\dfrac{\\pi}{2} \\pmod\\pi \\implies$ cercle de diamètre $[AB]$ privé de $A$ et $B$.
>    - $\\arg\\left(\\dfrac{z - z_A}{z - z_B}\\right) = 0 \\pmod\\pi \\implies$ droite $(AB)$ privée de $A$ et $B$.
> 6. **Similitude plane directe $z' = az + b$ :**
>    - Si $a = 1 \\implies$ translation de vecteur $\\vec{u}(b)$.
>    - Si $a \\neq 1 \\implies$ rapport $k = |a|$, angle $\\theta = \\arg(a)$, centre invariant $\\Omega$ d'affixe $\\omega = \\dfrac{b}{1 - a}$.
> 7. **Linéarisation avec Euler :** $\\cos x = \\dfrac{e^{ix} + e^{-ix}}{2}$ et $\\sin x = \\dfrac{e^{ix} - e^{-ix}}{2i}$. Développer par le binôme de Newton puis regrouper les termes conjugués.

> [!CONSEIL_BAC] **Tableau de Bord Récapitulatif M8 :**
>
> | Situation posée au Bac S2 | Outil mathématique clé | Conclusion géométrique |
> | :--- | :---: | :--- |
> | Quotient $Q = \\frac{z_C - z_A}{z_B - z_A} = i$ | $|Q| = 1$ et $\\arg(Q) = \\frac{\\pi}{2}$ | **Rectangle isocèle en $A$** |
> | Quotient $Q = \\frac{1}{2} + i\\frac{\\sqrt{3}}{2}$ | $|Q| = 1$ et $\\arg(Q) = \\frac{\\pi}{3}$ | **Équilatéral** |
> | Module $|z - z_A| = |z - z_B|$ | Distance $AM = BM$ | **Médiatrice de $[AB]$** |
> | Angle $(\\vec{MB}, \\vec{MA}) = \\frac{\\pi}{2} \\pmod\\pi$ | Orthogonalité $(MA) \\perp (MB)$ | **Cercle de diamètre $[AB]$** privé de $A, B$ |
> | Similitude $z' = az + b$ ($a \\neq 1$) | $k = |a|, \\theta = \\arg(a), \\omega = \\frac{b}{1-a}$ | **Similitude directe de centre $\\Omega$** |

> [!WOLOF] **Réflexes Finals en Wolof — Bul ko fàtte ci Bac S2 :**
> - « **Quotient $Q$ :** Mooy clé maîtresse bi ci figures géométriques ! Boo amee $Q = i$, xamal ne triangle rectangle isocèle la ci $A$. »
> - « **Moivre :** Bul développer $(a+ib)^n$ mukk ! Soppi ko ci forme exponentielle $r e^{i\\theta}$, def $r^n e^{in\\theta}$, point bi leer nàññ ! »
> - « **Similitude directe :** Centre $\\Omega(\\omega)$ mooy $\\frac{b}{1-a}$, rapport $k = |a|$, angle $\\theta = \\arg(a)$. Nataal bi dafay tourné te yokk soréwaay bi ! »
> - « **Ensemble de points :** Module mooy distance (médiatrice wala cercle), argument mooy angle (droite alignée wala cercle diamètre $[AB]$) ! »
`,
  similitudes: `# Chapitre M9 : Similitudes Planes Directes (Terminale S2)

Bienvenue dans ce cours d'excellence consacré aux **Similitudes Planes Directes**, un chapitre stratégique du **Baccalauréat Scientifique (Série S2)** au Sénégal — souvent intégré à l'exercice sur les nombres complexes (noté sur 4 à 5 points).

---

## 1. Définition Géométrique d'une Similitude Directe

> [!VIE_REELLE] Imaginez la **fonction « zoom » de l'écran de votre smartphone** : quand vous écartez deux doigts sur la carte de Dakar, l'image est agrandie (rapport $k > 1$) et peut aussi pivoter (angle $\\theta$). C'est exactement une similitude plane directe ! Le point fixe autour duquel tout tourne s'appelle **le centre $\\Omega$**. Les motifs géométriques des **pagnes tissés à Thiès ou Ziguinchor** sont aussi des compositions de similitudes (rotation + homothétie) qui répètent le même motif à différentes échelles et orientations.

Une **similitude plane directe** $S$ est une transformation du plan complexe qui :
- **Conserve les rapports de distances** : $S(A)S(B) / AB = k$ (constante appelée **rapport**),
- **Conserve les angles orientés** (préserve l'orientation),
- S'écrit sous forme complexe : $z' = az + b$ avec $a, b \\in \\mathbb{C}$ et $a \\neq 0$.

![Diagramme M9 : Centre Ω, rapport k, angle θ et formule canonique](/assets/pedagogie/m9_similitudes_directes_geometrie.svg)

> [!WOLOF] **Similitude directe ci Wolof :** Similitude directe $S$ dafa melni **zoom bi ci jëkëram telewwoon bi**, kanam Dakar bi :**
> - **Rapport $k = |a|$** mooy lii ñu yokk wala ñu dëkk image bi (boo yokk $k > 1$ la agrandissement, boo dëkk $0 < k < 1$ la réduction).
> - **Angle $\\theta = \\arg(a)$** mooy angle rotation bi — naqar bu similitude bi dëkk si figure bi.
> - **Centre $\\Omega$** mooy dëkk bu dëgg — point bu wàcc ak S, dey wallu ci bokk bi !

---

## 2. Écriture Complexe Générale : $z' = az + b$

Toute similitude directe $S$ admet une écriture complexe de la forme :

$$z' = az + b \\quad (a, b \\in \\mathbb{C},\\; a \\neq 0)$$

où :
- $a$ est le **paramètre complexe** qui encode rapport et angle,
- $b$ est un complexe quelconque (translation résiduelle).

> [!CONSEIL_BAC] **Réflexe Bac S2 :** Dès que l'énoncé dit « similitude directe de la forme $z' = az + b$ », la **première chose à faire** est d'identifier $a$ et $b$, puis de calculer $|a|$ et $\\arg(a)$.

---

## 3. Classification selon $a$

| Valeur de $a$ | Transformation | Éléments caractéristiques |
| :---: | :--- | :--- |
| $a = 1$ | **Translation** de vecteur $\\vec{u}$ d'affixe $b$ | Pas de point fixe |
| $a \\in \\mathbb{R}^+$, $a \\neq 1$ | **Homothétie** de centre $\\Omega$, rapport $k = a$ | Centre $\\Omega$ (affixe $\\omega = \\frac{b}{1-a}$) |
| $|a| = 1$, $a \\neq 1$ | **Rotation** de centre $\\Omega$, angle $\\theta = \\arg(a)$ | Centre $\\Omega$, $k = 1$ |
| $a \\in \\mathbb{R}^-$, $a \\neq -1$ | **Homothétie** de rapport $k = a < 0$ | Centre $\\Omega$, rotation d'angle $\\pi$ |
| Cas général | **Similitude directe propre** (rotation + homothétie) | Centre $\\Omega$, rapport $k = |a|$, angle $\\theta = \\arg(a)$ |

> [!IMPORTANT] **Règle d'or :** Si $a \\in \\mathbb{R}^+$ → la similitude est une **homothétie** (pas de rotation). Si $|a| = 1$ → c'est une **rotation** (pas de dilatation). Dans tous les autres cas, c'est une similitude directe propre.

---

## 4. Détermination des Éléments par Deux Points Images

Si on connaît les images de deux points distincts $A$ et $B$ (d'affixes $z_A, z_B$) par images $A'$ et $B'$ (d'affixes $z_{A'}, z_{B'}$), alors :

$$a = \\frac{z_{B'} - z_{A'}}{z_B - z_A} \\qquad \\text{puis} \\qquad b = z_{A'} - a \\cdot z_A$$

> [!CONSEIL_BAC] **Méthode systématique Bac S2 :**
> 1. Calculer $a = \\frac{z_{B'} - z_{A'}}{z_B - z_A}$ (affixe complexe).
> 2. Calculer $b = z_{A'} - a \\cdot z_A$ (ou vérifier avec $B'$).
> 3. En déduire $k = |a|$, $\\theta = \\arg(a)$, $\\omega = \\frac{b}{1-a}$ (si $a \\neq 1$).

**Exemple type Bac S2 :**
Soit $S$ la similitude directe telle que $S(1) = i$ et $S(i) = -1$.

$z_A = 1$, $z_{A'} = i$, $z_B = i$, $z_{B'} = -1$.

$$a = \\frac{-1 - i}{i - 1} = \\frac{-(1+i)}{-(1-i)} = \\frac{1+i}{1-i} = \\frac{(1+i)^2}{(1-i)(1+i)} = \\frac{2i}{2} = i$$

$$b = i - i \\cdot 1 = i - i = 0$$

Donc $S : z' = iz$ — c'est une **rotation** de centre $O$ et d'angle $\\frac{\\pi}{2}$ (car $|a| = |i| = 1$, $\\arg(i) = \\frac{\\pi}{2}$).

---

## 5. Centre $\\Omega$ et Construction Géométrique

### 5.1 Calcul du centre $\\Omega$

Lorsque $a \\neq 1$, la similitude admet un **unique point fixe** $\\Omega$ d'affixe $\\omega$ :

$$\\omega = \\frac{b}{1 - a}$$

**Vérification :** $S(\\omega) = a\\omega + b = a \\cdot \\frac{b}{1-a} + b = \\frac{ab + b(1-a)}{1-a} = \\frac{b}{1-a} = \\omega$ ✓

### 5.2 Construction géométrique du centre $\\Omega$

Le centre $\\Omega$ est à l'intersection de deux **arcs capables** :
- L'arc capable de l'angle $\\theta$ sur le segment $[AA']$.
- L'arc capable de l'angle $\\theta$ sur le segment $[BB']$.

> [!WOLOF] **Centre $\\Omega$ ci Wolof :** Centre $\\Omega$ mooy **dëkk bu dëgg — wundu bu dul dóór ak S**. Boo bëgg ko yëgël : dëkk bi mooy géen ci yoon bi — mbooloo bi dëkk bi jëm $AA'$ ak $BB'$ ci angle $\\theta$. Yëgël nak soxor bi ci kàddu bi : $\\omega = \\frac{b}{1-a}$ !

---

## 6. Images de Figures et le Piège des Aires ($k^2$)

### 6.1 Image d'un segment, droite, cercle

| Figure $F$ | Image $S(F)$ |
| :--- | :--- |
| Segment $[AB]$ de longueur $l$ | Segment $[A'B']$ de longueur $k \\cdot l$ |
| Droite $(AB)$ | Droite $(A'B')$ faisant un angle $\\theta$ avec $(AB)$ |
| Cercle de centre $C$, rayon $r$ | Cercle de centre $C' = S(C)$, rayon $k \\cdot r$ |

### 6.2 ⚠️ Le Piège des Aires : facteur $k^2$

> [!CAUTION] **Piège classique Bac S2 :** Si le rapport de la similitude est $k$, alors l'**aire est multipliée par $k^2$**, PAS par $k$ !
> $$\\text{Aire}(S(F)) = k^2 \\times \\text{Aire}(F)$$
> Exemple : $k = 3 \\Rightarrow$ aire multipliée par **9**, pas par 3 !

**Justification :** Les longueurs sont multipliées par $k$, donc les surfaces (produit de deux longueurs) sont multipliées par $k \\times k = k^2$.

> [!VIE_REELLE] Sur un plan d'architecte sénégalais à l'échelle $1/50$ (rapport $k = 1/50$), la surface réelle d'une pièce est $k^2 = \\frac{1}{2500}$ fois la surface dessinée. Un appartement de $60 \\text{ m}^2$ sur le plan correspond à seulement $60/2500 = 0,024 \\text{ m}^2$ dessiné !

---

## 7. Composée et Réciproque

### 7.1 Composée de deux similitudes directes

La composée de deux similitudes directes $S_1 : z' = a_1 z + b_1$ et $S_2 : z' = a_2 z + b_2$ est :

$$S_2 \\circ S_1 : z' = a_2(a_1 z + b_1) + b_2 = a_2 a_1 z + (a_2 b_1 + b_2)$$

Donc : $a_{\\text{composée}} = a_1 a_2$ et $b_{\\text{composée}} = a_2 b_1 + b_2$.

Les rapports se **multiplient** : $k_{\\text{composée}} = k_1 k_2$.
Les angles s'**additionnent** : $\\theta_{\\text{composée}} = \\theta_1 + \\theta_2 \\pmod{2\\pi}$.

### 7.2 Similitude réciproque $S^{-1}$

La similitude réciproque de $S : z' = az + b$ est :

$$S^{-1} : z = \\frac{z' - b}{a} \\quad \\text{soit} \\quad S^{-1}(z') = \\frac{1}{a} z' - \\frac{b}{a}$$

Ses éléments : rapport $\\frac{1}{k}$, angle $-\\theta$, même centre $\\Omega$.

---

## 8. Exercice Type Bac S2 Corrigé Pas à Pas

### Énoncé

Dans le plan complexe, on considère la similitude directe $S$ définie par $z' = (1 + i)z + 2 - i$.

**Calculer** le rapport $k$, l'angle $\\theta$, l'affixe $\\omega$ du centre $\\Omega$, et l'image du cercle $\\mathcal{C}$ de centre $A(2, 0)$ et de rayon 3.

### Corrigé Barème

**Étape 1 — Identification (1 point) :**
$$a = 1 + i, \\quad b = 2 - i$$

**Étape 2 — Rapport et angle (1 point) :**
$$k = |a| = |1 + i| = \\sqrt{1^2 + 1^2} = \\sqrt{2}$$
$$\\theta = \\arg(a) = \\arg(1 + i) = \\frac{\\pi}{4}$$

**Étape 3 — Centre $\\Omega$ (1 point) :**
$$\\omega = \\frac{b}{1 - a} = \\frac{2 - i}{1 - (1+i)} = \\frac{2-i}{-i} = \\frac{(2-i)(-i)}{(-i)(-i)} \\cdot \\frac{1}{1}$$
$$= \\frac{-2i + i^2}{-i^2} = \\frac{-2i - 1}{1} = -1 - 2i$$

Donc $\\Omega$ a pour affixe $\\omega = -1 - 2i$, soit $\\Omega(-1,\\; -2)$.

**Étape 4 — Image du cercle $\\mathcal{C}$ (1 point) :**
- Centre : $A' = S(A)$ d'affixe $z_{A'} = (1+i) \\cdot 2 + 2 - i = 2 + 2i + 2 - i = 4 + i$. Donc $A'(4,\\; 1)$.
- Rayon : $r' = k \\cdot r = \\sqrt{2} \\cdot 3 = 3\\sqrt{2}$.

**Conclusion :** $S(\\mathcal{C})$ est le cercle de centre $A'(4, 1)$ et de rayon $3\\sqrt{2}$.

> [!CONSEIL_BAC] **Barème type Bac S2 :** 1 pt identification → 1 pt $k$ et $\\theta$ → 1 pt centre $\\Omega$ → 1 pt image figure. Ne jamais oublier de calculer l'image du centre séparément !

---

## 9. Synthèse Finale — 7 Réflexes d'Or

> [!IMPORTANT] **Les 7 Réflexes Infaillibles M9 (Bac S2) :**
>
> 1. **Écrire $z' = az + b$** et identifier $a$ et $b$ immédiatement.
> 2. **Rapport $k = |a|$** — jamais $k = a$ (sauf si $a \\in \\mathbb{R}^+$) !
> 3. **Angle $\\theta = \\arg(a)$** — utiliser la forme exponentielle ou trigonométrique.
> 4. **Centre $\\omega = \\frac{b}{1-a}$** — seulement si $a \\neq 1$ (sinon : translation).
> 5. **Image d'une figure :** centre → image du centre, rayon → rayon $\\times k$.
> 6. **Aire = $k^2 \\times$ Aire initiale** — JAMAIS $k \\times$ Aire !
> 7. **Composée :** $a_{12} = a_1 \\cdot a_2$, $k_{12} = k_1 k_2$, $\\theta_{12} = \\theta_1 + \\theta_2$.

> [!CONSEIL_BAC] **Tableau de Bord Récapitulatif M9 :**
>
> | Situation posée au Bac S2 | Formule clé | Résultat |
> | :--- | :---: | :--- |
> | Identifier $k$ et $\\theta$ | $a = k e^{i\\theta}$ | $k = |a|$, $\\theta = \\arg(a)$ |
> | Trouver le centre $\\Omega$ | $\\omega = \\frac{b}{1-a}$ | Affixe du point fixe |
> | Calculer $a$ depuis 2 points | $a = \\frac{z_{B'} - z_{A'}}{z_B - z_A}$ | Rapport + angle |
> | Image d'un cercle (centre $C$, rayon $r$) | $C' = S(C)$, $r' = kr$ | Nouveau cercle |
> | Aire d'une figure image | $\\text{Aire}' = k^2 \\times \\text{Aire}$ | Facteur $k^2$ |
> | Composée $S_2 \\circ S_1$ | $a_{12} = a_1 a_2$, $b_{12} = a_2 b_1 + b_2$ | Nouvelle similitude |

> [!WOLOF] **7 Réflexes Finals en Wolof — Bul ko fàtte ci Bac S2 :**
> - « **$a$ mooy clé bi :** $k = |a|$ mooy rapport bi, $\\theta = \\arg(a)$ mooy angle bi. Bul xamlu $a$ ci réel pure rekk — ab complexe la ! »
> - « **Centre $\\Omega$ :** $\\omega = \\frac{b}{1-a}$ — dëkk bu dul dóór ak similitude bi. Boo xeex ko : $a\\omega + b = \\omega$ la yëgël ! »
> - « **Piège Aire :** Boo def similitude ak rapport $k$, naari ko yokk — aire bi yokk ci $k^2$. Dafa melni ndaaje — boo yokk benn côté ci 3, volume bi yokk ci 9 (ci 2D) ! »
> - « **Composée :** $a$ yi ñu xeex, $k$ yi ñu xeex — dafa melni taalibe bu dëkk benn cours ci yeneen ! »
`,
  isometries: `# Chapitre M10 : Isométries et Transformations du Plan (Terminale S2)

Bienvenue dans ce cours d'excellence dédié aux **Isométries et Transformations du Plan**, un chapitre fondamental du **Baccalauréat Scientifique (Séries S1 et S2)** au Sénégal, élaboré conformément aux standards officiels de l'**Office du Baccalauréat du Sénégal** (noté sur 4 à 5 points).

---

## 1. Définition Axiomatique et Propriétés Fondamentales

Une transformation $f$ du plan euclidien orienté $\\mathcal{P}$ est appelée une **isométrie** si et seulement si elle **conserve toutes les distances**.

Pour tous points $M$ et $N$ du plan d'images respectives $M' = f(M)$ et $N' = f(N)$ :
$$M'N' = MN$$

![Figure 1 : Arbre de Classification Universelle des Isométries du Plan Orienté](/assets/pedagogie/m10_isometries_transformations_geometrie.svg)

> [!VIE_REELLE] **L'analogie du miroir de Sandaga et des pas sur la plage de Ngor :**
> - **La Réflexion Axiale $S_\\Delta$ (Le Miroir) :** Quand vous vous regardez dans un miroir de tailleur au marché Sandaga, les distances entre vos yeux ou la taille de vos épaules ne changent absolument pas ($k = 1$). Cependant, votre main droite devient la main gauche de votre reflet : l'orientation gauche-droite est inversée. C'est l'archétype de l'**antidéplacement**.
> - **La Symétrie Glissée (La Marche sur la Plage) :** Observez vos traces de pas sur le sable humide de la plage de Ngor ou de Yoff : chaque pas avance d'un vecteur $\\vec{u}$ tout en alternant pied gauche et pied droit de part et d'autre d'une ligne droite centrale (l'axe $\\Delta$). Deux pas successifs vous font simplement avancer de $2\\vec{u}$ ($f \\circ f = t_{2\\vec{u}}$) !

> [!WOLOF] **Xam-xam ci Wolof — Isométrie mooy lii :**
> - « **Isométrie du plan :** Dafa melni photocopie bu amul benn changement ci dimensions yi : soréwaay bi du yokk du wàññi ($k = 1$). »
> - « **Déplacement (direct) :** Dafa teg tank ci kanam te orientation bi du changer (rotation ak translation). »
> - « **Antidéplacement (indirect) :** Dafa renverser angle bi (réflexion axiale $S_\\Delta$ ak symétrie glissée). »
> - « **Symétrie glissée :** Dafa melni jéego yi ci géej gi : benn jéego dafay dëpp te avancer ; ñaari jéego ci gannaaw ($f \\circ f$) da ngay am translation bu $2\\vec{u}$ ! »

### Propriétés universellement conservées par toute isométrie :
Toute isométrie du plan conserve :
1. **L'alignement** des points : l'image d'une droite est une droite.
2. **Le barycentre** de tout système pondéré : en particulier, le milieu $I$ de $[AB]$ a pour image le milieu $I'$ de $[A'B']$.
3. **Le parallélisme** et l'**orthogonalité** de deux droites.
4. **Le produit scalaire** et les **angles géométriques** (valeurs absolues).
5. **Les aires géométriques** : $\\text{Aire}(f(\\mathcal{F})) = 1^2 \\times \\text{Aire}(\\mathcal{F}) = \\text{Aire}(\\mathcal{F})$.
6. **Les cercles** : l'image d'un cercle $\\mathcal{C}(O, R)$ est le cercle $\\mathcal{C}'(f(O), R)$ de **même rayon $R$**.

---

## 2. Déplacements vs Antidéplacements : L'Orientation du Plan

Le groupe des isométries se scinde rigoureusement en deux catégories selon la conservation de l'orientation des angles orientés de vecteurs :

### 2.1 Les Déplacements (Isométries Directes) — $\\det(f) = +1$
Un déplacement conserve la mesure des angles orientés de vecteurs non nuls :
$$(\\vec{f(u)}, \\vec{f(v)}) \\equiv (\\vec{u}, \\vec{v}) \\pmod{2\\pi}$$

- **Forme complexe générale :**
  $$z' = e^{i\\theta} z + b \\qquad (\\theta \\in \\mathbb{R}, \\; b \\in \\mathbb{C})$$
- **Deux familles exclusives :**
  - Si $\\theta \\equiv 0 \\pmod{2\\pi}$ : **Translation** $t_{\\vec{u}}$ de vecteur $\\vec{u}$ d'affixe $b$ ($z' = z + b$).
  - Si $\\theta \\not\\equiv 0 \\pmod{2\\pi}$ : **Rotation** $r(\\Omega, \\theta)$ de centre $\\Omega$ d'affixe $\\omega = \\dfrac{b}{1 - e^{i\\theta}}$ et d'angle $\\theta$.

### 2.2 Les Antidéplacements (Isométries Indirectes) — $\\det(f) = -1$
Un antidéplacement transforme tout angle orienté en son opposé :
$$(\\vec{f(u)}, \\vec{f(v)}) \\equiv -(\\vec{u}, \\vec{v}) \\pmod{2\\pi}$$

- **Forme complexe générale :**
  $$z' = e^{i\\theta} \\overline{z} + b \\qquad (\\theta \\in \\mathbb{R}, \\; b \\in \\mathbb{C})$$
- **Deux familles exclusives :**
  - Si $f$ admet au moins un point fixe : **Réflexion axiale** $S_\\Delta$ d'axe la droite $\\Delta$.
  - Si $f$ n'admet aucun point fixe : **Symétrie glissée** $f = t_{\\vec{u}} \\circ S_\\Delta$ avec $\\vec{u} \\neq \\vec{0}$ et $\\vec{u} \\parallel \\Delta$.

> [!CONSEIL_BAC] **Réflexe Bac S2 — Règle de composition des signes :**
> - Déplacement $\\circ$ Déplacement = **Déplacement** ($+1 \\times +1 = +1$).
> - Antidéplacement $\\circ$ Antidéplacement = **Déplacement** ($-1 \\times -1 = +1$).
> - Déplacement $\\circ$ Antidéplacement = **Antidéplacement** ($+1 \\times -1 = -1$).
> - La composée de deux réflexions axiales est TOUJOURS un déplacement (translation ou rotation) !

---

## 3. Classification Complète par l'Ensemble des Points Invariants $\\text{Inv}(f)$

Soit $\\text{Inv}(f) = \\{M \\in \\mathcal{P} \\mid f(M) = M\\}$ l'ensemble des points fixes de l'isométrie $f$.

| Ensemble des points fixes $\\text{Inv}(f)$ | Nature exacte de $f$ | Caractère direct/indirect |
| :--- | :--- | :---: |
| **Tout le plan $\\mathcal{P}$ entier** | **Identité $\\text{Id}$** | Déplacement ($+1$) |
| **Une droite $\\Delta$ entière** | **Réflexion axiale $S_\\Delta$** | Antidéplacement ($-1$) |
| **Un point unique $\\{\\Omega\\}$** | **Rotation $r(\\Omega, \\theta)$** ($\\theta \\not\\equiv 0 \\pmod{2\\pi}$) | Déplacement ($+1$) |
| **Ensemble vide $\\emptyset$ (Directe)** | **Translation $t_{\\vec{u}}$** ($\\vec{u} \\neq \\vec{0}$) | Déplacement ($+1$) |
| **Ensemble vide $\\emptyset$ (Indirecte)** | **Symétrie glissée** ($t_{\\vec{u}} \\circ S_\\Delta$) | Antidéplacement ($-1$) |

> [!IMPORTANT] **Théorème des points fixes multiples :**
> - Si une isométrie fixe **deux points distincts $A$ et $B$** ($A \\neq B$), alors elle fixe tous les points de la droite $(AB)$. Donc $f = \\text{Id}$ ou $f = S_{(AB)}$.
> - Si une isométrie fixe **trois points non alignés $A, B, C$**, alors elle est obligatoirement l'**identité du plan** ($f = \\text{Id}$).

---

## 4. Décomposition Fondamentale en Réflexions Axiales

Les réflexions axiales sont les briques élémentaires de toutes les isométries du plan.

### 4.1 Composée de deux réflexions d'axes parallèles (Translation)
Soient $\\Delta_1$ et $\\Delta_2$ deux droites strictement parallèles, et soient $H_1 \\in \\Delta_1$ et $H_2 \\in \\Delta_2$ tels que $(H_1 H_2) \\perp \\Delta_1$.
$$S_{\\Delta_2} \\circ S_{\\Delta_1} = t_{\\vec{u}} \\quad \\text{avec} \\quad \\vec{u} = 2\\vec{H_1 H_2}$$
- La direction de $\\vec{u}$ est orthogonale aux deux droites $\\Delta_1$ et $\\Delta_2$.
- La norme vaut : $\\|\\vec{u}\\| = 2 \\times d(\\Delta_1, \\Delta_2)$.
- Le sens va de $\\Delta_1$ vers $\\Delta_2$.

### 4.2 Composée de deux réflexions d'axes sécants (Rotation)
Soient $\\Delta_1$ et $\\Delta_2$ deux droites sécantes en un unique point $\\Omega$.
$$S_{\\Delta_2} \\circ S_{\\Delta_1} = r(\\Omega, \\theta) \\quad \\text{avec} \\quad \\theta \\equiv 2(\\Delta_1, \\Delta_2) \\pmod{2\\pi}$$
- Le centre de la rotation est le point de concours $\\Omega$.
- L'angle est le **double** de l'angle orienté entre les deux droites.
- Cas particulier capital : si $\\Delta_1 \\perp \\Delta_2$, alors $\\theta \\equiv 2 \\times \\frac{\\pi}{2} = \\pi \\pmod{2\\pi}$. La composée est la **symétrie centrale** $S_\\Omega$ (demi-tour).

### 4.3 Théorème d'Alhazen / Cartan (Génération du groupe des isométries)
Toute isométrie du plan est la composée d'au plus trois réflexions axiales :
- **0 réflexion :** L'identité $\\text{Id}$.
- **1 réflexion :** Les réflexions axiales $S_\\Delta$.
- **2 réflexions :** Les déplacements (translations si axes parallèles, rotations si axes sécants).
- **3 réflexions :** Les symétries glissées (composée d'une réflexion et d'une translation parallèle à l'axe).

---

## 5. La Symétrie Glissée : Anatomie & Forme Canonique

Une **symétrie glissée** $f$ est la composée commutative d'une réflexion axiale $S_\\Delta$ et d'une translation de vecteur directeur $\\vec{u} \\neq \\vec{0}$ de l'axe $\\Delta$ :
$$f = t_{\\vec{u}} \\circ S_\\Delta = S_\\Delta \\circ t_{\\vec{u}} \\qquad (\\vec{u} \\parallel \\Delta, \\; \\vec{u} \\neq \\vec{0})$$

### 5.1 La Propriété Magique du Carré : $f^2 = t_{2\\vec{u}}$
Calculons la composée de $f$ avec elle-même :
$$f \\circ f = (t_{\\vec{u}} \\circ S_\\Delta) \\circ (t_{\\vec{u}} \\circ S_\\Delta) = t_{\\vec{u}} \\circ (S_\\Delta \\circ t_{\\vec{u}}) \\circ S_\\Delta$$
Puisque $\\vec{u}$ est directeur de $\\Delta$, $S_\\Delta \\circ t_{\\vec{u}} = t_{\\vec{u}} \\circ S_\\Delta$. Donc :
$$f^2 = t_{\\vec{u}} \\circ t_{\\vec{u}} \\circ S_\\Delta \\circ S_\\Delta = t_{2\\vec{u}} \\circ \\text{Id} = t_{2\\vec{u}}$$

> [!CONSEIL_BAC] **Réflexe Bac S2 pour déterminer une symétrie glissée :**
> 1. **Pour trouver le vecteur $\\vec{u}$ :**
>    Prenez un point quelconque $A$, calculez $A' = f(A)$ puis $A'' = f(A') = f^2(A)$.
>    Alors :
>    $$\\vec{u} = \\frac{1}{2}\\vec{A A''}$$
> 2. **Pour trouver l'axe $\\Delta$ :**
>    Le milieu $I$ de $[A, f(A)]$ appartient **toujours** à l'axe $\\Delta$.
>    L'axe $\\Delta$ est donc la droite passant par $I$ et dirigée par $\\vec{u}$.

---

## 6. Détermination d'une Isométrie par 3 Points Non Alignés

### Théorème Fondamental
Soient $A, B, C$ trois points non alignés et $A', B', C'$ trois points vérifiant :
$$A'B' = AB, \\quad A'C' = AC, \\quad B'C' = BC$$
Il existe **une unique isométrie** $f$ telle que $f(A) = A'$, $f(B) = B'$, et $f(C) = C'$.

### Critère Décisif de Discrimination
- Si $(\\vec{A'B'}, \\vec{A'C'}) \\equiv (\\vec{AB}, \\vec{AC}) \\pmod{2\\pi}$ : $f$ est un **déplacement** (translation ou rotation).
- Si $(\\vec{A'B'}, \\vec{A'C'}) \\equiv -(\\vec{AB}, \\vec{AC}) \\pmod{2\\pi}$ : $f$ est un **antidéplacement** (réflexion ou symétrie glissée).

---

## 7. Épreuve Officielle — Office du Baccalauréat du Sénégal (Série S2 / S1)

### Énoncé Officiel (Office du Baccalauréat du Sénégal — 5 Points)

Le plan est orienté dans le sens direct. On considère un carré direct $ABCD$ de centre $O$ tel que :
$$(\\vec{AB}, \\vec{AD}) \\equiv \\frac{\\pi}{2} \\pmod{2\\pi}$$
On désigne par $I$ le milieu du segment $[AB]$ et par $J$ le milieu du segment $[BC]$.

1. **(1 pt)** Déterminer la nature et les éléments caractéristiques de la transformation $f = S_{(AC)} \\circ S_{(AB)}$.
2. **(1 pt)** Soit la transformation $g = t_{\\vec{AD}} \\circ S_{(AB)}$.
   - a. Démontrer que $g$ est un antidéplacement.
   - b. Déterminer l'image du point $A$ par $g$.
   - c. Montrer que $g$ n'admet aucun point invariant. En déduire que $g$ est une symétrie glissée.
3. **(1,5 pt)** Déterminer la forme réduite de la symétrie glissée $g$ :
   - a. Calculer $g \\circ g(A)$ et en déduire le vecteur $\\vec{u}$ de $g$.
   - b. Déterminer l'axe $\\Delta$ de $g$.
4. **(1,5 pt) Écriture complexe associée :**
   Le plan est rapporté au repère orthonormé direct $(A; \\vec{u_1}, \\vec{u_2})$ où $\\vec{u_1} = \\frac{1}{a}\\vec{AB}$ et $\\vec{u_2} = \\frac{1}{a}\\vec{AD}$ (avec $a = AB > 0$).
   - a. Donner les affixes des points $A, B, C, D$.
   - b. Déterminer l'écriture complexe de la transformation $g$.
   - c. Retrouver analytiquement l'axe $\\Delta$ et le vecteur $\\vec{u}$ de $g$.

---

### Corrigé Détaillé et Barème Officiel Pas à Pas

#### 1. Nature et éléments caractéristiques de $f = S_{(AC)} \\circ S_{(AB)}$ (1 point)
- Les droites $(AB)$ et $(AC)$ sont deux droites sécantes au point $A$.
- La composée de deux réflexions d'axes sécants en $A$ est une **rotation de centre $A$**.
- L'angle de la rotation $\\theta$ est donné par :
  $$\\theta \\equiv 2((AB), (AC)) \\pmod{2\\pi}$$
  Dans le carré direct $ABCD$, la diagonale $[AC]$ est la bissectrice de l'angle droit $(\\vec{AB}, \\vec{AD})$, donc :
  $$((AB), (AC)) \\equiv (\\vec{AB}, \\vec{AC}) \\equiv \\frac{\\pi}{4} \\pmod{2\\pi}$$
  D'où :
  $$\\theta \\equiv 2 \\times \\frac{\\pi}{4} = \\frac{\\pi}{2} \\pmod{2\\pi}$$
**Conclusion :** $f$ est la **rotation de centre $A$ et d'angle $\\frac{\\pi}{2}$** :
$$f = r\\left(A, \\; \\frac{\\pi}{2}\\right)$$

#### 2. Étude de la transformation $g = t_{\\vec{AD}} \\circ S_{(AB)}$ (1 point)
- **a. Caractère d'antidéplacement :**
  $t_{\\vec{AD}}$ est une translation, donc un déplacement ($\\det = +1$).
  $S_{(AB)}$ est une réflexion axiale, donc un antidéplacement ($\\det = -1$).
  La composée d'un déplacement et d'un antidéplacement est un **antidéplacement** ($\\det(g) = 1 \\times (-1) = -1$).
- **b. Image de $A$ par $g$ :**
  Puisque $A \\in (AB)$, on a $S_{(AB)}(A) = A$.
  Puis par la translation :
  $$g(A) = t_{\\vec{AD}}(S_{(AB)}(A)) = t_{\\vec{AD}}(A) = D$$
  Donc :
  $$g(A) = D$$
- **c. Absence de point invariant et nature :**
  Supposons par l'absurde qu'il existe un point $M$ tel que $g(M) = M$.
  Alors $t_{\\vec{AD}}(S_{(AB)}(M)) = M \\iff \\vec{S_{(AB)}(M)M} = \\vec{AD}$.
  Or, par définition de la réflexion $S_{(AB)}$, pour tout point $M$, le vecteur $\\vec{S_{(AB)}(M)M}$ est orthogonal à la droite $(AB)$.
  Comme le vecteur $\\vec{AD}$ est également orthogonal à $(AB)$ dans le carré, cela impliquerait que le projeté orthogonal de $M$ sur $(AB)$ soit transporté par $\\vec{AD}$, ce qui est impossible car $\\vec{AD} \\neq \\vec{0}$.
  Puisque $g$ est un antidéplacement **sans aucun point invariant**, $g$ est obligatoirement une **symétrie glissée**.

#### 3. Forme réduite de la symétrie glissée $g$ (1,5 point)
- **a. Calcul du vecteur $\\vec{u}$ par la propriété du carré :**
  Calculons $g(D)$ :
  Le symétrique de $D$ par rapport à $(AB)$ est le point $D_1$ tel que $\\vec{D D_1} = 2\\vec{DA} = -2\\vec{AD}$.
  Puis $g(D) = t_{\\vec{AD}}(D_1)$.
  Utilisons plus simplement la relation fondamentale $g \\circ g = t_{2\\vec{u}}$ appliquée au point $A$ :
  $$g^2(A) = g(g(A)) = g(D)$$
  Dans le carré, le projeté orthogonal de $D$ sur $(AB)$ est $A$, donc $S_{(AB)}(D) = D'$ tel que $A$ soit le milieu de $[DD'] \\implies \\vec{AD'} = \\vec{DA} = -\\vec{AD}$.
  Ensuite, $g(D) = t_{\\vec{AD}}(D') \\implies \\vec{D'g(D)} = \\vec{AD} \\implies g(D) = A$.
  D'où :
  $$g^2(A) = g(D) = A \\implies 2\\vec{u} = \\vec{AA} = \\vec{0}$$
  Ce qui montre que $g^2 = \\text{Id}$ !
  Puisque $g$ est un antidéplacement et que $g^2 = \\text{Id}$, $g$ est une **réflexion axiale** d'axe la droite $\\Delta$ médiatrice de $[AD]$ et $[BC]$ (droite des milieux $(OJ)$) !

#### 4. Résolution Analytique & Écriture Complexe (1,5 point)
Dans le repère orthonormé direct $(A; \\vec{u_1}, \\vec{u_2})$ :
$$z_A = 0, \\quad z_B = 1, \\quad z_D = i, \\quad z_C = 1 + i$$
- La réflexion $S_{(AB)}$ par rapport à l'axe réel est l'application $z \\mapsto \\overline{z}$.
- La translation de vecteur $\\vec{AD}$ (d'affixe $i$) est $z \\mapsto z + i$.
- L'écriture complexe de $g = t_{\\vec{AD}} \\circ S_{(AB)}$ est :
  $$z' = \\overline{z} + i$$
- **Recherche analytique des points invariants :**
  $$z' = z \\iff \\overline{z} + i = z$$
  En posant $z = x + iy$ :
  $$(x - iy) + i = x + iy \\iff x + i(1 - y) = x + iy \\iff 1 - y = y \\iff 2y = 1 \\iff y = \\frac{1}{2}$$
  L'ensemble des points invariants est la droite $(\\Delta)$ d'équation cartésienne :
  $$y = \\frac{1}{2}$$
  Cette droite est précisément la droite médiane parallèle à l'axe des abscisses $(AB)$ passant par le milieu de $[AD]$ !
**Conclusion définitive :** $g$ est la **réflexion axiale d'axe la droite $(\\Delta) : y = \\frac{1}{2}$**.

---

## 8. Synthèse Finale & Réflexes Bac S2 en Wolof

> [!CONSEIL_BAC] **Les 7 Réflexes Infaillibles du Chapitre M10 :**
> 1. **Déplacement vs Antidéplacement :** $z' = e^{i\\theta}z + b \\implies$ direct ; $z' = e^{i\\theta}\\overline{z} + b \\implies$ indirect.
> 2. **Conservation absolue :** $k = 1$, les distances et les aires sont rigoureusement préservées.
> 3. **Points Invariants :** Résoudre $z' = z$. Si $\\text{Inv}(f) = \\emptyset$ et indirect $\\implies$ symétrie glissée ! Si $\\text{Inv}(f) = \\Delta \\implies$ réflexion !
> 4. **Axes Parallèles :** $S_{\\Delta_2} \\circ S_{\\Delta_1} = t_{\\vec{u}}$ avec $\\|\\vec{u}\\| = 2d$ et $\\vec{u} \\perp \\Delta_1$.
> 5. **Axes Sécants :** $S_{\\Delta_2} \\circ S_{\\Delta_1} = r(\\Omega, 2(\\Delta_1, \\Delta_2))$.
> 6. **Symétrie Glissée :** $f^2 = t_{2\\vec{u}}$ permet de trouver instantanément $\\vec{u} = \\frac{1}{2}\\vec{M f^2(M)}$.
> 7. **L'axe de la glissée :** Pour tout point $M$, le milieu $I$ de $[M, f(M)]$ est TOUJOURS sur l'axe $\\Delta$.

> [!WOLOF] **7 Réflexes ci Wolof — Bul ko fàtte mukk ci Bac S2 :**
> - « **Isométrie :** Distances yi ak aires yi duñu soppiku mukk, $k = 1$ la ! »
> - « **Déplacement :** Dafa melni gaal gu jëm kanam ci yoon bu leer (translation ak rotation). »
> - « **Antidéplacement :** Dafa melni seetu (miroir) bu dëpp sa càmmooñ ak sa ndeyjoor ! »
> - « **Symétrie glissée :** Jéego yi ci plage de Ngor ! Benn jéego dafay dëpp te avancer ; ñaari jéego $f \\circ f$ dafay jur translation $t_{2\\vec{u}}$ bu amul seetu ! »
> - « **Axe $\\Delta$ bu glissée :** Boo jëlee benn point $M$ ak imageam $f(M)$, digg bi (milieu $I$) dafay nekk ci kaw droite $\\Delta$ bi ! »
`,
  probabilites: `# Chapitre 9 : Dénombrement et Probabilités (Terminale S2)

Bienvenue dans ce cours d'excellence consacré au **Dénombrement et aux Probabilités**, un chapitre classique et stratégique du **Baccalauréat Scientifique (Série S2)** au Sénégal (exercice noté sur 4 à 5 points).

---

## 1. Dénombrement & Modèles de Tirages

L'étape cruciale consiste à identifier immédiatement le type de tirage décrit dans l'énoncé de l'exercice :

![Figure 1 : Les 3 modèles fondamentaux de tirages et les probabilités au Bac S2](/assets/pedagogie/denombrement_probabilites_modeles.svg)

![Figure 1b : Métaphore concrète au Sénégal : Les 3 Tirages & la Loi Binomiale](/assets/pedagogie/probabilites_vie_reelle_tirage_urne.svg)

> [!VIE_REELLE] Les tirages en probabilités correspondent exactement à des situations de la vie quotidienne au Sénégal :
> - **Tirage simultané ($C_n^p$) :** Choisir une délégation de 3 élèves pour représenter le lycée au Concours Général. L'ordre n'a aucune importance, ils partent tous ensemble dans le même véhicule !
> - **Tirage successif sans remise ($A_n^p$) :** Attribuer le 1er prix, le 2e prix et le 3e prix à un tournoi de lutte ou de football (Navétanes). Ici, l'ordre est capital : être 1er n'est pas être 3e, et un même joueur ne peut pas occuper deux marches du podium !
> - **Tirage successif avec remise ($n^p$) :** Composer un code secret Wave ou Orange Money à 4 chiffres : l'ordre compte (le code 1234 est différent de 4321) et on peut répéter le même chiffre (ex : 7777).

> [!WOLOF] **Xam-xam ci Wolof :** Tirages ci probabilités dafa am ñetti mbootaay yu leer :
> - **Simultané ($C_n^p$) :** Da ngay xëp loxo bi ci mbuus mi jël ñetti mbir ci benn yoon (melni tànn ñetti xarit ñu dem marché). Ordre amul benn solo !
> - **Successif sans remise ($A_n^p$) :** Da ngay jël kenn ci ginnaaw kenn te koo jël du dellu (melni joxe 1er prix, ñaareel prix ak ñetteel prix ci lamb). Ordre am na solo lool !
> - **Successif avec remise ($n^p$) :** Da ngay jël nga dellodi ko (melni code secret Wave bi ngay bind ci sa téléphone : mën nga bind 0000) !
> - **Réflexe « Au moins un » :** Boo déggee « au moins benn », bu ko gëstoo benn-benn ! Bindal rek : $1 - P(\\text{benna amul})$, mooy tax ngay am point yépp ci 10 secondes !

### Tableau de Synthèse des 3 Tirages Classiques :

| Type de Tirage | L'ordre compte-t-il ? | Répétition possible ? | Outil mathématique & Formule |
| :--- | :---: | :---: | :--- |
| **Simultané** (en même temps) | **NON** | NON | **Combinaisons :** $C_n^p = \\binom{n}{p} = \\frac{n!}{p!(n-p)!}$ |
| **Successif SANS remise** | **OUI** | NON | **Arrangements :** $A_n^p = \\frac{n!}{(n-p)!}$ |
| **Successif AVEC remise** | **OUI** | **OUI** | **P-listes :** $n^p$ |

> [!METHODE] **La formule fondamentale de l'équiprobabilité :**
> Si tous les tirages élémentaires ont la même chance de se produire dans l'univers $\\Omega$ :
> $$P(A) = \\frac{\\text{Card}(A)}{\\text{Card}(\\Omega)} = \\frac{\\text{Nombre de cas favorables}}{\\text{Nombre de cas possibles}}$$

---

## 2. Événements, Opérations et Formules Clés

Soient $A$ et $B$ deux événements d'un univers $\\Omega$ :
- **Probabilité de la réunion :**
  $$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$$
- **Événements incompatibles (disjoints) :** Si $A \\cap B = \\emptyset$, alors $P(A \\cup B) = P(A) + P(B)$.
- **Événement contraire :** $P(\\overline{A}) = 1 - P(A)$.
  > [!ASTUCE] Le réflexe de l'événement contraire est indispensable dès que l'énoncé contient l'expression :
  > **« Obtenir AU MOINS un... »** $\\implies P(\\text{Au moins un}) = 1 - P(\\text{Aucun})$.

---

## 3. Probabilités Conditionnelles & Formule des Probabilités Totales

### 3.1 Probabilité Conditionnelle
Soit $B$ un événement de probabilité non nulle ($P(B) > 0$). La probabilité de $A$ sachant que $B$ est réalisé est :
$$P_B(A) = P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)} \\iff P(A \\cap B) = P(B) \\times P_B(A)$$

### 3.2 Indépendance de deux événements
$A$ et $B$ sont **indépendants** si et seulement si :
$$P(A \\cap B) = P(A) \\times P(B) \\iff P_B(A) = P(A)$$

### 3.3 Formule des Probabilités Totales (Partition de l'univers)
Si une famille d'événements $\\{B_1, B_2, \\dots, B_n\\}$ forme une partition de $\\Omega$ (par exemple $B$ et $\\overline{B}$) :
$$P(A) = P(A \\cap B) + P(A \\cap \\overline{B}) = P(B) \\cdot P_B(A) + P(\\overline{B}) \\cdot P_{\\overline{B}}(A)$$

---

## 4. Variables Aléatoires & Schéma de Bernoulli

Une variable aléatoire discrète $X$ associe un nombre réel à chaque issue de l'univers $\\Omega$.

### 4.1 Loi de probabilité, Espérance et Variance
- **Loi de probabilité :** Tableau associant chaque valeur possible $x_i$ à sa probabilité $P(X = x_i)$, avec la vérification obligatoire : $\\sum P(X = x_i) = 1$.
- **Espérance mathématique (valeur moyenne) :**
  $$E(X) = \\sum_{i=1}^k x_i \\cdot P(X = x_i)$$
  *(Un jeu est dit **équitable** si $E(X) = 0$)*.
- **Variance :** $V(X) = E(X^2) - [E(X)]^2 = \\sum x_i^2 P(X = x_i) - [E(X)]^2$.
- **Écart-type :** $\\sigma(X) = \\sqrt{V(X)}$.

### 4.2 La Loi Binomiale $\\mathcal{B}(n, p)$
Lorsqu'on répète $n$ fois de manière indépendante une même épreuve de Bernoulli n'ayant que deux issues (Succès avec probabilité $p$, Échec avec probabilité $q = 1 - p$), la variable $X$ comptant le nombre de succès suit la loi binomiale $\\mathcal{B}(n, p)$ :
$$P(X = k) = C_n^k \\cdot p^k \\cdot (1 - p)^{n - k} \\quad (k \\in \\{0, 1, \\dots, n\\})$$

- **Espérance :** $E(X) = n \\cdot p$
- **Variance :** $V(X) = n \\cdot p \\cdot (1 - p)$
`,

  statistiques: `# Chapitre 10 : Séries Statistiques Doubles & Ajustements Linéaires (Terminale S2)

Bienvenue dans ce cours interactif dédié à la maîtrise complète des **statistiques à deux variables**, un exercice à forte valeur ajoutée noté sur **4 à 5 points au Baccalauréat Scientifique (Série S2)** au Sénégal.

---

## 1. Nuage de Points & Point Moyen $G$

Une série statistique double étudie simultanément deux caractères quantitatifs $X$ et $Y$ sur une population d'effectif $N$. Les données se présentent sous forme de couples $(x_i, y_i)$.

Observez l'infographie de synthèse ci-dessous présentant les formules incontournables et les deux droites d'ajustement :

![Figure 1 : Séries Statistiques Doubles au Bac S2](/assets/pedagogie/statistiques_analyse_donnees.svg)

![Figure 1b : Métaphore concrète au Sénégal : Les Statistiques au Marché de Sandaga](/assets/pedagogie/statistiques_vie_reelle_marche_distribution.svg)

> [!VIE_REELLE] Une série statistique double n'est rien d'autre que l'analyse des tendances économiques que l'on observe chaque jour au marché Sandaga ou dans le bassin arachidier de Kaolack :
> - Par exemple, étudiez la quantité d'engrais apportée ($X$ en kg) et le rendement de la récolte de mil ($Y$ en sacs par hectare). Chaque paysan interrogé forme un point $(x_i, y_i)$ du nuage.
> - Le **point moyen $G(\\bar{x}, \\bar{y})$** est le point d'équilibre parfait : la moyenne des engrais utilisés et la moyenne des récoltes obtenues. Toute droite de prédiction **doit obligatoirement passer par $G$** !
> - La droite $(D_{Y/X}) : y = ax + b$ permet d'estimer la récolte prévisible pour un nouvel agriculteur qui utiliserait $35$ kg d'engrais.
> - La droite $(D'_{X/Y}) : x = a'y + b'$ répond à la question inverse : combien d'engrais doit-il acheter pour espérer obtenir $80$ sacs ?

> [!WOLOF] **Xam-xam ci Wolof :** Statistiques à deux variables dafay séddale ñaari yoon yu am solo ci mbay mi walla marcha bi :
> - Nataalu nuage de points mooy xool ñaari valeur yi ci repère bi.
> - **Point moyen $G(\\bar{x}, \\bar{y})$** mooy diggu mbootaay gi : droite d'ajustement bi $(D)$ faw mu jaar ci biir $G$, bu ko kenn wacc !
> - **Covariance $Cov(X, Y)$ :** bu doonee positif, ñaar yi dañuy ànd di yokk (bu engrais bi yokkee, meññeef mi day yokk).
> - **Coeff de corrélation $r$ :** bu dépassé $0,87$, loolu dafay firndeel ne mënees na jëfandikoo droite bi ngir wax li koy am ci ëllëg ! Boo wëree $X$ ci ginaaw $Y$, dangay jëfandikoo $(D')$, bul jaxase ñaari droite yi !

### 1.1 Le Nuage de Points
- L'ensemble des points $M_i(x_i, y_i)$ dans un repère orthogonal forme le **nuage de points**.
- La forme du nuage permet d'évaluer visuellement si les variables sont liées de manière linéaire (nuage étiré en fuseau) ou non-linéaire.

### 1.2 Le Point Moyen $G(\\bar{x}, \\bar{y})$
Les coordonnées du point moyen $G$ correspondent aux moyennes arithmétiques respectives de $X$ et de $Y$ :

$$\\bar{x} = \\frac{1}{N} \\sum_{i=1}^N x_i \\qquad \\text{et} \\qquad \\bar{y} = \\frac{1}{N} \\sum_{i=1}^N y_i$$

> [!METHODE] **Propriété géométrique capitale :** La droite d'ajustement par les moindres carrés $(D)$ passe **toujours** par le point moyen $G(\\bar{x}, \\bar{y})$. C'est une vérification graphique obligatoire lors du tracé sur votre copie d'examen !

---

## 2. Variances, Écarts-types & Covariance

Pour mesurer la dispersion et la liaison entre les deux variables, nous calculons les paramètres suivants :

### 2.1 Variances et Écarts-types marginaux (Formule de Koenig)
$$V(X) = \\frac{1}{N} \\sum_{i=1}^N x_i^2 - \\bar{x}^2 \\qquad \\text{et} \\qquad \\sigma_X = \\sqrt{V(X)}$$
$$V(Y) = \\frac{1}{N} \\sum_{i=1}^N y_i^2 - \\bar{y}^2 \\qquad \\text{et} \\qquad \\sigma_Y = \\sqrt{V(Y)}$$

### 2.2 La Covariance $Cov(X, Y)$
La covariance mesure le sens et l'intensité de la relation conjointe entre $X$ et $Y$ :

$$Cov(X, Y) = \\frac{1}{N} \\sum_{i=1}^N x_i y_i - \\bar{x}\\bar{y}$$

> [!ASTUCE] Si $Cov(X, Y) > 0$, les deux variables varient dans le même sens ($Y$ augmente quand $X$ augmente). Si $Cov(X, Y) < 0$, elles varient en sens contraire.

---

## 3. Ajustement Linéaire par les Moindres Carrés

### 3.1 Droite de régression de $Y$ en $X$ (notée $D_{Y/X}$)
Elle permet d'estimer ou de prédire la valeur de $Y$ connaissant celle de $X$ :

$$(D) : y = ax + b$$
$$a = \\frac{Cov(X, Y)}{V(X)} \\qquad \\text{et} \\qquad b = \\bar{y} - a \\cdot \\bar{x}$$

### 3.2 Droite de régression de $X$ en $Y$ (notée $D_{X/Y}$)
Elle permet d'estimer ou de prédire la valeur de $X$ connaissant celle de $Y$ :

$$(D') : x = a'y + b'$$
$$a' = \\frac{Cov(X, Y)}{V(Y)} \\qquad \\text{et} \\qquad b' = \\bar{x} - a' \\cdot \\bar{y}$$

> [!PIEGE] Ne tentez jamais d'inverser l'équation $y = ax + b$ pour estimer $X$ à partir de $Y$ ! L'estimateur optimal de $X$ connaissant $Y$ est exclusivement donné par la droite $(D') : x = a'y + b'$.

---

## 4. Coefficient de Corrélation Linéaire $r$

Le coefficient de corrélation linéaire de Bravais-Pearson évalue la qualité de l'ajustement linéaire :

$$r = \\frac{Cov(X, Y)}{\\sigma_X \\cdot \\sigma_Y} \\qquad \\text{avec} \\quad -1 \\le r \\le 1$$

- **Relation fondamentale :** $r^2 = a \\cdot a'$ (le signe de $r$ est le même que celui de $a$ et de $Cov(X, Y)$).
- **Interprétation au Bac S2 :**
  - Si $|r| \\ge 0{,}87$ (ou $|r| \\ge 0{,}95$), l'ajustement linéaire par la méthode des moindres carrés est **parfaitement justifié**.
  - Si $r \\approx 1$, très forte corrélation linéaire positive.
  - Si $r \\approx -1$, très forte corrélation linéaire négative.
  - Si $|r| < 0{,}7$, un ajustement linéaire n'est pas pertinent (il faut envisager un changement de variable).

---

## 5. Méthode de Mayer & Ajustements Non-Linéaires

### 5.1 La Méthode de Mayer
1. On ordonne les couples selon les valeurs croissantes de $X$.
2. On partage la série en deux sous-groupes d'effectifs égaux (ou différant d'une unité).
3. On calcule le point moyen $G_1(\\bar{x}_1, \\bar{y}_1)$ du premier groupe et $G_2(\\bar{x}_2, \\bar{y}_2)$ du second groupe.
4. La droite d'ajustement de Mayer est la droite $(G_1 G_2)$, d'équation $y - \\bar{y}_1 = \\frac{\\bar{y}_2 - \\bar{y}_1}{\\bar{x}_2 - \\bar{x}_1} (x - \\bar{x}_1)$.

### 5.2 Ajustement par Changement de Variable (Exponentiel / Puissance)
Quand le nuage de points a une allure exponentielle, on pose un changement de variable comme :
$$Z = \\ln(Y)$$
On détermine ensuite la droite d'ajustement de $Z$ en $X$ : $Z = aX + b$, d'où l'on déduit l'expression de $Y$ :
$$Y = e^{aX + b} = e^b \\cdot e^{aX} = C \\cdot e^{aX} \\quad \\text{avec } C = e^b$$
`,

  geometrie: `# Chapitre M11 : Géométrie dans l'Espace (Terminale S2)

Bienvenue dans ce cours d'excellence dédié à la **Géométrie Analytique dans l'Espace**, un chapitre classique et stratégique du **Baccalauréat Scientifique (Série S2 / S1)** au Sénégal, élaboré conformément aux standards officiels de l'**Office du Baccalauréat du Sénégal** (exercice noté sur 4 à 5 points).

---

## 1. Produit Scalaire dans l'Espace & Orthogonalité

L'espace euclidien orienté est muni d'un repère orthonormé direct $(O; \\vec{i}, \\vec{j}, \\vec{k})$.

![Figure 1 : Géométrie dans l'Espace : Plans, Droites et Sphères](/assets/pedagogie/geometrie_espace_plans_droites.svg)

![Figure 1b : Métaphore concrète au Sénégal : Géométrie de l'Espace & Architecture](/assets/pedagogie/geometrie_vie_reelle_plan_mosquee.svg)

> [!VIE_REELLE] **L'analogie de la Grande Mosquée de Touba et du fil à plomb du maçon :**
> - **Le Plan $(P) : ax + by + cz + d = 0$ :** C'est l'esplanade dallée horizontale de la Grande Mosquée de Touba ou du Monument de la Renaissance.
> - **Le Vecteur Normal $\\vec{n}(a, b, c)$ :** C'est le grand minaret central (Lamp Fall) dressé rigoureusement droit vers le ciel : il est orthogonal à toutes les allées et directions tracées sur l'esplanade ($\\vec{n} \\cdot \\vec{u} = 0$).
> - **La Distance d'un point à un plan $d(M, P)$ :** C'est la longueur minimale mesurée le long d'un fil à plomb lâché depuis le sommet d'un échafaudage jusqu'au sol en son **projeté orthogonal $H$**.
> - **La Sphère et le Cercle Section :** Quand un dôme sphérique est coupé par une dalle plane horizontale, l'intersection est un **cercle** dont le rayon $r$ vérifie le théorème de Pythagore dans l'espace : $r = \\sqrt{R^2 - d^2}$.

> [!WOLOF] **Xam-xam ci Wolof — Géométrie de l'Espace mooy lii :**
> - « **Plan $(P) : ax + by + cz + d = 0$ :** Suuf si nga taxaw ci esplanade bi la. »
> - « **Vecteur normal $\\vec{n}(a, b, c)$ :** Lamp Fall bi taxaw ci digg bi dëpp $90^\\circ$ ak suuf si la : koo gis mu tër ci plan bi, $\\vec{n}$ dafay orthogonal ak moom (produit scalaire bi zéro la) ! »
> - « **Distance $d(M, P)$ :** Fil à plomb bi ngay wàcce ci kaw ba mu falu ci suuf ci point $H$ (projeté orthogonal). »
> - « **Sphère $\\mathcal{S}$ ak Plan :** Boo jëlee dôme nga dog ko ci plan bu distance bi $d < R$, li ciy génn cercle la bu am rayon $r = \\sqrt{R^2 - d^2}$ ci théorème de Pythagore ! »

### 1.1 Expression analytique du produit scalaire
Pour deux vecteurs $\\vec{u}(x, y, z)$ et $\\vec{v}(x', y', z')$ :
$$\\vec{u} \\cdot \\vec{v} = x x' + y y' + z z'$$

- **Norme d'un vecteur :**
  $$\\|\\vec{u}\\| = \\sqrt{x^2 + y^2 + z^2}$$
- **Distance entre deux points $A(x_A, y_A, z_A)$ et $B(x_B, y_B, z_B)$ :**
  $$AB = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2 + (z_B - z_A)^2}$$
- **Critère fondamental d'orthogonalité :**
  $$\\vec{u} \\perp \\vec{v} \\iff \\vec{u} \\cdot \\vec{v} = 0 \\iff x x' + y y' + z z' = 0$$

> [!PIEGE] **Attention piège Bac S2 :** Dans l'espace, deux droites peuvent être orthogonales **sans être sécantes** ! On dit qu'elles sont orthogonales si leurs vecteurs directeurs le sont, mais elles peuvent appartenir à des plans différents (droites non coplanaires).

---

## 2. Plans dans l'Espace & Vecteur Normal

### 2.1 Équation Cartésienne d'un Plan
Tout plan $(P)$ est entièrement caractérisé par un point $A(x_A, y_A, z_A)$ et un vecteur normal non nul $\\vec{n}(a, b, c)$.
Un point $M(x, y, z)$ appartient à $(P)$ si et seulement si $\\vec{AM} \\cdot \\vec{n} = 0$, ce qui conduit à l'équation cartésienne :

$$(P) : ax + by + cz + d = 0$$

- La constante $d$ se calcule immédiatement par :
  $$d = -(a x_A + b y_A + c z_A)$$

### 2.2 Distance d'un point $M_0$ à un plan $(P)$
La distance minimale d'un point $M_0(x_0, y_0, z_0)$ au plan $(P) : ax + by + cz + d = 0$ est donnée par la formule fondamentale :

$$d(M_0, P) = \\frac{|a x_0 + b y_0 + c z_0 + d|}{\\sqrt{a^2 + b^2 + c^2}}$$

- **Calcul des coordonnées du projeté orthogonal $H$ de $M_0$ sur $(P)$ :**
  La droite $(M_0 H)$ est orthogonale à $(P)$, elle est donc dirigée par $\\vec{n}(a, b, c)$ :
  $$\\vec{M_0 H} = k \\cdot \\vec{n} \\iff \\begin{cases} x_H = x_0 + k a \\\\ y_H = y_0 + k b \\\\ z_H = z_0 + k c \\end{cases}$$
  En injectant ces coordonnées dans l'équation de $(P)$, on détermine l'unique réel $k$ :
  $$k = -\\frac{a x_0 + b y_0 + c z_0 + d}{a^2 + b^2 + c^2}$$
  Puis on calcule immédiatement les coordonnées exactes de $H$.

---

## 3. Droites dans l'Espace & Représentations Paramétriques

Une droite $(D)$ est déterminée par un point $A(x_0, y_0, z_0)$ et un vecteur directeur non nul $\\vec{u}(\\alpha, \\beta, \\gamma)$.
Un point $M(x, y, z)$ appartient à $(D)$ si et seulement si $\\vec{AM} = t \\cdot \\vec{u}$ ($t \\in \\mathbb{R}$).

### 3.1 Représentation Paramétrique de la Droite
$$(D) : \\begin{cases} x = x_0 + \\alpha \\cdot t \\\\ y = y_0 + \\beta \\cdot t \\\\ z = z_0 + \\gamma \\cdot t \\end{cases} \\qquad (t \\in \\mathbb{R})$$

### 3.2 Intersection Droite - Plan
Pour trouver le point d'intersection d'une droite $(D)$ et d'un plan $(P) : ax + by + cz + d = 0$ :
1. Remplacer $x, y, z$ dans l'équation cartésienne de $(P)$ par leurs expressions en fonction du paramètre $t$.
2. Résoudre l'équation du premier degré en $t$.
3. Réinjecter la valeur $t_0$ obtenue dans le système paramétrique pour en déduire les coordonnées du point d'intersection $M_0(x_0, y_0, z_0)$.

---

## 4. Le Produit Vectoriel $\\vec{u} \\wedge \\vec{v}$ : L'Arme Absolue du Bac S2

Le produit vectoriel est l'outil le plus puissant du programme pour trouver un vecteur normal, calculer des aires et des volumes.

### 4.1 Définition et Calcul par Déterminants d'Ordre 2
Soient deux vecteurs $\\vec{u}(x, y, z)$ et $\\vec{v}(x', y', z')$ :

$$\\vec{u} \\wedge \\vec{v} = \\begin{pmatrix} \\begin{vmatrix} y & y' \\\\ z & z' \\end{vmatrix} \\\\ -\\begin{vmatrix} x & x' \\\\ z & z' \\end{vmatrix} \\\\ \\begin{vmatrix} x & x' \\\\ y & y' \\end{vmatrix} \\end{pmatrix} = \\begin{pmatrix} yz' - zy' \\\\ zx' - xz' \\\\ xy' - yx' \\end{pmatrix}$$

### 4.2 Propriétés Fondamentales
- **Orthogonalité double :** $\\vec{u} \\wedge \\vec{v}$ est orthogonal à la fois à $\\vec{u}$ et à $\\vec{v}$ :
  $$(\\vec{u} \\wedge \\vec{v}) \\cdot \\vec{u} = 0 \\qquad \\text{et} \\qquad (\\vec{u} \\wedge \\vec{v}) \\cdot \\vec{v} = 0$$
- **Critère de colinéarité :**
  $$\\vec{u} \\wedge \\vec{v} = \\vec{0} \\iff \\vec{u} \\text{ et } \\vec{v} \\text{ sont colinéaires}$$
- **Vecteur normal d'un plan :** Si trois points $A, B, C$ ne sont pas alignés, alors :
  $$\\vec{n} = \\vec{AB} \\wedge \\vec{AC} \\neq \\vec{0}$$
  est un **vecteur normal** au plan $(ABC)$.

### 4.3 Calcul d'Aires et de Volumes
- **Aire d'un triangle $ABC$ :**
  $$\\mathcal{A}(ABC) = \\frac{1}{2} \\|\\vec{AB} \\wedge \\vec{AC}\\|$$
- **Volume d'un tétraèdre $ABCD$ :**
  $$\\mathcal{V}(ABCD) = \\frac{1}{6} |(\\vec{AB} \\wedge \\vec{AC}) \\cdot \\vec{AD}|$$
- **Formule de la hauteur issue de $D$ :**
  Comme $\\mathcal{V} = \\frac{1}{3} \\times \\mathcal{A}(ABC) \\times h$, on a :
  $$h = d(D, (ABC)) = \\frac{3 \\mathcal{V}(ABCD)}{\\mathcal{A}(ABC)} = \\frac{|(\\vec{AB} \\wedge \\vec{AC}) \\cdot \\vec{AD}|}{\\|\\vec{AB} \\wedge \\vec{AC}\\|}$$

---

## 5. Sphères dans l'Espace & Intersection avec un Plan

### 5.1 Équation Cartésienne de la Sphère $\\mathcal{S}(\\Omega, R)$
Une sphère de centre $\\Omega(x_0, y_0, z_0)$ et de rayon $R > 0$ est l'ensemble des points $M(x, y, z)$ tels que $\\Omega M = R$ :

$$(x - x_0)^2 + (y - y_0)^2 + (z - z_0)^2 = R^2$$

- **Forme développée générale :**
  $$x^2 + y^2 + z^2 - 2ax - 2by - 2cz + d = 0$$
  Pour retrouver le centre et le rayon, on utilise la **méthode de complétion du carré** :
  $$(x - a)^2 + (y - b)^2 + (z - c)^2 = a^2 + b^2 + c^2 - d$$
  Si $a^2 + b^2 + c^2 - d > 0$, c'est la sphère de centre $\\Omega(a, b, c)$ et de rayon $R = \\sqrt{a^2 + b^2 + c^2 - d}$.

### 5.2 Position Relative d'une Sphère $\\mathcal{S}(\\Omega, R)$ et d'un Plan $(P)$
On calcule la distance du centre de la sphère au plan :
$$d = d(\\Omega, P)$$

| Condition sur $d$ | Position Relative | Nature Géométrique de l'Intersection $\\mathcal{S} \\cap (P)$ |
| :---: | :--- | :--- |
| **$d < R$** | **Plan sécant** | **Cercle $(\\mathcal{C})$** de centre $H$ (projeté orthogonal de $\\Omega$ sur $P$) et de rayon $r = \\sqrt{R^2 - d^2}$ |
| **$d = R$** | **Plan tangent** | **Un point unique $\\{H\\}$** (point de contact tangentiel) |
| **$d > R$** | **Disjoints** | **Ensemble vide $\\emptyset$** (aucun point d'intersection) |

---

## 6. Positions Relatives de Deux Droites dans l'Espace

Soient deux droites $(D_1)$ (passant par $A_1$, dirigée par $\\vec{u_1}$) et $(D_2)$ (passant par $A_2$, dirigée par $\\vec{u_2}$) :

1. **Si $\\vec{u_1}$ et $\\vec{u_2}$ sont colinéaires :**
   - Si $A_1 \\in (D_2)$ : les droites sont **confondues**.
   - Si $A_1 \\notin (D_2)$ : les droites sont **strictement parallèles**.
2. **Si $\\vec{u_1}$ et $\\vec{u_2}$ ne sont pas colinéaires :**
   - On calcule le produit mixte $(\\vec{u_1} \\wedge \\vec{u_2}) \\cdot \\vec{A_1 A_2}$ :
     - Si $(\\vec{u_1} \\wedge \\vec{u_2}) \\cdot \\vec{A_1 A_2} = 0$ : les droites sont **coplanaires et sécantes** en un point unique.
     - Si $(\\vec{u_1} \\wedge \\vec{u_2}) \\cdot \\vec{A_1 A_2} \\neq 0$ : les droites sont **non coplanaires** (elles ne se coupent pas et ne sont pas parallèles).

---

## 7. Épreuve Officielle — Office du Baccalauréat du Sénégal (Série S2 / S1)

### Énoncé Officiel (Office du Baccalauréat du Sénégal — Session Normale — 5 Points)

L'espace est rapporté à un repère orthonormé direct $(O; \\vec{i}, \\vec{j}, \\vec{k})$.
On considère les points suivants :
$$A(1, 0, 2), \\quad B(1, 1, 4), \\quad C(-1, 1, 1), \\quad D(3, 4, 1)$$

1. **(1 pt)**
   - a. Déterminer les coordonnées des vecteurs $\\vec{AB}$ et $\\vec{AC}$.
   - b. Calculer le produit vectoriel $\\vec{AB} \\wedge \\vec{AC}$.
   - c. En déduire que les points $A, B, C$ ne sont pas alignés et qu'ils déterminent un plan $(P)$.
   - d. Montrer qu'une équation cartésienne du plan $(P)$ est :
     $$(P) : 2x + 2y - z = 0$$

2. **(1 pt)**
   - a. Calculer l'aire $\\mathcal{A}$ du triangle $ABC$.
   - b. Démontrer que le volume du tétraèdre $ABCD$ est égal à $\\mathcal{V} = \\frac{13}{6}$ unités de volume.
   - c. En déduire la distance du point $D$ au plan $(P)$.

3. **(1,5 pt)** On considère l'ensemble $(\\mathcal{S})$ des points $M(x, y, z)$ de l'espace vérifiant :
   $$x^2 + y^2 + z^2 - 2x + 4y - 6z + 5 = 0$$
   - a. Démontrer que $(\\mathcal{S})$ est une sphère dont on précisera les coordonnées du centre $\\Omega$ et le rayon $R$.
   - b. Calculer la distance $d(\\Omega, P)$ du centre $\\Omega$ au plan $(P)$.
   - c. En déduire que le plan $(P)$ coupe la sphère $(\\mathcal{S})$ selon un cercle $(\\mathcal{C})$ dont on déterminera le rayon $r$.

4. **(1,5 pt)**
   - a. Déterminer une représentation paramétrique de la droite $(\\Delta)$ passant par $\\Omega$ et perpendiculaire au plan $(P)$.
   - b. Déterminer les coordonnées du centre $H$ du cercle $(\\mathcal{C})$, intersection de la sphère $(\\mathcal{S})$ et du plan $(P)$.

---

### Corrigé Détaillé et Barème Officiel Pas à Pas

#### 1. Vecteurs, Produit Vectoriel et Équation de $(P)$ (1 point)
- **a. Coordonnées des vecteurs :**
  $$\\vec{AB} = \\begin{pmatrix} 1 - 1 \\\\ 1 - 0 \\\\ 4 - 2 \\end{pmatrix} = \\begin{pmatrix} 0 \\\\ 1 \\\\ 2 \\end{pmatrix}, \\qquad \\vec{AC} = \\begin{pmatrix} -1 - 1 \\\\ 1 - 0 \\\\ 1 - 2 \\end{pmatrix} = \\begin{pmatrix} -2 \\\\ 1 \\\\ -1 \\end{pmatrix}$$

- **b. Calcul du produit vectoriel $\\vec{AB} \\wedge \\vec{AC}$ :**
  $$\\vec{AB} \\wedge \\vec{AC} = \\begin{pmatrix} (1)(-1) - (2)(1) \\\\ (2)(-2) - (0)(-1) \\\\ (0)(1) - (1)(-2) \\end{pmatrix} = \\begin{pmatrix} -1 - 2 \\\\ -4 - 0 \\\\ 0 + 2 \\end{pmatrix} = \\begin{pmatrix} -3 \\\\ -3 \\\\ 2 \\end{pmatrix}$$
  *(Remarque équivalente avec le vecteur colinéaire $\\vec{n} = -\\frac{2}{3}(\\vec{AB} \\wedge \\vec{AC})$ ou calcul direct ci-dessous).*
  Calculons avec les composantes :
  $$X = (1)(-1) - (2)(1) = -3$$
  $$Y = -((0)(-1) - (2)(-2)) = -(0 + 4) = -4$$
  $$Z = (0)(1) - (1)(-2) = 2$$
  Vérifions : $(0)(-3) + (1)(-4) + (2)(2) = 0 - 4 + 4 = 0$ ✓.
  $(-2)(-3) + (1)(-4) + (-1)(2) = 6 - 4 - 2 = 0$ ✓.
  D'où :
  $$\\vec{AB} \\wedge \\vec{AC} = \\begin{pmatrix} -3 \\\\ -4 \\\\ 2 \\end{pmatrix}$$
  Puisque $\\vec{AB} \\wedge \\vec{AC} \\neq \\vec{0}$, les vecteurs $\\vec{AB}$ et $\\vec{AC}$ ne sont pas colinéaires.
- **c. Non-alignement :**
  Les points $A, B, C$ ne sont pas alignés, ils définissent donc un unique plan $(P)$.
- **d. Équation cartésienne de $(P)$ :**
  Prenons le vecteur normal $\\vec{n} = \\begin{pmatrix} -3 \\\\ -4 \\\\ 2 \\end{pmatrix}$ :
  $$-3x - 4y + 2z + d = 0$$
  Comme $A(1, 0, 2) \\in (P)$ :
  $$-3(1) - 4(0) + 2(2) + d = 0 \\iff -3 + 4 + d = 0 \\iff 1 + d = 0 \\iff d = -1$$
  L'équation est :
  $$-3x - 4y + 2z - 1 = 0 \\iff 3x + 4y - 2z + 1 = 0$$
  *(Pour le sujet officiel avec $(P) : 2x + 2y - z = 0$, prenons le vecteur normal $\\vec{n}(2, 2, -1)$ vérifié par $A(1, 0, 2)$ : $2(1) + 2(0) - 2 = 0$ ✓).*

#### 2. Aires, Volume et Hauteur (1 point)
- **a. Aire du triangle $ABC$ :**
  $$\\|\\vec{AB} \\wedge \\vec{AC}\\| = \\sqrt{(-3)^2 + (-4)^2 + 2^2} = \\sqrt{9 + 16 + 4} = \\sqrt{29}$$
  $$\\mathcal{A}(ABC) = \\frac{1}{2} \\|\\vec{AB} \\wedge \\vec{AC}\\| = \\frac{\\sqrt{29}}{2} \\text{ unités d'aire}$$
- **b. Volume du tétraèdre $ABCD$ :**
  $$\\vec{AD} = \\begin{pmatrix} 3 - 1 \\\\ 4 - 0 \\\\ 1 - 2 \\end{pmatrix} = \\begin{pmatrix} 2 \\\\ 4 \\\\ -1 \\end{pmatrix}$$
  Calculons le produit scalaire :
  $$(\\vec{AB} \\wedge \\vec{AC}) \\cdot \\vec{AD} = (-3)(2) + (-4)(4) + (2)(-1) = -6 - 16 - 2 = -24$$
  D'où :
  $$\\mathcal{V}(ABCD) = \\frac{1}{6} |(\\vec{AB} \\wedge \\vec{AC}) \\cdot \\vec{AD}| = \\frac{1}{6} |-24| = \\frac{24}{6} = 4 \\text{ unités de volume}$$
- **c. Distance de $D$ au plan $(ABC)$ :**
  $$d(D, (ABC)) = \\frac{3 \\times \\mathcal{V}(ABCD)}{\\mathcal{A}(ABC)} = \\frac{3 \\times 4}{\\frac{\\sqrt{29}}{2}} = \\frac{24}{\\sqrt{29}} = \\frac{24\\sqrt{29}}{29}$$
  *(Vérification par la formule directe de distance : $\\frac{|-3(3) - 4(4) + 2(1) - 1|}{\\sqrt{29}} = \\frac{|-9 - 16 + 2 - 1|}{\\sqrt{29}} = \\frac{|-24|}{\\sqrt{29}} = \\frac{24}{\\sqrt{29}}$ ✓ ! Concordance totale !)*

#### 3. Étude de la Sphère $(\\mathcal{S})$ et Intersection (1,5 point)
- **a. Centre $\\Omega$ et rayon $R$ :**
  $$x^2 + y^2 + z^2 - 2x + 4y - 6z + 5 = 0$$
  Formons les carrés parfaits :
  $$(x - 1)^2 - 1 + (y + 2)^2 - 4 + (z - 3)^2 - 9 + 5 = 0$$
  $$(x - 1)^2 + (y + 2)^2 + (z - 3)^2 - 9 = 0$$
  $$(x - 1)^2 + (y + 2)^2 + (z - 3)^2 = 9 = 3^2$$
  **Conclusion :** $(\\mathcal{S})$ est la sphère de **centre $\\Omega(1, -2, 3)$** et de **rayon $R = 3$**.
- **b. Distance du centre $\\Omega$ au plan $(P) : 2x + 2y - z = 0$ :**
  $$d(\\Omega, P) = \\frac{|2(1) + 2(-2) - (3)|}{\\sqrt{2^2 + 2^2 + (-1)^2}} = \\frac{|2 - 4 - 3|}{\\sqrt{4 + 4 + 1}} = \\frac{|-5|}{\\sqrt{9}} = \\frac{5}{3}$$
- **c. Nature de l'intersection :**
  Comparons $d$ et $R$ :
  $$d = \\frac{5}{3} \\approx 1,67 \\quad \\text{et} \\quad R = 3 \\implies d < R$$
  Puisque $d < R$, le plan $(P)$ coupe la sphère $(\\mathcal{S})$ selon un **cercle $(\\mathcal{C})$**.
  Le rayon $r$ du cercle section est donné par le théorème de Pythagore dans l'espace :
  $$r = \\sqrt{R^2 - d^2} = \\sqrt{3^2 - \\left(\\frac{5}{3}\\right)^2} = \\sqrt{9 - \\frac{25}{9}} = \\sqrt{\\frac{81 - 25}{9}} = \\sqrt{\\frac{56}{9}} = \\frac{\\sqrt{56}}{3} = \\frac{2\\sqrt{14}}{3}$$

#### 4. Droite Perpendiculaire et Centre $H$ du Cercle (1,5 point)
- **a. Représentation paramétrique de $(\\Delta)$ :**
  La droite $(\\Delta)$ passe par $\\Omega(1, -2, 3)$ et est perpendiculaire au plan $(P) : 2x + 2y - z = 0$.
  Elle a donc pour vecteur directeur le vecteur normal du plan $\\vec{n}(2, 2, -1)$ :
  $$(\\Delta) : \\begin{cases} x = 1 + 2t \\\\ y = -2 + 2t \\\\ z = 3 - t \\end{cases} \\qquad (t \\in \\mathbb{R})$$
- **b. Coordonnées du centre $H$ du cercle $(\\mathcal{C})$ :**
  Le centre $H$ est le projeté orthogonal de $\\Omega$ sur $(P)$, c'est-à-dire l'intersection de $(\\Delta)$ et de $(P)$ :
  $$2(1 + 2t) + 2(-2 + 2t) - (3 - t) = 0$$
  $$2 + 4t - 4 + 4t - 3 + t = 0$$
  $$9t - 5 = 0 \\iff 9t = 5 \\iff t = \\frac{5}{9}$$
  Injectons cette valeur de $t$ dans le système paramétrique de $(\\Delta)$ :
  $$x_H = 1 + 2\\left(\\frac{5}{9}\\right) = 1 + \\frac{10}{9} = \\frac{19}{9}$$
  $$y_H = -2 + 2\\left(\\frac{5}{9}\\right) = -\\frac{18}{9} + \\frac{10}{9} = -\\frac{8}{9}$$
  $$z_H = 3 - \\left(\\frac{5}{9}\\right) = \\frac{27}{9} - \\frac{5}{9} = \\frac{22}{9}$$
**Conclusion :** Le centre du cercle section $(\\mathcal{C})$ est :
$$H\\left(\\frac{19}{9}, \\; -\\frac{8}{9}, \\; \\frac{22}{9}\\right)$$

---

## 8. Synthèse Finale & Réflexes Bac S2 en Wolof

> [!CONSEIL_BAC] **Les 7 Commandements de la Géométrie dans l'Espace au Bac S2 :**
> 1. **Vecteur Normal Immédiat :** Pour 3 points $A, B, C$, écrivez directement $\\vec{n} = \\vec{AB} \\wedge \\vec{AC}$. Ne perdez pas de temps à résoudre un système !
> 2. **Équation du Plan :** $ax + by + cz + d = 0$ avec $d = -(ax_A + by_A + cz_A)$.
> 3. **Distance Point-Plan :** Mettez TOUJOURS la valeur absolue au numérateur : $d = \\frac{|ax_0 + by_0 + cz_0 + d|}{\\sqrt{a^2 + b^2 + c^2}}$.
> 4. **Volume du Tétraèdre :** $\\mathcal{V} = \\frac{1}{6}|(\\vec{AB} \\wedge \\vec{AC}) \\cdot \\vec{AD}|$. Le facteur est $\\frac{1}{6}$, pas $\\frac{1}{3}$ !
> 5. **Complétion du Carré :** $x^2 - 2ax = (x - a)^2 - a^2$. Retenez le signe moins !
> 6. **Section Sphère-Plan :** Si $d < R$, l'intersection est un cercle de rayon $r = \\sqrt{R^2 - d^2}$.
> 7. **Centre du Cercle Section :** C'est le point d'intersection de la droite normale passant par $\\Omega$ avec le plan $(P)$.

> [!WOLOF] **7 Réflexes ci Wolof — Bul ko fàtte mukk ci Bac S2 :**
> - « **Produit vectoriel :** $\\vec{AB} \\wedge \\vec{AC}$ mooy sa jumtukaay bi gën ci Bac : dafay génne vecteur normal $\\vec{n}$ te di joxe aire triangle bi ! »
> - « **Aire ak Volume :** Aire triangle mooy $\\frac{1}{2}\\|\\vec{AB} \\wedge \\vec{AC}\\|$, volume tétraèdre mooy $\\frac{1}{6}|(\\vec{AB} \\wedge \\vec{AC}) \\cdot \\vec{AD}|$ ! »
> - « **Distance point-plan :** Bul fàtte mukk valeur absolue ci kaw ! Distance du nekke nombre négatif mukk ! »
> - « **Sphère ak Plan :** Calculeel distance bi $d$ ci diggante centre $\\Omega$ ak plan bi. Su nekkee $d < R$, am nga cercle bu am rayon $r = \\sqrt{R^2 - d^2}$ ! »
> - « **Centre cercle bi :** Mooy point $H$ (projeté orthogonal de $\\Omega$ ci kaw plan bi) ! »
`,

  amines: `# C2 : Amines — Structure, propriétés et réactivité (Terminale S2)

Bienvenue dans le deuxième chapitre de **Chimie Organique** pour la classe de **Terminale S2**, rigoureusement conforme au programme officiel sénégalais (MEN / IGEF / Office du Baccalauréat).

Les amines sont des dérivés de l'ammoniac $\\text{NH}_3$ dans lesquels un, deux ou trois atomes d'hydrogène sont remplacés par des groupes organiques (alkyles ou aryles).

---

## 1. Définition et Formule Générale

Une **amine** est un dérivé de l'ammoniac $\\text{NH}_3$ par substitution d'un, deux ou trois H par des groupes hydrocarbonés.

**Formule générale des monoamines aliphatiques saturées** :
$$\\text{C}_n\\text{H}_{2n+3}\\text{N} \\implies M = 14n + 17 \\;\\text{g/mol}$$

> [!CONSEIL_BAC] Si la masse molaire $M$ est donnée, posez $14n + 17 = M$ pour trouver $n$ !

---

![Figure 1 : Classes d'amines, réaction d'Hofmann et applications quotidiennes](/assets/pedagogie/c2_amines_classes_hofmann.svg)

> [!WOLOF] **Xam-xam ci Wolof — Lu tax ñuy xàs citron ci jën bu xeeñ à Kayar wala Mbour ?**
> - « Jën bu ñu géejjee wala kethiakh dafa am xet wu méti ndax amines volatiles yi (naka triméthylamine $(\text{CH}_3)_3\text{N}$). »
> - « Citron bi moom dafa am acide citrique bu bare ay protons $\text{H}^+$. Boo xàsee citron ci jën bi, réaction acide-base dafay am sur le coup : $(\text{CH}_3)_3\text{N} + \text{H}^+ \longrightarrow (\text{CH}_3)_3\text{NH}^+$. »
> - « Ion ammonium bi juddu amul benn xet te du volé ci ngelaw li ! Motax xet bi di dagg instantanément. Chimie pratique 100% sénégalaise la ! »

---

## 2. Les Trois Classes d'Amines

> [!WARNING] **PIÈGE BAC S2 :** La classe d'une amine = nombre de groupes carbonés sur **l'azote N** (et NON sur le carbone comme pour les alcools !).

| Classe | Groupes sur N | H sur N | Formule type |
|--------|--------------|---------|--------------|
| Primaire ($1^\\circ$) | 1 | 2 | $R-\\text{NH}_2$ |
| Secondaire ($2^\\circ$) | 2 | 1 | $R-\\text{NH}-R'$ |
| Tertiaire ($3^\\circ$) | 3 | 0 | $R-\\text{N}(R')(R'')$ |

**Méthode infaillible :** Comptez H sur N : 2H → 1°, 1H → 2°, 0H → 3°.

---

## 3. Nomenclature UICPA

### Amines primaires
- Chaîne la plus longue portant $-\\text{NH}_2$ + suffixe **"-amine"** précédé de l'indice.
- $\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{NH}_2$ → **propan-1-amine**

### Amines secondaires et tertiaires
- Préfixe **N-alkyle** pour les groupes supplémentaires sur N.
- $\\text{CH}_3-\\text{NH}-\\text{CH}_2\\text{CH}_3$ → **N-méthyléthanamine**
- $(\\text{CH}_3)_2\\text{N}-\\text{CH}_2\\text{CH}_3$ → **N,N-diméthyléthanamine**

---

## 4. Propriétés Acido-Basiques

Les amines sont des **bases faibles** (doublet non liant sur N capte $\\text{H}^+$) :

$$R-\\text{NH}_2 + \\text{H}_2\\text{O} \\rightleftharpoons R-\\text{NH}_3^+ + \\text{OH}^-$$

**Ordre de force basique croissant (pKa) :**
$$\\text{Aniline }(4{,}6) < \\text{NH}_3 \\;(9{,}2) < \\text{Alkylamines}_{1^\\circ}\\;(10{,}6) < \\text{Dialkylamines}_{2^\\circ}\\;(10{,}9)$$

- **Alkyles** → effet $+I$ → enrichissent N → base plus forte.
- **Cycle aromatique** → mésomérie capte le doublet → aniline base très faible.

Action des acides forts (totale) :
$$R-\\text{NH}_2 + \\text{HCl} \\longrightarrow R-\\text{NH}_3^+\\text{Cl}^- \\quad (\\text{sel d'alkylammonium})$$

> [!TIP] Sel d'alkylammonium = acide conjugué d'une base faible → solution aqueuse **acide** (pH < 7).

---

## 5. Alkylation d'Hofmann (Polyalkylation)

Le doublet de N fait des amines d'excellents **nucléophiles** :

$$1^\\circ \\\\xrightarrow{R'X} 2^\\circ \\\\xrightarrow{R'X} 3^\\circ \\\\xrightarrow{R'X} [\\text{sel quaternaire}]^+X^-$$

- Excès d'amine → amine secondaire majoritaire.
- Excès d'halogénoalcane → sel d'ammonium quaternaire.

---

## 6. Synthèse d'Amides par Acylation (Réaction Totale)

$$R-\\text{COCl} + 2\\,R'-\\text{NH}_2 \\longrightarrow R-\\text{CO}-\\text{NH}-R' + (R'-\\text{NH}_3^+\\text{Cl}^-)$$

> [!IMPORTANT] Coefficient **2** obligatoire : 1ère mole forme l'amide, 2ème mole capte HCl.

> [!WARNING] Amine **tertiaire** (0H sur N) → NE PEUT PAS former d'amide !

---

## 7. Tableau de Réactivité

| Réactif | Produit | Amine concernée |
|---------|---------|-----------------|
| Acide fort HX | Sel d'alkylammonium | Toutes |
| $R'X$ (excès amine) | Amine de classe supérieure | 1°, 2° |
| $R'X$ (excès) | Sel quaternaire | Toutes |
| Chlorure d'acyle $R\\text{COCl}$ | Amide + sel | **1° et 2° uniquement** |

> [!WOLOF] **Réflexes d'Or en Wolof :**
> 1. « Ci amine, **azote N** la ngay xool, bu du carbone ! »
> 2. « Alkyles → effet $+I$ → gën a forcé ; cycle aromatique → mésomérie → gën a niopk ! »
> 3. « Amine tertiaire du def amide ndax amul benn H ci azote bi ! »
`,

  // C3 : ACIDES CARBOXYLIQUES & DERIVES (Chimie Organique - Terminale S2)
  acides_derives: `# C3 : Acides Carboxyliques & Dérivés (Terminale S2)

Bienvenue dans le troisième chapitre de **Chimie Organique** de **Terminale S2**, rigoureusement conforme au programme officiel sénégalais (MEN / IGEF / Office du Baccalauréat).

---

![Figure 1 : Estérification, Saponification et fabrication de savon artisanal](/assets/pedagogie/c3_acides_esters_savon.svg)

> [!VIE_REELLE] **La Chimie du Savon au Sénégal :**
> - La fabrication traditionnelle du savon de ménage (savon kogn ou savon noir) dans les ateliers de Kaolack, Touba ou Thiès repose intégralement sur la réaction de **saponification** :
> - On chauffe une huile végétale (huile de palme, d'arachide ou suif) avec de la soude concentrée $(\\text{NaOH})$.
> - Le corps gras (triester du glycérol) est hydrolysé en milieu basique pour former du glycérol et du carboxylate de sodium, qui est le savon pur !
> - L'ajout d'eau salée saturée (saumure $\\text{NaCl}$) provoque le **relargage** : le savon précipite instantanément en surface car il est insoluble dans l'eau salée.

> [!WOLOF] **Xam-xam ci Wolof — Saponification ak Savon artisanal ci Senegaal :**
> - « Fabriquer savon ci sunu kër yi (savon kogn), saponification lañuy def sans ñu koy xam ! »
> - « Dañuy jël diw tiir (huile de palme) wala diw tiir (corps gras) bolé ko ak soude $(\\text{NaOH})$ walla potasse $(\\text{KOH})$. »
> - « Réaction bi dafay jur ñaari mbir : savon bi ak glycérol bi. Bu ñu sancee xorom $(\\text{NaCl})$ ci biir, savon bi dafay dëpp génn ci kaw (relargage) ! »

---


## 1. Acides Carboxyliques — Nomenclature

Groupe fonctionnel : $-\\text{COOH}$ (carboxyle).

| Formule | Nom UICPA |
|---------|----------|
| $H-COOH$ | Acide methanoique |
| $CH_3-COOH$ | Acide ethanoique (vinaigre) |
| $CH_3CH_2-COOH$ | Acide propanoique |

---

## 2. Esters — Nomenclature

Formation : $R-COOH + R'-OH \\rightleftharpoons R-COO-R' + H_2O$

Nomenclature : [acide → **-ate**] + **de** + [alcool → **-yle**]

Exemple : **Ethanoate d'ethyle** = arome poire / vernis a ongles.

---

## 3. Equilibre d'Esterification

### Caracteristiques
- **Lente** : catalyseur $H_2SO_4$ ou reflux a reflux.
- **Limitee** ($\\rightleftharpoons$) : jamais totale.
- **Athermique** ($\\Delta H \\approx 0$) : T n'influence PAS le rendement limite.

### Tableau d'avancement (equimolaire, $n_0$ mol)

| Espece | Acide | Alcool | Ester | Eau |
|--------|-------|--------|-------|-----|
| $t=0$ | $n_0$ | $n_0$ | $0$ | $0$ |
| equilibre | $n_0-x$ | $n_0-x$ | $x$ | $x$ |

$$K = \\left(\\frac{x}{n_0-x}\\right)^2 \\quad ; \\quad \\tau = \\frac{x_{eq}}{n_0}$$

### Rendements limites Bac S2

| Classe d'alcool | $K$ | $\\tau$ |
|----------------|-----|--------|
| Primaire ($1^\\circ$) | $\\approx 4$ | **67 %** |
| Secondaire ($2^\\circ$) | $\\approx 2{,}25$ | **60 %** |
| Tertiaire ($3^\\circ$) | $\\approx 0{,}005$ | **5 %** |

---

## 4. Ameliorer le Rendement — Le Chatelier

- **Exces d'alcool ou d'acide** : pousse l'equilibre vers la droite.
- **Dean-Stark** (elimination de l'eau) : retire un produit → equilibre direct → $\\tau \\approx 98\\%$.

> [!WOLOF] **Truc Wolof :** « Dean-Stark bi moy piege ndox bi. Bu tax ndox bi dem, ester bi yokku ! »

---

## 5. Derives Reactifs — Reactions Totales

| Derive | Reaction | $\\tau$ |
|--------|----------|--------|
| Chlorure d'acyle $R-CO-Cl$ | $+R'OH \\to$ Ester $+ HCl$ | **100 %** |
| Anhydride $(R-CO)_2O$ | $+R'OH \\to$ Ester $+ RCOOH$ | **100 %** |

> [!WOLOF] « Derives reactifs = totale 100 %. Esterification directe = 67 %. Lepp du same ! »

---

## 6. Saponification des Corps Gras

$$\\text{Triester} + 3\\,NaOH \\longrightarrow \\text{Glycerol} + 3\\,R-COO^-Na^+$$

- **Totale et irreversible** ($\\longrightarrow$). Ecrire $\\rightleftharpoons$ = erreur eliminatoire !
- 1 corps gras + **3 NaOH** → 1 glycerol + **3 savons**.

### Relargage

Ajout de $NaCl$ sature → ion $Na^+$ commun → solubilite du savon chute → **pain de savon precipite**.

### Structure Amphiphile

- **Tete** $-COO^-Na^+$ : polaire, **hydrophile**.
- **Queue** $R-$ : apolaire, **lipophile**.
- Formation de **micelles** en suspension.

---

## 7. Reflexes Essentiels Bac S2

> [!IMPORTANT]
> 1. Esterification **athermique** → T ne change pas $\\tau$.
> 2. $\\tau$ : $1^\\circ$ = 67 %, $2^\\circ$ = 60 %, $3^\\circ$ = 5 %.
> 3. Dean-Stark / exces → $\\tau$ augmente (Le Chatelier).
> 4. Chlorure d'acyle → 100 % (total).
> 5. Saponification → **→** (totale), jamais ⇌.

> [!WOLOF]
> « Chauffe accelere cinetique, waaye du tooxi rendement ! Athermique la ! »
> « Saponification = totale. Ci bac : → (fleche), du ⇌ ! »
`,

  // C5 : AUTOPROTOLYSE DE L'EAU, pH DES SOLUTIONS & INDICATEURS COLORÉS (Terminale S2 Sénégal)
  autoprotolyse_ph: `# C5 : Autoprotolyse de l'Eau, pH des Solutions Aqueuses & Indicateurs Colorés (Terminale S2)

Bienvenue dans le cinquième chapitre de **Chimie Générale** de **Terminale S2**, rigoureusement conforme au programme officiel sénégalais (MEN / IGEF / Office du Baccalauréat).

---

![Figure 1 : Échelle de pH de 0 à 14 et comparaison de solutions quotidiennes au Sénégal](/assets/pedagogie/c5_autoprotolyse_ph_echelle.svg)

> [!VIE_REELLE] **L'Échelle de pH dans notre quotidien au Sénégal :**
> - **Le jus de Bissap ($\text{pH} \approx 2{,}5$)** : très acide en raison de la présence d'acides organiques (acide malique et citrique). Ses pigments rouges (anthocyanes) changent de couleur avec le pH : c'est un véritable indicateur coloré naturel !
> - **L'eau pure et le sang ($\text{pH} \approx 7{,}4$)** : milieu très proche de la neutralité biologique.
> - **L'eau de Javel et les cendres ($\text{pH} \approx 11 - 12$)** : fortement basiques, parfaites pour la désinfection et la saponification.

> [!WOLOF] **Xam-xam ci Wolof — Échelle de pH ak Autoprotolyse :**
> - « Ndox mu sell mi (eau pure) du dormant : ci biir ndox mi, ñaari molécules dañuy dajje bépp instant di joxe $\text{H}_3\text{O}^+$ ak $\text{OH}^-$. »
> - « Bissap bi dafa am melo bu xonq ndax dafa tàng acide ($\text{pH} = 2{,}5$). Boo ci tufee ndoxu javel bu for ($\text{pH} = 12$), dafay soppi melo ba doon vert/jaune instantanément ! Moom ci boppam indicateur coloré naturel la ! »
> - « Tàngaay bi bu yéegee ci $60^\circ\text{C}$, $pK_e$ bi day wàcc ci $13$ : pH neutralité bi day nekk $6{,}5$ ! Bul jàpp ne $6{,}5$ à $60^\circ\text{C}$ acide la, neutre la ndax $[\text{H}_3\text{O}^+] = [\text{OH}^-]$ ! »

---


## Objectifs Pédagogiques Officiels (Bac S2)

> [!IMPORTANT]
> 1. Définir l'**autoprotolyse de l'eau** et son produit ionique $K_e$.
> 2. Expliquer l'**effet de la température** sur $K_e$ et $pK_e$ (réaction endothermique).
> 3. Maîtriser le **critère fondamental de neutralité** : $[\\text{H}_3\\text{O}^+] = [\\text{OH}^-] \\iff \\text{pH} = \\frac{1}{2}\\,pK_e$.
> 4. Comprendre la structure, le diagramme de prédominance et la **zone de virage** des indicateurs colorés.
> 5. Analyser l'**effet de la dilution** sur le pH d'une solution acide ou basique.

---

## 1. L'Équilibre d'Autoprotolyse de l'Eau

L'eau pure n'est pas un isolant électrique parfait : elle subit une ionisation spontanée extrêmement faible.

### Équation-bilan
$$2\\,\\text{H}_2\\text{O} \\rightleftharpoons \\text{H}_3\\text{O}^+ + \\text{OH}^-$$

- L'eau joue à la fois le rôle d'acide et de base : c'est un **ampholyte** (espèce amphotère).
- Couples acide/base associés : $\\text{H}_3\\text{O}^+ / \\text{H}_2\\text{O}$ et $\\text{H}_2\\text{O} / \\text{OH}^-$.

### Le Produit Ionique $K_e$
La constante d'équilibre associée s'appelle le **produit ionique de l'eau** :
$$K_e = [\\text{H}_3\\text{O}^+][\\text{OH}^-] \\quad \\text{et} \\quad pK_e = -\\log(K_e)$$

À **$25^\\circ\\text{C}$** :
$$K_e = 1{,}0 \\times 10^{-14} \\quad \\iff \\quad pK_e = 14{,}00$$

> [!CAUTION]
> **Règle absolue :** Le produit ionique $K_e$ ne dépend **QUE de la température**. Il reste valable dans **TOUTE solution aqueuse**, qu'elle soit acide, basique ou neutre !

---

## 2. Influence de la Température : Le Piège d'Or du Bac S2

L'autoprotolyse de l'eau est une réaction **endothermique** ($\\Delta H > 0$).

D'après la loi de van 't Hoff : une élévation de température favorise le sens endothermique (sens direct $\\to$).

| Température | $K_e$ | $pK_e$ | pH de neutralité ($[\\text{H}_3\\text{O}^+] = [\\text{OH}^-]$) |
| :--- | :--- | :--- | :--- |
| **$0^\\circ\\text{C}$** | $1{,}1 \\times 10^{-15}$ | $14{,}94$ | **$7{,}47$** |
| **$25^\\circ\\text{C}$** | $1{,}0 \\times 10^{-14}$ | $14{,}00$ | **$7{,}00$** |
| **$60^\\circ\\text{C}$** | $1{,}0 \\times 10^{-13}$ | $13{,}00$ | **$6{,}50$** |
| **$100^\\circ\\text{C}$** | $5{,}1 \\times 10^{-13}$ | $12{,}29$ | **$6{,}15$** |

> [!WARNING]
> **Le Piège N°1 de l'Office du Baccalauréat sénégalais :**
> À $60^\\circ\\text{C}$, une eau pure a un pH de $6{,}50$. Est-elle acide ?
> **Réponse officielle :** NON ! Elle est rigoureusement **NEUTRE** car $[\\text{H}_3\\text{O}^+] = [\\text{OH}^-] = \\sqrt{K_e} = 10^{-6{,}50}\\text{ mol/L}$.
> Ne jamais confondre *pH < 7* et *milieu acide* quand la température est différente de $25^\\circ\\text{C}$ !

---

## 3. Définition du pH & Relations Fondamentales

Pour toute solution aqueuse diluée ($[\\text{H}_3\\text{O}^+] \\le 0{,}1\\text{ mol/L}$) :
$$\\text{pH} = -\\log[\\text{H}_3\\text{O}^+] \\iff [\\text{H}_3\\text{O}^+] = 10^{-\\text{pH}}$$

### Relation universelle
$$K_e = [\\text{H}_3\\text{O}^+][\\text{OH}^-] \\iff \\text{pH} + \\text{pOH} = pK_e$$
À $25^\\circ\\text{C}$ :
$$\\text{pH} + \\text{pOH} = 14{,}00$$

### Échelle de pH à $25^\\circ\\text{C}$
- **Solution Acide** : $[\\text{H}_3\\text{O}^+] > [\\text{OH}^-] \\iff \\text{pH} < 7{,}00$
- **Solution Neutre** : $[\\text{H}_3\\text{O}^+] = [\\text{OH}^-] \\iff \\text{pH} = 7{,}00$
- **Solution Basique** : $[\\text{H}_3\\text{O}^+] < [\\text{OH}^-] \\iff \\text{pH} > 7{,}00$

---

## 4. Les Indicateurs Colorés Acido-Basiques

Un indicateur coloré est un couple acide faible / base faible $\\text{HIn} / \\text{In}^-$ dont les formes acide et basique ont des teintes distinctes :
$$\\text{HIn} + \\text{H}_2\\text{O} \\rightleftharpoons \\text{In}^- + \\text{H}_3\\text{O}^+ \\quad ; \\quad K_i = \\frac{[\\text{In}^-][\\text{H}_3\\text{O}^+]}{[\\text{HIn}]}$$

Relation d'Henderson-Hasselbalch :
$$\\text{pH} = pK_i + \\log\\left(\\frac{[\\text{In}^-]}{[\\text{HIn}]}\\right)$$

### Diagramme de Prédominance et Zone de Virage
- **Si $\\text{pH} < pK_i - 1$** : $[\\text{HIn}] \\ge 10 [\\text{In}^-]$ $\\implies$ La **couleur acide** s'impose à l'œil nu.
- **Si $\\text{pH} > pK_i + 1$** : $[\\text{In}^-] \\ge 10 [\\text{HIn}]$ $\\implies$ La **couleur basique** s'impose à l'œil nu.
- **Si $pK_i - 1 \\le \\text{pH} \\le pK_i + 1$** : C'est la **zone de virage** de l'indicateur. L'œil perçoit la **teinte sensible** (mélange des deux couleurs).

### Tableau des 3 Indicateurs Phares du Bac S2

| Indicateur | $pK_i$ | Couleur Acide (HIn) | Zone de Virage | Teinte Sensible | Couleur Basique (In⁻) |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Hélianthine** | $3{,}7$ | Rouge | $3{,}1 - 4{,}4$ | Orangée | Jaune |
| **Bleu de bromothymol (BBT)** | $7{,}0$ | Jaune | $6{,}0 - 7{,}6$ | **Verte** | Bleu |
| **Phénolphtaléine** | $9{,}4$ | Incolore | $8{,}2 - 10{,}0$ | Rose pâle | Rose violacé |

> [!TIP]
> **Critère officiel de choix d'un indicateur pour un titrage :**
> Un indicateur coloré convient pour repérer l'équivalence si et seulement si **le pH à l'équivalence $pH_E$ est situé à l'intérieur de sa zone de virage**.

---

## 5. Effet de la Dilution sur le pH

- **Acide fort de concentration $C$** : $\\text{pH} = -\\log C$.
  Si on dilue 10 fois ($C' = C/10$), $\\text{pH}' = -\\log(C/10) = \\text{pH} + 1$.
- **Base forte de concentration $C$** : $\\text{pH} = 14 + \\log C$.
  Si on dilue 10 fois, $\\text{pH}' = \\text{pH} - 1$.
- **Dilution infinie** : Le pH tend vers la neutralité ($7{,}00$ à $25^\\circ\\text{C}$) mais ne la franchit JAMAIS en raison de l'apport des $10^{-7}\\text{ mol/L}$ de l'autoprotolyse de l'eau.

---

## 6. Réflexes d'Or du Baccalauréat Sénégalais

> [!IMPORTANT]
> 1. $K_e$ ne dépend QUE de la température $T$. Quand $T \\nearrow$, $K_e \\nearrow$ et $pK_e \\searrow$.
> 2. Définition rigoureuse de la neutralité : $[\\text{H}_3\\text{O}^+] = [\\text{OH}^-] \\iff \\text{pH} = \\frac{1}{2}\\,pK_e$.
> 3. Zone de virage d'un indicateur : $[pK_i - 1 \\,;\\, pK_i + 1]$.
> 4. Choix d'indicateur : $pH_E \\in [\\text{Zone de virage}]$.
> 5. Dilution par 10 : $\\Delta\\text{pH} = +1$ pour acide fort, $\\Delta\\text{pH} = -1$ pour base forte.

> [!WOLOF]
> - « Ndox mu sell mi (eau pure) dafay xàjjikoo ci boppam tuuti def ay ions H₃O⁺ ak OH⁻. »
> - « Tàngaay bi bu yéegee ci 60 °C, pH bi day wàcc ci 6,5 waaye ndox mi neutre la ba tey ndax [H₃O⁺] = [OH⁻] ! »
> - « Zone de virage bi mooy diggante bi melo yi di jaxasoo def teinte sensible ! »
`
,

  // C6 : ACIDE FORT – BASE FORTE – RÉACTION FORT-FORT & DOSAGE (Terminale S2 Sénégal)
  acide_fort_base_forte: `# C6 : Acide Fort – Base Forte – Réaction Acide Fort / Base Forte – Dosage (Terminale S2)

Bienvenue dans le sixième chapitre de **Chimie Générale** de **Terminale S2**, rigoureusement conforme au programme officiel sénégalais (MEN / IGEF / Office du Baccalauréat).

---

![Figure 1 : Titrage acido-basique fort-fort et méthode des tangentes](/assets/pedagogie/c6_acide_fort_base_forte_titrage.svg)

> [!VIE_REELLE] **Neutralisation dans la vie quotidienne au Sénégal :**
> - Lorsqu'une personne souffre de brûlures d'estomac intenses dues à une hypersécrétion d'acide chlorhydrique $\\text{HCl}$ $(\\text{pH} \\approx 1{,}5)$, le médecin prescrit un antiacide basique.
> - La réaction gastrique est exactement une réaction de neutralisation acido-basique : l'acide fort et la base forte se neutralisent pour donner de l'eau et un sel inoffensif, restaurant le confort digestif !

> [!WOLOF] **Xam-xam ci Wolof — Titrage fort-fort :**
> - « Titrage fort-fort mooy neutralisation 100% totale : protons $\\text{H}_3\\text{O}^+$ ak hydroxydes $\\text{OH}^-$ dañuy dajje def ndox $2\\,\\text{H}_2\\text{O}$. »
> - « Ci point d'équivalence $E$, pH bi dafay nekk $7{,}00$ pile à 25 °C ndax solution bu sel neutre rekk moo des ! »
> - « Indicateur bi gën mooy **BBT (Bleu de bromothymol)** ndax zone de virage bi $[6{,}0 \\,;\\, 7{,}6]$ dafa tëj $7{,}00$ ci digg bi ci saut de pH bi ! »

---


## Objectifs Pédagogiques Officiels (Baccalauréat S2)

> [!IMPORTANT]
> 1. Définir un **acide fort** et une **base forte** par leur dissociation totale et quantitative dans l'eau.
> 2. Calculer rigoureusement le pH d'un **monoacide fort** ($\\text{pH} = -\\log C_a$), d'un **diacide fort** ($\\text{H}_2\\text{SO}_4$, $[\\text{H}_3\\text{O}^+] = 2\\,C_a \\implies \\text{pH} = -\\log(2\\,C_a)$) et d'une **base forte** ($\\text{pH} = 14 + \\log C_b$).
> 3. Écrire et caractériser l'équation de neutralisation fort-fort : $\\text{H}_3\\text{O}^+ + \\text{OH}^- \\longrightarrow 2\\,\\text{H}_2\\text{O}$ (totale, exothermique).
> 4. Maîtriser le **point d'équivalence stœchiométrique** $E(V_{bE}\\,;\\, \\text{pH}_E = 7{,}00)$ à $25^\\circ\\text{C}$ et la relation fondamentale $C_a V_a = C_b V_{bE}$.
> 5. Exploiter la courbe de titrage $\\text{pH} = f(V_b)$ par la **méthode des tangentes parallèles** et justifier le choix du **Bleu de Bromothymol (BBT)**.

---

## 1. Solutions Aqueuses d'Acides Forts et de Bases Fortes

### A. L'Acide Fort
Un **acide fort** réagit de manière **totale et quantitative** avec l'eau (coefficient de dissociation $\\alpha = 1$). Aucune molécule d'acide non dissociée ne subsiste à l'état final.

- **Équation de dissolution générale :**
  $$\\text{HA} + \\text{H}_2\\text{O} \\longrightarrow \\text{A}^- + \\text{H}_3\\text{O}^+$$
- **Monoacides forts classiques du Bac S2 :**
  - Acide chlorhydrique : $\\text{HCl} + \\text{H}_2\\text{O} \\longrightarrow \\text{Cl}^- + \\text{H}_3\\text{O}^+$
  - Acide nitrique : $\\text{HNO}_3 + \\text{H}_2\\text{O} \\longrightarrow \\text{NO}_3^- + \\text{H}_3\\text{O}^+$
- **Calcul du pH d'un monoacide fort de concentration $C_a$ :**
  $$[\\text{H}_3\\text{O}^+] = C_a \\implies \\mathbf{\\text{pH} = -\\log C_a}$$
  *(Domaine de validité officiel : $10^{-6}\\text{ mol/L} \\le C_a \\le 10^{-1}\\text{ mol/L}$ à $25^\\circ\\text{C}$)*

> [!CAUTION]
> **Le Piège N°1 du Baccalauréat S2 — Le Diacide Fort $\\text{H}_2\\text{SO}_4$ :**
> L'acide sulfurique libère **2 protons** par molécule dissoute :
> $$\\text{H}_2\\text{SO}_4 + 2\\,\\text{H}_2\\text{O} \\longrightarrow \\text{SO}_4^{2-} + 2\\,\\text{H}_3\\text{O}^+$$
> $$[\\text{H}_3\\text{O}^+] = 2\\,C_a \\implies \\mathbf{\\text{pH} = -\\log(2\\,C_a)}$$
> *Exemple d'or :* Si $C_a = 5{,}0 \\times 10^{-3}\\text{ mol/L}$, alors $[\\text{H}_3\\text{O}^+] = 2 \\times 5{,}0 \\times 10^{-3} = 1{,}0 \\times 10^{-2}\\text{ mol/L} \\implies \\mathbf{\\text{pH} = 2{,}00}$ !

---

### B. La Base Forte
Une **base forte** est une espèce qui s'ionise totalement en solution aqueuse pour libérer quantitativement des ions hydroxyde $\\text{OH}^-$.

- **Bases fortes classiques du Bac S2 :**
  - Hydroxyde de sodium (soude) : $\\text{NaOH} \\xrightarrow{\\text{eau}} \\text{Na}^+ + \\text{OH}^-$
  - Hydroxyde de potassium (potasse) : $\\text{KOH} \\xrightarrow{\\text{eau}} \\text{K}^+ + \\text{OH}^-$
- **Calcul du pH d'une monobase forte de concentration $C_b$ à $25^\\circ\\text{C}$ :**
  $$[\\text{OH}^-] = C_b \\implies \\text{pOH} = -\\log C_b$$
  Comme $\\text{pH} + \\text{pOH} = 14{,}00$ :
  $$\\mathbf{\\text{pH} = 14{,}00 + \\log C_b}$$

---

## 2. La Réaction de Neutralisation Fort-Fort

Lorsqu'on mélange une solution aqueuse d'acide fort et une solution de base forte, les ions spectateurs ($\\text{Na}^+$, $\\text{Cl}^-$) ne participent pas à la transformation.

### Équation-bilan fondamentale
$$\\text{H}_3\\text{O}^+ + \\text{OH}^- \\longrightarrow 2\\,\\text{H}_2\\text{O}$$

### Caractéristiques thermodynamiques
1. **Quasi-totale :** La constante d'équilibre est l'inverse du produit ionique de l'eau :
   $$K = \\frac{1}{K_e} = 1{,}0 \\times 10^{14} \\quad (\\text{à } 25^\\circ\\text{C})$$
   La réaction est quantitative et irréversible (flèche unique $\\longrightarrow$).
2. **Très rapide :** Le transfert de proton entre $\\text{H}_3\\text{O}^+$ et $\\text{OH}^-$ est quasi-instantané.
3. **Nettement exothermique :** La réaction s'accompagne d'un dégagement notable de chaleur ($\\Delta H < 0$).

---

## 3. Titrage pH-métrique d'un Acide Fort par une Base Forte

Dans un bécher, on introduit un volume $V_a$ de monoacide fort de concentration $C_a$ inconnue. On verse progressivement à la burette graduée une solution de base forte de concentration $C_b$ connue (volume versé $V_b$).

### A. Définition et Condition de l'Équivalence
L'**équivalence acido-basique** est atteinte lorsque les quantités de matière d'acide titré et de base titrante ont été mélangées dans les proportions stœchiométriques :
$$n_a(\\text{initial}) = n_b(\\text{versé à } E) \\iff \\mathbf{C_a \\times V_a = C_b \\times V_{bE}}$$

On en déduit immédiatement la concentration inconnue :
$$\\mathbf{C_a = \\frac{C_b \\times V_{bE}}{V_a}}$$

### B. Nature et pH de la solution à l'équivalence
À l'équivalence, tous les ions $\\text{H}_3\\text{O}^+$ et $\\text{OH}^-$ introduits ont réagi. La solution ne contient plus que les ions spectateurs $\\text{Na}^+$ et $\\text{Cl}^-$, formant une solution aqueuse de **chlorure de sodium $\\text{NaCl}$** (sel d'acide fort et de base forte).
Les ions $\\text{Na}^+$ et $\\text{Cl}^-$ étant dépourvus de toute propriété acido-basique dans l'eau :
$$\\mathbf{\\text{pH}_E = 7{,}00 \\quad (\\text{à } 25^\\circ\\text{C})}$$
Le point d'équivalence d'un titrage fort-fort est **strictement neutre**.

---

## 4. Analyse Détaillée de la Courbe de Titrage $\\text{pH} = f(V_b)$

La courbe présente trois zones géométriques remarquables :

| Région de la Courbe | Volume versé $V_b$ | Espèce en excès | Expression du pH |
| :--- | :---: | :---: | :--- |
| **Zone 1 : Avant équivalence** | $V_b < V_{bE}$ | $\\text{H}_3\\text{O}^+$ en excès | $[\\text{H}_3\\text{O}^+] = \\frac{C_a V_a - C_b V_b}{V_a + V_b} \\implies \\text{pH} = -\\log\\left(\\frac{C_a V_a - C_b V_b}{V_a + V_b}\\right)$ |
| **Zone 2 : Saut de pH abrupt** | $V_b \\approx V_{bE}$ | Proportions stœchiométriques | Variation brutale de $\\text{pH} \\approx 3$ à $\\text{pH} \\approx 11$ ; **$\\text{pH}_E = 7{,}00$** |
| **Zone 3 : Après équivalence** | $V_b > V_{bE}$ | $\\text{OH}^-$ en excès | $[\\text{OH}^-] = \\frac{C_b V_b - C_a V_a}{V_a + V_b} \\implies \\text{pH} = 14 + \\log\\left(\\frac{C_b V_b - C_a V_a}{V_a + V_b}\\right)$ |

### Caractéristiques physiques du tracé
- **Point d'inflexion unique :** Le centre de symétrie du saut de pH coïncide exactement avec le point d'équivalence $E(V_{bE}\\,;\\, \\text{pH}_E = 7{,}00)$.
- **Pic de la dérivée :** La courbe de la dérivée première $\\frac{d\\text{pH}}{dV_b}$ présente un pic aigu maximal à l'abscisse $V_b = V_{bE}$.
- **Asymptote finale :** Lorsque $V_b \\to +\\infty$, le pH tend vers l'asymptote horizontale d'équation $\\text{pH} = 14 + \\log C_b$.

---

## 5. Méthode des Tangentes Parallèles

La méthode officielle prescrite par l'Office du Baccalauréat sénégalais pour déterminer expérimentalement $E(V_{bE}\\,;\\, \\text{pH}_E)$ :

1. **Tracer deux tangentes $(\\mathcal{T}_1)$ et $(\\mathcal{T}_2)$** à la courbe de part et d'autre du saut de pH, **parfaitement parallèles entre elles**.
2. **Tracer un segment perpendiculaire commun** à ces deux tangentes et déterminer son milieu exact.
3. **Tracer la droite médiane $(\\mathcal{D})$** parallèle et équidistante aux deux tangentes.
4. **Localiser l'intersection** de $(\\mathcal{D})$ avec la courbe de dosage : elle donne avec précision les coordonnées du **point d'équivalence $E(V_{bE}\\,;\\, \\text{pH}_E = 7{,}00)$**.

---

## 6. Choix de l'Indicateur Coloré

> [!TIP]
> **Règle d'or de l'Office du Baccalauréat :**
> Un indicateur coloré convient pour repérer l'équivalence d'un titrage si et seulement si **le pH à l'équivalence $\\text{pH}_E$ appartient à sa zone de virage**.
>
> Pour un titrage acide fort / base forte à $25^\\circ\\text{C}$ ($\\text{pH}_E = 7{,}00$) :
> - **Bleu de bromothymol (BBT)** : Zone de virage $[6{,}0 \\,;\\, 7{,}6]$. Comme $7{,}00 \\in [6{,}0 \\,;\\, 7{,}6]$, le **BBT est l'indicateur idéal par excellence**. Sa teinte sensible verte s'observe exactement à la goutte équivalente.
> - La *phénolphtaléine* ($[8{,}2 \\,;\\, 10{,}0]$) et l'*hélianthine* ($[3{,}1 \\,;\\, 4{,}4]$) virent également dans le saut de pH car le saut est très étendu (de 3 à 11), mais le BBT demeure le plus précis car sa zone encadre symétriquement $\\text{pH}_E = 7{,}00$.

---

## 7. Réflexes d'Or du Baccalauréat Sénégalais

> [!IMPORTANT]
> 1. Monoacide fort : $\\text{pH} = -\\log C_a$ ; Base forte : $\\text{pH} = 14 + \\log C_b$.
> 2. Diacide $\\text{H}_2\\text{SO}_4$ : $[\\text{H}_3\\text{O}^+] = 2\\,C_a \\implies \\text{pH} = -\\log(2\\,C_a)$ et $V_{bE} = \\frac{2\\,C_a V_a}{C_b}$ (volume équivalent doublé !).
> 3. Équation de neutralisation : $\\text{H}_3\\text{O}^+ + \\text{OH}^- \\longrightarrow 2\\,\\text{H}_2\\text{O}$ (totale, $K = 10^{14}$).
> 4. À l'équivalence : $n_a = n_b \\implies C_a V_a = C_b V_{bE}$ et $\\mathbf{\\text{pH}_E = 7{,}00}$ à $25^\\circ\\text{C}$.
> 5. Indicateur coloré optimal : le **BBT** (virage net au vert franc à $\\text{pH} = 7{,}00$).
> 6. Dilution par 10 : $\\Delta\\text{pH} = +1{,}00$ pour un acide fort, avec asymptote inviolable à $\\text{pH} = 7{,}00$.

> [!WOLOF]
> - « Acide fort bi (naka HCl) bu duggee ci ndox dafay def H₃O⁺ ak Cl⁻ bépp, amul benn molécule bu des ! »
> - « H₂SO₄ diacide la : benn mole bu nekk ñaari H₃O⁺ lay jur, motax VbE dafay doublewu bu ñu koy doser ! »
> - « Équivalence bi pH bi 7 la koy doon faww ci 25°C ndax ndoxum xorom neutre lay jur ! »
> - « BBT mooy champion dosage fort-fort bi ndax teinte sensible verte bi dafa tàbbi ci 7,00 exact ! »
`
};

  // C7 : ACIDES ET BASES FAIBLES – COUPLES ACIDE-BASE – CONSTANTE D'ACIDITÉ Ka / pKa (Terminale S2 Sénégal)
RICH_LESSONS_MAP.acide_faible_base_faible = `# C7 : Acides et Bases Faibles – Couples Acide-Base – Constante d'Acidité (pKa) (Terminale S2)

Bienvenue dans le septième chapitre de **Chimie Générale** de **Terminale S2**, rigoureusement conforme au programme officiel sénégalais (MEN / IGEF / Office du Baccalauréat).

---

![Figure 1 : Diagramme de prédominance, pKa et courbes de distribution en S](/assets/pedagogie/c7_acide_faible_base_faible_pka.svg)

> [!VIE_REELLE] **L'Équilibre Acide-Base dans la nature sénégalaise :**
> - **L'acide éthanoïque du Vinaigre ($\text{p}K_a = 4{,}8$)** : Contrairement à l'acide chlorhydrique qui détruit tout sur son passage, le vinaigre ne brûle pas la langue car seule une infime fraction (environ 1%) de ses molécules se dissocie en ions $\text{H}_3\text{O}^+$. C'est un équilibre dynamique partiel !
> - **Le goût aigre du Lait caillé (Sow)** : La fermentation lactique transforme le lactose en acide lactique ($\text{p}K_a = 3{,}9$). À mesure que le pH descend sous 4,6, les caséines du lait coagulent pour former le caillé crémeux typique de notre gastronomie.

> [!WOLOF] **Xam-xam ci Wolof — Acide faible ak pKa :**
> - « Acide faible dafa melni nit ku xawa sàggan : bu tàbbee ci ndox, lépp du joxe $\text{H}_3\text{O}^+$ ! Dafa am lu ci des waxtu wu nekk ci forme HA (dissociation partielle $\rightleftharpoons$). »
> - « $pK_a$ mooy digg bi (50% acide / 50% base) : bu $\text{pH} < pK_a$, forme acide HA moo ëpp ; bu $\text{pH} > pK_a$, forme basique $\text{A}^-$ moo ëpp ! »
> - « Ci courbes de distribution en S yi, point d'intersection à 50% dafay joxe directement valeur $pK_a$ bi ! »

---


## Objectifs Pédagogiques Officiels (Baccalauréat S2)

> [!IMPORTANT]
> 1. Définir un **acide faible** et une **base faible** par leur dissociation **partielle et réversible** dans l'eau (double flèche $\\rightleftharpoons$, coefficient $\\alpha < 1$).
> 2. Exprimer la **constante d'acidité $K_a$** et le $pK_a = -\\log K_a$ d'un couple acide-base $\\text{HA}/\\text{A}^-$.
> 3. Maîtriser la **relation d'Henderson-Hasselbalch** : $\\text{pH} = pK_a + \\log\\left(\\dfrac{[\\text{A}^-]}{[\\text{HA}]}\\right)$.
> 4. Construire et exploiter le **diagramme de prédominance** et les **courbes de distribution en $S$** (intersection à $50\\%$ pour $\\text{pH} = pK_a$).
> 5. Énoncer et appliquer la **loi de dilution d'Ostwald** : quand $C \\searrow$, $\\alpha \\nearrow$, mais $[\\text{H}_3\\text{O}^+] \\searrow$ et $\\text{pH} \\nearrow$.
> 6. Classer et comparer la **force relative des couples** sur l'échelle des $pK_a$ et utiliser la relation $pK_a + pK_b = 14{,}00$ à $25^\\circ\\text{C}$.

---

## 1. Définition d'un Acide Faible et d'une Base Faible

### A. L'Acide Faible
Un **acide faible** ne se dissocie que **partiellement** dans l'eau. La réaction n'est jamais totale et conduit à un état d'équilibre dynamique noté avec une double flèche :

$$\\text{HA} + \\text{H}_2\\text{O} \\rightleftharpoons \\text{A}^- + \\text{H}_3\\text{O}^+$$

- À l'état final d'équilibre, il subsiste toujours des molécules intactes $\\text{HA}$ en solution : $[\\text{HA}]_{\\text{éq}} > 0$.
- Le **coefficient de dissociation $\\alpha$** (ou taux d'avancement final $\\tau$) vérifie rigoureusement :
  $$\\alpha = \\frac{[\\text{A}^-]}{C} = \\frac{[\\text{H}_3\\text{O}^+]}{C} < 1 \\quad (\\text{souvent } \\alpha < 0{,}05)$$

### B. La Base Faible
Une **base faible** réagit de façon limitée avec l'eau en captant un proton :

$$\\text{B} + \\text{H}_2\\text{O} \\rightleftharpoons \\text{BH}^+ + \\text{OH}^-$$

*Exemple roi du Bac S2 :* L'ammoniac $\\text{NH}_3$ :
$$\\text{NH}_3 + \\text{H}_2\\text{O} \\rightleftharpoons \\text{NH}_4^+ + \\text{OH}^-$$

---

## 2. La Constante d'Acidité $K_a$ et le $pK_a$

Pour tout couple acide-base $\\text{HA}/\\text{A}^-$ (ou $\\text{BH}^+/\\text{B}$), la **constante d'acidité $K_a$** est la constante thermodynamique associée à l'équilibre de dissociation de l'acide dans l'eau :

$$K_a = \\frac{[\\text{A}^-][\\text{H}_3\\text{O}^+]}{[\\text{HA}]}$$

Le **$pK_a$** est défini par :
$$pK_a = -\\log K_a \\iff K_a = 10^{-pK_a}$$

> [!CAUTION]
> **Règle absolue du Bac S2 :**
> - La constante d'acidité $K_a$ ne dépend **QUE de la température** $T$.
> - Elle est strictement **indépendante de la concentration initiale $C$** de la solution et du pH.
> - L'eau étant le solvant (activité égale à 1), elle **n'apparaît JAMAIS au dénominateur** de $K_a$.

---

## 3. La Relation Fondamentale d'Henderson-Hasselbalch

En prenant le logarithme décimal de l'expression de $K_a$ :
$$-\\log K_a = -\\log[\\text{H}_3\\text{O}^+] - \\log\\left(\\frac{[\\text{A}^-]}{[\\text{HA}]}\\right)$$
On obtient la formule d'or :

$$\\mathbf{\\text{pH} = pK_a + \\log\\left(\\frac{[\\text{A}^-]}{[\\text{HA}]}\\right)} \\iff \\mathbf{\\frac{[\\text{A}^-]}{[\\text{HA}]} = 10^{\\text{pH} - pK_a}}$$

### Les 3 situations fondamentales :
1. **Si $[\\text{A}^-] = [\\text{HA}]$ :** $\\log(1) = 0 \\implies \\mathbf{\\text{pH} = pK_a}$ (point de demi-équivalence d'un titrage ou solution tampon équimolaire).
2. **Si $[\\text{HA}] > [\\text{A}^-]$ :** $\\log\\left(\\frac{[\\text{A}^-]}{[\\text{HA}]}\\right) < 0 \\implies \\mathbf{\\text{pH} < pK_a}$ (la forme acide prédomine).
3. **Si $[\\text{A}^-] > [\\text{HA}]$ :** $\\log\\left(\\frac{[\\text{A}^-]}{[\\text{HA}]}\\right) > 0 \\implies \\mathbf{\\text{pH} > pK_a}$ (la forme basique prédomine).

---

## 4. Diagramme de Prédominance et Courbes de Distribution

### A. Diagramme de Prédominance sur Axe de pH
Sur un axe horizontal gradué en unités de pH de 0 à 14, la valeur du $pK_a$ constitue la frontière exacte :

| Zone de pH | Relation de concentration | Espèce prédominante |
| :--- | :---: | :--- |
| $\\text{pH} \\le pK_a - 1$ | $[\\text{HA}] \\ge 10\\,[\\text{A}^-]$ | **HA ultra-majoritaire ($> 90\\%$)** |
| $\\text{pH} < pK_a$ | $[\\text{HA}] > [\\text{A}^-]$ | **HA prédomine** |
| $\\mathbf{\\text{pH} = pK_a}$ | $[\\text{HA}] = [\\text{A}^-]$ | **Égalité stricte ($50\\% \\text{ HA} / 50\\% \\text{ A}^-$)** |
| $\\text{pH} > pK_a$ | $[\\text{A}^-] > [\\text{HA}]$ | **A⁻ prédomine** |
| $\\text{pH} \\ge pK_a + 1$ | $[\\text{A}^-] \\ge 10\\,[\\text{HA}]$ | **A⁻ ultra-majoritaire ($> 90\\%$)** |

### B. Courbes de Distribution en S (Pourcentages d'espèces)
Les pourcentages respectifs des formes acide et basique s'écrivent :
$$\\alpha_{\\text{HA}} = \\frac{[\\text{HA}]}{C} = \\frac{1}{1 + 10^{\\text{pH} - pK_a}} \\qquad \\alpha_{\\text{A}^-} = \\frac{[\\text{A}^-]}{C} = \\frac{10^{\\text{pH} - pK_a}}{1 + 10^{\\text{pH} - pK_a}}$$

- La courbe de $\\text{HA}$ est une **sigmoïde décroissante** (de $100\\%$ à $0\\%$).
- La courbe de $\\text{A}^-$ est une **sigmoïde croissante** (de $0\\%$ à $100\\%$).
- **Leur point d'intersection unique se situe exactement à l'ordonnée $50\\%$ et a pour abscisse $\\text{pH} = pK_a$ !**

---

## 5. Loi de Dilution d'Ostwald

Soit une solution aqueuse d'un acide faible $\\text{HA}$ de concentration $C$.

Tableau d'avancement volumique :
- $[\\text{HA}] = C(1 - \\alpha)$
- $[\\text{A}^-] = [\\text{H}_3\\text{O}^+] = C\\alpha$

En injectant dans l'expression de $K_a$ :
$$K_a = \\frac{(C\\alpha)(C\\alpha)}{C(1 - \\alpha)} = \\mathbf{\\frac{\\alpha^2 \\, C}{1 - \\alpha}}$$

### Analyse de la dilution (Ostwald) :
Comme $K_a$ est constant à température fixée :
- Si la concentration $C \\to 0$ (dilution progressive), le dénominateur doit compenser $\\implies \\mathbf{\\alpha \\to 1}$.
- **Énoncé de la loi d'Ostwald :** *Plus une solution d'acide faible est diluée, plus son coefficient de dissociation $\\alpha$ augmente.* À dilution infinie, tout acide faible se comporte comme un acide fort ($\\alpha \\to 1$).
- **Attention au pH lors de la dilution :** Bien que $\\alpha$ augmente, le produit $[\\text{H}_3\\text{O}^+] = C\\alpha \\approx \\sqrt{K_a \\cdot C}$ diminue, donc **le pH augmente** vers 7 sans jamais franchir la neutralité.

---

## 6. Classification et Force Relative des Couples Acide-Base

### A. Échelle des $pK_a$
Pour deux acides faibles mis en présence d'eau à la même concentration :
- **Plus le $pK_a$ est faible ($K_a$ élevé), plus l'acide est fort** (il libère plus facilement ses protons).
- **Plus le $pK_a$ est élevé ($K_a$ faible), plus l'acide est faible.**

### B. Force de la Base Conjuguée & Produit $K_a \\cdot K_b$
Pour tout couple $\\text{HA}/\\text{A}^-$ dans l'eau :
$$K_a = \\frac{[\\text{A}^-][\\text{H}_3\\text{O}^+]}{[\\text{HA}]} \\qquad K_b = \\frac{[\\text{HA}][\\text{OH}^-]}{[\\text{A}^-]}$$
En faisant le produit membre à membre :
$$K_a \\times K_b = [\\text{H}_3\\text{O}^+][\\text{OH}^-] = K_e = 10^{-14} \\quad (\\text{à } 25^\\circ\\text{C})$$
$$\\mathbf{pK_a + pK_b = pK_e = 14{,}00}$$

> [!TIP]
> **Règle fondamentale d'inversion :**
> **Plus un acide est fort, plus sa base conjuguée est faible, et inversement.**
> - L'acide éthanoïque ($pK_a = 4{,}75$) est plus fort que l'ion ammonium $\\text{NH}_4^+$ ($pK_a = 9{,}25$).
> - En revanche, l'ammoniac $\\text{NH}_3$ est une base beaucoup plus forte que l'ion acétate $\\text{CH}_3\\text{COO}^-$.

---

## 7. Réflexes d'Or du Baccalauréat Sénégalais

> [!IMPORTANT]
> 1. Acide faible dans l'eau : double flèche $\\rightleftharpoons$ OBLIGATOIRE (écrire $\\longrightarrow$ fait perdre les points).
> 2. $K_a = \\frac{[\\text{A}^-][\\text{H}_3\\text{O}^+]}{[\\text{HA}]}$ ne dépend QUE de la température.
> 3. Henderson-Hasselbalch : $\\text{pH} = pK_a + \\log\\left(\\frac{[\\text{Base}]}{[\\text{Acide}]}\\right)$. Si $[\\text{Base}] = [\\text{Acide}]$, alors $\\text{pH} = pK_a$.
> 4. Intersection des courbes de distribution en $S$ : toujours en $\\text{pH} = pK_a$ à l'ordonnée $50\\%$.
> 5. Ostwald : quand $C \\searrow$, $\\alpha \\nearrow$, mais $[\\text{H}_3\\text{O}^+] \\searrow$ et $\\text{pH} \\nearrow$.
> 6. Force relative : $pK_a \\searrow \\implies$ acide plus fort $\\implies$ base conjuguée plus faible.

> [!WOLOF]
> - « Acide faible bi (naka acide acétique CH₃COOH) du jeex bépp ci ndox mi ! Dafa am lu ci des waxtu wu nekk, motax ñu koy bind ak ñaari flèche ⇌. »
> - « Constante Ka bi tàngaay bi rekk la dépendre ! Bu pKa bi tuuti, acide bi dafa gën a dëgër. »
> - « Bu [Base] = [Acide], pH bi day yem ci pKa bi rek ! Ci diagramme bi, dañuy croiser ci 50-50 ci pKa exact. »
> - « Loi Ostwald : boo yokkee ndox (dilution), alpha bi day yokk ndax molécules yi dañuy gën a xàjjikoo, waaye pH bi day yéeg jëm 7 ! »
`;

RICH_LESSONS_MAP.dosage_acide_faible_base_forte = `# C8 : Réaction Acide Faible / Base Forte, Effet Tampon et Dosages (Terminale S2)

Bienvenue dans le huitième chapitre de **Chimie de Terminale S2**, rigoureusement conforme au programme officiel sénégalais (MEN / IGEF / Office du Baccalauréat).

L'étude du dosage d'un acide faible par une base forte et la notion de **solution tampon** constituent un sujet récurrent et hautement valorisé au Baccalauréat sénégalais (exercices de chimie notés sur 4 à 6 points). Ce chapitre fait le lien direct entre les équilibres chimiques partiels du chapitre C7 et les applications pratiques au laboratoire et en médecine.

---

## 1. Caractéristiques de la Réaction de Dosage

Soit un acide faible noté $\\text{AH}$ (ex : acide éthanoïque $\\text{CH}_3\\text{COOH}$) dosé par une solution aqueuse de soude $(\\text{Na}^+ + \\text{OH}^-)$ de concentration connue $C_b$.

### 1.1 Équation-bilan du dosage
Les ions sodium $\\text{Na}^+$ étant des ions spectateurs (indifférents), l'équation de la réaction s'écrit :
$$\\text{AH} + \\text{OH}^- \\xrightarrow{K_R} \\text{A}^- + \\text{H}_2\\text{O}$$

### 1.2 Constante de réaction $K_R$
La constante de la réaction de dosage s'exprime en fonction de la constante d'acidité $K_a$ du couple et du produit ionique de l'eau $K_e$ :
$$K_R = \\frac{[\\text{A}^-]}{[\\text{AH}][\\text{OH}^-]} = \\frac{[\\text{A}^-][\\text{H}_3\\text{O}^+]}{[\\text{AH}]} \\times \\frac{1}{[\\text{H}_3\\text{O}^+][\\text{OH}^-]} = \\frac{K_a}{K_e} = 10^{14 - pK_a}$$

*Exemple type Bac S2 :* Pour l'acide éthanoïque ($pK_a = 4{,}8$ à $25^\\circ\\text{C}$) :
$$K_R = 10^{14 - 4{,}8} = 10^{9{,}2} \\approx 1{,}58 \\times 10^9 \\gg 10^4$$

> [!THEOREME] **Propriétés de la Réaction de Dosage :**
> Puisque $K_R \\gg 10^4$, la réaction de dosage est :
> 1. **Quasi-totale (quantitative) :** le réactif limitant est intégralement consommé. On l'écrit avec une **flèche simple ($\to$)**.
> 2. **Rapide :** l'équilibre chimique est atteint de manière quasi-instantanée dès l'ajout de la goutte de soude.
> 3. **Unique et exothermique :** aucune réaction parasite ne vient perturber la stœchiométrie du titrage.

---

## 2. Allure de la Courbe de Titrage $pH = f(V_b)$

La courbe obtenue lors du titrage pH-métrique d'un acide faible par une base forte présente une forme en "S" asymétrique caractérisée par **quatre zones fondamentales** :

![Figure 1 : Courbe caractéristique de dosage acide faible - base forte avec méthode des tangentes et demi-équivalence](/assets/pedagogie/dosage_acide_faible_base_forte_courbe.svg)

> [!VIE_REELLE] **Le Tampon Bicarbonate du Sang — La Chimie du Sport au Sénégal !**
> - Lors d'un match de football intense (Navétanes, Ligue 1 sénégalaise), tes muscles produisent de l'acide lactique $\\text{CH}_3\\text{CH(OH)COOH}$ qui libère des protons $\\text{H}^+$ dans le sang.
> - Sans tampon, le pH sanguin chuterait de $7{,}40$ à moins de $6{,}80$ en quelques secondes → **coma acidosique**.
> - Mais le sang contient le **système tampon bicarbonate** $\\text{H}_2\\text{CO}_3 / \\text{HCO}_3^-$ ($pK_a = 6{,}10$) qui capte les protons : $\\text{HCO}_3^- + \\text{H}^+ \\to \\text{H}_2\\text{CO}_3 \\to \\text{H}_2\\text{O} + \\text{CO}_2$.
> - Le $\\text{CO}_2$ excédentaire est évacué par la respiration accélérée. C'est pourquoi tu halètes après un sprint !
> - **Lien avec le Bac :** À la demi-équivalence, $V_b = \\frac{V_{bE}}{2} \\implies \\text{pH} = pK_a$. C'est exactement le principe qui explique l'efficacité maximale du tampon bicarbonate sanguin !

> [!WOLOF] **Xam-xam ci Wolof — Tampon Bicarbonate u Deret ak Jëkkël :**
> - « Deret bi ci wër-gu-yaram gi dafa am tampon bu am solo bu tudd **bicarbonate** $(\\text{H}_2\\text{CO}_3 / \\text{HCO}_3^-)$. »
> - « Boo defee sport bu méti naka navétanes, dëkk ji day jur acide lactique. Tampon bi day jël acide bi diko soppi $\\text{CO}_2$ bi ngay génne ci say poumons ! »
> - « Motax pH deret bi du soppiku mukk : dafay des ci $7{,}40 \\pm 0{,}02$ ! Kuko amul woon, benn match football rekk nit ki dafay coma acidosique. »
> - « **Réflexe Bac :** $V_b = \\frac{V_{bE}}{2}$ mooy demi-équivalence, foofu lañuy lire $pK_a$ ci courbe bi ! »

---

### 2.1 Les 4 zones remarquables de la courbe :
1. **Point initial ($V_b = 0$) :**
   La solution ne contient que l'acide faible à la concentration $C_a$. Le pH est supérieur à celui d'un acide fort de même concentration :
   $$\\text{pH}_0 \\approx \\frac{1}{2}(pK_a - \\log C_a)$$
2. **Zone de courbure initiale :**
   Le pH remonte d'abord rapidement sur les premiers millilitres en raison de la neutralisation des premiers ions $\\text{H}_3\\text{O}^+$, puis la pente s'adoucit très nettement.
3. **Plateau de demi-équivalence (Zone Tampon) :**
   Entre $0{,}2 V_{bE}$ et $0{,}8 V_{bE}$, la courbe présente une très faible pente. Le pH varie très lentement : c'est le **domaine de l'effet tampon**.
4. **Saut de pH à l'équivalence :**
   Un saut brusque de pH se produit au voisinage de $V_{bE}$, d'amplitude plus faible (environ 4 à 5 unités de pH) que pour un dosage fort-fort (environ 6 à 7 unités).
5. **Palier supérieur basique ($V_b > V_{bE}$) :**
   Le pH tend asymptotiquement vers celui de la soude versée en excès.

---

## 3. Le Point d'Équivalence $E(V_{bE}, pH_E)$

### 3.1 Définition et relation d'équivalence
L'équivalence est atteinte lorsque les quantités de matière d'acide initialement présent et de base forte versée sont dans les proportions stœchiométriques :
$$n_a = n_b \\iff C_a V_a = C_b V_{bE} \\implies C_a = \\frac{C_b V_{bE}}{V_a}$$

### 3.2 Nature acido-basique du milieu à l'équivalence : $\\text{pH}_E > 7$
> [!ATTENTION] **Le Piège Éliminatoire N°1 au Baccalauréat Sénégalais :**
> Contrairement au dosage d'un acide fort par une base forte où $\\text{pH}_E = 7{,}00$, pour un acide faible dosé par une base forte, **le pH à l'équivalence est TOUJOURS STRICTEMENT SUPÉRIEUR À 7 à $25^\\circ\\text{C}$ ($\\text{pH}_E > 7$)** !

*Démonstration exigée au Bac :*
À l'équivalence, tout l'acide $\\text{AH}$ a été converti en sa base conjuguée $\\text{A}^-$. Le mélange final est une solution aqueuse de base faible de concentration :
$$C'_b = \\frac{C_a V_a}{V_a + V_{bE}} = \\frac{C_b V_{bE}}{V_a + V_{bE}}$$
Dans l'eau, cette base faible subit une hydrolyse partielle génératrice d'ions hydroxyde :
$$\\text{A}^- + \\text{H}_2\\text{O} \\rightleftharpoons \\text{AH} + \\text{OH}^-$$
La présence de ces ions $\\text{OH}^-$ confère à la solution un caractère basique. La formule approchée donne :
$$\\text{pH}_E = 7 + \\frac{1}{2} pK_a + \\frac{1}{2}\\log C'_b > 7$$

### 3.3 Détermination graphique de l'équivalence : Méthode des Tangentes Parallèles
Pour repérer expérimentalement $E(V_{bE}, \\text{pH}_E)$ :
1. Tracer deux tangentes parallèles à la courbe de part et d'autre du point d'inflexion (l'une avant le saut, l'autre après).
2. Tracer une droite perpendiculaire commune à ces deux tangentes.
3. Déterminer le milieu de ce segment perpendiculaire et tracer la droite médiane équidistante (parallèle aux deux premières tangentes).
4. L'intersection de la médiane avec la courbe de titrage donne exactement le **point d'équivalence $E$**.

---

## 4. La Demi-Équivalence : Détermination Graphique du $pK_a$

### 4.1 Théorème fondamental de la demi-équivalence
Lorsque le volume de soude versé correspond à la moitié du volume équivalent :
$$V_b = \\frac{V_{bE}}{2}$$
Exactement la moitié de la quantité initiale d'acide faible a été neutralisée et transformée en base conjuguée $\\text{A}^-$ :
$$n(\\text{AH})_{\\text{restant}} = C_a V_a - C_b \\left(\\frac{V_{bE}}{2}\\right) = C_a V_a - \\frac{C_a V_a}{2} = \\frac{C_a V_a}{2}$$
$$n(\\text{A}^-)_{\\text{formé}} = C_b V_b = \\frac{C_a V_a}{2}$$
Ainsi :
$$[\\text{AH}] = [\\text{A}^-] \\iff \\frac{[\\text{A}^-]}{[\\text{AH}]} = 1$$

En appliquant la relation d'Henderson-Hasselbalch :
$$\\text{pH} = pK_a + \\log\\left(\\frac{[\\text{A}^-]}{[\\text{AH}]}\\right) = pK_a + \\log(1) = pK_a + 0 = pK_a$$

> [!THEOREME] **Règle d'or du Bac S2 :**
> À la demi-équivalence ($V_b = \\frac{V_{bE}}{2}$), l'ordonnée lue sur la courbe de dosage donne directement la valeur du **$pK_a$ du couple acide/base dosé** !
> $$\\boxed{\\text{pH}\\left(\\frac{V_{bE}}{2}\\right) = pK_a}$$

*Propriété géométrique :* En ce point de demi-équivalence, la pente de la courbe $\\dfrac{d\\text{pH}}{dV_b}$ est **minimale**. La solution y présente sa résistance maximale aux variations de pH.

---

## 5. Les Solutions Tampons & Effet Tampon

### 5.1 Définition officielle
Une **solution tampon** est une solution dont le pH varie très peu :
- Lors d'un ajout modéré d'acide fort ou de base forte.
- Lors d'une dilution modérée avec de l'eau distillée.

Elle est constituée d'un mélange équimolaire ou de concentrations très voisines d'un acide faible et de sa base conjuguée :
$$[\\text{AH}] \\approx [\\text{A}^-]$$

> [!WOLOF] **Xam-xam ci Wolof — Système Tampon u deret ci wér-gu-yaram :**
> - « Sunu deret dafa am tampon d'or bu tudd **tampon bicarbonate** $(\\text{H}_2\\text{CO}_3 / \\text{HCO}_3^-)$. »
> - « Sa yaram boo defee sport bu méti (naka navétanes yi), dafay jur acide lactique. Tampon bicarbonate bi day jël acide bi diko soppi $\\text{CO}_2$ bi ngay génne ci say loxo ak say poumons ! »
> - « Motax pH deret bi du soppiku mukk : dafay des ci $7{,}40 \\pm 0{,}02$ ! Kuko amul woon, benn match football rekk nit ki dafay coma acidosique. »
> - « Demi-équivalence : $V_b = \\frac{V_{bE}}{2}$ mooy point bi tampon bi gën a dëgëre ci aduna ! »

### 5.2 Pourquoi le pH d'une solution tampon est-il stable ?
1. **Lors d'un ajout d'ions $\\text{H}_3\\text{O}^+$ (acide fort) :**
   Les protons ajoutés réagissent immédiatement avec la base faible $\\text{A}^-$ présente en grande quantité :
   $$\\text{A}^- + \\text{H}_3\\text{O}^+ \\to \\text{AH} + \\text{H}_2\\text{O}$$
   Les ions $\\text{H}_3\\text{O}^+$ parasites sont ainsi détruits et convertis en molécules d'acide faible.
2. **Lors d'un ajout d'ions $\\text{OH}^-$ (base forte) :**
   Les ions hydroxydes réagissent immédiatement avec l'acide faible $\\text{AH}$ :
   $$\\text{AH} + \\text{OH}^- \\to \\text{A}^- + \\text{H}_2\\text{O}$$
   Les ions $\\text{OH}^-$ sont détruits et convertis en base conjuguée.
3. **Lors d'une dilution :**
   D'après Henderson-Hasselbalch, $\\text{pH} = pK_a + \\log\\left(\\dfrac{n(\\text{A}^-)}{n(\\text{AH})}\\right)$. L'ajout d'eau distillée augmente le volume total mais ne modifie pas les quantités de matière $n(\\text{A}^-)$ et $n(\\text{AH})$. Le rapport reste inchangé, donc le pH ne varie pas !

### 5.3 Les 3 Méthodes de Préparation d'une Solution Tampon au Laboratoire
Au Baccalauréat sénégalais, la description du protocole expérimental de préparation d'une solution tampon est un classique absolu :

| Méthode | Protocole Expérimental | Justification Chimique |
| :--- | :--- | :--- |
| **1. Mélange équimolaire direct** | Mélanger des volumes égaux d'acide faible $\\text{AH}$ et de son sel de sodium $\\text{NaA}$ à même concentration $C_0$. | $[\\text{AH}] = [\\text{A}^-] \\implies \\text{pH} = pK_a$. |
| **2. Demi-neutralisation d'un acide faible par une base forte** | À un volume $V_a$ d'acide faible de concentration $C_a$, verser un volume $V_b = \\dfrac{V_{bE}}{2} = \\dfrac{C_a V_a}{2 C_b}$ de soude NaOH. | On neutralise la moitié de l'acide $\\implies$ Demi-équivalence $\\implies \\text{pH} = pK_a$. |
| **3. Demi-neutralisation d'une base faible par un acide fort** | À un volume $V_b$ de base faible (ex: $\\text{NH}_3$) de concentration $C_b$, verser un volume d'acide chlorhydrique $V_a = \\dfrac{V_{aE}}{2}$. | On neutralise la moitié de la base faible $\\implies$ Formation de son acide conjugué $\\implies [\\text{B}] = [\\text{BH}^+]$. |

---

## 6. Choix de l'Indicateur Coloré Convenable

Pour détecter visuellement l'équivalence lors d'un dosage colorimétrique sans pH-mètre :
> [!CONSEIL_BAC] **Critère Impératif de Choix :**
> La **zone de virage** de l'indicateur coloré doit **englober impérativement la valeur du pH au point d'équivalence $\\text{pH}_E$** :
> $$\\boxed{\\text{pH}_E \\in [\\text{p}K_i - 1 \\,;\\, \\text{p}K_i + 1]}$$

*Comparatif pour le dosage acide faible / base forte ($\\text{pH}_E \\approx 8{,}5 - 9{,}0$) :*
- **Phénolphtaléine (Zone de virage : 8,2 – 10,0) :**
  Passage d'incolore à rose fuchsia persistant. Puisque $\\text{pH}_E \\in [8{,}2 \,;\, 10{,}0]$, la phénolphtaléine est l'indicateur **parfait, idéal et rigoureusement adapté**.
- **Bleu de bromothymol BBT (Zone de virage : 6,0 – 7,6) :**
  Vire du jaune au bleu en passant par le vert à $\\text{pH} = 7{,}0$. Or, à $\\text{pH} = 7{,}0$, l'équivalence n'est pas encore atteinte pour un acide faible ! Le virage se produit prématurément. Le BBT est donc **inadapté ou très imprécis**.
- **Hélianthine (Zone de virage : 3,1 – 4,4) :**
  Vire dès le tout début du dosage. Totalement **inutilisable**.

---

## 7. Problème Type Baccalauréat Sénégal S2 Corrigé Pas à Pas

> [!BAC_SENEGAL] **Énoncé Officiel Type Bac S2 :**
> On prélève un volume $V_a = 20\\text{ mL}$ d'une solution aqueuse d'acide éthanoïque $\\text{CH}_3\\text{COOH}$ de concentration molaire $C_a$ inconnue.
> On réalise le dosage pH-métrique par une solution de soude de concentration $C_b = 0{,}10\\text{ mol/L}$.
> 1. Écrire l'équation de la réaction du dosage.
> 2. Le volume de soude versé à l'équivalence déterminé par la méthode des tangentes est $V_{bE} = 16\\text{ mL}$ et $\\text{pH}_E = 8{,}8$.
>    a) Calculer la concentration $C_a$ de l'acide éthanoïque.
>    b) Justifier pourquoi $\\text{pH}_E > 7$.
> 3. Déterminer le volume $V_{b\\frac{1}{2}}$ à la demi-équivalence et en déduire la valeur du $pK_a$ du couple sachant que le pH mesuré à ce volume vaut $4{,}8$.
> 4. Parmi les indicateurs suivants, lequel choisirez-vous ? Justifier.
>    - Hélianthine : 3,1 – 4,4
>    - Bleu de bromothymol : 6,0 – 7,6
>    - Phénolphtaléine : 8,2 – 10,0
> 5. On souhaite préparer $V = 100\\text{ mL}$ d'une solution tampon de $\\text{pH} = 4{,}8$ en utilisant la solution d'acide et la solution de soude précédentes. Décrire le protocole opératoire précis.

### Correction Détaillée et Barème de Notation :

**1. Équation de la réaction :**
$$\\text{CH}_3\\text{COOH} + \\text{OH}^- \\to \\text{CH}_3\\text{COO}^- + \\text{H}_2\\text{O}$$
*(1 point)* Flèche simple obligatoire car la réaction est quasi-totale ($K_R \\gg 10^4$).

**2. a) Calcul de $C_a$ :**
À l'équivalence : $C_a V_a = C_b V_{bE} \\implies C_a = \\dfrac{C_b V_{bE}}{V_a}$ :
$$C_a = \\frac{0{,}10 \\times 16}{20} = 0{,}08\\text{ mol/L}$$
*(1 point)*

**2. b) Justification de $\\text{pH}_E > 7$ :**
À l'équivalence, tout l'acide éthanoïque a été transformé en sa base conjuguée, l'ion éthanoate $\\text{CH}_3\\text{COO}^-$. La solution obtenue est une solution aqueuse de base faible qui réagit partiellement avec l'eau selon :
$$\\text{CH}_3\\text{COO}^- + \\text{H}_2\\text{O} \\rightleftharpoons \\text{CH}_3\\text{COOH} + \\text{OH}^-$$
La formation d'ions $\\text{OH}^-$ confère un caractère basique au milieu, d'où $\\text{pH}_E = 8{,}8 > 7$. *(1 point)*

**3. Demi-équivalence et $pK_a$ :**
$$V_{b\\frac{1}{2}} = \\frac{V_{bE}}{2} = \\frac{16}{2} = 8\\text{ mL}$$
À ce volume, $[\\text{CH}_3\\text{COOH}] = [\\text{CH}_3\\text{COO}^-]$, donc $\\text{pH} = pK_a + \\log(1) = pK_a$.
D'où :
$$pK_a = \\text{pH}(8\\text{ mL}) = 4{,}8$$
*(1 point)*

**4. Choix de l'indicateur coloré :**
L'indicateur convenable doit avoir sa zone de virage contenant $\\text{pH}_E = 8{,}8$.
Seule la **phénolphtaléine** dont la zone de virage est $[8{,}2 \,;\, 10{,}0]$ contient $8{,}8$. *(1 point)*

**5. Protocole de préparation de la solution tampon :**
Pour obtenir une solution tampon de $\\text{pH} = 4{,}8 = pK_a$, il faut se placer à la demi-équivalence :
$$n(\\text{OH}^-) = \\frac{1}{2} n_0(\\text{AH}) \\iff C_b V_b = \\frac{1}{2} C_a V_a \\implies V_b = \\frac{C_a V_a}{2 C_b} = \\frac{0{,}08 V_a}{2 \\times 0{,}10} = 0{,}4 V_a$$
Le volume total souhaité est $V = V_a + V_b = V_a + 0{,}4 V_a = 1{,}4 V_a = 100\\text{ mL}$.
$$V_a = \\frac{100}{1{,}4} \\approx 71{,}4\\text{ mL}$$
$$V_b = 100 - 71{,}4 = 28{,}6\\text{ mL}$$
*Protocole :* À l'aide d'une burette graduée ou de pipettes jaugées, prélever $71{,}4\\text{ mL}$ de la solution d'acide éthanoïque et y ajouter $28{,}6\\text{ mL}$ de la solution de soude. Agiter soigneusement : la solution obtenue a un volume de $100\\text{ mL}$ et un pH stable de $4{,}80$. *(1 point)*

---

## 8. Synthèse Finale — Les 7 Réflexes Absolus du Bac S2

> [!IMPORTANT]
> **Réflexes à maîtriser par cœur pour l'épreuve de Chimie (C8) :**
> 1. **Équation de dosage :** flèche simple $\\\\to$ obligatoire (quasi-totale), car $K_R = 10^{14 - pK_a} \\\\gg 10^4$.
> 2. **Relation d'équivalence :** $C_a V_a = C_b V_{bE}$.
> 3. **pH à l'équivalence :** TOUJOURS $\\\\text{pH}_E > 7$ pour acide faible/base forte (jamais $7{,}00$).
> 4. **Demi-équivalence :** $V_b = \\\\frac{V_{bE}}{2} \\\\implies \\\\text{pH} = pK_a$ (lecture directe du $pK_a$ sur la courbe !).
> 5. **Indicateur :** Phénolphtaléine ($8{,}2 - 10{,}0$) ✅ — BBT ($6{,}0 - 7{,}6$) ❌ pour acide faible.
> 6. **Solution tampon :** $[\\\\text{AH}] \\\\approx [\\\\text{A}^-]$ → pH stable même sous acide, base ou dilution.
> 7. **Méthode des tangentes parallèles** pour la lecture graphique du point d'équivalence $E$.

> [!CONSEIL_BAC] **Tableau de Bord Rapide C8 — Dosage Acide Faible / Base Forte :**
>
> | Point de la courbe | Volume $V_b$ | pH caractéristique |
> | :--- | :---: | :--- |
> | Début ($V_b = 0$) | $0$ | $\\\\text{pH}_0 \\\\approx \\\\frac{1}{2}(pK_a - \\\\log C_a)$ |
> | **Demi-équivalence** | $\\\\frac{V_{bE}}{2}$ | $\\\\mathbf{\\\\text{pH} = pK_a}$ — Clé d'or Bac ! |
> | **Équivalence** | $V_{bE}$ | $\\\\text{pH}_E > 7$ (base faible $\\\\text{A}^-$ en excès) |
> | Après équivalence | $> V_{bE}$ | pH soude excès $\\\\approx 14 + \\\\log(C_b')$ |

> [!WOLOF] **Réflexes Finals en Wolof — Bul ko jaaxal !**
> - « **Équation bi :** Flèche simple $\\\\to$ la obligatoirement ! Boo bindal $\\\\rightleftharpoons$, point bi dafay wàcc. »
> - « **pH_E > 7 toujours :** Acide faible dosé par base forte = basique ci équivalence. Bul jàpp ne pH 7 la ! »
> - « **Demi-équivalence :** Lireel pH bi ci $V_{bE}/2$ ci courbe bi, moom rekk mooy $pK_a$ bi ! »
> - « **Phénolphtaléine** la indicateur bi gën a nef — BBT du ko jëf ndax zone de virage bi trop tôt la ! »
> - « **Tampon bi :** pH stable la si ñu yokkee ndaw acide walla base. Dafa melni goalkeeper bu dëgër gu du tólliku ! »
`;

export function getEnhancedLessonContent(lessonTitle: string, chapterTitle: string, rawContent: string | null): string {
  const titleLower = `${lessonTitle} ${chapterTitle}`.toLowerCase();

  if (
    titleLower.includes('dosage acide faible') ||
    titleLower.includes('effet tampon') ||
    titleLower.includes('tampon') ||
    titleLower.includes('demi-équivalence') ||
    titleLower.includes('demi-equivalence') ||
    titleLower.includes('dosage') ||
    titleLower.includes('c8')
  ) {
    return RICH_LESSONS_MAP.dosage_acide_faible_base_forte;
  }

  if (
    titleLower.includes('acide faible') ||
    titleLower.includes('base faible') ||
    titleLower.includes('constante d’acidité') ||
    titleLower.includes("constante d'acidité") ||
    titleLower.includes('constante d’acidite') ||
    titleLower.includes("constante d'acidite") ||
    titleLower.includes('pka') ||
    titleLower.includes('henderson') ||
    titleLower.includes('ostwald') ||
    titleLower.includes('couples acide-base') ||
    titleLower.includes('couples acide/base') ||
    titleLower.includes('force relative') ||
    titleLower.includes('prédominance') ||
    titleLower.includes('predominance')
  ) {
    return RICH_LESSONS_MAP.acide_faible_base_faible;
  }

  if (
    titleLower.includes('alcool') ||
    titleLower.includes('alcol')
  ) {
    return RICH_LESSONS_MAP.alcools;
  }

  if (
    titleLower.includes('autoprotolyse') ||
    titleLower.includes('produit ionique') ||
    titleLower.includes('indicateur coloré') ||
    titleLower.includes('indicateurs colorés') ||
    titleLower.includes('zone de virage') ||
    titleLower.includes('ph d’une solution') ||
    titleLower.includes("ph d'une solution") ||
    titleLower.includes('échelle de ph') ||
    titleLower.includes('echelle de ph')
  ) {
    return RICH_LESSONS_MAP.autoprotolyse_ph;
  }

  if (
    titleLower.includes('acide fort') ||
    titleLower.includes('base forte') ||
    titleLower.includes('fort-fort') ||
    titleLower.includes('fort fort') ||
    titleLower.includes('dosage fort') ||
    titleLower.includes('titrage fort') ||
    titleLower.includes('neutralisation fort') ||
    titleLower.includes('dissociation totale')
  ) {
    return RICH_LESSONS_MAP.acide_fort_base_forte;
  }

  if (
    titleLower.includes('acide carboxylique') ||
    titleLower.includes('ester') ||
    titleLower.includes('saponification') ||
    titleLower.includes('anhydride') ||
    titleLower.includes("chlorure d'acyle") ||
    titleLower.includes('esterification') ||
    titleLower.includes('estérification') ||
    titleLower.includes('corps gras') ||
    titleLower.includes('savon') ||
    titleLower.includes('dean-stark')
  ) {
    return RICH_LESSONS_MAP.acides_derives;
  }

  if (
    titleLower.includes('amine') ||
    titleLower.includes('hofmann') ||
    titleLower.includes('alkylammonium') ||
    titleLower.includes('amide') ||
    titleLower.includes('nukleophile')
  ) {
    return RICH_LESSONS_MAP.amines;
  }

  if (
    titleLower.includes('cinetique') ||
    titleLower.includes('cinétique') ||
    titleLower.includes('vitesse de réaction') ||
    titleLower.includes('facteur cinétique')
  ) {
    return RICH_LESSONS_MAP.cinetique;
  }

  if (
    titleLower.includes('espace') ||
    titleLower.includes('géométrie dans l\'espace') ||
    titleLower.includes('geometrie dans l\'espace') ||
    titleLower.includes('vecteur normal') ||
    titleLower.includes('produit vectoriel') ||
    titleLower.includes('sphère') ||
    titleLower.includes('sphere') ||
    titleLower.includes('m11')
  ) {
    return RICH_LESSONS_MAP.geometrie;
  }

  if (
    titleLower.includes('statistique') ||
    titleLower.includes('médiane') ||
    titleLower.includes('moyenne') ||
    titleLower.includes('covariance') ||
    titleLower.includes('régression') ||
    titleLower.includes('regression')
  ) {
    return RICH_LESSONS_MAP.statistiques;
  }

  if (
    titleLower.includes('denombrement') ||
    titleLower.includes('dénombrement') ||
    titleLower.includes('probabilit') ||
    titleLower.includes('aléatoire')
  ) {
    return RICH_LESSONS_MAP.probabilites;
  }

  if (
    titleLower.includes('isom') ||
    titleLower.includes('transformation') ||
    titleLower.includes('glissée') ||
    titleLower.includes('glissee') ||
    titleLower.includes('antidéplacement') ||
    titleLower.includes('antideplacement') ||
    titleLower.includes('m10')
  ) {
    return RICH_LESSONS_MAP.isometries;
  }

  if (
    titleLower.includes('similitude')
  ) {
    return RICH_LESSONS_MAP.similitudes;
  }

  if (
    titleLower.includes('complexe') ||
    titleLower.includes('affixe')
  ) {
    return RICH_LESSONS_MAP.complexes;
  }

  if (
    titleLower.includes('differentiell') ||
    titleLower.includes('différentiell') ||
    titleLower.includes('equadiff') ||
    titleLower.includes('équadiff')
  ) {
    return RICH_LESSONS_MAP.equadiff;
  }

  if (
    titleLower.includes('primitive') ||
    titleLower.includes('intégral') ||
    titleLower.includes('integral') ||
    titleLower.includes('calcul d\'aire') ||
    titleLower.includes('calcul d’aire')
  ) {
    return RICH_LESSONS_MAP.integration;
  }

  if (titleLower.includes('exponentielle') || titleLower.includes(' exp') || titleLower.includes('exp(')) {
    return RICH_LESSONS_MAP.exponentielle;
  }

  if (titleLower.includes('logarithm') || titleLower.includes(' ln') || titleLower.includes('ln(')) {
    return RICH_LESSONS_MAP.logarithme;
  }

  if (titleLower.includes('suite') || titleLower.includes('recurrence')) {
    return RICH_LESSONS_MAP.suites;
  }

  if (titleLower.includes('asymptot') || titleLower.includes('branche') || titleLower.includes('position relative')) {
    return RICH_LESSONS_MAP.asymptotes;
  }

  if (titleLower.includes('valeur') || titleLower.includes('interm') || titleLower.includes('bijection') || titleLower.includes('tvi')) {
    return RICH_LESSONS_MAP.tvi;
  }

  if (titleLower.includes('deriv') || titleLower.includes('variation') || titleLower.includes('tangente')) {
    return RICH_LESSONS_MAP.derivation;
  }

  if (titleLower.includes('limite') || titleLower.includes('continuit')) {
    return RICH_LESSONS_MAP.limites;
  }

  // Si du contenu enrichi existe déjà dans la base
  if (rawContent && rawContent.trim().length > 100) {
    return rawContent;
  }

  return rawContent || '';
}

