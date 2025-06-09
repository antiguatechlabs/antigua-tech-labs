'use client';

import { Box, SxProps, Theme } from '@mui/material';
import { motion } from 'framer-motion';
import React, { ReactNode, forwardRef } from 'react';

import {
  fadeInProps,
  fadeInDownProps,
  fadeInLeftProps,
  fadeInRightProps,
  fadeInUpProps,
  staggerContainerProps,
} from '@/lib/animationProps';

export type AnimationPropType =
  | 'fadeIn'
  | 'fadeInUp'
  | 'fadeInDown'
  | 'fadeInLeft'
  | 'fadeInRight'
  | 'stagger';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const animationPropMap: Record<AnimationPropType, any> = {
  fadeIn: fadeInProps,
  fadeInUp: fadeInUpProps,
  fadeInDown: fadeInDownProps,
  fadeInLeft: fadeInLeftProps,
  fadeInRight: fadeInRightProps,
  stagger: staggerContainerProps,
};

interface SectionProps {
  id?: string;
  children: ReactNode;
  sx?: SxProps<Theme>;
  animation?: AnimationPropType;
  animationDelay?: number;
}

export const Section = forwardRef<HTMLDivElement, SectionProps>(
  ({ id, children, sx, animation = 'fadeIn', animationDelay = 0.2 }, ref) => {
    const selectedProps = animationPropMap[animation] || fadeInProps;

    const delayedProps = {
      ...selectedProps,
      transition: {
        ...selectedProps.transition,
        delay: animationDelay,
      },
    };

    return (
      <Box
        component={motion.section}
        id={id}
        ref={ref}
        sx={{
          width: '100%',
          pt: { xs: 4, md: 6 },
          pb: { xs: 5, md: 8 },
          px: { xs: 2, sm: 10, lg: 12 },
          ...sx,
        }}
        initial={delayedProps.initial}
        whileInView={delayedProps.animate}
        transition={delayedProps.transition}
        viewport={{ once: true, amount: 0.2 }}
      >
        {children}
      </Box>
    );
  },
);

Section.displayName = 'Section';
