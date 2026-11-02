'use client';

import React, { useState } from 'react';
import StudyIcon from '@/components/ui/study-icon';
import MathRenderer from '@/components/course/math-renderer';

const SUITES_METHODES = [
  {
    num: 1,
    title: 'Raisonnement par Récurrence',
    icon: 'rigueur_compas' as const,
    when: 'Pour démontrer qu\'une propriété $P(n)$ est vraie pour tout entier $n \\ge n_0$',
    formule: `**Les 3 étapes obligatoires au Bac S2 :**

1. **Initialisation :** Vérifier que $P(n_0)$ est vraie pour le premier terme (généralement $n = 0$ ou $n = 1$).
2. **Hérédité :** Soit $k \\ge n_0$. On suppose que $P(k)$ est vraie (Hypothèse de récurrence). On démontre alors que $P(k+1)$ est vraie.
3. **Conclusion :** Par le principe de récurrence, $P(n)$ est vraie pour tout entier $n \\ge n_0$.`,
    exemple: `Démontrer que pour la suite définie par $u_0 = 1$ et $u_{n+1} = \\sqrt{2 + u_n}$, on a $0 < u_n < 2$.

- *Initialisation :* $u_0 = 1 \\in ]0, 2[$, donc $P(0)$ est vraie.
- *Hérédité :* Supposons $0 < u_k < 2$. Alors $2 < 2 + u_k < 4$. Par croissance de la racine carrée, $\\sqrt{2} < \\sqrt{2 + u_k} < \\sqrt{4} = 2$. Comme $0 < \\sqrt{2}$, on a bien $0 < u_{k+1} < 2$.
- *Conclusion :* Pour tout $n \\in \\mathbb{N}$, $0 < u_n < 2$.`,
    astuce: 'N\'écrivez jamais « supposons que pour tout k, P(k) est vraie », car vous supposeriez ce qu\'il faut démontrer ! Écrivez toujours : « Soit k un entier fixé tel que P(k) soit vraie ».',
    wolof: '« Récurrence dafa melni teggoo tabala : 1. Seet ndax tabala bu jëkk bi P(n₀) mi ngi taxaw dëgg. 2. Jàpp ne P(k) taxaw na, te wone ne loolu day tax P(k+1) taxaw. 3. Wax ne kon tabala yépp dañuy taxaw ba faaw ! »',
    vieReelle: 'Une cascade de dominos : pousser le premier suffit à faire tomber toute la chaîne jusqu\'à l\'infini sans avoir à pousser chacun séparément.',
  },
  {
    num: 2,
    title: 'Sens de Variation d\'une Suite',
    icon: 'methode_fleche' as const,
    when: 'Pour déterminer si une suite est croissante, décroissante ou stationnaire',
    formule: `**Méthode Générale (Différence) :**
Calculer et étudier le SIGNE de :
$$d_n = u_{n+1} - u_n$$

- Si $u_{n+1} - u_n \\ge 0$ pour tout $n \\implies$ la suite est **croissante**.
- Si $u_{n+1} - u_n \\le 0$ pour tout $n \\implies$ la suite est **décroissante**.

**Méthode du Quotient (uniquement si $u_n > 0$) :**
Comparer $\\dfrac{u_{n+1}}{u_n}$ avec $1$ :
- Si $\\dfrac{u_{n+1}}{u_n} \\ge 1 \\implies$ suite croissante.
- Si $\\dfrac{u_{n+1}}{u_n} \\le 1 \\implies$ suite décroissante.`,
    exemple: `Soit $u_n = \\dfrac{3^n}{n!}$ pour $n \\ge 1$. Comme $u_n > 0$ :

$$\\dfrac{u_{n+1}}{u_n} = \\dfrac{3^{n+1}}{(n+1)!} \\times \\dfrac{n!}{3^n} = \\dfrac{3}{n+1}$$

Pour tout $n \\ge 3$, on a $n+1 \\ge 4 \\implies \\dfrac{3}{n+1} \\le \\dfrac{3}{4} < 1$.
Donc la suite $(u_n)$ est **strictement décroissante** à partir du rang $n = 3$.`,
    astuce: 'Si la suite est définie par récurrence $u_{n+1} = f(u_n)$, vous pouvez également prouver que $u_{n+1} - u_n$ garde un signe constant par un simple raisonnement par récurrence !',
    wolof: '« Ngir xam ndax suite bi dafay yéeg walla wàcc : dangay def dₙ = uₙ₊₁ - uₙ. Bu dₙ ≥ 0, suite bi day yéeg ci kaw (croissante). Bu dₙ ≤ 0, day wàcc ci suuf (décroissante). »',
    vieReelle: 'Vérifier son solde d\'épargne chaque mois : si la différence Mois(n+1) - Mois(n) > 0, votre épargne s\'enrichit régulièrement.',
  },
  {
    num: 3,
    title: 'Théorème de Convergence Monotone',
    icon: 'cle_solution' as const,
    when: 'Pour prouver l\'existence de la limite sans calculer directement son expression',
    formule: `**Théorème Fondamental du Bac S2 :**

- **Toute suite CROISSANTE et MAJORÉE est convergente.**
- **Toute suite DÉCROISSANTE et MINORÉE est convergente.**

**Point fixe (Théorème de la limite) :**
Si $u_{n+1} = f(u_n)$ avec $f$ continue et $(u_n)$ converge vers $L$, alors la limite $L$ est solution de l'équation :
$$f(L) = L$$`,
    exemple: `On a prouvé que $(u_n)$ est croissante et que $u_n < 2$ pour tout $n$.
D'après le théorème de convergence monotone, $(u_n)$ converge vers un réel $L \\le 2$.

Si $u_{n+1} = \\sqrt{2 + u_n}$, alors $L = \\sqrt{2 + L} \\implies L^2 = 2 + L \\implies L^2 - L - 2 = 0$.
Les solutions sont $L = -1$ (rejetée car $u_n > 0$) ou $L = 2$.
Conclusion : $\\lim_{n \\to +\\infty} u_n = 2$.`,
    astuce: 'Le théorème de convergence monotone prouve SEULEMENT que la limite existe, il ne donne pas sa valeur numérique ! Il faut ensuite utiliser l\'équation de point fixe f(L) = L pour trouver L.',
    wolof: '« Bu suite bi di yéeg ci kaw saa su nekk (croissante) te am plafon M bu ko tëj (majorée), faw mu am bérab L bu mu ciy taxaw : loolu mooy convergence monotone. Ba noppi ngir wër L, dangay résoudre f(L) = L ! »',
    vieReelle: 'L\'eau dans un réservoir fermé : le niveau monte à chaque pluie mais ne peut dépasser la dalle supérieure en béton étanche.',
  },
  {
    num: 4,
    title: 'Suites Géométriques & Limite de qⁿ',
    icon: 'formule_cle' as const,
    when: 'Cas de la suite auxiliaire $v_n = u_n - \\alpha$ très fréquente au Bac',
    formule: `**Définition :** $v_{n+1} = q \\times v_n$

- **Terme général :** $v_n = v_0 \\times q^n$ (ou $v_n = v_p \\times q^{n-p}$)
- **Somme des termes :** $S_n = v_0 \\times \\dfrac{1 - q^{n+1}}{1 - q} \\quad (q \\neq 1)$

**Limite fondamentale de $q^n$ :**
- Si $|q| < 1$ ($-1 < q < 1$) : $\\lim_{n \\to +\\infty} q^n = 0$
- Si $q > 1$ : $\\lim_{n \\to +\\infty} q^n = +\\infty$
- Si $q = 1$ : suite constante $q^n = 1$
- Si $q \\le -1$ : n'admet pas de limite`,
    exemple: `$v_{n+1} = \\dfrac{1}{3} v_n$ avec $v_0 = 6$.

$v_n = 6 \\times \\left(\\dfrac{1}{3}\\right)^n$.

Comme $-1 < \\dfrac{1}{3} < 1$, on a $\\lim_{n \\to +\\infty} \\left(\\dfrac{1}{3}\\right)^n = 0$.
Donc $\\lim_{n \\to +\\infty} v_n = 0$.`,
    astuce: 'Dans un problème de Bac S2, 90 % des suites auxiliaires vₙ sont géométriques de raison q comprise entre -1 et 1, ce qui permet de déduire immédiatement la limite de uₙ !',
    wolof: '« Suite géométrique vₙ = v₀ · qⁿ : bu raison bi q nekk ci diggante -1 ak 1 (melni 1/2 walla 1/3), boo dem ba ca infini qⁿ day wàcc ba tollook zéro ! Loolu moo lay may nga xam limite wu uₙ bu gawaan. »',
    vieReelle: 'Diviser un tas de mil par 3 à chaque étape : après quelques partages, la portion restante devient infime et tend vers 0.',
  },
];

export default function SuitesReflexesCard() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const active = SUITES_METHODES[activeTab];

  const pillColors = [
    'from-turquoise to-emerald-500',
    'from-amber-500 to-orange-500',
    'from-purple-500 to-indigo-600',
    'from-rose-500 to-pink-600',
  ];

  return (
    <section className="bg-white rounded-2xl border border-navy/10 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy via-[#143048] to-[#0e2438] p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-1">
          <StudyIcon name="formule_cle" size={28} className="text-turquoise" />
          <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
            Fiche Réflexe — Suites Numériques
          </h2>
        </div>
        <p className="text-white/60 text-xs sm:text-sm font-medium">
          Les 4 piliers indispensables pour réussir l&apos;exercice de suites au Bac S2
        </p>

        {/* Tab Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
          {SUITES_METHODES.map((m, idx) => (
            <button
              key={m.num}
              onClick={() => setActiveTab(idx)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all active:scale-95 ${
                activeTab === idx
                  ? `bg-gradient-to-r ${pillColors[idx]} text-white shadow-md`
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <StudyIcon name={m.icon} size={16} />
              <span className="truncate">{m.num}. {m.title.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Panel */}
      <div className="p-5 sm:p-6 space-y-5">
        {/* When to use */}
        <div className="bg-turquoise/5 border border-turquoise/20 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <StudyIcon name="cible_reflexe" size={16} className="text-turquoise" />
            <span className="text-xs font-bold text-turquoise uppercase tracking-wider">Quand l&apos;utiliser ?</span>
          </div>
          <MathRenderer content={active.when} />
        </div>

        {/* Formula Box */}
        <div className="bg-navy/3 border border-navy/15 rounded-xl p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-3">
            <StudyIcon name="formule_cle" size={16} className="text-navy" />
            <span className="text-xs font-bold text-navy/70 uppercase tracking-wider">Théorèmes & Méthode Rigoureuse</span>
          </div>
          <div className="overflow-x-auto">
            <MathRenderer content={active.formule} />
          </div>
        </div>

        {/* Example */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <StudyIcon name="exemple_loupe" size={16} className="text-amber-600" />
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Exemple type Bac résolu</span>
          </div>
          <div className="overflow-x-auto">
            <MathRenderer content={active.exemple} />
          </div>
        </div>

        {/* Astuce */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <StudyIcon name="conseil_professeur" size={16} className="text-emerald-600" />
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Conseil & Réflexe d&apos;Examen</span>
          </div>
          <p className="text-sm text-emerald-900 leading-relaxed">{active.astuce}</p>
        </div>

        {/* Décodage en Wolof */}
        <div className="bg-amber-500/10 rounded-xl p-3 border border-amber-500/25 text-xs text-amber-950">
          <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
            <span>🇸🇳</span>
            <span>Xam-xam ci Wolof (Décodage) :</span>
          </div>
          <p className="italic text-amber-900 leading-relaxed font-medium">
            {active.wolof}
          </p>
        </div>

        {/* Illustration de la Vie Réelle */}
        <div className="bg-indigo-50/90 rounded-xl p-3 border border-indigo-200 text-xs text-indigo-950">
          <div className="flex items-center gap-1.5 font-bold text-indigo-900 mb-1">
            <span>🌍</span>
            <span>Illustration Concrète au Sénégal :</span>
          </div>
          <p className="text-indigo-900 leading-relaxed">
            {active.vieReelle}
          </p>
        </div>

        {/* Pills nav bottom */}
        <div className="flex justify-center gap-2 pt-2">
          {SUITES_METHODES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${
                activeTab === idx ? 'bg-turquoise scale-125' : 'bg-navy/20 hover:bg-navy/40'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

