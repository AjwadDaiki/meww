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
      {/* Cork texture overlay */}
      <div className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(90,58,31,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(90,58,31,0.2) 0%, transparent 40%)',
        }}
      />

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

            {/* Polaroids grid */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {[...Array(6)].map((_, i) => (
                <MrPolaroid
                  key={`${section.id}-${i}`}
                  rotation={POLAROID_ROTATIONS[(sectionIdx * 6 + i) % POLAROID_ROTATIONS.length]}
                  caption={`scene ${String(sectionIdx * 6 + i + 1).padStart(3, '0')}`}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
