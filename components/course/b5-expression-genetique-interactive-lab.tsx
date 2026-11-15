'use client';

import React, { useState } from 'react';
import {
  Dna,
  Layers,
  Activity,
  CheckCircle2,
  AlertCircle,
  FlaskConical,
  ChevronRight,
  Shield,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

type DogmeStep = 'adn' | 'transcription' | 'arnm' | 'traduction';
type MeselsonGen = 'G0' | 'G1' | 'G2' | 'G3';

export default function B5ExpressionGenetiqueInteractiveLab() {
  const [activeStep, setActiveStep] = useState<DogmeStep>('transcription');
  const [selectedGen, setSelectedGen] = useState<MeselsonGen>('G1');
  const [selectedMutation, setSelectedMutation] = useState<'normale' | 'drepanocytose' | 'non_sens'>('normale');

  return (
    <div className="my-10 rounded-3xl bg-white border border-navy/10 p-5 sm:p-7 shadow-sm">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/10 pb-4 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-navy/5 px-3 py-1 text-xs font-bold text-navy mb-1 border border-navy/10">
            <FlaskConical className="w-3.5 h-3.5 text-turquoise" />
            <span>Laboratoire Virtuel de Biologie Moléculaire</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-navy">
            Expression des Gènes, Réplication &amp; Code Génétique
          </h3>
          <p className="text-xs sm:text-sm text-text/70 mt-0.5">
            Schémas moléculaires animés : dogme central, expérience de Meselson-Stahl et impact d’une mutation faux-sens (HbA vs HbS).
          </p>
        </div>
      </div>

      {/* MODULE 1 : Le Dogme Central de la Biologie Moléculaire */}
      <div className="mb-8 rounded-2xl border border-navy/10 bg-surface/30 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-navy/10 pb-3 mb-5">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-turquoise" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-text/50">Module 1</span>
            <h4 className="text-base sm:text-lg font-black text-navy">
              Le Dogme Central : ADN → Transcription → ARNm → Traduction → Protéine
            </h4>
          </div>
          <span className="text-xs text-text/60 font-semibold">Flux d’information génétique</span>
        </div>

        {/* Boutons d'étapes */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 mb-5">
          {[
            { key: 'adn', label: '1. ADN Bicaténaire', desc: 'Structure en double hélice' },
            { key: 'transcription', label: '2. Transcription', desc: 'ARN polymérase & ARNm' },
            { key: 'arnm', label: '3. ARNm & Codons', desc: 'Épissage & Maturation' },
            { key: 'traduction', label: '4. Traduction', desc: 'Ribosome & Polypeptide' },
          ].map((s) => (
            <button
              key={s.key}
              onClick={() => setActiveStep(s.key as DogmeStep)}
              className={`rounded-2xl p-3 text-left transition-all border ${
                activeStep === s.key
                  ? 'bg-navy text-white border-navy shadow-sm'
                  : 'bg-white text-navy/80 border-navy/10 hover:bg-surface'
              }`}
            >
              <span className="block text-xs font-bold leading-tight">{s.label}</span>
              <span className="text-[10px] opacity-75 mt-0.5 block truncate">{s.desc}</span>
            </button>
          ))}
        </div>

        {/* Schéma SVG Interactif du Dogme Central */}
        <div className="rounded-2xl border border-navy/10 bg-white p-4 mb-4 shadow-xs">
          <div className="text-[10px] font-bold uppercase tracking-wider text-text/50 mb-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Dna className="w-3.5 h-3.5 text-turquoise" />
              <span>Schéma moléculaire vectoriel — {activeStep.toUpperCase()}</span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-navy/5 text-navy border border-navy/10">
              Noyau → Cytoplasme
            </span>
          </div>

          <svg viewBox="0 0 500 220" className="w-full max-w-xl mx-auto" aria-label="Dogme central de la biologie moléculaire">
            {/* Ligne de séparation Noyau / Cytoplasme */}
            <line x1="260" y1="10" x2="260" y2="210" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3"/>
            <text x="130" y="22" textAnchor="middle" fontSize="8" fill="#475569" fontWeight="bold">NOYAU CELLULAIRE</text>
            <text x="380" y="22" textAnchor="middle" fontSize="8" fill="#475569" fontWeight="bold">CYTOPLASME (Ribosomes)</text>

            {/* Brin d'ADN double hélice */}
            <path d="M20,60 Q80,45 140,60 T240,60" fill="none" stroke="#2563eb" strokeWidth="2.5"/>
            <path d="M20,75 Q80,90 140,75 T240,75" fill="none" stroke="#0284c7" strokeWidth="2.5"/>
            <text x="15" y="55" fontSize="7" fill="#2563eb" fontWeight="bold">5’</text>
            <text x="245" y="55" fontSize="7" fill="#2563eb" fontWeight="bold">3’</text>
            <text x="15" y="85" fontSize="7" fill="#0284c7" fontWeight="bold">3’</text>
            <text x="245" y="85" fontSize="7" fill="#0284c7" fontWeight="bold">5’</text>

            {/* Liaisons hydrogène */}
            {[40, 60, 80, 100, 120, 140, 160, 180, 200, 220].map((x, i) => (
              <line key={i} x1={x} y1="62" x2={x} y2="73" stroke="#cbd5e1" strokeWidth="1.5"/>
            ))}
            <text x="130" y="95" textAnchor="middle" fontSize="7" fill="#0a1628">ADN Bicaténaire antiparallèle</text>

            {/* ARN Polymérase (bulle de transcription) */}
            <ellipse cx="140" cy="135" rx="36" ry="24" fill="#f0fdfb" stroke="#00c4b4" strokeWidth="2"/>
            <text x="140" y="132" textAnchor="middle" fontSize="7" fill="#0a1628" fontWeight="bold">ARN Polymérase</text>
            <text x="140" y="142" textAnchor="middle" fontSize="6" fill="#00c4b4">Transcription</text>

            {/* Brin d'ARNm naissant */}
            <path d="M120,148 Q180,165 240,140 Q260,130 280,135" fill="none" stroke="#be185d" strokeWidth="2.5"/>
            <text x="285" y="132" fontSize="7" fill="#be185d" fontWeight="bold">ARNm 5’→3’</text>

            {/* Pore nucléaire */}
            <rect x="256" y="125" width="8" height="20" rx="2" fill="#64748b"/>
            <text x="260" y="155" textAnchor="middle" fontSize="6" fill="#64748b">Pore</text>

            {/* Ribosome dans le cytoplasme */}
            <g transform="translate(320, 90)">
              {/* Grande sous-unité */}
              <ellipse cx="60" cy="35" rx="42" ry="28" fill="#fef3c7" stroke="#b45309" strokeWidth="2"/>
              <text x="60" y="25" textAnchor="middle" fontSize="7" fill="#b45309" fontWeight="bold">Grande Sous-Unité</text>
              {/* Petite sous-unité */}
              <ellipse cx="60" cy="68" rx="36" ry="18" fill="#fef9c3" stroke="#b45309" strokeWidth="1.5"/>
              <text x="60" y="72" textAnchor="middle" fontSize="6.5" fill="#b45309">Petite Sous-Unité</text>

              {/* Sites A et P */}
              <rect x="42" y="32" width="16" height="22" rx="3" fill="#ffffff" stroke="#b45309" strokeWidth="1"/>
              <text x="50" y="46" textAnchor="middle" fontSize="7" fill="#b45309" fontWeight="bold">P</text>
              <rect x="62" y="32" width="16" height="22" rx="3" fill="#ffffff" stroke="#b45309" strokeWidth="1"/>
              <text x="70" y="46" textAnchor="middle" fontSize="7" fill="#b45309" fontWeight="bold">A</text>

              {/* ARNm passant dans le ribosome */}
              <line x1="-30" y1="60" x2="110" y2="60" stroke="#be185d" strokeWidth="2.5"/>
              <text x="-25" y="55" fontSize="6.5" fill="#be185d" fontWeight="bold">5’</text>
              <text x="105" y="55" fontSize="6.5" fill="#be185d" fontWeight="bold">3’</text>

              {/* Chaîne polypeptidique sortante */}
              {[
                { cx: 50, cy: 12, fill: '#059669', name: 'Met' },
                { cx: 50, cy: -2, fill: '#0d9488', name: 'Val' },
                { cx: 50, cy: -16, fill: '#0284c7', name: 'Leu' },
                { cx: 50, cy: -30, fill: '#7c3aed', name: 'Thr' },
              ].map((aa, i) => (
                <g key={i}>
                  <circle cx={aa.cx} cy={aa.cy} r="6.5" fill={aa.fill} stroke="#0a1628" strokeWidth="1"/>
                  <text x={aa.cx} y={aa.cy + 2.5} textAnchor="middle" fontSize="5" fill="#ffffff" fontWeight="bold">
                    {aa.name}
                  </text>
                  {i < 3 && <line x1={aa.cx} y1={aa.cy - 6.5} x2={aa.cx} y2={aa.cy - 9.5} stroke="#0a1628" strokeWidth="1"/>}
                </g>
              ))}
              <text x="65" y="-10" fontSize="6.5" fill="#059669" fontWeight="bold">Protéine</text>
            </g>
          </svg>
        </div>

        {/* Détails méthodologiques Bac */}
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="rounded-xl bg-white p-3 border border-navy/10 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text/50 block mb-1">
              Transcription (Sens de lecture &amp; synthèse)
            </span>
            <p className="text-xs text-text/80 leading-relaxed">
              L’ARN polymérase lit le brin matrice d’ADN dans le sens <strong>3’→5’</strong> et synthétise l’ARNm dans le sens antiparallèle <strong>5’→3’</strong> par complémentarité exacte (A donne U, T donne A, C donne G, G donne C).
            </p>
          </div>
          <div className="rounded-xl bg-white p-3 border border-navy/10 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text/50 block mb-1">
              Traduction (Ribosome &amp; ARNt)
            </span>
            <p className="text-xs text-text/80 leading-relaxed">
              Le ribosome se déplace le long de l’ARNm de <strong>5’ vers 3’</strong> codon par codon. Chaque ARNt apporte un acide aminé spécifique grâce à son anticodon complémentaire. La méthionine initiale (AUG) est clivée à la fin.
            </p>
          </div>
        </div>
      </div>

      {/* MODULE 2 : Expérience de Meselson & Stahl (Réplication Semi-Conservative) */}
      <div className="mb-8 rounded-2xl border border-navy/10 bg-white p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/10 pb-3 mb-5">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-turquoise" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-text/50">Module 2</span>
            <h4 className="text-base sm:text-lg font-black text-navy">
              Expérience de Meselson &amp; Stahl : Centrifugation sur Gradient de CsCl
            </h4>
          </div>
          {/* Sélecteur de génération */}
          <div className="inline-flex rounded-xl bg-surface border border-navy/10 p-1">
            {(['G0', 'G1', 'G2', 'G3'] as MeselsonGen[]).map((gen) => (
              <button
                key={gen}
                onClick={() => setSelectedGen(gen)}
                className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                  selectedGen === gen ? 'bg-navy text-white' : 'text-navy/70 hover:text-navy'
                }`}
              >
                {gen}
              </button>
            ))}
          </div>
        </div>

        {/* Schéma SVG des tubes de centrifugation */}
        <div className="rounded-2xl border border-navy/10 bg-surface/30 p-4 mb-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-text/50 mb-3 flex items-center gap-1.5">
            <FlaskConical className="w-3.5 h-3.5 text-turquoise" />
            <span>Tubes de centrifugation en gradient de chlorure de césium (CsCl)</span>
          </div>

          <svg viewBox="0 0 480 180" className="w-full max-w-lg mx-auto" aria-label="Tubes Meselson et Stahl">
            {/* Repères de densité à gauche */}
            <line x1="20" y1="50" x2="40" y2="50" stroke="#0284c7" strokeWidth="2"/>
            <text x="45" y="53" fontSize="7" fill="#0284c7" fontWeight="bold">Densité Légère (14N-14N)</text>
            <line x1="20" y1="90" x2="40" y2="90" stroke="#7c3aed" strokeWidth="2"/>
            <text x="45" y="93" fontSize="7" fill="#7c3aed" fontWeight="bold">Densité Hybride (15N-14N)</text>
            <line x1="20" y1="130" x2="40" y2="130" stroke="#b91c1c" strokeWidth="2"/>
            <text x="45" y="133" fontSize="7" fill="#b91c1c" fontWeight="bold">Densité Lourde (15N-15N)</text>

            {/* 4 Tubes comparatifs */}
            {[
              { gen: 'G0 (Milieu 15N)', x: 190, heavy: true, hybrid: false, light: false, ratio: '100% Lourd' },
              { gen: 'G1 (1er cycle 14N)', x: 260, heavy: false, hybrid: true, light: false, ratio: '100% Hybride' },
              { gen: 'G2 (2e cycle 14N)', x: 330, heavy: false, hybrid: true, light: true, ratio: '50% Hyb / 50% Lég' },
              { gen: 'G3 (3e cycle 14N)', x: 400, heavy: false, hybrid: true, light: true, ratio: '25% Hyb / 75% Lég' },
            ].map((tube, i) => {
              const isCurrent = tube.gen.startsWith(selectedGen);
              return (
                <g key={i}>
                  {/* Contour du tube à essai */}
                  <path
                    d={`M${tube.x},25 L${tube.x},135 Q${tube.x + 15},165 ${tube.x + 30},135 L${tube.x + 30},25 Z`}
                    fill={isCurrent ? '#ffffff' : '#f8fafc'}
                    stroke={isCurrent ? '#0a1628' : '#cbd5e1'}
                    strokeWidth={isCurrent ? '2' : '1.5'}
                  />
                  {/* Titre génération */}
                  <text
                    x={tube.x + 15}
                    y="17"
                    textAnchor="middle"
                    fontSize="7"
                    fill={isCurrent ? '#0a1628' : '#64748b'}
                    fontWeight={isCurrent ? 'bold' : 'normal'}
                  >
                    {tube.gen.split(' ')[0]}
                  </text>

                  {/* Bande légère (y = 50) */}
                  {tube.light && (
                    <rect
                      x={tube.x + 2}
                      y="48"
                      width="26"
                      height={selectedGen === 'G3' && tube.gen.startsWith('G3') ? '8' : '5'}
                      rx="2"
                      fill="#0284c7"
                    />
                  )}

                  {/* Bande hybride (y = 90) */}
                  {tube.hybrid && (
                    <rect
                      x={tube.x + 2}
                      y="88"
                      width="26"
                      height={selectedGen === 'G1' && tube.gen.startsWith('G1') ? '7' : '5'}
                      rx="2"
                      fill="#7c3aed"
                    />
                  )}

                  {/* Bande lourde (y = 130) */}
                  {tube.heavy && (
                    <rect x={tube.x + 2} y="128" width="26" height="7" rx="2" fill="#b91c1c"/>
                  )}

                  {/* Ratio sous le tube */}
                  <text x={tube.x + 15} y="175" textAnchor="middle" fontSize="6" fill="#334155" fontWeight="bold">
                    {tube.ratio}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Explication de la génération sélectionnée */}
        <div className="rounded-xl bg-turquoise/5 border border-turquoise/20 p-3.5">
          <p className="text-xs text-navy font-semibold leading-relaxed">
            {selectedGen === 'G0' &&
              'À la génération 0, les bactéries cultivées sur azote lourd 15N ne possèdent que des molécules d’ADN lourdes (15N-15N), sédimentant au fond du gradient.'}
            {selectedGen === 'G1' &&
              'À la génération 1 (après un cycle en milieu 14N), 100% de l’ADN est hybride (15N-14N). Cette bande intermédiaire unique réfute définitivement le modèle conservatif qui prédisait deux bandes distinctes.'}
            {selectedGen === 'G2' &&
              'À la génération 2, deux bandes d’égale intensité apparaissent (50% hybride 15N-14N et 50% légère 14N-14N). Cela réfute le modèle dispersif et confirme de manière irréfutable le modèle semi-conservatif.'}
            {selectedGen === 'G3' &&
              'À la génération 3, la bande légère devient prépondérante (75% léger 14N-14N pour 25% hybride 15N-14N). Le nombre de brins lourds parentaux initiaux reste invariant (2 molécules hybrides au total).'}
          </p>
        </div>
      </div>

      {/* MODULE 3 : Simulateur de Mutation Ponctuelle (Cas de la Drépanocytose HbA vs HbS) */}
      <div className="rounded-2xl border border-navy/10 bg-surface/30 p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-navy/10 pb-3 mb-5">
          <div className="flex items-center gap-2">
            <Dna className="w-4 h-4 text-turquoise" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-text/50">Module 3</span>
            <h4 className="text-base sm:text-lg font-black text-navy">
              Conséquence d’une Mutation Ponctuelle : Allèle Normal HbA vs Mutant HbS
            </h4>
          </div>
          {/* Sélecteur d'allèle */}
          <div className="inline-flex rounded-xl bg-white border border-navy/10 p-1">
            <button
              onClick={() => setSelectedMutation('normale')}
              className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                selectedMutation === 'normale' ? 'bg-navy text-white' : 'text-navy/70 hover:text-navy'
              }`}
            >
              Allèle Normal HbA
            </button>
            <button
              onClick={() => setSelectedMutation('drepanocytose')}
              className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                selectedMutation === 'drepanocytose' ? 'bg-navy text-white' : 'text-navy/70 hover:text-navy'
              }`}
            >
              Mutation Faux-Sens HbS (Drépanocytose)
            </button>
            <button
              onClick={() => setSelectedMutation('non_sens')}
              className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                selectedMutation === 'non_sens' ? 'bg-navy text-white' : 'text-navy/70 hover:text-navy'
              }`}
            >
              Mutation Non-Sens (Codon STOP)
            </button>
          </div>
        </div>

        {/* Tableau comparatif moléculaire */}
        <div className="rounded-2xl border border-navy/10 bg-white p-4 mb-4 shadow-xs overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="border-b border-navy/10 text-text/50 text-[10px] uppercase tracking-wider">
                <th className="py-2 px-3">Échelon Biologique</th>
                <th className="py-2 px-3 font-mono">Triplet 4</th>
                <th className="py-2 px-3 font-mono">Triplet 5</th>
                <th className="py-2 px-3 font-mono bg-turquoise/5 text-navy font-black">Triplet 6 (Cible)</th>
                <th className="py-2 px-3 font-mono">Triplet 7</th>
                <th className="py-2 px-3 font-mono">Triplet 8</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/5">
              <tr>
                <td className="py-2.5 px-3 font-bold text-navy">ADN Brin Transcrit (3’→5’)</td>
                <td className="py-2.5 px-3 font-mono">ACT</td>
                <td className="py-2.5 px-3 font-mono">CCT</td>
                <td className="py-2.5 px-3 font-mono font-bold bg-turquoise/10 text-navy">
                  {selectedMutation === 'normale' ? 'CTC' : selectedMutation === 'drepanocytose' ? 'CAC' : 'ATC'}
                </td>
                <td className="py-2.5 px-3 font-mono">GAG</td>
                <td className="py-2.5 px-3 font-mono">AAG</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-navy">ARNm (5’→3’)</td>
                <td className="py-2.5 px-3 font-mono text-purple-700">UGA</td>
                <td className="py-2.5 px-3 font-mono text-purple-700">GGA</td>
                <td className="py-2.5 px-3 font-mono font-bold bg-purple-50 text-purple-900">
                  {selectedMutation === 'normale' ? 'GAG' : selectedMutation === 'drepanocytose' ? 'GUG' : 'UAG (STOP)'}
                </td>
                <td className="py-2.5 px-3 font-mono text-purple-700">CUC</td>
                <td className="py-2.5 px-3 font-mono text-purple-700">UUC</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-bold text-navy">Chaîne β de l’Hémoglobine</td>
                <td className="py-2.5 px-3 font-semibold text-emerald-800">4. Thr</td>
                <td className="py-2.5 px-3 font-semibold text-emerald-800">5. Pro</td>
                <td className="py-2.5 px-3 font-black bg-emerald-50 text-emerald-950">
                  {selectedMutation === 'normale' ? (
                    '6. Glu (Acide Glutamique)'
                  ) : selectedMutation === 'drepanocytose' ? (
                    <span className="text-rose-700">6. Val (Valine hydrophobe)</span>
                  ) : (
                    <span className="text-rose-700">ARRÊT (STOP)</span>
                  )}
                </td>
                <td className="py-2.5 px-3 font-semibold text-emerald-800">
                  {selectedMutation === 'non_sens' ? '—' : '7. Leu'}
                </td>
                <td className="py-2.5 px-3 font-semibold text-emerald-800">
                  {selectedMutation === 'non_sens' ? '—' : '8. Lys'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Schéma de conséquence phénotypique */}
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl bg-white p-3.5 border border-navy/10 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text/50 block mb-1">
              Phénotype Moléculaire &amp; Cellulaire
            </span>
            <p className="text-xs text-text/80 leading-relaxed">
              {selectedMutation === 'normale' &&
                'L’acide glutamique est hydrophile : l’hémoglobine HbA reste parfaitement soluble dans le cytoplasme des hématies, qui conservent leur forme de disques biconcaves souples.'}
              {selectedMutation === 'drepanocytose' &&
                'La valine est hydrophobe : lors d’une baisse de pression en oxygène (hypoxie), les molécules d’HbS polymérisent en longues fibres rigides, déformant le globule rouge en faucille (falciformation).'}
              {selectedMutation === 'non_sens' &&
                'Le codon STOP prématuré UAG provoque l’arrêt immédiat de la traduction au 5e acide aminé : la protéine produite est tronquée, instable et totalement non fonctionnelle (thalassémie sévère).'}
            </p>
          </div>

          <div className="rounded-xl bg-white p-3.5 border border-navy/10 shadow-xs">
            <span className="text-[10px] font-bold uppercase tracking-wider text-text/50 block mb-1">
              Phénotype Macroscopique au Bac S2
            </span>
            <p className="text-xs text-text/80 leading-relaxed">
              {selectedMutation === 'normale' &&
                'Transport optimal d’oxygène dans les tissus, durée de vie des hématies de 120 jours, absence totale d’anémie ou de crise vaso-occlusive.'}
              {selectedMutation === 'drepanocytose' &&
                'Anémie hémolytique chronique sévère (destruction précoce des hématies à 15-20 jours), crises vaso-occlusives très douloureuses par blocage des capillaires sanguins et sensibilité accrue aux infections.'}
              {selectedMutation === 'non_sens' &&
                'Absence complète de chaîne bêta-globine fonctionnelle, anémie microcytaire majeure nécessitant des transfusions sanguines itératives dès les premiers mois de vie.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
