"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { parseSenegalPhone } from "./phone";
import { SignUpSchema, SignInSchema, UpdateProfileSchema } from "./validators";

export type AuthState = {
  success?: boolean;
  error?: string;
};

/**
 * Inscription d'un nouvel élève.
 */
export async function signUpAction(
  prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const rawData = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    phone: formData.get("phone") as string,
    email: (formData.get("email") as string) || "",
    password: formData.get("password") as string,
    level: (formData.get("level") as string) || "Terminale",
    track: (formData.get("track") as string) || "S2",
    avatar: (formData.get("avatar") as string) || "avatar_00_defaut_neutre.svg",
  };

  const validation = SignUpSchema.safeParse(rawData);
  if (!validation.success) {
    return {
      error: validation.error.errors[0]?.message || "Données d'inscription invalides.",
    };
  }

  const { firstName, lastName, phone, email, password, level, track, avatar } =
    validation.data;
  const parsedPhone = parseSenegalPhone(phone);

  const admin = createAdminClient();

  // 1. Vérifier si un compte avec ce numéro existe déjà dans profiles
  const { data: existingProfile } = await admin
    .from("profiles")
    .select("id")
    .eq("phone", parsedPhone.e164)
    .maybeSingle();

  if (existingProfile) {
    return {
      error: "Ce numéro de téléphone est déjà associé à un compte Al Muxtaar.",
    };
  }

  // 2. Créer l'utilisateur via l'API Admin (bypasse les emails, auto-confirme, zéro limite horaire)
  const { error: createError } = await admin.auth.admin.createUser({
    email: parsedPhone.technicalEmail,
    password,
    email_confirm: true,
    user_metadata: {
      first_name: firstName,
      last_name: lastName,
      phone: parsedPhone.e164,
      real_email: email || null,
      level,
      track,
      avatar,
      role: "student",
    },
  });

  if (createError) {
    if (
      createError.message.includes("already registered") ||
      createError.message.includes("already exists") ||
      createError.message.includes("duplicate")
    ) {
      return {
        error: "Ce numéro de téléphone est déjà associé à un compte Al Muxtaar.",
      };
    }
    return { error: createError.message };
  }

  // 3. Connecter immédiatement le nouvel élève sur sa session courante
  const supabase = createClient();
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: parsedPhone.technicalEmail,
    password,
  });

  if (signInError) {
    redirect("/connexion?registered=true");
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}

/**
 * Connexion par numéro de téléphone sénégalais.
 */
export async function signInAction(
  prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const rawData = {
    phone: formData.get("phone") as string,
    password: formData.get("password") as string,
  };

  const validation = SignInSchema.safeParse(rawData);
  if (!validation.success) {
    return {
      error: validation.error.errors[0]?.message || "Données de connexion invalides.",
    };
  }

  const { phone, password } = validation.data;
  const parsedPhone = parseSenegalPhone(phone);

  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: parsedPhone.technicalEmail,
    password,
  });

  if (error) {
    return {
      error: "Numéro de téléphone ou mot de passe incorrect. Vérifiez vos identifiants.",
    };
  }

  // Récupérer le profil pour voir si banni
  const { data: profile } = await supabase
    .from("profiles")
    .select("role, is_banned")
    .single();

  if (profile?.is_banned) {
    await supabase.auth.signOut();
    return {
      error: "Ce compte a été suspendu par l'administration. Veuillez contacter le support.",
    };
  }

  revalidatePath("/", "layout");

  if (profile?.role === "admin") {
    redirect("/admin");
  }

  redirect("/dashboard");
}

/**
 * Déconnexion de l'utilisateur.
 */
export async function signOutAction() {
  const supabase = createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/connexion");
}

/**
 * Mise à jour du profil élève (Nom, Avatar, Série, etc.).
 */
export async function updateProfileAction(
  prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const rawData = {
    firstName: formData.get("firstName") as string,
    lastName: formData.get("lastName") as string,
    email: (formData.get("email") as string) || "",
    level: formData.get("level") as string,
    track: formData.get("track") as string,
    avatar: formData.get("avatar") as string,
  };

  const validation = UpdateProfileSchema.safeParse(rawData);
  if (!validation.success) {
    return {
      error: validation.error.errors[0]?.message || "Données invalides.",
    };
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Vous devez être connecté pour modifier votre profil." };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      first_name: validation.data.firstName,
      last_name: validation.data.lastName,
      email: validation.data.email || null,
      level: validation.data.level,
      track: validation.data.track,
      avatar: validation.data.avatar,
    })
    .eq("id", user.id);

  if (error) {
    return { error: "Impossible de mettre à jour le profil. Réessayez." };
  }

  revalidatePath("/compte");
  return { success: true };
}

