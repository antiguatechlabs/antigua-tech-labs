import { CssBaseline } from '@mui/material';
import { Inter } from 'next/font/google';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

import { Navbar, Footer } from '@/components';
import { StructuredData } from '@/components/seo';
import { ScrollToTop } from '@/components/ui';
import { LanguageProvider, SidebarProvider, ThemeProvider } from '@/context';
import { getNavbarContent, getFooterContent } from '@/lib/data';
import { supportedLanguages } from '@/lib/i18n/config';
import type { Language } from '@/lib/i18n/config';
import { generateOrganizationStructuredData, generateWebsiteStructuredData } from '@/lib/seo';
import '@/styles/globals.css';


// Cookie configuration
const LANGUAGE_COOKIE_NAME = 'aglanguage';

// Next.js functions
export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const baseUrl = 'https://localhost:3000';

  return {
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: {
        en: `${baseUrl}/en`,
        es: `${baseUrl}/es`,
        'x-default': `${baseUrl}/en`,
      },
    },
  };
}



// Initialize the Inter font with Latin subset
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {

  const { lang } = await params;

  if (!supportedLanguages.includes(lang as Language)) notFound();

  // Read language cookie for server-side consistency
  const cookieStore = await cookies();
  const _languageCookie = cookieStore.get(LANGUAGE_COOKIE_NAME);

  const navbarContent = getNavbarContent(lang);
  const footerContent = getFooterContent(lang);

  // Generate structured data for the current language
  const organizationData = generateOrganizationStructuredData(lang);
  const websiteData = generateWebsiteStructuredData(lang);

  return (
    <html lang={lang} className={inter.variable}>
      <body style={{ overflowX: 'hidden', width: '100%', scrollBehavior: 'smooth' }} className={inter.className}>
        <StructuredData data={[organizationData, websiteData]} />
        <LanguageProvider initialLanguage={lang as Language}>
          <ThemeProvider>
            <SidebarProvider>
              <CssBaseline />
              <Navbar content={navbarContent} />
              {children}
              <Footer content={footerContent} />
              <ScrollToTop />
            </SidebarProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
