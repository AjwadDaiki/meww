'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';

type MrStickerProps = {
  text: string;
  color?: string;
  rotation?: number;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const SIZE_STYLES = {
  sm: 'text-xs px-2 py-0.5',
  md: 'text-sm px-3 py-1',
  lg: 'text-base px-4 py-1.5',
} as const;

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 13.7) * 10000;
  return x - Math.floor(x);
}

export function MrSticker({
  text,
  color = 'var(--color-mr-yellow-pop)',
  rotation,
  size = 'md',
  className,
}: MrStickerProps) {
  const rot = useMemo(() => {
    if (rotation !== undefined) return rotation;
    return (seededRandom(text.length) - 0.5) * 20;
  }, [rotation, text]);

  return (
    <span
      className={cn(
        'inline-block font-[family-name:var(--font-anton)] uppercase tracking-wider',
        'border-2 border-mr-black-soft rounded-sm',
        'shadow-[2px_2px_0_var(--color-mr-black-soft)]',
        SIZE_STYLES[size],
        className
      )}
      style={{
        transform: `rotate(${rot}deg)`,
        backgroundColor: color,
        color: 'var(--color-mr-black-soft)',
      }}
    >
      {text}
    </span>
  );
}
