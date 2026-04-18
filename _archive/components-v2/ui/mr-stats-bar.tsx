'use client';

import { cn } from '@/lib/utils';

type StatsVariant = 'fame' | 'drama' | 'vibes';

type MrStatsBarProps = {
  label: string;
  value: number;
  variant?: StatsVariant;
  className?: string;
};

const VARIANT_COLORS = {
  fame: 'text-mr-pink-hot',
  drama: 'text-mr-red-love',
  vibes: 'text-mr-cyan-dream',
} as const;

export function MrStatsBar({ label, value, variant = 'fame', className }: MrStatsBarProps) {
  const filled = Math.round(value / 10);
  const empty = 10 - filled;

  return (
    <div className={cn('flex items-center gap-2 pixel-bar', className)}>
      <span className={cn('w-14 text-right', VARIANT_COLORS[variant])}>
        {label}
      </span>
      <span className="text-mr-black-soft/80">
        {'▓'.repeat(filled)}{'░'.repeat(empty)}
      </span>
      <span className="text-mr-black-soft/60 text-[0.6rem]">
        {value}%
      </span>
    </div>
  );
}
