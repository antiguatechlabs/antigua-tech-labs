import { MetadataRoute } from 'next';

import { SITE_CONFIG } from '@/lib/seo/config';
// ---------- Build metadata ----------
/**
 * Última fecha en la que se publicó producción.
 * Cámbiala manualmente
 * Si haces un release con cambios de contenido, actualizas la fecha a ese día perros.
 */
const LAST_BUILD = new Date('2025-07-10'); //Acutalizar al realizar el realse

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
        lastModified: LAST_BUILD,
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
        lastModified: LAST_BUILD,
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

  return routes;
}
