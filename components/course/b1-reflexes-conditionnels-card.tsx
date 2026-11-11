'use client';

import React, { useState } from 'react';
import MathRenderer from '@/components/course/math-renderer';

interface ReflexeItem {
  id: number;
  badge: string;
  category: string;
  shortTag: string;
  title: string;
  shortTitle: string;
  ruleTitle: string;
  ruleFormula?: string;
  ruleExplanation: string;
  piegeTitle: string;
  piegeText: string;
  wolofInsight: string;
  pointsBac: string;
}

const REFLEXES_MEDULLAIRES_REFLEXES: ReflexeItem[] = [
  {
    id: 1,
    badge: 'Réflexe 1 • Anatomie Fonctionnelle',
    category: 'Arc Réflexe Médullaire',
    shortTag: 'Arc',
    title: 'Les 5 Maillons Inviolables de l’Arc Réflexe Médullaire',
    shortTitle: 'Arc Réflexe (5 Maillons)',
    ruleTitle: 'Tout réflexe inné requiert obligatoirement la continuité de 5 éléments anatomiques',
    ruleFormula: '\\text{Récepteur (FNM)} \\xrightarrow{\\text{Fibres Ia (RD)}} \\text{Centre (Moelle)} \\xrightarrow{\\text{Motoneurone } \\alpha \\text{ (RV)}} \\text{Effecteur (Muscle)}',
    ruleExplanation:
      'L’arc réflexe myotatique comprend 5 organes successifs : 1) Le récepteur sensoriel sensible à l’étirement (fuseau neuromusculaire, FNM) ; 2) La voie afférente sensitive (neurone pseudounipolaire en T dont le corps cellulaire loge dans le ganglion spinal de la racine dorsale) ; 3) Le centre nerveux intégrateur médullaire (substance grise de la moelle épinière) ; 4) La voie efférente motrice (motoneurone alpha de la corne antérieure empruntant la racine ventrale) ; 5) L’organe effecteur (muscle strié squelettique homonyme qui se contracte).',
    piegeTitle: 'Placer le corps cellulaire du neurone sensitif dans la moelle épinière',
    piegeText:
      'Erreur éliminatoire au Bac S2 ! Le corps cellulaire du neurone sensitif Ia est STRICTEMENT localisé dans le ganglion spinal de la racine dorsale. Seul le motoneurone a son péricaryon dans la corne antérieure de la substance grise.',
    wolofInsight:
      'Yoonu réflexe bi 5 maillons la am : récepteur bi (fuseau bi ci muscle bi) mooy yég étirement bi, yóbbu ko ci ganglion spinal bi (racine dorsale), moelle épinière bi joxé ndigal motoneurone bi (racine ventrale), muscle bi tàlliku door a tëb !',
    pointsBac: '2 pts (Schéma d’arc réflexe & Légendes)',
  },
  {
    id: 2,
    badge: 'Réflexe 2 • Réflexe Myotatique',
    category: 'Proprioception',
    shortTag: 'Inné',
    title: 'Le Réflexe Myotatique : Monosynaptique & Rôle Postural',
    shortTitle: 'Réflexe Myotatique',
    ruleTitle: 'Le réflexe myotatique est la contraction réflexe d’un muscle en réponse à son propre étirement',
    ruleFormula: '\\text{Étirement du muscle} \\implies \\text{Contraction du MÊME muscle (Arc Monosynaptique Direct)}',
    ruleExplanation:
      'Le réflexe myotatique (ex. réflexe rotulien ou achilléen) a pour fonction physiologique essentielle le maintien de la posture et du tonus musculaire contre la pesanteur. Il est qualifié de monosynaptique car la fibre afférente sensitive Ia s’articule DIRECTEMENT par une seule synapse excitatrice avec le motoneurone alpha innervant ce même muscle (délai synaptique minimal, réponse ultra-rapide de l’ordre de 20 à 30 ms).',
    piegeTitle: 'Confondre réflexe myotatique (monosynaptique) et réflexe nociceptif (polysynaptique)',
    piegeText:
      'Le réflexe myotatique est le SEUL réflexe monosynaptique du corps humain. Le réflexe de retrait nociceptif (retrait du pied d’un clou ou d’une surface brûlante) est polysynaptique : il fait intervenir un ou plusieurs interneurones et met en jeu plusieurs segments médullaires.',
    wolofInsight:
      'Réflexe myotatique mooy muscle bi dafa am dooley boppam : bo ko étiré, dafay contrack boppam ngir taxawaay bi bumu daanu. Benn synapse rekk la am (monosynaptique), moom ci boppam récepteur la, effecteur la !',
    pointsBac: '2 pts (Raisonnement scientifique)',
  },
  {
    id: 3,
    badge: 'Réflexe 3 • Circuit Réciproque',
    category: 'Coordination Motrice',
    shortTag: 'Relâchement',
    title: 'Innervation Réciproque & Interneurone Inhibiteur',
    shortTitle: 'Innervation Réciproque',
    ruleTitle: 'La contraction du muscle agoniste s’accompagne obligatoirement du relâchement de l’antagoniste',
    ruleFormula: '\\text{Fibre Ia} \\to \\begin{cases} + \\text{ Motoneurone Agoniste} & \\implies \\text{Contraction} \\\\ + \\text{ Interneurone Inhibiteur} \\to - \\text{ Motoneurone Antagoniste} & \\implies \\text{Relâchement (PPSI)} \\end{cases}',
    ruleExplanation:
      'Lors de la percussion du tendon rotulien, le quadriceps (extenseur agoniste) se contracte violemment. Pour permettre l’extension de la jambe sans déchirure musculaire, les muscles ischio-jambiers (fléchisseurs antagonistes) doivent simultanément être inhibés. La fibre Ia émet une collatérale qui fait synapse avec un interneurone inhibiteur (sécrétant du GABA ou de la glycine) : celui-ci génère un PPSI hyperpolarisant sur le motoneurone antagoniste.',
    piegeTitle: 'Penser que l’interneurone inhibiteur agit directement sur le muscle',
    piegeText:
      'Un interneurone est STRICTEMENT confiné dans la substance grise de la moelle épinière. Il inhibe le corps cellulaire du motoneurone antagoniste par un PPSI dans la moelle, et ne va jamais jusqu’au muscle !',
    wolofInsight:
      'Booy tàlli sa tank (quadriceps), muscle bi ci ginaaw (ischio-jambier) dafa wara féex. Interneurone inhibiteur bi ci biir moelle bi mooy tëj motoneurone antagoniste bi ak PPSI, ngir tank bi mën a julli sans blocage !',
    pointsBac: '1,5 à 2 pts (Électrophysiologie & circuits)',
  },
  {
    id: 4,
    badge: 'Réflexe 4 • Expériences de Magendie',
    category: 'Neuropathologie Expérimentale',
    shortTag: 'Racines',
    title: 'Les Expériences Fondamentales de Section et Stimulation des Racines',
    shortTitle: 'Expériences Magendie',
    ruleTitle: 'La racine dorsale est purement sensitive ; la racine ventrale est purement motrice',
    ruleFormula: '\\text{Racine Dorsale} = \\text{Afférente Sensitive (Centripète)} \\qquad \\text{vs} \\qquad \\text{Racine Ventrale} = \\text{Efférente Motrice (Centrifuge)}',
    ruleExplanation:
      'Au Bac S2, les conclusions des expériences de François Magendie sont incontournables : 1) Section du nerf rachidien mixte → perte de sensibilité ET paralysie du territoire innervé ; 2) Section de la racine dorsale → anesthésie pure (la motricité reste intacte). Stimulation du bout central → douleur et réflexe, bout périphérique → aucun effet ; 3) Section de la racine ventrale → paralysie motrice pure (la sensibilité reste intacte). Stimulation du bout central → aucun effet, bout périphérique → contraction musculaire ; 4) Dégénérescence wallérienne → localise le soma du côté resté intact relié au noyau.',
    piegeTitle: 'Confondre le bout central et le bout périphérique lors des stimulations',
    piegeText:
      'Le bout central reste connecté au centre nerveux (moelle épinière). Le bout périphérique est connecté à l’organe (muscle ou peau). Stimuler le bout central de la racine ventrale coupée n’a aucun effet car la conduction synaptique motrice est unidirectionnelle vers la périphérie !',
    wolofInsight:
      'Racine dorsale = xibaar buy duggu ci moelle (sensibilité). Racine ventrale = ndigal buy génn jëm ci muscle (motricité). Bo daggé racine dorsale, dinga tëb waaye doto yég dara. Bo daggé racine ventrale, dinga yég métit waaye doto mën a tëb !',
    pointsBac: '2,5 pts (Analyse de tableaux expérimentaux)',
  },
  {
    id: 5,
    badge: 'Réflexe 5 • Réflexes Pavloviens',
    category: 'Conditionnement',
    shortTag: 'Acquis',
    title: 'Le Réflexe Conditionnel Pavlovien : Protocole & Mécanisme',
    shortTitle: 'Réflexes Pavloviens',
    ruleTitle: 'Un stimulus initialement neutre acquiert le pouvoir de déclencher un réflexe inné après association',
    ruleFormula: '\\text{SN (Cloche)} + \\text{SI (Viande)} \\xrightarrow{\\text{Répétition & Renforcement}} \\text{SC (Cloche)} \\implies \\text{RC (Salivation)}',
    ruleExplanation:
      'Le protocole d’Ivan Pavlov comporte 4 phases rigoureuses : 1) Phase pré-conditionnelle : Le Stimulus Inconditionnel (SI, viande dans la gueule) déclenche une Réponse Inconditionnelle (RI, salivation). Le Stimulus Neutre (SN, son de cloche) ne déclenche aucune salivation ; 2) Phase de conditionnement : Association temporelle répétée où le SN précède immédiatement le SI de quelques secondes ; 3) Phase test : Le stimulus devenu Conditionnel (SC, cloche seule) déclenche la Réponse Conditionnelle (RC, salivation) ; 4) Mécanisme neurologique : Établissement d’une liaison synaptique temporaire dans le cortex cérébral entre l’aire auditive et le centre salivaire bulbaire.',
    piegeTitle: 'Présenter le stimulus inconditionnel (viande) avant le stimulus neutre (cloche)',
    piegeText:
      'Pour qu’un conditionnement réussisse, le stimulus neutre (cloche) doit TOUJOURS précéder le stimulus inconditionnel (viande) de 0,5 à quelques secondes. Si la viande est donnée avant ou en même temps, le réflexe conditionnel ne s’établit pas !',
    wolofInsight:
      'Réflexe pavlovien mooy yaram bi dafay jàng : bu xath bi déggé cloche bi ay yoon yu bari te gis viande bi toftal, xelam dafay lier ñaar yii ci cortex bi. Ba kero bu déggé cloche bi rekk, dafay saliver te gisuñu dara viande !',
    pointsBac: '2 pts (Raisonnement scientifique)',
  },
  {
    id: 6,
    badge: 'Réflexe 6 • Inné vs Acquis',
    category: 'Neurophysiologie Comparée',
    shortTag: 'Bilan',
    title: 'Extinction, Inhibition & Synthèse Comparative Inné vs Acquis',
    shortTitle: 'Inné vs Acquis (Bilan)',
    ruleTitle: 'Le réflexe conditionnel est temporaire, individuel et sous dépendance absolue du cortex',
    ruleFormula: '\\text{Réflexe Médullaire Inné (Moelle seule, immuable)} \\quad \\neq \\quad \\text{Réflexe Pavlovien Acquis (Cortex cérébral, extinction)}',
    ruleExplanation:
      'Deux différences physiologiques majeures régissent la comparaison : 1) Centre nerveux : Le réflexe myotatique inné est purement médullaire (persiste chez un animal spinal décérébré). Le réflexe conditionnel requiert obligatoirement le cortex cérébral (aboli chez l’animal décortiqué) ; 2) Réversibilité : Le réflexe inné est définitif, stéréotypé et propre à l’espèce. Le réflexe conditionnel est individuel et temporaire : si le stimulus conditionnel est présenté à de multiples reprises sans renforcement (cloche sans viande), le réflexe s’éteint progressivement (inhibition corticale d’extinction).',
    piegeTitle: 'Penser que l’extinction d’un réflexe conditionnel détruit les neurones',
    piegeText:
      'L’extinction d’un réflexe conditionnel n’est pas un oubli ou une lésion neuronale : c’est un phénomène actif d’inhibition corticale interne. Preuve : un repos de quelques heures ou une réassociation unique fait réapparaître immédiatement le réflexe.',
    wolofInsight:
      'Réflexe inné du deñ mukk, te moelle épinière rekk la laaj. Réflexe conditionnel moom, cortex bi koy sàkk, te bu ñu arrêté di ko jox viande, dafay sotti di réverser (inhibition d’extinction) !',
    pointsBac: '1,5 à 2 pts (Tableau comparatif du Bac)',
  },
];

export default function B1ReflexesConditionnelsCard() {
  const [selectedReflexe, setSelectedReflexe] = useState<ReflexeItem>(REFLEXES_MEDULLAIRES_REFLEXES[0]);

  return (
    <section className="rounded-3xl border border-emerald-900/10 shadow-sm overflow-hidden my-6 sm:my-8 w-full max-w-full bg-slate-950 text-slate-100">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 p-4 sm:p-6 lg:p-8 border-b border-emerald-500/20">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className="font-mono text-xs uppercase tracking-widest text-emerald-300 font-bold bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30">
            REF-B1.4 • Fiche Réflexes Bac S2
          </span>
          <span className="text-xs font-semibold text-emerald-200/80 bg-teal-950/60 px-2.5 py-0.5 rounded-full border border-teal-500/20">
            Programme Officiel SVT • Neurophysiologie
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
          Les 6 Réflexes Clés : Réflexes Médullaires &amp; Conditionnels Pavloviens
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
          Arc réflexe myotatique monosynaptique, innervation réciproque, expériences historiques de section des racines de Magendie, genèse des réflexes conditionnels et inhibition d’extinction étalonnés sur le barème officiel de l’Office du Baccalauréat sénégalais.
        </p>

        {/* Quick Tabs Grid - Grille ultra-responsive mobile-first */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-5">
          {REFLEXES_MEDULLAIRES_REFLEXES.map((r) => {
            const isCurrent = selectedReflexe.id === r.id;
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setSelectedReflexe(r)}
                className={`text-left p-2.5 sm:p-3 rounded-2xl transition-all border touch-manipulation min-h-[66px] flex flex-col justify-between ${
                  isCurrent
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-md shadow-emerald-950/60 ring-1 ring-emerald-400/50'
                    : 'bg-slate-900/85 hover:bg-slate-800 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full gap-1">
                  <span className={`text-[10px] font-mono font-black uppercase tracking-wider ${isCurrent ? 'text-emerald-100' : 'text-emerald-400'}`}>
                    Réf 0{r.id}
                  </span>
                  <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-bold uppercase tracking-tight shrink-0 ${
                    isCurrent ? 'bg-emerald-700/80 text-white' : 'bg-slate-800/90 text-slate-400'
                  }`}>
                    {r.shortTag}
                  </span>
                </div>
                <p className={`text-xs font-bold mt-1.5 leading-tight ${isCurrent ? 'text-white' : 'text-slate-200'}`}>
                  {r.shortTitle}
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
              Loi Biologique &amp; Mécanisme Physiologique
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

