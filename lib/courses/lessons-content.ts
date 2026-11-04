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
  $$R-\\text{OH} + \\text{HCl} \\xrightarrow{\\text{ZnCl}_2} R-\\text{Cl}_{(s/liq\\text{ trouble})} + \\text{H}_2\\text{O}$$

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
  cinetique: `# Chapitre 1 : Cinétique Chimique & Vitesse de Réaction (Terminale S2)

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
- **Ensemble de définition :** $\\left. D_{\\ln} = \\right]0, +\\infty[$. Le logarithme d'un nombre négatif ou nul **n'existe pas**.
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
- **Partie réelle :** $\\operatorname{Re}(z) = a$
- **Partie imaginaire :** $\\operatorname{Im}(z) = b$ (attention : la partie imaginaire est un réel, le $i$ n'en fait pas partie !)
- **Conjugué :** $\\overline{z} = a - ib$. Propriété capitale : $z \\cdot \\overline{z} = a^2 + b^2 = |z|^2$.
- $z$ est un **réel pur** $\\iff \\operatorname{Im}(z) = 0 \\iff z = \\overline{z}$.
- $z$ est un **imaginaire pur** $\\iff \\operatorname{Re}(z) = 0 \\iff z = -\\overline{z}$.

### 1.2 Module et Argument
Soit $z = a + ib \\neq 0$ :
- **Module :** $|z| = \\sqrt{a^2 + b^2} > 0$ (représente la distance $OM$ dans le plan complexe).
- **Argument :** $\\theta = \\arg(z) \\pmod{2\\pi}$ vérifiant :
  $$\\cos\\theta = \\frac{a}{|z|} \\qquad \\sin\\theta = \\frac{b}{|z|}$$

### 1.3 Forme Trigonométrique et Forme Exponentielle
$$z = r(\\cos\\theta + i\\sin\\theta) = r e^{i\\theta} \\quad (r = |z| > 0)$$

> [!THEOREME] **Formules Fondamentales de Moivre & d'Euler :**
> - **Formule de Moivre :** Pour tout entier $n \\in \\mathbb{Z}$ :
>   $$(e^{i\\theta})^n = e^{i n\\theta} \\iff (\\cos\\theta + i\\sin\\theta)^n = \\cos(n\\theta) + i\\sin(n\\theta)$$
> - **Formules d'Euler (Linéarisation) :**
>   $$\\cos\\theta = \\frac{e^{i\\theta} + e^{-i\\theta}}{2} \\qquad \\sin\\theta = \\frac{e^{i\\theta} - e^{-i\\theta}}{2i}$$

---

## 2. Résolution d'Équations dans $\\mathbb{C}$

### 2.1 Équations du second degré à coefficients réels : $a z^2 + b z + c = 0$
On calcule le discriminant $\\Delta = b^2 - 4ac$ :
- Si $\\Delta > 0$ : deux solutions réelles distinctes $z_{1,2} = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$.
- Si $\\Delta = 0$ : une solution réelle double $z_0 = -\\frac{b}{2a}$.
- Si $\\Delta < 0$ : deux solutions complexes conjuguées :
  $$z_1 = \\frac{-b - i\\sqrt{|\\Delta|}}{2a} \\qquad z_2 = \\frac{-b + i\\sqrt{|\\Delta|}}{2a} = \\overline{z_1}$$

### 2.2 Racines carrées d'un nombre complexe $Z = X + iY$
Pour trouver les nombres $z = x + iy$ tels que $z^2 = Z$, on résout le système :
$$\\begin{cases} x^2 - y^2 = X & (\\operatorname{Re}(z^2) = \\operatorname{Re}(Z)) \\\\ x^2 + y^2 = \\sqrt{X^2 + Y^2} & (|z|^2 = |Z|) \\\\ 2xy = Y & (\\text{signe du produit } xy) \\end{cases}$$

---

## 3. Géométrie et Nombres Complexes (L'arme absolue au Bac S2)

Dans le plan complexe rapporté à un repère orthonormé direct $(O; \\vec{u}, \\vec{v})$ :

### 3.1 Distances et Angles orientés
Soient trois points distincts $A(z_A)$, $B(z_B)$, $C(z_C)$ :
- **Distance :** $AB = |z_B - z_A|$.
- **Angle orienté :** $(\\vec{AB}, \\vec{AC}) = \\arg\\left(\\frac{z_C - z_A}{z_B - z_A}\\right) \\pmod{2\\pi}$.

### 3.2 Nature des Triangles
On calcule le quotient clé : $Q = \\frac{z_C - z_A}{z_B - z_A}$.
- Si $Q = \\pm i = e^{\\pm i\\frac{\\pi}{2}}$ : le triangle $ABC$ est **rectangle et isocèle en $A$**.
- Si $Q = e^{\\pm i\\frac{\\pi}{3}} = \\frac{1}{2} \\pm i\\frac{\\sqrt{3}}{2}$ : le triangle $ABC$ est **équilatéral**.
- Si $Q$ est un réel pur : les points $A, B, C$ sont **alignés**.
- Si $Q$ est un imaginaire pur : $(AB) \\perp (AC)$ (triangle **rectangle en $A$**).

### 3.3 Écritures Complexes des Transformations du Plan
- **Translation** de vecteur $\\vec{w}(b)$ : $z' = z + b$.
- **Homothétie** de centre $\\Omega(\\omega)$ et de rapport $k \\in \\mathbb{R}^*$ : $z' - \\omega = k(z - \\omega)$.
- **Rotation** de centre $\\Omega(\\omega)$ et d'angle $\\alpha$ : $z' - \\omega = e^{i\\alpha}(z - \\omega)$.
- **Similitude directe** de centre $\\Omega(\\omega)$, de rapport $k > 0$ et d'angle $\\theta$ : $z' - \\omega = k e^{i\\theta}(z - \\omega) \\iff z' = a z + b$ avec $a = k e^{i\\theta} \\neq 1$.
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

  geometrie: `# Chapitre 11 : Géométrie dans l'Espace (Terminale S2)

Bienvenue dans ce cours interactif dédié à la **géométrie analytique dans l'espace**, un chapitre capital noté sur **4 à 5 points au Baccalauréat Scientifique (Série S2)** au Sénégal.

---

## 1. Produit Scalaire dans l'Espace & Orthogonalité

L'espace est muni d'un repère orthonormé direct $(O; \\vec{i}, \\vec{j}, \\vec{k})$.

Observez l'infographie de synthèse ci-dessous récapitulant les 3 piliers (Plans, Droites et Sphères) :

![Figure 1 : Géométrie dans l'Espace au Bac S2](/assets/pedagogie/geometrie_espace_plans_droites.svg)

![Figure 1b : Métaphore concrète au Sénégal : Géométrie de l'Espace & Architecture](/assets/pedagogie/geometrie_vie_reelle_plan_mosquee.svg)

> [!VIE_REELLE] La géométrie dans l'espace est le langage secret des architectes et bâtisseurs sénégalais :
> - Pensez à l'esplanade de la Grande Mosquée de Touba ou au Monument de la Renaissance : le sol dallé forme un **plan $(P) : ax + by + cz + d = 0$**.
> - Le grand minaret central (Lamp Fall) dressé droit vers le ciel représente le **vecteur normal $\\vec{n}(a, b, c)$**, orthogonal à toutes les allées du sol.
> - La hauteur d'un drone survolant l'esplanade est donnée par la **distance du point $M$ au plan $(P)$** : c'est la longueur minimale mesurée le long du fil à plomb qui atterrit en son **projeté orthogonal $H$**.
> - Enfin, les dômes sphériques coupés par les toits des galeries créent des **sections planes circulaires** dont le rayon vérifie le théorème de Pythagore : $r = \\sqrt{R^2 - d^2}$.

> [!WOLOF] **Xam-xam ci Wolof :** Géométrie dans l'espace dafa melni tabaxu jumaa walla kër gu am étage :
> - Suuf si nga taxaw mooy **plan $(P) : ax + by + cz + d = 0$**.
> - Minaret bi taxaw ci digg bi dëpp $90^\\circ$ mooy **vecteur normal $\\vec{n}(a, b, c)$** : koo gis mu tër ci plan bi, $\\vec{n}$ dafay orthogonal ak moom (produit scalaire bi zéro la) !
> - **Distance $d(M, P)$ :** mooy fil à plomb bi ngay wàcce ci kaw ba mu falu ci suuf ci point $H$ (projeté orthogonal).
> - **Sphère $\\mathcal{S}$ ak Plan :** boo jëlee ballon walla dôme nga dog ko ci plan, bu distance bi $d < R$, li ciy génn cercle la bu am rayon $r = \\sqrt{R^2 - d^2}$ ci théorème de Pythagore !

### 1.1 Expression analytique du produit scalaire
Pour deux vecteurs $\\vec{u}(x, y, z)$ et $\\vec{v}(x', y', z')$ :

$$\\vec{u} \\cdot \\vec{v} = x x' + y y' + z z'$$

- **Norme d'un vecteur :** $\\|\\vec{u}\\| = \\sqrt{x^2 + y^2 + z^2}$
- **Distance entre deux points $A$ et $B$ :** $AB = \\sqrt{(x_B - x_A)^2 + (y_B - y_A)^2 + (z_B - z_A)^2}$
- **Critère d'orthogonalité :** $\\vec{u} \\perp \\vec{v} \\iff \\vec{u} \\cdot \\vec{v} = 0$

> [!PIEGE] Dans l'espace, deux droites peuvent être orthogonales **sans être sécantes** ! On dit qu'elles sont orthogonales si leurs vecteurs directeurs le sont, mais elles peuvent être situées dans des plans différents (non coplanaires).

---

## 2. Plans dans l'Espace & Vecteur Normal

### 2.1 Équation Cartésienne d'un Plan
Tout plan $(P)$ admet un vecteur normal non nul $\\vec{n}(a, b, c)$ orthogonal à tout vecteur du plan.
Son équation cartésienne est de la forme :

$$(P) : ax + by + cz + d = 0$$

- Le coefficient constant $d$ se calcule en remplaçant $x, y, z$ par les coordonnées d'un point $A$ appartenant au plan :
  $$d = -(a x_A + b y_A + c z_A)$$

### 2.2 Distance d'un point $A$ à un plan $(P)$
La distance minimale entre un point $A(x_A, y_A, z_A)$ et le plan $(P) : ax + by + cz + d = 0$ est donnée par :

$$d(A, P) = \\frac{|a x_A + b y_A + c z_A + d|}{\\sqrt{a^2 + b^2 + c^2}}$$

- Le projeté orthogonal $H$ de $A$ sur $(P)$ est le point d'intersection de $(P)$ avec la droite passant par $A$ et dirigée par $\\vec{n}$.

---

## 3. Droites dans l'Espace & Représentation Paramétrique

Une droite $(D)$ passant par un point $A(x_0, y_0, z_0)$ et dirigée par $\\vec{u}(\\alpha, \\beta, \\gamma)$ admet pour système d'équations paramétriques :

$$\\begin{cases} x = x_0 + \\alpha \\cdot t \\\\ y = y_0 + \\beta \\cdot t \\\\ z = z_0 + \\gamma \\cdot t \\end{cases} \\qquad (t \\in \\mathbb{R})$$

### Intersection Droite - Plan :
Pour trouver l'intersection d'une droite $(D)$ et d'un plan $(P) : ax + by + cz + d = 0$ :
1. On remplace $x, y, z$ dans l'équation du plan par leurs expressions en fonction de $t$.
2. On résout l'équation du premier degré en $t$.
3. On réinjecte la valeur $t_0$ trouvée dans le système paramétrique pour obtenir les coordonnées du point d'intersection $M_0$.

---

## 4. Sphères dans l'Espace & Intersection avec un Plan

### 4.1 Équation de la Sphère $\\mathcal{S}(\\Omega, R)$
Une sphère de centre $\\Omega(a, b, c)$ et de rayon $R > 0$ a pour équation cartésienne :

$$(x - a)^2 + (y - b)^2 + (z - c)^2 = R^2$$

### 4.2 Intersection d'une Sphère $\\mathcal{S}$ et d'un Plan $(P)$
Soit $d = d(\\Omega, P)$ la distance du centre de la sphère au plan :
1. **Si $d < R$ :** Le plan coupe la sphère selon un **cercle** de centre $H$ (projeté orthogonal de $\\Omega$ sur $P$) et de rayon :
   $$r = \\sqrt{R^2 - d^2}$$
2. **Si $d = R$ :** Le plan est **tangent** à la sphère au point unique $H$.
3. **Si $d > R$ :** L'intersection est **vide** ($\\mathcal{S} \\cap P = \\emptyset$).

---

## 5. Le Produit Vectoriel $\\vec{u} \\wedge \\vec{v}$

Le produit vectoriel de deux vecteurs $\\vec{u}(x, y, z)$ et $\\vec{v}(x', y', z')$ est le vecteur noté $\\vec{u} \\wedge \\vec{v}$ défini par :

$$\\vec{u} \\wedge \\vec{v} = \\begin{pmatrix} yz' - zy' \\\\ zx' - xz' \\\\ xy' - yx' \\end{pmatrix}$$

- **Propriétés géométriques :**
  - $\\vec{u} \\wedge \\vec{v}$ est orthogonal à la fois à $\\vec{u}$ et à $\\vec{v}$.
  - $\\vec{u} \\wedge \\vec{v} = \\vec{0} \\iff \\vec{u}$ et $\\vec{v}$ sont colinéaires.
- **Aire d'un triangle $ABC$ :**
  $$\\mathcal{A}(ABC) = \\frac{1}{2} \\|\\vec{AB} \\wedge \\vec{AC}\\|$$
- **Volume d'un tétraèdre $ABCD$ :**
  $$\\mathcal{V}(ABCD) = \\frac{1}{6} |(\\vec{AB} \\wedge \\vec{AC}) \\cdot \\vec{AD}|$$
`,



  // ===================================================================
  // C2 : AMINES (Chimie Organique — Terminale S2 Sénégal)
  // ===================================================================
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

$$1^\\circ \\xrightarrow{R'X} 2^\\circ \\xrightarrow{R'X} 3^\\circ \\xrightarrow{R'X} [\\text{sel quaternaire}]^+X^-$$

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

};

export function getEnhancedLessonContent(lessonTitle: string, chapterTitle: string, rawContent: string | null): string {
  const titleLower = `${lessonTitle} ${chapterTitle}`.toLowerCase();

  if (
    titleLower.includes('alcool') ||
    titleLower.includes('alcol')
  ) {
    return RICH_LESSONS_MAP.alcools;
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
    titleLower.includes('sphere')
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
    titleLower.includes('complexe') ||
    titleLower.includes('affixe') ||
    titleLower.includes('similitude')
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

