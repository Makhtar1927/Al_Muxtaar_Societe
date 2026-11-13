'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Dna,
  Shield,
  Layers,
  HeartPulse,
} from 'lucide-react';

interface ReflexeItem {
  id: number;
  title: string;
  badge: string;
  badgeColor: string;
  situation: string;
  action: string;
  piege: string;
  exemple: string;
}

const REFLEXES: ReflexeItem[] = [
  {
    id: 1,
    title: 'La Pilule Combinée Œstro-Progestative : Le Triple Mode d’Action',
    badge: 'Contraception Hormonale Régulière',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    situation:
      'Dans tout sujet demandant d’expliquer comment la pilule combinée prévient la grossesse au Bac S2.',
    action:
      'Énoncer systématiquement les 3 niveaux d’action physiologique : 1) Blocage de l’ovulation (action centrale) : l’apport exogène quotidien et constant d’œstrogènes et de progestatifs de synthèse maintient un rétrocontrôle négatif continu sur l’axe hypothalamo-hypophysaire. Les taux de FSH et de LH restent bas et lissés : il n’y a ni maturation folliculaire ni pic ovulatoire de LH. 2) Modification de la glaire cervicale (action périphérique) : sous l’effet du progestatif, la glaire reste dense, visqueuse et forme un réseau à mailles serrées infranchissable pour les spermatozoïdes. 3) Modification de l’endomètre : la muqueuse utérine reste mince et atrophique, impropre à toute nidation.',
    piege:
      'Oublier les deux actions périphériques : beaucoup de candidats se contentent de citer le blocage de l’ovulation, alors que le barème officiel du Bac S2 attribue des points distincts au triptyque « Axe HH / Glaire / Endomètre ».',
    exemple:
      'Les saignements observés pendant la semaine d’arrêt (ou sous comprimés placebos) ne sont pas de véritables règles physiologiques, mais des hémorragies de privation dues à la chute temporaire des stéroïdes de synthèse.',
  },
  {
    id: 2,
    title: 'Pilule Microprogestative Pure vs Pilule Combinée',
    badge: 'Pharmacologie Comparée',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    situation:
      'Comparaison de protocoles contraceptifs chez des patientes présentant des contre-indications aux œstrogènes (tabagisme, hypertension, allaitement).',
    action:
      'Distinguer clairement les mécanismes : la pilule microprogestative (faible dose continue de progestatif pur sans œstrogènes) agit principalement au niveau périphérique en épaississant la glaire cervicale pour la rendre hermétique et en atrophiant l’endomètre. L’ovulation peut être maintenue chez un nombre significatif de femmes. En revanche, la pilule combinée associe œstrogène et progestatif à dose suffisante pour bloquer systématiquement l’axe hypothalamo-hypophysaire et supprimer l’ovulation.',
    piege:
      'Affirmer que la micropilule bloque toujours l’ovulation : FAUX ! Chez de nombreuses utilisatrices de microprogestatifs purs, des follicules continuent de mûrir et peuvent ovuler, mais la fécondation est rendue impossible par le barrage de la glaire cervicale.',
    exemple:
      'L’implant sous-cutané et le DIU hormonal libèrent également un progestatif pur (lévonorgestrel ou étonogestrel) agissant de manière prolongée sur la glaire et la muqueuse.',
  },
  {
    id: 3,
    title: 'Contraception d’Urgence vs Contragestion : Lévonorgestrel vs RU 486',
    badge: 'Urgence & Interruption',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
    situation:
      'Question classique du Baccalauréat portant sur la distinction entre la pilule du lendemain et la pilule abortive (Mifépristone).',
    action:
      'Opposer rigoureusement les deux molécules selon leur moment d’action : 1) CONTRACEPTION D’URGENCE (ex: Lévonorgestrel ou Acétate d’Ulipristal) : prise dans les 72 heures suivant un rapport non protégé AVANT l’ovulation ou la fécondation. Son fort dosage en progestatif bloque ou retarde le pic ovulatoire de LH et perturbe l’endomètre. Elle N’EST PAS abortive : si la nidation a déjà eu lieu, elle n’interrompt pas la grossesse. 2) CONTRAGESTION (ex: RU 486 / Mifépristone) : méthode d’interruption de grossesse intervenant APRÈS la nidation. Le RU 486 est un antagoniste compétitif qui se lie aux récepteurs de la progestérone sans les activer, bloquant son action : l’endomètre se décolle, le silence utérin est levé, et des contractions expulsent l’embryon.',
    piege:
      'Qualifier la pilule du lendemain de méthode abortive : FAUX et sanctionné au Bac ! La contraception d’urgence empêche la fécondation ou la nidation, mais ne détruit pas un embryon déjà implanté.',
    exemple:
      'Le protocole d’IVG médicamenteuse associe le RU 486 (qui détache l’embryon en neutralisant la progestérone) à une prostaglandine prise 48h plus tard (qui provoque les contractions d’expulsion).',
  },
  {
    id: 4,
    title: 'Dispositifs Intra-Utérins (DIU) : Mécanismes d’Action',
    badge: 'Dispositifs Intra-Utérins',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    situation:
      'Explication du mode d’action d’un stérilet en cuivre ou hormonal dans un sujet sur la maîtrise de la procréation.',
    action:
      'Détailler le mode d’action selon le type de dispositif : 1) DIU au cuivre : les ions cuivre libérés exercent un effet cytotoxique et spermicide direct, altérant la motilité et la viabilité des spermatozoïdes. De plus, le corps étranger induit une réaction inflammatoire locale aseptique de l’endomètre qui rend toute nidation impossible. 2) DIU hormonal (au lévonorgestrel) : libère localement une micro-dose continue de progestatif qui épaissit la glaire cervicale, maintient un endomètre très fin impropre à l’implantation et réduit considérablement le flux menstruel.',
    piege:
      'Penser que le DIU au cuivre modifie les cycles hormonaux ovariens : FAUX ! Avec un stérilet au cuivre, l’axe hypothalamo-hypophysaire, l’ovulation, les taux d’œstrogènes et de progestérone ainsi que la durée des cycles restent parfaitement normaux.',
    exemple:
      'Le DIU au cuivre peut également être utilisé comme contraception d’urgence jusqu’à 5 jours après un rapport à risque en empêchant l’implantation.',
  },
  {
    id: 5,
    title: 'FIVETE Classique : Les 5 Étapes du Protocole Médical au Bac S2',
    badge: 'Assistance Médicale à la Procréation',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    situation:
      'Analyse d’un document médical décrivant la prise en charge d’un couple infertile par Fécondation In Vitro et Transfert d’Embryon.',
    action:
      'Restituer chronologiquement les 5 étapes incontournables : 1) Blocage préalable de l’hypophyse par des agonistes ou antagonistes de la GnRH (pour éviter une ovulation spontanée incontrôlée). 2) Hyperstimulation ovarienne contrôlée par injection quotidienne de FSH recombinante (développement synchrone de multiples follicules). 3) Déclenchement de l’ovulation par injection unique d’HCG (analogue de la LH) lorsque les follicules atteignent 18-20 mm. 4) Ponction folliculaire transvaginale sous contrôle échographique 36h plus tard et recueil du sperme avec sélection des spermatozoïdes mobiles. 5) Mise en fécondation in vitro en incubateur à 37 °C, suivie du transfert intra-utérin de 1 à 2 embryons au stade 4-8 cellules ou blastocyste, accompagné d’un soutien lutéal par progestérone.',
    piege:
      'Confondre FIVETE et Insémination Artificielle (IA) : dans l’insémination artificielle, la fécondation a lieu IN VIVO dans les voies génitales de la femme (trompe). Dans la FIVETE, la fécondation se déroule IN VITRO en laboratoire hors de l’organisme.',
    exemple:
      'L’indication typique de la FIVETE classique est l’obstruction bilatérale des trompes de Fallope (impossibilité physique de rencontre des gamètes).',
  },
  {
    id: 6,
    title: 'L’ICSI : Micro-injection Intra-cytoplasmique en Infertilité Masculine',
    badge: 'Micro-manipulation Gamétique',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    situation:
      'Cas clinique d’infertilité conjugale liée à une oligo-asthéno-tératospermie masculine sévère ou échec de fécondation en FIV classique.',
    action:
      'Définir la technique et son indication : l’ICSI (Intra-Cytoplasmic Sperm Injection) consiste à introduire mécaniquement à l’aide d’une micro-pipette en verre un spermatozoïde unique sélectionné directement au sein du cytoplasme d’un ovocyte II mature (préalablement débarrassé de sa corona radiata par hyaluronidase). Cette technique court-circuite totalement les étapes naturelles de liaison à ZP3 et de traversée de la zone pellucide. Elle est indiquée lorsque les spermatozoïdes sont trop peu nombreux, atypiques ou immobiles pour perforer d’eux-mêmes les enveloppes ovocytaires.',
    piege:
      'Croire que l’ICSI utilise des cellules souches : FAUX ! L’ICSI utilise les gamètes authentiques des parents, mais remplace la pénétration spontanée du spermatozoïde par un geste micro-chirurgical.',
    exemple:
      'En cas d’azoospermie obstructive (absence de spermatozoïdes dans le sperme par oblitération des canaux déférents), les spermatozoïdes peuvent être prélevés par biopsie testiculaire (TESE) puis injectés par ICSI.',
  },
];

export default function B4ReproductionMaitriseReflexesCard() {
  const [openItem, setOpenItem] = useState<number | null>(1);

  return (
    <div className="my-8 rounded-3xl bg-white border border-navy/10 p-5 sm:p-7 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/10 pb-4 mb-5">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-800 mb-1 border border-blue-200">
            <Shield className="w-3.5 h-3.5 text-blue-700" />
            <span>SVT Terminale S2 • Chapitre B4 • Leçon 4</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-navy">
            Fiches Réflexes : Maîtrise de la Reproduction &amp; AMP
          </h3>
          <p className="text-xs sm:text-sm text-text/70 mt-0.5">
            Les 6 compétences incontournables au Baccalauréat sénégalais pour la contraception, la contragestion et l’Assistance Médicale à la Procréation.
          </p>
        </div>
      </div>

      {/* Accordéon des 6 réflexes */}
      <div className="space-y-3">
        {REFLEXES.map((r) => {
          const isOpen = openItem === r.id;

          return (
            <div
              key={r.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                isOpen ? 'border-navy/20 bg-surface/30 shadow-sm' : 'border-navy/10 bg-white hover:border-navy/20'
              }`}
            >
              <button
                type="button"
                onClick={() => setOpenItem(isOpen ? null : r.id)}
                className="w-full text-left p-4 flex items-center justify-between gap-3 focus:outline-none"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-7 h-7 rounded-lg bg-navy/5 text-navy font-black text-xs flex items-center justify-center shrink-0 border border-navy/10">
                    {r.id}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${r.badgeColor}`}>
                        {r.badge}
                      </span>
                    </div>
                    <h4 className="font-bold text-navy text-sm sm:text-base mt-0.5 truncate">
                      {r.title}
                    </h4>
                  </div>
                </div>
                <div className="text-navy/50 shrink-0">
                  {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </div>
              </button>

              {isOpen && (
                <div className="px-4 pb-4 pt-1 space-y-3 text-xs sm:text-sm">
                  <div className="bg-blue-50/80 rounded-xl p-3 border border-blue-200/70">
                    <p className="font-bold text-blue-900 flex items-center gap-1.5 mb-1">
                      <Clock className="w-4 h-4 text-blue-700" /> Quand appliquer ce réflexe ?
                    </p>
                    <p className="text-blue-950/80 leading-relaxed">{r.situation}</p>
                  </div>

                  <div className="bg-emerald-50/80 rounded-xl p-3 border border-emerald-200/70">
                    <p className="font-bold text-emerald-900 flex items-center gap-1.5 mb-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" /> Action &amp; Rédaction Attendue au Bac
                    </p>
                    <p className="text-emerald-950/80 leading-relaxed">{r.action}</p>
                  </div>

                  <div className="bg-amber-50/80 rounded-xl p-3 border border-amber-200/70">
                    <p className="font-bold text-amber-900 flex items-center gap-1.5 mb-1">
                      <AlertTriangle className="w-4 h-4 text-amber-700" /> Le Piège Classique à Éviter
                    </p>
                    <p className="text-amber-950/80 leading-relaxed">{r.piege}</p>
                  </div>

                  <div className="bg-purple-50/80 rounded-xl p-3 border border-purple-200/70">
                    <p className="font-bold text-purple-900 flex items-center gap-1.5 mb-1">
                      <Dna className="w-4 h-4 text-purple-700" /> Exemple / Chiffre Clé pour la Copie
                    </p>
                    <p className="text-purple-950/80 leading-relaxed font-mono text-[11px] sm:text-xs">
                      {r.exemple}
                    </p>
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

