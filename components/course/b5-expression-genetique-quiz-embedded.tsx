'use client';

import React, { useState } from 'react';
import {
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Dna,
  Target,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';

interface Question {
  id: number;
  question: string;
  context?: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 'Facile' | 'Moyen' | 'Difficile';
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question:
      'L’analyse quantitative des bases azotées d’un échantillon d’ADN bicaténaire révèle que la cytosine (C) représente 32% de la totalité des bases. Quel est le pourcentage en thymine (T) ?',
    options: ['32%', '18%', '36%', '64%'],
    correct: 1,
    explanation:
      'Dans un ADN bicaténaire, les règles de Chargaff imposent C = G et A = T. Si C = 32%, alors G = 32%, soit un total C + G = 64%. La fraction restante A + T représente 100% - 64% = 36%. Puisque A = T, le pourcentage en thymine est 36% / 2 = 18%.',
    difficulty: 'Facile',
  },
  {
    id: 2,
    question:
      'Dans l’expérience de Meselson et Stahl, des bactéries dont l’ADN est initialement lourd (15N-15N) se divisent deux fois consécutives dans un milieu ne contenant que de l’azote léger 14N. Quels sont les pourcentages des différentes formes d’ADN observées à la génération 2 (G2) ?',
    options: [
      '100% d’ADN hybride (15N-14N)',
      '50% d’ADN hybride (15N-14N) et 50% d’ADN léger (14N-14N)',
      '25% d’ADN lourd, 50% d’ADN hybride et 25% d’ADN léger',
      '75% d’ADN léger et 25% d’ADN hybride',
    ],
    correct: 1,
    explanation:
      'Selon le modèle semi-conservatif, à G0, il y a 1 molécule lourde (2 brins 15N). À G1, il y a 2 molécules, toutes deux hybrides (15N-14N). À G2, chaque brin sert de matrice pour synthétiser un brin 14N : les 2 brins 15N donnent 2 molécules hybrides, et les 2 brins 14N donnent 2 molécules légères (14N-14N). Sur 4 molécules au total, on a 2 hybrides (50%) et 2 légères (50%).',
    difficulty: 'Moyen',
  },
  {
    id: 3,
    question:
      'Soit la séquence d’ADN suivante correspondant au brin transcrit (matrice) : 3’-TAC-GGA-CTA-ATT-5’. Quelle est la séquence de l’ARNm correspondant ?',
    options: [
      '5’-AUG-CCU-GAU-UAA-3’',
      '5’-ATG-CCT-GAT-TAA-3’',
      '3’-AUG-CCU-GAU-UAA-5’',
      '5’-UAC-GGA-CUA-AUU-3’',
    ],
    correct: 0,
    explanation:
      'L’ARN polymérase lit le brin transcrit de 3’ vers 5’ et synthétise l’ARNm de 5’ vers 3’ par complémentarité exacte : T donne A, A donne U, C donne G, et G donne C. La séquence obtenue est donc 5’-AUG-CCU-GAU-UAA-3’. Notez que UAA est un codon STOP !',
    difficulty: 'Facile',
  },
  {
    id: 4,
    question:
      'Pourquoi dit-on que le code génétique est « dégénéré » ou « redondant » ?',
    options: [
      'Parce qu’un même codon peut spécifier plusieurs acides aminés différents',
      'Parce qu’il existe 64 acides aminés pour seulement 20 codons',
      'Parce qu’un même acide aminé peut être codé par plusieurs codons différents',
      'Parce qu’il subit une dégradation rapide après la traduction',
    ],
    correct: 2,
    explanation:
      'Le code génétique est qualifié de dégénéré ou redondant car 61 codons codent pour seulement 20 acides aminés différents. Par exemple, la leucine et l’arginine possèdent chacune 6 codons distincts. Cette redondance amortit l’effet des mutations génétiques (mutations silencieuses).',
    difficulty: 'Facile',
  },
  {
    id: 5,
    question:
      'Au cours de la traduction, que se passe-t-il exactement lorsque le ribosome rencontre l’un des trois codons STOP (UAA, UAG, UGA) ?',
    options: [
      'Un ARNt spécial apporte une méthionine modifiée qui bloque le ribosome',
      'L’ARNt se détache et le ribosome commence à lire l’ARNm dans le sens inverse',
      'Un facteur de libération protéique se fixe au site A, provoquant l’hydrolyse de la chaîne polypeptidique et la dissociation des sous-unités ribosomiques',
      'Le ribosome saute le codon STOP et continue la traduction jusqu’à l’extrémité 3’',
    ],
    correct: 2,
    explanation:
      'Aucun ARNt ne possède d’anticodon complémentaire d’un codon STOP. C’est un facteur protéique de terminaison (RF : Release Factor) qui reconnaît le codon STOP au site A du ribosome. Il déclenche le clivage de la liaison ester entre l’ARNt du site P et le peptide, libérant la protéine mature et provoquant la dissociation des sous-unités ribosomiques.',
    difficulty: 'Moyen',
  },
  {
    id: 6,
    question:
      'Dans la drépanocytose (anémie falciforme), quelle est la nature moléculaire exacte de la mutation affectant le gène de la chaîne β de l’hémoglobine ?',
    options: [
      'Une délétion de 3 nucléotides éliminant une phénylalanine',
      'Une substitution d’un nucléotide A par T sur le brin codant (codon GAG devenant GTG), remplaçant l’acide glutamique par la valine en position 6',
      'Une insertion d’une cytosine décalant tout le cadre de lecture',
      'Une mutation non-sens créant un codon STOP prématuré au 6e acide aminé',
    ],
    correct: 1,
    explanation:
      'La drépanocytose est causée par une mutation ponctuelle par substitution : sur le brin codant de l’ADN, le triplet GAG est transformé en GTG (sur le brin transcrit, CTC devient CAC). L’ARNm porte alors le codon GUG au lieu de GAG, ce qui substitue l’acide glutamique (hydrophile) par la valine (hydrophobe) en 6e position de la chaîne β-globine.',
    difficulty: 'Moyen',
  },
  {
    id: 7,
    question:
      'Durant la phase d’élongation de la traduction, quel est le rôle respectif des sites A (Aminoacyle) et P (Peptidyle) du ribosome ?',
    options: [
      'Le site A accueille le nouvel ARNt chargé de son acide aminé, tandis que le site P porte la chaîne polypeptidique naissante',
      'Le site P accueille le nouvel ARNt, et le site A expulse l’ARNt vide',
      'Le site A sert uniquement à la fixation de l’ARNm et le site P à sa dégradation',
      'Les deux sites ont des rôles strictement identiques et interchangeables',
    ],
    correct: 0,
    explanation:
      'Le site P (Peptidyle) porte l’ARNt lié au peptide en cours de synthèse. Le site A (Aminoacyle) reçoit le nouvel aminoacyl-ARNt dont l’anticodon s’apparie au codon exposé. La peptidyl-transférase catalyse la liaison peptidique, puis la translocation déplace le ribosome de 3 nucléotides, transférant l’ARNt portant le peptide du site A vers le site P.',
    difficulty: 'Difficile',
  },
  {
    id: 8,
    question:
      'Chez les cellules eucaryotes, l’excision-épissage (splicing) est une étape de maturation post-transcriptionnelle qui consiste à :',
    options: [
      'Ajouter une coiffe en 5’ et une queue poly-A en 3’ sans modifier la séquence interne',
      'Éliminer les séquences non codantes (introns) et raccorder les séquences codantes (exons) pour former l’ARNm mature',
      'Éliminer les exons pour ne conserver que les introns protecteurs',
      'Traduire l’ARN directement dans le noyau avant son exportation',
    ],
    correct: 1,
    explanation:
      'Chez les eucaryotes, le transcrit primaire (ARN pré-messager) contient des séquences codantes (exons) entrecoupées de séquences non codantes (introns). L’excision-épissage par le splicéosome élimine les introns et réunit bout à bout les exons pour constituer l’ARNm mature qui franchira les pores nucléaires vers le cytoplasme.',
    difficulty: 'Moyen',
  },
];

export default function B5ExpressionGenetiqueQuizEmbedded() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [currentIdx, setCurrentIdx] = useState<number>(0);

  const q = QUESTIONS[currentIdx];
  const totalCorrect = submitted
    ? QUESTIONS.filter((item) => answers[item.id] === item.correct).length
    : 0;

  const handleSelect = (optionIdx: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [q.id]: optionIdx }));
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setCurrentIdx(0);
  };

  return (
    <div className="my-10 rounded-3xl bg-white border border-navy/10 p-5 sm:p-7 shadow-sm">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/10 pb-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-3 py-1 text-xs font-bold text-navy mb-1 border border-navy/10">
            <Target className="w-3.5 h-3.5 text-turquoise" />
            <span>Évaluation Formative • 8 Questions Ciblées Bac S2</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-navy">
            Quiz d’Entraînement : Expression Génique &amp; Réplication
          </h3>
          <p className="text-xs sm:text-sm text-text/70 mt-0.5">
            Testez vos connaissances sur Chargaff, Meselson &amp; Stahl, la transcription, la traduction ribosomique et les mutations.
          </p>
        </div>

        {submitted && (
          <div
            className={`self-start sm:self-center rounded-2xl px-4 py-2 border text-sm font-black ${
              totalCorrect >= 6
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                : totalCorrect >= 4
                ? 'bg-amber-50 text-amber-800 border-amber-200'
                : 'bg-rose-50 text-rose-800 border-rose-200'
            }`}
          >
            Score final : {totalCorrect} / {QUESTIONS.length} (
            {Math.round((totalCorrect / QUESTIONS.length) * 100)}%)
          </div>
        )}
      </div>

      {/* Paginator / Indicateurs de questions */}
      <div className="flex items-center gap-1.5 mb-6 overflow-x-auto pb-1">
        {QUESTIONS.map((item, idx) => {
          const isAnswered = answers[item.id] !== undefined;
          const isCurrent = currentIdx === idx;
          const isCorrect = submitted && answers[item.id] === item.correct;
          const isWrong = submitted && isAnswered && !isCorrect;

          return (
            <button
              key={item.id}
              onClick={() => setCurrentIdx(idx)}
              className={`h-8 w-8 rounded-xl text-xs font-bold transition-all border flex items-center justify-center shrink-0 ${
                isCurrent
                  ? 'bg-navy text-white border-navy shadow-sm'
                  : isCorrect
                  ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                  : isWrong
                  ? 'bg-rose-100 text-rose-800 border-rose-300'
                  : isAnswered
                  ? 'bg-navy/10 text-navy border-navy/20'
                  : 'bg-surface/50 text-text/50 border-navy/10 hover:bg-surface'
              }`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Carte de la Question active */}
      <div className="rounded-2xl border border-navy/10 bg-surface/30 p-5 mb-5">
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-text/50">
            Question {currentIdx + 1} sur {QUESTIONS.length}
          </span>
          <span
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
              q.difficulty === 'Facile'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                : q.difficulty === 'Moyen'
                ? 'bg-blue-50 text-blue-700 border-blue-200'
                : 'bg-purple-50 text-purple-700 border-purple-200'
            }`}
          >
            Niveau {q.difficulty}
          </span>
        </div>

        {q.context && (
          <div className="rounded-xl bg-navy/5 border border-navy/10 p-3 mb-3">
            <p className="text-xs text-text/70 italic leading-relaxed">{q.context}</p>
          </div>
        )}

        <h4 className="text-sm sm:text-base font-bold text-navy leading-relaxed mb-4">
          {q.question}
        </h4>

        {/* Options de réponse */}
        <div className="space-y-2.5">
          {q.options.map((option, optIdx) => {
            const isSelected = answers[q.id] === optIdx;
            const isRightAnswer = optIdx === q.correct;

            let optionStyle = 'bg-white border-navy/10 text-navy/80 hover:bg-surface';
            if (submitted) {
              if (isRightAnswer) {
                optionStyle = 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold';
              } else if (isSelected && !isRightAnswer) {
                optionStyle = 'bg-rose-50 border-rose-300 text-rose-950';
              } else {
                optionStyle = 'bg-white/50 border-navy/5 text-text/40 opacity-60';
              }
            } else if (isSelected) {
              optionStyle = 'bg-navy text-white border-navy shadow-xs font-semibold';
            }

            return (
              <button
                key={optIdx}
                disabled={submitted}
                onClick={() => handleSelect(optIdx)}
                className={`w-full rounded-xl border p-3.5 text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${optionStyle}`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md text-[10px] font-black border ${
                    isSelected && !submitted
                      ? 'bg-white/20 border-white text-white'
                      : submitted && isRightAnswer
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : submitted && isSelected && !isRightAnswer
                      ? 'bg-rose-600 border-rose-600 text-white'
                      : 'bg-navy/5 border-navy/10 text-navy'
                  }`}
                >
                  {String.fromCharCode(65 + optIdx)}
                </span>
                <span className="flex-1 leading-relaxed">{option}</span>
                {submitted && isRightAnswer && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                )}
                {submitted && isSelected && !isRightAnswer && (
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explication après validation */}
        {submitted && (
          <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50/70 p-4">
            <div className="flex items-center gap-2 mb-1.5">
              <CheckCircle2 className="w-4 h-4 text-blue-700" />
              <span className="text-xs font-bold text-blue-950">Explication méthodologique :</span>
            </div>
            <p className="text-xs text-blue-900 leading-relaxed">{q.explanation}</p>
          </div>
        )}
      </div>

      {/* Barre de navigation / Soumission */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-start">
          <button
            onClick={() => setCurrentIdx((prev) => Math.max(0, prev - 1))}
            disabled={currentIdx === 0}
            className="rounded-xl border border-navy/10 bg-white px-4 py-2 text-xs font-bold text-navy hover:bg-surface disabled:opacity-30"
          >
            Question précédente
          </button>
          <button
            onClick={() => setCurrentIdx((prev) => Math.min(QUESTIONS.length - 1, prev + 1))}
            disabled={currentIdx === QUESTIONS.length - 1}
            className="rounded-xl border border-navy/10 bg-white px-4 py-2 text-xs font-bold text-navy hover:bg-surface disabled:opacity-30 inline-flex items-center gap-1.5"
          >
            <span>Question suivante</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          {submitted ? (
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 rounded-xl border border-navy/20 bg-white px-5 py-2 text-xs font-bold text-navy hover:bg-surface shadow-xs"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Recommencer le quiz</span>
            </button>
          ) : (
            <button
              onClick={() => setSubmitted(true)}
              disabled={Object.keys(answers).length === 0}
              className="inline-flex items-center gap-2 rounded-xl bg-navy px-6 py-2.5 text-xs font-bold text-white hover:bg-navy/90 shadow-sm disabled:opacity-40"
            >
              <span>Valider les réponses ({Object.keys(answers).length}/{QUESTIONS.length})</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
