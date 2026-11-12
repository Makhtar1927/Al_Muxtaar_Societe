'use client';

import { useState } from 'react';
import { AlertTriangle, ShieldAlert, Zap, Activity, HelpCircle, CheckCircle2 } from 'lucide-react';

interface ReflexeItem {
  id: string;
  number: string;
  title: string;
  badge: string;
  tag: string;
  principe: string;
  piegeBac: string;
  formuleCle: string;
  pointsCles: string[];
}

const REFLEXES_B3L4: ReflexeItem[] = [
  {
    id: 'allergie_hypersensibilite_immediate',
    number: '01',
    title: 'Hypersensibilité Immédiate (Type I) : Sensibilisation vs Réaction Déclenchée',
    badge: 'Allergie',
    tag: 'IgE & Mastocytes',
    principe:
      "L'allergie de type I est une réaction disproportionnée du système immunitaire contre un allergène inoffensif. Elle se déroule rigoureusement en deux phases obligatoires : la phase de sensibilisation (1er contact : l'allergène est présenté par une CPA aux LT4 qui sécrètent de l'IL-4 orientant les LB vers la production d'IgE spécifiques qui vont se fixer par leur fragment Fc sur les récepteurs FcεR des mastocytes et basophiles, sans symptôme clinique) puis la phase de réaction allergique (contacts ultérieurs : l'allergène ponte au moins deux molécules d'IgE fixées sur le mastocyte, provoquant la dégranulation immédiate d'histamine et de leucotriènes).",
    piegeBac:
      "Ne dites jamais qu'une allergie se déclenche dès le premier contact avec l'allergène. Le premier contact est obligatoirement asymptomatique et silencieux : c'est la sensibilisation où les mastocytes s'arment d'IgE. Les manifestations cliniques (urticaire, choc anaphylactique, asthme) n'apparaissent qu'aux contacts suivants.",
    formuleCle:
      'Contact 1 (Sensibilisation) : Ag ──> LB ──> IgE fixées sur mastocytes (silencieux) | Contact 2 : Pontage IgE ──> Dégranulation d\'Histamine',
    pointsCles: [
      'Allergène : Antigène sans nocivité propre (pollen, acariens, venin, arachide).',
      'Phase 1 Sensibilisation : Induction d\'IgE sous l\'influence de cytokines Th2 (IL-4, IL-13).',
      'Fragment Fc des IgE : Se lie avec une très forte affinité aux récepteurs FcεRI des mastocytes.',
      'Phase 2 Déclenchement : Pontage de 2 IgE par l\'allergène multivalent ──> influx de Ca²⁺ ──> exocytose d\'histamine.'
    ]
  },
  {
    id: 'choc_anaphylactique_histamine',
    number: '02',
    title: 'Médiateurs Chimiques de l\'Allergie & Choc Anaphylactique',
    badge: 'Physiopathologie',
    tag: 'Histamine & Urgence Vitale',
    principe:
      "La libération massive d'histamine par les mastocytes dégranulés engendre trois effets physiopathologiques cardinaux : une vasodilatation artériolaire généralisée intense (responsable d'érythème et d'une chute brutale de la résistance périphérique totale RPT), une augmentation majeure de la perméabilité capillaire (conduisant à une extravasation plasmatique massive, un œdème de Quincke et une hypovolémie sévère), et une bronchoconstriction par contraction des muscles lisses bronchiques (crise d'asthme aiguë). Le choc anaphylactique associe hypotension collapsus et asphyxie aiguë ; son traitement d'urgence absolue est l'injection intramusculaire immédiate d'adrénaline (épinéphrine).",
    piegeBac:
      "Au Baccalauréat, reliez toujours la chute de tension lors d'un choc anaphylactique à la formule de la pression artérielle : PA = DC × RPT. L'histamine fait chuter la RPT (vasodilatation) et diminue le débit cardiaque DC par hypovolémie d'extravasation plasmatique.",
    formuleCle:
      'Histamine ──> [Vasodilatation massive (RPT ↘) + Perméabilité capillaire ↗ (Volémie ↘)] ──> Collapsus cardiovasculaire',
    pointsCles: [
      'Récepteurs H1 de l\'histamine : Médiateurs de la contraction bronchique et de la vasodilatation.',
      'Œdème de Quincke : Gonflement des voies aériennes supérieures pouvant entraîner l\'asphyxie.',
      'Choc anaphylactique : Défaillance circulatoire aiguë par effondrement hémodynamique.',
      'Antidote d\'urgence : Adrénaline (vasoconstricteur puissant et bronchodilatateur antagoniste physiologique).'
    ]
  },
  {
    id: 'maladies_autoimmunes_rupture_tolerance',
    number: '03',
    title: 'Maladies Auto-Immunes : Rupture de la Tolérance au Soi',
    badge: 'Auto-Immunité',
    tag: 'Auto-Anticorps & Rupture',
    principe:
      "Une maladie auto-immune résulte de la rupture de la tolérance naturelle au Soi : le système immunitaire attaque les constituants normaux de son propre organisme. Cette rupture peut découler de l'échappement de clones lymphocytaires autoréactifs aux sélections thymiques ou médullaires (défaut de délétion centrale), d'une déficience des lymphocytes T régulateurs (Treg CD4+CD25+FoxP3+), ou d'un mimétisme moléculaire (un épitope microbien partageant une homologie structurale avec une molécule du Soi, comme dans le Rhumatisme Articulaire Aigu où les anticorps anti-streptocoque s'attaquent au muscle cardiaque).",
    piegeBac:
      "Ne confondez pas allergie et auto-immunité. L'allergie est dirigée contre un antigène étranger (non-soi inoffensif) ; la maladie auto-immune est dirigée contre un antigène du Soi propre à l'individu.",
    formuleCle:
      'Rupture tolérance = Auto-anticorps / LT autoréactifs contre antigènes du Soi ──> Lésions tissulaires chroniques',
    pointsCles: [
      'Tolérance centrale : Élimination par apoptose des clones autoréactifs dans les organes primaires.',
      'Tolérance périphérique : Anergie clonale et suppression active par les lymphocytes T régulateurs (Treg).',
      'Mimétisme moléculaire : Réaction croisée entre pathogène et tissu de l\'hôte.',
      'Exemples Bac S2 : Diabète de type 1 (destruction des cellules β des îlots de Langerhans par les LTC), Myasthénie (auto-anticorps anti-récepteurs nicotiniques de l\'acétylcholine).'
    ]
  },
  {
    id: 'structure_genome_vih',
    number: '04',
    title: 'Structure Moléculaire & Organisation du Rétrovirus VIH',
    badge: 'Virologie',
    tag: 'gp120 / gp41 & Transcriptase Inverse',
    principe:
      "Le virus de l'immunodéficience humaine (VIH-1 et VIH-2) est un rétrovirus sphérique enveloppé d'environ 100 à 120 nm : son enveloppe lipidique dérivée de la cellule hôte porte des spicules formés par la glycoprotéine de surface gp120 associée à la protéine transmembranaire gp41. Sous l'enveloppe se trouvent la matrice protéique p17 et la capside conique p24. Le génome viral comprend deux molécules identiques d'ARN simple brin linéaire de sens positif, associées à trois enzymes capitales : la transcriptase inverse (rétrotranscriptase), l'intégrase et la protéase.",
    piegeBac:
      "N'écrivez jamais que le VIH contient de l'ADN dans son virion mûr. C'est un rétrovirus : son génome est constitué de 2 molécules d'ARN monocaténaire. C'est la transcriptase inverse virale qui fabrique un ADN proviral double brin une fois entrée dans la cellule hôte.",
    formuleCle:
      'Virion VIH = Enveloppe lipidique + [gp120 / gp41] + Capside p24 + 2 ARN monocaténaires + [Transcriptase inverse, Intégrase, Protéase]',
    pointsCles: [
      'gp120 : Clé moléculaire se liant au récepteur CD4 des LT4, macrophages et cellules dendritiques.',
      'gp41 : Protéine de fusion transmembranaire permettant la pénétration de la capside.',
      'Transcriptase inverse : Synthétise un ADN double brin à partir de l\'ARN viral (dépourvue de fonction de correction d\'erreurs, d\'où le taux élevé de mutations).',
      'Intégrase : Insère l\'ADN proviral dans le génome de la cellule hôte.'
    ]
  },
  {
    id: 'cycle_replicatif_vih',
    number: '05',
    title: 'Les 7 Étapes du Cycle de Multiplication Intracellulaire du VIH',
    badge: 'Cycle Viral',
    tag: 'De l\'Entrée au Bourgeonnement',
    principe:
      "Le cycle réplicatif du VIH dans le lymphocyte T4 se déroule selon une séquence chronologique stricte : 1. Fixation (adhésion de la gp120 au CD4 et au corécepteur CCR5 ou CXCR4) ; 2. Fusion et pénétration (la gp41 ancre la membrane et libère la capside dans le cytoplasme) ; 3. Transcription inverse (la transcriptase inverse convertit l'ARN viral en ADN proviral double brin avec mutations fréquentes) ; 4. Intégration génomique (l'intégrase insère l'ADN proviral dans le chromosome de la cellule hôte) ; 5. Transcription et traduction (l'ARN polymérase cellulaire produit les ARNm viraux traduits en polyprotéines) ; 6. Maturation et clivage (la protéase virale découpe les polyprotéines précurseurs) ; 7. Assemblage et bourgeonnement (les nouveaux virions bourgeonnent en emportant un fragment de la membrane cellulaire, provoquant à terme la mort du LT4).",
    piegeBac:
      "Veillez à respecter l'ordre strict des trois enzymes virales au cours du cycle : 1. Transcriptase inverse (cytoplasme) ──> 2. Intégrase (noyau) ──> 3. Protéase (assemblage final lors du bourgeonnement).",
    formuleCle:
      'Fixation (gp120/CD4) ──> Fusion (gp41) ──> Rétrotranscription (ADN proviral) ──> Intégration ──> Traduction ──> Protéase ──> Bourgeonnement',
    pointsCles: [
      'Corécepteurs obligatoires : CCR5 (souches macrophagotropes initiales) et CXCR4 (souches lymphotropes tardives).',
      'Phase de latence provirale : Le provirus intégré peut rester silencieux pendant des mois ou années.',
      'Cible des antirétroviraux : Inhibiteurs d\'entrée, INTI/INNTI (transcriptase), INI (intégrase), IP (protéase).',
      'Mécanismes d\'épuisement des LT4 : Effet cytopathogène direct, formation de syncytia et élimination par les LTC.'
    ]
  },
  {
    id: 'evolution_serologie_sida',
    number: '06',
    title: 'Évolution Clinique, Séropositivité & Phase de SIDA Déclaré',
    badge: 'Clinique Bac',
    tag: 'Cinétique LT4 / Charge Virale',
    principe:
      "L'histoire naturelle de l'infection par le VIH comprend trois phases d'évolution caractéristiques visualisées sur les courbes du Bac : 1. La primo-infection (1 à 3 mois : réplication virale explosive, charge virale élevée, chute temporaire des LT4, puis séroconversion vers la 4e-6e semaine avec apparition des anticorps anti-VIH détectables par ELISA/Western Blot, entraînant une rémission partielle) ; 2. La phase asymptomatique (5 à 10 ans : équilibre apparent où la charge virale reste basse et les LT4 diminuent lentement et inexorablement) ; 3. La phase de SIDA déclaré (dès que les LT4 chutent sous le seuil critique de 200 cellules/mm³ de sang : explosion de la charge virale, effondrement de toutes les défenses immunitaires et apparition d'infections opportunistes mortelles comme la tuberculose, la candidose ou le sarcome de Kaposi).",
    piegeBac:
      "La séropositivité signifie la présence d'anticorps anti-VIH dans le sérum, prouvant qu'un individu a été infecté. Elle ne signifie pas qu'il est guéri ni protégé, car ces anticorps sont neutralisés par la variabilité de la gp120 et le virus reste caché sous forme provirale intracellulaire. Attention à ne pas confondre être séropositif (asymptomatique) et être en phase de SIDA maladie.",
    formuleCle:
      'Primo-infection (pic viral + séroconversion) ──> Phase asymptomatique (chute lente des LT4) ──> SIDA (< 200 LT4/mm³ = infections opportunistes)',
    pointsCles: [
      'Séroconversion : Passage du statut séronégatif à séropositif (délai de 3 à 8 semaines après contamination).',
      'Tests de dépistage : Test ELISA de 4e génération (sensible) confirmé obligatoirement par Western Blot (spécifique).',
      'Seuil critique du SIDA : Chute des LT4 sous 200/mm³ (valeur normale : 800 à 1 200 LT4/mm³).',
      'Infections opportunistes : Agents pathogènes bénins chez le sujet sain devenant mortels chez le sujet immunodéprimé.'
    ]
  }
];

export default function B3DysfonctionnementsReflexesCard() {
  const [activeTab, setActiveTab] = useState<string>('allergie_hypersensibilite_immediate');
  const activeReflexe = REFLEXES_B3L4.find((r) => r.id === activeTab) || REFLEXES_B3L4[0];

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden my-8">
      {/* Header Médical Sobre */}
      <div className="bg-gradient-to-r from-amber-900 via-rose-950 to-red-950 text-white p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="bg-white/20 text-white text-xs font-semibold px-2.5 py-1 rounded-md tracking-wider uppercase">
              Fiches Réflexes Bac S2
            </span>
            <span className="text-amber-200 text-xs font-medium">SVT • Chapitre B3 • Leçon 4</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-amber-100 bg-black/20 px-3 py-1 rounded-full">
            <ShieldAlert size={14} className="text-amber-300" />
            <span>Dysfonctionnements Immunitaires, Allergies & VIH/SIDA</span>
          </div>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Les 6 Réflexes Incontournables sur les Allergies, l'Auto-Immunité et le VIH
        </h2>
        <p className="text-amber-100/90 text-sm mt-1 max-w-3xl">
          Fiches méthodologiques de synthèse conformes au programme du Bac S2 sénégalais : mécanisme en deux phases de l'allergie, choc anaphylactique, structure rétrovirale et cinétique de la séropositivité.
        </p>
      </div>

      {/* Navigation Onglets Horizontaux */}
      <div className="border-b border-gray-200 bg-gray-50/75 p-2 overflow-x-auto scrollbar-thin">
        <div className="flex gap-2 min-w-max">
          {REFLEXES_B3L4.map((reflexe) => {
            const isSelected = reflexe.id === activeTab;
            return (
              <button
                key={reflexe.id}
                onClick={() => setActiveTab(reflexe.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
                  isSelected
                    ? 'bg-amber-900 text-white shadow-sm ring-1 ring-amber-950'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <span
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isSelected ? 'bg-white text-amber-900' : 'bg-amber-100 text-amber-900'
                  }`}
                >
                  {reflexe.number}
                </span>
                <span>{reflexe.title.split(':')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenu Fiche Active */}
      <div className="p-5 sm:p-7 space-y-6">
        {/* Titre & Badges */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-amber-900 font-bold text-xs uppercase tracking-wider">
                Réflexe #{activeReflexe.number}
              </span>
              <span className="bg-amber-50 text-amber-800 text-xs font-semibold px-2 py-0.5 rounded border border-amber-200">
                {activeReflexe.badge}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900">{activeReflexe.title}</h3>
          </div>
          <div className="bg-gray-100 text-gray-700 text-xs px-3 py-1.5 rounded-md font-medium border border-gray-200">
            {activeReflexe.tag}
          </div>
        </div>

        {/* Principe Fondamental */}
        <div className="bg-amber-50/50 border border-amber-200/80 rounded-xl p-4 sm:p-5">
          <div className="flex items-center gap-2 text-amber-950 font-bold text-sm mb-2">
            <AlertTriangle size={18} className="text-amber-700" />
            <span>Principe Fondamental à Maîtriser</span>
          </div>
          <p className="text-gray-800 text-sm leading-relaxed">{activeReflexe.principe}</p>
        </div>

        {/* Équation / Règle Mémotechnique Clé */}
        <div className="bg-gray-900 text-gray-100 rounded-xl p-4 sm:p-5 font-mono text-xs sm:text-sm border border-gray-800 shadow-inner">
          <div className="flex items-center gap-2 text-amber-400 font-sans font-bold text-xs uppercase tracking-wider mb-2">
            <Zap size={15} />
            <span>Formule ou Règle d'Or Mémotechnique</span>
          </div>
          <div className="text-emerald-300 font-semibold leading-relaxed">
            {activeReflexe.formuleCle}
          </div>
        </div>

        {/* Grille 2 colonnes : Points Clés & Piège de l'Office du Bac */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Points Clés Barème */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 sm:p-5 shadow-xs">
            <div className="flex items-center gap-2 text-gray-900 font-bold text-sm mb-3">
              <CheckCircle2 size={17} className="text-emerald-600" />
              <span>Points d'Attribution des Notes au Bac</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
              {activeReflexe.pointsCles.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Piège Fréquent du Bac */}
          <div className="bg-rose-50/60 border border-rose-200/80 rounded-xl p-4 sm:p-5 shadow-xs">
            <div className="flex items-center gap-2 text-rose-900 font-bold text-sm mb-2">
              <HelpCircle size={17} className="text-rose-700" />
              <span>Piège Fréquent des Candidats (À Éviter)</span>
            </div>
            <p className="text-xs sm:text-sm text-rose-900 leading-relaxed font-medium">
              {activeReflexe.piegeBac}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

