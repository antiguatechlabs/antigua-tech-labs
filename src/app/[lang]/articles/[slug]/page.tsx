import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ArticleDetailPage } from '@/components/sections';
import { SEOHead, StructuredData } from '@/components/seo';
import { getArticleBySlug, getArticles } from '@/lib/data';
import { contentToSEOConfig, generateSEOMetadata } from '@/lib/seo';
import { SITE_CONFIG } from '@/lib/seo/config';

interface ArticleDetailPageProps {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const enArticles = getArticles('en').map(article => ({ lang: 'en', slug: article.slug }));
  const esArticles = getArticles('es').map(article => ({ lang: 'es', slug: article.slug }));

  return [...enArticles, ...esArticles];
}

export async function generateMetadata({ params }: ArticleDetailPageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const article = getArticleBySlug(slug, lang);

  if (!article) {
    return {};
  }

  const seoConfig = contentToSEOConfig(article.seo, lang, `/articles/${article.slug}`);
  seoConfig.openGraph = {
    ...seoConfig.openGraph,
    type: 'article',
  };

  return generateSEOMetadata(seoConfig, lang);
}

export default async function ArticlePage({ params }: ArticleDetailPageProps) {
  const { lang, slug } = await params;
  const article = getArticleBySlug(slug, lang);

  if (!article) {
    notFound();
  }

  const seoConfig = contentToSEOConfig(article.seo, lang, `/articles/${article.slug}`);

  const articleStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.excerpt,
    image: article.heroImage ? [`${SITE_CONFIG.url}${article.heroImage}`] : undefined,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    author: {
      '@type': 'Organization',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Antigua Tech Labs',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/images/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.url}/${lang}/articles/${article.slug}`,
    },
    articleSection: article.category,
    inLanguage: lang,
  };

  const faqStructuredData = article.faq && article.faq.length > 0
    ? {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: article.faq.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    }
    : null;

  return (
    <>
      <SEOHead config={seoConfig} />
      <StructuredData data={faqStructuredData ? [articleStructuredData, faqStructuredData] : articleStructuredData} />
      <ArticleDetailPage article={article} lang={lang} />
    </>
  );
}
