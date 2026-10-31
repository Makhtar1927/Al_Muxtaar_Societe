"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "info" | "warning";

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

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  const removeToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = React.useCallback(
    (message: string, type: ToastType = "info", title?: string) => {
      const id = Math.random().toString(36).substring(2, 9);
      setToasts((prev) => [...prev, { id, type, title, message }]);

      // Auto-dismiss after 4 seconds
      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      {/* Toast container */}
      <div
        aria-live="polite"
        className="fixed bottom-4 right-4 z-50 flex max-w-sm flex-col gap-2 w-full px-4 sm:px-0 pointer-events-none"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={cn(
              "pointer-events-auto flex items-start gap-3 rounded-2xl border p-4 shadow-hover transition-all duration-300 animate-in fade-in slide-in-from-bottom-2 bg-white",
              {
                "border-turquoise/40 text-navy": toast.type === "success",
                "border-coral/40 text-navy": toast.type === "error",
                "border-gold/40 text-navy": toast.type === "warning",
                "border-surface-muted text-navy": toast.type === "info",
              }
            )}
          >
            <div className="mt-0.5">
              {toast.type === "success" && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-turquoise text-white text-xs font-bold">
                  ✓
                </span>
              )}
              {toast.type === "error" && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-coral text-white text-xs font-bold">
                  !
                </span>
              )}
              {toast.type === "warning" && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-gold text-navy text-xs font-bold">
                  ▲
                </span>
              )}
              {toast.type === "info" && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-navy text-white text-xs font-bold">
                  i
                </span>
              )}
            </div>
            <div className="flex-1">
              {toast.title && (
                <h4 className="text-xs font-bold text-navy uppercase tracking-wider">
                  {toast.title}
                </h4>
              )}
              <p className="text-sm font-medium text-navy-light">{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-navy-light/60 hover:text-navy p-1 transition-colors min-h-[32px] min-w-[32px] flex items-center justify-center"
              aria-label="Fermer la notification"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}

