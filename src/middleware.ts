// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const pathnameHasLanguage = supportedLanguages.some(
    lang => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`,
  );

  if (!pathnameHasLanguage) {
    // Read language preference from cookie
    const preferredLanguage = getLanguageCookieFromRequest(request) || defaultLanguage;

    return NextResponse.redirect(
      new URL(`/${preferredLanguage}${pathname === '/' ? '' : pathname}`, request.url),
    );
  }

  return NextResponse.next();
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
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|og).*)',
  ],
};
