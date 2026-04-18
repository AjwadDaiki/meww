'use client';

import { cn } from '@/lib/utils';

type MrBlobProps = {
  color: string;
  size?: number;
  className?: string;
  duration?: number;
};

export function MrBlob({
  color,
  size = 300,
  className,
  duration = 20,
}: MrBlobProps) {
  return (
    <div
      className={cn('absolute pointer-events-none', className)}
      style={{
        width: size,
        height: size,
        background: color,
        borderRadius: '50%',
        filter: 'blur(80px)',
        opacity: 0.5,
        animation: `blob-float ${duration}s ease-in-out infinite`,
      }}
      aria-hidden="true"
    />
  );
}
