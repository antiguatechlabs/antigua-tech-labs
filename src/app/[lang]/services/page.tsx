import { Metadata } from 'next';

import { UnifiedServicesPage } from '@/components/services';
import { getUnifiedServicesPageContent } from '@/lib/data';

interface ServicesPageProps {
  params: {
    lang: string;
  };
}

export async function generateMetadata({ params }: ServicesPageProps): Promise<Metadata> {
  const { lang } = params;
  const content = getUnifiedServicesPageContent(lang);

  return {
    title: content.overview.hero.title,
    description: content.overview.hero.description,
    openGraph: {
      title: content.overview.hero.title,
      description: content.overview.hero.description,
      type: 'website',
    },
  };
}

export default function ServicesPage({ params }: ServicesPageProps) {
  const { lang } = params;
  const content = getUnifiedServicesPageContent(lang);

  return <UnifiedServicesPage content={content} />;
}
