'use client';

import React, { useState } from 'react';
import {
  HelpCircle,
  CheckCircle,
  XCircle,
  RotateCcw,
  Award,
  ChevronRight,
  BookOpen,
} from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  concept: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    question:
      'Quelle est la condition physiologique indispensable pour déclencher la décharge pré-ovulatoire de LH (rétrocontrôle positif) vers le 13e jour du cycle ?',
    options: [
      'Une chute brutale de la progestérone sous 1 ng/mL',
      'Un taux plasmatique d’œstrogènes dépassant un seuil critique (~200 à 300 pg/mL) maintenu pendant au moins 36 heures',
      'Une sécrétion continue et non pulsatile de GnRH par l’hypothalamus',
      'L’expulsion préalable du premier globule polaire dans la cavité abdominale',
    ],
    correct: 1,
    explanation:
      'Le rétrocontrôle positif (RC+) exige que le follicule mûr de De Graaf produise une quantité massive d’œstrogènes dépassant le seuil critique (environ 200 pg/mL) pendant une durée minimale de 36 heures. Cet hyper-œstrogénisme inverse le rétrocontrôle et déclenche la libération massive de GnRH, d’où le pic de LH provoquant l’ovulation.',
    concept: 'Rétrocontrôle Positif',
  },
  {
    id: 2,
    question:
      'Chez une guenon adulte ou une femme, quelle est la conséquence immédiate d’une ovariectomie bilatérale sur les sécrétions hypophysaires de FSH et de LH ?',
    options: [
      'Une chute progressive de FSH et de LH jusqu’à leur disparition totale',
      'Un blocage complet de la sécrétion de GnRH hypothalamique',
      'Une élévation spectaculaire et permanente des taux plasmatiques de FSH et de LH',
      'Aucune modification car l’hypophyse fonctionne de manière autonome',
    ],
    correct: 2,
    explanation:
      'En temps normal, les ovaires exercent un rétrocontrôle négatif continu sur l’axe hypothalamo-hypophysaire via les œstrogènes et la progestérone. L’ablation des ovaires supprime ces stéroïdes : la levée du rétrocontrôle négatif entraîne une libération massive et permanente de GnRH, et par conséquent de FSH et de LH.',
    concept: 'Ablation & Rétrocontrôle Négatif',
  },
  {
    id: 3,
    question:
      'Quelle est l’action biologique spécifique de la progestérone sur l’utérus au cours de la phase lutéinique ?',
    options: [
      'Elle déclenche la multiplication mitotique des cellules de l’endomètre',
      'Elle transforme l’endomètre en dentelle utérine (glandes spiralées sécrétant du glycogène) et inhibe les contractions du myomètre (silence utérin)',
      'Elle provoque la rupture des artérioles spiralées pour déclencher les règles',
      'Elle détruit la couche fonctionnelle de l’endomètre',
    ],
    correct: 1,
    explanation:
      'La prolifération de l’endomètre est assurée par les œstrogènes en phase folliculaire. La progestérone, sécrétée par le corps jaune en phase lutéale, assure la différenciation sécrétoire : spiralisation des glandes (dentelle utérine) riches en mucus nutritif et en glycogène, spiralisation des vaisseaux, et inhibition des contractions musculaires du myomètre (silence utérin indispensable à une nidation).',
    concept: 'Rôle de la Progestérone',
  },
  {
    id: 4,
    question:
      'Le déclenchement de la menstruation (les règles) à la fin d’un cycle non fécondé (J28) est directement provoqué par :',
    options: [
      'Une hypersécrétion brutale de progestérone par le corps jaune',
      'Le pic de LH hypophysaire',
      'La chute brutale des taux plasmatiques d’œstrogènes et de progestérone consécutive à la dégénérescence du corps jaune',
      'Une contraction violente de l’adénohypophyse',
    ],
    correct: 2,
    explanation:
      'En l’absence de fécondation, le corps jaune régresse en corps albicans à partir du 26e jour. Cette involution entraîne l’effondrement brutal des œstrogènes et de la progestérone. Privée de son soutien trophique hormonal, la zone fonctionnelle de l’endomètre subit une ischémie (vasoconstriction artériolaire) et se nécrose : c’est la desquamation menstruelle.',
    concept: 'Mécanisme des Règles',
  },
  {
    id: 5,
    question:
      'Sur une courbe thermique matinale féminine de 28 jours, à quel moment exact se produit l’ovulation ?',
    options: [
      'Au milieu du plateau hyperthermique à 37,2 °C (vers J20)',
      'La veille du décalage thermique, au point le plus bas (creux ou nadir) vers J13-J14',
      'Pendant les jours de menstruation (J1 à J5)',
      'Le premier jour du cycle à 36,6 °C',
    ],
    correct: 1,
    explanation:
      'L’ovulation se produit juste avant le décalage thermique, au point le plus bas de la courbe appelé nadir (J13-J14). Dès le lendemain, la progestérone sécrétée par le jeune corps jaune stimule les centres thermorégulateurs hypothalamiques, entraînant une hausse de +0,3 à +0,5 °C qui se maintient en plateau tout au long de la phase lutéale.',
    concept: 'Courbe Thermique',
  },
  {
    id: 6,
    question:
      'Au 14e jour du cycle (période ovulatoire), quel est l’aspect et le rôle de la glaire cervicale ?',
    options: [
      'Opaque, très dense, acide, à maillage serré pour bloquer les bactéries et spermatozoïdes',
      'Complètement absente du col de l’utérus',
      'Claire, très abondante, filante, alcaline et à maillage lâche pour guider et faciliter le passage des spermatozoïdes',
      'Riche en cellules sanguines et coagulée',
    ],
    correct: 2,
    explanation:
      'Sous l’influence du pic pré-ovulatoire d’œstrogènes, la glaire cervicale sécrétée par les glandes du col de l’utérus devient très abondante, fluide, filante et alcaline (pH > 7,2). Son réseau de filaments glycoprotéiques s’élargit (maillage lâche), orientant les spermatozoïdes vers la cavité utérine tout en les protégeant de l’acidité vaginale.',
    concept: 'Glaire Cervicale',
  },
  {
    id: 7,
    question:
      'Quel est le mode d’action contraceptif principal de la pilule combinée classique (œstro-progestative) prise quotidiennement ?',
    options: [
      'Elle détruit chimiquement les spermatozoïdes dans le vagin (action spermicide)',
      'Elle maintient un rétrocontrôle négatif permanent sur l’axe hypothalamo-hypophysaire, bloquant les sécrétions de FSH et de LH et empêchant l’ovulation',
      'Elle déclenche prématurément le pic de LH au 3e jour du cycle',
      'Elle provoque l’ablation chimique des trompes de Fallope',
    ],
    correct: 1,
    explanation:
      'La pilule combinée apporte des dérivés de synthèse d’œstrogènes et de progestérone. Présents à dose constante dans le sang, ils exercent un rétrocontrôle négatif permanent sur le complexe hypothalamo-hypophysaire : la FSH et la LH restent à des taux basaux très bas, aucun follicule ne parvient à maturité et le pic ovulatoire de LH est supprimé. Pas de pic de LH = pas d’ovulation.',
    concept: 'Contraception Hormonale',
  },
  {
    id: 8,
    question:
      'Chez les mammifères, comment la GnRH hypothalamique doit-elle être délivrée pour stimuler efficacement l’hypophyse ?',
    options: [
      'De manière continue à forte dose sans interruption',
      'Par voie digestive dans l’alimentation',
      'De manière rigoureusement pulsatile (environ un pulse toutes les 60 à 90 minutes)',
      'Uniquement pendant la nuit en continu',
    ],
    correct: 2,
    explanation:
      'Les neurones hypothalamiques libèrent la GnRH dans le système porte hypothalamo-hypophysaire par bouffées périodiques ou pulses (toutes les 90 min environ). Une perfusion continue de GnRH provoque la désensibilisation et l’internalisation des récepteurs hypophysaires, ce qui stoppe net la sécrétion de FSH et de LH ! Seule la pulsatilité maintient la sensibilité des cellules à gonadostimulines.',
    concept: 'Pulsatilité de la GnRH',
  },
];

export default function B4CyclesSexuelsQuizEmbedded() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const letters = ['A', 'B', 'C', 'D'];

  function handleSelect(questionId: number, optionIdx: number) {
    if (showResults) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  }

  function calculateScore() {
    let score = 0;
    QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct) {
        score++;
      }
    });
    return score;
  }

  function handleReset() {
    setSelectedAnswers({});
    setShowResults(false);
  }

  const score = calculateScore();
  const allAnswered = Object.keys(selectedAnswers).length === QUESTIONS.length;

  return (
    <div className="bg-white rounded-2xl border border-navy/15 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy via-slate-900 to-rose-950 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-teal-300" />
          </div>
          <div>
            <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">
              Auto-évaluation Bac S2
            </span>
            <h3 className="text-lg sm:text-xl font-bold">
              Quiz d’Entraînement : Cycles Sexuels & Régulation Neurohormonale (8 Questions Types)
            </h3>
          </div>
        </div>
        <p className="text-sm text-slate-300 max-w-2xl mt-1">
          Vérifiez votre maîtrise des rétrocontrôles, du pic de LH, de la dentelle utérine, de la courbe de température et du mode d’action de la pilule.
        </p>
      </div>

      {/* Questions */}
      <div className="p-5 sm:p-6 space-y-6">
        {QUESTIONS.map((q, idx) => {
          const userAnswer = selectedAnswers[q.id];
          const isCorrect = userAnswer === q.correct;

          return (
            <div
              key={q.id}
              className={`p-4 sm:p-5 rounded-xl border transition-all ${
                showResults
                  ? isCorrect
                    ? 'bg-emerald-50/70 border-emerald-300'
                    : 'bg-rose-50/70 border-rose-300'
                  : 'bg-surface/50 border-navy/10 hover:border-navy/20'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-md bg-navy text-white text-xs font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                    {q.concept}
                  </span>
                </div>
                {showResults && (
                  <div>
                    {isCorrect ? (
                      <span className="flex items-center gap-1 text-xs font-bold text-emerald-700">
                        <CheckCircle className="w-4 h-4 text-emerald-600" /> Correct (+1)
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs font-bold text-rose-700">
                        <XCircle className="w-4 h-4 text-rose-600" /> Incorrect
                      </span>
                    )}
                  </div>
                )}
              </div>

              <h4 className="font-bold text-navy text-sm sm:text-base mb-3 leading-snug">
                {q.question}
              </h4>

              {/* Options */}
              <div className="space-y-2">
                {q.options.map((opt, oIdx) => {
                  const isSelected = userAnswer === oIdx;
                  let optStyle =
                    'border-navy/10 bg-white text-navy hover:bg-slate-50 hover:border-navy/20';

                  if (showResults) {
                    if (oIdx === q.correct) {
                      optStyle = 'border-emerald-500 bg-emerald-100 text-emerald-950 font-bold';
                    } else if (isSelected) {
                      optStyle = 'border-rose-400 bg-rose-100 text-rose-950 line-through';
                    } else {
                      optStyle = 'border-navy/5 bg-white/60 text-navy/40';
                    }
                  } else if (isSelected) {
                    optStyle = 'border-teal-500 bg-teal-50 text-teal-900 font-bold shadow-xs';
                  }

                  return (
                    <button
                      key={oIdx}
                      type="button"
                      onClick={() => handleSelect(q.id, oIdx)}
                      disabled={showResults}
                      className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm flex items-center gap-3 transition-all ${optStyle}`}
                    >
                      <span
                        className={`w-6 h-6 rounded-lg text-xs font-bold flex items-center justify-center shrink-0 border ${
                          isSelected
                            ? 'bg-teal-600 text-white border-teal-600'
                            : 'bg-navy/5 text-navy border-navy/10'
                        }`}
                      >
                        {letters[oIdx]}
                      </span>
                      <span className="flex-1">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explication après validation */}
              {showResults && (
                <div className="mt-3 bg-white p-3.5 rounded-xl border border-navy/10 text-xs sm:text-sm text-text/80 space-y-1">
                  <p className="font-bold text-navy flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-teal-600" />
                    Explication de la réponse :
                  </p>
                  <p className="leading-relaxed">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}

        {/* Footer Score & Boutons */}
        <div className="border-t border-navy/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          {showResults ? (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700">
                <Award className="w-7 h-7" />
              </div>
              <div>
                <p className="text-xs text-text/60 font-medium">Votre score final :</p>
                <p className="text-xl font-black text-navy">
                  {score} / {QUESTIONS.length}{' '}
                  <span className="text-sm font-semibold text-text/70">
                    ({Math.round((score / QUESTIONS.length) * 100)}%)
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-text/60 italic">
              {Object.keys(selectedAnswers).length} sur {QUESTIONS.length} questions répondues.
            </p>
          )}

          <div className="flex items-center gap-3 w-full sm:w-auto">
            {showResults ? (
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-navy/20 bg-white hover:bg-slate-50 text-navy font-bold text-xs transition"
              >
                <RotateCcw className="w-4 h-4" /> Recommencer le test
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setShowResults(true)}
                disabled={!allAnswered}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 disabled:bg-teal-300 text-white font-bold text-xs transition shadow-sm"
              >
                Valider mes réponses <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

