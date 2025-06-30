'use client';
import { Box, Typography, Chip } from '@mui/material';
import React from 'react';

import { Section } from '@/components/common';
import { fadeVariant, staggerContainerVariant } from '@/lib';
import { ServiceTechnologiesContent } from '@/lib/data';
import { MotionDiv, MotionBox } from '@/lib/motionComponents';
import { textWithGradient } from '@/lib/textFormatters';

interface ServiceTechnologiesProps {
  content: ServiceTechnologiesContent;
}

export function ServiceTechnologies({ content }: ServiceTechnologiesProps) {
  return (
    <Section
      id="service-technologies"
      animation="fadeInUp"
      animationDelay={0.3}
      sx={{
        paddingY: { xs: 6, md: 8, lg: 10 },
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography
          variant="h2"
          sx={{
            fontWeight: 'bold',
            mb: 2,
            fontSize: { xs: '1.875rem', md: '2.25rem' },
          }}
        >
          {textWithGradient(content.title)}
        </Typography>
      </Box>

      <MotionDiv
        {...staggerContainerVariant}
        style={{ width: '100%' }}
      >
        <MotionBox
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 2,
            justifyContent: 'center',
            maxWidth: '800px',
            margin: '0 auto',
          }}
        >
          {content.items.map((technology: string, index: number) => (
            <MotionDiv key={index} {...fadeVariant}>
              <Chip
                label={technology}
                sx={{
                  fontSize: '1rem',
                  fontWeight: 500,
                  px: 2,
                  py: 1,
                  height: 'auto',
                  background: 'linear-gradient(135deg, #9c43f8 0%, #26c5f3 100%)',
                  color: 'white',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    transition: 'transform 0.2s ease',
                  },
                }}
              />
            </MotionDiv>
          ))}
        </MotionBox>
      </MotionDiv>
    </Section>
  );
}
