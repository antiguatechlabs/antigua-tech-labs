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
import { getWaveColor } from '@/lib/colorUtils';

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
  waves?: boolean; // ✅ New prop to enable waves
}

export const Section = forwardRef<HTMLDivElement, SectionProps>(
  (
    { id, children, sx, animation = 'fadeIn', animationDelay = 0.2, waves = false },
    ref,
  ) => {
    const selectedProps = animationPropMap[animation] || fadeInProps;

    const delayedProps = {
      ...selectedProps,
      transition: {
        ...selectedProps.transition,
        delay: animationDelay,
      },
    };

    const waveColor = getWaveColor(sx);

    return (
      <>
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
        {waves && (
          <Box
            component="svg"
            viewBox="0 0 500 150"
            preserveAspectRatio="none"
            sx={{
              width: '100%',
              height: '50px',
              transform: 'rotate(180deg)',
            }}
          >
            <path
              d="M-0.27,23.08 C149.99,150.00 349.82,-49.98 500.00,49.99 L500.00,150.00 L-0.27,150.00 Z"
              fill={waveColor}
            />
          </Box>
        )}
      </>
    );
  },
);

Section.displayName = 'Section';

export default Section;
