'use client';

import React, { useState } from 'react';
import MathRenderer from '@/components/course/math-renderer';
import { Target, Lightbulb, AlertTriangle, CheckCircle, Sparkles, Dna } from 'lucide-react';

export default function AcidesAminesReflexesCard() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const REFLEXES = [
    {
      num: 1,
      title: "Structure Fondamentale & Nomenclature UICPA",
      badge: "Formule & Règles",
      formule: "\\text{R}-\\text{CH}(\\text{NH}_2)-\\text{COOH} \\quad \\iff \\quad \\text{Acide 2-amino...oïque}",
      regleBac:
        "Un acide alpha-aminé possède obligatoirement le groupe amine (-NH₂) et le groupe carboxyle (-COOH) fixés sur le MÊME carbone n°2 (carbone alpha).",
      explication:
        "1. La numérotation commence TOUJOURS par le carbone du groupe carboxyle -COOH (carbone 1).\n2. Le carbone 2 porte le groupe amine : son nom officiel commence donc toujours par « acide 2-amino... ».\n3. Exemples phares du Bac S2 sénégalais :\n   - Glycine (Gly) : H-CH(NH₂)-COOH = acide 2-aminoéthanoïque\n   - Alanine (Ala) : CH₃-CH(NH₂)-COOH = acide 2-aminopropanoïque\n   - Valine (Val) : (CH₃)₂CH-CH(NH₂)-COOH = acide 2-amino-3-méthylbutanoïque.",
      wolof:
        "« Acide alpha-aminé mooy molécule bu am à la fois fonction acide carboxylique (-COOH) ak fonction amine (-NH₂) ci même carbone bi ñuy wax carbone alpha (carbone 2). Numérotation bi day dore ci -COOH waxtu wu nekk ! »",
      piege:
        "Attention au piège de l'acide 3-aminopropanoïque (H₂N-CH₂-CH₂-COOH) : c'est un acide bêta-aminé, il N'EST PAS un acide alpha-aminé naturel !",
    },
    {
      num: 2,
      title: "Carbone Asymétrique, Chiralité & Le Piège d'Or de la Glycine",
      badge: "Chiralité & Symétrie",
      formule: "\\text{Carbone tétraédrique } C^* \\text{ lié à 4 substituants distincts : } -\\text{H}, -\\text{NH}_2, -\\text{COOH}, -\\text{R}",
      regleBac:
        "Tous les acides alpha-aminés naturels possèdent au moins un carbone asymétrique et sont donc chiraux, À L'EXCEPTION UNIQUE de la GLYCINE.",
      explication:
        "1. Un carbone asymétrique (noté C*) est lié à 4 atomes ou groupes d'atomes différents.\n2. La molécule chirale n'est pas superposable à son image dans un miroir plan et dévie le plan de polarisation de la lumière (activité optique).\n3. **Le piège d'or du Bac S2** : Pour la Glycine (R = H), le carbone alpha est lié à deux atomes d'hydrogène : il n'a donc PAS 4 substituants différents.\n   - La Glycine ne possède AUCUN carbone asymétrique.\n   - Elle est rigoureusement **ACHIRALE** et **optiquement inactive** (pouvoir rotatoire nul).",
      wolof:
        "« Carbone asymétrique C* dafa laaj 4 partenaires yu bokkul bénn yoon ! Acides aminés yépp am nañu ko ba mu des Glycine rekk ndax moom ñaari hydrogènes H la yor ci carbone alpha bi. Motax Glycine du chiral, pouvoir rotatoire amul ! »",
      piege:
        "Question rituelle au Bac S2 : « Tous les acides alpha-aminés sont-ils chiraux ? » Réponse : NON, la glycine est achirale car son carbone alpha n'est pas asymétrique.",
    },
    {
      num: 3,
      title: "Représentation de Fischer & Séries D et L",
      badge: "Projection dans le Plan",
      formule: "\\text{Fischer : -COOH en HAUT, -R en BAS } \\implies \\text{-NH}_2 \\text{ à DROITE (D) ou à GAUCHE (L)}",
      regleBac:
        "En projection de Fischer verticale, le groupe -COOH est placé au sommet et la chaîne carbonée -R en bas. La position du groupe -NH₂ détermine la série D ou L.",
      explication:
        "1. **Règle absolue d'orientation** : La chaîne carbonée la plus longue est verticale, le carbone le plus oxydé (-COOH) placé tout en haut.\n2. Si le groupe -NH₂ se projette à **DROITE**, l'acide aminé appartient à la série **D** (Dexter).\n3. Si le groupe -NH₂ se projette à **GAUCHE**, il appartient à la série **L** (Laevus).\n4. Les énantiomères D et L sont images l'un de l'autre dans un miroir plan.\n5. **Fait biologique fondamental** : Tous les acides aminés constitutifs des protéines du vivant sont exclusivement de la série **L** !",
      wolof:
        "« Ci projection bu Fischer, bindal -COOH ci kaw, -R ci suuf. Boo gisee -NH₂ bi nekk ci loxo ndeyjoor (droite), mooy série D ! Bu nekkee ci loxo cammooñ (gauche), mooy série L ! Acides aminés yiy tabax suñuy protéines série L lañu yépp ! »",
      piege:
        "Ne confondez pas série D/L (configuration géométrique relative) et pouvoir rotatoire (+)/(-) (sens physique de déviation mesuré au polarimètre). Un isomère L peut être dextrogyre (+) ou lévogyre (-) !",
    },
    {
      num: 4,
      title: "Structure Zwitterionique (Amphion) & Caractère Amphotère",
      badge: "Formes Ioniques",
      formule: "\\text{R}-\\text{CH}(\\text{NH}_3^+)-\\text{COO}^- \\quad (\\text{Zwitterion dipolaire neutre})",
      regleBac:
        "En solution aqueuse et à l'état solide, le groupe acide -COOH cède spontanément son proton au groupe basique -NH₂ pour former un amphion dipolaire globalement neutre.",
      explication:
        "Un acide aminé se comporte comme un **ampholyte** (amphotère) capable de réagir en acide ou en base selon 2 équilibres acido-basiques :\n1. **En milieu très acide** (pH < pKa1) : la forme cationique prédomine : $\\text{R}-\\text{CH}(\\text{NH}_3^+)-\\text{COOH}$ (charge nette = +1).\n2. **En milieu intermédiaire** (pKa1 < pH < pKa2) : l'amphion (zwitterion) prédomine : $\\text{R}-\\text{CH}(\\text{NH}_3^+)-\\text{COO}^-$ (charge nette = 0).\n3. **En milieu très basique** (pH > pKa2) : la forme anionique prédomine : $\\text{R}-\\text{CH}(\\text{NH}_2)-\\text{COO}^-$ (charge nette = -1).",
      wolof:
        "« Zwitterion (amphion) mooy acide aminé bi jël proton bi ci -COOH jox ko -NH₂ ci biir molécule bi. Dafa am charge + ak charge -, motax charge nette bi 0 la ! Bu milieu bi tàggee acide day jël proton doon cation (+1), bu tàggee basique day ñàkk proton doon anion (-1) ! »",
      piege:
        "À l'état pur ou en solution neutre, n'écrivez JAMAIS R-CH(NH₂)-COOH sous sa forme neutre non ionisée : elle n'existe pratiquement pas ! Écrivez toujours la forme amphion R-CH(NH₃⁺)-COO⁻.",
    },
    {
      num: 5,
      title: "Point Isoélectrique (pHi) & Électrophorèse",
      badge: "Séparation Analytique",
      formule: "pHi = \\frac{pK_{a1} + pK_{a2}}{2} \\quad \\iff \\quad \\text{Charge nette } q = 0 \\implies \\text{Aucune migration}",
      regleBac:
        "Le point isoélectrique pHi est le pH exact où la concentration de l'amphion est maximale et la charge électrique globale est strictement nulle.",
      explication:
        "1. Calcul pour un acide aminé neutre : $pHi = \\frac{pK_{a1} + pK_{a2}}{2}$.\n2. **Principe fondamental de l'électrophorèse** :\n   - Si $\\text{pH} < pHi$ : l'acide aminé est sous forme de cation (+), il migre vers la **Cathode** (pôle négatif -).\n   - Si $\\text{pH} > pHi$ : l'acide aminé est sous forme d'anion (-), il migre vers l'**Anode** (pôle positif +).\n   - Si $\\text{pH} = pHi$ : charge nette nulle, il **reste immobile** sur la ligne de dépôt !",
      wolof:
        "« pHi mooy pH neutralité électrique bi ! Boo defee électrophorèse : bu pH < pHi, molécule bi dafay ëmb charge positive di daw jëm Cathode (-) ; bu pH > pHi, day ëmb charge négative di daw jëm Anode (+) ; bu pH = pHi day toog ci place am du yëngu ! »",
      piege:
        "Au Bac : Mnémotechnique infaillible pour l'électrophorèse :\n- Cation (+) attire Cathode (-)\n- Anion (-) attire Anode (+). Ne confondez pas les pôles !",
    },
    {
      num: 6,
      title: "Liaison Peptidique & Isomérie des Dipeptides",
      badge: "Condensation & Peptides",
      formule: "\\text{R}_1-\\text{CH}(\\text{NH}_2)-\\text{COOH} + \\text{R}_2-\\text{CH}(\\text{NH}_2)-\\text{COOH} \\longrightarrow \\text{Dipeptide} + \\text{H}_2\\text{O}",
      regleBac:
        "La liaison peptidique est une liaison amide -CO-NH- issue de la condensation entre la fonction carboxyle d'un acide aminé et l'amine d'un second. Deux acides aminés distincts A et B donnent 4 dipeptides.",
      explication:
        "1. **Caractère structural** : La liaison -CO-NH- est plane et rigide en raison de la délocalisation du doublet non liant de l'azote.\n2. **Convention d'écriture** : On écrit toujours de l'acide aminé N-terminal (groupe -NH₂ libre à gauche) vers le C-terminal (-COOH libre à droite).\n3. **Isomérie de dipeptides** : À partir de deux acides aminés distincts A et B, on peut former **4 dipeptides différents** :\n   - Homodipeptides : A-A et B-B\n   - Hétérodipeptides isomères de chaîne : A-B et B-A (A-B est différent de B-A car les extrémités N et C sont inversées !).\n4. **Synthèse dirigée** : Pour obtenir exclusivement A-B, on doit **protéger** le -NH₂ de A et le -COOH de B, **activer** le -COOH de A, réaliser le couplage, puis **déprotéger** les fonctions.",
      wolof:
        "« Liaison peptidique mooy liaison amide -CO-NH- biy lëkkale acides aminés yi def protéines ! Boo jëlee ñaari acides aminés A ak B, mën nga am 4 dipeptides yu wuute : A-A, B-B, A-B ak B-A ! A-B ak B-A bokkul ndax bénn bi A moo yor -NH₂ libre, ci baneen bi B moo ko yor ! »",
      piege:
        "Ne dites jamais que A-B et B-A sont identiques ! L'un possède l'extrémité amine sur A et l'autre sur B : ce sont deux molécules chimiquement et biologiquement distinctes.",
    },
  ];

  const current = REFLEXES[activeTab];

  return (
    <div className="bg-white rounded-3xl border border-navy/10 p-5 sm:p-7 shadow-sm space-y-5">
      {/* En-tête */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-navy/10 pb-4">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-turquoise-light text-turquoise">
            <Dna className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-xl font-bold text-navy">
              Fiches Réflexes Bac S2 — C9 : Acides $\alpha$-Aminés &amp; Stéréochimie
            </h3>
            <p className="text-xs text-text/60">
              6 réflexes incontournables pour réussir l&apos;épreuve de Chimie au Baccalauréat sénégalais.
            </p>
          </div>
        </div>
        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          Programme Officiel Bac S2
        </span>
      </div>

      {/* Onglets des réflexes */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
        {REFLEXES.map((r, idx) => (
          <button
            key={r.num}
            onClick={() => setActiveTab(idx)}
            className={`py-2 px-3 rounded-2xl text-xs font-bold text-left transition-all border ${
              activeTab === idx
                ? 'bg-turquoise text-white border-turquoise shadow-md shadow-turquoise/20'
                : 'bg-surface hover:bg-navy/5 text-navy border-navy/10'
            }`}
          >
            <span className="block text-[10px] opacity-80 uppercase tracking-wider">
              Réflexe #{r.num}
            </span>
            <span className="truncate block font-semibold">{r.badge}</span>
          </button>
        ))}
      </div>

      {/* Contenu du réflexe actif */}
      <div className="space-y-4 bg-surface rounded-2xl p-5 border border-navy/10">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy/10 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-full bg-turquoise text-white flex items-center justify-center font-bold text-xs">
              {current.num}
            </span>
            <h4 className="font-bold text-navy text-base sm:text-lg">{current.title}</h4>
          </div>
          <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-navy/5 text-navy border border-navy/10">
            {current.badge}
          </span>
        </div>

        {/* Formule clé KaTeX */}
        <div className="p-3 bg-white rounded-xl border border-navy/10 text-center">
          <span className="text-[10px] uppercase tracking-wider text-text/50 font-bold block mb-1">
            Formule &amp; Équation Fondamentale
          </span>
          <MathRenderer content={`$$${current.formule}$$`} />
        </div>

        {/* Règle officielle du Bac */}
        <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-emerald-900">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Règle Officielle exigée au Bac S2 :</span>
          </div>
          <p className="leading-relaxed pl-5 font-medium">{current.regleBac}</p>
        </div>

        {/* Explication détaillée */}
        <div className="space-y-1.5 text-xs text-navy leading-relaxed bg-white p-4 rounded-xl border border-navy/10">
          <span className="font-bold text-navy flex items-center gap-1.5">
            <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Explication Méthodologique &amp; Démonstration :</span>
          </span>
          <div className="whitespace-pre-line pl-5 text-text/80">{current.explication}</div>
        </div>

        {/* Note pédagogique en Wolof */}
        <div className="p-3 bg-amber-50/70 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
          <span className="font-bold text-amber-900 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Xam-xam ci Wolof (Réflexe Minute) :</span>
          </span>
          <p className="italic pl-5 text-amber-900/90 leading-relaxed">{current.wolof}</p>
        </div>

        {/* Piège classique à éviter */}
        <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-950 space-y-1">
          <span className="font-bold text-rose-900 flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>Piège Classique du Correcteur du Bac :</span>
          </span>
          <p className="pl-5 text-rose-900/90 font-medium leading-relaxed">{current.piege}</p>
        </div>
      </div>
    </div>
  );
}
