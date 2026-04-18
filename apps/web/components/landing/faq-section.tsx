'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

export function FaqSection() {
  const t = useTranslations('faq');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const items = [0, 1, 2];

  return (
    <section className="py-12 md:py-16 px-4 max-w-2xl mx-auto">
      <h2 className="font-[family-name:var(--font-anton)] text-3xl md:text-4xl text-mr-white-pure uppercase text-center mb-8">
        {t('title')}
      </h2>

      <div className="space-y-3">
        {items.map((i) => (
          <div key={i} className="lcd-screen overflow-hidden">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className={cn(
                'w-full text-left px-4 py-3 flex items-center justify-between',
                'font-[family-name:var(--font-cormorant)] font-bold text-lg text-mr-black-soft',
                'cursor-pointer hover:bg-mr-lavender/20 transition-colors'
              )}
            >
              <span>{t(`items.${i}.q`)}</span>
              <span
                className="text-mr-pink-hot text-xl transition-transform duration-200"
                style={{ transform: openIndex === i ? 'rotate(45deg)' : 'none' }}
              >
                +
              </span>
            </button>

            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <p className="px-4 pb-4 text-mr-black-soft/70 text-sm leading-relaxed">
                    {t(`items.${i}.a`)}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
