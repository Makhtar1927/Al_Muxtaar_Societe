import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Wallet, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Tarifs & Formules d'abonnement | Al_Muxtaar_Doc",
  description:
    "Des formules simples et accessibles dès 700 FCFA par mois. Paiement direct par Wave au Sénégal.",
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
    <div className="space-y-12 pb-16">
      {/* En-tête */}
      <section className="text-center pt-8 px-4 sm:px-6">
        <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full bg-turquoise-light px-3.5 py-1 text-xs font-bold text-turquoise">
          Tarification Solidaire &amp; Transparente
        </div>
        <h1 className="text-3xl font-black tracking-tight text-navy sm:text-5xl">
          Un investissement minime pour votre réussite au Bac.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-navy-light sm:text-lg">
          Payez en 1 clic directement via votre compte Wave avec le montant préinscrit, sans frais additionnels et sans engagement bancaire.
        </p>
      </section>

      {/* Grille des Formules */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          {PLANS.map((plan) => (
            <Card
              key={plan.id}
              variant={plan.popular ? "elevated" : "default"}
              className={`flex flex-col justify-between relative ${
                plan.popular ? "border-2 border-turquoise shadow-card-hover" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <Badge status="active" className="shadow-soft px-3 py-0.5 text-xs">
                    Recommandé pour le Bac
                  </Badge>
                </div>
              )}

              <CardHeader className={plan.popular ? "pt-7" : ""}>
                <CardTitle className="text-xl text-navy">{plan.name}</CardTitle>
                <CardDescription>{plan.duration}</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-black text-navy">{plan.price}</span>
                  <p className="text-xs text-turquoise font-medium mt-1">{plan.priceDaily}</p>
                </div>
              </CardHeader>

              <CardContent>
                <div className="border-t border-surface-muted pt-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-navy-light mb-3">
                    Ce qui est inclus :
                  </p>
                  <ul className="space-y-2.5">
                    {plan.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs text-navy">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-turquoise-light text-turquoise text-[10px] font-bold mt-0.5">
                          <Check className="w-3 h-3" strokeWidth={3} />
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>

              <CardFooter>
                <Link href="/inscription" className="w-full">
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
              <p className="mt-1 text-xs text-navy-light">Cliquez sur le lien Wave avec le montant préinscrit.</p>
            </div>
            <div className="rounded-2xl bg-surface p-5 border border-surface-muted">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-turquoise text-white font-bold mb-3">3</span>
              <h3 className="font-bold text-navy text-sm">Confirmez en un clic</h3>
              <p className="mt-1 text-xs text-navy-light">Cliquez sur &quot;J&apos;ai effectué mon paiement Wave&quot;.</p>
            </div>
            <div className="rounded-2xl bg-surface p-5 border border-surface-muted">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-turquoise text-white font-bold mb-3">4</span>
              <h3 className="font-bold text-navy text-sm">Accès ouvert</h3>
              <p className="mt-1 text-xs text-navy-light">L&apos;admin vérifie votre nom et active vos cours.</p>
            </div>
          </div>

          {/* Numéro Marchand Officiel Wave */}
          <div className="mt-8 rounded-2xl border border-[#1BAAF7]/30 bg-[#1BAAF7]/5 p-6 text-center max-w-2xl mx-auto">
            <h4 className="text-sm font-bold text-navy uppercase tracking-wider mb-2 flex items-center justify-center gap-2">
              <Wallet className="w-4 h-4 text-[#1BAAF7]" strokeWidth={2} />
              <span>Lien &amp; Numéro Officiels Wave — Al Muxtaar</span>
            </h4>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 text-xs sm:text-sm font-mono font-bold text-navy">
              <a
                href={`${waveBaseLink}?amount=700`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-[#1BAAF7] text-white px-4 py-2 shadow-soft hover:bg-[#0c85d0] transition-colors font-sans text-xs inline-flex items-center gap-1"
              >
                <span>Lien direct Wave (700 F)</span>
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
              </a>
              <a
                href={`${waveBaseLink}?amount=2000`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-[#1BAAF7] text-white px-4 py-2 shadow-soft hover:bg-[#0c85d0] transition-colors font-sans text-xs inline-flex items-center gap-1"
              >
                <span>Lien direct Wave (2 000 F)</span>
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2} />
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
              L&apos;activation est effectuée manuellement par notre équipe dès réception de votre transaction Wave. Elle intervient généralement entre 5 et 30 minutes pendant les heures ouvrées (8h - 22h).
            </p>
          </div>
          <div className="rounded-2xl bg-white p-5 border border-surface-muted shadow-card">
            <h4 className="text-sm font-bold text-navy">Y a-t-il un renouvellement automatique avec prélèvement ?</h4>
            <p className="mt-1 text-xs text-navy-light leading-relaxed">
              Non. Aucun prélèvement automatique n&apos;est effectué sur votre compte Wave. À l&apos;expiration de votre période, vous êtes libre de renouveler ou non.
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
