'use client';

import React, { useState } from 'react';

const reflexes = [
  {
    id: 1,
    icon: '🎯',
    color: 'from-rose-500 to-pink-600',
    bgLight: 'bg-rose-50',
    borderColor: 'border-rose-200',
    textColor: 'text-rose-700',
    badgeColor: 'bg-rose-100 text-rose-800',
    title: 'La Fécondation : Lieu, Moment et Étapes Clés',
    subtitle: 'Réflexe n°1 — Localisation & Mécanisme',
    content:
      "La fécondation a lieu dans le tiers EXTERNE de la trompe de Fallope (ampoule tubaire), dans les 24 heures suivant l'ovulation. Le spermatozoïde traverse 3 barrières : (1) la corona radiata (cellules folliculaires) grâce aux mouvements du flagelle et aux hyaluronidases acrosomiales ; (2) la zone pellucide par la réaction acrosomique libérant la acrosine qui perfore ZP3 ; (3) la membrane plasmique de l'ovocyte II. La pénétration d'un spermatozoïde déclenche la RÉACTION CORTICALE : libération des granules corticaux qui modifient ZP3 → blocage polyspermie. L'ovocyte II achève alors sa méiose II et expulse le 2ème globule polaire → devient OVULE. Les 2 pronuclei (mâle + femelle) fusionnent → zygote 2n = 46 chromosomes.",
    mnemo: '🔑 Mnémo : T-A-C-R = Trompe → Acrosome → Cortex → Réaction polyspermie',
    bac: "Question Bac type : « Expliquez le mécanisme empêchant la polyspermie lors de la fécondation. »",
  },
  {
    id: 2,
    icon: '🏠',
    color: 'from-purple-500 to-violet-600',
    bgLight: 'bg-purple-50',
    borderColor: 'border-purple-200',
    textColor: 'text-purple-700',
    badgeColor: 'bg-purple-100 text-purple-800',
    title: 'De la Segmentation à la Nidation (J0 → J7)',
    subtitle: 'Réflexe n°2 — Chronologie obligatoire',
    content:
      "Chronologie ABSOLUE à maîtriser : J0 = fécondation (ampoule tubaire) → J1-J3 : segmentation (divisions mitotiques sans croissance : 2, 4, 8, 16 cellules = morula) PENDANT le trajet tubaire → J4 : morula arrive dans l'utérus → J4-J5 : morula se creuse d'une cavité = BLASTOCYSTE (trophoblaste externe + bouton embryonnaire interne + cavité blastocoelique) → J5-J6 : zona pellucida disparaît (éclosion) → J6-J7 : NIDATION dans l'endomètre (phase sécrétoire). Le trophoblaste sécrète des enzymes protéolytiques qui lui permettent de s'implanter dans la dentelle utérine.",
    mnemo: '🔑 Chrono : J0 Fécond → J1-J3 Morula tubaire → J4 Utérus → J5 Blastocyste → J7 Nidation',
    bac: "Piège Bac : Ne pas confondre la segmentation (mitoses sans croissance) avec la croissance embryonnaire qui vient APRÈS l'implantation.",
  },
  {
    id: 3,
    icon: '🧪',
    color: 'from-amber-500 to-orange-600',
    bgLight: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700',
    badgeColor: 'bg-amber-100 text-amber-800',
    title: 'HCG : Le Messager du Trophoblaste qui Sauve le Corps Jaune',
    subtitle: 'Réflexe n°3 — Hormone clé de la grossesse précoce',
    content:
      "Dès la nidation, le TROPHOBLASTE sécrète la HCG (Human Chorionic Gonadotropin = Gonadotrophine Chorionique Humaine). Rôle CRUCIAL de la HCG : elle possède une structure très proche de la LH (même sous-unité alpha, sous-unité bêta différente) et se fixe sur les MÊMES récepteurs LH du corps jaune → elle SAUVE le corps jaune de son involution normale → le corps jaune gravidique continue à sécréter progestérone + œstrogènes pendant 3 mois. Test de grossesse = détection de HCG urinaire dès J9-J10. Pic de HCG à 8-10 semaines, puis déclin quand le placenta prend le relais.",
    mnemo: '🔑 HCG = « rescue signal » du corps jaune. Taux ↑ → corps jaune maintenu → progestérone ↑ → pas de règles.',
    bac: "Question Bac type : « Pourquoi le test de grossesse urinaire est-il positif dès 10 jours après l'ovulation ? » → Détection de HCG sécrétée par le trophoblaste depuis la nidation.",
  },
  {
    id: 4,
    icon: '🏭',
    color: 'from-teal-500 to-cyan-600',
    bgLight: 'bg-teal-50',
    borderColor: 'border-teal-200',
    textColor: 'text-teal-700',
    badgeColor: 'bg-teal-100 text-teal-800',
    title: 'Le Placenta : Organe Endocrine de Substitution',
    subtitle: 'Réflexe n°4 — Prise de relais hormonal à 3 mois',
    content:
      "Le placenta se constitue à partir du trophoblaste + tissu utérin maternel → barrière hémato-placentaire. Dès le 3ème mois, le PLACENTA devient autonome hormonalement : il sécrète lui-même (1) PROGESTÉRONE placentaire en grande quantité (rôle : maintien de la muqueuse utérine, silence du myomètre, blocage des contractions) ; (2) ŒSTROGÈNES placentaires (croissance utérine, préparation glandes mammaires) ; (3) HPL = Human Placental Lactogen (action métabolique sur la mère, préparation lactation) ; (4) HCG continue mais décline. → Corps jaune n'est plus nécessaire après 3 mois : il involue en corps albicans. Mais la grossesse continue car le placenta assure tout !",
    mnemo: '🔑 3 mois = relais : Corps jaune → Placenta. Mnémo hormones placentaires : P-O-H (Progestérone, Œstrogènes, HPL)',
    bac: "Interprétation graphique Bac : Sur un graphe hormonal de grossesse, identifier le « croisement » entre déclin HCG et maintien de progestérone = preuve de la prise de relais placentaire.",
  },
  {
    id: 5,
    icon: '💥',
    color: 'from-red-500 to-rose-600',
    bgLight: 'bg-red-50',
    borderColor: 'border-red-200',
    textColor: 'text-red-700',
    badgeColor: 'bg-red-100 text-red-800',
    title: 'Déclenchement de l\'Accouchement : La Cascade Ocytocine-Prostaglandines',
    subtitle: 'Réflexe n°5 — Mécanisme neuroendocrinien de parturition',
    content:
      "En fin de grossesse (38-40 semaines), la chute du ratio progestérone/œstrogènes lève l'inhibition du myomètre. Le mécanisme de déclenchement est une BOUCLE DE RÉTROCONTRÔLE POSITIF : (1) Distension du col utérin par la tête du fœtus → (2) Influx nerveux → hypothalamus → hypophyse → (3) Libération d'OCYTOCINE → (4) Contractions utérines (myomètre) → (5) Renforcement de la distension → retour à l'étape 1. Les PROSTAGLANDINES locales amplifient les contractions et participent à la maturation du col. La boucle s'auto-entretient jusqu'à l'expulsion. L'ocytocine de synthèse (Syntocinon®) est utilisée pour déclencher ou accélérer l'accouchement en clinique.",
    mnemo: '🔑 Réflexe Ferguson : Distension col → Ocytocine → Contractions → Plus de distension → Plus d\'ocytocine (rétrocontrôle POSITIF)',
    bac: "Piège Bac : L'accouchement est un des RARES exemples de rétrocontrôle POSITIF dans le programme SVT. Ne pas le confondre avec les rétrocontrôles négatifs du cycle.",
  },
  {
    id: 6,
    icon: '🍼',
    color: 'from-sky-500 to-blue-600',
    bgLight: 'bg-sky-50',
    borderColor: 'border-sky-200',
    textColor: 'text-sky-700',
    badgeColor: 'bg-sky-100 text-sky-800',
    title: 'Lactation : Prolactine & Ocytocine — Mise en Route et Éjection',
    subtitle: 'Réflexe n°6 — Deux hormones, deux rôles distincts',
    content:
      "La lactation fait intervenir 2 hormones DISTINCTES à ne jamais confondre : (1) PROLACTINE (antéhypophyse) : induite par la chute des œstrogènes post-partum, stimulée par la succion du mamelon → stimule la SYNTHÈSE et la SÉCRÉTION du lait dans les acini mammaires. Pendant la grossesse, la prolactine est bloquée par les œstrogènes élevés (malgré leur rôle trophique sur la glande). (2) OCYTOCINE (posthypophyse) : libérée réflexe par la succion du mamelon → provoque la contraction des cellules myoépithéliales → ÉJECTION du lait dans les canaux galactophores. Rôle bonus de la prolactine : inhibe l'axe HH (FSH/LH bas) → aménorrhée de lactation contraceptive naturelle.",
    mnemo: '🔑 Prolactine = FABRIQUE le lait. Ocytocine = ÉJECTE le lait. « Pro-lac-tine = PROduit LACtation »',
    bac: "Question Bac type : « Expliquez pourquoi une femme qui allaite est temporairement infertile. » → Prolactine ↑ → rétrocontrôle négatif sur hypothalamus → GnRH ↓ → FSH/LH ↓ → pas d'ovulation.",
  },
];

export default function B4FecondationReflexesCard() {
  const [openId, setOpenId] = useState<number | null>(1);

  return (
    <div className="my-8 rounded-2xl border border-rose-100 bg-gradient-to-br from-rose-50 to-pink-50 p-6 shadow-lg">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-pink-600 text-2xl shadow-md">
          🧬
        </div>
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            Les 6 Réflexes Clés — Fécondation, Gestation & Lactation
          </h2>
          <p className="text-sm text-gray-500">
            SVT Terminale S2 · B4 Leçon 3 · Méthode des réflexes Bac
          </p>
        </div>
      </div>

      {/* Grid de réflexes */}
      <div className="space-y-3">
        {reflexes.map((r) => (
          <div
            key={r.id}
            className={`rounded-xl border-2 ${r.borderColor} bg-white shadow-sm transition-all duration-300`}
          >
            {/* Titre cliquable */}
            <button
              className="flex w-full items-center gap-4 px-5 py-4 text-left"
              onClick={() => setOpenId(openId === r.id ? null : r.id)}
            >
              <span className="text-2xl">{r.icon}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span
                    className={`rounded-full px-2 py-0.5 text-xs font-semibold ${r.badgeColor}`}
                  >
                    {r.subtitle}
                  </span>
                </div>
                <p className={`mt-0.5 font-bold ${r.textColor}`}>{r.title}</p>
              </div>
              <span className="text-gray-400 text-lg">
                {openId === r.id ? '▲' : '▼'}
              </span>
            </button>

            {/* Contenu dépliable */}
            {openId === r.id && (
              <div className={`border-t-2 ${r.borderColor} ${r.bgLight} px-5 py-4 space-y-3`}>
                <p className="text-sm leading-relaxed text-gray-800">{r.content}</p>

                {/* Mnémo */}
                <div className="rounded-lg bg-white border border-gray-200 px-4 py-2">
                  <p className="text-xs font-semibold text-gray-600">{r.mnemo}</p>
                </div>

                {/* Bac */}
                <div className="rounded-lg bg-yellow-50 border border-yellow-200 px-4 py-2">
                  <p className="text-xs font-semibold text-yellow-800">
                    📝 {r.bac}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-5 rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 px-5 py-3 text-center text-sm font-semibold text-white shadow">
        🏆 Maîtrisez ces 6 réflexes = +4 à +6 points garantis au Bac S2 en Reproduction
      </div>
    </div>
  );
}

