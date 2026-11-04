'use client';

import React, { useState } from 'react';
import MathRenderer from '@/components/course/math-renderer';
import { CheckCircle, XCircle, Star, Lightbulb, Trophy, RotateCcw } from 'lucide-react';

interface QuizQuestion {
  id: number;
  stars: number;
  points: number;
  question: string;
  answers: string[];
  correctIndex: number;
  explanation: string;
  wolof?: string;
}

const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    stars: 1,
    points: 1,
    question:
      "Un acide faible HA de concentration $C = 0{,}10\\text{ mol/L}$ se dissocie partiellement dans l'eau. Quelle expression représente la constante d'acidité $K_a$ du couple $\\text{HA}/\\text{A}^-$ ?",
    answers: [
      "$K_a = \\dfrac{[\\text{A}^-][\\text{H}_3\\text{O}^+]}{[\\text{HA}]}$",
      "$K_a = \\dfrac{[\\text{HA}]}{[\\text{A}^-][\\text{H}_3\\text{O}^+]}$",
      "$K_a = [\\text{A}^-][\\text{H}_3\\text{O}^+][\\text{HA}]$",
      "$K_a = \\dfrac{[\\text{A}^-][\\text{H}_3\\text{O}^+]}{[\\text{HA}][\\text{H}_2\\text{O}]}$",
    ],
    correctIndex: 0,
    explanation:
      "Par définition, $K_a = \\dfrac{[\\text{A}^-][\\text{H}_3\\text{O}^+]}{[\\text{HA}]}$. L'eau est le solvant : son activité thermodynamique est 1 par convention, elle n'apparaît JAMAIS au dénominateur de $K_a$. Cette formule est valable pour tout couple acide faible / base conjuguée.",
    wolof:
      "« Ka bi dafa bind : ions yi (A⁻ ak H₃O⁺) ci biir, molécule HA bi ci suuf. Ndox mi du sonn ci formule bi ! »",
  },
  {
    id: 2,
    stars: 1,
    points: 1,
    question:
      "L'acide acétique $\\text{CH}_3\\text{COOH}$ a un $pK_a = 4{,}75$ à $25^\\circ\\text{C}$. Quel est son $K_a$ ?",
    answers: [
      "$K_a = 10^{-4{,}75} \\approx 1{,}78 \\times 10^{-5}\\text{ mol/L}$",
      "$K_a = 10^{+4{,}75} \\approx 5{,}6 \\times 10^{4}\\text{ mol/L}$",
      "$K_a = 4{,}75 \\times 10^{-14}$",
      "$K_a = \\dfrac{14}{4{,}75}$",
    ],
    correctIndex: 0,
    explanation:
      "Par définition $pK_a = -\\log K_a$, donc $K_a = 10^{-pK_a} = 10^{-4{,}75} \\approx 1{,}78 \\times 10^{-5}$. Plus le $pK_a$ est petit, plus le $K_a$ est grand et plus l'acide est fort. L'acide acétique est un acide faible car $K_a \\ll 1$.",
    wolof: "« pKa = -log Ka, donc Ka = 10^(-pKa). Bu pKa bi tuuti, acide bi dafa gën a dëgër ! »",
  },
  {
    id: 3,
    stars: 2,
    points: 2,
    question:
      "Une solution tampon contient $[\\text{CH}_3\\text{COO}^-] = 0{,}10\\text{ mol/L}$ et $[\\text{CH}_3\\text{COOH}] = 0{,}05\\text{ mol/L}$. Sachant que $pK_a = 4{,}75$, quel est le pH de cette solution ?",
    answers: [
      "$\\text{pH} = 4{,}75 + \\log(0{,}10/0{,}05) = 4{,}75 + \\log(2) \\approx 5{,}05$",
      "$\\text{pH} = 4{,}75 - \\log(2) \\approx 4{,}45$",
      "$\\text{pH} = 4{,}75$",
      "$\\text{pH} = 7{,}00$",
    ],
    correctIndex: 0,
    explanation:
      "On applique la relation d'Henderson-Hasselbalch : $\\text{pH} = pK_a + \\log\\!\\left(\\dfrac{[\\text{Base}]}{[\\text{Acide}]}\\right) = 4{,}75 + \\log\\!\\left(\\dfrac{0{,}10}{0{,}05}\\right) = 4{,}75 + \\log(2) = 4{,}75 + 0{,}30 = 5{,}05$. Comme $[\\text{A}^-] > [\\text{HA}]$, la base prédomine et le pH est supérieur au $pK_a$.",
    wolof: "« pH = pKa + log(Base/Acide). Bu base bi ëpp ak acide bi, pH bi dafa yéeg ci pKa bi ! »",
  },
  {
    id: 4,
    stars: 2,
    points: 2,
    question:
      "À quelle condition les concentrations de la forme acide $\\text{HA}$ et de la forme basique $\\text{A}^-$ d'un couple acide-base faible sont-elles égales ?",
    answers: [
      "Quand $\\text{pH} = pK_a$",
      "Quand $\\text{pH} = 7{,}00$",
      "Quand $\\text{pH} = 0$",
      "Quand $[\\text{HA}] = C/2$ où $C$ est la concentration totale",
    ],
    correctIndex: 0,
    explanation:
      "D'après la relation d'Henderson : $\\text{pH} = pK_a + \\log\\!\\left(\\dfrac{[\\text{A}^-]}{[\\text{HA}]}\\right)$. Si $[\\text{A}^-] = [\\text{HA}]$, alors $\\log\\!\\left(\\dfrac{[\\text{A}^-]}{[\\text{HA}]}\\right) = \\log(1) = 0$, donc $\\text{pH} = pK_a$. C'est également le point où la courbe de distribution des deux espèces se croise à 50 % sur le diagramme.",
    wolof: "« Bu pH = pKa, dañu def 50-50 ! [HA] = [A⁻]. Ci diagramme bi, dañuy fàtte ci pKa bi ! »",
  },
  {
    id: 5,
    stars: 2,
    points: 2,
    question:
      "Sur un diagramme de prédominance du couple $\\text{HA}/\\text{A}^-$ avec $pK_a = 6{,}35$, quelle espèce prédomine si le pH de la solution est $8{,}00$ ?",
    answers: [
      "La base $\\text{A}^-$ prédomine car $\\text{pH} = 8{,}00 > pK_a = 6{,}35$",
      "L'acide $\\text{HA}$ prédomine car $\\text{pH} = 8{,}00 > 7{,}00$",
      "Les deux espèces coexistent à parts égales",
      "L'acide $\\text{HA}$ prédomine car $pK_a = 6{,}35 < 7{,}00$",
    ],
    correctIndex: 0,
    explanation:
      "La règle fondamentale du diagramme de prédominance : **si pH $> pK_a$**, la forme **basique $\\text{A}^-$ prédomine** ; **si pH $< pK_a$**, la forme **acide $\\text{HA}$ prédomine** ; à pH $= pK_a$, les deux sont en concentrations égales (50 % chacune). Ici pH $= 8{,}00 > 6{,}35 = pK_a$, donc $\\text{A}^-$ prédomine largement.",
    wolof:
      "« Bu pH gën a rëy pKa, base bi moo gëna ëpp. Bu pH tuuti ci pKa, acide bi moo ëpp. Règle bi moo doon ! »",
  },
  {
    id: 6,
    stars: 3,
    points: 3,
    question:
      "Un acide faible $\\text{HA}$ de concentration $C = 0{,}10\\text{ mol/L}$ a un $pK_a = 5{,}00$. On mesure $\\text{pH} = 3{,}00$. Calculer le coefficient de dissociation $\\alpha$.",
    answers: [
      "$\\alpha = \\dfrac{[\\text{H}_3\\text{O}^+]}{C} = \\dfrac{10^{-3}}{0{,}10} = 0{,}010 = 1\\%$",
      "$\\alpha = \\dfrac{K_a}{C} = \\dfrac{10^{-5}}{0{,}10} = 10^{-4}$",
      "$\\alpha = \\dfrac{\\text{pH}}{pK_a} = \\dfrac{3{,}00}{5{,}00} = 0{,}60$",
      "$\\alpha = \\sqrt{K_a / C} = \\sqrt{10^{-4}} = 0{,}01$",
    ],
    correctIndex: 0,
    explanation:
      "Le coefficient de dissociation est $\\alpha = \\dfrac{[\\text{H}_3\\text{O}^+]}{C}$ (pour un acide faible en solution, la dissociation produit autant de $\\text{H}_3\\text{O}^+$ que de $\\text{A}^-$). Ici $[\\text{H}_3\\text{O}^+] = 10^{-\\text{pH}} = 10^{-3}\\text{ mol/L}$, donc $\\alpha = \\dfrac{10^{-3}}{0{,}10} = 0{,}010$, soit $1\\%$. L'acide se dissocie très peu, ce qui est caractéristique d'un acide faible.",
    wolof:
      "« Alpha = [H₃O⁺] / C. Dafa bind : xaar pH bi, def 10^(-pH), ci tëdq ak C. 1% rekk la jëlee ! »",
  },
  {
    id: 7,
    stars: 3,
    points: 3,
    question:
      "On dilue une solution d'acide acétique ($pK_a = 4{,}75$) de concentration $C_1 = 0{,}10\\text{ mol/L}$ à $C_2 = 0{,}001\\text{ mol/L}$ (dilution par 100). Comment évoluent le coefficient de dissociation $\\alpha$ et le pH ?",
    answers: [
      "$\\alpha$ augmente (dilution favorise la dissociation) et le pH augmente (solution moins acide)",
      "$\\alpha$ diminue et le pH diminue",
      "$\\alpha$ et le pH restent constants",
      "$\\alpha$ augmente mais le pH diminue",
    ],
    correctIndex: 0,
    explanation:
      "D'après la loi de dilution d'Ostwald : $K_a \\approx \\dfrac{\\alpha^2 C}{1 - \\alpha} \\approx \\alpha^2 C$ (si $\\alpha \\ll 1$), donc $\\alpha \\approx \\sqrt{K_a/C}$. Quand $C$ diminue (dilution), $\\alpha$ **augmente** : une solution plus diluée se dissocie davantage. Mais $[\\text{H}_3\\text{O}^+] = \\alpha C \\approx \\sqrt{K_a \\cdot C}$ **diminue** quand $C$ diminue, donc le pH **augmente** (solution moins acide). Le pH tend vers 7 mais ne le dépasse jamais.",
    wolof:
      "« Bu ñu yegël ndox : alpha (taux dissociation) dafa yokk waaye [H₃O⁺] dafa wàcc, motax pH bi dafa yéeg. Loi de dilution d'Ostwald la ! »",
  },
  {
    id: 8,
    stars: 3,
    points: 3,
    question:
      "Deux couples acide-base ont pour $pK_a$ : $pK_{a1}(\\text{HA}_1/\\text{A}_1^-) = 3{,}20$ et $pK_{a2}(\\text{HA}_2/\\text{A}_2^-) = 7{,}40$. Lequel des acides est le plus fort et pourquoi ?",
    answers: [
      "$\\text{HA}_1$ est le plus fort car $pK_{a1} = 3{,}20 < pK_{a2} = 7{,}40$, donc $K_{a1} > K_{a2}$",
      "$\\text{HA}_2$ est le plus fort car $pK_{a2} = 7{,}40 > pK_{a1} = 3{,}20$",
      "Les deux acides ont la même force si leur concentration est identique",
      "$\\text{HA}_1$ est le plus fort car son $pK_a$ est proche de 7",
    ],
    correctIndex: 0,
    explanation:
      "La force d'un acide faible est mesurée par son $K_a$ (ou inversement par son $pK_a$). **Plus le $pK_a$ est petit, plus le $K_a$ est grand et plus l'acide est fort** (il se dissocie davantage). Ici $pK_{a1} = 3{,}20 < pK_{a2} = 7{,}40$, donc $K_{a1} = 10^{-3{,}20} \\approx 6{,}3 \\times 10^{-4} \\gg K_{a2} = 10^{-7{,}40} \\approx 4{,}0 \\times 10^{-8}$ : $\\text{HA}_1$ est beaucoup plus fort que $\\text{HA}_2$.",
    wolof:
      "« Bu pKa bi tuuti, acide bi dafa gën a dëgër (Ka gën a rëy). Bu pKa bi rëy, acide bi dëgërul (Ka tuuti). Règle bi moo doon : pKa ↓ = force ↑ ! »",
  },
  {
    id: 9,
    stars: 4,
    points: 4,
    question:
      "On mélange 50 mL d'une solution d'acide acétique ($pK_a = 4{,}75$, $C_a = 0{,}20\\text{ mol/L}$) avec 50 mL d'une solution d'acétate de sodium ($C_b = 0{,}10\\text{ mol/L}$). Quel est le pH du mélange obtenu ?",
    answers: [
      "$\\text{pH} = 4{,}75 + \\log\\!\\left(\\dfrac{n_{\\text{A}^-}}{n_{\\text{HA}}}\\right) = 4{,}75 + \\log\\!\\left(\\dfrac{5{,}0}{10{,}0}\\right) = 4{,}75 + \\log(0{,}50) \\approx 4{,}45$",
      "$\\text{pH} = 4{,}75$",
      "$\\text{pH} = 4{,}75 + \\log\\!\\left(\\dfrac{10{,}0}{5{,}0}\\right) \\approx 5{,}05$",
      "$\\text{pH} = \\dfrac{4{,}75}{2} = 2{,}375$",
    ],
    correctIndex: 0,
    explanation:
      "Dans la relation d'Henderson, on peut utiliser les **quantités de matière** (les volumes se simplifient dans le rapport) : $n_{\\text{HA}} = C_a \\times V_a = 0{,}20 \\times 0{,}050 = 10{,}0 \\times 10^{-3}\\text{ mol}$ et $n_{\\text{A}^-} = C_b \\times V_b = 0{,}10 \\times 0{,}050 = 5{,}0 \\times 10^{-3}\\text{ mol}$. Donc $\\text{pH} = 4{,}75 + \\log\\!\\left(\\dfrac{5{,}0}{10{,}0}\\right) = 4{,}75 - 0{,}30 = 4{,}45$. Comme $n_{\\text{HA}} > n_{\\text{A}^-}$, l'acide prédomine et pH $<pK_a$.",
    wolof:
      "« Henderson-Hasselbalch : pH = pKa + log(n_base / n_acide). Dafa séddale quantités yi (volumes yi du waral ndax dañuy jëlee). »",
  },
  {
    id: 10,
    stars: 4,
    points: 4,
    question:
      "Un indicateur coloré $\\text{HIn}/\\text{In}^-$ a un $pK_i = 5{,}0$. Dans quelle zone de pH la **teinte sensible** (mélange des deux couleurs) est-elle visible ? Et pourquoi le Bleu de Bromothymol (BBT, $pK_i = 7{,}0$) ne convient-il PAS pour titrer un acide faible par une base forte si le $\\text{pH}_E \\approx 9{,}0$ ?",
    answers: [
      "La teinte sensible est visible pour $\\text{pH} \\in [4{,}0 \\,;\\, 6{,}0]$. Le BBT ne convient pas car $\\text{pH}_E = 9{,}0 \\notin [6{,}0 \\,;\\, 7{,}0]$ : il aurait déjà complètement viré avant l'équivalence.",
      "La teinte sensible est visible pour $\\text{pH} \\in [3{,}0 \\,;\\, 7{,}0]$. Le BBT convient toujours.",
      "La teinte sensible est visible pour $\\text{pH} = 5{,}0$ seulement. Le BBT ne convient pas car $7{,}0 \\ne 9{,}0$.",
      "La zone de virage est $[4{,}0 \\,;\\, 5{,}0]$ et le BBT ne convient que si $\\text{pH}_E < 7{,}0$.",
    ],
    correctIndex: 0,
    explanation:
      "La **zone de virage** (teinte sensible visible) d'un indicateur de $pK_i$ est l'intervalle $[pK_i - 1 \\,;\\, pK_i + 1]$. Pour $pK_i = 5{,}0$ : zone $= [4{,}0 \\,;\\, 6{,}0]$. Pour le **BBT** ($pK_i = 7{,}0$), la zone de virage est $[6{,}0 \\,;\\, 7{,}0]$ (teinte verte). Si $\\text{pH}_E = 9{,}0$ (titrage d'un acide faible), le pH traverse $[6{,}0 \\,;\\, 7{,}0]$ **avant** l'équivalence : le BBT vire trop tôt, il n'est pas adapté. Il faut choisir la **phénolphtaléine** (zone $[8{,}2 \\,;\\, 10{,}0]$) car $9{,}0 \\in [8{,}2 \\,;\\, 10{,}0]$.",
    wolof:
      "« Zone virage bi mooy [pKi-1 ; pKi+1]. BBT bi zone bii [6,0 ; 7,0] la am. Bu pHE = 9,0, BBT bi dafa wàcc trop tôt ci chemin bi ! Phénolphtaléine moo sàmm ndaxte zone bi [8,2 ; 10,0] la ak 9,0 ci biir. »",
  },
];

export default function AcideFaibleBaseFaibleQuizEmbedded() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const totalPoints = QUESTIONS.reduce((s, q) => s + q.points, 0);

  const handleSelect = (qId: number, ansIdx: number) => {
    if (submitted[qId]) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: ansIdx }));
  };

  const handleSubmitOne = (qId: number) => {
    if (submitted[qId]) return;
    const q = QUESTIONS.find((q) => q.id === qId)!;
    const isCorrect = selectedAnswers[qId] === q.correctIndex;
    setSubmitted((prev) => ({ ...prev, [qId]: true }));
    if (isCorrect) {
      setScore((prev) => prev + q.points);
    }
  };

  const handleFinish = () => {
    QUESTIONS.forEach((q) => {
      if (!submitted[q.id]) handleSubmitOne(q.id);
    });
    setFinished(true);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted({});
    setScore(0);
    setFinished(false);
  };

  const answeredCount = Object.keys(submitted).length;
  const percent = totalPoints > 0 ? Math.round((score / totalPoints) * 100) : 0;

  return (
    <section className="my-10 space-y-6">
      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-br from-teal-700 via-teal-800 to-navy p-5 sm:p-7 text-white shadow-md">
        <div className="inline-flex items-center gap-2 rounded-full bg-teal-500/20 px-3 py-1 text-xs font-bold text-teal-300 mb-3 border border-teal-400/30">
          <Star size={14} className="fill-teal-300" />
          <span>Quiz de Maîtrise — Acides et Bases Faibles (Bac S2)</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          Entraînement : Acides Faibles, Bases Faibles & Ka / pKa
        </h2>
        <p className="text-xs sm:text-sm text-teal-100 mt-1 max-w-xl">
          10 questions progressives ({totalPoints} pts) couvrant Ka, Henderson-Hasselbalch, diagramme
          de prédominance, loi d&apos;Ostwald et classification des couples. Répondez, puis validez
          chaque réponse.
        </p>
        {!finished && (
          <div className="mt-4 flex items-center gap-3 text-xs text-teal-200">
            <span className="font-bold">
              {answeredCount}/{QUESTIONS.length} validées
            </span>
            <div className="flex-1 bg-teal-900/50 rounded-full h-2 max-w-xs">
              <div
                className="bg-teal-400 h-2 rounded-full transition-all"
                style={{ width: `${(answeredCount / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Score panel (after finish) */}
      {finished && (
        <div
          className={`rounded-2xl p-6 text-center shadow border ${
            percent >= 70
              ? 'bg-emerald-50 border-emerald-200'
              : 'bg-amber-50 border-amber-200'
          }`}
        >
          <Trophy
            size={36}
            className={`mx-auto mb-2 ${percent >= 70 ? 'text-emerald-600' : 'text-amber-500'}`}
          />
          <p className="text-2xl font-black text-navy">
            {score} / {totalPoints} points — {percent}%
          </p>
          <p className="text-sm text-navy/70 mt-1">
            {percent >= 90
              ? '🏆 Excellent ! Tu maîtrises parfaitement les acides et bases faibles !'
              : percent >= 70
              ? '✅ Bien ! Relis les explications pour les questions manquées.'
              : '📖 Relis le cours sur Ka, Henderson et la loi d\'Ostwald, puis réessaie !'}
          </p>
          <button
            onClick={handleReset}
            className="mt-4 inline-flex items-center gap-2 px-5 py-2 bg-teal-700 text-white rounded-xl text-sm font-bold hover:bg-teal-800 transition-colors"
          >
            <RotateCcw size={15} />
            Recommencer le Quiz
          </button>
        </div>
      )}

      {/* Questions */}
      <div className="space-y-6">
        {QUESTIONS.map((q) => {
          const isSubmitted = submitted[q.id] ?? false;
          const selected = selectedAnswers[q.id] ?? -1;
          const isCorrect = isSubmitted && selected === q.correctIndex;
          const isWrong = isSubmitted && selected !== -1 && selected !== q.correctIndex;

          return (
            <div
              key={q.id}
              className={`rounded-2xl border shadow-sm overflow-hidden transition-all ${
                isCorrect
                  ? 'border-emerald-300 bg-emerald-50/40'
                  : isWrong
                  ? 'border-red-300 bg-red-50/40'
                  : 'border-navy/10 bg-white'
              }`}
            >
              {/* Question Header */}
              <div className="p-4 sm:p-5 border-b border-navy/10">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="bg-teal-700 text-white text-xs font-black px-3 py-1 rounded-xl">
                    Q{q.id}
                  </span>
                  <span className="flex items-center gap-0.5">
                    {Array.from({ length: q.stars }).map((_, i) => (
                      <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                    ))}
                  </span>
                  <span className="text-xs text-navy/50 font-semibold">
                    {q.points} pt{q.points > 1 ? 's' : ''}
                  </span>
                  {isCorrect && (
                    <span className="ml-auto flex items-center gap-1 text-xs text-emerald-700 font-bold">
                      <CheckCircle size={14} /> Correct
                    </span>
                  )}
                  {isWrong && (
                    <span className="ml-auto flex items-center gap-1 text-xs text-red-700 font-bold">
                      <XCircle size={14} /> Incorrect
                    </span>
                  )}
                </div>
                <div className="text-sm sm:text-base text-navy font-medium leading-relaxed">
                  <MathRenderer content={q.question} />
                </div>
              </div>

              {/* Answers */}
              <div className="p-4 sm:p-5 space-y-2">
                {q.answers.map((ans, idx) => {
                  let cls =
                    'w-full text-left px-4 py-3 rounded-xl border text-sm transition-all ';
                  if (isSubmitted) {
                    if (idx === q.correctIndex) {
                      cls += 'bg-emerald-100 border-emerald-400 text-emerald-900 font-bold';
                    } else if (idx === selected && selected !== q.correctIndex) {
                      cls += 'bg-red-100 border-red-400 text-red-900 line-through';
                    } else {
                      cls += 'bg-white border-navy/10 text-navy/50';
                    }
                  } else if (selected === idx) {
                    cls += 'bg-teal-700/10 border-teal-700 text-teal-900 font-semibold';
                  } else {
                    cls += 'bg-white border-navy/10 text-navy/80 hover:bg-teal-50 hover:border-teal-300';
                  }

                  return (
                    <button
                      key={idx}
                      className={cls}
                      onClick={() => handleSelect(q.id, idx)}
                      disabled={isSubmitted}
                    >
                      <div className="flex items-start gap-3">
                        <span className="shrink-0 font-black text-xs mt-0.5 text-navy/40">
                          {String.fromCharCode(65 + idx)}.
                        </span>
                        <div className="text-left leading-relaxed">
                          <MathRenderer content={ans} />
                        </div>
                        {isSubmitted && idx === q.correctIndex && (
                          <CheckCircle size={16} className="text-emerald-600 ml-auto shrink-0 mt-0.5" />
                        )}
                        {isSubmitted && idx === selected && selected !== q.correctIndex && (
                          <XCircle size={16} className="text-red-500 ml-auto shrink-0 mt-0.5" />
                        )}
                      </div>
                    </button>
                  );
                })}

                {/* Validate button */}
                {!isSubmitted && (
                  <button
                    onClick={() => handleSubmitOne(q.id)}
                    disabled={selected === -1}
                    className="mt-2 w-full py-2.5 bg-teal-700 disabled:bg-navy/20 disabled:text-navy/40 text-white rounded-xl text-sm font-bold hover:bg-teal-800 disabled:cursor-not-allowed transition-colors"
                  >
                    Valider ma réponse
                  </button>
                )}

                {/* Explanation */}
                {isSubmitted && (
                  <div className="mt-3 rounded-xl bg-sky-50 border border-sky-200 p-4 space-y-2">
                    <div className="flex items-center gap-2 text-sky-800 font-bold text-xs uppercase tracking-wider">
                      <Lightbulb size={14} />
                      Explication détaillée
                    </div>
                    <div className="text-sm text-sky-900 leading-relaxed">
                      <MathRenderer content={q.explanation} />
                    </div>
                    {q.wolof && (
                      <div className="mt-2 rounded-lg bg-amber-50 border border-amber-200 p-3">
                        <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-1">
                          Xam-xam ci Wolof
                        </span>
                        <p className="text-xs text-amber-900 italic">{q.wolof}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Finish button */}
      {!finished && (
        <div className="text-center pt-2">
          <button
            onClick={handleFinish}
            className="inline-flex items-center gap-2 px-8 py-3 bg-navy text-white rounded-2xl font-bold text-sm hover:bg-navy/90 shadow transition-colors"
          >
            <Trophy size={16} />
            Terminer et voir mon score
          </button>
        </div>
      )}
    </section>
  );
}

