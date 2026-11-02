'use client';

import React, { useState } from 'react';
import StudyIcon from '@/components/ui/study-icon';
import MathRenderer from '@/components/course/math-renderer';

const PROBABILITES_METHODES = [
  {
    num: 1,
    title: "Les 3 Modèles de Tirages & Équiprobabilité",
    icon: 'theoreme_equerre' as const,
    when: "Dès la première ligne de l'énoncé d'un problème d'urne, de cartes ou de billes",
    formule: `**Arbre de décision immédiat :**

1. **Simultané (« en même temps ») :**
   $$\\text{Card}(\\Omega) = C_n^p = \\binom{n}{p} = \\dfrac{n!}{p!(n-p)!}$$
   *(L'ordre ne compte pas, pas de répétition)*.
2. **Successif SANS remise :**
   $$\\text{Card}(\\Omega) = A_n^p = \\dfrac{n!}{(n - p)!}$$
   *(L'ordre compte, pas de répétition)*.
3. **Successif AVEC remise :**
   $$\\text{Card}(\\Omega) = n^p$$
   *(L'ordre compte, répétition possible)*.

**Probabilité d'un événement A :**
$$P(A) = \\dfrac{\\text{Card}(A)}{\\text{Card}(\\Omega)}$$`,
    exemple: `Une urne contient 4 boules blanches et 6 boules noires. On tire 3 boules simultanément.
Calculer la probabilité d'obtenir exactement 2 blanches et 1 noire :

1. Nombre total de tirages possibles :
   $$\\text{Card}(\\Omega) = C_{10}^3 = \\dfrac{10 \\times 9 \\times 8}{3 \\times 2 \\times 1} = 120$$
2. Nombre de cas favorables à l'événement $A$ :
   $$\\text{Card}(A) = C_4^2 \\times C_6^1 = 6 \\times 6 = 36$$
3. Probabilité :
   $$P(A) = \\dfrac{36}{120} = \\dfrac{3}{10} = 0,3$$`,
    astuce: 'Pour les combinaisons C_n^p : simplifiez toujours mentalement les facteurs. Exemple : C₁₀³ = (10 × 9 × 8)/(3 × 2 × 1) = 10 × 3 × 4 = 120. Cela prend 5 secondes sans calculatrice.',
    wolof: '« Boo gisee problème d\'urne ci Bac : faw nga xam ndax ci benn yoon lañu koy jëlee (C_n^p simultané), walla kenn ci ginaaw kenn te koo jël du dellu (A_n^p arrangement), walla da ngay dellodi (n^p p-liste). Équiprobabilité mooy : li ngay wër ci kaw, lepp lu mën a am ci suuf ! »',
    vieReelle: 'C\'est comme préparer les lots d\'un tirage de Tombola ou de bourse scolaire : quand on tire 3 boursiers au hasard d\'un seul coup dans une urne, c\'est C_10^3 car ils partent tous avec la même bourse sans préséance.',
  },
  {
    num: 2,
    title: "Le Réflexe de l'Événement Contraire : « Au moins un »",
    icon: 'technique_outils' as const,
    when: "Dès que la question contient « obtenir au moins un... » ou « au moins une boule blanche »",
    formule: `**Règle d'or absolue au Bac S2 :**
Pour tout événement $A$ :
$$P(A) = 1 - P(\\overline{A})$$

En particulier :
$$P(\\text{« Obtenir au moins un élément X »}) = 1 - P(\\text{« N'obtenir aucun élément X »})$$

- Calculer directement $P(A)$ obligerait à faire la somme : 1 élément + 2 éléments + 3 éléments...
- Le passage par le contraire ne nécessite **qu'un seul calcul direct** !`,
    exemple: `Dans une urne de 4 blanches et 6 noires, on tire simultanément 3 boules.
Calculer la probabilité de l'événement $B$ : « Obtenir au moins une boule blanche » :

1. L'événement contraire $\\overline{B}$ est : « N'obtenir aucune boule blanche » (soit tirer 3 boules noires parmi les 6).
2. Calcul de $P(\\overline{B})$ :
   $$P(\\overline{B}) = \\dfrac{C_6^3}{C_{10}^3} = \\dfrac{20}{120} = \\dfrac{1}{6}$$
3. Déduction immédiate de $P(B)$ :
   $$P(B) = 1 - P(\\overline{B}) = 1 - \\dfrac{1}{6} = \\dfrac{5}{6}$$`,
    astuce: 'Si un élève calcule P(1 blanche) + P(2 blanches) + P(3 blanches), il risque 3 fois plus d\'erreurs de calcul qu\'en écrivant simplement 1 - P(0 blanche).',
    wolof: '« Kàddu gii di « au moins benn » mooy piège bi gën a rëy ci probabilités. Bu ko calculer d\'une manière directe ndax da ngay jaxaso ci calculs yi ! Jëlandikool 1 - P(benna amul), mu leer nàññ te jox la points yi sans faute ! »',
    vieReelle: 'Si vous voulez savoir la probabilité qu\'au moins un Car Rapide passe dans les 15 minutes sur l\'avenue Malick Sy, il est infiniment plus facile de calculer la chance qu\'AUCUN bus ne passe (0 bus) et de la retrancher à 100% !',
  },
  {
    num: 3,
    title: "Probabilités Totales & Arbre Pondéré",
    icon: 'rigueur_compas' as const,
    when: "Quand une épreuve dépend de résultats antérieurs ou d'un test médical/machine",
    formule: `**Formule des probabilités totales pour une partition $\\{B, \\overline{B}\\}$ :**
$$P(A) = P(A \\cap B) + P(A \\cap \\overline{B}) = P(B) \\cdot P_B(A) + P(\\overline{B}) \\cdot P_{\\overline{B}}(A)$$

**Règles d'or de l'arbre pondéré :**
1. La somme des probabilités issues d'un même nœud vaut **toujours 1** :
   $$P(B) + P(\\overline{B}) = 1 \\qquad P_B(A) + P_B(\\overline{A}) = 1$$
2. La probabilité d'un chemin est le **produit** des probabilités des branches qui le composent :
   $$P(B \\cap A) = P(B) \\times P_B(A)$$`,
    exemple: `Dans une usine, la machine $M_1$ produit 60% des pièces ($P(M_1) = 0,6$) et la machine $M_2$ en produit 40% ($P(M_2) = 0,4$).
Le taux de pièces défectueuses $D$ est de 2% pour $M_1$ et de 5% pour $M_2$.
Calculer la probabilité qu'une pièce prise au hasard soit défectueuse :

D'après la formule des probabilités totales :
$$P(D) = P(M_1 \\cap D) + P(M_2 \\cap D) = P(M_1) \\cdot P_{M_1}(D) + P(M_2) \\cdot P_{M_2}(D)$$
$$P(D) = (0,60 \\times 0,02) + (0,40 \\times 0,05) = 0,012 + 0,020 = 0,032 = 3,2\\%$$`,
    astuce: 'Pour calculer la probabilité a posteriori P_D(M₁) (formule de Bayes) : divisez simplement la branche M₁∩D par la probabilité totale P(D) calculée à la question précédente : 0,012 / 0,032 = 3/8 = 37,5%.',
    wolof: '« Garabu probabilités (arbre pondéré) dafa am ñaari règle yu am solo : bantam yépp yu bokk benn bopp dañuy dajale doon 1. Boo bëggee xam chemin yépp, da ngay multiplier probabilités yi ci branche yi. Formule des probabilités totales mooy dajale branches yépp ! »',
    vieReelle: 'Dans une clinique à Dakar recevant des tests de dépistage du paludisme : on calcule la probabilité globale d\'avoir un test positif en pondérant les patients venant de zones à haut risque et ceux venant de zones à faible risque par l\'arbre de décision.',
  },
  {
    num: 4,
    title: "Variable Aléatoire & Loi Binomiale ℬ(n, p)",
    icon: 'cle_solution' as const,
    when: "Dès que l'on répète n fois de manière indépendante une épreuve à deux issues (Succès/Échec)",
    formule: `**Formule de la loi binomiale $\\mathcal{B}(n, p)$ :**
La variable $X$ compte le nombre de succès parmi les $n$ répétitions :
$$P(X = k) = C_n^k \\cdot p^k \\cdot (1 - p)^{n - k} \\quad (k \\in \\{0, 1, \\dots, n\\})$$

**Indicateurs fondamentaux :**
- **Espérance mathématique :** $E(X) = n \\cdot p$
- **Variance :** $V(X) = n \\cdot p \\cdot (1 - p)$
- **Écart-type :** $\\sigma(X) = \\sqrt{V(X)}$`,
    exemple: `On lance 5 fois de suite une pièce équilibrée ($p = 0,5$). Soit $X$ le nombre de « Face » obtenus.
Calculer la probabilité d'obtenir exactement 3 fois « Face » :

$X$ suit la loi binomiale $\\mathcal{B}(5; 0,5)$ :
$$P(X = 3) = C_5^3 \\cdot (0,5)^3 \\cdot (1 - 0,5)^{5 - 3} = 10 \\cdot (0,5)^3 \\cdot (0,5)^2 = 10 \\cdot (0,5)^5$$
$$P(X = 3) = 10 \\times \\dfrac{1}{32} = \\dfrac{10}{32} = \\dfrac{5}{16} = 0,3125$$
Espérance : $E(X) = 5 \\times 0,5 = 2,5$ (en moyenne 2,5 Faces sur 5 lancers).`,
    astuce: 'N\'oubliez jamais le coefficient binomial C_n^k devant la probabilité ! Il correspond au nombre d\'ordres possibles des k succès parmi les n tirages.',
    wolof: '« Loi Binomiale B(n, p) dafa melni pénalty ci football : da ngay tiroor n yoon ci anam bu indépendant. Ci chaque tir am nga chance p (succès). B(n, p) da lay wax exactement chance nga dugal k but. C_n^k moo wax naka ngay séddalee buts yi ci diggante tirs yi ! »',
    vieReelle: 'Imaginez une séance de 5 tirs au but lors d\'une finale de Coupe du Sénégal : si le tireur a 80% de réussite à chaque tir (p = 0,8), la loi binomiale B(5; 0,8) calcule précisément la probabilité qu\'il réussisse exactement 4 tirs sur les 5.',
  },
];

export default function ProbabilitesReflexesCard() {
  const [activeTab, setActiveTab] = useState(0);
  const current = PROBABILITES_METHODES[activeTab];

  return (
    <div className="bg-white rounded-2xl border border-navy/10 p-5 sm:p-6 shadow-sm space-y-6">
      {/* Header Responsive */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy/10 pb-4">
        <div className="flex items-start sm:items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-turquoise/15 flex items-center justify-center text-turquoise shrink-0 mt-0.5 sm:mt-0 p-1.5">
            <StudyIcon name="theoreme_equerre" size={24} />
          </div>
          <div className="min-w-0">
            <h3 className="font-bold text-navy text-base sm:text-lg leading-tight break-words">
              Fiches Réflexes Bac S2 : Dénombrement &amp; Probabilités
            </h3>
            <p className="text-xs text-text/60 mt-1 leading-snug">
              Les 4 automatismes indispensables pour réussir l&apos;exercice de probabilités au Baccalauréat
            </p>
          </div>
        </div>
        <span className="self-start sm:self-center text-xs font-semibold px-2.5 py-1 rounded-full bg-navy/5 text-navy border border-navy/10 shrink-0 whitespace-nowrap">
          Méthode {activeTab + 1} / {PROBABILITES_METHODES.length}
        </span>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {PROBABILITES_METHODES.map((m, idx) => {
          const isActive = activeTab === idx;
          return (
            <button
              key={m.num}
              onClick={() => setActiveTab(idx)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 ${
                isActive
                  ? 'border-turquoise bg-turquoise/10 shadow-sm'
                  : 'border-navy/10 hover:border-navy/20 bg-surface/50'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                    isActive ? 'bg-turquoise text-white' : 'bg-navy/10 text-navy/70'
                  }`}
                >
                  R{m.num}
                </span>
                <StudyIcon
                  name={m.icon}
                  size={16}
                  className={isActive ? 'text-turquoise' : 'text-text/40'}
                />
              </div>
              <p
                className={`text-xs font-bold leading-snug line-clamp-2 ${
                  isActive ? 'text-navy' : 'text-text/80'
                }`}
              >
                {m.title}
              </p>
            </button>
          );
        })}
      </div>

      {/* Content panel */}
      <div className="space-y-4 bg-surface rounded-xl p-5 border border-navy/5">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-navy/10 flex items-center justify-center text-navy shrink-0 mt-0.5">
            <StudyIcon name="cible_reflexe" size={18} />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-text/50">
              Quand l&apos;appliquer au Bac ?
            </h4>
            <p className="text-sm font-medium text-navy mt-0.5">{current.when}</p>
          </div>
        </div>

        {/* Formula Box */}
        <div className="bg-white rounded-xl p-4 border border-navy/10 shadow-sm">
          <h4 className="text-xs font-bold uppercase tracking-wider text-turquoise mb-2 flex items-center gap-1.5">
            <StudyIcon name="formule_cle" size={16} />
            Formule &amp; Règle d&apos;or de dénombrement
          </h4>
          <div className="text-sm text-navy/90 leading-relaxed overflow-x-auto">
            <MathRenderer content={current.formule} />
          </div>
        </div>

        {/* Example Box */}
        <div className="bg-white rounded-xl p-4 border border-navy/10 shadow-sm">
          <h4 className="text-xs font-bold uppercase tracking-wider text-navy mb-2 flex items-center gap-1.5">
            <StudyIcon name="exercice_crayon" size={16} />
            Exemple type corrigé pas à pas
          </h4>
          <div className="text-sm text-navy/90 leading-relaxed overflow-x-auto">
            <MathRenderer content={current.exemple} />
          </div>
        </div>

        {/* Exam Tip */}
        <div className="bg-amber-50 rounded-xl p-3.5 border border-amber-200/80 flex items-start gap-2.5">
          <div className="shrink-0 mt-0.5">
            <StudyIcon name="ampoule_astuce" size={18} className="text-amber-600" />
          </div>
          <p className="text-xs text-amber-900 leading-relaxed font-medium">
            <strong className="font-bold">Conseil du Correcteur Bac :</strong> {current.astuce}
          </p>
        </div>

        {/* Décodage en Wolof */}
        <div className="bg-amber-500/10 rounded-xl p-3 border border-amber-500/25 text-xs text-amber-950">
          <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
            <span>🇸🇳</span>
            <span>Xam-xam ci Wolof (Décodage) :</span>
          </div>
          <p className="italic text-amber-900 leading-relaxed font-medium">
            {current.wolof}
          </p>
        </div>

        {/* Illustration de la Vie Réelle */}
        <div className="bg-indigo-50/90 rounded-xl p-3 border border-indigo-200 text-xs text-indigo-950">
          <div className="flex items-center gap-1.5 font-bold text-indigo-900 mb-1">
            <span>🌍</span>
            <span>Illustration Concrète au Sénégal :</span>
          </div>
          <p className="text-indigo-900 leading-relaxed">
            {current.vieReelle}
          </p>
        </div>
      </div>
    </div>
  );
}

