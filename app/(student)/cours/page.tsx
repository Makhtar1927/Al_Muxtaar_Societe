import { redirect } from 'next/navigation';

export default function CoursIndexPage() {
  // Redirige vers le cours principal de l'offre MVP : Terminale S2 - Mathématiques
  redirect('/cours/terminale/s2/mathematiques');
}

