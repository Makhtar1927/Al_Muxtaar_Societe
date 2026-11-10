'use client';

import React, { useState } from 'react';
import MathRenderer from '@/components/course/math-renderer';

interface ReflexeItem {
  id: number;
  badge: string;
  title: string;
  ruleTitle: string;
  ruleFormula: string;
  ruleExplanation: string;
  piegeTitle: string;
  piegeText: string;
  wolofInsight: string;
}

const SVT_B1_REFLEXES: ReflexeItem[] = [
  {
    id: 1,
    badge: 'Réflexe 1 • Anatomie Fondamentale',
    title: 'Inversion de la Substance Blanche / Substance Grise',
    ruleTitle: 'Moelle épinière = Grise au centre ; Cerveau = Grise en périphérie',
    ruleFormula: '\\text{Moelle : Grise (Centre en H) } + \\text{ Blanche (Périphérie)} \\iff \\text{Cerveau : Cortex Gris (Extérieur) } + \\text{ Blanc (Centre)}',
    ruleExplanation:
      'Dans la moelle épinière, la substance grise (corps cellulaires des neurones) est strictement centrale et prend la forme d’un papillon ou d’un H, entourée par la substance blanche (fibres myélinisées). Dans les hémisphères cérébraux, c’est exactement l’inverse : la substance grise forme le cortex superficiel à la périphérie.',
    piegeTitle: 'Le piège classique de l’inversion au Bac',
    piegeText:
      'Ne confondez jamais coupe de cerveau et coupe de moelle ! Au Bac, si le sujet montre une substance grise centrale en forme de papillon avec un canal au centre, il s’agit OBLIGATOIREMENT de la moelle épinière.',
    wolofInsight:
      'Cerveau bi mooy kourpéñ bu gris ci biti (cortex) ak wéer bu weex ci biir. Moelle épinière bi dafay inversé : papillon bu gris bi dafa nekk ci biir (corps cellulaires), wéex bi (axones myélinisés) wër ko ci biti !',
  },
  {
    id: 2,
    badge: 'Réflexe 2 • Repère Infaillible',
    title: 'Le Ganglion Spinal signe TOUJOURS la Racine Dorsale',
    ruleTitle: 'Ganglion spinal = Racine postérieure = Voie Sensitive (Afférente)',
    ruleFormula: '\\text{Ganglion Spinal} \\subset \\text{Racine Dorsale (Postérieure)} \\implies \\text{Neurone en T (Sensitif)}',
    ruleExplanation:
      'Sur n’importe quel schéma de coupe transversale de moelle épinière, le renflement ovoïde appelé « ganglion spinal » (ou ganglion rachidien) est porté EXCLUSIVEMENT par la racine dorsale. Il contient les corps cellulaires en T des neurones sensitifs (protoneurones). La racine ventrale n’a JAMAIS de ganglion.',
    piegeTitle: 'Confondre face dorsale et face ventrale',
    piegeText:
      'Pour orienter la coupe de moelle au Bac : cherchez d’abord le ganglion spinal. Le côté qui le porte est sans équivoque le côté DORSAL (postérieur). L’autre racine est ventrale.',
    wolofInsight:
      'Bula ñu joxé coupe moelle bi, bu sa bët daanoo ci « ganglion spinal », xamal ni mooy gànnaaw (racine dorsale / sensitive) ! Racine ventrale amul ganglion mukk, té mooy dem ci yaram bi (moteur).',
  },
  {
    id: 3,
    badge: 'Réflexe 3 • Cytoarchitectonie',
    title: 'Corne Ventrale (Motrice, Large) vs Corne Dorsale (Sensitive, Effilée)',
    ruleTitle: 'Cornes antérieures = Motoneurones multipolaires volumineux',
    ruleFormula: '\\text{Corne Ventrale (Antérieure)} : \\text{Large, arrondie} \\to \\text{Corps cellulaires motoneurones multipolaires}',
    ruleExplanation:
      'Les cornes antérieures (ventrales) de la substance grise sont courtes, larges et massives. Elles contiennent les gros corps cellulaires étoilés des motoneurones dont les axones quittent la moelle par la racine ventrale. Les cornes postérieures (dorsales) sont minces, longues et effilées, atteignant presque la surface dorsale.',
    piegeTitle: 'Inverser les cornes motrices et sensitives',
    piegeText:
      'Retenez : Corne antérieure = Action / Moteur (Antérieur = Avant = Action). Corne postérieure = Sensibilité / Perception.',
    wolofInsight:
      'Corne antérieure dafa yaatu té rëy ndax dafa bëré ay neurones yu mag yu am branches yu bare (motoneurones), corne postérieure dafa sew té fekk si ko racine dorsale bi ngir joxe xibaar.',
  },
  {
    id: 4,
    badge: 'Réflexe 4 • Protection du Névraxe',
    title: 'Les 3 Méninges dans l’ordre : D-A-P (Dehors vers Dedans)',
    ruleTitle: 'Dure-mère (externe) → Arachnoïde (médiane) → Pie-mère (interne)',
    ruleFormula: '\\text{Extérieur : Dure-mère (fibreuse)} \\to \\text{Arachnoïde (toile + LCR)} \\to \\text{Pie-mère (vasculaire adhérente)}',
    ruleExplanation:
      'Le névraxe est protégé par une triple enveloppe conjonctive. De la paroi osseuse vers le tissu nerveux : 1) La dure-mère (épaisse, fibreuse, résistante). 2) L’arachnoïde (feuillets conjonctifs en toile d’araignée délimitant l’espace sous-arachnoïdien où circule le liquide céphalo-rachidien LCR). 3) La pie-mère (fine, transparente, très vascularisée, intimement collée au tissu nerveux).',
    piegeTitle: 'Oublier le rôle et l’emplacement du LCR',
    piegeText:
      'Le liquide céphalo-rachidien ne se trouve pas entre l’os et la dure-mère, mais principalement dans l’espace sous-arachnoïdien (entre arachnoïde et pie-mère) et dans le canal de l’épendyme !',
    wolofInsight:
      'Méninges yi ñetti mbubb lañu yu sécurisé xel mi ak moelle bi : Dure-mère bi dëgër ci biti, Arachnoïde bi melni toyle d’araignée ci digg bi ak ndoxum LCR, ak Pie-mère bi lafal tissue bi ci biir !',
  },
  {
    id: 5,
    badge: 'Réflexe 5 • Physiologie Fonctionnelle',
    title: 'Le Nerf Rachidien est un Nerf MIXTE',
    ruleTitle: 'Réunion de la racine dorsale sensitive et ventrale motrice',
    ruleFormula: '\\text{Nerf Rachidien} = \\text{Racine Dorsale (Sensitive/Centripète)} + \\text{Racine Ventrale (Motrice/Centrifuge)}',
    ruleExplanation:
      'Chaque nerf rachidien (31 paires) naît de la fusion de deux racines issues de la moelle épinière. Parce qu’il contient à la fois des fibres sensitives (conduisant l’influx de la périphérie vers le centre : centripète) et des fibres motrices (du centre vers les muscles : centrifuge), on le qualifie de nerf mixte.',
    piegeTitle: 'Affirmer qu’une racine est un nerf mixte',
    piegeText:
      'Attention au piège de vocabulaire : une RACINE n’est jamais mixte ! La racine dorsale est purement sensitive, la racine ventrale est purement motrice. C’est uniquement le TRONC du nerf rachidien qui est mixte.',
    wolofInsight:
      'Nerf rachidien dafa melni autoroute à double sens : racine dorsale bi kesséy yeb xibaar yi ci SNC (centripète/sensitif), racine ventrale biy yobu ndigal yi ci yaram bi (centrifuge/moteur). Buñu booloo rek mu nek nerf mixte !',
  },
  {
    id: 6,
    badge: 'Réflexe 6 • Reconnaissance Morphologique',
    title: 'Orientation de la Coupe : Fissure Médiane Antérieure vs Sillon Postérieur',
    ruleTitle: 'La fente ventrale est toujours large et profonde',
    ruleFormula: '\\text{Face Ventrale : Fissure médiane antérieure (profonde et béante)} \\iff \\text{Face Dorsale : Sillon médian postérieur (étroit)}',
    ruleExplanation:
      'La moelle présente deux sillons médians longitudinaux : la fissure médiane antérieure (ou sillon ventral), qui est une véritable entaille large et profonde s’enfonçant jusqu’à la commissure blanche ; et le sillon médian postérieur (ou sillon dorsal), très étroit et superficiel, prolongé par un septum médian.',
    piegeTitle: 'Distinguer avant et arrière en l’absence de ganglion',
    piegeText:
      'Si le ganglion spinal n’apparaît pas sur une coupe, observez immédiatement le sillon : la fissure la plus béante et profonde marque TOUJOURS le côté antérieur (ventral) !',
    wolofInsight:
      'Ngir xam kanam ak gànnaaw su ganglion amul : fissure médiane antérieure bi dafa xóot té yaatu (fente ouverte), sillon postérieur bi dafa sew té tàpp !',
  },
];

export default function B1SystemeNerveuxReflexesCard() {
  const [selectedReflexe, setSelectedReflexe] = useState<number>(1);
  const current = SVT_B1_REFLEXES.find((r) => r.id === selectedReflexe) || SVT_B1_REFLEXES[0];

  return (
    <section className="bg-white rounded-3xl border border-emerald-900/10 shadow-sm overflow-hidden my-8">
      {/* En-tête officiel */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 p-6 text-white">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-mono font-bold">
              REF-B1
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider font-mono font-bold px-2.5 py-0.5 rounded bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                  SVT S2 • Organisation Cérébrospinale
                </span>
                <span className="text-xs text-emerald-200/70 font-medium">Référentiel MEN Sénégal</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
                Les 6 Réflexes Stratégiques du Système Nerveux Cérébrospinal
              </h2>
            </div>
          </div>
          <span className="text-xs bg-emerald-500/10 border border-emerald-400/20 text-emerald-200 px-3 py-1.5 rounded-xl font-bold">
            Baccalauréat Scientifique S2
          </span>
        </div>

        {/* Onglets des 6 réflexes */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-6">
          {SVT_B1_REFLEXES.map((r) => {
            const isActive = r.id === selectedReflexe;
            return (
              <button
                key={r.id}
                onClick={() => setSelectedReflexe(r.id)}
                className={`text-left p-3 rounded-2xl transition-all border ${
                  isActive
                    ? 'bg-emerald-500 text-white font-bold shadow-md border-emerald-400 ring-2 ring-emerald-300/40'
                    : 'bg-white/5 text-emerald-100 hover:bg-white/10 border-white/10'
                }`}
              >
                <div className="text-[10px] opacity-80 uppercase tracking-wider">RÉFLEXE {r.id}</div>
                <div className="text-xs font-bold truncate mt-0.5">{r.title.split(':')[0]}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenu du réflexe actif */}
      <div className="p-6 sm:p-8 space-y-6 bg-slate-50/50">
        <div>
          <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
            {current.badge}
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">
            {current.title}
          </h3>
          <p className="text-sm font-semibold text-emerald-800 mt-1">
            {current.ruleTitle}
          </p>
        </div>

        {/* Encadré Formule / Règle anatomique KaTeX */}
        <div className="bg-white rounded-2xl border border-emerald-200 p-5 shadow-sm">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block mb-2">
            Règle anatomique & Formule fonctionnelle :
          </span>
          <div className="text-sm sm:text-base text-slate-800 overflow-x-auto py-1">
            <MathRenderer content={`$$${current.ruleFormula}$$`} />
          </div>
          <p className="text-xs sm:text-sm text-slate-600 mt-3 leading-relaxed">
            {current.ruleExplanation}
          </p>
        </div>

        {/* Deux colonnes : Piège Bac & Xam-xam ci Wolof */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Piège Bac */}
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase font-mono">
              <span className="px-2 py-0.5 rounded bg-rose-200 text-rose-800 font-black">
                PIÈGE BAC
              </span>
              <span>{current.piegeTitle}</span>
            </div>
            <p className="text-xs sm:text-sm text-rose-900/80 mt-2.5 leading-relaxed">
              {current.piegeText}
            </p>
          </div>

          {/* Xam-xam ci Wolof */}
          <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase font-mono">
              <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-900 font-black">
                WOLOF
              </span>
              <span>Xam-xam ci Wolof • Décodage Pédagogique</span>
            </div>
            <p className="text-xs sm:text-sm text-amber-950 font-medium italic mt-2.5 leading-relaxed">
              « {current.wolofInsight} »
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

