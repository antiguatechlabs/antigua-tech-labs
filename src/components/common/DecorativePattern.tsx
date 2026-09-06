import { Box, type Theme } from '@mui/material';

type DecorativePatternVariant = 'grid' | 'dots' | 'contours' | 'horizontal-lines';

interface DecorativePatternProps {
  color: string | ((theme: Theme) => string);
  variant: DecorativePatternVariant;
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

export function DecorativePattern({ color, variant }: DecorativePatternProps) {
  return (
    <Box
      aria-hidden
      sx={theme => ({
        ...patternStyles[variant](typeof color === 'function' ? color(theme) : color),
        inset: 0,
        pointerEvents: 'none',
        position: 'absolute',
        zIndex: 0,
      })}
    />
  );
}
