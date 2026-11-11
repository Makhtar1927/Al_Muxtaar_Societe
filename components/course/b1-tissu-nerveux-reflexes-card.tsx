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

const TISSU_NERVEUX_REFLEXES: ReflexeItem[] = [
  {
    id: 1,
    badge: 'Réflexe 1 • Cytologie & Ultrastructure',
    category: 'Cytologie',
    title: 'Ultrastructure du Neurone & Corps de Nissl',
    ruleTitle: 'Le neurone est une cellule polarisée avec soma, dendrites et axone unique',
    ruleFormula: '\\text{Neurone} = \\text{Soma (Noyau + Corps de Nissl)} + \\text{Dendrites (Cellulipètes)} + \\text{Axone (Cellulifuge)}',
    ruleExplanation:
      'Le neurone multipolaire comprend un corps cellulaire (soma) avec noyau clair et amas d’ergastoplasme ribosomique (corps de Nissl assurant la synthèse protéique), des dendrites courtes et ramifiées conduisant l’influx de manière cellulipète vers le soma, et un axone unique émergeant du cône d’implantation pour conduire l’influx de manière cellulifuge vers les boutons synaptiques.',
    piegeTitle: 'Localiser des corps de Nissl dans l’axone ou le cône',
    piegeText:
      'Piège classique au Bac S2 : les corps de Nissl sont STRICTEMENT ABSENTS de l’axone et du cône d’implantation ! L’axone dépend entièrement du péricaryon pour son entretien (dégénérescence wallérienne en cas de coupure).',
    wolofInsight:
      'Neurone bi dafa am ñaari pôle : dendrites yi ñoo koy dugal xibaar (cellulipète), axone bi mooy yóbbu xibaar bi bitim réew (cellulifuge). Corps de Nissl yi ci xolou cell bi (soma) rekk lañu nekk, amuñu mukk ci biir axone bi !',
    pointsBac: '1,5 à 2 pts (Cytologie)',
  },
  {
    id: 2,
    badge: 'Réflexe 2 • Biophysique Membranaire',
    category: 'Biophysique',
    title: 'Origine Ionique du Potentiel de Repos (PR = -70 mV)',
    ruleTitle: 'Diffusion passive de K+ par les canaux de fuite & Maintien actif par la pompe Na+/K+',
    ruleFormula: 'V_m = V_{int} - V_{ext} = -70\\text{ mV} \\qquad [K^+]_{int} \\gg [K^+]_{ext} \\quad \\& \\quad [Na^+]_{ext} \\gg [Na^+]_{int}',
    ruleExplanation:
      'Au repos, la membrane est 50 à 100 fois plus perméable à K+ qu’à Na+ grâce aux canaux de fuite ouverts. K+ diffuse spontanément vers l’extérieur selon son gradient de concentration, ce qui charge positivement la face externe et laisse l’intérieur électronégatif (-70 mV). La pompe Na+/K+ ATPase expulse 3 Na+ et réabsorbe 2 K+ avec hydrolyse d’ATP pour maintenir durablement ces gradients.',
    piegeTitle: 'Confondre le rôle de la pompe et la diffusion passive',
    piegeText:
      'La pompe Na+/K+ ATPase ne crée pas à elle seule les -70 mV : elle maintient les gradients de concentration que la diffusion passive de K+ tend à épuiser. L’injection de DNP ou d’ouabaïne bloque la pompe et entraîne la disparition lente et progressive du PR.',
    wolofInsight:
      'Ci repos, K+ dafay génn ci canaux de fuite yi ndax concentration bi ci biir dafa ëpp. Pompu Na+/K+ bi mooy écopeur bi : dafay génne 3 Na+ di duggal 2 K+ ak dooley ATP ngir balanse bi bumu soxé !',
    pointsBac: '2 à 3 pts (PR & Graphes)',
  },
  {
    id: 3,
    badge: 'Réflexe 3 • Électrophysiologie Moléculaire',
    category: 'Potentiel d’Action',
    title: 'Cinétique du Potentiel d’Action & Canaux Voltage-Dépendants',
    ruleTitle: 'Dépolarisation par CVD-Na+ (+30 mV) puis Repolarisation par CVD-K+',
    ruleFormula: '\\Delta V \\ge 15\\text{ mV} \\implies \\text{CVD-}Na^+ \\text{ ouverts} \\to +30\\text{ mV} \\implies \\text{CVD-}K^+ \\text{ ouverts} \\to -80\\text{ mV} \\to -70\\text{ mV}',
    ruleExplanation:
      'Dès que la dépolarisation atteint le seuil critique (-55 mV), les canaux Na+ voltage-dépendants (CVD-Na+) s’ouvrent instantanément : entrée massive et passive de Na+ (dépolarisation et inversion à +30 mV). À +30 mV, les CVD-Na+ s’inactivent et les CVD-K+ s’ouvrent : sortie massive et passive de K+ (repolarisation). La fermeture lente des CVD-K+ cause l’hyperpolarisation transitoire (-80 mV).',
    piegeTitle: 'Attribuer la repolarisation à la pompe Na+/K+',
    piegeText:
      'Ne dites JAMAIS que la repolarisation est due à la pompe ! La repolarisation est un flux passif d’ions K+ sortant par les canaux voltage-dépendants CVD-K+. La pompe n’intervient qu’après pour rétablir les stocks ioniques initiaux.',
    wolofInsight:
      'Dépolarisation bi : CVD Na+ yi dañuy ubbeeku foudroyant, Na+ duggu ba mu positif (+30 mV). Repolarisation bi : CVD K+ yi ubbeeku, K+ génn ci biti ba mu dellu ci négatif. Période réfractaire bi amul benn PA buy mëna juddu !',
    pointsBac: '3 à 4 pts (Cœur du sujet)',
  },
  {
    id: 4,
    badge: 'Réflexe 4 • Neuropharmacologie Bac',
    category: 'Neurotoxines',
    title: 'Action Spécifique des Toxines Ioniques (TTX vs TEA)',
    ruleTitle: 'TTX bloque les CVD-Na+ (pas de PA) ; TEA bloque les CVD-K+ (pas de repolarisation)',
    ruleFormula: '\\text{TTX} \\implies \\text{Blocage CVD-}Na^+ \\implies \\text{Suppression PA} \\qquad \\text{TEA} \\implies \\text{Blocage CVD-}K^+ \\implies \\text{Repolarisation bloquée}',
    ruleExplanation:
      'La tétrodotoxine (TTX) bloque sélectivement les CVD-Na+ du côté extracellulaire : la dépolarisation active est impossible, le potentiel d’action est totalement aboli. Le tétraéthylammonium (TEA) bloque sélectivement les CVD-K+ du côté intracellulaire : la dépolarisation jusqu’à +30 mV a lieu normalement mais la repolarisation rapide est supprimée.',
    piegeTitle: 'Confondre cible des toxines et cible de l’ouabaïne',
    piegeText:
      'TTX et TEA agissent uniquement sur les canaux voltage-dépendants du PA et ne modifient pas immédiatement le potentiel de repos. En revanche, l’ouabaïne cible la pompe métabolique et dégrade progressivement le PR.',
    wolofInsight:
      'TTX dafay tëj bunt Na+ yi (amul PA mukk), TEA dafay tëj bunt K+ yi (repolarisation bi dafay bloqué). Toxine bu nekk ak këru kërëm ci examen bi !',
    pointsBac: '2 pts (Raisonnement Bac)',
  },
  {
    id: 5,
    badge: 'Réflexe 5 • Règle d’Or de l’Examen',
    category: 'Fibre vs Nerf',
    title: 'Fibre Isolée (Tout ou Rien) vs Nerf Entier (Recrutement)',
    ruleTitle: 'La fibre répond au Tout ou Rien ; Le nerf répond par sommation par recrutement',
    ruleFormula: '\\text{Fibre unique : Amplitude constante} \\iff \\text{Nerf entier : Amplitude croissante par recrutement}',
    ruleExplanation:
      'Une fibre isolée obéit à la loi du Tout ou Rien : réponse nulle si I < seuil, et réponse d’amplitude maximale constante (100 mV) dès que I >= seuil. Un nerf entier n’obéit JAMAIS à la loi du tout ou rien : son tracé est un potentiel global sommé dont l’amplitude croît avec l’intensité par recrutement progressif de fibres à seuils différents, jusqu’à un palier de saturation.',
    piegeTitle: 'Écrire que le nerf obéit à la loi du tout ou rien',
    piegeText:
      'Erreur fatale qui coûte tous les points de la question : seule la fibre nerveuse individuelle obéit au tout ou rien, jamais le nerf entier ! Si l’amplitude augmente en palier sur un graphe, il s’agit obligatoirement d’un nerf entier.',
    wolofInsight:
      'Fibre bu kenn doŋŋ : lu ëppul seuil amul dara, bu eggee seuil dafay joxé maximal (Tout ou Rien). Nerf dafa am ay junniy fibres yu bokkul seuil : soo yokkee doole ji, dafay recruit ay fibres yu gënë beuri ba kero mu saturation !',
    pointsBac: '2 à 3 pts (Courbes expérimentales)',
  },
  {
    id: 6,
    badge: 'Réflexe 6 • Conduction & Calculs',
    category: 'Vitesse de Conduction',
    title: 'Conduction Continue vs Saltatoire & Calcul de Vitesse',
    ruleTitle: 'La myéline isole et force l’influx à sauter de nœud en nœud à haute vitesse',
    ruleFormula: 'v = \\frac{d}{\\Delta t} = \\frac{d}{t_2 - t_1} \\quad [\\text{m/s}] \\qquad \\text{Conduction saltatoire : } 50\\text{ à } 120\\text{ m/s} \\gg \\text{Continue : } 1\\text{ à } 2\\text{ m/s}',
    ruleExplanation:
      'Sur fibre myélinisée, la myéline est un isolant électrique remarquable : les canaux ioniques ne sont accessibles qu’au niveau des nœuds de Ranvier. L’influx "saute" d’un étranglement au suivant (conduction saltatoire ultra-rapide jusqu’à 120 m/s avec économie d’ATP). La vitesse croît avec la présence de myéline et le diamètre de l’axone.',
    piegeTitle: 'Erreur d’unités dans le calcul de v',
    piegeText:
      'Au Bac, convertissez toujours la distance d en mètres (ex: 6 cm = 0,06 m) et le temps delta t en secondes (ex: 1,2 ms = 0,0012 s) pour obtenir la vitesse en m/s (v = 0,06 / 0,0012 = 50 m/s).',
    wolofInsight:
      'Myéline bi dafa melni plastique bu ñuy gante fil électrique : xibaar bi dafay tëb ci étranglement de Ranvier yi (saltatoire). Te bu diamètre bi gënë mag, dafay gënë gaaw !',
    pointsBac: '1,5 à 2 pts (Application numérique)',
  },
];

export default function B1TissuNerveuxReflexesCard() {
  const [selectedReflexe, setSelectedReflexe] = useState<number>(1);
  const current = TISSU_NERVEUX_REFLEXES.find((r) => r.id === selectedReflexe) || TISSU_NERVEUX_REFLEXES[0];

  return (
    <section className="bg-white rounded-3xl border border-emerald-900/10 shadow-sm overflow-hidden my-6 sm:my-8 w-full max-w-full">
      {/* En-tête officiel sobre et médical sans icônes */}
      <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-slate-900 p-4 sm:p-6 text-white">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-mono font-bold">
              REF-B1.2
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider font-mono font-bold px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                  SVT S2 • Tissu Nerveux &amp; Potentiels
                </span>
                <span className="text-[11px] text-emerald-200/70 font-medium">Référentiel MEN Sénégal</span>
              </div>
              <h2 className="text-lg sm:text-2xl font-black text-white mt-1 leading-snug">
                Les 6 Réflexes Stratégiques : Neurone, Potentiel de Repos et d’Action
              </h2>
            </div>
          </div>
          <span className="text-xs bg-emerald-500/10 border border-emerald-400/20 text-emerald-200 px-3 py-1.5 rounded-xl font-bold self-start sm:self-auto shrink-0">
            Pondération Bac : ~10 pts
          </span>
        </div>

        {/* Navigation par onglets réflexes adaptée aux écrans mobiles */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mt-4 sm:mt-6">
          {TISSU_NERVEUX_REFLEXES.map((r) => {
            const isActive = r.id === selectedReflexe;
            return (
              <button
                key={r.id}
                onClick={() => setSelectedReflexe(r.id)}
                className={`text-left p-2.5 sm:p-3 rounded-2xl transition-all border flex flex-col justify-between min-h-[68px] sm:min-h-[76px] touch-manipulation ${
                  isActive
                    ? 'bg-emerald-500 text-white font-bold shadow-md border-emerald-400 ring-2 ring-emerald-300/40'
                    : 'bg-white/5 text-emerald-100 hover:bg-white/10 border-white/10'
                }`}
              >
                <div className="flex items-center justify-between w-full mb-1">
                  <span className={`text-[10px] font-mono font-black uppercase tracking-wider ${isActive ? 'text-emerald-100' : 'text-emerald-300'}`}>
                    RÉFLEXE 0{r.id}
                  </span>
                  <span className={`text-[8px] sm:text-[9px] px-1.5 py-0.2 rounded font-bold ${isActive ? 'bg-emerald-700 text-emerald-100' : 'bg-white/10 text-emerald-200'}`}>
                    {r.category}
                  </span>
                </div>
                <div className="text-[11px] sm:text-xs font-bold line-clamp-2 leading-tight">
                  {r.title}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenu du réflexe actif */}
      <div className="p-4 sm:p-6 lg:p-8 space-y-5 bg-slate-50/50">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              {current.badge}
            </span>
            <span className="text-[11px] font-bold text-slate-500 bg-white px-2.5 py-0.5 rounded-full border border-slate-200">
              Barème officiel : {current.pointsBac}
            </span>
          </div>
          <h3 className="text-lg sm:text-2xl font-black text-slate-900 leading-snug">
            {current.title}
          </h3>
          <p className="text-xs sm:text-sm font-semibold text-emerald-800 leading-relaxed">
            {current.ruleTitle}
          </p>
        </div>

        {/* Encadré Formule / Règle anatomique KaTeX */}
        <div className="bg-white rounded-2xl border border-emerald-200 p-4 sm:p-5 shadow-xs space-y-3">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
            Règle Biophysique &amp; Formule Fondamentale :
          </span>
          {current.ruleFormula && (
            <div className="text-xs sm:text-base text-slate-800 overflow-x-auto py-1">
              <MathRenderer content={`$$${current.ruleFormula}$$`} />
            </div>
          )}
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {current.ruleExplanation}
          </p>
        </div>

        {/* Deux colonnes : Piège Bac & Xam-xam ci Wolof */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          {/* Piège Bac */}
          <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center gap-2 text-rose-800 font-bold text-xs uppercase font-mono">
              <span className="px-2 py-0.5 rounded bg-rose-200 text-rose-800 font-black text-[10px]">
                PIÈGE BAC
              </span>
              <span className="truncate">{current.piegeTitle}</span>
            </div>
            <p className="text-xs sm:text-sm text-rose-900/90 mt-2.5 leading-relaxed">
              {current.piegeText}
            </p>
          </div>

          {/* Xam-xam ci Wolof */}
          <div className="bg-amber-50/90 border border-amber-200 rounded-2xl p-4 sm:p-5">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase font-mono">
              <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-900 font-black text-[10px]">
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
