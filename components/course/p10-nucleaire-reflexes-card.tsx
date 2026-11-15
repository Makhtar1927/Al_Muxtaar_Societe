'use client';

import React, { useState } from 'react';
import MathRenderer from '@/components/course/math-renderer';

interface ReflexeItem {
  id: string;
  category: 'noyau' | 'radioactivite' | 'reactions';
  title: string;
  badge: string;
  formula: string;
  explication: string;
  piegeBac: string;
  wolofTip: string;
}

const REFLEXES_P10: ReflexeItem[] = [
  {
    id: 'defaut_masse',
    category: 'noyau',
    title: 'Défaut de masse Δm et Énergie de liaison E_ℓ',
    badge: 'Réflexe n°1 · Structure du Noyau',
    formula: '\\Delta m = [Z m_p + (A - Z) m_n] - m_{\\text{noyau}} > 0 \\quad ; \\quad E_\\ell = \\Delta m \\cdot c^2',
    explication:
      'Les nucléons isolés sont TOUJOURS plus lourds que le noyau lié. La différence de masse Δm correspond à l’énergie libérée lors de la formation du noyau (ou à fournir pour le dissocier en nucléons au repos). Si Δm est en u (unité de masse atomique), utilisez directement la conversion officielle du Bac : 1 u × c² = 931,5 MeV.',
    piegeBac:
      'Ne pas confondre la masse du noyau m(noyau) et la masse de l’atome m(atome). Si l’énoncé fournit la masse de l’atome, n’oubliez pas de soustraire la masse des Z électrons : m(noyau) = m(atome) - Z·m_e (ou vérifiez si les masses atomiques se compensent dans les bilans).',
    wolofTip:
      'Xam-xam ci Wolof : « Pàcc yu sew-sew yi (protons ak neutrons) su ñu tàqalikoo dañuy gënë diis ba ñu booloo def noyau bi ! Masse bi reer ci booloo boobu, mooy doli dëgër-dëgër ak kaaraange noyau bi : énergie de liaison. »',
  },
  {
    id: 'aston_stabilite',
    category: 'noyau',
    title: 'Courbe d’Aston et Stabilité par Nucléon E_ℓ / A',
    badge: 'Réflexe n°2 · Courbe d’Aston',
    formula: '\\text{Stabilité} \\iff \\frac{E_\\ell}{A} \\text{ est maximale (vers } A \\approx 56 \\text{, Fe, } \\approx 8{,}8 \\text{ MeV/nucléon)}',
    explication:
      'Un noyau X₁ est plus stable qu’un noyau X₂ si et seulement si son énergie de liaison PAR NUCLÉON E_ℓ/A est plus grande (et non pas son énergie de liaison totale E_ℓ !). Sur la courbe d’Aston -E_ℓ/A = f(A) : les noyaux très légers (A < 20) gagnent en stabilité par FUSION thermonucléaire, tandis que les noyaux très lourds (A > 100) gagnent en stabilité par FISSION induite.',
    piegeBac:
      'Gros piège classique au Bac S2 : l’Uranium 238 a une énergie de liaison totale E_ℓ(²³⁸U) ≈ 1800 MeV bien supérieure à celle du Fer 56 (E_ℓ(⁵⁶Fe) ≈ 492 MeV). Pourtant, le Fer 56 est BEAUCOUP PLUS STABLE que l’Uranium car son E_ℓ/A (8,79 MeV/nucléon) dépasse celle de l’Uranium (7,57 MeV/nucléon) !',
    wolofTip:
      'Xam-xam ci Wolof : « Bula ñu laajee noyau bu gënë dëgër, bu say bët dem ci E_ℓ totale bi ! Da ngay jël E_ℓ nga séddale ko ci mbooleem nucléons yi (E_ℓ / A). Ku ëpp cër bu nekk limuy jot, mooy gënë dëgër ba faaw. »',
  },
  {
    id: 'soddy_lois',
    category: 'radioactivite',
    title: 'Lois de Soddy & Types de Rayonnements (α, β⁻, β⁺, γ)',
    badge: 'Réflexe n°3 · Désintégrations Spontanées',
    formula: '_{Z}^{A}X \\longrightarrow _{Z\'}^{A\'}Y + _{z}^{a}P \\implies A = A\' + a \\quad \\text{et} \\quad Z = Z\' + z',
    explication:
      'Dans toute réaction nucléaire, il y a conservation rigoureuse du nombre de masse A (nombre de nucléons) et de la charge électrique Z. Types canoniques : α = noyau d’Hélium (⁴₂He) émis par noyaux lourds ; β⁻ = électron (⁰₋₁e) émis par noyaux avec excès de neutrons (n → p + e⁻ + antineutrino) ; β⁺ = positon (⁰₊₁e) émis par excès de protons (p → n + e⁺ + neutrino) ; γ = rayonnement électromagnétique de désexcitation d’un noyau fils excité Y*.',
    piegeBac:
      'Dans une désintégration β⁻, Z augmente d’une unité (Z → Z + 1). Dans une désintégration β⁺, Z diminue d’une unité (Z → Z - 1). Ne pas oublier que dans la désintégration α, le noyau perd 4 nucléons et 2 protons (Z - 2).',
    wolofTip:
      'Xam-xam ci Wolof : « Soddy dafa wax ne : dara du réer ci limu nucléons yi (kaw bi A) ak charge électrique bi (suuf bi Z). Li nekkoon ci ndeyjoor war na tolloo ak li nekk ci cammooñ. »',
  },
  {
    id: 'decroissance_demivie',
    category: 'radioactivite',
    title: 'Loi de Décroissance Radioactive, Période T et Demi-Vie',
    badge: 'Réflexe n°4 · Cinétique Nucléaire',
    formula: 'N(t) = N_0 e^{-\\lambda t} \\quad ; \\quad T = t_{1/2} = \\frac{\\ln 2}{\\lambda} \\approx \\frac{0{,}693}{\\lambda} \\quad ; \\quad N(n T) = \\frac{N_0}{2^n}',
    explication:
      'Le nombre de noyaux radioactifs restants décroît exponentiellement avec le temps. La période radioactive T (ou demi-vie) est la durée au bout de laquelle la moitié des noyaux radioactifs initiaux s’est désintégrée. Propriété clé : après n périodes, N(n·T) = N₀ / 2ⁿ. Après 10 périodes (t = 10 T), il ne reste que N₀/1024 < 0,1 % des noyaux initiaux.',
    piegeBac:
      'Attention au graphique ln(N) = f(t) ou ln(A) = f(t) : c’est une droite affine de pente négative égale à -λ ! La pente donne directement la constante radioactive λ.',
    wolofTip:
      'Xam-xam ci Wolof : « Période T mooy waxtu wi ngay xaar ngir wàllu xaaj u noyaux yi desoon dee. Su période bi jeexee, da ngay xaajalatt li desoon ci 2. Du jeex muk ci calcul mbeur, waaye ci 10 T lépp jéx takk ! »',
  },
  {
    id: 'activite_datation',
    category: 'radioactivite',
    title: 'Activité Radioactive A(t) et Datation au Carbone 14',
    badge: 'Réflexe n°5 · Mesures & Datation',
    formula: 'A(t) = -\\frac{\\mathrm{d}N}{\\mathrm{d}t} = \\lambda N(t) = A_0 e^{-\\lambda t} \\implies t = \\frac{1}{\\lambda} \\ln\\left(\\frac{A_0}{A(t)}\\right) = \\frac{T}{\\ln 2} \\ln\\left(\\frac{A_0}{A(t)}\\right)',
    explication:
      'L’activité A(t) représente le nombre de désintégrations par seconde. Son unité dans le Système International est le Becquerel (1 Bq = 1 désintégration / s). Pour la datation d’un échantillon archéologique (bois, ossement fossile), A₀ représente l’activité d’un échantillon vivant témoin de même masse.',
    piegeBac:
      'Pour calculer l’activité A = λ·N en Becquerels (Bq), la constante radioactive λ DOIT IMPÉRATIVEMENT être convertie en secondes inverses (s⁻¹), et non en ans⁻¹ ou jours⁻¹ ! Erreur d’unité = note zéro sur la question au Bac.',
    wolofTip:
      'Xam-xam ci Wolof : « Becquerel dafay natt lim u désintégrations ci seconde bu jot. Boo demee ba ci xët u datation Carbone 14, activités yi dañuy wàññiku ndax garab gi dafa dee ba noppi dëpp réespiré Carbone 14 bu bees. »',
  },
  {
    id: 'bilan_energie_centrales',
    category: 'reactions',
    title: 'Bilan Énergétique d’une Réaction & Puissance de Centrale',
    badge: 'Réflexe n°6 · Fission & Énergie Libérée',
    formula: '\\Delta m = \\sum m_{\\text{produits}} - \\sum m_{\\text{réactifs}} < 0 \\implies E_{\\text{libérée}} = |\\Delta m| \\cdot c^2 \\quad ; \\quad P_{\\text{élec}} = r \\cdot \\frac{N \\cdot E_1}{\\Delta t}',
    explication:
      'Pour une réaction nucléaire spontanée ou provoquée, si la masse totale diminue (Δm < 0), de l’énergie est libérée vers le milieu extérieur sous forme d’énergie cinétique des particules et de rayonnement γ. Pour une centrale nucléaire de puissance électrique P_élec et de rendement r : P_thermique = P_élec / r. L’énergie totale requise est E_tot = P_thermique × Δt.',
    piegeBac:
      'Toujours préciser le signe ! Par convention thermodynamique, l’énergie échangée par le système est ΔE = Δm·c² < 0 (perdue par le système). L’énergie LIBÉRÉE ou fournie à l’extérieur est positive : E_lib = |ΔE| = |Δm|·c² > 0.',
    wolofTip:
      'Xam-xam ci Wolof : « Réaction nucléaire dafay joxe doole ju réy te kawe ! Masse bu néew bu reer (Δm) dafay soppiku doole ju tar (E = m·c²). Ci centrale nucléaire, énergie boobu lañuy jël ngir def courant électrique. »',
  },
];

export default function P10NucleaireReflexesCard() {
  const [filter, setFilter] = useState<'all' | 'noyau' | 'radioactivite' | 'reactions'>('all');

  const filtered =
    filter === 'all'
      ? REFLEXES_P10
      : REFLEXES_P10.filter((item) => item.category === filter);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl mb-8 text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
            Fiche Réflexes Clés Bac S2 • Chapitre P10
          </div>
          <h3 className="text-xl font-bold text-slate-100 tracking-tight">
            Physique Nucléaire : Noyau, Radioactivité &amp; Énergie
          </h3>
          <p className="text-sm text-slate-400 mt-1">
            Les 6 automatismes décisifs pour maîtriser les bilans de masse, la courbe d’Aston, les désintégrations et la datation.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === 'all'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Tous (6)
          </button>
          <button
            onClick={() => setFilter('noyau')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === 'noyau'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Noyau &amp; Aston
          </button>
          <button
            onClick={() => setFilter('radioactivite')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === 'radioactivite'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Radioactivité &amp; Décroissance
          </button>
          <button
            onClick={() => setFilter('reactions')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              filter === 'reactions'
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Réactions &amp; Énergie
          </button>
        </div>
      </div>

      {/* Grid of Reflexes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="rounded-xl bg-slate-800/80 border border-slate-700/70 p-5 flex flex-col justify-between hover:border-emerald-500/50 transition-all hover:shadow-lg"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  {item.badge}
                </span>
              </div>

              <h4 className="text-base font-bold text-slate-100 mb-2">{item.title}</h4>

              {/* Formula display */}
              <div className="my-3 p-3 rounded-lg bg-slate-900/90 border border-slate-700/60 text-center overflow-x-auto">
                <MathRenderer formula={item.formula} />
              </div>

              <p className="text-xs text-slate-300 leading-relaxed mt-2 mb-3">
                {item.explication}
              </p>
            </div>

            <div className="space-y-2 pt-3 border-t border-slate-700/60 mt-2">
              {/* Trap box */}
              <div className="p-2.5 rounded-lg bg-rose-950/40 border border-rose-800/50 text-[11px] text-rose-300">
                <div>
                  <strong className="text-rose-200">Piège Bac S2 : </strong>
                  {item.piegeBac}
                </div>
              </div>

              {/* Wolof tip */}
              <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-800/40 text-[11px] text-amber-200/90">
                <div>{item.wolofTip}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
