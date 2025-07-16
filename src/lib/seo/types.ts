export interface SEOConfig {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  openGraph?: {
    title?: string;
    description?: string;
    type?: 'website' | 'article' | 'profile';
    url?: string;
    images?: Array<{
      url: string;
      width?: number;
      height?: number;
      alt?: string;
    }>;
    siteName?: string;
    locale?: string;
  };
  twitter?: {
    handle?: string;
    site?: string;
    cardType?: 'summary' | 'summary_large_image' | 'app' | 'player';
  };
  additionalMetaTags?: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
  additionalLinkTags?: Array<{
    rel: string;
    href: string;
    hreflang?: string;
    media?: string;
    type?: string;
  }>;
  structuredData?: Record<string, unknown>[];
}

export interface PageSEOContent {
  title: string;
  description: string;
  keywords?: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  structuredData?: Record<string, unknown>[];
}

export interface DefaultSEOConfig {
  defaultTitle: string;
  titleTemplate: string;
  description: string;
  canonical: string;
  openGraph: {
    type: 'website';
    locale: string;
    url: string;
    siteName: string;
    images: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
  };
  twitter: {
    handle: string;
    site: string;
    cardType: 'summary_large_image';
  };
  additionalMetaTags: Array<{
    name?: string;
    property?: string;
    content: string;
  }>;
  additionalLinkTags: Array<{
    rel: string;
    href: string;
    type?: string;
  }>;
}

export interface LanguageAlternates {
  [key: string]: string;
}

export interface SEOContentStructure {
  seo: PageSEOContent;
}
