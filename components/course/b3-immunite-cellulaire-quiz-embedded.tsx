'use client';

import { useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';

interface Question {
  id: number;
  category: string;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

const QUIZ_QUESTIONS_B3L3: Question[] = [
  {
    id: 1,
    category: 'Maturation thymique',
    question: "La sélection négative qui se déroule dans la médullaire thymique a pour fonction :",
    options: [
      "D'éliminer les lymphocytes T dont le TCR ne reconnaît aucune molécule du CMH",
      "D'éliminer par apoptose les lymphocytes T dont le TCR se lie avec une forte affinité aux peptides du soi (autotolérance)",
      "De forcer la différenciation des lymphocytes T en plasmocytes sécréteurs",
      "De stimuler la recombinaison des gènes des chaînes lourdes d'immunoglobulines"
    ],
    correct: 1,
    explanation: "La sélection négative a lieu dans la médullaire du thymus. Elle élimine par apoptose les thymocytes autoréactifs (ceux qui reconnaissent trop fortement les antigènes du soi présentés par le CMH). Ce processus assure l'établissement de la tolérance centrale au soi."
  },
  {
    id: 2,
    category: 'Double Reconnaissance',
    question: "Contrairement au récepteur BCR des lymphocytes B, le récepteur TCR des lymphocytes T8 :",
    options: [
      "Peut reconnaître et lier directement une toxine bactérienne libre soluble dans le plasma",
      "Est constitué de 4 chaînes polypeptidiques identiques reliées par des ponts disulfure",
      "Exige la double reconnaissance simultanée d'un peptide antigénique ET d'une molécule du CMH I",
      "Sécrète des perforines directement dans la circulation sanguine sans contact cellulaire"
    ],
    correct: 2,
    explanation: "Le TCR est incapable de fixer un antigène natif libre. Il exige impérativement que l'antigène soit apprêté sous forme de court peptide et présenté dans le sillon d'une molécule du CMH (CMH I pour le LT8 associé à son corécepteur CD8)."
  },
  {
    id: 3,
    category: 'Rôle pivot des LT4',
    question: "Pourquoi qualifie-t-on les lymphocytes T4 (auxiliaires) de « pivot central » ou de « chef d'orchestre » de l'immunité ?",
    options: [
      "Parce qu'ils fabriquent à eux seuls l'ensemble des anticorps et des perforines de l'organisme",
      "Parce qu'ils sécrètent l'Interleukine-2 (IL-2) indispensable à la prolifération et différenciation des LT8 et des LB",
      "Parce qu'ils phagocytent tous les antigènes dès la première heure de l'infection",
      "Parce qu'ils possèdent à la fois des molécules CD4 et CD8 à l'état mature"
    ],
    correct: 1,
    explanation: "Les LT4 activés par les CPA sécrètent de l'IL-2 en boucle autocrine (stimulation de leur propre clone) et paracrine (activation de la multiplication clonale et différenciation des LT8 en LTC et des LB en plasmocytes). Leur destruction (comme lors de l'infection par le VIH) bloque toute la réponse adaptative."
  },
  {
    id: 4,
    category: 'Mécanismes de Cytotoxicité',
    question: "Dans le mécanisme du « baiser de la mort », la destruction de la cellule cible par le lymphocyte T cytotoxique (LTC) fait intervenir :",
    options: [
      "L'exocytose polarisée de perforine (formant des pores) et de granzymes (activant les caspases de l'apoptose)",
      "La phagocytose directe de la cellule cible par le LTC",
      "L'émission d'anticorps IgG dans la fente synaptique",
      "La libération massive d'histamine provoquant un œdème local"
    ],
    correct: 0,
    explanation: "Le LTC forme une synapse immunologique avec la cible, polarise son cytosquelette puis libère de la perforine (qui forme des pores cylindriques membranaires dépendants du Ca²⁺) et des granzymes (qui pénètrent par ces pores et déclenchent la cascade enzymatique des caspases menant à l'apoptose)."
  },
  {
    id: 5,
    category: 'Expérience de Zinkernagel',
    question: "Dans l'expérience de Zinkernagel et Doherty, pourquoi les LTC d'une souris de souche A (H-2k) immunisée contre le virus LCM ne lysent-ils PAS les cellules infectées par LCM d'une souris de souche B (H-2d) ?",
    options: [
      "Parce que le virus LCM a muté chez la souris B",
      "Parce qu'il y a incompatibilité du CMH (restriction allogénique) : le TCR ne reconnaît pas le CMH H-2d de la souche B",
      "Parce que les cellules de la souche B ne possèdent aucun antigène",
      "Parce que les LTC de la souris A sont détruits par le sérum de la souris B"
    ],
    correct: 1,
    explanation: "C'est la démonstration fondamentale de la restriction au CMH du soi : les LTC ne peuvent détruire une cellule cible infectée que si celle-ci exprime exactement les mêmes molécules du CMH que celles qui ont servi à l'éducation thymique des LTC (ici le CMH H-2k et non H-2d)."
  },
  {
    id: 6,
    category: 'Apoptose vs Nécrose',
    question: "La mort cellulaire par apoptose induite par les LTC présente l'avantage majeur par rapport à une nécrose lytique de :",
    options: [
      "Permettre la multiplication des virus à l'intérieur des débris cellulaires",
      "Détruire également le LTC au cours de l'opération",
      "Condenser la chromatine et dégrader l'ADN en évitant la libération de virions infectieux dans le milieu extracellulaire",
      "Neutraliser le complément sérique sans intervention des macrophages"
    ],
    correct: 2,
    explanation: "L'apoptose est un suicide cellulaire programmé et propre : la membrane plasmique reste intègre sous forme de corps apoptotiques facilement éliminés par phagocytose sans déclencher de réaction inflammatoire destructive ni disséminer les particules virales."
  },
  {
    id: 7,
    category: 'Corécepteurs CD4 et CD8',
    question: "Quelle est la règle d'association entre corécepteurs des lymphocytes T et molécules du CMH ?",
    options: [
      "CD4 se lie au domaine α3 du CMH I et CD8 se lie au CMH II",
      "CD8 se lie au domaine α3 du CMH I et CD4 se lie au domaine β2 du CMH II",
      "CD8 et CD4 se lient indifféremment à toutes les classes de CMH",
      "Le corécepteur CD8 ne se lie qu'aux immunoglobulines circulantes"
    ],
    correct: 1,
    explanation: "Règle mnémotechnique du 8 : 8 x 1 = 8 (CD8 avec CMH I) et 4 x 2 = 8 (CD4 avec CMH II). Le CD8 interagit avec le domaine invariant α3 de la chaîne lourde du CMH I, consolidant l'arrimage du TCR au complexe CMH-peptide."
  },
  {
    id: 8,
    category: 'Coopération cellulaire',
    question: "Que se passe-t-il si l'on injecte à un animal irradié des LT8 en présence d'antigènes mais en l'absence totale de LT4 ?",
    options: [
      "La réponse cytotoxique est maximale car les LT4 exerçaient une inhibition",
      "La production de perforine est décuplée par rétrocontrôle positif",
      "Il n'y a quasiment aucune prolifération ni différenciation des LT8 en LTC effecteurs, faute d'interleukines (IL-2)",
      "Les LT8 se transforment spontanément en lymphocytes B sécréteurs d'IgM"
    ],
    correct: 2,
    explanation: "Sans coopération avec les LT4 (absence d'aide par l'IL-2), les LT8 stimulés par l'antigène ne peuvent pas accomplir leur expansion clonale ni acquérir leur machinerie lytique (perforine/granzyme). La réponse cytotoxique est quasi-nulle."
  }
];

export default function B3ImmuniteCellulaireQuizEmbedded() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState<boolean[]>(new Array(QUIZ_QUESTIONS_B3L3.length).fill(false));
  const [scores, setScores] = useState<(boolean | null)[]>(new Array(QUIZ_QUESTIONS_B3L3.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);

  const question = QUIZ_QUESTIONS_B3L3[current];
  const isAnswered = answered[current];
  const isCorrect = scores[current];
  const totalScore = scores.filter((s) => s === true).length;

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
    if (current < QUIZ_QUESTIONS_B3L3.length - 1) {
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
    setAnswered(new Array(QUIZ_QUESTIONS_B3L3.length).fill(false));
    setScores(new Array(QUIZ_QUESTIONS_B3L3.length).fill(null));
    setShowResult(false);
    setFinished(false);
  }

  const scorePercent = Math.round((totalScore / QUIZ_QUESTIONS_B3L3.length) * 100);

  if (finished) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm my-6">
        <div className="text-center">
          <Award className="mx-auto mb-3 text-red-700" size={48} />
          <h3 className="text-xl font-bold text-gray-900 mb-1">Quiz Formatif Terminé</h3>
          <p className="text-gray-500 text-sm mb-4">Immunité Cellulaire, LTC & LT4 Pivot (SVT S2)</p>
          <div className="inline-block bg-red-50 border border-red-200 rounded-xl px-8 py-4 mb-6">
            <div className="text-4xl font-bold text-red-800">
              {totalScore}/{QUIZ_QUESTIONS_B3L3.length}
            </div>
            <div className="text-red-600 font-medium">{scorePercent}% de réussite</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-6">
            {QUIZ_QUESTIONS_B3L3.map((q, i) => (
              <div
                key={i}
                className={`flex items-center gap-2 p-2 rounded-lg border ${
                  scores[i] ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                }`}
              >
                {scores[i] ? (
                  <CheckCircle size={16} className="text-green-600 shrink-0" />
                ) : (
                  <XCircle size={16} className="text-red-500 shrink-0" />
                )}
                <span className="text-gray-700 text-xs truncate">{q.category}</span>
              </div>
            ))}
          </div>
          <div
            className={`text-sm font-medium mb-6 p-3 rounded-lg ${
              scorePercent >= 75
                ? 'bg-green-50 text-green-800 border border-green-200'
                : scorePercent >= 50
                ? 'bg-orange-50 text-orange-800 border border-orange-200'
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            {scorePercent >= 75
              ? 'Excellente maîtrise des mécanismes de la cytotoxicité et du rôle des LT4 !'
              : scorePercent >= 50
              ? 'Niveau convenable — Révisez la restriction au CMH (Zinkernagel) et la cascade perforine-granzymes.'
              : 'Révisions approfondies requises — Reprenez les fiches réflexes sur le TCR, le CMH et l\'IL-2.'}
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 mx-auto px-5 py-2 bg-red-800 text-white rounded-lg hover:bg-red-900 transition-colors text-sm font-medium"
          >
            <RotateCcw size={16} /> Recommencer le test
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden my-6">
      {/* Header Médical */}
      <div className="bg-gradient-to-r from-red-900 to-rose-900 text-white px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-rose-200 text-xs font-medium uppercase tracking-wide">
            Évaluation Formative Baccalauréat S2
          </span>
          <span className="text-rose-200 text-xs font-semibold">
            Question {current + 1} sur {QUIZ_QUESTIONS_B3L3.length}
          </span>
        </div>
        <h2 className="text-base font-bold">Immunité Adaptative Cellulaire & Cytotoxicité</h2>
        <div className="mt-2 bg-red-950/60 rounded-full h-1.5">
          <div
            className="bg-rose-400 rounded-full h-1.5 transition-all duration-300"
            style={{ width: `${((current + 1) / QUIZ_QUESTIONS_B3L3.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Barre de progression point par point */}
      <div className="flex gap-1.5 px-6 pt-3">
        {QUIZ_QUESTIONS_B3L3.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              scores[i] === true
                ? 'bg-green-500'
                : scores[i] === false
                ? 'bg-red-400'
                : i === current
                ? 'bg-red-400'
                : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Corps de la question */}
      <div className="px-6 py-5">
        <div className="mb-2">
          <span className="inline-block bg-red-100 text-red-800 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2">
            {question.category}
          </span>
        </div>
        <p className="text-gray-900 font-bold text-sm leading-relaxed mb-5">{question.question}</p>

        <div className="space-y-2.5">
          {question.options.map((opt, idx) => {
            let cls = 'border border-gray-200 bg-gray-50/70 hover:bg-red-50/60 hover:border-red-300 cursor-pointer';
            if (isAnswered) {
              if (idx === question.correct) cls = 'border-green-500 bg-green-50 text-green-950 font-medium';
              else if (idx === selected && idx !== question.correct)
                cls = 'border-red-400 bg-red-50 text-red-950';
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
                  <span
                    className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center text-xs font-bold mt-0.5 ${
                      isAnswered && idx === question.correct
                        ? 'border-green-500 bg-green-500 text-white'
                        : isAnswered && idx === selected && idx !== question.correct
                        ? 'border-red-400 bg-red-400 text-white'
                        : 'border-gray-300 text-gray-500'
                    }`}
                  >
                    {isAnswered && idx === question.correct
                      ? '✓'
                      : isAnswered && idx === selected && idx !== question.correct
                      ? '✗'
                      : String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-gray-800 leading-snug">{opt}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Explication pédagogique immédiate */}
        {showResult && (
          <div
            className={`mt-4 p-4 rounded-lg border text-sm leading-relaxed ${
              isCorrect ? 'bg-green-50 border-green-300 text-green-900' : 'bg-red-50 border-red-300 text-red-900'
            }`}
          >
            <div className="flex items-center gap-2 mb-1.5 font-bold">
              {isCorrect ? (
                <CheckCircle size={16} className="text-green-600" />
              ) : (
                <XCircle size={16} className="text-red-500" />
              )}
              <span>{isCorrect ? 'Excellente réponse !' : 'Erreur classique au Bac :'}</span>
            </div>
            <p className="text-xs sm:text-sm">{question.explanation}</p>
          </div>
        )}

        {/* Bouton Suivant */}
        {isAnswered && (
          <div className="mt-5 flex justify-end">
            <button
              onClick={handleNext}
              className="px-5 py-2 bg-red-800 text-white rounded-lg text-sm font-semibold hover:bg-red-900 transition-colors shadow-xs"
            >
              {current < QUIZ_QUESTIONS_B3L3.length - 1 ? 'Question suivante →' : 'Voir mon bilan complet'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

