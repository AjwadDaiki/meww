'use client';

import { MrBackground } from '@/components/ui/mr-background';
import { MrButton } from '@/components/ui/mr-button';
import { MrPolaroid } from '@/components/ui/mr-polaroid';
import { MrStatsBar } from '@/components/ui/mr-stats-bar';
import { MrSparkle } from '@/components/ui/mr-sparkle';
import { MrChromeText } from '@/components/ui/mr-chrome-text';
import { MrScreen } from '@/components/ui/mr-screen';
import { MrCategoryCard } from '@/components/ui/mr-category-card';
import { MrSticker } from '@/components/ui/mr-sticker';

export default function PreviewPage() {
  return (
    <div className="relative min-h-screen">
      <MrBackground />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-12 space-y-16">
        {/* Chrome Text */}
        <section>
          <h2 className="text-mr-cream text-sm uppercase tracking-widest mb-4 font-[family-name:var(--font-pixel)]">MrChromeText</h2>
          <MrChromeText className="text-4xl">MEOWREEL</MrChromeText>
        </section>

        {/* Pop Title */}
        <section>
          <h2 className="text-mr-cream text-sm uppercase tracking-widest mb-4 font-[family-name:var(--font-pixel)]">Pop Title</h2>
          <h1 className="pop-title font-[family-name:var(--font-anton)] text-6xl md:text-8xl uppercase">
            STAR.
          </h1>
        </section>

        {/* Buttons */}
        <section>
          <h2 className="text-mr-cream text-sm uppercase tracking-widest mb-4 font-[family-name:var(--font-pixel)]">MrButton</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <MrButton variant="primary" size="sm">Small</MrButton>
            <MrButton variant="primary" size="md">Primary</MrButton>
            <MrButton variant="primary" size="lg">Large</MrButton>
            <MrButton variant="primary" size="xl" pulse>XL Pulse</MrButton>
          </div>
          <div className="flex flex-wrap gap-4 items-center mt-4">
            <MrButton variant="secondary">Secondary</MrButton>
            <MrButton variant="chrome">Chrome</MrButton>
            <MrButton variant="ghost">Ghost</MrButton>
            <MrButton variant="primary" loading>Loading</MrButton>
            <MrButton variant="primary" disabled>Disabled</MrButton>
          </div>
        </section>

        {/* Polaroids */}
        <section>
          <h2 className="text-mr-cream text-sm uppercase tracking-widest mb-4 font-[family-name:var(--font-pixel)]">MrPolaroid</h2>
          <div className="flex flex-wrap gap-6">
            <MrPolaroid caption="Jazz Trumpet" rotation={-3} />
            <MrPolaroid caption="Ninja Night" rotation={2} showStats />
            <MrPolaroid caption="Disco 70s" rotation={-5} />
          </div>
        </section>

        {/* Stats Bars */}
        <section>
          <h2 className="text-mr-cream text-sm uppercase tracking-widest mb-4 font-[family-name:var(--font-pixel)]">MrStatsBar</h2>
          <div className="lcd-screen p-4 max-w-xs space-y-2">
            <MrStatsBar label="FAME" value={89} variant="fame" />
            <MrStatsBar label="DRAMA" value={94} variant="drama" />
            <MrStatsBar label="VIBES" value={76} variant="vibes" />
          </div>
        </section>

        {/* Sparkles */}
        <section>
          <h2 className="text-mr-cream text-sm uppercase tracking-widest mb-4 font-[family-name:var(--font-pixel)]">MrSparkle</h2>
          <div className="flex gap-6 items-center">
            <MrSparkle size={8} color="var(--color-mr-yellow-gold)" delay={0} />
            <MrSparkle size={14} color="var(--color-mr-pink-hot)" delay={0.5} />
            <MrSparkle size={20} color="var(--color-mr-cyan-dream)" delay={1} />
            <MrSparkle size={24} color="var(--color-mr-white-pure)" delay={1.5} />
          </div>
        </section>

        {/* Screen */}
        <section>
          <h2 className="text-mr-cream text-sm uppercase tracking-widest mb-4 font-[family-name:var(--font-pixel)]">MrScreen</h2>
          <div className="flex flex-col gap-6">
            <MrScreen variant="yellow">
              <div className="text-center py-8">
                <p className="font-[family-name:var(--font-pixel)] text-sm text-mr-black-soft">PRODUCING...</p>
                <div className="mt-2 pixel-bar text-mr-black-soft">{'▓'.repeat(5)}{'░'.repeat(5)} 50%</div>
              </div>
            </MrScreen>
            <MrScreen variant="pink">
              <div className="text-center py-8">
                <p className="font-[family-name:var(--font-cormorant)] font-bold italic text-2xl text-mr-black-soft">Pink variant</p>
              </div>
            </MrScreen>
          </div>
        </section>

        {/* Category Cards */}
        <section>
          <h2 className="text-mr-cream text-sm uppercase tracking-widest mb-4 font-[family-name:var(--font-pixel)]">MrCategoryCard</h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
            <MrCategoryCard name="Midnight Porch Musician" />
            <MrCategoryCard name="Jazz Trumpet" />
            <MrCategoryCard name="Ninja Night" />
            <MrCategoryCard name="Disco 70s" />
          </div>
        </section>

        {/* Stickers */}
        <section>
          <h2 className="text-mr-cream text-sm uppercase tracking-widest mb-4 font-[family-name:var(--font-pixel)]">MrSticker</h2>
          <div className="flex flex-wrap gap-3 items-center">
            <MrSticker text="OMG" color="var(--color-mr-pink-hot)" />
            <MrSticker text="VIRAL" color="var(--color-mr-yellow-pop)" />
            <MrSticker text="STAR" color="var(--color-mr-cyan-dream)" />
            <MrSticker text="HOT" color="var(--color-mr-orange-tang)" />
            <MrSticker text="NEW" color="var(--color-mr-green-mint)" />
            <MrSticker text="LIVE" color="var(--color-mr-red-love)" rotation={-5} />
            <MrSticker text="SLAY" color="var(--color-mr-lavender)" size="lg" />
            <MrSticker text="WOW" color="var(--color-mr-pink-soft)" />
            <MrSticker text="MOOD" color="var(--color-mr-peach)" />
            <MrSticker text="ICONIC" color="var(--color-mr-yellow-gold)" size="lg" />
          </div>
        </section>
      </div>
    </div>
  );
}
