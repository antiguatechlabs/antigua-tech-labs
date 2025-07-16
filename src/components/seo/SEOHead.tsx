'use client';

import { NextSeo } from 'next-seo';

import { SEOConfig } from '@/lib/seo/types';

import StructuredData from './StructuredData';

interface SEOHeadProps {
  config: SEOConfig;
}

export default function SEOHead({ config }: SEOHeadProps) {
  return (
    <>
      <NextSeo
        title={config.title}
        description={config.description}
        canonical={config.canonical}
        openGraph={{
          title: config.openGraph?.title || config.title,
          description: config.openGraph?.description || config.description,
          type: config.openGraph?.type || 'website',
          url: config.openGraph?.url || config.canonical,
          images: config.openGraph?.images || [],
          siteName: config.openGraph?.siteName,
          locale: config.openGraph?.locale,
        }}
        twitter={{
          handle: config.twitter?.handle,
          site: config.twitter?.site,
          cardType: config.twitter?.cardType || 'summary_large_image',
        }}
        additionalMetaTags={[
          ...(config.keywords ? [{
            name: 'keywords',
            content: config.keywords.join(', '),
          }] : []),
          ...(config.additionalMetaTags?.filter(tag => tag.name).map(tag => ({
            name: tag.name!,
            content: tag.content,
          })) || []),
          ...(config.additionalMetaTags?.filter(tag => tag.property).map(tag => ({
            property: tag.property!,
            content: tag.content,
          })) || []),
        ]}
        additionalLinkTags={config.additionalLinkTags || []}
      />
      {config.structuredData && (
        <StructuredData data={config.structuredData} />
      )}
    </>
  );
}
