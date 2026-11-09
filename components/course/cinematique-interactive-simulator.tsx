'use client';

import React, { useState, useEffect, useRef } from 'react';
import MathRenderer from '@/components/course/math-renderer';
import {
  Compass,
  Gauge,
  Play,
  Pause,
  RotateCcw,
  Sliders,
  TrendingUp,
  AlertTriangle,
  Info,
  CheckCircle2,
  Zap,
  Activity,
  Layers,
} from 'lucide-react';

export default function CinematiqueInteractiveSimulator() {
  const [activeTab, setActiveTab] = useState<'trajectoire' | 'ter_mruv' | 'frenet_virage' | 'mcu'>('trajectoire');

  // ==========================================
  // ATELIER 1 : TRAJECTOIRE CURVILIGNE EN DIRECT
  // ==========================================
  const [trajType, setTrajType] = useState<'parabole' | 'droite' | 'sinus'>('parabole');
  const [timeT, setTimeT] = useState<number>(1.5);
  const [isPlayingTraj, setIsPlayingTraj] = useState<boolean>(false);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    if (isPlayingTraj) {
      const step = () => {
        setTimeT((prev) => {
          const next = prev + 0.02;
          return next > 4.0 ? 0 : next;
        });
        animRef.current = requestAnimationFrame(step);
      };
      animRef.current = requestAnimationFrame(step);
    } else if (animRef.current) {
      cancelAnimationFrame(animRef.current);
    }
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isPlayingTraj]);

  // Calculs cinématiques pour l'Atelier 1
  // Parabole : x = 2*t, y = -1.5*t^2 + 6*t
  // Droite : x = 2*t, y = 1.5*t
  // Sinus : x = 2*t, y = 3 + 2.5*sin(1.8*t)
  let posX = 0;
  let posY = 0;
  let vitX = 0;
  let vitY = 0;
  let accX = 0;
  let accY = 0;

  if (trajType === 'parabole') {
    posX = 2.0 * timeT;
    posY = -1.2 * timeT * timeT + 4.8 * timeT;
    vitX = 2.0;
    vitY = -2.4 * timeT + 4.8;
    accX = 0;
    accY = -2.4;
  } else if (trajType === 'droite') {
    posX = 2.0 * timeT;
    posY = 1.2 * timeT;
    vitX = 2.0;
    vitY = 1.2;
    accX = 0.0;
    accY = 0.0;
  } else {
    posX = 2.0 * timeT;
    posY = 2.5 + 2.0 * Math.sin(1.8 * timeT);
    vitX = 2.0;
    vitY = 3.6 * Math.cos(1.8 * timeT);
    accX = 0.0;
    accY = -6.48 * Math.sin(1.8 * timeT);
  }

  const vNorm = Math.sqrt(vitX * vitX + vitY * vitY);
  const aNorm = Math.sqrt(accX * accX + accY * accY);
  const prodScal = accX * vitX + accY * vitY;

  // Conversion SVG (largeur 320, hauteur 200)
  // X: [0, 8] -> [30, 290]
  // Y: [0, 6] -> [170, 30]
  const toSvgX = (x: number) => 30 + (x / 8.0) * 260;
  const toSvgY = (y: number) => 170 - (Math.max(0, y) / 6.0) * 140;

  // ==========================================
  // ATELIER 2 : TER DAKAR (MRU / MRUV / TORRICELLI)
  // ==========================================
  const [terV0KmH, setTerV0KmH] = useState<number>(120); // km/h
  const [terAcc, setTerAcc] = useState<number>(-1.5); // m/s^2 (décélération)
  const [terFinalV, setTerFinalV] = useState<number>(0); // arrêt complet

  const terV0Ms = terV0KmH / 3.6;
  const terVfMs = terFinalV / 3.6;

  // Distance de Torricelli : v2^2 - v1^2 = 2*a*d => d = (v2^2 - v1^2) / (2*a)
  const distanceTorricelli =
    Math.abs(terAcc) > 0.01 ? Math.abs((terVfMs * terVfMs - terV0Ms * terV0Ms) / (2 * terAcc)) : 0;
  const tempsArret = Math.abs(terAcc) > 0.01 ? Math.abs((terVfMs - terV0Ms) / terAcc) : 0;

  // ==========================================
  // ATELIER 3 : BASE DE FRENET & VIRAGE ROUTIER
  // ==========================================
  const [virageSpeedKmH, setVirageSpeedKmH] = useState<number>(60);
  const [virageRadiusM, setVirageRadiusM] = useState<number>(50);

  const virageSpeedMs = virageSpeedKmH / 3.6;
  const accNormale = (virageSpeedMs * virageSpeedMs) / virageRadiusM;
  const isDerivRisk = accNormale > 4.5; // risque de dérapage si > 4.5 m/s^2

  // ==========================================
  // ATELIER 4 : MOUVEMENT CIRCULAIRE (MCU)
  // ==========================================
  const [omegaRadS, setOmegaRadS] = useState<number>(2.0); // rad/s
  const [rayonCercle, setRayonCercle] = useState<number>(1.5); // mètres

  const vitLineaire = rayonCercle * omegaRadS;
  const accCentripete = rayonCercle * omegaRadS * omegaRadS;
  const periodeT = (2 * Math.PI) / omegaRadS;
  const frequenceF = omegaRadS / (2 * Math.PI);

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
              Laboratoire Virtuel de Mécanique : Cinématique du Point Matériel (Bac S2)
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-text/70">
            Vecteurs vitesse et accélération en temps réel, base de Frenet, simulateur de freinage du TER et cinématique circulaire.
          </p>
        </div>
        <span className="self-start sm:self-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
          Physique Terminale S2
        </span>
      </div>

      {/* Onglets des 4 Ateliers */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <button
          onClick={() => setActiveTab('trajectoire')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'trajectoire'
              ? 'bg-turquoise text-white shadow-md'
              : 'bg-surface hover:bg-navy/5 text-navy border border-navy/10'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>1. Vecteurs en Direct</span>
        </button>

        <button
          onClick={() => setActiveTab('ter_mruv')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'ter_mruv'
              ? 'bg-turquoise text-white shadow-md'
              : 'bg-surface hover:bg-navy/5 text-navy border border-navy/10'
          }`}
        >
          <Gauge className="w-4 h-4" />
          <span>2. TER (Torricelli MRUV)</span>
        </button>

        <button
          onClick={() => setActiveTab('frenet_virage')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'frenet_virage'
              ? 'bg-turquoise text-white shadow-md'
              : 'bg-surface hover:bg-navy/5 text-navy border border-navy/10'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>3. Base de Frenet (Virage)</span>
        </button>

        <button
          onClick={() => setActiveTab('mcu')}
          className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'mcu'
              ? 'bg-turquoise text-white shadow-md'
              : 'bg-surface hover:bg-navy/5 text-navy border border-navy/10'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>4. Mouvement Circulaire</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* ATELIER 1 : TRAJECTOIRE CURVILIGNE & VECTEURS EN DIRECT */}
      {/* ======================================================== */}
      {activeTab === 'trajectoire' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Colonne de gauche : Contrôles & Métriques instantanées */}
          <div className="lg:col-span-5 space-y-4 bg-surface rounded-2xl p-4 border border-navy/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy">
              🕹️ Paramètres du Mouvement
            </h4>

            {/* Type de trajectoire */}
            <div className="space-y-1">
              <span className="text-xs font-semibold text-navy">Choisir la trajectoire :</span>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'parabole', label: 'Parabole' },
                  { id: 'droite', label: 'Droite (MRU)' },
                  { id: 'sinus', label: 'Sinusoïde' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setTrajType(item.id as any);
                      setTimeT(1.0);
                    }}
                    className={`py-2 px-1 text-center rounded-xl text-xs font-bold border transition-all ${
                      trajType === item.id
                        ? 'bg-turquoise text-white border-turquoise shadow-xs'
                        : 'bg-white text-navy border-navy/10 hover:border-turquoise/40'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Slider de temps t avec bouton Play/Pause */}
            <div className="space-y-2 pt-2 border-t border-navy/10">
              <div className="flex justify-between items-center text-xs font-semibold text-navy">
                <span className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsPlayingTraj(!isPlayingTraj)}
                    className="p-1.5 rounded-lg bg-turquoise text-white hover:bg-turquoise/90 transition-all"
                  >
                    {isPlayingTraj ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                  <span>Temps :</span>
                </span>
                <span className="font-mono text-turquoise font-bold text-sm">t = {timeT.toFixed(2)} s</span>
              </div>
              <input
                type="range"
                min={0}
                max={4.0}
                step={0.05}
                value={timeT}
                onChange={(e) => setTimeT(Number(e.target.value))}
                className="w-full accent-turquoise cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-text/50 font-mono">
                <span>t = 0 s</span>
                <span>t = 2 s</span>
                <span>t = 4 s</span>
              </div>
            </div>

            {/* Diagnostic nature du mouvement (a⃗ · v⃗) */}
            <div
              className={`p-3 rounded-xl border text-xs space-y-1 ${
                Math.abs(prodScal) < 0.1
                  ? 'bg-blue-50 border-blue-200 text-blue-950'
                  : prodScal > 0
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-rose-50 border-rose-200 text-rose-950'
              }`}
            >
              <div className="flex items-center justify-between font-bold">
                <span>Test du Produit Scalaire a⃗ · v⃗ :</span>
                <span className="font-mono">
                  {prodScal > 0 ? `+${prodScal.toFixed(2)}` : prodScal.toFixed(2)} W/kg
                </span>
              </div>
              <p className="text-[11px] leading-tight font-medium">
                {Math.abs(prodScal) < 0.1
                  ? '⚡ a⃗ · v⃗ ≈ 0 ⟹ Mouvement uniforme (la norme de la vitesse reste constante).'
                  : prodScal > 0
                  ? '✅ a⃗ · v⃗ > 0 ⟹ Mouvement ACCÉLÉRÉ (vitesse en augmentation).'
                  : '⚠️ a⃗ · v⃗ < 0 ⟹ Mouvement RETARDÉ / DÉCÉLÉRÉ (vitesse en diminution).'}
              </p>
            </div>

            {/* Coordonnées & Grandeurs scalaires */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-navy/10 space-y-0.5">
                <span className="text-[10px] text-text/50 block font-semibold">Position M(t) :</span>
                <p className="font-mono font-bold text-navy">
                  x = {posX.toFixed(2)} m
                  <br />
                  y = {posY.toFixed(2)} m
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-white border border-navy/10 space-y-0.5">
                <span className="text-[10px] text-text/50 block font-semibold">Norme de la Vitesse :</span>
                <p className="font-mono font-bold text-turquoise text-sm">
                  v = {vNorm.toFixed(2)} m·s⁻¹
                </p>
                <span className="text-[9px] text-text/40 font-mono">
                  {(vNorm * 3.6).toFixed(1)} km/h
                </span>
              </div>
            </div>
          </div>

          {/* Colonne de droite : Visualisation graphique SVG de la trajectoire */}
          <div className="lg:col-span-7 bg-surface rounded-2xl p-5 border border-navy/10 space-y-4">
            <div className="flex items-center justify-between border-b border-navy/10 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-navy">
                Affichage Graphique en Temps Réel
              </span>
              <div className="flex items-center gap-3 text-[11px] font-semibold">
                <span className="text-turquoise flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-turquoise inline-block" /> v⃗ (Vitesse)
                </span>
                <span className="text-rose-500 flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> a⃗ (Accélération)
                </span>
              </div>
            </div>

            {/* Tracé SVG interactif */}
            <div className="bg-white rounded-xl p-3 border border-navy/10 flex flex-col items-center">
              <svg viewBox="0 0 320 200" className="w-full h-56 drop-shadow-xs">
                {/* Grille millimétrée subtile */}
                <defs>
                  <pattern id="grid" width="26" height="23.3" patternUnits="userSpaceOnUse">
                    <path d="M 26 0 L 0 0 0 23.3" fill="none" stroke="#F1F5F9" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="320" height="200" fill="url(#grid)" />

                {/* Axes cartésiens Ox et Oy */}
                <line x1="20" y1="170" x2="305" y2="170" stroke="#0F172A" strokeWidth="1.5" />
                <polygon points="305,167 312,170 305,173" fill="#0F172A" />
                <text x="300" y="185" fill="#64748B" fontSize="9" fontWeight="bold">x (m)</text>

                <line x1="30" y1="180" x2="30" y2="15" stroke="#0F172A" strokeWidth="1.5" />
                <polygon points="27,15 30,8 33,15" fill="#0F172A" />
                <text x="18" y="16" fill="#64748B" fontSize="9" fontWeight="bold">y (m)</text>

                {/* Trajectoire statique complète en pointillé */}
                {trajType === 'parabole' && (
                  <path
                    d={`M ${toSvgX(0)} ${toSvgY(0)} Q ${toSvgX(2.0)} ${toSvgY(4.8 * 2)}, ${toSvgX(4.0 * 2)} ${toSvgY(0)}`}
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="2"
                    strokeDasharray="4 3"
                  />
                )}
                {trajType === 'droite' && (
                  <line
                    x1={toSvgX(0)}
                    y1={toSvgY(0)}
                    x2={toSvgX(8)}
                    y2={toSvgY(4.8)}
                    stroke="#94A3B8"
                    strokeWidth="2"
                    strokeDasharray="4 3"
                  />
                )}
                {trajType === 'sinus' && (
                  <path
                    d={Array.from({ length: 41 }, (_, i) => {
                      const t = (i / 40) * 4.0;
                      const x = toSvgX(2.0 * t);
                      const y = toSvgY(2.5 + 2.0 * Math.sin(1.8 * t));
                      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
                    }).join(' ')}
                    fill="none"
                    stroke="#94A3B8"
                    strokeWidth="2"
                    strokeDasharray="4 3"
                  />
                )}

                {/* Point matériel mobile M(t) */}
                <circle cx={toSvgX(posX)} cy={toSvgY(posY)} r="6" fill="#00B8A9" stroke="#0F172A" strokeWidth="2" />
                <text x={toSvgX(posX) - 4} y={toSvgY(posY) - 10} fontSize="11" fontWeight="bold" fill="#0F172A">
                  M
                </text>

                {/* Vecteur Vitesse instantané v⃗ (échelle x10 pour visibilité) */}
                <line
                  x1={toSvgX(posX)}
                  y1={toSvgY(posY)}
                  x2={toSvgX(posX) + vitX * 10}
                  y2={toSvgY(posY) - vitY * 10}
                  stroke="#00B8A9"
                  strokeWidth="3"
                />
                <circle
                  cx={toSvgX(posX) + vitX * 10}
                  cy={toSvgY(posY) - vitY * 10}
                  r="2.5"
                  fill="#00B8A9"
                />

                {/* Vecteur Accélération a⃗ (échelle x8) */}
                {aNorm > 0.1 && (
                  <line
                    x1={toSvgX(posX)}
                    y1={toSvgY(posY)}
                    x2={toSvgX(posX) + accX * 8}
                    y2={toSvgY(posY) - accY * 8}
                    stroke="#F43F5E"
                    strokeWidth="2.5"
                  />
                )}
              </svg>
            </div>

            {/* Formules KaTeX dynamiques */}
            <div className="p-3 bg-white rounded-xl border border-navy/10 text-center text-xs space-y-1">
              <span className="text-[10px] text-text/50 font-bold uppercase tracking-wider block">
                Équations Horaires Analytiques
              </span>
              <MathRenderer
                content={
                  trajType === 'parabole'
                    ? '$$x(t) = 2{,}0\\,t \\quad ; \\quad y(t) = -1{,}2\\,t^2 + 4{,}8\\,t \\implies y(x) = -0{,}3\\,x^2 + 2{,}4\\,x$$'
                    : trajType === 'droite'
                    ? '$$x(t) = 2{,}0\\,t \\quad ; \\quad y(t) = 1{,}2\\,t \\implies y(x) = 0{,}6\\,x \\quad (\\text{Droite MRU})$$'
                    : '$$x(t) = 2{,}0\\,t \\quad ; \\quad y(t) = 2{,}5 + 2{,}0\\,\\sin(1{,}8\\,t) \\quad (\\text{Oscillateur})$$'
                }
              />
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ATELIER 2 : TER DAKAR-DIAMNIADIO (TORRICELLI & MRUV) */}
      {/* ======================================================== */}
      {activeTab === 'ter_mruv' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 space-y-4 bg-surface rounded-2xl p-4 border border-navy/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy">
              🚄 Paramètres du Freinage du TER
            </h4>

            {/* Vitesse initiale v0 */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-navy">
                <span>Vitesse Initiale (v₁) :</span>
                <span className="font-mono font-bold text-turquoise">
                  {terV0KmH} km/h ({terV0Ms.toFixed(1)} m·s⁻¹)
                </span>
              </div>
              <input
                type="range"
                min={40}
                max={160}
                step={10}
                value={terV0KmH}
                onChange={(e) => setTerV0KmH(Number(e.target.value))}
                className="w-full accent-turquoise cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-text/50 font-mono">
                <span>40 km/h</span>
                <span>120 km/h</span>
                <span>160 km/h (Vitesse max TER)</span>
              </div>
            </div>

            {/* Accélération / Décélération */}
            <div className="space-y-1.5 pt-2 border-t border-navy/10">
              <div className="flex justify-between text-xs font-semibold text-navy">
                <span>Décélération de freinage (a) :</span>
                <span className="font-mono font-bold text-rose-600">{terAcc.toFixed(2)} m·s⁻²</span>
              </div>
              <input
                type="range"
                min={-3.0}
                max={-0.5}
                step={0.1}
                value={terAcc}
                onChange={(e) => setTerAcc(Number(e.target.value))}
                className="w-full accent-rose-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-text/50 font-mono">
                <span>-3,0 m·s⁻² (Urgence)</span>
                <span>-1,5 m·s⁻² (Normal)</span>
                <span>-0,5 m·s⁻² (Doux)</span>
              </div>
            </div>

            {/* Résumé de Torricelli */}
            <div className="bg-white rounded-xl p-3 border border-navy/10 space-y-2 text-xs">
              <span className="font-bold text-navy block">Résultats du Calcul de Torricelli :</span>
              <div className="flex justify-between border-b border-navy/5 pb-1">
                <span className="text-text/60">Distance d&apos;arrêt (d) :</span>
                <span className="font-mono font-black text-rose-600 text-sm">
                  {distanceTorricelli.toFixed(1)} m
                </span>
              </div>
              <div className="flex justify-between border-b border-navy/5 pb-1">
                <span className="text-text/60">Temps de freinage (t) :</span>
                <span className="font-mono font-bold text-navy">{tempsArret.toFixed(1)} s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text/60">Nature du mouvement :</span>
                <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-[11px]">
                  MRUV Retardé (a · v &lt; 0)
                </span>
              </div>
            </div>
          </div>

          {/* Colonne de droite : Animation des rails & Formules */}
          <div className="lg:col-span-7 bg-surface rounded-2xl p-5 border border-navy/10 space-y-4">
            <div className="flex items-center justify-between border-b border-navy/10 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-navy">
                Gare de Rufisque : Distance d&apos;Arrêt
              </span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                Torricelli : v₂² - v₁² = 2·a·d
              </span>
            </div>

            {/* Schéma de voie ferrée SVG */}
            <div className="bg-white rounded-xl p-4 border border-navy/10 flex flex-col items-center">
              <svg viewBox="0 0 340 130" className="w-full h-36">
                {/* Rails du train */}
                <line x1="20" y1="80" x2="320" y2="80" stroke="#475569" strokeWidth="4" />
                <line x1="20" y1="92" x2="320" y2="92" stroke="#475569" strokeWidth="4" />

                {/* Traverses en bois */}
                {Array.from({ length: 25 }, (_, i) => (
                  <line
                    key={i}
                    x1={25 + i * 12}
                    y1={75}
                    x2={25 + i * 12}
                    y2={97}
                    stroke="#D97706"
                    strokeWidth="3"
                  />
                ))}

                {/* Rame de TER stylisée */}
                <rect x="40" y="45" width="85" height="32" rx="6" fill="#00B8A9" stroke="#0F172A" strokeWidth="2" />
                <rect x="105" y="50" width="16" height="14" rx="2" fill="#E2E8F0" />
                <rect x="75" y="50" width="22" height="14" rx="2" fill="#E2E8F0" />
                <rect x="48" y="50" width="20" height="14" rx="2" fill="#E2E8F0" />
                <circle cx="58" cy="80" r="5" fill="#334155" />
                <circle cx="108" cy="80" r="5" fill="#334155" />
                <text x="75" y="72" fill="#FFFFFF" fontSize="7" fontWeight="bold">
                  TER DAKAR
                </text>

                {/* Point d'arrêt final du train */}
                <line x1="280" y1="35" x2="280" y2="105" stroke="#EF4444" strokeWidth="2.5" strokeDasharray="4 2" />
                <text x="280" y="30" fill="#EF4444" fontSize="9" fontWeight="bold" textAnchor="middle">
                  Arrêt Gare
                </text>

                {/* Flèche de distance Torricelli */}
                <line x1="40" y1="115" x2="280" y2="115" stroke="#0F172A" strokeWidth="1.5" />
                <polygon points="40,112 34,115 40,118" fill="#0F172A" />
                <polygon points="280,112 286,115 280,118" fill="#0F172A" />
                <text x="160" y="112" fill="#0F172A" fontSize="9" fontWeight="bold" textAnchor="middle">
                  d = {distanceTorricelli.toFixed(1)} mètres
                </text>
              </svg>
            </div>

            {/* Équation détaillée */}
            <div className="p-3 bg-white rounded-xl border border-navy/10 text-center text-xs space-y-1">
              <span className="text-[10px] text-text/50 font-bold uppercase tracking-wider block">
                Démonstration Officielle Bac S2
              </span>
              <MathRenderer
                content={`$$0^2 - (${terV0Ms.toFixed(1)})^2 = 2 \\times (${terAcc.toFixed(1)}) \\times d \\implies d = \\frac{-(${terV0Ms.toFixed(1)})^2}{2 \\times (${terAcc.toFixed(1)})} = \\mathbf{${distanceTorricelli.toFixed(1)}\\text{ m}}$$`}
              />
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ATELIER 3 : BASE DE FRENET DANS UN VIRAGE ROUTIER */}
      {/* ======================================================== */}
      {activeTab === 'frenet_virage' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 space-y-4 bg-surface rounded-2xl p-4 border border-navy/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy">
              🏎️ Virage à l&apos;Échangeur Aliou Ardo Sow
            </h4>

            {/* Vitesse du véhicule */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-navy">
                <span>Vitesse dans le virage (v) :</span>
                <span className="font-mono font-bold text-turquoise">
                  {virageSpeedKmH} km/h ({virageSpeedMs.toFixed(1)} m·s⁻¹)
                </span>
              </div>
              <input
                type="range"
                min={20}
                max={120}
                step={5}
                value={virageSpeedKmH}
                onChange={(e) => setVirageSpeedKmH(Number(e.target.value))}
                className="w-full accent-turquoise cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-text/50 font-mono">
                <span>20 km/h</span>
                <span>60 km/h</span>
                <span>120 km/h</span>
              </div>
            </div>

            {/* Rayon du virage */}
            <div className="space-y-1.5 pt-2 border-t border-navy/10">
              <div className="flex justify-between text-xs font-semibold text-navy">
                <span>Rayon de courbure du virage (R = ρ) :</span>
                <span className="font-mono font-bold text-navy">{virageRadiusM} m</span>
              </div>
              <input
                type="range"
                min={20}
                max={150}
                step={10}
                value={virageRadiusM}
                onChange={(e) => setVirageRadiusM(Number(e.target.value))}
                className="w-full accent-navy cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-text/50 font-mono">
                <span>20 m (Virage serré)</span>
                <span>80 m</span>
                <span>150 m (Virage large)</span>
              </div>
            </div>

            {/* Voyant de sécurité / adhérence des pneus */}
            <div
              className={`p-3.5 rounded-xl border text-xs space-y-1 ${
                isDerivRisk
                  ? 'bg-rose-50 border-rose-300 text-rose-950'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-950'
              }`}
            >
              <div className="flex items-center gap-1.5 font-bold">
                {isDerivRisk ? (
                  <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                )}
                <span>
                  {isDerivRisk ? 'DANGER : Risque Majeur de Dérapage !' : 'Adhérence Parfaite des Pneus'}
                </span>
              </div>
              <p className="text-[11px] leading-relaxed">
                {isDerivRisk
                  ? `L'accélération normale aₙ = ${accNormale.toFixed(2)} m·s⁻² dépasse la limite d'adhérence des pneus (4,5 m·s⁻²). Le véhicule risque de quitter la route ! Réduisez la vitesse.`
                  : `L'accélération centripète aₙ = ${accNormale.toFixed(2)} m·s⁻² est modérée. Les forces de frottement de la chaussée maintiennent le véhicule sur sa trajectoire.`}
              </p>
            </div>
          </div>

          {/* Colonne de droite : Schéma vectoriel Frenet */}
          <div className="lg:col-span-7 bg-surface rounded-2xl p-5 border border-navy/10 space-y-4">
            <div className="flex items-center justify-between border-b border-navy/10 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-navy">
                Accélération Normale : aₙ = v² / R
              </span>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-navy/5 text-navy">
                aₙ = {accNormale.toFixed(2)} m·s⁻²
              </span>
            </div>

            {/* Tracé SVG de l'arc de virage */}
            <div className="bg-white rounded-xl p-3 border border-navy/10 flex flex-col items-center">
              <svg viewBox="0 0 300 200" className="w-full h-52">
                {/* Arc de route */}
                <path
                  d="M 30 180 A 130 130 0 0 1 270 180"
                  fill="none"
                  stroke="#334155"
                  strokeWidth="28"
                  strokeLinecap="round"
                />
                <path
                  d="M 30 180 A 130 130 0 0 1 270 180"
                  fill="none"
                  stroke="#F8FAFC"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                />

                {/* Centre du virage C */}
                <circle cx="150" cy="180" r="4" fill="#F59E0B" />
                <text x="150" y="195" fill="#B45309" fontSize="9" fontWeight="bold" textAnchor="middle">
                  Centre C (ρ = {virageRadiusM} m)
                </text>

                {/* Véhicule au sommet du virage */}
                <circle cx="150" cy="50" r="7" fill="#0F172A" stroke="#FFFFFF" strokeWidth="2" />

                {/* Vecteur vitesse v tangentiel */}
                <line x1="150" y1="50" x2="220" y2="50" stroke="#00B8A9" strokeWidth="3" />
                <polygon points="220,47 228,50 220,53" fill="#00B8A9" />
                <text x="215" y="42" fill="#00B8A9" fontSize="10" fontWeight="bold">
                  v⃗ ({virageSpeedKmH} km/h)
                </text>

                {/* Vecteur accélération centripète an vers le centre */}
                <line
                  x1="150"
                  y1="50"
                  x2="150"
                  y2={50 + Math.min(80, accNormale * 8)}
                  stroke="#EF4444"
                  strokeWidth="3"
                />
                <polygon
                  points={`147,${50 + Math.min(80, accNormale * 8)} 150,${
                    56 + Math.min(80, accNormale * 8)
                  } 153,${50 + Math.min(80, accNormale * 8)}`}
                  fill="#EF4444"
                />
                <text x="156" y="90" fill="#EF4444" fontSize="10" fontWeight="bold">
                  a⃗ₙ ({accNormale.toFixed(1)} m·s⁻²)
                </text>
              </svg>
            </div>

            {/* Équation KaTeX */}
            <div className="p-3 bg-white rounded-xl border border-navy/10 text-center text-xs space-y-1">
              <span className="text-[10px] text-text/50 font-bold uppercase tracking-wider block">
                Formule de Frenet Appliquée
              </span>
              <MathRenderer
                content={`$$a_n = \\frac{v^2}{R} = \\frac{(${virageSpeedMs.toFixed(1)})^2}{${virageRadiusM}} = \\mathbf{${accNormale.toFixed(2)}\\text{ m}\\cdot\\text{s}^{-2}} \\quad (a_t = 0 \\text{ si } v = \\text{cte})$$`}
              />
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* ATELIER 4 : MOUVEMENT CIRCULAIRE UNIFORME (MCU) */}
      {/* ======================================================== */}
      {activeTab === 'mcu' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-5 space-y-4 bg-surface rounded-2xl p-4 border border-navy/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-navy">
              🎡 Grande Roue &amp; Mouvement Circulaire
            </h4>

            {/* Vitesse angulaire omega */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-navy">
                <span>Vitesse Angulaire (ω) :</span>
                <span className="font-mono font-bold text-turquoise">{omegaRadS.toFixed(2)} rad/s</span>
              </div>
              <input
                type="range"
                min={0.5}
                max={5.0}
                step={0.25}
                value={omegaRadS}
                onChange={(e) => setOmegaRadS(Number(e.target.value))}
                className="w-full accent-turquoise cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-text/50 font-mono">
                <span>0,5 rad/s</span>
                <span>2,5 rad/s</span>
                <span>5,0 rad/s</span>
              </div>
            </div>

            {/* Rayon de rotation */}
            <div className="space-y-1.5 pt-2 border-t border-navy/10">
              <div className="flex justify-between text-xs font-semibold text-navy">
                <span>Rayon de la trajectoire (R) :</span>
                <span className="font-mono font-bold text-navy">{rayonCercle.toFixed(2)} m</span>
              </div>
              <input
                type="range"
                min={0.5}
                max={3.0}
                step={0.25}
                value={rayonCercle}
                onChange={(e) => setRayonCercle(Number(e.target.value))}
                className="w-full accent-navy cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-text/50 font-mono">
                <span>0,5 m</span>
                <span>1,5 m</span>
                <span>3,0 m</span>
              </div>
            </div>

            {/* Métriques du MCU */}
            <div className="bg-white rounded-xl p-3 border border-navy/10 space-y-2 text-xs">
              <div className="flex justify-between border-b border-navy/5 pb-1">
                <span className="text-text/60">Vitesse linéaire (v = R·ω) :</span>
                <span className="font-mono font-bold text-turquoise">{vitLineaire.toFixed(2)} m·s⁻¹</span>
              </div>
              <div className="flex justify-between border-b border-navy/5 pb-1">
                <span className="text-text/60">Accélération centripète (aₙ) :</span>
                <span className="font-mono font-bold text-rose-600">{accCentripete.toFixed(2)} m·s⁻²</span>
              </div>
              <div className="flex justify-between border-b border-navy/5 pb-1">
                <span className="text-text/60">Période (T = 2π/ω) :</span>
                <span className="font-mono font-bold text-navy">{periodeT.toFixed(2)} s (1 tour)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text/60">Fréquence (f = 1/T) :</span>
                <span className="font-mono font-bold text-navy">{frequenceF.toFixed(2)} Hz (tours/s)</span>
              </div>
            </div>
          </div>

          {/* Colonne de droite : Dessin animé du cercle de rotation */}
          <div className="lg:col-span-7 bg-surface rounded-2xl p-5 border border-navy/10 space-y-4">
            <div className="flex items-center justify-between border-b border-navy/10 pb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-navy">
                Trajectoire Circulaire &amp; Accélération Purement Centripète
              </span>
              <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                aₜ = 0 &amp; aₙ = R·ω²
              </span>
            </div>

            {/* Animation SVG du cercle */}
            <div className="bg-white rounded-xl p-3 border border-navy/10 flex flex-col items-center">
              <svg viewBox="0 0 240 200" className="w-56 h-48">
                {/* Cercle trajectoire */}
                <circle cx="120" cy="100" r="70" fill="none" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="3 3" />
                <circle cx="120" cy="100" r="3" fill="#0F172A" />
                <text x="120" y="115" fill="#64748B" fontSize="9" fontWeight="bold" textAnchor="middle">
                  O
                </text>

                {/* Rayon */}
                <line x1="120" y1="100" x2="190" y2="100" stroke="#64748B" strokeWidth="1.5" />
                <text x="155" y="95" fill="#64748B" fontSize="8" fontWeight="bold">
                  R
                </text>

                {/* Mobile M en position (120+70*cos, 100-70*sin) */}
                <circle cx="169.5" cy="50.5" r="6" fill="#00B8A9" stroke="#0F172A" strokeWidth="2" />
                <text x="175" y="45" fill="#0F172A" fontSize="10" fontWeight="bold">
                  M
                </text>

                {/* Vecteur vitesse v tangentiel */}
                <line x1="169.5" y1="50.5" x2="135" y2="16" stroke="#00B8A9" strokeWidth="2.5" />
                <polygon points="135,13 128,18 138,20" fill="#00B8A9" />
                <text x="115" y="16" fill="#00B8A9" fontSize="9" fontWeight="bold">
                  v⃗
                </text>

                {/* Vecteur accélération an centripète (vers le centre O) */}
                <line x1="169.5" y1="50.5" x2="135" y2="85" stroke="#F43F5E" strokeWidth="2.5" />
                <polygon points="138,82 130,90 133,80" fill="#F43F5E" />
                <text x="145" y="75" fill="#F43F5E" fontSize="9" fontWeight="bold">
                  a⃗ₙ
                </text>
              </svg>
            </div>

            {/* Note pédagogique Bac S2 */}
            <div className="p-3 bg-white rounded-xl border border-navy/10 text-center text-xs space-y-1">
              <span className="text-[10px] text-text/50 font-bold uppercase tracking-wider block">
                Conclusion Capitale du Bac S2
              </span>
              <MathRenderer
                content={`$$\\vec{a} = \\frac{v^2}{R}\\,\\vec{u}_n = R\\,\\omega^2\\,\\vec{u}_n \\implies \\mathbf{\\|\\vec{a}\\| = ${accCentripete.toFixed(2)}\\text{ m}\\cdot\\text{s}^{-2}}$$`}
              />
              <p className="text-[11px] text-text/70 mt-1">
                La vitesse conserve une norme constante ({vitLineaire.toFixed(2)} m·s⁻¹), mais sa direction tourne constamment vers le centre !
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
