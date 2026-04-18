'use client';

import { useEffect, useRef } from 'react';
import { MrSparkle } from './mr-sparkle';

type MrConfettiProps = {
  trigger: boolean;
  stickers?: string[];
};

const DEFAULT_STICKERS = ['OMG', 'WOW', 'VIRAL', 'STAR', 'HOT', 'SLAY'];

const COLORS = [
  'var(--color-mr-pink-hot)',
  'var(--color-mr-yellow-pop)',
  'var(--color-mr-cyan-dream)',
  'var(--color-mr-lavender)',
  'var(--color-mr-orange-tang)',
];

export function MrConfetti({ trigger, stickers = DEFAULT_STICKERS }: MrConfettiProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!trigger || !containerRef.current) return;

    const container = containerRef.current;
    const items: HTMLElement[] = [];

    // Create sparkle + sticker elements
    for (let i = 0; i < 20; i++) {
      const el = document.createElement('div');
      el.style.cssText = `
        position: fixed;
        top: ${Math.random() * 30 + 10}%;
        left: ${Math.random() * 100}%;
        z-index: 9999;
        pointer-events: none;
        font-family: var(--font-bold);
        font-size: ${Math.random() * 12 + 10}px;
        color: ${COLORS[i % COLORS.length]};
        transform: rotate(${(Math.random() - 0.5) * 40}deg);
        animation: confetti-fall 2s ease-out forwards;
        opacity: 1;
      `;

      if (i < 8 && stickers.length > 0) {
        el.textContent = stickers[i % stickers.length];
        el.style.fontWeight = '900';
        el.style.textShadow = '1px 1px 0 rgba(0,0,0,0.3)';
      } else {
        el.textContent = '\u2726'; // sparkle character
      }

      container.appendChild(el);
      items.push(el);
    }

    const timer = setTimeout(() => {
      items.forEach((el) => el.remove());
    }, 2500);

    return () => {
      clearTimeout(timer);
      items.forEach((el) => el.remove());
    };
  }, [trigger, stickers]);

  return <div ref={containerRef} aria-hidden="true" />;
}
