import { MetadataRoute } from 'next';

import { SITE_CONFIG } from '@/lib/seo/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const languages = ['en', 'es'];
  const pages = ['', '/about', '/services'];

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
          },
        },
      });
    });
  });

  return routes;
}
