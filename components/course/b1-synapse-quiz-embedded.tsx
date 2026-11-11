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

const SYNAPSE_QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question:
      'Dans la transmission synaptique neuro-neuronique ou neuromusculaire, quel est le rôle indispensable joué par les ions Ca²⁺ présynaptiques ?',
    sourceBac: 'Baccalauréat S2 Sénégal • Neurotransmission chimique (1,5 point)',
    options: [
      { id: 'A', text: 'Ils traversent la fente synaptique pour dépolariser directement la membrane postsynaptique.' },
      { id: 'B', text: 'Leur entrée par les canaux voltage-dépendants déclenche la migration et l’exocytose des vésicules de neurotransmetteur.' },
      { id: 'C', text: 'Ils détruisent l’acétylcholinestérase pour prolonger la contraction musculaire.' },
      { id: 'D', text: 'Ils bloquent la recapture de la choline par la membrane présynaptique.' },
    ],
    correctAnswer: 'B',
    explanation:
      'L’arrivée du potentiel d’action présynaptique provoque l’ouverture des canaux Ca²⁺ voltage-dépendants. L’entrée passive massive de Ca²⁺ dans le bouton terminal constitue le signal intracellulaire indispensable qui active les protéines de fusion (SNARE) et commande l’exocytose des vésicules synaptiques contenant le neurotransmetteur.',
    wolofTip:
      'Ions Ca²⁺ yi ñoo di allumette présynaptique bi : buñu duggee ci bouton bi rekk, vésicules yi dañuy sotti neurotransmetteur bi ci fente synaptique bi !',
  },
  {
    id: 2,
    question:
      'Sur la membrane postsynaptique d’une synapse excitatrice, quelle est la nature des canaux qui s’ouvrent sous l’action de l’acétylcholine ?',
    sourceBac: 'Baccalauréat S2 Sénégal • Canaux ioniques & Récepteurs (1,5 point)',
    options: [
      { id: 'A', text: 'Des canaux Na⁺ voltage-dépendants (CVD-Na⁺) sensibles à la tension membranaire.' },
      { id: 'B', text: 'Des canaux récepteurs-chimiodépendants (ROC) dont l’ouverture dépend de la fixation du ligand.' },
      { id: 'C', text: 'Des canaux de fuite au potassium toujours ouverts.' },
      { id: 'D', text: 'Des pompes Na⁺/K⁺ ATPase consommatrices d’ATP.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Au niveau de la membrane postsynaptique en regard de la fente, les canaux sont des récepteurs-canaux chimiodépendants (ROC). Ils ne s’ouvrent que lorsque le neurotransmetteur (ligand) se fixe spécifiquement sur son site récepteur externe. Les canaux voltage-dépendants n’apparaissent qu’à partir du cône d’implantation.',
    wolofTip:
      'Membrane postsynaptique bi ci fente bi, récepteurs-canaux chimiodépendants (ROC) la am : acétylcholine bi mooy caabi ji leen di ubbi, du courant électrique !',
  },
  {
    id: 3,
    question:
      'Quelle est la différence fondamentale de mécanisme ionique entre un PPSE et un PPSI ?',
    sourceBac: 'Baccalauréat S2 Sénégal • Électrophysiologie postsynaptique (2 points)',
    options: [
      { id: 'A', text: 'Le PPSE résulte d’une sortie massive de Na⁺ tandis que le PPSI résulte d’une entrée de Ca²⁺.' },
      { id: 'B', text: 'Le PPSE est une dépolarisation due à une entrée de Na⁺ ; le PPSI est une hyperpolarisation due à une entrée de Cl⁻ ou sortie de K⁺.' },
      { id: 'C', text: 'Le PPSE obéit à la loi du tout ou rien alors que le PPSI est graduable.' },
      { id: 'D', text: 'Le PPSE est toujours propagé sur l’axone tandis que le PPSI reste confiné au noyau.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Le PPSE (potentiel postsynaptique excitateur) est une dépolarisation locale causée par l’entrée d’ions Na⁺ (ou Ca²⁺). Le PPSI (potentiel postsynaptique inhibiteur) est une hyperpolarisation locale provoquée par l’entrée d’ions chlorure Cl⁻ (anions) ou la sortie d’ions K⁺, ce qui éloigne le potentiel de membrane du seuil critique (-55 mV).',
    wolofTip:
      'PPSE = Na⁺ dafay duggu, Vm di yéég (dépolarisation jëm ci seuil bi). PPSI = Cl⁻ dafay duggu, Vm di wàcc (hyperpolarisation, dafay tëj bountu bi !)',
  },
  {
    id: 4,
    question:
      'Lorsqu’un motoneurone reçoit simultanément un PPSE de +14 mV et un PPSI de -10 mV au repos (-70 mV), que se produit-il au niveau du cône d’implantation ?',
    sourceBac: 'Baccalauréat S2 Sénégal • Intégration et sommation spatiale (2 points)',
    options: [
      { id: 'A', text: 'Le neurone émet immédiatement un train de potentiels d’action car tout PPSE est prioritaire.' },
      { id: 'B', text: 'Le potentiel résultant atteint -66 mV, ce qui reste inférieur au seuil de -55 mV : aucun PA n’est émis.' },
      { id: 'C', text: 'Les deux potentiels s’annulent et le neurone dégénère immédiatement.' },
      { id: 'D', text: 'Le potentiel de membrane atteint +4 mV et inverse la polarité axonale.' },
    ],
    correctAnswer: 'B',
    explanation:
      'L’intégration postsynaptique est une sommation algébrique : Vm = -70 mV + 14 mV - 10 mV = -66 mV. Cette valeur de -66 mV est strictement inférieure au seuil critique de dépolarisation (-55 mV au niveau du cône d’implantation) : la stimulation reste infraliminaire et aucun potentiel d’action n’est propagé sur l’axone.',
    wolofTip:
      'Sommation algébrique dafay xisap : -70 + 14 - 10 = -66 mV. Comme -66 mV dafa wàccé -55 mV (seuil bi), allumette bi du tàkk : amul benn PA !',
  },
  {
    id: 5,
    question:
      'Quel est le mode d’action précis du Curare à la jonction neuromusculaire au Bac S2 ?',
    sourceBac: 'Baccalauréat S2 Sénégal • Pharmacologie expérimentale (1,5 point)',
    options: [
      { id: 'A', text: 'Il détruit les vésicules synaptiques présynaptiques dans le motoneurone.' },
      { id: 'B', text: 'Il se fixe compétitivement sur les récepteurs de l’acétylcholine sans ouvrir les canaux Na⁺, provoquant une paralysie flasque.' },
      { id: 'C', text: 'Il accélère 100 fois la vitesse de dégradation par l’acétylcholinestérase.' },
      { id: 'D', text: 'Il bloque la pompe Na⁺/K⁺ ATPase du sarcolemme.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Le curare est un antagoniste compétitif spécifique des récepteurs nicotiniques postsynaptiques de l’acétylcholine : il se lie aux récepteurs à la place de l’ACh sans activer l’ouverture du canal ROC. L’ACh ne peut plus agir, le potentiel de plaque motrice est nul et le muscle est frappé de paralysie motrice flasque.',
    wolofTip:
      'Curare dafa melni fausse-clé bu dugg ci serrure bi te mënul ubbi bountu bi, te tëj ko ba acétylcholine mënul dugg : muscle bi dafay nekk paralysé flasque !',
  },
  {
    id: 6,
    question:
      'Quelle est la conséquence électrophysiologique et clinique de l’injection d’éserine (inhibiteur de l’acétylcholinestérase) ?',
    sourceBac: 'Baccalauréat S2 Sénégal • Régulation de la synapse neuromusculaire (1,5 point)',
    options: [
      { id: 'A', text: 'Une paralysie flasque immédiate par épuisement brutal de l’ATP musculaire.' },
      { id: 'B', text: 'L’accumulation prolongée d’acétylcholine dans la fente, entraînant des potentiels postsynaptiques durables et une contraction tétanique.' },
      { id: 'C', text: 'L’inhibition immédiate de l’entrée de Ca²⁺ dans le bouton terminal.' },
      { id: 'D', text: 'La conversion des récepteurs chimiodépendants en canaux voltage-dépendants.' },
    ],
    correctAnswer: 'B',
    explanation:
      'L’éserine bloque l’acétylcholinestérase, l’enzyme chargée de détruire l’ACh en quelques fractions de milliseconde. En conséquence, les molécules d’ACh persistent dans la fente synaptique et stimulent continuellement les récepteurs ROC postsynaptiques : cela génère une dépolarisation prolongée et des contractions spasmodiques continues (tétanie).',
    wolofTip:
      'Éserine dafay tëj ñiy balay fente bi (acétylcholinestérase) : acétylcholine bi dafay toog di tëkk ci récepteurs yi, tax muscle bi tëkk ci tétanie sans repos !',
  },
];

export default function B1SynapseQuizEmbedded() {
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
    SYNAPSE_QUIZ_QUESTIONS.forEach((q) => {
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
  const total = SYNAPSE_QUIZ_QUESTIONS.length;
  const percentage = Math.round((score / total) * 100);

  return (
    <section className="rounded-3xl border border-emerald-900/10 shadow-sm overflow-hidden my-6 sm:my-8 w-full max-w-full bg-slate-950 text-slate-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 p-4 sm:p-6 lg:p-8 border-b border-emerald-500/20">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-300 font-bold bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30">
            QUIZ-B1.3 • Test d’Entraînement Bac S2
          </span>
          <span className="text-xs font-semibold text-emerald-200/80 bg-teal-950/60 px-2.5 py-0.5 rounded-full border border-teal-500/20">
            6 Questions Types • Correction Détaillée
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          Auto-Évaluation : Synapse, Neurotransmetteurs &amp; Intégration
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
          Vérifiez votre maîtrise des canaux ROC, des PPSE/PPSI, de la sommation spatio-temporelle et des poisons synaptiques (curare, ésérine) avant l’épreuve officielle du Baccalauréat.
        </p>
      </div>

      {/* Questions list */}
      <div className="p-4 sm:p-6 lg:p-8 space-y-8">
        {SYNAPSE_QUIZ_QUESTIONS.map((q, idx) => {
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
                    {percentage >= 80 ? 'Mention Très Bien ! Maîtrise parfaite pour le Bac S2.' : percentage >= 50 ? 'Bonne assimilation ! Revoyez les pièges sur le curare et la sommation.' : 'Prenez le temps de relire la fiche réflexes et refaites le test.'}
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
