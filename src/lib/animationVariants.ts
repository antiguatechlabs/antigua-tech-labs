// lib/animations/variants.ts
import { Variants } from 'framer-motion';

// Define individual animation variants
export const fadeVariant: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const slideUpVariant: Variants = {
  initial: { opacity: 0, y: 50 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const slideLeftVariant: Variants = {
  initial: { opacity: 0, x: -50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const slideRightVariant: Variants = {
  initial: { opacity: 0, x: 50 },
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const staggerContainerVariant: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const pulseVariant: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.5,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'loop',
    },
  },
};

export const buttonHoverVariant: Variants = {
  initial: { scale: 1, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' },
  hover: {
    scale: 1.05,
    boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.15)',
    transition: { duration: 0.2, ease: 'easeInOut' },
  },
  tap: {
    scale: 0.98,
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    transition: { duration: 0.1, ease: 'easeInOut' },
  },
};

export const cardHoverVariant: Variants = {
  initial: { y: 0, boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)' },
  hover: {
    y: -5,
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.15)',
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

export const withReducedMotion = (variants: Variants): Variants => {
  const reduced: Variants = {};
  Object.entries(variants).forEach(([key, value]) => {
    reduced[key] = {
      ...value,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: 0.1 },
    };
  });
  return reduced;
};
