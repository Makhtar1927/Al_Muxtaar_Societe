'use client';

import React, { useState } from 'react';
import StudyIcon from '@/components/ui/study-icon';
import MathRenderer from '@/components/course/math-renderer';

const ASYMPTOTES_METHODES = [
  {
    num: 1,
    title: 'Asymptote Verticale & Horizontale',
    icon: 'formule_cle' as const,
    when: 'Dès que vous calculez les limites aux bornes de l\'ensemble de définition',
    formule: `**Asymptote Verticale :**
Si $\\lim_{x \\to x_0^\\pm} f(x) = \\pm\\infty$, alors la droite $(D) : x = x_0$ est asymptote verticale à $\\mathcal{C}_f$.

**Asymptote Horizontale :**
Si $\\lim_{x \\to \\pm\\infty} f(x) = L$ (réel fini), alors la droite $(\\Delta) : y = L$ est asymptote horizontale à $\\mathcal{C}_f$ au voisinage de $\\pm\\infty$.`,
    exemple: `Soit $f(x) = \\dfrac{2x + 1}{x - 3}$.

1. En $x = 3$ : $\\lim_{x \\to 3^+} f(x) = +\\infty \\implies$ Droite $x = 3$ asymptote verticale.
2. En $\\pm\\infty$ : $\\lim_{x \\to \\pm\\infty} \\dfrac{2x}{x} = 2 \\implies$ Droite $y = 2$ asymptote horizontale.`,
    astuce: 'Mnémotechnique Bac : « Si le x tend vers un nombre et donne l\'infini, l\'asymptote est verticale (x = nombre). Si le x va à l\'infini et donne un nombre, l\'asymptote est horizontale (y = nombre) ».',
    wolof: '« Naka ngay fàtlikoo asymptotes yi ? Bu x bi jegeñsi benn nimero x₀ te réponse bi di infini (±∞), droite bi dafay taxaw (verticale x = x₀). Bu x bi dem ba ca infini te réponse bi di benn nimero L, droite bi dafay tëdd (horizontale y = L) ! »',
    vieReelle: 'Verticale = Le mur infranchissable où la courbe s\'envole sans jamais toucher la roche ; Horizontale = La piste d\'atterrissage de l\'AIBD où l\'avion stabilise son altitude.',
  },
  {
    num: 2,
    title: 'Asymptote Oblique : Les 2 Méthodes',
    icon: 'technique_outils' as const,
    when: 'Lorsque $\\lim_{x \\to \\pm\\infty} f(x) = \\pm\\infty$ et qu\'une droite $y = ax + b$ est candidate',
    formule: `**Méthode 1 (La plus rapide si l'équation est donnée) :**
Démontrer que :
$$\\lim_{x \\to \\pm\\infty} [f(x) - (ax + b)] = 0$$

**Méthode 2 (Algorithme de recherche si l'équation est inconnue) :**
1. Calculer $a = \\lim_{x \\to \\pm\\infty} \\dfrac{f(x)}{x}$ (avec $a \\neq 0$)
2. Calculer $b = \\lim_{x \\to \\pm\\infty} [f(x) - ax]$
3. Si $b \\in \\mathbb{R}$, alors $y = ax + b$ est asymptote oblique.`,
    exemple: `$f(x) = 2x - 1 + \\dfrac{3}{x+2}$.

Calculons $\\lim_{x \\to +\\infty} [f(x) - (2x - 1)] = \\lim_{x \\to +\\infty} \\dfrac{3}{x+2} = 0$.

Conclusion : La droite $(D) : y = 2x - 1$ est asymptote oblique à $\\mathcal{C}_f$ en $+\\infty$.`,
    astuce: 'Ne partez pas dans le calcul de a et b si le sujet du Bac vous donne déjà la forme : « Montrer que f(x) = ax + b + g(x) ». Il suffit de vérifier la limite de g(x) vers 0 !',
    wolof: '« Asymptote oblique y = ax + b : bu sujet Bac joxee déjà droite bi, dangay def lim [f(x) - (ax+b)] ci ±∞. Bu tolloo ak 0, droite bi asymptote la ! Buñ ko joxewul nak, faw nga calculé a = lim f(x)/x ba noppi nga calculé b = lim [f(x) - ax]. »',
    vieReelle: 'Deux rails du TER qui filent vers l\'horizon : la courbe épouse la droite guide avec un écart vertical qui devient imperceptible.',
  },
  {
    num: 3,
    title: 'Branches Paraboliques',
    icon: 'methode_fleche' as const,
    when: 'Quand $\\lim_{x \\to \\pm\\infty} f(x) = \\pm\\infty$ mais qu\'il n\'y a pas d\'asymptote oblique',
    formule: `On calcule systématiquement :
$$\\lim_{x \\to \\pm\\infty} \\dfrac{f(x)}{x}$$

- **Cas 1 :** Si $\\lim \\dfrac{f(x)}{x} = \\pm\\infty \\implies$ Branche parabolique de direction **$(Oy)$** (la courbe monte plus vite qu'une droite).
- **Cas 2 :** Si $\\lim \\dfrac{f(x)}{x} = 0 \\implies$ Branche parabolique de direction **$(Ox)$** (la courbe s'aplatit, ex: $\\sqrt{x}$ ou $\\ln x$).
- **Cas 3 :** Si $\\lim \\dfrac{f(x)}{x} = a \\neq 0$ mais $\\lim [f(x) - ax] = \\pm\\infty \\implies$ Branche parabolique de direction la droite $y = ax$.`,
    exemple: `$g(x) = x^2 - 3x$ en $+\\infty$ : $\\lim_{x \\to +\\infty} \\dfrac{g(x)}{x} = +\\infty \\implies$ Branche parabolique de direction $(Oy)$.

$h(x) = \\sqrt{x}$ en $+\\infty$ : $\\lim_{x \\to +\\infty} \\dfrac{\\sqrt{x}}{x} = 0 \\implies$ Branche parabolique de direction $(Ox)$.`,
    astuce: 'Au Bac S2, retenir : l\'exponentielle amène une branche verticale en +∞ (croissance rapide), tandis que le logarithme amène une branche horizontale en +∞ (croissance lente).',
    wolof: '« Branche parabolique mooy bu courbe bi amul droite bu ko tëj : bu lim f(x)/x = ±∞, courbe bi dafay yéeg gawaan jëm ci kaw (direction Oy, naka x² walla e^x). Bu lim f(x)/x = 0, dafay tëdd jëm ci kanam (direction Ox, naka √x walla ln x) ! »',
    vieReelle: 'Une fusée qui s\'élance à la verticale vers les étoiles (Oy) vs une flèche tirée à ras de terre qui poursuit sa course à plat (Ox).',
  },
  {
    num: 4,
    title: 'Position Relative : Courbe vs Asymptote',
    icon: 'rigueur_compas' as const,
    when: 'Question systématique au Bac : « Étudier la position relative de (Cf) par rapport à (D) »',
    formule: `**Règle d'or :** Étudier le SIGNE de la différence :
$$d(x) = f(x) - y_{(D)}$$

- Si $d(x) > 0 \\implies \\mathcal{C}_f$ est **strictement au-dessus** de $(D)$.
- Si $d(x) < 0 \\implies \\mathcal{C}_f$ est **strictement au-dessous** de $(D)$.
- Si $d(x) = 0 \\implies \\mathcal{C}_f$ et $(D)$ se **coupent** au point $(x_k, y_k)$.`,
    exemple: `$f(x) = x + 1 - \\dfrac{e^x}{e^x + 1}$, asymptote $(D) : y = x + 1$.

$d(x) = f(x) - (x + 1) = -\\dfrac{e^x}{e^x + 1}$.

Comme $e^x > 0$ et $e^x + 1 > 0$, on a $d(x) < 0$ pour tout $x$.
Conclusion : $\\mathcal{C}_f$ est **strictement en dessous** de $(D)$ sur $\\mathbb{R}$.`,
    astuce: 'Dressez toujours un petit tableau de signe pour d(x) si l\'expression change de signe : cela montre votre rigueur à l\'examinateur.',
    wolof: '« Position relative : dangay def soustraction bi d(x) = f(x) - y. Bu d(x) > 0, courbe bi mi ngi ci kaw droite bi ; bu d(x) < 0, mi ngi ci suuf droite bi. Bu d(x) = 0, ñaar ñi dañuy dajaloote foofu ! »',
    vieReelle: 'Savoir si l\'on circule sur le tablier supérieur d\'un pont à deux étages ou sur la voie inférieure.',
  },
];

export default function AsymptotesReflexesCard() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const active = ASYMPTOTES_METHODES[activeTab];

  const pillColors = [
    'from-rose-500 to-red-600',
    'from-amber-500 to-orange-500',
    'from-turquoise to-cyan-600',
    'from-purple-500 to-indigo-600',
  ];

  return (
    <section className="bg-white rounded-2xl border border-navy/10 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy via-[#143048] to-[#0e2438] p-5 sm:p-6">
        <div className="flex items-center gap-3 mb-1">
          <StudyIcon name="formule_cle" size={28} className="text-turquoise" />
          <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
            Fiche Réflexe — Asymptotes & Branches Infinies
          </h2>
        </div>
        <p className="text-white/60 text-xs sm:text-sm font-medium">
          Les 4 techniques incontournables pour réussir l&apos;étude aux bornes au Bac S2
        </p>

        {/* Tab Navigation */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4">
          {ASYMPTOTES_METHODES.map((m, idx) => (
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
            <span className="text-xs font-bold text-navy/70 uppercase tracking-wider">Théorèmes et Démarches</span>
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
          {ASYMPTOTES_METHODES.map((_, idx) => (
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

