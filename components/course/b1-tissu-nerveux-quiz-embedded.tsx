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

const TISSU_NERVEUX_QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    question:
      'Dans un neurone multipolaire, où sont localisés les corps de Nissl et quelle est leur fonction cytologique essentielle ?',
    sourceBac: 'Baccalauréat S2 Sénégal • Épreuve de Cytologie Neuronale (1,5 point)',
    options: [
      { id: 'A', text: 'Ils sont situés exclusivement dans l’axone et le cône d’implantation pour conduire l’influx.' },
      { id: 'B', text: 'Ils sont situés dans le péricaryon (soma) et les dendrites, et assurent la synthèse des protéines.' },
      { id: 'C', text: 'Ils enveloppent les nœuds de Ranvier pour assurer l’isolation électrique saltatoire.' },
      { id: 'D', text: 'Ils se trouvent dans les boutons synaptiques pour détruire l’acétylcholine.' },
    ],
    correctAnswer: 'B',
    explanation:
      'Les corps de Nissl correspondent à des amas denses de réticulum endoplasmique granuleux (ergastoplasme) riches en ARN ribosomique. Ils siègent dans le soma et la base des dendrites pour synthétiser les protéines et neurotransmetteurs. Ils sont strictement absents de l’axone et du cône d’implantation.',
    wolofTip:
      'Corps de Nissl yi ci biir soma bi ak dendrites yi rekk lañuy nekk : ñoo ciy liggéey protéines yi, waaye amuñu mukk ci axone bi !',
  },
  {
    id: 2,
    question:
      'Quelle est la cause biophysique directe du maintien durable du Potentiel de Repos à environ -70 mV ?',
    sourceBac: 'Baccalauréat S2 Sénégal • Biophysique des membranes cellulaires (2 points)',
    options: [
      { id: 'A', text: 'L’entrée massive spontanée d’ions Na+ par les canaux voltage-dépendants.' },
      { id: 'B', text: 'L’égalité parfaite des concentrations d’ions K+ et Na+ de part et d’autre de la membrane.' },
      { id: 'C', text: 'La perméabilité sélective aux ions K+ via les canaux de fuite et le fonctionnement actif de la pompe Na+/K+ ATPase.' },
      { id: 'D', text: 'L’inactivation complète et irréversible de tous les canaux de fuite.' },
    ],
    correctAnswer: 'C',
    explanation:
      'Le potentiel de repos (-70 mV) est dû à la forte perméabilité de la membrane aux ions K+ au repos (canaux de fuite ouverts laissant fuir K+ vers l’extérieur) couplée à l’activité permanente de la pompe Na+/K+ ATPase (électrogène, 3 Na+ expulsés contre 2 K+ réabsorbés avec hydrolyse d’ATP) qui maintient les gradients de concentration.',
    wolofTip:
      'PR bi -70 mV : K+ dafay génn ci canaux de fuite yi, te pompe Na+/K+ bi di gattante di déllowat balanse bi ak dooley ATP !',
  },
  {
    id: 3,
    question:
      'Lors de la phase de dépolarisation brutale d’un potentiel d’action (-70 mV vers +30 mV), que se passe-t-il au niveau moléculaire ?',
    sourceBac: 'Baccalauréat S2 Sénégal • Électrophysiologie membranaire (2 points)',
    options: [
      { id: 'A', text: 'Ouverture immédiate des canaux Na+ voltage-dépendants et flux entrant massif passif d’ions Na+.' },
      { id: 'B', text: 'Fermeture des canaux Na+ et sortie massive active d’ions K+ par la pompe ATPase.' },
      { id: 'C', text: 'Expulsion foudroyante d’ions chlorure Cl- vers le milieu extracellulaire.' },
      { id: 'D', text: 'Arrêt complet du métabolisme cellulaire sous l’effet du choc électrique.' },
    ],
    correctAnswer: 'A',
    explanation:
      'Dès que le seuil critique de dépolarisation (-55 mV) est atteint, les canaux sodium voltage-dépendants (CVD-Na+) s’ouvrent quasi-instantanément. Les ions Na+ s’engouffrent dans l’axone selon leur gradient électrochimique (flux entrant dépolarisant passif), inversant la polarité membranaire jusqu’à +30 mV.',
    wolofTip:
      'Dépolarisation = CVD Na+ yi ñooy ubbiku foudroyant ! Na+ yi duggu ci biir bu gaaw, tax intérieur bi positif ba +30 mV.',
  },
  {
    id: 4,
    question:
      'L’application locale de Tétrodotoxine (TTX) sur un axone géant de calmar soumis à une stimulation efficace produit :',
    sourceBac: 'Baccalauréat S2 Sénégal • Pharmacologie et neurotoxines ioniques (1,5 point)',
    options: [
      { id: 'A', text: 'Une amplification spectaculaire de l’amplitude du potentiel d’action (+60 mV).' },
      { id: 'B', text: 'L’inhibition totale de la dépolarisation active et l’absence complète de potentiel d’action.' },
      { id: 'C', text: 'Un blocage sélectif de la repolarisation, le potentiel restant bloqué à +30 mV.' },
      { id: 'D', text: 'Une transformation immédiate de la conduction saltatoire en conduction continue.' },
    ],
    correctAnswer: 'B',
    explanation:
      'La TTX bloque spécifiquement et puissamment les canaux sodium voltage-dépendants (CVD-Na+). Privée de flux entrant de Na+, la membrane ne peut pas développer de dépolarisation active régénératrice : le potentiel d’action est totalement aboli (seul un artéfact ou potentiel électrotonique résiduel apparaît).',
    wolofTip:
      'TTX dafay tëj bunt Na+ yi (CVD Na+). Bu amee, amul benn dépolarisation buy mëna juddu, PA dafay disparu complètement !',
  },
  {
    id: 5,
    question:
      'Pourquoi le potentiel d’action global enregistré sur un nerf entier augmente-t-il d’amplitude avec l’intensité de stimulation, contrairement à celui d’une fibre isolée ?',
    sourceBac: 'Baccalauréat S2 Sénégal • Distinctions Fibre vs Nerf (2 points)',
    options: [
      { id: 'A', text: 'Parce que les fibres nerveuses individuelles grossissent sous l’effet du courant électrique.' },
      { id: 'B', text: 'Parce que le nerf obéit à la loi du tout ou rien avec une constante de temps variable.' },
      { id: 'C', text: 'Parce que l’intensité croissante recrute un nombre de plus en plus grand de fibres nerveuses ayant des seuils d’excitabilité différents (recrutement).' },
      { id: 'D', text: 'Parce que la gaine de myéline fond sous la chaleur de la stimulation électrique.' },
    ],
    correctAnswer: 'C',
    explanation:
      'Une fibre nerveuse unique obéit à la loi du tout ou rien (amplitude maximale constante dès le seuil). En revanche, le nerf entier est un faisceau hétérogène de milliers de fibres à seuils d’excitabilité étagés : une augmentation de l’intensité stimule un contingent croissant de fibres (phénomène de recrutement), augmentant l’amplitude globale jusqu’à la saturation de toutes les fibres.',
    wolofTip:
      'Nerf dafa am ay junniy fibres yu bokkul seuil. Soo yokkee doole ji, dafay recruit ay fibres yu gënë beuri (recrutement) ba kero mu saturation !',
  },
  {
    id: 6,
    question:
      'Sur une fibre myélinisée, la vitesse de propagation de l’influx est très élevée (jusqu’à 120 m/s) car :',
    sourceBac: 'Baccalauréat S2 Sénégal • Mécanismes de la conduction saltatoire (1,5 point)',
    options: [
      { id: 'A', text: 'L’influx circule uniquement à l’intérieur du liquide céphalo-rachidien sans toucher la membrane.' },
      { id: 'B', text: 'La myéline est un isolant et la dépolarisation "saute" d’un nœud de Ranvier au suivant où sont concentrés les canaux ioniques (conduction saltatoire).' },
      { id: 'C', text: 'Les courants locaux de Hermann progressent de proche en proche sur toute la surface de la gaine lipidique.' },
      { id: 'D', text: 'La température de l’axone augmente exponentiellement pendant le passage de l’onde.' },
    ],
    correctAnswer: 'B',
    explanation:
      'La myéline est une gaine lipidique hautement isolante qui empêche tout échange ionique transmembranaire. La régénération active du potentiel d’action ne s’effectue qu’au niveau des nœuds de Ranvier où la densité en canaux CVD-Na+ est maximale : l’influx se propage par conduction saltatoire d’un nœud au suivant, conférant une vitesse extrême et une grande économie d’ATP.',
    wolofTip:
      'Conduction saltatoire : myéline dafa bloqué perte yi, courant bi dafay tëb ci étranglement de Ranvier yi (saute d\'un nœud à l\'autre). Loolu mooy tax mu gaaw lool !',
  },
];

export default function B1TissuNerveuxQuizEmbedded() {
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
    TISSU_NERVEUX_QUIZ_QUESTIONS.forEach((q) => {
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
  const total = TISSU_NERVEUX_QUIZ_QUESTIONS.length;
  const isComplete = Object.keys(selectedAnswers).length === total;

  return (
    <div className="my-10 rounded-3xl border border-emerald-900/20 bg-white dark:bg-slate-900 p-6 sm:p-8 shadow-sm">
      {/* En-tête du Quiz */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-600/10 px-3 py-1 text-xs font-bold text-emerald-800 dark:text-emerald-300 border border-emerald-600/20 mb-2">
            <span>Évaluation Formative • Électrophysiologie & Cytologie</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Quiz d’Entraînement Bac S2 : Tissu Nerveux & Potentiels Bioélectriques
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            6 questions à choix multiples calibrées sur les pièges récurrents de l’Office du Baccalauréat.
          </p>
        </div>

        {submitted && (
          <div className="flex items-center gap-3 bg-emerald-950 text-white dark:bg-emerald-900 px-5 py-3 rounded-2xl shadow-sm">
            <div className="text-right">
              <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider block">
                Score Obtenu
              </span>
              <span className="text-xl font-black">
                {score} / {total}
              </span>
            </div>
            <div className="text-2xl font-bold">
              {score >= 5 ? '★' : score >= 3 ? '✓' : '•'}
            </div>
          </div>
        )}
      </div>

      {/* Liste des questions */}
      <div className="space-y-8 my-6">
        {TISSU_NERVEUX_QUIZ_QUESTIONS.map((q, index) => {
          const userAnswer = selectedAnswers[q.id];
          const isCorrect = userAnswer === q.correctAnswer;

          return (
            <div
              key={q.id}
              className="p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/40 space-y-4"
            >
              {/* Question & Source */}
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase text-emerald-800 dark:text-emerald-400 tracking-wider">
                    Question 0{index + 1} • {q.sourceBac}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                    {q.question}
                  </h4>
                </div>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options.map((option) => {
                  const isSelected = userAnswer === option.id;
                  let btnStyle =
                    'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-emerald-500/50';

                  if (submitted) {
                    if (option.id === q.correctAnswer) {
                      btnStyle = 'border-emerald-600 bg-emerald-600/10 text-emerald-900 dark:text-emerald-300 font-bold';
                    } else if (isSelected && !isCorrect) {
                      btnStyle = 'border-rose-500 bg-rose-500/10 text-rose-800 dark:text-rose-300';
                    } else {
                      btnStyle = 'opacity-40 border-slate-200 dark:border-slate-800 text-slate-400';
                    }
                  } else if (isSelected) {
                    btnStyle = 'border-emerald-600 bg-emerald-600 text-white font-bold shadow-sm';
                  }

                  return (
                    <button
                      key={option.id}
                      onClick={() => handleSelectOption(q.id, option.id)}
                      disabled={submitted}
                      className={`p-3 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 ${btnStyle}`}
                    >
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center font-mono font-bold text-[10px] shrink-0 ${
                          isSelected && !submitted
                            ? 'bg-white text-emerald-800'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                        {option.id}
                      </span>
                      <span className="leading-relaxed">{option.text}</span>
                    </button>
                  );
                })}
              </div>

              {/* Corrigé détaillé et Astuce Wolof affichés après validation */}
              {submitted && (
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
                  <div
                    className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                      isCorrect
                        ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-900 dark:text-emerald-200'
                        : 'bg-rose-500/10 border-rose-500/30 text-rose-900 dark:text-rose-200'
                    }`}
                  >
                    <div className="font-bold mb-1 flex items-center gap-1.5 uppercase text-[10px] tracking-wider">
                      <span>{isCorrect ? '✓ Bonne Réponse' : '✗ Erreur à Corriger'}</span>
                    </div>
                    <p>{q.explanation}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-emerald-950/5 dark:bg-emerald-950/20 border border-emerald-600/20 text-xs text-slate-700 dark:text-slate-300">
                    <span className="font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider text-[10px] block mb-1">
                      Xam-xam Wolof :
                    </span>
                    <p className="italic">"{q.wolofTip}"</p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Boutons d'action */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <p className="text-xs text-slate-500">
          {!submitted
            ? isComplete
              ? 'Toutes les questions sont répondues. Vous pouvez valider.'
              : `${Object.keys(selectedAnswers).length} sur ${total} questions répondues.`
            : `Score final : ${score} / ${total}. Relisez attentivement les explications.`}
        </p>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {submitted ? (
            <button
              onClick={handleReset}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition-all"
            >
              Recommencer le Quiz
            </button>
          ) : (
            <button
              onClick={() => setSubmitted(true)}
              disabled={!isComplete}
              className={`w-full sm:w-auto px-8 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md ${
                isComplete
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer active:scale-98'
                  : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
              }`}
            >
              Valider et Afficher le Barème
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

