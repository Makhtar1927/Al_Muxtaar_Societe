import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { SENEGAL_CURRICULUM, getCurriculumStats } from "@/lib/curriculum/senegal-curriculum";

export const metadata: Metadata = {
  title: "Al_Muxtaar_Doc | Plateforme Nationale de Cours du Sénégal (Lycée & Collège)",
  description:
    "Réussissez vos examens officiels du Sénégal (Baccalauréat & BFEM). Cours interactifs, méthodes types, illustrations concrètes de la vie sénégalaise et repères pédagogiques en Wolof.",
};

export default function DocLandingPage() {
  const stats = getCurriculumStats();

  return (
    <div className="space-y-16 py-8 sm:space-y-20 sm:py-12">
      {/* Hero Section Généralisée */}
      <section className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-turquoise-light px-4 py-1.5 text-xs font-black text-turquoise border border-turquoise/20">
          <Icon name="doc" size={16} />
          RÉFÉRENTIEL PÉDAGOGIQUE NATIONAL DU SÉNÉGAL
        </div>
        <h1 className="text-3xl font-black tracking-tight text-navy sm:text-5xl lg:text-6xl">
          Toutes les séries du Lycée et du Collège, <br className="hidden sm:inline" />
          <span className="text-turquoise">structurées, vivantes et interactives</span>.
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-base text-navy-light sm:text-lg leading-relaxed">
          Conforme aux programmes officiels du <strong>Ministère de l&apos;Éducation Nationale (MEN / IGEF)</strong>. 
          De la 3e BFEM à la Terminale (S1, S2, L, G) : fiches de cours rigoureuses, méthodes types du Bac, 
          analogies de la vie sénégalaise et synthèses bilingues Wolof / Français.
        </p>

        {/* Chiffres clés du référentiel */}
        <div className="mx-auto mt-8 grid max-w-3xl grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border border-navy/10 bg-white p-3.5 shadow-sm">
            <span className="block text-2xl font-black text-navy">{stats.totalLevels} Niveaux</span>
            <span className="text-[11px] font-medium text-navy-light">3e BFEM, 2nde, 1ère, Tle</span>
          </div>
          <div className="rounded-2xl border border-navy/10 bg-white p-3.5 shadow-sm">
            <span className="block text-2xl font-black text-turquoise">{stats.totalTracks} Séries</span>
            <span className="text-[11px] font-medium text-navy-light">S1, S2, L2, L&apos;, G, Collège</span>
          </div>
          <div className="rounded-2xl border border-navy/10 bg-white p-3.5 shadow-sm">
            <span className="block text-2xl font-black text-gold">{stats.totalSubjects}+ Matières</span>
            <span className="text-[11px] font-medium text-navy-light">Maths, PC, SVT, Philo, etc.</span>
          </div>
          <div className="rounded-2xl border border-navy/10 bg-white p-3.5 shadow-sm">
            <span className="block text-2xl font-black text-coral">100% Officiel</span>
            <span className="text-[11px] font-medium text-navy-light">MEN & Office du Bac</span>
          </div>
        </div>

        {/* Boutons d'action */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link href="/doc/catalogue">
            <Button variant="primary" size="lg" className="w-full sm:w-auto font-black shadow-md">
              <Icon name="cours" size={20} className="mr-2" />
              Explorer tout le catalogue des cours
            </Button>
          </Link>
          <Link href="/doc/tarifs">
            <Button variant="outline" size="lg" className="w-full sm:w-auto font-bold">
              Formules & Tarifs (Dès 700 FCFA/mois)
            </Button>
          </Link>
        </div>
      </section>

      {/* Panorama des Niveaux & Séries du Sénégal */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-turquoise">
            Architecture du Système Éducatif Sénégalais
          </span>
          <h2 className="mt-1 text-2xl font-black text-navy sm:text-3xl">
            Choisissez votre niveau d&apos;études
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-xs sm:text-sm text-navy-light">
            Chaque filière dispose d&apos;un parcours adapté avec ses matières maîtresses et ses coefficients officiels.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {SENEGAL_CURRICULUM.map((level) => {
            const isTerminale = level.code === 'terminale';
            return (
              <div
                key={level.code}
                className={`relative flex flex-col justify-between rounded-2xl border bg-white p-6 shadow-sm transition-all hover:shadow-md ${
                  isTerminale ? 'border-turquoise ring-2 ring-turquoise/20' : 'border-navy/10'
                }`}
              >
                {isTerminale && (
                  <div className="absolute -top-3 right-4 rounded-full bg-turquoise px-3 py-0.5 text-[10px] font-black uppercase text-white shadow">
                    Module Opérationnel Actif
                  </div>
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-lg bg-turquoise-light px-2.5 py-1 text-xs font-black text-turquoise">
                      {level.cycle}
                    </span>
                  </div>
                  <h3 className="mt-3 text-xl font-black text-navy">{level.name}</h3>
                  <p className="mt-1 text-xs font-semibold text-gold">{level.examName}</p>
                  <p className="mt-2 text-xs text-navy-light leading-relaxed">
                    {level.description}
                  </p>

                  <div className="mt-4 space-y-2 border-t border-navy/5 pt-3">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-navy/60">
                      Séries disponibles :
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {level.tracks.map((trk) => (
                        <span
                          key={trk.code}
                          className="rounded-md bg-surface px-2 py-0.5 text-[11px] font-bold text-navy"
                        >
                          {trk.shortName}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-navy/5">
                  <Link
                    href={`/doc/catalogue?level=${level.code}`}
                    className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-surface py-2.5 text-xs font-bold text-navy hover:bg-turquoise hover:text-white transition-colors"
                  >
                    <span>Voir les matières & programmes</span>
                    <Icon name="chevron_right" size={14} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Focus : Le Pilote Opérationnel d'Excellence (Terminale S2 Maths) */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border-2 border-turquoise bg-gradient-to-br from-turquoise/5 via-white to-gold/5 p-6 sm:p-10 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-navy/10 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-turquoise px-3 py-1 text-xs font-bold text-white shadow-sm">
                <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
                PILOTE 100% OPÉRATIONNEL & ENRICHI
              </div>
              <h3 className="mt-3 text-2xl font-black text-navy sm:text-3xl">
                Terminale S2 · Mathématiques (13 Chapitres Complets)
              </h3>
              <p className="mt-1 text-sm text-navy-light">
                Le programme complet du Baccalauréat sénégalais prêt à l&apos;emploi avec infographies vectorielles, analogies locales et simulateurs.
              </p>
            </div>
            <Link href="/cours/terminale/s2/mathematiques">
              <Button variant="primary" size="lg" className="font-black shadow-md">
                Accéder directement aux cours
                <Icon name="arrow_right" size={18} className="ml-2" />
              </Button>
            </Link>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white p-4 border border-navy/10 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-turquoise-light">
                <Icon name="metaphores" size={40} />
              </div>
              <h4 className="mt-2 text-sm font-bold text-navy">Métaphores Vivantes</h4>
              <p className="mt-1 text-xs text-navy-light leading-relaxed">
                Le TER de Diamniadio pour les limites, le phare des Mamelles pour la dérivation, le marché Sandaga pour les séries statistiques.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-4 border border-navy/10 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-light">
                <Icon name="wolof" size={40} />
              </div>
              <h4 className="mt-2 text-sm font-bold text-navy">Xam-xam ci Wolof</h4>
              <p className="mt-1 text-xs text-navy-light leading-relaxed">
                Des encadrés bilingues Wolof / Français pour débloquer l&apos;intuition profonde sur les théorèmes ardus (TVI, bijection, récurrence).
              </p>
            </div>

            <div className="rounded-2xl bg-white p-4 border border-navy/10 shadow-sm">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-coral-light">
                <Icon name="reflexes" size={40} />
              </div>
              <h4 className="mt-2 text-sm font-bold text-navy">Simulateurs &amp; Réflexes</h4>
              <p className="mt-1 text-xs text-navy-light leading-relaxed">
                Cartes réflexes du Baccalauréat et simulateurs interactifs pour manipuler les paramètres en direct sur mobile.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Les 4 Piliers Pédagogiques */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-turquoise">
            Méthodologie Al Muxtaar
          </span>
          <h2 className="text-2xl font-black text-navy sm:text-3xl">
            La structure d&apos;apprentissage de chaque cours
          </h2>
          <p className="mt-2 text-sm text-navy-light">
            Une architecture éprouvée appliquée à l&apos;ensemble des disciplines scientifiques, littéraires et techniques.
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
                Formules mathématiques en KaTeX, propriétés clés encadrées, infographies vectorielles SVG et synthèses claires.
              </p>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-gold">
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-light text-[#A86E00]">
                <Icon name="orientation" size={28} />
              </div>
              <CardTitle>2. Méthodes Types & Réflexes</CardTitle>
              <CardDescription>Les automatismes de l&apos;examen</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-navy-light leading-relaxed">
                Comment démarrer une démonstration ? Les pièges classiques des correcteurs du Baccalauréat et les réflexes infaillibles.
              </p>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-turquoise">
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-turquoise-light text-turquoise">
                <Icon name="developpement" size={28} />
              </div>
              <CardTitle>3. Exercices Corrigés</CardTitle>
              <CardDescription>Du basique aux annales du Bac</CardDescription>
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
                Testez vos connaissances à la fin de chaque leçon avec un score immédiat, explications et suivi dans votre tableau de bord.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Appel à l'action final */}
      <section className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <div className="rounded-3xl bg-navy p-8 text-white shadow-xl sm:p-12">
          <Icon name="abonnement" size={48} className="mx-auto mb-4 text-turquoise" />
          <h2 className="text-2xl font-black sm:text-3xl">
            Préparez votre mention au Bac et au BFEM dès aujourd&apos;hui
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-surface-muted leading-relaxed">
            Rejoignez la plateforme éducative de référence au Sénégal. Activez votre compte en moins de 2 minutes par Wave ou Orange Money.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto sm:max-w-none">
            <Link href="/doc/catalogue" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto font-black shadow-md">
                Consulter tous les programmes
              </Button>
            </Link>
            <Link href="/doc/tarifs" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-white text-navy font-black border-2 border-white hover:bg-white/90 shadow-md"
              >
                Voir les formules d&apos;abonnement
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
