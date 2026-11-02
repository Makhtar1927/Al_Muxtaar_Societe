import React from 'react';

export type StudyIconName =
  | 'cible_reflexe'
  | 'avertissement'
  | 'etincelles'
  | 'de_tirage'
  | 'recommencer'
  | 'niveau_facile'
  | 'niveau_intermediaire'
  | 'niveau_difficile'
  | 'etoile_favori'
  | 'ampoule_astuce'
  | 'eclair_reflexe'
  | 'flamme_serie'
  | 'chronometre'
  | 'correct'
  | 'incorrect'
  | 'cle_solution'
  | 'methode_presse_papier'
  | 'definition_livre'
  | 'theoreme_equerre'
  | 'exercice_crayon'
  | 'a_retenir_punaise'
  | 'erreur_interdit'
  | 'courbe_fonction'
  | 'infini_limites'
  | 'calculatrice'
  | 'recherche_loupe'
  | 'filtre'
  | 'parametres'
  | 'accueil'
  | 'suivant'
  | 'diplome_bac'
  | 'fusee_demarrer'
  // ─── Nouvelles Icônes Officielles Audio ───
  | 'micro_professeur'
  | 'casque_audio'
  | 'onde_audio'
  | 'haut_parleur'
  | 'muet'
  | 'play'
  | 'pause'
  | 'reculer_10s'
  | 'avancer_10s'
  | 'vitesse_lecture'
  | 'transcription'
  | 'liste_reperes'
  | 'marque_page'
  | 'telecharger_audio'
  | 'piege_bac'
  | 'technique_outils'
  | 'rigueur_compas'
  | 'masquer_chevron_haut'
  | 'afficher_chevron_bas'
  | 'conseil_professeur'
  | 'voix_active'
  // ─── Alias Pédagogiques Cours & Quiz ───
  | 'formule_cle'
  | 'trophee_reussite'
  | 'methode_fleche'
  | 'exemple_loupe';

const ICON_MAP: Record<StudyIconName, string> = {
  cible_reflexe: '/icons/01_cible_reflexe.svg',
  avertissement: '/icons/02_avertissement.svg',
  etincelles: '/icons/03_etincelles.svg',
  de_tirage: '/icons/04_de_tirage.svg',
  recommencer: '/icons/05_recommencer.svg',
  niveau_facile: '/icons/06_niveau_facile.svg',
  niveau_intermediaire: '/icons/07_niveau_intermediaire.svg',
  niveau_difficile: '/icons/08_niveau_difficile.svg',
  etoile_favori: '/icons/09_etoile_favori.svg',
  ampoule_astuce: '/icons/10_ampoule_astuce.svg',
  eclair_reflexe: '/icons/11_eclair_reflexe.svg',
  flamme_serie: '/icons/12_flamme_serie.svg',
  chronometre: '/icons/13_chronometre.svg',
  correct: '/icons/14_correct.svg',
  incorrect: '/icons/15_incorrect.svg',
  cle_solution: '/icons/16_cle_solution.svg',
  methode_presse_papier: '/icons/17_methode_presse_papier.svg',
  definition_livre: '/icons/18_definition_livre.svg',
  theoreme_equerre: '/icons/19_theoreme_equerre.svg',
  exercice_crayon: '/icons/20_exercice_crayon.svg',
  a_retenir_punaise: '/icons/21_a_retenir_punaise.svg',
  erreur_interdit: '/icons/22_erreur_interdit.svg',
  courbe_fonction: '/icons/23_courbe_fonction.svg',
  infini_limites: '/icons/24_infini_limites.svg',
  calculatrice: '/icons/25_calculatrice.svg',
  recherche_loupe: '/icons/26_recherche_loupe.svg',
  filtre: '/icons/27_filtre.svg',
  parametres: '/icons/28_parametres.svg',
  accueil: '/icons/29_accueil.svg',
  suivant: '/icons/36_suivant.svg',
  diplome_bac: '/icons/39_diplome_bac.svg',
  fusee_demarrer: '/icons/40_fusee_demarrer.svg',
  // ─── Chemins des Icônes Audio ───
  micro_professeur: '/icons/01_micro_professeur.svg',
  casque_audio: '/icons/02_casque_audio.svg',
  onde_audio: '/icons/03_onde_audio.svg',
  haut_parleur: '/icons/04_haut_parleur.svg',
  muet: '/icons/05_muet.svg',
  play: '/icons/06_play.svg',
  pause: '/icons/07_pause.svg',
  reculer_10s: '/icons/08_reculer_10s.svg',
  avancer_10s: '/icons/09_avancer_10s.svg',
  vitesse_lecture: '/icons/10_vitesse_lecture.svg',
  transcription: '/icons/11_transcription.svg',
  liste_reperes: '/icons/12_liste_reperes.svg',
  marque_page: '/icons/13_marque_page.svg',
  telecharger_audio: '/icons/14_telecharger_audio.svg',
  piege_bac: '/icons/15_piege_bac.svg',
  technique_outils: '/icons/16_technique_outils.svg',
  rigueur_compas: '/icons/17_rigueur_compas.svg',
  masquer_chevron_haut: '/icons/18_masquer_chevron_haut.svg',
  afficher_chevron_bas: '/icons/19_afficher_chevron_bas.svg',
  conseil_professeur: '/icons/20_conseil_professeur.svg',
  voix_active: '/icons/21_voix_active.svg',
  // ─── Alias Pédagogiques Cours & Quiz ───
  formule_cle: '/icons/19_theoreme_equerre.svg',
  trophee_reussite: '/icons/39_diplome_bac.svg',
  methode_fleche: '/icons/16_cle_solution.svg',
  exemple_loupe: '/icons/26_recherche_loupe.svg',
};

interface StudyIconProps {
  name: StudyIconName;
  className?: string;
  size?: number;
  alt?: string;
}

export default function StudyIcon({
  name,
  className = '',
  size = 24,
  alt = '',
}: StudyIconProps) {
  const src = ICON_MAP[name] || '/icons/01_cible_reflexe.svg';

  return (
    <img
      src={src}
      alt={alt || name}
      width={size}
      height={size}
      className={`inline-block shrink-0 object-contain ${className}`}
      loading="lazy"
      style={{ width: size, height: size }}
    />
  );
}
