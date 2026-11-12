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

const QUIZ_QUESTIONS_B3L4: Question[] = [
  {
    id: 1,
    category: 'Hypersensibilité Immédiate',
    question: "Lors de la phase de sensibilisation (premier contact avec l'allergène), quelle est la réaction immunologique observée ?",
    options: [
      "Une dégranulation explosive immédiate d'histamine provoquant un œdème de Quincke",
      "La production d'anticorps IgE sous l'influence de cytokines Th2 qui se fixent par leur fragment Fc sur les mastocytes, sans symptôme clinique",
      "La destruction des mastocytes par les lymphocytes T cytotoxiques",
      "Une chute brutale de la pression artérielle conduisant au choc anaphylactique"
    ],
    correct: 1,
    explanation: "Le premier contact avec l'allergène constitue la phase de sensibilisation : il est totalement silencieux et asymptomatique. Les plasmocytes sécrètent des IgE spécifiques qui viennent s'ancrer par leur fragment Fc sur les récepteurs FcεRI des mastocytes et des basophiles."
  },
  {
    id: 2,
    category: 'Déclenchement Allergique',
    question: "Qu'est-ce qui déclenche la dégranulation de l'histamine lors d'un contact ultérieur avec l'allergène ?",
    options: [
      "La phagocytose du mastocyte par les polynucléaires neutrophiles",
      "Le pontage d'au moins deux molécules d'IgE fixées à la surface du mastocyte par l'allergène multivalent",
      "La fixation directe de l'allergène sur les molécules du CMH I de la cellule",
      "L'activation de la voie alterne du complément par les toxines bactériennes"
    ],
    correct: 1,
    explanation: "Lors des contacts ultérieurs, l'allergène bivalent ou multivalent se lie simultanément à au moins deux molécules d'IgE adjacentes déjà fixées sur le mastocyte (phénomène de pontage). Cela déclenche un afflux intracellulaire d'ions Ca²⁺ provoquant l'exocytose immédiate des granules d'histamine."
  },
  {
    id: 3,
    category: 'Choc Anaphylactique',
    question: "Sur le plan hémodynamique, pourquoi une libération massive d'histamine entraîne-t-elle un choc anaphylactique ?",
    options: [
      "Parce qu'elle provoque une hypertension artérielle sévère par vasoconstriction cérébrale",
      "Parce qu'elle induit une vasodilatation artériolaire intense (chute des résistances périphériques RPT) et une extravasation plasmatique majeure (hypovolémie)",
      "Parce qu'elle bloque complètement la conduction auriculoventriculaire au niveau du nœud de Keith et Flack",
      "Parce qu'elle stimule la réabsorption rénale excessive de sodium par l'aldostérone"
    ],
    correct: 1,
    explanation: "D'après la formule PA = DC × RPT : l'histamine entraîne une vasodilatation généralisée qui effondre les résistances périphériques (RPT ↘) et augmente la perméabilité capillaire créant un œdème massif qui réduit le volume sanguin efficace (volémie ↘ ──> Débit cardiaque DC ↘). L'association des deux mène au collapsus cardiovasculaire."
  },
  {
    id: 4,
    category: 'Auto-Immunité',
    question: "Laquelle des propositions suivantes caractérise le phénomène de « mimétisme moléculaire » dans l'apparition d'une maladie auto-immune ?",
    options: [
      "Une cellule cancéreuse qui copie les molécules du CMH I d'un donneur étranger",
      "Un agent pathogène qui possède un épitope partageant une homologie structurale avec un constituant du Soi, induisant une réaction croisée destructrice",
      "Une mutation génétique supprimant l'ensemble des récepteurs TCR des lymphocytes T",
      "La neutralisation des IgE par des IgG bloquantes après désensibilisation"
    ],
    correct: 1,
    explanation: "Le mimétisme moléculaire survient lorsqu'un épitope microbien ressemble fortement à une molécule du Soi de l'hôte. Les anticorps ou lymphocytes développés contre le microbe s'attaquent ensuite par réaction croisée aux propres tissus de l'organisme (ex : rhumatisme articulaire aigu post-streptococcique)."
  },
  {
    id: 5,
    category: 'Structure du VIH',
    question: "La glycoprotéine de surface gp120 du virion du VIH a pour fonction biologique de :",
    options: [
      "Cliver les polyprotéines virales dans le cytoplasme de la cellule hôte",
      "Se fixer avec une haute affinité sur le récepteur CD4 des lymphocytes T4 et des macrophages",
      "Polymériser sous forme de pores cylindriques pour lyser les cellules cibles",
      "Synthétiser un ARN messager à partir de l'ADN proviral intégré"
    ],
    correct: 1,
    explanation: "La gp120 forme la tête externe des spicules de l'enveloppe virale. Elle possède une affinité stérique très élevée pour le domaine externe du récepteur CD4 présent sur les lymphocytes T4, les monocytes/macrophages et les cellules dendritiques."
  },
  {
    id: 6,
    category: 'Cycle du VIH',
    question: "Quel est l'ordre chronologique d'action des trois enzymes virales au cours du cycle de réplication du VIH ?",
    options: [
      "1. Protéase ──> 2. Intégrase ──> 3. Transcriptase inverse",
      "1. Transcriptase inverse (cytoplasme) ──> 2. Intégrase (noyau) ──> 3. Protéase (assemblage/bourgeonnement)",
      "1. Intégrase ──> 2. Transcriptase inverse ──> 3. ARN polymérase II",
      "1. Transcriptase inverse ──> 2. Protéase ──> 3. Intégrase"
    ],
    correct: 1,
    explanation: "1. La transcriptase inverse synthétise l'ADN proviral double brin dans le cytoplasme à partir de l'ARN génomique viral ; 2. L'intégrase insère cet ADN proviral dans l'ADN nucléaire de la cellule hôte ; 3. La protéase découpe les polyprotéines virales précurseurs lors de la maturation des nouveaux virions bourgeonnants."
  },
  {
    id: 7,
    category: 'Séropositivité au VIH',
    question: "Que signifie précisément le terme « séropositif pour le VIH » au sens sérologique et clinique ?",
    options: [
      "Que le patient est totalement immunisé et débarrassé de toute trace de virus dans son organisme",
      "Que le sérum contient des anticorps anti-VIH détectables, attestant d'une infection par le virus, mais sans immunité protectrice",
      "Que le patient est obligatoirement en phase terminale de SIDA avec un taux de LT4 nul",
      "Que le virus a été transmis uniquement par piqûre de moustique"
    ],
    correct: 1,
    explanation: "Être séropositif signifie que des anticorps spécifiques dirigés contre les protéines du VIH (gp120, gp41, p24) sont présents et détectables dans le sérum du patient (par ELISA confirmé par Western Blot). Cela prouve la contamination par le rétrovirus, mais ces anticorps ne permettent pas d'éliminer le virus qui mute et reste intégré dans les réservoirs cellulaires."
  },
  {
    id: 8,
    category: 'Phase de SIDA Déclaré',
    question: "À quel moment considère-t-on qu'un patient passe de la phase asymptomatique à la phase de SIDA maladie déclarée ?",
    options: [
      "Dès la première semaine suivant le rapport contaminant",
      "Lorsque le taux de lymphocytes T4 sanguins chute sous le seuil critique de 200 cellules/mm³ et que surviennent des infections opportunistes",
      "Lorsque la charge virale devient indétectable dans le plasma",
      "Dès l'apparition d'un simple éternuement allergique aux acariens"
    ],
    correct: 1,
    explanation: "Le SIDA (Syndrome d'Immunodéficience Acquise) est le stade terminal de l'infection. Il est défini par un effondrement profond des lymphocytes T4 sous 200/mm³ de sang (taux normal : 800 à 1 200/mm³). L'organisme devient incapable d'orchestrer ses défenses immunitaires et succombe aux infections opportunistes (tuberculose, candidose, pneumocystose, sarcome de Kaposi)."
  }
];

export default function B3DysfonctionnementsQuizEmbedded() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState<boolean[]>(new Array(QUIZ_QUESTIONS_B3L4.length).fill(false));
  const [scores, setScores] = useState<(boolean | null)[]>(new Array(QUIZ_QUESTIONS_B3L4.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);

  const question = QUIZ_QUESTIONS_B3L4[current];
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
    if (current < QUIZ_QUESTIONS_B3L4.length - 1) {
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
    setAnswered(new Array(QUIZ_QUESTIONS_B3L4.length).fill(false));
    setScores(new Array(QUIZ_QUESTIONS_B3L4.length).fill(null));
    setShowResult(false);
    setFinished(false);
  }

  const scorePercent = Math.round((totalScore / QUIZ_QUESTIONS_B3L4.length) * 100);

  if (finished) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm my-6">
        <div className="text-center">
          <Award className="mx-auto mb-3 text-amber-800" size={48} />
          <h3 className="text-xl font-bold text-gray-900 mb-1">Quiz Formatif Terminé</h3>
          <p className="text-gray-500 text-sm mb-4">Dysfonctionnements Immunitaires, Allergies & SIDA (SVT S2)</p>
          <div className="inline-block bg-amber-50 border border-amber-200 rounded-xl px-8 py-4 mb-6">
            <div className="text-4xl font-bold text-amber-900">
              {totalScore}/{QUIZ_QUESTIONS_B3L4.length}
            </div>
            <div className="text-amber-700 font-medium">{scorePercent}% de réussite</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm mb-6">
            {QUIZ_QUESTIONS_B3L4.map((q, i) => (
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
              ? 'Excellente maîtrise des dysfonctionnements immunitaires et de la virologie du VIH !'
              : scorePercent >= 50
              ? 'Niveau satisfaisant — Revoir les phases de l\'allergie (sensibilisation vs réaction) et le cycle enzymatique du VIH.'
              : 'Révisions indispensables — Reprenez les fiches réflexes sur les IgE, l\'histamine et la sérologie du SIDA.'}
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 mx-auto px-5 py-2 bg-amber-900 text-white rounded-lg hover:bg-amber-950 transition-colors text-sm font-medium"
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
      <div className="bg-gradient-to-r from-amber-950 via-rose-950 to-red-950 text-white px-6 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-amber-200 text-xs font-medium uppercase tracking-wide">
            Évaluation Formative Baccalauréat S2
          </span>
          <span className="text-amber-200 text-xs font-semibold">
            Question {current + 1} sur {QUIZ_QUESTIONS_B3L4.length}
          </span>
        </div>
        <h2 className="text-base font-bold">Dysfonctionnements du Système Immunitaire</h2>
        <div className="mt-2 bg-amber-950/60 rounded-full h-1.5">
          <div
            className="bg-amber-400 rounded-full h-1.5 transition-all duration-300"
            style={{ width: `${((current + 1) / QUIZ_QUESTIONS_B3L4.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Barre de progression point par point */}
      <div className="flex gap-1.5 px-6 pt-3">
        {QUIZ_QUESTIONS_B3L4.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              scores[i] === true
                ? 'bg-green-500'
                : scores[i] === false
                ? 'bg-red-400'
                : i === current
                ? 'bg-amber-400'
                : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      {/* Corps de la question */}
      <div className="px-6 py-5">
        <div className="mb-2">
          <span className="inline-block bg-amber-100 text-amber-900 text-xs font-semibold px-2.5 py-0.5 rounded-full mb-2">
            {question.category}
          </span>
        </div>
        <p className="text-gray-900 font-bold text-sm leading-relaxed mb-5">{question.question}</p>

        <div className="space-y-2.5">
          {question.options.map((opt, idx) => {
            let cls = 'border border-gray-200 bg-gray-50/70 hover:bg-amber-50/60 hover:border-amber-300 cursor-pointer';
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
              <span>{isCorrect ? 'Excellente réponse !' : 'Erreur fréquente au Bac :'}</span>
            </div>
            <p className="text-xs sm:text-sm">{question.explanation}</p>
          </div>
        )}

        {/* Bouton Suivant */}
        {isAnswered && (
          <div className="mt-5 flex justify-end">
            <button
              onClick={handleNext}
              className="px-5 py-2 bg-amber-900 text-white rounded-lg text-sm font-semibold hover:bg-amber-950 transition-colors shadow-xs"
            >
              {current < QUIZ_QUESTIONS_B3L4.length - 1 ? 'Question suivante →' : 'Voir mon bilan complet'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

