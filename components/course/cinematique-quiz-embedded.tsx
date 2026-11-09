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
      "Un mobile $M$ a pour équations horaires dans le repère $(O, \\vec{i}, \\vec{j})$ : $x(t) = 3{,}0\\,t$ et $y(t) = -5{,}0\\,t^2 + 2{,}0$ (en unités SI). Quelle est l'équation cartésienne de sa trajectoire ?",
    answers: [
      "$y = -\\frac{5}{9}\\,x^2 + 2{,}0$",
      "$y = -5{,}0\\,x^2 + 2{,}0$",
      "$y = -\\frac{5}{3}\\,x + 2{,}0$",
      "$y = -15{,}0\\,x^2 + 2{,}0$",
    ],
    correctIndex: 0,
    explanation:
      "On élimine la variable temps $t$ entre les équations horaires : $x = 3{,}0\\,t \\implies t = \\frac{x}{3{,}0}$. On reporte dans $y(t)$ : $$y(x) = -5{,}0\\left(\\frac{x}{3{,}0}\\right)^2 + 2{,}0 = -\\frac{5}{9}\\,x^2 + 2{,}0$$ La trajectoire est une parabole orientée vers le bas.",
    wolof:
      "« Jëleel $t$ ci $x = 3t \\implies t = \\frac{x}{3}$, duggal ko ci $y$ : $y = -5\\left(\\frac{x}{3}\\right)^2 + 2 = -\\frac{5}{9}x^2 + 2$ ! Trajectoire parabole la ! »",
  },
  {
    id: 2,
    stars: 1,
    points: 1,
    question:
      "Quelle est la direction et le sens du vecteur vitesse instantanée $\\vec{v}(t)$ d'un point mobile $M$ le long de sa trajectoire curviligne ?",
    answers: [
      "Toujours tangent à la trajectoire au point $M$ et orienté dans le sens du mouvement",
      "Toujours perpendiculaire à la trajectoire et dirigé vers le centre de courbure",
      "Toujours horizontal quel que soit le mouvement",
      "Toujours dirigé vers l'origine $O$ du repère cartésien",
    ],
    correctIndex: 0,
    explanation:
      "Par définition cinématique fondamentale, le vecteur vitesse $\\vec{v} = \\frac{d\\vec{OM}}{dt}$ est TOUJOURS tangent à la trajectoire en $M$ et orienté dans le sens du mouvement. Sa norme $v = \\|\\vec{v}\\|$ est la vitesse scalaire instantanée en $\\text{m}\\cdot\\text{s}^{-1}$.",
    wolof:
      "« Vitesse $\\vec{v}$ dafa tangent ci trajectoire bi waxtu wu nekk di jëm ci kanam (sens du mouvement) ! »",
  },
  {
    id: 3,
    stars: 2,
    points: 2,
    question:
      "À une date donnée, un mobile possède une accélération $\\vec{a}$ et une vitesse $\\vec{v}$ telles que $\\vec{a} \\cdot \\vec{v} < 0$. Quelle est la nature de son mouvement à cet instant ?",
    answers: [
      "Le mouvement est retardé (décéléré) car la norme de la vitesse diminue",
      "Le mouvement est obligatoirement accéléré car l'accélération existe",
      "Le mouvement est circulaire uniforme",
      "Le mobile est obligatoirement immobile à cet instant",
    ],
    correctIndex: 0,
    explanation:
      "Le produit scalaire vérifie $\\vec{a} \\cdot \\vec{v} = \\frac{1}{2}\\,\\frac{d(v^2)}{dt} = v\\,\\frac{dv}{dt}$. Si $\\vec{a} \\cdot \\vec{v} < 0$, alors $\\frac{dv}{dt} < 0$, ce qui signifie que la norme de la vitesse diminue au cours du temps : le mouvement est retardé (décéléré).",
    wolof:
      "« Bu $\\vec{a} \\cdot \\vec{v} < 0$, vecteur vitesse ak vecteur accélération dañuy safaanoo, motax vitesse bi di wàññiku : mouvement bi dafay retardé ! »",
  },
  {
    id: 4,
    stars: 2,
    points: 2,
    question:
      "Dans la base mobile de Frenet $(M, \\vec{u}_t, \\vec{u}_n)$, quelles sont les expressions officielles des composantes tangentielle $a_t$ et normale $a_n$ de l'accélération ?",
    answers: [
      "$a_t = \\frac{dv}{dt}$ et $a_n = \\frac{v^2}{\\rho}$",
      "$a_t = \\frac{v^2}{\\rho}$ et $a_n = \\frac{dv}{dt}$",
      "$a_t = v\\,\\rho$ et $a_n = \\frac{dv}{dt}$",
      "$a_t = \\frac{d^2v}{dt^2}$ et $a_n = \\frac{v}{\\rho^2}$",
    ],
    correctIndex: 0,
    explanation:
      "Dans le repère de Frenet, $\\vec{a} = a_t\\,\\vec{u}_t + a_n\\,\\vec{u}_n$ avec l'accélération tangentielle $a_t = \\frac{dv}{dt}$ (traduit la variation de la valeur scalaire de la vitesse) et l'accélération normale $a_n = \\frac{v^2}{\\rho}$ (traduit le changement de direction, $\\rho$ étant le rayon de courbure local).",
    wolof:
      "« Base Frenet : $a_t = \\frac{dv}{dt}$ mooy soppikoo valeur vitesse, $a_n = \\frac{v^2}{\\rho}$ mooy courbure bi ! Rayon de courbure bi mooy $\\rho = \\frac{v^2}{a_n}$ ! »",
  },
  {
    id: 5,
    stars: 3,
    points: 3,
    question:
      "Un mobile décrit une trajectoire courbe. À un point où sa vitesse est $v = 20\\text{ m}\\cdot\\text{s}^{-1}$, la norme de son accélération totale est $a = 5{,}0\\text{ m}\\cdot\\text{s}^{-2}$ et son accélération tangentielle est $a_t = 3{,}0\\text{ m}\\cdot\\text{s}^{-2}$. Quel est le rayon de courbure $\\rho$ de la trajectoire en ce point ?",
    answers: [
      "$\\rho = 100\\text{ m}$",
      "$\\rho = 80\\text{ m}$",
      "$\\rho = 50\\text{ m}$",
      "$\\rho = 133\\text{ m}$",
    ],
    correctIndex: 0,
    explanation:
      "Dans la base de Frenet : $a^2 = a_t^2 + a_n^2 \\implies a_n = \\sqrt{a^2 - a_t^2} = \\sqrt{5{,}0^2 - 3{,}0^2} = \\sqrt{25 - 9} = \\sqrt{16} = 4{,}0\\text{ m}\\cdot\\text{s}^{-2}$. Or $a_n = \\frac{v^2}{\\rho} \\implies \\rho = \\frac{v^2}{a_n} = \\frac{20^2}{4{,}0} = \\frac{400}{4{,}0} = 100\\text{ m}$.",
    wolof:
      "« $a^2 = a_t^2 + a_n^2 \\implies a_n = \\sqrt{5^2 - 3^2} = 4\\text{ m}\\cdot\\text{s}^{-2}$. Kon rayon de courbure bi mooy $\\rho = \\frac{v^2}{a_n} = \\frac{20^2}{4} = 100\\text{ m}$ ! »",
  },
  {
    id: 6,
    stars: 2,
    points: 2,
    question:
      "Le Train Express Régional (TER) Dakar-Diamniadio roule à la vitesse $v_1 = 144\\text{ km}\\cdot\\text{h}^{-1}$ ($40\\text{ m}\\cdot\\text{s}^{-1}$). En amorçant son freinage avant la gare de Rufisque avec une décélération constante $a = -2{,}0\\text{ m}\\cdot\\text{s}^{-2}$, quelle distance $d$ parcourt-il jusqu'à l'arrêt complet ?",
    answers: [
      "$d = 400\\text{ m}$",
      "$d = 200\\text{ m}$",
      "$d = 800\\text{ m}$",
      "$d = 160\\text{ m}$",
    ],
    correctIndex: 0,
    explanation:
      "On utilise la formule de Torricelli indépendante du temps : $v_2^2 - v_1^2 = 2\\,a\\,d$. À l'arrêt complet $v_2 = 0$, donc $$0 - 40^2 = 2 \\times (-2{,}0) \\times d \\implies -1600 = -4{,}0\\,d \\implies d = \\frac{1600}{4{,}0} = 400\\text{ m}$$",
    wolof:
      "« Formule Torricelli : $v_2^2 - v_1^2 = 2\\,a\\,d$. $0 - 40^2 = 2 \\times (-2) \\times d \\implies -1600 = -4\\,d \\implies d = 400\\text{ m}$ ! »",
  },
  {
    id: 7,
    stars: 2,
    points: 2,
    question:
      "Un mobile effectue un Mouvement Circulaire Uniforme (MCU) sur une trajectoire de rayon $R = 2{,}0\\text{ m}$ à la vitesse angulaire constante $\\omega = 3{,}0\\text{ rad}\\cdot\\text{s}^{-1}$. Que vaut son accélération ?",
    answers: [
      "$a = R\\,\\omega^2 = 18{,}0\\text{ m}\\cdot\\text{s}^{-2}$ (purement normale et centripète)",
      "$a = 0\\text{ m}\\cdot\\text{s}^{-2}$ car la valeur de la vitesse est constante",
      "$a = R\\,\\omega = 6{,}0\\text{ m}\\cdot\\text{s}^{-2}$",
      "$a = \\frac{\\omega^2}{R} = 4{,}5\\text{ m}\\cdot\\text{s}^{-2}$",
    ],
    correctIndex: 0,
    explanation:
      "En MCU, la norme de la vitesse est constante ($v = R\\,\\omega = 6{,}0\\text{ m}\\cdot\\text{s}^{-1}$), donc l'accélération tangentielle est nulle : $a_t = \\frac{dv}{dt} = 0$. Cependant, la direction de la vitesse change à chaque instant, ce qui crée une accélération normale non nulle : $a = a_n = \\frac{v^2}{R} = R\\,\\omega^2 = 2{,}0 \\times 3{,}0^2 = 18{,}0\\text{ m}\\cdot\\text{s}^{-2}$, dirigée vers le centre.",
    wolof:
      "« Ci MCU, vitesse en valeur dafay tegu motax $a_t = 0$. Waaye dafay kurwewoo motax am na $a_n = R\\,\\omega^2 = 2 \\times 9 = 18\\text{ m}\\cdot\\text{s}^{-2}$ pur centripète ! »",
  },
  {
    id: 8,
    stars: 1,
    points: 1,
    question:
      "La période d'un mouvement circulaire uniforme est $T = 0{,}50\\text{ s}$. Quelles sont sa vitesse angulaire $\\omega$ et sa fréquence $N$ ?",
    answers: [
      "$\\omega = 4\\pi\\text{ rad}\\cdot\\text{s}^{-1} \\approx 12{,}57\\text{ rad}\\cdot\\text{s}^{-1}$ et $N = 2{,}0\\text{ Hz}$",
      "$\\omega = 2\\pi\\text{ rad}\\cdot\\text{s}^{-1}$ et $N = 0{,}50\\text{ Hz}$",
      "$\\omega = \\pi\\text{ rad}\\cdot\\text{s}^{-1}$ et $N = 4{,}0\\text{ Hz}$",
      "$\\omega = 0{,}50\\text{ rad}\\cdot\\text{s}^{-1}$ et $N = 2\\pi\\text{ Hz}$",
    ],
    correctIndex: 0,
    explanation:
      "Par définition : la fréquence est l'inverse de la période $N = \\frac{1}{T} = \\frac{1}{0{,}50} = 2{,}0\\text{ Hz}$ (2 tours par seconde). La vitesse angulaire est $\\omega = \\frac{2\\pi}{T} = 2\\pi \\times 2{,}0 = 4\\pi\\text{ rad}\\cdot\\text{s}^{-1} \\approx 12{,}57\\text{ rad}\\cdot\\text{s}^{-1}$.",
    wolof:
      "« $N = \\frac{1}{T} = \\frac{1}{0{,}50} = 2\\text{ Hz}$. $\\omega = \\frac{2\\pi}{T} = \\frac{2\\pi}{0{,}50} = 4\\pi\\text{ rad}\\cdot\\text{s}^{-1}$ ! »",
  },
  {
    id: 9,
    stars: 2,
    points: 2,
    question:
      "L'équation horaire d'un solide oscillant en translation rectiligne est $x(t) = 0{,}04\\,\\cos(10\\pi\\,t + \\frac{\\pi}{3})$ (en mètres). Quelle est son équation différentielle du mouvement ?",
    answers: [
      "$\\ddot{x} + 100\\pi^2\\,x = 0$",
      "$\\ddot{x} + 10\\pi\\,x = 0$",
      "$\\ddot{x} - 100\\pi^2\\,x = 0$",
      "$\\dot{x} + 10\\pi\\,x = 0$",
    ],
    correctIndex: 0,
    explanation:
      "Le mouvement est rectiligne sinusoïdal de pulsation propre $\\omega_0 = 10\\pi\\text{ rad}\\cdot\\text{s}^{-1}$. En dérivant deux fois par rapport au temps : $v(t) = \\dot{x}(t) = -0{,}04(10\\pi)\\sin(10\\pi t + \\frac{\\pi}{3})$ et $a(t) = \\ddot{x}(t) = -0{,}04(10\\pi)^2\\cos(10\\pi t + \\frac{\\pi}{3}) = -\\omega_0^2\\,x(t)$. Donc $\\ddot{x} + \\omega_0^2\\,x = 0$ avec $\\omega_0^2 = (10\\pi)^2 = 100\\pi^2$.",
    wolof:
      "« $\\ddot{x} = -\\omega_0^2\\,x \\implies \\ddot{x} + \\omega_0^2\\,x = 0$. Fii $\\omega_0 = 10\\pi$, kon $\\omega_0^2 = (10\\pi)^2 = 100\\pi^2$ ! »",
  },
  {
    id: 10,
    stars: 3,
    points: 3,
    question:
      "Dans l'exercice précédent où $x(t) = 0{,}04\\,\\cos(10\\pi\\,t + \\frac{\\pi}{3})$ (en mètres), quelles sont les valeurs maximales de la vitesse $V_m$ et de l'accélération $a_m$ du mobile ?",
    answers: [
      "$V_m = 0{,}40\\pi\\text{ m}\\cdot\\text{s}^{-1} \\approx 1{,}26\\text{ m}\\cdot\\text{s}^{-1}$ et $a_m = 4{,}0\\pi^2\\text{ m}\\cdot\\text{s}^{-2} \\approx 39{,}48\\text{ m}\\cdot\\text{s}^{-2}$",
      "$V_m = 0{,}04\\text{ m}\\cdot\\text{s}^{-1}$ et $a_m = 0{,}40\\text{ m}\\cdot\\text{s}^{-2}$",
      "$V_m = 10\\pi\\text{ m}\\cdot\\text{s}^{-1}$ et $a_m = 100\\pi^2\\text{ m}\\cdot\\text{s}^{-2}$",
      "$V_m = 0{,}40\\text{ m}\\cdot\\text{s}^{-1}$ et $a_m = 4{,}0\\text{ m}\\cdot\\text{s}^{-2}$",
    ],
    correctIndex: 0,
    explanation:
      "L'amplitude d'élongation est $X_m = 0{,}04\\text{ m}$ et la pulsation propre est $\\omega_0 = 10\\pi\\text{ rad}\\cdot\\text{s}^{-1}$. Les valeurs maximales sont : $$V_m = X_m\\,\\omega_0 = 0{,}04 \\times 10\\pi = 0{,}40\\pi\\text{ m}\\cdot\\text{s}^{-1} \\approx 1{,}26\\text{ m}\\cdot\\text{s}^{-1}$$ $$a_m = X_m\\,\\omega_0^2 = 0{,}04 \\times 100\\pi^2 = 4{,}0\\pi^2\\text{ m}\\cdot\\text{s}^{-2} \\approx 39{,}48\\text{ m}\\cdot\\text{s}^{-2}$$",
    wolof:
      "« $V_m = X_m\\,\\omega_0 = 0{,}04 \\times 10\\pi = 0{,}40\\pi\\text{ m}\\cdot\\text{s}^{-1}$. $a_m = X_m\\,\\omega_0^2 = 0{,}04 \\times 100\\pi^2 = 4\\pi^2\\text{ m}\\cdot\\text{s}^{-2}$ ! »",
  },
];

export default function CinematiqueQuizEmbedded() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSelectAnswer = (questionId: number, answerIndex: number) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const totalQuestions = QUESTIONS.length;
  const isComplete = answeredCount === totalQuestions;

  let totalPoints = 0;
  let earnedPoints = 0;

  QUESTIONS.forEach((q) => {
    totalPoints += q.points;
    if (selectedAnswers[q.id] === q.correctIndex) {
      earnedPoints += q.points;
    }
  });

  const percentage = Math.round((earnedPoints / totalPoints) * 100);

  return (
    <div className="bg-white rounded-3xl border border-navy/10 p-5 sm:p-7 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-gold/10 text-gold">
              <Trophy className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-navy">
              Quiz d&apos;Entraînement Bac S2 : P1 — Cinématique du Point Matériel
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-text/70 mt-1">
            10 questions authentiques conformes aux épreuves officielles de l&apos;Office du Baccalauréat sénégalais.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-turquoise-light text-turquoise border border-turquoise/20">
            {answeredCount} / {totalQuestions} répondues
          </span>
        </div>
      </div>

      {/* Résumé du score si validé */}
      {showResults && (
        <div
          className={`p-5 rounded-2xl border ${
            percentage >= 70
              ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
              : percentage >= 50
              ? 'bg-amber-50 border-amber-200 text-amber-950'
              : 'bg-rose-50 border-rose-200 text-rose-950'
          } flex flex-col sm:flex-row items-center justify-between gap-4`}
        >
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-lg font-bold">
              {percentage >= 80
                ? '🏆 Excellent ! Vous maîtrisez la Cinématique du Bac S2 !'
                : percentage >= 60
                ? '👍 Bon travail ! Quelques notions de Frenet à consolider.'
                : '📚 Relisez attentivement les fiches réflexes pour consolider.'}
            </h4>
            <p className="text-xs opacity-90">
              Votre note : <strong>{earnedPoints} / {totalPoints} points</strong> ({percentage}%)
            </p>
          </div>

          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-navy text-white text-xs font-bold hover:bg-navy/90 transition-all shrink-0 flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Refaire le quiz
          </button>
        </div>
      )}

      {/* Liste des questions */}
      <div className="space-y-6">
        {QUESTIONS.map((q, qIndex) => {
          const userAnswer = selectedAnswers[q.id];
          const isAnswered = userAnswer !== undefined;
          const isCorrect = isAnswered && userAnswer === q.correctIndex;

          return (
            <div
              key={q.id}
              className={`p-5 rounded-2xl border transition-all ${
                showResults
                  ? isCorrect
                    ? 'border-emerald-300 bg-emerald-50/30'
                    : 'border-rose-300 bg-rose-50/30'
                  : isAnswered
                  ? 'border-turquoise/40 bg-surface'
                  : 'border-navy/10 bg-white'
              } space-y-4`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-navy/10 text-navy font-bold text-xs flex items-center justify-center">
                      {qIndex + 1}
                    </span>
                    <span className="text-[11px] font-bold text-text/50 uppercase tracking-wider">
                      Question #{qIndex + 1} • {q.points} point{q.points > 1 ? 's' : ''}
                    </span>
                    <div className="flex items-center text-amber-500">
                      {Array.from({ length: q.stars }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-navy mt-1">
                    <MathRenderer content={q.question} />
                  </div>
                </div>

                {showResults && (
                  <span className="shrink-0">
                    {isCorrect ? (
                      <CheckCircle className="w-5 h-5 text-emerald-600" />
                    ) : (
                      <XCircle className="w-5 h-5 text-rose-600" />
                    )}
                  </span>
                )}
              </div>

              {/* Choix de réponses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.answers.map((ans, aIndex) => {
                  const isSelected = userAnswer === aIndex;
                  const isThisCorrect = q.correctIndex === aIndex;

                  let btnStyle = 'border-navy/10 bg-white hover:border-turquoise/40 text-navy';

                  if (showResults) {
                    if (isThisCorrect) {
                      btnStyle = 'border-emerald-500 bg-emerald-100 text-emerald-950 font-bold';
                    } else if (isSelected) {
                      btnStyle = 'border-rose-400 bg-rose-100 text-rose-950 font-medium';
                    } else {
                      btnStyle = 'border-navy/10 bg-white opacity-50';
                    }
                  } else if (isSelected) {
                    btnStyle = 'border-turquoise bg-turquoise-light text-navy font-bold shadow-xs';
                  }

                  return (
                    <button
                      key={aIndex}
                      onClick={() => handleSelectAnswer(q.id, aIndex)}
                      disabled={showResults}
                      className={`p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span className="pr-2">
                        <MathRenderer content={ans} />
                      </span>
                      <span
                        className={`w-5 h-5 rounded-full border text-[10px] font-bold flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'border-turquoise bg-turquoise text-white'
                            : 'border-navy/20 text-text/40'
                        }`}
                      >
                        {String.fromCharCode(65 + aIndex)}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Explication après validation */}
              {showResults && (
                <div className="pt-3 border-t border-navy/10 space-y-2 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-navy/10 space-y-1">
                    <span className="font-bold text-navy flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                      Correction détaillée :
                    </span>
                    <MathRenderer content={q.explanation} className="text-text/80 text-[11px] leading-relaxed pl-5" />
                  </div>

                  {q.wolof && (
                    <div className="text-[11px] italic text-amber-900 bg-amber-50/70 p-2.5 rounded-lg border border-amber-200">
                      <MathRenderer content={q.wolof} />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bouton de validation final */}
      {!showResults && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-navy/10">
          <span className="text-xs text-text/60">
            {isComplete
              ? 'Toutes les questions ont été répondues ! Vous pouvez valider.'
              : `Il vous reste ${totalQuestions - answeredCount} question(s) à répondre.`}
          </span>
          <button
            onClick={() => setShowResults(true)}
            disabled={!isComplete}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-turquoise hover:bg-turquoise/90 text-white font-bold text-xs transition-all shadow-md disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Valider mes réponses ({answeredCount}/{totalQuestions})
          </button>
        </div>
      )}
    </div>
  );
}
