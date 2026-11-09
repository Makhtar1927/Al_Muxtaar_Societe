'use client';

import React, { useState, useRef, useEffect } from 'react';
import StudyIcon, { StudyIconName } from '@/components/ui/study-icon';
import { cn } from '@/lib/utils';

export interface AudioChapter {
  timeSeconds: number;
  title: string;
  badge?: string;
  icon?: StudyIconName;
  textScript: string;
}

interface AudioCoachPlayerProps {
  title?: string;
  subtitle?: string;
  teacherName?: string;
  audioSrc?: string; // Chemin vers fichier MP3 studio réel (optionnel)
  durationSeconds?: number;
  chapters?: AudioChapter[];
}

const DEFAULT_CHAPTERS: AudioChapter[] = [
  {
    timeSeconds: 0,
    title: "1. Enjeux & Barème Bac S2",
    badge: "Méthode",
    icon: "cible_reflexe",
    textScript:
      "Dans cette leçon sur les limites et la continuité, retenez un point capital : au Baccalauréat sénégalais série S2, l'étude de fonctions représente 10 à 11 points sur 20. La maîtrise parfaite des limites aux bornes conditionne l'asymptote, le tableau de variation et le tracé de courbe. Ne perdez aucun point dès la première question !",
  },
  {
    timeSeconds: 45,
    title: "2. Les 4 Formes Indéterminées",
    badge: "Réflexe",
    icon: "eclair_reflexe",
    textScript:
      "Premier réflexe mental absolu : retenez par cœur les 4 formes indéterminées : plus l'infini moins l'infini, zéro sur zéro, infini sur infini, et zéro fois l'infini. Attention aux pièges : une constante non nulle sur zéro n'est pas indéterminée, cela donne l'infini. Zéro sur l'infini n'est pas indéterminé, cela donne zéro.",
  },
  {
    timeSeconds: 110,
    title: "3. Le piège fatal de la racine en -∞",
    badge: "Piège Bac",
    icon: "piege_bac",
    textScript:
      "Voici le piège qui élimine le plus de candidats au Sénégal : quand vous factorisez par x sous un radical en moins l'infini, la racine carrée de x au carré est égale à la valeur absolue de x, c'est-à-dire moins x ! Si vous oubliez le signe moins, tout votre calcul de limite est faux et votre asymptote sera erronée.",
  },
  {
    timeSeconds: 175,
    title: "4. Expression Conjuguée ou Factorisation ?",
    badge: "Technique",
    icon: "technique_outils",
    textScript:
      "Comment choisir entre factorisation et expression conjuguée ? Regardez les coefficients devant x sous la racine. Si les coefficients des termes de plus haut degré sont égaux, la factorisation redonne une indétermination infini fois zéro : vous devez obligatoirement utiliser l'expression conjuguée. Si les coefficients sont différents, la factorisation directe suffit.",
  },
  {
    timeSeconds: 240,
    title: "5. Rédaction modèle pour l'Office du Bac",
    badge: "Rigueur",
    icon: "rigueur_compas",
    textScript:
      "Pour l'asymptote oblique : calculez toujours la limite de f de x moins entre parenthèses a x plus b, et écrivez explicitement que cette différence tend vers zéro quand x tend vers l'infini. Concluez toujours par une phrase claire mentionnant l'équation de la droite et la courbe.",
  },
];

export default function AudioCoachPlayer({
  title = "Masterclass Audio : Limites & Continuité",
  subtitle = "Terminale S2 • 5 réflexes essentiels pour l'épreuve",
  teacherName = "Professeur Principal • Spécialité Mathématiques",
  audioSrc,
  durationSeconds = 300,
  chapters = DEFAULT_CHAPTERS,
}: AudioCoachPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(durationSeconds);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isSynthesizing, setIsSynthesizing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlayerOutOfView, setIsPlayerOutOfView] = useState(false);
  const [isMiniDismissed, setIsMiniDismissed] = useState(false);

  const playerContainerRef = useRef<HTMLElement | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);

  // Observer pour détecter quand le lecteur principal sort de l'écran
  useEffect(() => {
    const el = playerContainerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsPlayerOutOfView(!entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  function scrollToMainPlayer() {
    playerContainerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // 1. Initialiser le suivi du temps
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    function handleTimeUpdate() {
      if (audio) {
        setCurrentTime(audio.currentTime);
        updateActiveChapter(audio.currentTime);
      }
    }

    function handleLoadedMetadata() {
      if (audio && !isNaN(audio.duration)) {
        setDuration(Math.floor(audio.duration));
      }
    }

    function handleEnded() {
      setIsPlaying(false);
      setCurrentTime(0);
    }

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  function updateActiveChapter(seconds: number) {
    for (let i = chapters.length - 1; i >= 0; i--) {
      if (seconds >= chapters[i].timeSeconds) {
        setActiveChapterIndex(i);
        break;
      }
    }
  }

  // 2. Gestion de la lecture (Audio MP3 réel ou Synthèse vocale fluide)
  function togglePlay() {
    setIsMiniDismissed(false);
    if (audioSrc && audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.playbackRate = playbackRate;
        audioRef.current.play().catch(() => {
          fallbackSpeechSynthesis();
        });
        setIsPlaying(true);
      }
    } else {
      fallbackSpeechSynthesis();
    }
  }

  function fallbackSpeechSynthesis() {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setIsSynthesizing(false);
      return;
    }

    window.speechSynthesis.cancel();

    const currentChapter = chapters[activeChapterIndex] || chapters[0];
    const utterance = new SpeechSynthesisUtterance(currentChapter.textScript);
    utterance.lang = 'fr-FR';
    utterance.rate = playbackRate * 0.95;
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const frenchVoice =
      voices.find(
        (v) =>
          v.lang.startsWith('fr') &&
          (v.name.includes('Google') ||
            v.name.includes('Premium') ||
            v.name.includes('Natural') ||
            v.name.includes('Thomas') ||
            v.name.includes('Audrey'))
      ) || voices.find((v) => v.lang.startsWith('fr'));

    if (frenchVoice) {
      utterance.voice = frenchVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsSynthesizing(true);
    };

    utterance.onend = () => {
      if (activeChapterIndex < chapters.length - 1) {
        jumpToChapter(activeChapterIndex + 1);
      } else {
        setIsPlaying(false);
        setIsSynthesizing(false);
      }
    };

    utterance.onerror = () => {
      setIsPlaying(false);
      setIsSynthesizing(false);
    };

    synthRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }

  function jumpToChapter(index: number) {
    if (index < 0 || index >= chapters.length) return;
    const targetSeconds = chapters[index].timeSeconds;
    setActiveChapterIndex(index);
    setCurrentTime(targetSeconds);

    if (audioSrc && audioRef.current) {
      audioRef.current.currentTime = targetSeconds;
      if (!isPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    } else {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        setTimeout(() => {
          fallbackSpeechSynthesis();
        }, 120);
      }
    }
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const val = Number(e.target.value);
    setCurrentTime(val);
    updateActiveChapter(val);
    if (audioRef.current && audioSrc) {
      audioRef.current.currentTime = val;
    }
  }

  function changeSpeed(rate: number) {
    setPlaybackRate(rate);
    if (audioRef.current) {
      audioRef.current.playbackRate = rate;
    }
    if (isSynthesizing && isPlaying) {
      fallbackSpeechSynthesis();
    }
  }

  function skipTime(delta: number) {
    const nextTime = Math.max(0, Math.min(duration, currentTime + delta));
    setCurrentTime(nextTime);
    updateActiveChapter(nextTime);
    if (audioRef.current && audioSrc) {
      audioRef.current.currentTime = nextTime;
    }
  }

  function formatTime(secs: number) {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  }

  const currentChapter = chapters[activeChapterIndex] || chapters[0];
  const progressRatio = duration > 0 ? (currentTime / duration) * 100 : 0;

  // Barres du visualiseur d'ondes sonores (24 barres proportionnées)
  const WAVE_BARS = [
    25, 45, 65, 85, 50, 70, 95, 60, 40, 75, 90, 55, 80, 100, 70, 45, 85, 60,
    95, 50, 75, 40, 60, 30,
  ];

  const shouldShowMiniPlayer =
    (isPlaying || currentTime > 0) && isPlayerOutOfView && !isMiniDismissed;

  return (
    <>
      <section
        ref={playerContainerRef}
        className="w-full max-w-full rounded-2xl sm:rounded-3xl border border-turquoise/30 bg-gradient-to-b from-[#0B1E2E] via-[#0C1C2B] to-[#081521] text-white p-3.5 sm:p-5 shadow-xl relative overflow-hidden"
      >
      {/* Halo discret d'arrière-plan */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-turquoise/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none -ml-12 -mb-12" />

      {/* Lecteur audio invisible si fichier présent */}
      {audioSrc && <audio ref={audioRef} src={audioSrc} preload="metadata" />}

      {/* ── 1. HEADER COMPACT AVEC ICÔNE MICROPHONE SVG OFFICIELLE ── */}
      <div className="relative z-10 flex items-center justify-between gap-2.5 pb-3 border-b border-white/10">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          {/* Badge icône microphone Al Muxtaar */}
          <div className="relative w-11 h-11 rounded-2xl bg-gradient-to-tr from-turquoise to-[#05E2B6] p-0.5 shadow-md flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-[#0C1C2B] rounded-[14px] flex items-center justify-center p-1.5">
              <StudyIcon name="micro_professeur" size={26} />
            </div>
            {isPlaying && (
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-turquoise opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-turquoise"></span>
              </span>
            )}
          </div>

          {/* Titres avec protection overflow absolue */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-wider text-turquoise bg-turquoise/15 px-2 py-0.5 rounded-md border border-turquoise/25">
                Bac S2
              </span>
              <span className="text-[10px] text-white/50 font-semibold truncate">
                {teacherName}
              </span>
            </div>
            <h2 className="text-sm sm:text-base font-black text-white tracking-tight truncate mt-0.5">
              {title}
            </h2>
          </div>
        </div>

        {/* Bouton pour déplier/replier les chapitres avec icône liste_reperes */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="shrink-0 text-[11px] font-bold text-white/80 hover:text-white px-2.5 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors flex items-center gap-1.5 shadow-sm"
        >
          <StudyIcon name="liste_reperes" size={14} className="shrink-0 opacity-80" />
          <span>{isExpanded ? 'Masquer' : 'Repères'}</span>
          <StudyIcon
            name={isExpanded ? 'masquer_chevron_haut' : 'afficher_chevron_bas'}
            size={12}
            className="shrink-0 opacity-70"
          />
        </button>
      </div>

      {/* ── 2. CHAPITRE EN COURS + VISUALISEUR D'ONDES PLEINE LARGEUR ── */}
      <div className="relative z-10 mt-3 bg-white/[0.04] rounded-2xl p-2.5 sm:p-3 border border-white/10">
        <div className="flex items-center justify-between gap-2 mb-1">
          <div className="flex items-center gap-1.5">
            {currentChapter.icon && (
              <StudyIcon name={currentChapter.icon} size={14} className="shrink-0" />
            )}
            <span className="text-[10px] font-bold uppercase tracking-wider text-turquoise bg-turquoise/15 px-2 py-0.5 rounded-md border border-turquoise/20">
              {currentChapter.badge || 'En cours'}
            </span>
          </div>
          <span className="text-[10px] font-mono text-white/50">
            Partie {activeChapterIndex + 1}/{chapters.length}
          </span>
        </div>
        <p className="text-xs sm:text-sm font-bold text-white truncate leading-snug">
          {currentChapter.title}
        </p>

        {/* Ondes sonores animées réparties harmonieusement */}
        <div className="flex items-center justify-between gap-1 h-5 mt-2.5 px-0.5">
          {WAVE_BARS.map((h, i) => {
            const isPassed = (i / WAVE_BARS.length) * 100 <= progressRatio;
            return (
              <span
                key={i}
                className={`flex-1 rounded-full transition-all duration-200 ${
                  isPassed
                    ? 'bg-turquoise'
                    : isPlaying
                      ? 'bg-turquoise/60'
                      : 'bg-white/20'
                } ${isPlaying ? 'animate-pulse' : ''}`}
                style={{
                  height: isPlaying
                    ? `${Math.max(25, h * (i % 2 === 0 ? 1 : 0.8))}%`
                    : `${Math.max(20, h * 0.35)}%`,
                  animationDelay: `${(i % 8) * 100}ms`,
                }}
              />
            );
          })}
        </div>
      </div>

      {/* ── 3. SCRUBBER TEMPOREL INTERACTIF ── */}
      <div className="relative z-10 mt-3 space-y-1">
        <div className="relative w-full flex items-center">
          <input
            type="range"
            min={0}
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            aria-label="Position de lecture du cours audio"
            className="w-full h-1.5 bg-white/15 rounded-lg appearance-none cursor-pointer accent-turquoise focus:outline-none"
          />
        </div>
        <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-white/50 px-0.5">
          <span>{formatTime(currentTime)}</span>
          <span className="text-[9px] text-turquoise/80 font-sans font-bold uppercase tracking-wider flex items-center gap-1">
            <StudyIcon name="onde_audio" size={12} />
            <span>{isSynthesizing ? 'Voix Pédagogique Active' : 'Audio Haute Définition'}</span>
          </span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* ── 4. CONTRÔLES TACTILES AVEC ICÔNES OFFICIELLES RECULE / PLAY / AVANCE ── */}
      <div className="relative z-10 mt-3 pt-1 space-y-2.5">
        {/* Ligne principale : Recul 10s, Grand bouton Play central, Avance 10s */}
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          {/* Recul 10s */}
          <button
            type="button"
            onClick={() => skipTime(-10)}
            aria-label="Reculer de 10 secondes"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 text-white font-bold text-xs transition-all flex items-center justify-center shrink-0 border border-white/10 shadow-sm p-2"
            title="Reculer de 10 secondes"
          >
            <StudyIcon name="reculer_10s" size={20} />
          </button>

          {/* Bouton Principal PLAY / PAUSE : spacieux, centré, aucune troncature */}
          <button
            type="button"
            onClick={togglePlay}
            aria-label={isPlaying ? 'Mettre en pause' : 'Écouter le cours audio'}
            className={`flex-1 max-w-[260px] h-11 sm:h-12 px-5 rounded-full font-black text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all active:scale-95 shadow-lg ${
              isPlaying
                ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-400/25 ring-2 ring-amber-400/30'
                : 'bg-gradient-to-r from-turquoise via-[#00B8A9] to-[#0B6477] text-white hover:brightness-110 shadow-turquoise/30 ring-2 ring-turquoise/30'
            }`}
          >
            <StudyIcon name={isPlaying ? 'pause' : 'play'} size={20} className="shrink-0" />
            <span className="whitespace-nowrap font-black tracking-tight">
              {isPlaying ? 'Pause' : "Écouter l'explication"}
            </span>
          </button>

          {/* Avance 10s */}
          <button
            type="button"
            onClick={() => skipTime(10)}
            aria-label="Avancer de 10 secondes"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 text-white font-bold text-xs transition-all flex items-center justify-center shrink-0 border border-white/10 shadow-sm p-2"
            title="Avancer de 10 secondes"
          >
            <StudyIcon name="avancer_10s" size={20} />
          </button>
        </div>

        {/* Ligne secondaire : Vitesse de lecture & Statut discret */}
        <div className="flex items-center justify-between gap-2 px-1 pt-0.5">
          <div className="flex items-center gap-1.5 text-[11px] text-white/60 font-medium">
            <StudyIcon name="voix_active" size={14} className="shrink-0" />
            <span className="hidden xs:inline">Mode audio actif</span>
          </div>

          {/* Sélecteur de vitesse bien aéré */}
          <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-full border border-white/10 shrink-0 ml-auto">
            <StudyIcon name="vitesse_lecture" size={12} className="shrink-0 opacity-60" />
            <span className="text-[10px] uppercase font-bold text-white/40 mr-1">Vitesse</span>
            {[1, 1.25, 1.5].map((rate) => (
              <button
                key={rate}
                type="button"
                onClick={() => changeSpeed(rate)}
                className={`px-2 py-0.5 rounded-full text-[11px] font-bold transition-all ${
                  playbackRate === rate
                    ? 'bg-turquoise text-[#0C1C2B] shadow-sm'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                {rate}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── 5. TRANSCRIPTION DU PROFESSEUR AVEC ICÔNE OFFICIELLE CONSEIL_PROFESSEUR ── */}
      <div className="relative z-10 mt-3 p-3 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-white/85 leading-relaxed font-sans">
        <div className="flex items-center gap-2 mb-1.5 text-[11px] font-bold text-turquoise">
          <StudyIcon name="conseil_professeur" size={18} className="shrink-0" />
          <span>Conseil du Professeur pour l&apos;épreuve :</span>
        </div>
        <p className="italic text-white/90 text-xs sm:text-[13px] leading-relaxed">
          &laquo; {currentChapter.textScript} &raquo;
        </p>
      </div>

      {/* ── 6. REPÈRES CLÉS & CHAPITRES DU COURS (DÉPLIABLE AVEC ICÔNES SPÉCIFIQUES) ── */}
      {isExpanded && (
        <div className="relative z-10 mt-3 pt-3 border-t border-white/10 space-y-1.5 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-white/50 uppercase tracking-wider mb-2">
            <StudyIcon name="liste_reperes" size={14} className="shrink-0 opacity-60" />
            <span>Repères clés du cours (cliquez pour écouter) :</span>
          </div>
          <div className="space-y-1.5">
            {chapters.map((ch, idx) => {
              const isCurrent = idx === activeChapterIndex;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => jumpToChapter(idx)}
                  className={`w-full text-left p-2 sm:p-2.5 rounded-xl border transition-all flex items-center justify-between gap-2 ${
                    isCurrent
                      ? 'bg-turquoise/20 border-turquoise text-white shadow-sm font-semibold'
                      : 'bg-white/[0.03] border-white/5 text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    <span className="text-[10px] font-mono font-bold text-turquoise bg-turquoise/15 px-1.5 py-0.5 rounded shrink-0">
                      {formatTime(ch.timeSeconds)}
                    </span>
                    <span className="text-xs truncate">{ch.title}</span>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {ch.icon && (
                      <StudyIcon name={ch.icon} size={14} className="shrink-0" />
                    )}
                    <span className="text-[9px] font-bold uppercase tracking-wider text-white/50 bg-white/5 px-2 py-0.5 rounded">
                      {ch.badge}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
      </section>

      {/* ── BARRE DE CONTRÔLE AUDIO FLOTTANTE (STICKY MINI-PLAYER RESPONSIVE & 3D) ── */}
      {shouldShowMiniPlayer && (
        <aside
          role="region"
          aria-label="Contrôle audio flottant"
          className="fixed z-40 transition-all duration-300 left-3.5 right-3.5 max-w-md mx-auto md:max-w-2xl md:left-1/2 md:-translate-x-1/2 md:right-auto md:w-[calc(100%-2rem)] md:bottom-5 bottom-[calc(4.85rem+env(safe-area-inset-bottom,0px))] animate-in fade-in slide-in-from-bottom-4"
        >
          {/* Capsule 3D avec biseau lumineux, ombre multicouche et barre de progression intégrée */}
          <div
            className="relative overflow-hidden rounded-2xl md:rounded-full px-3 py-2 sm:px-4 sm:py-2.5 flex items-center justify-between gap-2.5 sm:gap-4 text-white"
            style={{
              background:
                'linear-gradient(180deg, #132a3e 0%, #0c1c2b 55%, #07131d 100%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              boxShadow:
                '0 16px 36px -4px rgba(0, 0, 0, 0.45), 0 4px 14px rgba(0, 184, 169, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.25), inset 0 -2px 3px rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(0, 184, 169, 0.35)',
            }}
          >
            {/* Ligne de progression 3D en tête de capsule */}
            <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-white/10 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-turquoise via-[#00e1cf] to-emerald-400 transition-all duration-300 shadow-[0_0_8px_rgba(0,184,169,0.8)]"
                style={{ width: `${progressRatio}%` }}
              />
            </div>

            {/* Section Gauche : Indicateur d'onde + Titre cliquable (remonte au cours) */}
            <button
              type="button"
              onClick={scrollToMainPlayer}
              className="flex items-center gap-2.5 min-w-0 flex-1 text-left group hover:opacity-95 transition-opacity"
              title="Cliquer pour revenir au lecteur audio principal"
            >
              {/* Micro-vignette 3D */}
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-turquoise to-[#05E2B6] p-0.5 shadow-md flex items-center justify-center shrink-0">
                <div className="w-full h-full bg-[#0C1C2B] rounded-[10px] flex items-center justify-center p-1">
                  <StudyIcon name="micro_professeur" size={18} />
                </div>
                {isPlaying && (
                  <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-turquoise opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-turquoise"></span>
                  </span>
                )}
              </div>

              {/* Titre et repère */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-black uppercase text-turquoise tracking-wider bg-turquoise/15 px-1.5 py-0.2 rounded border border-turquoise/25">
                    {currentChapter.badge || 'Audio'}
                  </span>
                  <span className="text-[10px] font-mono text-white/50 hidden xs:inline">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
                <p className="text-xs font-bold text-white truncate group-hover:text-turquoise transition-colors mt-0.5">
                  {currentChapter.title}
                </p>
              </div>
            </button>

            {/* Section Centrale / Droite : Contrôles audio (-10s, Play/Pause 3D, +10s) */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {/* Recul 10s */}
              <button
                type="button"
                onClick={() => skipTime(-10)}
                aria-label="Reculer de 10 secondes"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 text-white font-bold transition-all flex items-center justify-center shrink-0 border border-white/10 p-1.5"
                title="Reculer de 10 secondes"
              >
                <StudyIcon name="reculer_10s" size={16} />
              </button>

              {/* Bouton Play/Pause 3D principal */}
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isPlaying ? 'Mettre en pause' : 'Reprendre la lecture'}
                className={cn(
                  'w-9 h-9 sm:w-10 sm:h-10 rounded-full font-black text-xs flex items-center justify-center transition-all active:scale-90 shadow-md',
                  isPlaying
                    ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-400/30 ring-2 ring-amber-400/40'
                    : 'bg-gradient-to-r from-turquoise via-[#00B8A9] to-[#05E2B6] text-white hover:brightness-110 shadow-turquoise/40 ring-2 ring-turquoise/40'
                )}
                title={isPlaying ? 'Pause' : 'Lecture'}
              >
                <StudyIcon name={isPlaying ? 'pause' : 'play'} size={18} className="shrink-0" />
              </button>

              {/* Avance 10s */}
              <button
                type="button"
                onClick={() => skipTime(10)}
                aria-label="Avancer de 10 secondes"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-90 text-white font-bold transition-all flex items-center justify-center shrink-0 border border-white/10 p-1.5"
                title="Avancer de 10 secondes"
              >
                <StudyIcon name="avancer_10s" size={16} />
              </button>

              {/* Bouton fermer/masquer discret */}
              <button
                type="button"
                onClick={() => setIsMiniDismissed(true)}
                aria-label="Masquer le lecteur flottant"
                className="w-7 h-7 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center ml-0.5"
                title="Fermer la barre de contrôle"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}
