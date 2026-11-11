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

const REFLEXES_QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question:
      'Dans l’arc réflexe myotatique rotulien, où est situé le corps cellulaire du neurone sensitif Ia responsable de la voie afférente ?',
    sourceBac: 'Baccalauréat S2 Sénégal • Anatomie de l’arc réflexe (1,5 point)',
    options: [
      { id: 'A', text: 'Dans la corne antérieure (ventrale) de la moelle épinière.' },
      { id: 'B', text: 'Dans le ganglion spinal situé sur le trajet de la racine dorsale.' },
      { id: 'C', text: 'Directement à l’intérieur du fuseau neuromusculaire.' },
      { id: 'D', text: 'Dans le cortex cérébral moteur de l’encéphale.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Le neurone sensitif proprioceptif (fibre Ia) est un neurone en T (pseudounipolaire) dont le péricaryon (corps cellulaire) est situé exclusivement dans le ganglion spinal de la racine dorsale. La corne antérieure de la moelle contient uniquement les corps cellulaires des motoneurones alpha.',
    wolofTip:
      'Péricaryon neurone sensitif bi ci ganglion spinal bi (racine dorsale) rekk la nekk ! Bo waxee corne antérieure ci Bac bi, dañu lay daggé points yépp.',
  },
  {
    id: 2,
    question:
      'Pourquoi le réflexe myotatique est-il qualifié de "monosynaptique" et quelle en est la conséquence fonctionnelle directe ?',
    sourceBac: 'Baccalauréat S2 Sénégal • Neurophysiologie réflexe (2 points)',
    options: [
      { id: 'A', text: 'Parce qu’il n’utilise qu’un seul neurotransmetteur, ce qui empêche toute fatigue musculaire.' },
      { id: 'B', text: 'Parce que la fibre sensitive Ia fait synapse DIRECTEMENT avec le motoneurone α dans la moelle, assurant une latence minimale (20 à 30 ms).' },
      { id: 'C', text: 'Parce qu’il ne fonctionne qu’avec une seule cellule musculaire striée.' },
      { id: 'D', text: 'Parce qu’il ne requiert aucune entrée de calcium dans le bouton terminal.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Le réflexe myotatique est monosynaptique car il ne comporte qu’une seule synapse excitatrice centrale entre le neurone afférent Ia et le motoneurone efférent alpha. Cela confère une vitesse de réaction maximale (délai synaptique unique de 0,5 ms) essentielle au maintien instantané de la posture contre la pesanteur.',
    wolofTip:
      'Monosynaptique = benn synapse rekk ci diggante fibre Ia ak motoneurone α. Loolu moo koy tax mu gaaw foudroyant (25 ms) ngir taxawaay bi bumu soxé !',
  },
  {
    id: 3,
    question:
      'Lors de l’extension réflexe de la jambe (réflexe rotulien), comment le système nerveux assure-t-il le relâchement du muscle antagoniste (ischio-jambier) ?',
    sourceBac: 'Baccalauréat S2 Sénégal • Coordination & Innervation réciproque (2 points)',
    options: [
      { id: 'A', text: 'Par une destruction enzymatique directe des récepteurs du muscle antagoniste.' },
      { id: 'B', text: 'Par un circuit polysynaptique : une collatérale de la fibre Ia excite un interneurone inhibiteur qui génère un PPSI sur le motoneurone antagoniste.' },
      { id: 'C', text: 'Par l’arrêt complet de la circulation sanguine dans la cuisse.' },
      { id: 'D', text: 'Par une commande volontaire transmise depuis le cortex moteur.' },
    ],
    correctAnswer: 'B',
    explanation:
      'C’est le principe de l’innervation réciproque : la fibre Ia active le motoneurone du quadriceps (agoniste), mais excite également un interneurone inhibiteur médullaire. Cet interneurone libère du GABA ou de la glycine, créant un PPSI hyperpolarisant sur le motoneurone de l’ischio-jambier (antagoniste), provoquant son relâchement.',
    wolofTip:
      'Innervation réciproque : fibre Ia dafay excité interneurone inhibiteur bi ci moelle bi, interneurone bi tëj motoneurone antagoniste bi ak PPSI ngir muscle bi féex !',
  },
  {
    id: 4,
    question:
      'D’après les expériences de Magendie, que produit la section de la racine ventrale (antérieure) d’un nerf rachidien ?',
    sourceBac: 'Baccalauréat S2 Sénégal • Expériences de Magendie (1,5 point)',
    options: [
      { id: 'A', text: 'Une anesthésie complète avec motricité normale.' },
      { id: 'B', text: 'Une paralysie motrice flasque du territoire innervé, mais la sensibilité reste rigoureusement intacte.' },
      { id: 'C', text: 'La perte simultanée de la sensibilité et de la motricité.' },
      { id: 'D', text: 'Une contraction tétanique permanente incontrôlable.' },
    ],
    correctAnswer: 'B',
    explanation:
      'La racine ventrale est exclusivement conductrice motrice efférente (centrifuge). Sa section entraîne donc la paralysie motrice des muscles innervés, sans altérer la sensibilité cutanée ou proprioceptive qui transite exclusivement par la racine dorsale.',
    wolofTip:
      'Racine ventrale = motricité rekk ! Bo ko daggé, membre bi dafay paralysé, waaye nit ki dafay yég métit ak sensibilité normalement ndax racine dorsale bi baaxna.',
  },
  {
    id: 5,
    question:
      'Dans le conditionnement pavlovien, quelle condition chronologique est impérative pour que le son de la cloche (SN) devienne un stimulus conditionnel (SC) ?',
    sourceBac: 'Baccalauréat S2 Sénégal • Réflexes conditionnels (1,5 point)',
    options: [
      { id: 'A', text: 'La viande (SI) doit toujours être donnée 10 minutes avant le son de la cloche.' },
      { id: 'B', text: 'Le son de la cloche (SN) doit précéder immédiatement la présentation de la viande (SI) de quelques fractions de seconde à quelques secondes.' },
      { id: 'C', text: 'Le chien doit être anesthésié pour supprimer toute interférence médullaire.' },
      { id: 'D', text: 'Le stimulus doit être délivré exclusivement pendant la nuit.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Pour qu’une liaison nerveuse temporaire s’établisse dans le cortex cérébral, le stimulus neutre (cloche) doit impérativement précéder le stimulus inconditionnel (viande). S’il est présenté après ou en même temps de manière prolongée, le conditionnement échoue.',
    wolofTip:
      'Cloche bi dafa wara jiitu viande bi ci waxtu bu gatt ! Bu viande bi jiitee wala ñu bokk waxtu, xelam du mëna liggéey liaison temporaire bi.',
  },
  {
    id: 6,
    question:
      'Quelle est la différence neuro-anatomique majeure entre un réflexe inné (médullaire) et un réflexe acquis (pavlovien) ?',
    sourceBac: 'Baccalauréat S2 Sénégal • Comparaison Inné vs Acquis (1,5 point)',
    options: [
      { id: 'A', text: 'Le réflexe inné ne fait intervenir aucun neurone.' },
      { id: 'B', text: 'Le réflexe inné persiste chez un animal sans cortex (spinal), alors que le réflexe conditionnel requiert obligatoirement l’intégrité du cortex cérébral.' },
      { id: 'C', text: 'Le réflexe conditionnel est définitif et immuable alors que le réflexe inné s’éteint en quelques jours.' },
      { id: 'D', text: 'Le réflexe inné nécessite obligatoirement un apprentissage scolaire.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Le réflexe inné (myotatique) a son centre dans la moelle épinière : il persiste chez un animal décérébré. Le réflexe conditionnel pavlovien dépend impérativement du cortex cérébral (plasticité synaptique corticale) et s’éteint si le stimulus conditionnel n’est plus renforcé (inhibition d’extinction).',
    wolofTip:
      'Réflexe inné = moelle épinière rekk ! Réflexe conditionnel = cortex cérébral la laaj te dafay temporaire (mën na eñte bu ñu arrêtée viande bi).',
  },
];

export default function B1ReflexesConditionnelsQuizEmbedded() {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, optionId: string) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    REFLEXES_QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const score = calculateScore();
  const total = REFLEXES_QUIZ_QUESTIONS.length;
  const percentage = Math.round((score / total) * 100);

  return (
    <section className="rounded-3xl border border-emerald-900/10 shadow-sm overflow-hidden my-6 sm:my-8 w-full max-w-full bg-slate-950 text-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 p-4 sm:p-6 lg:p-8 border-b border-emerald-500/20">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-300 font-bold bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30">
            QUIZ-B1.4 • Test d’Entraînement Bac S2
          </span>
          <span className="text-xs font-semibold text-emerald-200/80 bg-teal-950/60 px-2.5 py-0.5 rounded-full border border-teal-500/20">
            6 Questions Types • Correction Détaillée
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          Auto-Évaluation : Réflexes Médullaires, Magendie &amp; Pavlov
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
          Validez votre maîtrise du réflexe myotatique monosynaptique, des sections de racines de Magendie et du conditionnement pavlovien avant les épreuves du Baccalauréat.
        </p>
      </div>

      {/* Questions list */}
      <div className="p-4 sm:p-6 lg:p-8 space-y-8">
        {REFLEXES_QUIZ_QUESTIONS.map((q, idx) => {
          const userAnswer = selectedAnswers[q.id];
          const isCorrect = userAnswer === q.correctAnswer;

          return (
            <div
              key={q.id}
              className="p-4 sm:p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4"
            >
              {/* Question Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
                  Question 0{idx + 1} / 0{total}
                </span>
                <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
                  {q.sourceBac}
                </span>
              </div>

              {/* Question Statement */}
              <h3 className="text-sm sm:text-base font-bold text-white leading-snug">
                {q.question}
              </h3>

              {/* Options */}
              <div className="space-y-2 pt-1">
                {q.options.map((opt) => {
                  const isSelected = userAnswer === opt.id;
                  let optionStyle =
                    'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-900';

                  if (submitted) {
                    if (opt.id === q.correctAnswer) {
                      optionStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-200 font-semibold';
                    } else if (isSelected && !isCorrect) {
                      optionStyle = 'bg-rose-950/60 border-rose-500 text-rose-200';
                    } else {
                      optionStyle = 'bg-slate-950/40 border-slate-900 text-slate-600 opacity-60';
                    }
                  } else if (isSelected) {
                    optionStyle = 'bg-emerald-950/60 border-emerald-400 text-white shadow-sm';
                  }

                  return (
                    <button
                      key={opt.id}
                      type="button"
                      disabled={submitted}
                      onClick={() => handleSelectOption(q.id, opt.id)}
                      className={`w-full p-3 sm:p-3.5 rounded-xl border text-left flex items-start gap-3 transition-all touch-manipulation min-h-[48px] ${optionStyle}`}
                    >
                      <span
                        className={`font-mono text-xs font-bold px-2 py-0.5 rounded shrink-0 ${
                          isSelected
                            ? 'bg-emerald-500 text-slate-950'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {opt.id}
                      </span>
                      <span className="text-xs sm:text-sm leading-relaxed">
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Corrigé Détaillé & Wolof Tip */}
              {submitted && (
                <div className="pt-3 border-t border-slate-800 space-y-3">
                  <div
                    className={`p-4 rounded-xl border ${
                      isCorrect
                        ? 'bg-emerald-950/30 border-emerald-500/40'
                        : 'bg-rose-950/30 border-rose-500/40'
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-1.5">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isCorrect ? 'bg-emerald-400' : 'bg-rose-500'
                        }`}
                      />
                      <span
                        className={`text-xs font-mono font-bold uppercase tracking-wider ${
                          isCorrect ? 'text-emerald-300' : 'text-rose-300'
                        }`}
                      >
                        {isCorrect ? 'Excellente réponse (Point validé)' : `Réponse attendue : Option ${q.correctAnswer}`}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {q.explanation}
                    </p>
                  </div>

                  {/* Wolof Tip */}
                  <div className="p-3 bg-amber-950/20 border border-amber-900/30 rounded-xl">
                    <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider block mb-0.5">
                      Ndongo S2 Astuce Mémorisation :
                    </span>
                    <p className="text-xs text-amber-200/90 italic">
                      « {q.wolofTip} »
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Action Bottom Bar */}
        <div className="p-4 sm:p-6 bg-slate-900/90 rounded-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          {!submitted ? (
            <>
              <p className="text-xs sm:text-sm text-slate-400">
                {Object.keys(selectedAnswers).length} sur {total} question{total > 1 ? 's' : ''} renseignée{total > 1 ? 's' : ''}.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(true)}
                disabled={Object.keys(selectedAnswers).length === 0}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-mono text-xs sm:text-sm font-black uppercase tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-emerald-500/20"
              >
                Valider &amp; Voir les Corrigés
              </button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-3">
                <div className="text-2xl sm:text-3xl font-black font-mono text-emerald-400">
                  {score} / {total}
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-bold text-white">
                    {percentage >= 80 ? 'Mention Très Bien ! Connaissances parfaites sur les réflexes.' : percentage >= 50 ? 'Bonne maîtrise ! Révisez bien les expériences de Magendie.' : 'Reprenez la fiche réflexes et refaites les tests.'}
                  </p>
                  <p className="text-[11px] text-slate-400 font-mono">
                    Taux de réussite : {percentage}%
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs font-bold transition-colors border border-slate-700"
              >
                ↺ Recommencer le Quiz
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

