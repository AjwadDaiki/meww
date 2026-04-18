'use client';

/* eslint-disable @next/next/no-img-element */
import { useTranslations } from 'next-intl';
import { MrRadialBeams } from '@/components/ui/mr-radial-beams';
import { MrSparkle } from '@/components/ui/mr-sparkle';
import { MrChromeBubble } from '@/components/ui/mr-chrome-bubble';
import { MrSticker } from '@/components/stickers/mr-sticker';

const CATEGORIES = [
  'Midnight Porch Musician',
  'Jazz Trumpet',
  'Football Goal',
  'Ninja Night',
  'DJ Club Set',
  'Classical Pianist',
];

const SPARKLE_POSITIONS = [
  { top: '5%', left: '8%', size: 14, color: 'var(--color-mr-jaune-candy)', delay: 0 },
  { top: '10%', left: '85%', size: 10, color: 'var(--color-mr-rose-tama)', delay: 0.4 },
  { top: '22%', left: '3%', size: 8, color: '#FFFFFF', delay: 0.8 },
  { top: '15%', left: '92%', size: 16, color: 'var(--color-mr-chrome-gold)', delay: 1.2 },
  { top: '35%', left: '6%', size: 12, color: 'var(--color-mr-cyan-piscine)', delay: 0.2 },
  { top: '40%', left: '90%', size: 10, color: 'var(--color-mr-jaune-candy)', delay: 1.5 },
  { top: '55%', left: '4%', size: 14, color: 'var(--color-mr-rose-tama)', delay: 0.6 },
  { top: '60%', left: '88%', size: 8, color: '#FFFFFF', delay: 1.0 },
  { top: '70%', left: '10%', size: 10, color: 'var(--color-mr-chrome-gold)', delay: 1.8 },
  { top: '75%', left: '80%', size: 16, color: 'var(--color-mr-violet-grape)', delay: 0.3 },
  { top: '8%', left: '40%', size: 8, color: 'var(--color-mr-jaune-candy)', delay: 2.0 },
  { top: '50%', left: '50%', size: 6, color: '#FFFFFF', delay: 1.4 },
  { top: '85%', left: '15%', size: 12, color: 'var(--color-mr-rose-tama)', delay: 0.9 },
  { top: '88%', left: '70%', size: 10, color: 'var(--color-mr-cyan-piscine)', delay: 1.7 },
  { top: '30%', left: '60%', size: 8, color: 'var(--color-mr-chrome-gold)', delay: 2.2 },
  { top: '45%', left: '20%', size: 14, color: 'var(--color-mr-jaune-candy)', delay: 0.5 },
  { top: '65%', left: '45%', size: 10, color: '#FFFFFF', delay: 1.1 },
  { top: '18%', left: '55%', size: 12, color: 'var(--color-mr-rose-tama)', delay: 1.6 },
  { top: '92%', left: '50%', size: 8, color: 'var(--color-mr-vert-apple)', delay: 0.7 },
  { top: '3%', left: '65%', size: 10, color: 'var(--color-mr-violet-grape)', delay: 2.1 },
];

export function Landing() {
  const t = useTranslations();

  return (
    <div className="h-dvh w-screen overflow-hidden relative">
      {/* Layer 0: Radial beams */}
      <MrRadialBeams />

      {/* Layer 1: 20 sparkles */}
      {SPARKLE_POSITIONS.map((s, i) => (
        <div key={i} className="absolute z-10 pointer-events-none" style={{ top: s.top, left: s.left }}>
          <MrSparkle size={s.size} color={s.color} delay={s.delay} duration={2 + (i % 3)} />
        </div>
      ))}

      {/* Layer 2: Chrome bubbles */}
      <div className="absolute top-[12%] left-[15%] z-10"><MrChromeBubble size={35} duration={4} /></div>
      <div className="absolute top-[25%] right-[10%] z-10"><MrChromeBubble size={50} duration={5} /></div>
      <div className="absolute bottom-[20%] left-[8%] z-10"><MrChromeBubble size={28} duration={3.5} /></div>
      <div className="absolute bottom-[30%] right-[15%] z-10"><MrChromeBubble size={42} duration={4.5} /></div>
      <div className="absolute top-[60%] left-[40%] z-10"><MrChromeBubble size={22} duration={3} /></div>

      {/* Layer 3: Stickers scattered */}
      <div className="absolute top-[6%] right-[5%] z-30"><MrSticker label="VIRAL!" color="rose" rotation={12} wiggle /></div>
      <div className="absolute top-[18%] left-[2%] z-30 hidden md:block"><MrSticker label="HOT!" color="rouge" rotation={-8} /></div>
      <div className="absolute bottom-[22%] right-[3%] z-30"><MrSticker label="OMG!" color="jaune" rotation={15} wiggle /></div>
      <div className="absolute bottom-[35%] left-[1%] z-30 hidden md:block"><MrSticker label="NEW!" color="cyan" rotation={-12} /></div>
      <div className="absolute top-[45%] right-[2%] z-30 hidden md:block"><MrSticker label="STAR!" color="violet" rotation={6} wiggle /></div>
      <div className="absolute bottom-[8%] left-[30%] z-30 hidden md:block"><MrSticker label="WOW!" color="vert" rotation={-5} /></div>
      <div className="absolute top-[3%] left-[25%] z-30 hidden md:block"><MrSticker label="SLAY!" color="rose" size="sm" rotation={18} /></div>
      <div className="absolute bottom-[15%] right-[25%] z-30 hidden md:block"><MrSticker label="MOOD!" color="orange" size="sm" rotation={-15} /></div>
      <div className="absolute top-[50%] left-[85%] z-30 hidden lg:block"><MrSticker label="ICONIC!" color="chrome" rotation={-3} /></div>
      <div className="absolute bottom-[5%] right-[45%] z-30 hidden lg:block"><MrSticker label="LIVE!" color="rouge" size="sm" rotation={20} wiggle /></div>

      {/* Main content */}
      <div className="relative z-20 h-full flex flex-col">

        {/* ZONE A: Header */}
        <header className="flex items-center justify-between px-4 md:px-8 py-2 md:py-3 flex-shrink-0">
          <div>
            <span className="chrome-text font-[family-name:var(--font-orbitron)] text-lg md:text-xl">
              MEOWREEL
            </span>
          </div>
          <span className="font-[family-name:var(--font-silkscreen)] text-[9px] md:text-[10px] text-mr-noir-encre/60">
            EDITION #47 &middot; APRIL 2026
          </span>
        </header>

        {/* ZONE B: Main stage */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 px-4 md:px-8 min-h-0">

          {/* PNJ left: CATSOME */}
          <div className="hidden md:block flex-shrink-0 self-end mb-8" style={{ animation: 'bubble-float 3s ease-in-out infinite' }}>
            <img src="/pnj/catsome-default.png" alt="" width={100} height={120} className="drop-shadow-lg" />
          </div>

          {/* Center column: polaroid + title + CTA */}
          <div className="flex flex-col items-center gap-2 md:gap-4 min-h-0 max-w-md">
            {/* Hero polaroid */}
            <div
              className="relative bg-mr-papier-gloss p-2 md:p-3 shadow-[8px_8px_0_var(--color-mr-noir-encre)] flex-shrink-0"
              style={{ transform: 'rotate(-3deg)' }}
            >
              <div className="w-[200px] h-[240px] md:w-[280px] md:h-[340px] bg-mr-violet-grape/20 overflow-hidden relative">
                {/* Placeholder for hero video — will be replaced with real Seedance video */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <img src="/pnj/purrpaparazzi-default.png" alt="" width={180} height={220} className="object-contain" />
                </div>
              </div>
              <p className="font-[family-name:var(--font-playfair)] italic text-sm md:text-base text-center mt-1 text-mr-noir-encre">
                Midnight Porch Musician
              </p>
              {/* Sticker on polaroid corner */}
              <div className="absolute -top-3 -right-3">
                <MrSticker label="HOT!" color="rouge" size="sm" rotation={15} />
              </div>
            </div>

            {/* Hero title */}
            <div className="text-center">
              <h1 className="font-[family-name:var(--font-anton)] text-[clamp(2rem,8vw,4.5rem)] uppercase leading-[0.85]">
                <span className="text-mr-papier-gloss [-webkit-text-stroke:2px_var(--color-mr-noir-encre)] md:[-webkit-text-stroke:3px_var(--color-mr-noir-encre)]" style={{ paintOrder: 'stroke fill' }}>
                  {t('hero.title')}
                </span>
                <br />
                <span className="title-pop">{t('hero.titleAccent')}</span>
              </h1>
              {/* Price handwritten */}
              <p
                className="font-[family-name:var(--font-permanent-marker)] text-lg md:text-2xl text-mr-rouge-cerise mt-1"
                style={{ transform: 'rotate(-3deg)' }}
              >
                {t('hero.subtitle')}
              </p>
            </div>

            {/* CTA */}
            <button
              className="animate-cta-pulse bg-mr-jaune-candy text-mr-noir-encre border-4 border-mr-noir-encre rounded-full px-6 py-3 md:px-10 md:py-4 font-[family-name:var(--font-anton)] text-base md:text-xl uppercase tracking-wide shadow-[8px_8px_0_var(--color-mr-noir-encre)] hover:scale-105 hover:shadow-[12px_12px_0_var(--color-mr-noir-encre)] transition-all cursor-pointer flex-shrink-0"
              style={{ transform: 'rotate(-1deg)' }}
            >
              {t('hero.cta')}
            </button>

            {/* Social proof */}
            <p className="font-[family-name:var(--font-silkscreen)] text-[8px] md:text-[10px] text-mr-noir-encre/50 text-center">
              {t('hero.socialProof')}
            </p>
          </div>

          {/* PNJ right: GLAMEOW */}
          <div className="hidden md:block flex-shrink-0 self-start mt-12" style={{ animation: 'bubble-float 4s ease-in-out infinite', animationDelay: '1s' }}>
            <img src="/pnj/glameow-default.png" alt="" width={90} height={110} className="drop-shadow-lg" />
          </div>
        </div>

        {/* ZONE C: Category carousel */}
        <div className="flex-shrink-0 px-2 md:px-8 pb-3 md:pb-4">
          {/* PNJ flanking carousel on desktop */}
          <div className="relative">
            <div className="hidden md:block absolute -left-2 bottom-0 z-30">
              <img src="/pnj/djmiaou-default.png" alt="" width={60} height={72} className="drop-shadow-md" />
            </div>
            <div className="hidden md:block absolute -right-2 bottom-0 z-30">
              <img src="/pnj/chaupion-default.png" alt="" width={60} height={72} className="drop-shadow-md" />
            </div>

            {/* Carousel */}
            <div className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide px-8 md:px-16 pb-2 snap-x snap-mandatory">
              {CATEGORIES.map((cat, i) => (
                <div
                  key={cat}
                  className="flex-shrink-0 snap-center bg-mr-papier-gloss p-1.5 md:p-2 shadow-[4px_4px_0_var(--color-mr-noir-encre)] cursor-pointer hover:scale-105 hover:-translate-y-1 transition-all"
                  style={{ transform: `rotate(${(i % 2 === 0 ? -1 : 1) * (2 + i)}deg)` }}
                >
                  <div className="w-[100px] h-[120px] md:w-[130px] md:h-[160px] bg-mr-cyan-piscine/20" />
                  <p className="font-[family-name:var(--font-playfair)] italic text-[10px] md:text-xs text-center mt-0.5 text-mr-noir-encre truncate max-w-[100px] md:max-w-[130px]">
                    {cat}
                  </p>
                </div>
              ))}
            </div>

            {/* Scene counter */}
            <p className="text-center font-[family-name:var(--font-silkscreen)] text-[8px] md:text-[9px] text-mr-noir-encre/40 mt-1">
              SCENE 1 / 41
            </p>
          </div>
        </div>
      </div>

      {/* Mobile PNJ: CATSOME bottom-left, GLAMEOW bottom-right */}
      <div className="md:hidden absolute bottom-[140px] left-1 z-30">
        <img src="/pnj/catsome-default.png" alt="" width={50} height={60} className="drop-shadow-md" />
      </div>
      <div className="md:hidden absolute bottom-[140px] right-1 z-30">
        <img src="/pnj/glameow-default.png" alt="" width={45} height={55} className="drop-shadow-md" />
      </div>
    </div>
  );
}
