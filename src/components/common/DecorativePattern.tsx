import { Box, type Theme } from '@mui/material';

type DecorativePatternVariant = 'grid' | 'dots' | 'contours' | 'horizontal-lines';
type DecorativePatternMotion = 'grid-drift' | 'contour-drift' | 'horizontal-slide';

interface DecorativePatternProps {
  color: string | ((theme: Theme) => string);
  variant: DecorativePatternVariant;
  motion?: DecorativePatternMotion;
}

const patternStyles: Record<DecorativePatternVariant, (color: string) => object> = {
  grid: color => ({
    backgroundImage: `linear-gradient(${color} 1px, transparent 1px), linear-gradient(90deg, ${color} 1px, transparent 1px)`,
    backgroundSize: '36px 36px',
  }),
  dots: color => ({
    backgroundImage: `radial-gradient(${color} 1px, transparent 1px)`,
    backgroundSize: '22px 22px',
  }),
  contours: color => ({
    backgroundImage: `repeating-radial-gradient(circle at 0 0, transparent 0, transparent 15px, ${color} 16px, transparent 17px)`,
    backgroundSize: '42px 42px',
  }),
  'horizontal-lines': color => ({
    backgroundImage: `repeating-linear-gradient(0deg, transparent 0, transparent 27px, ${color} 28px, ${color} 29px)`,
  }),
};

const motionStyles: Record<DecorativePatternMotion, object> = {
  'grid-drift': {
    animation: 'decorativeGridDrift 22s ease-in-out infinite alternate',
    willChange: 'background-position',
    '@keyframes decorativeGridDrift': {
      '0%': { backgroundPosition: '0 0' },
      '100%': { backgroundPosition: '36px 36px' },
    },
  },
  'contour-drift': {
    animation: 'decorativeContourDrift 18s ease-in-out infinite alternate',
    willChange: 'background-position',
    '@keyframes decorativeContourDrift': {
      '0%': { backgroundPosition: '0 0' },
      '100%': { backgroundPosition: '42px 24px' },
    },
  },
  'horizontal-slide': {
    animation: 'decorativeHorizontalSlide 18s linear infinite',
    willChange: 'background-position',
    '@keyframes decorativeHorizontalSlide': {
      '0%': { backgroundPosition: '0 0' },
      '100%': { backgroundPosition: '120px 0' },
    },
  },
};

export function DecorativePattern({ color, variant, motion }: DecorativePatternProps) {
  return (
    <Box
      aria-hidden
      data-pattern-motion={motion}
      sx={theme => ({
        ...patternStyles[variant](typeof color === 'function' ? color(theme) : color),
        ...(motion ? motionStyles[motion] : {}),
        inset: 0,
        pointerEvents: 'none',
        position: 'absolute',
        zIndex: 0,
        '@media (prefers-reduced-motion: reduce)': {
          animation: 'none',
          willChange: 'auto',
        },
      })}
    />
  );
}
