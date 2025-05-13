import { createTheme } from '@mui/material/styles';

// Define the brand colors
export const brandColors = {
    50: '#ffe5e8',
    100: '#fbbbc1',
    200: '#f5919a',
    300: '#ef6673',
    400: '#ea3c4c',
    500: '#d12333', // Primary brand color
    600: '#a31a28',
    700: '#75121d',
    800: '#470a12',
    900: '#1d0307',
};

// Create a base theme function that can be used with light mode
export const createAppTheme = (mode: 'light') => {
    return createTheme({
        palette: {
            mode,
            primary: {
                main: brandColors[500],
                light: brandColors[400],
                dark: brandColors[600],
                contrastText: '#ffffff',
            },
            secondary: {
                main: '#19857b',
                light: '#2cb5a5',
                dark: '#106e66',
                contrastText: '#ffffff',
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
            fontFamily: 'var(--font-inter), "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
                        padding: 0
                    }
                }
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
                styleOverrides: {
                    root: {
                        color: brandColors[500],
                        '&:hover': {
                            color: brandColors[600],
                        },
                    },
                },
            },
        },
    });
};

// Default theme (light mode)
const theme = createAppTheme('light');

export default theme;