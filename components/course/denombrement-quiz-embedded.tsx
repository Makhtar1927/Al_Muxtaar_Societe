'use client';

import React, { useState, useEffect, useCallback } from 'react';
import MathRenderer from '@/components/course/math-renderer';
import StudyIcon from '@/components/ui/study-icon';

interface RawAnswer {
  id: string;
  text: string;
  isCorrect: boolean;
  explanation: string;
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
  }[];
}

const LETTERS = ['A', 'B', 'C', 'D'];

const DENOMBREMENT_QUESTION_BANK: RawQuestion[] = [
  {
    id: 'den_1',
    difficulty: 1,
    question: `Combien de sous-ensembles (parties) de $3$ éléments peut-on former à partir d'un ensemble de $8$ élèves d'un lycée de Dakar ?`,
    answers: [
      { id: '1', text: `$C_8^3 = 56$`, isCorrect: true, explanation: "✓ Exact ! L'ordre de choix des élèves dans une délégation n'a aucune importance, il s'agit donc d'une combinaison : $C_8^3 = \\frac{8 \\times 7 \\times 6}{3 \\times 2 \\times 1} = 56$." },
      { id: '2', text: `$A_8^3 = 336$`, isCorrect: false, explanation: "Attention : $A_8^3$ prendrait en compte l'ordre (comme pour un podium), or ici il s'agit d'un sous-ensemble (non ordonné)." },
      { id: '3', text: `$8^3 = 512$`, isCorrect: false, explanation: "$8^3$ correspondrait à un tirage avec remise, ce qui signifierait qu'un même élève peut être choisi plusieurs fois." },
      { id: '4', text: `$3! = 6$`, isCorrect: false, explanation: "3! est le nombre de permutations de 3 éléments, pas le nombre de choix parmi 8." },
    ],
  },
  {
    id: 'den_2',
    difficulty: 1,
    question: `Un code secret de compte bancaire ou Wave est composé de $4$ chiffres choisis parmi les $10$ chiffres de $0$ à $9$. Combien de codes secrets distincts peut-on créer ?`,
    answers: [
      { id: '1', text: `$10^4 = 10\\,000$`, isCorrect: true, explanation: "✓ Bravo ! Pour chaque chiffre, il y a 10 possibilités ($0$ à $9$), l'ordre compte et la répétition est autorisée : $10 \\times 10 \\times 10 \\times 10 = 10^4 = 10\\,000$." },
      { id: '2', text: `$A_{10}^4 = 5\\,040$`, isCorrect: false, explanation: "L'arrangement $A_{10}^4$ interdirait la répétition de chiffres (or un code comme 7777 ou 1122 est tout à fait autorisé)." },
      { id: '3', text: `$C_{10}^4 = 210$`, isCorrect: false, explanation: "La combinaison ignore l'ordre : pour elle, 1234 et 4321 seraient le même code, ce qui est faux !" },
      { id: '4', text: `$4! \\times 10 = 240$`, isCorrect: false, explanation: "Formule totalement erronée." },
    ],
  },
  {
    id: 'den_3',
    difficulty: 2,
    question: `Une urne contient $5$ boules blanches et $4$ boules noires. On tire simultanément $3$ boules. Combien de tirages contiennent AU MOINS une boule blanche ?`,
    answers: [
      { id: '1', text: `$C_9^3 - C_4^3 = 84 - 4 = 80$`, isCorrect: true, explanation: "✓ Réflexe Bac S2 parfait ! Par l'événement contraire : Total = $C_9^3 = 84$. Contraire (aucune blanche, que des noires) = $C_4^3 = 4$. Donc : $84 - 4 = 80$ tirages." },
      { id: '2', text: `$C_5^1 \\times C_4^2 = 30$`, isCorrect: false, explanation: "Vous n'avez compté que le cas « exactement 1 blanche et 2 noires », en oubliant les cas « 2 blanches et 1 noire » et « 3 blanches » !" },
      { id: '3', text: `$C_5^3 = 10$`, isCorrect: false, explanation: "Ce calcul ne compte que les tirages formés de 3 boules blanches uniquement." },
      { id: '4', text: `$A_9^3 - A_4^3 = 480$`, isCorrect: false, explanation: "Le tirage est simultané, il faut utiliser des combinaisons $C_n^p$ et non des arrangements." },
    ],
  },
  {
    id: 'den_4',
    difficulty: 2,
    question: `D'après la formule du Binôme de Newton, que vaut la somme des coefficients binomiaux $S = C_n^0 + C_n^1 + C_n^2 + \\dots + C_n^n$ ?`,
    answers: [
      { id: '1', text: `$S = 2^n$`, isCorrect: true, explanation: "✓ Question classique du Bac ! On applique la formule du binôme $(a + b)^n = \\sum C_n^k a^{n-k} b^k$ avec $a = 1$ et $b = 1$ : $(1 + 1)^n = 2^n = \\sum_{k=0}^n C_n^k$." },
      { id: '2', text: `$S = n^2$`, isCorrect: false, explanation: "La somme n'est pas polynomiale en $n^2$, mais exponentielle en base 2 ($2^n$)." },
      { id: '3', text: `$S = n!$`, isCorrect: false, explanation: "Attention : $n!$ est le nombre de permutations, pas la somme des combinaisons." },
      { id: '4', text: `$S = 0$`, isCorrect: false, explanation: "La somme nulle correspond à la somme alternée $(1 - 1)^n = 0 = \\sum (-1)^k C_n^k$." },
    ],
  },
  {
    id: 'den_5',
    difficulty: 2,
    question: `Combien d'anagrammes distincts peut-on former avec les lettres du mot « DAKAR » ?`,
    answers: [
      { id: '1', text: `$\\dfrac{5!}{2!} = 60$`, isCorrect: true, explanation: "✓ Bravo ! Le mot contient 5 lettres dont la lettre « A » répétée 2 fois. Le nombre d'anagrammes est $N = \\frac{5!}{2! \\times 1! \\times 1! \\times 1!} = \\frac{120}{2} = 60$." },
      { id: '2', text: `$5! = 120$`, isCorrect: false, explanation: "Piège : si toutes les lettres étaient distinctes, ce serait 5! = 120. Mais ici les deux « A » sont indiscernables, il faut diviser par 2!." },
      { id: '3', text: `$A_5^2 = 20$`, isCorrect: false, explanation: "Un anagramme utilise toutes les 5 lettres du mot, pas seulement 2." },
      { id: '4', text: `$2^5 = 32$`, isCorrect: false, explanation: "Formule sans rapport avec les permutations." },
    ],
  },
  {
    id: 'den_6',
    difficulty: 3,
    question: `Au tournoi de lutte de Dakar, 10 lutteurs participent. On attribue le 1er prix (Drapeau du Chef de l'État), le 2e prix et le 3e prix. Combien de podiums différents peut-on constituer ?`,
    answers: [
      { id: '1', text: `$A_{10}^3 = 720$`, isCorrect: true, explanation: "✓ Parfait ! L'attribution de prix ordonnés (1er ≠ 2e ≠ 3e) sans répétition est un arrangement : $A_{10}^3 = 10 \\times 9 \\times 8 = 720$ podiums possibles." },
      { id: '2', text: `$C_{10}^3 = 120$`, isCorrect: false, explanation: "La combinaison ignore qui est sur quelle marche du podium. Or le 1er prix est différent du 3e !" },
      { id: '3', text: `$10^3 = 1\\,000$`, isCorrect: false, explanation: "Un même lutteur ne peut pas être à la fois 1er, 2e et 3e !" },
      { id: '4', text: `$10! = 3\\,628\\,800$`, isCorrect: false, explanation: "10! classerait tous les 10 lutteurs, alors qu'ici seuls les 3 premiers reçoivent un prix." },
    ],
  },
];

export default function DenombrementQuizEmbedded() {
  const [questions, setQuestions] = useState<ProcessedQuestion[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const initQuiz = useCallback(() => {
    const processed: ProcessedQuestion[] = DENOMBREMENT_QUESTION_BANK.map((q) => {
      const shuffledAnswers = [...q.answers].sort(() => Math.random() - 0.5);
      return {
        id: q.id,
        question: q.question,
        difficulty: q.difficulty,
        answers: shuffledAnswers.map((ans, idx) => ({
          letter: LETTERS[idx],
          text: ans.text,
          isCorrect: ans.isCorrect,
          explanation: ans.explanation,
        })),
      };
    });
    setQuestions(processed);
    setCurrentIdx(0);
    setSelectedLetter(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  }, []);

  useEffect(() => {
    initQuiz();
  }, [initQuiz]);

  if (questions.length === 0) return null;

  const currentQ = questions[currentIdx];
  const selectedAnswerObj = currentQ?.answers.find((a) => a.letter === selectedLetter);

  const handleSelect = (letter: string) => {
    if (isAnswered) return;
    setSelectedLetter(letter);
    setIsAnswered(true);
    const chosen = currentQ.answers.find((a) => a.letter === letter);
    if (chosen?.isCorrect) {
      setScore((s) => s + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1);
      setSelectedLetter(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <div className="bg-white rounded-3xl border-2 border-turquoise/20 p-5 sm:p-7 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy/10 pb-4 mb-6">
        <div className="flex items-start sm:items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-2xl bg-turquoise/15 text-turquoise flex items-center justify-center shrink-0 mt-0.5 sm:mt-0 p-2">
            <StudyIcon name="etincelles" size={24} />
          </div>
          <div className="min-w-0">
            <h3 className="font-extrabold text-navy text-base sm:text-lg leading-tight break-words">
              Quiz Éclair : Dénombrement (M11)
            </h3>
            <p className="text-xs text-text/60 mt-1 leading-snug">
              6 questions de réflexes calibrées pour le Baccalauréat Scientifique S2
            </p>
          </div>
        </div>

        {!isFinished && (
          <span className="self-start sm:self-center text-xs font-bold text-navy bg-surface px-3 py-1.5 rounded-xl border border-navy/10 shrink-0 whitespace-nowrap">
            Question {currentIdx + 1} / {questions.length}
          </span>
        )}
      </div>

      {!isFinished ? (
        <div className="space-y-6">
          {/* Question text */}
          <div className="bg-surface rounded-2xl p-4 sm:p-5 border border-navy/5">
            <div className="text-xs font-bold text-turquoise uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span>Niveau de difficulté :</span>
              <span className="text-amber-600 font-extrabold">
                {'★'.repeat(currentQ.difficulty)}
                {'☆'.repeat(3 - currentQ.difficulty)}
              </span>
            </div>
            <div className="text-base sm:text-lg font-bold text-navy leading-snug">
              <MathRenderer content={currentQ.question} />
            </div>
          </div>

          {/* Answers options */}
          <div className="grid grid-cols-1 gap-2.5">
            {currentQ.answers.map((ans) => {
              const isSelected = selectedLetter === ans.letter;
              let btnClass = 'border-navy/15 bg-white hover:border-turquoise hover:bg-turquoise/5 text-navy';

              if (isAnswered) {
                if (ans.isCorrect) {
                  btnClass = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold';
                } else if (isSelected && !ans.isCorrect) {
                  btnClass = 'border-rose-500 bg-rose-50 text-rose-950';
                } else {
                  btnClass = 'border-navy/10 bg-gray-50 text-text/40 opacity-60';
                }
              }

              return (
                <button
                  key={ans.letter}
                  disabled={isAnswered}
                  onClick={() => handleSelect(ans.letter)}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border-2 transition-all flex items-start gap-3 active:scale-[0.99] ${btnClass}`}
                >
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs shrink-0 mt-0.5 ${
                      isAnswered && ans.isCorrect
                        ? 'bg-emerald-600 text-white'
                        : isAnswered && isSelected && !ans.isCorrect
                        ? 'bg-rose-600 text-white'
                        : 'bg-navy/10 text-navy'
                    }`}
                  >
                    {ans.letter}
                  </span>
                  <div className="text-sm font-medium flex-1">
                    <MathRenderer content={ans.text} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Explanation panel */}
          {isAnswered && selectedAnswerObj && (
            <div
              className={`rounded-2xl p-4 border animate-in fade-in duration-200 ${
                selectedAnswerObj.isCorrect
                  ? 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50/90 border-rose-200 text-rose-950'
              }`}
            >
              <div className="flex items-center gap-2 font-bold mb-1.5 text-xs sm:text-sm">
                <StudyIcon
                  name={selectedAnswerObj.isCorrect ? 'correct' : 'incorrect'}
                  size={18}
                />
                <span>
                  {selectedAnswerObj.isCorrect
                    ? 'Excellente réponse !'
                    : 'Attention, piège classique du Bac !'}
                </span>
              </div>
              <div className="text-xs sm:text-sm leading-relaxed">
                <MathRenderer content={selectedAnswerObj.explanation} />
              </div>
            </div>
          )}

          {/* Next Button */}
          {isAnswered && (
            <div className="flex justify-end pt-2">
              <button
                onClick={handleNext}
                className="bg-navy hover:bg-navy-light text-white font-bold px-6 py-3 rounded-xl transition-all shadow-md active:scale-95 flex items-center gap-2 text-sm"
              >
                <span>
                  {currentIdx < questions.length - 1
                    ? 'Question suivante'
                    : 'Voir mon score final'}
                </span>
                <span>→</span>
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Result Screen */
        <div className="text-center py-8 space-y-5 animate-in fade-in duration-300">
          <div className="w-20 h-20 rounded-3xl bg-turquoise/15 text-turquoise flex items-center justify-center mx-auto p-4 shadow-inner">
            <StudyIcon
              name={score >= 5 ? 'cle_solution' : score >= 3 ? 'cible_reflexe' : 'avertissement'}
              size={48}
            />
          </div>
          <div>
            <h4 className="text-2xl font-black text-navy">
              Score : {score} / {questions.length}
            </h4>
            <p className="text-sm text-text/70 mt-1 max-w-md mx-auto">
              {score === 6
                ? "Félicitations ! Vous maîtrisez parfaitement les subtilités du dénombrement au Bac S2."
                : score >= 4
                ? 'Très bon travail ! Rebranchez les fiches réflexes sur vos petites hésitations.'
                : 'Revoyez les 5 méthodes réflexes ci-dessus pour sécuriser vos points au Bac.'}
            </p>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={initQuiz}
              className="bg-turquoise text-navy font-bold px-6 py-3 rounded-xl hover:bg-turquoise/80 transition-all shadow-sm flex items-center gap-2 text-sm"
            >
              <StudyIcon name="recommencer" size={18} />
              <span>Recommencer le quiz</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

