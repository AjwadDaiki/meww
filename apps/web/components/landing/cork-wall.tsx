'use client';

import { useTranslations } from 'next-intl';
import { MrPolaroid } from '@/components/ui/mr-polaroid';

const SECTIONS = [
  { id: 'trending', color: 'border-mr-ink-red' },
  { id: 'music', color: 'border-mr-ink-blue' },
  { id: 'dance', color: 'border-mr-postit' },
  { id: 'cinematic', color: 'border-mr-ink' },
  { id: 'moments', color: 'border-mr-stamp-green' },
] as const;

const POLAROID_ROTATIONS = [-4, 2, -1, 5, -3, 1, -2, 4, 3, -5, 0, 2];

export function CorkWall() {
  const t = useTranslations('categories.sections');

  return (
    <div className="min-h-screen bg-mr-cork p-4 md:p-8 overflow-hidden">
      {/* Cork texture depth — uses opacity spots, no gradients per DESIGN.md */}
      <div className="absolute inset-0 bg-mr-wood-dark/10" />

      <div className="relative z-10 mx-auto max-w-6xl space-y-12 md:space-y-16 pt-8">
        {SECTIONS.map((section, sectionIdx) => (
          <section key={section.id} id={section.id} className="scroll-mt-8">
            {/* Section label with string divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className={`h-px flex-1 ${section.color} border-t border-dashed opacity-40`} />
              <h2
                className="font-[family-name:var(--font-special-elite)] text-sm uppercase tracking-[0.2em] text-mr-paper"
              >
                {t(section.id)}
              </h2>
              <div className={`h-px flex-1 ${section.color} border-t border-dashed opacity-40`} />
            </div>

            {/* Polaroids: horizontal scroll on mobile, grid wrap on desktop */}
            <div className="flex gap-4 md:gap-6 overflow-x-auto md:overflow-visible md:flex-wrap md:justify-center pb-4 md:pb-0 snap-x snap-mandatory md:snap-none scrollbar-hide">
              {[...Array(6)].map((_, i) => (
                <div key={`${section.id}-${i}`} className="flex-shrink-0 snap-center">
                  <MrPolaroid
                    rotation={POLAROID_ROTATIONS[(sectionIdx * 6 + i) % POLAROID_ROTATIONS.length]}
                  />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
