import { z } from "zod";
import { parseSenegalPhone } from "./phone";

export const SignUpSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "Le prénom doit comporter au moins 2 caractères.")
      .max(50, "Le prénom ne peut dépasser 50 caractères."),
    lastName: z
      .string()
      .min(2, "Le nom doit comporter au moins 2 caractères.")
      .max(50, "Le nom ne peut dépasser 50 caractères."),
    phone: z.string().refine((val) => parseSenegalPhone(val).isValid, {
      message: "Numéro sénégalais invalide (ex: 77 123 45 67 ou +221 78 000 00 00).",
    }),
    email: z
      .string()
      .email("Adresse e-mail invalide.")
      .optional()
      .or(z.literal("")),
    password: z
      .string()
      .min(6, "Le mot de passe doit comporter au moins 6 caractères."),
    confirmPassword: z.string().optional(),
    level: z.string().default("Terminale"),
    track: z.string().default("S2"),
    avatar: z.string().default("avatar_00_defaut_neutre.svg"),
  })
  .refine(
    (data) => !data.confirmPassword || data.password === data.confirmPassword,
    {
      message: "Les deux mots de passe ne correspondent pas.",
      path: ["confirmPassword"],
    }
  );

export const SignInSchema = z.object({
  phone: z.string().refine((val) => parseSenegalPhone(val).isValid, {
    message: "Veuillez saisir un numéro sénégalais valide.",
  }),
  password: z.string().min(1, "Le mot de passe est obligatoire."),
});

export const UpdateProfileSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit comporter au moins 2 caractères."),
  lastName: z.string().min(2, "Le nom doit comporter au moins 2 caractères."),
  email: z.string().email("Adresse e-mail invalide.").optional().or(z.literal("")),
  level: z.string(),
  track: z.string(),
  avatar: z.string(),
});

