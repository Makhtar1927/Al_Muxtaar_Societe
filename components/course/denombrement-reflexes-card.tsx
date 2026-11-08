'use client';

import React, { useState } from 'react';
import StudyIcon from '@/components/ui/study-icon';
import MathRenderer from '@/components/course/math-renderer';

const DENOMBREMENT_METHODES = [
  {
    num: 1,
    title: "Le Tableau de Décision à 2 Questions (Ordre & Répétition)",
    icon: 'theoreme_equerre' as const,
    when: "Dès la lecture de l'énoncé pour choisir instantanément entre p-listes, arrangements et combinaisons",
    formule: `**Grille d'identification universelle au Baccalauréat sénégalais :**

| Type de tirage | L'ordre compte-t-il ? | Répétition possible ? | Outil mathématique | Formule de calcul |
| :--- | :---: | :---: | :---: | :---: |
| **Simultané** (poignée, délégation) | **NON** | **NON** | **Combinaisons** $C_n^p$ | $C_n^p = \\dfrac{n!}{p!(n-p)!}$ |
| **Successif sans remise** (podium) | **OUI** | **NON** | **Arrangements** $A_n^p$ | $A_n^p = \\dfrac{n!}{(n-p)!}$ |
| **Successif avec remise** (code secret) | **OUI** | **OUI** | **$p$-listes** | $n^p$ |
| **Permutation de tous les éléments** | **OUI** | **NON** ($p = n$) | **Permutations** $n!$ | $n! = n \\times (n-1) \\times \\dots \\times 1$ |`,
    exemple: `Une urne contient 4 boules rouges, 3 boules vertes et 2 boules noires ($n = 9$ boules au total). On extrait 3 boules.

1. **Tirage simultané de 3 boules :**
   $$\\text{Nombre de tirages possibles} = C_9^3 = \\frac{9 \\times 8 \\times 7}{3 \\times 2 \\times 1} = 84$$
2. **Tirage successif sans remise de 3 boules :**
   $$\\text{Nombre de tirages possibles} = A_9^3 = 9 \\times 8 \\times 7 = 504$$
3. **Tirage successif avec remise de 3 boules :**
   $$\\text{Nombre de tirages possibles} = 9^3 = 729$$`,
    astuce: 'Pour calculer $C_n^p$ rapidement sans calculatrice au Bac : $C_9^3 = \\frac{9 \\times 8 \\times 7}{3 \\times 2 \\times 1}$. Simplifiez 9/3 = 3 et 8/2 = 4, il reste 3 × 4 × 7 = 84 en 5 secondes chrono !',
    wolof: '« ÑAARI LAAC REKK YOO WARA LAAC SA BOPP : Ndax ordre am na solo ? (Su amee solo = A_n^p walla n^p ; su amul solo = C_n^p). Ndax mën nañoo délloosi boule bi ? (Su ñu koy délloosi = n^p ; su ñu koy délloosiwul = A_n^p). Bul jaaxle mukk ! »',
    vieReelle: 'Le code secret Orange Money ou Wave à 4 chiffres : l\'ordre compte absolument (le code 1234 refuse d\'ouvrir le compte si vous tapez 4321) et les chiffres peuvent se répéter (comme 7777). Il y a donc 10⁴ = 10 000 codes possibles !',
  },
  {
    num: 2,
    title: "Le Réflexe Roi de l'Événement Contraire : « Au moins un »",
    icon: 'cle_solution' as const,
    when: "Dès que l'énoncé contient l'expression « obtenir au moins une boule blanche » ou « au moins un élément »",
    formule: `**Théorème de passage au complémentaire :**

Soit $E$ l'événement « obtenir au moins un élément vérifiant la propriété ».
Son événement contraire $\\overline{E}$ est :
$$\\overline{E} = \\text{« n'obtenir AUCUN élément vérifiant la propriété »}$$

**Formule de dénombrement :**
$$\\text{Card}(E) = \\text{Card}(\\Omega) - \\text{Card}(\\overline{E})$$

**Pourquoi cette méthode est impérative au Bac ?**
Calculer directement « au moins une » obligerait à faire la somme :
$$\\text{Card}(E) = \\text{Card}(\\text{exactement 1}) + \\text{Card}(\\text{exactement 2}) + \\dots + \\text{Card}(\\text{exactement } p)$$
Le passage au contraire réduit tous ces calculs à **une seule soustraction** !`,
    exemple: `Dans une urne de 10 boules dont 3 blanches et 7 noires, on tire simultanément 4 boules.
Combien de tirages contiennent au moins une boule blanche ?

1. Nombre total de tirages possibles :
   $$\\text{Card}(\\Omega) = C_{10}^4 = \\frac{10 \\times 9 \\times 8 \\times 7}{4 \\times 3 \\times 2 \\times 1} = 210$$
2. Événement contraire $\\overline{E}$ (« aucune boule blanche », donc 4 boules noires parmi les 7) :
   $$\\text{Card}(\\overline{E}) = C_7^4 = C_7^3 = \\frac{7 \\times 6 \\times 5}{3 \\times 2 \\times 1} = 35$$
3. Déduction immédiate :
   $$\\text{Card}(E) = 210 - 35 = 175$$`,
    astuce: 'Dès que vous voyez les mots « AU MOINS UN » sur la feuille d\'examen du Bac, écrivez immédiatement au brouillon : Contraire = AUCUN ! Cela vous évite les erreurs de sommation.',
    wolof: '« Boo gisee « au moins benn » ci sujet Bac bi, bul calculé 1 boule + 2 boules + 3 boules ! Dafa gudd tey indi njuumte. Jëlal Total bi dindi ci « benn boule amul » (contraire bi). Ci 2 lignes nga koy régler ! »',
    vieReelle: 'Au contrôle de police sur l\'autoroute à péage de Dakar : pour savoir si un car « Ndiaga Ndiaye » contient au moins un passager sans carte d\'identité, il suffit de vérifier le cas contraire où tout le monde a sa pièce. Si ce n\'est pas le cas, le car est en infraction !',
  },
  {
    num: 3,
    title: "Tirages Bicolores et Tricolores (Contraintes Simultanées)",
    icon: 'rigueur_compas' as const,
    when: "Pour dénombrer des tirages avec composition imposée (ex : « exactement 2 rouges et 1 verte »)",
    formule: `**Principe multiplicatif sur les catégories indépendantes :**

Soit une urne contenant $n_R$ boules rouges, $n_V$ boules vertes et $n_B$ boules blanches.
On tire simultanément $p_R + p_V + p_B$ boules.

**Nombre de tirages contenant exactement $p_R$ rouges, $p_V$ vertes et $p_B$ blanches :**
$$N = C_{n_R}^{p_R} \\times C_{n_V}^{p_V} \\times C_{n_B}^{p_B}$$

**Attention au tirage successif : Facteur d'ordre obligatoire !**
Si le tirage est **successif sans remise**, il faut multiplier par le nombre d'emplacements possibles des couleurs :
$$N = \\frac{p!}{p_R! \\times p_V! \\times p_B!} \\times A_{n_R}^{p_R} \\times A_{n_V}^{p_V} \\times A_{n_B}^{p_B}$$`,
    exemple: `Une classe de Terminale S2 comprend 12 garçons et 18 filles. On forme une commission de 4 élèves.

1. **Exactement 2 garçons et 2 filles (simultané) :**
   $$N_1 = C_{12}^2 \\times C_{18}^2 = 66 \\times 153 = 10\\,098$$
2. **Commission unicolore (que des garçons OU que des filles) :**
   $$N_2 = C_{12}^4 + C_{18}^4 = 495 + 3\\,060 = 3\\,555$$
3. **Au moins une fille dans la commission :**
   $$N_3 = C_{30}^4 - C_{12}^4 = 27\\,405 - 495 = 26\\,910$$`,
    astuce: 'ET signifie MULTIPLICATION (×). OU signifie ADDITION (+). « 2 garçons ET 2 filles » → C₁₂² × C₁₈². « Que des garçons OU que des filles » → C₁₂⁴ + C₁₈⁴.',
    wolof: '« Règle d\'or bi ci dénombrement : « AK » (et) dafay multiplier (×) ; « WALLA » (ou) dafay additionner (+). Boo bëggee 2 garçons AK 2 filles, ngay def C_12^2 × C_18^2 ! »',
    vieReelle: 'Composition du gouvernement ou d\'une commission à l\'Assemblée Nationale du Sénégal : respecter la loi sur la parité homme-femme impose exactement ce type de tirage bicolore paritaire.',
  },
  {
    num: 4,
    title: "Permutations avec Répétitions & Anagrammes",
    icon: 'technique_outils' as const,
    when: "Pour trouver le nombre d'anagrammes d'un mot ou d'arrangements de jetons indiscernables",
    formule: `**Formule multinomiale des permutations avec répétitions :**

Soit une collection de $n$ objets comprenant $n_1$ objets identiques de type 1, $n_2$ de type 2, ..., $n_k$ de type $k$, avec :
$$n_1 + n_2 + \\dots + n_k = n$$

**Le nombre de permutations distinctes est donné par :**
$$N = \\frac{n!}{n_1! \\times n_2! \\times \\dots \\times n_k!}$$`,
    exemple: `1. **Nombre d'anagrammes du mot « DAKAR » :**
   - Nombre total de lettres : $n = 5$.
   - La lettre « A » apparaît $n_A = 2$ fois ; D, K, R apparaissent 1 fois.
   $$N = \\frac{5!}{2! \\times 1! \\times 1! \\times 1!} = \\frac{120}{2} = 60$$

2. **Nombre d'anagrammes du mot « SENEGAL » :**
   - Total : $n = 7$ lettres.
   - La lettre « E » apparaît 2 fois.
   $$N = \\frac{7!}{2!} = \\frac{5\\,040}{2} = 2\\,520$$

3. **Nombre d'anagrammes du mot « MISSISSIPPI » :**
   - Total : 11 lettres (1 M, 4 I, 4 S, 2 P).
   $$N = \\frac{11!}{1! \\times 4! \\times 4! \\times 2!} = \\frac{39\\,916\\,800}{24 \\times 24 \\times 2} = 34\\,650$$`,
    astuce: 'Pour les anagrammes, comptez d\'abord le total des lettres pour le numérateur n!. Au dénominateur, mettez la factorielle du nombre de répétitions de chaque lettre répétée.',
    wolof: '« Boo bëggee xam ñaata anagrammes la benn baat am (naka DAKAR) : bindal ci kaw total lettres yi en factorielle (5!), te nga divisé ko ci factorielle lettres yu répéter yi ci suuf (2! pour ñaari A yi). 120 / 2 = 60 ! »',
    vieReelle: 'Génération de plaques d\'immatriculation ou de codes de confirmation SMS par les opérateurs télécoms (Sonatel, Free) : le calcul des combinaisons possibles permet de dimensionner les serveurs et la durée de validité des codes.',
  },
  {
    num: 5,
    title: "Le Triangle de Pascal & La Formule du Binôme de Newton",
    icon: 'cible_reflexe' as const,
    when: "Pour développer (a + b)ⁿ ou calculer des sommes de combinaisons au Bac S2",
    formule: `**La Formule du Binôme de Newton :**
Pour tous réels ou complexes $a$ et $b$ et tout entier $n \\ge 1$ :
$$(a + b)^n = \\sum_{k=0}^n C_n^k a^{n-k} b^k = C_n^0 a^n + C_n^1 a^{n-1}b + C_n^2 a^{n-2}b^2 + \\dots + C_n^n b^n$$

**Propriétés capitales des sommes de combinaisons :**
1. **Somme de tous les coefficients de la ligne $n$ :**
   $$\\sum_{k=0}^n C_n^k = C_n^0 + C_n^1 + C_n^2 + \\dots + C_n^n = 2^n \\quad \\text{(en posant } a = b = 1\\text{)}$$
2. **Somme alternée :**
   $$\\sum_{k=0}^n (-1)^k C_n^k = C_n^0 - C_n^1 + C_n^2 - \\dots + (-1)^n C_n^n = 0 \\quad \\text{(en posant } a = 1, \\; b = -1\\text{)}$$
3. **Nombre de parties d'un ensemble à $n$ éléments :**
   $$\\text{Card}(\\mathcal{P}(E)) = 2^n$$`,
    exemple: `1. **Développer $(x + 2)^4$ par le triangle de Pascal :**
   Ligne $n = 4$ du triangle : $1 \\quad 4 \\quad 6 \\quad 4 \\quad 1$
   $$(x + 2)^4 = 1 \\cdot x^4 + 4 \\cdot x^3(2) + 6 \\cdot x^2(2^2) + 4 \\cdot x(2^3) + 1 \\cdot (2^4)$$
   $$(x + 2)^4 = x^4 + 8x^3 + 24x^2 + 32x + 16$$

2. **Calculer la somme $S = C_8^0 + C_8^1 + C_8^2 + \\dots + C_8^8$ :**
   $$S = 2^8 = 256$$`,
    astuce: 'Pour retrouver une ligne du triangle de Pascal au brouillon en 10 secondes : chaque case est la somme de celle du dessus et de celle au-dessus à gauche. C₃¹ + C₃² = C₄² (3 + 3 = 6).',
    wolof: '« Binôme de Newton dafa melni escalier u Pascal : boo bëggee développer (a + b)⁴, coefficients yi dañuy juddoo ci 1 - 4 - 6 - 4 - 1. Te li gën a am solo : somme bi yépp ci ligne n mooy 2ⁿ ! »',
    vieReelle: 'En génétique mendélienne au Sénégal (hérédité de la drépanocytose par exemple) : la probabilité qu\'un couple hétérozygote transmette l\'allèle sain ou muté à leurs enfants suit exactement la distribution binomiale issue du binôme de Newton.',
  },
];

export default function DenombrementReflexesCard() {
  const [activeTab, setActiveTab] = useState(1);
  const currentMethode = DENOMBREMENT_METHODES.find((m) => m.num === activeTab) || DENOMBREMENT_METHODES[0];

  return (
    <section className="bg-white rounded-3xl border-2 border-turquoise/20 p-5 sm:p-7 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy/10 pb-4 mb-6">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-turquoise/15 text-turquoise flex items-center justify-center shrink-0 p-2">
            <StudyIcon name="cible_reflexe" size={24} />
          </div>
          <div>
            <span className="text-[11px] font-black uppercase tracking-wider text-turquoise">
              Fiches Réflexes Bac S2
            </span>
            <h3 className="font-extrabold text-navy text-lg sm:text-xl leading-tight">
              M11 : Les 5 Méthodes d&apos;Or du Dénombrement
            </h3>
          </div>
        </div>
        <span className="text-xs font-bold text-navy/60 bg-surface px-3 py-1.5 rounded-xl border border-navy/10 self-start sm:self-auto">
          Programme Officiel Sénégal
        </span>
      </div>

      {/* Navigation Onglets */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-6 scrollbar-thin">
        {DENOMBREMENT_METHODES.map((m) => {
          const isActive = m.num === activeTab;
          return (
            <button
              key={m.num}
              onClick={() => setActiveTab(m.num)}
              className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                isActive
                  ? 'bg-navy text-white shadow-sm'
                  : 'bg-surface text-navy/70 hover:bg-turquoise/10 hover:text-navy border border-navy/5'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-lg flex items-center justify-center text-[10px] font-black ${
                  isActive ? 'bg-turquoise text-navy' : 'bg-navy/10 text-navy'
                }`}
              >
                {m.num}
              </span>
              <span>Méthode {m.num}</span>
            </button>
          );
        })}
      </div>

      {/* Contenu Méthode */}
      <div className="space-y-5 animate-in fade-in duration-200">
        {/* Titre & Déclencheur */}
        <div className="bg-surface rounded-2xl p-4 sm:p-5 border border-navy/5">
          <div className="flex items-center gap-2 text-turquoise mb-1.5">
            <StudyIcon name={currentMethode.icon} size={20} />
            <span className="text-xs font-bold uppercase tracking-wider">
              Quand dégainer ce réflexe ?
            </span>
          </div>
          <h4 className="text-base sm:text-lg font-black text-navy mb-2">
            {currentMethode.title}
          </h4>
          <p className="text-xs sm:text-sm text-text/80 leading-relaxed font-medium">
            🎯 {currentMethode.when}
          </p>
        </div>

        {/* Formule & Cours */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-navy/10 shadow-xs">
          <span className="text-xs font-bold uppercase tracking-wider text-navy/50 block mb-3">
            Formule &amp; Règle Mathématique :
          </span>
          <MathRenderer content={currentMethode.formule} />
        </div>

        {/* Exemple Type Résolu */}
        <div className="bg-navy/5 rounded-2xl p-4 sm:p-5 border border-navy/10">
          <span className="text-xs font-bold uppercase tracking-wider text-navy/70 block mb-2">
            Exemple Concret Type Bac S2 :
          </span>
          <MathRenderer content={currentMethode.exemple} />
        </div>

        {/* Astuce Clé */}
        <div className="bg-emerald-50 rounded-2xl p-4 border border-emerald-200 text-xs sm:text-sm text-emerald-950 flex items-start gap-3">
          <div className="text-emerald-700 shrink-0 mt-0.5">
            <StudyIcon name="ampoule_astuce" size={20} />
          </div>
          <div>
            <strong className="font-bold text-emerald-900 block mb-0.5">
              Astuce Gain de Temps Bac S2 :
            </strong>
            <span>{currentMethode.astuce}</span>
          </div>
        </div>

        {/* Xam-xam ci Wolof */}
        <div className="bg-amber-500/10 rounded-2xl p-4 border border-amber-500/20 text-xs sm:text-sm text-amber-950 flex items-start gap-3">
          <span className="text-lg shrink-0 mt-0.5">🇸🇳</span>
          <div>
            <strong className="font-bold text-amber-900 block mb-0.5">
              Xam-xam ci Wolof :
            </strong>
            <p className="italic text-amber-950/90 leading-relaxed">
              {currentMethode.wolof}
            </p>
          </div>
        </div>

        {/* Illustration Vie Réelle */}
        <div className="bg-indigo-50 rounded-2xl p-4 border border-indigo-200 text-xs sm:text-sm text-indigo-950 flex items-start gap-3">
          <span className="text-lg shrink-0 mt-0.5">🌍</span>
          <div>
            <strong className="font-bold text-indigo-900 block mb-0.5">
              Illustration Concrète au Sénégal :
            </strong>
            <p className="text-indigo-900/90 leading-relaxed">
              {currentMethode.vieReelle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

