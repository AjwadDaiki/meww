'use client';

import { useState } from 'react';

type DecorModuleProps = {
  value: 'auto' | 'preset' | 'user-upload';
  presetId?: string;
  onChange: (type: 'auto' | 'preset' | 'user-upload', presetId?: string) => void;
};

const PRESET_DECORS = [
  { id: 'beach', label: 'Plage' },
  { id: 'paris-metro', label: 'Metro Paris' },
  { id: 'cozy-living', label: 'Salon cosy' },
  { id: 'kitchen', label: 'Cuisine' },
  { id: 'garden', label: 'Jardin' },
  { id: 'gym', label: 'Gym' },
  { id: 'rooftop-tokyo', label: 'Tokyo' },
  { id: 'stadium', label: 'Stade' },
  { id: 'concert-stage', label: 'Concert' },
  { id: 'teen-bedroom', label: 'Chambre ado' },
  { id: 'classroom', label: 'Classe' },
  { id: 'restaurant', label: 'Restaurant' },
  { id: 'castle', label: 'Chateau' },
  { id: 'space', label: 'Espace' },
  { id: 'underwater', label: 'Sous l\'eau' },
  { id: 'desert', label: 'Desert' },
  { id: 'pool', label: 'Piscine' },
  { id: 'forest', label: 'Foret' },
  { id: 'office', label: 'Bureau' },
  { id: 'photo-studio', label: 'Studio photo' },
];

export function DecorModule({ value, presetId, onChange }: DecorModuleProps) {
  const [open, setOpen] = useState(false);

  const label = value === 'auto' ? 'Auto' : value === 'preset'
    ? PRESET_DECORS.find((d) => d.id === presetId)?.label || 'Lieu'
    : 'Ma photo';

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-[140px] md:w-[160px] bg-mr-papier-gloss border-3 border-mr-noir-encre shadow-[4px_4px_0_var(--color-mr-noir-encre)] p-2 md:p-3 cursor-pointer hover:scale-105 hover:-translate-y-0.5 transition-all text-left"
        style={{ transform: 'rotate(-1deg)' }}
      >
        <span className="font-[family-name:var(--font-silkscreen)] text-[8px] text-mr-noir-encre/50 uppercase">DECOR</span>
        <p className="font-[family-name:var(--font-playfair)] italic text-sm md:text-base text-mr-noir-encre mt-0.5">
          {label}
        </p>
        <span className="font-[family-name:var(--font-caveat)] text-[10px] text-mr-cyan-piscine">
          {value === 'user-upload' ? '+0,99EUR' : 'inclus'}
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          <div className="absolute inset-0 bg-mr-noir-encre/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-full md:w-[500px] max-h-[70vh] bg-mr-papier-gloss border-4 border-mr-noir-encre shadow-[12px_12px_0_var(--color-mr-noir-encre)] rounded-t-2xl md:rounded-2xl overflow-hidden flex flex-col">
            <div className="p-3 border-b-2 border-mr-noir-encre/10">
              <h3 className="font-[family-name:var(--font-anton)] text-lg uppercase text-center">DECOR</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-3 space-y-3">
              {/* Auto */}
              <button
                onClick={() => { onChange('auto'); setOpen(false); }}
                className={`w-full text-left p-3 border-3 cursor-pointer transition-all ${
                  value === 'auto' ? 'border-mr-jaune-candy bg-mr-jaune-candy/10' : 'border-mr-noir-encre/20'
                }`}
              >
                <p className="font-[family-name:var(--font-anton)] text-base uppercase">AUTO</p>
                <p className="font-[family-name:var(--font-caveat)] text-sm text-mr-noir-encre/60">Decor par defaut de l'action</p>
                <span className="font-[family-name:var(--font-silkscreen)] text-[9px] text-mr-vert-apple">INCLUS</span>
              </button>

              {/* Presets grid */}
              <div>
                <p className="font-[family-name:var(--font-anton)] text-sm uppercase mb-2">CHOISIR UN LIEU (inclus)</p>
                <div className="grid grid-cols-4 gap-2">
                  {PRESET_DECORS.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => { onChange('preset', d.id); setOpen(false); }}
                      className={`p-2 border-2 cursor-pointer hover:scale-105 transition-all text-center ${
                        value === 'preset' && presetId === d.id
                          ? 'border-mr-jaune-candy bg-mr-jaune-candy/10'
                          : 'border-mr-noir-encre/20'
                      }`}
                    >
                      <p className="font-[family-name:var(--font-caveat)] text-xs">{d.label}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom upload */}
              <button
                onClick={() => { onChange('user-upload'); setOpen(false); }}
                className={`w-full text-left p-3 border-3 cursor-pointer transition-all ${
                  value === 'user-upload' ? 'border-mr-rose-tama bg-mr-rose-tama/10' : 'border-mr-noir-encre/20'
                }`}
              >
                <p className="font-[family-name:var(--font-anton)] text-base uppercase">MA PROPRE PHOTO</p>
                <p className="font-[family-name:var(--font-caveat)] text-sm text-mr-noir-encre/60">Upload un decor perso</p>
                <span className="font-[family-name:var(--font-permanent-marker)] text-sm text-mr-rose-tama">+0,99EUR</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
