'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sparkles, ArrowRight, ShieldCheck, Tag, DollarSign } from 'lucide-react';
import { WaveLogo } from '@/components/ui/icons/wave-logo';

export default function InfluencerPortalPage() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  function handleAccess(e: React.FormEvent) {
    e.preventDefault();
    const clean = code.trim().toUpperCase();
    if (!clean) {
      setError('Veuillez renseigner votre code promo ou clé d’accès.');
      return;
    }
    router.push(`/influenceur/${encodeURIComponent(clean)}`);
  }

  return (
    <main className="min-h-screen bg-surface py-12 px-4 flex items-center justify-center">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-turquoise/15 px-3 py-1 text-xs font-bold text-turquoise mb-1 border border-turquoise/25">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Programme Partenaires &amp; Influenceurs</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-navy">
            Espace Ambassadeur
          </h1>
          <p className="text-xs sm:text-sm text-text/70">
            Suivez vos parrainages, consultez vos commissions mensuelles et téléchargez vos relevés officiels.
          </p>
        </div>

        <Card className="border border-navy/10 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-navy">Accéder à mon tableau de bord</CardTitle>
            <CardDescription className="text-xs">
              Entrez votre code promo officiel (ex: MAJOR_S2) ou votre clé secrète partenaire.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAccess} className="space-y-4">
              <div>
                <Input
                  placeholder="Code promo (ex: MAJOR_S2)..."
                  value={code}
                  onChange={(e) => {
                    setCode(e.target.value.toUpperCase());
                    setError('');
                  }}
                  className="font-mono font-bold tracking-wider uppercase text-navy"
                  required
                />
                {error && <p className="text-xs text-rose-600 font-medium mt-1.5">{error}</p>}
              </div>

              <Button type="submit" className="w-full bg-navy hover:bg-navy/90 text-white font-bold flex items-center justify-center gap-2">
                <span>Ouvrir mon tableau de bord</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Info card */}
        <div className="rounded-2xl bg-white border border-navy/10 p-4 space-y-2.5 text-xs text-text/80 shadow-xs">
          <div className="flex items-center gap-2 font-bold text-navy">
            <ShieldCheck className="w-4 h-4 text-turquoise" />
            <span>Comment fonctionne le partenariat ?</span>
          </div>
          <p className="leading-relaxed">
            Pour chaque élève qui s&apos;abonne avec votre code promo, vous recevez <strong className="text-emerald-700 font-black">150 FCFA</strong> (sur la formule 700 F), <strong className="text-amber-600 font-black">400 FCFA</strong> (sur la formule 2 000 F) ou <strong className="text-purple-600 font-black">500 FCFA</strong> (sur la formule annuelle 5 000 F) dès la validation administrative.
          </p>
          <p className="leading-relaxed text-text/60">
            Règlement mensuel par transfert direct Wave sur votre numéro de téléphone.
          </p>
        </div>
      </div>
    </main>
  );
}

