'use client';

import React, { useState } from 'react';
import StudyIcon from '@/components/ui/study-icon';
import MathRenderer from '@/components/course/math-renderer';

const SIMILITUDES_METHODES = [
  {
    num: 1,
    title: "Écriture Complexe & Éléments Caractéristiques (Rapport, Angle, Centre)",
    icon: 'theoreme_equerre' as const,
    when: "Dès que l'énoncé donne une relation $z' = az + b$ ($a \\neq 0$) et demande de caractériser la transformation",
    formule: `**Soit $S$ la similitude directe d'écriture complexe $z' = az + b$ ($a \\in \\mathbb{C}^*, \\; b \\in \\mathbb{C}$) :**

1. **Rapport $k$ :**
   $$k = |a| > 0$$
2. **Angle $\\theta$ :**
   $$\\theta = \\arg(a) \\pmod{2\\pi}$$
3. **Centre invariant $\\Omega$ :**
   - Si $a = 1$ : pas de centre invariant (c'est la translation de vecteur $\\vec{u}$ d'affixe $b$).
   - Si $a \\neq 1$ : unique point fixe vérifiant $\\omega = a\\omega + b$, soit :
     $$\\omega = \\frac{b}{1 - a}$$
4. **Forme canonique réduite (fondamentale) :**
   $$z' - \\omega = k e^{i\\theta}(z - \\omega)$$
   Elle traduit la décomposition commutative : $S = h(\\Omega, k) \\circ r(\\Omega, \\theta) = r(\\Omega, \\theta) \\circ h(\\Omega, k)$.`,
    exemple: `Caractériser la similitude $S : z' = (1 + i\\sqrt{3})z + 2 - 2i\\sqrt{3}$ :

1. Paramètre $a = 1 + i\\sqrt{3}$ :
   - Rapport : $k = |a| = \\sqrt{1^2 + (\\sqrt{3})^2} = \\sqrt{4} = 2$.
   - Angle : $\\cos\\theta = \\frac{1}{2}$ et $\\sin\\theta = \\frac{\\sqrt{3}}{2} \\implies \\theta = \\frac{\\pi}{3} \\pmod{2\\pi}$.
2. Centre invariant $\\Omega$ d'affixe $\\omega$ :
   $$\\omega = \\frac{2 - 2i\\sqrt{3}}{1 - (1 + i\\sqrt{3})} = \\frac{2 - 2i\\sqrt{3}}{-i\\sqrt{3}} = \\frac{2}{-i\\sqrt{3}} + 2 = \\frac{2i}{\\sqrt{3}} + 2 = 2 + \\frac{2\\sqrt{3}}{3}i$$
Conclusion : $S$ est la similitude plane directe de centre $\\Omega\\left(2 + \\frac{2\\sqrt{3}}{3}i\\right)$, de rapport $k = 2$ et d'angle $\\theta = \\frac{\\pi}{3}$.`,
    astuce: 'Retenez immédiatement la forme réduite $z\' - \\omega = a(z - \\omega)$. Si a est un réel négatif (ex: a = -2), le rapport est k = |-2| = 2 et l\'angle est θ = π !',
    wolof: '« Similitude directe z\' = az + b dafa bolé ñaari mbir : rotation (wër ci angle θ) ak homothétie (agrandir wala réduire ci rapport k). Centre Ω mooy point invariant bi du jog mukk : ω = b / (1 - a) ! »',
    vieReelle: 'Le zoom tactile sur votre smartphone : lorsque vous posez deux doigts sur l\'écran pour agrandir une photo et la faire pivoter en même temps, le processeur graphique applique exactement une similitude plane directe dont le centre fixe est le point situé entre vos deux doigts.',
  },
  {
    num: 2,
    title: "Détermination d'une Similitude par Deux Points et Leurs Images",
    icon: 'rigueur_compas' as const,
    when: "Pour trouver l'écriture complexe de la similitude transformant A en A' et B en B' (avec A ≠ B et A' ≠ B')",
    formule: `**Théorème fondamental d'unicité :**
Il existe une **unique** similitude plane directe $S$ qui transforme $A$ en $A'$ et $B$ en $B'$.

**Formules directes des paramètres :**
1. **Coefficient directeur $a$ :**
   $$a = \\frac{z_{B'} - z_{A'}}{z_B - z_A}$$
2. **Constante $b$ :**
   $$b = z_{A'} - a \\cdot z_A \\quad \\text{(ou } b = z_{B'} - a \\cdot z_B\\text{)}$$
3. **Rapport et Angle géométriques :**
   $$k = \\frac{A'B'}{AB} = \\left|\\frac{z_{B'} - z_{A'}}{z_B - z_A}\\right| \\qquad \\theta = (\\vec{AB}, \\vec{A'B'}) \\pmod{2\\pi}$$`,
    exemple: `Déterminer la similitude directe $S$ transformant $A(1 + i)$ en $A'(3)$ et $B(2)$ en $B'(2 + 2i)$ :

1. Calcul de $a$ :
   $$a = \\frac{z_{B'} - z_{A'}}{z_B - z_A} = \\frac{(2 + 2i) - 3}{2 - (1 + i)} = \\frac{-1 + 2i}{1 - i}$$
   Multiplions par le conjugué $(1 + i)$ :
   $$a = \\frac{(-1 + 2i)(1 + i)}{1^2 - i^2} = \\frac{-1 - i + 2i - 2}{2} = \\frac{-3 + i}{2} = -\\frac{3}{2} + \\frac{1}{2}i$$
2. Calcul de $b$ :
   $$b = z_{A'} - a z_A = 3 - \\left(-\\frac{3}{2} + \\frac{1}{2}i\\right)(1 + i) = 3 - \\left(-\\frac{3}{2} - \\frac{3}{2}i + \\frac{1}{2}i - \\frac{1}{2}\\right) = 3 - (-2 - i) = 5 + i$$
Écriture complexe : $z' = \\left(-\\frac{3}{2} + \\frac{1}{2}i\\right)z + 5 + i$.`,
    astuce: 'Pour vérifier rapidement votre calcul : réinjectez les coordonnées de B dans z\' et vérifiez que vous retrouvez exactement z_{B\'} !',
    wolof: '« ÑAARI POINTS REKK DOY NA : boo amee ñaari points A ak B ak seen nataal A\' ak B\', coefficient a mooy quotient d\'affixes bi : a = (z_B\' - z_A\') / (z_B - z_A). Dafa melni pente wu droite ci analyse ! »',
    vieReelle: 'Comme le calibrage d\'un projecteur vidéo ou d\'une carte satellite : en calant exactement deux repères au sol (ex: l\'Aéroport de Diass et la Place de l\'Indépendance), toute la carte du Sénégal est instantanément positionnée et mise à l\'échelle.',
  },
  {
    num: 3,
    title: "Construction Géométrique & Triangles Semblables du Centre Ω",
    icon: 'technique_outils' as const,
    when: "Lorsque l'énoncé demande de construire ou de justifier géométriquement la position du centre Ω sans calcul complexe",
    formule: `**Propriété des triangles semblables au centre $\\Omega$ :**
Puisque $S(\\Omega) = \\Omega$, $S(A) = A'$ et $S(B) = B'$ :

1. **Rapports de distances conservés :**
   $$\\frac{\\Omega A'}{\\Omega A} = \\frac{\\Omega B'}{\\Omega B} = k$$
2. **Angles orientés conservés :**
   $$(\\vec{\\Omega A}, \\vec{\\Omega A'}) = (\\vec{\\Omega B}, \\vec{\\Omega B'}) = \\theta \\pmod{2\\pi}$$

**Conséquence géométrique majeure :**
- Les triangles $\\Omega A A'$ et $\\Omega B B'$ sont **directement semblables**.
- $\\Omega$ est situé à l'intersection des **cercles capables** d'angles orientés $\\theta$ construits sur $[AA']$ et $[BB']$.
- Si $(AB)$ et $(A'B')$ sont sécantes en $I$, $\\Omega$ est le point d'intersection des cercles circonscrits aux triangles formés par les sécantes (Théorème du point de Miquel).`,
    exemple: `Soit un carré direct $ABCD$ de centre $O$. Soit $S$ la similitude transformant $A$ en $B$ et $B$ en $C$.
Déterminer ses éléments caractéristiques :
1. Rapport : $k = \\frac{BC}{AB} = 1$ (car c'est un carré).
2. Angle : $\\theta = (\\vec{AB}, \\vec{BC}) = \\frac{\\pi}{2} \\pmod{2\\pi}$.
3. Centre : Le point $O$ vérifie $OA = OB$ et $(\\vec{OA}, \\vec{OB}) = \\frac{\\pi}{2}$. Donc $\\Omega = O$.
Conclusion : $S$ est la rotation de centre $O$ et d'angle $\\frac{\\pi}{2}$ !`,
    astuce: 'Si k = 1, la similitude est une isométrie (rotation ou translation). Si θ = 0 ou π, la similitude est une homothétie.',
    wolof: '« Centre Ω dafa am xarala gu réy : boo xoolee diggante Ω ak A ak A\', triangle bi dafay niróok triangle Ω ak B ak B\' ci lépp : même angle θ ak même rapport k ! »',
    vieReelle: 'L\'effet spirale des coquillages (nautile) ou des galaxies : chaque spire est l\'image de la précédente par une similitude directe de même centre Ω.',
  },
  {
    num: 4,
    title: "Images de Configurations Géométriques & Piège d'Or des Aires (k²)",
    icon: 'cible_reflexe' as const,
    when: "Pour déterminer l'image d'une droite, d'un segment, d'un cercle ou calculer l'aire d'une figure transformée",
    formule: `**Transformation des objets géométriques par une similitude $S(\\Omega, k, \\theta)$ :**

1. **Image d'une droite $(D)$ :**
   C'est une droite $(D')$ faisant un angle $\\theta$ avec $(D)$ : $((D), (D')) = \\theta \\pmod\\pi$.
2. **Image d'un segment $[AB]$ :**
   C'est un segment $[A'B']$ de longueur $A'B' = k \\cdot AB$.
3. **Image d'un cercle $\\mathcal{C}(I, R)$ :**
   C'est le cercle $\\mathcal{C}'(I', R')$ avec :
   $$I' = S(I) \\qquad \\text{et} \\qquad R' = k \\cdot R$$
4. **Propriétés de conservation :**
   $S$ conserve les barycentres, le parallélisme, l'orthogonalité, les contacts (tangentes) et l'alignement.

> [!CAUTION]
> **LE PIÈGE N°1 DU BAC S2 SUR LES AIRES :**
> Si une figure plane a pour aire $\\mathcal{A}$, son image par $S$ a pour aire :
> $$\\mathbf{\\mathcal{A}' = k^2 \\times \\mathcal{A}}$$
> Ne multipliez JAMAIS par $k$, mais toujours par **$k^2$** !`,
    exemple: `Soit un disque $\\mathcal{D}$ de rayon $R = 3\\text{ cm}$ (aire $\\mathcal{A} = \\pi R^2 = 9\\pi\\text{ cm}^2$).
On lui applique la similitude $S$ de rapport $k = 4$ et d'angle $\\theta = \\frac{\\pi}{6}$ :
1. Rayon du disque image : $R' = k \\times R = 4 \\times 3 = 12\\text{ cm}$.
2. Aire du disque image :
   $$\\mathcal{A}' = \\pi R'^2 = \\pi (12)^2 = 144\\pi\\text{ cm}^2$$
   Par la formule directe : $\\mathcal{A}' = k^2 \\times \\mathcal{A} = 4^2 \\times (9\\pi) = 16 \\times 9\\pi = 144\\pi\\text{ cm}^2$. Le résultat est identique !`,
    astuce: 'Pour les volumes dans l\'espace, ce serait k³ ! Mais pour les similitudes planes du Bac S2, retenez fermement k² pour toute aire (triangle, polygone, disque).',
    wolof: '« BU CI JUM MUKK CI BAC : Longueur da ngay multiplier ak k, waaye Aire (plaque, disque, triangle) da ngay multiplier ak k² ! Bu k = 3, aire bi day yokk 9 yoon (3² = 9), du 3 yoon ! »',
    vieReelle: 'Lorsque vous faites doubler la taille (longueur k = 2) d\'un terrain ou d\'une pièce de tissu wax, la quantité de tissu nécessaire (la surface) est multipliée par 4 (2² = 4), pas par 2 !',
  },
  {
    num: 5,
    title: "Composée, Réciproque & Puissances de Similitudes",
    icon: 'cle_solution' as const,
    when: "Pour composer deux similitudes S₁ ∘ S₂, calculer S⁻¹ ou déterminer la nature de Sⁿ",
    formule: `**1. Composée de deux similitudes directes $S_1(k_1, \\theta_1)$ et $S_2(k_2, \\theta_2)$ :**
- $S = S_2 \\circ S_1$ est une similitude plane directe de :
  - Rapport : $k = k_1 \\cdot k_2$
  - Angle : $\\theta = \\theta_1 + \\theta_2 \\pmod{2\\pi}$
- En écriture complexe : si $S_1(z) = a_1 z + b_1$ et $S_2(z) = a_2 z + b_2$ :
  $$(S_2 \\circ S_1)(z) = a_2(a_1 z + b_1) + b_2 = (a_1 a_2) z + (a_2 b_1 + b_2)$$

**2. Similitude réciproque $S^{-1}$ :**
- Même centre invariant $\\Omega$
- Rapport : $k' = \\frac{1}{k}$
- Angle : $\\theta' = -\\theta \\pmod{2\\pi}$

**3. Puissances $S^n$ ($n \\in \\mathbb{N}^*$) :**
- Même centre $\\Omega$
- Rapport : $k_n = k^n$
- Angle : $\\theta_n = n \\cdot \\theta \\pmod{2\\pi}$`,
    exemple: `Soit $S$ la similitude de centre $\\Omega$, de rapport $k = \\sqrt{2}$ et d'angle $\\theta = \\frac{\\pi}{4}$.
Déterminer la nature exacte de $S^8$ :
1. Centre : $\\Omega$ reste invariant.
2. Rapport : $k_8 = (\\sqrt{2})^8 = ((\\sqrt{2})^2)^4 = 2^4 = 16$.
3. Angle : $\\theta_8 = 8 \\times \\frac{\\pi}{4} = 2\\pi \\equiv 0 \\pmod{2\\pi}$.
Conclusion : Puisque l'angle est nul modulo $2\\pi$, $S^8$ est tout simplement une **homothétie** de centre $\\Omega$ et de rapport $16$ !`,
    astuce: 'Pour annuler l\'angle de rotation, cherchez le plus petit entier n tel que n·θ = 2kπ. Alors Sⁿ devient une homothétie pure !',
    wolof: '« Boo bolée ñaari similitudes S₂ ∘ S₁ : rapport yi dañuy multiplier (k₁ · k₂), angle yi dañuy additionner (θ₁ + θ₂) ! Similitude réciproque S⁻¹ mooy dellu ginnaaw : même centre Ω, rapport 1/k, angle -θ. »',
    vieReelle: 'Comme une boîte de poupées russes ou un escalier en colimaçon : chaque marche tourne d\'un angle fixe θ et rétrécit d\'un facteur k. Après 8 marches (S⁸), vous êtes orienté dans la même direction exacte qu\'au départ !',
  },
];

export default function SimilitudesReflexesCard() {
  const [selectedNum, setSelectedNum] = useState<number>(1);
  const activeMethode = SIMILITUDES_METHODES.find((m) => m.num === selectedNum) || SIMILITUDES_METHODES[0];

  return (
    <section className="bg-white rounded-2xl border border-navy/10 p-5 sm:p-6 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-navy/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 font-bold text-xs">
              Chapitre M9 • Terminale S2
            </span>
            <span className="text-xs font-semibold text-text/50">Programme Officiel Sénégal</span>
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-navy mt-1">
            Les 5 Réflexes Clés — Similitudes Planes Directes
          </h2>
        </div>
        <div className="flex items-center gap-1.5 bg-surface px-3 py-1.5 rounded-xl border border-navy/10 text-xs font-semibold text-text/70">
          <StudyIcon name="formule_cle" size={16} />
          <span>Fiche Réflexe Épreuve Bac</span>
        </div>
      </div>

      {/* Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {SIMILITUDES_METHODES.map((m) => {
          const isSelected = m.num === selectedNum;
          return (
            <button
              key={m.num}
              onClick={() => setSelectedNum(m.num)}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 ${
                isSelected
                  ? 'border-emerald-500 bg-emerald-50/50 shadow-sm'
                  : 'border-navy/10 bg-white hover:bg-surface'
              }`}
            >
              <div className="flex items-center justify-between w-full">
                <span
                  className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center ${
                    isSelected ? 'bg-emerald-500 text-white' : 'bg-navy/5 text-navy/70'
                  }`}
                >
                  {m.num}
                </span>
                <StudyIcon name={m.icon} size={18} />
              </div>
              <span className="text-xs font-bold text-navy leading-tight line-clamp-2">
                {m.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Detailed Card Body */}
      <div className="bg-surface rounded-2xl p-5 border border-navy/10 space-y-5">
        <div>
          <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">
            Quand dégainer ce réflexe au Bac S2 ?
          </span>
          <p className="text-xs sm:text-sm font-semibold text-navy mt-0.5">
            {activeMethode.when}
          </p>
        </div>

        {/* Math Formula Block */}
        <div className="bg-white rounded-xl p-4 border border-navy/10 shadow-xs">
          <span className="text-[11px] font-bold text-navy/50 uppercase tracking-wider block mb-2">
            Formule Canonique & Démarche Mathématique
          </span>
          <MathRenderer content={activeMethode.formule} />
        </div>

        {/* Concrete Example */}
        <div className="bg-white rounded-xl p-4 border border-navy/10 shadow-xs">
          <span className="text-[11px] font-bold text-navy/50 uppercase tracking-wider block mb-2">
            Exemple Conforme Annales Bac Sénégal S2
          </span>
          <MathRenderer content={activeMethode.exemple} />
        </div>

        {/* Tip & Wolof Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Conseil Bac */}
          <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-200/60 flex items-start gap-3">
            <span className="text-lg">💡</span>
            <div>
              <p className="text-xs font-bold text-amber-900">Conseil d&apos;Examinateur Bac</p>
              <p className="text-xs text-amber-800/90 mt-0.5 leading-relaxed">
                {activeMethode.astuce}
              </p>
            </div>
          </div>

          {/* Wolof Insight */}
          <div className="p-3.5 rounded-xl bg-emerald-50/60 border border-emerald-200/60 flex items-start gap-3">
            <span className="text-lg">🇸🇳</span>
            <div>
              <p className="text-xs font-bold text-emerald-900">Xam-xam ci Wolof</p>
              <p className="text-xs text-emerald-800/90 mt-0.5 leading-relaxed italic">
                {activeMethode.wolof}
              </p>
            </div>
          </div>
        </div>

        {/* Real Life Metaphor */}
        <div className="p-3.5 rounded-xl bg-sky-50/60 border border-sky-200/60 flex items-start gap-3">
          <span className="text-lg">🌍</span>
          <div>
            <p className="text-xs font-bold text-sky-900">Application concrète au Sénégal</p>
            <p className="text-xs text-sky-800/90 mt-0.5 leading-relaxed">
              {activeMethode.vieReelle}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
