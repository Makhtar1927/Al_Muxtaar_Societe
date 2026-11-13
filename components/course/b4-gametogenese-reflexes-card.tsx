'use client';

import React, { useState } from 'react';
import {
  Lightbulb,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Dna,
  Clock,
  Sparkles,
  GitBranch,
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
    title: 'Les 4 phases comparées : Continuité masculine vs Ruptures féminines',
    badge: 'Chronologie & Cinétique',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    situation:
      'Dans un sujet de synthèse ou d’analyse documentaire au Bac S2 où l’on demande de comparer spermatogenèse et ovogenèse.',
    action:
      'Structurer systématiquement en 4 phases : Multiplication (mitoses des gonies), Accroissement (formation des gamétocytes I), Maturation (méiose réductionnelle puis équationnelle), et Différenciation (spermiogenèse unique chez l’homme). Souligner la continuité ininterrompue de la puberté à la mort chez l’homme, contre le caractère discontinu et cyclique limité à la ménopause chez la femme.',
    piege:
      'Affirmer qu’il existe une phase de différenciation chez la femme : FAUX ! L’ovocyte n’a pas de phase de différenciation morphologique post-méiotique comparable à la spermiogenèse masculine.',
    exemple:
      'Chez l’homme : 1 spermatogonie (2n) donne 4 spermatozoïdes mobiles (n). Chez la femme : 1 ovogonie (2n) donne 1 seul ovocyte II volumineux fécondable (n) et 2 à 3 globules polaires dégénérescents.',
  },
  {
    id: 2,
    title: 'Les 2 blocages méiotiques de l’ovogenèse (À réciter par cœur)',
    badge: 'Blocages Méiotiques',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    situation:
      'Questions sur la chronologie méiotique chez la femme ou sur l’état nucléaire lors de l’ovulation.',
    action:
      'Préciser les 2 blocages : 1er blocage en Prophase I de la méiose (diplotène) survenant dès la vie fœtale (7e mois in utero) au stade ovocyte I ; levé à chaque cycle dès la puberté par le pic de LH. 2e blocage en Métaphase II (stade ovocyte II émis lors de l’ovulation avec expulsion du 1er globule polaire GP1) ; levé UNIQUEMENT par la pénétration d’un spermatozoïde fécondant.',
    piege:
      'Écrire que la femme ovule un « ovule mûr » : FAUX et sanctionné au Bac S2 ! La femme ovule un ovocyte II bloqué en métaphase II. La méiose ne s’achève que s’il y a fécondation.',
    exemple:
      'Absence de fécondation = l’ovocyte II dégénère sans jamais avoir achevé sa méiose II ni expulsé son 2e globule polaire.',
  },
  {
    id: 3,
    title: 'Organisation centripète du tube séminifère & Cellules de soutien',
    badge: 'Histologie Testiculaire',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    situation:
      'Schéma ou micrographie d’une coupe transversale de testicule ou de tube séminifère.',
    action:
      'Décrire la progression centripète (de la membrane basale périphérique vers la lumière centrale) : Spermatogonies (2n, collées à la basale) → Spermatocytes I (2n, volumineux) → Spermatocytes II (n, de courte durée de vie) → Spermatides (n, petites cellules rondes) → Spermatozoïdes (n, flagellés, libres dans la lumière). Identifier les cellules de Sertoli (nourricières, barrière hémato-testiculaire) et les cellules interstitielles de Leydig (sécrétion de testostérone).',
    piege:
      'Confondre les compartiments : les cellules de Leydig sont INTERSTITIELLES (en dehors des tubes séminifères, près des capillaires sanguins), tandis que les cellules de Sertoli sont INTRA-TUBULAIRES.',
    exemple:
      'Castration ou destruction des cellules interstitielles = atrophie des caractères sexuels secondaires sans toucher à la structure tubulaire interne.',
  },
  {
    id: 4,
    title: 'Spermiogenèse : De la spermatide ronde au spermatozoïde profilé',
    badge: 'Différenciation',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    situation:
      'Explication cytologique de la transformation finale de la spermatide sans aucune division cellulaire.',
    action:
      'Lister les 4 transformations majeures : 1) Formation de l’acrosome par fusion des vésicules de l’appareil de Golgi (contient les enzymes protéolytiques hyaluronidase). 2) Condensation extrême du noyau avec remplacement des histones par des protamines. 3) Formation du flagelle à partir du centriole distal. 4) Manchon mitochondrial spiralé dans la pièce intermédiaire et élimination de l’excès de cytoplasme sous forme de corps résiduel phagocyté par Sertoli.',
    piege:
      'Penser qu’il y a réduction chromatique pendant la spermiogenèse : FAUX ! La spermatide et le spermatozoïde ont tous les deux n chromosomes à 1 chromatide (n, C).',
    exemple:
      'Un défaut d’acrosome (ex: spermatozoïdes à tête ronde dits globozoospermie) entraîne une stérilité par incapacité de traverser la zone pellucide de l’ovocyte.',
  },
  {
    id: 5,
    title: 'Folliculogenèse : Du follicule primordial au corps jaune',
    badge: 'Cycle Ovarien',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    situation:
      'Identification des structures ovariennes en coupe histologique ou chronologie folliculaire.',
    action:
      'Maîtriser la séquence temporelle : Follicule primordial (ovocyte I + quelques cellules folliculaires plates) → Primaire (cellules cubiques) → Secondaire (plusieurs couches de granulosa + zone pellucide + thèques interne et externe) → Cavitaire/Antral (apparition des cavités remplies de liquide folliculaire) → Follicule mûr de De Graaf (vaste antrum, cumulus oophorus) → Ovulation (J14, expulsion ovocyte II) → Corps jaune (lutéinisation de la granulosa et thèque interne sécrétant œstrogènes et forte progestérone) → Corps albicans (cicatrice fibreuse blanche si pas de fécondation).',
    piege:
      'Croire que le corps jaune est expulsé lors de l’ovulation : FAUX ! Seul le complexe ovocyte II + zone pellucide + corona radiata est expulsé dans le pavillon de la trompe. Le reste du follicule reste dans l’ovaire pour former le corps jaune.',
    exemple:
      'La thèque interne sécrète les androgènes convertis en œstrogènes par l’aromatase de la granulosa (théorie cellulaire bimétallique).',
  },
  {
    id: 6,
    title: 'Évolution de la quantité d’ADN (Q) et de la ploïdie (n)',
    badge: 'Génétique & Ploïdie',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    situation:
      'Interprétation de graphes représentant la quantité d’ADN par cellule au cours du temps (2C, 4C, 2C, C).',
    action:
      'Dresser la table de correspondance infaillible : Gonie = 2n, 2Q (G1) puis 2n, 4Q (après phase S). Gamétocyte I = 2n, 4Q (subit la méiose I réductionnelle : séparation des chromosomes homologues). Gamétocyte II = n, 2Q (subit la méiose II équationnelle : séparation des chromatides sœurs). Gamète / spermatide / GP2 = n, Q.',
    piege:
      'Confondre nombre de chromosomes (ploïdie 2n / n) et quantité d’ADN (Q / 2Q / 4Q) : un spermatocyte II est haploïde (n = 23 chromosomes chez l’homme), mais chaque chromosome possède encore 2 chromatides, donc il contient 2Q d’ADN !',
    exemple:
      'Passage Spermatocyte I (2n=46 chrs à 2 chromatides, 4Q) → Spermatocyte II (n=23 chrs à 2 chromatides, 2Q) → Spermatide (n=23 chrs à 1 chromatide, Q).',
  },
];

export default function B4GametogeneseReflexesCard() {
  const [openItem, setOpenItem] = useState<number | null>(1);

  return (
    <div className="bg-white rounded-2xl border border-navy/15 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-navy via-slate-900 to-indigo-950 p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-teal-300" />
          </div>
          <div>
            <span className="text-xs font-semibold text-teal-300 uppercase tracking-wider">
              Méthodologie Élite Bac S2
            </span>
            <h3 className="text-lg sm:text-xl font-bold">
              Les 6 Réflexes Clés : Gamétogenèse & Méiose Comparée
            </h3>
          </div>
        </div>
        <p className="text-sm text-slate-300 max-w-2xl mt-1">
          Maîtrisez la chronologie, les blocages méiotiques, la spermatogenèse centripète et les follicules pour assurer le 20/20 aux sujets de synthèse et d’analyse du Baccalauréat sénégalais.
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

