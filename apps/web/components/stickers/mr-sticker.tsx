'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';

type StickerColor = 'rose' | 'jaune' | 'cyan' | 'vert' | 'orange' | 'violet' | 'rouge' | 'chrome';

type MrStickerProps = {
  label: string;
  color?: StickerColor;
  size?: 'sm' | 'md' | 'lg';
  rotation?: number;
  wiggle?: boolean;
  className?: string;
};

const COLOR_MAP: Record<StickerColor, string> = {
  rose: 'var(--color-mr-rose-tama)',
  jaune: 'var(--color-mr-jaune-candy)',
  cyan: 'var(--color-mr-cyan-piscine)',
  vert: 'var(--color-mr-vert-apple)',
  orange: 'var(--color-mr-orange-pop)',
  violet: 'var(--color-mr-violet-grape)',
  rouge: 'var(--color-mr-rouge-cerise)',
  chrome: 'var(--color-mr-jaune-candy)',
} as const;

const SIZE_MAP = {
  sm: 'text-sm px-2 py-0.5',
  md: 'text-lg px-3 py-1',
  lg: 'text-2xl px-4 py-1.5',
} as const;

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 13.7) * 10000;
  return x - Math.floor(x);
}

export function MrSticker({
  label,
  color = 'rose',
  size = 'md',
  rotation,
  wiggle = false,
  className,
}: MrStickerProps) {
  const rot = useMemo(() => {
    if (rotation !== undefined) return rotation;
    return Math.round((seededRandom(label.length + label.charCodeAt(0)) - 0.5) * 30);
  }, [rotation, label]);

  const bgColor = COLOR_MAP[color];

  return (
    <span
      className={cn(
        'inline-block font-[family-name:var(--font-permanent-marker)]',
        'border-4 border-mr-noir-encre',
        'shadow-[3px_3px_0_var(--color-mr-noir-encre)]',
        'select-none whitespace-nowrap',
        SIZE_MAP[size],
        wiggle && 'animate-[wiggle_6s_ease-in-out_infinite]',
        className
      )}
      style={{
        backgroundColor: bgColor,
        color: 'var(--color-mr-noir-encre)',
        transform: `rotate(${rot}deg)`,
        '--rot': `${rot}deg`,
      } as React.CSSProperties}
    >
      {label}
    </span>
  );
}
