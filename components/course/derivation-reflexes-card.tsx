'use client';

import React, { useState } from 'react';
import StudyIcon from '@/components/ui/study-icon';
import MathRenderer from '@/components/course/math-renderer';

const METHODES = [
  {
    num: 1,
    title: 'Dérivées Usuelles à Connaître par Cœur',
    icon: 'formule_cle' as const,
    when: 'Premier réflexe avant tout calcul : identifier le type de fonction',
    formule: `| Fonction $f(x)$ | Dérivée $f'(x)$ |
|:---:|:---:|
| $k$ (constante) | $0$ |
| $x^n$ | $n x^{n-1}$ |
| $\\sqrt{x}$ | $\\dfrac{1}{2\\sqrt{x}}$ |
| $\\dfrac{1}{x}$ | $-\\dfrac{1}{x^2}$ |
| $e^x$ | $e^x$ |
| $\\ln x$ | $\\dfrac{1}{x}$ |
| $\\sin x$ | $\\cos x$ |
| $\\cos x$ | $-\\sin x$ |`,
    exemple: `$f(x) = 3x^4 - 2\\sqrt{x} + e^x \\implies f'(x) = 12x^3 - \\dfrac{1}{\\sqrt{x}} + e^x$`,
    astuce: 'Mémorisez ce tableau en le réécrivant 5 fois sans regarder. Au Bac, chaque dérivée mal calculée fait perdre toute la chaîne de résolution.',
    wolof: '« Tableau bi dafa melni alfabet : faw nga xam ko ci sa bopp. Bu dee x^n, puissance bi day wàcc ci kanam (n) te sa puissance waññeeku benn (n-1). e^x nak moom mooy kenn ki du soppiku muk ci dérivée ! »',
    vieReelle: 'Les briques de base d\'un maçon : chaque fonction élémentaire a sa règle de transformation immuable pour bâtir l\'étude complète de la courbe.',
  },
  {
    num: 2,
    title: 'Règles de Calcul : Produit & Quotient',
    icon: 'technique_outils' as const,
    when: 'Dès que la fonction est un produit $u \\cdot v$ ou un quotient $\\frac{u}{v}$',
    formule: `**Produit :** $(u \\cdot v)' = u' \\cdot v + u \\cdot v'$

**Quotient :** $\\left(\\dfrac{u}{v}\\right)' = \\dfrac{u'v - uv'}{v^2}$

**Puissance :** $(u^n)' = n \\cdot u' \\cdot u^{n-1}$`,
    exemple: `$f(x) = x^2 \\cdot e^x$, posons $u = x^2$, $v = e^x$

$u' = 2x$, $v' = e^x$

$f'(x) = 2x \\cdot e^x + x^2 \\cdot e^x = xe^x(2 + x)$`,
    astuce: 'Mnémotechnique pour le quotient : « Dérivée du haut fois bas, moins haut fois dérivée du bas, le tout sur bas au carré ».',
    wolof: '« Bu ñaar lëjaleey (produit u·v) : ku nekk day ñówal boppam ci sa tour ! Kenn ki dériver geneen bi taxaw, nga yokk ko keneen ki dériver ki jëkk bi taxaw. Ci quotient nak, bu la fatte soustraction bi ci kaw ak v² ci suuf ! »',
    vieReelle: 'Deux chauffeurs qui se relaient sur la route Dakar - Tambacounda : l\'un conduit pendant que l\'autre se repose, puis on inverse.',
  },
  {
    num: 3,
    title: 'Dérivée de Fonction Composée',
    icon: 'methode_fleche' as const,
    when: 'Quand la fonction est du type $f(u(x))$ — une fonction appliquée à une autre',
    formule: `$(f \\circ u)' = u' \\times f'(u)$

Formes usuelles composées :
- $(e^{u})' = u' \\cdot e^{u}$
- $(\\ln u)' = \\dfrac{u'}{u}$  
- $(\\sqrt{u})' = \\dfrac{u'}{2\\sqrt{u}}$
- $(u^n)' = n \\cdot u' \\cdot u^{n-1}$`,
    exemple: `$g(x) = e^{x^2 - 3x}$, ici $u = x^2 - 3x$

$u' = 2x - 3$

$g'(x) = (2x - 3) \\cdot e^{x^2 - 3x}$`,
    astuce: "Identifiez toujours d'abord la fonction \"enveloppe\" f et la fonction \"intérieure\" u. Dérivez l'intérieure et multipliez. Ne jamais oublier le u' !",
    wolof: '« Fonction composée dafa melni mbokk mu lëjaloo : bala ngay dériver enveloppe bi ci biti f(u), faw nga génne dérivée bi ci biir u\' nga faf ko ci kanam ! Bu la fatte u\' bi ci e^u walla ln(u). »',
    vieReelle: 'Éplucher une mangue ou ouvrir un colis : pour atteindre le cœur u, il faut d\'abord franchir la couche protectrice et multiplier par sa variation u\'.',
  },
  {
    num: 4,
    title: 'Tableau de Variation : Méthode Complète',
    icon: 'rigueur_compas' as const,
    when: 'Pour étudier les variations, extremums et dresser le tableau',
    formule: `**Étapes :**
1. Calculer $f'(x)$
2. Résoudre $f'(x) = 0$ → trouver les valeurs critiques
3. Étudier le signe de $f'(x)$ sur chaque intervalle
4. Déduire : $f' > 0 \\Rightarrow f$ croissante ; $f' < 0 \\Rightarrow f$ décroissante
5. Calculer $f$ aux valeurs critiques (extremums)`,
    exemple: `$f(x) = x^3 - 3x$ sur $\\mathbb{R}$

$f'(x) = 3x^2 - 3 = 3(x-1)(x+1)$

$f'(x) = 0 \\Rightarrow x = -1$ ou $x = 1$

| $x$ | $-\\infty$ | $-1$ | $1$ | $+\\infty$ |
|:---:|:---:|:---:|:---:|:---:|
| $f'(x)$ | $+$ | $0$ | $-$ | $0$ | $+$ |
| $f$ | $\\nearrow$ | $2$ | $\\searrow$ | $-2$ | $\\nearrow$ |`,
    astuce: 'Au Bac S2, le tableau de variation doit absolument inclure les limites aux bornes ! Calculez $\\lim_{x \\to \\pm\\infty} f(x)$ pour compléter correctement les flèches.',
    wolof: '« Tableau de variation mooy carte routière wu fonction bi : f\'(x) = 0 mooy bérab yu yoon bi di jàppale noom (maximum walla minimum). Signe (+) mooy yéeg ci kaw, signe (-) mooy wàcc ci suuf ! »',
    vieReelle: 'Le profil d\'étape du Tour cycliste du Sénégal : les bosses correspondent aux sommets où la pente s\'annule avant la descente.',
  },
];

export default function DerivationReflexesCard() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const active = METHODES[activeTab];

  const pillColors = [
    'from-turquoise to-cyan-500',
    'from-amber-500 to-orange-500',
    'from-purple-500 to-violet-600',
    'from-emerald-500 to-teal-500',
  ];

  return (
    <section className="bg-white rounded-2xl border border-navy/10 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy via-[#143048] to-[#0e2438] p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-1">
          <StudyIcon name="formule_cle" size={28} className="text-turquoise" />
          <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
            Fiche Réflexe — Dérivation
          </h2>
        </div>
        <p className="text-white/60 text-xs sm:text-sm font-medium">
          Les 4 outils indispensables au Bac S2 — à maîtriser parfaitement
        </p>

        {/* Tab Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
          {METHODES.map((m, idx) => (
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
              <span className="truncate">{m.num}. {m.title.split(':')[0]}</span>
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
            <span className="text-xs font-bold text-navy/70 uppercase tracking-wider">Formules</span>
          </div>
          <div className="overflow-x-auto">
            <MathRenderer content={active.formule} />
          </div>
        </div>

        {/* Example */}
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <StudyIcon name="exemple_loupe" size={16} className="text-amber-600" />
            <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Exemple résolu</span>
          </div>
          <div className="overflow-x-auto">
            <MathRenderer content={active.exemple} />
          </div>
        </div>

        {/* Astuce */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <StudyIcon name="conseil_professeur" size={16} className="text-emerald-600" />
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">Conseil du Professeur</span>
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
          {METHODES.map((_, idx) => (
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

