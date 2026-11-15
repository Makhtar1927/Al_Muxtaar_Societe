'use client';

import React, { useState } from 'react';
import {
  HelpCircle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Award,
  ChevronRight,
  Sparkles,
  BookOpen,
  Dna,
  Scissors,
  Binary,
  Microscope,
} from 'lucide-react';

interface Question {
  id: number;
  question: string;
  context?: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  bacYear?: string;
  theme: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question: "Quelle est la particularité catalytique déterminante d'une enzyme de restriction comme EcoRI dans la construction d'un ADN recombinant ?",
    context: "Génie génétique - Outils enzymatiques du clonage",
    options: [
      "Elle polymérise de nouveaux brins d'ADN à partir de désoxyribonucléotides libres.",
      "Elle hydrolyse les liaisons phosphodiester au niveau d'un site palindromique spécifique en générant des extrémités cohésives (bouts collants).",
      "Elle relie les brins d'ADN d'organismes différents par des liaisons hydrogène covalentes sans ATP.",
      "Elle dégrade intégralement l'ADN bactérien pour empêcher l'insertion de plasmides étrangers."
    ],
    correctAnswer: 1,
    explanation: "EcoRI reconnaît la séquence palindromique 5'-GAATTC-3' et coupe de façon asymétrique entre G et A sur les deux brins, libérant des extrémités monocaténaires cohésives (5'-AATT-3'). Ces bouts collants permettent l'hybridation spontanée par complémentarité de bases avec n'importe quel autre fragment clivé par la même enzyme.",
    bacYear: "Baccalauréat S2",
    theme: "Enzymes de restriction"
  },
  {
    id: 2,
    question: "Pour faire exprimer une protéine humaine (ex. insuline) par une bactérie comme Escherichia coli, pourquoi doit-on obligatoirement utiliser un ADNc plutôt que le gène génomique humain complet ?",
    context: "Expression hétérologue chez les procaryotes",
    options: [
      "Parce que l'ADN bactérien ne tolère pas les nucléotides à adénine.",
      "Parce que les bactéries sont dépourvues de machinerie d'épissage (spliceosome) et sont incapables d'exciser les introns du pré-ARNm.",
      "Parce que l'ADNc s'intègre spontanément dans le chromosome bactérien sans vecteur plasmidique.",
      "Parce que le code génétique des procaryotes diffère totalement de celui des eucaryotes."
    ],
    correctAnswer: 1,
    explanation: "Les gènes eucaryotes sont morcelés (exons codants + introns non codants). Les bactéries (procaryotes) ne possèdent pas d'appareil d'épissage : la transcription d'un gène eucaryote génomique brut donnerait un ARNm contenant les introns, conduisant à une protéine anormale et tronquée. On synthétise donc un ADNc à partir de l'ARNm mature déjà épissé à l'aide de la transcriptase inverse (RT).",
    bacYear: "Baccalauréat S2",
    theme: "ADNc & Épissage"
  },
  {
    id: 3,
    question: "Quel est le rôle biologique précis de l'ADN ligase lors de la ligature de deux fragments d'ADN découpés par une même enzyme de restriction ?",
    context: "Liaison covalente des fragments d'ADN",
    options: [
      "Former les liaisons hydrogène entre les bases azotées complémentaires.",
      "Rétablir de manière covalente les liaisons phosphodiester entre le groupement 3'-OH et le groupement 5'-phosphate en consommant de l'ATP.",
      "Ajouter une queue poly-A à l'extrémité 3' du fragment d'ADN recombinant.",
      "Supprimer les mutations ponctuelles survenues pendant la coupure enzymatique."
    ],
    correctAnswer: 1,
    explanation: "Si l'hybridation des bouts cohésives repose sur des liaisons hydrogène faibles, la jonction définitive et stable requiert la formation de liaisons phosphodiester covalentes dans le squelette sucre-phosphate, réaction catalysée par l'ADN ligase (dépendante de l'ATP ou du NAD+).",
    bacYear: "Baccalauréat S2",
    theme: "ADN Ligase"
  },
  {
    id: 4,
    question: "Dans le vecteur de clonage plasmidique pBR322 portant un gène de résistance à l'ampicilline (AmpR) et un gène de résistance à la tétracycline (TetR), un insert est cloné dans le site unique situé au milieu du gène TetR. Quel sera le phénotype des bactéries ayant incorporé le plasmide recombinant ?",
    context: "Sélection par inactivation insertionnelle",
    options: [
      "Résistantes à l'ampicilline et résistantes à la tétracycline [AmpR, TetR].",
      "Sensibles à l'ampicilline et résistantes à la tétracycline [AmpS, TetR].",
      "Résistantes à l'ampicilline et sensibles à la tétracycline [AmpR, TetS].",
      "Sensibles aux deux antibiotiques [AmpS, TetS]."
    ],
    correctAnswer: 2,
    explanation: "L'insertion du transgène au sein du gène TetR interrompt sa phase de lecture : le gène est inactivé (inactivation insertionnelle). Le gène AmpR restant intact, les bactéries recombinantes survivent sur milieu avec ampicilline mais meurent en présence de tétracycline [AmpR, TetS]. C'est le principe de la sélection négative par réplique sur velours.",
    bacYear: "Baccalauréat S2",
    theme: "Sélection de recombinants"
  },
  {
    id: 5,
    question: "Au cours d'un cycle de PCR (Polymerase Chain Reaction), quelles sont les 3 étapes successives de température et leurs rôles exacts ?",
    context: "Amplification génique in vitro par thermocycleur",
    options: [
      "1. 55 °C (élongation), 2. 72 °C (dénaturation), 3. 95 °C (hybridation).",
      "1. 95 °C (dénaturation thermique des liaisons H), 2. 50-60 °C (hybridation des amorces oligonucléotidiques), 3. 72 °C (élongation par la Taq polymérase).",
      "1. 37 °C (transcription), 2. 72 °C (traduction), 3. 95 °C (lyse cellulaire).",
      "1. 72 °C (hybridation), 2. 95 °C (élongation), 3. 55 °C (ligature)."
    ],
    correctAnswer: 1,
    explanation: "Chaque cycle PCR comporte 3 phases : 1) Dénaturation à 94-95 °C pour séparer les 2 brins matrice ; 2) Hybridation des amorces à 50-65 °C (selon leur Tm) ; 3) Élongation à 72 °C (température optimale de la Taq ADN polymérase thermorésistante issue de Thermus aquaticus). Le nombre de copies amplifiées est de 2^n après n cycles.",
    bacYear: "Baccalauréat S2",
    theme: "PCR & Thermocycleur"
  },
  {
    id: 6,
    question: "Pourquoi la bactérie du sol Agrobacterium tumefaciens est-elle un vecteur de choix pour la création de plantes génétiquement modifiées (PGM) ?",
    context: "Transgénèse végétale",
    options: [
      "Elle produit naturellement des antibiotiques qui protègent les cultures contre les champignons.",
      "Elle possède un plasmide (Ti pour Tumor-Inducing) dont une portion (l'ADN-T) est naturellement transférée et intégrée de façon stable dans le génome de la cellule végétale hôte.",
      "Elle détruit les chromosomes des plantes pour les remplacer par des gènes bactériens.",
      "Elle permet la synthèse directe de pesticides chimiques sans intervention génétique."
    ],
    correctAnswer: 1,
    explanation: "Agrobacterium tumefaciens réalise une transgénèse naturelle via son plasmide Ti. En remplaçant les gènes oncogènes de l'ADN-T par le gène d'intérêt (ex. gène Bt de résistance à la pyrale ou gène de biosynthèse du bêta-carotène pour le riz doré), le vecteur transfère fidèlement le transgène au sein du noyau végétal.",
    bacYear: "Baccalauréat S2",
    theme: "Transgénèse végétale"
  },
  {
    id: 7,
    question: "Quelle différence fondamentale distingue la thérapie génique somatique de la thérapie génique germinale sur le plan biologique et éthique ?",
    context: "Biotechnologies médicales & Bioéthique",
    options: [
      "La thérapie somatique modifie les cellules reproductrices (gamètes) et se transmet à toutes les générations futures.",
      "La thérapie germinale guérit uniquement un organe malade de l'individu traité sans risque de descendance modifiée.",
      "La thérapie somatique ne cible que des cellules non reproductrices (ex. lymphocytes, cellules souches hématopoïétiques) et n'est pas transmise à la descendance, alors que la thérapie germinale modifie le génome héritable.",
      "Il n'existe aucune différence, les deux thérapies modifient obligatoirement le patrimoine de l'espèce humaine."
    ],
    correctAnswer: 2,
    explanation: "La thérapie génique somatique traite uniquement l'individu malade sans affecter sa lignée germinale : les modifications s'éteignent avec le patient. La thérapie germinale modifie les zygotes ou gamètes, impactant l'ensemble de la descendance future, ce qui soulève d'immenses questions éthiques et fait l'objet d'un moratoire ou d'interdictions légales strictes.",
    bacYear: "Baccalauréat S2",
    theme: "Thérapie génique & Éthique"
  },
  {
    id: 8,
    question: "Pour produire de l'insuline humaine fonctionnelle chez Escherichia coli, quelle difficulté structurale majeure a nécessité une stratégie biotechnologique ingénieuse ?",
    context: "Ingénierie des protéines thérapeutiques",
    options: [
      "L'insuline humaine contient des acides aminés que les bactéries sont incapables de synthétiser.",
      "L'insuline est composée de deux chaînes polypeptidiques (A et B) reliées par des ponts disulfures spécifiques, or les bactéries ne réalisent pas correctement ces repliements post-traductionnels dans leur cytoplasme réducteur.",
      "La bactérie détruit immédiatement tous les ARN messagers contenant des codons pour la leucine.",
      "L'insuline s'accumule sous forme gazeuse et s'évapore des fermenteurs."
    ],
    correctAnswer: 1,
    explanation: "L'insuline active est un hétérodimère formé de la chaîne A (21 aa) et de la chaîne B (30 aa) unies par 2 ponts disulfures interchaînes (plus 1 pont intrachaîne). La première approche de Genentech a consisté à faire produire les chaînes A et B séparément dans deux souches de colibacilles fusionnées à la bêta-galactosidase, puis à les purifier et à former les ponts disulfures in vitro par oxydation ménagée.",
    bacYear: "Baccalauréat S2",
    theme: "Insuline recombinante"
  }
];

export function B5GenieGenetiqueQuizEmbedded() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showExplanation, setShowExplanation] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = QUESTIONS[currentIdx];
  const isAnswered = selectedAnswers[currentIdx] !== undefined;

  const handleSelect = (optIdx: number) => {
    if (isAnswered) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIdx]: optIdx }));
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIdx < QUESTIONS.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setShowExplanation(selectedAnswers[currentIdx + 1] !== undefined);
    } else {
      setQuizFinished(true);
    }
  };

  const handlePrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(prev => prev - 1);
      setShowExplanation(true);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setCurrentIdx(0);
    setShowExplanation(false);
    setQuizFinished(false);
  };

  const score = Object.entries(selectedAnswers).reduce((acc, [idx, ans]) => {
    return ans === QUESTIONS[Number(idx)].correctAnswer ? acc + 1 : acc;
  }, 0);

  const percentage = Math.round((score / QUESTIONS.length) * 100);

  return (
    <div className="bg-white rounded-3xl border border-navy/10 p-6 md:p-8 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-navy/10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-700" />
            <span>Évaluation Formative Baccalauréat S2</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-navy">
            Quiz Bac S2 : Génie Génétique & Biotechnologies
          </h2>
          <p className="text-sm text-navy/70 mt-1">
            8 questions de maîtrise conceptuelle, raisonnement sur protocoles et justification scientifique
          </p>
        </div>

        {!quizFinished && (
          <div className="text-right">
            <span className="text-xs font-medium text-navy/60 block">Progression</span>
            <span className="text-lg font-bold text-navy">
              Question {currentIdx + 1} / {QUESTIONS.length}
            </span>
          </div>
        )}
      </div>

      {!quizFinished ? (
        <div className="mt-6 space-y-6">
          {/* Question Metadata */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2.5 py-1 rounded-lg bg-navy/5 text-navy font-semibold">
              {currentQ.theme}
            </span>
            {currentQ.bacYear && (
              <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 font-medium border border-emerald-200/60">
                {currentQ.bacYear}
              </span>
            )}
          </div>

          {/* Context box if available */}
          {currentQ.context && (
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-navy/80 flex items-center gap-2">
              <Microscope className="w-4 h-4 text-emerald-600 shrink-0" />
              <span><strong>Contexte d'évaluation :</strong> {currentQ.context}</span>
            </div>
          )}

          {/* Question statement */}
          <h3 className="text-base md:text-lg font-semibold text-navy leading-relaxed">
            {currentQ.question}
          </h3>

          {/* Options */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((option, optIdx) => {
              const isSelected = selectedAnswers[currentIdx] === optIdx;
              const isCorrect = currentQ.correctAnswer === optIdx;
              const showResult = isAnswered;

              let btnStyle = "border-navy/15 bg-white hover:bg-navy/5 text-navy";
              let indicator = <div className="w-5 h-5 rounded-full border border-navy/30 flex items-center justify-center text-xs font-medium text-navy/70">{String.fromCharCode(65 + optIdx)}</div>;

              if (showResult) {
                if (isCorrect) {
                  btnStyle = "border-emerald-500 bg-emerald-50/70 text-emerald-950 font-medium";
                  indicator = <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />;
                } else if (isSelected && !isCorrect) {
                  btnStyle = "border-red-400 bg-red-50/70 text-red-950";
                  indicator = <XCircle className="w-5 h-5 text-red-600 shrink-0" />;
                } else {
                  btnStyle = "border-navy/10 bg-white/50 text-navy/40";
                }
              } else if (isSelected) {
                btnStyle = "border-emerald-600 bg-emerald-50 text-emerald-950 font-medium";
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelect(optIdx)}
                  disabled={isAnswered}
                  className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${btnStyle}`}
                >
                  <div className="mt-0.5 shrink-0">{indicator}</div>
                  <span className="text-sm leading-relaxed">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {showExplanation && (
            <div className={`p-4 rounded-2xl border transition-all ${
              selectedAnswers[currentIdx] === currentQ.correctAnswer
                ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
                : 'bg-amber-50/80 border-amber-300 text-amber-950'
            }`}>
              <div className="flex items-start gap-3">
                <BookOpen className="w-5 h-5 mt-0.5 shrink-0 text-emerald-700" />
                <div className="text-xs md:text-sm space-y-1 leading-relaxed">
                  <div className="font-bold flex items-center gap-1.5">
                    {selectedAnswers[currentIdx] === currentQ.correctAnswer ? (
                      <span className="text-emerald-800">Justification validée</span>
                    ) : (
                      <span className="text-amber-900">Éclairage pédagogique Bac S2</span>
                    )}
                  </div>
                  <p>{currentQ.explanation}</p>
                </div>
              </div>
            </div>
          )}

          {/* Action Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-navy/10">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="px-4 py-2 text-xs font-semibold text-navy/70 hover:text-navy disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              Question précédente
            </button>

            <button
              onClick={handleNext}
              disabled={!isAnswered}
              className="px-5 py-2.5 rounded-2xl bg-navy text-white text-xs font-bold hover:bg-navy/90 disabled:opacity-40 disabled:pointer-events-none transition-all flex items-center gap-2 shadow-sm"
            >
              <span>{currentIdx === QUESTIONS.length - 1 ? 'Voir le bilan' : 'Question suivante'}</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Final Score Screen */
        <div className="mt-8 text-center space-y-6 max-w-md mx-auto py-4">
          <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-300 flex items-center justify-center mx-auto shadow-sm">
            <Award className="w-10 h-10 text-emerald-600" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-navy">Bilan de l'évaluation</h3>
            <p className="text-sm text-navy/70">
              Génie Génétique & Biotechnologies • Terminale S2
            </p>
          </div>

          <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="text-4xl font-black text-navy">{percentage} %</div>
            <p className="text-xs text-navy/70">
              Vous avez obtenu <strong>{score}</strong> réponse(s) exacte(s) sur <strong>{QUESTIONS.length}</strong>.
            </p>
          </div>

          <p className="text-xs text-navy/80 leading-relaxed italic">
            {percentage >= 75
              ? "Excellente maîtrise des techniques du génie génétique (enzymes de restriction, clonage, PCR, transgénèse) ! Vous êtes parfaitement armé pour le Bac S2."
              : percentage >= 50
              ? "Résultats honorables. Révisez attentivement la sélection par inactivation insertionnelle et les étapes de la PCR pour consolider vos acquis."
              : "Revenez sur les fiches réflexes et le laboratoire virtuel pour bien assimiler la chronologie du clonage moléculaire et l'utilité des ADNc."}
          </p>

          <button
            onClick={handleReset}
            className="w-full py-3 rounded-2xl bg-navy text-white text-sm font-bold hover:bg-navy/90 transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Recommencer le quiz</span>
          </button>
        </div>
      )}
    </div>
  );
}
