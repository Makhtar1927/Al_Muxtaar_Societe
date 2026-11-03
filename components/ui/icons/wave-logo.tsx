import React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface WaveLogoProps {
  className?: string;
  size?: number | string;
  variant?: 'icon' | 'badge' | 'full';
}

/**
 * Logo officiel 3D Wave Mobile Money utilisant l'actif 3D haute définition.
 */
export function WaveLogo({
  className,
  size = 28,
  variant = 'icon',
}: WaveLogoProps) {
  const numericSize = typeof size === 'number' ? size : parseInt(String(size), 10) || 28;

  if (variant === 'full') {
    return (
      <div className={cn('inline-flex items-center gap-2', className)}>
        <Image
          src="/icons/wave_icone_3d.svg"
          alt="Wave 3D"
          width={numericSize}
          height={numericSize}
          className="shrink-0 object-contain drop-shadow-sm"
        />
        <span className="font-extrabold tracking-tight text-navy text-base leading-none">
          wave
        </span>
      </div>
    );
  }

  if (variant === 'badge') {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#1DC3EC]/15 border border-[#1DC3EC]/30 text-navy font-bold text-xs',
          className
        )}
      >
        <Image
          src="/icons/wave_icone_3d.svg"
          alt="Wave 3D"
          width={18}
          height={18}
          className="shrink-0 object-contain"
        />
        <span className="text-[#0284C7] font-black">Wave</span>
      </div>
    );
  }

  return (
    <Image
      src="/icons/wave_icone_3d.svg"
      alt="Wave 3D"
      width={numericSize}
      height={numericSize}
      className={cn('shrink-0 object-contain drop-shadow-sm', className)}
    />
  );
}

export function WaveIcon({ size = 20, className }: { size?: number | string; className?: string }) {
  return <WaveLogo size={size} variant="icon" className={className} />;
}

