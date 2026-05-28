import { Metadata } from 'next';

import { PortfolioPage } from '@/components/sections';
import { SEOHead } from '@/components/seo';
import { getPortfolioContent, getPortfolioSEOContent } from '@/lib/data';
import {
  contentToSEOConfig,
  generatePortfolioStructuredData,
  generateSEOMetadata,
} from '@/lib/seo';

interface PortfolioPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}

export async function generateMetadata({ params }: PortfolioPageProps): Promise<Metadata> {
  const { lang } = await params;
  const seoContent = getPortfolioSEOContent(lang);
  const seoConfig = contentToSEOConfig(seoContent, lang, '/portfolio');

  return generateSEOMetadata(seoConfig, lang);
}

export default async function Portfolio({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const content = getPortfolioContent(lang);
  const seoContent = getPortfolioSEOContent(lang);
  const seoConfig = {
    ...contentToSEOConfig(seoContent, lang, '/portfolio'),
    structuredData: generatePortfolioStructuredData(lang),
  };

  return (
    <>
      <SEOHead config={seoConfig} />
      <PortfolioPage content={content} />
    </>
  );
}
