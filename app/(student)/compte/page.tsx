import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CompteForm } from "@/components/student/compte-form";

export const metadata: Metadata = {
  title: "Mon Compte Élève | Al Muxtaar Société",
  description: "Gérez vos informations de profil, votre avatar et votre abonnement.",
};

export default async function ComptePage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/connexion?next=/compte");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const fallbackProfile = {
    first_name: user.user_metadata?.first_name || "Élève",
    last_name: user.user_metadata?.last_name || "Al Muxtaar",
    phone: user.user_metadata?.phone || user.email || "",
    email: user.user_metadata?.real_email || null,
    level: user.user_metadata?.level || "Terminale",
    track: user.user_metadata?.track || "S2",
    avatar: user.user_metadata?.avatar || "avatar_00_defaut_neutre.svg",
    role: user.user_metadata?.role || "student",
    created_at: new Date().toISOString(),
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-black text-navy">Mon Compte</h1>
        <p className="text-xs sm:text-sm text-navy-light">
          Paramètres du profil élève et personnalisation de l&apos;avatar.
        </p>
      </div>

      <CompteForm initialProfile={profile || fallbackProfile} />
    </div>
  );
}

