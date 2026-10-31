import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";

export const metadata: Metadata = {
  title: "Al_Muxtaar_Doc | Cours en ligne conformes au programme sénégalais",
  description:
    "Révisez le Baccalauréat sénégalais en ligne : cours complets de Terminale S2 en Mathématiques, exercices d'application corrigés pas à pas et quiz d'auto-évaluation.",
};

export default function DocLandingPage() {
  return (
    <div className="space-y-16 py-8 sm:space-y-20 sm:py-12">
      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-turquoise-light px-3.5 py-1 text-xs font-bold text-turquoise">
          <Icon name="doc" size={16} />
          Module Éducatif Al_Muxtaar_Doc
        </div>
        <h1 className="text-3xl font-black tracking-tight text-navy sm:text-5xl">
          Tous vos cours du Baccalauréat, <br className="hidden sm:inline" />
          structurés et interactifs sur mobile.
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-navy-light sm:text-lg">
          Fini les polycopiés illisibles et les PDF lourds à télécharger. Accédez à des leçons enrichies, des méthodes types détaillées et des quiz instantanés.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/doc/catalogue">
            <Button variant="primary" size="lg" className="w-full sm:w-auto">
              <Icon name="cours" size={20} className="mr-2" />
              Consulter le catalogue (Terminale S2)
            </Button>
          </Link>
          <Link href="/doc/tarifs">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Voir les tarifs (700 FCFA/mois)
            </Button>
          </Link>
        </div>
      </section>

      {/* Les 4 Piliers Pédagogiques */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-black text-navy sm:text-3xl">
            La méthode Al_Muxtaar_Doc
          </h2>
          <p className="mt-2 text-sm text-navy-light">
            Une structure de cours identique pour chaque chapitre, pensée pour maximiser la mémorisation et la réussite à l&apos;examen.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-t-4 border-t-turquoise">
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-turquoise-light text-turquoise">
                <Icon name="cours" size={28} />
              </div>
              <CardTitle>1. Cours & Théorèmes</CardTitle>
              <CardDescription>Rappels essentiels et définitions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-navy-light leading-relaxed">
                Formules mathématiques rendues au millimètre près en KaTeX, propriétés clés encadrées et synthèses visuelles.
              </p>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-gold">
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-light text-[#A86E00]">
                <Icon name="orientation" size={28} />
              </div>
              <CardTitle>2. Méthodes Types</CardTitle>
              <CardDescription>Les automatismes du Bac</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-navy-light leading-relaxed">
                Comment lever une indétermination ? Comment prouver une bijection ? Des guides méthodologiques étape par étape.
              </p>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-turquoise">
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-turquoise-light text-turquoise">
                <Icon name="developpement" size={28} />
              </div>
              <CardTitle>3. Exercices Corrigés</CardTitle>
              <CardDescription>Du basique au niveau d&apos;examen</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-navy-light leading-relaxed">
                Exercices gradués (difficulté 1 à 3) avec solutions détaillées masquées derrière un bouton pour chercher par soi-même.
              </p>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-coral">
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-coral-light text-coral">
                <Icon name="quiz" size={28} />
              </div>
              <CardTitle>4. Quiz & Progression</CardTitle>
              <CardDescription>Auto-évaluation en direct</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-navy-light leading-relaxed">
                Testez vos connaissances à la fin de chaque leçon avec un score immédiat et des explications sur chaque réponse.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Aperçu gratuit : Exemple d'une leçon */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="rounded-2xl border-2 border-dashed border-turquoise/40 bg-white p-6 sm:p-8 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-surface-muted pb-4">
            <div className="flex items-center gap-2">
              <Badge status="active">Aperçu Gratuit</Badge>
              <span className="text-xs font-semibold text-navy-light">Terminale S2 · Mathématiques</span>
            </div>
            <span className="text-xs font-bold text-turquoise">Chapitre 1 : Limites et Continuité</span>
          </div>

          <div className="mt-6 space-y-4">
            <h3 className="text-lg font-bold text-navy sm:text-xl">
              Leçon 1 : Notion de limite en un point et formes indéterminées
            </h3>
            <p className="text-xs sm:text-sm text-navy-light leading-relaxed">
              En classe de Terminale S2, l&apos;étude des limites constitue le socle fondamental pour aborder la dérivation et les études de fonctions. Rappelons les quatre formes indéterminées majeures :
            </p>

            {/* Formules LaTeX stylisées */}
            <div className="rounded-xl bg-surface p-4 text-center font-mono text-sm text-navy font-bold border border-surface-muted">
              <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
                <span className="rounded bg-white px-2.5 py-1 border border-navy/10">0 / 0</span>
                <span className="rounded bg-white px-2.5 py-1 border border-navy/10">∞ / ∞</span>
                <span className="rounded bg-white px-2.5 py-1 border border-navy/10">0 × ∞</span>
                <span className="rounded bg-white px-2.5 py-1 border border-navy/10">+∞ - ∞</span>
              </div>
            </div>

            <div className="rounded-xl border border-turquoise/20 bg-turquoise-light/30 p-4">
              <h4 className="text-xs font-bold text-turquoise uppercase tracking-wider">
                Méthode Type : Factorisation par le terme prépondérant
              </h4>
              <p className="mt-1 text-xs text-navy-light">
                Lorsque x tend vers l&apos;infini dans une fraction rationnelle, factorisez au numérateur et au dénominateur par la plus haute puissance de x pour lever l&apos;indétermination.
              </p>
            </div>
          </div>

          <div className="mt-8 rounded-xl bg-surface p-4 text-center sm:flex sm:items-center sm:justify-between sm:text-left">
            <div>
              <h4 className="text-sm font-bold text-navy">Envie de débloquer l&apos;ensemble du programme ?</h4>
              <p className="text-xs text-navy-light">
                Accédez à toutes les leçons, exercices et quiz de Terminale S2 Maths pour seulement 700 FCFA.
              </p>
            </div>
            <div className="mt-3 sm:mt-0">
              <Link href="/doc/tarifs">
                <Button variant="primary" size="md">
                  Débloquer les cours
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Appel à l'action final */}
      <section className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <div className="rounded-2xl bg-navy p-8 text-white shadow-soft sm:p-12">
          <Icon name="abonnement" size={48} className="mx-auto mb-4" />
          <h2 className="text-2xl font-black sm:text-3xl">
            Préparez votre mention au Bac dès aujourd&apos;hui
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-surface-muted">
            Rejoignez la communauté des élèves déterminés à réussir. Abonnez-vous en moins de 2 minutes avec Wave ou Orange Money.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/doc/tarifs">
              <Button variant="primary" size="lg">
                Voir les formules d&apos;abonnement
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                Poser une question sur WhatsApp
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

