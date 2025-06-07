// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const supportedLanguages = ['en', 'es'];
  const defaultLanguage = 'en';

  const pathnameHasLanguage = supportedLanguages.some(
    lang => pathname.startsWith(`/${lang}/`) || pathname === `/${lang}`,
  );

  if (!pathnameHasLanguage) {
    return NextResponse.redirect(
      new URL(`/${defaultLanguage}${pathname === '/' ? '' : pathname}`, request.url),
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
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
