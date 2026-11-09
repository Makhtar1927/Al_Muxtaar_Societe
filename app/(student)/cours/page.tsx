import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { Icon } from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  SENEGAL_CURRICULUM,
  getLevelByCode,
  getTrackByCode,
  normalizeStudentCurriculum,
} from '@/lib/curriculum/senegal-curriculum';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function CoursHubPage() {
  const supabase = createClient();
  const admin = createAdminClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/connexion?redirect=/cours');
  }

  // ── Fetch profile + abonnement EN PARALLÈLE ──
  const [profileResult, activeSubResult] = await Promise.all([
    supabase
      .from('profiles')
      .select('first_name, last_name, level, track, role')
      .eq('id', user.id)
      .maybeSingle(),
    admin
      .from('subscriptions')
      .select('id')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .gte('end_date', new Date().toISOString())
      .limit(1),
  ]);

  const profile = profileResult.data;
  const isSubscribed = profile?.role === 'admin' || (activeSubResult.data?.length ?? 0) > 0;

  // Résoudre la classe et la filière exclusive de l'élève
  const { levelCode, trackCode } = normalizeStudentCurriculum(
    profile?.level,
    profile?.track
  );

  const studentLevel = getLevelByCode(levelCode) || SENEGAL_CURRICULUM[0];
  const studentTrack =
    getTrackByCode(levelCode, trackCode) || studentLevel.tracks[0];

  const studentName = profile?.first_name || 'Élève';

  return (
    <main className="min-h-screen bg-surface py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* ── 1. EN-TÊTE PERSONNALISÉ ÉLÈVE & FILIÈRE EXCLUSIVE ── */}
        <div className="bg-white rounded-3xl border border-navy/10 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-turquoise-light px-3.5 py-1 text-xs font-bold text-turquoise">
                <Icon name="doc" size={16} />
                Espace d&apos;Étude Personnel · Al_Muxtaar_Doc
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-navy mt-2">
                Bonjour {studentName}, voici vos cours de {studentTrack.shortName}
              </h1>
              <p className="text-xs sm:text-sm text-navy-light mt-1 max-w-2xl">
                Programme officiel sénégalais : <strong>{studentTrack.name}</strong> ({studentLevel.examName}).
              </p>
            </div>

            {/* Statut d'abonnement */}
            <div className="flex flex-col items-start sm:items-end gap-1.5">
              {isSubscribed ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold px-3 py-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Abonnement Actif (Accès Complet)
                </span>
              ) : (
                <div className="flex flex-col items-start sm:items-end gap-1">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold px-3 py-1">
                    Compte Découverte (1ère leçon gratuite)
                  </span>
                  <Link
                    href="/abonnement"
                    className="text-xs font-bold text-turquoise hover:underline"
                  >
                    Débloquer tous les cours (700 F) →
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Bannière de rappel si non abonné */}
          {!isSubscribed && (
            <div className="rounded-2xl border border-turquoise/30 bg-turquoise-light/20 p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-turquoise text-white">
                  <Icon name="cadenas" size={20} />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-navy">
                    Vous êtes en mode découverte gratuit
                  </h4>
                  <p className="text-xs text-navy-light">
                    Seule la première leçon de chaque matière est accessible gratuitement. Abonnez-vous dès 700 FCFA pour débloquer l&apos;intégralité des 13 chapitres, les corrigés détaillés et les quiz.
                  </p>
                </div>
              </div>
              <Link href="/abonnement" className="shrink-0">
                <Button variant="primary" size="sm" className="font-bold">
                  S&apos;abonner avec Wave
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* ── 2. VOS MATIÈRES OFFICIELLES (UNIQUEMENT VOTRE CLASSE) ── */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-navy/10 pb-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-turquoise">
                Programme de votre classe
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-navy mt-0.5">
                Matières enseignées en {studentTrack.shortName} ({studentTrack.subjects.length} Matières)
              </h2>
            </div>
            <span className="text-xs text-navy-light font-medium">
              Conforme MEN / IGEF Sénégal
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {studentTrack.subjects.map((sub) => {
              const isActive = sub.status === 'active';

              return (
                <div
                  key={sub.code}
                  className={`flex flex-col justify-between rounded-3xl border bg-white p-6 shadow-sm transition-all hover:shadow-md ${
                    isActive
                      ? 'border-turquoise ring-2 ring-turquoise/20'
                      : 'border-navy/10'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="rounded-lg bg-surface px-2.5 py-1 text-xs font-bold text-navy border border-navy/10">
                          Coeff. {sub.coeffBac}
                        </span>
                        <span className="text-xs text-navy-light font-medium">
                          {sub.chapters.length} chapitres
                        </span>
                      </div>

                      {!isActive && (
                        <span className="rounded-full bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 border border-amber-300">
                          En numérisation ({sub.progressPercent}%)
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-black text-navy">
                        {sub.name}
                      </h3>
                      <p className="text-xs text-navy-light mt-1 leading-relaxed line-clamp-2">
                        {sub.description}
                      </p>
                    </div>

                    {isActive && !isSubscribed && (
                      <div className="pt-2 border-t border-navy/5 text-xs text-navy-light flex items-center justify-end">
                        <span className="text-[11px] font-bold text-turquoise">
                          1ère leçon gratuite
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-5 pt-4 border-t border-navy/5">
                    <Link
                      href={`/cours/${levelCode}/${trackCode}/${sub.code}`}
                      className="block w-full"
                    >
                      <Button
                        variant={isActive ? 'primary' : 'outline'}
                        size="md"
                        className="w-full font-bold flex items-center justify-center gap-2"
                      >
                        <span>
                          {isActive
                            ? 'Ouvrir les cours'
                            : 'Consulter le programme'}
                        </span>
                        <Icon name="arrow_right" size={16} />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 3. OPTION DISCRÈTE DE CHANGEMENT DE FILIÈRE ── */}
        <div className="rounded-2xl border border-navy/10 bg-white p-5 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="text-xs font-bold text-navy">
              Vous avez changé de classe ou de série ?
            </h4>
            <p className="text-[11px] text-navy-light mt-0.5">
              Votre espace affiche actuellement les cours de <strong>{studentTrack.name}</strong>. Vous pouvez mettre à jour votre filière à tout moment.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link href="/compte">
              <Button variant="outline" size="sm" className="font-bold text-xs">
                Modifier ma classe
              </Button>
            </Link>
            <Link href="/doc/catalogue">
              <Button variant="ghost" size="sm" className="text-xs text-navy-light hover:text-turquoise">
                Catalogue national
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
