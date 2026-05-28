import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = 'https://antiguatechlabs.com';

  const staticRoutes = [
    '',
    '/about',
    '/services',
    '/portfolio',
  ];

  const languages = ['en', 'es'];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
  xml += 'xmlns:xhtml="http://www.w3.org/1999/xhtml">\n';

  const now = new Date().toISOString();

  for (const lang of languages) {
    for (const path of staticRoutes) {
      const url = `${baseUrl}/${lang}${path}`;
      xml += '  <url>\n';
      xml += `    <loc>${url}</loc>\n`;
      for (const alternateLang of languages) {
        const alternateUrl = `${baseUrl}/${alternateLang}${path}`;
        xml += `    <xhtml:link rel="alternate" hreflang="${alternateLang}" href="${alternateUrl}" />\n`;
      }
      const defaultUrl = `${baseUrl}/en${path}`;
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultUrl}" />\n`;
      xml += `    <lastmod>${now}</lastmod>\n`;
      xml += `    <changefreq>${path === '' ? 'weekly' : 'monthly'}</changefreq>\n`;
      xml += `    <priority>${path === '' ? '1.0' : '0.8'}</priority>\n`;
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
