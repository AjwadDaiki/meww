'use client';

import { useTranslations } from 'next-intl';

export function PhoneDial() {
  const t = useTranslations('phone');

  return (
    <div className="relative" style={{ transform: 'rotate(2deg)' }}>
      {/* Phone body */}
      <div className="w-28 h-36 bg-mr-ink rounded-sm shadow-[2px_3px_8px_rgba(26,22,20,0.4)] flex flex-col items-center justify-center gap-2">
        {/* Handset placeholder */}
        <div className="w-16 h-4 bg-mr-ink-blue/20 rounded-full" />

        {/* Dial placeholder */}
        <div className="w-14 h-14 rounded-full border-2 border-mr-paper/15 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-mr-paper/10" />
        </div>

        {/* Base */}
        <div className="w-20 h-1 bg-mr-paper/10 rounded-full" />
      </div>

      {/* Handwritten label */}
      <p
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-[family-name:var(--font-caveat)] text-xs text-mr-paper/50"
      >
        {t('label')}
      </p>
    </div>
  );
}
