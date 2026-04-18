import { useTranslations } from 'next-intl';
import { MrChromeText } from '@/components/ui/mr-chrome-text';

export function FooterSection() {
  const t = useTranslations('footer');

  return (
    <footer className="py-10 px-4 text-center">
      <MrChromeText className="text-2xl mb-4">MEOWREEL</MrChromeText>

      <p className="font-[family-name:var(--font-handwritten)] text-mr-cream/60 text-sm mb-3">
        {t('tagline')}
      </p>

      <nav className="flex flex-wrap justify-center gap-4 mb-6">
        {(['cgv', 'cgu', 'privacy', 'contact'] as const).map((link) => (
          <a
            key={link}
            href={`#${link}`}
            className="font-[family-name:var(--font-pixel)] text-[10px] uppercase tracking-widest text-mr-cream/40 hover:text-mr-pink-hot transition-colors"
          >
            {t(`links.${link}`)}
          </a>
        ))}
      </nav>

      <p className="font-[family-name:var(--font-pixel)] text-[10px] text-mr-cream/30 uppercase tracking-wider">
        {t('copyright')}
      </p>
    </footer>
  );
}
