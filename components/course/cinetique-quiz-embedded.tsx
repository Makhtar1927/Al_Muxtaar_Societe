'use client';

import React, { useState, useEffect, useCallback } from 'react';
import MathRenderer from '@/components/course/math-renderer';
import StudyIcon, { StudyIconName } from '@/components/ui/study-icon';

/* ============================================================
   TYPES & STRUCTURES
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
   BANQUE COMPLÈTE DE QUESTIONS (Baccalauréat S2 Sénégal)
   ============================================================ */
const QUESTION_BANK: RawQuestion[] = [
  {
    id: 'q1',
    difficulty: 1,
    question: `Parmi les propositions suivantes concernant les **facteurs cinétiques**, laquelle est rigoureusement **vraie** ?`,
    answers: [
      {
        id: '1',
        text: 'Une augmentation de la température diminue toujours la vitesse d\'une réaction.',
        isCorrect: false,
        explanation: 'Faux : une augmentation de température accélère toujours les réactions chimiques en augmentant la fréquence des chocs efficaces.',
        wolofExplanation: 'Dédët : bu safara gi gënée tàng, réactifs yi dañuy gën a gaaw a daccante ba réaction bi gën a gaaw !',
      },
      {
        id: '2',
        text: 'La vitesse d\'une réaction augmente lorsque la concentration initiale des réactifs augmente.',
        isCorrect: true,
        explanation: '✓ Vrai : plus les réactifs sont concentrés, plus il y a d\'entités par unité de volume, donc plus la probabilité de chocs efficaces augmente.',
        wolofExplanation: 'Dëgg la : bu réactifs yi féssee ci ndox mi naka marché Sandaga, chocs yi dañuy yokk ba réaction bi gën a gaaw !',
      },
      {
        id: '3',
        text: 'Un catalyseur augmente la vitesse en augmentant la quantité maximale de produit $x_\\text{max}$ formé.',
        isCorrect: false,
        explanation: 'Faux : piège classique du Bac S2 ! Un catalyseur accélère l\'atteinte de l\'état final mais ne modifie jamais $x_\\text{max}$.',
        wolofExplanation: 'Moytul njuumte bi : catalyseur du yokk $x_\\text{max}$, day gaawal yoon bi rekk !',
      },
      {
        id: '4',
        text: 'La vitesse volumique d\'une réaction reste constante du début jusqu\'à la fin de la réaction.',
        isCorrect: false,
        explanation: 'Faux : la vitesse diminue continuellement au cours du temps à mesure que les réactifs sont consommés.',
        wolofExplanation: 'Vitesse bi day waññiku ndànk ndax réactifs yi ñoo ngi jeex.',
      },
    ],
  },
  {
    id: 'q2',
    difficulty: 2,
    question: `Au laboratoire, lors du suivi de l'oxydation des ions iodure $I^-$ par les ions peroxodisulfate $S_2O_8^{2-}$ ($S_2O_8^{2-} + 2 I^- \\longrightarrow 2 SO_4^{2-} + I_2$), pourquoi effectue-t-on une **trempe chimique** dans un bain d'eau glacée avant chaque dosage ?`,
    answers: [
      {
        id: '1',
        text: 'Pour dissoudre complètement le précipité de diiode $I_2$.',
        isCorrect: false,
        explanation: 'Faux : le diiode n\'est pas un précipité mais une espèce en solution aqueuse (brune/jaune).',
      },
      {
        id: '2',
        text: 'Pour bloquer quasi-instantanément la réaction afin de doser le diiode présent exactement à la date $t$.',
        isCorrect: true,
        explanation: '✓ Exact : le dosage volumétrique prend du temps. La trempe dans l\'eau glacée annule quasi-totalement la vitesse de réaction ($v \\approx 0$), ce qui fige la composition du système à l\'instant du prélèvement.',
        wolofExplanation: 'Trempe mooy dëpp réaction bi ci ndoxum galaas ngir mu taxaw cak ci waxtu $t$ ba nga mën ko dose ci burette bi te dara du ci dolleeku !',
      },
      {
        id: '3',
        text: 'Pour augmenter la vitesse de réaction avec le thiosulfate de sodium.',
        isCorrect: false,
        explanation: 'Faux : le froid ralentit au contraire les réactions chimiques.',
      },
      {
        id: '4',
        text: 'Pour régénérer les ions peroxodisulfate consommés.',
        isCorrect: false,
        explanation: 'Faux : la trempe ne peut pas inverser une réaction chimique totale.',
      },
    ],
  },
  {
    id: 'q3',
    difficulty: 2,
    question: `Sur la courbe de l'avancement $x = f(t)$ ci-contre, la valeur finale sur le plateau est $x_\\text{max} = 4{,}0\\text{ mmol}$. Quelle est la valeur de l'avancement au **temps de demi-réaction** $t_{1/2}$ ?`,
    answers: [
      {
        id: '1',
        text: '$x(t_{1/2}) = 2{,}0\\text{ mmol}$',
        isCorrect: true,
        explanation: '✓ Exact : par définition officielle, le temps de demi-réaction $t_{1/2}$ correspond à $x(t_{1/2}) = \\frac{x_\\text{max}}{2} = \\frac{4{,}0}{2} = 2{,}0\\text{ mmol}$.',
        wolofExplanation: 'Dëgg la : $t_{1/2}$ mooy waxtu bi avancement bi di toll ci x_max / 2, maanaam 4,0 / 2 = 2,0 mmol !',
      },
      {
        id: '2',
        text: '$x(t_{1/2}) = 4{,}0\\text{ mmol}$',
        isCorrect: false,
        explanation: 'Faux : $4{,}0\\text{ mmol}$ est l\'avancement final maximal $x_\\text{max}$.',
      },
      {
        id: '3',
        text: '$x(t_{1/2}) = 0\\text{ mmol}$',
        isCorrect: false,
        explanation: 'Faux : à $t = 0$, $x(0) = 0\\text{ mmol}$.',
      },
      {
        id: '4',
        text: '$x(t_{1/2}) = 1{,}0\\text{ mmol}$',
        isCorrect: false,
        explanation: 'Faux : cela correspondrait au quart de la réaction, pas à la demi-réaction.',
      },
    ],
  },
  {
    id: 'q4',
    difficulty: 3,
    question: `Soit la réaction $A + 2 B \\longrightarrow 3 C + D$. La vitesse volumique de réaction s'écrit $v = \\frac{1}{V}\\frac{dx}{dt}$. Quelle relation relie la vitesse de disparition de $B$ notée $v_\\text{disp}(B) = -\\frac{1}{V}\\frac{dn_B}{dt}$ et la vitesse de réaction $v$ ?`,
    answers: [
      {
        id: '1',
        text: '$v_\\text{disp}(B) = v$',
        isCorrect: false,
        explanation: 'Faux : il faut tenir compte du coefficient stœchiométrique 2 devant l\'espèce $B$.',
      },
      {
        id: '2',
        text: '$v_\\text{disp}(B) = 2 v$',
        isCorrect: true,
        explanation: '✓ Exact : d\'après le tableau d\'avancement, $n_B(t) = n_{B0} - 2 x(t)$, donc $-\\frac{dn_B}{dt} = 2\\frac{dx}{dt}$, d\'où $v_\\text{disp}(B) = 2 v$. L\'espèce $B$ disparaît deux fois plus vite que l\'avancement global de la réaction !',
        wolofExplanation: 'Dëgg la : ndax coefficient 2 bi nekk ci kanamu B, B dafay jeex ñaari yoon gën a gaaw ci x(t) !',
      },
      {
        id: '3',
        text: '$v_\\text{disp}(B) = \\frac{1}{2} v$',
        isCorrect: false,
        explanation: 'Faux : c\'est l\'inverse ! $v = \\frac{1}{2} v_\\text{disp}(B)$, donc $v_\\text{disp}(B) = 2 v$.',
      },
      {
        id: '4',
        text: '$v_\\text{disp}(B) = -2 v$',
        isCorrect: false,
        explanation: 'Faux : une vitesse de disparition est toujours une grandeur positive ($v_\\text{disp} \\ge 0$).',
      },
    ],
  },
  {
    id: 'q5',
    difficulty: 3,
    question: `Au cours du temps, la tangente à la courbe $x = f(t)$ devient de plus en plus horizontale. Que peut-on rigoureusement en déduire sur le plan cinétique ?`,
    answers: [
      {
        id: '1',
        text: 'La vitesse de la réaction diminue car la concentration des réactifs s\'épuise.',
        isCorrect: true,
        explanation: '✓ Vrai : la vitesse volumique $v(t) = \\frac{1}{V}\\frac{dx}{dt}$ est proportionnelle au coefficient directeur de la tangente. Lorsque la tangente s\'aplatit, sa pente tend vers 0, ce qui traduit le ralentissement puis l\'arrêt de la réaction par épuisement des réactifs.',
        wolofExplanation: 'Tangente bi buy tëdd ndànk, mooy vitesse bi di waññiku ndax réactifs yi ñoo ngi jeex ba kero réaction bi di taxaw !',
      },
      {
        id: '2',
        text: 'La réaction s\'accélère en approchant de l\'état final.',
        isCorrect: false,
        explanation: 'Faux : si la réaction s\'accélérait, la pente de la tangente deviendrait plus verticale.',
      },
      {
        id: '3',
        text: 'La température du mélange réactionnel a spontanément chuté à 0 °C.',
        isCorrect: false,
        explanation: 'Faux : même à température constante dans un thermostat, la vitesse diminue inévitablement par diminution des concentrations.',
      },
      {
        id: '4',
        text: 'Le catalyseur a été détruit par les produits formés.',
        isCorrect: false,
        explanation: 'Faux : un catalyseur n\'est pas consommé par la réaction.',
      },
    ],
  },
];

export default function CinetiqueQuizEmbedded() {
  const [questions, setQuestions] = useState<ProcessedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const initQuiz = useCallback(() => {
    const letters = ['A', 'B', 'C', 'D'];
    const processed: ProcessedQuestion[] = QUESTION_BANK.map((q) => {
      return {
        id: q.id,
        question: q.question,
        difficulty: q.difficulty,
        answers: q.answers.map((ans, idx) => ({
          letter: letters[idx],
          text: ans.text,
          isCorrect: ans.isCorrect,
          explanation: ans.explanation,
          wolofExplanation: ans.wolofExplanation,
        })),
      };
    });

    setQuestions(processed);
    setCurrentIndex(0);
    setSelectedLetter(null);
    setScore(0);
    setIsAnswered(false);
    setIsCompleted(false);
  }, []);

  useEffect(() => {
    initQuiz();
  }, [initQuiz]);

  if (questions.length === 0) return null;

  const currentQ = questions[currentIndex];
  const selectedAns = currentQ.answers.find((a) => a.letter === selectedLetter);

  const handleSelect = (letter: string) => {
    if (isAnswered) return;
    setSelectedLetter(letter);
    setIsAnswered(true);

    const ans = currentQ.answers.find((a) => a.letter === letter);
    if (ans?.isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedLetter(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-navy/10 p-5 sm:p-7 shadow-sm space-y-6">
      {/* En-tête */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy/10 pb-4">
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block">
            Auto-Évaluation Interactive • Type Baccalauréat
          </span>
          <h3 className="text-lg font-black text-navy flex items-center gap-2 mt-0.5">
            <span>📝</span> Quiz Cinétique Chimique &amp; Facteurs Cinétiques
          </h3>
        </div>
        <span className="text-xs font-bold text-navy bg-surface px-3 py-1 rounded-full border border-navy/10">
          Question {currentIndex + 1} / {questions.length}
        </span>
      </div>

      {!isCompleted ? (
        <div className="mt-6 space-y-6">
          {/* Énoncé de la question */}
          <div className="rounded-2xl bg-surface/70 p-4 sm:p-5 border border-navy/8">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                Difficulté : {currentQ.difficulty === 1 ? 'Facile' : currentQ.difficulty === 2 ? 'Intermédiaire' : 'Type Bac S2'}
              </span>
            </div>
            <div className="text-sm font-bold text-navy leading-relaxed">
              <MathRenderer content={currentQ.question} />
            </div>
          </div>

          {/* Liste des choix de réponses */}
          <div className="space-y-2.5">
            {currentQ.answers.map((ans) => {
              const isSelected = selectedLetter === ans.letter;
              let btnStyle = 'border-navy/15 bg-white hover:border-turquoise text-navy';

              if (isAnswered) {
                if (ans.isCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-bold';
                } else if (isSelected && !ans.isCorrect) {
                  btnStyle = 'border-rose-500 bg-rose-50 text-rose-900 font-bold';
                } else {
                  btnStyle = 'border-navy/10 bg-white opacity-50 text-navy';
                }
              }

              return (
                <button
                  key={ans.letter}
                  onClick={() => handleSelect(ans.letter)}
                  disabled={isAnswered}
                  className={`w-full text-left p-3.5 rounded-2xl border-2 transition-all flex items-start gap-3 ${btnStyle}`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-black ${
                      isAnswered && ans.isCorrect
                        ? 'bg-emerald-500 text-white'
                        : isAnswered && isSelected && !ans.isCorrect
                        ? 'bg-rose-500 text-white'
                        : 'bg-navy/10 text-navy'
                    }`}
                  >
                    {ans.letter}
                  </span>
                  <div className="text-xs sm:text-sm pt-0.5 flex-1">
                    <MathRenderer content={ans.text} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explication après réponse */}
          {isAnswered && selectedAns && (
            <div
              className={`rounded-2xl p-4 border space-y-2 ${
                selectedAns.isCorrect
                  ? 'border-emerald-300 bg-emerald-50/60'
                  : 'border-rose-300 bg-rose-50/60'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-black">
                {selectedAns.isCorrect ? (
                  <span className="text-emerald-800 flex items-center gap-1">
                    <span>✓</span> Bonne réponse !
                  </span>
                ) : (
                  <span className="text-rose-800 flex items-center gap-1">
                    <span>✗</span> Réponse incorrecte
                  </span>
                )}
              </div>
              <div className="text-xs text-navy/90 leading-relaxed">
                <MathRenderer
                  content={
                    selectedAns.isCorrect
                      ? selectedAns.explanation
                      : `La bonne réponse était la lettre **${
                          currentQ.answers.find((a) => a.isCorrect)?.letter
                        }** : ${currentQ.answers.find((a) => a.isCorrect)?.explanation}`
                  }
                />
              </div>

              {/* Explication Wolof */}
              {selectedAns.wolofExplanation && (
                <div className="mt-2 rounded-xl border border-gold/30 bg-gold-light/40 p-2.5 text-[11px] text-navy/85 italic">
                  <strong>🗣️ Wolof :</strong> {selectedAns.wolofExplanation}
                </div>
              )}

              {/* Bouton Suivant */}
              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNext}
                  className="rounded-xl bg-navy px-4 py-2 text-xs font-black text-white hover:bg-navy-dark shadow-sm"
                >
                  {currentIndex < questions.length - 1 ? 'Question Suivante →' : 'Voir mon bilan'}
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Résumé final */
        <div className="mt-6 rounded-2xl bg-surface/80 p-6 border border-navy/10 text-center space-y-4">
          <div className="h-16 w-16 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-2xl font-black text-emerald-700">
            {score}/{questions.length}
          </div>
          <div>
            <h4 className="text-lg font-black text-navy">
              {score === questions.length
                ? '🎉 Excellent ! Maîtrise parfaite de la Cinétique Bac S2'
                : score >= 3
                ? '👍 Bon résultat ! Vos bases en cinétique sont solides'
                : '💡 À revoir : Recommencez le quiz et relisez les fiches réflexes'}
            </h4>
            <p className="text-xs text-text/70 mt-1">
              Vous avez obtenu {score} bonnes réponses sur {questions.length} questions types Bac S2.
            </p>
          </div>
          <button
            onClick={initQuiz}
            className="rounded-xl bg-navy px-5 py-2.5 text-xs font-black text-white hover:bg-navy-dark shadow-sm"
          >
            ↺ Recommencer le Quiz
          </button>
        </div>
      )}
    </div>
  );
}

