import type { DefaultSeoProps } from 'next-seo';

import company from '../../content/shared/company.json';

export const COMPANY = company;

export const DEFAULT_SEO: DefaultSeoProps = {
  defaultTitle: `${company.name} - Custom Software Development`,
  titleTemplate: `%s | ${company.name}`,
  description: `${company.name} is a software development startup based in ${company.locality}, ${company.country}.`,
  canonical: company.url,
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: company.url,
    siteName: company.name,
    images: [
      {
        url: `${company.url}/og?title=Antigua%20Tech%20Labs&description=Custom%20Software%20Development`,
        width: 1200,
        height: 630,
        alt: `${company.name} - Custom Software Development`,
      },
    ],
  },
  twitter: {
    handle: '@antiguatechlabs',
    site: '@antiguatechlabs',
    cardType: 'summary_large_image',
  },
  additionalMetaTags: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'robots',
      content: 'index,follow',
    },
    {
      name: 'googlebot',
      content: 'index,follow',
    },
    {
      name: 'application-name',
      content: company.name,
    },
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      href: '/favicon.ico',
    },
    {
      rel: 'apple-touch-icon',
      href: '/apple-touch-icon.png',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
  ],
};

export const LANGUAGE_CONFIGS = {
  en: {
    locale: 'en_US',
    defaultTitle: `${company.name} - Custom Software Development`,
    description: `A software development startup based in ${company.locality}, ${company.country}.`,
  },
  es: {
    locale: 'es_ES',
    defaultTitle: `${company.name} - Desarrollo de Software Personalizado`,
    description: `Una startup de desarrollo de software con sede en ${company.locality}, ${company.country}.`,
  },
};

export const SITE_CONFIG = {
  name: company.name,
  url: company.url,
  ogImage: `${company.url}/og`,
  description: `Software development startup based in ${company.locality}, ${company.country}.`,
  keywords: [
    'software development',
    'web applications',
    'mobile apps',
    'custom software',
    'digital solutions',
    'technology consulting',
    'app development',
    'web development',
  ],
  authors: [
    {
      name: company.name,
      url: company.url,
    },
  ],
  creator: company.name,
  publisher: company.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};
