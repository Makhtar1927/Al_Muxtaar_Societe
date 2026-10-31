"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/ui/icon";

export default function MotDePasseOubliePage() {
  const [emailSent, setEmailSent] = React.useState(false);
  const [emailInput, setEmailInput] = React.useState("");

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_SUPPORT || "221770000000";
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    "Bonjour Al Muxtaar Société, j'ai oublié le mot de passe de mon compte élève. Mon numéro de téléphone est :"
  )}`;

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setEmailSent(true);
    }
  };

  return (
    <Card className="border border-surface-muted shadow-hover">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-gold-light text-[#A86E00]">
          <Icon name="securite" size={28} />
        </div>
        <CardTitle className="text-xl sm:text-2xl">Mot de passe oublié</CardTitle>
        <CardDescription>
          Deux options simples pour récupérer l&apos;accès à votre compte
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Option 1 : WhatsApp direct */}
        <div className="rounded-2xl border-2 border-turquoise/40 bg-turquoise-light/30 p-4">
          <h3 className="text-sm font-bold text-navy flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-turquoise" />
            Option Rapide : Support WhatsApp
          </h3>
          <p className="mt-1 text-xs text-navy-light leading-relaxed">
            Si vous n&apos;avez pas renseigné d&apos;e-mail, notre administrateur réinitialise votre accès après confirmation de votre numéro de téléphone.
          </p>
          <div className="mt-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-[#25D366] px-3 text-xs font-bold text-white transition-colors hover:bg-[#1EBE5D]"
            >
              Contacter le support WhatsApp
            </a>
          </div>
        </div>

        {/* Option 2 : Par e-mail */}
        <div className="border-t border-surface-muted pt-4">
          <h3 className="text-sm font-bold text-navy mb-2">
            Option 2 : Par adresse e-mail
          </h3>
          <p className="text-xs text-navy-light mb-3">
            Si vous avez ajouté une adresse e-mail réelle à votre profil :
          </p>

          {emailSent ? (
            <div className="rounded-xl border border-turquoise/40 bg-turquoise-light p-3 text-xs font-semibold text-turquoise">
              Si cette adresse correspond à un compte, un lien de réinitialisation vous a été envoyé. Vérifiez votre boîte de réception.
            </div>
          ) : (
            <form onSubmit={handleEmailSubmit} className="space-y-3">
              <Input
                type="email"
                placeholder="votre-email@exemple.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
              />
              <Button type="submit" variant="outline" size="md" className="w-full">
                Envoyer le lien par e-mail
              </Button>
            </form>
          )}
        </div>

        <div className="text-center pt-2 border-t border-surface-muted text-xs text-navy-light">
          <Link href="/connexion" className="font-bold text-turquoise hover:underline">
            ← Revenir à la page de connexion
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

