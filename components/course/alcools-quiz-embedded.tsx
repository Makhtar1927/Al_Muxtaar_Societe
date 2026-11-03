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
   BANQUE COMPLÈTE DE QUESTIONS (Baccalauréat S2 Sénégal — Alcools)
   ============================================================ */
const QUESTION_BANK: RawQuestion[] = [
  {
    id: 'q1',
    difficulty: 1,
    question: `Quelle est la classe de l'alcool de formule semi-développée suivante :
$$\\text{CH}_3-\\text{C}(\\text{CH}_3)(\\text{OH})-\\text{CH}_3$$`,
    answers: [
      {
        id: '1',
        text: 'Alcool primaire (1°)',
        isCorrect: false,
        explanation: 'Faux : dans un alcool primaire, le carbone fonctionnel n\'est lié qu\'à au plus un seul atome de carbone (ex: CH₃—CH₂—OH).',
        wolofExplanation: 'Dédët : carbone bi yor -OH bi am na 3 yeneen carbone yu ko wër ci wet yi, kon mënul nekk classe 1 !',
      },
      {
        id: '2',
        text: 'Alcool secondaire (2°)',
        isCorrect: false,
        explanation: 'Faux : dans un alcool secondaire, le carbone fonctionnel est lié à deux atomes de carbone (ex: CH₃—CH(OH)—CH₃).',
        wolofExplanation: 'Dédët : ñaar rekk duñ ko wër, ñett ñoo ko làpp ci wet yépp !',
      },
      {
        id: '3',
        text: 'Alcool tertiaire (3°)',
        isCorrect: true,
        explanation: '✓ Vrai : le carbone fonctionnel (porteur du groupe -OH) est directement lié à trois autres atomes de carbone (trois groupes méthyles -CH₃). C\'est le 2-méthylpropan-2-ol.',
        wolofExplanation: 'Dëgg la : carbone fonctionnel bi ñetti carbone ñoo ko wër ci wet yépp, kon classe 3 la (tertiaire) !',
      },
      {
        id: '4',
        text: 'Ce n\'est pas un alcool car il a des ramifications.',
        isCorrect: false,
        explanation: 'Faux : la présence de ramifications alkyles ne change rien à la fonction alcool, qui est définie par le groupe hydroxyle -OH.',
        wolofExplanation: 'Alcool la rekk ndax dafa yor groupement -OH.',
      },
    ],
  },
  {
    id: 'q2',
    difficulty: 2,
    question: `Quel est le **nom officiel UICPA** de la molécule suivante :
$$\\text{CH}_3-\\text{CH}(\\text{CH}_3)-\\text{CH}_2-\\text{CH}_2-\\text{OH}$$`,
    answers: [
      {
        id: '1',
        text: '2-méthylbutan-4-ol',
        isCorrect: false,
        explanation: 'Faux : la règle prioritaire de l\'UICPA impose d\'attribuer au carbone fonctionnel (porteur du -OH) le plus PETIT numéro possible. Il faut donc numéroter de droite à gauche !',
        wolofExplanation: 'Dédët : carbone bi yor -OH bi moo gën a am solo que branche méthyle bi, kon moom ngay jox numéro 1 !',
      },
      {
        id: '2',
        text: '3-méthylbutan-1-ol',
        isCorrect: true,
        explanation: '✓ Vrai : la chaîne principale la plus longue contenant le carbone fonctionnel compte 4 carbones (butane). En numérotant depuis le carbone fonctionnel (C1 à droite), la ramification méthyle se trouve sur le carbone C3. Le nom correct est 3-méthylbutan-1-ol.',
        wolofExplanation: 'Dëgg la : chaîne bi 4 carbones la (butane). -OH bi ci position 1 la nekk, méthyle bi ci position 3 : kon 3-méthylbutan-1-ol !',
      },
      {
        id: '3',
        text: 'Iso-pentanol',
        isCorrect: false,
        explanation: 'Faux : "isopentanol" est un nom usuel ancien, mais le Baccalauréat sénégalais exige impérativement la nomenclature systématique UICPA.',
        wolofExplanation: 'Iso-pentanol tour u gaañ la, waaye examen Bac nom UICPA systématique lañuy laaj.',
      },
      {
        id: '4',
        text: '3-méthylbutanol',
        isCorrect: false,
        explanation: 'Faux : il ne faut jamais omettre l\'indice de position du groupe hydroxyle (1-ol) selon les normes officielles.',
        wolofExplanation: 'War nga wax position u -OH bi (1-ol) ngir am barème complet bi.',
      },
    ],
  },
  {
    id: 'q3',
    difficulty: 2,
    question: `L'éthanol ($\\text{CH}_3-\\text{CH}_2-\\text{OH}$, $M = 46\\text{ g/mol}$) bout à **$+78^\\circ\\text{C}$**, tandis que le propane ($\\text{CH}_3-\\text{CH}_2-\\text{CH}_3$, $M = 44\\text{ g/mol}$) bout à **$-42^\\circ\\text{C}$**. 

Quelle est la **justification physique exacte** exigée au Bac S2 ?`,
    answers: [
      {
        id: '1',
        text: 'L\'éthanol a une masse molaire légèrement supérieure, ce qui augmente son inertie.',
        isCorrect: false,
        explanation: 'Faux : l\'écart de 2 g/mol est totalement négligeable et ne peut en aucun cas expliquer une différence de 120°C sur la température d\'ébullition !',
        wolofExplanation: 'Dédët : 46 ak 44 tolloo nañu lool, mësul indi différence bu tollni 120°C !',
      },
      {
        id: '2',
        text: 'La liaison O-H fortement polarisée permet l\'établissement de liaisons hydrogène intermoléculaires.',
        isCorrect: true,
        explanation: '✓ Vrai : la différence d\'électronégativité entre l\'oxygène et l\'hydrogène crée des dipôles permanents. Les molécules d\'éthanol s\'attirent par des liaisons hydrogène qui nécessitent un apport thermique important (+78°C) pour être rompues.',
        wolofExplanation: 'Dëgg la : liaison O-H dafa polarisé ba molécules yi di jàppante ak liaisons hydrogène naka aimant, war nga tàngal bu baax pour ñu mëna tas !',
      },
      {
        id: '3',
        text: 'L\'éthanol réagit spontanément avec l\'air ambiant.',
        isCorrect: false,
        explanation: 'Faux : la température d\'ébullition est une propriété physique réversible de changement d\'état, pas une réaction chimique.',
        wolofExplanation: 'Li propriété physique la (changement d\'état), du réaction chimique.',
      },
      {
        id: '4',
        text: 'Le propane est un gaz parfait qui ne peut jamais être liquéfié.',
        isCorrect: false,
        explanation: 'Faux : le propane se liquéfie facilement par compression ou en dessous de -42°C (ex: gaz en bouteille Total/Touba Gaz).',
        wolofExplanation: 'Propane mënees na ko liquéfier (naka gaz butane bu bouteille yi).',
      },
    ],
  },
  {
    id: 'q4',
    difficulty: 2,
    question: `Pourquoi le méthanol ($\\text{CH}_3\\text{OH}$) est-il **infiniment miscible** dans l'eau, alors que l'octan-1-ol ($\\text{C}_8\\text{H}_{17}\\text{OH}$) est **quasiment insoluble** ?`,
    answers: [
      {
        id: '1',
        text: 'Parce que l\'octan-1-ol ne possède pas de groupe -OH capable de se lier à l\'eau.',
        isCorrect: false,
        explanation: 'Faux : l\'octan-1-ol possède bien un groupe -OH, mais son effet hydrophile est complètement masqué par la longue chaîne alkyle.',
        wolofExplanation: 'Am na -OH, waaye chaîne carbone bi dafa gudd ba ëpp doole.',
      },
      {
        id: '2',
        text: 'Dans l\'octan-1-ol, la longue chaîne carbonée hydrophobe à 8 carbones l\'emporte sur le pôle hydrophile -OH.',
        isCorrect: true,
        explanation: '✓ Vrai : pour les alcools à chaîne courte (C1-C3), le pôle hydrophile polaire -OH domine. À partir de 5 carbones, la chaîne hydrocarbonée apolaire et hydrophobe prédomine, empêchant la dissolution dans l\'eau.',
        wolofExplanation: 'Dëgg la : 8 carbones hydrophobes yi dañuy bañ ndox mi ba groupe -OH bi amatul doole, loolu tax mu nekk insoluble !',
      },
      {
        id: '3',
        text: 'Parce que l\'eau détruit chimiquement le méthanol par hydrolyse.',
        isCorrect: false,
        explanation: 'Faux : la dissolution est un phénomène physique de solvatation sans aucune réaction chimique d\'hydrolyse.',
        wolofExplanation: 'Dédët : dissolution physique la, du réaction chimique.',
      },
      {
        id: '4',
        text: 'Parce que la densité de l\'octan-1-ol est supérieure à celle de l\'eau.',
        isCorrect: false,
        explanation: 'Faux : la densité de l\'octan-1-ol est d\'environ 0,83, donc inférieure à celle de l\'eau (il surnage au-dessus de l\'eau).',
        wolofExplanation: 'Densité u alcool dafa gën a woyof ndox mi (0,83 < 1,0), dafay tëdd ci kaw.',
      },
    ],
  },
  {
    id: 'q5',
    difficulty: 3,
    question: `Au cours d'une séance de travaux pratiques au laboratoire du lycée, un élève effectue le **test de Lucas** sur un monoalcool inconnu. 

Il observe l'apparition d'un **trouble laiteux net au bout de 5 minutes** à température ambiante. 

Quelle est la nature de cet alcool ?`,
    answers: [
      {
        id: '1',
        text: 'Un alcool tertiaire (3°)',
        isCorrect: false,
        explanation: 'Faux : un alcool tertiaire réagit de manière quasi-instantanée (trouble immédiat en moins de 30 secondes).',
        wolofExplanation: 'Dédët : alcool tertiaire dafay xonq immédiatement ci saasi (< 30 secondes) !',
      },
      {
        id: '2',
        text: 'Un alcool primaire (1°)',
        isCorrect: false,
        explanation: 'Faux : avec un alcool primaire, la solution reste limpide à température ambiante même après plusieurs heures.',
        wolofExplanation: 'Dédët : alcool primaire du xonq mukk ci seddaay bi, day toog ba nga tàngal ko.',
      },
      {
        id: '3',
        text: 'Un alcool secondaire (2°)',
        isCorrect: true,
        explanation: '✓ Vrai : un alcool secondaire donne un trouble laiteux après un temps d\'attente d\'environ 5 minutes à température ambiante en raison de la vitesse modérée de formation du carbocation secondaire.',
        wolofExplanation: 'Dëgg la : alcool secondaire dafay toog environ 5 minutes doog a xonq ci test de Lucas !',
      },
      {
        id: '4',
        text: 'Un aldéhyde ou une cétone.',
        isCorrect: false,
        explanation: 'Faux : le réactif de Lucas est spécifique aux alcools et ne réagit pas avec les composés carbonylés.',
        wolofExplanation: 'Test de Lucas alcool yi rekk lañu koy defal.',
      },
    ],
  },
];

/* ============================================================
   COMPOSANT PRINCIPAL ALCOOLS QUIZ EMBEDDED
   ============================================================ */

const LETTERS = ['A', 'B', 'C', 'D'];

export default function AlcoolsQuizEmbedded() {
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
            Quiz Express : Classes d&apos;Alcools & Nomenclature
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

