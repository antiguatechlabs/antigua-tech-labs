'use client';

import { Box, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

import { colors } from '@/theme';

interface GradientTextProps {
  children: ReactNode;
  startColor?: string;
  endColor?: string;
  component?: React.ElementType;
  mainTitle?: boolean;
  sx?: SxProps<Theme>;
}

const GradientText = ({
  children,
  startColor = colors.violet,
  endColor = colors.aqua,
  component = 'span',
  sx = {},
  mainTitle = false,
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
      fontSize: mainTitle ? { xs: 'inherit', md: 'inherit', lg: '5rem' } : 'inherit',
      ...sx,
    }}
  >
    {children}
  </Box>
);

export default GradientText;
