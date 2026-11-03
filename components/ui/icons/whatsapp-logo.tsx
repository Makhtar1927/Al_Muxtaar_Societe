import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface WhatsAppLogoProps {
  className?: string;
  size?: number | string;
  variant?: 'icon' | 'badge' | 'full';
}

/**
 * Logo officiel 3D WhatsApp utilisant l'actif 3D haute définition.
 */
export function WhatsAppLogo({
  className,
  size = 24,
  variant = 'icon',
}: WhatsAppLogoProps) {
  const numericSize = typeof size === 'number' ? size : parseInt(String(size), 10) || 24;

  if (variant === 'badge') {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 text-emerald-950 font-bold text-xs',
          className
        )}
      >
        <Image
          src="/icons/whatsapp_3d.svg"
          alt="WhatsApp 3D"
          width={18}
          height={18}
          className="shrink-0 object-contain"
        />
        <span className="text-[#128C7E] font-black">WhatsApp</span>
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={cn('inline-flex items-center gap-2', className)}>
        <Image
          src="/icons/whatsapp_3d.svg"
          alt="WhatsApp 3D"
          width={numericSize}
          height={numericSize}
          className="shrink-0 object-contain drop-shadow-sm"
        />
        <span className="font-extrabold text-[#128C7E] text-sm tracking-tight">
          WhatsApp
        </span>
      </div>
    );
  }

  return (
    <Image
      src="/icons/whatsapp_3d.svg"
      alt="WhatsApp 3D"
      width={numericSize}
      height={numericSize}
      className={cn('shrink-0 object-contain drop-shadow-sm', className)}
    />
  );
}

export function WhatsAppIcon({ size = 20, className }: { size?: number | string; className?: string }) {
  return <WhatsAppLogo size={size} variant="icon" className={className} />;
}

