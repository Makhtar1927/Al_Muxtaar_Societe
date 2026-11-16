'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import MathRenderer from '@/components/course/math-renderer';
import {
  BookOpen,
  Award,
  Search,
  Filter,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  GraduationCap,
  Sparkles,
  Lock,
  Dna,
} from 'lucide-react';
import { SVT_RECUEIL_30_EPREUVES, SVTEpreuveItem } from '@/lib/recueils/svt-data-recueil';

export type { SVTEpreuveItem };
export { SVT_RECUEIL_30_EPREUVES };

interface SVTRecueilProps {
  isSubscribed?: boolean;
}

export default function SVTRecueilEpreuves({ isSubscribed = false }: SVTRecueilProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSourceType, setSelectedSourceType] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<number | null>(1); // Première épreuve ouverte par défaut

  const filteredEpreuves = useMemo(() => {
    return SVT_RECUEIL_30_EPREUVES.filter((ep) => {
      // Filtre catégorie
      if (selectedCategory !== 'all' && ep.category !== selectedCategory) {
        return false;
      }

      // Filtre type de source
      if (selectedSourceType !== 'all' && ep.sourceType !== selectedSourceType) {
        return false;
      }

      // Filtre recherche textuelle
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchTitle = ep.title.toLowerCase().includes(query);
        const matchTheme = ep.theme.toLowerCase().includes(query);
        const matchSource = ep.source.toLowerCase().includes(query);
        const matchEnonce = ep.enonce.toLowerCase().includes(query);
        return matchTitle || matchTheme || matchSource || matchEnonce;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedSourceType]);

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const getSourceBadgeColor = (sourceType: SVTEpreuveItem['sourceType']) => {
    switch (sourceType) {
      case 'bac':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'lycee':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'concours':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      default:
        return 'bg-surface text-navy border-navy/10';
    }
  };

  const getCategoryLabel = (category: SVTEpreuveItem['category']) => {
    switch (category) {
      case 'neurophysiologie':
        return 'Axe 1 • Neurophysiologie (B1)';
      case 'cardiovasculaire':
        return 'Axe 2 • Cardio & PA (B2)';
      case 'immunologie':
        return 'Axe 3 • Immunologie (B3)';
      case 'reproduction':
        return 'Axe 4 • Reproduction & Hormones (B4)';
      case 'genetique':
        return 'Axe 5 • Génétique & Biotechnologies (B5)';
      default:
        return 'SVT';
    }
  };

  return (
    <section className="bg-white rounded-3xl border border-navy/10 p-5 sm:p-8 shadow-sm space-y-6">
      {/* Header avec Titre et Badges Officiels */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-navy/10 pb-6">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 bg-emerald-700 text-white text-[11px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
              <Dna className="w-3.5 h-3.5 text-emerald-200" />
              SVT • Terminale S2
            </span>
            <span className="text-[11px] font-bold text-navy/60 bg-surface px-2.5 py-1 rounded-full border border-navy/10">
              30 Sujets Officiels &amp; Corrigés Exhaustifs
            </span>
            <span className="text-[11px] font-extrabold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
              Bac Sénégal • Lycées d&apos;Excellence • Concours Général
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-navy flex items-center gap-2.5">
            <BookOpen className="w-6 h-6 text-emerald-600 shrink-0" />
            <span>Grand Recueil d&apos;Épreuves &amp; Corrigés de SVT (Terminale S2)</span>
          </h2>
          <p className="text-xs sm:text-sm text-navy/70 mt-1 max-w-3xl leading-relaxed">
            Consultez les 30 épreuves intégrales de Sciences de la Vie et de la Terre avec des corrigés rigoureux conformes aux exigences du Baccalauréat sénégalais. Les 3 premières épreuves sont en accès libre gratuit.
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-2 bg-surface p-2.5 rounded-2xl border border-navy/5">
          <GraduationCap className="w-5 h-5 text-emerald-600" />
          <div className="text-right">
            <span className="text-[10px] font-bold text-navy/50 uppercase tracking-widest block">Disponibles</span>
            <span className="text-sm font-black text-navy">
              {filteredEpreuves.length} / {SVT_RECUEIL_30_EPREUVES.length} épreuves
            </span>
          </div>
        </div>
      </div>

      {/* Barre de Recherche et Filtres */}
      <div className="space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 text-navy/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Rechercher par mot-clé (ex: Magendie, Stannius, Hering, Loewi, VIH, Zinkernagel, CMH, Drosophile, Trisomie, PCR...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-surface/50 border border-navy/10 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-emerald-600/30 text-navy font-medium placeholder:text-navy/40 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-navy/40 hover:text-navy"
            >
              Effacer
            </button>
          )}
        </div>

        {/* Filtres par Catégorie et par Source */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          {/* Catégories / Axes SVT */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-navy/50 mr-1 flex items-center gap-1">
              <Filter className="w-3 h-3" /> Axe :
            </span>
            {[
              { id: 'all', label: 'Tous' },
              { id: 'neurophysiologie', label: 'Axe 1 : Neuro' },
              { id: 'cardiovasculaire', label: 'Axe 2 : Cardio' },
              { id: 'immunologie', label: 'Axe 3 : Immuno' },
              { id: 'reproduction', label: 'Axe 4 : Repro' },
              { id: 'genetique', label: 'Axe 5 : Génétique' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'bg-surface text-navy/70 hover:bg-navy/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Sources */}
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[11px] font-bold text-navy/50 mr-1">Source :</span>
            {[
              { id: 'all', label: 'Toutes' },
              { id: 'bac', label: 'Bac Sénégal' },
              { id: 'lycee', label: 'Lycées' },
              { id: 'concours', label: 'Concours Général' },
            ].map((src) => (
              <button
                key={src.id}
                onClick={() => setSelectedSourceType(src.id)}
                className={`text-[11px] font-bold px-2.5 py-1 rounded-lg transition-all ${
                  selectedSourceType === src.id
                    ? 'bg-navy text-white shadow-xs'
                    : 'bg-surface text-navy/70 hover:bg-navy/5'
                }`}
              >
                {src.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Liste des Épreuves Dépliables */}
      <div className="space-y-3.5 pt-2">
        {filteredEpreuves.length === 0 ? (
          <div className="text-center py-10 bg-surface/40 rounded-2xl border border-dashed border-navy/15 p-6">
            <Dna className="w-10 h-10 text-navy/30 mx-auto mb-2" />
            <p className="text-sm font-bold text-navy">Aucune épreuve trouvée</p>
            <p className="text-xs text-navy/60 mt-1">
              Essayez de modifier votre mot-clé de recherche ou réinitialisez les filtres.
            </p>
          </div>
        ) : (
          filteredEpreuves.map((ep) => {
            const isExpanded = expandedId === ep.id;
            const isFree = ep.id <= 3;
            const canViewCorrection = isSubscribed || isFree;

            return (
              <div
                key={ep.id}
                className="border border-navy/10 rounded-2xl overflow-hidden bg-white shadow-xs transition-all hover:border-emerald-600/30"
              >
                {/* En-tête de la carte */}
                <div
                  onClick={() => toggleExpand(ep.id)}
                  className="p-4 sm:p-5 bg-surface/30 cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 select-none hover:bg-surface/60 transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-7 h-7 rounded-xl bg-emerald-700 text-white font-black text-xs flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                      {ep.id}
                    </span>

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span
                          className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${getSourceBadgeColor(
                            ep.sourceType
                          )}`}
                        >
                          {ep.source}
                        </span>

                        <span className="text-[10px] font-bold text-navy/60 bg-white px-2 py-0.5 rounded-md border border-navy/10">
                          {getCategoryLabel(ep.category)}
                        </span>

                        <span className="text-[10px] font-bold text-navy/40 uppercase tracking-wider">
                          • {ep.theme}
                        </span>

                        {isFree ? (
                          <span className="text-[9px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-md">
                            Gratuit
                          </span>
                        ) : !isSubscribed ? (
                          <span className="text-[9px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                            <Lock className="w-2.5 h-2.5 text-amber-700" />
                            Abonnés
                          </span>
                        ) : null}
                      </div>

                      <h3 className="font-extrabold text-navy text-sm sm:text-base leading-snug">
                        {ep.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                    <span className="text-xs font-bold text-emerald-700 hidden sm:inline">
                      {isExpanded
                        ? 'Masquer la correction'
                        : canViewCorrection
                        ? 'Voir le corrigé'
                        : '🔒 Corrigé réservé'}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center border border-navy/5 text-navy">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </div>
                </div>

                {/* Énoncé de l'exercice */}
                <div className="p-4 sm:p-5 border-t border-navy/5 bg-white space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-black uppercase tracking-wider text-navy bg-surface px-2.5 py-1 rounded-md border border-navy/5">
                      Énoncé Officiel
                    </span>
                  </div>

                  <div className="text-sm text-navy/90 leading-relaxed font-sans pt-1">
                    <MathRenderer content={ep.enonce} />
                  </div>
                </div>

                {/* Corrigé Détaillé Dépliable ou Paywall Sécurisé */}
                {isExpanded && (
                  canViewCorrection ? (
                    <div className="p-4 sm:p-5 bg-gradient-to-b from-emerald-50/50 to-surface/40 border-t border-emerald-200/60 space-y-3">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="text-[11px] font-black uppercase tracking-wider text-emerald-900 bg-emerald-100 px-2.5 py-1 rounded-md border border-emerald-300">
                          Correction Complète &amp; Rédigée (Barème Bac S2)
                        </span>
                      </div>

                      <div className="text-sm text-navy/90 leading-relaxed font-sans pt-1 space-y-2">
                        <MathRenderer content={ep.correction} />
                      </div>
                    </div>
                  ) : (
                    <div className="p-5 sm:p-6 bg-gradient-to-br from-navy/5 via-emerald-50/30 to-surface border-t border-navy/10 space-y-3">
                      <div className="max-w-xl mx-auto text-center space-y-2.5 py-2">
                        <div className="w-10 h-10 rounded-2xl bg-navy text-amber-300 flex items-center justify-center mx-auto shadow-xs">
                          <Lock className="w-5 h-5 text-amber-400" />
                        </div>
                        <h4 className="font-extrabold text-navy text-sm sm:text-base">
                          Correction réservée aux abonnés Al Muxtaar
                        </h4>
                        <p className="text-xs text-navy/70 leading-relaxed">
                          Les 3 premières épreuves sont offertes en libre accès. Pour accéder aux corrections rédigées pas à pas des <strong>30 épreuves intégrales</strong> de SVT du Bac S2, Lycées d&apos;excellence et Concours Général, activez votre abonnement.
                        </p>
                        <div className="pt-1">
                          <Link
                            href="/abonnement"
                            className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs transition-all"
                          >
                            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                            <span>Débloquer les 30 corrigés détaillés de SVT →</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Footer Pédagogique du Recueil */}
      <div className="rounded-2xl bg-navy text-white p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-3 text-center sm:text-left">
          <Sparkles className="w-6 h-6 text-emerald-400 shrink-0" />
          <div>
            <p className="font-extrabold text-sm">Conseil Méthodologique de l&apos;Équipe IGEF — SVT Terminale S2</p>
            <p className="text-xs text-white/70 mt-0.5">
              Ces 30 épreuves couvrent l&apos;intégralité des 5 Axes de SVT (B1 à B5) du Baccalauréat sénégalais. Soignez la démarche d&apos;analyse rigoureuse : <em>« Or on observe... Or on sait que... Donc on déduit que... »</em>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
