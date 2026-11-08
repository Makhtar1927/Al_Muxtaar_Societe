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
      "Lors du dosage d'un acide faible $\\text{CH}_3\\text{COOH}$ ($pK_a = 4{,}8$) par une solution de soude $(\\text{Na}^+ + \\text{OH}^-)$, quelle est l'équation-bilan de la réaction de dosage ?",
    answers: [
      "$\\text{CH}_3\\text{COOH} + \\text{OH}^- \\xrightarrow{K_R} \\text{CH}_3\\text{COO}^- + \\text{H}_2\\text{O}$",
      "$\\text{CH}_3\\text{COOH} + \\text{OH}^- \\rightleftharpoons \\text{CH}_3\\text{COO}^- + \\text{H}_2\\text{O}$",
      "$\\text{H}_3\\text{O}^+ + \\text{OH}^- \\to 2\\text{H}_2\\text{O}$",
      "$\\text{CH}_3\\text{COOH} + \\text{NaOH} \\rightleftharpoons \\text{CH}_3\\text{COONa} + \\text{H}_2\\text{O}$",
    ],
    correctIndex: 0,
    explanation:
      "La réaction de dosage est rapide, exothermique et quasi-totale avec $K_R = \\dfrac{K_a}{K_e} = 10^{14 - 4{,}8} = 10^{9{,}2} \\approx 1{,}58 \\times 10^9 \\gg 10^4$. On l'écrit donc obligatoirement avec une flèche simple $(\\to)$ entre les espèces réellement réactives (l'ion $\\text{Na}^+$ étant spectateur).",
    wolof:
      "« Réaction de dosage dafay gaaw te dafay jeex takk : flèche simple ngay bind ! Na⁺ du réagir, spectateur la rekk. »",
  },
  {
    id: 2,
    stars: 2,
    points: 2,
    question:
      "À l'équivalence d'un titrage d'un acide faible par la soude à $25^\\circ\\text{C}$, quelle est la nature acido-basique de la solution obtenue et son pH ?",
    answers: [
      "Basique avec $\\text{pH}_E > 7$ (présence de la base faible $\\text{CH}_3\\text{COO}^-$)",
      "Neutre avec $\\text{pH}_E = 7{,}00$",
      "Acide avec $\\text{pH}_E < 7$",
      "Dépend uniquement du volume versé, sans lien avec le $pK_a$",
    ],
    correctIndex: 0,
    explanation:
      "À l'équivalence $E$, tout l'acide faible a été transformé en sa base conjuguée $\\text{CH}_3\\text{COO}^-$. Dans l'eau, cette base faible capte partiellement des protons selon $\\text{CH}_3\\text{COO}^- + \\text{H}_2\\text{O} \\rightleftharpoons \\text{CH}_3\\text{COOH} + \\text{OH}^-$, ce qui génère des ions $\\text{OH}^-$ en excès et rend le milieu basique ($\\text{pH}_E > 7$).",
    wolof:
      "« Fatte ko du teey : ci dosage acide fort / base forte rekk la pHe di yem ci 7 ! Ci acide faible, pHe dafay gën a rëy 7 ndax base faible bi lañu am ci équivalence bi ! »",
  },
  {
    id: 3,
    stars: 1,
    points: 1,
    question:
      "Sur la courbe de titrage d'un acide faible par la soude, que vaut le pH lorsque l'on a versé un volume de base égal à la moitié du volume équivalent ($V_b = V_{bE}/2$) ?",
    answers: [
      "$\\text{pH} = pK_a$ du couple acide/base dosé",
      "$\\text{pH} = 7{,}00$",
      "$\\text{pH} = \\dfrac{1}{2}pK_a$",
      "$\\text{pH} = 14 - pK_a$",
    ],
    correctIndex: 0,
    explanation:
      "À la demi-équivalence ($V_b = V_{bE}/2$), exactement la moitié de l'acide initial a été neutralisée en sa base conjuguée. Ainsi $[\\text{AH}] = [\\text{A}^-]$. D'après Henderson-Hasselbalch, $\\text{pH} = pK_a + \\log\\left(\\dfrac{[\\text{A}^-]}{[\\text{AH}]}\\right) = pK_a + \\log(1) = pK_a$. C'est le théorème fondamental de la demi-équivalence.",
    wolof:
      "« Demi-équivalence mooy VbE / 2 : foofu [Acide] = [Base], donc log(1) = 0, kon pH bi day yem ci pKa bi direct ! »",
  },
  {
    id: 4,
    stars: 2,
    points: 2,
    question:
      "Quelles sont les caractéristiques fondamentales d'une solution tampon ?",
    answers: [
      "Son pH varie très peu lors d'un ajout modéré d'acide fort, de base forte ou lors d'une dilution modérée",
      "Son pH est rigoureusement invariable quelle que soit la quantité d'acide ou de base ajoutée",
      "C'est une solution nécessairement neutre de $\\text{pH} = 7{,}00$",
      "Son pH augmente fortement si on lui ajoute de l'eau distillée",
    ],
    correctIndex: 0,
    explanation:
      "Une solution tampon est un mélange d'un acide faible et de sa base conjuguée en proportions voisines. Son pH varie très peu lors d'ajouts modérés d'acide fort ou de base forte (grâce à la présence simultanée de l'acide et de la base conjuguée qui neutralisent les ions parasites) et ne varie pas lors d'une dilution modérée car le rapport des quantités de matière reste constant.",
    wolof:
      "« Solution tampon dafay taxaw temm : boo ci sotti tuuti acide walla base walla ndox, pH bi du soppiku dara ! »",
  },
  {
    id: 5,
    stars: 2,
    points: 2,
    question:
      "Pour le dosage d'un acide faible dont le point d'équivalence est $E(V_{bE} = 15\\text{ mL} \\,;\\, \\text{pH}_E = 8{,}7)$, quel indicateur coloré est le plus approprié ?",
    answers: [
      "La phénolphtaléine (zone de virage 8,2 – 10,0)",
      "Le bleu de bromothymol BBT (zone de virage 6,0 – 7,6)",
      "L'hélianthine (zone de virage 3,1 – 4,4)",
      "Le rouge de méthyle (zone de virage 4,2 – 6,2)",
    ],
    correctIndex: 0,
    explanation:
      "La règle absolue du Bac S2 stipule que l'indicateur coloré convenable doit avoir une zone de virage contenant le pH à l'équivalence. Ici $\\text{pH}_E = 8{,}7 \\in [8{,}2 \\,;\\, 10{,}0]$ : seule la phénolphtaléine convient. Le BBT virerait bien trop tôt (dès $\\text{pH} = 7{,}6$), avant la fin réelle du dosage !",
    wolof:
      "« Indicateur bu baax mooy bu zone de virage bi ëmb pHe bi ! Ndax pHe = 8,7, phénolphtaléine (8,2 à 10,0) moo ci jaar yoon. »",
  },
  {
    id: 6,
    stars: 3,
    points: 3,
    question:
      "On dispose d'une solution d'acide éthanoïque à $C_a = 0{,}10\\text{ mol/L}$ ($pK_a = 4{,}8$) et d'une solution de soude à $C_b = 0{,}10\\text{ mol/L}$. Comment préparer $V = 60\\text{ mL}$ d'une solution tampon de $\\text{pH} = 4{,}8$ par demi-neutralisation ?",
    answers: [
      "Prélever $V_a = 40\\text{ mL}$ d'acide éthanoïque et ajouter $V_b = 20\\text{ mL}$ de soude",
      "Mélanger $V_a = 30\\text{ mL}$ d'acide et $V_b = 30\\text{ mL}$ de soude",
      "Prélever $V_a = 50\\text{ mL}$ d'acide et ajouter $V_b = 10\\text{ mL}$ de soude",
      "Mélanger $V_a = 20\\text{ mL}$ d'acide et $V_b = 40\\text{ mL}$ de soude",
    ],
    correctIndex: 0,
    explanation:
      "Pour avoir $\\text{pH} = pK_a = 4{,}8$, il faut être à la demi-équivalence : $n(\\text{OH}^-) = \\dfrac{1}{2} n_0(\\text{AH})$. Comme $C_a = C_b = 0{,}10\\text{ mol/L}$, cela impose $V_b = \\dfrac{V_a}{2}$. Le volume total étant $V = V_a + V_b = V_a + \\dfrac{V_a}{2} = \\dfrac{3}{2}V_a = 60\\text{ mL}$, on en déduit $V_a = \\dfrac{2}{3} \\times 60 = 40\\text{ mL}$ d'acide et $V_b = 20\\text{ mL}$ de soude.",
    wolof:
      "« Pour demi-équivalence am ci C_a = C_b, faw volume soude bi yem ci 1/2 volume acide bi : Vb = Va/2. Va + Va/2 = 60 mL ⟹ 1,5 Va = 60 ⟹ Va = 40 mL ak Vb = 20 mL ! »",
  },
];

export default function DosageAcideFaibleBaseForteQuizEmbedded() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});
  const [finished, setFinished] = useState<boolean>(false);

  const handleSelect = (questionId: number, answerIndex: number) => {
    if (submitted[questionId] || finished) return;
    setAnswers((prev) => ({ ...prev, [questionId]: answerIndex }));
  };

  const handleSubmitOne = (questionId: number) => {
    setSubmitted((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleFinish = () => {
    const allSubmitted: Record<number, boolean> = {};
    QUESTIONS.forEach((q) => {
      allSubmitted[q.id] = true;
    });
    setSubmitted(allSubmitted);
    setFinished(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted({});
    setFinished(false);
  };

  const score = QUESTIONS.reduce((acc, q) => {
    return answers[q.id] === q.correctIndex ? acc + q.points : acc;
  }, 0);

  const totalPoints = QUESTIONS.reduce((acc, q) => acc + q.points, 0);
  const percentage = Math.round((score / totalPoints) * 100);

  return (
    <section className="bg-white rounded-3xl border border-navy/15 p-4 sm:p-7 shadow-md space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/10 pb-4">
        <div>
          <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">
            Évaluation Interactive Bac S2
          </span>
          <h3 className="font-extrabold text-navy text-lg sm:text-xl mt-0.5">
            Quiz d&apos;Entraînement : C8 — Réactions Acide Faible / Base Forte &amp; Tampons
          </h3>
          <p className="text-xs text-text/60 mt-1">
            6 questions types pour maîtriser l&apos;équivalence, la demi-équivalence et les solutions tampons.
          </p>
        </div>
        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="text-xs font-bold text-navy/70 bg-surface px-3 py-1 rounded-full border border-navy/10">
            {Object.keys(submitted).length} / {QUESTIONS.length} validées
          </span>
          {finished && (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1 px-3 py-1 bg-surface hover:bg-surface-muted text-navy rounded-full text-xs font-bold border border-navy/10 transition-colors"
            >
              <RotateCcw size={12} />
              Recommencer
            </button>
          )}
        </div>
      </div>

      {/* Score Banner when finished */}
      {finished && (
        <div className="rounded-2xl p-5 bg-gradient-to-r from-navy to-navy/90 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm animate-in fade-in duration-300">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-400 text-navy font-black text-xl flex items-center justify-center shrink-0">
              <Trophy size={28} />
            </div>
            <div>
              <span className="text-xs text-amber-300 font-bold uppercase tracking-wider block">
                Bilan Officiel du Quiz
              </span>
              <h4 className="text-xl sm:text-2xl font-black">
                Score : {score} / {totalPoints} points ({percentage}%)
              </h4>
              <p className="text-xs text-surface-muted mt-0.5">
                {percentage >= 80
                  ? 'Excellente maîtrise ! Vous êtes prêt pour les épreuves du Bac S2.'
                  : percentage >= 50
                  ? 'Bon niveau d’ensemble. Revoyez les explications détaillées ci-dessous.'
                  : 'Entraînez-vous encore avec les fiches réflexes et le simulateur interactif.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Questions list */}
      <div className="space-y-6">
        {QUESTIONS.map((q) => {
          const selected = answers[q.id] ?? -1;
          const isSubmitted = submitted[q.id] || finished;

          return (
            <div
              key={q.id}
              className={`rounded-2xl border transition-all p-4 sm:p-5 ${
                isSubmitted
                  ? selected === q.correctIndex
                    ? 'border-emerald-300 bg-emerald-50/20'
                    : 'border-red-300 bg-red-50/20'
                  : 'border-navy/10 bg-surface/30'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-navy bg-navy/5 px-2 py-0.5 rounded-lg border border-navy/10">
                    Question {q.id}
                  </span>
                  <span className="text-xs font-semibold text-text/60">
                    ({q.points} point{q.points > 1 ? 's' : ''})
                  </span>
                </div>
                <div className="flex items-center gap-0.5 text-amber-500">
                  {Array.from({ length: q.stars }).map((_, i) => (
                    <Star key={i} size={13} fill="currentColor" />
                  ))}
                </div>
              </div>

              <div className="text-sm font-bold text-navy mb-4 leading-relaxed">
                <MathRenderer content={q.question} />
              </div>

              {/* Answers options */}
              <div className="space-y-2">
                {q.answers.map((ans, idx) => {
                  const letter = String.fromCharCode(65 + idx);
                  let stateStyle = 'border-navy/10 bg-white hover:bg-surface text-navy';

                  if (isSubmitted) {
                    if (idx === q.correctIndex) {
                      stateStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-semibold';
                    } else if (idx === selected) {
                      stateStyle = 'border-red-500 bg-red-50 text-red-950';
                    } else {
                      stateStyle = 'border-navy/5 bg-white/50 text-text/40 opacity-60';
                    }
                  } else if (idx === selected) {
                    stateStyle = 'border-amber-500 bg-amber-50 text-navy font-semibold ring-2 ring-amber-300';
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={isSubmitted}
                      onClick={() => handleSelect(q.id, idx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${stateStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full bg-navy/5 font-mono text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {letter}
                      </span>
                      <div className="flex-1 leading-relaxed">
                        <MathRenderer content={ans} />
                      </div>
                      {isSubmitted && idx === q.correctIndex && (
                        <CheckCircle size={16} className="text-emerald-600 ml-auto shrink-0 mt-0.5" />
                      )}
                      {isSubmitted && idx === selected && selected !== q.correctIndex && (
                        <XCircle size={16} className="text-red-500 ml-auto shrink-0 mt-0.5" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Validate single question button */}
              {!isSubmitted && (
                <button
                  type="button"
                  onClick={() => handleSubmitOne(q.id)}
                  disabled={selected === -1}
                  className="mt-3 w-full py-2 bg-navy hover:bg-navy/90 disabled:bg-navy/20 disabled:text-navy/40 text-white rounded-xl text-xs font-bold transition-colors disabled:cursor-not-allowed"
                >
                  Valider ma réponse
                </button>
              )}

              {/* Explication pas à pas */}
              {isSubmitted && (
                <div className="mt-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 p-3.5 space-y-1.5 text-xs text-amber-950">
                  <div className="flex items-center gap-1.5 font-bold text-amber-800 uppercase tracking-wider text-[11px]">
                    <Lightbulb size={13} />
                    <span>Explication détaillée :</span>
                  </div>
                  <div className="leading-relaxed">
                    <MathRenderer content={q.explanation} />
                  </div>
                  {q.wolof && (
                    <div className="mt-2 rounded-lg bg-white/70 border border-amber-300/60 p-2.5">
                      <span className="font-bold text-amber-800 uppercase tracking-wider block text-[10px] mb-0.5">
                        🇸🇳 Xam-xam ci Wolof
                      </span>
                      <p className="italic text-amber-900">{q.wolof}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom finish button */}
      {!finished && (
        <div className="text-center pt-3 border-t border-navy/10">
          <button
            type="button"
            onClick={handleFinish}
            className="inline-flex items-center gap-2 px-8 py-3 bg-navy hover:bg-navy/90 text-white rounded-2xl font-bold text-xs sm:text-sm shadow-md transition-colors"
          >
            <Trophy size={16} />
            <span>Terminer le quiz et enregistrer mon score</span>
          </button>
        </div>
      )}
    </section>
  );
}

