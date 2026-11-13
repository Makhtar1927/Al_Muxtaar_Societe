'use client';

import React, { useState } from 'react';
import {
  Activity,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  FlaskConical,
  Sliders,
  MapPin,
  ChevronRight,
} from 'lucide-react';

type StageKey = 'fecondation' | 'segmentation' | 'nidation' | 'placenta' | 'accouchement' | 'lactation';

interface StageInfo {
  title: string;
  badge: string;
  timeframe: string;
  organ: string;
  keyMolecules: string;
  summary: string;
  bacWatchout: string;
  details: string[];
}

const STAGES: Record<StageKey, StageInfo> = {
  fecondation: {
    title: '1. Fécondation & Réaction Corticale',
    badge: 'Ampoule tubaire',
    timeframe: 'H0 (dans les 24h post-ovulation)',
    organ: 'Tiers externe de la trompe de Fallope',
    keyMolecules: 'Hyaluronidase, Acrosine, Récepteurs ZP3, Ca2+ intracellulaire',
    summary:
      'La rencontre entre l’ovocyte II bloqué en métaphase II et les spermatozoïdes capacitants se déroule dans l’ampoule tubaire. La traversée de la zone pellucide déclenche la réaction acrosomique, puis la fusion membranaire induit une onde calcique provoquant l’exocytose des granules corticaux (blocage polyspermie) et l’expulsion du 2e globule polaire.',
    bacWatchout:
      'L’ovocyte n’est pas fécondé au stade d’ovule : c’est la fécondation elle-même qui force l’achèvement de la méiose II et donne l’ovule vrai + 2e GP.',
    details: [
      'Capacitation préalable dans les voies génitales féminines (élimination du cholestérol membranaire).',
      'Traversée de la corona radiata sous l’effet des battements flagellaires et hyaluronidases.',
      'Reconnaissance ZP3 -> Réaction acrosomique (enzymes protéolytiques digérant la zone pellucide).',
      'Réaction corticale immédiate : durcissement enzymatique de la zone pellucide (blocage strict de la polyspermie).',
      'Amphimixie : fusion des 2 pronuclei (n=23 chromosomes chacun) -> Zygote diploïde 2n=46.',
    ],
  },
  segmentation: {
    title: '2. Segmentation & Migration Tubaire',
    badge: 'Trajet Trompe -> Cavité Utérine',
    timeframe: 'J1 à J4 post-fécondation',
    organ: 'Trompe de Fallope -> Lumière utérine',
    keyMolecules: 'Mitoses successives, compaction, cils tubaires, glycogène utérin',
    summary:
      'Pendant sa progression vers l’utérus sous l’effet des battements des cils tubaires et des contractions péristaltiques, le zygote subit une série de mitoses sans augmentation du volume total : 2 cellules (J1), 4 cellules (J2), 8 cellules, puis morula (16-32 cellules, J3-J4).',
    bacWatchout:
      'La masse et le volume total de l’embryon ne changent pas durant la segmentation : les blastomères deviennent simplement de plus en plus petits.',
    details: [
      'Divisions de clivage purement mitotiques conservant le caryotype 2n=46.',
      'Morula à l’aspect de petite mûre entourée de sa zone pellucide étanche.',
      'Compaction des blastomères externes créant des jonctions serrées étanches.',
      'Déplacement tubaire passif assuré par le flux liquidien et les cellules ciliées de la muqueuse.',
      'Entrée dans la cavité utérine vers le 4e jour.',
    ],
  },
  nidation: {
    title: '3. Blastocyste & Nidation (Implantation)',
    badge: 'Endomètre sécrétoire',
    timeframe: 'J5 à J7 post-fécondation',
    organ: 'Endomètre en phase lutéale sécrétoire (dentelle utérine)',
    keyMolecules: 'HCG embryonnaire, enzymes protéolytiques trophoblastiques, progestérone lutéale',
    summary:
      'La morula se creuse pour devenir un blastocyste constitué du trophoblaste externe et du bouton embryonnaire interne. Après éclosion (perte de la zone pellucide), le trophoblaste s’ancre dans la dentelle utérine et commence à sécréter activement l’hormone HCG pour sauver le corps jaune.',
    bacWatchout:
      'La nidation exige une fenêtre d’implantation précise : l’endomètre doit être préparé par la progestérone (dentelle utérine riche en glycogène et vaisseaux spiralés).',
    details: [
      'Éclosion au 5e jour : rupture enzymatique de la zone pellucide libérant le blastocyste.',
      'Différenciation du trophoblaste en cytotrophoblaste et syncytiotrophoblaste invasif.',
      'Invasion de l’endomètre par érosion des capillaires maternels créant les lacunes sanguines.',
      'Sécrétion de HCG dès J7-J8 : maintien immédiat du corps jaune gravidique.',
      'Absence de règles : la progestérone ne chute pas, la dentelle utérine est préservée.',
    ],
  },
  placenta: {
    title: '4. Relais Placentaire & Gestation Autonome',
    badge: 'Mois 3 à Mois 9',
    timeframe: 'Semaines 10 à 40',
    organ: 'Placenta hémochorial & Unité foeto-maternelle',
    keyMolecules: 'Progestérone placentaire, Œstriol, HPL, Cortisol fœtal',
    summary:
      'À la fin du 1er trimestre, le placenta prend totalement le relais endocrinien du corps jaune. Il produit des quantités massives de progestérone (qui bloque le myomètre) et d’œstrogènes, tout en assurant les échanges gazeux, nutritifs et immunitaires sans mélange des sangs maternel et fœtal.',
    bacWatchout:
      'L’ovariectomie bilatérale pratiquée après le 3e mois n’interrompt pas la grossesse car le placenta assure seul la production de progestérone.',
    details: [
      'Inhibition du myomètre par la progestérone : le myomètre reste au repos complet (silence utérin).',
      'Action trophique des œstrogènes : hypertrophie du myomètre et développement de la glande mammaire.',
      'Barrière placentaire protectrice : passage des nutriments, O2/CO2 et anticorps IgG maternels.',
      'Arrêt de la maturation de nouveaux follicules par rétrocontrôle négatif puissant et continu.',
      'Involution physiologique du corps jaune ovarien sans conséquences sur la gestation.',
    ],
  },
  accouchement: {
    title: '5. Parturition & Boucle de Ferguson',
    badge: 'Col & Myomètre utérin',
    timeframe: 'Fin du 9e mois (Semaine 40)',
    organ: 'Myomètre utérin, col, neurohypophyse maternelle',
    keyMolecules: 'Ocytocine, Prostaglandines PGF2a, Chute ratio Progestérone/Œstrogènes',
    summary:
      'La fin de grossesse est marquée par une hypersensibilité du myomètre aux stimulants contractiles. L’engagement de la tête fœtale dilate le col, activant un réflexe neuro-endocrinien (réflexe de Ferguson) : l’ocytocine hypophysaire provoque de puissantes contractions rythmiques qui s’auto-amplifient en boucle positive.',
    bacWatchout:
      'Il s’agit d’un rétrocontrôle positif : la contraction aggrave la distension du col, ce qui augmente encore la libération d’ocytocine jusqu’à la délivrance.',
    details: [
      'Maturation cervicale sous l’action des prostaglandines (ramollissement et effacement du col).',
      'Apparition des récepteurs à l’ocytocine sur les fibres musculaires lisses du myomètre.',
      'Réflexe de Ferguson : mécanorécepteurs du col -> moelle épinière -> hypothalamus -> ocytocine.',
      'Contractions péristaltiques descendantes expulsant le fœtus vers le bas.',
      'Délivrance : expulsion du placenta 15-30 minutes après le fœtus, suivie d’hémostase mécanique.',
    ],
  },
  lactation: {
    title: '6. Montée de Lait, Succion & Éjection',
    badge: 'Glandes mammaires',
    timeframe: 'Post-partum (J1 à plusieurs mois)',
    organ: 'Acini mammaires & Canaux galactophores',
    keyMolecules: 'Prolactine (antéhypophyse), Ocytocine (posthypophyse), Chute des œstrogènes',
    summary:
      'Pendant la grossesse, les œstrogènes bloquaient l’action de la prolactine. L’expulsion du placenta lève ce frein : la prolactine déclenche la synthèse du lait dans les acini. La stimulation mécanique du mamelon par la tétée active simultanément la prolactine (fabrication) et l’ocytocine (contraction myoépithéliale pour l’éjection).',
    bacWatchout:
      'Distinction stricte au Bac : la prolactine synthétise le lait (dans les acini), tandis que l’ocytocine l’éjecte (cellules myoépithéliales des canaux).',
    details: [
      'Chute brutale des stéroïdes placentaires à la délivrance : levée du blocage de la prolactine.',
      'Succion du mamelon -> influx nerveux sensitif ascendant vers l’hypothalamus.',
      'Inhibition de la dopamine (PIF) -> Décharge de prolactine par l’antéhypophyse -> Synthèse du lait.',
      'Décharge réflexe d’ocytocine par la posthypophyse -> Contraction myoépithéliale -> Éjection.',
      'Effet contraceptif temporaire : la prolactine élevée freine la GnRH (aménorrhée de lactation).',
    ],
  },
};

interface Experiment {
  id: string;
  title: string;
  subject: string;
  procedure: string;
  result: string;
  deduction: string;
}

const EXPERIMENTS: Experiment[] = [
  {
    id: 'exp1',
    title: 'Ovariectomie bilatérale à la 4e semaine de grossesse',
    subject: 'Femme enceinte ou femelle mammifère gestante',
    procedure: 'Ablation chirurgicale des deux ovaires (contenant le corps jaune) au cours du premier mois.',
    result: 'Avortement spontané immédiat avec reprise des saignements de type menstruel.',
    deduction:
      'Pendant le premier trimestre, le corps jaune ovarien est strictement indispensable au maintien de la grossesse par sa sécrétion de progestérone.',
  },
  {
    id: 'exp2',
    title: 'Ovariectomie bilatérale au 4e mois de gestation',
    subject: 'Femme enceinte ou guenon au 4e mois',
    procedure: 'Ablation chirurgicale bilatérale des ovaires après 14 semaines d’aménorrhée.',
    result: 'La grossesse se poursuit normalement jusqu’à terme, sans avortement.',
    deduction:
      'Dès le 3e mois, le placenta a pris le relais endocrinien complet du corps jaune : la progestérone ovarienne n’est plus nécessaire.',
  },
  {
    id: 'exp3',
    title: 'Injection quotidienne de HCG en phase lutéale non fécondée',
    subject: 'Femme volontaire saine au 20e jour de son cycle',
    procedure: 'Injections quotidiennes d’hormone choriale gonadotrope HCG à partir de J20.',
    result: 'Le corps jaune persiste au-delà de J28, la progestérone reste haute, les règles n’apparaissent pas (retard de règles provoqué).',
    deduction:
      'La HCG mime l’action lutéotrope de la LH : elle maintient le corps jaune en activité et l’empêche d’involuer en corps albicans.',
  },
  {
    id: 'exp4',
    title: 'Administration de Mifépristone (RU 486)',
    subject: 'Femme au début de grossesse (5e semaine)',
    procedure: 'Prise orale de Mifépristone, antagoniste compétitif des récepteurs de la progestérone.',
    result: 'Levée du silence utérin, contractions du myomètre, desquamation de l’endomètre et expulsion de l’œuf.',
    deduction:
      'La progestérone est indispensable au maintien de la muqueuse utérine et à l’inhibition de l’excitabilité du myomètre. En bloquant ses récepteurs, le RU486 déclenche l’interruption de grossesse.',
  },
  {
    id: 'exp5',
    title: 'Section des connexions nerveuses mammaires chez une nourrice',
    subject: 'Femelle mammifère allaitante',
    procedure: 'Anesthésie locale des nerfs sensitifs innervant la région de l’aréole et du mamelon.',
    result: 'La mère continue à produire du lait s’il y a prolactine résiduelle, mais le lait ne s’éjecte plus lors de la tétée.',
    deduction:
      'L’éjection du lait dépend d’un arc réflexe neuro-hormonal déclenché par les mécanorécepteurs du mamelon stimulant l’ocytocine.',
  },
];

export default function B4FecondationInteractiveLab() {
  const [activeStage, setActiveStage] = useState<StageKey>('fecondation');
  const [selectedExp, setSelectedExp] = useState<string>('exp1');
  const [gestationWeek, setGestationWeek] = useState<number>(12);

  const getHormoneLevels = (week: number) => {
    let hcg = 0;
    if (week <= 2) hcg = 5;
    else if (week <= 9) hcg = 15 + ((week - 2) / 7) * 85;
    else if (week <= 14) hcg = 100 - ((week - 9) / 5) * 70;
    else hcg = 30 - ((week - 14) / 26) * 10;

    const prog = Math.min(100, Math.round(15 + (week / 40) * 85));
    const oestrogene = Math.min(100, Math.round(10 + Math.pow(week / 40, 1.3) * 90));
    const prolactine = Math.min(100, Math.round(10 + (week / 40) * 80));
    const ocytocine = week >= 38 ? Math.round(20 + ((week - 38) / 2) * 80) : 10;

    return { hcg: Math.round(hcg), prog, oestrogene, prolactine, ocytocine };
  };

  const hormones = getHormoneLevels(gestationWeek);
  const stage = STAGES[activeStage];
  const activeExperiment = EXPERIMENTS.find((e) => e.id === selectedExp) || EXPERIMENTS[0];

  return (
    <div className="my-10 rounded-3xl bg-white border border-navy/10 p-5 sm:p-7 shadow-sm">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/10 pb-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-3 py-1 text-xs font-bold text-navy mb-1 border border-navy/10">
            <Activity className="w-3.5 h-3.5 text-turquoise" />
            <span>Simulateur Physiologique &amp; Laboratoire Virtuel</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-navy">
            De la Fécondation à la Lactation : Cinétique &amp; Relais Hormonaux
          </h3>
          <p className="text-xs sm:text-sm text-text/70 mt-0.5">
            Étude interactive des 6 étapes embryonnaires, du profil hormonal S0-S40 et des expériences historiques du Baccalauréat.
          </p>
        </div>
      </div>

      {/* Barre d'onglets pour les 6 étapes */}
      <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
        {(Object.keys(STAGES) as StageKey[]).map((key) => {
          const item = STAGES[key];
          const isSelected = activeStage === key;
          return (
            <button
              key={key}
              onClick={() => setActiveStage(key)}
              className={`rounded-2xl p-3 text-left transition-all border ${
                isSelected
                  ? 'bg-navy text-white border-navy shadow-sm'
                  : 'bg-surface/50 text-navy/80 border-navy/10 hover:bg-surface hover:border-navy/20'
              }`}
            >
              <span
                className={`block text-[10px] font-bold uppercase tracking-wider ${
                  isSelected ? 'text-turquoise' : 'text-text/50'
                }`}
              >
                {item.badge}
              </span>
              <span className="mt-1 block text-xs font-bold leading-tight">
                {item.title.split('. ')[1]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Fiche détaillée de l'étape sélectionnée */}
      <div className="mb-8 rounded-2xl border border-navy/10 bg-surface/30 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-navy/10 pb-3">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-turquoise mb-0.5">
              <Clock className="w-3.5 h-3.5" />
              <span>{stage.timeframe}</span>
            </div>
            <h4 className="text-base sm:text-lg font-black text-navy">{stage.title}</h4>
            <div className="flex items-center gap-1.5 text-xs text-text/60 mt-0.5">
              <MapPin className="w-3 h-3 text-navy/40" />
              <span>Siège anatomique : {stage.organ}</span>
            </div>
          </div>
          <span className="self-start sm:self-center rounded-xl bg-navy/5 border border-navy/10 px-3 py-1 text-xs font-semibold text-navy">
            Médiateurs : {stage.keyMolecules}
          </span>
        </div>

        <p className="mt-3 text-xs sm:text-sm leading-relaxed text-text/80">
          {stage.summary}
        </p>

        {/* Détails méthodologiques */}
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          {stage.details.map((point, idx) => (
            <div
              key={idx}
              className="flex items-start gap-2.5 rounded-xl bg-white p-3 border border-navy/10 shadow-xs"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-navy/5 text-[10px] font-bold text-navy border border-navy/10">
                {idx + 1}
              </span>
              <span className="text-xs text-text/80 leading-relaxed">{point}</span>
            </div>
          ))}
        </div>

        {/* Alerte Bac S2 */}
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/80 p-3 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-950">
            <span className="font-bold block mb-0.5">Point de vigilance officiel au Bac S2 :</span>
            <p className="leading-relaxed opacity-90">{stage.bacWatchout}</p>
          </div>
        </div>
      </div>

      {/* MODULE 2 : Simulateur Chronologique des Hormones de Gestation */}
      <div className="mb-8 rounded-2xl border border-navy/10 bg-white p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/10 pb-3">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-navy/60 mb-0.5">
              <Sliders className="w-3.5 h-3.5 text-turquoise" />
              <span>Courbes de Cinétique Hormonale</span>
            </div>
            <h4 className="text-base font-black text-navy">
              Profil Hormonal au cours de la Gestation (Semaines 0 à 40)
            </h4>
            <p className="text-xs text-text/60 mt-0.5">
              Ajustez le curseur pour observer l’évolution conjointe de HCG, Progestérone, Œstrogènes, Prolactine et Ocytocine.
            </p>
          </div>
          <span className="self-start sm:self-center rounded-xl bg-navy text-white px-3 py-1 text-xs font-bold">
            Semaine {gestationWeek} {gestationWeek <= 12 ? '(1er trimestre)' : gestationWeek <= 27 ? '(2e trimestre)' : '(3e trimestre)'}
          </span>
        </div>

        {/* Slider temporel */}
        <div className="mt-4">
          <div className="flex justify-between text-[11px] font-semibold text-text/50">
            <span>S0 (Fécondation)</span>
            <span>S9 (Pic HCG)</span>
            <span>S12 (Relais Placentaire)</span>
            <span>S28 (3e Trimestre)</span>
            <span>S40 (Parturition)</span>
          </div>
          <input
            type="range"
            min={0}
            max={40}
            step={1}
            value={gestationWeek}
            onChange={(e) => setGestationWeek(parseInt(e.target.value, 10))}
            className="mt-1 h-2 w-full cursor-pointer appearance-none rounded-lg bg-surface accent-navy"
          />
        </div>

        {/* Jauges hormonales synchronisées */}
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {/* HCG */}
          <div className="rounded-xl border border-navy/10 bg-surface/30 p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-navy">HCG embryonnaire</span>
              <span className="text-xs font-black text-amber-700">{hormones.hcg}%</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-navy/10">
              <div className="h-full bg-amber-500 transition-all duration-300" style={{ width: `${hormones.hcg}%` }} />
            </div>
            <p className="mt-2 text-[10px] text-text/60 leading-tight">
              {gestationWeek <= 10
                ? 'Maintien vital du corps jaune ovarien.'
                : 'Déclin post-S10 : le placenta a pris le relais.'}
            </p>
          </div>

          {/* Progestérone */}
          <div className="rounded-xl border border-navy/10 bg-surface/30 p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-navy">Progestérone</span>
              <span className="text-xs font-black text-emerald-700">{hormones.prog}%</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-navy/10">
              <div className="h-full bg-emerald-600 transition-all duration-300" style={{ width: `${hormones.prog}%` }} />
            </div>
            <p className="mt-2 text-[10px] text-text/60 leading-tight">
              {gestationWeek < 12 ? 'Origine : Corps jaune ovarien.' : 'Origine : Placenta mature (silence utérin).'}
            </p>
          </div>

          {/* Œstrogènes */}
          <div className="rounded-xl border border-navy/10 bg-surface/30 p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-navy">Œstrogènes</span>
              <span className="text-xs font-black text-indigo-700">{hormones.oestrogene}%</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-navy/10">
              <div className="h-full bg-indigo-600 transition-all duration-300" style={{ width: `${hormones.oestrogene}%` }} />
            </div>
            <p className="mt-2 text-[10px] text-text/60 leading-tight">
              Trophisme utérin et différenciation galactophore.
            </p>
          </div>

          {/* Prolactine */}
          <div className="rounded-xl border border-navy/10 bg-surface/30 p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-navy">Prolactine</span>
              <span className="text-xs font-black text-sky-700">{hormones.prolactine}%</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-navy/10">
              <div className="h-full bg-sky-600 transition-all duration-300" style={{ width: `${hormones.prolactine}%` }} />
            </div>
            <p className="mt-2 text-[10px] text-text/60 leading-tight">
              Taux élevé mais action bloquée par les stéroïdes placentaires.
            </p>
          </div>

          {/* Ocytocine */}
          <div className="rounded-xl border border-navy/10 bg-surface/30 p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-navy">Ocytocine</span>
              <span className="text-xs font-black text-rose-700">{hormones.ocytocine}%</span>
            </div>
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-navy/10">
              <div className="h-full bg-rose-600 transition-all duration-300" style={{ width: `${hormones.ocytocine}%` }} />
            </div>
            <p className="mt-2 text-[10px] text-text/60 leading-tight">
              {gestationWeek >= 38 ? 'Déclenchement du travail et contractions.' : 'Sécrétion basale de repos.'}
            </p>
          </div>
        </div>
      </div>

      {/* MODULE 3 : Banc d'Expériences du Bac S2 */}
      <div className="rounded-2xl border border-navy/10 bg-white p-5">
        <div className="mb-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-navy/60 mb-0.5">
            <FlaskConical className="w-3.5 h-3.5 text-turquoise" />
            <span>Démarche Scientifique &amp; Protocoles Historiques</span>
          </div>
          <h4 className="text-base font-black text-navy">
            Banc d’Expériences Historiques et Cliniques
          </h4>
          <p className="text-xs text-text/60 mt-0.5">
            Sélectionnez un protocole pour analyser son observation et la déduction scientifique conforme aux critères du jury.
          </p>
        </div>

        {/* Sélecteur d'expérience */}
        <div className="flex flex-wrap gap-2">
          {EXPERIMENTS.map((exp) => (
            <button
              key={exp.id}
              onClick={() => setSelectedExp(exp.id)}
              className={`rounded-xl px-3 py-1.5 text-xs font-bold transition-all border ${
                selectedExp === exp.id
                  ? 'bg-navy text-white border-navy shadow-xs'
                  : 'bg-surface text-navy/80 border-navy/10 hover:bg-surface/80'
              }`}
            >
              {exp.title}
            </button>
          ))}
        </div>

        {/* Détail de l'expérience */}
        <div className="mt-4 rounded-xl border border-navy/10 bg-surface/30 p-4">
          <div className="flex items-center justify-between gap-2 border-b border-navy/10 pb-2 mb-3">
            <h5 className="font-bold text-navy text-xs sm:text-sm">{activeExperiment.title}</h5>
            <span className="text-[11px] text-text/60">Modèle : {activeExperiment.subject}</span>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-white p-3 border border-navy/10 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-text/50 block mb-1">
                1. Protocole Expérimental
              </span>
              <p className="text-xs text-text/80 leading-relaxed">{activeExperiment.procedure}</p>
            </div>
            <div className="rounded-xl bg-white p-3 border border-navy/10 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block mb-1">
                2. Résultats Observés
              </span>
              <p className="text-xs text-text/80 leading-relaxed">{activeExperiment.result}</p>
            </div>
            <div className="rounded-xl bg-emerald-50/80 p-3 border border-emerald-200 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                3. Déduction Attendue au Bac S2
              </span>
              <p className="text-xs font-medium text-emerald-950 leading-relaxed">{activeExperiment.deduction}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
