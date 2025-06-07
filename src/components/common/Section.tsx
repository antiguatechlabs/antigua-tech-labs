'use client';

import { Box, SxProps, Theme } from '@mui/material';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import React, { ReactNode, forwardRef } from 'react';

import { AnimationType, getAnimationProps } from '@/lib/animations';

interface SectionProps {
  id?: string;
  children: ReactNode;
  sx?: SxProps<Theme>;
  // Animation props
  animation?: AnimationType;
  customVariants?: Variants;
  animationDelay?: number;
  viewport?: boolean; // Whether to trigger animation when in viewport
}

/**
 * Section component that provides consistent styling for page sections with animation capabilities
 *
 * @param id - The ID of the section for navigation
 * @param children - The content of the section
 * @param sx - Additional styles for the section (fully supports responsive values)
 * @param animation - Type of animation to apply (default: 'fade')
 * @param customVariants - Custom animation variants to override defaults
 * @param animationDelay - Delay before animation starts in seconds (default: 0)
 * @param viewport - Whether to trigger animation when in viewport (default: true)
 */
export const Section = forwardRef<HTMLDivElement, SectionProps>(({
  id,
  children,
  sx,
  animation = 'fade',
  customVariants,
  animationDelay = 0.2, // Add a small default delay
  viewport = true,
}, ref) => {
  const motionProps = getAnimationProps(animation, customVariants, animationDelay, viewport);

  return (
    <AnimatePresence>
      <Box
        component={motion.section}
        id={id}
        ref={ref}
        sx={{
          width: '100%',
          pt: { xs: 4, md: 6 },
          pb: { xs: 5, md: 8 },
          px: { xs: 2, sm: 10, lg: 12 },
          ...sx, // Spread user sx props - fully supports responsive values
        }}
        {...motionProps}
      >
        {children}
      </Box>
    </AnimatePresence>
  );
});

// Add display name for React DevTools
Section.displayName = 'Section';
