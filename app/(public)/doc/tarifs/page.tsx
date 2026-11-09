import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Tarifs & Formules d'abonnement | Al_Muxtaar_Doc",
  description:
    "Accès à toute la plateforme nationale sénégalaise (Lycée & Collège) dès 700 FCFA par mois. Paiement direct par Wave ou Orange Money.",
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
      "Accès complet aux cours actifs : Terminale S2 Mathématiques (13 chapitres)",
      "Accès immédiat aux nouveaux cours publiés (S1, L2, PC, SVT…)",
      "Exercices d'application corrigés pas à pas",
      "Quiz interactifs avec score et correction détaillée",
      "Suivi de votre progression personnelle",
      "Consultation mobile fluide et légère (3G compatible)",
    ],
  },
  {
    id: "3-mois",
    name: "Formule Trimestrielle (3 Mois)",
    duration: "90 jours d'accès illimité",
    price: "2 000 FCFA",
    priceDaily: "Soit 666 FCFA / mois — Économie immédiate",
    popular: false,
    features: [
      "Accès complet aux cours actifs : Terminale S2 Mathématiques (13 chapitres)",
      "Accès immédiat aux nouveaux cours publiés (S1, L2, PC, SVT…)",
      "Exercices d'application corrigés pas à pas",
      "Quiz interactifs avec score et correction détaillée",
      "Suivi de votre progression personnelle",
      "Consultation mobile fluide et légère (3G compatible)",
      "Fiches réflexes Bac & simulateurs interactifs inclus",
      "Idéal pour couvrir toutes les compositions trimestrielles + Bac",
    ],
  },
  {
    id: "1-an",
    name: "Formule Annuelle (1 An)",
    duration: "365 jours d'accès illimité",
    price: "5 000 FCFA",
    priceDaily: "Soit 416 FCFA / mois — Meilleure économie de l'année",
    popular: true,
    features: [
      "Accès complet aux cours actifs : Terminale S2 Mathématiques (13 chapitres)",
      "Accès immédiat aux nouveaux cours publiés (S1, L2, PC, SVT\u2026)",
      "Exercices d'application corrigés pas à pas",
      "Quiz interactifs avec score et correction détaillée",
      "Suivi de votre progression personnelle",
      "Consultation mobile fluide et légère (3G compatible)",
      "Fiches réflexes Bac & simulateurs interactifs inclus",
      "Couvre toute l'année scolaire sans interruption",
      "Idéal pour réviser sereinement jusqu'au Baccalauréat",
    ],
  },
];

export default function TarifsPage() {
  return (
    <div className="space-y-12 pb-16">
      {/* En-tête */}
      <section className="text-center pt-8 px-4 sm:px-6">
        <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full bg-turquoise-light px-3.5 py-1 text-xs font-bold text-turquoise">
          Tarification Solidaire &amp; Transparente
        </div>
        <h1 className="text-3xl font-black tracking-tight text-navy sm:text-5xl">
          Un accès à toute la plateforme nationale sénégalaise.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-navy-light sm:text-lg">
          Un seul abonnement couvre l&apos;ensemble du référentiel : Terminale (S1, S2, L, G), 
          Première, Seconde et Collège (BFEM). Payez en 1 clic par Wave ou Orange Money, 
          sans engagement bancaire ni frais additionnels.
        </p>
      </section>

      {/* Grille des Formules */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 md:grid-cols-3">
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
          <div className="rounded-2xl bg-white p-5 border border-surface-muted shadow-card">
            <h4 className="text-sm font-bold text-navy">Mon abonnement couvre-t-il toutes les séries (S1, L2, PC…) ?</h4>
            <p className="mt-1 text-xs text-navy-light leading-relaxed">
              Oui. Un seul abonnement donne accès à l&apos;intégralité de la plateforme : tous les cours publiés et toutes les nouvelles matières publiées au fil de la numérisation (S1, L2, Physique-Chimie, SVT, Philosophie, 3e BFEM…). Dès qu&apos;un cours est validé et mis en ligne par l&apos;équipe, il est immédiatement disponible pour tous les abonnés actifs.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
