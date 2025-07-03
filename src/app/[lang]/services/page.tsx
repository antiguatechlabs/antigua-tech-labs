import { Metadata } from 'next';

import { UnifiedServicesPage } from '@/components/services';
import { getUnifiedServicesPageContent } from '@/lib/data';

interface ServicesPageProps {
  params: {
    lang: string;
  };
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}

export async function generateMetadata({ params }: ServicesPageProps): Promise<Metadata> {
  const { lang } = await params;
  const content = getUnifiedServicesPageContent(lang);

  // Helper function to remove {{gradient:...}} and keep only the text
  const stripGradient = (str: string) => str.replace(/\{\{gradient:([^}]+)\}\}/g, '$1');

  return {
    title: stripGradient(content.overview.hero.title),
    description: content.overview.hero.description,
    openGraph: {
      title: stripGradient(content.overview.hero.title),
      description: content.overview.hero.description,
      type: 'website',
    },
  };
}

export default async function Services({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const content = getUnifiedServicesPageContent(lang);

  return <UnifiedServicesPage content={content} language={lang} />;
}
