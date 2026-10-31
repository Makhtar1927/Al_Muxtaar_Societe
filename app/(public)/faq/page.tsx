import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";

export const metadata: Metadata = {
  title: "Foire Aux Questions (FAQ) | Al Muxtaar Société",
  description:
    "Toutes les réponses à vos questions sur les cours en ligne, les abonnements, Wave et la plateforme Al Muxtaar.",
};

const FAQ_SECTIONS = [
  {
    category: "Général & Inscription",
    questions: [
      {
        q: "Qu'est-ce qu'Al_Muxtaar_Doc ?",
        a: "Al_Muxtaar_Doc est une plateforme éducative sénégalaise en ligne. Elle propose des cours complets, des fiches méthodes, des exercices corrigés et des quiz conformes au programme officiel du Sénégal.",
      },
      {
        q: "Comment créer un compte ?",
        a: "Cliquez sur 'S'inscrire', renseignez votre prénom, nom, classe, et votre numéro de téléphone sénégalais (+221). L'e-mail est facultatif.",
      },
      {
        q: "Puis-je utiliser la plateforme sur mon téléphone ?",
        a: "Oui, la plateforme a été conçue en priorité pour les smartphones. Elle consomme très peu de données Internet et fonctionne parfaitement en 3G et 4G.",
      },
    ],
  },
  {
    category: "Abonnements & Paiements",
    questions: [
      {
        q: "Combien coûte l'accès aux cours ?",
        a: "La formule 1 mois est à 700 FCFA. La formule 3 mois est à 2 000 FCFA. Il n'y a aucun frais caché ni prélèvement automatique.",
      },
      {
        q: "Quels sont les moyens de paiement acceptés ?",
        a: "Le paiement s'effectue directement via Wave avec un lien prérempli avec le montant de votre formule (700 ou 2 000 FCFA), compatible avec tous les smartphones (iOS / Android) et ordinateurs.",
      },
      {
        q: "En combien de temps mon compte est-il activé ?",
        a: "Dès que vous soumettez le code de transaction reçu par SMS, un administrateur vérifie et active votre compte en 5 à 30 minutes pendant la journée.",
      },
    ],
  },
  {
    category: "Contenus Pédagogiques",
    questions: [
      {
        q: "Les cours sont-ils conformes au programme du Sénégal ?",
        a: "Oui, à 100%. Les leçons et exercices sont rédigés par des professeurs selon les programmes et épreuves du Baccalauréat sénégalais.",
      },
      {
        q: "Y aura-t-il d'autres classes et matières ?",
        a: "Oui ! Nous commençons par la Terminale S2 en Mathématiques, puis nous ajouterons la Physique-Chimie, la SVT, ainsi que les classes de Première et Seconde.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full bg-turquoise-light px-3.5 py-1 text-xs font-bold text-turquoise mb-3">
          <Icon name="cours" size={16} />
          Centre d&apos;Aide
        </div>
        <h1 className="text-3xl font-black tracking-tight text-navy sm:text-4xl">
          Foire Aux Questions
        </h1>
        <p className="mt-2 text-sm text-navy-light">
          Vous avez des interrogations sur le fonctionnement de la plateforme ? Trouvez vos réponses ici.
        </p>
      </div>

      <div className="space-y-8">
        {FAQ_SECTIONS.map((sec, idx) => (
          <div key={idx} className="space-y-4">
            <h2 className="text-base font-bold text-turquoise uppercase tracking-wider">
              {sec.category}
            </h2>
            <div className="space-y-3">
              {sec.questions.map((item, qIdx) => (
                <div
                  key={qIdx}
                  className="rounded-2xl border border-surface-muted bg-white p-5 shadow-card"
                >
                  <h3 className="text-sm font-bold text-navy sm:text-base">{item.q}</h3>
                  <p className="mt-2 text-xs sm:text-sm text-navy-light leading-relaxed">
                    {item.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Reste des questions */}
      <div className="rounded-2xl bg-white border border-surface-muted p-8 text-center shadow-card">
        <h3 className="text-base font-bold text-navy">Vous n&apos;avez pas trouvé votre réponse ?</h3>
        <p className="mt-1 text-xs text-navy-light">
          Notre équipe d&apos;assistance est disponible 7j/7 sur WhatsApp pour vous aider.
        </p>
        <div className="mt-4">
          <Link href="/contact">
            <Button variant="primary" size="md">
              Contacter le support
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

