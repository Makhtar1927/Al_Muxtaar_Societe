import { SVTEpreuveItem } from './svt-part1';

export const SVT_EPREUVES_PART2: SVTEpreuveItem[] = [
  // AXE 2 : PHYSIOLOGIE CARDIOVASCULAIRE (B2)
  {
    id: 7,
    title: "Baccalauréat Sénégal — Session Normale (Série S2)",
    source: "Baccalauréat Sénégal",
    sourceType: "bac",
    theme: "Automatisme cardiaque, ligatures de Stannius et localisation du centre pacemaker",
    category: "cardiovasculaire",
    enonce: `Afin d'étudier l'origine et le siège de l'automatisme cardiaque chez les vertébrés, on réalise la série classique des trois ligatures de Stannius sur le cœur isolé d'un batracien (grenouille) perfusé par du liquide de Ringer.
Le cœur de grenouille comprend : un sinus veineux, deux oreillettes et un ventricule unique.

1. **Protocole des ligatures :**
   - **Cœur témoin intact :** Le sinus bat à un rythme de 40 battements/minute, les oreillettes à 40 battements/minute, et le ventricule à 40 battements/minute (rythme synchrone).
   - **Ligature 1 (entre le sinus veineux et les oreillettes) :**
     *Observation :* Le sinus veineux continue de battre à 40 battements/minute. Les oreillettes et le ventricule s'arrêtent immédiatement en diastole pendant plusieurs minutes, puis reprennent spontanément un rythme lent et synchrone de 20 battements/minute.
   - **Ligature 2 (au niveau du sillon auriculo-ventriculaire) :**
     *Observation :* Le sinus bat toujours à 40 battements/min, les oreillettes battent à 20 battements/min, et le ventricule s'arrête un temps puis bat à un rythme encore plus ralenti de 12 battements/minute.
   - **Ligature 3 (au tiers inférieur de la pointe du ventricule) :**
     *Observation :* La pointe du ventricule isolée reste définitivement immobile et inerte, bien qu'elle réponde par une secousse unique à une excitation électrique directe.

1.1. Que prouve le fait qu'un cœur totalement séparé de l'organisme continue de battre ?
1.2. Interpréter rigoureusement les résultats de chaque ligature.
1.3. En déduire la hiérarchie des centres automatiques et faire la transposition avec le tissu nodal des mammifères (nœud sinusal de Keith et Flack, nœud septal d'Aschoff-Tawara, faisceau de His et réseau de Purkinje).`,
    correction: `**1. Nature de l'automatisme cardiaque :**
1.1. Le cœur isolé de l'organisme continue de battre spontanément : cela prouve que **l'automatisme cardiaque est myogénique et intrinsèque** au cœur. Il ne dépend pas du système nerveux central pour son déclenchement, mais d'un tissu spécialisé auto-excitable (le tissu nodal).

**2. Interprétation des ligatures de Stannius :**
1.2.
- **Ligature 1 :**
  - Le sinus veineux conserve son rythme spontané initial ($40\\text{ bat/min}$). C'est le **centre initiateur (pacemaker)** doué de la plus haute fréquence d'autodépolarisation.
  - L'arrêt temporaire des oreillettes et du ventricule montre que leur contraction était normalement commandée par le sinus. La reprise à $20\\text{ bat/min}$ révèle l'existence d'un centre secondaire sous-jacent, moins rapide, démasqué par la rupture de conduction.
- **Ligature 2 :**
  - La dissociation rythmique (oreillettes à $20\\text{ bat/min}$, ventricule à $12\\text{ bat/min}$) démontre l'existence d'un troisième centre automatique au niveau de la jonction auriculo-ventriculaire, de fréquence encore inférieure.
- **Ligature 3 :**
  - La pointe du ventricule ne possède aucun automatisme propre (elle est constituée uniquement de myocarde banal contractile excitable mais non auto-excitable).

**3. Hiérarchie et transposition aux mammifères :**
- **Hiérarchie :** Le centre doué de la fréquence d'excitation spontanée la plus rapide impose son rythme à l'ensemble du myocarde (effet d'entraînement par suppression d'inhibition).
- **Équivalence chez les mammifères :**
  - Sinus veineux $\\longleftrightarrow$ **Nœud sinusal (Keith et Flack)** ($70-80\\text{ bat/min}$ chez l'homme, pacemaker physiologique).
  - Sillon auriculo-ventriculaire $\\longleftrightarrow$ **Nœud septal auriculo-ventriculaire (Aschoff-Tawara)** ($40-50\\text{ bat/min}$).
  - Parois ventriculaires $\\longleftrightarrow$ **Faisceau de His et fibres de Purkinje** ($20-30\\text{ bat/min}$, centre d'échappement ultime).`
  },
  {
    id: 8,
    title: "Lycée Seydina Limamou Laye — Devoir Surveillé de SVT",
    source: "Lycée Seydina Limamou Laye",
    sourceType: "lycee",
    theme: "Innervation cardiaque antagoniste, expérience historique de Loewi et neurotransmetteurs",
    category: "cardiovasculaire",
    enonce: `On étudie la double innervation extrinsèque du cœur (système parasympathique et système orthosympathique).

1. **Stimulations et sections nerveuses :**
   - **Section bilatérale des nerfs vagues (nerfs X pneumogastriques) :** La fréquence cardiaque passe immédiatement de $72\\text{ bat/min}$ à $110\\text{ bat/min}$.
   - **Stimulation électrique du bout périphérique du nerf vague :** Ralentissement intense du rythme cardiaque (bradycardie), diminution de l'amplitude des contractions, voire arrêt momentané du cœur en diastole.
   - **Stimulation des nerfs sympathiques cardiaques :** Augmentation immédiate de la fréquence cardiaque (tachycardie) et de la force de contraction (inotrope positif).

1.1. Déduire le rôle permanent exercé par les nerfs vagues sur le cœur au repos (tonus cardiomodérateur).
1.2. Préciser les effets chronotrope, inotrope et dromotrope des systèmes parasympathique et sympathique.

2. **Expérience princeps d'Otto Loewi (1921) :**
   Un cœur de grenouille $C_1$ avec son nerf vague intact est placé dans un bain de liquide physiologique $B_1$. Ce liquide s'écoule par une canule vers un deuxième cœur de grenouille $C_2$, dénervé, placé dans un compartiment $B_2$.
   - Lorsque l'on stimule le nerf vague du cœur $C_1$, on observe le ralentissement immédiat de $C_1$.
   - Quelques secondes plus tard, le cœur $C_2$ (qui ne reçoit aucune connexion nerveuse) ralentit à son tour de la même manière.
   - Si l'on ajoute de l'atropine sur $C_2$, son ralentissement est supprimé.

2.1. Quelle conclusion fondamentale Loewi a-t-il tirée de cette expérience quant à la nature de la transmission nerveuse ?
2.2. Nommer la substance chimique libérée par le nerf vague (la "Vagusstoff" de Loewi) et celle libérée par les terminaisons orthosympathiques.`,
    correction: `**1. Action des nerfs extrinsèques sur le cœur :**
1.1.
- La section des nerfs vagues accélère le cœur de 72 à $110\\text{ bat/min}$.
- *Déduction :* Au repos, le système parasympathique exerce une action frénatrice permanente sur le cœur : c'est le **tonus cardiomodérateur permanent**. Le nœud sinusal isolé battrait spontanément à $110\\text{ bat/min}$.
1.2.
- **Système parasympathique (Nerf vague / acétylcholine) :** Effet chronotrope négatif (diminue la fréquence), inotrope négatif (diminue la contractilité auriculaire), dromotrope négatif (ralentit la conduction auriculo-ventriculaire).
- **Système orthosympathique (Noradrénaline) :** Effet chronotrope positif (accélère le rythme), inotrope positif (augmente la force contractile ventriculaire), dromotrope positif (accélère la conduction).

**2. L'expérience d'Otto Loewi :**
2.1.
- Le cœur $C_2$ dénervé subit une cardiomodération sans contact électrique avec le nerf stimulé, uniquement par transfert de liquide physiologique.
- *Conclusion :* La transmission du message nerveux au muscle cardiaque n'est pas de nature électrique directe, mais **chimique**. La stimulation nerveuse provoque la libération d'une molécule messagère soluble (neurotransmetteur) qui diffuse dans le liquide de perfusion.
2.2.
- La substance du nerf vague ("Vagusstoff") est l'**acétylcholine (ACh)**, antagonisée par l'atropine.
- Le neurotransmetteur des fibres postganglionnaires orthosympathiques est la **noradrénaline**.`
  },
  {
    id: 9,
    title: "Concours Général Sénégalais — SVT Terminale S2",
    source: "Concours Général Sénégalais",
    sourceType: "concours",
    theme: "Boucle réflexe de régulation de la pression artérielle : baroréflexe et expériences de Hering",
    category: "cardiovasculaire",
    enonce: `La pression artérielle (PA) est une constante physiologique maintenue autour de $120/80\\text{ mmHg}$ chez l'adulte sain.
Heinrich Hering réalise une série d'expériences chez le chien afin de décrypter la boucle de régulation du baroréflexe :

1. **Expériences au niveau du sinus carotidien :**
   - **Expérience A :** On pose une ligature temporaire des deux artères carotides primitives en amont des sinus carotidiens (ligature sous-sinusienne).
     *Observation :* La pression artérielle générale augmente immédiatement et de manière spectaculaire (hypertension réflexe).
   - **Expérience B :** On lève la ligature : la pression artérielle revient à sa valeur de consigne.
   - **Expérience C :** On pose des ligatures en aval des sinus carotidiens (ligatures sus-sinusiennes).
     *Observation :* La pression artérielle générale s'effondre (hypotension réflexe et bradycardie).
   - **Expérience D :** On sectionne les nerfs de Hering (rameaux du nerf glosso-pharyngien IX) et les nerfs de Ludwig-Cyon (rameaux du nerf X).
     *Observation :* Hypertension artérielle sévère et permanente (hypertension neurogène par déafférentation).

1.1. Expliquer les variations de pression au niveau intrasinusien lors des expériences A et C, et en déduire la nature et le rôle des récepteurs logés dans la paroi des sinus carotidiens.
1.2. Préciser le rôle des nerfs de Hering et Cyon.

2. On enregistre les potentiels d'action sur une fibre unique du nerf de Hering pour différentes pressions artérielles intrasinusiennes :
   - À $P = 60\\text{ mmHg}$ : Aucun potentiel d'action.
   - À $P = 100\\text{ mmHg}$ : Fréquence de $20\\text{ PA/s}$.
   - À $P = 140\\text{ mmHg}$ : Fréquence de $60\\text{ PA/s}$.
   - À $P = 180\\text{ mmHg}$ : Fréquence de $120\\text{ PA/s}$.
   Commenter ces enregistrements.

3. Établir l'organigramme fonctionnel complet de la boucle de régulation correctrice lors d'une élévation brutale de la pression artérielle (stimulus $\\to$ barorécepteurs $\\to$ centre bulbaire $\\to$ voies efférentes $\\to$ effecteurs $\\to$ réponse).`,
    correction: `**1. Analyse des expériences de Hering :**
1.1.
- **Expérience A (ligature sous-sinusienne) :** Le sang artériel ne parvient plus aux sinus carotidiens $\\implies$ la pression intrasinusienne locale s'effondre. L'organisme réagit par une hypertension générale compensatrice.
- **Expérience C (ligature sus-sinusienne) :** Le sang s'accumule dans les sinus $\\implies$ la pression intrasinusienne augmente fortement. L'organisme réagit par une hypotension générale.
- *Déduction :* La paroi du sinus carotidien contient des mécanorécepteurs sensibles à l'étirement produit par la pression sanguine : ce sont des **barorécepteurs**.
1.2.
- Les nerfs de Hering et de Cyon sont les **voies centripètes (sensitives)** conduisant les influx barosensibles des sinus carotidiens et de la crosse aortique vers le bulbe rachidien. Leur section (expérience D) simule une pression nulle, levant toute inhibition cardiomodératrice $\\implies$ hypertension permanente.

**2. Codage du message barosensible :**
- Les barorécepteurs codent l'augmentation de pression artérielle en **modulation de fréquence de potentiels d'action**. Plus la pression augmente ($60 \\to 180\\text{ mmHg}$), plus la paroi s'étire et plus la fréquence des décharges augmente ($0 \\to 120\\text{ Hz}$).

**3. Boucle réflexe en cas d'hypertension artérielle :**
1. **Perturbation :** Augmentation de la pression artérielle (hypertension).
2. **Capteurs :** Étirement accru des barorécepteurs carotidiens et aortiques $\\implies$ augmentation de la fréquence des PA sur les nerfs de Hering et Cyon.
3. **Centre intégrateur (Bulbe rachidien) :**
   - Stimulation du noyau moteur du nerf vague (centre cardiomodérateur).
   - Inhibition du centre vasomoteur et du centre cardioaccélérateur médullaire.
4. **Voies efférentes :**
   - Augmentation de l'activité du parasympathique (nerfs X) $\\to$ libération d'ACh.
   - Diminution du tonus orthosympathique $\\to$ baisse de noradrénaline sur les vaisseaux.
5. **Effecteurs :**
   - Cœur : Bradycardie (diminution du rythme) et baisse de contractilité $\\implies$ chute du débit cardiaque ($Q = F_c \\times V_e$).
   - Artérioles : Vasodilatation périphérique $\\implies$ baisse des résistances périphériques ($R$).
6. **Effet correcteur :** D'après $\\text{PA} = Q \\times R$, la pression artérielle diminue et retrouve sa valeur de consigne (homéostasie).`
  },
  {
    id: 10,
    title: "Lycée d'Excellence Mariama Bâ (Gorée) — Épreuve de SVT",
    source: "Maison d'Éducation Mariama Bâ (Gorée)",
    sourceType: "lycee",
    theme: "Choc hémorragique hypovolémique et boucle de compensation neurohormonale (Système RAA)",
    category: "cardiovasculaire",
    enonce: `À la suite d'un accident de la circulation, un patient adulte subit une hémorragie aiguë avec perte rapide d'environ $700\\text{ mL}$ de sang (environ $15\\%$ de sa volémie).
Les paramètres hémodynamiques et biochimiques mesurés aux urgences révèlent :
- Pression artérielle : chute transitoire à $85/50\\text{ mmHg}$, suivie d'une stabilisation à $105/70\\text{ mmHg}$.
- Fréquence cardiaque : $115\\text{ battements/minute}$ (tachycardie).
- Sécrétion urinaire (diurèse) : oligurie sévère ($15\\text{ mL/h}$, normale $> 50\\text{ mL/h}$).
- Peau pâle, froide et moite aux extrémités.
- Analyses sanguines hormonales :
  * Adrénaline plasmatique : multipliée par 5.
  * Rénine plasmatique : multipliée par 8.
  * Aldostérone : très fortement augmentée.
  * ADH (Hormone antidiurétique / vasopressine) : fortement augmentée.

1. Expliquer la cause de la tachycardie et de la pâleur cutanée immédiate observée (mécanisme nerveux d'urgence).
2. Détailler la cascade enzymatique du **système Rénine-Angiotensine-Aldostérone (SRAA)** déclenchée par l'hypotension rénale.
3. Préciser le double mode d'action de l'angiotensine II sur la pression artérielle.
4. Exposer les rôles respectifs de l'**aldostérone** et de l'**ADH** dans la restauration de la volémie et l'oligurie constatée.`,
    correction: `**1. Réponse nerveuse réflexe immédiate :**
- L'hémorragie entraîne une chute de la volémie (hypovolémie) qui diminue le retour veineux, le volume d'éjection systolique et la pression artérielle.
- La baisse de pression artérielle désactive les barorécepteurs carotidiens et aortiques (chute drastique de la fréquence des PA sur les nerfs de Hering et Cyon).
- **Conséquence bulbaire :** Levée du frein cardiomodérateur et stimulation massive du système orthosympathique avec décharge d'adrénaline par la médullosurrénale :
  - Sur le cœur : tachycardie réactionnelle ($115\\text{ bat/min}$) pour compenser la baisse de volémie et préserver le débit cardiaque.
  - Sur les vaisseaux périphériques cutanés : vasoconstriction artériolaire intense $\\alpha_1$-dépendante pour redistribuer le flux sanguin vers les organes nobles vitaux (cerveau, cœur), d'où la pâleur et le refroidissement cutané.

**2. Le Système Rénine-Angiotensine-Aldostérone (SRAA) :**
- L'hypotension dans l'artère rénale stimule l'appareil juxtaglomérulaire rénal qui sécrète une enzyme : la **rénine**.
- La rénine clive l'angiotensinogène hépatique circulant en **angiotensine I** (décapapeptide inactif).
- L'angiotensine I est convertie en **angiotensine II** (octapeptide très actif) au niveau pulmonaire par l'**enzyme de conversion de l'angiotensine (ECA)**.

**3. Actions de l'angiotensine II :**
1. **Vasoconstriction puissante et généralisée :** Augmente immédiatement les résistances périphériques globales ($R$), ce qui fait remonter la pression artérielle ($\\text{PA} = Q \\times R$).
2. **Stimulation de la corticosurrénale :** Provoque la libération d'**aldostérone**.

**4. Rétablissement de la volémie (Aldostérone et ADH) :**
- **Aldostérone :** Agit sur le tube contourné distal et collecteur du rein en stimulant la réabsorption active de $\\text{Na}^+$ vers le sang (et excrétion de $\\text{K}^+$), entraînant une réabsorption d'eau par osmose.
- **ADH (Vasopressine) :** Sécrétée par la post-hypophyse, elle stimule l'insertion d'aquaporines dans les tubes collecteurs rénaux, maximisant la réabsorption facultative d'eau pure.
- **Bilan :** L'eau et le sodium sont retenus dans le compartiment vasculaire $\\implies$ augmentation du volume sanguin (volémie) et diminution drastique du volume d'urine émis (oligurie protectrice).`
  },
  {
    id: 11,
    title: "Lycée Thierno Seydou Nourou Tall — Composition du 1er Semestre",
    source: "Lycée Thierno Seydou Nourou Tall (Dakar)",
    sourceType: "lycee",
    theme: "Régulation du débit cardiaque lors de l'effort musculaire : redistribution vasculaire et adaptation métabolique",
    category: "cardiovasculaire",
    enonce: `On compare les paramètres cardiovasculaires d'un athlète entraîné et d'un sujet sédentaire, au repos puis lors d'un exercice musculaire intense sur bicyclette ergométrique (consommation de $O_2 = 3\\text{ L/min}$).

| Paramètre | Sujet Sédentaire (Repos) | Sujet Sédentaire (Effort) | Athlète Entraîné (Repos) | Athlète Entraîné (Effort) |
| :--- | :--- | :--- | :--- | :--- |
| **Fréquence cardiaque ($F_c$)** | $75\\text{ bat/min}$ | $180\\text{ bat/min}$ | $48\\text{ bat/min}$ | $170\\text{ bat/min}$ |
| **Volume d'éjection systolique ($V_e$)** | $70\\text{ mL}$ | $110\\text{ mL}$ | $115\\text{ mL}$ | $175\\text{ mL}$ |
| **Débit cardiaque ($Q_c$)** | Calculer $Q_1$ | Calculer $Q_2$ | Calculer $Q_3$ | Calculer $Q_4$ |
| **Débit sanguin musculaire** | $1\\text{ L/min}$ | $16\\text{ L/min}$ | $1\\text{ L/min}$ | $25\\text{ L/min}$ |
| **Débit sanguin rénal & digestif** | $2{,}5\\text{ L/min}$ | $0{,}6\\text{ L/min}$ | $2{,}5\\text{ L/min}$ | $0{,}5\\text{ L/min}$ |
| **Débit sanguin cérébral** | $0{,}75\\text{ L/min}$ | $0{,}75\\text{ L/min}$ | $0{,}75\\text{ L/min}$ | $0{,}75\\text{ L/min}$ |

1. Définir le débit cardiaque $Q_c$. Calculer $Q_1, Q_2, Q_3, Q_4$ en $\\text{L/min}$.
2. Comparer les adaptations cardiaques de l'athlète à celles du sédentaire (notion de cœur d'athlète : bradycardie de repos et hypertrophie ventriculaire).
3. Analyser la redistribution des débits sanguins régionaux lors de l'exercice. Expliquer les mécanismes locaux et généraux (vasodilatation métabolique musculaire vs vasoconstriction splanchnique).`,
    correction: `**1. Calcul des débits cardiaques :**
- **Définition :** Le débit cardiaque $Q_c$ est le volume de sang propulsé par chaque ventricule dans l'arbre circulatoire en une minute : $Q_c = F_c \\times V_e$.
- **Calculs :**
  - Sédentaire au repos : $Q_1 = 75 \\times 0{,}070 = 5{,}25\\text{ L/min}$.
  - Sédentaire à l'effort : $Q_2 = 180 \\times 0{,}110 = 19{,}8\\text{ L/min}$.
  - Athlète au repos : $Q_3 = 48 \\times 0{,}115 = 5{,}52\\text{ L/min}$.
  - Athlète à l'effort : $Q_4 = 170 \\times 0{,}175 = 29{,}75\\text{ L/min} \\approx 30\\text{ L/min}$.

**2. Analyse du profil cardiaque de l'athlète :**
- Au repos, l'athlète présente une **bradycardie sinusale physiologique** ($48\\text{ bat/min}$) compensée par un **volume d'éjection systolique élevé** ($115\\text{ mL}$ contre $70\\text{ mL}$), lui permettant d'assurer un débit basal identique tout en ménageant le travail cardiaque.
- À l'effort, son débit cardiaque est multiplié par presque 6 (atteignant $30\\text{ L/min}$, contre $20\\text{ L/min}$ chez le sédentaire) grâce à une capacité d'éjection systolique exceptionnelle ($175\\text{ mL}$). C'est le résultat de l'hypertrophie myocardique et de la compliance ventriculaire induites par l'entraînement d'endurance.

**3. Redistribution du débit sanguin régional :**
- **Débit cérébral :** Parfaitement constant ($0{,}75\\text{ L/min}$) grâce à l'autorégulation myogénique cérébrale assurant l'oxygénation permanente des centres vitaux.
- **Muscles en activité :** Le débit passe de $1\\text{ L/min}$ à 16 voire $25\\text{ L/min}$ (soit plus de $80\\%$ du débit total). Mécanisme : **vasodilatation métabolique active** provoquée par l'accumulation locale de métabolites ($\\text{CO}_2$, $\\text{H}^+$, lactate, adénosine, élévation de température, monoxyde d'azote $\\text{NO}$).
- **Territoire splanchnique (viscères et reins) :** Le débit chute de $2{,}5\\text{ L/min}$ à $0{,}5\\text{ L/min}$. Mécanisme : **vasoconstriction sympathique réflexe** via les récepteurs $\\alpha_1$-adrénergiques, dérivant le flux sanguin disponible vers les muscles squelettiques actifs.`
  },
  {
    id: 12,
    title: "Lycée Valdiodio Ndiaye (Kaolack) — Épreuve de Contrôle de SVT",
    source: "Lycée Valdiodio Ndiaye (Kaolack)",
    sourceType: "lycee",
    theme: "Couplage excitation-contraction myocardique, électrocardiogramme (ECG) et cycle cardiaque",
    category: "cardiovasculaire",
    enonce: `On enregistre simultanément chez un sujet au repos :
- L'électrocardiogramme (ECG) standard en dérivation D2.
- Le phonocardiogramme (bruits du cœur $B_1$ et $B_2$).
- La pression ventriculaire gauche et la pression aortique au cours d'un cycle cardiaque d'une durée totale de $0{,}8\\text{ seconde}$.

1. **Analyse des ondes de l'ECG :**
   1.1. Préciser à quel événement électrique myocardique correspond chaque composante de l'ECG : l'onde $P$, le complexe $QRS$ et l'onde $T$.
   1.2. Pourquoi l'onde de repolarisation auriculaire n'est-elle pas visible sur le tracé classique ?

2. **Phases mécaniques du cycle cardiaque :**
   Découper le cycle cardiaque en ses 3 grandes phases successives en indiquant leur durée respective :
   - Systole auriculaire.
   - Systole ventriculaire (contraction isovolumétrique puis éjection systolique).
   - Diastole générale (relaxation isovolumétrique puis remplissage ventriculaire).

3. **Bruits du cœur et fonctionnement valvulaire :**
   3.1. À quel moment précis survient le premier bruit du cœur ($B_1$ ou "Toum") et quel événement valvulaire en est la cause ?
   3.2. Même question pour le deuxième bruit ($B_2$ ou "Ta").`,
    correction: `**1. Signification électrique des ondes de l'ECG :**
1.1.
- **Onde P :** Dépolarisation des oreillettes droite et gauche (conduite depuis le nœud sinusal).
- **Complexe QRS :** Dépolarisation rapide et puissante des ventricules via le faisceau de His et le réseau de Purkinje.
- **Onde T :** Repolarisation ventriculaire (retour du potentiel de membrane au repos).
1.2.
- La repolarisation auriculaire a lieu en même temps que le complexe QRS : elle est masquée par l'amplitude électrique considérable de la dépolarisation ventriculaire.

**2. Chronologie mécanique du cycle cardiaque ($T = 0{,}8\\text{ s}$) :**
1. **Systole auriculaire ($0{,}1\\text{ s}$)** : Contraction des oreillettes achevant le remplissage des ventricules ($20\\%$ du volume télédiastolique).
2. **Systole ventriculaire ($0{,}3\\text{ s}$)** :
   - *Phase de contraction isovolumétrique ($0{,}05\\text{ s}$)* : Toutes les valves sont fermées. La pression ventriculaire s'élève très vite sans modification de volume.
   - *Phase d'éjection ($0{,}25\\text{ s}$)* : Dès que la pression ventriculaire dépasse la pression aortique ($80\\text{ mmHg}$), les valves sigmoïdes aortiques s'ouvrent, et le sang est éjecté.
3. **Diastole générale ($0{,}4\\text{ s}$)** :
   - *Relaxation isovolumétrique* : Fermeture des sigmoïdes, détente du myocarde.
   - *Remplissage passif rapide puis lent* : Les valves auriculo-ventriculaires s'ouvrent dès que la pression ventriculaire devient inférieure à la pression auriculaire.

**3. Origine des bruits du cœur :**
3.1.
- **Premier bruit $B_1$ ("Toum") :** Marque le **début de la systole ventriculaire**. Il est provoqué par la **fermeture brutale des valves auriculo-ventriculaires** (mitrale et tricuspide) sous la poussée de la montée de pression ventriculaire, empêchant tout reflux de sang vers les oreillettes.
3.2.
- **Deuxième bruit $B_2$ ("Ta") :** Marque la **fin de la systole ventriculaire et le début de la diastole**. Il est causé par le claquement de **fermeture des valves sigmoïdes** (aortique et pulmonaire), empêchant le reflux du sang artériel vers les ventricules relâchés.`
  }
];
