import { MetadataRoute } from 'next';

import { getArticles } from '@/lib/data';
import { SITE_CONFIG } from '@/lib/seo/config';
// ---------- Build metadata ----------

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const languages = ['en', 'es'];
  const pages = ['', '/about', '/services', '/articles'];

  const routes: MetadataRoute.Sitemap = [];

  // Add routes for each language and page combination
  languages.forEach(lang => {
    pages.forEach(page => {
      routes.push({
        url: `${baseUrl}/${lang}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'weekly' : 'monthly',
        priority: page === '' ? 1 : 0.8,
        alternates: {
          languages: {
            en: `${baseUrl}/en${page}`,
            es: `${baseUrl}/es${page}`,
            'x-default': `${baseUrl}/en${page}`,
          },
        },
      });
    });
  });

  // Add service-specific pages
  const services = [
    'web-applications',
    'mobile-applications',
    'api-development',
    'code-maintenance',
    'ux-design',
    '3d-modeling',
  ];

  languages.forEach(lang => {
    services.forEach(service => {
      routes.push({
        url: `${baseUrl}/${lang}/services/${service}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: {
            en: `${baseUrl}/en/services/${service}`,
            es: `${baseUrl}/es/services/${service}`,
            'x-default': `${baseUrl}/en/services/${service}`,
          },
        },
      });
    });
  });

  // Add article detail pages
  languages.forEach(lang => {
    const articles = getArticles(lang);
    articles.forEach(article => {
      routes.push({
        url: `${baseUrl}/${lang}/articles/${article.slug}`,
        lastModified: new Date(article.updatedAt || article.publishedAt),
        changeFrequency: 'monthly',
        priority: 0.7,
        alternates: {
          languages: {
            en: `${baseUrl}/en/articles/${article.slug}`,
            es: `${baseUrl}/es/articles/${article.slug}`,
            'x-default': `${baseUrl}/en/articles/${article.slug}`,
          },
        },
      });
    });
  });

  return routes;
}
