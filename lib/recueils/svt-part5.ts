import { SVTEpreuveItem } from './svt-part1';

export const SVT_EPREUVES_PART5: SVTEpreuveItem[] = [
  // AXE 5 : GÉNÉTIQUE & BIOTECHNOLOGIES (B5)
  {
    id: 25,
    title: "Baccalauréat Sénégal — Session Normale (Série S2)",
    source: "Baccalauréat Sénégal",
    sourceType: "bac",
    theme: "Dihybridisme chez la Drosophile : gènes liés, crossing-over, test-cross et carte factorielle",
    category: "genetique",
    enonce: `On réalise des croisements génétiques chez la drosophile (*Drosophila melanogaster*) portant sur deux couples d'allèles autosomaux :
- Couleur du corps : corps gris $[G]$ ou corps noir $[n]$.
- Longueur des ailes : ailes longues $[L]$ ou ailes vestigiales $[vg]$.

1. **Croisement 1 :**
   On croise une femelle de lignée pure à corps gris et ailes longues avec un mâle de lignée pure à corps noir et ailes vestigiales.
   La génération $F_1$ obtenue est composée à $100\\%$ d'individus à corps gris et ailes longues.
   1.1. Que peut-on déduire de ce résultat concernant la dominance des allèles et la pureté des parents ?

2. **Croisement 2 (Test-Cross 1) :**
   On croise un mâle $F_1$ (hétérozygote) avec une femelle double récessive à corps noir et ailes vestigiales.
   On obtient :
   - $50\\%$ de drosophiles à corps gris et ailes longues.
   - $50\\%$ de drosophiles à corps noir et ailes vestigiales.
   Pourquoi n'obtient-on que 2 phénotypes parentaux (rappel : absence de crossing-over chez le mâle de drosophile) ? Les gènes sont-ils liés ou indépendants ?

3. **Croisement 3 (Test-Cross 2) :**
   On croise une femelle $F_1$ avec un mâle double récessive à corps noir et ailes vestigiales.
   Sur 1000 descendants comptés, on dénombre :
   - 415 drosophiles à corps gris et ailes longues $[G, L]$.
   - 405 drosophiles à corps noir et ailes vestigiales $[n, vg]$.
   - 92 drosophiles à corps gris et ailes vestigiales $[G, vg]$.
   - 88 drosophiles à corps noir et ailes longues $[n, L]$.
   3.1. Interpréter rigoureusement ces résultats en expliquant le mécanisme méiotique responsable des phénotypes recombinés.
   3.2. Calculer le pourcentage de recombinaison (taux de crossing-over $p$).
   3.3. Déterminer la distance génétique séparant les deux gènes en centimorgans ($\\text{cM}$) et établir la carte factorielle.`,
    correction: `**1. Analyse du croisement 1 ($F_1$) :**
1.1.
- Tous les individus de la génération $F_1$ sont identiques (uniformité de $F_1$, première loi de Mendel). Les parents sont donc de lignées pures homozygotes.
- Les phénotypes exprimés en $F_1$ révèlent les allèles dominants :
  - Pour la couleur du corps : l'allèle gris est dominant ($G > n$).
  - Pour la longueur des ailes : l'allèle longues est dominant ($L > vg$).

**2. Analyse du croisement 2 (Test-cross avec mâle $F_1$) :**
- On obtient 2 phénotypes équiprobables ($50\\% - 50\\%$), identiques aux phénotypes parentaux.
- Si les gènes étaient indépendants, on obtiendrait 4 phénotypes équiprobables ($25\\%$ chacun selon la 3ème loi de Mendel).
- *Conclusion :* Les deux couples d'allèles sont **liés sur le même autosome (linkage absolu chez le mâle)**. Le mâle $F_1$ ne produit que deux types de gamètes : $\\underline{G \\; L}$ ($50\\%$) et $\\underline{n \\; vg}$ ($50\\%$).

**3. Analyse du croisement 3 (Test-cross avec femelle $F_1$) :**
3.1.
- On observe 4 phénotypes :
  - Deux phénotypes parentaux majoritaires : $415 + 405 = 820$ ($82\\%$).
  - Deux phénotypes recombinés minoritaires : $92 + 88 = 180$ ($18\\%$).
- *Mécanisme :* Lors de la prophase I de la méiose chez la femelle drosophile, un échange réciproque de segments de chromatides non-sœurs survient entre les chromosomes homologues appariés (**enjambement ou crossing-over**), créant des chromatides recombinées $\\underline{G \\; vg}$ et $\\underline{n \\; L}$.
3.2.
- **Taux de recombinaison $p$ :**
  $$p = \\frac{\\text{Nombre de recombinés}}{\\text{Nombre total de descendants}} \\times 100 = \\frac{92 + 88}{1000} \\times 100 = \\frac{180}{1000} \\times 100 = 18\\%$$
3.3.
- Par définition (Morgan), $1\\%$ de recombinaison équivaut à une distance génétique de $1\\text{ centimorgan (cM)}$.
- La distance entre le locus "couleur du corps" et le locus "forme des ailes" est donc de **$18\\text{ cM}$**.
- **Carte factorielle :**
  \`\`\`
  [G/n] ------------------------ 18 cM ------------------------ [L/vg]
  \`\`\``
  },
  {
    id: 26,
    title: "Lycée Seydina Limamou Laye — Devoir Surveillé de Génétique Humaine",
    source: "Lycée Seydina Limamou Laye",
    sourceType: "lycee",
    theme: "Arbres généalogiques et transmission d'une maladie autosomale récessive (Drépanocytose)",
    category: "genetique",
    enonce: `On s'intéresse à la transmission d'une maladie héréditaire de l'hémoglobine très fréquente en Afrique de l'Ouest : la drépanocytose (anémie falciforme).
On étudie l'arbre généalogique d'une famille sénégalaise :

- Les parents $I_1$ et $I_2$, sains sur le plan clinique, ont eu 4 enfants :
  * $II_1$ : garçon sain.
  * $II_2$ : fille atteinte d'anémie falciforme sévère.
  * $II_3$ : fille saine.
  * $II_4$ : garçon atteint.
- L'individu $II_1$ épouse une femme saine $II_5$ dont la mère était drépanocytaire atteinte.

1. **Mode de transmission de l'allèle responsable de la maladie :**
   1.1. L'allèle muté responsable de la maladie est-il dominant ou récessif ? Justifier formellement d'après l'arbre généalogique.
   1.2. Le gène est-il porté par le chromosome $Y$, par le chromosome $X$ ou par un autosome ? Éliminer rigoureusement les hypothèses d'hérédité liée au sexe.

2. **Génotypes de la famille :**
   En utilisant les notations $A$ (allèle normal codant l'hémoglobine HbA) et $S$ (allèle muté codant l'hémoglobine anormale HbS) :
   2.1. Donner avec certitude les génotypes des parents $I_1$ et $I_2$ et des enfants atteints $II_2$ et $II_4$.
   2.2. Donner le génotype de la femme $II_5$.
   2.3. Donner les probabilités des génotypes possibles pour le garçon sain $II_1$.

3. **Calcul de risque génétique pour le futur enfant :**
   Le couple $(II_1 - II_5)$ attend un enfant. Calculer la probabilité que cet enfant naisse atteint de drépanocytose.`,
    correction: `**1. Détermination du mode de transmission :**
1.1.
- Les parents $I_1$ et $I_2$ sont tous deux sains et ont des enfants atteints ($II_2$ et $II_4$).
- *Conclusion :* L'allèle responsable de la maladie était masqué chez les parents hétérozygotes. L'allèle pathologique $S$ est donc **récessif** et l'allèle normal $A$ est **dominant** ($A > S$).
1.2.
- **Hypothèse liée au chromosome Y :** Impossible, car l'enfant $II_2$ est une fille atteinte (elle ne possède aucun chromosome Y).
- **Hypothèse liée au chromosome X récessif :** Si la maladie était récessive liée à X, toute fille malade $X^S X^S$ devrait obligatoirement avoir reçu un chromosome $X^S$ de son père, qui serait donc $X^S Y$ et obligatoirement malade. Or, le père $I_1$ est parfaitement sain ($X^A Y$). L'hypothèse est donc formellement rejetée.
- *Conclusion :* La maladie est **autosomale récessive**.

**2. Détermination des génotypes :**
2.1.
- Enfants atteints $II_2$ et $II_4$ : phénotype $[S]$, donc homozygotes récessifs obligatoires : **$S // S$**.
- Parents $I_1$ et $I_2$ : phénotype sain $[A]$, ayant transmis chacun un allèle $S$ à leurs enfants atteints : obligatoirement hétérozygotes conducteurs : **$A // S$**.
2.2.
- Femme $II_5$ : saine $[A]$ issue d'une mère malade ($S // S$). Elle a obligatoirement reçu un allèle $S$ de sa mère : son génotype est avec certitude **$A // S$** ($p = 1$).
2.3.
- Homme $II_1$ : sain $[A]$ issu du croisement $(A // S \\times A // S)$.
  - Tableau de croisement : $1/4 \\; A//A$, $2/4 \\; A//S$, $1/4 \\; S//S$.
  - Sachant qu'il est sain (on élimine la case $S//S$), ses probabilités génotypiques sont :
    - Probabilité d'être $A // A = 1/3$.
    - Probabilité d'être hétérozygote transmetteur $A // S = \\mathbf{2/3}$.

**3. Calcul du risque pour le fœtus $(II_1 \\times II_5)$ :**
- Pour que l'enfant soit atteint ($S // S$), il faut que :
  1. Le père $II_1$ soit hétérozygote $A // S$ : probabilité $= 2/3$.
  2. La mère $II_5$ soit hétérozygote $A // S$ : probabilité $= 1$.
  3. Les deux parents transmettent chacun leur allèle $S$ : probabilité $= 1/2 \\times 1/2 = 1/4$.
- **Probabilité globale :**
  $$P(\\text{enfant atteint}) = \\frac{2}{3} \\times 1 \\times \\frac{1}{4} = \\frac{2}{12} = \\frac{1}{6} \\approx 16{,}67\\%$$`
  },
  {
    id: 27,
    title: "Concours Général Sénégalais — SVT Terminale S2",
    source: "Concours Général Sénégalais",
    sourceType: "concours",
    theme: "Arbres généalogiques et maladies récessives liées à l'X : Daltonisme et Hémophilie",
    category: "genetique",
    enonce: `On étudie la transmission de deux anomalies chez l'Homme : le daltonisme (anomalie de la vision des couleurs) et l'hémophilie A (défaut de coagulation du sang par déficit en facteur VIII). Les gènes correspondants sont situés sur le chromosome $X$ à une distance de $12\\text{ cM}$ l'un de l'autre.

Dans une famille :
- L'homme $I_1$ est daltonien mais non hémophile.
- Son épouse $I_2$ a une vision normale et une coagulation normale. Son père était hémophile mais non daltonien, et sa mère ne présentait aucune anomalie (famille saine).
- Ce couple a un fils $II_1$ qui est à la fois daltonien et hémophile.

1. **Détermination des allèles et des chromosomes :**
   On note :
   - Pour la vision : $d$ (daltonien, récessif) et $D$ (vision normale, dominant).
   - Pour la coagulation : $h$ (hémophile, récessif) et $H$ (coagulation normale, dominant).
   1.1. Écrire le génotype complet de l'homme $I_1$.
   1.2. Reconstituer le génotype de la femme $I_2$ en précisant les allèles portés par chacun de ses deux chromosomes $X$ (préciser la phase de couplage ou répulsion des allèles $d$ et $h$).

2. **Origine génétique du fils $II_1$ :**
   2.1. Quel est le génotype du fils $II_1$ ?
   2.2. Expliquer comment ce garçon a pu recevoir un chromosome $X$ portant simultanément les deux allèles récessifs $d$ et $h$ alors que sa mère portait ces allèles sur des chromosomes distincts.
   2.3. Calculer la probabilité pour cette mère de concevoir un tel garçon doublement atteint (tenir compte de la distance factorielle de $12\\text{ cM}$).`,
    correction: `**1. Génotypes des parents :**
1.1.
- Homme $I_1$ : phénotype daltonien et non hémophile. Hémizygote pour les gènes liés à l'X : son génotype s'écrit obligatoirement :
  $$\\mathbf{X}_{d \\; H} \\; Y$$
1.2.
- Femme $I_2$ : phénotype normal $[D, H]$.
  - Elle a reçu de son père hémophile non daltonien un chromosome $X$ portant obligatoirement les allèles $(D \\text{ et } h)$ : chromosome $\\mathbf{X}_{D \\; h}$.
  - Elle a reçu de sa mère saine un chromosome $X$ portant les allèles normaux $(D \\text{ et } H)$, ou éventuellement le daltonisme de ses ascendants. Comme son fils est daltonien, elle est obligatoirement conductrice du daltonisme sur l'autre chromosome $X$ : chromosome $\\mathbf{X}_{d \\; H}$.
  - Son génotype s'écrit donc en **phase de répulsion (trans)** :
    $$\\mathbf{X}_{D \\; h} \\; / \\; \\mathbf{X}_{d \\; H}$$

**2. Analyse du fils $II_1$ et crossing-over :**
2.1.
- Le fils $II_1$ est daltonien et hémophile : il a reçu le chromosome $Y$ de son père et son chromosome $X$ de sa mère. Son génotype est :
  $$\\mathbf{X}_{d \\; h} \\; Y$$
2.2.
- La mère possède un chromosome avec $d$ et un autre avec $h$. Pour produire un gamète ovulaire portant $\\mathbf{X}_{d \\; h}$, il s'est obligatoirement produit un **crossing-over (enjambement)** entre les deux loci lors de la prophase I de la méiose maternelle.
2.3.
- **Calcul de la probabilité :**
  - La distance entre les deux gènes est de $12\\text{ cM}$, ce qui correspond à un taux de recombinaison global de $12\\%$.
  - Les gamètes recombinés représentent $12\\%$ au total, soit :
    - $6\\%$ pour le chromosome recombinant $\\mathbf{X}_{d \\; h}$.
    - $6\\%$ pour le chromosome recombinant $\\mathbf{X}_{D \\; H}$.
  - Pour qu'un enfant soit un garçon recevant ce chromosome :
    - Probabilité que l'ovule pondu soit $\\mathbf{X}_{d \\; h} = 6\\% = 0{,}06$.
    - Probabilité que le spermatozoïde fécondant apporte le chromosome $Y = 1/2 = 0{,}5$.
  - **Probabilité globale :**
    $$P(\\text{garçon } II_1) = 0{,}06 \\times 0{,}5 = 0{,}03 = \\mathbf{3\\%}$$`
  },
  {
    id: 28,
    title: "Lycée Thierno Seydou Nourou Tall — Épreuve de Contrôle SVT",
    source: "Lycée Thierno Seydou Nourou Tall",
    sourceType: "lycee",
    theme: "Anomalies chromosomiques : non-disjonction méiotique, caryotype et trisomie 21 libre vs translocation",
    category: "genetique",
    enonce: `On étudie les mécanismes cytogénétiques à l'origine du syndrome de Down (Trisomie 21).

1. **La trisomie 21 libre et homogène ($95\\%$ des cas) :**
   1.1. Écrire la formule chromosomique complète d'un garçon atteint de trisomie 21 libre.
   1.2. À quelle anomalie de la division méiotique parentale cette affection est-elle due (non-disjonction de la paire de chromosomes 21 lors de l'anaphase I ou non-séparation des chromatides sœurs lors de l'anaphase II) ?
   1.3. Pourquoi le risque de concevoir un enfant trisomique augmente-t-il considérablement avec l'âge maternel au-delà de 35 ans (vieillissement des ovocytes bloqués en prophase I) ?

2. **La trisomie 21 par translocation robertsonienne ($4\\%$ des cas) :**
   Une jeune mère de 22 ans donne naissance à un enfant atteint de trisomie 21. Le caryotype de l'enfant révèle 46 chromosomes, mais l'un des chromosomes de la paire 14 est anormalement allongé.
   L'analyse moléculaire montre qu'un chromosome 21 entier est fusionné au chromosome 14 (translocation déséquilibrée $t(14;21)$).

   Le caryotype de la mère montre $2n = 45$ chromosomes :
   - Un chromosome 14 normal.
   - Un chromosome 21 normal.
   - Un grand chromosome hybride $14/21$ résultant de la fusion des bras longs.
   - La mère est cliniquement saine (porteuse saine d'une translocation équilibrée).

2.1. Faire les schémas méiotiques des différents types de gamètes produits par cette mère.
2.2. Quels sont les différents types d'enfants possibles lors d'une union avec un père au caryotype normal (enfant normal, porteur sain, trisomie 21 par translocation, monosomie 21 létale) ?`,
    correction: `**1. La trisomie 21 libre et homogène :**
1.1.
- Formule chromosomique d'un garçon trisomique : **$47, \\text{XY}, +21$**.
1.2.
- **Accident méiotique :**
  - Soit non-disjonction de la paire d'homologues 21 en **anaphase I** (la majorité des cas, d'origine maternelle dans $90\\%$ des cas).
  - Soit non-séparation des deux chromatides sœurs en **anaphase II**.
  - Cela conduit à la formation d'un gamète anormal disomique ($n = 24$ avec deux chromosomes 21) qui, une fois fécondé par un gamète normal monosomique ($n = 23$), donne un zygote trisomique ($2n+1 = 47$).
1.3.
- Chez la femme, la méiose est initiée in utero et reste bloquée en prophase I pendant 20, 30 voire 40 ans. Avec l'âge, l'appareil du fuseau mitotique/méiotique et les complexes de cohésine se dégradent, augmentant considérablement la probabilité de non-disjonction des bivalents lors de la reprise ovulatoire.

**2. La trisomie 21 par translocation robertsonienne :**
2.1. et 2.2.
- Chez la mère porteuse saine ($45, \\text{XX}, \\text{der}(14;21)$), la ségrégation des chromosomes $14$, $21$ et du fusionné $14/21$ lors de l'anaphase I produit 6 types théoriques de gamètes :
  1. Gamète avec $[14 \\text{ normal} + 21 \\text{ normal}]$ $\\implies$ après fécondation : **Enfant diploïde parfaitement normal ($46$ chromosomes)**.
  2. Gamète avec $[14/21 \\text{ fusionné}]$ $\\implies$ après fécondation : **Enfant phénotypiquement sain mais porteur équilibré ($45$ chromosomes)**.
  3. Gamète avec $[14/21 \\text{ fusionné} + 21 \\text{ normal}]$ $\\implies$ après fécondation : **Enfant atteint de trisomie 21 par translocation ($46$ chromosomes, 3 doses géniques de 21)**.
  4. Gamète avec $[14 \\text{ normal}]$ seul (sans 21) $\\implies$ **Monosomie 21 (non viable, fausse couche précoce)**.
  5. Gamète avec $[14/21 \\text{ fusionné} + 14 \\text{ normal}]$ $\\implies$ **Trisomie 14 (létale)**.
  6. Gamète avec $[21 \\text{ normal}]$ seul (sans 14) $\\implies$ **Monosomie 14 (létale)**.
- *Conclusion clinique :* Contrairement à la trisomie libre qui est un accident fortuit non récurrent, la trisomie par translocation comporte un risque génétique élevé de récidive à chaque grossesse pour la mère porteuse.`
  },
  {
    id: 29,
    title: "Prytanée Militaire de Saint-Louis — Composition Trimestrielle",
    source: "Prytanée Militaire Charles Ntchoréré",
    sourceType: "lycee",
    theme: "Structure de l'ADN, réplication semi-conservative de Meselson et Stahl, transcription et traduction",
    category: "genetique",
    enonce: `On étudie l'expression et la duplication de l'information génétique.

1. **L'expérience historique de Meselson et Stahl (1958) :**
   Des bactéries *Escherichia coli* sont cultivées sur un milieu contenant de l'azote lourd $^{15}\\text{N}$ pendant plusieurs générations jusqu'à ce que tout leur ADN soit lourd (densité $d = 1{,}724$).
   À $t = 0$, les bactéries sont transférées sur un milieu contenant de l'azote léger $^{14}\\text{N}$. L'ADN est extrait et centrifugé sur gradient de chlorure de césium ($\\text{CsCl}$) à chaque génération :
   - À $G_0$ : Une seule bande d'ADN lourd $^{15}\\text{N}-^{15}\\text{N}$ au fond du tube.
   - À $G_1$ (après 1 division, $20\\text{ min}$) : Une seule bande d'ADN de densité intermédiaire (hybride $^{15}\\text{N}-^{14}\\text{N}$).
   - À $G_2$ (après 2 divisions, $40\\text{ min}$) : Deux bandes d'égale intensité ($50\\%$ ADN léger $^{14}\\text{N}-^{14}\\text{N}$ et $50\\%$ ADN hybride $^{15}\\text{N}-^{14}\\text{N}$).
   - À $G_3$ : $75\\%$ ADN léger et $25\\%$ ADN hybride.

1.1. Expliquer pourquoi ces résultats réfutent définitivement le modèle conservatif et le modèle dispersif.
1.2. Confirmer le modèle semi-conservatif proposé par Watson et Crick.

2. **Transcription et traduction :**
   Soit la séquence du brin transcrit (brin matrice) d'un gène bactérien :
   $$3'-\\text{T A C} \\; \\text{A A A} \\; \\text{C C G} \\; \\text{A T T} \\; \\text{A C T}-5'$$
   2.1. Écrire la séquence de l'ARN messager synthétisé par l'ARN polymérase en précisant sa polarité $5' \\to 3'$.
   2.2. En utilisant le code génétique, déduire la séquence du peptide traduit (AUG: Met ; UUU: Phe ; GGC: Gly ; UAA: Stop ; UGA: Stop).
   2.3. Une mutation par substitution remplace la thymine en position 10 ($\\text{A T T} \\to \\text{A T C}$). Déterminer la conséquence sur la chaîne polypeptidique (mutation silencieuse, faux-sens ou non-sens).`,
    correction: `**1. L'expérience de Meselson et Stahl :**
1.1.
- **Réfutation du modèle conservatif :** Si le modèle était conservatif, la molécule mère lourde serait préservée intacte et une molécule fille légère serait synthétisée dès $G_1$ $\\implies$ on observerait 2 bandes ($^{15}\\text{N}$ et $^{14}\\text{N}$). Or, à $G_1$, on observe une **bande unique de densité intermédiaire** : le modèle conservatif est réfuté.
- **Réfutation du modèle dispersif :** Si le modèle était dispersif (mélange aléatoire de fragments anciens et nouveaux dans chaque brin), à $G_2$ l'ADN serait constitué d'un continuum de densités de plus en plus légères sans séparation nette. Or, à $G_2$, apparaissent deux bandes distinctes, dont une bande légère pure $^{14}\\text{N}-^{14}\\text{N}$ qui augmente de génération en génération.
1.2.
- **Confirmation du modèle semi-conservatif :**
  Lors de la réplication, la double hélice parentale s'ouvre. Chaque brin sert de matrice pour la synthèse d'un brin complémentaire néoformé. À $G_1$, $100\\%$ des molécules sont constituées d'un brin ancien $^{15}\\text{N}$ et d'un brin nouveau $^{14}\\text{N}$ (ADN hybride). À $G_2$, ces brins se séparent à nouveau, donnant $50\\%$ d'hybrides et $50\\%$ de légers.

**2. Expression du message génétique :**
2.1.
- **Transcription de l'ARNm :** Complémentarité et antiparallélisme des bases ($A \\to U, T \\to A, C \\to G, G \\to C$) :
  $$\\text{Brin transcrit } (3' \\to 5') : 3'-\\text{T A C} \\; \\text{A A A} \\; \\text{C C G} \\; \\text{A T T} \\; \\text{A C T}-5'$$
  $$\\mathbf{ARNm} \\; (5' \\to 3') : \\mathbf{5'-\\text{A U G} \\; \\text{U U U} \\; \\text{G G C} \\; \\text{U A A} \\; \\text{U G A}-3'}$$
2.2.
- **Traduction du peptide :**
  - $\\text{AUG}$ $\\to$ **Méthionine (Met)** (codon initiateur).
  - $\\text{UUU}$ $\\to$ **Phénylalanine (Phe)**.
  - $\\text{GGC}$ $\\to$ **Glycine (Gly)**.
  - $\\text{UAA}$ $\\to$ **Codon STOP** (interruption de la traduction).
  - Séquence du peptide : $\\mathbf{\\text{Met}-\\text{Phe}-\\text{Gly}}$ (tripeptide).
2.3.
- **Impact de la mutation :**
  - Le codon matrice $3'-\\text{A T C}-5'$ donne le codon ARNm $5'-\\text{U A G}-3'$.
  - $\\text{UAG}$ est un codon STOP ! La traduction s'arrête exactement au même endroit. Le peptide reste $\\text{Met}-\\text{Phe}-\\text{Gly}$.
  - Il s'agit d'une **mutation silencieuse (ou mutation neutre)**, car elle ne modifie pas la séquence en acides aminés de la protéine finale en raison de la redondance (dégénérescence) du code génétique.`
  },
  {
    id: 30,
    title: "Lycée Maurice Delafosse — Composition Commune de SVT",
    source: "Lycée Maurice Delafosse",
    sourceType: "lycee",
    theme: "Génie génétique et biotechnologies : enzymes de restriction, plasmide recombinant et insuline humaine",
    category: "genetique",
    enonce: `On étudie les étapes biotechnologiques permettant la synthèse industrielle d'insuline humaine recombinante par des bactéries transgéniques (*Escherichia coli*).

1. **Outils fondamentaux du génie génétique :**
   1.1. Quel est le rôle précis des **enzymes de restriction** (endonucléases de restriction telles que *EcoRI* ou *BamHI*) ? Pourquoi dit-on qu'elles coupent au niveau de séquences palindromiques ?
   1.2. Définir les **extrémités cohésives (ou collantes)** et expliquer pourquoi il est impératif d'utiliser la MÊME enzyme de restriction pour couper le gène d'intérêt et le plasmide vecteur.
   1.3. Quel est le rôle de l'**ADN ligase** ?

2. **Obtention du gène de l'insuline sans introns :**
   Les bactéries ne possèdent pas la machinerie d'épissage (spliceosome) permettant d'éliminer les introns de l'ARN pré-messager eucaryote.
   2.1. Comment obtient-on un gène d'insuline dépourvu d'introns à partir des cellules bêta des îlots de Langerhans du pancréas humain (isolement de l'ARNm mature et action de la **transcriptase inverse** pour former un ADN complémentaire ou ADNc) ?

3. **Sélection et criblage des bactéries transformées :**
   Le plasmide utilisé possède un gène de résistance à l'ampicilline ($Amp^R$) et un gène de résistance à la tétracycline ($Tet^R$).
   L'insertion du gène de l'insuline s'effectue au milieu du gène $Tet^R$ (inactivation par insertion).
   3.1. Sur quel milieu antibiotique doit-on cultiver les bactéries pour identifier celles qui ont incorporé le plasmide recombinant ?
   3.2. Citer deux autres applications biomédicales ou agronomiques majeures des OGM (hormone de croissance humaine, maïs Bt résistant aux insectes ravageurs).`,
    correction: `**1. Les outils du génie génétique :**
1.1.
- **Enzymes de restriction :** Ciseaux moléculaires bactériens capables de reconnaître une séquence nucléotidique spécifique (généralement de 4 à 8 paires de bases) et de cliver les deux brins d'ADN bicaténaire en un site précis.
- **Séquence palindromique :** Séquence symétrique présentant la même succession de bases lorsqu'elle est lue en $5' \\to 3'$ sur les deux brins complémentaires (ex: $5'-\\text{GAATTC}-3'$ / $3'-\\text{CTTAAG}-5'$ pour *EcoRI*).
1.2.
- **Extrémités cohésives (collantes) :** Extrémités à simples brins proéminents générées par une coupure décalée.
- *Nécessité de la même enzyme :* Utiliser la même enzyme garantit que les extrémités monocaténaires du gène d'intérêt et du plasmide ouvert soient **rigoureusement complémentaires**, permettant leur hybridation spontanée par liaisons hydrogène.
1.3.
- **ADN Ligase :** Enzyme rétablissant les liaisons phosphodiester covalentes fortes entre le squelette désoxyribose-phosphate du plasmide et du gène, scellant définitivement la molécule d'ADN recombinant.

**2. Obtention de l'ADN complémentaire (ADNc) :**
- L'ADN génomique humain contient des exons (codants) et des introns (non codants). La bactérie hôte étant incapable d'épisser les introns, l'expression de l'ADN génomique brut donnerait une protéine anormale non fonctionnelle.
- **Stratégie de l'ADNc :**
  1. Extraction des ARNm matures (déjà épissés) dans les cellules pancréatiques.
  2. Transcription in vitro par la **transcriptase inverse (rétrotranscriptase)** d'origine rétrovirale $\\implies$ synthèse d'un **ADN complémentaire (ADNc)** monocaténaire.
  3. Synthèse du second brin par l'ADN polymérase I. L'ADNc obtenu est exempt d'introns et directement traduisible par les ribosomes bactériens.

**3. Sélection des bactéries recombinantes :**
3.1.
- **Inactivation par insertion :**
  - Les bactéries ayant intégré le plasmide recombinant deviennent **résistantes à l'ampicilline ($Amp^R$)**, mais **sensibles à la tétracycline ($Tet^S$)** car le gène de l'insuline a détruit le cadre de lecture du gène de résistance à la tétracycline.
  - On étale les bactéries sur gélose additionnée d'ampicilline : seules celles ayant reçu le plasmide survivent.
  - Par réplique sur velours sur un milieu avec tétracycline, les colonies qui meurent sont précisément celles contenant l'insert de l'insuline humaine recombinante.
3.2.
- **Autres applications :**
  - *Biomédicale :* Synthèse de l'**hormone de croissance humaine (somatotropine)** pour traiter le nanisme hypophysaire ; production de facteur VIII pour les hémophiles.
  - *Agronomique :* Plantes génétiquement modifiées (**Maïs Bt**) exprimant la toxine de *Bacillus thuringiensis* pour résister à la pyrale sans pulvérisation d'insecticides chimiques.`
  }
];
