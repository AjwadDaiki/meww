'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';

type PostitColor = 'yellow' | 'pink';

type MrPostitProps = {
  text: string;
  color?: PostitColor;
  rotation?: number;
  className?: string;
};

const COLOR_MAP = {
  yellow: 'bg-mr-postit',
  pink: 'bg-mr-postit-pink',
} as const;

function seededRandom(seed: number): number {
  const x = Math.sin(seed * 7.3) * 10000;
  return x - Math.floor(x);
}

export function MrPostit({ text, color = 'yellow', rotation, className }: MrPostitProps) {
  const rot = useMemo(() => {
    if (rotation !== undefined) return rotation;
    return (seededRandom(text.length) - 0.5) * 8;
  }, [rotation, text]);

  return (
    <div
      className={cn(
        'w-36 p-3',
        COLOR_MAP[color],
        'shadow-[1px_2px_6px_rgba(26,22,20,0.2)]',
        'transition-shadow duration-300 ease-[var(--ease-tactile)]',
        'hover:shadow-[2px_4px_10px_rgba(26,22,20,0.3)]',
        className
      )}
      style={{ transform: `rotate(${rot}deg)` }}
    >
      <p className="font-[family-name:var(--font-caveat)] text-base text-mr-ink leading-snug">
        {text}
      </p>
    </div>
  );
}
