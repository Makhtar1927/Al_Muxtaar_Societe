import type { Metadata, Viewport } from "next";
import "./globals.css";
import ServiceWorkerRegister from "@/components/pwa/service-worker-register";
import { ToastProvider } from "@/components/ui/toast";
import PageTransitionLoader from "@/components/layout/page-transition-loader";
import { Suspense } from "react";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "https://almuxtaar.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Al_Muxtaar_Société | Plateforme Éducative & Numérique",
  description:
    "Plateforme d'excellence éducative au Sénégal : cours en ligne conformes au programme officiel sénégalais, services et solutions numériques.",
  keywords: ["Sénégal", "Al Muxtaar", "Éducation", "Terminale S2", "Mathématiques", "Cours en ligne", "Baccalauréat"],
  authors: [{ name: "Al Muxtaar Société" }],
  manifest: "/manifest.json",
  icons: {
    icon: "/assets/logo/logo.png",
    apple: "/assets/logo/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "fr_SN",
    url: siteUrl,
    siteName: "Al Muxtaar Société",
    title: "Al Muxtaar Doc — Plateforme d'Excellence Bac S2 Sénégal",
    description:
      "La référence éducative pour le Baccalauréat S2 au Sénégal. Cours complets, fiches réflexes, annales corrigées et accompagnement sur-mesure dès 700 FCFA.",
    images: [
      {
        url: "/assets/og-almuxtaar-preview.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Al Muxtaar Doc — Réussir le Bac S2 au Sénégal",
      },
      {
        url: "/assets/og-almuxtaar-preview.jpg",
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Al Muxtaar Doc — Réussir le Bac S2 au Sénégal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Al Muxtaar Doc — Réussir le Bac S2 au Sénégal",
    description:
      "La plateforme d'excellence pour réviser le Bac S2 : cours complets, annales corrigées et fiches réflexes dès 700 FCFA.",
    images: ["/assets/og-almuxtaar-preview.png"],
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

