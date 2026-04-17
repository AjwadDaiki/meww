import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { DeskScene } from '@/components/landing/desk-scene';

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

  return (
    <main>
      <DeskScene />
    </main>
  );
}
