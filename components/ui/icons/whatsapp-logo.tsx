import React from 'react';
import { cn } from '@/lib/utils';

interface WhatsAppLogoProps {
  className?: string;
  size?: number | string;
  variant?: 'icon' | 'badge' | 'full';
}

/**
 * Logo officiel WhatsApp (SVG vectoriel officiel avec vert WhatsApp #25D366 et combiné blanc).
 */
export function WhatsAppLogo({
  className,
  size = 24,
  variant = 'icon',
}: WhatsAppLogoProps) {
  const dimension = typeof size === 'number' ? `${size}px` : size;

  if (variant === 'badge') {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 text-emerald-950 font-bold text-xs',
          className
        )}
      >
        <WhatsAppLogo size={16} variant="icon" />
        <span className="text-[#128C7E] font-black">WhatsApp</span>
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={cn('inline-flex items-center gap-2', className)}>
        <WhatsAppLogo size={size} variant="icon" />
        <span className="font-extrabold text-[#128C7E] text-sm tracking-tight">
          WhatsApp
        </span>
      </div>
    );
  }

  return (
    <svg
      width={dimension}
      height={dimension}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-label="WhatsApp Logo"
    >
      {/* Cercle vert officiel WhatsApp #25D366 */}
      <circle cx="16" cy="16" r="16" fill="#25D366" />

      {/* Bulle de discussion et combiné téléphonique blanc */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 6C10.48 6 6 10.48 6 16C6 17.85 6.51 19.58 7.39 21.06L6.2 25.4C6.11 25.73 6.4 26.03 6.73 25.93L11.02 24.72C12.47 25.53 14.18 26 16 26C21.52 26 26 21.52 26 16C26 10.48 21.52 6 16 6ZM21.36 19.5C21.14 20.12 20.26 20.64 19.57 20.79C19.09 20.89 18.47 20.97 16.36 20.09C13.66 18.97 11.92 16.23 11.78 16.05C11.65 15.87 10.68 14.58 10.68 13.25C10.68 11.92 11.36 11.27 11.63 11C11.9 10.73 12.17 10.73 12.35 10.73C12.53 10.73 12.71 10.73 12.89 10.74C13.08 10.75 13.33 10.67 13.58 11.27C13.84 11.9 14.47 13.44 14.55 13.6C14.63 13.76 14.71 13.98 14.6 14.2C14.49 14.42 14.41 14.53 14.24 14.73C14.07 14.93 13.88 15.17 13.73 15.33C13.56 15.51 13.38 15.7 13.58 16.04C13.78 16.38 14.48 17.52 15.51 18.44C16.84 19.63 17.92 20.01 18.28 20.19C18.64 20.37 18.86 20.33 19.08 20.07C19.3 19.81 20.02 18.96 20.28 18.6C20.54 18.24 20.8 18.3 21.16 18.43C21.52 18.56 23.44 19.51 23.84 19.71C24.24 19.91 24.51 20.01 24.6 20.17C24.69 20.33 24.69 21.05 24.36 21.98L21.36 19.5Z"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function WhatsAppIcon({ size = 20, className }: { size?: number | string; className?: string }) {
  return <WhatsAppLogo size={size} variant="icon" className={className} />;
}

