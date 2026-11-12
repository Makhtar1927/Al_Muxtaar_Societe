'use client';

import React, { useState } from 'react';
import { RotateCcw } from 'lucide-react';

type StageType = 'structure_ig' | 'selection_clonale' | 'proliferation' | 'differentiation' | 'complexe_immun' | 'ouchterlony';

export default function B3ImmuniteHumoraleInteractiveLab() {
  const [stage, setStage] = useState<StageType>('structure_ig');

  const getStageInfo = (st: StageType) => {
    switch (st) {
      case 'structure_ig':
        return {
          titre: '1. Architecture Moléculaire d\'une Immunoglobuline G (IgG)',
          statut: 'Structure tétramérique en Y',
          description: 'L\'anticorps est composé de 2 chaînes lourdes H (bleues) et de 2 chaînes légères L (vertes) reliées par des ponts disulfures. Les extrémités variables (VH et VL) définissent les 2 paratopes bivalents complémentaires des épitopes antigéniques. Le fragment constant Fc assure la fixation au complément et aux récepteurs des macrophages.',
          boxColor: 'border-blue-200 bg-blue-50/50 text-blue-950',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
        };
      case 'selection_clonale':
        return {
          titre: '2. Sélection Clonale du Lymphocyte B Spécifique',
          statut: 'Reconnaissance stéréospécifique',
          description: 'Parmi des millions de clones de lymphocytes B préexistants dans l\'organisme, seul le clone possédant le récepteur membranaire BCR exactement complémentaire de l\'épitope antigénique est sélectionné. C\'est le principe fondamental de la spécificité immunitaire.',
          boxColor: 'border-cyan-200 bg-cyan-50/50 text-cyan-950',
          badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
        };
      case 'proliferation':
        return {
          titre: '3. Prolifération Clonale (Mitoses intenses)',
          statut: 'Amplification du clone',
          description: 'Sous l\'action des interleukines (IL-4, IL-5) sécrétées par les Lymphocytes T4 auxiliaires activés, le lymphocyte B sélectionné entre en division cellulaire rapide dans le ganglion lymphatique, formant une armée de cellules filles génétiquement identiques.',
          boxColor: 'border-indigo-200 bg-indigo-50/50 text-indigo-950',
          badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        };
      case 'differentiation':
        return {
          titre: '4. Différenciation : Plasmocytes & LB Mémoires',
          statut: 'Spécialisation cellulaire',
          description: 'Les cellules du clone se différencient : la majorité devient des plasmocytes volumineux hyper-développés en réticulum endoplasmique (sécrétion de milliers d\'anticorps libres par seconde) ; les autres deviennent des lymphocytes B mémoires à longue durée de vie.',
          boxColor: 'border-purple-200 bg-purple-50/50 text-purple-950',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
        };
      case 'complexe_immun':
        return {
          titre: '5. Formation du Complexe Immun en Réseau',
          statut: 'Neutralisation & Agglutination',
          description: 'Grâce à la bivalence des anticorps (2 paratopes) et à la polyvalence des antigènes (plusieurs épitopes), les anticorps réticulent les bactéries et toxines en un vaste réseau insoluble : le complexe immun neutralisant. L\'agent infectieux est immobilisé et marqué pour la phagocytose.',
          boxColor: 'border-rose-200 bg-rose-50/50 text-rose-950',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
        };
      case 'ouchterlony':
      default:
        return {
          titre: '6. Test Expérimental d\'Immunodiffusion d\'Ouchterlony',
          statut: 'Analyse d\'identité antigénique',
          description: 'Anticorps (puits central) et antigènes (puits périphériques) diffusent en milieu gélifié. À la zone d\'équivalence de concentration, la formation de complexes immuns insolubles forme un arc de précipitation blanc opaque. La continuité des arcs démontre l\'identité parfaite des épitopes.',
          boxColor: 'border-emerald-200 bg-emerald-50/50 text-emerald-950',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
        };
    }
  };

  const current = getStageInfo(stage);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 space-y-5 shadow-xs text-slate-800">
      {/* En-tête du banc d'essai */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-700 block">
            Laboratoire Virtuel d'Immunologie Humorale
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-0.5">
            Banc Moléculaire : Anticorps, Sélection Clonale & Complexes Immuns
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Animation interactive : conformation en Y de l'IgG, paratope-épitope, différenciation en plasmocyte et réaction d'Ouchterlony.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setStage('structure_ig')}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          Réinitialiser au début
        </button>
      </div>

      {/* PLANCHE VECTORIELLE SCIENTIFIQUE DYNAMIQUE */}
      <div className="border border-slate-200 rounded-lg p-3 sm:p-4 bg-slate-50/40 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-600 border-b border-slate-200 pb-2">
          <span className="font-bold uppercase tracking-wider text-slate-700">
            Modélisation Structurale & Cinétique Immunologique
          </span>
          <span className={`font-semibold text-[11px] px-2 py-0.5 rounded border ${current.badgeColor}`}>
            {current.statut}
          </span>
        </div>

        <svg viewBox="0 0 880 440" className="w-full h-auto max-h-[420px] bg-white rounded border border-slate-200 select-none">
          {/* ========================================================== */}
          {/* VUE 1 : STRUCTURE MOLÉCULAIRE D'UNE IMMUNOGLOBULINE EN Y */}
          {/* ========================================================== */}
          {stage === 'structure_ig' && (
            <g id="view_structure_ig" transform="translate(140, 20)">
              {/* LIGNE DIRECTRICE ET DIMENSIONS */}
              <text x="300" y="25" fill="#0f172a" fontSize="13" fontWeight="bold" textAnchor="middle">
                Structure Moléculaire d'une Immunoglobuline G (Monomère en Y)
              </text>

              {/* TIGE CENTRALE Fc (Chaînes lourdes constantes) */}
              {/* Chaîne lourde gauche CH2-CH3 */}
              <rect x="270" y="190" width="22" height="150" rx="5" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.5" />
              {/* Chaîne lourde droite CH2-CH3 */}
              <rect x="308" y="190" width="22" height="150" rx="5" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.5" />

              {/* Ponts disulfures de la région charnière */}
              <line x1="292" y1="210" x2="308" y2="210" stroke="#f59e0b" strokeWidth="2.5" />
              <line x1="292" y1="225" x2="308" y2="225" stroke="#f59e0b" strokeWidth="2.5" />
              <text x="350" y="215" fill="#b45309" fontSize="9" fontWeight="bold">Ponts disulfures (-S-S-)</text>
              <line x1="345" y1="212" x2="308" y2="215" stroke="#b45309" strokeWidth="1" strokeDasharray="2 2" />

              {/* BRANCHE GAUCHE DU FAB (Inclinée à -40°) */}
              <g transform="translate(280, 190) rotate(-40)">
                {/* Domaine lourd CH1 (constant) */}
                <rect x="-24" y="-80" width="22" height="75" rx="5" fill="#60a5fa" stroke="#2563eb" strokeWidth="1.5" />
                {/* Domaine lourd VH (variable) */}
                <rect x="-24" y="-155" width="22" height="70" rx="5" fill="#1e40af" stroke="#172554" strokeWidth="1.5" />

                {/* Chaîne légère CL (constante) */}
                <rect x="-52" y="-80" width="20" height="75" rx="5" fill="#86efac" stroke="#16a34a" strokeWidth="1.5" />
                {/* Chaîne légère VL (variable) */}
                <rect x="-52" y="-155" width="20" height="70" rx="5" fill="#15803d" stroke="#14532d" strokeWidth="1.5" />

                {/* Pont disulfure intercaténaire H-L */}
                <line x1="-32" y1="-45" x2="-24" y2="-45" stroke="#f59e0b" strokeWidth="2" />

                {/* Paratope 1 (Cavité de liaison spécifique au sommet) */}
                <path d="M -52 -155 Q -38 -140 -2 -155" fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
                <text x="-27" y="-165" fill="#b91c1c" fontSize="9" fontWeight="bold" textAnchor="middle">Paratope 1</text>
              </g>

              {/* BRANCHE DROITE DU FAB (Inclinée à +40°) */}
              <g transform="translate(320, 190) rotate(40)">
                {/* Domaine lourd CH1 (constant) */}
                <rect x="2" y="-80" width="22" height="75" rx="5" fill="#60a5fa" stroke="#2563eb" strokeWidth="1.5" />
                {/* Domaine lourd VH (variable) */}
                <rect x="2" y="-155" width="22" height="70" rx="5" fill="#1e40af" stroke="#172554" strokeWidth="1.5" />

                {/* Chaîne légère CL (constante) */}
                <rect x="32" y="-80" width="20" height="75" rx="5" fill="#86efac" stroke="#16a34a" strokeWidth="1.5" />
                {/* Chaîne légère VL (variable) */}
                <rect x="32" y="-155" width="20" height="70" rx="5" fill="#15803d" stroke="#14532d" strokeWidth="1.5" />

                {/* Pont disulfure intercaténaire H-L */}
                <line x1="24" y1="-45" x2="32" y2="-45" stroke="#f59e0b" strokeWidth="2" />

                {/* Paratope 2 */}
                <path d="M 2 -155 Q 16 -140 52 -155" fill="none" stroke="#dc2626" strokeWidth="3" strokeLinecap="round" />
                <text x="27" y="-165" fill="#b91c1c" fontSize="9" fontWeight="bold" textAnchor="middle">Paratope 2</text>
              </g>

              {/* LÉGENDES ANATOMIQUES BIOCHIMIQUES */}
              {/* Accolade / zone Fab */}
              <text x="500" y="90" fill="#1e40af" fontSize="10.5" fontWeight="bold">2 Fragments Fab</text>
              <text x="500" y="103" fill="#64748b" fontSize="8.5">(Fixation spécifique de l'Ag : VH + VL)</text>

              {/* Accolade / zone Fc */}
              <text x="420" y="270" fill="#1d4ed8" fontSize="10.5" fontWeight="bold">1 Fragment Fc (Cristallisable)</text>
              <text x="420" y="283" fill="#64748b" fontSize="8.5">• Fixation du Complément</text>
              <text x="420" y="295" fill="#64748b" fontSize="8.5">• Liaison aux récepteurs des macrophages</text>
              <text x="420" y="307" fill="#64748b" fontSize="8.5">• Passage transplacentaire (IgG)</text>

              {/* Chaînes légères vs lourdes */}
              <text x="60" y="90" fill="#15803d" fontSize="10" fontWeight="bold">Chaîne Légère L (≈ 25 kDa)</text>
              <text x="60" y="102" fill="#64748b" fontSize="8.5">Domaines VL + CL</text>

              <text x="60" y="250" fill="#1e40af" fontSize="10" fontWeight="bold">Chaîne Lourde H (≈ 50 kDa)</text>
              <text x="60" y="262" fill="#64748b" fontSize="8.5">Domaines VH + CH1 + CH2 + CH3</text>
            </g>
          )}

          {/* ========================================================== */}
          {/* VUE 2 : SÉLECTION CLONALE PARMI 3 CLONES DE LYMPHOCYTES B */}
          {/* ========================================================== */}
          {stage === 'selection_clonale' && (
            <g id="view_selection_clonale" transform="translate(60, 40)">
              <text x="380" y="15" fill="#0f172a" fontSize="12.5" fontWeight="bold" textAnchor="middle">
                Sélection du Clone de Lymphocyte B Complémentaire de l'Épitope
              </text>

              {/* Antigène étranger avec épitope triangulaire spécifique rouge */}
              <g transform="translate(380, 80)">
                <ellipse cx="0" cy="0" rx="35" ry="22" fill="#fecdd3" stroke="#e11d48" strokeWidth="2" />
                <polygon points="-8,-22 0,-34 8,-22" fill="#dc2626" />
                <text x="0" y="4" fill="#9f1239" fontSize="9.5" fontWeight="bold" textAnchor="middle">Antigène</text>
                <text x="0" y="-38" fill="#b91c1c" fontSize="8.5" fontWeight="bold" textAnchor="middle">Épitope Triangulaire</text>
              </g>

              {/* Clone 1 : LB avec BCR circulaire (Non complémentaire) */}
              <g transform="translate(150, 260)">
                <circle cx="0" cy="0" r="45" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="28" fill="#cbd5e1" />
                {/* BCR rond */}
                <path d="M 0 -45 L 0 -62 M -8 -62 Q 0 -54 8 -62" stroke="#64748b" strokeWidth="2" fill="none" />
                <text x="0" y="65" fill="#64748b" fontSize="10" fontWeight="bold" textAnchor="middle">Clone B n°1</text>
                <text x="0" y="77" fill="#ef4444" fontSize="8.5" textAnchor="middle">Non sélectionné</text>
              </g>

              {/* Clone 2 : LB avec BCR triangulaire (COMPLÉMENTARITÉ PARFAITE) */}
              <g transform="translate(380, 260)">
                <circle cx="0" cy="0" r="48" fill="#dbeafe" stroke="#2563eb" strokeWidth="2.5" />
                <circle cx="0" cy="0" r="30" fill="#3b82f6" />
                {/* BCR triangle */}
                <path d="M 0 -48 L 0 -65 M -9 -65 L 0 -53 L 9 -65" stroke="#1d4ed8" strokeWidth="2.5" fill="none" />
                <text x="0" y="68" fill="#1d4ed8" fontSize="11" fontWeight="bold" textAnchor="middle">Clone B n°2 (Spécifique)</text>
                <text x="0" y="81" fill="#16a34a" fontSize="9" fontWeight="bold" textAnchor="middle">SÉLECTION CLONALE RÉUSSIE !</text>
                {/* Flèche de reconnaissance vers l'Ag */}
                <line x1="0" y1="-70" x2="0" y2="-130" stroke="#2563eb" strokeWidth="2" strokeDasharray="3 3" />
              </g>

              {/* Clone 3 : LB avec BCR carré (Non complémentaire) */}
              <g transform="translate(610, 260)">
                <circle cx="0" cy="0" r="45" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1.5" />
                <circle cx="0" cy="0" r="28" fill="#cbd5e1" />
                {/* BCR carré */}
                <path d="M 0 -45 L 0 -62 M -7 -62 L -7 -54 L 7 -54 L 7 -62" stroke="#64748b" strokeWidth="2" fill="none" />
                <text x="0" y="65" fill="#64748b" fontSize="10" fontWeight="bold" textAnchor="middle">Clone B n°3</text>
                <text x="0" y="77" fill="#ef4444" fontSize="8.5" textAnchor="middle">Non sélectionné</text>
              </g>
            </g>
          )}

          {/* ========================================================== */}
          {/* VUE 3 : PROLIFÉRATION CLONALE (MITOSES STIMULÉES PAR LT4) */}
          {/* ========================================================== */}
          {stage === 'proliferation' && (
            <g id="view_proliferation" transform="translate(80, 30)">
              <text x="360" y="20" fill="#0f172a" fontSize="12.5" fontWeight="bold" textAnchor="middle">
                Amplification Clonale par Mitoses sous l'effet des Interleukines des LT4
              </text>

              {/* Lymphocyte T4 auxiliaire sécrétant les cytokines */}
              <g transform="translate(100, 150)">
                <circle cx="0" cy="0" r="38" fill="#fef08a" stroke="#ca8a04" strokeWidth="2" />
                <circle cx="0" cy="0" r="24" fill="#eab308" />
                <text x="0" y="4" fill="#713f12" fontSize="10" fontWeight="bold" textAnchor="middle">LT4 Auxiliaire</text>
                <text x="0" y="55" fill="#854d0e" fontSize="9" textAnchor="middle">Sécrétion IL-4 / IL-5</text>
                
                {/* Molécules d'interleukines diffusantes */}
                <g fill="#eab308">
                  <circle cx="48" cy="-5" r="3" />
                  <circle cx="62" cy="10" r="3" />
                  <circle cx="55" cy="25" r="3" />
                  <text x="90" y="10" fill="#a16207" fontSize="9" fontWeight="bold">Interleukines</text>
                </g>
              </g>

              {/* Cascade mitotique du LB sélectionné */}
              <g transform="translate(380, 150)">
                {/* 1 cellule mère */}
                <circle cx="-60" cy="0" r="28" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.8" />
                <text x="-60" y="3" fill="#1e40af" fontSize="8" fontWeight="bold" textAnchor="middle">LB Activé</text>

                <line x1="-25" y1="0" x2="25" y2="0" stroke="#2563eb" strokeWidth="2" markerEnd="url(#arrowBlue)" />

                {/* 4 cellules filles issues de mitoses */}
                <circle cx="70" cy="-60" r="24" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
                <circle cx="70" cy="-15" r="24" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
                <circle cx="70" cy="30" r="24" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
                <circle cx="70" cy="75" r="24" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />

                <text x="140" y="10" fill="#1d4ed8" fontSize="11" fontWeight="bold">Clone B Amplifié</text>
                <text x="140" y="24" fill="#64748b" fontSize="8.5">(Mitoses successives dans le ganglion)</text>
              </g>
            </g>
          )}

          {/* ========================================================== */}
          {/* VUE 4 : DIFFÉRENCIATION (PLASMOCYTES ET LYMPHOCYTES B MÉMOIRES) */}
          {/* ========================================================== */}
          {stage === 'differentiation' && (
            <g id="view_differentiation" transform="translate(60, 30)">
              <text x="380" y="20" fill="#0f172a" fontSize="12.5" fontWeight="bold" textAnchor="middle">
                Différenciation Clonale en Plasmocytes Sécréteurs et Lymphocytes B Mémoires
              </text>

              {/* Branche 1 : Plasmocyte géant usine à protéines */}
              <g transform="translate(240, 190)">
                <ellipse cx="0" cy="0" rx="90" ry="70" fill="#ede9fe" stroke="#7c3aed" strokeWidth="2.5" />
                {/* Noyau excentré à chromatine en roue de charrette */}
                <circle cx="-42" cy="-15" r="26" fill="#6d28d9" />
                {/* Réticulum endoplasmique granulaire hyper-développé (replis membraneux) */}
                <path d="M -5 -35 Q 30 -30 20 0 Q 35 25 -5 35" fill="none" stroke="#8b5cf6" strokeWidth="3" />
                <path d="M 10 -25 Q 45 -18 35 10 Q 50 25 10 30" fill="none" stroke="#8b5cf6" strokeWidth="2.5" />
                <path d="M 25 -15 Q 58 -5 50 15" fill="none" stroke="#8b5cf6" strokeWidth="2" />
                <text x="0" y="95" fill="#6d28d9" fontSize="11.5" fontWeight="bold" textAnchor="middle">PLASMOCYTE (Cellule Effectrice)</text>
                <text x="0" y="108" fill="#64748b" fontSize="8.5" textAnchor="middle">Rég volumineux • Sécrétion massive d'anticorps</text>

                {/* Anticorps libres éjectés en abondance */}
                <g stroke="#2563eb" strokeWidth="2" fill="none">
                  <path d="M 95 -40 L 105 -40 M 105 -40 L 112 -46 M 105 -40 L 112 -34" />
                  <path d="M 110 5 L 120 5 M 120 5 L 127 -1 M 120 5 L 127 11" />
                  <path d="M 95 45 L 105 45 M 105 45 L 112 39 M 105 45 L 112 51" />
                </g>
                <text x="140" y="8" fill="#1d4ed8" fontSize="9" fontWeight="bold">Anticorps circulants libérés</text>
              </g>

              {/* Branche 2 : Lymphocyte B Mémoire */}
              <g transform="translate(620, 190)">
                <circle cx="0" cy="0" r="48" fill="#dbeafe" stroke="#2563eb" strokeWidth="2" />
                <circle cx="0" cy="0" r="32" fill="#3b82f6" />
                <path d="M 0 -48 L 0 -62 M -8 -62 L 0 -52 L 8 -62" stroke="#1d4ed8" strokeWidth="2" fill="none" />
                <text x="0" y="70" fill="#1d4ed8" fontSize="11" fontWeight="bold" textAnchor="middle">Lymphocyte B Mémoire</text>
                <text x="0" y="83" fill="#64748b" fontSize="8.5" textAnchor="middle">Longue durée de vie • Réponse secondaire</text>
              </g>
            </g>
          )}

          {/* ========================================================== */}
          {/* VUE 5 : FORMATION DU COMPLEXE IMMUN ET AGGLUTINATION */}
          {/* ========================================================== */}
          {stage === 'complexe_immun' && (
            <g id="view_complexe_immun" transform="translate(80, 30)">
              <text x="360" y="20" fill="#0f172a" fontSize="12.5" fontWeight="bold" textAnchor="middle">
                Formation du Complexe Immun en Réseau (Agglutination & Neutralisation)
              </text>

              {/* Réseau d'anticorps bivalents et de bactéries polyvalentes */}
              <g transform="translate(300, 180)">
                {/* Bactérie centrale 1 */}
                <ellipse cx="-70" cy="-30" rx="30" ry="18" fill="#fecdd3" stroke="#e11d48" strokeWidth="1.8" />
                <polygon points="-75,-52 -70,-60 -65,-52" fill="#dc2626" />
                <polygon points="-40,-30 -32,-35 -32,-25" fill="#dc2626" />

                {/* Bactérie centrale 2 */}
                <ellipse cx="70" cy="-30" rx="30" ry="18" fill="#fecdd3" stroke="#e11d48" strokeWidth="1.8" />
                <polygon points="40,-30 32,-35 32,-25" fill="#dc2626" />
                <polygon points="75,-52 80,-60 85,-52" fill="#dc2626" />

                {/* Anticorps pontant les deux bactéries par ses 2 paratopes */}
                <g transform="translate(0, -30)" stroke="#1d4ed8" strokeWidth="2.5" fill="none">
                  {/* Tige Fc vers le bas */}
                  <line x1="0" y1="0" x2="0" y2="40" stroke="#3b82f6" strokeWidth="3" />
                  {/* Bras Fab gauche fixé sur la bactérie 1 */}
                  <line x1="0" y1="0" x2="-32" y2="-5" />
                  {/* Bras Fab droit fixé sur la bactérie 2 */}
                  <line x1="0" y1="0" x2="32" y2="-5" />
                </g>

                {/* Macrophage arrivant pour la phagocytose via récepteur Fc */}
                <g transform="translate(0, 110)">
                  <ellipse cx="0" cy="0" rx="75" ry="35" fill="#e0f2fe" stroke="#0284c7" strokeWidth="1.8" />
                  {/* Récepteur Fc en forme de coupe saisissant la tige de l'anticorps */}
                  <path d="M -8 -35 L -8 -45 L 8 -45 L 8 -35" stroke="#0369a1" strokeWidth="2.5" fill="none" />
                  <text x="0" y="5" fill="#0369a1" fontSize="10" fontWeight="bold" textAnchor="middle">
                    Macrophage (Récepteur Fc)
                  </text>
                  <text x="0" y="20" fill="#0284c7" fontSize="8.5" textAnchor="middle">
                    Opsonisation $\to$ Phagocytose accélérée
                  </text>
                </g>

                <text x="0" y="-80" fill="#9f1239" fontSize="11" fontWeight="bold" textAnchor="middle">
                  Complexe Immun insoluble réticulé
                </text>
              </g>
            </g>
          )}

          {/* ========================================================== */}
          {/* VUE 6 : TEST D'OUCHTERLONY SUR GEL D'AGAROSE */}
          {/* ========================================================== */}
          {stage === 'ouchterlony' && (
            <g id="view_ouchterlony" transform="translate(100, 20)">
              <text x="340" y="25" fill="#0f172a" fontSize="13" fontWeight="bold" textAnchor="middle">
                Test d'Immunodiffusion d'Ouchterlony (Précipitation Antigène-Anticorps)
              </text>

              {/* Boîte de Petri en gel d'agarose */}
              <circle cx="340" cy="200" r="140" fill="#f8fafc" stroke="#94a3b8" strokeWidth="2" strokeDasharray="5 3" />
              <text x="340" y="365" fill="#64748b" fontSize="9" textAnchor="middle">Gel d'agarose neutre</text>

              {/* Puits central : Sérum contenant les anticorps anti-BSA */}
              <circle cx="340" cy="200" r="22" fill="#dbeafe" stroke="#1d4ed8" strokeWidth="2" />
              <text x="340" y="204" fill="#1e40af" fontSize="9" fontWeight="bold" textAnchor="middle">Ac Anti-X</text>

              {/* Puits 1 (Haut gauche) : Antigène X */}
              <circle cx="260" cy="110" r="18" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.8" />
              <text x="260" y="114" fill="#991b1b" fontSize="8.5" fontWeight="bold" textAnchor="middle">Ag X</text>

              {/* Puits 2 (Haut droite) : Antigène X (Identique) */}
              <circle cx="420" cy="110" r="18" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.8" />
              <text x="420" y="114" fill="#991b1b" fontSize="8.5" fontWeight="bold" textAnchor="middle">Ag X</text>

              {/* Puits 3 (Bas) : Antigène Y (Différent) */}
              <circle cx="340" cy="290" r="18" fill="#f1f5f9" stroke="#64748b" strokeWidth="1.8" />
              <text x="340" y="294" fill="#475569" fontSize="8.5" fontWeight="bold" textAnchor="middle">Ag Y</text>

              {/* Arc de précipitation continu (Identité totale entre Puits 1 et 2) */}
              <path
                d="M 285 145 Q 340 148 395 145"
                fill="none"
                stroke="#0f172a"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <text x="340" y="138" fill="#0f172a" fontSize="9" fontWeight="bold" textAnchor="middle">
                Arc de précipitation continu (Identité totale)
              </text>
              <text x="340" y="260" fill="#dc2626" fontSize="8.5" textAnchor="middle">
                Absence de précipitation avec Ag Y (Non spécifique)
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Note d'analyse physiologique textuelle */}
      <div className={`p-4 rounded-xl border text-xs leading-relaxed ${current.boxColor}`}>
        <span className="font-bold uppercase tracking-wider block mb-1">
          {current.titre}
        </span>
        <p>{current.description}</p>
      </div>

      {/* Barre de navigation chronologique */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
          Parcours Pédagogique Interactif
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          {[
            { id: 'structure_ig', label: '1. Structure Ig' },
            { id: 'selection_clonale', label: '2. Sélection B' },
            { id: 'proliferation', label: '3. Mitoses (LT4)' },
            { id: 'differentiation', label: '4. Plasmocytes' },
            { id: 'complexe_immun', label: '5. Complexe Immun' },
            { id: 'ouchterlony', label: '6. Test Ouchterlony' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setStage(item.id as StageType)}
              className={`p-2.5 rounded-lg border text-center text-xs font-semibold transition-all ${
                stage === item.id
                  ? 'border-slate-800 bg-slate-900 text-white shadow-xs'
                  : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

