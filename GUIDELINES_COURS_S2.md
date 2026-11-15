# Protocole et Normes d'Excellence Pédagogique — Terminale S2 (Al Muxtaar Société)

Ce document constitue la charte de référence absolue pour l'implémentation, la révision et la validation de chaque chapitre et leçon de Mathématiques, Physique-Chimie et SVT pour la plateforme Al Muxtaar Société.

---

## 1. Règle d'Or : Routage 100% Infaillible & Isolation des Cours
1. **Priorité absolue aux Identifiants Uniques (UUIDs)** :
   - Chaque chapitre et chaque leçon dispose d'un identifiant immuable dans `lib/curriculum/physique-chimie-data.ts`, `mathematiques-data.ts` et `svt-data.ts`.
   - Le routeur (`getEnhancedLessonContent` dans `lib/courses/lessons-content.ts` et les gardes booléennes dans `page.tsx`) DOIT vérifier d'abord les UUIDs précis (`params.lesson` et `params.chapter`) avant toute déduction textuelle.
2. **Interdiction Formelle des Sous-chaînes Courtes / Non Délimitées** :
   - Ne JAMAIS utiliser de sous-chaînes de moins de 4 caractères sans délimiteur de mot (`\b` ou égalité stricte).
   - Exemples de pièges formellement proscrits :
     - `'amp'` (intercepte « champ », « amplitude », « ampère » et détruit les cours de Physique P3, P4, P5, P6, P7, P8 en les redirigeant vers B4 SVT).
     - `'soi'` (intercepte « besoin », « soir »).
     - `'tir'` (intercepte « partir », « sortir », « attirer »).
     - `'exp'` (intercepte « expérience », « expression »).
     - `'p1'`, `'p2'`, `'b1'`, etc. isolés dans `includes()`.

---

## 2. Pédagogie & Clarté Rédactionnelle
1. **Adéquation Totale avec le Programme Officiel MEN / IGEF / Office du Bac S2** :
   - Le cours doit aborder les théorèmes fondamentaux, les démonstrations requises au Bac, les conditions de validité et les grandeurs physiques/chimiques/biologiques exactes.
2. **Démarche Didactique Progressive** :
   - Introduction concrète & objectifs Bac.
   - Système étudié, référentiel, repère d'espace et de temps, conditions initiales.
   - Démonstration analytique claire étape par étape.
   - Fiche réflexes de synthèse avec les erreurs éliminatoires à éviter.
3. **Sobriété Visuelle — Réduction Drastique des Icônes** :
   - Pas d'accumulation d'icônes gadgets.
   - Utiliser au maximum des encadrés textuels épurés avec bordures fines et typographie soignée :
     - Encadré Définition / Théorème (bleu marine / indigo sobre).
     - Encadré Piège Bac S2 (rouge brique sobre).
     - Encadré Méthode & Réflexe (turquoise sobre).
     - Encadré Culturel / Wolof (ambre sobre).

---

## 3. Rigueur Mathématique & Rendu KaTeX
1. **Notation Scientifique Conventionnelle** :
   - Vecteurs systématiquement dotés de leur flèche : $\vec{v}$, $\vec{a}$, $\vec{g}$, $\vec{P}$, $\vec{F}$, $\vec{E}$, $\vec{B}$, $\vec{i}$, $\vec{j}$, $\vec{k}$.
   - Conditions initiales explicitées : $\vec{v}_0$, $v_{0x} = v_0 \cos\alpha$, $v_{0y} = v_0 \sin\alpha$.
   - Pas de symboles LaTeX bruts ou non fermés dans les blocs JSX.
2. **Responsivité des Équations** :
   - Les formules longues doivent être découpées ou placées dans un conteneur avec défilement horizontal (`overflow-x-auto`) pour éviter tout débordement sur écran mobile.

---

## 4. Laboratoires Interactifs Spécifiques
1. **Sur-mesure et non générique** :
   - Chaque laboratoire doit modéliser fidèlement la physique ou la chimie du chapitre (ex. : trajectoire balistique animée en temps réel avec vecteurs pour P3, courbe de résonance pour P8, courbe d'Aston pour P10).
2. **Expérience Utilisateur Mobile & Desktop** :
   - Contrôles tactiles intuitifs (sliders, boutons clairs).
   - Rendu SVG vectoriel dynamique net sur toutes résolutions d'écran.
   - Valeurs numériques calculées rigoureusement selon les lois physiques sans approximations fantaisistes.

---

## 5. Annales & Quiz Officiels du Baccalauréat Sénégalais
1. **Annales Authentiques** :
   - Exercices extraits des épreuves réelles du Baccalauréat S2 (Sénégal) des 15 dernières années.
   - Respect strict du libellé officiel et de la pagination de l'épreuve.
   - Corrigé pas à pas avec barème de notation officiel de l'Office du Bac.
2. **Quiz Ciblés** :
   - Questions à choix multiples mesurant la compréhension conceptuelle et les réflexes rapides indispensables pour l'épreuve.

---

## 6. Checklist de Validation Obligatoire Avant Livraison
- [ ] 1. Vérification de l'URL et correspondance 1:1 du contenu affiché (aucun cours parasité).
- [ ] 2. Absence totale de faux positifs dans le routeur de contenu.
- [ ] 3. Rendu LaTeX irréprochable (tous les vecteurs et symboles mathématiques sont bien affichés).
- [ ] 4. Suppression de toute icône superflue, interface épurée et lisible.
- [ ] 5. Laboratoire interactif fonctionnel et responsive (testé sur viewport mobile et desktop).
- [ ] 6. Annales Bac officielles et Quiz conformes au sujet exact de la leçon.
- [ ] 7. Exécution de `npm run build` : code de sortie 0 sans aucune erreur de compilation.
