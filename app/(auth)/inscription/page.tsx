"use client";

import * as React from "react";
import Link from "next/link";
import { useFormState, useFormStatus } from "react-dom";
import { signUpAction, type AuthState } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Avatar, AVATAR_NAMES } from "@/components/ui/avatar";
import { Modal } from "@/components/ui/modal";

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
      Créer mon compte élève
    </Button>
  );
}

export default function InscriptionPage() {
  const [state, formAction] = useFormState<AuthState, FormData>(signUpAction, {});
  const [selectedAvatar, setSelectedAvatar] = React.useState<string>("avatar_01_eleve_garcon.svg");
  const [isAvatarModalOpen, setIsAvatarModalOpen] = React.useState(false);

  return (
    <Card className="border border-surface-muted shadow-hover">
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-2 flex justify-center">
          <Avatar name={selectedAvatar} size="lg" isBordered />
        </div>
        <button
          type="button"
          onClick={() => setIsAvatarModalOpen(true)}
          className="mx-auto text-xs font-bold text-turquoise hover:underline"
        >
          Changer mon avatar
        </button>
        <CardTitle className="text-xl sm:text-2xl mt-3">Inscription Élève</CardTitle>
        <CardDescription>
          Créez votre accès aux cours du programme sénégalais
        </CardDescription>
      </CardHeader>

      <CardContent>
        {state?.error && (
          <div className="mb-4 rounded-xl border border-coral/30 bg-coral-light p-3 text-xs font-semibold text-coral flex items-center gap-2">
            <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-coral" />
            <span>{state.error}</span>
          </div>
        )}

        <form action={formAction} className="space-y-4">
          <input type="hidden" name="avatar" value={selectedAvatar} />

          <div className="grid grid-cols-2 gap-3">
            <Input
              name="firstName"
              label="Prénom"
              placeholder="Ex: Moussa"
              required
            />
            <Input
              name="lastName"
              label="Nom"
              placeholder="Ex: Sow"
              required
            />
          </div>

          <Input
            name="phone"
            type="tel"
            label="Téléphone (+221)"
            placeholder="77 123 45 67"
            helperText="Votre numéro Wave ou Orange Money de référence"
            required
          />

          <Input
            name="email"
            type="email"
            label="E-mail (Optionnel)"
            placeholder="moussa@exemple.sn"
            helperText="Facultatif : utile en cas de mot de passe oublié"
          />

          <div className="grid grid-cols-2 gap-3">
            <Select
              name="level"
              label="Classe"
              options={[{ value: "Terminale", label: "Terminale" }]}
            />
            <Select
              name="track"
              label="Série"
              options={[
                { value: "S2", label: "S2 — Sciences Exp." },
                { value: "S1", label: "S1 — Sciences Exactes" },
                { value: "L2", label: "L2 — Littéraire" },
              ]}
            />
          </div>

          <Input
            name="password"
            type="password"
            label="Mot de passe"
            placeholder="Au moins 6 caractères"
            required
          />

          <p className="text-[11px] text-navy-light leading-relaxed">
            En créant votre compte, vous acceptez nos{" "}
            <Link href="/conditions" className="text-turquoise hover:underline">
              Conditions Générales
            </Link>{" "}
            et notre{" "}
            <Link href="/confidentialite" className="text-turquoise hover:underline">
              Politique de Confidentialité
            </Link>
            .
          </p>

          <SubmitButton />
        </form>

        <div className="mt-6 text-center text-xs text-navy-light">
          Vous avez déjà un compte ?{" "}
          <Link href="/connexion" className="font-bold text-turquoise hover:underline">
            Se connecter
          </Link>
        </div>
      </CardContent>

      {/* Modal de sélection d'avatar */}
      <Modal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        title="Choisissez votre avatar"
        description="Sélectionnez l'illustration qui apparaîtra sur votre profil élève"
      >
        <div className="grid grid-cols-4 gap-3 py-2 max-h-72 overflow-y-auto">
          {AVATAR_NAMES.map((avName) => {
            const fileName = `${avName}.svg`;
            const isSelected = selectedAvatar === fileName;
            return (
              <button
                key={avName}
                type="button"
                onClick={() => {
                  setSelectedAvatar(fileName);
                  setIsAvatarModalOpen(false);
                }}
                className={`flex flex-col items-center rounded-2xl p-2 transition-all hover:bg-surface ${
                  isSelected
                    ? "ring-2 ring-turquoise bg-turquoise-light/30"
                    : "border border-surface-muted"
                }`}
              >
                <Avatar name={fileName} size="md" />
              </button>
            );
          })}
        </div>
      </Modal>
    </Card>
  );
}

