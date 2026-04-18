'use client';

import { MrSticker } from '@/components/stickers/mr-sticker';
import { MrSparkle } from '@/components/ui/mr-sparkle';
import { MrChromeBubble } from '@/components/ui/mr-chrome-bubble';
import { MrRadialBeams } from '@/components/ui/mr-radial-beams';

const STICKER_CONFIGS = [
  { label: 'VIRAL!', color: 'rose' as const, rotation: -8 },
  { label: 'OMG!', color: 'jaune' as const, rotation: 12 },
  { label: 'HOT!', color: 'rouge' as const, rotation: -5 },
  { label: 'NEW!', color: 'cyan' as const, rotation: 7 },
  { label: 'STAR!', color: 'violet' as const, rotation: -12 },
  { label: 'WOW!', color: 'vert' as const, rotation: 3 },
  { label: 'SLAY!', color: 'rose' as const, rotation: -10 },
  { label: 'ICONIC!', color: 'chrome' as const, rotation: 6 },
  { label: 'MOOD!', color: 'orange' as const, rotation: -3 },
  { label: 'LIVE!', color: 'rouge' as const, rotation: 15 },
];

const PALETTE = [
  { name: 'rose-tama', hex: '#FF5FA2' },
  { name: 'jaune-candy', hex: '#FFE14B' },
  { name: 'cyan-piscine', hex: '#3EC4E6' },
  { name: 'vert-apple', hex: '#7FD957' },
  { name: 'orange-pop', hex: '#FF8C42' },
  { name: 'violet-grape', hex: '#B565E8' },
  { name: 'rouge-cerise', hex: '#FF4757' },
  { name: 'papier-gloss', hex: '#FFFEF8' },
  { name: 'noir-encre', hex: '#0A0811' },
  { name: 'chrome-gold', hex: '#FFD840' },
];

export default function PreviewPage() {
  return (
    <div className="h-dvh overflow-y-auto relative">
      <MrRadialBeams />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 space-y-12">
        {/* Locked Palette */}
        <section className="bg-mr-papier-gloss/90 p-4 border-4 border-mr-noir-encre shadow-[6px_6px_0_var(--color-mr-noir-encre)]">
          <h2 className="font-[family-name:var(--font-pixel)] text-xs uppercase tracking-widest mb-4">
            Locked Palette (DESIGN4.md 0.6)
          </h2>
          <div className="flex flex-wrap gap-2">
            {PALETTE.map((c) => (
              <div key={c.name} className="text-center">
                <div
                  className="w-14 h-14 border-3 border-mr-noir-encre shadow-[3px_3px_0_var(--color-mr-noir-encre)]"
                  style={{ backgroundColor: c.hex }}
                />
                <p className="font-[family-name:var(--font-pixel)] text-[7px] mt-1">{c.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Typography */}
        <section className="bg-mr-papier-gloss/90 p-4 border-4 border-mr-noir-encre shadow-[6px_6px_0_var(--color-mr-noir-encre)]">
          <h2 className="font-[family-name:var(--font-pixel)] text-xs uppercase tracking-widest mb-4">
            Typography
          </h2>
          <div className="space-y-3">
            <p className="font-[family-name:var(--font-anton)] text-4xl uppercase">Anton Tabloid Bold</p>
            <p className="font-[family-name:var(--font-playfair)] text-3xl italic">Playfair Display Italic</p>
            <p className="font-[family-name:var(--font-caveat)] text-2xl text-mr-cyan-piscine">Caveat Handwritten</p>
            <p className="font-[family-name:var(--font-permanent-marker)] text-2xl text-mr-rose-tama">Permanent Marker Stickers</p>
            <p className="font-[family-name:var(--font-silkscreen)] text-lg">Silkscreen Pixel LCD</p>
            <p className="font-[family-name:var(--font-orbitron)] text-lg">Orbitron Chrome Tech</p>
          </div>
        </section>

        {/* Text Effects */}
        <section className="bg-mr-papier-gloss/90 p-6 border-4 border-mr-noir-encre shadow-[6px_6px_0_var(--color-mr-noir-encre)]">
          <h2 className="font-[family-name:var(--font-pixel)] text-xs uppercase tracking-widest mb-4">
            Text Effects
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="title-pop font-[family-name:var(--font-anton)] text-5xl md:text-7xl uppercase">STAR</h3>
              <p className="font-[family-name:var(--font-pixel)] text-[9px] opacity-50 mt-2">.title-pop</p>
            </div>
            <div className="bg-mr-noir-encre p-4 inline-block">
              <h3 className="chrome-text font-[family-name:var(--font-orbitron)] text-3xl md:text-4xl">MEOWREEL</h3>
              <p className="font-[family-name:var(--font-pixel)] text-[9px] text-mr-papier-gloss/50 mt-2">.chrome-text</p>
            </div>
          </div>
        </section>

        {/* 10 Stickers */}
        <section className="bg-mr-papier-gloss/90 p-4 border-4 border-mr-noir-encre shadow-[6px_6px_0_var(--color-mr-noir-encre)]">
          <h2 className="font-[family-name:var(--font-pixel)] text-xs uppercase tracking-widest mb-4">
            10 Stickers
          </h2>
          <div className="flex flex-wrap gap-3 items-center">
            {STICKER_CONFIGS.map((s) => (
              <MrSticker key={s.label} label={s.label} color={s.color} rotation={s.rotation} wiggle />
            ))}
          </div>
        </section>

        {/* Sparkles + Bubbles */}
        <section className="bg-mr-papier-gloss/90 p-4 border-4 border-mr-noir-encre shadow-[6px_6px_0_var(--color-mr-noir-encre)]">
          <h2 className="font-[family-name:var(--font-pixel)] text-xs uppercase tracking-widest mb-4">
            Sparkles + Chrome Bubbles
          </h2>
          <div className="flex gap-6 items-center flex-wrap">
            <MrSparkle size={10} color="var(--color-mr-jaune-candy)" delay={0} />
            <MrSparkle size={16} color="var(--color-mr-rose-tama)" delay={0.3} />
            <MrSparkle size={22} color="var(--color-mr-cyan-piscine)" delay={0.6} />
            <MrSparkle size={14} color="var(--color-mr-chrome-gold)" delay={0.9} />
            <MrSparkle size={8} color="#FFFFFF" delay={1.2} />
            <MrChromeBubble size={30} duration={2.5} />
            <MrChromeBubble size={50} duration={3.5} />
            <MrChromeBubble size={20} duration={2} />
          </div>
        </section>

        {/* CTA */}
        <section className="bg-mr-papier-gloss/90 p-4 border-4 border-mr-noir-encre shadow-[6px_6px_0_var(--color-mr-noir-encre)]">
          <h2 className="font-[family-name:var(--font-pixel)] text-xs uppercase tracking-widest mb-4">
            CTA Button
          </h2>
          <button
            className="animate-cta-pulse bg-mr-jaune-candy text-mr-noir-encre border-4 border-mr-noir-encre rounded-full px-8 py-4 font-[family-name:var(--font-anton)] text-xl uppercase tracking-wide shadow-[8px_8px_0_var(--color-mr-noir-encre)] hover:scale-105 hover:shadow-[12px_12px_0_var(--color-mr-noir-encre)] transition-all cursor-pointer"
            style={{ transform: 'rotate(-1deg)' }}
          >
            UPLOAD TON CHAT 0,99EUR
          </button>
        </section>
      </div>
    </div>
  );
}
