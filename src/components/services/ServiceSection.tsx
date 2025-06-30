'use client';
import { Box, Divider } from '@mui/material';
import React from 'react';

import { ServicePageContent } from '@/lib/data';
import { MotionDiv } from '@/lib/motionComponents';

import { ServiceHero, ServiceFeatures, ServiceProcess, ServiceTechnologies, ServiceCTA } from './';

interface ServiceSectionProps {
  id: string;
  content: ServicePageContent;
  showDivider?: boolean;
}

export function ServiceSection({ id, content, showDivider = true }: ServiceSectionProps) {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <Box id={id} sx={{ scrollMarginTop: '80px' }}>
        {/* Service Hero */}
        <ServiceHero content={content.hero} />

        {/* Service Features */}
        <ServiceFeatures content={content.features} />

        {/* Service Process */}
        <ServiceProcess content={content.process} />

        {/* Service Technologies */}
        <ServiceTechnologies content={content.technologies} />

        {/* Service CTA */}
        <ServiceCTA content={content.cta} />

        {/* Section Divider */}
        {showDivider && (
          <Box sx={{ py: 4 }}>
            <Divider
              sx={{
                borderColor: 'rgba(156, 67, 248, 0.2)',
                borderWidth: 1,
                mx: 'auto',
                maxWidth: '80%',
              }}
            />
          </Box>
        )}
      </Box>
    </MotionDiv>
  );
}
