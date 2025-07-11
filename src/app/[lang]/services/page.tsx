import { Metadata } from 'next';

import { SEOHead } from '@/components/seo';
import { UnifiedServicesPage } from '@/components/services';
import { getUnifiedServicesPageContent, getServicesSEOContent } from '@/lib/data';
import { contentToSEOConfig, generateSEOMetadata } from '@/lib/seo';

interface ServicesPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}

export async function generateMetadata({ params }: ServicesPageProps): Promise<Metadata> {
  const { lang } = await params;
  const seoContent = getServicesSEOContent(lang);
  const seoConfig = contentToSEOConfig(seoContent, lang, '/services');

  return generateSEOMetadata(seoConfig, lang);
}

export default async function Services({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const content = getUnifiedServicesPageContent(lang);
  const seoContent = getServicesSEOContent(lang);
  const seoConfig = contentToSEOConfig(seoContent, lang, '/services');

  return (
    <>
      <SEOHead config={seoConfig} />
      <UnifiedServicesPage content={content} language={lang} />
    </>
  );
}
