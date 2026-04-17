'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

const SECTIONS = ['trending', 'music', 'dance', 'cinematic', 'moments'] as const;

export function Notebook() {
  const t = useTranslations('nav');

  return (
    <div
      className={cn(
        'w-72 md:w-80 bg-mr-paper shadow-[3px_4px_10px_rgba(26,22,20,0.3)]',
        'border border-mr-paper-shadow/50'
      )}
      style={{ transform: 'rotate(0.5deg)' }}
    >
      {/* Spine line */}
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-mr-ink-red/20" />

      <div className="grid grid-cols-2 divide-x divide-mr-paper-shadow/30">
        {/* Left page: title */}
        <div className="p-4 md:p-5">
          <h1 className="font-[family-name:var(--font-caveat)] text-2xl md:text-3xl text-mr-ink leading-tight">
            {t('title')}
          </h1>
          <p className="font-[family-name:var(--font-caveat)] text-lg md:text-xl text-mr-ink mt-0.5">
            {t('subtitle')}
          </p>
          <p className="font-[family-name:var(--font-special-elite)] text-[10px] text-mr-ink/40 mt-3 uppercase tracking-widest">
            {t('location')}
          </p>
        </div>

        {/* Right page: nav */}
        <nav className="p-4 md:p-5">
          <ul className="space-y-2">
            {SECTIONS.map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  className={cn(
                    'group flex items-center gap-1',
                    'font-[family-name:var(--font-caveat)] text-base md:text-lg text-mr-ink-blue',
                    'hover:text-mr-ink-red transition-colors duration-200'
                  )}
                >
                  <span className="text-mr-ink/40 group-hover:text-mr-ink-red transition-colors">
                    &rarr;
                  </span>
                  <span className="relative">
                    {t(`sections.${section}`)}
                    {/* Underline on hover — simulates pen stroke */}
                    <span className="absolute left-0 -bottom-0.5 w-0 h-[1.5px] bg-mr-ink-red group-hover:w-full transition-all duration-300 ease-[var(--ease-tactile)]" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Ruled lines decoration */}
      <div className="px-4 pb-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="h-px bg-mr-ink-blue/8 mt-4" />
        ))}
      </div>
    </div>
  );
}
