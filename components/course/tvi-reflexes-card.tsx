'use client';

import React, { useState } from 'react';
import StudyIcon from '@/components/ui/study-icon';
import MathRenderer from '@/components/course/math-renderer';

export default function TviReflexesCard() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const METHODES = [
    {
      num: 1,
      title: 'Les 3 Conditions de Rédaction Type Bac',
      icon: 'rigueur_compas',
      when: 'Pour prouver l\'existence et l\'unicité de la racine $\\alpha$ sur $[a, b]$',
      formule: '1. Continuité • 2. Stricte monotonie • 3. $f(a) \\times f(b) < 0$',
      exemple: '« $f$ est continue et strictement croissante sur $[0, 1]$. De plus $f(0) = -2 < 0$ et $f(1) = 2 > 0$, donc $0 \\in [f(0), f(1)]$. D\'après le théorème de la bijection, $f(x) = 0$ admet une unique solution $\\alpha \\in ]0, 1[$. »',
      astuce: 'N\'omettez jamais le mot STRICTEMENT devant croissante ou décroissante. Sans ce mot, l\'unicité n\'est pas garantie et le jury retire des points.',
      wolof: '« 3 teggi yu am solo : faw nga bind ne fonction bi dafa wéy te dogul (continue), dafay yéeg rekk walla wàcc rekk te du soppi yoon (strictement monotone), te f(a) ak f(b) benn bi positif geneen bi négatif. Bu loolu amee, faw mu am benn bérab α fu f(α) = 0 ! »',
      vieReelle: 'Traverser un pont à sens unique entre deux rives d\'altitude différente : vous ne sautez pas (continuité), vous avancez sans reculer (monotonie stricte), et vous partez du sous-sol pour arriver au sommet (changement de signe). Vous traversez le niveau 0 obligatoirement une seule fois.',
    },
    {
      num: 2,
      title: 'Tableau de Signe Déduit de α',
      icon: 'cle_solution',
      when: 'Indispensable pour étudier le signe de la dérivée dans la Partie B',
      formule: '$x < \\alpha \\implies f(x) < 0 \\quad | \\quad x = \\alpha \\implies f(x) = 0 \\quad | \\quad x > \\alpha \\implies f(x) > 0$',
      exemple: 'Puisque $f$ est croissante et $f(\\alpha) = 0$, $f(x)$ est strictement négatif avant $\\alpha$ et strictement positif après $\\alpha$.',
      astuce: 'Si la fonction était STRICTEMENT DÉCROISSANTE, le signe serait inversé : positif avant α et négatif après α.',
      wolof: '« α mooy digg bi : bala nga ko agsi yangi ci suuf (négatif), boo ko rombee yangi ci kaw (positif). Ci α ci boppam la tollook zéro. Bu fonction bi daan wàcc (décroissante), dafay doon positif bala α te négatif ginaaw α ! »',
      vieReelle: 'Niveau d\'une marée : avant l\'instant pivot α, l\'eau est sous la barre repère (négatif). À l\'instant précis α, l\'eau atteint le repère (zéro). Après α, elle monte au-dessus (positif).',
    },
    {
      num: 3,
      title: 'Encadrement par Balayage (Calculatrice)',
      icon: 'calculatrice',
      when: 'Déterminer une valeur approchée de $\\alpha$ à $10^{-1}$ ou $10^{-2}$ près',
      formule: 'Calculer $f(x)$ par pas de $0,1$ jusqu\'à observer le changement de signe',
      exemple: '$g(0,5) = -0,375 < 0$ et $g(0,6) = +0,016 > 0 \\implies 0,5 < \\alpha < 0,6$.',
      astuce: 'Sur votre calculatrice, utilisez le mode TABLE avec un pas (Step) de 0,1 puis de 0,01.',
      wolof: '« Balayage ci calculatrice dafa yomb : dangay seet ban ñaari valeur yu jegeñ ñoo am signe yu wute (benn bi négatif geneen bi positif). Foofu la α lëju ci diggante bi ! »',
      vieReelle: 'Régler la mise au point d\'une caméra ou d\'un microscope : vous avancez pas à pas d\'un millimètre jusqu\'à voir l\'image passer de floue à nette.',
    },
  ];

  return (
    <div className="my-6 rounded-3xl border border-navy/15 bg-white p-4 sm:p-6 shadow-sm">
      {/* En-tête */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy/10 pb-3">
        <h3 className="text-base sm:text-lg font-black text-navy flex items-center gap-2">
          <StudyIcon name="cible_reflexe" size={22} />
          <span>Fiche Réflexe Bac : TVI &amp; Bijection</span>
        </h3>
        <span className="text-[11px] font-bold text-turquoise bg-turquoise/10 px-2.5 py-0.5 rounded-full border border-turquoise/20">
          Terminale S2
        </span>
      </div>

      {/* Les 3 piliers du TVI en cartes mobiles */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-4">
        <div className="p-3 rounded-2xl bg-emerald-50/80 border border-emerald-200">
          <div className="flex items-center gap-1.5 text-emerald-800 font-black text-xs uppercase tracking-wider mb-1">
            <StudyIcon name="correct" size={15} />
            <span>1. Continuité</span>
          </div>
          <div className="text-xs text-emerald-950 font-medium leading-snug">
            Courbe continue sans rupture (somme, produit, quotient de fonctions usuelles).
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-amber-50/80 border border-amber-200">
          <div className="flex items-center gap-1.5 text-amber-800 font-black text-xs uppercase tracking-wider mb-1">
            <StudyIcon name="courbe_fonction" size={15} />
            <span>2. Monotonie Stricte</span>
          </div>
          <div className="text-xs text-amber-950 font-medium leading-snug">
            <MathRenderer content="Dérivée $f'(x)$ de signe constant non nul pour garantir l'unicité de $\alpha$." />
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-cyan-50/80 border border-cyan-200">
          <div className="flex items-center gap-1.5 text-cyan-800 font-black text-xs uppercase tracking-wider mb-1">
            <StudyIcon name="theoreme_equerre" size={15} />
            <span>3. Traversée de 0</span>
          </div>
          <div className="text-xs text-cyan-950 font-medium leading-snug">
            <MathRenderer content="$f(a) \times f(b) < 0$ ou $0 \in f(I)$ : la courbe traverse obligatoirement l'axe des abscisses." />
          </div>
        </div>
      </div>

      {/* Onglets tactiles des 3 Méthodes */}
      <div className="mt-4">
        <div className="flex items-center gap-1 overflow-x-auto pb-1 border-b border-navy/10">
          {METHODES.map((m, idx) => (
            <button
              key={m.num}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                activeTab === idx
                  ? 'bg-navy text-white shadow-sm'
                  : 'bg-surface hover:bg-navy/5 text-navy/70'
              }`}
            >
              <StudyIcon name={m.icon as any} size={15} />
              <span>Méthode {m.num}</span>
            </button>
          ))}
        </div>

        {/* Détail de la méthode active */}
        <div className="mt-4 p-4 rounded-2xl bg-surface/60 border border-navy/10 space-y-3 animate-in fade-in-50 duration-200">
          <div>
            <h4 className="text-sm font-black text-navy flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-turquoise text-white text-[11px] font-black flex items-center justify-center">
                {METHODES[activeTab].num}
              </span>
              <span>{METHODES[activeTab].title}</span>
            </h4>
            <div className="text-xs text-text/60 mt-0.5">
              <span>Quand l&apos;utiliser : </span>
              <strong className="text-navy font-semibold">
                <MathRenderer content={METHODES[activeTab].when} />
              </strong>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-white border border-navy/10">
            <p className="text-[11px] font-bold text-navy/50 uppercase tracking-wider mb-1">
              Règle &amp; Formule clé :
            </p>
            <div className="text-xs sm:text-sm font-bold text-navy">
              <MathRenderer content={METHODES[activeTab].formule} />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-200/80">
            <p className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-1">
              Exemple de rédaction type Bac S2 :
            </p>
            <div className="text-xs text-emerald-950 italic leading-relaxed">
              <MathRenderer content={METHODES[activeTab].exemple} />
            </div>
          </div>

          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900">
            <StudyIcon name="ampoule_astuce" size={18} className="shrink-0 mt-0.5" />
            <p className="leading-snug">
              <strong>Conseil du jury : </strong>
              {METHODES[activeTab].astuce}
            </p>
          </div>

          {/* Décodage en Wolof */}
          <div className="bg-amber-500/10 rounded-xl p-3 border border-amber-500/25 text-xs text-amber-950">
            <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1">
              <span>🇸🇳</span>
              <span>Xam-xam ci Wolof (Décodage) :</span>
            </div>
            <p className="italic text-amber-900 leading-relaxed font-medium">
              {METHODES[activeTab].wolof}
            </p>
          </div>

          {/* Illustration de la Vie Réelle */}
          <div className="bg-indigo-50/90 rounded-xl p-3 border border-indigo-200 text-xs text-indigo-950">
            <div className="flex items-center gap-1.5 font-bold text-indigo-900 mb-1">
              <span>🌍</span>
              <span>Illustration Concrète au Sénégal :</span>
            </div>
            <p className="text-indigo-900 leading-relaxed">
              {METHODES[activeTab].vieReelle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

