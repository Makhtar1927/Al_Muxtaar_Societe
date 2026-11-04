"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Star, Trophy, RotateCcw, FlaskConical } from "lucide-react";

const LETTERS = ["A", "B", "C", "D"] as const;

interface Question {
  id: number;
  difficulty: 1 | 2 | 3;
  text: string;
  options: string[];
  correct: number;
  explanation: string;
  wolof?: string;
  trap?: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    difficulty: 1,
    text: "Quelle est la formule générale d'un acide carboxylique ?",
    options: [
      "R–CO–R'",
      "R–COOH",
      "R–COO–R'",
      "R–CO–NH₂",
    ],
    correct: 1,
    explanation: "Un acide carboxylique porte le groupe fonctionnel –COOH (carboxyle). R–CO–R' est une cétone, R–COO–R' un ester, R–CO–NH₂ un amide.",
    wolof: "Dëkkël bi am –COOH mooy acide carboxylique. Nanguwaaral boo gis –COOH di ajoute 'ique' ci tuur bi.",
  },
  {
    id: 2,
    difficulty: 1,
    text: "L'estérification directe entre un acide carboxylique et un alcool primaire donne un rendement limite de :",
    options: ["100 %", "85 %", "67 %", "5 %"],
    correct: 2,
    explanation: "Pour un alcool primaire (1°) en proportion équimolaire, la constante K = 4 conduit à un taux d'avancement limite de 67 % (taux de transformation τ = 2/3).",
    wolof: "Alcool 1° ak acide équimolaires → 67 %. Yokku K = 4, donc τ = 2/(2+1) = 2/3.",
    trap: "Piège Bac : Le chauffage n'augmente PAS le rendement limite (réaction athermique). Il accélère seulement la cinétique !",
  },
  {
    id: 3,
    difficulty: 2,
    text: "L'estérification est dite « athermique » car :",
    options: [
      "Elle ne produit pas d'ester",
      "La température n'accélère pas la réaction",
      "La variation d'enthalpie ΔH ≈ 0, donc T ne déplace pas l'équilibre",
      "Elle est toujours totale",
    ],
    correct: 2,
    explanation: "ΔH ≈ 0 signifie que l'enthalpie de réaction est quasi nulle. D'après la loi de Le Chatelier, si ΔH = 0, une variation de température ne modifie pas la position d'équilibre. Le chauffage agit uniquement sur la cinétique.",
    wolof: "Athermique = ΔH ≈ 0. Temperature mënuul defar rendement yokku. Kinétique rekk lay yokku.",
    trap: "Piège classique : Dire que chauffer augmente le rendement → FAUX pour estérification !",
  },
  {
    id: 4,
    difficulty: 2,
    text: "Pour déplacer l'équilibre d'estérification vers la formation de plus d'ester, on peut :",
    options: [
      "Augmenter la température",
      "Éliminer l'eau formée (Dean-Stark) ou utiliser un excès d'alcool",
      "Diminuer la quantité d'acide",
      "Ajouter de l'eau",
    ],
    correct: 1,
    explanation: "D'après Le Chatelier : éliminer un produit (l'eau via Dean-Stark) ou augmenter un réactif (excès alcool ou acide) déplace l'équilibre vers la droite. Avec Dean-Stark, τ peut atteindre 98 %.",
    wolof: "Le Chatelier : amul l'eau → équilibre yagg ci biir ester. Excès alcool → même résultat. Dean-Stark = piège à eau SVG bi.",
  },
  {
    id: 5,
    difficulty: 2,
    text: "Un chlorure d'acyle (R–CO–Cl) réagit avec un alcool. Le taux de transformation est de :",
    options: ["67 %", "60 %", "100 % — réaction totale", "50 %"],
    correct: 2,
    explanation: "Les dérivés réactifs d'acides (chlorures d'acyle, anhydrides) réagissent de façon totale (τ = 100 %) et très rapide à température ambiante. Ils produisent du HCl gazeux (fumées blanches caractéristiques).",
    wolof: "Chlorure d'acyle = dérivé réactif. Réaction totale 100 %. Fumi HCl bi moy signe bi.",
    trap: "Piège Bac : Ne pas confondre estérification directe (67 %) et acylation par chlorure d'acyle (100 %).",
  },
  {
    id: 6,
    difficulty: 3,
    text: "La saponification d'un triester (corps gras) par la soude NaOH est :",
    options: [
      "Lente, réversible, rendement 67 %",
      "Rapide, totale, irréversible — donne glycérol + 3 savons",
      "Équilibrée, rendement 50 %",
      "Ne donne pas de glycérol",
    ],
    correct: 1,
    explanation: "La saponification est totale et irréversible (K >> 1). 1 mol de triglycéride + 3 mol NaOH → 1 mol glycérol + 3 mol R–COO⁻Na⁺ (savon). Contrairement à l'estérification, elle n'est pas un équilibre.",
    wolof: "Saponification = totale, irréversible. 1 corps gras + 3 NaOH → glycérol + 3 savons. Equilbire amul.",
    trap: "Piège : Ne pas écrire ⇌ (réversible) pour la saponification. Écrire → (totale).",
  },
  {
    id: 7,
    difficulty: 2,
    text: "Le relargage (salting-out) lors de la fabrication du savon consiste à :",
    options: [
      "Chauffer le savon pour le durcir",
      "Ajouter de l'eau pure pour dissoudre le savon",
      "Ajouter du NaCl saturé pour précipiter le savon du milieu aqueux",
      "Neutraliser la soude avec un acide",
    ],
    correct: 2,
    explanation: "Le relargage exploite l'effet d'ion commun : NaCl apporte des ions Na⁺ qui réduisent la solubilité de R–COO⁻Na⁺ en milieu aqueux. Le savon précipite sous forme solide et flotte (pain de savon).",
    wolof: "NaCl saturé → savon précipite. Ion Na⁺ commun defar savon dëkk ci kaw. Relargage = salting-out en Anglais.",
  },
  {
    id: 8,
    difficulty: 3,
    text: "Un savon (R–COO⁻Na⁺) est un tensioactif car sa molécule est :",
    options: [
      "Totalement hydrophile",
      "Totalement hydrophobe",
      "Amphiphile : tête polaire –COO⁻Na⁺ + queue lipophile R–",
      "Ionique uniquement dans l'eau chaude",
    ],
    correct: 2,
    explanation: "La structure amphiphile est clé : la tête –COO⁻Na⁺ est polaire/hydrophile (attirée par l'eau), la chaîne R– (longue chaîne carbonée) est apolaire/lipophile (attirée par les graisses). En suspension, les savons forment des micelles.",
    wolof: "Savon am nawet ñaar: bopp polaire (hydrophile) + reng apolaire (lipophile). Mi moy amphi-phile. Micelle bi moy formation bi.",
    trap: "Piège Bac : Identifier et orienter correctement la tête et la queue dans un schéma de micelle.",
  },
  {
    id: 9,
    difficulty: 2,
    text: "Quel nom porte l'ester formé par l'acide éthanoïque (CH₃COOH) et l'éthanol (C₂H₅OH) ?",
    options: [
      "Éthanoate d'éthyle",
      "Éthylate d'éthanoïque",
      "Acétate de méthyle",
      "Propanoate d'éthyle",
    ],
    correct: 0,
    explanation: "Nomenclature des esters : nom de l'acide (éthanoïque → éthanoate) + 'de' + nom de l'alcool (éthanol → éthyle). Résultat : éthanoate d'éthyle. C'est l'arôme de poire / vernis à ongles.",
    wolof: "Ester bi tuur: [acide –ique → –ate] + 'de' + [alcool –ol → –yle]. Éthanoïque → éthanoate + éthanol → éthyle.",
  },
  {
    id: 10,
    difficulty: 3,
    text: "Au Bac S2, on donne : n₀(acide) = n₀(alcool) = 1 mol, rendement limite τ = 67 %. Calculer la quantité d'ester à l'équilibre.",
    options: [
      "n(ester) = 1 mol",
      "n(ester) = 0,67 mol",
      "n(ester) = 0,5 mol",
      "n(ester) = 0,33 mol",
    ],
    correct: 1,
    explanation: "τ = x_éq / n₀ = 0,67. Donc x_éq = 0,67 × 1 = 0,67 mol d'ester formé. À l'équilibre : n(acide) = 1 − 0,67 = 0,33 mol, n(alcool) = 0,33 mol, n(ester) = 0,67 mol, n(eau) = 0,67 mol.",
    wolof: "τ = 0,67 → x = 0,67 mol. Vérification K : (0,67 × 0,67)/(0,33 × 0,33) = 0,45/0,11 ≈ 4. Correct !",
    trap: "Piège calcul : Certains écrivent x = 0,5 par erreur. Toujours partir de τ = x/n₀ !",
  },
];

function StarDifficulty({ level }: { level: 1 | 2 | 3 }) {
  return (
    <div className="flex gap-0.5" title={`Difficulté ${level}/3`}>
      {[1, 2, 3].map((s) => (
        <Star
          key={s}
          className={`w-3.5 h-3.5 ${s <= level ? "text-amber-400 fill-amber-400" : "text-gray-200 fill-gray-200"}`}
        />
      ))}
    </div>
  );
}

export function AcidesDerivesQuizEmbedded() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(QUESTIONS.length).fill(null));
  const [finished, setFinished] = useState(false);

  const q = QUESTIONS[current];
  const isCorrect = selected === q.correct;
  const score = answers.filter((a, i) => a === QUESTIONS[i].correct).length;

  function handleSelect(idx: number) {
    if (confirmed) return;
    setSelected(idx);
  }

  function handleConfirm() {
    if (selected === null) return;
    const newAnswers = [...answers];
    newAnswers[current] = selected;
    setAnswers(newAnswers);
    setConfirmed(true);
  }

  function handleNext() {
    if (current < QUESTIONS.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
      setConfirmed(false);
    } else {
      setFinished(true);
    }
  }

  function handleRestart() {
    setCurrent(0);
    setSelected(null);
    setConfirmed(false);
    setAnswers(Array(QUESTIONS.length).fill(null));
    setFinished(false);
  }

  if (finished) {
    const pct = Math.round((score / QUESTIONS.length) * 100);
    const mention =
      pct >= 80 ? { label: "Excellent !", color: "text-emerald-600", bg: "bg-emerald-50" }
      : pct >= 60 ? { label: "Bien !", color: "text-blue-600", bg: "bg-blue-50" }
      : { label: "À revoir…", color: "text-rose-600", bg: "bg-rose-50" };

    return (
      <div className="bg-white rounded-3xl border border-navy/10 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <Trophy className="w-7 h-7 text-amber-400" />
          <h3 className="text-xl font-bold text-navy">Résultats du Quiz — C3 Acides &amp; Dérivés</h3>
        </div>

        <div className={`rounded-2xl ${mention.bg} p-6 text-center space-y-2`}>
          <p className={`text-5xl font-black ${mention.color}`}>{score}/{QUESTIONS.length}</p>
          <p className={`text-lg font-semibold ${mention.color}`}>{mention.label}</p>
          <p className="text-sm text-gray-500">{pct}% de bonnes réponses</p>
        </div>

        <div className="space-y-3">
          {QUESTIONS.map((q, i) => {
            const ans = answers[i];
            const ok = ans === q.correct;
            return (
              <div key={q.id} className={`rounded-xl px-4 py-3 flex items-start gap-3 ${ok ? "bg-emerald-50/80" : "bg-rose-50/60"}`}>
                {ok
                  ? <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                  : <XCircle className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-navy line-clamp-2">Q{i + 1}. {q.text}</p>
                  {!ok && ans !== null && (
                    <p className="text-xs text-rose-500 mt-0.5">
                      Votre réponse : {LETTERS[ans]}. {q.options[ans]}
                    </p>
                  )}
                  {!ok && (
                    <p className="text-xs text-emerald-700 mt-0.5">
                      Bonne réponse : {LETTERS[q.correct]}. {q.options[q.correct]}
                    </p>
                  )}
                </div>
                <StarDifficulty level={q.difficulty} />
              </div>
            );
          })}
        </div>

        <button
          onClick={handleRestart}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-turquoise text-white font-semibold hover:bg-turquoise/90 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Recommencer le quiz
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl border border-navy/10 p-5 sm:p-7 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FlaskConical className="w-5 h-5 text-turquoise" />
          <h3 className="font-bold text-navy text-base sm:text-lg">
            Quiz Bac S2 — Acides &amp; Dérivés
          </h3>
        </div>
        <span className="text-sm text-gray-400 font-medium">
          {current + 1} / {QUESTIONS.length}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-turquoise rounded-full transition-all duration-500"
          style={{ width: `${((current + 1) / QUESTIONS.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <StarDifficulty level={q.difficulty} />
          <span className="text-xs text-gray-400">Difficulté {q.difficulty}/3</span>
        </div>
        <p className="font-semibold text-navy text-sm sm:text-base leading-snug">{q.text}</p>
      </div>

      {/* Options */}
      <div className="space-y-2">
        {q.options.map((opt, idx) => {
          let base = "flex items-start gap-3 p-3 sm:p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ";
          if (!confirmed) {
            base += selected === idx
              ? "border-turquoise bg-turquoise-light"
              : "border-gray-100 hover:border-turquoise/40 bg-surface";
          } else {
            if (idx === q.correct) base += "border-emerald-400 bg-emerald-50/80";
            else if (idx === selected && idx !== q.correct) base += "border-rose-400 bg-rose-50/60";
            else base += "border-gray-100 bg-surface opacity-60";
          }
          return (
            <button key={idx} className={base + " w-full text-left"} onClick={() => handleSelect(idx)}>
              <span className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                confirmed && idx === q.correct ? "border-emerald-400 bg-emerald-100 text-emerald-700"
                : confirmed && idx === selected && idx !== q.correct ? "border-rose-400 bg-rose-100 text-rose-700"
                : selected === idx && !confirmed ? "border-turquoise bg-turquoise text-white"
                : "border-gray-200 text-gray-500"
              }`}>
                {LETTERS[idx]}
              </span>
              <span className="text-sm text-navy leading-snug">{opt}</span>
              {confirmed && idx === q.correct && <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 ml-auto mt-0.5" />}
              {confirmed && idx === selected && idx !== q.correct && <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0 ml-auto mt-0.5" />}
            </button>
          );
        })}
      </div>

      {/* Feedback after confirm */}
      {confirmed && (
        <div className="space-y-2">
          <div className={`rounded-2xl p-4 text-sm leading-relaxed ${isCorrect ? "bg-emerald-50/80 text-emerald-800" : "bg-rose-50/60 text-rose-800"}`}>
            <p className="font-semibold mb-1">{isCorrect ? "✅ Bravo !" : "❌ Pas tout à fait…"}</p>
            <p>{q.explanation}</p>
          </div>
          {q.wolof && (
            <div className="rounded-2xl bg-amber-50/60 border border-amber-200/60 px-4 py-3 text-sm text-amber-800">
              <span className="font-semibold">🗣️ En Wolof : </span>{q.wolof}
            </div>
          )}
          {q.trap && (
            <div className="rounded-2xl bg-rose-50/60 border border-rose-200/60 px-4 py-3 text-sm text-rose-800">
              <span className="font-semibold">⚠️ Piège Bac : </span>{q.trap}
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3 pt-1">
        {!confirmed ? (
          <button
            onClick={handleConfirm}
            disabled={selected === null}
            className="flex-1 py-3 rounded-2xl bg-turquoise text-white font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:bg-turquoise/90 transition-colors"
          >
            Valider
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex-1 py-3 rounded-2xl bg-navy text-white font-semibold hover:bg-navy/90 transition-colors"
          >
            {current < QUESTIONS.length - 1 ? "Question suivante →" : "Voir les résultats"}
          </button>
        )}
      </div>
    </div>
  );
}
