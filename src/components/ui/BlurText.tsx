'use client';
import { Typography, TypographyProps } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useRef, useState, useMemo } from 'react';

type AnimationSnapshot = {
  filter?: string;
  opacity?: number;
  y?: number;
};


type BlurTextProps = {
  text?: string;
  variant?: TypographyProps['variant'];
  delay?: number;
  sx?: object;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  threshold?: number;
  rootMargin?: string;
  animationFrom?: AnimationSnapshot;
  animationTo?: AnimationSnapshot[];
  easing?: (t: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
};

const buildKeyframes = (
  from: AnimationSnapshot,
  steps: AnimationSnapshot[],
): Record<string, string[] | number[]> => {
  const keys = Array.from(
    new Set([
      ...Object.keys(from),
      ...steps.flatMap(s => Object.keys(s)),
    ]),
  ).filter((k): k is keyof AnimationSnapshot =>
    ['filter', 'opacity', 'y'].includes(k),
  );

  const keyframes: Record<string, string[] | number[]> = {};
  keys.forEach(k => {
    // Ensure correct typing for each property
    if (k === 'filter') {
      keyframes[k] = [from[k], ...steps.map(s => s[k])].map(v =>
        typeof v === 'string' ? v : '',
      );
    } else if (k === 'opacity' || k === 'y') {
      keyframes[k] = [from[k], ...steps.map(s => s[k])].map(v =>
        typeof v === 'number' ? v : 0,
      );
    }
  });
  return keyframes;
};

const BlurText: React.FC<BlurTextProps> = ({
  variant = 'body1',
  text = '',
  delay = 200,
  sx = {},
  animateBy = 'words',
  direction = 'top',
  threshold = 0.1,
  rootMargin = '0px',
  animationFrom,
  animationTo,
  easing = t => t,
  onAnimationComplete,
  stepDuration = 0.35,
}) => {
  const elements = animateBy === 'words' ? text.split(' ') : text.split('');
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current!);
        }
      },
      { threshold, rootMargin },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom = useMemo<AnimationSnapshot>(
    () =>
      direction === 'top'
        ? { filter: 'blur(10px)', opacity: 0, y: -50 }
        : { filter: 'blur(10px)', opacity: 0, y: 50 },
    [direction],
  );

  const defaultTo = useMemo<AnimationSnapshot[]>(
    () => [
      {
        filter: 'blur(5px)',
        opacity: 0.5,
        y: direction === 'top' ? 5 : -5,
      },
      { filter: 'blur(0px)', opacity: 1, y: 0 },
    ],
    [direction],
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1),
  );

  return (
    <Typography
      ref={ref}
      variant={variant}
      //   component="p"
      sx={{ display: 'flex', flexWrap: 'wrap', ...sx }}
    >
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
          ease: easing,
        };

        return (
          <motion.span
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            style={{ display: 'inline-block', willChange: 'transform, filter, opacity' }}
            onAnimationComplete={
              index === elements.length - 1 ? onAnimationComplete : undefined
            }
          >
            {segment === ' ' ? '\u00A0' : segment}
            {animateBy === 'words' && index < elements.length - 1 && '\u00A0'}
          </motion.span>
        );
      })}
    </Typography>
  );
};

export default BlurText;
