'use client';
import { Box } from '@mui/material';
import React from 'react';

import { ServicePageContent } from '@/lib/data';
import { MotionDiv } from '@/lib/motionComponents';

import { ServiceTwoColumnSection } from './';

interface ServiceSectionProps {
  id: string;
  content: ServicePageContent;
  index?: number;
}

export function ServiceSection({
  id,
  content,
  index = 0,
}: ServiceSectionProps) {
  return (
    <MotionDiv
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: '-100px' }}
    >
      <Box
        id={id}
        sx={{
          scrollMarginTop: '80px',
          backgroundColor: index % 2 === 0 ? 'background.default' : 'background.paper',
          py: 4,
        }}
      >
        {/* Service Hero */}
        <ServiceTwoColumnSection content={content.hero} />
      </Box>
    </MotionDiv>
  );
}
