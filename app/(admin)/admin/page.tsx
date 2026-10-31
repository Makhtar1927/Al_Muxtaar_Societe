import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Administration | Al Muxtaar Société",
  description: "Tableau de bord d'administration réservé à l'équipe Al Muxtaar.",
};

export default async function AdminPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion?next=/admin");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    redirect("/dashboard");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-surface-muted pb-4">
        <div>
          <span className="text-xs font-bold text-turquoise uppercase tracking-wider">
            Back-office Sécurisé
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-navy mt-1">
            Tableau de Bord Administrateur
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <Badge status="active">Connecté en Admin</Badge>
          <Link href="/dashboard">
            <Button variant="outline" size="sm">
              Vue Élève
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-navy-light uppercase">Demandes en attente</span>
              <Icon name="paiement" size={24} />
            </div>
            <CardTitle className="text-2xl font-black text-gold">0</CardTitle>
            <CardDescription>Paiements Wave / OM à valider</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-navy-light uppercase">Abonnés Actifs</span>
              <Icon name="abonnement" size={24} />
            </div>
            <CardTitle className="text-2xl font-black text-turquoise">0</CardTitle>
            <CardDescription>Élèves avec accès complet</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-navy-light uppercase">Élèves Inscrits</span>
              <Icon name="profil" size={24} />
            </div>
            <CardTitle className="text-2xl font-black text-navy">1</CardTitle>
            <CardDescription>Comptes créés sur la plateforme</CardDescription>
          </CardHeader>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-navy-light uppercase">Revenus du mois</span>
              <Icon name="certificat" size={24} />
            </div>
            <CardTitle className="text-2xl font-black text-navy">0 FCFA</CardTitle>
            <CardDescription>Total collecté via mobile money</CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}

