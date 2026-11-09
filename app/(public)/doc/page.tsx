import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { SENEGAL_CURRICULUM, getCurriculumStats } from "@/lib/curriculum/senegal-curriculum";
import { Smartphone, Sparkles, BookOpen, ShieldCheck, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Al_Muxtaar_Doc | Plateforme Nationale de Cours du Sénégal (Lycée & Collège)",
  description:
    "Réussissez vos examens officiels du Sénégal (Baccalauréat & BFEM). Cours interactifs, méthodes types, illustrations concrètes de la vie sénégalaise et repères pédagogiques en Wolof.",
};

export default function DocLandingPage() {
  const stats = getCurriculumStats();

  return (
    <div className="space-y-16 py-8 sm:space-y-20 sm:py-12">
      {/* ── Hero Section Al_Muxtaar_Doc avec Illustration Officielle Réactive ── */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Colonne Gauche : Texte de Présentation, Programmes & Call-To-Action */}
          <div className="text-center lg:col-span-7 lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-turquoise-light px-3.5 py-1.5 text-xs font-black text-turquoise border border-turquoise/30 shadow-xs">
              <Icon name="doc" size={16} />
              <span>RÉFÉRENTIEL PÉDAGOGIQUE NATIONAL DU SÉNÉGAL</span>
            </div>

            <h1 className="text-3xl font-black tracking-tight text-navy sm:text-4xl md:text-5xl lg:text-[46px] xl:text-[52px] leading-[1.12]">
              Toutes les séries du Lycée et du Collège,{" "}
              <span className="text-turquoise block sm:inline">
                structurées, vivantes &amp; sur mobile.
              </span>
            </h1>

            <p className="mx-auto lg:mx-0 max-w-2xl text-sm sm:text-base text-navy-light leading-relaxed">
              Conforme aux programmes officiels du <strong>Ministère de l&apos;Éducation Nationale</strong>. 
              De la 3e BFEM à la Terminale (S1, S2, L, G) : cours complets, automatismes du Baccalauréat, 
              analogies de la vie sénégalaise et fiches d&apos;exercices interactifs conçues pour smartphone.
            </p>

            {/* Chiffres clés du référentiel */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 max-w-xl mx-auto lg:mx-0 pt-1">
              <div className="rounded-2xl border border-navy/10 bg-white p-3 text-center shadow-xs">
                <span className="block text-xl sm:text-2xl font-black text-navy">{stats.totalLevels} Niveaux</span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-navy-light">3e, 2nde, 1ère, Tle</span>
              </div>
              <div className="rounded-2xl border border-navy/10 bg-white p-3 text-center shadow-xs">
                <span className="block text-xl sm:text-2xl font-black text-turquoise">{stats.totalTracks} Séries</span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-navy-light">S1, S2, L2, L&apos;, G</span>
              </div>
              <div className="rounded-2xl border border-navy/10 bg-white p-3 text-center shadow-xs">
                <span className="block text-xl sm:text-2xl font-black text-gold">{stats.totalSubjects}+ Matières</span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-navy-light">Maths, PC, SVT, Philo</span>
              </div>
              <div className="rounded-2xl border border-navy/10 bg-white p-3 text-center shadow-xs">
                <span className="block text-xl sm:text-2xl font-black text-coral">100% Officiel</span>
                <span className="text-[10px] sm:text-[11px] font-semibold text-navy-light">Office du Bac / MEN</span>
              </div>
            </div>

            {/* Boutons d'action */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-2">
              <Link href="/doc/catalogue" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto font-black shadow-md min-h-[46px]">
                  <Icon name="cours" size={18} className="mr-2" />
                  <span>Explorer tout le catalogue</span>
                </Button>
              </Link>
              <Link href="/doc/tarifs" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto font-bold min-h-[46px] border-navy/20 hover:border-turquoise hover:text-turquoise">
                  <span>Formules dès 700 FCFA/mois</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Colonne Droite : Vitrine Graphique Responsive Élève & Téléphone */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[420px]">
              {/* Aura lumineuse d'ambiance */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-turquoise/20 via-gold/15 to-transparent rounded-3xl blur-2xl opacity-75 -z-10" />

              {/* Carte conteneur vitrine */}
              <div className="relative rounded-3xl border border-turquoise/25 bg-gradient-to-b from-white via-surface/30 to-white/90 p-4 sm:p-6 shadow-xl backdrop-blur-xs overflow-hidden">
                {/* Badge supérieur flottant */}
                <div className="flex items-center justify-between mb-3 px-1">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-navy px-3 py-1 text-[11px] font-black text-white shadow-xs">
                    <Smartphone className="w-3.5 h-3.5 text-turquoise" />
                    <span>Optimisé Mobile 3G / 4G</span>
                  </span>
                  <span className="text-[11px] font-bold text-turquoise bg-turquoise-light px-2.5 py-0.5 rounded-full">
                    Sénégal
                  </span>
                </div>

                {/* Illustration SVG Animée */}
                <div className="relative flex items-center justify-center py-1 sm:py-2">
                  <Image
                    src="/eleve_lecture_telephone.svg"
                    alt="Élève sénégalais lisant un cours sur son smartphone"
                    width={440}
                    height={420}
                    priority
                    className="w-full h-auto max-h-[360px] object-contain drop-shadow-sm select-none transition-transform duration-300 hover:scale-[1.02]"
                  />
                </div>

                {/* Cartouche informatif inférieur */}
                <div className="mt-3 rounded-2xl bg-white border border-navy/10 p-3 shadow-xs flex items-center gap-3 text-left">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-xl bg-turquoise-light text-turquoise flex items-center justify-center shrink-0">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-black text-navy truncate">Révisions interactives 24h/24</p>
                      <p className="text-[10px] text-navy-light truncate">Fiches de cours légères &amp; quiz instantanés</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
