'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';

type StampVariant = 'red' | 'green' | 'blue';

type MrStampProps = {
  label: string;
  variant?: StampVariant;
  rotation?: number;
  className?: string;
};

const VARIANT_MAP = {
  red: 'border-mr-stamp-red text-mr-stamp-red',
  green: 'border-mr-stamp-green text-mr-stamp-green',
  blue: 'border-mr-ink-blue text-mr-ink-blue',
} as const;

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 3.7) * 10000;
  return x - Math.floor(x);
}

export function MrStamp({ label, variant = 'red', rotation, className }: MrStampProps) {
  const rot = useMemo(() => {
    if (rotation !== undefined) return rotation;
    return -2 + seededRandom(label.length) * 5;
  }, [rotation, label]);

  return (
    <div
      className={cn(
        'inline-block px-4 py-2',
        'border-2 rounded-sm',
        'font-[family-name:var(--font-cormorant)] font-bold italic text-lg uppercase tracking-wider',
        'opacity-85',
        VARIANT_MAP[variant],
        className
      )}
      style={{ transform: `rotate(${rot}deg)` }}
    >
      {label}
    </div>
  );
}
