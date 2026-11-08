'use client';

import React, { useState } from 'react';
import MathRenderer from '@/components/course/math-renderer';
import { Target, Lightbulb, AlertTriangle, CheckCircle, Sparkles, Scale, Droplet, ShieldCheck } from 'lucide-react';

export default function DosageAcideFaibleBaseForteReflexesCard() {
  const [activeTab, setActiveTab] = useState<number>(0);

  const REFLEXES = [
    {
      num: 1,
      title: "Équation de Réaction & Constante de Dosage",
      badge: "Réaction Quasi-Totale",
      formule: "\\text{AH} + \\text{OH}^- \\xrightarrow{K_R} \\text{A}^- + \\text{H}_2\\text{O}, \\quad K_R = \\frac{[\\text{A}^-]}{[\\text{AH}][\\text{OH}^-]} = \\frac{K_a}{K_e} = 10^{14 - pK_a} \\gg 10^4",
      regleBac:
        "La réaction de dosage entre un acide faible et une base forte (soude NaOH) est rapide, unique et quasi-totale. On l'écrit avec une flèche simple (→).",
      explication:
        "1. Pour l'acide éthanoïque (pKa = 4,8) : K_R = 10^(14 - 4,8) = 10^(9,2) ≈ 1,58 × 10⁹ ≫ 10⁴. La réaction est donc quantitative (totale).\n2. Les ions sodium Na⁺ sont spectateurs (indifférents) et ne participent pas à l'équation bilan du dosage.\n3. L'acide AH réagit mole à mole avec les ions hydroxyde OH⁻ apportés par la burette.",
      wolof:
        "« Réaction de dosage bi dafay gaaw te dafay jeex takk (quasi-totale) ! Flèche simple (→) ngay bind. Na⁺ bi spectateur la, dafay seetaane rekk. AH ak OH⁻ ñooy jàppalante ba jël 100% des points au Bac ! »",
      piege:
        "Ne mettez jamais de double flèche (⇌) pour une réaction de dosage ! Un dosage quantitatif au Baccalauréat s'écrit toujours avec une flèche simple (→).",
    },
    {
      num: 2,
      title: "Point d'Équivalence E & Nature Basique du Milieu",
      badge: "Équivalence : pHe > 7",
      formule: "C_a V_a = C_b V_{bE}, \\quad \\text{À l'équivalence : } [\\text{A}^-] = \\frac{C_a V_a}{V_a + V_{bE}}, \\quad \\text{pH}_E > 7",
      regleBac:
        "À l'équivalence acido-basique, les réactifs ont été mélangés dans les proportions stœchiométriques. Pour un acide faible dosé par une base forte, le pH à l'équivalence est TOUJOURS strictement supérieur à 7 à 25°C !",
      explication:
        "1. À l'équivalence (E), tout l'acide AH a été consommé et transformé en sa base conjuguée A⁻.\n2. La solution obtenue à l'équivalence est une solution aqueuse de base faible (ions A⁻ et Na⁺).\n3. Une base faible dans l'eau capte des protons pour former des ions OH⁻, ce qui rend le milieu basique (pHe > 7).\n4. Formule approchée du pH à l'équivalence : pH_E ≈ 1/2(14 + pKa + log C'b) avec C'b = (Ca·Va)/(Va + VbE).",
      wolof:
        "« Ci dosage acide fort / base forte, pHe = 7 la woon. Waaye léegi ci acide faible / base forte, pHe bi dafay gën a rëy 7 (pHe > 7) ndax base faible A⁻ bi lañu am ci poynt d'équivalence bi ! Kuko fatte rek ñàkk note bi. »",
      piege:
        "Ne dites jamais pHe = 7 ! Dire pHe = 7 pour un acide faible dosé par une base forte est l'erreur éliminatoire numéro un au Bac S2.",
    },
    {
      num: 3,
      title: "La Demi-Équivalence : Détermination Graphique du pKa",
      badge: "Théorème Majeur Bac S2",
      formule: "V_b = \\frac{V_{bE}}{2} \\implies [\\text{AH}] = [\\text{A}^-] \\implies \\text{pH} = pK_a",
      regleBac:
        "À la demi-équivalence (Vb = VbE / 2), exactement la moitié de l'acide faible initial a été neutralisé. Les concentrations en acide et en base conjuguée sont strictement égales, donc le pH est égal au pKa !",
      explication:
        "1. D'après Henderson-Hasselbalch : pH = pKa + log([A⁻]/[AH]).\n2. À Vb = VbE/2 : [AH] = [A⁻], donc log([A⁻]/[AH]) = log(1) = 0 ⟹ **pH = pKa**.\n3. Cette propriété permet de lire directement le pKa d'un couple sur la courbe de dosage pH = f(Vb) sans aucun calcul.\n4. Au point de demi-équivalence, la pente de la tangente est minimale : c'est un point d'inflexion où le pouvoir tampon est maximal.",
      wolof:
        "« Demi-équivalence mooy fumu Vb tollu ci VbE / 2. Foofu, ñaari mbir yi dañuy yem kook : [Acide] = [Base]. Motax pH bi day yem ci pKa bi direct ! Xoolal la courbe, jël abscisse VbE/2, yéeg ba ci courbe bi, nga lire ordonnée bi : mooy sa pKa ! »",
      piege:
        "N'oubliez pas que pour un dosage fort-fort, la notion de demi-équivalence n'a aucun sens car il n'y a pas d'équilibre ni de pKa !",
    },
    {
      num: 4,
      title: "Propriétés d'une Solution Tampon & Effet Tampon",
      badge: "Stabilité du pH",
      formule: "\\text{Solution Tampon : } [\\text{AH}] \\approx [\\text{A}^-], \\quad \\Delta \\text{pH} \\approx 0 \\text{ lors d'un ajout modéré ou dilution}",
      regleBac:
        "Une solution tampon est un mélange d'un acide faible et de sa base conjuguée en proportions voisines. Son pH varie très peu lors d'un ajout modéré d'acide fort, de base forte ou lors d'une dilution modérée.",
      explication:
        "1. **Pouvoir tampon maximal :** Obtenu lorsque [AH] = [A⁻], c'est-à-dire à pH = pKa (à la demi-équivalence).\n2. **Résistance à l'ajout d'acide (H₃O⁺) :** Les protons ajoutés sont neutralisés par la base faible : A⁻ + H₃O⁺ → AH + H₂O.\n3. **Résistance à l'ajout de base (OH⁻) :** Les ions hydroxydes ajoutés sont neutralisés par l'acide faible : AH + OH⁻ → A⁻ + H₂O.\n4. **Résistance à la dilution :** pH = pKa + log(n(A⁻)/n(AH)), le rapport des quantités de matière reste inchangé lors de l'ajout d'eau.",
      wolof:
        "« Solution tampon dafa melni nit ku am kersa ak dal : boo ko tënkee tuuti acide walla base, du soppiku dara ! pH bi dafay taxaw temm. Ni la sunu deret dunde : pH 7,4 rekk la wara nekk, tampon bi moo koy samm ! »",
      piege:
        "Une solution tampon ne résiste qu'à des ajouts MODÉRÉS ! Un excès massif d'acide ou de base détruit le tampon.",
    },
    {
      num: 5,
      title: "Les 3 Méthodes de Préparation d'une Solution Tampon",
      badge: "Protocole Expérimental",
      formule: "\\text{1. Mélange direct (sel + acide)} \\quad \\text{2. Demi-neutralisation AF par BF} \\quad \\text{3. Demi-neutralisation BF par AF}",
      regleBac:
        "Au Bac sénégalais, on peut vous demander de rédiger le protocole expérimental complet pour préparer un volume V d'une solution tampon de pH donné.",
      explication:
        "1. **Méthode 1 (Mélange équimolaire direct) :** Mélanger des volumes égaux d'acide faible (ex: CH₃COOH à C₀) et de son sel de sodium (ex: CH₃COONa à C₀) pour avoir [AH] = [A⁻].\n2. **Méthode 2 (Demi-équivalence acide faible / base forte) :** Prendre un volume Va d'acide faible (Ca), ajouter un volume Vb = VbE/2 de soude NaOH tel que n(OH⁻) = 1/2 n(AH) initial.\n3. **Méthode 3 (Demi-équivalence base faible / acide fort) :** Prendre une base faible (ex: NH₃) et lui ajouter la moitié de la quantité d'acide chlorhydrique nécessaire à l'équivalence.",
      wolof:
        "« Ñetti yoon lañuy préparé tampon : 1) boole acide bi ak sel bi 50-50, 2) jël acide faible bi neutralisé ko à moitié ak soude (demi-équivalence), 3) jël base faible bi neutralisé ko à moitié ak acide fort. Ñett yépp ay 100% de réussite lañu ! »",
      piege:
        "Pour la méthode 2, n'ajoutez pas VbE de soude sinon vous êtes à l'équivalence complète (milieu basique) et non en solution tampon !",
    },
    {
      num: 6,
      title: "Choix de l'Indicateur Coloré de Fin de Dosage",
      badge: "Zone de Virage",
      formule: "\\text{pH}_E \\in [\\text{p}K_i - 1 \\,;\\, \\text{p}K_i + 1] \\implies \\text{Phénolphtaléine adaptée (8,2 - 10,0)}",
      regleBac:
        "Un indicateur coloré est convenable pour un dosage si et seulement si sa zone de virage contient la valeur du pH à l'équivalence (pHe).",
      explication:
        "1. Pour acide faible / base forte : pHe est basique (souvent entre 8,2 et 9,0).\n2. **Phénolphtaléine (zone 8,2 – 10,0) :** Incolore en milieu acide, devient rose persistante à l'équivalence. C'est l'indicateur **idéal et parfait** pour ce dosage.\n3. **Bleu de bromothymol (BBT, zone 6,0 – 7,6) :** Totalement inadapté ou très imprécis car le virage se produit avant le véritable saut d'équivalence !\n4. **Hélianthine (zone 3,1 – 4,4) :** À proscrire absolument (vire dès le début du dosage).",
      wolof:
        "« Ndax pHe bi dafa gën a rëy 7 (8 à 9), faw indicateur bi di virer ci zone 8-10 ! Motax phénolphtaléine moo ci baax (day soppiku rose). BBT ak Hélianthine dañuy nax élève bi ! »",
      piege:
        "N'utilisez jamais le BBT par réflexe en pensant qu'il convient à tous les dosages ! Le BBT n'est adapté que pour le dosage fort-fort (pHe = 7).",
    },
  ];

  const current = REFLEXES[activeTab];

  return (
    <div className="bg-white rounded-3xl border border-navy/15 p-4 sm:p-7 shadow-md space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-600 shrink-0">
            <Target className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider block">
              Fiches Réflexes Bac S2
            </span>
            <h3 className="font-extrabold text-navy text-lg sm:text-xl">
              C8 : Réactions Acide Faible / Base Forte &amp; Solutions Tampons
            </h3>
          </div>
        </div>
        <span className="text-xs font-bold text-navy/60 bg-surface px-3 py-1 rounded-full border border-navy/10 self-start sm:self-center">
          6 Réflexes Incontournables
        </span>
      </div>

      {/* Tabs pills */}
      <div className="flex flex-wrap gap-2">
        {REFLEXES.map((ref, idx) => (
          <button
            key={ref.num}
            type="button"
            onClick={() => setActiveTab(idx)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
              activeTab === idx
                ? 'bg-navy text-white shadow-xs'
                : 'bg-surface text-text/70 hover:bg-surface-muted hover:text-navy border border-navy/5'
            }`}
          >
            <span className="w-4 h-4 rounded-full bg-white/20 text-[10px] flex items-center justify-center">
              {ref.num}
            </span>
            <span className="truncate max-w-[130px] sm:max-w-none">{ref.title.split(':')[0]}</span>
          </button>
        ))}
      </div>

      {/* Fiche active */}
      <div className="space-y-4 animate-in fade-in duration-200">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-amber-50/80 border border-amber-200/80 p-3 rounded-2xl">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
            <h4 className="font-black text-navy text-sm sm:text-base">{current.title}</h4>
          </div>
          <span className="text-[11px] font-bold text-amber-800 bg-white px-2.5 py-0.5 rounded-lg border border-amber-300 shrink-0 self-start sm:self-auto">
            {current.badge}
          </span>
        </div>

        {/* Formule clé KaTeX */}
        <div className="bg-surface p-4 rounded-2xl border border-navy/10 text-center">
          <MathRenderer content={`$$${current.formule}$$`} />
        </div>

        {/* Règle d'or du Bac */}
        <div className="bg-emerald-50/70 border border-emerald-200 p-4 rounded-2xl space-y-1">
          <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wide">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            <span>Règle d&apos;or de l&apos;Office du Baccalauréat Sénégal :</span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed pl-6">
            {current.regleBac}
          </p>
        </div>

        {/* Explication détaillée */}
        <div className="bg-white border border-navy/10 p-4 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-navy font-bold text-xs uppercase tracking-wide">
            <Lightbulb className="w-4 h-4 text-amber-500" />
            <span>Explication approfondie pas à pas :</span>
          </div>
          <div className="text-xs sm:text-sm text-text/80 space-y-1.5 pl-6 leading-relaxed whitespace-pre-line">
            {current.explication}
          </div>
        </div>

        {/* Wolof & Piège */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div className="bg-turquoise/10 border border-turquoise/25 p-3.5 rounded-2xl space-y-1">
            <span className="font-bold text-turquoise uppercase tracking-wider block text-[11px]">
              🇸🇳 Xam-xam ci Wolof :
            </span>
            <p className="text-navy font-medium leading-relaxed italic">{current.wolof}</p>
          </div>

          <div className="bg-rose-50 border border-rose-200 p-3.5 rounded-2xl space-y-1">
            <div className="flex items-center gap-1.5 text-rose-800 font-bold text-[11px] uppercase tracking-wider">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
              <span>Piège éliminatoire au Bac :</span>
            </div>
            <p className="text-rose-950 leading-relaxed">{current.piege}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

