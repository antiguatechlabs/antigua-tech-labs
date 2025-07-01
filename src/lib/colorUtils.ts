import { SxProps, Theme } from '@mui/material';

/**
 * Extracts background color from MUI sx prop for wave synchronization
 * @param sx - The sx prop object from Material-UI
 * @returns The background color string or default fallback
 */
export const getWaveColor = (sx?: SxProps<Theme>): string => {
  if (sx && typeof sx === 'object' && !Array.isArray(sx)) {
    // Check for backgroundColor or background in sx
    const sxObj = sx as Record<string, unknown>;
    const bgColor = sxObj.backgroundColor || sxObj.background || sxObj.bg;
    if (bgColor && typeof bgColor === 'string') {
      return bgColor;
    }
  }
  // Default wave color
  return 'var(--background, #f8f9fa)';
};
