import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";

export const metadata: Metadata = {
  title: "Al Muxtaar Société | Technologie, Éducation & Services Numériques au Sénégal",
  description:
    "Al Muxtaar Société accompagne l'avenir numérique et académique du Sénégal à travers ses 3 pôles : Al_Muxtaar_Doc (éducation), Al_Muxtaar_Service (ingénierie logicielle) et Al_Muxtaar_Boutique (matériels informatiques).",
};

export default function HomePage() {
  return (
    <div className="space-y-16 py-8 sm:space-y-24 sm:py-12">
      {/* ── 1. HERO INSTITUTIONNEL DE LA SOCIÉTÉ ── */}
      <section className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-turquoise-light px-4 py-1.5 text-xs font-black text-turquoise border border-turquoise/20">
          AL MUXTAAR SOCIÉTÉ · ÉCOSYSTÈME TECHNOLOGIQUE &amp; ÉDUCATIF
        </div>
        <h1 className="text-3xl font-black tracking-tight text-navy sm:text-5xl lg:text-6xl leading-tight">
          Bâtir l&apos;excellence éducative et <br className="hidden sm:inline" />
          <span className="text-turquoise">l&apos;avenir numérique</span> du Sénégal.
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-base text-navy-light sm:text-lg leading-relaxed">
          Al Muxtaar Société fédère trois pôles complémentaires conçus pour répondre aux besoins réels du pays :
          une plateforme académique interactive (<strong>Doc</strong>), un département d&apos;ingénierie et de développement de solutions (<strong>Service</strong>),
          et un pôle de distribution d&apos;équipements informatiques certifiés (<strong>Boutique</strong>).
        </p>

        {/* Boutons d'action principaux équilibrés */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href="#ecosysteme">
            <Button variant="primary" size="lg" className="w-full sm:w-auto font-black shadow-md">
              Explorer nos 3 pôles d&apos;activités
            </Button>
          </a>
          <Link href="/doc">
            <Button variant="outline" size="lg" className="w-full sm:w-auto font-bold border-turquoise text-turquoise hover:bg-turquoise-light/30">
              Espace Éducatif
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="ghost" size="lg" className="w-full sm:w-auto font-bold text-navy hover:bg-surface">
              Nous contacter / Devis
            </Button>
          </Link>
        </div>
      </section>

      {/* ── 2. PRÉSENTATION DE L'ÉCOSYSTÈME (LES 3 PÔLES) ── */}
      <section id="ecosysteme" className="mx-auto max-w-7xl px-4 sm:px-6 scroll-mt-20">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-surface px-3.5 py-1 text-xs font-bold text-navy-light mb-2">
            Architecture Complète
          </div>
          <h2 className="text-2xl font-black text-navy sm:text-4xl">
            L&apos;Écosystème Al Muxtaar Société
          </h2>
          <p className="mt-3 text-sm text-navy-light max-w-2xl mx-auto leading-relaxed">
            Trois branches unies par la même exigence de rigueur, d&apos;efficacité technologique et d&apos;utilité pour le développement du Sénégal.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* Pôle 1 : Al_Muxtaar_Doc */}
          <Card variant="elevated" className="flex flex-col justify-between border-2 border-turquoise/50 shadow-card relative">
            <div className="absolute -top-3 right-6 rounded-full bg-turquoise px-3 py-0.5 text-[10px] font-black uppercase text-white shadow">
              Module Opérationnel
            </div>
            <CardHeader className="pt-8">
              <div className="flex items-center justify-between mb-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-turquoise-light">
                  <Icon name="doc" size={36} />
                </div>
                <Badge status="active">Pôle Éducation</Badge>
              </div>
              <CardTitle className="text-xl font-black text-navy">Al_Muxtaar_Doc</CardTitle>
              <CardDescription className="text-xs text-turquoise font-bold">
                Formation académique &amp; Référentiel National
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-navy-light leading-relaxed">
                Le portail éducatif interactif conçu pour tous les élèves du Sénégal (Collège et Lycée). Cours structurés, 
                synthèses vectorielles en SVG, fiches réflexes, exercices corrigés et éclairages bilingues en Wolof.
              </p>
              <div className="space-y-1.5 pt-2 border-t border-navy/5 text-xs text-navy">
                <div className="flex items-center gap-2">
                  <Icon name="check" size={14} className="text-turquoise shrink-0" />
                  <span><strong>Collège &amp; Lycée :</strong> De la 6e à la Terminale (BFEM &amp; Bac)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="check" size={14} className="text-turquoise shrink-0" />
                  <span><strong>Toutes les filières :</strong> Séries Scientifiques, Littéraires et Tertiaires</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="check" size={14} className="text-turquoise shrink-0" />
                  <span><strong>Tarification solidaire :</strong> Dès 700 FCFA / mois (Wave &amp; OM)</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-4 border-t border-navy/5 flex flex-col gap-2">
              <Link href="/doc/catalogue" className="w-full">
                <Button variant="primary" className="w-full font-bold">
                  Consulter le catalogue des cours
                </Button>
              </Link>
              <Link href="/doc" className="w-full text-center text-xs font-semibold text-navy hover:text-turquoise transition-colors py-1">
                Présentation détaillée du pôle Doc →
              </Link>
            </CardFooter>
          </Card>

          {/* Pôle 2 : Al_Muxtaar_Service */}
          <Card className="flex flex-col justify-between border border-navy/10 bg-white shadow-card">
            <CardHeader className="pt-8">
              <div className="flex items-center justify-between mb-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold-light">
                  <Icon name="service" size={36} />
                </div>
                <span className="rounded-full bg-gold-light text-[#8A5A00] px-2.5 py-0.5 text-[10px] font-bold">
                  Ingénierie &amp; Digital
                </span>
              </div>
              <CardTitle className="text-xl font-black text-navy">Al_Muxtaar_Service</CardTitle>
              <CardDescription className="text-xs text-gold font-bold">
                Ingénierie logicielle &amp; Services informatiques
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-navy-light leading-relaxed">
                Notre pôle technologique développe des solutions numériques performantes pour entreprises, établissements scolaires et particuliers à Dakar et dans les régions.
              </p>
              <div className="space-y-1.5 pt-2 border-t border-navy/5 text-xs text-navy">
                <div className="flex items-center gap-2">
                  <Icon name="check" size={14} className="text-gold shrink-0" />
                  <span><strong>Développement sur-mesure :</strong> Applications web, mobiles &amp; SaaS</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="check" size={14} className="text-gold shrink-0" />
                  <span><strong>Infrastructures scolaires :</strong> Logiciels de gestion &amp; notes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="check" size={14} className="text-gold shrink-0" />
                  <span><strong>Maintenance &amp; Support :</strong> Audit de parcs, réseaux &amp; sécurité</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-4 border-t border-navy/5 flex flex-col gap-2">
              <Link href="/service" className="w-full">
                <Button variant="outline" className="w-full font-bold border-navy/20 hover:border-gold hover:text-gold">
                  Découvrir nos offres d&apos;ingénierie
                </Button>
              </Link>
              <Link href="/contact" className="w-full text-center text-xs font-semibold text-navy hover:text-gold transition-colors py-1">
                Demander un devis ou une consultation →
              </Link>
            </CardFooter>
          </Card>

          {/* Pôle 3 : Al_Muxtaar_Boutique */}
          <Card className="flex flex-col justify-between border border-navy/10 bg-white shadow-card">
            <CardHeader className="pt-8">
              <div className="flex items-center justify-between mb-3">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-coral-light">
                  <Icon name="boutique" size={36} />
                </div>
                <span className="rounded-full bg-coral-light text-coral px-2.5 py-0.5 text-[10px] font-bold">
                  Distribution &amp; Matériel
                </span>
              </div>
              <CardTitle className="text-xl font-black text-navy">Al_Muxtaar_Boutique</CardTitle>
              <CardDescription className="text-xs text-coral font-bold">
                Matériels informatiques &amp; Fournitures scolaires
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-navy-light leading-relaxed">
                L&apos;équipement de travail indispensable pour réussir ses études et son activité professionnelle. Matériels testés, reconditionnés ou neufs, avec garantie et livraison.
              </p>
              <div className="space-y-1.5 pt-2 border-t border-navy/5 text-xs text-navy">
                <div className="flex items-center gap-2">
                  <Icon name="check" size={14} className="text-coral shrink-0" />
                  <span><strong>Ordinateurs portables :</strong> Modèles robustes étudiants &amp; pros</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="check" size={14} className="text-coral shrink-0" />
                  <span><strong>Accessoires connectés :</strong> Clés, disques, routeurs 4G/Wi-Fi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="check" size={14} className="text-coral shrink-0" />
                  <span><strong>Livraison garantie :</strong> Partout à Dakar et dans les 14 régions</span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-4 border-t border-navy/5 flex flex-col gap-2">
              <Link href="/boutique" className="w-full">
                <Button variant="outline" className="w-full font-bold border-navy/20 hover:border-coral hover:text-coral">
                  Explorer la boutique
                </Button>
              </Link>
              <Link href="/contact" className="w-full text-center text-xs font-semibold text-navy hover:text-coral transition-colors py-1">
                Commander ou réserver un équipement →
              </Link>
            </CardFooter>
          </Card>
        </div>
      </section>

      {/* ── 3. VALEURS & FORCES D'AL MUXTAAR SOCIÉTÉ ── */}
      <section className="bg-white border-y border-navy/10 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-turquoise">
              Nos Engagements Fondamentaux
            </span>
            <h2 className="mt-1 text-2xl font-black text-navy sm:text-3xl">
              Pourquoi faire confiance à Al Muxtaar Société ?
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-navy-light max-w-2xl mx-auto">
              Une vision résolument tournée vers le progrès local, la rigueur technique et l&apos;accessibilité financière.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-navy/10 bg-surface/40 p-6 space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-turquoise-light">
                <Icon name="metaphores" size={32} />
              </div>
              <h3 className="font-bold text-navy text-base">Ancrage 100% Sénégalais</h3>
              <p className="text-xs text-navy-light leading-relaxed">
                Des solutions dimensionnées pour notre pays : paiement instantané via Wave et Orange Money, interfaces ultra-légères compatibles réseaux 3G, et pédagogie contextualisée.
              </p>
            </div>

            <div className="rounded-2xl border border-navy/10 bg-surface/40 p-6 space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-turquoise-light">
                <Icon name="securite" size={32} />
              </div>
              <h3 className="font-bold text-navy text-base">Rigueur &amp; Certification</h3>
              <p className="text-xs text-navy-light leading-relaxed">
                Contenus pédagogiques conçus avec des enseignants diplômés (IGEF, FASTEF) et développements informatiques réalisés selon les standards industriels actuels.
              </p>
            </div>

            <div className="rounded-2xl border border-navy/10 bg-surface/40 p-6 space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-light">
                <Icon name="paiement" size={32} />
              </div>
              <h3 className="font-bold text-navy text-base">Tarification Solidaire</h3>
              <p className="text-xs text-navy-light leading-relaxed">
                Nous démocratisons l&apos;accès au savoir et à la technologie. Des cours dès 700 FCFA/mois et des devis de services transparents sans intermédiaires inutiles.
              </p>
            </div>

            <div className="rounded-2xl border border-navy/10 bg-surface/40 p-6 space-y-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-coral-light">
                <Icon name="profil" size={32} />
              </div>
              <h3 className="font-bold text-navy text-base">Accompagnement de Proximité</h3>
              <p className="text-xs text-navy-light leading-relaxed">
                Une équipe basée à Dakar joignable 7 jours sur 7 par WhatsApp et téléphone pour conseiller chaque élève, parent, école ou partenaire professionnel.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. APPEL À L'ACTION ENTREPRISE & PARTENARIATS ── */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="rounded-3xl bg-navy p-8 sm:p-12 text-white shadow-xl text-center space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10">
            <Icon name="orientation" size={36} />
          </div>
          <h2 className="text-2xl sm:text-4xl font-black max-w-2xl mx-auto">
            Un projet numérique, une rentrée scolaire ou un examen d&apos;État à préparer ?
          </h2>
          <p className="text-xs sm:text-sm text-surface-muted max-w-xl mx-auto leading-relaxed">
            Al Muxtaar Société vous accompagne avec des solutions concrètes, fiables et adaptées à vos objectifs.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-3 max-w-md mx-auto sm:max-w-none">
            <Link href="/doc" className="w-full sm:w-auto">
              <Button variant="primary" size="lg" className="w-full sm:w-auto font-black shadow-md">
                <Icon name="cours" size={18} className="mr-2" />
                Espace Cours &amp; Examens (Doc)
              </Button>
            </Link>
            <Link href="/contact" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-white text-navy font-bold border-2 border-white hover:bg-white/90 shadow-md"
              >
                Contacter la direction / Devis
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
