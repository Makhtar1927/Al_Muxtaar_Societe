'use client';

import React, { useState } from 'react';
import MathRenderer from '@/components/course/math-renderer';
import { CheckCircle, XCircle, Star, Lightbulb, Trophy, RotateCcw, Target, Zap, Magnet } from 'lucide-react';

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
      "Quelle est la valeur du travail $W(\\vec{F}_m)$ accompli par la force magnétique de Lorentz $\\vec{F}_m = q\\,\\vec{v} \\wedge \\vec{B}$ sur une particule chargée au cours de son mouvement ?",
    answers: [
      "$W(\\vec{F}_m) = 0\\text{ J}$ car la force est constamment perpendiculaire au vecteur vitesse",
      "$W(\\vec{F}_m) = q\\,v\\,B\\,\\Delta x$",
      "$W(\\vec{F}_m) = \\frac{1}{2}m v^2$",
      "$W(\\vec{F}_m) = -q\\,E\\,\\Delta y$",
    ],
    correctIndex: 0,
    explanation:
      "La puissance instantanée développée par la force magnétique est $\\mathcal{P} = \\vec{F}_m \\cdot \\vec{v} = (q\\,\\vec{v} \\wedge \\vec{B}) \\cdot \\vec{v}$. Or, par définition du produit vectoriel, $\\vec{F}_m$ est orthogonal à $\\vec{v}$, donc $\\vec{F}_m \\cdot \\vec{v} = 0$. Il en résulte que le travail est rigoureusement nul : $W = \\int \\mathcal{P}\\,dt = 0\\text{ J}$. D'après le TEC, l'énergie cinétique et la norme de la vitesse restent constantes : le mouvement est uniforme !",
    wolof:
      "« Force de Lorentz bi $\\vec{F}_m = q\\vec{v}\\wedge\\vec{B}$ dafa perpendiculaire ak vitesse bi $\\vec{v}$ waxtu wu nekk ! Motax produit scalaire bi dafay nekk zéro, liggéey am (travail) zéro la : $W = 0$. Vitesse bi du yokk du wàññi ! »",
  },
  {
    id: 2,
    stars: 1,
    points: 1,
    question:
      "Dans une région où règne un champ magnétique uniforme $\\vec{B}$, une particule de masse $m$ et de charge $q$ est injectée avec une vitesse $\\vec{v}_0 \\perp \\vec{B}$. Quelle est l'expression du rayon $R$ de sa trajectoire ?",
    answers: [
      "$R = \\frac{m\\,v_0}{|q|\\,B}$",
      "$R = \\frac{|q|\\,B}{m\\,v_0}$",
      "$R = \\frac{m\\,v_0^2}{|q|\\,B}$",
      "$R = \\frac{m\\,B}{|q|\\,v_0}$",
    ],
    correctIndex: 0,
    explanation:
      "Dans le repère de Frenet $(\\vec{u}_t, \\vec{u}_n)$, la projection du TCI donne selon la normale : $m\\,a_n = F_m \\iff m\\frac{v_0^2}{R} = |q|\\,v_0\\,B$. En simplifiant par $v_0$, on trouve immédiatement $R = \\frac{m\\,v_0}{|q|\\,B}$. Le rayon est constant, le mouvement est donc circulaire uniforme.",
    wolof:
      "« Ci repère de Frenet, composante normale bi mooy $m\\frac{v^2}{R} = |q|vB$. Soo dindee benn $v$, day déss $R = \\frac{mv}{|q|B}$ ! Bul fatte valeur absolue ci charge $q$ bi ndax rayon dafay positif ! »",
  },
  {
    id: 3,
    stars: 2,
    points: 1.5,
    question:
      "Dans un cyclotron, que peut-on dire de la période de révolution $T$ d'un ion dans les dees lorsqu'on augmente sa vitesse ?",
    answers: [
      "La période $T$ reste rigoureusement constante car elle est indépendante de la vitesse",
      "La période $T$ augmente proportionnellement à la vitesse",
      "La période $T$ diminue car l'ion va plus vite",
      "La période $T$ est proportionnelle au carré de la vitesse",
    ],
    correctIndex: 0,
    explanation:
      "La durée d'un tour complet est $T = \\frac{2\\pi R}{v_0}$. En remplaçant $R = \\frac{mv_0}{|q|B}$, la vitesse $v_0$ se simplifie : $T = \\frac{2\\pi m}{|q|B}$. La période ne dépend ni du rayon $R$ ni de la vitesse $v_0$ ! Quand la particule va plus vite, sa trajectoire s'élargit exactement dans la même proportion, de sorte que la durée du tour reste constante : c'est la condition de résonance du cyclotron.",
    wolof:
      "« Piège bu mag ci Bac S2 : particule bi mën na accélérer ba am vitesse bu kawé, waaye waxtu wër bi $T = \\frac{2\\pi m}{|q|B}$ du soppiku mukk ! Vitesse bi day yokk, rayon bi di yokk ci même proportion bi ! »",
  },
  {
    id: 4,
    stars: 2,
    points: 1.5,
    question:
      "Une particule de masse $m$, de charge $q$ pénètre dans un condensateur de longueur $L$ et d'écartement $d$ soumis à une tension $U$. Que devient la déviation linéaire $Y$ sur l'écran si on double la tension $U$ et qu'on double la vitesse d'entrée $v_0$ ?",
    answers: [
      "La déviation $Y$ est divisée par 2",
      "La déviation $Y$ est multipliée par 2",
      "La déviation $Y$ reste inchangée",
      "La déviation $Y$ est divisée par 4",
    ],
    correctIndex: 0,
    explanation:
      "La déviation linéaire sur l'écran est donnée par $Y = \\frac{|q|\\,U\\,L\\,D}{m\\,d\\,v_0^2}$. Si $U' = 2U$ et $v_0' = 2v_0$, alors $Y' = \\frac{|q|(2U)LD}{md(2v_0)^2} = \\frac{2}{4} Y = \\frac{1}{2} Y$. La déviation est donc divisée par 2 !",
    wolof:
      "« Formule déviation bi mooy $Y \\propto \\frac{U}{v_0^2}$. Su $U$ doublewé ($\times 2$) té $v_0$ doublewu ($\times 2^2 = 4$), ratio bi day nekk $\\frac{2}{4} = \\frac{1}{2}$ : déviation bi dafay wàcc ci moitié bi ! »",
  },
  {
    id: 5,
    stars: 2,
    points: 1.5,
    question:
      "Dans un filtre de vitesses de Wien où le champ électrique $\\vec{E}$ et le champ magnétique $\\vec{B}$ sont perpendiculaires entre eux et à $\\vec{v}_0$, quelle condition doivent vérifier les particules pour franchir la fente de sortie sans déviation ?",
    answers: [
      "Leur vitesse doit être exactement égale à $v_0 = \\frac{E}{B}$, indépendamment de leur masse et de leur charge",
      "Leur énergie cinétique doit être égale à $|q|E/B$",
      "Leur rapport charge sur masse $\\frac{q}{m}$ doit être maximal",
      "Leur vitesse doit vérifier $v_0 = \\frac{B}{E}$",
    ],
    correctIndex: 0,
    explanation:
      "Pour qu'une particule traverse en ligne droite sans déviation, les forces électrique $\\vec{F}_e = q\\vec{E}$ et magnétique $\\vec{F}_m = q\\vec{v}_0\\wedge\\vec{B}$ doivent se compenser : $\\vec{F}_e + \\vec{F}_m = \\vec{0} \\iff |q|E = |q|v_0 B \\implies v_0 = \\frac{E}{B}$. La charge $q$ se simplifie, et la masse $m$ n'intervient pas : le tri s'effectue purement sur la vitesse.",
    wolof:
      "« Filtre de Wien mooy sélecteur de vitesse pur : $qE = qv_0B \\implies v_0 = \\frac{E}{B}$. Charge $q$ ak masse $m$ bokkuñu ci équation bi ! Particule bu am vitesse $v_0 = E/B$ mooy génn ci ligne droite ! »",
  },
  {
    id: 6,
    stars: 3,
    points: 2,
    question:
      "Dans un spectrographe de masse de Bainbridge, deux isotopes de même charge $q$ et de masses $m_1$ et $m_2$ ($m_2 > m_1$) entrent avec la même vitesse $v_0$ dans un champ magnétique $\\vec{B}'$. Quelle est la distance $\\Delta d = P_1P_2$ entre leurs points d'impact sur la plaque photographique ?",
    answers: [
      "$\\Delta d = \\frac{2\\,v_0}{|q|\\,B'}\\,(m_2 - m_1)$",
      "$\\Delta d = \\frac{v_0}{|q|\\,B'}\\,(m_2 - m_1)$",
      "$\\Delta d = \\frac{2\\,v_0^2}{|q|\\,B'}\\,(m_2^2 - m_1^2)$",
      "$\\Delta d = \\frac{|q|\\,B'}{2\\,v_0}\\,\\left(\\frac{1}{m_1} - \\frac{1}{m_2}\\right)$",
    ],
    correctIndex: 0,
    explanation:
      "Dans la chambre de déviation, chaque isotope décrit un demi-cercle de rayon $R_1 = \\frac{m_1 v_0}{|q|B'}$ et $R_2 = \\frac{m_2 v_0}{|q|B'}$. Les points d'impact sont situés à une distance du point d'entrée égale au diamètre : $d_1 = 2R_1$ et $d_2 = 2R_2$. L'écartement entre les deux taches sur la plaque est donc : $\\Delta d = d_2 - d_1 = 2(R_2 - R_1) = \\frac{2 v_0}{|q| B'} (m_2 - m_1)$. Attention au facteur 2 qui est le piège classique !",
    wolof:
      "« Demi-cercle lañuy def ci plaque bi, kon distance bi mooy diamètre bi $d = 2R$ ! Écartement bi ci digg ñaari impacts yi mooy $\\Delta d = 2(R_2 - R_1) = \\frac{2v_0}{|q|B'}(m_2 - m_1)$. Bul fatte facteur 2 bi mukk ! »",
  },
];

export default function P4ParticuleQuizEmbedded() {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showCorrections, setShowCorrections] = useState(false);

  const totalPoints = QUESTIONS.reduce((sum, q) => sum + q.points, 0);

  const calculateScore = () => {
    let score = 0;
    QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += q.points;
      }
    });
    return score;
  };

  const handleSelect = (questionId: number, answerIndex: number) => {
    if (showCorrections) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: answerIndex,
    }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowCorrections(false);
  };

  const score = calculateScore();
  const percentage = Math.round((score / totalPoints) * 100);
  const allAnswered = QUESTIONS.every((q) => selectedAnswers[q.id] !== undefined);

  return (
    <div className="bg-white rounded-3xl border border-navy/10 p-5 sm:p-7 shadow-sm space-y-6">
      {/* En-tête */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy/10 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="p-2.5 rounded-2xl bg-amber-500/10 text-amber-600">
            <Trophy className="w-5 h-5" />
          </span>
          <div>
            <h3 className="font-bold text-navy text-base sm:text-lg">
              Quiz d&apos;Évaluation — Particules Chargées dans E et B
            </h3>
            <p className="text-text/60 text-xs sm:text-sm">
              6 Questions type Baccalauréat Sénégal S2 • Barème officiel sur {totalPoints} points
            </p>
          </div>
        </div>

        {showCorrections && (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-navy/5 border border-navy/10">
            <span className="text-xs text-text/70">Score obtenu :</span>
            <span className="font-mono font-bold text-turquoise text-sm">
              {score} / {totalPoints} pts ({percentage}%)
            </span>
          </div>
        )}
      </div>

      {/* Liste des questions */}
      <div className="space-y-6">
        {QUESTIONS.map((q, idx) => {
          const userAnswer = selectedAnswers[q.id];
          const isAnswered = userAnswer !== undefined;
          const isCorrect = isAnswered && userAnswer === q.correctIndex;

          return (
            <div
              key={q.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                showCorrections
                  ? isCorrect
                    ? 'bg-emerald-50/50 border-emerald-200'
                    : 'bg-rose-50/50 border-rose-200'
                  : 'bg-surface/30 border-navy/10 hover:border-navy/20'
              }`}
            >
              {/* Question & Métadonnées */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: q.stars }).map((_, sIdx) => (
                      <Star key={sIdx} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <span className="text-[11px] font-semibold text-text/60 px-2 py-0.5 rounded-md bg-white border border-navy/10">
                  {q.points} pt{q.points > 1 ? 's' : ''}
                </span>
              </div>

              {/* Énoncé */}
              <div className="text-xs sm:text-sm font-semibold text-navy leading-relaxed mb-3">
                <MathRenderer content={q.question} />
              </div>

              {/* Choix de réponses */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.answers.map((ans, aIdx) => {
                  const isSelected = userAnswer === aIdx;
                  let btnStyle = 'bg-white border-navy/10 hover:border-turquoise text-text/90';

                  if (showCorrections) {
                    if (aIdx === q.correctIndex) {
                      btnStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                    } else if (isSelected) {
                      btnStyle = 'bg-rose-100 border-rose-400 text-rose-950';
                    } else {
                      btnStyle = 'bg-white/50 border-navy/5 text-text/40 opacity-60';
                    }
                  } else if (isSelected) {
                    btnStyle = 'bg-navy text-white border-navy font-semibold shadow-xs';
                  }

                  return (
                    <button
                      key={aIdx}
                      onClick={() => handleSelect(q.id, aIdx)}
                      disabled={showCorrections}
                      className={`p-3 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-2 ${btnStyle}`}
                    >
                      <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5 opacity-80">
                        {String.fromCharCode(65 + aIdx)}
                      </span>
                      <div className="flex-1 leading-relaxed">
                        <MathRenderer content={ans} />
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Correction & Explication détaillée */}
              {showCorrections && (
                <div className="mt-4 pt-3 border-t border-navy/10 space-y-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-bold">
                    {isCorrect ? (
                      <span className="text-emerald-700 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4" /> Réponse exacte (+{q.points} pt)
                      </span>
                    ) : (
                      <span className="text-rose-700 flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> Réponse incorrecte (0 pt)
                      </span>
                    )}
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-navy/10 text-xs text-text/85 space-y-1">
                    <div className="font-bold text-navy flex items-center gap-1">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                      <span>Explication &amp; Justification Bac S2</span>
                    </div>
                    <div className="leading-relaxed"><MathRenderer content={q.explanation} /></div>
                  </div>

                  {q.wolof && (
                    <div className="p-3 bg-amber-500/10 rounded-xl border border-amber-500/20 text-xs text-amber-950">
                      <div className="font-bold text-amber-900 mb-0.5 flex items-center gap-1">
                        <span>🇸🇳</span> Xam-xam ci Wolof
                      </div>
                      <div className="leading-relaxed font-medium"><MathRenderer content={q.wolof} /></div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Actions & Boutons de validation */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-navy/10">
        <div className="text-xs text-text/60">
          {Object.keys(selectedAnswers).length} sur {QUESTIONS.length} questions répondues
        </div>

        <div className="flex items-center gap-2">
          {showCorrections && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-navy/15 text-navy bg-white hover:bg-surface text-xs sm:text-sm font-bold transition-all shadow-xs"
            >
              <RotateCcw className="w-4 h-4" /> Recommencer le test
            </button>
          )}

          {!showCorrections ? (
            <button
              onClick={() => setShowCorrections(true)}
              disabled={!allAnswered}
              className={`flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm ${
                allAnswered
                  ? 'bg-turquoise hover:bg-turquoise-hover text-white'
                  : 'bg-navy/10 text-navy/40 cursor-not-allowed'
              }`}
            >
              <CheckCircle className="w-4 h-4" /> Corriger mes réponses
            </button>
          ) : (
            <div className="text-xs font-bold text-turquoise">
              Score final enregistré dans vos statistiques
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

