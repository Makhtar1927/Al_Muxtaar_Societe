"use client";

import * as React from "react";
import { useState, useTransition } from "react";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import {
  updatePasswordFromPromptAction,
  ignorePasswordPromptAction,
} from "@/lib/auth/actions";
import { KeyRound, ShieldCheck, Eye, EyeOff, Lock, CheckCircle2 } from "lucide-react";

export function ChangePasswordPromptModal() {
  const { showToast } = useToast();
  const [isOpen, setIsOpen] = useState(true);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  // Si l'utilisateur ferme ou clique en dehors, on considère qu'il ignore pour cette session
  function handleCloseOrIgnore() {
    startTransition(async () => {
      await ignorePasswordPromptAction();
      setIsOpen(false);
      showToast("Mot de passe actuel conservé pour vos prochaines connexions.", "info");
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage(null);

    if (!newPassword || newPassword.length < 6) {
      setErrorMessage("Le mot de passe doit comporter au moins 6 caractères.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("Les deux mots de passe ne correspondent pas.");
      return;
    }

    startTransition(async () => {
      const res = await updatePasswordFromPromptAction(newPassword, confirmPassword);
      if (res.success) {
        setIsOpen(false);
        showToast(res.message || "Mot de passe modifié avec succès !", "success");
      } else {
        setErrorMessage(res.error || "Une erreur est survenue.");
        showToast(res.error || "Erreur lors de la modification", "error");
      }
    });
  }

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleCloseOrIgnore}
      title="Sécurisez votre compte Al Muxtaar"
      description="Vous vous êtes connecté avec un mot de passe temporaire généré par l'administration."
    >
      <form onSubmit={handleSubmit} className="space-y-4 pt-2">
        <div className="rounded-2xl bg-amber-50/80 border border-amber-200/90 p-3.5 text-xs text-amber-900 space-y-1.5">
          <div className="flex items-center gap-2 font-bold text-amber-950">
            <KeyRound className="w-4 h-4 text-amber-600 shrink-0" />
            <span>Personnalisez votre mot de passe</span>
          </div>
          <p className="leading-relaxed">
            Pour votre confort et votre sécurité, vous pouvez définir dès maintenant un nouveau mot de passe personnel, ou choisir de conserver le mot de passe actuel.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-xl bg-coral/10 border border-coral/30 text-coral text-xs font-semibold">
            {errorMessage}
          </div>
        )}

        <div className="space-y-3">
          {/* Nouveau mot de passe */}
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">
              Nouveau mot de passe :
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-navy/40">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showNew ? "text" : "password"}
                value={newPassword}
                onChange={(e) => {
                  setNewPassword(e.target.value);
                  setErrorMessage(null);
                }}
                placeholder="Au moins 6 caractères"
                className="w-full rounded-xl border border-navy/20 bg-white py-2.5 pl-9 pr-10 text-xs font-medium text-navy focus:outline-none focus:ring-2 focus:ring-turquoise/40"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/40 hover:text-navy"
                tabIndex={-1}
              >
                {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirmation */}
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">
              Confirmer le mot de passe :
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-navy/40">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setErrorMessage(null);
                }}
                placeholder="Répétez le nouveau mot de passe"
                className="w-full rounded-xl border border-navy/20 bg-white py-2.5 pl-9 pr-10 text-xs font-medium text-navy focus:outline-none focus:ring-2 focus:ring-turquoise/40"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-navy/40 hover:text-navy"
                tabIndex={-1}
              >
                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        <div className="pt-3 border-t border-navy/10 flex flex-col sm:flex-row items-center justify-end gap-2.5">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleCloseOrIgnore}
            disabled={isPending}
            className="w-full sm:w-auto text-xs text-text/70 hover:text-navy"
          >
            Conserver le mot de passe actuel
          </Button>

          <Button
            type="submit"
            size="sm"
            disabled={isPending}
            className="w-full sm:w-auto bg-navy hover:bg-navy/90 text-white font-bold text-xs flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl shadow-sm"
          >
            <CheckCircle2 className="w-4 h-4 text-turquoise" />
            <span>{isPending ? "Enregistrement…" : "Enregistrer mon mot de passe"}</span>
          </Button>
        </div>
      </form>
    </Modal>
  );
}
