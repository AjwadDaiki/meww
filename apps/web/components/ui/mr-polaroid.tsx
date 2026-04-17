'use client';

import { useRef, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { DeskPolaroid } from '@/components/illustrations/desk-polaroid';

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
        'relative inline-block cursor-pointer',
        'transition-transform duration-300 ease-[var(--ease-tactile)]',
        'hover:-translate-y-1',
        className
      )}
      style={{ transform: `rotate(${rot}deg)` }}
    >
      <DeskPolaroid />

      {/* Video/image overlay in the photo area */}
      {src && (
        <div className="absolute top-[6%] left-[10%] w-[80%] h-[70%] overflow-hidden">
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
        </div>
      )}

      {caption && (
        <p className="absolute bottom-[6%] left-0 right-0 text-center font-[family-name:var(--font-caveat)] text-xs text-mr-ink-blue">
          {caption}
        </p>
      )}
    </div>
  );
}
