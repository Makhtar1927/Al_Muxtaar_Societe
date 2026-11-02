"use client";

import * as React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { updateProfileAction, signOutAction, type AuthState } from "@/lib/auth/actions";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Avatar, AVATAR_NAMES } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";

interface CompteFormProps {
  initialProfile: {
    first_name: string;
    last_name: string;
    phone: string;
    email: string | null;
    level: string;
    track: string;
    avatar: string;
    role: string;
    created_at: string;
  };
}

function SaveButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="primary" size="md" isLoading={pending}>
      Enregistrer les modifications
    </Button>
  );
}

export function CompteForm({ initialProfile }: CompteFormProps) {
  const [state, formAction] = useFormState<AuthState, FormData>(updateProfileAction, {});
  const [selectedAvatar, setSelectedAvatar] = React.useState(initialProfile.avatar || "avatar_00_defaut_neutre.svg");
  const [isAvatarModalOpen, setIsAvatarModalOpen] = React.useState(false);

  return (
    <div className="space-y-6">
      {/* Profil Header Card */}
      <Card className="border border-surface-muted bg-white p-6 shadow-card">
        <div className="flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
          <div className="relative">
            <Avatar name={selectedAvatar} size="xl" isBordered />
            <button
              type="button"
              onClick={() => setIsAvatarModalOpen(true)}
              className="absolute -bottom-1 -right-1 rounded-full bg-turquoise p-1.5 text-white shadow-soft hover:bg-turquoise-hover"
              title="Changer d'avatar"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>

          <div className="space-y-1 flex-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="text-xl font-bold text-navy">
                {initialProfile.first_name} {initialProfile.last_name}
              </h2>
              <Badge status={initialProfile.role === "admin" ? "active" : "default"}>
                {initialProfile.role === "admin" ? "Administrateur" : "Élève"}
              </Badge>
            </div>
            <p className="text-xs font-mono font-semibold text-navy-light">
              {initialProfile.phone}
            </p>
            <p className="text-xs text-navy-light">
              Classe : <strong>{initialProfile.level} {initialProfile.track}</strong>
            </p>
          </div>

          <div>
            <form action={signOutAction}>
              <Button type="submit" variant="outline" size="sm" className="text-coral border-coral/30 hover:bg-coral-light">
                Se déconnecter
              </Button>
            </form>
          </div>
        </div>
      </Card>

      {/* Formulaire de modification */}
      <Card className="border border-surface-muted bg-white shadow-card">
        <CardHeader>
          <CardTitle>Informations personnelles</CardTitle>
          <CardDescription>
            Modifiez vos coordonnées et vos préférences scolaires
          </CardDescription>
        </CardHeader>
        <CardContent>
          {state?.success && (
            <div className="mb-4 rounded-xl border border-turquoise/40 bg-turquoise-light p-3 text-xs font-semibold text-turquoise flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-turquoise" />
              Profil mis à jour avec succès !
            </div>
          )}

          {state?.error && (
            <div className="mb-4 rounded-xl border border-coral/30 bg-coral-light p-3 text-xs font-semibold text-coral flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-coral" />
              {state.error}
            </div>
          )}

          <form action={formAction} className="space-y-4">
            <input type="hidden" name="avatar" value={selectedAvatar} />

            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                name="firstName"
                label="Prénom"
                defaultValue={initialProfile.first_name}
                required
              />
              <Input
                name="lastName"
                label="Nom"
                defaultValue={initialProfile.last_name}
                required
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                label="Téléphone (Identifiant unique)"
                defaultValue={initialProfile.phone}
                disabled
                helperText="Non modifiable (lié à votre compte Supabase)"
              />
              <Input
                name="email"
                type="email"
                label="E-mail de contact"
                defaultValue={initialProfile.email || ""}
                placeholder="exemple@domaine.com"
                helperText="Optionnel pour recevoir des notifications"
              />
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <Select
                name="level"
                label="Classe"
                defaultValue={initialProfile.level}
                options={[
                  { value: "Terminale", label: "Terminale (Baccalauréat)" },
                  { value: "Première", label: "Première" },
                  { value: "Seconde", label: "Seconde" },
                  { value: "Troisième", label: "3e Collège (BFEM)" },
                ]}
              />
              <Select
                name="track"
                label="Série / Filière"
                defaultValue={initialProfile.track}
                options={[
                  { value: "S2", label: "Terminale S2 (Sciences Exp.)" },
                  { value: "S1", label: "Terminale S1 (Sciences Exactes)" },
                  { value: "L2", label: "Terminale L2 (Littéraire)" },
                  { value: "L'", label: "Terminale L' (Langues)" },
                  { value: "G", label: "Terminale G (Gestion)" },
                  { value: "1S", label: "Première S (Scientifique)" },
                  { value: "1L", label: "Première L (Littéraire)" },
                  { value: "2S", label: "Seconde S (Scientifique)" },
                  { value: "2L", label: "Seconde L (Littéraire)" },
                  { value: "BFEM", label: "3e Collège (BFEM)" },
                ]}
              />
            </div>

            <div className="flex justify-end pt-4 border-t border-surface-muted">
              <SaveButton />
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Modal choix avatar */}
      <Modal
        isOpen={isAvatarModalOpen}
        onClose={() => setIsAvatarModalOpen(false)}
        title="Changer d'avatar"
        description="Choisissez votre nouvelle illustration de profil"
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
    </div>
  );
}

