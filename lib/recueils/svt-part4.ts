import { SVTEpreuveItem } from './svt-part1';

export const SVT_EPREUVES_PART4: SVTEpreuveItem[] = [
  // AXE 4 : REPRODUCTION & ENDOCRINOLOGIE HUMAINE (B4)
  {
    id: 19,
    title: "Baccalauréat Sénégal — Session Normale (Série S2)",
    source: "Baccalauréat Sénégal",
    sourceType: "bac",
    theme: "Gamétogenèse comparée : spermatogenèse vs ovogenèse et déroulement méiotique",
    category: "reproduction",
    enonce: `On étudie la formation des gamètes chez l'espèce humaine à travers l'analyse comparée de la spermatogenèse et de l'ovogenèse.

1. **Tableau comparatif des deux gamétogenèses :**
   Remplir et commenter les critères suivants :
   - Lieu précis du déroulement dans la gonade.
   - Période d'activité au cours de la vie (vie intra-utérine, puberté, ménopause / andropause).
   - Continuité du processus (continu vs cyclique avec blocages méiotiques).
   - Rendement quantitatif (nombre de gamètes fonctionnels formés à partir d'une cellule souche diploïde).
   - Différenciation morphologique terminale (présence ou absence de spermiogenèse).

2. **Les blocages méiotiques au cours de l'ovogenèse :**
   2.1. À quel stade précis de la méiose se produit le premier blocage méiotique ? Quand et sous quelle influence hormonale est-il levé ?
   2.2. À quel stade se produit le deuxième blocage méiotique ? Quel événement biologique indispensable permet son achèvement complet et l'expulsion du deuxième globule polaire ?

3. **Caryotypes et ploïdie :**
   Donner la formule chromosomique et la quantité d'ADN ($Q$) des cellules suivantes chez l'homme :
   - Spermatogonie souche.
   - Spermatocyte I en prophase I.
   - Spermatocyte II en métaphase II.
   - Spermatozoïde mûr.`,
    correction: `**1. Tableau comparatif synthétique :**
| Critère | Spermatogenèse (Homme) | Ovogenèse (Femme) |
| :--- | :--- | :--- |
| **Lieu anatomique** | Paroi des tubes séminifères (testicule) | Follicules du cortex ovarien |
| **Période de la vie** | Continue de la puberté jusqu'à la fin de la vie | Initiée durant la vie embryonnaire, suspendue, active de la puberté à la ménopause |
| **Continuité** | Processus continu ininterrompu ($\approx 74\\text{ jours}$) | Discontinu, cyclique (28 jours), marqué par 2 blocages méiotiques |
| **Rendement quantitatif** | 1 spermatogonie $\\to$ **4 spermatozoïdes fonctionnels** | 1 ovogonie $\\to$ **1 seul ovocyte II fécondable** + globules polaires avortés |
| **Spermiogenèse** | Oui (phase de métamorphose cytologique complexe) | Non |

**2. Les blocages méiotiques chez la femme :**
2.1.
- **Premier blocage :** S'effectue en **prophase I (stade diplotène)** dès le 7ème mois de la vie fœtale. Les ovocytes I demeurent quiescents dans les follicules primordiaux.
- *Levée du blocage :* À partir de la puberté, à chaque cycle ovarien, sous l'influence du **pic préovulatoire de gonadostimulines (LH et FSH)**, l'ovocyte I du follicule mûr de De Graaf achève sa méiose I et donne un ovocyte II et le 1er globule polaire.
2.2.
- **Deuxième blocage :** S'effectue en **métaphase II** de la méiose II. L'ovocyte II est expulsé de l'ovaire lors de l'ovulation bloqué à ce stade.
- *Levée définitive :* Elle est conditionnée obligatoirement par la **pénétration du spermatozoïde fécondant** (signal calcique intracellulaire déclenchant l'inactivation du facteur MPF/CSF), permettant l'achèvement de l'anaphase II/télophase II et l'expulsion du **deuxième globule polaire**.

**3. Ploïdie et quantité d'ADN :**
- **Spermatogonie souche :** $2n = 46$ chromosomes à 1 chromatide ($2Q$ d'ADN).
- **Spermatocyte I (après réplication, prophase I) :** $2n = 46$ chromosomes dupliqués à 2 chromatides ($4Q$ d'ADN).
- **Spermatocyte II (après division réductionnelle, métaphase II) :** $n = 23$ chromosomes dupliqués à 2 chromatides ($2Q$ d'ADN).
- **Spermatozoïde mature :** $n = 23$ chromosomes simples à 1 chromatide ($Q$ d'ADN).`
  },
  {
    id: 20,
    title: "Lycée Seydina Limamou Laye — Devoir Surveillé de SVT",
    source: "Lycée Seydina Limamou Laye",
    sourceType: "lycee",
    theme: "Régulation neurohormonale du cycle ovarien et utérin : rétrocontrôles et pic de LH",
    category: "reproduction",
    enonce: `On étudie le synchronisme parfait entre le cycle ovarien (phase folliculaire, ovulation, phase lutéale), le cycle utérin (endomètre et dentelle utérine) et le cycle des sécrétions hypophysaires (FSH, LH) chez une femme de cycle régulier de 28 jours.

1. **Évolution hormonale ovarienne et conséquences utérines :**
   1.1. Décrire l'évolution de la concentration plasmatique des **œstrogènes** et de la **progestérone** au cours des 28 jours du cycle.
   1.2. Préciser le tissu cellulaire source de chaque hormone au cours des deux phases du cycle.
   1.3. Quel est l'effet de ces hormones ovariennes sur la muqueuse utérine (prolifération, vascularisation, glandes en tubes contournés / dentelle utérine) et sur la glaire cervicale ?

2. **Rétrocontrôles sur l'axe hypothalamo-hypophysaire :**
   - Durant les 10 premiers jours du cycle, un taux modéré d'œstrogènes freine la sécrétion de FSH et de LH.
   - Vers le 12ème-13ème jour, le follicule mûr sécrète une dose massive d'œstrogènes dépassant le seuil de $200\\text{ pg/mL}$ pendant plus de 36 heures.
   - Immédiatement après (vers J13,5), on observe une décharge massive de LH et FSH (pic ovulatoire).
   - En phase lutéale, l'association de progestérone et d'œstrogènes maintient les taux de LH et FSH à un niveau très bas.

2.1. Qualifier la nature des rétrocontrôles intervenant aux différentes phases (rétrocontrôle négatif vs rétrocontrôle positif).
2.2. Quel événement majeur du cycle ovarien est directement provoqué par le pic de LH 24 à 36 heures plus tard ?
2.3. Que se produit-il à J28 en l'absence de fécondation (lutéolyse, chute hormonale et mécanisme de la menstruation) ?`,
    correction: `**1. Dynamique hormonale ovarienne et utérine :**
1.1.
- **Phase folliculaire ($J_1$ à $J_{14}$) :** Sécrétion progressive d'**œstrogènes** qui culmine à un pic préovulatoire maximal à $J_{12}-J_{13}$ ($> 200\\text{ pg/mL}$). La progestérone est indétectable.
- **Phase lutéale ($J_{14}$ à $J_{28}$) :** Sécrétion conjointe et massive de **progestérone** (culminant à $J_{21}$) et d'un second dôme d'œstrogènes.
1.2.
- **Sources :** Les œstrogènes sont produits par la thèque interne et la granulosa des follicules ovariens en croissance. En phase lutéale, la progestérone et les œstrogènes sont synthétisés par les cellules lutéinisées du **corps jaune**.
1.3.
- **Sur l'endomètre utérin :**
  - Phase proliférative (sous œstrogènes) : épaississement de la muqueuse ($1 \\to 3\\text{ mm}$) et régénération de la vascularisation.
  - Phase sécrétoire (sous progestérone + œstrogènes) : développement intense des vaisseaux spiralés et contournement extrême des glandes sécrétant du glycogène (**dentelle utérine** prête pour la nidation).
- **Sur la glaire cervicale :** Au moment de l'ovulation, sous l'effet du pic d'œstrogènes, la glaire devient claire, fluide, filante et à maillage lâche pour faciliter le passage des spermatozoïdes. En phase lutéale, la progestérone la rend épaisse, visqueuse et imperméable.

**2. Les rétrocontrôles neuroendocriniens :**
2.1.
- **Phase folliculaire précoce ($J_1 - J_{10}$) :** Rétrocontrôle **négatif (RC-)** modéré exercé par les œstrogènes sur l'axe hypothalamo-hypophysaire, freinant la LH et la FSH.
- **Fin de phase folliculaire ($J_{12} - J_{13}$) :** Rétrocontrôle **positif (RC+)** exceptionnel. Lorsque le taux d'œstrogènes dépasse le seuil critique d'environ $200\\text{ pg/mL}$ pendant plus de 36 heures, le rétrocontrôle s'inverse et déclenche une stimulation explosive de la sécrétion pulsatile de GnRH et des gonadotrophines.
- **Phase lutéale :** Rétrocontrôle **négatif puissant (RC-)** exercé par le couple progestérone + œstrogènes, verrouillant l'hypophyse et empêchant tout nouveau recrutement folliculaire.
2.2.
- Le **pic préovulatoire de LH** déclenche la reprise méiotique de l'ovocyte I, la rupture de la paroi folliculaire et l'**ovulation** (expulsion de l'ovocyte II) exactement 36 heures après le début du pic (vers $J_{14}$).
2.3.
- En l'absence de fécondation, le corps jaune régresse spontanément (**lutéolyse**). Les taux de progestérone et d'œstrogènes s'effondrent brutalement.
- Cette privation hormonale entraîne la constriction ischémique spastique des artérioles spiralées, la nécrose et le détachement de la couche fonctionnelle de l'endomètre : c'est la **menstruation (règles)** marquant le premier jour ($J_1$) du cycle suivant.`
  },
  {
    id: 21,
    title: "Concours Général Sénégalais — SVT Terminale S2",
    source: "Concours Général Sénégalais",
    sourceType: "concours",
    theme: "De la fécondation à la nidation : réaction acrosomique, blocage de la polyspermie et HCG",
    category: "reproduction",
    enonce: `On étudie les étapes cytologiques et moléculaires précoces de la fécondation et de la nidation chez les mammifères.

1. **Reconnaissance et pénétration gamétique dans l'ampoule tubaire :**
   1.1. Qu'est-ce que la **capacitation** des spermatozoïdes acquise dans les voies génitales femelles ?
   1.2. Décrire la **réaction acrosomique** induite par la liaison du spermatozoïde à la protéine ZP3 de la zone pellucide (rôle de l'hyaluronidase et de l'acrosine).

2. **La prévention de la polyspermie :**
   Chez les mammifères, la pénétration de plus d'un spermatozoïde dans l'ovocyte (polyspermie) est létale.
   Expliquer les deux mécanismes successifs de blocage :
   - Le blocage membranaire rapide (dépolarisation électrique transitoire).
   - Le blocage cortical lent et définitif (**réaction corticale** : exocytose des granules corticaux, hydrolyse des récepteurs ZP3 et durcissement de la zone pellucide).

3. **Du zygote à la nidation :**
   3.1. Préciser le calendrier chronologique de la segmentation de l'œuf dans la trompe de Fallope (stade morula à $J_4$, blastocyste avec embryoblaste et trophoblaste à $J_6-J_7$).
   3.2. Quelle hormone peptidique vitale est sécrétée par le syncytiotrophoblaste dès la nidation ?
   3.3. Expliquer le rôle biologique impératif de cette hormone (**HCG**) sur le maintien du corps jaune ovarien (corps jaune gravidique) et sur la prévention des règles.`,
    correction: `**1. Préparation et pénétration :**
1.1.
- **Capacitation :** Maturation physiologique obligatoire subie par les spermatozoïdes dans le tractus génital féminin, consistant en l'élimination du cholestérol membranaire et des glycoprotéines séminales, rendant la membrane plasmique instable et très perméable au $\\text{Ca}^{2+}$ (mouvements hyperactivés de la queue).
1.2.
- **Réaction acrosomique :** Liaison spécifique d'une protéine de la tête du spermatozoïde au récepteur glycoprotéique **ZP3** de la zone pellucide. Cela déclenche un influx massif de $\\text{Ca}^{2+}$ et l'exocytose de la vésicule acrosomique libérant des enzymes protéolytiques (**acrosine, hyaluronidase**), digérant localement la zone pellucide pour permettre le contact avec la membrane ovocytaire.

**2. Les verrous anti-polyspermie :**
- **Blocage rapide (électrique) :** La fusion des membranes gamétiques entraîne l'ouverture de canaux sodiques et une dépolarisation membranaire immédiate passant de $-70\\text{ mV}$ à $+20\\text{ mV}$ en quelques dixièmes de seconde, empêchant l'adhésion d'autres spermatozoïdes.
- **Blocage lent et définitif (Réaction corticale) :**
  - Une onde calcique intracellulaire balaie l'ovocyte à partir du point d'impact.
  - Cette élévation de calcium cytosolique provoque l'exocytose de milliers de **granules corticaux** sous-membranaires dans l'espace périvitellin.
  - Les enzymes libérées clivent chimiquement les récepteurs **ZP3** (rendant toute fixation ultérieure impossible) et réticulent les protéines pellucides : c'est le **durcissement irréversible de la zone pellucide**.

**3. De la migration à la nidation :**
3.1.
- **Chronologie :**
  - $J_1$ : Amphimixie (fusion des deux pronuclei) $\\to$ première division de mitose (stade 2 blastomères).
  - $J_3-J_4$ : Morula (amas sphérique de 16 à 32 cellules compactes) arrivant dans la cavité utérine.
  - $J_5-J_6$ : Cavitation et formation du **blastocyste** comprenant une masse cellulaire interne (embryoblaste) et une couronne périphérique (trophoblaste).
  - $J_6-J_7$ : Éclosion hors de la zone pellucide et **nidation (implantation)** dans l'endomètre utérin réceptif.
3.2. et 3.3.
- **L'hormone chorionique gonadotrope humaine (HCG) :** Sécrétée par le trophoblaste dès l'implantation.
- **Rôle physiologique vital :** L'HCG possède une action analogue à la LH hypophysaire : elle empêche la régression du corps jaune et le transforme en **corps jaune gravidique**.
- Ce corps jaune gravidique continue de sécréter de fortes doses de **progestérone** et d'œstrogènes pendant le premier trimestre, maintenant l'intégrité de la dentelle utérine et bloquant l'apparition des règles. C'est la molécule ciblée par les tests urinaires de grossesse.`
  },
  {
    id: 22,
    title: "Lycée d'Excellence Mariama Bâ (Gorée) — Épreuve de SVT",
    source: "Maison d'Éducation Mariama Bâ",
    sourceType: "lycee",
    theme: "Endocrinologie de la grossesse, déclenchement de l'accouchement et réflexe d'éjection du lait",
    category: "reproduction",
    enonce: `On étudie les interactions endocriniennes complexes qui régissent la fin de la grossesse, la parturition (accouchement) et la lactation chez la femme.

1. **Le relais placentaire de la synthèse hormonale :**
   - Durant les 8 premières semaines de gestation, l'ablation bilatérale des ovaires (ovariectomie) chez la femme entraîne un avortement spontané immédiat.
   - En revanche, la même ablation réalisée au 4ème mois de grossesse ne perturbe en rien la poursuite de la gestation.
   Expliquer ces données en précisant la transition corps jaune gravidique / placenta.

2. **Le mécanisme de l'accouchement (Parturition) :**
   2.1. Quel est le rôle inhibiteur joué par la **progestérone** ("silence utérin") sur le myomètre tout au long de la grossesse ?
   2.2. À l'approche du terme, le rapport œstrogènes/progestérone s'élève. Expliquer comment cela induit l'expression massive des récepteurs à l'**ocytocine** et des jonctions communicantes (gap-junctions) sur les cellules musculaires utérines.
   2.3. Décrire la boucle de rétroaction positive du **réflexe de Ferguson** (dilatation du col $\\to$ influx nerveux hypothalamique $\\to$ libération d'ocytocine post-hypophysaire $\\to$ contractions utérines accrues).

3. **Lactation :**
   Distinguer le rôle respectif de la **prolactine** (synthèse et sécrétion du lait) et de l'**ocytocine** (éjection du lait par contraction des cellules myoépithéliales des acini mammaires sous l'effet de la tétée).`,
    correction: `**1. Le relais endocrinien placentaire :**
- Durant le premier trimestre, la production de progestérone indispensable au maintien de l'utérus dépend entièrement du **corps jaune gravidique** sous contrôle de l'HCG : l'ablation des ovaires supprime la progestérone et provoque la fausse couche.
- À partir du 3ème-4ème mois, le **placenta mature** devient un organe endocrinien autonome capable d'assurer lui-même la synthèse et la sécrétion de la quasi-totalité de la progestérone et des œstrogènes nécessaires : le corps jaune involue, et l'ablation ovarienne est sans conséquence.

**2. Déclenchement de la parturition :**
2.1.
- **Le bloc progestéronique :** La progestérone hyperpolarise les cellules musculaires lisses du myomètre, inhibe la synthèse des canaux calciques et réprime les récepteurs à l'ocytocine, maintenant l'utérus dans un état d'immobilité contractile ("silence utérin").
2.2.
- En fin de grossesse, la balance hormonale s'inverse au profit des **œstrogènes** qui stimulent la synthèse de protéines contractiles, de récepteurs à l'ocytocine et de jonctions gap permettant la synchronisation électrique du myomètre.
2.3.
- **Réflexe neuroendocrinien de Ferguson :**
  1. La tête fœtale appuie sur le col de l'utérus et l'étire.
  2. Les mécanorécepteurs cervicaux envoient des potentiels d'action le long de la moelle vers les noyaux paraventriculaires et supra-optiques de l'hypothalamus.
  3. La neurohypophyse décharge des bolus d'**ocytocine** dans la circulation.
  4. L'ocytocine stimule de puissantes contractions myométriales rythmées qui poussent davantage le fœtus contre le col.
  5. Ce cercle vicieux vertueux (rétroaction positive) s'amplifie jusqu'à l'expulsion finale du nouveau-né.

**3. Physiologie de la lactation :**
- **Prolactine (Antéhypophyse) :** Hormone galactopoïétique stimulant la synthèse transcriptionnelle des protéines du lait (caséine, lactalbumine) et des lipides par les cellules glandulaires alvéolaires. Pendant la grossesse, son action est inhibée par les taux élevés de progestérone ; la chute hormonale à la délivrance lève cette inhibition et amorce la montée laiteuse.
- **Ocytocine (Post-hypophyse) :** Hormone de l'éjection du lait. La succion du mamelon par le nourrisson stimule des mécanorécepteurs cutanés qui déclenchent un réflexe neuroendocrinien aboutissant à la libération d'ocytocine. L'ocytocine contracte les cellules myoépithéliales entourant les acini mammaires, éjectant le lait vers les canaux galactophores.`
  },
  {
    id: 23,
    title: "Lycée Lamine Guèye (Dakar) — Épreuve de Contrôle Continu",
    source: "Lycée Lamine Guèye",
    sourceType: "lycee",
    theme: "Maîtrise médicale de la reproduction : contraception hormonale combinée, pilule du lendemain vs RU-486",
    category: "reproduction",
    enonce: `On étudie les mécanismes pharmacologiques d'action des différents moyens de contrôle des naissances féminins.

1. **La pilule combinée œstroprogestative classique :**
   Prise quotidiennement pendant 21 jours consécutifs suivie d'un arrêt de 7 jours.
   Elle contient un œstrogène de synthèse (éthinylestradiol) et un progestatif.
   Détailler son **triple mécanisme d'action contraceptif** :
   - Au niveau de l'axe hypothalamo-hypophysaire.
   - Au niveau de la glaire cervicale.
   - Au niveau de l'endomètre utérin.

2. **Contraception d'urgence vs Contragestion :**
   Une distinction rigoureuse sanctionnée au Baccalauréat sénégalais oppose la contraception d'urgence à la contragestion.
   - **Cas A :** Une jeune femme prend le **Lévonorgestrel** (NorLévo / pilule du lendemain) 24 heures après un rapport non protégé.
   - **Cas B :** Une femme présentant un retard de règles de 2 semaines avec test de grossesse positif prend du **RU-486 (Mifépristone)** suivi de prostaglandines.

2.1. Expliquer le mode d'action du lévonorgestrel. Pourquoi est-il strictement qualifié de **contraceptif** (et non abortif) ?
2.2. Expliquer le mode d'action moléculaire du RU-486 (antagoniste compétitif des récepteurs de la progestérone). Pourquoi est-il qualifié de méthode **contragestive** (IVG médicamenteuse) ?`,
    correction: `**1. Triple mécanisme d'action de la pilule combinée :**
1. **Blocage de l'ovulation (Axe hypothalamo-hypophysaire) :** Le maintien constant d'œstrogène et de progestatif synthétiques dans le sang exerce un **rétrocontrôle négatif permanent (RC-)** sur l'hypothalamus et l'hypophyse. Les taux de FSH et de LH restent effondrés : pas de développement folliculaire et suppression totale du pic ovulatoire de LH $\\implies$ anovulation complète.
2. **Effet cervical :** La composante progestative épaissit la glaire cervicale, la rendant dense, compacte et imperméable à la progression des spermatozoïdes.
3. **Effet endométrial :** Atrophie de la muqueuse utérine qui devient impropre à toute nidation.

**2. Distinction Contraception d'urgence vs Contragestion :**
2.1.
- **Lévonorgestrel (Pilule du lendemain / Contraception d'urgence) :**
  - Progestatif à forte dose qui agit **AVANT** la fécondation.
  - S'il est pris avant le pic de LH, il bloque ou retarde l'ovulation de quelques jours, empêchant la rencontre des gamètes.
  - S'il y a déjà eu fécondation ou nidation, il est **totalement inefficace** et n'interrompt pas la grossesse en cours.
  - C'est donc un **procédé purement contraceptif**.
2.2.
- **RU-486 / Mifépristone (Contragestion / Interruption Volontaire de Grossesse) :**
  - Stéroïde de synthèse présentant une structure spatiale analogue à celle de la progestérone naturelle.
  - **Mécanisme :** Antagoniste compétitif qui se fixe avec une très haute affinité sur les récepteurs nucléaires de la progestérone sans les activer, bloquant l'action de la progestérone naturelle.
  - Privé de signal progestatif, l'endomètre se nécrose, la dentelle utérine se détache et l'embryon implanté est expulsé avec l'avortement. Les prostaglandines associées stimulent les contractions myométriales pour parachever l'expulsion.
  - Puisqu'il agit **APRÈS la fécondation et l'implantation** de l'embryon, c'est une méthode **contragestive** (contre la gestation).`
  },
  {
    id: 24,
    title: "Prytanée Militaire de Saint-Louis — Composition Trimestrielle",
    source: "Prytanée Militaire Charles Ntchoréré (Saint-Louis)",
    sourceType: "lycee",
    theme: "Procréation Médicalement Assistée (PMA) : insémination artificielle, FIVETE et micro-injection ICSI",
    category: "reproduction",
    enonce: `Deux couples consultants pour infertilité sont pris en charge dans un centre de Procréation Médicalement Assistée (PMA).

- **Couple 1 :** L'homme présente un spermogramme normal. La femme présente une obstruction bilatérale complète des trompes de Fallope (salpingite cicatricielle séquellaire) rendant la rencontre gamétique impossible.
- **Couple 2 :** La femme présente des cycles ovulatoires et des voies génitales parfaitement normaux. L'homme présente une oligo-asthéno-tératospermie sévère : concentration de spermatozoïdes très basse ($< 1\\text{ million/mL}$), mobilité quasi nulle et $95\\%$ de formes anormales incapables de traverser la zone pellucide.

1. **Protocole de la Fécondation In Vitro et Transfert d'Embryon (FIVETE) :**
   1.1. Pourquoi la FIVETE est-elle la technique de choix indiquée pour le Couple 1 ?
   1.2. Décrire les 4 étapes cliniques successives de la FIVETE :
        - Stimulation ovarienne polyfolliculaire et blocage hypophysaire.
        - Déclenchement de l'ovulation et ponction folliculaire écho-guidée.
        - Fécondation in vitro en boîte de culture.
        - Transfert embryonnaire intra-utérin.

2. **La micro-injection intracytoplasmique de spermatozoïde (ICSI) :**
   2.1. Pourquoi la FIVETE classique échouerait-elle chez le Couple 2 ?
   2.2. Expliquer en quoi consiste la technique d'**ICSI** (Intra-Cytoplasmic Sperm Injection).
   2.3. Quelles barrières cellulaires et membranaires naturelles de l'ovocyte sont artificiellement franchies par la micropipette lors de cette micro-injection ?`,
    correction: `**1. La Fécondation In Vitro Et Transfert d'Embryon (FIVETE) :**
1.1.
- Chez la femme du Couple 1, les ovaires et l'utérus sont sains, mais l'obstruction tubaire bilatérale empêche mécaniquement la rencontre des spermatozoïdes et de l'ovocyte dans l'ampoule tubaire. La FIVETE permet de contourner cet obstacle mécanique en réalisant la fécondation à l'extérieur du corps in vitro.
1.2.
- **Étapes de la FIVETE :**
  1. *Stimulation ovarienne :* Injections quotidiennes de FSH recombinante après blocage de l'hypophyse par un agoniste/antagoniste de la GnRH, permettant le développement synchrone de 10 à 15 follicules mûrs.
  2. *Déclenchement et ponction :* Injection d'hCG (mime le pic de LH) déclenchant la maturation finale ; 36h plus tard, ponction des follicules par voie vaginale sous contrôle échographique et récupération des ovocytes II.
  3. *Mise en présence in vitro :* Dépôt d'environ $50\\,000$ spermatozoïdes mobiles capacitées autour de chaque ovocyte dans une boîte de culture thermostatée à $37^\\circ\\text{C}$.
  4. *Transfert d'embryons :* 2 à 5 jours plus tard, sélection de 1 ou 2 embryons de morphologie optimale (stade 4-8 cellules ou blastocyste) et dépôt indolore dans la cavité utérine à l'aide d'un fin cathéter.

**2. La micro-injection intracytoplasmique (ICSI) :**
2.1.
- Chez le Couple 2, les spermatozoïdes sont trop rares, peu mobiles et morphologiquement anormaux. En boîte de culture classique (FIVETE), ils sont incapables de nager jusqu'à l'ovocyte et de perforer sa zone pellucide.
2.2.
- **Principe de l'ICSI :** Sous microscope muni de micromanipulateurs, le biologiste immobilise un unique spermatozoïde sélectionné dans une micropipette de verre, puis l'injecte directement et mécaniquement à l'intérieur du cytoplasme de l'ovocyte II mature (stabilisé par une pipette de contention).
2.3.
- **Barrières naturelles franchies :**
  1. Le cumulus oophorus (corona radiata).
  2. La zone pellucide extracellulaire (protéines ZP).
  3. La membrane plasmique de l'ovocyte II.`
  }
];
