import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";

export const metadata: Metadata = {
  title: "Tarifs & Formules d'abonnement | Al_Muxtaar_Doc",
  description:
    "Des formules simples et accessibles dès 700 FCFA par mois. Paiement direct par Wave et Orange Money au Sénégal.",
};

const PLANS = [
  {
    id: "1-mois",
    name: "Formule 1 Mois",
    duration: "30 jours d'accès illimité",
    price: "700 FCFA",
    priceDaily: "Soit environ 23 FCFA / jour",
    popular: false,
    features: [
      "Accès complet à tous les chapitres de Terminale S2 Maths",
      "Exercices d'application corrigés pas à pas",
      "Quiz interactifs avec correction détaillée",
      "Suivi de votre progression personnelle",
      "Consultation mobile fluide et légère",
    ],
  },
  {
    id: "3-mois",
    name: "Formule Trimestrielle (3 Mois)",
    duration: "90 jours d'accès illimité",
    price: "2 000 FCFA",
    priceDaily: "Soit 666 FCFA / mois (Économie immédiate)",
    popular: true,
    features: [
      "Accès complet à tous les chapitres de Terminale S2 Maths",
      "Exercices d'application corrigés pas à pas",
      "Quiz interactifs avec correction détaillée",
      "Suivi de votre progression personnelle",
      "Consultation mobile fluide et légère",
      "Idéal pour préparer les compositions et le Bac",
    ],
  },
];

export default function TarifsPage() {
  const waveNumber = process.env.NEXT_PUBLIC_WAVE_MERCHANT_NUMBER || "+221 77 247 69 26";
  const waveBaseLink = process.env.NEXT_PUBLIC_WAVE_LINK || "https://pay.wave.com/m/M_sn_2MOwdjUaQWQJ/c/sn/";

  return (
    <div className="space-y-16 py-8 sm:space-y-20 sm:py-12">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-gold-light px-3.5 py-1 text-xs font-bold text-[#A86E00]">
          <Icon name="abonnement" size={16} />
          Tarifs Transparents & Sans Engagement
        </div>
        <h1 className="text-3xl font-black tracking-tight text-navy sm:text-5xl">
          Un investissement minime pour votre réussite au Bac.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-navy-light sm:text-lg">
          Payez en 1 clic directement via votre compte Wave avec le montant préinscrit, sans frais additionnels et sans engagement bancaire.
        </p>
      </section>

      {/* Grille des 2 Formules */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2">
          {PLANS.map((plan) => (
            <Card
              key={plan.id}
              variant={plan.popular ? "elevated" : "default"}
              className={plan.popular ? "relative border-2 border-turquoise shadow-hover" : ""}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-turquoise px-4 py-1 text-xs font-black text-white shadow-soft">
                    FORMULE LA PLUS POPULAIRE
                  </span>
                </div>
              )}
              <CardHeader className={plan.popular ? "pt-8" : ""}>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl sm:text-2xl">{plan.name}</CardTitle>
                  <Badge status="active">{plan.duration}</Badge>
                </div>
                <div className="mt-4">
                  <span className="text-3xl font-black text-navy sm:text-4xl">
                    {plan.price}
                  </span>
                  <p className="mt-1 text-xs font-semibold text-turquoise">
                    {plan.priceDaily}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-xs font-bold text-navy uppercase tracking-wider">
                  Ce qui est inclus :
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-navy-light">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-turquoise-light text-turquoise text-[10px] font-bold">
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-4">
                <Link href="/abonnement" className="w-full">
                  <Button
                    variant={plan.popular ? "primary" : "outline"}
                    size="lg"
                    className="w-full"
                  >
                    Choisir cette formule
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Guide en 4 étapes */}
      <section className="bg-white border-y border-surface-muted py-12 sm:py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-black text-navy sm:text-3xl mb-8">
            Comment activer votre accès en 4 étapes
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-center">
            <div className="rounded-2xl bg-surface p-5 border border-surface-muted">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-turquoise text-white font-bold mb-3">1</span>
              <h3 className="font-bold text-navy text-sm">Créez un compte</h3>
              <p className="mt-1 text-xs text-navy-light">Votre numéro de téléphone (+221) suffit.</p>
            </div>
            <div className="rounded-2xl bg-surface p-5 border border-surface-muted">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-turquoise text-white font-bold mb-3">2</span>
              <h3 className="font-bold text-navy text-sm">Paiement 1 clic Wave</h3>
              <p className="mt-1 text-xs text-navy-light">Cliquez sur le lien Wave officiel avec le montant préinscrit.</p>
            </div>
            <div className="rounded-2xl bg-surface p-5 border border-surface-muted">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-turquoise text-white font-bold mb-3">3</span>
              <h3 className="font-bold text-navy text-sm">Envoyez la preuve</h3>
              <p className="mt-1 text-xs text-navy-light">Collez votre code de transaction Wave reçu par SMS.</p>
            </div>
            <div className="rounded-2xl bg-surface p-5 border border-surface-muted">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-turquoise text-white font-bold mb-3">4</span>
              <h3 className="font-bold text-navy text-sm">Accès ouvert</h3>
              <p className="mt-1 text-xs text-navy-light">Validation de l&apos;admin et déblocage de vos cours.</p>
            </div>
          </div>

          {/* Numéro Marchand Officiel Wave */}
          <div className="mt-8 rounded-2xl border border-[#1BAAF7]/30 bg-[#1BAAF7]/5 p-6 text-center max-w-2xl mx-auto">
            <h4 className="text-sm font-bold text-navy uppercase tracking-wider mb-2 flex items-center justify-center gap-2">
              <span>🌊</span>
              <span>Lien & Numéro Officiels Wave — Al Muxtaar</span>
            </h4>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 text-xs sm:text-sm font-mono font-bold text-navy">
              <a
                href={`${waveBaseLink}?amount=700`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-[#1BAAF7] text-white px-4 py-2 shadow-soft hover:bg-[#0c85d0] transition-colors font-sans text-xs"
              >
                Lien direct Wave (700 F) ↗
              </a>
              <a
                href={`${waveBaseLink}?amount=2000`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-[#1BAAF7] text-white px-4 py-2 shadow-soft hover:bg-[#0c85d0] transition-colors font-sans text-xs"
              >
                Lien direct Wave (2 000 F) ↗
              </a>
              <span className="rounded-xl bg-white px-3.5 py-2 border border-surface-muted shadow-card font-mono">
                Numéro : {waveNumber}
              </span>
            </div>
            <p className="mt-3 text-[11px] text-navy-light">
              Bénéficiaire : <strong>Al Muxtaar Société</strong> · Ne transférez jamais vers un autre numéro non répertorié.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Rapide Tarifs */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="text-xl font-bold text-navy text-center mb-6">
          Questions fréquentes sur les abonnements
        </h2>
        <div className="space-y-4 text-left">
          <div className="rounded-2xl bg-white p-5 border border-surface-muted shadow-card">
            <h4 className="text-sm font-bold text-navy">Quel est le délai d&apos;activation de mon compte ?</h4>
            <p className="mt-1 text-xs text-navy-light leading-relaxed">
              L&apos;activation est effectuée manuellement par notre équipe dès réception de votre transaction. Elle intervient généralement entre 5 et 30 minutes pendant les heures ouvrées (8h - 22h).
            </p>
          </div>
          <div className="rounded-2xl bg-white p-5 border border-surface-muted shadow-card">
            <h4 className="text-sm font-bold text-navy">Y a-t-il un renouvellement automatique avec prélèvement ?</h4>
            <p className="mt-1 text-xs text-navy-light leading-relaxed">
              Non. Aucun prélèvement automatique n&apos;est effectué sur votre compte Wave ou Orange Money. À l&apos;expiration de votre période, vous êtes libre de renouveler ou non.
            </p>
          </div>
          <div className="rounded-2xl bg-white p-5 border border-surface-muted shadow-card">
            <h4 className="text-sm font-bold text-navy">Que se passe-t-il si je renouvelle avant la fin de mon mois ?</h4>
            <p className="mt-1 text-xs text-navy-light leading-relaxed">
              Vous ne perdez aucun jour ! La nouvelle période de 30 ou 90 jours s&apos;ajoute automatiquement à la suite de votre date d&apos;expiration actuelle.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

