import type { Metadata, Viewport } from "next";
import "./globals.css";
import ServiceWorkerRegister from "@/components/pwa/service-worker-register";
import PwaInstallPrompt from "@/components/pwa/pwa-install-prompt";
import { ToastProvider } from "@/components/ui/toast";
import PageTransitionLoader from "@/components/layout/page-transition-loader";
import { Suspense } from "react";

function getSiteUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (envUrl && !envUrl.includes('localhost') && !envUrl.includes('127.0.0.1')) {
    return envUrl.replace(/\/+$/, '');
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL.replace(/\/+$/, '')}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL.replace(/\/+$/, '')}`;
  }
  return 'https://almuxtaar.vercel.app';
}

const siteUrl = getSiteUrl();

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
    title: "Al Muxtaar Société — Tous tes cours, de la 3ème à la Terminale",
    description:
      "Plateforme éducative de référence au Sénégal : cours complets, exercices corrigés et fiches réflexes dès 700 FCFA / mois. Programme sénégalais & paiement direct Wave.",
    images: [
      {
        url: `${siteUrl}/assets/apercu-lien-1200x630.jpg`,
        secureUrl: `${siteUrl}/assets/apercu-lien-1200x630.jpg`,
        width: 1200,
        height: 630,
        type: "image/jpeg",
        alt: "Al Muxtaar Société — Tous tes cours de la 3ème à la Terminale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Al Muxtaar Société — Tous tes cours, de la 3ème à la Terminale",
    description:
      "Plateforme éducative de référence au Sénégal : cours complets, exercices corrigés et fiches réflexes dès 700 FCFA / mois.",
    images: [`${siteUrl}/assets/apercu-lien-1200x630.jpg`],
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
        <PwaInstallPrompt />
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}

