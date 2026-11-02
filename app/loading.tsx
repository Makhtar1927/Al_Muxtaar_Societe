import React from 'react';
import Image from 'next/image';

export default function GlobalLoading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center select-none animate-in fade-in duration-300">
      {/* Halo lumineux d'arrière-plan */}
      <div className="relative flex items-center justify-center">
        <div className="absolute h-32 w-32 rounded-full bg-turquoise/15 blur-2xl animate-pulse" />

        {/* Cercle d'animation avec le logo Al Muxtaar */}
        <div className="relative flex flex-col items-center justify-center">
          <div className="relative w-20 h-20 rounded-3xl bg-white p-3.5 shadow-xl border border-navy/10 flex items-center justify-center">
            {/* Anneau de chargement tournant autour */}
            <div className="absolute inset-0 rounded-3xl border-2 border-turquoise border-t-transparent animate-spin" />
            
            <Image
              src="/assets/logo/al_muxtaar_symbole.svg"
              alt="Logo Al Muxtaar"
              width={48}
              height={48}
              className="object-contain animate-pulse"
              priority
            />
          </div>
        </div>
      </div>

      {/* Textes d'attente soignés */}
      <div className="mt-6 space-y-1.5 max-w-xs">
        <h3 className="text-base font-black text-navy tracking-tight">
          Al Muxtaar Société
        </h3>
        <p className="text-xs text-navy/60 font-semibold animate-pulse">
          Chargement de votre page en cours...
        </p>
      </div>

      {/* Barre de pulsation minimaliste */}
      <div className="mt-4 w-36 h-1 rounded-full bg-navy/10 overflow-hidden">
        <div className="h-full w-full bg-gradient-to-r from-transparent via-turquoise to-transparent animate-[shimmer_1.5s_infinite] -translate-x-full" />
      </div>
    </div>
  );
}

