'use client';

import React, { useState } from 'react';
import MathRenderer from '@/components/course/math-renderer';

interface Question {
  id: number;
  question: string;
  sourceBac: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  wolofTip: string;
}

const B1_QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question:
      'Dans une coupe transversale de la moelle épinière d’un mammifère, quelle est la disposition exacte et la composition de la substance grise ?',
    sourceBac: 'Baccalauréat S2 Sénégal • Épreuve Officielle (Maîtrise des connaissances)',
    options: [
      { id: 'A', text: 'Elle est périphérique et constituée uniquement de fibres nerveuses myélinisées.' },
      { id: 'B', text: 'Elle est centrale, en forme d’ailes de papillon (H), et contient les corps cellulaires des neurones.' },
      { id: 'C', text: 'Elle entoure la substance blanche et contient les fibres myélinisées motrices.' },
      { id: 'D', text: 'Elle est absente de la moelle et ne se trouve que dans le cortex cérébral.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Dans la moelle épinière, la substance grise est strictement centrale en forme de papillon (ou de H) et renferme les corps cellulaires des neurones (notamment les motoneurones multipolaires dans les cornes ventrales). La substance blanche est périphérique et composée de fibres myélinisées.',
    wolofTip:
      'Moelle épinière bi : papillon bu gris bi dafa nekk ci biir (corps cellulaires), wéex bi (axones) weur ko ci biti !',
  },
  {
    id: 2,
    question:
      'Une section expérimentale de la racine ventrale (antérieure) d’un nerf rachidien chez un cobaye entraîne immédiatement :',
    sourceBac: 'Baccalauréat S2 Sénégal • Expériences historiques de Bell et Magendie',
    options: [
      { id: 'A', text: 'Une perte totale de la sensibilité du membre sans aucune paralysie motrice.' },
      { id: 'B', text: 'Une perte simultanée et irréversible de la sensibilité et de la motricité.' },
      { id: 'C', text: 'Une paralysie motrice totale du territoire innervé avec conservation intégrale de la sensibilité.' },
      { id: 'D', text: 'Aucun effet car les deux racines conduisent indifféremment l’influx.' },
    ],
    correctAnswer: 'C',
    explanation:
      'La racine ventrale (antérieure) est exclusivement motrice (voie centrifuge). Sa section provoque la paralysie motrice des muscles innervés, mais la sensibilité reste intacte car la racine dorsale (sensitive) n’est pas touchée.',
    wolofTip:
      'Racine ventrale = kanam = motricité (ndigal yi jëm ci muscle). Bu daggé rek yaram bi mënul yeŋgatu (paralysie), waaye dafay yëg lu ko laal (sensibilité préservée) !',
  },
  {
    id: 3,
    question:
      'Où se situent exactement les corps cellulaires des neurones sensitifs (protoneurones) conduisant l’information vers la moelle ?',
    sourceBac: 'Baccalauréat S2 Sénégal • Questions d’identification cytologique',
    options: [
      { id: 'A', text: 'Dans le ganglion spinal situé sur le trajet de la racine dorsale.' },
      { id: 'B', text: 'Dans la corne ventrale de la substance grise.' },
      { id: 'C', text: 'Dans le canal de l’épendyme parmi le liquide céphalo-rachidien.' },
      { id: 'D', text: 'Dans les cordons postérieurs de la substance blanche.' },
    ],
    correctAnswer: 'A',
    explanation:
      'Les corps cellulaires des neurones sensitifs sont des cellules pseudo-unipolaires (« neurones en T ») localisés dans le renflement de la racine dorsale appelé ganglion spinal (ou ganglion rachidien).',
    wolofTip:
      'Ganglion spinal bi mooy këru neurones sensitifs yi : dafa nekk ci racine dorsale kessé !',
  },
  {
    id: 4,
    question:
      'Dans quel ordre rencontre-t-on les trois méninges en progressant de la boîte crânienne (extérieur) vers le tissu nerveux (intérieur) ?',
    sourceBac: 'Baccalauréat S2 Sénégal • Protection du Névraxe',
    options: [
      { id: 'A', text: 'Pie-mère → Arachnoïde → Dure-mère' },
      { id: 'B', text: 'Dure-mère → Arachnoïde → Pie-mère' },
      { id: 'C', text: 'Arachnoïde → Dure-mère → Pie-mère' },
      { id: 'D', text: 'Dure-mère → Pie-mère → Arachnoïde' },
    ],
    correctAnswer: 'B',
    explanation:
      'Le moyen mnémotechnique officiel est « DAP » : de l’extérieur vers l’intérieur, on traverse la Dure-mère (fibreuse et épaisse), puis l’Arachnoïde (toile d’araignée avec LCR), et enfin la Pie-mère (fine et adhérente au tissu nerveux).',
    wolofTip:
      'Fàttaliku « DAP » : Dure-mère (dëgër ci biti) → Arachnoïde (toyle d’araignée ci digg bi) → Pie-mère (lafal yaram bi ci biir).',
  },
  {
    id: 5,
    question:
      'Pourquoi le nerf rachidien est-il rigoureusement qualifié de « nerf mixte » dans les épreuves du Baccalauréat ?',
    sourceBac: 'Baccalauréat S2 Sénégal • Définition et propriétés fonctionnelles',
    options: [
      { id: 'A', text: 'Parce qu’il est composé à la fois de neurones et de cellules musculaires.' },
      { id: 'B', text: 'Parce qu’il naît de la réunion d’une racine dorsale sensitive et d’une racine ventrale motrice.' },
      { id: 'C', text: 'Parce qu’il est constitué pour moitié de substance grise et pour moitié de liquide céphalo-rachidien.' },
      { id: 'D', text: 'Parce qu’il innerve à la fois le cerveau et le cœur.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Le nerf rachidien est dit mixte car il rassemble dans une même gaine conjonctive des fibres sensitives (afférentes centripètes issues de la racine dorsale) et des fibres motrices (efférentes centrifuges issues de la racine ventrale).',
    wolofTip:
      'Nerf mixte ndax dafa boolé ñaari yoon : xibaar bu dugg (sensitif) ak ndigal bu génn (moteur) !',
  },
  {
    id: 6,
    question:
      'Comment reconnaît-on avec certitude la face antérieure (ventrale) sur une coupe transversale de moelle épinière lorsque le ganglion spinal n’est pas visible ?',
    sourceBac: 'Baccalauréat S2 Sénégal • Reconnaissance morphologique et orientation',
    options: [
      { id: 'A', text: 'Par la présence d’une fissure médiane antérieure large et profonde.' },
      { id: 'B', text: 'Par la couleur noire de la substance blanche à cet endroit.' },
      { id: 'C', text: 'Par l’absence de substance grise du côté antérieur.' },
      { id: 'D', text: 'Par le fait que les cornes antérieures sont toujours plus pointues que les postérieures.' },
    ],
    correctAnswer: 'A',
    explanation:
      'La face antérieure est marquée par la fissure médiane antérieure, qui est une fente béante, large et très profonde s’enfonçant jusqu’au tiers de la moelle, contrairement au sillon postérieur qui est très étroit.',
    wolofTip:
      'Fissure antérieure bi dafa xóot té yaatu : mooy kanam bu leer !',
  },
];

export default function B1SystemeNerveuxQuizEmbedded() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSelect = (questionId: number, optionId: string) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const calculateScore = () => {
    return B1_QUIZ_QUESTIONS.reduce((score, q) => {
      return selectedAnswers[q.id] === q.correctAnswer ? score + 1 : score;
    }, 0);
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const score = calculateScore();
  const allAnswered = Object.keys(selectedAnswers).length === B1_QUIZ_QUESTIONS.length;

  return (
    <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 my-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <span className="text-[10px] uppercase tracking-wider font-extrabold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
            Évaluation Formative • Baccalauréat S2 Sénégal
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
            Quiz d’Entraînement Officiel : Système Nerveux Cérébrospinal
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            6 questions tirées des épreuves du Baccalauréat sénégalais pour tester votre maîtrise des notions.
          </p>
        </div>

        {showResults && (
          <div className="text-right">
            <span className="text-xs text-slate-400 font-bold block uppercase">Note Obtenue</span>
            <span
              className={`text-2xl sm:text-3xl font-black font-mono ${
                score >= 5 ? 'text-emerald-600' : score >= 3 ? 'text-amber-500' : 'text-rose-600'
              }`}
            >
              {score} / {B1_QUIZ_QUESTIONS.length}
            </span>
          </div>
        )}
      </div>

      {/* Liste des questions */}
      <div className="space-y-6 mt-6">
        {B1_QUIZ_QUESTIONS.map((q, idx) => {
          const userChoice = selectedAnswers[q.id];
          const isCorrect = userChoice === q.correctAnswer;

          return (
            <div
              key={q.id}
              className={`p-5 rounded-2xl border transition-all ${
                showResults
                  ? isCorrect
                    ? 'bg-emerald-50/60 border-emerald-200'
                    : 'bg-rose-50/60 border-rose-200'
                  : 'bg-slate-50/60 border-slate-200'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Question {idx + 1} • {q.sourceBac}
                </span>
                {showResults && (
                  <span
                    className={`text-xs font-black px-2.5 py-0.5 rounded-full ${
                      isCorrect ? 'bg-emerald-200 text-emerald-800' : 'bg-rose-200 text-rose-800'
                    }`}
                  >
                    {isCorrect ? 'Correct (+1 pt)' : 'Faux (0 pt)'}
                  </span>
                )}
              </div>

              <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug">
                {q.question}
              </h3>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-4">
                {q.options.map((opt) => {
                  const isSelected = userChoice === opt.id;
                  const isAnswer = opt.id === q.correctAnswer;

                  let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:border-slate-300';
                  if (isSelected && !showResults) {
                    btnStyle = 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-sm';
                  } else if (showResults) {
                    if (isAnswer) {
                      btnStyle = 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-sm';
                    } else if (isSelected && !isAnswer) {
                      btnStyle = 'bg-rose-500 text-white border-rose-500 font-bold shadow-sm';
                    } else {
                      btnStyle = 'bg-white border-slate-200 text-slate-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(q.id, opt.id)}
                      disabled={showResults}
                      className={`text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-2.5 ${btnStyle}`}
                    >
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-black/10 text-xs font-black">
                        {opt.id}
                      </span>
                      <span className="leading-snug">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explication & Wolof si résultats affichés */}
              {showResults && (
                <div className="mt-4 pt-3 border-t border-slate-200/60 space-y-2">
                  <p className="text-xs text-slate-700 leading-relaxed">
                    <strong>Explication du barème :</strong> {q.explanation}
                  </p>
                  <p className="text-xs text-amber-900 bg-amber-100/70 p-2.5 rounded-xl border border-amber-200 italic">
                    « {q.wolofTip} »
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Boutons d'action */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100">
        <span className="text-xs text-slate-500">
          {Object.keys(selectedAnswers).length} sur {B1_QUIZ_QUESTIONS.length} question(s) répondue(s)
        </span>

        <div className="flex items-center gap-3">
          {showResults ? (
            <button
              onClick={resetQuiz}
              className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 transition-all font-mono"
            >
              RECOMMENCER LE TEST
            </button>
          ) : (
            <button
              onClick={() => setShowResults(true)}
              disabled={!allAnswered}
              className={`px-6 py-2.5 rounded-xl font-bold text-xs transition-all shadow-sm ${
                allAnswered
                  ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Valider mes réponses
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

