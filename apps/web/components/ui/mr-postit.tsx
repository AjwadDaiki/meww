'use client';

import { useMemo } from 'react';
import { cn } from '@/lib/utils';
import { DeskPostit } from '@/components/illustrations/desk-postit';

type PostitColor = 'yellow' | 'pink';

type MrPostitProps = {
  text: string;
  color?: PostitColor;
  rotation?: number;
  className?: string;
};

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
        'relative inline-block w-36',
        'transition-transform duration-300 ease-[var(--ease-tactile)]',
        'hover:-translate-y-1',
        className
      )}
      style={{ transform: `rotate(${rot}deg)` }}
    >
      <DeskPostit color={color} />

      {/* Text overlay */}
      <p className="absolute inset-0 flex items-center justify-center px-4 pt-2 pb-4 font-[family-name:var(--font-caveat)] text-base text-mr-ink leading-snug text-center">
        {text}
      </p>
    </div>
  );
}
