import { SVTEpreuveItem } from './svt-part1';

export const SVT_EPREUVES_PART3: SVTEpreuveItem[] = [
  // AXE 3 : IMMUNOLOGIE & DÉFENSES DE L'ORGANISME (B3)
  {
    id: 13,
    title: "Baccalauréat Sénégal — Session Normale (Série S2)",
    source: "Baccalauréat Sénégal",
    sourceType: "bac",
    theme: "Complexe Majeur d'Histocompatibilité (CMH / HLA) et greffes de peau chez la souris",
    category: "immunologie",
    enonce: `On étudie les bases génétiques et immunologiques du rejet de greffe chez différentes lignées pures de souris consanguines ($A$, $B$ et leurs hybrides).

1. **Protocole de greffe de peau :**
   - **Expérience 1 :** Greffe de peau d'une souris $A$ sur une autre souris de même lignée $A$ (autogreffe / isogreffe).
     *Résultat :* Tolérance parfaite et vascularisation durable du greffon.
   - **Expérience 2 :** Greffe de peau d'une souris $B$ sur une souris receveuse $A$ (allogreffe).
     *Résultat :* Rejet du greffon en 10 à 12 jours (rejet de première intention).
   - **Expérience 3 :** Deux semaines après le rejet de l'expérience 2, on réalise une seconde greffe de peau de souris $B$ sur la même souris receveuse $A$.
     *Résultat :* Rejet fulgurant et nécrose du greffon en seulement 3 à 5 jours (rejet de deuxième intention).
   - **Expérience 4 :** On greffe de la peau de souris $C$ (lignée inconnue) sur la souris $A$ immunisée contre $B$.
     *Résultat :* Le greffon est rejeté en 10 à 12 jours.

1.1. Expliquer la différence de cinétique entre le rejet de première intention (12 jours) et de deuxième intention (3 jours).
1.2. Que montre l'expérience 4 concernant la spécificité de la réponse immunitaire ?
1.3. Quel type de médiation immunitaire est responsable du rejet de greffe (humorale ou cellulaire) ? Citer une expérience de transfert adoptif (sérum vs lymphocytes T) démontrant cette médiation.

2. **Génétique du CMH :**
   - Les souris hybrides $F_1$ issues du croisement $(A \\times B)$ reçoivent de la peau de souris $A$ : la greffe prend.
   - Elles reçoivent de la peau de souris $B$ : la greffe prend également.
   - En revanche, une greffe de peau de souris hybride $F_1$ sur une souris parentale $A$ est systématiquement rejetée.
   Expliquer ces observations en rappelant la nature génétique (polygénique et codominante) des molécules du CMH (ou HLA chez l'homme).`,
    correction: `**1. Mécanismes du rejet de greffe :**
1.1.
- **Rejet de première intention (10-12 jours) :** Réponse immunitaire adaptative primaire. Elle nécessite le temps de reconnaissance des antigènes étrangers du CMH du donneur, l'activation, la sélection clonale, la prolifération et la différenciation des lymphocytes T spécifiques.
- **Rejet de deuxième intention (3-5 jours) :** Réponse immunitaire secondaire accélérée et amplifiée, due à la présence de **lymphocytes T mémoires** spécifiques créés lors du premier contact.
1.2.
- L'expérience 4 montre que le rejet accéléré est **strictement spécifique de l'antigène** : la souris $A$ est sensibilisée contre les allèles du donneur $B$, mais réagit de façon primaire face aux antigènes du donneur $C$.
1.3.
- Le rejet de greffe est à **médiation cellulaire**.
- *Preuve expérimentale de transfert :*
  - L'injection de **sérum** d'un animal ayant rejeté la greffe à un receveur naïf ne transmet pas le rejet accéléré.
  - L'injection de **lymphocytes T vivants** confère immédiatement au receveur naïf la capacité d'effectuer un rejet accéléré en 3 jours.

**2. Génétique et codominance du CMH :**
- Les gènes du CMH sont portés par le chromosome 6 chez l'homme (17 chez la souris). Ils sont **polygéniques** (plusieurs loci : A, B, C pour la classe I) et hautement **polymorphiques** (centaines d'allèles dans l'espèce).
- **Codominance :** Chaque allèle hérité du père et de la mère s'exprime simultanément à la surface cellulaire.
- **Interprétation des greffes parentales et hybrides :**
  - L'hybride $F_1(A/B)$ exprime à la fois les molécules du CMH de $A$ et de $B$. Son système immunitaire reconnaît les cellules de $A$ et de $B$ comme étant du soi $\\implies$ la greffe est acceptée.
  - La souris parentale $A$ ne possède que les molécules $A$. Les cellules du greffon $F_1$ portent les molécules $B$, reconnues comme étrangères (non-soi) par le système immunitaire de $A$ $\\implies$ déclenchement du rejet allogénique.`
  },
  {
    id: 14,
    title: "Lycée Seydina Limamou Laye — Épreuve d'Immunologie Bac S2",
    source: "Lycée Seydina Limamou Laye",
    sourceType: "lycee",
    theme: "Immunité adaptative humorale : sélection clonale des LB, anticorps et complexe immun",
    category: "immunologie",
    enonce: `On injecte de l'anatoxine tétanique (antigène non virulent mais immunogène) à un cobaye à $J_0$.
À $J_{15}$, on prélève le sérum du cobaye et on réalise le test de précipitation d'Ouchterlony sur gel de gélose.

1. **Observations expérimentales :**
   - Un arc de précipitation opaque blanc se forme entre le puits central contenant le sérum et le puits contenant la toxine tétanique.
   - Aucun arc n'apparaît avec la toxine diphtérique.
   1.1. Expliquer la formation de l'arc de précipitation (notion de complexe immun).
   1.2. Quelle propriété fondamentale des anticorps est démontrée par ce test ?

2. **Structure et fonction d'un anticorps (IgG) :**
   2.1. Faire un schéma légendé complet d'une molécule d'immunoglobuline G (2 chaînes lourdes $H$, 2 chaînes légères $L$, ponts disulfures, région constante $Fc$, régions variables $Fab$, sites anticorps paratopes).
   2.2. Préciser le rôle respectif des fragments $Fab$ et du fragment $Fc$ (fixation du complément, opsonisation pour les macrophages).

3. **Cinétique cellulaire :**
   Découper chronologiquement la réponse humorale :
   - Sélection clonale du lymphocyte B par l'antigène natif.
   - Coopération avec les lymphocytes T4 auxiliaires (rôle des interleukines).
   - Prolifération clonale et différenciation en plasmocytes sécréteurs et lymphocytes B mémoires.`,
    correction: `**1. Test d'Ouchterlony et complexe immun :**
1.1.
- Les anticorps solubles présents dans le sérum et les molécules d'antigène diffusent de manière concentrique dans le gel d'agarose. À la zone d'équivalence stœchiométrique, la formation d'un réseau tridimensionnel insoluble d'anticorps liés aux antigènes (**complexe immun**) précipite sous forme d'une ligne blanche visible.
1.2.
- **Spécificité antigénique absolue :** Les anticorps anti-tétaniques ne précipitent pas avec la toxine diphtérique, prouvant que la reconnaissance épitope-paratope repose sur une stricte complémentarité stérique et électrostatique.

**2. Structure d'une immunoglobuline G :**
2.1.
- Molécule en forme de $Y$, constituée de 4 chaînes polypeptidiques :
  - Deux chaînes lourdes identiques $H$ (Heavy).
  - Deux chaînes légères identiques $L$ (Light).
  - Reliées entre elles par des **ponts disulfures** interchaînes ($-S-S-$).
  - Chaque chaîne possède une **partie constante** ($C$) et une **partie variable** ($V$).
  - À l'extrémité des deux bras se trouvent les deux **paratopes** (sites de fixation spécifiques de l'antigène bivalent).
2.2.
- **Fragments Fab (Fragment antigen-binding) :** Reconnus pour la liaison spécifique avec les déterminants antigéniques (épitopes) sans provoquer d'effet effecteur direct.
- **Fragment Fc (Fragment cristallisable) :** Région constante qui détermine la classe de l'anticorps (IgG, IgM, IgA...) et assure les fonctions effectrices :
  1. Fixation sur les récepteurs membranaires des phagocytes (macrophages/polynucléaires) favorisant la phagocytose (**opsonisation**).
  2. Activation de la cascade enzymatique du complément menant à la lyse membranaire.

**3. Étapes de la réponse humorale :**
1. **Sélection clonale :** Seuls les rares lymphocytes B portant un anticorps membranaire (BCR) stériquement complémentaire d'un épitope de l'antigène sont activés.
2. **Coopération cellulaire :** Le LB internalise l'antigène et le présente sur son CMH-II au LT4 pré-activé. Le LT4 libère des cytokines (**interleukines IL-4, IL-5**) qui stimulent le LB.
3. **Prolifération clonale :** Mitoses successives intenses dans les centres germinatifs ganglionnaires.
4. **Différenciation :** Une fraction devient des **plasmocytes** (cellules volumineuses, richement dotées en réticulum endoplasmique granuleux, sécrétant jusqu'à 2000 anticorps/seconde), et une autre devient des **lymphocytes B mémoires** à longue durée de vie.`
  },
  {
    id: 15,
    title: "Concours Général Sénégalais — SVT Terminale S2",
    source: "Concours Général Sénégalais",
    sourceType: "concours",
    theme: "Immunité adaptative cellulaire : cytotoxicité des LT8, restriction par le CMH-I et expérience de Zinkernagel",
    category: "immunologie",
    enonce: `On étudie la destruction des cellules infectées par un virus par les lymphocytes T cytotoxiques (LTC).
Rolf Zinkernagel et Peter Doherty ont réalisé des expériences chez des souris de souches pures $H-2^k$ et $H-2^d$ infectées par le virus de la chorioméningite lymphocytaire (LCM).

On prélève les lymphocytes $T$ spléniques d'une souris $H-2^k$ infectée 7 jours plus tôt par le virus LCM.
On les met en culture in vitro en présence de différentes cellules cibles marquées au chrome radioactif ($^{51}\\text{Cr}$) qui est libéré dans le surnageant en cas de lyse cellulaire :

| Tube | Cellules cibles incubées | Libération de $^{51}\\text{Cr}$ (Lyse cellulaire) |
| :--- | :--- | :--- |
| **1** | Fibroblastes de souris $H-2^k$ infectés par le virus LCM | **Très forte ($95\\%$)** |
| **2** | Fibroblastes de souris $H-2^k$ non infectés (cellules saines) | **Nulle ($2\\%$)** |
| **3** | Fibroblastes de souris $H-2^k$ infectés par un autre virus (virus de la grippe) | **Nulle ($3\\%$)** |
| **4** | Fibroblastes de souris $H-2^d$ infectés par le virus LCM | **Nulle ($2\\%$)** |

1. Analyser et interpréter rigoureusement les résultats des tubes 1, 2 et 3.
2. Que démontre l'absence de lyse dans le tube 4 ? Énoncer le principe fondamental de la **double reconnaissance (restriction par le CMH-I)** récompensé par le Prix Nobel.
3. Décrire le mécanisme biochimique précis par lequel un lymphocyte T cytotoxique détruit sa cellule cible (rôle du baiser de la mort, de la perforine et des granzymes / apoptose).`,
    correction: `**1. Analyse des conditions d'activation cytotoxique :**
- **Tube 1 :** Les lymphocytes T lysent massivement ($95\\%$) les cellules cibles issues de la même souche ($H-2^k$) et infectées par le même virus (LCM).
- **Tube 2 :** L'absence de lyse des cellules saines montre que les LTC épargnent les cellules normales de l'organisme (tolérance du soi).
- **Tube 3 :** L'absence de lyse des cellules infectées par un virus différent démontre la **spécificité absolue vis-à-vis du peptide viral**.

**2. Le principe de restriction par le CMH (Expérience de Zinkernagel) :**
- **Tube 4 :** Bien que les cellules cibles soient infectées par le bon virus LCM, elles portent les molécules du CMH d'une autre souche ($H-2^d$). Les LTC ne les détruisent pas.
- **Principe de la restriction allotypique par le CMH-I (Double reconnaissance) :**
  Le récepteur T (TCR) d'un lymphocyte T cytotoxique (CD8+) ne reconnaît pas l'antigène viral libre ou seul. Il reconnaît obligatoirement une combinaison binaire indissociable formée par :
  1. Le **peptide antigénique viral étranger** (présenté dans la corbeille).
  2. La **molécule du CMH de classe I du soi** de l'individu ($H-2^k$).
  C'est le mécanisme garantissant que l'action cytotoxique s'exerce uniquement au contact direct d'une cellule anormale de l'organisme.

**3. Mécanisme moléculaire de la cytotoxicité ("Le Baiser de la Mort") :**
1. **Reconnaissance et adhérence étroite :** Liaison du TCR au complexe CMH-I/peptide viral et stabilisation par le corécepteur CD8.
2. **Polarisation du cytosquelette :** Réorientation de l'appareil de Golgi et des granules lytiques du LTC vers la zone de contact synaptique immunologique.
3. **Exocytose polarisée des granules :**
   - **Perforine :** Se polymérise en présence d'ions $\\text{Ca}^{2+}$ dans la membrane plasmique de la cellule cible pour former des pores transmembranaires circulaires.
   - **Granzymes :** Protéases à sérine qui pénètrent par ces pores dans la cellule cible et activent la cascade des caspases.
4. **Mort cellulaire :** Fragmentation de l'ADN génomique, condensation chromatinienne et mort cellulaire programmée par **apoptose**, sans dissémination des particules virales intracellulaires (qui sont ensuite éliminées par les macrophages).`
  },
  {
    id: 16,
    title: "Lycée Maurice Delafosse — Composition du 2ème Semestre",
    source: "Lycée Maurice Delafosse (Dakar)",
    sourceType: "lycee",
    theme: "Le lymphocyte T4, plaque tournante du système immunitaire et interleukines",
    category: "immunologie",
    enonce: `On cherche à démontrer le rôle central pivot joué par les lymphocytes T auxiliaires (LT4 / CD4+) dans le déclenchement des réponses immunitaires spécifiques.
Des souris irradiées (système immunitaire détruit par les rayons X) sont réparties en quatre lots recevant différentes injections de cellules immunitaires avant d'être mises en contact avec des globules rouges de mouton (GRM, antigène particulaire) :

| Lot de souris irradiées | Cellules injectées | Taux d'anticorps anti-GRM plasmatiques | Nombre de plasmocytes spléniques |
| :--- | :--- | :--- | :--- |
| **Lot 1** | Aucune cellule (témoin négatif) | Nul | $0$ |
| **Lot 2** | Lymphocytes B seuls | Très faible | $15$ |
| **Lot 3** | Lymphocytes T seuls | Nul | $0$ |
| **Lot 4** | Lymphocytes B + Lymphocytes T | **Très élevé ($++++$)** | **$12\\,500$** |
| **Lot 5** | Lymphocytes B + Surnageant de culture de LT stimulés | **Élevé ($+++$)** | **$9\\,800$** |

1. Analyser comparativement les résultats des lots 1, 2, 3 et 4. En déduire la nécessité d'une **coopération cellulaire**.
2. Que démontre le résultat du lot 5 quant à la nature de la médiation entre les lymphocytes T et les lymphocytes B ?
3. Expliquer pourquoi le lymphocyte T4 est qualifié de "chef d'orchestre" ou "plaque tournante" de l'immunité spécifique (rôle de l'interleukine-2 sur les LT8 et les LB).`,
    correction: `**1. Nécessité de la coopération cellulaire :**
- **Lot 1 :** L'irradiation détruit le système immunitaire ; aucune réponse n'est possible.
- **Lots 2 et 3 :** Les lymphocytes B seuls ne produisent qu'une réponse résiduelle négligeable (15 plasmocytes). Les lymphocytes T seuls ne produisent aucun anticorps (ce ne sont pas des cellules effectrices sécrétrices d'immunoglobulines).
- **Lot 4 :** L'association conjointe des LB et des LT induit une réponse humorale explosive ($12\\,500$ plasmocytes, production massive d'anticorps).
- *Conclusion :* La différenciation efficace des lymphocytes B en plasmocytes nécessite une **coopération cellulaire indispensable** entre lymphocytes T et lymphocytes B.

**2. Nature chimique de la communication intercellulaire :**
- **Lot 5 :** Le surnageant acellulaire issu de la culture de lymphocytes T activés suffit à stimuler la prolifération et la différenciation des LB en $9\\,800$ plasmocytes.
- *Déduction :* La coopération entre lymphocytes T et B ne requiert pas exclusivement un contact membranaire permanent : elle s'effectue par l'intermédiaire de **substances solubles diffusibles**, les cytokines (notamment les **interleukines IL-2, IL-4, IL-6**).

**3. Le LT4, chef d'orchestre du système immunitaire :**
- Le lymphocyte T4 activé par une cellule présentatrice d'antigène (CPAg via son CMH-II) sécrète de l'**interleukine-2 (IL-2)** :
  1. **Action autocrine :** Stimule sa propre prolifération et différenciation en lymphocytes T helpers (auxiliaires Th1 et Th2).
  2. **Action paracrine sur l'immunité humorale :** Stimule la multiplication et la différenciation des lymphocytes B en plasmocytes producteurs d'anticorps.
  3. **Action paracrine sur l'immunité cellulaire :** Fournit le signal prolifératif obligatoire aux lymphocytes T8 activés, leur permettant de se multiplier et de se différencier en lymphocytes T cytotoxiques (LTC).
- *Conclusion :* Sans LT4 fonctionnel, les deux branches de l'immunité adaptative (humorale et cellulaire) sont paralysées.`
  },
  {
    id: 17,
    title: "Baccalauréat Sénégal — Session de Remplacement (Série S2)",
    source: "Baccalauréat Sénégal",
    sourceType: "bac",
    theme: "Physiopathologie de l'infection par le VIH, charge virale, déplétion des LT4 et phases du SIDA",
    category: "immunologie",
    enonce: `On étudie l'évolution temporelle des paramètres biologiques chez un patient infecté par le Virus de l'Immunodéficience Humaine (VIH) sans traitement antirétroviral au cours des 10 années suivant la contamination.

On mesure régulièrement :
- Le taux sanguin de lymphocytes T4 (valeur physiologique normale : $800 - 1200\\text{ cellules/}\\mu\\text{L}$).
- La charge virale plasmatique (nombre de copies d'ARN du VIH par mL de plasma).
- Le taux d'anticorps anti-VIH circulants (séropositivité).

1. **Les trois phases cliniques de l'infection :**
   - **Phase 1 (Primo-infection, 0 à 8 semaines) :** Pic précoce de la charge virale avec chute transitoire des LT4, suivie d'une remontée partielle des LT4 et de l'apparition des premiers anticorps anti-VIH vers la 6ème semaine.
   - **Phase 2 (Phase asymptomatique ou de latence clinique, 1 à 8 ans) :** Charge virale stabilisée à un niveau bas, taux d'anticorps anti-VIH élevé et constant, mais baisse lente et continue du taux de LT4 d'environ $50\\text{ à }100\\text{ cellules/}\\mu\\text{L}$ par an.
   - **Phase 3 (Phase de SIDA déclaré, au-delà de 8 ans) :** Effondrement des LT4 sous le seuil critique de $200\\text{ cellules/}\\mu\\text{L}$, chute du taux d'anticorps, remontée vertigineuse de la charge virale et apparition de maladies opportunistes (candidose, pneumocystose, sarcome de Kaposi, tuberculose).

1.1. Définir la séropositivité pour le VIH et expliquer le mécanisme du "délai de séroconversion".
1.2. Expliquer comment le système immunitaire parvient à contrôler temporairement le virus lors de la phase 1.
1.3. Pourquoi la baisse des LT4 finit-elle par entraîner l'effondrement simultané des anticorps anti-VIH et l'explosion de la charge virale en phase 3 ?
1.4. Donner le principe du cycle réplicatif du rétrovirus VIH au sein du LT4 (reconnaissance récepteur CD4 / corécepteur CCR5, rétrotranscription par la transcriptase inverse, intégration par l'intégrase, bourgeonnement).`,
    correction: `**1. Séropositivité et séroconversion :**
1.1.
- **Séropositivité :** Présence détectable dans le sérum d'anticorps spécifiques dirigés contre les protéines virales du VIH (gp120, gp41, p24) détectés par test ELISA et confirmés par Western Blot.
- **Fenêtre sérologique (délai de séroconversion) :** Période initiale de 2 à 6 semaines après la contamination durant laquelle la personne est infectée et contagieuse, mais où le taux d'anticorps est encore trop faible pour être détecté par les tests de dépistage standard.

**2. Contrôle initial de la primo-infection (Phase 1) :**
- Le système immunitaire réagit vigoureusement :
  - Les **lymphocytes T cytotoxiques (LTC)** détruisent les LT4 infectés.
  - Les **lymphocytes B** produisent des anticorps neutralisants anti-VIH.
  Cette réponse immunitaire vigoureuse permet d'endiguer la multiplication virale et d'abaisser fortement la charge virale plasmatique.

**3. Évolution vers le SIDA déclaré (Phase 3) :**
- Le VIH détruit progressivement les LT4 qui l'hébergent (effet cytopathogène direct, formation de syncytia, et destruction des LT4 infectés par nos propres LTC).
- Dès que le taux de LT4 chute sous le seuil critique de **$200\\text{ LT4/}\\mu\\text{L}$**, la sécrétion d'interleukines s'effondre :
  - Les lymphocytes B ne reçoivent plus le stimulus nécessaire à la production d'anticorps $\\implies$ baisse des anticorps sériques.
  - Les lymphocytes T8 ne peuvent plus se différencier en LTC efficaces.
- Le virus échappe totalement au contrôle immunitaire (explosion de la virémie) et les agents pathogènes banals provoquent des **infections opportunistes létales**.

**4. Cycle réplicatif du VIH dans le LT4 :**
1. **Fixation (Attachement) :** Reconnaissance stérique entre la glycoprotéine de surface virale **gp120** et le récepteur membranaire **CD4** du LT4, avec liaison au corécepteur (CCR5 ou CXCR4).
2. **Fusion et décapsidation :** Fusion de l'enveloppe virale avec la membrane du LT4 et libération de la capside et des brins d'ARN viral dans le cytoplasme.
3. **Rétrotranscription :** L'enzyme virale **transcriptase inverse (RT)** convertit l'ARN simple brin viral en un ADN double brin proviral.
4. **Intégration nucléaire :** L'**intégrase** insère l'ADN proviral dans le génome chromosomique de la cellule hôte.
5. **Transcription et traduction :** La machinerie cellulaire fabrique les ARN messagers et les polyprotéines virales clivées par la **protéase**.
6. **Assemblage et bourgeonnement :** Formation de nouveaux virions infectieux qui bourgeonnent en emportant un fragment de la membrane de la cellule hôte, conduisant à terme à la mort du lymphocyte T4.`
  },
  {
    id: 18,
    title: "Lycée Thierno Seydou Nourou Tall — Épreuve de Contrôle SVT",
    source: "Lycée Thierno Seydou Nourou Tall",
    sourceType: "lycee",
    theme: "Hypersensibilité immédiate : mécanismes cellulaires de l'allergie de type I et choc anaphylactique",
    category: "immunologie",
    enonce: `On étudie la réaction allergique de type I (hypersensibilité immédiate) chez un adolescent allergique aux déjections d'acariens de poussière ou aux piqûres de guêpe.

1. **Chronologie en deux phases de l'allergie :**
   - **Phase 1 : Phase de sensibilisation (premier contact silencieux avec l'allergène)**. Aucun symptôme clinique n'est ressenti.
   - **Phase 2 : Phase de déclenchement (contacts ultérieurs avec le même allergène)**. Apparition fulgurante en quelques minutes de symptômes locaux (rhinite, eczéma, crise d'asthme) ou généraux (choc anaphylactique).

1.1. Préciser la classe particulière d'anticorps produite en quantité anormale chez les sujets atopiques lors de la phase de sensibilisation.
1.2. Sur quelles cellules immunitaires résidentes des tissus conjonctifs et muqueux ces anticorps viennent-ils se fixer par leur fragment $Fc$ ?
1.3. Décrire les événements membranaires qui déclenchent la dégranulation massive lors de la phase de déclenchement (pontage des IgE par l'allergène).
1.4. Nommer le principal médiateur chimique préformé libéré par ces granules et expliquer ses effets physiologiques :
     - Sur les fibres musculaires lisses des bronchioles (bronchospasme).
     - Sur les capillaires sanguins (vasodilatation et perméabilité accrue).
1.5. Quel traitement d'urgence salvateur doit être injecté immédiatement en intramusculaire lors d'un choc anaphylactique ?`,
    correction: `**1. La phase de sensibilisation (premier contact) :**
1.1.
- Les personnes atopiques synthétisent en excès des **Immunoglobulines de type E (IgE)** au lieu d'IgG sous l'influence de cytokines sécrétées par les lymphocytes Th2 (notamment l'IL-4).
1.2.
- Les IgE libres se fixent par leur fragment constant $Fc$ sur des récepteurs membranaires à très haute affinité ($Fc\\varepsilon RI$) portés par les **mastocytes** tissulaires et les **polynucléaires basophiles** circulants. Le sujet est désormais sensibilisé (mastocytes armés d'IgE).

**2. La phase de déclenchement (second contact) :**
1.3.
- Lors d'une nouvelle pénétration de l'allergène, celui-ci se lie directement à deux molécules d'IgE adjacentes portées par le même mastocyte : c'est le **pontage des IgE membranaires**.
- Ce pontage déclenche un signal intracellulaire d'entrée d'ions $\\text{Ca}^{2+}$ entraînant l'exocytose explosive des granules cytoplasmiques (**dégranulation mastocytaire**).
1.4.
- Le principal médiateur chimique libéré est l'**histamine** (associée aux leucotriènes et prostaglandines) :
  - **Sur l'arbre respiratoire :** Contraction spastique puissante des muscles lisses bronchiques (**bronchoconstriction / bronchospasme**) provoquant la crise d'asthme et la détresse respiratoire aiguë.
  - **Sur le système cardiovasculaire :** Vasodilatation artériolaire intense et augmentation de la perméabilité capillaire entraînant une fuite massive de plasma vers les tissus (œdème de Quincke, urticaire, et effondrement critique de la pression artérielle menant au choc anaphylactique).
1.5.
- Le traitement d'urgence absolu est l'injection immédiate d'**adrénaline (épinéphrine)** par voie intramusculaire (auto-injecteur), qui agit comme un puissant agoniste physiologique inverse (bronchodilatateur $\\beta_2$ et vasoconstricteur $\\alpha_1$).`
  }
];
