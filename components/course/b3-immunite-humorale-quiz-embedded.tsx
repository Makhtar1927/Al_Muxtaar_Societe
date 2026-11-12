'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  category: string;
}

const QUIZ_QUESTIONS: Question[] = [
  {
    id: 1,
    category: 'Structure des Immunoglobulines',
    question: "Une molécule d'IgG est constituée de :",
    options: [
      "2 chaînes lourdes identiques et 2 chaînes légères identiques reliées par des ponts disulfure",
      "4 chaînes lourdes et 4 chaînes légères formant un pentamère",
      "1 chaîne lourde et 1 chaîne légère reliées par un pont peptidique",
      "2 chaînes lourdes et 4 chaînes légères avec un fragment J"
    ],
    correct: 0,
    explanation: "L'IgG est un monomère composé de 2 chaînes lourdes H (Heavy) et 2 chaînes légères L (Light) identiques par paires, reliées par des ponts disulfure (-S-S-). Cette structure en Y donne deux fragments Fab (fixation à l'antigène) et un fragment Fc (fixation aux cellules effectrices)."
  },
  {
    id: 2,
    category: 'Fragments Fab et Fc',
    question: "Le site de fixation à l'antigène (paratope) se trouve :",
    options: [
      "Uniquement sur le fragment Fc de la chaîne lourde",
      "À l'extrémité variable des fragments Fab, formée par VH et VL",
      "Sur la région constante CH2 de la chaîne lourde",
      "Au niveau de la région charnière (hinge region) de l'IgG"
    ],
    correct: 1,
    explanation: "Le paratope (site de fixation à l'antigène) est formé par les régions variables de la chaîne lourde (VH) et de la chaîne légère (VL), situées à l'extrémité des fragments Fab. Ces régions hypervariables (CDR) sont complémentaires de l'épitope antigénique."
  },
  {
    id: 3,
    category: 'Classes d\'Immunoglobulines',
    question: "Quelle classe d'immunoglobuline est la PREMIÈRE produite lors d'une réponse immunitaire primaire et se présente sous forme de pentamère ?",
    options: [
      "IgG — car c'est la plus abondante dans le sérum",
      "IgA — car elle protège les muqueuses",
      "IgM — car elle est synthétisée en premier avant la commutation de classe",
      "IgE — car elle déclenche la réaction allergique"
    ],
    correct: 2,
    explanation: "L'IgM est la première immunoglobuline produite lors de la réponse primaire. C'est un pentamère (5 unités monomériques reliées par une chaîne J) très efficace pour l'agglutination et l'activation du complément. Après commutation de classe sous l'influence de cytokines (IL-4, IL-13), les LB produisent des IgG, IgA ou IgE."
  },
  {
    id: 4,
    category: 'Sélection Clonale',
    question: "La théorie de la sélection clonale (Burnet) stipule que :",
    options: [
      "Un lymphocyte B produit plusieurs types d'anticorps différents selon le pathogène rencontré",
      "L'antigène sélectionne et active le clone de LB portant le BCR complémentaire de son épitope",
      "Les anticorps sont fabriqués de novo à chaque infection sans mémoire préalable",
      "Un seul lymphocyte B produit tous les anticorps nécessaires à l'élimination d'un pathogène"
    ],
    correct: 1,
    explanation: "La sélection clonale : chaque LB naïf porte un BCR unique. L'antigène sélectionne spécifiquement le clone dont le BCR est complémentaire de son épitope (liaison clé-serrure). Ce clone est alors activé et se multiplie (expansion clonale). C'est le fondement de la spécificité de la réponse adaptative."
  },
  {
    id: 5,
    category: 'Différenciation LB',
    question: "Après activation par l'antigène et coopération avec le LT4 auxiliaire, le lymphocyte B se différencie en :",
    options: [
      "Lymphocyte T cytotoxique (LT8) et cellule NK",
      "Plasmocyte (sécrétant des anticorps) et lymphocyte B mémoire",
      "Macrophage et cellule présentatrice d'antigènes (CPA)",
      "Mastocyte et basophile sécrétant de l'histamine"
    ],
    correct: 1,
    explanation: "Sous l'effet des cytokines du LT4 (IL-4, IL-5, IL-6), le LB activé se différencie en : (1) Plasmocyte — cellule effectrice à vie courte sécrétant massivement des anticorps spécifiques ; (2) Lymphocyte B mémoire — cellule à longue durée de vie permettant une réponse secondaire rapide et amplifiée lors d'un 2e contact avec le même antigène."
  },
  {
    id: 6,
    category: 'Mécanismes effecteurs',
    question: "La NEUTRALISATION par les anticorps consiste à :",
    options: [
      "Marquer l'antigène pour faciliter sa phagocytose par les macrophages (opsonisation)",
      "Activer la voie classique du complément conduisant à la lyse osmotique",
      "Bloquer les sites actifs d'un toxine ou d'un virus en s'y fixant, l'empêchant de se lier à ses récepteurs cellulaires",
      "Provoquer l'agglutination des bactéries pour faciliter leur élimination"
    ],
    correct: 2,
    explanation: "La neutralisation : les anticorps se fixent sur les sites actifs des toxines bactériennes ou des virus, bloquant stériquement leur liaison aux récepteurs des cellules cibles. La toxine ou le virus neutralisé ne peut plus infecter les cellules. L'opsonisation est distincte : elle marque la cible pour la phagocytose via le fragment Fc des anticorps."
  },
  {
    id: 7,
    category: 'Réponse primaire vs secondaire',
    question: "La réponse immunitaire secondaire est caractérisée par :",
    options: [
      "Un délai plus long, un titre d'anticorps plus faible et une production majoritaire d'IgM",
      "Un délai plus court (2-3 j vs 10-14 j), un titre d'anticorps plus élevé et une production majoritaire d'IgG à haute affinité",
      "La même cinétique que la réponse primaire mais avec un profil d'anticorps différent",
      "L'absence de cellules mémoire car elles sont détruites après la première réponse"
    ],
    correct: 1,
    explanation: "La réponse secondaire (mémoire) est plus rapide (2-3 jours vs 10-14 jours), plus intense (titre d'anticorps 10 à 100 fois plus élevé) et produit majoritairement des IgG à haute affinité (après maturation d'affinité). Elle est assurée par les LB mémoires issus de la réponse primaire. C'est le principe de la vaccination."
  },
  {
    id: 8,
    category: 'Test d\'Ouchterlony',
    question: "Dans un test d'Ouchterlony (double immunodiffusion en gel), la présence d'un arc de précipitation entre un puits antigène et un puits anticorps indique :",
    options: [
      "L'absence de réaction entre l'antigène et l'anticorps",
      "Une réaction non spécifique due à la diffusion passive des protéines",
      "La formation de complexes immuns insolubles là où les concentrations antigène et anticorps sont équivalentes (zone d'équivalence)",
      "Une contamination bactérienne du gel d'agarose"
    ],
    correct: 2,
    explanation: "Dans le test d'Ouchterlony, l'antigène et l'anticorps diffusent dans le gel. Là où leurs concentrations s'équilibrent (zone d'équivalence), ils forment des complexes immuns insolubles qui précipitent sous forme d'un arc visible. L'identité des arcs entre deux puits révèle si les antigènes partagent les mêmes épitopes."
  }
];

export default function B3ImmuniteHumoraleQuizEmbedded() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState<boolean[]>(new Array(QUIZ_QUESTIONS.length).fill(false));
  const [scores, setScores] = useState<(boolean | null)[]>(new Array(QUIZ_QUESTIONS.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);

  const question = QUIZ_QUESTIONS[current];
  const isAnswered = answered[current];
  const isCorrect = scores[current];
  const totalScore = scores.filter(s => s === true).length;

  function handleSelect(idx: number) {
    if (isAnswered) return;
    setSelected(idx);
    const correct = idx === question.correct;
    const newAnswered = [...answered];
    const newScores = [...scores];
    newAnswered[current] = true;
    newScores[current] = correct;
    setAnswered(newAnswered);
    setScores(newScores);
    setShowResult(true);
  }

  function handleNext() {
    if (current < QUIZ_QUESTIONS.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
      setShowResult(false);
    } else {
      setFinished(true);
    }
  }

  function handleReset() {
    setCurrent(0);
    setSelected(null);
    setAnswered(new Array(QUIZ_QUESTIONS.length).fill(false));
    setScores(new Array(QUIZ_QUESTIONS.length).fill(null));
    setShowResult(false);
    setFinished(false);
  }

  const scorePercent = Math.round((totalScore / QUIZ_QUESTIONS.length) * 100);

  if (finished) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <div className="text-center">
          <Award className="mx-auto mb-3 text-blue-700" size={48} />
          <h3 className="text-xl font-bold text-gray-900 mb-1">Quiz Terminé</h3>
          <p className="text-gray-500 text-sm mb-4">Immunité Humorale — B3 Leçon 2</p>
          <div className="inline-block bg-blue-50 border border-blue-200 rounded-xl px-8 py-4 mb-6">
            <div className="text-4xl font-bold text-blue-800">{totalScore}/{QUIZ_QUESTIONS.length}</div>
            <div className="text-blue-600 font-medium">{scorePercent}%</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-6">
            {QUIZ_QUESTIONS.map((q, i) => (
              <div key={i} className={`flex items-center gap-2 p-2 rounded-lg border ${scores[i] ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                {scores[i] ? <CheckCircle size={16} className="text-green-600 shrink-0" /> : <XCircle size={16} className="text-red-500 shrink-0" />}
                <span className="text-gray-700 text-xs">{q.category}</span>
              </div>
            ))}
          </div>
          <div className={`text-sm font-medium mb-6 p-3 rounded-lg ${scorePercent >= 70 ? 'bg-green-50 text-green-800 border border-green-200' : scorePercent >= 50 ? 'bg-orange-50 text-orange-800 border border-orange-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
            {scorePercent >= 70 ? 'Excellente maîtrise de l\'immunité humorale !' : scorePercent >= 50 ? 'Résultat satisfaisant — Revoir la structure des Ig et la sélection clonale.' : 'Révision nécessaire — Reprendre le cours sur les anticorps et la réponse humorale.'}
          </div>
          <button onClick={handleReset} className="flex items-center gap-2 mx-auto px-5 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors text-sm font-medium">
            <RotateCcw size={16} /> Recommencer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-blue-700 text-white px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-blue-100 text-xs font-medium uppercase tracking-wide">Quiz Formatif — Bac S2</span>
          <span className="text-blue-100 text-xs">{current + 1} / {QUIZ_QUESTIONS.length}</span>
        </div>
        <h2 className="text-base font-bold">Immunité Adaptative Humorale</h2>
        <div className="mt-2 bg-blue-600 rounded-full h-1.5">
          <div
            className="bg-white rounded-full h-1.5 transition-all duration-300"
            style={{ width: `${((current + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Progression dots */}
      <div className="flex gap-1.5 px-6 pt-3">
        {QUIZ_QUESTIONS.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              scores[i] === true ? 'bg-green-500' :
              scores[i] === false ? 'bg-red-400' :
              i === current ? 'bg-blue-400' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Question */}
      <div className="px-6 py-5">
        <div className="mb-1">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-medium px-2 py-0.5 rounded-full mb-3">
            {question.category}
          </span>
        </div>
        <p className="text-gray-900 font-semibold text-sm leading-relaxed mb-5">{question.question}</p>

        <div className="space-y-2.5">
          {question.options.map((opt, idx) => {
            let cls = 'border border-gray-200 bg-gray-50 hover:bg-blue-50 hover:border-blue-300 cursor-pointer';
            if (isAnswered) {
              if (idx === question.correct) cls = 'border-green-500 bg-green-50';
              else if (idx === selected && idx !== question.correct) cls = 'border-red-400 bg-red-50';
              else cls = 'border-gray-200 bg-gray-50 opacity-60';
            }
            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={isAnswered}
                className={`w-full text-left rounded-lg px-4 py-3 text-sm transition-all ${cls}`}
              >
                <div className="flex items-start gap-3">
                  <span className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-bold mt-0.5 ${
                    isAnswered && idx === question.correct ? 'border-green-500 bg-green-500 text-white' :
                    isAnswered && idx === selected && idx !== question.correct ? 'border-red-400 bg-red-400 text-white' :
                    'border-gray-300 text-gray-400'
                  }`}>
                    {isAnswered && idx === question.correct ? '✓' :
                     isAnswered && idx === selected && idx !== question.correct ? '✗' :
                     String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-gray-800 leading-snug">{opt}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showResult && (
          <div className={`mt-4 p-4 rounded-lg border text-sm leading-relaxed ${isCorrect ? 'bg-green-50 border-green-300 text-green-900' : 'bg-orange-50 border-orange-300 text-orange-900'}`}>
            <div className="flex items-center gap-2 mb-2 font-semibold">
              {isCorrect ? <CheckCircle size={16} className="text-green-600" /> : <XCircle size={16} className="text-orange-500" />}
              {isCorrect ? 'Bonne réponse !' : 'Réponse incorrecte'}
            </div>
            <p>{question.explanation}</p>
          </div>
        )}

        {/* Next button */}
        {isAnswered && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleNext}
              className="px-5 py-2 bg-blue-700 text-white rounded-lg text-sm font-medium hover:bg-blue-800 transition-colors"
            >
              {current < QUIZ_QUESTIONS.length - 1 ? 'Question suivante →' : 'Voir les résultats'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

