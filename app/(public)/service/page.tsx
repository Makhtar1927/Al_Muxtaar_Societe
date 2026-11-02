import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";

export const metadata: Metadata = {
  title: "Al_Muxtaar_Service | Ingénierie Logicielle & Solutions Digitales au Sénégal",
  description:
    "Développement d'applications web & mobiles, plateformes de gestion scolaire, audit et maintenance de parcs informatiques à Dakar et dans tout le Sénégal.",
};

export default function ServicePage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_SUPPORT || "221770000000";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Bonjour Al Muxtaar Société, je souhaite obtenir un devis / des informations pour Al_Muxtaar_Service :"
  )}`;

  return (
    <div className="space-y-16 py-8 sm:space-y-20 sm:py-12">
      {/* En-tête du Pôle Service */}
      <section className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-gold-light px-4 py-1.5 text-xs font-black text-[#8A5A00] border border-gold/30">
          <Icon name="service" size={16} />
          PÔLE INGÉNIERIE &amp; SOLUTIONS NUMÉRIQUES
        </div>
        <h1 className="text-3xl font-black tracking-tight text-navy sm:text-5xl lg:text-6xl">
          Des solutions logicielles sur-mesure <br className="hidden sm:inline" />
          <span className="text-gold">conçues pour vos besoins</span>.
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-base text-navy-light sm:text-lg leading-relaxed">
          Al_Muxtaar_Service accompagne les établissements scolaires, les entreprises, les PME et les institutions 
          dans la conception, le déploiement et la maintenance de leurs outils numériques.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="lg" className="w-full sm:w-auto font-black shadow-md bg-gold hover:bg-gold/90 text-navy">
              <Icon name="notification" size={18} className="mr-2" />
              Demander un devis sur WhatsApp
            </Button>
          </a>
          <Link href="/contact">
            <Button variant="outline" size="lg" className="w-full sm:w-auto font-bold">
              Formulaire de contact
            </Button>
          </Link>
        </div>
      </section>

      {/* Les 4 Domaines d'Expertise */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-gold">
            Nos Compétences Techniques
          </span>
          <h2 className="mt-1 text-2xl font-black text-navy sm:text-3xl">
            Ce que nous réalisons pour vous
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-t-4 border-t-gold">
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-light">
                <Icon name="developpement" size={28} />
              </div>
              <CardTitle>Applications Web &amp; Mobiles</CardTitle>
              <CardDescription>Solutions SaaS, portails &amp; apps</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-navy-light leading-relaxed">
                Conception de plateformes réactives, légères et optimisées pour les réseaux mobiles africains avec Next.js, React, et bases de données temps réel.
              </p>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-turquoise">
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-turquoise-light">
                <Icon name="cours" size={28} />
              </div>
              <CardTitle>Systèmes de Gestion Scolaire</CardTitle>
              <CardDescription>Pour collèges, lycées et instituts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-navy-light leading-relaxed">
                Logiciels de gestion des notes, des bulletins, des emplois du temps et du suivi des paiements de scolarité adaptés au système éducatif sénégalais.
              </p>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-navy">
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-navy/10">
                <Icon name="maintenance" size={28} />
              </div>
              <CardTitle>Maintenance &amp; Réseaux</CardTitle>
              <CardDescription>Assistance technique &amp; parcs</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-navy-light leading-relaxed">
                Installation de réseaux locaux, configuration de routeurs et bornes Wi-Fi, maintenance préventive et curative de salles informatiques.
              </p>
            </CardContent>
          </Card>

          <Card className="border-t-4 border-t-coral">
            <CardHeader>
              <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-coral-light">
                <Icon name="securite" size={28} />
              </div>
              <CardTitle>Audit &amp; Conseil Numérique</CardTitle>
              <CardDescription>Sécurité et transformation digitale</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-navy-light leading-relaxed">
                Accompagnement méthodologique pour moderniser vos outils, sauvegarder vos données critiques et protéger vos installations.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Appel à l'action Devis */}
      <section className="mx-auto max-w-4xl px-4 text-center sm:px-6">
        <div className="rounded-3xl bg-navy p-8 text-white shadow-xl sm:p-12 space-y-4">
          <Icon name="service" size={44} className="mx-auto" />
          <h2 className="text-2xl font-black sm:text-3xl">
            Vous avez un projet numérique ? Discutons-en dès aujourd&apos;hui.
          </h2>
          <p className="mx-auto text-xs sm:text-sm text-surface-muted max-w-lg leading-relaxed">
            Notre équipe d&apos;ingénieurs et techniciens vous propose un diagnostic gratuit et un devis clair sans engagement.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="lg" className="font-black bg-[#25D366] hover:bg-[#1EBE5D] text-white border-0">
                Lancer une discussion WhatsApp
              </Button>
            </a>
            <Link href="/contact">
              <Button variant="outline" size="lg" className="bg-white text-navy font-bold border-white">
                Nous écrire par e-mail
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

