'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Activity,
  Calendar,
  Layers,
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
    title: 'La Synchronisation des 3 Cycles : Ovarien, Utérin et Glaire Cervicale',
    badge: 'Synchronisation',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    situation:
      'Dans tout sujet demandant d’expliquer les transformations cycliques de l’appareil reproducteur féminin.',
    action:
      'Structurer en 2 phases séparées par l’ovulation (J14) : 1) Phase folliculaire / proliférative (J1 à J14) : follicules en croissance sécrètent les œstrogènes → régénération et épaississement de l’endomètre après la menstruation (J1-J5). 2) Phase lutéinique / sécrétoire (J14 à J28) : le corps jaune sécrète progestérone + œstrogènes → formation de la dentelle utérine (glandes spiralées riches en glycogène) et spiralisation des artérioles.',
    piege:
      'Dire que la progestérone fait proliférer l’endomètre : FAUX ! C’est l’œstrogène qui assure la prolifération cellulaire. La progestérone assure la différenciation sécrétoire (dentelle utérine) et le silence utérin.',
    exemple:
      'Glaire cervicale : dense et imperméable en dehors de l’ovulation ; filante, alcaline et à mailles larges à J14 sous l’effet du pic d’œstrogènes pour faciliter le passage des spermatozoïdes.',
  },
  {
    id: 2,
    title: 'Le Rétrocontrôle Positif Pré-ovulatoire : Le Mécanisme Clé du Bac S2',
    badge: 'Rétrocontrôle Positif',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    situation:
      'Question classique sur l’origine du pic ovulatoire de gonadostimulines (LH/FSH) vers le 12e-13e jour.',
    action:
      'Expliquer rigoureusement la condition de bascule : en début de phase folliculaire, un taux modéré d’œstrogènes exerce un rétrocontrôle négatif (RC-) sur l’axe hypothalamo-hypophysaire. Vers J12-J13, le follicule mûr de De Graaf produit une quantité massive d’œstrogènes qui dépasse un seuil critique (~200 à 300 pg/mL) maintenu pendant plus de 36 heures. Cet hyper-œstrogénisme inverse le rétrocontrôle en rétrocontrôle positif (RC+) : décharge massive de GnRH entraînant le pic de LH (et de FSH) qui déclenche l’ovulation 24 à 36 h plus tard.',
    piege:
      'Oublier la notion de seuil critique et de durée : un taux élevé d’œstrogènes bref ne déclenche pas le pic de LH ; il faut impérativement le maintien au-dessus du seuil pendant ~36 heures.',
    exemple:
      'Expérience d’ovariectomie : disparition du pic de LH et élévation permanente de FSH/LH (levée du RC-). Injection continue d’œstrogènes à fortes doses = explosion de LH (RC+).',
  },
  {
    id: 3,
    title: 'Le Rétrocontrôle Négatif Lutéinique & Déclenchement des Règles',
    badge: 'Menstruation',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    situation:
      'Explication de l’absence de nouvelle ovulation en phase lutéale et mécanisme d’apparition de la menstruation à J28.',
    action:
      'Démontrer la séquence : 1) Le corps jaune sécrète conjointement de fortes concentrations de progestérone et d’œstrogènes. Cette association exerce un rétrocontrôle négatif puissant et continu sur l’axe hypothalamo-hypophysaire, bloquant toute sécrétion de FSH/LH et empêchant le développement d’une nouvelle cohorte folliculaire. 2) Sans fécondation, le corps jaune régresse en corps albicans vers J26-J28 → effondrement brutal des taux plasmatiques de progestérone et d’œstrogènes. 3) Conséquence 1 : ischémie et desquamation de la couche fonctionnelle de l’endomètre = règles (menstruation). 4) Conséquence 2 : levée du rétrocontrôle négatif → reprise de la sécrétion de FSH pour amorcer le cycle suivant.',
    piege:
      'Croire que la menstruation est provoquée par une hormone : FAUX ! Les règles sont causées par la CHUTE (ou sevrage) des hormones ovariennes, et non par la présence d’une hormone spécifique.',
    exemple:
      'Si l’on injecte quotidiennement de la progestérone à J26-J28 chez une femme non enceinte, les règles n’apparaissent pas tant que les injections se poursuivent.',
  },
  {
    id: 4,
    title: 'Le Plateau Hyperthermique et l’Effet Thermogène de la Progestérone',
    badge: 'Courbe de Température',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    situation:
      'Analyse d’une courbe thermique matinale féminine sur un cycle de 28 jours.',
    action:
      'Repérer le profil biphasique : 1) Phase folliculaire : température basale inférieure à 37 °C (autour de 36,5 - 36,7 °C). 2) Nadir (point le plus bas) juste avant l’ovulation (vers J13-J14). 3) Décalage thermique ascendant de +0,3 à +0,5 °C le lendemain de l’ovulation. 4) Phase lutéinique : plateau thermique maintenu au-dessus de 37 °C pendant environ 14 jours, causé par l’action thermogène centrale de la progestérone sur les centres hypothalamiques.',
    piege:
      'Penser que l’ovulation a lieu pendant le plateau à 37,2 °C : FAUX ! L’ovulation se produit la veille du plateau, au niveau du creux thermique (nadir) ou au tout début de la montée.',
    exemple:
      'Un plateau hyperthermique qui dépasse 16 à 18 jours sans retour à 36,6 °C est le tout premier signe clinique présomptif d’une grossesse (maintien du corps jaune).',
  },
  {
    id: 5,
    title: 'Rôles Dédiés des Gonadostimulines : FSH vs LH au Bac S2',
    badge: 'Endocrinologie Hypophysaire',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
    situation:
      'Distinction des actions de la FSH et de la LH sur les cellules cibles ovariennes.',
    action:
      'FSH (Follicle Stimulating Hormone) : stimule le recrutement et la croissance des follicules cavitaires, induit la prolifération de la granulosa et active l’aromatase (conversion des androgènes en œstrogènes). LH (Luteinizing Hormone) : stimule la thèque interne (synthèse d’androgènes), déclenche l’ovulation (décharge pré-ovulatoire de LH), et commande la lutéinisation de la granulosa en corps jaune producteur de progestérone.',
    piege:
      'Attribuer l’ovulation à la FSH : FAUX ! C’est le pic brutal et massif de LH qui est le seul déclencheur biologique de l’ovulation par activation des protéases folliculaires.',
    exemple:
      'En Procréation Médicalement Assistée (PMA), on injecte de la FSH pour stimuler la croissance polyfolliculaire, puis un analogue de la LH (ou hCG) pour déclencher l’ovulation 36 h après.',
  },
  {
    id: 6,
    title: 'Interprétation Infaillible des Expériences d’Ablation et de Greffe',
    badge: 'Raisonnement Scientifique',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    situation:
      'Sujet d’analyse expérimentale avec hypophysectomie, ovariectomie, lésions hypothalamiques ou injections.',
    action:
      'Appliquer la grille logique du physiologiste : 1) Ovariectomie bilatérale → atrophie utérine irréversible (l’utérus est la cible des ovaires) + hausse massive et permanente de FSH/LH (l’ovaire exerçait un rétrocontrôle négatif). 2) Hypophysectomie → atrophie ovarienne ET atrophie utérine (l’hypophyse contrôle l’ovaire qui contrôle l’utérus). 3) Greffe ovarienne ou injection d’extraits ovariens chez l’ovariectomisée → rétablissement du cycle utérin sans rétablissement de la fécondité (action par voie sanguine humorale).',
    piege:
      'Conclure à une liaison nerveuse entre hypophyse et ovaire : FAUX ! La communication est strictement endocrine (hormonale par la circulation générale).',
    exemple:
      'Une perfusion continue de GnRH bloque l’axe (désensibilisation des récepteurs), alors qu’une perfusion pulsatile (1 pulse/90 min) rétablit la sécrétion de FSH et LH.',
  },
];

export default function B4CyclesSexuelsReflexesCard() {
  const [openItem, setOpenItem] = useState<number | null>(1);

  return (
    <div className="bg-white rounded-2xl border border-navy/15 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy via-slate-900 to-rose-950 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-teal-300" />
          </div>
          <div>
            <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">
              Méthodologie Élite Bac S2
            </span>
            <h3 className="text-lg sm:text-xl font-bold">
              Les 6 Réflexes Clés : Cycles Sexuels & Régulation Neurohormonale
            </h3>
          </div>
        </div>
        <p className="text-sm text-slate-300 max-w-2xl mt-1">
          Maîtrisez la synchronisation des cycles (ovaire, utérus, glaire), le rétrocontrôle positif du pic de LH, la progestérone lutéale et la logique des expériences de régulation au Baccalauréat sénégalais.
        </p>
      </div>

      {/* Accordion List */}
      <div className="divide-y divide-navy/10 p-4 sm:p-6 space-y-3">
        {REFLEXES.map((r) => {
          const isOpen = openItem === r.id;
          return (
            <div
              key={r.id}
              className={`rounded-xl transition-all border ${
                isOpen
                  ? 'border-navy/20 bg-surface/60 shadow-xs'
                  : 'border-transparent hover:border-navy/10 bg-white'
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
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Action & Rédaction Attendue au Bac
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
                      <Layers className="w-4 h-4 text-purple-700" /> Exemple / Donnée Expérimentale Clé
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

