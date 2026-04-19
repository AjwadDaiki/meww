'use client';

import { useState } from 'react';

type DurationModuleProps = {
  value: 5 | 10 | 15;
  onChange: (duration: 5 | 10 | 15) => void;
};

const OPTIONS = [
  { value: 5 as const, label: '5s', emoji: '⚡', price: 'inclus', priceColor: 'text-mr-cyan-piscine' },
  { value: 10 as const, label: '10s', emoji: '🎬', price: '+1,00EUR', priceColor: 'text-mr-rose-tama' },
  { value: 15 as const, label: '15s', emoji: '🎞️', price: '+2,00EUR', priceColor: 'text-mr-rose-tama' },
];

export function DurationModule({ value, onChange }: DurationModuleProps) {
  const [open, setOpen] = useState(false);
  const current = OPTIONS.find((o) => o.value === value)!;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="w-[140px] md:w-[160px] bg-mr-papier-gloss border-3 border-mr-noir-encre shadow-[4px_4px_0_var(--color-mr-noir-encre)] p-2 md:p-3 cursor-pointer hover:scale-105 hover:-translate-y-0.5 transition-all text-left"
        style={{ transform: 'rotate(1.5deg)' }}
      >
        <span className="font-[family-name:var(--font-silkscreen)] text-[8px] text-mr-noir-encre/50 uppercase">DUREE</span>
        <p className="font-[family-name:var(--font-anton)] text-lg md:text-xl text-mr-noir-encre mt-0.5">
          {current.emoji} {current.label}
        </p>
        <span className={`font-[family-name:var(--font-caveat)] text-[10px] ${current.priceColor}`}>{current.price}</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
          <div className="absolute inset-0 bg-mr-noir-encre/60 backdrop-blur-sm" onClick={() => setOpen(false)} />
          <div className="relative z-10 w-full md:w-[400px] bg-mr-papier-gloss border-4 border-mr-noir-encre shadow-[12px_12px_0_var(--color-mr-noir-encre)] rounded-t-2xl md:rounded-2xl p-4 space-y-3">
            <h3 className="font-[family-name:var(--font-anton)] text-lg uppercase text-center">DUREE</h3>
            {OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { onChange(opt.value); setOpen(false); }}
                className={`w-full text-left p-4 border-3 cursor-pointer transition-all flex items-center justify-between ${
                  value === opt.value ? 'border-mr-jaune-candy bg-mr-jaune-candy/10' : 'border-mr-noir-encre/20 hover:border-mr-noir-encre'
                }`}
              >
                <div>
                  <span className="font-[family-name:var(--font-anton)] text-xl">{opt.emoji} {opt.label}</span>
                </div>
                <span className={`font-[family-name:var(--font-permanent-marker)] text-sm ${opt.priceColor}`}>
                  {opt.price}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
