'use client';

import React, { useState } from 'react';
import MathRenderer from '@/components/course/math-renderer';

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  rationale: string;
  trapWarning?: string;
}

const P9_LUMIERE_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question:
      'Dans une expérience d’interférences lumineuses d’Young, les deux fentes $F_1$ et $F_2$ sont distantes de $a = 0{,}40$ mm et l’écran est situé à $D = 2{,}0$ m. On mesure la distance séparant 6 franges brillantes consécutives : on trouve $L = 16{,}0$ mm. Quelle est la longueur d’onde $\\lambda$ de la radiation monochromatique ?',
    options: [
      '$\\lambda = 533$ nm',
      '$\\lambda = 640$ nm',
      '$\\lambda = 320$ nm',
      '$\\lambda = 800$ nm',
    ],
    correctIndex: 1,
    rationale:
      'La distance $L$ séparant 6 franges brillantes consécutives correspond à 5 intervalles interfranges : $L = 5i \\implies i = \\frac{L}{5} = \\frac{16{,}0\\text{ mm}}{5} = 3{,}2\\text{ mm} = 3{,}2 \\times 10^{-3}\\text{ m}$. D’après la formule de l’interfrange $i = \\frac{\\lambda D}{a}$, on déduit : $\\lambda = \\frac{a \\cdot i}{D} = \\frac{0{,}40 \\times 10^{-3}\\text{ m} \\times 3{,}2 \\times 10^{-3}\\text{ m}}{2{,}0\\text{ m}} = 6{,}40 \\times 10^{-7}\\text{ m} = 640\\text{ nm}$.',
    trapWarning:
      'Piège classique au Bac S2 : $N$ franges brillantes consécutives renferment $(N - 1)$ interfranges ! Diviser par 6 au lieu de 5 fausse tout le calcul (conduisant à la fausse réponse 533 nm).',
  },
  {
    id: 2,
    question:
      'Dans le dispositif d’Young précédent, on interpose devant la fente $F_1$ une mince lame de verre à faces parallèles d’épaisseur $e = 6{,}0\\;\\mu$m et d’indice de réfraction $n = 1{,}50$. Quel est l’effet produit sur le système de franges sur l’écran ?',
    options: [
      'L’interfrange $i$ augmente de 50 %, mais la position des franges ne change pas.',
      'Le système de franges se translate de $\\Delta x = 15{,}0$ mm vers le côté de la fente $F_1$.',
      'Le système de franges se translate de $\\Delta x = 15{,}0$ mm vers le côté de la fente $F_2$ opposée.',
      'Les franges disparaissent complètement car la lumière n’est plus cohérente.',
    ],
    correctIndex: 1,
    rationale:
      'L’interposition de la lame retarde l’onde issue de $F_1$ en allongeant son chemin optique de $(n - 1)e$. La frange centrale (différence de marche nulle) se déplace vers le côté de la fente couverte ($F_1$) d’une distance : $\\Delta x = \\frac{(n - 1) \\cdot e \\cdot D}{a} = \\frac{(1{,}50 - 1) \\times 6{,}0 \\times 10^{-6}\\text{ m} \\times 2{,}0\\text{ m}}{0{,}40 \\times 10^{-3}\\text{ m}} = 1{,}50 \\times 10^{-2}\\text{ m} = 15{,}0\\text{ mm}$. L’interfrange $i = \\frac{\\lambda D}{a}$ reste rigoureusement inchangé.',
    trapWarning:
      'Retenez bien la règle d’or : la lame translate tout le système de franges VERS LA FENTE COUVERTE, sans modifier ni la largeur des franges, ni leur contraste !',
  },
  {
    id: 3,
    question:
      'Quelle est l’énergie portée par un photon associé à un rayonnement ultraviolet de longueur d’onde dans le vide $\\lambda = 250$ nm ? (On donne : $h = 6{,}63 \\times 10^{-34}\\text{ J}\\cdot\\text{s}$, $c = 3{,}00 \\times 10^8\\text{ m/s}$, $1\\text{ eV} = 1{,}60 \\times 10^{-19}\\text{ J}$).',
    options: [
      '$E = 1{,}24\\text{ eV}$',
      '$E = 3{,}10\\text{ eV}$',
      '$E = 4{,}97\\text{ eV}$',
      '$E = 7{,}95\\text{ eV}$',
    ],
    correctIndex: 2,
    rationale:
      'L’énergie du photon de Planck-Einstein vaut : $E = \\frac{hc}{\\lambda} = \\frac{6{,}63 \\times 10^{-34} \\times 3{,}00 \\times 10^8}{250 \\times 10^{-9}} = 7{,}956 \\times 10^{-19}\\text{ J}$. En électron-volts : $E = \\frac{7{,}956 \\times 10^{-19}\\text{ J}}{1{,}60 \\times 10^{-19}\\text{ J/eV}} = 4{,}97\\text{ eV}$.',
    trapWarning:
      'Convertissez toujours les Joules en eV en divisant par $e = 1{,}60 \\times 10^{-19}$ C. $7{,}95 \\times 10^{-19}$ J ne vaut pas $7{,}95$ eV !',
  },
  {
    id: 4,
    question:
      'Le travail d’extraction des électrons du zinc est $W_0 = 4{,}30\\text{ eV}$. On éclaire une plaque de zinc successivement avec deux faisceaux : le faisceau (A) de lumière rouge intense ($\\lambda_A = 650\\text{ nm}$) et le faisceau (B) de lumière ultraviolette de très faible intensité ($\\lambda_B = 260\\text{ nm}$). Que se passe-t-il ?',
    options: [
      'Le faisceau (A) éjecte des électrons car son intensité est très grande, mais pas le faisceau (B).',
      'Les deux faisceaux provoquent tous les deux l’émission photoélectrique.',
      'Seul le faisceau (B) provoque l’effet photoélectrique car son photon transporte plus de 4,30 eV.',
      'Aucun des deux faisceaux ne peut éjecter d’électrons car l’énergie minimale requise est de 13,6 eV.',
    ],
    correctIndex: 2,
    rationale:
      'La longueur d’onde seuil du zinc est : $\\lambda_0 = \\frac{hc}{W_0} = \\frac{6{,}63 \\times 10^{-34} \\times 3 \\times 10^8}{4{,}30 \\times 1{,}6 \\times 10^{-19}} = 289\\text{ nm}$. Pour le faisceau rouge : $\\lambda_A = 650\\text{ nm} > \\lambda_0$ ($h\\nu_A = 1{,}91\\text{ eV} < W_0$) : AUCUN électron n’est émis, même sous une intensité lumineuse colossale ! Pour le faisceau UV : $\\lambda_B = 260\\text{ nm} < \\lambda_0$ ($h\\nu_B = 4{,}77\\text{ eV} > W_0$) : l’effet photoélectrique a lieu instantanément.',
    trapWarning:
      'Rupture conceptuelle d’Einstein (1905) : l’intensité lumineuse ne peut jamais compenser un déficit d’énergie du photon individuel !',
  },
  {
    id: 5,
    question:
      'Une cathode en césium de travail d’extraction $W_0 = 1{,}90\\text{ eV}$ est éclairée par une radiation monochromatique de longueur d’onde $\\lambda = 400\\text{ nm}$. Quelle est l’énergie cinétique maximale $E_c^{\\max}$ des photoélectrons éjectés ?',
    options: [
      '$E_c^{\\max} = 1{,}20\\text{ eV}$',
      '$E_c^{\\max} = 3{,}10\\text{ eV}$',
      '$E_c^{\\max} = 5{,}00\\text{ eV}$',
      '$E_c^{\\max} = 0\\text{ eV}$ (sous le seuil)',
    ],
    correctIndex: 0,
    rationale:
      'L’énergie du photon incident est : $E = \\frac{hc}{\\lambda} = \\frac{6{,}63 \\times 10^{-34} \\times 3{,}0 \\times 10^8}{400 \\times 10^{-9} \\times 1{,}6 \\times 10^{-19}} = 3{,}10\\text{ eV}$. D’après la relation d’Einstein : $E_c^{\\max} = h\\nu - W_0 = 3{,}10\\text{ eV} - 1{,}90\\text{ eV} = 1{,}20\\text{ eV}$ (soit $1{,}92 \\times 10^{-19}\\text{ J}$).',
    trapWarning:
      'Ne pas additionner $h\\nu$ et $W_0$ : l’énergie cinétique est le surplus disponible après arrachement, donc $E_c^{\\max} = h\\nu - W_0$.',
  },
  {
    id: 6,
    question:
      'Pour la cellule photoélectrique précédente ($E_c^{\\max} = 1{,}20\\text{ eV}$), quelle doit être la valeur de la tension retardatrice $U_{AK}$ appliquée pour annuler complètement le photocourant (potentiel d’arrêt) ?',
    options: [
      '$U_{AK} = +1{,}20\\text{ V}$',
      '$U_{AK} = -1{,}20\\text{ V}$',
      '$U_{AK} = -0{,}60\\text{ V}$',
      '$U_{AK} = -2{,}40\\text{ V}$',
    ],
    correctIndex: 1,
    rationale:
      'Le courant s’annule lorsque les électrons les plus rapides sont freinés avant d’atteindre l’anode. Le théorème de l’énergie cinétique donne : $0 - E_c^{\\max} = q \\cdot U_{AK} = (-e) \\cdot U_{AK} \\implies E_c^{\\max} = e \\cdot (-U_{AK}) = e |U_0|$. Comme $E_c^{\\max} = 1{,}20\\text{ eV}$, le potentiel d’arrêt est $|U_0| = 1{,}20\\text{ V}$, et la tension d’anode est $U_{AK} = -1{,}20\\text{ V}$ (tension négative retardatrice).',
    trapWarning:
      'Attention au signe : une tension accélératrice $U_{AK} > 0$ augmente le photocourant jusqu’à saturation ; c’est une tension retardatrice $U_{AK} < 0$ qui annule le courant !',
  },
  {
    id: 7,
    question:
      'Quelle est la vitesse maximale $v_{\\max}$ des électrons émis par cette cathode de césium ($E_c^{\\max} = 1{,}20\\text{ eV}$, $m_e = 9{,}1 \\times 10^{-31}\\text{ kg}$) ?',
    options: [
      '$v_{\\max} = 3{,}25 \\times 10^5\\text{ m/s}$',
      '$v_{\\max} = 6{,}50 \\times 10^5\\text{ m/s}$',
      '$v_{\\max} = 1{,}45 \\times 10^6\\text{ m/s}$',
      '$v_{\\max} = 3{,}00 \\times 10^8\\text{ m/s}$',
    ],
    correctIndex: 1,
    rationale:
      'En convertissant l’énergie cinétique en Joules : $E_c^{\\max} = 1{,}20 \\times 1{,}60 \\times 10^{-19}\\text{ J} = 1{,}92 \\times 10^{-19}\\text{ J}$. Comme $E_c^{\\max} = \\frac{1}{2}m v_{\\max}^2$ : $v_{\\max} = \\sqrt{\\frac{2 E_c^{\\max}}{m}} = \\sqrt{\\frac{2 \\times 1{,}92 \\times 10^{-19}}{9{,}1 \\times 10^{-31}}} = \\sqrt{4{,}22 \\times 10^{11}} \\approx 6{,}50 \\times 10^5\\text{ m/s}$.',
    trapWarning:
      'Convertissez impérativement $E_c^{\\max}$ en JOULES avant d’utiliser la masse en kg ! Utiliser 1,20 directement donnerait un résultat erroné.',
  },
  {
    id: 8,
    question:
      'Dans le modèle de Bohr de l’atome d’hydrogène, l’énergie du niveau de rang $n$ est $E_n = -\\frac{13{,}6}{n^2}\\text{ (eV)}$. Quelle est l’énergie d’ionisation de l’atome d’hydrogène pris dans son état fondamental ($n = 1$) ?',
    options: [
      '$E_{\\text{ion}} = -13{,}6\\text{ eV}$',
      '$E_{\\text{ion}} = +13{,}6\\text{ eV}$',
      '$E_{\\text{ion}} = +3{,}4\\text{ eV}$',
      '$E_{\\text{ion}} = 0\\text{ eV}$',
    ],
    correctIndex: 1,
    rationale:
      'L’ionisation correspond au passage de l’électron du niveau fondamental ($n = 1, E_1 = -13{,}6\\text{ eV}$) à l’état libre infiniment éloigné ($n \\to \\infty, E_\\infty = 0\\text{ eV}$). L’énergie minimale à apporter à l’atome est : $E_{\\text{ion}} = E_\\infty - E_1 = 0 - (-13{,}6\\text{ eV}) = +13{,}6\\text{ eV}$.',
    trapWarning:
      'L’énergie d’ionisation est toujours une grandeur POSITIVE à fournir au système pour arracher l’électron de l’attraction nucléaire.',
  },
  {
    id: 9,
    question:
      'La raie $H_\\alpha$ de la série de Balmer correspond à la transition radiative du niveau $n = 3$ vers le niveau $n = 2$ dans l’atome d’hydrogène. Que valent l’énergie du photon émis et sa longueur d’onde $\\lambda$ ?',
    options: [
      '$\\Delta E = 1{,}89\\text{ eV}$ et $\\lambda \\approx 656\\text{ nm}$ (rouge visible)',
      '$\\Delta E = 10{,}2\\text{ eV}$ et $\\lambda \\approx 121\\text{ nm}$ (ultraviolet)',
      '$\\Delta E = 0{,}66\\text{ eV}$ et $\\lambda \\approx 1875\\text{ nm}$ (infrarouge)',
      '$\\Delta E = 2{,}55\\text{ eV}$ et $\\lambda \\approx 486\\text{ nm}$ (cyan visible)',
    ],
    correctIndex: 0,
    rationale:
      'Niveau initial : $E_3 = -\\frac{13{,}6}{3^2} = -1{,}51\\text{ eV}$. Niveau final : $E_2 = -\\frac{13{,}6}{2^2} = -3{,}40\\text{ eV}$. Énergie du photon émis : $\\Delta E = E_3 - E_2 = -1{,}51 - (-3{,}40) = 1{,}89\\text{ eV} = 1{,}89 \\times 1{,}60 \\times 10^{-19}\\text{ J} = 3{,}024 \\times 10^{-19}\\text{ J}$. Longueur d’onde : $\\lambda = \\frac{hc}{\\Delta E} = \\frac{6{,}63 \\times 10^{-34} \\times 3{,}0 \\times 10^8}{3{,}024 \\times 10^{-19}} \\approx 656\\text{ nm}$ (raie rouge visible).',
    trapWarning:
      'La série de Balmer a toujours pour niveau d’arrivée $n = 2$. C’est la seule série de l’hydrogène dont les premières raies appartiennent au domaine visible.',
  },
  {
    id: 10,
    question:
      'Lors de l’expérience de Millikan sur l’effet photoélectrique, la droite du potentiel d’arrêt en fonction de la fréquence incidente a pour équation $|U_0| = a \\cdot \\nu - b$. Que représentent respectivement la pente $a$ et l’abscisse à l’origine $(b / a)$ ?',
    options: [
      'La pente $a = \\frac{h}{e}$ et l’abscisse à l’origine est la fréquence seuil $\\nu_0$ du métal.',
      'La pente $a = h$ et l’abscisse à l’origine est le travail d’extraction $W_0$.',
      'La pente $a = \\frac{e}{h}$ et l’abscisse à l’origine est la constante de Rydberg.',
      'La pente $a = \\frac{c}{\\lambda}$ et l’abscisse à l’origine est la vitesse maximale $v_{\\max}$.',
    ],
    correctIndex: 0,
    rationale:
      'D’après l’équation d’Einstein : $e |U_0| = h\\nu - W_0 \\implies |U_0| = \\left(\\frac{h}{e}\\right)\\nu - \\frac{W_0}{e}$. Par identification avec $|U_0| = a\\nu - b$ : la pente vaut $a = \\frac{h}{e}$ (pente universelle identique pour tous les métaux), et l’abscisse à l’origine ($|U_0| = 0$) vaut $\\nu = \\frac{b}{a} = \\frac{W_0}{h} = \\nu_0$ (fréquence seuil spécifique du métal).',
    trapWarning:
      'La pente $\\frac{h}{e}$ est strictement universelle pour TOUS les métaux ! Seules l’ordonnée à l’origine $-\\frac{W_0}{e}$ et la fréquence seuil $\\nu_0$ dépendent du métal choisi.',
  },
];

export default function P9LumiereQuizEmbedded() {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState<boolean>(false);

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (showResults) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const total = P9_LUMIERE_QUESTIONS.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const isComplete = answeredCount === total;

  const score = showResults
    ? P9_LUMIERE_QUESTIONS.reduce((acc, q) => {
        return acc + (selectedAnswers[q.id] === q.correctIndex ? 1 : 0);
      }, 0)
    : 0;

  return (
    <section className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm my-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-5 border-b border-slate-100 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold mb-2">
            Auto-Évaluation Baccalauréat S2 • Chapitre P9
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Quiz d&apos;Excellence : Interférences d’Young, Effet Photoélectrique &amp; Quanta
          </h3>
          <p className="text-sm text-slate-500 mt-1">
            10 questions exigeantes avec justifications mathématiques complètes, calculs de longueur d’onde, bilan d’Einstein et séries de Bohr.
          </p>
        </div>

        {/* Score indicator if shown */}
        {showResults && (
          <div className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-indigo-50 border border-indigo-200 self-start md:self-auto">
            <div className="text-right">
              <div className="text-xs text-indigo-600 font-semibold uppercase">Score Final</div>
              <div className="text-xl font-extrabold text-indigo-950 font-mono">
                {score} / {total}
              </div>
            </div>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                score >= 8 ? 'bg-emerald-600' : score >= 5 ? 'bg-amber-600' : 'bg-rose-600'
              }`}
            >
              {Math.round((score / total) * 100)}%
            </div>
          </div>
        )}
      </div>

      {/* Questions list */}
      <div className="space-y-6 my-6">
        {P9_LUMIERE_QUESTIONS.map((q, qIdx) => {
          const userChoice = selectedAnswers[q.id];
          const isAnswered = userChoice !== undefined;
          const isCorrect = userChoice === q.correctIndex;

          return (
            <div
              key={q.id}
              className={`p-5 rounded-xl border transition-all ${
                showResults
                  ? isCorrect
                    ? 'border-emerald-200 bg-emerald-50/30'
                    : 'border-rose-200 bg-rose-50/30'
                  : isAnswered
                  ? 'border-indigo-200 bg-indigo-50/20'
                  : 'border-slate-200 bg-white'
              }`}
            >
              {/* Question title */}
              <div className="flex items-start gap-3 mb-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-bold text-xs shrink-0 mt-0.5">
                  {qIdx + 1}
                </span>
                <div className="text-sm font-semibold text-slate-900 leading-relaxed">
                  <MathRenderer content={q.question} />
                </div>
              </div>

              {/* Options */}
              <div className="space-y-2 pl-9">
                {q.options.map((opt, optIdx) => {
                  const isThisSelected = userChoice === optIdx;
                  const isThisCorrect = optIdx === q.correctIndex;

                  let optClass = 'border-slate-200 bg-white hover:border-slate-300 text-slate-800';
                  if (showResults) {
                    if (isThisCorrect) {
                      optClass = 'border-emerald-500 bg-emerald-50 font-semibold text-emerald-900';
                    } else if (isThisSelected && !isThisCorrect) {
                      optClass = 'border-rose-400 bg-rose-50 text-rose-800';
                    } else {
                      optClass = 'border-slate-200 bg-slate-50/50 text-slate-400 opacity-60';
                    }
                  } else if (isThisSelected) {
                    optClass = 'border-indigo-600 bg-indigo-50/60 font-semibold text-indigo-950 shadow-sm';
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      disabled={showResults}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between ${optClass}`}
                    >
                      <span className="flex items-center gap-2">
                        <span className="font-mono text-xs opacity-60">
                          {String.fromCharCode(65 + optIdx)}.
                        </span>
                        <span>
                          <MathRenderer content={opt} />
                        </span>
                      </span>

                      {showResults && isThisCorrect && (
                        <span className="text-emerald-700 font-bold text-xs shrink-0 ml-2">✓ Correct</span>
                      )}
                      {showResults && isThisSelected && !isThisCorrect && (
                        <span className="text-rose-700 font-bold text-xs shrink-0 ml-2">✗ Faux</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Rationale and trap warning shown after submission */}
              {showResults && (
                <div className="mt-4 pt-3 border-t border-slate-200/80 pl-9 space-y-2 text-xs">
                  <div className="text-slate-800 bg-white/80 p-3 rounded-lg border border-slate-200">
                    <span className="font-bold text-indigo-700 block mb-1">
                      Justification Scientifique :
                    </span>
                    <MathRenderer content={q.rationale} />
                  </div>
                  {q.trapWarning && (
                    <div className="text-amber-950 bg-amber-50 p-2.5 rounded-lg border border-amber-200">
                      <strong className="text-amber-800 font-semibold block mb-0.5">Piège Bac S2 :</strong>
                      <MathRenderer content={q.trapWarning} />
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Action footer */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
        <div className="text-xs text-slate-500">
          {!showResults ? (
            <span>
              {answeredCount} sur {total} question(s) répondue(s)
            </span>
          ) : (
            <span>
              Évaluation terminée. Révisez attentivement les justifications mathématiques ci-dessus.
            </span>
          )}
        </div>

        <div className="flex items-center gap-3">
          {!showResults ? (
            <button
              onClick={() => setShowResults(true)}
              disabled={!isComplete}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-sm transition-all ${
                isComplete
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white cursor-pointer'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              Valider mes Réponses
            </button>
          ) : (
            <button
              onClick={resetQuiz}
              className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition-all"
            >
              Recommencer le Quiz
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
