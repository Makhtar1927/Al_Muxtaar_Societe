'use client';

import React, { useState } from 'react';
import {
  Scissors,
  Dna,
  Layers,
  Activity,
  CheckCircle2,
  AlertCircle,
  FlaskConical,
  ChevronRight,
  Shield,
  Sparkles,
} from 'lucide-react';

type CloningStep = 'plasmide' | 'restriction' | 'ligation' | 'transformation' | 'selection';

export default function B5GenieGenetiqueInteractiveLab() {
  const [activeCloningStep, setActiveCloningStep] = useState<CloningStep>('ligation');
  const [pcrCycle, setPcrCycle] = useState<number>(3);
  const [insulinPhase, setInsulinPhase] = useState<'clonage' | 'fermentation' | 'purification'>('fermentation');

  const pcrMolecules = Math.pow(2, pcrCycle);

  return (
    <div className="my-10 rounded-3xl bg-white border border-navy/10 p-5 sm:p-7 shadow-sm">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/10 pb-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-3 py-1 text-xs font-bold text-navy mb-1 border border-navy/10">
            <FlaskConical className="w-3.5 h-3.5 text-turquoise" />
            <span>Laboratoire Virtuel de Biotechnologies &amp; Génie Génétique</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-navy">
            Clonage Moléculaire, Cycles de PCR &amp; Production de l’Insuline
          </h3>
          <p className="text-xs sm:text-sm text-text/70 mt-0.5">
            Schémas vectoriels interactifs : plasmide recombinant, thermocycleur PCR et fabrication industrielle de biomédicaments.
          </p>
        </div>
      </div>

      {/* MODULE 1 : Protocole Complet du Clonage Moléculaire */}
      <div className="mb-8 rounded-2xl border border-navy/10 bg-surface/30 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-navy/10 pb-3 mb-5">
          <div className="flex items-center gap-2">
            <Scissors className="w-4 h-4 text-turquoise" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-text/50">Module 1</span>
            <h4 className="text-base sm:text-lg font-black text-navy">
              Fabrication d’un Plasmide Recombinant &amp; Sélection Bactérienne
            </h4>
          </div>
          <span className="text-xs text-text/60 font-semibold">Technique de l’ADN recombinant</span>
        </div>

        {/* Boutons d'étapes de clonage */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5 mb-5">
          {[
            { key: 'plasmide', label: '1. Plasmide Vecteur', sub: 'ADN circulaire' },
            { key: 'restriction', label: '2. Coupure EcoRI', sub: 'Bouts cohésifs' },
            { key: 'ligation', label: '3. ADN Ligase', sub: 'Insertion gène' },
            { key: 'transformation', label: '4. Choc Thermique', sub: 'Entrée E. coli' },
            { key: 'selection', label: '5. Milieu Ampicilline', sub: 'Colonies OGM' },
          ].map((s) => (
            <button
              key={s.key}
              onClick={() => setActiveCloningStep(s.key as CloningStep)}
              className={`rounded-2xl p-3 text-left transition-all border ${
                activeCloningStep === s.key
                  ? 'bg-navy text-white border-navy shadow-sm'
                  : 'bg-white text-navy/80 border-navy/10 hover:bg-surface'
              }`}
            >
              <span className="block text-xs font-bold leading-tight">{s.label}</span>
              <span className="text-[10px] opacity-75 mt-0.5 block truncate">{s.sub}</span>
            </button>
          ))}
        </div>

        {/* Schéma SVG du Clonage Moléculaire */}
        <div className="rounded-2xl border border-navy/10 bg-white p-4 mb-4 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-text/50 mb-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Dna className="w-3.5 h-3.5 text-turquoise" />
              <span>Schéma vectoriel détaillé — Étape : {activeCloningStep.toUpperCase()}</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              In vitro &amp; In vivo
            </span>
          </div>

          <svg viewBox="0 0 500 200" className="w-full max-w-xl mx-auto" aria-label="Schéma clonage moléculaire">
            {/* 1. Plasmide circulaire d'origine */}
            <g transform="translate(60, 80)">
              <circle cx="0" cy="0" r="38" fill="none" stroke="#2563eb" strokeWidth="4"/>
              <path d="M-27,-27 A38,38 0 0,1 27,-27" fill="none" stroke="#059669" strokeWidth="6"/>
              <text x="0" y="-35" textAnchor="middle" fontSize="6.5" fill="#059669" fontWeight="bold">AmpR (Résistance)</text>
              <circle cx="0" cy="38" r="4" fill="#b91c1c"/>
              <text x="0" y="52" textAnchor="middle" fontSize="6.5" fill="#b91c1c" fontWeight="bold">Site EcoRI</text>
              <text x="0" y="4" textAnchor="middle" fontSize="7" fill="#0a1628" fontWeight="bold">Plasmide</text>
              <text x="0" y="14" textAnchor="middle" fontSize="6" fill="#64748b">Vecteur</text>
            </g>

            {/* Flèche vers coupure */}
            <line x1="115" y1="80" x2="145" y2="80" stroke="#0a1628" strokeWidth="1.5"/>
            <polygon points="145,77 153,80 145,83" fill="#0a1628"/>
            <text x="130" y="72" textAnchor="middle" fontSize="6" fill="#b45309">EcoRI</text>

            {/* 2. Plasmide ouvert avec bouts cohésifs */}
            <g transform="translate(200, 80)">
              <path d="M-15,35 A38,38 0 1,1 15,35" fill="none" stroke="#2563eb" strokeWidth="4"/>
              {/* Bouts collants */}
              <line x1="-15" y1="35" x2="-22" y2="40" stroke="#b91c1c" strokeWidth="2.5"/>
              <line x1="15" y1="35" x2="22" y2="40" stroke="#b91c1c" strokeWidth="2.5"/>
              <text x="0" y="50" textAnchor="middle" fontSize="6" fill="#b91c1c">Bouts cohésifs (AATT)</text>
              <text x="0" y="-5" textAnchor="middle" fontSize="6.5" fill="#0a1628">Plasmide ouvert</text>
            </g>

            {/* Flèche vers ligation */}
            <line x1="250" y1="80" x2="280" y2="80" stroke="#0a1628" strokeWidth="1.5"/>
            <polygon points="280,77 288,80 280,83" fill="#0a1628"/>
            <text x="265" y="72" textAnchor="middle" fontSize="6" fill="#059669">+ Ligase</text>

            {/* 3. Plasmide Recombinant avec transgène inséré */}
            <g transform="translate(340, 80)">
              <circle cx="0" cy="0" r="38" fill="none" stroke="#2563eb" strokeWidth="4"/>
              <path d="M-27,-27 A38,38 0 0,1 27,-27" fill="none" stroke="#059669" strokeWidth="6"/>
              {/* Insert d'ADN étranger (transgène) */}
              <path d="M-15,35 A38,38 0 0,0 15,35" fill="none" stroke="#be185d" strokeWidth="6"/>
              <text x="0" y="52" textAnchor="middle" fontSize="7" fill="#be185d" fontWeight="bold">Gène d'intérêt</text>
              <text x="0" y="0" textAnchor="middle" fontSize="7" fill="#0a1628" fontWeight="bold">Plasmide</text>
              <text x="0" y="10" textAnchor="middle" fontSize="6.5" fill="#be185d" fontWeight="bold">Recombinant</text>
            </g>

            {/* Flèche vers bactérie */}
            <line x1="390" y1="80" x2="415" y2="80" stroke="#0a1628" strokeWidth="1.5"/>
            <polygon points="415,77 423,80 415,83" fill="#0a1628"/>

            {/* 4. Bactérie transformée (E. coli) */}
            <g transform="translate(455, 80)">
              <rect x="-35" y="-22" width="70" height="44" rx="20" fill="#f0fdf4" stroke="#16a34a" strokeWidth="2"/>
              {/* Chromosome bactérien */}
              <ellipse cx="-15" cy="0" rx="10" ry="12" fill="none" stroke="#16a34a" strokeWidth="1" strokeDasharray="2 1"/>
              {/* Plasmide recombinant à l'intérieur */}
              <circle cx="15" cy="0" r="8" fill="none" stroke="#2563eb" strokeWidth="2"/>
              <circle cx="15" cy="6" r="2.5" fill="#be185d"/>
              <text x="0" y="32" textAnchor="middle" fontSize="6.5" fill="#16a34a" fontWeight="bold">E. coli OGM</text>
            </g>

            {/* Note en bas */}
            <rect x="50" y="150" width="400" height="36" rx="8" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1"/>
            <text x="250" y="165" textAnchor="middle" fontSize="7" fill="#0a1628" fontWeight="bold">
              Règle d'or Bac S2 : Le plasmide vecteur et le transgène doivent être coupés par la MÊME enzyme de restriction
            </text>
            <text x="250" y="177" textAnchor="middle" fontSize="6.5" fill="#64748b">
              Cela garantit des bouts collants parfaitement complémentaires pouvant être scellés par l'ADN ligase.
            </text>
          </svg>
        </div>

        {/* Détails de l'étape active */}
        <div className="rounded-xl bg-white p-3.5 border border-navy/10 shadow-xs">
          <p className="text-xs text-text/80 leading-relaxed font-medium">
            {activeCloningStep === 'plasmide' &&
              'Le plasmide est un vecteur idéal : petite taille, réplication autonome dans la bactérie hôte, et porteur d’un gène de résistance à l’ampicilline qui servira de marqueur de sélection.'}
            {activeCloningStep === 'restriction' &&
              'L’enzyme EcoRI reconnaît la séquence palindromique 5’-GAATTC-3’ et coupe en décalé entre G et A, laissant des extrémités monocaténaires adhésives 5’-AATT-3’.'}
            {activeCloningStep === 'ligation' &&
              'L’ADN ligase catalyse la formation de liaisons phosphodiester covalentes entre le vecteur et le transgène humain, reformant une molécule circulaire hybride stable.'}
            {activeCloningStep === 'transformation' &&
              'Les bactéries sont traitées au chlorure de calcium puis soumises à un choc thermique (42°C pendant 90 secondes) pour ouvrir temporairement des pores membranaires permettant l’entrée du plasmide.'}
            {activeCloningStep === 'selection' &&
              'Sur boîte de gélose contenant de l’ampicilline, les bactéries non transformées meurent. Seules les bactéries ayant reçu le plasmide recombinant survivent et forment des colonies clonales.'}
          </p>
        </div>
      </div>

      {/* MODULE 2 : Simulateur Thermocycleur PCR (Amplification Exponentielle) */}
      <div className="mb-8 rounded-2xl border border-navy/10 bg-white p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/10 pb-3 mb-5">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-turquoise" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-text/50">Module 2</span>
            <h4 className="text-base sm:text-lg font-black text-navy">
              Simulateur PCR : Cycles Thermiques &amp; Amplification ($2^n$)
            </h4>
          </div>
          {/* Sélecteur de cycle */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-text/60 font-semibold">Cycles simulés :</span>
            {[1, 2, 3, 5, 10, 20, 30].map((c) => (
              <button
                key={c}
                onClick={() => setPcrCycle(c)}
                className={`h-7 px-2.5 rounded-lg text-xs font-bold transition-all border ${
                  pcrCycle === c ? 'bg-navy text-white border-navy' : 'bg-surface text-navy/70 border-navy/10 hover:bg-surface/80'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Schéma SVG du Cycle Thermique PCR */}
        <div className="rounded-2xl border border-navy/10 bg-surface/30 p-4 mb-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-text/50 mb-3 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <FlaskConical className="w-3.5 h-3.5 text-turquoise" />
              <span>Profil thermique standard d’un cycle de PCR</span>
            </span>
            <span className="text-xs font-black text-turquoise font-mono">
              Après {pcrCycle} cycle{pcrCycle > 1 ? 's' : ''} : {pcrMolecules.toLocaleString('fr-FR')} molécule{pcrMolecules > 1 ? 's' : ''}
            </span>
          </div>

          <svg viewBox="0 0 480 160" className="w-full max-w-lg mx-auto" aria-label="Cycle thermique PCR">
            {/* Axe des températures */}
            <line x1="45" y1="20" x2="45" y2="135" stroke="#94a3b8" strokeWidth="1.5"/>
            <line x1="45" y1="135" x2="460" y2="135" stroke="#94a3b8" strokeWidth="1.5"/>
            <text x="35" y="32" textAnchor="end" fontSize="7" fill="#b91c1c" fontWeight="bold">95°C</text>
            <text x="35" y="78" textAnchor="end" fontSize="7" fill="#16a34a" fontWeight="bold">72°C</text>
            <text x="35" y="112" textAnchor="end" fontSize="7" fill="#2563eb" fontWeight="bold">55°C</text>

            {/* Courbe thermique d'un cycle */}
            <path
              d="M50,135 L80,30 L170,30 L200,110 L280,110 L300,75 L400,75 L430,135"
              fill="none"
              stroke="#0a1628"
              strokeWidth="3"
            />

            {/* Étape 1 : Dénaturation 95°C */}
            <rect x="85" y="35" width="80" height="26" rx="4" fill="#fee2e2" stroke="#b91c1c" strokeWidth="1"/>
            <text x="125" y="47" textAnchor="middle" fontSize="6.5" fill="#b91c1c" fontWeight="bold">1. Dénaturation</text>
            <text x="125" y="56" textAnchor="middle" fontSize="5.5" fill="#7f1d1d">Séparation brins</text>

            {/* Étape 2 : Hybridation 55°C */}
            <rect x="205" y="115" width="70" height="26" rx="4" fill="#dbeafe" stroke="#2563eb" strokeWidth="1"/>
            <text x="240" y="127" textAnchor="middle" fontSize="6.5" fill="#2563eb" fontWeight="bold">2. Hybridation</text>
            <text x="240" y="136" textAnchor="middle" fontSize="5.5" fill="#1e3a8a">Amorces ADN</text>

            {/* Étape 3 : Élongation 72°C */}
            <rect x="310" y="80" width="85" height="26" rx="4" fill="#dcfce7" stroke="#16a34a" strokeWidth="1"/>
            <text x="352" y="92" textAnchor="middle" fontSize="6.5" fill="#16a34a" fontWeight="bold">3. Élongation</text>
            <text x="352" y="101" textAnchor="middle" fontSize="5.5" fill="#14532d">Taq Polymérase</text>
          </svg>
        </div>

        {/* Détails PCR */}
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-rose-50/70 border border-rose-200 p-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 block mb-1">
              1. Dénaturation (94-95°C)
            </span>
            <p className="text-xs text-rose-950 leading-relaxed">
              La haute température rompt les liaisons hydrogène sans toucher aux liaisons phosphodiester covalentes, séparant les deux brins matrices.
            </p>
          </div>
          <div className="rounded-xl bg-blue-50/70 border border-blue-200 p-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-800 block mb-1">
              2. Hybridation (50-60°C)
            </span>
            <p className="text-xs text-blue-950 leading-relaxed">
              Les amorces oligonucléotidiques synthétiques s’apparient par complémentarité aux extrémités 3’ des séquences d’intérêt à amplifier.
            </p>
          </div>
          <div className="rounded-xl bg-emerald-50/70 border border-emerald-200 p-3">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
              3. Élongation (72°C)
            </span>
            <p className="text-xs text-emerald-950 leading-relaxed">
              La Taq polymérase thermorésistante incorpore les dNTPs libres à 72°C dans le sens 5’→3’ à la vitesse de 1 000 nucléotides par minute.
            </p>
          </div>
        </div>
      </div>

      {/* MODULE 3 : Production Industrielle de l’Insuline Humaine Recombinante */}
      <div className="rounded-2xl border border-navy/10 bg-surface/30 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/10 pb-3 mb-5">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-turquoise" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-text/50">Module 3</span>
            <h4 className="text-base sm:text-lg font-black text-navy">
              L’Usine Cellulaire : Production de l’Insuline Humaine Recombinante
            </h4>
          </div>
          <div className="inline-flex rounded-xl bg-white border border-navy/10 p-1">
            {[
              { key: 'clonage', label: '1. Clonage ADNc' },
              { key: 'fermentation', label: '2. Fermentation' },
              { key: 'purification', label: '3. Purification' },
            ].map((p) => (
              <button
                key={p.key}
                onClick={() => setInsulinPhase(p.key as any)}
                className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                  insulinPhase === p.key ? 'bg-navy text-white' : 'text-navy/70 hover:text-navy'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Schéma de la chaîne de production */}
        <div className="rounded-2xl border border-navy/10 bg-white p-4 mb-4 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-text/50 mb-3 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-turquoise" />
            <span>Processus biopharmaceutique — De la cellule humaine au flacon d’insuline</span>
          </div>

          <svg viewBox="0 0 480 110" className="w-full max-w-lg mx-auto" aria-label="Production insuline">
            {[
              { x: 10, title: '1. Cellule $\\beta$', sub: 'ARNm insuline', color: '#f0fdf4', border: '#16a34a' },
              { x: 105, title: '2. ADNc', sub: 'Rétrotranscriptase', color: '#f0fdfb', border: '#00c4b4' },
              { x: 200, title: '3. Plasmide', sub: 'E. coli recombinante', color: '#eff6ff', border: '#2563eb' },
              { x: 295, title: '4. Bioréacteur', sub: 'Cuve de fermentation', color: '#fef3c7', border: '#b45309' },
              { x: 390, title: '5. Insuline', sub: 'Pureté > 99,9%', color: '#fdf4ff', border: '#a855f7' },
            ].map((step, i) => (
              <g key={i}>
                <rect x={step.x} y="15" width="80" height="52" rx="8" fill={step.color} stroke={step.border} strokeWidth="1.5"/>
                <text x={step.x + 40} y="38" textAnchor="middle" fontSize="7" fill="#0a1628" fontWeight="bold">
                  {step.title}
                </text>
                <text x={step.x + 40} y="52" textAnchor="middle" fontSize="5.5" fill="#64748b">
                  {step.sub}
                </text>
                {i < 4 && (
                  <>
                    <line x1={step.x + 80} y1="41" x2={step.x + 105} y2="41" stroke="#0a1628" strokeWidth="1.5"/>
                    <polygon points={`${step.x + 100},38 ${step.x + 105},41 ${step.x + 100},44`} fill="#0a1628"/>
                  </>
                )}
              </g>
            ))}
          </svg>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-3 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="text-xs text-amber-950">
            <span className="font-bold block mb-0.5">Avantage décisif au Bac S2 :</span>
            <p className="leading-relaxed opacity-90">
              L’insuline humaine recombinante produite par génie génétique possède la séquence humaine exacte, éliminant définitivement les risques de choc anaphylactique provoqués jadis par les impuretés de l’insuline d’origine porcine ou bovine.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
