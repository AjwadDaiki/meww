'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { DeskStamp } from '@/components/illustrations/desk-stamp';

type StampVariant = 'red' | 'green' | 'blue';

type MrStampProps = {
  label: string;
  variant?: StampVariant;
  rotation?: number;
  className?: string;
};

const VARIANT_STYLES = {
  red: 'text-mr-stamp-red',
  green: 'text-mr-stamp-green',
  blue: 'text-mr-ink-blue',
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
        'relative inline-block cursor-pointer',
        'transition-transform duration-300 ease-[var(--ease-tactile)]',
        'hover:-translate-y-0.5',
        className
      )}
      style={{ transform: `rotate(${rot}deg)` }}
    >
      <DeskStamp variant={variant} />

      {/* Label text overlay */}
      <span
        className={cn(
          'absolute inset-0 flex items-center justify-center',
          'font-[family-name:var(--font-cormorant)] font-bold italic text-base uppercase tracking-wider',
          'opacity-85',
          VARIANT_STYLES[variant]
        )}
      >
        {label}
      </span>
    </div>
  );
}
