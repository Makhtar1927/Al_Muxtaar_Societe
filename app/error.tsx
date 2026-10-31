"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log optionnel de l'erreur
    console.error("Erreur d'application capturée:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-surface px-4 text-center">
      <div className="w-full max-w-md rounded-2xl border border-coral/30 bg-white p-8 shadow-card sm:p-12">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-coral-light text-coral font-bold text-2xl">
          !
        </div>
        <h1 className="mt-4 text-2xl font-bold text-navy">Une erreur est survenue</h1>
        <p className="mt-2 text-sm text-navy-light">
          Notre équipe technique a été informée. Veuillez réessayer ou revenir à l&apos;accueil.
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={() => reset()}
            className="inline-flex h-11 w-full items-center justify-center rounded-2xl bg-turquoise px-4 text-sm font-semibold text-white shadow-soft transition-colors hover:bg-turquoise-hover"
          >
            Réessayer
          </button>
          <Link
            href="/"
            className="inline-flex h-11 w-full items-center justify-center rounded-2xl border border-navy/15 bg-white px-4 text-sm font-semibold text-navy transition-colors hover:bg-surface"
          >
            Retourner à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

