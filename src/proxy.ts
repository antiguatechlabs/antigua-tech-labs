// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { appendVaryAccept, preferredRepresentation } from '@/lib/accept';
import { supportedLanguages, defaultLanguage } from '@/lib/i18n/config';

// Cookie configuration
const LANGUAGE_COOKIE_NAME = 'aglanguage';

// Inline cookie parsing function to avoid client/server issues
function getLanguageCookieFromRequest(request: NextRequest): 'en' | 'es' | null {
  const cookieHeader = request.headers.get('cookie');
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(';').reduce((acc, cookie) => {
    const [name, value] = cookie.trim().split('=');
    acc[name] = value;
    return acc;
  }, {} as Record<string, string>);

  const languageValue = cookies[LANGUAGE_COOKIE_NAME];

  // Validate the cookie value
  if (languageValue === 'en' || languageValue === 'es') {
    return languageValue;
  }

  return null;
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isDocumentRequest = request.method === 'GET' || request.method === 'HEAD';
  const isNextRouterRequest = ['RSC', 'Next-Router-Prefetch', 'Next-Router-State-Tree'].some(
    header => request.headers.has(header),
  );

  if (!isDocumentRequest || isNextRouterRequest) return NextResponse.next();

  const representation = preferredRepresentation(request.headers.get('accept'));

  if (representation === 'text/markdown') {
    const markdownPath = pathname === '/' ? `/${defaultLanguage}` : pathname;
    const url = request.nextUrl.clone();
    url.pathname = `/api/markdown${markdownPath}`;
    const response = NextResponse.rewrite(url);
    appendVaryAccept(response.headers);
    return response;
  }

  if (representation === null && request.headers.has('accept')) {
    return new Response('Not Acceptable\n\nAvailable: text/html, text/markdown\n', {
      status: 406,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        Vary: 'Accept',
      },
    });
  }

  const pathnameHasLanguage = supportedLanguages.some(
    lang => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`,
  );

  if (!pathnameHasLanguage) {
    // Read language preference from cookie
    const preferredLanguage = getLanguageCookieFromRequest(request) || defaultLanguage;

    const response = NextResponse.redirect(
      new URL(`/${preferredLanguage}${pathname === '/' ? '' : pathname}`, request.url),
    );
    appendVaryAccept(response.headers);
    return response;
  }

  const response = NextResponse.next();
  appendVaryAccept(response.headers);
  return response;
}

export const config = {
  matcher: [
    /*
     * Intercepta todas las rutas excepto las siguientes:
     * - Rutas de API
     * - Archivos estáticos
     * - Archivos de optimización de imágenes
     * - Archivos de iconos y mapas del sitio
     * - generador de imagenes OG
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|llms.txt|og).*)',
  ],
};
