'use client';
import React from 'react';

import TwoColumnSection from '@/components/common/TwoColumnSection';
import { ServiceHeroContent } from '@/lib/data';
import { textWithGradient } from '@/lib/textFormatters';

interface ServiceTwoColumnSectionProps {
  content: ServiceHeroContent;
  heroImage?: string;
  gradientColors?: { start: string; end: string };
}

export function ServiceTwoColumnSection({
  content,
  heroImage,
  gradientColors,
}: ServiceTwoColumnSectionProps) {
  // Apply custom gradient colors if provided
  const getProcessedTitle = () => {
    if (gradientColors && content.title.includes('{{gradient:')) {
      // Extract the gradient text and replace with custom colors
      return content.title.replace(
        /\{\{gradient:(.*?)\}\}/g,
        `{{gradient:$1:${gradientColors.start}:${gradientColors.end}}}`,
      );
    }
    return content.title;
  };

  return (
    <TwoColumnSection
      image={heroImage || content.image}
      title={textWithGradient(getProcessedTitle())}
      subtitle={content.subtitle}
      description={content.description}
      textPosition={content.textPosition || 'left'}
      imageWidth={800}
      imageHeight={600}
      altText={content.subtitle}
    />
  );
}
