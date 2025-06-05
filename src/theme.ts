import { createTheme } from '@mui/material/styles';

// Define the brand colors
export const brandColors = {
  50: '#f0e7ff',
  100: '#d1c2ff',
  200: '#b39dff',
  300: '#9579ff',
  400: '#7654ff',
  500: '#5a30ff', // Primary brand color (purple)
  600: '#4826cc',
  700: '#361c99',
  800: '#241366',
  900: '#120933',
};

export const colors = {
  blueGray: '#2b2d42',
  purple1: '#4e2c70',
  purple2: '#702b9e',
  magenta: '#b429f9',
  violet: '#9c43f8',
  lightViolet: '#c492f7',
  lavender: '#855df7',
  periwinkle: '#6d77f6',
  skyBlue: '#5591f5',
  lightBlue: '#3eabf4',
  aqua: '#26c5f3',
  transparent: 'rgba(255, 255, 255, 0.7)',
  white: '#ffffff',
  text: '#171717',
  textLight: '#4a5568',
  gradientMain: 'linear-gradient(to right, #9c43f8, #26c5f3)',
  gradientSecondary: 'linear-gradient(to right, #855df7, #5591f5)',
  gradientBackground: 'linear-gradient(180deg, rgba(90, 48, 255, 0.03), rgba(90, 48, 255, 0.01))',
};

// Create a base theme function that can be used with light mode
export const createAppTheme = (mode: 'light') =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: colors.violet,
        light: colors.lightViolet,
        dark: colors.purple2,
        contrastText: colors.white,
      },
      secondary: {
        main: colors.skyBlue,
        light: colors.lightBlue,
        dark: colors.periwinkle,
        contrastText: colors.white,
      },
      info: {
        main: colors.aqua,
        light: colors.lavender,
        contrastText: colors.white,
      },
      background: {
        default: colors.transparent,
        paper: colors.white,
      },
      text: {
        primary: colors.text,
        secondary: colors.textLight,
      },
    },
    typography: {
      fontFamily:
        'var(--font-inter), "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      button: {
        textTransform: 'none',
        fontWeight: 600,
      },
      h1: {
        fontWeight: 700,
      },
      h2: {
        fontWeight: 700,
      },
      h3: {
        fontWeight: 600,
      },
      h4: {
        fontWeight: 600,
      },
      h5: {
        fontWeight: 600,
      },
      h6: {
        fontWeight: 600,
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
            borderRadius: '0.375rem',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '0.5rem',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
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
      },
    },
  });

// Default theme (light mode)
const theme = createAppTheme('light');

export default theme;
