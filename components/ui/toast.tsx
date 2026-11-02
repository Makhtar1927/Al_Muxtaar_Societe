'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import StudyIcon, { StudyIconName } from '@/components/ui/study-icon';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
}

interface ToastContextType {
  toasts: ToastMessage[];
  showToast: (message: string, type?: ToastType, title?: string) => void;
  removeToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined);

const TOAST_ICON_MAP: Record<ToastType, StudyIconName> = {
  success: 'correct',
  error: 'incorrect',
  warning: 'avertissement',
  info: 'cible_reflexe',
};

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = React.useCallback(
    (message: string, type: ToastType = 'info', title?: string) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, type, title, message }]);

      // Auto-dismiss après 4.5 secondes
      setTimeout(() => {
        removeToast(id);
      }, 4500);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}

      {/* ============================================================
          CONTENEUR DE TOASTS : EN HAUT ET CENTRÉ (OPTIMISÉ MOBILE & DESKTOP)
          ============================================================ */}
      <div
        aria-live="polite"
        className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2.5 w-[92%] sm:w-auto sm:min-w-[360px] sm:max-w-md pointer-events-none"
      >
        {toasts.map((toast) => {
          const iconName = TOAST_ICON_MAP[toast.type];

          return (
            <div
              key={toast.id}
              className={cn(
                'pointer-events-auto flex items-start gap-3 rounded-2xl border-2 p-3.5 sm:p-4 shadow-xl transition-all duration-300 animate-in fade-in slide-in-from-top-3 backdrop-blur-md bg-white/95',
                {
                  'border-emerald-400/60 shadow-emerald-900/10': toast.type === 'success',
                  'border-rose-400/60 shadow-rose-900/10': toast.type === 'error',
                  'border-amber-400/60 shadow-amber-900/10': toast.type === 'warning',
                  'border-turquoise/50 shadow-navy/10': toast.type === 'info',
                }
              )}
            >
              {/* Icône officielle SVG Al Muxtaar */}
              <div className="shrink-0 mt-0.5">
                <StudyIcon name={iconName} size={22} />
              </div>

              {/* Contenu textuel */}
              <div className="flex-1 min-w-0 pr-1">
                {toast.title ? (
                  <h4 className="text-xs font-black text-navy uppercase tracking-wider mb-0.5">
                    {toast.title}
                  </h4>
                ) : (
                  <h4 className="text-xs font-black uppercase tracking-wider mb-0.5 text-navy">
                    {toast.type === 'success'
                      ? 'Succès'
                      : toast.type === 'error'
                      ? 'Erreur'
                      : toast.type === 'warning'
                      ? 'Attention'
                      : 'Information'}
                  </h4>
                )}
                <p className="text-xs sm:text-sm font-semibold text-navy/90 leading-snug">
                  {toast.message}
                </p>
              </div>

              {/* Bouton de fermeture tactile */}
              <button
                type="button"
                onClick={() => removeToast(toast.id)}
                className="shrink-0 text-navy/40 hover:text-navy p-1 rounded-lg transition-colors min-h-[28px] min-w-[28px] flex items-center justify-center font-bold text-base -mr-1 -mt-1 active:scale-90"
                aria-label="Fermer la notification"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
