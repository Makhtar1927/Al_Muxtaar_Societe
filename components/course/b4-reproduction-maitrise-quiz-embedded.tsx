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
      'Par quel mécanisme endocrinien principal la pilule combinée (œstro-progestative) empêche-t-elle la survenue d’une grossesse ?',
    options: [
      'Elle détruit les spermatozoïdes dans le vagin par acidification enzymatique',
      'Elle exerce un rétrocontrôle négatif continu sur l’axe hypothalamo-hypophysaire, bloquant la maturation folliculaire et le pic de LH ovulatoire',
      'Elle stimule l’expulsion prématurée d’ovocytes immatures avant la méiose',
      'Elle inactive chimiquement les cellules de la corona radiata',
    ],
    correct: 1,
    explanation:
      'L’apport quotidien régulier d’œstrogènes et de progestatifs de synthèse maintient en permanence un rétrocontrôle négatif (RC-) sur l’hypothalamus et l’antéhypophyse. Les sécrétions de FSH et de LH restent très basses et sans fluctuation : il n’y a donc aucun développement de follicule mûr et le pic déclenchant de LH est totalement supprimé, empêchant l’ovulation.',
    concept: 'Pilule Combinée & Axe HH',
  },
  {
    id: 2,
    question:
      'En quoi le mode d’action d’une pilule microprogestative pure (mini-pilule) diffère-t-il fondamentalement de celui de la pilule combinée ?',
    options: [
      'Elle n’agit que par destruction mécanique des trompes de Fallope',
      'Elle agit principalement au niveau périphérique en rendant la glaire cervicale hermétique et l’endomètre atrophique, tandis que l’ovulation peut persister',
      'Elle bloque la spermatogenèse chez le partenaire masculin par voie salivaire',
      'Elle accélère le transit du zygote vers le vagin sans nidation',
    ],
    correct: 1,
    explanation:
      'La pilule microprogestative délivre une très faible dose de progestatif pur sans œstrogène. Son action est essentiellement périphérique : elle épaissit la glaire cervicale (bouchon muqueux imperméable au col utérin) et maintient l’endomètre au repos. L’axe hypothalamo-hypophysaire n’est pas systématiquement inhibé : de nombreuses femmes continuent d’ovuler normalement, mais la fécondation est bloquée dès le col.',
    concept: 'Pilule Microprogestative',
  },
  {
    id: 3,
    question:
      'Pourquoi la pilule d’urgence (Lévonorgestrel ou Acétate d’Ulipristal) n’est-elle PAS considérée comme une méthode abortive au Bac S2 ?',
    options: [
      'Parce qu’elle est fabriquée uniquement à base d’extraits de plantes',
      'Parce qu’elle bloque ou retarde le pic ovulatoire de LH avant la fécondation, mais reste sans effet si la nidation a déjà eu lieu',
      'Parce qu’elle ne s’administre que chez les femmes ménopausées',
      'Parce qu’elle dissout l’embryon sans laisser de trace hématologique',
    ],
    correct: 1,
    explanation:
      'La contraception d’urgence agit AVANT la fécondation et la nidation en décalant ou en supprimant le pic pré-ovulatoire de LH. Si un rapport a eu lieu plusieurs jours auparavant et que l’embryon s’est déjà implanté dans l’endomètre, la prise de lévonorgestrel n’interrompt aucunement la grossesse en cours. C’est une méthode contraceptive préventive d’exception et non une contragestion abortive.',
    concept: 'Contraception d’Urgence',
  },
  {
    id: 4,
    question:
      'Quel est le mode d’action moléculaire précis de la Mifépristone (RU 486) lors d’une interruption médicale de grossesse (contragestion) ?',
    options: [
      'C’est un agoniste qui multiplie par 10 la production de progestérone lutéale',
      'C’est un antagoniste compétitif qui se fixe sur les récepteurs de la progestérone, bloquant son action protectrice et entraînant le décollement de l’endomètre',
      'C’est une enzyme qui digère la membrane plasmique de l’ovocyte II',
      'C’est un antibiotique puissant détruisant les cellules du trophoblaste',
    ],
    correct: 1,
    explanation:
      'Le RU 486 possède une structure chimique proche de la progestérone : il se lie avec une forte affinité sur les récepteurs intracellulaires de la progestérone sans induire d’effet biologique (antagonisme compétitif). Privée de signal progestatif, la muqueuse utérine se nécrose et se détache, et le silence utérin est levé, ce qui permet l’expulsion de l’embryon sous l’effet de contractions myométriales.',
    concept: 'RU 486 & Contragestion',
  },
  {
    id: 5,
    question:
      'Quel est le mécanisme contraceptif d’un Dispositif Intra-Utérin (DIU) au cuivre chez la femme ?',
    options: [
      'Il supprime définitivement la sécrétion de GnRH par l’hypothalamus',
      'Il libère des ions cuivre cytotoxiques et spermicides et induit une inflammation aseptique locale de l’endomètre empêchant la nidation',
      'Il détruit les ovocytes dans les follicules ovariens par voie sanguine',
      'Il soude chirurgicalement les parois de la trompe de Fallope',
    ],
    correct: 1,
    explanation:
      'Le stérilet au cuivre agit localement par deux voies non hormonales : les ions Cu2+ libérés en continu sont toxiques pour les spermatozoïdes (altération de leur motilité et de leur viabilité) ; de plus, la présence du dispositif déclenche une réaction inflammatoire locale aseptique avec diapédèse leucocytaire qui modifie l’endomètre et s’oppose à toute nidation. L’axe HH et les cycles restent normaux.',
    concept: 'DIU au Cuivre',
  },
  {
    id: 6,
    question:
      'Dans le protocole médical d’une FIVETE classique, pourquoi injecte-t-on de la FSH à la femme lors de la première phase ?',
    options: [
      'Pour déclencher immédiatement l’accouchement par stimulation du myomètre',
      'Pour bloquer la sécrétion de progestérone et faire apparaître les règles',
      'Pour provoquer une hyperstimulation ovarienne contrôlée permettant le recrutement et la maturation synchrone de plusieurs follicules',
      'Pour détruire les spermatozoïdes résiduels présents dans les voies génitales',
    ],
    correct: 2,
    explanation:
      'En cycle naturel, la baisse physiologique de FSH sélectionne un seul follicule dominant. Lors d’une FIVETE, l’apport exogène quotidien de FSH maintient un taux supraliminaire qui sauve de l’atrésie plusieurs follicules cavitaires : cette hyperstimulation ovarienne contrôlée permet de prélever 5 à 15 ovocytes matures par ponction folliculaire sous échographie pour maximiser les chances de fécondation in vitro.',
    concept: 'Stimulation Ovarienne & FIVETE',
  },
  {
    id: 7,
    question:
      'Quelle est l’indication médicale princeps justifiant le recours à l’ICSI (micro-injection intra-cytoplasmique) plutôt qu’à une FIVETE classique ?',
    options: [
      'Une absence totale d’utérus chez la femme',
      'Une oligo-asthéno-tératospermie sévère de l’homme où les spermatozoïdes sont trop peu nombreux ou anormaux pour perforer spontanément la zone pellucide',
      'Une simple glaire cervicale acide facilement corrigée par alcalinisation',
      'Un désir de choisir le groupe sanguin de l’enfant',
    ],
    correct: 1,
    explanation:
      'En FIVETE classique, les spermatozoïdes doivent encore traverser spontanément la zone pellucide dans la boîte de culture. Si le sperme présente une anomalie sévère (très faible nombre, motilité quasi nulle ou défaut d’acrosome), la fécondation in vitro échoue. L’ICSI résout cette défaillance en injectant directement un spermatozoïde unique au cœur du cytoplasme de l’ovocyte II à l’aide d’une micro-pipette.',
    concept: 'Indication de l’ICSI',
  },
  {
    id: 8,
    question:
      'Quelle différence sépare une Insémination Artificielle (IA) d’une Fécondation In Vitro et Transfert d’Embryon (FIVETE) ?',
    options: [
      'Dans l’IA, la fécondation se déroule in vivo dans les trompes de la femme ; dans la FIVETE, la fécondation se déroule in vitro en laboratoire',
      'L’IA nécessite une anesthésie générale et une chirurgie lourde contrairement à la FIVETE',
      'L’IA n’utilise que du sperme congelé d’animaux',
      'La FIVETE ne permet jamais l’implantation de l’embryon dans l’utérus',
    ],
    correct: 0,
    explanation:
      'La distinction fondamentale repose sur le lieu de la fécondation : dans l’Insémination Artificielle (IAC ou IAD), le sperme préparé est simplement déposé dans la cavité utérine et les spermatozoïdes nagent jusqu’à l’ampoule tubaire pour féconder l’ovocyte in vivo. Dans la FIVETE, la fécondation a lieu hors du corps (in vitro) et ce sont des embryons déjà formés qui sont replacés dans l’utérus.',
    concept: 'IA vs FIVETE',
  },
];

export default function B4ReproductionMaitriseQuizEmbedded() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const calculateScore = () => {
    let score = 0;
    QUESTIONS.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct) {
        score++;
      }
    });
    return score;
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const score = calculateScore();
  const allAnswered = Object.keys(selectedAnswers).length === QUESTIONS.length;

  return (
    <div className="my-10 rounded-3xl bg-white border border-navy/10 p-5 sm:p-7 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/10 pb-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-800 mb-1 border border-blue-200">
            <HelpCircle className="w-3.5 h-3.5 text-blue-700" />
            <span>Évaluation Formative • Baccalauréat S2</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-navy">
            Quiz d’Entraînement : Contraception, Contragestion &amp; AMP
          </h3>
          <p className="text-xs sm:text-sm text-text/70 mt-0.5">
            8 questions ciblées sur les mécanismes de la pilule, la différence d’action du RU 486, le DIU et les indications de PMA.
          </p>
        </div>
        <div className="shrink-0 flex items-center gap-2 bg-surface px-4 py-2 rounded-2xl border border-navy/10">
          <BookOpen className="w-4 h-4 text-turquoise" />
          <span className="text-xs font-bold text-navy">
            {Object.keys(selectedAnswers).length} / {QUESTIONS.length} répondues
          </span>
        </div>
      </div>

      {/* Résultat si soumis */}
      {showResults && (
        <div
          className={`mb-8 rounded-2xl p-5 border text-center transition-all ${
            score >= 6
              ? 'bg-emerald-50/80 border-emerald-300 text-emerald-950'
              : score >= 4
              ? 'bg-amber-50/80 border-amber-300 text-amber-950'
              : 'bg-rose-50/80 border-rose-300 text-rose-950'
          }`}
        >
          <div className="inline-flex p-3 rounded-2xl bg-white/80 shadow-sm mb-2">
            <Award
              className={`w-8 h-8 ${
                score >= 6 ? 'text-emerald-600' : score >= 4 ? 'text-amber-600' : 'text-rose-600'
              }`}
            />
          </div>
          <h4 className="text-lg font-black">
            Score obtenu : {score} sur {QUESTIONS.length} ({Math.round((score / QUESTIONS.length) * 100)}%)
          </h4>
          <p className="text-xs sm:text-sm mt-1 max-w-xl mx-auto opacity-90 leading-relaxed">
            {score >= 7
              ? 'Excellente maîtrise de la maîtrise de la procréation et de l’AMP. Vos notions pharmacologiques et cliniques sont parfaitement au point pour l’épreuve de SVT.'
              : score >= 5
              ? 'Résultats satisfaisants. Examinez avec attention les corrections détaillées des questions manquées pour éliminer toute confusion de vocabulaire.'
              : 'Des confusions persistent entre contraception préventive, d’urgence, contragestion et techniques d’AMP. Révisez les 6 fiches réflexes ci-dessus avant de retester.'}
          </p>
        </div>
      )}

      {/* Liste des questions */}
      <div className="space-y-6">
        {QUESTIONS.map((q, idx) => {
          const userAnswer = selectedAnswers[q.id];
          const isAnswered = userAnswer !== undefined;
          const isCorrect = userAnswer === q.correct;

          return (
            <div
              key={q.id}
              className={`rounded-2xl border p-4 sm:p-5 transition-all ${
                showResults
                  ? isCorrect
                    ? 'border-emerald-300 bg-emerald-50/30'
                    : 'border-rose-300 bg-rose-50/30'
                  : 'border-navy/10 bg-white hover:border-navy/20'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="w-6 h-6 rounded-lg bg-navy/5 text-navy font-black text-xs flex items-center justify-center shrink-0 border border-navy/10">
                    {idx + 1}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-navy/5 text-navy/70 border border-navy/10">
                    {q.concept}
                  </span>
                </div>
                {showResults && (
                  <span className="shrink-0 flex items-center gap-1 text-xs font-black">
                    {isCorrect ? (
                      <span className="text-emerald-700 flex items-center gap-1">
                        <CheckCircle className="w-4 h-4 text-emerald-600" /> Correct (+1 pt)
                      </span>
                    ) : (
                      <span className="text-rose-700 flex items-center gap-1">
                        <XCircle className="w-4 h-4 text-rose-600" /> Incorrect (0 pt)
                      </span>
                    )}
                  </span>
                )}
              </div>

              <h4 className="font-bold text-navy text-sm sm:text-base leading-snug mb-3">
                {q.question}
              </h4>

              {/* Options de réponse */}
              <div className="space-y-2">
                {q.options.map((opt, oIdx) => {
                  const isSelected = userAnswer === oIdx;
                  const isOptionCorrect = oIdx === q.correct;

                  let optionStyle =
                    'border-navy/10 bg-white hover:border-navy/30 text-navy/90';

                  if (showResults) {
                    if (isOptionCorrect) {
                      optionStyle =
                        'border-emerald-500 bg-emerald-100/60 text-emerald-950 font-bold';
                    } else if (isSelected && !isOptionCorrect) {
                      optionStyle =
                        'border-rose-400 bg-rose-100/60 text-rose-950 line-through opacity-80';
                    } else {
                      optionStyle = 'border-navy/5 bg-gray-50 text-navy/40';
                    }
                  } else if (isSelected) {
                    optionStyle =
                      'border-turquoise bg-turquoise/10 text-navy font-bold shadow-sm';
                  }

                  return (
                    <button
                      key={oIdx}
                      type="button"
                      disabled={showResults}
                      onClick={() => handleSelectOption(q.id, oIdx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-start gap-3 ${optionStyle}`}
                    >
                      <span className="w-5 h-5 rounded-md bg-navy/5 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span className="flex-1 leading-relaxed">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Explication après validation */}
              {showResults && (
                <div className="mt-4 p-3.5 rounded-xl bg-white border border-navy/10 text-xs sm:text-sm text-text/80 leading-relaxed">
                  <span className="font-bold text-navy block mb-1">
                    Justification méthodologique :
                  </span>
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Barre d'action inférieure */}
      <div className="mt-8 pt-5 border-t border-navy/10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-text/60">
          {!showResults
            ? 'Cochez une option pour chaque question avant de valider votre copie.'
            : 'Consultez les explications méthodologiques pour chaque question.'}
        </p>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {!showResults ? (
            <button
              type="button"
              disabled={!allAnswered}
              onClick={() => setShowResults(true)}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-navy text-white text-xs sm:text-sm font-bold shadow-sm hover:bg-navy/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span>Valider mes réponses</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-navy/20 bg-white text-navy text-xs sm:text-sm font-bold shadow-sm hover:bg-surface transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4 text-navy/70" />
              <span>Recommencer le test</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

