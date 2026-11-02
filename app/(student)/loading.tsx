import React from 'react';
import Image from 'next/image';

export default function StudentLoading() {
  return (
    <div className="min-h-screen bg-surface py-6 px-4">
      <div className="max-w-6xl mx-auto space-y-6 animate-pulse">
        {/* Bandeau d'en-tête de chargement */}
        <div className="rounded-3xl bg-white border border-navy/10 p-5 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5 w-full sm:w-auto">
            <div className="relative w-12 h-12 rounded-2xl bg-turquoise/10 border border-turquoise/20 flex items-center justify-center shrink-0">
              <span className="w-6 h-6 rounded-full border-2 border-turquoise border-t-transparent animate-spin" />
            </div>
            <div className="space-y-1.5 flex-1">
              <div className="h-3 w-28 bg-navy/10 rounded-full" />
              <div className="h-5 w-48 sm:w-64 bg-navy/15 rounded-lg" />
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <div className="h-8 w-28 bg-navy/10 rounded-xl" />
          </div>
        </div>

        {/* Disposition Grille / Layout de Cours Skeleton */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar skeleton */}
          <div className="hidden lg:block lg:col-span-1 space-y-3">
            <div className="rounded-2xl bg-white border border-navy/10 p-4 space-y-3 shadow-sm">
              <div className="h-4 w-24 bg-navy/10 rounded-full" />
              <div className="h-3 w-32 bg-navy/5 rounded-full" />
              <div className="border-t border-navy/10 pt-3 space-y-2">
                <div className="h-7 w-full bg-navy/5 rounded-xl" />
                <div className="h-7 w-full bg-turquoise/10 rounded-xl" />
                <div className="h-7 w-full bg-navy/5 rounded-xl" />
              </div>
            </div>
          </div>

          {/* Main content skeleton */}
          <div className="lg:col-span-3 space-y-6">
            {/* Carte de contenu principale */}
            <div className="rounded-3xl bg-white border border-navy/10 p-6 sm:p-8 shadow-sm space-y-5">
              <div className="h-4 w-40 bg-navy/10 rounded-full" />
              <div className="space-y-2.5">
                <div className="h-3 w-full bg-navy/5 rounded-full" />
                <div className="h-3 w-5/6 bg-navy/5 rounded-full" />
                <div className="h-3 w-4/6 bg-navy/5 rounded-full" />
              </div>

              {/* Cadre SVG factice */}
              <div className="h-44 sm:h-56 w-full rounded-2xl bg-surface/80 border border-navy/10 flex flex-col items-center justify-center p-4 gap-2">
                <div className="w-8 h-8 rounded-full border-2 border-turquoise border-t-transparent animate-spin" />
                <span className="text-xs font-bold text-navy/40">
                  Chargement des ressources pédagogiques Al Muxtaar...
                </span>
              </div>

              <div className="space-y-2.5">
                <div className="h-3 w-full bg-navy/5 rounded-full" />
                <div className="h-3 w-3/4 bg-navy/5 rounded-full" />
              </div>
            </div>

            {/* Fiche réflexe skeleton */}
            <div className="rounded-3xl bg-white border border-navy/10 p-5 shadow-sm space-y-3">
              <div className="h-4 w-48 bg-navy/10 rounded-full" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="h-14 bg-navy/5 rounded-xl" />
                <div className="h-14 bg-navy/5 rounded-xl" />
                <div className="h-14 bg-navy/5 rounded-xl" />
                <div className="h-14 bg-navy/5 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

