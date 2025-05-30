import { createTheme } from '@mui/material/styles';

// Brand colors from tailwind config
export const brandColors = {
  900: '#2b2d42',
  800: '#4e2c70',
  700: '#702b9e',
  600: '#b429f9',
  500: '#9c43f8',
  400: '#855df7',
  300: '#6d77f6',
  200: '#5591f5',
  100: '#3eabf4',
  50: '#26c5f3',
};

// Primary colors from tailwind config
export const primaryColors = {
  50: '#f3eaff',
  100: '#e4d5ff',
  200: '#c9abff',
  300: '#b429f9',
  400: '#9c43f8',
  500: '#855df7',
  600: '#6d77f6',
  700: '#5591f5',
  800: '#3eabf4',
  900: '#26c5f3',
  main: '#9c43f8', // DEFAULT in tailwind
  contrastText: '#ffffff', // foreground in tailwind
};

// Secondary colors from tailwind config
export const secondaryColors = {
  50: '#eaeaff',
  100: '#d5d5ff',
  200: '#ababff',
  300: '#8282ff',
  400: '#5858ff',
  500: '#4e2c70',
  600: '#702b9e',
  700: '#2b2d42',
  800: '#1e1e2f',
  900: '#0f0f17',
  main: '#4e2c70', // DEFAULT in tailwind
  contrastText: '#ffffff', // foreground in tailwind
};

// Font sizes from tailwind config
const fontSizes = {
  tiny: '0.75rem',
  small: '0.875rem',
  medium: '0.9375rem',
  large: '1.125rem',
};

// Line heights from tailwind config
const lineHeights = {
  tiny: '1rem',
  small: '1.25rem',
  medium: '1.5rem',
  large: '1.75rem',
};

// Border radius from tailwind config
const borderRadius = {
  small: '6px',
  medium: '8px',
  large: '12px',
};

// Border widths from tailwind config
const borderWidths = {
  small: '1px',
  medium: '1px',
  large: '2px',
};

// Create a theme function that can be used with light mode
export const createAppTheme = (mode: 'light') => {
  return createTheme({
    palette: {
      mode,
      primary: {
        ...primaryColors,
        light: primaryColors[400],
        dark: primaryColors[600],
      },
      secondary: {
        ...secondaryColors,
        light: secondaryColors[400],
        dark: secondaryColors[600],
      },
      background: {
        default: '#ffffff',
        paper: '#ffffff',
      },
      text: {
        primary: '#171717',
        secondary: '#4a5568',
      },
    },
    typography: {
      fontFamily:
        'var(--font-inter), "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      fontSize: parseFloat(fontSizes.medium),
      button: {
        textTransform: 'none',
        fontWeight: 600,
        fontSize: fontSizes.small,
      },
      h1: {
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h2: {
        fontWeight: 700,
        lineHeight: 1.2,
      },
      h3: {
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h4: {
        fontWeight: 600,
        lineHeight: 1.3,
      },
      h5: {
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h6: {
        fontWeight: 600,
        lineHeight: 1.4,
      },
      body1: {
        fontSize: fontSizes.medium,
        lineHeight: lineHeights.medium,
      },
      body2: {
        fontSize: fontSizes.small,
        lineHeight: lineHeights.small,
      },
      caption: {
        fontSize: fontSizes.tiny,
        lineHeight: lineHeights.tiny,
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            margin: 0,
            padding: 0,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: borderRadius.medium,
            borderWidth: borderWidths.medium,
          },
          sizeSmall: {
            fontSize: fontSizes.tiny,
          },
          sizeMedium: {
            fontSize: fontSizes.small,
          },
          sizeLarge: {
            fontSize: fontSizes.medium,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: borderRadius.medium,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: borderRadius.medium,
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            borderRadius: borderRadius.medium,
            '&:before': {
              display: 'none',
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: borderRadius.medium,
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: borderRadius.small,
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingLeft: '1rem',
            paddingRight: '1rem',
            '@media (min-width:600px)': {
              paddingLeft: '1.5rem',
              paddingRight: '1.5rem',
            },
          },
        },
      },
      MuiLink: {
        defaultProps: {
          underline: 'none',
        },
        styleOverrides: {
          root: {
            color: primaryColors.main,
            '&:hover': {
              color: primaryColors[600],
            },
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderWidth: borderWidths.small,
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontSize: fontSizes.small,
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            fontSize: fontSizes.small,
          },
        },
      },
    },
  });
};

// Default theme (light mode)
const theme = createAppTheme('light');

export default theme;
