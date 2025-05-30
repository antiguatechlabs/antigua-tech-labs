'use client';

import { ReactNode } from 'react';
import { Box, SxProps, Theme } from '@mui/material';

interface GradientTextProps {
  children: ReactNode;
  startColor?: string;
  endColor?: string;
  component?: React.ElementType;
  sx?: SxProps<Theme>;
}

const GradientText = ({
  children,
  startColor = '#9c43f8',
  endColor = '#26c5f3',
  component = 'span',
  sx = {},
}: GradientTextProps) => (
  <Box
    component={component}
    sx={{
      background: `linear-gradient(to right, ${startColor}, ${endColor})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      display: 'inline',
      ...sx,
    }}
  >
    {children}
  </Box>
);

export default GradientText;
