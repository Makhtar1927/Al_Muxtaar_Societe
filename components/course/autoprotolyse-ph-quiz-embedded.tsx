'use client';

import React, { useState } from 'react';
import MathRenderer from '@/components/course/math-renderer';
import { CheckCircle2, XCircle, RotateCcw, Trophy, Star, Droplets } from 'lucide-react';

const LETTERS = ['A', 'B', 'C', 'D'] as const;

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
    text: "À 25 °C, que vaut le produit ionique de l'eau pure Ke et sa relation avec le pKe ?",
    options: [
      "Ke = 1,0 × 10⁻⁷ et pKe = 7",
      "Ke = 1,0 × 10⁻¹⁴ et pKe = 14",
      "Ke = 1,0 × 10¹⁴ et pKe = -14",
      "Ke = 7,0 × 10⁻¹⁴ et pKe = 14",
    ],
    correct: 1,
    explanation:
      "À 25 °C, Ke = [H₃O⁺][OH⁻] = 1,0 × 10⁻¹⁴. Par définition, pKe = -log(Ke) = -log(10⁻¹⁴) = 14,0.",
    wolof:
      "Ci 25 °C, produit ionique Ke = 10⁻¹⁴ waxtu wu nekk. Boo jëlee -log Ke, da ngay am pKe = 14.",
  },
  {
    id: 2,
    difficulty: 2,
    text: "L'autoprotolyse de l'eau (2 H₂O ⇌ H₃O⁺ + OH⁻) est endothermique (ΔH > 0). Si la température augmente :",
    options: [
      "Ke diminue et pKe augmente",
      "Ke augmente et pKe diminue",
      "Ke et pKe restent constants car l'eau est pure",
      "L'eau se transforme spontanément en acide fort",
    ],
    correct: 1,
    explanation:
      "D'après la loi de van 't Hoff, une hausse de température favorise le sens endothermique (sens direct). Plus d'ions sont formés : Ke augmente, donc pKe = -log(Ke) diminue.",
    wolof:
      "Bu tàngaay bi yéegee (safara gi yokku), équilibre bi day gaaw jëm kanam : Ke day yokk, pKe di wàññiku !",
    trap: "Piège fréquent : Confondre Ke et pKe. Si Ke augmente (ex: 10⁻¹³), pKe diminue (13) !",
  },
  {
    id: 3,
    difficulty: 3,
    text: "À 60 °C, l'eau pure a un pH égal à 6,50 (car pKe ≈ 13,0). Cette eau est-elle acide, neutre ou basique ?",
    options: [
      "Acide, car son pH est strictement inférieur à 7,0",
      "Basique, car la température l'a chauffée",
      "Strictement neutre, car elle ne contient aucun soluté et [H₃O⁺] = [OH⁻]",
      "Impossible à déterminer sans indicateur coloré",
    ],
    correct: 2,
    explanation:
      "Le piège n°1 du Bac S2 ! La neutralité est définie par [H₃O⁺] = [OH⁻], ce qui implique pH = ½ pKe. À 60 °C, ½ pKe = 6,50 : l'eau pure à pH = 6,50 est donc RIGOUREUSEMENT NEUTRE !",
    wolof:
      "Lii mooy piège bi gën a rëy ci Bac S2 ! Ndox mu neutre du pH 7 rekk. Bu tàngaay bi tolloo ci 60 °C, seuil bi dafay wàcc ci 6,5. Ndox mi neutre la ba tey ndax [H₃O⁺] = [OH⁻] !",
    trap: "Ne répondez jamais « acide car pH < 7 » quand la température n'est pas 25 °C !",
  },
  {
    id: 4,
    difficulty: 1,
    text: "Quelle relation relie la concentration en ions oxonium [H₃O⁺] au pH pour une solution diluée ?",
    options: [
      "[H₃O⁺] = ln(pH)",
      "[H₃O⁺] = 10^(-pH)",
      "[H₃O⁺] = -10^(pH)",
      "[H₃O⁺] = e^(-pH)",
    ],
    correct: 1,
    explanation:
      "Par définition de Sørensen, pH = -log[H₃O⁺], ce qui équivaut à [H₃O⁺] = 10^(-pH). Pour un pH de 3,0, [H₃O⁺] = 10⁻³ mol/L.",
    wolof:
      "Formule de base bi : [H₃O⁺] = 10^(-pH). Boo amee pH = 2, xamal ni [H₃O⁺] = 10⁻² = 0,01 mol/L.",
  },
  {
    id: 5,
    difficulty: 2,
    text: "Une mesure donne un pH = 3,40. Que vaut la concentration [H₃O⁺] avec le bon nombre de chiffres significatifs ?",
    options: [
      "4 × 10⁻⁴ mol/L (1 chiffre)",
      "3,981 × 10⁻⁴ mol/L (4 chiffres)",
      "4,0 × 10⁻⁴ mol/L (2 chiffres significatifs)",
      "0,000400 mol/L (3 chiffres)",
    ],
    correct: 2,
    explanation:
      "Règle officielle de métrologie au Bac : dans un pH, la partie entière (ici 3) indique l'ordre de grandeur. Seules les décimales (ici 40, soit 2 décimales) représentent des chiffres significatifs. Donc [H₃O⁺] = 4,0 × 10⁻⁴ mol/L.",
    wolof:
      "Ci pH, décimales yi rekk ñoy chiffres significatifs ! Fii am na ñaari décimales (40), kon réponse bi am ñaari chiffres (4,0).",
    trap: "Ne comptez pas le 3 devant la virgule comme chiffre significatif pour la concentration !",
  },
  {
    id: 6,
    difficulty: 2,
    text: "Un indicateur coloré de constante pKi = 7,0 présente une forme acide jaune et une forme basique bleue. Quelle est sa zone de virage ?",
    options: [
      "Exactement au point unique pH = 7,0",
      "L'intervalle de pH compris entre 6,0 et 7,6 environ",
      "Tout le domaine acide entre pH = 0 et pH = 7",
      "Entre pH = 7,0 et pH = 14,0",
    ],
    correct: 1,
    explanation:
      "La zone de virage correspond approximativement à [pKi - 1 ; pKi + 1]. Pour le BBT (pKi = 7,0), la zone de virage s'étend de pH 6,0 (jaune) à pH 7,6 (bleu).",
    wolof:
      "Zone de virage bi dafa wër pKi bi : [pKi - 1 ; pKi + 1]. Ci diggante boobu la ñuy gis melo vert bi (teinte sensible).",
  },
  {
    id: 7,
    difficulty: 2,
    text: "Dans sa zone de virage (pH compris entre 6,0 et 7,6), quelle est la couleur prise par le Bleu de Bromothymol (BBT) ?",
    options: [
      "Incolore limpide",
      "Vert émeraude (teinte sensible, superposition du jaune et du bleu)",
      "Rouge vif",
      "Violet foncé",
    ],
    correct: 1,
    explanation:
      "Dans la zone de virage, les deux formes HIn (jaune) et In⁻ (bleue) coexistent en proportions comparables. La synthèse soustractive des couleurs donne une teinte sensible verte.",
    wolof:
      "Melo vert bi moy teinte sensible : bu jaune ak bleu jaxasoo ci digg zone de virage bi !",
  },
  {
    id: 8,
    difficulty: 3,
    text: "Pour doser une solution d'acide chlorhydrique par la soude (pH à l'équivalence pHE = 7,00 à 25 °C), quel est l'indicateur le plus approprié ?",
    options: [
      "L'hélianthine (zone de virage : 3,1 - 4,4)",
      "La phénolphtaléine (zone de virage : 8,2 - 10,0)",
      "Le bleu de bromothymol (BBT) (zone de virage : 6,0 - 7,6)",
      "N'importe quel indicateur car la réaction est totale",
    ],
    correct: 2,
    explanation:
      "Critère fondamental de choix au Bac S2 : la zone de virage de l'indicateur coloré doit obligatoirement englober le pH à l'équivalence. Ici pHE = 7,00 est parfaitement contenu dans l'intervalle [6,0 - 7,6] du BBT.",
    wolof:
      "Tann indicateur : dafa laaj zone de virage bi ëmb pHE équivalence bi ! Fii 7,0 dafa nekk ci biir [6,0 - 7,6] bu BBT.",
    trap: "Ne choisissez jamais un indicateur dont la zone de virage est en dehors du pHE !",
  },
  {
    id: 9,
    difficulty: 2,
    text: "On dilue 10 fois une solution aqueuse d'acide chlorhydrique de concentration initiale C = 10⁻² mol/L. Comment varie son pH ?",
    options: [
      "Il diminue de 1 unité (pH passe de 2 à 1)",
      "Il augmente de 1 unité (pH passe de 2 à 3)",
      "Il est multiplié par 10 (pH devient 20)",
      "Il ne change pas car l'acide est fort",
    ],
    correct: 1,
    explanation:
      "pH = -log C. Si C' = C/10 = 10⁻³ mol/L, pH' = -log(10⁻³) = 3. Diluer 10 fois un acide fort augmente son pH exactement de 1 unité.",
    wolof:
      "Boo dollee ndox ba acide bi wàññiku 10 yoon (dilution), pH bi dafay yéeg +1 unité : pH 2 day dem ci pH 3.",
  },
  {
    id: 10,
    difficulty: 3,
    text: "Si l'on dilue à l'infini une solution d'acide fort pour obtenir une concentration apparente C = 10⁻⁸ mol/L, que vaut réellement le pH à 25 °C ?",
    options: [
      "pH = 8,0 car pH = -log(10⁻⁸)",
      "pH = 0 car la solution est infiniment diluée",
      "pH ≈ 6,98 (légèrement inférieur à 7,00 à cause de l'autoprotolyse de l'eau)",
      "pH = 14 car l'acide s'est transformé en base",
    ],
    correct: 2,
    explanation:
      "Grand classique du Bac S2 ! Un acide, même infiniment dilué, ne peut JAMAIS devenir basique (pH > 7). À cette dilution extrême, l'apport d'ions H₃O⁺ de l'eau (10⁻⁷ mol/L) prédomine : l'équation du second degré donne [H₃O⁺] = 1,05 × 10⁻⁷ mol/L, soit pH ≈ 6,98.",
    wolof:
      "Moytul lii ! Acide bu ñu diluer mësul nekk base (pH > 7 mënul nekk) ! Day taxaw ci wetu 7 (6,98) ndax ndox mi ci boppam.",
    trap: "Répondre pH = 8 pour un acide est l'une des erreurs les plus lourdement pénalisées au Bac !",
  },
];

function StarDifficulty({ level }: { level: 1 | 2 | 3 }) {
  return (
    <div className="flex gap-0.5" title={`Difficulté ${level}/3`}>
      {[1, 2, 3].map((s) => (
        <Star
          key={s}
          className={`w-3.5 h-3.5 ${s <= level ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}`}
        />
      ))}
    </div>
  );
}

export default function AutoprotolysePhQuizEmbedded() {
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
      pct >= 80
        ? { label: 'Excellent ! Maîtrise parfaite du Bac S2', color: 'text-emerald-600', bg: 'bg-emerald-50' }
        : pct >= 60
        ? { label: 'Bien ! Quelques pièges à consolider', color: 'text-blue-600', bg: 'bg-blue-50' }
        : { label: 'À retravailler, attention aux pièges de T°C et Ke', color: 'text-rose-600', bg: 'bg-rose-50' };

    return (
      <div className="bg-white rounded-3xl border border-navy/10 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <Trophy className="w-7 h-7 text-amber-400" />
          <h3 className="text-xl font-bold text-navy">
            Résultats du Quiz — C5 : Autoprotolyse de l&apos;Eau, pH &amp; Indicateurs
          </h3>
        </div>

        <div className={`rounded-2xl ${mention.bg} p-6 text-center space-y-2`}>
          <p className={`text-5xl font-black ${mention.color}`}>
            {score}/{QUESTIONS.length}
          </p>
          <p className={`text-lg font-semibold ${mention.color}`}>{mention.label}</p>
          <p className="text-sm text-gray-500">{pct}% de réponses correctes</p>
        </div>

        <div className="space-y-3">
          {QUESTIONS.map((item, i) => {
            const ans = answers[i];
            const ok = ans === item.correct;
            return (
              <div
                key={item.id}
                className={`rounded-xl px-4 py-3 flex items-start gap-3 ${
                  ok ? 'bg-emerald-50/80' : 'bg-rose-50/60'
                }`}
              >
                {ok ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-navy line-clamp-2">
                    Q{i + 1}. {item.text}
                  </p>
                  {!ok && ans !== null && (
                    <p className="text-xs text-rose-600 mt-0.5">
                      Votre réponse : {LETTERS[ans]}. {item.options[ans]}
                    </p>
                  )}
                  {!ok && (
                    <p className="text-xs text-emerald-700 mt-0.5">
                      Bonne réponse : {LETTERS[item.correct]}. {item.options[item.correct]}
                    </p>
                  )}
                </div>
                <StarDifficulty level={item.difficulty} />
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
      {/* En-tête */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Droplets className="w-5 h-5 text-turquoise" />
          <h3 className="font-bold text-navy text-base sm:text-lg">
            Quiz Bac S2 — Autoprotolyse de l&apos;Eau, pH &amp; Indicateurs
          </h3>
        </div>
        <span className="text-sm text-gray-400 font-medium">
          {current + 1} / {QUESTIONS.length}
        </span>
      </div>

      {/* Barre de progression */}
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
          let base = 'flex items-start gap-3 p-3 sm:p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ';
          if (!confirmed) {
            base +=
              selected === idx
                ? 'border-turquoise bg-turquoise-light'
                : 'border-gray-100 hover:border-turquoise/40 bg-surface';
          } else {
            if (idx === q.correct) base += 'border-emerald-400 bg-emerald-50/80';
            else if (idx === selected && idx !== q.correct) base += 'border-rose-400 bg-rose-50/60';
            else base += 'border-gray-100 bg-surface opacity-60';
          }
          return (
            <button key={idx} className={base + ' w-full text-left'} onClick={() => handleSelect(idx)}>
              <span
                className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 ${
                  confirmed && idx === q.correct
                    ? 'border-emerald-400 bg-emerald-100 text-emerald-700'
                    : confirmed && idx === selected && idx !== q.correct
                    ? 'border-rose-400 bg-rose-100 text-rose-700'
                    : selected === idx && !confirmed
                    ? 'border-turquoise bg-turquoise text-white'
                    : 'border-gray-200 text-gray-500'
                }`}
              >
                {LETTERS[idx]}
              </span>
              <span className="text-sm text-navy leading-snug">{opt}</span>
              {confirmed && idx === q.correct && (
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 ml-auto mt-0.5" />
              )}
              {confirmed && idx === selected && idx !== q.correct && (
                <XCircle className="w-4 h-4 text-rose-500 shrink-0 ml-auto mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Feedback après validation */}
      {confirmed && (
        <div className="space-y-2">
          <div
            className={`rounded-2xl p-4 text-sm leading-relaxed ${
              isCorrect ? 'bg-emerald-50/80 text-emerald-800' : 'bg-rose-50/60 text-rose-800'
            }`}
          >
            <p className="font-semibold mb-1">{isCorrect ? '✅ Exact !' : '❌ Attention !'}</p>
            <p>{q.explanation}</p>
          </div>
          {q.wolof && (
            <div className="rounded-2xl bg-amber-50/60 border border-amber-200/60 px-4 py-3 text-sm text-amber-800">
              <span className="font-semibold">🗣️ En Wolof : </span>
              {q.wolof}
            </div>
          )}
          {q.trap && (
            <div className="rounded-2xl bg-rose-50/60 border border-rose-200/60 px-4 py-3 text-sm text-rose-800">
              <span className="font-semibold">⚠️ Piège Bac S2 : </span>
              {q.trap}
            </div>
          )}
        </div>
      )}

      {/* Boutons d'action */}
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
            {current < QUESTIONS.length - 1 ? 'Question suivante →' : 'Voir les résultats'}
          </button>
        )}
      </div>
    </div>
  );
}
