'use client';

import { useTranslations } from 'next-intl';

export function PhoneDial() {
  const t = useTranslations('phone');

  return (
    <div className="relative" style={{ transform: 'rotate(2deg)' }}>
      {/* Placeholder phone body — will be replaced with real Bakelite photo asset */}
      <div className="w-28 h-36 bg-mr-ink shadow-[2px_3px_8px_rgba(26,22,20,0.4)] flex flex-col items-center justify-center gap-2">
        {/* Handset */}
        <div className="w-16 h-4 bg-mr-paper/10 rounded-sm" />

        {/* Dial area */}
        <svg viewBox="0 0 56 56" className="w-14 h-14" aria-hidden="true">
          <circle cx="28" cy="28" r="26" fill="none" stroke="var(--mr-paper)" strokeWidth="1.5" opacity="0.15" />
          <circle cx="28" cy="28" r="4" fill="var(--mr-paper)" opacity="0.1" />
          {/* Finger holes */}
          {[...Array(10)].map((_, i) => {
            const angle = (i * 30 - 60) * (Math.PI / 180);
            const cx = 28 + 18 * Math.cos(angle);
            const cy = 28 + 18 * Math.sin(angle);
            return <circle key={i} cx={cx} cy={cy} r="3" fill="var(--mr-paper)" opacity="0.08" />;
          })}
        </svg>

        {/* Base */}
        <div className="w-20 h-1 bg-mr-paper/10 rounded-sm" />
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
