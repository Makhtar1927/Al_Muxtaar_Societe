import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { Avatar } from "@/components/ui/avatar";

export const metadata: Metadata = {
  title: "Al_Muxtaar_Société | Plateforme Éducative & Numérique du Sénégal",
  description:
    "La plateforme sénégalaise tout-en-un : cours interactifs conformes au programme officiel (Terminale S2 Maths), services numériques et boutique.",
};

export default function HomePage() {
  return (
    <div className="space-y-16 py-8 sm:space-y-24 sm:py-12">
      {/* Hero Section */}
      <section className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-turquoise-light px-3.5 py-1 text-xs font-bold text-turquoise">
          <span className="h-2 w-2 rounded-full bg-turquoise animate-pulse" />
          Conforme au Programme Officiel Sénégalais
        </div>
        <h1 className="text-3xl font-black tracking-tight text-navy sm:text-5xl lg:text-6xl">
          L&apos;excellence scolaire à portée de main pour chaque élève.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-navy-light sm:text-lg">
          Révisez vos cours, maîtrisez les méthodes types du Baccalauréat et évaluez-vous avec des quiz interactifs, directement sur votre téléphone.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/doc">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              <Icon name="cours" size={20} className="mr-2" />
              Découvrir Al_Muxtaar_Doc
            </Button>
          </Link>
          <Link href="/doc/tarifs">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Voir les formules (Dès 700 FCFA)
            </Button>
          </Link>
        </div>

        {/* Quick Highlights */}
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3 text-left">
          <div className="flex items-center gap-3 rounded-2xl bg-white p-4 border border-surface-muted shadow-card">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-turquoise-light text-turquoise">
              <Icon name="cours" size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-navy">Programme Officiel</h4>
              <p className="text-xs text-navy-light">Terminale S2 Mathématiques</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-white p-4 border border-surface-muted shadow-card">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gold-light text-[#A86E00]">
              <Icon name="paiement" size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-navy">Wave & Orange Money</h4>
              <p className="text-xs text-navy-light">Dès 700 FCFA / mois</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-white p-4 border border-surface-muted shadow-card">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-turquoise-light text-turquoise">
              <Icon name="hors_ligne" size={24} />
            </div>
            <div>
              <h4 className="text-sm font-bold text-navy">Mobile First</h4>
              <p className="text-xs text-navy-light">Optimisé pour réseau 3G/4G</p>
            </div>
          </div>
        </div>
      </section>

      {/* Les 3 Modules de la Plateforme */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-black text-navy sm:text-3xl">
            L&apos;Écosystème Al Muxtaar Société
          </h2>
          <p className="mt-2 text-sm text-navy-light max-w-xl mx-auto">
            Trois modules complémentaires conçus pour accompagner la réussite scolaire et professionnelle au Sénégal.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Module 1 : Al_Muxtaar_Doc */}
          <Card variant="elevated" className="flex flex-col justify-between border-2 border-turquoise/40">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Icon name="doc" size={40} />
                <Badge status="active">Module Actif</Badge>
              </div>
              <CardTitle>Al_Muxtaar_Doc</CardTitle>
              <CardDescription>
                Plateforme de cours en ligne conforme aux programmes sénégalais.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-navy-light leading-relaxed">
                Retrouvez l&apos;intégralité du programme officiel de <strong>Terminale S2 en Mathématiques</strong> :
                cours structurés, rappels de cours, exercices d&apos;application corrigés et quiz interactifs avec suivi de progression.
              </p>
              <div className="mt-4 rounded-xl bg-turquoise-light/40 p-3 text-xs text-turquoise font-semibold flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-turquoise" />
                Formule dès 700 FCFA / mois
              </div>
            </CardContent>
            <CardFooter>
              <Link href="/doc" className="w-full">
                <Button variant="primary" className="w-full">
                  Découvrir les cours
                </Button>
              </Link>
            </CardFooter>
          </Card>

          {/* Module 2 : Al_Muxtaar_Service */}
          <Card className="flex flex-col justify-between opacity-90">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Icon name="service" size={40} />
                <Badge status="pending">Phase 2 — Bientôt</Badge>
              </div>
              <CardTitle>Al_Muxtaar_Service</CardTitle>
              <CardDescription>
                Services et ingénierie numérique pour professionnels et étudiants.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-navy-light leading-relaxed">
                Développement de solutions web et mobiles sur mesure, maintenance de parcs informatiques,
                et accompagnement en orientation académique et technologique.
              </p>
              <div className="mt-4 rounded-xl bg-surface p-3 text-xs text-navy-light">
                Lancement prévu après le déploiement du module Doc.
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" disabled>
                Bientôt disponible
              </Button>
            </CardFooter>
          </Card>

          {/* Module 3 : Al_Muxtaar_Boutique */}
          <Card className="flex flex-col justify-between opacity-90">
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Icon name="boutique" size={40} />
                <Badge status="pending">Phase 3 — Bientôt</Badge>
              </div>
              <CardTitle>Al_Muxtaar_Boutique</CardTitle>
              <CardDescription>
                Matériels informatiques et ressources numériques de qualité.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-navy-light leading-relaxed">
                Vente d&apos;ordinateurs portables, accessoires connectés, manuels et fournitures scolaires,
                avec service de livraison rapide partout à Dakar et dans les régions du Sénégal.
              </p>
              <div className="mt-4 rounded-xl bg-surface p-3 text-xs text-navy-light">
                Catalogue en cours de sélection avec nos partenaires.
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" disabled>
                Bientôt disponible
              </Button>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* Comment s'abonner en 4 étapes simples */}
      <section className="bg-white border-y border-surface-muted py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-black text-navy sm:text-3xl">
              Comment rejoindre Al_Muxtaar_Doc ?
            </h2>
            <p className="mt-2 text-sm text-navy-light">
              Un parcours d&apos;inscription fluide pensé pour le Sénégal, sans carte bancaire requise.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-surface-muted bg-surface/40 p-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-turquoise text-white font-black text-lg">
                1
              </div>
              <h3 className="text-base font-bold text-navy">Créez votre compte</h3>
              <p className="mt-2 text-xs text-navy-light">
                Inscrivez-vous en quelques secondes avec votre numéro de téléphone sénégalais (+221).
              </p>
            </div>

            <div className="rounded-2xl border border-surface-muted bg-surface/40 p-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-turquoise text-white font-black text-lg">
                2
              </div>
              <h3 className="text-base font-bold text-navy">Choisissez votre formule</h3>
              <p className="mt-2 text-xs text-navy-light">
                Optez pour 1 mois (700 FCFA) ou 3 mois (2 000 FCFA) avec accès à l&apos;ensemble des chapitres.
              </p>
            </div>

            <div className="rounded-2xl border border-surface-muted bg-surface/40 p-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-turquoise text-white font-black text-lg">
                3
              </div>
              <h3 className="text-base font-bold text-navy">Réglez par Wave ou OM</h3>
              <p className="mt-2 text-xs text-navy-light">
                Envoyez le montant sur nos numéros marchands officiels et collez votre code de transaction.
              </p>
            </div>

            <div className="rounded-2xl border border-surface-muted bg-surface/40 p-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-turquoise text-white font-black text-lg">
                4
              </div>
              <h3 className="text-base font-bold text-navy">Activation & Révisions</h3>
              <p className="mt-2 text-xs text-navy-light">
                Votre abonnement est validé en quelques minutes par l&apos;administrateur. Révisez 24h/24 !
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link href="/doc/tarifs">
              <Button variant="primary" size="lg">
                Voir toutes les formules et souscrire
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Témoignages & Rassurance */}
      <section className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        <h2 className="text-2xl font-black text-navy sm:text-3xl">
          Conçu avec les élèves et enseignants
        </h2>
        <p className="mt-2 text-sm text-navy-light">
          Une pédagogie moderne qui met l&apos;accent sur la rigueur et l&apos;acquisition des automatismes d&apos;examen.
        </p>

        <div className="mt-8 grid gap-6 sm:grid-cols-3 text-left">
          <div className="rounded-2xl bg-white p-6 border border-surface-muted shadow-card flex flex-col justify-between">
            <p className="text-xs text-navy-light italic leading-relaxed">
              « Les cours sont ultra clairs avec les formules mathématiques bien présentées. On comprend enfin les subtilités du programme de maths en S2 ! »
            </p>
            <div className="mt-4 flex items-center gap-3">
              <Avatar name="avatar_01_eleve_garcon" size="sm" />
              <div>
                <h4 className="text-xs font-bold text-navy">Amadou D.</h4>
                <p className="text-[10px] text-navy-light">Élève en Terminale S2, Dakar</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 border border-surface-muted shadow-card flex flex-col justify-between">
            <p className="text-xs text-navy-light italic leading-relaxed">
              « Le paiement par Wave sans carte bancaire est très pratique. Mon compte a été activé très rapidement après l&apos;envoi du numéro de reçu. »
            </p>
            <div className="mt-4 flex items-center gap-3">
              <Avatar name="avatar_03_eleve_fille_tresses" size="sm" />
              <div>
                <h4 className="text-xs font-bold text-navy">Fatou B.</h4>
                <p className="text-[10px] text-navy-light">Candidate au Bac S2, Thiès</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white p-6 border border-surface-muted shadow-card flex flex-col justify-between">
            <p className="text-xs text-navy-light italic leading-relaxed">
              « Un excellent complément pour travailler les automatismes à la maison sur son smartphone, sans gaspiller son forfait Internet. »
            </p>
            <div className="mt-4 flex items-center gap-3">
              <Avatar name="avatar_05_enseignant" size="sm" />
              <div>
                <h4 className="text-xs font-bold text-navy">M. Ndiaye</h4>
                <p className="text-[10px] text-navy-light">Professeur de Mathématiques</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

