import { Metadata } from 'next';

import { UnifiedAboutPage } from '@/components/sections';
import { SEOHead } from '@/components/seo';
import { getAboutPageContent, getContactContent, getAboutSEOContent } from '@/lib/data';
import { contentToSEOConfig, generateSEOMetadata } from '@/lib/seo';

interface AboutPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { lang } = await params;
  const seoContent = getAboutSEOContent(lang);
  const seoConfig = contentToSEOConfig(seoContent, lang, '/about');

  return generateSEOMetadata(seoConfig, lang);
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const content = getAboutPageContent(lang);
  const contactContent = getContactContent(lang);
  const seoContent = getAboutSEOContent(lang);
  const seoConfig = contentToSEOConfig(seoContent, lang, '/about');

  return (
    <>
      <SEOHead config={seoConfig} />
      <UnifiedAboutPage
        content={content}
        contactContent={contactContent}
        language={lang}
      />
    </>
  );
}
