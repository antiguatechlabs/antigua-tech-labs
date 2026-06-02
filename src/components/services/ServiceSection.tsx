'use client';
import React from 'react';

import { Section } from '@/components/common/Section';
import { ServicePageContent } from '@/lib/data';

import { ServiceTwoColumnSection } from './';

interface ServiceSectionProps {
  id: string;
  content: ServicePageContent;
  index?: number;
  heroImage?: string;
  gradientColors?: { start: string; end: string };
  backgroundColor?: string;
  waves?: boolean;
}

export function ServiceSection({
  id,
  content,
  heroImage,
  gradientColors,
  backgroundColor,
  waves = false,
}: ServiceSectionProps) {
  return (
    <Section
      id={id}
      animation="fadeIn"
      animationDelay={0.1}
      waves={waves}
      sx={{
        scrollMarginTop: '80px',
        backgroundColor: backgroundColor || (waves ? 'background.paper' : 'background.default'),
        py: 4,
        pt: 4,
        pb: 4,
      }}
    >
      {/* Service Hero */}
      <ServiceTwoColumnSection
        content={content.hero}
        heroImage={heroImage}
        gradientColors={gradientColors}
      />
    </Section>
  );
}
