import React from 'react';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import MathRenderer from '@/components/course/math-renderer';
import ExerciseCard from '@/components/course/exercise-card';
import QuizView from '@/components/course/quiz-view';
import Watermark from '@/components/course/watermark';
import Paywall from '@/components/course/paywall';
import LessonCompleteButton from '@/components/course/lesson-complete-button';
import { Button } from '@/components/ui/button';
import { getEnhancedLessonContent } from '@/lib/courses/lessons-content';
import {
  PHYSIQUE_CHIMIE_CHAPTERS,
  PHYSIQUE_CHIMIE_SUBJECT_ID,
  ensurePhysiqueChimieInDatabase,
} from '@/lib/curriculum/physique-chimie-data';
import {
  MATHEMATIQUES_CHAPTERS,
  MATHEMATIQUES_SUBJECT_ID,
  ensureMathematiquesInDatabase,
} from '@/lib/curriculum/mathematiques-data';
import InteractiveLimitSimulator from '@/components/course/interactive-limit-simulator';
import FormesIndetermineesCard from '@/components/course/formes-indeterminees-card';
import BacSenegalAnnales from '@/components/course/bac-senegal-annales';
import LimitesQuizEmbedded from '@/components/course/limites-quiz-embedded';
import TviQuizEmbedded from '@/components/course/tvi-quiz-embedded';
import TviReflexesCard from '@/components/course/tvi-reflexes-card';
import TviInteractiveSimulator from '@/components/course/tvi-interactive-simulator';
import DerivationReflexesCard from '@/components/course/derivation-reflexes-card';
import DerivationInteractiveSimulator from '@/components/course/derivation-interactive-simulator';
import DerivationQuizEmbedded from '@/components/course/derivation-quiz-embedded';
import AsymptotesReflexesCard from '@/components/course/asymptotes-reflexes-card';
import AsymptotesInteractiveSimulator from '@/components/course/asymptotes-interactive-simulator';
import AsymptotesQuizEmbedded from '@/components/course/asymptotes-quiz-embedded';
import SuitesReflexesCard from '@/components/course/suites-reflexes-card';
import SuitesInteractiveSimulator from '@/components/course/suites-interactive-simulator';
import SuitesQuizEmbedded from '@/components/course/suites-quiz-embedded';
import LogarithmeReflexesCard from '@/components/course/logarithme-reflexes-card';
import LogarithmeInteractiveSimulator from '@/components/course/logarithme-interactive-simulator';
import LogarithmeQuizEmbedded from '@/components/course/logarithme-quiz-embedded';
import ExponentielleReflexesCard from '@/components/course/exponentielle-reflexes-card';
import ExponentielleInteractiveSimulator from '@/components/course/exponentielle-interactive-simulator';
import ExponentielleQuizEmbedded from '@/components/course/exponentielle-quiz-embedded';
import PrimitivesReflexesCard from '@/components/course/primitives-reflexes-card';
import PrimitivesInteractiveSimulator from '@/components/course/primitives-interactive-simulator';
import PrimitivesQuizEmbedded from '@/components/course/primitives-quiz-embedded';
import EquadiffReflexesCard from '@/components/course/equadiff-reflexes-card';
import EquadiffInteractiveSimulator from '@/components/course/equadiff-interactive-simulator';
import EquadiffQuizEmbedded from '@/components/course/equadiff-quiz-embedded';
import ComplexesReflexesCard from '@/components/course/complexes-reflexes-card';
import ComplexesInteractiveSimulator from '@/components/course/complexes-interactive-simulator';
import ComplexesQuizEmbedded from '@/components/course/complexes-quiz-embedded';
import ProbabilitesReflexesCard from '@/components/course/probabilites-reflexes-card';
import ProbabilitesInteractiveSimulator from '@/components/course/probabilites-interactive-simulator';
import ProbabilitesQuizEmbedded from '@/components/course/probabilites-quiz-embedded';
import StatistiquesReflexesCard from '@/components/course/statistiques-reflexes-card';
import StatistiquesInteractiveSimulator from '@/components/course/statistiques-interactive-simulator';
import StatistiquesQuizEmbedded from '@/components/course/statistiques-quiz-embedded';
import GeometrieReflexesCard from '@/components/course/geometrie-reflexes-card';
import GeometrieInteractiveSimulator from '@/components/course/geometrie-interactive-simulator';
import GeometrieQuizEmbedded from '@/components/course/geometrie-quiz-embedded';
import CinetiqueReflexesCard from '@/components/course/cinetique-reflexes-card';
import CinetiqueInteractiveSimulator from '@/components/course/cinetique-interactive-simulator';
import CinetiqueQuizEmbedded from '@/components/course/cinetique-quiz-embedded';
import AlcoolsReflexesCard from '@/components/course/alcools-reflexes-card';
import AlcoolsInteractiveSimulator from '@/components/course/alcools-interactive-simulator';
import AlcoolsQuizEmbedded from '@/components/course/alcools-quiz-embedded';
import StudyIcon from '@/components/ui/study-icon';
import CourseProtectionGuard from '@/components/course/course-protection-guard';
import AudioCoachPlayer, { AudioChapter } from '@/components/course/audio-coach-player';

const ALCOOLS_AUDIO_CHAPTERS: AudioChapter[] = [
  {
    timeSeconds: 0,
    title: "1. Enjeux des Alcools au Bac S2 Sénégal",
    badge: "Introduction",
    icon: "cible_reflexe",
    textScript:
      "Bienvenue dans cette masterclass de Chimie Organique de Terminale S2. Les alcools sont incontournables au Baccalauréat sénégalais. Ils ouvrent la voie aux oxydations ménagées, aux déshydratations et aux réactions d'estérification.",
  },
  {
    timeSeconds: 45,
    title: "2. Les 3 Classes d'Alcools en 5 secondes",
    badge: "Méthode",
    icon: "theoreme_equerre",
    textScript:
      "Pour trouver la classe sans hésiter, fixez uniquement le carbone fonctionnel, celui qui porte le groupement O H. S'il est lié à un seul carbone ou aucun comme le méthanol, c'est la classe 1 primaire. S'il est lié à deux carbones, c'est la classe 2 secondaire. S'il est entouré de trois carbones, c'est la classe 3 tertiaire.",
  },
  {
    timeSeconds: 110,
    title: "3. Nomenclature UICPA sans aucune hésitation",
    badge: "Règle d'or",
    icon: "rigueur_compas",
    textScript:
      "Repérez la chaîne carbonée la plus longue qui contient obligatoirement le carbone fonctionnel. Numérotez pour donner à ce carbone le plus petit indice possible, même si les ramifications sont à l'autre bout. Le nom se termine toujours par le suffixe ol précédé de son numéro.",
  },
  {
    timeSeconds: 175,
    title: "4. Le secret des Liaisons Hydrogène",
    badge: "Physique",
    icon: "formule_cle",
    textScript:
      "Pourquoi l'éthanol bout-il à 78 degrés alors que le propane bout à moins 42 degrés ? C'est la question favorite du Bac ! Répondez toujours que la forte polarisation de la liaison O H crée des liaisons hydrogène intermoléculaires solides qui demandent un apport thermique important pour être dissociées.",
  },
  {
    timeSeconds: 235,
    title: "5. Le Test de Lucas au Laboratoire",
    badge: "Piège Bac",
    icon: "piege_bac",
    textScript:
      "Retenez les temps d'apparition du trouble laiteux avec le réactif de Lucas : immédiat en moins de 30 secondes pour un alcool tertiaire, environ 5 minutes pour un alcool secondaire, et aucun trouble à température ambiante pour un alcool primaire.",
  },
];

const CINETIQUE_AUDIO_CHAPTERS: AudioChapter[] = [
  {
    timeSeconds: 0,
    title: "1. Enjeux de la Cinétique Chimique au Bac S2",
    badge: "Introduction",
    icon: "cible_reflexe",
    textScript:
      "Bienvenue dans cette masterclass de Chimie Terminale S2. La cinétique chimique ouvre traditionnellement les épreuves du Baccalauréat au Sénégal. Maîtriser le calcul de la vitesse volumique et la lecture de tangente vous assure un maximum de points dès le premier exercice.",
  },
  {
    timeSeconds: 50,
    title: "2. Les 3 Facteurs Cinétiques Majeurs",
    badge: "Facteurs",
    icon: "eclair_reflexe",
    textScript:
      "Retenez les 3 facteurs cinétiques essentiels : la température, la concentration des réactifs, et la présence d'un catalyseur. Une hausse de température augmente la fréquence des chocs efficaces. Plus le milieu est concentré, plus les réactions se bousculent.",
  },
  {
    timeSeconds: 110,
    title: "3. Le Piège d'or du Catalyseur",
    badge: "Piège Bac",
    icon: "piege_bac",
    textScript:
      "Voici le piège classique des examinateurs du Bac sénégalais : un catalyseur accélère la vitesse de réaction, mais il ne change STRICTEMENT JAMAIS l'avancement maximal final x_max ! Il permet juste d'atteindre l'état final plus rapidement.",
  },
  {
    timeSeconds: 170,
    title: "4. La Trempe Chimique et le Dosage",
    badge: "Méthode",
    icon: "technique_outils",
    textScript:
      "Quand on dose le diiode à différentes dates t, pourquoi trempe-t-on dans l'eau glacée ? Parce que le dosage à la burette prend du temps ! Le froid et la dilution figent instantanément la réaction à vitesse nulle pour mesurer la composition exacte à l'instant t.",
  },
  {
    timeSeconds: 230,
    title: "5. Tangente et Temps de Demi-Réaction",
    badge: "Calcul",
    icon: "formule_cle",
    textScript:
      "Pour calculer la vitesse volumique v, tracez la tangente, calculez sa pente dx/dt et divisez obligatoirement par le volume total V de la solution. Et pour le temps de demi-réaction t1/2, projetez x_max divisé par 2 sur l'axe des temps.",
  },
];

const TVI_AUDIO_CHAPTERS: AudioChapter[] = [
  {
    timeSeconds: 0,
    title: "1. Enjeux du TVI au Bac S2",
    badge: "Méthode",
    icon: "cible_reflexe",
    textScript:
      "Dans cette leçon sur le Théorème des Valeurs Intermédiaires, retenez un point capital : au Baccalauréat sénégalais série S2, cette question constitue la charnière obligatoire entre la Partie A et la Partie B du grand problème d'analyse. Elle permet de trouver la racine alpha et d'en déduire le signe de la fonction pour la suite de l'épreuve.",
  },
  {
    timeSeconds: 45,
    title: "2. Les 3 Conditions de Rédaction",
    badge: "Rigueur",
    icon: "rigueur_compas",
    textScript:
      "Pour rédiger le théorème de la bijection sans perdre un seul point, vous devez obligatoirement citer les 3 conditions : premièrement, f est continue sur l'intervalle ; deuxièmement, f est strictement monotone ; troisièmement, 0 est compris entre les images des deux bornes.",
  },
  {
    timeSeconds: 110,
    title: "3. Le piège de la stricte monotonie",
    badge: "Piège Bac",
    icon: "piege_bac",
    textScript:
      "Voici le piège classique : si vous écrivez seulement que f est croissante au lieu de strictement croissante, vous perdez les points d'unicité ! C'est la stricte monotonie qui garantit que la courbe ne traverse l'axe qu'une seule et unique fois.",
  },
  {
    timeSeconds: 175,
    title: "4. Dresser le tableau de signe grâce à α",
    badge: "Technique",
    icon: "technique_outils",
    textScript:
      "Une fois alpha localisé, déduisez immédiatement le tableau de signe. Si f est strictement croissante, f est négative avant alpha et positive après alpha. Si f est décroissante, les signes s'inversent : positive avant alpha et négative après.",
  },
  {
    timeSeconds: 240,
    title: "5. Encadrement par balayage à 10⁻¹",
    badge: "Calculatrice",
    icon: "calculatrice",
    textScript:
      "Pour encadrer alpha à 10 puissance moins 1 près, utilisez le mode table de votre calculatrice. Calculez les images de dixième en dixième jusqu'à observer le changement de signe entre le négatif et le positif.",
  },
];

const DERIVATION_AUDIO_CHAPTERS: AudioChapter[] = [
  {
    timeSeconds: 0,
    title: "1. Enjeux de la Dérivation au Bac S2",
    badge: "Introduction",
    icon: "cible_reflexe",
    textScript:
      "La dérivation est le cœur battant du grand problème d'analyse au Bac S2. Elle permet de trouver les tangentes, les extremums et surtout de dresser le tableau de variation complet avec ses limites.",
  },
  {
    timeSeconds: 50,
    title: "2. Taux d'accroissement et demi-tangentes",
    badge: "Définition",
    icon: "formule_cle",
    textScript:
      "Pour étudier la dérivabilité en un point critique, calculez toujours la limite du taux d'accroissement. Si la limite est infinie, la fonction n'est pas dérivable mais la courbe possède une demi-tangente verticale.",
  },
  {
    timeSeconds: 115,
    title: "3. Le réflexe des composées exponentielles",
    badge: "Technique",
    icon: "technique_outils",
    textScript:
      "Attention aux dérivées composées ! Pour exponentielle de u de x, la dérivée est impérativement u prime de x fois exponentielle de u. N'oubliez jamais le u prime devant le terme.",
  },
  {
    timeSeconds: 175,
    title: "4. Tangentes et Extremums locaux",
    badge: "Rigueur",
    icon: "rigueur_compas",
    textScript:
      "L'équation de la tangente est y égal f prime de x zéro facteur de x moins x zéro plus f de x zéro. Et rappelez-vous : une tangente horizontale correspond exactement aux points où f prime s'annule.",
  },
  {
    timeSeconds: 235,
    title: "5. Convexité et points d'inflexion",
    badge: "Piège Bac",
    icon: "piege_bac",
    textScript:
      "Pour le point d'inflexion, ne vous arrêtez pas à f seconde s'annule. Vous devez impérativement justifier que la dérivée seconde change de signe pour valider l'inflexion de la courbe.",
  },
];

const ASYMPTOTES_AUDIO_CHAPTERS: AudioChapter[] = [
  {
    timeSeconds: 0,
    title: "1. Enjeux des Asymptotes au Bac S2",
    badge: "Méthode",
    icon: "cible_reflexe",
    textScript:
      "L'étude des branches infinies et des asymptotes est incontournable au Baccalauréat sénégalais. Elle donne la trajectoire de la courbe aux confins du repère et permet de tracer une représentation graphique rigoureuse.",
  },
  {
    timeSeconds: 45,
    title: "2. Asymptote Verticale et Horizontale",
    badge: "Définition",
    icon: "formule_cle",
    textScript:
      "Retenez la règle mnémotechnique : si la limite en un nombre donne l'infini, la droite est verticale d'équation x égal ce nombre. Si la limite à l'infini donne un nombre fini L, la droite est horizontale d'équation y égal L.",
  },
  {
    timeSeconds: 105,
    title: "3. La formule reine de l'Asymptote Oblique",
    badge: "Technique",
    icon: "technique_outils",
    textScript:
      "Pour prouver que la droite y égal ax plus b est asymptote oblique, vous devez calculer la limite quand x tend vers l'infini de f de x moins ax plus b entre parenthèses. Si cette limite est exactement zéro, l'asymptote est démontrée.",
  },
  {
    timeSeconds: 165,
    title: "4. Position Relative : Le signe de la différence",
    badge: "Rigueur",
    icon: "rigueur_compas",
    textScript:
      "Pour la position relative, étudiez toujours le signe de f de x moins l'équation de l'asymptote. Si la différence est positive, la courbe est au-dessus. Si elle est négative, la courbe est au-dessous.",
  },
  {
    timeSeconds: 230,
    title: "5. Branches Paraboliques : Ox ou Oy ?",
    badge: "Piège Bac",
    icon: "piege_bac",
    textScript:
      "Calculez la limite de f de x sur x. Si le résultat est l'infini, la courbe grimpe vite comme l'exponentielle : branche de direction Oy. Si le résultat est zéro, elle s'écrase comme le logarithme : branche de direction Ox.",
  },
];

const SUITES_AUDIO_CHAPTERS: AudioChapter[] = [
  {
    timeSeconds: 0,
    title: "1. Enjeux des Suites au Bac S2",
    badge: "Introduction",
    icon: "cible_reflexe",
    textScript:
      "Les suites numériques constituent un exercice incontournable du Baccalauréat sénégalais série S2. On y étudie systématiquement le sens de variation, la convergence et la limite par le théorème de convergence monotone.",
  },
  {
    timeSeconds: 50,
    title: "2. Raisonnement par Récurrence",
    badge: "Méthode",
    icon: "rigueur_compas",
    textScript:
      "Pour le raisonnement par récurrence, respectez toujours les trois étapes : initialisation au premier rang, hérédité en supposant que P de k est vraie pour un k fixé, et conclusion.",
  },
  {
    timeSeconds: 115,
    title: "3. Sens de Variation : Différence",
    badge: "Technique",
    icon: "technique_outils",
    textScript:
      "Pour montrer la monotonie d'une suite, calculez et étudiez toujours le signe de u indice n plus 1 moins u indice n. Si ce signe est positif, la suite est croissante.",
  },
  {
    timeSeconds: 175,
    title: "4. Théorème de Convergence Monotone",
    badge: "Rigueur",
    icon: "formule_cle",
    textScript:
      "Le théorème de convergence monotone prouve l'existence de la limite, mais ne donne pas sa valeur. Il faut ensuite résoudre l'équation de point fixe L égal f de L pour trouver la limite.",
  },
  {
    timeSeconds: 240,
    title: "5. Suite Auxiliaire Géométrique",
    badge: "Piège Bac",
    icon: "piege_bac",
    textScript:
      "Quand on pose v n égal u n moins alpha pour obtenir une suite géométrique, la raison q vérifie presque toujours la condition moins un inférieur à q inférieur à un. On conclut immédiatement que v n tend vers zéro.",
  },
];

const LOGARITHME_AUDIO_CHAPTERS: AudioChapter[] = [
  {
    timeSeconds: 0,
    title: "1. Enjeux du Logarithme au Bac S2",
    badge: "Introduction",
    icon: "cible_reflexe",
    textScript:
      "La fonction logarithme népérien est incontournable dans le grand problème d'analyse au Bac S2. Elle permet d'étudier des fonctions composées, de lever des formes indéterminées et de dresser le tableau de variations complet.",
  },
  {
    timeSeconds: 45,
    title: "2. Condition d'existence : u(x) > 0",
    badge: "Rigueur",
    icon: "rigueur_compas",
    textScript:
      "Dès la première question d'un problème comportant ln de u de x, posez immédiatement la condition stricte u de x strictement supérieur à zéro. Ne confondez pas avec la racine carrée qui accepte le zéro : le logarithme de zéro n'existe pas.",
  },
  {
    timeSeconds: 110,
    title: "3. Croissances Comparées Fondamentales",
    badge: "Technique",
    icon: "technique_outils",
    textScript:
      "Pour lever les indéterminations, retenez la règle d'or : en plus l'infini comme en zéro, les puissances de x l'emportent toujours sur le logarithme. Limite de ln de x sur x en plus l'infini vaut zéro, et limite de x fois ln de x en zéro plus vaut zéro.",
  },
  {
    timeSeconds: 175,
    title: "4. Dérivée Composite : u'/u",
    badge: "Formule",
    icon: "formule_cle",
    textScript:
      "La dérivée de ln de u est égale à u prime sur u. N'oubliez jamais la dérivée interne u prime au numérateur. Et si vous avez ln de A sur B, simplifiez d'abord en ln de A moins ln de B avant de dériver pour gagner du temps.",
  },
  {
    timeSeconds: 235,
    title: "5. Pièges des Équations Logarithmiques",
    badge: "Piège Bac",
    icon: "piege_bac",
    textScript:
      "Pour résoudre une équation logarithmique, déterminez toujours le domaine de validité avant toute manipulation algébrique. Si vous trouvez des solutions qui rendent l'expression sous le logarithme négative ou nulle, vous devez impérativement les éliminer.",
  },
];

const EXPONENTIELLE_AUDIO_CHAPTERS: AudioChapter[] = [
  {
    timeSeconds: 0,
    title: "1. Enjeux de l'Exponentielle au Bac S2",
    badge: "Introduction",
    icon: "cible_reflexe",
    textScript:
      "La fonction exponentielle est la fonction vedette du grand problème d'analyse au Bac S2. Elle intervient dans l'étude des variations, les asymptotes horizontales et le calcul d'aires par intégration.",
  },
  {
    timeSeconds: 45,
    title: "2. La Stricte Positivité : eᵘ > 0",
    badge: "Rigueur",
    icon: "rigueur_compas",
    textScript:
      "Retenez ce réflexe capital : pour tout réel x, l'exponentielle est strictement positive. Elle ne s'annule jamais et n'est jamais négative. Dans une dérivée, son signe ne change rien : seul le facteur qui l'accompagne détermine le signe.",
  },
  {
    timeSeconds: 110,
    title: "3. Croissances Comparées Fondamentales",
    badge: "Technique",
    icon: "technique_outils",
    textScript:
      "En plus l'infini, l'exponentielle écrase toutes les puissances de x : limite de e puissance x sur x puissance n vaut plus l'infini. En moins l'infini, l'exponentielle attire tout vers zéro : limite de x puissance n fois e puissance x vaut zéro.",
  },
  {
    timeSeconds: 175,
    title: "4. Dérivée Composite : u' · eᵘ",
    badge: "Formule",
    icon: "formule_cle",
    textScript:
      "La dérivée de e puissance u est u prime fois e puissance u. Attention aux signes : pour e puissance moins x, la dérivée est moins e puissance moins x. Pour un produit, appliquez toujours la formule u prime v plus u v prime avec rigueur.",
  },
  {
    timeSeconds: 235,
    title: "5. Changement de Variable : X = eˣ",
    badge: "Méthode",
    icon: "cle_solution",
    textScript:
      "Pour les équations du second degré avec e puissance 2x et e puissance x, posez immédiatement grand X égal e puissance x avec la condition grand X strictement positif. Éliminez impérativement toute racine négative ou nulle avant de prendre le logarithme.",
  },
];

const INTEGRATION_AUDIO_CHAPTERS: AudioChapter[] = [
  {
    timeSeconds: 0,
    title: "1. Enjeux du Calcul Intégral au Bac S2",
    badge: "Introduction",
    icon: "cible_reflexe",
    textScript:
      "Le calcul intégral et les primitives concluent traditionnellement le grand problème d'analyse du Bac S2. Ils permettent de calculer la valeur moyenne d'une fonction, d'encadrer une intégrale et de déterminer l'aire exacte délimitée par la courbe.",
  },
  {
    timeSeconds: 50,
    title: "2. Primitives Composées & Ajustement de Constante",
    badge: "Technique",
    icon: "technique_outils",
    textScript:
      "Avant de penser à l'intégration par parties, cherchez toujours les formes directes : u prime sur u qui donne ln de valeur absolue de u, u prime fois e puissance u qui donne e puissance u, ou u prime fois u puissance n. Multipliez ou divisez par une constante pour faire apparaître u prime.",
  },
  {
    timeSeconds: 115,
    title: "3. Intégration par Parties & Règle ALPES",
    badge: "Méthode",
    icon: "rigueur_compas",
    textScript:
      "Pour l'intégration par parties, appliquez la règle ALPES pour choisir v de x, la fonction que l'on dérive : priorité absolue au Logarithme, puis aux Polynômes, puis aux Exponentielles. Rédigez clairement les fonctions u, v, u prime et v prime.",
  },
  {
    timeSeconds: 180,
    title: "4. Calcul d'Aires et Unités Graphiques (cm²)",
    badge: "Piège Bac",
    icon: "piege_bac",
    textScript:
      "Attention au piège de l'unité graphique au Bac sénégalais ! Une unité d'aire vaut la norme du vecteur i multipliée par la norme du vecteur j en centimètres carrés. Si l'unité est 2 cm, une unité d'aire vaut 4 centimètres carrés !",
  },
  {
    timeSeconds: 245,
    title: "5. Relation de Chasles et Valeur Moyenne",
    badge: "Formule",
    icon: "formule_cle",
    textScript:
      "La relation de Chasles permet de découper une intégrale si la fonction change d'expression ou pour intégrer une valeur absolue. La valeur moyenne sur l'intervalle a b s'obtient en divisant l'intégrale par la longueur de l'intervalle b moins a.",
  },
];

const EQUADIFF_AUDIO_CHAPTERS: AudioChapter[] = [
  {
    timeSeconds: 0,
    title: "1. Enjeux des Équations Différentielles au Bac S2",
    badge: "Introduction",
    icon: "cible_reflexe",
    textScript:
      "Les équations différentielles représentent un carrefour fondamental entre les mathématiques et la physique au Bac S2. Qu'il s'agisse de la loi de refroidissement de Newton, de la décroissance radioactive ou des oscillateurs harmoniques, elles permettent de modéliser l'évolution d'un système.",
  },
  {
    timeSeconds: 45,
    title: "2. Premier Ordre : y' + ay = b et condition initiale",
    badge: "Méthode",
    icon: "rigueur_compas",
    textScript:
      "Pour résoudre y prime plus a y égal b, n'oubliez jamais l'addition de la solution particulière b sur a à la solution homogène C e puissance moins ax. La constante C se déduit immédiatement de la condition initiale donnée par l'énoncé.",
  },
  {
    timeSeconds: 110,
    title: "3. Oscillateur Harmonique : y'' + ω²y = 0",
    badge: "Technique",
    icon: "technique_outils",
    textScript:
      "Retenez la pulsation omega : la solution générale est A cosinus de omega x plus B sinus de omega x. Pour déterminer A et B, le sujet fournit deux conditions indispensables : la position initiale y de zéro et la vitesse initiale dérivée y prime de zéro.",
  },
  {
    timeSeconds: 175,
    title: "4. Second Ordre complet & Équation Caractéristique",
    badge: "Formule",
    icon: "theoreme_equerre",
    textScript:
      "Pour a y seconde plus b y prime plus c y égal zéro, écrivez sans hésiter l'équation caractéristique a r carré plus b r plus c égal zéro. Selon le signe du discriminant delta, les solutions seront deux exponentielles distinctes, une exponentielle avec polynôme du premier degré, ou des oscillations amorties.",
  },
  {
    timeSeconds: 235,
    title: "5. Pièges de Dérivation et Signes au Bac",
    badge: "Piège Bac",
    icon: "piege_bac",
    textScript:
      "Attention aux erreurs de signe classiques au Bac : pour y prime égale 3y, la solution est C e puissance plus 3x. Et lorsque vous dérivez A cos de omega x, n'oubliez pas le signe moins devant omega A sinus de omega x !",
  },
];

const COMPLEXES_AUDIO_CHAPTERS: AudioChapter[] = [
  {
    timeSeconds: 0,
    title: "1. Enjeux des Nombres Complexes au Bac S2",
    badge: "Introduction",
    icon: "cible_reflexe",
    textScript:
      "L'exercice sur les nombres complexes est noté sur 4 à 5 points au Baccalauréat sénégalais. C'est un exercice très méthodique où chaque formule bien appliquée garantit la totalité des points, depuis la résolution d'équation jusqu'à la nature des figures géométriques.",
  },
  {
    timeSeconds: 45,
    title: "2. Forme Algébrique, Module et Forme Exponentielle",
    badge: "Méthode",
    icon: "theoreme_equerre",
    textScript:
      "Retenez le passage instantané : le module r est la racine carrée de a carré plus b carré. L'argument thêta vérifie cosinus égal a sur r et sinus égal b sur r. Pour calculer les puissances z puissance n, passez immédiatement par la formule de Moivre avec r puissance n e puissance i n thêta.",
  },
  {
    timeSeconds: 110,
    title: "3. Équations du Second Degré et Racines Carrées",
    badge: "Technique",
    icon: "technique_outils",
    textScript:
      "Dans l'ensemble des complexes, un discriminant delta négatif donne deux racines complexes conjuguées avec i racine de valeur absolue de delta. Pour les racines carrées d'un nombre complexe X plus iY, posez le système fondamental x carré moins y carré et x carré plus y carré égal le module.",
  },
  {
    timeSeconds: 175,
    title: "4. Quotient d'Affixes et Triangles Particuliers",
    badge: "Rigueur",
    icon: "rigueur_compas",
    textScript:
      "Le quotient z C moins z A sur z B moins z A est l'arme maîtresse. Si ce quotient vaut i ou moins i, le triangle ABC est rectangle et isocèle en A. S'il vaut un demi plus ou moins i racine de 3 sur 2, le triangle est équilatéral. S'il est réel, les points sont alignés.",
  },
  {
    timeSeconds: 235,
    title: "5. Similitudes Directes : Centre, Rapport et Angle",
    badge: "Formule",
    icon: "cle_solution",
    textScript:
      "Pour z prime égal a z plus b, le rapport est le module de a, l'angle est l'argument de a, et le centre invariant oméga se calcule par b sur 1 moins a. Ne confondez pas avec une translation qui correspond au cas particulier où a vaut exactement 1.",
  },
];

const PROBABILITES_AUDIO_CHAPTERS: AudioChapter[] = [
  {
    timeSeconds: 0,
    title: "1. Enjeux du Dénombrement et Probabilités au Bac S2",
    badge: "Introduction",
    icon: "cible_reflexe",
    textScript:
      "L'exercice de probabilités au Baccalauréat sénégalais est un classique incontournable. Il teste votre capacité à identifier le bon modèle de tirage dès l'introduction, à manier l'arbre pondéré et à définir la loi d'une variable aléatoire.",
  },
  {
    timeSeconds: 45,
    title: "2. Les 3 Tirages Fondamentaux : Simultané, Sans Remise, Avec Remise",
    badge: "Méthode",
    icon: "theoreme_equerre",
    textScript:
      "Retenez immédiatement les mots-clés : simultanément signifie combinaison C n p sans ordre. Successivement sans remise signifie arrangement A n p avec ordre. Successivement avec remise signifie puissance n puissance p.",
  },
  {
    timeSeconds: 110,
    title: "3. L'Événement Contraire : « Au moins un »",
    badge: "Technique",
    icon: "technique_outils",
    textScript:
      "Dès que vous lisez 'obtenir au moins un', passez immédiatement par l'événement contraire 1 moins probabilité de zéro. Cela vous évite de calculer et d'additionner plusieurs probabilités avec des risques d'erreurs.",
  },
  {
    timeSeconds: 175,
    title: "4. Probabilités Conditionnelles et Formule des Probabilités Totales",
    badge: "Rigueur",
    icon: "rigueur_compas",
    textScript:
      "Construisez toujours un arbre pondéré au brouillon en vérifiant que la somme des branches partant d'un même nœud vaut 1. Pour la probabilité totale, additionnez les chemins correspondants en multipliant les branches.",
  },
  {
    timeSeconds: 235,
    title: "5. Variable Aléatoire et Loi Binomiale ℬ(n, p)",
    badge: "Formule",
    icon: "cle_solution",
    textScript:
      "Pour une répétition de n épreuves de Bernoulli indépendantes, appliquez la formule C n k fois p puissance k fois 1 moins p puissance n moins k. L'espérance vaut n p et la variance vaut n p facteur de 1 moins p.",
  },
];

const STATISTIQUES_AUDIO_CHAPTERS: AudioChapter[] = [
  {
    timeSeconds: 0,
    title: "1. Enjeux des Statistiques Doubles au Bac S2",
    badge: "Introduction",
    icon: "cible_reflexe",
    textScript:
      "L'exercice de statistiques au Baccalauréat sénégalais est noté sur 4 à 5 points. C'est l'exercice de rentabilité par excellence. Chaque formule bien appliquée et vérifiée à la calculatrice vous assure l'intégralité des points avec un risque d'erreur minimal.",
  },
  {
    timeSeconds: 45,
    title: "2. Le Point Moyen G(x̄, ȳ) et le Tableau Récapitulatif",
    badge: "Méthode",
    icon: "theoreme_equerre",
    textScript:
      "Dressez systématiquement un tableau complet avec les colonnes x i, y i, x i carré, y i carré et x i y i, avec les sommes en bas. Calculez les moyennes x barre et y barre. Retenez que la droite de régression passe obligatoirement par le point moyen G !",
  },
  {
    timeSeconds: 110,
    title: "3. Covariance de Koenig et Droite des Moindres Carrés",
    badge: "Technique",
    icon: "technique_outils",
    textScript:
      "Pour la covariance, appliquez la formule de Koenig : un sur N somme des x i y i moins x barre fois y barre. La pente a de la droite de Y en X vaut la covariance divisée par la variance V de X. L'ordonnée à l'origine b se déduit par y barre moins a x barre.",
  },
  {
    timeSeconds: 175,
    title: "4. Coefficient de Corrélation r et Justification de l'Ajustement",
    badge: "Rigueur",
    icon: "rigueur_compas",
    textScript:
      "Le coefficient r vaut la covariance divisée par le produit des écarts-types. Au Bac, si la valeur absolue de r est supérieure ou égale à zéro virgule 87, concluez impérativement qu'il existe une forte corrélation linéaire et que l'ajustement par les moindres carrés est parfaitement justifié.",
  },
  {
    timeSeconds: 235,
    title: "5. Piège Bac : Estimer X sachant Y via la Droite (D')",
    badge: "Piège Bac",
    icon: "piege_bac",
    textScript:
      "Attention au piège classique : si l'énoncé vous demande de trouver l'année X où la production Y atteindra un seuil donné, n'inversez surtout pas l'équation de la droite D ! Vous devez obligatoirement utiliser la droite de régression de X en Y, x égale a prime y plus b prime.",
  },
];

const GEOMETRIE_AUDIO_CHAPTERS: AudioChapter[] = [
  {
    timeSeconds: 0,
    title: "1. Enjeux de la Géométrie dans l'Espace au Bac S2",
    badge: "Introduction",
    icon: "cible_reflexe",
    textScript:
      "La géométrie dans l'espace est notée sur 4 à 5 points au Baccalauréat sénégalais. C'est une épreuve analytique où la rigueur des équations de plans, de droites et de sphères garantit tous les points si les formules vectorielles sont parfaitement maîtrisées.",
  },
  {
    timeSeconds: 45,
    title: "2. Vecteur Normal et Équation Cartésienne de Plan",
    badge: "Méthode",
    icon: "theoreme_equerre",
    textScript:
      "Pour tout plan ax plus by plus cz plus d égal zéro, les coefficients a, b, c forment les composantes du vecteur normal n. Pour trouver l'équation d'un plan défini par trois points A, B, C non alignés, calculez le produit vectoriel AB vectoriel AC pour obtenir instantanément ce vecteur normal !",
  },
  {
    timeSeconds: 110,
    title: "3. Formule de la Distance d'un Point à un Plan",
    badge: "Formule",
    icon: "technique_outils",
    textScript:
      "La distance d'un point A à un plan P est le quotient de la valeur absolue de a x A plus b y A plus c z A plus d par la racine carrée de a carré plus b carré plus c carré. N'oubliez jamais les barres de valeur absolue au numérateur !",
  },
  {
    timeSeconds: 175,
    title: "4. Droite Paramétrique et Intersection avec un Plan",
    badge: "Technique",
    icon: "rigueur_compas",
    textScript:
      "Pour trouver le point d'intersection d'une droite et d'un plan, remplacez x, y et z dans l'équation du plan par leurs expressions paramétriques en t. Vous obtenez une équation du premier degré en t. Résolvez pour t, puis réinjectez dans la droite pour trouver les coordonnées du point de percée.",
  },
  {
    timeSeconds: 235,
    title: "5. Sphères et Rayon de Section Plane : r² = R² - d²",
    badge: "Piège Bac",
    icon: "piege_bac",
    textScript:
      "Lorsque la distance d du centre de la sphère au plan est strictement inférieure au rayon R, l'intersection est un cercle de rayon r égal racine carrée de R carré moins d carré. Pensez au théorème de Pythagore !",
  },
];

interface PageProps {
  params: {
    level: string;
    track: string;
    subject: string;
    chapter: string;
    lesson: string;
  };
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function LessonReaderPage({ params }: PageProps) {
  const supabase = createClient();
  const admin = createAdminClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(
      `/connexion?redirect=/cours/${params.level}/${params.track}/${params.subject}/${params.chapter}/${params.lesson}`
    );
  }

  // ── CHARGEMENT HAUTE PERFORMANCE EN PARALLÈLE (8 requêtes simultanées) ──
  const [
    profileResult,
    subResult,
    lessonResult,
    chapterResult,
    siblingResult,
    progressResult,
    exercisesResult,
    quizResult,
  ] = await Promise.all([
    supabase
      .from('profiles')
      .select('id, first_name, last_name, phone, role')
      .eq('id', user.id)
      .single(),
    admin
      .from('subscriptions')
      .select('id')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .gte('end_date', new Date().toISOString())
      .limit(1),
    admin
      .from('lessons')
      .select('id, title, chapter_id, is_free, status, content_markdown, order_index')
      .eq('id', params.lesson)
      .maybeSingle(),
    admin
      .from('chapters')
      .select(`id, title, order_index, subjects (id, name, code)`)
      .eq('id', params.chapter)
      .maybeSingle(),
    admin
      .from('lessons')
      .select('id, title, order_index, is_free')
      .eq('chapter_id', params.chapter)
      .eq('status', 'published')
      .order('order_index'),
    supabase
      .from('progress')
      .select('is_completed')
      .eq('user_id', user.id)
      .eq('lesson_id', params.lesson)
      .maybeSingle(),
    admin
      .from('exercises')
      .select('*')
      .eq('lesson_id', params.lesson),
    admin
      .from('quizzes')
      .select(`
        id, title,
        quiz_questions(
          id, question_text, order_index,
          quiz_answers(id, answer_text, is_correct, explanation)
        )
      `)
      .eq('lesson_id', params.lesson)
      .maybeSingle(),
  ]);

  const profile = profileResult.data;
  const isSubscribed = profile?.role === 'admin' || (subResult.data?.length ?? 0) > 0;
  let lessonMeta = lessonResult.data;
  let chapter = chapterResult.data;
  let siblings = siblingResult.data ?? [];
  const progressRow = progressResult.data;

  // ── Résolution immédiate & infaillible pour la Physique-Chimie (Alcools C1, Cinétique C4, etc.) ──
  const pcChapter = PHYSIQUE_CHIMIE_CHAPTERS.find((c) => c.id === params.chapter);
  const pcLesson = pcChapter?.lessons.find((l) => l.id === params.lesson);

  if (pcChapter) {
    if (!chapter) {
      chapter = {
        id: pcChapter.id,
        title: pcChapter.title,
        order_index: pcChapter.order_index,
        subjects: {
          id: PHYSIQUE_CHIMIE_SUBJECT_ID,
          name: 'Sciences Physiques (PC)',
          code: 'physique-chimie',
        },
      } as any;
    }

    if (!siblings || siblings.length === 0) {
      siblings = pcChapter.lessons.map((l) => ({
        id: l.id,
        title: l.title,
        order_index: l.order_index,
        is_free: l.is_free,
      }));
    }

    if (pcLesson && !lessonMeta) {
      lessonMeta = {
        id: pcLesson.id,
        title: pcLesson.title,
        chapter_id: pcChapter.id,
        is_free: pcLesson.is_free,
        status: 'published',
        content_markdown: `# ${pcChapter.title}\n\n## ${pcLesson.title}`,
        order_index: pcLesson.order_index,
      } as any;
    }

    // Synchronisation Supabase en arrière-plan non bloquante
    ensurePhysiqueChimieInDatabase(admin).catch((e) =>
      console.error('Sync PC DB background:', e)
    );
  }

  // ── Résolution immédiate & infaillible pour les Mathématiques (Programme Officiel S2) ──
  const mathChapter = MATHEMATIQUES_CHAPTERS.find((c) => c.id === params.chapter);
  const mathLesson = mathChapter?.lessons.find((l) => l.id === params.lesson);

  if (mathChapter) {
    if (!chapter) {
      chapter = {
        id: mathChapter.id,
        title: mathChapter.title,
        order_index: mathChapter.order_index,
        subjects: {
          id: MATHEMATIQUES_SUBJECT_ID,
          name: 'Mathématiques',
          code: 'mathematiques',
        },
      } as any;
    }

    if (!siblings || siblings.length === 0) {
      siblings = mathChapter.lessons.map((l) => ({
        id: l.id,
        title: l.title,
        order_index: l.order_index,
        is_free: l.is_free,
      }));
    }

    if (mathLesson && !lessonMeta) {
      lessonMeta = {
        id: mathLesson.id,
        title: mathLesson.title,
        chapter_id: mathChapter.id,
        is_free: mathLesson.is_free,
        status: 'published',
        content_markdown: `# ${mathChapter.title}\n\n## ${mathLesson.title}`,
        order_index: mathLesson.order_index,
      } as any;
    }

    // Synchronisation Supabase en arrière-plan non bloquante
    ensureMathematiquesInDatabase(admin).catch((e) =>
      console.error('Sync Maths DB background:', e)
    );
  }

  if (!lessonMeta && params.lesson === '60000000-0000-0000-0000-000000000003') {
    const { data: createdLesson } = await admin
      .from('lessons')
      .upsert({
        id: '60000000-0000-0000-0000-000000000003',
        chapter_id: '50000000-0000-0000-0000-000000000002',
        title: 'Dérivation, tangentes et variations de fonctions',
        order_index: 1,
        content_markdown: '# Chapitre 2 : Dérivation et Étude de Fonctions',
        is_free: false,
        status: 'published',
      }, { onConflict: 'id' })
      .select()
      .single();
    lessonMeta = createdLesson;
  }

  if (!lessonMeta && params.lesson === '60000000-0000-0000-0000-000000000004') {
    const { data: createdLesson } = await admin
      .from('lessons')
      .upsert({
        id: '60000000-0000-0000-0000-000000000004',
        chapter_id: '50000000-0000-0000-0000-000000000002',
        title: 'Branches infinies, asymptotes et positions relatives',
        order_index: 2,
        content_markdown: '# Chapitre 2 : Branches Infinies, Asymptotes et Positions Relatives',
        is_free: false,
        status: 'published',
      }, { onConflict: 'id' })
      .select()
      .single();
    lessonMeta = createdLesson;
  }

  if (!lessonMeta && params.lesson === '60000000-0000-0000-0000-000000000005') {
    const { data: createdLesson } = await admin
      .from('lessons')
      .upsert({
        id: '60000000-0000-0000-0000-000000000005',
        chapter_id: '50000000-0000-0000-0000-000000000003',
        title: 'Suites numériques, récurrence et convergence monotone',
        order_index: 1,
        content_markdown: '# Chapitre 3 : Suites Numériques',
        is_free: false,
        status: 'published',
      }, { onConflict: 'id' })
      .select()
      .single();
    lessonMeta = createdLesson;
  }

  if (!lessonMeta && params.lesson === '60000000-0000-0000-0000-000000000006') {
    const { data: createdLesson } = await admin
      .from('lessons')
      .upsert({
        id: '60000000-0000-0000-0000-000000000006',
        chapter_id: '50000000-0000-0000-0000-000000000004',
        title: 'Propriétés, limites et dérivation de la fonction logarithme népérien',
        order_index: 1,
        content_markdown: '# Chapitre 4 : Fonction Logarithme Népérien',
        is_free: false,
        status: 'published',
      }, { onConflict: 'id' })
      .select()
      .single();
    lessonMeta = createdLesson;
  }

  if (!lessonMeta && params.lesson === '60000000-0000-0000-0000-000000000007') {
    const { data: createdLesson } = await admin
      .from('lessons')
      .upsert({
        id: '60000000-0000-0000-0000-000000000007',
        chapter_id: '50000000-0000-0000-0000-000000000005',
        title: 'Propriétés, limites et dérivation de la fonction exponentielle',
        order_index: 1,
        content_markdown: '# Chapitre 5 : Fonction Exponentielle',
        is_free: false,
        status: 'published',
      }, { onConflict: 'id' })
      .select()
      .single();
    lessonMeta = createdLesson;
  }

  if (!lessonMeta && params.lesson === '60000000-0000-0000-0000-000000000008') {
    const { data: createdLesson } = await admin
      .from('lessons')
      .upsert({
        id: '60000000-0000-0000-0000-000000000008',
        chapter_id: '50000000-0000-0000-0000-000000000006',
        title: "Primitives, intégration par parties et calcul d'aires",
        order_index: 1,
        content_markdown: '# Chapitre 6 : Primitives et Calcul Intégral',
        is_free: false,
        status: 'published',
      }, { onConflict: 'id' })
      .select()
      .single();
    lessonMeta = createdLesson;
  }

  if (!lessonMeta && params.lesson === '60000000-0000-0000-0000-000000000009') {
    const { data: createdLesson } = await admin
      .from('lessons')
      .upsert({
        id: '60000000-0000-0000-0000-000000000009',
        chapter_id: '50000000-0000-0000-0000-000000000007',
        title: "Équations différentielles linéaires du 1er et 2nd ordre",
        order_index: 1,
        content_markdown: '# Chapitre 7 : Équations Différentielles',
        is_free: false,
        status: 'published',
      }, { onConflict: 'id' })
      .select()
      .single();
    lessonMeta = createdLesson;
  }

  if (!lessonMeta && params.lesson === '60000000-0000-0000-0000-000000000010') {
    const { data: createdLesson } = await admin
      .from('lessons')
      .upsert({
        id: '60000000-0000-0000-0000-000000000010',
        chapter_id: '50000000-0000-0000-0000-000000000008',
        title: "Forme algébrique, trigonométrique et géométrie dans le plan complexe",
        order_index: 1,
        content_markdown: '# Chapitre 8 : Nombres Complexes',
        is_free: false,
        status: 'published',
      }, { onConflict: 'id' })
      .select()
      .single();
    lessonMeta = createdLesson;
  }

  if (!lessonMeta && params.lesson === '60000000-0000-0000-0000-000000000011') {
    const { data: createdLesson } = await admin
      .from('lessons')
      .upsert({
        id: '60000000-0000-0000-0000-000000000011',
        chapter_id: '50000000-0000-0000-0000-000000000009',
        title: "Dénombrement, probabilités conditionnelles et loi binomiale",
        order_index: 1,
        content_markdown: '# Chapitre 9 : Dénombrement et Probabilités',
        is_free: false,
        status: 'published',
      }, { onConflict: 'id' })
      .select()
      .single();
    lessonMeta = createdLesson;
  }

  if (!lessonMeta && params.lesson === '60000000-0000-0000-0000-000000000012') {
    const { data: createdLesson } = await admin
      .from('lessons')
      .upsert({
        id: '60000000-0000-0000-0000-000000000012',
        chapter_id: '50000000-0000-0000-0000-000000000010',
        title: "Séries statistiques doubles, ajustement linéaire et corrélation",
        order_index: 1,
        content_markdown: '# Chapitre 10 : Statistiques à Deux Variables',
        is_free: false,
        status: 'published',
      }, { onConflict: 'id' })
      .select()
      .single();
    lessonMeta = createdLesson;
  }

  if (!lessonMeta && params.lesson === '60000000-0000-0000-0000-000000000013') {
    const { data: createdLesson } = await admin
      .from('lessons')
      .upsert({
        id: '60000000-0000-0000-0000-000000000013',
        chapter_id: '50000000-0000-0000-0000-000000000011',
        title: "Géométrie dans l'espace : plans, droites et sphères",
        order_index: 1,
        content_markdown: '# Chapitre 11 : Géométrie dans l\'Espace',
        is_free: false,
        status: 'published',
      }, { onConflict: 'id' })
      .select()
      .single();
    lessonMeta = createdLesson;
  }

  // Provisioning pour Physique-Chimie (Chapitre 1 : Cinétique Chimique)
  if (!lessonMeta && params.lesson === '60000000-0000-0000-0001-000000000001') {
    await admin.from('chapters').upsert({
      id: '50000000-0000-0000-0001-000000000001',
      title: 'Cinétique Chimique & Vitesse de Réaction',
      order_index: 1,
      status: 'published',
    }, { onConflict: 'id' });

    const { data: createdLesson } = await admin
      .from('lessons')
      .upsert({
        id: '60000000-0000-0000-0001-000000000001',
        chapter_id: '50000000-0000-0000-0001-000000000001',
        title: 'Facteurs cinétiques, vitesse volumique et suivi temporel',
        order_index: 1,
        content_markdown: '# Chapitre 1 : Cinétique Chimique & Vitesse de Réaction',
        is_free: true,
        status: 'published',
      }, { onConflict: 'id' })
      .select()
      .single();
    lessonMeta = createdLesson;
  }

  if (!lessonMeta && params.lesson === '60000000-0000-0000-0001-000000000002') {
    const { data: createdLesson } = await admin
      .from('lessons')
      .upsert({
        id: '60000000-0000-0000-0001-000000000002',
        chapter_id: '50000000-0000-0000-0001-000000000001',
        title: 'Méthodes graphiques, tangentes et temps de demi-réaction',
        order_index: 2,
        content_markdown: '# Chapitre 1 : Cinétique Chimique — Méthodes Graphiques',
        is_free: false,
        status: 'published',
      }, { onConflict: 'id' })
      .select()
      .single();
    lessonMeta = createdLesson;
  }

  if (!lessonMeta && params.lesson === '60000000-0000-0000-0001-000000000003') {
    const { data: createdLesson } = await admin
      .from('lessons')
      .upsert({
        id: '60000000-0000-0000-0001-000000000003',
        chapter_id: '50000000-0000-0000-0001-000000000001',
        title: 'Trempe chimique, catalyse et mécanismes réactionnels',
        order_index: 3,
        content_markdown: '# Chapitre 1 : Cinétique Chimique — Trempe et Catalyse',
        is_free: false,
        status: 'published',
      }, { onConflict: 'id' })
      .select()
      .single();
    lessonMeta = createdLesson;
  }

  // Provisioning pour C1 : Alcools (Physique-Chimie S2)
  if (!lessonMeta && params.lesson === '60000000-0000-0001-0001-000000000001') {
    await admin.from('chapters').upsert({
      id: '50000000-0000-0001-0001-000000000001',
      title: 'C1 : Alcools',
      order_index: 1,
      status: 'published',
    }, { onConflict: 'id' });

    const { data: createdLesson } = await admin
      .from('lessons')
      .upsert({
        id: '60000000-0000-0001-0001-000000000001',
        chapter_id: '50000000-0000-0001-0001-000000000001',
        title: "Classes d'alcools, nomenclature et propriétés physiques",
        order_index: 1,
        content_markdown: "# C1 : Alcools — Classes d'alcools, nomenclature et propriétés physiques",
        is_free: true,
        status: 'published',
      }, { onConflict: 'id' })
      .select()
      .single();
    lessonMeta = createdLesson;
  }

  if (!lessonMeta && params.lesson === '60000000-0000-0001-0001-000000000002') {
    const { data: createdLesson } = await admin
      .from('lessons')
      .upsert({
        id: '60000000-0000-0001-0001-000000000002',
        chapter_id: '50000000-0000-0001-0001-000000000001',
        title: 'Oxydation ménagée des alcools et identification des produits',
        order_index: 2,
        content_markdown: '# C1 : Alcools — Oxydation ménagée et identification des produits',
        is_free: false,
        status: 'published',
      }, { onConflict: 'id' })
      .select()
      .single();
    lessonMeta = createdLesson;
  }

  if (!lessonMeta && params.lesson === '60000000-0000-0001-0001-000000000003') {
    const { data: createdLesson } = await admin
      .from('lessons')
      .upsert({
        id: '60000000-0000-0001-0001-000000000003',
        chapter_id: '50000000-0000-0001-0001-000000000001',
        title: 'Déshydratation intra et intermoléculaire des alcools',
        order_index: 3,
        content_markdown: '# C1 : Alcools — Déshydratation intra et intermoléculaire',
        is_free: false,
        status: 'published',
      }, { onConflict: 'id' })
      .select()
      .single();
    lessonMeta = createdLesson;
  }

  if (lessonMeta && lessonMeta.status !== 'published') {
    await admin.from('lessons').update({ status: 'published' }).eq('id', lessonMeta.id);
    lessonMeta.status = 'published';
  }

  if (!lessonMeta || lessonMeta.status !== 'published') {
    notFound();
  }

  // RÈGLE FREEMIUM : Seule la toute première leçon de la matière (Chapitre 1, Leçon 1) est gratuite en aperçu
  const isFirstLessonOfSubject =
    params.lesson === '60000000-0000-0000-0000-000000000001' ||
    params.lesson === '60000000-0000-0000-0001-000000000001' ||
    params.lesson === '60000000-0000-0001-0001-000000000001' ||
    ((chapter?.order_index ?? 0) <= 1 && (lessonMeta.order_index ?? 0) <= 1);

  const isFree = isFirstLessonOfSubject;
  const canAccessContent = isSubscribed || isFree;

  // Navigation entre leçons du chapitre
  const currentIndex = siblings.findIndex((l) => l.id === params.lesson);
  const prevLesson = currentIndex > 0 ? siblings[currentIndex - 1] : null;
  const nextLesson = currentIndex < siblings.length - 1 ? siblings[currentIndex + 1] : null;

  const isCompleted = progressRow?.is_completed ?? false;

  // Contenu et exercices déjà chargés en parallèle
  let lessonContent: string | null = null;
  let exercises: { id: string; statement_md: string; solution_md: string; difficulty: number; sort_order: number }[] = [];
  let quizData: { id: string; title: string; questions: Parameters<typeof QuizView>[0]['questions'] } | null = null;

  if (canAccessContent) {
    lessonContent = getEnhancedLessonContent(
      lessonMeta.title,
      chapter?.title ?? '',
      lessonMeta.content_markdown
    );

    // Synchronisation en arrière-plan non bloquante
    if (lessonMeta.content_markdown !== lessonContent) {
      admin.from('lessons').update({ content_markdown: lessonContent }).eq('id', params.lesson).then();
    }

    // Mapper les exercices chargés en parallèle
    exercises = (exercisesResult.data ?? []).map((e: any) => ({
      id: e.id,
      statement_md: e.statement_md ?? e.statement ?? '',
      solution_md: e.solution_md ?? e.solution ?? '',
      difficulty: e.difficulty ?? 1,
      sort_order: e.sort_order ?? e.order_index ?? 0,
    }));

    // Mapper le quiz chargé en parallèle
    const quizRow = quizResult.data;
    if (quizRow && quizRow.quiz_questions) {
      quizData = {
        id: quizRow.id,
        title: quizRow.title,
        questions: (quizRow.quiz_questions as any[])
          .sort((a, b) => (a.order_index ?? 0) - (b.order_index ?? 0))
          .map((q) => ({
            id: q.id,
            question_md: q.question_text ?? '',
            answers: (q.quiz_answers ?? []).map((ans: any) => ({
              id: ans.id,
              answer_text: ans.answer_text ?? '',
              is_correct: Boolean(ans.is_correct),
              explanation_md: ans.explanation ?? null,
            })),
          })),
      };
    }
  }

  const subjectName = (chapter?.subjects as any)?.name ?? 'Mathématiques';
  const studentFullName =
    [profile?.first_name, profile?.last_name].filter(Boolean).join(' ') ||
    profile?.phone ||
    user.email?.split('@')[0] ||
    'Élève Al Muxtaar';
  const studentPhone = profile?.phone || user.phone || user.email || '+221';

  const isExponentielle =
    lessonMeta.title.toLowerCase().includes('exponentielle') ||
    lessonMeta.title.toLowerCase().includes(' exp');

  const isIntegration =
    lessonMeta.title.toLowerCase().includes('primitive') ||
    lessonMeta.title.toLowerCase().includes('intégral') ||
    lessonMeta.title.toLowerCase().includes('integral') ||
    lessonMeta.title.toLowerCase().includes("calcul d'aire");

  const isEquadiff =
    lessonMeta.title.toLowerCase().includes('differentiell') ||
    lessonMeta.title.toLowerCase().includes('différentiell') ||
    lessonMeta.title.toLowerCase().includes('equadiff') ||
    lessonMeta.title.toLowerCase().includes('équadiff');

  const isComplexes =
    lessonMeta.title.toLowerCase().includes('complexe') ||
    lessonMeta.title.toLowerCase().includes('affixe') ||
    lessonMeta.title.toLowerCase().includes('similitude');

  const isProbabilites =
    lessonMeta.title.toLowerCase().includes('probabilit') ||
    lessonMeta.title.toLowerCase().includes('dénombrement') ||
    lessonMeta.title.toLowerCase().includes('denombrement') ||
    lessonMeta.title.toLowerCase().includes('aléatoire') ||
    lessonMeta.title.toLowerCase().includes('aleatoire');

  const isStatistiques =
    lessonMeta.title.toLowerCase().includes('statistique') ||
    lessonMeta.title.toLowerCase().includes('ajustement') ||
    lessonMeta.title.toLowerCase().includes('corrélation') ||
    lessonMeta.title.toLowerCase().includes('correlation') ||
    lessonMeta.title.toLowerCase().includes('moindres carrés') ||
    lessonMeta.title.toLowerCase().includes('moindres carres');

  const isGeometrie =
    lessonMeta.title.toLowerCase().includes('espace') ||
    lessonMeta.title.toLowerCase().includes('géométrie') ||
    lessonMeta.title.toLowerCase().includes('geometrie') ||
    lessonMeta.title.toLowerCase().includes('sphère') ||
    lessonMeta.title.toLowerCase().includes('sphere') ||
    lessonMeta.title.toLowerCase().includes('vecteur normal');

  const isLogarithme =
    lessonMeta.title.toLowerCase().includes('logarithm') ||
    lessonMeta.title.toLowerCase().includes(' ln') ||
    lessonMeta.title.toLowerCase().includes('ln(');

  const isSuites =
    lessonMeta.title.toLowerCase().includes('suite') ||
    lessonMeta.title.toLowerCase().includes('recurrence');

  const isAsymptotes =
    lessonMeta.title.toLowerCase().includes('asymptot') ||
    lessonMeta.title.toLowerCase().includes('branche') ||
    lessonMeta.title.toLowerCase().includes('position');

  const isTvi =
    lessonMeta.title.toLowerCase().includes('valeur') ||
    lessonMeta.title.toLowerCase().includes('interm') ||
    lessonMeta.title.toLowerCase().includes('bijection') ||
    lessonMeta.title.toLowerCase().includes('tvi');

  const isAlcools =
    lessonMeta.title.toLowerCase().includes('alcool') ||
    (chapter?.title?.toLowerCase() || '').includes('alcool') ||
    params.lesson === '60000000-0000-0001-0001-000000000001' ||
    params.chapter === '50000000-0000-0001-0001-000000000001';

  const isCinetique =
    !isAlcools &&
    (lessonMeta.title.toLowerCase().includes('cinetique') ||
      lessonMeta.title.toLowerCase().includes('cinétique') ||
      lessonMeta.title.toLowerCase().includes('vitesse de réaction') ||
      lessonMeta.title.toLowerCase().includes('facteur cinétique') ||
      (chapter?.title?.toLowerCase() || '').includes('cinetique') ||
      (chapter?.title?.toLowerCase() || '').includes('cinétique'));

  const isDerivation =
    !isAlcools &&
    !isCinetique &&
    !isAsymptotes &&
    !isSuites &&
    !isLogarithme &&
    !isExponentielle &&
    !isIntegration &&
    !isEquadiff &&
    !isComplexes &&
    !isProbabilites &&
    !isStatistiques &&
    !isGeometrie &&
    (lessonMeta.title.toLowerCase().includes('deriv') ||
      lessonMeta.title.toLowerCase().includes('variation') ||
      lessonMeta.title.toLowerCase().includes('tangente'));

  return (
    <CourseProtectionGuard
      studentName={studentFullName}
      studentPhone={studentPhone}
    >
      <div className="min-h-screen bg-surface">
        {/* Watermark for authenticated student protection */}
        {canAccessContent && (
          <Watermark
            studentName={studentFullName}
            studentPhone={studentPhone}
            studentId={user.id}
          />
        )}

      {/* Reader Layout */}
      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <aside className="lg:col-span-1 order-2 lg:order-1">
          <div className="sticky top-20 bg-white rounded-2xl border border-navy/10 p-5 shadow-sm space-y-4">
            <Link
              href={`/cours/${params.level}/${params.track}/${params.subject}`}
              className="text-xs font-semibold text-turquoise hover:underline flex items-center gap-1"
            >
              ← Retour au sommaire
            </Link>

            <div>
              <p className="text-[11px] font-bold text-text/50 uppercase tracking-wider">
                Chapitre en cours
              </p>
              <h3 className="font-bold text-navy text-sm mt-0.5 leading-snug">
                {chapter?.title}
              </h3>
            </div>

            <div className="border-t border-navy/10 pt-3">
              <p className="text-xs font-semibold text-text/60 mb-2">Leçons du chapitre</p>
              <div className="space-y-1.5">
                {siblings.map((sib, sIdx) => {
                  const isCurrent = sib.id === params.lesson;
                  return (
                    <Link
                      key={sib.id}
                      href={`/cours/${params.level}/${params.track}/${params.subject}/${params.chapter}/${sib.id}`}
                      className={`block p-2 rounded-xl text-xs font-medium transition-colors ${
                        isCurrent
                          ? 'bg-turquoise text-white font-bold'
                          : 'text-text/75 hover:bg-surface'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-1">
                        <span className="truncate">{sIdx + 1}. {sib.title}</span>
                        {(sib.is_free ?? (sib as any).is_free_preview) && !isCurrent && (
                          <span className="text-[9px] bg-turquoise/20 text-navy px-1.5 py-0.5 rounded font-bold">
                            Gratuit
                          </span>
                        )}
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="lg:col-span-3 order-1 lg:order-2 space-y-8 w-full max-w-full overflow-hidden">
          {/* Top Breadcrumb & Actions Bar */}
          <div className="bg-white rounded-2xl border border-navy/10 p-4 sm:p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold text-turquoise uppercase tracking-wider">
                {subjectName} • {chapter?.title}
              </span>
              <h1 className="text-2xl font-bold text-navy">{lessonMeta.title}</h1>
            </div>

            {canAccessContent && (
              <LessonCompleteButton
                lessonId={params.lesson}
                chapterId={params.chapter}
                initialCompleted={isCompleted}
              />
            )}
          </div>

          {/* Paywall screen or Course content */}
          {!canAccessContent ? (
            <Paywall />
          ) : (
            <>
              {/* Capsule Vocale & Masterclass Audio du Professeur (Al Muxtaar S2) */}
              <AudioCoachPlayer
                title={
                  isAlcools
                    ? 'Masterclass Audio : Classes d\'Alcools & Nomenclature'
                    : isCinetique
                    ? 'Masterclass Audio : Cinétique Chimique & Vitesse de Réaction'
                    : isTvi
                    ? 'Masterclass Audio : TVI & Théorème de la Bijection'
                    : isAsymptotes
                    ? 'Masterclass Audio : Asymptotes & Branches Infinies'
                    : isSuites
                    ? 'Masterclass Audio : Suites Numériques & Récurrence'
                    : isLogarithme
                    ? 'Masterclass Audio : Fonction Logarithme Népérien'
                    : isExponentielle
                    ? 'Masterclass Audio : Fonction Exponentielle'
                    : isIntegration
                    ? 'Masterclass Audio : Primitives & Calcul Intégral'
                    : isEquadiff
                    ? 'Masterclass Audio : Équations Différentielles'
                    : isComplexes
                    ? 'Masterclass Audio : Nombres Complexes & Géométrie'
                    : isProbabilites
                    ? 'Masterclass Audio : Dénombrement & Probabilités'
                    : isStatistiques
                    ? 'Masterclass Audio : Statistiques & Ajustement Linéaire'
                    : isGeometrie
                    ? 'Masterclass Audio : Géométrie dans l\'Espace'
                    : isDerivation
                    ? 'Masterclass Audio : Dérivation & Variations'
                    : 'Masterclass Audio : Limites & Continuité'
                }
                subtitle={
                  isAlcools
                    ? 'Terminale S2 • Chimie : Les 5 réflexes pour reconnaître la classe et nommer'
                    : isCinetique
                    ? 'Terminale S2 • Chimie : Les 5 réflexes pour l\'exercice cinétique au Bac'
                    : isTvi
                    ? 'Terminale S2 • Les 5 réflexes pour la Partie A & B'
                    : isAsymptotes
                    ? 'Terminale S2 • Les 5 réflexes pour le tracé de la courbe'
                    : isSuites
                    ? 'Terminale S2 • Les 5 réflexes pour la récurrence et la convergence'
                    : isLogarithme
                    ? 'Terminale S2 • Les 5 réflexes pour le grand problème d\'analyse'
                    : isExponentielle
                    ? 'Terminale S2 • Les 5 réflexes pour l\'exponentielle au Bac'
                    : isIntegration
                    ? 'Terminale S2 • Les 5 réflexes pour les aires et l\'intégration'
                    : isEquadiff
                    ? 'Terminale S2 • Les 5 réflexes pour le 1er et 2nd ordre'
                    : isComplexes
                    ? 'Terminale S2 • Les 5 réflexes pour les figures et similitudes'
                    : isProbabilites
                    ? 'Terminale S2 • Les 5 réflexes pour l\'urne et la loi binomiale'
                    : isStatistiques
                    ? 'Terminale S2 • Les 5 réflexes pour les séries doubles et les moindres carrés'
                    : isGeometrie
                    ? 'Terminale S2 • Les 5 réflexes pour les plans, droites et sphères'
                    : isDerivation
                    ? 'Terminale S2 • Les 5 réflexes pour les tangentes et variations'
                    : 'Terminale S2 • 5 réflexes essentiels pour l\'épreuve'
                }
                chapters={
                  isAlcools
                    ? ALCOOLS_AUDIO_CHAPTERS
                    : isCinetique
                    ? CINETIQUE_AUDIO_CHAPTERS
                    : isTvi
                    ? TVI_AUDIO_CHAPTERS
                    : isAsymptotes
                    ? ASYMPTOTES_AUDIO_CHAPTERS
                    : isSuites
                    ? SUITES_AUDIO_CHAPTERS
                    : isLogarithme
                    ? LOGARITHME_AUDIO_CHAPTERS
                    : isExponentielle
                    ? EXPONENTIELLE_AUDIO_CHAPTERS
                    : isIntegration
                    ? INTEGRATION_AUDIO_CHAPTERS
                    : isEquadiff
                    ? EQUADIFF_AUDIO_CHAPTERS
                    : isComplexes
                    ? COMPLEXES_AUDIO_CHAPTERS
                    : isProbabilites
                    ? PROBABILITES_AUDIO_CHAPTERS
                    : isStatistiques
                    ? STATISTIQUES_AUDIO_CHAPTERS
                    : isGeometrie
                    ? GEOMETRIE_AUDIO_CHAPTERS
                    : isDerivation
                    ? DERIVATION_AUDIO_CHAPTERS
                    : undefined
                }
              />

              {/* Course Text Section */}
              <article className="bg-white rounded-2xl border border-navy/10 p-4 sm:p-6 md:p-8 shadow-sm w-full max-w-full overflow-hidden">
                <div className="border-b border-navy/10 pb-4 mb-6">
                  <span className="text-xs font-bold text-navy/40 uppercase tracking-widest">
                    Cours & Théorèmes
                  </span>
                </div>
                {lessonContent ? (
                  <MathRenderer content={lessonContent} />
                ) : (
                  <p className="text-text/50 italic py-8 text-center">
                    Le contenu de cette leçon est en cours de rédaction par nos professeurs.
                  </p>
                )}
              </article>

              {/* Fiches Réflexes Mobiles & Simulateur Tactile Interactif */}
              {isAlcools ? (
                <>
                  <AlcoolsReflexesCard />
                  <AlcoolsInteractiveSimulator />
                </>
              ) : isCinetique ? (
                <>
                  <CinetiqueReflexesCard />
                  <CinetiqueInteractiveSimulator />
                </>
              ) : isTvi ? (
                <>
                  <TviReflexesCard />
                  <TviInteractiveSimulator />
                </>
              ) : isAsymptotes ? (
                <>
                  <AsymptotesReflexesCard />
                  <AsymptotesInteractiveSimulator />
                </>
              ) : isSuites ? (
                <>
                  <SuitesReflexesCard />
                  <SuitesInteractiveSimulator />
                </>
              ) : isLogarithme ? (
                <>
                  <LogarithmeReflexesCard />
                  <LogarithmeInteractiveSimulator />
                </>
              ) : isExponentielle ? (
                <>
                  <ExponentielleReflexesCard />
                  <ExponentielleInteractiveSimulator />
                </>
              ) : isIntegration ? (
                <>
                  <PrimitivesReflexesCard />
                  <PrimitivesInteractiveSimulator />
                </>
              ) : isEquadiff ? (
                <>
                  <EquadiffReflexesCard />
                  <EquadiffInteractiveSimulator />
                </>
              ) : isComplexes ? (
                <>
                  <ComplexesReflexesCard />
                  <ComplexesInteractiveSimulator />
                </>
              ) : isProbabilites ? (
                <>
                  <ProbabilitesReflexesCard />
                  <ProbabilitesInteractiveSimulator />
                </>
              ) : isStatistiques ? (
                <>
                  <StatistiquesReflexesCard />
                  <StatistiquesInteractiveSimulator />
                </>
              ) : isGeometrie ? (
                <>
                  <GeometrieReflexesCard />
                  <GeometrieInteractiveSimulator />
                </>
              ) : isDerivation ? (
                <>
                  <DerivationReflexesCard />
                  <DerivationInteractiveSimulator />
                </>
              ) : (
                <>
                  <FormesIndetermineesCard />
                  <InteractiveLimitSimulator />
                </>
              )}

              {/* Exercises Section */}
              {exercises.length > 0 && (
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-navy flex items-center gap-2">
                      <StudyIcon name="exercice_crayon" size={24} />
                      <span>Exercices d&apos;application ({exercises.length})</span>
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {exercises.map((ex, exIdx) => (
                      <ExerciseCard
                        key={ex.id}
                        index={exIdx + 1}
                        statementMd={ex.statement_md}
                        solutionMd={ex.solution_md}
                        difficulty={ex.difficulty}
                      />
                    ))}
                  </div>
                </section>
              )}

              {/* Section Annales Officielles du Baccalauréat Sénégalais (Après les exercices d'application) */}
              <BacSenegalAnnales
                chapter={
                  isAlcools
                    ? 'alcools'
                    : isCinetique
                    ? 'cinetique'
                    : isTvi
                    ? 'tvi'
                    : isAsymptotes
                    ? 'asymptotes'
                    : isSuites
                    ? 'suites'
                    : isLogarithme
                    ? 'logarithme'
                    : isExponentielle
                    ? 'exponentielle'
                    : isIntegration
                    ? 'primitives'
                    : isEquadiff
                    ? 'equadiff'
                    : isComplexes
                    ? 'complexes'
                    : isProbabilites
                    ? 'probabilites'
                    : isStatistiques
                    ? 'statistiques'
                    : isGeometrie
                    ? 'geometrie'
                    : isDerivation
                    ? 'derivation'
                    : 'limites'
                }
              />

              {/* Quiz Section - Quiz enrichi questions type Bac S2 */}
              {quizData && quizData.questions.length > 0 ? (
                <section>
                  <QuizView
                    quizTitle={quizData.title}
                    questions={quizData.questions}
                  />
                </section>
              ) : isAlcools ? (
                <AlcoolsQuizEmbedded />
              ) : isCinetique ? (
                <CinetiqueQuizEmbedded />
              ) : isTvi ? (
                <TviQuizEmbedded />
              ) : isAsymptotes ? (
                <AsymptotesQuizEmbedded />
              ) : isSuites ? (
                <SuitesQuizEmbedded />
              ) : isLogarithme ? (
                <LogarithmeQuizEmbedded />
              ) : isExponentielle ? (
                <ExponentielleQuizEmbedded />
              ) : isIntegration ? (
                <PrimitivesQuizEmbedded />
              ) : isEquadiff ? (
                <EquadiffQuizEmbedded />
              ) : isComplexes ? (
                <ComplexesQuizEmbedded />
              ) : isProbabilites ? (
                <ProbabilitesQuizEmbedded />
              ) : isStatistiques ? (
                <StatistiquesQuizEmbedded />
              ) : isGeometrie ? (
                <GeometrieQuizEmbedded />
              ) : isDerivation ? (
                <DerivationQuizEmbedded />
              ) : (
                <LimitesQuizEmbedded />
              )}

              {/* Next / Prev Navigation Controls */}
              <div className="bg-white rounded-2xl border border-navy/10 p-5 shadow-sm flex flex-wrap items-center justify-between gap-4">
                {prevLesson ? (
                  <Link
                    href={`/cours/${params.level}/${params.track}/${params.subject}/${params.chapter}/${prevLesson.id}`}
                  >
                    <Button variant="outline" size="sm">
                      ← {prevLesson.title}
                    </Button>
                  </Link>
                ) : (
                  <div />
                )}

                {nextLesson ? (
                  <Link
                    href={`/cours/${params.level}/${params.track}/${params.subject}/${params.chapter}/${nextLesson.id}`}
                  >
                    <Button variant="primary" size="sm">
                      Leçon suivante : {nextLesson.title} →
                    </Button>
                  </Link>
                ) : (
                  <Link
                    href={`/cours/${params.level}/${params.track}/${params.subject}`}
                  >
                    <Button variant="secondary" size="sm">
                      Fin du chapitre ! Revoir le sommaire
                    </Button>
                  </Link>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  </CourseProtectionGuard>
  );
}

