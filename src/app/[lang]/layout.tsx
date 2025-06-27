import { CssBaseline } from '@mui/material';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

import { ScrollToTop } from '@/components/ui';
import { LanguageProvider, SidebarProvider, ThemeProvider } from '@/context';
import '@/styles/globals.css';


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
  const locales = ['en', 'es'];

  if (!locales.includes(lang)) notFound();


  return (
    <html lang={lang} className={inter.variable}>
      <body style={{ overflowX: 'hidden', width: '100%', scrollBehavior: 'smooth' }} className={inter.className}>
        <LanguageProvider initialLanguage={lang as 'en' | 'es'}>
          <ThemeProvider>
            <SidebarProvider>
              <CssBaseline />
              {children}
              {/* <ScrollPreserver/> */}
              <ScrollToTop />
            </SidebarProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
