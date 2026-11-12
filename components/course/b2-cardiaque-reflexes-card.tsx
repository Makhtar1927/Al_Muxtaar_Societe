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
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 sm:p-5">
          <p className="text-xs font-black text-rose-700 uppercase tracking-wider mb-1.5">LOI BIOLOGIQUE BAC S2</p>
          <p className="text-sm text-slate-800 leading-relaxed font-medium">
            Le cœur possède un <span className="text-rose-700 font-bold">automatisme intrinsèque</span> : il se
            contracte spontanément et rythmiquement grâce à son tissu nodal spécialisé,
            indépendamment de toute commande nerveuse du système nerveux central.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
            CHRONOLOGIE DE PROPAGATION DU POTENTIEL D&apos;ACTION CARDIAQUE
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {[
              {
                n: '① Nœud sinusal (Keith & Flack)',
                d: 'Pace-maker naturel dans l’oreillette droite. Fréquence : 70-80 batt/min. Impose son rythme à tout le cœur.',
                badge: '75 bpm',
                badgeBg: 'bg-rose-100 text-rose-800 border-rose-300',
              },
              {
                n: '② Nœud auriculo-ventriculaire (Aschoff-Tawara)',
                d: 'Dans le septum interauriculaire. Filtre et ralentit le signal de 0,1 s (permet la vidange des oreillettes).',
                badge: 'Délai 0,1s',
                badgeBg: 'bg-amber-100 text-amber-800 border-amber-300',
              },
              {
                n: '③ Faisceau de His',
                d: 'Traverse le septum interventriculaire et se sépare en branches droite et gauche.',
                badge: 'Septum',
                badgeBg: 'bg-sky-100 text-sky-800 border-sky-300',
              },
              {
                n: '④ Fibres de Purkinje',
                d: 'Réseau sous-endocardique très rapide (2 à 4 m/s). Contraction synchrone des ventricules de l’apex vers la base.',
                badge: 'Vitesse max',
                badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
              },
            ].map((step) => (
              <div key={step.n} className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <p className="text-xs font-bold text-slate-900">{step.n}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${step.badgeBg}`}>
                      {step.badge}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 text-center">
            GRADIENT D&apos;AUTOMATISME DÉCROISSANT (HIÉRARCHIE NODALE)
          </p>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="bg-white border border-rose-200 rounded-xl p-2.5 shadow-sm">
              <p className="text-base font-black text-rose-600">70-80</p>
              <p className="text-[11px] font-bold text-slate-800">Nœud Sinusal</p>
              <p className="text-[10px] text-slate-500">Pace-maker maître</p>
            </div>
            <div className="bg-white border border-amber-200 rounded-xl p-2.5 shadow-sm">
              <p className="text-base font-black text-amber-600">40-50</p>
              <p className="text-[11px] font-bold text-slate-800">Nœud AV</p>
              <p className="text-[10px] text-slate-500">Relais secondaire</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-2.5 shadow-sm">
              <p className="text-base font-black text-slate-700">20-35</p>
              <p className="text-[11px] font-bold text-slate-800">Purkinje / His</p>
              <p className="text-[10px] text-slate-500">Rythme idioventriculaire</p>
            </div>
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
        <div className="bg-pink-50 border border-pink-200 rounded-2xl p-4 sm:p-5">
          <p className="text-xs font-black text-pink-700 uppercase tracking-wider mb-1.5">DÉFINITION & DURÉE</p>
          <p className="text-sm text-slate-800 leading-relaxed font-medium">
            La <span className="text-pink-700 font-bold">révolution cardiaque</span> est la séquence complète des
            événements mécaniques et hémodynamiques au cours d&apos;un battement. À 75 bpm,
            elle dure exactement <span className="text-slate-900 font-bold">0,8 seconde</span> et se décompose en 3 phases indissociables.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
            LES 3 PHASES DU CYCLE CARDIAQUE (TOTAL = 0,8 s)
          </p>
          <div className="space-y-2.5">
            {[
              {
                phase: '① Systole auriculaire (0,10 s)',
                detail: 'Contraction des oreillettes → éjection du sang résiduel (20%) vers les ventricules. Valves auriculo-ventriculaires ouvertes.',
                valves: 'Valves AV ouvertes | Sigmoïdes fermées',
                c: 'border-l-4 border-l-pink-500 bg-pink-50/40 border-pink-200',
              },
              {
                phase: '② Systole ventriculaire (0,30 s)',
                detail: 'Phase isovolumétrique puis éjection dans l’aorte et l’artère pulmonaire. Fermeture brutale des valves AV = 1er Bruit B1 ("TOUM").',
                valves: 'Bruit B1 | Sigmoïdes ouvertes en éjection',
                c: 'border-l-4 border-l-rose-600 bg-rose-50/40 border-rose-200',
              },
              {
                phase: '③ Diastole générale (0,40 s)',
                detail: 'Relâchement général du myocarde. Fermeture des valvules sigmoïdes = 2ème Bruit B2 ("TA"). Remplissage passif des cavités (80%).',
                valves: 'Bruit B2 | Phase de repos et remplissage',
                c: 'border-l-4 border-l-emerald-600 bg-emerald-50/40 border-emerald-200',
              },
            ].map((p) => (
              <div key={p.phase} className={`rounded-xl p-3.5 border ${p.c}`}>
                <div className="flex flex-wrap items-center justify-between gap-1 mb-1">
                  <p className="text-xs font-bold text-slate-900">{p.phase}</p>
                  <span className="text-[10px] font-semibold text-slate-600 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {p.valves}
                  </span>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">{p.detail}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            VOLUME D&apos;ÉJECTION SYSTOLIQUE (VES)
          </p>
          <div className="bg-white border border-slate-200 rounded-xl p-3 inline-block shadow-sm">
            <MathRenderer content="$$VES = VTD - VTS \approx 120\text{ mL} - 50\text{ mL} = 70\text{ mL}$$" />
          </div>
          <p className="text-xs text-slate-500 mt-2">
            VTD = volume télédiastolique (fin de remplissage) • VTS = volume télésystolique (résidu post-éjection)
          </p>
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
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5">
          <p className="text-xs font-black text-emerald-800 uppercase tracking-wider mb-1.5">DÉFINITION ÉLECTROPHYSIOLOGIQUE</p>
          <p className="text-sm text-slate-800 leading-relaxed font-medium">
            L&apos;<span className="text-emerald-800 font-bold">ECG</span> est l&apos;enregistrement graphique des courants électriques
            extracellulaires engendrés par l&apos;activation et la repolarisation successives des différentes parties du cœur.
          </p>
        </div>

        <div>
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
            LES ONDES CLÉS DE L&apos;ÉLECTROCARDIOGRAMME NORMAL
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {[
              {
                onde: 'Onde P',
                role: 'Dépolarisation des OREILLETTES (générée par le nœud sinusal)',
                duree: '0,08 - 0,10 s',
                box: 'bg-emerald-50 border-emerald-200 text-emerald-900',
              },
              {
                onde: 'Complexe QRS',
                role: 'Dépolarisation des VENTRICULES (faisceau de His & Purkinje)',
                duree: '0,06 - 0,10 s',
                box: 'bg-rose-50 border-rose-200 text-rose-900',
              },
              {
                onde: 'Onde T',
                role: 'Repolarisation des VENTRICULES (fin de systole mécanique)',
                duree: '0,16 - 0,25 s',
                box: 'bg-amber-50 border-amber-200 text-amber-900',
              },
            ].map((o) => (
              <div key={o.onde} className={`rounded-xl p-3.5 border ${o.box}`}>
                <div className="flex justify-between items-center mb-1.5">
                  <span className="text-sm font-black">{o.onde}</span>
                  <span className="text-[10px] bg-white font-bold px-2 py-0.5 rounded border border-slate-200">
                    {o.duree}
                  </span>
                </div>
                <p className="text-xs leading-relaxed text-slate-700">{o.role}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            CALCUL DE LA FRÉQUENCE CARDIAQUE DEPUIS L&apos;INTERVALLE R-R
          </p>
          <div className="bg-white border border-slate-200 rounded-xl p-3 inline-block shadow-sm">
            <MathRenderer content="$$FC = \frac{60}{\text{Intervalle } R-R \text{ (en secondes)}} \quad (\text{battements/min})$$" />
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Sur papier millimétré à vitesse 25 mm/s : chaque petit carré (1 mm) = 0,04 s • 1 grand carré (5 mm) = 0,20 s.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'stannius',
    code: 'RÉF 04',
    shortTag: 'Stannius',
    shortTitle: 'Expériences de Stannius',
    fullTitle: 'Ligatures de Stannius : Preuve de la Hiérarchie Nodale',
    domain: 'Expérimental',
    color: 'violet',
    bacPoints: '3 pts',
    content: (
      <div className="space-y-4">
        <div className="bg-violet-50 border border-violet-200 rounded-2xl p-4 sm:p-5">
          <p className="text-xs font-black text-violet-800 uppercase tracking-wider mb-1.5">PROTOCOLE EXPÉRIMENTAL HISTORIQUE</p>
          <p className="text-sm text-slate-800 leading-relaxed font-medium">
            Sur le cœur isolé de grenouille perfusé au liquide de Ringer, Hermann Stannius a posé
            des ligatures pour isoler les territoires anatomiques et mettre en évidence les centres automatiques.
          </p>
        </div>

        <div className="space-y-2.5">
          {[
            {
              titre: '1ère Ligature (Sillon Sinuso-Auriculaire)',
              res: 'Le sinus veineux bat à son rythme rapide (60 bpm). Les oreillettes et le ventricule s’arrêtent temporairement puis reprennent un rythme ralenti (30-40 bpm).',
              concl: 'Le sinus veineux est le centre automatique maître (rythme le plus élevé). Le nœud AV est un centre secondaire subordonné.',
              c: 'border-l-4 border-l-violet-600 bg-violet-50/40 border-violet-200',
            },
            {
              titre: '2ème Ligature (Sillon Auriculo-Ventriculaire)',
              res: 'Les oreillettes continuent à 30-40 bpm. Le ventricule s’arrête longtemps puis bat à fréquence très lente (15-20 bpm).',
              concl: 'Le ventricule renferme un centre automatique idioventriculaire résiduel (réseau de Purkinje). Gradient d’automatisme décroissant.',
              c: 'border-l-4 border-l-indigo-600 bg-indigo-50/40 border-indigo-200',
            },
            {
              titre: '3ème Ligature (Pointe / Apex du Ventricule)',
              res: 'La base du ventricule continue de battre. La pointe isolée reste définitivement immobile, mais réagit si on la stimule.',
              concl: 'La pointe du cœur ne possède aucun tissu nodal. Elle est excitable et contractile mais NON automatique.',
              c: 'border-l-4 border-l-slate-600 bg-slate-100 border-slate-300',
            },
          ].map((l, i) => (
            <div key={i} className={`rounded-xl p-3.5 border ${l.c}`}>
              <p className="text-xs font-black text-slate-900 mb-1">{l.titre}</p>
              <p className="text-xs text-slate-700 mb-1.5 leading-relaxed">
                <span className="font-bold text-slate-900">Observation :</span> {l.res}
              </p>
              <p className="text-xs font-semibold text-violet-900 bg-white p-2 rounded-lg border border-violet-100">
                → Déduction Bac S2 : {l.concl}
              </p>
            </div>
          ))}
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
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 sm:p-5 text-center">
          <p className="text-xs font-black text-sky-800 uppercase tracking-wider mb-2">FORMULE FONDAMENTALE DU DÉBIT CARDIAQUE</p>
          <div className="bg-white border border-sky-200 rounded-xl p-3.5 inline-block shadow-sm">
            <MathRenderer content="$$DC = FC \times VES \quad (\text{en Litres/minute})$$" />
          </div>
          <p className="text-xs text-slate-600 mt-2 font-medium">
            FC = Fréquence Cardiaque (batt/min) • VES = Volume d&apos;Éjection Systolique (L/battement)
          </p>
        </div>

        <div>
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5">
            VALEURS PHYSIOLOGIQUES DE RÉFÉRENCE AU REPOS VS À L&apos;EFFORT
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { label: 'FC repos', val: '70-75 bpm', c: 'text-slate-900 bg-slate-50 border-slate-200' },
              { label: 'VES repos', val: '70 mL', c: 'text-slate-900 bg-slate-50 border-slate-200' },
              { label: 'DC repos', val: '≈ 5,0 L/min', c: 'text-emerald-700 bg-emerald-50 border-emerald-200 font-black' },
              { label: 'DC effort max', val: '20-25 L/min', c: 'text-rose-700 bg-rose-50 border-rose-200 font-black' },
            ].map((v) => (
              <div key={v.label} className={`border rounded-xl p-3 text-center ${v.c}`}>
                <p className="text-sm font-black">{v.val}</p>
                <p className="text-[11px] text-slate-500 font-medium">{v.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-center">
          <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
            RELATION AVEC LA PRESSION ARTÉRIELLE (PA)
          </p>
          <div className="bg-white border border-slate-200 rounded-xl p-3 inline-block shadow-sm">
            <MathRenderer content="$$PA = DC \times RPT = (FC \times VES) \times RPT$$" />
          </div>
          <p className="text-xs text-slate-500 mt-2">
            RPT = Résistances Périphériques Totales (tonus vasculaire des artérioles)
          </p>
        </div>
      </div>
    ),
  },
  {
    id: 'tetanos-cardiaque',
    code: 'RÉF 06',
    shortTag: 'Réfractaire',
    shortTitle: 'Période Réfractaire',
    fullTitle: 'Inexcitabilité Cardiaque : Loi de Marey & Intétanisation',
    domain: 'Propriétés du Myocarde',
    color: 'orange',
    bacPoints: '2 pts',
    content: (
      <div className="space-y-4">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5">
          <p className="text-xs font-black text-amber-800 uppercase tracking-wider mb-1.5">LOI DE MAREY & PÉRIODE RÉFRACTAIRE ABSOLUE</p>
          <p className="text-sm text-slate-800 leading-relaxed font-medium">
            Pendant toute la durée de la systole ventriculaire (environ 0,30 s), le muscle cardiaque est{' '}
            <span className="text-amber-800 font-bold">totalement inexcitable</span>.
            Aucun stimulus, quelle que soit son intensité, ne peut déclencher une deuxième contraction.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
            <p className="text-xs font-bold text-slate-900 mb-1">Période Réfractaire Absolue (PRA)</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Couvre la systole. Assure l&apos;impossibilité de sommation temporelle. Le cœur ne peut jamais être tétanisé.
            </p>
            <span className="inline-block mt-2 text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded border border-amber-300">
              Durée ≈ 0,30 s
            </span>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
            <p className="text-xs font-bold text-slate-900 mb-1">Période Réfractaire Relative (PRR)</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Pendant la diastole. Une excitation supraliminaire déclenche une <span className="font-bold text-slate-900">extrasystole</span> suivie
              obligatoirement d&apos;un <span className="font-bold text-slate-900">repos compensateur</span>.
            </p>
            <span className="inline-block mt-2 text-[10px] font-bold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-300">
              Durant la diastole
            </span>
          </div>
        </div>

        <div className="bg-emerald-50/70 border border-emerald-200 rounded-xl p-4">
          <p className="text-xs font-black text-emerald-800 uppercase tracking-wider mb-1">
            CONSÉQUENCE PHYSIOLOGIQUE MAJEURE POUR LE BACCALAURÉAT
          </p>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            Le cœur est <span className="font-bold text-slate-900">infatigable et intétanisable</span>.
            La longue période réfractaire absolue garantit un relâchement obligatoire entre chaque battement,
            rendant possible le remplissage ventriculaire. Si le cœur pouvait se tétaniser comme un biceps,
            la circulation s&apos;arrêterait immédiatement, entraînant la mort instantanée de l&apos;organisme.
          </p>
        </div>
      </div>
    ),
  },
];

export default function B2CardiaqueReflexesCard() {
  const [activeId, setActiveId] = useState<string>('tissu-nodal');

  const active = CARDIAC_FICHES.find((f) => f.id === activeId) ?? CARDIAC_FICHES[0];

  return (
    <section className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-sm space-y-6">
      {/* Header */}
      <div className="border-b border-slate-100 pb-5">
        <div className="flex flex-wrap items-center gap-2 mb-2.5">
          <span className="text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200 px-3 py-1 rounded-full uppercase tracking-wider">
            Programme Officiel SVT S2
          </span>
          <span className="text-[11px] font-bold bg-pink-50 text-pink-700 border border-pink-200 px-3 py-1 rounded-full">
            Physiologie Cardiovasculaire • B2.1
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mb-2">
          Les 6 Références Clés : <span className="text-rose-600">Activité & Automatisme Cardiaque</span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
          Tissu nodal, révolution cardiaque (0,8 s), analyse d&apos;ECG, expériences de Stannius,
          débit cardiaque et loi de Marey — les fiches réflexes étalonnées sur le barème officiel du Baccalauréat sénégalais.
        </p>
      </div>

      {/* Grid des fiches (Sélecteur 2x3) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
        {CARDIAC_FICHES.map((fiche) => {
          const isActive = fiche.id === activeId;
          return (
            <button
              key={fiche.id}
              onClick={() => setActiveId(fiche.id)}
              className={`text-left p-3.5 rounded-2xl border transition-all duration-200 ${
                isActive
                  ? 'border-rose-500 bg-rose-50/70 shadow-sm ring-2 ring-rose-500/20'
                  : 'border-slate-200 bg-slate-50/70 text-slate-700 hover:bg-slate-100 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1 gap-1">
                <span className={`text-[10px] font-black tracking-wider ${isActive ? 'text-rose-700' : 'text-slate-500'}`}>
                  {fiche.code}
                </span>
                <span className="text-[9px] font-semibold text-slate-400 truncate max-w-[70px] sm:max-w-none">
                  {fiche.shortTag}
                </span>
              </div>
              <p className={`text-xs font-bold leading-snug line-clamp-2 ${isActive ? 'text-rose-950 font-black' : 'text-slate-800'}`}>
                {fiche.shortTitle}
              </p>
            </button>
          );
        })}
      </div>

      {/* Fiche détaillée */}
      <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
        {/* Fiche Header */}
        <div className="bg-gradient-to-r from-rose-50 via-pink-50 to-rose-50 border-b border-rose-100 px-5 py-4">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-black text-rose-700 uppercase tracking-widest">{active.code}</span>
                <span className="text-[10px] font-bold text-slate-600 bg-white/80 px-2 py-0.5 rounded border border-rose-200/60">
                  {active.domain}
                </span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">{active.fullTitle}</h3>
            </div>
            <div className="text-right flex-shrink-0">
              <span className="text-xs font-bold bg-white text-rose-700 border border-rose-200 px-3 py-1 rounded-full shadow-sm">
                Pondération Bac : {active.bacPoints}
              </span>
            </div>
          </div>
        </div>

        {/* Fiche Content */}
        <div className="p-5 sm:p-6 bg-white">
          {active.content}
        </div>
      </div>

      {/* Bilan KaTeX Footer */}
      <div className="bg-gradient-to-r from-rose-50 via-pink-50 to-rose-50 border border-rose-200 rounded-2xl p-5 text-center">
        <p className="text-xs font-black text-rose-800 uppercase tracking-widest mb-2.5">
          FORMULE MAÎTRESSE OFFICIELLE DU BACCALAURÉAT S2
        </p>
        <div className="bg-white border border-rose-200 rounded-xl p-3.5 inline-block shadow-sm">
          <MathRenderer
            content="$$PA = DC \times RPT \qquad DC = FC \times VES \qquad \Delta PA \xrightarrow{\text{Boucle réflexe}} \text{Barorécepteurs} \to \text{Centre bulbaire}$$"
          />
        </div>
        <p className="text-xs text-slate-600 font-medium mt-2.5">
          PA = Pression Artérielle • DC = Débit Cardiaque • RPT = Résistances Périphériques Totales • FC = Fréquence • VES = Volume d&apos;Éjection
        </p>
      </div>
    </section>
  );
}
