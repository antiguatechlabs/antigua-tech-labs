import { Metadata } from 'next';

import { UnifiedAboutPage } from '@/components/sections';
import { getAboutPageContent, getContactContent } from '@/lib/data';

interface AboutPageProps {
  params: {
    lang: string;
  };
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}

export async function generateMetadata({ params }: AboutPageProps): Promise<Metadata> {
  const { lang } = await params;
  const content = getAboutPageContent(lang);

  // Helper function to remove {{gradient:...}} and keep only the text
  const stripGradient = (str: string) => str.replace(/\{\{gradient:([^}]+)\}\}/g, '$1');

  return {
    title: stripGradient(content.hero.headline),
    description: content.hero.subheading,
    openGraph: {
      title: stripGradient(content.hero.headline),
      description: content.hero.subheading,
      type: 'website',
    },
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const content = getAboutPageContent(lang);
  const contactContent = getContactContent(lang);

  return (
    <UnifiedAboutPage
      content={content}
      contactContent={contactContent}
      language={lang}
    />
  );
}
