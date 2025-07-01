'use client';
import React from 'react';

import TwoColumnSection from '@/components/common/TwoColumnSection';
import { ServiceHeroContent } from '@/lib/data';
import { textWithGradient } from '@/lib/textFormatters';

interface ServiceTwoColumnSectionProps {
  content: ServiceHeroContent;
}

export function ServiceTwoColumnSection({ content }: ServiceTwoColumnSectionProps) {
  return (
    <TwoColumnSection
      image={content.image}
      title={textWithGradient(content.title)}
      subtitle={content.subtitle}
      description={content.description}
      textPosition={content.textPosition || 'left'}
      imageWidth={800}
      imageHeight={600}
      altText={content.subtitle}
    />
  );
}
