'use client';

import { Box, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

import { colors } from '@/theme';

interface GradientTextProps {
  children: ReactNode;
  startColor?: string;
  endColor?: string;
  component?: React.ElementType;
  sx?: SxProps<Theme>;
}

const GradientText = ({
  children,
  startColor = colors.violet,
  endColor = colors.aqua,
  component = 'span',
  sx = {},
  ...muiProps
}: GradientTextProps) => (
  <Box
    component={component}
    {...muiProps}
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
