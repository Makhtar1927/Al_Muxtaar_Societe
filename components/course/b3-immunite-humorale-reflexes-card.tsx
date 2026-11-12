'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FicheData {
  id: number;
  numero: string;
  titre: string;
  theme: string;
  accent: {
    badge: string;
    border: string;
  };
  contenu: React.ReactNode;
}

export default function B3ImmuniteHumoraleReflexesCard() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const fiches: FicheData[] = [
    {
      id: 0,
      numero: '01',
      titre: 'Structure Moléculaire des Anticorps (Immunoglobulines)',
      theme: 'Biochimie Immunologique',
      accent: {
        badge: 'bg-blue-50 text-blue-800 border-blue-200',
        border: 'border-l-blue-600',
      },
      contenu: (
        <div className="space-y-4 text-slate-800 text-sm leading-relaxed">
          <div className="border-l-4 border-blue-600 pl-3.5 py-0.5 bg-blue-50/50 rounded-r-lg">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900 block mb-0.5">
              Définition d'un Anticorps
            </span>
            <p>
              Un <strong>anticorps (ou immunoglobuline, Ig)</strong> est une glycoprotéine circulante sécrétée par les plasmocytes dans le sérum, capable de se lier de façon stéréospécifique à l'antigène qui a induit sa production.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
              <strong className="text-slate-900 block mb-1">Architecture en forme de "Y"</strong>
              <p className="text-slate-600">
                Molécule tétramérique formée de <strong>4 chaînes polypeptidiques</strong> reliées par des ponts disulfures : 2 chaînes lourdes identiques (H, Heavy ≈ 50 kDa) et 2 chaînes légères identiques (L, Light ≈ 25 kDa).
              </p>
            </div>
            <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
              <strong className="text-slate-900 block mb-1">Fragments Fab et Fc</strong>
              <p className="text-slate-600">
                La digestion par la papaïne clive la molécule en :
                <span className="block mt-0.5">• <strong>2 fragments Fab :</strong> portent les sites de fixation de l'antigène (paratope).</span>
                <span className="block mt-0.5">• <strong>1 fragment Fc (cristallisable) :</strong> fixe le complément et se lie aux récepteurs des phagocytes.</span>
              </p>
            </div>
          </div>

          <div className="bg-blue-50/60 border border-blue-200 rounded-lg p-3 text-xs text-blue-950">
            <strong>Règle du Paratope :</strong> Les domaines variables terminaux (VH et VL) forment le <em>paratope</em>, dont la conformation spatiale est rigoureusement complémentaire de l'<em>épitope</em> (déterminant antigénique). Chaque molécule d'Ig possède 2 paratopes identiques (bivalente).
          </div>
        </div>
      ),
    },
    {
      id: 1,
      numero: '02',
      titre: 'Les 5 Classes d\'Immunoglobulines (Isotypes)',
      theme: 'Classification Sérique Bac S2',
      accent: {
        badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        border: 'border-l-emerald-600',
      },
      contenu: (
        <div className="space-y-4 text-slate-800 text-sm leading-relaxed">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-2.5">Classe (Isotype)</th>
                  <th className="p-2.5">Structure</th>
                  <th className="p-2.5">Localisation & Propriétés Physiologiques</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr>
                  <td className="p-2 font-bold text-blue-800">IgG</td>
                  <td className="p-2">Monomère (80 % des Ig)</td>
                  <td className="p-2">Principaux anticorps de la réponse secondaire. <strong>Traversent la barrière placentaire</strong> pour protéger le fœtus.</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-rose-800">IgM</td>
                  <td className="p-2">Pentamère (10 paratopes)</td>
                  <td className="p-2">Sécrétés lors de la <strong>réponse primaire précoce</strong>. Puissant pouvoir agglutinant et activateur du complément.</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-amber-800">IgA</td>
                  <td className="p-2">Dimère sécrétoire</td>
                  <td className="p-2">Présents dans les <strong>sécrétions muqueuses</strong> (salive, larmes, mucus digestif) et dans le <strong>colostrum maternel</strong>.</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-purple-800">IgE</td>
                  <td className="p-2">Monomère</td>
                  <td className="p-2">Fixation aux mastocytes et basophiles via le fragment Fc. Rôle majeur dans les <strong>allergies</strong> et contre les parasites.</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-slate-600">IgD</td>
                  <td className="p-2">Monomère membranaire</td>
                  <td className="p-2">Forme le récepteur antigénique BCR des lymphocytes B naïfs matures.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      numero: '03',
      titre: 'La Théorie de la Sélection Clonale des Lymphocytes B',
      theme: 'Cinétique & Spécificité',
      accent: {
        badge: 'bg-indigo-50 text-indigo-800 border-indigo-200',
        border: 'border-l-indigo-600',
      },
      contenu: (
        <div className="space-y-4 text-slate-800 text-sm leading-relaxed">
          <p>
            Chaque lymphocyte B possède à sa surface un seul type de récepteur membranaire (BCR) spécifique d'un épitope précis, avant même tout contact avec l'antigène (répertoire préexistant).
          </p>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-start gap-2.5">
              <span className="font-mono font-bold text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded">1</span>
              <div>
                <strong className="text-slate-900">Phase de Sélection Clonale :</strong>
                <span className="text-slate-600 block">L'antigène sélectionne uniquement le clone de LB naïf dont le BCR présente une complémentarité stéréochimique exacte avec son épitope.</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-start gap-2.5">
              <span className="font-mono font-bold text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded">2</span>
              <div>
                <strong className="text-slate-900">Phase d'Amplification Clonale (Prolifération) :</strong>
                <span className="text-slate-600 block">Sous l'effet stimulant des interleukines sécrétées par les Lymphocytes T4 activés (IL-4, IL-5), le LB sélectionné subit d'intenses mitoses dans les ganglions lymphatiques.</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-start gap-2.5">
              <span className="font-mono font-bold text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded">3</span>
              <div>
                <strong className="text-slate-900">Phase de Différenciation :</strong>
                <span className="text-slate-600 block">
                  Le clone se scinde en deux sous-populations distinctes :
                  <span className="block mt-0.5">• <strong>Plasmocytes :</strong> cellules effectrices volumineuses riches en réticulum endoplasmique, usines produisant des milliers d'anticorps libres par seconde.</span>
                  <span className="block mt-0.5">• <strong>Lymphocytes B mémoires :</strong> cellules à longue durée de vie assurant la mémoire immunitaire.</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      numero: '04',
      titre: 'Le Complexe Immun & Ses Conséquences Effectrices',
      theme: 'Neutralisation & Élimination',
      accent: {
        badge: 'bg-rose-50 text-rose-800 border-rose-200',
        border: 'border-l-rose-600',
      },
      contenu: (
        <div className="space-y-4 text-slate-800 text-sm leading-relaxed">
          <div className="border-l-4 border-rose-600 pl-3.5 py-0.5 bg-rose-50/50 rounded-r-lg">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800 block mb-0.5">
              Formation du Complexe Antigène-Anticorps
            </span>
            <p>
              L'association réversible et spécifique d'anticorps avec leurs antigènes cibles forme un édifice macromoléculaire en réseau appelé <strong>complexe immun</strong>.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
            <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
              <strong className="text-slate-900 block mb-1">1. Neutralisation</strong>
              <p className="text-slate-600">
                Le masquage des sites actifs empêche les virus d'infecter les cellules cibles et inactive les toxines solubles bactériennes (tétanos, diphtérie).
              </p>
            </div>
            <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
              <strong className="text-slate-900 block mb-1">2. Agglutination / Précipitation</strong>
              <p className="text-slate-600">
                Grâce à la bivalence des anticorps, plusieurs bactéries ou molécules s'agrègent en amas volumineux insolubles, bloquant leur dissémination.
              </p>
            </div>
            <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
              <strong className="text-slate-900 block mb-1">3. Opsonisation & Phagocytose</strong>
              <p className="text-slate-600">
                Les fragments Fc des anticorps fixés sont reconnus par les récepteurs Fc des macrophages, multipliant par 1000 la vitesse de phagocytose.
              </p>
            </div>
          </div>

          <div className="bg-rose-50/60 border border-rose-200 rounded-lg p-3 text-xs text-rose-950">
            <strong>Piège classique du Bac S2 :</strong> Les anticorps NE détruisent PAS directement les microbes ! Ils se contentent de les neutraliser et de les marquer (opsonisation). La destruction finale nécessite l'intervention des macrophages (phagocytose) ou l'activation du système du complément (lyse par le CAM).
          </div>
        </div>
      ),
    },
    {
      id: 4,
      numero: '05',
      titre: 'Réponse Primaire vs Réponse Secondaire',
      theme: 'Cinétique & Principe de la Vaccination',
      accent: {
        badge: 'bg-amber-50 text-amber-800 border-amber-200',
        border: 'border-l-amber-600',
      },
      contenu: (
        <div className="space-y-4 text-slate-800 text-sm leading-relaxed">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-2.5">Paramètre Comparé</th>
                  <th className="p-2.5 text-blue-800">Réponse Primaire (1er contact)</th>
                  <th className="p-2.5 text-rose-800">Réponse Secondaire (2e contact)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr>
                  <td className="p-2 font-semibold">Temps de latence</td>
                  <td className="p-2">Long (6 à 10 jours)</td>
                  <td className="p-2 font-bold text-rose-700">Très court (2 à 3 jours)</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Taux d'anticorps sérique</td>
                  <td className="p-2">Modéré</td>
                  <td className="p-2 font-bold text-rose-700">Très élevé (pic x 100 à x 1000)</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Type d'anticorps prédominant</td>
                  <td className="p-2">IgM d'abord, puis IgG</td>
                  <td className="p-2 font-bold text-rose-700">IgG immédiats à forte affinité</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Durée de protection</td>
                  <td className="p-2">Brève (quelques semaines)</td>
                  <td className="p-2 font-bold text-rose-700">Durable (plusieurs mois à années)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-amber-50/60 border border-amber-200 rounded-lg p-3 text-xs text-amber-950">
            <strong>Fondement de la vaccination :</strong> L'injection d'un antigène atténué ou inactivé déclenche la réponse primaire sans provoquer la maladie et génère un pool de lymphocytes B mémoires. Lors d'une infection ultérieure réelle, la réponse secondaire foudroyante élimine le pathogène avant l'apparition des symptômes.
          </div>
        </div>
      ),
    },
    {
      id: 5,
      numero: '06',
      titre: 'Expériences Historiques : Sérums, Transferts & Ouchterlony',
      theme: 'Méthodologie d\'Épreuve Bac S2',
      accent: {
        badge: 'bg-purple-50 text-purple-800 border-purple-200',
        border: 'border-l-purple-600',
      },
      contenu: (
        <div className="space-y-3 text-slate-800 text-sm leading-relaxed">
          <div className="border border-slate-200 rounded-lg p-3 bg-white space-y-1 text-xs">
            <span className="font-bold text-slate-900 block">Expérience de transfert de sérum (Sérothérapie de Behring & Kitasato)</span>
            <p className="text-slate-600">
              Un animal vacciné contre l'anatoxine tétanique survit à l'injection de toxine tétanique létale. Le transfert de son sérum (acellulaire) à un animal naïf lui confère une immunité passive immédiate : cela prouve que les agents protecteurs sont des molécules solubles circulant dans le sérum (immunité humorale).
            </p>
          </div>

          <div className="border border-slate-200 rounded-lg p-3 bg-white space-y-1 text-xs">
            <span className="font-bold text-slate-900 block">Test d'immunodiffusion sur gel d'Ouchterlony</span>
            <p className="text-slate-600">
              Antigènes et anticorps diffusent dans une boîte d'agarose l'un vers l'autre. À la zone d'équivalence stœchiométrique, la formation de complexes immuns insolubles forme un <strong>arc de précipitation opaque visible</strong>. Si l'arc est continu entre deux puits, les antigènes partagent des épitopes identiques (identité antigénique totale).
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 space-y-4 shadow-xs">
      <div className="border-b border-slate-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-700 block">
            Programme SVT Terminale S2 • Chapitre B3
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">
            Immunité Adaptative Humorale & Anticorps
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            6 fiches de synthèse : Structure des Ig, sélection clonale des LB, complexes immuns et mémoire immunitaire.
          </p>
        </div>
      </div>

      <div className="divide-y divide-slate-200 border border-slate-200 rounded-lg overflow-hidden">
        {fiches.map((fiche) => {
          const isOpen = openIndex === fiche.id;
          return (
            <div key={fiche.id} className="bg-white">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : fiche.id)}
                className={`w-full flex items-center justify-between p-3.5 sm:p-4 text-left transition-colors hover:bg-slate-50 ${
                  isOpen ? 'bg-slate-50/60 border-l-4 ' + fiche.accent.border : ''
                }`}
              >
                <div className="flex items-center gap-3 pr-2">
                  <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded shrink-0">
                    {fiche.numero}
                  </span>
                  <div>
                    <span className="text-sm font-bold text-slate-900 block">
                      {fiche.titre}
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      {fiche.theme}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`hidden sm:inline-block text-[11px] font-semibold px-2 py-0.5 rounded border ${fiche.accent.badge}`}>
                    {fiche.theme}
                  </span>
                  <div className="text-slate-400">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </button>

              {isOpen && (
                <div className="p-4 pt-2 border-t border-slate-100 bg-white">
                  {fiche.contenu}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

