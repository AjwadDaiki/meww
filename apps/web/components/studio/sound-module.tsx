'use client';

type SoundModuleProps = {
  value: boolean;
  onChange: (sound: boolean) => void;
};

export function SoundModule({ value, onChange }: SoundModuleProps) {
  return (
    <button
      onClick={() => onChange(!value)}
      className={`w-[140px] md:w-[160px] border-3 shadow-[4px_4px_0_var(--color-mr-noir-encre)] p-2 md:p-3 cursor-pointer hover:scale-105 hover:-translate-y-0.5 transition-all text-left ${
        value
          ? 'bg-mr-rose-tama/10 border-mr-rose-tama'
          : 'bg-mr-papier-gloss border-mr-noir-encre'
      }`}
      style={{ transform: 'rotate(-1.5deg)' }}
    >
      <span className="font-[family-name:var(--font-silkscreen)] text-[8px] text-mr-noir-encre/50 uppercase">SON</span>
      <p className="font-[family-name:var(--font-anton)] text-base md:text-lg text-mr-noir-encre mt-0.5">
        {value ? '🔊 AVEC SON' : '🔇 SANS SON'}
      </p>
      <span className={`font-[family-name:var(--font-caveat)] text-[10px] ${value ? 'text-mr-rose-tama' : 'text-mr-cyan-piscine'}`}>
        {value ? '+0,99EUR' : 'inclus'}
      </span>
      {value && (
        <p className="font-[family-name:var(--font-caveat)] text-[9px] text-mr-orange-pop mt-0.5">
          Plus immersif, +67% partages
        </p>
      )}
    </button>
  );
}
