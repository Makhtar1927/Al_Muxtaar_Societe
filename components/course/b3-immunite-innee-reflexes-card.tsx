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

export default function B3ImmuniteInneeReflexesCard() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const fiches: FicheData[] = [
    {
      id: 0,
      numero: '01',
      titre: 'La Notion de Soi et de Non-Soi Biologique',
      theme: 'Immunogénétique Fondamentale',
      accent: {
        badge: 'bg-blue-50 text-blue-800 border-blue-200',
        border: 'border-l-blue-600',
      },
      contenu: (
        <div className="space-y-4 text-slate-800 text-sm leading-relaxed">
          <div className="border-l-4 border-blue-600 pl-3.5 py-0.5 bg-blue-50/50 rounded-r-lg">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900 block mb-0.5">
              Définitions Fondamentales du Bac S2
            </span>
            <p>
              Le <strong>Soi</strong> est l'ensemble des molécules résultant de l'expression du génome de l'individu et reconnues par son système immunitaire sans déclencher de réaction destructrice (tolérance immunologique).
            </p>
            <p className="mt-1">
              Le <strong>Non-Soi</strong> désigne toute molécule ou particule étrangère à l'organisme (bactéries, virus, toxines, cellules allogéniques d'une greffe) susceptible d'être reconnue comme antigène et de provoquer une réponse immunitaire.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
              <strong className="text-slate-900 block mb-1">Non-Soi Exogène</strong>
              <p className="text-slate-600">
                Éléments étrangers provenant de l'extérieur : micro-organismes pathogènes, pollens, greffons allogéniques, parasites.
              </p>
            </div>
            <div className="border border-slate-200 rounded-lg p-3 bg-slate-50">
              <strong className="text-slate-900 block mb-1">Soi Modifié (Non-Soi Endogène)</strong>
              <p className="text-slate-600">
                Cellules du soi ayant subi une altération : cellules cancéreuses ou cellules infectées par un virus présentant des peptides anormaux.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 1,
      numero: '02',
      titre: 'Le Complexe Majeur d\'Histocompatibilité (CMH / HLA)',
      theme: 'Marqueurs Moléculaires du Soi',
      accent: {
        badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        border: 'border-l-emerald-600',
      },
      contenu: (
        <div className="space-y-4 text-slate-800 text-sm leading-relaxed">
          <p>
            Les molécules du <strong>CMH (Complexe Majeur d'Histocompatibilité)</strong>, appelées <strong>HLA (Human Leukocyte Antigen)</strong> chez l'Homme, sont des glycoprotéines membranaires codées par un groupe de gènes situés sur le chromosome 6. Elles constituent la véritable carte d'identité biologique de l'individu.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="border border-emerald-200 rounded-lg p-3 bg-emerald-50/40">
              <span className="font-bold text-emerald-950 block mb-1">CMH de Classe I</span>
              <ul className="space-y-1 text-slate-700">
                <li>• <strong>Localisation :</strong> Présent sur <em>toutes les cellules nucléées</em> de l'organisme et sur les plaquettes.</li>
                <li>• <strong>Structure :</strong> Chaîne lourde polymorphe α associée à la β2-microglobuline.</li>
                <li>• <strong>Rôle :</strong> Présentation des peptides endogènes aux <strong>Lymphocytes T CD8+ (cytotoxiques)</strong>.</li>
              </ul>
            </div>

            <div className="border border-sky-200 rounded-lg p-3 bg-sky-50/40">
              <span className="font-bold text-sky-950 block mb-1">CMH de Classe II</span>
              <ul className="space-y-1 text-slate-700">
                <li>• <strong>Localisation :</strong> Réservé aux <em>Cellules Présentatrices d'Antigène (CPA)</em> professionnelles : macrophages, cellules dendritiques, lymphocytes B.</li>
                <li>• <strong>Structure :</strong> Deux chaînes polymorphes α et β formant un sillon ouvert.</li>
                <li>• <strong>Rôle :</strong> Présentation des peptides exogènes aux <strong>Lymphocytes T4 CD4+ (auxiliaires)</strong>.</li>
              </ul>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs text-slate-700">
            <strong>Polymorphisme et polygénie :</strong> Il existe des centaines d'allèles différents pour chaque locus HLA (A, B, C, DP, DQ, DR). La probabilité que deux individus non apparentés possèdent les mêmes marqueurs HLA est quasiment nulle (1 sur plusieurs millions), d'où les rejets fréquents de greffe.
          </div>
        </div>
      ),
    },
    {
      id: 2,
      numero: '03',
      titre: 'Marqueurs Érythrocytaires : Système ABO & Rhésus',
      theme: 'Transfusion Sanguine Bac S2',
      accent: {
        badge: 'bg-rose-50 text-rose-800 border-rose-200',
        border: 'border-l-rose-600',
      },
      contenu: (
        <div className="space-y-4 text-slate-800 text-sm leading-relaxed">
          <p>
            Les hématies étant anucléées, elles ne portent pas de CMH mais expriment des glycolipides membranaires spécifiques : les agglutinogènes (antigènes A et B) et l'antigène D (Rhésus).
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-2.5">Groupe Sanguin</th>
                  <th className="p-2.5">Antigènes membranaires (Hématie)</th>
                  <th className="p-2.5">Anticorps naturels plasmatiques (Agglutinines)</th>
                  <th className="p-2.5">Règle transfusionnelle</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr>
                  <td className="p-2 font-bold text-rose-800">Groupe A</td>
                  <td className="p-2">Antigène A</td>
                  <td className="p-2">Anti-B</td>
                  <td className="p-2">Peut donner à A et AB</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-blue-800">Groupe B</td>
                  <td className="p-2">Antigène B</td>
                  <td className="p-2">Anti-A</td>
                  <td className="p-2">Peut donner à B et AB</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-purple-800">Groupe AB</td>
                  <td className="p-2">Antigènes A et B</td>
                  <td className="p-2 font-medium text-slate-500">Aucun anticorps</td>
                  <td className="p-2 font-semibold text-purple-900">Receveur Universel</td>
                </tr>
                <tr>
                  <td className="p-2 font-bold text-emerald-800">Groupe O</td>
                  <td className="p-2 font-medium text-slate-500">Aucun antigène (substance H seule)</td>
                  <td className="p-2 font-bold text-rose-700">Anti-A et Anti-B</td>
                  <td className="p-2 font-semibold text-emerald-900">Donneur Universel</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="border border-rose-200 rounded-lg p-3 bg-rose-50/40 text-xs text-rose-950">
            <strong>Règle d'or transfusionnelle du Bac S2 :</strong> On ne doit JAMAIS apporter un antigène érythrocytaire chez un receveur qui possède déjà l'anticorps correspondant dans son plasma, sous peine d'agglutination immédiate et d'hémolyse mortelle.
          </div>
        </div>
      ),
    },
    {
      id: 3,
      numero: '04',
      titre: 'La Réaction Inflammatoire Aiguë (RIA)',
      theme: 'Immunité Innée Immédiate',
      accent: {
        badge: 'bg-amber-50 text-amber-800 border-amber-200',
        border: 'border-l-amber-600',
      },
      contenu: (
        <div className="space-y-4 text-slate-800 text-sm leading-relaxed">
          <p>
            La <strong>réaction inflammatoire aiguë</strong> est une réponse stéréotypée, non spécifique et rapide du tissu conjonctif vascularisé face à une agression tissulaire (lésion mécanique, brûlure, infection microbienne).
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
            <div className="p-2.5 rounded-lg border border-red-200 bg-red-50/40 text-center">
              <span className="font-bold text-red-900 block">Rougeur (Rubor)</span>
              <span className="text-slate-600 text-[11px] mt-0.5 block">Vasodilatation artériolaire locale</span>
            </div>
            <div className="p-2.5 rounded-lg border border-amber-200 bg-amber-50/40 text-center">
              <span className="font-bold text-amber-900 block">Chaleur (Calor)</span>
              <span className="text-slate-600 text-[11px] mt-0.5 block">Afflux de sang chaud thermique</span>
            </div>
            <div className="p-2.5 rounded-lg border border-blue-200 bg-blue-50/40 text-center">
              <span className="font-bold text-blue-900 block">Gonflement (Tumor)</span>
              <span className="text-slate-600 text-[11px] mt-0.5 block">Œdème par exsudation plasmatique</span>
            </div>
            <div className="p-2.5 rounded-lg border border-purple-200 bg-purple-50/40 text-center">
              <span className="font-bold text-purple-900 block">Douleur (Dolor)</span>
              <span className="text-slate-600 text-[11px] mt-0.5 block">Stimulation des nocicepteurs (bradykinine)</span>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg p-3 bg-white space-y-1.5 text-xs text-slate-700">
            <span className="font-bold text-slate-900 block uppercase tracking-wide">Médiateurs Chimiques de l'Inflammation</span>
            <p>• <strong>Histamine :</strong> Sécrétée par les mastocytes et polynucléaires basophiles (vasodilatation et hausse de perméabilité vasculaire).</p>
            <p>• <strong>Prostaglandines :</strong> Dérivées de l'acide arachidonique, responsables de la douleur et de la fièvre (bloquées par l'aspirine).</p>
            <p>• <strong>Cytokines (TNF-α, IL-1) :</strong> Chimiotactisme attirant les leucocytes sur le foyer infectieux.</p>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      numero: '05',
      titre: 'La Diapédèse & Les 4 Étapes de la Phagocytose',
      theme: 'Élimination Mécanique du Pathogène',
      accent: {
        badge: 'bg-indigo-50 text-indigo-800 border-indigo-200',
        border: 'border-l-indigo-600',
      },
      contenu: (
        <div className="space-y-4 text-slate-800 text-sm leading-relaxed">
          <div className="border-l-2 border-indigo-600 pl-3 py-1">
            <span className="font-bold text-slate-900 text-xs block">
              La Diapédèse Leucocytaire
            </span>
            <p className="text-xs text-slate-600 mt-0.5">
              C'est le passage actif des globules blancs (polynucléaires neutrophiles et monocytes) à travers la paroi des capillaires sanguins par déformation cytoplasmique (pseudopodes) entre deux cellules endothéliales disjointes.
            </p>
          </div>

          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block pt-1">
            Les 4 phases chronologiques de la phagocytose :
          </span>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-start gap-2.5">
              <span className="font-mono font-bold text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded">1</span>
              <div>
                <strong className="text-slate-900">Adhésion / Fixation :</strong>
                <span className="text-slate-600 block">Reconnaissance de l'antigène par les récepteurs membranaires du phagocyte (récepteurs PRR reconnaissant les PAMP, ou récepteurs du complément/opsonines).</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-start gap-2.5">
              <span className="font-mono font-bold text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded">2</span>
              <div>
                <strong className="text-slate-900">Ingestion / Englobement :</strong>
                <span className="text-slate-600 block">Émission de pseudopodes qui entourent la particule étrangère pour l'enfermer dans une vésicule d'endocytose appelée <strong>phagosome</strong>.</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-start gap-2.5">
              <span className="font-mono font-bold text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded">3</span>
              <div>
                <strong className="text-slate-900">Digestion enzymatique :</strong>
                <span className="text-slate-600 block">Fusion des lysosomes cellulaires avec le phagosome pour former un <strong>phagolysosome</strong>. Les hydrolases acides et radicaux libres détruisent la bactérie.</span>
              </div>
            </div>

            <div className="p-2.5 rounded-lg border border-slate-200 bg-slate-50 flex items-start gap-2.5">
              <span className="font-mono font-bold text-indigo-700 bg-indigo-100 px-1.5 py-0.5 rounded">4</span>
              <div>
                <strong className="text-slate-900">Rejet des déchets & Présentation de l'antigène :</strong>
                <span className="text-slate-600 block">Exocytose des débris non digérés. Pour le macrophage (CPA), des fragments peptidiques sont conservés et fixés sur le CMH II pour être présentés aux LT4 : transition vers l'immunité adaptative !</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 5,
      numero: '06',
      titre: 'Synthèse & Devenir de l\'Infection (Bac S2)',
      theme: 'Évolution de la Réponse Immunitaire',
      accent: {
        badge: 'bg-purple-50 text-purple-800 border-purple-200',
        border: 'border-l-purple-600',
      },
      contenu: (
        <div className="space-y-4 text-slate-800 text-sm leading-relaxed">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="border border-emerald-200 rounded-lg p-3 bg-emerald-50/40">
              <strong className="text-emerald-950 block mb-1">Issue Favorable (Guérison Locale)</strong>
              <p className="text-slate-700">
                La phagocytose neutralise tous les agents pathogènes. Les macrophages éliminent les cellules mortes et les polynucléaires nécrosés (pus). Cicatrisation tissulaire.
              </p>
            </div>
            <div className="border border-rose-200 rounded-lg p-3 bg-rose-50/40">
              <strong className="text-rose-950 block mb-1">Infection Persistante ou Virulente</strong>
              <p className="text-slate-700">
                L'immunité innée est débordée (bactéries encapsulées, toxines massives). La CPA migre par les vaisseaux lymphatiques vers les ganglions pour déclencher l'immunité adaptative spécifique (LB et LT).
              </p>
            </div>
          </div>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-xs text-purple-950">
            <strong>Comparaison Clé Bac :</strong> L'immunité innée est <em>immédiate</em>, <em>sans mémoire</em> et <em>non spécifique</em> (commune à tous les antigènes). L'immunité adaptative est <em>retardée</em>, <em>spécifique</em> et <em>douée de mémoire</em>.
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
            Soi, Non-Soi (CMH/HLA) & Immunité Innée
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            6 fiches de synthèse : CMH I et II, groupes sanguins, réaction inflammatoire et étapes de la phagocytose.
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
