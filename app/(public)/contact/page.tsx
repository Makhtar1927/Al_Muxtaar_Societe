import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/ui/icon";

export const metadata: Metadata = {
  title: "Contact & Assistance WhatsApp | Al Muxtaar Société",
  description:
    "Contactez l'équipe Al Muxtaar Société pour toute question sur vos cours, vos abonnements ou vos paiements Wave / Orange Money.",
};

export default function ContactPage() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_SUPPORT || "221770000000";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Bonjour Al Muxtaar Société, j'ai une question concernant la plateforme :"
  )}`;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 sm:py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-2 rounded-full bg-turquoise-light px-3.5 py-1 text-xs font-bold text-turquoise mb-3">
          <Icon name="profil" size={16} />
          Support Réactif
        </div>
        <h1 className="text-3xl font-black tracking-tight text-navy sm:text-4xl">
          Contactez notre équipe
        </h1>
        <p className="mt-2 text-sm text-navy-light">
          Une question sur un paiement, un problème de connexion ou une suggestion ? Nous vous répondons rapidement.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Contact direct WhatsApp */}
        <div className="space-y-6">
          <div className="rounded-2xl border-2 border-turquoise/40 bg-white p-6 sm:p-8 shadow-card">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-turquoise text-white mb-4">
              <Icon name="notification" size={28} />
            </div>
            <h3 className="text-lg font-bold text-navy">Assistance directe sur WhatsApp</h3>
            <p className="mt-2 text-xs text-navy-light leading-relaxed">
              Pour une activation urgente ou une vérification de code de transaction, WhatsApp est le canal le plus rapide.
            </p>
            <div className="mt-6">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 w-full items-center justify-center rounded-2xl bg-[#25D366] px-4 text-sm font-bold text-white shadow-soft transition-colors hover:bg-[#1EBE5D] min-h-[44px]"
              >
                Discuter sur WhatsApp (+221)
              </a>
            </div>
          </div>

          <div className="rounded-2xl bg-surface p-6 border border-surface-muted text-xs text-navy-light space-y-2">
            <h4 className="font-bold text-navy text-sm">Horaires d&apos;assistance</h4>
            <p>Du lundi au dimanche : <strong>08h00 – 22h00 GMT</strong></p>
            <p>Localisation : <strong>Dakar, Sénégal</strong></p>
            <p>E-mail technique : <strong>support@almuxtaar.sn</strong></p>
          </div>
        </div>

        {/* Formulaire de contact web */}
        <div className="rounded-2xl border border-surface-muted bg-white p-6 sm:p-8 shadow-card">
          <h3 className="text-lg font-bold text-navy mb-4">Envoyez-nous un message</h3>
          <form className="space-y-4">
            <Input
              label="Votre Prénom et Nom"
              placeholder="Ex: Babacar Diop"
              required
            />
            <Input
              label="Numéro de téléphone (+221)"
              placeholder="Ex: 77 123 45 67"
              required
            />
            <div className="space-y-1.5 text-left">
              <label className="block text-xs font-bold text-navy uppercase tracking-wider">
                Votre Message
              </label>
              <textarea
                rows={4}
                placeholder="Décrivez votre demande en quelques mots..."
                className="w-full rounded-2xl border border-surface-muted bg-white p-3 text-sm text-navy transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-turquoise focus-visible:border-turquoise"
                required
              />
            </div>
            <Button variant="primary" size="lg" className="w-full">
              Envoyer le message
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

