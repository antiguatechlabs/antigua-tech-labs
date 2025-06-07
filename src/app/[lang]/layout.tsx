import { CssBaseline } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

import { ScrollToTop } from '@/components/ui';
import { LanguageProvider, SidebarProvider, ThemeProvider } from '@/context';
import { MotionBox } from '@/lib/motionComponents';


// Next.js functions
export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const baseUrl = 'https://localhost:3000'; // Reemplaza con tu URL base real

  return {
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: {
        en: `${baseUrl}/en`,
        es: `${baseUrl}/es`,
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
  const locales = ['en', 'es'];

  if (!locales.includes(lang)) notFound();

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
                <MotionBox
                  key={lang}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                >
                  {children}
                </MotionBox>
              </AnimatePresence>
              {/* <ScrollPreserver/> */}
              <ScrollToTop />
            </SidebarProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
