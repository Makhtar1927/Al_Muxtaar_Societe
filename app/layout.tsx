import type { Metadata, Viewport } from "next";
import "./globals.css";
import ServiceWorkerRegister from "@/components/pwa/service-worker-register";

export const metadata: Metadata = {
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
        <ServiceWorkerRegister />
        {children}
      </body>
    </html>
  );
}

