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

  // Phase 3: full landing page will replace this
  return (
    <main>
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="pop-title font-[family-name:var(--font-anton)] text-6xl">
          MEOWREEL
        </h1>
      </div>
    </main>
  );
}
