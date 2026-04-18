'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'motion/react';
import { MrCategoryCard } from '@/components/ui/mr-category-card';

type CategorySectionProps = {
  sectionKey: string;
  categories: Array<{
    slug: string;
    name: string;
  }>;
};

export function CategorySection({ sectionKey, categories }: CategorySectionProps) {
  const t = useTranslations('sections');

  return (
    <section className="py-8 md:py-12">
      <motion.h2
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        className="font-[family-name:var(--font-cormorant)] font-bold italic text-2xl md:text-3xl text-mr-white-pure mb-4 px-4"
      >
        {t(sectionKey)}
      </motion.h2>

      <div className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide px-4 pb-4 snap-x snap-mandatory md:snap-none md:flex-wrap md:overflow-visible">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-30px' }}
            transition={{ delay: i * 0.08, ease: [0.22, 0.61, 0.36, 1] }}
            className="snap-center"
          >
            <MrCategoryCard
              name={cat.name}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
