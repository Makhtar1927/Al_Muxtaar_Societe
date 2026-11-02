'use client';

import React, { useState } from 'react';
import StudyIcon from '@/components/ui/study-icon';
import MathRenderer from '@/components/course/math-renderer';

const STATISTIQUES_METHODES = [
  {
    num: 1,
    title: "Le Point Moyen G(x̄, ȳ) & Sommes du Tableau",
    icon: 'theoreme_equerre' as const,
    when: "Dès l'ouverture de l'exercice pour déterminer les coordonnées moyennes et initialiser les calculs",
    formule: `**Coordonnées du Point Moyen $G$ :**

$$\\bar{x} = \\dfrac{1}{N} \\sum_{i=1}^N x_i \\qquad \\text{et} \\qquad \\bar{y} = \\dfrac{1}{N} \\sum_{i=1}^N y_i$$

- $N$ est le nombre total d'individus ou de relevés statistiques.
- **Règle géométrique fondamentale :** La droite de régression linéaire $(D)$ passe **toujours par le point moyen $G$**.
- C'est le point clé qui sert à vérifier instantanément l'ordonnée à l'origine : $b = \\bar{y} - a\\bar{x}$.`,
    exemple: `Soit la série statistique suivante donnant le chiffre d'affaires $y_i$ (en millions FCFA) selon l'année $x_i$ :
$x_i \\in \\{1, 2, 3, 4, 5\\}$ et $y_i \\in \\{10, 14, 18, 23, 30\\}$ ($N = 5$).

1. Calcul de $\\bar{x}$ :
   $$\\bar{x} = \\dfrac{1 + 2 + 3 + 4 + 5}{5} = \\dfrac{15}{5} = 3$$
2. Calcul de $\\bar{y}$ :
   $$\\bar{y} = \\dfrac{10 + 14 + 18 + 23 + 30}{5} = \\dfrac{95}{5} = 19$$
3. Coordonnées du point moyen :
   $$G(3, 19)$$`,
    astuce: 'Sur votre copie d\'examen, commencez toujours par dresser un tableau récapitulatif complet à 5 colonnes : x_i, y_i, x_i², y_i², et x_i·y_i avec la ligne des sommes en bas. Vous éviterez ainsi tout oubli.',
    wolof: '« Point moyen G(x̄, ȳ) mooy doole ji ak diggu série statistique bi. Moyenne x̄ mooy diggu x, moyenne ȳ mooy diggu y. Règle bi ci gën a am solo mooy : droite d\'ajustement bi (D) faw mu jaar ci biir G, foofu lañuy sàmme ordonnée à l\'origine b = ȳ - a·x̄ ! »',
    vieReelle: 'C\'est comme le prix moyen du sac de riz au marché Sandaga : le point G représente le panier moyen officiel, et la droite d\'évolution des prix est ancrée sur ce repère central incontournable.',
  },
  {
    num: 2,
    title: "Covariance & Variances par la Formule de Koenig",
    icon: 'technique_outils' as const,
    when: "Pour évaluer la dispersion des variables et le degré de liaison conjointe entre X et Y",
    formule: `**Formule de Koenig pour la Covariance :**
$$Cov(X, Y) = \\dfrac{1}{N} \\sum_{i=1}^N x_i y_i - \\bar{x}\\bar{y}$$

**Variances et Écarts-types marginaux :**
$$V(X) = \\dfrac{1}{N} \\sum_{i=1}^N x_i^2 - \\bar{x}^2 \\qquad \\text{et} \\qquad \\sigma_X = \\sqrt{V(X)}$$
$$V(Y) = \\dfrac{1}{N} \\sum_{i=1}^N y_i^2 - \\bar{y}^2 \\qquad \\text{et} \\qquad \\sigma_Y = \\sqrt{V(Y)}$$

- Si $Cov(X, Y) > 0$, les deux variables croissent simultanément.
- Si $Cov(X, Y) < 0$, $Y$ décroît quand $X$ croît.`,
    exemple: `Avec la série précédente ($N = 5, \\bar{x} = 3, \\bar{y} = 19$) :
- $\\sum x_i^2 = 1 + 4 + 9 + 16 + 25 = 55$
- $\\sum x_i y_i = (1 \\times 10) + (2 \\times 14) + (3 \\times 18) + (4 \\times 23) + (5 \\times 30) = 10 + 28 + 54 + 92 + 150 = 334$

1. Variance $V(X)$ :
   $$V(X) = \\dfrac{55}{5} - 3^2 = 11 - 9 = 2 \\implies \\sigma_X = \\sqrt{2} \\approx 1,414$$
2. Covariance $Cov(X, Y)$ :
   $$Cov(X, Y) = \\dfrac{334}{5} - (3 \\times 19) = 66,8 - 57 = 9,8$$`,
    astuce: 'Vérifiez toujours que la variance V(X) est strictement positive ! Si vous trouvez un résultat négatif, c\'est que vous avez soustrait les termes dans le mauvais ordre ou fait une erreur dans la somme des carrés.',
    wolof: '« Formule Koenig mooy yoon wu gën a gaaw : V(X) = (1/N)∑x_i² - x̄² ak Cov(X,Y) = (1/N)∑x_i·y_i - x̄·ȳ. Covariance moo lay wax ndax ñaar yi dañuy ànd di yokk (positif) walla ku ci nekk dafay dem ci fànnam (négatif) ! »',
    vieReelle: 'Si vous observez la corrélation entre les dépenses publicitaires d\'une PME dakaroise et son volume de ventes : une covariance positive confirme que chaque franc CFA investi en réclame fait progresser les commandes.',
  },
  {
    num: 3,
    title: "Droites de Régression : Moindres Carrés (D) et (D')",
    icon: 'formule_cle' as const,
    when: "Pour établir l'équation de la droite d'ajustement de Y en X ou de X en Y et prédire des valeurs futures",
    formule: `**Droite de régression de Y en X (pour estimer Y connaissant X) :**
$$(D_{Y/X}) : y = ax + b$$
$$a = \\dfrac{Cov(X, Y)}{V(X)} \\qquad \\text{et} \\qquad b = \\bar{y} - a\\bar{x}$$

**Droite de régression de X en Y (pour estimer X connaissant Y) :**
$$(D_{X/Y}) : x = a'y + b'$$
$$a' = \\dfrac{Cov(X, Y)}{V(Y)} \\qquad \\text{et} \\qquad b' = \\bar{x} - a'\\bar{y}$$`,
    exemple: `En reprenant nos valeurs : $Cov(X, Y) = 9,8$, $V(X) = 2$, $\\bar{x} = 3$, $\\bar{y} = 19$.

1. Pente $a$ :
   $$a = \\dfrac{9,8}{2} = 4,9$$
2. Ordonnée à l'origine $b$ :
   $$b = 19 - (4,9 \\times 3) = 19 - 14,7 = 4,3$$
3. Équation de la droite de régression :
   $$(D) : y = 4,9 x + 4,3$$
4. **Prédiction :** Estimation du chiffre d'affaires à l'année $x = 7$ :
   $$y(7) = 4,9(7) + 4,3 = 34,3 + 4,3 = 38,6 \\text{ millions FCFA}$$`,
    astuce: 'ATTENTION PIÈGE DU BAC : Si l\'énoncé demande : « À quelle année le chiffre d\'affaires atteindra-t-il 50 millions ? », c\'est X que l\'on cherche connaissant Y ! Vous devez utiliser la droite (D\') : x = a\'y + b\' et non pas inverser la droite (D).',
    wolof: '« Droite (D) y = ax + b mooy wax li Y di doon boo xamee X (pente a = Cov/V(X)). Waaye bu la examinateur laajee : « kagn la Y di tollook 50 », bul inverser (D) ! Faw nga jëfandikoo droite (D\') x = a\'y + b\' ak a\' = Cov/V(Y) ! »',
    vieReelle: 'Prévoir la production d\'arachides à Kaolack connaissant la pluviométrie en mm se fait avec (D). Mais si l\'État veut savoir combien de mm de pluie étaient nécessaires pour obtenir un record de récolte, il doit obligatoirement utiliser (D\') !',
  },
  {
    num: 4,
    title: "Coefficient de Corrélation r & Validité Linéaire",
    icon: 'rigueur_compas' as const,
    when: "Pour justifier rigoureusement si un ajustement linéaire est pertinent avant toute prédiction",
    formule: `**Coefficient de corrélation linéaire de Pearson :**
$$r = \\dfrac{Cov(X, Y)}{\\sigma_X \\cdot \\sigma_Y} = \\dfrac{Cov(X, Y)}{\\sqrt{V(X) \\cdot V(Y)}}$$

**Propriétés fondamentales :**
- $-1 \\le r \\le 1$
- $r^2 = a \\cdot a'$
- Le signe de $r$ est identique à celui de $a$ et de $Cov(X, Y)$.

**Critère de validation au Bac S2 :**
- Si $|r| \\ge 0,87$ (ou $|r| \\ge 0,95$) : **Forte corrélation linéaire**, l'ajustement linéaire par la méthode des moindres carrés est **parfaitement justifié**.
- Si $|r| < 0,7$ : Corrélation linéaire faible, un ajustement par droite n'est pas pertinent.`,
    exemple: `Supposons $V(X) = 2$, $V(Y) = 48,8$, et $Cov(X, Y) = 9,8$ :
$$r = \\dfrac{9,8}{\\sqrt{2 \\times 48,8}} = \\dfrac{9,8}{\\sqrt{97,6}} = \\dfrac{9,8}{9,879} \\approx 0,992$$

**Conclusion à rédiger :**
Puisque $|r| = 0,992 > 0,87$, il existe une très forte corrélation linéaire positive entre $X$ et $Y$. Un ajustement linéaire par les moindres carrés est donc entièrement justifié pour effectuer des prévisions.`,
    astuce: 'Calculez toujours r à l\'aide de votre calculatrice en mode STAT > LinReg ax+b avant d\'écrire les calculs détaillés. Cela vous permet d\'avoir la réponse exacte et de vérifier votre covariance.',
    wolof: '« Coeff r de Pearson mooy firnde gi. Boo amee |r| ≥ 0,87, kon li ngay wax am na sago te droite bi am na doole. Bul fatte ne r² = a·a\', loolu da lay may nga seet ndax sa calculs de pentes yi baax nañu ! »',
    vieReelle: 'Comme un auditeur bancaire qui vérifie la solidité d\'un prêt agricole : si le coefficient de corrélation r entre l\'eau d\'irrigation et la récolte dépasse 0,90, le dossier est considéré comme très fiable pour accorder le financement.',
  },
  {
    num: 5,
    title: "Méthode de Mayer & Changement de Variable (Z = ln Y)",
    icon: 'cle_solution' as const,
    when: "Quand le problème impose la méthode de scission de Mayer ou un ajustement exponentiel/puissance",
    formule: `**1. Méthode de Mayer :**
- On partage les $N$ points en deux sous-groupes $P_1$ et $P_2$ d'effectifs égaux $N_1 = N_2$.
- On calcule les deux points moyens partiels $G_1(\\bar{x}_1, \\bar{y}_1)$ et $G_2(\\bar{x}_2, \\bar{y}_2)$.
- La droite d'ajustement de Mayer est la droite $(G_1 G_2)$ :
  $$y - \\bar{y}_1 = \\dfrac{\\bar{y}_2 - \\bar{y}_1}{\\bar{x}_2 - \\bar{x}_1} (x - \\bar{x}_1)$$

**2. Ajustement Exponentiel par Changement de Variable :**
- Si le nuage présente une croissance exponentielle, on pose $z_i = \\ln(y_i)$.
- On détermine la droite d'ajustement linéaire de $Z$ en $X$ : $z = ax + b$.
- On repasse à $Y$ :
  $$y = e^z = e^{ax + b} = e^b \\cdot (e^a)^x = C \\cdot k^x \\quad \\text{avec } C = e^b \\text{ et } k = e^a$$`,
    exemple: `On pose $Z = \\ln(Y)$ et on trouve la droite d'ajustement $z = 0,25x + 1,2$ :
1. Expression de $Y$ en fonction de $X$ :
   $$Y = e^{0,25x + 1,2} = e^{1,2} \\cdot e^{0,25x} \\approx 3,32 \\cdot e^{0,25x}$$
2. Estimation de $Y$ pour $x = 8$ :
   $$Y(8) = 3,32 \\cdot e^{0,25(8)} = 3,32 \\cdot e^2 \\approx 3,32 \\times 7,389 = 24,53$$`,
    astuce: 'Pour la méthode de Mayer avec un effectif impair (ex: N = 7), l\'énoncé précise toujours la répartition (ex: 4 points dans le premier groupe et 3 dans le second). Lisez attentivement la consigne.',
    wolof: '« Méthode de Mayer dafay séddale série bi ci ñaar (G₁ ak G₂), droite bi di (G₁G₂). Bu nuage bi melni exponentielle, da ngay jël Z = ln(Y), mu soppiku droite z = ax + b, nga dellu ci Y = e^b · e^(ax) ! »',
    vieReelle: 'Quand le nombre d\'utilisateurs d\'une application mobile au Sénégal explose de façon exponentielle, on applique le logarithme ln(Y) pour ramener la courbe à une ligne droite facile à extrapoler.',
  },
];

export default function StatistiquesReflexesCard() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const active = STATISTIQUES_METHODES[selectedIdx];

  return (
    <div className="bg-white rounded-2xl border border-navy/10 shadow-sm p-4 sm:p-6 mb-8">
      {/* Header Mobile First */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy/10 pb-4 mb-6">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2.5 rounded-xl bg-turquoise/10 text-turquoise shrink-0 mt-0.5 sm:mt-0">
            <StudyIcon name="theoreme_equerre" size={24} />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-navy break-words">
              Fiches Réflexes : Séries Statistiques Doubles au Bac S2
            </h3>
            <p className="text-xs sm:text-sm text-navy/60">
              Les 5 méthodes indispensables pour obtenir les 4 à 5 points de l&apos;épreuve
            </p>
          </div>
        </div>
        <span className="self-start sm:self-center px-3 py-1 bg-turquoise/10 text-turquoise text-xs font-semibold rounded-full shrink-0 whitespace-nowrap">
          Spécial Baccalauréat
        </span>
      </div>

      {/* Tabs navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-thin">
        {STATISTIQUES_METHODES.map((methode, idx) => (
          <button
            key={methode.num}
            onClick={() => setSelectedIdx(idx)}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 flex items-center gap-2 ${
              selectedIdx === idx
                ? 'bg-navy text-white shadow-sm'
                : 'bg-navy/5 text-navy/70 hover:bg-navy/10'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                selectedIdx === idx
                  ? 'bg-turquoise text-navy'
                  : 'bg-navy/10 text-navy'
              }`}
            >
              {methode.num}
            </span>
            <span className="truncate max-w-[150px] sm:max-w-none">
              {methode.title.split(':')[0]}
            </span>
          </button>
        ))}
      </div>

      {/* Content panel */}
      <div className="space-y-6">
        {/* When to use */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/60 flex items-start gap-3">
          <div className="text-amber-600 shrink-0 mt-0.5">
            <StudyIcon name="cible_reflexe" size={20} />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-0.5">
              Quand dégainer ce réflexe ?
            </span>
            <p className="text-xs sm:text-sm text-amber-900 font-medium">
              {active.when}
            </p>
          </div>
        </div>

        {/* Formula */}
        <div className="p-4 sm:p-5 rounded-xl bg-navy/5 border border-navy/10">
          <div className="flex items-center gap-2 mb-3 text-navy font-bold text-sm">
            <StudyIcon name="formule_cle" size={18} />
            <span>Formules Clés &amp; Théorèmes Fondamentaux</span>
          </div>
          <div className="text-xs sm:text-sm text-navy/90 overflow-x-auto">
            <MathRenderer content={active.formule} />
          </div>
        </div>

        {/* Concrete Example */}
        <div className="p-4 sm:p-5 rounded-xl bg-emerald-50/60 border border-emerald-200/60">
          <div className="flex items-center gap-2 mb-3 text-emerald-800 font-bold text-sm">
            <StudyIcon name="exercice_crayon" size={18} />
            <span>Exemple Rédigé Type Baccalauréat</span>
          </div>
          <div className="text-xs sm:text-sm text-emerald-950 overflow-x-auto">
            <MathRenderer content={active.exemple} />
          </div>
        </div>

        {/* Tip / Pitfall */}
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200/60 flex items-start gap-3">
          <div className="text-blue-600 shrink-0 mt-0.5">
            <StudyIcon name="ampoule_astuce" size={20} />
          </div>
          <div>
            <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block mb-0.5">
              Astuce du Correcteur &amp; Piège à éviter
            </span>
            <p className="text-xs sm:text-sm text-blue-900">
              {active.astuce}
            </p>
          </div>
        </div>

        {/* Décodage en Wolof */}
        <div className="bg-amber-500/10 rounded-xl p-3 border border-amber-500/25 text-xs text-amber-950">
          <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
            <span>🇸🇳</span>
            <span>Xam-xam ci Wolof (Décodage) :</span>
          </div>
          <p className="italic text-amber-900 leading-relaxed font-medium">
            {active.wolof}
          </p>
        </div>

        {/* Illustration de la Vie Réelle */}
        <div className="bg-indigo-50/90 rounded-xl p-3 border border-indigo-200 text-xs text-indigo-950">
          <div className="flex items-center gap-1.5 font-bold text-indigo-900 mb-1">
            <span>🌍</span>
            <span>Illustration Concrète au Sénégal :</span>
          </div>
          <p className="text-indigo-900 leading-relaxed">
            {active.vieReelle}
          </p>
        </div>
      </div>
    </div>
  );
}
