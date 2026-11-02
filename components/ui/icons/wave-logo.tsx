import React from 'react';
import { cn } from '@/lib/utils';

interface WaveLogoProps {
  className?: string;
  size?: number | string;
  variant?: 'icon' | 'badge' | 'full';
}

/**
 * Logo officiel Wave Mobile Money (SVG vectoriel fidèle à la charte de marque Wave).
 * Comprend le manchot officiel Wave (fond cyan #1DC3EC, ventre blanc, bec orange).
 */
export function WaveLogo({
  className,
  size = 28,
  variant = 'icon',
}: WaveLogoProps) {
  const dimension = typeof size === 'number' ? `${size}px` : size;

  if (variant === 'full') {
    return (
      <div className={cn('inline-flex items-center gap-2', className)}>
        {/* Manchot Wave */}
        <svg
          width={dimension}
          height={dimension}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0"
        >
          {/* Cercle de fond Cyan Officiel Wave */}
          <circle cx="50" cy="50" r="50" fill="#1DC3EC" />

          {/* Ombre / Pieds orange */}
          <ellipse cx="42" cy="84" rx="7" ry="3.5" fill="#FFA500" />
          <ellipse cx="58" cy="84" rx="7" ry="3.5" fill="#FFA500" />

          {/* Corps Manchot Bleu Nuit */}
          <path
            d="M50 16C37 16 30 26 30 42C30 52 28 66 26 76C25.5 78.5 27.5 81 30 81C34 81 37 77 40 77C45 77 46 80 50 80C54 80 55 77 60 77C63 77 66 81 70 81C72.5 81 74.5 78.5 74 76C72 66 70 52 70 42C70 26 63 16 50 16Z"
            fill="#111827"
          />

          {/* Ailes gauche et droite */}
          <path
            d="M30 42C25 47 22 56 22 64C22 66 24 67 26 65C28 63 31 56 32 50L30 42Z"
            fill="#111827"
          />
          <path
            d="M70 42C75 47 78 56 78 64C78 66 76 67 74 65C72 63 69 56 68 50L70 42Z"
            fill="#111827"
          />

          {/* Ventre blanc iconique */}
          <path
            d="M50 32C42 32 37 38 37 48C37 60 41 74 50 74C59 74 63 60 63 48C63 38 58 32 50 32Z"
            fill="#FFFFFF"
          />

          {/* Yeux du Manchot */}
          <circle cx="43" cy="28" r="4.5" fill="#FFFFFF" />
          <circle cx="57" cy="28" r="4.5" fill="#FFFFFF" />
          <circle cx="44" cy="28" r="2.2" fill="#111827" />
          <circle cx="56" cy="28" r="2.2" fill="#111827" />
          <circle cx="45" cy="27" r="0.8" fill="#FFFFFF" />
          <circle cx="57" cy="27" r="0.8" fill="#FFFFFF" />

          {/* Bec Orange Wave */}
          <path
            d="M50 32L44 38C47 40 53 40 56 38L50 32Z"
            fill="#FF9F0A"
          />
        </svg>

        {/* Typographie officielle "wave" */}
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
        <WaveLogo size={16} variant="icon" />
        <span className="text-[#0284C7] font-black">Wave</span>
      </div>
    );
  }

  // Variant "icon" par défaut (cercle cyan avec le manchot Wave)
  return (
    <svg
      width={dimension}
      height={dimension}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      aria-label="Wave Money Logo"
    >
      {/* Cercle de fond Cyan Officiel Wave */}
      <circle cx="50" cy="50" r="50" fill="#1DC3EC" />

      {/* Pieds orange */}
      <ellipse cx="42" cy="83" rx="7" ry="3.5" fill="#FFA500" />
      <ellipse cx="58" cy="83" rx="7" ry="3.5" fill="#FFA500" />

      {/* Corps Manchot Bleu Nuit */}
      <path
        d="M50 16C37 16 30 26 30 42C30 52 28 66 26 76C25.5 78.5 27.5 81 30 81C34 81 37 77 40 77C45 77 46 80 50 80C54 80 55 77 60 77C63 77 66 81 70 81C72.5 81 74.5 78.5 74 76C72 66 70 52 70 42C70 26 63 16 50 16Z"
        fill="#111827"
      />

      {/* Ailes gauche et droite */}
      <path
        d="M30 42C25 47 22 56 22 64C22 66 24 67 26 65C28 63 31 56 32 50L30 42Z"
        fill="#111827"
      />
      <path
        d="M70 42C75 47 78 56 78 64C78 66 76 67 74 65C72 63 69 56 68 50L70 42Z"
        fill="#111827"
      />

      {/* Ventre blanc iconique */}
      <path
        d="M50 32C42 32 37 38 37 48C37 60 41 74 50 74C59 74 63 60 63 48C63 38 58 32 50 32Z"
        fill="#FFFFFF"
      />

      {/* Yeux du Manchot */}
      <circle cx="43" cy="28" r="4.5" fill="#FFFFFF" />
      <circle cx="57" cy="28" r="4.5" fill="#FFFFFF" />
      <circle cx="44" cy="28" r="2.2" fill="#111827" />
      <circle cx="56" cy="28" r="2.2" fill="#111827" />
      <circle cx="45" cy="27" r="0.8" fill="#FFFFFF" />
      <circle cx="57" cy="27" r="0.8" fill="#FFFFFF" />

      {/* Bec Orange Wave */}
      <path
        d="M50 32L44 38C47 40 53 40 56 38L50 32Z"
        fill="#FF9F0A"
      />
    </svg>
  );
}

export function WaveIcon({ size = 20, className }: { size?: number | string; className?: string }) {
  return <WaveLogo size={size} variant="icon" className={className} />;
}

