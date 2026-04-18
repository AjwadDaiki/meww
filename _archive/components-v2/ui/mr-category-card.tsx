'use client';

import { useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

type MrCategoryCardProps = {
  name: string;
  videoSrc?: string;
  posterSrc?: string;
  onClick?: () => void;
  className?: string;
};

export function MrCategoryCard({
  name,
  videoSrc,
  posterSrc,
  onClick,
  className,
}: MrCategoryCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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
        'relative overflow-hidden rounded-2xl cursor-pointer group',
        'w-40 h-52 md:w-48 md:h-60 flex-shrink-0',
        'transition-all duration-300 ease-[var(--ease-bounce)]',
        'hover:scale-105 hover:shadow-[0_0_30px_rgba(255,237,74,0.3)]',
        'active:scale-[0.98]',
        className
      )}
    >
      {/* Video background */}
      {videoSrc ? (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-mr-violet-deep/30" />
      )}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-mr-black-soft/80 via-transparent to-transparent" />

      {/* Hover glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-mr-yellow-pop/10" />

      {/* Category name */}
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="font-[family-name:var(--font-cormorant)] font-bold italic text-lg text-mr-white-pure leading-tight group-hover:animate-[wiggle_0.5s_ease-in-out]">
          {name}
        </p>
      </div>
    </div>
  );
}
