import { Metadata } from 'next';

import {
  WhyChoose,
  WhyChooseTwo,
  Slider,
  Contact,
  FAQ,
  Hero,
  Features,
} from '@/components';
import OurTeam from '@/components/sections/OurTeam';
import { SEOHead } from '@/components/seo';
import { getHomeSEOContent } from '@/lib/data';
import { getHomePageContent } from '@/lib/pageContent';
import { contentToSEOConfig, generateSEOMetadata } from '@/lib/seo';

interface ServicesPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: ServicesPageProps): Promise<Metadata> {
  const { lang } = await params;
  const seoContent = getHomeSEOContent(lang);
  const seoConfig = contentToSEOConfig(seoContent, lang);

  return generateSEOMetadata(seoConfig, lang);
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const content = getHomePageContent(lang);
  const seoContent = getHomeSEOContent(lang);
  const seoConfig = contentToSEOConfig(seoContent, lang);

  return (
    <>
      <SEOHead config={seoConfig} />
      <Hero content={content.hero} />
      <WhyChooseTwo content={content.whyChooseTwo} />
      <Slider content={content.slider} />
      <Features content={content.features} />
      <WhyChoose content={content.whyChoose} />
      <OurTeam content={content.ourTeam} />
      <Contact content={content.contact} />
      <FAQ content={content.faq} />
    </>
  );
}
