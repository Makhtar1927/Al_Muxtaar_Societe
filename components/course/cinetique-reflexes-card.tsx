'use client';

import React, { useState } from 'react';
import MathRenderer from '@/components/course/math-renderer';

export default function CinetiqueReflexesCard() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const REFLEXES = [
    {
      num: 1,
      title: 'Les 3 Facteurs Cinétiques Majeurs',
      badge: 'Cours & Notions',
      formule: '\\text{Vitesse } v \\nearrow \\iff T \\nearrow, \\quad [\\text{Réactifs}] \\nearrow, \\quad \\text{Catalyseur}',
      regleBac:
        'Un facteur cinétique est un paramètre qui modifie la vitesse d\'une réaction sans changer la nature des produits formés.',
      explication:
        '1. **Température** : une augmentation de $T$ augmente l\'énergie cinétique des molécules et la fréquence des chocs efficaces.\n2. **Concentration des réactifs** : plus le milieu est concentré, plus les entités chimiques sont rapprochées, plus les chocs sont probables.\n3. **Catalyseur** : espèce chimique qui accélère la réaction et se retrouve intacte en fin de réaction (il n\'apparaît pas dans l\'équation-bilan globale).',
      wolof:
        '« Xoolal toggu ceebu jën : bu safara gi tàngée lool togg bi dafay gaaw (température). Su réactifs yi baree naka nit ñu fess del ci marché Sandaga, dañuy daccante lu bare (concentration). Catalyseur mooy wassila buy gaawal wax ji te du ca bokk ! »',
      piege:
        'Ne confondez pas catalyseur et réactif ! Le catalyseur est régénéré à la fin et ne modifie JAMAIS l\'avancement final $x_\\text{max}$.',
    },
    {
      num: 2,
      title: 'Vitesse Volumique & Pente de la Tangente',
      badge: 'Méthode Graphique',
      formule: 'v(t) = \\frac{1}{V} \\frac{dx}{dt} \\quad \\text{ou} \\quad v_\\text{disp}(A) = -\\frac{1}{V} \\frac{d[A]}{dt}',
      regleBac:
        'Graphiquement, $\\frac{dx}{dt}$ à la date $t$ est égal au coefficient directeur (pente) de la tangente à la courbe $x = f(t)$ au point d\'abscisse $t$.',
      explication:
        'Pour calculer la vitesse au Bac S2 :\n1. Tracer proprement la tangente à la date $t$ demandée.\n2. Choisir deux points bien espacés $A(t_A, x_A)$ et $B(t_B, x_B)$ sur cette tangente.\n3. Calculer la pente : $a = \\frac{x_B - x_A}{t_B - t_A}$.\n4. Diviser par le volume total du mélange $V$ : $v = \\frac{a}{V}$.\n5. Indiquer l\'unité correcte : $\\text{mol} \\cdot \\text{L}^{-1} \\cdot \\text{s}^{-1}$ ou $\\text{mmol} \\cdot \\text{L}^{-1} \\cdot \\text{min}^{-1}$.',
      wolof:
        '« Vitesse bi mooy pente u tangente bi ! Ci ndoorte li ($t = 0$), tangente bi dafay taxaw temm (vitesse maximale). Ay minutes ci kanam, day tëdd ndànk ndax réactifs yi ñoo ngi jeex (vitesse bi di waññiku). »',
      piege:
        'N\'oubliez jamais de diviser par le volume total $V$ du mélange réactionnel ! Si $V = 100\\text{ mL} = 0{,}1\\text{ L}$, la vitesse volumique est 10 fois plus grande que la dérivée $\\frac{dx}{dt}$.',
    },
    {
      num: 3,
      title: 'Temps de Demi-Réaction (t₁/₂)',
      badge: 'Définition Officielle',
      formule: 'x(t_{1/2}) = \\frac{x_\\text{max}}{2} \\quad \\text{ou} \\quad [\\text{Produit}](t_{1/2}) = \\frac{[\\text{Produit}]_\\text{final}}{2}',
      regleBac:
        'Le temps de demi-réaction $t_{1/2}$ est la durée au bout de laquelle l\'avancement $x$ atteint la moitié de sa valeur finale $x_\\text{max}$.',
      explication:
        'Méthode au Bac S2 :\n1. Lire la valeur finale maximale $x_\\text{max}$ sur le plateau de la courbe.\n2. Diviser cette valeur par 2 : $\\frac{x_\\text{max}}{2}$.\n3. Reporter cette ordonnée sur la courbe et projeter orthogonalement sur l\'axe des abscisses pour lire $t_{1/2}$.',
      wolof:
        '« $t_{1/2}$ mooy waxtu bi nga soxla ngir togg bi ñor ci digg bi (moitié). Boo xoolée kocc bi ci kaw $x_\\text{max}$, dagg ko ci ñaar $x_\\text{max}/2$, nga wàcc ci suuf jël waxtu bi ! »',
      piege:
        'Attention : $t_{1/2}$ n\'est PAS la moitié de la durée totale de la réaction ! Comme la vitesse diminue au cours du temps, la seconde moitié de la réaction est beaucoup plus lente que la première.',
    },
    {
      num: 4,
      title: 'La Trempe Chimique & Dosage du Diiode',
      badge: 'Technique Expérimentale',
      formule: '\\text{Trempe} \\implies T \\to 0^\\circ\\text{C} \\text{ et/ou dilution} \\implies v \\approx 0',
      regleBac:
        'La trempe consiste à refroidir brutalement le mélange réactionnel (dans un bain d\'eau glacée) ou à le diluer massivement afin d\'arrêter instantanément la réaction.',
      explication:
        'Pourquoi trempe-t-on avant le dosage au Bac S2 ?\nParce que le dosage prend quelques minutes. Si la réaction continuait pendant qu\'on verse la burette, la quantité de diiode $I_2$ augmenterait et la mesure ne correspondrait plus à l\'instant $t$ recherché !',
      wolof:
        '« Trempe dafa melni dëpp togg bi ci galaas bu sedd guyy : da ngay taxawal réaction bi cak ci instant $t$ ngir nga mën ko natt ci burette bi te li ciy génn du soppiku ! »',
      piege:
        'La trempe n\'annule pas les produits déjà formés ! Elle bloque simplement l\'avancement ultérieur.',
    },
    {
      num: 5,
      title: 'Les 3 Pièges Mortels du Bac S2 en Chimie',
      badge: 'Anti-Erreurs Bac',
      formule: 'x_\\text{max}(\\text{avec catalyseur}) = x_\\text{max}(\\text{sans catalyseur})',
      regleBac:
        'Les erreurs récurrentes sanctionnées par les correcteurs de l\'Office du Baccalauréat sénégalais.',
      explication:
        '1. **Confondre vitesse volumique et vitesse de disparition** : pour $2 I^-$, la vitesse de disparition de $I^-$ est le DOUBLE de la vitesse de réaction car son coefficient stœchiométrique est 2 : $v_\\text{disp}(I^-) = 2 v$.\n2. **Croire que le catalyseur augmente le rendement** : FAUX ! Il accélère seulement la réaction. Les deux courbes rejoignent exactement la même asymptote horizontale $x_\\text{max}$.\n3. **Oublier le signe moins pour un réactif** : comme la quantité d\'un réactif diminue, $\\frac{d[R]}{dt} < 0$. Donc la vitesse de disparition s\'écrit avec un signe moins : $v_\\text{disp} = -\\frac{d[R]}{dt} > 0$.',
      wolof:
        '« Moytul ñaari njuumte : 1. Catalyseur du yokk $x_\\text{max}$, dafay gaawal yoon bi rekk ! 2. Réactif bi dafay wàcc, kon dindi ko am na signe (-) bala nga koy wax vitesse ! »',
      piege:
        'Une vitesse est TOUJOURS une grandeur strictement positive ($v \\ge 0$). Si vous trouvez une vitesse négative, c\'est que vous avez oublié le signe moins du réactif !',
    },
  ];

  const current = REFLEXES[activeTab];

  return (
    <div className="my-6 rounded-3xl border border-navy/15 bg-white p-4 sm:p-6 shadow-sm">
      {/* En-tête */}
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy/10 pb-3">
        <h3 className="text-base sm:text-lg font-black text-navy flex items-center gap-2">
          <span>🎯</span>
          <span>Fiche Réflexe Bac S2 : Cinétique Chimique</span>
        </h3>
        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
          Chimie Terminale S2
        </span>
      </div>

      {/* Boutons d'onglets horizontaux défilables */}
      <div className="mt-4 flex gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
        {REFLEXES.map((ref, idx) => (
          <button
            key={ref.num}
            onClick={() => setActiveTab(idx)}
            className={`whitespace-nowrap rounded-xl px-3 py-2 text-xs font-black transition-all ${
              activeTab === idx
                ? 'bg-navy text-white shadow-sm'
                : 'bg-surface text-navy/70 hover:bg-navy/10'
            }`}
          >
            {ref.num}. {ref.title.split('&')[0]}
          </button>
        ))}
      </div>

      {/* Contenu de l'onglet actif */}
      <div className="mt-4 rounded-2xl bg-surface/60 p-4 sm:p-5 border border-navy/8 space-y-4">
        {/* Titre & Formule */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block">
              {current.badge}
            </span>
            <h4 className="text-base font-black text-navy">{current.title}</h4>
          </div>
          <div className="rounded-xl bg-white px-3 py-1.5 border border-navy/10 shadow-xs">
            <MathRenderer content={`$${current.formule}$`} />
          </div>
        </div>

        {/* Règle Bac & Explications */}
        <div className="rounded-xl bg-white p-3.5 border border-navy/10 space-y-2">
          <p className="text-xs font-bold text-navy leading-snug">
            📌 {current.regleBac}
          </p>
          <div className="text-xs text-navy/80 leading-relaxed whitespace-pre-line">
            <MathRenderer content={current.explication} />
          </div>
        </div>

        {/* Wolof & Piège côte à côte */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
          <div className="rounded-xl border border-gold/30 bg-gold-light/40 p-3 space-y-1">
            <span className="text-[11px] font-black text-[#8A5A00] flex items-center gap-1">
              <span>🗣️</span> Xam-xam ci Wolof
            </span>
            <p className="text-xs text-navy/85 leading-relaxed italic">
              {current.wolof}
            </p>
          </div>

          <div className="rounded-xl border border-rose-200 bg-rose-50/70 p-3 space-y-1">
            <span className="text-[11px] font-black text-rose-800 flex items-center gap-1">
              <span>⚠️</span> Piège Fréquent au Bac
            </span>
            <p className="text-xs text-rose-950 leading-relaxed">
              {current.piege}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

