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

export default function B3ImmuniteInneeQuizEmbedded() {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);

  const questions: Question[] = [
    {
      id: 1,
      question: "Les molécules du CMH de classe I (HLA-I) sont présentes à la surface :",
      options: [
        "Uniquement des lymphocytes T et B",
        "De toutes les cellules nucléées de l'organisme et des plaquettes",
        "Exclusivement des hématies et des cellules dendritiques",
        "Seulement des cellules présentatrices d'antigènes (CPA)"
      ],
      correct: 1,
      explanation: "Le CMH de classe I est universellement exprimé par toutes les cellules pourvues d'un noyau (cellules nucléées) ainsi que les plaquettes sanguines. Les hématies en sont dépourvues car elles sont anucléées."
    },
    {
      id: 2,
      question: "Le rôle physiologique fondamental des molécules du CMH de classe II est de :",
      options: [
        "Déterminer le groupe sanguin ABO et le rhésus d'un individu",
        "Présenter les peptides antigéniques exogènes aux lymphocytes T4 (auxiliaires)",
        "Provoquer directement la lyse bactérienne par formation de pores membranaires",
        "Transporter l'oxygène moléculaire dans le sang circulant"
      ],
      correct: 1,
      explanation: "Le CMH II, réservé aux cellules présentatrices d'antigène professionnelles (macrophages, cellules dendritiques, LB), expose à sa surface des peptides d'origine exogène digérés par phagocytose pour activer les lymphocytes T4 (CD4+)."
    },
    {
      id: 3,
      question: "Lors d'une réaction inflammatoire aiguë, la vasodilatation locale et la hausse de perméabilité vasculaire sont principalement provoquées par :",
      options: [
        "L'insuline et le glucagon sécrétés par le pancréas",
        "L'acétylcholine libérée par le nerf vague",
        "L'histamine libérée par la dégranulation des mastocytes résidents",
        "Les anticorps IgG circulants"
      ],
      correct: 2,
      explanation: "L'histamine, sécrétée précocement par les mastocytes et les basophiles lors d'une agression tissulaire, est le médiateur chimique clé responsable de la vasodilatation artériolaire (rougeur, chaleur) et de l'exsudation plasmatique (œdème)."
    },
    {
      id: 4,
      question: "La diapédèse leucocytaire correspond au phénomène biologique par lequel :",
      options: [
        "Les bactéries se multiplient par scissiparité dans le foyer infectieux",
        "Les leucocytes traversent activement la paroi des capillaires sanguins pour gagner le tissu infecté",
        "Les hématies éclatent au contact d'un sérum incompatible",
        "Le complément forme le complexe d'attaque membranaire (CAM)"
      ],
      correct: 1,
      explanation: "La diapédèse est le franchissement actif de la paroi endothéliale des capillaires sanguins par les polynucléaires neutrophiles et les monocytes, qui s'étirent et émettent des pseudopodes pour migrer vers le foyer de l'infection."
    },
    {
      id: 5,
      question: "Quelle est la succession chronologique exacte des quatre étapes de la phagocytose ?",
      options: [
        "Ingestion → Adhésion → Digestion → Rejet des débris",
        "Adhésion → Ingestion → Digestion → Rejet des débris",
        "Digestion → Adhésion → Ingestion → Présentation",
        "Diapédèse → Lyse → Adhésion → Exocytose"
      ],
      correct: 1,
      explanation: "La phagocytose se déroule rigoureusement en 4 temps : 1. Adhésion (fixation du microbe aux récepteurs du phagocyte) ; 2. Ingestion (formation du phagosome) ; 3. Digestion (fusion lysosomiale et hydrolyse) ; 4. Rejet des déchets (exocytose des résidus)."
    },
    {
      id: 6,
      question: "Dans le système ABO, un individu de groupe sanguin B possède naturellement dans son sérum :",
      options: [
        "Des anticorps anti-A",
        "Des anticorps anti-B",
        "Des anticorps anti-A et anti-B",
        "Aucun anticorps naturel dirigé contre les antigènes ABO"
      ],
      correct: 0,
      explanation: "La règle fondamentale d'immunologie transfusionnelle stipule qu'un individu possède dans son plasma les anticorps (agglutinines) dirigés contre les antigènes qu'il ne porte pas sur ses propres hématies. Un individu B possède donc des anticorps anti-A."
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
    <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 space-y-5 shadow-xs text-slate-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-700 block">
            Évaluation Formative Bac S2 • Chapitre B3
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-0.5">
            Test de Maîtrise : Soi, Non-Soi, CMH & Immunité Innée
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            6 questions calibrées sur les pièges récurrents du Baccalauréat sénégalais.
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
              Résultat : {score} sur {questions.length} correct{score > 1 ? 's' : ''}
            </span>
            <p className="text-slate-600 mt-0.5">
              {score === questions.length
                ? "Excellent ! Maîtrise complète des bases d'immunologie innée et du CMH."
                : score >= 4
                ? "Bon travail. Revoir la distinction CMH I vs CMH II pour sécuriser tous les points."
                : "Revoir attentivement les fiches réflexes sur les étapes de la phagocytose et les groupes sanguins."}
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
