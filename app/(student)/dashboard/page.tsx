import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { Avatar } from "@/components/ui/avatar";

export const metadata: Metadata = {
  title: "Tableau de Bord Élève | Al Muxtaar Société",
  description: "Espace personnel de révision et suivi de progression en Terminale S2.",
};

export default async function DashboardPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion?next=/dashboard");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const firstName = profile?.first_name || user.user_metadata?.first_name || "Élève";
  const avatarName = profile?.avatar || "avatar_01_eleve_garcon.svg";

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-12 space-y-8">
      {/* Bienvenue card */}
      <div className="rounded-2xl bg-navy p-6 text-white shadow-soft sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <Avatar name={avatarName} size="xl" isBordered />
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-0.5 text-xs font-semibold text-turquoise">
              Espace Élève · Terminale S2
            </div>
            <h1 className="text-2xl sm:text-3xl font-black mt-1">
              Bienvenue, {firstName} !
            </h1>
            <p className="text-xs sm:text-sm text-surface-muted mt-0.5">
              Préparez sereinement votre Baccalauréat avec Al_Muxtaar_Doc.
            </p>
          </div>
        </div>
        <div>
          <Link href="/abonnement">
            <Button variant="primary" size="md">
              <Icon name="abonnement" size={18} className="mr-2" />
              Gérer mon abonnement
            </Button>
          </Link>
        </div>
      </div>

      {/* Raccourcis & Progression */}
      <div className="grid gap-6 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Terminale S2 · Mathématiques</CardTitle>
              <Badge status="active">Actif</Badge>
            </div>
            <CardDescription>Programme officiel sénégalais</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-navy-light leading-relaxed mb-4">
              9 chapitres complets incluant limites, dérivation, fonctions logarithmes et exponentielles, nombres complexes et calcul intégral.
            </p>
            <Link href="/doc/catalogue">
              <Button variant="primary" size="sm" className="w-full">
                Ouvrir les chapitres
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Statut de l&apos;Abonnement</CardTitle>
              <Badge status="pending">En attente ou Inactif</Badge>
            </div>
            <CardDescription>Formule mensuelle (700 FCFA)</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-navy-light leading-relaxed mb-4">
              Pour débloquer l&apos;intégralité des corrigés détaillés et des quiz, souscrivez par Wave ou Orange Money.
            </p>
            <Link href="/abonnement">
              <Button variant="outline" size="sm" className="w-full">
                Souscrire maintenant
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

