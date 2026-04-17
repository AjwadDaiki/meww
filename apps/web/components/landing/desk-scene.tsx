'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useTranslations } from 'next-intl';
import { MrEnvelope } from '@/components/ui/mr-envelope';
import { MrPostit } from '@/components/ui/mr-postit';
import { MrPolaroid } from '@/components/ui/mr-polaroid';
import { Notebook } from './notebook';
import { PhoneDial } from './phone-dial';
import { CorkWall } from './cork-wall';
import { MobileNav } from './mobile-nav';

export function DeskScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const t = useTranslations();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax: desk moves down, cork wall revealed
  const deskY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const wallOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0.3, 1]);
  const wallScale = useTransform(scrollYProgress, [0.2, 0.6], [0.97, 1]);

  return (
    <div ref={containerRef} className="relative min-h-[200vh]">
      {/* Cork wall background (revealed on scroll) */}
      <motion.div
        className="fixed inset-0 z-0"
        style={{ opacity: wallOpacity, scale: wallScale }}
      >
        <CorkWall />
      </motion.div>

      {/* Desk surface (moves down on scroll) */}
      <motion.div
        className="relative z-10 min-h-screen"
        style={{ y: deskY }}
      >
        <div
          className="relative min-h-screen bg-cover bg-center"
          style={{ backgroundImage: 'url(/textures/wood-desk.jpg)' }}
        >
          {/* Wood grain overlay for depth */}
          <div className="absolute inset-0 bg-mr-wood-dark/20" />

          {/* Desk content */}
          <div className="relative z-10 mx-auto max-w-6xl px-4 py-8 md:py-12">
            {/* Top row: Envelope, Notebook, Phone */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
              {/* Envelope - upload zone */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 0.61, 0.36, 1] }}
                className="flex justify-center md:justify-start"
              >
                <MrEnvelope />
              </motion.div>

              {/* Notebook - title + nav */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
                className="flex justify-center"
              >
                <Notebook />
              </motion.div>

              {/* Phone dial */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
                className="hidden md:flex justify-end"
              >
                <PhoneDial />
              </motion.div>
            </div>

            {/* Middle zone: work area + post-its */}
            <div className="mt-8 md:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Left: value prop post-it */}
              <motion.div
                initial={{ opacity: 0, rotate: -5 }}
                animate={{ opacity: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex justify-center md:justify-start"
              >
                <MrPostit text={t('postits.price')} color="yellow" rotation={2} />
              </motion.div>

              {/* Center: work zone placeholder */}
              <div className="flex justify-center items-center min-h-[200px]">
                <p className="font-[family-name:var(--font-special-elite)] text-mr-paper/40 text-xs uppercase tracking-[0.2em]">
                  scene . 001 . take 01
                </p>
              </div>

              {/* Right: fun post-its */}
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

            {/* Bottom row: more post-its and film strip decor */}
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
              <div className="w-6 h-10 border-2 border-mr-paper/30 rounded-full flex justify-center pt-2">
                <div className="w-1 h-2 bg-mr-paper/40 rounded-full" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
      {/* Mobile bottom nav */}
      <MobileNav />
    </div>
  );
}
