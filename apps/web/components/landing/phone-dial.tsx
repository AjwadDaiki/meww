'use client';

import { useTranslations } from 'next-intl';
import { DeskPhone } from '@/components/illustrations/desk-phone';

export function PhoneDial() {
  const t = useTranslations('phone');

  return (
    <div className="relative" style={{ transform: 'rotate(2deg)' }}>
      <DeskPhone />

      {/* Handwritten label */}
      <p
        className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap font-[family-name:var(--font-caveat)] text-xs text-mr-paper/50"
      >
        {t('label')}
      </p>
    </div>
  );
}
