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
      "Quelle est la formule générale d'un acide $\\alpha$-aminé à chaîne aliphatique non ramifiée ?",
    answers: [
      "$\\text{R}-\\text{CH}(\\text{NH}_2)-\\text{COOH}$",
      "$\\text{R}-\\text{CH}_2-\\text{CH}(\\text{NH}_2)-\\text{COOH}$",
      "$\\text{R}-\\text{CO}-\\text{NH}_2$",
      "$\\text{R}-\\text{CH}(\\text{OH})-\\text{COOH}$",
    ],
    correctIndex: 0,
    explanation:
      "Par définition, un acide alpha-aminé possède la fonction amine -NH₂ et la fonction acide -COOH portées par le MÊME atome de carbone n°2 (carbone alpha). Sa formule générale est donc R-CH(NH₂)-COOH.",
    wolof:
      "« Acide alpha-aminé : fonction amine -NH₂ ak acide -COOH ci benn carbone alpha bi lañu nekk waxtu wu nekk ! »",
  },
  {
    id: 2,
    stars: 1,
    points: 1,
    question:
      "Quel est le nom officiel UICPA de l'alanine dont la formule semi-développée est $\\text{CH}_3-\\text{CH}(\\text{NH}_2)-\\text{COOH}$ ?",
    answers: [
      "Acide 2-aminopropanoïque",
      "Acide 1-aminoéthanoïque",
      "Acide 3-aminopropanoïque",
      "Acide amino-acétique",
    ],
    correctIndex: 0,
    explanation:
      "La chaîne principale comporte 3 carbones (propane). Le carbone 1 est celui du carboxyle -COOH. Le carbone 2 porte le groupe amine -NH₂. Le nom systématique est donc : acide 2-aminopropanoïque.",
    wolof:
      "« Numérotation bi day dore ci -COOH (carbone 1). Carbone 2 moo yor -NH₂ bi, motax ñu koy wax acide 2-aminopropanoïque ! »",
  },
  {
    id: 3,
    stars: 1,
    points: 1,
    question:
      "Parmi les acides $\\alpha$-aminés suivants, lequel ne possède AUCUN carbone asymétrique et est donc ACHIRAL ?",
    answers: [
      "La Glycine (acide 2-aminoéthanoïque, $\\text{H}-\\text{CH}(\\text{NH}_2)-\\text{COOH}$)",
      "L'Alanine ($\\text{CH}_3-\\text{CH}(\\text{NH}_2)-\\text{COOH}$)",
      "La Valine ($(\\text{CH}_3)_2\\text{CH}-\\text{CH}(\\text{NH}_2)-\\text{COOH}$)",
      "La Phénylalanine ($\\text{C}_6\\text{H}_5-\\text{CH}_2-\\text{CH}(\\text{NH}_2)-\\text{COOH}$)",
    ],
    correctIndex: 0,
    explanation:
      "Le piège d'or du Bac S2 ! Pour la Glycine, le radical est R = H. Le carbone alpha est donc lié à deux atomes d'hydrogène : il ne possède pas 4 substituants distincts. La glycine est ACHIRALE et optiquement inactive.",
    wolof:
      "« Glycine rekk moo yor ñaari hydrogènes ci carbone alpha bi, motax du carbone asymétrique ! Glycine du chiral mukk ! »",
  },
  {
    id: 4,
    stars: 2,
    points: 2,
    question:
      "En représentation de Fischer verticale, comment reconnaît-on qu'un acide aminé chiral appartient à la série L ?",
    answers: [
      "Le groupe $-\\text{NH}_2$ se projette à GAUCHE de la ligne verticale",
      "Le groupe $-\\text{NH}_2$ se projette à DROITE de la ligne verticale",
      "La molécule possède un pouvoir rotatoire lévogyre (-)",
      "Le groupe $-\\text{COOH}$ est placé en bas de la molécule",
    ],
    correctIndex: 0,
    explanation:
      "En projection de Fischer avec la chaîne principale verticale et le groupe -COOH en HAUT : si le groupe -NH₂ est situé à GAUCHE, la molécule appartient à la série L (Laevus). S'il est à DROITE, elle appartient à la série D.",
    wolof:
      "« Projection Fischer : -COOH ci kaw, chaîne bi ci suuf. Bu -NH₂ nekké ci loxo cammooñ (gauche), série L la ! »",
  },
  {
    id: 5,
    stars: 2,
    points: 2,
    question:
      "Quelle est la structure ionique d'un acide aminé sous sa forme zwitterionique (amphion) en solution aqueuse ?",
    answers: [
      "$\\text{R}-\\text{CH}(\\text{NH}_3^+)-\\text{COO}^-$ (charge nette = 0)",
      "$\\text{R}-\\text{CH}(\\text{NH}_2)-\\text{COOH}$ (forme neutre moléculaire)",
      "$\\text{R}-\\text{CH}(\\text{NH}_3^+)-\\text{COOH}$ (charge nette = +1)",
      "$\\text{R}-\\text{CH}(\\text{NH}_2)-\\text{COO}^-$ (charge nette = -1)",
    ],
    correctIndex: 0,
    explanation:
      "Un zwitterion (ou amphion) est une molécule dipolaire globalement neutre : le groupe carboxyle a cédé son proton (-COO⁻) et le groupe amine a capté un proton (-NH₃⁺). La charge nette est égale à (+1) + (-1) = 0.",
    wolof:
      "« Zwitterion dafa am charge + ci azote bi ak charge - ci oxygène bi. Charge globale bi 0 la, motax ñu koy wax amphion neutre ! »",
  },
  {
    id: 6,
    stars: 2,
    points: 2,
    question:
      "L'alanine possède $pK_{a1} = 2{,}34$ (-COOH) et $pK_{a2} = 9{,}69$ (-NH₃⁺). Quelle est la valeur de son point isoélectrique $pHi$ ?",
    answers: [
      "$pHi = \\dfrac{2{,}34 + 9{,}69}{2} = 6{,}02$",
      "$pHi = 9{,}69 - 2{,}34 = 7{,}35$",
      "$pHi = 7{,}00$",
      "$pHi = \\sqrt{2{,}34 \\times 9{,}69} \\approx 4{,}76$",
    ],
    correctIndex: 0,
    explanation:
      "Pour un acide aminé neutre, le point isoélectrique pHi est la moyenne arithmétique des deux pKa : $pHi = \\dfrac{pK_{a1} + pK_{a2}}{2} = \\dfrac{2{,}34 + 9{,}69}{2} = 6{,}015 \\approx 6{,}02$. À ce pH, la concentration de l'amphion est maximale.",
    wolof:
      "« pHi mooy demi-somme des pKa : pHi = (pKa1 + pKa2) / 2 = 6,02 pour l'alanine ! »",
  },
  {
    id: 7,
    stars: 2,
    points: 2,
    question:
      "Lors d'une électrophorèse sur bande de papier réalisée dans une solution tampon de $\\text{pH} = 1{,}5$, vers quel pôle migrera l'alanine ($pHi = 6{,}02$) ?",
    answers: [
      "Vers la Cathode (pôle négatif -) car $\\text{pH} < pHi$, l'alanine est sous forme de cation (+)",
      "Vers l'Anode (pôle positif +) car $\\text{pH} < pHi$",
      "Elle reste immobile sur la ligne de dépôt car elle est neutre",
      "Vers la Cathode car elle est sous forme d'anion (-)",
    ],
    correctIndex: 0,
    explanation:
      "À pH = 1,5, le milieu est très acide : $\\text{pH} < pK_{a1} < pHi$. L'alanine capte des protons et se trouve sous forme de cation $\\text{CH}_3-\\text{CH}(\\text{NH}_3^+)-\\text{COOH}$ chargé positivement. Elle est donc attirée par la Cathode (pôle négatif -).",
    wolof:
      "« Bu pH < pHi, acide aminé bi dafay yor charge positive (+), motax day daw jëm Cathode (-) ! Cation daw Cathode ! »",
  },
  {
    id: 8,
    stars: 3,
    points: 3,
    question:
      "Combien de dipeptides isomères distincts peut-on former par condensation de deux acides aminés différents, la Glycine (Gly) et l'Alanine (Ala) ?",
    answers: [
      "4 dipeptides : Gly-Gly, Ala-Ala, Gly-Ala et Ala-Gly",
      "2 dipeptides : Gly-Ala et Ala-Gly seulement",
      "1 seul dipeptide car Gly-Ala et Ala-Gly sont identiques",
      "3 dipeptides",
    ],
    correctIndex: 0,
    explanation:
      "À partir de deux acides aminés distincts A et B, on peut former 4 dipeptides : deux homodipeptides (A-A et B-B) et deux hétérodipeptides isomères (A-B et B-A). Gly-Ala et Ala-Gly sont différents car les extrémités N-terminale et C-terminale sont inversées !",
    wolof:
      "« 4 dipeptides mën nañu am : Gly-Gly, Ala-Ala, Gly-Ala ak Ala-Gly ! Gly-Ala ak Ala-Gly bokkul ndax N-terminal bi wuute na ! »",
  },
  {
    id: 9,
    stars: 2,
    points: 2,
    question:
      "Quel groupe fonctionnel forme la liaison peptidique reliant deux acides aminés consécutifs dans un peptide ?",
    answers: [
      "Un groupe amide $-\\text{CO}-\\text{NH}-$",
      "Un groupe ester $-\\text{CO}-\\text{O}-$",
      "Un groupe amine $-\\text{CH}_2-\\text{NH}-$",
      "Un groupe anhydride d'acide $-\\text{CO}-\\text{O}-\\text{CO}-$",
    ],
    correctIndex: 0,
    explanation:
      "La liaison peptidique est une fonction amide issue de la réaction de condensation entre le groupe carboxyle -COOH d'un acide aminé et le groupe amine -NH₂ d'un autre acide aminé, avec élimination d'une molécule d'eau.",
    wolof:
      "« Liaison peptidique mooy liaison amide -CO-NH- ! Dafa juddoo ci condensation carboxyle ak amine en libérant de l'eau ! »",
  },
  {
    id: 10,
    stars: 3,
    points: 3,
    question:
      "Pour synthétiser spécifiquement le dipeptide $\\text{Ala}-\\text{Gly}$ sans fabriquer les 3 autres isomères, quelle étape est indispensable ?",
    answers: [
      "Bloquer (protéger) le groupe $-\\text{NH}_2$ de l'alanine et le groupe $-\\text{COOH}$ de la glycine avant le couplage",
      "Mélanger simplement l'alanine et la glycine à chaud dans un solvant",
      "Protéger la fonction $-\\text{COOH}$ de l'alanine et la fonction $-\\text{NH}_2$ de la glycine",
      "Utiliser uniquement des acides aminés de la série D",
    ],
    correctIndex: 0,
    explanation:
      "Pour orienter la synthèse vers Ala-Gly uniquement, il faut : 1. Protéger l'amine de Ala (pour qu'elle n'attaque pas) et activer son acide. 2. Protéger l'acide de Gly (pour qu'il ne réagisse pas) et laisser son amine libre. 3. Effectuer le couplage puis déprotéger.",
    wolof:
      "« Pour am Ala-Gly rekk, faww nga tëj (protéger) -NH₂ bu Ala ak -COOH bu Gly, ba pare activer -COOH bu Ala ! Après couplage nga ubbi (déprotéger) fonctions yi ! »",
  },
];

export default function AcidesAminesQuizEmbedded() {
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
              Quiz d&apos;Entraînement Bac S2 : Acides $\alpha$-Aminés &amp; Stéréochimie
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-text/70 mt-1">
            10 questions authentiques tirées des épreuves du Baccalauréat sénégalais.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-navy/5 text-navy border border-navy/10">
            {answeredCount} / {totalQuestions} répondues
          </span>
          {showResults && (
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg border border-navy/10 text-navy hover:bg-navy/5 transition-all"
              title="Recommencer le quiz"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
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
                ? '🏆 Mention Très Bien ! Prêt pour le Bac S2 !'
                : percentage >= 60
                ? '👍 Bon travail ! Quelques points à revoir.'
                : '📚 Relisez les fiches réflexes pour consolider.'}
            </h4>
            <p className="text-xs opacity-90">
              Votre note : <strong>{earnedPoints} / {totalPoints} points</strong> ({percentage}%)
            </p>
          </div>

          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-navy text-white text-xs font-bold hover:bg-navy/90 transition-all shrink-0"
          >
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
                    <p className="text-text/80 text-[11px] leading-relaxed pl-5">{q.explanation}</p>
                  </div>

                  {q.wolof && (
                    <p className="text-[11px] italic text-amber-900 bg-amber-50/70 p-2.5 rounded-lg border border-amber-200">
                      {q.wolof}
                    </p>
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
