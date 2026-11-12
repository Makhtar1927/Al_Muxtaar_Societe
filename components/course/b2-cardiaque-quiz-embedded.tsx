'use client';

import React, { useState } from 'react';

interface Question {
  id: number;
  question: string;
  sourceBac: string;
  options: { id: string; text: string }[];
  correctAnswer: string;
  explanation: string;
  wolofTip: string;
}

const CARDIAQUE_QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question:
      'Quelle structure anatomique cardiaque constitue le « pace-maker » naturel physiologique imposant son rythme à tout le myocarde chez les mammifères ?',
    sourceBac: 'Baccalauréat S2 Sénégal • Automatisme Cardiaque (1,5 point)',
    options: [
      { id: 'A', text: 'Le faisceau de His situé dans la cloison interventriculaire.' },
      { id: 'B', text: 'Le nœud sinusal (de Keith et Flack) localisé dans la paroi de l’oreillette droite.' },
      { id: 'C', text: 'Le réseau sous-endocardique de Purkinje.' },
      { id: 'D', text: 'Le nœud auriculo-ventriculaire (d’Aschoff-Tawara).' },
    ],
    correctAnswer: 'B',
    explanation:
      'Le nœud sinusal (ou nœud de Keith et Flack), situé dans la paroi postéro-supérieure de l’oreillette droite près de l’abouchement de la veine cave supérieure, possède la fréquence de dépolarisation spontanée intrinsèque la plus élevée (70 à 80 batt/min). Il entraîne l’ensemble du cœur et joue le rôle d’entraîneur physiologique (pace-maker).',
    wolofTip:
      'Nœud sinusal bi ci oreillette droite bi mooy vrai capitaine bi : mooy gën a gaaw dépolariser (75 bpm), motax mooy joxe rythme bi ci yaram bépp !',
  },
  {
    id: 2,
    question:
      'Lors de la première ligature de Stannius (ligature sinuso-auriculaire sur cœur de grenouille), que constate-t-on et quelle conclusion physiologique en tire-t-on ?',
    sourceBac: 'Baccalauréat S2 Sénégal • Expériences historiques (2 points)',
    options: [
      { id: 'A', text: 'Le cœur entier s’arrête définitivement car les cellules musculaires perdent immédiatement leur ATP.' },
      { id: 'B', text: 'Le sinus veineux continue de battre rapidement, tandis que les oreillettes et le ventricule s’arrêtent puis reprennent un rythme plus lent.' },
      { id: 'C', text: 'Le ventricule accélère son rythme pour compenser l’arrêt du sinus veineux.' },
      { id: 'D', text: 'Seul l’apex du ventricule continue de battre spontanément.' },
    ],
    correctAnswer: 'B',
    explanation:
      'La 1ère ligature de Stannius isole le sinus veineux du reste du cœur. Le sinus continue à son rythme élevé (~60 bpm). Les oreillettes et ventricules s’arrêtent temporairement, puis reprennent des contractions à une fréquence inférieure (~30-40 bpm) imposée par le nœud auriculo-ventriculaire d’Aschoff-Tawara. Cela prouve le gradient d’automatisme décroissant du tissu nodal.',
    wolofTip:
      'Bu ñu tëjee diggante sinus ak oreillettes yi, sinus bi day continuer di battre vite, oreillettes ak ventricule yi dagg tuuti ba nopi daldi reprendre waaye dafay gën a yeex ndax nœud AV mofi des !',
  },
  {
    id: 3,
    question:
      'Sur un électrocardiogramme (ECG) normal chez l’homme, à quel phénomène électrophysiologique précis correspond le complexe QRS ?',
    sourceBac: 'Baccalauréat S2 Sénégal • Électrocardiographie (1,5 point)',
    options: [
      { id: 'A', text: 'À la repolarisation et au relâchement des oreillettes.' },
      { id: 'B', text: 'À la dépolarisation et à l’activation électrique des ventricules.' },
      { id: 'C', text: 'À la repolarisation lente des ventricules.' },
      { id: 'D', text: 'Au remplissage passif du cœur pendant la diastole générale.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Le complexe QRS correspond à la dépolarisation rapide et synchrone des ventricules via le faisceau de His et le réseau de Purkinje, précédant immédiatement la systole mécanique ventriculaire. L’onde P correspond à la dépolarisation auriculaire, et l’onde T à la repolarisation ventriculaire.',
    wolofTip:
      'Bët bu xool ECG : Onde P = oreillettes ; Complexe QRS = dépolarisation ventricules (ventricules ñoo gën a rëy motax pic bi gën a kawe) ; Onde T = repolarisation ventricules.',
  },
  {
    id: 4,
    question:
      'Pourquoi le muscle cardiaque (myocarde) est-il physiologiquement incapable d’entrer en tétanos (contraction permanente continue) ?',
    sourceBac: 'Baccalauréat S2 Sénégal • Propriétés du myocarde (2 points)',
    options: [
      { id: 'A', text: 'Parce que les artères coronaires bloquent l’apport d’oxygène dès que la tension dépasse 100 mmHg.' },
      { id: 'B', text: 'Parce qu’il possède une longue période réfractaire absolue couvrant presque toute la durée de sa systole mécanique (≈ 0,3 s).' },
      { id: 'C', text: 'Parce qu’il ne contient aucune molécule d’actine et de myosine.' },
      { id: 'D', text: 'Parce que le système parasympathique sécrète en permanence de la noradrénaline.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Contrairement au muscle strié squelettique dont la période réfractaire est très courte (1 à 2 ms), le myocarde possède un potentiel d’action prolongé en plateau calcique (250 à 300 ms) conférant une longue période réfractaire absolue. Aucune nouvelle stimulation ne peut provoquer de sommation ou de tétanisation pendant la systole, préservant ainsi la fonction de pompe vitale du cœur.',
    wolofTip:
      'Xol bi mënut tétaniser ndax période réfractaire bi dafa gudd lool (durée systole bi yépp) ! Su tétanisé woon, sang bi du mëna circulé té nit ki day faatu sur-le-champ.',
  },
  {
    id: 5,
    question:
      'Lorsqu’une stimulation électrique efficace est délivrée au ventricule pendant sa phase de diastole, quelle est la séquence observée sur le cardiogramme ?',
    sourceBac: 'Baccalauréat S2 Sénégal • Inexcitabilité périodique (2 points)',
    options: [
      { id: 'A', text: 'Un arrêt cardiaque définitif sans aucune reprise mécanique.' },
      { id: 'B', text: 'Une extrasystole ventriculaire immédiate suivie obligatoirement d’un repos compensateur.' },
      { id: 'C', text: 'Une baisse immédiate de la force de contraction des oreillettes sans modification ventriculaire.' },
      { id: 'D', text: 'Une fusion complète des contractions en un tétanos parfait.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Pendant la diastole, le myocarde est en période réfractaire relative et retrouve son excitabilité : une stimulation déclenche une secousse supplémentaire anticipée (extrasystole). Le nœud sinusal émet ensuite son influx normal qui tombe dans la période réfractaire de cette extrasystole et reste inefficace ; il faut attendre le cycle suivant pour observer une contraction, créant une longue pause appelée repos compensateur.',
    wolofTip:
      'Diastole bi buñ ko stimuler : dafay def extrasystole (battement anticipé) daldi toog noppalu (repos compensateur) bala keneen di ñëw !',
  },
  {
    id: 6,
    question:
      'Un élève de Terminale S2 mesure chez un sujet au repos une fréquence cardiaque FC = 72 battements/min et un volume d’éjection systolique VES = 70 mL. Quel est le débit cardiaque (DC) de ce sujet ?',
    sourceBac: 'Baccalauréat S2 Sénégal • Hémodynamique quantitative (1 point)',
    options: [
      { id: 'A', text: 'DC = 2,54 L/min' },
      { id: 'B', text: 'DC = 5,04 L/min' },
      { id: 'C', text: 'DC = 7,20 L/min' },
      { id: 'D', text: 'DC = 10,08 L/min' },
    ],
    correctAnswer: 'B',
    explanation:
      'La formule du débit cardiaque est DC = FC × VES. Ici, DC = 72 batt/min × 70 mL = 5 040 mL/min = 5,04 L/min. Le volume sanguin total de l’adulte (environ 5 litres) circule ainsi en totalité dans le cœur en une seule minute au repos !',
    wolofTip:
      'Formule bi dafa simple : DC = FC × VES = 72 × 0,07 L = 5,04 L/min. Ci benn minute rekk, sa dérèt gi yépp dafay jàll ci sa xol bi !',
  },
];

export default function B2CardiaqueQuizEmbedded() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, optionId: string) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    CARDIAQUE_QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const answeredCount = Object.keys(selectedAnswers).length;
  const isComplete = answeredCount === CARDIAQUE_QUIZ_QUESTIONS.length;
  const score = calculateScore();

  return (
    <div className="w-full bg-white border border-slate-200 rounded-3xl p-5 sm:p-7 text-slate-800 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-black uppercase tracking-widest bg-rose-50 text-rose-700 px-2.5 py-0.5 rounded-full border border-rose-200">
              Évaluation Bac S2
            </span>
            <span className="text-xs text-slate-500 font-medium">Physiologie Cardiovasculaire • B2.1</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            QCM d&apos;Entraînement : Automatisme & Activité Cardiaque
          </h3>
        </div>
        <div className="text-xs font-bold text-slate-700 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl self-start sm:self-auto">
          Progression : <span className="text-rose-600 font-black">{answeredCount}</span> / {CARDIAQUE_QUIZ_QUESTIONS.length}
        </div>
      </div>

      {/* Questions list */}
      <div className="space-y-6">
        {CARDIAQUE_QUIZ_QUESTIONS.map((q, idx) => {
          const userChoice = selectedAnswers[q.id];
          const isCorrect = userChoice === q.correctAnswer;

          return (
            <div
              key={q.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                showResults
                  ? isCorrect
                    ? 'border-emerald-300 bg-emerald-50/50'
                    : 'border-rose-300 bg-rose-50/50'
                  : userChoice
                  ? 'border-rose-400 bg-rose-50/30'
                  : 'border-slate-200 bg-slate-50/60'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-xs font-black text-rose-700 uppercase tracking-wider">
                  Question {idx + 1}
                </span>
                <span className="text-[10px] text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200 font-semibold shadow-sm">
                  {q.sourceBac}
                </span>
              </div>

              <p className="text-sm sm:text-base font-bold text-slate-900 mb-4 leading-snug">
                {q.question}
              </p>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
                {q.options.map((opt) => {
                  const isSelected = userChoice === opt.id;
                  let optStyle = 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 shadow-sm';

                  if (showResults) {
                    if (opt.id === q.correctAnswer) {
                      optStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-bold ring-1 ring-emerald-500/30';
                    } else if (isSelected) {
                      optStyle = 'border-rose-400 bg-rose-50 text-rose-900 line-through';
                    }
                  } else if (isSelected) {
                    optStyle = 'border-rose-500 bg-rose-50/80 text-rose-950 font-bold ring-2 ring-rose-500/20';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelectOption(q.id, opt.id)}
                      disabled={showResults}
                      className={`text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-2.5 ${optStyle}`}
                    >
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center text-[10px] font-black border border-slate-200">
                        {opt.id}
                      </span>
                      <span className="leading-tight">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Correction & Wolof Tip */}
              {showResults && (
                <div className="mt-3 pt-3 border-t border-slate-200 space-y-2">
                  <div className="text-xs text-slate-800 leading-relaxed bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
                    <span className="font-bold text-rose-700 block mb-1">Correction détaillée :</span>
                    {q.explanation}
                  </div>
                  <div className="text-xs text-amber-950 italic bg-amber-50 p-3 rounded-xl border border-amber-200 flex items-start gap-2">
                    <span className="font-black text-amber-800 uppercase text-[10px] not-italic px-1.5 py-0.5 bg-amber-200/70 rounded">
                      Astuce Wolof
                    </span>
                    <span>&ldquo;{q.wolofTip}&rdquo;</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer & Submit */}
      <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
        {!showResults ? (
          <>
            <div className="text-xs text-slate-500 text-center sm:text-left font-medium">
              Répondez à toutes les questions pour valider votre fiche réflexe d&apos;activité cardiaque.
            </div>
            <button
              onClick={() => setShowResults(true)}
              disabled={!isComplete}
              className={`w-full sm:w-auto px-7 py-3 rounded-2xl text-xs sm:text-sm font-black uppercase tracking-wider transition-all shadow-md ${
                isComplete
                  ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/30 hover:scale-[1.02]'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Valider mes réponses ({answeredCount}/{CARDIAQUE_QUIZ_QUESTIONS.length})
            </button>
          </>
        ) : (
          <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <div>
              <div className="text-xs uppercase font-bold text-slate-500">Votre score officiel :</div>
              <div className="text-2xl font-black text-slate-900">
                <span className={score >= 4 ? 'text-emerald-600' : 'text-rose-600'}>{score}</span> /{' '}
                {CARDIAQUE_QUIZ_QUESTIONS.length}{' '}
                <span className="text-xs font-normal text-slate-500">
                  ({Math.round((score / CARDIAQUE_QUIZ_QUESTIONS.length) * 100)} %)
                </span>
              </div>
            </div>
            <button
              onClick={resetQuiz}
              className="w-full sm:w-auto px-6 py-2.5 bg-white hover:bg-slate-50 text-slate-800 rounded-xl text-xs font-bold transition-all border border-slate-300 shadow-sm"
            >
              Recommencer l&apos;Épreuve
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
