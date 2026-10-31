import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation | Al Muxtaar Société",
  description:
    "Conditions générales d'utilisation et d'abonnement de la plateforme éducative et commerciale Al Muxtaar Société au Sénégal.",
};

export default function ConditionsPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-navy sm:text-4xl">
          Conditions Générales d&apos;Utilisation & de Vente
        </h1>
        <p className="mt-2 text-xs text-navy-light">
          Dernière mise à jour : 31 Octobre 2026 · République du Sénégal
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-navy-light leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-navy">1. Présentation de la Société</h2>
          <p>
            La plateforme <strong>Al_Muxtaar_Société</strong> est un service numérique basé à Dakar, Sénégal, ayant pour mission de fournir des contenus pédagogiques interactifs et des solutions numériques conformes aux référentiels éducatifs nationaux.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-navy">2. Accès à la plateforme et Inscription</h2>
          <p>
            L&apos;accès à la vitrine publique et aux extraits gratuits est ouvert à tout visiteur. Pour accéder à l&apos;intégralité des cours, exercices corrigés et quiz du module <strong>Al_Muxtaar_Doc</strong>, l&apos;utilisateur doit créer un compte personnel en renseignant son numéro de téléphone sénégalais (+221).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-navy">3. Formules d&apos;abonnement et Tarifs</h2>
          <p>
            Les abonnements à Al_Muxtaar_Doc sont proposés sous forme de forfaits prépayés sans tacite reconduction :
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Formule 1 Mois (30 jours)</strong> : 700 FCFA TTC</li>
            <li><strong>Formule Trimestrielle (90 jours)</strong> : 2 000 FCFA TTC</li>
          </ul>
          <p>
            Le règlement s&apos;effectue par transfert mobile (Wave, Orange Money) vers les numéros marchands officiels de la société. L&apos;activation des droits d&apos;accès est opérée manuellement par un administrateur après vérification du numéro de transaction.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-navy">4. Propriété intellectuelle & Protection des cours</h2>
          <p>
            L&apos;ensemble des contenus (cours, exercices, formules, graphiques, illustrations et quiz) relève de la législation sur le droit d&apos;auteur. Les contenus sont exclusivement destinés à l&apos;usage personnel et non commercial de l&apos;élève abonné.
          </p>
          <p>
            Un filigrane personnalisé discret (nom et numéro de téléphone) peut être apposé sur les pages pour prévenir toute diffusion illicite ou piratage. Toute reproduction, capture massive ou revente non autorisée expose son auteur à la résiliation immédiate de son compte sans remboursement.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-navy">5. Rétractation et Litiges</h2>
          <p>
            En raison de la nature numérique des contenus immédiatement consommables, aucun remboursement n&apos;est effectué une fois l&apos;accès activé, sauf en cas d&apos;erreur avérée de double paiement. Tout litige relatif à l&apos;interprétation des présentes conditions relève de la compétence des tribunaux sénégalais compétents.
          </p>
        </section>
      </div>
    </div>
  );
}

