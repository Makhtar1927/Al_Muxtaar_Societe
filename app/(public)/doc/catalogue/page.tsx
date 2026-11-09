"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/ui/icon";
import { createClient } from "@/lib/supabase/client";
import {
  SENEGAL_CURRICULUM,
  LevelCode,
  TrackCode,
  getLevelByCode,
  getTrackByCode,
  getCurriculumStats,
} from "@/lib/curriculum/senegal-curriculum";

export default function CataloguePage() {
  const stats = React.useMemo(() => getCurriculumStats(), []);

  // State selection
  const [selectedLevelCode, setSelectedLevelCode] = React.useState<LevelCode>("terminale");
  const [selectedTrackCode, setSelectedTrackCode] = React.useState<TrackCode>("s2");
  const [selectedSubjectCode, setSelectedSubjectCode] = React.useState<string>("mathematiques");

  // Notifications pre-registration state
  const [notifyContact, setNotifyContact] = React.useState("");
  const [notifySuccess, setNotifySuccess] = React.useState(false);

  // User & Subscription state
  const [isSubscribed, setIsSubscribed] = React.useState(false);
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (user) {
        setUser(user);
        const { data: sub } = await supabase
          .from("subscriptions")
          .select("id")
          .eq("user_id", user.id)
          .eq("status", "active")
          .gte("end_date", new Date().toISOString())
          .limit(1);

        if (sub && sub.length > 0) {
          setIsSubscribed(true);
        } else {
          const { data: profile } = await supabase
            .from("profiles")
            .select("role")
            .eq("id", user.id)
            .single();
          if (profile?.role === "admin") {
            setIsSubscribed(true);
          }
        }
      }
    });
  }, []);

  // Sync track when level changes
  const currentLevel = React.useMemo(() => {
    return getLevelByCode(selectedLevelCode) ?? SENEGAL_CURRICULUM[0];
  }, [selectedLevelCode]);

  React.useEffect(() => {
    if (currentLevel.tracks.length > 0) {
      const trackExists = currentLevel.tracks.some((t) => t.code === selectedTrackCode);
      if (!trackExists) {
        setSelectedTrackCode(currentLevel.tracks[0].code);
      }
    }
  }, [currentLevel, selectedTrackCode]);

  const currentTrack = React.useMemo(() => {
    return (
      currentLevel.tracks.find((t) => t.code === selectedTrackCode) ??
      currentLevel.tracks[0]
    );
  }, [currentLevel, selectedTrackCode]);

  // Sync subject when track changes
  React.useEffect(() => {
    if (currentTrack && currentTrack.subjects.length > 0) {
      const subjectExists = currentTrack.subjects.some((s) => s.code === selectedSubjectCode);
      if (!subjectExists) {
        setSelectedSubjectCode(currentTrack.subjects[0].code);
      }
    }
  }, [currentTrack, selectedSubjectCode]);

  const currentSubject = React.useMemo(() => {
    return (
      currentTrack?.subjects.find((s) => s.code === selectedSubjectCode) ??
      currentTrack?.subjects[0]
    );
  }, [currentTrack, selectedSubjectCode]);

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (notifyContact.trim()) {
      setNotifySuccess(true);
      setTimeout(() => setNotifySuccess(false), 5000);
      setNotifyContact("");
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-12 space-y-8 sm:space-y-10">
      {/* ── 1. EN-TÊTE PRINCIPAL ── */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full bg-turquoise-light px-3.5 py-1 text-xs font-bold text-turquoise">
          <span>Référentiel National Officiel du Sénégal</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-navy sm:text-4xl">
          Catalogue des Programmes &amp; Filières
        </h1>
        <p className="text-sm text-navy-light sm:text-base leading-relaxed">
          Explorez l&apos;ensemble du cursus scolaire sénégalais, du Collège au Baccalauréat.
          Des cours interactifs bilingues (Français + Wolof), des fiches réflexes types et des simulateurs pour chaque niveau.
        </p>

        {/* Métriques globales */}
        <div className="pt-2 grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center gap-2 sm:gap-3 text-xs">
          <span className="rounded-full bg-surface px-3 py-1 font-semibold text-navy border border-surface-muted inline-flex items-center">
            <span>4 Niveaux Scolaires</span>
          </span>
          <span className="rounded-full bg-surface px-3 py-1 font-semibold text-navy border border-surface-muted inline-flex items-center">
            <span>{stats.totalTracks} Séries &amp; Filières</span>
          </span>
          <span className="rounded-full bg-surface px-3 py-1 font-semibold text-navy border border-surface-muted inline-flex items-center">
            <span>{stats.totalSubjects} Matières Référencées</span>
          </span>
          <span className="rounded-full bg-turquoise/15 px-3 py-1 font-bold text-turquoise border border-turquoise/30 inline-flex items-center">
            <span>{stats.activeChapters} Chapitres Interactifs Actifs</span>
          </span>
        </div>
      </div>

      {/* ── 2. SÉLECTEUR DE NIVEAU (TABS) ── */}
      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-surface p-1.5 rounded-2xl border border-surface-muted">
          {SENEGAL_CURRICULUM.map((level) => {
            const isSelected = level.code === selectedLevelCode;
            return (
              <button
                key={level.code}
                onClick={() => setSelectedLevelCode(level.code)}
                className={`flex flex-col items-center justify-center py-2.5 px-3 rounded-xl text-xs font-bold transition-all min-h-[44px] ${
                  isSelected
                    ? "bg-white text-navy shadow-sm border border-navy/10"
                    : "text-navy-light hover:text-navy hover:bg-white/50"
                }`}
              >
                <span>{level.name}</span>
                <span className={`text-[10px] font-medium ${isSelected ? "text-turquoise font-bold" : "text-navy-light/70"}`}>
                  {level.code === "terminale" ? "Baccalauréat" : level.code === "troisieme" ? "BFEM" : level.cycle.split(" ")[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 3. SÉLECTEUR DE SÉRIE / FILIÈRE ── */}
      <div className="space-y-3">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-surface-muted pb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-navy-light uppercase tracking-wider">
              1. Choisissez la filière ({currentLevel.name}) :
            </span>
          </div>
          <span className="text-xs font-semibold text-turquoise">
            {currentLevel.examName}
          </span>
        </div>

        <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
          {currentLevel.tracks.map((track) => {
            const isTrackSelected = track.code === selectedTrackCode;
            return (
              <button
                key={track.code}
                onClick={() => setSelectedTrackCode(track.code)}
                className={`px-4 py-2.5 rounded-xl text-left border transition-all shrink-0 flex items-center gap-3 ${
                  isTrackSelected
                    ? "border-turquoise bg-turquoise/10 text-navy shadow-sm ring-1 ring-turquoise/40"
                    : "border-surface-muted bg-white hover:border-navy/20 text-navy-light"
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-navy">{track.shortName}</span>
                    <span
                      className={`text-[9px] px-1.5 py-0.2 rounded font-bold uppercase ${
                        isTrackSelected ? "bg-turquoise text-white" : "bg-navy/5 text-navy-light"
                      }`}
                    >
                      {track.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-navy-light/80 truncate max-w-[140px] sm:max-w-[200px] mt-0.5">
                    {track.name.split("—")[1]?.trim() ?? track.name}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── 4. SÉLECTEUR DE MATIÈRE DANS LA FILIÈRE ── */}
      {currentTrack && (
        <div className="space-y-3">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between border-b border-surface-muted pb-2">
            <span className="text-xs font-bold text-navy-light uppercase tracking-wider">
              2. Matières enseignées en {currentTrack.shortName} :
            </span>
            <span className="text-xs text-navy-light">
              {currentTrack.subjects.length} matières répertoriées
            </span>
          </div>

          <div className="grid grid-cols-1 min-[480px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
            {currentTrack.subjects.map((sub) => {
              const isSubSelected = sub.code === selectedSubjectCode;
              const isAvailable = sub.status === "active";
              return (
                <button
                  key={sub.code}
                  onClick={() => setSelectedSubjectCode(sub.code)}
                  className={`p-3 rounded-xl text-left border transition-all flex flex-row min-[480px]:flex-col gap-3 min-[480px]:gap-2 items-center min-[480px]:items-stretch justify-between ${
                    isSubSelected
                      ? "border-turquoise bg-white shadow-md ring-2 ring-turquoise"
                      : "border-surface-muted bg-white hover:border-turquoise/30"
                  }`}
                >
                  <div className="flex min-[480px]:flex-row items-center justify-between w-full flex-col gap-1 min-[480px]:gap-0">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-navy/5 text-navy">
                      Coeff. {sub.coeffBac}
                    </span>
                    {isAvailable ? (
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-navy line-clamp-1">{sub.name}</h4>
                    <p className="text-[10px] text-navy-light mt-0.5 font-medium">
                      {sub.chapters.length} chapitres
                    </p>
                  </div>
                  <div className="pt-1 border-t border-surface-muted flex items-center justify-between text-[10px]">
                    <span
                      className={`font-semibold ${
                        isAvailable
                          ? "text-emerald-700 font-bold"
                          : sub.status === "in_production"
                          ? "text-amber-700"
                          : "text-navy-light"
                      }`}
                    >
                      {isAvailable ? "Actif" : `${sub.progressPercent}%`}
                    </span>
                    <span className="text-turquoise text-[11px] font-bold">
                      {isSubSelected ? "Sélectionné" : "Voir"}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* ── 5. FICHE DÉTAILLÉE DE LA MATIÈRE SÉLECTIONNÉE ── */}
      {currentSubject && (
        <div className="rounded-3xl border border-navy/10 bg-white p-6 sm:p-8 shadow-card space-y-6">
          {/* Bandeau d'en-tête de matière */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-surface-muted pb-6">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-turquoise uppercase tracking-wider">
                  {currentLevel.name} · {currentTrack?.shortName}
                </span>
                <span className="text-navy-light text-xs">•</span>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-navy/5 text-navy">
                  Coefficient {currentSubject.coeffBac} au {currentLevel.examName}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-navy">
                {currentSubject.name}
              </h2>
              <p className="text-xs sm:text-sm text-navy-light max-w-2xl leading-relaxed">
                {currentSubject.description}
              </p>
              <p className="text-xs text-navy/60 pt-1">
                <span className="font-semibold text-navy">Responsable pédagogique :</span> {currentSubject.teacherLead}
              </p>
            </div>

            {/* Statut d'accès ou abonnement */}
            <div className="shrink-0 flex flex-col items-start md:items-end gap-2">
              {currentSubject.status !== "active" && (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    currentSubject.status === "in_production"
                      ? "bg-amber-100 text-amber-900 border border-amber-300"
                      : "bg-surface-muted text-navy-light border border-navy/10"
                  }`}
                >
                  {currentSubject.statusLabel}
                </span>
              )}

              {currentSubject.status === "active" ? (
                isSubscribed ? (
                  <Link
                    href={`/cours/${selectedLevelCode}/${selectedTrackCode}/${selectedSubjectCode}`}
                    className="rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition-colors shadow-sm flex items-center gap-1.5"
                  >
                    <span>Accéder aux cours interactifs</span>
                    <span>→</span>
                  </Link>
                ) : (
                  <Link
                    href="/doc/tarifs"
                    className="rounded-xl bg-turquoise px-4 py-2.5 text-xs font-bold text-white hover:bg-turquoise/90 transition-colors shadow-sm flex items-center gap-1.5"
                  >
                    <span>Débloquer (Dès 700 FCFA)</span>
                    <span>→</span>
                  </Link>
                )
              ) : (
                <span className="text-xs text-navy-light italic">
                  Syllabus officiel consultable ci-dessous
                </span>
              )}
            </div>
          </div>

          {/* Bandeau d'encouragement si matière en rédaction */}
          {currentSubject.status !== "active" && (
            <div className="rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Icon name="calendrier" size={20} className="shrink-0" />
                    <h4 className="text-sm font-bold text-amber-950">
                      Module en cours d&apos;élaboration pédagogique ({currentSubject.progressPercent}% achevé)
                    </h4>
                  </div>
                  <p className="text-xs text-amber-900/80 max-w-xl leading-relaxed">
                    Les cours de {currentSubject.name} ({currentTrack.shortName}) sont en cours de mise en forme numérique par nos enseignants. 
                    Vous pouvez consulter le découpage officiel ci-dessous.
                  </p>
                </div>

                {/* Formulaire pré-inscription notification */}
                <form onSubmit={handleNotifySubmit} className="flex items-center gap-2 w-full sm:w-auto">
                  <input
                    type="text"
                    value={notifyContact}
                    onChange={(e) => setNotifyContact(e.target.value)}
                    placeholder="Numéro WhatsApp ou E-mail"
                    className="px-3 py-2 text-xs rounded-xl border border-amber-300 focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white text-navy w-full sm:w-56"
                    required
                  />
                  <Button variant="primary" size="sm" type="submit" className="whitespace-nowrap font-bold text-xs">
                    M&apos;avertir
                  </Button>
                </form>
              </div>

              {notifySuccess && (
                <div className="text-xs font-bold text-emerald-800 bg-emerald-50 rounded-lg p-2 border border-emerald-200 flex items-center gap-1.5">
                  <Icon name="check" size={16} />
                  <span>C&apos;est bien noté ! Vous recevrez une alerte prioritaire dès la publication des premières leçons de {currentSubject.name}.</span>
                </div>
              )}
            </div>
          )}

          {/* ── 6. LISTE DES CHAPITRES DU PROGRAMME ── */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-navy flex items-center gap-2">
                <span>Programme Officiel des Chapitres</span>
                <span className="text-xs font-normal text-navy-light">
                  ({currentSubject.chapters.length} chapitres)
                </span>
              </h3>

              {currentSubject.status === "active" && (
                <Link
                  href={`/cours/${selectedLevelCode}/${selectedTrackCode}/${selectedSubjectCode}`}
                  className="text-xs font-bold text-turquoise hover:underline flex items-center gap-1"
                >
                  <span>Ouvrir l&apos;espace complet</span>
                  <span>→</span>
                </Link>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {currentSubject.chapters.map((chap) => {
                const canAccess =
                  currentSubject.status === "active" && (isSubscribed || chap.isFree);

                return (
                  <Card
                    key={chap.id}
                    className={`flex flex-col justify-between transition-all ${
                      canAccess
                        ? "border-2 border-turquoise/50 shadow-hover hover:border-turquoise"
                        : currentSubject.status === "active"
                        ? "border-navy/10 hover:border-navy/20"
                        : "border-surface-muted bg-surface/30"
                    }`}
                  >
                    <CardHeader className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-black text-navy-light/60">
                          Chapitre {chap.id}
                        </span>
                        {currentSubject.status === "active" ? (
                          isSubscribed ? (
                            <Badge status="active">Débloqué</Badge>
                          ) : chap.isFree ? (
                            <Badge status="active">Extrait Gratuit</Badge>
                          ) : (
                            <Badge status="expired">Réservé Abonnés</Badge>
                          )
                        ) : (
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            Programme Officiel
                          </span>
                        )}
                      </div>

                      <CardTitle className="text-base font-bold leading-snug">
                        {chap.title}
                      </CardTitle>

                      <CardDescription className="text-xs line-clamp-2">
                        {chap.desc}
                      </CardDescription>

                      {/* Compétences clés */}
                      {chap.competences && chap.competences.length > 0 && (
                        <div className="pt-2 flex flex-wrap gap-1">
                          {chap.competences.slice(0, 2).map((comp, cIdx) => (
                            <span
                              key={cIdx}
                              className="text-[10px] rounded bg-navy/5 px-1.5 py-0.5 text-navy font-medium line-clamp-1 inline-flex items-center gap-1"
                            >
                              <Icon name="check" size={10} className="text-turquoise shrink-0" />
                              <span>{comp}</span>
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Wolof Insight si présent */}
                      {chap.wolofInsight && (
                        <div className="rounded-lg bg-amber-500/10 p-2 border border-amber-500/20 text-[11px] text-amber-950 italic flex items-start gap-1.5">
                          <Icon name="wolof" size={16} className="shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold not-italic">Xam-xam (Wolof) :</span> {chap.wolofInsight}
                          </div>
                        </div>
                      )}
                    </CardHeader>

                    <CardContent className="pt-0">
                      <div className="flex items-center justify-between text-xs text-navy-light pt-3 border-t border-surface-muted">
                        <span>{chap.lessonsCount} leçons complètes</span>
                        {canAccess ? (
                          <Link
                            href={`/cours/${selectedLevelCode}/${selectedTrackCode}/${selectedSubjectCode}`}
                            className="font-bold text-turquoise hover:underline inline-flex items-center gap-1"
                          >
                            <span>Consulter</span>
                            <span>→</span>
                          </Link>
                        ) : currentSubject.status === "active" ? (
                          <Link
                            href="/doc/tarifs"
                            className="font-semibold text-navy hover:text-turquoise transition-colors"
                          >
                            Dès 700 FCFA
                          </Link>
                        ) : (
                          <span className="text-[11px] font-medium text-navy-light/60">
                            Syllabus officiel
                          </span>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ── 7. BANDEAU DE RASSURANCE MULTI-NIVEAUX ── */}
      <section className="rounded-3xl bg-navy p-8 sm:p-12 text-white shadow-soft text-center space-y-4">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-bold text-turquoise">
          L&apos;engagement d&apos;Al Muxtaar Société
        </div>
        <h2 className="text-2xl sm:text-3xl font-black max-w-2xl mx-auto">
          Un accompagnement d&apos;excellence pour toutes les séries sénégalaises
        </h2>
        <p className="text-xs sm:text-sm text-surface-muted max-w-xl mx-auto leading-relaxed">
          Toutes nos ressources sont rédigées par des professeurs certifiés sénégalais (FASTEF, lycées d&apos;excellence).
          Des cours complets avec KaTeX, des simulateurs interactifs et des fiches réflexes pour réussir vos examens.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row sm:flex-wrap items-center justify-center gap-3">
          <Link href="/cours">
            <Button variant="primary" size="lg" className="font-bold">
              Accéder aux cours et révisions
            </Button>
          </Link>
          <Link href="/doc/tarifs">
            <Button
              variant="outline"
              size="lg"
              className="bg-white/10 text-white border-white/20 hover:bg-white/20"
            >
              Voir les formules d&apos;abonnement
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
