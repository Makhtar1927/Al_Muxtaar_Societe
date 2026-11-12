'use client';

import { useState } from 'react';
import { ShieldCheck, Target, Zap, Activity, Users, HelpCircle, CheckCircle2 } from 'lucide-react';

interface ReflexeItem {
  id: string;
  number: string;
  title: string;
  badge: string;
  tag: string;
  principe: string;
  piegeBac: string;
  formuleCle: string;
  pointsCles: string[];
}

const REFLEXES_B3L3: ReflexeItem[] = [
  {
    id: 'maturation_selection_thymique',
    number: '01',
    title: 'Maturation & Double Sélection Thymique des LT',
    badge: 'Ontogénèse',
    tag: 'Thymus & TCR',
    principe:
      "Les lymphocytes T naissent dans la moelle osseuse rouge puis migrent vers le thymus où ils subissent une double sélection rigoureuse pour devenir immunocompétents : la sélection positive dans le cortex thymique (élimine par apoptose les cellules dont le TCR ne reconnaît pas les molécules du CMH du soi) puis la sélection négative dans la médullaire thymique (élimine les clones dont le TCR se lie avec une trop forte affinité aux peptides du soi, garantissant l'autotolérance centrale).",
    piegeBac:
      "Ne dites jamais que les LT acquièrent leur spécificité après avoir rencontré l'antigène étranger. Leur récepteur TCR est réarrangé aléatoirement dans le thymus AVANT tout contact antigénique. Plus de 95% des thymocytes meurent par apoptose lors de ces sélections.",
    formuleCle:
      'Cortex : CMH reconnu = survie (restriction) | Médullaire : Soi fortement reconnu = apoptose (tolérance)',
    pointsCles: [
      'Origine : Moelle osseuse rouge (pro-T) -> Maturation & éducation : Thymus.',
      'TCR : Hétérodimère αβ (ou γδ) associé au complexe invariant CD3 transducteur.',
      'Sélection positive corticale : Assure la restriction au CMH du soi.',
      'Sélection négative médullaire : Élimine les clones autoréactifs (tolérance au soi).'
    ]
  },
  {
    id: 'double_reconnaissance_tcr_cmh',
    number: '02',
    title: 'Double Reconnaissance : TCR, Corécepteurs CD4/CD8 & CMH',
    badge: 'Signalisation',
    tag: 'Synapse Immunologique',
    principe:
      "Contrairement aux anticorps libres ou au BCR qui peuvent fixer un antigène natif soluble, le TCR est incapable de fixer un antigène seul. Il exige une DOUBLE RECONNAISSANCE simultanée : le fragment peptidique étranger (épitope) ET la molécule du CMH qui le présente à la surface d'une cellule cible ou d'une CPA. Le corécepteur CD8 stabilise la liaison avec le CMH I, tandis que le CD4 stabilise la liaison avec le CMH II.",
    piegeBac:
      "Confondre les couples : retenez la règle mathématique du 8 -> 8 × 1 = 8 (CD8 se lie au CMH I) et 4 × 2 = 8 (CD4 se lie au CMH II). Si une cellule infectée présente un peptide viral sur son CMH I, seul un LT8 peut être activé, jamais un LT4.",
    formuleCle:
      'LT8 + CD8 ──> CMH I (cellule cible altérée) | LT4 + CD4 ──> CMH II (CPA dendritique/macrophage/LB)',
    pointsCles: [
      'Antigène non natif : Découpé en peptides présentés dans le sillon du CMH.',
      'Corécepteur CD8 : Monomère/dimère se liant au domaine α3 non polymorphe du CMH I.',
      'Corécepteur CD4 : Se lie au domaine β2 non polymorphe du CMH II.',
      'Synapse immunologique : Regroupement polarisé TCR-CD3, intégrines LFA-1/ICAM-1 et corécepteurs.'
    ]
  },
  {
    id: 'lt4_pivot_central',
    number: '03',
    title: 'Rôle Central et Pivot des Lymphocytes T4 (Auxiliaires)',
    badge: 'Régulation',
    tag: 'Interleukine-2 & Helpers',
    principe:
      "Le lymphocyte T4 auxiliaire (LTh ou Helper) est le chef d'orchestre incontournable de toutes les réponses adaptatives spécifiques. Activé par une CPA professionnelle via son CMH II, le LT4 sécrète de l'Interleukine-2 (IL-2) qui agit de manière autocrine (sur lui-même) pour stimuler sa propre prolifération clonale, et de manière paracrine pour activer la prolifération et différenciation des LT8 en LTC ainsi que des LB en plasmocytes.",
    piegeBac:
      "L'absence ou la destruction des LT4 (comme dans l'infection par le VIH qui cible spécifiquement le CD4) anéantit à la fois l'immunité cellulaire (manque d'IL-2 pour les LT8) ET l'immunité humorale (absence d'aide pour la différenciation des plasmocytes).",
    formuleCle:
      'CPA (CMH II + Il-1) ──> LT4 ──(IL-2 autocrine + paracrine)──> Activation LT8 (LTC) & LB (Plasmocytes)',
    pointsCles: [
      'Présentation par CPA : Cellule dendritique, macrophage ou LB activé.',
      'Signaux 1 & 2 : Signal 1 (TCR/CMH II) + Signal 2 de costimulation (B7/CD28).',
      'IL-2 autocrine : Expression de la chaîne α de haute affinité du récepteur à l\'IL-2 (CD25).',
      'Polarisation : Th1 (immunité cellulaire, IFN-γ) vs Th2 (immunité humorale, IL-4, IL-5).'
    ]
  },
  {
    id: 'differentiation_lt8_ltc',
    number: '04',
    title: 'Activation, Prolifération & Différenciation des LT8 en LTC',
    badge: 'Différenciation',
    tag: 'Clonage & LTC effecteurs',
    principe:
      "Un LT8 naïf reconnaît le peptide antigénique sur le CMH I d'une CPA autorisée ou d'une cellule infectée. Sous l'effet stimulant conjoint du signal antigénique, des molécules de costimulation et surtout de l'IL-2 fournie par le LT4 coopérant, le clone de LT8 subit une expansion clonale explosive dans les organes lymphoïdes secondaires, suivie d'une différenciation en Lymphocytes T Cytotoxiques effecteurs (LTC ou CTL) armés de granules lytiques, et en LT8 mémoires à longue durée de vie.",
    piegeBac:
      "Un LT8 naïf ne peut pas tuer immédiatement une cellule cible dès le premier contact. Il doit d'abord être activé, proliférer et se différencier en LTC contenant les granules de perforine et granzymes (délai de 3 à 5 jours en réponse primaire).",
    formuleCle:
      'LT8 naïf + Ag/CMH I + IL-2 (LT4) ──> Expansion Clonale ──> LTC effecteurs (lytiques) + LT8 mémoires',
    pointsCles: [
      'Organes lymphoïdes secondaires : Rate et ganglions lymphatiques (lieux de rencontre).',
      'Acquisition de la machinerie lytique : Synthèse de perforines et protéases granzymes.',
      'Perte de dépendance aux signaux de costimulation : Le LTC effecteur tue sans délai.',
      'LT8 mémoires : Protègent l\'organisme lors d\'une réinfection (réponse secondaire fulgurante).'
    ]
  },
  {
    id: 'mecanismes_cytotoxicite',
    number: '05',
    title: 'Mécanismes de la Cytotoxicité : Perforines, Granzymes & Fas/FasL',
    badge: 'Cytolyse',
    tag: 'Apoptose & Baiser de la Mort',
    principe:
      "Le LTC effecteur détruit les cellules cibles (infectées par un virus ou cancéreuses) par deux voies complémentaires : la voie perforine-granzyme (le LTC libère par exocytose polarisée de la perforine qui polymérise en présence de calcium pour forer des canaux transmembranaires, permettant l'entrée des granzymes qui déclenchent la cascade des caspases) et la voie Fas/FasL (interaction ligand-récepteur de mort induisant l'apoptose). La cellule meurt proprement par suicide cellulaire programmé sans disséminer les particules virales.",
    piegeBac:
      "La lyse par le LTC n'est pas une simple explosion osmotique désordonnée comme celle provoquée par le CAM du complément. Il s'agit d'une apoptose (condensation de la chromatine, fragmentation nucléosomique de l'ADN, corps apoptotiques phagocytés sans inflammation collatérale). De plus, le LTC survit et peut détruire plusieurs cibles successivement.",
    formuleCle:
      'LTC ──(Perforine = pores Ca²⁺ + Granzyme = caspases)──> Apoptose cible | LTC se détache indemne',
    pointsCles: [
      'Polarisation du cytosquelette : Orientation du centrosome (MTOC) vers la synapse immunologique.',
      'Perforines : Polymérisation dépendante du Ca²⁺ formant un pore de 10-20 nm.',
      'Granzymes (Granzyme B) : Clivage de Bid et activation de la procaspase 3 conduisant à l\'apoptose.',
      'Protection du LTC : Présence de cathepsine B membranaire qui inactive la perforine résiduelle.'
    ]
  },
  {
    id: 'experience_zinkernagel_doherty',
    number: '06',
    title: 'Expériences Clés du Bac : Zinkernagel & Doherty (Restriction CMH)',
    badge: 'Expérimentation',
    tag: 'Preuve Restriction CMH',
    principe:
      "Dans l'expérience historique de Zinkernagel et Doherty (Prix Nobel 1996), des souris de souche A (CMH H-2k) sont infectées par le virus LCM. Les LTC prélevés ne lysent in vitro que les cellules infectées par le virus LCM ET issues de la même souche A (CMH H-2k). Si les cellules cibles proviennent d'une souche B (CMH H-2d) même infectées par LCM, ou si elles sont de souche A mais saines ou infectées par un autre virus, aucune lyse n'a lieu. Cela prouve l'absolue nécessité d'une double reconnaissance : même antigène ET même CMH.",
    piegeBac:
      "Dans les sujets du Bac sénégalais, veillez à analyser méthodiquement chaque lot expérimental : Lot témoin, lot à CMH différent, lot à virus différent. Concluez toujours sur la double spécificité de la cytolyse : spécificité vis-à-vis de l'antigène viral ET histocompatibilité stricte (restriction allogénique du CMH).",
    formuleCle:
      'Lyse = [Même virus LCM] ET [Même CMH H-2k] | Si l\'un des deux paramètres diffère ──> Lyse = 0',
    pointsCles: [
      'Lot 1 : Cellules hôtes A + Virus LCM + LTC A immunisés LCM ──> LYSE ACTIVE (+)',
      'Lot 2 : Cellules hôtes B (allogéniques) + Virus LCM + LTC A ──> PAS DE LYSE (-)',
      'Lot 3 : Cellules hôtes A + Virus de la variole (non LCM) + LTC A ──> PAS DE LYSE (-)',
      'Conclusion : Le TCR ne reconnaît pas l\'Ag seul ni le CMH seul, mais le complexe CMH-peptide.'
    ]
  }
];

export default function B3ImmuniteCellulaireReflexesCard() {
  const [activeTab, setActiveTab] = useState<string>('maturation_selection_thymique');
  const activeReflexe = REFLEXES_B3L3.find((r) => r.id === activeTab) || REFLEXES_B3L3[0];

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden my-8">
      {/* Header Médical Sobre */}
      <div className="bg-gradient-to-r from-red-800 to-rose-900 text-white p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-md tracking-wider uppercase">
              Fiches Réflexes Bac S2
            </span>
            <span className="text-rose-200 text-xs font-medium">SVT • Chapitre B3 • Leçon 3</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-rose-100 bg-black/20 px-3 py-1 rounded-full">
            <ShieldCheck size={14} className="text-rose-300" />
            <span>Immunité Adaptative Cellulaire & LT4 Pivot</span>
          </div>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Les 6 Réflexes Incontournables des Lymphocytes T & Cytotoxicité
        </h2>
        <p className="text-rose-100 text-sm mt-1 max-w-3xl">
          Fiches méthodologiques de synthèse basées sur les grilles d'évaluation de l'Office du Bac sénégalais : TCR, restriction au CMH, rôle pivot des LT4 et mécanismes de l'apoptose.
        </p>
      </div>

      {/* Navigation Onglets Horizontaux */}
      <div className="border-b border-gray-200 bg-gray-50/75 p-2 overflow-x-auto scrollbar-thin">
        <div className="flex gap-2 min-w-max">
          {REFLEXES_B3L3.map((reflexe) => {
            const isSelected = reflexe.id === activeTab;
            return (
              <button
                key={reflexe.id}
                onClick={() => setActiveTab(reflexe.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  isSelected
                    ? 'bg-red-800 text-white shadow-sm ring-1 ring-red-900'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isSelected ? 'bg-white text-red-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {reflexe.number}
                </span>
                <span>{reflexe.title.split(':')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenu Fiche Active */}
      <div className="p-5 sm:p-7 space-y-6">
        {/* Titre & Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-red-800 font-bold text-xs uppercase tracking-wider">
                Réflexe #{activeReflexe.number}
              </span>
              <span className="bg-red-50 text-red-700 text-xs font-semibold px-2 py-0.5 rounded border border-red-200">
                {activeReflexe.badge}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">{activeReflexe.title}</h3>
          </div>
          <div className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-md font-medium border border-gray-200">
            {activeReflexe.tag}
          </div>
        </div>

        {/* Principe Fondamental */}
        <div className="bg-red-50/50 border border-red-100 rounded-xl p-4 sm:p-5">
          <div className="flex items-center gap-2 text-red-900 font-bold text-sm mb-2">
            <Target size={18} className="text-red-700" />
            <span>Principe Fondamental à Restituer</span>
          </div>
          <p className="text-gray-800 text-sm leading-relaxed">{activeReflexe.principe}</p>
        </div>

        {/* Équation / Règle Mémotechnique Clé */}
        <div className="bg-gray-900 text-gray-100 rounded-xl p-4 sm:p-5 font-mono text-xs sm:text-sm border border-gray-800 shadow-inner">
          <div className="flex items-center gap-2 text-rose-400 font-sans font-bold text-xs uppercase tracking-wider mb-2">
            <Zap size={15} />
            <span>Formule ou Règle d'Or Mémotechnique</span>
          </div>
          <div className="text-emerald-300 font-semibold leading-relaxed">
            {activeReflexe.formuleCle}
          </div>
        </div>

        {/* Grille 2 colonnes : Points Clés & Piège de l'Office du Bac */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Points Clés Barème */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-xs">
            <div className="flex items-center gap-2 text-gray-900 font-bold text-sm mb-3">
              <CheckCircle2 size={17} className="text-emerald-600" />
              <span>Points d'Attribution des Notes au Bac</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
              {activeReflexe.pointsCles.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Piège Fréquent du Bac */}
          <div className="bg-amber-50/60 border border-amber-200/80 rounded-xl p-4 sm:p-5 shadow-xs">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-sm mb-2">
              <HelpCircle size={17} className="text-amber-700" />
              <span>Piège Fréquent des Candidats (À Éviter)</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
              {activeReflexe.piegeBac}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

