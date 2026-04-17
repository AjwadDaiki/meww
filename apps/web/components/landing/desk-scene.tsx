'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useTranslations } from 'next-intl';
import { MrEnvelope } from '@/components/ui/mr-envelope';
import { MrPostit } from '@/components/ui/mr-postit';
import { Notebook } from './notebook';
import { PhoneDial } from './phone-dial';
import { CorkWall } from './cork-wall';
import { MobileNav } from './mobile-nav';
import { GuidingHand } from '@/components/illustrations/guiding-hand';
import { GuideArrow } from '@/components/illustrations/guide-arrow';
import { useFlowStore } from '@/lib/store/flow-store';

export function DeskScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations();
  const currentStep = useFlowStore((s) => s.currentStep);
  const [showGuide, setShowGuide] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Hide guidance after 4s or on any interaction
  useEffect(() => {
    const timer = setTimeout(() => setShowGuide(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hasInteracted) return;
    const handler = () => {
      setHasInteracted(true);
      setShowGuide(false);
    };
    window.addEventListener('pointerdown', handler, { once: true });
    window.addEventListener('scroll', handler, { once: true });
    return () => {
      window.removeEventListener('pointerdown', handler);
      window.removeEventListener('scroll', handler);
    };
  }, [hasInteracted]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const deskY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const wallOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0.3, 1]);
  const wallScale = useTransform(scrollYProgress, [0.2, 0.6], [0.97, 1]);

  // Step-based opacity: wall grayed out before upload
  const wallStepOpacity = currentStep === 'upload' ? 0.4 : 1;

  return (
    <div ref={containerRef} className="relative min-h-[200vh]">
      {/* Cork wall background */}
      <motion.div
        className="fixed inset-0 z-0 transition-opacity duration-600 ease-[var(--ease-tactile)]"
        style={{
          opacity: wallOpacity,
          scale: wallScale,
        }}
      >
        <div style={{ opacity: wallStepOpacity }} className="transition-opacity duration-600">
          <CorkWall />
        </div>
      </motion.div>

      {/* Desk surface */}
      <motion.div
        className="relative z-10 min-h-screen"
        style={{ y: deskY }}
      >
        <div
          className="relative min-h-screen bg-cover bg-center"
          style={{ backgroundImage: 'url(/textures/wood-desk.jpg)' }}
        >
          <div className="absolute inset-0 bg-mr-wood-dark/20" />

          <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 md:py-12">
            {/* Top row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
              {/* Envelope with guidance */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
                className="relative flex justify-center md:justify-start"
              >
                <MrEnvelope />

                {/* Guiding hand + arrow overlay */}
                <AnimatePresence>
                  {showGuide && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="absolute -top-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
                    >
                      <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                      >
                        <GuidingHand width={60} height={75} />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Notebook */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
                className="flex justify-center"
              >
                <Notebook />
              </motion.div>

              {/* Phone */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
                className="hidden md:flex justify-end"
              >
                <PhoneDial />
              </motion.div>
            </div>

            {/* Guide arrow — visible during first load */}
            <AnimatePresence>
              {showGuide && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.7 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute top-1/3 left-1/2 -translate-x-1/2 z-20 pointer-events-none hidden md:block"
                >
                  <GuideArrow width={160} height={100} />
                  <p className="font-[family-name:var(--font-caveat)] text-lg text-mr-ink-red mt-1 text-center">
                    {t('hero.cta')}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Middle zone */}
            <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, rotate: -5 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex justify-center md:justify-start"
              >
                <MrPostit text={t('postits.price')} color="yellow" rotation={2} />
              </motion.div>

              <div className="flex justify-center items-center min-h-[200px]">
                {/* Decorative typewriter label, not user-facing copy */}
                <p className="font-[family-name:var(--font-special-elite)] text-mr-paper/40 text-xs uppercase tracking-[0.2em]" aria-hidden="true">
                  SCENE &middot; 001 &middot; TAKE 01
                </p>
              </div>

              <div className="hidden md:flex flex-col gap-3 items-end">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                >
                  <MrPostit text={t('postits.spielberg')} rotation={-3} />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <MrPostit text={t('postits.dumoulin')} color="pink" rotation={4} />
                </motion.div>
              </div>
            </div>

            {/* Bottom post-its */}
            <div className="mt-8 md:mt-12 flex flex-wrap justify-center gap-4 md:gap-8">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                className="hidden md:block"
              >
                <MrPostit text={t('postits.lawyers')} rotation={-2} />
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6 }}
                className="hidden md:block"
              >
                <MrPostit text={t('postits.pintard')} color="pink" rotation={1} />
              </motion.div>
            </div>

            {/* Scroll hint */}
            <motion.div
              className="mt-12 flex justify-center"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
            >
              <svg width="24" height="40" viewBox="0 0 24 40" className="opacity-40" aria-hidden="true">
                <path
                  d="M12 2 C12 2, 11 18, 12 30 M6 24 C6 24, 12 32, 18 24"
                  fill="none"
                  stroke="var(--mr-paper)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Mobile nav */}
      <MobileNav />
    </div>
  );
}
