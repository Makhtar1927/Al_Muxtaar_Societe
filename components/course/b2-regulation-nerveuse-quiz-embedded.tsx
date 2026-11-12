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

const REGULATION_QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question:
      'Chez un mammifère anesthésié au repos, on réalise la section bilatérale des deux nerfs vagues (pneumogastriques X). Que constate-t-on immédiatement sur la fréquence cardiaque et que prouve cette observation ?',
    sourceBac: 'Baccalauréat S2 Sénégal • Innervation Cardiaque (1,5 point)',
    options: [
      { id: 'A', text: 'Le cœur s’arrête immédiatement en diastole, ce qui prouve que le nerf vague stimule les contractions.' },
      { id: 'B', text: 'La fréquence cardiaque augmente nettement (tachycardie), ce qui prouve l’existence d’un tonus cardiomodérateur vagal permanent au repos.' },
      { id: 'C', text: 'La fréquence cardiaque diminue (bradycardie), car le cœur est privé de son innervation motrice.' },
      { id: 'D', text: 'Aucune modification du rythme n’est observée grâce à l’automatisme du nœud sinusal.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Au repos, le système parasympathique exerce un frein permanent sur le nœud sinusal (tonus cardiomodérateur vagal), ramenant la fréquence intrinsèque de 100-110 bpm à environ 70 bpm. La section bilatérale des nerfs vagues « coupe le frein » : le cœur accélère immédiatement (tachycardie) pour battre à sa fréquence nodale spontanée.',
    wolofTip:
      'Bul naxu ! Nerf vague mooy frein bi : soo daggé frein bi, xol bi day accélérer immédiatement (tachycardie), du dagg ndax moteur bi (tissu nodal) mi ngi ci biir !',
  },
  {
    id: 2,
    question:
      'Dans l’expérience historique d’Otto Loewi (1921), quelle observation capitale a permis d’affirmer que la transmission de l’influx vagal au cœur est de nature chimique ?',
    sourceBac: 'Baccalauréat S2 Sénégal • Expérience du Prix Nobel (2 points)',
    options: [
      { id: 'A', text: 'L’enregistrement d’un potentiel d’action électrique sur le myocarde du cœur 1.' },
      { id: 'B', text: 'Le ralentissement et l’arrêt en diastole du cœur 2 dénervé après transfert du liquide de perfusion baignant le cœur 1 stimulé.' },
      { id: 'C', text: 'La décoloration du myocarde sous l’effet d’un courant continu.' },
      { id: 'D', text: 'L’accélération simultanée des deux cœurs sous l’action de l’atropine.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Le cœur 2 ne possédait aucun nerf et n’a reçu aucun choc électrique. Son ralentissement et son arrêt, après transfert du liquide de Ringer ayant baigné le cœur 1 dont le vague a été stimulé, démontrent qu’une substance chimique hydrosoluble (baptisée Vagusstoff, l’acétylcholine) a été libérée dans le milieu liquide pour commander le myocarde.',
    wolofTip:
      'Cœur 2 amul benn nerf té jotul kouran électrique ! Su slowed ba arrêt, kon xamnga ne produit chimique buy daw ci ndox mi (Ringer) moko faye : mooy acétylcholine !',
  },
  {
    id: 3,
    question:
      'Une injection d’atropine ($10^{-5}\text{ M}$) sur un cœur perfusé entraîne une accélération de la fréquence cardiaque et rend toute stimulation électrique du nerf vague totalement inefficace. Quel est le mode d’action moléculaire de l’atropine ?',
    sourceBac: 'Baccalauréat S2 Sénégal • Pharmacologie (1,5 point)',
    options: [
      { id: 'A', text: 'L’atropine détruit irréversiblement les fibres du nerf pneumogastrique.' },
      { id: 'B', text: 'L’atropine est un agoniste direct des récepteurs membranaires $\\beta_1$-adrénergiques.' },
      { id: 'C', text: 'L’atropine est un antagoniste compétitif des récepteurs muscariniques : elle bloque les récepteurs à l’acétylcholine sur le myocarde.' },
      { id: 'D', text: 'L’atropine active la pompe $Na^+/K^+$ dépendante de l’ATP.' },
    ],
    correctAnswer: 'C',
    explanation:
      'L’atropine est un antagoniste spécifique des récepteurs muscariniques de l’acétylcholine situés sur le tissu nodal. En occupant ces récepteurs sans les activer, elle empêche l’acétylcholine vagale de s’y fixer : cela lève le tonus vagal de repos (tachycardie) et bloque l’effet d’une stimulation du nerf vague.',
    wolofTip:
      'Atropine dafay dem toog ci récepteur acétylcholine bi waaye du ko déclencher ; acétylcholine bi dootul am fi mu toog, motax frein bi day dagg té xol bi accélérer !',
  },
  {
    id: 4,
    question:
      'Quels sont respectivement les neuromédiateurs chimiques terminaux libérés par les fibres postganglionnaires du système parasympathique et du système orthosympathique sur le cœur ?',
    sourceBac: 'Baccalauréat S2 Sénégal • Neuromédiateurs & Récepteurs (1,5 point)',
    options: [
      { id: 'A', text: 'Parasympathique : Adrénaline | Orthosympathique : Dopamine' },
      { id: 'B', text: 'Parasympathique : Acétylcholine | Orthosympathique : Noradrénaline' },
      { id: 'C', text: 'Parasympathique : Noradrénaline | Orthosympathique : Acétylcholine' },
      { id: 'D', text: 'Parasympathique : GABA | Orthosympathique : Glutamate' },
    ],
    correctAnswer: 'B',
    explanation:
      'Le système parasympathique cardiaque (nerf vague X) est cholinergique : ses terminaisons postganglionnaires libèrent de l’Acétylcholine (récepteurs muscariniques). Le système orthosympathique cardiaque est adrénergique : ses fibres postganglionnaires libèrent de la Noradrénaline (récepteurs $\\beta_1$).',
    wolofTip:
      'Fàttaliku bu baax : Parasympathique (nerf vague X) = Acétylcholine (frein) ; Orthosympathique = Noradrénaline (accélérateur) !',
  },
  {
    id: 5,
    question:
      'Lors d’un exercice musculaire intense, l’activation du système orthosympathique et la sécrétion d’adrénaline entraînent une augmentation de la force de contraction des ventricules. Par quel qualificatif physiologique officiel cette action est-elle désignée ?',
    sourceBac: 'Baccalauréat S2 Sénégal • Propriétés Cardiaques (1,5 point)',
    options: [
      { id: 'A', text: 'Un effet chronotrope positif.' },
      { id: 'B', text: 'Un effet dromotrope négatif.' },
      { id: 'C', text: 'Un effet inotrope positif.' },
      { id: 'D', text: 'Un effet bathmotrope négatif.' },
    ],
    correctAnswer: 'C',
    explanation:
      'L’effet inotrope concerne la contractilité et la force de contraction du myocarde. Une augmentation de force est un effet « inotrope positif ». L’effet chronotrope concerne la fréquence cardiaque, l’effet dromotrope la vitesse de conduction, et l’effet bathmotrope le seuil d’excitabilité.',
    wolofTip:
      'Chronotrope = Rythme/Temps (chronomètre) ; Inotrope = Force/Muscle (doole contraction bi) ; Dromotrope = Vitesse de conduction ; Bathmotrope = Excitabilité !',
  },
  {
    id: 6,
    question:
      'L’application de curare à concentration efficace paralyse instantanément les muscles squelettiques mais ne modifie en rien la fréquence des battements cardiaques. Quelle conclusion en tire le biologiste ?',
    sourceBac: 'Baccalauréat S2 Sénégal • Spécificité des Récepteurs (2 points)',
    options: [
      { id: 'A', text: 'Le cœur ne possède aucune innervation d’origine nerveuse.' },
      { id: 'B', text: 'Les récepteurs cholinergiques du cœur sont de type muscarinique, insensibles au curare qui bloque exclusivement les récepteurs nicotiniques musculaires.' },
      { id: 'C', text: 'Le curare ne peut pas traverser les parois des capillaires coronaires.' },
      { id: 'D', text: 'Le tissu nodal détruit chimiquement la molécule de curare avant sa fixation.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Cette expérience capitale démontre l’hétérogénéité des récepteurs à l’acétylcholine : la plaque motrice des muscles striés squelettiques possède des récepteurs nicotiniques bloqués par le curare, alors que le myocarde possède des récepteurs muscariniques bloqués par l’atropine mais totalement insensibles au curare.',
    wolofTip:
      'Curare bi dafay door muscles volontaires yi rekk (récepteurs nicotiniques), waaye ci xol bi récepteurs yi ay muscariniques lañu motax dafay wacc xol bi mu continuer di battre normalement !',
  },
];

export default function B2RegulationNerveuseQuizEmbedded() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (questionId: number, optionId: string) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  const calculateScore = () => {
    let score = 0;
    REGULATION_QUIZ_QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctAnswer) score += 1;
    });
    return score;
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const score = calculateScore();
  const total = REGULATION_QUIZ_QUESTIONS.length;
  const isComplete = Object.keys(selectedAnswers).length === total;

  return (
    <div className="w-full bg-white border border-slate-200 rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden mb-8">
      {/* En-tête */}
      <div className="px-5 py-6 sm:px-8 sm:py-7 bg-gradient-to-r from-sky-50 via-white to-indigo-50 border-b border-slate-200/80">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-sky-100 text-sky-800 border border-sky-200">
            ÉVALUATION FORMATIVE BAC S2
          </span>
          <span className="text-xs font-bold text-slate-500">6 Questions &bull; Coefficient 6</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Quiz d&apos;Entraînement : <span className="text-sky-600">Innervation & Régulation Cardiaque</span>
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
          Testez votre maîtrise des sections/stimulations nerveuses, de l&apos;expérience d&apos;Otto Loewi, des récepteurs pharmacologiques et des 4 propriétés myocardiques.
        </p>
      </div>

      {/* Questions */}
      <div className="p-5 sm:p-8 space-y-6">
        {REGULATION_QUIZ_QUESTIONS.map((q, idx) => {
          const userAns = selectedAnswers[q.id];
          const isCorrect = userAns === q.correctAnswer;

          return (
            <div
              key={q.id}
              className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                showResults
                  ? isCorrect
                    ? 'bg-emerald-50/50 border-emerald-300'
                    : 'bg-rose-50/50 border-rose-300'
                  : 'bg-white border-slate-200 shadow-sm'
              }`}
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-extrabold text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded-full border border-sky-200">
                  Question {idx + 1} / {total}
                </span>
                <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                  {q.sourceBac}
                </span>
              </div>

              <p className="text-sm font-bold text-slate-900 leading-relaxed mb-3">
                {q.question}
              </p>

              {/* Options */}
              <div className="space-y-2">
                {q.options.map((opt) => {
                  const isThisSelected = userAns === opt.id;
                  let optStyle = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';

                  if (showResults) {
                    if (opt.id === q.correctAnswer) {
                      optStyle = 'bg-emerald-100 border-emerald-400 text-emerald-950 font-bold';
                    } else if (isThisSelected) {
                      optStyle = 'bg-rose-100 border-rose-400 text-rose-950 font-bold line-through';
                    } else {
                      optStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
                    }
                  } else if (isThisSelected) {
                    optStyle = 'bg-sky-50 border-sky-400 text-sky-950 font-bold ring-2 ring-sky-300/40';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(q.id, opt.id)}
                      disabled={showResults}
                      className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-2.5 transition-all ${optStyle}`}
                    >
                      <span className="font-black text-xs px-2 py-0.5 rounded bg-white/80 border border-slate-300 shrink-0">
                        {opt.id}
                      </span>
                      <span className="leading-relaxed">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explication & Wolof Tip */}
              {showResults && (
                <div className="mt-4 pt-3 border-t border-slate-200 space-y-2 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-slate-200">
                    <p className="font-bold text-slate-900 mb-1">Justification Officielle Bac :</p>
                    <p className="text-slate-700 leading-relaxed">{q.explanation}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
                    <p className="font-bold mb-0.5">Ndongo S2 Wolof Insight :</p>
                    <p className="leading-relaxed">{q.wolofTip}</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}

        {/* Barre de résultat & Validation */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-wrap items-center justify-between gap-4">
          <div>
            {showResults ? (
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase">Résultat Final</p>
                <p className="text-xl sm:text-2xl font-black text-slate-900">
                  Votre Note : <span className={score >= 4 ? 'text-emerald-600' : 'text-rose-600'}>{score} / {total}</span>
                  <span className="text-xs font-bold text-slate-500 ml-2">
                    ({score >= 5 ? 'Mention Très Bien !' : score >= 3 ? 'Bien, continuez à réviser' : 'Revoir les fiches réflexes'})
                  </span>
                </p>
              </div>
            ) : (
              <p className="text-xs font-semibold text-slate-600">
                {isComplete
                  ? 'Toutes les questions sont répondues. Validez pour voir les corrections !'
                  : `Répondez aux ${total - Object.keys(selectedAnswers).length} question(s) restante(s).`}
              </p>
            )}
          </div>

          <div className="flex gap-2">
            {!showResults ? (
              <button
                onClick={() => setShowResults(true)}
                disabled={!isComplete}
                className="px-5 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-40 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
              >
                Corriger mon Quiz
              </button>
            ) : (
              <button
                onClick={resetQuiz}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
              >
                Recommencer le Quiz
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

