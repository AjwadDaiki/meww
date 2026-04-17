'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

const SECTIONS = ['trending', 'music', 'dance', 'cinematic', 'moments'] as const;

export function MobileNav() {
  const t = useTranslations('nav');

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-mr-paper border-t border-mr-paper-shadow/50 shadow-[0_-2px_10px_rgba(26,22,20,0.15)]">
      <div className="flex overflow-x-auto scrollbar-hide">
        {SECTIONS.map((section) => (
          <a
            key={section}
            href={`#${section}`}
            className={cn(
              'flex-shrink-0 px-4 py-3',
              'font-[family-name:var(--font-caveat)] text-base text-mr-ink-blue',
              'active:text-mr-ink-red transition-colors duration-200',
              'border-r border-mr-paper-shadow/20 last:border-r-0'
            )}
          >
            {t(`sections.${section}`)}
          </a>
        ))}
      </div>
    </nav>
  );
}
