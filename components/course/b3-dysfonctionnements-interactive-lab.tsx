'use client';

import { useState } from 'react';
import { RotateCcw, Info, Activity, AlertTriangle, ShieldCheck, Award } from 'lucide-react';

type LabViewMode =
  | 'allergie_phases'
  | 'structure_vih'
  | 'cycle_replicatif'
  | 'cinetique_sida'
  | 'comparatif_maladies';

export default function B3DysfonctionnementsInteractiveLab() {
  const [viewMode, setViewMode] = useState<LabViewMode>('allergie_phases');
  const [allergiePhase, setAllergiePhase] = useState<number>(1);
  const [cycleStep, setCycleStep] = useState<number>(1);
  const [cinetiquePhase, setCinetiquePhase] = useState<number>(1);

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden my-8">
      {/* En-tête du Laboratoire Virtuel */}
      <div className="bg-gradient-to-r from-amber-950 via-rose-950 to-red-950 text-white p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500/20 text-amber-200 text-xs font-semibold px-2.5 py-1 rounded-md uppercase tracking-wider border border-amber-400/30">
              Laboratoire Virtuel Réaliste
            </span>
            <span className="text-amber-200 text-xs">Physiopathologie & Virologie Bac S2</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setAllergiePhase(1);
                setCycleStep(1);
                setCinetiquePhase(1);
              }}
              className="flex items-center gap-1.5 text-xs bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors"
            >
              <RotateCcw size={13} />
              <span>Réinitialiser</span>
            </button>
          </div>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          Simulateur Interactif : Mécanisme de l'Allergie, Cycle du VIH & Évolution du SIDA
        </h2>
        <p className="text-amber-100/90 text-sm mt-1 max-w-3xl">
          Explorez les deux phases de l'hypersensibilité immédiate à IgE, la structure moléculaire du virion VIH (gp120/gp41/p24), les 7 étapes du cycle réplicatif et les courbes cinétiques de la séropositivité au Bac S2.
        </p>
      </div>

      {/* Barre de sélection des vues */}
      <div className="border-b border-gray-200 bg-gray-50/90 p-2 sm:p-3 overflow-x-auto scrollbar-thin">
        <div className="flex gap-2 min-w-max">
          <button
            onClick={() => setViewMode('allergie_phases')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'allergie_phases'
                ? 'bg-amber-900 text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            1. Mécanisme de l'Allergie (Phase 1 vs Phase 2)
          </button>
          <button
            onClick={() => setViewMode('structure_vih')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'structure_vih'
                ? 'bg-amber-900 text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            2. Structure Moléculaire du Virion VIH
          </button>
          <button
            onClick={() => setViewMode('cycle_replicatif')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'cycle_replicatif'
                ? 'bg-amber-900 text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            3. Les 7 Étapes du Cycle Réplicatif du VIH
          </button>
          <button
            onClick={() => setViewMode('cinetique_sida')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'cinetique_sida'
                ? 'bg-amber-900 text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            4. Courbes Cinétiques & Évolution Vers le SIDA
          </button>
          <button
            onClick={() => setViewMode('comparatif_maladies')}
            className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
              viewMode === 'comparatif_maladies'
                ? 'bg-amber-900 text-white shadow-sm'
                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            5. Tableau Comparatif des Dysfonctionnements
          </button>
        </div>
      </div>

      {/* Zone d'affichage Interactive */}
      <div className="p-4 sm:p-6 space-y-6">
        {/* VUE 1 : MÉCANISME EN 2 PHASES DE L'ALLERGIE */}
        {viewMode === 'allergie_phases' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-amber-50 p-3.5 rounded-xl border border-amber-200">
              <div>
                <span className="text-xs font-bold text-amber-900 uppercase tracking-wide">
                  {allergiePhase === 1 ? 'Phase 1 : SENSIBILISATION' : 'Phase 2 : RÉACTION IMMÉDIATE DÉCLENCHÉE'}
                </span>
                <span className="text-sm font-semibold text-gray-900 ml-2">
                  {allergiePhase === 1
                    ? 'Premier contact avec l\'allergène (Asymptomatique & Silencieux)'
                    : 'Contacts ultérieurs : Pontage des IgE & Dégranulation explosive d\'histamine'}
                </span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setAllergiePhase(1)}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                    allergiePhase === 1
                      ? 'bg-amber-900 text-white shadow-xs'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  1. Sensibilisation (1er contact)
                </button>
                <button
                  onClick={() => setAllergiePhase(2)}
                  className={`px-3 py-1 rounded text-xs font-bold transition-all ${
                    allergiePhase === 2
                      ? 'bg-red-800 text-white shadow-xs'
                      : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  2. Déclenchement (2e contact)
                </button>
              </div>
            </div>

            {/* Schéma SVG Vectoriel : Mastocyte & IgE */}
            <div className="border border-gray-200 rounded-xl bg-slate-900 p-4 overflow-x-auto flex justify-center">
              <svg viewBox="0 0 760 380" className="w-full max-w-3xl h-auto select-none">
                <defs>
                  <radialGradient id="gradMastocyte" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#78350f" />
                    <stop offset="80%" stopColor="#451a03" />
                  </radialGradient>
                </defs>

                {allergiePhase === 1 ? (
                  /* PHASE 1 : SENSIBILISATION */
                  <g>
                    {/* Allergène pénétrant */}
                    <g transform="translate(60, 50)">
                      <circle cx="20" cy="20" r="14" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
                      <text x="20" y="24" fill="#78350f" fontSize="8" textAnchor="middle" fontWeight="bold">Pollen</text>
                      <text x="50" y="24" fill="#fde68a" fontSize="11" fontWeight="bold">1er contact allergène</text>
                    </g>

                    {/* Présentation par CPA aux LT4 */}
                    <path d="M 120 70 L 190 120" stroke="#fbbf24" strokeWidth="2" strokeDasharray="3,3" />
                    <g transform="translate(190, 100)">
                      <rect x="0" y="0" width="110" height="45" rx="6" fill="#1e3a8a" stroke="#3b82f6" strokeWidth="1.5" />
                      <text x="55" y="18" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">CPA ──&gt; LT4 (Th2)</text>
                      <text x="55" y="34" fill="#93c5fd" fontSize="9" textAnchor="middle">Sécrétion IL-4 / IL-13</text>
                    </g>

                    {/* Activation LB vers IgE */}
                    <path d="M 300 122 L 360 122" stroke="#60a5fa" strokeWidth="2" />
                    <g transform="translate(360, 100)">
                      <rect x="0" y="0" width="110" height="45" rx="6" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
                      <text x="55" y="18" fill="#ffffff" fontSize="10" textAnchor="middle" fontWeight="bold">LB ──&gt; Plasmocyte</text>
                      <text x="55" y="34" fill="#c7d2fe" fontSize="9" textAnchor="middle">Production d'IgE</text>
                    </g>

                    {/* Mastocyte au repos s'armant d'IgE */}
                    <g transform="translate(480, 200)">
                      <circle cx="100" cy="100" r="75" fill="url(#gradMastocyte)" stroke="#b45309" strokeWidth="2.5" />
                      <text x="100" y="95" fill="#fef3c7" fontSize="13" textAnchor="middle" fontWeight="bold">MASTOCYTE</text>
                      <text x="100" y="112" fill="#fde68a" fontSize="10" textAnchor="middle">AU REPOS (Armé)</text>

                      {/* Granules intracellulaires riches en histamine */}
                      <circle cx="65" cy="75" r="7" fill="#dc2626" opacity="0.9" />
                      <circle cx="85" cy="65" r="7" fill="#dc2626" opacity="0.9" />
                      <circle cx="120" cy="70" r="7" fill="#dc2626" opacity="0.9" />
                      <circle cx="140" cy="85" r="7" fill="#dc2626" opacity="0.9" />
                      <circle cx="130" cy="120" r="7" fill="#dc2626" opacity="0.9" />
                      <circle cx="70" cy="125" r="7" fill="#dc2626" opacity="0.9" />
                      <text x="100" y="145" fill="#fca5a5" fontSize="8" textAnchor="middle">Granules d'histamine</text>

                      {/* IgE fixées par leur Fc sur la membrane */}
                      <g transform="translate(100, 25)">
                        <path d="M 0 0 L 0 -12 M -6 -18 L 0 -12 L 6 -18" stroke="#38bdf8" strokeWidth="2" />
                        <text x="12" y="-10" fill="#7dd3fc" fontSize="8">IgE fixée (Fc)</text>
                      </g>
                      <g transform="translate(30, 70)">
                        <path d="M 0 0 L -12 0 M -18 -6 L -12 0 L -18 6" stroke="#38bdf8" strokeWidth="2" />
                      </g>
                      <g transform="translate(170, 70)">
                        <path d="M 0 0 L 12 0 M 18 -6 L 12 0 L 18 6" stroke="#38bdf8" strokeWidth="2" />
                      </g>
                    </g>

                    <rect x="60" y="320" width="400" height="35" rx="6" fill="#1c1917" stroke="#78350f" strokeWidth="1" />
                    <text x="75" y="342" fill="#fef3c7" fontSize="10" fontWeight="bold">
                      BILAN PHASE 1 : Asymptomatique. Le sujet devient « sensibilisé ».
                    </text>
                  </g>
                ) : (
                  /* PHASE 2 : DÉCLENCHEMENT & DÉGRANULATION */
                  <g>
                    {/* Mastocyte activé en dégranulation */}
                    <g transform="translate(260, 170)">
                      <circle cx="120" cy="100" r="85" fill="#7f1d1d" stroke="#ef4444" strokeWidth="3" />
                      <text x="120" y="95" fill="#ffffff" fontSize="13" textAnchor="middle" fontWeight="bold">MASTOCYTE DÉGRANULÉ</text>
                      <text x="120" y="112" fill="#fecaca" fontSize="10" textAnchor="middle">Exocytose massive</text>

                      {/* Pontage des IgE par l'allergène au sommet */}
                      <g transform="translate(120, 15)">
                        {/* Deux IgE */}
                        <path d="M -12 0 L -12 -14 M -20 -22 L -12 -14 L -4 -22" stroke="#38bdf8" strokeWidth="2" />
                        <path d="M 12 0 L 12 -14 M 4 -22 L 12 -14 L 20 -22" stroke="#38bdf8" strokeWidth="2" />
                        {/* Allergène pontant */}
                        <circle cx="0" cy="-22" r="10" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
                        <text x="0" y="-19" fill="#78350f" fontSize="7" textAnchor="middle" fontWeight="bold">Ag</text>
                        <text x="0" y="-36" fill="#fde68a" fontSize="9" textAnchor="middle" fontWeight="bold">PONTAGE DES IgE</text>
                      </g>

                      {/* Éjection de l'histamine hors de la cellule */}
                      <g fill="#ef4444">
                        <circle cx="-25" cy="50" r="5" />
                        <circle cx="-45" cy="80" r="6" />
                        <circle cx="-30" cy="120" r="5" />
                        <circle cx="265" cy="50" r="5" />
                        <circle cx="280" cy="90" r="6" />
                        <circle cx="260" cy="130" r="5" />
                        <circle cx="80" cy="200" r="5" />
                        <circle cx="120" cy="210" r="6" />
                        <circle cx="160" cy="205" r="5" />
                      </g>
                    </g>

                    {/* Conséquences physiopathologiques */}
                    <g transform="translate(40, 40)">
                      <rect x="0" y="0" width="220" height="85" rx="6" fill="#450a0a" stroke="#b91c1c" strokeWidth="1.5" />
                      <text x="15" y="22" fill="#fca5a5" fontSize="10" fontWeight="bold">EFFETS DE L'HISTAMINE</text>
                      <text x="15" y="40" fill="#fecaca" fontSize="9">1. Vasodilatation artériolaire (RPT ↘)</text>
                      <text x="15" y="55" fill="#fecaca" fontSize="9">2. Perméabilité capillaire ↗ (Œdème)</text>
                      <text x="15" y="70" fill="#fecaca" fontSize="9">3. Bronchoconstriction (Crise d'asthme)</text>
                    </g>

                    <g transform="translate(500, 40)">
                      <rect x="0" y="0" width="220" height="85" rx="6" fill="#78350f" stroke="#d97706" strokeWidth="1.5" />
                      <text x="15" y="22" fill="#fde68a" fontSize="10" fontWeight="bold">CHOC ANAPHYLACTIQUE</text>
                      <text x="15" y="40" fill="#fef3c7" fontSize="9">Chute brutale de la pression artérielle</text>
                      <text x="15" y="55" fill="#fef3c7" fontSize="9">Œdème de Quincke (Asphyxie)</text>
                      <text x="15" y="70" fill="#fde68a" fontSize="9" fontWeight="bold">Urgence : Adrénaline I.M.</text>
                    </g>
                  </g>
                )}
              </svg>
            </div>
          </div>
        )}

        {/* VUE 2 : STRUCTURE DU VIRION VIH */}
        {viewMode === 'structure_vih' && (
          <div className="space-y-4">
            <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl text-xs sm:text-sm text-rose-950">
              <div className="font-bold flex items-center gap-2 mb-1">
                <AlertTriangle size={18} className="text-rose-700" />
                <span>Anatomie Moléculaire du Virus de l'Immunodéficience Humaine (Rétrovirus Enveloppé)</span>
              </div>
              <p>
                Le virion mûr possède une enveloppe lipidique dérivée de la cellule hôte portant le complexe de glycoprotéines <strong>gp120</strong> (tête externe) et <strong>gp41</strong> (tige transmembranaire), une capside conique <strong>p24</strong> renfermant deux molécules d'<strong>ARN simple brin</strong> et le trio enzymatique : <em>transcriptase inverse</em>, <em>intégrase</em> et <em>protéase</em>.
              </p>
            </div>

            {/* Schéma SVG Vectoriel : Coupe du Virion VIH */}
            <div className="border border-gray-200 rounded-xl bg-slate-900 p-4 overflow-x-auto flex justify-center">
              <svg viewBox="0 0 760 380" className="w-full max-w-3xl h-auto select-none">
                {/* Centre du virus */}
                <g transform="translate(380, 190)">
                  {/* 1. Enveloppe lipidique externe */}
                  <circle cx="0" cy="0" r="140" fill="#1e293b" stroke="#475569" strokeWidth="6" />

                  {/* Spicules gp120/gp41 tout autour */}
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, idx) => (
                    <g key={idx} transform={`rotate(${angle}) translate(0, -140)`}>
                      {/* Tige gp41 */}
                      <rect x="-3" y="-12" width="6" height="12" fill="#f59e0b" />
                      {/* Tête trimérique gp120 */}
                      <circle cx="0" cy="-20" r="9" fill="#ef4444" stroke="#dc2626" strokeWidth="1" />
                    </g>
                  ))}

                  {/* 2. Matrice protéique p17 sous-membranaire */}
                  <circle cx="0" cy="0" r="125" fill="none" stroke="#3b82f6" strokeWidth="4" strokeDasharray="6,3" />

                  {/* 3. Capside conique protéique p24 */}
                  <polygon points="-55,75 55,75 35,-65 -35,-65" fill="#334155" stroke="#94a3b8" strokeWidth="2.5" />

                  {/* 4. Deux molécules d'ARN viral (brins ondulés rouges) */}
                  <path d="M -15 -40 Q -5 -20 -15 0 Q -25 20 -15 40" stroke="#f43f5e" strokeWidth="3" fill="none" />
                  <path d="M 15 -40 Q 25 -20 15 0 Q 5 20 15 40" stroke="#f43f5e" strokeWidth="3" fill="none" />

                  {/* 5. Trio Enzymatique */}
                  {/* Transcriptase inverse */}
                  <circle cx="-8" cy="-5" r="5" fill="#fbbf24" />
                  <circle cx="8" cy="-5" r="5" fill="#fbbf24" />
                  {/* Intégrase */}
                  <circle cx="-12" cy="20" r="4" fill="#10b981" />
                  <circle cx="12" cy="20" r="4" fill="#10b981" />
                  {/* Protéase */}
                  <rect x="-6" cy="35" width="12" height="6" fill="#a855f7" rx="1" />
                </g>

                {/* Légendes annotées précises du Bac */}
                <g transform="translate(60, 40)">
                  <rect x="0" y="0" width="180" height="100" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                  <text x="12" y="20" fill="#ef4444" fontSize="10" fontWeight="bold">gp120 (Externe)</text>
                  <text x="12" y="34" fill="#cbd5e1" fontSize="9">Se lie au récepteur CD4</text>
                  <text x="12" y="55" fill="#f59e0b" fontSize="10" fontWeight="bold">gp41 (Transmembranaire)</text>
                  <text x="12" y="69" fill="#cbd5e1" fontSize="9">Fusion de membrane</text>
                  <text x="12" y="88" fill="#38bdf8" fontSize="9">Enveloppe lipidique hôte</text>
                </g>

                <g transform="translate(540, 40)">
                  <rect x="0" y="0" width="180" height="120" rx="6" fill="#0f172a" stroke="#334155" strokeWidth="1" />
                  <text x="12" y="20" fill="#94a3b8" fontSize="10" fontWeight="bold">Capside conique (p24)</text>
                  <text x="12" y="38" fill="#f43f5e" fontSize="10" fontWeight="bold">2 ARN monocaténaires</text>
                  <text x="12" y="58" fill="#fbbf24" fontSize="10" fontWeight="bold">Transcriptase Inverse (RT)</text>
                  <text x="12" y="76" fill="#10b981" fontSize="10" fontWeight="bold">Intégrase (IN)</text>
                  <text x="12" y="94" fill="#c084fc" fontSize="10" fontWeight="bold">Protéase virale (PR)</text>
                  <text x="12" y="110" fill="#3b82f6" fontSize="9">Matrice interne (p17)</text>
                </g>
              </svg>
            </div>
          </div>
        )}

        {/* VUE 3 : LES 7 ÉTAPES DU CYCLE RÉPLICATIF DU VIH */}
        {viewMode === 'cycle_replicatif' && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 bg-red-50 p-3.5 rounded-xl border border-red-200">
              <div>
                <span className="text-xs font-bold text-red-800 uppercase tracking-wide">
                  Étape {cycleStep} / 7 :
                </span>
                <span className="text-sm font-semibold text-gray-900 ml-2">
                  {cycleStep === 1 && "1. Fixation : liaison de la gp120 au CD4 et corécepteur CCR5/CXCR4"}
                  {cycleStep === 2 && "2. Fusion membranaire & décapsidation : injection de l'ARN viral"}
                  {cycleStep === 3 && "3. Transcription inverse : synthèse d'un ADN proviral double brin"}
                  {cycleStep === 4 && "4. Intégration génomique : insertion de l'ADN viral par l'intégrase"}
                  {cycleStep === 5 && "5. Transcription & traduction cellulaire : synthèse des polyprotéines virales"}
                  {cycleStep === 6 && "6. Clivage & maturation : découpage protéolytique par la protéase virale"}
                  {cycleStep === 7 && "7. Assemblage & bourgeonnement : libération de nouveaux virions infectieux"}
                </span>
              </div>
              <div className="flex gap-1 overflow-x-auto">
                {[1, 2, 3, 4, 5, 6, 7].map((s) => (
                  <button
                    key={s}
                    onClick={() => setCycleStep(s)}
                    className={`w-7 h-7 rounded text-xs font-bold transition-all ${
                      cycleStep === s
                        ? 'bg-red-800 text-white shadow-xs'
                        : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Schéma SVG Vectoriel : Cycle dans le LT4 */}
            <div className="border border-gray-200 rounded-xl bg-slate-900 p-4 overflow-x-auto flex justify-center">
              <svg viewBox="0 0 760 380" className="w-full max-w-3xl h-auto select-none">
                {/* Contour du Lymphocyte T4 */}
                <rect x="40" y="40" width="680" height="300" rx="16" fill="#1e1b4b" stroke="#4338ca" strokeWidth="2" />
                <text x="70" y="70" fill="#a5b4fc" fontSize="13" fontWeight="bold">
                  LYMPHOCYTE T4 (Cellule Hôte Cible)
                </text>

                {/* Noyau du LT4 */}
                <ellipse cx="380" cy="200" rx="140" ry="85" fill="#0f172a" stroke="#6366f1" strokeWidth="2" strokeDasharray="4,3" />
                <text x="380" y="150" fill="#c7d2fe" fontSize="11" textAnchor="middle" fontWeight="bold">
                  NOYAU CELLULAIRE (ADN Hôte)
                </text>

                {/* Étape 1 : Fixation gp120/CD4 */}
                <g transform="translate(60, 140)">
                  <circle cx="20" cy="20" r="14" fill="#ef4444" stroke="#dc2626" strokeWidth="1.5" />
                  <rect x="34" y="16" width="10" height="8" fill="#3b82f6" />
                  <text x="20" y="50" fill="#fca5a5" fontSize="8" textAnchor="middle">VIH</text>
                  <text x="70" y="24" fill="#93c5fd" fontSize="9" fontWeight="bold">1. CD4 + CCR5</text>
                </g>

                {/* Étape 2 : Décapsidation */}
                <g transform="translate(140, 180)">
                  <path d="M 0 0 L 40 10" stroke="#f43f5e" strokeWidth="2" strokeDasharray="2,2" />
                  <text x="10" y="30" fill="#f43f5e" fontSize="9" fontWeight="bold">2. Décapsidation</text>
                  <path d="M 40 0 Q 50 10 60 0" stroke="#ef4444" strokeWidth="2.5" fill="none" />
                  <text x="50" y="-8" fill="#fca5a5" fontSize="8" textAnchor="middle">ARN viral</text>
                </g>

                {/* Étape 3 : Transcription inverse (ARN -> ADN) */}
                <g transform="translate(190, 240)">
                  <rect x="0" y="0" width="85" height="35" rx="4" fill="#78350f" stroke="#f59e0b" strokeWidth="1" />
                  <text x="42" y="14" fill="#fde68a" fontSize="8" textAnchor="middle" fontWeight="bold">3. Rétrotranscriptase</text>
                  <text x="42" y="28" fill="#ffffff" fontSize="8" textAnchor="middle">ARN ──&gt; ADN proviral</text>
                </g>

                {/* Étape 4 : Intégration dans le noyau */}
                <g transform="translate(320, 190)">
                  <line x1="0" y1="0" x2="120" y2="0" stroke="#818cf8" strokeWidth="3" />
                  <rect x="40" y="-4" width="40" height="8" fill="#ef4444" rx="2" />
                  <text x="60" y="-10" fill="#fca5a5" fontSize="8" textAnchor="middle" fontWeight="bold">Provirus Intégré</text>
                  <text x="60" y="20" fill="#34d399" fontSize="8" textAnchor="middle">4. Intégrase</text>
                </g>

                {/* Étape 5 & 6 : Transcription, Traduction et Clivage */}
                <g transform="translate(480, 240)">
                  <rect x="0" y="0" width="95" height="35" rx="4" fill="#4c1d95" stroke="#a855f7" strokeWidth="1" />
                  <text x="47" y="14" fill="#e9d5ff" fontSize="8" textAnchor="middle" fontWeight="bold">5. Traduction</text>
                  <text x="47" y="28" fill="#c084fc" fontSize="8" textAnchor="middle">6. Protéase (Clivage)</text>
                </g>

                {/* Étape 7 : Bourgeonnement */}
                <g transform="translate(630, 140)">
                  <path d="M 0 0 C 20 -15, 40 -15, 60 0" stroke="#4338ca" strokeWidth="3" fill="none" />
                  <circle cx="30" cy="-20" r="14" fill="#ef4444" stroke="#dc2626" strokeWidth="1.5" />
                  <text x="30" y="18" fill="#fca5a5" fontSize="9" textAnchor="middle" fontWeight="bold">7. Bourgeonnement</text>
                </g>
              </svg>
            </div>
          </div>
        )}

        {/* VUE 4 : CINÉTIQUE ET ÉVOLUTION DU SIDA AU BAC S2 */}
        {viewMode === 'cinetique_sida' && (
          <div className="space-y-4">
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-xl text-xs sm:text-sm text-amber-950">
              <div className="font-bold flex items-center gap-2 mb-1">
                <Activity size={18} className="text-amber-700" />
                <span>Courbes Classiques du Bac S2 : Charge Virale, Taux de LT4 et Anticorps Anti-VIH</span>
              </div>
              <p>
                L'évolution naturelle comprend 3 phases : la primo-infection (semaines 1 à 12), la phase asymptomatique (années 1 à 8-10) et la phase de SIDA déclaré lorsque les <strong>LT4 chutent sous 200/mm³</strong>.
              </p>
            </div>

            {/* Graphe SVG Vectoriel Haute Précision */}
            <div className="border border-gray-200 rounded-xl bg-slate-900 p-4 overflow-x-auto flex justify-center">
              <svg viewBox="0 0 760 380" className="w-full max-w-3xl h-auto select-none">
                {/* Axes */}
                <line x1="80" y1="300" x2="700" y2="300" stroke="#64748b" strokeWidth="2" />
                <line x1="80" y1="40" x2="80" y2="300" stroke="#64748b" strokeWidth="2" />

                {/* Graduations Temps (axe X) */}
                <text x="80" y="325" fill="#94a3b8" fontSize="10" textAnchor="middle">0</text>
                <text x="140" y="325" fill="#94a3b8" fontSize="10" textAnchor="middle">6 sem.</text>
                <text x="210" y="325" fill="#94a3b8" fontSize="10" textAnchor="middle">12 sem.</text>
                <text x="380" y="325" fill="#94a3b8" fontSize="10" textAnchor="middle">4 ans</text>
                <text x="520" y="325" fill="#94a3b8" fontSize="10" textAnchor="middle">8 ans</text>
                <text x="660" y="325" fill="#94a3b8" fontSize="10" textAnchor="middle">10-12 ans</text>

                {/* Zones Délimitées */}
                <rect x="80" y="40" width="130" height="260" fill="#ef4444" fillOpacity="0.08" />
                <text x="145" y="60" fill="#fca5a5" fontSize="10" textAnchor="middle" fontWeight="bold">PRIMO-INFECTION</text>

                <rect x="210" y="40" width="310" height="260" fill="#3b82f6" fillOpacity="0.05" />
                <text x="365" y="60" fill="#93c5fd" fontSize="10" textAnchor="middle" fontWeight="bold">PHASE ASYMPTOMATIQUE (Latence)</text>

                <rect x="520" y="40" width="180" height="260" fill="#dc2626" fillOpacity="0.12" />
                <text x="610" y="60" fill="#f87171" fontSize="10" textAnchor="middle" fontWeight="bold">SIDA DÉCLARÉ</text>

                {/* Seuil Critique de 200 LT4 / mm3 */}
                <line x1="80" y1="240" x2="700" y2="240" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4,4" />
                <text x="705" y="244" fill="#fbbf24" fontSize="9" fontWeight="bold">Seuil 200 LT4/mm³</text>

                {/* Courbe 1 : Taux de LT4 (Bleu) */}
                <path
                  d="M 80 80 Q 140 160 210 120 L 520 240 Q 600 270 660 290"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3"
                />

                {/* Courbe 2 : Charge Virale (Rouge) */}
                <path
                  d="M 80 290 Q 140 70 210 260 L 520 250 Q 600 120 660 70"
                  fill="none"
                  stroke="#ef4444"
                  strokeWidth="3"
                />

                {/* Courbe 3 : Taux d'Anticorps Anti-VIH (Vert) */}
                <path
                  d="M 80 300 L 140 295 Q 170 140 210 130 L 520 140 Q 600 170 660 250"
                  fill="none"
                  stroke="#34d399"
                  strokeWidth="2.5"
                  strokeDasharray="4,2"
                />

                {/* Légende en bas */}
                <g transform="translate(100, 345)">
                  <line x1="0" y1="5" x2="30" y2="5" stroke="#38bdf8" strokeWidth="3" />
                  <text x="35" y="9" fill="#7dd3fc" fontSize="10">Taux de Lymphocytes T4 (mm³)</text>

                  <line x1="240" y1="5" x2="270" y2="5" stroke="#ef4444" strokeWidth="3" />
                  <text x="275" y="9" fill="#fca5a5" fontSize="10">Charge Virale (ARN/mL)</text>

                  <line x1="450" y1="5" x2="480" y2="5" stroke="#34d399" strokeWidth="2.5" strokeDasharray="4,2" />
                  <text x="485" y="9" fill="#6ee7b7" fontSize="10">Titre d'Anticorps Anti-VIH (Séropositivité)</text>
                </g>
              </svg>
            </div>
          </div>
        )}

        {/* VUE 5 : TABLEAU COMPARATIF DES DYSFONCTIONNEMENTS */}
        {viewMode === 'comparatif_maladies' && (
          <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-xs">
            <table className="w-full text-xs sm:text-sm text-left text-gray-700">
              <thead className="bg-amber-950 text-white uppercase text-[11px] font-bold">
                <tr>
                  <th className="p-3">Type d'Anomalie</th>
                  <th className="p-3">Nature de l'Ag Déclencheur</th>
                  <th className="p-3">Acteurs Immunitaires Majeurs</th>
                  <th className="p-3">Conséquences Physiopathologiques</th>
                  <th className="p-3">Exemple Clinique Bac S2</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr>
                  <td className="p-3 font-semibold bg-gray-50 text-amber-950">Hypersensibilité Immédiate (Allergie I)</td>
                  <td className="p-3">Allergène exogène inoffensif (pollen, venin)</td>
                  <td className="p-3">IgE, Mastocytes, Histamine</td>
                  <td className="p-3">Vasodilatation, bronchoconstriction, œdème</td>
                  <td className="p-3 font-medium text-amber-900">Asthme, Urticaire, Choc Anaphylactique</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold bg-gray-50 text-rose-950">Maladie Auto-Immune</td>
                  <td className="p-3">Antigène normal du Soi propre (rupture tolérance)</td>
                  <td className="p-3">Auto-anticorps, LTC autoréactifs</td>
                  <td className="p-3">Destruction progressive des tissus sains de l'hôte</td>
                  <td className="p-3 font-medium text-rose-900">Diabète type 1, Myasthénie, Lupus</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold bg-gray-50 text-red-950">Immunodéficience Acquise (VIH)</td>
                  <td className="p-3">Rétrovirus VIH ciblant le récepteur CD4</td>
                  <td className="p-3">gp120, Transcriptase inverse, Effondrement LT4</td>
                  <td className="p-3">Paralysie globale de l'immunité adaptative</td>
                  <td className="p-3 font-medium text-red-900">SIDA & Infections Opportunistes</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

