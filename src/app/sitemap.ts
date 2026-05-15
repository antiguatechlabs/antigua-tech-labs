import { MetadataRoute } from 'next';

import { SITE_CONFIG } from '@/lib/seo/config';
// ---------- Build metadata ----------

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const languages = ['en', 'es'];
  const pages = ['', '/about', '/services', '/portfolio'];

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

  return routes;
}
