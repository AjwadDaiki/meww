'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { DeskEnvelope } from '@/components/illustrations/desk-envelope';
import { StepBadge } from '@/components/illustrations/step-badge';

type MrEnvelopeProps = {
  className?: string;
};

export function MrEnvelope({ className }: MrEnvelopeProps) {
  const t = useTranslations('upload');

  return (
    <div
      className={cn(
        'relative cursor-pointer group',
        'transition-transform duration-300 ease-[var(--ease-tactile)]',
        'hover:-translate-y-1',
        className
      )}
      style={{ transform: 'rotate(-1deg)' }}
    >
      {/* Step badge */}
      <div className="absolute -top-2 -right-2 z-20">
        <StepBadge step={1} />
      </div>

      {/* SVG envelope illustration */}
      <DeskEnvelope width={260} height={300} />

      {/* Text overlay: main CTA */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-20 px-6">
        <p className="font-[family-name:var(--font-cormorant)] font-bold text-lg text-mr-ink text-center uppercase tracking-wide leading-tight">
          {t('dropzone.default')}
        </p>
        <p className="mt-2 font-[family-name:var(--font-special-elite)] text-[10px] text-mr-ink/50 uppercase tracking-widest">
          {t('hint')}
        </p>
      </div>

      {/* Hover pulse effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute inset-0 animate-pulse opacity-5 bg-mr-paper" />
      </div>
    </div>
  );
}
