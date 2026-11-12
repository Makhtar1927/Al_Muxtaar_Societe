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
    bar: string;
  };
  contenu: React.ReactNode;
}

export default function B2RegulationPaReflexesCard() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const fiches: FicheData[] = [
    {
      id: 0,
      numero: '01',
      titre: 'La Pression Artérielle & Composantes Hémodynamiques',
      theme: 'Biophysique Cardiovasculaire',
      accent: {
        badge: 'bg-rose-50 text-rose-700 border-rose-200',
        border: 'border-l-rose-600',
        bar: 'bg-rose-600',
      },
      contenu: (
        <div className="space-y-4 text-slate-800 text-sm leading-relaxed">
          <div className="border-l-4 border-rose-600 pl-3.5 py-0.5 bg-rose-50/50 rounded-r-lg">
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800 block mb-0.5">
              Définition Physiologique
            </span>
            <p className="text-slate-800">
              La <strong>pression artérielle (PA)</strong> est la force hydrostatique exercée par la colonne de sang sur l'unité de surface de la paroi des grosses artères de la circulation générale.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wide text-slate-700">
                Équation fondamentale de l'hémodynamique
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold">
                Bac S2 Clé
              </span>
            </div>

            <div className="font-mono text-lg font-bold text-slate-900 bg-white border border-slate-200 rounded-lg p-2.5 text-center shadow-xs">
              <span className="text-rose-700">PA</span> = <span className="text-blue-700">DC</span> × <span className="text-purple-700">RPT</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700 pt-1">
              <div className="p-2.5 rounded-lg bg-blue-50/60 border border-blue-200/60">
                <strong className="text-blue-900 block mb-1">DC : Débit Cardiaque (L/min)</strong>
                <span className="font-mono text-blue-800 font-semibold block mb-1">DC = FC × VES</span>
                <span className="text-slate-600 leading-normal block">
                  Produit de la fréquence (FC ≈ 75 bpm) par le volume d'éjection systolique (VES ≈ 70 mL). Débit de repos normal ≈ 5,0 à 5,5 L/min.
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-purple-50/60 border border-purple-200/60">
                <strong className="text-purple-900 block mb-1">RPT : Résistances Périphériques</strong>
                <span className="font-mono text-purple-800 font-semibold block mb-1">Loi de Poiseuille : RPT ∝ 1 / r⁴</span>
                <span className="text-slate-600 leading-normal block">
                  Résistance vasculaire opposée par le lit des artérioles. Une légère vasoconstriction (baisse de rayon) augmente fortement les RPT.
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="border border-rose-200 rounded-lg p-3 bg-rose-50/30">
              <span className="text-rose-700 font-bold uppercase tracking-wider text-[11px] block mb-1">
                Pression Systolique (PAS)
              </span>
              <span className="text-xl font-bold font-mono text-slate-900 block">120 mmHg (12 cmHg)</span>
              <span className="text-slate-600 mt-1 block">
                Pic de pression maximale généré par la contraction des ventricules (systole).
              </span>
            </div>
            <div className="border border-blue-200 rounded-lg p-3 bg-blue-50/30">
              <span className="text-blue-700 font-bold uppercase tracking-wider text-[11px] block mb-1">
                Pression Diastolique (PAD)
              </span>
              <span className="text-xl font-bold font-mono text-slate-900 block">80 mmHg (8 cmHg)</span>
              <span className="text-slate-600 mt-1 block">
                Pression résiduelle permanente pendant le relâchement ventriculaire (diastole).
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 1,
      numero: '02',
      titre: 'Barorécepteurs Artériels : Localisation & Transduction',
      theme: 'Mécanorécepteurs',
      accent: {
        badge: 'bg-cyan-50 text-cyan-800 border-cyan-200',
        border: 'border-l-cyan-600',
        bar: 'bg-cyan-600',
      },
      contenu: (
        <div className="space-y-4 text-slate-800 text-sm leading-relaxed">
          <p>
            Les <strong>barorécepteurs</strong> sont des terminaisons nerveuses libres insérées dans l'adventice de la paroi artérielle, agissant comme des <strong>mécanorécepteurs sensibles à l'étirement</strong>.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="border border-cyan-200 rounded-lg p-3 bg-cyan-50/40">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-cyan-900 text-xs">Sinus Carotidiens</span>
                <span className="text-[10px] font-semibold bg-cyan-100 text-cyan-800 px-1.5 py-0.5 rounded">
                  Cerveau
                </span>
              </div>
              <p className="text-xs text-slate-700">
                Bifurcation des carotides primitives. Ils mesurent la pression d'irrigation céphalique.
              </p>
              <div className="mt-2 pt-2 border-t border-cyan-200/60 text-xs">
                <strong className="text-cyan-950">Voie afférente :</strong> Nerf de Hering (IX).
              </div>
            </div>

            <div className="border border-sky-200 rounded-lg p-3 bg-sky-50/40">
              <div className="flex items-center justify-between mb-1">
                <span className="font-bold text-sky-900 text-xs">Crosse Aortique</span>
                <span className="text-[10px] font-semibold bg-sky-100 text-sky-800 px-1.5 py-0.5 rounded">
                  Systémique
                </span>
              </div>
              <p className="text-xs text-slate-700">
                Courbure aortique sus-cardiaque. Ils mesurent la pression générale d'éjection systémique.
              </p>
              <div className="mt-2 pt-2 border-t border-sky-200/60 text-xs">
                <strong className="text-sky-950">Voie afférente :</strong> Nerf de Cyon-Ludwig (X).
              </div>
            </div>
          </div>

          <div className="border border-slate-200 rounded-lg p-3 bg-slate-50 space-y-1.5 text-xs text-slate-700">
            <span className="font-bold text-slate-900 block uppercase tracking-wide">
              Mécanisme de Transduction & Codage
            </span>
            <div className="space-y-1">
              <p>• <strong>Étirement pariétal :</strong> Toute hausse de pression étire la membrane des récepteurs.</p>
              <p>• <strong>Potentiel de récepteur :</strong> Dépolarisation locale proportionnelle à l'étirement.</p>
              <p>• <strong>Codage en fréquence :</strong> Émission de potentiels d'action dont la fréquence croît avec la pression mesurée.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      numero: '03',
      titre: 'Centres Intégrateurs Bulbaires : CCM & CVM',
      theme: 'Intégration Neuro-Végétative',
      accent: {
        badge: 'bg-indigo-50 text-indigo-700 border-indigo-200',
        border: 'border-l-indigo-600',
        bar: 'bg-indigo-600',
      },
      contenu: (
        <div className="space-y-4 text-slate-800 text-sm leading-relaxed">
          <p>
            Le <strong>bulbe rachidien</strong> est le centre intégrateur de la boucle réflexe : il analyse les signaux afférents et module les efférences motrices antagonistes.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="border border-emerald-200 rounded-lg p-3 bg-emerald-50/40 space-y-1">
              <span className="font-bold text-emerald-900 text-xs block">
                Centre Cardiomodérateur (CCM)
              </span>
              <span className="text-[11px] font-semibold text-emerald-700 block">
                Parasympathique (Noyau moteur dorsal du X)
              </span>
              <p className="text-xs text-slate-700 pt-1">
                Stimulé par les afférences de Hering et Cyon. Il envoie ses influx moteurs par le <strong>nerf vague (X)</strong> : libération d'acétylcholine sur récepteurs muscariniques → bradycardie.
              </p>
            </div>

            <div className="border border-rose-200 rounded-lg p-3 bg-rose-50/40 space-y-1">
              <span className="font-bold text-rose-900 text-xs block">
                Centre Vasomoteur (CVM)
              </span>
              <span className="text-[11px] font-semibold text-rose-700 block">
                Orthosympathique (Réticulée bulbaire)
              </span>
              <p className="text-xs text-slate-700 pt-1">
                Centre tonique activateur. Il envoie en permanence un tonus vasoconstricteur aux artérioles par la moelle thoracique et le sympathique (noradrénaline).
              </p>
            </div>
          </div>

          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3 text-xs text-indigo-950 font-medium">
            <strong>Règle d'intégration réciproque :</strong> Les influx afférents de Hering stimulent le centre cardiomodérateur (X) tout en inhibant simultanément le centre vasomoteur sympathique.
          </div>
        </div>
      ),
    },
    {
      id: 3,
      numero: '04',
      titre: 'Boucle Réflexe Complète : Arc Réflexe Homéostasique',
      theme: 'Rétroaction Négative',
      accent: {
        badge: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        border: 'border-l-emerald-600',
        bar: 'bg-emerald-600',
      },
      contenu: (
        <div className="space-y-3 text-slate-800 text-sm leading-relaxed">
          <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
            Chronologie de la boucle correctrice (Exemple : Hypertension aiguë)
          </span>

          <div className="space-y-1.5 text-xs">
            <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-start gap-2.5">
              <span className="font-mono font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded border border-rose-200">1</span>
              <div><strong className="text-slate-900">Perturbation :</strong> Élévation anormale de la pression artérielle (PA ↑).</div>
            </div>
            <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-start gap-2.5">
              <span className="font-mono font-bold text-cyan-600 bg-cyan-50 px-1.5 py-0.5 rounded border border-cyan-200">2</span>
              <div><strong className="text-slate-900">Capteurs :</strong> Distension accrue des barorécepteurs carotidiens et aortiques.</div>
            </div>
            <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-start gap-2.5">
              <span className="font-mono font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-200">3</span>
              <div><strong className="text-slate-900">Voies afférentes :</strong> Fréquence de décharge élevée sur Hering (IX) et Cyon (X).</div>
            </div>
            <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-start gap-2.5">
              <span className="font-mono font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-200">4</span>
              <div><strong className="text-slate-900">Centre bulbaire :</strong> Stimulation du CCM (X) + Inhibition du CVM sympathique.</div>
            </div>
            <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-start gap-2.5">
              <span className="font-mono font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">5</span>
              <div><strong className="text-slate-900">Voies efférentes :</strong> Hausse du tonus vagal (nerf X) et baisse du tonus sympathique.</div>
            </div>
            <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-start gap-2.5">
              <span className="font-mono font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded border border-purple-200">6</span>
              <div><strong className="text-slate-900">Effecteurs :</strong> Bradycardie (FC ↓ → DC ↓) et vasodilatation artériolaire (RPT ↓).</div>
            </div>
            <div className="p-2 rounded bg-emerald-50 border border-emerald-200 flex items-start gap-2.5">
              <span className="font-mono font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">7</span>
              <div><strong className="text-emerald-950">Correction :</strong> PA = DC × RPT diminue jusqu'au retour à 120/80 mmHg.</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      numero: '05',
      titre: 'Analyse Expérimentale : Sections, Stimulations & Ligatures',
      theme: 'Expériences Clés du Bac',
      accent: {
        badge: 'bg-amber-50 text-amber-800 border-amber-200',
        border: 'border-l-amber-600',
        bar: 'bg-amber-600',
      },
      contenu: (
        <div className="space-y-3 text-slate-800 text-sm leading-relaxed">
          <div className="border border-slate-200 rounded-lg p-3 bg-white space-y-1 text-xs">
            <span className="font-bold text-slate-900 block">Section bilatérale des nerfs de Hering et Cyon</span>
            <p className="text-slate-600">
              Résultat : Tachycardie et hypertension artérielle durable (hypertension neurogène).
            </p>
            <span className="text-amber-900 font-semibold block pt-1">
              Conclusion : En permanence, ces nerfs exercent une action modératrice freinatrice sur la PA.
            </span>
          </div>

          <div className="border border-slate-200 rounded-lg p-3 bg-white space-y-1 text-xs">
            <span className="font-bold text-slate-900 block">Stimulation bout central vs bout périphérique</span>
            <p className="text-slate-600">
              Résultat : La stimulation du bout central entraîne une chute de PA et une bradycardie ; le bout périphérique est inactif.
            </p>
            <span className="text-blue-900 font-semibold block pt-1">
              Conclusion : Les nerfs de Hering sont des voies sensitives afférentes centripètes.
            </span>
          </div>

          <div className="border border-slate-200 rounded-lg p-3 bg-white space-y-1 text-xs">
            <span className="font-bold text-slate-900 block">Ligature sous-sinusale (en amont des sinus)</span>
            <p className="text-slate-600">
              Résultat : La pression chute localement dans le sinus → le bulbe interprète une hypotension générale → déclenchement réflexe d'une hypertension générale mesurée à l'aorte.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: 5,
      numero: '06',
      titre: 'Tableau Comparatif & Rédaction Copie Bac S2',
      theme: 'Régulation & Barème',
      accent: {
        badge: 'bg-purple-50 text-purple-800 border-purple-200',
        border: 'border-l-purple-600',
        bar: 'bg-purple-600',
      },
      contenu: (
        <div className="space-y-3 text-slate-800 text-sm leading-relaxed">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                  <th className="p-2.5">Paramètre</th>
                  <th className="p-2.5 text-rose-700">En cas d'Hypertension</th>
                  <th className="p-2.5 text-blue-700">En cas d'Hypotension</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                <tr>
                  <td className="p-2 font-semibold">Barorécepteurs</td>
                  <td className="p-2 text-rose-800 font-medium">Décharge accrue (↑)</td>
                  <td className="p-2 text-blue-800 font-medium">Décharge réduite (↓)</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Efférence Vague (X)</td>
                  <td className="p-2 text-emerald-800 font-medium">Activée (Acétylcholine)</td>
                  <td className="p-2 text-slate-500">Inhibée</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Efférence Sympathique</td>
                  <td className="p-2 text-slate-500">Inhibée</td>
                  <td className="p-2 text-rose-800 font-medium">Activée (Noradrénaline)</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Réponse Vasculaire</td>
                  <td className="p-2">Vasodilatation (RPT ↓)</td>
                  <td className="p-2">Vasoconstriction (RPT ↑)</td>
                </tr>
                <tr>
                  <td className="p-2 font-semibold">Effet final sur la PA</td>
                  <td className="p-2 font-bold text-emerald-700">Baisse (Retour 120/80)</td>
                  <td className="p-2 font-bold text-emerald-700">Hausse (Retour 120/80)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-purple-50/60 border border-purple-200 rounded-lg p-3 text-xs text-purple-950">
            <strong>Notion fondamentale Bac :</strong> Ce mécanisme constitue une boucle de rétroaction négative (ou feedback négatif) où la réponse physiologique s'oppose à la variation initiale de tension.
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
            Programme SVT Terminale S2
          </span>
          <h2 className="text-xl font-bold text-slate-900 mt-0.5">
            Régulation Réflexe de la Pression Artérielle
          </h2>
          <p className="text-xs text-slate-600 mt-0.5">
            Fiches de synthèse : Barorécepteurs, centres bulbaires, effecteurs et boucle réflexe.
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
