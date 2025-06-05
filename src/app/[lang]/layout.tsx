import { CssBaseline } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

import { ScrollToTop } from '@/components/ui';
import { LanguageProvider } from '@/context/languageContext';
import { SidebarProvider } from '@/context/sidebarContext';
import { ThemeProvider } from '@/context/themeContext';


// Initialize the Inter font with Latin subset
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const locales = ['en', 'es'];

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { lang: string };
}) {
  const lang = locales.includes(params.lang) ? params.lang : null;
  if (!lang) notFound();

  const host = typeof window !== 'undefined' ? window.location.origin : 'https://example.com';

  return (
    <html lang={lang} className={inter.variable}>
      <Head>
        {locales.map(locale => (
          <link
            key={locale}
            rel="alternate"
            hrefLang={locale}
            href={`${host}/${locale}`}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={`${host}/en`} />
      </Head>
      <body style={{ overflowX: 'hidden', width: '100%' }} className={inter.className}>
        <LanguageProvider initialLanguage={lang as 'en' | 'es'}>
          <ThemeProvider>
            <SidebarProvider>
              <CssBaseline />
              <AnimatePresence mode="wait" initial={false}>
                {children}
              </AnimatePresence>
              <ScrollToTop />
            </SidebarProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}


export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}
