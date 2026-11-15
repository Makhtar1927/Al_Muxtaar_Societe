'use client';

import React, { useState } from 'react';
import {
  ChevronDown,
  Dna,
  Scissors,
  Layers,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Shield,
} from 'lucide-react';

interface Reflexe {
  id: number;
  category: string;
  categoryColor: string;
  title: string;
  trigger: string;
  regle: string;
  details: string[];
  bacTip: string;
  formula?: string;
}

const REFLEXES: Reflexe[] = [
  {
    id: 1,
    category: 'Outils Moléculaires',
    categoryColor: 'bg-blue-100 text-blue-800 border-blue-200',
    title: 'La Boîte à Outils du Génie Génétique : Enzymes & Vecteurs',
    trigger: 'On vous demande d’identifier le rôle des réactifs enzymatiques dans un protocole de transgénèse',
    regle: 'Chaque enzyme possède une fonction biochimique exclusive et ultra-spécifique : 1. L’enzyme de restriction coupe l’ADN au niveau d’un site palindromique précis (bouts cohésifs) ; 2. L’ADN ligase soude les fragments par liaison phosphodiester ; 3. La transcriptase inverse (rétrotranscriptase) convertit l’ARNm en ADNc double brin sans introns ; 4. La Taq polymérase thermorésistante assure l’amplification PCR.',
    details: [
      'Enzymes de restriction (ex: EcoRI, HindIII, BamHI) : ciseaux moléculaires bactériens reconnaissant une séquence palindromique (qui se lit de la même façon dans les deux sens 5’→3’).',
      'Bouts collants ou cohésifs : extrémités monocaténaires complémentaires facilitant l’appariement du transgène et du vecteur.',
      'ADN ligase : colle moléculaire restaurant la continuité du squelette sucre-phosphate (consomme de l’ATP).',
      'Transcriptase inverse (RT) : enzyme rétrovirale permettant d’obtenir un ADNc (ADN complémentaire) mature débarrassé de tous les introns eucaryotes, indispensable pour l’expression chez les bactéries procaryotes.',
    ],
    bacTip: 'Question piège récurrente au Bac S2 : « Pourquoi utilise-t-on un ADNc obtenu par transcriptase inverse plutôt que le gène génomique brut humain ? » Réponse exigée : « Les bactéries sont des procaryotes dépourvus de splicéosome ; elles sont incapables d’exciser les introns. L’ADNc ne contient que les exons codants. »',
  },
  {
    id: 2,
    category: 'Plasmide Recombinant',
    categoryColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    title: 'Fabrication du Plasmide Recombinant & Sélection des Transformants',
    trigger: 'Expliquer comment le gène d’intérêt est inséré dans la bactérie et comment on sélectionne les bactéries modifiées',
    regle: 'Le plasmide vecteur et le gène d’intérêt doivent impérativement être coupés par la MÊME enzyme de restriction pour générer des extrémités cohésives complémentaires. Les bactéries ayant incorporé le plasmide recombinant sont sélectionnées grâce à un gène marqueur de résistance à un antibiotique (ex: ampicilline) présent sur le plasmide.',
    details: [
      'Plasmide : petite molécule d’ADN bicaténaire circulaire extrachromosomique capable de réplication autonome.',
      'Composants clés d’un plasmide de clonage : 1. Une origine de réplication (Ori) ; 2. Un site multiple de clonage (polylinker) ; 3. Un ou deux gènes de résistance aux antibiotiques (sélection positive).',
      'Ligation : mélange du plasmide ouvert et du transgène en présence de ligase $\\implies$ obtention du plasmide recombinant chimère.',
      'Transformation bactérienne : choc thermique (42°C) ou électroporation pour rendre les membranes bactériennes perméables au plasmide.',
      'Sélection sur gélose avec ampicilline : seules les bactéries transformées ayant reçu le plasmide (porteur du gène de résistance) peuvent survivre et former des colonies.',
    ],
    bacTip: 'Au Bac S2, insistez toujours sur la nécessité d’utiliser la même enzyme de restriction pour le vecteur et le fragment d’ADN à cloner afin d’assurer la complémentarité stricte des bases des bouts collants.',
    formula: '\\text{Plasmide coupé} + \\text{ADNc coupé (même enzyme)} \\xrightarrow{\\text{ADN ligase}} \\text{Plasmide recombinant}',
  },
  {
    id: 3,
    category: 'Étapes de Transgénèse',
    categoryColor: 'bg-purple-100 text-purple-800 border-purple-200',
    title: 'La Démarche Chronologique Complète de la Transgénèse',
    trigger: 'Ordonner ou décrire les étapes de fabrication d’un Organisme Génétiquement Modifié (OGM)',
    regle: 'Retenez la séquence chronologique immuable en 5 étapes : 1. Identification et isolement du gène d’intérêt (ou synthèse d’ADNc à partir de l’ARNm) ; 2. Insertion dans un vecteur (ligation) ; 3. Transfert dans la cellule hôte (transformation / transfection) ; 4. Sélection et criblage des cellules génétiquement modifiées ; 5. Expression du transgène et production de la protéine recombinante.',
    details: [
      'Étape 1 : Extraction des ARNm cellulaires du tissu cible et rétrotranscription en ADNc.',
      'Étape 2 : Digestion par enzyme de restriction et insertion dans le plasmide par la ligase.',
      'Étape 3 : Intégration du plasmide dans des bactéries *Escherichia coli*.',
      'Étape 4 : Culture sur boîte de Pétri contenant l’antibiotique de sélection (criblage).',
      'Étape 5 : Culture industrielle en fermenteur (bioréacteur), induction de l’expression par un promoteur et purification de la protéine thérapeutique.',
    ],
    bacTip: 'Pour une question de synthèse au Bac : présentez les 5 étapes sous forme de tirets numérotés avec les termes clés soulignés (isolement, vecteur, ligation, transformation, sélection, expression).',
  },
  {
    id: 4,
    category: 'Amplification PCR',
    categoryColor: 'bg-amber-100 text-amber-800 border-amber-200',
    title: 'La Réaction de Polymérisation en Chaîne (PCR) : Les 3 Températures Clés',
    trigger: 'Expliquer le principe d’amplification in vitro d’un fragment d’ADN ou commenter un thermocycleur',
    regle: 'La PCR amplifie exponentiellement une séquence cible grâce à des cycles répétés de 3 étapes thermiques : 1. Dénaturation à 94-95°C (séparation des brins d’ADN) ; 2. Hybridation des amorces oligonucléotidiques spécifiques à 50-60°C ; 3. Élongation à 72°C par la Taq polymérase thermorésistante. Chaque cycle double la quantité d’ADN : $N = N_0 \\times 2^n$.',
    details: [
      'Amorces : courts oligonucléotides d’ADN simple brin encadrant la séquence cible à amplifier.',
      'Taq polymérase : ADN polymérase isolée de la bactérie thermophile *Thermus aquaticus*, active à 72°C et résistante à 95°C.',
      'dNTPs : mélange équimolaire des 4 désoxyribonucléotides libres (dATP, dTTP, dCTP, dGTP) servant de briques de construction.',
      'Formule d’amplification : après 30 cycles, une seule molécule d’ADN produit $2^{30} \\approx 10^9$ copies (plus d’un milliard de fragments).',
      'Applications : tests de dépistage (VIH, COVID), police scientifique (empreintes génétiques), paléogénétique.',
    ],
    bacTip: 'Au Bac S2, ne confondez jamais réplication in vivo et PCR in vitro ! En PCR, l’ouverture des brins se fait par la chaleur à 95°C (pas d’hélicase), et l’amorce est en ADN synthétique (pas d’amorce ARN primase).',
    formula: 'N_n = N_0 \\times 2^n \\quad \\text{avec les 3 paliers : } 95^\\circ\\text{C} \\to 55^\\circ\\text{C} \\to 72^\\circ\\text{C}',
  },
  {
    id: 5,
    category: 'Applications Biomédicales',
    categoryColor: 'bg-teal-100 text-teal-800 border-teal-200',
    title: 'Insuline Recombinante & Thérapie Génique Humaine',
    trigger: 'Analyser la production industrielle d’une protéine humaine ou le protocole d’une thérapie génique',
    regle: 'La production d’insuline humaine recombinante par des bactéries OGM a remplacé l’insuline de porc, éliminant les réactions allergiques et garantissant une pureté absolue. En thérapie génique, on utilise un vecteur viral désarmé (rétrovirus, adénovirus) pour introduire une copie saine du gène défaillant directement dans les cellules somatiques du patient.',
    details: [
      'Insuline recombinante : l’ADNc codant la chaîne A et la chaîne B est cloné séparément chez *E. coli*, puis les deux chaînes sont assemblées in vitro par formation de ponts disulfures.',
      'Hormone de croissance humaine (hGH) : produite par génie génétique, éliminant le risque de transmission de la maladie de Creutzfeldt-Jakob liée aux extraits hypophysaires cadavériques.',
      'Thérapie génique somatique : correction des cellules malades (ex: cellules souches de la moelle osseuse pour les déficits immunitaires SCID ou la drépanocytose). Non transmissible à la descendance.',
      'Thérapie génique germinale : modification des gamètes ou du zygote, strictement interdite pour des raisons éthiques majeures.',
    ],
    bacTip: 'Précisez toujours au Bac la distinction fondamentale : la thérapie génique somatique ne modifie que les cellules d’un tissu cible du patient ; elle n’affecte JAMAIS les cellules reproductrices et ne peut donc pas être transmise aux enfants.',
  },
  {
    id: 6,
    category: 'Plantes OGM & Bioéthique',
    categoryColor: 'bg-rose-100 text-rose-800 border-rose-200',
    title: 'Plantes Transgéniques (Maïs Bt) & Débats Bioéthiques au Bac S2',
    trigger: 'Discuter des avantages agronomiques et des risques écologiques ou sanitaires des OGM',
    regle: 'Le maïs Bt intègre le gène de la toxine Cry de la bactérie *Bacillus thuringiensis*, le rendant toxique pour la pyrale sans nécessiter d’épandage d’insecticide chimique. Les débats portent sur les risques de transfert horizontal de gènes (super-mauvaises herbes résistantes aux herbicides), l’impact sur les insectes non cibles et le développement de résistances chez les ravageurs.',
    details: [
      'Vecteur végétal : le plasmide Ti d’*Agrobacterium tumefaciens* ou le canon à ADN (biolistique) pour propulser des microbilles d’or enrobées d’ADN.',
      'Bénéfices agronomiques : réduction drastique de l’usage des pesticides de synthèse, amélioration des rendements, résistance à la sécheresse.',
      'Risques écologiques : flux de pollen transgénique vers les cultures conventionnelles ou variétés sauvages apparentées.',
      'Risques sanitaires potentiels : apparition d’allergies imprévues liées aux protéines nouvelles recombinantes.',
      'Cadre réglementaire : moratoires, étiquetage obligatoire des produits contenant des OGM et principe de précaution.',
    ],
    bacTip: 'Dans une question de réflexion au Bac S2, adoptez toujours une argumentation scientifique équilibrée : exposez d’abord les bénéfices démontrés (santé, rendements), puis les risques écologiques potentiels et la nécessité d’un encadrement bioéthique rigoureux.',
  },
];

export default function B5GenieGenetiqueReflexesCard() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <div className="my-10 rounded-3xl bg-white border border-navy/10 p-5 sm:p-7 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/10 pb-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-3 py-1 text-xs font-bold text-navy mb-1 border border-navy/10">
            <Scissors className="w-3.5 h-3.5 text-turquoise" />
            <span>Fiche Réflexes Bac S2 • Chapitre B5 • Leçon 3</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-navy">
            Génie Génétique &amp; Biotechnologies
          </h3>
          <p className="text-xs sm:text-sm text-text/70 mt-0.5">
            Les 6 automatismes indispensables : enzymes de restriction, plasmides recombinants, PCR, insuline humaine et plantes OGM.
          </p>
        </div>
        <span className="self-start sm:self-center rounded-2xl bg-teal-50 border border-teal-200 px-3 py-1.5 text-xs font-bold text-teal-800">
          Biotechnologies Appliquées
        </span>
      </div>

      <div className="space-y-3">
        {REFLEXES.map((r) => {
          const isOpen = openId === r.id;
          return (
            <div key={r.id} className="rounded-2xl border border-navy/10 overflow-hidden transition-all">
              <button
                onClick={() => setOpenId(isOpen ? null : r.id)}
                className="w-full flex items-center justify-between gap-3 p-4 text-left hover:bg-surface/50 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl bg-navy/5 text-xs font-bold text-navy border border-navy/10">
                    {r.id}
                  </span>
                  <div className="min-w-0">
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full border mb-0.5 ${r.categoryColor}`}>
                      {r.category}
                    </span>
                    <p className="text-sm font-bold text-navy leading-snug truncate">{r.title}</p>
                  </div>
                </div>
                <ChevronDown className={`w-4 h-4 text-navy/50 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>

              {isOpen && (
                <div className="px-4 pb-5 space-y-4 border-t border-navy/10 pt-4 bg-white">
                  <div className="rounded-xl bg-navy/5 border border-navy/10 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-text/50 mb-1">
                      Signal déclencheur dans l’énoncé
                    </p>
                    <p className="text-xs text-navy font-semibold leading-relaxed">{r.trigger}</p>
                  </div>

                  <div className="rounded-xl bg-turquoise/5 border border-turquoise/20 p-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-turquoise mb-1">
                      Règle de démonstration obligatoire
                    </p>
                    <p className="text-sm font-bold text-navy leading-relaxed">{r.regle}</p>
                  </div>

                  {r.formula && (
                    <div className="rounded-xl bg-purple-50 border border-purple-200 p-3">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-purple-600 mb-1">
                        Formule / Équation de référence
                      </p>
                      <code className="text-xs font-mono text-purple-900 font-bold block">{r.formula}</code>
                    </div>
                  )}

                  <div className="grid gap-2 sm:grid-cols-2">
                    {r.details.map((d, i) => (
                      <div key={i} className="flex items-start gap-2.5 rounded-xl bg-surface/50 p-2.5 border border-navy/10">
                        <CheckCircle2 className="w-3.5 h-3.5 text-turquoise shrink-0 mt-0.5" />
                        <span className="text-xs text-text/80 leading-relaxed">{d}</span>
                      </div>
                    ))}
                  </div>

                  <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-3 flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    <div className="text-xs text-amber-950">
                      <span className="font-bold block mb-0.5">Exigence stricte des correcteurs du Baccalauréat sénégalais :</span>
                      <p className="leading-relaxed opacity-90">{r.bacTip}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
