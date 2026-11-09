"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import {
  Home,
  Compass,
  BookOpen,
  User,
} from "lucide-react";

export function MobileBottomNav() {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsAuthenticated(!!user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session?.user);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // 4 onglets clés épurés (sans "Tarifs")
  const navItems = [
    {
      label: "Accueil",
      href: "/",
      icon: Home,
      isActive: pathname === "/",
    },
    {
      label: "Catalogue",
      href: "/doc/catalogue",
      icon: Compass,
      isActive: pathname.startsWith("/doc/catalogue"),
    },
    {
      label: "Mes Cours",
      href: "/cours",
      icon: BookOpen,
      isActive: pathname.startsWith("/cours"),
    },
    {
      label: isAuthenticated ? "Compte" : "Connexion",
      href: isAuthenticated ? "/compte" : "/connexion",
      icon: User,
      isActive:
        pathname.startsWith("/compte") ||
        pathname.startsWith("/connexion") ||
        pathname.startsWith("/inscription") ||
        pathname.startsWith("/dashboard"),
    },
  ];

  // Masquer la bottom bar dans les vues admin
  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <nav
      role="navigation"
      aria-label="Navigation principale mobile"
      className="fixed left-3.5 right-3.5 sm:left-6 sm:right-6 max-w-md mx-auto z-40 md:hidden transition-all duration-300"
      style={{
        bottom: "calc(0.85rem + env(safe-area-inset-bottom, 0px))",
      }}
    >
      {/* Capsule 3D : galbe dégradé, double bordure, biseau supérieur et ombre multicouche */}
      <div
        className="relative flex items-center justify-between rounded-full p-1.5 transition-all duration-300"
        style={{
          background:
            "linear-gradient(180deg, rgba(255, 255, 255, 0.98) 0%, rgba(250, 252, 255, 0.94) 60%, rgba(238, 243, 248, 0.92) 100%)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          boxShadow:
            "0 14px 34px -4px rgba(23, 34, 47, 0.22), 0 6px 14px -2px rgba(23, 34, 47, 0.12), inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.9), inset 0 -2px 3px 0 rgba(15, 23, 42, 0.05)",
          border: "1px solid rgba(215, 226, 236, 0.85)",
        }}
      >
        {navItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group relative flex flex-col items-center justify-center flex-1 py-1.5 px-2 rounded-full transition-all duration-200 select-none",
                item.isActive
                  ? "text-white"
                  : "text-navy/70 hover:text-navy active:scale-95"
              )}
            >
              {/* Pastille 3D surélevée pour l'onglet actif */}
              {item.isActive ? (
                <div
                  className="absolute inset-0 rounded-full transition-all duration-200 animate-in fade-in zoom-in-95"
                  style={{
                    background:
                      "linear-gradient(180deg, #05cdbc 0%, #00b8a9 45%, #009e91 100%)",
                    boxShadow:
                      "0 5px 14px -1px rgba(0, 184, 169, 0.45), inset 0 1.5px 1px 0 rgba(255, 255, 255, 0.55), inset 0 -2px 3px 0 rgba(0, 70, 64, 0.25)",
                    transform: "translateY(-1px)",
                  }}
                />
              ) : (
                /* Halo discret au tap/hover pour les inactifs */
                <div className="absolute inset-0 rounded-full opacity-0 group-active:opacity-100 bg-navy/5 transition-opacity duration-150" />
              )}

              {/* Contenu de l'onglet avec relief */}
              <div className="relative z-10 flex flex-col items-center justify-center">
                <IconComponent
                  className={cn(
                    "w-5 h-5 transition-transform duration-200",
                    item.isActive
                      ? "stroke-[2.5] scale-105 drop-shadow-[0_1px_1.5px_rgba(0,0,0,0.25)]"
                      : "stroke-[2] text-navy/70 group-hover:text-navy group-hover:scale-105"
                  )}
                />

                <span
                  className={cn(
                    "text-[10px] tracking-tight mt-0.5 leading-none transition-all",
                    item.isActive
                      ? "font-black text-white drop-shadow-[0_1px_1px_rgba(0,0,0,0.2)]"
                      : "font-semibold text-navy/70 group-hover:text-navy"
                  )}
                >
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
