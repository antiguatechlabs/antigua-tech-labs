import { Box, Container, Typography } from '@mui/material';
import React from 'react';

import { BrandSlider } from './BrandSlider';

export const Slider = () => (
  <Box component="section" sx={{ py: 6, bgcolor: 'background.paper' }}>
    <Container maxWidth="xl">
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
    </Container>
  </Box>
);

