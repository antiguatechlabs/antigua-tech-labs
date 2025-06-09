'use client';

import { Box, Typography } from '@mui/material';
import React from 'react';

import { Section } from '@/components/common';
import { SliderContent } from '@/lib/data';

import { StackSlider } from './StackSlider';
import { textWithGradient } from '../../lib/textFormatters';

export const Slider = ({ content }: { content: SliderContent }) => (
  <Section
    sx={{ py: 6, bgcolor: 'background.paper' }}
    animation="fadeInUp"
  >
    <Box sx={{ textAlign: 'center', mb: 8 }}>
      <Typography
        variant="h2"
        component="h2"
        sx={{
          textAlign: 'center',
          mb: 2,
          fontSize: { xs: '1.75rem', md: '2.25rem' },
        }}
      >
        {textWithGradient(content.title)}
      </Typography>

      {content.subtitle && (
        <Typography
          variant="body1"
          sx={{
            fontSize: '1.125rem',
            color: 'text.secondary',
            maxWidth: '42rem',
            mx: 'auto',
          }}
        >
          {content.subtitle}
        </Typography>
      )}
    </Box>
    <StackSlider />
  </Section>
);

