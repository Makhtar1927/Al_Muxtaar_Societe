import * as React from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-surface">
      {/* Mini header */}
      <div className="border-b border-surface-muted bg-white/80 py-4 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4">
          <Logo size="md" />
          <Link
            href="/"
            className="text-xs font-semibold text-navy-light hover:text-turquoise transition-colors"
          >
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex flex-1 items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">{children}</div>
      </div>

      {/* Mini footer */}
      <div className="border-t border-surface-muted bg-white py-4 text-center text-xs text-navy-light">
        <p>© {new Date().getFullYear()} Al Muxtaar Société · Dakar, Sénégal</p>
      </div>
    </div>
  );
}

