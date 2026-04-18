'use client';

import { useRef, useMemo, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { MrStatsBar } from './mr-stats-bar';

type MrPolaroidProps = {
  videoSrc?: string;
  posterSrc?: string;
  caption?: string;
  rotation?: number;
  showStats?: boolean;
  onClick?: () => void;
  className?: string;
};

function seededRandom(seed: number): number {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export function MrPolaroid({
  videoSrc,
  posterSrc,
  caption,
  rotation,
  showStats = false,
  onClick,
  className,
}: MrPolaroidProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const rot = useMemo(() => {
    if (rotation !== undefined) return rotation;
    return (seededRandom(caption?.length ?? 42) - 0.5) * 8;
  }, [rotation, caption]);

  const stats = useMemo(() => ({
    fame: Math.floor(60 + seededRandom((caption?.length ?? 5) * 3) * 40),
    drama: Math.floor(50 + seededRandom((caption?.length ?? 5) * 7) * 50),
    vibes: Math.floor(70 + seededRandom((caption?.length ?? 5) * 11) * 30),
  }), [caption]);

  // Intersection Observer for video playback throttling
  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [videoSrc]);

  return (
    <div
      ref={containerRef}
      onClick={onClick}
      className={cn(
        'relative inline-block p-2 pb-8 bg-mr-cream',
        'shadow-[0_4px_12px_rgba(26,19,36,0.15),0_8px_24px_rgba(26,19,36,0.1)]',
        'transition-all duration-300 ease-[var(--ease-bounce)]',
        'hover:-translate-y-1 hover:shadow-[0_8px_20px_rgba(26,19,36,0.2),0_16px_40px_rgba(26,19,36,0.15)]',
        onClick && 'cursor-pointer',
        className
      )}
      style={{ transform: `rotate(${rot}deg)` }}
    >
      {/* Media area */}
      <div className="relative w-36 h-44 md:w-40 md:h-48 bg-mr-black-soft/5 overflow-hidden">
        {videoSrc ? (
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterSrc}
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : posterSrc ? (
          <img src={posterSrc} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-mr-lavender/20" />
        )}

        {/* Stats overlay */}
        {showStats && (
          <div className="absolute bottom-0 left-0 right-0 bg-mr-black-soft/70 backdrop-blur-sm p-1.5 space-y-0.5">
            <MrStatsBar label="FAME" value={stats.fame} variant="fame" />
            <MrStatsBar label="DRAMA" value={stats.drama} variant="drama" />
            <MrStatsBar label="VIBES" value={stats.vibes} variant="vibes" />
          </div>
        )}
      </div>

      {/* Caption */}
      {caption && (
        <p className="mt-1.5 text-center font-[family-name:var(--font-cormorant)] font-bold italic text-sm text-mr-black-soft truncate px-1">
          {caption}
        </p>
      )}
    </div>
  );
}
