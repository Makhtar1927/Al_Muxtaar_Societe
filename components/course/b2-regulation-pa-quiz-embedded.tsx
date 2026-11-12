'use client';

import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

export default function B2RegulationPaQuizEmbedded() {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "La formule fondamentale reliant la pression artérielle (PA) aux paramètres hémodynamiques est :",
      options: [
        "PA = DC / RPT",
        "PA = DC × RPT (avec DC = FC × VES)",
        "PA = FC / VES + RPT",
        "PA = RPT × FC - VES"
      ],
      correct: 1,
      explanation: "La pression artérielle dépend directement du Débit Cardiaque (DC = Volume d'éjection systolique VES × Fréquence cardiaque FC) et des Résistances Périphériques Totales (RPT opposées par les artérioles) : PA = DC × RPT."
    },
    {
      id: 2,
      question: "Les barorécepteurs situés au niveau du sinus carotidien sont des mécanorécepteurs dont la voie nerveuse afférente est constituée par :",
      options: [
        "Le nerf pneumogastrique ou vague (X)",
        "Le nerf de Cyon-Ludwig",
        "Le nerf de Hering (branche du nerf glossopharyngien IX)",
        "Les fibres orthosympathiques thoraciques"
      ],
      correct: 2,
      explanation: "Le sinus carotidien envoie ses influx sensitifs afférents au bulbe par le nerf de Hering (IX). Les barorécepteurs de la crosse aortique passent par le nerf de Cyon-Ludwig (branche sensitive du X)."
    },
    {
      id: 3,
      question: "Que provoque la section bilatérale des nerfs de Hering et de Cyon chez un mammifère ?",
      options: [
        "Un arrêt cardiaque immédiat en diastole",
        "Une hypotension artérielle majeure et persistante",
        "Une hypertension artérielle durable accompagnée de tachycardie",
        "Aucune modification car ce sont des nerfs moteurs accessoires"
      ],
      correct: 2,
      explanation: "Hering et Cyon sont des nerfs freinateurs (sensitifs modérateurs) qui informent le bulbe de la tension artérielle. Leur section coupe la voie afférente cardiomodératrice : les centres sympathiques sont libérés (levée de frein), ce qui provoque tachycardie et hypertension neurogène permanente."
    },
    {
      id: 4,
      question: "Lors d'une élévation brusque de la pression artérielle (hypertension artérielle), la réponse réflexe d'urgence met en jeu :",
      options: [
        "Une activation du centre vasomoteur et du sympathique",
        "Une inhibition du centre cardiomodérateur bulbaire",
        "Une augmentation de fréquence des potentiels d'action sur le nerf de Hering, stimulant le centre cardiomodérateur (nerf X)",
        "Une vasoconstriction artériolaire réflexe pour freiner le sang"
      ],
      correct: 2,
      explanation: "L'hypertension étire la paroi des sinus carotidiens, ce qui augmente la fréquence des potentiels d'action sur les nerfs de Hering. Le bulbe rachidien active alors le centre cardiomodérateur (nerf vague X) et inhibe le centre vasomoteur, provoquant bradycardie et vasodilatation pour abaisser la PA."
    },
    {
      id: 5,
      question: "Dans l'expérience classique de ligature des carotides primitives en aval du cœur mais EN AMONT des sinus carotidiens, on observe :",
      options: [
        "Une hypotension générale réflexe",
        "Une hypertension générale avec tachycardie réflexe",
        "Une sidération cardiaque avec fibrillation",
        "Une diminution immédiate de la sécrétion de noradrénaline"
      ],
      correct: 1,
      explanation: "La ligature sous-sinusale diminue localement la pression sanguine dans les sinus carotidiens. Les barorécepteurs cessent d'émettre (fausse alerte d'hypotension générale). Le bulbe réagit en levant le tonus vagal et en activant massivement le système sympathique : il en résulte une hypertension artérielle générale réflexe."
    },
    {
      id: 6,
      question: "Au niveau des vaisseaux artériolaires, le système orthosympathique exerce une action tonique permanente responsable :",
      options: [
        "Du tonus vagal ralentisseur",
        "De la vasodilatation protectrice",
        "Du tonus vasomoteur (vasoconstriction physiologique maintenant les RPT)",
        "De la synthèse locale d'acétylcholine"
      ],
      correct: 2,
      explanation: "Les fibres sympathiques libèrent de la noradrénaline sur les récepteurs vasculaires des muscles lisses artériolaires, assurant un tonus vasomoteur permanent (vasoconstriction partielle). Si le tonus sympathique diminue, le vaisseau se dilate et les RPT chutent."
    }
  ];

  const handleSelect = (qId: number, oIdx: number) => {
    if (showResults) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: oIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) score++;
    });
    return score;
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const score = calculateScore();

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 space-y-5 shadow-sm text-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
            Évaluation Formative Bac S2
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-0.5">
            Test de Maîtrise : Régulation Réflexe de la Pression Artérielle
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            6 questions à choix multiples ciblant les compétences d'analyse expérimentale exigées à l'épreuve.
          </p>
        </div>

        {showResults && (
          <button
            type="button"
            onClick={resetQuiz}
            className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
            Réinitialiser
          </button>
        )}
      </div>

      <div className="space-y-4">
        {questions.map((q, idx) => {
          const isCorrect = selectedAnswers[q.id] === q.correct;

          return (
            <div
              key={q.id}
              className="p-4 rounded-lg border border-slate-200 bg-slate-50/50 space-y-2.5"
            >
              <div className="flex items-start gap-2.5">
                <span className="font-mono text-xs font-bold text-slate-500 bg-white border border-slate-200 rounded px-1.5 py-0.5 shrink-0 mt-0.5">
                  Q{idx + 1}
                </span>
                <p className="text-sm font-semibold text-slate-900 leading-snug">
                  {q.question}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-1.5 pt-1">
                {q.options.map((opt, oIdx) => {
                  const isSelected = selectedAnswers[q.id] === oIdx;
                  let styleClass = 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700';

                  if (showResults) {
                    if (oIdx === q.correct) {
                      styleClass = 'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold';
                    } else if (isSelected) {
                      styleClass = 'border-rose-400 bg-rose-50 text-rose-900 line-through';
                    } else {
                      styleClass = 'border-slate-200 bg-white text-slate-400 opacity-60';
                    }
                  } else if (isSelected) {
                    styleClass = 'border-slate-800 bg-slate-100 text-slate-900 font-semibold shadow-xs';
                  }

                  return (
                    <button
                      key={oIdx}
                      type="button"
                      disabled={showResults}
                      onClick={() => handleSelect(q.id, oIdx)}
                      className={`w-full p-2.5 rounded border text-left text-xs transition-colors ${styleClass}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {showResults && (
                <div className="mt-2 pt-2 border-t border-slate-200 text-xs text-slate-700 leading-relaxed">
                  <strong className={isCorrect ? 'text-emerald-800' : 'text-slate-800'}>
                    Justification officielle :
                  </strong>{' '}
                  {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!showResults ? (
        <div className="pt-2 flex justify-start">
          <button
            type="button"
            onClick={() => setShowResults(true)}
            disabled={Object.keys(selectedAnswers).length < questions.length}
            className="px-5 py-2.5 rounded-lg bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold tracking-wide transition-colors"
          >
            Valider le questionnaire ({Object.keys(selectedAnswers).length}/{questions.length})
          </button>
        </div>
      ) : (
        <div className="p-4 rounded-lg border border-slate-200 bg-slate-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div>
            <span className="font-bold text-slate-900 text-sm block">
              Résultat de l'évaluation : {score} sur {questions.length} correct{score > 1 ? 's' : ''}
            </span>
            <p className="text-slate-600 mt-0.5">
              {score === questions.length
                ? "Excellente maîtrise des notions du baroréflexe et de l'analyse expérimentale."
                : score >= 4
                ? "Acquis solides. Revoir les expériences de section et de ligature pour consolider la note maximale."
                : "Revoir attentivement les fiches de synthèse sur le rôle respectif des voies afférentes et efférentes."}
            </p>
          </div>
          <button
            type="button"
            onClick={resetQuiz}
            className="px-3 py-1.5 rounded border border-slate-300 bg-white hover:bg-slate-100 text-slate-700 font-semibold"
          >
            Repasser le test
          </button>
        </div>
      )}
    </div>
  );
}
