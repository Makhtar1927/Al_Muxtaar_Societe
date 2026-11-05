'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Download, Share, PlusSquare, CheckCircle2, Zap, WifiOff, Bell, Smartphone, ArrowRight, ShieldCheck } from 'lucide-react';

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

    // 1. Check if already running in standalone mode (already installed PWA)
    const isStandaloneMode =
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true ||
      document.referrer.includes('android-app://');

    if (isStandaloneMode) {
      setIsStandalone(true);
      return;
    }

    // 2. Check dismissal cooldown
    const dismissedUntil = localStorage.getItem(DISMISS_KEY);
    if (dismissedUntil && Date.now() < parseInt(dismissedUntil, 10)) {
      return;
    }

    // 3. Detect iOS (iPhone, iPad, iPod)
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

    // 4. Listen for Chromium beforeinstallprompt event
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // 5. Listen for successful install
    const handleAppInstalled = () => {
      setInstallSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
      }, 3000);
    };

    window.addEventListener('appinstalled', handleAppInstalled);

    // 6. Smooth delay before presenting (3 seconds after initial page load)
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
      // If deferredPrompt is not available (e.g. Firefox Android or prompt already triggered)
      setShowAndroidManualHelp(true);
    }
  };

  // If already installed or closed, do not render
  if (isStandalone || !isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/65 backdrop-blur-md animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="pwa-install-title"
    >
      {/* Container with responsive bottom-sheet on mobile, centered modal on desktop */}
      <div className="relative w-full max-w-lg bg-gradient-to-b from-[#0A1628] via-[#0E1F38] to-[#071120] text-white rounded-t-[28px] sm:rounded-[28px] border border-turquoise/35 shadow-[0_-12px_45px_rgba(0,184,169,0.22)] overflow-hidden max-h-[92vh] flex flex-col transition-all duration-300 animate-slideUp">
        
        {/* Subtle top grab handle for mobile feel */}
        <div className="pt-3 pb-1 flex justify-center sm:hidden">
          <div className="w-12 h-1.5 bg-slate-600/70 rounded-full" />
        </div>

        {/* Decorative background glow accents */}
        <div className="pointer-events-none absolute -top-24 -left-24 w-60 h-60 bg-turquoise/15 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 w-60 h-60 bg-gold/15 rounded-full blur-3xl" />

        {/* Top bar with Close button */}
        <div className="relative px-5 pt-3 sm:pt-5 pb-3 flex items-start justify-between border-b border-white/10">
          <div className="flex items-center gap-3.5">
            {/* 3D App Icon Badge */}
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-2xl p-1 bg-gradient-to-tr from-turquoise via-white/40 to-gold shadow-lg shadow-turquoise/25 flex-shrink-0 group">
              <div className="w-full h-full rounded-xl bg-[#091526] overflow-hidden flex items-center justify-center relative">
                <Image
                  src="/assets/logo/logo.png"
                  alt="Al Muxtaar Logo"
                  width={56}
                  height={56}
                  className="object-contain p-1 transform group-hover:scale-105 transition-transform duration-300"
                  priority
                />
              </div>
              {/* Pulsing micro-badge */}
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-turquoise opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-turquoise border-2 border-[#0A1628]" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 id="pwa-install-title" className="text-base sm:text-lg font-bold text-white tracking-tight">
                  Al Muxtaar Société
                </h3>
                <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-turquoise/20 text-turquoise border border-turquoise/40">
                  App 3.0
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
                Installe l&apos;application sur ton téléphone
              </p>
            </div>
          </div>

          <button
            onClick={handleDismiss}
            aria-label="Fermer la boîte d'installation"
            className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-turquoise"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable content body */}
        <div className="px-5 py-4 overflow-y-auto space-y-4">
          {/* Success screen state */}
          {installSuccess ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/40 animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-lg font-bold text-white">Application installée avec succès !</h4>
              <p className="text-xs text-slate-300 max-w-sm mx-auto">
                Retrouve désormais l&apos;icône <strong>Al Muxtaar</strong> directement sur ton écran d&apos;accueil pour réviser à tout moment.
              </p>
            </div>
          ) : (
            <>
              {/* Feature Highlights with 3D feel */}
              <div className="grid grid-cols-3 gap-2 py-1">
                <div className="flex flex-col items-center text-center p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-turquoise/30 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-turquoise/15 flex items-center justify-center mb-1.5 text-turquoise shadow-inner">
                    <Zap className="w-4 h-4 fill-turquoise" />
                  </div>
                  <span className="text-[11px] font-bold text-white">Ultra Rapide</span>
                  <span className="text-[9px] text-slate-400 leading-tight mt-0.5">0 téléchargement lourd</span>
                </div>

                <div className="flex flex-col items-center text-center p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-turquoise/30 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-gold/15 flex items-center justify-center mb-1.5 text-gold shadow-inner">
                    <WifiOff className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-white">Hors-Ligne</span>
                  <span className="text-[9px] text-slate-400 leading-tight mt-0.5">Révise même sans wifi</span>
                </div>

                <div className="flex flex-col items-center text-center p-2.5 rounded-xl bg-white/5 border border-white/5 hover:border-turquoise/30 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-emerald-400/15 flex items-center justify-center mb-1.5 text-emerald-400 shadow-inner">
                    <Bell className="w-4 h-4" />
                  </div>
                  <span className="text-[11px] font-bold text-white">Alertes Bac</span>
                  <span className="text-[9px] text-slate-400 leading-tight mt-0.5">Nouveaux corrigés</span>
                </div>
              </div>

              {/* OS Selector Tabs (Android vs iOS) */}
              <div className="flex items-center p-1 rounded-xl bg-black/40 border border-white/10 text-xs">
                <button
                  type="button"
                  onClick={() => setActiveTab('android')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg font-semibold transition-all ${
                    activeTab === 'android'
                      ? 'bg-gradient-to-r from-turquoise to-[#009E91] text-navy-dark shadow-md shadow-turquoise/25'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Android & Chrome</span>
                  {!isIOS && (
                    <span className="w-1.5 h-1.5 rounded-full bg-navy-dark" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('ios')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg font-semibold transition-all ${
                    activeTab === 'ios'
                      ? 'bg-gradient-to-r from-turquoise to-[#009E91] text-navy-dark shadow-md shadow-turquoise/25'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.98.6-2.61 1.34-.56.64-1.05 1.69-.92 2.71 1 .08 2-.45 2.6-1.2" />
                  </svg>
                  <span>iPhone / iPad (iOS)</span>
                  {isIOS && (
                    <span className="w-1.5 h-1.5 rounded-full bg-navy-dark" />
                  )}
                </button>
              </div>

              {/* Tab 1: Android & Chromium Desktop */}
              {activeTab === 'android' && (
                <div className="space-y-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-gradient-to-br from-turquoise/10 via-white/5 to-transparent border border-turquoise/20">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-xl bg-turquoise/20 text-turquoise flex items-center justify-center flex-shrink-0">
                        <Download className="w-5 h-5 animate-pulse" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          Installation directe en 1 Clic
                        </h4>
                        <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">
                          L&apos;application s&apos;ajoute à ton écran d&apos;accueil sans passer par le Play Store. Elle prend moins de 3 Mo d&apos;espace !
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleInstallClick}
                      className="mt-3.5 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-turquoise via-[#00c9b8] to-emerald-400 text-navy-dark font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-turquoise/30 hover:shadow-turquoise/50 hover:brightness-105 active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <Download className="w-5 h-5" />
                      <span>Installer l&apos;application Al Muxtaar</span>
                    </button>
                  </div>

                  {/* Manual guide for Android if prompt doesn't trigger automatically */}
                  {showAndroidManualHelp && (
                    <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 space-y-2 animate-fadeIn">
                      <p className="font-semibold text-white flex items-center gap-1.5">
                        <span>ℹ️</span> Si la boîte de dialogue ne s&apos;ouvre pas :
                      </p>
                      <ol className="list-decimal list-inside space-y-1 text-slate-300">
                        <li>
                          Appuie sur les <strong>3 points verticaux (⋮)</strong> en haut à droite de Chrome.
                        </li>
                        <li>
                          Choisis <strong>« Installer l&apos;application »</strong> ou <strong>« Ajouter à l&apos;écran d&apos;accueil »</strong>.
                        </li>
                        <li>Valide avec <strong>« Installer »</strong>.</li>
                      </ol>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 2: iOS (iPhone & iPad - Safari) */}
              {activeTab === 'ios' && (
                <div className="space-y-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-gradient-to-br from-gold/10 via-white/5 to-transparent border border-gold/30">
                    <p className="text-xs font-semibold text-gold-light mb-2.5 flex items-center gap-1.5">
                      <span className="inline-block w-2 h-2 rounded-full bg-gold animate-ping" />
                      Sur iPhone & iPad (Safari), suis ces 3 étapes faciles :
                    </p>

                    <div className="space-y-2.5">
                      {/* Step 1 */}
                      <div className="flex items-center gap-3 p-2.5 rounded-lg bg-black/30 border border-white/5">
                        <div className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                          1
                        </div>
                        <div className="flex-1 text-xs">
                          <p className="text-white font-medium">
                            Touche le bouton <strong className="text-turquoise">Partager</strong> en bas de Safari :
                          </p>
                        </div>
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                          <Share className="w-4 h-4 animate-bounce" />
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div className="flex items-center gap-3 p-2.5 rounded-lg bg-black/30 border border-white/5">
                        <div className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                          2
                        </div>
                        <div className="flex-1 text-xs">
                          <p className="text-white font-medium">
                            Défile vers le bas et choisis <strong className="text-turquoise">« Sur l&apos;écran d&apos;accueil »</strong>
                          </p>
                        </div>
                        <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/10 text-slate-200 flex items-center justify-center border border-white/15">
                          <PlusSquare className="w-4 h-4" />
                        </div>
                      </div>

                      {/* Step 3 */}
                      <div className="flex items-center gap-3 p-2.5 rounded-lg bg-black/30 border border-white/5">
                        <div className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                          3
                        </div>
                        <div className="flex-1 text-xs">
                          <p className="text-white font-medium">
                            En haut à droite, appuie sur <strong className="text-turquoise">« Ajouter »</strong>
                          </p>
                        </div>
                        <div className="flex-shrink-0 px-2 py-1 rounded bg-turquoise text-navy-dark font-bold text-[10px]">
                          Ajouter
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 text-[11px] text-slate-300 bg-white/5 p-2 rounded-lg text-center">
                      ✨ L&apos;icône <strong>Al Muxtaar</strong> s&apos;affichera sur votre écran comme une vraie application de l&apos;App Store !
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer controls: dismiss and security reassurance */}
        <div className="px-5 py-3 border-t border-white/10 bg-black/30 flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-turquoise" />
            <span>Application certifiée, légère & sans publicité</span>
          </div>

          <button
            type="button"
            onClick={handleDismiss}
            className="text-xs text-slate-400 hover:text-white underline underline-offset-4 transition-colors"
          >
            Plus tard (continuer sur le web)
          </button>
        </div>
      </div>
    </div>
  );
}

