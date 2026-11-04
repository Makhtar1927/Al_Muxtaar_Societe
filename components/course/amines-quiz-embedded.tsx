'use client';

import React, { useState, useEffect, useCallback } from 'react';
import MathRenderer from '@/components/course/math-renderer';

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
   BANQUE DE QUESTIONS (Baccalauréat S2 Sénégal — Amines C2)
   ============================================================ */
const QUESTION_BANK: RawQuestion[] = [
  {
    id: 'q1',
    difficulty: 1,
    question: `Quelle est la classe de l'amine de formule semi-développée suivante :
$$\\text{(CH}_3\\text{)}_3\\text{C}—\\text{NH}_2$$`,
    answers: [
      {
        id: '1',
        text: 'Amine primaire (1°)',
        isCorrect: true,
        explanation:
          '✓ Vrai : la classe d\'une amine est déterminée par le nombre de groupes carbonés liés à l\'atome d\'azote N. Ici l\'azote porte le groupe —NH₂ (2 atomes d\'hydrogène) et n\'est lié qu\'à un seul radical carboné : c\'est une amine primaire (1°), bien que le carbone voisin soit tertiaire.',
        wolofExplanation:
          'Dëgg la : azote N bi la ngay xool ci amine, du carbone bi ! Azote bi 2 hydrogènes la yor (-NH₂), kon classe 1 (primaire) la.',
      },
      {
        id: '2',
        text: 'Amine tertiaire (3°)',
        isCorrect: false,
        explanation:
          'Faux : c\'est le carbone qui est lié à 3 autres carbones (carbone tertiaire), mais l\'azote n\'est lié qu\'à un seul carbone. Pour les amines, on regarde exclusivement l\'atome d\'azote !',
        wolofExplanation:
          'Dédët : bul jaxase carbone ak azote. Azote bi benn groupe rek la lakkalool.',
      },
      {
        id: '3',
        text: 'Amine secondaire (2°)',
        isCorrect: false,
        explanation:
          'Faux : une amine secondaire possède la structure R—NH—R\' avec un seul atome d\'hydrogène fixé sur l\'azote.',
        wolofExplanation: 'Dédët : amine secondaire dafay am benn hydrogène rek ci azote bi.',
      },
      {
        id: '4',
        text: 'Sel d\'ammonium quaternaire',
        isCorrect: false,
        explanation:
          'Faux : un sel d\'ammonium quaternaire possède 4 liaisons carbone-azote et porte une charge positive [R₄N]⁺.',
        wolofExplanation: 'Dédët : amul charge positive fi, amine ordinaire la.',
      },
    ],
  },
  {
    id: 'q2',
    difficulty: 1,
    question: `Quel est le nom officiel UICPA de l'amine de formule :
$$\\text{CH}_3—\\text{CH}_2—\\text{NH}—\\text{CH}_3$$`,
    answers: [
      {
        id: '1',
        text: 'N-méthyléthanamine',
        isCorrect: true,
        explanation:
          '✓ Vrai : la chaîne carbonée la plus longue liée à l\'azote comporte 2 carbones (éthanamine). Le substituant méthyle fixé sur l\'azote est désigné par le préfixe N-méthyl.',
        wolofExplanation:
          'Dëgg la : chaîne bi gën a gudd 2 carbones la (éthane), méthyle bi nekk ci azote bi nga jox ko N-méthyle.',
      },
      {
        id: '2',
        text: 'Éthylméthylamine',
        isCorrect: false,
        explanation:
          'Faux : "éthylméthylamine" est un nom usuel classique, mais la nomenclature officielle UICPA impose la notation "N-méthyléthanamine".',
        wolofExplanation: 'Nom usuel la, wanté règle UICPA dafay laaj N-méthyléthanamine.',
      },
      {
        id: '3',
        text: 'Propan-2-amine',
        isCorrect: false,
        explanation:
          'Faux : la propan-2-amine est un isomère de constitution de formule CH₃—CH(NH₂)—CH₃, qui est une amine primaire.',
        wolofExplanation: 'Isomère la rekk, wanté kii amine secondaire la.',
      },
      {
        id: '4',
        text: 'Diméthyléthanamine',
        isCorrect: false,
        explanation:
          'Faux : il n\'y a qu\'un seul groupe méthyle fixé sur l\'azote, pas deux.',
        wolofExplanation: 'Benn méthyle rek am fi, ñaar amul.',
      },
    ],
  },
  {
    id: 'q3',
    difficulty: 2,
    question: `Classer les trois composés suivants par ordre croissant de force basique (du moins basique au plus basique) :
1. Aniline ($\\text{C}_6\\text{H}_5—\\text{NH}_2$, $pK_a = 4{,}6$)
2. Ammoniac ($\\text{NH}_3$, $pK_a = 9{,}2$)
3. Éthanamine ($\\text{CH}_3—\\text{CH}_2—\\text{NH}_2$, $pK_a = 10{,}7$)`,
    answers: [
      {
        id: '1',
        text: 'Aniline < Ammoniac < Éthanamine',
        isCorrect: true,
        explanation:
          '✓ Vrai : plus le pKa est grand, plus la base est forte. L\'aniline est la plus faible (doublet délocalisé dans le cycle benzénique par mésomérie). L\'éthanamine est la plus forte grâce à l\'effet inducteur donneur (+I) du radical éthyle qui enrichit l\'azote en électrons.',
        wolofExplanation:
          'Dëgg la : aniline dafa néew doole lool car doublet bi tàbi na ci biir cycle bi. Éthanamine moo gën a forcé ndax effet +I u éthyle bi.',
      },
      {
        id: '2',
        text: 'Éthanamine < Ammoniac < Aniline',
        isCorrect: false,
        explanation:
          'Faux : c\'est l\'ordre inverse ! Plus le pKa est élevé, plus la base conjuguée est forte.',
        wolofExplanation: 'Inversé nga ko : pKa bu kawe mooy base bu forcé.',
      },
      {
        id: '3',
        text: 'Ammoniac < Aniline < Éthanamine',
        isCorrect: false,
        explanation:
          'Faux : l\'ammoniac (pKa = 9,2) est nettement plus basique que l\'aniline (pKa = 4,6).',
        wolofExplanation: 'Ammoniac gën a forcé aniline fuff.',
      },
      {
        id: '4',
        text: 'Aniline < Éthanamine < Ammoniac',
        isCorrect: false,
        explanation:
          'Faux : l\'éthanamine est une base plus forte que l\'ammoniac par effet donneur (+I).',
        wolofExplanation: 'Éthanamine moo gën a forcé ammoniac.',
      },
    ],
  },
  {
    id: 'q4',
    difficulty: 2,
    question: `Lors de l'action du chlorure d'éthanoyle $\\text{CH}_3—\\text{COCl}$ sur l'éthanamine $\\text{CH}_3—\\text{CH}_2—\\text{NH}_2$, quel est le coefficient stœchiométrique minimal de l'amine ?`,
    answers: [
      {
        id: '1',
        text: '2 moles d\'amine pour 1 mole de chlorure d\'acyle',
        isCorrect: true,
        explanation:
          '✓ Vrai : la 1ère mole d\'amine réagit avec le chlorure d\'acyle pour former l\'amide et libérer du HCl. La 2ème mole d\'amine neutralise immédiatement ce HCl pour former le sel de chlorure d\'éthylammonium : CH₃COCl + 2 C₂H₅NH₂ → CH₃CONHC₂H₅ + C₂H₅NH₃⁺Cl⁻.',
        wolofExplanation:
          'Dëgg la : coefficient 2 bi obligatoire la ci Bac ! Benn mole bi mooy def amide bi, ñaareel bi dafay jàpp acide HCl bi génn.',
      },
      {
        id: '2',
        text: '1 mole d\'amine pour 1 mole de chlorure d\'acyle',
        isCorrect: false,
        explanation:
          'Faux : si on n\'utilise qu\'une seule mole d\'amine, le HCl libéré détruit la moitié de l\'amine restante en formant le sel d\'ammonium, ce qui bloque la réaction à 50% de rendement.',
        wolofExplanation: 'Benn mole du doy ndax HCl bi génn dafay yàqq amine bi ci kow.',
      },
      {
        id: '3',
        text: '3 moles d\'amine pour 1 mole de chlorure d\'acyle',
        isCorrect: false,
        explanation:
          'Faux : 2 moles suffisent strictement pour former l\'amide et neutraliser le chlorure d\'hydrogène.',
        wolofExplanation: 'Ñaari moles rek lañu soxla.',
      },
      {
        id: '4',
        text: 'Aucune mole : cette réaction ne se produit pas',
        isCorrect: false,
        explanation:
          'Faux : la réaction est totale, très rapide et exothermique. Elle sert de référence au Bac pour la préparation des amides.',
        wolofExplanation: 'Réaction bu gaaw te totale la ci programme Bac S2.',
      },
    ],
  },
  {
    id: 'q5',
    difficulty: 2,
    question: `Dans la polyalkylation d'Hofmann, quel réactif en excès permet d'obtenir majoritairement le sel d'ammonium quaternaire $[R-\\text{N}(R')_3]^+\\text{X}^-$ ?`,
    answers: [
      {
        id: '1',
        text: 'Un large excès d\'halogénoalcane (R\'—X)',
        isCorrect: true,
        explanation:
          '✓ Vrai : en présence d\'un large excès d\'halogénoalcane, les substitutions nucléophiles successives se poursuivent jusqu\'à la fixation de 4 radicaux sur l\'azote, aboutissant quantitativement au sel d\'ammonium quaternaire.',
        wolofExplanation:
          'Dëgg la : boo doliée halogénoalcane bu ëpp, réaction bi dafay dem ba ci mujj gi ba amul benn H bu des ci azote bi.',
      },
      {
        id: '2',
        text: 'Un large excès d\'amine primaire (R—NH₂)',
        isCorrect: false,
        explanation:
          'Faux : un excès d\'amine primaire favorise au contraire l\'arrêt de la réaction au stade de l\'amine secondaire (1ère étape).',
        wolofExplanation: 'Excès amine moom amine secondaire rek lay joxe.',
      },
      {
        id: '3',
        text: 'Une quantité stœchiométrique 1:1',
        isCorrect: false,
        explanation:
          'Faux : un mélange équimolaire produit un mélange indésirable et complexe d\'amines secondaires, tertiaires et de sel quaternaire.',
        wolofExplanation: 'Mélange bu jaxaso lay joxe.',
      },
      {
        id: '4',
        text: 'Un excès d\'eau distillée à chaud',
        isCorrect: false,
        explanation:
          'Faux : l\'eau ne participe pas à l\'alkylation d\'Hofmann.',
        wolofExplanation: 'Ndox amul benn solo ci alkylation d\'Hofmann.',
      },
    ],
  },
];

/* ============================================================
   COMPOSANT PRINCIPAL AMINES QUIZ EMBEDDED
   ============================================================ */

const LETTERS = ['A', 'B', 'C', 'D'];

export default function AminesQuizEmbedded() {
  const [questions, setQuestions] = useState<ProcessedQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  // Initialisation stable des questions
  const initQuestions = useCallback(() => {
    const processed: ProcessedQuestion[] = QUESTION_BANK.map((q) => ({
      id: q.id,
      question: q.question,
      difficulty: q.difficulty,
      answers: q.answers.map((a, idx) => ({
        letter: LETTERS[idx] || 'A',
        text: a.text,
        isCorrect: a.isCorrect,
        explanation: a.explanation,
        wolofExplanation: a.wolofExplanation,
      })),
    }));
    setQuestions(processed);
    setCurrentIndex(0);
    setSelectedLetter(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  }, []);

  useEffect(() => {
    initQuestions();
  }, [initQuestions]);

  if (questions.length === 0) return null;

  const currentQ = questions[currentIndex];

  const handleSelectAnswer = (letter: string) => {
    if (isAnswered) return;
    setSelectedLetter(letter);
    setIsAnswered(true);

    const chosen = currentQ.answers.find((a) => a.letter === letter);
    if (chosen?.isCorrect) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedLetter(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const selectedAnswerObj = currentQ.answers.find((a) => a.letter === selectedLetter);

  return (
    <section className="bg-white rounded-3xl border border-navy/10 p-5 sm:p-7 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-turquoise animate-pulse" />
            <span className="text-[11px] font-bold text-turquoise uppercase tracking-widest">
              Entraînement Baccalauréat Sénégal • Terminale S2
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-navy mt-1">
            Quiz Express : Classes d&apos;Amines, Basicité & Hofmann
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-navy/60">Score :</span>
          <span className="font-mono text-sm font-black text-turquoise bg-turquoise-light/30 px-3 py-1 rounded-xl">
            {score} / {questions.length}
          </span>
        </div>
      </div>

      {!quizFinished ? (
        <div className="space-y-6">
          {/* Progression */}
          <div className="flex items-center justify-between text-xs text-navy/60 font-bold">
            <span>Question {currentIndex + 1} sur {questions.length}</span>
            <span className="flex items-center gap-1 text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
              Difficulté Bac : {currentQ.difficulty === 1 ? '★☆☆ (Essentiel)' : currentQ.difficulty === 2 ? '★★☆ (Classique)' : '★★★ (Piège)'}
            </span>
          </div>

          <div className="w-full bg-surface rounded-full h-2 overflow-hidden border border-navy/5">
            <div
              className="bg-turquoise h-full rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
            />
          </div>

          {/* Énoncé de la question */}
          <div className="bg-surface/60 rounded-2xl border border-navy/10 p-5 sm:p-6 text-navy font-medium text-sm sm:text-base leading-relaxed">
            <MathRenderer content={currentQ.question} />
          </div>

          {/* Choix de réponses */}
          <div className="space-y-3">
            {currentQ.answers.map((ans) => {
              const isSelected = selectedLetter === ans.letter;
              let btnStyle = 'bg-surface hover:bg-surface-muted border-navy/10 text-navy';

              if (isAnswered) {
                if (ans.isCorrect) {
                  btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold shadow-sm';
                } else if (isSelected && !ans.isCorrect) {
                  btnStyle = 'bg-rose-50 border-rose-400 text-rose-950 font-bold';
                } else {
                  btnStyle = 'opacity-40 border-navy/5 text-navy/40';
                }
              }

              return (
                <button
                  key={ans.letter}
                  onClick={() => handleSelectAnswer(ans.letter)}
                  disabled={isAnswered}
                  className={`w-full p-4 rounded-2xl border text-left transition-all flex items-start gap-3 ${btnStyle}`}
                >
                  <span
                    className={`h-7 w-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 mt-0.5 ${
                      isAnswered && ans.isCorrect
                        ? 'bg-emerald-500 text-white'
                        : isAnswered && isSelected && !ans.isCorrect
                        ? 'bg-rose-500 text-white'
                        : 'bg-navy/10 text-navy'
                    }`}
                  >
                    {ans.letter}
                  </span>
                  <div className="flex-1 text-xs sm:text-sm">
                    <MathRenderer content={ans.text} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Rétroaction Pédagogique */}
          {isAnswered && selectedAnswerObj && (
            <div
              className={`rounded-2xl p-5 border space-y-3 animate-fade-in ${
                selectedAnswerObj.isCorrect
                  ? 'bg-emerald-50/70 border-emerald-300'
                  : 'bg-rose-50/70 border-rose-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span
                  className={`text-xs font-black uppercase tracking-wider ${
                    selectedAnswerObj.isCorrect ? 'text-emerald-800' : 'text-rose-800'
                  }`}
                >
                  {selectedAnswerObj.isCorrect ? '✓ Excellente réponse !' : '✗ Attention, erreur fréquente :'}
                </span>
                <span className="text-[11px] font-bold text-navy/50">Explication Officielle Bac</span>
              </div>

              <div className="text-xs sm:text-sm text-navy-light leading-relaxed">
                <MathRenderer content={selectedAnswerObj.explanation} />
              </div>

              {selectedAnswerObj.wolofExplanation && (
                <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3 text-xs text-amber-950 italic flex items-center gap-2">
                  <span className="font-bold not-italic shrink-0">💡 Xam-xam :</span>
                  <span>{selectedAnswerObj.wolofExplanation}</span>
                </div>
              )}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 bg-navy text-white text-xs font-bold rounded-xl shadow-sm hover:bg-navy/90 transition-all flex items-center gap-2"
                >
                  <span>{currentIndex < questions.length - 1 ? 'Question suivante' : 'Voir mon bilan'}</span>
                  <span>→</span>
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Bilan Final */
        <div className="text-center py-8 space-y-5">
          <div className="mx-auto h-16 w-16 rounded-3xl bg-turquoise/10 text-turquoise flex items-center justify-center font-black text-2xl shadow-inner">
            {score >= 4 ? '🏆' : score >= 3 ? '👏' : '📚'}
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-black text-navy">
              {score === 5
                ? 'Score Parfait ! 20/20'
                : score >= 4
                ? 'Très bon travail ! Niveau Bac validé'
                : score >= 3
                ? 'Bonne maîtrise, quelques détails à revoir'
                : 'Poursuivez la révision des fiches réflexes'}
            </h3>
            <p className="text-xs text-navy/60">
              Vous avez obtenu <strong>{score} sur {questions.length}</strong> bonnes réponses.
            </p>
          </div>

          <button
            onClick={initQuestions}
            className="px-6 py-2.5 bg-turquoise text-white text-xs font-bold rounded-xl shadow-sm hover:bg-turquoise/90 transition-all"
          >
            Recommencer le Quiz
          </button>
        </div>
      )}
    </section>
  );
}
