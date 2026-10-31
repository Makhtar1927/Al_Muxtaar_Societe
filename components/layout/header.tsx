"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import NotificationBell from "@/components/notifications/notification-bell";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/doc", label: "Al_Muxtaar_Doc", badge: "Actif" },
    { href: "/service", label: "Al_Muxtaar_Service", badge: "Bientôt" },
    { href: "/boutique", label: "Al_Muxtaar_Boutique", badge: "Bientôt" },
  ];

  return (
    <header className="sticky top-0 z-40 w-full border-b border-surface-muted bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/assets/logo/logo.png"
            alt="Logo Al Muxtaar Société"
            width={40}
            height={40}
            className="h-10 w-auto object-contain"
            priority
          />
          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-black tracking-tight text-navy leading-none">
              Al Muxtaar
            </span>
            <span className="text-[10px] font-bold tracking-widest text-turquoise uppercase">
              Société
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex items-center gap-1.5 rounded-2xl px-3.5 py-2 text-sm font-semibold transition-colors min-h-[44px]",
                  isActive
                    ? "bg-surface text-turquoise"
                    : "text-navy hover:bg-surface hover:text-turquoise"
                )}
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span
                    className={cn(
                      "rounded-full px-2 py-0.5 text-[10px] font-bold",
                      link.badge === "Actif"
                        ? "bg-turquoise-light text-turquoise"
                        : "bg-surface-muted text-navy-light"
                    )}
                  >
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Actions (Connexion / Mon compte / Notifications) */}
        <div className="hidden md:flex items-center gap-2">
          <NotificationBell />
          <Link href="/compte">
            <Button variant="ghost" size="md">
              Mon compte
            </Button>
          </Link>
          <Link href="/connexion">
            <Button variant="primary" size="md">
              Connexion
            </Button>
          </Link>
        </div>

        {/* Mobile Actions & Toggle */}
        <div className="md:hidden flex items-center gap-2">
          <NotificationBell />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl text-navy hover:bg-surface transition-colors"
            aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-b border-surface-muted bg-white px-4 pt-2 pb-6 shadow-xl animate-in slide-in-from-top-2">
          <div className="flex flex-col space-y-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-2xl px-4 py-3 text-base font-semibold text-navy hover:bg-surface min-h-[48px]"
              >
                <span>{link.label}</span>
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-xs font-bold",
                    link.badge === "Actif"
                      ? "bg-turquoise-light text-turquoise"
                      : "bg-surface-muted text-navy-light"
                  )}
                >
                  {link.badge}
                </span>
              </Link>
            ))}
            <div className="pt-4 border-t border-surface-muted flex flex-col gap-2">
              <Link
                href="/compte"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full"
              >
                <Button variant="outline" size="md" className="w-full">
                  Mon compte
                </Button>
              </Link>
              <Link
                href="/connexion"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full"
              >
                <Button variant="primary" size="md" className="w-full">
                  Connexion / S&apos;inscrire
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

