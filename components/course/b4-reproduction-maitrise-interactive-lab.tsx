'use client';

import React, { useState } from 'react';
import {
  Shield,
  Activity,
  Layers,
  FlaskConical,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronRight,
  GitBranch,
  Stethoscope,
} from 'lucide-react';

type ContraceptiveKey = 'combinee' | 'microprogestative' | 'diu_cuivre' | 'urgence' | 'ru486';

interface ContraceptiveInfo {
  name: string;
  category: string;
  molecules: string;
  targetWindow: string;
  axeHHEffect: string;
  axeHHStatus: 'bloque' | 'actif' | 'retarde';
  glaireEffect: string;
  glaireStatus: 'hermetique' | 'permeable';
  endometreEffect: string;
  endometreStatus: 'atrophique' | 'normal' | 'decolle';
  summary: string;
  bacTip: string;
}

const CONTRACEPTIVES: Record<ContraceptiveKey, ContraceptiveInfo> = {
  combinee: {
    name: 'Pilule Combinée (Normo / Minidosée)',
    category: 'Contraception Hormonale Régulière Préventive',
    molecules: 'Éthinyloestradiol + Dérivé progestatif de synthèse',
    targetWindow: 'Prise quotidienne préventive (21 jours + arrêt de 7 jours)',
    axeHHEffect: 'Rétrocontrôle négatif continu sur l’axe HH : FSH et LH effondrées, absence totale de maturation folliculaire et suppression du pic de LH.',
    axeHHStatus: 'bloque',
    glaireEffect: 'Glaire dense, visqueuse, opaque et à mailles très serrées, formant un bouchon infranchissable pour les spermatozoïdes.',
    glaireStatus: 'hermetique',
    endometreEffect: 'Endomètre mince, non vascularisé et atrophique, totalement impropre à une nidation embryonnaire éventuelle.',
    endometreStatus: 'atrophique',
    summary:
      'La pilule combinée agit par un triptyque d’action complet : un effet central (inhibition de l’ovulation) et deux effets périphériques (barrage de la glaire cervicale et atrophie de l’endomètre). L’arrêt des 7 jours déclenche une hémorragie de privation simulant les règles.',
    bacTip:
      'Ne pas qualifier les saignements sous pilule combinée de "règles naturelles". Ce sont des hémorragies de privation provoquées par la chute des hormones de synthèse.',
  },
  microprogestative: {
    name: 'Pilule Microprogestative Pure (Mini-pilule)',
    category: 'Contraception Progestative Continue',
    molecules: 'Progestatif pur à très faible dose continue (ex: Lévonorgestrel, Désogestrel)',
    targetWindow: 'Prise quotidienne continue sans aucune interruption (365 jours/an)',
    axeHHEffect: 'Inhibition inconstante de l’axe HH : les taux basaux de FSH/LH permettent souvent la maturation folliculaire et l’ovulation persiste chez de nombreuses femmes.',
    axeHHStatus: 'actif',
    glaireEffect: 'Imperméabilité constante et absolue de la glaire cervicale au niveau du col utérin.',
    glaireStatus: 'hermetique',
    endometreEffect: 'Atrophie de la muqueuse utérine empêchant l’implantation.',
    endometreStatus: 'atrophique',
    summary:
      'La minipilule exerce une action quasi-exclusivement périphérique. Elle est prescrite en cas de contre-indications aux œstrogènes (tabagisme, antécédents cardiovasculaires, allaitement maternel). L’efficacité repose sur la rigueur horaire de la prise quotidienne.',
    bacTip:
      'Attention au piège classique du Bac S2 : la pilule microprogestative n’agit PAS obligatoirement en bloquant l’ovulation, mais en verrouillant le col de l’utérus.',
  },
  diu_cuivre: {
    name: 'Dispositif Intra-Utérin au Cuivre (DIU / Stérilet)',
    category: 'Contraception Mécanique & Chimique Intra-Utérine',
    molecules: 'Cuivre métallique pur (surface active 380 mm²)',
    targetWindow: 'Inséré pour une durée de 5 à 10 ans (ou contraception d’urgence jusqu’à J5 post-rapport)',
    axeHHEffect: 'Aucun effet sur l’axe hypothalamo-hypophysaire : cycles ovariens, pics de LH et ovulations restent parfaitement naturels et normaux.',
    axeHHStatus: 'actif',
    glaireEffect: 'La glaire évolue normalement au cours du cycle ; les ions cuivre exercent une toxicité directe sur les spermatozoïdes en transit.',
    glaireStatus: 'permeable',
    endometreEffect: 'Réaction inflammatoire locale aseptique (corps étranger) avec afflux de leucocytes rendant l’endomètre inapte à la nidation.',
    endometreStatus: 'atrophique',
    summary:
      'Le DIU au cuivre combine une cytotoxicité spermicide des ions Cu2+ (qui immobilisent et détruisent les gamètes mâles) à une altération de la réceptivité endométriale. C’est une méthode sans hormone convenant aux femmes voulant préserver leurs cycles naturels.',
    bacTip:
      'Le stérilet au cuivre n’interfère jamais avec les sécrétions de FSH, de LH, d’œstrogènes ou de progestérone. Les cycles menstruels restent inchangés.',
  },
  urgence: {
    name: 'Pilule d’Urgence (Pilule du Lendemain)',
    category: 'Contraception d’Urgence Post-Coïtale',
    molecules: 'Lévonorgestrel (1,5 mg dose unique) ou Acétate d’Ulipristal (modulateur des récepteurs progestérone)',
    targetWindow: 'Prise unique le plus tôt possible dans les 72h (ou 120h) suivant un rapport à risque',
    axeHHEffect: 'Retarde ou bloque le pic pré-ovulatoire de LH si le comprimé est ingéré avant l’onde ovulatoire imminente.',
    axeHHStatus: 'retarde',
    glaireEffect: 'Épaississement transitoire de la glaire pour freiner les spermatozoïdes restants dans les voies génitales.',
    glaireStatus: 'hermetique',
    endometreEffect: 'Perturbation de la maturation de l’endomètre pouvant gêner une nidation précoce.',
    endometreStatus: 'atrophique',
    summary:
      'Méthode d’exception destinée à prévenir une grossesse après échec ou absence de contraception. Elle n’interrompt en aucun cas une grossesse déjà implantée : son efficacité décroît avec le temps écoulé depuis le rapport non protégé.',
    bacTip:
      'Insister dans la copie sur le fait que la pilule du lendemain n’est PAS abortive. Si la nidation a déjà eu lieu, son action est sans effet sur la grossesse.',
  },
  ru486: {
    name: 'Mifépristone (RU 486) + Prostaglandines',
    category: 'Contragestion (Interruption Volontaire de Grossesse Médicamenteuse)',
    molecules: 'Mifépristone (antagoniste compétitif de la progestérone) + Misoprostol (prostaglandine)',
    targetWindow: 'Administration médicale précoce (jusqu’à 7 à 9 semaines d’aménorrhée) APRÈS nidation confirmée',
    axeHHEffect: 'Aucune action sur l’axe HH nécessaire : agit directement au niveau des organes cibles utérins fœto-maternels.',
    axeHHStatus: 'actif',
    glaireEffect: 'Ouverture et ramollissement du col utérin facilitant l’évacuation du contenu utérin.',
    glaireStatus: 'permeable',
    endometreEffect: 'Décollement massif de la caduque utérine, nécrose déciduale et contractions myométriales entraînant l’expulsion de l’œuf.',
    endometreStatus: 'decolle',
    summary:
      'Le RU 486 possède une haute affinité pour les récepteurs de la progestérone : il s’y fixe sans déclencher d’effet biologique, empêchant la vraie progestérone d’agir. Privée de signal progestatif, la muqueuse s’effondre et le myomètre se contracte.',
    bacTip:
      'Définition du RU 486 au Bac S2 : "Antagoniste compétitif des récepteurs intracellulaires de la progestérone". Cette formule exacte rapporte l’intégralité des points de définition.',
  },
};

interface ClinicalCase {
  id: string;
  couple: string;
  anamnese: string;
  bilanMedical: string;
  diagnostic: string;
  solutionAMP: string;
  justificationBac: string;
}

const CLINICAL_CASES: ClinicalCase[] = [
  {
    id: 'cas1',
    couple: 'Couple A (Femme 30 ans, Homme 32 ans)',
    anamnese: 'Infertilité primaire depuis 3 ans. Antécédent d’infection génitale à Chlamydia chez la femme.',
    bilanMedical: 'Hystérosalpingographie : obstruction complète bilatérale des trompes de Fallope. Spermogramme du conjoint normal (50 millions spz/mL, 65% mobiles).',
    diagnostic: 'Infertilité féminine d’origine tubaire mécanique (impossibilité physique de rencontre des gamètes dans l’ampoule tubaire).',
    solutionAMP: 'Fécondation In Vitro et Transfert d’Embryon (FIVETE classique)',
    justificationBac:
      'L’obstruction des trompes empêche la rencontre naturelle in vivo. La FIVETE contourne ce blocage mécanique en réalisant la rencontre gamétique in vitro en boîte de Pétri après ponction folliculaire, puis en réimplantant directement l’embryon dans la cavité utérine.',
  },
  {
    id: 'cas2',
    couple: 'Couple B (Femme 28 ans, Homme 34 ans)',
    anamnese: 'Infertilité depuis 2 ans. Bilan hormonal féminin normal et perméabilité tubaire confirmée.',
    bilanMedical: 'Spermogramme masculin : oligo-asthéno-tératospermie sévère (concentration < 2 millions spz/mL, mobilité progressive < 10%, 92% de formes anormales).',
    diagnostic: 'Infertilité masculine sévère par déficit quantitatif et qualitatif majeur des spermatozoïdes.',
    solutionAMP: 'Micro-injection intra-cytoplasmique d’un spermatozoïde (ICSI)',
    justificationBac:
      'Les spermatozoïdes sont trop peu nombreux et trop peu mobiles pour traverser spontanément la zone pellucide in vitro en FIV classique. L’ICSI résout ce problème en introduisant mécaniquement un spermatozoïde unique directement dans l’ovocyte II à l’aide d’une micro-pipette.',
  },
  {
    id: 'cas3',
    couple: 'Couple C (Femme 26 ans, Homme 29 ans)',
    anamnese: 'Cycles très longs (45 à 90 jours) ou aménorrhée avec absence de plateau thermique.',
    bilanMedical: 'Échographie pelvienne : nombreux follicules immatures sous-corticaux sans follicule dominant. Spermogramme normal.',
    diagnostic: 'Infertilité féminine par dysovulation / anovulation d’origine endocrinienne (Syndrome des Ovaires Polykystiques).',
    solutionAMP: 'Induction médicale de l’ovulation (Citrate de clomiphène ou injection de FSH/HCG)',
    justificationBac:
      'Les trompes et le sperme étant normaux, une simple stimulation hormonale suffit à restaurer la maturation folliculaire et le pic ovulatoire. Les rapports sexuels programmés permettent ensuite une fécondation naturelle in vivo sans geste chirurgical lourd.',
  },
  {
    id: 'cas4',
    couple: 'Couple D (Femme 31 ans, Homme 33 ans)',
    anamnese: 'Infertilité inexpliquée depuis 2 ans et demi avec examens anatomiques normaux.',
    bilanMedical: 'Test post-coïtal de Hühner négatif : glaire cervicale normale mais aucun spermatozoïde mobile dans la glaire (immobilisation et agglutination des spermatozoïdes).',
    diagnostic: 'Infertilité par facteur cervical (incompatibilité de la glaire cervicale ou présence d’anticorps anti-spermatozoïdes).',
    solutionAMP: 'Insémination Artificielle Intra-Utérine avec sperme du Conjoint (IAC)',
    justificationBac:
      'Le sperme est préparé et capacite en laboratoire, puis déposé directement au-delà du col utérin dans la cavité utérine à l’aide d’un cathéter fin, court-circuitant ainsi l’obstacle de la glaire cervicale hostile.',
  },
];

export default function B4ReproductionMaitriseInteractiveLab() {
  const [selectedMethod, setSelectedMethod] = useState<ContraceptiveKey>('combinee');
  const [selectedCase, setSelectedCase] = useState<string>('cas1');

  const method = CONTRACEPTIVES[selectedMethod];
  const clinicalCase = CLINICAL_CASES.find((c) => c.id === selectedCase) || CLINICAL_CASES[0];

  return (
    <div className="my-10 rounded-3xl bg-white border border-navy/10 p-5 sm:p-7 shadow-sm">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/10 pb-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-3 py-1 text-xs font-bold text-navy mb-1 border border-navy/10">
            <Activity className="w-3.5 h-3.5 text-turquoise" />
            <span>Laboratoire Virtuel de Pharmacologie &amp; AMP</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-navy">
            Simulateur : Maîtrise de la Procréation &amp; Cas Cliniques d’AMP
          </h3>
          <p className="text-xs sm:text-sm text-text/70 mt-0.5">
            Explorez les modes d’action hormonaux et cellulaires des contraceptifs et résolvez les diagnostics d’infertilité conjugale du Bac S2.
          </p>
        </div>
      </div>

      {/* MODULE 1 : Simulateur de Mécanismes Contraceptifs */}
      <div className="mb-10">
        <div className="mb-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-navy/60 mb-0.5">
            <Shield className="w-3.5 h-3.5 text-turquoise" />
            <span>Module 1 • Modes d’Action Hormonaux &amp; Périphériques</span>
          </div>
          <h4 className="text-base sm:text-lg font-black text-navy">
            Comparateur de Mécanismes : Contraception &amp; Contragestion
          </h4>
        </div>

        {/* Sélecteur de méthode */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5 mb-5">
          {(Object.keys(CONTRACEPTIVES) as ContraceptiveKey[]).map((key) => {
            const item = CONTRACEPTIVES[key];
            const isSelected = selectedMethod === key;

            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedMethod(key)}
                className={`rounded-2xl p-3 text-left transition-all border ${
                  isSelected
                    ? 'bg-navy text-white border-navy shadow-sm'
                    : 'bg-surface/50 text-navy/80 border-navy/10 hover:bg-surface hover:border-navy/20'
                }`}
              >
                <span
                  className={`block text-[10px] font-bold uppercase tracking-wider ${
                    isSelected ? 'text-turquoise' : 'text-text/50'
                  }`}
                >
                  {key === 'ru486' ? 'Contragestion' : key === 'urgence' ? 'Urgence' : 'Régulière'}
                </span>
                <span className="mt-1 block text-xs font-bold leading-tight truncate">
                  {item.name.split(' (')[0]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Panneau d'analyse de la méthode sélectionnée */}
        <div className="rounded-2xl border border-navy/10 bg-surface/30 p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-navy/10 pb-3">
            <div>
              <span className="text-xs font-bold text-turquoise">{method.category}</span>
              <h4 className="text-base sm:text-lg font-black text-navy mt-0.5">{method.name}</h4>
              <p className="text-xs text-text/60 mt-0.5">Matières actives : {method.molecules}</p>
            </div>
            <span className="self-start sm:self-center rounded-xl bg-navy/5 border border-navy/10 px-3 py-1 text-xs font-semibold text-navy">
              Fenêtre : {method.targetWindow}
            </span>
          </div>

          <p className="mt-3 text-xs sm:text-sm leading-relaxed text-text/80 font-medium">
            {method.summary}
          </p>

          {/* Grille des 3 cibles physiologiques */}
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {/* Cible 1 : Axe Hypothalamo-Hypophysaire */}
            <div className="rounded-xl bg-white p-3.5 border border-navy/10 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-text/50">
                  1. Axe HH &amp; Ovulation
                </span>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                    method.axeHHStatus === 'bloque'
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : method.axeHHStatus === 'retarde'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}
                >
                  {method.axeHHStatus === 'bloque' ? 'Ovulation Bloquée' : method.axeHHStatus === 'retarde' ? 'Pic Décalé' : 'Axe Actif'}
                </span>
              </div>
              <p className="text-xs text-text/80 leading-relaxed">{method.axeHHEffect}</p>
            </div>

            {/* Cible 2 : Glaire Cervicale */}
            <div className="rounded-xl bg-white p-3.5 border border-navy/10 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-text/50">
                  2. Glaire Cervicale
                </span>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                    method.glaireStatus === 'hermetique'
                      ? 'bg-rose-50 text-rose-700 border-rose-200'
                      : 'bg-blue-50 text-blue-700 border-blue-200'
                  }`}
                >
                  {method.glaireStatus === 'hermetique' ? 'Mailles Serrées' : 'Perméable'}
                </span>
              </div>
              <p className="text-xs text-text/80 leading-relaxed">{method.glaireEffect}</p>
            </div>

            {/* Cible 3 : Endomètre Utérin */}
            <div className="rounded-xl bg-white p-3.5 border border-navy/10 shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-text/50">
                  3. Endomètre &amp; Nidation
                </span>
                <span
                  className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border ${
                    method.endometreStatus === 'decolle'
                      ? 'bg-purple-50 text-purple-700 border-purple-200'
                      : method.endometreStatus === 'atrophique'
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}
                >
                  {method.endometreStatus === 'decolle' ? 'Décollement / IVG' : method.endometreStatus === 'atrophique' ? 'Atrophique' : 'Normal'}
                </span>
              </div>
              <p className="text-xs text-text/80 leading-relaxed">{method.endometreEffect}</p>
            </div>
          </div>

          {/* Règle de rédaction Bac */}
          <div className="mt-4 rounded-xl border border-blue-200 bg-blue-50/70 p-3 flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-blue-700 shrink-0 mt-0.5" />
            <div className="text-xs text-blue-950">
              <span className="font-bold block mb-0.5">Exigence de rédaction au Baccalauréat sénégalais :</span>
              <p className="leading-relaxed opacity-90">{method.bacTip}</p>
            </div>
          </div>
        </div>
      </div>

      {/* MODULE 2 : Résolution de Cas Cliniques d'AMP */}
      <div className="rounded-2xl border border-navy/10 bg-white p-5">
        <div className="mb-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-navy/60 mb-0.5">
            <Stethoscope className="w-3.5 h-3.5 text-turquoise" />
            <span>Module 2 • Raisonnement Médical &amp; Indications d’AMP</span>
          </div>
          <h4 className="text-base sm:text-lg font-black text-navy">
            Cas Cliniques Typiques : Du Diagnostic à la Technique d’AMP
          </h4>
          <p className="text-xs text-text/60 mt-0.5">
            Sélectionnez une observation médicale pour identifier l’anomalie physiologique et justifier la technique d’assistance recommandée.
          </p>
        </div>

        {/* Boutons des 4 cas cliniques */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-4">
          {CLINICAL_CASES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedCase(item.id)}
              className={`rounded-xl px-3 py-2 text-xs font-bold transition-all border text-left ${
                selectedCase === item.id
                  ? 'bg-navy text-white border-navy shadow-xs'
                  : 'bg-surface text-navy/80 border-navy/10 hover:bg-surface/80'
              }`}
            >
              <span className="block text-[10px] text-turquoise uppercase tracking-wider font-extrabold">
                Cas {item.id.replace('cas', '')}
              </span>
              <span className="truncate block mt-0.5">{item.couple.split(' (')[0]}</span>
            </button>
          ))}
        </div>

        {/* Détail du cas clinique sélectionné */}
        <div className="rounded-xl border border-navy/10 bg-surface/30 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-navy/10 pb-2 mb-3">
            <div>
              <h5 className="font-bold text-navy text-xs sm:text-sm">{clinicalCase.couple}</h5>
              <p className="text-[11px] text-text/60 mt-0.5">{clinicalCase.anamnese}</p>
            </div>
            <span className="self-start sm:self-center text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md bg-navy/5 border border-navy/10 text-navy">
              Épreuve de Raisonnement Bac
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-white p-3 border border-navy/10 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-text/50 block mb-1">
                1. Bilan &amp; Examens Médicaux
              </span>
              <p className="text-xs text-text/80 leading-relaxed">{clinicalCase.bilanMedical}</p>
            </div>

            <div className="rounded-xl bg-white p-3 border border-navy/10 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block mb-1">
                2. Diagnostic Biologique
              </span>
              <p className="text-xs font-semibold text-navy leading-relaxed">{clinicalCase.diagnostic}</p>
            </div>

            <div className="rounded-xl bg-emerald-50/80 p-3 border border-emerald-200 shadow-xs">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
                3. Technique d’AMP Indiquée
              </span>
              <p className="text-xs font-black text-emerald-950 mb-1.5">{clinicalCase.solutionAMP}</p>
              <p className="text-[11px] text-emerald-950/80 leading-relaxed">{clinicalCase.justificationBac}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

