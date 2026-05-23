import { Metadata } from 'next';

import { ArticlesIndexPage } from '@/components/sections';
import { SEOHead } from '@/components/seo';
import { getArticles, getArticlesListingContent } from '@/lib/data';
import { contentToSEOConfig, generateSEOMetadata } from '@/lib/seo';

interface ArticlesPageProps {
  params: Promise<{ lang: string }>;
}

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}

export async function generateMetadata({ params }: ArticlesPageProps): Promise<Metadata> {
  const { lang } = await params;
  const listing = getArticlesListingContent(lang);
  const seoConfig = contentToSEOConfig(listing.seo, lang, '/articles');

  return generateSEOMetadata(seoConfig, lang);
}

export default async function ArticlesPage({ params }: ArticlesPageProps) {
  const { lang } = await params;
  const listing = getArticlesListingContent(lang);
  const articles = getArticles(lang);
  const seoConfig = contentToSEOConfig(listing.seo, lang, '/articles');

  return (
    <>
      <SEOHead config={seoConfig} />
      <ArticlesIndexPage articles={articles} listingContent={listing} lang={lang} />
    </>
  );
}
