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
import { getHomePageContent } from '@/lib/pageContent';

interface ServicesPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export async function generateMetadata({ params }: ServicesPageProps): Promise<Metadata> {
  const { lang } = await params;
  const content = getHomePageContent(lang);

  return {
    title: 'Antigua Digital',
    description: content.hero.subtitle,
    openGraph: {
      title: 'Antigua Digital',
      description: content.hero.subtitle,
      type: 'website',
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const content = getHomePageContent(lang);

  return (
    <>
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
