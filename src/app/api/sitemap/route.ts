import { NextResponse } from 'next/server';

import { getArticles } from '@/lib/data';

export async function GET() {
  const baseUrl = 'https://antiguatechlabs.com';

  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/articles',
    '/services/web-applications',
    '/services/mobile-applications',
    '/services/api-development',
    '/services/code-maintenance',
    '/services/ux-design',
    '/services/3d-modeling',
  ];

  const languages = ['en', 'es'];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  const now = new Date().toISOString();

  for (const lang of languages) {
    for (const path of staticRoutes) {
      const url = `${baseUrl}/${lang}${path}`;
      xml += '  <url>\n';
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <lastmod>${now}</lastmod>\n`;
      xml += `    <changefreq>${path === '' ? 'weekly' : 'monthly'}</changefreq>\n`;
      xml += `    <priority>${path === '' ? '1.0' : '0.6'}</priority>\n`;
      xml += '  </url>\n';
    }

    const articles = getArticles(lang);
    for (const article of articles) {
      const url = `${baseUrl}/${lang}/articles/${article.slug}`;
      xml += '  <url>\n';
      xml += `    <loc>${url}</loc>\n`;
      xml += `    <lastmod>${new Date(article.updatedAt || article.publishedAt).toISOString()}</lastmod>\n`;
      xml += '    <changefreq>monthly</changefreq>\n';
      xml += '    <priority>0.7</priority>\n';
      xml += '  </url>\n';
    }
  }

  xml += '</urlset>';

  return new NextResponse(xml, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
