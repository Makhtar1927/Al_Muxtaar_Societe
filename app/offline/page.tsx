import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata = {
  title: 'Hors-ligne — Al Muxtaar',
  description: 'Vous êtes actuellement hors connexion internet.',
};

export default function OfflinePage() {
  return (
    <main className="min-h-screen bg-surface flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-navy/10 p-8 text-center shadow-lg space-y-6">
        <div className="w-16 h-16 rounded-full bg-gold/15 text-gold flex items-center justify-center text-3xl mx-auto">
          📡
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-navy">Vous êtes hors-ligne</h1>
          <p className="text-xs sm:text-sm text-text/70 leading-relaxed">
            Votre appareil n&apos;est actuellement pas connecté à internet (réseau mobile ou Wi-Fi interrompu).
          </p>
        </div>

        <div className="rounded-2xl bg-surface p-4 border border-navy/10 text-left text-xs text-text/75 space-y-2">
          <p className="font-semibold text-navy">💡 Ce que vous pouvez faire :</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Les leçons que vous avez déjà ouvertes restent consultables dans votre historique.</li>
            <li>Vérifiez vos données mobiles (Orange, Free, Expresso).</li>
            <li>Revenez sur cette page dès que la connexion est rétablie.</li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <Link href="/dashboard">
            <Button variant="primary" className="w-full">
              Tenter de recharger le tableau de bord
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline" className="w-full">
              Page d&apos;accueil
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

