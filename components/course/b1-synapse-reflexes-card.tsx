'use client';

import React, { useState } from 'react';
import MathRenderer from '@/components/course/math-renderer';

interface ReflexeItem {
  id: number;
  badge: string;
  category: string;
  title: string;
  ruleTitle: string;
  ruleFormula?: string;
  ruleExplanation: string;
  piegeTitle: string;
  piegeText: string;
  wolofInsight: string;
  pointsBac: string;
}

const SYNAPSE_REFLEXES: ReflexeItem[] = [
  {
    id: 1,
    badge: 'Réflexe 1 • Neurotransmission Chimique',
    category: 'Mécanisme Moléculaire',
    title: 'Les 6 Étapes Clés de la Transmission Synaptique',
    ruleTitle: 'L’influx électrique pré-synaptique est converti en message chimique intermédiaire',
    ruleFormula: '\\text{PA présynaptique} \\xrightarrow{\\text{Entrée } Ca^{2+}} \\text{Exocytose ACh} \\xrightarrow{\\text{Fente}} \\text{Fixation Récepteurs ROC} \\to \\text{PPSE / PPSI}',
    ruleExplanation:
      'L’arrivée du potentiel d’action à la terminaison axonale dépolarise la membrane présynaptique et provoque l’ouverture des canaux Ca2+ voltage-dépendants. L’entrée massive de Ca2+ déclenche la fusion des vésicules synaptiques avec la membrane (exocytose) et la libération du neurotransmetteur (ex. acétylcholine) dans la fente synaptique (20 à 50 nm). Le médiateur diffuse et se fixe sur des récepteurs-canaux chimiodépendants (ROC) de la membrane postsynaptique.',
    piegeTitle: 'Confondre canaux voltage-dépendants et canaux chimiodépendants',
    piegeText:
      'Attention au Bac S2 : sur la membrane postsynaptique au niveau de la fente, les canaux activés par le neurotransmetteur sont STRICTEMENT chimiodépendants (ROC) et non voltage-dépendants ! Les canaux voltage-dépendants n’apparaissent qu’à partir du cône d’implantation pour générer les PA.',
    wolofInsight:
      'Xibaar bi dafay joggé ci courant (électrique) doon liquide (chimique ci fente bi) bala muy dellusiwaat ci courant. Canaux Ca2+ yi ñoo ciy tey : buñu ubbeekoo, Ca2+ dafay dugal vésicule yi ci fente bi ngir ñu sotti acétylcholine bi !',
    pointsBac: '2 à 2,5 pts (Restitution organisée)',
  },
  {
    id: 2,
    badge: 'Réflexe 2 • Potentiels Post-synaptiques',
    category: 'Électrophysiologie',
    title: 'Distinction Fondamentale : PPSE vs PPSI',
    ruleTitle: 'Le PPSE dépolarise grâce à Na+, le PPSI hyperpolarise grâce à Cl- ou K+',
    ruleFormula: '\\text{PPSE : } \\text{Entrée } Na^+ \\ (\\Delta V_m > 0) \\qquad \\text{vs} \\qquad \\text{PPSI : } \\text{Entrée } Cl^- \\text{ ou Sortie } K^+ \\ (\\Delta V_m < 0)',
    ruleExplanation:
      'Une synapse excitatrice utilise un neurotransmetteur (comme le glutamate ou l’acétylcholine à la jonction neuromusculaire) qui ouvre des canaux Na+ : l’entrée de cations dépolarise localement la membrane (Potentiel Post-Synaptique Excitateur, PPSE). Une synapse inhibitrice utilise le GABA ou la glycine qui ouvrent des canaux Cl- (entrée d’anions) ou K+ (sortie de cations), ce qui éloigne le potentiel de membrane du seuil (Potentiel Post-Synaptique Inhibiteur, PPSI).',
    piegeTitle: 'Croire qu’un PPSE ou un PPSI obéit à la loi du tout ou rien',
    piegeText:
      'Faux absolu ! Les potentiels postsynaptiques (PPSE et PPSI) sont des réponses locales, graduables en amplitude (proportionnels à la quantité de médiateur libéré) et sommables. Ils n’obéissent JAMAIS à la loi du tout ou rien.',
    wolofInsight:
      'PPSE dafay yëkkati tension bi jëm ci seuil bi (dafa lay jox kayeel ngir nga génne PA). PPSI dafay wàccé tension bi di ko sori seuil bi (dafa lay tëj ngir bumu am dégénérescence wala saccu kow).',
    pointsBac: '1,5 à 2 pts (Analyse de graphes)',
  },
  {
    id: 3,
    badge: 'Réflexe 3 • Intégration Médullaire',
    category: 'Biophysique de l’Axone',
    title: 'Sommation Spatiale vs Sommation Temporelle',
    ruleTitle: 'Le motoneurone effectue la somme algébrique continue de tous les signaux reçus',
    ruleFormula: '\\sum (\\text{PPSE} + \\text{PPSI}) \\ge \\text{Seuil (-55 mV au cône)} \\implies \\text{Émission d’un train de PA}',
    ruleExplanation:
      'La sommation spatiale correspond à l’addition au niveau du soma des potentiels postsynaptiques générés simultanément par plusieurs synapses distinctes réparties sur les dendrites. La sommation temporelle correspond à l’addition sur une même synapse de potentiels postsynaptiques rapprochés dans le temps, issus d’une salve de potentiels d’action à haute fréquence.',
    piegeTitle: 'Oublier le signe négatif des PPSI dans la somme algébrique',
    piegeText:
      'Lors d’une stimulation conjointe d’un neurone excitateur et d’un neurone inhibiteur, le PPSI vient retrancher son amplitude au PPSE : si PPSE = +15 mV et PPSI = -10 mV, la dépolarisation résultante n’est que de +5 mV, insuffisante pour atteindre le seuil de -55 mV.',
    wolofInsight:
      'Sommation spatiale mooy ay xarit yu bari ñu lay woolé ci benn waxtu ci wet yu wuute. Sommation temporelle mooy benn nit buy kocc-kocc ci sa bountu ak gaaw gaaw ba nga ubbi ko. Cône d’émergence bi mooy juge bi di xool ndax seuil bi agg na !',
    pointsBac: '2 pts (Raisonnement scientifique)',
  },
  {
    id: 4,
    badge: 'Réflexe 4 • Zone Gâchette',
    category: 'Neurocytologie',
    title: 'Rôle Stratégique du Cône d’Implantation',
    ruleTitle: 'Le cône d’implantation possède le seuil d’excitabilité le plus bas du neurone',
    ruleFormula: '\\text{Densité en CVD-}Na^+ \\ : \\ \\text{Cône d’implantation} \\approx 100 \\times \\text{Soma} \\implies \\text{Seuil critique} = -55\\text{ mV}',
    ruleExplanation:
      'Les dendrites et le soma ne possèdent pratiquement pas de canaux Na+ voltage-dépendants : ils ne peuvent donc pas propager de potentiel d’action. Le cône d’implantation (ou segment initial de l’axone) possède la plus forte densité cellulaire en canaux Na+ voltage-dépendants : c’est le site d’intégration exclusif où se déclenche le PA si la somme des potentiels atteint le seuil critique (-55 mV).',
    piegeTitle: 'Penser que le potentiel d’action prend naissance sur les dendrites',
    piegeText:
      'Au Baccalauréat sénégalais, affirmer qu’un PA naît sur les dendrites ou dans le noyau entraîne la perte des points. Le PA naît TOUJOURS au niveau du cône d’implantation puis se propage de manière cellulifuge le long de l’axone.',
    wolofInsight:
      'Cône d’implantation bi mooy allumette bi : su dépolarisation bi tollée ci -55 mV, dafay tàkk d’un coup génne PA buy daw ci axone bi. Dendrites yi mom duñu mën a tàkk mukk !',
    pointsBac: '1 pt (QCM & Schémas)',
  },
  {
    id: 5,
    badge: 'Réflexe 5 • Pharmacologie Synaptique',
    category: 'Neurotoxines & Bac',
    title: 'Actions Spécifiques : Curare vs Éserine au Bac S2',
    ruleTitle: 'Les poisons synaptiques ciblent sélectivement les récepteurs ou les enzymes de dégradation',
    ruleFormula: '\\text{Curare} : \\text{Bloqueur compétitif des récepteurs ACh} \\quad | \\quad \\text{Éserine} : \\text{Inhibiteur d’Acétylcholinestérase}',
    ruleExplanation:
      'Le curare se fixe sur les récepteurs postsynaptiques de l’acétylcholine sans ouvrir le canal ionique (antagoniste compétitif) : l’acétylcholine ne peut plus agir, aucun PPSE n’est généré, provoquant une paralysie flasque. L’éserine (ou la néostigmine) bloque l’acétylcholinestérase : l’acétylcholine s’accumule dans la fente synaptique, stimulant les récepteurs en continu et causant des contractions tétaniques prolongées.',
    piegeTitle: 'Confondre le curare (action postsynaptique) et la toxine botulique (action présynaptique)',
    piegeText:
      'Le curare agit en postsynaptique en bloquant les récepteurs. La toxine botulique agit en présynaptique en détruisant les protéines SNARE indispensables à l’exocytose de l’acétylcholine ! Dans les deux cas le muscle ne se contracte pas, mais le mécanisme cellulaire est opposé.',
    wolofInsight:
      'Curare dafay tëj bountu postsynaptique bi (récepteurs yi) ba acétylcholine du mën a dugal Na+. Éserine mom dafay rey ñiy balay fente bi (acétylcholinestérase), kon acétylcholine dafay toog di tëkk ba muscle bi tàyyi ci tétanie !',
    pointsBac: '2 à 2,5 pts (Exercice d’expérimentation)',
  },
  {
    id: 6,
    badge: 'Réflexe 6 • Inactivation & Élimination',
    category: 'Homéostasie Synaptique',
    title: 'L’Inactivation de l’Acétylcholine dans la Fente',
    ruleTitle: 'La brièveté du signal synaptique exige une hydrolyse enzymatique ultra-rapide',
    ruleFormula: '\\text{Acétylcholine} \\xrightarrow{\\text{Acétylcholinestérase}} \\text{Acétate} + \\text{Choline} \\xrightarrow{\\text{Recapture présynaptique}} \\text{Recyclage}',
    ruleExplanation:
      'Pour qu’une synapse puisse transmettre des signaux successifs à haute fidélité, le neurotransmetteur doit disparaître de la fente en moins d’une milliseconde. L’enzyme acétylcholinestérase, fixée à la membrane postsynaptique, hydrolyse chaque molécule d’ACh en acétate et choline. La choline est ensuite recaptée activement par le neurone présynaptique pour resynthétiser de nouvelles vésicules d’ACh.',
    piegeTitle: 'Penser que l’acétylcholine pénètre dans la cellule postsynaptique',
    piegeText:
      'L’acétylcholine ne traverse JAMAIS la membrane postsynaptique ! Elle se lie uniquement à la face externe du canal ROC, provoque son ouverture, puis se détache pour être dégradée dans la fente. Seuls les ions (Na+, K+) traversent la membrane.',
    wolofInsight:
      'Acétylcholine du dugg mukk ci biir cellule postsynaptique bi ! Dafa melni facteur buy sonner ci bountu bi rek tërëw, après ñu door ko kayeel mu dellu fukki yoon liggéeyiwaat.',
    pointsBac: '1,5 pt (Restitution des acquis)',
  },
];

export default function B1SynapseReflexesCard() {
  const [selectedReflexe, setSelectedReflexe] = useState<ReflexeItem>(SYNAPSE_REFLEXES[0]);

  return (
    <section className="rounded-3xl border border-emerald-900/10 shadow-sm overflow-hidden my-6 sm:my-8 w-full max-w-full bg-slate-950 text-slate-100">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 p-4 sm:p-6 lg:p-8 border-b border-emerald-500/20">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-300 font-bold bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30">
            REF-B1.3 • Fiche Réflexes Bac S2
          </span>
          <span className="text-xs font-semibold text-emerald-200/80 bg-teal-950/60 px-2.5 py-0.5 rounded-full border border-teal-500/20">
            Programme Officiel SVT • Neurophysiologie
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
          Les 6 Réflexes Clés : Transmission Synaptique & Intégration Nerveuse
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Ultrastructure de la synapse, cinétique de l’exocytose à acétylcholine, genèse des PPSE et PPSI, sommation spatio-temporelle au cône d’implantation et pharmacologie des poisons (curare, ésérine) étalonnés sur le barème officiel du Baccalauréat sénégalais.
        </p>

        {/* Quick Tabs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-6">
          {SYNAPSE_REFLEXES.map((r) => {
            const isCurrent = selectedReflexe.id === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedReflexe(r)}
                className={`text-left p-2.5 sm:p-3 rounded-2xl transition-all border touch-manipulation min-h-[64px] flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-900/30'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className={`text-[10px] font-mono font-bold uppercase ${isCurrent ? 'text-white' : 'text-emerald-400'}`}>
                    Réf 0{r.id}
                  </span>
                  <span className={`text-[9px] px-1.5 py-0.2 rounded font-medium ${isCurrent ? 'bg-emerald-700 text-emerald-100' : 'bg-slate-800 text-slate-400'}`}>
                    {r.category.split(' ')[0]}
                  </span>
                </div>
                <p className="text-xs font-bold truncate mt-1">
                  {r.title}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Reflexe Detail */}
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Title & Badge */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              {selectedReflexe.badge}
            </span>
            <h3 className="text-lg sm:text-xl font-black text-white mt-1">
              {selectedReflexe.title}
            </h3>
          </div>
          <div className="self-start sm:self-auto px-3 py-1 bg-slate-900 border border-emerald-500/30 rounded-xl text-emerald-300 font-mono text-xs font-bold shrink-0">
            Pondération Bac : {selectedReflexe.pointsBac}
          </div>
        </div>

        {/* Rule box */}
        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 p-4 sm:p-5 space-y-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <h4 className="text-sm font-bold text-emerald-300 uppercase tracking-wider font-mono">
              Principe Physiologique & Mécanisme Fondamental
            </h4>
          </div>
          <p className="text-sm sm:text-base font-semibold text-white leading-snug">
            {selectedReflexe.ruleTitle}
          </p>
          {selectedReflexe.ruleFormula && (
            <div className="p-3 bg-slate-950 rounded-xl border border-emerald-900/40 text-emerald-200 overflow-x-auto text-xs sm:text-sm">
              <MathRenderer content={`$$${selectedReflexe.ruleFormula}$$`} />
            </div>
          )}
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {selectedReflexe.ruleExplanation}
          </p>
        </div>

        {/* Dual Cards: Piège Bac & Wolof Insight */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Piège Bac */}
          <div className="rounded-2xl bg-rose-950/30 border border-rose-900/40 p-4 sm:p-5 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <span className="text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
                Le Piège Classique de l’Office du Bac
              </span>
            </div>
            <p className="text-sm font-bold text-rose-200">
              {selectedReflexe.piegeTitle}
            </p>
            <p className="text-xs sm:text-sm text-rose-200/80 leading-relaxed">
              {selectedReflexe.piegeText}
            </p>
          </div>

          {/* Wolof Insight */}
          <div className="rounded-2xl bg-amber-950/30 border border-amber-900/40 p-4 sm:p-5 space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-xs font-mono font-bold text-amber-300 uppercase tracking-wider">
                Ndongo S2 Wolof Insight
              </span>
            </div>
            <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed italic">
              « {selectedReflexe.wolofInsight} »
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
