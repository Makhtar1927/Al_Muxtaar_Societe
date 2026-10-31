/**
 * Traduction et normalisation des messages d'erreur d'authentification en français.
 * Garantit qu'aucun message d'erreur technique en anglais ne soit affiché aux élèves.
 */
export function translateAuthError(errorMessage?: string | null): string {
  if (!errorMessage) {
    return "Une erreur inattendue est survenue. Veuillez réessayer.";
  }

  const msg = errorMessage.toLowerCase();

  if (msg.includes("rate limit") || msg.includes("too many requests") || msg.includes("over_email_send_rate_limit")) {
    return "Trop de tentatives récentes. Veuillez patienter quelques instants avant de réessayer.";
  }

  if (
    msg.includes("already registered") ||
    msg.includes("already exists") ||
    msg.includes("user with this email already exists") ||
    msg.includes("duplicate key")
  ) {
    return "Ce numéro de téléphone est déjà associé à un compte Al Muxtaar. Veuillez vous connecter.";
  }

  if (
    msg.includes("invalid login credentials") ||
    msg.includes("invalid credentials") ||
    msg.includes("wrong password") ||
    msg.includes("invalid grant")
  ) {
    return "Numéro de téléphone ou mot de passe incorrect. Vérifiez vos identifiants.";
  }

  if (msg.includes("password") && (msg.includes("least 6") || msg.includes("short"))) {
    return "Le mot de passe doit comporter au moins 6 caractères.";
  }

  if (msg.includes("user not found")) {
    return "Aucun compte ne correspond à ce numéro de téléphone.";
  }

  if (msg.includes("email not confirmed")) {
    return "Votre compte n'est pas encore activé. Contactez le support WhatsApp.";
  }

  if (msg.includes("network") || msg.includes("fetch failed") || msg.includes("timeout")) {
    return "Impossible de contacter le serveur. Vérifiez votre connexion internet.";
  }

  if (msg.includes("database error") || msg.includes("server error")) {
    return "Le service d'authentification est momentanément indisponible. Veuillez réessayer dans quelques instants.";
  }

  // Si le message est déjà en français ou inconnu
  return errorMessage;
}

