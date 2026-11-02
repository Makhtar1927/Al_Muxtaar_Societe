'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * Indicateur de chargement global lors des transitions de pages (style YouTube / GitHub / NextTopLoader).
 * Dès que l'utilisateur clique sur un lien, une jauge lumineuse démarre instantanément en haut de l'écran.
 */
export default function PageTransitionLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);

  // Dès que l'URL change, la navigation est terminée
  useEffect(() => {
    setIsNavigating(false);
    setProgress(100);
    const timeout = setTimeout(() => {
      setProgress(0);
    }, 300);
    return () => clearTimeout(timeout);
  }, [pathname, searchParams]);

  // Intercepter les clics sur les liens internes
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (
        !href ||
        href.startsWith('#') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        target.target === '_blank'
      ) {
        return;
      }

      // Si le lien mène vers la même page exacte, pas de loader
      const currentUrl = window.location.pathname + window.location.search;
      if (href === currentUrl) return;

      // Déclencher l'animation immédiatement
      setIsNavigating(true);
      setProgress(25);
    }

    document.addEventListener('click', handleClick, { capture: true });
    return () => document.removeEventListener('click', handleClick, { capture: true });
  }, []);

  // Progression incrémentale pendant l'attente
  useEffect(() => {
    if (!isNavigating) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 60) return prev + 15;
        if (prev < 85) return prev + 5;
        if (prev < 95) return prev + 1;
        return prev;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isNavigating]);

  if (progress === 0) return null;

  return (
    <>
      {/* Barre lumineuse au sommet de l'écran */}
      <div className="fixed top-0 left-0 right-0 z-[9999] pointer-events-none h-1 bg-transparent">
        <div
          className="h-full bg-gradient-to-r from-turquoise via-[#00B8A9] to-emerald-400 transition-all duration-300 ease-out shadow-[0_0_12px_rgba(0,184,169,0.8)]"
          style={{
            width: `${progress}%`,
            opacity: progress === 100 ? 0 : 1,
            transition: progress === 100 ? 'opacity 0.3s ease, width 0.1s linear' : 'width 0.3s ease-out',
          }}
        />
      </div>

      {/* Si le chargement prend plus de 400ms sur mobile, petit badge flottant non bloquant */}
      {isNavigating && progress > 40 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] pointer-events-none animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center gap-2.5 rounded-full bg-navy/90 text-white px-4 py-2 shadow-2xl backdrop-blur-md border border-white/20 text-xs font-bold">
            <span className="w-3.5 h-3.5 rounded-full border-2 border-turquoise border-t-transparent animate-spin" />
            <span>Al Muxtaar · Chargement...</span>
          </div>
        </div>
      )}
    </>
  );
}

