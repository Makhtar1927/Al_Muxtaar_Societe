import type { Metadata, Viewport } from "next";
import "./globals.css";
import ServiceWorkerRegister from "@/components/pwa/service-worker-register";
import { ToastProvider } from "@/components/ui/toast";
import PageTransitionLoader from "@/components/layout/page-transition-loader";
import { Suspense } from "react";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://almuxtaar.sn"),
  title: "Al_Muxtaar_Société | Plateforme Éducative & Numérique",
  description:
    "Plateforme d'excellence éducative au Sénégal : cours en ligne conformes au programme officiel sénégalais, services et solutions numériques.",
  keywords: ["Sénégal", "Al Muxtaar", "Éducation", "Terminale S2", "Mathématiques", "Cours en ligne", "Baccalauréat"],
  authors: [{ name: "Al Muxtaar Société" }],
  manifest: "/manifest.json",
  icons: {
    icon: "/assets/logo/al_muxtaar_symbole.svg",
    apple: "/assets/logo/al_muxtaar_symbole.svg",
  },
  openGraph: {
    type: "website",
    locale: "fr_SN",
    url: "https://almuxtaar.sn",
    siteName: "Al Muxtaar Société",
    title: "Al Muxtaar Société — Éducation d'excellence & Services au Sénégal",
    description:
      "La référence éducative pour le Baccalauréat S2 au Sénégal. Cours avec KaTeX, exercices corrigés et suivi personnalisé.",
    images: [
      {
        url: "/assets/logo/al_muxtaar_symbole.svg",
        width: 715,
        height: 605,
        alt: "Logo Symbole Al Muxtaar Société",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Al Muxtaar Société — Réussir le Bac S2 au Sénégal",
    description:
      "Cours de mathématiques conformes au programme sénégalais avec exercices corrigés et quiz interactifs.",
    images: ["/assets/logo/al_muxtaar_symbole.svg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#00B8A9",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full">
      <body className="flex min-h-screen flex-col bg-surface text-navy-dark">
        <Suspense fallback={null}>
          <PageTransitionLoader />
        </Suspense>
        <ServiceWorkerRegister />
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}

