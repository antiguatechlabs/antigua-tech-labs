import { SEOConfig } from '@/lib/seo/types';

import StructuredData from './StructuredData';

interface SEOHeadProps {
  config: SEOConfig;
}

export default function SEOHead({ config }: SEOHeadProps) {
  return (
    <>
      {config.structuredData && (
        <StructuredData data={config.structuredData} idPrefix="page-structured-data" />
      )}
    </>
  );
}
