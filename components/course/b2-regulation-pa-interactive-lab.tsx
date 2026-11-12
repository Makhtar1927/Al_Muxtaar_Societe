'use client';

import React, { useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';

type SimulationState = 'normotension' | 'hypertension' | 'hypotension' | 'section_hering' | 'stimulation_hering' | 'ligature_carotides';

export default function B2RegulationPaInteractiveLab() {
  const [state, setState] = useState<SimulationState>('normotension');
  const [pulse, setPulse] = useState<boolean>(false);

  const getBioValues = (s: SimulationState) => {
    switch (s) {
      case 'hypertension':
        return {
          paSys: 165,
          paDia: 105,
          fc: 52,
          heringFreq: '95 PA/s (Très élevée)',
          vagueAct: 'Stimulation intense (+++)',
          sympAct: 'Inhibition marquée (+)',
          arterioleState: 'Vasodilatation réactionnelle',
          vaisseauRadius: 18,
          statut: 'Hypertension provoquée',
          description: 'L\'augmentation de pression étire le sinus carotidien et l\'aorte. La décharge afférente sur Hering et Cyon stimule le centre cardiomodérateur bulbaire (nerf X) et l\'interneurone inhibiteur, qui freine le centre vasomoteur : bradycardie réflexe et vasodilatation pour abaisser la PA.',
          boxColor: 'border-rose-200 bg-rose-50/50 text-rose-950',
          badgeColor: 'bg-rose-100 text-rose-800 border-rose-200',
          paColor: 'text-rose-600',
          fcColor: 'text-blue-600'
        };
      case 'hypotension':
        return {
          paSys: 85,
          paDia: 55,
          fc: 112,
          heringFreq: '12 PA/s (Très faible)',
          vagueAct: 'Frein vagal levé (+)',
          sympAct: 'Décharge sympathique (+++++)',
          arterioleState: 'Vasoconstriction intense',
          vaisseauRadius: 7,
          statut: 'Hypotension aiguë',
          description: 'La baisse de pression réduit l\'étirement des barorécepteurs. Le silence sur Hering lève l\'inhibition bulbaire sur le centre vasomoteur et médullaire : activation sympathique massive vers le cœur, l\'artériole et la médullosurrénale (adrénaline).',
          boxColor: 'border-blue-200 bg-blue-50/50 text-blue-950',
          badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
          paColor: 'text-blue-600',
          fcColor: 'text-rose-600'
        };
      case 'section_hering':
        return {
          paSys: 185,
          paDia: 110,
          fc: 125,
          heringFreq: '0 PA/s (Voie coupée)',
          vagueAct: 'Inhibé',
          sympAct: 'Libéré en continu (+++++)',
          arterioleState: 'Vasoconstriction maximale',
          vaisseauRadius: 6.5,
          statut: 'Section bilatérale de Hering',
          description: 'La coupure des nerfs de Hering supprime l\'influx freinateur. L\'interneurone inhibiteur est désactivé : les centres vasomoteur et cardioaccélérateur déchargent sans frein, provoquant une hypertension artérielle permanente et une tachycardie sévère.',
          boxColor: 'border-red-200 bg-red-50/50 text-red-950',
          badgeColor: 'bg-red-100 text-red-800 border-red-200',
          paColor: 'text-red-600',
          fcColor: 'text-red-600'
        };
      case 'stimulation_hering':
        return {
          paSys: 75,
          paDia: 45,
          fc: 44,
          heringFreq: '130 PA/s (Artificielle)',
          vagueAct: 'Maximale continue (+++++)',
          sympAct: 'Inhibé totalement (0)',
          arterioleState: 'Vasodilatation extrême',
          vaisseauRadius: 20,
          statut: 'Stimulation bout central Hering',
          description: 'La stimulation électrique du bout central simule une hypertension extrême au bulbe : activation réflexe maximale du nerf vague X (bradycardie intense) et inhibition totale du sympathique.',
          boxColor: 'border-cyan-200 bg-cyan-50/50 text-cyan-950',
          badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
          paColor: 'text-cyan-700',
          fcColor: 'text-blue-600'
        };
      case 'ligature_carotides':
        return {
          paSys: 175,
          paDia: 105,
          fc: 118,
          heringFreq: '0 PA/s (Ischémie sinusale)',
          vagueAct: 'Inhibé',
          sympAct: 'Stimulé (+++++)',
          arterioleState: 'Vasoconstriction réflexe',
          vaisseauRadius: 7.5,
          statut: 'Ligature sous-sinusale',
          description: 'La ligature en amont des sinus carotidiens fait chuter la pression localement dans le sinus. Les barorécepteurs cessent d\'émettre, simulant une fausse hypotension générale au bulbe : activation sympathique réflexe provoquant une hypertension générale mesurée à l\'aorte.',
          boxColor: 'border-purple-200 bg-purple-50/50 text-purple-950',
          badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
          paColor: 'text-purple-700',
          fcColor: 'text-rose-600'
        };
      case 'normotension':
      default:
        return {
          paSys: 120,
          paDia: 80,
          fc: 72,
          heringFreq: '40 PA/s (Tonique basal)',
          vagueAct: 'Tonus modérateur basal (+++)',
          sympAct: 'Tonus vasomoteur basal (++)',
          arterioleState: 'Calibre physiologique moyen',
          vaisseauRadius: 13,
          statut: 'Normotension homéostasique',
          description: 'État de repos normal (120/80 mmHg). Décharge tonique continue sur les nerfs de Hering et Cyon, maintenant l\'équilibre entre le frein vagal permanent et la tonicité vasomotrice des artérioles.',
          boxColor: 'border-emerald-200 bg-emerald-50/50 text-emerald-950',
          badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          paColor: 'text-emerald-700',
          fcColor: 'text-emerald-700'
        };
    }
  };

  const bio = getBioValues(state);

  useEffect(() => {
    const intervalMs = Math.max(380, Math.round(60000 / bio.fc));
    const timer = setInterval(() => {
      setPulse((p) => !p);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [bio.fc]);

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-6 space-y-5 shadow-xs text-slate-800">
      {/* En-tête du banc d'essai */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200 pb-3">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-700 block">
            Planche Officielle du Baccalauréat Sénégalais
          </span>
          <h3 className="text-xl font-bold text-slate-900 mt-0.5">
            Schéma Fonctionnel de la Régulation Réflexe de la Pression Artérielle
          </h3>
          <p className="text-xs text-slate-600 mt-0.5">
            Reproduction fidèle du schéma classique de référence (Bulbe, Moelle, Chaîne ganglionnaire, Cœur, Artériole et Médullosurrénale).
          </p>
        </div>

        <button
          type="button"
          onClick={() => setState('normotension')}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          Réinitialiser (Normotension)
        </button>
      </div>

      {/* Indicateurs cliniques */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="border border-rose-200/80 rounded-lg p-3 bg-rose-50/30">
          <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wide block">
            Pression Artérielle
          </span>
          <div className="mt-1 flex items-baseline gap-1">
            <span className={`text-2xl font-bold font-mono ${bio.paColor}`}>
              {bio.paSys}/{bio.paDia}
            </span>
            <span className="text-xs text-slate-500">mmHg</span>
          </div>
          <span className="text-[11px] text-slate-600 mt-0.5 block font-medium">
            {bio.paSys > 140 ? 'Hypertension' : bio.paSys < 90 ? 'Hypotension' : 'Normotension (12/8)'}
          </span>
        </div>

        <div className="border border-blue-200/80 rounded-lg p-3 bg-blue-50/30">
          <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wide block">
            Fréquence Cardiaque
          </span>
          <div className="mt-1 flex items-baseline gap-1">
            <span className={`text-2xl font-bold font-mono ${bio.fcColor}`}>
              {bio.fc}
            </span>
            <span className="text-xs text-slate-500">bpm</span>
          </div>
          <span className="text-[11px] text-slate-600 mt-0.5 block font-medium">
            {bio.fc > 100 ? 'Tachycardie' : bio.fc < 60 ? 'Bradycardie' : 'Rythme sinusal'}
          </span>
        </div>

        <div className="border border-emerald-200/80 rounded-lg p-3 bg-emerald-50/30">
          <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wide block">
            Nerf Hering (Afférence)
          </span>
          <div className="mt-1 text-xs sm:text-sm font-bold text-emerald-950 font-mono">
            {bio.heringFreq}
          </div>
          <span className="text-[11px] text-slate-600 mt-0.5 block">
            Potentiels / seconde
          </span>
        </div>

        <div className="border border-purple-200/80 rounded-lg p-3 bg-purple-50/30">
          <span className="text-[11px] font-bold text-purple-800 uppercase tracking-wide block">
            Tonus Vasomoteur (RPT)
          </span>
          <div className="mt-1 text-xs font-bold text-purple-900 truncate">
            {bio.arterioleState}
          </div>
          <span className="text-[11px] text-slate-600 mt-0.5 block">
            Calibre artériolaire
          </span>
        </div>
      </div>

      {/* PLANCHE VECTORIELLE CALQUÉE SUR LE MODÈLE DU BAC SÉNÉGALAIS */}
      <div className="border border-slate-200 rounded-lg p-3 sm:p-4 bg-slate-50/40 space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-600 border-b border-slate-200 pb-2">
          <span className="font-bold uppercase tracking-wider text-slate-700">
            Planche Anatomique Officielle : Centre Bulbaire, Axe Médullaire et Voies Effectrices
          </span>
          <span className={`font-semibold text-[11px] px-2 py-0.5 rounded border ${bio.badgeColor}`}>
            {bio.statut}
          </span>
        </div>

        <svg viewBox="0 0 940 560" className="w-full h-auto max-h-[540px] bg-white rounded border border-slate-200 select-none">
          <defs>
            {/* Flèches pour sens de propagation de l'influx */}
            <marker id="arrowGreen" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M 0 0 L 6 3 L 0 6 z" fill="#15803d" />
            </marker>
            <marker id="arrowBlue" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M 0 0 L 6 3 L 0 6 z" fill="#1d4ed8" />
            </marker>
            <marker id="arrowRed" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
              <path d="M 0 0 L 6 3 L 0 6 z" fill="#b91c1c" />
            </marker>
          </defs>

          {/* ======================================================== */}
          {/* 1. AXE NÉVRAXIQUE GAUCHE : BULBE RACHIDIEN & MOELLE ÉPINIÈRE */}
          {/* ======================================================== */}
          <g id="axe_bulbo_medullaire" transform="translate(180, 20)">
            {/* Forme de vase anatomique : Bulbe élargi en haut + Moelle tubulaire en bas */}
            <path
              d="M 20 0 Q 75 10 130 0 L 145 40 Q 155 70 120 120 L 105 160 L 105 400 L 45 400 L 45 160 L 30 120 Q -5 70 5 40 Z"
              fill="#e2e8f0"
              stroke="#94a3b8"
              strokeWidth="2"
            />
            {/* Moelle épinière étiquette */}
            <text x="35" y="320" fill="#475569" fontSize="10" fontWeight="bold" textAnchor="end">
              Moelle épinière
            </text>
            <line x1="38" y1="316" x2="65" y2="316" stroke="#94a3b8" strokeWidth="1" />

            <text x="0" y="110" fill="#475569" fontSize="11" fontWeight="bold" textAnchor="end">
              Bulbe rachidien
            </text>
            <line x1="2" y1="106" x2="35" y2="106" stroke="#94a3b8" strokeWidth="1" />

            {/* CENTRES BULBAIRES */}
            {/* Centre Cardiomodérateur (Vert en haut à droite du bulbe) */}
            <circle cx="100" cy="55" r="24" fill="#dcfce7" stroke="#16a34a" strokeWidth="1.5" />
            <circle cx="100" cy="55" r="10" fill="#16a34a" />
            <text x="110" y="18" fill="#15803d" fontSize="9.5" fontWeight="bold" textAnchor="middle">
              Centre bulbaire
            </text>
            <text x="110" y="29" fill="#15803d" fontSize="9.5" fontWeight="bold" textAnchor="middle">
              cardiomodérateur
            </text>
            <line x1="100" y1="32" x2="100" y2="44" stroke="#16a34a" strokeWidth="1" />

            {/* Noyau du nerf X (Bleu, sous le CCM) */}
            <circle cx="100" cy="115" r="22" fill="#dbeafe" stroke="#2563eb" strokeWidth="1.5" />
            <circle cx="100" cy="115" r="9" fill="#1d4ed8" />
            <text x="145" y="125" fill="#1d4ed8" fontSize="10" fontWeight="bold">
              Noyau du nerf X
            </text>
            <line x1="142" y1="121" x2="112" y2="117" stroke="#2563eb" strokeWidth="1" />

            {/* Centre Vasomoteur (Rouge en haut à gauche du bulbe) */}
            <circle cx="48" cy="75" r="24" fill="#fee2e2" stroke="#dc2626" strokeWidth="1.5" />
            <circle cx="48" cy="75" r="10" fill="#b91c1c" />
            <text x="-5" y="65" fill="#b91c1c" fontSize="10" fontWeight="bold" textAnchor="end">
              Centre vasomoteur
            </text>
            <line x1="-2" y1="62" x2="36" y2="72" stroke="#dc2626" strokeWidth="1" />

            {/* Interneurone inhibiteur (vert pointillé/liaison reliant CCM au CVM) */}
            <path d="M 88 58 Q 68 50 56 66" fill="none" stroke="#16a34a" strokeWidth="2" strokeDasharray="3 2" />
            <circle cx="56" cy="66" r="3" fill="#16a34a" />
            <text x="50" y="38" fill="#15803d" fontSize="8.5" fontWeight="bold" textAnchor="middle">
              Interneurone inhibiteur
            </text>

            {/* Faisceau descendant bulbo-médullaire vers le centre cardioaccélérateur */}
            <path d="M 48 85 C 48 130, 65 180, 75 220" fill="none" stroke="#b91c1c" strokeWidth="1.8" />

            {/* Centre médullaire cardioaccélérateur (Zone thoracique D1-D5) */}
            <ellipse cx="75" cy="225" rx="16" ry="24" fill="#ffedd5" stroke="#ea580c" strokeWidth="1.5" />
            <circle cx="75" cy="225" r="6" fill="#c2410c" />
            <text x="-5" y="222" fill="#c2410c" fontSize="9.5" fontWeight="bold" textAnchor="end">
              Centre médullaire
            </text>
            <text x="-5" y="233" fill="#c2410c" fontSize="9.5" fontWeight="bold" textAnchor="end">
              cardioaccélérateur
            </text>
            <line x1="-2" y1="225" x2="60" y2="225" stroke="#ea580c" strokeWidth="1" />
          </g>

          {/* ======================================================== */}
          {/* 2. CHAÎNE GANGLIONNAIRE LATERO-VERTÉBRALE ORTHOSYMPATHIQUE */}
          {/* ======================================================== */}
          <g id="chaine_ganglionnaire" transform="translate(355, 200)">
            {/* Cordon sympathique vertical */}
            <line x1="20" y1="20" x2="20" y2="210" stroke="#ea580c" strokeWidth="3" />

            {/* Ganglion Étoilé (forme étoilée/losangique au sommet) */}
            <path
              d="M 20 0 L 28 10 L 40 10 L 30 20 L 38 32 L 20 25 L 2 32 L 10 20 L 0 10 L 12 10 Z"
              fill="#ea580c"
              stroke="#c2410c"
              strokeWidth="1.5"
            />
            <text x="50" y="18" fill="#c2410c" fontSize="10" fontWeight="bold">
              Ganglion étoilé
            </text>
            <line x1="48" y1="15" x2="35" y2="15" stroke="#ea580c" strokeWidth="1" />

            {/* Chapelet de ganglions sympathiques thoraciques */}
            <circle cx="20" cy="65" r="9" fill="#ea580c" stroke="#c2410c" strokeWidth="1.5" />
            <circle cx="20" cy="115" r="9" fill="#ea580c" stroke="#c2410c" strokeWidth="1.5" />
            <circle cx="20" cy="165" r="9" fill="#ea580c" stroke="#c2410c" strokeWidth="1.5" />
            <circle cx="20" cy="210" r="9" fill="#ea580c" stroke="#c2410c" strokeWidth="1.5" />

            <text x="-15" y="115" fill="#475569" fontSize="9.5" fontWeight="bold" textAnchor="end">
              Chaîne ganglionnaire
            </text>
            <line x1="-12" y1="112" x2="10" y2="112" stroke="#94a3b8" strokeWidth="1" />
          </g>

          {/* Liaison Moelle -> Ganglion Étoilé (Fibre préganglionnaire) */}
          <path
            d="M 260 245 C 300 245, 340 220, 370 215"
            fill="none"
            stroke="#b91c1c"
            strokeWidth="1.8"
            markerEnd="url(#arrowRed)"
          />

          {/* ======================================================== */}
          {/* 3. ARBRE CARDIOVASCULAIRE DROIT : CŒUR, AORTE ET CAROTIDE */}
          {/* ======================================================== */}
          <g id="heart_carotid_assembly" transform="translate(630, 100)">
            {/* Crosse aortique arquée avec tronc rouge */}
            <path
              d="M 50 170 C 50 70, 110 70, 110 190"
              fill="none"
              stroke="#b91c1c"
              strokeWidth="20"
              strokeLinecap="round"
            />
            <text x="145" y="150" fill="#b91c1c" fontSize="10.5" fontWeight="bold">
              Artère aorte
            </text>
            <line x1="140" y1="146" x2="115" y2="146" stroke="#b91c1c" strokeWidth="1" />

            <text x="145" y="115" fill="#b91c1c" fontSize="10.5" fontWeight="bold">
              Crosse aortique
            </text>
            <line x1="140" y1="111" x2="95" y2="100" stroke="#b91c1c" strokeWidth="1" />

            {/* Barorécepteur crosse aortique (vert/dépresseur) */}
            <circle cx="85" cy="85" r="4.5" fill="#16a34a" stroke="#ffffff" strokeWidth="1" />

            {/* Carotide gauche montante vers le cou */}
            <path
              d="M 75 90 L 80 5"
              fill="none"
              stroke="#b91c1c"
              strokeWidth="11"
              strokeLinecap="round"
            />
            <text x="145" y="60" fill="#b91c1c" fontSize="10.5" fontWeight="bold">
              Carotide gauche
            </text>
            <line x1="140" y1="56" x2="88" y2="56" stroke="#b91c1c" strokeWidth="1" />

            {/* Sinus carotidien (Renflement ovalaire à l'extrémité supérieure) */}
            <ellipse cx="80" cy="15" rx="9" ry="14" fill="#dc2626" stroke="#991b1b" strokeWidth="1.5" />
            {/* Barorécepteur carotidien */}
            <circle cx="80" cy="15" r="4.5" fill="#16a34a" stroke="#ffffff" strokeWidth="1" />

            <text x="145" y="18" fill="#15803d" fontSize="10.5" fontWeight="bold">
              Sinus carotidien
            </text>
            <line x1="140" y1="15" x2="92" y2="15" stroke="#16a34a" strokeWidth="1" />

            {/* LE CŒUR ANATOMIQUE (Conforme au schéma du Bac : Oreillettes + Ventricules) */}
            {/* Oreillettes supérieures */}
            <path
              d="M 10 160 C -5 140, 45 130, 60 155 C 80 135, 115 145, 105 170 Z"
              fill="#e11d48"
              stroke="#9f1239"
              strokeWidth="1.8"
            />
            {/* Nœud sinusal dans l'oreillette droite */}
            <circle cx="18" cy="152" r="4" fill="#facc15" stroke="#854d0e" strokeWidth="1" />
            <text x="135" y="185" fill="#9f1239" fontSize="10.5" fontWeight="bold">
              Oreillettes
            </text>
            <line x1="130" y1="181" x2="90" y2="165" stroke="#9f1239" strokeWidth="1" />

            {/* Ventricules cardiaque (Masse contractile inférieure) */}
            <path
              d="M 10 165 C -15 210, 10 260, 48 280 C 85 260, 110 210, 95 165 Z"
              fill="#be123c"
              stroke="#881337"
              strokeWidth="2"
              transform={`scale(${pulse ? 1.05 : 1})`}
              style={{ transformOrigin: '48px 210px', transition: 'transform 0.1s ease-out' }}
            />
            <text x="135" y="235" fill="#881337" fontSize="10.5" fontWeight="bold">
              Ventricules
            </text>
            <line x1="130" y1="231" x2="85" y2="231" stroke="#881337" strokeWidth="1" />
          </g>

          {/* ======================================================== */}
          {/* 4. EFFECTEUR ARTÉRIOLE (Coupe tubulaire rouge en bas) */}
          {/* ======================================================== */}
          <g id="arteriole_assembly" transform="translate(480, 310)">
            {/* Tube incurvé représentant l'artériole musculaire */}
            <path
              d="M 10 20 C 15 50, 45 75, 75 70 C 85 68, 80 50, 65 45 C 45 42, 28 25, 25 15 Z"
              fill="#f87171"
              stroke="#b91c1c"
              strokeWidth="2"
            />
            {/* Orifice vasculaire dynamique avec lumière */}
            <ellipse cx="18" cy="16" rx="12" ry="7" fill="#b91c1c" stroke="#7f1d1d" strokeWidth="1.5" />
            <ellipse
              cx="18"
              cy="16"
              rx={bio.vaisseauRadius * 0.55}
              ry={bio.vaisseauRadius * 0.35}
              fill="#ef4444"
              style={{ transition: 'all 0.3s ease-out' }}
            />
            <text x="25" y="95" fill="#b91c1c" fontSize="11" fontWeight="bold">
              Artériole
            </text>
          </g>

          {/* ======================================================== */}
          {/* 5. EFFECTEUR MÉDULLOSURRÉNALE (Organe glandulaire en bas à droite) */}
          {/* ======================================================== */}
          <g id="medullosursenale_assembly" transform="translate(680, 400)">
            {/* Capsule rénale / surrénale ovalaire */}
            <ellipse cx="40" cy="20" rx="35" ry="18" fill="#fed7aa" stroke="#c2410c" strokeWidth="1.5" />
            {/* Cœur médullaire sécrétant l'adrénaline */}
            <ellipse cx="40" cy="20" rx="20" ry="9" fill="#fb923c" stroke="#9a3412" strokeWidth="1.2" />
            <text x="40" y="52" fill="#c2410c" fontSize="10.5" fontWeight="bold" textAnchor="middle">
              Médullosurrénale
            </text>
          </g>

          {/* ======================================================== */}
          {/* 6. TRAJETS NERVEUX INTER-ORGANES (EXACT DU SCHÉMA BAC) */}
          {/* ======================================================== */}

          {/* A. VOIES SENSITIVES AFFÉRENTES (LIGNES VERTES AVEC FLÈCHES CENTRIPÈTES) */}
          {/* Nerf de Hering (du Sinus au CCM bulbaire) */}
          <path
            d="M 710 115 C 640 45, 450 40, 290 70"
            fill="none"
            stroke={state === 'section_hering' ? '#dc2626' : '#15803d'}
            strokeWidth={state === 'section_hering' ? 2 : 2.5}
            strokeDasharray={state === 'section_hering' ? '5 4' : 'none'}
            markerEnd={state === 'section_hering' ? undefined : 'url(#arrowGreen)'}
          />
          <text x="540" y="45" fill="#15803d" fontSize="10.5" fontWeight="bold">
            Nerf de Hering
          </text>

          {/* Témoin de section ou stimulation sur Hering */}
          {state === 'section_hering' && (
            <g transform="translate(540, 48)">
              <line x1="-8" y1="-8" x2="8" y2="8" stroke="#dc2626" strokeWidth="3" />
              <line x1="8" y1="-8" x2="-8" y2="8" stroke="#dc2626" strokeWidth="3" />
              <rect x="12" y="-10" width="85" height="18" rx="4" fill="#fee2e2" stroke="#dc2626" strokeWidth="1" />
              <text x="16" y="3" fill="#991b1b" fontSize="8.5" fontWeight="bold">Section Nerf IX</text>
            </g>
          )}

          {state === 'stimulation_hering' && (
            <g transform="translate(430, 45)">
              <polygon points="0,0 10,5 0,10" fill="#f59e0b" stroke="#b45309" strokeWidth="1" />
              <rect x="14" y="-4" width="115" height="18" rx="4" fill="#fef3c7" stroke="#d97706" strokeWidth="1" />
              <text x="18" y="9" fill="#92400e" fontSize="8.5" fontWeight="bold">Stimulation Bout Central</text>
            </g>
          )}

          {/* Nerf de Cyon (de la Crosse aortique au CCM bulbaire) */}
          <path
            d="M 715 185 C 620 110, 450 75, 292 78"
            fill="none"
            stroke="#15803d"
            strokeWidth="2.2"
            markerEnd="url(#arrowGreen)"
          />
          <text x="490" y="115" fill="#15803d" fontSize="10.5" fontWeight="bold">
            Nerf de Cyon
          </text>

          {/* B. VOIE PARASYMPATHIQUE EFFÉRENTE (LIGNE BLEUE : NERF X DU BULBE AU CŒUR) */}
          <path
            d="M 288 135 C 400 140, 550 200, 645 250"
            fill="none"
            stroke="#1d4ed8"
            strokeWidth="2.8"
            strokeDasharray={bio.vagueAct.includes('Stim') ? 'none' : '6 3'}
            markerEnd="url(#arrowBlue)"
          />
          <text x="460" y="170" fill="#1d4ed8" fontSize="10.5" fontWeight="bold">
            Nerf X (Pneumogastrique)
          </text>

          {/* C. VOIES ORTHOSYMPATHIQUES EFFÉRENTES (LIGNES ROUGES DU GANGLION AUX EFFECTEURS) */}
          {/* 1. Nerf cardiaque (du ganglion étoilé au cœur) */}
          <path
            d="M 390 220 C 460 220, 560 270, 640 280"
            fill="none"
            stroke="#b91c1c"
            strokeWidth="2.5"
            strokeDasharray={bio.sympAct.includes('Stim') || bio.sympAct.includes('Lib') ? 'none' : '5 4'}
            markerEnd="url(#arrowRed)"
          />
          <text x="495" y="270" fill="#b91c1c" fontSize="10" fontWeight="bold">
            Nerf cardiaque
          </text>

          {/* 2. Nerf artériolaire (du ganglion de la chaîne à l'artériole) */}
          <path
            d="M 380 270 C 420 270, 460 300, 500 325"
            fill="none"
            stroke="#b91c1c"
            strokeWidth="2.2"
            markerEnd="url(#arrowRed)"
          />
          <text x="440" y="300" fill="#b91c1c" fontSize="10" fontWeight="bold">
            Nerf artériolaire
          </text>

          {/* 3. Nerf splanchnique (du bas de la chaîne à la médullosurrénale) */}
          <path
            d="M 378 410 C 470 410, 580 430, 680 420"
            fill="none"
            stroke="#b91c1c"
            strokeWidth="2.2"
            markerEnd="url(#arrowRed)"
          />
          <text x="480" y="420" fill="#b91c1c" fontSize="10" fontWeight="bold">
            Nerf splanchnique
          </text>

          {/* ======================================================== */}
          {/* 7. LÉGENDE DIDACTIQUE OFFICIELLE BAC (CADRE EN BAS) */}
          {/* ======================================================== */}
          <g id="official_legend" transform="translate(180, 470)">
            <rect x="0" y="0" width="580" height="75" rx="6" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.2" />
            
            {/* Ligne 1 : Fibres sensitives (Vert) */}
            <line x1="20" y1="20" x2="90" y2="20" stroke="#15803d" strokeWidth="3" markerEnd="url(#arrowGreen)" />
            <text x="105" y="24" fill="#0f172a" fontSize="10" fontWeight="semibold">
              Fibres nerveuses sensitives (afférentes) : Nerf de Héring et Nerf de Cyon
            </text>

            {/* Ligne 2 : Innervation orthosympathique (Rouge) */}
            <line x1="20" y1="42" x2="90" y2="42" stroke="#b91c1c" strokeWidth="3" markerEnd="url(#arrowRed)" />
            <text x="105" y="46" fill="#0f172a" fontSize="10" fontWeight="semibold">
              Innervation orthosympathique : nerfs cardiaque, artériolaire et splanchnique
            </text>

            {/* Ligne 3 : Innervation parasympathique (Bleu) */}
            <line x1="20" y1="64" x2="90" y2="64" stroke="#1d4ed8" strokeWidth="3" markerEnd="url(#arrowBlue)" />
            <text x="105" y="68" fill="#0f172a" fontSize="10" fontWeight="semibold">
              Innervation parasympathique : nerf pneumogastrique (nerf X)
            </text>
          </g>
        </svg>
      </div>

      {/* Note d'analyse physiologique textuelle */}
      <div className={`p-4 rounded-xl border text-xs leading-relaxed ${bio.boxColor}`}>
        <span className="font-bold uppercase tracking-wider block mb-1">
          Interprétation du Tracé & Mécanisme Officiel du Bac :
        </span>
        <p>{bio.description}</p>
      </div>

      {/* Protocoles expérimentaux classiques du Baccalauréat */}
      <div className="space-y-2">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wide block">
          Protocoles Expérimentaux Classiques du Bac S2
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          <button
            type="button"
            onClick={() => setState('normotension')}
            className={`p-3 rounded-lg border text-left text-xs transition-all ${
              state === 'normotension'
                ? 'border-emerald-600 bg-emerald-50/60 font-semibold text-emerald-950 shadow-xs'
                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
            }`}
          >
            <div className="font-mono text-[10px] text-emerald-700 font-bold">EXPÉRIENCE 01</div>
            <div className="font-bold text-slate-900 mt-0.5">Normotension Témoin</div>
            <div className="text-slate-500 text-[11px] mt-0.5">Équilibre neuro-végétatif de repos (120/80 mmHg).</div>
          </button>

          <button
            type="button"
            onClick={() => setState('hypertension')}
            className={`p-3 rounded-lg border text-left text-xs transition-all ${
              state === 'hypertension'
                ? 'border-rose-600 bg-rose-50/60 font-semibold text-rose-950 shadow-xs'
                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
            }`}
          >
            <div className="font-mono text-[10px] text-rose-700 font-bold">EXPÉRIENCE 02</div>
            <div className="font-bold text-slate-900 mt-0.5">Perfusion Sérum Salé Fort</div>
            <div className="text-slate-500 text-[11px] mt-0.5">Hausse de PA → Étirement sinus et bradycardie réflexe.</div>
          </button>

          <button
            type="button"
            onClick={() => setState('hypotension')}
            className={`p-3 rounded-lg border text-left text-xs transition-all ${
              state === 'hypotension'
                ? 'border-blue-600 bg-blue-50/60 font-semibold text-blue-950 shadow-xs'
                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
            }`}
          >
            <div className="font-mono text-[10px] text-blue-700 font-bold">EXPÉRIENCE 03</div>
            <div className="font-bold text-slate-900 mt-0.5">Hémorragie Aiguë</div>
            <div className="text-slate-500 text-[11px] mt-0.5">Chute de PA → Silence barorécepteur et réponse sympathique.</div>
          </button>

          <button
            type="button"
            onClick={() => setState('section_hering')}
            className={`p-3 rounded-lg border text-left text-xs transition-all ${
              state === 'section_hering'
                ? 'border-red-600 bg-red-50/60 font-semibold text-red-950 shadow-xs'
                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
            }`}
          >
            <div className="font-mono text-[10px] text-red-700 font-bold">EXPÉRIENCE 04</div>
            <div className="font-bold text-slate-900 mt-0.5">Section Nerfs de Hering</div>
            <div className="text-slate-500 text-[11px] mt-0.5">Suppression afférente → Levée de frein (HTA permanente).</div>
          </button>

          <button
            type="button"
            onClick={() => setState('stimulation_hering')}
            className={`p-3 rounded-lg border text-left text-xs transition-all ${
              state === 'stimulation_hering'
                ? 'border-cyan-600 bg-cyan-50/60 font-semibold text-cyan-950 shadow-xs'
                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
            }`}
          >
            <div className="font-mono text-[10px] text-cyan-700 font-bold">EXPÉRIENCE 05</div>
            <div className="font-bold text-slate-900 mt-0.5">Stimulation Bout Central</div>
            <div className="text-slate-500 text-[11px] mt-0.5">Voie centripète → Activation maximale du nerf vague X.</div>
          </button>

          <button
            type="button"
            onClick={() => setState('ligature_carotides')}
            className={`p-3 rounded-lg border text-left text-xs transition-all ${
              state === 'ligature_carotides'
                ? 'border-purple-600 bg-purple-50/60 font-semibold text-purple-950 shadow-xs'
                : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
            }`}
          >
            <div className="font-mono text-[10px] text-purple-700 font-bold">EXPÉRIENCE 06</div>
            <div className="font-bold text-slate-900 mt-0.5">Ligature Sous-Sinusale</div>
            <div className="text-slate-500 text-[11px] mt-0.5">Baisse intrasinusale → HTA générale réflexe à l'aorte.</div>
          </button>
        </div>
      </div>
    </div>
  );
}
