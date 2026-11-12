'use client';

import { useState } from 'react';
import MathRenderer from '@/components/course/math-renderer';

interface RegulationFiche {
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

const REGULATION_FICHES: RegulationFiche[] = [
  {
    id: 'dualisme-nerveux',
    code: 'RÉF 01',
    shortTag: 'Dualisme',
    shortTitle: 'Parasympathique vs Orthosympathique',
    fullTitle: 'Dualisme Végétatif : Les Deux Systèmes Régulateurs Antagonistes',
    domain: 'Neurophysiologie Cardiaque',
    color: 'sky',
    bacPoints: '3 pts',
    content: (
      <div className="space-y-4">
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 sm:p-5">
          <p className="text-xs font-black text-sky-800 uppercase tracking-wider mb-1.5">LOI PHYSIOLOGIQUE FONDAMENTALE</p>
          <p className="text-sm text-slate-800 leading-relaxed font-medium">
            L&apos;activité cardiaque est sous le contrôle permanent d&apos;une double innervation autonome
            antagoniste : le <span className="text-sky-700 font-bold">système parasympathique</span> (frein cardiomodérateur)
            et le <span className="text-rose-700 font-bold">système orthosympathique</span> (accélérateur cardiaque).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {/* Parasympathique */}
          <div className="bg-slate-50 border-2 border-sky-200 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <p className="text-sm font-black text-sky-800">Système Parasympathique (Frein)</p>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-300">
                  Nerf Vague (X)
                </span>
              </div>
              <ul className="text-xs text-slate-700 space-y-1.5 leading-relaxed">
                <li><strong className="text-slate-900">Centre d&apos;origine :</strong> Bulbe rachidien (noyau moteur dorsal du X).</li>
                <li><strong className="text-slate-900">Médiateur chimique :</strong> <span className="font-bold text-sky-700">Acétylcholine (ACh)</span>.</li>
                <li><strong className="text-slate-900">Récepteurs cibles :</strong> Muscariniques membranaires ($M_2$).</li>
                <li><strong className="text-slate-900">Effet sur le cœur :</strong> Cardiomodérateur permanent (Bradycardie, baisse de conduction).</li>
                <li><strong className="text-slate-900">Arrêt extrême :</strong> Arrêt cardiaque toujours en <strong className="text-sky-800">diastole</strong> (relâchement).</li>
              </ul>
            </div>
            <div className="mt-3 pt-2 border-t border-sky-100 bg-white rounded-lg p-2 text-center">
              <p className="text-[11px] font-bold text-sky-800">Au repos : Tonus vagal permanent</p>
              <p className="text-[10px] text-slate-500">Maintient le cœur à ~70 bpm au lieu de 100 bpm spontanés</p>
            </div>
          </div>

          {/* Orthosympathique */}
          <div className="bg-slate-50 border-2 border-rose-200 rounded-xl p-4 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-1 mb-2">
                <p className="text-sm font-black text-rose-800">Système Orthosympathique (Accélérateur)</p>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-300">
                  Nerfs Sympathiques
                </span>
              </div>
              <ul className="text-xs text-slate-700 space-y-1.5 leading-relaxed">
                <li><strong className="text-slate-900">Centre d&apos;origine :</strong> Moelle épinière thoracique (métamères $D_1 - D_5$).</li>
                <li><strong className="text-slate-900">Relais :</strong> Chaîne ganglionnaire (ganglion stellaire).</li>
                <li><strong className="text-slate-900">Médiateur chimique :</strong> <span className="font-bold text-rose-700">Noradrénaline (NA)</span>.</li>
                <li><strong className="text-slate-900">Récepteurs cibles :</strong> $\beta_1$-adrénergiques myocardiques.</li>
                <li><strong className="text-slate-900">Effet sur le cœur :</strong> Cardioaccélérateur (Tachycardie, hausse d&apos;amplitude systolique).</li>
              </ul>
            </div>
            <div className="mt-3 pt-2 border-t border-rose-100 bg-white rounded-lg p-2 text-center">
              <p className="text-[11px] font-bold text-rose-800">En effort ou stress : Activation sympathique</p>
              <p className="text-[10px] text-slate-500">Augmente le débit cardiaque : $DC \uparrow = FC \uparrow \times VES \uparrow$</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'otto-loewi',
    code: 'RÉF 02',
    shortTag: 'Loewi 1921',
    shortTitle: 'Expérience d\'Otto Loewi (1921)',
    fullTitle: 'Démonstration Magistrale de la Neurotransmission Chimique',
    domain: 'Histoire des Sciences & Prix Nobel',
    color: 'emerald',
    bacPoints: '4 pts',
    content: (
      <div className="space-y-4">
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 sm:p-5">
          <p className="text-xs font-black text-emerald-800 uppercase tracking-wider mb-1.5">L&apos;EXPÉRIENCE DU PRIX NOBEL (BAC S2)</p>
          <p className="text-sm text-slate-800 leading-relaxed font-medium">
            En 1921, Otto Loewi démontre pour la première fois que la communication nerveuse entre le nerf et le cœur
            ne s&apos;effectue pas par courant électrique direct, mais par l&apos;intermédiaire d&apos;un <span className="text-emerald-700 font-bold">médiateur chimique hydrosoluble</span>.
          </p>
        </div>

        {/* Étapes du protocole */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm">
            <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">Étape 1</span>
            <p className="text-xs font-bold text-slate-900 mt-2 mb-1">Stimulation du Cœur 1</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Le cœur 1 de grenouille possède son <strong>nerf vague intact</strong>. On stimule électriquement ce nerf : le cœur 1 ralentit puis s&apos;arrête en diastole.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm">
            <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">Étape 2</span>
            <p className="text-xs font-bold text-slate-900 mt-2 mb-1">Transfert du Perfusat</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Le liquide physiologique de Ringer baignant le cœur 1 est transféré par une canule vers un <strong>cœur 2 dénervé</strong> (sans aucun nerf).
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-3.5 shadow-sm">
            <span className="text-xs font-black text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">Étape 3</span>
            <p className="text-xs font-bold text-slate-900 mt-2 mb-1">Observation & Déduction</p>
            <p className="text-xs text-slate-600 leading-relaxed">
              Après un court délai de diffusion, le cœur 2 <strong>ralentit et s&apos;arrête à son tour</strong> ! Une substance soluble (<em>Vagusstoff</em> = acétylcholine) a été libérée.
            </p>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-900 leading-relaxed">
          <strong className="font-bold">Formulation type exigée au Baccalauréat sénégalais :</strong> &laquo; Le cœur 2 n&apos;ayant reçu aucune stimulation électrique directe, son arrêt prouve que la stimulation du nerf vague a provoqué la libération d&apos;une substance chimique soluble dans le liquide de Ringer, capable de reproduire l&apos;effet vagal : c&apos;est la preuve de la transmission chimique synaptique. &raquo;
        </div>
      </div>
    ),
  },
  {
    id: 'sections-stimulations',
    code: 'RÉF 03',
    shortTag: 'Expériences',
    shortTitle: 'Sections & Stimulations des Nerfs',
    fullTitle: 'Protocole Expérimental de Section et Stimulation Électrique',
    domain: 'Méthodologie d\'Analyse',
    color: 'indigo',
    bacPoints: '3 pts',
    content: (
      <div className="space-y-4">
        <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 sm:p-5">
          <p className="text-xs font-black text-indigo-800 uppercase tracking-wider mb-1.5">MÉTHODOLOGIE D&apos;ANALYSE DES TRACÉS DU BAC S2</p>
          <p className="text-sm text-slate-800 leading-relaxed font-medium">
            Pour déterminer la fonction d&apos;un nerf cardiaque, on analyse le tracé cardiographique avant, pendant et après
            les interventions de section et de stimulation des bouts périphériques et centraux.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border border-slate-200 rounded-xl overflow-hidden">
            <thead className="bg-slate-100 text-slate-800 font-bold">
              <tr>
                <th className="p-2.5 text-left border-b border-slate-200">Intervention Expérimentale</th>
                <th className="p-2.5 text-left border-b border-slate-200">Effet sur le tracé</th>
                <th className="p-2.5 text-left border-b border-slate-200">Déduction & Conclusion Bac</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 text-slate-700">
              <tr className="bg-white">
                <td className="p-2.5 font-bold text-slate-900">Section des 2 Nerfs Vagues (X)</td>
                <td className="p-2.5 text-rose-600 font-semibold">Tachycardie immédiate (70 $\to$ 110 bpm)</td>
                <td className="p-2.5">Prouve le <strong>tonus cardiomodérateur vagal permanent</strong> au repos (couper le frein accélère le rythme).</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="p-2.5 font-bold text-slate-900">Stimulation du bout périphérique du Vague</td>
                <td className="p-2.5 text-sky-700 font-semibold">Bradycardie puis arrêt en diastole</td>
                <td className="p-2.5">Le nerf vague est une <strong>voie centrifuge (motrice)</strong> qui conduit l&apos;influx vers le cœur.</td>
              </tr>
              <tr className="bg-white">
                <td className="p-2.5 font-bold text-slate-900">Stimulation du bout central du Vague</td>
                <td className="p-2.5 text-slate-500 font-semibold">Aucun effet sur le cœur isolé</td>
                <td className="p-2.5">Pas d&apos;action motrice centripète directe sur le myocarde.</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="p-2.5 font-bold text-slate-900">Section des Nerfs Sympathiques</td>
                <td className="p-2.5 text-sky-700 font-semibold">Légère diminution de la FC</td>
                <td className="p-2.5">Prouve un faible tonus cardioaccélérateur sympathique de repos.</td>
              </tr>
              <tr className="bg-white">
                <td className="p-2.5 font-bold text-slate-900">Stimulation du bout périphérique du Sympathique</td>
                <td className="p-2.5 text-rose-600 font-semibold">Tachycardie + Hausse d&apos;amplitude systolique</td>
                <td className="p-2.5">Le sympathique est <strong>cardioaccélérateur</strong> et renforce la force contractile du myocarde.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    ),
  },
  {
    id: 'pharmacologie',
    code: 'RÉF 04',
    shortTag: 'Pharmacologie',
    shortTitle: 'Drogues & Pharmacologie Cardiaque',
    fullTitle: 'Action Moléculaire des Neurotransmetteurs et Médicaments',
    domain: 'Pharmacodynamie Bac S2',
    color: 'purple',
    bacPoints: '3 pts',
    content: (
      <div className="space-y-4">
        <div className="bg-purple-50 border border-purple-200 rounded-2xl p-4 sm:p-5">
          <p className="text-xs font-black text-purple-800 uppercase tracking-wider mb-1.5">CIBLES MOLÉCULAIRES & PHARMACOLOGIE</p>
          <p className="text-sm text-slate-800 leading-relaxed font-medium">
            L&apos;utilisation d&apos;agonistes et d&apos;antagonistes spécifiques permet d&apos;identifier la nature des récepteurs membranaires
            du tissu nodal et des cardiomyocytes ventriculaires.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-white border border-purple-200 rounded-xl p-3.5 shadow-sm">
            <div className="flex items-center justify-between gap-1 mb-1.5">
              <p className="text-xs font-black text-purple-900">Atropine</p>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 text-purple-800 border border-purple-200">
                Antagoniste Muscarinique
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-1">
              Bloque les récepteurs à l&apos;acétylcholine sur le cœur.
            </p>
            <p className="text-xs font-semibold text-rose-700">
              Effet : Tachycardie (lève le frein vagal) et empêche l&apos;action de la stimulation vagale.
            </p>
          </div>

          <div className="bg-white border border-rose-200 rounded-xl p-3.5 shadow-sm">
            <div className="flex items-center justify-between gap-1 mb-1.5">
              <p className="text-xs font-black text-rose-900">Propranolol (Bêtabloquant)</p>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 border border-rose-200">
                Antagoniste $\beta_1$
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-1">
              Bloque les récepteurs adrénergiques $\beta_1$.
            </p>
            <p className="text-xs font-semibold text-sky-700">
              Effet : Baisse de la FC de repos et empêche toute tachycardie à l&apos;effort ou au stress.
            </p>
          </div>

          <div className="bg-white border border-sky-200 rounded-xl p-3.5 shadow-sm">
            <div className="flex items-center justify-between gap-1 mb-1.5">
              <p className="text-xs font-black text-sky-900">Acétylcholine (10⁻⁶ M)</p>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 border border-sky-200">
                Agoniste Muscarinique
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-1">
              Mime fidèlement la stimulation du nerf vague (parasympathicomimétique).
            </p>
            <p className="text-xs font-semibold text-sky-800">
              Effet : Bradycardie immédiate puis arrêt en diastole.
            </p>
          </div>

          <div className="bg-white border border-amber-200 rounded-xl p-3.5 shadow-sm">
            <div className="flex items-center justify-between gap-1 mb-1.5">
              <p className="text-xs font-black text-amber-900">Curare</p>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                Bloquant Nicotinique
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed mb-1">
              Bloque les récepteurs nicotiniques des muscles squelettiques.
            </p>
            <p className="text-xs font-semibold text-amber-800">
              Effet : AUCUN EFFET sur le myocarde (prouve que les récepteurs cardiaques sont muscariniques).
            </p>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'quatre-effets',
    code: 'RÉF 05',
    shortTag: '4 Propriétés',
    shortTitle: 'Les 4 Propriétés Myocardiques',
    fullTitle: 'Tableau Cardinal des Effets sur le Muscle Cardiaque',
    domain: 'Propriétés du Myocarde',
    color: 'amber',
    bacPoints: '2 pts',
    content: (
      <div className="space-y-4">
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 sm:p-5">
          <p className="text-xs font-black text-amber-800 uppercase tracking-wider mb-1.5">TERMINOLOGIE PHYSIOLOGIQUE OFFICIELLE</p>
          <p className="text-sm text-slate-800 leading-relaxed font-medium">
            Au Baccalauréat sénégalais, les modulations de l&apos;activité cardiaque doivent obligatoirement être qualifiées
            par leurs 4 termes scientifiques cardinaux.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-white border border-slate-200 rounded-xl p-3 text-center shadow-sm">
            <p className="text-xs font-black text-slate-900 mb-0.5">CHRONOTROPE</p>
            <p className="text-[10px] text-slate-500 mb-2">Fréquence Cardiaque</p>
            <div className="space-y-1 text-[11px]">
              <span className="block font-bold text-sky-700 bg-sky-50 py-1 rounded">X : Négatif (-)</span>
              <span className="block font-bold text-rose-700 bg-rose-50 py-1 rounded">Symp : Positif (+)</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-3 text-center shadow-sm">
            <p className="text-xs font-black text-slate-900 mb-0.5">INOTROPE</p>
            <p className="text-[10px] text-slate-500 mb-2">Force de Contraction</p>
            <div className="space-y-1 text-[11px]">
              <span className="block font-bold text-sky-700 bg-sky-50 py-1 rounded">X : Négatif modéré</span>
              <span className="block font-bold text-rose-700 bg-rose-50 py-1 rounded">Symp : Positif (+)</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-3 text-center shadow-sm">
            <p className="text-xs font-black text-slate-900 mb-0.5">DROMOTROPE</p>
            <p className="text-[10px] text-slate-500 mb-2">Vitesse de Conduction</p>
            <div className="space-y-1 text-[11px]">
              <span className="block font-bold text-sky-700 bg-sky-50 py-1 rounded">X : Négatif (-)</span>
              <span className="block font-bold text-rose-700 bg-rose-50 py-1 rounded">Symp : Positif (+)</span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-3 text-center shadow-sm">
            <p className="text-xs font-black text-slate-900 mb-0.5">BATHMOTROPE</p>
            <p className="text-[10px] text-slate-500 mb-2">Seuil d&apos;Excitabilité</p>
            <div className="space-y-1 text-[11px]">
              <span className="block font-bold text-sky-700 bg-sky-50 py-1 rounded">X : Négatif (-)</span>
              <span className="block font-bold text-rose-700 bg-rose-50 py-1 rounded">Symp : Positif (+)</span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: 'regulation-hormonale',
    code: 'RÉF 06',
    shortTag: 'Hormones',
    shortTitle: 'Régulation Hormonale (Adrénaline & Thyroïde)',
    fullTitle: 'Régulation Humorale par Voie Hématogène',
    domain: 'Endocrinologie Cardiovasculaire',
    color: 'rose',
    bacPoints: '2 pts',
    content: (
      <div className="space-y-4">
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 sm:p-5">
          <p className="text-xs font-black text-rose-800 uppercase tracking-wider mb-1.5">RÉGULATION HORMONALE DU DÉBIT CARDIAQUE</p>
          <p className="text-sm text-slate-800 leading-relaxed font-medium">
            Contrairement à la régulation nerveuse ultra-rapide (en millisecondes), les hormones circulantes agissent
            sur une échelle de temps plus étendue (minutes à heures) pour soutenir l&apos;effort et le métabolisme.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div className="bg-white border border-rose-200 rounded-xl p-4 shadow-sm">
            <p className="text-xs font-black text-rose-900 mb-1">Adrénaline (Médullo-surrénale)</p>
            <p className="text-xs text-slate-600 leading-relaxed mb-2">
              Libérée dans le sang lors d&apos;un stress aigu, d&apos;un froid intense ou d&apos;un effort musculaire sous contrôle sympathique.
            </p>
            <div className="bg-rose-50 rounded-lg p-2.5 text-xs text-rose-900 font-semibold space-y-1">
              <p>&bull; Tachycardie brutale ($FC \uparrow$)</p>
              <p>&bull; Augmentation de la force systolique ($VES \uparrow$)</p>
              <p>&bull; Débit cardiaque doublé ou triplé ($DC \uparrow$)</p>
            </div>
          </div>

          <div className="bg-white border border-amber-200 rounded-xl p-4 shadow-sm">
            <p className="text-xs font-black text-amber-900 mb-1">Hormones Thyroïdiennes ($T_3, T_4$)</p>
            <p className="text-xs text-slate-600 leading-relaxed mb-2">
              Action à long terme : augmentent la synthèse et la sensibilité des récepteurs $\beta_1$-adrénergiques du myocarde.
            </p>
            <div className="bg-amber-50 rounded-lg p-2.5 text-xs text-amber-900 font-semibold space-y-1">
              <p>&bull; Hyperthyroïdie &rarr; Tachycardie permanente (&gt; 100 bpm)</p>
              <p>&bull; Hypothyroïdie &rarr; Bradycardie marquée (&lt; 50 bpm)</p>
              <p>&bull; Potentialise l&apos;effet des catécholamines</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

export default function B2RegulationNerveuseReflexesCard() {
  const [activeFicheId, setActiveFicheId] = useState<string>('dualisme-nerveux');
  const activeFiche = REGULATION_FICHES.find((f) => f.id === activeFicheId) || REGULATION_FICHES[0];

  return (
    <div className="w-full bg-white border border-slate-200 rounded-2xl sm:rounded-3xl shadow-sm overflow-hidden mb-8">
      {/* En-tête de la carte */}
      <div className="px-5 py-6 sm:px-8 sm:py-7 bg-gradient-to-r from-sky-50 via-white to-rose-50 border-b border-slate-200/80">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="text-[11px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-sky-100 text-sky-800 border border-sky-200">
            PROGRAMME OFFICIEL SVT TERMINALE S2
          </span>
          <span className="text-[11px] font-bold text-slate-500">
            Chapitre B2 &bull; Leçon 2
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Les 6 Références Clés : <span className="text-sky-600">Innervation & Régulation Cardiaque</span>
        </h2>
        <p className="text-sm text-slate-600 mt-1.5 max-w-3xl leading-relaxed">
          Dualisme parasympathique vs orthosympathique, expérience d&apos;Otto Loewi, sections & stimulations, pharmacologie et médiation hormonale.
        </p>
      </div>

      {/* Grille de sélection des 6 fiches */}
      <div className="p-4 sm:p-6 bg-slate-50/70 border-b border-slate-200">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-2.5">
          {REGULATION_FICHES.map((fiche) => {
            const isSelected = fiche.id === activeFicheId;
            return (
              <button
                key={fiche.id}
                onClick={() => setActiveFicheId(fiche.id)}
                className={`text-left p-3 rounded-xl border transition-all text-xs flex flex-col justify-between ${
                  isSelected
                    ? 'bg-white border-sky-400 shadow-md ring-2 ring-sky-300/40 text-slate-900'
                    : 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300 text-slate-600'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-extrabold text-sky-700 tracking-wider">
                      {fiche.code}
                    </span>
                    <span className="text-[9px] font-bold text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded">
                      {fiche.bacPoints}
                    </span>
                  </div>
                  <p className="font-bold line-clamp-2 leading-snug">{fiche.shortTitle}</p>
                </div>
                <span className="text-[10px] text-slate-600 mt-2 block font-medium">
                  {fiche.shortTag}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenu détaillé de la fiche active */}
      <div className="p-5 sm:p-8 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
              {activeFiche.code} &bull; {activeFiche.domain}
            </span>
            <h3 className="text-lg sm:text-xl font-black text-slate-900 mt-0.5">
              {activeFiche.fullTitle}
            </h3>
          </div>
          <span className="text-xs font-bold bg-sky-50 text-sky-800 border border-sky-200 px-3 py-1 rounded-full">
            Pondération Bac : {activeFiche.bacPoints}
          </span>
        </div>

        {activeFiche.content}
      </div>

      {/* Bandeau inférieur récapitulatif des formules hémodynamiques */}
      <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200">
        <p className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3 text-center sm:text-left">
          FORMULES MAÎTRESSES DU BACCALAURÉAT S2 SÉNÉGAL
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
            <p className="text-[10px] font-bold text-slate-500 uppercase">Débit Cardiaque</p>
            <div className="my-1 overflow-x-auto max-w-full">
              <MathRenderer content="$$DC = FC \times VES$$" />
            </div>
            <p className="text-[11px] text-slate-600">FC repos : 70 bpm &bull; VES : 70 mL</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
            <p className="text-[10px] font-bold text-slate-500 uppercase">Pression Artérielle</p>
            <div className="my-1 overflow-x-auto max-w-full">
              <MathRenderer content="$$PA = DC \times RPT$$" />
            </div>
            <p className="text-[11px] text-slate-600">RPT = Résistances périphériques</p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-3 shadow-sm">
            <p className="text-[10px] font-bold text-slate-500 uppercase">Effort & Tachycardie</p>
            <div className="my-1 overflow-x-auto max-w-full">
              <MathRenderer content="$$DC_{\text{effort}} \approx 20\text{ à }25\text{ L/min}$$" />
            </div>
            <p className="text-[11px] text-slate-600">Sous l&apos;action du Sympathique & Adrénaline</p>
          </div>
        </div>
      </div>
    </div>
  );
}
