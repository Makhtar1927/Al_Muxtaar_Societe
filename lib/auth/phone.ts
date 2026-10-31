/**
 * Utilitaires de validation et normalisation des numéros de téléphone sénégalais (+221).
 */

export interface NormalizedPhone {
  isValid: boolean;
  raw: string;
  e164: string;           // Ex: +221771234567
  compact: string;        // Ex: 221771234567
  national: string;       // Ex: 771234567
  formatted: string;      // Ex: +221 77 123 45 67
  technicalEmail: string; // Ex: 221771234567@gmail.com
  operator?: "Orange" | "Free" | "Promobile" | "Fixe" | "Autre";
  error?: string;
}

/**
 * Nettoie et valide un numéro de téléphone sénégalais.
 */
export function parseSenegalPhone(input: string): NormalizedPhone {
  const cleanInput = input.trim();
  // Retirer espaces, tirets, parenthèses et points
  const digitsOnly = cleanInput.replace(/[\s\-\(\)\.]/g, "");

  let nationalDigits = "";

  if (digitsOnly.startsWith("+221")) {
    nationalDigits = digitsOnly.slice(4);
  } else if (digitsOnly.startsWith("00221")) {
    nationalDigits = digitsOnly.slice(5);
  } else if (digitsOnly.startsWith("221") && digitsOnly.length === 12) {
    nationalDigits = digitsOnly.slice(3);
  } else {
    nationalDigits = digitsOnly;
  }

  // Vérifier qu'on a bien 9 chiffres
  if (!/^\d+$/.test(nationalDigits)) {
    return {
      isValid: false,
      raw: cleanInput,
      e164: "",
      compact: "",
      national: "",
      formatted: "",
      technicalEmail: "",
      error: "Le numéro ne doit contenir que des chiffres.",
    };
  }

  if (nationalDigits.length !== 9) {
    return {
      isValid: false,
      raw: cleanInput,
      e164: "",
      compact: "",
      national: nationalDigits,
      formatted: "",
      technicalEmail: "",
      error: `Un numéro sénégalais comporte exactement 9 chiffres (${nationalDigits.length} saisis).`,
    };
  }

  // Détection de l'opérateur sénégalais
  const prefix = nationalDigits.substring(0, 2);
  let operator: NormalizedPhone["operator"] = "Autre";

  if (["77", "78"].includes(prefix)) {
    operator = "Orange";
  } else if (["76", "70"].includes(prefix)) {
    operator = "Free";
  } else if (["75"].includes(prefix)) {
    operator = "Promobile";
  } else if (["33"].includes(prefix)) {
    operator = "Fixe";
  } else {
    return {
      isValid: false,
      raw: cleanInput,
      e164: "",
      compact: "",
      national: nationalDigits,
      formatted: "",
      technicalEmail: "",
      error: `Le préfixe '${prefix}' n'est pas un préfixe mobile valide au Sénégal (77, 78, 76, 70, 75).`,
    };
  }

  const compact = `221${nationalDigits}`;
  const e164 = `+${compact}`;
  const formatted = `+221 ${nationalDigits.substring(0, 2)} ${nationalDigits.substring(2, 5)} ${nationalDigits.substring(5, 7)} ${nationalDigits.substring(7, 9)}`;
  const technicalEmail = `${compact}@gmail.com`;

  return {
    isValid: true,
    raw: cleanInput,
    e164,
    compact,
    national: nationalDigits,
    formatted,
    technicalEmail,
    operator,
  };
}

