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

  // Placeholder — will be replaced with the full desk scene
  return (
    <main>
      <h1>MeowReel</h1>
    </main>
  );
}
