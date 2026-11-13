'use client';

import React, { useState } from 'react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  difficulty: 'facile' | 'moyen' | 'difficile';
  theme: string;
}

const questions: Question[] = [
  {
    id: 1,
    question:
      "Où se produit normalement la fécondation chez la femme ?",
    options: [
      "Dans l'utérus, au niveau de la dentelle utérine",
      "Dans le tiers externe de la trompe de Fallope (ampoule tubaire)",
      "Dans l'ovaire, juste après l'ovulation",
      "Dans le col de l'utérus",
    ],
    correct: 1,
    explanation:
      "La fécondation se produit dans le tiers EXTERNE de la trompe de Fallope, appelé l'ampoule tubaire. C'est là que l'ovocyte II, libéré lors de l'ovulation, rencontre les spermatozoïdes. La fécondation dans l'utérus est impossible car le zygote doit encore se segmenter pendant le trajet tubaire (3-4 jours) avant d'atteindre l'utérus sous forme de morula/blastocyste.",
    difficulty: 'facile',
    theme: 'Fécondation',
  },
  {
    id: 2,
    question:
      "Qu'est-ce que la réaction acrosomique et quel est son rôle lors de la fécondation ?",
    options: [
      "Libération de granules corticaux par l'ovocyte pour bloquer la polyspermie",
      "Fusion des pronuclei mâle et femelle pour reconstituer la diploïdie",
      "Libération d'enzymes (acrosine) par la tête du spermatozoïde pour traverser la zone pellucide",
      "Achèvement de la méiose II de l'ovocyte déclenché par la pénétration du spermatozoïde",
    ],
    correct: 2,
    explanation:
      "La RÉACTION ACROSOMIQUE se produit quand le spermatozoïde entre en contact avec la zone pellucide (ZP3). L'acrosome (vésicule en chapeau sur la tête du spermatozoïde) libère ses enzymes : hyaluronidase (traverse la corona radiata) et acrosine (perfore la zone pellucide). C'est un mécanisme enzymatique et non mécanique. Ne pas confondre avec la réaction CORTICALE (libération de granules par l'ovocyte pour bloquer la polyspermie).",
    difficulty: 'moyen',
    theme: 'Fécondation',
  },
  {
    id: 3,
    question:
      "Un blastocyste de 5 jours est composé de quelles structures ?",
    options: [
      "Cellules indifférenciées disposées en sphère pleine (morula)",
      "Trophoblaste externe + bouton embryonnaire interne + cavité blastocœlique",
      "Épiblaste + hypoblaste + cavité amniotique",
      "Ectoderme + mésoderme + endoderme (3 feuillets embryonnaires)",
    ],
    correct: 1,
    explanation:
      "Le BLASTOCYSTE (J4-J5) est constitué de : (1) TROPHOBLASTE = couche cellulaire externe qui donnera le placenta et sécrètera la HCG ; (2) BOUTON EMBRYONNAIRE (ou masse cellulaire interne) = amas de cellules souches pluripotentes qui donneront l'embryon proprement dit ; (3) CAVITÉ BLASTOCŒLIQUE = cavité liquidienne. La morula (sphère pleine) précède le blastocyste. Les 3 feuillets (ectoderme, mésoderme, endoderme) se mettent en place lors de la GASTRULATION, bien plus tard.",
    difficulty: 'moyen',
    theme: 'Développement embryonnaire',
  },
  {
    id: 4,
    question:
      "Pourquoi la HCG est-elle indispensable au maintien de la grossesse dans les 3 premiers mois ?",
    options: [
      "Elle stimule directement la croissance de l'embryon en activant ses cellules souches",
      "Elle empêche le rejet immunitaire de l'embryon par le système immunitaire maternel",
      "Elle maintient le corps jaune actif, qui continue à sécréter progestérone et œstrogènes",
      "Elle déclenche la nidation en fluidifiant la dentelle utérine",
    ],
    correct: 2,
    explanation:
      "La HCG (sécrétée par le trophoblaste dès J7-J9) a une structure très proche de la LH : elle se fixe sur les MÊMES récepteurs LH du corps jaune. Normalement, en l'absence de grossesse, le corps jaune involue vers J25-J28 (chute hormonale → règles). La HCG 'rescue' (sauve) le corps jaune : il devient corps jaune GRAVIDIQUE et continue à sécréter progestérone + œstrogènes pendant 3 mois, maintenant ainsi la dentelle utérine et supprimant les règles. Sans HCG → corps jaune meurt → chute progestérone → règles → fausse couche précoce.",
    difficulty: 'difficile',
    theme: 'Hormones de grossesse',
  },
  {
    id: 5,
    question:
      "À partir du 3ème mois de grossesse, quelle structure prend le relais hormonal du corps jaune ?",
    options: [
      "L'hypothalamus maternel qui augmente sa sécrétion de GnRH",
      "Le placenta, qui sécrète progestérone, œstrogènes et HPL",
      "L'hypophyse fœtale, qui sécrète FSH et LH pour l'embryon",
      "Le corps jaune qui devient définitif et ne disparaît qu'après l'accouchement",
    ],
    correct: 1,
    explanation:
      "À partir du 3ème mois, le PLACENTA devient autonome hormonalement (relais endocrinien) : il sécrète (1) PROGESTÉRONE placentaire en grande quantité → maintien endomètre, silence myomètre ; (2) ŒSTROGÈNES placentaires → croissance utérine, préparation glandes mammaires ; (3) HPL (Human Placental Lactogen) → effet métabolique, préparation à la lactation. Le corps jaune involue alors en corps albicans. Sur un graphe, on observe le croisement : HCG décline après 10 semaines tandis que la progestérone placentaire prend le relais.",
    difficulty: 'moyen',
    theme: 'Placenta & hormones',
  },
  {
    id: 6,
    question:
      "Le déclenchement de l'accouchement implique un mécanisme de rétrocontrôle. De quel type s'agit-il et pourquoi ?",
    options: [
      "Rétrocontrôle négatif : les contractions utérines inhibent la sécrétion d'ocytocine",
      "Rétrocontrôle positif : les contractions amplifient la distension du col qui stimule plus d'ocytocine",
      "Rétrocontrôle négatif : la progestérone inhibe les contractions pour protéger le fœtus",
      "Rétrocontrôle positif : l'ocytocine inhibe la prolactine pour déclencher l'accouchement",
    ],
    correct: 1,
    explanation:
      "Le déclenchement de l'accouchement (réflexe de FERGUSON) est un RÉTROCONTRÔLE POSITIF, rare dans le programme SVT ! Le mécanisme : distension du col par la tête du fœtus → signal nerveux → hypothalamus → hypophyse → ocytocine ↑ → contractions myomètre ↑ → plus de distension du col → encore plus d'ocytocine → etc. Cette boucle s'AUTO-ENTRETIENT et s'AMPLIFIE jusqu'à l'expulsion du bébé, à l'opposé d'un rétrocontrôle négatif qui freinerait le phénomène.",
    difficulty: 'difficile',
    theme: 'Accouchement',
  },
  {
    id: 7,
    question:
      "Quelle est la différence de rôle entre la PROLACTINE et l'OCYTOCINE lors de la lactation ?",
    options: [
      "Prolactine = éjection du lait / Ocytocine = synthèse du lait",
      "Prolactine = synthèse du lait dans les acini / Ocytocine = éjection du lait par contraction myoépithéliale",
      "Prolactine et Ocytocine ont le même rôle : toutes deux stimulent la synthèse du lait",
      "Prolactine = stimule la glande mammaire pendant la grossesse / Ocytocine = inhibe la lactation",
    ],
    correct: 1,
    explanation:
      "DISTINCTION FONDAMENTALE à ne jamais confondre au Bac : PROLACTINE (sécrétée par l'antéhypophyse) = stimule la SYNTHÈSE et la SÉCRÉTION du lait dans les acini mammaires (cellules sécrétrices). La prolactine est bloquée par les œstrogènes élevés pendant la grossesse. OCYTOCINE (sécrétée par la neurohypophyse) = déclenche l'ÉJECTION du lait en provoquant la contraction des cellules MYOÉPITHÉLIALES entourant les acini → le lait est expulsé dans les canaux galactophores. Réflexe mnémotechnique : Prolactine = PROduit LACtation ; Ocytocine = Éjecte (car elle contracte).",
    difficulty: 'facile',
    theme: 'Lactation',
  },
  {
    id: 8,
    question:
      "Pourquoi une femme qui allaite intensivement est-elle souvent temporairement infertile ?",
    options: [
      "L'ocytocine libérée par la succion bloque directement la maturation folliculaire ovarienne",
      "La progestérone produite par le placenta persistant inhibe l'axe hypothalamo-hypophysaire",
      "La prolactine élevée exerce un rétrocontrôle négatif sur l'hypothalamus → GnRH ↓ → FSH/LH ↓ → pas d'ovulation",
      "Les œstrogènes élevés de la lactation bloquent le développement folliculaire ovarien",
    ],
    correct: 2,
    explanation:
      "L'AMÉNORRHÉE DE LACTATION est causée par la PROLACTINE ↑ qui exerce un puissant rétrocontrôle négatif sur l'hypothalamus : GnRH ↓ → FSH ↓ + LH ↓ → pas de recrutement folliculaire → pas de maturation folliculaire → pas d'ovulation → infertilité temporaire. C'est d'ailleurs le principe de la contraception naturelle par l'allaitement. ATTENTION : ce mécanisme n'est fiable que si l'allaitement est EXCLUSIF et très fréquent (toutes les 4-6h). Dès que l'allaitement diminue, la prolactine baisse et l'ovulation peut reprendre.",
    difficulty: 'difficile',
    theme: 'Lactation & fertilité',
  },
];

const difficultyConfig = {
  facile: { label: 'Facile', color: 'bg-green-100 text-green-700', border: 'border-green-200' },
  moyen: { label: 'Moyen', color: 'bg-amber-100 text-amber-700', border: 'border-amber-200' },
  difficile: { label: 'Difficile', color: 'bg-red-100 text-red-700', border: 'border-red-200' },
};

export default function B4FecondationQuizEmbedded() {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showExplanation, setShowExplanation] = useState<Record<number, boolean>>({});

  const handleAnswer = (questionId: number, optionIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) {
      alert('Répondez à toutes les questions avant de valider !');
      return;
    }
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
    setShowExplanation({});
  };

  const score = submitted
    ? questions.filter((q) => answers[q.id] === q.correct).length
    : 0;

  const scorePercent = submitted ? Math.round((score / questions.length) * 100) : 0;

  const scoreColor =
    scorePercent >= 80
      ? 'text-green-600'
      : scorePercent >= 60
      ? 'text-amber-600'
      : 'text-red-600';

  return (
    <div className="my-8 rounded-2xl border border-pink-100 bg-gradient-to-br from-pink-50 to-rose-50 p-6 shadow-lg">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 text-2xl shadow-md">
          🧬
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Quiz Bac S2 — Fécondation, Gestation & Lactation
          </h2>
          <p className="text-sm text-gray-500">
            8 questions type Baccalauréat · SVT B4 Leçon 3 · Corrections détaillées
          </p>
        </div>
      </div>

      {/* Score si soumis */}
      {submitted && (
        <div className="mb-6 rounded-xl border-2 border-pink-200 bg-white p-5 text-center shadow">
          <p className="text-lg font-bold text-gray-700">Votre score</p>
          <p className={`text-5xl font-black ${scoreColor}`}>
            {score}/{questions.length}
          </p>
          <p className={`text-xl font-semibold ${scoreColor}`}>{scorePercent}%</p>
          <p className="mt-2 text-sm text-gray-500">
            {scorePercent >= 80
              ? '🏆 Excellent ! Vous maîtrisez la Fécondation & Lactation !'
              : scorePercent >= 60
              ? '📚 Bien ! Révisez les points manqués avec les corrections.'
              : '💪 Continuez à réviser — relisez les 6 Réflexes Clés !'}
          </p>
        </div>
      )}

      {/* Questions */}
      <div className="space-y-6">
        {questions.map((q, qIdx) => {
          const userAnswer = answers[q.id];
          const isCorrect = submitted && userAnswer === q.correct;
          const isWrong = submitted && userAnswer !== undefined && userAnswer !== q.correct;
          const diff = difficultyConfig[q.difficulty];

          return (
            <div
              key={q.id}
              className={`rounded-xl border-2 bg-white p-5 shadow-sm ${
                isCorrect
                  ? 'border-green-300'
                  : isWrong
                  ? 'border-red-300'
                  : 'border-pink-100'
              }`}
            >
              {/* En-tête question */}
              <div className="mb-3 flex items-start gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-pink-500 to-rose-600 text-sm font-bold text-white">
                  {qIdx + 1}
                </span>
                <div className="flex-1">
                  <div className="mb-1 flex flex-wrap gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${diff.color} border ${diff.border}`}>
                      {diff.label}
                    </span>
                    <span className="rounded-full bg-pink-100 px-2 py-0.5 text-xs font-semibold text-pink-700">
                      {q.theme}
                    </span>
                  </div>
                  <p className="font-semibold text-gray-800">{q.question}</p>
                </div>
              </div>

              {/* Options */}
              <div className="space-y-2">
                {q.options.map((option, oIdx) => {
                  const isSelected = userAnswer === oIdx;
                  const isCorrectOption = oIdx === q.correct;

                  let optionClass =
                    'w-full rounded-lg border-2 px-4 py-3 text-left text-sm transition-all ';

                  if (!submitted) {
                    optionClass += isSelected
                      ? 'border-pink-400 bg-pink-50 text-pink-800 font-semibold'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-pink-300 hover:bg-pink-50';
                  } else {
                    if (isCorrectOption) {
                      optionClass += 'border-green-400 bg-green-50 text-green-800 font-semibold';
                    } else if (isSelected && !isCorrectOption) {
                      optionClass += 'border-red-400 bg-red-50 text-red-800 font-semibold line-through';
                    } else {
                      optionClass += 'border-gray-100 bg-gray-50 text-gray-500';
                    }
                  }

                  return (
                    <button
                      key={oIdx}
                      onClick={() => handleAnswer(q.id, oIdx)}
                      className={optionClass}
                    >
                      <span className="mr-2 font-bold">
                        {['A', 'B', 'C', 'D'][oIdx]}.
                      </span>
                      {option}
                      {submitted && isCorrectOption && (
                        <span className="ml-2 text-green-600">✓</span>
                      )}
                      {submitted && isSelected && !isCorrectOption && (
                        <span className="ml-2 text-red-600">✗</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explication */}
              {submitted && (
                <div className="mt-3">
                  <button
                    onClick={() =>
                      setShowExplanation((prev) => ({ ...prev, [q.id]: !prev[q.id] }))
                    }
                    className="text-xs font-semibold text-pink-600 underline hover:text-pink-800"
                  >
                    {showExplanation[q.id] ? '▲ Masquer la correction' : '▼ Voir la correction détaillée'}
                  </button>
                  {showExplanation[q.id] && (
                    <div className="mt-2 rounded-lg border border-pink-200 bg-pink-50 p-3">
                      <p className="text-xs leading-relaxed text-gray-700">
                        💡 <strong>Correction :</strong> {q.explanation}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Boutons */}
      <div className="mt-6 flex gap-3 flex-wrap">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={Object.keys(answers).length < questions.length}
            className="flex-1 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 px-6 py-3 font-bold text-white shadow-md transition hover:opacity-90 disabled:opacity-40"
          >
            Valider mes réponses ({Object.keys(answers).length}/{questions.length})
          </button>
        ) : (
          <button
            onClick={handleReset}
            className="flex-1 rounded-xl border-2 border-pink-400 bg-white px-6 py-3 font-bold text-pink-600 shadow-sm transition hover:bg-pink-50"
          >
            🔄 Recommencer le quiz
          </button>
        )}
      </div>
    </div>
  );
}

