'use client';

import React, { useState } from 'react';
import StudyIcon from '@/components/ui/study-icon';
import MathRenderer from '@/components/course/math-renderer';

const ISOMETRIES_METHODES = [
  {
    num: 1,
    title: "Classification Fondamentale : Déplacements vs Antidéplacements",
    icon: 'theoreme_equerre' as const,
    when: "Dès que l'on doit déterminer la nature globale d'une isométrie ou analyser son écriture complexe",
    formule: `**Une isométrie $f$ conserve toutes les distances : $f(M)f(N) = MN$.**

Elle se classe immédiatement selon la conservation de l'orientation des angles orientés :

1. **Isométrie directe (Déplacement) :**
   - Conserve les angles orientés : $(\\vec{f(u)}, \\vec{f(v)}) = (\\vec{u}, \\vec{v}) \\pmod{2\\pi}$.
   - Écriture complexe générale :
     $$z' = e^{i\\theta} z + b \\quad (\\theta \\in \\mathbb{R}, \\; b \\in \\mathbb{C})$$
   - Types possibles : **Translation** (si $\\theta = 0$) ou **Rotation** (si $\\theta \\not\\equiv 0 \\pmod{2\\pi}$).

2. **Isométrie indirecte (Antidéplacement) :**
   - Inverse les angles orientés : $(\\vec{f(u)}, \\vec{f(v)}) = -(\\vec{u}, \\vec{v}) \\pmod{2\\pi}$.
   - Écriture complexe générale :
     $$z' = e^{i\\theta} \\overline{z} + b \\quad (\\theta \\in \\mathbb{R}, \\; b \\in \\mathbb{C})$$
   - Types possibles : **Réflexion axiale** $S_\\Delta$ ou **Symétrie glissée** $t_{\\vec{u}} \\circ S_\\Delta$ (avec $\\vec{u} \\neq \\vec{0}$).`,
    exemple: `Soit la transformation complexe $f : z' = -i \\overline{z} + 1 + i$.

1. La présence du conjugué $\\overline{z}$ avec coefficient $|-i| = 1$ prouve que $f$ est une **isométrie indirecte (antidéplacement)**.
2. Pour trancher entre réflexion axiale et symétrie glissée, on cherche les points invariants $z' = z$ :
   $$z = -i \\overline{z} + 1 + i$$
   En posant $z = x + iy$ :
   $$x + iy = -i(x - iy) + 1 + i = -ix - y + 1 + i = (1 - y) + i(1 - x)$$
   Par identification des parties réelle et imaginaire :
   $$\\begin{cases} x = 1 - y \\\\ y = 1 - x \\end{cases} \\iff x + y - 1 = 0$$
   L'ensemble des points fixes est la droite $(\\Delta) : x + y - 1 = 0$.
Conclusion : $f$ est la **réflexion axiale** d'axe $(\\Delta) : x + y - 1 = 0$.`,
    astuce: 'Regardez le coefficient devant z ou conjugué de z : si c\'est e^(iθ) z, c\'est direct (translation ou rotation) ; si c\'est e^(iθ) conjugué(z), c\'est indirect (réflexion ou symétrie glissée).',
    wolof: '« Isométrie mooy transformation bu dëgër ci distances yi : du yokk, du wàññi (rapport k = 1) ! Déplacement (direct) dafay baax ci angles yi, antidéplacement (indirect) dafay jàngat angle bi ba mu dellu ci wetu gannaaw ! »',
    vieReelle: 'Le miroir d\'un salon de coiffure à Sandaga : quand vous levez la main droite devant le miroir, votre reflet lève la main gauche ! C\'est l\'antidéplacement (réflexion) par excellence qui inverse l\'orientation gauche-droite.',
  },
  {
    num: 2,
    title: "L'Ensemble des Points Invariants Inv(f) — La Boussole du Bac S2",
    icon: 'cible_reflexe' as const,
    when: "Pour identifier avec certitude la nature exacte de n'importe quelle isométrie",
    formule: `**Table universelle de reconnaissance par l'ensemble des points invariants $\\text{Inv}(f) = \\{M \\in \\mathcal{P} \\mid f(M) = M\\}$ :**

| $\\text{Inv}(f)$ | Nature de $f$ | Caractérisation complète |
| :--- | :--- | :--- |
| **Tout le plan $\\mathcal{P}$** | **Identité $\\text{Id}$** | $f(M) = M$ pour tout $M$ |
| **Une droite $\\Delta$ entière** | **Réflexion axiale $S_\\Delta$** | Axe $\\Delta$, involutive ($S_\\Delta \\circ S_\\Delta = \\text{Id}$) |
| **Un unique point $\\{\\Omega\\}$** | **Rotation $r(\\Omega, \\theta)$** | Centre $\\Omega$, angle $\\theta \\not\\equiv 0 \\pmod{2\\pi}$ |
| **Ensemble vide $\\emptyset$ (Directe)** | **Translation $t_{\\vec{u}}$** | Vecteur non nul $\\vec{u} \\neq \\vec{0}$ |
| **Ensemble vide $\\emptyset$ (Indirecte)** | **Symétrie glissée** | Axe $\\Delta$ et vecteur directeur $\\vec{u} \\neq \\vec{0}$ |`,
    exemple: `Soit $f$ une isométrie telle que $f(A) = A$, $f(B) = B$ et $f(C) = C$ avec $A, B, C$ trois points **non alignés**.

Puisque $f$ admet trois points invariants non alignés, l'ensemble de ses points fixes ne peut être ni vide, ni un singleton, ni une droite.
Par le théorème fondamental des isométries :
$$\\text{Inv}(f) = \\mathcal{P} \\implies f = \\text{Id}$$
Si $A$ et $B$ étaient deux points fixes distincts ($A \\neq B$), alors tout point de la droite $(AB)$ serait invariant, et $f$ serait soit $\\text{Id}$, soit la réflexion $S_{(AB)}$.`,
    astuce: '2 points fixes distincts A et B => la droite (AB) entière est invariante ! Donc f est soit l\'identité Id, soit la réflexion axiale S_(AB). C\'est une question de cours classique au Bac S2.',
    wolof: '« Xoolal point fixe yi rekk : boo amee bénn point rekk mooy rotation ; boo amee droite yépp mooy réflexion axiale ; boo amul point fixe te mu direct mooy translation, su nekkee indirect mooy symétrie glissée ! »',
    vieReelle: 'Une porte de maison qui pivote sur ses gonds : la ligne des deux gonds reste totalement immobile pendant l\'ouverture. Elle constitue l\'axe invariant de la transformation dans l\'espace.',
  },
  {
    num: 3,
    title: "Décomposition d'une Isométrie en Réflexions Axiales",
    icon: 'cle_solution' as const,
    when: "Pour simplifier des composées ou démontrer qu'une transformation est une translation ou rotation",
    formule: `**1. Composée de deux réflexions d'axes parallèles (Translation) :**
Si $\\Delta_1 \\parallel \\Delta_2$ :
$$S_{\\Delta_2} \\circ S_{\\Delta_1} = t_{\\vec{u}}$$
- Le vecteur $\\vec{u}$ est orthogonal aux deux droites $\\Delta_1$ et $\\Delta_2$.
- Sa norme vaut le double de la distance séparant les deux droites :
  $$\\|\\vec{u}\\| = 2 \\times d(\\Delta_1, \\Delta_2)$$
- Le sens va de $\\Delta_1$ vers $\\Delta_2$.

**2. Composée de deux réflexions d'axes sécants (Rotation) :**
Si $\\Delta_1 \\cap \\Delta_2 = \\{\\Omega\\}$ :
$$S_{\\Delta_2} \\circ S_{\\Delta_1} = r(\\Omega, \\theta)$$
- Le centre est le point d'intersection $\\Omega$.
- L'angle est le double de l'angle orienté entre les deux axes :
  $$\\theta = 2(\\Delta_1, \\Delta_2) \\pmod{2\\pi}$$

**3. Théorème fondamental d'engendrement :**
Toute isométrie du plan est la composée d'au plus 3 réflexions axiales.`,
    exemple: `Soit un triangle équilatéral direct $ABC$ de centre $O$.
Déterminer la nature de la transformation $f = S_{(OC)} \\circ S_{(OA)}$ :

1. Les droites $(OA)$ et $(OC)$ sont sécantes au point $O$.
2. Donc $f$ est une rotation de centre $O$.
3. Angle de la rotation :
   $$\\theta = 2((\\vec{OA}, \\vec{OC})) \\pmod{2\\pi}$$
   Dans le triangle équilatéral direct, $(\\vec{OA}, \\vec{OC}) = \\frac{4\\pi}{3} \\equiv -\\frac{2\\pi}{3} \\pmod{2\\pi}$.
   D'où :
   $$\\theta = 2 \\times \\left(-\\frac{2\\pi}{3}\\right) = -\\frac{4\\pi}{3} \\equiv \\frac{2\\pi}{3} \\pmod{2\\pi}$$
Conclusion : $f$ est la **rotation de centre $O$ et d'angle $\\frac{2\\pi}{3}$** (qui transforme $A$ en $B$, $B$ en $C$, et $C$ en $A$).`,
    astuce: 'N\'oubliez jamais le facteur 2 dans l\'angle ! S_D2 ∘ S_D1 a pour angle 2(D1, D2), pas simplement (D1, D2). Et l\'ordre compte : S_D2 ∘ S_D1 va de D1 vers D2.',
    wolof: '« Ñaari réflexion axiale boo leen boolee : su fekkee droite yi dañoo parallèle, dafay jur translation bu double distance bi ! Su fekkee dañoo sécante ci point Ω, dafay jur rotation de centre Ω ak double angle bi ! »',
    vieReelle: 'Un kaléidoscope : en disposant deux miroirs formant un angle de 60°, chaque réflexion successive engendre des rotations de 120° et 240°, créant la symétrie hexagonale parfaite observée à l\'œil.',
  },
  {
    num: 4,
    title: "La Symétrie Glissée : Forme Canonique & La Propriété du Carré f²",
    icon: 'avertissement' as const,
    when: "Pour caractériser complètement une symétrie glissée (trouver son axe Δ et son vecteur u)",
    formule: `**Définition canonique d'une symétrie glissée $f$ :**
Toute symétrie glissée admet une décomposition commutative unique :
$$f = t_{\\vec{u}} \\circ S_\\Delta = S_\\Delta \\circ t_{\\vec{u}} \\quad (\\vec{u} \\neq \\vec{0}, \\; \\vec{u} \\text{ directeur de } \\Delta)$$

**1. La Propriété Magique du Carré (Le réflexe Bac S2) :**
$$f \\circ f = f^2 = t_{2\\vec{u}}$$
En effet :
$$f^2 = (t_{\\vec{u}} \\circ S_\\Delta) \\circ (t_{\\vec{u}} \\circ S_\\Delta) = t_{\\vec{u}} \\circ t_{\\vec{u}} \\circ S_\\Delta \\circ S_\\Delta = t_{2\\vec{u}} \\circ \\text{Id} = t_{2\\vec{u}}$$

**2. Méthode universelle pour trouver l'axe $\\Delta$ et le vecteur $\\vec{u}$ :**
- Choisir un point quelconque $A$ et calculer son image $A' = f(A)$ puis $A'' = f(A') = f^2(A)$.
- Le **vecteur $\\vec{u}$** est :
  $$\\vec{u} = \\frac{1}{2}\\vec{A A''}$$
- L'**axe $\\Delta$** est la droite passant par le milieu $I$ de $[A, f(A)]$ et de vecteur directeur $\\vec{u}$.`,
    exemple: `Soit une symétrie glissée $f$ telle que $f(A) = B$ et $f(B) = C$ avec $A(0, 1)$, $B(2, -1)$, $C(4, 1)$.

1. Calcul du vecteur $\\vec{u}$ par la propriété du carré :
   $$f^2(A) = f(B) = C \\implies f^2 = t_{2\\vec{u}} \\implies \\vec{AC} = 2\\vec{u}$$
   $$\\vec{AC} = \\begin{pmatrix} 4 - 0 \\\\ 1 - 1 \\end{pmatrix} = \\begin{pmatrix} 4 \\\\ 0 \\end{pmatrix} \\implies \\vec{u} = \\frac{1}{2}\\vec{AC} = \\begin{pmatrix} 2 \\\\ 0 \\end{pmatrix} = 2\\vec{i}$$
2. Détermination de l'axe $\\Delta$ :
   Le milieu $I$ du segment $[A, B]$ appartient obligatoirement à l'axe $\\Delta$ :
   $$x_I = \\frac{0 + 2}{2} = 1, \\quad y_I = \\frac{1 + (-1)}{2} = 0 \\implies I(1, 0)$$
   Puisque $\\vec{u} = 2\\vec{i}$ est horizontal, l'axe $\\Delta$ est la droite horizontale passant par $I(1, 0)$ :
   $$(\\Delta) : y = 0 \\quad (\\text{l'axe des abscisses !})$$
Conclusion : $f = t_{2\\vec{i}} \\circ S_{(Ox)} = S_{(Ox)} \\circ t_{2\\vec{i}}$.`,
    astuce: 'Pour toute symétrie glissée, le milieu de [M, f(M)] est TOUJOURS sur l\'axe Δ ! C\'est la méthode la plus rapide pour trouver l\'axe sans calcul lourd.',
    wolof: '« Symétrie glissée mooy jéego yi ci suuf géej gi (plage de Ngor) : boo tekkee tank càmmooñ, tank ndeyjoor bi dafay avancer (translation u) te dëpp (réflexion S_Δ). Boo def ñaari jéego (f ∘ f), da ngay am translation bu 2u ! »',
    vieReelle: 'Les empreintes de pas d\'un marcheur sur le sable fin de la plage de Ngor ou de Yoff : chaque pas avance d\'une distance u tout en changeant de pied (gauche/droite par rapport à l\'axe médian). C\'est la matérialisation parfaite d\'une symétrie glissée !',
  },
  {
    num: 5,
    title: "Détermination par 3 Points & Conservation des Propriétés Métriques",
    icon: 'methode_presse_papier' as const,
    when: "Pour identifier une isométrie à partir des images d'un triangle ABC",
    formule: `**Théorème fondamental de détermination :**
Soient $A, B, C$ trois points non alignés et $A', B', C'$ tels que :
$$A'B' = AB, \\quad A'C' = AC, \\quad B'C' = BC$$
Il existe **une unique isométrie** $f$ telle que :
$$f(A) = A', \\quad f(B) = B', \\quad f(C) = C'$$

**Critère d'orientation (Directe vs Indirecte) :**
- Si $(\\vec{A'B'}, \\vec{A'C'}) = (\\vec{AB}, \\vec{AC}) \\pmod{2\\pi}$ : $f$ est un **déplacement** (directe).
- Si $(\\vec{A'B'}, \\vec{A'C'}) = -(\\vec{AB}, \\vec{AC}) \\pmod{2\\pi}$ : $f$ est un **antidéplacement** (indirecte).

**Propriétés universellement conservées par toute isométrie :**
- Conservation des distances : $k = 1$.
- Conservation du barycentre et du milieu.
- Conservation de l'orthogonalité et du parallélisme.
- Conservation des aires : $\\text{Aire}(f(\\mathcal{F})) = 1^2 \\times \\text{Aire}(\\mathcal{F}) = \\text{Aire}(\\mathcal{F})$.
- Image d'un cercle $\\mathcal{C}(O, R)$ : cercle $\\mathcal{C}'(f(O), R)$ de **même rayon $R$**.`,
    exemple: `Soit $ABCD$ un carré direct de centre $O$.
Soit $f$ l'isométrie telle que $f(A) = B$, $f(B) = C$, $f(C) = D$.

1. Test d'orientation :
   $$(\\vec{AB}, \\vec{AD}) = +\\frac{\\pi}{2} \\pmod{2\\pi}$$
   $$(\\vec{f(A)f(B)}, \\vec{f(A)f(D)}) = (\\vec{BC}, \\vec{BA}) = -\\frac{\\pi}{2} \\neq +\\frac{\\pi}{2} \\pmod{2\\pi}$$
   L'angle orienté est transformé en son opposé : $f$ est un **antidéplacement**.
2. Points invariants :
   Puisque $f(A) = B$ et $f(B) = C$, aucun sommet n'est fixe.
   Cherchons si le centre $O$ est invariant :
   $O$ est le milieu de $[AC]$, donc $f(O)$ est le milieu de $[f(A)f(C)] = [BD]$, qui est aussi $O$ !
   Donc $f(O) = O$.
3. Conclusion :
   $f$ est un antidéplacement admettant au moins un point invariant $O$, c'est donc une **réflexion axiale** d'axe passant par $O$.
   La médiatrice de $[AB]$ passe par $O$, et transforme $A$ en $B$. Donc $f = S_\\Delta$ où $\\Delta$ est la médiatrice de $[AB]$ (axe médian du carré).`,
    astuce: 'Pour savoir si f est direct ou indirect avec un triangle, calculez le produit vectoriel ou comparez l\'ordre trigonométrique des sommets : A->B->C dans le sens anti-horaire transformé en A\'->B\'->C\' dans le même sens => direct ; sens inversé => indirect.',
    wolof: '« Boo amee triangle bu ñu transformer : xoolal ndax sens bi tourné na ak horloge bi wala déet ! Su nekkee sens bi changer wul, déplacement la (rotation wala translation) ; su sens bi renverser, antidéplacement la (réflexion wala symétrie glissée) ! »',
    vieReelle: 'Un carreleur posant des carreaux décoratifs à motifs asymétriques : s\'il fait pivoter le carreau sur le sol, c\'est un déplacement. S\'il doit retourner le carreau face contre terre pour faire correspondre le dessin, c\'est un antidéplacement !',
  },
];

export default function IsometriesReflexesCard() {
  const [activeTab, setActiveTab] = useState(0);
  const [showWolof, setShowWolof] = useState(false);

  const methode = ISOMETRIES_METHODES[activeTab];

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-500/20 my-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-indigo-500/20">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-2xl shadow-lg shadow-emerald-500/20">
            <StudyIcon name="theoreme_equerre" className="w-6 h-6 text-slate-950" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black tracking-widest text-emerald-400 uppercase bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                Fiche Réflexes M10 Bac S2
              </span>
              <span className="text-xs font-semibold text-slate-400">
                Isométries &amp; Transformations
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              Les 5 Méthodes d&apos;Or des Isométries du Plan
            </h3>
          </div>
        </div>

        <button
          onClick={() => setShowWolof(!showWolof)}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold transition-all border ${
            showWolof
              ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md shadow-amber-400/20'
              : 'bg-slate-800/80 text-amber-300 border-amber-400/30 hover:bg-slate-800'
          }`}
        >
          <span>🇸🇳</span>
          <span>{showWolof ? 'Masquer Wolof' : 'Xam-xam ci Wolof'}</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none">
        {ISOMETRIES_METHODES.map((m, idx) => (
          <button
            key={m.num}
            onClick={() => setActiveTab(idx)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === idx
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50'
            }`}
          >
            <span
              className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-black ${
                activeTab === idx ? 'bg-slate-950 text-emerald-400' : 'bg-slate-700 text-slate-300'
              }`}
            >
              {m.num}
            </span>
            <span>Méthode {m.num}</span>
          </button>
        ))}
      </div>

      {/* Active Method Details */}
      <div className="mt-4 bg-slate-800/40 rounded-2xl p-5 sm:p-6 border border-indigo-500/10 backdrop-blur-sm">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Méthode {methode.num} sur 5
            </span>
            <h4 className="text-lg sm:text-xl font-bold text-white mt-0.5">
              {methode.title}
            </h4>
          </div>
          <div className="p-2 bg-slate-700/50 rounded-xl text-emerald-400 border border-slate-600/40">
            <StudyIcon name={methode.icon} className="w-5 h-5" />
          </div>
        </div>

        {/* When to use */}
        <div className="mb-4 bg-indigo-950/40 border-l-4 border-emerald-400 px-4 py-2.5 rounded-r-xl">
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide">
            Quand dégainer ce réflexe ?
          </span>
          <p className="text-xs sm:text-sm text-slate-200 mt-0.5">
            {methode.when}
          </p>
        </div>

        {/* Formule */}
        <div className="mb-4 bg-slate-900/80 rounded-xl p-4 border border-slate-700/60">
          <span className="text-xs font-black text-teal-400 uppercase tracking-widest block mb-2">
            La Règle Théorique Fondamentale
          </span>
          <div className="text-sm text-slate-200 overflow-x-auto">
            <MathRenderer content={methode.formule} />
          </div>
        </div>

        {/* Exemple */}
        <div className="mb-4 bg-slate-900/60 rounded-xl p-4 border border-emerald-500/20">
          <span className="text-xs font-black text-emerald-400 uppercase tracking-widest block mb-2">
            Exemple d&apos;Application Type Bac S2
          </span>
          <div className="text-sm text-slate-300 overflow-x-auto">
            <MathRenderer content={methode.exemple} />
          </div>
        </div>

        {/* Astuce */}
        <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-3.5 flex items-start gap-3">
          <StudyIcon name="ampoule_astuce" className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-black text-amber-400 uppercase tracking-wider block">
              Astuce Anti-Piège Bac S2
            </span>
            <p className="text-xs sm:text-sm text-amber-200/90 mt-0.5">
              {methode.astuce}
            </p>
          </div>
        </div>

        {/* Wolof Box (if toggled) */}
        {showWolof && (
          <div className="mt-4 bg-emerald-950/40 border border-emerald-400/40 rounded-xl p-3.5 flex items-start gap-3 animate-fadeIn">
            <span className="text-xl">🇸🇳</span>
            <div>
              <span className="text-xs font-black text-emerald-300 uppercase tracking-wider block">
                Xam-xam ci Wolof
              </span>
              <p className="text-xs sm:text-sm text-emerald-100 italic mt-0.5">
                {methode.wolof}
              </p>
            </div>
          </div>
        )}

        {/* Vie Réelle */}
        <div className="mt-4 bg-sky-950/30 border border-sky-400/30 rounded-xl p-3.5 flex items-start gap-3">
          <StudyIcon name="etincelles" className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-xs font-black text-sky-300 uppercase tracking-wider block">
              Dans la Vie Réelle au Sénégal
            </span>
            <p className="text-xs sm:text-sm text-sky-100/90 mt-0.5">
              {methode.vieReelle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

