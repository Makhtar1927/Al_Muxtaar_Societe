export interface SVTEpreuveItem {
  id: number;
  title: string;
  source: string;
  sourceType: 'bac' | 'lycee' | 'concours';
  theme: string;
  category: 'neurophysiologie' | 'cardiovasculaire' | 'immunologie' | 'reproduction' | 'genetique';
  enonce: string;
  correction: string;
}

export const SVT_EPREUVES_PART1: SVTEpreuveItem[] = [
  // AXE 1 : NEUROPHYSIOLOGIE & COMPORTEMENT (B1)
  {
    id: 1,
    title: "Baccalauréat Sénégal — Session Normale (Série S2)",
    source: "Baccalauréat Sénégal",
    sourceType: "bac",
    theme: "Potentiels bioélectriques de la fibre nerveuse, canaux ioniques et période réfractaire",
    category: "neurophysiologie",
    enonce: `On étudie les propriétés électriques de l'axone géant de calmar placé dans de l'eau de mer artificielle à $20^\\circ\\text{C}$.
Un dispositif d'enregistrement comprend deux microélectrodes $E_1$ et $E_2$.

1. L'électrode $E_1$ est introduite à l'intérieur de l'axone tandis que $E_2$ reste à la surface externe. L'oscilloscope affiche une différence de potentiel de $-70\\text{ mV}$.
   1.1. Comment qualifie-t-on ce potentiel ? Quelle est son origine ionique (répartition de $\\text{Na}^+$ et $\\text{K}^+$, pompe $\\text{Na}^+/\\text{K}^+$) ?
   1.2. Que devient cette ddp si on ajoute du dinitrophénol (DNP), inhibiteur de la synthèse d'ATP ? Justifier.

2. On applique une stimulation efficace d'intensité $I_1$ en un point $S$ de l'axone. L'oscilloscope enregistre un potentiel d'action diphasique puis monophasique d'amplitude $100\\text{ mV}$ culminant à $+30\\text{ mV}$.
   2.1. Décomposer les différentes phases du potentiel d'action (dépolarisation, repolarisation, hyperpolarisation).
   2.2. Préciser les mouvements ioniques et l'état des canaux voltage-dépendants ($\\text{CVD } \\text{Na}^+$, $\\text{CVD } \\text{K}^+$) à chaque phase.

3. Deux stimulations supraliminaires identiques $S_1$ et $S_2$ sont portées avec un intervalle de temps $\\Delta t$ variable :
   - Pour $\\Delta t = 1\\text{ ms}$ : la seconde stimulation n'entraîne aucune réponse.
   - Pour $\\Delta t = 3\\text{ ms}$ : la seconde réponse a une amplitude réduite de moitié.
   - Pour $\\Delta t = 6\\text{ ms}$ : la seconde réponse est identique à la première.
   Expliquer ces résultats en définissant la période réfractaire absolue (PRA) et la période réfractaire relative (PRR).`,
    correction: `**1. Origine du potentiel de repos :**
1.1. Il s'agit du **potentiel de repos** ($-70\\text{ mV}$). L'intérieur de la fibre est électronégatif par rapport à l'extérieur.
- **Répartition asymétrique :** Forte concentration intracellulaire en $\\text{K}^+$ et faible en $\\text{Na}^+$ ; l'inverse dans le milieu extracellulaire.
- **Perméabilité membranaire :** Canaux de fuite plus perméables au $\\text{K}^+$ qu'au $\\text{Na}^+$.
- **Pompe $\\text{Na}^+/\\text{K}^+$ ATPase :** Transport actif anti-gradient expulsant $3\\,\\text{Na}^+$ pour $2\\,\\text{K}^+$ entrés, maintenant le gradient électrochimique.
1.2. En présence de DNP, la production d'ATP est bloquée. La pompe $\\text{Na}^+/\\text{K}^+$ s'arrête ; par diffusion passive par les canaux de fuite, les gradients ioniques s'annulent progressivement et la ddp tend vers $0\\text{ mV}$.

**2. Analyse du potentiel d'action (PA) :**
2.1. et 2.2.
- **Phase 1 : Dépolarisation brutale (de $-70\\text{ mV}$ à $+30\\text{ mV}$)** : Ouverture rapide des $\\text{CVD } \\text{Na}^+$. Entrée massive d'ions $\\text{Na}^+$ suivant leur gradient électrochimique.
- **Phase 2 : Repolarisation (de $+30\\text{ mV}$ à $-70\\text{ mV}$)** : Inactivation des $\\text{CVD } \\text{Na}^+$ (porte d'inactivation fermée) et ouverture plus lente des $\\text{CVD } \\text{K}^+$. Sortie d'ions $\\text{K}^+$.
- **Phase 3 : Hyperpolarisation (jusqu'à $-80\\text{ mV}$)** : Fermeture lente et retardée des $\\text{CVD } \\text{K}^+$, entraînant une sortie excessive de potassium.
- **Retour au repos** : Action restauratrice de la pompe $\\text{Na}^+/\\text{K}^+$ ATPase.

**3. Période réfractaire :**
- À $\\Delta t = 1\\text{ ms}$ : **Période Réfractaire Absolue (PRA)**. Les $\\text{CVD } \\text{Na}^+$ sont tous inactivés ; aucune dépolarisation n'est physiologiquement possible, quelle que soit l'intensité du stimulus.
- À $\\Delta t = 3\\text{ ms}$ : **Période Réfractaire Relative (PRR)**. Une fraction des $\\text{CVD } \\text{Na}^+$ a retrouvé son état de repos réactivable, tandis que certains $\\text{CVD } \\text{K}^+$ sont encore ouverts. Un PA d'amplitude amoindrie est généré.
- À $\\Delta t = 6\\text{ ms}$ : Tous les canaux ont retrouvé leur configuration initiale de repos, le PA retrouve son amplitude maximale canonique ($100\\text{ mV}$).`
  },
  {
    id: 2,
    title: "Lycée Seydina Limamou Laye — Devoir Surveillé du 1er Semestre",
    source: "Lycée Seydina Limamou Laye (Pikine)",
    sourceType: "lycee",
    theme: "Transmission synaptique chimique neuro-neuronique et sommation spatio-temporelle",
    category: "neurophysiologie",
    enonce: `On étudie les mécanismes d'intégration nerveuse au niveau d'un motoneurone médullaire $M$ recevant trois terminaisons synaptiques présynaptiques $A$, $B$ et $C$.
Une microélectrode réceptrice $R_1$ est implantée dans le péricaryon de $M$ et une microélectrode $R_2$ au niveau du cône axonique (zone gâchette).

1. On stimule isolément les neurones :
   - Stimulation de $A$ : $R_1$ enregistre une dépolarisation de $+8\\text{ mV}$. Aucun PA en $R_2$.
   - Stimulation de $B$ : $R_1$ enregistre une dépolarisation de $+10\\text{ mV}$. Aucun PA en $R_2$.
   - Stimulation de $C$ : $R_1$ enregistre une hyperpolarisation de $-7\\text{ mV}$. Aucun PA en $R_2$.
   1.1. Qualifier les réponses obtenues en $R_1$. Donner le nom précis de chaque synapse ($A-M$, $B-M$, $C-M$).
   1.2. Nommer les neurotransmetteurs classiques impliqués et les ions responsables des flux membranaires.

2. On réalise des combinaisons de stimulations :
   - Expérience 1 : Deux stimulations très rapprochées sur $A$ (intervalle $1\\text{ ms}$). $R_1$ enregistre une ddp de $+15\\text{ mV}$ et $R_2$ enregistre un potentiel d'action propageable.
   - Expérience 2 : Stimulations simultanées sur $A$ et $B$. $R_1$ enregistre $+17\\text{ mV}$ et $R_2$ enregistre un potentiel d'action propageable.
   - Expérience 3 : Stimulations simultanées sur $A$, $B$ et $C$. $R_1$ enregistre $+10\\text{ mV}$ et aucun PA en $R_2$.
   2.1. Identifier les modes de sommation mis en évidence dans les expériences 1 et 2.
   2.2. Quel est le seuil de dépolarisation du cône axonique nécessaire pour déclencher un PA ? Interpréter l'expérience 3.`,
    correction: `**1. Nature des potentiels post-synaptiques :**
1.1.
- Pour $A$ et $B$ : Les réponses sont des **PPSE (Potentiels Post-Synaptiques Excitateurs)** car il y a dépolarisation transitoire locale. Les synapses $A-M$ et $B-M$ sont **excitatrices**.
- Pour $C$ : La réponse est un **PPSI (Potentiel Post-Synaptique Inhibiteur)** caractérisé par une hyperpolarisation. La synapse $C-M$ est **inhibitrice**.
1.2.
- Pour le PPSE (synapses $A$ et $B$) : neurotransmetteur excitateur tel que le glutamate ou l'acétylcholine ; fixation sur récepteurs-canaux chimiodépendants provoquant l'**entrée d'ions $\\text{Na}^+$**.
- Pour le PPSI (synapse $C$) : neurotransmetteur inhibiteur tel que le GABA ou la glycine ; ouverture des canaux chimiodépendants aux ions $\\text{Cl}^-$ (entrée de chlorure) ou $\\text{K}^+$ (sortie de potassium), augmentant l'électronégativité interne.

**2. Intégration nerveuse et sommations :**
2.1.
- **Expérience 1 : Sommation temporelle.** Deux influx successifs rapprochés issus du même bouton présynaptique s'additionnent dans le temps avant dissipation du premier PPSE ($8\\text{ mV} + 8\\text{ mV} \\approx 15\\text{ mV}$ compte tenu d'un léger amortissement).
- **Expérience 2 : Sommation spatiale.** Deux influx arrivant simultanément par deux synapses distinctes géographiquement s'additionnent au niveau du corps cellulaire ($8\\text{ mV} + 10\\text{ mV} = 17\\text{ mV}$).
2.2.
- **Seuil de déclenchement :** Le potentiel de repos étant de $-70\\text{ mV}$, une dépolarisation de $+15\\text{ mV}$ amène le potentiel à $-55\\text{ mV}$, ce qui correspond au **seuil d'ouverture des $\\text{CVD } \\text{Na}^+$** du segment initial de l'axone (seuil d'excitabilité).
- **Expérience 3 :** Sommation algébrique simultanée spatiale de deux PPSE et d'un PPSI : $\\Delta V = +8 + 10 - 7 = +11\\text{ mV}$. Cette valeur est inférieure au seuil de $+15\\text{ mV}$ (ddp finale $-59\\text{ mV} < -55\\text{ mV}$). Le motoneurone reste sous-liminaire : aucun potentiel d'action n'est émis.`
  },
  {
    id: 3,
    title: "Concours Général Sénégalais — Sciences de la Vie et de la Terre",
    source: "Concours Général Sénégalais",
    sourceType: "concours",
    theme: "Expériences historiques de Magendie et arc réflexe myotatique médullaire",
    category: "neurophysiologie",
    enonce: `Afin d'élucider les voies anatomiques et fonctionnelles du réflexe rotulien, François Magendie réalise des sections et stimulations sur les racines rachidiennes d'un mammifère.

1. **Tableau des expériences historiques :**
   - **Expérience 1 :** Section de la racine dorsale (postérieure) du nerf rachidien innervant la patte postérieure droite.
     *Observation :* Perte totale de sensibilité dans la patte droite ; la motricité volontaire et réflexe persiste.
   - **Expérience 2 :** Section de la racine ventrale (antérieure) du même nerf.
     *Observation :* Paralysie motrice complète du membre droit ; la sensibilité cutanée et proprioceptive est intacte.
   - **Expérience 3 :** Sur la racine postérieure sectionnée :
     a) Stimulation du bout périphérique (côté membre) : aucun effet.
     b) Stimulation du bout central (côté moelle) : douleur vive et mouvement réflexe de retrait.
   - **Expérience 4 :** Sur la racine antérieure sectionnée :
     a) Stimulation du bout périphérique : contraction musculaire immédiate de la patte.
     b) Stimulation du bout central : aucun effet moteur ni sensitif.

1.1. Conclure rigoureusement sur le rôle respectif de la racine dorsale et de la racine ventrale du nerf rachidien.
1.2. Préciser le sens de propagation de l'influx nerveux dans chacune d'elles (centripète ou centrifuge).

2. Dans le cadre du **réflexe myotatique rotulien** :
   2.1. Définir le réflexe myotatique et indiquer son importance physiologique posturale.
   2.2. Établir le schéma fonctionnel complet de l'arc réflexe en intégrant : le récepteur sensoriel (fuseau neuromusculaire), la fibre sensitive Ia, le centre médullaire, la synapse monosynaptique excitatrice, l'interneurone inhibiteur de Renshaw, le motoneurone $\\alpha$ agoniste (muscle quadriceps) et le motoneurone antagoniste (muscle ischio-jambier). Justifier l'innervation réciproque.`,
    correction: `**1. Analyse des expériences de Magendie :**
1.1.
- **Racine dorsale (postérieure) :** Voie sensitive. Sa section supprime la sensibilité sans altérer la motricité. La stimulation du bout central déclenche sensation et réflexe, alors que le bout périphérique est inerte. La racine dorsale conduit exclusivement les influx sensitifs.
- **Racine ventrale (antérieure) :** Voie motrice. Sa section provoque la paralysie sans anesthésie. La stimulation du bout périphérique déclenche la contraction musculaire, tandis que le bout central est sans effet. La racine ventrale est exclusivement conductrice motrice.
1.2.
- Dans la racine dorsale : propagation **centripète** (du récepteur périphérique vers les centres nerveux médullaires).
- Dans la racine ventrale : propagation **centrifuge** (du centre médullaire vers les effecteurs musculaires périphériques).

**2. Le réflexe myotatique rotulien :**
2.1.
- **Définition :** Contraction réflexe d'un muscle en réponse à son propre étirement.
- **Rôle physiologique :** Maintien du tonus postural antigravitaire (lutte contre la flexion des genoux sous l'effet du poids corporel) et coordination des mouvements harmonieux.
2.2.
- **Chaîne de l'arc réflexe :**
  1. *Stimulus :* Choc sur le tendon sous-rotulien $\\to$ étirement du quadriceps.
  2. *Récepteur :* Fuseaux neuromusculaires sensibles à la variation de longueur.
  3. *Voie afférente :* Fibres myélinisées Ia conduisant les PA vers la corne postérieure de la moelle épinière (corps cellulaires dans le ganglion spinal).
  4. *Centre intégrateur (Moelle épinière) :*
     - Connexion directe **monosynaptique** avec le motoneurone $\\alpha$ du muscle étiré (quadriceps).
     - Connexion **polysynaptique** via un interneurone inhibiteur glycinergique avec le motoneurone du muscle fléchisseur antagoniste (ischio-jambier).
  5. *Voie efférente :* Axones des motoneurones $\\alpha$ empruntant la racine ventrale.
  6. *Effecteurs :* Contraction du muscle extenseur agoniste (quadriceps) et relâchement coordonné du muscle antagoniste (ischio-jambier).
- **Principe d'innervation réciproque (Sherrington) :** Empêche tout blocage mécanique articulaire en relaxant le muscle opposé lors de la contraction du muscle moteur.`
  },
  {
    id: 4,
    title: "Prytanée Militaire de Saint-Louis — Composition Trimestrielle",
    source: "Prytanée Militaire Charles Ntchoréré (Saint-Louis)",
    sourceType: "lycee",
    theme: "Effets de toxines synaptiques : Curare, Toxine Botulique et Sarin sur la plaque motrice",
    category: "neurophysiologie",
    enonce: `On étudie la transmission neuromusculaire au niveau de la jonction myoneuronale de la grenouille.
On teste l'action de trois substances pharmacologiques $X$, $Y$ et $Z$ :
- **Substance X (Curare) :** Injectée dans la fente synaptique. Une stimulation du nerf moteur déclenche un PA présynaptique normal et la libération d'acétylcholine (ACh). Cependant, aucun potentiel de plaque motrice (PPM) n'est enregistré sur le muscle, et aucune contraction ne se produit.
- **Substance Y (Toxine botulique) :** Injectée au préalable. La stimulation du nerf moteur provoque un PA présynaptique, mais aucune molécule d'ACh n'est libérée dans la fente synaptique. Le muscle reste flasque.
- **Substance Z (Sarin / Éserine) :** Injectée dans la fente synaptique. Une seule stimulation nerveuse déclenche une contraction tétanique prolongée et convulsive du muscle. Le dosage montre que l'ACh reste intacte dans la fente sans être détruite.

1. Rappeler les 5 étapes successives de la transmission synaptique neuro-musculaire en conditions physiologiques normales.
2. Expliquer précisément le mécanisme d'action moléculaire de chacune des trois substances $X$, $Y$ et $Z$.
3. Indiquer laquelle de ces substances peut être utilisée en anesthésie chirurgicale comme curarisant et laquelle est employée en médecine esthétique (Botox).`,
    correction: `**1. Les étapes normales de la transmission synaptique neuromusculaire :**
1. Arrivée du PA au bouton terminal présynaptique et dépolarisation de la membrane.
2. Ouverture des canaux calcium voltage-dépendants ($\\text{CVD } \\text{Ca}^{2+}$) et entrée massive d'ions $\\text{Ca}^{2+}$.
3. Exocytose des vésicules synaptiques et libération d'acétylcholine (ACh) dans la fente synaptique.
4. Fixation de l'ACh sur les récepteurs nicotiniques post-synaptiques (canaux chimiodépendants à $\\text{Na}^+$) $\\to$ entrée de $\\text{Na}^+$, genèse du PPM puis du PA musculaire entraînant la libération de $\\text{Ca}^{2+}$ par le réticulum sarcoplasmique et la contraction musculaire.
5. Inactivation rapide de l'ACh par hydrolyse enzymatique via l'acétylcholinestérase (AChE) en acétate et choline (recapturée).

**2. Mécanisme moléculaire des toxines :**
- **Substance X (Curare) :** Antagoniste compétitif des récepteurs nicotiniques de l'ACh. Il se lie aux récepteurs sans ouvrir le canal ionique $\\text{Na}^+$, bloquant l'accès à l'ACh. Conséquence : pas de PPM, paralysie flasque.
- **Substance Y (Toxine botulique) :** Endopeptidase qui clive les protéines du complexe SNARE indispensables à la fusion des vésicules synaptiques avec la membrane plasmique. L'exocytose de l'ACh est impossible. Conséquence : blocage présynaptique total, paralysie flasque.
- **Substance Z (Sarin / Inhibiteur de l'AChE) :** Inhibe irréversiblement l'acétylcholinestérase. L'ACh persiste indéfiniment dans la fente et stimule continuellement les récepteurs post-synaptiques. Conséquence : dépolarisation permanente, tétanie et asphyxie convulsive.

**3. Applications médicales :**
- Le **curare** (ou dérivés de synthèse) est utilisé en anesthésie pour relâcher les muscles lors des interventions chirurgicales ou intubations.
- La **toxine botulique (Botox)** est employée à doses infimes en médecine esthétique pour atténuer les rides d'expression en paralysant temporairement les muscles peauciers.`
  },
  {
    id: 5,
    title: "Lycée Maurice Delafosse — Composition Commune de Terminale S2",
    source: "Lycée Maurice Delafosse (Dakar)",
    sourceType: "lycee",
    theme: "Réflexes conditionnels de Pavlov, acquisition, extinction et support cortical",
    category: "neurophysiologie",
    enonce: `On étudie la mise en place d'un réflexe salivaire conditionnel selon le protocole de Pavlov chez le chien.

1. **Protocole expérimental :**
   - **Étape 1 :** On présente de la viande à un chien. On observe une salivation abondante immédiate.
   - **Étape 2 :** On fait retentir un son de cloche isolé. Le chien dresse l'oreille mais ne salive pas.
   - **Étape 3 :** On fait retentir le son de cloche, puis immédiatement après, on présente la poudre de viande. L'opération est répétée 30 fois sur plusieurs jours.
   - **Étape 4 :** On fait retentir uniquement le son de cloche. On constate une salivation immédiate.

1.1. Qualifier les stimuli (viande, cloche) et les réponses dans les étapes 1, 2 et 4.
1.2. Quelles sont les conditions indispensables pour l'établissement d'un tel réflexe (concomitance temporelle, répétition, état de vigilance) ?

2. **Évolution du réflexe conditionné :**
   - Si l'on continue à faire sonner la cloche sans jamais donner de viande pendant 15 jours consécutifs, que constate-t-on ? Quel est ce phénomène ?
   - Chez un animal dont le cortex cérébral a été chirurgicalement réséqué (animal décortiqué), le réflexe inné persiste-t-il ? Le réflexe conditionnel peut-il s'établir ? Conclure sur le rôle du cortex cérébral.`,
    correction: `**1. Analyse du conditionnement pavlovien :**
1.1.
- **Étape 1 :** La viande est un **stimulus inconditionnel (absolu)** déclenchant une **réponse inconditionnelle (innée)** de salivation.
- **Étape 2 :** Le son de cloche est un **stimulus neutre** (déclenche une simple réaction d'orientation sans salivation).
- **Étape 4 :** Le son de cloche est devenu un **stimulus conditionnel**, déclenchant une **réponse conditionnelle (acquise)** de salivation.
1.2.
- **Conditions de réussite :**
  1. Le stimulus neutre doit précéder immédiatement le stimulus inconditionnel (intervalle de quelques secondes).
  2. Répétition fréquente de l'association (renforcement).
  3. Animal éveillé, en bon état physiologique et motivé par la faim.
  4. Absence de stimuli perturbateurs extérieurs (inhibition externe).

**2. Dynamique et circuits cérébraux :**
- **Extinction du réflexe :** Si le stimulus conditionnel n'est plus renforcé par la viande, la salivation diminue puis disparaît : c'est l'**extinction** du réflexe conditionné. Il s'agit d'une inhibition corticale active et non d'un oubli passif.
- **Rôle du cortex cérébral :**
  - Chez l'animal décortiqué : le **réflexe inné** persiste car son arc réflexe est sous-cortical (bulbe rachidien / tronc cérébral).
  - En revanche, le **réflexe conditionnel ne peut pas s'établir** (et les réflexes acquis disparaissent).
  - *Conclusion :* Le cortex cérébral est le centre intégrateur obligatoire des liaisons fonctionnelles temporaires requises pour tout réflexe conditionnel.`
  },
  {
    id: 6,
    title: "Lycée Lamine Guèye (Dakar) — Épreuve de Contrôle Continu",
    source: "Lycée Lamine Guèye",
    sourceType: "lycee",
    theme: "Codage de l'information nerveuse : modulation en fréquence de PA et sommation des potentiels de récepteur",
    category: "neurophysiologie",
    enonce: `On étudie le corpuscule de Pacini (récepteur sensoriel cutané de pression) relié à sa fibre sensitive myélinisée afférente.
On applique sur la capsule conjonctive du corpuscule des pressions mécaniques croissantes $P_1 < P_2 < P_3 < P_4$.

On enregistre :
- En $R_1$, au niveau du site transducteur (terminaison nerveuse amélinisée dénudée).
- En $R_2$, au niveau du premier nœud de Ranvier (site générateur).
- En $R_3$, le long de l'axone myélinisé.

1. **Résultats expérimentaux :**
   - À $P_1$ (très faible) : $R_1$ enregistre une dépolarisation de $+5\\text{ mV}$ locale et décroissante. Rien en $R_2$ ni $R_3$.
   - À $P_2$ : $R_1$ enregistre $+12\\text{ mV}$. Rien en $R_2$ ni $R_3$.
   - À $P_3$ : $R_1$ enregistre $+18\\text{ mV}$. $R_2$ et $R_3$ enregistrent un train de 10 potentiels d'action par seconde (fréquence $10\\text{ Hz}$).
   - À $P_4$ ($P_4 = 2 P_3$) : $R_1$ enregistre $+32\\text{ mV}$. $R_2$ et $R_3$ enregistrent un train de 45 potentiels d'action par seconde (fréquence $45\\text{ Hz}$), tous d'amplitude identique ($100\\text{ mV}$).

1.1. Nommer le potentiel recueilli en $R_1$. Quelles sont ses propriétés (loi du tout ou rien ou réponse graduée) ?
1.2. Nommer le seuil mis en évidence entre $P_2$ et $P_3$.
1.3. En déduire les deux modes fondamentaux de codage de l'information nerveuse : au niveau du récepteur et le long de la fibre nerveuse.`,
    correction: `**1. Analyse des enregistrements :**
1.1.
- Le potentiel recueilli en $R_1$ est le **potentiel de récepteur (ou potentiel transducteur)**.
- **Propriétés :** C'est un potentiel **local**, **non propageable** (s'atténue avec la distance), **sommable** et **gradué en amplitude** proportionnellement à l'intensité de la pression appliquée. Il n'obéit pas à la loi du tout ou rien.
1.2.
- Entre $P_2$ ($12\\text{ mV}$) et $P_3$ ($18\\text{ mV}$) se situe le **seuil d'ouverture des canaux $\\text{CVD } \\text{Na}^+$** du premier nœud de Ranvier (site générateur), fixé à environ $+15\\text{ mV}$ de dépolarisation.

**2. Codage de l'information nerveuse :**
- **Au niveau du récepteur sensoriel (site transducteur) :** L'intensité du stimulus mécanique est codée en **modulation d'amplitude** du potentiel de récepteur. Plus la pression augmente, plus l'amplitude de la dépolarisation est forte.
- **Le long de la fibre nerveuse (axone conducteur) :** Les potentiels d'action obéissent strictement à la **loi du tout ou rien** (leur amplitude est constante, $100\\text{ mV}$). L'intensité du stimulus est donc codée en **modulation de fréquence** de potentiels d'action (le train de PA passe de $10\\text{ Hz}$ à $45\\text{ Hz}$).`
  }
];
