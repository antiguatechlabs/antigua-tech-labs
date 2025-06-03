'use client';

import { Container, SxProps, Theme } from '@mui/material';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import React, { ReactNode, forwardRef } from 'react';

// Animation type options
export type AnimationType = 'fade' | 'slideUp' | 'slideLeft' | 'slideRight' | 'none';

// Define base animation variants
const animationVariants: Record<AnimationType, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  },
  slideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  },
  slideRight: {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  },
  none: {} as Variants,
};

interface SectionProps {
  id?: string;
  children: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
  containerSx?: SxProps<Theme>;
  withGradientBg?: boolean;
  withContainer?: boolean;
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
 * @param maxWidth - The maximum width of the container (default: 'lg')
 * @param containerSx - Additional styles for the container
 * @param withGradientBg - Whether to include the gradient background (default: false)
 * @param withContainer - Whether to wrap children in a Container (default: true)
 * @param sx - Additional styles for the section
 * @param animation - Type of animation to apply (default: 'fade')
 * @param customVariants - Custom animation variants to override defaults
 * @param animationDelay - Delay before animation starts in seconds (default: 0)
 * @param viewport - Whether to trigger animation when in viewport (default: true)
 */
export const Section = forwardRef<HTMLDivElement, SectionProps>(({
  id,
  children,
  maxWidth = 'lg',
  containerSx,
  withGradientBg = false,
  withContainer = true,
  sx,
  animation = 'fade',
  customVariants,
  animationDelay = 0.2, // Add a small default delay
  viewport = true,
}, ref) => {
  // Default gradient background
  const gradientBg = 'linear-gradient(180deg, rgba(90, 48, 255, 0.03) 0%, rgba(90, 48, 255, 0.01) 100%)';

  // Get animation properties based on the animation type
  const getAnimationProps = () => {
    if (animation === 'none') return {};

    // Use custom variants if provided, otherwise use predefined ones
    const baseVariants = customVariants || animationVariants[animation];

    // Enhanced variants with more pronounced effects
    let enhancedVariants: Variants = {
      hidden: {
        opacity: 0,
        ...(baseVariants.hidden || {}),
      },
      visible: {
        opacity: 1,
        ...(baseVariants.visible || {}),
        transition: {
          duration: 0.8, // Longer duration
          ease: 'easeOut',
          delay: animationDelay,
        },
      },
    };

    // Add specific animation properties based on type
    if (animation === 'slideUp') {
      enhancedVariants = {
        ...enhancedVariants,
        hidden: { ...enhancedVariants.hidden, y: 80 },
        visible: { ...enhancedVariants.visible, y: 0 },
      };
    } else if (animation === 'slideLeft') {
      enhancedVariants = {
        ...enhancedVariants,
        hidden: { ...enhancedVariants.hidden, x: -80 },
        visible: { ...enhancedVariants.visible, x: 0 },
      };
    } else if (animation === 'slideRight') {
      enhancedVariants = {
        ...enhancedVariants,
        hidden: { ...enhancedVariants.hidden, x: 80 },
        visible: { ...enhancedVariants.visible, x: 0 },
      };
    }

    return {
      initial: 'hidden',
      whileInView: 'visible',
      variants: enhancedVariants,
      viewport: viewport ? {
        once: true,
        amount: 0.2, // Trigger earlier
        margin: '-50px 0px', // Add margin to trigger before fully in view
      } : undefined,
    };
  };

  const motionProps = getAnimationProps();

  // Convert MUI sx prop to style object that motion.section can use
  const sectionStyles = {
    width: '100%',
    paddingTop: withContainer ? '3rem' : undefined,
    paddingBottom: withContainer ? '4rem' : undefined,
    background: withGradientBg ? gradientBg : undefined,
    ...(sx as Record<string, unknown>), // Apply MUI sx prop as inline styles
  };

  return (
    <AnimatePresence>
      <motion.section
        style={sectionStyles}
        id={id}
        ref={ref}
        className="section-component"
        {...motionProps}
      >
        {withContainer ? (
          <Container maxWidth={maxWidth} sx={{ px: 2, ...containerSx }}>
            {children}
          </Container>
        ) : (
          children
        )}
      </motion.section>
    </AnimatePresence>
  );
});

// Add display name for React DevTools
Section.displayName = 'Section';
