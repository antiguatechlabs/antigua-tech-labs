'use client';

import { DefaultSeo } from 'next-seo';

import { DEFAULT_SEO, LANGUAGE_CONFIGS } from '@/lib/seo/config';

interface Props {
  lang: 'en' | 'es';
}

export default function DefaultSEOClient({ lang }: Props) {
  return (
    <DefaultSeo
      {...DEFAULT_SEO}
      {...LANGUAGE_CONFIGS[lang as keyof typeof LANGUAGE_CONFIGS]}
    />
  );
}
