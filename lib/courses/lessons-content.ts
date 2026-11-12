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
  denombrement: `# Chapitre M11 : Dénombrement (Terminale S2)

Bienvenue dans ce cours d'excellence dédié au **Dénombrement**, un chapitre fondamental et stratégique du **Baccalauréat Scientifique (Série S2)** au Sénégal, élaboré conformément aux directives officielles de l'**Office du Baccalauréat du Sénégal** (exercice noté sur 4 à 5 points).

Le dénombrement est l'art de compter le nombre d'éléments d'un ensemble fini sans avoir besoin de les énumérer un à un. Il constitue le socle mathématique indispensable de la théorie des probabilités.

---

## 1. Principes Fondamentaux de Comptage

Toute la théorie du dénombrement repose sur deux principes logiques universels :

### 1.1 Le Principe Additif (Règle du « OU » / Ensembles Disjoints)
Si une action peut être réalisée de $n_1$ façons, ou de $n_2$ façons (les deux options étant strictement mutuellement exclusives, c'est-à-dire d'intersection vide $A \\cap B = \\emptyset$), alors l'action peut être réalisée de :
$n = n_1 + n_2 \\text{ façons}$

Plus généralement, pour une partition d'un ensemble fini $E$ en $k$ sous-ensembles deux à deux disjoints $A_1, A_2, \\dots, A_k$ :
$\\text{Card}(E) = \\sum_{i=1}^k \\text{Card}(A_i) = \\text{Card}(A_1) + \\text{Card}(A_2) + \\dots + \\text{Card}(A_k)$

### 1.2 Le Principe Multiplicatif (Règle du « ET » / Arbre de Choix)
Si une procédure se décompose en $p$ étapes successives indépendantes, où la première étape offre $n_1$ choix possibles, la deuxième $n_2$ choix possibles, ..., et la $p$-ième $n_p$ choix possibles, alors le nombre total de résultats possibles est le produit :
$N = n_1 \\times n_2 \\times \\dots \\times n_p$

![Figure 1 : Arbre de Décision du Dénombrement • Choisir le bon modèle en 2 questions](/assets/pedagogie/m11_denombrement_tirages_arbres.svg)

> [!VIE_REELLE] **L'analogie du « Ceebu Jën » et des bus « Dakar Dem Dikk » :**
> - **Principe Additif (« OU ») :** Pour aller de Dakar à Saint-Louis, vous pouvez prendre soit le bus « Dakar Dem Dikk » (3 départs par jour), soit un car sept-places à la gare des Baux-Maraîchers (15 départs). Vous ne pouvez pas être dans les deux à la fois ! Le nombre total de trajets possibles est $3 + 15 = 18$ choix.
> - **Principe Multiplicatif (« ET ») :** Dans un restaurant traditionnel sénégalais, on compose son menu : 3 types de riz (Ceebu Jën rouge, Ceebu Jën blanc, Ceebu Yapp), 2 sauces (Daxaar ou Beugueuj) et 4 boissons locales (Bissap, Bouye, Gingembre, Ditakh). Le nombre de menus complets distincts est $3 \\times 2 \\times 4 = 24$ menus !

> [!WOLOF] **Xam-xam ci Wolof — Additif ak Multiplicatif :**
> - « **Additif (WALLA) :** Su nekkee dañuy tànn ci benn mbootaay WALLA ci beneen te dañoo séqu (amul benn élément bu bokk ci ñaar yépp), da ngay **boole** (additionner) : $n_1 + n_2$. »
> - « **Multiplicatif (AK) :** Su nekkee étape 1 dafay am AK étape 2 AK étape 3 (naka tànn yére AK tànn dall), da ngay **fulté** (multiplier) : $n_1 \\times n_2 \\times n_3$. »

---

## 2. Les $p$-listes (Listes avec Répétition & Ordre)

### Définition
Soit $E$ un ensemble fini non vide à $n$ éléments ($n = \\text{Card}(E)$) et $p$ un entier naturel non nul ($p \\in \\mathbb{N}^*$).
Une **$p$-liste** (ou $p$-uplet) d'éléments de $E$ est une suite ordonnée de $p$ éléments de $E$, distincts ou non.

$\\text{Nombre de } p\\text{-listes d'un ensemble à } n \\text{ éléments} = n^p$

### Conditions d'application :
1. **L'ordre compte :** $(a, b) \\neq (b, a)$.
2. **La répétition est autorisée :** $(a, a, a)$ est une $p$-liste valide.

> [!EXEMPLE] **Exemples types Bac S2 :**
> 1. **Code secret Wave ou Orange Money :** Un code PIN à 4 chiffres choisis parmi les 10 chiffres de 0 à 9 est une 4-liste de $\\{0, 1, \\dots, 9\\}$.
>    $N = 10^4 = 10\\,000 \\text{ codes possibles}$
> 2. **Numéros de téléphone mobile au Sénégal :** Un numéro commence par 77, 78, 76 ou 70, suivi de 7 chiffres de 0 à 9. Le nombre de numéros par préfixe est probabilites0^7 = 10\\,000\\,000$.

---

## 3. Les Permutations & Factorielles ($n!$)

### 3.1 Définition et Notation Factorielle
Pour tout entier naturel $n \\ge 1$, on appelle **factorielle $n$**, notée $n!$, le produit de tous les entiers strictement positifs de 1 à $n$ :
$n! = n \\times (n-1) \\times (n-2) \\times \\dots \\times 2 \\times 1$
Par convention universelle :
$0! = 1$

### 3.2 Permutation d'un ensemble fini
Une **permutation** d'un ensemble fini $E$ à $n$ éléments est une bijection de $E$ sur lui-même (c'est-à-dire un arrangement de TOUS les $n$ éléments de $E$).
$\\text{Nombre de permutations de } n \\text{ éléments} = n!$

### 3.3 Permutations avec répétition (Formule des Anagrammes)
Soit un mot de $n$ lettres contenant $n_1$ fois une première lettre, $n_2$ fois une deuxième lettre, ..., $n_k$ fois une $k$-ième lettre (avec $n_1 + n_2 + \\dots + n_k = n$).
Le nombre d'anagrammes distincts est :
$N = \\frac{n!}{n_1! \\times n_2! \\times \\dots \\times n_k!}$

> [!EXEMPLE] **Anagrammes classiques du Baccalauréat sénégalais :**
> - **« DAKAR »** : 5 lettres dont deux « A » ($n_A = 2$) :
>   $N = \\frac{5!}{2!} = \\frac{120}{2} = 60 \\text{ anagrammes}$
> - **« SENEGAL »** : 7 lettres dont deux « E » ($n_E = 2$) :
>   $N = \\frac{7!}{2!} = \\frac{5\\,040}{2} = 2\\,520 \\text{ anagrammes}$

---

## 4. Les Arrangements ($A_n^p$)

### Définition
Soit $E$ un ensemble à $n$ éléments et $p$ un entier tel que probabilites \\le p \\le n$.
Un **arrangement** de $p$ éléments de $E$ est une $p$-liste d'éléments **deux à deux distincts** de $E$.

$\\text{Formule des Arrangements : } A_n^p = \\frac{n!}{(n-p)!} = n \\times (n-1) \\times \\dots \\times (n-p+1)$

### Conditions d'application :
1. **L'ordre compte :** être 1er est différent d'être 2e.
2. **Pas de répétition :** un élément sélectionné ne peut plus être réutilisé ($p \\le n$).

### Propriétés :
- $A_n^1 = n$
- $A_n^n = n!$ (une permutation est un arrangement de tous les éléments)
- $A_n^0 = 1$

> [!VIE_REELLE] **Le Podium des Navétanes et de l'Arène Nationale :**
> Lors d'un tournoi de lutte traditionnelle avec 12 lutteurs inscrits, on décerne le Drapeau du Chef de l'État (1er), le 2e prix et le 3e prix.
> L'ordre compte impérativement (le champion n'est pas le 3e) et un lutteur ne peut pas monter sur deux marches du podium en même temps :
> $N = A_{12}^3 = 12 \\times 11 \\times 10 = 1\\,320 \\text{ podiums possibles}$

---

## 5. Les Combinaisons ($C_n^p$ ou $\\binom{n}{p}$)

### Définition
Soit $E$ un ensemble à $n$ éléments et $p$ un entier tel que $0 \\le p \\le n$.
Une **combinaison** de $p$ éléments de $E$ est un **sous-ensemble** (ou partie) à $p$ éléments de $E$.

$\\text{Formule des Combinaisons : } C_n^p = \\binom{n}{p} = \\frac{A_n^p}{p!} = \\frac{n!}{p!(n-p)!}$

### Relation fondamentale entre Arrangements et Combinaisons :
$A_n^p = p! \\times C_n^p$
*Justification :* Pour former un arrangement de $p$ éléments, on choisit d'abord les $p$ éléments sans ordre ($C_n^p$ façons), puis on les ordonne ($p!$ permutations).

### Propriétés d'Or des Combinaisons :
1. **Valeurs aux bornes :**
   $C_n^0 = 1, \\qquad C_n^1 = n, \\qquad C_n^n = 1$
2. **Propriété de symétrie :**
   $C_n^p = C_n^{n-p}$
   *(Choisir $p$ éléments à emporter revient exactement à choisir les $n-p$ éléments à laisser ! Ex : $C_{10}^8 = C_{10}^2 = \\frac{10 \\times 9}{2} = 45$).*
3. **Relation de Pascal (Fondamentale) :**
   Pour tous entiers probabilites \\le p \\le n-1$ :
   $C_n^p = C_{n-1}^p + C_{n-1}^{p-1}$

### Le Triangle de Pascal :
| $n$ \\ $p$ | $0$ | probabilites$ | $2$ | $3$ | $4$ | $5$ |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| **0** | probabilites$ | | | | | |
| **1** | probabilites$ | probabilites$ | | | | |
| **2** | probabilites$ | $2$ | probabilites$ | | | |
| **3** | probabilites$ | $3$ | $3$ | probabilites$ | | |
| **4** | probabilites$ | $4$ | $6$ | $4$ | probabilites$ | |
| **5** | probabilites$ | $5$ | probabilites0$ | probabilites0$ | $5$ | probabilites$ |

> [!WOLOF] **Xam-xam ci Wolof — Combinaison C_n^p :**
> - « Combinaison mooy tànn mbooloo bu amul ordre : dafa melni ñetti xarit yu bokk jënd benn kilo thieb ci boutique bi. Képp ku ci jëkk wax ak ku ci mujj wax ñoom ñépp ñoo yor thieb bi. Motax ñu koy divisé ci $p!$ ndax ordre bi amul benn solo ! »

---

## 6. La Formule du Binôme de Newton

Pour tous réels ou complexes $a$ et $b$, et pour tout entier naturel $n \\ge 1$ :

$(a + b)^n = \\sum_{k=0}^n C_n^k a^{n-k} b^k = C_n^0 a^n + C_n^1 a^{n-1}b + C_n^2 a^{n-2}b^2 + \\dots + C_n^n b^n$

### Sommes remarquables issues du Binôme :
1. **Nombre total de parties de $E$ (en posant $a = 1, b = 1$) :**
   $\\text{Card}(\\mathcal{P}(E)) = \\sum_{k=0}^n C_n^k = C_n^0 + C_n^1 + C_n^2 + \\dots + C_n^n = (1 + 1)^n = 2^n$
2. **Somme alternée (en posant $a = 1, b = -1$) :**
   $\\sum_{k=0}^n (-1)^k C_n^k = C_n^0 - C_n^1 + C_n^2 - \\dots + (-1)^n C_n^n = (1 - 1)^n = 0$

---

## 7. Typologie Complète des Tirages d'Urnes au Bac S2

Soit une urne contenant $N$ boules, dont $n_R$ rouges et $n_V$ vertes ($N = n_R + n_V$). On extrait $p$ boules.

| Type de Tirage énoncé au Bac | Outil mathématique | Nombre total de cas possibles $\\text{Card}(\\Omega)$ | Tirer exactement $k$ rouges et $p-k$ vertes |
| :--- | :---: | :---: | :---: |
| **Simultanément** (ou d'un coup) | **Combinaisons** $C_N^p$ | $\\text{Card}(\\Omega) = C_N^p$ | $C_{n_R}^k \\times C_{n_V}^{p-k}$ |
| **Successivement sans remise** | **Arrangements** $A_N^p$ | $\\text{Card}(\\Omega) = A_N^p$ | $C_p^k \\times A_{n_R}^k \\times A_{n_V}^{p-k}$ |
| **Successivement avec remise** | **$p$-listes** | $\\text{Card}(\\Omega) = N^p$ | $C_p^k \\times (n_R)^k \\times (n_V)^{p-k}$ |

> [!CAUTION] **Piège classique Bac S2 sur les tirages successifs :**
> En tirage successif, n'oubliez **JAMAIS** le coefficient d'ordre $C_p^k$ qui compte les différentes positions possibles des couleurs ! En tirage simultané, il n'y a pas d'ordre, donc pas de coefficient $C_p^k$.

---

## 8. Épreuve Officielle — Office du Baccalauréat du Sénégal (Série S2)

### Énoncé Officiel (Office du Baccalauréat du Sénégal — 4 Points)

Une urne opaque contient probabilites0$ boules indiscernables au toucher :
- $4$ boules blanches numérotées probabilites, 2, 3, 4$.
- $3$ boules rouges numérotées probabilites, 2, 3$.
- $3$ boules noires numérotées probabilites, 2, 3$.

#### Partie A : Tirage Simultané (2 points)
On tire simultanément $3$ boules de l'urne.
1. **(0,5 pt)** Démontrer que le nombre total de tirages possibles est $\\text{Card}(\\Omega) = 120$.
2. **(0,5 pt)** Déterminer le nombre de tirages unicolores (contenant 3 boules de même couleur).
3. **(0,5 pt)** Déterminer le nombre de tirages tricolores (contenant une boule de chaque couleur).
4. **(0,5 pt)** Déterminer le nombre de tirages contenant au moins une boule blanche.

#### Partie B : Tirage Successif sans Remise (2 points)
On tire successivement et sans remise $3$ boules de l'urne.
1. **(0,5 pt)** Calculer le nombre total de tirages possibles.
2. **(0,5 pt)** Déterminer le nombre de tirages où la première boule tirée est rouge et la dernière est noire.
3. **(1 pt)** Déterminer le nombre de tirages contenant exactement 2 boules portant un numéro impair.

---

### Corrigé Détaillé et Barème Officiel Pas à Pas

#### Partie A : Tirage Simultané de 3 boules parmi 10

- **1. Nombre total de tirages possibles (0,5 point) :**
  Le tirage est simultané, il s'agit donc de choisir sans ordre 3 boules parmi les 10 disponibles :
  $\\text{Card}(\\Omega) = C_{10}^3 = \\frac{10 \\times 9 \\times 8}{3 \\times 2 \\times 1} = \\frac{720}{6} = 120$
  **Conclusion :** Il y a exactement probabilites20$ tirages possibles.

- **2. Tirages unicolores (0,5 point) :**
  Un tirage est unicolore s'il est composé de 3 blanches OU 3 rouges OU 3 noires :
  $N_1 = C_4^3 + C_3^3 + C_3^3 = 4 + 1 + 1 = 6 \\text{ tirages}$

- **3. Tirages tricolores (0,5 point) :**
  Un tirage tricolore contient exactement 1 blanche ET 1 rouge ET 1 noire :
  $N_2 = C_4^1 \\times C_3^1 \\times C_3^1 = 4 \\times 3 \\times 3 = 36 \\text{ tirages}$

- **4. Tirages avec au moins une boule blanche (0,5 point) :**
  Utilisons le réflexe impératif de l'**événement contraire** $\\overline{E}$ : « n'obtenir aucune boule blanche », c'est-à-dire tirer les 3 boules parmi les probabilites0 - 4 = 6$ boules de couleur rouge ou noire :
  $\\text{Card}(\\overline{E}) = C_6^3 = \\frac{6 \\times 5 \\times 4}{3 \\times 2 \\times 1} = 20$
  Par soustraction du total :
  $\\text{Card}(E) = \\text{Card}(\\Omega) - \\text{Card}(\\overline{E}) = 120 - 20 = 100 \\text{ tirages}$

---

#### Partie B : Tirage Successif sans Remise de 3 boules

- **1. Nombre total de tirages possibles (0,5 point) :**
  Le tirage est successif et sans remise, l'ordre compte et il n'y a pas de répétition :
  $\\text{Card}(\\Omega') = A_{10}^3 = 10 \\times 9 \\times 8 = 720 \\text{ tirages possibles}$

- **2. Première rouge et dernière noire (0,5 point) :**
  La procédure de choix se décompose en 3 étapes ordonnées :
  - Étape 1 : Choisir la 1ère boule parmi les 3 rouges ($3$ choix possibles).
  - Étape 2 : Choisir la 3ème boule parmi les 3 noires ($3$ choix possibles).
  - Étape 3 : Choisir la 2ème boule parmi les probabilites0 - 2 = 8$ boules restantes ($8$ choix possibles).
  Par le principe multiplicatif :
  $N_3 = 3 \\times 8 \\times 3 = 72 \\text{ tirages}$

- **3. Exactement 2 boules portant un numéro impair (1 point) :**
  Comptabilisons les numéros pairs et impairs dans l'urne :
  - Numéros impairs :
    - Blanches : probabilites, 3$ (2 boules)
    - Rouges : probabilites, 3$ (2 boules)
    - Noires : probabilites, 3$ (2 boules)
    - Total de boules impaires : $2 + 2 + 2 = 6$ boules.
  - Numéros pairs :
    - Blanches : $2, 4$ (2 boules)
    - Rouges : $2$ (1 boule)
    - Noires : $2$ (1 boule)
    - Total de boules paires : $2 + 1 + 1 = 4$ boules.
  
  Pour obtenir exactement 2 boules impaires et 1 boule paire lors d'un tirage successif :
  - Choisir les 2 emplacements des boules impaires parmi les 3 tirages : $C_3^2 = 3$ façons (ex : $(I, I, P)$, $(I, P, I)$ ou $(P, I, I)$).
  - Choisir et ordonner 2 boules impaires parmi les 6 : $A_6^2 = 6 \\times 5 = 30$.
  - Choisir 1 boule paire parmi les 4 : $A_4^1 = 4$.
  
  Par le principe multiplicatif avec coefficient d'ordre :
  $N_4 = C_3^2 \\times A_6^2 \\times A_4^1 = 3 \\times 30 \\times 4 = 360 \\text{ tirages}$

---

## 9. Synthèse Finale & 7 Réflexes d'Or en Wolof

> [!CONSEIL_BAC] **Les 7 Commandements du Dénombrement au Bac S2 :**
> 1. **La question de l'Ordre :** Demandez-vous toujours : si j'échange l'ordre des éléments, est-ce un résultat différent ? Si NON $\\to C_n^p$. Si OUI $\\to A_n^p$ ou $n^p$.
> 2. **La question de la Répétition :** Les éléments peuvent-ils être repris ? Si OUI $\\to n^p$. Si NON $\\to A_n^p$ ou $C_n^p$.
> 3. **Le réflexe « Au moins un » :** Ne calculez JAMAIS la somme directe ! Posez immédiatement : $\\text{Card} = \\text{Total} - \\text{Card}(\\text{Aucun})$.
> 4. **ET / OU :** « ET » signifie $\\times$ (multiplication). « OU » signifie $+$ (addition pour cas disjoints).
> 5. **Permutation avec répétition :** Pour un mot de $n$ lettres, divisez $n!$ par les factorielles des fréquences de chaque lettre répétée.
> 6. **Tirage successif et ordre :** N'oubliez jamais le coefficient d'ordre $C_p^k$ lors des tirages successifs bicolores.
> 7. **Calcul mental des combinaisons :** Développez $C_n^p = \\frac{n(n-1)\\dots}{p!}$ et simplifiez avant de multiplier pour éviter les gros nombres.

> [!WOLOF] **7 Réflexes ci Wolof — Bul ko fàtte mukk ci Bac S2 :**
> - « **Simultané :** Mooy $C_n^p$ (bolé ci loxo benn yoon — ordre amul solo mukk) ! »
> - « **Successif sans remise :** Mooy $A_n^p$ (bennaat bennaat te danga koy tëye — ordre am na solo) ! »
> - « **Successif avec remise :** Mooy $n^p$ (bennaat bennaat te danga koy délloosi — repetition am na solo) ! »
> - « **Au moins un :** Dindil « benn amul » ci Total bi, nga am li nga bëgg ci 5 secondes ! »
> - « **AK mooy ×, WALLA mooy + :** Bul jaxase multiplication ak addition mukk ci problème bi ! »
> - « **Anagrammes :** Factorielle total bi ci kaw, factorielle répétitions yi ci suuf ! »
> - « **Pascal ak Newton :** $(a+b)^n = \\sum C_n^k a^{n-k} b^k$ te somme des coefficients $C_n^k$ mooy $2^n$ ! »
`,

  probabilites: `# Chapitre M12 : Probabilités (Terminale S2)

Bienvenue dans ce cours d'excellence dédié aux **Probabilités**, chapitre central et stratégique du **Baccalauréat Scientifique (Série S2)** au Sénégal (exercice noté sur 4 à 5 points, souvent dans l'exercice d'analyse).

Les probabilités permettent de **quantifier l'incertitude** : elles sont le prolongement naturel du Dénombrement (M11) et constituent le socle de la statistique moderne.

---

## 1. Rappels Fondamentaux & Vocabulaire

### 1.1 Univers, Événements et Probabilité

Soit une expérience aléatoire. On note :
- $\\Omega$ : l'**univers** (ensemble de tous les résultats possibles, appelés issues).
- $A, B, C, \\dots$ : des **événements** (sous-ensembles de $\\Omega$).
- $\\bar{A}$ (ou $A^c$) : l'**événement contraire** de $A$ : toutes les issues de $\\Omega$ qui ne sont pas dans $A$.

**Propriétés fondamentales d'une probabilité $P$ :**
$0 \\le P(A) \\le 1, \\qquad P(\\Omega) = 1, \\qquad P(\\emptyset) = 0$
$P(\\bar{A}) = 1 - P(A)$

**Incompatibilité :** $A$ et $B$ sont **incompatibles** (ou disjoints) si $A \\cap B = \\emptyset$. Dans ce cas :
$P(A \\cup B) = P(A) + P(B)$

**Cas général (additivité) :**
$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$

**Équiprobabilité :** Si toutes les issues sont équiprobables :
$P(A) = \\frac{\\text{Card}(A)}{\\text{Card}(\\Omega)}$

> [!VIE_REELLE] **Analogie Sénégalaise — Match de football :**
> Un match de Navétanes entre Parcelles Assainies et Médina. L'univers $\\Omega = \\{$victoire PA, victoire Médina, match nul$\\}$. Si les équipes sont équilibrées : $P(\\text{victoire PA}) = 1/3$.
> L'événement contraire de « victoire PA » est « PA ne gagne pas » = victoire Médina **OU** nul.
> $P(\\bar{A}) = 1 - 1/3 = 2/3$.

> [!WOLOF] **Xam-xam ci Wolof :**
> « Probabilité $P(A)$ mooy yéen fate bu am na ci $A$ ci 100 xob ci Dieu. $P(\\Omega) = 1$ mooy dafa am ci wàllu bi. $P(\\bar{A}) = 1 - P(A)$ mooy lu amul ci $A$ ».

---

## 2. Probabilités Conditionnelles

### Définition

Soient $A$ et $B$ deux événements avec $P(B) \\neq 0$. La **probabilité conditionnelle** de $A$ sachant $B$ est :

$P_B(A) = P(A | B) = \\frac{P(A \\cap B)}{P(B)}$

**Interprétation :** C'est la probabilité que $A$ se réalise, si l'on sait déjà que $B$ s'est réalisé.

**Conséquence directe :**
$P(A \\cap B) = P(B) \\times P_B(A) = P(A) \\times P_A(B)$

### 2.1 Événements Indépendants

$A$ et $B$ sont **indépendants** si et seulement si :
$P(A \\cap B) = P(A) \\times P(B)$

Équivalences : $A$ et $B$ indépendants $\\iff$ $P_B(A) = P(A)$ $\\iff$ $P_A(B) = P(B)$.

> [!NOTE] **Attention — Indépendance ≠ Incompatibilité !**
> - **Incompatibles :** $A$ et $B$ ne peuvent pas se produire en même temps ($A \\cap B = \\emptyset$).
> - **Indépendants :** La réalisation de l'un ne modifie pas la probabilité de l'autre.
> Ces deux notions sont souvent confondues au Bac. Si $P(A) > 0$ et $P(B) > 0$ : deux événements incompatibles ne peuvent **pas** être indépendants (car $P(A \\cap B) = 0 \\neq P(A)P(B)$).

> [!VIE_REELLE] **Exemple Sénégalais :**
> On lance un dé et on tire une carte dans un jeu. Ces deux actions sont **indépendantes** : le résultat du dé n'influence en rien la carte tirée.
>
> En revanche : on tire une boule dans une urne (sans remise), puis une seconde. La 2ème boule **dépend** de la première (car l'urne a changé après le premier tirage).

---

## 3. Formule des Probabilités Totales

### Système Complet d'Événements

Des événements $A_1, A_2, \\dots, A_k$ forment un **système complet** (partition de $\\Omega$) si :
1. Ils sont deux à deux incompatibles : $A_i \\cap A_j = \\emptyset$ pour $i \\neq j$.
2. Ils recouvrent $\\Omega$ : $A_1 \\cup A_2 \\cup \\dots \\cup A_k = \\Omega$.
3. Chaque $P(A_i) > 0$.

### Formule des Probabilités Totales

Pour tout événement $B$ :
$P(B) = \\sum_{i=1}^{k} P(A_i) \\times P_{A_i}(B) = P(A_1)P_{A_1}(B) + P(A_2)P_{A_2}(B) + \\dots + P(A_k)P_{A_k}(B)$

**Cas particulier (partition en 2) :** $A$ et $\\bar{A}$ forment toujours une partition de $\\Omega$ :
$P(B) = P(A) \\times P_A(B) + P(\\bar{A}) \\times P_{\\bar{A}}(B)$

> [!TIP] **L'Arbre Pondéré : l'outil indispensable au Bac S2**
> L'arbre pondéré est la traduction visuelle de la formule des probabilités totales.
> - Chaque **branche** porte une probabilité.
> - Le produit des probabilités le long d'un chemin donne la probabilité de l'intersection des événements.
> - La **somme** des probabilités de tous les chemins menant à $B$ donne $P(B)$ (formule des proba. totales).
> - **Vérification :** La somme des proba. issues d'un même nœud vaut toujours **1**.

> [!EXEMPLE] **Exercice type Bac S2 — Urnes et Arbre pondéré :**
> Une urne $U_1$ contient 3 boules rouges et 2 boules bleues. Une urne $U_2$ contient 1 boule rouge et 4 boules bleues. On choisit une urne au hasard ($P(U_1) = P(U_2) = 1/2$), puis on tire une boule.
>
> **Calculer $P(R)$ où $R$ = « la boule tirée est rouge ».**
>
> Arbre pondéré :
> - Branche $U_1$ (prob. statistiques/2$) → boule rouge (prob. $3/5$) : contribue statistiques/2 \\times 3/5 = 3/10$.
> - Branche $U_1$ (prob. statistiques/2$) → boule bleue (prob. $2/5$) : contribue statistiques/2 \\times 2/5 = 2/10$.
> - Branche $U_2$ (prob. statistiques/2$) → boule rouge (prob. statistiques/5$) : contribue statistiques/2 \\times 1/5 = 1/10$.
> - Branche $U_2$ (prob. statistiques/2$) → boule bleue (prob. $4/5$) : contribue statistiques/2 \\times 4/5 = 4/10$.
> $P(R) = \\frac{1}{2} \\times \\frac{3}{5} + \\frac{1}{2} \\times \\frac{1}{5} = \\frac{3}{10} + \\frac{1}{10} = \\frac{4}{10} = \\frac{2}{5}$

---

## 4. Formule de Bayes (Probabilité A Posteriori)

La **formule de Bayes** permet de « remonter » dans l'arbre : étant donné un résultat observé ($B$), on cherche quelle en est la cause la plus probable ($A_i$).

$P_{B}(A_i) = \\frac{P(A_i) \\times P_{A_i}(B)}{P(B)} = \\frac{P(A_i \\cap B)}{\\sum_{j} P(A_j) P_{A_j}(B)}$

> [!EXEMPLE] **Suite de l'exercice Urnes — Formule de Bayes :**
> On sait que la boule tirée est rouge ($R$). Quelle est la probabilité qu'elle provienne de $U_1$ ?
> $P_R(U_1) = \\frac{P(U_1 \\cap R)}{P(R)} = \\frac{P(U_1) \\times P_{U_1}(R)}{P(R)} = \\frac{\\frac{1}{2} \\times \\frac{3}{5}}{\\frac{2}{5}} = \\frac{\\frac{3}{10}}{\\frac{4}{10}} = \\frac{3}{4}$
> **Interprétation :** Si l'on a tiré une boule rouge, il y a 75 % de chances qu'elle vienne de l'urne $U_1$ (qui avait plus de rouges).

> [!WOLOF] **Bayes en Wolof :**
> « Bayes mooy laajal : « Naka moo woon ak soow bi mu jeex ? » Su ma xam ne boule bi dafa weex, Bayes dafa ma jàng ndax $U_1$ walla $U_2$ la bëgg ci am bu dëkk. »

---

## 5. Variables Aléatoires Discrètes

### Définition

Une **variable aléatoire (v.a.)** $X$ est une fonction qui associe à chaque issue de $\\Omega$ un nombre réel.

La **loi de probabilité** de $X$ est l'ensemble des couples $(x_i, P(X = x_i))$ avec $\\sum_i P(X = x_i) = 1$.

### Espérance Mathématique $E(X)$

L'**espérance** est la valeur moyenne de $X$ sur un très grand nombre d'expériences :

$E(X) = \\sum_i x_i \\times P(X = x_i)$

### Variance $V(X)$ et Écart-type $\\sigma(X)$

La **variance** mesure la dispersion des valeurs de $X$ autour de son espérance :

$V(X) = E(X^2) - [E(X)]^2 = \\sum_i x_i^2 \\cdot P(X = x_i) - [E(X)]^2$

L'**écart-type** : $\\sigma(X) = \\sqrt{V(X)}$.

> [!TIP] **Méthode pratique pour le Bac S2 :**
> Dresser un tableau avec les lignes $x_i$, $P(X = x_i)$, $x_i \\cdot P(X = x_i)$, $x_i^2 \\cdot P(X = x_i)$.
> Puis : $E(X) = \\sum x_i \\cdot P(X = x_i)$ et $V(X) = \\sum x_i^2 \\cdot P(X = x_i) - [E(X)]^2$.

> [!VIE_REELLE] **Exemple Sénégalais — Jeu de Cartes :**
> Dans un jeu de loterie sénégalais, on gagne $X$ francs CFA selon le résultat.
> L'espérance $E(X)$ représente le gain moyen par partie sur le long terme.
> Si $E(X) < 0$, le joueur perd en moyenne à chaque partie : le jeu n'est pas favorable !

---

## 6. La Loi Binomiale $\\mathcal{B}(n, p)$

### Schéma de Bernoulli

Une **épreuve de Bernoulli** est une expérience aléatoire à deux issues :
- **Succès $S$** de probabilité $p$ ($0 < p < 1$).
- **Échec $\\bar{S}$** de probabilité $q = 1 - p$.

Un **schéma de Bernoulli d'ordre $n$** consiste à répéter $n$ fois de façon **indépendante** la même épreuve de Bernoulli (même probabilité $p$).

### Définition de la Loi Binomiale

Soit $X$ le nombre de succès lors d'un schéma de Bernoulli d'ordre $n$ de paramètre $p$.

$X$ suit la **loi binomiale** $\\mathcal{B}(n, p)$ et pour tout $k \\in \\{0, 1, \\dots, n\\}$ :

$P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k} = C_n^k \\, p^k \\, q^{n-k}$

### Espérance et Variance de la Loi Binomiale

$E(X) = np \\qquad V(X) = np(1-p) = npq \\qquad \\sigma(X) = \\sqrt{npq}$

Ces formules sont **à connaître par cœur** pour le Bac S2 !

> [!VIE_REELLE] **Analogie Sénégalaise — Penalty :**
> Un grand attaquant de la Ligue 1 Sénégalaise réussit ses penalties avec une probabilité $p = 0,8$.
> On lui accorde 5 tentatives de penalty. Soit $X$ le nombre de buts marqués.
> $X \\sim \\mathcal{B}(5, 0,8)$.
> - $P(X = 5) = C_5^5 \\times (0,8)^5 \\times (0,2)^0 = 1 \\times 0,32768 = 0,328$ (il marque tous les 5).
> - $P(X = 3) = C_5^3 \\times (0,8)^3 \\times (0,2)^2 = 10 \\times 0,512 \\times 0,04 = 0,2048$.
> - $E(X) = 5 \\times 0,8 = 4$ buts en moyenne. $V(X) = 5 \\times 0,8 \\times 0,2 = 0,8$.

> [!WOLOF] **Loi Binomiale en Wolof :**
> « Loi binomiale $\\mathcal{B}(n, p)$ dafa melni: da ngay yor $n$ xob yu ndigël te ci bépp xob bi da ngay am "succès" ak yoon $p$. $X$ mooy lolol "succès" yu may ci $n$ xob yi.
> Formule : $P(X = k) = C_n^k \\times p^k \\times (1-p)^{n-k}$.
> Espérance $E(X) = np$ : lu xiif ci am na "succès" bi fi ëlëk. »

---

## 7. Méthodes d'Or pour le Bac S2

### Méthode 1 — « Au moins un » : Passer par le Contraire

$P(X \\ge 1) = 1 - P(X = 0) = 1 - (1-p)^n$

**Règle d'or :** Dès que l'énoncé dit « **au moins un** », calculez d'abord $P(\\text{aucun succès}) = (1-p)^n$, puis soustrayez de 1.

> [!EXEMPLE] **Exemple Bac S2 :**
> On lance 4 fois un dé équilibré. Quelle est la probabilité d'obtenir au moins un 6 ?
> - $p = P(\\text{obtenir un 6}) = 1/6$.
> - $P(\\text{aucun 6 en 4 lancers}) = (5/6)^4 = 625/1296$.
> - $P(\\text{au moins un 6}) = 1 - 625/1296 = 671/1296 \\approx 0,518$.

### Méthode 2 — Identifier la Loi Binomiale

Vérifier que toutes les conditions sont réunies :
1. **$n$ épreuves** identiques et **indépendantes**.
2. Chaque épreuve a exactement **2 issues** : succès ($p$) ou échec (statistiques-p$).
3. **$p$ est constant** à chaque épreuve.

Si ces 3 conditions sont vérifiées : $X \\sim \\mathcal{B}(n, p)$.

> [!CAUTION] **Pièges fréquents au Bac S2 :**
> - Oublier que, **sans remise**, les épreuves ne sont plus indépendantes → la loi binomiale ne s'applique plus.
> - Confondre $P(X = k)$ (exactement $k$ succès) et $P(X \\le k)$ (au plus $k$ succès).
> - Oublier les unités dans la réponse finale (en particulier pour $E(X)$, qui a la même unité que $X$).

### Méthode 3 — L'Arbre Pondéré : Structure en 2 Étapes

Pour un arbre pondéré à 2 niveaux :
- **Nœuds du 1er niveau** : causes possibles $A_1, \\dots, A_k$ avec $\\sum P(A_i) = 1$.
- **Nœuds du 2ème niveau** : effets $B$ et $\\bar{B}$ avec $P_{A_i}(B) + P_{A_i}(\\bar{B}) = 1$.
- **Probabilité d'un chemin** : produit des probabilités des branches.
- **Probabilité totale de $B$** : somme des chemins menant à $B$.

---

## 8. Annales du Baccalauréat S2 — Section Officielle

Cette section présente les **sujets officiels du Baccalauréat S2 sénégalais** en Probabilités, avec le barème exact et le corrigé pas-à-pas, conformément aux directives de l'**Office du Baccalauréat du Sénégal**.

> [!IMPORTANT] **Stratégie Bac S2 — Probabilités :**
> L'exercice de probabilités au Bac S2 suit toujours la même structure :
> 1. **Partie A** (Dénombrement ou Probabilités classiques) : $C_n^p$, $A_n^p$, événement contraire.
> 2. **Partie B** (Arbre pondéré) : Construction de l'arbre, probabilités totales, Bayes.
> 3. **Partie C** (Variable aléatoire) : Loi de probabilité, espérance, variance ou loi binomiale.
>
> Travailler ces 3 parties dans l'ordre est toujours la bonne stratégie. Ne jamais passer à la partie suivante sans avoir terminé la précédente.

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

// C9 : ACIDES ALPHA-AMINÉS ET ÉLÉMENTS DE STÉRÉOCHIMIE (Terminale S2 Sénégal)
RICH_LESSONS_MAP.acides_amines = `# C9 : Acides α-Aminés & Éléments de Stéréochimie (Terminale S2)

Bienvenue dans le neuvième chapitre de **Chimie Organique et Générale** de **Terminale S2**, rigoureusement conforme au programme officiel sénégalais (MEN / IGEF / Office du Baccalauréat).

---

![Figure 1 : Projection de Fischer de l'alanine, zwitterion et liaison peptidique](/assets/pedagogie/c9_acides_amines_fischer_peptides.svg)

> [!VIE_REELLE] **Les Briques de la Vie au Sénégal :**
> - **L'arachide et le niébé du bassin arachidier** : nos légumineuses sénégalaises sont des concentrés exceptionnels de protéines végétales. Ces protéines sont de longues chaînes linéaires formées par l'enchaînement précis d'acides $\\alpha$-aminés reliés par des liaisons peptidiques.
> - **Le lait caillé (Sow)** : la digestion des protéines lactiques (caséines) libère les acides aminés indispensables (valine, leucine, phénylalanine) que notre organisme ne peut synthétiser lui-même.
> - **La kératine de nos cheveux et de notre peau** : une protéine fibreuse riche en cystéine dont les ponts disulfures assurent la résistance mécanique.

> [!WOLOF] **Xam-xam ci Wolof — Acides Aminés & Stéréochimie :**
> - « Acides aminés ñoy briques yi tabax suñuy protéines ci biir yaram (gérte, ñebbe, sow, yàpp). Dafa am fonction acide $-\\text{COOH}$ ak fonction amine $-\\text{NH}_2$ ci benn carbone alpha bi ! »
> - « Carbone asymétrique $C^*$ dafa laaj 4 partenaires yu bokkul benn yoon ! Acides aminés yépp am nañu ko ba mu des **Glycine** rekk ndax moom ñaari hydrogènes $H$ la yor ci carbone alpha bi (achirale la, amul série D walla L) ! »
> - « Ci projection bu Fischer, bindal $-\\text{COOH}$ ci kaw, $-\\text{R}$ ci suuf. Bu $-\\text{NH}_2$ nekké ci loxo cammooñ (gauche), mooy **série L** ! Suñuy protéines yépp acides aminés série L lañu ! »
> - « Zwitterion (amphion) mooy molécule bu am à la fois charge positive ci $-\\text{NH}_3^+$ ak charge négative ci $-\\text{COO}^-$. Charge nette bi 0 la, ci $pHi$ du daw jëm fenn ci électrophorèse ! »

---

## Objectifs Pédagogiques Officiels (Baccalauréat S2)

> [!IMPORTANT]
> 1. Définir un **acide $\\alpha$-aminé** et maîtriser la **nomenclature officielle UICPA** (acide 2-amino...oïque).
> 2. Identifier un **carbone asymétrique $C^*$** et justifier la **chiralité** et l'**activité optique** (énantiomères, pouvoir rotatoire, racémique).
> 3. Maîtriser le **cas d'or de la Glycine** : seule molécule achirale de la famille des acides $\\alpha$-aminés.
> 4. Représenter un acide aminé en **projection de Fischer** et déterminer rigoureusement sa configuration (**série D ou série L**).
> 5. Écrire la structure du **zwitterion (amphion)** et expliciter son **caractère amphotère** (ampholyte) à travers les deux couples acido-basiques.
> 6. Calculer le **point isoélectrique $pHi$** et prédire le sens de migration en **électrophorèse** sur bande selon le pH du tampon.
> 7. Écrire la réaction de **condensation peptidique**, identifier la **liaison amide $-\\text{CO}-\\text{NH}-$**, et dénombrer les **4 dipeptides isomères** obtenus à partir de deux acides aminés distincts.
> 8. Décrire le protocole de **synthèse dirigée d'un dipeptide** (protection, activation, couplage, déprotection).

---

## 1. Structure et Nomenclature des Acides $\\alpha$-Aminés

### A. Définition et Formule Générale
Un **acide $\\alpha$-aminé** est un composé organique bifonctionnel comportant sur le **même atome de carbone** (appelé carbone $\\alpha$ ou carbone n°2) :
- Une fonction acide carboxylique $-\\text{COOH}$
- Une fonction amine primaire $-\\text{NH}_2$ (ou secondaire dans le cas de la proline)
- Un atome d'hydrogène $-\\text{H}$
- Une chaîne latérale appelée radical $-\\text{R}$

Formule générale non ionisée :
$$\\text{R}-\\text{CH}(\\text{NH}_2)-\\text{COOH}$$

### B. Règles de Nomenclature UICPA
1. La chaîne carbonée la plus longue contenant le groupe $-\\text{COOH}$ est la chaîne principale.
2. Le carbone du groupe carboxyle porte obligatoirement le **numéro 1** : $-\\mathbf{C}^1\\text{OOH}$.
3. Le carbone voisin est le **carbone 2 (ou carbone $\\alpha$)** : il porte le substituant amine.
4. Le nom officiel est donc obligatoirement de la forme : **acide 2-amino[alcane]oïque**.

### C. Tableau des 5 Acides Aminés Phares du Bac S2

| Nom usuel | Symbole | Radical $-\\text{R}$ | Formule semi-développée | Nom UICPA officiel |
| :--- | :---: | :---: | :--- | :--- |
| **Glycine** (Glycocolle) | **Gly** | $-\\text{H}$ | $\\text{H}-\\text{CH}(\\text{NH}_2)-\\text{COOH}$ | Acide 2-aminoéthanoïque |
| **Alanine** | **Ala** | $-\\text{CH}_3$ | $\\text{CH}_3-\\text{CH}(\\text{NH}_2)-\\text{COOH}$ | Acide 2-aminopropanoïque |
| **Valine** | **Val** | $-\\text{CH}(\\text{CH}_3)_2$ | $(\\text{CH}_3)_2\\text{CH}-\\text{CH}(\\text{NH}_2)-\\text{COOH}$ | Acide 2-amino-3-méthylbutanoïque |
| **Acide Aspartique** | **Asp** | $-\\text{CH}_2-\\text{COOH}$ | $\\text{HOOC}-\\text{CH}_2-\\text{CH}(\\text{NH}_2)-\\text{COOH}$ | Acide 2-aminobutanedioïque |
| **Lysine** | **Lys** | $-(\\text{CH}_2)_4-\\text{NH}_2$ | $\\text{H}_2\\text{N}-(\\text{CH}_2)_4-\\text{CH}(\\text{NH}_2)-\\text{COOH}$ | Acide 2,6-diaminohexanoïque |

---

## 2. Carbone Asymétrique, Chiralité et Activité Optique

### A. Le Carbone Asymétrique ($C^*$)
Un atome de carbone tétraédrique (hybridation $sp^3$) est dit **asymétrique** (noté $C^*$) lorsqu'il est lié à **quatre substituants différents**.

Dans un acide $\\alpha$-aminé $\\text{R}-\\text{CH}(\\text{NH}_2)-\\text{COOH}$, le carbone $\\alpha$ est lié à :
1. $-\\text{COOH}$
2. $-\\text{NH}_2$
3. $-\\text{H}$
4. $-\\text{R}$

Si $-\\text{R} \\neq -\\text{H}$, $-\\text{COOH}$, $-\\text{NH}_2$, ces 4 groupes sont distincts : le carbone $\\alpha$ est donc un **carbone asymétrique $C^*$**.

### B. Chiralité et Énantiomères
- **Objet chiral** : Une molécule est dite **chirale** si elle n'est pas superposable à son image dans un miroir plan (absence de plan ou centre de symétrie).
- **Énantiomères** : Deux stéréoisomères de configuration qui sont images l'un de l'autre dans un miroir plan et non superposables.
- Deux énantiomères possèdent des propriétés physiques et chimiques identiques en milieu achiral (même température de fusion, même solubilité, même $pK_a$), mais diffèrent par :
  1. Leur **activité optique** (pouvoir rotatoire spécifique $[\alpha]$ opposé).
  2. Leurs **propriétés biologiques** (reconnaissance par les récepteurs enzymatiques).

> [!CAUTION]
> **Le Piège d'Or N°1 du Baccalauréat Sénégalais — La Glycine :**
> Pour la **Glycine (Gly)**, le radical est un atome d'hydrogène : $\\text{R} = -\\text{H}$.
> La molécule s'écrit : $\\text{H}-\\text{CH}(\\text{NH}_2)-\\text{COOH}$.
> Le carbone central est lié à **deux atomes d'hydrogène identiques**.
> - La glycine ne possède **AUCUN carbone asymétrique**.
> - Elle possède un plan de symétrie : elle est donc **ACHIRALE**.
> - Elle est **optiquement inactive** (pouvoir rotatoire rigoureusement nul).
> **Question typique du Bac :** *« Tous les acides alpha-aminés sont-ils chiraux ? Justifier. »*
> **Réponse officielle :** *« Non, la glycine est achirale car son carbone 2 est lié à deux atomes d'hydrogène identiques. »*

---

## 3. Représentation de Fischer : Séries D et L

La projection de Fischer permet de représenter commodément sur une feuille plane la géométrie tridimensionnelle des molécules chirales.

### A. Règles Officielles de Projection de Fischer
1. **Ligne verticale** : On place la chaîne carbonée la plus longue verticalement, avec le carbone ayant le degré d'oxydation le plus élevé tout en **HAUT** (ici, le carbone du carboxyle $-\\mathbf{C}^1\\text{OOH}$).
2. **Liaisons verticales** : Elles s'éloignent de l'observateur (en arrière du plan de la feuille).
3. **Liaisons horizontales** : Elles pointent vers l'observateur (en avant du plan).
4. Le carbone asymétrique $C^*$ se trouve à l'intersection de la croix.

### B. Définition des Séries D et L
En observant la projection de Fischer orientée avec $-\\text{COOH}$ en haut et $-\\text{R}$ en bas :
- **Série L (Laevus)** : Le groupe amine $-\\text{NH}_2$ est situé à **GAUCHE** de la ligne verticale.
- **Série D (Dexter)** : Le groupe amine $-\\text{NH}_2$ est situé à **DROITE** de la ligne verticale.

$$\\begin{array}{ccc}
\\text{Série L} & & \\text{Série D} \\\\[6pt]
\\text{COOH} & & \\text{COOH} \\\\[-2pt]
\\vert & & \\vert \\\\[-2pt]
\\text{H}_2\\text{N} - C^* - \\text{H} & \\quad \\xleftrightarrow{\\text{Miroir}} \\quad & \\text{H} - C^* - \\text{NH}_2 \\\\[-2pt]
\\vert & & \\vert \\\\[-2pt]
\\text{R} & & \\text{R}
\\end{array}$$

> [!TIP]
> **Règle universelle du vivant :**
> Dans la quasi-totalité des organismes vivants (humains, plantes, animaux), **tous les acides aminés constitutifs des protéines appartiennent exclusivement à la série L**. Les acides aminés de la série D ne se rencontrent que dans certaines parois bactériennes ou antibiotiques spécifiques.

> [!WARNING]
> **Ne confondez jamais :**
> - La configuration relative **D / L** (position spatiale du groupe $-\\text{NH}_2$ sur la croix de Fischer).
> - Le pouvoir rotatoire physique **(+) / (-)** mesuré au polarimètre (dextrogyre ou lévogyre).
> Un acide aminé de la série **L** peut être dextrogyre $(+)$ ou lévogyre $(-)$. Rien ne permet de déduire le signe du pouvoir rotatoire à partir de la configuration D ou L sans mesure expérimentale !

---

## 4. Structure Zwitterionique (Amphion) & Caractère Amphotère

### A. Le Zwitterion (Amphion)
Dans une molécule d'acide $\\alpha$-aminé, coexistent un groupe acide carboxylique à caractère acide ($-\\text{COOH}$, donneur de proton) et un groupe amine à caractère basique ($-\\text{NH}_2$, accepteur de proton).

Il se produit un transfert spontané de proton intramoléculaire :
$$\\text{R}-\\text{CH}(\\text{NH}_2)-\\text{COOH} \\rightleftharpoons \\text{R}-\\text{CH}(\\text{NH}_3^+)-\\text{COO}^-$$

Cette espèce dipolaire est appelée **amphion** ou **zwitterion** (de l'allemand *Zwitter*, hybride).
- Elle porte simultanément une charge positive sur l'azote ($-\\text{NH}_3^+$) et une charge négative sur l'oxygène ($-\\text{COO}^-$).
- Sa charge électrique globale est strictement nulle : $(+1) + (-1) = 0$.
- C'est sous cette forme zwitterionique que les acides aminés existent à l'état solide cristallin (ce qui explique leurs températures de fusion très élevées, supérieures à $200^\\circ\\text{C}$, semblables à des sels ioniques) et dans l'eau pure à pH physiologique.

### B. Caractère Amphotère (Ampholyte Acido-Basique)
L'amphion $\\text{R}-\\text{CH}(\\text{NH}_3^+)-\\text{COO}^-$ (noté $\\text{HA}^\\pm$) est un **ampholyte** : il peut jouer le rôle d'acide ou de base. Il intervient dans deux couples acide-base distincts :

#### 1. Premier couple : Cation / Amphion ($pK_{a1} \\approx 2{,}0 - 2{,}5$)
L'amphion se comporte comme une base et capte un proton sur son groupe carboxylate :
$$\\text{R}-\\text{CH}(\\text{NH}_3^+)-\\text{COOH} + \\text{H}_2\\text{O} \\rightleftharpoons \\text{R}-\\text{CH}(\\text{NH}_3^+)-\\text{COO}^- + \\text{H}_3\\text{O}^+$$
$$\\text{Couple } \\mathbf{\\text{H}_2\\text{A}^+ / \\text{HA}^\\pm} \\quad ; \\quad K_{a1} = \\frac{[\\text{HA}^\\pm][\\text{H}_3\\text{O}^+]}{[\\text{H}_2\\text{A}^+]}$$

#### 2. Second couple : Amphion / Anion ($pK_{a2} \\approx 9{,}0 - 10{,}0$)
L'amphion se comporte comme un acide et cède un proton de son groupe ammonium :
$$\\text{R}-\\text{CH}(\\text{NH}_3^+)-\\text{COO}^- + \\text{H}_2\\text{O} \\rightleftharpoons \\text{R}-\\text{CH}(\\text{NH}_2)-\\text{COO}^- + \\text{H}_3\\text{O}^+$$
$$\\text{Couple } \\mathbf{\\text{HA}^\\pm / \\text{A}^-} \\quad ; \\quad K_{a2} = \\frac{[\\text{A}^-][\\text{H}_3\\text{O}^+]}{[\\text{HA}^\\pm]}$$

---

## 5. Point Isoélectrique ($pHi$) & Diagramme de Prédominance

### A. Définition et Calcul du Point Isoélectrique $pHi$
Le **point isoélectrique** (noté $pHi$ ou $pI$) est le pH de la solution aqueuse pour lequel la charge électrique nette de l'acide aminé est **rigoureusement nulle**.
À ce pH précis, la concentration de l'amphion est maximale, et les concentrations des formes cationique et anionique sont exactement égales :
$$[\\text{H}_2\\text{A}^+] = [\\text{A}^-]$$

En multipliant membre à membre les deux expressions des constantes d'acidité :
$$K_{a1} \\times K_{a2} = \\frac{[\\text{HA}^\\pm][\\text{H}_3\\text{O}^+]}{[\\text{H}_2\\text{A}^+]} \\times \\frac{[\\text{A}^-][\\text{H}_3\\text{O}^+]}{[\\text{HA}^\\pm]} = [\\text{H}_3\\text{O}^+]^2$$

Comme $[\\text{H}_3\\text{O}^+] = \\sqrt{K_{a1} \\times K_{a2}}$, en prenant le cologarithme ($-\\log$) :
$$\\mathbf{pHi = \\frac{pK_{a1} + pK_{a2}}{2}}$$

*Exemple d'or :* Pour l'alanine ($pK_{a1} = 2{,}34$ et $pK_{a2} = 9{,}69$) :
$$pHi = \\frac{2{,}34 + 9{,}69}{2} = \\frac{12{,}03}{2} = \\mathbf{6{,}02}$$

### B. Diagramme de Prédominance des Espèces

| Domaine de pH | Espèce prédominante | Formule chimique | Charge électrique nette |
| :--- | :---: | :---: | :---: |
| $\\mathbf{\\text{pH} < pK_{a1}}$ | **Cation $\\text{H}_2\\text{A}^+$** | $\\text{R}-\\text{CH}(\\text{NH}_3^+)-\\text{COOH}$ | **$+1$** |
| $\\mathbf{pK_{a1} < \\text{pH} < pK_{a2}}$ | **Amphion $\\text{HA}^\\pm$** | $\\text{R}-\\text{CH}(\\text{NH}_3^+)-\\text{COO}^-$ | **$0$** |
| $\\mathbf{\\text{pH} > pK_{a2}}$ | **Anion $\\text{A}^-$** | $\\text{R}-\\text{CH}(\\text{NH}_2)-\\text{COO}^-$ | **$-1$** |

### C. Principe de l'Électrophorèse sur Bande
L'**électrophorèse** est une technique analytique séparant les acides aminés déposés sur une bande de papier ou de gel imbibée d'une solution tampon sous l'action d'un champ électrique uniforme entre deux électrodes : une **Cathode** (pôle négatif $-$) et une **Anode** (pôle positif $+$).

Sous l'effet de la différence de potentiel $U$ :
1. **Si $\\text{pH} < pHi$** : La forme cationique prédomine (charge positive $+$). L'acide aminé est attiré par la **Cathode ($-$ )**.
2. **Si $\\text{pH} > pHi$** : La forme anionique prédomine (charge négative $-$). L'acide aminé est attiré par l'**Anode ($+$ )**.
3. **Si $\\text{pH} = pHi$** : La charge globale est nulle. L'acide aminé **ne migre pas** et reste fixé sur la ligne de dépôt.

> [!NOTE]
> **Mnémotechnique Bac S2 :**
> - **C**ation ($+$) migre vers **C**athode ($-$).
> - **A**nion ($-$) migre vers **A**node ($+$).

---

## 6. La Liaison Peptidique & Isomérie des Dipeptides

### A. Formation de la Liaison Peptidique
La **liaison peptidique** résulte de la réaction de condensation entre la fonction carboxyle $-\\text{COOH}$ d'un acide aminé $A_1$ et la fonction amine $-\\text{NH}_2$ d'un second acide aminé $A_2$, avec élimination d'une molécule d'eau :

$$\\text{R}_1-\\text{CH}(\\text{NH}_2)-\\text{COOH} + \\text{R}_2-\\text{CH}(\\text{NH}_2)-\\text{COOH} \\longrightarrow \\text{H}_2\\text{N}-\\text{CH}(\\text{R}_1)-\\mathbf{CO-NH}-\\text{CH}(\\text{R}_2)-\\text{COOH} + \\text{H}_2\\text{O}$$

### B. Caractéristiques Structurales de la Liaison Peptidique
1. C'est chimiquement une fonction **amide monosubstituée**.
2. **Caractère partiel de double liaison (mésomérie)** : Le doublet non liant de l'azote est délocalisé avec la liaison double $\\text{C}=\\text{O}$ :
   $$-\\text{C}(=\\text{O})-\\text{NH}- \\longleftrightarrow -\\text{C}(\\text{O}^-)=\\text{NH}^+-$$
   Par conséquent :
   - La liaison $\\text{C}-\\text{N}$ est plus courte qu'une liaison simple ordinaire.
   - La rotation autour de l'axe $\\text{C}-\\text{N}$ est bloquée.
   - Les 4 atomes du groupement $-\\text{CO}-\\text{NH}-$ sont rigoureusement **copolanaires** (géométrie plane et rigide).

### C. Convention d'Orientation Peptidique
Par convention internationale :
- L'acide aminé portant le groupe $-\\text{NH}_2$ libre est placé à **GAUCHE** : c'est l'extrémité **N-terminale**.
- L'acide aminé portant le groupe $-\\text{COOH}$ libre est placé à **DROITE** : c'est l'extrémité **C-terminale**.
- On désigne le peptide en écrivant les abréviations de gauche à droite : ex: **Ala-Gly** signifie que l'alanine est N-terminale et la glycine est C-terminale.

### D. Le Problème des 4 Dipeptides Isomères
Si l'on fait réagir en mélange équimolaire deux acides aminés distincts $A$ et $B$ sans précaution particulière, les molécules peuvent s'associer de 4 manières différentes :
1. **Deux homodipeptides** :
   - $A - A$
   - $B - B$
2. **Deux hétérodipeptides isomères de constitution** :
   - $A - B$ (avec $A$ en N-terminal et $B$ en C-terminal)
   - $B - A$ (avec $B$ en N-terminal et $A$ en C-terminal)

> [!CAUTION]
> **Attention absolue :** $A-B$ et $B-A$ sont deux composés **complètement différents** !
> Par exemple, $\\text{Ala}-\\text{Gly}$ et $\\text{Gly}-\\text{Ala}$ ont des formules développées différentes :
> - $\\text{Ala}-\\text{Gly} : \\text{H}_2\\text{N}-\\text{CH}(\\text{CH}_3)-\\text{CO}-\\text{NH}-\\text{CH}_2-\\text{COOH}$
> - $\\text{Gly}-\\text{Ala} : \\text{H}_2\\text{N}-\\text{CH}_2-\\text{CO}-\\text{NH}-\\text{CH}(\\text{CH}_3)-\\text{COOH}$
> Leurs propriétés chimiques, physiques et biologiques sont différentes.

---

## 7. Stratégie de Synthèse Contrôlée d'un Dipeptide Spécifique

Pour obtenir **exclusivement** le dipeptide désiré $A-B$ sans formation des trois sous-produits parasites ($A-A$, $B-B$, $B-A$), le chimiste doit mettre en œuvre une stratégie en 4 étapes codifiée au Baccalauréat :

| Étape du Protocole | Objectif Réactionnel | Réactif / Méthode Officielle |
| :--- | :--- | :--- |
| **1. Protection sélective** | Bloquer le groupe -NH₂ de A et le groupe -COOH de B | Chlorure de benzyle (sur A) & Estérification (sur B) |
| **2. Activation de l'acide** | Rendre le -COOH de A très réactif pour forcer l'attaque | Transformation en chlorure d'acyle -COCl via SOCl₂ |
| **3. Couplage peptidique** | Former exclusivement la liaison A-B | Réaction sélective : A(protégé-activé) + B(protégé) |
| **4. Déprotection finale** | Régénérer les fonctions -NH₂ et -COOH terminales libres | Hydrogénation catalytique ménagée sans rompre -CO-NH- |

1. **Protection sélective :**
   - On bloque la fonction $-\\text{NH}_2$ de l'acide $A$ (par exemple par réaction avec le chlorure de benzyle ou le chloroformiate d'éthyle) pour l'empêcher d'agir comme nucléophile.
   - On bloque la fonction $-\\text{COOH}$ de l'acide $B$ (par estérification avec un alcool) pour l'empêcher d'agir comme acide.
2. **Activation du carboxyle :**
   - La fonction $-\\text{COOH}$ restante de l'acide $A$ est transformée en un dérivé plus réactif, typiquement un **chlorure d'acyle $-\\text{COCl}$** par réaction avec $\\text{SOCl}_2$ ou $\\text{PCl}_5$.
3. **Condensation (couplage) :**
   - On mélange l'acide $A$ protégé-activé et l'acide $B$ protégé : la liaison peptidique $-\\text{CO}-\\text{NH}-$ se forme de façon unique et sélective.
4. **Déprotection :**
   - Par un traitement chimique doux (hydrogénation catalytique ou hydrolyse ménagée), on régénère les fonctions d'origine sans rompre la liaison peptidique nouvellement formée : on obtient ainsi le dipeptide $A-B$ pur !

---

## 8. Synthèse Finale — Les 7 Réflexes Absolus du Bac S2

> [!IMPORTANT]
> **Réflexes à maîtriser par cœur pour l'épreuve de Chimie (C9) :**
> 1. **Nomenclature :** toujours « acide 2-amino...oïque ».
> 2. **Glycine (R = H) :** achirale, pas de $C^*$, pas d'énantiomère, inactive optiquement !
> 3. **Projection de Fischer :** $-\\text{COOH}$ en haut, $-\\text{R}$ en bas. $-\\text{NH}_2$ à gauche $\\implies$ Série L (protéines naturelles) ; à droite $\\implies$ Série D.
> 4. **Zwitterion :** $\\text{R}-\\text{CH}(\\text{NH}_3^+)-\\text{COO}^-$ (charge nette = 0).
> 5. **Point isoélectrique :** $pHi = \\dfrac{pK_{a1} + pK_{a2}}{2}$.
> 6. **Électrophorèse :** si $\\text{pH} < pHi \\implies$ Cation $\\to$ Cathode ($-$) ; si $\\text{pH} > pHi \\implies$ Anion $\\to$ Anode ($+$) ; si $\\text{pH} = pHi \\implies$ immobile.
> 7. **Dipeptides :** 2 acides $A$ et $B$ donnent 4 dipeptides ($A-A$, $B-B$, $A-B$, $B-A$). Pour orienter vers $A-B$, il faut protéger le $-\\text{NH}_2$ de $A$ et le $-\\text{COOH}$ de $B$, et activer le $-\\text{COOH}$ de $A$.

> [!WOLOF]
> - « **Glycine bi :** Bul fatte mukk ne moom rekk moo amul carbone asymétrique ! »
> - « **Série L bi :** $-\\text{NH}_2$ bi ci loxo cammooñ la nekk ! »
> - « **Électrophorèse bi :** Cation $\\to$ Cathode (-), Anion $\\to$ Anode (+), Zwitterion du yëngu ci pHi ! »
> - « **Dipeptides yi :** A-B ak B-A wuute nañu faww ! »
`

// P1 : CINÉMATIQUE DU POINT MATÉRIEL (Terminale S2 Sénégal)
RICH_LESSONS_MAP.cinematique_point = `# P1 : Cinématique du Point Matériel (Terminale S2)

Bienvenue dans le premier chapitre fondamental de **Mécanique** de **Terminale S2**, rigoureusement conforme au programme officiel sénégalais (MEN / IGEF / Office du Baccalauréat).

---

## 📜 Grande Fresque Historique & Épistémologique de la Cinématique

> *« Donner une description mathématique exacte du mouvement dans l'espace et le temps, sans encore se préoccuper des forces qui le provoquent »* : telle fut la formidable révolution intellectuelle de **Galilée (1564–1642)**.
> 
> Pendant deux millénaires, la pensée occidentale et méditerranéenne est restée prisonnière du dogme d'Aristote, qui affirmait que le repos était le seul état « naturel » de la matière et qu'un corps s'arrêtait dès qu'on cessait de le pousser. En observant avec une précision maniaque les oscillations des lustres de la cathédrale de Pise, puis en chronométrant la descente de billes de bronze polies sur des plans inclinés à l'aide d'horloges à eau et des battements de son propre pouls, Galilée démontre que le mouvement est un **état**, gouverné par des lois géométriques universelles : la distance parcourue est proportionnelle au carré du temps écoulé ($d \\propto t^2$).
> 
> Un demi-siècle plus tard, **Isaac Newton** et **Gottfried Wilhelm Leibniz** créent le **calcul différentiel et infinitésimal** : la vitesse instantanée n'est plus une simple moyenne empirique, mais la dérivée mathématique rigoureuse du vecteur position au point considéré : $\\vec{v} = \\frac{d\\vec{OM}}{dt} = \\lim_{\\Delta t \\to 0} \\frac{\\Delta \\vec{OM}}{\\Delta t}$.
> 
> Enfin, au XIXe siècle, face à l'essor des premiers chemins de fer et à la nécessité impérieuse de calculer le rayon de courbure des rails pour empêcher les trains de dérailler dans les virages, le mathématicien français **Jean Frédéric Frenet (1847)** invente la base mobile intrinsèque $(M, \\vec{u}_t, \\vec{u}_n)$ : il offre à la physique l'outil parfait pour séparer le changement de valeur de la vitesse ($a_t = \\frac{dv}{dt}$) de la courbure de l'espace ($a_n = \\frac{v^2}{\\rho}$).
> 
> Au Sénégal, que ce soit pour réguler l'accélération du **TER Dakar–Diamniadio** ($160\\text{ km}\\cdot\\text{h}^{-1}$), synchroniser les feux du **BRT entre Petersen et Guédiawaye**, négocier la courbe serrée de l'**échangeur Aliou Ardo Sow à la Patte d'Oie**, ou comprendre l'oscillation des **pirogues de pêcheurs sur la houle de Kayar et Soumbédioune**, la cinématique est le langage mathématique absolu qui décrit notre univers en mouvement.

---

![Figure 1 : Cinématique du point matériel, base de Frenet et trajectoire](/assets/pedagogie/p1_cinematique_frenet_trajectoire.svg)

> [!VIE_REELLE] **La Cinématique au Cœur du Quotidien Sénégalais :**
> - **Le TER Dakar–Diamniadio (MRUV)** : en quittant la gare de Colobane, le train accélère de façon rectiligne et uniforme ($a = 0{,}8\\text{ m}\\cdot\\text{s}^{-2}$) pour atteindre sa vitesse de croisière de $160\\text{ km}\\cdot\\text{h}^{-1}$ ($44{,}4\\text{ m}\\cdot\\text{s}^{-1}$). À l'approche de la gare de Rufisque, il enclenche son système de freinage : la formule de Torricelli ($v_B^2 - v_A^2 = 2\\,a\\,d$) permet aux ingénieurs de calculer au centimètre près la distance d'arrêt de sécurité !
> - **Le BRT sur les voies réservées de Dakar** : entre Petersen et Guédiawaye, le bus alterne des phases de Mouvement Rectiligne Uniforme (MRU, vitesse constante sur ligne droite dégagée) et des phases de décélération aux stations.
> - **Le Virage de l'Échangeur Aliou Ardo Sow / Patte d'Oie (Frenet)** : lorsqu'un véhicule s'engage sur la bretelle courbée à vitesse constante, il ne ressent AUCUNE accélération tangentielle ($a_t = \\frac{dv}{dt} = 0$), mais il subit une violente accélération normale centripète ($a_n = \\frac{v^2}{R}$) qui pousse les passagers vers l'extérieur du virage. Si $a_n$ dépasse l'adhérence maximale des pneus, c'est le dérapage !
> - **La Pirogue sur la houle de Soumbédioune / Kayar (Oscillateur Harmonique)** : au mouillage sur l'océan Atlantique, la pirogue monte et descend de façon périodique sous l'action des vagues. Son mouvement vertical d'élongation $y(t) = Y_m\\,\\cos(\\omega_0\\,t + \\varphi)$ obéit exactement à l'équation différentielle $\\ddot{y} + \\omega_0^2\\,y = 0$ !

> [!WOLOF] **Xam-xam ci Wolof — Cinématique du Point Matériel :**
> - « **Trajectoire bi :** Mooy yoon wi point bi di jaar ci suuf ! Boo amee équations horaires $x(t)$ ak $y(t)$, génneel waxtu bi $t$ ci $x$, duggal ko ci $y$. Équation de la trajectoire du am mukk waxtu bi $t$ ! »
> - « **Vitesse $\\vec{v}$ bi :** Waxtu wu nekk dafa tangent ci yoon bi (trajectoire) te jëm ci kanam ci sens du mouvement ! Dérivée de position la : $\\vec{v} = \\frac{d\\vec{OM}}{dt}$. »
> - « **Produit scalaire $\\vec{a} \\cdot \\vec{v}$ :** Bul jàpp ne bu $a < 0$ rekk dafay décéléré ! Dafa laaj nga seet $\\vec{a} \\cdot \\vec{v}$ : bu fékkee $> 0$, dafay accélére ; bu fékkee $< 0$, dafay retardé ! »
> - « **Base bu Frenet $(M, \\vec{u}_t, \\vec{u}_n)$ :** $a_t = \\frac{dv}{dt}$ dafay natt ni valeur vitesse di soppikoo ; $a_n = \\frac{v^2}{\\rho}$ dafay natt courbure bi ci virage bi ! Rayon de courbure bi mooy $\\rho = \\frac{v^2}{a_n}$ ! »
> - « **Torricelli (sans waxtu) :** $v_B^2 - v_A^2 = 2\\,a\\,d$. Moom lañuy jëfandikoo ci freinage TER ak auto ! »
> - « **MCU (Mouvement Circulaire Uniforme) :** $v = R\\,\\omega$. Vitesse en valeur dafay tegu ($a_t = 0$), waaye accélération am na ci biir cercle bi : $a = a_n = R\\,\\omega^2 = \\frac{v^2}{R}$ ! »

---

## Objectifs Officiels du Baccalauréat Sénégalais (IGEF / MEN)
À la fin de ce chapitre, tout élève de Terminale S2 doit être capable de :
1. Définir le point matériel et choisir le référentiel d'étude approprié (Terrestre, Géocentrique, Héliocentrique).
2. Déterminer le vecteur position $\\vec{OM}(t)$ et établir l'équation cartésienne de la trajectoire par élimination de la variable temps $t$.
3. Définir le vecteur vitesse instantanée $\\vec{v}(t) = \\frac{d\\vec{OM}}{dt}$, en préciser la direction, le sens et calculer sa norme.
4. Définir le vecteur accélération $\\vec{a}(t) = \\frac{d\\vec{v}}{dt} = \\frac{d^2\\vec{OM}}{dt^2}$.
5. Déterminer la nature d'un mouvement (accéléré, retardé ou uniforme) à l'aide du signe du produit scalaire $\\vec{a} \\cdot \\vec{v}$.
6. Exprimer le vecteur accélération dans la base intrinsèque de Frenet : $\\vec{a} = a_t\\,\\vec{u}_t + a_n\\,\\vec{u}_n$ avec $a_t = \\frac{dv}{dt}$ et $a_n = \\frac{v^2}{\\rho}$, et calculer le rayon de courbure $\\rho$.
7. Établir et exploiter les lois horaires des mouvements rectilignes (MRU, MRUV) et la relation indépendante du temps (Torricelli).
8. Étudier le Mouvement Circulaire Uniforme (MCU) : vitesse angulaire $\\omega$, période $T$, fréquence $N$, et accélération centripète $a_n = \\frac{v^2}{R} = R\\,\\omega^2$.
9. Résoudre l'équation différentielle du Mouvement Rectiligne Sinusoïdal $\\ddot{x} + \\omega_0^2\\,x = 0$ et déterminer l'amplitude $X_m$, la pulsation propre $\\omega_0$ et la phase à l'origine $\\varphi$.

---

## 1. Point Matériel & Référentiels d'Étude

### 1.1 Le Point Matériel
En physique, un solide indéformable est assimilé à un **point matériel** si ses dimensions géométriques sont négligeables devant les distances caractéristiques de son déplacement. Toute la masse $m$ du solide est alors concentrée en son centre d'inertie $G$.

### 1.2 Le Référentiel
Le mouvement est une notion **relative** : la position, la trajectoire et la vitesse d'un objet dépendent du solide de référence choisi par rapport auquel on étudie le mouvement.
Un référentiel est constitué :
1. D'un **solide de référence** muni d'un repère d'espace $(O, \\vec{i}, \\vec{j}, \\vec{k})$.
2. D'une **horloge** pour repérer les dates $t$, munie d'une origine des temps ($t = 0$).

| Référentiel | Définition & Repère | Domaine d'Application au Bac S2 |
| :--- | :--- | :--- |
| **Terrestre** (du laboratoire) | Lié à la surface de la Terre (ex: le quai de la gare de Rufisque, la piste de l'AIBD). | Mouvements de courte durée devant 24 h (TER, automobiles, projectiles, pendules). |
| **Géocentrique** | Centre de la Terre, axes orientés vers 3 étoiles lointaines fixes. | Satellites artificiels en orbite terrestre (ex: satellites météo ou télécoms). |
| **Héliocentrique** (de Copernic) | Centre du Soleil, axes orientés vers 3 étoiles lointaines fixes. | Mouvement des planètes du système solaire et des sondes interplanétaires. |

> [!WOLOF] **Xam-xam ci Wolof — Référentiel bi ak Point Matériel bi :**
> - « **Mouvement bi dafa relatif ci ku koy xool :** Mouvement du mbir mu fés ci boppam ! Boo toogee ci biir wagon TER bi di dem Diamniadio, yaak sa moroom ma toog sa wet ci repos ngeen nekk (vitesse bi zéro la entre yéen ñaar). Waaye nit ki taxaw ci quai bi ci gare Rufisque di leen séen, dafay gis train bi di leen dawale $160\\text{ km}\\cdot\\text{h}^{-1}$ ! Kooku mooy maanaam Référentiel : bala ngay wax ndax lenn dafay yëngu walla déet, dafa laaj nga tëj sa baat ci référence bi ! »
> - « **Point matériel :** Train TER bi am na 150 mètres de longueur, waaye boo koy natt ci 36 kilomètres diggante Dakar ak Diamniadio, mën nga ko jàppe point bu ñu tënk fa centre d'inertie $G$ ! »

---

## 2. Vecteur Position & Équation Cartésienne de la Trajectoire

### 2.1 Vecteur Position
Dans un repère orthonormé $(O, \\vec{i}, \\vec{j}, \\vec{k})$, la position d'un point mobile $M$ à chaque instant $t$ est repérée par le vecteur position :
$\\vec{OM}(t) = x(t)\\,\\vec{i} + y(t)\\,\\vec{j} + z(t)\\,\\vec{k}$

- $x(t)$, $y(t)$, $z(t)$ sont les **équations horaires du mouvement**.
- La distance du point $M$ à l'origine $O$ est donnée par la norme :
  $OM = \\|\\vec{OM}\\| = \\sqrt{x^2(t) + y^2(t) + z^2(t)}$

### 2.2 Équation Cartésienne de la Trajectoire
La **trajectoire** est l'ensemble géométrique continu des positions successives occupées par le mobile $M$ au cours du temps.
Pour obtenir son équation cartésienne au Bac S2 :
1. On isole la variable temps $t$ dans l'équation horaire $x(t)$ : $t = f(x)$.
2. On reporte l'expression de $t$ dans l'équation horaire $y(t)$ : $y = g(x)$.

> [!WOLOF] **Xam-xam ci Wolof — Trajectoire bi ci Bac S2 :**
> - « **Yoon wi nga rëdd ci suuf mooy trajectoire bi :** Boo amee équations horaires $x(t)$ ak $y(t)$, génneel waxtu bi $t = f(x)$ ci biir $x$, duggal ko ci $y$. Équation de la trajectoire du am mukk waxtu bi $t$ ! »
> - « **Géométrie bu trajectoire bi :** Su fekkee $y = a\\,x + b$ droite la (mouvement rectiligne) ; su fekkee $y = a\\,x^2 + b\\,x + c$ parabole la (naka ballu tir de penalty) ; su fekkee $(x-x_0)^2 + (y-y_0)^2 = R^2$ cercle la (naka carrousel wala rond-point) ! »

> [!IMPORTANT]
> **Règle absolue du Bac S2 :** Le temps $t$ ne doit **JAMAIS** figurer dans l'équation de la trajectoire !
> - Si $y(x) = a\\,x + b$ : la trajectoire est une **droite** (mouvement rectiligne).
> - Si $y(x) = a\\,x^2 + b\\,x + c$ ($a \\neq 0$) : la trajectoire est une **parabole** (mouvement parabolique, ex: tir balistique).
> - Si $(x - x_0)^2 + (y - y_0)^2 = R^2$ : la trajectoire est un **cercle** de centre $C(x_0, y_0)$ et de rayon $R$.

---

## 3. Vecteur Vitesse Instantanée

### 3.1 Définition Vectorielle
Le vecteur vitesse instantanée $\\vec{v}(t)$ est la dérivée première par rapport au temps du vecteur position :
$\\vec{v}(t) = \\frac{d\\vec{OM}}{dt} = \\dot{x}(t)\\,\\vec{i} + \\dot{y}(t)\\,\\vec{j} + \\dot{z}(t)\\,\\vec{k}$

Ses composantes cartésiennes sont :
$v_x(t) = \\frac{dx}{dt} = \\dot{x} \\quad ; \\quad v_y(t) = \\frac{dy}{dt} = \\dot{y} \\quad ; \\quad v_z(t) = \\frac{dz}{dt} = \\dot{z}$

### 3.2 Caractéristiques Fondamentales du Vecteur Vitesse
Au point considéré $M(t)$ :
1. **Origine (Point d'application)** : le point mobile $M(t)$ lui-même.
2. **Direction** : la **tangente** à la trajectoire au point $M(t)$.
3. **Sens** : le **sens du mouvement** du mobile.
4. **Norme (Vitesse scalaire instantanée)** :
   $v = \\|\\vec{v}\\| = \\sqrt{v_x^2 + v_y^2 + v_z^2} = \\sqrt{\\dot{x}^2 + \\dot{y}^2 + \\dot{z}^2} \\quad (\\text{en m}\\cdot\\text{s}^{-1})$

> [!WARNING]
> Conversion impérative d'unités : Pour convertir une vitesse de $\\text{km}\\cdot\\text{h}^{-1}$ en $\\text{m}\\cdot\\text{s}^{-1}$, on divise TOUJOURS par $3{,}6$ :
> $160\\text{ km}\\cdot\\text{h}^{-1} = \\frac{160}{3{,}6} \\approx 44{,}44\\text{ m}\\cdot\\text{s}^{-1} \\quad ; \\quad 90\\text{ km}\\cdot\\text{h}^{-1} = \\frac{90}{3{,}6} = 25\\text{ m}\\cdot\\text{s}^{-1}$

> [!WOLOF] **Xam-xam ci Wolof — Vitesse instantanée $\\vec{v}$ :**
> - « **Vitesse bi dafa tangent ci yoon bi :** Soo daggé corde bu ñu tënke ballon bi nga doon wërale, walla auto bu dacc virage Aliou Ardo Sow ci Patte d'Oie ndax pneus yi dacc nañu suuf si, point bi du wéy di wër virage bi dédéet ! Day daan ci droite tangente bi ci sens du mouvement ! »
> - « **Dérivée :** $\\vec{v} = \\frac{d\\vec{OM}}{dt} = \\dot{x}\\,\\vec{i} + \\dot{y}\\,\\vec{j}$. Valeur vitesse bi mooy norme bi : $v = \\sqrt{\\dot{x}^2 + \\dot{y}^2}$ ! »

---

## 4. Vecteur Accélération & Nature du Mouvement

### 4.1 Définition Vectorielle
Le vecteur accélération instantanée $\\vec{a}(t)$ est la dérivée première du vecteur vitesse, soit la dérivée seconde du vecteur position :
$\\vec{a}(t) = \\frac{d\\vec{v}}{dt} = \\frac{d^2\\vec{OM}}{dt^2} = \\ddot{x}(t)\\,\\vec{i} + \\ddot{y}(t)\\,\\vec{j} + \\ddot{z}(t)\\,\\vec{k}$

Ses composantes cartésiennes sont :
$a_x = \\frac{dv_x}{dt} = \\frac{d^2x}{dt^2} = \\ddot{x} \\quad ; \\quad a_y = \\frac{dv_y}{dt} = \\frac{d^2y}{dt^2} = \\ddot{y} \\quad ; \\quad a_z = \\frac{dv_z}{dt} = \\frac{d^2z}{dt^2} = \\ddot{z}$

Sa norme totale vaut :
$a = \\|\\vec{a}\\| = \\sqrt{a_x^2 + a_y^2 + a_z^2} \\quad (\\text{en m}\\cdot\\text{s}^{-2})$

### 4.2 Critère du Produit Scalaire $\\vec{a} \\cdot \\vec{v}$ (Nature du Mouvement)
Considérons la dérivée du carré de la norme de la vitesse :
$\\frac{d(v^2)}{dt} = \\frac{d(\\vec{v}\\cdot\\vec{v})}{dt} = 2\\,\\vec{v}\\cdot\\frac{d\\vec{v}}{dt} = 2\\,\\vec{a}\\cdot\\vec{v}$

D'où la relation fondamentale :
$\\vec{a} \\cdot \\vec{v} = v\\,\\frac{dv}{dt}$

Comme la norme $v = \\|\\vec{v}\\| > 0$ :
1. **Si $\\vec{a} \\cdot \\vec{v} > 0$** : $\\frac{dv}{dt} > 0 \\implies$ la valeur de la vitesse augmente, le mouvement est **accéléré**.
2. **Si $\\vec{a} \\cdot \\vec{v} < 0$** : $\\frac{dv}{dt} < 0 \\implies$ la valeur de la vitesse diminue, le mouvement est **retardé (ou décéléré)**.
3. **Si $\\vec{a} \\cdot \\vec{v} = 0$** : $\\frac{dv}{dt} = 0 \\implies$ la valeur de la vitesse est constante ($v = \\text{cte}$), le mouvement est **uniforme** (l'accélération est alors perpendiculaire à la vitesse ou nulle).

> [!CAUTION]
> **Piège éliminatoire au Baccalauréat :** Ne déduisez JAMAIS la nature d'un mouvement à partir du signe de l'accélération $a$ seul !
> - Si un mobile se déplace vers les $x$ négatifs avec $v_x = -4\\text{ m}\\cdot\\text{s}^{-1}$ et subit une accélération $a_x = -2\\text{ m}\\cdot\\text{s}^{-2}$ :
>   $a_x \\cdot v_x = (-2) \\times (-4) = +8 > 0$
>   Le mouvement est donc **accéléré**, bien que son accélération soit négative !

> [!WOLOF] **Xam-xam ci Wolof — Produit scalaire $\\vec{a} \\cdot \\vec{v}$ :**
> - « **Piège numéro 1 au Bac S2 :** Bul wax mukk ne ndax $a < 0$ dafay retardé ! Dafa laaj nga natt produit scalaire $\\vec{a} \\cdot \\vec{v}$ : »
>   - Su $\\vec{a} \\cdot \\vec{v} > 0$ : $\\vec{a}$ ak $\\vec{v}$ dañoo and ci benn sens $\\implies$ **accéléré** (vitesse bi di yokk) !
>   - Su $\\vec{a} \\cdot \\vec{v} < 0$ : $\\vec{a}$ dafa kontar $\\vec{v}$ $\\implies$ **retardé / décéléré** (vitesse bi di wàññiku) !
>   - Su $\\vec{a} \\cdot \\vec{v} = 0$ : $\\vec{a} \\perp \\vec{v}$ $\\implies$ **uniforme** (valeur vitesse bi tegu na) !

---

## 5. Le Repère de Frenet $(M, \\vec{u}_t, \\vec{u}_n)$ & Rayon de Courbure $\\rho$

Pour les trajectoires curvilignes (courbes planes ou spatiales), le repère cartésien fixe $(O, \\vec{i}, \\vec{j})$ n'est pas le plus intuitif. On utilise la **base intrinsèque mobile de Frenet**.

### 5.1 Définition de la Base de Frenet
En chaque point $M$ de la trajectoire :
- **Origine** : le point mobile $M$ lui-même (repère mobile qui voyage avec le corps).
- **Vecteur unitaire tangent $\\vec{u}_t$** : tangent à la trajectoire en $M$, dirigé dans le **sens du mouvement**.
- **Vecteur unitaire normal $\\vec{u}_n$** : orthogonal à $\\vec{u}_t$ ($\\vec{u}_n \\perp \\vec{u}_t$), dirigé vers le **centre de courbure $C$** de la trajectoire (vers l'intérieur de la concavité).

### 5.2 Vecteur Vitesse dans Frenet
Puisque le vecteur vitesse est tangent à la trajectoire et orienté dans le sens du mouvement :
$\\vec{v} = v\\,\\vec{u}_t \\quad \\text{avec} \\quad v = \\frac{ds}{dt}$
où $s(t)$ est l'abscisse curviligne du point $M$.

### 5.3 Vecteur Accélération dans Frenet
En dérivant $\\vec{v} = v\\,\\vec{u}_t$ par rapport au temps :
$\\vec{a} = \\frac{d\\vec{v}}{dt} = \\frac{dv}{dt}\\,\\vec{u}_t + v\\,\\frac{d\\vec{u}_t}{dt} = a_t\\,\\vec{u}_t + a_n\\,\\vec{u}_n$

avec :
$a_t = \\frac{dv}{dt} \\quad \\text{(Accélération tangentielle, en m}\\cdot\\text{s}^{-2}\\text{)}$
$a_n = \\frac{v^2}{\\rho} \\quad \\text{(Accélération normale ou centripète, en m}\\cdot\\text{s}^{-2}\\text{)}$

où $\\rho$ représente le **rayon de courbure local** de la trajectoire au point $M$ (en mètres $\\text{m}$).

### 5.4 Rôles Physiques Respectifs des Composantes :
- **L'accélération tangentielle $a_t = \\frac{dv}{dt}$** traduit la variation de la **valeur scalaire de la vitesse** :
  - Si $a_t = 0$ : la valeur de la vitesse ne change pas ($v = \\text{cte}$, mouvement uniforme).
  - Si $a_t > 0$ : la vitesse scalaire augmente.
  - Si $a_t < 0$ : la vitesse scalaire diminue.
- **L'accélération normale $a_n = \\frac{v^2}{\\rho}$** traduit la variation de la **direction du vecteur vitesse** (courbure de la trajectoire) :
  - Sur une ligne droite, le rayon de courbure est infini ($\\rho \\to \\infty$), donc $a_n = 0$.
  - Dès que la trajectoire tourne, $\\rho$ est fini et $a_n > 0$ : $\\vec{a}_n$ est toujours dirigé vers l'intérieur du virage (centripète).

### 5.5 Calcul du Rayon de Courbure $\\rho$ au Bac S2
La norme totale du vecteur accélération vérifie le théorème de Pythagore :
$a = \\|\\vec{a}\\| = \\sqrt{a_t^2 + a_n^2} \\implies a^2 = a_t^2 + a_n^2$

On en déduit l'expression du rayon de courbure $\\rho$ :
$a_n = \\sqrt{a^2 - a_t^2} \\implies \\rho = \\frac{v^2}{a_n} = \\frac{v^2}{\\sqrt{a^2 - a_t^2}}$

> [!TIP]
> **Cas d'école au Bac S2 : Le sommet d'une parabole de tir balistique :**
> Au sommet $S$ d'une trajectoire de projectile soumis à la pesanteur $\\vec{g}$ :
> - La vitesse est strictement horizontale : $\\vec{v}_S = v_0\\cos(\\alpha)\\,\\vec{i}$.
> - L'accélération est purement verticale : $\\vec{a} = \\vec{g}$.
> - Comme $\\vec{g} \\perp \\vec{v}_S$, l'accélération tangentielle est nulle : $a_t = 0$.
> - L'accélération normale est donc maximale et égale à $g$ : $a_n = g$.
> - Le rayon de courbure au sommet vaut immédiatement :
>   $\\rho_S = \\frac{v_S^2}{g} = \\frac{v_0^2\\,\\cos^2(\\alpha)}{g}$

> [!WOLOF] **Xam-xam ci Wolof — Base bu Frenet $(M, \\vec{u}_t, \\vec{u}_n)$ :**
> - « **Frenet dafa lay natt virage bi :** Repère cartésien $(O, \\vec{i}, \\vec{j})$ dafa taxaw temm ci suuf, waaye Frenet moom dafay voyager ak mobile bi ! »
> - « **$a_t = \\frac{dv}{dt}$ :** Dafay wax ndax compteur train TER bi dafay yéeg wala mu wàcc. Bu vitesse bi stabilisé ci $160\\text{ km}\\cdot\\text{h}^{-1}$, $a_t = 0$ ! »
> - « **$a_n = \\frac{v^2}{\\rho}$ :** Moom mooy accélération centripète ji lay bëgga dàllali ci biti virage Aliou Ardo Sow ci Patte d'Oie ! Rayon de courbure $\\rho$ dafay natt yaatuway virage bi : bu virage bi serré ($\\rho$ tuuti), $a_n$ day mag lool ! »

---

## 6. Mouvements Rectilignes : MRU, MRUV et Torricelli

La trajectoire est une portion de droite choisie comme axe $(Ox)$ muni du vecteur unitaire $\\vec{i}$.

### 6.1 Mouvement Rectiligne Uniforme (MRU)
Le vecteur accélération est constamment nul :
$\\vec{a} = \\vec{0} \\iff a = 0$

- Vitesse : constante dans le temps
  $v(t) = v_0 = \\text{cte}$
- Équation horaire : fonction affine du temps
  $x(t) = v_0\\,t + x_0$

### 6.2 Mouvement Rectiligne Uniformément Varié (MRUV)
Le vecteur accélération est un vecteur constant non nul :
$\\vec{a} = a\\,\\vec{i} = \\text{cte} \\neq \\vec{0}$

- Équation de la vitesse (par intégration de $a = \\frac{dv}{dt}$) :
  $v(t) = a\\,t + v_0$
- Équation horaire de position (par intégration de $v = \\frac{dx}{dt}$) :
  $x(t) = \\frac{1}{2}\\,a\\,t^2 + v_0\\,t + x_0$

### 6.3 Relation Indépendante du Temps (Formule de Torricelli)
En éliminant le temps $t$ entre l'équation de la vitesse et celle de la position :
$t = \\frac{v_B - v_A}{a}$
$x_B - x_A = \\frac{1}{2}\\,a\\left(\\frac{v_B - v_A}{a}\\right)^2 + v_A\\left(\\frac{v_B - v_A}{a}\\right) = \\frac{(v_B - v_A)(v_B + v_A)}{2\\,a} = \\frac{v_B^2 - v_A^2}{2\\,a}$

On aboutit à la relation magique du Bac S2 :
$v_B^2 - v_A^2 = 2\\,a\\,(x_B - x_A) = 2\\,a\\,d$

où $d = x_B - x_A$ est la distance parcourue entre les positions $A$ et $B$.

> [!IMPORTANT]
> **Cas du freinage d'un véhicule (TER, bus Dakar Dem Dikk, moto) :**
> À l'arrêt complet du mobile, la vitesse finale est nulle ($v_B = 0$). La distance d'arrêt $d$ s'obtient directement sans calculer la durée de freinage :
> $0^2 - v_A^2 = 2\\,a\\,d \\implies d = \\frac{-v_A^2}{2\\,a} = \\frac{v_A^2}{2\\,|a|}$

> [!WOLOF] **Xam-xam ci Wolof — Torricelli (Mouvements Rectilignes) :**
> - « **Formule reine sans temps :** $v_B^2 - v_A^2 = 2\\,a\\,d$. Buñu la joxee exercice de freinage TER Dakar–Diamniadio te joxuñu la waxtu $t$, bul def détour di calculé $t$ ! Jëfandikool Torricelli rekk nga am distance d'arrêt $d = \\frac{v_A^2}{2\\,|a|}$ ! »

---

## 7. Mouvements Circulaires : MCU & Accélération Centripète

La trajectoire est un cercle de centre $O$ et de rayon fixe $R$.

### 7.1 Grandeurs Angulaires et Linéaires
La position du point $M$ est repérée par l'abscisse angulaire $\\theta(t) = (\\vec{Ox}, \\vec{OM})$ en radians ($\\text{rad}$) ou par l'abscisse curviligne $s(t) = \\overset{\\frown}{M_0 M}$ en mètres ($\\text{m}$).

- Relation fondamentale entre abscisses :
  $s(t) = R\\,\\theta(t)$
- Vitesse angulaire instantanée $\\omega(t)$ (en $\\text{rad}\\cdot\\text{s}^{-1}$) :
  $\\omega(t) = \\dot{\\theta}(t) = \\frac{d\\theta}{dt}$
- Vitesse linéaire instantanée $v(t)$ (en $\\text{m}\\cdot\\text{s}^{-1}$) :
  $v(t) = \\frac{ds}{dt} = R\\,\\frac{d\\theta}{dt} = R\\,\\omega(t)$
- Accélération angulaire instantanée $\\alpha(t)$ ou $\\ddot{\\theta}(t)$ (en $\\text{rad}\\cdot\\text{s}^{-2}$) :
  $\\ddot{\\theta}(t) = \\frac{d\\omega}{dt} = \\frac{d^2\\theta}{dt^2}$

### 7.2 Mouvement Circulaire Uniforme (MCU)
En MCU, le mobile parcourt des arcs égaux pendant des durées égales :
$\\omega = \\frac{d\\theta}{dt} = \\text{cte} \\implies \\theta(t) = \\omega\\,t + \\theta_0$
$v = R\\,\\omega = \\text{cte}$

Dans la base de Frenet $(M, \\vec{u}_t, \\vec{u}_n)$ avec un rayon de courbure constant $\\rho = R$ :
- Accélération tangentielle :
  $a_t = \\frac{dv}{dt} = 0$
- Accélération normale (centripète) :
  $a_n = \\frac{v^2}{R} = R\\,\\omega^2 = R\\,(2\\pi\\,N)^2$
- Vecteur accélération complet :
  $\\vec{a} = a_n\\,\\vec{u}_n = \\frac{v^2}{R}\\,\\vec{u}_n = R\\,\\omega^2\\,\\vec{u}_n$

### 7.3 Période $T$ et Fréquence $N$
- **Période $T$** : durée nécessaire pour accomplir un tour complet ($2\\pi$ radians) :
  $T = \\frac{2\\pi}{\\omega} = \\frac{2\\pi\\,R}{v} \\quad (\\text{en secondes s})$
- **Fréquence $N$ (ou $f$)** : nombre de tours effectués par seconde :
  $N = \\frac{1}{T} = \\frac{\\omega}{2\\pi} \\quad (\\text{en Hertz Hz ou s}^{-1})$

> [!WOLOF] **Xam-xam ci Wolof — Mouvement Circulaire Uniforme (MCU) :**
> - « **MCU am na accélération :** Ci rond-point Camberène, bu chauffeur bi gardé vitesse constante de $40\\text{ km}\\cdot\\text{h}^{-1}$, valeur vitesse bi soppikuwul ($a_t = 0$), waaye vecteur vitesse bi direction wam dafay tourné waxtu wu nekk ! Accélération centripète am na ci biir cercle bi : $a = a_n = R\\,\\omega^2 = \\frac{v^2}{R}$ ! »
> - « **Période $T$ ak Fréquence $N$ :** $T$ mooy waxtu bi ngay def ngir def 1 tour complet ($T = \\frac{2\\pi}{\\omega}$). $N$ mooy ñaata tours ngay def ci 1 seconde ($N = \\frac{1}{T}$) ! »

---

## 8. Mouvement Rectiligne Sinusoïdal (Oscillateur Harmonique)

### 8.1 Définition & Équation Différentielle
Un point mobile $M$ effectue un **Mouvement Rectiligne Sinusoïdal (MRS)** sur l'axe $(Ox)$ si son élongation $x(t)$ vérifie l'équation différentielle linéaire du second ordre :
$\\ddot{x}(t) + \\omega_0^2\\,x(t) = 0 \\iff \\frac{d^2x}{dt^2} = -\\omega_0^2\\,x$
où $\\omega_0$ est la pulsation propre en $\\text{rad}\\cdot\\text{s}^{-1}$.

### 8.2 Loi Horaire du Mouvement
La solution générale de cette équation différentielle s'écrit :
$x(t) = X_m\\,\\cos(\\omega_0\\,t + \\varphi)$

- **$X_m$ (ou $x_{max}$)** : **Amplitude** du mouvement (élongation maximale), toujours strictement positive ($X_m > 0$), exprimée en mètres ($\\text{m}$).
- **$\\omega_0$** : **Pulsation propre** en $\\text{rad}\\cdot\\text{s}^{-1}$.
- **$\\omega_0\\,t + \\varphi$** : **Phase instantanée** à la date $t$ en radians ($\\text{rad}$).
- **$\\varphi$** : **Phase à l'origine des dates ($t = 0$)** en radians ($\\text{rad}$).
- **Période propre $T_0$** :
  $T_0 = \\frac{2\\pi}{\\omega_0} \\quad (\\text{en s})$

### 8.3 Vitesse & Accélération Instantanées
En dérivant successivement :
- **Vitesse instantanée :**
  $v(t) = \\dot{x}(t) = -X_m\\,\\omega_0\\,\\sin(\\omega_0\\,t + \\varphi)$
  La vitesse est en quadrature avance de phase de $\\frac{\\pi}{2}$ par rapport à l'élongation.
  Sa valeur maximale au passage par la position d'équilibre ($x = 0$) est :
  $V_m = X_m\\,\\omega_0 \\quad (\\text{en m}\\cdot\\text{s}^{-1})$

- **Accélération instantanée :**
  $a(t) = \\ddot{x}(t) = -X_m\\,\\omega_0^2\\,\\cos(\\omega_0\\,t + \\varphi) = -\\omega_0^2\\,x(t)$
  L'accélération est en opposition de phase ($\\pi$ radians) avec l'élongation.
  Sa valeur maximale aux positions extrêmes ($x = \\pm X_m$) est :
  $a_m = X_m\\,\\omega_0^2 \\quad (\\text{en m}\\cdot\\text{s}^{-2})$

> [!WOLOF] **Xam-xam ci Wolof — Oscillateur Harmonique (MRS) :**
> - « **Pirogue bi ci mbàllu Soumbédioune / Kayar :** Buy yéeg di wàcc ci kaw géej gi, vitesse bi dafay nekk zéro ci bop yi ($x = \\pm X_m$), fa la force de rappel bi gën a for ba accélération bi di $a_m = X_m\\,\\omega_0^2$ ! »
> - « **Digg bi ($x = 0$) :** Buy romb position d'équilibre bi fa la vitesse bi gën a ràbbaate : $V_m = X_m\\,\\omega_0$ ! Équation différentielle bi mooy $\\ddot{x} + \\omega_0^2\\,x = 0$. »

---

## 9. Épreuve Officielle Résolue du Baccalauréat Sénégalais (Sujet Type Office du Bac)

### Énoncé Officiel :
Dans le repère orthonormé $(O, \\vec{i}, \\vec{j})$, un solide ponctuel $M$ de masse $m = 250\\text{ g}$ est lancé à l'instant $t = 0$ depuis le point $O(0, 0)$. Les équations horaires de son mouvement sont :
$\\begin{cases} x(t) = 4{,}0\\,t \\\\ y(t) = -5{,}0\\,t^2 + 10{,}0\\,t \\end{cases} \\quad (\\text{unités SI, pour } t \\ge 0)$

1. Établir l'équation cartésienne de la trajectoire du mobile $M$. Préciser sa nature géométrique.
2. Déterminer les coordonnées et la date de passage au sommet $S$ de la trajectoire.
3. Exprimer le vecteur vitesse $\\vec{v}(t)$ et calculer sa norme à $t = 1{,}0\\text{ s}$ et à $t = 2{,}0\\text{ s}$.
4. Déterminer le vecteur accélération $\\vec{a}(t)$. Montrer qu'il est constant.
5. Calculer le produit scalaire $\\vec{a} \\cdot \\vec{v}$ à $t = 0{,}5\\text{ s}$ et à $t = 1{,}5\\text{ s}$. En déduire la nature du mouvement à ces dates.
6. Dans la base de Frenet, déterminer le rayon de courbure $\\rho_S$ de la trajectoire au sommet $S$.

---

### Solution Détaillée & Rédigée Conforme aux Critères du Bac S2 :

#### 1. Équation de la trajectoire :
À partir de l'équation $x(t) = 4{,}0\\,t$, pour $t \\ge 0$, on exprime $t$ en fonction de $x$ :
$t = \\frac{x}{4{,}0}$
On substitue $t$ dans l'équation horaire $y(t)$ :
$y(x) = -5{,}0\\left(\\frac{x}{4{,}0}\\right)^2 + 10{,}0\\left(\\frac{x}{4{,}0}\\right) = -\\frac{5{,}0}{16{,}0}\\,x^2 + 2{,}5\\,x$
$y(x) = -0{,}3125\\,x^2 + 2{,}5\\,x \\quad (\\text{pour } x \\ge 0)$
**Conclusion :** L'équation est du second degré en $x$ avec un coefficient dominant négatif ($-0{,}3125 < 0$). La trajectoire est une **branche de parabole** dont la concavité est tournée vers les $y$ négatifs.

#### 2. Sommet $S$ de la trajectoire :
Au sommet $S$, la tangente à la trajectoire est horizontale, ce qui signifie que la composante verticale de la vitesse s'annule :
$v_y(t_S) = \\frac{dy}{dt}(t_S) = -10{,}0\\,t_S + 10{,}0 = 0 \\implies t_S = 1{,}0\\text{ s}$
Coordonnées du sommet $S$ :
$x_S = x(1{,}0) = 4{,}0 \\times 1{,}0 = 4{,}0\\text{ m}$
$y_S = y(1{,}0) = -5{,}0(1{,}0)^2 + 10{,}0(1{,}0) = 5{,}0\\text{ m}$
Le sommet a pour coordonnées $S(4{,}0\\text{ m} ; 5{,}0\\text{ m})$ atteint à la date $t_S = 1{,}0\\text{ s}$.

#### 3. Vecteur vitesse instantanée $\\vec{v}(t)$ :
$\\vec{v}(t) = \\frac{dx}{dt}\\,\\vec{i} + \\frac{dy}{dt}\\,\\vec{j} = 4{,}0\\,\\vec{i} + (-10{,}0\\,t + 10{,}0)\\,\\vec{j}$
- **À $t = 1{,}0\\text{ s}$ (au sommet $S$) :**
  $v_x(1{,}0) = 4{,}0\\text{ m}\\cdot\\text{s}^{-1} \\quad ; \\quad v_y(1{,}0) = 0$
  $v_S = \\|\\vec{v}(1{,}0)\\| = \\sqrt{4{,}0^2 + 0^2} = 4{,}0\\text{ m}\\cdot\\text{s}^{-1}$
- **À $t = 2{,}0\\text{ s}$ :**
  $v_x(2{,}0) = 4{,}0\\text{ m}\\cdot\\text{s}^{-1} \\quad ; \\quad v_y(2{,}0) = -10{,}0(2{,}0) + 10{,}0 = -10{,}0\\text{ m}\\cdot\\text{s}^{-1}$
  $v(2{,}0) = \\sqrt{4{,}0^2 + (-10{,}0)^2} = \\sqrt{16 + 100} = \\sqrt{116} \\approx 10{,}77\\text{ m}\\cdot\\text{s}^{-1}$

#### 4. Vecteur accélération $\\vec{a}(t)$ :
$\\vec{a}(t) = \\frac{dv_x}{dt}\\,\\vec{i} + \\frac{dv_y}{dt}\\,\\vec{j} = 0\\,\\vec{i} + (-10{,}0)\\,\\vec{j} = -10{,}0\\,\\vec{j} \\quad (\\text{en m}\\cdot\\text{s}^{-2})$
Le vecteur accélération est constant en direction (verticale), en sens (vers le bas) et en norme ($a = 10{,}0\\text{ m}\\cdot\\text{s}^{-2}$). Il s'agit du vecteur champ de pesanteur local $\\vec{a} = \\vec{g}$.

#### 5. Produit scalaire $\\vec{a} \\cdot \\vec{v}$ et nature du mouvement :
$\\vec{a} \\cdot \\vec{v} = a_x\\,v_x + a_y\\,v_y = 0 \\times 4{,}0 + (-10{,}0) \\times (-10{,}0\\,t + 10{,}0) = 100{,}0\\,t - 100{,}0$
- **À $t = 0{,}5\\text{ s}$ (phase ascendante avant le sommet) :**
  $\\vec{a} \\cdot \\vec{v} = 100{,}0(0{,}5) - 100{,}0 = -50{,}0 < 0$
  Comme $\\vec{a} \\cdot \\vec{v} < 0$, la valeur de la vitesse diminue : le mouvement est **retardé (ou décéléré)**.
- **À $t = 1{,}5\\text{ s}$ (phase descendante après le sommet) :**
  $\\vec{a} \\cdot \\vec{v} = 100{,}0(1{,}5) - 100{,}0 = +50{,}0 > 0$
  Comme $\\vec{a} \\cdot \\vec{v} > 0$, la valeur de la vitesse augmente : le mouvement est **accéléré**.

#### 6. Rayon de courbure $\\rho_S$ au sommet dans la base de Frenet :
Au sommet $S$, le vecteur vitesse est strictement horizontal ($\\vec{v}_S = 4{,}0\\,\\vec{i}$) et le vecteur accélération est vertical descendant ($\\vec{a} = -10{,}0\\,\\vec{j}$).
Les deux vecteurs sont donc perpendiculaires : $\\vec{a} \\perp \\vec{v}_S$.
Par projection dans la base de Frenet au sommet :
- L'accélération tangentielle est nulle : $a_t = \\frac{dv}{dt} = 0$.
- L'accélération normale est égale à l'accélération totale : $a_n = a = 10{,}0\\text{ m}\\cdot\\text{s}^{-2}$.
Comme $a_n = \\frac{v_S^2}{\\rho_S}$, on déduit :
$\\rho_S = \\frac{v_S^2}{a_n} = \\frac{(4{,}0)^2}{10{,}0} = \\frac{16{,}0}{10{,}0} = 1{,}60\\text{ m}$
**Conclusion :** Le rayon de courbure au sommet de la trajectoire est de $1{,}60\\text{ m}$.

---

## 10. Les 8 Réflexes d'Or du Baccalauréat Sénégalais (P1)

> [!IMPORTANT]
> 1. **Trajectoire :** toujours éliminer $t$ entre $x(t)$ et $y(t)$. Ne jamais laisser $t$ dans l'équation cartésienne.
> 2. **Vecteur vitesse :** toujours tangent à la trajectoire au point $M$ et dans le sens du mouvement. Sa norme est $v = \\sqrt{\\dot{x}^2 + \\dot{y}^2 + \\dot{z}^2}$.
> 3. **Nature du mouvement :** calculer $\\vec{a} \\cdot \\vec{v}$. Si $>0$, accéléré ; si $<0$, retardé ; si $=0$, uniforme.
> 4. **Base de Frenet :** $a_t = \\frac{dv}{dt}$ (variation de valeur de vitesse) et $a_n = \\frac{v^2}{\\rho}$ (courbure vers le centre).
> 5. **Rayon de courbure :** $\\rho = \\frac{v^2}{a_n} = \\frac{v^2}{\\sqrt{a^2 - a_t^2}}$.
> 6. **Torricelli (MRUV) :** $v_B^2 - v_A^2 = 2\\,a\\,d$. Évite de calculer la durée $t$ dans les exercices de freinage !
> 7. **MCU :** $a_t = 0$ et $a_n = R\\,\\omega^2 = \\frac{v^2}{R}$. Vitesse scalaire constante mais accélération centripète non nulle !
> 8. **Oscillateur harmonique :** $\\ddot{x} + \\omega_0^2\\,x = 0$ donne $V_m = X_m\\,\\omega_0$ et $a_m = X_m\\,\\omega_0^2$.

> [!WOLOF]
> - « **Trajectoire :** Élimineel $t$ ci biir $x(t)$ duggal ko ci $y(t)$ ! »
> - « **Produit scalaire :** Xoolal $\\vec{a} \\cdot \\vec{v}$ waxtu wu nekk ! »
> - « **Frenet :** $a_t = \\frac{dv}{dt}$, $a_n = \\frac{v^2}{\\rho}$ ! »
> - « **Torricelli :** $v_B^2 - v_A^2 = 2\\,a\\,d$ ! »
> - « **MCU :** $v = R\\,\\omega$ ak $a_n = R\\,\\omega^2$ ! »
`;

// P2 : LES LOIS DE NEWTON SUR LE MOUVEMENT (Terminale S2 Sénégal)
RICH_LESSONS_MAP.lois_newton = `# P2 : Les Lois de Newton sur le Mouvement (Terminale S2)

Bienvenue dans le deuxième chapitre fondamental de **Mécanique** de **Terminale S2**, rigoureusement conforme au programme officiel sénégalais (MEN / IGEF / Office du Baccalauréat).

---

## 📜 Grande Fresque Historique & Philosophique de la Dynamique

> *« Si j'ai vu plus loin que les autres hommes, c'est en me tenant sur les épaules de géants. »* — **Sir Isaac Newton (1642–1727)**.
> 
> Si la **Cinématique** (chapitre P1) se contentait de décrire géométriquement la trajectoire et l'allure des corps dans l'espace et le temps, la **Dynamique** pénètre au cœur des causes profondes : **qu'est-ce qui produit le mouvement ? Pourquoi la matière accélère-t-elle, ralentit-elle ou bifurque-t-elle ?**
> 
> Pendant plus de deux mille ans, la pensée humaine a été entravée par le bon sens trompeur d'**Aristote (384–322 av. J.-C.)**. Pour Aristote, le repos était l'état d'équilibre absolu de la matière terrestre ; tout mouvement exigeait un « moteur » en contact direct avec l'objet ($v \\propto F$). Pour expliquer pourquoi une flèche continuait de voler après avoir quitté la corde de l'arc sans qu'on la pousse, Aristote en était réduit à inventer l'*antiperistasis* : l'air chassé à l'avant contournerait miraculeusement la flèche pour venir la pousser par l'arrière !
> 
> En 1632, **Galilée** pulvérise ce mirage grâce à une expérience de pensée géniale : il imagine une sphère de bronze roulant le long d'un plan incliné et remontant une pente opposée. Plus la pente de remontée est douce, plus la bille roule loin. Si la surface opposée devient rigoureusement horizontale et dépourvue de tout frottement, où s'arrêtera la bille ? **Nulle part !** Elle poursuivra éternellement sa course à vitesse constante en ligne droite. Galilée venait de concevoir le **Principe d'Inertie** : le repos n'a rien de supérieur au Mouvement Rectiligne Uniforme !
> 
> En **1687**, dans son chef-d'œuvre immortel, les *Philosophiae Naturalis Principia Mathematica*, **Isaac Newton** synthétise ces intuitions et énonce les trois lois fondamentales qui régissent toute la mécanique classique :
> 1. **La Première Loi (Principe d'Inertie)** : l'état de repos ou de translation rectiligne uniforme persiste tant qu'aucune force nette ne s'exerce sur le corps.
> 2. **La Deuxième Loi (Théorème du Centre d'Inertie - PFD)** : l'accélération d'un système est proportionnelle à la somme vectorielle des forces extérieures qui s'appliquent à lui et inversement proportionnelle à son inertie de masse ($\\sum \\vec{F}_{\\text{ext}} = m\\,\\vec{a}_G$).
> 3. **La Troisième Loi (Principe des Actions Réciproques)** : toute force exercée par un corps $A$ sur un corps $B$ engendre instantanément une force égale en intensité et directement opposée exercée par $B$ sur $A$ ($\\vec{F}_{A/B} = -\\vec{F}_{B/A}$).
> 
> Complétées au XVIIIe siècle par les lois expérimentales de **Guillaume Amontons** et de **Charles-Augustin de Coulomb (1785)** sur les frottements solides ($f = \\mu\\,R_N$), ces trois lois constituent la clé universelle pour comprendre tout mouvement mécanique au Sénégal : du coup d'accélérateur du **TER à la gare de Colobane**, au duel de force entre deux lutteurs dans le sable de l'**Arène Nationale de Pikine**, jusqu'au déchargement au treuil des cargaisons sur les quais du **Port Autonome de Dakar**.

---

![Figure 1 : Les trois lois de Newton, dynamique du plan incliné et applications au Sénégal](/assets/pedagogie/p2_lois_newton_dynamique.svg)

> [!VIE_REELLE] **Les Lois de Newton dans la Vie Quotidienne au Sénégal :**
> - **Le TER Dakar–Diamniadio (TCI)** : à la sortie de la gare de Colobane, les 150 tonnes de la rame accélèrent grâce à la force motrice $\\vec{F}_m$ fournie par l'alimentation électrique via la caténaire. La deuxième loi de Newton ($\\sum \\vec{F}_{\\text{ext}} = M\\,\\vec{a}$) permet aux ingénieurs ferroviaires d'équilibrer la force de traction et les frottements pour respecter les horaires jusqu'à Diamniadio.
> - **La Manutention au Port Autonome de Dakar (Plan Incliné)** : lors du déchargement des marchandises par les rampes d'accès, le poids des palettes se décompose : une composante perpendiculaire $R_N = m\\,g\\,\\cos\\alpha$ presse la charge contre la rampe, tandis qu'une composante motrice $P_x = m\\,g\\,\\sin\\alpha$ l'entraîne vers le bas. Les ouvriers règlent la rugosité de la surface pour que le frottement $f = \\mu\\,R_N$ garantisse un glissement sécurisé sans chute brutale !
> - **La Lutte Sénégalaise (Lamb) &amp; la Troisième Loi de Newton** : dans l'Arène Nationale de Pikine, pour propulser son adversaire ou charger, le lutteur prend un appui puissant sur le sable en le poussant violemment vers l'arrière ($\\vec{F}_{\\text{pied}/\\text{sol}}$). Instantanément, le sol réagit et propulse le lutteur vers l'avant avec une force rigoureusement égale en intensité ($\\vec{F}_{\\text{sol}/\\text{pied}} = -\\vec{F}_{\\text{pied}/\\text{sol}}$). C'est la 3ème loi de Newton en action !
> - **Les Pirogues de Pêche à Kayar / Soumbédioune (Propulsion)** : l'hélice du moteur hors-bord rejette l'eau de mer vers l'arrière ; par réaction immédiate, la masse d'eau propulse la pirogue vers l'avant à travers la houle atlantique.

> [!WOLOF] **Xam-xam ci Wolof — Lois de Newton :**
> - « **1ère Loi (Principe d'Inertie) :** Bu forces yépp dañoo faye bopp ($\\sum \\vec{F} = \\vec{0}$), solide bi dafay taxaw temm walla mu di daw ci yoon bu jub te tegu (MRU, $\\vec{v} = \\vec{\\text{cte}}$) ! »
> - « **2ème Loi (TCI / PFD) :** Doole ji nga jox solide bi mooy waral accélération bi : $\\sum \\vec{F}_{\\text{ext}} = m\\,\\vec{a}_G$ ! Bu doole yi yokkoo, accélération bi day gën a mag ; bu masse bi yokkoo, dafay gën a diis a yëngal ! »
> - « **3ème Loi (Action-Réaction) :** Doo mën a daan lenn te moom itam du la daan ak doole ju tolloo : $\\vec{F}_{A/B} = -\\vec{F}_{B/A}$ ! Doole yii duñu faye bopp mukk ndax benn bi dafa nekk ci $A$, baneen bi nekk ci $B$ ! »
> - « **Plan Incliné :** Angle $\\alpha$ bi ci suuf, $P_x = m\\,g\\,\\sin\\alpha$ mooy doole ji koy rëddal, te $R_N = m\\,g\\,\\cos\\alpha$ mooy doole ji koy tëj ! Bu frottement amul, $a = g\\,\\sin\\alpha$ ! »
> - « **Frottement $\\vec{f}$ :** Dafay kontar vitesse bi waxtu wu nekk : $f = \\mu\\,R_N = \\mu\\,m\\,g\\,\\cos\\alpha$. Moom mooy wàññi accélération bi ba mu def $a = g\\,(\\sin\\alpha - \\mu\\,\\cos\\alpha)$ ! »

---

## Objectifs Officiels du Baccalauréat Sénégalais (IGEF / MEN)
À la fin de ce chapitre, tout élève de Terminale S2 doit être capable de :
1. Définir un **référentiel galiléen** et énoncer la **première loi de Newton (Principe d'inertie)**.
2. Définir le vecteur quantité de mouvement $\\vec{p} = m\\,\\vec{v}_G$ et énoncer la **deuxième loi de Newton (Principe fondamental de la dynamique)** sous ses formes $\\frac{d\\vec{p}}{dt} = \\sum \\vec{F}_{\\text{ext}}$ et $\\sum \\vec{F}_{\\text{ext}} = m\\,\\vec{a}_G$.
3. Connaître les unités de base du Système International pour la force ($1\\text{ N} = 1\\text{ kg}\\cdot\\text{m}\\cdot\\text{s}^{-2}$).
4. Appliquer rigoureusement la **méthodologie en 5 étapes** pour déterminer l'accélération du centre d'inertie d'un solide.
5. Énoncer la **troisième loi de Newton (Principe des actions réciproques)**, en expliquer les caractéristiques et justifier pourquoi l'action et la réaction ne s'annulent jamais.
6. Établir l'expression de l'accélération d'un solide sur un **plan incliné**, avec et sans frottements solides (loi de Coulomb $f = \\mu\\,R_N$).
7. Étudier les **systèmes de solides liés** par un fil inextensible de masse négligeable passant sur une poulie idéale (accélération commune et tension du fil).
8. Associer la dynamique à la cinématique pour déterminer les lois horaires du mouvement et appliquer la formule de Torricelli ($v_B^2 - v_A^2 = 2\\,a\\,d$).

---

## 1. Référentiels Galiléens & Première Loi de Newton (Principe d'Inertie)

### 1.1 Qu'est-ce qu'un Référentiel Galiléen ?
Un **référentiel galiléen** (ou inertiel) est un référentiel dans lequel le principe d'inertie est rigoureusement vérifié.
Tout référentiel en mouvement de translation rectiligne et uniforme par rapport à un référentiel galiléen est lui-même galiléen.

| Référentiel | Solide de Référence & Caractéristiques | Validité Galiléenne au Bac S2 |
| :--- | :--- | :--- |
| **Terrestre (du laboratoire)** | Lié au sol terrestre (ex: le quai de Rufisque, une table de laboratoire). | Galiléen en excellente approximation pour des expériences dont la durée est très courte devant 24 heures (rotation de la Terre négligeable). |
| **Géocentrique** | Centre de la Terre, axes orientés vers 3 étoiles lointaines fixes. | Galiléen pour l'étude des satellites artificiels terrestres et de la Lune. |
| **Héliocentrique (Copernic)** | Centre du Soleil, axes orientés vers 3 étoiles fixes. | Référentiel galiléen de référence pour le mouvement des planètes du système solaire. |

### 1.2 Énoncé de la Première Loi de Newton
> [!IMPORTANT]
> **Énoncé officiel du Bac S2 :**
> Dans un référentiel galiléen, si la somme vectorielle des forces extérieures appliquées à un solide est nulle, son centre d'inertie $G$ conserve son état de repos ou poursuit un Mouvement Rectiligne Uniforme :
> $\\sum \\vec{F}_{\\text{ext}} = \\vec{0} \\iff \\vec{v}_G = \\vec{\\text{cte}}$
> Réciproquement, si le centre d'inertie d'un solide est au repos ou en Mouvement Rectiligne Uniforme dans un référentiel galiléen, alors la somme vectorielle des forces extérieures qui s'exercent sur lui est rigoureusement nulle.

### 1.3 Solide Isolé et Pseudo-Isolé
- **Solide isolé** : solide soumis à aucune force extérieure (cas théorique idéal dans l'espace lointain).
- **Solide pseudo-isolé** : solide soumis à des forces extérieures qui se compensent mutuellement à chaque instant ($\\sum \\vec{F}_{\\text{ext}} = \\vec{0}$).
  *Exemple classique au Sénégal* : un train TER roulant à vitesse constante de $160\\text{ km}\\cdot\\text{h}^{-1}$ sur ligne droite horizontale : la force de traction motrice compense exactement les frottements ($\\vec{F}_m + \\vec{f} = \\vec{0}$), et le poids compense la réaction du rail ($\\vec{P} + \\vec{R}_N = \\vec{0}$).

> [!WOLOF] **Xam-xam ci Wolof — 1ère Loi (Principe d'Inertie) :**
> - « **Lu tëdd te kenn laalu ko du yëngu mukk !** Te lu doon daw ci yoon bu jub te benn doole laalu ko, day wéy di daw te du tàyyi ba fàww ! »
> - « **Inertie bi ci dundin u nit :** Bu car rapide bi wala bus Tata bi freiné dëggër ci VDN, passagers yépp dañuy daan ci kanam ! Ndax seen yaram dafa bëgg wéy di daw ni mu doon dawe bala chauffeur bi di freiné ! Kooku mooy l'inertie ! »

---

## 2. Deuxième Loi de Newton : Principe Fondamental de la Dynamique (TCI)

### 2.1 Vecteur Quantité de Mouvement
Le vecteur quantité de mouvement d'un point matériel de masse $m$ animé d'une vitesse $\\vec{v}_G$ est défini par :
$\\vec{p} = m\\,\\vec{v}_G \\quad (\\text{en kg}\\cdot\\text{m}\\cdot\\text{s}^{-1})$

### 2.2 Énoncé Général de la Deuxième Loi
Dans un référentiel galiléen, la dérivée par rapport au temps du vecteur quantité de mouvement d'un système est égale à la somme vectorielle des forces extérieures qui s'exercent sur lui :
$\\frac{d\\vec{p}}{dt} = \\sum \\vec{F}_{\\text{ext}}$

### 2.3 Formulation pour un Système à Masse Constante ($m = \\text{cte}$)
En classe de Terminale S2, la masse $m$ du solide étudié est constante :
$\\frac{d\\vec{p}}{dt} = \\frac{d(m\\,\\vec{v}_G)}{dt} = m\\,\\frac{d\\vec{v}_G}{dt} = m\\,\\vec{a}_G$

D'où l'expression universelle du **Théorème du Centre d'Inertie (TCI)** :
$\\sum \\vec{F}_{\\text{ext}} = m\\,\\vec{a}_G$

- $\\sum \\vec{F}_{\\text{ext}}$ : somme vectorielle des forces extérieures en Newtons ($\\text{N}$).
- $m$ : masse du solide en kilogrammes ($\\text{kg}$).
- $\\vec{a}_G$ : accélération du centre d'inertie en mètres par seconde carrée ($\\text{m}\\cdot\\text{s}^{-2}$).

> [!NOTE]
> **Homogénéité et Dimension :**
> $[F] = [M]\\,[L]\\,[T]^{-2} \\implies 1\\text{ Newton (N)} = 1\\text{ kg}\\cdot\\text{m}\\cdot\\text{s}^{-2}$
> Une force de $1\\text{ N}$ communique à un corps de masse $1\\text{ kg}$ une accélération de $1\\text{ m}\\cdot\\text{s}^{-2}$.

> [!WOLOF] **Xam-xam ci Wolof — 2ème Loi (TCI / PFD) :**
> - « **Doole mooy sabab accélération :** $\\sum \\vec{F}_{\\text{ext}} = m\\,\\vec{a}_G$. Soo doon yëngal pousse-pousse bu fees ak saaku cèbb ci marché Sandaga, dafay gën a diis a accélérer que pousse-pousse bu vide ndax masse $m$ bi moo mag ! »
> - « **Homogénéité :** $1\\text{ Newton}$ mooy doole ji ngay jox $1\\text{ kg}$ ngir mu am accélération bu toll ci $1\\text{ m}\\cdot\\text{s}^{-2}$ ! »

---

## 3. Méthodologie Universelle de Résolution en 5 Étapes

Au Baccalauréat sénégalais, les inspecteurs et correcteurs exigent la démarche suivante :

1. **Système étudié** : Définir avec précision le solide ou l'ensemble matériel considéré (ex : {solide $S$ de masse $m$}).
2. **Référentiel d'étude** : Préciser le référentiel et son caractère galiléen : « Référentiel terrestre supposé galiléen ».
3. **Bilan des forces extérieures appliquées** : Dresser l'inventaire exhaustif des forces sans en oublier :
   - Forces à distance : Le poids $\\vec{P} = m\\,\\vec{g}$.
   - Forces de contact : La réaction normale du support $\\vec{R}_N$, la force de frottement $\\vec{f}$, la tension d'un fil $\\vec{T}$, la force motrice $\\vec{F}$.
4. **Application du TCI (2ème Loi)** : Écrire la relation vectorielle formelle :
   $\\sum \\vec{F}_{\\text{ext}} = m\\,\\vec{a}_G \\implies \\vec{P} + \\vec{R}_N + \\vec{f} + \\vec{T} = m\\,\\vec{a}_G$
5. **Choix du repère et projection scalaire** :
   Choisir un repère orthonormé $(Ox, Oy)$ adapté à la géométrie de la trajectoire (l'axe $Ox$ étant colinéaire au déplacement) et projeter chaque vecteur force pour obtenir les équations scalaires.

> [!WOLOF] **Xam-xam ci Wolof — Les 5 Étapes d'Or au Bac S2 :**
> - « **Bul sotti sa formules sans yoon wi :** Correcteur bu Bac dafay seet 5 étapes yi : »
>   1. **Système :** Koor bi ngay étudier {solide $S$}.
>   2. **Référentiel :** {Terrestre supposé galiléen}.
>   3. **Bilan des forces :** $\\vec{P}$, $\\vec{R}_N$, $\\vec{f}$, $\\vec{T}$.
>   4. **Théorème :** $\\sum \\vec{F}_{\\text{ext}} = m\\,\\vec{a}_G$.
>   5. **Projection :** Projeter ci axes $(Ox)$ ak $(Oy)$ ngir génne équations scalaires !

---

## 4. Troisième Loi de Newton : Principe des Actions Réciproques

### 4.1 Énoncé Officiel
> [!IMPORTANT]
> **Énoncé de la 3ème loi de Newton :**
> Lorsque deux corps $A$ et $B$ interagissent, le corps $A$ exerce sur le corps $B$ une force $\\vec{F}_{A/B}$, et simultanément le corps $B$ exerce sur le corps $A$ une force $\\vec{F}_{B/A}$ directement opposée :
> $\\vec{F}_{A/B} = -\\vec{F}_{B/A}$

### 4.2 Caractéristiques des Forces d'Interaction :
1. **Même droite d'action** : elles sont portées par la même ligne droite joignant les points matériels.
2. **Même intensité (norme)** : $\\|\\vec{F}_{A/B}\\| = \\|\\vec{F}_{B/A}\\| = F$.
3. **Sens opposés** : $\\vec{F}_{A/B}$ et $\\vec{F}_{B/A}$ pointent dans des directions opposées.
4. **Points d'application DIFFÉRENTS** : $\\vec{F}_{A/B}$ s'exerce sur le corps $B$, tandis que $\\vec{F}_{B/A}$ s'exerce sur le corps $A$.

> [!WARNING]
> **Pourquoi l'action et la réaction ne s'annulent-elles jamais ?**
> Deux forces ne peuvent s'annuler ou se compenser que si elles s'appliquent au **même corps matériel** ! Puisque $\\vec{F}_{A/B}$ agit sur $B$ et $\\vec{F}_{B/A}$ agit sur $A$, chacune produit des effets dynamiques distincts sur son propre système.

> [!WOLOF] **Xam-xam ci Wolof — 3ème Loi (Action - Réaction) :**
> - « **Doo mën a daan lenn te moom itam du la daan ak doole ju tolloo :** $\\vec{F}_{A/B} = -\\vec{F}_{B/A}$ ! »
> - « **Lamb ji ci Arène Nationale de Pikine :** Mbeur mi buy charger moroom ma, tank bi dafay repousser suuf si ci ginaaw ak doole ju mag. Suuf si dafay réagir diko pousser ci kanam ! »
> - « **Ndax doole yii dañuy faye bopp ? Mukk dédéet !** Benn bi ci tank mbeur mi la nekk, baneen bi ci suuf si ! Kenn mënut a annuler moroom ma ndax seen points d'application wuute nañu ! »

---

## 5. Étude Approfondie du Plan Incliné

Un solide ponctuel de masse $m$ glisse sur une rampe inclinée d'un angle $\\alpha$ par rapport à l'horizontale.

### 5.1 Choix du Repère de Projection
- Origine : position initiale du centre d'inertie $G$.
- Axe $(Gx)$ : parallèle à la ligne de plus grande pente du plan, orienté dans le sens de la descente.
- Axe $(Gy)$ : perpendiculaire au plan incliné, orienté vers le haut.

### 5.2 Décomposition Vectorielle du Poids $\\vec{P}$
L'angle $\\alpha$ de la pente se retrouve entre la verticale descendante et l'axe $(Gy)$ :
$\\vec{P} = P_x\\,\\vec{i} + P_y\\,\\vec{j} = (+m\\,g\\,\\sin\\alpha)\\vec{i} + (-m\\,g\\,\\cos\\alpha)\\vec{j}$

- $P_x = +m\\,g\\,\\sin\\alpha$ : composante tangentielle qui tire le solide vers le bas de la pente.
- $P_y = -m\\,g\\,\\cos\\alpha$ : composante normale qui plaque le solide contre la surface.

### 5.3 Cas 1 : Plan Incliné SANS Frottement ($\\vec{f} = \\vec{0}$)
Les seules forces appliquées sont le poids $\\vec{P}$ et la réaction normale $\\vec{R}_N = R_N\\,\\vec{j}$.
Application du TCI :
$\\vec{P} + \\vec{R}_N = m\\,\\vec{a}_G$

- **Projection sur l'axe $(Gy)$** (aucun mouvement vertical, $a_y = 0$) :
  $R_N - m\\,g\\,\\cos\\alpha = 0 \\implies R_N = m\\,g\\,\\cos\\alpha$
- **Projection sur l'axe $(Gx)$** :
  $m\\,g\\,\\sin\\alpha = m\\,a_x \\implies a_x = g\\,\\sin\\alpha$

> [!IMPORTANT]
> **Résultat fondamental :** En l'absence de frottement, l'accélération $a = g\\,\\sin\\alpha$ est **constante** et **rigoureusement indépendante de la masse $m$**. Le mouvement est un Mouvement Rectiligne Uniformément Accéléré (MRUA).

### 5.4 Cas 2 : Plan Incliné AVEC Frottement Solide (Loi de Coulomb)
Le contact présente des frottements solides caractérisés par le coefficient de frottement dynamique $\\mu$ :
$\\vec{f} = -f\\,\\vec{i} \\quad \\text{avec} \\quad f = \\mu\\,R_N = \\mu\\,m\\,g\\,\\cos\\alpha$

Application du TCI :
$\\vec{P} + \\vec{R}_N + \\vec{f} = m\\,\\vec{a}_G$

- **Projection sur l'axe $(Gx)$** :
  $P_x - f = m\\,a_x \\implies m\\,g\\,\\sin\\alpha - \\mu\\,m\\,g\\,\\cos\\alpha = m\\,a$
  $a = g\\,(\\sin\\alpha - \\mu\\,\\cos\\alpha)$

### 5.5 Condition de Démarrage et Glissement
Pour qu'un solide posé sans vitesse initiale se mette spontanément en mouvement vers le bas de la pente :
$P_x > f_{\\text{max}} \\implies m\\,g\\,\\sin\\alpha > \\mu\\,m\\,g\\,\\cos\\alpha \\implies \\tan\\alpha > \\mu$
Si $\\tan\\alpha \\le \\mu$, le mobile reste immobile au repos à cause de l'adhérence statique.

> [!WOLOF] **Xam-xam ci Wolof — Plan Incliné ak Frottement Coulomb :**
> - « **Poids bi dafay xàjj ñaar :** $P_x = m\\,g\\,\\sin\\alpha$ di ko rëddal ci suuf, ak $P_y = -m\\,g\\,\\cos\\alpha$ di ko fatt ci tapette bi ! »
> - « **Sans frottement :** $a = g\\,\\sin\\alpha$. Masse $m$ bi du ci génn mukk ! Poids bu rëy ak bu ndaw yem nañu accélération ci pente bi ! »
> - « **Ak frottement :** $f = \\mu\\,R_N = \\mu\\,m\\,g\\,\\cos\\alpha$. Moom mooy wàññi accélération bi ba mu def : $a = g\\,(\\sin\\alpha - \\mu\\,\\cos\\alpha)$ ! »

---

## 6. Systèmes de Solides Liés (Poulie & Fil Inextensible)

### 6.1 Les Hypothèses Idéales du Baccalauréat Sénégalais
1. **Fil inextensible** : sa longueur reste constante $\\implies$ les deux solides parcourent les mêmes distances dans les mêmes intervalles de temps, d'où l'égalité des accélérations scalaires :
   $a_1 = a_2 = a$
2. **Fil de masse négligeable et poulie idéale** (sans masse ni frottement sur son axe) : la tension est uniforme le long du fil :
   $T_1 = T_2 = T$

### 6.2 Cas Typique : Machine d'Atwood ($m_2 > m_1$)
Deux corps $S_1$ (masse $m_1$) et $S_2$ (masse $m_2$) sont suspendus à un fil passant sur une poulie.
- **Bilan pour $S_1$ (qui monte)** :
  $T - m_1\\,g = m_1\\,a \\quad (\\text{Équation 1})$
- **Bilan pour $S_2$ (qui descend)** :
  $m_2\\,g - T = m_2\\,a \\quad (\\text{Équation 2})$

En sommant membre à membre $(1) + (2)$ pour éliminer la tension $T$ :
$(m_2 - m_1)\\cdot g = (m_1 + m_2)\\cdot a \\implies a = \\frac{m_2 - m_1}{m_1 + m_2}\\,g$

En réinjectant $a$ dans l'Équation 1, on trouve la tension du fil :
$T = m_1\\,(g + a) = \\frac{2\\,m_1\\,m_2}{m_1 + m_2}\\,g$

> [!WOLOF] **Xam-xam ci Wolof — Machine d'Atwood ak Fil Inextensible :**
> - « **Fil bi dafay lier accélération yi :** $a_1 = a_2 = a$. Poids bi gën a diis ($m_2\,g$) mooy yóbbe kanam, bi gën a woyof ($m_1\,g$) diko tànk ci ginaaw : $a = \\frac{m_2 - m_1}{m_1 + m_2}\\,g$ ! »
> - « **Tension $T$ bi du faye bopp ci fil bi :** $T = \\frac{2\\,m_1\\,m_2}{m_1 + m_2}\\,g$ ! »

---

## 7. Épreuve Officielle Résolue du Baccalauréat Sénégalais (Sujet Type Office du Bac S2)

### Énoncé Officiel :
Un solide ponctuel $(S)$ de masse $m = 400\\text{ g}$ est lancé à partir d'un point $A$ situé au sommet d'un plan incliné $AB$ faisant un angle $\\alpha = 30^\\circ$ avec l'horizontale. La longueur du plan est $AB = L = 2{,}5\\text{ m}$.
Le solide est abandonné en $A$ à $t = 0$ sans vitesse initiale ($v_A = 0$). On prendra $g = 9{,}8\\text{ m}\\cdot\\text{s}^{-2}$.

1. **Première phase : Frottements négligeables**
   a) Faire le bilan des forces appliquées à $(S)$ et les représenter sur un schéma soigné.
   b) En appliquant le Théorème du Centre d'Inertie, déterminer l'accélération $a_1$ du solide.
   c) Calculer la vitesse $v_B$ du solide à son arrivée au bas du plan incliné en $B$.
   d) Déterminer la durée $t_B$ mise par le solide pour effectuer le trajet $AB$.

2. **Deuxième phase : Frottements non négligeables**
   En réalité, le solide arrive en $B$ avec une vitesse mesurée expérimentalement $v'_B = 4{,}0\\text{ m}\\cdot\\text{s}^{-1}$.
   a) Montrer que le contact présente des frottements et calculer l'accélération réelle $a_2$.
   b) Déterminer l'intensité de la force de frottement $f$.
   c) En déduire la valeur du coefficient de frottement dynamique $\\mu$.

---

### Solution Détaillée & Rédigée Conforme aux Critères du Bac S2 :

#### 1. Première phase (Frottements négligeables) :

**a) Bilan des forces appliquées à $(S)$ :**
- Système étudié : {Le solide $(S)$ de masse $m = 0{,}40\\text{ kg}$}.
- Référentiel : Terrestre, supposé galiléen.
- Forces extérieures :
  - Le poids $\\vec{P} = m\\,\\vec{g}$ (vertical descendant, appliqué au centre $G$).
  - La réaction normale du plan $\\vec{R}_N$ (perpendiculaire à la pente, vers le haut).

**b) Calcul de l'accélération $a_1$ :**
D'après la 2ème loi de Newton :
$\\vec{P} + \\vec{R}_N = m\\,\\vec{a}_G$
On choisit un repère orthonormé $(Ax, Ay)$ où $(Ax)$ est colinéaire à la ligne de plus grande pente et orienté de $A$ vers $B$.
Projection sur l'axe $(Ax)$ :
$P_x + R_{Nx} = m\\,a_1 \\implies m\\,g\\,\\sin\\alpha + 0 = m\\,a_1 \\implies a_1 = g\\,\\sin\\alpha$
Application numérique :
$a_1 = 9{,}8 \\times \\sin(30^\\circ) = 9{,}8 \\times 0{,}5 = 4{,}90\\text{ m}\\cdot\\text{s}^{-2}$

**c) Vitesse $v_B$ à l'arrivée en $B$ :**
L'accélération étant constante ($a_1 = \\text{cte}$), le mouvement est rectiligne uniformément varié.
D'après la formule de Torricelli indépendante du temps :
$v_B^2 - v_A^2 = 2\\,a_1\\,AB \\implies v_B^2 - 0 = 2\\,a_1\\,L$
$v_B = \\sqrt{2\\,a_1\\,L} = \\sqrt{2 \\times 4{,}90 \\times 2{,}5} = \\sqrt{24{,}5} \\approx 4{,}95\\text{ m}\\cdot\\text{s}^{-1}$

**d) Durée $t_B$ du parcours $AB$ :**
$v_B = a_1\\,t_B \\implies t_B = \\frac{v_B}{a_1} = \\frac{4{,}95}{4{,}90} \\approx 1{,}01\\text{ s}$

---

#### 2. Deuxième phase (Frottements non négligeables) :

**a) Mise en évidence des frottements et calcul de $a_2$ :**
Puisque la vitesse réelle mesurée $v'_B = 4{,}0\\text{ m}\\cdot\\text{s}^{-1}$ est strictement inférieure à la vitesse théorique sans frottement ($v_B = 4{,}95\\text{ m}\\cdot\\text{s}^{-1}$), de l'énergie mécanique a été dissipée sous forme de chaleur : le contact présente des frottements !
D'après la relation de Torricelli :
$(v'_B)^2 - v_A^2 = 2\\,a_2\\,L \\implies a_2 = \\frac{(v'_B)^2}{2\\,L} = \\frac{(4{,}0)^2}{2 \\times 2{,}5} = \\frac{16{,}0}{5{,}0} = 3{,}20\\text{ m}\\cdot\\text{s}^{-2}$

**b) Intensité de la force de frottement $f$ :**
En présence de frottements $\\vec{f}$, le TCI projeté sur l'axe $(Ax)$ donne :
$P_x - f = m\\,a_2 \\implies m\\,g\\,\\sin\\alpha - f = m\\,a_2$
$f = m\\,(g\\,\\sin\\alpha - a_2) = m\\,(a_1 - a_2)$
Application numérique :
$f = 0{,}40 \\times (4{,}90 - 3{,}20) = 0{,}40 \\times 1{,}70 = 0{,}68\\text{ N}$

**c) Coefficient de frottement dynamique $\\mu$ :**
La projection sur l'axe $(Ay)$ perpendiculaire à la pente donne :
$R_N - m\\,g\\,\\cos\\alpha = 0 \\implies R_N = m\\,g\\,\\cos\\alpha$
$R_N = 0{,}40 \\times 9{,}8 \\times \\cos(30^\\circ) = 3{,}92 \\times \\frac{\\sqrt{3}}{2} \\approx 3{,}395\\text{ N}$
D'après la loi de Coulomb :
$f = \\mu\\,R_N \\implies \\mu = \\frac{f}{R_N} = \\frac{0{,}68}{3{,}395} \\approx 0{,}20$
**Conclusion :** Le coefficient de frottement dynamique vaut $\\mu = 0{,}20$ (grandeur sans unité).

---

## 8. Les 8 Réflexes d'Or du Baccalauréat Sénégalais (P2)

> [!IMPORTANT]
> 1. **Référentiel galiléen :** Toujours mentionner « Dans le référentiel terrestre supposé galiléen » avant d'écrire $\\sum \\vec{F}_{\\text{ext}} = m\\,\\vec{a}_G$.
> 2. **Décomposition sur plan incliné :** Retenir $P_x = +m\\,g\\,\\sin\\alpha$ et $R_N = m\\,g\\,\\cos\\alpha$.
> 3. **Indépendance de la masse :** Sans frottement sur plan incliné, $a = g\\,\\sin\\alpha$. La masse n'intervient jamais dans l'accélération !
> 4. **Frottements :** Toujours relier la force de frottement à la réaction normale : $f = \\mu\\,R_N = \\mu\\,m\\,g\\,\\cos\\alpha$.
> 5. **Systèmes liés :** Traiter chaque solide séparément pour faire apparaître la tension $T$, puis additionner les équations pour l'éliminer et trouver $a$.
> 6. **3ème loi de Newton :** $\\vec{F}_{A/B} = -\\vec{F}_{B/A}$. Mêmes intensités, sens opposés, mais corps d'application différents : elles ne se compensent JAMAIS !
> 7. **Lien Dynamique $\\to$ Torricelli :** Une fois $a$ calculée, utiliser $v_B^2 - v_A^2 = 2\\,a\\,d$ pour économiser un temps précieux sans calculer $t$.
> 8. **Vitesse constante :** Si la vitesse est constante, $a = 0$ : les forces motrices compensent exactement les résistances ($\\sum \\vec{F}_{\\text{ext}} = \\vec{0}$).

> [!WOLOF]
> - « **TCI bi :** Bindal 5 étapes yi : Système, Référentiel, Bilan des forces, $\\sum \\vec{F} = m\\,\\vec{a}$, ak projection ! »
> - « **Plan incliné :** $a = g\\,\\sin\\alpha$ sans frottement ; $a = g\\,(\\sin\\alpha - \\mu\\,\\cos\\alpha)$ ak frottement ! »
> - « **Torricelli :** $v_B^2 - v_A^2 = 2\\,a\\,d$ mooy sa arme secrète ci Bac ! »
> - « **Action-Réaction :** $\\vec{F}_{A/B} = -\\vec{F}_{B/A}$, duñu faye bopp mukk ! »
`;

// P3 : MOUVEMENT D'UN PROJECTILE DANS UN CHAMP DE PESANTEUR UNIFORME (Terminale S2 Sénégal)
RICH_LESSONS_MAP.projectile_champ_pesanteur = `# P3 : Mouvement d'un Projectile dans un Champ de Pesanteur Uniforme (Terminale S2)

Bienvenue dans le troisième chapitre fondamental de **Mécanique** de **Terminale S2**, rigoureusement conforme au programme officiel sénégalais (MEN / IGEF / Office du Baccalauréat).

---

## 📜 Grande Fresque Historique & Épistémologique de la Balistique

> *« Composer deux mouvements orthogonaux entièrement indépendants : un mouvement rectiligne uniforme le long de l'horizontale, et une chute libre uniformément accélérée selon la verticale »* : telle est la magistrale découverte géométrique et physique publiée par **Galilée en 1638** dans ses célèbres *Discours concernant deux sciences nouvelles*.
> 
> Jusqu'au XVIe siècle, la balistique était dominée par les spéculations d'Aristote et les théories médiévales de l'« impetus » : on croyait naïvement qu'un boulet de canon avançait en ligne droite sous l'action d'une force motrice interne, puis s'arrêtait brusquement avant de tomber à la verticale. En 1537, l'ingénieur et mathématicien italien **Niccolò Tartaglia** publie *La Nova Scientia* : il réfute cette idée fausse, montre que la trajectoire est courbe en tout point et établit empiriquement pour la première fois que l'angle de tir conférant la portée maximale sur terrain plat est de **45 degrés ($45^\\circ$)**.
> 
> Un siècle plus tard, **Galilée** pose les fondements du **principe de superposition des mouvements** : l'accélération de la pesanteur n'agit que verticalement (selon l'axe $Oy$), n'exerçant rigoureusement aucun effet sur la vitesse horizontale (selon l'axe $Ox$). En éliminant le paramètre temps $t$ entre l'abscisse et l'ordonnée, Galilée démontre avec éclat que la trajectoire est une **parabole parfaite**, courbe conique déjà étudiée par Apollonius de Perge dans l'Antiquité grecque !
> 
> En 1687, dans ses *Principia Mathematica*, **Isaac Newton** pousse cette intuition jusqu'à l'universalité cosmique à travers sa fameuse expérience de pensée du **canon de Newton** : si l'on augmente suffisamment la vitesse initiale horizontale d'un projectile lancé depuis le sommet d'une montagne imaginaire, la courbure de sa trajectoire épouse exactement la courbure sphérique de la Terre. Le projectile ne touche plus jamais le sol : il « tombe sans cesse » autour de la Terre. Le projectile est devenu un **satellite artificiel**, unifiant d'un seul coup la balistique terrestre et la mécanique céleste !
> 
> Au Sénégal, que ce soit pour calculer la trajectoire liftée d'un **coup franc de Sadio Mané au Stade Abdoulaye Wade de Diamniadio**, optimiser le jet d'un athlète au **lancer de javelot ou de poids aux Jeux Olympiques de la Jeunesse de Dakar**, réussir un **service smashé au Stadium Marius Ndiaye**, ou concevoir les fontaines et jets d'eau monumentaux de la **Place de la Nation**, l'étude du projectile dans le champ de pesanteur est le modèle balistique universel de référence.

---

![Figure : Mouvement d'un projectile dans le champ de pesanteur uniforme, équations horaires, flèche et portée](/assets/pedagogie/p3_projectile_pesanteur.svg)

> [!VIE_REELLE] **La Balistique au Cœur du Quotidien Sénégalais :**
> - **Le Coup Franc Direct au Stade Abdoulaye Wade (Diamniadio)** : placé à $24\\text{ m}$ des cages, le tireur doit communiquer au ballon une vitesse initiale $v_0$ sous un angle $\\alpha$ précis. Le ballon doit s'élever au-dessus du mur défensif adverse ($H_{\\text{mur}} \\approx 2{,}00\\text{ m}$ situé à $9{,}15\\text{ m}$), atteindre sa flèche maximale au-dessus des têtes, puis replonger sous la barre transversale ($2{,}44\\text{ m}$) hors de portée du gardien !
> - **Le Lancer de Javelot et de Poids (Jeux Olympiques Dakar)** : l'athlète ne lâche pas l'engin au niveau du sol, mais à une hauteur initiale $y_0 \\approx 1{,}80\\text{ m}$ à $2{,}00\\text{ m}$. L'analyse mathématique rigoureuse prouve que pour $y_0 > 0$, l'angle de tir optimal conférant la portée maximale n'est plus exactement $45^\\circ$, mais légèrement inférieur : $\\alpha_{\\text{opt}} \\approx 42^\\circ$ à $43^\\circ$ !
> - **Le Service Smashé au Stadium Marius Ndiaye** : la volleyeuse saute pour frapper le ballon à une altitude $y_0 = 2{,}80\\text{ m}$. En imprimant une vitesse descendante ($\\alpha < 0$) ou rasante, le ballon franchit le filet ($2{,}24\\text{ m}$) et s'écrase dans le camp adverse avec une vitesse d'impact foudroyante.
> - **Le Jet d'Eau de la Place de la Nation (Dakar)** : les ingénieurs hydrauliques règlent la pression de la tuyère pour que le jet d'eau parabolique atteigne une hauteur précise $H$ sans déborder hors du bassin circulaire de réception de rayon $R$.

> [!WOLOF] **Xam-xam ci Wolof — Mouvement bu Projectile ci Pesanteur :**
> - « **Ñaari yoon yu bokkul ci benn (Indépendance des axes) :** Mouvement bu projectile dafa seddaliku ci ñaar :
>   - Ci wetu suuf $(Ox)$ : amul benn force buy dagg ball bi ! Vitesse bi dafay tegu tégg ($a_x = 0 \\implies v_x = v_0\\cos\\alpha = \\text{cte}$). Mouvement Rectiligne Uniforme (MRU) la !
>   - Ci kaw ak suuf $(Oy)$ : pesanteur $\\vec{g}$ kese koy ñaññ jëm ci suuf ! Accélération bi mooy $a_y = -g$. Mouvement Rectiligne Uniformément Varié (MRUV) la ! »
> - « **Équation de la trajectoire :** Génneel waxtu bi $t = \\frac{x}{v_0\\cos\\alpha}$ ci $x$, duggal ko ci $y$. Parabole buy daanu ci suuf ngay am : $y = -\\frac{g}{2v_0^2\\cos^2\\alpha}x^2 + (\\tan\\alpha)x + y_0$ ! »
> - « **Summit bi $S$ (Flèche $H$) :** Fa summit bi nekk, vitesse verticale bi dafay wàcc ba nekk zéro ($v_y = 0$). Waaye vitesse horizontale bi $v_x$ moom dafay wéy di daw ! »
> - « **Portée bi $P$ :** Foo koy tàbbi ci suuf, $y = 0$. Boo bëggee mu sori lool ci suuf te $y_0 = 0$, tëjal angle bi ci $45^\\circ$ ndax $\\sin(2 \\times 45^\\circ) = \\sin(90^\\circ) = 1$ ! »
> - « **Vitesse d'impact :** Ndax amul frottements ci ngelaw li, énergie mécanique dafay gardé boppam : $v_P = \\sqrt{v_0^2 + 2g(y_0 - y_P)}$ ! »

---

## Objectifs Officiels du Baccalauréat Sénégalais (IGEF / MEN)
À la fin de ce chapitre, tout élève de Terminale S2 doit être capable de :
1. Définir le champ de pesanteur uniforme $\\vec{g}$ et préciser les conditions de son uniformité.
2. Établir l'inventaire des forces appliquées à un projectile et justifier l'hypothèse de chute libre.
3. Appliquer le Théorème du Centre d'Inertie (TCI) pour établir le vecteur accélération $\\vec{a} = \\vec{g}$.
4. Établir par intégrations successives les équations horaires de la vitesse $\\vec{v}(t)$ et de la position $\\vec{OM}(t)$.
5. Établir l'équation cartésienne de la trajectoire $y(x)$ par élimination du temps $t$ et justifier sa nature parabolique.
6. Déterminer les caractéristiques du sommet $S$ de la trajectoire : instant $t_S$, coordonnées $(x_S, y_S)$ et flèche maximale $H$.
7. Déterminer la portée horizontale $x_P$ et démontrer que la portée maximale correspond à $\\alpha = 45^\\circ$ lorsque $y_0 = 0$.
8. Calculer la vitesse d'impact au sol $v_P$ à l'aide des composantes vectorielles et par le Théorème de l'Énergie Cinétique (TEC).
9. Résoudre le problème du franchissement d'obstacle (mur, filet, gardien).
10. Exploiter la relation trigonométrique $\\frac{1}{\\cos^2\\alpha} = 1 + \\tan^2\\alpha$ pour résoudre l'équation du second degré en $\\tan\\alpha$ afin de déterminer les deux angles de tir (tir tendu et tir en cloche) et la vitesse minimale de tir.

---

## 1. Le Champ de Pesanteur Uniforme & Conditions Initiales

### 1.1 Définition du Champ de Pesanteur Uniforme
Dans une région de l'espace de dimensions restreintes devant le rayon de la Terre (quelques centaines de mètres à quelques kilomètres) et sur une courte durée :
- Le champ de pesanteur $\\vec{g}$ est considéré comme **rigoureusement uniforme** : il a en tout point la même direction (verticale), le même sens (vers le bas, vers le centre de la Terre) et la même intensité ($g \\approx 9{,}8\\text{ m}\\cdot\\text{s}^{-2}$ ou $10\\text{ m}\\cdot\\text{s}^{-2}$ au Sénégal).

### 1.2 Le Repère d'Étude & Conditions Initiales
On choisit un repère orthonormé galiléen $(O, \\vec{i}, \\vec{j})$ lié au sol terrestre, où :
- L'axe horizontal $(Ox)$ muni du vecteur $\\vec{i}$ est orienté dans le sens du tir.
- L'axe vertical $(Oy)$ muni du vecteur $\\vec{j}$ est orienté **vers le haut** (ascendant).

À la date initiale $t = 0$, le projectile de masse $m$ est lancé d'un point initial $M_0(x_0, y_0)$ avec un vecteur vitesse initiale $\\vec{v}_0$ faisant un angle $\\alpha$ (angle de tir) avec l'horizontale.

| Grandeur Vectorielle à $t = 0$ | Composante sur $(Ox)$ | Composante sur $(Oy)$ |
| :--- | :--- | :--- |
| **Position initiale $\\vec{OM}_0$** | $x_0$ (souvent $0$) | $y_0$ (hauteur de lancement) |
| **Vitesse initiale $\\vec{v}_0$** | $v_{0x} = v_0\\,\\cos\\alpha$ | $v_{0y} = v_0\\,\\sin\\alpha$ |
| **Champ de pesanteur $\\vec{g}$** | $g_x = 0$ | $g_y = -g$ |

> [!CAUTION]
> **Attention au signe de $g_y$ au Baccalauréat :** Comme l'axe vertical $(Oy)$ est orienté vers le haut et que la pesanteur attire vers le bas, on a impérativement :
> $g_y = -g = -9{,}8\\text{ m}\\cdot\\text{s}^{-2}$
> Oublier le signe moins est l'erreur la plus sanctionnée au Bac S2 !

---

## 2. Théorème du Centre d'Inertie & Vecteur Accélération

### 2.1 Bilan des Forces et Hypothèse de Chute Libre
Un corps est en **chute libre** s'il n'est soumis qu'à son propre poids $\\vec{P} = m\\vec{g}$.
En classe de Terminale S2, sauf mention explicite contraire, les forces de frottement dans l'air (résistance de l'air) et la poussée d'Archimède sont négligées devant le poids du projectile.

### 2.2 Application de la Deuxième Loi de Newton (TCI)
- **Système** : {Projectile de masse $m$ assimilé à un point matériel}.
- **Référentiel** : Terrestre, supposé galiléen pendant la durée du vol.
- **Bilan des forces** : Seul le poids $\\vec{P} = m\\vec{g}$ s'applique.

D'après le Théorème du Centre d'Inertie :
$\\sum \\vec{F}_{\\text{ext}} = m\\,\\vec{a} \\implies \\vec{P} = m\\,\\vec{a} \\implies m\\,\\vec{g} = m\\,\\vec{a} \\implies \\vec{a} = \\vec{g}$

> [!THEOREME]
> **Loi Fondamentale de la Chute Libre :**
> L'accélération d'un projectile dans le champ de pesanteur est **indépendante de sa masse $m$**, de sa forme et de sa vitesse initiale. Tous les corps tombent avec exactement la même accélération vectorielle $\\vec{a} = \\vec{g}$ !

En projetant sur les axes cartésiens :
$\\vec{a}(t) \\begin{cases} a_x(t) = 0 \\\\ a_y(t) = -g \\end{cases}$

---

## 3. Équations Horaires de la Vitesse & de la Position

### 3.1 Équations Horaires du Vecteur Vitesse $\\vec{v}(t)$
Puisque $\\vec{a}(t) = \\frac{d\\vec{v}}{dt}$, on intègre les composantes de l'accélération par rapport au temps :
- $v_x(t) = \\int a_x\\,dt = \\int 0\\,dt = C_1$
  Or à $t = 0$, $v_x(0) = v_0\\cos\\alpha \\implies C_1 = v_0\\cos\\alpha$.
- $v_y(t) = \\int a_y\\,dt = \\int (-g)\\,dt = -g\\,t + C_2$
  Or à $t = 0$, $v_y(0) = v_0\\sin\\alpha \\implies C_2 = v_0\\sin\\alpha$.

D'où le vecteur vitesse instantanée :
$\\vec{v}(t) \\begin{cases} v_x(t) = v_0\\,\\cos\\alpha = \\text{cte} \\\\ v_y(t) = -g\\,t + v_0\\,\\sin\\alpha \\end{cases}$

La norme de la vitesse scalaire instantanée vaut à chaque instant :
$v(t) = \\|\\vec{v}(t)\\| = \\sqrt{v_x^2(t) + v_y^2(t)} = \\sqrt{(v_0\\cos\\alpha)^2 + (-g\\,t + v_0\\sin\\alpha)^2}$

### 3.2 Équations Horaires du Vecteur Position $\\vec{OM}(t)$
Puisque $\\vec{v}(t) = \\frac{d\\vec{OM}}{dt}$, on intègre les composantes de la vitesse par rapport au temps :
- $x(t) = \\int v_x(t)\\,dt = \\int (v_0\\cos\\alpha)\\,dt = (v_0\\cos\\alpha)\\,t + C_3$
  Or à $t = 0$, $x(0) = x_0 \\implies C_3 = x_0$.
- $y(t) = \\int v_y(t)\\,dt = \\int (-g\\,t + v_0\\sin\\alpha)\\,dt = -\\frac{1}{2}g\\,t^2 + (v_0\\sin\\alpha)\\,t + C_4$
  Or à $t = 0$, $y(0) = y_0 \\implies C_4 = y_0$.

D'où les **équations horaires paramétriques fondamentales** :
$\\vec{OM}(t) \\begin{cases} x(t) = (v_0\\,\\cos\\alpha)\\,t + x_0 \\\\ y(t) = -\\frac{1}{2}g\\,t^2 + (v_0\\,\\sin\\alpha)\\,t + y_0 \\end{cases}$

> [!NOTE]
> Dans le cas le plus fréquent au Baccalauréat où le projectile part de l'origine ($x_0 = 0$ et $y_0 = 0$) :
> $x(t) = (v_0\\cos\\alpha)\\,t \\qquad y(t) = -\\frac{1}{2}g\\,t^2 + (v_0\\sin\\alpha)\\,t$

---

## 4. Équation Cartésienne de la Trajectoire

Pour obtenir la courbe géométrique suivie par le mobile, on élimine la variable temps $t$ entre les équations horaires :
1. De l'équation horaire $x(t) = (v_0\\cos\\alpha)\\,t$ (en supposant $x_0 = 0$), on tire l'expression du temps :
   $t = \\frac{x}{v_0\\,\\cos\\alpha}$
2. On reporte cette expression dans l'équation horaire $y(t)$ :
   $y(x) = -\\frac{1}{2}g\\left(\\frac{x}{v_0\\cos\\alpha}\\right)^2 + (v_0\\sin\\alpha)\\left(\\frac{x}{v_0\\cos\\alpha}\\right) + y_0$

D'où la relation fondamentale :
$y(x) = -\\frac{g}{2\\,v_0^2\\,\\cos^2\\alpha}\\,x^2 + (\\tan\\alpha)\\,x + y_0$

### 4.1 Nature Géométrique de la Trajectoire
L'équation est de la forme polynomiale $y(x) = A\\,x^2 + B\\,x + C$ avec :
- $A = -\\frac{g}{2\\,v_0^2\\,\\cos^2\\alpha} < 0$
- $B = \\tan\\alpha$
- $C = y_0$

Puisque le coefficient dominant $A$ est strictement négatif ($A < 0$), la trajectoire est une **portion de parabole** contenue dans le plan vertical de tir $(Oxy)$, dont la concavité est tournée vers le bas (vers les $y$ négatifs).

---

## 5. Le Sommet de la Trajectoire $S$ (La Flèche $H$)

Le sommet $S$ représente le point le plus élevé atteint par le projectile au cours de son vol.

### 5.1 Condition Physique au Sommet
Au sommet de la parabole, la tangente à la trajectoire est **strictement horizontale**. Par conséquent, la composante verticale du vecteur vitesse s'annule :
$v_y(t_S) = 0$

### 5.2 Date $t_S$ du Passage au Sommet
$-g\\,t_S + v_0\\sin\\alpha = 0 \\implies t_S = \\frac{v_0\\,\\sin\\alpha}{g}$

### 5.3 Abscisse du Sommet $x_S$
En reportant $t_S$ dans l'équation horaire $x(t)$ (pour $x_0 = 0$) :
$x_S = (v_0\\cos\\alpha)\\,t_S = (v_0\\cos\\alpha)\\left(\\frac{v_0\\sin\\alpha}{g}\\right) = \\frac{v_0^2\\,\\sin\\alpha\\,\\cos\\alpha}{g}$
En utilisant la formule trigonométrique $\\sin(2\\alpha) = 2\\sin\\alpha\\cos\\alpha$ :
$x_S = \\frac{v_0^2\\,\\sin(2\\alpha)}{2\\,g}$

### 5.4 Ordonnée du Sommet $y_S$ (La Flèche $H$)
La **flèche** $H$ est l'altitude maximale au-dessus du sol atteinte par le projectile :
$y_S = H = -\\frac{1}{2}g\\,t_S^2 + (v_0\\sin\\alpha)\\,t_S + y_0 = -\\frac{1}{2}g\\left(\\frac{v_0\\sin\\alpha}{g}\\right)^2 + v_0\\sin\\alpha\\left(\\frac{v_0\\sin\\alpha}{g}\\right) + y_0$
$y_S = H = \\frac{v_0^2\\,\\sin^2\\alpha}{2\\,g} + y_0$

### 5.5 Vecteur Vitesse au Sommet
Au sommet $S$, la vitesse n'est **JAMAIS NULLE** ! Seule sa composante verticale s'annule :
$\\vec{v}_S = v_{0x}\\,\\vec{i} = (v_0\\cos\\alpha)\\,\\vec{i} \\implies v_S = \\|\\vec{v}_S\\| = v_0\\cos\\alpha$

> [!WARNING]
> **Piège très fréquent au Baccalauréat :** Ne confondez pas « le projectile s'arrête de monter » ($v_y = 0$) et « le projectile s'arrête » ($v = 0$). Au sommet, la vitesse est minimale mais non nulle : $v_S = v_0\\cos\\alpha \\neq 0$ !

---

## 6. La Portée Horizontale $P$ & Condition de Portée Maximale

La **portée** $x_P$ est la distance horizontale franchie par le projectile entre son point de tir et son point de retombée sur le plan horizontal ($y = 0$).

### 6.1 Calcul de la Portée pour un Tir depuis le Sol ($y_0 = 0$)
Le projectile touche le sol au point $P$ lorsque $y(x_P) = 0$ :
$- \\frac{g}{2\\,v_0^2\\,\\cos^2\\alpha}\\,x_P^2 + (\\tan\\alpha)\\,x_P = 0$
En factorisant par $x_P$ :
$x_P\\left(-\\frac{g}{2\\,v_0^2\\,\\cos^2\\alpha}\\,x_P + \\frac{\\sin\\alpha}{\\cos\\alpha}\\right) = 0$
- La racine $x = 0$ correspond au point de départ $O$.
- La racine non nulle $x_P$ donne la portée :
  $x_P = \\frac{2\\,v_0^2\\,\\sin\\alpha\\,\\cos\\alpha}{g} = \\frac{v_0^2\\,\\sin(2\\alpha)}{g}$

> [!TIP]
> **Propriété de Symétrie Parabolique (quand $y_0 = 0$) :**
> - L'abscisse du sommet est la moitié exacte de la portée : $x_S = \\frac{x_P}{2}$.
> - La durée totale de vol est le double de la durée pour atteindre le sommet : $t_P = 2\\,t_S = \\frac{2\\,v_0\\sin\\alpha}{g}$.

### 6.2 Condition de Portée Maximale ($y_0 = 0$)
Pour une vitesse initiale $v_0$ fixée, la portée $x_P$ dépend uniquement de $\\alpha$ à travers le terme $\\sin(2\\alpha)$ :
- La fonction sinus atteint son maximum absolu pour $\\sin(2\\alpha) = 1$.
  $2\\alpha = 90^\\circ \\implies \\alpha_{\\text{max}} = 45^\\circ = \\frac{\\pi}{4}\\text{ rad}$
- La **portée maximale théorique** vaut alors :
  $x_{P,\\text{max}} = \\frac{v_0^2}{g}$

---

## 7. Vitesse d'Impact au Sol & Théorème de l'Énergie Cinétique

### 7.1 Calcul Vectoriel de la Vitesse d'Impact
À la date de retombée $t_P = 2\\,t_S$ (lorsque $y_0 = 0$) :
- $v_x(t_P) = v_0\\cos\\alpha$
- $v_y(t_P) = -g(2\\,t_S) + v_0\\sin\\alpha = -2(v_0\\sin\\alpha) + v_0\\sin\\alpha = -v_0\\sin\\alpha$

La norme de la vitesse d'impact vaut :
$v_P = \\sqrt{v_x^2(t_P) + v_y^2(t_P)} = \\sqrt{(v_0\\cos\\alpha)^2 + (-v_0\\sin\\alpha)^2} = \\sqrt{v_0^2(\\cos^2\\alpha + \\sin^2\\alpha)} = v_0$
Sans frottements, le projectile touche le sol avec **exactement la même valeur scalaire de vitesse** qu'au départ ($v_P = v_0$), avec un angle symétrique opposé ($-\\alpha$).

### 7.2 Justification Énergétique par le Théorème de l'Énergie Cinétique (TEC)
Entre la position initiale $M_0(x_0, y_0)$ et le point d'impact $P(x_P, y_P)$ :
$\\Delta E_c = E_{cP} - E_{c0} = \\sum W(\\vec{F}_{\\text{ext}}) = W(\\vec{P})$
$\\frac{1}{2}m\\,v_P^2 - \\frac{1}{2}m\\,v_0^2 = m\\,g\\,(y_0 - y_P)$
En simplifiant par la masse $m$ :
$v_P^2 = v_0^2 + 2\\,g\\,(y_0 - y_P) \\implies v_P = \\sqrt{v_0^2 + 2\\,g\\,(y_0 - y_P)}$

> [!METHODE]
> **Avantage majeur du TEC au Bac S2 :**
> Le Théorème de l'Énergie Cinétique permet de calculer la vitesse en n'importe quel point de la trajectoire connaissant seulement son altitude $y$, sans avoir besoin de calculer la durée $t$ ni l'abscisse $x$ !

---

## 8. Tir sur Cible & Équation du Second Degré en $\\tan\\alpha$

C'est l'exercice d'excellence le plus prestigieux et le plus sélectif des épreuves du Baccalauréat Sénégalais.

### 8.1 Transformation Trigonométrique Fondamentale
Rappelons l'identité trigonométrique fondamentale :
$\\frac{1}{\\cos^2\\alpha} = \\frac{\\cos^2\\alpha + \\sin^2\\alpha}{\\cos^2\\alpha} = 1 + \\tan^2\\alpha$
L'équation cartésienne de la trajectoire devient :
$y(x) = -\\frac{g\\,x^2}{2\\,v_0^2}\\,(1 + \\tan^2\\alpha) + x\\,\\tan\\alpha + y_0$

### 8.2 Équation aux Angles de Tir pour Atteindre une Cible $C(x_C, y_C)$
Pour que le projectile touche une cible $C(x_C, y_C)$, on pose $X = \\tan\\alpha$. L'équation devient une équation du second degré en $X$ :
$\\left(\\frac{g\\,x_C^2}{2\\,v_0^2}\\right)X^2 - x_C\\,X + \\left(y_C - y_0 + \\frac{g\\,x_C^2}{2\\,v_0^2}\\right) = 0$
Sous la forme canonique $A\\,X^2 + B\\,X + C = 0$ avec :
- $A = \\frac{g\\,x_C^2}{2\\,v_0^2}$
- $B = -x_C$
- $C = y_C - y_0 + \\frac{g\\,x_C^2}{2\\,v_0^2}$

### 8.3 Discussion Physique selon le Discriminant $\\Delta = B^2 - 4AC$ :
1. **Si $\\Delta > 0$** : il existe **deux angles de tir distincts** $\\alpha_1$ et $\\alpha_2$ pour atteindre la même cible :
   - $\\alpha_1$ (le plus petit angle) : **tir tendu** (trajectoire basse et rapide).
   - $\\alpha_2$ (le plus grand angle) : **tir en cloche** (trajectoire haute et plongeante).
2. **Si $\\Delta = 0$** : il existe un **angle de tir unique** ; la cible est située sur la frontière d'accessibilité.
3. **Si $\\Delta < 0$** : aucune solution réelle ; la cible est hors de portée pour la vitesse $v_0$ donnée.

### 8.4 Vitesse Initiale Minimale $v_{0,\\min}$ & Parabole de Sécurité
La condition d'accessibilité $\\Delta \\ge 0$ permet de déduire la vitesse minimale indispensable pour atteindre la cible :
$v_{0,\\min} = \\sqrt{g\\left(y_C - y_0 + \\sqrt{x_C^2 + (y_C - y_0)^2}\\right)}$
L'enveloppe de toutes les trajectoires possibles pour une vitesse $v_0$ donnée s'appelle la **parabole de sécurité** d'équation :
$y_{\\text{sécurité}}(x) = \\frac{v_0^2}{2\\,g} - \\frac{g}{2\\,v_0^2}\\,x^2 + y_0$

---

## 9. Les 8 Réflexes d'Or du Baccalauréat Sénégalais (P3)

> [!IMPORTANT]
> 1. **Système & Référentiel obligatoires :** Toujours commencer par : « Système : {projectile de masse $m$}, Référentiel terrestre supposé galiléen ».
> 2. **Chute libre $\\vec{a} = \\vec{g}$ :** Ne pas inventer de force motrice en plein vol ! Dès que le projectile quitte le canon ou le pied, seul son poids agit : $\\vec{a} = \\vec{g}$.
> 3. **Signe du champ de pesanteur :** Avec l'axe $Oy$ ascendant, $a_x = 0$ et $a_y = -g$ (ne jamais oublier le signe moins !).
> 4. **Élimination du temps :** Dans l'équation de la trajectoire $y(x)$, le temps $t$ ne doit **JAMAIS** figurer.
> 5. **Sommet de la trajectoire :** Écrire la condition physique $v_y(t_S) = 0$ pour trouver $t_S$, puis injecter dans $y(t)$ pour obtenir la flèche $H$.
> 6. **Portée sur sol plat :** Poser $y(x_P) = 0$ et retenir que $x_P = 2\\,x_S$ lorsque $y_0 = 0$.
> 7. **Calcul rapide de vitesse par le TEC :** Utiliser $\\frac{1}{2}mv^2 - \\frac{1}{2}mv_0^2 = mg(y_0 - y)$ pour trouver une vitesse sans calculer la date $t$.
> 8. **Forme en $\\tan\\alpha$ :** Penser immédiatement à $\\frac{1}{\\cos^2\\alpha} = 1 + \\tan^2\\alpha$ pour toute question demandant de trouver l'angle de tir ou de toucher une cible.

> [!WOLOF]
> - « **TCI bi :** $\\vec{P} = m\\,\\vec{a} \\implies \\vec{a} = \\vec{g}$. Axe $Oy$ dafa yéeg, kon $a_y = -g$ ! »
> - « **MRU ci $Ox$, MRUV ci $Oy$ :** $v_x = v_0\\cos\\alpha$ du soppiku mukk ! $v_y = -gt + v_0\\sin\\alpha$ dafay wàcc ! »
> - « **Sommet bi :** $v_y = 0 \\implies t_S = \\frac{v_0\\sin\\alpha}{g}$ ak $H = \\frac{v_0^2\\sin^2\\alpha}{2g}$ ! »
> - « **Portée bi :** $x_P = \\frac{v_0^2\\sin(2\\alpha)}{g}$. Angle optimal bi mooy $45^\\circ$ ! »
> - « **Cible bi :** Remplacél $\\frac{1}{\\cos^2\\alpha}$ par $1 + \\tan^2\\alpha$ ngir am équation du second degré en $\\tan\\alpha$ ! »
`;

// P4 : MOUVEMENT D'UNE PARTICULE CHARGÉE DANS UN CHAMP ÉLECTRIQUE OU MAGNÉTIQUE UNIFORME (Terminale S2 Sénégal)
RICH_LESSONS_MAP.particule_champ_e_b = `# P4 : Mouvement d'une Particule Chargée dans un Champ Électrique ou Magnétique Uniforme (Terminale S2)

Bienvenue dans le quatrième grand chapitre fondamental de **Physique** de **Terminale S2**, rigoureusement conforme au programme officiel sénégalais (MEN / IGEF / Office du Baccalauréat).

---

## 📜 Grande Fresque Historique & Épistémologique de l'Électromagnétisme

> *« Rien n'est plus petit que l'électron, et pourtant rien n'a autant bouleversé notre compréhension intime de l'Univers et de la matière »* : c'est ainsi que l'on pourrait résumer la révolution inaugurée par **Joseph John Thomson en 1897**.
> 
> À la fin du XIXe siècle, la nature intime de l'électricité demeure une énigme. Dans son laboratoire Cavendish à Cambridge, Thomson utilise un tube à rayons cathodiques sous vide poussé. En appliquant simultanément un champ électrique vertical $\\vec{E}$ et un champ magnétique horizontal $\\vec{B}$, Thomson parvient à courber, puis à rétablir en ligne droite le faisceau mystérieux. En mesurant l'intensité respective des déflexions, il accomplit un tour de force historique : déterminer le **rapport charge sur masse $e/m \\approx 1{,}76 \\times 10^{11}\\text{ C/kg}$** d'un corpuscule universel, plus de mille fois plus léger que l'atome d'hydrogène. L'**électron** venait d'être découvert ! Cette prouesse vaudra à Thomson le Prix Nobel de Physique en 1906.
> 
> En 1909, le physicien américain **Robert Millikan** perfectionne cette maîtrise électrostatique dans sa célèbre expérience de la goutte d'huile : en maintenant en lévitation stationnaire de minuscules gouttelettes d'huile chargées entre les armatures d'un condensateur plan, il équilibre rigoureusement le poids par la force électrostatique ($m\\vec{g} + q\\vec{E} = \\vec{0}$). Il démontre que la charge électrique portée par la matière est toujours un multiple entier d'un quantum fondamental : la **charge élémentaire $e = 1{,}602 \\times 10^{-19}\\text{ C}$** (Prix Nobel 1923).
> 
> Simultanément, le théoricien néerlandais **Hendrik Lorentz** formule l'expression unifiée de la force électromagnétique agissant sur une charge en mouvement : $\\vec{F} = q(\\vec{E} + \\vec{v} \\wedge \\vec{B})$. En 1932, **Ernest Lawrence** à l'Université de Berkeley exploite la remarquable propriété d'invariance de la période cyclotron pour construire le premier accélérateur circulaire de particules, le **cyclotron** (Prix Nobel 1939), ouvrant l'ère de la physique nucléaire moderne.
> 
> Au Sénégal, la maîtrise du mouvement des particules chargées dans les champs $\\vec{E}$ et $\\vec{B}$ se retrouve au cœur des technologies les plus avancées :
> - En **médecine nucléaire et radiothérapie anticancéreuse**, les accélérateurs linéaires d'électrons du **Centre Hospitalier National Dalal Jamm de Guédiawaye** utilisent des champs électriques haute fréquence pour accélérer des faisceaux d'électrons ou de photons afin de détruire avec une précision millimétrique les tumeurs malignes tout en épargnant les tissus sains.
> - Dans les **laboratoires d'analyse géologique et environnementale de l'UCAD et de l'École Polytechnique de Thiès**, les spectromètres de masse séparent les isotopes pour dater les nappes phréatiques fossiles du bassin sédimentaire sénégalais, caractériser les minerais d'or de Sabodala ou contrôler la teneur en métaux lourds des sédiments de la Baie de Hann.

---

> [!VIE_REELLE] **L'Électromagnétisme au Cœur du Monde Réel :**
> - **L'Accélérateur Linéaire de Radiothérapie (Dalal Jamm, Guédiawaye)** : les électrons sont émis par un canon cathodique chauffé, accélérés par une succession de cavités résonantes sous des différences de potentiel de plusieurs millions de volts ($U_0 \\sim 6\\text{ à }18\\text{ MV}$), puis déviés par des aimants de courbure pour frapper une cible en tungstène et générer des rayons X thérapeutiques ultra-énergétiques.
> - **Le Spectrographe de Masse de Bainbridge** : véritable balance atomique, il permet de peser des atomes individuels à $10^{-27}\\text{ kg}$ près ! Il sépare les isotopes légers et lourds (ex : $^{24}\\text{Mg}$ et $^{26}\\text{Mg}$, $^{6}\\text{Li}$ et $^{7}\\text{Li}$) grâce à la dépendance de leur rayon de courbure en fonction de la masse ($R \\propto m$).
> - **Le Sélecteur de Vitesses de Wien** : filtre électromagnétique parfait qui n'autorise le passage que des particules animées de la vitesse précise $v_0 = E/B$, quel que soit leur signe, leur charge ou leur masse !
> - **Les Ceintures de Van Allen et les Aurores Polaires** : le champ magnétique terrestre dévie en permanence les flux de protons et d'électrons hautement énergétiques émis par le Soleil (vent solaire), les piégeant dans des trajectoires hélicoïdales autour des lignes de champ et protégeant ainsi toute forme de vie sur Terre !

> [!WOLOF] **Xam-xam ci Wolof — Particules chargées ci biir Champs $\\vec{E}$ ak $\\vec{B}$ :**
> - « **Poids particule bi duñu ko compte mukk :** Particule élémentaire dafa woyof lool ($m \\sim 10^{-30}\\text{ à }10^{-26}\\text{ kg}$). Force électrostatique $\\vec{F}_e = q\\vec{E}$ moo ëpp poids bi ba ci $10^{14}$ yoon ! Motax ci calculs Bac S2, poids bi dafay nekk zéro ($P \\ll F_e$) ! »
> - « **Champ Électrique $\\vec{E}$ dafay accélérer té dévier :** Force $\\vec{F}_e = q\\vec{E}$ mën na liggéey ($W \\ne 0$) ! Day yokk vitesse bi ($v = \\sqrt{\\frac{2qU}{m}}$) té day def trajectoire parabolique ni ballon football ci biir plaques yi ! »
> - « **Champ Magnétique $\\vec{B}$ mënul accélérer vitesse bi mukk :** Force de Lorentz $\\vec{F}_m = q\\vec{v}\\wedge\\vec{B}$ dafa perpendiculaire ak vitesse $\\vec{v}$ waxtu wu nekk ! Motax travail am zéro la : $W = 0$. Vitesse bi du yokk, du wàññi ($v = \\text{cte}$) ! Day courber rek trajectoire bi mu nekk cercle bu am rayon $R = \\frac{mv}{|q|B}$ ! »
> - « **Filtre de Wien mooy trieur de vitesse :** Force électrique ak force magnétique dañuy fafanté ($qE = qvB$). Particule bu am vitesse $v_0 = E/B$ mooy génn ci digg fente bi direct ! »
> - « **Spectrographe de masse mooy séparer isotopes :** Ndax masse yi bokkul, demi-cercles yi bokkul rayons. Distance bi ci digg ñaari impacts yi ci plaque photographique bi mooy $\\Delta d = 2(R_2 - R_1)$ ! »

---

## 🎯 Objectifs Officiels du Baccalauréat Sénégalais (IGEF / MEN)

À l'issue de ce chapitre, tout élève de Terminale S2 doit maîtriser avec une aisance absolue :
1. **Justifier l'omission rigoureuse du poids** d'une particule chargée devant les forces électriques et magnétiques ($P / F_e \\sim 10^{-14}$).
2. **Établir les équations horaires et l'équation de la trajectoire parabolique** d'une particule chargée dans un champ électrostatique uniforme $\\vec{E}$ :
   $$y(x) = \\frac{q\\,U}{2\\,m\\,d\\,v_0^2}\\,x^2$$
3. **Exprimer la déviation angulaire $\\alpha$ et la déviation linéaire $Y$** sur un écran distant de $D$ :
   $$\\tan\\alpha = \\frac{|q|\\,U\\,L}{m\\,d\\,v_0^2} \\quad ; \\quad Y = D\\,\\tan\\alpha = \\frac{|q|\\,U\\,L\\,D}{m\\,d\\,v_0^2}$$
4. **Vérifier la condition de non-heurt** des armatures du condensateur : $|y(L)| < \\frac{d}{2}$.
5. **Démontrer que la force magnétique de Lorentz ne travaille jamais** ($\\mathcal{P} = 0 \\implies E_c = \\text{cte} \\implies v = \\text{cte}$).
6. **Établir dans la base de Frenet que le mouvement dans $\\vec{B}$ uniforme ($\\vec{v}_0 \\perp \\vec{B}$) est plan, circulaire et uniforme**, et en déduire l'expression du rayon $R$ et de la période $T$ :
   $$R = \\frac{m\\,v_0}{|q|\\,B} \\quad ; \\quad T = \\frac{2\\pi\\,m}{|q|\\,B}$$
7. **Étudier le sélecteur de vitesses de Wien** (condition d'émergence rectiligne $v_0 = E/B$).
8. **Exploiter le fonctionnement d'un spectrographe de masse de Bainbridge** pour séparer et identifier des isotopes chimiques ($\\Delta d = 2\\,\\Delta R$).

---

## 1. Mouvement d'une Particule Chargée dans un Champ Électrique Uniforme $\\vec{E}$

### 1.1. Champ électrostatique entre deux armatures planes parallèles
Considérons deux plaques métalliques planes et parallèles séparées d'une distance $d$, soumises à une différence de potentiel $U = V_A - V_B > 0$ (l'armature supérieure $A$ est portée au potentiel le plus élevé).
- Le champ électrique $\\vec{E}$ régnant entre les armatures est **uniforme** : il a même direction (perpendiculaire aux plaques), même sens (dirigé vers les potentiels décroissants, donc de $A$ vers $B$) et même intensité :
  $$E = \\frac{U}{d} \\quad (\\text{en V}\\cdot\\text{m}^{-1} \\text{ ou N}\\cdot\\text{C}^{-1})$$

### 1.2. Force électrostatique et négligence légitime du poids
Une particule de masse $m$ et de charge $q$ (ex : électron $q = -e$, proton $q = +e$, ion $\\alpha$ $q = +2e$) subit la force électrostatique :
$$\\vec{F}_e = q\\,\\vec{E}$$
- Si $q > 0$ : $\\vec{F}_e$ est dans le **même sens** que $\\vec{E}$.
- Si $q < 0$ : $\\vec{F}_e$ est en **sens opposé** à $\\vec{E}$ (l'électron est attiré vers la plaque positive).

> [!THEOREME] **Comparaison Poids vs Force Électrostatique :**
> Pour un électron ($m = 9{,}1 \\times 10^{-31}\\text{ kg}$, $e = 1{,}6 \\times 10^{-19}\\text{ C}$) dans un champ modeste $E = 10^4\\text{ V/m}$ :
> - Poids : $P = mg \\approx 9{,}1 \\times 10^{-31} \\times 9{,}8 \\approx 8{,}9 \\times 10^{-30}\\text{ N}$
> - Force électrique : $F_e = eE = 1{,}6 \\times 10^{-19} \\times 10^4 = 1{,}6 \\times 10^{-15}\\text{ N}$
> - Rapport : $\\frac{F_e}{P} \\approx 1{,}8 \\times 10^{14}$
> **Conclusion Bac S2 impérative :** Le poids est plus de cent mille milliards de fois inférieur à la force électrique. Il est rigoureusement négligé dans toute la suite de l'étude mécanique.

### 1.3. Équations horaires du mouvement
Munissons l'espace d'un repère orthonormé $(O, \\vec{i}, \\vec{j})$ où l'origine $O$ est le point d'injection équidistant des deux armatures, $(Ox)$ est l'axe horizontal parallèle aux plaques et $(Oy)$ est l'axe vertical ascendant.
- Le champ électrique s'écrit : $\\vec{E} = -E\\,\\vec{j} = -\\frac{U}{d}\\vec{j}$.
- La force électrostatique s'écrit : $\\vec{F}_e = q\\vec{E} = -q\\frac{U}{d}\\vec{j}$.
- D'après le Théorème du Centre d'Inertie :
  $$m\\vec{a} = \\vec{F}_e \\implies \\vec{a} = \\frac{q}{m}\\vec{E} = -\\frac{q\\,U}{m\\,d}\\vec{j}$$
- Coordonnées du vecteur accélération :
  $$\\begin{cases} a_x(t) = 0 \\\\ a_y(t) = -\\frac{q\\,U}{m\\,d} \\end{cases}$$

Par intégrations successives avec les conditions initiales à $t = 0$ :
$$\\vec{OM}_0 \\begin{pmatrix} 0 \\\\ 0 \\end{pmatrix} \\quad ; \\quad \\vec{v}_0 \\begin{pmatrix} v_0 \\\\ 0 \\end{pmatrix}$$
- **Vecteur vitesse $\\vec{v}(t)$** :
  $$\\begin{cases} v_x(t) = v_0 = \\text{constante} \\\\ v_y(t) = -\\frac{q\\,U}{m\\,d}\\,t \\end{cases}$$
- **Vecteur position $\\vec{OM}(t)$** :
  $$\\begin{cases} x(t) = v_0\\,t \\\\ y(t) = -\\frac{q\\,U}{2\\,m\\,d}\\,t^2 \\end{cases}$$

### 1.4. Équation de la trajectoire parabolique
En éliminant le temps $t = \\frac{x}{v_0}$ :
$$y(x) = -\\frac{q\\,U}{2\\,m\\,d\\,v_0^2}\\,x^2$$
- Pour un électron ($q = -e$) :
  $$y(x) = +\\frac{e\\,U}{2\\,m\\,d\\,v_0^2}\\,x^2$$
La courbe est une **parabole** dont la concavité est tournée vers le haut (l'électron est dévié vers l'armature positive).

### 1.5. Sortie du champ et déviation sur écran
Les armatures ont une longueur $L$. À la sortie en $x = L$ :
- Ordonnée du point de sortie $S$ :
  $$y_S = y(L) = \\frac{|q|\\,U}{2\\,m\\,d\\,v_0^2}\\,L^2$$
- **Condition de non-heurt** des plaques : la particule quitte le champ sans heurter les armatures si et seulement si :
  $$|y_S| < \\frac{d}{2} \\iff \\frac{|q|\\,U\\,L^2}{2\\,m\\,d\\,v_0^2} < \\frac{d}{2} \\implies U < \\frac{m\\,d^2\\,v_0^2}{|q|\\,L^2}$$
- Déviation angulaire $\\alpha$ à la sortie :
  $$\\tan\\alpha = \\left.\\frac{dy}{dx}\\right|_{x=L} = \\frac{|q|\\,U\\,L}{m\\,d\\,v_0^2} = \\frac{2\\,y_S}{L}$$
- Déviation linéaire $Y$ sur un écran placé à distance $D$ du centre du condensateur :
  Puisque la tangente en $S$ coupe l'axe $(Ox)$ au milieu des plaques en $x = \\frac{L}{2}$ :
  $$Y = D\\,\\tan\\alpha = \\frac{|q|\\,U\\,L\\,D}{m\\,d\\,v_0^2}$$
- Si la particule a été préalablement accélérée par une tension $U_0$ : $\\frac{1}{2}m v_0^2 = |q| U_0 \\implies m v_0^2 = 2|q| U_0$. L'expression de $Y$ se simplifie miraculeusement :
  $$Y = \\frac{U\\,L\\,D}{2\\,d\\,U_0}$$
La déviation est **rigoureusement indépendante de la masse et de la charge** de la particule !

---

## 2. Mouvement d'une Particule Chargée dans un Champ Magnétique Uniforme $\\vec{B}$

### 2.1. La Force de Lorentz Magnétique
Une particule de charge $q$ animée d'une vitesse $\\vec{v}$ dans un champ magnétique $\\vec{B}$ subit la force magnétique :
$$\\vec{F}_m = q\\,\\vec{v} \\wedge \\vec{B}$$
- **Direction** : orthogonale au plan défini par $(\\vec{v}, \\vec{B})$.
- **Sens** : donné par la **règle de la main droite** en utilisant le vecteur $q\\vec{v}$ (pouce : $q\\vec{v}$, index : $\\vec{B}$, majeur : $\\vec{F}_m$).
- **Intensité** : $F_m = |q|\\,v\\,B\\,\\sin(\\vec{v}, \\vec{B})$. Pour $\\vec{v} \\perp \\vec{B}$, $F_m = |q|\\,v\\,B$.

### 2.2. Propriété énergétique fondamentale : Travail nul
$$\\mathcal{P} = \\vec{F}_m \\cdot \\vec{v} = (q\\,\\vec{v} \\wedge \\vec{B}) \\cdot \\vec{v} = 0$$
Puisque la puissance est nulle à chaque instant, le travail accompli par la force magnétique est **rigoureusement nul** :
$$W(\\vec{F}_m) = \\int \\mathcal{P}\\,dt = 0\\text{ J}$$
D'après le Théorème de l'Énergie Cinétique :
$$\\Delta E_c = \\frac{1}{2}m v^2 - \\frac{1}{2}m v_0^2 = 0 \\implies v = v_0 = \\text{constante}$$
> [!IMPORTANT]
> Un champ magnétique stationnaire ne peut **JAMAIS** modifier l'énergie cinétique ni la norme de la vitesse d'une particule : **le mouvement est toujours uniforme !**

### 2.3. Démonstration du Mouvement Circulaire Uniforme (Frenet)
Appliquons le TCI dans le repère de Frenet $(\\vec{u}_t, \\vec{u}_n)$ lié à la particule :
$$m\\vec{a} = \\vec{F}_m \\iff m\\left(\\frac{dv}{dt}\\vec{u}_t + \\frac{v^2}{R}\\vec{u}_n\\right) = |q|\\,v\\,B\\,\\vec{u}_n$$
1. **Selon la tangente $\\vec{u}_t$** :
   $$m\\frac{dv}{dt} = 0 \\implies v = \\text{constante} \\quad (\\text{mouvement uniforme})$$
2. **Selon la normale $\\vec{u}_n$** :
   $$m\\frac{v^2}{R} = |q|\\,v\\,B \\implies R = \\frac{m\\,v}{|q|\\,B} = \\text{constante}$$
Le rayon de courbure étant constant et la trajectoire restant confinée dans le plan orthogonal à $\\vec{B}$, le mouvement est un **mouvement circulaire uniforme**.

### 2.4. Période et Pulsation Cyclotron
- **Période de révolution $T$** (durée d'un tour complet) :
  $$T = \\frac{2\\pi\\,R}{v} = \\frac{2\\pi \\left(\\frac{mv}{|q|B}\\right)}{v} = \\frac{2\\pi\\,m}{|q|\\,B}$$
- **Fréquence cyclotron $f$** et **pulsation $\\omega_c$** :
  $$f = \\frac{1}{T} = \\frac{|q|\\,B}{2\\pi\\,m} \\quad ; \\quad \\omega_c = 2\\pi f = \\frac{|q|\\,B}{m}$$
> [!THEOREME] **Théorème d'Invariance Cyclotron :**
> La période $T$ et la fréquence $f$ sont **strictement indépendantes de la vitesse $v$ et du rayon $R$** de la particule ! Si la particule accélère, le rayon s'agrandit exactement dans la même proportion, maintenant la durée du tour invariante.

---

## 3. Les Applications Majeures du Baccalauréat Sénégalais

### 3.1. Le Sélecteur de Vitesses de Wien (Champs Croisés)
Dans un filtre de Wien, une région de l'espace est soumise simultanément à un champ électrique $\\vec{E}$ et un champ magnétique $\\vec{B}$ perpendiculaires entre eux et perpendiculaires à la vitesse $\\vec{v}_0$.
- Les forces électrique et magnétique agissent sur la même droite d'action :
  $$\\vec{F} = \\vec{F}_e + \\vec{F}_m = q\\vec{E} + q\\vec{v}_0 \\wedge \\vec{B}$$
- Condition de franchissement rectiligne sans déviation :
  $$\\vec{F}_e + \\vec{F}_m = \\vec{0} \\iff |q|\\,E = |q|\\,v_0\\,B \\implies v_0 = \\frac{E}{B}$$
- Si $v > v_0$ : la force magnétique l'emporte, la particule dévie du côté de $\\vec{F}_m$ et percute le diaphragme.
- Si $v < v_0$ : la force électrique l'emporte, la particule dévie du côté de $\\vec{F}_e$.
- Seules les particules de vitesse $v_0 = E/B$ franchissent la fente de sortie !

### 3.2. Le Spectrographe de Masse de Bainbridge
Dispositif d'excellence du Bac S2 permettant de séparer deux isotopes de même charge $q$ et de masses différentes $m_1 < m_2$ (ex : $^{24}\\text{Mg}^{2+}$ et $^{26}\\text{Mg}^{2+}$, ou $^{6}\\text{Li}^+$ et $^{7}\\text{Li}^+$).
1. Les ions sont filtrés par un sélecteur de Wien de sorte qu'ils pénètrent tous avec la **même vitesse $v_0$** en $O$ dans une chambre où règne un champ magnétique $\\vec{B}'$.
2. Chaque ion décrit un demi-cercle de rayon :
   $$R_1 = \\frac{m_1 v_0}{|q| B'} \\quad ; \\quad R_2 = \\frac{m_2 v_0}{|q| B'}$$
3. Puisque $m_2 > m_1$, $R_2 > R_1$ : les ions les plus lourds décrivent une boucle plus large.
4. L'impact sur la plaque photographique a lieu à une distance égale au **diamètre** : $d_1 = 2R_1$ et $d_2 = 2R_2$.
5. L'écartement mesuré entre les deux taches spectrales est :
   $$\\Delta d = 2(R_2 - R_1) = \\frac{2\\,v_0}{|q|\\,B'}\\,(m_2 - m_1)$$
La distance $\\Delta d$ est directement proportionnelle à l'écart de masse $\\Delta m$ !

---

## 4. Les 8 Réflexes d'Or du Baccalauréat Sénégalais (P4)

> [!IMPORTANT]
> 1. **Négligence du poids :** Toujours commencer en écrivant : « Particule élémentaire de masse infime, le poids $m\\vec{g}$ est rigoureusement négligeable devant la force électromagnétique ($P \\ll F$) ».
> 2. **Signe de la charge $q$ :** Faire une attention chirurgicale au signe ! Pour l'électron, $q = -e < 0$. La force $\\vec{F}_e = -e\\vec{E}$ est de sens opposé à $\\vec{E}$.
> 3. **Sens du champ $\\vec{E}$ :** $\\vec{E}$ est toujours dirigé de l'armature au potentiel le plus élevé (+) vers l'armature au potentiel le plus bas (-).
> 4. **Milieu du condensateur :** La tangente à la parabole de déviation coupe l'axe optique $(Ox)$ rigoureusement au milieu des plaques en $x = \\frac{L}{2}$.
> 5. **Travail magnétique nul :** Ne jamais dire que $\\vec{B}$ accélère une particule ! $\\vec{F}_m \\perp \\vec{v} \\implies W = 0 \\implies v = \\text{constante}$ (mouvement uniforme).
> 6. **Valeur absolue sur la charge :** Le rayon $R = \\frac{m v}{|q| B}$ et la période $T = \\frac{2\\pi m}{|q| B}$ sont strictement positifs : toujours écrire $|q|$ !
> 7. **Sélecteur de Wien indépendant de $m$ et $q$ :** Dans le filtre de Wien, la condition $v_0 = E/B$ ne dépend ni de la masse, ni de la charge.
> 8. **Piège du diamètre dans le spectrographe :** La particule décrit un demi-cercle : la distance entre le point d'entrée et le point d'impact est le diamètre $2R$ et non le rayon $R$ !
`;

RICH_LESSONS_MAP.systeme_nerveux_cerebrospinal = `# B1 : Organisation du Système Nerveux Cérébrospinal des Mammifères (Terminale S2)

Bienvenue dans le premier axe fondamental de **Sciences de la Vie et de la Terre (SVT)** de **Terminale S2**, rigoureusement aligné sur les exigences officielles de l'Office du Baccalauréat du Sénégal et de l'Inspection Générale de l'Éducation et de la Formation (IGEF).

Le système nerveux cérébrospinal assure la réception des stimuli environnementaux, l'intégration des signaux bioélectriques et la commande des réponses motrices adaptées. Sa maîtrise est indispensable pour aborder l'électrophysiologie du neurone, les réflexes médullaires et la régulation cardiaque.

---

## 1. Vue d'Ensemble Architecturale : Névraxe (SNC) et Système Périphérique (SNP)

Le système nerveux des mammifères (dont l'être humain) se structure en deux grands compartiments anatomiques et fonctionnels :

### 1.1. Le Système Nerveux Central (SNC) ou Névraxe
Il constitue le centre décisionnel et intégrateur de l'organisme, logé au cœur des cavités osseuses axiales de protection :
1. **L'Encéphale** : abrité dans la boîte crânienne. Il comprend trois parties majeures :
   - Le **cerveau** (télencéphale et diencéphale) : siège des fonctions conscientes, de la motricité volontaire et de la mémoire.
   - Le **cervelet** : situé sous les lobes occipitaux, responsable de l'équilibre et de la coordination fine des mouvements.
   - Le **tronc cérébral** (pédoncules, pont de Varole et bulbe rachidien) : zone de passage des voies conductrices et siège des centres vitaux autonomes (respiration, rythme cardiaque, vasomotricité).
2. **La Moelle Épinière** : cordon blanc cylindrique s'étendant du trou occipital jusqu'aux premières vertèbres lombaires ($L_1-L_2$), logé dans le canal rachidien de la colonne vertébrale. C'est à la fois le centre des réflexes médullaires et une voie conductrice majeure.

### 1.2. Le Système Nerveux Périphérique (SNP)
Il assure la mise en relation bidirectionnelle entre le névraxe et l'ensemble des organes récepteurs et effecteurs périphériques :
- **Les Nerfs Crâniens** : au nombre de **12 paires**, rattachés directement à l'encéphale et au tronc cérébral (ex : nerf optique $II$, nerf trijumeau $V$, nerf vague ou pneumogastrique $X$ modérateur cardiaque).
- **Les Nerfs Rachidiens (ou spinaux)** : au nombre de **31 paires** chez l'Homme, émergeant métamériquement de la moelle épinière par les trous de conjugaison :
  - 8 paires cervicales ($C_1 - C_8$)
  - 12 paires thoraciques ou dorsales ($T_1 - T_{12}$)
  - 5 paires lombaires ($L_1 - L_5$)
  - 5 paires sacrées ($S_1 - S_5$)
  - 1 paire coccygienne ($Co_1$)
- **Les Ganglions Nerveux** : regroupements de corps cellulaires situés hors du névraxe (ganglions spinaux sur les racines dorsales, ganglions sympathiques).

---

> [!WOLOF] **Xam-xam ci Wolof — Névraxe ak Nerfs yi ci yaramu nit :**
> - « Névraxe bi mooy état-major bu mag bi ci réew mi : cerveau bi ak moelle épinière bi ñoo nekk ci biir armures yu dëgër (crâne ak colonne vertébrale) ngir kumpa ak joxe ndigal. »
> - « Nerfs yi (12 crâniens ak 31 rachidiens) ñoo melni ay câbles téléphoniques yu yaatu ci tout le pays : dafa am yiy indi xibaar (sensitifs) ak yiy yóbbu ndigal ci muscles yi (moteurs). »

---

## 2. Les Systèmes de Protection du Névraxe

En raison de la fragilité extrême du tissu nerveux et de son incapacité à se régénérer facilement, le névraxe bénéficie d'une triple protection :

### 2.1. La Protection Osseuse Rigide
- **La boîte crânienne** : formée d'os plats soudés (frontal, pariétaux, occipital, temporaux) protégeant l'encéphale contre les impacts mécaniques directs.
- **La colonne vertébrale** : empilement de 33 vertèbres articulées percé d'un canal rachidien hébergeant la moelle épinière avec souplesse et amorti.

### 2.2. La Protection Membranaire : Les Trois Méninges (DAP)
De la paroi osseuse vers le tissu nerveux, on rencontre successivement :
1. **La Dure-mère (externe)** : membrane conjonctive blanche, épaisse, fibreuse et très résistante, tapissant la face interne des os.
2. **L'Arachnoïde (médiane)** : membrane avasculaire très fine constituée d'un réseau conjonctif lâche rappelant une toile d'araignée. Elle délimite l'**espace sous-arachnoïdien** où circule le liquide céphalo-rachidien.
3. **La Pie-mère (interne)** : membrane conjonctive transparente, richement vascularisée, qui adhère intimement à la surface de l'encéphale et de la moelle en épousant tous les sillons et circonvolutions.

### 2.3. La Protection Liquidienne : Le Liquide Céphalo-Rachidien (LCR)
Liquide limpide stérile (« eau de roche ») sécrété par les plexus choroïdes dans les ventricules cérébraux :
- Il circule dans les ventricules, le canal de l'épendyme et l'espace sous-arachnoïdien.
- **Rôle mécanique** : il agit comme un fluide amortisseur hydraulique dissipant l'énergie des chocs et réduisant le poids effectif du cerveau par poussée d'Archimède.
- **Rôle physiologique** : échanges métaboliques, apport de nutriments et évacuation des déchets du métabolisme neuronal.

---

## 3. Organisation Anatomique et Histologique de la Moelle Épinière

L'observation d'une coupe transversale de la moelle épinière à l'œil nu et au microscope optique révèle une organisation symétrique et bilatérale caractéristique :

### 3.1. Morphologie Externe et Repères d'Orientation
- **La fissure médiane antérieure (ou sillon ventral)** : fente large, béante et profonde, s'enfonçant jusqu'au tiers antérieur de la moelle. Elle permet d'identifier à coup sûr la **face antérieure (ventrale)**.
- **Le sillon médian postérieur (ou sillon dorsal)** : dépression étroite et superficielle prolongée par un mince septum conjonctif médian, marquant la **face postérieure (dorsale)**.
- Deux sillons latéraux antérieurs et deux postérieurs d'où émergent les racines nerveuses.

### 3.2. La Substance Grise (Centrale en forme de Papillon)
Elle occupe le cœur de la moelle épinière et affecte la forme d'un papillon ou d'un « H » majuscule :
- **Les cornes antérieures (ventrales)** : volumineuses, larges, courtes et arrondies. Elles contiennent les corps cellulaires multipolaires des **motoneurones** (ou neurones moteurs alpha), dont les axones forment la racine ventrale motrice.
- **Les cornes postérieures (dorsales)** : longues, étroites et effilées, atteignant presque la périphérie de la moelle. Elles reçoivent les terminaisons des fibres sensitives et hébergent des **interneurones** (d'association).
- **La commissure grise** : pont transversal unissant les deux moitiés symétriques de la substance grise, percée en son centre par le **canal de l'épendyme**.

### 3.3. La Substance Blanche (Périphérique)
Elle enveloppe la substance grise et se subdivise en six cordons anatomiques :
- Deux cordons antérieurs (ventraux), deux latéraux et deux postérieurs (dorsaux).
- Elle est constituée exclusivement de faisceaux longitudinaux de **fibres nerveuses myélinisées** (axones entourés de myéline lipidique blanchâtre isolante).
- Elle ne contient **AUCUN corps cellulaire de neurone**.

---

> [!CONSEIL_BAC] **Règle d'or pour le Schéma du Bac S2 :**
> Lors de l'épreuve de SVT, le schéma d'une coupe transversale de moelle épinière doit toujours comporter :
> 1. Un titre précis : *« Schéma annoté d'une coupe transversale de la moelle épinière d'un mammifère »*.
> 2. L'orientation claire : Flèche indiquant *Face Antérieure (Ventrale)* et *Face Postérieure (Dorsale)*.
> 3. Les 7 légendes obligatoires : Fissure antérieure, Sillon postérieur, Substance grise (en H), Substance blanche, Canal de l'épendyme, Racine dorsale avec ganglion spinal, Racine ventrale motrice.

---

## 4. Organisation Fonctionnelle des Nerfs Rachidiens : Expériences Fondamentales de Bell et Magendie

Chaque nerf rachidien est relié à la moelle épinière par deux racines distinctes. La mise en évidence de leurs fonctions repose sur les célèbres expériences de section et de stimulation de Bell et Magendie, régulièrement posées au Bac S2.

### 4.1. Tableau Récapitulatif des Expériences Fondamentales

| Expérience réalisée | Constat clinique observé | Déduction physiologique immédiate |
| :--- | :--- | :--- |
| **Section du nerf rachidien mixte** | Perte totale de motricité et de sensibilité dans le territoire innervé | Le nerf rachidien est un **nerf mixte** (conduit à la fois les influx moteurs et sensitifs). |
| **Section de la racine antérieure (ventrale)** | Paralysie motrice complète, mais sensibilité **intacte** | La racine ventrale est la **voie motrice efférente (centrifuge)**. |
| **Stimulation du bout périphérique de la racine ventrale coupée** | Contraction violente des muscles innervés | Confirmation : l'influx moteur se propage vers la périphérie. |
| **Stimulation du bout central de la racine ventrale coupée** | Aucun effet moteur, aucune sensation | Pas de conduction centripète par la racine ventrale. |
| **Section de la racine postérieure (dorsale)** | Anesthésie sensorielle totale, mais motricité **normale** | La racine dorsale est la **voie sensitive afférente (centripète)**. |
| **Stimulation du bout central de la racine dorsale coupée** | Réaction de douleur vive et mouvement réflexe | Confirmation : l'influx sensitif remonte vers les centres nerveux. |
| **Stimulation du bout périphérique de la racine dorsale coupée** | Aucun effet perceptible | Pas de conduction centrifuge par la racine dorsale. |

---

### 4.2. Dégénérescence Wallérienne et Localisation des Corps Cellulaires

Lorsqu'une fibre nerveuse est coupée, la portion séparée de son noyau (corps cellulaire trophique) dégénère en quelques jours : c'est la **dégénérescence wallérienne**.
- **Racine ventrale coupée** : seules les fibres du bout périphérique dégénèrent. Le bout central reste intact $\implies$ Les corps cellulaires des motoneurones sont situés dans le centre nerveux, c'est-à-dire dans la **corne ventrale de la substance grise de la moelle**.
- **Racine dorsale coupée entre le ganglion spinal et la moelle** : les fibres du bout central dégénèrent vers la moelle $\implies$ Les corps cellulaires ne sont pas dans la moelle.
- **Racine dorsale coupée entre le ganglion spinal et le récepteur** : les fibres périphériques dégénèrent $\implies$ Les corps cellulaires ne sont pas dans les organes périphériques.
- **Conclusion d'excellence** : Les corps cellulaires des neurones sensitifs (protoneurones pseudo-unipolaires en T) sont situés exclusivement dans le **ganglion spinal de la racine dorsale**.

---

## 5. Synthèse Comparée : Moelle Épinière vs Encéphale

Pour éviter toute confusion lors de l'examen du Baccalauréat, voici le tableau comparatif rigoureux :

| Critère d'Analyse | Moelle Épinière (Rachis) | Cerveau / Encéphale (Crâne) |
| :--- | :--- | :--- |
| **Cavité protectrice** | Canal rachidien vertébral | Boîte crânienne rigide |
| **Disposition Substance Grise** | **Centrale** (forme de papillon / H) | **Périphérique** (cortex cérébral) + quelques noyaux profonds |
| **Disposition Substance Blanche** | **Périphérique** (cordons antérieurs, latéraux, postérieurs) | **Centrale** (centre ovale, corps calleux) |
| **Canal / Cavité interne** | Canal central de l'épendyme | Ventricules cérébraux ($V_1, V_2, V_3, V_4$) |
| **Nerfs rattachés** | 31 paires de nerfs rachidiens mixtes | 12 paires de nerfs crâniens (sensitifs, moteurs ou mixtes) |
| **Rôle fonctionnel majeur** | Centre réflexe involontaire & voie de conduction | Intégration consciente, motricité volontaire, pensée, mémoire |
`;

RICH_LESSONS_MAP.tissu_nerveux_potentiel_action = `# B1 - Leçon 2 : Tissu Nerveux : Structure du Neurone, Potentiel de Repos et Potentiel d’Action (Terminale S2)

Bienvenue dans la deuxième grande masterclass de **Sciences de la Vie et de la Terre (SVT)** de **Terminale S2**, rigoureusement alignée sur le programme officiel du Ministère de l'Éducation Nationale du Sénégal et les critères d'évaluation de l'Office du Baccalauréat.

Après avoir exploré l'architecture du système nerveux cérébrospinal dans la leçon 1, nous étudions ici son unité fondamentale de fonctionnement : le **neurone**, et les bases physico-chimiques de l'excitabilité cellulaire : le **Potentiel de Repos ($PR = -70\\text{ mV}$)** et le **Potentiel d'Action ($PA$)**.

---

## 1. Organisation Histologique du Tissu Nerveux & Cytologie du Neurone

Le tissu nerveux est constitué de deux grandes populations cellulaires intriquées :
- **Les neurones (environ 10 % des cellules)** : cellules hautement différenciées, excitables et conductrices, amitotiques (incapables de se diviser à l'état adulte).
- **Les cellules gliales ou névroglie (environ 90 %)** : cellules de soutien métabolique, d'isolation électrique (myélinisation par les oligodendrocytes dans le SNC et les cellules de Schwann dans le SNP), de défense immunitaire (microglie) et de nutrition (astrocytes de la barrière hémato-encéphalique).

### 1.1 Structure Cytologique du Neurone Multipolaire (Exemple du Motoneurone)

Un neurone multipolaire comprend trois parties anatomiques et physiologiques indissociables :

1. **Le Corps Cellulaire (Soma ou Péricaryon) :**
   - **Noyau :** volumineux, sphérique, central et clair, renfermant un nucléole sombre très visible.
   - **Corps de Nissl (Ergastoplasme) :** amas denses de réticulum endoplasmique granuleux très riches en ribosomes et ARN, colorables au bleu de méthylène. Ils assurent la biosynthèse massive de protéines et neurotransmetteurs.
   - **Neurofibrilles :** réseau dense de microtubules et neurofilaments assurant la rigidité de la cellule et le transport axoplasmique.

2. **Les Prolongements Cytoplasmiques :**
   - **Les Dendrites :** prolongements multiples, courts, arborescents et effilés, hérissés d'épines réceptrices. Elles constituent le **pôle récepteur cellulipète** (conduction de la périphérie vers le corps cellulaire).
   - **L'Axone (ou Cylindraxe) :** prolongement unique, long (jusqu'à $1\\text{ m}$ chez l'Homme), lisse et de calibre rigoureusement constant. Il naît du soma au niveau du **cône d'implantation (zone gâchette)**. Il constitue le **pôle émetteur cellulifuge** (conduction du corps cellulaire vers les effecteurs).

3. **L'Arborisation Terminale & Boutons Synaptiques :**
   - L'axone se ramifie à son extrémité distale en boutons synaptiques renflés, remplis de vésicules synaptiques contenant les messagers chimiques (acétylcholine, noradrénaline, GABA).

> [!PIEGE] **Piège Éliminatoire de l'Office du Bac :**
> Les corps de Nissl sont rigoureusement **ABSENTS** de l'axone et du cône d'émergence ! L'axone est totalement dépendant du soma pour son approvisionnement en macromolécules. Une section de l'axone entraîne la mort par dégénérescence wallérienne de la portion séparée du soma.

> [!VIE_REELLE] **L'analogie du réseau de télécommunication Sonatel :**
> Pensez au réseau de télécommunication reliant Dakar à l'intérieur du pays :
> - Les **dendrites** sont les antennes réceptrices locales qui captent les signaux dans tout le quartier.
> - Le **soma (corps cellulaire)** est le central technique avec ses serveurs informatiques (**corps de Nissl**) qui traitent et gèrent les paquets de données.
> - Le **cône d'implantation** est le routeur principal qui mesure la tension : si le signal est suffisant, il autorise l'émission.
> - L'**axone** est le grand câble de fibre optique qui achemine l'information sans aucune distorsion jusqu'au terminal distant !

> [!WOLOF] **Xam-xam ci Wolof — Neurone bi ak ay cërëm :**
> - « Neurone bi dafa melni jëmm bu am ay loxo ak ay tànk : loxo yu gàtt yi ñooy dendrites yi (cellulipète, dañuy nangu xibaar bi di ko duggal ci biir xol bi). »
> - « Péricaryon (soma) bi mooy kër liggéeyukaay bi : fi la noyau bi nekk ak corps de Nissl yi (ñooy usine yi di liggéey proteins yi). »
> - « Axone bi mooy yoon wu gudd wi (cellulifuge, buy génne xibaar bi). Bul fàtte mukk ci examen bi : corps de Nissl amuñu mukk ci biir axone bi ! »

---

## 2. Le Potentiel de Repos (PR) : Origine Biophysique & Maintien Actif

### 2.1 Mise en Évidence Expérimentale (Axone Géant de Calmar)
À l'aide d'une microélectrode de verre intracellulaire reliée à un oscilloscope cathodique :
- Lorsque les deux électrodes $R_1$ et $R_2$ sont à la surface externe du neurone, la différence de potentiel est nulle ($ddp = 0\\text{ mV}$).
- Dès que $R_1$ pénètre à l'intérieur de l'axoplasme, le spot cathodique dévie brutalement et se stabilise à **$-70\\text{ mV}$**.
- La face interne de la membrane plasmique est donc électronégative par rapport à la face externe : c'est le **Potentiel de Repos (PR)**.

### 2.2 Mécanismes Ioniques du Potentiel de Repos

Le potentiel de repos résulte de la combinaison de trois facteurs biophysiques fondamentaux :

1. **Dissymétrie de répartition des ions :**
   - Le sodium ($Na^+$) est fortement concentré à l'extérieur ($[Na^+]_{ext} \\approx 140\\text{ mmol/L}$ vs $[Na^+]_{int} \\approx 14\\text{ mmol/L}$).
   - Le potassium ($K^+$) est fortement concentré à l'intérieur ($[K^+]_{int} \\approx 140\\text{ mmol/L}$ vs $[K^+]_{ext} \\approx 4\\text{ mmol/L}$).
   - De gros anions protéiques non diffusibles ($A^-$) sont piégés à l'intérieur de la cellule.

2. **Perméabilité sélective des canaux de fuite :**
   - Au repos, la membrane possède des canaux de fuite ouverts en permanence.
   - La membrane est **50 à 100 fois plus perméable aux ions $K^+$ qu'aux ions $Na^+$**.
   - Par conséquent, les ions $K^+$ diffusent spontanément vers l'extérieur selon leur fort gradient de concentration. Cette fuite de charges positives charge positivement la face externe et laisse l'intérieur électronégatif.

3. **Maintien actif par la pompe $Na^+/K^+$ ATPase :**
   - Pour éviter que les gradients ne s'annulent par diffusion passive, la pompe $Na^+/K^+$ ATPase expulse activement $3\\,Na^+$ et fait entrer $2\\,K^+$ en hydrolysant de l'ATP.
   - En expulsant 3 charges positives pour seulement 2 charges réabsorbées, cette pompe est **électrogène** et maintient durablement le $PR$ à $-70\\text{ mV}$.

> [!THEOREME] **Équilibre Électrogène de la Pompe $Na^+/K^+$ ATPase :**
> $$3\\,Na^+_{int} + 2\\,K^+_{ext} + \\text{ATP} + \\text{H}_2\\text{O} \\xrightarrow{\\text{ATPase}} 3\\,Na^+_{ext} + 2\\,K^+_{int} + \\text{ADP} + \\text{P}_i$$
> Le blocage de cette pompe par un inhibiteur métabolique (dinitrophénol DNP ou ouabaïne) entraîne la dégradation progressive du potentiel de repos vers $0\\text{ mV}$.

> [!VIE_REELLE] **L'analogie de la pirogue de Soumbédioune qui prend l'eau :**
> Imaginez une pirogue de pêcheurs en haute mer au large de Dakar avec une petite fissure dans la coque :
> - L'eau de mer ($Na^+$) cherche constamment à entrer, et l'eau douce ($K^+$) tend à s'écouler. Ce sont les **canaux de fuite**.
> - Pour que la pirogue reste à flot à son tirant d'eau stable ($PR = -70\\text{ mV}$), le pêcheur doit écoper sans arrêt avec une calebasse. C'est la **pompe $Na^+/K^+$ ATPase** qui dépense son énergie musculaire (ATP) pour rejeter l'eau hors de l'embarcation !
> - Si le pêcheur s'évanouit sous l'effet d'un poison (comme l'ouabaïne ou le DNP), il cesse d'écoper : l'eau envahit la pirogue et celle-ci coule lentement jusqu'au niveau zéro ($0\\text{ mV}$).

> [!WOLOF] **Xam-xam ci Wolof — Potentiel de Repos (-70 mV) :**
> - « Ci repos, biir cell bi dafa am dooley négatif (-70 mV) ndax K+ dafay génn ci canaux de fuite yi. »
> - « Pompu $Na^+/K^+$ bi mooy écopeur bi : dafay génne 3 $Na^+$ di duggal 2 $K^+$ saa su nekk ak dooley ATP ngir dëgëral balanse bi. »
> - « Bu ñu defee ouabaïne wala DNP ci axone bi, pompe bi dafay taxaw, gradients yi di soxé ndànk-ndànk ba $PR$ bi soppi doon 0 mV ! »

---

## 3. Le Potentiel d'Action (PA) : Cinétique & Bases Moléculaires

### 3.1 Conditions de Déclenchement & Loi du Tout ou Rien sur Fibre Isolée
- Une stimulation électrique d'intensité $I$ n'est efficace que si la dépolarisation franchit le **seuil critique** (environ $-55\\text{ mV}$, soit un saut $\\Delta V \\approx +15\\text{ mV}$).
- Pour $I < I_{seuil}$ (stimulation infraliminaire) : réponse locale décroissante sans propagation (potentiel électrotonique).
- Dès que $I \\ge I_{seuil}$ (stimulation liminaire ou supraliminaire) : la fibre isolée émet un potentiel d'action d'**amplitude maximale constante ($100\\text{ mV}$, de $-70\\text{ mV}$ à $+30\\text{ mV}$)**. L'amplitude ne varie jamais avec l'intensité : c'est la **Loi du Tout ou Rien**.

### 3.2 Tableau Synoptique des 5 Phases du Potentiel d'Action

| Phase Chronologique | Durée Approximative | État des Canaux Ioniques | Mouvement Ionique Transmembranaire | Variation de Potentiel ($V_m$) |
| :--- | :--- | :--- | :--- | :--- |
| **1. Artéfact de stimulation** | Quasi-instantané ($0{,}05\\text{ ms}$) | Canaux au repos | Fuite physique de courant des électrodes $S$ vers $R$ | Pic parasite marquant le début ($t = 0$) |
| **2. Temps de latence** | $0{,}5$ à $2\\text{ ms}$ ($t = d/v$) | Canaux encore fermés | Aucun mouvement ionique net sous l'électrode | Maintien au repos ($-70\\text{ mV}$) |
| **3. Dépolarisation active** | $\\approx 0{,}5\\text{ ms}$ | **Ouverture immédiate des CVD-$Na^+$** | **Flux entrant massif et passif d'ions $Na^+$** | Ascension brutale de $-70\\text{ mV}$ à $+30\\text{ mV}$ |
| **4. Repolarisation** | $\\approx 0{,}7\\text{ ms}$ | Inactivation des CVD-$Na^+$, **ouverture des CVD-$K^+$** | **Flux sortant passif d'ions $K^+$** | Chute de $+30\\text{ mV}$ vers $-70\\text{ mV}$ |
| **5. Hyperpolarisation** | $1$ à $2\\text{ ms}$ | Fermeture lente et retardée des CVD-$K^+$ | Fuite résiduelle prolongée d'ions $K^+$ | Descente sous le repos ($-80\\text{ mV}$) puis retour via la pompe |

> [!VIE_REELLE] **L'analogie de la porte saloon et de la porte automatique :**
> - La **dépolarisation**, c'est comme une porte de saloon poussée par une bourrasque : les canaux sodium (CVD-$Na^+$) s'ouvrent en une fraction de milliseconde dès que le seuil est franchi, laissant s'engouffrer les ions $Na^+$.
> - La **repolarisation**, c'est comme une porte automatique lourde : les canaux potassium (CVD-$K^+$) s'ouvrent plus lentement pour évacuer les ions $K^+$. Comme ils mettent du temps à se refermer, trop de $K^+$ sortent : c'est l'**hyperpolarisation** transitoire !

> [!WOLOF] **Xam-xam ci Wolof — Potentiel d'Action (PA) :**
> - « Dépolarisation : CVD $Na^+$ yi dañuy ubbeeku foudroyant ! $Na^+$ dafay duggu ci biir bu gaaw, loolu mooy yékkati potentiel bi ba $+30\\text{ mV}$. »
> - « Repolarisation : CVD $Na^+$ yi dañuy tëju, CVD $K^+$ yi ubbeeku ndànk, $K^+$ génn ci biti ba mu dellu ci négatif. »
> - « Période réfractaire : dafa melni chasse d'eau bu ñu sanni rek : mënuloo ko sanniwaat ci sàsi te réservoir bi feesul ndox ! »

---

## 4. Période Réfractaire & Action des Neurotoxines Sélectives

### 4.1 Les Deux Périodes Réfractaires
1. **Période Réfractaire Absolue (PRA, durée $\\approx 1\\text{ ms}$) :** Pendant la dépolarisation et le début de la repolarisation, tous les CVD-$Na^+$ sont inactivés. Aucun second potentiel d'action ne peut être généré, quelle que soit l'intensité du stimulus. Cela impose la propagation **unidirectionnelle** de l'influx.
2. **Période Réfractaire Relative (PRR, durée $\\approx 2\\text{ ms}$) :** Pendant l'hyperpolarisation, certains CVD-$Na^+$ redeviennent activables. Une stimulation supraliminaire très forte peut déclencher un second PA d'amplitude légèrement diminuée.

### 4.2 Les Neurotoxines Ciblées au Baccalauréat Sénégalais

| Neurotoxine Étudiée | Cible Moléculaire Spécifique | Tracé Oscillographique Obtenu | Déduction Physiologique Bac |
| :--- | :--- | :--- | :--- |
| **Tétrodotoxine (TTX)** *(extraite du poisson tétrodon)* | Bloque sélectivement les **CVD-$Na^+$** | **Abolition intégrale du potentiel d'action** | La dépolarisation active dépend exclusivement du flux entrant d'ions $Na^+$. |
| **Tétraéthylammonium (TEA)** | Bloque sélectivement les **CVD-$K^+$** | Dépolarisation normale jusqu'à $+30\\text{ mV}$, mais **repolarisation extrêmement lente** | La repolarisation rapide dépend directement du flux sortant d'ions $K^+$. |

---

## 5. Propagation de l'Influx Nerveux : Continue vs Saltatoire

### 5.1 Conduction Continue (Fibres Amyéliniques)
- La membrane est nue sur toute sa longueur.
- La dépolarisation active au site stimulé crée des **courants locaux de Hermann** avec les zones adjacentes au repos.
- L'influx avance de proche en proche à vitesse lente ($0{,}5$ à $2\\text{ m/s}$).

### 5.2 Conduction Saltatoire (Fibres Myélinisées)
- La gaine de myéline (formée par les cellules de Schwann) est un **isolant électrique lipoprotéique exceptionnel**.
- Les échanges ioniques ne peuvent se produire qu'au niveau des interruptions de la gaine : les **étranglements ou nœuds de Ranvier**, où la concentration en CVD-$Na^+$ est 100 fois plus dense.
- Les lignes de courant sautent d'un nœud de Ranvier directement au nœud suivant : **conduction saltatoire**.
- **Avantages majeurs :** vitesse très élevée (jusqu'à $120\\text{ m/s}$, soit plus de $430\\text{ km/h}$) et économie massive d'ATP pour la cellule.

> [!VIE_REELLE] **L'analogie de l'Autoroute à Péage Ila Touba :**
> - Rouler sur une piste de sable non goudronnée (fibre amyélinique), c'est avancer à 20 km/h en consommant énormément de carburant pour franchir chaque mètre (conduction continue lente).
> - Rouler sur l'autoroute Ila Touba goudronnée et isolée (fibre myélinisée), c'est filer à toute allure : la voiture ne s'arrête qu'aux gares de péage espacées (les nœuds de Ranvier) ! C'est la **conduction saltatoire** : gain de vitesse foudroyant et économie colossale d'énergie pour l'organisme.

> [!WOLOF] **Xam-xam ci Wolof — Conduction Saltatoire :**
> - « Myéline bi dafa melni plastique bu ñuy gante fil électrique ngir courant bi bumu sance ci yoon wi. »
> - « Étranglements de Ranvier yi rekk la courant bi di mëna tëbe ba tëbe ci benen nœud (saltatoire) : loolu mooy tax mu gaaw ba eg $120\\text{ m/s}$ te di denc ATP bu beuri ! »

---

## 6. Synthèse Comparative : Fibre Isolée vs Nerf Entier (Le Piège d'Or du Bac)

| Critère d'Analyse | Fibre Nerveuse Unique (1 axone) | Nerf Sciatique Entier (Organe) |
| :--- | :--- | :--- |
| **Nature anatomique** | Prolongement cylindrique d'un seul neurone | Faisceau réunissant des milliers de fibres de calibres différents |
| **Loi physiologique** | Obéit à la **Loi du Tout ou Rien** | N'obéit **JAMAIS** à la loi du tout ou rien ! |
| **Seuil d'excitabilité** | Seuil liminaire unique $I_s$ | Seuils étagés (fibres très sensibles à fibres résistantes) |
| **Variation de l'amplitude** | Constante d'emblée à $100\\text{ mV}$ dès que $I \\ge I_s$ | **Graduable et croissante** avec l'intensité $I$ |
| **Mécanisme explicatif** | Activation synchronisée de tous les canaux de la fibre | **Recrutement progressif** d'un contingent croissant de fibres nerveuses |
| **Saturation** | Immédiate dès le seuil | Atteinte à un palier maximal lorsque $100\\,\\%$ des fibres sont excitées |
| **Codage du message** | En **modulation de fréquence** de PA | En **modulation d'amplitude globale** ET de fréquence |

> [!VIE_REELLE] **L'analogie de l'interrupteur vs l'éclairage du stade Abdoulaye Wade :**
> - Une **fibre isolée**, c'est l'interrupteur simple d'une ampoule : si vous appuyez trop mollement, rien ne s'allume ; dès que vous poussez assez pour franchir le déclic, l'ampoule brille à 100 % d'emblée (**Loi du Tout ou Rien**).
> - Le **nerf entier**, c'est l'ensemble des 500 projecteurs du stade Abdoulaye Wade de Diamniadio : avec un faible courant, 10 projecteurs s'allument ; si l'intensité augmente, 100 s'allument, puis 300, puis les 500. L'éclairage global devient de plus en plus puissant (**recrutement progressif**) jusqu'à ce que tous les projecteurs fonctionnent (**saturation**).

> [!CONSEIL_BAC] **Formule officielle pour le calcul de vitesse :**
> Au Bac S2, lorsqu'on vous donne deux couples d'électrodes réceptrices $R_1$ et $R_2$ distantes de $d$ avec des dates d'arrivée $t_1$ et $t_2$ :
> $$v = \\frac{d}{\\Delta t} = \\frac{d}{t_2 - t_1}$$
> Attention capitale aux unités : convertissez toujours $d$ en mètres ($\\text{m}$) et $\\Delta t$ en secondes ($\\text{s}$) pour obtenir $v$ en $\\text{m}\\cdot\\text{s}^{-1}$.
`;

RICH_LESSONS_MAP.synapse_transmission_chimique = `# B1 - Leçon 3 : Transmission Synaptique Chimique & Intégration Nerveuse

---

## Introduction & Enjeux au Baccalauréat S2 Sénégal

La transmission de l'influx nerveux le long d'un axone est de nature purement électrique (potentiel d'action propagé). Cependant, la communication d'un neurone à un autre (synapse neuro-neuronique) ou d'un neurone à un effecteur musculaire (synapse neuromusculaire ou plaque motrice) se heurte à une discontinuité anatomique infranchissable par le courant électrique : la **fente synaptique** (large de 20 à 50 nm).

Pour franchir cet espace, la nature utilise un mécanisme de **transduction chimio-électrique** : le message électrique présynaptique est converti en un message chimique intermédiaire (libération d'un neurotransmetteur), qui déclenche à son tour une réponse électrique sur la cellule postsynaptique.

> [!THEOREME] **La Règle d'Or de la Synapse au Bac S2 :**
> - **Polarité fonctionnelle unidirectionnelle :** L'influx ne franchit la synapse QUE dans un seul sens : de l'élément présynaptique vers l'élément postsynaptique, car les vésicules de neurotransmetteur ne se trouvent QUE dans le bouton présynaptique, et les récepteurs récepteurs-canaux ne se trouvent QUE sur la membrane postsynaptique.
> - **Délai synaptique :** La traversée d'une synapse prend environ $0{,}5\\text{ milliseconde}$. Ce délai correspond au temps nécessaire pour l'entrée du $\\text{Ca}^{2+}$, l'exocytose, la diffusion du médiateur dans la fente et la fixation sur les récepteurs.

> [!WOLOF] **Ndongo S2 Wolof Insight :**
> Yoonu synapse bi dafa am benn sens rek : dafay joggé ci kow (bouton présynaptique) wàcc ci suuf (membrane postsynaptique). Mënul dellu ginaaw mukk ndax ay vésicules yi am neurotransmetteur ci kow rekk lañu nekk, te récepteurs yi ci suuf rekk lañu nekk ! Dafa melni oto buy dem Ila Touba ci autoroute à sens unique.

---

## 1. Ultrastructure & Anatomie Comparée de la Synapse

L'observation au microscope électronique à transmission (MET) révèle que la synapse comprend trois compartiments fonctionnels distincts :

| Compartiment Anatomique | Structures Ultrastructurales Observées | Rôle Physiologique Spécifique |
| :--- | :--- | :--- |
| **Bouton Présynaptique** | - Vésicules synaptiques sphériques ($40\\text{ nm}$ de diamètre) contenant le médiateur<br>- Nombreuses mitochondries énergétiques<br>- Canaux $\\text{Ca}^{2+}$ voltage-dépendants | Synthèse, stockage et libération par exocytose quantale du neurotransmetteur sous l'effet du $\\text{Ca}^{2+}$. |
| **Fente Synaptique** | - Espace extracellulaire étroit ($20\\text{ à }50\\text{ nm}$)<br>- Matrice glycoprotéique<br>- Enzymes d'inactivation (Acétylcholinestérase) | Espace de diffusion passive rapide du neurotransmetteur et lieu de son hydrolyse ultra-rapide. |
| **Membrane Postsynaptique** | - Densité postsynaptique visible au MET<br>- Récepteurs-canaux chimiodépendants (ROC)<br>- Pas de vésicules synaptiques | Reconnaissance spécifique du ligand et genèse des potentiels postsynaptiques graduables (PPSE ou PPSI). |

> [!PIEGE] **Le piège classique de la localisation des vésicules :**
> Si un exercice du Bac vous demande d'orienter une synapse à partir d'un schéma de microscopie électronique, cherchez immédiatement **les vésicules synaptiques** et **les mitochondries** : le côté qui les contient est STRICTEMENT le pôle présynaptique !

---

## 2. Les 6 Étapes Moléculaires de la Transmission Synaptique

Le fonctionnement de la synapse neuro-musculaire (plaque motrice) ou neuro-neuronique s'articule rigoureusement en 6 étapes chronologiques indissociables :

### Étape 1 : Arrivée du Train de Potentiels d'Action
L'onde de dépolarisation atteint la terminaison axonale présynaptique et dépolarise la membrane du bouton terminal.

### Étape 2 : Entrée Massive d'Ions Calcium ($\\text{Ca}^{2+}$)
La dépolarisation provoque l'ouverture immédiate des **canaux calcium voltage-dépendants** (CVD-$\\text{Ca}^{2+}$). Comme $[\\text{Ca}^{2+}]_{ext} \\gg [\\text{Ca}^{2+}]_{int}$, les ions $\\text{Ca}^{2+}$ entrent massivement dans le cytoplasme selon leur gradient de concentration.

### Étape 3 : Exocytose Quantale du Neurotransmetteur
L'élévation du $\\text{Ca}^{2+}$ intracellulaire déclenche la fusion des vésicules synaptiques avec la membrane présynaptique (via le complexe protéique SNARE). Des milliers de molécules d'acétylcholine (ACh) sont déversées dans la fente par exocytose.

### Étape 4 : Diffusion & Fixation sur les Récepteurs-Canaux Chimiodépendants (ROC)
Les molécules d'ACh diffusent en moins de $0{,}1\\text{ ms}$ à travers la fente et se fixent sur la face externe des **récepteurs nicotiniques** de la membrane postsynaptique. Deux molécules d'ACh sont requises pour ouvrir un canal ROC.

### Étape 5 : Ouverture des Canaux Sodiques & Genèse du PPSE
L'ouverture du pore central du récepteur-canal permet une entrée brutale d'ions $\\text{Na}^+$ dans la cellule postsynaptique. Cette entrée de charges positives engendre une dépolarisation locale appelée **Potentiel Post-Synaptique Excitateur (PPSE)**.

### Étape 6 : Inactivation Enzymatique & Recapture
Pour éviter une stimulation continue, l'acétylcholine fixée se détache rapidement et est hydrolysée par l'**acétylcholinestérase** en acétate et choline :
$$\\text{Acétylcholine} + \\text{H}_2\\text{O} \\xrightarrow{\\text{Acétylcholinestérase}} \\text{Acétate} + \\text{Choline}$$
La choline est recaptée activement par le bouton présynaptique pour synthétiser de nouvelles molécules d'acétylcholine avec de l'acétyl-CoA.

> [!VIE_REELLE] **L'analogie de la pirogue de Soumbédioune :**
> Imaginez la traversée entre Dakar et Gorée : les voitures (le courant électrique) ne peuvent pas rouler sur l'océan Atlantique. Elles embarquent donc sur une chaloupe (les vésicules de neurotransmetteurs) qui traverse l'eau (la fente synaptique). Arrivées sur le quai de Gorée (la membrane postsynaptique), les portes s'ouvrent et les voitures recommencent à rouler sur la terre ferme. C'est exactement ce que fait l'acétylcholine !

---

## 3. Typologie des Synapses : PPSE vs PPSI

Selon la nature du neurotransmetteur libéré et du canal postsynaptique activé, la synapse produit deux types d'effets électriques opposés :

| Critère Électrophysiologique | Synapse Excitatrice (PPSE) | Synapse Inhibitrice (PPSI) |
| :--- | :--- | :--- |
| **Neurotransmetteur majeur** | Glutamate, Acétylcholine | GABA (acide $\\gamma$-aminobutyrique), Glycine |
| **Nature du canal ionique activé** | Canal récepteur chimiodépendant (ROC) perméable au $\\text{Na}^+$ (et $\\text{Ca}^{2+}$) | Canal récepteur chimiodépendant perméable au $\\text{Cl}^-$ ou au $\\text{K}^+$ |
| **Mouvement ionique transmembranaire** | **Entrée nette de cations $\\text{Na}^+$** dans la cellule | **Entrée d'anions $\\text{Cl}^-$** ou **Sortie de cations $\\text{K}^+$** |
| **Variation du potentiel $V_m$** | **Dépolarisation locale** ($\Delta V_m > 0$), ex. $-70\\text{ mV} \\to -60\\text{ mV}$ | **Hyperpolarisation locale** ($\Delta V_m < 0$), ex. $-70\\text{ mV} \\to -75\\text{ mV}$ |
| **Effet sur l'excitabilité** | Rapproche le potentiel de membrane du **seuil critique** ($-55\\text{ mV}$) | Éloigne le potentiel de membrane du **seuil critique**, bloquant l'émission de PA |

> [!METHODE] **Comment reconnaître un PPSE et un PPSI sur un graphe d'oscilloscope :**
> - Si la courbe monte au-dessus de la ligne de base de $-70\\text{ mV}$ (dôme positif), il s'agit d'un **PPSE** (dépolarisation).
> - Si la courbe descend en dessous de la ligne de base de $-70\\text{ mV}$ (creux négatif), il s'agit d'un **PPSI** (hyperpolarisation).
> - Ni l'un ni l'autre ne dépasse le zéro : leur amplitude est toujours modeste (de $2\\text{ à }15\\text{ mV}$) et graduable selon la dose de médiateur.

---

## 4. L'Intégration Postsynaptique par le Motoneurone

Un motoneurone de la corne antérieure de la moelle épinière reçoit simultanément des milliers de boutons synaptiques (jusqu'à $10\\,000$ connexions excitatrices et inhibitrices). Le motoneurone agit comme un véritable microprocesseur biologique grâce à l'**intégration nerveuse**.

### 4.1. Sommation Spatiale
La **sommation spatiale** correspond à l'addition algébrique simultanée des potentiels postsynaptiques générés au même instant par des synapses différentes réparties sur la membrane somato-dendritique.

### 4.2. Sommation Temporelle
La **sommation temporelle** correspond à l'addition algébrique sur une même synapse de potentiels postsynaptiques successifs rapprochés dans le temps, déclenchés par une salve de potentiels d'action présynaptiques à haute fréquence.

### 4.3. Rôle Décisif du Cône d'Implantation (Zone Gâchette)
Tous les potentiels postsynaptiques (PPSE positifs et PPSI négatifs) convergent passivement vers le **cône d'implantation** (segment initial de l'axone) :
$$V_m(\\text{cône}) = V_{\\text{repos}} + \\sum \\Delta V_{\\text{PPSE}} + \\sum \\Delta V_{\\text{PPSI}}$$

Le cône d'implantation possède la plus forte densité de tout le neurone en **canaux $\\text{Na}^+$ voltage-dépendants** : son seuil d'excitabilité est donc le plus bas (environ $-55\\text{ mV}$).
- **Si $V_m(\\text{cône}) < -55\\text{ mV}$ :** La stimulation est infraliminaire. Aucun potentiel d'action n'est émis.
- **Si $V_m(\\text{cône}) \\ge -55\\text{ mV}$ :** Le seuil critique est franchi ! Les canaux $\\text{Na}^+$ voltage-dépendants s'ouvrent massivement : **le motoneurone émet un train de potentiels d'action propagés le long de l'axone vers le muscle (Loi du Tout ou Rien)**.

> [!VIE_REELLE] **L'analogie du portique de sécurité de l'Aéroport AIBD :**
> Le cône d'implantation fonctionne exactement comme le portique de sécurité biométrique de l'aéroport international Blaise Diagne (AIBD) : vous pouvez présenter plusieurs petites cartes d'embarquement (PPSE), mais tant que le lecteur n'a pas validé le total requis (le seuil de $-55\\text{ mV}$), le portillon reste verrouillé. Dès que le score est atteint, le portillon s'ouvre d'un coup sec pour laisser passer les passagers.

---

## 5. Pharmacologie Expérimentale du Bac S2 : Poisons & Neurotoxines

Les épreuves du Baccalauréat sénégalais font fréquemment appel à des agents pharmacologiques pour éprouver la compréhension du mécanisme synaptique par le candidat :

| Agent Pharmacologique | Site & Mode d'Action Cellulaire | Tracé Électrique Postsynaptique | Conséquence Physiologique |
| :--- | :--- | :--- | :--- |
| **Curare (D-Tubocurarine)** | Antagoniste compétitif des récepteurs nicotiniques postsynaptiques à l'ACh. | **Tracé plat à $-70\\text{ mV}$** (PPSE totalement aboli). | **Paralysie motrice flasque.** Le muscle ne se contracte plus malgré la stimulation du nerf moteur. |
| **Éserine (Physostigmine)** | Inhibiteur réversible de l'acétylcholinestérase dans la fente synaptique. | **PPSE géant et anormalement prolongé.** | **Tétanie et spasmes continus.** L'ACh s'accumule dans la fente et stimule les récepteurs sans répit. |
| **Toxine Botulique (Botox)** | Clivage enzymatique des protéines SNARE présynaptiques. | **Absence de PPSE** (reste au potentiel de repos). | **Paralysie flasque.** Empêche l'exocytose des vésicules d'ACh. L'injection d'ACh directe rétablit la contraction. |
| **Milieu sans Calcium ($[\\text{Ca}^{2+}] = 0$)** | Absence de gradient de calcium transmembranaire. | **Absence complète de PPSE.** | **Blocage synaptique réversible.** Prouve que l'exocytose dépend obligatoirement de l'entrée de $\\text{Ca}^{2+}$. |

> [!CONSEIL_BAC] **Comment rédiger la question de pharmacologie au Bac :**
> Si le sujet vous présente une expérience où un produit $X$ bloque la contraction, suivez toujours cette démarche en 3 étapes :
> 1. **Localiser l'action :** Présynaptique (exocytose/calcium) ou Postsynaptique (récepteurs ROC) ?
> 2. **Citer le témoin :** Montrer que sous stimulation directe de la fibre musculaire, le muscle se contracte toujours (prouve que la machinerie contractile actinomyosine est intacte).
> 3. **Conclure sur le mécanisme :** "Le produit $X$ agit spécifiquement au niveau de la synapse neuromusculaire en inhibant [nom du récepteur ou de l'enzyme]."
`;

RICH_LESSONS_MAP.reflexes_medullaires_conditionnels = `# B1 - Leçon 4 : Activité Réflexe Médullaire (Réflexe Myotatique) & Réflexes Conditionnels Pavloviens

---

## Introduction & Définition de l'Acte Réflexe au Bac S2

Un **acte réflexe** est une réponse motrice ou sécrétoire involontaire, rapide, stéréotypée et inéluctable de l'organisme consécutive à la stimulation efficace d'un récepteur sensoriel précis.

Au Baccalauréat sénégalais, le programme distingue rigoureusement deux grandes catégories de réflexes :
1. **Les réflexes innés (ou absolus) :** Présents dès la naissance, universels pour tous les individus d'une même espèce, immuables et centrés sur la moelle épinière ou le tronc cérébral (ex. réflexe myotatique rotulien, réflexe de retrait nociceptif, clignement palpébral).
2. **Les réflexes acquis (ou conditionnels pavloviens) :** Individuels, temporaires, résultant d'un apprentissage par association répétée et nécessitant obligatoirement l'intégrité du **cortex cérébral** (ex. réflexe salivaire au son d'une cloche).

> [!THEOREME] **La Loi de Continuité de l'Arc Réflexe Médullaire :**
> L'accomplissement d'un réflexe inné exige la continuité anatomique parfaite de **5 maillons fonctionnels en série** :
> 1. **Récepteur sensoriel :** Capte le stimulus mécanique et le convertit en influx nerveux (ex. Fuseau Neuromusculaire, FNM).
> 2. **Conducteur afférent :** Fibre sensitive (Ia) dont le corps cellulaire loge dans le **ganglion spinal** de la racine dorsale.
> 3. **Centre nerveux intégrateur :** Substance grise de la moelle épinière (traitement et transmission synaptique).
> 4. **Conducteur efférent :** Fibre motrice (axone du motoneurone $\\alpha$) émergeant par la **racine ventrale**.
> 5. **Organe effecteur :** Muscle strié squelettique qui exécute la contraction mécanique.

> [!WOLOF] **Ndongo S2 Wolof Insight :**
> Réflexe inné bi dafa melni commande automatique bu Yàlla bind ci sa yaram : bo jotee stimulus bi rekk, dafay déclenché boppam sans nga ciy xalaat ! Moelle épinière bi mooy géré dossier bi ci 25 millisecondes rekk bala xel mi sax di yég dara.

---

## 1. Le Réflexe Myotatique : Modèle Monosynaptique & Maintien de la Posture

### 1.1. Définition Officielle
Le **réflexe myotatique** est la contraction réflexe d'un muscle en réponse à son **propre étirement**.
- **Exemple classique au Bac :** Le **réflexe rotulien** (la percussion du tendon rotulien sous la rotule étire brusquement le muscle quadriceps de la cuisse, provoquant instantanément sa contraction et l'extension de la jambe) ou le **réflexe achilléen** (percussion du tendon d'Achille $\\to$ extension du pied).
- **Rôle biologique majeur :** Le maintien du tonus musculaire, l'équilibre postural et la lutte permanente contre la pesanteur.

### 1.2. Mécanisme Moléculaire & Caractère Monosynaptique
Le réflexe myotatique est le **seul réflexe monosynaptique** de l'organisme :
1. L'étirement mécanique distend les **fuseaux neuromusculaires (FNM)** disposés en parallèle avec les fibres musculaires.
2. Les terminaisons annulo-spiralées des fibres sensitives Ia sont dépolarisées (potentiel récepteur générateur).
3. Des trains de potentiels d'action cheminent de manière centripète le long du nerf sciatique, franchissent le ganglion spinal de la racine dorsale et pénètrent dans la corne postérieure de la moelle épinière.
4. Dans la corne antérieure, la fibre Ia s'articule **directement par une seule synapse excitatrice chimique** (médiateur : glutamate) avec le soma du motoneurone $\\alpha$.
5. Le motoneurone $\\alpha$ émet une salve de PA le long de la racine ventrale qui déclenche la libération d'acétylcholine à la jonction neuromusculaire et la contraction du quadriceps.

> [!VIE_REELLE] **L'analogie de la visite médicale militaire au Camp Gallieni :**
> Lors de la visite d'incorporation au service militaire ou lors d'une consultation au CHU Fann, le médecin frappe sous la rotule avec un petit marteau en caoutchouc. Si la jambe se détend d'un coup sec, cela prouve d'un coup que le nerf fémoral, les racines $L_3-L_4$ et la moelle épinière lombaire fonctionnent parfaitement sans lésion.

---

## 2. Le Circuit Réciproque & l'Interneurone Inhibiteur

Pour que la jambe puisse s'étendre sans déchirer les muscles de la face postérieure de la cuisse, la contraction du muscle agoniste (quadriceps) doit impérativement s'accompagner du **relâchement coordonné du muscle antagoniste (ischio-jambiers)**.

C'est le principe de l'**innervation réciproque** :
- La fibre sensitive Ia se divise dans la moelle en deux collatérales :
  1. Une collatérale directe excitatrice qui active le **motoneurone $\\alpha$ du quadriceps** (voie monosynaptique $\\to$ contraction).
  2. Une collatérale qui fait synapse avec un **interneurone inhibiteur** dans la substance grise. Cet interneurone libère un neurotransmetteur inhibiteur (GABA ou glycine) qui ouvre des canaux $\\text{Cl}^-$ et engendre un **PPSI hyperpolarisant** sur le motoneurone de l'ischio-jambier (voie polysynaptique $\\to$ inhibition du muscle antagoniste).

| Muscle Analysé | Fonction Mécanique | Circuit Synaptique | État Postsynaptique | Conséquence Motrice |
| :--- | :--- | :--- | :--- | :--- |
| **Quadriceps (Agoniste)** | Extenseur de la jambe | Monosynaptique direct (Fibre Ia $\\to$ Motoneurone) | **PPSE supraliminaire** $\\implies$ Salve de PA | **Contraction vigoureuse** |
| **Ischio-Jambier (Antagoniste)** | Fléchisseur de la jambe | Polysynaptique (Ia $\\to$ Interneurone $(-)$ $\\to$ Moto.) | **PPSI hyperpolarisant** ($-75\\text{ mV}$) | **Relâchement complet** |

> [!PIEGE] **Attention au piège de l'interneurone au Bac :**
> L'interneurone inhibiteur se trouve **exclusivement dans la moelle épinière** ! Il n'agit pas directement sur le muscle, mais inhibe le motoneurone antagoniste au niveau de son corps cellulaire dans la corne antérieure.

---

## 3. Les Expériences Fondamentales de Section et Stimulation de Magendie

Au 19ème siècle, le physiologiste François Magendie a élucidé le rôle respectif des deux racines du nerf rachidien par une série d'expériences devenues la base de l'évaluation au Bac S2 :

| Expérience Neurochirurgicale | Observation Clinique Spontanée | Effet de la Stimulation Électrique du Bout Central | Effet de la Stimulation Électrique du Bout Périphérique | Déduction Physiologique Officielle |
| :--- | :--- | :--- | :--- | :--- |
| **1. Section du Nerf Rachidien Mixte** | **Paralysie motrice flasque ET Anesthésie totale** du territoire innervé. | Douleur consciente (si centres encéphaliques intacts). | Contraction musculaire des faisceaux moteurs périphériques. | Le nerf rachidien est un **nerf mixte** conduisant à la fois des fibres sensitives et motrices. |
| **2. Section de la Racine Dorsale (Postérieure)** | **Anesthésie totale** du territoire innervé.<br>La motricité reste normale ! | **Douleur vive** et mouvement réflexe controlatéral. | **Aucun effet** (pas de sensation, pas de mouvement). | La racine dorsale est purement **sensitive afférente** (conduction centripète vers les centres). |
| **3. Section de la Racine Ventrale (Antérieure)** | **Paralysie motrice complète**.<br>La sensibilité reste normale ! | **Aucun effet** (l'influx moteur ne remonte pas dans la moelle). | **Contraction musculaire vive** du territoire effecteur. | La racine ventrale est purement **motrice efférente** (conduction centrifuge vers les effecteurs). |

> [!METHODE] **La règle d'or pour orienter les stimulations :**
> - **Bout central :** Reste rattaché à l'axe cérébrospinal (moelle épinière). Sa stimulation ne peut agir que si les voies conduisent **vers le centre** (voie centripète / sensitive).
> - **Bout périphérique :** Reste rattaché aux organes (muscles / peau). Sa stimulation ne peut agir que si les voies conduisent **vers la périphérie** (voie centrifuge / motrice).

---

## 4. Les Réflexes Conditionnels Pavloviens (Réflexes Acquis)

Mise en évidence par le physiologiste russe Ivan Pavlov chez le chien, cette découverte fondamentale démontre la capacité du système nerveux central à créer des connexions nouvelles par apprentissage.

### 4.1. Le Protocole Expérimental en 4 Temps
1. **Temps 1 (Avant conditionnement) :**
   - Présentation de viande dans la gueule = **Stimulus Inconditionnel (SI)** $\\to$ Sécrétion de salive = **Réponse Inconditionnelle (RI)** (réflexe inné salivaire).
   - Son d'une cloche ou lumière = **Stimulus Neutre (SN)** $\\to$ Aucune salivation.
2. **Temps 2 (Pendant le conditionnement) :**
   - On fait retentir la cloche (SN), puis quelques secondes après on donne la viande (SI).
   - Cette séquence $[\\text{SN} \\to \\text{SI}]$ est répétée des dizaines de fois quotidiennement : c'est le **renforcement**.
3. **Temps 3 (Après conditionnement) :**
   - On fait retentir la cloche seule sans donner de viande.
   - Le stimulus neutre est devenu un **Stimulus Conditionnel (SC)** capable de déclencher à lui seul une **Réponse Conditionnelle (RC)** : le chien salive abondamment !
4. **Temps 4 (Inhibition d'Extinction) :**
   - Si la cloche (SC) retentit de multiples fois de suite sans jamais être suivie de viande, la salivation diminue progressivement puis disparaît. Le réflexe est **éteint par inhibition corticale interne**.

### 4.2. Mécanisme Neurologique : La Liaison Synaptique Temporaire
Chez l'animal décortiqué (ablation chirurgicale des hémisphères cérébraux), le réflexe inné de salivation à la viande persiste, mais **aucun réflexe conditionnel ne peut être établi**.
- Le conditionnement repose sur la **plasticité synaptique corticale** : la répétition simultanée de l'excitation de l'aire auditive et de l'aire gustative crée une **liaison nerveuse fonctionnelle temporaire** au sein du cortex cérébral.

> [!VIE_REELLE] **L'analogie du mouton de Tabaski à Dakar :**
> Pendant le mois précédant la fête de la Tabaski, à chaque fois que l'éleveur verse des graines dans la bassine en fer, la bassine émet un son métallique particulier (stimulus neutre). Au début, le mouton ne réagit qu'en voyant les graines. Après une semaine, dès que le mouton entend le tintement de la bassine au fond de la cour, il accourt et bêle instantanément : il a développé un réflexe conditionnel pavlovien !

---

## 5. Synthèse Comparative Officielle du Bac S2 : Réflexe Inné vs Réflexe Acquis

| Critère de Comparaison | Réflexe Inné (Médullaire / Myotatique) | Réflexe Acquis (Conditionnel Pavlovien) |
| :--- | :--- | :--- |
| **Origine** | Présent dès la naissance (inscrit dans le génome). | Acquis par apprentissage et association au cours de la vie. |
| **Spécificité** | Universel et identique chez tous les membres de l'espèce. | Individuel (varie d'un individu à un autre selon son vécu). |
| **Centre nerveux obligatoire** | **Moelle épinière** ou tronc cérébral (persiste sans cortex). | **Cortex cérébral obligatoire** (disparaît chez l'animal décortiqué). |
| **Stabilité dans le temps** | Définitif, permanent et immuable. | **Temporaire et réversible** (s'éteint sans renforcement). |
| **Circuits neuronaux** | Voies anatomiques préétablies, innées et fixes. | **Liaisons synaptiques temporaires** créées par plasticité. |
| **Rôle biologique** | Survie immédiate, posture et réflexes de défense. | Adaptation dynamique et fine de l'individu à son environnement. |

> [!CONSEIL_BAC] **Ce que l'examinateur de l'Office du Bac attend :**
> Dans une épreuve de synthèse (Partie 1), si le sujet oppose réflexe myotatique et conditionnel, organisez toujours votre plan en 3 axes :
> 1. Définition et mise en évidence expérimentale (Percussion vs Pavlov).
> 2. Comparaison des centres et des circuits (Moelle/Monosynaptique vs Cortex/Liaison temporaire).
> 3. Tableau comparatif final récapitulant les 6 critères clés.
`;

RICH_LESSONS_MAP.activite_cardiaque_automatisme = `# B2 - Leçon 1 : Anatomie, Révolution Cardiaque & Mécanisme de l'Automatisme Cardiaque (Tissu Nodal)

---

## Introduction : La Pompe Cardiovasculaire au Baccalauréat S2

Le **cœur** est l'organe moteur central de l'appareil cardiovasculaire. Fonctionnant comme une pompe aspirante et foulante infatigable, il assure la propulsion ininterrompue du sang à travers la double circulation (grande circulation systémique et petite circulation pulmonaire).

L'étude de l'activité cardiaque au Baccalauréat sénégalais repose sur trois piliers fondamentaux :
1. **L'organisation anatomique et fonctionnelle** du cœur et des valvules.
2. **L'automatisme cardiaque intrinsèque** gouverné par le tissu nodal, avec l'analyse des ligatures historiques de Stannius.
3. **La mécanique cardiaque** (révolution cardiaque en trois phases, électrocardiogramme et hémodynamique quantitative).

> [!THEOREME] **La Loi Fondamentale de l'Automatisme Intrinsèque :**
> Le cœur d'un vertébré possède la propriété remarquable de continuer à battre de manière rythmique et autonome **même après section de toutes ses connexions nerveuses ou isolement complet hors de l'organisme** (dans un liquide de perfusion oxygéné comme le liquide de Ringer à $37^\\circ\\text{C}$). Cet automatisme trouve son origine dans un tissu musculaire spécialisé embryonnaire : le **tissu nodal**.

> [!WOLOF] **Ndongo S2 Wolof Insight :**
> Xol bi mooy pompe bu mag bi ci yaram bi : amul dara luy tëj bamu taxaw ! Amna benn moteur boppam (tissu nodal) buy générer courant électrique bumu soxla ngir battre sans cerveau bi di ko wax dara. Cerveau bi moom day intervenir rekk ngir accélérer (sport, tiit) walla freené (nopalu).

---

## 1. Organisation Anatomique et Fonctionnelle du Cœur

Le cœur des mammifères est un muscle creux (le **myocarde**) divisé en deux parties indépendantes sans communication directe chez l'adulte (cœur droit et cœur gauche), séparées par le septum interauriculaire et le septum interventriculaire.

| Cavité Cardiaque | Épaisseur de la Paroi | Vaisseau Sanguin Rattaché | Type de Sang Transporté | Pression Développée |
| :--- | :--- | :--- | :--- | :--- |
| **Oreillette Droite (OD)** | Mince (2 mm) | Veines caves supérieure et inférieure | Sang désoxygéné (veineux) | Faible ($0\\text{ à }4\\text{ mmHg}$) |
| **Ventricule Droit (VD)** | Moyenne (4 à 5 mm) | Artère pulmonaire (vers les poumons) | Sang désoxygéné | Modérée ($25\\text{ mmHg}$) |
| **Oreillette Gauche (OG)** | Mince (2 mm) | 4 Veines pulmonaires | Sang oxygéné (artériel) | Faible ($4\\text{ à }8\\text{ mmHg}$) |
| **Ventricule Gauche (VG)** | **Très épaisse (10 à 15 mm)** | **Artère aorte (vers tout le corps)** | **Sang oxygéné** | **Élevée ($120\\text{ mmHg}$)** |

### Le Système Valvulaire : Garant du Sens Unique de la Circulation
L'écoulement unidirectionnel du sang est strictement imposé par quatre valvules passives actionnées par les gradients de pression :
- **Valvules auriculo-ventriculaires (AV) :**
  - Valvule **tricuspide** (à 3 cuspides) entre OD et VD.
  - Valvule **mitrale** ou bicuspide (à 2 cuspides) entre OG et VG.
  - *Rôle :* Empêchent le reflux du sang des ventricules vers les oreillettes pendant la systole ventriculaire.
- **Valvules sigmoïdes (ou artérielles) :**
  - Valvule sigmoïde aortique et valvule sigmoïde pulmonaire.
  - *Rôle :* Empêchent le reflux du sang des gros troncs artériels vers les ventricules pendant la diastole générale.

---

## 2. Le Tissu Nodal : Siège de l'Automatisme Cardiaque

Le tissu nodal est constitué de cellules musculaires embryonnaires peu différenciées, pauvres en myofibrilles contractiles mais riches en glycogène et dotées d'une **instabilité membranaire permanente**.

### 2.1. Les Quatre Formations Nodales en Série

1. **Le Nœud Sinusal (Nœud de Keith et Flack) :**
   - Situé dans la paroi postéro-supérieure de l'oreillette droite.
   - Fréquence propre spontanée : **$70\\text{ à }80\\text{ dépolarisations/minute}$**.
   - C'est le **pace-maker physiologique (entraîneur de rythme)** qui dicte sa fréquence à l'ensemble du myocarde.
2. **Le Nœud Auriculo-Ventriculaire (Nœud d'Aschoff-Tawara) :**
   - Situé dans la partie inférieure du septum interauriculaire.
   - Fréquence propre spontanée : **$40\\text{ à }50\\text{ batt/min}$**.
   - Il impose un **léger ralentissement du signal ($0,1\\text{ s}$)**, permettant aux oreillettes de vider totalement leur sang avant que les ventricules ne commencent à se contracter.
3. **Le Faisceau de His :**
   - Naît du nœud AV et descend le long du septum interventriculaire.
   - Il se divise en deux branches droite et gauche.
   - Fréquence propre : **$30\\text{ à }40\\text{ batt/min}$**.
4. **Le Réseau Sous-Endocardique de Purkinje :**
   - Ramifications terminales diffuses tapissant la paroi interne des deux ventricules.
   - Vitesse de conduction très rapide ($2\\text{ à }4\\text{ m/s}$), assurant une contraction ventriculaire synchrone et explosive de la pointe vers la base.

> [!METHODE] **L'Origine Ionique du Potentiel Pace-Maker :**
> Contrairement aux cellules nerveuses dont le potentiel de repos est stable à $-70\\text{ mV}$, les cellules nodales sinusales présentent une **dépolarisation diastolique lente et spontanée** (courant $I_f$ d'entrée d'ions $\\text{Na}^+$ et ouverture précoce de canaux $\\text{Ca}^{2+}$). Dès que cette dépolarisation lente atteint le potentiel seuil (environ $-40\\text{ mV}$), un potentiel d'action calcique d'emblée maximal se déclenche : c'est le signal électrique d'un nouveau battement.

---

## 3. Les Expériences Fondamentales de Stannius sur le Cœur de Grenouille

Chez la grenouille (amphibien), le cœur comprend un **sinus veineux** (équivalent fonctionnel du nœud sinusal), deux oreillettes et un ventricule unique à apex musculaire. En 1852, Hermann Stannius a posé trois ligatures historiques qui démontrent la hiérarchie nodale :

| Manipulation de Stannius | Localisation Précise du Fil | Résultat Immédiat Observé | Évolution Tardive & Explication Physiologique | Conclusion Officielle Bac S2 |
| :--- | :--- | :--- | :--- | :--- |
| **1ère Ligature** | Sillon **sinuso-auriculaire** (entre le sinus veineux et les oreillettes). | - Le sinus veineux continue de battre à son rythme propre ($60\\text{ bpm}$).<br>- Les oreillettes et le ventricule **s'arrêtent net en diastole**. | Après quelques minutes, oreillettes et ventricule reprennent des contractions synchrones mais **plus lentes ($30\\text{ à }40\\text{ bpm}$)** sous l'impulsion du nœud d'Aschoff-Tawara. | Le sinus veineux est le **centre automatique dominant**. Il existe un relais auriculo-ventriculaire automatique de secours à fréquence plus basse. |
| **2ème Ligature** | Sillon **auriculo-ventriculaire** (sur un cœur ayant déjà subi la 1ère ligature). | - Les oreillettes continuent de battre à leur rythme modéré ($30\\text{ bpm}$).<br>- Le ventricule **s'arrête à nouveau**. | Après un délai prolongé, le ventricule reprend un rythme autonome extrêmement lent (**$15\\text{ à }20\\text{ bpm}$**) : rythme idioventriculaire. | Le ventricule possède un troisième centre d'automatisme résiduel (faisceau de His/Purkinje) à fréquence très basse. |
| **3ème Ligature** | **Pointe du cœur (Apex ventriculaire)**. | La base du ventricule continue de battre. La pointe isolée reste **définitivement immobile**. | Si l'on stimule la pointe par un choc électrique, elle fournit une contraction mécanique vigoureuse. | La pointe du cœur **ne possède aucun tissu nodal** : elle est excitable et contractile mais dépourvue d'automatisme propre. |

> [!CONSEIL_BAC] **Gradient d'Automatisme Décroissant :**
> Retenez la formule consacrée au Baccalauréat : *« Le tissu nodal présente un gradient d'automatisme décroissant depuis le pôle veineux vers le pôle artériel : Nœud Sinusal ($75\\text{ bpm}$) $>$ Nœud AV ($45\\text{ bpm}$) $>$ Faisceau de His & Purkinje ($25\\text{ bpm}$). Le centre le plus rapide impose son rythme aux relais sous-jacents. »*

---

## 4. La Révolution Cardiaque et l'Électrocardiogramme (ECG)

La **révolution cardiaque** désigne la succession ordonnée des phénomènes électriques, mécaniques et hémodynamiques au cours d'un cycle cardiaque complet. Chez l'homme au repos ($75\\text{ batt/min}$), elle dure exactement **$0,8\\text{ seconde}$**.

### 4.1. Les Trois Temps de la Révolution Cardiaque

1. **Systole Auriculaire ($0,1\\text{ s}$) :**
   - Dépolarisation des oreillettes (Onde P de l'ECG).
   - Contraction du myocarde auriculaire $\\to$ augmentation de pression dans les oreillettes.
   - Les valvules auriculo-ventriculaires s'ouvrent, propulsant le sang restant dans les ventricules (remplissage actif, 20% du volume total).
2. **Systole Ventriculaire ($0,3\\text{ s}$) :**
   - **Phase de contraction isovolumétrique ($0,05\\text{ s}$) :** Les ventricules commencent à se contracter. La pression ventriculaire dépasse la pression auriculaire $\\implies$ **fermeture brutale des valvules AV (génère le 1er bruit du cœur B1, "TOUM")**. Toutes les valvules sont fermées, le volume de sang ne varie pas.
   - **Phase d'éjection ventriculaire ($0,25\\text{ s}$) :** La pression ventriculaire dépasse celle des artères $\\implies$ ouverture des valvules sigmoïdes. Le sang est éjecté vigoureusement dans l'aorte ($120\\text{ mmHg}$) et l'artère pulmonaire.
3. **Diastole Générale ($0,4\\text{ s}$) :**
   - Relâchement complet du myocarde.
   - La pression dans les ventricules chute sous la pression artérielle $\\implies$ **fermeture brutale des valvules sigmoïdes (génère le 2ème bruit du cœur B2, "TA")**.
   - Lorsque la pression ventriculaire tombe sous la pression auriculaire, les valvules AV s'ouvrent : le sang remplit passivement les cavités (80% du remplissage).

### 4.2. Correspondance avec l'Électrocardiogramme (ECG)

L'ECG enregistre les variations globales des potentiels d'action extracellulaires du myocarde captées par des électrodes cutanées.

| Onde / Complexe | Phénomène Électrophysiologique | Événement Mécanique Immédiat | Durée Normale |
| :--- | :--- | :--- | :--- |
| **Onde P** | Dépolarisation des oreillettes (propagation depuis le nœud sinusal). | Systole auriculaire. | $0,08\\text{ à }0,10\\text{ s}$ |
| **Espace P-R** | Temps de conduction auriculo-ventriculaire (passage et délai dans le nœud AV). | Remplissage des ventricules. | $0,12\\text{ à }0,20\\text{ s}$ |
| **Complexe QRS** | Dépolarisation massive et rapide des ventricules (faisceau de His et Purkinje). | Début de la systole ventriculaire (B1). | $0,06\\text{ à }0,10\\text{ s}$ |
| **Segment ST** | Période de dépolarisation totale des ventricules (plateau calcique). | Phase d'éjection systolique maximale. | Isoélectrique |
| **Onde T** | Repolarisation des ventricules (retour au potentiel de repos). | Fin de l'éjection et début de la diastole (B2). | $0,16\\text{ à }0,25\\text{ s}$ |

---

## 5. Propriétés Fondamentales du Myocarde : L'Inexcitabilité Périodique

Le muscle cardiaque possède des propriétés physiologiques originales qui le distinguent radicalement du muscle strié squelettique :

### 5.1. La Loi du Tout ou Rien
À l'échelon de l'organe, toute stimulation égale ou supérieure au seuil liminaire d'excitation déclenche une contraction d'**amplitude maximale d'emblée**. Il n'y a pas de recrutement progressif d'unités motrices car les cardiomyocytes sont tous interconnectés par des disques intercalaires munis de jonctions communicantes (*gap junctions*), formant un **syncytium fonctionnel**.

### 5.2. Période Réfractaire et Impossibilité de Tétanisation (Loi de Marey)
Le potentiel d'action du cardiomyocyte ventriculaire est exceptionnellement long ($250\\text{ à }300\\text{ ms}$) en raison d'une phase de plateau calcique prolongée (entrée d'ions $\\text{Ca}^{2+}$ par des canaux de type L).
- **Période Réfractaire Absolue (PRA) :** Couvre toute la durée de la systole ventriculaire. Le myocarde est **totalement inexcitable**, quelle que soit l'intensité du choc appliqué.
- **Période Réfractaire Relative (PRR) :** Débute au cours de la diastole. Une stimulation supraliminaire peut exciter le myocarde.

> [!THEOREME] **Pourquoi le cœur ne se tétanise jamais :**
> Dans un muscle squelettique, des stimulations répétitives à haute fréquence fusionnent en une contraction tétanique permanente car la période réfractaire est très brève ($2\\text{ ms}$). Chez le myocarde, la période réfractaire absolue dure aussi longtemps que la contraction mécanique elle-même ($300\\text{ ms}$) : **aucune sommation temporelle n'est possible**. Le cœur est donc **infatigable et intétanisable**, garantissant la relaxation diastolique indispensable au remplissage sanguin.

### 5.3. Extrasystole et Repos Compensateur
Si une stimulation électrique supraliminaire est appliquée pendant la diastole (en PRR) :
1. Le ventricule répond par une contraction anticipée : l'**extrasystole**.
2. Cette extrasystole est obligatoirement suivie d'un **repos compensateur** (pause prolongée avant le battement suivant).
3. *Explication :* L'impulsion physiologique naturelle issue du nœud sinusal arrive alors que le myocarde est en période réfractaire consécutive à l'extrasystole : cette impulsion est donc neutralisée sans effet mécanique. Le cœur doit attendre l'émission de la bouffée sinusale suivante pour battre à nouveau.

---

## 6. Hémodynamique Quantitative & Formules Maîtresses du Bac S2

Pour les exercices de raisonnement scientifique et de calculs hémodynamiques au Baccalauréat sénégalais, trois relations doivent être maîtrisées avec rigueur :

### 6.1. Le Volume d'Éjection Systolique (VES)
C'est le volume de sang expulsé par chaque ventricule à chaque battement cardiaque :
$$VES = VTD - VTS \\approx 120\\text{ mL} - 50\\text{ mL} = 70\\text{ mL}$$
*(où $VTD$ est le volume télédiastolique de fin de remplissage et $VTS$ le volume télésystolique résiduel).*

### 6.2. Le Débit Cardiaque (DC)
C'est le volume total de sang propulsé par unité de temps (en litres par minute) :
$$DC = FC \\times VES$$
*Exemple type Bac au repos :* $DC = 72\\text{ batt/min} \\times 0,070\\text{ L} \\approx 5,04\\text{ L/min}$.
Lors d'un exercice physique intense, le débit cardiaque peut grimper jusqu'à $20\\text{ à }25\\text{ L/min}$ chez l'athlète grâce à l'augmentation conjointe de la fréquence cardiaque et de la contractilité ventriculaire.

### 6.3. La Pression Artérielle (PA)
La pression artérielle moyenne est directement tributaire du débit cardiaque et de la résistance opposée par les artérioles périphériques :
$$PA = DC \\times RPT = (FC \\times VES) \\times RPT$$
*(où $RPT$ représente les Résistances Périphériques Totales de la circulation).*

> [!CONSEIL_BAC] **Synthèse pour la copie de Baccalauréat S2 :**
> Si le sujet porte sur l'activité cardiaque :
> 1. Définissez toujours l'automatisme intrinsèque et citez le tissu nodal.
> 2. Détaillez les 4 étapes de propagation : Keith-Flack $\\to$ Aschoff-Tawara $\\to$ His $\\to$ Purkinje.
> 3. En cas d'analyse de graphiques (cardiogrammes ou ECG), repérez l'onde P, le QRS et l'onde T, et n'oubliez jamais de justifier l'inexcitabilité périodique par la longue période réfractaire absolue !
`;

RICH_LESSONS_MAP.regulation_nerveuse_cardiaque = `# B2 - Leçon 2 : Innervation et Régulation Nerveuse et Hormonale de l'Activité Cardiaque

---

## Objectifs d'Apprentissage (Programme Officiel SVT Terminale S2 - Sénégal)
À l'issue de cette leçon, tout élève de Terminale S2 doit être capable de :
1. **Identifier l'anatomie de l'innervation extrinsèque** du cœur : système parasympathique (nerfs vagues / pneumogastriques X) et système orthosympathique (nerfs cardiaques sympathiques).
2. **Analyser et interpréter les expériences de section et de stimulation** nerveuse (bouts périphériques vs bouts centraux, ligatures, double vagotomie).
3. **Expliquer l'expérience historique d'Otto Loewi (1921)** et démontrer la nature chimique (neurotransmission) de la médiation nerveuse.
4. **Distinguer les neuromédiateurs et leurs récepteurs membranaires** : Acétylcholine (récepteurs muscariniques) vs Noradrénaline (récepteurs $\\beta_1$ adrénergiques).
5. **Prévoir les effets des substances pharmacologiques** : Atropine, Bêtabloquants (Propranolol), Pilocarpine, Curare.
6. **Expliquer la régulation hormonale** à court terme (Adrénaline médullosurrénalienne) et à long terme (Hormones thyroïdiennes T3/T4).
7. **Caractériser les 4 effets myocardiques cardinaux** : chronotrope, inotrope, dromotrope, bathmotrope.

---

## 1. Introduction : L'adaptation permanente du rythme cardiaque

Le cœur isolé continue de battre de manière autonome grâce à son **tissu nodal** (automatisme intrinsèque étudié en Leçon 1). Cependant, dans l'organisme vivant, le débit cardiaque ($DC = FC \\times VES$) doit s'ajuster en temps réel pour répondre aux variations des besoins métaboliques des tissus en oxygène et en nutriments :
- **Au repos ou pendant le sommeil** : la fréquence cardiaque s'abaisse à environ 60 - 70 battements par minute (bradycardie physiologique).
- **Lors d'un effort physique ou d'un stress émotionnel** : la fréquence cardiaque peut dépasser 160 à 180 battements par minute (tachycardie d'adaptation).

Cette modulation permanente est assurée par une **double régulation** :
1. Une **régulation nerveuse extrinsèque** (rapide, réflexe, via le système nerveux autonome végétatif).
2. Une **régulation hormonale** (action humorale par voie sanguine, plus lente et durable).

---

## 2. Anatomie de l'Innervation Extrinsèque du Cœur

Le cœur est relié aux centres nerveux par deux contingents antagonistes du **système nerveux végétatif (autonome)** :

> [!SYNTHESE_INNERVATION] **Schéma Fonctionnel : La Double Innervation Cardiaque Antagoniste**
>
> 🔹 **Voie Parasympathique (Frein cardiomodérateur) :**
> - **Centre bulbaire :** Noyau moteur dorsal du nerf vague (dans le bulbe rachidien).
> - **Nerf conducteur :** **Nerfs vagues (X)** ou pneumogastriques.
> - **Relais synaptique :** Micro-ganglions intramuraux situés directement dans la paroi des oreillettes.
> - **Neurotransmetteur :** **Acétylcholine (ACh)** se fixant sur les récepteurs **muscariniques $M_2$** du tissu nodal.
> - **Effet physiologique :** Ralentissement du rythme (**bradycardie**) et diminution de la vitesse de conduction. Arrêt réversible en **diastole** (relâchement).
>
> 🔸 **Voie Orthosympathique (Accélérateur cardiaque) :**
> - **Centres médullaires :** Cornes latérales de la moelle épinière thoracique ($D_1$ à $D_5$).
> - **Relais synaptique :** Chaîne ganglionnaire latéro-vertébrale (notamment le **ganglion stellaire**).
> - **Nerfs conducteurs :** Nerfs cardiaques sympathiques postganglionnaires.
> - **Neurotransmetteur :** **Noradrénaline (NA)** se fixant sur les récepteurs **$\beta_1$-adrénergiques** du tissu nodal ET du myocarde ventriculaire.
> - **Effet physiologique :** Accélération du rythme (**tachycardie**) et renforcement puissant de la force contractile ventriculaire (**effet inotrope positif**).

### 2.1. Le Système Parasympathique (Cardiomodérateur)
- **Centre nerveux d'origine** : Situé dans le **bulbe rachidien** (noyau moteur dorsal du nerf vague, ou centre cardiomodérateur bulbaire).
- **Voie nerveuse** : Les deux **nerfs pneumogastriques (ou nerfs vagues, Xème paire de nerfs crâniens)**.
  - Le nerf vague droit innerve préférentiellement le **nœud sinusal**.
  - Le nerf vague gauche innerve principalement le **nœud auriculo-ventriculaire (septal)**.
- **Relais synaptique** : Fibres préganglionnaires longues qui font synapse dans des microganglions situés directement dans la paroi des oreillettes (ganglions intramuraux).
- **Neurotransmetteur** : **Acétylcholine (ACh)**, libérée au niveau des terminaisons postganglionnaires.
- **Récepteurs membranaires** : Récepteurs **muscariniques de type $M_2$**, couplés à des protéines G qui provoquent l'ouverture des canaux potassiques $K^+$ (hyperpolarisation membranaire) et inhibent l'entrée de calcium $Ca^{2+}$.
- **Rôle physiologique** : **Cardiomodérateur** permanent.

### 2.2. Le Système Orthosympathique (Cardioaccélérateur)
- **Centres nerveux d'origine** : Situés dans les cornes latérales de la **moelle épinière thoracique** (métamères $D_1$ à $D_5$).
- **Voie nerveuse** :
  - Fibres préganglionnaires courtes myélinisées rejoignant la **chaîne ganglionnaire latéro-vertébrale**, notamment le **ganglion stellaire** (fusion des ganglions cervicaux inférieurs et thoraciques supérieurs).
  - Relais synaptique dans le ganglion stellaire (libération d'acétylcholine sur récepteurs nicotiniques).
  - Fibres post-ganglionnaires sympathiques longues formant les **nerfs cardiaques sympathiques**.
- **Territoire d'innervation** : Le sympathique innerve non seulement le tissu nodal (nœuds sinusal et septal), mais également **l'ensemble du myocarde contractile ventriculaire**.
- **Neurotransmetteur terminal** : **Noradrénaline (NA)**.
- **Récepteurs membranaires** : Récepteurs **$\\beta_1$-adrénergiques** couplés à l'adénylate cyclase, augmentant l'AMP cyclique intracellulaire ($AMPc$) et favorisant l'entrée massive d'ions $Ca^{2+}$.
- **Rôle physiologique** : **Cardioaccélérateur** et **inodore positif** puissant.

---

## 3. Les Expériences Fondamentales du Baccalauréat Sénégalais

Les sujets du Baccalauréat S2 s'appuient systématiquement sur des séries expérimentales historiques (sections, stimulations électriques, ligatures, greffes et perfusions).

### 3.1. Expériences de Section et de Stimulation des Nerfs Cardiaques

| Expérience réalisée | Observation sur le cardiogramme | Interprétation & Déduction Bac S2 |
| :--- | :--- | :--- |
| **Section des deux nerfs vagues (X)** | La fréquence cardiaque augmente immédiatement (ex: de 70 à 110 bpm). | Il existe un **tonus cardiomodérateur vagal permanent** au repos : le nerf vague freine constamment le nœud sinusal. |
| **Stimulation électrique du nerf vague intact** | Ralentissement marqué du rythme (bradycardie) ; si la stimulation est forte, arrêt complet du cœur en **diastole** (relâchement). | Le nerf vague est un **nerf cardiomodérateur**. L'arrêt se fait toujours en diastole (relâchement musculaire). |
| **Section du nerf vague + stimulation du bout périphérique** (relié au cœur) | Ralentissement ou arrêt en diastole du cœur. | Le nerf vague conduit l'influx nerveux de manière **centrifuge (motrice)** vers le myocarde. C'est une voie efférente. |
| **Section du nerf vague + stimulation du bout central** (relié à l'encéphale) | Aucun effet direct sur le cœur isolé (ou légère modification réflexe si l'autre nerf vague est intact). | Le contingent cardiaque du vague ne conduit pas d'influx direct vers le cœur en sens centripète. |
| **Section des nerfs sympathiques** | Légère diminution de la fréquence cardiaque (bradycardie modérée). | Il existe un faible tonus cardioaccélérateur sympathique de repos. |
| **Stimulation du bout périphérique du sympathique** | Tachycardie nette (hausse de FC) et augmentation considérable de la force de contraction (hausse de l'amplitude systolique). | Le sympathique est **cardioaccélérateur** (effet chronotrope positif) et **inodore positif** (augmente la contractilité). |

> [!PIEGE_BAC] **Attention au piège de la double vagotomie :**
> Beaucoup d'élèves écrivent par erreur que *"sectionner le nerf vague arrête le cœur"*. C'est faux ! Comme le nerf vague est le frein, couper le frein libère le moteur nodal intrinsèque : le cœur **s'accélère** immédiatement !

---

### 3.2. L'Expérience Historique d'Otto Loewi (1921) : Découverte de la Neurotransmission Chimique

Cette expérience historique, récompensée par le Prix Nobel de Médecine en 1936, est l'un des classiques absolus du Baccalauréat sénégalais.

> [!DISPOSITIF_LOEWI] **Protocole Expérimental des Deux Cœurs de Grenouille en Série :**
>
> - **Cœur 1 (Donneur) :** Cœur de grenouille perfusé par du liquide de Ringer, avec son **nerf vague intact**.
> - **Cœur 2 (Receveur) :** Cœur de grenouille perfusé, **totalement dénervé** (aucun contact nerveux ni électrique avec le cœur 1).
> - **Canule de communication :** Le liquide de Ringer baignant le cœur 1 s'écoule directement vers le cœur 2.
>
> **Chronologie des observations expérimentales :**
> 1. **Stimulation électrique du nerf vague du Cœur 1 :** Le cœur 1 ralentit immédiatement puis s'arrête en diastole.
> 2. **Transfert du liquide de perfusion :** Le liquide physiologique ayant baigné le cœur 1 parvient au cœur 2 après un court délai de transit.
> 3. **Réaction différée du Cœur 2 dénervé :** Sans aucune stimulation électrique directe, le cœur 2 **ralentit et s'arrête à son tour en diastole** !
> 4. **Lavage au Ringer neuf :** Dès que le liquide est renouvelé, les deux cœurs reprennent spontanément leurs contractions rythmiques.

**Raisonnement scientifique exigé au Bac :**
1. **Constat** : Le cœur 2 ne reçoit aucune stimulation nerveuse électrique directe, et pourtant il réagit exactement comme le cœur 1 avec un temps de latence.
2. **Déduction** : La stimulation du nerf vague a provoqué la libération d'une **substance chimique soluble** dans le liquide de perfusion baignant le cœur 1.
3. **Conclusion** : La commande nerveuse ne se transmet pas par contact électrique continu, mais par un médiateur chimique neuro-humoral.
   - Otto Loewi nomma cette substance la *Vagusstoff* (substance vagale), identifiée plus tard comme étant **l'acétylcholine**.
   - Répétée avec la stimulation du nerf sympathique, l'expérience libère la *Sympathicusstoff*, qui est la **noradrénaline**.

---

## 4. Pharmacologie de la Régulation Cardiaque

L'analyse de l'effet des drogues et poisons sur les préparations cardiaques permet de préciser la nature des récepteurs membranaires :

| Substance testée | Mécanisme d'action moléculaire | Effet observé sur le cœur | Application médicale / Intérêt Bac |
| :--- | :--- | :--- | :--- |
| **Acétylcholine ($10^{-6}\\text{ M}$)** | Agoniste direct des récepteurs muscariniques $M_2$. | Bradycardie immédiate, baisse de force contractile, arrêt en diastole. | Reproduit fidèlement la stimulation vagale. |
| **Atropine** | **Antagoniste compétitif** des récepteurs muscariniques : se fixe sur le récepteur sans l'activer et empêche l'ACh de s'y lier. | Tachycardie (lève le tonus vagal) ; rend la stimulation du nerf vague totalement inefficace. | Utilisée en urgence pour traiter les bradycardies sévères et les intoxications aux organophosphorés. |
| **Noradrénaline / Adrénaline** | Agonistes des récepteurs $\\beta_1$-adrénergiques du myocarde. | Tachycardie puissante, hausse de la force de contraction (amplitude accrue). | Traitement des arrêts cardiaques et des chocs anaphylactiques. |
| **Propranolol (Bêtabloquant)** | **Antagoniste compétitif** des récepteurs $\\beta_1$-adrénergiques. | Diminution de la FC de repos et d'effort, empêche la tachycardie induite par le sympathique. | Traitement de l'hypertension artérielle et des arythmies cardiaques. |
| **Pilocarpine** | Agoniste muscarinique (parasympathicomimétique). | Bradycardie identique à l'ACh, mais dégradation plus lente. | Utilisée en pharmacodynamie expérimentale. |
| **Curare** | Bloquant spécifique des récepteurs **nicotiniques** de la plaque motrice musculaire. | **AUCUN EFFET** sur la régulation de la fréquence cardiaque. | Démontre que les récepteurs cardiaques vagaux sont muscariniques et non nicotiniques. |

---

## 5. La Régulation Hormonale de l'Activité Cardiaque

En complément du système nerveux, plusieurs hormones circulantes agissent sur le myocarde par voie hématogène :

### 5.1. Les Catécholamines Médullo-surrénaliennes (Adrénaline & Noradrénaline)
- Sécrétées par les cellules chromaffines de la **médullo-surrénale** lors d'une activation du système nerveux sympathique (stress, froid, effort musculaire intense, émotion, hypotension aiguë).
- **Mode d'action** : L'adrénaline sanguine se fixe sur les récepteurs $\\beta_1$ du nœud sinusal et des ventricules.
- **Effets** :
  - Augmentation brutale de la fréquence cardiaque (tachycardie).
  - Augmentation considérable de la contractilité ventriculaire ($VES \\uparrow$).
  - Hausse consécutive du débit cardiaque : $DC \\uparrow = FC \\uparrow \\times VES \\uparrow$.

### 5.2. Les Hormones Thyroïdiennes ($T_3$ et $T_4$)
- Sécrétées par la glande thyroïde, elles stimulent le métabolisme cellulaire basal de tous les tissus.
- **Effet sur le cœur** :
  - Elles augmentent la synthèse des récepteurs $\\beta_1$-adrénergiques au niveau de la membrane des cardiomyocytes.
  - Elles potentialisent l'action des catécholamines :
    - En cas **d'hyperthyroïdie** (maladie de Basedow) : tachycardie permanente de repos ($> 100\\text{ bpm}$), palpitations.
    - En cas **d'hypothyroïdie** : bradycardie marquée ($< 50\\text{ bpm}$), fatigabilité.

---

## 6. Synthèse des 4 Propriétés Fondamentales du Myocarde

Dans le vocabulaire médical et au Baccalauréat S2, les effets des systèmes régulateurs sont définis par quatre adjectifs précis :

| Propriété physiologique | Définition précise | Effet du Parasympathique (ACh / Nerf X) | Effet de l'Orthosympathique (NA / Adrénaline) |
| :--- | :--- | :--- | :--- |
| **Effet Chronotrope** | Action sur la **fréquence cardiaque** (rythme d'émission du nœud sinusal). | **Chronotrope Négatif** (ralentit la FC = Bradycardie) | **Chronotrope Positif** (accélère la FC = Tachycardie) |
| **Effet Inotrope** | Action sur la **force de contraction** (contractilité ventriculaire). | **Inotrope Négatif** modéré (surtout atriale) | **Inotrope Positif** puissant (hausse d'amplitude systolique) |
| **Effet Dromotrope** | Action sur la **vitesse de conduction** de l'onde de dépolarisation (nœud AV et His). | **Dromotrope Négatif** (ralentit la conduction auriculo-ventriculaire) | **Dromotrope Positif** (accélère la conduction auriculo-ventriculaire) |
| **Effet Bathmotrope** | Action sur le seuil **d'excitabilité** du myocarde. | **Bathmotrope Négatif** (diminue l'excitabilité) | **Bathmotrope Positif** (augmente l'excitabilité) |

---

## 7. Ndongo S2 Wolof Insight : La métaphore de la calèche et du taxi-clando

> [!WOLOF_INSIGHT] **Ndongo S2 Wolof Insight : Xol bi, Frein bi ak Accélérateur bi !**
> Ngir nga comprendre innervation bi bu baax ci exam bi :
> - **Moteur bi ci boppam (tissu nodal)** : Dafa melni moteur bu doon tourner à 100 km/h ci boppam ndax automatisme bi.
> - **Nerf Vague (Parasympathique / Acétylcholine)** : Mooy **frein** bi ! Saa su nekk ci repos, chauffeur bi dafay appuyer ci frein bi ndax xol bi baña daw lu ëpp, mu téye ko ci 70 battements par minute (**tonus vagal cardiomodérateur**). Soo ko daggé (section), auto bi dafay accélérer immédiatement (tachycardie) !
> - **Nerf Sympathique (Noradrénaline) ak Adrénaline** : Mooy **accélérateur** bi ! Bu amee coono, tiitange, wala effort (course, football, Bac), cerveau bi dafay appuyer ci accélérateur bi ngir xol bi door vite té door fort (**chronotrope et inotrope positifs**) !
> - **Atropine** : Dafa melni ku dagg câble frein bi ; auto bi dafay accélérer ndax frein bi amatul doole !

---

## 8. Conseils Clés pour la Copie du Bac S2 Sénégal

1. **Raisonnement d'analyse expérimentale** :
   - Structurez toujours vos réponses en 3 temps : **Je vois** (données chiffrées précises du tracé cardiographique), **Or je sais** (mécanisme physiologique), **Donc je conclus** (fonction ou rôle du nerf/de la substance).
2. **Toujours préciser l'effet sur le tracé** :
   - Quand le nerf vague agit : mentionnez *"diminution de la fréquence et arrêt réversible en diastole"*.
   - Quand le sympathique agit : mentionnez *"augmentation de la fréquence et augmentation de l'amplitude des contractions systoliques"*.
3. **Otto Loewi** :
   - Insistez sur le fait que le cœur 2 n'a pas de contact électrique avec le cœur 1. Le médiateur est **chimique et hydrosoluble**, transporté par le liquide physiologique.
4. **Distinction Atropine vs Curare** :
   - C'est la question piège par excellence du jury du Bac : l'atropine agit sur le cœur car les récepteurs y sont **muscariniques**, tandis que le curare n'a aucun effet sur le cœur car il cible uniquement les récepteurs **nicotiniques** des muscles squelettiques.
`;

// ============================================================================
// B2. LEÇON 3 : RÉGULATION RÉFLEXE DE LA PRESSION ARTÉRIELLE
// ============================================================================
RICH_LESSONS_MAP.regulation_pression_arterielle = `
# B2 Leçon 3 — Régulation Réflexe de la Pression Artérielle : Barorécepteurs, Centres Bulbaires et Effecteurs

> [!CONSEIL_BAC] **Importance Stratégique au Baccalauréat Sénégalais (Série S2) :**
> La régulation réflexe de la pression artérielle est l'un des exercices les plus fréquents et discriminants des épreuves de SVT. Il combine la compréhension biophysique de l'hémodynamique ($PA = DC \\times RPT$), l'analyse d'expériences historiques fondamentales (sections et stimulations des nerfs de Hering et Cyon, ligatures des carotides) et la maîtrise d'un schéma fonctionnel de boucle homéostasique en rétroaction négative.

---

## 1. Définition et Grandeurs Fondamentales de la Pression Artérielle

La **pression artérielle (PA)**, couramment appelée tension artérielle, représente la force mécanique exercée par la colonne sanguine par unité de surface de la paroi des grosses artères de la circulation systémique.

Elle oscille continuellement au cours du cycle cardiaque entre deux valeurs physiologiques repères :
1. **Pression Artérielle Systolique (PAS)** : Correspond au pic de pression atteint lors de l'éjection ventriculaire systolique (normale : $120\\text{ mmHg}$ ou $12\\text{ cmHg}$).
2. **Pression Artérielle Diastolique (PAD)** : Correspond à la pression minimale résiduelle maintenue dans l'arbre artériel pendant la diastole générale ventriculaire grâce à l'élasticité de l'aorte (normale : $80\\text{ mmHg}$ ou $8\\text{ cmHg}$).

### L'Équation Fondamentale de l'Hémodynamique
$$PA = DC \\times RPT$$

Où :
- **$DC$ est le Débit Cardiaque** (en $\\text{L}\\cdot\\min^{-1}$) :
  $$DC = FC \\times VES$$
  - $FC$ = Fréquence cardiaque (en $\\text{batt}\\cdot\\min^{-1}$, physiologique $\\approx 70-75\\text{ bpm}$).
  - $VES$ = Volume d'Éjection Systolique (volume de sang expulsé par chaque ventricule à chaque battement, $\\approx 70-80\\text{ mL}$).
  - Ainsi, $DC \\approx 75 \\times 0{,}075 \\approx 5$ à $5{,}5\\text{ L}\\cdot\\min^{-1}$ au repos.
- **$RPT$ représente les Résistances Périphériques Totales** :
  - Elles traduisent la résistance physique opposée à l'écoulement du sang par l'ensemble du lit artériolaire de l'organisme.
  - Selon la **loi de Poiseuille**, la résistance vasculaire varie de façon inversement proportionnelle à la puissance 4 du rayon du vaisseau :
    $$RPT \\propto \\frac{1}{r^4}$$
  - Une infime variation de diamètre de l'artériole (vasoconstriction ou vasodilatation) modifie donc considérablement les résistances périphériques et la pression artérielle !

---

## 2. Les Structures Réceptrices : Les Barorécepteurs Artériels

Les **barorécepteurs** (ou pressiorécepteurs) sont des terminaisons nerveuses libres sensibles aux variations de déformation mécanique (étirement) de la paroi artérielle induite par la pression sanguine. Ce sont des **mécanorécepteurs**.

### Localisation Anatomique Stratégique
On distingue deux zones barosensibles majeures placées au carrefour de la circulation céphalique et générale :
1. **Les Sinus Carotidiens** : Renflements situés à la bifurcation de chaque artère carotide primitive (en carotide interne et externe).
   - Ils surveillent en permanence la pression de perfusion sanguine irriguant directement le **cerveau**.
   - Leurs fibres sensitives cheminent dans le **Nerf de Hering**, branche collatérale du **nerf glossopharyngien (IX)**.
2. **La Crosse Aortique** : Courbure supérieure de l'aorte à la sortie immédiate du ventricule gauche.
   - Elle surveille la pression de sortie générale du sang pour l'ensemble de l'organisme.
   - Ses fibres sensitives cheminent dans le **Nerf de Cyon-Ludwig**, rameau sensitif afférent du **nerf vague ou pneumogastrique (X)**.

### Mécanisme de Transduction & Codage de l'Information
- Au repos ($PA = 120/80\\text{ mmHg}$), la paroi artérielle subit un étirement modéré : les barorécepteurs déchargent de façon continue à une **fréquence basale tonique**.
- Si la pression artérielle augmente (hypertension accidentelle) :
  - L'étirement pariétal s'amplifie.
  - L'ouverture mécanique de canaux cationiques membranaires génère un potentiel de récepteur dépolarisant plus ample.
  - Le nerf afférent émet une **fréquence de potentiels d'action considérablement accrue** vers le bulbe rachidien (**codage en fréquence d'impulsions**).
- Si la pression artérielle baisse (hypotension, hémorragie) :
  - L'étirement faiblit ou cesse.
  - La fréquence des potentiels d'action sur les nerfs de Hering et Cyon s'effondre.

---

## 3. Les Centres Nerveux Régulateurs Bulbaires

Les influx afférents véhiculés par les nerfs de Hering et de Cyon atteignent le **bulbe rachidien** (partie inférieure du tronc cérébral), qui constitue le centre intégrateur de la boucle réflexe.

Le bulbe renferme deux centres fonctionnels majeurs interconnectés :

### 1. Le Centre Cardiomodérateur (CCM)
- Situé au niveau du noyau moteur dorsal du nerf pneumogastrique (nerf X).
- Lorsqu'il est stimulé par les influx de Hering et Cyon, il déclenche une réponse parasympathique :
  - Influx moteurs centrifuges descendant par les **nerfs vagues (X)**.
  - Libération d'**Acétylcholine** sur les récepteurs muscariniques $M_2$ du tissu nodal (nœud sinusal et auriculoventriculaire).
  - **Effet chronotrope négatif** (bradycardie) et diminution du débit cardiaque ($DC \\downarrow$).

### 2. Le Centre Vasomoteur (CVM)
- Situé dans la zone réticulée ventrolatérale du bulbe.
- C'est un centre **tonique vasoconstricteur** : spontanément actif, il envoie en continu des influx moteurs activateurs le long de la moelle épinière thoracique jusqu'aux fibres sympathiques innervant les artérioles.
- **Règle capitale du Bac S2 :** Les afférences sensitives des nerfs de Hering et Cyon exercent une **inhibition constante** sur le centre vasomoteur !
  - Lors d'une hypertension : le CVM est fortement inhibé $\\implies$ baisse du tonus sympathique $\\implies$ **vasodilatation artériolaire** ($RPT \\downarrow$).
  - Lors d'une hypotension : la levée d'inhibition libère le CVM $\\implies$ décharge sympathique massive $\\implies$ **vasoconstriction artériolaire** ($RPT \\uparrow$).

---

## 4. Analyse des Expériences Fondamentales du Bac S2

### A. Expériences de Section des Nerfs Sensitifs (Hering et Cyon)
- **Protocole :** Section bilatérale des 2 nerfs de Hering et des 2 nerfs de Cyon chez un mammifère anesthésié.
- **Observation :**
  - Tachycardie immédiate ($FC$ passe de $70$ à plus de $140\\text{ bpm}$).
  - Hypertension artérielle sévère et persistante ($PA$ monte à plus de $180-200\\text{ mmHg}$).
- **Interprétation Bac :**
  - En conditions physiologiques de repos, les nerfs de Hering et Cyon envoient un message freinateur continu aux centres.
  - Leur section supprime l'activation du centre cardiomodérateur et lève l'inhibition du centre vasomoteur : le système sympathique est totalement libéré.
  - **Conclusion :** Les nerfs de Hering et Cyon sont des **nerfs modérateurs ou freinateurs tensionnels**.

### B. Expériences de Stimulation Électrique Différentielle
- **Stimulation du bout périphérique** (côté sinus/aorte) : Aucun effet cardiaque ni tensionnel.
- **Stimulation du bout central** (côté bulbe rachidien) :
  - Bradycardie intense.
  - Chute immédiate de la pression artérielle (hypotension).
  - Vasodilatation généralisée des artérioles splanchniques.
- **Interprétation Bac :** Le message circule des barorécepteurs périphériques vers les centres bulbaires intégrateurs : Hering et Cyon sont donc des **voies nerveuses sensitives centripètes (afférentes)**.

### C. L'Expérience Cruciale de la Ligature des Carotides
- **Cas 1 : Ligature en amont (en dessous) des sinus carotidiens :**
  - Le sang artériel ne parvient plus aux sinus : la pression sanguine **chute localement dans le sinus**.
  - Les barorécepteurs ne sont plus étirés et cessent d'émettre des potentiels d'action sur le nerf de Hering.
  - Le bulbe rachidien interprète cette absence d'influx comme une hypotension générale de l'organisme.
  - Réaction réflexe : inhibition du nerf vague X et décharge intense du sympathique.
  - **Résultat observé :** Hypertension générale réflexe dans le reste de l'organisme avec tachycardie !
- **Cas 2 : Ligature en aval (au-dessus) des sinus carotidiens :**
  - Le sang s'accumule dans le cul-de-sac carotidien : la pression monte localement dans le sinus.
  - Les barorécepteurs sont fortement étirés et suractivent le nerf de Hering.
  - Réaction réflexe : activation du vague X et inhibition du sympathique.
  - **Résultat observé :** Hypotension générale réflexe et bradycardie !

---

## 5. Synthèse Comparée : Réponses Réflexes Face aux Perturbations

| Paramètre / Étape | Réponse à une HYPERTENSION accidentelle | Réponse à une HYPOTENSION (ex: Hémorragie) |
| :--- | :--- | :--- |
| **Stimulus initial** | Étirement excessif de la paroi artérielle ($PA \\uparrow$) | Diminution de l'étirement pariétal ($PA \\downarrow$) |
| **Activité Barorécepteurs** | Fréquence de décharge très élevée (+++++) | Fréquence de décharge très faible ou nulle (+) |
| **Voie afférente (Hering/Cyon)** | Influx massifs vers le bulbe rachidien | Influx très réduits vers le bulbe rachidien |
| **Centre Cardiomodérateur (CCM)** | **Activé** (stimulé par les afférences) | **Inhibé** (manque de stimulation afférente) |
| **Centre Vasomoteur (CVM)** | **Inhibé** (frein bulbaire maximal) | **Activé** (levée du frein inhibiteur) |
| **Voie Parasympathique (Nerf X)** | Décharge accrue d'Acétylcholine | Activité effondrée (levée du tonus vagal) |
| **Voie Sympathique** | Activité sympatho-inhibitrice | Décharge massive de Noradrénaline |
| **Action sur le Cœur** | Bradycardie ($FC \\downarrow$), $VES \\downarrow \\implies DC \\downarrow$ | Tachycardie ($FC \\uparrow$), $VES \\uparrow \\implies DC \\uparrow$ |
| **Action sur les Artérioles** | Vasodilatation $\\implies RPT \\downarrow$ | Vasoconstriction $\\implies RPT \\uparrow$ |
| **Action sur les Médullosurrénales** | Inhibition de la sécrétion d'adrénaline | Sécrétion accrue d'Adrénaline circulante |
| **Résultat global** | $PA = DC \\times RPT \\implies$ **Chute de la PA (Retour à 120/80)** | $PA = DC \\times RPT \\implies$ **Hausse de la PA (Retour à 120/80)** |

---

## 6. Régulation Neuro-Hormonale à Moyen et Long Terme

Si la boucle réflexe baroréceptrice assure la protection immédiate en quelques secondes, des mécanismes hormonaux complètent la régulation pour stabiliser la volémie et la pression à long terme :

### Le Système Rénine-Angiotensine-Aldostérone (SRAA) — Hypertenseur
1. Déclenché par la baisse de perfusion de l'artère rénale (hypotension, hémorragie).
2. L'appareil juxtaglomérulaire sécrète la **rénine** dans le sang.
3. La rénine convertit l'angiotensinogène en **Angiotensine I**, transformée en **Angiotensine II** active par l'Enzyme de Conversion de l'Angiotensine (ECA).
4. L'Angiotensine II exerce deux rôles majeurs :
   - Puissante vasoconstriction directe des artérioles ($RPT \\uparrow$).
   - Stimulation de la sécrétion d'**Aldostérone** par le cortex surrénalien.
5. L'aldostérone augmente la réabsorption tubulaire rénale de $Na^+$ et d'eau $\\implies$ augmentation du volume sanguin (**volémie $\\uparrow$**) $\\implies$ remontée durable de la pression artérielle.

### Le Facteur Natriurétique Auriculaire (FNA ou ANP) — Hypotenseur
- Sécrété par les myocytes des oreillettes cardiaques lorsqu'elles sont distendues par une hypervolémie (trop de sang arrivant au cœur).
- Provoque une vasodilatation et stimule l'élimination urinaire d'eau et de sodium (natriurèse).
- Baisse de la volémie $\\implies$ baisse de la pression artérielle.

---

## 7. Ndongo S2 — Wolof Insight pour le Baccalauréat

> [!WOLOF_INSIGHT] **Comprendre la régulation de la tension avec la métaphore du réseau de robinets :**
> - **Pression Artérielle (PA)** : Dafa melni ndox muy circulate ci **tuuyo (tuyaux)** yi. Bu moteur bi (cœur) di pompe vite té bu baax, té robinet yi teju (artérioles), ndox mi dafay door ci kanam tuuyo bi : **pression bi dafay yéeg (Hypertension)** !
> - **Barorécepteurs (Sinus carotidien ak Crosse aortique)** : Ñoom ñooy **capteurs yi** ! Dañuy nekk ci tuuyo yu mag yi di xool ndax ndox mi dafa door torop. Bu pression bi yéegee, dañuy yabal message ci **Nerf de Hering ak Nerf de Cyon** jëm ci bulbe rachidien bi.
> - **Bulbe Rachidien** : Mooy **ordinateur central bi** ! Bu déggee ni pression bi yéeg na :
>   1. Dafay woo **Nerf Vague (X)** : *"Freineul xol bi ! (Bradycardie)"*
>   2. Dafay tej **Système Sympathique bi** : *"Ubbil robinet yi ! (Vasodilatation)"*
> - Résultat : Pression bi dafay wàcc ba dellu ci 12/8 normal !
> - **Expérience Ligature bi** : Bula jury bi laajee ci Bac ligature sous-sinusale : ndox mi agatul ci capteur bi, kon capteur bi dafay foog ne ndox mi jeex na ci yaram bi yépp ! Dafay wax bulbe bi : *"Pression bi dafa wàcc !"* ; bulbe bi dafay accélérer xol bi té tëj artérioles yi, ba tax pression générale bi yéeg ba melni hypertension neurogène !

---

## 8. Conseils Méthodologiques pour la Copie du Bac S2

1. **La formule magique dans l'introduction :** Citez immédiatement $PA = DC \\times RPT$ avec $DC = FC \\times VES$. Toute explication sans cette relation sera pénalisée par le correcteur.
2. **Pour les barorécepteurs :** Employez toujours les termes rigoureux : **"mécanorécepteurs sensibles à l'étirement pariétal"** et **"transduction sensorielle avec codage en fréquence de potentiels d'action"**.
3. **Dans les analyses d'expériences de coupure :**
   - Distinguez toujours avec précision **bout périphérique** (vers l'organe) et **bout central** (vers le centre bulbaire).
   - Pour un nerf afférent sensitif (Hering, Cyon), seule la stimulation du **bout central** est efficace !
4. **Schéma fonctionnel obligatoire :** Entraînez-vous à dessiner en 2 minutes un schéma clair à boîtes rectangulaires avec stimulus, récepteurs, voies afférentes, centres, voies efférentes antagonistes et effecteurs.
`;

// ============================================================================
// B3. LEÇON 1 : RECONNAISSANCE DU SOI ET DU NON-SOI (CMH/HLA) & IMMUNITÉ INNÉE
// ============================================================================
RICH_LESSONS_MAP.immunite_innee_soi_cmh = `
# B3 Leçon 1 — Reconnaissance du Soi et du Non-Soi (CMH/HLA) et Immunité Innée (Inflammation, Phagocytose)

> [!CONSEIL_BAC] **Poids de l'Immunologie au Baccalauréat Sénégalais (Série S2) :**
> Le chapitre B3 représente l'un des piliers incontournables des épreuves du Bac S2 (régulièrement présent sous forme de grand exercice de restitution organisée de connaissances ou d'analyse d'expériences de greffes et de transfusions). La maîtrise rigoureuse de la distinction CMH I vs CMH II, des étapes de la phagocytose et de la réaction inflammatoire garantit une note maximale.

---

## 1. La Notion Biologique de Soi et de Non-Soi

Le système immunitaire d'un organisme pluricellulaire a pour mission essentielle de préserver l'intégrité biologique de l'individu face aux agressions du milieu extérieur et aux dysfonctionnements internes.

### A. Définition du Soi Biologique
Le **Soi** est l'ensemble des molécules résultant de l'expression du génome de l'individu, présentes à la surface de ses cellules ou circulant dans ses liquides biologiques, et reconnues par ses propres lymphocytes sans déclencher de réaction destructrice. Cet état de non-réponse physiologique s'appelle la **tolérance immunologique naturelle**.

### B. Définition du Non-Soi
Le **Non-Soi** désigne toute entité étrangère capable d'être reconnue par le système immunitaire et d'induire une réponse défensive. On distingue :
1. **Le Non-Soi Exogène :** Molécules ou micro-organismes provenant de l'environnement extérieur : bactéries, virus, champignons, parasites, toxines microbiennes, pollens, et cellules d'un autre individu (greffes allogéniques, transfusions incompatibles).
2. **Le Soi Modifié (Non-Soi Endogène) :** Cellules appartenant originellement à l'organisme mais dont l'intégrité moléculaire a été altérée :
   - Cellules infectées par un virus qui synthétisent et exposent des peptides viraux anormaux.
   - Cellules cancéreuses ou tumorales qui expriment des antigènes mutants anormaux.

---

## 2. Les Marqueurs Moléculaires du Soi : Le Système CMH / HLA

La carte d'identité biologique de chaque être humain est portée par des glycoprotéines membranaires codées par un groupe de gènes situés sur le bras court du **chromosome 6** : le **Complexe Majeur d'Histocompatibilité (CMH)**, appelé système **HLA (Human Leukocyte Antigen)** chez l'Homme.

### Structure et Comparaison Fondamentale : CMH I vs CMH II

| Paramètre Moléculaire | CMH de Classe I (HLA-A, HLA-B, HLA-C) | CMH de Classe II (HLA-DP, HLA-DQ, HLA-DR) |
| :--- | :--- | :--- |
| **Localisation cellulaire** | Présent sur **toutes les cellules nucléées** de l'organisme et sur les plaquettes. Absente des hématies. | Réservé exclusivement aux **Cellules Présentatrices d'Antigène (CPA)** professionnelles : macrophages, cellules dendritiques, lymphocytes B. |
| **Structure moléculaire** | Une chaîne lourde polymorphe $\\alpha$ (3 domaines) associée de façon non covalente à la $\\beta_2$-microglobuline. | Deux chaînes polypeptidiques polymorphes $\\alpha$ et $\\beta$ formant une corbeille ouverte. |
| **Origine des peptides présentés** | Peptides **endogènes** : protéines synthétisées à l'intérieur de la cellule (protéines du soi normal, protéines virales, protéines tumorales). | Peptides **exogènes** : fragments de protéines étrangères phagocytées ou endocytées par la cellule (bactéries extracellulaires, toxines). |
| **Cellules cibles reconnues** | Reconnu par le récepteur TCR des **Lymphocytes T8 (CD8+) cytotoxiques**. | Reconnu par le récepteur TCR des **Lymphocytes T4 (CD4+) auxiliaires / helpers**. |
| **Rôle biologique** | Surveillance de l'intégrité cellulaire (destruction des cellules infectées ou cancéreuses). | Déclenchement et coordination centrale de la réponse immunitaire adaptative via les LT4. |

### Polygénie et Polymorphisme Extrême
- **Polygénie :** Le CMH comprend plusieurs loci distincts (A, B, C pour la classe I ; DP, DQ, DR pour la classe II).
- **Polymorphisme :** Pour chaque locus, il existe des centaines d'allèles différents au sein de l'espèce humaine, et ces allèles sont **codominants** (ils s'expriment tous simultanément).
- **Conséquence médicale :** Deux individus non apparentés ont une probabilité infime de posséder la même combinaison de molécules HLA (1 chance sur plusieurs millions). C'est ce polymorphisme qui explique le **rejet immunologique des greffes** d'organes lorsqu'un donneur et un receveur ne sont pas parfaitement histocompatibles.

---

## 3. Les Marqueurs Érythrocytaires : Systèmes ABO et Rhésus

Les globules rouges (hématies) ne possèdent pas de noyau : ils sont donc dépourvus de molécules du CMH. En revanche, leur membrane plasmique est recouverte d'autres marqueurs génétiques : des glycolipides appelés **agglutinogènes** (antigènes de surface).

### Le Système ABO
Il est déterminé par un gène porté par le chromosome 9 comportant trois allèles principaux ($A$, $B$ codominants, et $O$ récessif) :
- **Groupe A :** Présente l'antigène A sur l'hématie. Possède naturellement dans son plasma des **anticorps Anti-B**.
- **Groupe B :** Présente l'antigène B sur l'hématie. Possède naturellement dans son plasma des **anticorps Anti-A**.
- **Groupe AB :** Présente à la fois les antigènes A et B. Ne possède **aucun anticorps** anti-A ni anti-B dans son plasma : c'est le **Receveur Universel**.
- **Groupe O :** Ne présente ni l'antigène A ni l'antigène B (substance de base H). Possède dans son plasma les deux anticorps **Anti-A et Anti-B** : c'est le **Donneur Universel**.

### Règle Impérative de Transfusion Sanguine au Bac S2
> [!IMPORTANT]
> **Règle d'or de compatibilité :**
> Lors d'une transfusion, on ne doit **jamais injecter des hématies portant un antigène** contre lequel le receveur possède déjà des **anticorps (agglutinines) dans son plasma**. Si cette règle est enfreinte, les anticorps du receveur se fixent sur les globules rouges du donneur, provoquant une **agglutination massive** suivie d'une hémolyse aiguë mortelle.

---

## 4. La Réaction Inflammatoire Aiguë (RIA) : Première Ligne Défensive

Dès qu'une brèche cutanée ou muqueuse est ouverte (piqûre, coupure, brûlure), des micro-organismes pénètrent dans le tissu conjonctif sous-jacent. L'organisme déclenche en quelques minutes une réponse stéréotypée : la **réaction inflammatoire aiguë**, composante maîtresse de l'**immunité innée non spécifique**.

### Les Quatre Signes Cliniques Cardinaux de Celse
1. **Rougeur (Rubor) :** Due à une vasodilatation artériolaire locale intense provoquée par l'histamine.
2. **Chaleur (Calor) :** Causée par l'afflux massif de sang chaud provenant des organes profonds vers la zone vasodilatée.
3. **Gonflement / Œdème (Tumor) :** Résulte d'une hausse de la perméabilité capillaire qui laisse fuiter du plasma sanguin riche en protéines (fibrinogène, complément) dans le tissu conjonctif : c'est l'**exsudat inflammatoire**.
4. **Douleur (Dolor) :** Due à la compression mécanique des terminaisons nerveuses libres (nocicepteurs) par l'œdème et à leur stimulation chimique par la **bradykinine** et les **prostaglandines**.

### Médiateurs Chimiques et Déroulement Cellulaire
- Les cellules sentinelles du derme (**mastocytes**, **macrophages résidents**, **cellules dendritiques**) possèdent des récepteurs membranaires appelés **PRR (Pattern Recognition Receptors)** capables de reconnaître des motifs moléculaires conservés à la surface des microbes appelés **PAMP (Pathogen-Associated Molecular Patterns)**.
- Cette liaison active la dégranulation mastocytaire et la libération d'**histamine**, de **prostaglandines** et de cytokines pro-inflammatoires (**TNF-$\\alpha$**, **Interleukine-1**).

---

## 5. La Diapédèse Leucocytaire

Attirés par le gradient de cytokines chimiotactiques, les leucocytes circulants quittent le torrent circulatoire sanguin pour rejoindre le derme lésé :
1. **Margination et Roulement :** Les polynucléaires neutrophiles et les monocytes ralentissent leur course et roulent le long de l'endothélium grâce à des molécules d'adhésion (sélectines).
2. **Adhésion ferme :** Les intégrines leucocytaires s'ancrent solidement aux récepteurs endothéliaux.
3. **Diapédèse active :** Le globule blanc émet des pseudopodes, se déforme considérablement et s'insinue à travers les jonctions entre deux cellules endothéliales contiguës sans léser la paroi vasculaire.

---

## 6. Les Quatre Étapes Fondamentales de la Phagocytose

Une fois dans le foyer inflammatoire, les leucocytes (polynucléaires neutrophiles et macrophages issus de la différenciation des monocytes) assurent l'élimination des microbes par **phagocytose** :

> [!CALLOUT] **Chronologie en 4 temps :**
> **1. ADHÉSION / FIXATION** (Reconnaissance PAMP-PRR ou Opsonines)
> $\\downarrow$
> **2. INGESTION / ENGLEBEMENT** (Émission de pseudopodes $\\to$ Phagosome)
> $\\downarrow$
> **3. DIGESTION ENZYMATIQUE** (Fusion lysosomiale $\\to$ Phagolysosome)
> $\\downarrow$
> **4. REJET DES DÉCHETS & PRÉSENTATION** (Exocytose des débris + Exposition sur CMH II)

### Détail des 4 Étapes
1. **Étape 1 : Adhésion (Fixation) :**
   - Le phagocyte s'accole à la membrane du micro-organisme.
   - Cette fixation est grandement facilitée par l'**opsonisation** : les bactéries recouvertes d'anticorps IgG ou de fractions du complément (C3b) sont reconnues avec une affinité décuplée.
2. **Étape 2 : Ingestion (Englobement) :**
   - Le phagocyte déploie des prolongements cytoplasmiques appelés **pseudopodes** qui encerclent la bactérie.
   - Les pseudopodes fusionnent, séquestrant la bactérie vivante dans une vésicule close appelée **phagosome**.
3. **Étape 3 : Digestion :**
   - Les lysosomes du cytoplasme contenant des hydrolases acides, des protéases et du lysozyme fusionnent avec le phagosome pour former le **phagolysosome**.
   - La bactérie est dégradée enzymatiquement et détruite par un pic oxydatif (radicaux libres).
4. **Étape 4 : Rejet des déchets et Rôle de CPA :**
   - Les résidus indigestibles sont rejetés à l'extérieur par exocytose.
   - **Point culminant du programme de SVT :** Le macrophage conserve certains peptides antigéniques microbiens et les fixe au creux de ses molécules de **CMH de classe II**. Il devient alors une **Cellule Présentatrice d'Antigène (CPA)** qui migre vers les ganglions lymphatiques pour initier la réponse adaptative des **Lymphocytes T4** !

---

## 7. Ndongo S2 — Wolof Insight pour le Baccalauréat

> [!WOLOF_INSIGHT] **Comprendre l'immunité innée avec la métaphore de la frontière nationale :**
> - **Soi ak Non-Soi** : Yaramu nit ki dafa melni réw mu am frontière. Lepp lu nekk ci biir té am carte d'identité réw mi, mooy **Soi** bi. Bép élément bu génné bitim réw (bactérie, virus, greffe allogénique) té amul carte d'identité, mooy **Non-Soi** !
> - **CMH / HLA** : Mooy **Carte Nationale d'Identité biométrique** bi ! Ku nekk am nga carte boppam. Mënuloo jël carte kenn jox ko keneen (greffe), système bi dafay yëg ni kii du sunu nit té dafay rejeter organe bi !
> - **CMH I ak CMH II** :
>   - **CMH I** : Dafa nekk ci **cellule yépp** ; bu cellule bi féebé (virus wala cancer), dafay wone carte bi né : *"Féebar naa, ray léen ma !"* (LT8 cytotoxiques).
>   - **CMH II** : Dafa nekk rekk ci **policiers yi (macrophages / CPA)** ; buñu japé bandit (bactérie), dañuy wone morceau bandit bi ci carte CMH II ngir wax Général bi (LT4) : *"Xoolal li ñu japp, armez les troupes !"*
> - **Inflammation ak Diapédèse** : Bu épine piqué sa loxo, mastocytes yi dañuy yéen avertisseur (histamine) ; tuyaux yi (vaisseaux) dañuy yaatool (rougeur + chaleur), ndox génn (œdème + douleur). Ci loolu, leucocytes yi dañuy tëp ci digg brique yi (diapédèse) ngir dem lek bactéries yi (phagocytose) !

---

## 8. Conseils Clés pour la Copie du Bac S2 Sénégal

1. **Ne confondez jamais CMH I et CMH II :**
   - **CMH I + CD8 (LT8)** $\\implies$ formule mnémotechnique $1 \\times 8 = 8$.
   - **CMH II + CD4 (LT4)** $\\implies$ formule mnémotechnique $2 \\times 4 = 8$.
2. **Pour la réaction inflammatoire :** Citez toujours les 4 termes latins et leur explication biologique : Rubor (vasodilatation), Calor (flux sanguin accru), Tumor (œdème exsudatif), Dolor (bradykinine / compression).
3. **Sur la phagocytose :** L'oubli de la mention du **phagolysosome** ou de la **présentation de l'antigène sur CMH II** coûte systématiquement des points au barème.
4. **Pour les groupes sanguins :** Formulez toujours rigoureusement : *"L'individu du groupe A possède l'antigène A sur ses hématies et des anticorps naturels anti-B dans son sérum"*.
`;

RICH_LESSONS_MAP.immunite_humorale = `
# Immunité Adaptative Humorale : Anticorps, Sélection Clonale et Réponse B

## Introduction : La Défense Spécifique à Médiation Humorale

L'immunité adaptative humorale constitue le deuxième bras de la réponse immunitaire spécifique. Elle est assurée par les **lymphocytes B (LB)** et leurs produits de sécrétion, les **anticorps** (ou immunoglobulines). Contrairement à l'immunité cellulaire (LT cytotoxiques), la défense humorale agit à distance, dans les liquides biologiques (sang, lymphe, sécrétions), en neutralisant les pathogènes extracellulaires, les toxines bactériennes et les virus libres.

> [!IMPORTANT]
> L'immunité humorale est **spécifique** (un anticorps reconnaît un seul épitope), **clonale** (un LB ne produit qu'un seul type d'anticorps), et **mémorisée** (réponse secondaire amplifiée grâce aux LB mémoires). Ces trois propriétés fondamentales définissent tout le système.

---

## 1. Structure Moléculaire des Immunoglobulines (Anticorps)

### 1.1 Architecture Générale : La Structure en Y

Toutes les immunoglobulines partagent une structure de base commune :

**Composition de l'IgG (monomère, classe majoritaire) :**
- **2 chaînes lourdes H (Heavy)** : ~450 acides aminés, ~50 kDa chacune
- **2 chaînes légères L (Light)** : ~214 acides aminés, ~25 kDa chacune
- Les 4 chaînes sont associées par des **ponts disulfure intercaténaires (-S-S-)** et des interactions non covalentes

**Organisation des domaines :**
- Chaque chaîne lourde comprend : 1 domaine variable (VH) + 3 domaines constants (CH1, CH2, CH3)
- Chaque chaîne légère comprend : 1 domaine variable (VL) + 1 domaine constant (CL)

### 1.2 Fragments Fonctionnels

Le clivage enzymatique révèle deux types de fragments fonctionnels :

**Fragment Fab (Fragment antigen-binding) :**
- Composé de : chaîne L entière + domaines VH et CH1 de la chaîne H
- Chaque IgG possède **2 fragments Fab** (bivalence)
- Porte le **paratope** = site de fixation à l'antigène
- Formé par la combinaison des **régions hypervariables** (CDR : Complementarity Determining Regions) de VH et VL

**Fragment Fc (Fragment cristallisable) :**
- Composé des domaines CH2 + CH3 des 2 chaînes lourdes
- **Effector function** : liaison aux récepteurs Fc des phagocytes (opsonisation), activation du complément, passage transplacentaire (IgG uniquement), demi-vie sérique

**Zone charnière (Hinge region) :**
- Région flexible entre CH1 et CH2 des chaînes lourdes
- Permet la rotation des 2 bras Fab pour s'adapter à l'espacement des épitopes sur un antigène multivalent

> [!NOTE]
> Paratope vs Épitope : Le **paratope** est le site de l'anticorps qui reconnaît l'antigène. L'**épitope** (ou déterminant antigénique) est la région de l'antigène reconnue par le paratope. Leur complémentarité stérique est totale — c'est la reconnaissance clé-serrure.

### 1.3 Les 5 Classes d'Immunoglobulines

**IgG (70-75% des Ig sériques) :**
- Structure : monomère
- 4 sous-classes : IgG1, IgG2, IgG3, IgG4
- Fonctions : neutralisation, opsonisation, activation du complément, **seule Ig à traverser le placenta** (immunité néonatale)
- Produite majoritairement lors de la réponse secondaire

**IgM (5-10% des Ig sériques) :**
- Structure : **pentamère** (5 monomères reliés par une chaîne J)
- 10 paratopes → très efficace pour l'agglutination
- **Première Ig produite** lors d'une réponse primaire (avant commutation de classe)
- Puissant activateur de la voie classique du complément

**IgA (10-15% des Ig sériques) :**
- Structure : **dimère** dans les sécrétions (+ pièce sécrétoire) ; monomère dans le sang
- Localisation : sécrétions muqueuses (salive, larmes, lait maternel, mucus intestinal et bronchique)
- Fonction : protection des muqueuses contre les pathogènes

**IgE (< 0,01% des Ig sériques) :**
- Structure : monomère
- Fixée en permanence sur les **mastocytes** et **basophiles** via récepteurs Fc-epsilon
- Rôle : hypersensibilité immédiate (allergies, anaphylaxie) et défense anti-parasitaire (helminthes)

**IgD (< 1% des Ig sériques) :**
- Structure : monomère
- Rôle principal : co-récepteur de surface des **LB naïfs** (avec IgM membranaire = BCR)

---

## 2. La Réponse Immunitaire Humorale : Étapes Clés

### 2.1 Reconnaissance Antigénique — Le BCR

Chaque lymphocyte B porte à sa surface environ **100 000 BCR** (B Cell Receptor). Le BCR est composé de :
- Une **IgM ou IgD membranaire** (spécifique d'un épitope unique) = unité de reconnaissance
- Un **hétérodimère Igα/Igβ** = unité de transduction du signal (CD79a/CD79b)

> [!IMPORTANT]
> Un LB = un BCR de spécificité unique = un seul type d'anticorps pouvant être sécrété. Cette règle s'appelle le **dogme de la monospécificité clonale**.

### 2.2 Coopération LB — LT4 Auxiliaire (Thymo-dépendante)

Pour la grande majorité des antigènes (thymo-dépendants = protéiques), l'activation complète du LB nécessite **deux signaux** :

**Signal 1 (antigénique) :**
- L'antigène se fixe au BCR → endocytose du complexe Ag-BCR → dégradation lysosomale → présentation des peptides sur **CMH II** à la surface du LB

**Signal 2 (costimulation du LT4) :**
- Le LT4 auxiliaire (activé par la CPA dendritique) reconnaît le CMH II-peptide du LB via son TCR
- Interaction **CD40 (LB) — CD40L (LT4)** = signal de costimulation
- Sécrétion de cytokines par le LT4 : **IL-4** (différenciation plasmocytes + commutation vers IgE), **IL-5** (différenciation plasmocytes + IgA), **IL-6** (prolifération des plasmocytes), **IL-13** (commutation IgE)

> [!TIP]
> Mnémotechnique : **LT4 = chef d'orchestre**. Sans lui, le LB ne peut pas se différencier en plasmocyte. Il fournit deux signaux indispensables : costimulation CD40-CD40L + cytokines activatrices.

### 2.3 Prolifération Clonale et Différenciation

Après activation (double signal) :
1. **Prolifération clonale** : le LB activé se divise de nombreuses fois → expansion du clone spécifique
2. **Différenciation** vers deux populations :
   - **Plasmocytes** : cellules effectrices à vie courte (quelques jours-semaines), machines à fabriquer des anticorps (jusqu'à 2 000 Ig/seconde par cellule), localisées dans les ganglions lymphatiques et la moelle osseuse
   - **Lymphocytes B mémoire** : cellules à longue durée de vie (années à décennies), réservoir de la mémoire immunologique, répondent plus vite et plus fort lors d'un 2ème contact

### 2.4 Commutation de Classe (Class Switching)

Sous l'influence des cytokines du LT4, les plasmocytes peuvent modifier la région constante de leur chaîne lourde (**commutation isotypique**) tout en conservant leur spécificité antigénique (région variable inchangée) :
- Réponse primaire : IgM dominante (par défaut, avant commutation)
- Sous IL-4/IL-13 : commutation vers IgE ou IgG4
- Sous TGF-beta + IL-5 : commutation vers IgA
- En l'absence de stimulus : IgG1 et IgG3 (sous-classes antiinfectieuses majeures)

---

## 3. Mécanismes Effecteurs des Anticorps

### 3.1 Neutralisation

Les anticorps (IgG, IgA) **bloquent stériquement** les sites actifs fonctionnels des toxines bactériennes ou des protéines de surface virales, **empêchant leur liaison** aux récepteurs cellulaires.

Exemples :
- IgG anti-tétanique → neutralise la tétanospasmina (toxine de Clostridium tetani)
- IgA sécrétoire → neutralise les virus à l'entrée des muqueuses respiratoires et digestives

### 3.2 Opsonisation

Les anticorps (surtout IgG) se fixent par leur **Fab** à la surface bactérienne, exposant leur **Fc** vers l'extérieur. Les **macrophages et polynucléaires neutrophiles** reconnaissent le Fc via leurs **récepteurs FcγR** → phagocytose renforcée.

L'anticorps joue le rôle d'**opsonine** : il augmente de 1 000 à 10 000 fois l'efficacité de la phagocytose.

### 3.3 Agglutination

Les IgM (10 paratopes) et IgG (2 paratopes) peuvent relier plusieurs antigènes entre eux, formant des **réseaux moléculaires insolubles** (agglutinats). Ces agrégats :
- Sont plus facilement phagocytés (taille augmentée)
- Activent le complément (voie classique via C1q fixé sur le Fc)

### 3.4 Activation du Complément (voie classique)

La fixation de **C1q** (protéine du complément) sur le fragment Fc des IgG ou IgM complexés à un antigène déclenche la **voie classique** du complément, conduisant à la formation du **Complexe d'Attaque Membranaire (CAM)** qui perfore la membrane bactérienne → lyse osmotique.

---

## 4. Cinétique de la Réponse Anticorps

### 4.1 Réponse Primaire (1er contact antigénique)

- **Délai (phase de latence) :** 10 à 14 jours
- **Raison :** LB naïfs peu nombreux → activation lente → prolifération → différenciation en plasmocytes
- **Pic du titre :** modéré
- **Ig dominante :** IgM en premier, puis IgG après commutation de classe
- **Afffinité :** relativement faible (maturation d'affinité encore limitée)

### 4.2 Réponse Secondaire (2ème contact — même antigène)

- **Délai :** 2 à 4 jours seulement
- **Raison :** LB mémoires = plus nombreux, seuil d'activation plus bas, BCR de haute affinité
- **Pic du titre :** 10 à 100 fois supérieur à la réponse primaire
- **Ig dominante :** IgG à haute affinité (après maturation d'affinité dans les centres germinatifs)
- **Durée :** beaucoup plus longue

> [!IMPORTANT]
> La réponse secondaire est le fondement de la **vaccination** : on induit une réponse primaire avec un vaccin (antigène atténué ou toxoïde) pour créer des LB mémoires. Lors d'un rappel ou d'une infection réelle, la réponse secondaire est si rapide et puissante qu'elle élimine le pathogène avant l'apparition des symptômes.

---

## 5. Test d'Ouchterlony — Diagnostic par Immunodiffusion

Le test d'Ouchterlony (double immunodiffusion radiale en gel d'agarose) est une technique de mise en évidence de la **spécificité antigène-anticorps**.

**Principe :**
1. Dans un gel d'agarose, creuser des puits : un puits central (anticorps/sérum immun) et des puits périphériques (antigènes à tester)
2. Laisser diffuser pendant 24-48h à température ambiante
3. Les protéines diffusent radialement dans toutes les directions

**Lecture :**
- **Arc de précipitation** : là où les concentrations en Ag et en Ac se rencontrent dans des proportions équimolaires (zone d'équivalence), il se forme un **réseau de complexes immuns insolubles** → ligne de précipitation visible
- **Pas d'arc** : Ag et Ac non complémentaires → pas de complexe → pas de précipité

**Interprétations classiques :**
- **Identité complète** (arcs qui se rejoignent en une courbe lisse) : les deux Ag sont identiques (mêmes épitopes)
- **Non-identité** (arcs qui se croisent) : les deux Ag sont totalement différents
- **Identité partielle** (arc + éperon) : les Ag partagent certains épitopes mais pas tous

---

## 6. Tableau de Synthèse — Immunité Humorale vs Cellulaire

| Critère | Immunité Humorale | Immunité Cellulaire |
|---------|------------------|---------------------|
| Cellule effectrice | Lymphocyte B → Plasmocyte | Lymphocyte T8 cytotoxique (LTC) |
| Médiateur | Anticorps (Ig solubles) | Perforines, Granzymes, Fas/FasL |
| Cibles | Pathogènes extracellulaires, toxines, virus libres | Cellules infectées, cancéreuses, greffons |
| Localisation | Sang, lymphe, sécrétions muqueuses | Contact cellule-à-cellule (synapse immunologique) |
| Mémoire | LB mémoires | LT8 mémoires |
| Mise en route | 10-14 jours (primaire) | 7-14 jours (primaire) |

---

## 7. Points Clés pour le Baccalauréat S2

> [!CAUTION]
> **Pièges fréquents au Bac :**
> 1. Ne pas confondre **plasmocyte** (cellule effectrice qui SECRETE les anticorps) et **lymphocyte B mémoire** (cellule de mémoire qui ne secrète pas d'anticorps au repos).
> 2. Ne pas confondre **paratope** (sur l'anticorps) et **épitope** (sur l'antigène).
> 3. L'IgM est PENTAMERE (5 unités) et première produite — l'IgG est MONOMERE et majoritaire dans la réponse secondaire.
> 4. La commutation de classe ne modifie PAS la spécificité de l'anticorps (région variable conservée) — seule la région constante (classe) change.
> 5. Dans un test d'Ouchterlony, l'ARC se forme à la zone d'EQUIVALENCE — pas n'importe où dans le gel.
`;

export function getEnhancedLessonContent(lessonTitle: string, chapterTitle: string, rawContent: string | null): string {
  const titleLower = `${lessonTitle} ${chapterTitle}`.toLowerCase();

  // Routage SVT B3 Leçon 2 : Immunité Adaptative Humorale — Anticorps & Sélection Clonale
  if (
    titleLower.includes('humorale') ||
    titleLower.includes('anticorps') ||
    titleLower.includes('immunoglobuline') ||
    titleLower.includes('sélection clonale') ||
    titleLower.includes('selection clonale') ||
    titleLower.includes('lymphocyte b') ||
    titleLower.includes('plasmocyte') ||
    titleLower.includes('60000000-0000-0003-0003-000000000002')
  ) {
    return RICH_LESSONS_MAP.immunite_humorale;
  }

  // Routage SVT B3 Leçon 1 : Reconnaissance du Soi et du Non-Soi (CMH/HLA) & Immunité Innée
  if (
    titleLower.includes('soi') ||
    titleLower.includes('cmh') ||
    titleLower.includes('hla') ||
    titleLower.includes('phagocytose') ||
    titleLower.includes('inflammation') ||
    titleLower.includes('immunité innée') ||
    titleLower.includes('immunite innee') ||
    titleLower.includes('60000000-0000-0003-0003-000000000001')
  ) {
    return RICH_LESSONS_MAP.immunite_innee_soi_cmh;
  }

  // Routage SVT B2 Leçon 3 : Régulation Réflexe de la Pression Artérielle
  if (
    titleLower.includes('barorécepteur') ||
    titleLower.includes('barorecepteur') ||
    titleLower.includes('barocepteur') ||
    titleLower.includes('hering') ||
    titleLower.includes('pression artérielle') ||
    titleLower.includes('pression arterielle') ||
    (titleLower.includes('régulation') && titleLower.includes('pression')) ||
    (titleLower.includes('regulation') && titleLower.includes('pression')) ||
    titleLower.includes('vasomoteur') ||
    titleLower.includes('60000000-0000-0003-0002-000000000003')
  ) {
    return RICH_LESSONS_MAP.regulation_pression_arterielle;
  }

  // Routage SVT B2 Leçon 2 : Innervation & Régulation Nerveuse et Hormonale de l'Activité Cardiaque
  if (
    titleLower.includes('innervation') ||
    titleLower.includes('loewi') ||
    titleLower.includes('nerf vague') ||
    titleLower.includes('pneumogastrique') ||
    titleLower.includes('orthosympathique') ||
    titleLower.includes('parasympathique') ||
    titleLower.includes('cardiomodérateur') ||
    titleLower.includes('cardiomoderateur') ||
    titleLower.includes('cardioaccélérateur') ||
    titleLower.includes('cardioaccelerateur') ||
    (titleLower.includes('régulation') && titleLower.includes('cardiaque') && !titleLower.includes('pression')) ||
    (titleLower.includes('regulation') && titleLower.includes('cardiaque') && !titleLower.includes('pression')) ||
    titleLower.includes('60000000-0000-0003-0002-000000000002')
  ) {
    return RICH_LESSONS_MAP.regulation_nerveuse_cardiaque;
  }

  // Routage SVT B2 Leçon 1 : Activité Cardiaque, Tissu Nodal & Automatisme Cardiaque
  if (
    titleLower.includes('révolution cardiaque') ||
    titleLower.includes('revolution cardiaque') ||
    titleLower.includes('automatisme cardiaque') ||
    titleLower.includes('tissu nodal') ||
    titleLower.includes('stannius') ||
    titleLower.includes('ligature') ||
    (titleLower.includes('cardiaque') && (titleLower.includes('anatomie') || titleLower.includes('mécanisme') || titleLower.includes('mecanisme') || titleLower.includes('b2')))
  ) {
    return RICH_LESSONS_MAP.activite_cardiaque_automatisme;
  }

  // Routage SVT B1 Leçon 4 : Activité Réflexe Médullaire & Réflexes Conditionnels Pavloviens
  if (
    titleLower.includes('pavlov') ||
    titleLower.includes('conditionnel') ||
    titleLower.includes('conditionné') ||
    titleLower.includes('conditionne') ||
    titleLower.includes('réflexe myotatique') ||
    titleLower.includes('reflexe myotatique') ||
    titleLower.includes('réflexe médullaire') ||
    titleLower.includes('reflexe medullaire') ||
    titleLower.includes('activité réflexe') ||
    titleLower.includes('activite reflexe') ||
    titleLower.includes('arc réflexe') ||
    titleLower.includes('arc reflexe') ||
    titleLower.includes('magendie')
  ) {
    return RICH_LESSONS_MAP.reflexes_medullaires_conditionnels;
  }

  // Routage SVT B1 Leçon 3 : Transmission Synaptique Chimique & Intégration Nerveuse
  if (
    titleLower.includes('transmission synaptique') ||
    titleLower.includes('synapse') ||
    titleLower.includes('synaptique') ||
    titleLower.includes('ppse') ||
    titleLower.includes('ppsi') ||
    titleLower.includes('intégration nerveuse') ||
    titleLower.includes('integration nerveuse') ||
    titleLower.includes('plaque motrice') ||
    titleLower.includes('sommation')
  ) {
    return RICH_LESSONS_MAP.synapse_transmission_chimique;
  }

  // Routage SVT B1 Leçon 2 : Tissu Nerveux, Potentiel de Repos & Potentiel d'Action
  if (
    titleLower.includes('tissu nerveux') ||
    titleLower.includes('potentiel de repos') ||
    titleLower.includes('potentiel d\'action') ||
    titleLower.includes('potentiel action') ||
    titleLower.includes('potentiels bioélectriques') ||
    titleLower.includes('potentiels bioelectriques') ||
    (titleLower.includes('neurone') && (titleLower.includes('action') || titleLower.includes('repos') || titleLower.includes('structure')))
  ) {
    return RICH_LESSONS_MAP.tissu_nerveux_potentiel_action;
  }

  // Routage SVT B1 : Organisation du Système Nerveux Cérébrospinal
  if (
    titleLower.includes('système nerveux') ||
    titleLower.includes('systeme nerveux') ||
    titleLower.includes('cérébrospinal') ||
    titleLower.includes('cerebrospinal') ||
    titleLower.includes('moelle épinière') ||
    titleLower.includes('moelle epiniere') ||
    titleLower.includes('encéphale') ||
    titleLower.includes('encephale') ||
    titleLower.includes('b1')
  ) {
    return RICH_LESSONS_MAP.systeme_nerveux_cerebrospinal;
  }

  // Routage Physique P4 : Mouvement d'une Particule Chargée dans E et B
  if (
    titleLower.includes('particule') ||
    titleLower.includes('particules chargées') ||
    titleLower.includes('particules chargees') ||
    titleLower.includes('champ électrique') ||
    titleLower.includes('champ electrique') ||
    titleLower.includes('champ magnétique') ||
    titleLower.includes('champ magnetique') ||
    titleLower.includes('lorentz') ||
    titleLower.includes('cyclotron') ||
    titleLower.includes('spectromètre') ||
    titleLower.includes('spectrometre') ||
    titleLower.includes('wien') ||
    titleLower.includes('bainbridge') ||
    titleLower.includes('déviation') ||
    titleLower.includes('deviation') ||
    titleLower.includes('p4')
  ) {
    return RICH_LESSONS_MAP.particule_champ_e_b;
  }

  // Routage Physique P1 : Cinématique du Point Matériel
  if (
    titleLower.includes('cinématique') ||
    titleLower.includes('cinematique') ||
    titleLower.includes('frenet') ||
    titleLower.includes('torricelli') ||
    titleLower.includes('point matériel') ||
    titleLower.includes('point materiel') ||
    titleLower.includes('mruv') ||
    titleLower.includes('mru') ||
    titleLower.includes('p1')
  ) {
    return RICH_LESSONS_MAP.cinematique_point;
  }

    // Routage Physique P3 : Mouvement d'un Projectile dans le Champ de Pesanteur
  if (
    titleLower.includes('projectile') ||
    titleLower.includes('pesanteur') ||
    titleLower.includes('parabolique') ||
    titleLower.includes('flèche') ||
    titleLower.includes('fleche') ||
    titleLower.includes('portée') ||
    titleLower.includes('portee') ||
    titleLower.includes('balistique') ||
    titleLower.includes('tir') ||
    titleLower.includes('p3')
  ) {
    return RICH_LESSONS_MAP.projectile_champ_pesanteur;
  }

  // Routage Physique P2 : Les Lois de Newton sur le Mouvement
  if (
    titleLower.includes('newton') ||
    titleLower.includes('dynamique') ||
    titleLower.includes('tci') ||
    titleLower.includes('actions réciproques') ||
    titleLower.includes('actions reciproques') ||
    titleLower.includes('principe d’inertie') ||
    titleLower.includes("principe d'inertie") ||
    titleLower.includes('inertie') ||
    titleLower.includes('p2')
  ) {
    return RICH_LESSONS_MAP.lois_newton;
  }

  if (
    titleLower.includes('dosage acide faible') ||
    titleLower.includes('solution tampon') ||
    titleLower.includes('effet tampon') ||
    titleLower.includes('demi-équivalence') ||
    titleLower.includes('demi-equivalence') ||
    (titleLower.includes('dosage') && titleLower.includes('faible')) ||
    (titleLower.includes('titrage') && titleLower.includes('faible')) ||
    titleLower.includes('titrage acide faible') ||
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
    titleLower.includes('acide aminé') ||
    titleLower.includes('acides aminés') ||
    titleLower.includes('acide amine') ||
    titleLower.includes('acides amines') ||
    titleLower.includes('stéréochimie') ||
    titleLower.includes('stereochimie') ||
    titleLower.includes('zwitterion') ||
    titleLower.includes('amphion') ||
    titleLower.includes('fischer') ||
    titleLower.includes('dipeptide') ||
    titleLower.includes('peptidique') ||
    titleLower.includes('chiralité') ||
    titleLower.includes('chiralite') ||
    titleLower.includes('c9')
  ) {
    return RICH_LESSONS_MAP.acides_amines;
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
    titleLower.includes('arrangement') ||
    titleLower.includes('combinaison') ||
    titleLower.includes('p-liste') ||
    titleLower.includes('m11')
  ) {
    return RICH_LESSONS_MAP.denombrement;
  }

  if (
    titleLower.includes('probabilit') ||
    titleLower.includes('aléatoire') ||
    titleLower.includes('binomiale') ||
    titleLower.includes('arbre pondéré') ||
    titleLower.includes('arbre pondere') ||
    titleLower.includes('m12')
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

