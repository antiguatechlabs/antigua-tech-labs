import { Metadata } from 'next';

import { SITE_CONFIG, LANGUAGE_CONFIGS } from './config';
import { SEOConfig, PageSEOContent, LanguageAlternates } from './types';

/**
 * Strip gradient syntax from text for SEO purposes
 */
export function stripGradientSyntax(text: string): string {
  return text.replace(/\{\{gradient:([^}]+)\}\}/g, '$1');
}

/**
 * Generate dynamic OG image URL
 */
function generateOGImageUrl(title: string, description: string, lang: string): string {
  const params = new URLSearchParams({
    title,
    description,
    lang,
  });
  return `${SITE_CONFIG.ogImage}?${params.toString()}`;
}

/**
 * Generate metadata for Next.js App Router
 */
export function generateSEOMetadata(
  seoConfig: Partial<SEOConfig>,
  lang: string = 'en',
): Metadata {
  const languageConfig =
    LANGUAGE_CONFIGS[lang as keyof typeof LANGUAGE_CONFIGS] || LANGUAGE_CONFIGS.en;

  const title = stripGradientSyntax(seoConfig.title || languageConfig.defaultTitle);
  const description = stripGradientSyntax(seoConfig.description || languageConfig.description);

  return {
    title,
    description,
    keywords: seoConfig.keywords || SITE_CONFIG.keywords,
    authors: SITE_CONFIG.authors,
    creator: SITE_CONFIG.creator,
    publisher: SITE_CONFIG.publisher,
    formatDetection: SITE_CONFIG.formatDetection,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: seoConfig.canonical || `${SITE_CONFIG.url}/${lang}`,
      languages: generateLanguageAlternates(seoConfig.canonical),
    },
    openGraph: {
      title: seoConfig.openGraph?.title || title,
      description: seoConfig.openGraph?.description || description,
      url: seoConfig.openGraph?.url || seoConfig.canonical || `${SITE_CONFIG.url}/${lang}`,
      siteName: seoConfig.openGraph?.siteName || SITE_CONFIG.name,
      images: seoConfig.openGraph?.images || [
        {
          url: generateOGImageUrl(title, description, lang),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: languageConfig.locale,
      type: seoConfig.openGraph?.type || 'website',
    },
    twitter: {
      card: seoConfig.twitter?.cardType || 'summary_large_image',
      title: seoConfig.openGraph?.title || title,
      description: seoConfig.openGraph?.description || description,
      site: seoConfig.twitter?.site || '@antiguadigital',
      creator: seoConfig.twitter?.handle || '@antiguadigital',
      images: seoConfig.openGraph?.images?.[0]?.url || generateOGImageUrl(title, description, lang),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
      yahoo: process.env.NEXT_PUBLIC_YAHOO_SITE_VERIFICATION,
    },
  };
}

/**
 * Generate language alternates for hreflang
 */
export function generateLanguageAlternates(basePath?: string): LanguageAlternates {
  // Recorta el dominio y, si queda /en… o /es…, bórralo
  const rawPath = basePath ? basePath.replace(SITE_CONFIG.url, '') : '';
  const cleanPath = rawPath.replace(/^\/(en|es)(?=\/|$)/, '');

  return {
    en: `${SITE_CONFIG.url}/en${cleanPath}`,
    es: `${SITE_CONFIG.url}/es${cleanPath}`,
    'x-default': `${SITE_CONFIG.url}/en${cleanPath}`,
  };
}

/**
 * Convert page content to SEO configuration
 */
export function contentToSEOConfig(
  content: PageSEOContent,
  lang: string,
  path?: string,
): SEOConfig {
  const basePath = path ? `/${lang}${path}` : `/${lang}`;

  return {
    title: stripGradientSyntax(content.title),
    description: stripGradientSyntax(content.description),
    keywords: content.keywords,
    canonical: `${SITE_CONFIG.url}${basePath}`,
    openGraph: {
      title: stripGradientSyntax(content.ogTitle || content.title),
      description: stripGradientSyntax(content.ogDescription || content.description),
      type: 'website',
      url: `${SITE_CONFIG.url}${basePath}`,
      images: content.ogImage ? [
        {
          url: content.ogImage,
          width: 1200,
          height: 630,
          alt: stripGradientSyntax(content.ogTitle || content.title),
        },
      ] : undefined,
    },
    twitter: {
      cardType: 'summary_large_image',
    },
    structuredData: content.structuredData,
  };
}

/**
 * Generate structured data for organization
 */
export function generateOrganizationStructuredData(lang: string = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Aguat Solutions',
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/images/logo.png`,
    description:
      LANGUAGE_CONFIGS[lang as keyof typeof LANGUAGE_CONFIGS]?.description ||
      LANGUAGE_CONFIGS.en.description,
    sameAs: [
      'https://linkedin.com/company/antiguadigital',
      'https://twitter.com/antiguadigital',
      'https://github.com/antiguadigital',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+502-1234-5678',
      contactType: 'customer service',
      availableLanguage: ['English', 'Spanish'],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'GT',
      addressLocality: 'Antigua Guatemala',
    },
  };
}

/**
 * Generate structured data for website
 */
export function generateWebsiteStructuredData(lang: string = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Aguat Solutions',
    url: SITE_CONFIG.url,
    description:
      LANGUAGE_CONFIGS[lang as keyof typeof LANGUAGE_CONFIGS]?.description ||
      LANGUAGE_CONFIGS.en.description,
    publisher: {
      '@type': 'Organization',
      name: 'Aguat Solutions',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_CONFIG.url}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbStructuredData(
  items: Array<{ name: string; url: string }>,
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
