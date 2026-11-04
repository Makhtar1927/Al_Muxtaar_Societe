'use client';

import React, { useState, useCallback } from 'react';
import MathRenderer from '@/components/course/math-renderer';

/* ============================================================
   TYPES
   ============================================================ */
interface RawAnswer {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
  wolofExplanation?: string;
}

interface RawQuestion {
  id: string;
  question: string;
  difficulty: 1 | 2 | 3;
  answers: RawAnswer[];
}

interface ProcessedQuestion {
  id: string;
  question: string;
  difficulty: 1 | 2 | 3;
  answers: {
    letter: string;
    text: string;
    isCorrect: boolean;
    explanation: string;
    wolofExplanation?: string;
  }[];
}

/* ============================================================
   BANQUE DE QUESTIONS — Amines (Bac S2 Sénégal, C2)
   ============================================================ */
const QUESTION_BANK: RawQuestion[] = [
  {
    id: 'q1',
    difficulty: 1,
    question: `Quelle est la classe de l'amine de formule :
$$\\text{(CH}_3\\text{)}_3\\text{C}—\\text{NH}_2$$`,
    answers: [
      {
        id: '1',
        text: 'Amine tertiaire (3°)',
        isCorrect: false,
        explanation:
          'Faux ! Le carbone portant le groupe $-\\text{NH}_2$ est un carbone tertiaire, mais c\'est le CARBONE qui a 3 voisins, pas l\'azote. La classe d\'une amine se détermine par le nombre de groupes fixés sur l\'AZOTE.',
        wolofExplanation:
          'Dédët ! Ci amine, azote N bi la ngay xool, bu du carbone. Azote N bi yor $-\\text{NH}_2$ : am na 2 H ak 1 seul alkyle. Mooy amine primaire !',
      },
      {
        id: '2',
        text: 'Amine secondaire (2°)',
        isCorrect: false,
        explanation:
          'Non. Une amine secondaire a 2 groupes alkyles sur l\'azote et 1 seul hydrogène ($-\\text{NH}-$). Ici l\'azote ne porte qu\'un seul groupe alkyle $\\text{(CH}_3)_3\\text{C}-$.',
        wolofExplanation: 'Dédët. Amine secondaire dafa am 1 H rek ci azote N. Bu fekkee amine primaire la, N bi am na 2 H.',
      },
      {
        id: '3',
        text: 'Amine primaire (1°)',
        isCorrect: true,
        explanation:
          'CORRECT ! L\'azote N porte LE GROUPE $-\\text{NH}_2$ qui contient 2 atomes d\'hydrogène. Il n\'est lié qu\'à UN SEUL groupe carboné $\\text{(CH}_3)_3\\text{C}-$. C\'est donc une amine PRIMAIRE (1°). Le fait que le carbone voisin soit tertiaire n\'a aucune influence sur la classe de l\'amine !',
        wolofExplanation:
          'Waaw ! Azote N bi dafa am 2 H ak 1 seul alkyle. Moo mel amine primaire (classe 1). Bul xool carbone bi ; xool azote bi !',
      },
      {
        id: '4',
        text: 'Ce n\'est pas une amine',
        isCorrect: false,
        explanation:
          'Si ! La formule $\\text{(CH}_3)_3\\text{C}-\\text{NH}_2$ possède bien le groupe fonctionnel amine $-\\text{NH}_2$. C\'est la 2,2-diméthylpropan-2-amine (ou *tert*-butylamine).',
        wolofExplanation: 'Dédët. Groupe $-\\text{NH}_2$ bi bëgg na ci formule bi, kon amine la !',
      },
    ],
  },
  {
    id: 'q2',
    difficulty: 1,
    question: `Quelle affirmation décrit correctement l'amine $\\text{CH}_3-\\text{N}(\\text{CH}_3)-\\text{CH}_2-\\text{CH}_3$ ?`,
    answers: [
      {
        id: '1',
        text: 'Amine primaire de formule brute C₃H₉N',
        isCorrect: false,
        explanation:
          'Faux pour les deux informations. L\'azote porte 2 groupes alkyles et 0 hydrogène → amine secondaire. Et la formule brute est $\\text{C}_4\\text{H}_{11}\\text{N}$ (comptez : 1 C + 1 N + 1 CH₃ + 1 C₂H₅ = 4C, 11H, 1N).',
        wolofExplanation: 'Dédët. Xool ñetti partie : azote am na ñaar alkyle → secondaire. Formule bi mëna ko siimil bu baax !',
      },
      {
        id: '2',
        text: 'Amine secondaire de formule brute C₃H₉N',
        isCorrect: false,
        explanation:
          'La classe est correcte (secondaire car 2 groupes sur N, 1 seul H — ATTENTION : ici l\'azote porte UN H et deux alkyls → secondaire, oui). Mais la formule brute est $\\text{C}_4\\text{H}_{11}\\text{N}$ et non $\\text{C}_3\\text{H}_9\\text{N}$.',
        wolofExplanation: 'Classe bi jëkk (secondaire) waaye formule brute bi dëkk ! Siimil ko : C4, H11, N1.',
      },
      {
        id: '3',
        text: 'Amine tertiaire de formule brute C₄H₁₁N',
        isCorrect: false,
        explanation:
          'La formule brute est correcte. Mais la classe est fausse ! L\'azote porte ici DEUX groupes alkyles ($\\text{CH}_3$ et $\\text{CH}_2\\text{CH}_3$) ET un seul atome H → c\'est une amine SECONDAIRE, pas tertiaire.',
        wolofExplanation: 'Formule bi jëkk waaye classe bi dëkk. Azote bi am na 1 H → amine secondaire. Amine tertiaire amul benn H ci azote !',
      },
      {
        id: '4',
        text: 'Amine secondaire de formule brute C₄H₁₁N',
        isCorrect: true,
        explanation:
          'CORRECT ! L\'azote porte 2 groupes alkyles ($\\text{CH}_3$ + $\\text{C}_2\\text{H}_5$) et 1 atome d\'hydrogène → amine SECONDAIRE. Formule brute : $4C + 11H + 1N \\implies \\text{C}_4\\text{H}_{11}\\text{N}$. Nom UICPA : $N$-méthylpropan-1-amine.',
        wolofExplanation: 'Waaw ! Azote am na 2 alkyle ak 1H → amine secondaire. 4 carbones, 11 hydrogènes, 1 azote : C₄H₁₁N la. Jëkk lool !',
      },
    ],
  },
  {
    id: 'q3',
    difficulty: 2,
    question: `Classer les composés suivants par ordre croissant de force basique (du moins basique au plus basique) :
1. Aniline $\\text{C}_6\\text{H}_5\\text{NH}_2$ (pKa = 4,63)
2. Ammoniac $\\text{NH}_3$ (pKa = 9,21)
3. Éthanamine $\\text{CH}_3\\text{CH}_2\\text{NH}_2$ (pKa = 10,65)
4. Diéthylamine $(\\text{C}_2\\text{H}_5)_2\\text{NH}$ (pKa = 10,93)`,
    answers: [
      {
        id: '1',
        text: 'Aniline < Ammoniac < Éthanamine < Diéthylamine',
        isCorrect: true,
        explanation:
          'CORRECT ! Plus le pKa est grand, plus la base est forte. Aniline (4,63) est la base la plus faible car son doublet est délocalisé dans le cycle aromatique par mésomérie. Ensuite NH₃ (9,21), puis l\'éthanamine (10,65) et la diéthylamine (10,93) car les groupes éthyle exercent un effet inducteur donneur $+I$ qui enrichit l\'azote.',
        wolofExplanation:
          'Waaw ! Bu pKa gën a gudd, amine bi gën a forte. Aniline faible lool car doublet N bi tàbi ci cycle benzène. Alkylamines yi ñoo gën ndax effet $+I$ u alkyles yi.',
      },
      {
        id: '2',
        text: 'Diéthylamine < Éthanamine < Ammoniac < Aniline',
        isCorrect: false,
        explanation:
          'C\'est l\'ordre inverse ! Plus le pKa est GRAND, plus la base est FORTE. Aniline a le pKa le plus petit (4,63) → c\'est la plus FAIBLE des bases. La diéthylamine a le pKa le plus grand (10,93) → c\'est la plus forte.',
        wolofExplanation: 'Dédët, nguir waay yi dañuy wopp ! pKa bu gëna gudd → base bi gëna forcé. Bu gëna néew → gëna néew !',
      },
      {
        id: '3',
        text: 'Éthanamine < Diéthylamine < Ammoniac < Aniline',
        isCorrect: false,
        explanation:
          'Non, c\'est totalement inversé et brouillé. Aniline est la BASE la plus faible de toutes (pKa le plus petit = 4,63). Rappelez-vous : doublet N de l\'aniline capturé par mésomérie avec le cycle benzénique.',
        wolofExplanation: 'Dédët. Aniline mooy amine bi gën a niopk ndax doublet N bi dafa tàbi ci cycle benzène bi !',
      },
      {
        id: '4',
        text: 'Ammoniac < Aniline < Éthanamine < Diéthylamine',
        isCorrect: false,
        explanation:
          'Non. NH₃ a un pKa de 9,21 alors que l\'aniline a un pKa de 4,63 : NH₃ est donc une base PLUS FORTE que l\'aniline, pas plus faible.',
        wolofExplanation: 'Dédët. NH₃ dafa gën a forcé ku aniline ndax pKa u NH₃ (9,21) gën a gudd ku pKa u aniline (4,63).',
      },
    ],
  },
  {
    id: 'q4',
    difficulty: 2,
    question: `Quelle est l'équation-bilan correcte de la réaction de l'éthanamine $\\text{CH}_3\\text{CH}_2\\text{NH}_2$ avec le chlorure d'acétyle $\\text{CH}_3\\text{COCl}$ en excès d'amine ?`,
    answers: [
      {
        id: '1',
        text: '$\\text{CH}_3\\text{COCl} + \\text{CH}_3\\text{CH}_2\\text{NH}_2 \\to \\text{CH}_3\\text{CO}-\\text{NH}-\\text{CH}_2\\text{CH}_3 + \\text{HCl}$',
        isCorrect: false,
        explanation:
          'Cette équation est incomplète. Elle ne tient pas compte de la réaction de HCl libéré avec la deuxième molécule d\'éthanamine présente en excès. Le $\\text{HCl}$ et l\'éthanamine réagissent immédiatement pour donner le sel $\\text{CH}_3\\text{CH}_2\\text{NH}_3^+\\text{Cl}^-$.',
        wolofExplanation:
          'Dëkk ! HCl bi génn bi, amine bi ci jëm (ndax excès amine la am). Nela fekk ñaari moles d\'amine ci équation bi jëkk !',
      },
      {
        id: '2',
        text: '$\\text{CH}_3\\text{COCl} + 2\\,\\text{CH}_3\\text{CH}_2\\text{NH}_2 \\to \\text{CH}_3\\text{CO}-\\text{NH}-\\text{CH}_2\\text{CH}_3 + \\text{CH}_3\\text{CH}_2\\text{NH}_3^+\\text{Cl}^-$',
        isCorrect: true,
        explanation:
          'CORRECT ! Le coefficient 2 est fondamental : la première molécule d\'amine réagit avec le chlorure d\'acyle pour former l\'amide $N$-éthylacétamide en libérant HCl. La deuxième molécule d\'amine (en excès) capte immédiatement le HCl pour donner le sel d\'alkylammonium. C\'est l\'équation complète et rigoureuse pour le Bac S2.',
        wolofExplanation:
          'Waaw ! Ñaari moles d\'éthanamine dañuy jëlee : benn di def amide bi, ñaareel di jàpp HCl bi génn def sel ammonium bi. Jëkk lool !',
      },
      {
        id: '3',
        text: '$\\text{CH}_3\\text{COCl} + \\text{CH}_3\\text{CH}_2\\text{NH}_2 \\to \\text{CH}_3\\text{CH}_2\\text{NH}_2^+\\text{COCl}^-$',
        isCorrect: false,
        explanation:
          'Non, ce produit n\'existe pas. Le chlorure d\'acyle réagit avec l\'amine par substitution nucléophile acylique : l\'azote attaque le carbone du groupe $\\text{C=O}$, et non par simple transfert de charge.',
        wolofExplanation: 'Dédët. Produit bi amul. Réaction bi mëlni substitution nucléophile, bu du simple transfert de charge.',
      },
      {
        id: '4',
        text: 'Il n\'y a pas de réaction car les amines ne réagissent pas avec les chlorures d\'acyle.',
        isCorrect: false,
        explanation:
          'Totalement faux ! La réaction entre une amine primaire ou secondaire et un chlorure d\'acyle est TOTALE, rapide et exothermique. C\'est l\'une des réactions clés du programme de Terminale S2 !',
        wolofExplanation: 'Dédët lool ! Amines primaires ak secondaires dañuy rekkaat bi baax ak chlorures d\'acyle. Réaction totale la, bu yombu !',
      },
    ],
  },
  {
    id: 'q5',
    difficulty: 2,
    question: `Une amine $A$ de formule brute $\\text{C}_3\\text{H}_9\\text{N}$ est une amine primaire. Parmi les propositions suivantes, laquelle est l'amine $A$ ?`,
    answers: [
      {
        id: '1',
        text: '$\\text{(CH}_3)_3\\text{N}$ — Triméthylamine',
        isCorrect: false,
        explanation:
          'Faux ! La triméthylamine $(\\text{CH}_3)_3\\text{N}$ a bien la formule brute $\\text{C}_3\\text{H}_9\\text{N}$ mais c\'est une amine TERTIAIRE (3 méthyles sur l\'azote, 0 hydrogène sur N).',
        wolofExplanation:
          'Dédët. $(\\text{CH}_3)_3\\text{N}$ formule brute bi am na $\\text{C}_3\\text{H}_9\\text{N}$ waaye amine tertiaire la : azote am na ñetti methyle ak amul H !',
      },
      {
        id: '2',
        text: '$\\text{CH}_3\\text{CH}_2\\text{NHCH}_3$ — N-méthyléthanamine',
        isCorrect: false,
        explanation:
          'Non, c\'est une amine secondaire de formule $\\text{C}_3\\text{H}_9\\text{N}$ (l\'azote porte 2 groupes alkyles et 1H). Elle a la bonne formule brute mais pas la bonne classe.',
        wolofExplanation: 'Dédët. $\\text{CH}_3\\text{CH}_2\\text{NHCH}_3$ amine secondaire la : azote am na 1H ak 2 alkyles.',
      },
      {
        id: '3',
        text: '$\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{NH}_2$ — Propan-1-amine',
        isCorrect: true,
        explanation:
          'CORRECT ! La propan-1-amine $\\text{CH}_3\\text{CH}_2\\text{CH}_2\\text{NH}_2$ est une amine primaire de formule brute $\\text{C}_3\\text{H}_9\\text{N}$ (comptez : 3C, 9H, 1N). L\'azote porte le groupe $-\\text{NH}_2$ (2 hydrogènes) et un seul groupe propyle.',
        wolofExplanation:
          'Waaw ! Propan-1-amine dafa am $\\text{C}_3\\text{H}_9\\text{N}$ ak azote bi yor $-\\text{NH}_2$ (2H sur N). Amine primaire la, ci yoon bu baax !',
      },
      {
        id: '4',
        text: '$\\text{CH}_3\\text{NH}_2$ — Méthanamine',
        isCorrect: false,
        explanation:
          'Non, la méthanamine $\\text{CH}_3\\text{NH}_2$ a la formule brute $\\text{CH}_5\\text{N}$ ($n = 1$). La formule générale des monoamines primaires saturées est $\\text{C}_n\\text{H}_{2n+3}\\text{N}$ donc pour $n=3$ : $\\text{C}_3\\text{H}_9\\text{N}$.',
        wolofExplanation: 'Dédët. Méthanamine formule bi dafa am $\\text{CH}_5\\text{N}$ (n=1). Bu la bëggée $\\text{C}_3\\text{H}_9\\text{N}$, warnga jëlal n=3.',
      },
    ],
  },
  {
    id: 'q6',
    difficulty: 3,
    question: `On mélange 0,1 mol de méthylamine $\\text{CH}_3\\text{NH}_2$ (pKa = 10,66) avec une solution aqueuse de HCl de concentration 0,1 mol/L. La solution obtenue est :`,
    answers: [
      {
        id: '1',
        text: 'Neutre (pH = 7) car les quantités de réactifs sont stœchiométriques.',
        isCorrect: false,
        explanation:
          'Non ! Même si les quantités sont stœchiométriques, le sel formé $\\text{CH}_3\\text{NH}_3^+\\text{Cl}^-$ est l\'acide conjugué d\'une base faible. En solution aqueuse, $\\text{CH}_3\\text{NH}_3^+$ libère des ions $\\text{H}^+$ : la solution est donc ACIDE (pH < 7).',
        wolofExplanation:
          'Dédët. Ak amines ak acides forts, sel d\'ammonium la jëlee. Sel bi acidifie solution bi car $\\text{CH}_3\\text{NH}_3^+$ mëna joxe $\\text{H}^+$ ci ndox. pH < 7 !',
      },
      {
        id: '2',
        text: 'Basique (pH > 7) car l\'amine est un excès de base.',
        isCorrect: false,
        explanation:
          'Non, les quantités sont ici stœchiométriques (0,1 mol d\'amine et 0,1 mol de HCl). Il n\'y a pas d\'excès d\'amine. La totalité de la méthylamine est consommée pour donner $\\text{CH}_3\\text{NH}_3^+$ (sel d\'ammonium). Mais ce sel est légèrement acide.',
        wolofExplanation: 'Dédët. Amine bi consommée lool par HCl bi. Amul dara ku far. Sel bi nekk ci jëm, dafa acide légèrement.',
      },
      {
        id: '3',
        text: 'Acide (pH < 7) car le sel d\'alkylammonium formé est l\'acide conjugué d\'une base faible.',
        isCorrect: true,
        explanation:
          'CORRECT ! La réaction entre la méthylamine et HCl est totale : $\\text{CH}_3\\text{NH}_2 + \\text{HCl} \\to \\text{CH}_3\\text{NH}_3^+\\text{Cl}^-$. Le sel $\\text{CH}_3\\text{NH}_3^+$ est l\'acide conjugué de la méthylamine (base faible). En solution aqueuse, il établit un équilibre d\'hydrolyse acide : $\\text{CH}_3\\text{NH}_3^+ + \\text{H}_2\\text{O} \\rightleftharpoons \\text{CH}_3\\text{NH}_2 + \\text{H}_3\\text{O}^+$, rendant la solution légèrement acide. pH = pKa/2 ≈ 5,33.',
        wolofExplanation:
          'Waaw ! Sel $\\text{CH}_3\\text{NH}_3^+\\text{Cl}^-$ bi jëlee. Sel bi mooy acide conjugué u méthylamine. Ci ndox, dafay def réaction : $\\text{CH}_3\\text{NH}_3^+ \\to \\text{CH}_3\\text{NH}_2 + \\text{H}^+$. Looloo tax solution bi acide (pH < 7) !',
      },
      {
        id: '4',
        text: 'L\'état acide ou basique ne peut pas être déterminé sans le volume de la solution.',
        isCorrect: false,
        explanation:
          'Le pH de la solution dépend des concentrations (et donc du volume), mais le caractère ACIDE ou BASIQUE dépend uniquement de la nature du soluté. Le sel $\\text{CH}_3\\text{NH}_3^+\\text{Cl}^-$ d\'une base faible conduit toujours à une solution acide, quelle que soit la concentration.',
        wolofExplanation: 'Dédët. Bu la xoo volume bi du gënn bagne xam solution bi acide walla basique. Nature u sel bi bi moo seet !',
      },
    ],
  },
  {
    id: 'q7',
    difficulty: 3,
    question: `Dans la synthèse d'Hofmann, on fait réagir l'éthanamine $\\text{CH}_3\\text{CH}_2\\text{NH}_2$ avec un excès de chlorure de méthyle $\\text{CH}_3\\text{Cl}$. Le produit final majoritaire est :`,
    answers: [
      {
        id: '1',
        text: '$N$-méthyléthanamine (amine secondaire)',
        isCorrect: false,
        explanation:
          'Avec un EXCÈS de $\\text{CH}_3\\text{Cl}$, la polyalkylation se poursuit au-delà de l\'amine secondaire. L\'amine secondaire est un intermédiaire réactionnel, pas le produit final majoritaire.',
        wolofExplanation: 'Dédët. Ak excès CH₃Cl bi, réaction bi dëkk dëkk ba sel quaternaire. Amine secondaire dafa intermédiaire rek !',
      },
      {
        id: '2',
        text: '$N,N$-diméthyléthanamine (amine tertiaire)',
        isCorrect: false,
        explanation:
          'L\'amine tertiaire est également un intermédiaire car avec un EXCÈS d\'halogénoalcane, la polyalkylation continue encore un cran pour donner le sel d\'ammonium quaternaire.',
        wolofExplanation: 'Dédët. Ak excès CH₃Cl, amine tertiaire bi mëna doli ba sel quaternaire. Dafa intermédiaire rek !',
      },
      {
        id: '3',
        text: 'Chlorure de triméthyléthylammonium (sel quaternaire $[(\\text{CH}_3)_3\\text{NCH}_2\\text{CH}_3]^+\\text{Cl}^-$)',
        isCorrect: true,
        explanation:
          'CORRECT ! Avec un excès de $\\text{CH}_3\\text{Cl}$, la polyalkylation de l\'éthanamine se déroule en trois étapes successives : $1^\\circ \\to 2^\\circ \\to 3^\\circ \\to$ sel quaternaire. Le produit FINAL est l\'ion ammonium quaternaire $[(\\text{CH}_3)_3\\text{N}\\text{CH}_2\\text{CH}_3]^+$ associé à l\'ion chlorure $\\text{Cl}^-$. La réaction s\'arrête ici car l\'azote ne peut plus accepter d\'autres substituants (il est lié à 4 carbones, charges positives stabilisées).',
        wolofExplanation:
          'Waaw ! Ak excès CH₃Cl, alkylation bi dëkk dëkk ba sel quaternaire. Azote bi dola 4 liaisons ak charge positive. Du mëna dem ci nopi ! Sel quaternaire mooy produit terminal bi.',
      },
      {
        id: '4',
        text: 'La réaction ne se produit pas car l\'éthanamine est trop nucléophile.',
        isCorrect: false,
        explanation:
          'Totalement faux ! C\'est justement parce que les amines sont d\'excellents nucléophiles (doublet libre sur N) qu\'elles réagissent si bien avec les halogénoalcanes $R\'\\text{X}$ dans la réaction de Hofmann.',
        wolofExplanation: 'Dédët. Amines yi dañuy rekkaat bi baax ak halogénoalcanes ndax ñoom ñuy nucleophile bu baax !',
      },
    ],
  },
  {
    id: 'q8',
    difficulty: 1,
    question: `Parmi les composés suivants, lequel ne peut PAS former un amide par réaction avec un chlorure d'acyle ?`,
    answers: [
      {
        id: '1',
        text: 'Éthanamine $\\text{CH}_3\\text{CH}_2\\text{NH}_2$ (amine primaire)',
        isCorrect: false,
        explanation:
          'Faux. Les amines primaires possèdent 2 hydrogènes sur l\'azote. Elles peuvent parfaitement former des amides par réaction avec un chlorure d\'acyle.',
        wolofExplanation: 'Dédët. Amine primaire dafa am 2H ci N. Dafa mëna def amide !',
      },
      {
        id: '2',
        text: '$N$-méthyléthanamine $\\text{CH}_3\\text{CH}_2\\text{NHCH}_3$ (amine secondaire)',
        isCorrect: false,
        explanation:
          'Faux. Les amines secondaires possèdent 1 hydrogène sur l\'azote. Elles forment des amides $N$-substitués par réaction avec les chlorures d\'acyle.',
        wolofExplanation: 'Dédët. Amine secondaire am na 1H ci N. Dafa mëna def amide N-substitué !',
      },
      {
        id: '3',
        text: 'Triméthylamine $(\\text{CH}_3)_3\\text{N}$ (amine tertiaire)',
        isCorrect: true,
        explanation:
          'CORRECT ! L\'amine tertiaire $(\\text{CH}_3)_3\\text{N}$ ne possède AUCUN hydrogène lié à l\'azote. Pour former un amide, il faut obligatoirement qu\'un H quitte l\'azote lors de la réaction avec le chlorure d\'acyle. Comme il n\'y en a pas, la formation d\'amide est IMPOSSIBLE. La seule réaction possible est la formation d\'un sel d\'ammonium quaternaire (alkylation).',
        wolofExplanation:
          'Waaw ! Triméthylamine amul benn H ci azote. Bu fekkee amide nga bëggée def, warnga am H ci N pour génn. Du mëna ! Dafa mëna def rek sel quaternaire.',
      },
      {
        id: '4',
        text: 'Aniline $\\text{C}_6\\text{H}_5\\text{NH}_2$ (amine aromatique primaire)',
        isCorrect: false,
        explanation:
          'Faux. L\'aniline est une amine primaire qui possède 2 hydrogènes sur N. Elle forme l\'acétanilide ($\\text{CH}_3\\text{CO}-\\text{NH}-\\text{C}_6\\text{H}_5$) par réaction avec le chlorure d\'acétyle.',
        wolofExplanation: 'Dédët. Aniline amine primaire la am na 2H ci N. Dafa def acétanilide ak chlorure d\'acétyle !',
      },
    ],
  },
  {
    id: 'q9',
    difficulty: 2,
    question: `La formule brute d'une amine aliphatique saturée est $\\text{C}_4\\text{H}_{11}\\text{N}$. Combien d'amines isomères (en ne comptant que les amines, pas les autres fonctions) correspondant à cette formule existent-elles ?`,
    answers: [
      {
        id: '1',
        text: '4 isomères',
        isCorrect: false,
        explanation: 'Non. En dénombrant systématiquement : 4 amines primaires (butan-1-amine, butan-2-amine, 2-méthylpropan-1-amine, 2-méthylpropan-2-amine) + 3 amines secondaires ($N$-méthylpropan-1-amine, $N$-méthylpropan-2-amine, $N$-éthyléthanamine) + 1 amine tertiaire ($N,N$-diméthyléthanamine) = 8 isomères.',
        wolofExplanation: 'Dédët. Dëkk rek ! Warnga xool amines primaires, secondaires ak tertiaires yépp.',
      },
      {
        id: '2',
        text: '8 isomères',
        isCorrect: true,
        explanation:
          'CORRECT ! Il existe 8 amines isomères de formule $\\text{C}_4\\text{H}_{11}\\text{N}$ :\n**Amines primaires (4)** : butan-1-amine, butan-2-amine, 2-méthylpropan-1-amine, 2-méthylpropan-2-amine.\n**Amines secondaires (3)** : $N$-méthylpropan-1-amine, $N$-méthylpropan-2-amine, $N$-éthyléthanamine.\n**Amines tertiaires (1)** : $N,N$-diméthyléthanamine.',
        wolofExplanation:
          'Waaw ! 8 isomères amines yi nek ci $\\text{C}_4\\text{H}_{11}\\text{N}$ : 4 primaires + 3 secondaires + 1 tertiaire. Bu la bëggée comptabiliser ci Bac, def ko systématiquement !',
      },
      {
        id: '3',
        text: '6 isomères',
        isCorrect: false,
        explanation: 'Non, ce chiffre est incomplet. Il faut recenser toutes les amines primaires (en incluant les ramifications), secondaires et tertiaires. Le total correct est 8.',
        wolofExplanation: 'Dédët. Waanga loi ci 8. Récompte amines primaires bu jëm ci formes ramifiées yi !',
      },
      {
        id: '4',
        text: '12 isomères',
        isCorrect: false,
        explanation: 'Non, vous comptez trop. Il y a exactement 8 amines isomères de $\\text{C}_4\\text{H}_{11}\\text{N}$. Les amides, imines et autres fonctions ne sont pas des amines.',
        wolofExplanation: 'Dédët, gën na toll. 8 rek la amines yi am. Bul jël amides walla fonctions yeneen !',
      },
    ],
  },
  {
    id: 'q10',
    difficulty: 3,
    question: `On dispose de trois solutions de même concentration : aniline $(pK_a = 4{,}63)$, ammoniac $(pK_a = 9{,}21)$ et méthylamine $(pK_a = 10{,}66)$. On ajoute quelques gouttes d'indicateur universel à chaque solution. Quel est l'ordre des pH observés (du plus petit au plus grand) ?`,
    answers: [
      {
        id: '1',
        text: 'pH(méthylamine) < pH(ammoniac) < pH(aniline)',
        isCorrect: false,
        explanation:
          'C\'est l\'ordre inverse ! Une base plus forte (pKa plus grand) se dissocie plus dans l\'eau et crée plus d\'ions $\\text{OH}^-$, ce qui donne un pH PLUS ÉLEVÉ, pas plus faible.',
        wolofExplanation: 'Dédët, dañuy terer ! Base bu forcé → gën a am OH⁻ → pH gën a gudd (plus basique) !',
      },
      {
        id: '2',
        text: 'pH(aniline) < pH(ammoniac) < pH(méthylamine)',
        isCorrect: true,
        explanation:
          'CORRECT ! Le pH d\'une solution aqueuse de base faible de même concentration $C$ est approximativement : $\\text{pH} \\approx 7 + \\frac{1}{2}(\\text{pKa} + \\log C)$. Plus le pKa est grand, plus la base est forte et plus le pH est élevé. Aniline (pKa le plus petit = 4,63) → pH le plus bas ; méthylamine (pKa le plus grand = 10,66) → pH le plus élevé.',
        wolofExplanation:
          'Waaw ! Bu pKa gën a gudd, base bi gën a forte, pH bi gën a gudd (plus basique). Aniline pKa bi gën a néew → gën a néew pH. Méthylamine pKa bi gën a gudd → gën a gudd pH !',
      },
      {
        id: '3',
        text: 'pH(ammoniac) < pH(aniline) < pH(méthylamine)',
        isCorrect: false,
        explanation:
          'Non. NH₃ a un pKa de 9,21 et l\'aniline un pKa de 4,63. Donc NH₃ est une base plus forte que l\'aniline et sa solution a un pH plus élevé, pas plus faible.',
        wolofExplanation: 'Dédët. NH₃ pKa (9,21) gën a gudd ku aniline (4,63) → NH₃ gën a basique → pH u NH₃ gën a gudd.',
      },
      {
        id: '4',
        text: 'Les trois pH sont identiques car les concentrations sont égales.',
        isCorrect: false,
        explanation:
          'Non ! Même à concentration égale, le pH dépend du degré d\'ionisation de la base, qui lui-même dépend du pKa. Des bases de forces différentes donnent des pH différents à la même concentration.',
        wolofExplanation: 'Dédët. Même concentration bi du gënn am kenn pH. pH bi depand ci pKa u amine bi ! Bases yu xëy dañuy def pH yu xëy !',
      },
    ],
  },
];

/* ============================================================
   SHUFFLE
   ============================================================ */
function shuffleArray<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function processQuestions(raw: RawQuestion[]): ProcessedQuestion[] {
  const LETTERS = ['A', 'B', 'C', 'D'];
  return raw.map((q) => {
    const shuffled = shuffleArray(q.answers);
    return {
      id: q.id,
      question: q.question,
      difficulty: q.difficulty,
      answers: shuffled.map((a, i) => ({
        letter: LETTERS[i],
        text: a.text,
        isCorrect: a.isCorrect,
        explanation: a.explanation,
        wolofExplanation: a.wolofExplanation,
      })),
    };
  });
}

/* ============================================================
   COMPOSANT PRINCIPAL QUIZ
   ============================================================ */
export default function AminesQuizEmbedded() {
  const [questions] = useState<ProcessedQuestion[]>(() =>
    processQuestions(QUESTION_BANK)
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [showWolof, setShowWolof] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean[]>(
    new Array(QUESTION_BANK.length).fill(false)
  );
  const [finished, setFinished] = useState(false);

  const current = questions[currentIndex];
  const isAnswered = answered[currentIndex];
  const correctAnswer = current.answers.find((a) => a.isCorrect);
  const selectedAnswer = current.answers.find((a) => a.letter === selected);

  const handleSelect = useCallback(
    (letter: string) => {
      if (isAnswered) return;
      setSelected(letter);
      setShowExplanation(true);
      const ans = current.answers.find((a) => a.letter === letter);
      if (ans?.isCorrect) setScore((prev) => prev + 1);
      setAnswered((prev) => {
        const next = [...prev];
        next[currentIndex] = true;
        return next;
      });
    },
    [isAnswered, current.answers, currentIndex]
  );

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((p) => p + 1);
      setSelected(null);
      setShowExplanation(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelected(null);
    setShowExplanation(false);
    setScore(0);
    setAnswered(new Array(QUESTION_BANK.length).fill(false));
    setFinished(false);
  };

  const diffColor = { 1: 'emerald', 2: 'blue', 3: 'rose' }[current.difficulty];
  const diffLabel = { 1: 'Facile', 2: 'Intermédiaire', 3: 'Difficile' }[current.difficulty];

  if (finished) {
    const pct = Math.round((score / questions.length) * 100);
    const mention =
      pct >= 80
        ? { label: 'Excellent ! 🏆', color: 'text-emerald-700', bg: 'bg-emerald-50 border-emerald-200' }
        : pct >= 60
        ? { label: 'Bien ! 👍', color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' }
        : { label: 'À retravailler 📖', color: 'text-rose-700', bg: 'bg-rose-50 border-rose-200' };

    return (
      <div className="my-10 rounded-3xl border border-indigo-200/70 bg-white p-8 shadow-xl text-center">
        <div className="text-5xl mb-4">🎯</div>
        <h3 className="text-2xl font-black text-slate-900 mb-2">
          Quiz C2 — Amines terminé !
        </h3>
        <div className={`inline-block mt-3 rounded-2xl border px-6 py-4 ${mention.bg}`}>
          <p className={`text-3xl font-black ${mention.color}`}>
            {score} / {questions.length}
          </p>
          <p className={`text-sm font-bold mt-1 ${mention.color}`}>{mention.label}</p>
          <p className="text-xs text-slate-500 mt-0.5">{pct}% de bonnes réponses</p>
        </div>
        <button
          onClick={handleRestart}
          className="mt-6 px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 shadow-md shadow-indigo-500/20 transition"
        >
          🔄 Recommencer le Quiz Amines
        </button>
      </div>
    );
  }

  return (
    <div className="my-10 rounded-3xl border border-indigo-200/70 bg-gradient-to-br from-white via-indigo-50/20 to-blue-50/20 p-5 md:p-8 shadow-xl shadow-indigo-500/5">
      {/* Header */}
      <div className="mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-indigo-100 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-500/30 text-xl font-black">
            🧠
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Quiz Interactif • C2 Physique-Chimie S2
            </p>
            <h3 className="text-lg font-black text-slate-900">Amines — Baccalauréat S2 Sénégal</h3>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-bold bg-white/80 border border-slate-200 rounded-full px-3 py-1 shadow-sm">
            {score} pts · Q{currentIndex + 1}/{questions.length}
          </span>
          <button
            onClick={() => setShowWolof((v) => !v)}
            className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all ${showWolof ? 'bg-amber-500 text-white border-amber-500' : 'bg-amber-50 text-amber-700 border-amber-300 hover:bg-amber-100'}`}
          >
            💡 Wolof
          </button>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-5 w-full bg-slate-100 rounded-full h-2 overflow-hidden">
        <div
          className="h-2 bg-gradient-to-r from-indigo-500 to-blue-400 rounded-full transition-all duration-500"
          style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="mb-5">
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-block text-xs font-bold border rounded-full px-2.5 py-0.5 bg-${diffColor}-50 text-${diffColor}-700 border-${diffColor}-200`}>
            {diffLabel}
          </span>
          <span className="text-xs text-slate-400">
            Question {currentIndex + 1} sur {questions.length}
          </span>
        </div>
        <div className="text-sm md:text-base font-semibold text-slate-900 leading-relaxed rounded-xl bg-white border border-slate-200/60 p-4 shadow-sm">
          <MathRenderer content={current.question} />
        </div>
      </div>

      {/* Answers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
        {current.answers.map((ans) => {
          let style =
            'border-slate-200 bg-white hover:border-indigo-300 hover:bg-indigo-50/50 cursor-pointer';
          if (isAnswered) {
            if (ans.isCorrect)
              style = 'border-emerald-400 bg-emerald-50 shadow-md shadow-emerald-200/50 cursor-default';
            else if (ans.letter === selected)
              style = 'border-rose-400 bg-rose-50 shadow-md shadow-rose-200/50 cursor-default';
            else style = 'border-slate-100 bg-slate-50 opacity-60 cursor-default';
          } else if (ans.letter === selected) {
            style = 'border-indigo-500 bg-indigo-50 cursor-pointer';
          }

          return (
            <button
              key={ans.letter}
              onClick={() => handleSelect(ans.letter)}
              disabled={isAnswered}
              className={`flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all ${style}`}
            >
              <span
                className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-black ${
                  isAnswered && ans.isCorrect
                    ? 'bg-emerald-500 text-white'
                    : isAnswered && ans.letter === selected && !ans.isCorrect
                    ? 'bg-rose-500 text-white'
                    : 'bg-slate-100 text-slate-700'
                }`}
              >
                {isAnswered && ans.isCorrect ? '✓' : isAnswered && ans.letter === selected ? '✗' : ans.letter}
              </span>
              <span className="text-xs md:text-sm font-semibold text-slate-800 leading-relaxed">
                <MathRenderer content={ans.text} />
              </span>
            </button>
          );
        })}
      </div>

      {/* Explanation */}
      {showExplanation && correctAnswer && (
        <div className="mb-5 space-y-3">
          <div
            className={`rounded-xl border p-4 ${
              selectedAnswer?.isCorrect
                ? 'border-emerald-200 bg-emerald-50'
                : 'border-rose-200 bg-rose-50'
            }`}
          >
            <p
              className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                selectedAnswer?.isCorrect ? 'text-emerald-800' : 'text-rose-800'
              }`}
            >
              {selectedAnswer?.isCorrect ? '✅ Excellente réponse !' : '❌ Réponse incorrecte'}
            </p>
            <div className="text-sm font-semibold text-slate-800 leading-relaxed">
              <MathRenderer content={correctAnswer.explanation} />
            </div>
          </div>
          {showWolof && correctAnswer.wolofExplanation && (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
              <p className="text-xs font-bold text-amber-900 uppercase tracking-wider mb-1">
                💡 Xam-xam ci Wolof
              </p>
              <p className="text-sm text-amber-900 italic">{correctAnswer.wolofExplanation}</p>
            </div>
          )}
        </div>
      )}

      {/* Next Button */}
      {isAnswered && (
        <button
          onClick={handleNext}
          className="w-full rounded-xl bg-indigo-600 py-3 font-bold text-white text-sm hover:bg-indigo-700 shadow-md shadow-indigo-500/20 transition"
        >
          {currentIndex + 1 < questions.length ? 'Question suivante →' : 'Voir les résultats 🏁'}
        </button>
      )}
    </div>
  );
}

