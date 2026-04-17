'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';
import { MrPolaroid } from './mr-polaroid';
import { MrStamp } from './mr-stamp';

type MrEnvelopeProps = {
  className?: string;
};

export function MrEnvelope({ className }: MrEnvelopeProps) {
  const t = useTranslations('upload');

  return (
    <div
      className={cn(
        'relative w-64 md:w-72',
        className
      )}
    >
      {/* Kraft envelope body */}
      <div
        className={cn(
          'relative bg-mr-wood-light p-4 pt-8',
          'shadow-[2px_4px_10px_rgba(26,22,20,0.3)]',
          'border border-mr-wood-mid/30'
        )}
        style={{ transform: 'rotate(-1deg)' }}
      >
        {/* Torn top edge effect */}
        <div className="absolute -top-1 left-0 right-0 h-2 bg-mr-wood-light"
          style={{
            clipPath: 'polygon(0 60%, 3% 40%, 6% 70%, 10% 30%, 14% 60%, 18% 20%, 22% 50%, 26% 35%, 30% 65%, 34% 25%, 38% 55%, 42% 40%, 46% 70%, 50% 30%, 54% 60%, 58% 45%, 62% 70%, 66% 25%, 70% 55%, 74% 35%, 78% 65%, 82% 20%, 86% 50%, 90% 40%, 94% 60%, 97% 30%, 100% 50%, 100% 100%, 0% 100%)',
          }}
        />

        {/* Stamp on envelope */}
        <div className="absolute top-2 right-3">
          <MrStamp label="CASTING 2026" variant="red" rotation={-2} />
        </div>

        {/* Polaroids peeking out */}
        <div className="relative mt-8 flex -space-x-6 justify-center">
          <MrPolaroid rotation={-8} className="relative z-10" />
          <MrPolaroid rotation={3} className="relative z-20" />
          <MrPolaroid rotation={-3} className="relative z-30 -translate-y-2" />
        </div>

        {/* Envelope label */}
        <p className="mt-3 text-center font-[family-name:var(--font-special-elite)] text-xs uppercase tracking-widest text-mr-ink/60">
          {t('dropzone.done')}
        </p>
      </div>

      {/* Drop hint */}
      <p className="mt-2 text-center font-[family-name:var(--font-caveat)] text-sm text-mr-ink/50">
        {t('dropzone.default')}
      </p>
    </div>
  );
}
