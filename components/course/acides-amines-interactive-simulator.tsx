'use client';

import React, { useState } from 'react';
import MathRenderer from '@/components/course/math-renderer';
import {
  Compass,
  Zap,
  Layers,
  Sparkles,
  AlertTriangle,
  Info,
  CheckCircle2,
  RefreshCw,
  Sliders,
  Play,
  RotateCcw,
} from 'lucide-react';

interface AminoAcidData {
  id: string;
  name: string;
  symbol: string;
  uicpa: string;
  radicaR: string;
  radicaName: string;
  pKa1: number; // -COOH
  pKa2: number; // -NH3+
  pHi: number;
  isChiral: boolean;
  color: string;
}

const AMINO_ACIDS: AminoAcidData[] = [
  {
    id: 'gly',
    name: 'Glycine (Glycocolle)',
    symbol: 'Gly',
    uicpa: 'Acide 2-aminoéthanoïque',
    radicaR: '-H',
    radicaName: 'Hydrogène (R = H)',
    pKa1: 2.34,
    pKa2: 9.60,
    pHi: 5.97,
    isChiral: false,
    color: '#3B82F6',
  },
  {
    id: 'ala',
    name: 'Alanine',
    symbol: 'Ala',
    uicpa: 'Acide 2-aminopropanoïque',
    radicaR: '-CH₃',
    radicaName: 'Groupe méthyle (R = CH₃)',
    pKa1: 2.34,
    pKa2: 9.69,
    pHi: 6.02,
    isChiral: true,
    color: '#00B8A9',
  },
  {
    id: 'val',
    name: 'Valine',
    symbol: 'Val',
    uicpa: 'Acide 2-amino-3-méthylbutanoïque',
    radicaR: '-CH(CH₃)₂',
    radicaName: 'Groupe isopropyle (R = CH(CH₃)₂)',
    pKa1: 2.32,
    pKa2: 9.62,
    pHi: 5.97,
    isChiral: true,
    color: '#F59E0B',
  },
  {
    id: 'asp',
    name: 'Acide Aspartique',
    symbol: 'Asp',
    uicpa: 'Acide 2-aminobutanedioïque',
    radicaR: '-CH₂-COOH',
    radicaName: 'Chaîne acide carboxylique',
    pKa1: 2.09,
    pKa2: 9.82,
    pHi: 2.77,
    isChiral: true,
    color: '#EF4444',
  },
  {
    id: 'lys',
    name: 'Lysine',
    symbol: 'Lys',
    uicpa: 'Acide 2,6-diaminohexanoïque',
    radicaR: '-(CH₂)₄-NH₂',
    radicaName: 'Chaîne basique aminée',
    pKa1: 2.18,
    pKa2: 8.95,
    pHi: 9.74,
    isChiral: true,
    color: '#8B5CF6',
  },
];

export default function AcidesAminesInteractiveSimulator() {
  const [activeTab, setActiveTab] = useState<'fischer' | 'ph_zwitterion' | 'electrophorese' | 'peptides'>('fischer');

  // Atelier 1 : Fischer & Chiralité
  const [fischerAa, setFischerAa] = useState<AminoAcidData>(AMINO_ACIDS[1]); // Alanine
  const [fischerSeries, setFischerSeries] = useState<'L' | 'D'>('L');

  // Atelier 2 : Formes ioniques & pH
  const [phAa, setPhAa] = useState<AminoAcidData>(AMINO_ACIDS[1]); // Alanine
  const [currentPh, setCurrentPh] = useState<number>(6.0);

  // Atelier 3 : Électrophorèse
  const [bufferPh, setBufferPh] = useState<number>(6.0);
  const [isElectrophoresisRunning, setIsElectrophoresisRunning] = useState<boolean>(false);
  const [hasRunElectrophoresis, setHasRunElectrophoresis] = useState<boolean>(false);

  // Atelier 4 : Dipeptides
  const [nTermAa, setNTermAa] = useState<AminoAcidData>(AMINO_ACIDS[1]); // Ala
  const [cTermAa, setCTermAa] = useState<AminoAcidData>(AMINO_ACIDS[0]); // Gly

  // Calculs Atelier 2 (fractions molaires des 3 espèces ioniques)
  const computeFractions = (ph: number, pKa1: number, pKa2: number) => {
    const h = Math.pow(10, -ph);
    const Ka1 = Math.pow(10, -pKa1);
    const Ka2 = Math.pow(10, -pKa2);
    const denom = h * h + h * Ka1 + Ka1 * Ka2;
    const fCation = (h * h) / denom;
    const fZwitterion = (h * Ka1) / denom;
    const fAnion = (Ka1 * Ka2) / denom;
    return {
      fCation: Math.round(fCation * 100),
      fZwitterion: Math.round(fZwitterion * 100),
      fAnion: Math.round(fAnion * 100),
      chargeNette: Math.round((fCation - fAnion) * 100) / 100,
    };
  };

  const fractions = computeFractions(currentPh, phAa.pKa1, phAa.pKa2);

  // Déterminer la forme dominante
  let formeDominante = 'Zwitterion (Amphion neutre)';
  let chargeForme = '0';
  let formuleKatex = `\\text{${phAa.symbol}} : \\text{R}-\\text{CH}(\\text{NH}_3^+)-\\text{COO}^-`;
  if (currentPh < phAa.pKa1) {
    formeDominante = 'Cation (acide conjugué)';
    chargeForme = '+1';
    formuleKatex = `\\text{${phAa.symbol}}^+ : \\text{R}-\\text{CH}(\\text{NH}_3^+)-\\text{COOH}`;
  } else if (currentPh > phAa.pKa2) {
    formeDominante = 'Anion (base conjuguée)';
    chargeForme = '-1';
    formuleKatex = `\\text{${phAa.symbol}}^- : \\text{R}-\\text{CH}(\\text{NH}_2)-\\text{COO}^-`;
  }

  // Calculs Atelier 3 : position de migration en électrophorèse
  // Position initiale = 50% (milieu du gel)
  // Vers l'anode (+) à droite si pH > pHi (charge négative)
  // Vers la cathode (-) à gauche si pH < pHi (charge positive)
  const computePosition = (aa: AminoAcidData, pH: number) => {
    const diff = pH - aa.pHi;
    // Déplacement max: 35% de chaque côté
    const delta = Math.max(-35, Math.min(35, diff * 10));
    return 50 + delta;
  };

  const handleRunElectrophoresis = () => {
    setIsElectrophoresisRunning(true);
    setHasRunElectrophoresis(true);
    setTimeout(() => {
      setIsElectrophoresisRunning(false);
    }, 1200);
  };

  const handleResetElectrophoresis = () => {
    setHasRunElectrophoresis(false);
    setIsElectrophoresisRunning(false);
  };

  return (
    <div className="bg-white rounded-3xl border border-navy/10 p-5 sm:p-7 shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/10 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-turquoise-light text-turquoise">
              <Compass className="w-5 h-5" />
            </span>
            <h3 className="text-xl font-bold text-navy">
              Laboratoire Virtuel : Acides $\alpha$-Aminés &amp; Stéréochimie (Bac S2)
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-text/70">
            Projection de Fischer D/L, équilibres zwitterioniques au pH-mètre, cuve d&apos;électrophorèse et condensation peptidique.
          </p>
        </div>
        <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          Chimie Terminale S2
        </span>
      </div>

      {/* Onglets des ateliers */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={() => setActiveTab('fischer')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'fischer'
              ? 'bg-turquoise text-white shadow-md'
              : 'bg-surface hover:bg-navy/5 text-navy border border-navy/10'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>1. Fischer D / L</span>
        </button>

        <button
          onClick={() => setActiveTab('ph_zwitterion')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'ph_zwitterion'
              ? 'bg-turquoise text-white shadow-md'
              : 'bg-surface hover:bg-navy/5 text-navy border border-navy/10'
          }`}
        >
          <Sliders className="w-4 h-4" />
          <span>2. Zwitterion &amp; pH</span>
        </button>

        <button
          onClick={() => setActiveTab('electrophorese')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'electrophorese'
              ? 'bg-turquoise text-white shadow-md'
              : 'bg-surface hover:bg-navy/5 text-navy border border-navy/10'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>3. Électrophorèse</span>
        </button>

        <button
          onClick={() => setActiveTab('peptides')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'peptides'
              ? 'bg-turquoise text-white shadow-md'
              : 'bg-surface hover:bg-navy/5 text-navy border border-navy/10'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>4. Liaison Peptidique</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* ATELIER 1 : PROJECTION DE FISCHER D/L & CHIRALITÉ */}
      {/* ======================================================== */}
      {activeTab === 'fischer' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Colonne de gauche : Sélection molécule et configuration */}
          <div className="lg:col-span-5 space-y-4 bg-surface rounded-2xl p-4 border border-navy/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy">
              🧪 Choisir un Acide $\alpha$-Aminé
            </h4>

            <div className="space-y-1.5">
              {AMINO_ACIDS.slice(0, 3).map((aa) => (
                <button
                  key={aa.id}
                  onClick={() => setFischerAa(aa)}
                  className={`w-full p-2.5 rounded-xl border text-left transition-all ${
                    fischerAa.id === aa.id
                      ? 'border-turquoise bg-turquoise-light font-bold text-navy shadow-xs'
                      : 'border-navy/10 bg-white hover:border-turquoise/40 text-navy/80'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">{aa.name}</span>
                    <span
                      className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                        aa.isChiral ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {aa.isChiral ? '1 Carbone C*' : 'Achirale (Pas de C*)'}
                    </span>
                  </div>
                  <span className="text-[10px] text-text/50 font-mono block mt-0.5">{aa.uicpa}</span>
                </button>
              ))}
            </div>

            {/* Toggle Configuration D vs L */}
            {fischerAa.isChiral ? (
              <div className="space-y-2 pt-2 border-t border-navy/10">
                <span className="text-xs font-semibold text-navy block">
                  Configuration Stéréochimique (Série) :
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setFischerSeries('L')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      fischerSeries === 'L'
                        ? 'bg-turquoise text-white border-turquoise shadow-xs'
                        : 'bg-white text-navy border-navy/10 hover:border-turquoise/40'
                    }`}
                  >
                    Série L (-NH₂ à Gauche)
                    <span className="block text-[9px] opacity-80 font-normal">Acides aminés naturels</span>
                  </button>

                  <button
                    onClick={() => setFischerSeries('D')}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                      fischerSeries === 'D'
                        ? 'bg-turquoise text-white border-turquoise shadow-xs'
                        : 'bg-white text-navy border-navy/10 hover:border-turquoise/40'
                    }`}
                  >
                    Série D (-NH₂ à Droite)
                    <span className="block text-[9px] opacity-80 font-normal">Énantiomère miroir</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-950 space-y-1">
                <span className="font-bold flex items-center gap-1 text-rose-800">
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                  Piège Bac : Pas de série D ou L pour la Glycine !
                </span>
                <p className="text-[11px] leading-relaxed">
                  Le radical R étant un hydrogène (-H), le carbone alpha est lié à deux atomes d&apos;hydrogène identiques.
                  La glycine n&apos;est pas asymétrique : elle n&apos;a pas d&apos;énantiomères D ou L.
                </p>
              </div>
            )}

            {/* Fiche identité */}
            <div className="bg-white rounded-xl p-3 border border-navy/10 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-text/60">Radical R :</span>
                <span className="font-mono font-bold text-navy">{fischerAa.radicaR}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text/60">Point isoélectrique pHi :</span>
                <span className="font-mono font-bold text-turquoise">{fischerAa.pHi.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text/60">pKa1 (-COOH) / pKa2 (-NH₃⁺) :</span>
                <span className="font-mono font-semibold text-text/80">
                  {fischerAa.pKa1} / {fischerAa.pKa2}
                </span>
              </div>
            </div>
          </div>

          {/* Colonne de droite : Visualisation SVG de la Projection de Fischer */}
          <div className="lg:col-span-7 bg-surface rounded-2xl p-5 border border-navy/10 space-y-4">
            <div className="flex items-center justify-between border-b border-navy/10 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-navy">
                Projection de Fischer Officielle
              </span>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-turquoise/10 text-turquoise">
                {fischerAa.isChiral ? `${fischerSeries}-${fischerAa.name}` : `Glycine (Achirale)`}
              </span>
            </div>

            {/* Tracé SVG de la Croix de Fischer */}
            <div className="flex flex-col items-center justify-center py-4 bg-white rounded-xl border border-navy/10">
              <svg viewBox="0 0 260 220" className="w-56 h-48 drop-shadow">
                {/* Ligne verticale (chaîne carbonée principale en arrière du plan) */}
                <line x1="130" y1="40" x2="130" y2="180" stroke="#0F172A" strokeWidth="3" />

                {/* Ligne horizontale (substituants pointant vers l'observateur) */}
                <line x1="50" y1="110" x2="210" y2="110" stroke="#00B8A9" strokeWidth="3.5" />

                {/* Carbone asymétrique C* central */}
                <circle cx="130" cy="110" r="7" fill={fischerAa.isChiral ? '#EF4444' : '#64748B'} />
                <text x="142" y="105" fontSize="11" fontWeight="bold" fill={fischerAa.isChiral ? '#EF4444' : '#64748B'}>
                  {fischerAa.isChiral ? 'C*' : 'C'}
                </text>

                {/* Groupe -COOH en HAUT (carbone n°1 le plus oxydé) */}
                <rect x="95" y="15" width="70" height="25" rx="5" fill="#EEF2F6" stroke="#CBD5E1" strokeWidth="1" />
                <text x="130" y="32" textAnchor="middle" fill="#0F172A" fontSize="13" fontWeight="bold" fontFamily="monospace">
                  COOH
                </text>
                <text x="175" y="25" fontSize="8" fill="#64748B" fontWeight="bold">
                  (C1)
                </text>

                {/* Groupe -R en BAS */}
                <rect x="85" y="180" width="90" height="25" rx="5" fill="#EEF2F6" stroke="#CBD5E1" strokeWidth="1" />
                <text x="130" y="197" textAnchor="middle" fill="#0F172A" fontSize="12" fontWeight="bold" fontFamily="monospace">
                  {fischerAa.id === 'gly' ? 'H' : fischerAa.radicaR.replace('-', '')}
                </text>

                {/* Substituants horizontaux : -NH2 et -H */}
                {fischerAa.isChiral ? (
                  fischerSeries === 'L' ? (
                    <>
                      {/* Série L : -NH2 à GAUCHE, -H à DROITE */}
                      <rect x="15" y="98" width="55" height="25" rx="5" fill="#CCFBF1" stroke="#00B8A9" strokeWidth="1.5" />
                      <text x="42" y="115" textAnchor="middle" fill="#0F766E" fontSize="12" fontWeight="bold" fontFamily="monospace">
                        H₂N
                      </text>

                      <rect x="190" y="98" width="40" height="25" rx="5" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />
                      <text x="210" y="115" textAnchor="middle" fill="#0F172A" fontSize="13" fontWeight="bold" fontFamily="monospace">
                        H
                      </text>
                    </>
                  ) : (
                    <>
                      {/* Série D : -H à GAUCHE, -NH2 à DROITE */}
                      <rect x="25" y="98" width="40" height="25" rx="5" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />
                      <text x="45" y="115" textAnchor="middle" fill="#0F172A" fontSize="13" fontWeight="bold" fontFamily="monospace">
                        H
                      </text>

                      <rect x="190" y="98" width="55" height="25" rx="5" fill="#CCFBF1" stroke="#00B8A9" strokeWidth="1.5" />
                      <text x="217" y="115" textAnchor="middle" fill="#0F766E" fontSize="12" fontWeight="bold" fontFamily="monospace">
                        NH₂
                      </text>
                    </>
                  )
                ) : (
                  <>
                    {/* Glycine : H à gauche et H à droite */}
                    <rect x="25" y="98" width="40" height="25" rx="5" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />
                    <text x="45" y="115" textAnchor="middle" fill="#0F172A" fontSize="13" fontWeight="bold" fontFamily="monospace">
                      H₂N
                    </text>

                    <rect x="195" y="98" width="40" height="25" rx="5" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />
                    <text x="215" y="115" textAnchor="middle" fill="#0F172A" fontSize="13" fontWeight="bold" fontFamily="monospace">
                      H
                    </text>
                  </>
                )}
              </svg>

              <div className="mt-2 text-center text-xs font-semibold text-navy">
                {fischerAa.isChiral ? (
                  fischerSeries === 'L' ? (
                    <span className="text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      ✅ Série L : Le groupe -NH₂ est situé à <strong>GAUCHE</strong> (configuration naturelle des protéines)
                    </span>
                  ) : (
                    <span className="text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                      ⚠️ Série D : Le groupe -NH₂ est situé à <strong>DROITE</strong> (énantiomère miroir)
                    </span>
                  )
                ) : (
                  <span className="text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
                    La glycine ne possède pas de série D ou L car son carbone alpha n&apos;est pas asymétrique.
                  </span>
                )}
              </div>
            </div>

            {/* Règles mnémotechniques */}
            <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-emerald-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                Règle Officielle d&apos;Orientation de Fischer :
              </span>
              <p className="text-[11px] leading-relaxed">
                1. <strong>Ligne verticale</strong> : Chaîne carbonée la plus longue avec le carbone le plus oxydé (-COOH) placé en <strong>HAUT</strong>.
                <br />
                2. <strong>Liaisons horizontales</strong> : Pointent vers l&apos;avant du plan (vers l&apos;observateur).
                <br />
                3. Si <strong>-NH₂ est à gauche</strong> ⟶ Série <strong>L</strong>. Si <strong>-NH₂ est à droite</strong> ⟶ Série <strong>D</strong>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ATELIER 2 : ZWITTERION & CURSEUR DE PH CONTINU */}
      {/* ======================================================== */}
      {activeTab === 'ph_zwitterion' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Colonne de gauche : Paramétrage du pH */}
          <div className="lg:col-span-5 space-y-4 bg-surface rounded-2xl p-4 border border-navy/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy">
              🧪 Choix de l&apos;Acide Aminé &amp; Curseur pH
            </h4>

            {/* Sélecteur d'acide aminé */}
            <div className="grid grid-cols-3 gap-1.5">
              {AMINO_ACIDS.slice(0, 3).map((aa) => (
                <button
                  key={aa.id}
                  onClick={() => setPhAa(aa)}
                  className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all ${
                    phAa.id === aa.id
                      ? 'bg-turquoise text-white border-turquoise shadow-xs'
                      : 'bg-white text-navy border-navy/10 hover:border-turquoise/40'
                  }`}
                >
                  {aa.symbol}
                </button>
              ))}
            </div>

            {/* Curseur de pH libre */}
            <div className="space-y-1.5 pt-2 border-t border-navy/10">
              <div className="flex justify-between text-xs font-semibold text-navy">
                <span>Régler le pH de la solution :</span>
                <span className="font-mono text-turquoise font-bold text-sm">pH = {currentPh.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min={0}
                max={14}
                step={0.1}
                value={currentPh}
                onChange={(e) => setCurrentPh(Number(e.target.value))}
                className="w-full accent-turquoise cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-text/50 font-mono">
                <span>pH 0 (Acide fort)</span>
                <span className="text-turquoise font-bold">pHi = {phAa.pHi.toFixed(2)}</span>
                <span>pH 14 (Base forte)</span>
              </div>
            </div>

            {/* Boutons de raccourcis pH typiques */}
            <div className="space-y-1 pt-1">
              <span className="text-[11px] font-semibold text-text/70 block">Tester des points clés :</span>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  onClick={() => setCurrentPh(1.0)}
                  className="py-1.5 px-2 rounded-lg bg-rose-50 text-rose-800 border border-rose-200 text-[10px] font-bold hover:bg-rose-100"
                >
                  pH 1,0 (Cation +1)
                </button>
                <button
                  onClick={() => setCurrentPh(phAa.pHi)}
                  className="py-1.5 px-2 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-bold hover:bg-emerald-100"
                >
                  pHi = {phAa.pHi.toFixed(2)} (Amphion 0)
                </button>
                <button
                  onClick={() => setCurrentPh(12.0)}
                  className="py-1.5 px-2 rounded-lg bg-blue-50 text-blue-800 border border-blue-200 text-[10px] font-bold hover:bg-blue-100"
                >
                  pH 12,0 (Anion -1)
                </button>
              </div>
            </div>

            {/* Constantes thermodynamiques */}
            <div className="bg-white rounded-xl p-3 border border-navy/10 space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-text/60">pKₐ₁ (couple Cation / Amphion) :</span>
                <span className="font-mono font-bold text-navy">{phAa.pKa1} (-COOH)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text/60">pKₐ₂ (couple Amphion / Anion) :</span>
                <span className="font-mono font-bold text-navy">{phAa.pKa2} (-NH₃⁺)</span>
              </div>
              <div className="flex justify-between border-t border-navy/10 pt-1">
                <span className="font-bold text-navy">Point isoélectrique pHi :</span>
                <span className="font-mono font-black text-turquoise">{phAa.pHi.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Colonne de droite : Formule moléculaire dominante & Fractions molaires */}
          <div className="lg:col-span-7 bg-surface rounded-2xl p-5 border border-navy/10 space-y-4">
            <div className="flex items-center justify-between border-b border-navy/10 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-navy">
                Forme Ionique Prédominante à pH = {currentPh.toFixed(2)}
              </span>
              <span
                className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                  chargeForme === '+1'
                    ? 'bg-rose-100 text-rose-800'
                    : chargeForme === '-1'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-emerald-100 text-emerald-800'
                }`}
              >
                Charge nette : {fractions.chargeNette >= 0 ? `+${fractions.chargeNette}` : fractions.chargeNette}
              </span>
            </div>

            {/* Affichage KaTeX de la forme dominante */}
            <div className="bg-white rounded-xl p-4 border border-navy/10 text-center space-y-2">
              <span className="text-[10px] uppercase font-bold text-text/50 block">Structure Chimique</span>
              <MathRenderer content={`$$${formuleKatex}$$`} />
              <span className="text-xs font-bold text-navy block mt-1">{formeDominante}</span>
            </div>

            {/* Répartition des 3 espèces ioniques */}
            <div className="bg-white rounded-xl p-4 border border-navy/10 space-y-3">
              <span className="text-xs font-bold text-navy uppercase tracking-wider block">
                Fractions Molaires des 3 Espèces :
              </span>

              {/* Barre de répartition tricolore */}
              <div className="h-6 w-full rounded-xl overflow-hidden flex text-[10px] font-bold text-white shadow-xs">
                {fractions.fCation > 0 && (
                  <div
                    style={{ width: `${fractions.fCation}%` }}
                    className="bg-rose-500 flex items-center justify-center transition-all duration-300"
                  >
                    {fractions.fCation > 15 ? `Cation ${fractions.fCation}%` : ''}
                  </div>
                )}
                {fractions.fZwitterion > 0 && (
                  <div
                    style={{ width: `${fractions.fZwitterion}%` }}
                    className="bg-emerald-500 flex items-center justify-center transition-all duration-300"
                  >
                    {fractions.fZwitterion > 15 ? `Amphion ${fractions.fZwitterion}%` : ''}
                  </div>
                )}
                {fractions.fAnion > 0 && (
                  <div
                    style={{ width: `${fractions.fAnion}%` }}
                    className="bg-blue-500 flex items-center justify-center transition-all duration-300"
                  >
                    {fractions.fAnion > 15 ? `Anion ${fractions.fAnion}%` : ''}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 rounded-lg bg-rose-50 border border-rose-200">
                  <span className="text-[10px] text-rose-700 block font-semibold">Cation (+1)</span>
                  <span className="font-bold text-rose-900 font-mono">{fractions.fCation}%</span>
                </div>
                <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200">
                  <span className="text-[10px] text-emerald-700 block font-semibold">Amphion (0)</span>
                  <span className="font-bold text-emerald-900 font-mono">{fractions.fZwitterion}%</span>
                </div>
                <div className="p-2 rounded-lg bg-blue-50 border border-blue-200">
                  <span className="text-[10px] text-blue-700 block font-semibold">Anion (-1)</span>
                  <span className="font-bold text-blue-900 font-mono">{fractions.fAnion}%</span>
                </div>
              </div>
            </div>

            {/* Diagnostic Bac S2 */}
            <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-950 space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-amber-900">
                <Info className="w-4 h-4 text-amber-600 shrink-0" />
                Comportement Électrique selon le pH :
              </span>
              <p className="text-[11px] leading-relaxed">
                {currentPh < phAa.pHi - 0.5 ? (
                  <>
                    À pH = {currentPh.toFixed(2)} (&lt; pHi = {phAa.pHi.toFixed(2)}), l&apos;acide aminé est chargé
                    <strong> positivement</strong>. Dans un champ électrique, il migrera vers la <strong>Cathode (-)</strong>.
                  </>
                ) : currentPh > phAa.pHi + 0.5 ? (
                  <>
                    À pH = {currentPh.toFixed(2)} (&gt; pHi = {phAa.pHi.toFixed(2)}), l&apos;acide aminé est chargé
                    <strong> négativement</strong>. Dans un champ électrique, il migrera vers l&apos;<strong>Anode (+)</strong>.
                  </>
                ) : (
                  <>
                    À pH ≈ pHi = {phAa.pHi.toFixed(2)}, l&apos;amphion dipolaire est très largement majoritaire ({fractions.fZwitterion}%).
                    La charge nette globale est <strong>nulle</strong> : il ne migrera pas !
                  </>
                )}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ATELIER 3 : ÉLECTROPHORÈSE INTERACTIVE DES ACIDES AMINÉS */}
      {/* ======================================================== */}
      {activeTab === 'electrophorese' && (
        <div className="space-y-5 bg-surface rounded-2xl p-5 border border-navy/10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/10 pb-3">
            <div>
              <h4 className="text-sm font-bold text-navy uppercase tracking-wider">
                ⚡ Cuve d&apos;Électrophorèse sur Bande de Papier / Gel
              </h4>
              <p className="text-xs text-text/60">
                Séparation d&apos;un mélange d&apos;acides aminés (Asp, Ala, Lys) selon le pH du tampon électrolytique.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleRunElectrophoresis}
                disabled={isElectrophoresisRunning}
                className="flex items-center gap-1.5 py-2 px-3.5 rounded-xl bg-turquoise hover:bg-turquoise/90 text-white text-xs font-bold transition-all shadow-sm disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{isElectrophoresisRunning ? 'Migration en cours...' : 'Appliquer la Tension (U = 200 V)'}</span>
              </button>

              <button
                onClick={handleResetElectrophoresis}
                className="p-2 rounded-xl border border-navy/10 bg-white hover:bg-navy/5 text-navy transition-all"
                title="Réinitialiser"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Curseur de pH du tampon */}
          <div className="bg-white rounded-xl p-3 border border-navy/10 space-y-2">
            <div className="flex justify-between items-center text-xs font-semibold text-navy">
              <span>pH de la Solution Tampon dans la cuve :</span>
              <span className="font-mono text-turquoise font-bold text-sm">pH = {bufferPh.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min={1}
              max={12}
              step={0.5}
              value={bufferPh}
              onChange={(e) => {
                setBufferPh(Number(e.target.value));
                setHasRunElectrophoresis(false);
              }}
              className="w-full accent-turquoise cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-text/50 font-mono">
              <span>pH 1,0 (Très acide)</span>
              <span>pH 6,0 (Neutre)</span>
              <span>pH 12,0 (Très basique)</span>
            </div>
          </div>

          {/* Schéma de la bande de papier / gel SVG */}
          <div className="bg-white rounded-xl p-4 border border-navy/10 space-y-3">
            <div className="flex justify-between text-xs font-bold px-1">
              <span className="text-rose-700 flex items-center gap-1">
                <span>⊖</span> CATHODE (Pôle Négatif)
              </span>
              <span className="text-text/50">Ligne de dépôt au centre</span>
              <span className="text-blue-700 flex items-center gap-1">
                ANODE (Pôle Positif) <span>⊕</span>
              </span>
            </div>

            {/* Bande de papier avec spots */}
            <div className="relative h-28 bg-slate-100 rounded-xl border-2 border-slate-300 overflow-hidden">
              {/* Ligne médiane de dépôt pointillée */}
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 border-l-2 border-dashed border-slate-400 -translate-x-1/2 z-0" />
              <div className="absolute top-1 left-1/2 -translate-x-1/2 text-[9px] font-bold text-slate-500 bg-white/80 px-1 rounded">
                Dépôt initial
              </div>

              {/* Électrode Cathode (-) */}
              <div className="absolute top-0 bottom-0 left-0 w-3 bg-rose-500 flex items-center justify-center text-white text-[10px] font-bold">
                -
              </div>

              {/* Électrode Anode (+) */}
              <div className="absolute top-0 bottom-0 right-0 w-3 bg-blue-500 flex items-center justify-center text-white text-[10px] font-bold">
                +
              </div>

              {/* Spot 1 : Acide Aspartique (pHi = 2.77) */}
              <div
                className={`absolute top-4 -translate-x-1/2 transition-all duration-1000 flex flex-col items-center z-10`}
                style={{
                  left: hasRunElectrophoresis ? `${computePosition(AMINO_ACIDS[3], bufferPh)}%` : '50%',
                }}
              >
                <div className="w-5 h-5 rounded-full bg-rose-600 shadow-md border-2 border-white animate-pulse" />
                <span className="text-[10px] font-bold text-rose-900 mt-0.5 bg-white/90 px-1 rounded shadow-xs">
                  Asp (pHi 2,77)
                </span>
              </div>

              {/* Spot 2 : Alanine (pHi = 6.02) */}
              <div
                className={`absolute top-12 -translate-x-1/2 transition-all duration-1000 flex flex-col items-center z-10`}
                style={{
                  left: hasRunElectrophoresis ? `${computePosition(AMINO_ACIDS[1], bufferPh)}%` : '50%',
                }}
              >
                <div className="w-5 h-5 rounded-full bg-emerald-600 shadow-md border-2 border-white animate-pulse" />
                <span className="text-[10px] font-bold text-emerald-900 mt-0.5 bg-white/90 px-1 rounded shadow-xs">
                  Ala (pHi 6,02)
                </span>
              </div>

              {/* Spot 3 : Lysine (pHi = 9.74) */}
              <div
                className={`absolute top-20 -translate-x-1/2 transition-all duration-1000 flex flex-col items-center z-10`}
                style={{
                  left: hasRunElectrophoresis ? `${computePosition(AMINO_ACIDS[4], bufferPh)}%` : '50%',
                }}
              >
                <div className="w-5 h-5 rounded-full bg-purple-600 shadow-md border-2 border-white animate-pulse" />
                <span className="text-[10px] font-bold text-purple-900 mt-0.5 bg-white/90 px-1 rounded shadow-xs">
                  Lys (pHi 9,74)
                </span>
              </div>
            </div>

            {/* Tableau d'analyse des résultats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2 text-xs">
              {[AMINO_ACIDS[3], AMINO_ACIDS[1], AMINO_ACIDS[4]].map((aa) => {
                const diff = bufferPh - aa.pHi;
                let charge = '0 (Neutre)';
                let sens = 'Reste sur la ligne';
                let colorClass = 'text-emerald-700 bg-emerald-50 border-emerald-200';
                if (diff < -0.3) {
                  charge = '+1 (Cation)';
                  sens = 'Migre vers la Cathode (-)';
                  colorClass = 'text-rose-700 bg-rose-50 border-rose-200';
                } else if (diff > 0.3) {
                  charge = '-1 (Anion)';
                  sens = 'Migre vers l’Anode (+)';
                  colorClass = 'text-blue-700 bg-blue-50 border-blue-200';
                }

                return (
                  <div key={aa.id} className={`p-2.5 rounded-xl border ${colorClass} space-y-1`}>
                    <div className="flex justify-between font-bold">
                      <span>{aa.name} ({aa.symbol})</span>
                      <span className="font-mono">pHi = {aa.pHi}</span>
                    </div>
                    <div className="text-[11px] leading-tight space-y-0.5">
                      <p>Forme à pH {bufferPh.toFixed(1)} : <strong>{charge}</strong></p>
                      <p>Comportement : <strong>{sens}</strong></p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ATELIER 4 : CONDENSATION & LIAISON PEPTIDIQUE */}
      {/* ======================================================== */}
      {activeTab === 'peptides' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Colonne de gauche : Choix des 2 acides aminés */}
          <div className="lg:col-span-5 space-y-4 bg-surface rounded-2xl p-4 border border-navy/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy">
              🧬 Choisir les 2 Acides Aminés à Condenser
            </h4>

            {/* Acide aminé N-terminal (à gauche) */}
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-navy flex items-center justify-between">
                <span>Acide N-Terminal (Fournit -COOH) :</span>
                <span className="text-turquoise font-bold font-mono">Extrémité -NH₂ libre</span>
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {AMINO_ACIDS.slice(0, 3).map((aa) => (
                  <button
                    key={`n-${aa.id}`}
                    onClick={() => setNTermAa(aa)}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all ${
                      nTermAa.id === aa.id
                        ? 'bg-turquoise text-white border-turquoise shadow-xs'
                        : 'bg-white text-navy border-navy/10 hover:border-turquoise/40'
                    }`}
                  >
                    {aa.symbol}
                  </button>
                ))}
              </div>
            </div>

            {/* Acide aminé C-terminal (à droite) */}
            <div className="space-y-1.5 pt-2 border-t border-navy/10">
              <span className="text-xs font-semibold text-navy flex items-center justify-between">
                <span>Acide C-Terminal (Fournit -NH₂) :</span>
                <span className="text-gold font-bold font-mono">Extrémité -COOH libre</span>
              </span>
              <div className="grid grid-cols-3 gap-1.5">
                {AMINO_ACIDS.slice(0, 3).map((aa) => (
                  <button
                    key={`c-${aa.id}`}
                    onClick={() => setCTermAa(aa)}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all ${
                      cTermAa.id === aa.id
                        ? 'bg-gold text-white border-gold shadow-xs'
                        : 'bg-white text-navy border-navy/10 hover:border-gold/40'
                    }`}
                  >
                    {aa.symbol}
                  </button>
                ))}
              </div>
            </div>

            {/* Bouton d'inversion N-term / C-term */}
            <button
              onClick={() => {
                const temp = nTermAa;
                setNTermAa(cTermAa);
                setCTermAa(temp);
              }}
              className="w-full py-2 px-3 rounded-xl border border-navy/10 bg-white hover:bg-navy/5 text-xs font-bold text-navy flex items-center justify-center gap-2 transition-all"
            >
              <RefreshCw className="w-3.5 h-3.5 text-turquoise" />
              <span>Inverser l&apos;ordre : {cTermAa.symbol}-{nTermAa.symbol}</span>
            </button>

            {/* Les 4 dipeptides possibles */}
            <div className="p-3 bg-white rounded-xl border border-navy/10 space-y-1 text-xs">
              <span className="font-bold text-navy block">
                Rappel Bac S2 : 4 Dipeptides possibles avec 2 acides distincts :
              </span>
              <ul className="text-[11px] text-text/70 space-y-0.5 list-disc pl-4">
                <li>Homodipeptides : <strong>{nTermAa.symbol}-{nTermAa.symbol}</strong> et <strong>{cTermAa.symbol}-{cTermAa.symbol}</strong></li>
                <li>Hétérodipeptides isomères : <strong>{nTermAa.symbol}-{cTermAa.symbol}</strong> et <strong>{cTermAa.symbol}-{nTermAa.symbol}</strong></li>
              </ul>
            </div>
          </div>

          {/* Colonne de droite : Équation de condensation & Liaison Peptidique */}
          <div className="lg:col-span-7 bg-surface rounded-2xl p-5 border border-navy/10 space-y-4">
            <div className="flex items-center justify-between border-b border-navy/10 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-navy">
                Dipeptide Formé : {nTermAa.symbol}-{cTermAa.symbol}
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                1 Liaison Peptidique + H₂O
              </span>
            </div>

            {/* Équation de réaction avec MathRenderer */}
            <div className="bg-white rounded-xl p-4 border border-navy/10 text-center space-y-2">
              <span className="text-[10px] uppercase font-bold text-text/50 block">Équation-Bilan de Condensation</span>
              <MathRenderer
                content={`$$\\text{H}_2\\text{N}-\\text{CH}(${nTermAa.radicaR.replace('-', '')})-\\mathbf{CO-NH}-\\text{CH}(${cTermAa.radicaR.replace('-', '')})-\\text{COOH} + \\text{H}_2\\text{O}$$`}
              />
            </div>

            {/* Zoom sur la liaison peptidique plane */}
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-xs space-y-2">
              <span className="font-bold text-emerald-950 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                Caractéristiques Fondamentales de la Liaison Peptidique (-CO-NH-) :
              </span>
              <div className="space-y-1 text-emerald-900/90 text-[11px] leading-relaxed">
                <p>
                  1. <strong>Nature chimique</strong> : C&apos;est une fonction <strong>amide</strong> issue de l&apos;union du carboxyle et de l&apos;amine avec élimination d&apos;une molécule d&apos;eau.
                </p>
                <p>
                  2. <strong>Géométrie plane et rigide</strong> : En raison de la mésomérie (délocalisation du doublet libre de l&apos;azote vers le groupe carbonyle C=O), la liaison C-N présente un caractère partiel de double liaison (pas de rotation libre !).
                </p>
                <p>
                  3. <strong>Extrémités conventionnelles</strong> :
                  <br />
                  - À gauche : Extrémité <strong>N-terminale</strong> (-NH₂ libre sur {nTermAa.name}).
                  <br />
                  - À droite : Extrémité <strong>C-terminale</strong> (-COOH libre sur {cTermAa.name}).
                </p>
              </div>
            </div>

            {/* Stratégie de synthèse dirigée */}
            <div className="p-3 bg-white rounded-xl border border-navy/10 text-xs space-y-1.5">
              <span className="font-bold text-navy block">
                Stratégie de Synthèse Contrôlée au Bac (Pour obtenir uniquement {nTermAa.symbol}-{cTermAa.symbol}) :
              </span>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="p-2 rounded bg-surface border border-navy/10">
                  <span className="font-bold text-navy block">1. Acide {nTermAa.symbol} (N-term) :</span>
                  <span>Protéger la fonction <strong>-NH₂</strong>, puis activer la fonction <strong>-COOH</strong> (chlorure d&apos;acyle).</span>
                </div>
                <div className="p-2 rounded bg-surface border border-navy/10">
                  <span className="font-bold text-navy block">2. Acide {cTermAa.symbol} (C-term) :</span>
                  <span>Protéger la fonction <strong>-COOH</strong> (estérification) pour laisser son <strong>-NH₂</strong> réagir.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
