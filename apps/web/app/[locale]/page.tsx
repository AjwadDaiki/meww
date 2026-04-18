import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';

type HomePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: HomePageProps) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Phase 4 will replace this with the full single-screen landing
  return (
    <main className="h-dvh flex items-center justify-center">
      <div className="text-center">
        <h1 className="title-pop font-[family-name:var(--font-anton)] text-[clamp(3rem,10vw,7rem)] uppercase">
          MEOWREEL
        </h1>
        <p className="font-[family-name:var(--font-caveat)] text-2xl text-mr-ink-red mt-4" style={{ transform: 'rotate(-3deg)' }}>
          Phase 3 en construction...
        </p>
      </div>
    </main>
  );
}
