'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { MrPolaroid } from '@/components/ui/mr-polaroid';
import { MrButton } from '@/components/ui/mr-button';
import { MrChromeText } from '@/components/ui/mr-chrome-text';
import { MrSparkle } from '@/components/ui/mr-sparkle';

export function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 md:py-20">
      {/* Chrome brand */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <MrChromeText className="text-xl md:text-2xl">MEOWREEL</MrChromeText>
      </motion.div>

      {/* Hero polaroid with video */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -8 }}
        animate={{ opacity: 1, scale: 1, rotate: 2 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative"
      >
        {/* Sparkles around the polaroid */}
        <div className="absolute -top-4 -left-4">
          <MrSparkle size={18} color="var(--color-mr-yellow-pop)" delay={0} duration={2.5} />
        </div>
        <div className="absolute -top-2 -right-6">
          <MrSparkle size={12} color="var(--color-mr-cyan-dream)" delay={0.5} duration={2} />
        </div>
        <div className="absolute -bottom-3 -right-3">
          <MrSparkle size={14} color="var(--color-mr-pink-hot)" delay={1} duration={3} />
        </div>

        <MrPolaroid
          posterSrc="/textures/wood-desk.jpg"
          caption="Midnight Porch Musician"
          rotation={2}
          showStats
          className="w-[280px] md:w-[320px]"
        />
      </motion.div>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-8 text-center"
      >
        <h1 className="font-[family-name:var(--font-anton)] text-[clamp(3rem,12vw,7rem)] leading-[0.9] uppercase">
          <span className="text-mr-white-pure">{t('title')}</span>
          <br />
          <span className="pop-title">{t('titleAccent')}</span>
        </h1>
      </motion.div>

      {/* Subtitle + price */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-3 font-[family-name:var(--font-handwritten)] text-xl md:text-2xl text-mr-cream/80"
        style={{ transform: 'rotate(-2deg)' }}
      >
        {t('subtitle')}
      </motion.p>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
        className="mt-8"
      >
        <MrButton variant="primary" size="xl" pulse>
          {t('cta')}
        </MrButton>
      </motion.div>

      {/* Social proof */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ delay: 1.2 }}
        className="mt-4 font-[family-name:var(--font-pixel)] text-xs text-mr-yellow-gold/70 uppercase tracking-wider"
      >
        {t('socialProof')}
      </motion.p>
    </section>
  );
}
