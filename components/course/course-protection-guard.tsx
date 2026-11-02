'use client';

import React, { useEffect, useState } from 'react';
import StudyIcon from '@/components/ui/study-icon';

interface CourseProtectionGuardProps {
  children?: React.ReactNode;
  studentName?: string;
  studentPhone?: string;
}

/**
 * Système de protection avancée des cours contre les captures d'écran et enregistrements vidéo.
 * Al Muxtaar Société - Sécurisation du contenu pédagogique.
 */
export default function CourseProtectionGuard({
  children,
  studentName = 'Al Muxtaar Société',
  studentPhone = '+221',
}: CourseProtectionGuardProps) {
  const [isBlurred, setIsBlurred] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  useEffect(() => {
    // 1. Bloquer le clic droit (contextmenu)
    function handleContextMenu(e: MouseEvent) {
      e.preventDefault();
      triggerWarning('Le clic droit et le téléchargement d\'images sont désactivés pour protéger le cours.');
    }

    // 2. Bloquer la sélection de texte et le copier-coller
    function handleCopy(e: ClipboardEvent) {
      e.preventDefault();
      triggerWarning('La copie du contenu pédagogique n\'est pas autorisée.');
    }

    // 3. Bloquer le glisser-déposer des images/schémas
    function handleDragStart(e: DragEvent) {
      e.preventDefault();
    }

    // 4. Bloquer les raccourcis clavier de capture, impression et inspection
    function handleKeyDown(e: KeyboardEvent) {
      // PrintScreen (Windows)
      if (e.key === 'PrintScreen' || e.code === 'PrintScreen') {
        e.preventDefault();
        // Vider le presse-papier pour écraser la capture
        try {
          navigator.clipboard.writeText('Contenu protégé - Al Muxtaar Société');
        } catch {
          // Ignore
        }
        setIsBlurred(true);
        triggerWarning('Les captures d\'écran sont strictement interdites sur ce cours.');
        setTimeout(() => setIsBlurred(false), 2000);
        return;
      }

      // Ctrl+P / Cmd+P (Impression / Export PDF)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'p') {
        e.preventDefault();
        triggerWarning('L\'impression et l\'exportation de ce cours sont interdites.');
        return;
      }

      // Ctrl+S / Cmd+S (Enregistrer la page)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        triggerWarning('L\'enregistrement de la page est désactivé.');
        return;
      }

      // Ctrl+U (Code source)
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'u') {
        e.preventDefault();
        return;
      }

      // F12 / DevTools
      if (e.key === 'F12' || ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key.toLowerCase() === 'i' || e.key.toLowerCase() === 'j' || e.key.toLowerCase() === 'c'))) {
        e.preventDefault();
        triggerWarning('L\'inspection du contenu est protégée.');
        return;
      }
    }

    // 5. Détecter l'activation d'outils de capture / enregistrement vidéo (perte de focus / multitâche)
    function handleVisibilityChange() {
      if (document.hidden) {
        setIsBlurred(true);
      } else {
        // Petit délai avant de restaurer
        setTimeout(() => setIsBlurred(false), 250);
      }
    }

    function handleWindowBlur() {
      // Flouter quand la fenêtre perd le focus (ex: outil de capture d'écran externe lancé)
      setIsBlurred(true);
    }

    function handleWindowFocus() {
      setIsBlurred(false);
    }

    let warningTimeout: NodeJS.Timeout;
    function triggerWarning(msg: string) {
      setWarningMessage(msg);
      setShowWarning(true);
      clearTimeout(warningTimeout);
      warningTimeout = setTimeout(() => {
        setShowWarning(false);
      }, 3500);
    }

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopy);
    document.addEventListener('cut', handleCopy);
    document.addEventListener('dragstart', handleDragStart);
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopy);
      document.removeEventListener('cut', handleCopy);
      document.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      clearTimeout(warningTimeout);
    };
  }, []);

  return (
    <>
      {/* Styles CSS injectés pour interdire la sélection et masquer totalement lors d'une impression */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .course-protected-zone {
          -webkit-user-select: none !important;
          -moz-user-select: none !important;
          -ms-user-select: none !important;
          user-select: none !important;
          -webkit-touch-callout: none !important;
        }

        .course-protected-zone img,
        .course-protected-zone svg {
          pointer-events: none !important;
          -webkit-user-drag: none !important;
          user-select: none !important;
        }

        /* Masquage total en cas de tentative d'impression papier ou PDF */
        @media print {
          body {
            display: none !important;
          }
        }
      `,
        }}
      />

      {/* Overlay de masquage anti-capture vidéo (activé lors de capture ou bascule d'écran) */}
      {isBlurred && (
        <div className="fixed inset-0 z-[99999] bg-[#0c1c2b]/95 backdrop-blur-2xl flex flex-col items-center justify-center p-6 text-center text-white select-none transition-all duration-200">
          <div className="w-16 h-16 rounded-3xl bg-white/10 border border-white/20 flex items-center justify-center shadow-2xl mb-4">
            <StudyIcon name="avertissement" size={32} />
          </div>
          <h3 className="text-xl font-black tracking-tight text-white mb-2">
            Contenu Sécurisé &amp; Protégé
          </h3>
          <p className="text-sm text-white/70 max-w-sm leading-relaxed">
            Pour protéger la propriété intellectuelle des cours Al Muxtaar Société, les captures d&apos;écran et enregistrements vidéo sont désactivés.
          </p>
          <p className="text-xs text-turquoise font-semibold mt-4">
            Revenez sur la fenêtre du cours pour continuer votre lecture.
          </p>
        </div>
      )}

      {/* Notification discrète d'avertissement en haut */}
      {showWarning && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[99999] w-[90%] max-w-md pointer-events-none animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="rounded-2xl bg-navy/95 border-2 border-amber-400/80 text-white p-3.5 shadow-2xl backdrop-blur-md flex items-center gap-3">
            <StudyIcon name="avertissement" size={24} className="shrink-0" />
            <div className="flex-1 text-xs sm:text-sm font-semibold leading-snug">
              {warningMessage}
            </div>
          </div>
        </div>
      )}

      {/* Contenu protégé enveloppé */}
      <div className="course-protected-zone w-full">
        {children}
      </div>
    </>
  );
}

