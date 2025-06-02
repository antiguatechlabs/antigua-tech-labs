'use client';

import { Box, Container, SxProps, Theme } from '@mui/material';
import React, { ReactNode, forwardRef } from 'react';

interface SectionProps {
  id?: string;
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  containerSx?: SxProps<Theme>;
  withGradientBg?: boolean;
  withContainer?: boolean;
  sx?: SxProps<Theme>;
}

/**
 * Section component that provides consistent styling for page sections
 *
 * @param id - The ID of the section for navigation
 * @param children - The content of the section
 * @param maxWidth - The maximum width of the container (default: 'lg')
 * @param containerSx - Additional styles for the container
 * @param withGradientBg - Whether to include the gradient background (default: false)
 * @param withContainer - Whether to wrap children in a Container (default: true)
 * @param sx - Additional styles for the section
 */
export const Section = forwardRef<HTMLDivElement, SectionProps>(({
  id,
  children,
  maxWidth = 'lg',
  containerSx,
  withGradientBg = false,
  withContainer = true,
  sx,
}, ref) => {
  // Default gradient background
  const gradientBg = 'linear-gradient(180deg, rgba(90, 48, 255, 0.03) 0%, rgba(90, 48, 255, 0.01) 100%)';

  // Base section styles
  const baseStyles: SxProps<Theme> = {
    width: '100%',
    py: { xs: 12, md: 16 },
    ...(withGradientBg && { background: gradientBg }),
  };

  // Merge base styles with custom styles
  const mergedStyles = { ...baseStyles, ...sx };

  return (
    <Box component="section" sx={mergedStyles} id={id} ref={ref}>
      {withContainer ? (
        <Container maxWidth={maxWidth} sx={{ px: 2, ...containerSx }}>
          {children}
        </Container>
      ) : (
        children
      )}
    </Box>
  );
});

// Add display name for React DevTools
Section.displayName = 'Section';

