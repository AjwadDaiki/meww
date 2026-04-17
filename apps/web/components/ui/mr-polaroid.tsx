'use client';

import { useRef, useMemo } from 'react';
import { cn } from '@/lib/utils';

type MrPolaroidProps = {
  src?: string;
  poster?: string;
  caption?: string;
  rotation?: number;
  className?: string;
};

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function MrPolaroid({ src, poster, caption, rotation, className }: MrPolaroidProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const rot = useMemo(() => {
    if (rotation !== undefined) return rotation;
    return (seededRandom(caption?.length ?? 42) - 0.5) * 10;
  }, [rotation, caption]);

  return (
    <div
      className={cn(
        'inline-block p-2 pb-10 bg-mr-paper shadow-[2px_4px_8px_rgba(26,22,20,0.25)]',
        'transition-shadow duration-300 ease-[var(--ease-tactile)]',
        'hover:shadow-[3px_6px_12px_rgba(26,22,20,0.35)]',
        className
      )}
      style={{ transform: `rotate(${rot}deg)` }}
    >
      <div className="relative w-36 h-44 bg-mr-paper-aged overflow-hidden">
        {src ? (
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            loop
            muted
            playsInline
            autoPlay
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-mr-paper-aged" />
        )}
      </div>

      {caption && (
        <p
          className="mt-2 text-center font-[family-name:var(--font-caveat)] text-sm text-mr-ink-blue leading-tight"
        >
          {caption}
        </p>
      )}
    </div>
  );
}
