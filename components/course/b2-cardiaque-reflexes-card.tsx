'use client';

import { useState } from 'react';
import MathRenderer from '@/components/course/math-renderer';

interface CardiacFiche {
  id: string;
  code: string;
  shortTag: string;
  shortTitle: string;
  fullTitle: string;
  domain: string;
  color: string;
  bacPoints: string;
  content: React.ReactNode;
}

const CARDIAC_FICHES: CardiacFiche[] = [
  {
    id: 'tissu-nodal',
    code: 'RÉF 01',
    shortTag: 'Automatisme',
    shortTitle: 'Tissu Nodal & Automatisme',
    fullTitle: 'Le Tissu Nodal : Origine de l\'Automatisme Cardiaque',
    domain: 'Électrophysiologie',
    color: 'rose',
    bacPoints: '3 pts',
    content: (
      <div className="space-y-4">
        <div className="bg-rose-900/30 border border-rose-500/40 rounded-xl p-4">
          <p className="text-xs font-bold text-rose-300 uppercase tracking-wide mb-2">LOI BIOLOGIQUE</p>
          <p className="text-sm text-slate-200 leading-relaxed">
            Le cœur possède un <span className="text-rose-300 font-semibold">automatisme intrinsèque</span> : il se
            contracte spontanément grâce au tissu nodal, indépendamment de toute commande nerveuse.
          </p>
        </div>
        <div>
          <p className="text-xs font-bold text-rose-400 uppercase tracking-wide mb-3">VOIES DE CONDUCTION</p>
          <div className="space-y-2">
            {[
              { n: '① Nœud sinusal (Keith-Flack)', d: 'Pace-maker principal — oreillette droite — 60-80 batt/min — génère le PA initial', c: 'bg-rose-500' },
              { n: '② Nœud auriculo-ventriculaire (Aschoff-Tawara)', d: 'Filtre le signal — délai 0,1 s — seule voie A→V — oreillette/ventricule', c: 'bg-orange-500' },
              { n: '③ Faisceau de His', d: 'Traverse le septum — se divise en branches droite/gauche', c: 'bg-amber-500' },
              { n: '④ Fibres de Purkinje', d: 'Se ramifient dans les ventricules — contraction synchrone et rapide', c: 'bg-yellow-500' },
            ].map((step) => (
              <div key={step.n} className="flex gap-3 items-start">
                <span className={`flex-shrink-0 w-2 h-2 rounded-full mt-1.5 ${step.c}`}></span>
                <div>
                  <p className="text-xs font-bold text-slate-200">{step.n}</p>
                  <p className="text-xs text-slate-400">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-slate-800/60 rounded-xl p-3">
          <p className="text-xs font-bold text-rose-300 mb-1">Fréquences intrinsèques</p>
          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-slate-900/60 rounded-lg p-2"><p className="font-bold text-rose-400">60-80</p><p className="text-slate-400">Nœud sinusal</p></div>
            <div className="bg-slate-900/60 rounded-lg p-2"><p className="font-bold text-orange-400">40-60</p><p className="text-slate-400">Nœud AV</p></div>
            <div className="bg-slate-900/60 rounded-lg p-2"><p className="font-bold text-amber-400">20-40</p><p className="text-slate-400">Purkinje</p></div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'revolution-cardiaque',
    code: 'RÉF 02',
    shortTag: 'Révolution',
    shortTitle: 'Révolution Cardiaque',
    fullTitle: 'La Révolution Cardiaque : Systole & Diastole',
    domain: 'Mécanique Cardiaque',
    color: 'pink',
    bacPoints: '2 pts',
    content: (
      <div className="space-y-4">
        <div className="bg-pink-900/30 border border-pink-500/40 rounded-xl p-4">
          <p className="text-xs font-bold text-pink-300 uppercase tracking-wide mb-2">DÉFINITION BAC</p>
          <p className="text-sm text-slate-200 leading-relaxed">
            La <span className="text-pink-300 font-semibold">révolution cardiaque</span> est l&apos;ensemble des événements
            mécaniques et électriques d&apos;un cycle cardiaque complet (≈ 0,8 s à 75 bpm).
          </p>
        </div>
        <div>
          <p className="text-xs font-bold text-pink-400 uppercase tracking-wide mb-3">LES 3 PHASES (0,8 s)</p>
          <div className="space-y-2">
            {[
              { phase: '① Systole auriculaire (0,1 s)', detail: 'Contraction des oreillettes → sang vers ventricules (valves AV ouvertes)', bar: 'w-1/4', c: 'bg-pink-500' },
              { phase: '② Systole ventriculaire (0,3 s)', detail: 'Contraction ventricules → éjection dans aorte/artère pulmonaire (valvules sigmoïdes ouvertes)', bar: 'w-2/4', c: 'bg-rose-500' },
              { phase: '③ Diastole générale (0,4 s)', detail: 'Relâchement cœur entier → remplissage passif → phase la plus longue', bar: 'w-3/4', c: 'bg-slate-500' },
            ].map((p) => (
              <div key={p.phase} className="bg-slate-800/60 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`flex-shrink-0 w-2 h-2 rounded-full ${p.c}`}></span>
                  <p className="text-xs font-bold text-slate-200">{p.phase}</p>
                </div>
                <p className="text-xs text-slate-400 pl-4">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-slate-800/60 rounded-xl p-3 text-center">
          <p className="text-xs text-slate-400 mb-1">Volume Systolique (VS)</p>
          <MathRenderer content="$$VS = VTD - VTS \approx 70 \text{ mL}$$" />
          <p className="text-xs text-slate-400 mt-1">VTD = volume télédiastolique ; VTS = volume télésystolique</p>
        </div>
      </div>
    ),
  },
  {
    id: 'ecg',
    code: 'RÉF 03',
    shortTag: 'ECG',
    shortTitle: 'ECG & Lecture',
    fullTitle: 'Électrocardiogramme (ECG) : Lecture et Interprétation',
    domain: 'Électrocardiographie',
    color: 'emerald',
    bacPoints: '4 pts',
    content: (
      <div className="space-y-4">
        <div className="bg-emerald-900/30 border border-emerald-500/40 rounded-xl p-4">
          <p className="text-xs font-bold text-emerald-300 uppercase tracking-wide mb-2">DÉFINITION</p>
          <p className="text-sm text-slate-200 leading-relaxed">
            L&apos;<span className="text-emerald-300 font-semibold">ECG</span> enregistre l&apos;activité électrique du cœur.
            Chaque onde correspond à la dépolarisation ou repolarisation d&apos;une chambre cardiaque.
          </p>
        </div>
        <div>
          <p className="text-xs font-bold text-emerald-400 uppercase tracking-wide mb-3">LES 3 ONDES CLÉS</p>
          <div className="space-y-2">
            {[
              { onde: 'Onde P', role: 'Dépolarisation des OREILLETTES (nœud sinusal → nœud AV)', duree: '< 0,12 s', c: 'text-emerald-400 bg-emerald-900/40' },
              { onde: 'Complexe QRS', role: 'Dépolarisation des VENTRICULES (faisceau His + Purkinje)', duree: '< 0,10 s', c: 'text-rose-400 bg-rose-900/40' },
              { onde: 'Onde T', role: 'Repolarisation des VENTRICULES (retour au repos)', duree: '0,15-0,25 s', c: 'text-amber-400 bg-amber-900/40' },
            ].map((o) => (
              <div key={o.onde} className={`rounded-lg p-3 ${o.c.split(' ')[1]}`}>
                <div className="flex justify-between items-center mb-1">
                  <p className={`text-xs font-bold ${o.c.split(' ')[0]}`}>{o.onde}</p>
                  <span className={`text-[10px] ${o.c.split(' ')[0]} bg-slate-900/40 px-2 py-0.5 rounded`}>{o.duree}</span>
                </div>
                <p className="text-xs text-slate-300">{o.role}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-slate-800/60 rounded-xl p-3">
          <p className="text-xs font-bold text-emerald-300 mb-2">Calcul FC à partir de l&apos;ECG</p>
          <MathRenderer content="$$FC = \frac{60}{R-R \text{ (s)}} \quad \text{bpm}$$" />
          <p className="text-xs text-slate-400 mt-1 text-center">Intervalle R-R = espace entre deux complexes QRS</p>
        </div>
      </div>
    ),
  },
  {
    id: 'stannius',
    code: 'RÉF 04',
    shortTag: 'Stannius',
    shortTitle: 'Expériences de Stannius',
    fullTitle: 'Ligatures de Stannius : Preuve de l\'Automatisme',
    domain: 'Expérimental',
    color: 'violet',
    bacPoints: '3 pts',
    content: (
      <div className="space-y-4">
        <div className="bg-violet-900/30 border border-violet-500/40 rounded-xl p-4">
          <p className="text-xs font-bold text-violet-300 uppercase tracking-wide mb-2">PRINCIPE EXPÉRIMENTAL</p>
          <p className="text-sm text-slate-200 leading-relaxed">
            Stannius a réalisé des ligatures sur cœur de grenouille pour localiser
            les <span className="text-violet-300 font-semibold">centres automatiques</span> et prouver leur hiérarchie.
          </p>
        </div>
        <div>
          <p className="text-xs font-bold text-violet-400 uppercase tracking-wide mb-3">LES 3 LIGATURES</p>
          <div className="space-y-2">
            {[
              { l: '1ère ligature (sinus→oreillette)', r: 'Arrêt des oreillettes et ventricules → puis reprise lente (automatisme AV à 40-60/min)', imp: 'Sinus = pace-maker dominant' },
              { l: '2ème ligature (oreillette→ventricule)', r: 'Ventricule s\'arrête → puis reprise très lente (Purkinje à 20-40/min)', imp: 'Hiérarchie : sinus > AV > Purkinje' },
              { l: '3ème ligature (apex)', r: 'L\'apex est isolé et reste immobile', imp: 'Pas d\'automatisme propre à l\'apex' },
            ].map((lg, i) => (
              <div key={i} className="bg-slate-800/60 rounded-lg p-3">
                <p className="text-xs font-bold text-violet-300 mb-1">{lg.l}</p>
                <p className="text-xs text-slate-300 mb-1">Résultat : {lg.r}</p>
                <p className="text-xs text-violet-400 italic">→ {lg.imp}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-violet-900/20 border border-violet-500/30 rounded-xl p-3 text-center">
          <p className="text-xs font-bold text-violet-300">CONCLUSION BAC</p>
          <p className="text-xs text-slate-300 mt-1">Le cœur possède plusieurs foyers automatiques organisés hiérarchiquement.
          Le nœud sinusal (pace-maker principal) impose son rythme aux autres.</p>
        </div>
      </div>
    ),
  },
  {
    id: 'debit-cardiaque',
    code: 'RÉF 05',
    shortTag: 'Débit',
    shortTitle: 'Débit Cardiaque',
    fullTitle: 'Débit Cardiaque (DC) : Formule et Facteurs',
    domain: 'Hémodynamique',
    color: 'cyan',
    bacPoints: '2 pts',
    content: (
      <div className="space-y-4">
        <div className="bg-cyan-900/30 border border-cyan-500/40 rounded-xl p-4">
          <p className="text-xs font-bold text-cyan-300 uppercase tracking-wide mb-2">FORMULE FONDAMENTALE</p>
          <MathRenderer content="$$DC = FC \times VS \quad \text{(L/min)}$$" />
          <p className="text-xs text-slate-400 text-center mt-1">FC = fréquence cardiaque (bpm) | VS = volume systolique (mL)</p>
        </div>
        <div>
          <p className="text-xs font-bold text-cyan-400 uppercase tracking-wide mb-3">VALEURS DE RÉFÉRENCE</p>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'FC repos', val: '70 bpm', c: 'text-cyan-400' },
              { label: 'VS repos', val: '70 mL', c: 'text-cyan-400' },
              { label: 'DC repos', val: '≈ 5 L/min', c: 'text-emerald-400' },
              { label: 'DC effort max', val: '20-25 L/min', c: 'text-rose-400' },
            ].map((v) => (
              <div key={v.label} className="bg-slate-800/60 rounded-lg p-3 text-center">
                <p className={`text-sm font-bold ${v.c}`}>{v.val}</p>
                <p className="text-xs text-slate-400">{v.label}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-slate-800/60 rounded-xl p-3">
          <p className="text-xs font-bold text-cyan-300 mb-2">Lien avec la Pression Artérielle</p>
          <MathRenderer content="$$PA = DC \times RPT$$" />
          <p className="text-xs text-slate-400 text-center mt-1">RPT = résistances périphériques totales</p>
        </div>
      </div>
    ),
  },
  {
    id: 'tetanos-cardiaque',
    code: 'RÉF 06',
    shortTag: 'Réfractaire',
    shortTitle: 'Période Réfractaire',
    fullTitle: 'Inexcitabilité Cardiaque : Loi du Tout ou Rien & Réfractaire',
    domain: 'Propriétés du Myocarde',
    color: 'orange',
    bacPoints: '2 pts',
    content: (
      <div className="space-y-4">
        <div className="bg-orange-900/30 border border-orange-500/40 rounded-xl p-4">
          <p className="text-xs font-bold text-orange-300 uppercase tracking-wide mb-2">LOI DU TOUT OU RIEN</p>
          <p className="text-sm text-slate-200 leading-relaxed">
            Le muscle cardiaque répond <span className="text-orange-300 font-semibold">maximalement ou pas du tout</span> à
            toute stimulation supraliminaire. Pas de réponse graduée (contrairement au muscle strié squelettique).
          </p>
        </div>
        <div>
          <p className="text-xs font-bold text-orange-400 uppercase tracking-wide mb-3">PÉRIODE RÉFRACTAIRE ABSOLUE</p>
          <div className="bg-slate-800/60 rounded-lg p-3">
            <p className="text-xs text-slate-300 leading-relaxed">
              Pendant la systole (contraction), le myocarde est <span className="text-orange-300 font-semibold">totalement inexcitable</span>.
              Aucune stimulation, même maximale, ne peut déclencher une 2ème contraction.
            </p>
            <div className="mt-2 p-2 bg-orange-900/20 rounded-lg text-center">
              <p className="text-xs font-bold text-orange-300">Durée ≈ 0,3 s (= durée systole ventriculaire)</p>
            </div>
          </div>
        </div>
        <div className="bg-orange-900/20 border border-orange-500/30 rounded-xl p-3">
          <p className="text-xs font-bold text-orange-300 mb-1">Conséquence physiologique majeure</p>
          <p className="text-xs text-slate-300">
            Le cœur ne peut PAS entrer en <span className="text-orange-400 font-semibold">tétanos</span> (contraction permanente).
            La période réfractaire garantit le relâchement et le remplissage ventriculaire entre chaque battement.
            C&apos;est une propriété de <span className="text-orange-400 font-semibold">protection vitale</span>.
          </p>
        </div>
      </div>
    ),
  },
];

const colorMap: Record<string, { border: string; bg: string; text: string; badge: string; badgeBg: string }> = {
  rose:    { border: 'border-rose-500/50',    bg: 'bg-rose-900/20',    text: 'text-rose-300',    badge: 'text-rose-700',    badgeBg: 'bg-rose-100' },
  pink:    { border: 'border-pink-500/50',    bg: 'bg-pink-900/20',    text: 'text-pink-300',    badge: 'text-pink-700',    badgeBg: 'bg-pink-100' },
  emerald: { border: 'border-emerald-500/50', bg: 'bg-emerald-900/20', text: 'text-emerald-300', badge: 'text-emerald-700', badgeBg: 'bg-emerald-100' },
  violet:  { border: 'border-violet-500/50',  bg: 'bg-violet-900/20',  text: 'text-violet-300',  badge: 'text-violet-700',  badgeBg: 'bg-violet-100' },
  cyan:    { border: 'border-cyan-500/50',     bg: 'bg-cyan-900/20',    text: 'text-cyan-300',    badge: 'text-cyan-700',    badgeBg: 'bg-cyan-100' },
  orange:  { border: 'border-orange-500/50',  bg: 'bg-orange-900/20',  text: 'text-orange-300',  badge: 'text-orange-700',  badgeBg: 'bg-orange-100' },
};

export default function B2CardiaqueReflexesCard() {
  const [activeId, setActiveId] = useState<string>('tissu-nodal');

  const active = CARDIAC_FICHES.find((f) => f.id === activeId) ?? CARDIAC_FICHES[0];
  const c = colorMap[active.color];

  return (
    <section className="bg-slate-950 min-h-screen py-8 px-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto mb-8">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 px-3 py-1 rounded-full uppercase tracking-wider">
            Programme Officiel SVT
          </span>
          <span className="text-xs font-bold bg-pink-500/20 text-pink-300 border border-pink-500/40 px-3 py-1 rounded-full">
            Physiologie Cardiovasculaire
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white leading-tight mb-3">
          Les 6 Références Clés :{' '}
          <span className="text-rose-400">Activité Cardiaque</span>
        </h1>
        <p className="text-sm text-slate-400 leading-relaxed max-w-2xl">
          Automatisme intrinsèque (tissu nodal), révolution cardiaque, ECG, ligatures de Stannius,
          débit cardiaque et inexcitabilité — maîtrisez les fondamentaux cardiovasculaires du Baccalauréat sénégalais.
        </p>
      </div>

      {/* Grid des fiches */}
      <div className="max-w-4xl mx-auto mb-6 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
        {CARDIAC_FICHES.map((fiche) => {
          const fc = colorMap[fiche.color];
          const isActive = fiche.id === activeId;
          return (
            <button
              key={fiche.id}
              onClick={() => setActiveId(fiche.id)}
              className={`text-left p-3 rounded-xl border transition-all duration-200 ${
                isActive
                  ? `${fc.border} ${fc.bg} ring-1 ${fc.border}`
                  : 'border-slate-700/50 bg-slate-900/40 hover:border-slate-600'
              }`}
            >
              <div className="flex items-center justify-between mb-1 gap-1">
                <span className={`text-[10px] font-bold ${isActive ? fc.text : 'text-slate-500'}`}>
                  {fiche.code}
                </span>
                <span className="text-[9px] text-slate-500 truncate max-w-[70px] sm:max-w-none">{fiche.shortTag}</span>
              </div>
              <p className={`text-xs font-semibold leading-snug line-clamp-2 ${isActive ? 'text-white' : 'text-slate-400'}`}>
                {fiche.shortTitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* Fiche détaillée */}
      <div className="max-w-4xl mx-auto">
        <div className={`rounded-2xl border ${c.border} bg-slate-900/60 overflow-hidden`}>
          {/* Fiche Header */}
          <div className={`${c.bg} border-b ${c.border} px-5 py-4`}>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-black ${c.text} uppercase tracking-widest`}>{active.code}</span>
                  <span className={`text-[10px] ${c.text} bg-slate-900/40 px-2 py-0.5 rounded`}>{active.domain}</span>
                </div>
                <h2 className="text-base sm:text-lg font-black text-white leading-tight">{active.fullTitle}</h2>
              </div>
              <div className="text-right flex-shrink-0">
                <span className={`text-xs font-bold ${c.badgeBg} ${c.badge} px-3 py-1 rounded-full`}>
                  Pondération Bac : {active.bacPoints}
                </span>
              </div>
            </div>
          </div>
          {/* Fiche Content */}
          <div className="px-5 py-5">
            {active.content}
          </div>
        </div>
      </div>

      {/* Bilan KaTeX */}
      <div className="max-w-4xl mx-auto mt-8">
        <div className="bg-gradient-to-r from-rose-900/30 to-pink-900/30 border border-rose-500/30 rounded-2xl p-5">
          <p className="text-xs font-black text-rose-300 uppercase tracking-widest mb-3">
            FORMULE MAÎTRESSE — BACCALAURÉAT
          </p>
          <MathRenderer
            content="$$PA = DC \times RPT \qquad DC = FC \times VS \qquad \Delta PA \to \text{Barorécepteurs} \to \text{Centre bulbaire}$$"
          />
          <p className="text-xs text-slate-400 text-center mt-2">
            PA = Pression Artérielle | DC = Débit Cardiaque | RPT = Résistances Périphériques Totales
          </p>
        </div>
      </div>
    </section>
  );
}

