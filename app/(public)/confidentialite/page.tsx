import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de Confidentialité (CDP Sénégal) | Al Muxtaar Société",
  description:
    "Engagement d'Al Muxtaar Société pour la protection des données personnelles, en stricte conformité avec les directives de la Commission des Données Personnelles (CDP) du Sénégal.",
};

export default function ConfidentialitePage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-black tracking-tight text-navy sm:text-4xl">
          Politique de Confidentialité & Protection des Données
        </h1>
        <p className="mt-2 text-xs text-navy-light">
          Conformité avec la Loi n° 2008-12 sur les données personnelles au Sénégal (CDP)
        </p>
      </div>

      <div className="space-y-6 text-xs sm:text-sm text-navy-light leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-navy">1. Engagement de protection des élèves</h2>
          <p>
            Al Muxtaar Société s&apos;engage à protéger la vie privée des utilisateurs de sa plateforme, en particulier celle des élèves mineurs. Le traitement des données est effectué dans le respect de la <strong>Loi n° 2008-12 du 25 janvier 2008</strong> portant sur la protection des données à caractère personnel en République du Sénégal.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-navy">2. Données collectées et finalités</h2>
          <p>Nous collectons uniquement les informations strictement nécessaires :</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Numéro de téléphone (+221)</strong> : sert d&apos;identifiant de connexion principal et de lien avec votre paiement Wave / Orange Money.</li>
            <li><strong>Prénom, Nom et Classe</strong> : pour personnaliser votre parcours de révision et vos attestations de cours.</li>
            <li><strong>Historique de progression</strong> : leçons terminées et scores obtenus aux quiz pour vous aider à mesurer vos acquis.</li>
            <li><strong>Preuves de paiement</strong> : montant, date et code SMS de transaction pour valider votre abonnement.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-navy">3. Sécurité et Hébergement des données</h2>
          <p>
            Les mots de passe sont chiffrés et ne sont jamais stockés en clair. L&apos;accès à vos données est sécurisé au niveau de la base de données via des politiques strictes de sécurité au niveau des lignes (Row Level Security). Aucun élève ne peut consulter le profil d&apos;un autre élève.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-navy">4. Non-commercialisation des données</h2>
          <p>
            Al Muxtaar Société ne vend, ne loue, ni ne cède aucune donnée personnelle ou comportementale à des tiers ou régies publicitaires. Vos données sont exclusivement réservées à l&apos;usage de nos services éducatifs.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-navy">5. Vos droits (Accès, Rectification, Suppression)</h2>
          <p>
            Conformément aux prérogatives de la <strong>Commission des Données Personnelles (CDP)</strong> du Sénégal, vous disposez d&apos;un droit d&apos;accès, de rectification et d&apos;effacement de vos données personnelles. Vous pouvez exercer ce droit à tout moment depuis votre page profil ou par demande écrite à <code>support@almuxtaar.sn</code>.
          </p>
        </section>
      </div>
    </div>
  );
}

