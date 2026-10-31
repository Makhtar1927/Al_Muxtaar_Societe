import React from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export type LogoVariant = "turquoise" | "blanc" | "bleu_nuit";

interface LogoProps {
  /**
   * Variante chromatique du symbole Al Muxtaar :
   * - "turquoise" : symbole officiel turquoise (#02B9AE)
   * - "blanc" : symbole monochrome blanc (#FFFFFF) idéal sur fond sombre (navy)
   * - "bleu_nuit" : symbole monochrome bleu nuit (#243447)
   */
  variant?: LogoVariant;
  /**
   * Taille en pixels ou classes prédéfinies
   */
  size?: "sm" | "md" | "lg" | "xl" | number;
  /**
   * Afficher ou masquer le texte de marque "Al Muxtaar Société" à côté du symbole
   */
  showText?: boolean;
  /**
   * Style du texte pour adaptation au fond
   */
  textVariant?: "dark" | "light";
  /**
   * Lien de redirection (par défaut "/" si spécifié, ou désactivé avec false)
   */
  href?: string | false;
  /**
   * Classes CSS additionnelles pour le conteneur
   */
  className?: string;
  /**
   * Chargement prioritaire Next.js Image
   */
  priority?: boolean;
}

const logoSources: Record<LogoVariant, string> = {
  turquoise: "/assets/logo/al_muxtaar_symbole.svg",
  blanc: "/assets/logo/al_muxtaar_symbole_blanc.svg",
  bleu_nuit: "/assets/logo/al_muxtaar_symbole_bleu_nuit.svg",
};

const sizeDimensions: Record<"sm" | "md" | "lg" | "xl", { width: number; height: number; imgClass: string }> = {
  sm: { width: 28, height: 24, imgClass: "h-6 w-auto" },
  md: { width: 40, height: 34, imgClass: "h-9 w-auto" },
  lg: { width: 56, height: 48, imgClass: "h-12 w-auto" },
  xl: { width: 80, height: 68, imgClass: "h-16 w-auto" },
};

export function Logo({
  variant = "turquoise",
  size = "md",
  showText = true,
  textVariant = "dark",
  href = "/",
  className,
  priority = false,
}: LogoProps) {
  const src = logoSources[variant];

  const dim =
    typeof size === "number"
      ? { width: size, height: Math.round(size * (605 / 715)), imgClass: "" }
      : sizeDimensions[size];

  const content = (
    <div className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src={src}
        alt="Symbole Al Muxtaar"
        width={dim.width}
        height={dim.height}
        className={cn("object-contain shrink-0", dim.imgClass)}
        priority={priority}
      />
      {showText && (
        <div className="flex flex-col select-none">
          <span
            className={cn(
              "font-black tracking-tight leading-none",
              size === "sm" ? "text-sm" : size === "lg" || size === "xl" ? "text-xl sm:text-2xl" : "text-base sm:text-lg",
              textVariant === "light" ? "text-white" : "text-navy"
            )}
          >
            Al Muxtaar
          </span>
          <span
            className={cn(
              "font-bold tracking-widest uppercase",
              size === "sm" ? "text-[8px]" : "text-[10px]",
              textVariant === "light" ? "text-turquoise-light" : "text-turquoise"
            )}
          >
            Société
          </span>
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex items-center transition-opacity hover:opacity-90">
        {content}
      </Link>
    );
  }

  return content;
}

export default Logo;

