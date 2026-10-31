"use client";

import * as React from "react";
import {
  BookOpen,
  Briefcase,
  ShoppingBag,
  GraduationCap,
  Calculator,
  Dna,
  Atom,
  LayoutDashboard,
  CreditCard,
  Sparkles,
  HelpCircle,
  Smartphone,
  Box,
  TrendingUp,
  Award,
  Wallet,
  ShieldCheck,
  Bell,
  Compass,
  Code2,
  Wrench,
  Lock,
  User,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Clock,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  Search,
  Menu,
  X,
  FileText,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Map des icônes unicolores professionnelles Al Muxtaar
const ICON_MAP: Record<string, LucideIcon> = {
  // Modules principaux
  "01_module_doc": BookOpen,
  doc: BookOpen,
  "02_module_service": Briefcase,
  service: Briefcase,
  "03_module_boutique": ShoppingBag,
  boutique: ShoppingBag,

  // Matières & Pédagogie
  "04_cours": GraduationCap,
  cours: GraduationCap,
  "05_maths": Calculator,
  maths: Calculator,
  "06_svt": Dna,
  svt: Dna,
  "07_physique_chimie": Atom,
  physique: Atom,

  // Tableau de bord & Profil
  "08_dashboard": LayoutDashboard,
  dashboard: LayoutDashboard,
  "09_abonnement": CreditCard,
  abonnement: CreditCard,
  "10_genie_en_herbe": Sparkles,
  genie: Sparkles,
  "11_quiz": HelpCircle,
  quiz: HelpCircle,
  "12_hors_ligne": Smartphone,
  hors_ligne: Smartphone,
  "13_illustration_3d": Box,
  illustration_3d: Box,
  "14_progression": TrendingUp,
  progression: TrendingUp,
  "15_certificat": Award,
  certificat: Award,

  // Paiement & Sécurité
  "16_paiement_mobile": Wallet,
  paiement: Wallet,
  wave: Wallet,
  "17_securite_admin": ShieldCheck,
  securite: ShieldCheck,
  "18_notification": Bell,
  notification: Bell,
  "19_orientation": Compass,
  orientation: Compass,
  "20_developpement": Code2,
  developpement: Code2,
  "21_maintenance": Wrench,
  maintenance: Wrench,
  "22_cadenas_acces": Lock,
  cadenas: Lock,
  "23_eleve_profil": User,
  profil: User,
  "24_calendrier_abonnement": Calendar,
  calendrier: Calendar,

  // Utilitaires UI
  check: CheckCircle2,
  alert: AlertCircle,
  clock: Clock,
  arrow_right: ArrowRight,
  external: ExternalLink,
  chevron_down: ChevronDown,
  search: Search,
  menu: Menu,
  close: X,
  file: FileText,
};

export type IconName = keyof typeof ICON_MAP;
export const ICON_NAMES = Object.keys(ICON_MAP) as IconName[];

export interface IconProps extends React.SVGProps<SVGSVGElement> {
  name: IconName;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
  className?: string;
}

const SIZE_MAP: Record<string, number> = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 48,
};

export function Icon({ name, size = "md", className, ...props }: IconProps) {
  const IconComponent = ICON_MAP[name] || BookOpen;
  const pixelSize = typeof size === "number" ? size : SIZE_MAP[size] || 24;

  return (
    <IconComponent
      size={pixelSize}
      strokeWidth={2}
      className={cn("shrink-0 transition-colors", className)}
      {...props}
    />
  );
}
