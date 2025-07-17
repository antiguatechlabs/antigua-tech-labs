import { DefaultSeoProps } from 'next-seo';

export const DEFAULT_SEO: DefaultSeoProps = {
  defaultTitle: 'Aguat Solutions - Custom Software Development',
  titleTemplate: '%s | Aguat Solutions',
  description: 'We build high-performance web and mobile apps that scale with your business and deliver real-world results.',
  canonical: 'https://antiguadigital.com',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://antiguadigital.com',
    siteName: 'Aguat Solutions',
    images: [
      {
        url: 'https://antiguadigital.com/og?title=Aguat Solutions&description=Custom Software Development',
        width: 1200,
        height: 630,
        alt: 'Aguat Solutions - Custom Software Development',
      },
    ],
  },
  twitter: {
    handle: '@antiguadigital',
    site: '@antiguadigital',
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
      content: 'Aguat Solutions',
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
    defaultTitle: 'Aguat Solutions - Custom Software Development',
    description: 'We build high-performance web and mobile apps that scale with your business and deliver real-world results.',
  },
  es: {
    locale: 'es_ES',
    defaultTitle: 'Aguat Solutions - Desarrollo de Software Personalizado',
    description: 'Construimos aplicaciones web y móviles de alto rendimiento que escalan con tu negocio y entregan resultados reales.',
  },
};

export const SITE_CONFIG = {
  name: 'Aguat Solutions',
  url: 'https://antiguadigital.com',
  ogImage: 'https://antiguadigital.com/og',
  description: 'Custom software development company specializing in web and mobile applications.',
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
      name: 'Aguat Solutions',
      url: 'https://antiguadigital.com',
    },
  ],
  creator: 'Aguat Solutions',
  publisher: 'Aguat Solutions',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};
