"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { signInAction, type AuthState } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Icon } from "@/components/ui/icon";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      variant="primary"
      size="lg"
      className="w-full"
      isLoading={pending}
    >
      Se connecter
    </Button>
  );
}

function ConnexionForm() {
  const searchParams = useSearchParams();
  const isRegistered = searchParams.get("registered") === "true";
  const [state, formAction] = useFormState<AuthState, FormData>(signInAction, {});

  return (
    <Card className="border border-surface-muted shadow-hover">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-2xl bg-turquoise-light text-turquoise">
          <Icon name="profil" size={28} />
        </div>
        <CardTitle className="text-xl sm:text-2xl">Connexion</CardTitle>
        <CardDescription>
          Accédez à votre espace de révision Al Muxtaar
        </CardDescription>
      </CardHeader>

      <CardContent>
        {isRegistered && (
          <div className="mb-4 rounded-xl border border-turquoise/40 bg-turquoise-light p-3 text-xs font-semibold text-turquoise flex items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-turquoise" />
            <span>Votre compte a été créé avec succès ! Connectez-vous.</span>
          </div>
        )}

        {state?.error && (
          <div className="mb-4 rounded-xl border border-coral/30 bg-coral-light p-3 text-xs font-semibold text-coral flex items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
            <span>{state.error}</span>
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <Input
            name="phone"
            type="tel"
            label="Numéro de téléphone (+221)"
            placeholder="77 123 45 67"
            helperText="Numéro utilisé lors de votre inscription"
            required
          />

          <div>
            <div className="flex items-center justify-between pb-1">
              <label className="block text-xs font-bold text-navy uppercase tracking-wider">
                Mot de passe
              </label>
              <Link
                href="/mot-de-passe-oublie"
                className="text-xs font-bold text-turquoise hover:underline"
              >
                Oublié ?
              </Link>
            </div>
            <Input
              name="password"
              type="password"
              placeholder="Votre mot de passe"
              required
            />
          </div>

          <SubmitButton />
        </form>

        <div className="mt-6 text-center text-xs text-navy-light">
          Vous n&apos;avez pas encore de compte ?{" "}
          <Link href="/inscription" className="font-bold text-turquoise hover:underline">
            S&apos;inscrire gratuitement
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default function ConnexionPage() {
  return (
    <React.Suspense fallback={<div className="text-center p-8 text-xs text-navy-light">Chargement...</div>}>
      <ConnexionForm />
    </React.Suspense>
  );
}

