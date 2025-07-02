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
import { getRandomWave } from '@/lib/waveUtils';

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
  waves?: boolean;
  noAnimation?: boolean;
}

export const Section = forwardRef<HTMLDivElement, SectionProps>(
  (
    { id, children, sx, animation = 'fadeIn', animationDelay = 0.2, waves = false, noAnimation = false },
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
    const selectedWave = waves ? getRandomWave() : null;

    // If noAnimation is true, use static props instead of animation props
    const motionProps = noAnimation
      ? {
        initial: false,
        animate: false,
        transition: undefined,
      }
      : {
        initial: delayedProps.initial,
        whileInView: delayedProps.animate,
        transition: delayedProps.transition,
        viewport: { once: true, amount: 0.2 },
      };

    return (
      <Box
        component={motion.section}
        {...motionProps}
      >
        {waves && selectedWave && (
          <Box
            component="svg"
            viewBox={selectedWave.viewBox || '0 0 500 150'}
            preserveAspectRatio="none"
            sx={{
              display: 'block',
              width: '100%',
              height: '50px',
              // transform: 'rotate(180deg)',
            }}
          >
            <path
              d={selectedWave.path}
              fill={waveColor}
            />
          </Box>
        )}
        <Box
          id={id}
          ref={ref}
          sx={{
            width: '100%',
            pt: { xs: 4, md: 6 },
            pb: { xs: 5, md: 8 },
            px: { xs: 2, sm: 10, lg: 12 },
            ...sx,
          }}
        >
          {children}
        </Box>
        {waves && selectedWave && (
          <Box
            component="svg"
            viewBox={selectedWave.viewBox || '0 0 500 150'}
            preserveAspectRatio="none"
            sx={{
              width: '100%',
              height: '50px',
              transform: 'rotate(180deg)',
            }}
          >
            <path
              d={selectedWave.path}
              fill={waveColor}
            />
          </Box>
        )}
      </Box>
    );
  },
);

Section.displayName = 'Section';

export default Section;
