'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const DISMISS_KEY = 'almuxtaar_pwa_prompt_dismissed_until';
const COOLDOWN_DAYS = 5;

export default function PwaInstallPrompt() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'android' | 'ios'>('android');
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [installSuccess, setInstallSuccess] = useState(false);
  const [showAndroidManualHelp, setShowAndroidManualHelp] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // 1. Vérifier si l'application est déjà exécutée en mode PWA autonome
    const isStandaloneMode =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
      document.referrer.includes('android-app://');

    if (isStandaloneMode) {
      setIsStandalone(true);
      return;
    }

    // 2. Vérifier la temporisation de refus
    const dismissedUntil = localStorage.getItem(DISMISS_KEY);
    if (dismissedUntil && Date.now() < parseInt(dismissedUntil, 10)) {
      return;
    }

    // 3. Détection Apple iOS (iPhone, iPad, iPod)
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice =
      /iphone|ipad|ipod/.test(userAgent) ||
      (window.navigator.platform === 'MacIntel' && window.navigator.maxTouchPoints > 1);

    setIsIOS(isIosDevice);
    if (isIosDevice) {
      setActiveTab('ios');
    } else {
      setActiveTab('android');
    }

    // 4. Écouteur avant installation Chrome / Chromium
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 5. Confirmation d'installation réussie
    const handleAppInstalled = () => {
      setInstallSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    // 6. Délai d'apparition doux (3 secondes après chargement de la page)
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      clearTimeout(timer);
    };
  }, []);

  const handleDismiss = () => {
    if (typeof window !== 'undefined') {
      const expiration = Date.now() + COOLDOWN_DAYS * 24 * 60 * 60 * 1000;
      localStorage.setItem(DISMISS_KEY, expiration.toString());
    }
    setIsOpen(false);
  };

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choice = await deferredPrompt.userChoice;
        if (choice.outcome === 'accepted') {
          setInstallSuccess(true);
          setTimeout(() => {
            setIsOpen(false);
          }, 2500);
        } else {
          handleDismiss();
        }
        setDeferredPrompt(null);
      } catch (err) {
        console.error('Erreur lors du prompt PWA:', err);
        setShowAndroidManualHelp(true);
      }
    } else {
      setShowAndroidManualHelp(true);
    }
  };

  if (isStandalone || !isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pwa-install-title"
    >
      {/* Conteneur principal en mode clair */}
      <div className="relative w-full max-w-lg bg-white text-slate-900 rounded-t-[28px] sm:rounded-3xl border border-slate-200/90 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col transition-all duration-300 animate-slideUp">
        
        {/* Poignée mobile */}
        <div className="pt-3 pb-1 flex justify-center sm:hidden">
          <div className="w-12 h-1 bg-slate-200 rounded-full" />
        </div>

        {/* Barre d'en-tête */}
        <div className="px-5 pt-3 sm:pt-5 pb-4 flex items-start justify-between border-b border-slate-100">
          <div className="flex items-center gap-3.5">
            {/* Logo SVG officiel Al Muxtaar sans texte */}
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-teal-50/70 border border-teal-200/60 p-2.5 flex items-center justify-center shrink-0 shadow-sm">
              <Image
                src="/assets/logo/al_muxtaar_symbole.svg"
                alt="Logo Al Muxtaar"
                width={56}
                height={48}
                className="w-auto h-10 sm:h-11 object-contain"
                priority
              />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 id="pwa-install-title" className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
                  Al Muxtaar Société
                </h3>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
                  Web App
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Installer sur votre écran d&apos;accueil
              </p>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            aria-label="Fermer la boîte d'installation"
            className="px-3 py-1.5 text-xs font-semibold text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
          >
            Fermer
          </button>
        </div>

        {/* Corps défilable */}
        <div className="px-5 py-4 overflow-y-auto space-y-4">
          {installSuccess ? (
            <div className="text-center py-8 space-y-3">
              <span className="inline-block px-3 py-1 text-xs font-mono font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-full">
                Installation Confirmée
              </span>
              <h4 className="text-lg font-black text-slate-900">Application installée avec succès !</h4>
              <p className="text-xs sm:text-sm text-slate-600 max-w-sm mx-auto leading-relaxed">
                Retrouvez désormais le symbole <strong>Al Muxtaar</strong> directement sur votre écran d&apos;accueil pour réviser à tout moment.
              </p>
            </div>
          ) : (
            <>
              {/* 3 Avantages clés en typographie pure sans icône */}
              <div className="grid grid-cols-3 gap-2.5 py-1">
                <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] font-mono font-black text-teal-700 uppercase tracking-wider bg-teal-100/60 px-2 py-0.5 rounded-md mb-1.5">
                    0 Mo
                  </span>
                  <span className="text-xs font-bold text-slate-900">Ultra Léger</span>
                  <span className="text-[10px] text-slate-500 leading-tight mt-0.5">Sans store lourd</span>
                </div>

                <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] font-mono font-black text-amber-700 uppercase tracking-wider bg-amber-100/60 px-2 py-0.5 rounded-md mb-1.5">
                    Hors-Ligne
                  </span>
                  <span className="text-xs font-bold text-slate-900">Autonome</span>
                  <span className="text-[10px] text-slate-500 leading-tight mt-0.5">Révisez sans wifi</span>
                </div>

                <div className="flex flex-col items-center text-center p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <span className="text-[10px] font-mono font-black text-indigo-700 uppercase tracking-wider bg-indigo-100/60 px-2 py-0.5 rounded-md mb-1.5">
                    1 Clic
                  </span>
                  <span className="text-xs font-bold text-slate-900">Accès Direct</span>
                  <span className="text-[10px] text-slate-500 leading-tight mt-0.5">Écran d&apos;accueil</span>
                </div>
              </div>

              {/* Sélecteur de plateforme (Android vs iOS) */}
              <div className="grid grid-cols-2 gap-1.5 p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => setActiveTab('android')}
                  className={`py-2 px-3 text-center rounded-xl font-bold transition-all cursor-pointer ${
                    activeTab === 'android'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Android &amp; Chrome
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('ios')}
                  className={`py-2 px-3 text-center rounded-xl font-bold transition-all cursor-pointer ${
                    activeTab === 'ios'
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  iPhone &amp; iPad (iOS)
                </button>
              </div>

              {/* Onglet Android & Chrome */}
              {activeTab === 'android' && (
                <div className="space-y-3 pt-1">
                  <div className="p-4 sm:p-5 rounded-2xl bg-teal-50/60 border border-teal-200/80 space-y-3">
                    <div>
                      <span className="text-[10px] font-mono font-black uppercase tracking-wider text-teal-800 block">
                        Installation Directe
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 mt-0.5">
                        Ajoutez l&apos;application en une seconde
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        L&apos;application s&apos;intègre à votre téléphone sans passer par le Play Store. Elle préserve votre espace de stockage et se met à jour automatiquement.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={handleInstallClick}
                      className="w-full py-3.5 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 active:scale-[0.99] text-white font-bold text-xs sm:text-sm tracking-wide transition-all shadow-sm cursor-pointer text-center"
                    >
                      Installer l&apos;application Al Muxtaar
                    </button>
                  </div>

                  {/* Guide manuel si la boîte système ne s'ouvre pas */}
                  {showAndroidManualHelp && (
                    <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-2">
                      <p className="font-bold text-slate-900">
                        Procédure manuelle sur Chrome :
                      </p>
                      <ol className="list-decimal list-inside space-y-1.5 leading-relaxed">
                        <li>Appuyez sur le menu de Chrome (trois points en haut à droite).</li>
                        <li>Sélectionnez <strong>« Ajouter à l&apos;écran d&apos;accueil »</strong> ou <strong>« Installer l&apos;application »</strong>.</li>
                        <li>Confirmez en appuyant sur <strong>« Installer »</strong>.</li>
                      </ol>
                    </div>
                  )}
                </div>
              )}

              {/* Onglet iOS (Safari) */}
              {activeTab === 'ios' && (
                <div className="space-y-3 pt-1">
                  <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div>
                      <span className="text-[10px] font-mono font-black uppercase tracking-wider text-slate-600 block">
                        Procédure Safari (iPhone &amp; iPad)
                      </span>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Suivez ces 3 étapes simples depuis votre navigateur Safari :
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      {/* Étape 1 */}
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                        <span className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 text-xs font-mono font-black flex items-center justify-center shrink-0">
                          1
                        </span>
                        <div className="flex-1 text-xs text-slate-700 leading-snug">
                          Appuyez sur le bouton <strong>Partager</strong> situé dans la barre inférieure de Safari.
                        </div>
                      </div>

                      {/* Étape 2 */}
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                        <span className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 text-xs font-mono font-black flex items-center justify-center shrink-0">
                          2
                        </span>
                        <div className="flex-1 text-xs text-slate-700 leading-snug">
                          Faites défiler les options et sélectionnez <strong>« Sur l&apos;écran d&apos;accueil »</strong>.
                        </div>
                      </div>

                      {/* Étape 3 */}
                      <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs">
                        <span className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 text-xs font-mono font-black flex items-center justify-center shrink-0">
                          3
                        </span>
                        <div className="flex-1 text-xs text-slate-700 leading-snug">
                          En haut à droite de l&apos;écran, appuyez sur <strong>« Ajouter »</strong> pour finaliser.
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-500 text-center pt-1 leading-relaxed">
                      Le symbole Al Muxtaar s&apos;affichera sur votre écran comme une application native.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Pied de carte avec réassurance et option de report */}
        <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/80 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <span className="text-[11px] font-medium text-slate-500 text-center sm:text-left">
            Application certifiée • Rapide &amp; sans publicité
          </span>

          <button
            type="button"
            onClick={handleDismiss}
            className="text-xs font-medium text-slate-500 hover:text-slate-800 underline underline-offset-4 transition-colors cursor-pointer"
          >
            Plus tard (continuer dans le navigateur)
          </button>
        </div>
      </div>
    </div>
  );
}
