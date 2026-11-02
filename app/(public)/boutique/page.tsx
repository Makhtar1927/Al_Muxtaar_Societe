import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";

export const metadata: Metadata = {
  title: "Al_Muxtaar_Boutique | Matériels Informatiques & Équipements Scolaires au Sénégal",
  description:
    "Vente d'ordinateurs portables reconditionnés et neufs garantis, accessoires numériques et fournitures scolaires avec livraison express à Dakar et dans tout le Sénégal.",
};

const CATEGORIES = [
  {
    name: "Ordinateurs Portables Étudiants & Bureautique",
    desc: "Modèles robustes (Dell Latitude, HP EliteBook, Lenovo ThinkPad) testés et garantis, avec pack logiciels préinstallés.",
    tag: "Garantie 6 à 12 mois",
    icon: "illustration_3d",
  },
  {
    name: "Accessoires & Périphériques Connectés",
    desc: "Clés USB rapides, disques durs externes, routeurs 4G/Wi-Fi, souris ergonomiques, sacoches et chargeurs d'origine.",
    tag: "Certifié d'origine",
    icon: "boutique",
  },
  {
    name: "Packs Rentrée & Fournitures Scolaires",
    desc: "Calculatrices scientifiques certifiées examens, cahiers de cours, manuels de révision et kits de géométrie.",
    tag: "Spécial Lycée & Collège",
    icon: "cours",
  },
];

export default function BoutiquePage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_SUPPORT || "221770000000";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Bonjour Al Muxtaar Société, je souhaite des renseignements sur la disponibilité d'équipements informatiques (Boutique) :"
  )}`;

  return (
    <div className="space-y-16 py-8 sm:space-y-20 sm:py-12">
      {/* En-tête du Pôle Boutique */}
      <section className="mx-auto max-w-5xl px-4 text-center sm:px-6">
        <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-coral-light px-4 py-1.5 text-xs font-black text-coral border border-coral/30">
          <Icon name="boutique" size={16} />
          PÔLE MATÉRIELS INFORMATIQUES &amp; ÉQUIPEMENTS
        </div>
        <h1 className="text-3xl font-black tracking-tight text-navy sm:text-5xl lg:text-6xl">
          Du matériel fiable pour réussir <br className="hidden sm:inline" />
          <span className="text-coral">vos études et vos projets</span>.
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-base text-navy-light sm:text-lg leading-relaxed">
          Al_Muxtaar_Boutique sélectionne et garantit des ordinateurs portables performants, 
          des accessoires connectés et des équipements scolaires livrés chez vous au Sénégal.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="lg" className="w-full sm:w-auto font-black shadow-md bg-coral hover:bg-coral/90 text-white">
              <Icon name="notification" size={18} className="mr-2" />
              Consulter les arrivages sur WhatsApp
            </Button>
          </a>
          <Link href="/contact">
            <Button variant="outline" size="lg" className="w-full sm:w-auto font-bold">
              Commander un équipement
            </Button>
          </Link>
        </div>
      </section>

      {/* Catégories de Produits */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-bold uppercase tracking-wider text-coral">
            Nos Gammes d&apos;Équipements
          </span>
          <h2 className="mt-1 text-2xl font-black text-navy sm:text-3xl">
            Des outils rigoureusement testés
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {CATEGORIES.map((cat, idx) => (
            <Card key={idx} className="border border-navy/10 flex flex-col justify-between hover:shadow-card-hover transition-all">
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-coral-light">
                    <Icon name={cat.icon} size={28} />
                  </div>
                  <span className="rounded-full bg-surface px-2.5 py-0.5 text-[10px] font-bold text-navy">
                    {cat.tag}
                  </span>
                </div>
                <CardTitle className="text-base font-bold text-navy">{cat.name}</CardTitle>
                <CardDescription className="text-xs text-navy-light leading-relaxed">
                  {cat.desc}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl bg-surface py-2.5 text-xs font-bold text-navy hover:bg-coral hover:text-white transition-colors"
                >
                  <span>Demander le prix &amp; les stocks</span>
                  <Icon name="arrow_right" size={14} />
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Engagements Livraison & Paiement */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="rounded-3xl border border-navy/10 bg-white p-6 sm:p-8 shadow-card grid gap-6 sm:grid-cols-3 text-center">
          <div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-turquoise-light mb-3">
              <Icon name="paiement" size={28} />
            </div>
            <h4 className="font-bold text-navy text-sm">Paiement Mobile Sécurisé</h4>
            <p className="mt-1 text-xs text-navy-light">Réglez facilement via Wave ou Orange Money à la commande ou à la livraison.</p>
          </div>

          <div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-light mb-3">
              <Icon name="securite" size={28} />
            </div>
            <h4 className="font-bold text-navy text-sm">Matériel Garanti</h4>
            <p className="mt-1 text-xs text-navy-light">Chaque appareil subit un contrôle technique complet en atelier avant remise au client.</p>
          </div>

          <div>
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-coral-light mb-3">
              <Icon name="orientation" size={28} />
            </div>
            <h4 className="font-bold text-navy text-sm">Livraison Partout au Sénégal</h4>
            <p className="mt-1 text-xs text-navy-light">Expédition rapide à Dakar sous 24h et dans les capitales régionales sous 48h.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

