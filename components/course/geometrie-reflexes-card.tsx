'use client';

import React, { useState } from 'react';
import StudyIcon from '@/components/ui/study-icon';
import MathRenderer from '@/components/course/math-renderer';

const GEOMETRIE_METHODES = [
  {
    num: 1,
    title: "Vecteur Normal & Équation Cartésienne de Plan",
    icon: 'theoreme_equerre' as const,
    when: "Pour trouver l'équation d'un plan défini par 3 points non alignés ou par un point et un vecteur normal",
    formule: `**Équation générale d'un plan $(P)$ :**
$$(P) : ax + by + cz + d = 0$$

- Le vecteur $\\vec{n}(a, b, c)$ est un **vecteur normal** au plan $(P)$ (non nul).
- Deux vecteurs $\\vec{u}$ et $\\vec{v}$ non colinéaires du plan vérifient : $\\vec{n} \\cdot \\vec{u} = 0$ et $\\vec{n} \\cdot \\vec{v} = 0$.
- La constante $d$ s'obtient en remplaçant $x, y, z$ par les coordonnées d'un point $A(x_A, y_A, z_A) \\in (P)$ :
  $$d = -(a x_A + b y_A + c z_A)$$`,
    exemple: `On donne le point $A(1, -2, 3)$ et le vecteur normal $\\vec{n}(2, 1, -4)$ :
1. L'équation de $(P)$ s'écrit :
   $$2x + y - 4z + d = 0$$
2. Comme $A \\in (P)$ :
   $$2(1) + (-2) - 4(3) + d = 0 \\iff 2 - 2 - 12 + d = 0 \\iff d = 12$$
3. Équation cartésienne finale :
   $$(P) : 2x + y - 4z + 12 = 0$$`,
    astuce: 'Pour déterminer un vecteur normal à partir de 3 points A, B, C non alignés, calculez directement le produit vectoriel n = AB ∧ AC. Cela vous évite de résoudre un système à deux équations.',
    wolof: '« Plan (P) dafay am vecteur normal n(a, b, c) bu dëpp 90° ak suuf si. Boo amee ñetti point A, B, C bu leen boolee ci système bu méti : calculeel directement produit vectoriel AB ∧ AC, moo lay jox n sans faute ! »',
    vieReelle: 'Quand un maçon pose le niveau à bulle sur une dalle de béton à Dakar : le sol forme le plan (P), et la verticale du fil à plomb donne la direction du vecteur normal n(a,b,c).',
  },
  {
    num: 2,
    title: "Distance Point-Plan & Projeté Orthogonal H",
    icon: 'technique_outils' as const,
    when: "Pour calculer la distance d'un point à un plan ou déterminer les coordonnées de son projeté orthogonal",
    formule: `**Formule de la distance d'un point $A$ à un plan $(P) : ax + by + cz + d = 0$ :**
$$d(A, P) = \\dfrac{|a x_A + b y_A + c z_A + d|}{\\sqrt{a^2 + b^2 + c^2}}$$

**Coordonnées du projeté orthogonal $H$ de $A$ sur $(P)$ :**
- $H$ appartient à la droite orthogonale à $(P)$ passant par $A$, donc :
  $$\\vec{AH} = k \\cdot \\vec{n} \\iff H(x_A + k a,\\; y_A + k b,\\; z_A + k c)$$
- En injectant les coordonnées de $H$ dans l'équation de $(P)$, on trouve $k$ puis $H$.`,
    exemple: `Calculer la distance du point $M(3, 1, 0)$ au plan $(P) : 2x - 2y + z + 5 = 0$ :
1. Calcul du numérateur en valeur absolue :
   $$|2(3) - 2(1) + 0 + 5| = |6 - 2 + 5| = |9| = 9$$
2. Calcul du dénominateur (norme du vecteur normal) :
   $$\\sqrt{2^2 + (-2)^2 + 1^2} = \\sqrt{4 + 4 + 1} = \\sqrt{9} = 3$$
3. Distance :
   $$d(M, P) = \\dfrac{9}{3} = 3$$`,
    astuce: 'N\'oubliez JAMAIS les barres de valeur absolue au numérateur ! Une distance est toujours positive. Si le résultat donne 0, c\'est que le point appartient au plan.',
    wolof: '« Distance d(A, P) mooy fil à plomb bi ngay wàcce ci kaw ba ci suuf ci point H. Numérateur bi dafay nekk ci valeur absolue (distance du négatif !), dénominateur bi di norme u vecteur normal bi √(a²+b²+c²). »',
    vieReelle: 'Mesurer la hauteur libre sous un pont de l\'échangeur de la Patte d\'Oie : c\'est calculer la distance orthogonale entre le tablier en béton et la chaussée le long du vecteur normal vertical.',
  },
  {
    num: 3,
    title: "Représentation Paramétrique & Intersection Droite-Plan",
    icon: 'formule_cle' as const,
    when: "Pour décrire une droite passant par un point A avec vecteur u et trouver son point de percée dans un plan",
    formule: `**Système paramétrique de la droite $(D)$ passant par $A(x_0, y_0, z_0)$ et dirigée par $\\vec{u}(\\alpha, \\beta, \\gamma)$ :**
$$\\begin{cases} x = x_0 + \\alpha \\cdot t \\\\ y = y_0 + \\beta \\cdot t \\\\ z = z_0 + \\gamma \\cdot t \\end{cases} \\qquad (t \\in \\mathbb{R})$$

**Méthode de l'intersection $(D) \\cap (P)$ :**
1. Injecter $x(t), y(t), z(t)$ dans l'équation cartésienne de $(P) : ax + by + cz + d = 0$.
2. Résoudre l'équation du 1er degré pour trouver le paramètre $t_0$.
3. Calculer les coordonnées du point d'intersection en remplaçant $t$ par $t_0$.`,
    exemple: `Soit la droite $(D) : \\begin{cases} x = 1 + 2t \\\\ y = -1 + t \\\\ z = 3 - t \\end{cases}$ et le plan $(P) : x + 2y + 3z - 6 = 0$.
1. Injection dans $(P)$ :
   $$(1 + 2t) + 2(-1 + t) + 3(3 - t) - 6 = 0$$
   $$1 + 2t - 2 + 2t + 9 - 3t - 6 = 0 \\iff t + 2 = 0 \\iff t = -2$$
2. Coordonnées du point de percée $K$ :
   $$x = 1 + 2(-2) = -3, \\quad y = -1 + (-2) = -3, \\quad z = 3 - (-2) = 5$$
   $$K(-3, -3, 5)$$`,
    astuce: 'Si l\'équation en t donne 0t = k (avec k ≠ 0), la droite est strictement parallèle au plan (pas d\'intersection). Si 0t = 0, la droite est entièrement contenue dans le plan.',
    wolof: '« Droite (D) bu am vecteur directeur u(α, β, γ) ak point A : dafa am ñetti équation paramétrique x(t), y(t), z(t). Boo bëggee xam fu mu dugg ci plan (P), da ngay injecter x, y, z ci équation du plan, falu t₀, nga dellu calcul coordinates du point ! »',
    vieReelle: 'Imaginez la trajectoire d\'une flèche ou d\'un tir de laser vers une cible plane : le système paramétrique donne la position seconde par seconde, et la résolution en t donne l\'instant exact et le point d\'impact dans le panneau.',
  },
  {
    num: 4,
    title: "Sphères & Sections Planes (Cercle de rayon r)",
    icon: 'rigueur_compas' as const,
    when: "Pour étudier l'intersection d'une sphère S(Ω, R) avec un plan (P) et calculer le rayon du cercle",
    formule: `**Équation cartésienne de la sphère $\\mathcal{S}(\\Omega(a,b,c), R)$ :**
$$(x - a)^2 + (y - b)^2 + (z - c)^2 = R^2$$

**Position relative avec un plan $(P)$ (en posant $d = d(\\Omega, P)$) :**
- **Cas 1 : $d < R$ :** Le plan coupe la sphère selon un **cercle** de centre $H$ (projeté orthogonal de $\\Omega$ sur $P$) et de rayon :
  $$r = \\sqrt{R^2 - d^2}$$
- **Cas 2 : $d = R$ :** Le plan est **tangent** à la sphère en un unique point $H$.
- **Cas 3 : $d > R$ :** L'intersection est **vide** ($\\mathcal{S} \\cap (P) = \\emptyset$).`,
    exemple: `Soit la sphère $\\mathcal{S}$ de centre $\\Omega(1, 2, -1)$ et de rayon $R = 5$, et le plan $(P)$ tel que $d(\\Omega, P) = 3$.
Puisque $d = 3 < 5$, le plan $(P)$ coupe la sphère selon un cercle.
Le rayon de ce cercle de section est :
$$r = \\sqrt{R^2 - d^2} = \\sqrt{5^2 - 3^2} = \\sqrt{25 - 9} = \\sqrt{16} = 4$$`,
    astuce: 'Le triplet (d, r, R) forme un triangle rectangle d\'hypoténuse R (théorème de Pythagore : d² + r² = R²). Pensez toujours aux triplets pythagoriciens usuels (3, 4, 5) fréquents au Bac.',
    wolof: '« Sphère S(Ω, R) ak Plan (P) : calculal distance d = d(Ω, P). Bu d < R, plan bi dafay dog sphère bi ci cercle bu am rayon r = √(R² - d²). Triplet (d, r, R) mooy triangle rectangle ci Pythagore ! »',
    vieReelle: 'Couper une pastèque ou une orange bien ronde avec un couteau à plat : la tranche découpée est toujours un disque circulaire parfait, dont le rayon r diminue à mesure que le couteau s\'éloigne du centre.',
  },
  {
    num: 5,
    title: "Produit Vectoriel, Aire de Triangle & Volume",
    icon: 'cle_solution' as const,
    when: "Pour trouver un vecteur normal, calculer l'aire d'un triangle ou le volume d'un tétraèdre",
    formule: `**Produit vectoriel de $\\vec{u}(x, y, z)$ et $\\vec{v}(x', y', z')$ :**
$$\\vec{u} \\wedge \\vec{v} = \\begin{pmatrix} yz' - zy' \\\\ zx' - xz' \\\\ xy' - yx' \\end{pmatrix}$$

**Applications géométriques au Bac S2 :**
1. **Orthogonalité simultanée :** $\\vec{u} \\wedge \\vec{v}$ est orthogonal à la fois à $\\vec{u}$ et à $\\vec{v}$.
2. **Aire d'un triangle $ABC$ :**
   $$\\mathcal{A}(ABC) = \\dfrac{1}{2} \\|\\vec{AB} \\wedge \\vec{AC}\\|$$
3. **Volume du tétraèdre $ABCD$ :**
   $$\\mathcal{V}(ABCD) = \\dfrac{1}{6} |(\\vec{AB} \\wedge \\vec{AC}) \\cdot \\vec{AD}| = \\dfrac{1}{3} \\mathcal{A}(ABC) \\times h$$`,
    exemple: `Soit $\\vec{AB}(1, 2, 0)$ et $\\vec{AC}(0, 3, 2)$ :
1. Calcul du produit vectoriel :
   $$\\vec{AB} \\wedge \\vec{AC} = \\begin{pmatrix} (2)(2) - (0)(3) \\\\ (0)(0) - (1)(2) \\\\ (1)(3) - (2)(0) \\end{pmatrix} = \\begin{pmatrix} 4 \\\\ -2 \\\\ 3 \\end{pmatrix}$$
2. Norme :
   $$\\|\\vec{AB} \\wedge \\vec{AC}\\| = \\sqrt{4^2 + (-2)^2 + 3^2} = \\sqrt{16 + 4 + 9} = \\sqrt{29}$$
3. Aire du triangle $ABC$ :
   $$\\mathcal{A}(ABC) = \\dfrac{\\sqrt{29}}{2} \\text{ unités d'aire}$$`,
    astuce: 'Attention à la 2ème composante du produit vectoriel : c\'est z x\' - x z\' (ou l\'opposé du déterminant 2x2). C\'est l\'erreur de signe numéro 1 commise par les élèves.',
    wolof: '« Produit vectoriel u ∧ v da lay jox vecteur bu orthogonal ci u ak v ci benn yoon. Aire du triangle ABC mooy xaaju norme bi : (1/2)||AB ∧ AC||. Volume tétraèdre ABCD mooy (1/6)|(AB ∧ AC) · AD| ! »',
    vieReelle: 'Calculer la superficie d\'une parcelle de terrain triangulaire inclinée aux flancs de la falaise de Popenguine ou le volume d\'un hangar pyramidal à l\'AIBD se fait directement grâce au produit vectoriel.',
  },
];

export default function GeometrieReflexesCard() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const active = GEOMETRIE_METHODES[selectedIdx];

  return (
    <div className="bg-white rounded-2xl border border-navy/10 shadow-sm p-4 sm:p-6 mb-8">
      {/* Header Mobile First */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-navy/10 pb-4 mb-6">
        <div className="flex items-start sm:items-center gap-3">
          <div className="p-2.5 rounded-xl bg-turquoise/10 text-turquoise shrink-0 mt-0.5 sm:mt-0">
            <StudyIcon name="theoreme_equerre" size={24} />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-navy break-words">
              Fiches Réflexes : Géométrie dans l&apos;Espace au Bac S2
            </h3>
            <p className="text-xs sm:text-sm text-navy/60">
              Les 5 méthodes indispensables pour maîtriser les plans, droites et sphères
            </p>
          </div>
        </div>
        <span className="self-start sm:self-center px-3 py-1 bg-turquoise/10 text-turquoise text-xs font-semibold rounded-full shrink-0 whitespace-nowrap">
          Spécial Baccalauréat
        </span>
      </div>

      {/* Tabs navigation */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-thin">
        {GEOMETRIE_METHODES.map((methode, idx) => (
          <button
            key={methode.num}
            onClick={() => setSelectedIdx(idx)}
            className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all shrink-0 flex items-center gap-2 ${
              selectedIdx === idx
                ? 'bg-navy text-white shadow-sm'
                : 'bg-navy/5 text-navy/70 hover:bg-navy/10'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                selectedIdx === idx
                  ? 'bg-turquoise text-navy'
                  : 'bg-navy/10 text-navy'
              }`}
            >
              {methode.num}
            </span>
            <span className="truncate max-w-[150px] sm:max-w-none">
              {methode.title.split(':')[0]}
            </span>
          </button>
        ))}
      </div>

      {/* Content panel */}
      <div className="space-y-6">
        {/* When to use */}
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200/60 flex items-start gap-3">
          <div className="text-amber-600 shrink-0 mt-0.5">
            <StudyIcon name="cible_reflexe" size={20} />
          </div>
          <div>
            <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-0.5">
              Quand dégainer ce réflexe ?
            </span>
            <p className="text-xs sm:text-sm text-amber-900 font-medium">
              {active.when}
            </p>
          </div>
        </div>

        {/* Formula */}
        <div className="p-4 sm:p-5 rounded-xl bg-navy/5 border border-navy/10">
          <div className="flex items-center gap-2 mb-3 text-navy font-bold text-sm">
            <StudyIcon name="formule_cle" size={18} />
            <span>Formules Clés &amp; Théorèmes Fondamentaux</span>
          </div>
          <div className="text-xs sm:text-sm text-navy/90 overflow-x-auto">
            <MathRenderer content={active.formule} />
          </div>
        </div>

        {/* Concrete Example */}
        <div className="p-4 sm:p-5 rounded-xl bg-emerald-50/60 border border-emerald-200/60">
          <div className="flex items-center gap-2 mb-3 text-emerald-800 font-bold text-sm">
            <StudyIcon name="exercice_crayon" size={18} />
            <span>Exemple Rédigé Type Baccalauréat</span>
          </div>
          <div className="text-xs sm:text-sm text-emerald-950 overflow-x-auto">
            <MathRenderer content={active.exemple} />
          </div>
        </div>

        {/* Tip / Pitfall */}
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200/60 flex items-start gap-3">
          <div className="text-blue-600 shrink-0 mt-0.5">
            <StudyIcon name="ampoule_astuce" size={20} />
          </div>
          <div>
            <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block mb-0.5">
              Astuce du Correcteur &amp; Piège à éviter
            </span>
            <p className="text-xs sm:text-sm text-blue-900">
              {active.astuce}
            </p>
          </div>
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
      </div>
    </div>
  );
}
