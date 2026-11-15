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
      'Dans un arbre généalogique, deux parents phénotypiquement sains (I-1 et I-2) ont un fils et une fille sains, ainsi qu’un fils malade. Que déduisez-vous avec certitude quant au mode de transmission ?',
    options: [
      'L’allèle responsable de la tare est obligatoirement dominant',
      'L’allèle responsable de la tare est obligatoirement récessif, porté par les parents à l’état masqué',
      'Le gène est obligatoirement situé sur le chromosome Y',
      'L’un des deux parents est forcément atteint sans le savoir',
    ],
    correct: 1,
    explanation:
      'Deux parents phénotypiquement sains donnant un enfant malade prouvent de façon irréfutable que l’allèle responsable de la tare est RÉCESSIF. Les parents sont hétérozygotes porteurs sains : ils possèdent l’allèle malade mais ne l’expriment pas car l’allèle normal est dominant.',
    difficulty: 'Facile',
  },
  {
    id: 2,
    question:
      'Quelle observation dans un arbre généalogique permet d’ÉLIMINER de façon absolue l’hypothèse d’un gène porté par la portion spécifique du chromosome X (récessif) ?',
    context: 'Soit une maladie récessive transmise dans une grande famille sénégalaise.',
    options: [
      'Un père malade a un fils malade',
      'Une mère conductrice a un fils malade',
      'Une fille malade est issue d’un père phénotypiquement sain',
      'Deux parents sains ont un fils malade',
    ],
    correct: 2,
    explanation:
      'Si le gène était lié à X récessif, une fille atteinte aurait pour génotype Xm//Xm. Elle recevrait obligatoirement un chromosome Xm de sa mère et son unique chromosome Xm de son père. Son père aurait donc pour génotype Xm//Y et serait OBLIGATOIREMENT MALADE. Constater qu’une fille malade a un père sain élimine irréfutablement la liaison à X récessif.',
    difficulty: 'Moyen',
  },
  {
    id: 3,
    question:
      'Deux parents atteints d’une même tare osseuse se marient et ont 3 enfants : 2 enfants atteints et 1 fille rigoureusement saine. Quelle est la conclusion génétique rigoureuse ?',
    options: [
      'La tare est récessive car elle touche les deux sexes',
      'La tare est dominante, et les deux parents sont hétérozygotes',
      'La fille saine est issue d’une mutation de novo réversive',
      'La tare est obligatoirement liée au chromosome Y',
    ],
    correct: 1,
    explanation:
      'Si la tare était récessive, deux parents malades seraient tous deux homozygotes (m//m) et ne pourraient produire que des gamètes portant l’allèle m, donnant 100% d’enfants malades. L’apparition d’un enfant sain (n//n) prouve de façon catégorique que la maladie est DOMINANTE (M > n) et que les deux parents sont hétérozygotes (M//n).',
    difficulty: 'Moyen',
  },
  {
    id: 4,
    question:
      'Dans une famille atteinte de drépanocytose (autosomique récessive), un jeune homme sain II-2 a un frère cadet atteint de la maladie. Quelle est la probabilité que ce jeune homme sain soit hétérozygote porteur (A//S) ?',
    options: [
      '1/2 (50%) car il y a deux parents',
      '1/4 (25%) selon les lois de Mendel',
      '2/3 (environ 66,7%) car sachant qu’il est sain, la case récessive S//S est exclue',
      '3/4 (75%) car il exprime le phénotype dominant',
    ],
    correct: 2,
    explanation:
      'C’est le piège n°1 du Bac S2 ! Les parents sont porteurs (A//S × A//S), l’échiquier donne 1/4 A//A, 2/4 A//S, 1/4 S//S. Or le jeune homme II-2 est déjà né et SAIN [A]. L’événement « être S//S » est donc impossible. Parmi les 3 cases saines restantes (1 A//A + 2 A//S), il y a 2 chances sur 3 (2/3) qu’il soit hétérozygote porteur.',
    difficulty: 'Difficile',
  },
  {
    id: 5,
    question:
      'Une femme conductrice pour l’hémophilie A (XN//Xm) épouse un homme sain (XN//Y). Quelle est la probabilité que leur premier enfant soit un garçon hémophile ?',
    options: [
      '1/2 (50%)',
      '1/4 (25%)',
      '1/8 (12,5%)',
      '0% car les filles compensent le défaut',
    ],
    correct: 1,
    explanation:
      'La probabilité d’avoir un garçon est de 1/2. Sachant que c’est un garçon, la probabilité qu’il reçoive l’allèle muté Xm de sa mère est de 1/2. La probabilité conjointe d’avoir un « garçon hémophile » est donc 1/2 × 1/2 = 1/4 (25% de tous les enfants à naître).',
    difficulty: 'Moyen',
  },
  {
    id: 6,
    question:
      'Une analyse par électrophorèse montre qu’un enfant trisomique 21 possède TROIS allèles distincts pour un locus polymorphe du chromosome 21 : A1 (provenant du père), ainsi que A2 et A3 (tous deux présents chez la mère). À quel moment s’est produite la non-disjonction méiotique ?',
    options: [
      'En anaphase I maternelle, car les deux chromosomes homologues maternels différents n’ont pas été séparés',
      'En anaphase II maternelle, car les chromatides sœurs ont migré ensemble',
      'En anaphase I paternelle',
      'Lors de la première mitose de clivage du zygote',
    ],
    correct: 0,
    explanation:
      'La mère possède les allèles A2 et A3 sur ses deux chromosomes 21 homologues. Si l’enfant a reçu à la fois A2 et A3 de sa mère, c’est que les deux chromosomes homologues maternels ont migré ensemble dans le même ovocyte : l’accident a eu lieu en ANAPHASE I de la méiose maternelle. Une non-disjonction en anaphase II aurait transmis deux copies du même allèle (A2+A2 ou A3+A3).',
    difficulty: 'Difficile',
  },
  {
    id: 7,
    question:
      'Dans le cas de la drépanocytose, une enzyme de restriction MstII coupe l’allèle normal βA en deux fragments de 1,1 kb et 0,2 kb, mais ne coupe pas l’allèle muté βS (bande unique de 1,3 kb). Quel profil électrophorétique présentera un individu hétérozygote porteur sain (AS) ?',
    options: [
      'Une seule bande à 1,3 kb',
      'Deux bandes à 1,1 kb et 0,2 kb',
      'Trois bandes : 1,3 kb, 1,1 kb et 0,2 kb',
      'Aucune bande car l’ADN est dégradé',
    ],
    correct: 2,
    explanation:
      'L’hétérozygote porte à la fois l’allèle βA (qui est digéré et donne les bandes à 1,1 kb et 0,2 kb) et l’allèle mutant βS (qui reste intact à 1,3 kb par perte du site MstII). Le profil de l’individu AS est composite et présente les trois bandes caractéristiques : 1,3 kb, 1,1 kb et 0,2 kb.',
    difficulty: 'Moyen',
  },
  {
    id: 8,
    question:
      'Quelle est la différence fondamentale entre une trisomie 21 libre (47 chromosomes) et une trisomie 21 par translocation robertsonienne (46 chromosomes) ?',
    options: [
      'La trisomie libre est toujours mortelle, la translocation est bénigne',
      'La trisomie par translocation peut être héritée d’un parent phénotypiquement normal porteur équilibré (45 chromosomes), alors que la trisomie libre est un accident méiotique accidentel',
      'La trisomie par translocation ne concerne que les chromosomes sexuels X et Y',
      'Il n’y a aucune différence, ce sont deux termes synonymes',
    ],
    correct: 1,
    explanation:
      'Dans la trisomie 21 par translocation (ex. fusion 14/21), le caryotype compte 46 chromosomes mais le matériel génétique du 21 est en triple exemplaire. L’anomalie peut être transmise par un parent porteur d’une translocation équilibrée (45 chromosomes avec un chromosome fusionné 14;21), ce qui confère un risque de récidive élevé (jusqu’à 15%) pour les grossesses ultérieures.',
    difficulty: 'Difficile',
  },
];

export default function B5GenetiqueArbresQuizEmbedded() {
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
            Quiz d’Entraînement : Génétique Humaine &amp; Pedigrees
          </h3>
          <p className="text-xs sm:text-sm text-text/70 mt-0.5">
            Testez votre maîtrise des démonstrations de dominance, des exclusions chromosomiques et des probabilités.
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
