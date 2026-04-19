'use client';

import { useState, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useFlowStore } from '@/lib/store/flow-store';
import { MrSticker } from '@/components/stickers/mr-sticker';
import { MrSparkle } from '@/components/ui/mr-sparkle';
import { ActionModule } from './action-module';
import { DecorModule } from './decor-module';
import { DurationModule } from './duration-module';
import { SoundModule } from './sound-module';

type StudioCustomization = {
  action: string;
  decorType: 'auto' | 'preset' | 'user-upload';
  decorPresetId?: string;
  duration: 5 | 10 | 15;
  sound: boolean;
};

export function StudioLayout() {
  const t = useTranslations();
  const { photoUrl, draftOrderId } = useFlowStore();

  const [custom, setCustom] = useState<StudioCustomization>({
    action: 'midnight-porch-musician',
    decorType: 'auto',
    duration: 5,
    sound: false,
  });

  const [totalCents, setTotalCents] = useState(99);

  // Recalculate price on any change
  useEffect(() => {
    let cents = 99;
    if (custom.decorType === 'user-upload') cents += 99;
    if (custom.duration === 10) cents += 100;
    if (custom.duration === 15) cents += 200;
    if (custom.sound) cents += 99;
    setTotalCents(cents);
  }, [custom]);

  const handlePay = useCallback(async () => {
    if (!draftOrderId) return;
    // TODO: POST /api/checkout with customization + totalCents
    console.log('Pay', { orderId: draftOrderId, custom, totalCents });
  }, [draftOrderId, custom, totalCents]);

  const priceFormatted = `${(totalCents / 100).toFixed(2).replace('.', ',')}EUR`;

  return (
    <div className="h-dvh w-screen overflow-hidden relative bg-mr-papier-gloss">
      {/* Sparkles */}
      <div className="absolute top-[5%] left-[10%] z-10"><MrSparkle size={12} color="var(--color-mr-jaune-candy)" delay={0} /></div>
      <div className="absolute top-[8%] right-[8%] z-10"><MrSparkle size={16} color="var(--color-mr-rose-tama)" delay={0.5} /></div>
      <div className="absolute bottom-[15%] left-[5%] z-10"><MrSparkle size={10} color="var(--color-mr-cyan-piscine)" delay={1} /></div>
      <div className="absolute bottom-[10%] right-[10%] z-10"><MrSparkle size={14} color="var(--color-mr-chrome-gold)" delay={1.5} /></div>

      {/* Stickers */}
      <div className="absolute top-[3%] right-[3%] z-30"><MrSticker label="NEW!" color="cyan" size="sm" rotation={12} wiggle /></div>
      <div className="absolute bottom-[20%] left-[2%] z-30 hidden md:block"><MrSticker label="WOW!" color="vert" size="sm" rotation={-8} /></div>

      {/* Main layout */}
      <div className="relative z-20 h-full flex flex-col px-3 md:px-6 py-2 md:py-4">
        {/* Header */}
        <header className="flex items-center justify-between flex-shrink-0 mb-2">
          <span className="chrome-text font-[family-name:var(--font-orbitron)] text-base md:text-lg">MEOWREEL</span>
          <span className="font-[family-name:var(--font-silkscreen)] text-[8px] md:text-[9px] text-mr-noir-encre/40">STUDIO</span>
        </header>

        {/* Studio grid: modules around cat central */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-3 md:gap-6 min-h-0">

          {/* Left column: ACTION + DECOR */}
          <div className="flex md:flex-col gap-2 md:gap-3 flex-shrink-0">
            <ActionModule
              value={custom.action}
              onChange={(action) => setCustom((c) => ({ ...c, action }))}
            />
            <DecorModule
              value={custom.decorType}
              presetId={custom.decorPresetId}
              onChange={(decorType, presetId) => setCustom((c) => ({ ...c, decorType, decorPresetId: presetId }))}
            />
          </div>

          {/* Center: cat photo polaroid */}
          <div className="flex-shrink-0">
            <div
              className="relative bg-mr-papier-gloss p-2 md:p-3 shadow-[8px_8px_0_var(--color-mr-noir-encre)] border-2 border-mr-noir-encre"
              style={{ transform: 'rotate(-2deg)' }}
            >
              <div className="w-[160px] h-[200px] md:w-[220px] md:h-[280px] bg-mr-noir-encre/5 overflow-hidden">
                {photoUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img src={photoUrl} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-[family-name:var(--font-silkscreen)] text-[10px] text-mr-noir-encre/30">YOUR CAT</span>
                  </div>
                )}
              </div>
              <div className="absolute -top-2 -right-2">
                <MrSticker label="STAR!" color="violet" size="sm" rotation={10} />
              </div>
            </div>
          </div>

          {/* Right column: DURATION + SOUND */}
          <div className="flex md:flex-col gap-2 md:gap-3 flex-shrink-0">
            <DurationModule
              value={custom.duration}
              onChange={(duration) => setCustom((c) => ({ ...c, duration }))}
            />
            <SoundModule
              value={custom.sound}
              onChange={(sound) => setCustom((c) => ({ ...c, sound }))}
            />
          </div>
        </div>

        {/* Bottom: Price + Pay button */}
        <div className="flex-shrink-0 flex flex-col items-center gap-2 pb-2 md:pb-4">
          {/* Price badge */}
          <div className="font-[family-name:var(--font-permanent-marker)] text-2xl md:text-3xl text-mr-rouge-cerise" style={{ transform: 'rotate(-2deg)' }}>
            {priceFormatted}
          </div>

          {/* Pay button */}
          <button
            onClick={handlePay}
            className="animate-cta-pulse bg-mr-jaune-candy text-mr-noir-encre border-4 border-mr-noir-encre rounded-full px-8 py-3 md:px-12 md:py-4 font-[family-name:var(--font-anton)] text-base md:text-xl uppercase tracking-wide shadow-[8px_8px_0_var(--color-mr-noir-encre)] hover:scale-105 hover:shadow-[12px_12px_0_var(--color-mr-noir-encre)] transition-all cursor-pointer"
            style={{ transform: 'rotate(-1deg)' }}
          >
            PAYER {priceFormatted}
          </button>
        </div>
      </div>
    </div>
  );
}
