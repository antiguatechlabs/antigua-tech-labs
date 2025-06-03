import { Typography } from '@mui/material';
import React from 'react';

import { Section } from '@/components/common';

import { BrandSlider } from './BrandSlider';

export const Slider = () => (
  <Section
    sx={{ py: 6, bgcolor: 'background.paper' }}
    animation="fade"
    maxWidth="xl"
  >
    <Typography
      variant="h2"
      component="h2"
      sx={{
        textAlign: 'center',
        mb: 5,
        fontSize: { xs: '1.75rem', md: '2.25rem' },
      }}
    >
      Slider
    </Typography>
    <BrandSlider />
  </Section>
);

