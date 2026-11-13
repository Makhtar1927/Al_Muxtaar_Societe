'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Dna,
  Layers,
  HeartPulse,
  Activity,
} from 'lucide-react';

interface ReflexeItem {
  id: number;
  title: string;
  badge: string;
  badgeColor: string;
  situation: string;
  action: string;
  piege: string;
  exemple: string;
}

const REFLEXES: ReflexeItem[] = [
  {
    id: 1,
    title: 'La Fécondation & la Réaction Corticale Anti-Polyspermie',
    badge: 'Fécondation & Monospermie',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    situation:
      'Dans tout sujet portant sur les étapes cellulaires de la fécondation ou sur le maintien du caryotype 2n=46.',
    action:
      'Structurer la réponse en 5 étapes rigoureuses : 1) Traversée de la corona radiata (hyaluronidases acrosomiales et battements flagellaires). 2) Liaison spécifique du spermatozoïde aux glycoprotéines ZP3 de la zone pellucide. 3) Réaction acrosomique (libération d’acrosine perforant localement ZP3). 4) Fusion des membranes plasmiques déclenchant une dépolarisation électrique et une onde d’ions calcium intracellulaire (Ca2+). 5) Réaction corticale : exocytose immédiate des granules corticaux dans l’espace périvitellin qui modifient ZP3 et durcissent la zone pellucide, empêchant irréversiblement toute pénétration de spermatozoïdes surnuméraires.',
    piege:
      'Affirmer que la réaction acrosomique bloque la polyspermie : FAUX ! C’est la réaction CORTICALE (exocytose des granules ovocytaires) qui bloque la polyspermie. La réaction acrosomique sert uniquement à traverser la zone pellucide.',
    exemple:
      'La pénétration du spermatozoïde lève le 2e blocage méiotique : l’ovocyte II achève sa méiose II, expulse le 2e globule polaire (GP2) et devient un ovule vrai avant la fusion des deux pronuclei (amphimixie).',
  },
  {
    id: 2,
    title: 'Cinétique Chronologique : Du Zygote à la Nidation (J0 à J7)',
    badge: 'Développement Pré-implantatoire',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    situation:
      'Question portant sur le transit tubaire de l’embryon, la segmentation et les étapes de l’implantation utérine.',
    action:
      'Citer la chronologie millimétrée : J0 = fécondation dans l’ampoule tubaire (tiers externe de la trompe). J1 à J3 = segmentation au cours de la descente tubaire (divisions mitotiques de clivage à volume constant : 2, 4, 8, puis 16 à 32 cellules = morula pleine). J4 = entrée de la morula dans la cavité utérine. J5 = creusement du blastocèle, l’embryon devient un blastocyste (trophoblaste externe + bouton embryonnaire interne). J5-J6 = éclosion (perte enzymatique de la zone pellucide). J6-J7 = nidation (adhésion et enfouissement invasif du trophoblaste dans la dentelle utérine sécrétoire).',
    piege:
      'Croire que l’embryon grandit pendant les premiers jours : FAUX ! Durant les 4 jours de segmentation tubaire, le diamètre total reste constant (~100 micromètres) car l’embryon est enfermé dans la zone pellucide inextensible ; les cellules deviennent simplement de plus en plus petites.',
    exemple:
      'Le trophoblaste donnera le placenta et les annexes, tandis que le bouton embryonnaire (masse cellulaire interne) donnera la totalité des tissus de l’embryon proprement dit.',
  },
  {
    id: 3,
    title: 'HCG et Sauvetage du Corps Jaune : La Clé de l’Aménorrhée Gravidique',
    badge: 'Maintien Hormonal Précoce',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    situation:
      'Explication du retard ou de l’absence de règles (aménorrhée) chez la femme enceinte dès le 28e jour du cycle.',
    action:
      'Démontrer l’enchaînement causal : dès J7-J8, le trophoblaste du blastocyste implanté sécrète l’hormone HCG (Human Chorionic Gonadotropin). La HCG possède une homologie structurale avec la LH et se lie aux mêmes récepteurs ovariens. Elle « sauve » le corps jaune de sa lutéolyse programmée, le transformant en corps jaune gravidique. Le corps jaune continue de produire de fortes doses de progestérone et d’œstrogènes, maintenant intacte la dentelle utérine et imposant le silence au myomètre. Les règles n’apparaissent pas.',
    piege:
      'Écrire que la HCG empêche directement les règles : FAUX ! La HCG agit indirectement : elle stimule le corps jaune, et c’est la progestérone maintenue qui empêche la desquamation de la muqueuse utérine.',
    exemple:
      'Le test de grossesse urinaire repose sur des anticorps monoclonaux reconnaissant la chaîne bêta spécifique de la HCG, détectable dès 10 jours post-ovulation.',
  },
  {
    id: 4,
    title: 'Le Relais Placentaire à 3 Mois & Interprétation des Ovariectomies',
    badge: 'Relais Endocrinien',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    situation:
      'Analyse d’expériences d’ablation bilatérale des ovaires (ovariectomie) pratiquées à différents stades de la gestation.',
    action:
      'Distinguer impérativement les 2 périodes : 1) Durant le premier trimestre (semaines 1 à 10), la progestérone provient EXCLUSIVEMENT du corps jaune gravidique ovarien. Une ovariectomie entraîne la chute de la progestérone, des contractions utérines et un avortement immédiat. 2) Dès le 3e mois (semaines 12-14), le placenta mature prend le relais complet et devient une glande endocrine autonome sécrétant des quantités massives de progestérone et d’œstrogènes. Une ovariectomie pratiquée au 4e mois n’a AUCUN effet néfaste : la grossesse se poursuit à terme.',
    piege:
      'Croire que le corps jaune est actif pendant les 9 mois : FAUX ! Après le 3e mois, le corps jaune ovarien involue en corps albicans sans conséquence car le placenta assure l’intégralité de la synthèse hormonale.',
    exemple:
      'Sur un graphe de gestation au Bac S2, identifier le croisement : chute de la HCG embryonnaire dès la 10e semaine, concomitante à l’envolée de la progestérone placentaire.',
  },
  {
    id: 5,
    title: 'Parturition : La Boucle de Rétrocontrôle Positif de l’Ocytocine (Ferguson)',
    badge: 'Déclenchement de l’Accouchement',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    situation:
      'Sujet portant sur le déterminisme hormonal et neuro-endocrinien de l’accouchement à terme.',
    action:
      'Exposer la cascade neuro-endocrinienne : 1) À terme, la chute du ratio progestérone/œstrogènes lève le silence utérin et induit la synthèse massive de récepteurs à l’ocytocine sur le myomètre. 2) L’engagement de la tête fœtale dilate mécaniquement le col utérin. 3) Les mécanorécepteurs du col transmettent des potentiels d’action via la moelle épinière jusqu’à l’hypothalamus. 4) La posthypophyse déverse des pulses d’ocytocine dans le sang. 5) L’ocytocine contracte vigoureusement le myomètre, ce qui accentue la distension du col, amplifiant encore la sécrétion d’ocytocine. C’est le réflexe de Ferguson : un rétrocontrôle POSITIF auto-entretenu jusqu’à l’expulsion fœtale.',
    piege:
      'Qualifier l’accouchement de rétrocontrôle négatif : FAUX ! C’est l’un des très rares exemples de rétrocontrôle POSITIF dans le programme. La contraction amplifie le stimulus initial au lieu de l’atténuer.',
    exemple:
      'L’anesthésie péridurale bloquant les afférences sensitives du col ralentit le travail en diminuant la libération réflexe d’ocytocine.',
  },
  {
    id: 6,
    title: 'Lactation : Prolactine (Synthèse) vs Ocytocine (Éjection)',
    badge: 'Double Commande Lactée',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    situation:
      'Question de cours ou comparaison de protocoles expérimentaux sur la montée de lait et la tétée.',
    action:
      'Établir la séparation fonctionnelle stricte : 1) PROLACTINE (sécrétée par l’adénohypophyse) : responsable de la SYNTHÈSE et de la sécrétion du lait par les cellules épithéliales des acini mammaires. Inhibée pendant la grossesse par les fortes doses de stéroïdes placentaires, elle est démasquée dès la délivrance par la chute des œstrogènes. 2) OCYTOCINE (sécrétée par la neurohypophyse) : responsable de l’ÉJECTION mécanique du lait par contraction des cellules myoépithéliales entourant les acini sous l’effet de la succion du mamelon (arc réflexe sensitif).',
    piege:
      'Attribuer l’éjection à la prolactine ou la synthèse à l’ocytocine : confusion lourdement sanctionnée au Bac S2 ! Retenir : Prolactine = Fabrication ; Ocytocine = Expulsion.',
    exemple:
      'Aménorrhée de lactation : la prolactine élevée lors des tétées fréquentes exerce un rétrocontrôle négatif sur l’hypothalamus, freinant la GnRH et bloquant l’ovulation.',
  },
];

export default function B4FecondationReflexesCard() {
  const [openItem, setOpenItem] = useState<number | null>(1);

  return (
    <div className="my-8 rounded-3xl bg-white border border-navy/10 p-5 sm:p-7 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/10 pb-4 mb-5">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-700 mb-1 border border-rose-200">
            <Sparkles className="w-3.5 h-3.5 text-rose-600" />
            <span>SVT Terminale S2 • Chapitre B4 • Leçon 3</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-navy">
            Fiches Réflexes : De la Fécondation à la Lactation
          </h3>
          <p className="text-xs sm:text-sm text-text/70 mt-0.5">
            Les 6 automatismes de raisonnement exigés au Baccalauréat sénégalais pour l’analyse embryologique et endocrinienne.
          </p>
        </div>
      </div>

      {/* Accordéon des 6 réflexes */}
      <div className="space-y-3">
        {REFLEXES.map((r) => {
          const isOpen = openItem === r.id;

          return (
            <div
              key={r.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen ? 'border-navy/20 bg-surface/30 shadow-sm' : 'border-navy/10 bg-white hover:border-navy/20'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenItem(isOpen ? null : r.id)}
                className="w-full text-left p-4 flex items-center justify-between gap-3 focus:outline-none"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-7 h-7 rounded-lg bg-navy/5 text-navy font-black text-xs flex items-center justify-center shrink-0 border border-navy/10">
                    {r.id}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${r.badgeColor}`}>
                        {r.badge}
                      </span>
                    </div>
                    <h4 className="font-bold text-navy text-sm sm:text-base mt-0.5 truncate">
                      {r.title}
                    </h4>
                  </div>
                </div>
                <div className="text-navy/50 shrink-0">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 space-y-3 text-xs sm:text-sm">
                  <div className="bg-blue-50/80 rounded-xl p-3 border border-blue-200/70">
                    <p className="font-bold text-blue-900 flex items-center gap-1.5 mb-1">
                      <Clock className="w-4 h-4 text-blue-700" /> Quand appliquer ce réflexe ?
                    </p>
                    <p className="text-blue-950/80 leading-relaxed">{r.situation}</p>
                  </div>

                  <div className="bg-emerald-50/80 rounded-xl p-3 border border-emerald-200/70">
                    <p className="font-bold text-emerald-900 flex items-center gap-1.5 mb-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Action &amp; Rédaction Attendue au Bac
                    </p>
                    <p className="text-emerald-950/80 leading-relaxed">{r.action}</p>
                  </div>

                  <div className="bg-amber-50/80 rounded-xl p-3 border border-amber-200/70">
                    <p className="font-bold text-amber-900 flex items-center gap-1.5 mb-1">
                      <AlertTriangle className="w-4 h-4 text-amber-700" /> Le Piège Classique à Éviter
                    </p>
                    <p className="text-amber-950/80 leading-relaxed">{r.piege}</p>
                  </div>

                  <div className="bg-purple-50/80 rounded-xl p-3 border border-purple-200/70">
                    <p className="font-bold text-purple-900 flex items-center gap-1.5 mb-1">
                      <Dna className="w-4 h-4 text-purple-700" /> Exemple / Chiffre Clé pour la Copie
                    </p>
                    <p className="text-purple-950/80 leading-relaxed font-mono text-[11px] sm:text-xs">
                      {r.exemple}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
