'use client';

import { cn } from '@/lib/utils';

type MrSparkleProps = {
  size?: number;
  color?: string;
  className?: string;
  delay?: number;
  duration?: number;
};

export function MrSparkle({
  size = 12,
  color = 'var(--color-mr-yellow-gold)',
  className,
  delay = 0,
  duration = 2,
}: MrSparkleProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      className={cn('pointer-events-none', className)}
      style={{
        animation: `twinkle ${duration}s ease-in-out infinite`,
        animationDelay: `${delay}s`,
      }}
      aria-hidden="true"
    >
      <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" />
    </svg>
  );
}
